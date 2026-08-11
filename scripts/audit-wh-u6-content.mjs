import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "Refined Courses", "WORLD HISTORY", "Units", "Unit 06");
const failures = [];
const requireText = (condition, message) => { if (!condition) failures.push(message); };

for (let lesson = 1; lesson <= 8; lesson++) {
  const lessonDir = join(root, `Lesson ${String(lesson).padStart(2, "0")}`);
  for (let page = 1; page <= 7; page++) {
    const label = `L${lesson} P0${page}`;
    const html = readFileSync(join(lessonDir, `P0${page}.html`), "utf8");
    requireText(!/<!doctype|<html\b|<head\b|<body\b/i.test(html), `${label}: Moodle fragment contains a document wrapper`);
    requireText(/Teacher of Record|\bTOR\b/i.test(html), `${label}: missing TOR help reminder`);
    requireText(!/mapped standard scope|standard boundary|historical evidence organizer/i.test(html), `${label}: contains generic production language`);
    requireText(!/SS\.912\./i.test(html), `${label}: contains a legacy standard code`);
    if (page === 2 || page === 3) requireText(/<table\b|<svg\b|<blockquote\b|<figure\b/i.test(html), `${label}: missing required evidence/visual structure`);
  }
}

const xmlDir = join(root, "Moodle XML");
const files = readdirSync(xmlDir).filter((name) => name.endsWith(".xml"));
requireText(!files.some((name) => /GuidedPractice/i.test(name)), "Repository contains obsolete Guided Practice assessment XML");

const assessmentFiles = files.filter((name) => /Quiz|Pretest|UnitAssessment/i.test(name));
for (const name of assessmentFiles) {
  const xml = readFileSync(join(xmlDir, name), "utf8");
  const questionCount = (xml.match(/<question type="multichoice">/g) || []).length;
  const expected = /Pretest/i.test(name) ? 10 : /UnitAssessment/i.test(name) ? 40 : 25;
  requireText(questionCount === expected, `${name}: expected ${expected} questions; found ${questionCount}`);
  requireText(!/Historical evidence organizer|mapped standard scope/i.test(xml), `${name}: contains generic stimuli`);
  requireText(!/SS\.912\./i.test(xml), `${name}: contains legacy standards`);
  requireText(/MLA\.WH\./i.test(xml), `${name}: missing MLA.WH alignment`);
  requireText(/<svg\b|<img\b|<table\b|<blockquote\b/i.test(xml), `${name}: missing embedded source/visual stimuli`);
  requireText(!/all of the above|none of the above/i.test(xml), `${name}: contains a prohibited answer choice`);

  const keys = [...xml.matchAll(/<answer fraction="100"[\s\S]*?<\/answer>/g)].map((match) => match.index);
  requireText(keys.length === questionCount, `${name}: every item must have exactly one keyed answer`);
}

if (failures.length) {
  console.error(`Unit 6 quality gate failed (${failures.length} issues):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Unit 6 content and assessments passed the production quality gate.");
}
