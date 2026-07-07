const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 04");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "DNA Replication and Genetic Information",
    standards: ["MLA.BIO.GEN.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Template DNA</th><th>A</th><th>T</th><th>C</th><th>G</th></tr><tr><th>Complement</th><td>?</td><td>?</td><td>?</td><td>?</td></tr></table>`, stem: "Which complementary DNA strand should be built from the template?", correct: "T A G C", distractors: ["A T C G", "U A G C", "C G A T"], feedback: "DNA replication uses complementary pairing: A-T and C-G." },
      { html: `<table border="1" cellpadding="6"><tr><th>Original Base</th><th>New Matching Base</th></tr><tr><td>A</td><td>T</td></tr><tr><td>T</td><td>A</td></tr><tr><td>C</td><td>G</td></tr><tr><td>G</td><td>C</td></tr></table>`, stem: "What does this table model?", correct: "DNA base-pairing rules used during replication", distractors: ["mRNA codon translation", "Punnett square probability", "Protein folding only"], feedback: "The table lists DNA base-pairing rules used to copy DNA." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Replication model:</strong> Each new DNA molecule contains one original strand and one newly built strand.</div>`, stem: "How does this model help conserve genetic information?", correct: "Each original strand serves as a template for an accurate complementary strand.", distractors: ["Both original strands are destroyed before copying.", "New DNA is built without base-pairing rules.", "The new strand is random and unrelated to the template."], feedback: "Template-based complementary copying preserves the sequence information." },
      { html: `<table border="1" cellpadding="6"><tr><th>Claim</th><th>Evidence</th></tr><tr><td>Replication is accurate</td><td>A pairs only with T; C pairs only with G</td></tr></table>`, stem: "Which reasoning best supports the claim?", correct: "Specific base-pairing rules reduce random copying errors.", distractors: ["Any base can pair with any other base.", "Accuracy comes from ignoring the template.", "Replication accuracy depends on phenotype only."], feedback: "Specific base-pairing rules make replication more accurate than random copying." },
      { html: `<table border="1" cellpadding="6"><tr><th>Step</th><th>Description</th></tr><tr><td>1</td><td>DNA strands separate</td></tr><tr><td>2</td><td>New nucleotides pair with templates</td></tr><tr><td>3</td><td>Two DNA molecules form</td></tr></table>`, stem: "Which event happens during Step 2?", correct: "Complementary nucleotides are added to each template strand.", distractors: ["A protein is translated at a ribosome.", "Gametes combine in fertilization.", "A Punnett square is filled in."], feedback: "Step 2 describes complementary nucleotide pairing during replication." }
    ]
  },
  "02": {
    title: "Gene Expression: Transcription and Translation",
    standards: ["MLA.BIO.GEN.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>DNA Template</th><td>A</td><td>C</td><td>T</td></tr><tr><th>mRNA</th><td>?</td><td>?</td><td>?</td></tr></table>`, stem: "What mRNA codon is transcribed from the DNA template?", correct: "U G A", distractors: ["T G A", "A C T", "C A U"], feedback: "In transcription, DNA A pairs with RNA U, C pairs with G, and T pairs with A." },
      { html: `<table border="1" cellpadding="6"><tr><th>mRNA Codon</th><th>Amino Acid/Signal</th></tr><tr><td>AUG</td><td>Methionine/start</td></tr><tr><td>UUU</td><td>Phenylalanine</td></tr><tr><td>UGA</td><td>Stop</td></tr></table>`, stem: "What does the codon AUG signal in this table?", correct: "Methionine/start", distractors: ["Stop", "Phenylalanine", "DNA replication"], feedback: "The codon table directly matches AUG to methionine/start." },
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Input</th><th>Output</th></tr><tr><td>Transcription</td><td>DNA template</td><td>mRNA</td></tr><tr><td>Translation</td><td>mRNA codons</td><td>Amino acid chain</td></tr></table>`, stem: "Which statement correctly follows the process table?", correct: "Transcription makes mRNA, and translation uses mRNA to build an amino acid chain.", distractors: ["Translation makes DNA directly from amino acids.", "Transcription occurs after the protein is complete.", "mRNA is not involved in gene expression."], feedback: "The table separates transcription and translation by input and output." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Gene expression model:</strong> DNA sequence -> mRNA codons -> amino acid chain -> protein function.</div>`, stem: "Why can gene expression affect phenotype?", correct: "Proteins made from genetic information can affect cell function and traits.", distractors: ["Phenotype is never connected to proteins.", "Codons are random and do not affect proteins.", "DNA is copied but never expressed."], feedback: "Protein function often influences phenotype, so expression can affect traits." },
      { html: `<table border="1" cellpadding="6"><tr><th>Sequence</th><th>Correct Reading</th></tr><tr><td>AUGUUUUGA</td><td>AUG | UUU | UGA</td></tr></table>`, stem: "Why is the sequence divided into groups of three?", correct: "Each codon is a three-base mRNA sequence.", distractors: ["Every amino acid has three proteins.", "DNA bases must always be read backward.", "Punnett squares require three alleles in every box."], feedback: "Translation reads mRNA in three-base codons." }
    ]
  },
  "03": {
    title: "Mutation, Phenotype, and Genetic Change",
    standards: ["MLA.BIO.GEN.02", "MLA.BIO.CEL.05"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Original DNA</th><td>A T G</td></tr><tr><th>Mutated DNA</th><td>A C G</td></tr></table>`, stem: "What mutation type is shown?", correct: "Substitution", distractors: ["Insertion", "Deletion", "Crossing over"], feedback: "One base changed from T to C, so the mutation is a substitution." },
      { html: `<table border="1" cellpadding="6"><tr><th>Original mRNA</th><td>AUG UUU GGA</td></tr><tr><th>Mutated mRNA</th><td>AUG UUC GGA</td></tr><tr><th>Amino Acid Result</th><td>Same amino acid for UUU and UUC</td></tr></table>`, stem: "What is the likely effect of this mutation?", correct: "It may be silent because the amino acid does not change.", distractors: ["It must always be harmful.", "It deletes the entire chromosome.", "It creates a Punnett square."], feedback: "If the amino acid is unchanged, the mutation may be silent." },
      { html: `<table border="1" cellpadding="6"><tr><th>Mutation Location</th><th>Can Be Passed to Offspring?</th></tr><tr><td>Body cell</td><td>Usually no</td></tr><tr><td>Gamete-producing cell lineage</td><td>Possible</td></tr></table>`, stem: "Which conclusion is supported?", correct: "Only mutations in cells involved in reproduction can be inherited.", distractors: ["Every body-cell mutation is inherited.", "No mutation can ever be inherited.", "Inheritance does not depend on cell type."], feedback: "Inherited mutations must be in cells that contribute genetic information to offspring." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Scenario:</strong> A mutation changes the shape of an enzyme active site, reducing enzyme activity.</div>`, stem: "How could this mutation affect phenotype?", correct: "It could change a cell process enough to affect an observable trait.", distractors: ["It cannot affect phenotype because proteins do not matter.", "It automatically improves every trait.", "It only changes a Punnett square label."], feedback: "Changing protein function can alter cell processes and may affect phenotype." },
      { html: `<table border="1" cellpadding="6"><tr><th>Original DNA</th><td>A T G C C A</td></tr><tr><th>Mutated DNA</th><td>A T G T C C A</td></tr></table>`, stem: "What mutation type is shown?", correct: "Insertion", distractors: ["Deletion", "Substitution only", "Codominance"], feedback: "The mutated sequence has an extra T added, so it is an insertion." }
    ]
  },
  "04": {
    title: "Mendelian Patterns of Inheritance",
    standards: ["MLA.BIO.GEN.01"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th></th><th>A</th><th>a</th></tr><tr><th>A</th><td>AA</td><td>Aa</td></tr><tr><th>a</th><td>Aa</td><td>aa</td></tr></table>`, stem: "What genotype ratio is shown?", correct: "1 AA : 2 Aa : 1 aa", distractors: ["4 AA : 0 Aa : 0 aa", "1 Aa : 3 aa", "2 AA : 2 aa only"], feedback: "The four boxes are AA, Aa, Aa, and aa." },
      { html: `<table border="1" cellpadding="6"><tr><th>Genotype</th><th>Phenotype</th></tr><tr><td>AA</td><td>Dominant trait</td></tr><tr><td>Aa</td><td>Dominant trait</td></tr><tr><td>aa</td><td>Recessive trait</td></tr></table>`, stem: "Using this model, what percent of Aa x Aa offspring show the dominant phenotype?", correct: "75%", distractors: ["25%", "50%", "100% recessive"], feedback: "AA, Aa, and Aa show the dominant phenotype: 3 out of 4, or 75%." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">Cross: aa x Aa. One parent can give only a. The other parent can give A or a.</div>`, stem: "Which offspring genotypes are possible?", correct: "Aa and aa", distractors: ["AA only", "AA and Aa only", "A and a are phenotypes"], feedback: "The aa parent contributes a; the Aa parent contributes A or a." },
      { html: `<table border="1" cellpadding="6"><tr><th>Term</th><th>Meaning</th></tr><tr><td>Genotype</td><td>Allele combination</td></tr><tr><td>Phenotype</td><td>Observable trait</td></tr></table>`, stem: "Which answer is a genotype?", correct: "Aa", distractors: ["Tall plant", "Purple flower", "Wrinkled seed"], feedback: "Aa is an allele combination, so it is a genotype." },
      { html: `<table border="1" cellpadding="6"><tr><th>Parent 1 Gametes</th><td>A</td><td>a</td></tr><tr><th>Parent 2 Gametes</th><td>A</td><td>a</td></tr></table>`, stem: "What does a Punnett square predict from these gametes?", correct: "Probabilities of possible offspring genotypes and phenotypes", distractors: ["The exact traits of one required child", "The DNA sequence of every chromosome", "The order of mitosis stages"], feedback: "A Punnett square is a probability model for possible offspring outcomes." }
    ]
  },
  "05": {
    title: "Non-Mendelian Inheritance Patterns",
    standards: ["MLA.BIO.GEN.01"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Pattern</th><th>Evidence Clue</th></tr><tr><td>Incomplete dominance</td><td>Heterozygote is intermediate</td></tr><tr><td>Codominance</td><td>Both traits appear together</td></tr></table>`, stem: "A red flower crossed with a white flower produces pink heterozygotes. Which pattern is suggested?", correct: "Incomplete dominance", distractors: ["Codominance", "Sex-linked inheritance", "Simple recessive only"], feedback: "An intermediate heterozygote supports incomplete dominance." },
      { html: `<table border="1" cellpadding="6"><tr><th>Fictional Genotype</th><th>Phenotype</th></tr><tr><td>RR</td><td>Red</td></tr><tr><td>WW</td><td>White</td></tr><tr><td>RW</td><td>Red and white spots</td></tr></table>`, stem: "Which inheritance pattern is shown by RW?", correct: "Codominance", distractors: ["Incomplete dominance", "Polygenic inheritance", "Deletion mutation"], feedback: "Both red and white appear together in the heterozygote, which supports codominance." },
      { html: `<table border="1" cellpadding="6"><tr><th>Trait Evidence</th><th>Likely Pattern</th></tr><tr><td>Many small phenotype differences across a population</td><td>?</td></tr></table>`, stem: "Which pattern best completes the table?", correct: "Polygenic inheritance", distractors: ["Codominance only", "DNA replication", "Mitosis"], feedback: "A continuous range of phenotypes often indicates multiple genes are involved." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Pedigree-style clue:</strong> A trait appears much more often in males and is linked to an allele on the X chromosome.</div>`, stem: "Which pattern is most likely?", correct: "Sex-linked inheritance", distractors: ["Incomplete dominance", "Multiple alleles only", "Photosynthesis"], feedback: "A trait linked to a sex chromosome is sex-linked." },
      { html: `<table border="1" cellpadding="6"><tr><th>Population Alleles for One Gene</th><td>IA</td><td>IB</td><td>i</td></tr></table>`, stem: "What pattern is supported by more than two allele versions in a population?", correct: "Multiple alleles", distractors: ["Only simple two-allele inheritance", "Crossing over", "Translation"], feedback: "More than two allele versions in the population supports a multiple-allele pattern." }
    ]
  },
  "06": {
    title: "Mitosis, Meiosis, and Genetic Variation",
    standards: ["MLA.BIO.GEN.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Product</th><th>Genetic Similarity</th></tr><tr><td>Mitosis</td><td>Body cells</td><td>Identical or nearly identical</td></tr><tr><td>Meiosis</td><td>Gametes</td><td>Varied</td></tr></table>`, stem: "Which process produces gametes?", correct: "Meiosis", distractors: ["Mitosis", "DNA replication only", "Transcription"], feedback: "The table shows meiosis produces gametes." },
      { html: `<table border="1" cellpadding="6"><tr><th>Process</th><th>Chromosome Number in Products</th></tr><tr><td>Mitosis</td><td>Same as parent cell</td></tr><tr><td>Meiosis</td><td>Half of parent cell</td></tr></table>`, stem: "Why is meiosis important for sexual reproduction?", correct: "It produces gametes with half the chromosome number.", distractors: ["It doubles the chromosome number in gametes.", "It makes only identical body cells.", "It prevents fertilization from restoring chromosome number."], feedback: "Gametes need half the chromosome number so fertilization can restore the full number." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Crossing-over model:</strong> Homologous chromosomes exchange DNA segments during meiosis.</div>`, stem: "How does crossing over affect offspring?", correct: "It creates new allele combinations that increase genetic variation.", distractors: ["It makes all gametes identical.", "It stops chromosomes from separating.", "It changes RNA into protein."], feedback: "Exchanging DNA segments creates new combinations of alleles." },
      { html: `<table border="1" cellpadding="6"><tr><th>Scenario</th><th>Best Process</th></tr><tr><td>Repairing skin after a scrape</td><td>?</td></tr></table>`, stem: "Which process best completes the table?", correct: "Mitosis", distractors: ["Meiosis", "Codominance", "Translation"], feedback: "Growth and repair of body cells use mitosis." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Conclusion</th></tr><tr><td>Four varied cells form from one starting cell</td><td>?</td></tr></table>`, stem: "Which conclusion is best supported?", correct: "The process is meiosis.", distractors: ["The process is mitosis only.", "The process is DNA transcription.", "The process is a Punnett square."], feedback: "Meiosis produces varied gametes, commonly represented as four products." }
    ]
  },
  "07": {
    title: "Biotechnology, Reproduction, Cell Cycle, and Health",
    standards: ["MLA.BIO.GEN.03", "MLA.BIO.GEN.04"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Biotechnology Case</th><th>Evidence</th></tr><tr><td>Bacteria engineered to make insulin</td><td>Insulin product detected after gene insertion</td></tr></table>`, stem: "What benefit is best supported by this case?", correct: "Producing a useful medicine with genetic engineering", distractors: ["Stopping all mutations in every organism", "Making mitosis unnecessary", "Proving all biotechnology is risk-free"], feedback: "The case evidence supports medicine production, not unlimited claims." },
      { html: `<table border="1" cellpadding="6"><tr><th>Cell-Cycle Control</th><th>Health Meaning</th></tr><tr><td>Checkpoints regulate division</td><td>Cells divide only when conditions are appropriate</td></tr><tr><td>Checkpoint failure</td><td>Uncontrolled division can occur</td></tr></table>`, stem: "How can failed cell-cycle control relate to cancer?", correct: "It can allow uncontrolled cell division.", distractors: ["It always improves tissue repair.", "It prevents all cells from dividing forever.", "It changes codons into Punnett squares."], feedback: "Cancer involves uncontrolled cell division, which can result from failed regulation." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Evidence limit:</strong> A study reports short-term benefit of a biotechnology product but gives no long-term safety data.</div>`, stem: "What is the most careful conclusion?", correct: "The short-term benefit is supported, but long-term risk needs more evidence.", distractors: ["The product is proven completely safe forever.", "The benefit must be false because risk data are missing.", "Evidence limits should be ignored."], feedback: "Scientific evaluation includes both supported conclusions and limitations." },
      { html: `<table border="1" cellpadding="6"><tr><th>Claim</th><th>Needed Evidence</th></tr><tr><td>A biotechnology process solves a health problem</td><td>Mechanism, benefit data, risk data, limits</td></tr></table>`, stem: "Why are risk data and limits needed?", correct: "They help evaluate the claim responsibly instead of overclaiming.", distractors: ["They make evidence unnecessary.", "They prove every biotechnology process is harmful.", "They replace the biological mechanism."], feedback: "Responsible evaluation weighs benefits, risks, mechanisms, and limits." },
      { html: `<table border="1" cellpadding="6"><tr><th>Reproduction Connection</th><th>Biology Link</th></tr><tr><td>Gametes carry alleles</td><td>Meiosis and inheritance</td></tr><tr><td>Embryo cells divide</td><td>Cell cycle and mitosis</td></tr></table>`, stem: "Which statement best connects reproduction and cell division?", correct: "Meiosis forms gametes, and mitosis supports growth after fertilization.", distractors: ["Mitosis forms all gametes.", "Meiosis repairs body tissue after every injury.", "Cell division is unrelated to reproduction."], feedback: "Both meiosis and mitosis have distinct roles in reproduction and growth." }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.GEN.01", "MLA.BIO.GEN.02", "MLA.BIO.GEN.03", "MLA.BIO.GEN.04"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Unit 4 Connection</th></tr><tr><td>DNA template A C T makes mRNA U G A</td><td>Gene expression</td></tr><tr><td>Aa x Aa gives AA, Aa, Aa, aa</td><td>Inheritance probability</td></tr></table>`, stem: "Which synthesis statement uses both rows correctly?", correct: "DNA information can be expressed, and allele combinations can be predicted with inheritance models.", distractors: ["mRNA codons are Punnett square boxes.", "Inheritance probability replaces gene expression.", "DNA templates are unrelated to traits."], feedback: "The synthesis correctly connects gene expression and inheritance models." },
      { html: `<table border="1" cellpadding="6"><tr><th>Model</th><th>What It Explains</th></tr><tr><td>Replication base-pairing</td><td>Copying information</td></tr><tr><td>Mutation sequence comparison</td><td>Possible DNA change</td></tr><tr><td>Meiosis diagram</td><td>Variation in gametes</td></tr></table>`, stem: "What theme connects all three models?", correct: "Genetic information can be copied, changed, and passed on with variation.", distractors: ["All three models explain photosynthesis.", "All three show only cell-cycle cancer data.", "None of the models involve DNA or inheritance."], feedback: "The models all deal with genetic information across copying, change, and inheritance." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;">CER prompt: Explain how a mutation in DNA could affect a trait and then be inherited.</div>`, stem: "Which explanation best answers the prompt?", correct: "A DNA mutation may alter a protein and phenotype, and it can be inherited if present in reproductive cells.", distractors: ["Every body-cell mutation is inherited automatically.", "Mutations never affect protein structure.", "Punnett squares change DNA sequences directly."], feedback: "The answer connects DNA mutation, protein/phenotype effect, and reproductive-cell inheritance." },
      { html: `<table border="1" cellpadding="6"><tr><th>Case Evidence</th><th>Careful Evaluation</th></tr><tr><td>Biotechnology product has benefit data but limited risk data</td><td>Benefit supported; more risk evidence needed</td></tr></table>`, stem: "Which Unit 4 skill is being used?", correct: "Evidence-based biotechnology evaluation", distractors: ["Ignoring all case limits", "Simple dominant/recessive prediction only", "DNA base pairing only"], feedback: "The table evaluates a biotechnology case using benefit, risk, and limitation evidence." },
      { html: `<table border="1" cellpadding="6"><tr><th>Concept</th><th>Evidence Tool</th></tr><tr><td>Gene expression</td><td>Codon table</td></tr><tr><td>Mendelian inheritance</td><td>Punnett square</td></tr><tr><td>Cell division variation</td><td>Meiosis diagram</td></tr></table>`, stem: "What is the best way to answer a mixed Unit 4 question?", correct: "Choose the evidence tool that matches the genetics concept being assessed.", distractors: ["Use the same tool for every genetics question.", "Ignore the embedded model and guess from vocabulary.", "Use outside health history instead of the given evidence."], feedback: "Mixed Unit 4 questions require matching the concept to the correct embedded evidence tool." }
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
    "Use the embedded Unit 4 genetics stimulus exactly as written.",
    "Focus on evidence from the sequence, model, Punnett square, or case table.",
    "Connect the evidence to the mapped Biology genetics standard.",
    "Do not confuse DNA copying, expression, inheritance, and cell division.",
    "Explain the genetics concept without adding outside content."
  ][variant % 5];
  const prompt = variant === 0 ? base.stem : `${base.stem} ${focus}`;
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${prompt}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the embedded evidence.", "This confuses a Unit 4 genetics process.", "This goes beyond the provided stimulus."][i % 3]})`,
    feedback: `${["This choice does not use the included stimulus.", "This choice confuses the mapped Unit 4 vocabulary or process.", "This choice overstates or misreads the evidence."][i % 3]} Recheck the sequence, table, model, or scenario and connect the answer to the lesson standard.`
  }));
  const correct = {
    text: base.correct,
    feedback: `${base.feedback} This matches the mapped Unit 4 lesson content and uses the included stimulus.`
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
    const id = `${prefix}_U04_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
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
    const id = `${prefix}_U04_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}
function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(path.join(unitRoot, "Moodle XML", "BIO_U04_Pretest_MoodleXML.xml"), "BIOLOGY/Units/Unit 04/Pretest", buildUnitBank(coursePrefix, "PT", 10));

for (const lessonNo of Object.keys(lessons)) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U04_L${lessonNo}_GuidedPractice_MoodleXML.xml`), `BIOLOGY/Units/Unit 04/Lesson ${lessonNo}/GuidedPractice`, buildBank(coursePrefix, lessonNo, "GP", 5));
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U04_L${lessonNo}_Quiz_MoodleXML.xml`), `BIOLOGY/Units/Unit 04/Lesson ${lessonNo}/Quiz`, buildBank(coursePrefix, lessonNo, "QZ", 25));
}

writeXml(path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U04_UnitAssessment_MoodleXML.xml"), "BIOLOGY/Units/Unit 04/UnitAssessment", buildUnitBank(coursePrefix, "UA", 40));

console.log("Generated Biology Unit 4 Moodle XML assessments.");
