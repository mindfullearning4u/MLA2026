const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');

const base = 'font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; ';

const pageInfo = {
  'P01.html': { role: 'P01 Lesson Overview', color: '#2563eb', bg: '#e8f4ff' },
  'P02.html': { role: 'P02 Notebook Task - Part 1', color: '#0f766e', bg: '#f0fdfa' },
  'P03.html': { role: 'P03 Notebook Task - Part 2', color: '#7c3aed', bg: '#f5f3ff' },
  'P04.html': { role: 'P04 Worked Example', color: '#16a34a', bg: '#f0fdf4' },
  'P05.html': { role: 'P05 Guided Practice', color: '#f59e0b', bg: '#fffbeb' },
  'P06.html': { role: 'P06 Independent Work', color: '#ea580c', bg: '#fff7ed' },
  'P07.html': { role: 'P07 Checkpoint', color: '#dc2626', bg: '#fef2f2' },
};

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

function ids(filePath) {
  const parts = filePath.split(path.sep);
  return {
    unit: parts.find((part) => /^Unit \d+/.test(part)).match(/\d+/)[0],
    lesson: parts.find((part) => /^Lesson \d+/.test(part)).match(/\d+/)[0],
  };
}

function header(unit, lesson) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);">
  <div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">
    &#128216; EARTH SPACE SCIENCE | Unit ${unit} | Lesson ${lesson}
  </div>
</div>`;
}

function roleCard(page, title) {
  const info = pageInfo[page];
  const lessonLine = page === 'P01.html' && title ? `\n  <p style="margin-bottom: 14px;"><strong>Lesson Title:</strong> ${title}</p>` : '';
  return `<div style="${base}background: ${info.bg}; border-left: 8px solid ${info.color}; border-radius: 10px; padding: 24px;">
  <h1 style="font-size: 30px; margin-top: 0; margin-bottom: 12px;">${info.role}</h1>${lessonLine}
</div>`;
}

function cardStyle(className) {
  if (/tor|teacher/i.test(className)) {
    return 'font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.45; color: #1f2933; max-width: 980px; margin: 16px auto 0 auto; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;';
  }
  if (/mistake|incorrect/i.test(className)) return `${base}background: #fef2f2; border: 1px solid #fecaca; border-left: 6px solid #dc2626; border-radius: 10px; padding: 22px;`;
  if (/correct/i.test(className)) return `${base}background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 6px solid #16a34a; border-radius: 10px; padding: 22px;`;
  if (/safety|lab/i.test(className)) return `${base}background: #fff8e6; border: 1px solid #fcd34d; border-left: 6px solid #f59e0b; border-radius: 10px; padding: 22px;`;
  if (/model|data|standard|trace/i.test(className)) return `${base}background: #f0fdfa; border: 1px solid #99f6e4; border-left: 6px solid #0f766e; border-radius: 10px; padding: 22px;`;
  if (/practice/i.test(className)) return `${base}background: #fffbeb; border: 1px solid #fde68a; border-left: 6px solid #f59e0b; border-radius: 10px; padding: 22px;`;
  if (/check|checkpoint/i.test(className)) return `${base}background: #f8fafc; border: 1px solid #d1d5db; border-left: 6px solid #334155; border-radius: 10px; padding: 22px;`;
  return `${base}background: #ffffff; border: 1px solid #d1d5db; border-left: 6px solid #64748b; border-radius: 10px; padding: 22px;`;
}

function stripShell(html) {
  return html
    .replace(/<!doctype[^>]*>\s*/gi, '')
    .replace(/<html[^>]*>\s*/gi, '')
    .replace(/<head>[\s\S]*?<\/head>\s*/gi, '')
    .replace(/<\/?body[^>]*>\s*/gi, '')
    .replace(/<\/?main[^>]*>\s*/gi, '')
    .replace(/<\/html>\s*/gi, '');
}

function extractTitle(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return { title: '', body: html };
  const raw = match[1].replace(/<[^>]+>/g, '').trim();
  const title = raw
    .replace(/^P0\d\s+[^:]+:\s*/i, '')
    .replace(/^Lesson Overview:\s*/i, '')
    .replace(/^Worked Examples?:\s*/i, '')
    .replace(/^Notebook Task Part \d:\s*/i, '')
    .replace(/^Guided Practice:\s*/i, '')
    .replace(/^Independent Work:\s*/i, '')
    .replace(/^Checkpoint:\s*/i, '')
    .trim();
  return { title, body: html.replace(match[0], '') };
}

function normalizeOpeningTag(attrs) {
  const classMatch = attrs.match(/\bclass=(["'])(.*?)\1/i);
  const rawClass = classMatch ? classMatch[2] : 'box';
  const newClass = /tor|teacher/i.test(rawClass) ? 'mla-tor-support-box' : rawClass;
  let nextAttrs = classMatch ? attrs.replace(/\bclass=(["']).*?\1/i, `class="${newClass}"`) : `${attrs} class="${newClass}"`;
  nextAttrs = /\bstyle=/i.test(nextAttrs) ? nextAttrs.replace(/\bstyle=(["']).*?\1/i, `style="${cardStyle(rawClass)}"`) : `${nextAttrs} style="${cardStyle(rawClass)}"`;
  return `<div${nextAttrs}>`;
}

function convertBlocks(html) {
  return html
    .replace(/<section([^>]*)>/gi, (_, attrs) => normalizeOpeningTag(attrs))
    .replace(/<\/section>/gi, '</div>')
    .replace(/<aside([^>]*)>/gi, (_, attrs) => normalizeOpeningTag(attrs))
    .replace(/<\/aside>/gi, '</div>');
}

function normalizeLabels(html, page) {
  let next = html
    .replace(/<strong>MLA Standard:<\/strong>/gi, '<strong>Standards Covered:</strong>')
    .replace(/Notebook title:/gi, 'Notebook Title:')
    .replace(/Correct answer:<\/strong>/gi, 'Correct:</strong>')
    .replace(/Correction<\/h2>/gi, 'Correct Thinking</h2>')
    .replace(/Teachable feedback:/gi, 'Teachable Explanation:')
    .replace(/Correct:<\/strong>/gi, 'Correct:</strong>')
    .replace(/Incorrect:<\/strong>/gi, 'Incorrect:</strong>');

  if (page === 'P05.html' && !/Moodle Guided Practice/i.test(next)) {
    next += `\n<div style="${cardStyle('practice')}"><h2>Moodle Guided Practice</h2><p>Complete the Moodle Guided Practice for this lesson when assigned. Use the feedback to return to the exact lesson page and correct misunderstandings before the checkpoint.</p></div>`;
  }

  if (page === 'P06.html') {
    if (!/Part A/i.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Part A</h2><p>Answer the first independent work task using the lesson evidence.</p></div>`;
    if (!/Part B/i.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Part B</h2><p>Use a diagram, model, map, data table, or source detail to support your answer.</p></div>`;
    if (!/Part C/i.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Part C</h2><p>Write a final explanation that connects Earth/space evidence, vocabulary, and reasoning.</p></div>`;
  }

  if (page === 'P07.html') {
    if (!/Teacher of Record Graded/i.test(next)) next = `<div style="${cardStyle('check')}"><h2>Teacher of Record Graded</h2><p>This checkpoint is reviewed by the Teacher of Record.</p></div>\n${next}`;
    if (!/Notebook Evidence Submission/i.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Notebook Evidence Submission</h2><p>Submit notebook evidence that shows the required model, vocabulary, independent work, and checkpoint reasoning.</p></div>`;
    if (!/Checkpoint Submission/i.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Checkpoint Submission</h2><p>Submit the checkpoint response in the assigned Moodle checkpoint location.</p></div>`;
    if (!/80%/.test(next)) next += `\n<div style="${cardStyle('check')}"><h2>Mastery Criteria</h2><p>Mastery requires 80% or higher or completion of required correction and intervention workflow.</p></div>`;
  }

  if (page === 'P04.html' && !/Step 1/i.test(next)) {
    next = next.replace(/(<h2>Worked Example 1[\s\S]*?<\/h2>)/i, '$1\n<p><strong>Step 1:</strong> Identify the evidence, model, map, data display, source, or Earth-system relationship before choosing or writing an answer.</p>');
  }
  if (page === 'P04.html' && !/Incorrect:/i.test(next)) {
    next += `\n<div style="${cardStyle('mistake')}"><h2>Incorrect Reasoning Check</h2><p><strong>Incorrect:</strong> Choosing an answer because it sounds like a familiar Earth or space science idea without matching it to the specific evidence.</p></div>`;
  }
  if ((page === 'P03.html' || page === 'P04.html') && !/Teachable Explanation/i.test(next)) {
    next += `\n<div style="${cardStyle('correct')}"><h2>Teachable Explanation</h2><p>A complete Earth and space science answer names the evidence, identifies the model or data pattern, and explains how that evidence supports the claim.</p></div>`;
  }
  return next;
}

function ensureTor(html) {
  let next = html.replace(/class=(["'])tor-support\1/gi, 'class="mla-tor-support-box"');
  const boxes = [...next.matchAll(/<div[^>]*class=(["'])mla-tor-support-box\1[^>]*>[\s\S]*?<\/div>/gi)];
  if (boxes.length > 1) {
    for (let i = 0; i < boxes.length - 1; i += 1) next = next.replace(boxes[i][0], '');
  }
  if (boxes.length === 0) {
    next += `\n<div class="mla-tor-support-box" style="${cardStyle('tor')}">\n  <p style="font-size: 18px; font-weight: 700; margin: 0 0 6px 0;">Need Help?</p>\n  <p style="margin: 0 0 6px 0;">Contact your Teacher of Record if you cannot connect the model, map, source, data, or reasoning step to the standard after reviewing the lesson steps.</p>\n  <p style="margin: 0;">Bring the page number, the evidence you used, and the exact reasoning step that is confusing.</p>\n</div>`;
  }
  return next;
}

function normalizePage(html, pagePath, page) {
  const { unit, lesson } = ids(pagePath);
  const stripped = stripShell(html);
  const { title, body } = extractTitle(stripped);
  let next = convertBlocks(body);
  next = normalizeLabels(next, page);
  next = ensureTor(next);
  return `${header(unit, lesson)}\n\n${roleCard(page, title)}\n\n${next.trim()}\n`;
}

let changed = 0;
for (const dir of lessonDirs()) {
  for (const page of Object.keys(pageInfo)) {
    const pagePath = path.join(dir, page);
    const before = fs.readFileSync(pagePath, 'utf8');
    const after = normalizePage(before, pagePath, page);
    if (before !== after) {
      fs.writeFileSync(pagePath, after, 'utf8');
      changed += 1;
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
