const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else out.push(file);
  }
  return out;
}

function cdata(value) {
  return `<![CDATA[${String(value).replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function strip(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(block, tagPattern) {
  const match = block.match(tagPattern);
  return match ? strip(match[1]) : "";
}

function supportName(block) {
  return (
    getTag(block, /<h3>Embedded [^:]+ Support:\s*([^<]+)<\/h3>/i) ||
    getTag(block, /<strong>Stimulus:<\/strong>\s*([^<]+)/i) ||
    "embedded evidence organizer"
  );
}

function standard(block) {
  return getTag(block, /<strong>MLA Standard:<\/strong>\s*([^<]+)/i) || "the mapped standard";
}

function titleFromPrompt(block) {
  const prompt = getTag(block, /<\/p><p>([\s\S]*?)<\/p><div class="mla-visual/i);
  const inMatch = prompt.match(/In ([^,?]+),/i);
  if (inMatch) return inMatch[1].trim();
  const aboutMatch = prompt.match(/about ([^.?]+)[.?]/i);
  if (aboutMatch) return aboutMatch[1].trim();
  return "the mapped lesson concept";
}

function rebuildAnswers(block) {
  const support = supportName(block);
  const std = standard(block);
  const title = titleFromPrompt(block);
  const answers = [
    {
      fraction: "100",
      text: `Use the ${support} evidence to explain ${title} and connect the reasoning to ${std}.`,
      feedback: `Correct. This answer uses the same embedded ${support} shown in the question, explains the reasoning for ${title}, and stays within ${std}.`,
    },
    {
      fraction: "0",
      text: `Choose a familiar term without proving it from the ${support} evidence.`,
      feedback: `This is not the best answer because it names an idea without using the embedded ${support} evidence to support the reasoning.`,
    },
    {
      fraction: "0",
      text: `Use an outside topic or future lesson idea that is not part of ${std}.`,
      feedback: `This drifts outside the mapped standard. Stay with ${std} and the evidence provided in the question.`,
    },
    {
      fraction: "0",
      text: `Give an unsupported opinion without connecting the evidence to the mapped concept.`,
      feedback: `This is incomplete because mastery requires evidence, reasoning, and a clear connection to ${std}.`,
    },
  ];
  const existingFractions = [...block.matchAll(/<answer fraction="([^"]+)"/g)].map((match) => match[1]);
  let correctIndex = existingFractions.findIndex((fraction) => fraction === "100");
  if (correctIndex < 0) correctIndex = 0;
  const ordered = [];
  for (let i = 0; i < 4; i += 1) ordered[i] = answers[(i - correctIndex + 4) % 4];
  const answerXml = ordered
    .map((answer) => `<answer fraction="${answer.fraction}"><text>${cdata(answer.text)}</text><feedback format="html"><text>${cdata(answer.feedback)}</text></feedback></answer>`)
    .join("");
  return block.replace(/<answer\b[\s\S]*?<\/answer>(?:\s*<answer\b[\s\S]*?<\/answer>){3}/, answerXml);
}

function repairFile(file) {
  const before = fs.readFileSync(file, "utf8");
  const after = before.replace(/<question type="multichoice">[\s\S]*?<\/question>/g, (block) => rebuildAnswers(block));
  if (after !== before) fs.writeFileSync(file, after, "utf8");
  return after !== before;
}

const courses = process.argv.slice(2);
if (!courses.length) {
  console.error("Usage: node scripts/repair_social_science_pretest_feedback_alignment.js <COURSE> [COURSE...]");
  process.exit(1);
}

const changed = [];
for (const course of courses) {
  const units = path.join(root, course, "Units");
  for (const file of walk(units)) {
    if (/Pretest.*\.xml$/i.test(path.basename(file)) && repairFile(file)) {
      changed.push(path.relative(root, file).replaceAll("\\", "/"));
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
