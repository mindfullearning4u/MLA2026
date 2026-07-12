const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const SOCIAL_COURSES = {
  "WORLD HISTORY": { prefix: "WH", credit: "1.0", lessonsPerUnit: 8 },
  "U.S. HISTORY": { prefix: "USH", credit: "1.0", lessonsPerUnit: 8 },
  "U.S. GOVERNMENT": { prefix: "USG", credit: "0.5", lessonsPerUnit: 5 },
  "PERSONAL FINANCIAL LITERACY AND ECONOMICS": { prefix: "PFLE", credit: "1.0", lessonsPerUnit: 8 },
  "PSYCHOLOGY": { prefix: "PSY", credit: "1.0", lessonsPerUnit: 8 },
  "SOCIOLOGY": { prefix: "SOC", credit: "1.0", lessonsPerUnit: 8 },
  "GLOBAL PERSPECTIVES": { prefix: "GP", credit: "1.0", lessonsPerUnit: 8 },
  "CULTURAL STUDIES": { prefix: "CS", credit: "1.0", lessonsPerUnit: 8 }
};

const courses = process.argv.slice(2);
const selected = courses.length ? courses : Object.keys(SOCIAL_COURSES);

const prohibitedTeacherLanguage = [
  /teacher check/i,
  /your teacher will (explain|show|teach|lead)/i,
  /wait for (the )?teacher/i,
  /live teacher/i,
  /not rely on live teacher/i,
  /teacher-led/i
];

const visualTerms = /map|timeline|chart|table|source|excerpt|organizer|diagram|matrix|graph|data|case|document|primary|political|civic|flowchart|comparison|cause-effect|cause and effect|visual|scenario/i;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, acc);
    else acc.push(file);
  }
  return acc;
}

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[|\]\]>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function standardsFromText(text) {
  return Array.from(new Set(String(text || "").match(/\b(?:SS\.912|MLA\.[A-Z]+|HE\.912|LAFS|MAFS|ELA\.|MA\.K12|ELD\.K12)[A-Z0-9._-]*\b/g) || []));
}

function normalizeStandards(text) {
  return standardsFromText(text).filter(s => !/^MLA\.(?:Standard|Standards)$/i.test(s));
}

function parseLessonMapping(courseRoot) {
  const file = path.join(courseRoot, "Course Production", "PHASE_3B_LESSON_MAPPING.md");
  const lessons = new Map();
  const duplicates = [];
  if (!fs.existsSync(file)) return { lessons, duplicates, missing: true };

  const lines = read(file).split(/\r?\n/).filter(line => /^\|\s*Unit\s+\d+/i.test(line));
  for (const line of lines) {
    const cols = line.split("|").slice(1, -1).map(cell => cell.trim());
    const unit = Number((cols[0].match(/\d+/) || [])[0]);
    const lesson = Number((cols[1].match(/\d+/) || [])[0]);
    if (!unit || !lesson) continue;
    const key = `${String(unit).padStart(2, "0")}-${String(lesson).padStart(2, "0")}`;
    const standardsCell = cols.find(cell => /\b(?:SS\.912|MLA\.[A-Z]+|HE\.912)[A-Z0-9._-]*\b/.test(cell)) || "";
    const standards = Array.from(new Set(standardsFromText(standardsCell).filter(standard => /^(SS\.912|MLA\.|HE\.912)/.test(standard))));
    const repeated = standards.filter((standard, index) => standards.indexOf(standard) !== index);
    if (repeated.length) duplicates.push({ key, repeated: Array.from(new Set(repeated)) });
    lessons.set(key, {
      unit,
      lesson,
      title: cols[3] || "",
      standards: Array.from(new Set(standards)),
      visual: cols[6] || ""
    });
  }
  return { lessons, duplicates, missing: false };
}

function parseAssessmentXml(xml) {
  const questionBlocks = Array.from(xml.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/g)).map(m => m[1]);
  return questionBlocks.map(block => {
    const name = stripHtml((block.match(/<name>\s*<text>([\s\S]*?)<\/text>\s*<\/name>/) || [])[1] || "");
    const questionText = (block.match(/<questiontext[^>]*>\s*<text>([\s\S]*?)<\/text>\s*<\/questiontext>/) || [])[1] || "";
    const answers = Array.from(block.matchAll(/<answer\b[^>]*fraction=(["'])([^"']+)\1[^>]*>[\s\S]*?<\/answer>/g)).map(m => Number(m[2]));
    return {
      name,
      text: questionText,
      standards: normalizeStandards(stripHtml(questionText)),
      answerCount: answers.length,
      correctCount: answers.filter(f => f === 100).length,
      hasVisualSupport: visualTerms.test(stripHtml(questionText)) || /<img|<table|<svg|data:image/i.test(questionText)
    };
  });
}

function expectedXmlCounts(config) {
  if (config.lessonsPerUnit === 5) {
    return { guidedPractice: 5, quiz: 4, pretest: 1, unitAssessment: 1, total: 11 };
  }
  return { guidedPractice: 8, quiz: 7, pretest: 1, unitAssessment: 1, total: 17 };
}

function auditCourse(courseName, config) {
  const courseRoot = path.join(root, courseName);
  const findings = [];
  const stats = {
    lessons: 0,
    htmlPages: 0,
    xmlFiles: 0,
    xmlQuestions: 0,
    giftFiles: 0,
    mappedStandards: new Set(),
    lessonStandards: new Set(),
    assessmentStandards: new Set()
  };
  if (!fs.existsSync(courseRoot)) {
    return { courseName, decision: "FAIL", findings: [`Course folder missing: ${courseName}`], stats };
  }

  const { lessons, duplicates, missing } = parseLessonMapping(courseRoot);
  if (missing) findings.push("Missing PHASE_3B_LESSON_MAPPING.md.");
  for (const duplicate of duplicates) findings.push(`Duplicate standard(s) in lesson mapping ${duplicate.key}: ${duplicate.repeated.join(", ")}.`);
  for (const lesson of lessons.values()) lesson.standards.forEach(s => stats.mappedStandards.add(s));

  const unitsRoot = path.join(courseRoot, "Units");
  stats.giftFiles = walk(unitsRoot).filter(file => file.toLowerCase().endsWith(".gift")).length;
  if (stats.giftFiles) findings.push(`${stats.giftFiles} GIFT file(s) found; assessments must be Moodle XML only.`);

  for (let unit = 1; unit <= 6; unit++) {
    const unitDir = path.join(unitsRoot, `Unit ${String(unit).padStart(2, "0")}`);
    if (!fs.existsSync(unitDir)) {
      findings.push(`Missing Unit ${String(unit).padStart(2, "0")} folder.`);
      continue;
    }
    const xmlFiles = walk(unitDir).filter(file => file.toLowerCase().endsWith(".xml"));
    stats.xmlFiles += xmlFiles.length;
    const counts = expectedXmlCounts(config);
    if (xmlFiles.length !== counts.total) {
      findings.push(`Unit ${String(unit).padStart(2, "0")} has ${xmlFiles.length} XML files; expected ${counts.total}.`);
    }
    const unitMapped = new Set();

    for (let lesson = 1; lesson <= config.lessonsPerUnit; lesson++) {
      const key = `${String(unit).padStart(2, "0")}-${String(lesson).padStart(2, "0")}`;
      const mapped = lessons.get(key);
      if (!mapped) {
        findings.push(`Missing lesson mapping row for ${key}.`);
        continue;
      }
      mapped.standards.forEach(s => unitMapped.add(s));
      const lessonDir = path.join(unitDir, `Lesson ${String(lesson).padStart(2, "0")}`);
      if (!fs.existsSync(lessonDir)) {
        findings.push(`Missing lesson folder ${key}.`);
        continue;
      }
      stats.lessons++;

      const lessonJson = path.join(lessonDir, "lesson.json");
      if (!fs.existsSync(lessonJson)) {
        findings.push(`Missing lesson.json for ${key}.`);
      } else {
        const lessonMeta = JSON.parse(read(lessonJson));
        const metaStandards = Array.isArray(lessonMeta.standards) ? lessonMeta.standards : normalizeStandards(read(lessonJson));
        const missingInMeta = mapped.standards.filter(s => !metaStandards.includes(s));
        const extraInMeta = metaStandards.filter(s => !mapped.standards.includes(s));
        if (missingInMeta.length) findings.push(`${key} lesson.json missing mapped standard(s): ${missingInMeta.join(", ")}.`);
        if (extraInMeta.length) findings.push(`${key} lesson.json has unmapped standard(s): ${extraInMeta.join(", ")}.`);
      }

      let lessonText = "";
      for (let page = 1; page <= 7; page++) {
        const htmlFile = path.join(lessonDir, `P${String(page).padStart(2, "0")}.html`);
        if (!fs.existsSync(htmlFile)) {
          findings.push(`Missing P${String(page).padStart(2, "0")}.html for ${key}.`);
          continue;
        }
        stats.htmlPages++;
        const html = read(htmlFile);
        lessonText += `\n${stripHtml(html)}`;
        const blocked = prohibitedTeacherLanguage.find(pattern => pattern.test(html));
        if (blocked) findings.push(`${key} P${String(page).padStart(2, "0")} contains prohibited teacher-led wording: ${blocked}.`);
      }

      const missingInLesson = mapped.standards.filter(s => !lessonText.includes(s));
      if (missingInLesson.length) findings.push(`${key} lesson pages missing mapped standard(s): ${missingInLesson.join(", ")}.`);
      const lessonStandards = normalizeStandards(lessonText);
      lessonStandards.forEach(s => stats.lessonStandards.add(s));
      const extraInLesson = lessonStandards.filter(s => !mapped.standards.includes(s));
      if (extraInLesson.length) findings.push(`${key} lesson pages include unmapped standard(s): ${Array.from(new Set(extraInLesson)).join(", ")}.`);
      if (mapped.visual && !visualTerms.test(lessonText)) findings.push(`${key} required visual/source support is not evident in lesson text.`);

      const p04 = path.join(lessonDir, "P04.html");
      if (fs.existsSync(p04)) {
        const p04Text = stripHtml(read(p04));
        for (const label of ["Example 1", "Example 2", "Example 3"]) {
          if (!p04Text.includes(label)) findings.push(`${key} P04 missing ${label}.`);
        }
      }
      const p06 = path.join(lessonDir, "P06.html");
      if (fs.existsSync(p06)) {
        const p06Text = stripHtml(read(p06));
        for (const label of ["Part A", "Part B", "Part C"]) {
          if (!p06Text.includes(label)) findings.push(`${key} P06 missing ${label}.`);
        }
      }
      const p07 = path.join(lessonDir, "P07.html");
      if (fs.existsSync(p07)) {
        const p07Text = stripHtml(read(p07));
        if (!/Mastery Criteria|80%|80 percent/i.test(p07Text)) findings.push(`${key} P07 missing mastery criteria/80% language.`);
      }
    }

    for (const xmlFile of xmlFiles) {
      const xml = read(xmlFile);
      const questions = parseAssessmentXml(xml);
      stats.xmlQuestions += questions.length;
      const base = path.basename(xmlFile);
      const lessonMatch = base.match(/_L(\d\d)_/);
      const isPretest = /Pretest/i.test(base);
      const isUnitAssessment = /UnitAssessment/i.test(base);
      const expectedQuestions = /GuidedPractice/i.test(base) ? 5 : /Quiz/i.test(base) ? 25 : isPretest ? 10 : isUnitAssessment ? 40 : null;
      if (expectedQuestions !== null && questions.length !== expectedQuestions) findings.push(`${base} has ${questions.length} questions; expected ${expectedQuestions}.`);
      if (config.lessonsPerUnit === 5 && /_L05_Quiz/i.test(base)) findings.push(`${base} exists, but 0.5-credit Lesson 05 should not have a quiz bank.`);
      if (config.lessonsPerUnit === 8 && /_L08_Quiz/i.test(base)) findings.push(`${base} exists, but Lesson 08 should not have a quiz bank.`);
      const allowed = lessonMatch && !isPretest && !isUnitAssessment
        ? new Set((lessons.get(`${String(unit).padStart(2, "0")}-${lessonMatch[1]}`) || { standards: [] }).standards)
        : unitMapped;
      for (const [index, question] of questions.entries()) {
        if (question.answerCount !== 4) findings.push(`${base} question ${index + 1} has ${question.answerCount} answers; expected 4.`);
        if (question.correctCount !== 1) findings.push(`${base} question ${index + 1} has ${question.correctCount} correct answers; expected 1.`);
        if (!question.standards.length) findings.push(`${base} question ${index + 1} missing visible standard.`);
        for (const standard of question.standards) {
          stats.assessmentStandards.add(standard);
          if (!allowed.has(standard)) findings.push(`${base} question ${index + 1} uses unmapped/out-of-scope standard ${standard}.`);
        }
        if (!question.hasVisualSupport) findings.push(`${base} question ${index + 1} lacks visible source/visual/stimulus support.`);
      }
    }
  }

  const mapped = Array.from(stats.mappedStandards);
  const missingInLessons = mapped.filter(s => !stats.lessonStandards.has(s));
  const missingInAssessments = mapped.filter(s => !stats.assessmentStandards.has(s));
  if (missingInLessons.length) findings.push(`Mapped standard(s) never found in lesson pages: ${missingInLessons.join(", ")}.`);
  if (missingInAssessments.length) findings.push(`Mapped standard(s) never found in XML assessments: ${missingInAssessments.join(", ")}.`);

  return {
    courseName,
    decision: findings.length ? "FAIL" : "PASS",
    findings,
    stats: {
      lessons: stats.lessons,
      htmlPages: stats.htmlPages,
      xmlFiles: stats.xmlFiles,
      xmlQuestions: stats.xmlQuestions,
      giftFiles: stats.giftFiles,
      mappedStandards: stats.mappedStandards.size,
      lessonStandards: stats.lessonStandards.size,
      assessmentStandards: stats.assessmentStandards.size
    }
  };
}

const results = selected.map(courseName => {
  const config = SOCIAL_COURSES[courseName];
  if (!config) return { courseName, decision: "FAIL", findings: [`Unknown social science course: ${courseName}`], stats: {} };
  return auditCourse(courseName, config);
});

console.log(JSON.stringify(results, null, 2));
if (results.some(result => result.decision !== "PASS")) process.exitCode = 1;
