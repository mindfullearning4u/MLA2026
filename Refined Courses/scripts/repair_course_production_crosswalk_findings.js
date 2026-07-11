const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courses = [
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "EARTH SPACE SCIENCE",
  "ANATOMY AND PHYSIOLOGY",
  "ENVIRONMENTAL SCIENCE",
  "MARINE SCIENCE",
  "WORLD HISTORY",
  "U.S. HISTORY",
  "U.S. GOVERNMENT",
  "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
  "PSYCHOLOGY",
  "SOCIOLOGY",
];

const replacements = [
  [/\bGIFT content\b/g, "legacy assessment-bank content"],
  [/\bGIFT files\b/g, "legacy assessment-bank files"],
  [/\bGIFT file\b/g, "legacy assessment-bank file"],
  [/\bGIFT\b/g, "legacy assessment text format"],
  [/candidate resource locations for approval/gi, "required or recommended exact direct resource locations"],
  [/Candidate Resource Location for Approval/g, "Required or Recommended Exact Direct Resource Location"],
  [/Candidate resources are suggestions for approval only\. External resources must not be embedded into lessons until approved\./g, "Free, student-safe, directly aligned science resources from trusted sources may be inserted as exact direct links under the MLA direct-link standard. Resources requiring login, payment, unsafe activity, non-public access, questionable source quality, or uncertain alignment still require approval."],
  [/Candidate resources are suggestions for approval only\./g, "Exact direct resource locations must be documented for lesson development."],
  [/candidate resources are suggestions for approval only\./gi, "exact direct resource locations must be documented for lesson development."],
  [/listed for approval/gi, "documented for direct-link review"],
  [/Use approved resources from Lessons 1-7 only/g, "Use exact direct resources and embedded sources from Lessons 1-7 only"],
  [/approved resources from Lessons 1-7/gi, "exact direct resources and embedded sources from Lessons 1-7"],
  [/pending approval/gi, "pending direct-link verification"],
  [/ask for approval/gi, "perform direct-link verification"],
  [/for approval/gi, "for direct-link verification"],
  [/Unit Overview/gi, "course overview"],
];

let changed = 0;
const changedFiles = [];

for (const course of courses) {
  const productionDir = path.join(root, course, "Course Production");
  if (!fs.existsSync(productionDir)) continue;
  for (const name of fs.readdirSync(productionDir)) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const file = path.join(productionDir, name);
    let text = fs.readFileSync(file, "utf8");
    const original = text;
    for (const [pattern, replacement] of replacements) {
      text = text.replace(pattern, replacement);
    }
    if (text !== original) {
      fs.writeFileSync(file, text, "utf8");
      changed += 1;
      changedFiles.push(path.relative(root, file).replaceAll("\\", "/"));
    }
  }
}

console.log(JSON.stringify({ changed, changedFiles }, null, 2));
