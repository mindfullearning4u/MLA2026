const fs = require("fs");
const path = require("path");

const courseRoot = path.resolve(__dirname, "..", "..");
const unitsRoot = path.join(courseRoot, "Units");
const productionRoot = path.join(courseRoot, "Course Production");
const auditRoot = path.join(courseRoot, "Course Audit");

const requiredProductionFiles = [
  "Course-Overview.md",
  "PHASE_1_SOURCE_OF_TRUTH_ANALYSIS.md",
  "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md",
  "PHASE_2A_B_CROSSWALK_DRAFT.md",
  "PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md",
  "PHASE_3A_UNIT_MAPPING.md",
  "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md",
  "PHASE_3B_LESSON_MAPPING.md",
  "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function exists(file) {
  return fs.existsSync(file);
}

function listFiles(dir, predicate) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...listFiles(full, predicate));
    else if (!predicate || predicate(full)) results.push(full);
  }
  return results;
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function auditXml(file, expectedQuestions, findings, metrics) {
  const xml = read(file);
  const questionCount = countMatches(xml, /<question type="multichoice">/g);
  if (questionCount !== expectedQuestions) {
    findings.push(`${path.relative(courseRoot, file)} has ${questionCount}/${expectedQuestions} multichoice questions.`);
  }
  const questionBlocks = xml.split(/<question type="multichoice">/).slice(1);
  for (const [index, block] of questionBlocks.entries()) {
    const itemName = `${path.basename(file)} item ${index + 1}`;
    if (!block.includes("MLA Standard:")) findings.push(`${itemName} missing MLA Standard trace.`);
    const answerCount = countMatches(block, /<answer fraction="/g);
    if (answerCount !== 4) findings.push(`${itemName} has ${answerCount}/4 answer choices.`);
    const correctCount = countMatches(block, /<answer fraction="100"/g);
    if (correctCount !== 1) findings.push(`${itemName} has ${correctCount}/1 correct answer.`);
    const feedbackCount = countMatches(block, /<feedback format="html"><text><!\[CDATA\[<p>[\s\S]*?<\/p>\]\]><\/text><\/feedback>/g);
    if (feedbackCount < 4) findings.push(`${itemName} has ${feedbackCount}/4 answer-level feedback blocks.`);
    if (!block.includes("evidence") && !block.includes("Evidence")) findings.push(`${itemName} does not visibly require evidence use.`);
  }
  metrics.totalXmlQuestions += questionCount;
}

function runAudit() {
  const findings = [];
  const metrics = {
    productionFiles: 0,
    units: 0,
    lessons: 0,
    htmlPages: 0,
    lessonJson: 0,
    quizJson: 0,
    xmlFiles: 0,
    totalXmlQuestions: 0,
    crosswalkRows: 0,
  };

  for (const file of requiredProductionFiles) {
    const full = path.join(productionRoot, file);
    if (!exists(full)) findings.push(`Missing production file: ${file}`);
    else metrics.productionFiles += 1;
  }

  const unitDirs = fs.readdirSync(unitsRoot).filter((name) => /^Unit \d\d$/.test(name)).sort();
  metrics.units = unitDirs.length;
  if (unitDirs.length !== 6) findings.push(`Unit count is ${unitDirs.length}/6.`);

  for (const unitDir of unitDirs) {
    const unitNumber = Number(unitDir.match(/\d+/)[0]);
    const unitPath = path.join(unitsRoot, unitDir);
    const lessonDirs = fs.readdirSync(unitPath).filter((name) => /^Lesson \d\d$/.test(name)).sort();
    if (lessonDirs.length !== 5) findings.push(`${unitDir} has ${lessonDirs.length}/5 lessons.`);
    const pretest = path.join(unitPath, `CPP_U${String(unitNumber).padStart(2, "0")}_Pretest.xml`);
    if (!exists(pretest)) findings.push(`${unitDir} missing unit pretest XML.`);
    else auditXml(pretest, 10, findings, metrics);

    for (const lessonDir of lessonDirs) {
      metrics.lessons += 1;
      const lessonNumber = Number(lessonDir.match(/\d+/)[0]);
      const lessonPath = path.join(unitPath, lessonDir);
      const lessonJson = path.join(lessonPath, "lesson.json");
      const quizJson = path.join(lessonPath, "quiz.json");
      if (!exists(lessonJson)) findings.push(`${unitDir}/${lessonDir} missing lesson.json.`);
      if (!exists(quizJson)) findings.push(`${unitDir}/${lessonDir} missing quiz.json.`);
      const meta = exists(lessonJson) ? readJson(lessonJson) : null;
      const quizMeta = exists(quizJson) ? readJson(quizJson) : null;
      if (meta) metrics.lessonJson += 1;
      if (quizMeta) metrics.quizJson += 1;

      for (let page = 1; page <= 7; page += 1) {
        const pageFile = path.join(lessonPath, `P${String(page).padStart(2, "0")}.html`);
        if (!exists(pageFile)) {
          findings.push(`${unitDir}/${lessonDir} missing P${String(page).padStart(2, "0")}.html.`);
          continue;
        }
        metrics.htmlPages += 1;
        const html = read(pageFile);
        if (!html.includes("Teacher of Record Support")) findings.push(`${unitDir}/${lessonDir}/P${String(page).padStart(2, "0")} missing TOR support.`);
        if (!html.includes("Standards Covered in This Lesson") && !html.includes("MLA.CPP.")) findings.push(`${unitDir}/${lessonDir}/P${String(page).padStart(2, "0")} missing standards trace.`);
        if (page === 4 && countMatches(html, /Worked Example \d/g) !== 3) findings.push(`${unitDir}/${lessonDir}/P04 does not have exactly 3 worked examples.`);
        if (page === 6 && (!html.includes("Part A") || !html.includes("Part B") || !html.includes("Part C"))) findings.push(`${unitDir}/${lessonDir}/P06 missing Part A/B/C guided practice.`);
      }

      if (meta && meta.lesson !== lessonNumber) findings.push(`${unitDir}/${lessonDir} lesson.json lesson number mismatch.`);
      if (meta && meta.unit !== unitNumber) findings.push(`${unitDir}/${lessonDir} lesson.json unit number mismatch.`);
      if (meta && (!Array.isArray(meta.standards) || meta.standards.length === 0)) findings.push(`${unitDir}/${lessonDir} missing standards in lesson.json.`);
      if (meta && !meta.benchmark) findings.push(`${unitDir}/${lessonDir} missing benchmark in lesson.json.`);
      if (lessonNumber === 5 && meta && !meta.synthesis_lesson) findings.push(`${unitDir}/${lessonDir} should be marked synthesis_lesson.`);
      if (lessonNumber < 5 && meta && meta.synthesis_lesson) findings.push(`${unitDir}/${lessonDir} should not be marked synthesis_lesson.`);

      if (quizMeta) {
        if (quizMeta.guided_practice_questions !== 5) findings.push(`${unitDir}/${lessonDir} guided practice count metadata is not 5.`);
        if (lessonNumber < 5 && quizMeta.lesson_quiz_questions !== 25) findings.push(`${unitDir}/${lessonDir} lesson quiz count metadata is not 25.`);
        if (lessonNumber === 5 && quizMeta.lesson_quiz_questions !== 0) findings.push(`${unitDir}/${lessonDir} Lesson 5 lesson quiz metadata is not 0.`);
        if (lessonNumber === 5 && quizMeta.unit_assessment_questions !== 40) findings.push(`${unitDir}/${lessonDir} Lesson 5 unit assessment metadata is not 40.`);
        if (lessonNumber === 5 && quizMeta.no_lesson_quiz !== true) findings.push(`${unitDir}/${lessonDir} Lesson 5 no_lesson_quiz flag is not true.`);
      }

      const gp = path.join(lessonPath, `CPP_U${String(unitNumber).padStart(2, "0")}_L${String(lessonNumber).padStart(2, "0")}_GuidedPractice.xml`);
      if (!exists(gp)) findings.push(`${unitDir}/${lessonDir} missing guided practice XML.`);
      else auditXml(gp, 5, findings, metrics);

      const quiz = path.join(lessonPath, `CPP_U${String(unitNumber).padStart(2, "0")}_L${String(lessonNumber).padStart(2, "0")}_Quiz.xml`);
      if (lessonNumber < 5) {
        if (!exists(quiz)) findings.push(`${unitDir}/${lessonDir} missing lesson quiz XML.`);
        else auditXml(quiz, 25, findings, metrics);
      } else if (exists(quiz)) {
        findings.push(`${unitDir}/${lessonDir} incorrectly contains a Lesson 5 quiz XML.`);
      }

      const unitAssessment = path.join(lessonPath, `CPP_U${String(unitNumber).padStart(2, "0")}_UnitAssessment.xml`);
      if (lessonNumber === 5) {
        if (!exists(unitAssessment)) findings.push(`${unitDir}/${lessonDir} missing unit assessment XML.`);
        else auditXml(unitAssessment, 40, findings, metrics);
      }
    }
  }

  const xmlFiles = listFiles(unitsRoot, (file) => file.endsWith(".xml"));
  metrics.xmlFiles = xmlFiles.length;
  if (xmlFiles.length !== 66) findings.push(`XML file count is ${xmlFiles.length}/66.`);
  if (metrics.totalXmlQuestions !== 1050) findings.push(`XML question count is ${metrics.totalXmlQuestions}/1050.`);

  const crosswalk = read(path.join(productionRoot, "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md"));
  metrics.crosswalkRows = countMatches(crosswalk, /^\| Unit \d\d \| Lesson \d\d \|/gm);
  if (metrics.crosswalkRows !== 30) findings.push(`Full crosswalk has ${metrics.crosswalkRows}/30 lesson rows.`);
  for (const requiredColumn of ["Florida B.E.S.T. Support", "Common Core Support", "SAT Support", "ACT Support", "ELD/Accessibility Support"]) {
    if (!crosswalk.includes(requiredColumn)) findings.push(`Full crosswalk missing column: ${requiredColumn}`);
  }

  const status = findings.length === 0 ? "PASS" : "NEEDS REPAIR";
  const report = [
    "# Career Planning and Portfolio Course Completion Audit",
    "",
    "Date: 2026-07-13",
    "",
    `Status: ${status}`,
    "",
    "## Audit Scope",
    "",
    "- Course production source-of-truth and mapping files.",
    "- 6-unit / 5-lesson course structure.",
    "- P01-P07 lesson page presence and required instructional markers.",
    "- Lesson 5 synthesis rule and no Lesson 5 quiz-bank rule.",
    "- Moodle XML assessment file counts, item counts, standards traces, answer counts, and feedback blocks.",
    "- Crosswalk coverage for CPALMS/FDOE, Florida B.E.S.T., Common Core, SAT, ACT, and ELD/accessibility support.",
    "",
    "## Metrics",
    "",
    `- Production files present: ${metrics.productionFiles}/${requiredProductionFiles.length}.`,
    `- Units present: ${metrics.units}/6.`,
    `- Lessons present: ${metrics.lessons}/30.`,
    `- HTML lesson pages present: ${metrics.htmlPages}/210.`,
    `- lesson.json files present: ${metrics.lessonJson}/30.`,
    `- quiz.json files present: ${metrics.quizJson}/30.`,
    `- Moodle XML files present: ${metrics.xmlFiles}/66.`,
    `- Moodle multichoice questions present: ${metrics.totalXmlQuestions}/1050.`,
    `- Full crosswalk lesson rows: ${metrics.crosswalkRows}/30.`,
    "",
    "## Findings",
    "",
    findings.length === 0 ? "- No findings. Course package passes this audit pass." : findings.map((finding) => `- ${finding}`).join("\n"),
    "",
    "## Disposition",
    "",
    findings.length === 0
      ? "Career Planning and Portfolio is structurally complete for the 0.5-credit production model and ready for the next Moodle transfer/readiness step."
      : "Repairs are required before Moodle transfer/readiness.",
    "",
  ].join("\n");

  const reportFile = path.join(auditRoot, "CAREER_PLANNING_PORTFOLIO_COURSE_COMPLETION_AUDIT_2026-07-13.md");
  fs.writeFileSync(reportFile, report, "utf8");
  console.log(JSON.stringify({ status, findings: findings.length, metrics, report: reportFile }, null, 2));
  if (findings.length > 0) process.exitCode = 1;
}

runAudit();
