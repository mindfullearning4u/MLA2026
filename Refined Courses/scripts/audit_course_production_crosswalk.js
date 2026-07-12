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
  "GLOBAL PERSPECTIVES",
  "CULTURAL STUDIES",
];

const requiredCategories = {
  overview: ["Course-Overview.md"],
  inventory: ["PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md"],
  crosswalk: ["PHASE_2A_B_CROSSWALK_DRAFT.md"],
  alignment: ["PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md"],
  mappingFramework: ["PHASE_3A_A_MAPPING_FRAMEWORK.md", "PHASE_3A_UNIT_MAPPING.md"],
  unitMapping: ["PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md", "PHASE_3A_UNIT_MAPPING.md"],
  lessonMapping: ["PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md", "PHASE_3B_LESSON_MAPPING.md"],
  visualResourceMapping: ["PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md", "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
};

const sourceTerms = ["Florida", "CPALMS", "Common Core", "ACT", "SAT"];
const scienceCourses = new Set([
  "BIOLOGY",
  "CHEMISTRY",
  "PHYSICS",
  "EARTH SPACE SCIENCE",
  "ANATOMY AND PHYSIOLOGY",
  "ENVIRONMENTAL SCIENCE",
  "MARINE SCIENCE",
]);
const socialCourses = new Set([
  "WORLD HISTORY",
  "U.S. HISTORY",
  "U.S. GOVERNMENT",
  "PERSONAL FINANCIAL LITERACY AND ECONOMICS",
  "PSYCHOLOGY",
  "SOCIOLOGY",
  "GLOBAL PERSPECTIVES",
  "CULTURAL STUDIES",
]);

function read(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function exists(file) {
  return fs.existsSync(file);
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function findFile(dir, includes) {
  if (!exists(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".md"));
  return files.find((f) => includes.every((part) => f.toLowerCase().includes(part.toLowerCase()))) || null;
}

function findFirstExisting(dir, names) {
  return names.map((name) => path.join(dir, name)).find(exists) || null;
}

function unique(arr) {
  return [...new Set(arr)].sort();
}

function expandSocialStudiesRanges(text) {
  const expanded = [];
  const rangeRegex = /\b(SS\.\d{3}\.[A-Z]{1,3}\.)(\d+)\.(\d+)\s*-\s*(?:SS\.\d{3}\.[A-Z]{1,3}\.)?(\d+)\.(\d+)\b/g;
  for (const match of text.matchAll(rangeRegex)) {
    const [, prefix, startCluster, startNum, endCluster, endNum] = match;
    if (startCluster !== endCluster) continue;
    const start = Number(startNum);
    const end = Number(endNum);
    if (!Number.isInteger(start) || !Number.isInteger(end) || end < start || end - start > 50) continue;
    for (let n = start; n <= end; n += 1) expanded.push(`${prefix}${startCluster}.${n}`);
  }
  return expanded;
}

function extractStandardCodes(text) {
  const direct = text.match(/(?:MLA\.[A-Z0-9]+(?:\.[A-Z0-9]+)+|SS\.\d{3}\.[A-Z]{1,3}\.\d+\.\d+|SC\.\d{3}\.[A-Z]\.\d+\.\d+)/g) || [];
  return unique([...direct, ...expandSocialStudiesRanges(text)]);
}

function contentCodesForCourse(course, codes, referenceCodes = codes) {
  if (scienceCourses.has(course)) return codes.filter((code) => code.startsWith("MLA."));
  if (socialCourses.has(course)) {
    const socialUsesMla = referenceCodes.some((code) => code.startsWith("MLA."));
    return codes.filter((code) => code.startsWith(socialUsesMla ? "MLA." : "SS."));
  }
  return codes;
}

function extractRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\s*\|/.test(line) && !/^\s*\|\s*-/.test(line))
    .map((line) => line.trim());
}

function countLessonRows(markdown) {
  const lineRows = extractRows(markdown).filter((row) => /^\|\s*(?:Unit\s*)?\d+\s*\|\s*(?:Lesson\s*)?\d+/i.test(row)).length;
  if (lineRows > 0) return lineRows;
  const inlineRows = markdown.match(/\|\s*(?:Unit\s*)?\d+\s*\|\s*(?:Lesson\s*)?\d+\s*\|/gi) || [];
  return inlineRows.length;
}

function countUnitRows(markdown) {
  return extractRows(markdown).filter((row) => /^\|\s*Unit\s+\d+/i.test(row) || /^\|\s*\d+\s*\|/.test(row)).length;
}

function auditCourse(course) {
  const courseDir = path.join(root, course);
  const productionDir = path.join(courseDir, "Course Production");
  const result = {
    course,
    requiredFilesPresent: 0,
    crosswalkStandards: 0,
    inventoryStandards: 0,
    unitMappingStandards: 0,
    lessonMappingStandards: 0,
    labVisualRows: 0,
    lessonRows: 0,
    failures: [],
    warnings: [],
  };

  if (!exists(productionDir)) {
    result.failures.push("Missing Course Production folder.");
    return result;
  }

  const categoryFiles = {};
  for (const [category, names] of Object.entries(requiredCategories)) {
    const found = findFirstExisting(productionDir, names);
    categoryFiles[category] = found;
    if (found) {
      result.requiredFilesPresent += 1;
    } else if (category === "alignment") {
      result.warnings.push("No separate alignment file; source framework alignment must be fully documented in crosswalk and production text.");
    } else {
      result.failures.push(`Missing required production category: ${category} (${names.join(" or ")})`);
    }
  }

  const overviewFile = categoryFiles.overview;
  const inventoryFile = categoryFiles.inventory;
  const crosswalkFile = categoryFiles.crosswalk;
  const unitFile = categoryFiles.unitMapping;
  const lessonFile = categoryFiles.lessonMapping;
  const labVisualName = findFile(productionDir, ["lab", "visual", "simulation"]);
  const socialVisualName = findFile(productionDir, ["visual"]);

  const allText = fs.readdirSync(productionDir)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .map((f) => read(path.join(productionDir, f)))
    .join("\n");

  for (const term of sourceTerms) {
    if (!new RegExp(term.replace(".", "\\."), "i").test(allText)) {
      result.failures.push(`Missing source provenance term across production package: ${term}`);
    }
  }

  if (/Unit Overview/i.test(allText)) {
    result.failures.push("Production package references old Unit Overview terminology.");
  }
  if (/\bGIFT\b/i.test(allText)) {
    result.failures.push("Production package still references GIFT.");
  }
  if (/\b(candidate resource location for approval|for approval|pending approval|ask for approval|approved resources from lessons)\b/i.test(allText)) {
    result.failures.push("Production package contains approval/candidate resource wording that can conflict with direct-link standards.");
  }

  let inventoryCodes = [];
  let crosswalkCodes = [];
  let unitCodes = [];
  let lessonCodes = [];
  if (inventoryFile) inventoryCodes = extractStandardCodes(read(inventoryFile));
  if (crosswalkFile) crosswalkCodes = extractStandardCodes(read(crosswalkFile));
  if (unitFile) unitCodes = extractStandardCodes(read(unitFile));
  if (lessonFile) {
    const lessonText = read(lessonFile);
    lessonCodes = extractStandardCodes(lessonText);
    result.lessonRows = countLessonRows(lessonText);
  }
  const inventoryContentCodes = contentCodesForCourse(course, inventoryCodes, crosswalkCodes);
  const crosswalkContentCodes = contentCodesForCourse(course, crosswalkCodes, crosswalkCodes);
  const unitContentCodes = contentCodesForCourse(course, unitCodes, crosswalkCodes);
  const lessonContentCodes = contentCodesForCourse(course, lessonCodes, crosswalkCodes);
  result.inventoryStandards = inventoryContentCodes.length;
  result.crosswalkStandards = crosswalkContentCodes.length;
  result.unitMappingStandards = unitContentCodes.length;
  result.lessonMappingStandards = lessonContentCodes.length;

  const primaryCrosswalk = crosswalkContentCodes.filter((code) => !/ELA|MA\.K12|ELD|HE\./.test(code));
  const missingFromInventory = primaryCrosswalk.filter((code) => !inventoryContentCodes.includes(code));
  const missingFromUnit = primaryCrosswalk.filter((code) => !unitContentCodes.includes(code));
  const missingFromLesson = primaryCrosswalk.filter((code) => !lessonContentCodes.includes(code));
  if (missingFromInventory.length) result.failures.push(`Crosswalk standards missing from inventory: ${missingFromInventory.join(", ")}`);
  if (missingFromUnit.length) result.failures.push(`Crosswalk standards missing from unit mapping: ${missingFromUnit.join(", ")}`);
  if (missingFromLesson.length) result.failures.push(`Crosswalk standards missing from lesson mapping: ${missingFromLesson.join(", ")}`);

  const lessonOnly = lessonContentCodes.filter((code) => !crosswalkContentCodes.includes(code) && !/ELA|MA\.K12|ELD|HE\./.test(code));
  if (lessonOnly.length) result.failures.push(`Lesson mapping contains MLA standards not found in crosswalk: ${lessonOnly.join(", ")}`);

  const expectedLessons = course === "U.S. GOVERNMENT" ? 30 : 48;
  if (result.lessonRows !== expectedLessons) result.failures.push(`Expected ${expectedLessons} lesson mapping rows, found ${result.lessonRows}.`);

  if (scienceCourses.has(course)) {
    if (!labVisualName) {
      result.failures.push("Missing science lab/visual/simulation mapping file.");
    } else {
      const text = read(path.join(productionDir, labVisualName));
      result.labVisualRows = countLessonRows(text);
      if (result.labVisualRows !== 48) result.failures.push(`Expected 48 science lab/visual/simulation lesson rows, found ${result.labVisualRows}.`);
      ["Lab", "Simulation", "Visual", "Safety", "Assessment Stimulus", "Direct"].forEach((term) => {
        if (!new RegExp(term, "i").test(text)) result.failures.push(`Science lab/visual mapping missing term: ${term}`);
      });
    }
  }

  if (socialCourses.has(course)) {
    const visualFile = socialVisualName ? path.join(productionDir, socialVisualName) : null;
    const socialText = visualFile ? read(visualFile) : allText;
    ["map", "timeline", "source", "chart", "table", "visual", "assessment"].forEach((term) => {
      if (!new RegExp(term, "i").test(socialText)) result.failures.push(`Social science production mapping missing visual/source term: ${term}`);
    });
  }

  if (overviewFile) {
    const overview = read(overviewFile);
    if (!/Course Overview/i.test(overview)) result.warnings.push("Course overview does not use explicit Course Overview heading.");
  }

  return result;
}

const results = courses.map(auditCourse);
const totalFailures = results.reduce((sum, r) => sum + r.failures.length, 0);

const lines = [];
lines.push("# Course Production Crosswalk Audit");
lines.push("");
lines.push("Date: 2026-07-12");
lines.push("");
lines.push("## Purpose");
lines.push("");
lines.push("This audit checks course production files as the accreditation/compliance backbone: standard inventory, crosswalk, unit mapping, lesson mapping, and required lab/visual/source/resource mapping.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push("| Course | Required Categories | Crosswalk Standards | Inventory Standards | Unit Standards | Lesson Standards | Lesson Rows | Lab/Visual Rows | Failures | Decision |");
lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|---|");
for (const r of results) {
  lines.push(`| ${r.course} | ${r.requiredFilesPresent}/${Object.keys(requiredCategories).length} | ${r.crosswalkStandards} | ${r.inventoryStandards} | ${r.unitMappingStandards} | ${r.lessonMappingStandards} | ${r.lessonRows} | ${r.labVisualRows || ""} | ${r.failures.length} | ${r.failures.length ? "FAIL" : "PASS"} |`);
}
lines.push("");
lines.push(`Overall Decision: ${totalFailures ? "FAIL - course production repairs required" : "PASS - course production crosswalk packages are tight"}`);
lines.push("");
for (const r of results) {
  lines.push(`## ${r.course}`);
  lines.push("");
  if (r.failures.length) {
    lines.push("Failures:");
    r.failures.forEach((f) => lines.push(`- ${f}`));
  } else {
    lines.push("PASS: Crosswalk, inventory, unit mapping, lesson mapping, and required production controls are traceable.");
  }
  if (r.warnings.length) {
    lines.push("");
    lines.push("Warnings:");
    r.warnings.forEach((w) => lines.push(`- ${w}`));
  }
  lines.push("");
}

const out = path.join(root, "Course Audit", "COURSE_PRODUCTION_CROSSWALK_AUDIT_2026-07-12.md");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(JSON.stringify({ report: rel(out), totalFailures, courses: results.map((r) => ({ course: r.course, failures: r.failures.length, lessonRows: r.lessonRows, crosswalkStandards: r.crosswalkStandards })) }, null, 2));
