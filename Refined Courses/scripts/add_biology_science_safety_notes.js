const fs = require("fs");
const path = require("path");

const root = process.cwd();
const noteTitle = "Science Safety and Resource Note";
const note = `<section style="border: 1px solid #d1d5db; border-left: 6px solid #dc2626; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: #fef2f2;"><h2 style="font-size: 23px; margin-top: 0;">${noteTitle}</h2><p>This lesson uses safe data analysis, model interpretation, virtual investigation planning, observation evidence, or public-data reasoning. Do not perform any hands-on experiment, field collection, chemical use, specimen handling, heat/flame activity, sharp-tool activity, or outdoor investigation unless it is explicitly approved through your Teacher of Record or approved school workflow.</p><p>External simulations and resources are approval-only. Use the lesson content, embedded tables, diagrams, maps, models, and data displays as the required source for mastery unless an approved resource is later added.</p></section>`;

for (let unit = 1; unit <= 6; unit++) {
  const unitNo = String(unit).padStart(2, "0");
  for (let lesson = 1; lesson <= 8; lesson++) {
    const lessonNo = String(lesson).padStart(2, "0");
    const file = path.join(root, "BIOLOGY", "Units", `Unit ${unitNo}`, `Lesson ${lessonNo}`, "P01.html");
    let html = fs.readFileSync(file, "utf8");
    if (html.includes(noteTitle)) continue;
    const marker = '<div class="mla-tor-support-box"';
    const idx = html.indexOf(marker);
    if (idx === -1) throw new Error(`TOR box not found in ${file}`);
    html = `${html.slice(0, idx)}${note}\n${html.slice(idx)}`;
    fs.writeFileSync(file, html, "utf8");
  }
}

console.log("Added Biology science safety/resource notes to P01 pages.");
