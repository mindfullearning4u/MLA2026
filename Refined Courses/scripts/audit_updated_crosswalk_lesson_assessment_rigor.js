const fs = require("fs");
const path = require("path");

const root = process.cwd();
const today = "2026-07-11";

const courses = [
  {
    folder: "ENVIRONMENTAL SCIENCE",
    type: "science",
    fullCredit: true,
    mappingFiles: ["PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
    supportFiles: ["PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md", "ENV_LAB_AND_VIRTUAL_LAB_MATRIX.md", "ENV_TEXT_AND_DATA_SOURCE_MATRIX.md"],
  },
  {
    folder: "MARINE SCIENCE",
    type: "science",
    fullCredit: true,
    mappingFiles: ["PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
    supportFiles: ["PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md", "MARINE_SCIENCE_LAB_AND_VIRTUAL_LAB_MATRIX.md", "MARINE_SCIENCE_TEXT_AND_DATA_SOURCE_MATRIX.md"],
  },
  {
    folder: "U.S. GOVERNMENT",
    type: "social",
    fullCredit: false,
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md"],
    supportFiles: ["PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
  },
  {
    folder: "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
    type: "social",
    fullCredit: true,
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
    supportFiles: ["PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
  },
  {
    folder: "PSYCHOLOGY",
    type: "social",
    fullCredit: true,
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
    supportFiles: ["PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
  },
  {
    folder: "SOCIOLOGY",
    type: "social",
    fullCredit: true,
    mappingFiles: ["PHASE_3B_LESSON_MAPPING.md", "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"],
    supportFiles: ["PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
  },
];

const pageNames = ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"];
const forbiddenRe = /\b(TBD|TODO|placeholder|candidate resource|pending approval|for approval|search the web|google it|find a resource|gift file|\.gift|teacher check|teacher will|your teacher will|live teacher|without a teacher|no teacher is available|do not rely on live teacher)\b/i;
const supportPositiveRe = /\b(Teacher of Record|TOR|contact the Teacher of Record|ask your Teacher of Record|request help|get help)\b/i;
const rigorRe = /\b(step|first|next|then|because|evidence|explain|reason|verify|check|common mistake|correct thinking|example)\b/i;
const visualRe = /\b(visual|diagram|graph|table|chart|map|timeline|model|matrix|source|excerpt|data|figure|organizer|flowchart|image|stimulus|scenario|case)\b/i;
const scienceLabRe = /\b(lab|virtual lab|simulation|investigation|model|data set|observe|record|procedure|safety|claim|evidence|reasoning|CER)\b/i;
const directUrlRe = /https?:\/\/[^"' <>)]+/gi;
const resourceDirectionsRe = /\b(open|click|select|observe|record|return|submit|use the visible|write down|compare|run|play|start|change|measure)\b/i;
const sourceProvenanceTerms = ["Florida", "CPALMS", "Common Core", "ACT", "SAT"];
const externalVerificationRe = /External CPALMS Verification Addendum|Official CPALMS Verification Addendum|EXTERNAL-CPALMS-VERIFICATION-START/i;

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function exists(file) {
  return fs.existsSync(file);
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function walk(dir, predicate = () => true, out = []) {
  if (!exists(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function stripHtml(text) {
  return text
    .replace(/<!\[CDATA\[/g, " ")
    .replace(/\]\]>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCdataText(text) {
  const cdata = [...text.matchAll(/<!\[CDATA\[([\s\S]*?)\]\]>/g)].map((m) => m[1]).join(" ");
  return stripHtml(cdata || text);
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function extractMlaCodes(text) {
  return uniq(text.match(/MLA\.[A-Z0-9]+(?:\.[A-Z0-9]+)+/g) || []);
}

function parseMarkdownRows(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*[^|-]/.test(line) && !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

function parseLessonMapping(courseDir, config) {
  const productionDir = path.join(courseDir, "Course Production");
  const map = new Map();
  for (const name of config.mappingFiles) {
    const file = path.join(productionDir, name);
    if (!exists(file)) continue;
    const rows = parseMarkdownRows(read(file));
    if (rows.length < 2) continue;
    const header = rows[0].map((h) => h.toLowerCase());
    const unitIdx = header.findIndex((h) => h === "unit" || h.includes("unit"));
    const lessonIdx = header.findIndex((h) => h === "lesson" || h.includes("lesson"));
    const titleIdx = header.findIndex((h) => h.includes("title"));
    const stdIdx = header.findIndex((h) => h.includes("standard"));
    const visualIdx = header.findIndex((h) => /visual|source|lab|simulation|stimulus|evidence/.test(h));
    for (const row of rows.slice(1)) {
      if (unitIdx < 0 || lessonIdx < 0 || row.length <= Math.max(unitIdx, lessonIdx)) continue;
      const unit = (row[unitIdx].match(/\d+/) || [])[0];
      const lesson = (row[lessonIdx].match(/\d+/) || [])[0];
      if (!unit || !lesson) continue;
      const key = `${unit.padStart(2, "0")}-${lesson.padStart(2, "0")}`;
      const existing = map.get(key) || { standards: [], title: "", visual: "", sources: [] };
      existing.title = existing.title || row[titleIdx] || "";
      existing.standards = uniq([...existing.standards, ...extractMlaCodes(row.join(" "))]);
      if (stdIdx >= 0) existing.standards = uniq([...existing.standards, ...extractMlaCodes(row[stdIdx])]);
      if (visualIdx >= 0) existing.visual = [existing.visual, row[visualIdx]].filter(Boolean).join(" ");
      existing.sources.push(name);
      map.set(key, existing);
    }
  }
  return map;
}

function parseSupportRequirements(courseDir, config, mapping) {
  const productionDir = path.join(courseDir, "Course Production");
  for (const name of config.supportFiles) {
    const file = path.join(productionDir, name);
    if (!exists(file)) continue;
    const text = read(file);
    for (const [key, item] of mapping) {
      const [unit, lesson] = key.split("-");
      const unitNum = String(Number(unit));
      const lessonNum = String(Number(lesson));
      const lessonPattern = new RegExp(`\\|[^\\n|]*\\b${unitNum}\\b[^\\n|]*\\|[^\\n|]*\\b${lessonNum}\\b[^\\n]*`, "gi");
      const matches = text.match(lessonPattern) || [];
      for (const match of matches) {
        if (visualRe.test(match) || scienceLabRe.test(match) || directUrlRe.test(match)) {
          item.visual = [item.visual, match].filter(Boolean).join(" ");
        }
      }
    }
  }
}

function expectedCounts(config) {
  if (config.fullCredit) {
    return { units: 6, lessonsPerUnit: 8, xmlFilesPerUnit: 17, questionsPerUnit: 265 };
  }
  return { units: 6, lessonsPerUnit: 5, xmlFilesPerUnit: 11, questionsPerUnit: 175 };
}

function parseQuestions(xml) {
  return [...xml.matchAll(/<question\b[\s\S]*?<\/question>/gi)]
    .map((m) => m[0])
    .filter((q) => !/<question\s+type="category"/i.test(q));
}

function xmlExpectedQuestionCount(file) {
  const name = path.basename(file).toLowerCase();
  if (name.includes("guidedpractice") || name.includes("guided_practice")) return 5;
  if (name.includes("quiz")) return 25;
  if (name.includes("pretest")) return 10;
  if (name.includes("unitassessment") || name.includes("unit_assessment")) return 40;
  return null;
}

function lessonKeyFromPath(file) {
  const m = file.match(/Units[\\/]+Unit (\d+)(?:[\\/]+Lesson (\d+))?/i);
  if (!m) return null;
  return `${String(Number(m[1])).padStart(2, "0")}-${String(Number(m[2] || 8)).padStart(2, "0")}`;
}

function unitFromPath(file) {
  const m = file.match(/Units[\\/]+Unit (\d+)/i);
  return m ? String(Number(m[1])).padStart(2, "0") : null;
}

function auditXml(file, mapping, config) {
  const xml = read(file);
  const failures = [];
  const warnings = [];
  const questions = parseQuestions(xml);
  const expectedQuestionCount = xmlExpectedQuestionCount(file);
  const key = lessonKeyFromPath(file);
  const unit = unitFromPath(file);
  const mapped = key ? mapping.get(key) : null;
  const unitStandards = uniq([...mapping.entries()]
    .filter(([k]) => unit && k.startsWith(`${unit}-`))
    .flatMap(([, v]) => v.standards));
  const allowedStandards = path.basename(file).toLowerCase().includes("unitassessment") || path.basename(file).toLowerCase().includes("pretest")
    ? unitStandards
    : (mapped?.standards || unitStandards);

  if (!/^<\?xml version="1\.0" encoding="UTF-8"\?>/i.test(xml.trim())) {
    failures.push(`${rel(file)} missing UTF-8 XML declaration`);
  }
  if (/<html|<\/html>|<body|<\/body>/i.test(xml)) {
    failures.push(`${rel(file)} contains full HTML document wrapper instead of Moodle XML question content`);
  }
  if (forbiddenRe.test(stripHtml(xml))) {
    failures.push(`${rel(file)} contains forbidden placeholder/GIFT/teacher-dependent wording`);
  }
  if (expectedQuestionCount !== null && questions.length !== expectedQuestionCount) {
    failures.push(`${rel(file)} expected ${expectedQuestionCount} questions, found ${questions.length}`);
  }
  questions.forEach((question, index) => {
    const qNum = index + 1;
    const answers = [...question.matchAll(/<answer\b([^>]*)>[\s\S]*?<\/answer>/gi)];
    const correct = answers.filter((answer) => /fraction="100"/i.test(answer[1])).length;
    const questionStandards = extractMlaCodes(question);
    if (answers.length !== 4) failures.push(`${rel(file)} question ${qNum} expected 4 answers, found ${answers.length}`);
    if (correct !== 1) failures.push(`${rel(file)} question ${qNum} expected exactly 1 correct answer, found ${correct}`);
    if (!/<feedback\b[\s\S]*?<\/feedback>/i.test(question)) failures.push(`${rel(file)} question ${qNum} missing answer feedback`);
    if (questionStandards.length === 0) failures.push(`${rel(file)} question ${qNum} missing MLA standard`);
    const outOfScope = questionStandards.filter((code) => allowedStandards.length > 0 && !allowedStandards.includes(code));
    if (outOfScope.length) failures.push(`${rel(file)} question ${qNum} uses standard outside mapped lesson/unit: ${outOfScope.join(", ")}`);
    if (!visualRe.test(question)) failures.push(`${rel(file)} question ${qNum} missing embedded visual/source/data/scenario stimulus`);
    if (!/\b(because|evidence|reason|explain|connect|shows|supports|stays within|not the best answer)\b/i.test(extractCdataText(question))) {
      failures.push(`${rel(file)} question ${qNum} feedback/answer text lacks teachable reasoning language`);
    }
  });
  return { questions: questions.length, failures, warnings };
}

function auditCourse(config) {
  const courseDir = path.join(root, config.folder);
  const productionDir = path.join(courseDir, "Course Production");
  const unitsDir = path.join(courseDir, "Units");
  const expected = expectedCounts(config);
  const failures = [];
  const warnings = [];
  const stats = {
    lessons: 0,
    pages: 0,
    xmlFiles: 0,
    xmlQuestions: 0,
    mappedLessons: 0,
  };

  if (!exists(courseDir)) {
    return { course: config.folder, stats, failures: [`Missing course folder: ${config.folder}`], warnings };
  }

  const crosswalk = path.join(productionDir, "PHASE_2A_B_CROSSWALK_DRAFT.md");
  if (!exists(crosswalk)) failures.push(`${config.folder} missing PHASE_2A_B_CROSSWALK_DRAFT.md`);
  else {
    const crosswalkText = read(crosswalk);
    for (const term of sourceProvenanceTerms) {
      if (!new RegExp(term, "i").test(crosswalkText)) failures.push(`${rel(crosswalk)} missing source provenance term: ${term}`);
    }
    if (!externalVerificationRe.test(crosswalkText)) failures.push(`${rel(crosswalk)} missing official CPALMS verification addendum`);
  }

  const mapping = parseLessonMapping(courseDir, config);
  parseSupportRequirements(courseDir, config, mapping);
  stats.mappedLessons = mapping.size;
  if (mapping.size !== expected.units * expected.lessonsPerUnit) {
    failures.push(`${config.folder} expected ${expected.units * expected.lessonsPerUnit} mapped lessons, found ${mapping.size}`);
  }

  for (let unit = 1; unit <= expected.units; unit += 1) {
    for (let lesson = 1; lesson <= expected.lessonsPerUnit; lesson += 1) {
      const key = `${String(unit).padStart(2, "0")}-${String(lesson).padStart(2, "0")}`;
      const lessonDir = path.join(unitsDir, `Unit ${String(unit).padStart(2, "0")}`, `Lesson ${String(lesson).padStart(2, "0")}`);
      const mapped = mapping.get(key);
      if (!mapped) failures.push(`${config.folder} missing lesson mapping for Unit ${key.split("-")[0]} Lesson ${key.split("-")[1]}`);
      if (!exists(lessonDir)) {
        failures.push(`${config.folder} missing lesson folder ${rel(lessonDir)}`);
        continue;
      }
      stats.lessons += 1;
      const lessonTextParts = [];
      for (const page of pageNames) {
        const file = path.join(lessonDir, page);
        if (!exists(file)) {
          failures.push(`${rel(lessonDir)} missing ${page}`);
          continue;
        }
        stats.pages += 1;
        const text = read(file);
        const plain = stripHtml(text);
        lessonTextParts.push(text);
        if (forbiddenRe.test(plain)) failures.push(`${rel(file)} contains forbidden placeholder/GIFT/teacher-dependent wording`);
        if (!supportPositiveRe.test(plain)) warnings.push(`${rel(file)} does not visibly invite Teacher of Record support`);
        if (!rigorRe.test(plain)) failures.push(`${rel(file)} lacks step-by-step/teacher-style reasoning markers`);
        if (!extractMlaCodes(text).some((code) => mapped?.standards.includes(code))) {
          failures.push(`${rel(file)} missing mapped MLA standard from lesson mapping`);
        }
        if (["P02.html", "P03.html", "P04.html", "P06.html"].includes(page) && !visualRe.test(text)) {
          failures.push(`${rel(file)} missing visual/source/table/model/data support language`);
        }
        if (page === "P04.html" && (text.match(/(?:Worked Example|Example)\s*\d/gi) || []).length < 3) {
          failures.push(`${rel(file)} has fewer than 3 worked examples`);
        }
      }
      const lessonText = lessonTextParts.join("\n");
      if (mapped?.visual && !visualRe.test(lessonText)) failures.push(`${rel(lessonDir)} mapping requires visual/source support but lesson does not show it`);
      if (config.type === "science") {
        if (!scienceLabRe.test(lessonText)) failures.push(`${rel(lessonDir)} missing science lab/simulation/investigation/CER language`);
        const urls = lessonText.match(directUrlRe) || [];
        if (urls.length === 0) failures.push(`${rel(lessonDir)} missing exact direct lab/simulation/resource URL`);
        if (urls.length > 0 && !resourceDirectionsRe.test(lessonText)) {
          failures.push(`${rel(lessonDir)} has resource URL but lacks step-by-step student directions for what to click, observe, record, or submit`);
        }
      }
    }
  }

  const giftFiles = walk(courseDir, (file) => /\.gift$/i.test(file));
  for (const file of giftFiles) failures.push(`GIFT file present after XML-only rule: ${rel(file)}`);

  const xmlFiles = walk(unitsDir, (file) => /\.xml$/i.test(file));
  stats.xmlFiles = xmlFiles.length;
  if (xmlFiles.length !== expected.units * expected.xmlFilesPerUnit) {
    failures.push(`${config.folder} expected ${expected.units * expected.xmlFilesPerUnit} XML files, found ${xmlFiles.length}`);
  }
  for (const file of xmlFiles) {
    const result = auditXml(file, mapping, config);
    stats.xmlQuestions += result.questions;
    failures.push(...result.failures);
    warnings.push(...result.warnings);
  }
  if (stats.xmlQuestions !== expected.units * expected.questionsPerUnit) {
    failures.push(`${config.folder} expected ${expected.units * expected.questionsPerUnit} XML questions, found ${stats.xmlQuestions}`);
  }

  return { course: config.folder, stats, failures, warnings };
}

const results = courses.map(auditCourse);
const totalFailures = results.reduce((sum, result) => sum + result.failures.length, 0);
const totalWarnings = results.reduce((sum, result) => sum + result.warnings.length, 0);

const report = [];
report.push("# Updated Crosswalk Lesson and Assessment Rigor Audit");
report.push("");
report.push(`Date: ${today}`);
report.push("");
report.push("## Scope");
report.push("");
for (const course of courses) report.push(`- ${course.folder}`);
report.push("");
report.push("## Audit Standard");
report.push("");
report.push("- Crosswalk must retain Florida, CPALMS, Common Core, ACT, and SAT provenance plus official CPALMS verification addendum.");
report.push("- Every lesson page must trace to the current lesson mapping and use step-by-step independent-student instructional rigor.");
report.push("- Lessons must include Teacher of Record support language without implying a live teacher is teaching the course.");
report.push("- Science lessons must include exact direct lab/simulation/resource links and step-by-step student directions.");
report.push("- Social science lessons must include visuals, sources, maps, charts, timelines, tables, matrices, or scenario evidence when useful for mastery.");
report.push("- Assessments must be Moodle XML only, with no GIFT files, four choices, one correct answer, feedback, visible standards, and embedded stimulus/visual/source evidence.");
report.push("- Pretests and unit assessments may use only the mapped unit standards; guided practice and quizzes may use only their mapped lesson standards.");
report.push("");
report.push("## Summary");
report.push("");
report.push("| Course | Mapped Lessons | Lesson Folders | HTML Pages | XML Files | XML Questions | Failures | Warnings | Decision |");
report.push("|---|---:|---:|---:|---:|---:|---:|---:|---|");
for (const result of results) {
  report.push(`| ${result.course} | ${result.stats.mappedLessons} | ${result.stats.lessons} | ${result.stats.pages} | ${result.stats.xmlFiles} | ${result.stats.xmlQuestions} | ${result.failures.length} | ${result.warnings.length} | ${result.failures.length ? "FAIL" : "PASS"} |`);
}
report.push("");
report.push(`Overall Decision: ${totalFailures === 0 ? "PASS" : "FAIL - repair required"}`);
report.push(`Total Warnings: ${totalWarnings}`);
report.push("");
for (const result of results) {
  report.push(`## ${result.course}`);
  report.push("");
  if (result.failures.length === 0) {
    report.push("PASS: No blockers found against the updated crosswalk lesson and assessment rigor audit.");
  } else {
    report.push(`FAILURES (${result.failures.length}):`);
    for (const failure of result.failures.slice(0, 250)) report.push(`- ${failure}`);
    if (result.failures.length > 250) report.push(`- Additional failures omitted from report: ${result.failures.length - 250}`);
  }
  if (result.warnings.length) {
    report.push("");
    report.push(`WARNINGS (${result.warnings.length}):`);
    for (const warning of result.warnings.slice(0, 50)) report.push(`- ${warning}`);
    if (result.warnings.length > 50) report.push(`- Additional warnings omitted from report: ${result.warnings.length - 50}`);
  }
  report.push("");
}

const outDir = path.join(root, "Course Audit");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `UPDATED_CROSSWALK_LESSON_ASSESSMENT_RIGOR_AUDIT_${today}.md`);
fs.writeFileSync(outFile, report.join("\n"), "utf8");

console.log(JSON.stringify({
  report: rel(outFile),
  totalFailures,
  totalWarnings,
  results: results.map((result) => ({
    course: result.course,
    stats: result.stats,
    failures: result.failures.length,
    warnings: result.warnings.length,
  })),
}, null, 2));

process.exit(totalFailures === 0 ? 0 : 1);
