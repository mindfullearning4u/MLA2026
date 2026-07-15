const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const units = path.join(root, 'Units');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full); else files.push(full);
  }
}
walk(units);

const html = files.filter((f) => /P0[1-7]\.html$/.test(f));
const xml = files.filter((f) => f.endsWith('.xml'));
const failures = [];
const allIds = new Set();
const allQuestionHtml = new Set();
let questions = 0;
let xmlWithSvg = 0;
let xmlWithTable = 0;

function count(text, pattern) { return (text.match(pattern) || []).length; }
function fail(file, message) { failures.push(`${path.relative(root, file)} :: ${message}`); }

if (html.length !== 336) failures.push(`Expected 336 lesson pages; found ${html.length}`);
if (xml.length !== 102) failures.push(`Expected 102 XML banks; found ${xml.length}`);

for (const file of html) {
  const text = fs.readFileSync(file, 'utf8');
  if (count(text, /Teacher of Record Support/g) !== 1) fail(file, 'must contain exactly one positive TOR support box');
  if (/no teacher|without a teacher|Step-by-Step Reasoning Routine|What the Mapped Standards Require|best uses evidence from the model or table/i.test(text)) fail(file, 'contains prohibited generic or negative language');
  const page = path.basename(file, '.html');
  if (page === 'P01' && !/Why This Matters/.test(text)) fail(file, 'missing student purpose');
  if (page === 'P02' && (!/<svg/.test(text) || !/Vocabulary You Will Use/.test(text))) fail(file, 'missing vocabulary or visible teaching model');
  if (page === 'P03' && !/Completed Model/.test(text)) fail(file, 'missing completed guided-notes answer');
  if (page === 'P04') {
    const lesson7 = /Lesson 07/.test(file);
    if (lesson7 && !/Data Collection and Analysis/.test(text)) fail(file, 'Lesson 7 P04 must be Data Collection and Analysis');
    if (!lesson7 && count(text, /Worked Example [123]:/g) !== 3) fail(file, 'standard P04 must have exactly three worked examples');
    if (!/<svg/.test(text)) fail(file, 'worked example page is missing its visual');
  }
  if (page === 'P06' && (!/<table/.test(text) || !/<svg/.test(text))) fail(file, 'independent work needs a visible evidence table and model');
  if (page === 'P07' && !/Checkpoint Transfer Case/.test(text)) fail(file, 'checkpoint must use a transfer case');
}

for (const file of xml) {
  const text = fs.readFileSync(file, 'utf8');
  if (!/^<\?xml/.test(text) || !/<quiz>[\s\S]*<\/quiz>\s*$/.test(text)) fail(file, 'not a complete Moodle quiz XML document');
  const blocks = [...text.matchAll(/<question type="multichoice">([\s\S]*?)<\/question>/g)].map((m) => m[1]);
  questions += blocks.length;
  const expected = /Pretest/.test(file) ? 10 : /GuidedPractice/.test(file) ? 5 : /UnitAssessment/.test(file) ? 40 : 25;
  if (blocks.length !== expected) fail(file, `expected ${expected} questions; found ${blocks.length}`);
  if (/&lt;svg/.test(text)) xmlWithSvg += 1;
  if (/&lt;table/.test(text)) xmlWithTable += 1;
  if (!/&lt;(div|table|figure)/.test(text)) fail(file, 'bank lacks embedded question stimuli');
  for (const block of blocks) {
    const id = (block.match(/<name><text>([^<]+)<\/text><\/name>/) || [])[1];
    if (!id) fail(file, 'question missing ID');
    else if (allIds.has(id)) fail(file, `duplicate question ID ${id}`); else allIds.add(id);
    if (count(block, /<answer fraction="/g) !== 4) fail(file, `${id} does not have exactly four choices`);
    if (count(block, /<answer fraction="100"/g) !== 1) fail(file, `${id} does not have exactly one keyed answer`);
    if (count(block, /<feedback format="html">/g) !== 4) fail(file, `${id} does not have feedback for every choice`);
    const qhtml = (block.match(/<questiontext format="html"><text>([\s\S]*?)<\/text><\/questiontext>/) || [])[1];
    if (qhtml) {
      const normalized = qhtml.replace(/BIO_U\d+_[A-Z0-9_]+_Q\d+/g, 'ID').replace(/<strong>Question ID:[\s\S]*?<\/p>/, '');
      if (allQuestionHtml.has(normalized)) fail(file, `${id} duplicates another question stem and stimulus`);
      allQuestionHtml.add(normalized);
    }
  }
}

if (questions !== 1590) failures.push(`Expected 1,590 multichoice questions; found ${questions}`);
if (xmlWithSvg < 90) failures.push(`Expected diagrams in at least 90 XML banks; found ${xmlWithSvg}`);
if (xmlWithTable < 90) failures.push(`Expected tables in at least 90 XML banks; found ${xmlWithTable}`);

const report = {
  status: failures.length ? 'FAIL' : 'PASS',
  htmlPages: html.length,
  xmlBanks: xml.length,
  questions,
  xmlBanksWithSvg: xmlWithSvg,
  xmlBanksWithTable: xmlWithTable,
  uniqueQuestionIds: allIds.size,
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
