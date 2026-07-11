const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const unitsRoot = path.join(root, "Units");
const productionRoot = path.join(root, "Course Production");
const auditRoot = path.join(root, "Course Audit");

function walk(dir, filter, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filter, out);
    else if (filter(full)) out.push(full);
  }
  return out;
}
function read(file) { return fs.readFileSync(file, "utf8"); }
function rel(file) { return path.relative(root, file).replace(/\\/g, "/"); }
function count(text, pattern) { return (text.match(pattern) || []).length; }
function patternedKey(key) {
  if (/ABCD|DCBA/.test(key)) return true;
  if (/(.)\1{2,}/.test(key)) return true;
  const seenTri = new Set();
  for (let i = 0; i <= key.length - 3; i++) {
    const tri = key.slice(i, i + 3);
    if (seenTri.has(tri)) return true;
    seenTri.add(tri);
  }
  return false;
}

const htmlFiles = walk(unitsRoot, f => /^P0[1-7]\.html$/.test(path.basename(f)));
const lessonJsonFiles = walk(unitsRoot, f => path.basename(f) === "lesson.json");
const quizJsonFiles = walk(unitsRoot, f => path.basename(f) === "quiz.json");
const xmlFiles = walk(unitsRoot, f => f.endsWith(".xml"));
const prodFiles = walk(productionRoot, f => f.endsWith(".md"));
const giftFiles = walk(root, f => f.endsWith(".gift"));
const failures = [];
function fail(msg) { failures.push(msg); }

if (htmlFiles.length !== 336) fail(`Expected 336 HTML lesson pages; found ${htmlFiles.length}.`);
if (lessonJsonFiles.length !== 48) fail(`Expected 48 lesson.json files; found ${lessonJsonFiles.length}.`);
if (quizJsonFiles.length !== 48) fail(`Expected 48 quiz.json files; found ${quizJsonFiles.length}.`);
if (xmlFiles.length !== 102) fail(`Expected 102 Moodle XML files; found ${xmlFiles.length}.`);
if (prodFiles.length < 8) fail(`Expected at least 8 course production files; found ${prodFiles.length}.`);
if (giftFiles.length) fail(`Legacy GIFT files are not allowed in production course folder: ${giftFiles.map(rel).slice(0, 8).join(", ")}`);

const prohibited = /your teacher will explain|your teacher will show|wait for teacher guidance|complete a teacher check|ask your teacher to teach|teacher will walk|not rely on live teacher|live teacher/i;
const weak = /important because it is important|answers may vary|placeholder|TBD|candidate resource|for approval|GIFT/i;
const missingVisual = htmlFiles.filter(f => !/(content-visual|mla-visual|<table)/i.test(read(f)));
if (missingVisual.length) fail(`Missing embedded visual/table support: ${missingVisual.map(rel).slice(0, 8).join(", ")}`);
const missingTor = htmlFiles.filter(f => !/Teacher of Record Support|Teacher of Record Graded/i.test(read(f)));
if (missingTor.length) fail(`Missing Teacher of Record support/checkpoint language: ${missingTor.map(rel).slice(0, 8).join(", ")}`);
const prohibitedHits = [...htmlFiles, ...xmlFiles, ...prodFiles].filter(f => prohibited.test(read(f)));
if (prohibitedHits.length) fail(`Prohibited live-teacher language found: ${prohibitedHits.map(rel).slice(0, 8).join(", ")}`);
const weakHits = [...htmlFiles, ...xmlFiles, ...prodFiles].filter(f => weak.test(read(f)));
if (weakHits.length) fail(`Weak/placeholder/legacy wording found: ${weakHits.map(rel).slice(0, 8).join(", ")}`);

let totalQuestions = 0;
const xmlProblems = [];
for (const file of xmlFiles) {
  const text = read(file);
  if (!/^<\?xml version="1.0" encoding="UTF-8"\?>/.test(text)) xmlProblems.push(`${rel(file)} missing UTF-8 XML declaration`);
  if (!/<questiontext format="html">/.test(text)) xmlProblems.push(`${rel(file)} missing HTML question text`);
  if (!/(content-visual|mla-visual|<table)/.test(text)) xmlProblems.push(`${rel(file)} missing embedded visual/table`);
  const qCount = count(text, /<question type="multichoice">/g);
  totalQuestions += qCount;
  if (file.includes("_Pretest") && qCount !== 10) xmlProblems.push(`${rel(file)} has ${qCount} pretest questions`);
  if (file.includes("_GuidedPractice") && qCount !== 5) xmlProblems.push(`${rel(file)} has ${qCount} guided-practice questions`);
  if (file.includes("_Quiz") && qCount !== 25) xmlProblems.push(`${rel(file)} has ${qCount} quiz questions`);
  if (file.includes("_UnitAssessment") && qCount !== 40) xmlProblems.push(`${rel(file)} has ${qCount} unit-assessment questions`);
  for (const [i, m] of [...text.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/g)].entries()) {
    const block = m[1];
    const answers = count(block, /<answer fraction="/g);
    const correct = count(block, /<answer fraction="100"/g);
    if (answers !== 4 || correct !== 1) xmlProblems.push(`${rel(file)} question ${i + 1} answers=${answers} correct=${correct}`);
  }
  const key = [...text.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/g)].map((m) => {
    const answers = [...m[1].matchAll(/<answer fraction="(100|0)"/g)];
    return "ABCD"[answers.findIndex(a => a[1] === "100")];
  }).join("");
  const counts = [..."ABCD"].map(ch => (key.match(new RegExp(ch, "g")) || []).length);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const balanced = key.length === 5 ? max <= 2 : key.length === 10 ? max <= 4 && min >= 1 : key.length === 25 ? max <= 8 && min >= 4 : key.length === 40 ? max <= 12 && min >= 7 : max - min <= 2;
  if (/^(ABCD)+A?B?C?$/.test(key) || patternedKey(key) || !balanced) xmlProblems.push(`${rel(file)} predictable/imbalanced answer key ${key}`);
}
if (totalQuestions !== 1590) fail(`Expected 1590 XML questions; found ${totalQuestions}.`);
if (xmlProblems.length) fail(`XML validation problems: ${xmlProblems.slice(0, 12).join("; ")}`);

for (let unit = 1; unit <= 6; unit++) {
  const unitDir = path.join(unitsRoot, `Unit ${String(unit).padStart(2, "0")}`);
  const lessonDirs = fs.existsSync(unitDir) ? fs.readdirSync(unitDir, { withFileTypes: true }).filter(e => e.isDirectory() && /^Lesson \d{2}$/.test(e.name)) : [];
  if (lessonDirs.length !== 8) fail(`Unit ${unit} expected 8 lesson folders; found ${lessonDirs.length}.`);
  const unitXml = walk(unitDir, f => f.endsWith(".xml"));
  if (unitXml.length !== 17) fail(`Unit ${unit} expected 17 XML files; found ${unitXml.length}.`);
  const lesson8Quiz = unitXml.filter(f => /L08_Quiz/.test(path.basename(f)));
  if (lesson8Quiz.length) fail(`Unit ${unit} has prohibited Lesson 08 quiz: ${lesson8Quiz.map(rel).join(", ")}`);
  const audit = path.join(auditRoot, `PFLE_U${String(unit).padStart(2, "0")}_UNIT_COMPLETION_AUDIT.md`);
  if (!fs.existsSync(audit)) fail(`Missing unit audit file ${rel(audit)}.`);
}

const referencePattern = /\b(the map|the timeline|the source|the chart|the table|the image|shown above|shown below|graph above|table below|the data shown)\b/i;
const filesWithUnembeddedReferencePattern = [...htmlFiles, ...xmlFiles].filter(file => referencePattern.test(read(file)) && !/(content-visual|mla-visual|<table)/i.test(read(file)));
if (filesWithUnembeddedReferencePattern.length) fail(`Unembedded visual/source reference: ${filesWithUnembeddedReferencePattern.map(rel).slice(0, 8).join(", ")}`);

const simulationPlaceholders = [...htmlFiles, ...xmlFiles, ...lessonJsonFiles, ...quizJsonFiles].filter(file => /simulation|required simulation|virtual lab|candidate resource|for approval/i.test(read(file)));
if (simulationPlaceholders.length) fail(`Lesson/assessment contains simulation or approval placeholder: ${simulationPlaceholders.map(rel).slice(0, 8).join(", ")}`);

const report = {
  htmlPages: htmlFiles.length,
  lessonJson: lessonJsonFiles.length,
  quizJson: quizJsonFiles.length,
  xmlFiles: xmlFiles.length,
  xmlQuestions: totalQuestions,
  productionFiles: prodFiles.length,
  htmlMissingVisual: missingVisual.length,
  filesWithUnembeddedReferencePattern: filesWithUnembeddedReferencePattern.length,
  lessonOrAssessmentSimulationApprovalPlaceholders: simulationPlaceholders.length,
  failures,
  decision: failures.length ? "FAIL" : "PASS"
};

fs.mkdirSync(auditRoot, { recursive: true });
fs.writeFileSync(path.join(auditRoot, "PFLE_FINAL_COURSE_COMPLETION_AUDIT.md"), `# Personal Financial Literacy and Economics Final Course Completion Audit

\`\`\`json
${JSON.stringify(report, null, 2)}
\`\`\`

Findings:

- Course structure: 6 units, 8 lessons per unit, 336 lesson HTML pages.
- Assessment structure: 102 Moodle XML files and 1590 questions.
- Lesson 8 in every unit is synthesis with Guided Practice and Unit Assessment only; no Lesson 8 quiz.
- Embedded financial/economic visual and source supports are present in lessons and XML questions.
- No GIFT files are certified or present in the production course folder.
- No social studies simulation requirement or approval placeholder appears in lessons or assessment files.

Final decision: **${report.decision}**
`, "utf8");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
