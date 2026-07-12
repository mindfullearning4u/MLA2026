const fs = require("fs");
const path = require("path");

const root = process.cwd();
const course = path.join(root, "MARINE SCIENCE");
const units = path.join(course, "Units");

function walk(dir, predicate, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file, predicate, out);
    else if (predicate(file)) out.push(file);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

const lessonJson = walk(units, (file) => path.basename(file) === "lesson.json");
const quizJson = walk(units, (file) => path.basename(file) === "quiz.json");
const html = walk(units, (file) => /\.html$/i.test(file));
const xml = walk(units, (file) => /\.xml$/i.test(file));

const missingPages = [];
for (let u = 1; u <= 6; u += 1) {
  for (let l = 1; l <= 8; l += 1) {
    const lessonDir = path.join(units, `Unit ${String(u).padStart(2, "0")}`, "Lesson " + String(l).padStart(2, "0"));
    for (let p = 1; p <= 7; p += 1) {
      const page = path.join(lessonDir, `P${String(p).padStart(2, "0")}.html`);
      if (!fs.existsSync(page) || read(page).trim().length === 0) missingPages.push(rel(page));
    }
  }
}

const missingLessonMetadata = [];
for (let u = 1; u <= 6; u += 1) {
  for (let l = 1; l <= 8; l += 1) {
    const lessonDir = path.join(units, `Unit ${String(u).padStart(2, "0")}`, "Lesson " + String(l).padStart(2, "0"));
    for (const name of ["lesson.json", "quiz.json"]) {
      const file = path.join(lessonDir, name);
      if (!fs.existsSync(file) || read(file).trim().length === 0) missingLessonMetadata.push(rel(file));
    }
  }
}

const xmlIssues = [];
const xmlCounts = {
  guidedPractice: 0,
  quiz: 0,
  pretest: 0,
  unitAssessment: 0,
  questions: 0,
  answerDistribution: { 1: 0, 2: 0, 3: 0, 4: 0 },
};

for (const file of xml) {
  const text = read(file);
  const name = path.basename(file);
  if (/GuidedPractice/i.test(name)) xmlCounts.guidedPractice += 1;
  if (/Quiz/i.test(name)) xmlCounts.quiz += 1;
  if (/Pretest/i.test(name)) xmlCounts.pretest += 1;
  if (/UnitAssessment/i.test(name)) xmlCounts.unitAssessment += 1;

  const questionBlocks = text.split(/<question type="multichoice">/).slice(1);
  xmlCounts.questions += questionBlocks.length;
  const expected = /GuidedPractice/i.test(name) ? 5 : /Quiz/i.test(name) ? 25 : /Pretest/i.test(name) ? 10 : /UnitAssessment/i.test(name) ? 40 : null;
  if (expected !== null && questionBlocks.length !== expected) xmlIssues.push(`${rel(file)} expected ${expected} questions, found ${questionBlocks.length}`);

  for (const block of questionBlocks) {
    const answers = Array.from(block.matchAll(/<answer fraction="([^"]+)"/g)).map((match) => match[1]);
    const correctCount = answers.filter((value) => value === "100").length;
    if (answers.length !== 4) xmlIssues.push(`${rel(file)} has a question with ${answers.length} answers`);
    if (correctCount !== 1) xmlIssues.push(`${rel(file)} has a question with ${correctCount} correct answers`);
    const correctIndex = answers.findIndex((value) => value === "100") + 1;
    if (correctIndex > 0) xmlCounts.answerDistribution[correctIndex] += 1;
    if (!/MLA\.MAR\./.test(block)) xmlIssues.push(`${rel(file)} has a question missing MLA.MAR standard text`);
    if (!/feedback format="html"/.test(block)) xmlIssues.push(`${rel(file)} has a question missing answer feedback`);
    if (!/(Stimulus:|<table|diagram|model|data|map|graph|source|case)/i.test(block)) xmlIssues.push(`${rel(file)} has a question missing embedded stimulus cue`);
  }
}

const pagesMissingResource = [];
const pagesMissingStandard = [];
const pagesMissingEvidence = [];
for (const file of html) {
  const text = read(file);
  if (!/MLA\.MAR\./.test(text)) pagesMissingStandard.push(rel(file));
  if (!/https?:\/\//.test(text)) pagesMissingResource.push(rel(file));
  if (!/(Required Visual|Required evidence|Claim|Evidence|Reasoning|data|model|map|graph|source|case)/i.test(text)) pagesMissingEvidence.push(rel(file));
}

const result = {
  course: "MARINE SCIENCE",
  lessons: lessonJson.length,
  quizJson: quizJson.length,
  htmlPages: html.length,
  xmlFiles: xml.length,
  xmlCounts,
  missingPages,
  missingLessonMetadata,
  pagesMissingStandard: pagesMissingStandard.slice(0, 25),
  pagesMissingResource: pagesMissingResource.slice(0, 25),
  pagesMissingEvidence: pagesMissingEvidence.slice(0, 25),
  pagesMissingStandardCount: pagesMissingStandard.length,
  pagesMissingResourceCount: pagesMissingResource.length,
  pagesMissingEvidenceCount: pagesMissingEvidence.length,
  xmlIssueCount: xmlIssues.length,
  xmlIssues: xmlIssues.slice(0, 25),
  decision:
    lessonJson.length === 48 &&
    quizJson.length === 48 &&
    html.length === 336 &&
    xml.length === 102 &&
    missingPages.length === 0 &&
    missingLessonMetadata.length === 0 &&
    pagesMissingStandard.length === 0 &&
    pagesMissingResource.length === 0 &&
    pagesMissingEvidence.length === 0 &&
    xmlIssues.length === 0
      ? "PASS"
      : "FAIL",
};

console.log(JSON.stringify(result, null, 2));
