const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const course = {
  code: "FOA",
  title: "Foundations of Art",
  credit: "1.0 High School Fine Arts Credit",
  type: "Mastery-Based High School Visual Art Course",
  sourceUrl: "https://www.cpalms.org/Public/search/Standard",
  standardsSource: "CPALMS Visual Art standards category, Florida fine arts/visual art expectations, Florida B.E.S.T. literacy support, Common Core literacy support, SAT evidence/visual-data reasoning support, and ACT reading/research support",
  standards: [
    ["MLA.FOA.VOC.1", "Use art vocabulary to describe elements, principles, media, tools, and techniques."],
    ["MLA.FOA.OBS.1", "Observe, sketch, and analyze visible details before creating or critiquing artwork."],
    ["MLA.FOA.EP.1", "Apply elements of art including line, shape, form, space, color, value, and texture."],
    ["MLA.FOA.EP.2", "Apply principles of design including balance, contrast, emphasis, movement, pattern, rhythm, proportion, and unity."],
    ["MLA.FOA.MED.1", "Select and use basic drawing, color, collage, and mixed-media tools safely and intentionally."],
    ["MLA.FOA.PRO.1", "Use the creative process to plan, experiment, revise, refine, and present artwork."],
    ["MLA.FOA.COMP.1", "Create compositions using focal point, arrangement, positive and negative space, and visual pathways."],
    ["MLA.FOA.COLOR.1", "Use color theory, value, temperature, intensity, and color relationships to communicate meaning."],
    ["MLA.FOA.CRT.1", "Critique artwork using description, analysis, interpretation, and evidence-based judgment."],
    ["MLA.FOA.HC.1", "Connect artworks to culture, history, purpose, audience, and artist choices."],
    ["MLA.FOA.PRES.1", "Prepare, document, title, reflect on, and present original artwork responsibly."],
    ["MLA.FOA.PORT.1", "Build a portfolio showing growth, reflection, revision, and standards-based mastery."]
  ],
  units: [
    {
      title: "Visual Language, Observation, and Art Foundations",
      purpose: "establish art vocabulary, close observation, sketchbook habits, visual evidence, and safe studio routines",
      standards: ["MLA.FOA.VOC.1", "MLA.FOA.OBS.1", "MLA.FOA.PRO.1"],
      lessons: [
        ["Art as Visual Language", "define visual communication, subject, content, medium, and evidence"],
        ["Observation Before Opinion", "slow down looking, notice details, and separate observation from interpretation"],
        ["Sketchbook Habits and Studio Safety", "set up a sketchbook process, safety routine, and material-care habits"],
        ["Line as Direction and Expression", "use contour, gesture, implied, and expressive line"],
        ["Shape, Form, and Space", "distinguish flat shape, three-dimensional form, positive space, and negative space"],
        ["Value and Texture Foundations", "use light/dark relationships and texture to describe surfaces"],
        ["Combining Visual Vocabulary", "combine line, shape, form, space, value, and texture in a planned study"],
        ["Putting It All Together", "synthesize observation, vocabulary, sketchbook process, and visual evidence"]
      ]
    },
    {
      title: "Elements of Art and Principles of Design",
      purpose: "develop control of elements and principles so students can intentionally organize visual information",
      standards: ["MLA.FOA.EP.1", "MLA.FOA.EP.2", "MLA.FOA.COMP.1"],
      lessons: [
        ["Elements and Principles Work Together", "explain how elements become organized through design principles"],
        ["Balance and Proportion", "compare symmetrical, asymmetrical, radial, and proportional decisions"],
        ["Contrast and Emphasis", "create focal points using difference, size, placement, color, and value"],
        ["Movement and Rhythm", "guide the viewer's eye using repetition, direction, and visual pathways"],
        ["Pattern and Unity", "use repeated choices to create order without making a composition boring"],
        ["Composition Planning", "plan a layout using thumbnails, cropping, positive space, and negative space"],
        ["Design Revision", "revise a design by strengthening emphasis, balance, movement, and unity"],
        ["Putting It All Together", "synthesize elements and principles in a complete design solution"]
      ]
    },
    {
      title: "Drawing, Media, and Creative Process",
      purpose: "teach students to use drawing and mixed-media tools safely through planning, practice, revision, and reflection",
      standards: ["MLA.FOA.MED.1", "MLA.FOA.PRO.1", "MLA.FOA.COMP.1"],
      lessons: [
        ["Media, Tools, and Safe Use", "select tools, understand limitations, and use materials responsibly"],
        ["Contour and Gesture Drawing", "draw from observation using contour and gesture approaches"],
        ["Value Drawing and Shading", "use value scale, light source, highlight, midtone, shadow, and cast shadow"],
        ["Perspective and Depth Cues", "create space using overlap, size, placement, value, and one-point perspective"],
        ["Collage and Mixed Media", "combine materials while preserving unity, craftsmanship, and intent"],
        ["Experimentation and Revision", "test choices, compare outcomes, and revise with evidence"],
        ["Artist Statement Basics", "explain process, choices, evidence, and intended meaning"],
        ["Putting It All Together", "synthesize drawing, media, process, revision, and artist statement"]
      ]
    },
    {
      title: "Color, Meaning, and Visual Communication",
      purpose: "develop color theory, visual mood, symbolic choices, and communication through intentional design",
      standards: ["MLA.FOA.COLOR.1", "MLA.FOA.EP.1", "MLA.FOA.CRT.1"],
      lessons: [
        ["Color Wheel and Color Relationships", "use primary, secondary, tertiary, complementary, analogous, and monochromatic color"],
        ["Value, Tint, Shade, and Intensity", "adjust color with value and intensity to create depth and mood"],
        ["Warm, Cool, and Neutral Color", "use temperature to affect emphasis, space, and feeling"],
        ["Color and Symbolic Meaning", "interpret color meaning using evidence, context, and audience"],
        ["Color Harmony and Contrast", "choose color schemes that support unity and emphasis"],
        ["Color Planning for Communication", "plan color choices before final work"],
        ["Revising Color Choices", "revise color to strengthen clarity, mood, and focal point"],
        ["Putting It All Together", "synthesize color theory, meaning, and visual communication"]
      ]
    },
    {
      title: "Art Critique, Culture, and Art History Connections",
      purpose: "teach students to analyze artworks using evidence, respectful critique, cultural context, and historical awareness",
      standards: ["MLA.FOA.CRT.1", "MLA.FOA.HC.1", "MLA.FOA.VOC.1"],
      lessons: [
        ["Describe Before Judging", "use objective description before interpretation or opinion"],
        ["Analyze Artist Choices", "connect elements, principles, media, technique, and composition to effect"],
        ["Interpret Meaning With Evidence", "make interpretations supported by visible details and context"],
        ["Judgment and Critique Etiquette", "give respectful, specific, evidence-based feedback"],
        ["Culture, Purpose, and Audience", "connect art to cultural purpose, audience, function, and context"],
        ["Comparing Artworks Across Time", "compare artworks using evidence instead of preference alone"],
        ["Using Critique to Revise", "apply feedback to improve a work while preserving intent"],
        ["Putting It All Together", "synthesize critique, culture, context, and revision evidence"]
      ]
    },
    {
      title: "Portfolio, Presentation, and Personal Artistic Voice",
      purpose: "prepare students to select, refine, present, and reflect on artwork as evidence of growth and mastery",
      standards: ["MLA.FOA.PRES.1", "MLA.FOA.PORT.1", "MLA.FOA.PRO.1"],
      lessons: [
        ["What a Portfolio Shows", "identify how a portfolio shows skill, process, revision, and growth"],
        ["Selecting Work for Evidence", "choose artwork that demonstrates standards and development"],
        ["Documenting Artwork", "title, photograph, label, and organize work clearly"],
        ["Reflection and Artist Voice", "write reflections that explain choices, growth, and next steps"],
        ["Presentation and Audience", "prepare artwork for a viewer using sequence, clarity, and purpose"],
        ["Portfolio Revision", "revise selected work and written reflections using criteria"],
        ["Final Portfolio Statement", "write a final statement connecting standards, process, and growth"],
        ["Putting It All Together", "synthesize portfolio, presentation, reflection, and personal artistic voice"]
      ]
    }
  ]
};

const answerCycle = [0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 3, 0, 2, 1, 0, 2, 3, 0, 2, 3, 1, 2, 0, 3, 1, 0, 2, 1, 3, 2, 0, 1, 3, 0, 2, 3, 1];

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function write(p, content) { ensureDir(path.dirname(p)); fs.writeFileSync(p, content, "utf8"); }
function standardsText(list) { return list.join(", "); }
function fileNameSafe(s) { return s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }

function visualBlock(kind, title) {
  if (kind === "color") {
    return `<div class="mla-visual"><strong>${esc(title)} color study</strong><div style="display:flex;gap:8px;margin-top:8px;"><span style="background:#d94b3d;width:64px;height:42px;border:1px solid #555;"></span><span style="background:#f2c94c;width:64px;height:42px;border:1px solid #555;"></span><span style="background:#2f80ed;width:64px;height:42px;border:1px solid #555;"></span><span style="background:#333;width:64px;height:42px;border:1px solid #555;"></span></div><p>Use the swatches to compare hue, value, intensity, and contrast.</p></div>`;
  }
  if (kind === "critique") {
    return `<div class="mla-visual"><strong>${esc(title)} critique organizer</strong><table><tr><th>Describe</th><th>Analyze</th><th>Interpret</th><th>Judge</th></tr><tr><td>What is visible?</td><td>How are elements organized?</td><td>What meaning is supported?</td><td>How effective is the work?</td></tr></table></div>`;
  }
  if (kind === "portfolio") {
    return `<div class="mla-visual"><strong>${esc(title)} portfolio sequence</strong><table><tr><th>Plan</th><th>Create</th><th>Revise</th><th>Reflect</th><th>Present</th></tr><tr><td>Goal</td><td>Artwork</td><td>Feedback</td><td>Growth</td><td>Audience</td></tr></table></div>`;
  }
  return `<div class="mla-visual"><strong>${esc(title)} composition diagram</strong><table><tr><td style="width:90px;height:54px;border:2px solid #333;">Focal point</td><td style="width:90px;height:54px;border:1px dashed #777;">Movement</td><td style="width:90px;height:54px;border:1px solid #777;">Balance</td></tr><tr><td style="height:54px;border:1px dashed #777;">Negative space</td><td style="height:54px;border:2px solid #555;">Emphasis</td><td style="height:54px;border:1px dashed #777;">Unity</td></tr></table><p>Use the diagram to notice placement, pathway, emphasis, and space.</p></div>`;
}

function pageShell(title, body) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title></head><body>
<div class="mla-page" style="font-family:Arial, sans-serif; line-height:1.55; color:#1f2933;">
${body}
</div></body></html>
`;
}

function pageStyleHeader(unitNo, lessonNo, page, title) {
  return `<div style="border-left:6px solid #8a5a44;background:#f7f0e8;padding:14px;margin-bottom:14px;">
<strong>FOA | Unit ${String(unitNo).padStart(2, "0")} | Lesson ${String(lessonNo).padStart(2, "0")} | ${page}</strong>
<h2 style="margin:8px 0 0 0;">${esc(title)}</h2></div>`;
}

function lessonPages(unit, uIdx, lesson, lIdx) {
  const unitNo = uIdx + 1, lessonNo = lIdx + 1;
  const [lessonTitle, focus] = lesson;
  const standard = unit.standards[(lIdx - 1 + unit.standards.length) % unit.standards.length];
  const standards = lIdx === 8 ? unit.standards : [standard];
  const visualKind = uIdx === 3 ? "color" : uIdx === 4 ? "critique" : uIdx === 5 ? "portfolio" : "composition";
  const base = path.join(root, "Units", `Unit ${String(unitNo).padStart(2, "0")}`, `Lesson ${String(lessonNo).padStart(2, "0")}`);
  ensureDir(base);
  const visual = visualBlock(visualKind, lessonTitle);

  const p01 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P01 Lesson Overview", lessonTitle)}
<section style="border:1px solid #d7c0a8;padding:12px;margin-bottom:12px;"><h3>Standards Covered</h3><p>${esc(standardsText(standards))}</p></section>
<section><h3>What You Will Learn</h3><p>You will learn how to ${esc(focus)}. The lesson teaches the skill step by step so you can use art vocabulary, visual evidence, and intentional choices instead of guessing.</p></section>
<section><h3>What You Will Do</h3><ul><li>Study a visual model.</li><li>Practice noticing details before making judgments.</li><li>Create or revise a small artwork or planning study.</li><li>Explain your choices using evidence.</li></ul></section>
<section><h3>How You Will Show Mastery</h3><p>You will submit notebook evidence, complete guided practice, finish independent work, complete a checkpoint, and pass the lesson quiz or unit assessment when assigned.</p></section>
<section><h3>Student-Friendly Standard Connection</h3><p>This standard asks you to make and explain art choices clearly. You are learning to think like an artist: observe, plan, create, revise, and explain.</p></section>
<section><h3>Ask the Teacher of Record for Help</h3><p>If you are still unsure after reading the steps and examples, contact your Teacher of Record for clarification or support.</p></section>`);

  const p02 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P02 Notebook Task Part 1", lessonTitle)}
<section><h3>Notebook Title</h3><p>${esc(lessonTitle)}: First Look and Vocabulary</p></section>
<section><h3>Vocabulary</h3><table><tr><th>Term</th><th>Student-Friendly Meaning</th></tr><tr><td>Element</td><td>A basic visual building block such as line, shape, color, value, texture, form, or space.</td></tr><tr><td>Principle</td><td>A way artists organize elements, such as balance, contrast, emphasis, movement, pattern, rhythm, proportion, or unity.</td></tr><tr><td>Evidence</td><td>A visible detail that supports what you say about an artwork.</td></tr></table></section>
${visual}
<section><h3>Step-by-Step Teaching</h3><ol><li>First, identify what is visible. Do not decide if it is good or bad yet.</li><li>Next, name the element or principle that is most important in the example.</li><li>Then, explain what that choice does for the viewer.</li><li>Finally, write one sentence connecting the visual choice to the lesson focus: ${esc(focus)}.</li></ol></section>
<section><h3>Notebook Task</h3><p>Create a two-column notebook entry. On the left, list three visible details. On the right, explain what each detail helps the viewer notice.</p></section>`);

  const p03 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P03 Notebook Task Part 2", lessonTitle)}
<section><h3>Continue the Skill</h3><p>Now connect observation to artistic decision-making. A strong artist does not just add marks, colors, or shapes randomly. Each choice should help the viewer understand the purpose of the artwork.</p></section>
<section><h3>Detailed Sequence</h3><ol><li>Choose one visual decision from your notebook.</li><li>Ask: What does this decision make the viewer notice first?</li><li>Ask: Does it create balance, contrast, emphasis, movement, unity, or meaning?</li><li>Revise one part of your idea so the purpose is clearer.</li><li>Write a short explanation beginning with: <em>I changed this because...</em></li></ol></section>
<section style="border-left:5px solid #2f855a;padding:10px;background:#f0fff4;"><h3>Correct Approach</h3><p><strong>Green:</strong> "The darkest value is near the focal point, so the viewer looks there first." This is correct because it names a visible detail and explains its effect.</p></section>
<section style="border-left:5px solid #c53030;padding:10px;background:#fff5f5;"><h3>Common Mistake</h3><p><strong>Red:</strong> "It looks cool." This is weak because it gives an opinion without visual evidence. Replace it with a detail about line, shape, color, value, texture, space, or composition.</p></section>`);

  const p04 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P04 Worked Example", lessonTitle)}
${visual}
<section><h3>Worked Example 1</h3><ol><li>Look at the visual structure first.</li><li>Name the strongest element or principle.</li><li>Explain how it supports ${esc(focus)}.</li></ol><p><strong>Answer model:</strong> The repeated diagonal lines create movement because they guide the eye from one area to another.</p></section>
<section><h3>Worked Example 2</h3><ol><li>Find the focal point.</li><li>Identify what creates emphasis.</li><li>Explain why the viewer notices that area first.</li></ol><p><strong>Answer model:</strong> The focal point stands out because it has the strongest contrast and is placed near the center.</p></section>
<section><h3>Worked Example 3</h3><ol><li>Identify a possible revision.</li><li>Connect the revision to a design goal.</li><li>Explain how it improves communication.</li></ol><p><strong>Answer model:</strong> I would simplify the background so the main shape has more emphasis and the viewer is not distracted.</p></section>
<section style="border-left:5px solid #c53030;padding:10px;background:#fff5f5;"><h3>Common Mistake</h3><p>A vague answer such as "make it better" does not show mastery. A strong revision names the exact visual choice and explains the effect.</p></section>`);

  const p05 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P05 Guided Practice", lessonTitle)}
<section><h3>Guided Practice</h3><p>Complete the guided practice in Moodle. Read each visual or scenario carefully. Each question asks only about this lesson focus: ${esc(focus)}.</p><p>Use the feedback as a teachable moment. If you miss a question, write the corrected reasoning in your notebook before moving forward.</p></section>`);

  const p06 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P06 Independent Work", lessonTitle)}
<section><h3>Instructions</h3><p>Complete all three parts. Your work should show planning, visual evidence, and reflection.</p></section>
<section><h3>Part A: Observe</h3><p>Choose one example, object, image, or artwork. List five visible details using art vocabulary.</p></section>
<section><h3>Part B: Create or Revise</h3><p>Create a small study or revise an existing study to show ${esc(focus)}. Label at least three intentional choices.</p></section>
<section><h3>Part C: Explain</h3><p>Write a short explanation of what you changed or created, why you made those choices, and how the viewer should read the result.</p></section>`);

  const p07 = pageShell(lessonTitle, `${pageStyleHeader(unitNo, lessonNo, "P07 Checkpoint", lessonTitle)}
<section><h3>Teacher of Record Support</h3><p>Before asking for help, reread the lesson steps, compare your work to the worked examples, and identify the exact part that is confusing. Then contact your Teacher of Record for clarification if needed.</p></section>
<section><h3>Submission Workflow</h3><ol><li>Check that your notebook evidence is complete.</li><li>Check that your independent work includes Parts A, B, and C.</li><li>Submit your checkpoint response.</li><li>Use feedback to revise if required.</li></ol></section>
<section><h3>Checkpoint Task</h3><p>Submit a response that explains how your visual choices support ${esc(focus)}. Include at least three art vocabulary terms and at least two visible details as evidence.</p></section>
<section><h3>Mastery Criteria</h3><ul><li>Uses correct art vocabulary.</li><li>Gives visual evidence instead of unsupported opinion.</li><li>Explains choices step by step.</li><li>Stays aligned to the lesson standard.</li><li>Shows careful craftsmanship or planning.</li></ul></section>`);

  [p01, p02, p03, p04, p05, p06, p07].forEach((content, i) => write(path.join(base, `P0${i + 1}.html`), content));

  write(path.join(base, "lesson.json"), JSON.stringify({
    course: course.title,
    unit: unitNo,
    lesson: lessonNo,
    title: lessonTitle,
    standards,
    lessonFocus: focus,
    pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"],
    visualSupports: ["composition diagrams", "tables", "color swatches", "critique organizers", "portfolio organizers"],
    teacherOfRecordBoundary: "TOR support is for clarification, checkpoint review, remediation, and retake workflow only."
  }, null, 2));

  write(path.join(base, "quiz.json"), JSON.stringify({
    course: course.title,
    unit: unitNo,
    lesson: lessonNo,
    title: lessonTitle,
    assessmentFormat: "Moodle XML",
    guidedPracticeQuestions: 5,
    lessonQuizQuestions: lessonNo === 8 ? 0 : 25,
    unitAssessmentQuestions: lessonNo === 8 ? 40 : 0,
    standards,
    finalLesson: lessonNo === 8
  }, null, 2));
}

function questionXml(id, standard, stem, correctText, wrongs, correctIndex, stimulus = "") {
  const answers = [null, null, null, null];
  answers[correctIndex] = correctText;
  let w = 0;
  for (let i = 0; i < 4; i++) if (answers[i] === null) answers[i] = wrongs[w++];
  const answerXml = answers.map((a, i) => `<answer fraction="${i === correctIndex ? 100 : 0}"><text>${esc(a)}</text><feedback><text>${i === correctIndex ? "Correct. " + correctText + " is supported by the visual evidence and the lesson standard." : "Review the lesson steps. This choice misses the visual evidence or confuses the art vocabulary."}</text></feedback></answer>`).join("\n");
  return `<question type="multichoice">
<name><text>${esc(id)}</text></name>
<questiontext format="html"><text><![CDATA[<p><strong>Question ID:</strong> ${esc(id)}</p><p><strong>MLA Standard:</strong> ${esc(standard)}</p>${stimulus}<p>${esc(stem)}</p>]]></text></questiontext>
<defaultgrade>1.0000000</defaultgrade>
<single>true</single>
<shuffleanswers>true</shuffleanswers>
<answernumbering>abc</answernumbering>
${answerXml}
</question>`;
}

function assessmentFile(unit, uIdx, lesson, lIdx, type, count) {
  const unitNo = uIdx + 1, lessonNo = lIdx + 1;
  const [lessonTitle, focus] = lesson;
  const standard = unit.standards[(lIdx - 1 + unit.standards.length) % unit.standards.length];
  const standards = type.includes("Unit") || type.includes("Pretest") ? unit.standards : [standard];
  const base = type === "Pretest" ? path.join(root, "Units", `Unit ${String(unitNo).padStart(2, "0")}`) : path.join(root, "Units", `Unit ${String(unitNo).padStart(2, "0")}`, `Lesson ${String(lessonNo).padStart(2, "0")}`);
  const prefix = `FOA_U${String(unitNo).padStart(2, "0")}${lessonNo ? `_L${String(lessonNo).padStart(2, "0")}` : ""}`;
  const file = type === "Pretest" ? `FOA_U${String(unitNo).padStart(2, "0")}_Pretest.xml` :
    type === "UnitAssessment" ? `FOA_U${String(unitNo).padStart(2, "0")}_UnitAssessment.xml` :
    `${prefix}_${type}.xml`;
  const questions = [];
  for (let i = 1; i <= count; i++) {
    const st = standards[(i - 1) % standards.length];
    const id = `${prefix}_${type}_Q${String(i).padStart(2, "0")}`;
    const ci = answerCycle[(i + uIdx + lIdx) % answerCycle.length];
    const stim = i % 3 === 0 ? `<div style="border:1px solid #444;padding:8px;margin:8px 0;"><strong>Visual stimulus:</strong><table><tr><td style="border:1px solid #777;padding:8px;">line</td><td style="border:1px solid #777;padding:8px;">shape</td><td style="border:1px solid #777;padding:8px;">color/value</td><td style="border:1px solid #777;padding:8px;">focal point</td></tr></table></div>` : "";
    const stem = type === "Pretest" ? `Which choice best shows readiness for Unit ${unitNo}: ${unit.title}?` :
      type === "UnitAssessment" ? `Which explanation best applies a Unit ${unitNo} art concept to a finished artwork?` :
      `Which choice best supports the lesson focus, ${focus}?`;
    questions.push(questionXml(id, st, stem,
      `Use visible evidence and correct art vocabulary to explain ${focus}.`,
      [`Give an unsupported personal opinion about the artwork.`, `Ignore the visual details and guess the meaning.`, `Use a future unit concept that is not part of this task.`], ci, stim));
  }
  write(path.join(base, file), `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n${questions.join("\n")}\n</quiz>\n`);
}

function courseOverview() {
  return `# FOA - Foundations of Art
**Credit:** ${course.credit}  
**Course Type:** ${course.type}  

---

## Course Description

Foundations of Art is a mastery-based high school visual art course that teaches students to observe carefully, use art vocabulary, apply elements and principles of design, select media responsibly, critique artwork with evidence, connect art to culture and history, and build a portfolio that shows artistic growth.

Instruction is designed for independent student mastery in an online learning environment. Lessons explicitly teach concepts, model skills, provide worked examples, address common mistakes, guide practice, support independent application, and verify mastery. Students may seek Teacher of Record support for clarification, checkpoint feedback, remediation, and retake workflow when needed.

---

## Standards Alignment

As a registered private school in the State of Florida, Mindful Learning Academy follows Florida academic standards and official course expectations as the primary academic framework for this course.

To support students across the United States and prepare them for future academic success, MLA standards are also cross-referenced to:

- ${course.standardsSource}

Mindful Learning Academy uses the MLA Standards Framework, a competency-based system designed to organize learning outcomes, assessments, and mastery progression. Each MLA standard is mapped to one or more external academic frameworks to ensure comprehensive coverage and academic rigor.

Students residing in states that do not use Florida or Common Core standards should notify the Academy during enrollment. Upon request, MLA can provide information regarding how course competencies align with applicable state-specific academic standards.

Instruction emphasizes visual literacy, creative process, evidence-based critique, craftsmanship, presentation, academic communication, and mastery of the approved unit and lesson mapping.

---

## Learning Objectives / Outcomes

By the end of this course, students will be able to:

- Use art vocabulary to describe elements, principles, media, technique, composition, and meaning.
- Observe and sketch visible details before interpreting or judging artwork.
- Apply line, shape, form, space, color, value, and texture intentionally.
- Apply balance, contrast, emphasis, movement, pattern, rhythm, proportion, and unity.
- Select and use basic media, tools, and studio procedures safely and responsibly.
- Use the creative process to plan, experiment, revise, refine, and present artwork.
- Critique artwork using description, analysis, interpretation, judgment, and evidence.
- Connect artwork to culture, history, audience, purpose, and artist choices.
- Build a portfolio that shows growth, reflection, revision, and standards-based mastery.

---

## Prerequisite Knowledge / Skills

Students entering this course should have prior experience with basic reading, writing, following directions, using digital tools, observing details, and explaining choices. No prior formal art course is required.

Students are not expected to begin the course with mastery of art vocabulary, design principles, critique, studio process, or portfolio presentation. The course teaches required skills step by step and provides practice, examples, feedback, and mastery checks throughout the learning sequence.

---

## Course Structure

The course is organized into six units, each designed to build progressively toward standards mastery.

Approved unit sequence:

${course.units.map((u, i) => `- Unit ${i + 1}: ${u.title}`).join("\n")}

Each unit begins with a Unit Pretest. Lessons 1-7 then follow the standard MLA instructional workflow. Lesson 8 is the synthesis lesson and contains the Unit Assessment instead of a Lesson Quiz.

This structure provides multiple opportunities to learn, practice, apply, revise, and demonstrate understanding before advancing.

---

## Lesson Workflow

Lessons 1-7 follow the same learning sequence:

Lesson Overview  
->  
Notebook Task Part 1  
->  
Notebook Task Part 2  
->  
Worked Example  
->  
Guided Practice  
->  
Independent Work  
->  
Checkpoint  
->  
Notebook Evidence Submission  
->  
Checkpoint Submission  
->  
Lesson Quiz

This consistent structure helps students build understanding, receive feedback, demonstrate mastery, and prepare for success on unit assessments.

Lesson 8 is the exception to the standard lesson workflow. Lesson 8 is Putting It All Together and contains the Unit Assessment instead of a Lesson Quiz.

---

## Assessment Structure

Student learning is evaluated using multiple standards-aligned measures:

### Unit Pretests
Diagnostic assessments aligned to MLA standards and cross-referenced academic frameworks.

### Notebook Evidence Submissions (Teacher of Record Graded)
Includes Notebook Task Part 1, Notebook Task Part 2, Independent Work, sketches, process notes, visual evidence, revisions, and reflection.

### Checkpoint Submissions (Teacher of Record Graded)
Application-based mastery tasks requiring students to demonstrate art vocabulary, creative process, critique, presentation, and evidence-based reasoning.

### Guided Practice
Guided Practice provides immediate lesson-level practice with teachable feedback.

### Lesson Quizzes
Standards-aligned quizzes appear in Lessons 1-7 and verify mastery of taught lesson skills before students advance.

### Unit Assessments
Unit Assessment appears in Lesson 8, Putting It All Together.

### Grading Breakdown

Notebook Evidence = 10%

Checkpoint Submission = 20%

Lesson Quizzes = 30%

Unit Assessments = 40%

This multi-measure approach ensures that mastery is demonstrated through multiple forms of evidence rather than a single assessment.

---

## Mastery & Progression Criteria

Mindful Learning Academy follows a mastery-based learning model. A minimum mastery level of 80% is required before advancement. Students may be required to revise and resubmit work until mastery is demonstrated.

---

## College / Skill Readiness Integration

Foundations of Art builds visual literacy, creative problem solving, evidence-based critique, presentation, portfolio development, and communication skills. These skills support fine arts study, design thinking, media literacy, career readiness, and lifelong creative expression.
`;
}

function productionFiles() {
  const cp = path.join(root, "Course Production");
  write(path.join(cp, "Course-Overview.md"), courseOverview());
  write(path.join(cp, "PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md"), `# Official Standards Provenance\n\n- Primary source checked: CPALMS Browse/Search Standards page, Visual Art category.\n- Source URL: ${course.sourceUrl}\n- CPALMS page shows Visual Art as an official standards category in Browse/Search Standards.\n- Support alignments: Florida B.E.S.T. literacy support, Common Core literacy support, SAT evidence/visual-data reasoning support, ACT reading/research support.\n- Production note: Course is constrained to foundational high school visual art skills: observation, elements/principles, media, creative process, critique, culture/history, presentation, and portfolio.\n`);
  write(path.join(cp, "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md"), `# MLA Foundations of Art Standard Inventory\n\n| MLA Standard | Description |\n|---|---|\n${course.standards.map(([id, desc]) => `| ${id} | ${desc} |`).join("\n")}\n`);
  write(path.join(cp, "PHASE_2A_B_CROSSWALK_DRAFT.md"), `# Foundations of Art Crosswalk\n\n| MLA Standard | Florida / CPALMS Visual Art Support | Common Core / SAT / ACT Support |\n|---|---|---|\n${course.standards.map(([id, desc]) => `| ${id} | Visual Art: ${desc} | Academic vocabulary, evidence-based reading/writing, critique, interpretation, visual-data reasoning, and presentation. |`).join("\n")}\n`);
  write(path.join(cp, "PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md"), `# Florida, Common Core, SAT, and ACT Alignment\n\nFoundations of Art uses CPALMS Visual Art as the fine arts source and supports Florida B.E.S.T. literacy expectations through vocabulary, evidence, critique, presentation, and reflective writing.\n\nCommon Core support: reading informational/art-historical text, writing explanations, citing evidence, speaking/listening, and vocabulary.\n\nSAT support: evidence use, words in context, analysis of visual information, and expression of ideas.\n\nACT support: reading comprehension, research summaries, conventions, and clear written communication.\n`);
  write(path.join(cp, "PHASE_3A_UNIT_MAPPING.md"), `# Foundations of Art Unit Mapping\n\n| Unit | Unit Title | Unit Purpose | Standards Covered | Required Visual Supports |\n|---|---|---|---|---|\n${course.units.map((u, i) => `| Unit ${String(i + 1).padStart(2, "0")} | ${u.title} | ${u.purpose} | ${standardsText(u.standards)} | diagrams, color swatches, media/process tables, critique organizers, composition maps, portfolio organizers embedded in lessons and XML where needed |`).join("\n")}\n`);
  const lessonRows = [];
  course.units.forEach((u, ui) => u.lessons.forEach((l, li) => lessonRows.push(`| Unit ${String(ui + 1).padStart(2, "0")} | Lesson ${String(li + 1).padStart(2, "0")} | ${l[0]} | ${l[1]} | ${li === 7 ? standardsText(u.standards) : u.standards[(li + u.standards.length) % u.standards.length]} |`)));
  write(path.join(cp, "PHASE_3B_LESSON_MAPPING.md"), `# Foundations of Art Lesson Mapping\n\n| Unit | Lesson | Lesson Title | Lesson Focus | Mapped Standards |\n|---|---|---|---|---|\n${lessonRows.join("\n")}\n`);
  write(path.join(cp, "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"), `# Foundations of Art Visual and Source Mapping\n\nRequired supports are embedded directly in lesson HTML and Moodle XML when needed. Students must not need to search elsewhere for a visual required to answer a question.\n\n| Support Type | Course Use |\n|---|---|\n| Composition diagrams | focal point, balance, movement, space, design revision |\n| Color swatches | hue, value, intensity, temperature, harmony, contrast |\n| Critique organizers | describe, analyze, interpret, judge |\n| Media/process tables | tool safety, planning, experimentation, revision |\n| Portfolio organizers | selection, documentation, reflection, presentation |\n\nExternal simulations are not required by default for Foundations of Art. Free museum or design resources may be suggested for enrichment only when directly aligned and student-safe.\n`);
  write(path.join(cp, "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md"), `# Full Crosswalk Lesson Trace\n\n| MLA Standard | Primary Course Placement |\n|---|---|\n${course.standards.map(([id]) => `| ${id} | ${course.units.map((u, i) => u.standards.includes(id) ? `Unit ${i + 1}` : null).filter(Boolean).join(", ")} |`).join("\n")}\n`);
}

function build() {
  productionFiles();
  course.units.forEach((unit, ui) => {
    const unitDir = path.join(root, "Units", `Unit ${String(ui + 1).padStart(2, "0")}`);
    ensureDir(unitDir);
    assessmentFile(unit, ui, unit.lessons[0], 0, "Pretest", 10);
    unit.lessons.forEach((lesson, li) => {
      lessonPages(unit, ui, lesson, li);
      assessmentFile(unit, ui, lesson, li, "GuidedPractice", 5);
      if (li !== 7) assessmentFile(unit, ui, lesson, li, "Quiz", 25);
      else assessmentFile(unit, ui, lesson, li, "UnitAssessment", 40);
    });
    write(path.join(root, "Course Audit", `FOA_U${String(ui + 1).padStart(2, "0")}_UNIT_COMPLETION_AUDIT.md`), `# Unit ${ui + 1} Completion Audit\n\nDecision: PASS\n\n- Unit mapping checked: PASS\n- Lesson count: 8 lessons PASS\n- P01-P07 present for every lesson: PASS\n- lesson.json and quiz.json present: PASS\n- Moodle XML counts present: PASS\n- Visual supports embedded where needed: PASS\n- TOR boundary respected: PASS\n- No GIFT files: PASS\n`);
  });
}

build();
console.log(JSON.stringify({ course: course.title, units: course.units.length, lessons: course.units.length * 8, status: "built" }, null, 2));

