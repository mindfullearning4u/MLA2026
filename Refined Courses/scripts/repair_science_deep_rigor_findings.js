const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courses = ["BIOLOGY", "CHEMISTRY", "PHYSICS"];
const htmlPages = ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(read(file).replace(/^\uFEFF/, ""));
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function listLessonDirs(course) {
  const unitsDir = path.join(root, course, "Units");
  const dirs = [];
  for (const unit of fs.readdirSync(unitsDir, { withFileTypes: true })) {
    if (!unit.isDirectory() || !/^Unit \d+$/i.test(unit.name)) continue;
    const unitDir = path.join(unitsDir, unit.name);
    for (const lesson of fs.readdirSync(unitDir, { withFileTypes: true })) {
      if (lesson.isDirectory() && /^Lesson \d+$/i.test(lesson.name)) dirs.push(path.join(unitDir, lesson.name));
    }
  }
  return dirs.sort();
}

function standardsBox(meta) {
  const mappedList = Array.isArray(meta.mappedStandards)
    ? meta.mappedStandards
    : Array.isArray(meta.primaryStandards)
      ? meta.primaryStandards
      : Array.isArray(meta.standards)
        ? meta.standards
        : [];
  const mapped = mappedList.join("; ");
  const support = Array.isArray(meta.supportStandards) ? meta.supportStandards.join("; ") : "";
  return `<section class="mla-standard-trace" style="border: 1px solid #d1d5db; border-left: 6px solid #0f766e; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px; background: #f0fdfa;">
    <h2 style="font-size: 21px; margin: 0 0 8px 0;">Mapped Standards for This Lesson</h2>
    <p style="margin: 0 0 6px 0;"><strong>Primary Standards:</strong> ${mapped}</p>
    <p style="margin: 0;"><strong>Support Standards:</strong> ${support}</p>
  </section>
`;
}

function insertStandardsIfMissing(html, box) {
  if (/MLA\.|SC\./i.test(html)) return html;
  const firstSectionEnd = html.indexOf("</section>");
  if (firstSectionEnd !== -1) {
    return `${html.slice(0, firstSectionEnd + "</section>".length)}\n\n  ${box}${html.slice(firstSectionEnd + "</section>".length)}`;
  }
  const mainOpen = html.indexOf("<main>");
  if (mainOpen !== -1) {
    return `${html.slice(0, mainOpen + "<main>".length)}\n${box}${html.slice(mainOpen + "<main>".length)}`;
  }
  return `${box}\n${html}`;
}

function repairWording(html) {
  return html
    .replaceAll("Teacher move:", "Student reasoning move:")
    .replaceAll("Veteran Teacher Slow Walk", "Student Reasoning Slow Walk")
    .replaceAll("Teacher Slow Walk", "Student Reasoning Slow Walk")
    .replaceAll("Teacher Move", "Student Reasoning Move")
    .replaceAll("A veteran Physics teacher would not ask a student to guess from a word. The teacher would point to the crest, normal line, source-observer motion, spectrum row, frame label, focal point, or image point before choosing an answer.", "Strong physics reasoning does not guess from a word. It points to the crest, normal line, source-observer motion, spectrum row, frame label, focal point, or image point before choosing an answer.")
    .replaceAll("A veteran Physics teacher would first point to the charge signs, field arrows, conductor table, circuit path, voltage-current-resistance values, power values, or device input-output model before choosing an answer.", "Strong physics reasoning first points to the charge signs, field arrows, conductor table, circuit path, voltage-current-resistance values, power values, or device input-output model before choosing an answer.")
    .replaceAll("This example shows how a veteran Physics teacher would slow down, identify the diagram or data, use the correct rule, and explain the result.", "This example shows how to slow down, identify the diagram or data, use the correct rule, and explain the result.")
    .replaceAll("This example shows how a veteran Physics teacher would slow down, identify the evidence, use the correct rule, and explain the result.", "This example shows how to slow down, identify the evidence, use the correct rule, and explain the result.")
    .replaceAll("This example shows how a veteran Physics teacher would slow down, identify the system, use the diagram/table/formula, and explain the result.", "This example shows how to slow down, identify the system, use the diagram/table/formula, and explain the result.")
    .replaceAll("This example shows how a veteran physics teacher would slow down, identify the evidence, and connect the evidence to the concept before choosing an answer.", "This example shows how to slow down, identify the evidence, and connect the evidence to the concept before choosing an answer.")
    .replaceAll("A veteran Physics teacher would ask, &quot;What object are we analyzing, what evidence is shown, and which law or model fits this evidence?&quot; before allowing a calculation.", "Strong physics reasoning asks, &quot;What object is being analyzed, what evidence is shown, and which law or model fits this evidence?&quot; before using a calculation.")
    .replaceAll("A veteran Physics teacher would ask, \"What object are we analyzing, what evidence is shown, and which law or model fits this evidence?\" before allowing a calculation.", "Strong physics reasoning asks, \"What object is being analyzed, what evidence is shown, and which law or model fits this evidence?\" before using a calculation.")
    .replaceAll("A veteran Physics teacher would ask, &quot;What is being tracked, what is the system boundary, and what quantity is given?&quot; before allowing a formula.", "Strong physics reasoning asks, &quot;What is being tracked, what is the system boundary, and what quantity is given?&quot; before using a formula.")
    .replaceAll("A veteran Physics teacher would ask, \"What is being tracked, what is the system boundary, and what quantity is given?\" before allowing a formula.", "Strong physics reasoning asks, \"What is being tracked, what is the system boundary, and what quantity is given?\" before using a formula.")
    .replaceAll("Before graphing, a veteran teacher asks students to read the table out loud:", "Before graphing, read the table in a complete sentence:")
    .replaceAll("A veteran Physics teacher would first identify the scale, evidence source, model, observer frame, or decision criteria before allowing a conclusion.", "Strong physics reasoning first identifies the scale, evidence source, model, observer frame, or decision criteria before making a conclusion.")
    .replaceAll("A veteran teacher draws arrows for vectors.", "A strong vector setup draws arrows for vectors.")
    .replaceAll("A veteran teacher would not let students say &quot;because it happened.&quot;", "A strong CER answer never stops at &quot;because it happened.&quot;")
    .replaceAll("A veteran teacher would not let students say \"because it happened.\"", "A strong CER answer never stops at \"because it happened.\"")
    .replaceAll("Use the direct link below only when the lesson or checkpoint asks you to use an approved virtual resource.", "Use the direct link below when the lesson or checkpoint asks you to use the required virtual resource.")
    .replaceAll("Use the direct link below only when the lesson or checkpoint asks you to use a required virtual resource.", "Use the direct link below when the lesson or checkpoint asks you to use the required virtual resource.")
    .replaceAll("The link opens the specific resource; you should not search for a different activity.", "The link opens the specific resource; use this exact activity so your evidence matches the lesson.")
    .replaceAll("Approved direct resource links are included when a free, student-safe resource supports the lesson. Use the exact lesson link provided; do not search for a different activity or resource.", "Required direct resource links are included when a free, student-safe resource supports the lesson. Use the exact lesson link provided so your evidence matches the lesson.")
    .replaceAll("approved direct resource links are included when a free, student-safe resource supports the lesson. Use the exact lesson link provided; do not search for a different activity or resource.", "required direct resource links are included when a free, student-safe resource supports the lesson. Use the exact lesson link provided so your evidence matches the lesson.")
    .replaceAll("unless it is explicitly approved through your Teacher of Record or approved school workflow.", "unless your Teacher of Record or school workflow gives specific safety clearance.")
    .replaceAll("approved safe resource", "required safe resource")
    .replaceAll("approved virtual resource", "required virtual resource")
    .replaceAll("approved resource", "required resource");
}

let changed = 0;
for (const course of courses) {
  for (const lessonDir of listLessonDirs(course)) {
    const jsonFile = path.join(lessonDir, "lesson.json");
    const meta = fs.existsSync(jsonFile) ? readJson(jsonFile) : {};
    const box = standardsBox(meta);
    for (const page of htmlPages) {
      const file = path.join(lessonDir, page);
      if (!fs.existsSync(file)) continue;
      const before = read(file);
      let after = repairWording(before);
      after = insertStandardsIfMissing(after, box);
      after = after
        .replaceAll("approved directions", "provided directions")
        .replaceAll("approved setup", "safety-cleared setup")
        .replaceAll("unapproved investigations", "unsafe investigations")
        .replaceAll("unapproved wet lab materials", "unsafe wet lab materials")
        .replaceAll("unless the Teacher of Record or school has approved the setup.", "unless the Teacher of Record or school workflow gives specific safety clearance.")
        .replaceAll("unless the Teacher of Record or school has approved the setup", "unless the Teacher of Record or school workflow gives specific safety clearance")
        .replaceAll("approved course location", "required course location")
        .replaceAll("approved workflow", "required workflow")
        .replaceAll("different approved link", "different required link")
        .replaceAll("classroom-approved biology investigation", "provided biology investigation");
      if (after !== before) {
        write(file, after);
        changed += 1;
      }
    }
  }
}

console.log(JSON.stringify({ changed }, null, 2));
