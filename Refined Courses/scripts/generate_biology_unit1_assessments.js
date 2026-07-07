const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 01");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "What Counts as Biology Evidence?",
    standards: ["MLA.BIO.SCI.01", "MLA.BIO.SCI.03"],
    skill: "biology evidence, testable questions, observations, inferences, claims, and CER reasoning",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Plant Group</th><th>Daily Light</th><th>Average Height After 10 Days</th></tr><tr><td>A</td><td>8 hours</td><td>14 cm</td></tr><tr><td>B</td><td>2 hours</td><td>6 cm</td></tr></table>`,
        stem: "Which statement is the strongest evidence that light amount is related to plant growth in this data set?",
        correct: "Group A received more light and had a greater average height than Group B.",
        distractors: ["Plants are alive, so light must always make them grow.", "Group B had a smaller letter name than Group A.", "The table proves that light is the only factor that can ever affect plants."],
        feedback: "The correct answer uses measured evidence from both groups and connects it directly to the claim about light and growth."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Statement</th><th>Source</th></tr><tr><td>The sample contained tiny green cells.</td><td>Microscope observation</td></tr><tr><td>The cells are probably algae.</td><td>Student explanation</td></tr></table>`,
        stem: "Which statement is an observation rather than an inference?",
        correct: "The sample contained tiny green cells.",
        distractors: ["The cells are probably algae.", "The pond must be unhealthy.", "The student should already know the answer."],
        feedback: "An observation is what is directly noticed or measured. Calling the cells algae is an interpretation based on the observation."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>CER Organizer</strong><br>Claim: answer to the question<br>Evidence: data or observation<br>Reasoning: science idea that connects the evidence to the claim</div>`,
        stem: "In a CER response, which part should include the measured data or direct observation?",
        correct: "Evidence",
        distractors: ["Claim", "Reasoning", "Question ID"],
        feedback: "Evidence is the data, observation, source detail, or model feature that supports the claim."
      },
      {
        html: `<p><strong>Question:</strong> Do mealworms move faster at room temperature or in a cooler environment?</p>`,
        stem: "Why is this a scientific question?",
        correct: "It can be answered by measuring movement speed under two temperature conditions.",
        distractors: ["It asks what mealworms prefer emotionally.", "It cannot use evidence.", "It already tells the correct answer."],
        feedback: "A scientific question is testable when variables can be compared and evidence can be collected."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Cup</th><th>Daily Light</th><th>Average Height</th></tr><tr><td>A</td><td>8 hours</td><td>14 cm</td></tr><tr><td>B</td><td>2 hours</td><td>6 cm</td></tr></table>`,
        stem: "Which reasoning best connects the evidence to the claim that more light increased growth?",
        correct: "Plants use light during photosynthesis, so different light exposure can affect growth when other conditions are controlled.",
        distractors: ["The taller plant is better because taller things are always healthier.", "The data do not matter because all plants need the same amount of light.", "The claim is true because it sounds scientific."],
        feedback: "Reasoning explains the biology idea that makes the evidence support the claim."
      }
    ]
  },
  "02": {
    title: "Questions, Variables, and Investigation Design",
    standards: ["MLA.BIO.SCI.01", "MLA.BIO.LAB.01"],
    skill: "testable questions, independent variables, dependent variables, controls, and safe investigation plans",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Plan Part</th><th>Investigation Detail</th></tr><tr><td>Question</td><td>How does light color affect algae cell density?</td></tr><tr><td>Measured outcome</td><td>Algae cell density after 5 days</td></tr></table>`,
        stem: "What is the dependent variable in this investigation plan?",
        correct: "Algae cell density after 5 days",
        distractors: ["Light color", "The name algae", "The number of days written in the title only"],
        feedback: "The dependent variable is the outcome that is measured."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Changed on Purpose?</th></tr><tr><td>Light color</td><td>Yes</td></tr><tr><td>Container size</td><td>No, kept the same</td></tr><tr><td>Temperature</td><td>No, kept the same</td></tr></table>`,
        stem: "What is the independent variable?",
        correct: "Light color",
        distractors: ["Container size", "Temperature", "Algae cell density"],
        feedback: "The independent variable is changed on purpose so its effect can be tested."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Flowchart:</strong> Testable question -> Variables -> Controls -> Data table -> CER conclusion</div>`,
        stem: "Which step should come immediately after identifying a testable question?",
        correct: "Identify the variables and controls.",
        distractors: ["Write the conclusion before collecting evidence.", "Change several conditions at the same time.", "Ignore the measured outcome."],
        feedback: "Variables and controls make the investigation fair and measurable."
      },
      {
        html: `<p><strong>Original question:</strong> Do seeds like water?</p>`,
        stem: "Which revision makes the question testable?",
        correct: "How does the amount of water affect the percent of bean seeds that germinate after 7 days?",
        distractors: ["Why is water the best thing?", "Are seeds happy with water?", "Do students like watering seeds?"],
        feedback: "The revised question names a changed factor, a measured outcome, and a time frame."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Control</th><th>Reason</th></tr><tr><td>Same starting algae amount</td><td>?</td></tr></table>`,
        stem: "Why should the starting algae amount be kept the same?",
        correct: "So differences in final cell density are more likely related to the tested condition.",
        distractors: ["So the investigation has no dependent variable.", "So the data table is not needed.", "So the answer is known before the investigation."],
        feedback: "Controls reduce unfair differences between groups."
      }
    ]
  },
  "03": {
    title: "Lab Safety, Measurement, and Data Quality",
    standards: ["MLA.BIO.LAB.01", "MLA.BIO.LAB.03"],
    skill: "lab safety, measurement precision, data organization, outliers, and data quality",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Safety Situation</th><th>Correct Response</th></tr><tr><td>Unknown liquid in an unlabeled container</td><td>Do not use it; report it through the approved workflow</td></tr></table>`,
        stem: "Why is the correct response to avoid using the unlabeled liquid?",
        correct: "The contents and risks are unknown, so using it would be unsafe.",
        distractors: ["Unlabeled liquids are always pure water.", "Safety rules apply only after data are collected.", "Using unknown materials improves accuracy."],
        feedback: "Safety comes before data collection. Unknown materials cannot be treated as safe."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Trial</th><th>Leaf Length</th></tr><tr><td>1</td><td>4.8 cm</td></tr><tr><td>2</td><td>4.9 cm</td></tr><tr><td>3</td><td>12.0 cm</td></tr><tr><td>4</td><td>5.0 cm</td></tr></table>`,
        stem: "Which value should be checked as a possible outlier or measurement error?",
        correct: "12.0 cm",
        distractors: ["4.8 cm", "4.9 cm", "5.0 cm"],
        feedback: "The 12.0 cm value is far from the other measurements and should be investigated before drawing a conclusion."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Tool</th><th>Best Use</th></tr><tr><td>Graduated cylinder</td><td>Volume</td></tr><tr><td>Metric ruler</td><td>Length</td></tr></table>`,
        stem: "Which tool is best for measuring the length of a seedling?",
        correct: "Metric ruler",
        distractors: ["Graduated cylinder", "Stopwatch", "Safety goggles"],
        feedback: "A metric ruler measures length in units such as centimeters or millimeters."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;">Data quality check: same tool, same unit, repeated trials, clear labels.</div>`,
        stem: "Which action best improves data quality?",
        correct: "Use the same measurement method for every trial.",
        distractors: ["Change tools randomly between trials.", "Record numbers without units.", "Remove data that disagree without checking why."],
        feedback: "Consistent methods make data easier to compare and reduce avoidable error."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Day</th><th>Plant Height</th></tr><tr><td>1</td><td>3 cm</td></tr><tr><td>2</td><td>4 cm</td></tr><tr><td>3</td><td>5 cm</td></tr></table>`,
        stem: "What makes this table usable for scientific analysis?",
        correct: "It includes labeled variables and units.",
        distractors: ["It hides the units.", "It uses only opinions.", "It changes the measured variable each row."],
        feedback: "Clear labels and units help a student interpret what was measured."
      }
    ]
  },
  "04": {
    title: "Tools, Microscopes, Models, and Observations",
    standards: ["MLA.BIO.LAB.02"],
    skill: "microscope parts, magnification, biological models, and tool-based observations",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Microscope Part</th><th>Function</th></tr><tr><td>Objective lens</td><td>Magnifies the specimen</td></tr><tr><td>Stage</td><td>Supports the slide</td></tr><tr><td>Coarse focus</td><td>Moves the stage quickly for rough focus</td></tr></table>`,
        stem: "Which part directly magnifies the specimen?",
        correct: "Objective lens",
        distractors: ["Stage", "Coarse focus", "Base"],
        feedback: "The objective lens is one of the lenses that magnifies the specimen."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Eyepiece</th><th>Objective</th><th>Total Magnification</th></tr><tr><td>10x</td><td>40x</td><td>?</td></tr></table>`,
        stem: "What is the total magnification?",
        correct: "400x",
        distractors: ["50x", "40x", "10x"],
        feedback: "Total magnification equals eyepiece magnification times objective magnification: 10x times 40x = 400x."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Sample micrograph description:</strong> The image shows repeated box-like structures with clear boundaries.</div>`,
        stem: "Which observation is best supported by the micrograph description?",
        correct: "The sample contains many cell-like structures.",
        distractors: ["The sample definitely contains every organelle.", "The organism's full life cycle is shown.", "The sample is not biological."],
        feedback: "The description supports the presence of cell-like structures, but it does not prove details that are not visible."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Representation</th><th>Purpose</th></tr><tr><td>Cell diagram</td><td>Shows important structures clearly</td></tr><tr><td>Actual microscope image</td><td>Shows observed evidence</td></tr></table>`,
        stem: "Why is a diagram considered a model?",
        correct: "It represents important features so they can be studied more clearly.",
        distractors: ["It is always more accurate than real evidence.", "It replaces the need for observations.", "It contains no scientific information."],
        feedback: "Models simplify or represent real systems to support understanding."
      },
      {
        html: `<p><strong>Observation:</strong> A slide is blurry at high power.</p>`,
        stem: "What is the safest first step for improving focus?",
        correct: "Use careful fine focus while viewing the slide.",
        distractors: ["Force the objective lens into the slide.", "Remove the slide and guess what it shows.", "Use unapproved liquid on the lens."],
        feedback: "Fine focus is used for small adjustments, especially at higher magnification."
      }
    ]
  },
  "05": {
    title: "Claims, Sources, and Scientific Argument",
    standards: ["MLA.BIO.SCI.02"],
    skill: "source reliability, competing explanations, evidence evaluation, and CER argument",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Source</th><th>Evidence Provided</th><th>Possible Concern</th></tr><tr><td>Company blog</td><td>No data</td><td>Sells the product</td></tr><tr><td>Public data report</td><td>Measured growth table</td><td>Method should be reviewed</td></tr></table>`,
        stem: "Which source is stronger for evaluating a plant-growth claim?",
        correct: "The public data report, because it includes measured evidence.",
        distractors: ["The company blog, because it sounds confident.", "The company blog, because no data means no errors.", "Both sources are equally strong even though only one has data."],
        feedback: "A stronger science source provides relevant evidence that can be checked."
      },
      {
        html: `<p><strong>Claim:</strong> Extra nitrate caused algae coverage to increase.</p><table border="1" cellpadding="6"><tr><th>Week</th><th>Nitrate</th><th>Algae Coverage</th></tr><tr><td>1</td><td>2 mg/L</td><td>10%</td></tr><tr><td>2</td><td>12 mg/L</td><td>45%</td></tr></table>`,
        stem: "Which evidence best supports the claim?",
        correct: "Nitrate increased from 2 mg/L to 12 mg/L while algae coverage increased from 10% to 45%.",
        distractors: ["The table has two rows.", "Algae are green.", "The claim uses the word nitrate."],
        feedback: "The correct evidence uses the measured pattern in both nitrate and algae coverage."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Reliability Checklist:</strong> author/source, purpose, evidence, method, agreement with other evidence.</div>`,
        stem: "Which checklist item asks whether the source is trying to sell, persuade, inform, or report evidence?",
        correct: "Purpose",
        distractors: ["Font size", "Answer order", "Question number"],
        feedback: "Purpose helps identify possible bias or limits in how a source presents claims."
      },
      {
        html: `<p><strong>Two explanations:</strong> A. Nutrient runoff increased algae. B. The pond changed because someone said it looked different.</p>`,
        stem: "Which explanation is better supported if measured nitrate and algae data increased after rain?",
        correct: "Explanation A, because it connects to measured nutrient and algae data.",
        distractors: ["Explanation B, because opinions are always stronger.", "Explanation B, because it avoids numbers.", "Neither explanation can ever use data."],
        feedback: "Scientific explanations should match the evidence available."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;">Claim -> Evidence -> Reasoning</div>`,
        stem: "What should reasoning do in a scientific argument?",
        correct: "Explain the science idea that connects the evidence to the claim.",
        distractors: ["Repeat the claim with no evidence.", "List random facts from another unit.", "Choose the source that agrees with a first opinion."],
        feedback: "Reasoning is the scientific explanation that makes the evidence meaningful."
      }
    ]
  },
  "06": {
    title: "Cell Theory and the Process of Science",
    standards: ["MLA.BIO.CEL.01", "MLA.BIO.SCI.03"],
    skill: "cell theory, scientific theories, models, evidence, and historical development of biology ideas",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Observation</th></tr><tr><td>Microscope image of leaf</td><td>Many small compartments are visible</td></tr></table>`,
        stem: "Which part of cell theory does this evidence support?",
        correct: "Living things are made of cells.",
        distractors: ["All cells are larger than leaves.", "Cells never come from other cells.", "Microscopes create cells."],
        feedback: "A leaf is part of a living thing, and the microscope evidence shows cell-like structures."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Observation</th></tr><tr><td>Cell division observed</td><td>One cell split into two cells</td></tr></table>`,
        stem: "Which cell theory statement is best supported?",
        correct: "Cells come from existing cells.",
        distractors: ["Cells come from nonliving dust.", "Cells do not reproduce.", "Only plants have cells."],
        feedback: "Observing one cell divide into two cells supports the idea that cells come from existing cells."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;">A labeled drawing of a plant cell shows a cell wall, nucleus, and chloroplasts.</div>`,
        stem: "Why is this drawing a model?",
        correct: "It represents cell structures so they can be studied.",
        distractors: ["It is a broad scientific theory by itself.", "It proves every detail of all cells.", "It cannot be used in biology."],
        feedback: "A model represents important features of a system; a theory explains a broad pattern supported by evidence."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Term</th><th>Meaning</th></tr><tr><td>Scientific theory</td><td>Broad explanation supported by many lines of evidence</td></tr></table>`,
        stem: "Which statement best describes a scientific theory?",
        correct: "It is a well-supported explanation, not a random guess.",
        distractors: ["It is always unsupported.", "It is a personal preference.", "It is a single measurement with no explanation."],
        feedback: "Scientific theories are supported by repeated evidence and explain broad patterns."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Timeline Evidence</th><th>Contribution</th></tr><tr><td>Improved microscopes</td><td>Cells became visible</td></tr><tr><td>Repeated observations</td><td>Cell patterns were confirmed</td></tr></table>`,
        stem: "Why did improved tools matter for cell theory?",
        correct: "They allowed scientists to gather better evidence about cells.",
        distractors: ["They removed the need for evidence.", "They made cells appear for the first time.", "They proved biology without observations."],
        feedback: "Better tools can make evidence visible and improve scientific explanations."
      }
    ]
  },
  "07": {
    title: "Molecules and Water as Foundations for Life",
    standards: ["MLA.BIO.ENE.01"],
    skill: "macromolecules, structure-function relationships, water polarity, hydrogen bonding, and life processes",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Macromolecule</th><th>Common Function</th></tr><tr><td>Carbohydrates</td><td>Quick energy</td></tr><tr><td>Lipids</td><td>Long-term energy and membranes</td></tr><tr><td>Proteins</td><td>Cell work and enzymes</td></tr><tr><td>Nucleic acids</td><td>Genetic information</td></tr></table>`,
        stem: "A molecule acts as an enzyme. Which macromolecule group does it most likely belong to?",
        correct: "Proteins",
        distractors: ["Carbohydrates", "Lipids", "Nucleic acids"],
        feedback: "Many enzymes are proteins that do chemical work in cells."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Water Model:</strong> oxygen side slightly negative; hydrogen sides slightly positive.</div>`,
        stem: "What property is shown by the uneven charge distribution in water?",
        correct: "Polarity",
        distractors: ["Genetic coding", "Cell division", "Protein folding only"],
        feedback: "Water is polar because its charges are unevenly distributed."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Building Block</th><th>Macromolecule</th></tr><tr><td>Nucleotide</td><td>Nucleic acid</td></tr><tr><td>Amino acid</td><td>Protein</td></tr></table>`,
        stem: "A molecule stores genetic instructions using nucleotide building blocks. What is it?",
        correct: "A nucleic acid",
        distractors: ["A lipid", "A carbohydrate", "A water molecule"],
        feedback: "Nucleic acids are built from nucleotides and store genetic information."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;">Hydrogen bonding helps water molecules attract each other.</div>`,
        stem: "Why is hydrogen bonding important for water in living systems?",
        correct: "It helps explain water properties that support life processes.",
        distractors: ["It means water stores genetic information.", "It makes water a protein.", "It prevents water from dissolving materials."],
        feedback: "Hydrogen bonding contributes to water's special properties, including cohesion and interactions with other polar substances."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Observation</th><th>Biology Connection</th></tr><tr><td>Charged substance dissolves in water</td><td>Water can transport dissolved materials</td></tr></table>`,
        stem: "Which water property best explains the observation?",
        correct: "Water's polarity",
        distractors: ["The presence of DNA in all water", "Water being a lipid", "Water having no charge differences"],
        feedback: "Polarity helps water interact with many charged or polar substances."
      }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.SCI.01", "MLA.BIO.SCI.02", "MLA.BIO.SCI.03", "MLA.BIO.LAB.01", "MLA.BIO.LAB.02", "MLA.BIO.LAB.03", "MLA.BIO.CEL.01", "MLA.BIO.ENE.01"],
    skill: "Unit 1 synthesis across inquiry, safety, tools, evidence, cell theory, molecules, water, and CER reasoning",
    stimuli: [
      {
        html: `<table border="1" cellpadding="6"><tr><th>Data Point</th><th>Before Rain</th><th>After Rain</th></tr><tr><td>Nitrate</td><td>2 mg/L</td><td>12 mg/L</td></tr><tr><td>Algae coverage</td><td>10%</td><td>45%</td></tr></table>`,
        stem: "Which claim is best supported by the data?",
        correct: "Nutrient runoff may have affected the pond sample because nitrate and algae coverage both increased after rain.",
        distractors: ["Temperature caused all changes even though no temperature data are shown.", "The pond did not change at all.", "The table proves every possible pond cause."],
        feedback: "The correct claim uses the measured nitrate and algae pattern without overstating the evidence."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Unit 1 Skill</th><th>Evidence</th></tr><tr><td>Tools</td><td>Microscope image shows many small cells</td></tr><tr><td>Molecules/water</td><td>Dissolved nitrate is present in water</td></tr></table>`,
        stem: "Which synthesis explanation best connects the two evidence pieces?",
        correct: "The microscope evidence supports that algae are cellular, and dissolved materials in water can affect living cells.",
        distractors: ["The microscope evidence means nitrate cannot matter.", "Water has no role in living systems.", "Cells are not part of biology evidence."],
        feedback: "Synthesis connects tool evidence, cell theory, and molecule/water concepts."
      },
      {
        html: `<div style="border:1px solid #94a3b8;padding:8px;">Checkpoint requirement: question, variables, control, two data points, tool/cell connection, molecule/water connection, CER conclusion.</div>`,
        stem: "Which response element is missing if a student gives only a claim and no data?",
        correct: "Evidence",
        distractors: ["The title only", "A decorative image", "Answer numbering"],
        feedback: "A CER response needs evidence, not just a claim."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Purpose</th></tr><tr><td>Same pond location</td><td>Control</td></tr><tr><td>Before vs. after rain</td><td>Compared condition</td></tr></table>`,
        stem: "Why is using the same pond location important?",
        correct: "It makes the comparison fairer by controlling location.",
        distractors: ["It removes the need to record data.", "It changes every variable at once.", "It proves the conclusion before testing."],
        feedback: "Controls help isolate the condition being compared."
      },
      {
        html: `<table border="1" cellpadding="6"><tr><th>Source</th><th>Evidence</th></tr><tr><td>Opinion post</td><td>The pond looks bad</td></tr><tr><td>Measured report</td><td>Nitrate and algae coverage values</td></tr></table>`,
        stem: "Which source is more useful for the Unit 1 synthesis claim?",
        correct: "The measured report because it provides data that can support or challenge the claim.",
        distractors: ["The opinion post because it is shorter.", "The opinion post because it has no numbers to check.", "Neither source can ever be evaluated."],
        feedback: "Source reliability depends on relevant evidence and how well it supports the claim."
      }
    ]
  }
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cdata(s) {
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function questionXml(q) {
  return `  <question type="multichoice">
    <name><text>${esc(q.id)}</text></name>
    <questiontext format="html"><text>${cdata(q.text)}</text></questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
${q.answers.map((a) => `    <answer fraction="${a.correct ? 100 : 0}" format="html">
      <text>${cdata(a.text)}</text>
      <feedback format="html"><text>${cdata(a.feedback)}</text></feedback>
    </answer>`).join("\n")}
  </question>`;
}

function bankXml(category, questions) {
  return `<?xml version="1.0" encoding="utf-8"?>
<quiz>
  <question type="category">
    <category><text>$course$/${esc(category)}</text></category>
  </question>
${questions.map(questionXml).join("\n")}
</quiz>
`;
}

function makeQuestion(id, lesson, base, variant, correctIndex) {
  const standard = lesson.standards[variant % lesson.standards.length];
  const focus = [
    "Use the stimulus exactly as written.",
    "Focus on the evidence that is measured or directly observed.",
    "Focus on the lesson vocabulary before selecting an answer.",
    "Focus on the claim and do not overstate what the evidence proves.",
    "Focus on how the data, model, or source supports the reasoning."
  ][variant % 5];
  const promptLead = variant === 0 ? base.stem : `${base.stem} ${focus}`;
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${promptLead}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the mapped evidence.", "This overstates the claim.", "This confuses the lesson vocabulary."][i % 3]})`,
    feedback: `${["This choice does not use the stimulus evidence.", "This choice goes beyond what the data or model can support.", "This choice confuses a key Unit 1 term."][i % 3]} Recheck the question, identify the mapped lesson skill, and connect the answer to the included stimulus.`
  }));
  const correct = {
    text: variant === 0 ? base.correct : `${base.correct}`,
    feedback: `${base.feedback} This matches the mapped lesson content and uses the stimulus provided in the question.`
  };
  const answers = [];
  let w = 0;
  for (let i = 0; i < 4; i++) {
    answers.push(i === correctIndex ? { ...correct, correct: true } : { ...wrongs[w++], correct: false });
  }
  return { id, text, answers };
}

function buildBank(prefix, lessonNo, type, count) {
  const lesson = lessons[lessonNo];
  const qs = [];
  for (let i = 0; i < count; i++) {
    const base = lesson.stimuli[i % lesson.stimuli.length];
    const id = `${prefix}_U01_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / lesson.stimuli.length), correctPattern[i % correctPattern.length]));
  }
  return qs;
}

function buildUnitBank(prefix, type, count) {
  const qs = [];
  for (let i = 0; i < count; i++) {
    const lessonNo = String((i % 8) + 1).padStart(2, "0");
    const lesson = lessons[lessonNo];
    const base = lesson.stimuli[Math.floor(i / 8) % lesson.stimuli.length];
    const id = `${prefix}_U01_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}

function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(
  path.join(unitRoot, "Moodle XML", "BIO_U01_Pretest_MoodleXML.xml"),
  "BIOLOGY/Units/Unit 01/Pretest",
  buildUnitBank(coursePrefix, "PT", 10)
);

for (const lessonNo of Object.keys(lessons)) {
  writeXml(
    path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U01_L${lessonNo}_GuidedPractice_MoodleXML.xml`),
    `BIOLOGY/Units/Unit 01/Lesson ${lessonNo}/GuidedPractice`,
    buildBank(coursePrefix, lessonNo, "GP", 5)
  );
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(
    path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U01_L${lessonNo}_Quiz_MoodleXML.xml`),
    `BIOLOGY/Units/Unit 01/Lesson ${lessonNo}/Quiz`,
    buildBank(coursePrefix, lessonNo, "QZ", 25)
  );
}

writeXml(
  path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U01_UnitAssessment_MoodleXML.xml"),
  "BIOLOGY/Units/Unit 01/UnitAssessment",
  buildUnitBank(coursePrefix, "UA", 40)
);

console.log("Generated Biology Unit 1 Moodle XML assessments.");
