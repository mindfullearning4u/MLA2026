const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const UNITS = path.join(ROOT, "Units");
const VISUAL_MAP = path.join(ROOT, "Course Production", "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md");

function readText(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function writeText(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function readVisualMap() {
  const map = new Map();
  for (const line of readText(VISUAL_MAP).split(/\r?\n/)) {
    const match = line.match(/^\|\s*Unit\s+(\d+)\s*\|\s*Lesson\s+(\d+)\s*\|\s*([^|]+?)\s*\|/);
    if (match) map.set(`${Number(match[1])}-${Number(match[2])}`, match[3].trim());
  }
  return map;
}

function visualCategory(visual, title) {
  const text = `${visual} ${title}`.toLowerCase();
  if (/(map|route|region|aligned states|boundary|migration|theater)/.test(text)) return "map";
  if (/(timeline|escalation|development|chronology)/.test(text)) return "timeline";
  if (/(flow|cause|effect|decline|web|diagram|impact)/.test(text)) return "diagram";
  if (/(source|evidence|portfolio|document|corroboration)/.test(text)) return "source";
  return "comparison";
}

function svgBlock(unit, lesson, title, standards, visual) {
  const cat = visualCategory(visual, title);
  const safeTitle = escapeHtml(title);
  const safeVisual = escapeHtml(visual);
  const safeStandards = escapeHtml(standards.join(", "));
  let art;
  let checklist;

  if (cat === "map") {
    art = `<svg role="img" aria-label="${safeVisual}" viewBox="0 0 760 310" width="100%" style="max-width:760px;border:1px solid #9fb3c8;background:#f8fbff">
  <rect x="0" y="0" width="760" height="310" fill="#eef7fb"/>
  <path d="M75 185 C130 135, 210 130, 260 165 C315 205, 390 190, 455 145 C535 92, 620 112, 690 165 L690 238 L75 238 Z" fill="#d9e8d2" stroke="#486b3f" stroke-width="2"/>
  <path d="M130 208 C205 178, 300 180, 385 154 C475 126, 560 128, 645 174" fill="none" stroke="#c05621" stroke-width="5" stroke-linecap="round"/>
  <polygon points="645,174 626,164 631,184" fill="#c05621"/>
  <circle cx="135" cy="207" r="8" fill="#1f5f99"/><circle cx="385" cy="154" r="8" fill="#1f5f99"/><circle cx="645" cy="174" r="8" fill="#1f5f99"/>
  <text x="34" y="42" font-size="24" font-weight="700" fill="#1f2933">${safeTitle}</text>
  <text x="112" y="232" font-size="16" fill="#1f2933">origin / region</text>
  <text x="345" y="139" font-size="16" fill="#1f2933">movement or influence</text>
  <text x="590" y="202" font-size="16" fill="#1f2933">impact area</text>
  <text x="34" y="282" font-size="15" fill="#465a69">Read the map by asking: Where is the change happening? What route, border, or region explains the historical outcome?</text>
</svg>`;
    checklist = "<li>Locate the place or route before explaining the event.</li><li>Connect geography to human choices such as trade, conquest, migration, defense, or political control.</li><li>Do not treat the map as decoration; use it as evidence for the claim.</li>";
  } else if (cat === "timeline") {
    art = `<svg role="img" aria-label="${safeVisual}" viewBox="0 0 760 280" width="100%" style="max-width:760px;border:1px solid #9fb3c8;background:#fffdfa">
  <rect x="0" y="0" width="760" height="280" fill="#fffdfa"/>
  <text x="34" y="42" font-size="24" font-weight="700" fill="#1f2933">${safeTitle}</text>
  <line x1="82" y1="145" x2="690" y2="145" stroke="#305f72" stroke-width="5"/>
  <polygon points="690,145 668,132 668,158" fill="#305f72"/>
  <circle cx="130" cy="145" r="14" fill="#f6ad55" stroke="#744210" stroke-width="2"/>
  <circle cx="310" cy="145" r="14" fill="#63b3ed" stroke="#1a4f7a" stroke-width="2"/>
  <circle cx="490" cy="145" r="14" fill="#68d391" stroke="#276749" stroke-width="2"/>
  <circle cx="640" cy="145" r="14" fill="#fc8181" stroke="#742a2a" stroke-width="2"/>
  <text x="92" y="105" font-size="16" font-weight="700">Context</text><text x="264" y="105" font-size="16" font-weight="700">Cause</text>
  <text x="446" y="105" font-size="16" font-weight="700">Event</text><text x="596" y="105" font-size="16" font-weight="700">Effect</text>
  <text x="34" y="238" font-size="15" fill="#465a69">Read left to right. A strong answer explains how one stage leads to the next instead of listing dates only.</text>
</svg>`;
    checklist = "<li>Start with the background condition before naming the event.</li><li>Explain the link between each point on the timeline.</li><li>Use the final point to explain change, continuity, or consequence.</li>";
  } else if (cat === "diagram") {
    art = `<svg role="img" aria-label="${safeVisual}" viewBox="0 0 760 320" width="100%" style="max-width:760px;border:1px solid #9fb3c8;background:#fbfffb">
  <rect x="0" y="0" width="760" height="320" fill="#fbfffb"/>
  <text x="34" y="42" font-size="24" font-weight="700" fill="#1f2933">${safeTitle}</text>
  <rect x="50" y="105" width="160" height="76" rx="8" fill="#e6fffa" stroke="#2c7a7b" stroke-width="2"/><text x="82" y="135" font-size="17" font-weight="700">Cause</text><text x="70" y="160" font-size="14">condition or pressure</text>
  <rect x="300" y="105" width="160" height="76" rx="8" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="336" y="135" font-size="17" font-weight="700">Decision</text><text x="320" y="160" font-size="14">choice or action</text>
  <rect x="550" y="105" width="160" height="76" rx="8" fill="#fff5f5" stroke="#c53030" stroke-width="2"/><text x="588" y="135" font-size="17" font-weight="700">Effect</text><text x="570" y="160" font-size="14">historical result</text>
  <line x1="210" y1="143" x2="300" y2="143" stroke="#4a5568" stroke-width="4"/><polygon points="300,143 284,133 284,153" fill="#4a5568"/>
  <line x1="460" y1="143" x2="550" y2="143" stroke="#4a5568" stroke-width="4"/><polygon points="550,143 534,133 534,153" fill="#4a5568"/>
  <text x="50" y="245" font-size="15" fill="#465a69">Use the diagram to explain relationship. If you only name the event, your answer is incomplete.</text>
</svg>`;
    checklist = "<li>Name the condition that created pressure.</li><li>Identify the decision, action, or turning point.</li><li>Explain the result and why it mattered beyond the immediate event.</li>";
  } else if (cat === "source") {
    art = `<svg role="img" aria-label="${safeVisual}" viewBox="0 0 760 320" width="100%" style="max-width:760px;border:1px solid #9fb3c8;background:#fff">
  <rect x="0" y="0" width="760" height="320" fill="#ffffff"/>
  <text x="34" y="42" font-size="24" font-weight="700" fill="#1f2933">${safeTitle}</text>
  <rect x="58" y="80" width="260" height="190" fill="#fffaf0" stroke="#b7791f" stroke-width="2"/>
  <line x1="85" y1="118" x2="292" y2="118" stroke="#975a16" stroke-width="3"/><line x1="85" y1="150" x2="292" y2="150" stroke="#975a16" stroke-width="3"/><line x1="85" y1="182" x2="244" y2="182" stroke="#975a16" stroke-width="3"/>
  <rect x="410" y="95" width="260" height="48" rx="6" fill="#e6fffa" stroke="#2c7a7b"/><text x="430" y="125" font-size="16" font-weight="700">Who created it?</text>
  <rect x="410" y="160" width="260" height="48" rx="6" fill="#ebf8ff" stroke="#2b6cb0"/><text x="430" y="190" font-size="16" font-weight="700">Why was it made?</text>
  <rect x="410" y="225" width="260" height="48" rx="6" fill="#f0fff4" stroke="#2f855a"/><text x="430" y="255" font-size="16" font-weight="700">What can it prove?</text>
</svg>`;
    checklist = "<li>Identify the creator, audience, purpose, and historical context.</li><li>Separate what the source proves from what it only suggests.</li><li>Use the source to support a claim, not as decoration.</li>";
  } else {
    art = `<svg role="img" aria-label="${safeVisual}" viewBox="0 0 760 315" width="100%" style="max-width:760px;border:1px solid #9fb3c8;background:#fcfcff">
  <rect x="0" y="0" width="760" height="315" fill="#fcfcff"/>
  <text x="34" y="42" font-size="24" font-weight="700" fill="#1f2933">${safeTitle}</text>
  <rect x="55" y="95" width="190" height="88" rx="8" fill="#edf2f7" stroke="#4a5568" stroke-width="2"/><text x="96" y="128" font-size="18" font-weight="700">Society A</text><text x="80" y="157" font-size="14">beliefs, power, economy</text>
  <rect x="285" y="95" width="190" height="88" rx="8" fill="#e6fffa" stroke="#2c7a7b" stroke-width="2"/><text x="334" y="128" font-size="18" font-weight="700">Evidence</text><text x="308" y="157" font-size="14">source, map, artifact, data</text>
  <rect x="515" y="95" width="190" height="88" rx="8" fill="#fefcbf" stroke="#975a16" stroke-width="2"/><text x="556" y="128" font-size="18" font-weight="700">Society B</text><text x="540" y="157" font-size="14">similarity and difference</text>
  <text x="55" y="250" font-size="15" fill="#465a69">Compare by using the same category on both sides. Do not compare unrelated details.</text>
</svg>`;
    checklist = "<li>Choose one comparison category first, such as power, belief, economy, geography, or culture.</li><li>Use evidence from both sides of the comparison.</li><li>Explain why the similarity or difference mattered historically.</li>";
  }

  return `<section class="visual-box enhanced-visual">
<h2>Instructional Visual: ${safeVisual}</h2>
<p>This visual is included because the lesson standard requires students to reason with evidence, not just memorize terms. Use it while reading each step.</p>
${art}
<h3>How to Use This Visual</h3><ol>${checklist}</ol>
<p><strong>Standards connection:</strong> ${safeStandards}. The visual is evidence for this lesson only; do not bring in unrelated standards or topics.</p>
</section>`;
}

function specificSteps(title, standards, visual) {
  const safeTitle = escapeHtml(title);
  const safeStandards = escapeHtml(standards.join(", "));
  const safeVisual = escapeHtml(visual);
  return `<section class="teach"><h2>Step-by-Step Teaching</h2><div class="step"><strong>Step 1: Anchor the lesson.</strong> The topic is <strong>${safeTitle}</strong>. Before reading details, name the time period, place, people, and problem being studied. This prevents guessing from a word that sounds familiar.</div><div class="step"><strong>Step 2: Read the standard like a historian.</strong> The mapped standards are <strong>${safeStandards}</strong>. Circle the action words in the standard, such as explain, analyze, compare, locate, trace, or evaluate. Those action words tell you what kind of thinking the lesson requires.</div><div class="step"><strong>Step 3: Use the visual before answering.</strong> The required visual is <strong>${safeVisual}</strong>. First identify what the visual shows. Then ask what changed, what stayed the same, what caused the change, and what evidence supports that answer.</div><div class="step"><strong>Step 4: Build the explanation in order.</strong> Start with context, add one precise piece of evidence, explain the relationship, and finish with why it mattered. A strong World History answer never gives only a name, date, or place.</div><div class="step"><strong>Step 5: Check for confusion before moving on.</strong> If two answer choices both sound possible, choose the one that stays inside <strong>${safeTitle}</strong> and directly answers the standard. If you cannot explain why the visual supports your answer, reread the visual and ask the Teacher of Record for help.</div></section>`;
}

function workedVisualExample(title, visual) {
  return `<section class="visual-box worked-visual-check"><h2>Worked Visual Check</h2><p>Use this check whenever a question includes the <strong>${escapeHtml(visual)}</strong> for <strong>${escapeHtml(title)}</strong>.</p><ol><li><strong>Read the title or label.</strong> It tells you the topic and prevents you from using the wrong time period.</li><li><strong>Identify the evidence type.</strong> Decide whether the visual is showing a map, timeline, comparison, cause-effect relationship, source, or data pattern.</li><li><strong>Point to the clue.</strong> Name the exact label, arrow, row, date, region, or source detail that supports the answer.</li><li><strong>Explain the relationship.</strong> Use words such as because, therefore, increased, decreased, shifted, expanded, limited, or caused.</li><li><strong>Eliminate drift.</strong> Reject choices that may be true in history but are outside this lesson's mapped standard.</li></ol></section>`;
}

function deeperRigorSupport(title, standards, visual) {
  return `<section class="teach deeper-rigor-support"><h2>Teacher-Level Clarification</h2><p>For <strong>${escapeHtml(title)}</strong>, do not try to memorize isolated facts first. Build understanding in this order: context, evidence, relationship, and significance.</p><ol><li><strong>Context:</strong> Identify the place, time period, and historical problem before choosing evidence.</li><li><strong>Evidence:</strong> Use the required visual, <strong>${escapeHtml(visual)}</strong>, to find the clue that matters most.</li><li><strong>Relationship:</strong> Explain how the clue shows cause and effect, comparison, continuity and change, geographic reasoning, or source interpretation.</li><li><strong>Standard boundary:</strong> Keep the answer inside <strong>${escapeHtml(standards.join(", "))}</strong>. Do not use an unrelated fact just because it is historically true.</li><li><strong>Mastery check:</strong> If you cannot explain the answer with the visual and the standard, reread the previous section and ask the Teacher of Record for guidance.</li></ol></section>`;
}

function replaceSection(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  if (start < 0) return [text, false];
  const end = text.indexOf(endMarker, start);
  if (end < 0) return [text, false];
  return [text.slice(0, start) + replacement + text.slice(end + endMarker.length), true];
}

function insertBefore(text, marker, insertion) {
  if (text.includes(insertion.slice(0, 80))) return [text, false];
  const pos = text.indexOf(marker);
  if (pos < 0) return [text, false];
  return [text.slice(0, pos) + insertion + "\n" + text.slice(pos), true];
}

const visualByKey = readVisualMap();
const lessonJsonFiles = walk(UNITS, (file) => path.basename(file) === "lesson.json").sort();
const updated = [];

for (const jsonFile of lessonJsonFiles) {
  const data = JSON.parse(readText(jsonFile));
  const unit = Number(data.unit);
  const lesson = Number(data.lesson);
  const visual = visualByKey.get(`${unit}-${lesson}`) || "lesson-specific evidence visual";
  const lessonDir = path.dirname(jsonFile);

  const p02 = path.join(lessonDir, "P02.html");
  if (fs.existsSync(p02)) {
    let text = readText(p02);
    let changed = false;
    [text, changed] = replaceSection(text, '<section class="teach"><h2>Step-by-Step Teaching</h2>', "</section>", specificSteps(data.title, data.standards, visual));
    let changed2 = false;
    [text, changed2] = insertBefore(text, '<section class="box"><h2>Notebook Task</h2>', svgBlock(unit, lesson, data.title, data.standards, visual));
    if (changed || changed2) {
      writeText(p02, text);
      updated.push(path.relative(ROOT, p02));
    }
  }

  const p04 = path.join(lessonDir, "P04.html");
  if (fs.existsSync(p04)) {
    let text = readText(p04);
    let changed = false;
    [text, changed] = insertBefore(text, '<div class="misconception">', workedVisualExample(data.title, visual));
    if (changed) {
      writeText(p04, text);
      updated.push(path.relative(ROOT, p04));
    }
  }

  const p03 = path.join(lessonDir, "P03.html");
  if (fs.existsSync(p03)) {
    let text = readText(p03);
    let changed = false;
    [text, changed] = insertBefore(text, '<section class="misconception">', deeperRigorSupport(data.title, data.standards, visual));
    if (!changed) [text, changed] = insertBefore(text, '<div class="misconception">', deeperRigorSupport(data.title, data.standards, visual));
    if (changed) {
      writeText(p03, text);
      updated.push(path.relative(ROOT, p03));
    }
  }
}

console.log(`Updated files: ${updated.length}`);
for (const item of updated.slice(0, 20)) console.log(item);
if (updated.length > 20) console.log(`... ${updated.length - 20} more`);
