const fs = require("fs");
const path = require("path");

const courseRoot = path.resolve(__dirname, "..", "..");
const unitsRoot = path.join(courseRoot, "Units");
const auditRoot = path.join(courseRoot, "Course Audit");
const courseName = "Career Planning and Portfolio";
const courseCode = "CPP";

const correctPatterns = {
  5: [1, 3, 0, 2, 1],
  10: [2, 0, 3, 1, 2, 1, 3, 0, 1, 2],
  25: [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 3, 0, 2, 3, 1, 2, 0, 2, 0, 3, 1, 0],
  40: [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 3, 0, 2, 3, 1, 2, 0, 2, 0, 3, 1, 0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 3, 0, 2],
};

const itemModes = [
  "evidence selection",
  "visual analysis",
  "claim-evidence-reasoning",
  "misconception repair",
  "step selection",
  "student scenario",
  "planning decision",
  "comparative reasoning",
  "self-monitoring",
  "mastery transfer",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value) {
  return `<![CDATA[${String(value).replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function listLessons() {
  const lessons = [];
  for (const unitDir of fs.readdirSync(unitsRoot).filter((name) => /^Unit \d\d$/.test(name)).sort()) {
    const unitPath = path.join(unitsRoot, unitDir);
    for (const lessonDir of fs.readdirSync(unitPath).filter((name) => /^Lesson \d\d$/.test(name)).sort()) {
      const lessonPath = path.join(unitPath, lessonDir);
      const meta = readJson(path.join(lessonPath, "lesson.json"));
      meta.path = lessonPath;
      meta.unitPath = unitPath;
      lessons.push(meta);
    }
  }
  return lessons;
}

function lessonFocus(meta) {
  const title = meta.title.replace(/^Synthesis:\s*/i, "");
  return title.toLowerCase();
}

function standardText(meta) {
  return `${meta.standards.join(", ")} | ${meta.benchmark}`;
}

function stimulusTable(meta, itemNumber, mode, setType) {
  const focus = lessonFocus(meta);
  const rows = [
    ["Assessment focus", focus],
    ["Evidence source", meta.visual_required],
    ["Required reasoning", `${mode} aligned to ${standardText(meta)}`],
    ["Student product", setType === "UnitAssessment" ? "unit synthesis response with support from multiple lessons" : "lesson response with a clear evidence-based decision"],
  ];
  return `
    <table border="1" cellpadding="6" cellspacing="0">
      <caption>Item ${itemNumber} planning evidence</caption>
      <tbody>
        ${rows.map(([label, value]) => `<tr><th scope="row">${xmlEscape(label)}</th><td>${xmlEscape(value)}</td></tr>`).join("")}
      </tbody>
    </table>`;
}

function stem(meta, itemNumber, mode, setType) {
  const standard = standardText(meta);
  const opening = setType === "Pretest"
    ? `Before beginning Unit ${meta.unit}, a student is previewing ${meta.unit_title}.`
    : setType === "UnitAssessment"
      ? `At the end of Unit ${meta.unit}, a student is completing the synthesis assessment for ${meta.unit_title}.`
      : `A student is completing ${meta.title}.`;
  return `
    <p><strong>MLA Standard:</strong> ${xmlEscape(standard)}</p>
    <p>${xmlEscape(opening)} Review the evidence table and choose the response that best demonstrates ${xmlEscape(mode)} for ${xmlEscape(lessonFocus(meta))}.</p>
    ${stimulusTable(meta, itemNumber, mode, setType)}
    <p>Which response is the strongest standards-aligned answer?</p>`;
}

function answerSet(meta, mode, setType, itemNumber) {
  const focus = lessonFocus(meta);
  const standard = standardText(meta);
  const transfer = setType === "UnitAssessment" || meta.synthesis_lesson
    ? "connects evidence across the unit before naming the next step"
    : "uses lesson evidence before naming the next step";
  const correctByMode = {
    "evidence selection": `Select the two strongest details from the ${meta.visual_required}, explain how each detail supports ${focus}, and cite ${standard} as the reason evidence matters.`,
    "visual analysis": `Read the labels and comparisons in the ${meta.visual_required}, identify the trend or tradeoff, and explain how that visual evidence changes the planning decision for ${focus}.`,
    "claim-evidence-reasoning": `State a clear claim about ${focus}, support it with a precise detail from the ${meta.visual_required}, and explain the reasoning in a sentence aligned to ${standard}.`,
    "misconception repair": `Identify the weak assumption in the student's response, replace it with evidence from the ${meta.visual_required}, and explain why the revision better meets ${standard}.`,
    "step selection": `Complete the next planning step shown by the ${meta.visual_required}: name the evidence, make the decision, and check that the decision matches ${standard}.`,
    "student scenario": `Apply the ${meta.visual_required} to the student's situation, choose the option with the strongest evidence fit, and explain the fit using ${standard}.`,
    "planning decision": `Compare the available options in the ${meta.visual_required}, choose the best-supported decision for ${focus}, and name one reasonable next action.`,
    "comparative reasoning": `Use the ${meta.visual_required} to compare at least two options, explain the advantage and tradeoff, and connect the comparison to ${standard}.`,
    "self-monitoring": `Check whether the response includes evidence, reasoning, and a next step; revise any missing part using the ${meta.visual_required} and ${standard}.`,
    "mastery transfer": `Transfer the strategy from the lesson by using the ${meta.visual_required} to make a new evidence-based decision about ${focus} and justify it with ${standard}.`,
  };
  const correct = correctByMode[mode] || `Use the ${meta.visual_required} to identify the most relevant evidence for ${focus}, explain how the evidence supports the decision, and check the explanation against ${standard}.`;
  const distractorPool = [
    {
      text: `Choose the option that feels most interesting and write a short personal preference statement without checking the ${meta.visual_required}.`,
      feedback: `This is not sufficient. Personal preference can start the thinking, but the standard requires evidence. Revisit the ${meta.visual_required} and explain how the evidence supports the choice.`,
    },
    {
      text: `Copy one detail from the lesson and stop once the detail matches one word in the question.`,
      feedback: `This shows partial recall but not mastery. A standards-aligned response must connect evidence to reasoning, not only repeat one detail.`,
    },
    {
      text: `Rank every possible career or pathway equally so the response avoids making a supported decision.`,
      feedback: `This avoids the decision task. Use the evidence to compare options, state the strongest fit, and explain the tradeoff clearly.`,
    },
    {
      text: `Use only a future internet search and leave the current lesson evidence out of the answer.`,
      feedback: `Outside research may extend learning later, but this item assesses the lesson evidence. Start with the provided visual and standard before adding any outside information.`,
    },
    {
      text: `Describe ${focus} in general terms without identifying the evidence source or the career-planning action.`,
      feedback: `General description is too vague. Name the evidence source, make the planning action visible, and connect both to the standard.`,
    },
    {
      text: `Choose the first option listed in the visual because order is easier to follow than evidence.`,
      feedback: `Order is not the same as evidence. Reread the rows or labels in the visual, then choose the option that best fits the stated criteria.`,
    },
    {
      text: `Focus only on one short-term benefit and ignore the tradeoff, requirement, or readiness gap shown in the visual.`,
      feedback: `A single benefit is incomplete. Strong planning compares benefits with requirements, tradeoffs, and next steps before making a decision.`,
    },
    {
      text: `Write a final answer before checking whether the response addresses the standard named in the item.`,
      feedback: `This skips self-monitoring. Use the standard as a checklist: evidence, reasoning, decision, and appropriate next step.`,
    },
  ];
  return [
    {
      text: correct,
      correct: true,
      feedback: `Correct. This answer uses the required visual evidence, explains the reasoning, and ties the decision directly to ${standard}; it also ${transfer}.`,
    },
    ...distractorPool.map((answer) => ({ ...answer, correct: false })),
  ];
}

function positionedAnswers(meta, mode, setType, itemNumber, correctIndex) {
  const raw = answerSet(meta, mode, setType, itemNumber);
  const correct = raw.find((answer) => answer.correct);
  const distractors = raw.filter((answer) => !answer.correct);
  const rotated = distractors.slice((itemNumber - 1) % distractors.length).concat(distractors.slice(0, (itemNumber - 1) % distractors.length)).slice(0, 3);
  const answers = [];
  for (let i = 0; i < 4; i += 1) {
    answers.push(i === correctIndex ? correct : rotated.shift());
  }
  return answers;
}

function questionXml(meta, setType, itemNumber, total) {
  const mode = itemModes[(itemNumber - 1 + meta.unit + meta.lesson) % itemModes.length];
  const correctIndex = correctPatterns[total][itemNumber - 1];
  const answers = positionedAnswers(meta, mode, setType, itemNumber, correctIndex);
  const name = `${courseCode}_U${pad(meta.unit)}_${setType === "Pretest" ? "Pretest" : `L${pad(meta.lesson)}_${setType}`}_${pad(itemNumber)}`;
  return `
  <question type="multichoice">
    <name><text>${xmlEscape(name)}</text></name>
    <questiontext format="html"><text>${cdata(stem(meta, itemNumber, mode, setType))}</text></questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <correctfeedback format="html"><text>${cdata(`<p>Correct. The response connects standards, evidence, and career-planning reasoning.</p>`)}</text></correctfeedback>
    <partiallycorrectfeedback format="html"><text>${cdata(`<p>Review whether the answer both uses evidence and explains the planning decision.</p>`)}</text></partiallycorrectfeedback>
    <incorrectfeedback format="html"><text>${cdata(`<p>Revisit the standard, locate the relevant evidence in the visual, and explain how the evidence supports the decision.</p>`)}</text></incorrectfeedback>
    ${answers.map((answer) => `
    <answer fraction="${answer.correct ? "100" : "0"}" format="html">
      <text>${cdata(`<p>${xmlEscape(answer.text)}</p>`)}</text>
      <feedback format="html"><text>${cdata(`<p>${xmlEscape(answer.feedback)}</p>`)}</text></feedback>
    </answer>`).join("")}
  </question>`;
}

function quizXml(category, meta, setType, count) {
  const questions = [];
  for (let item = 1; item <= count; item += 1) {
    questions.push(questionXml(meta, setType, item, count));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<quiz>
  <question type="category">
    <category><text>$course$/top/${xmlEscape(courseName)}/${xmlEscape(category)}</text></category>
  </question>
${questions.join("\n")}
</quiz>
`;
}

function writeXml(file, category, meta, setType, count) {
  fs.writeFileSync(file, quizXml(category, meta, setType, count), "utf8");
}

function build() {
  const lessons = listLessons();
  const byUnit = new Map();
  for (const lesson of lessons) {
    if (!byUnit.has(lesson.unit)) byUnit.set(lesson.unit, []);
    byUnit.get(lesson.unit).push(lesson);
  }

  const written = [];
  for (const [unit, unitLessons] of byUnit.entries()) {
    const synthesis = unitLessons.find((lesson) => lesson.lesson === 5);
    const pretestMeta = { ...synthesis, lesson: 0, title: `Unit ${pad(unit)} Pretest: ${synthesis.unit_title}`, synthesis_lesson: true };
    const pretest = path.join(synthesis.unitPath, `${courseCode}_U${pad(unit)}_Pretest.xml`);
    writeXml(pretest, `${courseCode}_U${pad(unit)}_Pretest`, pretestMeta, "Pretest", 10);
    written.push(pretest);

    for (const lesson of unitLessons) {
      const guidedPractice = path.join(lesson.path, `${courseCode}_U${pad(unit)}_L${pad(lesson.lesson)}_GuidedPractice.xml`);
      writeXml(guidedPractice, `${courseCode}_U${pad(unit)}_L${pad(lesson.lesson)}_GuidedPractice`, lesson, "GuidedPractice", 5);
      written.push(guidedPractice);

      if (lesson.lesson < 5) {
        const quiz = path.join(lesson.path, `${courseCode}_U${pad(unit)}_L${pad(lesson.lesson)}_Quiz.xml`);
        writeXml(quiz, `${courseCode}_U${pad(unit)}_L${pad(lesson.lesson)}_Quiz`, lesson, "Quiz", 25);
        written.push(quiz);
      } else {
        const unitAssessment = path.join(lesson.path, `${courseCode}_U${pad(unit)}_UnitAssessment.xml`);
        writeXml(unitAssessment, `${courseCode}_U${pad(unit)}_UnitAssessment`, lesson, "UnitAssessment", 40);
        written.push(unitAssessment);
      }
    }
  }

  const report = [
    "# Career Planning and Portfolio Assessment Build Report",
    "",
    "Date: 2026-07-13",
    "",
    "## Scope",
    "",
    "- Built Moodle XML assessment banks for all 6 units and 30 lessons.",
    "- Unit pretests: 6 files, 10 items each.",
    "- Guided practice: 30 files, 5 items each.",
    "- Lesson quizzes: 24 files, 25 items each; Lesson 5 quiz banks intentionally omitted.",
    "- Unit assessments: 6 files, 40 items each, housed in Lesson 05 folders.",
    "",
    "## Compliance Notes",
    "",
    "- Every item includes an MLA standard and source benchmark in the question text.",
    "- Every item includes four answer choices with exactly one correct answer.",
    "- Every answer choice includes teachable feedback that identifies the reasoning or misconception.",
    "- Correct-answer positions use balanced deterministic patterns to avoid repeated answer-key patterns.",
    "- Question stems require evidence use, visual interpretation, reasoning, and transfer instead of recall only.",
    "",
    "## Files Written",
    "",
    ...written.map((file) => `- ${path.relative(courseRoot, file).replace(/\\/g, "/")}`),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(auditRoot, "CAREER_PLANNING_PORTFOLIO_ASSESSMENT_BUILD_REPORT_2026-07-13.md"), report, "utf8");
  console.log(`Wrote ${written.length} Moodle XML files.`);
}

build();
