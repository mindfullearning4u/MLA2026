const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 04");

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
  <div style="background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;"><strong>BIOLOGY | Unit 04 | Lesson ${l.no}</strong></div>
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
    no: "01", title: "DNA Replication and Genetic Information", standards: ["MLA.BIO.GEN.02"], support: ["SC.912.L.16.3", "ELA.K12.EE.2.1"],
    purpose: "Explain DNA replication and conservation of genetic information.",
    lab: "DNA replication model analysis.", visuals: ["DNA structure/replication diagram"], resources: ["OpenStax Biology 2e", "HHMI DNA resources", "CK-12"], stimulus: "DNA model/replication diagram",
    vocab: ["<strong>DNA:</strong> molecule that stores genetic information.", "<strong>Nucleotide:</strong> DNA building block made of sugar, phosphate, and base.", "<strong>Base pairing:</strong> A pairs with T, and C pairs with G.", "<strong>Replication:</strong> copying DNA before cell division.", "<strong>Template strand:</strong> original DNA strand used to build a complementary strand."],
    teach1: `<p>DNA stores inherited information in the order of bases. During replication, the two DNA strands separate. Each original strand acts as a template. New nucleotides pair by rule: A with T, and C with G. The result is two DNA molecules with the same genetic information.</p>${table(["Original Base", "New Matching Base"], [["A", "T"], ["T", "A"], ["C", "G"], ["G", "C"]])}`,
    teach2: `<p>Read DNA models one base at a time. Do not copy the same base onto the new strand unless the model asks for an identical sequence. Replication uses complementary base pairing so the information can be conserved across daughter cells.</p>`,
    bad: "Replication means the new strand has the exact same letters as the template strand.",
    good: "Replication builds a complementary strand using base-pairing rules.",
    explain: "The template and new strand are related by pairing rules, not by copying the same letter into every position.",
    examples: [
      ["Build a complementary strand", "Template strand: A T C G. What new strand forms?", ["Pair A with T. Why: A-T is a DNA base pair.", "Pair T with A. Why: pairing is complementary.", "Pair C with G and G with C. Why: C-G is the other base pair."], "The complementary strand is T A G C."],
      ["Explain information conservation", "How does replication conserve genetic information?", ["Start with each original strand as a template. Why: the template controls the new strand.", "Apply base-pairing rules. Why: rules make copying accurate.", "Produce two matching DNA molecules. Why: each has one original and one new strand."], "Conserved information comes from template-based copying."],
      ["Find an error", "A student pairs A with C. What is wrong?", ["Identify the claimed pair. Why: the mistake is in the pair.", "Recall the rule A pairs with T. Why: DNA pairing is specific.", "Correct A-C to A-T. Why: correct pairing preserves information."], "Accurate base pairing is essential for replication."]
    ],
    independent: ["Complete a complementary DNA strand from a template.", "Label template strand, new strand, and base pairs in a replication model.", "Write a CER response explaining how replication conserves genetic information."],
    checkpoint: "Use a DNA replication model to build a complementary strand and explain how genetic information is conserved."
  },
  {
    no: "02", title: "Gene Expression: Transcription and Translation", standards: ["MLA.BIO.GEN.02"], support: ["SC.912.L.16.5", "SC.912.L.16.9"],
    purpose: "Explain transcription, translation, and the universal genetic code.",
    lab: "Transcription/translation model and codon table analysis.", visuals: ["DNA to RNA to protein process diagram", "Codon table"], resources: ["HHMI BioInteractive", "Learn.Genetics", "OpenStax Biology 2e"], stimulus: "Gene expression diagram or codon table",
    vocab: ["<strong>Gene expression:</strong> using genetic information to make a functional product.", "<strong>Transcription:</strong> making RNA from a DNA template.", "<strong>mRNA:</strong> RNA message that carries codons.", "<strong>Translation:</strong> using mRNA codons to build a protein.", "<strong>Codon:</strong> three-base mRNA sequence that codes for an amino acid."],
    teach1: `<p>Gene expression connects DNA to proteins. First, transcription uses a DNA template to make mRNA. Then translation reads mRNA in three-base codons. Each codon matches an amino acid or a start/stop signal. Proteins help produce many traits because protein structure affects cell function.</p>${table(["Process", "Input", "Output", "Location in Eukaryotic Cells"], [["Transcription", "DNA template", "mRNA", "Nucleus"], ["Translation", "mRNA codons", "Amino acid chain", "Ribosome"]])}`,
    teach2: `<p>To use a codon table, first make sure the sequence is mRNA, not DNA. RNA uses U instead of T. Read bases in groups of three from the correct starting point. Then match each codon to the amino acid listed in the table.</p>`,
    bad: "A codon can be read as any three letters in any order.",
    good: "A codon is read as a specific three-base mRNA sequence in the correct order.",
    explain: "Changing the order changes the codon and can change the amino acid.",
    examples: [
      ["Transcribe DNA to mRNA", "DNA template: A C T. What mRNA codon forms?", ["Pair A in DNA with U in RNA. Why: RNA uses U instead of T.", "Pair C with G. Why: C-G pairing still applies.", "Pair T with A. Why: T in DNA pairs with A in RNA."], "The mRNA codon is U G A."],
      ["Use a codon table", "mRNA codon AUG codes for methionine/start in the provided table. What does AUG signal?", ["Confirm the sequence is mRNA. Why: codon tables use mRNA.", "Read AUG as one codon. Why: codons have three bases.", "Match AUG to the table entry. Why: the table provides the amino acid/signal."], "AUG signals methionine/start in the table."],
      ["Connect DNA to trait", "Why can a gene affect a trait?", ["A gene provides DNA instructions. Why: genes are DNA segments.", "Expression can produce a protein. Why: transcription and translation use the information.", "Protein function can affect phenotype. Why: traits often depend on protein activity."], "Gene expression links DNA information to phenotype."]
    ],
    independent: ["Transcribe three short DNA templates into mRNA codons.", "Use a codon table to identify amino acids from mRNA codons.", "Write a CER response explaining how gene expression connects DNA to protein."],
    checkpoint: "Use a gene expression model and codon table to explain transcription, translation, and the role of the genetic code."
  },
  {
    no: "03", title: "Mutation, Phenotype, and Genetic Change", standards: ["MLA.BIO.GEN.02", "MLA.BIO.CEL.05"], support: ["SC.912.L.16.4", "HE.912.C.1.7"],
    purpose: "Explain how mutations may affect phenotype and offspring.",
    lab: "Mutation scenario/data analysis.", visuals: ["Mutation comparison table", "Phenotype impact chart"], resources: ["HHMI BioInteractive", "NIH genetics resources", "CK-12"], stimulus: "Mutation sequence/table",
    vocab: ["<strong>Mutation:</strong> change in a DNA sequence.", "<strong>Substitution:</strong> one base is replaced by another.", "<strong>Insertion:</strong> one or more bases are added.", "<strong>Deletion:</strong> one or more bases are removed.", "<strong>Phenotype:</strong> observable trait or characteristic."],
    teach1: `<p>A mutation changes DNA sequence. Some mutations do not change the protein. Some change one amino acid. Insertions or deletions can shift the reading frame and change many codons. A mutation affects phenotype only when the DNA change changes a product or process enough to affect traits.</p>${table(["Mutation Type", "DNA Change", "Possible Effect"], [["Substitution", "One base replaced", "May change one codon"], ["Insertion", "Base added", "May shift reading frame"], ["Deletion", "Base removed", "May shift reading frame"], ["Silent", "Codon changes but amino acid same", "No protein change"]])}`,
    teach2: `<p>Do not assume every mutation is harmful. The effect depends on where the mutation happens, whether it changes protein structure or regulation, and whether it occurs in cells that can pass the change to offspring.</p>`,
    bad: "All mutations are harmful and always passed to offspring.",
    good: "Mutations can be harmful, neutral, or beneficial, and only inherited mutations can be passed to offspring.",
    explain: "Mutation effects must be evaluated from sequence, protein, cell type, and phenotype evidence.",
    examples: [
      ["Classify a mutation", "Original DNA: A T G. Mutated DNA: A C G. What type is shown?", ["Compare each position. Why: mutation type comes from sequence change.", "Notice T changed to C. Why: one base was replaced.", "Name substitution. Why: replacement of one base is substitution."], "This is a substitution mutation."],
      ["Predict possible phenotype impact", "A mutation changes an enzyme active site. Why might phenotype change?", ["Identify the affected product: enzyme. Why: proteins perform cell work.", "Connect active site to function. Why: shape affects substrate binding.", "Explain phenotype effect if cell process changes. Why: altered function can affect traits."], "Protein function can link mutation to phenotype."],
      ["Separate inherited and non-inherited mutations", "A mutation occurs in a skin cell. Is it automatically passed to offspring?", ["Identify the cell type. Why: skin cells are body cells.", "Recall inheritance requires reproductive cells. Why: offspring inherit from gametes.", "State it is not automatically inherited. Why: body-cell mutations usually affect only that organism."], "Cell type matters when discussing inheritance."]
    ],
    independent: ["Classify three mutation examples from sequence tables.", "Explain one possible neutral and one possible harmful mutation outcome.", "Write a CER response connecting mutation evidence to phenotype."],
    checkpoint: "Use a mutation sequence/table to classify the mutation and explain a possible phenotype or inheritance effect."
  },
  {
    no: "04", title: "Mendelian Patterns of Inheritance", standards: ["MLA.BIO.GEN.01"], support: ["SC.912.L.16.1", "MA.K12.MTR.7.1"],
    purpose: "Use Mendel's laws to analyze inheritance patterns.",
    lab: "Inheritance data evidence investigation.", visuals: ["Punnett squares", "Genotype/phenotype table"], resources: ["CK-12", "OpenStax Biology 2e", "Learn.Genetics"], stimulus: "Punnett square or inheritance table",
    vocab: ["<strong>Allele:</strong> version of a gene.", "<strong>Genotype:</strong> allele combination such as Aa.", "<strong>Phenotype:</strong> observable trait.", "<strong>Dominant allele:</strong> allele shown in phenotype when present in a simple dominant/recessive model.", "<strong>Recessive allele:</strong> allele shown only when no dominant allele is present in a simple model."],
    teach1: `<p>Mendelian inheritance uses allele combinations to predict possible offspring genotypes and phenotypes. In a simple dominant/recessive model, uppercase letters represent dominant alleles and lowercase letters represent recessive alleles. A Punnett square organizes possible allele combinations from two parents.</p>${table(["Genotype", "Phenotype in Simple Dominant/Recessive Model"], [["AA", "Dominant trait"], ["Aa", "Dominant trait"], ["aa", "Recessive trait"]])}`,
    teach2: `<p>Set up a Punnett square by placing one parent's alleles across the top and the other parent's alleles down the side. Combine one allele from each parent in every box. Then count genotypes and translate them into phenotype probabilities.</p>`,
    bad: "A Punnett square tells exactly which child will have which trait.",
    good: "A Punnett square predicts probabilities for possible offspring genotypes and phenotypes.",
    explain: "Inheritance predictions are probability models, not guarantees for one individual.",
    examples: [
      ["Complete a cross", "Parents Aa and Aa. What genotypes are possible?", ["Put A and a for one parent across the top. Why: each parent contributes one allele.", "Put A and a for the other parent on the side. Why: every box combines one allele from each.", "Fill boxes: AA, Aa, Aa, aa. Why: these are all combinations."], "The genotype ratio is 1 AA : 2 Aa : 1 aa."],
      ["Find phenotype probability", "Using Aa x Aa, what percent show dominant phenotype?", ["Use completed boxes. Why: phenotype comes from genotype.", "Count AA and Aa as dominant. Why: one dominant allele shows the dominant trait.", "Three of four boxes are dominant phenotype. Why: 3/4 equals 75%."], "Dominant phenotype probability is 75% in this model."],
      ["Explain recessive phenotype", "Why does aa show the recessive trait?", ["Identify both alleles. Why: genotype has two lowercase alleles.", "Notice no dominant allele is present. Why: dominant allele would mask recessive in this simple model.", "State recessive phenotype appears. Why: recessive trait shows when genotype is homozygous recessive."], "The recessive phenotype requires two recessive alleles in this model."]
    ],
    independent: ["Complete two Punnett squares.", "Convert genotype counts into phenotype percentages.", "Write a CER response explaining a Mendelian inheritance prediction."],
    checkpoint: "Use a Punnett square or inheritance table to predict genotypes, phenotypes, and probabilities."
  },
  {
    no: "05", title: "Non-Mendelian Inheritance Patterns", standards: ["MLA.BIO.GEN.01"], support: ["SC.912.L.16.2", "MA.K12.MTR.2.1"],
    purpose: "Analyze dominant, recessive, codominant, sex-linked, polygenic, and multiple-allele inheritance.",
    lab: "Pattern analysis using fictional inheritance data.", visuals: ["Codominance/sex-linked/polygenic examples", "Pedigree-style chart when appropriate"], resources: ["CK-12", "OpenStax Biology 2e", "Learn.Genetics"], stimulus: "Inheritance pattern table or pedigree-style chart",
    vocab: ["<strong>Incomplete dominance:</strong> heterozygote shows a blended/intermediate phenotype.", "<strong>Codominance:</strong> both alleles are fully expressed.", "<strong>Multiple alleles:</strong> more than two allele versions exist in a population.", "<strong>Sex-linked trait:</strong> gene located on a sex chromosome.", "<strong>Polygenic trait:</strong> trait influenced by multiple genes."],
    teach1: `<p>Not all inheritance follows a simple dominant/recessive pattern. In incomplete dominance, the heterozygote has an intermediate phenotype. In codominance, both alleles are visible. Multiple-allele traits have more than two allele versions in the population. Polygenic traits are influenced by several genes.</p>${table(["Pattern", "Evidence Clue"], [["Incomplete dominance", "Heterozygote is intermediate"], ["Codominance", "Both traits appear together"], ["Multiple alleles", "More than two allele options in population"], ["Sex-linked", "Pattern connected to sex chromosomes"], ["Polygenic", "Continuous range of phenotypes"]])}`,
    teach2: `<p>Identify the pattern from evidence, not from the trait name. Ask what happens in the heterozygote, how many alleles are involved in the population, whether the pattern follows sex chromosomes, and whether the phenotype shows a continuous range.</p>`,
    bad: "Every inheritance problem can be solved as simple dominant and recessive.",
    good: "Some traits follow non-Mendelian patterns, so the evidence must be checked before choosing a model.",
    explain: "Using the wrong inheritance model leads to wrong predictions.",
    examples: [
      ["Identify codominance", "A heterozygous fictional flower shows both red and white spots. What pattern is shown?", ["Identify heterozygote phenotype. Why: the pattern is visible there.", "Notice both traits appear. Why: neither allele is hidden.", "Name codominance. Why: both alleles are expressed."], "Both traits showing together supports codominance."],
      ["Identify incomplete dominance", "Red x white produces all pink offspring. What pattern is suggested?", ["Compare parent phenotypes. Why: parents show extremes.", "Observe offspring intermediate phenotype. Why: pink is between red and white.", "Name incomplete dominance. Why: heterozygote is intermediate."], "Intermediate heterozygote supports incomplete dominance."],
      ["Identify polygenic evidence", "A trait shows many small differences across a population. What pattern is likely?", ["Look for continuous variation. Why: many phenotypes suggest multiple influences.", "Connect multiple genes to range. Why: polygenic traits often show a spectrum.", "Avoid simple two-box thinking. Why: one-gene models do not explain continuous range well."], "Continuous variation supports polygenic inheritance."]
    ],
    independent: ["Classify fictional inheritance examples by pattern.", "Explain why one example is not simple dominant/recessive.", "Write a CER response using an inheritance pattern table."],
    checkpoint: "Use an inheritance pattern table or pedigree-style chart to identify the inheritance model and justify it with evidence."
  },
  {
    no: "06", title: "Mitosis, Meiosis, and Genetic Variation", standards: ["MLA.BIO.GEN.03"], support: ["SC.912.L.16.14", "SC.912.L.16.16", "SC.912.L.16.17"],
    purpose: "Compare cell division processes and their consequences for variation.",
    lab: "Cell division comparison model.", visuals: ["Mitosis/meiosis diagrams", "Chromosome number table", "Crossing-over model"], resources: ["HHMI BioInteractive", "OpenStax Biology 2e", "CK-12"], stimulus: "Cell division diagram/comparison",
    vocab: ["<strong>Mitosis:</strong> cell division producing genetically identical body cells.", "<strong>Meiosis:</strong> cell division producing gametes with half the chromosome number.", "<strong>Gamete:</strong> reproductive cell such as sperm or egg.", "<strong>Crossing over:</strong> exchange of DNA between homologous chromosomes.", "<strong>Genetic variation:</strong> differences in genetic information among individuals."],
    teach1: `<p>Mitosis supports growth, repair, and asexual cell replacement by producing genetically identical cells. Meiosis produces gametes for sexual reproduction. Meiosis reduces chromosome number by half and creates variation through crossing over and independent assortment.</p>${table(["Process", "Cell Type Produced", "Chromosome Number", "Genetic Similarity"], [["Mitosis", "Body cells", "Same as parent cell", "Identical or nearly identical"], ["Meiosis", "Gametes", "Half of parent cell", "Genetically varied"]])}`,
    teach2: `<p>Compare cell division by asking four questions: What kind of cell is produced? How many divisions occur? What happens to chromosome number? Does the process increase genetic variation? This keeps mitosis and meiosis from being mixed together.</p>`,
    bad: "Mitosis and meiosis both make identical body cells.",
    good: "Mitosis makes genetically identical body cells, while meiosis makes varied gametes with half the chromosome number.",
    explain: "The products and purpose of the two processes are different.",
    examples: [
      ["Identify mitosis", "A process makes two identical body cells for growth. Which process is shown?", ["Identify product: body cells. Why: product type is evidence.", "Notice identical cells. Why: mitosis maintains genetic information.", "Name mitosis. Why: mitosis supports growth and repair."], "Mitosis makes identical body cells."],
      ["Identify meiosis", "A process makes gametes with half the chromosome number. Which process is shown?", ["Identify product: gametes. Why: meiosis makes reproductive cells.", "Notice chromosome number is reduced. Why: gametes need half the number.", "Name meiosis. Why: meiosis creates gametes for sexual reproduction."], "Meiosis makes haploid gametes."],
      ["Explain variation", "How does crossing over increase variation?", ["Identify homologous chromosomes. Why: crossing over occurs between paired chromosomes.", "Describe DNA exchange. Why: pieces are swapped.", "Connect to new allele combinations. Why: exchanged DNA creates variation."], "Crossing over creates new chromosome combinations."]
    ],
    independent: ["Complete a mitosis/meiosis comparison table.", "Label chromosome number changes in a meiosis model.", "Write a CER response explaining how meiosis increases variation."],
    checkpoint: "Use a cell division comparison diagram to explain the products, chromosome changes, and variation outcomes of mitosis and meiosis."
  },
  {
    no: "07", title: "Biotechnology, Reproduction, Cell Cycle, and Health", standards: ["MLA.BIO.GEN.03", "MLA.BIO.GEN.04"], support: ["SC.912.L.16.8", "SC.912.L.16.10", "SC.912.L.16.13"],
    purpose: "Evaluate biotechnology and connect reproduction/cell-cycle concepts to health.",
    lab: "Biotechnology or cell-cycle case evidence analysis.", visuals: ["Biotechnology process diagram", "Cell-cycle model", "Case data table"], resources: ["HHMI BioInteractive", "NIH/NHGRI", "CDC/NIH health data"], stimulus: "Case evidence table or process diagram",
    vocab: ["<strong>Biotechnology:</strong> use of biological systems or molecules to solve problems.", "<strong>Genetic engineering:</strong> changing genetic material for a purpose.", "<strong>Cell cycle:</strong> ordered stages of cell growth and division.", "<strong>Cancer:</strong> disease involving uncontrolled cell division.", "<strong>Evidence-based evaluation:</strong> judging claims using data, benefits, risks, and limits."],
    teach1: `<p>Biotechnology applies genetics knowledge to real problems, such as producing medicines, comparing DNA evidence, or modifying organisms. Cell-cycle regulation matters because cells must divide in a controlled way. When control fails, uncontrolled division can contribute to cancer. Strong evaluations use case evidence, not fear or excitement alone.</p>${table(["Topic", "Evidence to Check", "Reasoning Focus"], [["Biotechnology", "Process, purpose, result", "Benefits, risks, limits"], ["Cell cycle", "Checkpoint/control model", "Regulated division"], ["Cancer", "Uncontrolled division evidence", "Health impact"], ["Reproduction", "Inheritance/cell division connection", "How traits or cells are passed on"]])}`,
    teach2: `<p>When evaluating a biotechnology case, separate what the evidence shows from what it does not show. Identify the biological process, the intended benefit, the possible risk or limit, and the data needed to support a claim.</p>`,
    bad: "All biotechnology is automatically safe or automatically unsafe.",
    good: "Biotechnology must be evaluated with evidence about purpose, benefits, risks, limits, and biological mechanism.",
    explain: "A scientific evaluation weighs evidence instead of using one-sided assumptions.",
    examples: [
      ["Evaluate a case", "A bacteria strain is engineered to produce human insulin. What benefit is shown?", ["Identify the biotechnology process. Why: the organism is engineered.", "Identify the product: insulin. Why: product connects to purpose.", "State the benefit: medicine production. Why: insulin can support health needs."], "The case shows a medical biotechnology benefit."],
      ["Connect cell cycle and cancer", "Why can failed cell-cycle control be harmful?", ["Identify normal control. Why: checkpoints regulate division.", "Describe failure: cells divide too much. Why: uncontrolled division disrupts tissues.", "Connect to cancer. Why: cancer involves uncontrolled cell growth."], "Cell-cycle regulation protects organism health."],
      ["Use evidence carefully", "A case table shows a benefit but no long-term risk data. What should be concluded?", ["Use the benefit evidence. Why: available data can support part of a claim.", "Identify missing risk data. Why: limits matter.", "Avoid overclaiming. Why: a full decision needs benefits and risks."], "Evidence-based evaluation includes limitations."]
    ],
    independent: ["Analyze a biotechnology case table for benefit, risk, and limitation.", "Explain how cell-cycle regulation connects to health.", "Write a CER response evaluating a biotechnology or health claim."],
    checkpoint: "Use a biotechnology/cell-cycle case table or process diagram to evaluate benefits, risks, limits, and health connections."
  },
  {
    no: "08", title: "Putting It All Together", standards: ["MLA.BIO.GEN.01", "MLA.BIO.GEN.02", "MLA.BIO.GEN.03", "MLA.BIO.GEN.04"], support: ["ELA.K12.EE.1.1", "MA.K12.MTR.6.1"],
    purpose: "Synthesize DNA, gene expression, mutation, inheritance, cell division, biotechnology, and health.",
    lab: "Unit synthesis across DNA, inheritance, cell division, biotechnology, and health.", visuals: ["DNA diagram", "Codon table", "Punnett square", "Cell division diagram", "Case table"], resources: ["Approved resources from Lessons 1-7 only"], stimulus: "Unit-level mixed stimuli from taught lessons",
    vocab: ["<strong>Synthesis:</strong> connecting multiple taught ideas with evidence.", "<strong>Genetic information:</strong> DNA instructions that can be copied and expressed.", "<strong>Inheritance:</strong> passing genetic information from parents to offspring.", "<strong>Variation:</strong> genetic differences produced by mutation, recombination, or inheritance.", "<strong>Application:</strong> using genetics knowledge in biotechnology or health decisions."],
    teach1: `<p>Unit 4 connects genetic information to inheritance and health. DNA is copied by replication. Genes can be expressed as proteins. Mutations can change DNA and sometimes phenotype. Inheritance models predict possible allele combinations. Meiosis produces variation in gametes. Biotechnology applies genetics knowledge to real cases.</p>${table(["Unit 4 Concept", "Evidence/Model", "What It Explains"], [["DNA replication", "Base-pairing diagram", "Conservation of information"], ["Gene expression", "Codon table", "DNA to protein"], ["Mutation", "Sequence comparison", "Possible phenotype change"], ["Inheritance", "Punnett square/pattern table", "Trait probability"], ["Cell division/biotech", "Comparison diagram/case table", "Variation and application"]])}`,
    teach2: `<p>A strong Unit 4 synthesis answer does not list genetics terms. It traces information: DNA is copied, expressed, changed, inherited, and applied. Each claim must point to the correct model or data source.</p>`,
    bad: "DNA, proteins, traits, and biotechnology are connected because they are all about genetics.",
    good: "DNA stores information, expression can produce proteins, mutations may change traits, inheritance passes alleles, and biotechnology applies genetics evidence to solve problems.",
    explain: "Synthesis must name specific relationships between the genetics concepts.",
    examples: [
      ["Connect DNA and protein", "How can a DNA change affect a protein?", ["Identify the DNA sequence change. Why: mutation starts at DNA.", "Connect DNA to mRNA codons. Why: expression reads sequence information.", "Connect codons to amino acids. Why: protein sequence can change."], "DNA changes may affect protein structure and function."],
      ["Connect meiosis and inheritance", "Why does meiosis matter for Punnett square predictions?", ["Identify gametes as meiosis products. Why: parents pass alleles through gametes.", "Connect allele combinations to offspring. Why: Punnett squares model gamete combinations.", "Explain variation. Why: meiosis can produce different gametes."], "Inheritance predictions depend on gamete formation."],
      ["Connect biotechnology and health", "How should a genetics case be evaluated?", ["Identify the biological mechanism. Why: the case must be scientifically grounded.", "Use evidence for benefits. Why: benefits must be supported.", "Check risks and limits. Why: responsible evaluation avoids overclaiming."], "Biotechnology decisions require evidence-based reasoning."]
    ],
    independent: ["Complete a mixed Unit 4 evidence table.", "Explain two connections between DNA, expression, inheritance, and variation.", "Write a synthesis CER using at least three Unit 4 concepts."],
    checkpoint: "Use mixed Unit 4 stimuli to write a synthesis response connecting DNA, gene expression, mutation, inheritance, cell division, biotechnology, and health."
  }
];

function p01(l) { return shell(l, `${hero("P01 Lesson Overview", l.title)}
${section(colors[0][0], colors[0][1], "Standards Covered in This Lesson", `<p><strong>Primary standard(s):</strong> ${l.standards.join(", ")}</p><p><strong>Support standard(s):</strong> ${l.support.join(", ")}</p>`)}
${section(colors[1][0], colors[1][1], "What You Will Learn", `<p>${l.purpose}</p>`)}
${section(colors[2][0], colors[2][1], "What You Will Do", list([`Analyze ${l.stimulus}.`, `Use tables, diagrams, graphs, and process models for this investigation: ${l.lab}`, "Write evidence-based explanations independently using the lesson pages."]))}
${section(colors[3][0], colors[3][1], "How You Will Show Mastery", `<p>You will complete notebook evidence, Moodle Guided Practice, independent work, and a Teacher of Record graded checkpoint with at least 80% mastery.</p>`)}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This lesson helps you explain how genetic information is copied, expressed, changed, inherited, or applied. Required visuals are included so you can use evidence instead of guessing from vocabulary alone.</p>`)}
${tor("if you reviewed the overview and still cannot explain what the lesson is asking you to master.")}`); }
function p02(l) { return shell(l, `${hero("P02 Notebook Task - Part 1", `Notebook Title: ${l.title}`)}
${section(colors[0][0], colors[0][1], "Vocabulary", list(l.vocab))}
${section(colors[1][0], colors[1][1], "Detailed Teaching Sequence", l.teach1)}
${section(colors[2][0], colors[2][1], "Notebook Task", `<p>Copy the table, diagram, model, Punnett square, or case evidence into your notebook. Add a final column titled <strong>Evidence clue</strong> and write the clue that supports each answer.</p>`)}
${tor("if you copied the visual/model and still cannot identify the evidence clue.")}`); }
function p03(l) { return shell(l, `${hero("P03 Notebook Task - Part 2")}
${section(colors[0][0], colors[0][1], "Continue the Teaching Sequence", l.teach2)}
${section(colors[1][0], colors[1][1], "Step-by-Step Reasoning Routine", ol(["Name the genetics process, pattern, model, or case claim in the question. Why: this prevents guessing from topic words only.", "Find the evidence in the sequence, codon table, Punnett square, diagram, or case table. Why: genetics answers must be supported by evidence.", "Connect the evidence to the mapped standard vocabulary. Why: the answer must stay inside the lesson scope.", "Explain the conclusion in one complete sentence. Why: mastery requires reasoning, not just naming."]))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you can name the concept but cannot explain the evidence behind it.")}`); }
function p04(l) { const ex = l.examples.map((e, i) => section(colors[i][0], colors[i][1], `Worked Example ${i + 1}: ${e[0]}`, `<p><strong>Problem:</strong> ${e[1]}</p>${ol(e[2].map((s, idx) => `<strong>Step ${idx + 1}:</strong> ${s}`))}<p><strong>Interpretation:</strong> ${e[3]}</p>`)).join("\n"); return shell(l, `${hero("P04 Worked Example")}
${ex}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you tried all three worked examples and still cannot explain the reasoning step.")}`); }
function p05(l) { return shell(l, `${hero("P05 Guided Practice")}
${section(colors[0][0], colors[0][1], "Practice Focus", `<p>The guided practice checks this lesson target: ${l.purpose} It uses the mapped assessment stimulus: <strong>${l.stimulus}</strong>.</p>`)}
${section(colors[1][0], colors[1][1], "Before You Start", list(["Read the question first so you know what evidence to look for.", "Use the embedded sequence, table, diagram, Punnett square, model, or scenario before selecting an answer.", "Read feedback as instruction if you miss a question."]))}
${section(colors[2][0], colors[2][1], "Moodle Guided Practice", `<p>Complete the Moodle Guided Practice for this lesson. The practice is aligned only to this lesson's mapped standard(s), not future lessons.</p>`)}
${tor("after reviewing guided practice feedback if you still cannot connect the stimulus to the correct concept.")}`); }
function p06(l) { return shell(l, `${hero("P06 Independent Work")}
${section(colors[0][0], colors[0][1], "Instructions", `<p>Complete Parts A, B, and C in your notebook. Use the lesson visual, model, sequence, table, Punnett square, or case evidence as support.</p>`)}
${section(colors[1][0], colors[1][1], "Part A", `<p>${l.independent[0]}</p>`)}
${section(colors[2][0], colors[2][1], "Part B", `<p>${l.independent[1]}</p>`)}
${section(colors[3][0], colors[3][1], "Part C", `<p>${l.independent[2]}</p>`)}
${tor("if you completed Parts A and B but cannot write the Part C explanation.")}`); }
function p07(l) { return shell(l, `${hero("P07 Checkpoint")}
${section(colors[0][0], colors[0][1], "Teacher of Record Graded", `<p>This checkpoint is reviewed by your Teacher of Record. It shows whether you can use the lesson evidence and vocabulary independently.</p>`)}
${section(colors[1][0], colors[1][1], "Checkpoint Task", `<p>${l.checkpoint}</p>`)}
${section(colors[2][0], colors[2][1], "Notebook Evidence Submission", list(["P02 vocabulary and table/model notes.", "P03 reasoning routine and common mistake correction.", "P06 Parts A, B, and C.", "Final checkpoint response."]))}
${section("#334155", "#f8fafc", "Checkpoint Submission", `<p>Submit the required notebook evidence and final checkpoint response in the approved course location.</p>`)}
${section("#334155", "#f8fafc", "Submission Workflow", ol(["Review the lesson pages and notebook evidence before submitting.", "Check that your answer uses the embedded visual, data, model, table, sequence, or scenario.", "Use Teacher of Record review feedback to correct or resubmit when the workflow requires it."]))}
${section(colors[3][0], colors[3][1], "Mastery Criteria", `<p>To meet mastery, your checkpoint must earn at least 80% and show accurate vocabulary, correct use of evidence, and a complete explanation. If your work does not meet mastery, complete Teacher of Record intervention when required and resubmit corrections through the approved workflow.</p>`)}
${tor("if feedback shows that your answer is missing evidence, reasoning, or mapped lesson vocabulary.")}`); }
function json(l) { return JSON.stringify({ course: "Biology", unit: "Unit 04", lesson: `Lesson ${l.no}`, lessonTitle: l.title, mappedStandards: l.standards, supportStandards: l.support, lessonPurpose: l.purpose, pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"], masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment readiness" : "Lesson quiz"], labVisualSimulationRequirements: { labDataInvestigation: l.lab, requiredVisuals: l.visuals, candidateResourcesForApproval: l.resources, assessmentStimulus: l.stimulus }, asynchronousBoundary: "Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only." }, null, 2); }

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
console.log("Generated Biology Unit 4 lessons.");
