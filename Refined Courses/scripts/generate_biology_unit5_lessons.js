const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 05");

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
  <div style="background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;"><strong>BIOLOGY | Unit 05 | Lesson ${l.no}</strong></div>
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
    no: "01", title: "Evidence for Evolution", standards: ["MLA.BIO.EVO.01", "MLA.BIO.SCI.02"], support: ["SC.912.L.15.1", "ELA.K12.EE.1.1"],
    purpose: "Explain evidence for evolution from fossils, anatomy, embryology, biogeography, molecular biology, and observed change.",
    lab: "Evolution evidence comparison investigation.", visuals: ["Fossil/anatomy/embryology/molecular evidence chart"], resources: ["HHMI BioInteractive", "Smithsonian", "OpenStax Biology 2e"], stimulus: "Evolution evidence set",
    vocab: ["<strong>Evolution:</strong> change in inherited traits of populations over generations.", "<strong>Fossil:</strong> preserved evidence of past life.", "<strong>Homologous structure:</strong> similar structure suggesting shared ancestry.", "<strong>Molecular evidence:</strong> DNA or protein similarity used to compare organisms.", "<strong>Biogeography:</strong> study of where organisms live and how distribution supports explanations."],
    teach1: `<p>Evolution is explained with multiple evidence lines. Fossils show organisms and transitions through time. Homologous structures show shared body plans. Embryology can show developmental similarities. Molecular evidence compares DNA and proteins. Biogeography shows how location and isolation connect to change.</p>${table(["Evidence Type", "What Students Look For", "What It Can Support"], [["Fossils", "Age, layers, transitional features", "Change over time"], ["Anatomy", "Similar bone patterns", "Shared ancestry"], ["Embryology", "Similar early development", "Relatedness evidence"], ["Molecular", "DNA/protein similarity", "Degree of relatedness"], ["Biogeography", "Species location patterns", "Isolation and diversification"]])}`,
    teach2: `<p>Use evidence sets together. One fossil or one structure is not the whole explanation. Strong scientific reasoning asks which claim is best supported by the combined evidence, what each evidence type shows, and what limits remain.</p>`,
    bad: "One picture of a fossil proves every detail of evolution.",
    good: "Several independent evidence lines can support a stronger explanation of evolutionary change.",
    explain: "Scientific claims are stronger when multiple evidence sources point toward the same explanation.",
    examples: [
      ["Use fossil evidence", "A fossil layer shows older horse relatives with smaller body size and different toes. What does this support?", ["Identify the evidence source. Why: fossils show past life.", "Compare older and newer forms. Why: change through layers matters.", "Connect to population change over time. Why: evolution is change across generations."], "Fossils can support change over time."],
      ["Use molecular evidence", "Two species have very similar DNA sequences. What can this suggest?", ["Read the molecular comparison. Why: DNA similarity is evidence.", "Connect similarity to relatedness. Why: closer relatives often share more sequence similarity.", "Avoid overclaiming. Why: DNA is one evidence line."], "Molecular similarity can support shared ancestry."],
      ["Combine evidence", "Fossils, homologous limbs, and DNA data all support relatedness. Why is that strong?", ["Name each evidence type. Why: multiple sources are being compared.", "Check whether they support the same claim. Why: agreement strengthens reasoning.", "State the supported claim. Why: evidence must connect to a conclusion."], "Converging evidence strengthens scientific explanations."]
    ],
    independent: ["Complete an evolution evidence chart from fossils, anatomy, and molecular data.", "Explain which evidence line is strongest for one claim and why.", "Write a CER response using at least two evidence types."],
    checkpoint: "Use an evolution evidence set to support a claim about change over time or shared ancestry."
  },
  {
    no: "02", title: "Natural Selection", standards: ["MLA.BIO.EVO.02"], support: ["SC.912.L.15.13", "MLA.BIO.LAB.03"],
    purpose: "Explain conditions required for natural selection.",
    lab: "Natural selection simulation or population data analysis.", visuals: ["Selection scenario model", "Frequency/data graph"], resources: ["HHMI BioInteractive", "PhET Natural Selection", "Concord Consortium"], stimulus: "Population/selection data graph",
    vocab: ["<strong>Natural selection:</strong> process where inherited traits that improve survival/reproduction become more common.", "<strong>Variation:</strong> differences among individuals in a population.", "<strong>Adaptation:</strong> inherited trait that improves survival or reproduction in an environment.", "<strong>Selection pressure:</strong> environmental factor that affects survival or reproduction.", "<strong>Fitness:</strong> reproductive success in a specific environment."],
    teach1: `<p>Natural selection requires variation, heritability, overproduction or competition, and differential survival/reproduction. The environment does not choose on purpose. Individuals with helpful inherited traits tend to leave more offspring, so those traits can become more common in the population.</p>${table(["Condition", "Evidence in a Scenario"], [["Variation", "Individuals have different traits"], ["Heritability", "Trait can be passed to offspring"], ["Selection pressure", "Environment affects survival/reproduction"], ["Differential reproduction", "Some traits leave more offspring"], ["Population change", "Trait frequency changes over generations"]])}`,
    teach2: `<p>Read selection graphs by tracking trait frequency across generations. A trait increasing after a selection pressure suggests individuals with that inherited trait left more offspring. Do not say organisms changed because they wanted to; selection acts on existing variation.</p>`,
    bad: "Animals evolve because they need or want a better trait.",
    good: "Natural selection changes trait frequencies when inherited variation affects survival and reproduction.",
    explain: "Selection acts on existing inherited variation; it does not create traits because organisms want them.",
    examples: [
      ["Identify selection pressure", "A drought makes large seeds more common. Birds with larger beaks survive better. What is the selection pressure?", ["Identify the environmental change. Why: selection pressure comes from environment.", "Name drought/seed size change. Why: it affects food access.", "Connect to survival. Why: birds with helpful beaks survive/reproduce more."], "The drought-related food change is the selection pressure."],
      ["Use frequency data", "A dark moth trait rises from 20% to 75% after pollution darkens trees. What changed?", ["Read starting frequency. Why: baseline matters.", "Read ending frequency. Why: change over generations is evidence.", "Connect to selection if inherited and survival differs. Why: helpful camouflage may increase reproduction."], "Trait frequency changed in the population."],
      ["Avoid purpose language", "Why is 'the rabbit grew thicker fur because it needed it' inaccurate?", ["Identify need/want wording. Why: that implies purpose.", "Recall variation already exists. Why: selection acts on inherited differences.", "Correct with population change. Why: thick-fur rabbits may leave more offspring in cold conditions."], "Natural selection is not individual wish-based change."]
    ],
    independent: ["Identify variation, heritability, selection pressure, and differential reproduction in a scenario.", "Interpret a trait-frequency graph.", "Write a CER response explaining natural selection without purpose language."],
    checkpoint: "Use a population selection data graph to explain whether natural selection is occurring and why."
  },
  {
    no: "03", title: "Genetic Variation and Evolutionary Change", standards: ["MLA.BIO.EVO.02"], support: ["SC.912.L.15.14", "SC.912.L.15.15"],
    purpose: "Explain mutation, recombination, genetic drift, and gene flow.",
    lab: "Variation mechanism data/model analysis.", visuals: ["Mutation/recombination/drift/gene flow model", "Population table"], resources: ["HHMI BioInteractive", "OpenStax Biology 2e", "CK-12"], stimulus: "Variation mechanism model/data",
    vocab: ["<strong>Mutation:</strong> DNA change that can create new alleles.", "<strong>Recombination:</strong> reshuffling alleles during sexual reproduction.", "<strong>Genetic drift:</strong> random allele-frequency change, strongest in small populations.", "<strong>Gene flow:</strong> movement of alleles between populations.", "<strong>Allele frequency:</strong> how common an allele is in a population."],
    teach1: `<p>Evolutionary change depends on genetic variation. Mutation can create new alleles. Recombination creates new allele combinations. Genetic drift changes allele frequencies by chance, especially in small populations. Gene flow moves alleles between populations when individuals migrate and reproduce.</p>${table(["Mechanism", "How It Changes Variation"], [["Mutation", "Creates new allele"], ["Recombination", "Creates new allele combinations"], ["Genetic drift", "Randomly changes allele frequencies"], ["Gene flow", "Moves alleles between populations"]])}`,
    teach2: `<p>Use data to decide the mechanism. If alleles enter from another population, think gene flow. If a small population changes after a random event, think genetic drift. If a DNA change creates a new allele, think mutation. If meiosis reshuffles existing alleles, think recombination.</p>`,
    bad: "All allele-frequency changes are natural selection.",
    good: "Allele frequencies can change through mutation, recombination, drift, gene flow, or natural selection depending on the evidence.",
    explain: "The mechanism must match the scenario evidence.",
    examples: [
      ["Identify gene flow", "Several individuals move into a population and reproduce, adding allele B. What mechanism is shown?", ["Identify movement between populations. Why: migration is the clue.", "Check reproduction. Why: alleles enter only if migrants reproduce.", "Name gene flow. Why: alleles moved between populations."], "Migration plus reproduction supports gene flow."],
      ["Identify drift", "A storm randomly leaves only 8 beetles alive, changing allele frequencies. What mechanism is shown?", ["Identify random event. Why: drift is chance-based.", "Notice small surviving group. Why: drift is stronger in small populations.", "Name genetic drift. Why: allele frequencies changed by chance."], "Random survival supports genetic drift."],
      ["Identify mutation", "A DNA change creates a new allele in a gamete. What mechanism creates the allele?", ["Identify DNA change. Why: mutation is sequence change.", "Note new allele. Why: mutation can create new variation.", "Connect to inheritance if in gamete. Why: it can enter the population."], "Mutation can introduce new alleles."]
    ],
    independent: ["Classify variation mechanisms from four scenarios.", "Interpret a population allele-frequency table.", "Write a CER response explaining one mechanism of evolutionary change."],
    checkpoint: "Use a variation mechanism model/data table to identify the mechanism and explain how it changes allele frequencies."
  },
  {
    no: "04", title: "Classification and Evolutionary Relationships", standards: ["MLA.BIO.EVO.03"], support: ["SC.912.L.15.4", "SC.912.L.15.5"],
    purpose: "Explain classification based on evolutionary relationships and why systems change.",
    lab: "Cladogram/phylogeny interpretation.", visuals: ["Cladogram", "Classification hierarchy chart"], resources: ["HHMI BioInteractive", "OpenStax Biology 2e", "CK-12"], stimulus: "Cladogram or classification chart",
    vocab: ["<strong>Classification:</strong> grouping organisms based on evidence.", "<strong>Cladogram:</strong> diagram showing hypothesized evolutionary relationships.", "<strong>Common ancestor:</strong> ancestral population shared by later groups.", "<strong>Derived trait:</strong> trait that appears in a lineage and helps define a group.", "<strong>Phylogeny:</strong> evolutionary history and relationships."],
    teach1: `<p>Modern classification uses evolutionary relationships, not just appearance. Cladograms show hypotheses about common ancestry. Branch points represent common ancestors. Traits shown on branches help explain which groups share derived traits. Classification can change when new evidence, especially molecular evidence, improves the relationship model.</p>${table(["Cladogram Feature", "Meaning"], [["Branch point", "Common ancestor"], ["Shared derived trait", "Evidence for grouping"], ["Closer branches", "More recent common ancestry"], ["New DNA evidence", "May revise classification"]])}`,
    teach2: `<p>Read cladograms by following branch points. Do not assume organisms at the far right are more advanced. The diagram shows relationships, not a ladder of progress. Use shared traits and common ancestors as evidence.</p>`,
    bad: "The organism farthest right on a cladogram is the most evolved.",
    good: "A cladogram shows relationships and common ancestry, not a ranking from less evolved to more evolved.",
    explain: "All living lineages have been evolving; position on a diagram is not a value ranking.",
    examples: [
      ["Find closest relatives", "On a cladogram, species A and B share the most recent branch point. What does that mean?", ["Find the branch point. Why: it shows common ancestry.", "Compare branch points with other species. Why: recent shared branch means closer relationship.", "State A and B are closest relatives in this model. Why: they share the most recent common ancestor."], "Closest relationship comes from most recent common ancestry."],
      ["Use a derived trait", "A trait appears before species C and D branch apart. Who has the trait?", ["Locate the trait mark. Why: traits apply after their position.", "Follow branches after the mark. Why: descendants inherit the trait in the model.", "Name C and D if both are past the mark. Why: both branches include the trait."], "Derived trait marks help interpret groups."],
      ["Explain revision", "Why might classification change after DNA analysis?", ["Identify new evidence. Why: classification depends on evidence.", "Compare DNA to older appearance-based grouping. Why: appearance can mislead.", "Revise if DNA better supports different relationships. Why: science updates explanations with stronger evidence."], "Classification systems can change with new evidence."]
    ],
    independent: ["Interpret a cladogram for closest relationships and shared traits.", "Explain why one classification might change with DNA evidence.", "Write a CER response using a classification chart."],
    checkpoint: "Use a cladogram or classification chart to explain evolutionary relationships and evidence-based classification."
  },
  {
    no: "05", title: "Domains, Kingdoms, and Diversity", standards: ["MLA.BIO.EVO.03"], support: ["SC.912.L.15.6", "ELA.K12.EE.2.1"],
    purpose: "Discuss distinguishing characteristics of domains and kingdoms.",
    lab: "Domain/kingdom comparison model.", visuals: ["Three-domain chart", "Kingdom characteristics table"], resources: ["OpenStax Biology 2e", "CK-12", "CPALMS"], stimulus: "Domain/kingdom chart",
    vocab: ["<strong>Domain:</strong> broadest classification level.", "<strong>Bacteria:</strong> prokaryotic domain with bacteria.", "<strong>Archaea:</strong> prokaryotic domain with distinct molecular traits.", "<strong>Eukarya:</strong> domain with organisms whose cells have nuclei.", "<strong>Kingdom:</strong> classification group within domains such as animals, plants, fungi, or protists."],
    teach1: `<p>The three-domain system organizes life into Bacteria, Archaea, and Eukarya. Bacteria and Archaea are prokaryotic but differ in molecular and cellular features. Eukarya includes organisms with nuclei, such as animals, plants, fungi, and protists. Kingdom traits can include cell type, cell wall, nutrition, and body organization.</p>${table(["Group", "Cell Type", "Example Trait"], [["Bacteria", "Prokaryotic", "Cell walls with peptidoglycan"], ["Archaea", "Prokaryotic", "Distinct membranes/genetics"], ["Eukarya", "Eukaryotic", "Cells have nuclei"], ["Plants", "Eukaryotic", "Cell walls and photosynthesis"], ["Fungi", "Eukaryotic", "Absorb nutrients"]])}`,
    teach2: `<p>Classify by evidence. First determine whether cells are prokaryotic or eukaryotic. Then use traits such as nucleus, cell wall type, chloroplasts, nutrition, and multicellularity. Do not classify only by where an organism lives or whether it looks familiar.</p>`,
    bad: "All microscopic organisms belong to the same domain.",
    good: "Microscopic organisms can belong to different domains; classification depends on cellular and molecular traits.",
    explain: "Size alone is weak classification evidence.",
    examples: [
      ["Use cell type", "An organism has cells with nuclei. Which domain is supported?", ["Identify nucleus evidence. Why: nucleus is a cell-type clue.", "Connect nucleus to eukaryotic cells. Why: Eukarya has nuclei.", "Name Eukarya. Why: the domain is defined by that evidence."], "A nucleus supports Eukarya."],
      ["Separate bacteria and archaea", "Two organisms are prokaryotic, but one has molecular traits distinct from bacteria. What should you check?", ["Recognize both lack nuclei. Why: both are prokaryotic.", "Use molecular/cell membrane evidence. Why: Bacteria and Archaea differ there.", "Avoid classifying by size alone. Why: both may be microscopic."], "Prokaryotes can belong to different domains."],
      ["Use kingdom traits", "A multicellular eukaryote absorbs nutrients and has cell walls. Which kingdom is suggested?", ["Identify eukaryote. Why: kingdom options here are in Eukarya.", "Find nutrient mode: absorption. Why: fungi absorb nutrients.", "Use cell wall evidence. Why: fungi also have cell walls."], "The evidence supports fungi."]
    ],
    independent: ["Complete a domain/kingdom comparison chart.", "Classify organisms from evidence cards.", "Write a CER response justifying a classification."],
    checkpoint: "Use a domain/kingdom chart to classify an organism and justify the classification with evidence."
  },
  {
    no: "06", title: "Origin-of-Life Explanations", standards: ["MLA.BIO.EVO.04", "MLA.BIO.SCI.03"], support: ["SC.912.L.15.8", "SC.912.N.2.2"],
    purpose: "Describe scientific explanations of the origin of life on Earth.",
    lab: "Evidence-based scientific explanation comparison.", visuals: ["Origin hypothesis evidence table", "Timeline/model"], resources: ["OpenStax Biology 2e", "HHMI resources where appropriate"], stimulus: "Evidence table/timeline",
    vocab: ["<strong>Scientific explanation:</strong> explanation based on evidence and testable reasoning.", "<strong>Hypothesis:</strong> proposed explanation that can be tested.", "<strong>Early Earth:</strong> conditions on Earth before modern life.", "<strong>Organic molecule:</strong> carbon-based molecule associated with living systems.", "<strong>Evidence limit:</strong> boundary on what data can support."],
    teach1: `<p>Scientific origin-of-life explanations focus on evidence-based models for how simple organic molecules and early systems could form under early Earth conditions. This lesson stays within science: claims must be tied to evidence, testable models, and known limits. It does not replace scientific evidence with personal belief or debate.</p>${table(["Explanation Component", "Evidence/Reasoning Question"], [["Early Earth conditions", "What conditions are modeled?"], ["Organic molecules", "What molecules can form?"], ["Self-organization", "What structures can form naturally?"], ["Evidence limits", "What does the model not prove?"]])}`,
    teach2: `<p>Evaluate origin-of-life models by separating supported evidence from speculation. A model may show that certain molecules can form under certain conditions, but it may not prove every step from chemistry to cells. Careful scientific reasoning includes both support and limits.</p>`,
    bad: "A scientific model must answer every origin question completely or it is useless.",
    good: "A scientific model can support part of an explanation while still having limits.",
    explain: "Science often builds explanations from partial, testable evidence and revises them as evidence improves.",
    examples: [
      ["Identify evidence", "A simulation produces amino acids under early Earth-like conditions. What does it support?", ["Identify the result. Why: amino acids were produced.", "Connect to organic molecules. Why: amino acids are building blocks.", "Limit the claim. Why: this does not prove every step to living cells."], "The model supports possible organic molecule formation."],
      ["Recognize a limit", "A model forms vesicle-like structures but no complete cells. What is the limit?", ["Identify what formed. Why: vesicles are the evidence.", "Identify what did not form. Why: limits matter.", "State the model supports only part of the explanation. Why: evidence must not be overstated."], "Evidence limits keep explanations accurate."],
      ["Stay scientific", "Why should the answer use evidence tables instead of personal opinion?", ["Identify the task as science. Why: standards require scientific explanation.", "Use testable evidence. Why: science relies on evidence.", "Avoid substituting debate for benchmark content. Why: the lesson assesses evidence-based models."], "Scientific explanations must be evidence-based."]
    ],
    independent: ["Compare two origin-of-life evidence models.", "Identify one supported claim and one limit for each model.", "Write a CER response describing a scientific explanation and its limits."],
    checkpoint: "Use an evidence table or timeline to describe a scientific origin-of-life explanation and its limits."
  },
  {
    no: "07", title: "Hominid Evolution Trends", standards: ["MLA.BIO.EVO.04"], support: ["SC.912.L.15.10", "ELA.K12.EE.3.1"],
    purpose: "Identify basic trends in hominid evolution.",
    lab: "Trend analysis using fossil/trait data.", visuals: ["Hominid trend diagram", "Trait comparison table"], resources: ["Smithsonian Human Origins", "HHMI", "OpenStax Biology 2e"], stimulus: "Hominid trend chart/table",
    vocab: ["<strong>Hominid:</strong> group including modern humans and close extinct relatives.", "<strong>Bipedalism:</strong> walking upright on two legs.", "<strong>Cranial capacity:</strong> skull volume often used as one data point in trend analysis.", "<strong>Tool evidence:</strong> artifacts that can support behavioral inferences.", "<strong>Trend:</strong> general pattern in data, not a claim that every species changes the same way."],
    teach1: `<p>Hominid evolution is studied through fossil and artifact evidence. Trends may include bipedal traits, changes in skull and jaw features, cranial capacity patterns, and tool evidence. A trend is a broad pattern across evidence, not a ladder where every species becomes a modern human.</p>${table(["Evidence", "Possible Trend Question"], [["Pelvis/leg/foot fossils", "Does evidence support bipedalism?"], ["Skull measurements", "What cranial capacity pattern appears?"], ["Jaw/teeth", "How do feeding structures compare?"], ["Tools/artifacts", "What behavior may be inferred?"]])}`,
    teach2: `<p>Read hominid trend charts carefully. Compare dates, traits, and evidence type. Do not say one fossil is a direct ancestor unless the evidence supports that specific claim. Most classroom trend tasks ask for broad patterns, not exact family-tree certainty.</p>`,
    bad: "Every older hominid fossil is a direct ancestor of every newer hominid.",
    good: "Fossils can show trends and relationships, but direct ancestry requires careful evidence and is not assumed from age alone.",
    explain: "Trend data supports patterns; it does not automatically prove direct ancestor-descendant relationships.",
    examples: [
      ["Identify bipedal evidence", "A pelvis and foot fossil show upright walking adaptations. What trend is supported?", ["Identify the structures. Why: pelvis and foot are locomotion evidence.", "Connect to upright walking. Why: those traits support bipedalism.", "State bipedal trend. Why: evidence supports walking pattern."], "Skeletal evidence can support bipedalism."],
      ["Use cranial data", "A chart shows average cranial capacity increasing across several later hominid groups. What is the careful conclusion?", ["Read the pattern. Why: trend comes from data.", "Use cautious wording. Why: averages do not describe every individual.", "Connect to trend, not superiority. Why: biology avoids value ranking."], "The chart supports a cranial capacity trend."],
      ["Avoid overclaiming", "A fossil is older than another fossil. Does that prove it is a direct ancestor?", ["Identify age evidence. Why: age is relevant.", "Recognize missing relationship evidence. Why: age alone is not enough.", "State more evidence is needed. Why: ancestry requires multiple evidence lines."], "Age alone does not prove direct ancestry."]
    ],
    independent: ["Complete a hominid trait trend table.", "Explain one supported trend and one limit of the data.", "Write a CER response using fossil or trait evidence."],
    checkpoint: "Use a hominid trend chart/table to identify a basic trend and explain what the evidence supports."
  },
  {
    no: "08", title: "Putting It All Together", standards: ["MLA.BIO.EVO.01", "MLA.BIO.EVO.02", "MLA.BIO.EVO.03", "MLA.BIO.EVO.04"], support: ["ELA.K12.EE.1.1", "MA.K12.MTR.5.1"],
    purpose: "Synthesize evolution evidence, mechanisms, classification, diversity, origin-of-life explanations, and hominid trends.",
    lab: "Unit synthesis across evolution evidence, mechanisms, classification, and trends.", visuals: ["Evidence chart", "Selection graph", "Cladogram", "Classification chart", "Trend data"], resources: ["Approved resources from Lessons 1-7 only"], stimulus: "Unit-level mixed stimuli from taught lessons",
    vocab: ["<strong>Synthesis:</strong> connecting several evidence-based ideas in one explanation.", "<strong>Evolution evidence:</strong> fossils, anatomy, molecules, distribution, and observed change.", "<strong>Evolution mechanism:</strong> process such as selection, drift, mutation, or gene flow.", "<strong>Classification evidence:</strong> traits and molecular data used to group organisms.", "<strong>Trend evidence:</strong> data pattern that supports a careful claim."],
    teach1: `<p>Unit 5 connects evidence and mechanisms. Evidence shows change, relatedness, and patterns. Mechanisms explain how populations change. Classification organizes biodiversity using evolutionary relationships. Scientific origin explanations and hominid trends require careful evidence and limits.</p>${table(["Unit 5 Concept", "Evidence/Model", "What It Explains"], [["Evolution evidence", "Fossil/anatomy/DNA chart", "Change and shared ancestry"], ["Natural selection", "Trait frequency graph", "Adaptive population change"], ["Variation mechanisms", "Allele-frequency table", "Sources of change"], ["Classification", "Cladogram/domain chart", "Relationships and diversity"], ["Trends/explanations", "Timeline or trait table", "Supported scientific patterns"]])}`,
    teach2: `<p>A Unit 5 synthesis answer must separate evidence from mechanism. Evidence supports that change or relatedness occurred. Mechanisms explain how allele frequencies or traits changed. Classification and trend models organize those explanations without overclaiming.</p>`,
    bad: "Evolution, classification, and hominid trends are all the same thing.",
    good: "Evolution evidence supports change and relatedness, mechanisms explain how populations change, and classification organizes relationships using evidence.",
    explain: "Synthesis requires specific relationships, not a list of topic words.",
    examples: [
      ["Connect evidence and mechanism", "A fossil record shows change and a selection graph shows trait-frequency shift. How do they work together?", ["Identify fossil evidence. Why: it supports change over time.", "Identify selection graph. Why: it shows a possible mechanism.", "Connect evidence and mechanism. Why: one supports pattern, the other explains process."], "Evidence and mechanism answer different parts of the explanation."],
      ["Connect classification", "A cladogram and DNA table group two species closely. What does that support?", ["Read the cladogram relationship. Why: branch points show relatedness.", "Use DNA similarity. Why: molecular data is independent evidence.", "Support close relationship. Why: both evidence sources agree."], "Classification can be evidence-based."],
      ["Use cautious trend reasoning", "A hominid chart shows a broad cranial capacity trend. What should the answer avoid?", ["State the trend. Why: data supports a pattern.", "Avoid direct ancestry claims from age alone. Why: more evidence is needed.", "Avoid value ranking. Why: evolution is not a ladder."], "Careful trend reasoning avoids overclaiming."]
    ],
    independent: ["Complete a mixed Unit 5 evidence and mechanism table.", "Explain two connections between evidence, mechanism, and classification.", "Write a synthesis CER using at least three Unit 5 concepts."],
    checkpoint: "Use mixed Unit 5 stimuli to write a synthesis response connecting evolution evidence, mechanisms, classification, diversity, scientific explanations, and hominid trends."
  }
];

function p01(l) { return shell(l, `${hero("P01 Lesson Overview", l.title)}
${section(colors[0][0], colors[0][1], "Standards Covered in This Lesson", `<p><strong>Primary standard(s):</strong> ${l.standards.join(", ")}</p><p><strong>Support standard(s):</strong> ${l.support.join(", ")}</p>`)}
${section(colors[1][0], colors[1][1], "What You Will Learn", `<p>${l.purpose}</p>`)}
${section(colors[2][0], colors[2][1], "What You Will Do", list([`Analyze ${l.stimulus}.`, `Use tables, diagrams, graphs, and process models for this investigation: ${l.lab}`, "Write evidence-based explanations independently using the lesson pages."]))}
${section(colors[3][0], colors[3][1], "How You Will Show Mastery", `<p>You will complete notebook evidence, Moodle Guided Practice, independent work, and a Teacher of Record graded checkpoint with at least 80% mastery.</p>`)}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This lesson helps you use evidence to explain biological change, relationships, diversity, and trends. Required visuals are included so you can reason from data instead of guessing from vocabulary alone.</p>`)}
${tor("if you reviewed the overview and still cannot explain what the lesson is asking you to master.")}`); }
function p02(l) { return shell(l, `${hero("P02 Notebook Task - Part 1", `Notebook Title: ${l.title}`)}
${section(colors[0][0], colors[0][1], "Vocabulary", list(l.vocab))}
${section(colors[1][0], colors[1][1], "Detailed Teaching Sequence", l.teach1)}
${section(colors[2][0], colors[2][1], "Notebook Task", `<p>Copy the evidence table, graph, cladogram, timeline, or model into your notebook. Add a final column titled <strong>Evidence clue</strong> and write the clue that supports each answer.</p>`)}
${tor("if you copied the visual/model and still cannot identify the evidence clue.")}`); }
function p03(l) { return shell(l, `${hero("P03 Notebook Task - Part 2")}
${section(colors[0][0], colors[0][1], "Continue the Teaching Sequence", l.teach2)}
${section(colors[1][0], colors[1][1], "Step-by-Step Reasoning Routine", ol(["Name the evolution concept, mechanism, relationship, or trend in the question. Why: this prevents guessing from topic words only.", "Find the evidence in the graph, evidence chart, cladogram, classification table, or timeline. Why: evolution answers must be supported by evidence.", "Connect the evidence to the mapped standard vocabulary. Why: the answer must stay inside the lesson scope.", "Explain the conclusion in one complete sentence and include any limit. Why: mastery requires careful reasoning, not overclaiming."]))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you can name the concept but cannot explain the evidence behind it.")}`); }
function p04(l) { const ex = l.examples.map((e, i) => section(colors[i][0], colors[i][1], `Worked Example ${i + 1}: ${e[0]}`, `<p><strong>Problem:</strong> ${e[1]}</p>${ol(e[2].map((s, idx) => `<strong>Step ${idx + 1}:</strong> ${s}`))}<p><strong>Interpretation:</strong> ${e[3]}</p>`)).join("\n"); return shell(l, `${hero("P04 Worked Example")}
${ex}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you tried all three worked examples and still cannot explain the reasoning step.")}`); }
function p05(l) { return shell(l, `${hero("P05 Guided Practice")}
${section(colors[0][0], colors[0][1], "Practice Focus", `<p>The guided practice checks this lesson target: ${l.purpose} It uses the mapped assessment stimulus: <strong>${l.stimulus}</strong>.</p>`)}
${section(colors[1][0], colors[1][1], "Before You Start", list(["Read the question first so you know what evidence to look for.", "Use the embedded evidence chart, graph, cladogram, table, timeline, model, or scenario before selecting an answer.", "Read feedback as instruction if you miss a question."]))}
${section(colors[2][0], colors[2][1], "Moodle Guided Practice", `<p>Complete the Moodle Guided Practice for this lesson. The practice is aligned only to this lesson's mapped standard(s), not future lessons.</p>`)}
${tor("after reviewing guided practice feedback if you still cannot connect the stimulus to the correct concept.")}`); }
function p06(l) { return shell(l, `${hero("P06 Independent Work")}
${section(colors[0][0], colors[0][1], "Instructions", `<p>Complete Parts A, B, and C in your notebook. Use the lesson evidence chart, graph, cladogram, classification table, timeline, or model as support.</p>`)}
${section(colors[1][0], colors[1][1], "Part A", `<p>${l.independent[0]}</p>`)}
${section(colors[2][0], colors[2][1], "Part B", `<p>${l.independent[1]}</p>`)}
${section(colors[3][0], colors[3][1], "Part C", `<p>${l.independent[2]}</p>`)}
${tor("if you completed Parts A and B but cannot write the Part C explanation.")}`); }
function p07(l) { return shell(l, `${hero("P07 Checkpoint")}
${section(colors[0][0], colors[0][1], "Teacher of Record Graded", `<p>This checkpoint is reviewed by your Teacher of Record. It shows whether you can use the lesson evidence and vocabulary independently.</p>`)}
${section(colors[1][0], colors[1][1], "Checkpoint Task", `<p>${l.checkpoint}</p>`)}
${section(colors[2][0], colors[2][1], "Notebook Evidence Submission", list(["P02 vocabulary and table/model notes.", "P03 reasoning routine and common mistake correction.", "P06 Parts A, B, and C.", "Final checkpoint response."]))}
${section("#334155", "#f8fafc", "Checkpoint Submission", `<p>Submit the required notebook evidence and final checkpoint response in the approved course location.</p>`)}
${section("#334155", "#f8fafc", "Submission Workflow", ol(["Review the lesson pages and notebook evidence before submitting.", "Check that your answer uses the embedded visual, data, model, table, graph, or scenario.", "Use Teacher of Record review feedback to correct or resubmit when the workflow requires it."]))}
${section(colors[3][0], colors[3][1], "Mastery Criteria", `<p>To meet mastery, your checkpoint must earn at least 80% and show accurate vocabulary, correct use of evidence, careful claim limits, and a complete explanation. If your work does not meet mastery, complete Teacher of Record intervention when required and resubmit corrections through the approved workflow.</p>`)}
${tor("if feedback shows that your answer is missing evidence, reasoning, or mapped lesson vocabulary.")}`); }
function json(l) { return JSON.stringify({ course: "Biology", unit: "Unit 05", lesson: `Lesson ${l.no}`, lessonTitle: l.title, mappedStandards: l.standards, supportStandards: l.support, lessonPurpose: l.purpose, pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"], masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment readiness" : "Lesson quiz"], labVisualSimulationRequirements: { labDataInvestigation: l.lab, requiredVisuals: l.visuals, candidateResourcesForApproval: l.resources, assessmentStimulus: l.stimulus }, asynchronousBoundary: "Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only." }, null, 2); }

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
console.log("Generated Biology Unit 5 lessons.");
