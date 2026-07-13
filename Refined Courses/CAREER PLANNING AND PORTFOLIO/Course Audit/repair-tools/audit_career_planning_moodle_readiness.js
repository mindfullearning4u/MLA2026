const fs = require("fs");
const path = require("path");

const courseRoot = path.resolve(__dirname, "..", "..");
const repoRoot = path.resolve(courseRoot, "..");
const unitsRoot = path.join(courseRoot, "Units");
const productionRoot = path.join(courseRoot, "Course Production");
const auditRoot = path.join(courseRoot, "Course Audit");
const stagingRoot = "D:\\Assessment\\CPP";

const transferPages = ["P01.html", "P02.html", "P03.html", "P04.html", "P06.html", "P07.html"];
const overviewSections = [
  "Course Description",
  "Standards Alignment",
  "Learning Objectives",
  "Prerequisite Knowledge",
  "Course Structure",
  "Lesson Workflow",
  "Assessment Structure",
  "Mastery",
  "College",
];
const forbiddenOverviewPatterns = [
  /content not created/i,
  /placeholder/i,
  /draft/i,
  /internal-only/i,
  /audit-only/i,
  /source-validation/i,
  /production-control/i,
];
const forbiddenLessonPatterns = [
  /Ãƒ|Ã‚|Ã…|Ã¢|ï¿½|ÃƒÂ°Ã…Â¸|Ã¢â‚¬Å“|Ã¢â‚¬|Ã°/,
  /@\{/,
  /undefined|NaN/,
  /Important Important/,
  /teacher will explain|teacher will show|wait for teacher|teacher check/i,
  /CPP_U\d\d_.*\.(xml|gift)/i,
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function exists(file) {
  return fs.existsSync(file);
}

function listFiles(dir, predicate) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, predicate));
    else if (!predicate || predicate(full)) out.push(full);
  }
  return out;
}

function count(text, regex) {
  return [...text.matchAll(regex)].length;
}

function xmlQuestionCount(file) {
  return count(read(file), /<question type="multichoice">/g);
}

function addGate(gates, name, status, evidence) {
  gates.push({ name, status, evidence });
}

function run() {
  const gates = [];
  const blockers = [];
  const warnings = [];

  const completionAudit = path.join(auditRoot, "CAREER_PLANNING_PORTFOLIO_COURSE_COMPLETION_AUDIT_2026-07-13.md");
  if (exists(completionAudit) && read(completionAudit).includes("Status: PASS")) {
    addGate(gates, "Course completion audit", "PASS", "Completion audit exists and reports PASS with zero findings.");
  } else {
    addGate(gates, "Course completion audit", "FAIL", "Completion audit missing or not PASS.");
    blockers.push("Completion audit must pass before Moodle transfer.");
  }

  const overview = path.join(productionRoot, "Course-Overview.md");
  if (!exists(overview)) {
    addGate(gates, "Course overview", "FAIL", "Course overview file is missing.");
    blockers.push("Course overview is required for Moodle orientation transfer.");
  } else {
    const text = read(overview);
    const missingSections = overviewSections.filter((section) => !text.includes(section));
    const forbiddenHits = forbiddenOverviewPatterns.filter((pattern) => pattern.test(text)).map(String);
    if (missingSections.length || forbiddenHits.length) {
      addGate(gates, "Course overview", "FAIL", `Missing sections: ${missingSections.join(", ") || "none"}; forbidden markers: ${forbiddenHits.join(", ") || "none"}.`);
      blockers.push("Course overview must be repaired before Moodle transfer.");
    } else {
      addGate(gates, "Course overview", "PASS", "Required overview sections are present and no internal/draft markers were detected.");
    }
  }

  const productionFiles = [
    "PHASE_1_SOURCE_OF_TRUTH_ANALYSIS.md",
    "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md",
    "PHASE_2A_B_CROSSWALK_DRAFT.md",
    "PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md",
    "PHASE_3A_UNIT_MAPPING.md",
    "PHASE_3B_LESSON_MAPPING.md",
    "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md",
  ];
  const missingProduction = productionFiles.filter((file) => !exists(path.join(productionRoot, file)));
  if (missingProduction.length) {
    addGate(gates, "Mapping and standards files", "FAIL", `Missing: ${missingProduction.join(", ")}.`);
    blockers.push("Required standards/mapping files are missing.");
  } else {
    addGate(gates, "Mapping and standards files", "PASS", "Source-of-truth, standards inventory, crosswalk, unit mapping, lesson mapping, and trace files are present.");
  }

  const lessons = [];
  for (const unitDir of fs.readdirSync(unitsRoot).filter((name) => /^Unit \d\d$/.test(name)).sort()) {
    for (const lessonDir of fs.readdirSync(path.join(unitsRoot, unitDir)).filter((name) => /^Lesson \d\d$/.test(name)).sort()) {
      lessons.push(path.join(unitsRoot, unitDir, lessonDir));
    }
  }
  if (lessons.length !== 30) {
    addGate(gates, "Lesson folder structure", "FAIL", `${lessons.length}/30 lesson folders found.`);
    blockers.push("Lesson folder count must be 30.");
  } else {
    addGate(gates, "Lesson folder structure", "PASS", "30/30 lesson folders found in 6 units.");
  }

  const missingTransferPages = [];
  const lessonTextFindings = [];
  const metadataFindings = [];
  for (const lessonDir of lessons) {
    const meta = readJson(path.join(lessonDir, "lesson.json"));
    const quizMeta = readJson(path.join(lessonDir, "quiz.json"));
    for (const page of transferPages) {
      const file = path.join(lessonDir, page);
      if (!exists(file)) {
        missingTransferPages.push(path.relative(courseRoot, file));
        continue;
      }
      const html = read(file);
      for (const pattern of forbiddenLessonPatterns) {
        if (pattern.test(html)) lessonTextFindings.push(`${path.relative(courseRoot, file)} matched ${pattern}`);
      }
      if (!html.includes("Teacher of Record Support")) lessonTextFindings.push(`${path.relative(courseRoot, file)} missing Teacher of Record Support.`);
      if (!html.includes("Standards Covered in This Lesson") && !html.includes("MLA.CPP.")) lessonTextFindings.push(`${path.relative(courseRoot, file)} missing visible standards trace.`);
    }
    if (meta.lesson === 5 && !meta.synthesis_lesson) metadataFindings.push(`${path.relative(courseRoot, lessonDir)} Lesson 5 is not marked synthesis.`);
    if (meta.lesson === 5 && quizMeta.lesson_quiz_questions !== 0) metadataFindings.push(`${path.relative(courseRoot, lessonDir)} Lesson 5 quiz count is not 0.`);
    if (meta.lesson === 5 && quizMeta.unit_assessment_questions !== 40) metadataFindings.push(`${path.relative(courseRoot, lessonDir)} Lesson 5 unit assessment count is not 40.`);
    if (meta.lesson < 5 && quizMeta.lesson_quiz_questions !== 25) metadataFindings.push(`${path.relative(courseRoot, lessonDir)} Lesson quiz count is not 25.`);
  }

  if (missingTransferPages.length || lessonTextFindings.length) {
    addGate(gates, "Repository lesson transfer pages", "FAIL", `${missingTransferPages.length} missing page findings; ${lessonTextFindings.length} text/cleanliness findings.`);
    blockers.push("Lesson transfer page checkpoint must be clean.");
  } else {
    addGate(gates, "Repository lesson transfer pages", "PASS", "P01, P02, P03, P04, P06, and P07 exist for all 30 lessons; no mojibake, backend file leakage, placeholder artifacts, or prohibited teacher-led language detected.");
  }

  if (metadataFindings.length) {
    addGate(gates, "Lesson and assessment metadata", "FAIL", `${metadataFindings.length} metadata findings.`);
    blockers.push("Lesson/quiz metadata must match the 0.5-credit model.");
  } else {
    addGate(gates, "Lesson and assessment metadata", "PASS", "Lesson 1-4 quiz metadata and Lesson 5 synthesis/unit-assessment metadata match the 0.5-credit model.");
  }

  const xmlFiles = listFiles(unitsRoot, (file) => file.endsWith(".xml"));
  const giftFiles = listFiles(unitsRoot, (file) => file.toLowerCase().endsWith(".gift"));
  const xmlQuestions = xmlFiles.reduce((sum, file) => sum + xmlQuestionCount(file), 0);
  const lesson5QuizFiles = xmlFiles.filter((file) => /_L05_Quiz\.xml$/i.test(file));
  if (xmlFiles.length !== 66 || xmlQuestions !== 1050 || giftFiles.length || lesson5QuizFiles.length) {
    addGate(gates, "Assessment repository package", "FAIL", `${xmlFiles.length}/66 XML files; ${xmlQuestions}/1050 questions; ${giftFiles.length} GIFT files; ${lesson5QuizFiles.length} Lesson 5 quiz files.`);
    blockers.push("Assessment repository package is not Moodle-transfer clean.");
  } else {
    addGate(gates, "Assessment repository package", "PASS", "66 Moodle XML files, 1,050 multichoice questions, no GIFT files, and no Lesson 5 quiz XML files found.");
  }

  let stagingEvidence = "";
  if (!exists(stagingRoot)) {
    stagingEvidence = `${stagingRoot} does not exist. Assessment XML has not yet been staged for Moodle import.`;
    addGate(gates, "D-drive assessment staging", "PENDING", stagingEvidence);
    warnings.push("D-drive XML staging is still required before Moodle assessment import.");
  } else {
    const stagedXml = listFiles(stagingRoot, (file) => file.endsWith(".xml"));
    const unitCounts = [];
    for (let unit = 1; unit <= 6; unit += 1) {
      const unitPath = path.join(stagingRoot, `Unit ${String(unit).padStart(2, "0")}`);
      unitCounts.push(exists(unitPath) ? listFiles(unitPath, (file) => file.endsWith(".xml")).length : 0);
    }
    if (stagedXml.length !== 66 || unitCounts.some((value) => value !== 11)) {
      stagingEvidence = `${stagedXml.length}/66 staged XML files; unit counts: ${unitCounts.join(", ")}.`;
      addGate(gates, "D-drive assessment staging", "PENDING", stagingEvidence);
      warnings.push("D-drive staging exists but does not yet match the expected 11 XML files per unit.");
    } else {
      addGate(gates, "D-drive assessment staging", "PASS", "66 XML files staged in D:\\Assessment\\CPP with 11 files per unit.");
    }
  }

  const repoBlockers = blockers.filter((item) => !item.includes("D-drive"));
  const decision = blockers.length === 0 && warnings.length === 0
    ? "READY FOR MOODLE TRANSFER"
    : blockers.length === 0
      ? "REPOSITORY READY - STAGING REQUIRED BEFORE MOODLE IMPORT"
      : "NOT READY";

  const report = [
    "# Career Planning and Portfolio Pre-Moodle Transfer Readiness Audit",
    "",
    "**Date:** 2026-07-13",
    "**Course:** Career Planning and Portfolio",
    "**Audit Type:** Repo-to-Moodle transfer readiness checkpoint",
    `**Status:** ${decision}`,
    "",
    "## Scope",
    "",
    "This audit verifies whether the repository course package is ready to begin Moodle transfer work under the academy lesson and assessment transfer protocols. It does not certify enrollment readiness, because enrollment readiness can only be certified after Moodle course overview transfer, question-bank import, lesson-page transfer, activity configuration, and Moodle render checks are complete.",
    "",
    "## Gate Results",
    "",
    "| Gate | Result | Evidence |",
    "|---|---:|---|",
    ...gates.map((gate) => `| ${gate.name} | ${gate.status} | ${gate.evidence.replace(/\|/g, "&#124;")} |`),
    "",
    "## Required Transfer Counts",
    "",
    "- Transfer lesson pages: 180 files (P01, P02, P03, P04, P06, P07 for 30 lessons).",
    "- Repository Moodle XML files: 66.",
    "- Repository Moodle XML questions: 1,050.",
    "- D-drive staged XML files expected before import: 66.",
    "- Expected D-drive unit folders: `D:\\Assessment\\CPP\\Unit 01` through `Unit 06`, 11 XML files per unit.",
    "",
    "## Findings",
    "",
    blockers.length === 0 && warnings.length === 0
      ? "- No findings. Course is ready to proceed to Moodle transfer."
      : [
          ...blockers.map((item) => `- BLOCKER: ${item}`),
          ...warnings.map((item) => `- PENDING: ${item}`),
        ].join("\n"),
    "",
    "## Readiness Decision",
    "",
    decision === "READY FOR MOODLE TRANSFER"
      ? "Career Planning and Portfolio is approved to proceed to Moodle transfer."
      : decision === "REPOSITORY READY - STAGING REQUIRED BEFORE MOODLE IMPORT"
        ? "Career Planning and Portfolio is repository-ready for Moodle transfer, but assessment XML must be staged to the approved D-drive path before Moodle question-bank import can begin."
        : "Career Planning and Portfolio is not ready for Moodle transfer until the blockers above are repaired and the audit is rerun.",
    "",
    "## Transfer Restrictions",
    "",
    "- Do not import assessments from the repository folders directly into Moodle.",
    "- Do not import GIFT files.",
    "- Do not transfer P05 pages into Moodle lesson activities under the standard transfer page map.",
    "- Use only Moodle XML for assessment import.",
    "- Use Moodle source-code paste for lesson-page transfer.",
    "- Do not certify enrollment readiness until Moodle render and activity checks are complete.",
    "",
  ].join("\n");

  const reportFile = path.join(auditRoot, "CAREER_PLANNING_PORTFOLIO_PRE_MOODLE_TRANSFER_READINESS_AUDIT_2026-07-13.md");
  fs.writeFileSync(reportFile, report, "utf8");
  console.log(JSON.stringify({ decision, blockers: blockers.length, warnings: warnings.length, report: path.relative(repoRoot, reportFile) }, null, 2));
}

run();
