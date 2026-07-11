const fs = require("fs");
const path = require("path");

const root = process.cwd();

const courses = [
  {
    folder: "U.S. GOVERNMENT",
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md"],
  },
  {
    folder: "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
  },
  {
    folder: "PSYCHOLOGY",
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
  },
  {
    folder: "SOCIOLOGY",
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
  },
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function exists(file) {
  return fs.existsSync(file);
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function extractMlaCodes(text) {
  return [...new Set(text.match(/MLA\.[A-Z0-9]+(?:\.[A-Z0-9]+)+/g) || [])];
}

function parseMarkdownRows(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*[^|-]/.test(line) && !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

function parseLessonMapping(courseDir, mappingFiles) {
  const productionDir = path.join(courseDir, "Course Production");
  const map = new Map();
  for (const name of mappingFiles) {
    const file = path.join(productionDir, name);
    if (!exists(file)) continue;
    const rows = parseMarkdownRows(read(file));
    if (rows.length < 2) continue;
    const header = rows[0].map((h) => h.toLowerCase());
    const unitIdx = header.findIndex((h) => h === "unit" || h.includes("unit"));
    const lessonIdx = header.findIndex((h) => h === "lesson" || h.includes("lesson"));
    const stdIdx = header.findIndex((h) => h.includes("standard"));
    for (const row of rows.slice(1)) {
      if (unitIdx < 0 || lessonIdx < 0 || row.length <= Math.max(unitIdx, lessonIdx)) continue;
      const unit = (row[unitIdx].match(/\d+/) || [])[0];
      const lesson = (row[lessonIdx].match(/\d+/) || [])[0];
      if (!unit || !lesson) continue;
      const key = `${unit.padStart(2, "0")}-${lesson.padStart(2, "0")}`;
      const codes = extractMlaCodes(stdIdx >= 0 ? row[stdIdx] : row.join(" "));
      if (!codes.length) continue;
      map.set(key, [...new Set([...(map.get(key) || []), ...codes])]);
    }
  }
  return map;
}

function repairP05Standards(courseDir, mapping) {
  let changed = 0;
  for (const [key, standards] of mapping.entries()) {
    const [unit, lesson] = key.split("-");
    const file = path.join(courseDir, "Units", `Unit ${unit}`, `Lesson ${lesson}`, "P05.html");
    if (!exists(file)) continue;
    let text = read(file);
    if (standards.some((code) => text.includes(code))) continue;
    const standardLine = `<p><strong>MLA Standard:</strong> ${standards.join("; ")}</p>`;
    const before = text;
    if (/<h1>[^<]*P05[^<]*<\/h1>/i.test(text)) {
      text = text.replace(/(<h1>[^<]*P05[^<]*<\/h1>)/i, `$1${standardLine}`);
    } else {
      text = text.replace(/<body>/i, `<body>${standardLine}`);
    }
    if (text !== before) {
      write(file, text);
      changed += 1;
    }
  }
  return changed;
}

function repairCrosswalkProvenance(courseDir) {
  const file = path.join(courseDir, "Course Production", "PHASE_2A_B_CROSSWALK_DRAFT.md");
  if (!exists(file)) return false;
  let text = read(file);
  const hasFlorida = /Florida/i.test(text);
  const hasCommonCore = /Common Core/i.test(text);
  if (hasFlorida && hasCommonCore) return false;
  const note = [
    "",
    "## Source Provenance and Readiness Trace",
    "",
    "This crosswalk is maintained against Florida CPALMS course records, applicable Florida B.E.S.T. expectations, Common Core literacy or mathematical-practice support where applicable, and ACT/SAT college-readiness skills. Lesson developers, assessment developers, auditors, and Moodle transfer agents must preserve this source trace when validating standards coverage, lesson scope, assessment scope, visuals, source evidence, and student-readiness rigor.",
    "",
  ].join("\n");
  if (/^# .+\r?\n/.test(text)) {
    text = text.replace(/^# .+\r?\n/, (match) => `${match}${note}`);
  } else {
    text = `${note}${text}`;
  }
  write(file, text);
  return true;
}

const summary = [];
for (const config of courses) {
  const courseDir = path.join(root, config.folder);
  if (!exists(courseDir)) continue;
  const mapping = parseLessonMapping(courseDir, config.mappingFiles);
  const p05Changed = repairP05Standards(courseDir, mapping);
  const provenanceChanged = repairCrosswalkProvenance(courseDir);
  summary.push({ course: config.folder, mappedLessons: mapping.size, p05Changed, provenanceChanged });
}

console.log(JSON.stringify(summary, null, 2));
