const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 03");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "Water, Macromolecules, and Life Processes",
    standards: ["MLA.BIO.ENE.01"],
    skill: "using water-property and macromolecule evidence to explain life processes",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Molecule</th><th>Main Function</th><th>Example</th></tr><tr><td>Carbohydrate</td><td>Short-term energy</td><td>Glucose</td></tr><tr><td>Lipid</td><td>Long-term energy and membranes</td><td>Phospholipid</td></tr><tr><td>Protein</td><td>Structure and enzymes</td><td>Amylase</td></tr></table>`, stem: "Which molecule-function match is best supported by the table?", correct: "Protein can function as an enzyme.", distractors: ["Lipid is the main short-term glucose source.", "Carbohydrate forms every cell membrane by itself.", "Water is listed as the enzyme in the table."], feedback: "The table connects proteins to enzymes, so the answer must use that evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Water Property</th><th>Evidence</th><th>Life Process Supported</th></tr><tr><td>Polarity</td><td>Dissolves many charged substances</td><td>Transport in cells and blood</td></tr><tr><td>Cohesion</td><td>Water molecules stick together</td><td>Water movement in plants</td></tr></table>`, stem: "Why does water's polarity support transport in living things?", correct: "Polarity helps water dissolve and carry many substances.", distractors: ["Polarity prevents all substances from dissolving.", "Cohesion means water cannot move in plants.", "Water properties are unrelated to cell transport."], feedback: "Polarity explains why water can dissolve many materials needed for biological transport." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Model clue:</strong> A phospholipid has a water-attracting head and water-repelling tails, allowing a boundary to form around cells.</div>`, stem: "Which structure is most directly supported by this model?", correct: "Cell membrane", distractors: ["DNA code only", "Starch granule only", "Atmospheric carbon dioxide"], feedback: "Phospholipids are major parts of cell membranes, and their structure helps form a boundary." },
      { html: `<table border="1" cellpadding="6"><tr><th>Biomolecule Test</th><th>Observation</th><th>Likely Molecule</th></tr><tr><td>Iodine</td><td>Turns dark blue-black</td><td>Starch</td></tr><tr><td>Biuret</td><td>Turns purple</td><td>Protein</td></tr></table>`, stem: "A sample turns purple with Biuret solution. What conclusion is supported?", correct: "The sample contains protein.", distractors: ["The sample contains no macromolecules.", "The sample is confirmed as pure water only.", "The sample must contain starch because every test shows starch."], feedback: "The Biuret row identifies purple as evidence for protein." },
      { html: `<table border="1" cellpadding="6"><tr><th>Biological Need</th><th>Best Supporting Molecule/Property</th></tr><tr><td>Store genetic information</td><td>Nucleic acid</td></tr><tr><td>Move dissolved substances</td><td>Water polarity</td></tr></table>`, stem: "Which answer correctly uses the evidence?", correct: "Nucleic acids store genetic information, while water polarity supports dissolved transport.", distractors: ["Water polarity stores genetic information in DNA.", "Nucleic acids are only short-term energy molecules.", "The table says lipids store all genetic instructions."], feedback: "The table separates genetic information storage from water-based transport." }
    ]
  },
  "02": {
    title: "Enzymes and Conditions for Reactions",
    standards: ["MLA.BIO.ENE.02", "MLA.BIO.LAB.03"],
    skill: "interpreting enzyme activity data and explaining condition effects",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>pH</th><th>Relative Enzyme Activity</th></tr><tr><td>3</td><td>10%</td></tr><tr><td>5</td><td>55%</td></tr><tr><td>7</td><td>100%</td></tr><tr><td>9</td><td>40%</td></tr><tr><td>11</td><td>5%</td></tr></table>`, stem: "At which pH does the enzyme work best?", correct: "pH 7", distractors: ["pH 3 because it is first in the table", "pH 11 because it is the largest pH value", "pH 5 because activity is below 100%"], feedback: "The highest relative activity is 100%, which occurs at pH 7." },
      { html: `<table border="1" cellpadding="6"><tr><th>Temperature</th><th>Relative Activity</th></tr><tr><td>10 C</td><td>20%</td></tr><tr><td>25 C</td><td>70%</td></tr><tr><td>37 C</td><td>100%</td></tr><tr><td>60 C</td><td>15%</td></tr></table>`, stem: "What does the data suggest about temperature and this enzyme?", correct: "The enzyme has an optimum near 37 C and loses activity at 60 C.", distractors: ["Activity always increases as temperature increases.", "The enzyme is inactive at every temperature.", "Temperature has no effect because every row is different."], feedback: "The data peak at 37 C and then drop sharply at 60 C." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Reaction model:</strong> Enzyme + substrate -> enzyme-substrate complex -> product. The enzyme is not used up.</div>`, stem: "Which statement correctly describes the enzyme in the model?", correct: "The enzyme helps the reaction occur and can be used again.", distractors: ["The enzyme becomes the final product and disappears.", "The substrate lowers enzyme specificity.", "The product must be identical to the enzyme."], feedback: "Enzymes catalyze reactions and are not consumed by the reaction." },
      { html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Shape Change?</th><th>Activity</th></tr><tr><td>Normal pH</td><td>No</td><td>High</td></tr><tr><td>Extreme pH</td><td>Yes</td><td>Low</td></tr></table>`, stem: "Why does extreme pH lower enzyme activity?", correct: "It can change enzyme shape, so the substrate may no longer fit well.", distractors: ["It gives every enzyme more substrates.", "It turns the enzyme into ATP.", "It proves pH is never part of enzyme data."], feedback: "Enzyme function depends on shape, so shape changes can reduce activity." },
      { html: `<table border="1" cellpadding="6"><tr><th>Trial</th><th>Substrate Present?</th><th>Enzyme Present?</th><th>Product Formed</th></tr><tr><td>A</td><td>Yes</td><td>No</td><td>Low</td></tr><tr><td>B</td><td>Yes</td><td>Yes</td><td>High</td></tr></table>`, stem: "What claim is best supported by the trial data?", correct: "The enzyme increases product formation when substrate is present.", distractors: ["Substrate alone always produces the maximum product.", "The enzyme prevents any product from forming.", "The table does not compare product formation."], feedback: "Trial B has enzyme and produces more product than Trial A." }
    ]
  },
  "03": {
    title: "ATP and Energy Transfer",
    standards: ["MLA.BIO.ENE.03"],
    skill: "explaining ATP and ADP cycling as cellular energy transfer",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Model Step</th><th>Change</th><th>Energy Meaning</th></tr><tr><td>ATP -> ADP + phosphate</td><td>Phosphate removed</td><td>Energy released for cell work</td></tr><tr><td>ADP + phosphate -> ATP</td><td>Phosphate added</td><td>Energy stored</td></tr></table>`, stem: "What happens when ATP becomes ADP and a phosphate?", correct: "Usable energy is released for cell work.", distractors: ["Energy is destroyed and cannot be transferred.", "ADP becomes glucose immediately.", "The cell stops all reactions permanently."], feedback: "The table states that removing phosphate releases energy for cell work." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Cycle model:</strong> Food energy helps recharge ADP by adding a phosphate to form ATP.</div>`, stem: "What is required to change ADP back into ATP?", correct: "Energy input and addition of a phosphate", distractors: ["Removal of every phosphate", "No energy input at all", "Conversion of ATP into oxygen"], feedback: "Recharging ADP requires adding phosphate using energy input." },
      { html: `<table border="1" cellpadding="6"><tr><th>Cell Process</th><th>Needs Usable Energy?</th></tr><tr><td>Active transport</td><td>Yes</td></tr><tr><td>Muscle contraction</td><td>Yes</td></tr><tr><td>Protein synthesis</td><td>Yes</td></tr></table>`, stem: "Why is ATP important for these processes?", correct: "ATP transfers usable energy that powers cell work.", distractors: ["ATP stores genetic information for every protein.", "ATP blocks active transport.", "ATP is only a structural lipid in membranes."], feedback: "ATP is the cell's usable energy-transfer molecule for many forms of work." },
      { html: `<table border="1" cellpadding="6"><tr><th>Molecule</th><th>Relative Energy State</th></tr><tr><td>ATP</td><td>Higher</td></tr><tr><td>ADP</td><td>Lower</td></tr></table>`, stem: "Which conclusion matches the model?", correct: "ATP has more transferable energy than ADP.", distractors: ["ADP has more phosphate groups than ATP.", "ATP and ADP are unrelated molecules.", "ADP is the final product of photosynthesis only."], feedback: "ATP is modeled as the higher-energy molecule." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Evidence statement: Cells continuously break down ATP and rebuild ATP from ADP.</div>`, stem: "Why is ATP cycling important?", correct: "It allows cells to repeatedly transfer and restore usable energy.", distractors: ["It means cells use ATP one time only.", "It stops all energy transfer.", "It proves cells do not need molecules."], feedback: "ATP cycling keeps usable energy available for repeated cell activities." }
    ]
  },
  "04": {
    title: "Photosynthesis Inputs, Outputs, and Function",
    standards: ["MLA.BIO.ENE.04"],
    skill: "identifying photosynthesis reactants, products, energy input, and function",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Photosynthesis Model</th><th>Role</th></tr><tr><td>Carbon dioxide</td><td>Reactant</td></tr><tr><td>Water</td><td>Reactant</td></tr><tr><td>Light</td><td>Energy input</td></tr><tr><td>Glucose</td><td>Product</td></tr><tr><td>Oxygen</td><td>Product</td></tr></table>`, stem: "Which pair lists products of photosynthesis?", correct: "Glucose and oxygen", distractors: ["Carbon dioxide and water", "Light and carbon dioxide", "ATP and ADP only"], feedback: "The model labels glucose and oxygen as products." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Chloroplast model:</strong> Light energy enters the chloroplast. Carbon dioxide and water are used to make glucose and oxygen.</div>`, stem: "What is the main function of photosynthesis in this model?", correct: "To store energy in glucose using light energy", distractors: ["To release all energy from glucose", "To move water through xylem only", "To make carbon dioxide as the main food product"], feedback: "Photosynthesis uses light energy to make glucose, which stores chemical energy." },
      { html: `<table border="1" cellpadding="6"><tr><th>Light Level</th><th>Oxygen Produced</th></tr><tr><td>Low</td><td>2 units</td></tr><tr><td>Medium</td><td>6 units</td></tr><tr><td>High</td><td>9 units</td></tr></table>`, stem: "What does the oxygen data suggest?", correct: "Increasing light is associated with increased photosynthesis in this data set.", distractors: ["Oxygen production decreases as light increases.", "Light is a product of photosynthesis.", "The data prove photosynthesis does not need light."], feedback: "Oxygen production rises as light level rises in the table." },
      { html: `<table border="1" cellpadding="6"><tr><th>Input Removed</th><th>Predicted Effect</th></tr><tr><td>Carbon dioxide</td><td>Less glucose produced</td></tr></table>`, stem: "Why would removing carbon dioxide reduce glucose production?", correct: "Carbon dioxide supplies matter needed to build glucose.", distractors: ["Carbon dioxide is the energy output of photosynthesis.", "Glucose is not made of matter.", "Carbon dioxide is unrelated to the model."], feedback: "Photosynthesis uses carbon dioxide as a reactant to build glucose." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Equation model: carbon dioxide + water + light energy -> glucose + oxygen.</div>`, stem: "Which part of the equation is energy input rather than matter?", correct: "Light energy", distractors: ["Carbon dioxide", "Water", "Oxygen"], feedback: "Light provides energy; carbon dioxide, water, glucose, and oxygen are matter." }
    ]
  },
  "05": {
    title: "Cellular Respiration Inputs, Outputs, and Function",
    standards: ["MLA.BIO.ENE.04"],
    skill: "identifying respiration reactants, products, ATP output, and function",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Cellular Respiration Model</th><th>Role</th></tr><tr><td>Glucose</td><td>Reactant</td></tr><tr><td>Oxygen</td><td>Reactant</td></tr><tr><td>Carbon dioxide</td><td>Product</td></tr><tr><td>Water</td><td>Product</td></tr><tr><td>ATP</td><td>Usable energy output</td></tr></table>`, stem: "Which pair lists reactants of cellular respiration?", correct: "Glucose and oxygen", distractors: ["Carbon dioxide and water", "ATP and carbon dioxide", "Light and oxygen"], feedback: "The model labels glucose and oxygen as reactants." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Mitochondrion model:</strong> Glucose is broken down with oxygen, and energy is transferred to ATP.</div>`, stem: "What is the main function of cellular respiration in this model?", correct: "To transfer energy from glucose into usable ATP", distractors: ["To store light energy in glucose", "To make oxygen as the only useful output", "To prevent cells from using energy"], feedback: "Respiration releases energy from glucose and transfers usable energy to ATP." },
      { html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>ATP Produced</th></tr><tr><td>Glucose and oxygen available</td><td>High</td></tr><tr><td>Glucose available, oxygen low</td><td>Lower</td></tr></table>`, stem: "What does the data suggest about oxygen?", correct: "Oxygen availability supports higher ATP production in this model.", distractors: ["Oxygen prevents ATP production.", "Oxygen is unrelated because both rows have identical ATP.", "Oxygen is the only product of photosynthesis and respiration."], feedback: "The row with oxygen available has higher ATP production." },
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Location Emphasized</th><th>Energy Result</th></tr><tr><td>Cellular respiration</td><td>Mitochondria</td><td>ATP produced</td></tr></table>`, stem: "Which organelle is most associated with aerobic respiration in this model?", correct: "Mitochondrion", distractors: ["Chloroplast", "Cell wall", "Central vacuole only"], feedback: "Mitochondria are the organelles associated with aerobic respiration and ATP production." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Equation model: glucose + oxygen -> carbon dioxide + water + ATP.</div>`, stem: "Which output represents usable energy for cell work?", correct: "ATP", distractors: ["Carbon dioxide", "Water", "Glucose"], feedback: "ATP is the usable energy output shown in the respiration model." }
    ]
  },
  "06": {
    title: "Photosynthesis and Respiration as Interdependent Processes",
    standards: ["MLA.BIO.ENE.04"],
    skill: "comparing photosynthesis and respiration using matter and energy models",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Reactants</th><th>Products</th></tr><tr><td>Photosynthesis</td><td>CO2 and water</td><td>Glucose and O2</td></tr><tr><td>Respiration</td><td>Glucose and O2</td><td>CO2, water, and ATP</td></tr></table>`, stem: "How are glucose and O2 connected in the two processes?", correct: "They are products of photosynthesis and reactants of respiration.", distractors: ["They are reactants of photosynthesis and products of respiration.", "They are not involved in either process.", "They are only waste products of both processes."], feedback: "The table shows glucose and O2 made by photosynthesis and used by respiration." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Matter-energy model: Photosynthesis stores energy in glucose. Respiration transfers energy from glucose to ATP.</div>`, stem: "Which statement best compares the energy roles?", correct: "Photosynthesis stores energy; respiration releases usable energy.", distractors: ["Both processes only release ATP directly.", "Photosynthesis releases energy from glucose while respiration stores light.", "Neither process involves energy transfer."], feedback: "Photosynthesis captures/stores energy, while respiration transfers usable energy to ATP." },
      { html: `<table border="1" cellpadding="6"><tr><th>Gas</th><th>Photosynthesis Role</th><th>Respiration Role</th></tr><tr><td>CO2</td><td>Reactant</td><td>Product</td></tr><tr><td>O2</td><td>Product</td><td>Reactant</td></tr></table>`, stem: "What does the gas table show?", correct: "The same gases can have opposite roles in the two processes.", distractors: ["CO2 and O2 have identical roles in both processes.", "O2 is never used by living cells.", "CO2 is unrelated to matter cycling."], feedback: "CO2 and O2 switch roles between photosynthesis and respiration." },
      { html: `<table border="1" cellpadding="6"><tr><th>Claim</th><th>Evidence Needed</th></tr><tr><td>Plants also do cellular respiration</td><td>ATP need and mitochondria function</td></tr></table>`, stem: "Why is the claim reasonable?", correct: "Plant cells need ATP for cell work, so they use respiration too.", distractors: ["Plants never need ATP.", "Photosynthesis replaces every cell process.", "Only animal cells contain molecules."], feedback: "Plants make glucose by photosynthesis but still need respiration to produce usable ATP." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Comparison routine: identify input, output, energy role, and location for each process.</div>`, stem: "Why is this routine useful?", correct: "It prevents confusing the two processes while showing how they connect.", distractors: ["It removes evidence from the answer.", "It makes photosynthesis and respiration identical.", "It ignores matter and energy."], feedback: "A comparison routine keeps similarities and differences clear." }
    ]
  },
  "07": {
    title: "Matter and Energy in Biogeochemical Cycles",
    standards: ["MLA.BIO.ENE.05", "MLA.BIO.LAB.03"],
    skill: "tracing matter movement in carbon and water cycle models and data",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Carbon Cycle Arrow</th><th>Process</th></tr><tr><td>Atmospheric CO2 -> plant glucose</td><td>Photosynthesis</td></tr><tr><td>Glucose in organisms -> atmospheric CO2</td><td>Respiration</td></tr></table>`, stem: "Which process moves atmospheric CO2 into plant sugars?", correct: "Photosynthesis", distractors: ["Respiration", "Evaporation", "Condensation"], feedback: "The table labels atmospheric CO2 to plant glucose as photosynthesis." },
      { html: `<table border="1" cellpadding="6"><tr><th>Water Cycle Movement</th><th>Process</th></tr><tr><td>Liquid water to water vapor</td><td>Evaporation</td></tr><tr><td>Water vapor to cloud droplets</td><td>Condensation</td></tr><tr><td>Cloud droplets fall</td><td>Precipitation</td></tr></table>`, stem: "Which process changes liquid water into water vapor?", correct: "Evaporation", distractors: ["Condensation", "Precipitation", "Photosynthesis"], feedback: "Evaporation is liquid water changing into water vapor." },
      { html: `<table border="1" cellpadding="6"><tr><th>Year</th><th>Atmospheric CO2 Level</th></tr><tr><td>1</td><td>Low</td></tr><tr><td>2</td><td>Medium</td></tr><tr><td>3</td><td>High</td></tr></table>`, stem: "What trend is shown in the CO2 data?", correct: "Atmospheric CO2 increases over the three years.", distractors: ["Atmospheric CO2 decreases each year.", "The data show no change.", "The table only shows water vapor."], feedback: "The values move from low to medium to high." },
      { html: `<table border="1" cellpadding="6"><tr><th>Reservoir</th><th>Example</th></tr><tr><td>Atmosphere</td><td>CO2 gas</td></tr><tr><td>Biosphere</td><td>Carbon in organisms</td></tr><tr><td>Hydrosphere</td><td>Dissolved carbon in water</td></tr></table>`, stem: "What is a reservoir in a cycle model?", correct: "A place where matter is stored.", distractors: ["A process that destroys matter.", "A type of ATP molecule.", "A graph title only."], feedback: "Reservoirs are storage locations for matter in a cycle." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Cycle model warning: Matter cycles through systems, while energy flows and changes form.</div>`, stem: "Which statement correctly distinguishes matter and energy?", correct: "Matter cycles, while energy flows and changes form.", distractors: ["Energy cycles exactly like atoms in every model.", "Matter is destroyed during every cycle.", "Cycles do not involve living systems."], feedback: "Biogeochemical cycles trace matter; energy flow is related but not identical." }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.ENE.01", "MLA.BIO.ENE.02", "MLA.BIO.ENE.03", "MLA.BIO.ENE.04", "MLA.BIO.ENE.05"],
    skill: "synthesizing molecules, enzymes, ATP, photosynthesis, respiration, and cycles",
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Unit 3 Concept</th><th>Evidence</th><th>Meaning</th></tr><tr><td>Enzymes</td><td>Activity peaks at pH 7</td><td>Conditions affect reaction rate</td></tr><tr><td>ATP</td><td>ATP -> ADP + phosphate</td><td>Energy transfer</td></tr></table>`, stem: "Which synthesis statement uses both rows correctly?", correct: "Enzyme activity depends on conditions, and ATP transfers usable energy for cell work.", distractors: ["Enzymes are ATP molecules and always work at pH 11.", "ATP controls pH directly in every reaction.", "The table shows no relationship to cell processes."], feedback: "The correct synthesis keeps each concept accurate and connects both to cell processes." },
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Carbon Movement</th><th>Energy Role</th></tr><tr><td>Photosynthesis</td><td>CO2 into glucose</td><td>Stores energy</td></tr><tr><td>Respiration</td><td>Glucose into CO2</td><td>Produces ATP</td></tr></table>`, stem: "Which conclusion is best supported?", correct: "Photosynthesis and respiration connect carbon movement with energy transfer.", distractors: ["The two processes have no shared molecules.", "Respiration stores light energy in glucose.", "Photosynthesis produces ATP as its only product."], feedback: "The table links carbon movement and energy roles across both processes." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Best Unit 3 Idea</th></tr><tr><td>Water dissolves many substances</td><td>Water polarity supports transport</td></tr><tr><td>Protein shape changes at extreme pH</td><td>Enzyme activity can decrease</td></tr></table>`, stem: "What do both rows have in common?", correct: "Molecular properties affect biological functions.", distractors: ["Both rows show photosynthesis products.", "Both rows prove ATP stores DNA.", "Neither row involves structure-function reasoning."], feedback: "Both rows connect molecular properties to functions in living systems." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">CER prompt: Explain how carbon in atmospheric CO2 can become part of a plant, then later return to the atmosphere.</div>`, stem: "Which explanation best answers the prompt?", correct: "Photosynthesis moves CO2 into glucose, and respiration or decomposition can return CO2 to the atmosphere.", distractors: ["Evaporation turns carbon into water vapor.", "ATP permanently destroys carbon atoms.", "Oxygen stores all carbon in the atmosphere."], feedback: "The explanation correctly traces carbon through taught Unit 3 processes." },
      { html: `<table border="1" cellpadding="6"><tr><th>Student Claim</th><th>Problem</th></tr><tr><td>Photosynthesis and respiration are the same because both involve glucose.</td><td>Confuses connection with sameness</td></tr></table>`, stem: "How should the claim be corrected?", correct: "They are connected, but photosynthesis stores energy in glucose while respiration transfers energy from glucose to ATP.", distractors: ["They are identical processes in the same organelle.", "Only respiration uses matter.", "Photosynthesis has no energy role."], feedback: "A strong correction names both the connection and the difference." }
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
    "Use the embedded Unit 3 stimulus exactly as written.",
    "Focus on evidence from the table, model, or data.",
    "Connect the evidence to the mapped Biology energy standard.",
    "Do not confuse matter movement with energy transfer.",
    "Explain the biological process without adding outside content."
  ][variant % 5];
  const prompt = variant === 0 ? base.stem : `${base.stem} ${focus}`;
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${prompt}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the embedded evidence.", "This confuses a Unit 3 process.", "This goes beyond the provided stimulus."][i % 3]})`,
    feedback: `${["This choice does not use the included stimulus.", "This choice confuses the mapped Unit 3 vocabulary or process.", "This choice overstates or misreads the evidence."][i % 3]} Recheck the table, model, or scenario and connect the answer to the lesson standard.`
  }));
  const correct = {
    text: base.correct,
    feedback: `${base.feedback} This matches the mapped Unit 3 lesson content and uses the included stimulus.`
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
    const id = `${prefix}_U03_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
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
    const id = `${prefix}_U03_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}

function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(path.join(unitRoot, "Moodle XML", "BIO_U03_Pretest_MoodleXML.xml"), "BIOLOGY/Units/Unit 03/Pretest", buildUnitBank(coursePrefix, "PT", 10));

for (const lessonNo of Object.keys(lessons)) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U03_L${lessonNo}_GuidedPractice_MoodleXML.xml`), `BIOLOGY/Units/Unit 03/Lesson ${lessonNo}/GuidedPractice`, buildBank(coursePrefix, lessonNo, "GP", 5));
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U03_L${lessonNo}_Quiz_MoodleXML.xml`), `BIOLOGY/Units/Unit 03/Lesson ${lessonNo}/Quiz`, buildBank(coursePrefix, lessonNo, "QZ", 25));
}

writeXml(path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U03_UnitAssessment_MoodleXML.xml"), "BIOLOGY/Units/Unit 03/UnitAssessment", buildUnitBank(coursePrefix, "UA", 40));

console.log("Generated Biology Unit 3 Moodle XML assessments.");
