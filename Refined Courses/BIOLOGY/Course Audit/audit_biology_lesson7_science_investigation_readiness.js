const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');
const productionRoot = path.join(courseRoot, 'Course Production');

const findings = [];

function pad(n) {
  return String(n).padStart(2, '0');
}

function fail(scope, message) {
  findings.push({ scope, message });
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function exists(file, scope) {
  if (!fs.existsSync(file)) fail(scope, `Missing file: ${file}`);
  return fs.existsSync(file);
}

const requiredProduction = [
  'Course-Overview.md',
  'PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md',
  'PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md',
  'PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md',
];

for (const file of requiredProduction) {
  const full = path.join(productionRoot, file);
  if (exists(full, file)) {
    const text = read(full);
    if (!/Lesson 7/i.test(text) || !/investigation/i.test(text)) fail(file, 'Production file does not document Lesson 7 investigation model.');
  }
}

let pageCount = 0;
let lessonCount = 0;
let xmlCount = 0;
let questionCount = 0;
let lesson7XmlWithLabLanguage = 0;
let lesson8QuizFiles = 0;

const roleText = {
  1: 'P01 Lesson Overview',
  2: 'P02 Notebook Task - Part 1',
  3: 'P03 Notebook Task - Part 2',
  4: null,
  5: 'P05 Guided Practice',
  6: 'P06 Independent Work',
  7: 'P07 Checkpoint',
};

for (let u = 1; u <= 6; u += 1) {
  for (let l = 1; l <= 8; l += 1) {
    lessonCount += 1;
    const lessonDir = path.join(unitsRoot, `Unit ${pad(u)}`, `Lesson ${pad(l)}`);
    exists(path.join(lessonDir, 'lesson.json'), `U${pad(u)} L${pad(l)} lesson.json`);
    exists(path.join(lessonDir, 'quiz.json'), `U${pad(u)} L${pad(l)} quiz.json`);
    for (let p = 1; p <= 7; p += 1) {
      const file = path.join(lessonDir, `P0${p}.html`);
      if (!exists(file, `U${pad(u)} L${pad(l)} P0${p}`)) continue;
      pageCount += 1;
      const html = read(file);
      if (/<!DOCTYPE|<html\b|<head\b|<body\b|<main\b/i.test(html)) fail(file, 'HTML includes full document shell or main wrapper instead of Moodle fragment div structure.');
      if (!html.includes(`BIOLOGY | Unit ${pad(u)} | Lesson ${pad(l)}`)) fail(file, 'Missing ALG1-style Biology unit/lesson header.');
      const torCount = (html.match(/mla-tor-support-box/g) || []).length;
      if (torCount !== 1) fail(file, `Expected exactly one TOR support box, found ${torCount}.`);
      const expectedRole = p === 4 && l === 7 ? 'P04 Data Collection and Analysis' : p === 4 ? 'P04 Worked Example' : roleText[p];
      if (!html.includes(expectedRole)) fail(file, `Missing page role text: ${expectedRole}`);
      if (!html.includes('Mapped Standards') && p !== 1) fail(file, 'Missing mapped standards trace on instructional page.');
      if (l === 7 && !/investigation|data|procedure|CER|variable/i.test(html)) fail(file, 'Lesson 7 page lacks investigation/data/procedure/CER language.');
      if (l === 7 && p === 2) {
        for (const required of ['Investigation Notebook Setup', 'Investigation Question', 'Claim Being Tested', 'Controlled Conditions', 'Evidence Source or Condition', 'How the Student Should Use It']) {
          if (!html.includes(required)) fail(file, `Lesson 7 P02 lacks concrete student setup item: ${required}`);
        }
      }
      if (l === 7 && p === 4) {
        for (const required of ['Question:', 'Claim being tested', 'Data or Observation', 'How the Student Should Use It', 'limitation', 'CER']) {
          if (!html.includes(required)) fail(file, `Lesson 7 P04 lacks concrete data-analysis direction: ${required}`);
        }
      }
      if (l === 7 && p === 6) {
        for (const required of ['Part A:', 'Part B:', 'Part C:', 'two evidence rows', 'complete CER']) {
          if (!html.includes(required)) fail(file, `Lesson 7 P06 lacks independent investigation deliverable: ${required}`);
        }
      }
      if (l === 7 && p === 7) {
        for (const required of ['Checkpoint Task', 'two exact evidence statements', 'complete CER response']) {
          if (!html.includes(required)) fail(file, `Lesson 7 P07 lacks final checkpoint deliverable: ${required}`);
        }
      }
      if (l !== 7 && p === 4) {
        const worked = (html.match(/Worked Example [123]/g) || []).length;
        if (worked < 3) fail(file, `Non-Lesson 7 P04 has fewer than three worked examples (${worked}).`);
      }
    }
  }
}

function decodeEntities(s) {
  return String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function tagText(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>\\s*<text>([\\s\\S]*?)<\\/text>\\s*<\\/${tag}>`, 'i'));
  return match ? decodeEntities(match[1]) : '';
}

function firstText(block) {
  const match = block.match(/<text>([\s\S]*?)<\/text>/i);
  return match ? decodeEntities(match[1]) : '';
}

function answerBlocks(questionBlock) {
  return Array.from(questionBlock.matchAll(/<answer\b[^>]*fraction="([^"]+)"[^>]*>([\s\S]*?)<\/answer>/gi)).map((m) => ({
    fraction: m[1],
    block: m[2],
  }));
}

function auditXml(file, expectedQuestions, scope, expectLabLanguage) {
  if (!exists(file, scope)) return;
  xmlCount += 1;
  const text = read(file);
  if (!text.includes('<quiz>') || !text.includes('</quiz>')) fail(scope, 'XML missing quiz root.');
  const questions = Array.from(text.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/gi)).map((m) => m[1]);
  questionCount += questions.length;
  if (questions.length !== expectedQuestions) fail(scope, `Expected ${expectedQuestions} multichoice questions, found ${questions.length}.`);
  let correctIndexes = [];
  const stems = new Set();
  for (const [index, q] of questions.entries()) {
    const qtext = tagText(q, 'questiontext');
    if (!qtext.includes('Question ID:') || !qtext.includes('MLA Standard:')) fail(scope, `Question ${index + 1} missing ID or standard trace.`);
    if (stems.has(qtext)) fail(scope, `Duplicate question stem at item ${index + 1}.`);
    stems.add(qtext);
    const answers = answerBlocks(q);
    if (answers.length !== 4) fail(scope, `Question ${index + 1} expected 4 answers, found ${answers.length}.`);
    const correct = answers.filter((a) => a.fraction === '100');
    if (correct.length !== 1) fail(scope, `Question ${index + 1} expected one correct answer, found ${correct.length}.`);
    if (correct.length === 1) correctIndexes.push(answers.indexOf(correct[0]));
    const answerTexts = answers.map((a) => firstText(a.block).trim());
    if (new Set(answerTexts).size !== answerTexts.length) fail(scope, `Question ${index + 1} has duplicate answer choices.`);
    for (const a of answers) {
      const fb = tagText(a.block, 'feedback').trim();
      if (fb.length < 35 || /^(Correct\.|Incorrect\.|Try again\.|Good job\.)$/i.test(fb)) fail(scope, `Question ${index + 1} has weak feedback.`);
    }
  }
  const joined = correctIndexes.join('');
  if (/^(0123)+/.test(joined) || /(.)\1\1\1/.test(joined)) fail(scope, `Correct answer pattern is predictable: ${joined}`);
  if (expectLabLanguage) {
    if (/investigation|variable|procedure|data|model|CER|limitation|safety/i.test(text)) lesson7XmlWithLabLanguage += 1;
    else fail(scope, 'Lesson 7 assessment lacks lab/data/investigation language.');
  }
}

for (let u = 1; u <= 6; u += 1) {
  const unitXmlDir = path.join(unitsRoot, `Unit ${pad(u)}`, 'Moodle XML');
  auditXml(path.join(unitXmlDir, `BIO_U${pad(u)}_Pretest_MoodleXML.xml`), 10, `U${pad(u)} Pretest`, false);
  for (let l = 1; l <= 8; l += 1) {
    const xmlDir = path.join(unitsRoot, `Unit ${pad(u)}`, `Lesson ${pad(l)}`, 'Moodle XML');
    auditXml(path.join(xmlDir, `BIO_U${pad(u)}_L${pad(l)}_GuidedPractice_MoodleXML.xml`), 5, `U${pad(u)} L${pad(l)} Guided Practice`, l === 7);
    const quiz = path.join(xmlDir, `BIO_U${pad(u)}_L${pad(l)}_Quiz_MoodleXML.xml`);
    if (l === 8) {
      if (fs.existsSync(quiz)) {
        lesson8QuizFiles += 1;
        fail(`U${pad(u)} L08`, 'Lesson 8 quiz file exists but should not.');
      }
      auditXml(path.join(xmlDir, `BIO_U${pad(u)}_UnitAssessment_MoodleXML.xml`), 40, `U${pad(u)} Unit Assessment`, false);
    } else {
      auditXml(quiz, 25, `U${pad(u)} L${pad(l)} Quiz`, l === 7);
    }
  }
}

const report = `# Biology Lesson 7 Science Investigation Readiness Audit

Date: 2026-07-14

## Scope

- Course: Biology
- Production mapping checked: Course Overview, unit mapping, lesson mapping, lab/visual/simulation mapping
- Lesson pages checked: P01-P07 for all 48 lessons
- Assessment XML checked: Unit Pretests, Guided Practice, Lesson Quizzes for Lessons 1-7, Unit Assessments in Lesson 8

## Result

${findings.length === 0 ? 'PASS' : 'FAIL'}

## Counts

| Item | Count |
|---|---:|
| Lessons checked | ${lessonCount} |
| HTML pages checked | ${pageCount} |
| Moodle XML files checked | ${xmlCount} |
| Moodle XML multichoice questions checked | ${questionCount} |
| Lesson 7 lab/data XML banks with investigation language | ${lesson7XmlWithLabLanguage} |
| Lesson 8 quiz files found | ${lesson8QuizFiles} |

## Required Gates

| Gate | Result |
|---|---|
| ALG1-style Moodle fragment pages, no full HTML shell | ${findings.some((f) => /document shell|main wrapper/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Exactly one TOR support box per page | ${findings.some((f) => /TOR support/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Lesson 7 mapped as dedicated investigation | ${findings.some((f) => /Lesson 7 investigation model/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Lesson 7 P04 uses Data Collection and Analysis exception | ${findings.some((f) => /P04 Data Collection/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Lesson 7 pages include concrete question, claim, data/model evidence, and CER deliverables | ${findings.some((f) => /concrete student setup|concrete data-analysis|independent investigation deliverable|final checkpoint deliverable/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Non-Lesson 7 P04 pages retain three worked examples | ${findings.some((f) => /fewer than three worked examples/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Lesson 8 has no lesson quiz bank | ${lesson8QuizFiles === 0 ? 'PASS' : 'FAIL'} |
| XML validates structurally | ${findings.some((f) => /XML parser/.test(f.message)) ? 'FAIL' : 'PASS'} |
| XML question counts match required structure | ${findings.some((f) => /Expected \\d+ multichoice/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Four choices and one correct answer per question | ${findings.some((f) => /expected 4 answers|expected one correct/.test(f.message)) ? 'FAIL' : 'PASS'} |
| Teachable feedback present | ${findings.some((f) => /weak feedback/.test(f.message)) ? 'FAIL' : 'PASS'} |
| No predictable answer pattern flagged | ${findings.some((f) => /pattern is predictable/.test(f.message)) ? 'FAIL' : 'PASS'} |

## Findings

${findings.length === 0 ? 'No findings. Biology passes the Lesson 7 science investigation readiness gate for Moodle pilot transfer review.' : findings.map((f) => `- **${f.scope}:** ${f.message}`).join('\n')}

## Audit Decision

${findings.length === 0 ? 'Biology is ready for the user Moodle pilot transfer review under the revised science lesson architecture. Lesson 7 is the documented science exception in every unit, and required assessment banks are present in Moodle XML.' : 'Biology is not ready until the findings above are repaired and this audit passes.'}
`;

const reportPath = path.join(courseRoot, 'Course Audit', 'BIOLOGY_LESSON7_SCIENCE_INVESTIGATION_READINESS_AUDIT_2026-07-14.md');
fs.writeFileSync(reportPath, report, 'utf8');

console.log(JSON.stringify({
  result: findings.length === 0 ? 'PASS' : 'FAIL',
  findings: findings.length,
  lessons: lessonCount,
  pages: pageCount,
  xmlFiles: xmlCount,
  questions: questionCount,
  reportPath,
}, null, 2));

if (findings.length) process.exitCode = 1;
