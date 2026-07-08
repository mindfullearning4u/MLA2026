const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unit = path.join(root, "PHYSICS", "Units", "Unit 04");
const lessons = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => String(n).padStart(2, "0"));
const failures = [];

for (const lesson of lessons) {
  const dir = path.join(unit, `Lesson ${lesson}`);
  for (const page of ["P01", "P02", "P03", "P04", "P05", "P06", "P07"]) {
    const file = path.join(dir, `${page}.html`);
    if (!fs.existsSync(file) || fs.statSync(file).size === 0) failures.push(`Missing or empty page: ${file}`);
    const html = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    const torBoxes = (html.match(/mla-tor-support-box/g) || []).length;
    if (torBoxes !== 1) failures.push(`${file} has ${torBoxes} TOR boxes`);
    if (/teacher will|teacher check|wait for teacher guidance|teacher will show|teacher will explain/i.test(html)) failures.push(`Prohibited teacher-led language: ${file}`);
    if (page === "P02" && !html.includes("Veteran Teacher Slow Walk")) failures.push(`${file} missing Veteran Teacher Slow Walk`);
    if (page === "P03" && !html.includes("Support for Different Readiness Levels")) failures.push(`${file} missing readiness support`);
    if (page === "P04" && (html.match(/Worked Example [123]:/g) || []).length !== 3) failures.push(`${file} does not contain exactly three worked examples`);
    if (!/diagram|table|chart|model|ray|spectrum|visual/i.test(html)) failures.push(`${file} missing explicit visual/model language`);
  }
  JSON.parse(fs.readFileSync(path.join(dir, "lesson.json"), "utf8"));
  JSON.parse(fs.readFileSync(path.join(dir, "quiz.json"), "utf8"));
}

const xmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name.endsWith(".xml")) xmlFiles.push(full);
  }
}
walk(unit);

for (const file of xmlFiles) {
  const xml = fs.readFileSync(file, "utf8");
  const questions = (xml.match(/<question type="multichoice">/g) || []).length;
  const answers = (xml.match(/<answer fraction=/g) || []).length;
  const correct = (xml.match(/<answer fraction="100"/g) || []).length;
  if (questions === 0) failures.push(`No questions: ${file}`);
  if (answers !== questions * 4) failures.push(`Answer count mismatch: ${file}; questions=${questions}; answers=${answers}`);
  if (correct !== questions) failures.push(`Correct answer count mismatch: ${file}; questions=${questions}; correct=${correct}`);
  if (/<text><!\[CDATA\[[A-D]\./.test(xml)) failures.push(`Visible A/B/C/D answer prefix: ${file}`);
  if (!xml.includes("Question ID:")) failures.push(`Missing Question ID text: ${file}`);
  if (!xml.includes("MLA Standard:")) failures.push(`Missing MLA Standard text: ${file}`);
  if (!/table|diagram|chart|model|ray|spectrum|visual/i.test(xml)) failures.push(`Missing embedded visual/data/model stimulus: ${file}`);
}

const expectedCounts = new Map([
  ["PHYS_U04_Pretest_MoodleXML.xml", 10],
  ["PHYS_U04_UnitAssessment_MoodleXML.xml", 40]
]);
for (let n = 1; n <= 8; n++) {
  const lesson = String(n).padStart(2, "0");
  expectedCounts.set(`PHYS_U04_L${lesson}_GuidedPractice_MoodleXML.xml`, 5);
  if (n <= 7) expectedCounts.set(`PHYS_U04_L${lesson}_Quiz_MoodleXML.xml`, 25);
}
for (const [name, expected] of expectedCounts) {
  const file = xmlFiles.find((f) => path.basename(f) === name);
  if (!file) {
    failures.push(`Missing XML: ${name}`);
    continue;
  }
  const count = (fs.readFileSync(file, "utf8").match(/<question type="multichoice">/g) || []).length;
  if (count !== expected) failures.push(`${name} expected ${expected} questions but found ${count}`);
}

console.log(JSON.stringify({ failures, xmlFiles: xmlFiles.length }, null, 2));
if (failures.length > 0) process.exit(1);
