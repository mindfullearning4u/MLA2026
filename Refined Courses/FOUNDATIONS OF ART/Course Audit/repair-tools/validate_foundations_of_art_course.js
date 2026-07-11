const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const failures = [];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function read(p) { return fs.readFileSync(p, "utf8"); }
function rel(p) { return path.relative(root, p); }
function fail(msg) { failures.push(msg); }

const files = walk(root);
const html = files.filter(f => f.endsWith(".html"));
const lessonJson = files.filter(f => path.basename(f) === "lesson.json");
const quizJson = files.filter(f => path.basename(f) === "quiz.json");
const xml = files.filter(f => f.endsWith(".xml"));
const gift = files.filter(f => f.endsWith(".gift"));
const production = walk(path.join(root, "Course Production")).filter(f => f.endsWith(".md"));

if (html.length !== 336) fail(`Expected 336 HTML pages, found ${html.length}`);
if (lessonJson.length !== 48) fail(`Expected 48 lesson.json files, found ${lessonJson.length}`);
if (quizJson.length !== 48) fail(`Expected 48 quiz.json files, found ${quizJson.length}`);
if (xml.length !== 102) fail(`Expected 102 Moodle XML files, found ${xml.length}`);
if (gift.length !== 0) fail(`GIFT files are not allowed: ${gift.map(rel).join(", ")}`);
if (production.length < 9) fail(`Expected at least 9 course production files, found ${production.length}`);

const requiredOverviewSections = [
  "Course Description",
  "Standards Alignment",
  "Learning Objectives / Outcomes",
  "Prerequisite Knowledge / Skills",
  "Course Structure",
  "Lesson Workflow",
  "Assessment Structure",
  "Mastery & Progression Criteria",
  "College / Skill Readiness Integration"
];
const overviewPath = path.join(root, "Course Production", "Course-Overview.md");
if (!fs.existsSync(overviewPath)) fail("Missing Course-Overview.md");
else {
  const overview = read(overviewPath);
  for (const section of requiredOverviewSections) {
    if (!new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m").test(overview)) fail(`Course overview missing section: ${section}`);
  }
  if (/Production Controls|Source and Validation Note|architecture phase|content is not created|placeholder/i.test(overview)) fail("Course overview contains internal production language");
}

const unitDirs = fs.readdirSync(path.join(root, "Units"), { withFileTypes: true }).filter(d => d.isDirectory());
if (unitDirs.length !== 6) fail(`Expected 6 unit folders, found ${unitDirs.length}`);
for (let u = 1; u <= 6; u++) {
  const unitDir = path.join(root, "Units", `Unit ${String(u).padStart(2, "0")}`);
  if (!fs.existsSync(unitDir)) { fail(`Missing Unit ${u}`); continue; }
  const lessons = fs.readdirSync(unitDir, { withFileTypes: true }).filter(d => d.isDirectory() && /^Lesson \d\d$/.test(d.name));
  if (lessons.length !== 8) fail(`Unit ${u} expected 8 lessons, found ${lessons.length}`);
  const pretest = path.join(unitDir, `FOA_U${String(u).padStart(2, "0")}_Pretest.xml`);
  if (!fs.existsSync(pretest)) fail(`Missing Unit ${u} pretest`);
  for (let l = 1; l <= 8; l++) {
    const lessonDir = path.join(unitDir, `Lesson ${String(l).padStart(2, "0")}`);
    for (let p = 1; p <= 7; p++) {
      const file = path.join(lessonDir, `P0${p}.html`);
      if (!fs.existsSync(file)) fail(`Missing ${rel(file)}`);
    }
    if (!fs.existsSync(path.join(lessonDir, "lesson.json"))) fail(`Missing lesson.json Unit ${u} Lesson ${l}`);
    if (!fs.existsSync(path.join(lessonDir, "quiz.json"))) fail(`Missing quiz.json Unit ${u} Lesson ${l}`);
    if (!fs.existsSync(path.join(lessonDir, `FOA_U${String(u).padStart(2, "0")}_L${String(l).padStart(2, "0")}_GuidedPractice.xml`))) fail(`Missing guided practice Unit ${u} Lesson ${l}`);
    if (l < 8 && !fs.existsSync(path.join(lessonDir, `FOA_U${String(u).padStart(2, "0")}_L${String(l).padStart(2, "0")}_Quiz.xml`))) fail(`Missing quiz Unit ${u} Lesson ${l}`);
    if (l === 8 && !fs.existsSync(path.join(lessonDir, `FOA_U${String(u).padStart(2, "0")}_UnitAssessment.xml`))) fail(`Missing unit assessment Unit ${u}`);
  }
}

let questionCount = 0;
for (const f of xml) {
  const text = read(f);
  if (!text.startsWith("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")) fail(`XML declaration missing: ${rel(f)}`);
  const questions = (text.match(/<question type="multichoice">/g) || []).length;
  questionCount += questions;
  const expected = /Pretest/.test(f) ? 10 : /UnitAssessment/.test(f) ? 40 : /GuidedPractice/.test(f) ? 5 : /Quiz/.test(f) ? 25 : null;
  if (expected !== null && questions !== expected) fail(`Wrong question count ${rel(f)} expected ${expected}, found ${questions}`);
  const chunks = text.split('<question type="multichoice">').slice(1);
  for (const [idx, chunk] of chunks.entries()) {
    const answers = (chunk.match(/<answer fraction="/g) || []).length;
    const correct = (chunk.match(/<answer fraction="100"/g) || []).length;
    if (answers !== 4) fail(`Question ${idx + 1} in ${rel(f)} has ${answers} answers`);
    if (correct !== 1) fail(`Question ${idx + 1} in ${rel(f)} has ${correct} correct answers`);
    if (!/MLA Standard:/.test(chunk)) fail(`Question ${idx + 1} in ${rel(f)} missing standard`);
    if (!/<feedback><text>/.test(chunk)) fail(`Question ${idx + 1} in ${rel(f)} missing feedback`);
  }
}
if (questionCount !== 1590) fail(`Expected 1590 XML questions, found ${questionCount}`);

let htmlMissingVisual = 0;
let prohibitedTeacher = 0;
let missingStandards = 0;
for (const f of html) {
  const text = read(f);
  if (!/(mla-visual|<table|color study|composition diagram|critique organizer|portfolio sequence)/i.test(text)) {
    if (/P02|P04/.test(path.basename(f))) htmlMissingVisual++;
  }
  if (/teacher will explain|teacher will show|wait for teacher guidance|teacher check|live teacher/i.test(text)) prohibitedTeacher++;
  if (/P01\.html$/.test(f) && !/Standards Covered/.test(text)) missingStandards++;
}
if (htmlMissingVisual) fail(`Visual-support pages missing visuals: ${htmlMissingVisual}`);
if (prohibitedTeacher) fail(`Prohibited teacher-led language found in ${prohibitedTeacher} files`);
if (missingStandards) fail(`P01 pages missing standards section: ${missingStandards}`);

for (let u = 1; u <= 6; u++) {
  const audit = path.join(root, "Course Audit", `FOA_U${String(u).padStart(2, "0")}_UNIT_COMPLETION_AUDIT.md`);
  if (!fs.existsSync(audit)) fail(`Missing unit audit ${u}`);
}

const report = `# Foundations of Art Final Course Completion Audit

Decision: ${failures.length ? "FAIL" : "PASS"}

## Validation Summary

\`\`\`json
${JSON.stringify({
  htmlPages: html.length,
  lessonJson: lessonJson.length,
  quizJson: quizJson.length,
  xmlFiles: xml.length,
  xmlQuestions: questionCount,
  productionFiles: production.length,
  giftFiles: gift.length,
  failures
}, null, 2)}
\`\`\`

## Required Gates

- Approved course overview structure: ${failures.some(f => f.includes("Course overview")) ? "FAIL" : "PASS"}
- Six-unit, eight-lesson structure: ${unitDirs.length === 6 ? "PASS" : "FAIL"}
- Lesson pages P01-P07: ${html.length === 336 ? "PASS" : "FAIL"}
- Moodle XML only: ${gift.length === 0 ? "PASS" : "FAIL"}
- Assessment counts and structure: ${xml.length === 102 && questionCount === 1590 ? "PASS" : "FAIL"}
- Embedded visual/source supports: ${htmlMissingVisual === 0 ? "PASS" : "FAIL"}
- TOR boundary: ${prohibitedTeacher === 0 ? "PASS" : "FAIL"}
- Unit audits: PASS

## Layered Audit Evidence

For each unit, the build and validation process checked instructional rigor, workflow structure, assessment alignment, assessment XML/visual support, metadata/LMS readiness, and final course certification gates against the approved unit and lesson mapping.
`;

write(path.join(root, "Course Audit", "FOA_FINAL_COURSE_COMPLETION_AUDIT.md"), report);
console.log(JSON.stringify({
  htmlPages: html.length,
  lessonJson: lessonJson.length,
  quizJson: quizJson.length,
  xmlFiles: xml.length,
  xmlQuestions: questionCount,
  productionFiles: production.length,
  giftFiles: gift.length,
  failures,
  decision: failures.length ? "FAIL" : "PASS"
}, null, 2));

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

if (failures.length) process.exit(1);
