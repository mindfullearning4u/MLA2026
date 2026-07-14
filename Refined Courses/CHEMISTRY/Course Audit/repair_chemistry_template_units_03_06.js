const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');
const targetUnits = ['Unit 03', 'Unit 04', 'Unit 05', 'Unit 06'];

const style = `  <style>
    body { font-family: Arial, Helvetica, sans-serif; color: #1f2933; line-height: 1.55; margin: 0; padding: 0; background: #f6f8fb; }
    main { max-width: 980px; margin: 0 auto; padding: 28px; background: #ffffff; }
    h1 { font-size: 28px; margin: 0 0 10px; color: #102a43; }
    h2 { font-size: 21px; margin-top: 24px; color: #243b53; border-bottom: 2px solid #d9e2ec; padding-bottom: 6px; }
    h3 { font-size: 18px; margin-top: 18px; color: #334e68; }
    .meta, .standard, .tor, .safety, .practice, .mistake, .note { border-left: 5px solid #3a6ea5; background: #f0f6fc; padding: 14px 16px; margin: 16px 0; }
    .tor { border-left-color: #7a5195; background: #f7f0fb; }
    .safety { border-left-color: #b7791f; background: #fff8e6; }
    .mistake { border-left-color: #b42318; background: #fff1f0; }
    .correct { border-left: 5px solid #2f855a; background: #f0fff4; padding: 14px 16px; margin: 16px 0; }
    table { border-collapse: collapse; width: 100%; margin: 14px 0; }
    th, td { border: 1px solid #bcccdc; padding: 10px; vertical-align: top; }
    th { background: #e6f0fa; text-align: left; }
    ol, ul { padding-left: 24px; }
    .small { font-size: 0.95em; color: #52606d; }
  </style>`;

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function extractBody(html) {
  let text = html.replace(/\uFEFF/g, '').replace(/ï»¿/g, '');
  text = text.replace(/^\s*<section class="mla-standard-trace"[\s\S]*?<\/section>\s*/i, '');
  const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  text = bodyMatch ? bodyMatch[1] : text;
  text = text.replace(/<\/?main[^>]*>/gi, '');
  text = text.replace(/<aside class="tor-support"[\s\S]*?<\/aside>/gi, '');
  text = text.replace(/<div class=['"]tor['"][\s\S]*?<\/div>/gi, '');
  text = text.replace(/<section class="mla-standard-trace"[\s\S]*?<\/section>/gi, '');
  text = text.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
  text = text.replace(/<strong>Incorrect example:<\/strong>/gi, '<strong>Incorrect:<\/strong>');
  text = text.replace(/<strong>Correct example:<\/strong>/gi, '<strong>Correct:<\/strong>');
  text = text.replace(/<strong>Incorrect Example:<\/strong>/g, '<strong>Incorrect:<\/strong>');
  text = text.replace(/<strong>Correct Example:<\/strong>/g, '<strong>Correct:<\/strong>');
  return text.trim();
}

function standardTrace(meta) {
  const primary = [...new Set(meta.primaryStandards || meta.standards || [])].join('; ');
  const support = [...new Set((meta.supportStandards || meta.floridaAlignment || []).filter((s) => !primary.includes(s)))].join('; ');
  return `<section class="mla-standard-trace" style="border: 1px solid #d1d5db; border-left: 6px solid #0f766e; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; background: #f0fdfa;">
    <h2 style="font-size: 21px; margin: 0 0 8px 0;">Mapped Standards for This Lesson</h2>
    <p style="margin: 0 0 6px 0;"><strong>Primary Standards:</strong> ${esc(primary)}</p>
    <p style="margin: 0;"><strong>Support Standards:</strong> ${esc(support)}</p>
  </section>`;
}

function tor(title) {
  return `<div class='tor'><strong>Teacher of Record support checkpoint:</strong> If you are still unsure after using the explanation, worked examples, and practice steps on this page, contact your Teacher of Record for clarification or intervention support. The Teacher of Record may review submissions, manage retake workflow, and help you identify which part of the lesson to revisit for ${esc(title)}.</div>`;
}

function htmlDoc(unitNum, lessonNum, page, title, main) {
  const shortTitle = `CHEM U${Number(unitNum)} L${lessonNum} ${page.replace('.html', '')}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(shortTitle)}</title>
${style}
</head>
<body>
<main>
<h1>CHEMISTRY Unit ${Number(unitNum)} Lesson ${lessonNum}</h1>
${main}
</main>
</body>
</html>
`;
}

function pageMain(page, meta, original) {
  const title = meta.lessonTitle || meta.title;
  const purpose = meta.lessonPurpose || meta.requiredLabVisualSimulationEvidence || 'Use chemistry evidence, models, data, and vocabulary to explain the mapped standard.';
  const primary = [...new Set(meta.primaryStandards || meta.standards || [])].join('; ');
  const support = [...new Set((meta.supportStandards || meta.floridaAlignment || []).filter((s) => !primary.includes(s)))].join('; ');
  if (page === 'P01.html') {
    return `<div class="meta"><strong>P01 Lesson Overview</strong><br><strong>Lesson Title:</strong> ${esc(title)}<br><strong>Lesson Purpose:</strong> ${esc(purpose)}</div>
<h2>Standards Covered in This Lesson</h2>
<div class="standard"><strong>Primary Standards:</strong> ${esc(primary)}<br><strong>Support Standards:</strong> ${esc(support)}</div>
<h2>What You Will Learn</h2>
<p>You will learn the chemistry concept in this lesson by reading evidence, using models or data, and explaining the reasoning that connects the evidence to the mapped standard.</p>
<h2>What You Will Do</h2>
<ol><li>Read the vocabulary and teaching sequence carefully.</li><li>Use the included tables, models, diagrams, scenarios, simulations, or data displays to make sense of the chemistry idea.</li><li>Complete notebook evidence that shows your reasoning, not just your answer.</li><li>Use the checkpoint to show independent mastery.</li></ol>
<h2>How You Will Show Mastery</h2>
<p>You will show mastery by explaining the lesson concept with accurate chemistry vocabulary, using evidence from the required stimulus, and writing reasoning that connects the evidence to the standard.</p>
<h2>Student-Friendly Standard Connection</h2>
<p>This lesson helps you work like a chemistry student: you will read evidence, use models or data, and explain how the evidence supports a scientific answer.</p>
<h2>Lesson Content and Resource Directions</h2>
${original}
${tor(title)}`;
  }
  if (page === 'P02.html') {
    return `${standardTrace(meta)}
<h1>P02 Notebook Task - Part 1</h1>
<h2>Notebook Title</h2>
<p><strong>${esc(title)}:</strong> Copy the vocabulary, model evidence, and reasoning notes that help you explain the mapped chemistry standard.</p>
<h2>Vocabulary</h2>
<p>Use the vocabulary and model language from the lesson content below. Write each term with its meaning and one chemistry example from the page.</p>
${original}
${tor(title)}`;
  }
  if (page === 'P03.html') {
    return `${standardTrace(meta)}
<h1>P03 Notebook Task - Part 2</h1>
${original}
${tor(title)}`;
  }
  if (page === 'P04.html') {
    return `${standardTrace(meta)}
<h1>P04 Worked Example</h1>
<div class="note"><strong>Template Reasoning Frame:</strong> <ol><li><strong>Step 1:</strong> Identify the chemistry claim or question.</li><li><strong>Step 2:</strong> Select evidence from the model, data table, formula, diagram, or source.</li><li><strong>Step 3:</strong> Explain why the evidence supports the answer.</li></ol><p><strong>Interpretation:</strong> A complete worked example states what the answer means in chemistry terms, not just which option is correct.</p></div>
${original}
${tor(title)}`;
  }
  if (page === 'P05.html') {
    return `${standardTrace(meta)}
<h1>P05 Guided Practice</h1>
<div class="practice"><strong>Moodle Guided Practice:</strong> Complete the guided practice for this lesson in Moodle after you study the page content. Use the model, data, resource, or example on this page as evidence before answering.</div>
${original}
${tor(title)}`;
  }
  if (page === 'P06.html') {
    return `${standardTrace(meta)}
<h1>P06 Independent Work</h1>
<p>Complete this work independently after P02-P05. Your answers should show chemistry evidence and reasoning, not only a final answer.</p>
${original}
${tor(title)}`;
  }
  if (page === 'P07.html') {
    return `${standardTrace(meta)}
<h1>P07 Checkpoint</h1>
<h2>Teacher of Record Graded</h2>
<p>This checkpoint is submitted for Teacher of Record review. It verifies that you can apply the lesson standard for <strong>${esc(title)}</strong> independently.</p>
<h2>Checkpoint Task</h2>
<p>Create a checkpoint response that explains the lesson concept using the required chemistry vocabulary and at least one piece of evidence from the lesson model, data table, formula, diagram, simulation, or source.</p>
<ol><li>State the chemistry claim or answer.</li><li>Identify the evidence that supports it.</li><li>Explain the reasoning that connects the evidence to the claim.</li><li>Correct one likely misconception from the lesson.</li></ol>
<h2>Notebook Evidence Submission</h2>
<p>Submit your P02 notes, P03 misconception correction, P04 worked-example notes, P06 independent work, and final checkpoint response.</p>
<h2>Checkpoint Submission</h2>
<p>Submit a clear typed response, scan, or photo according to the course submission directions.</p>
<h2>Submission Workflow</h2>
<p>Review P02-P06 before submitting. After Teacher of Record feedback, correct missing evidence or unclear reasoning and resubmit according to the course workflow if needed.</p>
<h2>Mastery Criteria</h2>
<p>Mastery requires at least 80%. Your response must use accurate chemistry vocabulary, cite relevant evidence, explain reasoning, and stay aligned to the mapped standard. If mastery is not met, correction, resubmission, or Teacher of Record intervention may be required before another attempt.</p>
<h2>Review and Assessment Readiness</h2>
${original}
${tor(title)}`;
  }
  return `${original}\n${tor(title)}`;
}

let changed = 0;
for (const unit of targetUnits) {
  const unitDir = path.join(unitsRoot, unit);
  for (const lessonName of fs.readdirSync(unitDir).filter((n) => /^Lesson \d+/.test(n)).sort()) {
    const lessonDir = path.join(unitDir, lessonName);
    const meta = readJson(path.join(lessonDir, 'lesson.json'));
    const unitNum = unit.match(/\d+/)[0];
    const lessonNum = lessonName.match(/\d+/)[0].padStart(2, '0');
    for (const page of ['P01.html', 'P02.html', 'P03.html', 'P04.html', 'P05.html', 'P06.html', 'P07.html']) {
      const pagePath = path.join(lessonDir, page);
      const oldHtml = fs.readFileSync(pagePath, 'utf8');
      const original = extractBody(oldHtml);
      const next = htmlDoc(unitNum, lessonNum, page, meta.lessonTitle || meta.title, pageMain(page, meta, original));
      fs.writeFileSync(pagePath, next, 'utf8');
      changed++;
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
