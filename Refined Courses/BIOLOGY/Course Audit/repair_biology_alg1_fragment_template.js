const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

const cardPrefix = 'font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; ';

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

function ids(filePath) {
  const parts = filePath.split(path.sep);
  const unit = parts.find((part) => /^Unit \d+/.test(part)).match(/\d+/)[0];
  const lesson = parts.find((part) => /^Lesson \d+/.test(part)).match(/\d+/)[0];
  return { unit, lesson };
}

function header(unit, lesson) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);">
  <div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">
    &#128216; BIOLOGY | Unit ${unit} | Lesson ${lesson}
  </div>
</div>`;
}

function stripDocumentShell(html) {
  return html
    .replace(/<!DOCTYPE[^>]*>\s*/gi, '')
    .replace(/<\/?(html|head|body)[^>]*>\s*/gi, '')
    .replace(/<meta[^>]*>\s*/gi, '')
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<style>[\s\S]*?<\/style>\s*/gi, '');
}

function removeOuterMain(html) {
  return html
    .replace(/^<main[^>]*>\s*/i, '')
    .replace(/\s*<\/main>\s*$/i, '');
}

function removeOldHeader(html) {
  return html
    .replace(/^\s*<div style="background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;">\s*<strong>BIOLOGY \| Unit \d+ \| Lesson \d+<\/strong>\s*<\/div>\s*/i, '')
    .replace(/^\s*<h1 style="font-size: 28px; margin: 0 0 10px 0; color: #102a43;">BIOLOGY Unit \d+ Lesson \d+<\/h1>\s*/i, '');
}

function sectionCards(html) {
  return html
    .replace(/<section class="([^"]+)" style="([^"]*)">/g, (_, className, style) => `<div class="${className}" style="${cardPrefix}${style}">`)
    .replace(/<section style="([^"]*)">/g, (_, style) => `<div style="${cardPrefix}${style}">`)
    .replace(/<\/section>/g, '</div>');
}

function torBox(html) {
  return html.replace(
    /<div class="mla-tor-support-box" style="([^"]*)">/g,
    '<div class="mla-tor-support-box" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.45; color: #1f2933; max-width: 980px; margin: 16px auto 0 auto; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;">',
  );
}

function normalizePage(html, pagePath) {
  const { unit, lesson } = ids(pagePath);
  let next = stripDocumentShell(html);
  next = removeOuterMain(next);
  next = removeOldHeader(next);
  next = sectionCards(next);
  next = torBox(next).trim();
  return `${header(unit, lesson)}\n\n${next}\n`;
}

let changed = 0;

for (const dir of getLessonDirs()) {
  for (const page of ['P01.html', 'P02.html', 'P03.html', 'P04.html', 'P05.html', 'P06.html', 'P07.html']) {
    const pagePath = path.join(dir, page);
    const before = fs.readFileSync(pagePath, 'utf8');
    const after = normalizePage(before, pagePath);
    if (after !== before) {
      fs.writeFileSync(pagePath, after, 'utf8');
      changed += 1;
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
