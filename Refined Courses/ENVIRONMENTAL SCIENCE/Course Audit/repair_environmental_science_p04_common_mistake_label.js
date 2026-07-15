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

let changed = 0;
for (const dir of lessonDirs()) {
  const pagePath = path.join(dir, 'P04.html');
  const before = fs.readFileSync(pagePath, 'utf8');
  let after = before;
  if (!/Common Mistake/i.test(after)) {
    after = after.replace(/<h2>Incorrect Reasoning Check<\/h2>/i, '<h2>Common Mistake</h2>');
  }
  if (!/Common Mistake/i.test(after)) {
    after += '\n<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #fef2f2; border: 1px solid #fecaca; border-left: 6px solid #dc2626; border-radius: 10px; padding: 22px;"><h2>Common Mistake</h2><p><strong>Incorrect:</strong> Choosing an environmental answer because it sounds familiar without matching it to the specific evidence, system, source, or tradeoff.</p></div>\n';
  }
  if (after !== before) {
    fs.writeFileSync(pagePath, after, 'utf8');
    changed += 1;
  }
}

console.log(JSON.stringify({ changed }, null, 2));
