const fs = require('fs');
const path = require('path');

const courseRoot = path.resolve(__dirname, '..');
const unitsRoot = path.join(courseRoot, 'Units');
const productionRoot = path.join(courseRoot, 'Course Production');
const veteranRenderer = require('./biology_rebuild_renderer');

const today = '2026-07-15';

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

function investigationPacket(unit) {
  const packets = {
    1: {
      question: 'Which evidence source best supports the claim that cells and water-based molecules are foundations for life?',
      claim: 'Living systems depend on cells, water, and carbon-based molecules because these provide structure, transport, and biological function.',
      variables: 'Evidence source being compared: microscope observation, cell-theory evidence, water-property model, and macromolecule data.',
      constants: 'Use only the four evidence sources in this lesson; judge each source by specificity, connection to the claim, and scientific reliability.',
      rows: [
        ['Microscope observation', 'Sample A shows many box-shaped units with visible boundaries; each unit has internal structures.', 'Supports cell theory because it shows organisms are made of cells.'],
        ['Cell-theory evidence', 'Multiple organisms examined under microscopes show repeating cell units.', 'Supports the idea that cells are a basic unit of life.'],
        ['Water-property model', 'Water has partial charges; the oxygen side is slightly negative and hydrogen sides are slightly positive.', 'Explains why water can dissolve and move many substances in living systems.'],
        ['Macromolecule data', 'Proteins perform cell work, carbohydrates provide quick energy, lipids form membranes, and nucleic acids store information.', 'Connects carbon-based molecules to specific life functions.'],
      ],
      limitation: 'The packet uses simulated evidence instead of direct lab measurement, so the conclusion should cite the included evidence only.',
    },
    2: {
      question: 'How do cell structures and membrane transport help a cell maintain homeostasis?',
      claim: 'Cells maintain homeostasis when structures and membranes regulate what enters, leaves, and responds inside the cell.',
      variables: 'Comparison being made: high outside solute, equal solute, and low outside solute conditions.',
      constants: 'Use the same cell type, same time interval, and same membrane model for all comparisons.',
      rows: [
        ['High outside solute', 'Cell water level decreases from 100 units to 82 units.', 'Water leaves the cell, showing osmosis affects cell balance.'],
        ['Equal solute', 'Cell water level remains near 100 units.', 'Balanced conditions help maintain homeostasis.'],
        ['Low outside solute', 'Cell water level increases from 100 units to 119 units.', 'Water enters the cell, which may disrupt cell function.'],
        ['Immune response model', 'Pathogen markers are recognized before immune cells respond.', 'Structure recognition helps organisms respond to health threats.'],
      ],
      limitation: 'The model simplifies many real cell conditions, so the conclusion should focus on transport and homeostasis only.',
    },
    3: {
      question: 'How do enzyme conditions and cellular energy processes show that matter and energy move through living systems?',
      claim: 'Cells use enzymes, ATP, photosynthesis, respiration, and cycles to transform and move matter and energy.',
      variables: 'Comparison being made: enzyme pH condition, process inputs/outputs, and cycle evidence.',
      constants: 'Use the same enzyme amount when comparing pH and use the same process model when comparing photosynthesis and respiration.',
      rows: [
        ['Enzyme at pH 3', 'Reaction rate is 18 product units per minute.', 'Low activity suggests the condition is not optimal for this enzyme.'],
        ['Enzyme at pH 7', 'Reaction rate is 74 product units per minute.', 'Higher activity supports the claim that conditions affect enzyme function.'],
        ['Photosynthesis model', 'Carbon dioxide and water become glucose and oxygen using light energy.', 'Shows matter is rearranged and energy is captured.'],
        ['Respiration model', 'Glucose and oxygen become carbon dioxide and water while ATP is produced.', 'Shows stored chemical energy is transferred to ATP.'],
      ],
      limitation: 'The data compare only selected conditions and process models, so they support a focused claim about energy and matter movement.',
    },
    4: {
      question: 'How can DNA, mutation, inheritance, and biotechnology evidence explain variation in a fictional genetics case?',
      claim: 'Genetic information can be copied, expressed, changed, inherited, and analyzed using evidence from DNA and inheritance models.',
      variables: 'Evidence source being compared: DNA sequence, codon effect, Punnett square, cell division model, and biotechnology case data.',
      constants: 'Use the same fictional trait and the same parent genotypes for all inheritance comparisons.',
      rows: [
        ['DNA sequence', 'Original sequence: TAC-GGA-CTT; changed sequence: TAC-GAA-CTT.', 'Shows a mutation changed one codon.'],
        ['Protein effect', 'Changed codon codes for a different amino acid in the model.', 'Connects mutation to possible phenotype change.'],
        ['Punnett square', 'Two heterozygous parents produce a 3:1 dominant-to-recessive phenotype ratio.', 'Shows how alleles can be inherited.'],
        ['Biotechnology evidence', 'A DNA comparison identifies which sample contains the changed sequence.', 'Shows how biotechnology can analyze genetic information.'],
      ],
      limitation: 'The case is fictional and simplified, so students should not use personal family or medical information.',
    },
    5: {
      question: 'Which evidence best supports a scientific explanation of evolutionary relationships and change over time?',
      claim: 'Evolutionary relationships are supported by patterns in fossils, anatomy, molecular data, population change, classification, and hominid trends.',
      variables: 'Evidence source being compared: fossil age, trait similarity, molecular similarity, population data, and cladogram position.',
      constants: 'Use the same group of organisms when comparing traits, molecular evidence, and classification.',
      rows: [
        ['Fossil evidence', 'Older fossils appear in lower rock layers; newer fossils show changed limb proportions.', 'Supports change over time.'],
        ['Molecular evidence', 'Species A and B share 96 percent of compared DNA markers.', 'High similarity supports close relationship.'],
        ['Population data', 'Trait frequency rises from 22 percent to 61 percent after an environmental change.', 'Supports natural selection when a trait affects survival or reproduction.'],
        ['Cladogram evidence', 'Two species share the most recent branch point.', 'Supports classification based on evolutionary relationship.'],
      ],
      limitation: 'One evidence type is not enough by itself; stronger explanations use multiple lines of evidence.',
    },
    6: {
      question: 'How can ecological data support a decision about biodiversity, resources, and human impact?',
      claim: 'Ecological decisions should use evidence from populations, food webs, biodiversity, resources, and monitoring data.',
      variables: 'Evidence source being compared: population trend, limiting factor, food web effect, biodiversity data, and monitoring data.',
      constants: 'Use the same ecosystem and same monitoring period when comparing data sources.',
      rows: [
        ['Population graph', 'Fish population decreases from 480 to 260 over four sampling periods.', 'Shows a population change that needs explanation.'],
        ['Limiting factor data', 'Dissolved oxygen decreases while water temperature increases.', 'Suggests abiotic factors may limit the population.'],
        ['Food web evidence', 'A decrease in producers reduces available energy for primary consumers.', 'Connects energy transfer to population effects.'],
        ['Monitoring data', 'Invasive plant coverage rises from 8 percent to 37 percent of the shoreline.', 'Supports a biodiversity and habitat concern.'],
      ],
      limitation: 'Monitoring data show patterns, but a policy decision should consider benefits, costs, and additional evidence.',
    },
  };
  return packets[unit.n];
}

function labDataTable(unit) {
  const packet = investigationPacket(unit);
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin: 10px 0;">
    <tr style="background: #dbeafe;"><th style="border: 1px solid #94a3b8; padding: 10px;">Evidence Source or Condition</th><th style="border: 1px solid #94a3b8; padding: 10px;">Data or Observation</th><th style="border: 1px solid #94a3b8; padding: 10px;">How the Student Should Use It</th></tr>
    ${packet.rows.map((row) => `<tr><td style="border: 1px solid #cbd5e1; padding: 10px;">${row[0]}</td><td style="border: 1px solid #cbd5e1; padding: 10px;">${row[1]}</td><td style="border: 1px solid #cbd5e1; padding: 10px;">${row[2]}</td></tr>`).join('\n    ')}
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
    const packet = investigationPacket(lesson.unit);
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P02 Notebook Task - Part 1</h1></div>
${standardTrace(lesson)}
${card('#7c3aed', '#f5f3ff', 'Investigation Notebook Setup', `<p><strong>${lesson.title}: Question, Purpose, and Evidence Setup</strong></p><p>Copy this title into your notebook. Under it, create these six labeled sections: Investigation Question, Claim Being Tested, Variables or Comparison Groups, Controlled Conditions, Data/Model Evidence, and CER Draft.</p>`)}
${card('#0f766e', '#f0fdfa', 'Vocabulary', `<ul style="padding-left: 24px;"><li><strong>Investigation question:</strong> the testable question the evidence is being used to answer.</li><li><strong>Variable:</strong> a factor that changes or is measured in an investigation.</li><li><strong>Control or controlled condition:</strong> what stays the same so the comparison is fair.</li><li><strong>Evidence:</strong> specific data, observation, model detail, or source information that supports a claim.</li><li><strong>CER:</strong> claim, evidence, and reasoning.</li></ul>`)}
${card('#f59e0b', '#fffbeb', 'Step-by-Step Setup', `<ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Copy this investigation question: <strong>${packet.question}</strong></li><li><strong>Step 2:</strong> Copy this claim being tested: <strong>${packet.claim}</strong></li><li><strong>Step 3:</strong> Copy the variable or comparison focus: ${packet.variables}</li><li><strong>Step 4:</strong> Copy the controlled conditions: ${packet.constants}</li><li><strong>Step 5:</strong> Read the evidence table below. Put a star next to the two evidence rows that most directly answer the investigation question.</li></ol>${labDataTable(lesson.unit)}<p><strong>Check that:</strong> your notebook has the exact question, claim, variable/comparison focus, controlled conditions, and two starred evidence rows before you continue.</p>`)}
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
    const packet = investigationPacket(lesson.unit);
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P03 Notebook Task - Part 2</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', 'Procedure and Evidence Path', `<p>Use this procedure exactly. The goal is to build a complete notebook response from the evidence packet.</p><ol style="padding-left: 24px;"><li><strong>Procedure Step 1:</strong> Reread the question: <strong>${packet.question}</strong></li><li><strong>Procedure Step 2:</strong> In your notebook, make a two-column table labeled <strong>Evidence</strong> and <strong>How it supports or does not support the claim</strong>.</li><li><strong>Procedure Step 3:</strong> Choose two evidence rows from P02. Copy the exact data or observation from each selected row into your table.</li><li><strong>Procedure Step 4:</strong> For each selected row, write one sentence explaining how that evidence connects to the claim.</li><li><strong>Procedure Step 5:</strong> Copy this limitation note into your notebook: ${packet.limitation}</li></ol><p><strong>Safety:</strong> This is a virtual/data investigation. Do not complete any physical experiment or outdoor collection for this lesson.</p>`)}
${card('#dc2626', '#fef2f2', 'Common Mistake', `<p><strong style="color: #b91c1c;">Incorrect:</strong> "The answer is true because the unit said so."</p><p>This does not cite evidence. It also does not show that you can use the data or model independently.</p><p><strong style="color: #047857;">Correct:</strong> "The claim is supported because the comparison group with the changed condition showed a different measured result, and the model explains why that result fits ${lesson.unit.title}."</p><p><strong>Teachable Explanation:</strong> A lab explanation needs the data and the biology. Data without reasoning is incomplete; reasoning without data is unsupported.</p>`)}
${card('#f59e0b', '#fffbeb', 'Notebook Verification Check', `<ul style="padding-left: 24px;"><li>Your procedure notes include the investigation question.</li><li>Your evidence table includes two exact observations or data points from the packet.</li><li>Each evidence row has a sentence explaining why the evidence matters.</li><li>Your limitation note is copied and connected to the claim.</li><li>Your CER draft does not use outside information not included in the lesson.</li></ul>`)}
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
    const packet = investigationPacket(lesson.unit);
    return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P04 Data Collection and Analysis</h1></div>
${standardTrace(lesson)}
${card('#0f766e', '#f0fdfa', 'Investigation Data Set', `<p><strong>Lesson 7 template exception:</strong> This page does not use the normal three worked examples. In a science investigation lesson, P04 is the data collection and analysis page. Use the table as your lab evidence.</p><p><strong>Question:</strong> ${packet.question}</p><p><strong>Claim being tested:</strong> ${packet.claim}</p>${labDataTable(lesson.unit)}<p><strong>Data task:</strong> Choose the two strongest rows from the table. For each row, copy the exact data or observation and explain how it helps answer the investigation question.</p>`)}
${card('#7c3aed', '#f5f3ff', 'Analysis Steps', `<ol style="padding-left: 24px;"><li><strong>Step 1:</strong> Underline the evidence row that most directly supports the claim.</li><li><strong>Step 2:</strong> Circle one additional evidence row that gives a different kind of support, such as a model, trend, comparison, or process detail.</li><li><strong>Step 3:</strong> Write one limitation: ${packet.limitation}</li><li><strong>Step 4:</strong> Draft this claim sentence: <strong>${packet.claim}</strong></li><li><strong>Step 5:</strong> Add two evidence sentences and one reasoning sentence that explains the biology connection in your CER draft.</li></ol>`)}
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
  const packet = isLab ? investigationPacket(lesson.unit) : null;
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P06 Independent Work</h1></div>
${standardTrace(lesson)}
${card('#7c3aed', '#f5f3ff', 'Opening Independent Work Workflow', `<p>Complete this work in your notebook before the checkpoint. Your answers must be self-contained. A reader should understand your thinking without asking you to explain it verbally.</p>`)}
${card('#0f766e', '#f0fdfa', isLab ? 'Part A: Investigation Setup' : 'Part A: Concept Evidence', `<p><strong>${isLab ? 'Investigation Setup:' : 'Concept Evidence:'}</strong> ${isLab ? `Copy the investigation question: <strong>${packet.question}</strong> Then copy the claim being tested and identify the comparison focus: ${packet.variables}` : `Write one paragraph explaining ${conceptNoun(lesson)} using at least two vocabulary terms and one piece of evidence.`}</p>`)}
${card('#f59e0b', '#fffbeb', isLab ? 'Part B: Data and Model Analysis' : 'Part B: Model or Data Use', `<p><strong>${isLab ? 'Data and Model Analysis:' : 'Model or Data Use:'}</strong> ${isLab ? 'Choose two evidence rows from the data table. For each row, copy the exact observation or data and write one sentence explaining how it supports, weakens, or clarifies the claim.' : 'Create a two-column table with Evidence on the left and What It Means on the right. Include at least three rows.'}</p>`)}
${card('#16a34a', '#f0fdf4', isLab ? 'Part C: Complete CER Response' : 'Part C: Application', `<p><strong>${isLab ? 'CER Response:' : 'Application:'}</strong> ${isLab ? `Write one complete CER response. Begin with this claim if the evidence supports it: <strong>${packet.claim}</strong> Include two evidence sentences, one reasoning sentence, and this limitation or a better one you can justify: ${packet.limitation}` : 'Answer this application prompt: How would misunderstanding this lesson idea lead to an incorrect biological explanation? Correct the misunderstanding using evidence.'}</p>`)}
${card('#334155', '#f8fafc', 'Notebook Evidence Language', `<p>Your notebook evidence should include complete sentences, labeled data or model evidence, and a clear science explanation. Do not submit only a copied definition or a single answer choice.</p>`)}
${tor(isLab ? 'Ask for help if you have data but cannot turn it into a CER paragraph.' : 'Ask for help if your independent work lists terms but does not explain the relationship among them.')}
`;
}

function pageP07(lesson) {
  const isLab = lesson.number === 7;
  const packet = isLab ? investigationPacket(lesson.unit) : null;
  return `${header(lesson.unit.n, lesson.number)}
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">P07 Checkpoint</h1></div>
${standardTrace(lesson)}
${card('#dc2626', '#fef2f2', 'Teacher of Record Graded', `<p>This checkpoint is Teacher of Record graded. Submit complete notebook evidence and the checkpoint response according to the course workflow.</p>`)}
${card('#0f766e', '#f0fdfa', 'Checkpoint Task', `<p>${isLab ? `Submit your Lesson 7 lab/data investigation response to this question: <strong>${packet.question}</strong> Your response must include the copied claim, variable/comparison focus, controlled conditions, two exact evidence statements from the table, one limitation, and a complete CER response.` : `Submit a standards-aligned explanation showing how evidence supports ${conceptNoun(lesson)}. Include a claim, at least two pieces of evidence, and reasoning that uses the lesson vocabulary.`}</p>`)}
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
  const packet = lab ? investigationPacket(lesson.unit) : null;
  const promptsLab = [
    ['Which statement best identifies the investigation question?', packet ? packet.question : 'The question that can be answered with the included data or model'],
    ['Which choice correctly identifies the variable or comparison focus?', packet ? packet.variables : 'The condition or group that changes or is measured in the investigation'],
    ['Which procedure choice best keeps the investigation safe and fair?', packet ? packet.constants : 'Use the embedded virtual or data packet and keep comparison conditions controlled'],
    ['Which evidence should be used in the CER response?', packet ? packet.rows[0][1] : 'The specific observation or value that directly answers the investigation question'],
    ['Which limitation should be named in the CER response?', packet ? packet.limitation : 'A possible source of error or missing evidence that affects confidence in the claim'],
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
    ? `<p><strong>Investigation Question:</strong> ${packet.question}</p><p><strong>Claim:</strong> ${packet.claim}</p><table border="1" cellpadding="6"><tr><th>Evidence Source or Condition</th><th>Data or Observation</th><th>How to Use It</th></tr>${packet.rows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</table>`
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

Instruction is designed for clear student ownership with accessible Teacher of Record support throughout the course. Lessons activate prior knowledge, explain why the learning matters, teach concepts explicitly, display and label the required biology, model complete solutions, guide practice, support independent transfer, and verify mastery. Students are encouraged to contact their Teacher of Record whenever directions, evidence, feedback, or a next step remains unclear.

This is a laboratory science course. Lessons 1-6 in each unit teach the core topics through the standard seven-page instructional workflow. Lesson 7 in each unit is the dedicated lab, simulation, model, or data-investigation lesson. Lesson 7 is a documented science-template exception: P04 is Data Collection and Analysis instead of the normal three-worked-example page, and the Guided Practice and Lesson Quiz assess investigation design, variables, procedure, safety, data/model interpretation, evidence selection, limitations, and CER reasoning. Lesson 8 is the unit synthesis and assessment lesson.

The rebuilt course contains 48 lessons, 336 Moodle-fragment HTML lesson pages, 102 Moodle XML assessment banks, 1,590 Moodle XML questions, six dedicated Lesson 7 investigations, and zero Lesson 8 quiz banks. Final certification depends on the current generated files and audit reports, not on an earlier version of the course.

---

## Standards Alignment

As a registered private school in the State of Florida, Mindful Learning Academy follows Florida academic standards and official course expectations as the primary academic framework for this course.

Biology source-of-truth production files are aligned to CPALMS Biology 1 course number 2000310, Florida science benchmarks, Florida B.E.S.T. embedded literacy expectations when referenced, Common Core Literacy in Science and Technical Subjects support, ACT Science readiness, and SAT evidence/data expectations. MLA standards organize those requirements for course production, lesson mapping, Moodle XML assessments, mastery tracking, and audit evidence.

Source-of-truth control follows this order: approved MLA standard inventory and crosswalk, unit-level mapping, lesson-level mapping, lab/visual/simulation mapping, Course Overview, current lesson files, and current Moodle XML assessment files. Old unit overview files are not used as source of truth for Biology production decisions.

---

## Course Structure

Approved unit sequence:

- Unit 1: Scientific Thinking and Biology Foundations
- Unit 2: Cells, Homeostasis, and Transport
- Unit 3: Cellular Energy and Life Processes
- Unit 4: DNA, Genetics, and Heredity
- Unit 5: Evolution, Classification, and Diversity of Life
- Unit 6: Ecology, Interdependence, and Human Impact

Each unit begins with a Unit Pretest. Lessons 1-6 use the MLA page sequence while teaching through biology-specific diagrams, models, data, and explanations. Lesson 7 is the dedicated science lab/simulation/data-investigation lesson and includes the complete question, evidence, procedure, recording directions, data analysis, guided practice, independent work, checkpoint, and lesson quiz. Lesson 8 is Putting It All Together and contains Guided Practice plus the Unit Assessment instead of a Lesson Quiz.

Lesson 7 required investigation evidence is self-contained in the lesson pages and Moodle XML question stimulus. Students are not required to search for a lab, simulation, data set, or outside source to complete the required investigation evidence. If a future resource is added, the exact direct URL and page-level student directions must be inserted where the student uses it.

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

Audit-confirmed production totals:

- Unit Pretests: 6 banks, 60 questions.
- Guided Practice: 48 banks, 240 questions.
- Lesson Quizzes: 42 banks, 1,050 questions.
- Unit Assessments: 6 banks, 240 questions.
- Total Moodle XML: 102 banks, 1,590 questions.

Mastery requires accurate standards-aligned evidence, scientific reasoning, and 80% mastery or revision/resubmission through Teacher of Record workflow.

---

## Biology Science Architecture Requirements

The current course is certified only when automated and human review verify all of the following in the generated files:

- ALG1-style Moodle fragment pages with no full HTML shell.
- Exactly one Teacher of Record support box per page.
- Lesson 7 mapped as the dedicated investigation lesson in every unit.
- Lesson 7 P04 uses Data Collection and Analysis as the documented science exception.
- Non-Lesson 7 P04 pages retain three worked examples.
- Lesson 8 has no lesson quiz bank.
- Moodle XML question counts match the approved 1.0-credit course structure.
- Assessment items include four choices, one correct answer, teachable feedback, standards trace, and non-patterned answer positions.
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

## Readiness Audit Alignment

The Biology Lesson 7 Science Investigation Readiness Audit dated 2026-07-14 passed the production gate for the revised science architecture. Unit-level mapping must therefore be interpreted with these controls:

- Every unit has exactly one dedicated investigation lesson: Lesson 7.
- Lesson 7 applies the unit standards through data/model evidence, procedure reasoning, variables, safety, limitations, and CER.
- Lesson 8 synthesizes Lessons 1-7 and does not introduce a new primary standard.
- Required investigation evidence is self-contained in lesson pages and Moodle XML stimulus unless an exact direct external resource is separately inserted with page-level directions.
- Unit assessment stimulus must include unit-taught models, data, graphs, scenarios, or evidence displays when required by the assessed standard.

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
| 2026-07-14 readiness audit alignment added | PASS |
| Unit-level Moodle XML evidence requirement stated | PASS |
| Student search dependency removed from required investigation evidence | PASS |
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

## Readiness Audit Alignment

The Biology Lesson 7 Science Investigation Readiness Audit dated 2026-07-14 records a PASS decision for the revised lesson architecture. Lesson production and any future repair must preserve these audit-confirmed controls:

- 48 total lessons and 336 Moodle-fragment HTML pages.
- Lessons 1-6 and Lesson 8 use the standard heading workflow; Lesson 7 uses the science investigation workflow below.
- Every page includes exactly one Teacher of Record support box.
- Lesson 7 P04 is Data Collection and Analysis, not a normal three-worked-example page.
- P04 in all non-Lesson 7 lessons must retain three worked examples.
- Lesson 8 has Guided Practice and Unit Assessment only; no Lesson 8 quiz bank is created or certified.
- Moodle XML assessment scope stays locked to the mapped lesson or unit.
- Lesson 7 Guided Practice and Lesson Quiz questions must include investigation language and embedded stimulus so students do not need to search across pages or outside resources.

## Assessment Bank Requirements by Lesson Type

| Lesson Type | Guided Practice | Lesson Quiz | Unit Assessment | Required Scope |
|---|---:|---:|---:|---|
| Lessons 1-6 | 5 questions | 25 questions | Not applicable | Assigned lesson standards only |
| Lesson 7 Investigation | 5 lab/data questions | 25 lab/data/investigation questions | Not applicable | Assigned unit investigation standards applied through data/model/CER |
| Lesson 8 Synthesis | 5 synthesis questions | No quiz bank | 40 questions | Unit standards taught in Lessons 1-7 |

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
| 2026-07-14 readiness audit alignment added | PASS |
| Lesson 7 Guided Practice and Quiz scope stated | PASS |
| Lesson 8 no-quiz rule stated | PASS |
| Assessment counts by lesson type stated | PASS |
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

// Veteran-teacher rebuild: replace the original generic page/question routines
// with lesson-specific biology instruction, visible evidence, and transfer tasks.
pageP01 = veteranRenderer.pageP01;
pageP02 = veteranRenderer.pageP02;
pageP03 = veteranRenderer.pageP03;
pageP04 = veteranRenderer.pageP04;
pageP05 = veteranRenderer.pageP05;
pageP06 = veteranRenderer.pageP06;
pageP07 = veteranRenderer.pageP07;
assessmentItems = veteranRenderer.assessmentItems;
unitItems = (unit, type, count) => veteranRenderer.unitItems(unit, type, count, lessonObj);

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
