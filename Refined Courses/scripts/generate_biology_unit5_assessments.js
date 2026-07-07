const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 05");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "Evidence for Evolution",
    standards: ["MLA.BIO.EVO.01", "MLA.BIO.SCI.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Rock Layer</th><th>Relative Age</th><th>Fossil Trait</th></tr><tr><td>Lower layer</td><td>Older</td><td>Small jaw; simple limb bones</td></tr><tr><td>Middle layer</td><td>Intermediate</td><td>Larger jaw; more developed limb bones</td></tr><tr><td>Upper layer</td><td>Newer</td><td>Larger jaw; stronger limb bones</td></tr></table>`, stem: "Which claim is best supported by the fossil sequence?", correct: "The fossil record shows change in traits over time.", distractors: ["All organisms in the layers are identical.", "The newest fossils caused the older fossils to change.", "The table proves every species evolved from the same individual."], feedback: "Older-to-newer fossil layers can show patterns of trait change over time." },
      { html: `<table border="1" cellpadding="6"><tr><th>Organism</th><th>Forelimb Bone Pattern</th><th>Main Function</th></tr><tr><td>Human</td><td>Same basic bone order</td><td>Grasping</td></tr><tr><td>Cat</td><td>Same basic bone order</td><td>Walking</td></tr><tr><td>Whale</td><td>Same basic bone order</td><td>Swimming</td></tr></table>`, stem: "What does the homologous limb evidence suggest?", correct: "Similar structures with different functions can support common ancestry.", distractors: ["Similar bone patterns prove the organisms have the same exact lifestyle.", "Different functions mean the structures cannot be compared.", "The organisms developed limbs only because they wanted new functions."], feedback: "Homologous structures can have different functions while still supporting common ancestry." },
      { html: `<table border="1" cellpadding="6"><tr><th>Comparison</th><th>DNA Similarity</th></tr><tr><td>Species A and B</td><td>98%</td></tr><tr><td>Species A and C</td><td>72%</td></tr><tr><td>Species B and C</td><td>70%</td></tr></table>`, stem: "Which evolutionary relationship is best supported by the molecular data?", correct: "Species A and B are more closely related than either is to Species C.", distractors: ["Species A and C are most closely related.", "DNA evidence cannot be used to compare relationships.", "Species C must be the ancestor of both A and B."], feedback: "The highest DNA similarity supports the closest relationship in this data set." },
      { html: `<table border="1" cellpadding="6"><tr><th>Location</th><th>Observed Trait Pattern</th></tr><tr><td>Mainland</td><td>Seed-cracking beaks common</td></tr><tr><td>Island 1</td><td>Seed-cracking beaks with smaller body size</td></tr><tr><td>Island 2</td><td>Nectar-feeding beaks with similar body shape</td></tr></table>`, stem: "How can this biogeography evidence support evolution?", correct: "Related populations can become different after isolation in different environments.", distractors: ["Location never affects the evidence scientists examine.", "All island populations must stay identical to mainland populations.", "The table proves the organisms are unrelated because one trait differs."], feedback: "Geographic distribution can support relatedness and diversification after isolation." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence Type</th><th>Pattern</th></tr><tr><td>Fossils</td><td>Older-to-newer trait change</td></tr><tr><td>Anatomy</td><td>Similar limb bone patterns</td></tr><tr><td>DNA</td><td>High sequence similarity</td></tr></table>`, stem: "Why is the combined evidence stronger than one piece alone?", correct: "Different lines of evidence support the same evolutionary relationship.", distractors: ["Only fossil evidence is allowed in biology.", "Using more evidence always removes the need for reasoning.", "DNA evidence cancels anatomical evidence automatically."], feedback: "Converging evidence from several sources strengthens an evolutionary explanation." }
    ]
  },
  "02": {
    title: "Natural Selection",
    standards: ["MLA.BIO.EVO.02", "MLA.BIO.LAB.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Generation</th><th>Dark Moths</th><th>Light Moths</th><th>Tree Bark</th></tr><tr><td>1</td><td>20%</td><td>80%</td><td>Light</td></tr><tr><td>5</td><td>75%</td><td>25%</td><td>Darkened</td></tr></table>`, stem: "Which explanation best fits the data?", correct: "Dark coloration likely became more common because it improved camouflage on darkened bark.", distractors: ["Light moths changed color because they needed to.", "The dark moth percentage decreased over time.", "The environment did not create any selection pressure."], feedback: "The table shows dark moths increased when dark bark likely made them harder to see." },
      { html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Present?</th></tr><tr><td>Variation in beak size</td><td>Yes</td></tr><tr><td>Beak size is inherited</td><td>Yes</td></tr><tr><td>Food type changes</td><td>Yes</td></tr><tr><td>Some birds reproduce more</td><td>Yes</td></tr></table>`, stem: "Why can natural selection occur in this population?", correct: "The population has inherited variation and differential reproduction under a selection pressure.", distractors: ["All individuals are genetically identical.", "The trait is not inherited by offspring.", "Every bird reproduces at the exact same rate regardless of food."], feedback: "Natural selection requires inherited variation, a selection pressure, and differential survival or reproduction." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Drought scenario:</strong> A drought leaves mostly large hard seeds. Birds with larger stronger beaks crack more seeds and raise more offspring.</div>`, stem: "What is the selection pressure in this scenario?", correct: "The change to mostly large hard seeds", distractors: ["The birds deciding to grow stronger beaks", "The offspring teaching parents how to feed", "The complete absence of variation"], feedback: "The environmental food change is the pressure that affects which inherited traits are favored." },
      { html: `<table border="1" cellpadding="6"><tr><th>Trait</th><th>Average Offspring Surviving</th></tr><tr><td>Trait A</td><td>2</td></tr><tr><td>Trait B</td><td>7</td></tr><tr><td>Trait C</td><td>3</td></tr></table>`, stem: "If the traits are inherited, what should happen over generations?", correct: "Trait B should become more common.", distractors: ["Trait A must become the only trait immediately.", "Trait C must disappear before any reproduction occurs.", "Trait frequency cannot change when reproduction differs."], feedback: "Higher reproductive success can increase the frequency of an inherited trait." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Student claim:</strong> Rabbits grew thicker fur because they needed it during a cold winter.</div>`, stem: "What is the best correction to the claim?", correct: "Natural selection acts on existing inherited variation; individuals do not grow inherited traits simply because they need them.", distractors: ["Needs directly rewrite every rabbit's DNA in the same way.", "Natural selection never involves inherited traits.", "Cold environments cannot affect survival or reproduction."], feedback: "Selection favors existing inherited traits that improve survival or reproduction in a specific environment." }
    ]
  },
  "03": {
    title: "Genetic Variation and Evolutionary Change",
    standards: ["MLA.BIO.EVO.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Event</th><th>Population Effect</th></tr><tr><td>Several individuals move from Population A to Population B and reproduce</td><td>New alleles enter Population B</td></tr></table>`, stem: "Which mechanism is shown?", correct: "Gene flow", distractors: ["Genetic drift only", "No change in allele frequencies", "Fossil dating"], feedback: "Movement and reproduction between populations can transfer alleles, which is gene flow." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Bottleneck case:</strong> A random storm kills most members of a small population. The few survivors happen to carry allele r more often than allele R.</div>`, stem: "Which mechanism best explains the allele-frequency shift?", correct: "Genetic drift", distractors: ["Directional selection for the strongest allele only", "Gene expression", "Classification by kingdom"], feedback: "Random events can shift allele frequencies in small populations; that is genetic drift." },
      { html: `<table border="1" cellpadding="6"><tr><th>Original DNA Segment</th><td>A T G C</td></tr><tr><th>Changed DNA Segment</th><td>A T A C</td></tr><tr><th>Result</th><td>New allele appears</td></tr></table>`, stem: "What created the new allele?", correct: "Mutation", distractors: ["A cladogram branch point", "A fossil layer", "A learned behavior only"], feedback: "A change in DNA sequence can create a new allele." },
      { html: `<table border="1" cellpadding="6"><tr><th>Meiosis Event</th><th>Effect</th></tr><tr><td>Chromosomes exchange segments</td><td>New allele combinations form</td></tr><tr><td>Gametes receive different chromosome combinations</td><td>Variation increases</td></tr></table>`, stem: "Which source of variation is described?", correct: "Recombination and independent assortment during meiosis", distractors: ["Only fossil preservation", "All organisms becoming identical", "A population losing all inherited variation"], feedback: "Meiosis can reshuffle alleles into new combinations." },
      { html: `<table border="1" cellpadding="6"><tr><th>Generation</th><th>Allele A</th><th>Allele a</th><th>Population Size</th></tr><tr><td>1</td><td>50%</td><td>50%</td><td>12</td></tr><tr><td>2</td><td>25%</td><td>75%</td><td>12</td></tr></table>`, stem: "What is the most careful interpretation?", correct: "Allele frequencies changed; in a small population, chance could be a major factor.", distractors: ["Allele frequencies stayed the same.", "The table proves the a allele is always better in every environment.", "The table describes translation of mRNA."], feedback: "The data show an allele-frequency change, and small populations are strongly affected by chance." }
    ]
  },
  "04": {
    title: "Classification and Evolutionary Relationships",
    standards: ["MLA.BIO.EVO.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Cladogram Branch</th><th>Description</th></tr><tr><td>A and B</td><td>Share the most recent branch point</td></tr><tr><td>C</td><td>Branches earlier</td></tr><tr><td>D</td><td>Branches earliest</td></tr></table>`, stem: "Which pair is most closely related in this cladogram description?", correct: "A and B", distractors: ["A and D", "C and D", "B and D"], feedback: "The pair sharing the most recent branch point is the closest relationship shown." },
      { html: `<table border="1" cellpadding="6"><tr><th>Derived Trait</th><th>Lineages With Trait</th></tr><tr><td>Backbone</td><td>A, B, C, D</td></tr><tr><td>Amniotic egg</td><td>C, D</td></tr><tr><td>Hair</td><td>D only</td></tr></table>`, stem: "Which lineages share the derived trait amniotic egg?", correct: "C and D", distractors: ["A and B only", "D only", "A, B, C, and D all equally"], feedback: "The table lists C and D as the lineages with the amniotic egg trait." },
      { html: `<table border="1" cellpadding="6"><tr><th>Old Grouping</th><td>Species X grouped with Species Y by appearance</td></tr><tr><th>New DNA Evidence</th><td>Species X shares more DNA with Species Z</td></tr></table>`, stem: "What should scientists do with the classification?", correct: "Revise the classification if the DNA evidence better supports the relationship.", distractors: ["Ignore DNA evidence because old classifications never change.", "Classify X with both groups without evidence.", "Use only color and never compare molecules."], feedback: "Classification can be revised when stronger evidence supports a different relationship." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Cladogram term:</strong> A branch point shows where lineages split from an ancestral lineage.</div>`, stem: "What does a branch point represent?", correct: "A common ancestor or divergence point", distractors: ["A ranking from worst to best organism", "A guarantee that the rightmost organism is oldest", "A food chain step"], feedback: "A branch point represents a common ancestor or lineage split in the model." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Student claim:</strong> The species on the far right of a cladogram is the most evolved species.</div>`, stem: "What is the best correction?", correct: "A cladogram shows relationships, not a ladder ranking organisms from less evolved to more evolved.", distractors: ["The far-right species is always the direct ancestor of all others.", "The far-left species is always extinct.", "Cladograms cannot show common ancestry."], feedback: "Cladograms represent relatedness and branching, not value rankings or progress ladders." }
    ]
  },
  "05": {
    title: "Domains, Kingdoms, and Diversity",
    standards: ["MLA.BIO.EVO.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Cell Evidence</th><th>Observation</th></tr><tr><td>Nucleus</td><td>Present</td></tr><tr><td>Membrane-bound organelles</td><td>Present</td></tr></table>`, stem: "Which domain is best supported?", correct: "Eukarya", distractors: ["Bacteria", "Archaea only", "No domain can include cells with a nucleus"], feedback: "Cells with a nucleus and membrane-bound organelles belong to Eukarya." },
      { html: `<table border="1" cellpadding="6"><tr><th>Organism Evidence</th><th>Observation</th></tr><tr><td>Nucleus</td><td>Absent</td></tr><tr><td>Cell wall</td><td>Peptidoglycan present</td></tr></table>`, stem: "Which domain is best supported?", correct: "Bacteria", distractors: ["Eukarya", "Animalia", "Plantae"], feedback: "A prokaryote with peptidoglycan in the cell wall supports the domain Bacteria." },
      { html: `<table border="1" cellpadding="6"><tr><th>Organism Evidence</th><th>Observation</th></tr><tr><td>Nucleus</td><td>Absent</td></tr><tr><td>Cell membrane chemistry</td><td>Distinct from bacteria</td></tr><tr><td>Genetic evidence</td><td>Distinct from bacteria</td></tr></table>`, stem: "Which domain is most likely?", correct: "Archaea", distractors: ["Fungi", "Plants", "Animals"], feedback: "Archaea are prokaryotic but differ from bacteria in molecular and membrane evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Traits</th><th>Evidence</th></tr><tr><td>Cell type</td><td>Eukaryotic</td></tr><tr><td>Body form</td><td>Multicellular</td></tr><tr><td>Nutrition</td><td>Absorbs nutrients</td></tr><tr><td>Cell wall</td><td>Present</td></tr></table>`, stem: "Which kingdom is best supported?", correct: "Fungi", distractors: ["Animalia", "Bacteria", "Archaea"], feedback: "Multicellular eukaryotes that absorb nutrients and have cell walls are consistent with fungi." },
      { html: `<table border="1" cellpadding="6"><tr><th>Domain</th><th>Key Classification Evidence</th></tr><tr><td>Bacteria</td><td>Prokaryotic; bacterial molecular traits</td></tr><tr><td>Archaea</td><td>Prokaryotic; archaeal molecular traits</td></tr><tr><td>Eukarya</td><td>Nucleus; eukaryotic molecular traits</td></tr></table>`, stem: "What is the main purpose of the three-domain system?", correct: "To classify broad diversity using cellular and molecular evidence", distractors: ["To rank organisms from simple to valuable", "To group every organism by size only", "To ignore evolutionary relationships"], feedback: "The three-domain system organizes life using cellular and molecular evidence." }
    ]
  },
  "06": {
    title: "Origin-of-Life Explanations",
    standards: ["MLA.BIO.EVO.04", "MLA.BIO.SCI.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Simulation Input</th><th>Result</th></tr><tr><td>Early Earth gases + energy source</td><td>Amino acids detected</td></tr></table>`, stem: "What does this simulation evidence support?", correct: "Organic molecules could form under some modeled early Earth conditions.", distractors: ["A complete living cell was produced.", "All origin-of-life questions are fully answered.", "Scientific models do not need evidence."], feedback: "The simulation supports possible organic molecule formation, not the complete origin of life." },
      { html: `<table border="1" cellpadding="6"><tr><th>Model Observation</th><th>Limit</th></tr><tr><td>Vesicle-like structures form</td><td>They are not complete living cells</td></tr></table>`, stem: "What is the most accurate interpretation?", correct: "The model supports one possible step and has limits.", distractors: ["The model proves a complete cell formed.", "The model is useless because it has any limit.", "Limits should be removed from scientific explanations."], feedback: "Scientific models can support part of an explanation while still having limitations." },
      { html: `<table border="1" cellpadding="6"><tr><th>Statement</th><th>Can Evidence Test It?</th></tr><tr><td>Early Earth conditions may have allowed organic molecules to form</td><td>Yes, with models and chemical tests</td></tr><tr><td>Life appeared by an untestable claim with no evidence</td><td>No</td></tr></table>`, stem: "Which statement describes a scientific explanation?", correct: "It is testable and supported by evidence.", distractors: ["It never changes when new evidence appears.", "It avoids all models and data.", "It must answer every question before any part is useful."], feedback: "Scientific explanations are based on evidence, testable models, and careful limits." },
      { html: `<table border="1" cellpadding="6"><tr><th>Proposed Sequence</th><th>Evidence Focus</th></tr><tr><td>Early Earth conditions</td><td>Chemical environment</td></tr><tr><td>Organic molecules</td><td>Model and lab evidence</td></tr><tr><td>Protocell-like structures</td><td>Membrane-like models</td></tr></table>`, stem: "What does this timeline model represent?", correct: "A proposed sequence scientists can evaluate with evidence and limits.", distractors: ["A final proof of every detail of life's origin", "A food web of modern organisms", "A classification key for kingdoms only"], feedback: "The model organizes a proposed sequence but still requires evidence and limits." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Student claim:</strong> If an origin-of-life model does not answer every question, it provides no scientific value.</div>`, stem: "What is the best correction?", correct: "A model can be valuable when it explains part of a process and clearly states its limits.", distractors: ["A model is only scientific if it has no limits.", "Evidence is unnecessary if the model is interesting.", "All incomplete models should be accepted as final proof."], feedback: "Scientific models often explain part of a complex process and are evaluated by evidence and limitations." }
    ]
  },
  "07": {
    title: "Hominid Evolution Trends",
    standards: ["MLA.BIO.EVO.04"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Fossil Trait</th><th>Observation</th></tr><tr><td>Pelvis shape</td><td>Supports upright posture</td></tr><tr><td>Foot structure</td><td>Supports walking on two legs</td></tr></table>`, stem: "Which trend is best supported?", correct: "Bipedalism", distractors: ["Photosynthesis", "Aquatic breathing", "Loss of all skeletal evidence"], feedback: "Pelvis and foot evidence can support upright walking, or bipedalism." },
      { html: `<table border="1" cellpadding="6"><tr><th>Fossil Group</th><th>Average Cranial Capacity</th></tr><tr><td>Older group</td><td>Lower</td></tr><tr><td>Middle group</td><td>Intermediate</td></tr><tr><td>Later group</td><td>Higher</td></tr></table>`, stem: "What is the most careful conclusion?", correct: "The data show a broad cranial capacity trend across the fossil groups.", distractors: ["Higher cranial capacity proves moral superiority.", "The table proves every later fossil is a direct ancestor of every modern human.", "Cranial capacity data cannot show any trend."], feedback: "The table supports a trend, but it should not be turned into a value judgment or direct-ancestor claim." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Possible Inference</th></tr><tr><td>Stone tools near fossils</td><td>Tool use may have occurred</td></tr><tr><td>Cut marks on bones</td><td>Food processing behavior may have occurred</td></tr></table>`, stem: "What is the best use of this evidence?", correct: "It supports a behavioral inference with limits.", distractors: ["It proves every behavior of the organism.", "It replaces all skeletal fossil evidence.", "It shows the fossils are not biological evidence."], feedback: "Artifacts can support behavioral interpretations, but careful limits are needed." },
      { html: `<table border="1" cellpadding="6"><tr><th>Fossil</th><th>Relative Age</th><th>Trait</th></tr><tr><td>Fossil A</td><td>Older</td><td>Trait 1</td></tr><tr><td>Fossil B</td><td>Newer</td><td>Trait 1 plus Trait 2</td></tr></table>`, stem: "What should scientists avoid claiming from this evidence alone?", correct: "That Fossil A is definitely the direct ancestor of Fossil B.", distractors: ["That the fossils can provide evidence about traits.", "That relative age can be part of an interpretation.", "That traits can be compared across fossils."], feedback: "Age and trait similarity can support relationships, but direct ancestry needs stronger evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Trait</th><th>Older Fossil Pattern</th><th>Later Fossil Pattern</th></tr><tr><td>Jaw size</td><td>Larger</td><td>Smaller</td></tr><tr><td>Teeth</td><td>Larger</td><td>Smaller</td></tr><tr><td>Skull shape</td><td>Less rounded</td><td>More rounded</td></tr></table>`, stem: "Which conclusion is best supported?", correct: "The fossils show trait trends that can be used as evidence for evolutionary relationships.", distractors: ["The later fossil is automatically better in every way.", "Jaw and tooth traits cannot be evidence.", "The table proves there was no change over time."], feedback: "Trait comparisons across fossils can support evolutionary trend claims when interpreted carefully." }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.EVO.01", "MLA.BIO.EVO.02", "MLA.BIO.EVO.03", "MLA.BIO.EVO.04"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence Tool</th><th>Best Use</th></tr><tr><td>Fossil evidence table</td><td>Shows patterns of change over time</td></tr><tr><td>Selection frequency graph</td><td>Shows mechanism changing trait frequency</td></tr></table>`, stem: "Which synthesis statement is correct?", correct: "Evidence for evolution and mechanisms of evolution answer related but different questions.", distractors: ["Fossils and natural selection are the same kind of evidence.", "Trait frequencies cannot change in populations.", "Mechanisms are unnecessary when evidence is provided."], feedback: "Evidence can show patterns, while mechanisms help explain how populations change." },
      { html: `<table border="1" cellpadding="6"><tr><th>Species Pair</th><th>DNA Similarity</th><th>Cladogram Relationship</th></tr><tr><td>A and B</td><td>96%</td><td>Share recent branch</td></tr><tr><td>A and C</td><td>68%</td><td>Branch earlier</td></tr></table>`, stem: "Which claim is best supported?", correct: "DNA and cladogram evidence both support A and B as more closely related.", distractors: ["A and C are closest because they branch earlier.", "DNA evidence and cladograms can never be compared.", "A must be the ancestor of B."], feedback: "Both data sources point to a closer relationship between A and B." },
      { html: `<table border="1" cellpadding="6"><tr><th>Origin Model Evidence</th><th>Limit</th></tr><tr><td>Organic molecules form in a simulation</td><td>Complete cells are not produced</td></tr></table>`, stem: "What is the strongest scientific conclusion?", correct: "The evidence supports one possible step and should be stated with limits.", distractors: ["The model proves the complete origin of life.", "The evidence should be ignored because it has limits.", "Limits make the model non-scientific."], feedback: "A strong conclusion uses the evidence while naming what the model does not prove." },
      { html: `<table border="1" cellpadding="6"><tr><th>Hominid Evidence</th><th>Careful Interpretation</th></tr><tr><td>Pelvis and foot traits</td><td>Possible bipedalism</td></tr><tr><td>Cranial capacity pattern</td><td>Broad trend, not value ranking</td></tr></table>`, stem: "Which response avoids overclaiming?", correct: "The evidence supports trends, but it does not rank organisms by value or prove a simple ladder.", distractors: ["Later fossils are automatically superior.", "All fossils in a sequence are direct ancestors.", "Trends cannot be studied from fossil traits."], feedback: "Careful evolutionary reasoning uses trends without turning them into rankings or unsupported direct ancestry." },
      { html: `<table border="1" cellpadding="6"><tr><th>Question Type</th><th>Best Evidence Tool</th></tr><tr><td>Closest relationship</td><td>DNA table or cladogram</td></tr><tr><td>Trait frequency change</td><td>Selection graph or allele table</td></tr><tr><td>Broad diversity</td><td>Domain/kingdom chart</td></tr><tr><td>Hominid trend</td><td>Fossil trait table</td></tr></table>`, stem: "What is the best strategy for a mixed Unit 5 question?", correct: "Match the claim to the evidence tool that directly supports it.", distractors: ["Use the same evidence tool for every evolution question.", "Ignore the embedded stimulus and guess from familiar words.", "Choose the most extreme claim whenever fossils are mentioned."], feedback: "The correct evidence tool depends on the exact claim being assessed." }
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
    "Use the embedded Unit 5 evolution stimulus exactly as written.",
    "Focus on evidence from the graph, evidence chart, cladogram, classification table, timeline, or trend data.",
    "Connect the evidence to the mapped Biology evolution standard.",
    "Do not confuse evidence, mechanism, classification, and trend claims.",
    "Explain the evolution concept without overclaiming beyond the stimulus."
  ][variant % 5];
  const prompt = variant === 0 ? base.stem : `${base.stem} ${focus}`;
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${prompt}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the embedded evidence.", "This confuses a Unit 5 evolution concept.", "This goes beyond the provided stimulus."][i % 3]})`,
    feedback: `${["This choice does not use the included stimulus.", "This choice confuses evidence, mechanism, classification, or trend reasoning.", "This choice overstates or misreads the evidence."][i % 3]} Recheck the embedded table, graph, model, or scenario and connect the answer to the lesson standard.`
  }));
  const correct = {
    text: base.correct,
    feedback: `${base.feedback} This matches the mapped Unit 5 lesson content and uses the included stimulus.`
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
    const id = `${prefix}_U05_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
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
    const id = `${prefix}_U05_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}
function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(path.join(unitRoot, "Moodle XML", "BIO_U05_Pretest_MoodleXML.xml"), "BIOLOGY/Units/Unit 05/Pretest", buildUnitBank(coursePrefix, "PT", 10));

for (const lessonNo of Object.keys(lessons)) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U05_L${lessonNo}_GuidedPractice_MoodleXML.xml`), `BIOLOGY/Units/Unit 05/Lesson ${lessonNo}/GuidedPractice`, buildBank(coursePrefix, lessonNo, "GP", 5));
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U05_L${lessonNo}_Quiz_MoodleXML.xml`), `BIOLOGY/Units/Unit 05/Lesson ${lessonNo}/Quiz`, buildBank(coursePrefix, lessonNo, "QZ", 25));
}

writeXml(path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U05_UnitAssessment_MoodleXML.xml"), "BIOLOGY/Units/Unit 05/UnitAssessment", buildUnitBank(coursePrefix, "UA", 40));

console.log("Generated Biology Unit 5 Moodle XML assessments.");
