const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

const base = 'font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; ';

function lessonDirs() {
  const dirs = [];
  for (const unit of fs.readdirSync(unitsRoot).filter((name) => /^Unit \d+/.test(name)).sort()) {
    const unitDir = path.join(unitsRoot, unit);
    for (const lesson of fs.readdirSync(unitDir).filter((name) => /^Lesson \d+/.test(name)).sort()) {
      dirs.push(path.join(unitDir, lesson));
    }
  }
  return dirs;
}

function card(kind, heading, body) {
  const style = kind === 'mistake'
    ? `${base}background: #fef2f2; border: 1px solid #fecaca; border-left: 6px solid #dc2626; border-radius: 10px; padding: 22px;`
    : kind === 'correct'
      ? `${base}background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 6px solid #16a34a; border-radius: 10px; padding: 22px;`
      : `${base}background: #f8fafc; border: 1px solid #d1d5db; border-left: 6px solid #334155; border-radius: 10px; padding: 22px;`;
  return `<div style="${style}"><h2>${heading}</h2>${body}</div>`;
}

function firstRoleCardEnd(html) {
  const match = html.match(/<div style="[^"]*border-left: 8px solid[\s\S]*?<\/div>/i);
  return match ? match.index + match[0].length : -1;
}

function insertAfterRoleCard(html, block) {
  const idx = firstRoleCardEnd(html);
  if (idx < 0) return `${block}\n${html}`;
  return `${html.slice(0, idx)}\n\n${block}${html.slice(idx)}`;
}

let changed = 0;
for (const dir of lessonDirs()) {
  const pages = {
    p01: path.join(dir, 'P01.html'),
    p02: path.join(dir, 'P02.html'),
    p03: path.join(dir, 'P03.html'),
    p07: path.join(dir, 'P07.html'),
  };

  let p01 = fs.readFileSync(pages.p01, 'utf8');
  let next = p01;
  if (!/Student-friendly standard connection/i.test(next)) {
    next += `\n${card('check', 'Student-friendly standard connection', '<p>This lesson teaches how Earth and space science claims are built from specific evidence, models, maps, data displays, and reliable sources instead of unsupported guesses.</p>')}\n`;
  }
  if (next !== p01) {
    fs.writeFileSync(pages.p01, next, 'utf8');
    changed += 1;
  }

  let p02 = fs.readFileSync(pages.p02, 'utf8');
  next = p02;
  if (!/Notebook Title/i.test(next)) {
    const titleBlock = card('check', 'Notebook Title', '<p><strong>Notebook Title:</strong> Earth Space Science Evidence and Vocabulary Notes</p>');
    next = insertAfterRoleCard(next, titleBlock);
  }
  if (next !== p02) {
    fs.writeFileSync(pages.p02, next, 'utf8');
    changed += 1;
  }

  let p03 = fs.readFileSync(pages.p03, 'utf8');
  next = p03;
  if (!/Incorrect:/i.test(next) || !/Correct:/i.test(next)) {
    next += `\n${card('mistake', 'Common Misconception Check', '<p><strong>Incorrect:</strong> Treating a familiar Earth or space science phrase as evidence without pointing to the specific source, map, model, data display, or observation.</p>')}\n`;
    next += `\n${card('correct', 'Correct Reasoning', '<p><strong>Correct:</strong> Name the exact evidence, identify what it shows, and explain how it supports the claim inside the mapped standard.</p>')}\n`;
  }
  if (!/Teachable Explanation/i.test(next)) {
    next += `\n${card('correct', 'Teachable Explanation', '<p>A complete Earth and space science response uses evidence first, then explains the model, pattern, source reliability, or Earth-system relationship that makes the answer valid.</p>')}\n`;
  }
  if (next !== p03) {
    fs.writeFileSync(pages.p03, next, 'utf8');
    changed += 1;
  }

  let p07 = fs.readFileSync(pages.p07, 'utf8');
  next = p07;
  if (!/Submission Workflow/i.test(next)) {
    next += `\n${card('check', 'Submission Workflow', '<p>Submit the checkpoint response, notebook evidence, and any required correction work in the assigned Moodle location. If the Teacher of Record returns the work, revise the evidence and reasoning before resubmission.</p>')}\n`;
  }
  if (next !== p07) {
    fs.writeFileSync(pages.p07, next, 'utf8');
    changed += 1;
  }
}

console.log(JSON.stringify({ changed }, null, 2));
