const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courses = [
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "EARTH SPACE SCIENCE",
  "ANATOMY AND PHYSIOLOGY",
  "ENVIRONMENTAL SCIENCE",
  "MARINE SCIENCE",
];

const htmlPages = ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"];
const visualRe = /\b(diagram|model|table|graph|chart|map|cycle|data|figure|image|visual|evidence|variable|control|CER|claim|observation|simulation|virtual lab|investigation|lab)\b/i;
const labRe = /\b(lab|investigation|data|simulation|virtual lab|model|observation|evidence)\b/i;
const safetyRe = /\b(safety|safe|virtual|data-based|no physical materials|TOR-approved|school-approved|do not perform|supervision)\b/i;
const cerRe = /\b(CER|claim|evidence|reasoning|scientific explanation|justify|conclusion)\b/i;
const vagueResourceRe = /\b(search for|search the web|browse|navigate to find|candidate resource|for approval|placeholder|pending approval|to be added|TBD|TODO|use approved resources from lessons)\b/i;
const teacherLedRe = /\b(teacher move|teacher slow walk|veteran\s+\w*\s*teacher|teacher would|teacher will teach|your teacher will|ask your teacher|teacher check|live teacher|rely on a teacher)\b/i;
const negativeTeacherRe = /\b(do not rely on live teacher|no teacher is available|without a teacher)\b/i;
const urlRe = /https?:\/\/[^"' <)]+/gi;
const howToRe = /\b(how to use|click the link|open the page|record|observe|what to click|what to observe|what to record|launch|play button|use the section|read the heading)\b/i;
const xmlStimulusRe = /\b(diagram|model|table|graph|chart|map|cycle|data|figure|image|visual|stimulus|evidence|variable|control|CER|claim|observation|simulation|lab|scenario|case|source|process)\b/i;
const weakAnswerRe = /\b(all topics are interchangeable|this prevents guessing|because it is correct|best answer|always true|all of the above|none of the above)\b/i;

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function exists(file) {
  return fs.existsSync(file);
}

function listFiles(dir, predicate) {
  const out = [];
  if (!exists(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, predicate));
    else if (!predicate || predicate(full)) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function extractQuestions(xml) {
  return [...xml.matchAll(/<question\b[\s\S]*?<\/question>/gi)].map((m) => m[0]).filter((q) => !/<question\s+type="category"/i.test(q));
}

function parseXmlFile(file) {
  const xml = read(file);
  const questions = extractQuestions(xml);
  const failures = [];
  questions.forEach((question, index) => {
    const answers = [...question.matchAll(/<answer\b([^>]*)>[\s\S]*?<\/answer>/gi)];
    if (answers.length !== 4) failures.push(`${rel(file)} question ${index + 1}: expected 4 answers, found ${answers.length}`);
    const correct = answers.filter((a) => /fraction="100"/i.test(a[1])).length;
    if (correct !== 1) failures.push(`${rel(file)} question ${index + 1}: expected 1 correct answer, found ${correct}`);
    if (!/<feedback\b[\s\S]*?<\/feedback>/i.test(question)) failures.push(`${rel(file)} question ${index + 1}: missing feedback`);
    if (!/MLA\.|SC\./i.test(question)) failures.push(`${rel(file)} question ${index + 1}: missing visible standard code`);
    if (!xmlStimulusRe.test(question)) failures.push(`${rel(file)} question ${index + 1}: missing embedded science stimulus/data/model language`);
    if (weakAnswerRe.test(question)) failures.push(`${rel(file)} question ${index + 1}: weak/generic answer or feedback wording`);
  });
  return { questions: questions.length, failures };
}

function expectedXmlCount(courseDir) {
  const units = fs.readdirSync(path.join(courseDir, "Units"), { withFileTypes: true }).filter((d) => d.isDirectory() && /^Unit \d+$/i.test(d.name)).length;
  return { files: units * 17, questions: units * 265 };
}

function auditCourse(course) {
  const courseDir = path.join(root, course);
  const unitsDir = path.join(courseDir, "Units");
  const productionDir = path.join(courseDir, "Course Production");
  const auditDir = path.join(courseDir, "Course Audit");
  const result = {
    course,
    htmlPages: 0,
    lessons: 0,
    xmlFiles: 0,
    xmlQuestions: 0,
    urls: 0,
    lessonsWithUrl: 0,
    failures: [],
    warnings: [],
  };

  const requiredProduction = [
    "Course-Overview.md",
    "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md",
    "PHASE_2A_B_CROSSWALK_DRAFT.md",
    "PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md",
    "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md",
    "PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md",
  ];
  requiredProduction.forEach((name) => {
    if (!exists(path.join(productionDir, name))) result.failures.push(`Missing production file: ${course}/${name}`);
  });

  if (!exists(auditDir)) result.failures.push(`Missing Course Audit folder: ${course}`);

  const productionText = listFiles(productionDir, (f) => f.endsWith(".md")).map(read).join("\n");
  ["Florida", "CPALMS", "Common Core", "ACT", "SAT"].forEach((term) => {
    if (!new RegExp(term, "i").test(productionText)) result.failures.push(`Production source provenance missing ${term}: ${course}`);
  });

  const lessonDirs = listFiles(unitsDir)
    .map((f) => path.dirname(f))
    .filter((d, i, arr) => /Units\\Unit \d+\\Lesson \d+$/i.test(d) && arr.indexOf(d) === i)
    .sort();
  result.lessons = lessonDirs.length;
  if (lessonDirs.length !== 48) result.failures.push(`Expected 48 lessons, found ${lessonDirs.length}: ${course}`);

  for (const lessonDir of lessonDirs) {
    let lessonText = "";
    const lessonRel = rel(lessonDir);
    for (const page of htmlPages) {
      const file = path.join(lessonDir, page);
      if (!exists(file)) {
        result.failures.push(`Missing ${page}: ${lessonRel}`);
        continue;
      }
      result.htmlPages += 1;
      const text = read(file);
      lessonText += `\n${text}`;
      if (!/MLA\.|SC\./i.test(text)) result.failures.push(`${rel(file)} missing visible standard reference`);
      if (["P02.html", "P03.html", "P04.html", "P06.html", "P07.html"].includes(page) && !visualRe.test(text)) {
        result.failures.push(`${rel(file)} missing science visual/data/model/lab evidence language`);
      }
      if (vagueResourceRe.test(text)) result.failures.push(`${rel(file)} contains vague resource/approval/placeholder language`);
      if (teacherLedRe.test(text) || negativeTeacherRe.test(text)) result.failures.push(`${rel(file)} contains teacher-led or negative no-teacher wording`);
    }
    if (!exists(path.join(lessonDir, "lesson.json"))) result.failures.push(`Missing lesson.json: ${lessonRel}`);
    if (!exists(path.join(lessonDir, "quiz.json"))) result.failures.push(`Missing quiz.json: ${lessonRel}`);
    if (!labRe.test(lessonText)) result.failures.push(`${lessonRel} missing lab/data/investigation evidence`);
    if (!safetyRe.test(lessonText)) result.failures.push(`${lessonRel} missing safety/virtual/data-based guidance`);
    if (!cerRe.test(lessonText)) result.failures.push(`${lessonRel} missing CER/scientific explanation evidence`);
    const urls = lessonText.match(urlRe) || [];
    result.urls += urls.length;
    if (urls.length > 0) result.lessonsWithUrl += 1;
    if (urls.length === 0) result.failures.push(`${lessonRel} missing exact direct resource URL`);
    if (urls.length > 0 && !howToRe.test(lessonText)) result.failures.push(`${lessonRel} has resource URL but missing step-by-step student-use directions`);
  }

  const giftFiles = listFiles(courseDir, (f) => /\.gift$/i.test(f));
  giftFiles.forEach((f) => result.failures.push(`GIFT file present: ${rel(f)}`));

  const xmlFiles = listFiles(courseDir, (f) => /\.xml$/i.test(f));
  result.xmlFiles = xmlFiles.length;
  const expected = expectedXmlCount(courseDir);
  if (xmlFiles.length !== expected.files) result.failures.push(`Expected ${expected.files} XML files, found ${xmlFiles.length}: ${course}`);
  for (const file of xmlFiles) {
    const parsed = parseXmlFile(file);
    result.xmlQuestions += parsed.questions;
    result.failures.push(...parsed.failures);
  }
  if (result.xmlQuestions !== expected.questions) result.failures.push(`Expected ${expected.questions} XML questions, found ${result.xmlQuestions}: ${course}`);

  return result;
}

const results = courses.map(auditCourse);
const totalFailures = results.reduce((sum, r) => sum + r.failures.length, 0);
const report = [];
report.push("# Deep Science Rigor Audit");
report.push("");
report.push(`Date: 2026-07-11`);
report.push("");
report.push("## Scope");
report.push("");
courses.forEach((c) => report.push(`- ${c}`));
report.push("");
report.push("## Audit Gates");
report.push("");
report.push("- Course production source provenance: Florida, CPALMS, Common Core, ACT, SAT");
report.push("- 48 lessons per course with P01-P07, lesson.json, and quiz.json");
report.push("- Science lab/data/investigation, safety, CER, visual/model/data evidence");
report.push("- Exact direct resource URLs and student step-by-step use directions");
report.push("- Moodle XML only, expected file counts, expected question counts, four choices, one correct answer, feedback, standards, embedded science stimulus");
report.push("- No GIFT files, vague resource placeholders, approval placeholders, teacher-led wording, or negative no-teacher wording");
report.push("");
report.push("## Summary");
report.push("");
report.push("| Course | Lessons | HTML Pages | XML Files | XML Questions | Lessons With URL | URL Count | Failures | Decision |");
report.push("|---|---:|---:|---:|---:|---:|---:|---:|---|");
for (const r of results) {
  report.push(`| ${r.course} | ${r.lessons} | ${r.htmlPages} | ${r.xmlFiles} | ${r.xmlQuestions} | ${r.lessonsWithUrl} | ${r.urls} | ${r.failures.length} | ${r.failures.length ? "FAIL" : "PASS"} |`);
}
report.push("");
report.push(`Overall Decision: ${totalFailures ? "FAIL - repairs required" : "PASS - science courses clear deeper audit gates"}`);
report.push("");
for (const r of results) {
  report.push(`## ${r.course}`);
  report.push("");
  if (r.failures.length === 0) {
    report.push("PASS: No deeper rigor blockers found.");
  } else {
    report.push(`FAILURES (${r.failures.length}):`);
    r.failures.slice(0, 300).forEach((failure) => report.push(`- ${failure}`));
    if (r.failures.length > 300) report.push(`- Additional failures omitted from this report section: ${r.failures.length - 300}`);
  }
  report.push("");
}

const outDir = path.join(root, "Course Audit");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "SCIENCE_DEEP_RIGOR_AUDIT_2026-07-11.md");
fs.writeFileSync(outFile, report.join("\n"), "utf8");

console.log(JSON.stringify({
  report: rel(outFile),
  totalFailures,
  courses: results.map((r) => ({
    course: r.course,
    lessons: r.lessons,
    htmlPages: r.htmlPages,
    xmlFiles: r.xmlFiles,
    xmlQuestions: r.xmlQuestions,
    lessonsWithUrl: r.lessonsWithUrl,
    urls: r.urls,
    failures: r.failures.length,
  })),
}, null, 2));
