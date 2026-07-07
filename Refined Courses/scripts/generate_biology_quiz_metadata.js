const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courseRoot = path.join(root, "BIOLOGY");

function lessonTitle(unitNo, lessonNo) {
  const lessonFile = path.join(courseRoot, "Units", `Unit ${unitNo}`, `Lesson ${lessonNo}`, "lesson.json");
  if (!fs.existsSync(lessonFile) || fs.statSync(lessonFile).size === 0) return "";
  return JSON.parse(fs.readFileSync(lessonFile, "utf8")).lessonTitle || "";
}

function standards(unitNo, lessonNo) {
  const lessonFile = path.join(courseRoot, "Units", `Unit ${unitNo}`, `Lesson ${lessonNo}`, "lesson.json");
  if (!fs.existsSync(lessonFile) || fs.statSync(lessonFile).size === 0) return [];
  return JSON.parse(fs.readFileSync(lessonFile, "utf8")).mappedStandards || [];
}

function metadata(unitNo, lessonNo) {
  const unit = `Unit ${unitNo}`;
  const lesson = `Lesson ${lessonNo}`;
  const base = `BIOLOGY/Units/${unit}/${lesson}/Moodle XML`;
  const guided = `${base}/BIO_U${unitNo}_L${lessonNo}_GuidedPractice_MoodleXML.xml`;
  const quiz = lessonNo === "08" ? null : `${base}/BIO_U${unitNo}_L${lessonNo}_Quiz_MoodleXML.xml`;
  const unitAssessment = lessonNo === "08" ? `${base}/BIO_U${unitNo}_UnitAssessment_MoodleXML.xml` : null;
  return {
    course: "Biology",
    unit,
    lesson,
    lessonTitle: lessonTitle(unitNo, lessonNo),
    mappedStandards: standards(unitNo, lessonNo),
    productionAssessmentFormat: "Moodle XML",
    legacyGiftStatus: "Legacy placeholder/source only; not certified production assessment.",
    assessmentReferences: {
      guidedPractice: guided,
      lessonQuiz: quiz,
      unitAssessment
    },
    requiredCounts: {
      guidedPractice: 5,
      lessonQuiz: lessonNo === "08" ? 0 : 25,
      unitAssessment: lessonNo === "08" ? 40 : 0
    },
    moodleDeliveryNote: lessonNo === "08"
      ? "Lesson 08 includes guided practice and the unit assessment bank."
      : "Lesson quiz bank contains 25 questions; Moodle delivery may pull 5 random questions per attempt.",
    certificationBoundary: "Questions must remain aligned only to this lesson's mapped standards and embedded stimuli."
  };
}

for (let unit = 1; unit <= 6; unit++) {
  const unitNo = String(unit).padStart(2, "0");
  for (let lesson = 1; lesson <= 8; lesson++) {
    const lessonNo = String(lesson).padStart(2, "0");
    const file = path.join(courseRoot, "Units", `Unit ${unitNo}`, `Lesson ${lessonNo}`, "quiz.json");
    fs.writeFileSync(file, JSON.stringify(metadata(unitNo, lessonNo), null, 2), "utf8");
  }
}

console.log("Generated Biology quiz metadata for Units 01-06.");
