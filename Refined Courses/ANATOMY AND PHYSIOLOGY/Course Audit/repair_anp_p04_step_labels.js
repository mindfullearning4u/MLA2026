const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

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

function addStepOne(html) {
  if (/Step 1/i.test(html)) return html;
  const step = '<p><strong>Step 1:</strong> Identify the structure, function, model, data, or case evidence named in the worked example before choosing or writing an answer.</p>';
  const heading = /(<h2>Worked Example 1:[\s\S]*?<\/h2>)/i;
  if (heading.test(html)) {
    return html.replace(heading, `$1\n  ${step}`);
  }
  return html.replace(/(<h1[^>]*>P04 Worked Example<\/h1>[\s\S]*?<\/div>)/i, `$1\n\n<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #ffffff; border: 1px solid #d1d5db; border-left: 6px solid #64748b; border-radius: 10px; padding: 22px;">\n  <h2>Worked Example Step Setup</h2>\n  ${step}\n</div>`);
}

let changed = 0;
for (const dir of lessonDirs()) {
  const pagePath = path.join(dir, 'P04.html');
  const before = fs.readFileSync(pagePath, 'utf8');
  const after = addStepOne(before);
  if (before !== after) {
    fs.writeFileSync(pagePath, after, 'utf8');
    changed += 1;
  }
}

console.log(JSON.stringify({ changed }, null, 2));
