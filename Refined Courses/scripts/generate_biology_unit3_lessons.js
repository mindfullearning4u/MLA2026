const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 03");

const css = "font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.65; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto;";
const colors = [["#0f766e", "#f0fdfa"], ["#7c3aed", "#f5f3ff"], ["#f59e0b", "#fffbeb"], ["#16a34a", "#f0fdf4"]];

function section(color, bg, title, body) {
  return `  <section style="border: 1px solid #d1d5db; border-left: 6px solid ${color}; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: ${bg};">
    <h2 style="font-size: 23px; margin-top: 0;">${title}</h2>
${body}
  </section>`;
}
function hero(title, sub = "") {
  return `  <section style="background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">${title}</h1>${sub ? `<h2 style="font-size: 24px; margin: 10px 0 0 0;">${sub}</h2>` : ""}</section>`;
}
function tor(text) {
  return `  <div class="mla-tor-support-box" style="font-size: 16px; line-height: 1.45; color: #1f2933; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;">
    <p style="font-size: 18px; font-weight: 700; margin: 0 0 6px 0;">Need Help?</p>
    <p style="margin: 0 0 6px 0;">Contact your Teacher of Record ${text}</p>
    <p style="margin: 0;">Use the notebook table, model, or worked example that matches the question before requesting support.</p>
  </div>`;
}
function shell(l, inner) {
  return `<div style="${css}">
  <div style="background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;"><strong>BIOLOGY | Unit 03 | Lesson ${l.no}</strong></div>
${inner}
</div>
`;
}
function list(items) { return `<ul style="padding-left: 24px;">${items.map(i => `<li>${i}</li>`).join("")}</ul>`; }
function ol(items) { return `<ol style="padding-left: 24px;">${items.map(i => `<li>${i}</li>`).join("")}</ol>`; }
function table(headers, rows) {
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin-top: 10px;"><tr style="background: #dbeafe;">${headers.map(h => `<th style="border: 1px solid #94a3b8; padding: 10px;">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border: 1px solid #cbd5e1; padding: 10px;">${c}</td>`).join("")}</tr>`).join("")}</table>`;
}

const lessons = [
  {
    no: "01", title: "Water, Macromolecules, and Life Processes", standards: ["MLA.BIO.ENE.01"], support: ["SC.912.L.18.1", "SC.912.L.18.12"],
    purpose: "Connect water and macromolecules to biological function.",
    lab: "Molecule-function and water-property evidence analysis.", visuals: ["Macromolecule table", "Water property diagram", "Structure-function model"], resources: ["OpenStax Biology 2e", "CK-12", "HHMI BioInteractive"], stimulus: "Molecule/function chart or water model",
    vocab: ["<strong>Macromolecule:</strong> large biological molecule needed by living things.", "<strong>Carbohydrate:</strong> molecule often used for quick energy.", "<strong>Lipid:</strong> molecule used for long-term energy storage and membranes.", "<strong>Protein:</strong> molecule that performs cell work such as enzymes.", "<strong>Water polarity:</strong> uneven charge distribution that helps water interact with other substances."],
    teach1: `<p>Life processes depend on water and macromolecules. Water's polarity helps dissolve and move many substances. Carbohydrates provide quick energy, lipids store energy and form membranes, proteins perform cell work, and nucleic acids store genetic information.</p>${table(["Molecule", "Structure Clue", "Life Function"], [["Carbohydrate", "Sugars/starches", "Quick energy and structure"], ["Lipid", "Fatty acids; mostly nonpolar", "Membranes and energy storage"], ["Protein", "Amino acid chains", "Enzymes and cell work"], ["Nucleic acid", "Nucleotide chains", "Genetic information"], ["Water", "Polar molecule", "Solvent and temperature support"]])}`,
    teach2: `<p>Use structure-function reasoning. First identify the molecule or water property. Then ask what job it supports in living cells. Do not say a molecule is important without naming the specific function it supports.</p>`,
    bad: "All molecules do the same job because cells need them.",
    good: "Different molecules have different jobs: carbohydrates often provide quick energy, proteins perform cell work, lipids form membranes, and nucleic acids store information.",
    explain: "Biology requires matching each molecule to evidence about its structure and function.",
    examples: [
      ["Classify by function", "A molecule speeds up a reaction in a cell. Which macromolecule group is most likely involved?", ["Identify the job: speeding a reaction. Why: function is the strongest clue.", "Connect the job to enzymes. Why: enzymes speed chemical reactions.", "Classify it as a protein. Why: many enzymes are proteins."], "Function evidence supports macromolecule classification."],
      ["Interpret water polarity", "A diagram shows oxygen slightly negative and hydrogens slightly positive. What property is shown?", ["Read the charge labels. Why: the model gives evidence.", "Name uneven charge distribution as polarity. Why: polarity means unequal charge.", "Connect polarity to dissolving materials. Why: this property helps water support cells."], "A water model helps explain water's biological role."],
      ["Use a molecule chart", "A molecule is made of nucleotides and stores instructions. Identify it.", ["Find the building block: nucleotide. Why: building blocks help identify molecule type.", "Match nucleotides to nucleic acids. Why: nucleic acids are made of nucleotides.", "Connect to function: genetic information. Why: structure and function agree."], "Both structure and function support the classification."]
    ],
    independent: ["Classify five molecules or water properties using a chart.", "Explain two structure-function relationships for water or macromolecules.", "Write a CER response connecting one molecule to a life process."],
    checkpoint: "Use a molecule/function chart and water model to explain how water and macromolecules support life processes."
  },
  {
    no: "02", title: "Enzymes and Conditions for Reactions", standards: ["MLA.BIO.ENE.02", "MLA.BIO.LAB.03"], support: ["SC.912.L.18.11", "MA.K12.MTR.6.1"],
    purpose: "Explain enzyme function and interpret pH/temperature effects.",
    lab: "Enzyme pH/temperature data investigation.", visuals: ["Enzyme activity graph", "pH/temperature data table", "Activation energy diagram"], resources: ["HHMI BioInteractive", "Concord Consortium", "CK-12 enzyme simulations"], stimulus: "Enzyme data table/graph",
    vocab: ["<strong>Enzyme:</strong> protein that speeds up a reaction.", "<strong>Substrate:</strong> reactant an enzyme acts on.", "<strong>Active site:</strong> enzyme region where the substrate binds.", "<strong>Optimum:</strong> condition where enzyme activity is highest.", "<strong>Denature:</strong> change shape so function is reduced or lost."],
    teach1: `<p>Enzymes speed reactions by lowering activation energy. Enzyme function depends on shape. Temperature and pH can change enzyme shape and activity. Data tables and graphs show the optimum condition where activity is greatest.</p>${table(["pH", "Relative Enzyme Activity"], [["3", "10%"], ["5", "55%"], ["7", "100%"], ["9", "40%"], ["11", "5%"]])}`,
    teach2: `<p>To interpret enzyme data, find the highest activity value first. Then identify the pH or temperature at that point. Values far from the optimum usually show lower activity because the enzyme shape or active site no longer works as well.</p>`,
    bad: "The enzyme works best at the highest pH because bigger numbers are better.",
    good: "The enzyme works best at the pH with the highest activity value.",
    explain: "Graphs and tables must be read by the measured result, not by assuming bigger x-axis values are better.",
    examples: [
      ["Find optimum pH", "Use the table to identify the optimum pH.", ["Find the highest activity value. Why: optimum means maximum activity.", "Locate its pH. Activity is 100% at pH 7. Why: the x-value at the maximum is the condition.", "State pH 7 as optimum. Why: it gives the best activity in this data."], "Optimum conditions come from the data peak."],
      ["Explain lower activity", "Why is activity lower at pH 11?", ["Compare pH 11 to optimum. Why: distance from optimum matters.", "Notice activity drops to 5%. Why: the table shows reduced function.", "Explain shape disruption. Why: extreme pH can change enzyme shape."], "Enzyme shape and function are connected."],
      ["Use activation energy", "Why do enzymes speed reactions?", ["Identify activation energy as the starting energy needed. Why: reactions need energy to begin.", "Explain enzymes lower that energy. Why: a lower barrier speeds reaction rate.", "Connect to cells. Why: cells need reactions to happen efficiently."], "Enzymes help reactions proceed under cell conditions."]
    ],
    independent: ["Identify optimum pH or temperature from a data table.", "Explain what happens when conditions move away from optimum.", "Write a CER response using enzyme activity data."],
    checkpoint: "Use an enzyme activity table or graph to identify optimum conditions and explain changes in enzyme function."
  },
  {
    no: "03", title: "ATP and Energy Transfer", standards: ["MLA.BIO.ENE.03"], support: ["SC.912.L.18.10", "ELA.K12.EE.2.1"],
    purpose: "Explain ATP's role in cellular energy transfer.",
    lab: "ATP energy-transfer model analysis.", visuals: ["ATP/ADP cycle diagram", "Cellular energy flow model"], resources: ["OpenStax Biology 2e", "CK-12", "HHMI resources"], stimulus: "ATP cycle/process diagram",
    vocab: ["<strong>ATP:</strong> molecule cells use to transfer usable energy.", "<strong>ADP:</strong> lower-energy molecule that can be recharged to ATP.", "<strong>Phosphate:</strong> chemical group involved in ATP energy transfer.", "<strong>Energy transfer:</strong> movement of energy from one molecule/process to another.", "<strong>Cellular work:</strong> cell activities that require energy."],
    teach1: `<p>ATP acts like a rechargeable energy-transfer molecule. ATP can lose a phosphate and become ADP, releasing usable energy for cellular work. ADP can be recharged back into ATP using energy from food breakdown or light-driven processes.</p>${table(["Process", "Model Change", "Energy Meaning"], [["ATP -> ADP + phosphate", "Phosphate removed", "Energy released for work"], ["ADP + phosphate -> ATP", "Phosphate added", "Energy stored for later use"]])}`,
    teach2: `<p>Do not describe ATP as creating energy from nothing. ATP transfers energy. The cell captures energy from other sources and stores some of it in ATP, then ATP releases usable energy where cell work is needed.</p>`,
    bad: "ATP makes unlimited energy from nothing.",
    good: "ATP transfers usable energy by cycling between ATP and ADP.",
    explain: "Energy is transformed and transferred; it is not created from nothing by ATP.",
    examples: [
      ["Read the ATP cycle", "ATP becomes ADP and a phosphate. What happens to energy?", ["Identify the model change. Why: phosphate removal is the key event.", "Connect removal to release. Why: ATP breakdown releases usable energy.", "State energy is available for cell work. Why: ATP powers processes."], "ATP breakdown transfers energy to cell work."],
      ["Recharge ADP", "What must happen for ADP to become ATP?", ["Start with ADP. Why: ADP has fewer phosphates.", "Add a phosphate using energy. Why: recharging requires energy input.", "Form ATP. Why: ATP stores transferable energy."], "ATP cycling is reversible with energy input."],
      ["Avoid a misconception", "Why is ATP not a long-term energy storage molecule?", ["Compare ATP to lipids/carbohydrates. Why: ATP is used quickly.", "Identify ATP's role as transfer. Why: it moves energy to work sites.", "Explain long-term storage uses other molecules. Why: cells need both storage and transfer."], "ATP is immediate energy transfer, not the main long-term storage."]
    ],
    independent: ["Label an ATP/ADP cycle diagram.", "Explain two examples of cellular work powered by ATP.", "Write a CER response explaining ATP as energy transfer."],
    checkpoint: "Use an ATP/ADP model to explain how ATP transfers usable energy for cellular work."
  },
  {
    no: "04", title: "Photosynthesis Inputs, Outputs, and Function", standards: ["MLA.BIO.ENE.04"], support: ["SC.912.L.18.7", "MLA.BIO.CEL.04"],
    purpose: "Identify photosynthesis reactants, products, and biological function.",
    lab: "Photosynthesis model/data investigation.", visuals: ["Chloroplast diagram", "Photosynthesis equation/process model", "Light/data graph"], resources: ["PhET photosynthesis resources if available", "HHMI", "CK-12", "OpenStax"], stimulus: "Photosynthesis diagram or data graph",
    vocab: ["<strong>Photosynthesis:</strong> process that uses light energy to make sugars.", "<strong>Reactant:</strong> substance used in a process.", "<strong>Product:</strong> substance made by a process.", "<strong>Chloroplast:</strong> organelle where photosynthesis occurs.", "<strong>Glucose:</strong> sugar product that stores chemical energy."],
    teach1: `<p>Photosynthesis uses carbon dioxide, water, and light energy to make glucose and oxygen. It occurs in chloroplasts. The biological function is energy capture: producers transform light energy into chemical energy stored in sugars.</p>${table(["Photosynthesis Part", "Role"], [["Carbon dioxide", "Reactant"], ["Water", "Reactant"], ["Light", "Energy input"], ["Glucose", "Product that stores chemical energy"], ["Oxygen", "Product released"]])}`,
    teach2: `<p>When reading a photosynthesis model, arrows show matter changing from reactants to products. Light is an energy input, not a material product. Do not confuse photosynthesis with respiration; photosynthesis stores energy in glucose.</p>`,
    bad: "Photosynthesis uses oxygen and glucose to make carbon dioxide.",
    good: "Photosynthesis uses carbon dioxide and water with light energy to make glucose and oxygen.",
    explain: "Reactants and products must be read in the correct direction.",
    examples: [
      ["Identify reactants", "Which substances enter photosynthesis?", ["Read the input side of the model. Why: inputs are reactants.", "Find carbon dioxide and water. Why: they are matter used in the process.", "Name light as energy input. Why: light powers the process but is not matter."], "Reactants are the matter used by photosynthesis."],
      ["Identify products", "Which products are made?", ["Read the output side. Why: outputs are products.", "Find glucose and oxygen. Why: they are made by the process.", "Connect glucose to stored energy. Why: glucose stores chemical energy."], "Products are made during photosynthesis."],
      ["Use data", "A graph shows oxygen production rising as light increases up to a point. What does this suggest?", ["Identify measured output: oxygen. Why: oxygen is a photosynthesis product.", "Compare oxygen to light. Why: light supports photosynthesis.", "State that increased light can increase photosynthesis until another factor limits it. Why: data show a pattern, not unlimited increase."], "Photosynthesis data must be interpreted with limits."]
    ],
    independent: ["Label reactants, products, and energy input in a photosynthesis model.", "Explain why chloroplasts are needed for photosynthesis.", "Write a CER response using light/oxygen data."],
    checkpoint: "Use a photosynthesis process model or light data graph to identify inputs, outputs, and function."
  },
  {
    no: "05", title: "Cellular Respiration Inputs, Outputs, and Function", standards: ["MLA.BIO.ENE.04"], support: ["SC.912.L.18.8", "ELA.K12.EE.3.1"],
    purpose: "Identify respiration reactants, products, and biological function.",
    lab: "Respiration model/data investigation.", visuals: ["Mitochondrion diagram", "Respiration equation/process model", "Energy yield table"], resources: ["HHMI", "CK-12", "OpenStax Biology 2e"], stimulus: "Respiration diagram or data table",
    vocab: ["<strong>Cellular respiration:</strong> process that releases usable energy from glucose.", "<strong>Mitochondrion:</strong> organelle where much respiration occurs.", "<strong>Glucose:</strong> sugar used as a reactant.", "<strong>Oxygen:</strong> reactant used in aerobic respiration.", "<strong>Carbon dioxide and water:</strong> products of cellular respiration."],
    teach1: `<p>Cellular respiration uses glucose and oxygen to release energy that can be transferred to ATP. Carbon dioxide and water are produced. The function is energy release for cellular work, not food production.</p>${table(["Respiration Part", "Role"], [["Glucose", "Reactant; stores chemical energy"], ["Oxygen", "Reactant"], ["ATP", "Usable energy transfer"], ["Carbon dioxide", "Product"], ["Water", "Product"]])}`,
    teach2: `<p>Respiration and breathing are related but not the same idea. Cellular respiration is a cell process. Breathing brings in oxygen and removes carbon dioxide in many organisms, but the energy-releasing process happens in cells.</p>`,
    bad: "Cellular respiration is the same thing as breathing.",
    good: "Cellular respiration is a cell process that releases usable energy from glucose, often using oxygen.",
    explain: "Breathing supports gas exchange; cellular respiration is the energy-releasing cell process.",
    examples: [
      ["Identify reactants", "What enters cellular respiration?", ["Read the input side. Why: inputs are reactants.", "Identify glucose and oxygen. Why: they are used in aerobic respiration.", "Connect glucose to stored energy. Why: respiration releases energy from glucose."], "Reactants are used to release energy."],
      ["Identify products", "What products are made besides usable energy transfer?", ["Read the output side. Why: outputs are products.", "Identify carbon dioxide and water. Why: these are matter products.", "Connect ATP to energy transfer. Why: ATP carries usable energy."], "Respiration products include carbon dioxide and water."],
      ["Use an energy table", "A table shows more ATP with oxygen than without oxygen. What does this suggest?", ["Identify the compared condition: oxygen present or absent. Why: conditions affect energy yield.", "Read ATP yield. Why: ATP indicates usable energy transfer.", "Conclude oxygen supports higher ATP yield in aerobic respiration. Why: the data show more ATP."], "Data tables show how conditions affect energy release."]
    ],
    independent: ["Label respiration reactants and products.", "Compare breathing and cellular respiration in a two-column table.", "Write a CER response using an ATP-yield table."],
    checkpoint: "Use a respiration process model or energy data table to identify inputs, outputs, and biological function."
  },
  {
    no: "06", title: "Photosynthesis and Respiration as Interdependent Processes", standards: ["MLA.BIO.ENE.04"], support: ["SC.912.L.18.9", "MA.K12.MTR.5.1"],
    purpose: "Explain the relationship between photosynthesis and respiration.",
    lab: "Comparative model investigation.", visuals: ["Photosynthesis/respiration comparison chart", "Matter/energy flow model"], resources: ["HHMI BioInteractive", "CK-12", "OpenStax"], stimulus: "Comparative process model",
    vocab: ["<strong>Interdependent:</strong> connected so processes affect or support each other.", "<strong>Producer:</strong> organism that can make sugars by photosynthesis.", "<strong>Reactant/product relationship:</strong> products of one process can become reactants of another.", "<strong>Matter cycling:</strong> atoms move through processes.", "<strong>Energy flow:</strong> energy changes form and moves through systems."],
    teach1: `<p>Photosynthesis and cellular respiration are connected. Photosynthesis uses carbon dioxide and water to make glucose and oxygen. Respiration uses glucose and oxygen to release usable energy and produce carbon dioxide and water. Matter cycles between the processes, while energy flows from light to chemical energy to usable cellular energy.</p>${table(["Process", "Reactants", "Products", "Function"], [["Photosynthesis", "Carbon dioxide + water + light", "Glucose + oxygen", "Stores energy in sugar"], ["Respiration", "Glucose + oxygen", "Carbon dioxide + water + ATP transfer", "Releases usable energy"]])}`,
    teach2: `<p>The processes are not identical opposites. Photosynthesis captures and stores energy; respiration releases usable energy. The matter relationship is connected, but energy does not simply cycle the same way matter does.</p>`,
    bad: "Photosynthesis and respiration are the same process in reverse.",
    good: "Photosynthesis stores energy in glucose; respiration releases usable energy from glucose, and their reactants/products are connected.",
    explain: "The matter relationship is linked, but the energy roles are different.",
    examples: [
      ["Compare inputs and outputs", "How are glucose and oxygen related to both processes?", ["Locate glucose and oxygen in photosynthesis products. Why: they are made by photosynthesis.", "Locate them in respiration reactants. Why: respiration uses them.", "Explain the connection. Why: products of one process can be reactants of another."], "Matter from one process can feed another process."],
      ["Explain energy roles", "How does energy differ in the two processes?", ["Photosynthesis captures light energy. Why: light powers sugar formation.", "Respiration releases usable energy from glucose. Why: cells need ATP transfer.", "Compare roles. Why: one stores energy; the other releases usable energy."], "Energy flow must be explained, not just reactants."],
      ["Use a model", "A model shows arrows from respiration products to photosynthesis reactants. What does that mean?", ["Identify products: carbon dioxide and water. Why: respiration produces them.", "Identify photosynthesis reactants. Why: photosynthesis uses them.", "Explain matter cycling. Why: atoms move between processes."], "Matter cycles through connected biological processes."]
    ],
    independent: ["Complete a comparison chart for photosynthesis and respiration.", "Explain how products of one process relate to reactants of the other.", "Write a CER response explaining interdependence."],
    checkpoint: "Use a comparative process model to explain how photosynthesis and respiration are connected but not identical."
  },
  {
    no: "07", title: "Matter and Energy in Biogeochemical Cycles", standards: ["MLA.BIO.ENE.05"], support: ["SC.912.E.7.1", "MLA.BIO.LAB.03"],
    purpose: "Analyze water and carbon cycling through biological systems.",
    lab: "Carbon/water cycle model and data analysis.", visuals: ["Carbon cycle diagram", "Water cycle diagram", "Data graph"], resources: ["NASA Earth Observatory", "NOAA", "USGS Water Science School", "CK-12"], stimulus: "Cycle diagram, map, or data graph",
    vocab: ["<strong>Biogeochemical cycle:</strong> movement of matter through living and nonliving parts of Earth.", "<strong>Carbon cycle:</strong> movement of carbon through atmosphere, organisms, water, and Earth materials.", "<strong>Water cycle:</strong> movement of water through evaporation, condensation, precipitation, runoff, and organisms.", "<strong>Reservoir:</strong> place where matter is stored.", "<strong>Flux:</strong> movement of matter from one reservoir to another."],
    teach1: `<p>Biogeochemical cycles show matter moving through living and nonliving systems. In the carbon cycle, photosynthesis moves carbon dioxide into sugars, respiration returns carbon dioxide, and decomposition and combustion also move carbon. In the water cycle, water moves through evaporation, condensation, precipitation, runoff, groundwater, and living organisms.</p>${table(["Cycle", "Biological Process", "Matter Movement"], [["Carbon", "Photosynthesis", "CO2 into sugars"], ["Carbon", "Respiration", "Carbon in glucose to CO2"], ["Water", "Transpiration", "Water from plants to atmosphere"], ["Water", "Runoff", "Water across land to bodies of water"]])}`,
    teach2: `<p>Cycle diagrams must be read by following arrows. The arrow direction shows movement. The box or location shows a reservoir. A strong explanation names the reservoir, the process, and the matter being moved.</p>`,
    bad: "Energy and matter both cycle the exact same way.",
    good: "Matter cycles through reservoirs, while energy flows through systems and changes form.",
    explain: "Unit 3 requires separating matter cycling from energy flow.",
    examples: [
      ["Trace carbon", "A carbon-cycle arrow goes from atmosphere to plant sugar. What process is shown?", ["Identify starting reservoir: atmosphere. Why: carbon begins as CO2.", "Identify ending form: plant sugar. Why: carbon enters organic molecules.", "Name photosynthesis. Why: photosynthesis moves CO2 into glucose."], "Cycle arrows connect reservoirs through processes."],
      ["Trace water", "Water moves from plant leaves to the atmosphere. What process is shown?", ["Identify source: plant leaves. Why: source shows the reservoir.", "Identify destination: atmosphere. Why: arrow direction matters.", "Name transpiration. Why: plants release water vapor."], "Water-cycle processes can involve organisms."],
      ["Interpret data", "A graph shows atmospheric CO2 rising while combustion increases. What can be inferred?", ["Read the trend. Why: data show change over time.", "Connect combustion to carbon release. Why: combustion adds CO2.", "State a supported inference without overclaiming. Why: graphs support patterns, not every cause alone."], "Data must be interpreted carefully and with evidence."]
    ],
    independent: ["Label carbon and water cycle arrows with processes.", "Identify reservoirs and fluxes in two cycle models.", "Write a CER response using a cycle diagram or data graph."],
    checkpoint: "Use a carbon or water cycle model/data graph to explain matter movement and energy-flow differences."
  },
  {
    no: "08", title: "Putting It All Together", standards: ["MLA.BIO.ENE.01", "MLA.BIO.ENE.02", "MLA.BIO.ENE.03", "MLA.BIO.ENE.04", "MLA.BIO.ENE.05"], support: ["ELA.K12.EE.1.1", "MA.K12.MTR.6.1"],
    purpose: "Synthesize molecules, water, enzymes, ATP, photosynthesis, respiration, and cycles.",
    lab: "Unit synthesis across enzymes, ATP, photosynthesis, respiration, and cycles.", visuals: ["Enzyme graph", "ATP model", "Process diagrams", "Cycle diagram"], resources: ["Approved resources from Lessons 1-7 only"], stimulus: "Unit-level mixed stimuli from taught lessons",
    vocab: ["<strong>Synthesis:</strong> combining several taught concepts into one evidence-based explanation.", "<strong>Energy capture:</strong> storing light energy in chemical form during photosynthesis.", "<strong>Energy release:</strong> transferring usable energy during respiration.", "<strong>Cycle model:</strong> diagram showing matter movement.", "<strong>Data-based explanation:</strong> conclusion supported by graph/table evidence."],
    teach1: `<p>Unit 3 connects molecules and water to energy processes. Enzymes help reactions occur efficiently. ATP transfers usable energy. Photosynthesis stores energy in glucose. Respiration releases usable energy from glucose. Carbon and water cycles move matter through living and nonliving systems.</p>${table(["Unit 3 Concept", "Evidence/Model", "What It Explains"], [["Water/macromolecules", "Molecule chart", "Life-process support"], ["Enzymes", "Activity graph", "Reaction conditions"], ["ATP", "ATP/ADP cycle", "Energy transfer"], ["Photosynthesis/respiration", "Process model", "Energy capture and release"], ["Cycles", "Carbon/water diagram", "Matter movement"]])}`,
    teach2: `<p>A Unit 3 synthesis answer must connect matter and energy carefully. Matter cycles through molecules and Earth systems. Energy flows and changes form as it is captured, stored, and transferred.</p>`,
    bad: "ATP, enzymes, photosynthesis, and cycles are connected because they are all science words.",
    good: "Enzymes help reactions, ATP transfers usable energy, photosynthesis stores energy in glucose, respiration releases usable energy, and cycles move matter through systems.",
    explain: "Synthesis requires specific relationships between concepts, not a list of terms.",
    examples: [
      ["Connect enzymes and data", "An enzyme graph peaks at pH 7. How does that support cell processes?", ["Find the peak. Why: peak shows optimum.", "Connect optimum to enzyme function. Why: enzymes work best under certain conditions.", "Connect function to cells. Why: cells depend on efficient reactions."], "Data explain how conditions affect life processes."],
      ["Connect photosynthesis and respiration", "How do glucose and oxygen connect the two processes?", ["Identify them as photosynthesis products. Why: photosynthesis makes them.", "Identify them as respiration reactants. Why: respiration uses them.", "Explain energy transfer. Why: glucose stores energy that respiration releases."], "The processes are linked through matter and energy roles."],
      ["Connect cycles", "How does carbon move from air to organisms and back?", ["Name photosynthesis moving CO2 into sugars. Why: producers capture carbon.", "Name feeding or cellular use moving carbon through organisms. Why: matter moves in living systems.", "Name respiration/decomposition returning CO2. Why: carbon cycles back."], "Carbon cycling links cell processes to ecosystems."]
    ],
    independent: ["Complete a mixed Unit 3 evidence table.", "Explain two connections between energy processes and matter cycles.", "Write a synthesis CER using at least three Unit 3 concepts."],
    checkpoint: "Use mixed Unit 3 stimuli to write a synthesis response connecting molecules, enzymes, ATP, photosynthesis, respiration, and cycles."
  }
];

function p01(l) { return shell(l, `${hero("P01 Lesson Overview", l.title)}
${section(colors[0][0], colors[0][1], "Standards Covered in This Lesson", `<p><strong>Primary standard(s):</strong> ${l.standards.join(", ")}</p><p><strong>Support standard(s):</strong> ${l.support.join(", ")}</p>`)}
${section(colors[1][0], colors[1][1], "What You Will Learn", `<p>${l.purpose}</p>`)}
${section(colors[2][0], colors[2][1], "What You Will Do", list([`Analyze ${l.stimulus}.`, `Use tables, diagrams, graphs, and process models for this investigation: ${l.lab}`, "Write evidence-based explanations independently using the lesson pages."]))}
${section(colors[3][0], colors[3][1], "How You Will Show Mastery", `<p>You will complete notebook evidence, Moodle Guided Practice, independent work, and a Teacher of Record graded checkpoint with at least 80% mastery.</p>`)}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This lesson helps you explain how molecules, energy, reactions, and cycles support living systems. Required visuals are included so you can see the process instead of guessing from words alone.</p>`)}
${tor("if you reviewed the overview and still cannot explain what the lesson is asking you to master.")}`); }
function p02(l) { return shell(l, `${hero("P02 Notebook Task - Part 1", `Notebook Title: ${l.title}`)}
${section(colors[0][0], colors[0][1], "Vocabulary", list(l.vocab))}
${section(colors[1][0], colors[1][1], "Detailed Teaching Sequence", l.teach1)}
${section(colors[2][0], colors[2][1], "Notebook Task", `<p>Copy the table, graph, or model into your notebook. Add a final column titled <strong>Evidence clue</strong> and write the clue that supports each answer.</p>`)}
${tor("if you copied the visual/model and still cannot identify the evidence clue.")}`); }
function p03(l) { return shell(l, `${hero("P03 Notebook Task - Part 2")}
${section(colors[0][0], colors[0][1], "Continue the Teaching Sequence", l.teach2)}
${section(colors[1][0], colors[1][1], "Step-by-Step Reasoning Routine", ol(["Name the process, molecule, condition, or cycle in the question. Why: this prevents guessing from topic words only.", "Find the evidence in the graph, table, diagram, or model. Why: biology answers must be supported by evidence.", "Connect the evidence to the mapped standard vocabulary. Why: the answer must stay inside the lesson scope.", "Explain the conclusion in one complete sentence. Why: mastery requires reasoning, not just naming."]))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you can name the concept but cannot explain the evidence behind it.")}`); }
function p04(l) { const ex = l.examples.map((e, i) => section(colors[i][0], colors[i][1], `Worked Example ${i + 1}: ${e[0]}`, `<p><strong>Problem:</strong> ${e[1]}</p>${ol(e[2].map((s, idx) => `<strong>Step ${idx + 1}:</strong> ${s}`))}<p><strong>Interpretation:</strong> ${e[3]}</p>`)).join("\n"); return shell(l, `${hero("P04 Worked Example")}
${ex}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you tried all three worked examples and still cannot explain the reasoning step.")}`); }
function p05(l) { return shell(l, `${hero("P05 Guided Practice")}
${section(colors[0][0], colors[0][1], "Practice Focus", `<p>The guided practice checks this lesson target: ${l.purpose} It uses the mapped assessment stimulus: <strong>${l.stimulus}</strong>.</p>`)}
${section(colors[1][0], colors[1][1], "Before You Start", list(["Read the question first so you know what evidence to look for.", "Use the embedded table, graph, diagram, process model, or scenario before selecting an answer.", "Read feedback as instruction if you miss a question."]))}
${section(colors[2][0], colors[2][1], "Moodle Guided Practice", `<p>Complete the Moodle Guided Practice for this lesson. The practice is aligned only to this lesson's mapped standard(s), not future lessons.</p>`)}
${tor("after reviewing guided practice feedback if you still cannot connect the stimulus to the correct concept.")}`); }
function p06(l) { return shell(l, `${hero("P06 Independent Work")}
${section(colors[0][0], colors[0][1], "Instructions", `<p>Complete Parts A, B, and C in your notebook. Use the lesson visual, graph, table, or model as evidence.</p>`)}
${section(colors[1][0], colors[1][1], "Part A", `<p>${l.independent[0]}</p>`)}
${section(colors[2][0], colors[2][1], "Part B", `<p>${l.independent[1]}</p>`)}
${section(colors[3][0], colors[3][1], "Part C", `<p>${l.independent[2]}</p>`)}
${tor("if you completed Parts A and B but cannot write the Part C explanation.")}`); }
function p07(l) { return shell(l, `${hero("P07 Checkpoint")}
${section(colors[0][0], colors[0][1], "Teacher of Record Graded", `<p>This checkpoint is reviewed by your Teacher of Record. It shows whether you can use the lesson evidence and vocabulary independently.</p>`)}
${section(colors[1][0], colors[1][1], "Checkpoint Task", `<p>${l.checkpoint}</p>`)}
${section(colors[2][0], colors[2][1], "Notebook Evidence Submission", list(["P02 vocabulary and table/model notes.", "P03 reasoning routine and common mistake correction.", "P06 Parts A, B, and C.", "Final checkpoint response."]))}
${section("#334155", "#f8fafc", "Checkpoint Submission", `<p>Submit the required notebook evidence and final checkpoint response in the approved course location.</p>`)}
${section("#334155", "#f8fafc", "Submission Workflow", ol(["Review the lesson pages and notebook evidence before submitting.", "Check that your answer uses the embedded visual, data, model, graph, or scenario.", "Use Teacher of Record review feedback to correct or resubmit when the workflow requires it."]))}
${section(colors[3][0], colors[3][1], "Mastery Criteria", `<p>To meet mastery, your checkpoint must earn at least 80% and show accurate vocabulary, correct use of evidence, and a complete explanation. If your work does not meet mastery, complete Teacher of Record intervention when required and resubmit corrections through the approved workflow.</p>`)}
${tor("if feedback shows that your answer is missing evidence, reasoning, or mapped lesson vocabulary.")}`); }
function json(l) { return JSON.stringify({ course: "Biology", unit: "Unit 03", lesson: `Lesson ${l.no}`, lessonTitle: l.title, mappedStandards: l.standards, supportStandards: l.support, lessonPurpose: l.purpose, pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"], masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment readiness" : "Lesson quiz"], labVisualSimulationRequirements: { labDataInvestigation: l.lab, requiredVisuals: l.visuals, candidateResourcesForApproval: l.resources, assessmentStimulus: l.stimulus }, asynchronousBoundary: "Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only." }, null, 2); }

for (const l of lessons) {
  const dir = path.join(unitRoot, `Lesson ${l.no}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "P01.html"), p01(l), "utf8");
  fs.writeFileSync(path.join(dir, "P02.html"), p02(l), "utf8");
  fs.writeFileSync(path.join(dir, "P03.html"), p03(l), "utf8");
  fs.writeFileSync(path.join(dir, "P04.html"), p04(l), "utf8");
  fs.writeFileSync(path.join(dir, "P05.html"), p05(l), "utf8");
  fs.writeFileSync(path.join(dir, "P06.html"), p06(l), "utf8");
  fs.writeFileSync(path.join(dir, "P07.html"), p07(l), "utf8");
  fs.writeFileSync(path.join(dir, "lesson.json"), json(l), "utf8");
}
console.log("Generated Biology Unit 3 lessons.");
