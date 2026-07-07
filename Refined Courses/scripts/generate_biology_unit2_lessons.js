const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 02");

const baseStyle = "font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.65; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto;";
const headerStyle = "background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;";

function section(color, bg, title, body) {
  return `  <section style="border: 1px solid #d1d5db; border-left: 6px solid ${color}; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: ${bg};">
    <h2 style="font-size: 23px; margin-top: 0;">${title}</h2>
${body}
  </section>`;
}

function hero(page, subtitle = "") {
  return `  <section style="background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">${page}</h1>${subtitle ? `<h2 style="font-size: 24px; margin: 10px 0 0 0;">${subtitle}</h2>` : ""}</section>`;
}

function tor(text, model = "Use the worked examples and notebook tables before requesting support.") {
  return `  <div class="mla-tor-support-box" style="font-size: 16px; line-height: 1.45; color: #1f2933; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;">
    <p style="font-size: 18px; font-weight: 700; margin: 0 0 6px 0;">Need Help?</p>
    <p style="margin: 0 0 6px 0;">Contact your Teacher of Record ${text}</p>
    <p style="margin: 0;">${model}</p>
  </div>`;
}

function pageShell(lessonNo, inner) {
  return `<div style="${baseStyle}">
  <div style="${headerStyle}"><strong>BIOLOGY | Unit 02 | Lesson ${lessonNo}</strong></div>
${inner}
</div>
`;
}

function list(items) {
  return `<ul style="padding-left: 24px;">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function ol(items) {
  return `<ol style="padding-left: 24px;">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
}

function table(headers, rows) {
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin-top: 10px;"><tr style="background: #dbeafe;">${headers.map((h) => `<th style="border: 1px solid #94a3b8; padding: 10px;">${h}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td style="border: 1px solid #cbd5e1; padding: 10px;">${c}</td>`).join("")}</tr>`).join("")}</table>`;
}

const lessons = [
  {
    no: "01",
    title: "Comparing Cell Types",
    standards: ["MLA.BIO.CEL.02"],
    support: ["ELA.K12.EE.2.1", "MA.K12.MTR.2.1"],
    purpose: "Compare prokaryotic, eukaryotic, plant, and animal cells using diagrams and structure-function reasoning.",
    lab: "Model-based comparison of prokaryotic/eukaryotic and plant/animal cells.",
    visuals: ["Cell comparison chart", "Labeled cell diagrams"],
    resources: ["OpenStax Biology 2e", "CK-12", "CPALMS resources"],
    stimulus: "Cell diagrams and comparison table",
    vocab: [
      "<strong>Cell:</strong> the basic unit of structure and function in living things.",
      "<strong>Prokaryotic cell:</strong> a cell without a nucleus, such as a bacterial cell.",
      "<strong>Eukaryotic cell:</strong> a cell with a nucleus and membrane-bound organelles.",
      "<strong>Plant cell:</strong> a eukaryotic cell with a cell wall, chloroplasts, and a large central vacuole.",
      "<strong>Animal cell:</strong> a eukaryotic cell without a cell wall or chloroplasts."
    ],
    teach1: `<p>Start cell comparison by asking one question at a time. First, does the cell have a nucleus? If no nucleus is present, the cell is prokaryotic. If a nucleus is present, the cell is eukaryotic. Second, if the cell is eukaryotic, ask whether it has plant-only structures such as a cell wall, chloroplasts, and a large central vacuole. Those features point to a plant cell. If those structures are absent and the cell has only a flexible cell membrane, it is likely an animal cell.</p>${table(["Cell Feature", "Prokaryotic", "Plant", "Animal"], [["Nucleus", "No", "Yes", "Yes"], ["Cell membrane", "Yes", "Yes", "Yes"], ["Cell wall", "Often yes", "Yes", "No"], ["Chloroplasts", "No", "Yes", "No"], ["Typical size", "Smaller", "Larger", "Larger"]])}`,
    teach2: `<p>A diagram is evidence only when you read the structures carefully. Do not classify a cell because it looks round or rectangular first. Shape can be misleading. Structure is stronger evidence. A rectangular-looking cell without labels might be a drawing style, but a labeled chloroplast or cell wall is direct evidence for a plant cell.</p>`,
    mistakeBad: "This cell is a plant cell because it is shaped like a box.",
    mistakeGood: "This cell is a plant cell because it has a cell wall and chloroplasts.",
    mistakeExplain: "Use labeled structures as evidence. Shape can support a guess, but structures make the classification scientifically stronger.",
    examples: [
      ["Classify a cell with no nucleus", "A diagram shows DNA in the cytoplasm and no nucleus. Classify the cell.", ["Look for a nucleus. No nucleus is shown. Why: nucleus presence is the first major comparison.", "Check whether the DNA is inside a membrane-bound nucleus. It is not. Why: free DNA supports prokaryotic classification.", "Classify the cell as prokaryotic. Why: prokaryotic cells lack a nucleus."], "The absence of a nucleus is the strongest evidence."],
      ["Identify a plant cell", "A diagram has a nucleus, cell wall, chloroplasts, and a large vacuole. What type of cell is it?", ["Confirm it is eukaryotic because it has a nucleus. Why: only eukaryotic cells have a nucleus.", "Use plant-only evidence: cell wall and chloroplasts. Why: those structures separate plant cells from animal cells.", "Classify it as a plant cell. Why: multiple plant features agree."], "Several matching features make the classification stronger."],
      ["Compare plant and animal cells", "Both diagrams show a nucleus and mitochondria, but only one shows chloroplasts. Which is plant?", ["Find shared structures first. Both have nucleus and mitochondria. Why: shared structures do not distinguish them.", "Find the difference. One has chloroplasts. Why: chloroplasts perform photosynthesis in plant cells.", "Select the chloroplast cell as plant. Why: the distinguishing feature matches the plant cell model."], "Comparison questions require finding both similarities and differences."]
    ],
    independent: ["Classify three described cells as prokaryotic, plant, or animal and identify the evidence.", "Complete a comparison table for nucleus, cell wall, chloroplast, and cell membrane.", "Write a CER paragraph explaining why a labeled diagram represents a plant or animal cell."],
    checkpoint: "Use a provided cell comparison chart to classify three cell diagrams and write one CER explanation using at least two structure clues."
  },
  {
    no: "02",
    title: "Organelles and Structure-Function Relationships",
    standards: ["MLA.BIO.CEL.02"],
    support: ["SC.912.L.14.2", "ELA.K12.EE.3.1"],
    purpose: "Relate organelle structures to biological functions.",
    lab: "Organelle structure/function model analysis.",
    visuals: ["Labeled organelle diagrams", "Structure-function table"],
    resources: ["OpenStax Biology 2e", "HHMI BioInteractive cells resources"],
    stimulus: "Organelle diagram or model",
    vocab: [
      "<strong>Organelle:</strong> a cell structure that performs a specific job.",
      "<strong>Nucleus:</strong> stores DNA and helps control cell activities.",
      "<strong>Mitochondrion:</strong> releases usable energy for the cell.",
      "<strong>Ribosome:</strong> builds proteins.",
      "<strong>Chloroplast:</strong> uses light energy to make sugars in plant cells."
    ],
    teach1: `<p>Structure-function reasoning means connecting what a part is like to what it does. The nucleus protects and organizes genetic information, so its function is connected to DNA control. Mitochondria have folded inner membranes, which give more surface area for energy-releasing reactions. Ribosomes are small structures that assemble proteins. Chloroplasts contain pigment and membranes that help capture light for photosynthesis.</p>${table(["Organelle", "Structure Clue", "Main Function"], [["Nucleus", "Membrane-bound area with DNA", "Stores genetic instructions"], ["Mitochondrion", "Folded inner membrane", "Releases usable energy"], ["Ribosome", "Small particle in cytoplasm or rough ER", "Builds proteins"], ["Chloroplast", "Green pigment and internal membranes", "Captures light energy"]])}`,
    teach2: `<p>When a question asks about an organelle, do not memorize a random list. Ask: what job must the cell perform? Then choose the organelle built for that job. If the task is protein building, look for ribosomes. If the task is energy release, look for mitochondria. If the task is storing instructions, look for the nucleus.</p>`,
    mistakeBad: "Mitochondria store DNA because they are large organelles.",
    mistakeGood: "The nucleus stores most cell DNA; mitochondria release usable energy for cell work.",
    mistakeExplain: "Size is not the best clue. Match each organelle to the job it is specialized to perform.",
    examples: [
      ["Match function to organelle", "A cell needs to build many proteins. Which organelle is most directly involved?", ["Identify the function: protein building. Why: the function tells you what job is needed.", "Match the function to the table. Ribosomes build proteins. Why: ribosomes assemble amino acids into proteins.", "Choose ribosomes. Why: they directly perform the needed function."], "The answer comes from matching the job to the structure."],
      ["Use a structure clue", "An organelle has folded inner membranes and releases usable energy. Identify it.", ["Read the structure clue. Folded inner membranes are given. Why: structure clues help identify organelles.", "Read the function clue. It releases usable energy. Why: function confirms the structure clue.", "Identify the mitochondrion. Why: mitochondria match both clues."], "Two clues make the identification stronger."],
      ["Explain structure-function", "Why does a chloroplast's structure support photosynthesis?", ["Name the function. Photosynthesis uses light to make sugars. Why: function frames the explanation.", "Name the structure. Chloroplasts contain pigments and internal membranes. Why: those structures help capture light and organize reactions.", "Connect structure to function. Why: a strong answer explains how the parts support the job."], "Structure-function explanations must include both the structure and the job."]
    ],
    independent: ["Match six organelles to their functions in a table.", "Explain two structure-function relationships using complete sentences.", "Analyze a short cell scenario and identify which organelle is most needed."],
    checkpoint: "Identify four organelles from structure/function clues and write one explanation showing how structure supports function."
  },
  {
    no: "03",
    title: "Cell Membranes and Selective Transport",
    standards: ["MLA.BIO.CEL.03"],
    support: ["SC.912.L.14.2", "MA.K12.MTR.5.1"],
    purpose: "Explain passive and active transport through selectively permeable membranes.",
    lab: "Osmosis/diffusion/active transport virtual investigation or data analysis.",
    visuals: ["Membrane diagram", "Concentration gradient model", "Transport data table"],
    resources: ["PhET membrane channels", "Concord Consortium", "CK-12 transport simulations"],
    stimulus: "Transport model and/or data table",
    vocab: [
      "<strong>Cell membrane:</strong> selectively permeable boundary that controls movement into and out of the cell.",
      "<strong>Diffusion:</strong> movement from high concentration to low concentration.",
      "<strong>Osmosis:</strong> diffusion of water across a membrane.",
      "<strong>Active transport:</strong> movement that requires energy, often against a concentration gradient.",
      "<strong>Concentration gradient:</strong> difference in concentration across space."
    ],
    teach1: `<p>The membrane is selectively permeable, which means some materials cross more easily than others. Passive transport does not require energy because particles move down the concentration gradient, from high to low concentration. Active transport requires energy because the cell moves materials against the gradient, from low to high concentration.</p>${table(["Transport Type", "Direction", "Energy Needed?", "Example"], [["Diffusion", "High to low", "No", "Oxygen entering a cell"], ["Osmosis", "Water high to low", "No", "Water moving across membrane"], ["Active transport", "Low to high", "Yes", "Ion pump moving sodium"]])}`,
    teach2: `<p>To solve transport questions, draw or imagine two sides of the membrane. Label where the concentration is higher and lower. Then ask whether the movement follows the gradient. If it follows the gradient, it is passive. If it moves against the gradient, it requires energy and is active transport.</p>`,
    mistakeBad: "All movement across a membrane requires energy.",
    mistakeGood: "Movement down a concentration gradient is passive; movement against the gradient requires energy.",
    mistakeExplain: "The direction of movement compared with the gradient determines whether energy is needed.",
    examples: [
      ["Identify diffusion", "Oxygen is higher outside a cell than inside and moves into the cell. What transport is this?", ["Compare concentrations. Outside is higher. Why: gradient direction controls movement.", "Track movement. Oxygen moves from high to low. Why: high-to-low movement follows the gradient.", "Classify it as diffusion. Why: diffusion is passive movement down a gradient."], "No energy is needed when movement follows the gradient."],
      ["Identify osmosis", "Water moves across a membrane toward the side with more dissolved solute. What process is occurring?", ["Identify the moving material: water. Why: water movement across a membrane is the key clue.", "Check that it crosses a membrane. It does. Why: osmosis specifically involves a membrane.", "Classify it as osmosis. Why: osmosis is diffusion of water."], "Osmosis is a specific type of diffusion."],
      ["Identify active transport", "A cell uses energy to move ions from low concentration to high concentration. What process is this?", ["Compare direction. Low to high is against the gradient. Why: this direction is not passive.", "Look for energy use. Energy is used. Why: energy is required to move against the gradient.", "Classify it as active transport. Why: active transport uses energy."], "Energy use plus movement against the gradient identifies active transport."]
    ],
    independent: ["Classify five transport scenarios as diffusion, osmosis, or active transport.", "Draw a two-side membrane model with high/low labels for two scenarios.", "Explain why one scenario requires energy and one does not."],
    checkpoint: "Use a membrane model and transport data table to classify movement and justify whether energy is required."
  },
  {
    no: "04",
    title: "Homeostasis in Cells and Organisms",
    standards: ["MLA.BIO.CEL.03", "MLA.BIO.CEL.04"],
    support: ["ELA.K12.EE.1.1", "MA.K12.MTR.6.1"],
    purpose: "Connect transport and regulation to homeostasis.",
    lab: "Homeostasis feedback scenario analysis.",
    visuals: ["Feedback loop diagram", "Internal/external condition table"],
    resources: ["CK-12 homeostasis resources", "OpenStax Biology 2e"],
    stimulus: "Homeostasis scenario with feedback model",
    vocab: [
      "<strong>Homeostasis:</strong> maintaining stable internal conditions.",
      "<strong>Stimulus:</strong> a change that affects a system.",
      "<strong>Response:</strong> an action that helps return conditions toward balance.",
      "<strong>Feedback loop:</strong> a cycle of detecting change and responding.",
      "<strong>Regulation:</strong> control of internal conditions."
    ],
    teach1: `<p>Homeostasis is not staying perfectly unchanged. It means keeping internal conditions within a workable range. A stimulus causes a change. The body or cell detects the change and responds. The response helps move the condition back toward the normal range. Membrane transport supports homeostasis because cells must control water, nutrients, wastes, and ions.</p>${table(["Feedback Part", "Example: Cell Water Balance"], [["Stimulus", "Outside solution becomes very salty"], ["Detection", "Water begins leaving the cell"], ["Response", "Transport and regulation reduce the imbalance"], ["Result", "Cell conditions move closer to balance"]])}`,
    teach2: `<p>Use the same sequence for homeostasis scenarios: identify the condition being regulated, identify what changed, identify the response, then decide whether the response helps restore balance. If the response makes the imbalance worse, it is not a good homeostasis response.</p>`,
    mistakeBad: "Homeostasis means nothing in the body ever changes.",
    mistakeGood: "Homeostasis means the body or cell responds to changes to keep internal conditions within a stable range.",
    mistakeExplain: "Living systems constantly change. Regulation is the process of responding to those changes.",
    examples: [
      ["Identify the stimulus", "A cell is placed in a salty solution and water leaves the cell. What is the stimulus?", ["Find what changed first. The outside solution became salty. Why: the stimulus is the change that starts the response.", "Separate stimulus from response. Water leaving is a result. Why: do not confuse the trigger with what happens next.", "Identify the salty outside solution as the stimulus. Why: it caused the water movement."], "The stimulus begins the feedback sequence."],
      ["Connect transport to homeostasis", "Why does membrane transport help cells maintain homeostasis?", ["Name what cells must control. Cells control water, ions, nutrients, and wastes. Why: these affect internal conditions.", "Name the membrane role. The membrane controls movement. Why: selective movement keeps balance.", "Connect the ideas. Why: transport helps stabilize conditions."], "Homeostasis depends on controlled movement across boundaries."],
      ["Evaluate a response", "A person gets hot and sweats. How does sweating support homeostasis?", ["Identify the regulated condition: body temperature. Why: homeostasis is always about a condition.", "Identify the response: sweating. Why: the response is the action taken.", "Explain the effect: sweating helps cool the body. Why: cooling moves temperature back toward a stable range."], "A homeostasis response reduces the original imbalance."]
    ],
    independent: ["Complete a feedback loop for cell water balance.", "Analyze two organism homeostasis scenarios and label stimulus/response/result.", "Explain how membrane transport supports one homeostasis example."],
    checkpoint: "Use a feedback-loop model to explain a cell or organism homeostasis scenario with stimulus, response, and balance."
  },
  {
    no: "05",
    title: "Plant Structures and Physiological Processes",
    standards: ["MLA.BIO.CEL.04"],
    support: ["SC.912.L.14.7", "MLA.BIO.LAB.02"],
    purpose: "Relate plant organs and tissues to biological processes.",
    lab: "Plant structure-function diagram/data investigation.",
    visuals: ["Root/stem/leaf/tissue diagrams", "Transpiration or transport model"],
    resources: ["OpenStax Biology 2e", "HHMI plant resources", "CK-12"],
    stimulus: "Plant structure diagram or process data",
    vocab: [
      "<strong>Root:</strong> plant organ that absorbs water and minerals and anchors the plant.",
      "<strong>Stem:</strong> plant organ that supports the plant and transports materials.",
      "<strong>Leaf:</strong> plant organ where much photosynthesis occurs.",
      "<strong>Xylem:</strong> tissue that transports water and minerals upward.",
      "<strong>Phloem:</strong> tissue that transports sugars."
    ],
    teach1: `<p>Plant structures are specialized for jobs. Roots absorb water and minerals from the environment. Stems support leaves and contain transport tissues. Leaves contain structures that capture light and exchange gases. Xylem moves water and minerals, while phloem moves sugars made during photosynthesis.</p>${table(["Plant Structure", "Main Function", "Evidence in a Diagram/Data Set"], [["Root", "Absorbs water/minerals", "Root hairs or soil contact"], ["Stem", "Support and transport", "Vascular bundles"], ["Leaf", "Photosynthesis and gas exchange", "Broad surface and stomata"], ["Xylem", "Water transport", "Water movement upward"], ["Phloem", "Sugar transport", "Sugars moving from leaves"]])}`,
    teach2: `<p>When interpreting a plant diagram, ask what material is moving and where. Water moving from roots upward points to xylem. Sugar moving from leaves to other parts points to phloem. Gas exchange and light capture point to leaves. Absorption from soil points to roots.</p>`,
    mistakeBad: "Leaves absorb all water because they are green.",
    mistakeGood: "Roots absorb most water, xylem transports water upward, and leaves use water in photosynthesis and gas exchange.",
    mistakeExplain: "Color is not the function clue. Use the movement of materials and the structure's job.",
    examples: [
      ["Identify xylem function", "A diagram shows water moving from roots to leaves. Which tissue is responsible?", ["Identify the material: water. Why: the transported material is the clue.", "Identify the direction: upward from roots. Why: xylem moves water and minerals upward.", "Choose xylem. Why: its function matches the diagram."], "Xylem is the water-transport tissue."],
      ["Connect leaf structure to function", "Why does a broad leaf surface support photosynthesis?", ["Name the function: photosynthesis captures light. Why: function tells what the structure must support.", "Name the structure: broad surface. Why: a broad surface can capture more light.", "Connect them. Why: structure supports the process."], "A structure-function answer must connect the physical feature to the process."],
      ["Analyze plant data", "A plant with damaged roots wilts even when light is available. Why?", ["Identify damaged structure: roots. Why: roots absorb water.", "Connect to process: water uptake decreases. Why: less water reaches cells and leaves.", "Explain wilting. Why: cells lose water pressure and cannot maintain support."], "Plant processes depend on connected organs."]
    ],
    independent: ["Label roots, stems, leaves, xylem, and phloem in a plant-process table.", "Explain which structure is involved in three plant scenarios.", "Write a CER paragraph using plant data to connect structure and function."],
    checkpoint: "Use a plant structure diagram/data table to explain how roots, stems, leaves, xylem, and phloem support plant processes."
  },
  {
    no: "06",
    title: "Human Systems Connections in Biology",
    standards: ["MLA.BIO.CEL.04"],
    support: ["SC.912.L.14.26", "SC.912.L.14.36", "SC.912.L.14.52"],
    purpose: "Relate selected brain, cardiovascular, and immune system structures to function.",
    lab: "Brain, cardiovascular, and immune system model analysis.",
    visuals: ["Brain diagram", "Blood-flow/cardiovascular model", "Immune response diagram"],
    resources: ["NIH", "CDC", "OpenStax Anatomy and Physiology for diagrams", "CPALMS"],
    stimulus: "Human system diagram/model",
    vocab: [
      "<strong>System:</strong> group of structures working together for a function.",
      "<strong>Brain:</strong> control center that processes information and coordinates responses.",
      "<strong>Cardiovascular system:</strong> heart and blood vessels that move materials.",
      "<strong>Immune system:</strong> cells and tissues that help defend against pathogens.",
      "<strong>Structure-function relationship:</strong> how a part's design supports its job."
    ],
    teach1: `<p>Human systems are taught here as biology structure-function examples, not as a full anatomy course. The brain processes information and coordinates responses. The cardiovascular system transports oxygen, nutrients, hormones, and wastes. The immune system recognizes and responds to pathogens. Each system helps maintain body function by moving information, materials, or defense responses.</p>${table(["System", "Key Structures", "Main Biology Function"], [["Brain/nervous", "Brain and nerves", "Control and coordination"], ["Cardiovascular", "Heart, blood, vessels", "Transport materials"], ["Immune", "White blood cells, lymph tissue", "Defense against pathogens"]])}`,
    teach2: `<p>To analyze a human system model, identify the structure, the material or signal involved, and the function. Blood flow diagrams are about transport. Immune diagrams are about recognition and response. Brain diagrams are about control, processing, and coordination.</p>`,
    mistakeBad: "The immune system pumps blood because both are inside the body.",
    mistakeGood: "The cardiovascular system pumps and transports blood; the immune system helps recognize and respond to pathogens.",
    mistakeExplain: "Do not group systems by location. Match each system to its structures and job.",
    examples: [
      ["Match system to function", "Which system transports oxygen from the lungs to body cells?", ["Identify the material: oxygen. Why: the material tells you what needs transport.", "Identify the transport pathway: blood. Why: oxygen travels through blood.", "Choose cardiovascular system. Why: heart and vessels move blood."], "Transport of materials is a cardiovascular function."],
      ["Analyze immune response", "A model shows white blood cells recognizing a virus. Which system is represented?", ["Identify the structure: white blood cells. Why: cell type is the model clue.", "Identify the job: recognizing a pathogen. Why: pathogen defense is immune function.", "Choose immune system. Why: both structure and function match."], "Immune models focus on defense and recognition."],
      ["Connect brain function", "A student touches a hot surface and quickly pulls away. What role does the brain/nervous system play?", ["Identify the signal: heat/pain information. Why: the nervous system processes signals.", "Identify the response: movement away. Why: coordination produces response.", "Connect control to action. Why: the system helps the body respond to stimuli."], "Control and coordination are nervous system functions."]
    ],
    independent: ["Complete a system-function table for brain/nervous, cardiovascular, and immune systems.", "Analyze three diagrams or scenarios and identify the system involved.", "Write one explanation connecting structure to function in a human system."],
    checkpoint: "Use human-system models to identify structure, function, and evidence for brain/nervous, cardiovascular, and immune systems."
  },
  {
    no: "07",
    title: "Health, Environment, Pathogens, and Immunity",
    standards: ["MLA.BIO.CEL.05"],
    support: ["SC.912.L.14.6", "HE.912.C.1.3", "HE.912.C.1.5", "HE.912.C.1.7"],
    purpose: "Explain biological health factors using evidence.",
    lab: "Health factor/pathogen/immunity evidence case analysis.",
    visuals: ["Pathogen transmission diagram", "Vaccine/immune response model", "Risk factor table"],
    resources: ["CDC", "NIH", "CPALMS health-aligned resources"],
    stimulus: "Health case data or immune response diagram",
    vocab: [
      "<strong>Pathogen:</strong> organism or particle that can cause disease.",
      "<strong>Transmission:</strong> movement of a pathogen from one host or place to another.",
      "<strong>Immunity:</strong> ability to recognize and respond to pathogens.",
      "<strong>Risk factor:</strong> condition or behavior that changes the chance of a health outcome.",
      "<strong>Evidence-based health claim:</strong> health statement supported by data or reliable biological evidence."
    ],
    teach1: `<p>Health claims in biology must be evaluated with evidence. Pathogens can spread through air, water, contact, vectors, or contaminated surfaces. The immune system responds by recognizing invaders and producing targeted defenses. Environmental factors and behaviors can change risk, but a claim must be supported by data, not fear or rumor.</p>${table(["Health Evidence Type", "What It Can Show", "Limit"], [["Transmission diagram", "How spread can occur", "Does not prove every case"], ["Risk factor table", "Patterns in health outcomes", "May need more evidence"], ["Immune response model", "How the body responds", "Simplifies a complex process"]])}`,
    teach2: `<p>Use caution with health information. Ask: What is the claim? What evidence is provided? Is the source reliable? Does the evidence show a biological mechanism or a data pattern? Avoid claims that use scary wording without evidence.</p>`,
    mistakeBad: "A health claim is true if it sounds urgent.",
    mistakeGood: "A health claim is stronger when it uses reliable evidence, a clear biological mechanism, or relevant data.",
    mistakeExplain: "Urgency is not evidence. Biology uses data, models, and source reliability.",
    examples: [
      ["Analyze transmission", "A diagram shows droplets moving from an infected person to a nearby person. What does it model?", ["Identify the movement: droplets travel between people. Why: transmission is movement of pathogens.", "Identify the possible agent: pathogen in droplets. Why: pathogens can spread through respiratory droplets.", "Classify the model as transmission. Why: the diagram shows a pathway of spread."], "Transmission diagrams show how spread can happen."],
      ["Evaluate a health claim", "A post says a product prevents all infections but gives no data. How reliable is it?", ["Identify the claim: prevents all infections. Why: the claim is broad.", "Check evidence: no data are provided. Why: claims need support.", "Rate reliability as weak. Why: broad claims without evidence are not strong science."], "Reliable health claims require evidence."],
      ["Connect immunity", "A model shows immune cells recognizing a pathogen marker and responding faster after prior exposure. What concept is shown?", ["Identify recognition. Why: immune response depends on recognizing invaders.", "Identify faster response after exposure. Why: prior exposure can prepare immune defenses.", "Connect to immunity. Why: the model shows a targeted response."], "Immune models explain defense using recognition and response."]
    ],
    independent: ["Analyze a pathogen transmission diagram and label the route of spread.", "Evaluate two health claims using source and evidence criteria.", "Write a CER paragraph explaining which health claim is better supported."],
    checkpoint: "Use a health case table and immune response model to evaluate a biological health claim with evidence."
  },
  {
    no: "08",
    title: "Putting It All Together",
    standards: ["MLA.BIO.CEL.02", "MLA.BIO.CEL.03", "MLA.BIO.CEL.04", "MLA.BIO.CEL.05"],
    support: ["ELA.K12.EE.1.1", "MA.K12.MTR.2.1"],
    purpose: "Synthesize cells, transport, homeostasis, plant/human systems, and health connections without introducing new primary standards.",
    lab: "Unit synthesis across cells, transport, homeostasis, systems, and health.",
    visuals: ["Mixed stimuli: cell diagrams", "membrane model", "homeostasis scenario", "health data"],
    resources: ["Approved resources from Lessons 2-7 only"],
    stimulus: "Unit-level mixed stimuli from taught lessons",
    vocab: [
      "<strong>Synthesis:</strong> combining several taught ideas into one evidence-based explanation.",
      "<strong>Cell structure-function:</strong> using cell parts to explain cell jobs.",
      "<strong>Transport-homeostasis connection:</strong> membrane movement helps maintain stable conditions.",
      "<strong>System connection:</strong> plant and human structures support organism functions.",
      "<strong>Health evidence:</strong> reliable data or models used to evaluate health claims."
    ],
    teach1: `<p>Unit 2 connects cell structures to organism function. Cells have parts with jobs. Membranes regulate movement. Transport helps homeostasis. Plant and human systems move materials, process information, defend against pathogens, and maintain function. Health claims should be evaluated with biology evidence.</p>${table(["Unit 2 Topic", "Evidence You Might Use", "What It Supports"], [["Cell types", "Cell diagram", "Classification and structure"], ["Organelles", "Structure-function table", "Cell jobs"], ["Transport", "Membrane model", "Movement and energy"], ["Homeostasis", "Feedback loop", "Regulation"], ["Systems/health", "Diagram or case data", "Function and evidence-based claims"]])}`,
    teach2: `<p>A Unit 2 synthesis answer should not list topics randomly. It should explain how the evidence connects. For example, a membrane model can explain how cells regulate materials, and that regulation can support homeostasis in a tissue or organism.</p>`,
    mistakeBad: "Cells, plants, and health are connected because they are all in Biology.",
    mistakeGood: "Cells, plants, and health connect when cell structures and transport processes support organism functions and evidence-based health explanations.",
    mistakeExplain: "Synthesis requires a specific evidence-based connection, not a broad topic list.",
    examples: [
      ["Connect cell type and function", "A diagram shows a plant cell with chloroplasts and a large vacuole. How does this support plant function?", ["Classify the cell as plant. Why: chloroplasts and large vacuole are plant evidence.", "Name the functions. Chloroplasts support photosynthesis; vacuoles store water/materials. Why: functions explain why structures matter.", "Connect to plant processes. Why: cell structures support organism-level plant function."], "Cell structures support larger plant processes."],
      ["Connect transport and homeostasis", "A membrane model shows water leaving a cell in a salty solution. How does this relate to homeostasis?", ["Identify transport: osmosis. Why: water crosses a membrane.", "Identify imbalance: outside solution is salty. Why: this changes water movement.", "Explain regulation need. Why: cells must regulate water balance to maintain homeostasis."], "Transport is one mechanism that affects homeostasis."],
      ["Evaluate health evidence", "A health claim includes a transmission diagram and a risk-factor table. How should it be evaluated?", ["Identify the claim. Why: evidence must match the claim.", "Check the diagram and data. Why: visuals and tables can support or limit a claim.", "Write a CER conclusion. Why: health claims need evidence and reasoning."], "Health conclusions should be evidence-based."]
    ],
    independent: ["Complete a mixed Unit 2 evidence table using cell, transport, system, and health stimuli.", "Explain two connections between cell-level processes and organism-level functions.", "Write a synthesis CER using at least three Unit 2 concepts."],
    checkpoint: "Use mixed Unit 2 stimuli to write a synthesis response that connects cells, transport, homeostasis, systems, and health evidence."
  }
];

function p01(l) {
  return pageShell(l.no, `${hero("P01 Lesson Overview", l.title)}
${section("#0f766e", "#f0fdfa", "Standards Covered in This Lesson", `<p><strong>Primary standard(s):</strong> ${l.standards.join(", ")}</p><p><strong>Support standard(s):</strong> ${l.support.join(", ")}</p>`)}
${section("#7c3aed", "#f5f3ff", "What You Will Learn", `<p>${l.purpose}</p>`)}
${section("#f59e0b", "#fffbeb", "What You Will Do", list([`Analyze ${l.stimulus}.`, `Use the lesson tables, diagrams, and models to explain ${l.lab.toLowerCase()}`, "Practice writing evidence-based explanations independently using the lesson pages."]))}
${section("#16a34a", "#f0fdf4", "How You Will Show Mastery", `<p>You will complete notebook evidence, Moodle Guided Practice, independent work, and a Teacher of Record graded checkpoint with at least 80% mastery.</p>`)}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This standard asks you to use biological structures, models, data, and evidence to explain how living systems work. The visuals are included so you can see the relationships instead of guessing.</p>`)}
${tor("if you have reviewed the overview and still cannot explain what the lesson is asking you to master.", "Bring the standard and one confusing vocabulary word to the support request.")}`);
}

function p02(l) {
  return pageShell(l.no, `${hero("P02 Notebook Task - Part 1", `Notebook Title: ${l.title}`)}
${section("#0f766e", "#f0fdfa", "Vocabulary", list(l.vocab))}
${section("#7c3aed", "#f5f3ff", "Detailed Teaching Sequence", l.teach1)}
${section("#f59e0b", "#fffbeb", "Notebook Task", `<p>Copy the table or model into your notebook. Add a final column titled <strong>How I know</strong>. In that column, write the evidence clue that supports each classification, function, or process.</p>`)}
${tor("if you copied the table/model and still cannot identify the evidence clue.", "Point to the exact row or diagram label that is confusing.")}`);
}

function p03(l) {
  return pageShell(l.no, `${hero("P03 Notebook Task - Part 2")}
${section("#0f766e", "#f0fdfa", "Continue the Teaching Sequence", l.teach2)}
${section("#7c3aed", "#f5f3ff", "Step-by-Step Reasoning Routine", ol(["Name the structure, process, or claim in the question. Why: this prevents guessing from topic words only.", "Find the evidence in the table, diagram, model, or scenario. Why: biology answers must be supported by evidence.", "Connect the evidence to the standard vocabulary. Why: the correct answer must match the mapped lesson skill.", "Explain the conclusion in one complete sentence. Why: mastery requires reasoning, not just naming."]))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.mistakeBad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.mistakeGood}"</p><p><strong>Teachable explanation:</strong> ${l.mistakeExplain}</p>`)}
${tor("if you can identify the vocabulary term but cannot explain the evidence behind it.", "Use the reasoning routine before asking for clarification.")}`);
}

function p04(l) {
  const examples = l.examples.map((ex, idx) => section(["#0f766e", "#7c3aed", "#f59e0b"][idx], ["#f0fdfa", "#f5f3ff", "#fffbeb"][idx], `Worked Example ${idx + 1}: ${ex[0]}`, `<p><strong>Problem:</strong> ${ex[1]}</p>${ol(ex[2].map((s, i) => `<strong>Step ${i + 1}:</strong> ${s}`))}<p><strong>Interpretation:</strong> ${ex[3]}</p>`)).join("\n");
  return pageShell(l.no, `${hero("P04 Worked Example")}
${examples}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.mistakeBad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.mistakeGood}"</p><p><strong>Teachable explanation:</strong> ${l.mistakeExplain}</p>`)}
${tor("if you tried all three worked examples and still cannot explain the reasoning step.", "Use the example that most closely matches your checkpoint task.")}`);
}

function p05(l) {
  return pageShell(l.no, `${hero("P05 Guided Practice")}
${section("#0f766e", "#f0fdfa", "Practice Focus", `<p>The guided practice checks ${l.purpose.toLowerCase()} It uses the same kind of embedded stimulus named in the mapping: <strong>${l.stimulus}</strong>.</p>`)}
${section("#7c3aed", "#f5f3ff", "Before You Start", list(["Read the question first so you know what evidence to look for.", "Use the embedded table, diagram, model, or scenario before selecting an answer.", "Read feedback as instruction if you miss a question."]))}
${section("#f59e0b", "#fffbeb", "Moodle Guided Practice", `<p>Complete the Moodle Guided Practice for this lesson. The practice is aligned only to this lesson's mapped standard(s), not future lessons.</p>`)}
${tor("after reviewing guided practice feedback if you still cannot connect the stimulus to the correct concept.", "Bring the question topic and your notebook table.")}`);
}

function p06(l) {
  return pageShell(l.no, `${hero("P06 Independent Work")}
${section("#0f766e", "#f0fdfa", "Instructions", `<p>Complete Parts A, B, and C in your notebook. Use the lesson tables, diagrams, and models as evidence. Do not answer from memory alone.</p>`)}
${section("#7c3aed", "#f5f3ff", "Part A", `<p>${l.independent[0]}</p>`)}
${section("#f59e0b", "#fffbeb", "Part B", `<p>${l.independent[1]}</p>`)}
${section("#16a34a", "#f0fdf4", "Part C", `<p>${l.independent[2]}</p>`)}
${tor("if you completed Parts A and B but cannot write the Part C explanation.", "Use P04 Worked Example 3 as the model for your written response.")}`);
}

function p07(l) {
  return pageShell(l.no, `${hero("P07 Checkpoint")}
${section("#0f766e", "#f0fdfa", "Teacher of Record Graded", `<p>This checkpoint is reviewed by your Teacher of Record. It shows whether you can use the lesson evidence and vocabulary independently.</p>`)}
${section("#7c3aed", "#f5f3ff", "Checkpoint Task", `<p>${l.checkpoint}</p>`)}
${section("#f59e0b", "#fffbeb", "Notebook Evidence Submission", list(["P02 vocabulary and table/model notes.", "P03 reasoning routine and common mistake correction.", "P06 Parts A, B, and C.", "Final checkpoint response."]))}
${section("#334155", "#f8fafc", "Checkpoint Submission", `<p>Submit the required notebook evidence and final checkpoint response in the approved course location.</p>`)}
${section("#334155", "#f8fafc", "Submission Workflow", ol(["Review the lesson pages and your notebook evidence before submitting.", "Check that your answer uses the embedded visual, data, model, or scenario.", "Use Teacher of Record review feedback to correct or resubmit when the workflow requires it."]))}
${section("#16a34a", "#f0fdf4", "Mastery Criteria", `<p>To meet mastery, your checkpoint must earn at least 80% and show accurate vocabulary, correct use of evidence, a clear structure-function or process connection, and a complete explanation. If your work does not meet mastery, complete Teacher of Record intervention when required and resubmit corrections through the approved workflow.</p>`)}
${tor("if feedback shows that your answer is missing evidence, reasoning, or the mapped lesson vocabulary.", "Revise the specific missing part before resubmitting.")}`);
}

function lessonJson(l) {
  return JSON.stringify({
    course: "Biology",
    unit: "Unit 02",
    lesson: `Lesson ${l.no}`,
    lessonTitle: l.title,
    mappedStandards: l.standards,
    supportStandards: l.support,
    lessonPurpose: l.purpose,
    pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"],
    masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment readiness" : "Lesson quiz"],
    labVisualSimulationRequirements: {
      labDataInvestigation: l.lab,
      requiredVisuals: l.visuals,
      candidateResourcesForApproval: l.resources,
      assessmentStimulus: l.stimulus
    },
    asynchronousBoundary: "Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only."
  }, null, 2);
}

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
  fs.writeFileSync(path.join(dir, "lesson.json"), lessonJson(l), "utf8");
}

console.log("Generated Biology Unit 2 lessons.");
