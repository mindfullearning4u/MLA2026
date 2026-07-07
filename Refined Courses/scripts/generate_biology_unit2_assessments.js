const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 02");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "Comparing Cell Types",
    standards: ["MLA.BIO.CEL.02"],
    skill: "comparing prokaryotic, eukaryotic, plant, and animal cells using structural evidence",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Cell</th><th>Nucleus</th><th>Cell Wall</th><th>Chloroplasts</th></tr><tr><td>A</td><td>No</td><td>Yes</td><td>No</td></tr><tr><td>B</td><td>Yes</td><td>Yes</td><td>Yes</td></tr><tr><td>C</td><td>Yes</td><td>No</td><td>No</td></tr></table>`, stem: "Which cell is most likely a plant cell?", correct: "Cell B, because it has a nucleus, cell wall, and chloroplasts.", distractors: ["Cell A, because any cell wall means plant cell.", "Cell C, because animal cells always have chloroplasts.", "All three cells are plant cells because all cells are living."], feedback: "Plant cells are eukaryotic and usually show a cell wall and chloroplasts in this lesson model." },
      { html: `<table border="1" cellpadding="6"><tr><th>Feature</th><th>Cell X</th></tr><tr><td>Nucleus</td><td>Absent</td></tr><tr><td>DNA location</td><td>Cytoplasm region</td></tr><tr><td>Size</td><td>Very small</td></tr></table>`, stem: "What classification is best supported for Cell X?", correct: "Prokaryotic cell", distractors: ["Plant eukaryotic cell", "Animal eukaryotic cell", "A complete tissue"], feedback: "The absence of a nucleus is the key evidence for a prokaryotic cell." },
      { html: `<table border="1" cellpadding="6"><tr><th>Shared Feature</th><th>Plant Cell</th><th>Animal Cell</th></tr><tr><td>Nucleus</td><td>Yes</td><td>Yes</td></tr><tr><td>Mitochondria</td><td>Yes</td><td>Yes</td></tr></table>`, stem: "What does this table show about plant and animal cells?", correct: "Both are eukaryotic cells with some shared structures.", distractors: ["Only plant cells have nuclei.", "Animal cells are prokaryotic.", "Shared structures mean both cells perform identical jobs."], feedback: "Plant and animal cells are both eukaryotic, even though they also have differences." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Diagram clue:</strong> A labeled cell has a flexible cell membrane, nucleus, and mitochondria, but no cell wall or chloroplasts.</div>`, stem: "Which cell type is best supported by the diagram clue?", correct: "Animal cell", distractors: ["Plant cell", "Prokaryotic cell", "Bacterial cell with chloroplasts"], feedback: "A nucleus makes it eukaryotic, and the absence of cell wall and chloroplasts supports animal cell." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Strength</th></tr><tr><td>Labeled chloroplasts</td><td>Strong</td></tr><tr><td>Box-like shape</td><td>Weak alone</td></tr></table>`, stem: "Why is labeled chloroplast evidence stronger than shape alone?", correct: "A labeled chloroplast is a specific plant-cell structure, while shape can be misleading.", distractors: ["Shape is always the only evidence needed.", "Chloroplasts are found in animal cells.", "Labels should be ignored in diagrams."], feedback: "Specific labeled structures are stronger evidence than appearance alone." }
    ]
  },
  "02": {
    title: "Organelles and Structure-Function Relationships",
    standards: ["MLA.BIO.CEL.02"],
    skill: "matching organelle structures to biological functions",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Organelle</th><th>Function</th></tr><tr><td>Nucleus</td><td>Stores DNA</td></tr><tr><td>Ribosome</td><td>Builds proteins</td></tr><tr><td>Mitochondrion</td><td>Releases usable energy</td></tr></table>`, stem: "Which organelle is most directly involved in building proteins?", correct: "Ribosome", distractors: ["Nucleus", "Mitochondrion", "Cell wall"], feedback: "Ribosomes assemble proteins, so they match the protein-building function." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Structure clue:</strong> An organelle has folded inner membranes and is associated with usable energy release.</div>`, stem: "Which organelle is described?", correct: "Mitochondrion", distractors: ["Ribosome", "Cell wall", "Central vacuole"], feedback: "Folded inner membranes and energy release point to mitochondria." },
      { html: `<table border="1" cellpadding="6"><tr><th>Cell Task</th><th>Needed Organelle</th></tr><tr><td>Store genetic instructions</td><td>?</td></tr></table>`, stem: "Which organelle completes the table?", correct: "Nucleus", distractors: ["Chloroplast", "Ribosome", "Cell membrane only"], feedback: "The nucleus stores most of the cell's genetic instructions." },
      { html: `<table border="1" cellpadding="6"><tr><th>Organelle</th><th>Structure Clue</th><th>Function</th></tr><tr><td>Chloroplast</td><td>Green pigment and internal membranes</td><td>?</td></tr></table>`, stem: "Which function belongs in the table?", correct: "Captures light energy for photosynthesis", distractors: ["Pumps blood through the body", "Stores all DNA in animal cells", "Destroys the cell membrane"], feedback: "Chloroplast structure supports photosynthesis in plant cells." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Structure-function reasoning: part shape or organization -> job it performs.</div>`, stem: "What makes an answer a structure-function explanation?", correct: "It names a structure and explains how that structure supports a job.", distractors: ["It lists organelles with no functions.", "It guesses based only on size.", "It avoids using evidence from the diagram."], feedback: "Structure-function answers connect the part to the work it performs." }
    ]
  },
  "03": {
    title: "Cell Membranes and Selective Transport",
    standards: ["MLA.BIO.CEL.03"],
    skill: "explaining selective permeability, diffusion, osmosis, active transport, and gradients",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Side</th><th>Oxygen Concentration</th></tr><tr><td>Outside cell</td><td>High</td></tr><tr><td>Inside cell</td><td>Low</td></tr></table>`, stem: "Oxygen moves into the cell. What process is shown?", correct: "Diffusion", distractors: ["Active transport", "Cell division", "Protein synthesis"], feedback: "Oxygen moves from high to low concentration, which is diffusion." },
      { html: `<table border="1" cellpadding="6"><tr><th>Material Moving</th><th>Across Membrane?</th><th>Direction</th></tr><tr><td>Water</td><td>Yes</td><td>Toward higher solute concentration</td></tr></table>`, stem: "Which process is described?", correct: "Osmosis", distractors: ["Mitosis", "Translation", "Source evaluation"], feedback: "Osmosis is water movement across a membrane." },
      { html: `<table border="1" cellpadding="6"><tr><th>Ion Movement</th><th>Energy Used?</th><th>Direction</th></tr><tr><td>Low concentration to high concentration</td><td>Yes</td><td>Against gradient</td></tr></table>`, stem: "What type of transport is shown?", correct: "Active transport", distractors: ["Simple diffusion", "Osmosis only", "No transport"], feedback: "Moving against a gradient requires energy, so this is active transport." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Membrane model: small nonpolar molecules cross easily; many large or charged particles need help.</div>`, stem: "What does selective permeability mean?", correct: "The membrane allows some substances to cross more easily than others.", distractors: ["The membrane blocks every substance.", "The membrane lets everything cross equally.", "The membrane is not involved in transport."], feedback: "Selective permeability means movement is controlled, not completely open or completely blocked." },
      { html: `<table border="1" cellpadding="6"><tr><th>Transport</th><th>Energy?</th><th>Gradient Direction</th></tr><tr><td>Passive</td><td>No</td><td>High to low</td></tr><tr><td>Active</td><td>Yes</td><td>Low to high</td></tr></table>`, stem: "Which statement correctly compares passive and active transport?", correct: "Passive transport follows the gradient; active transport can move against it using energy.", distractors: ["Both always require energy.", "Passive transport moves low to high using ATP.", "Active transport never involves membranes."], feedback: "Energy use and gradient direction separate passive from active transport." }
    ]
  },
  "04": {
    title: "Homeostasis in Cells and Organisms",
    standards: ["MLA.BIO.CEL.03", "MLA.BIO.CEL.04"],
    skill: "connecting transport, feedback, and stable internal conditions",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Feedback Part</th><th>Example</th></tr><tr><td>Stimulus</td><td>Outside solution becomes salty</td></tr><tr><td>Response</td><td>Cell regulates water movement</td></tr></table>`, stem: "What is the stimulus in the scenario?", correct: "The outside solution becomes salty.", distractors: ["The final answer choice", "The student's notebook", "The response after regulation"], feedback: "The stimulus is the change that starts the feedback sequence." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Homeostasis loop: change detected -> response begins -> condition moves back toward stable range.</div>`, stem: "What does homeostasis mean?", correct: "Maintaining internal conditions within a stable range.", distractors: ["Never changing at all", "Changing every variable randomly", "Stopping all membrane transport"], feedback: "Homeostasis allows regulated change that keeps conditions in a workable range." },
      { html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Response</th></tr><tr><td>Body temperature rises</td><td>Sweating helps cool the body</td></tr></table>`, stem: "How does the response support homeostasis?", correct: "It helps move body temperature back toward a stable range.", distractors: ["It permanently stops temperature from changing.", "It proves cells have no membranes.", "It makes the original imbalance worse."], feedback: "A homeostasis response reduces the imbalance." },
      { html: `<table border="1" cellpadding="6"><tr><th>Cell Need</th><th>Membrane Role</th></tr><tr><td>Stable water and ion levels</td><td>Controls movement across boundary</td></tr></table>`, stem: "Why is membrane transport important for homeostasis?", correct: "It helps cells regulate materials entering and leaving.", distractors: ["It prevents every material from moving.", "It removes the need for stable internal conditions.", "It only works in nonliving objects."], feedback: "Controlled transport supports stable cell conditions." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Scenario: A response pushes a condition farther away from the normal range.</div>`, stem: "Why would this response fail to support homeostasis?", correct: "It makes the imbalance worse instead of restoring balance.", distractors: ["All responses are homeostatic.", "Stable ranges are not part of homeostasis.", "The stimulus should be ignored."], feedback: "A homeostatic response should help restore balance." }
    ]
  },
  "05": {
    title: "Plant Structures and Physiological Processes",
    standards: ["MLA.BIO.CEL.04"],
    skill: "relating plant roots, stems, leaves, xylem, phloem, and processes",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Plant Structure</th><th>Main Function</th></tr><tr><td>Root</td><td>Absorbs water/minerals</td></tr><tr><td>Stem</td><td>Support and transport</td></tr><tr><td>Leaf</td><td>Photosynthesis and gas exchange</td></tr></table>`, stem: "Which structure is most directly responsible for absorbing water and minerals?", correct: "Root", distractors: ["Leaf", "Flower petal", "Seed coat only"], feedback: "Roots absorb water and minerals from the environment." },
      { html: `<table border="1" cellpadding="6"><tr><th>Tissue</th><th>Material Moved</th></tr><tr><td>Xylem</td><td>Water and minerals upward</td></tr><tr><td>Phloem</td><td>Sugars from leaves</td></tr></table>`, stem: "Which tissue transports sugars made in leaves?", correct: "Phloem", distractors: ["Xylem", "Chlorophyll", "Root hair only"], feedback: "Phloem transports sugars through the plant." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Diagram clue: broad leaf surface with many chloroplast-containing cells.</div>`, stem: "Which process is most supported by this leaf structure?", correct: "Photosynthesis", distractors: ["Blood circulation", "Pathogen transmission only", "Cell wall removal"], feedback: "Leaf structure supports light capture for photosynthesis." },
      { html: `<table border="1" cellpadding="6"><tr><th>Problem</th><th>Observation</th></tr><tr><td>Damaged roots</td><td>Plant wilts even with light available</td></tr></table>`, stem: "Why can damaged roots cause wilting?", correct: "Less water is absorbed, so cells lose support.", distractors: ["Roots make all sugars in leaves.", "Light is no longer needed by plants.", "Wilting proves the plant is an animal cell."], feedback: "Roots support water uptake, and water helps plant cells maintain support." },
      { html: `<table border="1" cellpadding="6"><tr><th>Material</th><th>Likely Pathway</th></tr><tr><td>Water</td><td>Roots -> xylem -> leaves</td></tr></table>`, stem: "What does the pathway show?", correct: "Water movement through plant transport structures.", distractors: ["Sugar movement through animal blood", "Protein building by ribosomes", "Nervous system signaling"], feedback: "The pathway connects roots and xylem to water movement." }
    ]
  },
  "06": {
    title: "Human Systems Connections in Biology",
    standards: ["MLA.BIO.CEL.04"],
    skill: "relating selected brain, cardiovascular, and immune structures to functions",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>System</th><th>Key Function</th></tr><tr><td>Brain/nervous</td><td>Control and coordination</td></tr><tr><td>Cardiovascular</td><td>Transport materials</td></tr><tr><td>Immune</td><td>Defense against pathogens</td></tr></table>`, stem: "Which system transports oxygen and nutrients through blood?", correct: "Cardiovascular system", distractors: ["Immune system only", "Brain only", "Digestive label from another unit"], feedback: "The cardiovascular system includes heart, blood, and vessels that transport materials." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Model: white blood cells recognize a pathogen marker and begin a targeted response.</div>`, stem: "Which system is represented?", correct: "Immune system", distractors: ["Cardiovascular system only", "Plant xylem system", "Mitochondrial transport"], feedback: "White blood cells recognizing pathogens is immune system evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Stimulus</th><th>Response</th></tr><tr><td>Touching a hot surface</td><td>Pulling the hand away</td></tr></table>`, stem: "What role does the brain/nervous system support in this example?", correct: "Processing information and coordinating a response", distractors: ["Absorbing soil water", "Making chloroplasts", "Transporting sugars through phloem"], feedback: "The nervous system helps detect information and coordinate responses." },
      { html: `<table border="1" cellpadding="6"><tr><th>Structure</th><th>Function</th></tr><tr><td>Heart</td><td>Pumps blood</td></tr><tr><td>Blood vessels</td><td>Pathways for blood flow</td></tr></table>`, stem: "How do these structures support cardiovascular function?", correct: "They move blood and materials around the body.", distractors: ["They recognize pathogens as the primary immune response.", "They store most DNA in cells.", "They absorb minerals from soil."], feedback: "Heart and vessels support transport of materials." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">System analysis routine: identify structure -> identify material or signal -> identify function.</div>`, stem: "Why is this routine useful?", correct: "It connects evidence in a model to the system's biological job.", distractors: ["It avoids using evidence.", "It makes every system perform the same job.", "It replaces all diagrams with guesses."], feedback: "Structure-function reasoning helps interpret system models." }
    ]
  },
  "07": {
    title: "Health, Environment, Pathogens, and Immunity",
    standards: ["MLA.BIO.CEL.05"],
    skill: "evaluating health factors, pathogens, transmission, immunity, and evidence-based claims",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Transmission Route</th><th>Example</th></tr><tr><td>Droplets</td><td>Pathogen particles move from one person to another nearby person</td></tr></table>`, stem: "What does the table model?", correct: "A possible pathogen transmission route", distractors: ["Plant sugar transport", "Cell-wall synthesis", "A nucleus storing DNA"], feedback: "Transmission describes movement of pathogens from one host or place to another." },
      { html: `<table border="1" cellpadding="6"><tr><th>Health Claim</th><th>Evidence</th></tr><tr><td>Product prevents all infections</td><td>No data provided</td></tr></table>`, stem: "How reliable is this claim based on the evidence shown?", correct: "Weak, because a broad claim is made without supporting data.", distractors: ["Strong, because no data means no errors.", "Strong, because all advertisements are scientific.", "Impossible to evaluate any health claim with evidence."], feedback: "Broad health claims need reliable evidence." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Immune model: prior exposure helps immune cells respond faster to a recognized pathogen marker.</div>`, stem: "Which concept is shown?", correct: "Immunity based on recognition and response", distractors: ["Osmosis across a plant stem", "Cell wall classification", "Mitochondrial energy release only"], feedback: "Recognition and faster response are part of immune-system reasoning." },
      { html: `<table border="1" cellpadding="6"><tr><th>Risk Factor</th><th>Health Outcome Pattern</th></tr><tr><td>Higher exposure to pathogen source</td><td>More reported infections</td></tr></table>`, stem: "What does the table suggest?", correct: "Exposure may be related to infection risk.", distractors: ["Risk factors cannot be studied.", "The table proves every individual outcome.", "Pathogens are unrelated to health."], feedback: "A risk-factor table can show a pattern, but conclusions should not overstate the evidence." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Evidence check: source, claim, data, biological mechanism, limits.</div>`, stem: "Which step helps avoid accepting health misinformation?", correct: "Check whether the claim is supported by reliable data or a biological mechanism.", distractors: ["Choose the claim with the most urgent wording.", "Ignore the source and evidence.", "Assume every post is equally reliable."], feedback: "Evidence-based health reasoning checks source reliability and support." }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.CEL.02", "MLA.BIO.CEL.03", "MLA.BIO.CEL.04", "MLA.BIO.CEL.05"],
    skill: "synthesizing Unit 2 cells, transport, homeostasis, systems, and health evidence",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Unit 2 Connection</th></tr><tr><td>Cell has chloroplasts and cell wall</td><td>Plant cell structure</td></tr><tr><td>Water moves across membrane</td><td>Transport/homeostasis</td></tr></table>`, stem: "Which synthesis statement best connects the evidence?", correct: "Plant cell structures and membrane transport both support plant cell function and regulation.", distractors: ["The evidence proves the cell is an animal cell.", "Membrane transport is unrelated to cells.", "Chloroplasts are pathogen particles."], feedback: "A synthesis answer connects multiple taught Unit 2 ideas with evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Scenario</th><th>Best Unit 2 Topic</th></tr><tr><td>Water leaves a cell in a salty solution</td><td>?</td></tr></table>`, stem: "Which topic best completes the table?", correct: "Osmosis and homeostasis", distractors: ["Human cardiovascular blood flow only", "Cell type classification only", "Source reliability only"], feedback: "Water movement across a membrane connects osmosis to homeostasis." },
      { html: `<table border="1" cellpadding="6"><tr><th>Health Evidence</th><th>System Connection</th></tr><tr><td>White blood cells respond to pathogen marker</td><td>Immune system</td></tr></table>`, stem: "Which conclusion is best supported?", correct: "The immune system helps defend against pathogens using recognition and response.", distractors: ["The cardiovascular system makes chloroplasts.", "Plant xylem recognizes viruses in humans.", "Pathogens are not part of health evidence."], feedback: "The table directly connects immune cells with pathogen defense." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Synthesis CER: claim + evidence from at least two Unit 2 concepts + reasoning that connects them.</div>`, stem: "What is missing from a response that lists two facts but does not explain how they connect?", correct: "Reasoning", distractors: ["Question numbering", "Decorative color", "A fifth answer choice"], feedback: "Reasoning explains the connection between evidence and claim." },
      { html: `<table border="1" cellpadding="6"><tr><th>Structure</th><th>Function</th></tr><tr><td>Ribosome</td><td>Builds proteins</td></tr><tr><td>Cardiovascular system</td><td>Transports materials</td></tr></table>`, stem: "What common reasoning skill is used for both rows?", correct: "Connecting a structure to its function", distractors: ["Ignoring the function column", "Classifying both as pathogens", "Using only cell shape with no evidence"], feedback: "Both examples require structure-function reasoning." }
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
    "Use the embedded stimulus exactly as written.",
    "Focus on the structure-function evidence.",
    "Focus on the mapped Unit 2 vocabulary.",
    "Do not overstate what the model or data prove.",
    "Connect the evidence to the biological process."
  ][variant % 5];
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${variant === 0 ? base.stem : `${base.stem} ${focus}`}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the embedded evidence.", "This confuses the Unit 2 concept.", "This goes beyond the stimulus."][i % 3]})`,
    feedback: `${["This choice does not use the included stimulus.", "This choice confuses the mapped Unit 2 vocabulary or process.", "This choice overstates or misreads the evidence."][i % 3]} Recheck the model, table, or scenario and connect the answer to the lesson standard.`
  }));
  const correct = {
    text: base.correct,
    feedback: `${base.feedback} This matches the mapped Unit 2 lesson content and uses the included stimulus.`
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
    const id = `${prefix}_U02_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
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
    const id = `${prefix}_U02_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}

function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(path.join(unitRoot, "Moodle XML", "BIO_U02_Pretest_MoodleXML.xml"), "BIOLOGY/Units/Unit 02/Pretest", buildUnitBank(coursePrefix, "PT", 10));

for (const lessonNo of Object.keys(lessons)) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U02_L${lessonNo}_GuidedPractice_MoodleXML.xml`), `BIOLOGY/Units/Unit 02/Lesson ${lessonNo}/GuidedPractice`, buildBank(coursePrefix, lessonNo, "GP", 5));
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U02_L${lessonNo}_Quiz_MoodleXML.xml`), `BIOLOGY/Units/Unit 02/Lesson ${lessonNo}/Quiz`, buildBank(coursePrefix, lessonNo, "QZ", 25));
}

writeXml(path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U02_UnitAssessment_MoodleXML.xml"), "BIOLOGY/Units/Unit 02/UnitAssessment", buildUnitBank(coursePrefix, "UA", 40));

console.log("Generated Biology Unit 2 Moodle XML assessments.");
