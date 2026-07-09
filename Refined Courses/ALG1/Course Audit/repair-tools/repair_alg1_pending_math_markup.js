const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const files = [
  "Units/Unit 01/Lesson 07/P07.html",
  "Units/Unit 04/Lesson 02/P03.html",
  "Units/Unit 04/Lesson 03/P03.html",
  "Units/Unit 04/Lesson 05/P03.html",
  "Units/Unit 04/Lesson 06/P02.html",
  "Units/Unit 04/Lesson 06/P03.html",
  "Units/Unit 04/Lesson 07/P02.html",
  "Units/Unit 04/Lesson 07/P03.html",
  "Units/Unit 05/Lesson 01/P02.html",
  "Units/Unit 05/Lesson 01/P03.html",
  "Units/Unit 05/Lesson 01/P04.html",
  "Units/Unit 05/Lesson 01/P07.html",
  "Units/Unit 05/Lesson 02/P01.html",
  "Units/Unit 05/Lesson 02/P02.html",
  "Units/Unit 05/Lesson 02/P03.html",
  "Units/Unit 05/Lesson 02/P04.html",
  "Units/Unit 05/Lesson 02/P06.html",
  "Units/Unit 05/Lesson 02/P07.html",
  "Units/Unit 05/Lesson 03/P02.html",
  "Units/Unit 05/Lesson 03/P03.html",
  "Units/Unit 05/Lesson 04/P02.html",
  "Units/Unit 05/Lesson 04/P03.html",
  "Units/Unit 05/Lesson 05/P02.html",
  "Units/Unit 05/Lesson 05/P03.html",
  "Units/Unit 05/Lesson 06/P01.html",
  "Units/Unit 05/Lesson 06/P02.html",
  "Units/Unit 05/Lesson 06/P03.html",
  "Units/Unit 05/Lesson 06/P04.html",
  "Units/Unit 06/Lesson 06/P01.html",
  "Units/Unit 06/Lesson 06/P02.html",
  "Units/Unit 06/Lesson 06/P03.html"
];

function repairMath(text) {
  let out = text;

  // Fix malformed CSS/text merge caused by a prior replacement.
  out = out.replace(/padding:9px\^2 \+ 5x \+ 6<\/td>/g, 'padding:9px;">x^2 + 5x + 6</td>');

  // Remove visible PowerShell newline literals that leaked into HTML.
  out = out.replace(/>`r`n\s*/g, ">\n");

  // Normalize common math spacing before applying superscript conversion.
  out = out.replace(/\s+\^/g, "^");

  // Convert caret exponents in visible math to Moodle-safe HTML superscripts.
  out = out.replace(/([A-Za-z0-9\)])\^\(([^)<]+)\)/g, "$1<sup>$2</sup>");
  out = out.replace(/([A-Za-z0-9\)])\^([A-Za-z0-9]+)/g, "$1<sup>$2</sup>");

  // Repair any double-converted artifacts if the script is re-run.
  out = out.replace(/<sup><sup>/g, "<sup>").replace(/<\/sup><\/sup>/g, "</sup>");

  return out;
}

let changed = 0;
for (const rel of files) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = repairMath(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed += 1;
    console.log(rel);
  }
}
console.log(`ALG1 math markup repaired in ${changed} files.`);
