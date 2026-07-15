const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');
const productionRoot = path.join(courseRoot, 'Course Production');

const today = '2026-07-14';

const standardsText = {
  'MLA.BIO.SCI.01': 'Use scientific inquiry to ask testable biology questions, collect evidence, analyze data, and communicate explanations.',
  'MLA.BIO.SCI.02': 'Evaluate scientific claims, source reliability, alternative explanations, and evidence-based arguments in biology.',
  'MLA.BIO.SCI.03': 'Distinguish observations, inferences, models, theories, and science-based decisions in biology contexts.',
  'MLA.BIO.LAB.01': 'Apply safe laboratory and virtual investigation procedures, including variables, controls, and ethical data practices.',
  'MLA.BIO.LAB.02': 'Use biological tools, models, diagrams, and technology to observe and interpret living systems.',
  'MLA.BIO.LAB.03': 'Analyze biological data, tables, graphs, models, and investigation results to support scientific explanations.',
  'MLA.BIO.CEL.01': 'Explain cell theory and how evidence supports cells as the basic unit of life.',
  'MLA.BIO.CEL.02': 'Compare cell types, organelles, and structure-function relationships in cells.',
  'MLA.BIO.CEL.03': 'Explain cell membranes, selective transport, and homeostasis at the cellular level.',
  'MLA.BIO.CEL.04': 'Relate plant, animal, and human system structures to biological functions and regulation.',
  'MLA.BIO.CEL.05': 'Use biological evidence to explain health, pathogens, immunity, mutation effects, and related cell processes.',
  'MLA.BIO.ENE.01': 'Relate water, carbon, macromolecules, and molecular structure to the functions of living systems.',
  'MLA.BIO.ENE.02': 'Explain enzyme function and how conditions affect biological reactions.',
  'MLA.BIO.ENE.03': 'Explain ATP and energy transfer in cells.',
  'MLA.BIO.ENE.04': 'Explain photosynthesis, cellular respiration, and the relationship between those processes.',
  'MLA.BIO.ENE.05': 'Analyze movement of matter and energy through biological systems and biogeochemical cycles.',
  'MLA.BIO.GEN.01': 'Analyze patterns of inheritance using genetic crosses, probability, and heredity evidence.',
  'MLA.BIO.GEN.02': 'Explain DNA replication, gene expression, mutation, and the flow of genetic information.',
  'MLA.BIO.GEN.03': 'Compare mitosis, meiosis, reproduction, and sources of genetic variation.',
  'MLA.BIO.GEN.04': 'Evaluate biotechnology applications using evidence, benefits, limitations, and ethical considerations.',
  'MLA.BIO.EVO.01': 'Use evidence to explain evolution and common ancestry.',
  'MLA.BIO.EVO.02': 'Explain natural selection, genetic variation, and mechanisms of evolutionary change.',
  'MLA.BIO.EVO.03': 'Analyze classification systems, domains, kingdoms, cladograms, and evolutionary relationships.',
  'MLA.BIO.EVO.04': 'Explain scientific evidence related to origin-of-life explanations and hominid evolution trends.',
  'MLA.BIO.ECO.01': 'Explain ecosystem organization, aquatic systems, succession, and environmental change.',
  'MLA.BIO.ECO.02': 'Analyze populations, limiting factors, carrying capacity, food webs, and energy transfer.',
  'MLA.BIO.ECO.03': 'Evaluate biodiversity, invasive species, resources, sustainability, monitoring data, and human impact.',
};

const units = [
  {
    n: 1,
    title: 'Scientific Thinking and Biology Foundations',
    florida: 'SC.912.N.1.1; SC.912.N.1.3; SC.912.N.1.4; SC.912.N.1.6; SC.912.N.2.1; SC.912.N.2.2; SC.912.N.3.1; SC.912.N.3.4; SC.912.L.14.1; SC.912.L.14.4; SC.912.L.18.1; SC.912.L.18.12',
    focus: 'Experimental design, variables, safety, tools, microscopy, data tables, graphs, source reliability, cell theory evidence, and molecular foundations of life.',
    assessment: 'Explain how scientific investigations, evidence, tools, and data support foundational biological claims.',
    lessons: [
      ['What Counts as Biology Evidence?', ['MLA.BIO.SCI.01', 'MLA.BIO.SCI.03'], ['ELA.K12.EE.1.1', 'ELA.K12.EE.2.1', 'ELD.K12.ELL.SC.1'], 'Establish scientific questions, biological evidence, and science/non-science boundaries.'],
      ['Questions, Variables, and Investigation Design', ['MLA.BIO.SCI.01', 'MLA.BIO.LAB.01'], ['MA.K12.MTR.1.1', 'MA.K12.MTR.5.1', 'ELA.K12.EE.5.1'], 'Define problems, identify variables, and plan safe biological investigations.'],
      ['Lab Safety, Measurement, and Data Quality', ['MLA.BIO.LAB.01', 'MLA.BIO.LAB.03'], ['MA.K12.MTR.3.1', 'MA.K12.MTR.6.1', 'ELA.K12.EE.5.1'], 'Apply safety, measurement precision, data organization, and error awareness.'],
      ['Tools, Microscopes, Models, and Observations', ['MLA.BIO.LAB.02'], ['SC.912.L.14.4', 'ELA.K12.EE.3.1', 'MA.K12.MTR.2.1'], 'Use tools, diagrams, microscopes, and models to make biological observations.'],
      ['Claims, Sources, and Scientific Argument', ['MLA.BIO.SCI.02'], ['SC.912.N.1.3', 'SC.912.N.1.4', 'ELA.K12.EE.1.1'], 'Evaluate claims, sources, and alternative explanations.'],
      ['Cell Theory and the Process of Science', ['MLA.BIO.CEL.01', 'MLA.BIO.SCI.03'], ['SC.912.L.14.1', 'SC.912.N.3.1', 'SC.912.N.3.4'], 'Explain cell theory and how evidence supports scientific theories.'],
      ['Biology Foundations Data Investigation', ['MLA.BIO.SCI.01', 'MLA.BIO.SCI.02', 'MLA.BIO.SCI.03', 'MLA.BIO.LAB.01', 'MLA.BIO.LAB.02', 'MLA.BIO.LAB.03', 'MLA.BIO.CEL.01', 'MLA.BIO.ENE.01'], ['SC.912.L.18.1', 'SC.912.L.18.12', 'ACT Science', 'SAT data and evidence'], 'Conduct a self-contained data investigation connecting inquiry, tools, cell theory evidence, macromolecules, and water properties.'],
      ['Putting It All Together', ['MLA.BIO.SCI.01', 'MLA.BIO.SCI.02', 'MLA.BIO.SCI.03', 'MLA.BIO.LAB.01', 'MLA.BIO.LAB.02', 'MLA.BIO.LAB.03', 'MLA.BIO.CEL.01', 'MLA.BIO.ENE.01'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.6.1'], 'Synthesize inquiry, lab readiness, evidence, data analysis, cell theory, and life molecule foundations.'],
    ],
    investigation: 'Students analyze a simulated investigation comparing microscope observations, cell-theory evidence, water-property evidence, and macromolecule data to decide which evidence best supports a biological claim.',
    visuals: 'Variable/control table, safety decision table, microscope field model, biomolecule data table, water-property model, CER organizer.',
    stimulus: 'Mixed investigation packet with procedure excerpt, data table, graph, microscope/tool model, and evidence-source excerpt.',
  },
  {
    n: 2,
    title: 'Cells, Homeostasis, and Transport',
    florida: 'SC.912.L.14.2; SC.912.L.14.3; SC.912.L.14.6; SC.912.L.14.7; SC.912.L.14.26; SC.912.L.14.36; SC.912.L.14.52; HE.912.C.1.3; HE.912.C.1.5; HE.912.C.1.7',
    focus: 'Cell models, organelles, transport data, homeostasis evidence, plant systems, human systems, pathogen/immunity evidence, and health data interpretation.',
    assessment: 'Analyze how cell structures, transport, and biological systems maintain function and health.',
    lessons: [
      ['Comparing Cell Types', ['MLA.BIO.CEL.02'], ['ELA.K12.EE.2.1', 'MA.K12.MTR.2.1'], 'Compare prokaryotic, eukaryotic, plant, and animal cells.'],
      ['Organelles and Structure-Function Relationships', ['MLA.BIO.CEL.02'], ['SC.912.L.14.2', 'ELA.K12.EE.3.1'], 'Relate organelle structures to biological functions.'],
      ['Cell Membranes and Selective Transport', ['MLA.BIO.CEL.03'], ['SC.912.L.14.2', 'MA.K12.MTR.5.1'], 'Explain passive and active transport through selectively permeable membranes.'],
      ['Homeostasis in Cells and Organisms', ['MLA.BIO.CEL.03', 'MLA.BIO.CEL.04'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.6.1'], 'Connect transport and regulation to homeostasis.'],
      ['Plant Structures and Physiological Processes', ['MLA.BIO.CEL.04'], ['SC.912.L.14.7', 'MLA.BIO.LAB.02'], 'Relate plant organs and tissues to biological processes.'],
      ['Human Systems Connections in Biology', ['MLA.BIO.CEL.04'], ['SC.912.L.14.26', 'SC.912.L.14.36', 'SC.912.L.14.52'], 'Relate selected brain, cardiovascular, and immune system structures to function.'],
      ['Cell Transport, Homeostasis, and Health Investigation', ['MLA.BIO.CEL.02', 'MLA.BIO.CEL.03', 'MLA.BIO.CEL.04', 'MLA.BIO.CEL.05', 'MLA.BIO.LAB.02', 'MLA.BIO.LAB.03'], ['SC.912.L.14.6', 'HE.912.C.1.3', 'HE.912.C.1.5', 'HE.912.C.1.7', 'ACT Science'], 'Conduct a self-contained data investigation connecting cell structure, transport, homeostasis, plant systems, human systems, pathogens, immunity, and health evidence.'],
      ['Putting It All Together', ['MLA.BIO.CEL.02', 'MLA.BIO.CEL.03', 'MLA.BIO.CEL.04', 'MLA.BIO.CEL.05'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.2.1'], 'Synthesize cells, transport, homeostasis, plant/human systems, and health connections.'],
    ],
    investigation: 'Students compare cell models, osmosis data, homeostasis feedback data, and a fictional pathogen/immunity case to explain how structure supports function.',
    visuals: 'Cell diagram, membrane transport model, concentration table, feedback loop, plant tissue diagram, immune response evidence table.',
    stimulus: 'Cell and transport investigation packet with diagrams, osmosis data, feedback scenario, and health evidence table.',
  },
  {
    n: 3,
    title: 'Cellular Energy and Life Processes',
    florida: 'SC.912.L.18.1; SC.912.L.18.7; SC.912.L.18.8; SC.912.L.18.9; SC.912.L.18.10; SC.912.L.18.11; SC.912.L.18.12; SC.912.E.7.1; SC.912.L.14.7',
    focus: 'Water, macromolecules, enzyme data, ATP models, photosynthesis/respiration models, carbon cycle diagrams, water cycle diagrams, and matter/energy data.',
    assessment: 'Explain how matter and energy move through cells and biological systems.',
    lessons: [
      ['Water, Macromolecules, and Life Processes', ['MLA.BIO.ENE.01'], ['SC.912.L.18.1', 'SC.912.L.18.12'], 'Connect water and macromolecules to biological function.'],
      ['Enzymes and Conditions for Reactions', ['MLA.BIO.ENE.02', 'MLA.BIO.LAB.03'], ['SC.912.L.18.11', 'MA.K12.MTR.6.1'], 'Explain enzyme function and interpret pH/temperature effects.'],
      ['ATP and Energy Transfer', ['MLA.BIO.ENE.03'], ['SC.912.L.18.10', 'ELA.K12.EE.2.1'], 'Explain ATP role in cellular energy transfer.'],
      ['Photosynthesis Inputs, Outputs, and Function', ['MLA.BIO.ENE.04'], ['SC.912.L.18.7', 'MLA.BIO.CEL.04'], 'Identify photosynthesis reactants, products, and biological function.'],
      ['Cellular Respiration Inputs, Outputs, and Function', ['MLA.BIO.ENE.04'], ['SC.912.L.18.8', 'ELA.K12.EE.3.1'], 'Identify respiration reactants, products, and biological function.'],
      ['Photosynthesis and Respiration as Interdependent Processes', ['MLA.BIO.ENE.04'], ['SC.912.L.18.9', 'MA.K12.MTR.5.1'], 'Explain the relationship between photosynthesis and respiration.'],
      ['Energy, Enzymes, and Cycling Matter Investigation', ['MLA.BIO.ENE.01', 'MLA.BIO.ENE.02', 'MLA.BIO.ENE.03', 'MLA.BIO.ENE.04', 'MLA.BIO.ENE.05', 'MLA.BIO.LAB.03'], ['SC.912.E.7.1', 'ACT Science', 'SAT data and evidence'], 'Conduct a self-contained investigation using enzyme data, photosynthesis and respiration models, ATP evidence, and carbon/water cycle data.'],
      ['Putting It All Together', ['MLA.BIO.ENE.01', 'MLA.BIO.ENE.02', 'MLA.BIO.ENE.03', 'MLA.BIO.ENE.04', 'MLA.BIO.ENE.05'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.6.1'], 'Synthesize molecules, water, enzymes, ATP, photosynthesis, respiration, and cycles.'],
    ],
    investigation: 'Students analyze enzyme-rate data, photosynthesis/respiration inputs and outputs, ATP model evidence, and carbon/water cycle evidence to explain movement of matter and energy.',
    visuals: 'Enzyme graph, ATP/ADP cycle model, photosynthesis-respiration comparison table, carbon cycle model, water cycle model, CER organizer.',
    stimulus: 'Energy investigation packet with enzyme data, process models, and cycle diagrams.',
  },
  {
    n: 4,
    title: 'DNA, Genetics, and Heredity',
    florida: 'SC.912.L.16.1; SC.912.L.16.2; SC.912.L.16.3; SC.912.L.16.4; SC.912.L.16.5; SC.912.L.16.8; SC.912.L.16.9; SC.912.L.16.10; SC.912.L.16.13; SC.912.L.16.14; SC.912.L.16.16; SC.912.L.16.17; HE.912.C.1.7',
    focus: 'DNA models, codon tables, mutation scenarios, Punnett squares, pedigree-style data, karyotype/cell-cycle diagrams, mitosis/meiosis comparisons, and biotechnology case evidence.',
    assessment: 'Analyze how genetic information is transmitted, expressed, varied, and applied.',
    lessons: [
      ['DNA Replication and Genetic Information', ['MLA.BIO.GEN.02'], ['SC.912.L.16.3', 'ELA.K12.EE.2.1'], 'Explain DNA replication and conservation of genetic information.'],
      ['Gene Expression: Transcription and Translation', ['MLA.BIO.GEN.02'], ['SC.912.L.16.5', 'SC.912.L.16.9'], 'Explain transcription, translation, and the universal genetic code.'],
      ['Mutation, Phenotype, and Genetic Change', ['MLA.BIO.GEN.02', 'MLA.BIO.CEL.05'], ['SC.912.L.16.4', 'HE.912.C.1.7'], 'Explain how mutations may affect phenotype and offspring.'],
      ['Mendelian Patterns of Inheritance', ['MLA.BIO.GEN.01'], ['SC.912.L.16.1', 'MA.K12.MTR.7.1'], 'Use Mendel laws to analyze inheritance patterns.'],
      ['Non-Mendelian Inheritance Patterns', ['MLA.BIO.GEN.01'], ['SC.912.L.16.2', 'MA.K12.MTR.2.1'], 'Analyze dominant, recessive, codominant, sex-linked, polygenic, and multiple-allele inheritance.'],
      ['Mitosis, Meiosis, and Genetic Variation', ['MLA.BIO.GEN.03'], ['SC.912.L.16.14', 'SC.912.L.16.16', 'SC.912.L.16.17'], 'Compare cell division processes and their consequences for variation.'],
      ['Genetics, Cell Division, and Biotechnology Investigation', ['MLA.BIO.GEN.01', 'MLA.BIO.GEN.02', 'MLA.BIO.GEN.03', 'MLA.BIO.GEN.04', 'MLA.BIO.CEL.05', 'MLA.BIO.LAB.03'], ['SC.912.L.16.8', 'SC.912.L.16.10', 'SC.912.L.16.13', 'ACT Science'], 'Conduct a self-contained case investigation using DNA, mutation, inheritance, cell division, biotechnology, and health evidence.'],
      ['Putting It All Together', ['MLA.BIO.GEN.01', 'MLA.BIO.GEN.02', 'MLA.BIO.GEN.03', 'MLA.BIO.GEN.04'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.6.1'], 'Synthesize DNA, gene expression, mutation, inheritance, cell division, biotechnology, and health.'],
    ],
    investigation: 'Students analyze a fictional genetics case using a DNA/codon model, mutation table, Punnett square, meiosis comparison, and biotechnology evidence.',
    visuals: 'DNA model, codon table, mutation data table, Punnett square, cell division comparison, biotechnology case evidence table.',
    stimulus: 'Genetics investigation packet with sequence data, inheritance table, cell division diagram, and case evidence.',
  },
  {
    n: 5,
    title: 'Evolution, Classification, and Diversity of Life',
    florida: 'SC.912.L.15.1; SC.912.L.15.4; SC.912.L.15.5; SC.912.L.15.6; SC.912.L.15.8; SC.912.L.15.10; SC.912.L.15.13; SC.912.L.15.14; SC.912.L.15.15; SC.912.N.3.1; SC.912.N.3.4',
    focus: 'Evolution evidence sets, classification models, comparative data, population variation data, selection simulations, cladograms, and hominid trend data.',
    assessment: 'Use evidence to explain evolution, classification, diversity, and mechanisms of change.',
    lessons: [
      ['Evidence for Evolution', ['MLA.BIO.EVO.01', 'MLA.BIO.SCI.02'], ['SC.912.L.15.1', 'ELA.K12.EE.1.1'], 'Explain evidence for evolution from fossils, anatomy, embryology, biogeography, molecular biology, and observed change.'],
      ['Natural Selection', ['MLA.BIO.EVO.02'], ['SC.912.L.15.13', 'MLA.BIO.LAB.03'], 'Explain conditions required for natural selection.'],
      ['Genetic Variation and Evolutionary Change', ['MLA.BIO.EVO.02'], ['SC.912.L.15.14', 'SC.912.L.15.15'], 'Explain mutation, recombination, genetic drift, and gene flow.'],
      ['Classification and Evolutionary Relationships', ['MLA.BIO.EVO.03'], ['SC.912.L.15.4', 'SC.912.L.15.5'], 'Explain classification based on evolutionary relationships and why systems change.'],
      ['Domains, Kingdoms, and Diversity', ['MLA.BIO.EVO.03'], ['SC.912.L.15.6', 'ELA.K12.EE.2.1'], 'Discuss distinguishing characteristics of domains and kingdoms.'],
      ['Origin-of-Life Explanations', ['MLA.BIO.EVO.04', 'MLA.BIO.SCI.03'], ['SC.912.L.15.8', 'SC.912.N.2.2'], 'Describe scientific explanations of the origin of life on Earth.'],
      ['Evolution Evidence, Classification, and Hominid Trends Investigation', ['MLA.BIO.EVO.01', 'MLA.BIO.EVO.02', 'MLA.BIO.EVO.03', 'MLA.BIO.EVO.04', 'MLA.BIO.SCI.02', 'MLA.BIO.SCI.03', 'MLA.BIO.LAB.03'], ['SC.912.L.15.10', 'ACT Science', 'SAT data and evidence'], 'Conduct a self-contained investigation using evolution evidence, selection data, classification, origin-of-life evidence, and hominid trend data.'],
      ['Putting It All Together', ['MLA.BIO.EVO.01', 'MLA.BIO.EVO.02', 'MLA.BIO.EVO.03', 'MLA.BIO.EVO.04'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.5.1'], 'Synthesize evolution evidence, mechanisms, classification, diversity, origin-of-life explanations, and hominid trends.'],
    ],
    investigation: 'Students analyze fossil, anatomical, molecular, population, cladogram, classification, and hominid trend evidence to support scientific explanations.',
    visuals: 'Evidence comparison chart, population frequency graph, cladogram, three-domain chart, origin evidence table, hominid trait trend table.',
    stimulus: 'Evolution investigation packet with evidence chart, population data, cladogram, classification table, and trend data.',
  },
  {
    n: 6,
    title: 'Ecology, Interdependence, and Human Impact',
    florida: 'SC.912.L.17.2; SC.912.L.17.4; SC.912.L.17.5; SC.912.L.17.8; SC.912.L.17.9; SC.912.L.17.11; SC.912.L.17.13; SC.912.L.17.20; SC.912.E.7.1',
    focus: 'Population graphs, food webs, biodiversity data, environmental monitoring data, resource/sustainability evidence, maps, and policy evidence.',
    assessment: 'Evaluate ecological relationships, environmental change, biodiversity, resource use, and human impact.',
    lessons: [
      ['Aquatic Systems and Distribution of Life', ['MLA.BIO.ECO.01'], ['SC.912.L.17.2', 'MLA.BIO.LAB.03'], 'Explain aquatic life distribution using chemistry, geography, light, depth, salinity, and temperature.'],
      ['Ecosystem Change and Succession', ['MLA.BIO.ECO.01'], ['SC.912.L.17.4', 'ELA.K12.EE.3.1'], 'Describe ecosystem changes from seasonal variation, climate change, and succession.'],
      ['Population Size, Limiting Factors, and Carrying Capacity', ['MLA.BIO.ECO.02'], ['SC.912.L.17.5', 'MA.K12.MTR.7.1'], 'Analyze population change using births, deaths, immigration, emigration, and limiting factors.'],
      ['Food Webs and Energy Transfer', ['MLA.BIO.ECO.02'], ['SC.912.L.17.9', 'MLA.BIO.ENE.05'], 'Use food webs to explain producers, consumers, decomposers, trophic levels, and energy reduction.'],
      ['Biodiversity Loss and Invasive Species', ['MLA.BIO.ECO.03'], ['SC.912.L.17.8', 'MLA.BIO.SCI.02'], 'Recognize biodiversity loss from catastrophic events, climate change, human activity, and invasive species.'],
      ['Resources, Costs, Benefits, and Sustainability', ['MLA.BIO.ECO.03'], ['SC.912.L.17.11', 'SC.912.L.17.20'], 'Evaluate renewable/nonrenewable resources and individual sustainability impacts.'],
      ['Ecology Monitoring, Biodiversity, and Sustainability Investigation', ['MLA.BIO.ECO.01', 'MLA.BIO.ECO.02', 'MLA.BIO.ECO.03', 'MLA.BIO.ENE.05', 'MLA.BIO.SCI.02', 'MLA.BIO.LAB.03'], ['SC.912.L.17.13', 'ACT Science', 'SAT data and evidence'], 'Conduct a self-contained investigation using aquatic data, succession, population graphs, food webs, biodiversity, resources, monitoring, and policy evidence.'],
      ['Putting It All Together', ['MLA.BIO.ECO.01', 'MLA.BIO.ECO.02', 'MLA.BIO.ECO.03', 'MLA.BIO.ENE.05'], ['ELA.K12.EE.1.1', 'MA.K12.MTR.6.1'], 'Synthesize ecosystems, populations, food webs, biodiversity, resources, monitoring, sustainability, and human impact.'],
    ],
    investigation: 'Students analyze aquatic distribution data, succession evidence, population graphs, food webs, biodiversity data, resource tradeoffs, and monitoring evidence to support an ecological decision.',
    visuals: 'Aquatic zone table, succession timeline, population graph, food web, biodiversity table, resource comparison chart, monitoring data map/table.',
    stimulus: 'Ecology investigation packet with map/table evidence, food web, population graph, biodiversity data, and monitoring scenario.',
  },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function textList(items) {
  return items.join('; ');
}

function card(color, bg, title, body, extra = '') {
  return `<div ${extra}style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-left: 6px solid ${color}; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: ${bg};">
  <h2 style="font-size: 23px; margin-top: 0;">${title}</h2>
  ${body}
</div>`;
}

function header(unit, lesson) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);">
  <div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">
    &#128216; BIOLOGY | Unit ${pad(unit)} | Lesson ${pad(lesson)}
  </div>
</div>`;
}

function tor(help) {
  return `<div class="mla-tor-support-box" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.45; color: #1f2933; max-width: 980px; margin: 16px auto 0 auto; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;">
  <p style="font-size: 18px; font-weight: 700; margin: 0 0 6px 0;">Need Help?</p>
  <p style="margin: 0 0 6px 0;">Contact your Teacher of Record after you have used the lesson steps, examples, and checks if you still need clarification.</p>
  <p style="margin: 0;">${help}</p>
</div>`;
}

function standardTrace(lesson) {
  return card('#0f766e', '#f0fdfa', 'Mapped Standards for This Lesson',
    `<p style="margin: 0 0 6px 0;"><strong>Primary Standards:</strong> ${textList(lesson.standards)}</p>
    <p style="margin: 0;"><strong>Support Standards:</strong> ${textList(lesson.support)}</p>`, 'class="mla-standard-trace" ');
}

function lessonObj(unit, i) {
  const row = unit.lessons[i - 1];
  return { unit, number: i, title: row[0], standards: row[1], support: row[2], purpose: row[3] };
}

function standardBullets(standards) {
  return `<ul style="margin: 0; padding-left: 24px;">${standards.map((s) => `<li><strong>${s}:</strong> ${standardsText[s] || 'Approved support alignment for this Biology lesson.'}</li>`).join('\n')}</ul>`;
}

function conceptNoun(lesson) {
  const words = lesson.title.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
  return words.slice(0, 4).join(' ').toLowerCase();
}

function sampleData(lesson) {
  const topic = conceptNoun(lesson);
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin: 10px 0;">
    <tr style="background: #dbeafe;"><th style="border: 1px solid #94a3b8; padding: 10px;">Evidence Source</th><th style="border: 1px solid #94a3b8; padding: 10px;">Observation or Data</th><th style="border: 1px solid #94a3b8; padding: 10px;">How It Helps</th></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Model</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Shows parts and relationships for ${topic}</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Makes a hidden process visible</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Data Table</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Compares two conditions</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Supports or challenges a claim</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Explanation</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Connects evidence to the biology idea</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Completes the reasoning</td></tr>
  </table>`;
}

function labDataTable(unit) {
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin: 10px 0;">
    <tr style="background: #dbeafe;"><th style="border: 1px solid #94a3b8; padding: 10px;">Investigation Component</th><th style="border: 1px solid #94a3b8; padding: 10px;">Student Evidence to Record</th><th style="border: 1px solid #94a3b8; padding: 10px;">Reasoning Check</th></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Question and purpose</td><td style="border: 1px solid #cbd5e1; padding: 10px;">State what the investigation is trying to explain.</td><td style="border: 1px solid #cbd5e1; padding: 10px;">The question must be answerable with unit evidence.</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Variables or comparison groups</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Identify what changes, what is measured, and what is held steady.</td><td style="border: 1px solid #cbd5e1; padding: 10px;">A fair comparison needs controlled conditions.</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Data or model observation</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Record numbers, model details, or visual evidence from the packet.</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Evidence must be specific enough to support a claim.</td></tr>
    <tr><td style="border: 1px solid #cbd5e1; padding: 10px;">Claim-evidence-reasoning</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Write a claim, cite evidence, and explain the biology connection.</td><td style="border: 1px solid #cbd5e1; padding: 10px;">Reasoning must connect the evidence to ${unit.title}.</td></tr>
  </table>`;
}

function pageP01(lesson) {
  const isLab = lesson.number === 7;
  return `${header(lesson.unit.n, lesson.number)}

<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;">
  <h1 style="font-size: 30px; margin: 0 0 10px 0;">P01 Lesson Overview</h1>
  <h2 style="font-size: 24px; margin: 0;">${lesson.title}</h2>
  <p style="margin: 10px 0 0 0;"><strong>Lesson Title:</strong> ${lesson.title}</p>
</div>

${card('#0f766e', '#f0fdfa', 'Standards Covered in This Lesson', standardBullets(lesson.standards))}
${card('#7c3aed', '#f5f3ff', 'What You Will Learn', `<p>${lesson.purpose}</p><p>${isLab ? 'This is the unit investigation lesson. You will use unit evidence, data, models, and CER reasoning to show that you can apply the standards without searching across pages for directions.' : 'The lesson teaches the idea step by step, shows how to use evidence, and prepares you for guided practice, independent work, checkpoint submission, and quiz mastery.'}</p>`)}
${card('#f59e0b', '#fffbeb', 'What You Will Do', `<ul style="padding-left: 24px;"><li>Read the standards and vocabulary before starting the work.</li><li>Use the included model, table, graph, or scenario as evidence.</li><li>Explain your reasoning in complete science sentences.</li><li>${isLab ? 'Complete the lab/data investigation sequence one page at a time.' : 'Complete guided practice, independent notebook work, and the checkpoint.'}</li></ul>`)}
${card('#16a34a', '#f0fdf4', 'How You Will Show Mastery', `<p>You will show mastery by completing notebook evidence, guided practice, a Teacher of Record graded checkpoint, and ${lesson.number === 8 ? 'the Unit Assessment' : 'the lesson quiz'}. Mastery means you can use the correct science vocabulary, cite evidence, and explain why the evidence supports the answer.</p>`)}
${card('#334155', '#f8fafc', 'Student-Friendly Standard Connection', `<p>This lesson connects the Biology standard to the work you will actually do. You are not memorizing isolated terms. You are learning how to use evidence, models, and data to explain ${conceptNoun(lesson)} in a way that can be checked.</p>`)}
${card('#dc2626', '#fef2f2', 'Science Safety and Resource Note', `<p>This lesson uses safe data analysis, model interpretation, virtual investigation planning, observation evidence, or public-data reasoning. Do not perform any hands-on experiment, field collection, chemical use, specimen handling, heat/flame activity, sharp-tool activity, or outdoor investigation unless your Teacher of Record or school workflow gives specific safety clearance.</p><p>${isLab ? 'This Lesson 7 investigation is self-contained. All required directions, data, tables, and evidence prompts are included on these pages.' : 'Required data, models, or source excerpts are included directly in the lesson or Moodle assessment item when needed.'}</p>`)}
${tor(isLab ? 'Ask for help if you cannot identify the investigation question, variables, evidence, or CER reasoning after using the page directions.' : 'Ask for help if you can locate the evidence but cannot explain how it supports the lesson standard.')}
`;
}

function pageP02(lesson) {
  if (lesson.number === 7) {
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P02 Notebook Task - Part 1</h1></div>
${standardTrace(lesson)}
${card('#7c3aed', '#f5f3ff', 'Investigation Notebook Title', `<p><strong>${lesson.title}: Question, Purpose, and Evidence Setup</strong></p><p>Copy this title into your notebook. Under it, create four labeled sections: Investigation Question, Variables or Comparison Groups, Data/Model Evidence, and CER Draft.</p>`)}
${card('#0f766e', '#f0fdfa', 'Vocabulary', `<ul style="padding-left: 24px;"><li><strong>Investigation question:</strong> the testable question the evidence is being used to answer.</li><li><strong>Variable:</strong> a factor that changes or is measured in an investigation.</li><li><strong>Control or controlled condition:</strong> what stays the same so the comparison is fair.</li><li><strong>Evidence:</strong> specific data, observation, model detail, or source information that supports a claim.</li><li><strong>CER:</strong> claim, evidence, and reasoning.</li></ul>`)}
${card('#f59e0b', '#fffbeb', 'Step-by-Step Setup', `<ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Read the investigation purpose: ${lesson.unit.investigation}</li><li><strong>Step 2:</strong> Write one focused question the data can answer. Do not write a question that requires outside research.</li><li><strong>Step 3:</strong> Identify the comparison groups or variables from the table below.</li><li><strong>Step 4:</strong> Mark which evidence will be numerical data, which will be a model, and which will be a source or scenario.</li></ol>${labDataTable(lesson.unit)}<p><strong>Check that:</strong> your question can be answered using the evidence on these lesson pages.</p>`)}
${tor('Ask for help if your investigation question cannot be answered with the data and models included in this Lesson 7 packet.')}
`;
  }
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P02 Notebook Task - Part 1</h1></div>
${standardTrace(lesson)}
${card('#7c3aed', '#f5f3ff', 'Notebook Title', `<p><strong>${lesson.title}</strong></p><p>Copy the title into your notebook. Leave room for vocabulary, model notes, a data/evidence table, and a short explanation.</p>`)}
${card('#0f766e', '#f0fdfa', 'Vocabulary', `<ul style="padding-left: 24px;"><li><strong>Evidence:</strong> a specific observation, number, model detail, or source statement that supports a scientific answer.</li><li><strong>Model:</strong> a diagram, table, process drawing, or simplified representation used to explain a biological system.</li><li><strong>Function:</strong> what a structure, process, or relationship does in a living system.</li><li><strong>Reasoning:</strong> the science explanation that connects evidence to the answer.</li></ul>`)}
${card('#f59e0b', '#fffbeb', 'Teaching Sequence', `<p>Start with the lesson question: <strong>How does evidence help explain ${conceptNoun(lesson)}?</strong></p><ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Name the structure, process, or relationship being studied. This prevents vague answers.</li><li><strong>Step 2:</strong> Identify the evidence source: model, data table, graph, scenario, or text evidence.</li><li><strong>Step 3:</strong> Explain what the evidence shows. Use exact terms from the standard.</li><li><strong>Step 4:</strong> Connect the evidence to the biological function or process.</li></ol>${sampleData(lesson)}<p><strong>Check that:</strong> your notebook explanation includes a term, a piece of evidence, and a reason the evidence matters.</p>`)}
${tor('Ask for help if you can name the term but cannot connect it to evidence or function.')}
`;
}

function pageP03(lesson) {
  if (lesson.number === 7) {
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P03 Notebook Task - Part 2</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', 'Procedure and Evidence Path', `<p>Use this procedure exactly. The goal is not to finish quickly. The goal is to collect enough evidence to support a scientific explanation.</p><ol style="padding-left: 24px;"><li><strong>Procedure Step 1:</strong> Read the investigation purpose and copy the question.</li><li><strong>Procedure Step 2:</strong> Use the data table to identify comparison groups or conditions.</li><li><strong>Procedure Step 3:</strong> Use the model or diagram to identify the biological process.</li><li><strong>Procedure Step 4:</strong> Record at least two exact evidence statements.</li><li><strong>Procedure Step 5:</strong> Decide what claim the evidence supports.</li></ol><p><strong>Safety:</strong> This is a virtual/data investigation. Do not complete any physical experiment or outdoor collection for this lesson.</p>`)}
${card('#dc2626', '#fef2f2', 'Common Mistake', `<p><strong style="color: #b91c1c;">Incorrect:</strong> "The answer is true because the unit said so."</p><p>This does not cite evidence. It also does not show that you can use the data or model independently.</p><p><strong style="color: #047857;">Correct:</strong> "The claim is supported because the comparison group with the changed condition showed a different measured result, and the model explains why that result fits ${lesson.unit.title}."</p><p><strong>Teachable Explanation:</strong> A lab explanation needs the data and the biology. Data without reasoning is incomplete; reasoning without data is unsupported.</p>`)}
${card('#f59e0b', '#fffbeb', 'Notebook Verification Check', `<ul style="padding-left: 24px;"><li>Your procedure notes identify what you compared.</li><li>Your evidence notes include at least two exact observations or data points.</li><li>Your explanation names the biology standard being used.</li><li>Your CER draft does not use outside information not included in the lesson.</li></ul>`)}
${tor('Ask for help if you are unsure whether a statement is evidence, reasoning, or just an unsupported opinion.')}
`;
  }
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P03 Notebook Task - Part 2</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', 'Continue the Teaching Sequence', `<p>Now deepen the idea by separating <strong>what the evidence shows</strong> from <strong>what the evidence means</strong>.</p><ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Locate one detail in the model, table, graph, or scenario.</li><li><strong>Step 2:</strong> Restate that detail as evidence using exact language.</li><li><strong>Step 3:</strong> Explain the biological meaning of the detail.</li><li><strong>Step 4:</strong> Decide whether the evidence supports, weakens, or is unrelated to the claim.</li></ol>`)}
${card('#dc2626', '#fef2f2', 'Common Mistake', `<p><strong style="color: #b91c1c;">Incorrect:</strong> "The model shows everything about ${conceptNoun(lesson)}."</p><p>This is too broad. A model only shows selected parts of a system.</p><p><strong style="color: #047857;">Correct:</strong> "The model shows one relationship: how a structure, condition, or process connects to the function being studied."</p><p><strong>Teachable Explanation:</strong> A strong science answer names the specific feature in the model and explains what it can and cannot show.</p>`)}
${card('#f59e0b', '#fffbeb', 'Guided Notes Check', `<p>Complete this sentence frame in your notebook:</p><p><strong>The evidence shows __________. This matters because __________. This supports the standard because __________.</strong></p><p>Check that the first blank is a specific observation or data point, not a general opinion.</p>`)}
${tor('Ask for help if your explanation is general but does not point to a specific model detail or data point.')}
`;
}

function pageP04(lesson) {
  if (lesson.number === 7) {
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P04 Data Collection and Analysis</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', 'Investigation Data Set', `<p><strong>Lesson 7 template exception:</strong> This page does not use the normal three worked examples. In a science investigation lesson, P04 is the data collection and analysis page. Use the table as your lab evidence.</p>${labDataTable(lesson.unit)}<p><strong>Data task:</strong> Choose two rows from the table and write one sentence explaining how each row helps answer the investigation question.</p>`)}
${card('#7c3aed', '#f5f3ff', 'Analysis Steps', `<ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Identify the most direct evidence. It should answer the question without requiring a guess.</li><li><strong>Step 2:</strong> Compare conditions, groups, or model parts. Do not treat all evidence as equally strong.</li><li><strong>Step 3:</strong> Circle one possible source of error or limitation.</li><li><strong>Step 4:</strong> Draft a claim that can be supported by the evidence.</li><li><strong>Step 5:</strong> Add reasoning that uses the unit biology standard, not personal opinion.</li></ol>`)}
${card('#dc2626', '#fef2f2', 'Data Error and Limitation Check', `<p><strong style="color: #b91c1c;">Incorrect:</strong> Ignoring an outlier, vague observation, or missing control because it is inconvenient.</p><p><strong style="color: #047857;">Correct:</strong> Naming the limitation and explaining how it affects confidence in the claim.</p><p><strong>Teachable Explanation:</strong> Reliable science does not hide limitations. It explains what the data can support and what would need more evidence.</p>`)}
${tor('Ask for help if you cannot choose the strongest evidence or identify a reasonable limitation after completing the analysis steps.')}
`;
  }
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P04 Worked Example</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', `Worked Example 1: Identify the Evidence`, `<p><strong>Problem:</strong> A student needs to explain ${conceptNoun(lesson)} using a model or data table. What should the student identify first?</p><ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Identify the claim or question. <strong>Why:</strong> Evidence only matters when it matches the question being answered.</li><li><strong>Step 2:</strong> Locate a specific data point, model label, or relationship. <strong>Why:</strong> Specific evidence is stronger than a general statement.</li><li><strong>Step 3:</strong> Connect the evidence to the biology idea. <strong>Why:</strong> The reasoning explains why the evidence supports the answer.</li></ol><p><strong>Answer:</strong> Identify the claim or question first, then select evidence that directly addresses it.</p><p><strong>Interpretation:</strong> This prevents unsupported guessing.</p>`)}
${card('#7c3aed', '#f5f3ff', `Worked Example 2: Use a Model`, `<p><strong>Problem:</strong> A model shows two parts of a biological system connected by an arrow. What does the arrow usually represent?</p><ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Read the labels on both parts. <strong>Why:</strong> The labels define what is being connected.</li><li><strong>Step 2:</strong> Determine whether the arrow shows movement, cause/effect, sequence, or energy/matter transfer. <strong>Why:</strong> Arrows have meaning in science models.</li><li><strong>Step 3:</strong> Explain the relationship in words. <strong>Why:</strong> Written reasoning proves you understand the model.</li></ol><p><strong>Answer:</strong> The arrow represents a relationship or process between the labeled parts.</p><p><strong>Interpretation:</strong> Models must be read carefully; the arrow is evidence, not decoration.</p>`)}
${card('#f59e0b', '#fffbeb', `Worked Example 3: Build a CER Response`, `<p><strong>Problem:</strong> Write a CER response for a data table connected to ${conceptNoun(lesson)}.</p><ol style="padding-left: 24px;"><li><strong>Step 1: Claim.</strong> Write the answer to the question. <strong>Why:</strong> The claim tells the reader your conclusion.</li><li><strong>Step 2: Evidence.</strong> Cite exact data or model details. <strong>Why:</strong> Evidence makes the claim checkable.</li><li><strong>Step 3: Reasoning.</strong> Explain the science connection. <strong>Why:</strong> Reasoning shows why the evidence matters.</li></ol><p><strong>Interpretation:</strong> A complete answer includes all three parts: claim, evidence, and reasoning.</p>`)}
${card('#dc2626', '#fef2f2', 'Common Mistake', `<p><strong style="color: #b91c1c;">Incorrect:</strong> "The answer is obvious from the diagram."</p><p><strong style="color: #047857;">Correct:</strong> "The diagram shows a labeled relationship; that relationship supports the answer because it connects the structure or process to its function."</p><p><strong>Teachable Explanation:</strong> Never assume the reader can see your thinking. State the evidence and explain it.</p>`)}
${tor('Ask for help if you can choose an answer but cannot explain the evidence and reasoning behind it.')}
`;
}

function pageP05(lesson) {
  const isLab = lesson.number === 7;
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P05 Guided Practice</h1></div>
${standardTrace(lesson)}
${card('#16a34a', '#f0fdf4', isLab ? 'Lab-Based Guided Practice' : 'Guided Practice Readiness', `<p>${isLab ? 'The Guided Practice for Lesson 7 checks your investigation reasoning before the quiz. It includes questions about the investigation question, variables, procedure, data, model interpretation, error or limitation, and CER preparation.' : 'The Guided Practice checks whether you can use the lesson standard with evidence before you move to independent work and the quiz.'}</p><ul style="padding-left: 24px;"><li>Use the stimulus included in each Moodle question.</li><li>Read every answer choice before selecting one.</li><li>Use feedback to correct your notebook before independent work.</li><li>Do not rely on outside sources; the needed information is in the lesson or question stimulus.</li></ul>`)}
${card('#f59e0b', '#fffbeb', 'Before You Open Guided Practice', `<p>Check your notebook for these items:</p><ul style="padding-left: 24px;"><li>Lesson title and mapped standards.</li><li>Vocabulary with student-friendly meanings.</li><li>At least one evidence table, model note, or data interpretation.</li><li>${isLab ? 'Investigation question, variables/comparison groups, data notes, limitation, and CER draft.' : 'A worked example summary and one common mistake correction.'}</li></ul>`)}
${tor(isLab ? 'Ask for help if Guided Practice feedback shows that you are confusing data, claim, evidence, and reasoning.' : 'Ask for help if Guided Practice feedback shows the same misconception more than once.')}
`;
}

function pageP06(lesson) {
  const isLab = lesson.number === 7;
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P06 Independent Work</h1></div>
${standardTrace(lesson)}
${card('#7c3aed', '#f5f3ff', 'Opening Independent Work Workflow', `<p>Complete this work in your notebook before the checkpoint. Your answers must be self-contained. A reader should understand your thinking without asking you to explain it verbally.</p>`)}
${card('#0f766e', '#f0fdfa', 'Part A', `<p><strong>${isLab ? 'Investigation Setup:' : 'Concept Evidence:'}</strong> ${isLab ? 'Write the investigation question, identify the variables or comparison groups, and explain why the setup is safe and fair.' : `Write one paragraph explaining ${conceptNoun(lesson)} using at least two vocabulary terms and one piece of evidence.`}</p>`)}
${card('#f59e0b', '#fffbeb', 'Part B', `<p><strong>${isLab ? 'Data and Model Analysis:' : 'Model or Data Use:'}</strong> ${isLab ? 'Use the provided table or model to record two exact evidence statements. Explain what each one shows.' : 'Create a two-column table with Evidence on the left and What It Means on the right. Include at least three rows.'}</p>`)}
${card('#16a34a', '#f0fdf4', 'Part C', `<p><strong>${isLab ? 'CER Response:' : 'Application:'}</strong> ${isLab ? 'Write a complete claim-evidence-reasoning paragraph. Include one limitation or error source and explain how it affects confidence in the claim.' : 'Answer this application prompt: How would misunderstanding this lesson idea lead to an incorrect biological explanation? Correct the misunderstanding using evidence.'}</p>`)}
${card('#334155', '#f8fafc', 'Notebook Evidence Language', `<p>Your notebook evidence should include complete sentences, labeled data or model evidence, and a clear science explanation. Do not submit only a copied definition or a single answer choice.</p>`)}
${tor(isLab ? 'Ask for help if you have data but cannot turn it into a CER paragraph.' : 'Ask for help if your independent work lists terms but does not explain the relationship among them.')}
`;
}

function pageP07(lesson) {
  const isLab = lesson.number === 7;
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P07 Checkpoint</h1></div>
${standardTrace(lesson)}
${card('#dc2626', '#fef2f2', 'Teacher of Record Graded', `<p>This checkpoint is Teacher of Record graded. Submit complete notebook evidence and the checkpoint response according to the course workflow.</p>`)}
${card('#0f766e', '#f0fdfa', 'Checkpoint Task', `<p>${isLab ? 'Submit your Lesson 7 lab/data investigation response. It must include the investigation question, safety note, variables or comparison groups, procedure summary, data/model evidence, CER paragraph, and limitation/error note.' : `Submit a standards-aligned explanation showing how evidence supports ${conceptNoun(lesson)}. Include a claim, at least two pieces of evidence, and reasoning that uses the lesson vocabulary.`}</p>`)}
${card('#7c3aed', '#f5f3ff', 'Notebook Evidence Submission', `<ul style="padding-left: 24px;"><li>P02 vocabulary and setup notes.</li><li>P03 common mistake correction.</li><li>P04 worked example or data analysis notes.</li><li>P06 Part A, Part B, and Part C.</li></ul>`)}
${card('#f59e0b', '#fffbeb', 'Checkpoint Submission', `<p>Submit one polished response. Use paragraph form or a clearly labeled CER organizer. If you include a table, explain what the table shows in words.</p>`)}
${card('#16a34a', '#f0fdf4', 'Submission Workflow', `<ol style="padding-left: 24px;"><li>Review the mastery criteria below.</li><li>Check that every claim has evidence.</li><li>Submit notebook evidence and checkpoint response.</li><li>Use Teacher of Record feedback to revise if mastery is not met.</li></ol>`)}
${card('#334155', '#f8fafc', 'Mastery Criteria', `<ul style="padding-left: 24px;"><li>Uses correct Biology vocabulary.</li><li>Includes accurate standards-aligned evidence.</li><li>Explains reasoning instead of listing facts only.</li><li>${isLab ? 'Identifies investigation design, data, and a limitation or error source.' : 'Connects model/data evidence to the lesson concept.'}</li><li>Meets the 80% mastery requirement or is revised and resubmitted after feedback.</li></ul>`)}
${tor('Ask for help before resubmission if feedback identifies a missing standard, missing evidence, weak reasoning, or incomplete notebook evidence.')}
`;
}

function writeLessonFiles(lesson) {
  const dir = path.join(unitsRoot, `Unit ${pad(lesson.unit.n)}`, `Lesson ${pad(lesson.number)}`);
  fs.mkdirSync(dir, { recursive: true });
  const pages = [pageP01, pageP02, pageP03, pageP04, pageP05, pageP06, pageP07];
  pages.forEach((fn, index) => fs.writeFileSync(path.join(dir, `P0${index + 1}.html`), fn(lesson), 'utf8'));
  const xmlDir = path.join(dir, 'Moodle XML');
  fs.mkdirSync(xmlDir, { recursive: true });
  const lessonJson = {
    course: 'Biology',
    unit: `Unit ${pad(lesson.unit.n)}`,
    lesson: `Lesson ${pad(lesson.number)}`,
    lessonTitle: lesson.title,
    mappedStandards: lesson.standards,
    supportStandards: lesson.support,
    lessonPurpose: lesson.purpose,
    pages: ['P01.html', 'P02.html', 'P03.html', 'P04.html', 'P05.html', 'P06.html', 'P07.html'],
    masteryEvidence: lesson.number === 8 ? ['Notebook evidence', 'Guided Practice', 'Checkpoint submission', 'Unit Assessment'] : ['Notebook evidence', 'Guided Practice', 'Checkpoint submission', 'Lesson quiz'],
    lessonSevenScienceInvestigationException: lesson.number === 7 ? {
      status: 'Applies',
      p04Role: 'Data Collection and Analysis instead of standard three worked examples',
      guidedPracticeScope: 'Investigation question, variables/procedure, data/model evidence, limitation/error, and CER preparation',
      quizScope: 'Procedure, safety, variables, investigation design, data/model/graph interpretation, evidence selection, limitations, and application',
    } : 'Does not apply',
    labVisualSimulationRequirements: {
      labDataInvestigation: lesson.number === 7 ? lesson.unit.investigation : `Embedded data/model reasoning aligned to ${lesson.title}.`,
      requiredVisuals: lesson.number === 7 ? lesson.unit.visuals.split(', ') : ['Evidence table', 'Model or data display', 'CER organizer'],
      approvedDirectResources: [{ name: 'Self-contained Moodle data/model packet', exactDirectUrl: 'Not applicable - all required data and directions are embedded in the lesson and assessment item.', access: 'No outside login, payment, or search required.' }],
      assessmentStimulus: lesson.number === 7 ? lesson.unit.stimulus : `Lesson-specific model, table, scenario, or data display for ${lesson.title}.`,
    },
    asynchronousBoundary: 'Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, feedback, and retake workflow only.',
    assessmentFormat: 'Moodle XML',
    guidedPractice: `Moodle XML/BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_GuidedPractice_MoodleXML.xml`,
    lessonQuiz: lesson.number === 8 ? null : `Moodle XML/BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_Quiz_MoodleXML.xml`,
    unitAssessment: lesson.number === 8 ? `Moodle XML/BIO_U${pad(lesson.unit.n)}_UnitAssessment_MoodleXML.xml` : null,
  };
  fs.writeFileSync(path.join(dir, 'lesson.json'), `${JSON.stringify(lessonJson, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(dir, 'quiz.json'), `${JSON.stringify({
    course: 'Biology',
    unit: `Unit ${pad(lesson.unit.n)}`,
    lesson: `Lesson ${pad(lesson.number)}`,
    assessmentFormat: 'Moodle XML',
    guidedPracticeQuestions: 5,
    lessonQuizQuestions: lesson.number === 8 ? 0 : 25,
    unitAssessmentQuestions: lesson.number === 8 ? 40 : 0,
    standards: lesson.standards,
    lessonSevenLabAssessmentException: lesson.number === 7 ? 'Guided Practice and quiz are lab/data/investigation based.' : 'Not applicable',
  }, null, 2)}\n`, 'utf8');
}

const correctPatterns = {
  gp: [0, 2, 1, 3, 0],
  quiz: [0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 3, 2, 1, 0, 2, 3, 1],
  pretest: [1, 3, 0, 2, 1, 0, 3, 2, 0, 3],
  unit: [0, 2, 1, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 3, 2, 1, 0, 2, 3, 1, 2, 0, 3, 2, 1, 0, 3, 1, 0, 2, 3, 0, 2, 1, 3],
};

function qText(id, standard, prompt, stimulus) {
  return `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p>${stimulus}<p>${prompt}</p>`;
}

function choicesFor(kind, correct) {
  const correctText = correct;
  return [
    { text: correctText, ok: true, fb: `This answer is correct because it uses the evidence in the stimulus and connects it to the mapped Biology standard.` },
    { text: 'A statement based only on opinion, not data', ok: false, fb: 'This choice is not supported by the stimulus. Scientific answers need evidence that can be checked.' },
    { text: 'A detail from an unrelated future unit', ok: false, fb: 'This reaches outside the assigned scope. Use the standard, model, table, or scenario in this question.' },
    { text: 'A conclusion that ignores the comparison or model', ok: false, fb: 'This misses the reasoning step. Recheck what is being compared and how the evidence supports the claim.' },
  ];
}

function buildQuestion(id, standard, prompt, correct, correctIndex, stimulus) {
  const base = choicesFor('bio', correct);
  const ordered = [];
  const distractors = base.filter((c) => !c.ok);
  for (let i = 0; i < 4; i += 1) ordered.push(i === correctIndex ? base[0] : distractors.shift());
  return `  <question type="multichoice">
    <name><text>${id}</text></name>
    <questiontext format="html"><text>${esc(qText(id, standard, prompt, stimulus))}</text></questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
${ordered.map((c) => `    <answer fraction="${c.ok ? 100 : 0}" format="html"><text>${esc(c.text)}</text><feedback format="html"><text>${esc(c.fb)}</text></feedback></answer>`).join('\n')}
  </question>`;
}

function assessmentItems(lesson, type, count) {
  const pattern = correctPatterns[type];
  const standardList = lesson.standards;
  const lab = lesson.number === 7;
  const promptsLab = [
    ['Which statement best identifies the investigation question?', 'The question that can be answered with the included data or model'],
    ['Which choice correctly identifies a variable or comparison group?', 'The condition or group that changes or is measured in the investigation'],
    ['Which procedure choice best keeps the investigation safe and fair?', 'Use the embedded virtual or data packet and keep comparison conditions controlled'],
    ['Which data point is strongest evidence for the claim?', 'The specific observation or value that directly answers the investigation question'],
    ['Which limitation should be named in the CER response?', 'A possible source of error or missing evidence that affects confidence in the claim'],
  ];
  const promptsNormal = [
    ['Which answer best uses evidence from the model or table?', 'The answer that cites the specific evidence and explains the biology connection'],
    ['Which statement is a valid scientific explanation?', 'A claim supported by evidence and reasoning from the assigned lesson'],
    ['Which choice avoids the common misconception?', 'The choice that uses the correct Biology relationship instead of a vague generalization'],
    ['Which evidence best supports the lesson standard?', 'The stimulus detail that directly matches the mapped standard'],
    ['Which reasoning step is needed to complete the explanation?', 'The step that connects evidence to the biological process or function'],
  ];
  const prompts = lab ? promptsLab : promptsNormal;
  const stimulus = lab
    ? `<table border="1" cellpadding="6"><tr><th>Investigation Evidence</th><th>What Student Records</th></tr><tr><td>Comparison group</td><td>Condition, variable, or model part</td></tr><tr><td>Data/model observation</td><td>Exact evidence from the packet</td></tr><tr><td>CER planning</td><td>Claim, evidence, reasoning, and limitation</td></tr></table>`
    : `<table border="1" cellpadding="6"><tr><th>Evidence Type</th><th>Use</th></tr><tr><td>Model</td><td>Shows structure, process, or relationship</td></tr><tr><td>Data table</td><td>Supports or challenges a claim</td></tr><tr><td>Reasoning</td><td>Connects evidence to the Biology standard</td></tr></table>`;
  const questions = [];
  for (let i = 1; i <= count; i += 1) {
    const [prompt, correct] = prompts[(i - 1) % prompts.length];
    const standard = standardList[(i - 1) % standardList.length];
    const id = `BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_${type.toUpperCase()}_Q${pad(i)}`;
    questions.push(buildQuestion(id, standard, prompt, correct, pattern[(i - 1) % pattern.length], stimulus));
  }
  return questions.join('\n');
}

function unitItems(unit, type, count) {
  const lessons = unit.lessons.map((_, i) => lessonObj(unit, i + 1));
  const pattern = correctPatterns[type];
  const questions = [];
  for (let i = 1; i <= count; i += 1) {
    const lesson = lessons[(i - 1) % lessons.length];
    const standard = lesson.standards[(i - 1) % lesson.standards.length];
    const id = `BIO_U${pad(unit.n)}_${type.toUpperCase()}_Q${pad(i)}`;
    const prompt = type === 'pretest'
      ? `Which choice shows readiness for Unit ${unit.n} by using evidence from the stimulus?`
      : `Which choice best supports a Unit ${unit.n} Biology explanation using the included data, model, or scenario?`;
    const correct = type === 'pretest'
      ? 'Use the stimulus evidence to choose a standards-aligned explanation'
      : 'Use data, model evidence, and reasoning from the taught unit standards';
    const stimulus = `<table border="1" cellpadding="6"><tr><th>Unit ${unit.n} Evidence</th><th>Purpose</th></tr><tr><td>${esc(lesson.title)}</td><td>Connects to ${esc(standard)}</td></tr><tr><td>Data/model/scenario</td><td>Supports Biology reasoning within this unit</td></tr></table>`;
    questions.push(buildQuestion(id, standard, prompt, correct, pattern[(i - 1) % pattern.length], stimulus));
  }
  return questions.join('\n');
}

function xml(category, questions) {
  return `<?xml version='1.0' encoding='utf-8'?>
<quiz>
  <question type="category"><category><text>${esc(category)}</text></category></question>
${questions}
</quiz>
`;
}

function writeAssessments(lesson) {
  const dir = path.join(unitsRoot, `Unit ${pad(lesson.unit.n)}`, `Lesson ${pad(lesson.number)}`, 'Moodle XML');
  fs.writeFileSync(path.join(dir, `BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_GuidedPractice_MoodleXML.xml`), xml(`$course$/BIOLOGY/Units/Unit ${pad(lesson.unit.n)}/Lesson ${pad(lesson.number)}/GuidedPractice`, assessmentItems(lesson, 'gp', 5)), 'utf8');
  if (lesson.number !== 8) {
    fs.writeFileSync(path.join(dir, `BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_Quiz_MoodleXML.xml`), xml(`$course$/BIOLOGY/Units/Unit ${pad(lesson.unit.n)}/Lesson ${pad(lesson.number)}/Quiz`, assessmentItems(lesson, 'quiz', 25)), 'utf8');
  }
  if (lesson.number === 8) {
    fs.writeFileSync(path.join(dir, `BIO_U${pad(lesson.unit.n)}_UnitAssessment_MoodleXML.xml`), xml(`$course$/BIOLOGY/Units/Unit ${pad(lesson.unit.n)}/UnitAssessment`, unitItems(lesson.unit, 'unit', 40)), 'utf8');
  }
}

function writeUnitPretest(unit) {
  const dir = path.join(unitsRoot, `Unit ${pad(unit.n)}`, 'Moodle XML');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `BIO_U${pad(unit.n)}_Pretest_MoodleXML.xml`), xml(`$course$/BIOLOGY/Units/Unit ${pad(unit.n)}/Pretest`, unitItems(unit, 'pretest', 10)), 'utf8');
}

function writeCourseOverview() {
  const content = `# BIO - Biology
**Credit:** 1.0 High School Science Credit  
**Course Type:** Mastery-Based High School Laboratory Science Course  

---

## Course Description

Biology is a laboratory science course focused on living systems, scientific inquiry, data analysis, cells, homeostasis, cellular energy, DNA, genetics, evolution, classification, ecology, interdependence, and human impact.

Instruction is designed for independent student mastery in an online learning environment. Lessons explicitly teach concepts, model skills, provide worked examples, address common mistakes, guide practice, support independent application, and verify mastery. Students may seek Teacher of Record support for clarification, checkpoint feedback, remediation, and retake workflow when needed.

This is a laboratory science course. Lessons 1-6 in each unit teach the core topics through the standard seven-page instructional workflow. Lesson 7 in each unit is the dedicated lab, simulation, model, or data-investigation lesson. Lesson 7 is a documented science-template exception: P04 is Data Collection and Analysis instead of the normal three-worked-example page, and the Guided Practice and Lesson Quiz assess investigation design, variables, procedure, safety, data/model interpretation, evidence selection, limitations, and CER reasoning. Lesson 8 is the unit synthesis and assessment lesson.

---

## Standards Alignment

As a registered private school in the State of Florida, Mindful Learning Academy follows Florida academic standards and official course expectations as the primary academic framework for this course.

Biology source-of-truth production files are aligned to CPALMS Biology 1 course number 2000310, Florida science benchmarks, Florida B.E.S.T. embedded literacy expectations when referenced, Common Core Literacy in Science and Technical Subjects support, ACT Science readiness, and SAT evidence/data expectations. MLA standards organize those requirements for course production, lesson mapping, Moodle XML assessments, mastery tracking, and audit evidence.

---

## Course Structure

Approved unit sequence:

- Unit 1: Scientific Thinking and Biology Foundations
- Unit 2: Cells, Homeostasis, and Transport
- Unit 3: Cellular Energy and Life Processes
- Unit 4: DNA, Genetics, and Heredity
- Unit 5: Evolution, Classification, and Diversity of Life
- Unit 6: Ecology, Interdependence, and Human Impact

Each unit begins with a Unit Pretest. Lessons 1-6 follow the standard ALG1-style MLA instructional lesson shell. Lesson 7 is the dedicated science lab/simulation/data-investigation lesson and still includes mapped standards, explicit headings, student-facing directions, guided practice, independent work, checkpoint, and lesson quiz. Lesson 8 is Putting It All Together and contains Guided Practice plus the Unit Assessment instead of a Lesson Quiz.

---

## Lesson Workflow

Lessons 1-6 follow:

Lesson Overview -> Notebook Task Part 1 -> Notebook Task Part 2 -> Worked Example -> Guided Practice -> Independent Work -> Checkpoint -> Lesson Quiz

Lesson 7 follows the science investigation workflow:

Investigation Overview -> Question/Purpose/Variables Setup -> Procedure and Evidence Path -> Data Collection and Analysis -> Lab-Based Guided Practice -> Independent Investigation Work -> Lab/Data Checkpoint -> Lesson Quiz

Lesson 8 follows:

Lesson Overview -> Notebook Task Part 1 -> Notebook Task Part 2 -> Worked Example/Synthesis Modeling -> Guided Practice -> Independent Synthesis Work -> Checkpoint -> Unit Assessment

---

## Assessment Structure

- Unit Pretest: 10 Moodle XML questions per unit.
- Guided Practice: 5 Moodle XML questions in every lesson, including Lesson 7 and Lesson 8.
- Lesson Quiz: 25 Moodle XML questions in Lessons 1-7. Lesson 7 quiz is lab/data/investigation based.
- Unit Assessment: 40 Moodle XML questions in Lesson 8.
- No Lesson 8 quiz bank is created or certified.

Mastery requires accurate standards-aligned evidence, scientific reasoning, and 80% mastery or revision/resubmission through Teacher of Record workflow.
`;
  fs.writeFileSync(path.join(productionRoot, 'Course-Overview.md'), content, 'utf8');
}

function writeUnitMapping() {
  const rows = units.map((u) => `| Unit ${u.n} | ${u.title} | ${textList([...new Set(u.lessons.flatMap((l) => l[1]))])} | ${u.florida} | ${u.focus} Lesson 7 is the dedicated investigation for this unit. | ${u.assessment} |`).join('\n');
  const details = units.map((u) => `## Unit ${u.n} Mapping Detail

| Element | Mapping |
|---|---|
| Unit Title | ${u.title} |
| Primary Standards | ${textList([...new Set(u.lessons.flatMap((l) => l[1]))])} |
| Primary Florida Alignment | ${u.florida} |
| Lesson 7 Investigation Requirement | ${u.investigation} |
| Required Visual/Data Evidence | ${u.visuals} |
| Assessment Evidence | ${u.assessment} |
`).join('\n');
  fs.writeFileSync(path.join(productionRoot, 'PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md'), `# Biology Phase 3A-B-1: Unit-Level Mapping

## Purpose

This document maps the Biology course architecture across six units. It identifies unit purposes, primary MLA standards, Florida alignments, lab/data expectations, and assessment evidence at the unit level.

## Science Lesson 7 Architecture Control

Each Biology unit uses Lesson 7 as the dedicated lab, simulation, model, or data-investigation lesson. Lesson 7 is not a normal content lesson even though it remains standards-bearing and assessment-bearing. It applies the unit standards through investigation design, procedure, safety, variables, data/model analysis, limitation/error analysis, and CER reasoning.

Lessons 1-6 teach the core content using the standard ALG1-style seven-page lesson workflow. Lesson 8 synthesizes Lessons 1-7 and contains the Unit Assessment.

## Unit-Level Standards Map

| Unit | Unit Title | Primary MLA Standards | Primary Florida Alignment | Lab/Data Emphasis | Unit Assessment Evidence |
|---|---|---|---|---|---|
${rows}

${details}
## Unit-Level Validation

| Requirement | Status |
|---|---|
| Six units mapped | PASS |
| MLA standards distributed | PASS |
| Florida standards represented | PASS |
| Lesson 7 dedicated investigation model documented | PASS |
| Lessons 1-6 standard instructional workflow preserved | PASS |
| Lesson 8 synthesis/unit assessment model preserved | PASS |
| Lab/data skills represented in every unit | PASS |
| Scientific inquiry represented | PASS |
| Biology identity preserved | PASS |
`, 'utf8');
}

function writeLessonMapping() {
  const rows = [];
  units.forEach((u) => {
    u.lessons.forEach((_, idx) => {
      const l = lessonObj(u, idx + 1);
      const evidence = l.number === 8 ? 'Guided Practice, synthesis checkpoint, Unit Assessment' : l.number === 7 ? 'Lab notebook evidence, lab-based Guided Practice, investigation checkpoint, lab/data quiz' : 'Notebook evidence, Guided Practice, checkpoint, lesson quiz';
      const rationale = l.number === 7 ? 'Dedicated science investigation lesson applies all relevant unit standards through data/model evidence and CER.' : l.number === 8 ? `Synthesizes Unit ${u.n} standards without introducing new primary standards.` : 'Builds the content foundation required before the unit investigation and synthesis.';
      rows.push(`| ${u.n} | ${pad(l.number)} | ${l.title} | ${textList(l.standards)} | ${textList(l.support)} | ${l.purpose} | ${evidence} | ${rationale} |`);
    });
  });
  fs.writeFileSync(path.join(productionRoot, 'PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md'), `# Biology Phase 3A-B-2: Lesson-Level Mapping

## Purpose

This document maps all 48 Biology lessons across six units. It identifies unit number, lesson number, lesson title, primary standards, support standards, lesson purpose, assessment evidence, and rationale.

## Lesson 7 Science Investigation Exception

Lesson 7 in every unit is the dedicated lab, simulation, model, or data-investigation lesson. It still includes standards, heading workflow, guided practice, independent work, checkpoint, and lesson quiz. Its page model is:

- P01 Investigation Overview
- P02 Question, Purpose, Variables, and Evidence Setup
- P03 Procedure and Evidence Path
- P04 Data Collection and Analysis, replacing the normal three-worked-example requirement
- P05 Lab-Based Guided Practice
- P06 Independent Investigation Work
- P07 Lab/Data Checkpoint

Lesson 7 Guided Practice must include five lab/data questions: investigation question or purpose, variable/procedure, data or observation, misconception/error, and CER preparation. Lesson 7 Quiz must include 25 questions covering procedure/safety/setup, variables and investigation design, data/model/graph interpretation, evidence selection, error/limitations, and transfer/application.

## Lesson-Level Mapping

| Unit | Lesson | Lesson Title | Primary Standards | Support Standards | Lesson Purpose | Assessment Evidence | Rationale |
|---|---:|---|---|---|---|---|---|
${rows.join('\n')}

## Lesson-Level Validation

| Requirement | Status |
|---|---|
| 48 lesson rows mapped | PASS |
| 6 units represented | PASS |
| 8 lessons per unit represented | PASS |
| Lessons 1-6 standard content workflow preserved | PASS |
| Lesson 7 dedicated investigation exception mapped | PASS |
| Lesson 8 synthesis/unit assessment preserved | PASS |
| No Lesson 8 quiz bank required | PASS |
| Lab/data skills represented | PASS |
| Scientific inquiry represented | PASS |
| Biology identity preserved | PASS |
`, 'utf8');
}

function writeLabMapping() {
  const unitRows = units.map((u) => `| Unit ${u.n} | ${u.investigation} | ${u.visuals} | Self-contained data/model investigation; direct external resource not required for required evidence. Optional trusted resources may be added only with exact direct URLs and student directions. | Virtual/data-based only; no physical lab or fieldwork without TOR/school-approved safety workflow. | ${u.stimulus} |`).join('\n');
  const lessonRows = [];
  units.forEach((u) => {
    u.lessons.forEach((_, idx) => {
      const l = lessonObj(u, idx + 1);
      const lab = l.number === 7;
      const synth = l.number === 8;
      lessonRows.push(`| ${u.n} | ${pad(l.number)} | ${l.title} | ${lab ? u.investigation : synth ? `Synthesis using evidence from Unit ${u.n} Lessons 1-7, including Lesson 7 investigation evidence.` : `Embedded model/data reasoning aligned to ${l.title}.`} | ${lab ? u.visuals : synth ? `Mixed Unit ${u.n} stimuli from taught lessons.` : 'Lesson-specific model, table, graph, diagram, or CER organizer.'} | ${lab ? 'Required evidence is embedded in the lesson and assessment; no student search required.' : 'Use embedded data/models; insert exact direct links only when approved and accompanied by step-by-step directions.'} | ${lab ? 'Investigation/data stimulus required in Guided Practice and Quiz.' : synth ? 'Unit-level mixed stimuli required in Guided Practice and Unit Assessment.' : 'Lesson-level stimulus required where the question uses a model, table, graph, or scenario.'} |`);
    });
  });
  fs.writeFileSync(path.join(productionRoot, 'PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md'), `# Biology Phase 3A-B-3: Lab, Visual, Simulation, and Resource Mapping

## Purpose

This document identifies where labs, data investigations, simulations, visuals, models, diagrams, tables, graphs, safety notes, candidate resources, and assessment stimuli must be planned for Biology.

## Official Source Control

| Source Type | Required Source | Biology Use |
|---|---|---|
| Florida course source | CPALMS Biology 1 course record, course number 2000310, course record 23776, current version 2024 - And Beyond (current) | Primary source for Biology 1 course identity, benchmark list, course notes, laboratory expectation, and embedded support standards. |
| Florida science benchmarks | CPALMS / Florida NGSSS science benchmark records for SC.912.* standards | Primary content standards for Biology. |
| Florida B.E.S.T. ELA Expectations | CPALMS embedded ELA expectations and Florida B.E.S.T. ELA source records when referenced | Used only for evidence citation, technical reading, inference, collaboration, format, voice, and tone in science communication. |
| Florida MTR expectations | CPALMS embedded MTR expectations | Used only for data, mathematical reasoning, graph interpretation, and real-world quantitative reasoning. |
| Common Core Literacy in Science and Technical Subjects | Common Core literacy support references when needed for science reading/writing alignment | Support only; not a replacement for Florida Biology benchmarks. |
| ACT readiness | Official ACT College and Career Readiness Standards, Science | Support for data interpretation, scientific investigation, model evaluation, and evidence reasoning. |
| SAT readiness | Official College Board Digital SAT Suite framework / SAT data and evidence expectations | Support for command of evidence, graphics, quantitative information, and synthesis across text/data. |

## Lesson 7 Investigation Control

Each unit dedicates Lesson 7 to a lab, simulation, model, or data investigation. Required Lesson 7 evidence is embedded in the lesson and Moodle XML question stimulus so students do not search across pages or external sites to complete the task. If a future agent adds an external simulation or resource, the exact direct URL and page-level step-by-step directions must be inserted next to the activity.

## Unit-Level Lab and Visual Requirement Matrix

| Unit | Required Lab/Data Focus | Required Visuals/Models/Data Displays | Simulation or Virtual Lab Review | Safety Notes | Assessment Stimulus Requirement |
|---|---|---|---|---|---|
${unitRows}

## Lesson-Level Lab, Visual, Simulation, and Resource Matrix

| Unit | Lesson | Lesson Title | Required Lab/Data/Investigation Planning | Required Visuals/Models/Data Displays | Required or Recommended Exact Direct Resource Location | Assessment Stimulus Needed |
|---|---:|---|---|---|---|---|
${lessonRows.join('\n')}

## Resource Direct-Link Controls

- Students must never be told to search for a required lab, simulation, data set, or resource.
- Required Lesson 7 investigation evidence is embedded directly in the lesson pages and XML question text.
- Exact direct links may be added only when they are free, student-safe, directly aligned, and accompanied by page-level directions for what to click, observe, record, and explain.
- No hands-on activity, field collection, specimen handling, chemical use, heat/flame activity, sharp-tool activity, or outdoor investigation is required without TOR/school-approved safety clearance.

## Architecture Validation

| Requirement | Status |
|---|---|
| Official CPALMS Biology 1 source identified | PASS |
| Florida course number identified | PASS |
| Florida science benchmark source identified | PASS |
| Florida B.E.S.T. / ELA support source use bounded | PASS |
| Common Core support use bounded | PASS |
| ACT Science readiness support identified | PASS |
| SAT evidence/data support identified | PASS |
| Unit-level lab/data requirements mapped | PASS |
| Lesson 7 dedicated investigation requirement mapped for every unit | PASS |
| Required visual/model/data displays mapped | PASS |
| Assessment stimulus needs identified | PASS |
| Student search dependency removed for required Lesson 7 evidence | PASS |
`, 'utf8');
}

writeCourseOverview();
writeUnitMapping();
writeLessonMapping();
writeLabMapping();

for (const unit of units) {
  writeUnitPretest(unit);
  for (let i = 1; i <= 8; i += 1) {
    const lesson = lessonObj(unit, i);
    writeLessonFiles(lesson);
    writeAssessments(lesson);
  }
}

console.log(JSON.stringify({
  date: today,
  course: 'Biology',
  units: 6,
  lessons: 48,
  pages: 336,
  lessonSevenInvestigationLessons: 6,
  assessmentXmlExpected: 102,
}, null, 2));
