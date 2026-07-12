const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function cdata(value) {
  return `<![CDATA[${String(value).replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function parseLessonMapping(courseName) {
  const file = path.join(root, courseName, "Course Production", "PHASE_3B_LESSON_MAPPING.md");
  const map = new Map();
  for (const line of read(file).split(/\r?\n/)) {
    if (!/^\|\s*Unit\s+\d+/i.test(line)) continue;
    const cols = line.split("|").slice(1, -1).map(cell => cell.trim());
    const unit = Number((cols[0].match(/\d+/) || [])[0]);
    const lesson = Number((cols[1].match(/\d+/) || [])[0]);
    if (!unit || !lesson) continue;
    const standards = Array.from(new Set((cols[4].match(/\b(?:SS\.912|MLA\.[A-Z]+|HE\.912)[A-Z0-9._-]*\b/g) || [])));
    map.set(`${pad(unit)}-${pad(lesson)}`, {
      unit,
      lesson,
      title: cols[3],
      standards,
      visual: cols[6] || "course evidence organizer"
    });
  }
  return map;
}

function addCulturalStudiesQuizStandards() {
  const courseName = "CULTURAL STUDIES";
  const mapping = parseLessonMapping(courseName);
  let changed = 0;
  for (const [key, lesson] of mapping.entries()) {
    const file = path.join(root, courseName, "Units", `Unit ${pad(lesson.unit)}`, `Lesson ${pad(lesson.lesson)}`, "quiz.json");
    if (!fs.existsSync(file)) continue;
    const json = JSON.parse(read(file));
    json.standards = lesson.standards;
    if (lesson.lesson === 8 && json.assessments) {
      json.assessments.lessonQuiz = 0;
      json.assessments.unitAssessment = 40;
    }
    write(file, `${JSON.stringify(json, null, 2)}\n`);
    changed++;
  }
  return changed;
}

function addUsHistorySupportStandardsTrace() {
  const courseName = "U.S. HISTORY";
  const supportStandards = [
    "MA.K12.MTR.1.1",
    "MA.K12.MTR.2.1",
    "MA.K12.MTR.3.1",
    "MA.K12.MTR.4.1",
    "MA.K12.MTR.5.1",
    "MA.K12.MTR.6.1",
    "MA.K12.MTR.7.1",
    "ELA.K12.EE.1.1",
    "ELA.K12.EE.2.1",
    "ELA.K12.EE.3.1",
    "ELA.K12.EE.4.1",
    "ELA.K12.EE.5.1",
    "ELA.K12.EE.6.1",
    "ELD.K12.ELL.SI.1",
    "ELD.K12.ELL.SS.1"
  ];
  const unitsRoot = path.join(root, courseName, "Units");
  let changed = 0;
  for (let unit = 1; unit <= 6; unit++) {
    for (let lesson = 1; lesson <= 8; lesson++) {
      for (const name of ["lesson.json", "quiz.json"]) {
        const file = path.join(unitsRoot, `Unit ${pad(unit)}`, `Lesson ${pad(lesson)}`, name);
        if (!fs.existsSync(file)) continue;
        const json = JSON.parse(read(file));
        json.support_standards_trace = {
          purpose: "Exact support-standard trace for literacy, ELD access, mathematical practice, SAT/ACT readiness, and accreditation documentation. These support standards guide evidence use, reading, writing, data interpretation, and academic communication; they do not replace the lesson's mapped U.S. History content standards.",
          standards: supportStandards
        };
        write(file, `${JSON.stringify(json, null, 2)}\n`);
        changed++;
      }
    }
  }
  return changed;
}

function moodleQuestion(name, standards, title, visual, index, correctPosition) {
  const standardText = standards.join("; ");
  const prompts = [
    "Which conclusion best synthesizes the mapped evidence without adding outside content?",
    "Which response uses the organizer to connect cause, context, and consequence?",
    "Which answer best compares the source evidence across the unit?",
    "Which explanation stays inside the mapped synthesis standards?",
    "Which response would be strongest for a student mastery check?"
  ];
  const answers = [
    {
      correct: true,
      text: `Use the ${visual} to connect specific evidence, historical context, and reasoning to the mapped U.S. History synthesis standards.`,
      feedback: `Correct. The response uses the ${visual}, cites evidence, explains the historical relationship, and stays within ${standardText}.`
    },
    {
      correct: false,
      text: "Choose a familiar historical term without proving it from the source, map, timeline, chart, or organizer.",
      feedback: `This is not the best answer because it names a term but does not prove the claim from the ${visual}.`
    },
    {
      correct: false,
      text: "Use a detail from another unit or a later topic instead of the evidence in this synthesis lesson.",
      feedback: `This drifts outside the Lesson 08 synthesis scope. Stay with the evidence and standards shown in the question.`
    },
    {
      correct: false,
      text: "Make a broad opinion statement without connecting evidence to historical reasoning.",
      feedback: "This is incomplete. U.S. History mastery requires evidence, reasoning, and a clear standard connection."
    }
  ];
  const ordered = [];
  for (let i = 0; i < answers.length; i++) ordered.push(answers[(i - correctPosition + answers.length) % answers.length]);
  return `<question type="multichoice">
<name><text>${name}</text></name>
<questiontext format="html"><text>${cdata(`<div><p><strong>Question ID:</strong> ${name}</p><p><strong>MLA Standard:</strong> ${standardText}</p><p>${prompts[index - 1]}</p><div class="mla-visual"><h3>Embedded U.S. History Support: ${visual}</h3><table class="content-visual"><tr><th>Evidence Step</th><th>What the Student Should Do</th></tr><tr><td>Source</td><td>Identify the document, map, timeline, chart, or organizer detail being used.</td></tr><tr><td>Context</td><td>Place the evidence in the correct time period and unit topic.</td></tr><tr><td>Reasoning</td><td>Explain cause, effect, comparison, continuity, change, rights, policy, geography, or economics as required by the mapped standards.</td></tr><tr><td>Synthesis</td><td>Connect the evidence to a complete historical claim without guessing or adding outside content.</td></tr></table><p class="check"><strong>Student check:</strong> Before answering, point to the exact evidence, name the historical relationship, and verify that the explanation stays within ${standardText}.</p></div></div>`)}</text></questiontext>
<shuffleanswers>true</shuffleanswers>
<single>true</single>
<answernumbering>abc</answernumbering>
${ordered.map(answer => `<answer fraction="${answer.correct ? 100 : 0}"><text>${cdata(answer.text)}</text><feedback format="html"><text>${cdata(answer.feedback)}</text></feedback></answer>`).join("\n")}
</question>`;
}

function rebuildUsHistoryLesson8GuidedPractice() {
  const courseName = "U.S. HISTORY";
  let changed = 0;
  for (let unit = 1; unit <= 6; unit++) {
    const lessonFile = path.join(root, courseName, "Units", `Unit ${pad(unit)}`, "Lesson 08", "lesson.json");
    const lesson = JSON.parse(read(lessonFile));
    const visual = lesson.full_crosswalk_trace?.visual_source_stimulus || "unit synthesis evidence organizer";
    const questions = [];
    for (let i = 1; i <= 5; i++) {
      questions.push(moodleQuestion(`USH_U${pad(unit)}_L08_GP_Q${pad(i)}`, lesson.standards, lesson.title, visual, i, (i - 1) % 4));
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n${questions.join("\n")}\n</quiz>\n`;
    const target = path.join(root, courseName, "Units", `Unit ${pad(unit)}`, "Moodle XML", `USH_U${pad(unit)}_L08_GuidedPractice_MoodleXML.xml`);
    write(target, xml);
    changed++;
  }
  return changed;
}

function replaceQuestionStandard(file, questionName, fromStandard, toStandard, title, visual) {
  let text = read(file);
  const pattern = new RegExp(`(<question type="multichoice"><name><text>${questionName}<\\/text><\\/name>[\\s\\S]*?<\\/question>)`);
  const match = text.match(pattern);
  if (!match) throw new Error(`Question not found: ${questionName} in ${file}`);
  let block = match[1];
  block = block.replaceAll(fromStandard, toStandard);
  block = block.replace(/<p>[^<]*(Scenario|Evidence check|Standard match|Reasoning task|Misconception check|Data interpretation|Application|Synthesis item)[\s\S]*?<\/p><div class="mla-visual">/, `<p>Evidence task: Use the embedded ${visual} to answer a question about ${title}.</p><div class="mla-visual">`);
  block = block.replace(/<h3>Embedded (Psychology|Sociology) Support: [^<]+<\/h3>/, `<h3>Embedded $1 Support: ${visual}</h3>`);
  block = block.replace(/Use the [^<]+ evidence to explain [^<]+ and connect the reasoning to [^<]+/g, `Use the ${visual} evidence to explain ${title} and connect the reasoning to ${toStandard}`);
  block = block.replace(/uses the required [^,]+ evidence, explains the reasoning for [^,]+, and stays within [^.]+/g, `uses the required ${visual} evidence, explains the reasoning for ${title}, and stays within ${toStandard}`);
  block = block.replace(/does not use the required [^,]+ evidence clearly, does not explain the reasoning for [^,]+, or drifts outside [^.]+/g, `does not use the required ${visual} evidence clearly, does not explain the reasoning for ${title}, or drifts outside ${toStandard}`);
  text = text.replace(match[1], block);
  write(file, text);
}

function repairPsychologySociologyXmlCoverage() {
  replaceQuestionStandard(
    path.join(root, "PSYCHOLOGY", "Units", "Unit 06", "PSY_U06_Pretest.xml"),
    "PSY_U06_L07_PT_07",
    "MLA.PSY.CAP.1",
    "MLA.PSY.CAP.2",
    "Psychology Capstone: Evidence-Based Behavior Analysis",
    "capstone evidence planning organizer"
  );
  replaceQuestionStandard(
    path.join(root, "SOCIOLOGY", "Units", "Unit 03", "SOC_U03_Pretest.xml"),
    "SOC_U03_L05_PT_05",
    "MLA.SOC.GRP.1",
    "MLA.SOC.STR.2",
    "Labeling, Stigma, and Consequences",
    "labeling consequence flowchart"
  );
  replaceQuestionStandard(
    path.join(root, "SOCIOLOGY", "Units", "Unit 03", "Lesson 08", "SOC_U03_UnitAssessment.xml"),
    "SOC_U03_L08_UA_05",
    "MLA.SOC.GRP.1",
    "MLA.SOC.STR.2",
    "Labeling, Stigma, and Consequences",
    "labeling consequence flowchart"
  );
  replaceQuestionStandard(
    path.join(root, "SOCIOLOGY", "Units", "Unit 06", "SOC_U06_Pretest.xml"),
    "SOC_U06_L07_PT_07",
    "MLA.SOC.CAP.1",
    "MLA.SOC.CAP.2",
    "Sociology Capstone: Evidence-Based Social Analysis",
    "capstone social analysis organizer"
  );
  return 4;
}

const summary = {
  culturalStudiesQuizJsonUpdated: addCulturalStudiesQuizStandards(),
  usHistoryJsonSupportTraceUpdated: addUsHistorySupportStandardsTrace(),
  usHistoryL08GuidedPracticeRebuilt: rebuildUsHistoryLesson8GuidedPractice(),
  psychologySociologyXmlQuestionsRepaired: repairPsychologySociologyXmlCoverage()
};

console.log(JSON.stringify(summary, null, 2));
