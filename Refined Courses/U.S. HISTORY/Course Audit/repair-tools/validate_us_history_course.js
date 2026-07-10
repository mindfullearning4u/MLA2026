const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const unitsRoot = path.join(root, "Units");

function walk(dir, filter, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filter, out);
    else if (filter(full)) out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const htmlFiles = walk(unitsRoot, (file) => /^P0[1-7]\.html$/.test(path.basename(file)));
const lessonJsonFiles = walk(unitsRoot, (file) => path.basename(file) === "lesson.json");
const quizJsonFiles = walk(unitsRoot, (file) => path.basename(file) === "quiz.json");
const xmlFiles = walk(unitsRoot, (file) => file.endsWith(".xml"));

const prohibited = /your teacher will explain|your teacher will show|wait for teacher guidance|complete a teacher check|ask your teacher to teach|teacher will walk|not rely on live teacher/i;
const prohibitedHits = htmlFiles.filter((file) => prohibited.test(read(file)));
const genericVisualHits = htmlFiles.filter((file) => /generic context\/evidence\/reasoning organizer/i.test(read(file)));
const contentVisualHits = htmlFiles.filter((file) => /content-visual|Historical detail/.test(read(file)));
const weakXmlPattern = /helps explain the lesson because|important only because it happened before the present day|proves any answer as long as it uses a familiar historical word|only names and dates matter|because explain|Explain the consequence or significance in a complete sentence|Name the historical setting before judging the evidence|Gilded Age railroad dispute|colonial-era event|twentieth-century Cold War policy|can replace the specific evidence|\.\./i;
const xmlPolishPattern = /supreme Court|kennedy Space|cuban migration|everglades restoration/;
const weakXmlHits = [];
const weakHtmlPattern = /This gives the student the historical setting so the answer is not a guess|is important because it happened in U\.S\. History|How does the evidence in this lesson help explain students|This visual\/stimulus is built|follows from that evidence|\.\./i;
const htmlPolishPattern = /supreme Court|kennedy Space|cuban migration|everglades restoration/;
const weakHtmlHits = htmlFiles.filter((file) => weakHtmlPattern.test(read(file)));
for (const file of htmlFiles) {
  if (htmlPolishPattern.test(read(file)) && !weakHtmlHits.includes(file)) weakHtmlHits.push(file);
}

let xmlQuestionCount = 0;
let xmlBad = [];
for (const file of xmlFiles) {
  const text = read(file);
  if (weakXmlPattern.test(text) || xmlPolishPattern.test(text)) weakXmlHits.push(file);
  const count = (text.match(/<question type="multichoice">/g) || []).length;
  xmlQuestionCount += count;
  if (file.includes("_GuidedPractice_") && count !== 5) xmlBad.push(`${file}: ${count}`);
  if (file.includes("_Quiz_") && count !== 25) xmlBad.push(`${file}: ${count}`);
  if (file.includes("_Pretest_") && count !== 10) xmlBad.push(`${file}: ${count}`);
  if (file.includes("_UnitAssessment_") && count !== 40) xmlBad.push(`${file}: ${count}`);
  const answerCounts = [...text.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/g)].map((m) => {
    const block = m[1];
    const answers = (block.match(/<answer fraction="/g) || []).length;
    const correct = (block.match(/<answer fraction="100"/g) || []).length;
    return { answers, correct };
  });
  for (const [i, q] of answerCounts.entries()) {
    if (q.answers !== 4 || q.correct !== 1) xmlBad.push(`${file}: question ${i + 1} answers=${q.answers} correct=${q.correct}`);
  }
}

const unitSummaries = [];
for (let unit = 1; unit <= 6; unit++) {
  const unitDir = path.join(unitsRoot, `Unit ${String(unit).padStart(2, "0")}`);
  const unitHtml = walk(unitDir, (file) => /^P0[1-7]\.html$/.test(path.basename(file)));
  const unitXml = walk(unitDir, (file) => file.endsWith(".xml"));
  unitSummaries.push({ unit, html: unitHtml.length, xml: unitXml.length });
}

const report = {
  htmlPages: htmlFiles.length,
  lessonJson: lessonJsonFiles.length,
  quizJson: quizJsonFiles.length,
  xmlFiles: xmlFiles.length,
  xmlQuestions: xmlQuestionCount,
  xmlBad,
  weakXmlPatternCount: weakXmlHits.length,
  weakXmlHits,
  weakHtmlPatternCount: weakHtmlHits.length,
  weakHtmlHits,
  prohibitedLanguageCount: prohibitedHits.length,
  genericVisualPhraseCount: genericVisualHits.length,
  contentVisualPages: contentVisualHits.length,
  unitSummaries,
};

console.log(JSON.stringify(report, null, 2));
if (xmlBad.length || weakXmlHits.length || weakHtmlHits.length || prohibitedHits.length || genericVisualHits.length) process.exitCode = 1;
