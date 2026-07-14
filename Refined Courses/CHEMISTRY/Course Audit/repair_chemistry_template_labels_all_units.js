const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

function lessonDirs() {
  const units = fs.readdirSync(unitsRoot).filter((n) => /^Unit \d+/.test(n)).sort();
  const dirs = [];
  for (const unit of units) {
    const unitDir = path.join(unitsRoot, unit);
    for (const lesson of fs.readdirSync(unitDir).filter((n) => /^Lesson \d+/.test(n)).sort()) {
      dirs.push(path.join(unitDir, lesson));
    }
  }
  return dirs;
}

function replaceFirst(body, needle, insert) {
  const index = body.indexOf(needle);
  if (index === -1) return insert + '\n' + body;
  return body.slice(0, index) + insert + '\n' + body.slice(index);
}

function standardP03Block() {
  return `<div class="mistake"><strong>Common Mistake:</strong> Treating a memorized chemistry phrase as an explanation without using evidence from the model, table, formula, diagram, or source.</div>
<div class="mistake"><strong>Incorrect:</strong> The answer is correct because it sounds like the vocabulary word from the lesson.</div>
<div class="correct"><strong>Correct:</strong> The answer is supported when the claim uses the lesson vocabulary and points to specific chemistry evidence.</div>
<h2>Teachable Explanation</h2>
<p>A chemistry explanation must connect a claim to evidence. If the evidence is missing, the answer is not yet complete even if the vocabulary word is familiar.</p>`;
}

function standardP04Block() {
  return `<div class="mistake"><strong>Common Mistake:</strong> Writing the final chemistry answer without showing the evidence or reasoning steps.</div>
<div class="mistake"><strong>Incorrect:</strong> The answer is correct because that is the rule.</div>
<div class="correct"><strong>Correct:</strong> The answer is supported because the model, formula, table, data, or diagram shows the evidence and the reasoning explains how it supports the claim.</div>
<h2>Teachable Explanation</h2>
<p>Worked examples are useful because they show how to move from evidence to reasoning to a chemistry conclusion.</p>`;
}

function standardP07Block() {
  return `<h2>Checkpoint Submission</h2>
<p>Submit a clear typed response, scan, or photo according to the course submission directions. Your submission must show the chemistry claim, evidence, and reasoning.</p>`;
}

function ensureP03(html) {
  let next = html
    .replace(/<strong>Incorrect example:<\/strong>/gi, '<strong>Incorrect:</strong>')
    .replace(/<strong>Correct example:<\/strong>/gi, '<strong>Correct:</strong>');
  if (!/Common Mistake/i.test(next) || !/Incorrect:/i.test(next) || !/Correct:/i.test(next) || !/Teachable Explanation/i.test(next)) {
    next = replaceFirst(next, '<div class=', standardP03Block());
  }
  return next;
}

function ensureP04(html) {
  let next = html
    .replace(/<strong>Incorrect example:<\/strong>/gi, '<strong>Incorrect:</strong>')
    .replace(/<strong>Correct example:<\/strong>/gi, '<strong>Correct:</strong>')
    .replace(/\bInterpret:/g, 'Interpretation:');
  let count = 0;
  next = next.replace(/<h3>Worked Example: ([^<]+)<\/h3>/g, (_, title) => {
    count += 1;
    return `<h3>Worked Example ${count}: ${title}</h3>`;
  });
  if (!/Step 1/i.test(next)) {
    next = next.replace(/<ol><li>/, '<ol><li><strong>Step 1:</strong> ');
  }
  if (!/Interpretation/i.test(next)) {
    next = next.replace('</ol>', '<li><strong>Interpretation:</strong> Explain what the chemistry evidence shows and why it supports the conclusion.</li></ol>');
  }
  if (!/Common Mistake/i.test(next) || !/Incorrect:/i.test(next) || !/Correct:/i.test(next) || !/Teachable Explanation/i.test(next)) {
    next = replaceFirst(next, '<div class=', standardP04Block());
  }
  return next;
}

function ensureP07(html) {
  let next = html;
  if (!/Checkpoint Submission/i.test(next)) {
    next = replaceFirst(next, '<h2>Submission Workflow</h2>', standardP07Block());
  }
  return next;
}

let changed = 0;
for (const dir of lessonDirs()) {
  for (const [file, fn] of [
    ['P03.html', ensureP03],
    ['P04.html', ensureP04],
    ['P07.html', ensureP07],
  ]) {
    const pagePath = path.join(dir, file);
    const before = fs.readFileSync(pagePath, 'utf8');
    const after = fn(before);
    if (after !== before) {
      fs.writeFileSync(pagePath, after, 'utf8');
      changed += 1;
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
