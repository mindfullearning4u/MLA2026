const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

function getLessonDirs() {
  const dirs = [];
  for (const unit of fs.readdirSync(unitsRoot).filter((name) => /^Unit \d+/.test(name)).sort()) {
    const unitDir = path.join(unitsRoot, unit);
    for (const lesson of fs.readdirSync(unitDir).filter((name) => /^Lesson \d+/.test(name)).sort()) {
      dirs.push(path.join(unitDir, lesson));
    }
  }
  return dirs;
}

function unitLessonLabel(filePath) {
  const parts = filePath.split(path.sep);
  const unit = parts.find((part) => /^Unit \d+/.test(part)).match(/\d+/)[0];
  const lesson = parts.find((part) => /^Lesson \d+/.test(part)).match(/\d+/)[0];
  return { unit, lesson, label: `PHYSICS Unit ${unit} Lesson ${lesson}` };
}

function wrapMain(html) {
  let next = html;
  if (!/<main\b/i.test(next)) {
    next = next.replace(
      /^<div style="font-family:Arial, Helvetica, sans-serif; font-size:18px; line-height:1\.65; color:#1f2933; max-width:980px; margin:0 auto 22px auto;">/,
      '<main style="font-family:Arial, Helvetica, sans-serif; font-size:18px; line-height:1.65; color:#1f2933; max-width:980px; margin:0 auto 22px auto;">',
    );
    const lastClose = next.lastIndexOf('</div>');
    if (lastClose !== -1) {
      next = `${next.slice(0, lastClose)}</main>${next.slice(lastClose + '</div>'.length)}`;
    }
  }
  return next;
}

function ensureCourseHeading(html, filePath) {
  const { label } = unitLessonLabel(filePath);
  if (html.includes(`<h1 style="font-size:28px; margin:0 0 10px 0; color:#102a43;">${label}</h1>`)) {
    return html;
  }
  const bannerPattern = /(<div style="background:#102a43; color:#ffffff; border-radius:10px; padding:14px 18px; margin-bottom:18px;"><strong>PHYSICS \| Unit \d+ \| Lesson \d+<\/strong><\/div>)/;
  return html.replace(
    bannerPattern,
    `$1\n  <h1 style="font-size:28px; margin:0 0 10px 0; color:#102a43;">${label}</h1>`,
  );
}

function ensureP01(html) {
  if (!html.includes('Lesson Title:')) {
    html = html.replace(
      /(<h1 style="font-size:30px; margin:0;">P01 Lesson Overview<\/h1>\s*<h2 style="font-size:24px; margin:10px 0 0 0;">([^<]+)<\/h2>)/,
      `$1\n    <p style="margin:10px 0 0 0;"><strong>Lesson Title:</strong> $2</p>`,
    );
  }
  return html;
}

function ensureP05(html) {
  if (!html.includes('Moodle Guided Practice')) {
    html = html.replace(
      '<h2 style="font-size:23px; margin-top:0;">Guided Practice Readiness</h2>',
      '<h2 style="font-size:23px; margin-top:0;">Moodle Guided Practice Readiness</h2>',
    );
  }
  return html;
}

function ensureP07(html) {
  if (!html.includes('Checkpoint Submission')) {
    const block = `  <section style="border:1px solid #d1d5db; border-left:6px solid #0f766e; border-radius:10px; padding:20px; margin-bottom:18px; background:#f0fdfa;">
    <h2 style="font-size:23px; margin-top:0;">Checkpoint Submission</h2>
<p>Submit the checkpoint response and required notebook evidence in the Moodle checkpoint location. Make sure the work clearly shows the physics claim, evidence, reasoning, units, and correction steps when revisions are required.</p>
  </section>
`;
    html = html.replace(
      /(\s*<section style="border:1px solid #d1d5db; border-left:6px solid #7c3aed; border-radius:10px; padding:20px; margin-bottom:18px; background:#f5f3ff;">\s*<h2 style="font-size:23px; margin-top:0;">Submission Workflow<\/h2>)/,
      `\n${block}$1`,
    );
  }
  return html;
}

let changed = 0;

for (const dir of getLessonDirs()) {
  for (const page of ['P01.html', 'P02.html', 'P03.html', 'P04.html', 'P05.html', 'P06.html', 'P07.html']) {
    const pagePath = path.join(dir, page);
    let html = fs.readFileSync(pagePath, 'utf8');
    let next = wrapMain(html);
    next = ensureCourseHeading(next, pagePath);
    if (page === 'P01.html') next = ensureP01(next);
    if (page === 'P05.html') next = ensureP05(next);
    if (page === 'P07.html') next = ensureP07(next);

    if (next !== html) {
      fs.writeFileSync(pagePath, next, 'utf8');
      changed += 1;
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
