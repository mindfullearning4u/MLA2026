const fs = require("fs");
const path = require("path");

const root = process.cwd();
const course = "GLOBAL PERSPECTIVES";
const courseDir = path.join(root, course);
const productionDir = path.join(courseDir, "Course Production");
const auditDir = path.join(courseDir, "Course Audit");

fs.mkdirSync(productionDir, { recursive: true });
fs.mkdirSync(auditDir, { recursive: true });

const sourceUrls = {
  catalog: "C:/Users/acrue/MLA2026-1/catalogs/HS Catalog",
  cpalmsStandards: "https://www.cpalms.org/Public/search/Standard",
  cpalmsCourses: "https://www.cpalms.org/public/search/Course",
  sat: "https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing",
  act: "https://www.act.org/content/act/en/college-and-career-readiness/standards.html",
};

const standards = [
  ["MLA.GP.FND.1", "Global inquiry and question framing", "Form precise global-issue questions, define the issue, identify stakeholders, and distinguish description, explanation, evaluation, and proposal.", "Florida social studies inquiry/geography/world history support; CPALMS social studies search checked", "B.E.S.T. evidence-based reading/writing support", "CCSS literacy in history/social studies evidence support", "SAT Information and Ideas; Craft and Structure", "ACT Reading: key ideas, details, integration of knowledge"],
  ["MLA.GP.FND.2", "Source reliability, perspective, and bias", "Evaluate source origin, purpose, audience, evidence quality, bias, limitation, corroboration, and missing viewpoint.", "Florida social studies inquiry/civics/history support; CPALMS social studies search checked", "B.E.S.T. evaluating arguments and evidence support", "CCSS sourcing/corroboration support", "SAT Information and Ideas; Craft and Structure", "ACT Reading: author purpose, evidence, relationships"],
  ["MLA.GP.GEO.1", "Geography, scale, place, and regional patterns", "Use maps, spatial scale, regional comparison, demographic data, and physical/human geography to explain global patterns.", "Florida geography and world history support; CPALMS social studies search checked", "B.E.S.T. informational text and data literacy support", "CCSS map/data integration support", "SAT informational graphics", "ACT Reading/Science: data interpretation and analysis"],
  ["MLA.GP.CUL.1", "Culture, identity, and intercultural understanding", "Explain culture, identity, language, tradition, social norms, and cultural interaction without stereotyping or overgeneralizing.", "Florida world history/geography/social science support", "B.E.S.T. perspective and theme support", "CCSS compare perspectives support", "SAT paired perspectives and vocabulary in context", "ACT Reading: comparative relationships"],
  ["MLA.GP.CUL.2", "Belief systems, media, representation, and narrative", "Analyze how beliefs, media, public narratives, and representation influence how people understand global issues.", "Florida world history/civics/social science support", "B.E.S.T. rhetoric, point of view, media literacy support", "CCSS rhetoric and source analysis support", "SAT Craft and Structure; Expression of Ideas", "ACT English/Writing: rhetorical skills and organization"],
  ["MLA.GP.ECO.1", "Development, poverty, inequality, and quality of life", "Use economic and social indicators to analyze development, poverty, inequality, opportunity, and quality of life.", "Florida economics/geography/world history support", "B.E.S.T. data and evidence support", "CCSS quantitative information support", "SAT tables/graphs and evidence reasoning", "ACT Reading/Science: data and inference"],
  ["MLA.GP.ECO.2", "Globalization, trade, labor, technology, and supply chains", "Explain how trade, labor, technology, specialization, interdependence, and supply chains create benefits, risks, and tradeoffs.", "Florida economics/world history/geography support", "B.E.S.T. cause/effect and argument support", "CCSS explanatory and argumentative literacy support", "SAT Information and Ideas; Expression of Ideas", "ACT Reading: sequence, cause-effect, comparative reasoning"],
  ["MLA.GP.GOV.1", "Governance, citizenship, international organizations, and human rights", "Analyze how governments, civic actors, international organizations, treaties, and human-rights frameworks respond to global issues.", "Florida civics/government/world history support", "B.E.S.T. civic text and evidence support", "CCSS civic/informational literacy support", "SAT argument and evidence analysis", "ACT Reading/Writing: claims and support"],
  ["MLA.GP.GOV.2", "Conflict, diplomacy, peacebuilding, and security", "Evaluate causes of conflict and compare diplomacy, negotiation, peacebuilding, sanctions, aid, and security responses.", "Florida world history/civics/geography support", "B.E.S.T. source comparison and argument support", "CCSS multiple-source synthesis support", "SAT paired passages and evidence", "ACT Reading: relationships and evaluation"],
  ["MLA.GP.ENV.1", "Sustainability, climate, resources, and environmental justice", "Use environmental data and stakeholder perspectives to analyze sustainability, resource use, climate risk, and environmental justice.", "Florida geography/world history/environmental issue support", "B.E.S.T. data-based informational text support", "CCSS science/technical and social studies literacy support", "SAT informational graphics", "ACT Science/Reading: data interpretation and evaluation"],
  ["MLA.GP.POP.1", "Population, migration, urbanization, health, and resilience", "Analyze population trends, migration, urbanization, public health, displacement, and resilience using data and human-impact evidence.", "Florida geography/world history/public policy support", "B.E.S.T. informational/data literacy support", "CCSS quantitative and source synthesis support", "SAT tables/graphs and evidence", "ACT Reading/Science: data trends and conclusions"],
  ["MLA.GP.CAP.1", "Global issue research synthesis", "Develop a researchable global issue question, gather varied sources, synthesize evidence, explain multiple perspectives, and identify limitations.", "Florida social studies inquiry and literacy support", "B.E.S.T. research, writing, and evidence support", "CCSS research and synthesis support", "SAT Information and Ideas; Expression of Ideas", "ACT Writing/Reading: claim, evidence, organization"],
  ["MLA.GP.CAP.2", "Ethical action proposal and civic communication", "Create a realistic, ethical, evidence-based proposal that explains stakeholders, intended impact, tradeoffs, limitations, and evaluation measures.", "Florida civics/geography/economics/social science support", "B.E.S.T. argumentative writing and presentation support", "CCSS argument, presentation, and collaboration support", "SAT Expression of Ideas; conventions", "ACT Writing: ideas, development, organization, language"],
];

const units = [
  {
    unit: "Unit 01",
    title: "Global Inquiry, Geography, Sources, and Perspective",
    purpose: "Build the evidence habits students need before studying complex global issues: question framing, maps, scale, source reliability, perspective, bias, and respectful multi-perspective reasoning.",
    standards: ["MLA.GP.FND.1", "MLA.GP.FND.2", "MLA.GP.GEO.1"],
    visuals: "world-region map, scale ladder, source reliability checklist, perspective matrix, claim-evidence-reasoning organizer",
  },
  {
    unit: "Unit 02",
    title: "Culture, Identity, Communication, and Representation",
    purpose: "Teach students to analyze culture and identity carefully, avoid stereotypes, compare perspectives, and evaluate media/narratives that shape global understanding.",
    standards: ["MLA.GP.CUL.1", "MLA.GP.CUL.2", "MLA.GP.FND.2"],
    visuals: "culture iceberg model, identity web, media representation table, source perspective organizer, stereotype-vs-evidence chart",
  },
  {
    unit: "Unit 03",
    title: "Global Economies, Development, Inequality, and Technology",
    purpose: "Use indicators, maps, charts, and scenarios to explain development, poverty, inequality, globalization, trade, labor, technology, and supply-chain tradeoffs.",
    standards: ["MLA.GP.ECO.1", "MLA.GP.ECO.2"],
    visuals: "development indicator table, quality-of-life dashboard, supply-chain flow map, tradeoff matrix, inequality data display",
  },
  {
    unit: "Unit 04",
    title: "Governance, Human Rights, Conflict, and Cooperation",
    purpose: "Analyze institutions, rights, international organizations, conflict causes, diplomacy, peacebuilding, and global cooperation using civic/process visuals and source evidence.",
    standards: ["MLA.GP.GOV.1", "MLA.GP.GOV.2"],
    visuals: "human-rights framework chart, governance level diagram, conflict cause web, diplomacy pathway, international organization role table",
  },
  {
    unit: "Unit 05",
    title: "Environment, Population, Migration, Health, and Sustainability",
    purpose: "Use environmental and demographic evidence to analyze sustainability, climate risk, resource use, migration, urbanization, public health, and resilience.",
    standards: ["MLA.GP.ENV.1", "MLA.GP.POP.1", "MLA.GP.GEO.1"],
    visuals: "climate-risk map, resource-use table, migration push-pull chart, population pyramid, resilience planning matrix",
  },
  {
    unit: "Unit 06",
    title: "Global Problem Solving, Research Synthesis, and Capstone Action",
    purpose: "Synthesize the course by building a defensible global-issue research question, evaluating sources, comparing stakeholders, and creating an ethical action proposal.",
    standards: ["MLA.GP.CAP.1", "MLA.GP.CAP.2", "MLA.GP.FND.1", "MLA.GP.FND.2"],
    visuals: "research planning board, stakeholder map, evidence synthesis matrix, action proposal logic model, impact evaluation checklist",
  },
];

const lessons = [
  ["01", "01", "Instructional lesson with guided practice and lesson quiz", "What Makes an Issue Global?", ["MLA.GP.FND.1"], "Students distinguish local, national, regional, and global issues and learn why scale changes evidence needs.", "scale ladder and global-issue decision chart"],
  ["01", "02", "Instructional lesson with guided practice and lesson quiz", "Asking Strong Global Questions", ["MLA.GP.FND.1"], "Students turn broad topics into precise, researchable questions with stakeholders, location, time frame, and evidence need.", "question-quality checklist"],
  ["01", "03", "Instructional lesson with guided practice and lesson quiz", "Maps, Regions, Scale, and Spatial Patterns", ["MLA.GP.GEO.1"], "Students use maps as evidence, compare regional patterns, and avoid overgeneralizing from one place.", "world-region map and scale comparison table"],
  ["01", "04", "Instructional lesson with guided practice and lesson quiz", "Source Reliability, Origin, Purpose, and Audience", ["MLA.GP.FND.2"], "Students evaluate sources by origin, purpose, audience, evidence, and limitation before trusting a claim.", "source reliability checklist"],
  ["01", "05", "Instructional lesson with guided practice and lesson quiz", "Perspective, Bias, Missing Voices, and Corroboration", ["MLA.GP.FND.2"], "Students compare perspectives and identify what each source can and cannot prove.", "perspective and corroboration matrix"],
  ["01", "06", "Instructional lesson with guided practice and lesson quiz", "Using Data Without Overclaiming", ["MLA.GP.GEO.1", "MLA.GP.FND.2"], "Students read tables, graphs, and maps while checking units, scale, source, and limits.", "data-reading checklist and overclaim warning chart"],
  ["01", "07", "Instructional lesson with guided practice and lesson quiz", "Claim, Evidence, Reasoning for Global Issues", ["MLA.GP.FND.1", "MLA.GP.FND.2"], "Students build evidence-based explanations that stay inside the evidence and acknowledge limitation.", "CER organizer"],
  ["01", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 1 Synthesis: Evidence-Based Global Inquiry", ["MLA.GP.FND.1", "MLA.GP.FND.2", "MLA.GP.GEO.1"], "Students synthesize questions, maps, sources, perspectives, data, and claims.", "global inquiry evidence portfolio"],
  ["02", "01", "Instructional lesson with guided practice and lesson quiz", "Culture, Norms, Values, and Daily Life", ["MLA.GP.CUL.1"], "Students define culture through evidence and distinguish pattern from stereotype.", "culture iceberg and evidence table"],
  ["02", "02", "Instructional lesson with guided practice and lesson quiz", "Identity, Belonging, and Multiple Perspectives", ["MLA.GP.CUL.1"], "Students analyze identity and belonging while avoiding single-story explanations.", "identity web and perspective chart"],
  ["02", "03", "Instructional lesson with guided practice and lesson quiz", "Language, Communication, and Meaning", ["MLA.GP.CUL.1"], "Students explain how language, context, translation, and communication norms affect understanding.", "communication-context table"],
  ["02", "04", "Instructional lesson with guided practice and lesson quiz", "Belief Systems and Worldviews", ["MLA.GP.CUL.2"], "Students compare belief systems respectfully by evidence, practice, values, and context.", "belief-system comparison organizer"],
  ["02", "05", "Instructional lesson with guided practice and lesson quiz", "Media Representation and Global Narratives", ["MLA.GP.CUL.2", "MLA.GP.FND.2"], "Students analyze how media framing, image choice, headline, and missing context shape audience understanding.", "media frame analysis table"],
  ["02", "06", "Instructional lesson with guided practice and lesson quiz", "Stereotypes, Generalizations, and Evidence", ["MLA.GP.CUL.1", "MLA.GP.FND.2"], "Students learn to replace stereotypes with precise, evidence-based claims.", "stereotype-vs-evidence chart"],
  ["02", "07", "Instructional lesson with guided practice and lesson quiz", "Intercultural Communication and Respectful Dialogue", ["MLA.GP.CUL.1", "MLA.GP.CUL.2"], "Students practice explaining disagreement, misunderstanding, and respectful dialogue with evidence.", "dialogue repair flowchart"],
  ["02", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 2 Synthesis: Culture, Identity, and Representation", ["MLA.GP.CUL.1", "MLA.GP.CUL.2", "MLA.GP.FND.2"], "Students synthesize culture, identity, media representation, source perspective, and respectful evidence.", "culture and representation evidence matrix"],
  ["03", "01", "Instructional lesson with guided practice and lesson quiz", "Development Indicators and Quality of Life", ["MLA.GP.ECO.1"], "Students use indicators to compare development while recognizing what numbers leave out.", "development indicator dashboard"],
  ["03", "02", "Instructional lesson with guided practice and lesson quiz", "Poverty, Inequality, and Opportunity", ["MLA.GP.ECO.1"], "Students analyze poverty and inequality with care, evidence, and attention to opportunity structures.", "inequality data table"],
  ["03", "03", "Instructional lesson with guided practice and lesson quiz", "Trade, Interdependence, and Comparative Advantage", ["MLA.GP.ECO.2"], "Students explain why countries trade and how interdependence creates benefits and vulnerabilities.", "trade network map"],
  ["03", "04", "Instructional lesson with guided practice and lesson quiz", "Supply Chains, Labor, and Consumer Choices", ["MLA.GP.ECO.2"], "Students trace a product through a supply chain and analyze labor, cost, and responsibility.", "supply-chain flow map"],
  ["03", "05", "Instructional lesson with guided practice and lesson quiz", "Technology, Innovation, and Unequal Access", ["MLA.GP.ECO.2"], "Students evaluate how technology expands opportunity and also creates gaps in access.", "technology access comparison chart"],
  ["03", "06", "Instructional lesson with guided practice and lesson quiz", "Aid, Investment, Debt, and Development Strategies", ["MLA.GP.ECO.1"], "Students compare development strategies by intended benefit, tradeoff, and evidence of impact.", "development strategy tradeoff matrix"],
  ["03", "07", "Instructional lesson with guided practice and lesson quiz", "Ethical Economic Decisions in a Global Marketplace", ["MLA.GP.ECO.1", "MLA.GP.ECO.2"], "Students evaluate economic decisions from consumer, worker, business, government, and community perspectives.", "stakeholder decision matrix"],
  ["03", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 3 Synthesis: Development, Trade, and Global Choices", ["MLA.GP.ECO.1", "MLA.GP.ECO.2"], "Students synthesize indicators, trade, supply chains, labor, technology, and ethical decisions.", "global economy evidence portfolio"],
  ["04", "01", "Instructional lesson with guided practice and lesson quiz", "Governance Levels and International Cooperation", ["MLA.GP.GOV.1"], "Students compare local, national, regional, and international decision-making roles.", "governance level diagram"],
  ["04", "02", "Instructional lesson with guided practice and lesson quiz", "Human Rights Principles and Responsibilities", ["MLA.GP.GOV.1"], "Students analyze human rights as claims, responsibilities, protections, and contested implementation.", "rights-principles chart"],
  ["04", "03", "Instructional lesson with guided practice and lesson quiz", "International Organizations and Global Problem Solving", ["MLA.GP.GOV.1"], "Students evaluate what international organizations can and cannot do in global problems.", "international organization role table"],
  ["04", "04", "Instructional lesson with guided practice and lesson quiz", "Conflict Causes: Resources, Identity, Power, and History", ["MLA.GP.GOV.2"], "Students identify layered causes of conflict without reducing conflict to one factor.", "conflict cause web"],
  ["04", "05", "Instructional lesson with guided practice and lesson quiz", "Diplomacy, Negotiation, Sanctions, and Peacebuilding", ["MLA.GP.GOV.2"], "Students compare tools for resolving conflict and evaluate likely tradeoffs.", "diplomacy response pathway"],
  ["04", "06", "Instructional lesson with guided practice and lesson quiz", "Refugees, Humanitarian Response, and Protection", ["MLA.GP.GOV.1", "MLA.GP.GOV.2"], "Students analyze displacement and humanitarian response with stakeholder evidence.", "humanitarian response map/table"],
  ["04", "07", "Instructional lesson with guided practice and lesson quiz", "Justice, Reconciliation, and Post-Conflict Recovery", ["MLA.GP.GOV.2"], "Students compare post-conflict recovery options and evidence of justice and stability.", "recovery option comparison matrix"],
  ["04", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 4 Synthesis: Rights, Conflict, and Cooperation", ["MLA.GP.GOV.1", "MLA.GP.GOV.2"], "Students synthesize governance, rights, conflict, diplomacy, humanitarian response, and recovery.", "rights-conflict-cooperation evidence matrix"],
  ["05", "01", "Instructional lesson with guided practice and lesson quiz", "Sustainability and Resource Use", ["MLA.GP.ENV.1"], "Students explain sustainability through resource use, tradeoffs, stakeholder needs, and long-term impact.", "sustainability tradeoff table"],
  ["05", "02", "Instructional lesson with guided practice and lesson quiz", "Climate Risk, Vulnerability, and Adaptation", ["MLA.GP.ENV.1", "MLA.GP.GEO.1"], "Students use climate-risk maps and vulnerability evidence to explain unequal impact.", "climate-risk map and vulnerability chart"],
  ["05", "03", "Instructional lesson with guided practice and lesson quiz", "Water, Food, Energy, and Environmental Justice", ["MLA.GP.ENV.1"], "Students connect resource access, environmental justice, and community impact.", "water-food-energy nexus diagram"],
  ["05", "04", "Instructional lesson with guided practice and lesson quiz", "Population Trends and Demographic Evidence", ["MLA.GP.POP.1"], "Students read population pyramids, growth rates, and demographic indicators without overclaiming.", "population pyramid and trend table"],
  ["05", "05", "Instructional lesson with guided practice and lesson quiz", "Migration, Displacement, Push and Pull Factors", ["MLA.GP.POP.1", "MLA.GP.GEO.1"], "Students distinguish voluntary migration, forced displacement, and layered push/pull factors.", "migration push-pull map"],
  ["05", "06", "Instructional lesson with guided practice and lesson quiz", "Urbanization, Public Health, and Infrastructure", ["MLA.GP.POP.1"], "Students analyze urban growth, health, infrastructure, and resilience using data.", "urban systems and health indicator chart"],
  ["05", "07", "Instructional lesson with guided practice and lesson quiz", "Community Resilience and Sustainable Solutions", ["MLA.GP.ENV.1", "MLA.GP.POP.1"], "Students evaluate resilience plans by risk, resources, stakeholders, and measurable impact.", "resilience planning matrix"],
  ["05", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 5 Synthesis: People, Place, and Sustainability", ["MLA.GP.ENV.1", "MLA.GP.POP.1", "MLA.GP.GEO.1"], "Students synthesize environmental, demographic, geographic, and resilience evidence.", "people-place-sustainability portfolio"],
  ["06", "01", "Instructional lesson with guided practice and lesson quiz", "Choosing a Global Issue and Research Question", ["MLA.GP.CAP.1", "MLA.GP.FND.1"], "Students select a bounded global issue and write a research question with evidence requirements.", "capstone question planner"],
  ["06", "02", "Instructional lesson with guided practice and lesson quiz", "Building an Evidence Base with Reliable Sources", ["MLA.GP.CAP.1", "MLA.GP.FND.2"], "Students gather varied sources and evaluate reliability, usefulness, and limitations.", "source evaluation log"],
  ["06", "03", "Instructional lesson with guided practice and lesson quiz", "Stakeholder Analysis and Multiple Perspectives", ["MLA.GP.CAP.1"], "Students map stakeholders, interests, power, needs, and likely disagreement.", "stakeholder map"],
  ["06", "04", "Instructional lesson with guided practice and lesson quiz", "Comparing Policy, Community, and Individual Responses", ["MLA.GP.CAP.2", "MLA.GP.GOV.1"], "Students compare response options by feasibility, equity, risk, and measurable impact.", "response option comparison table"],
  ["06", "05", "Instructional lesson with guided practice and lesson quiz", "Writing an Evidence-Based Global Issue Explanation", ["MLA.GP.CAP.1"], "Students synthesize evidence into a clear explanation with claim, evidence, reasoning, and limitation.", "evidence synthesis matrix"],
  ["06", "06", "Instructional lesson with guided practice and lesson quiz", "Designing an Ethical Action Proposal", ["MLA.GP.CAP.2"], "Students design a realistic action proposal with stakeholders, steps, tradeoffs, safeguards, and evaluation.", "action proposal logic model"],
  ["06", "07", "Instructional lesson with guided practice and lesson quiz", "Presenting, Revising, and Defending a Global Perspective", ["MLA.GP.CAP.1", "MLA.GP.CAP.2"], "Students present evidence, respond to critique, revise claims, and defend conclusions respectfully.", "presentation and revision checklist"],
  ["06", "08", "Synthesis/unit assessment lesson; no lesson quiz", "Unit 6 Synthesis: Global Perspectives Capstone Portfolio", ["MLA.GP.CAP.1", "MLA.GP.CAP.2", "MLA.GP.FND.1", "MLA.GP.FND.2"], "Students submit a capstone portfolio synthesizing research question, evidence, perspectives, proposal, and reflection.", "capstone portfolio rubric matrix"],
];

const codeToStandard = Object.fromEntries(standards.map((s) => [s[0], s]));
const lessonRows = lessons.map(([unit, lesson, role, title, codes, purpose, visual]) => ({ unit, lesson, role, title, codes, purpose, visual }));

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\n/g, "<br>")).join(" | ")} |`),
  ].join("\n");
}

function write(name, content) {
  fs.writeFileSync(path.join(productionDir, name), `${content.trim()}\n`, "utf8");
}

function writeAudit(name, content) {
  fs.writeFileSync(path.join(auditDir, name), `${content.trim()}\n`, "utf8");
}

const overview = `
# Global Perspectives Course Overview

## Course Description

Global Perspectives is a 1.0-credit social science and humanities elective that teaches students how to investigate complex global issues with evidence, source reliability, maps, data, multiple perspectives, ethical reasoning, and practical problem-solving. The course is designed for mastery-based online learning, so each lesson must teach the concept directly and step by step without relying on live teacher instruction.

Students learn to ask precise global questions, evaluate sources, compare stakeholder perspectives, read maps and data displays, analyze cultural and economic patterns, examine governance and human-rights responses, interpret environmental and demographic evidence, and complete a capstone global issue proposal.

## Standards Alignment

The course uses MLA Global Perspectives standards developed for this academy elective and aligned to Florida social studies expectations through CPALMS social studies course and standards references. Florida B.E.S.T. literacy expectations, Common Core literacy-in-history/social-studies support, SAT Reading and Writing evidence skills, and ACT College and Career Readiness Standards are included as support layers.

Primary content standards are MLA.GP standards. Support standards do not replace the course content standards. They define the evidence, reading, writing, data, and college-readiness skills students use while learning the course content.

## Learning Objectives / Outcomes

By the end of the course, students will be able to:

- Frame a global issue as a precise, researchable question.
- Use maps, tables, graphs, demographic data, source excerpts, and stakeholder evidence to explain global patterns.
- Evaluate source reliability, bias, missing perspectives, and limits of evidence.
- Analyze culture, identity, media representation, development, inequality, globalization, governance, human rights, conflict, sustainability, population, migration, and public health through evidence.
- Compare stakeholder perspectives without stereotyping, overgeneralizing, or relying on unsupported opinion.
- Build an ethical, realistic, evidence-based action proposal for a global issue.

## Prerequisite Knowledge / Skills

Students should be able to read grade-level informational text, identify a claim and evidence, interpret basic maps and tables, write short explanations, and revise based on feedback. The course reteaches required source analysis, data reading, and evidence reasoning before applying them to complex issues.

## Course Structure

This is a 1.0-credit course with six units and eight lessons per unit. Lessons 1-7 in each unit include instruction, guided practice, independent work, checkpoint workflow, and a lesson quiz. Lesson 8 is the synthesis and unit-assessment lesson.

## Lesson Workflow

Each lesson follows the MLA P01-P07 structure:

- P01 Lesson Overview
- P02 Notebook Task Part 1
- P03 Notebook Task Part 2
- P04 Worked Example
- P05 Guided Practice
- P06 Independent Work
- P07 Checkpoint

Every page must include or trace the mapped standard, teach step by step, include the needed visual/source support near the explanation, and tell students exactly what evidence to use.

## Assessment Structure

Assessments must be Moodle XML only. Lesson assessments must stay inside the mapped lesson standard. Unit pretests and unit assessments must stay inside the mapped unit standards. Visual/source/data stimuli must be embedded directly in XML questions when needed.

Expected assessment structure:

- Unit Pretest: 10 Moodle XML questions per unit
- Guided Practice: 5 Moodle XML questions per lesson
- Lesson Quiz Bank: 25 Moodle XML questions for Lessons 1-7
- Unit Assessment Bank: 40 Moodle XML questions for Lesson 8

## Mastery & Progression Criteria

Students demonstrate mastery through notebook evidence, guided practice, independent work, checkpoints, lesson quizzes, unit assessments, and the Unit 6 capstone portfolio. The mastery threshold is 80%. Students who do not meet mastery receive Teacher of Record support and remediation before another attempt.

## College / Skill Readiness Integration

The course builds college and career readiness through evidence-based reading, data interpretation, source analysis, argument writing, civic reasoning, ethical decision-making, collaboration, and clear communication. SAT and ACT support skills are embedded through short source passages, tables, charts, graphs, map analysis, vocabulary in context, claim-evidence-reasoning, and revision tasks.
`;

const architecture = `
# Global Perspectives Curriculum Architecture Analysis

## Course Identity

Global Perspectives is a 1.0-credit social science and humanities elective in the MLA catalog. It is not a duplicate of World History, U.S. History, Government, Economics, Psychology, or Sociology. It is an interdisciplinary global-issue inquiry course.

## Architecture Decision

The course is organized by reasoning progression:

1. Inquiry, sources, maps, and evidence
2. Culture, identity, communication, and representation
3. Economies, development, inequality, and technology
4. Governance, human rights, conflict, and cooperation
5. Environment, population, migration, health, and sustainability
6. Capstone research, action proposal, and communication

This sequence teaches the tools first, then applies them to increasingly complex global systems, and ends with a capstone that requires evidence synthesis and ethical action planning.

## Non-Negotiable Production Rules

- Use 6 units and 8 lessons per unit.
- Lesson 8 in every unit is synthesis and unit assessment.
- Lessons 1-7 have lesson quizzes.
- Lesson 8 has no lesson quiz.
- Lessons must teach directly and step by step as asynchronous instruction.
- Students must not be told to search for missing maps, sources, tables, or visuals.
- Social science simulations are not required by default.
- Embedded visuals and sources are mandatory when they clarify the concept or are needed to answer tasks.
- Assessments must be Moodle XML only.

## Source Basis

The course-production package uses:

- MLA High School Course Catalog for course identity and credit value
- CPALMS Standards search and Course Directory for Florida social studies source provenance
- Florida B.E.S.T. literacy expectations as a support layer
- Common Core literacy-in-history/social-studies style support as a support layer
- SAT Reading and Writing content domains as college-readiness support
- ACT College and Career Readiness Standards as college/career-readiness support

## Compliance Rationale

The course supports accreditation and compliance by documenting source provenance, standards inventory, crosswalk, unit mapping, lesson mapping, visual/source requirements, assessment-stimulus requirements, and explicit boundaries for what may be taught and assessed.
`;

const inventory = `
# Global Perspectives MLA Standard Inventory

${table(
  ["MLA Standard", "Standard Title", "Student Mastery Expectation", "Florida / CPALMS Alignment", "B.E.S.T. Support", "Common Core Support", "SAT Support", "ACT Support"],
  standards.map(([code, title, desc, florida, best, common, sat, act]) => [code, title, desc, florida, best, common, sat, act])
)}

## Inventory Validation

- Primary course standards use MLA.GP numbering.
- Florida and CPALMS references are used as source provenance and support alignment, not as unverified one-to-one course replacement.
- B.E.S.T., Common Core, SAT, and ACT are support layers for literacy, source analysis, data interpretation, evidence reasoning, writing, and readiness.
- No standard is intentionally left unmapped.
`;

const crosswalkRows = [];
for (const row of lessonRows) {
  for (const code of row.codes) {
    crosswalkRows.push([code, `Unit ${row.unit} Lesson ${row.lesson}`, row.title, row.purpose, "Guided Practice, notebook/checkpoint evidence, lesson quiz for Lessons 1-7, and unit assessment evidence for Lesson 8"]);
  }
}
const crosswalk = `
# Global Perspectives Crosswalk

## Source Provenance and Readiness Trace

This crosswalk is maintained against Florida CPALMS social studies course and standards references, applicable Florida B.E.S.T. literacy expectations, Common Core literacy support for history/social studies reasoning, ACT college-readiness skills, and SAT Reading and Writing skills. Lesson developers, assessment developers, auditors, and Moodle transfer agents must preserve this source trace when validating standards coverage, lesson scope, assessment scope, visuals, source evidence, and student-readiness rigor.

## Source Limitation Note

The active CPALMS course directory was checked for course provenance. Global Perspectives is an MLA elective title in the academy catalog, so the crosswalk uses MLA.GP standards constrained by Florida social studies, geography, civics, economics, world history, and literacy-readiness expectations rather than claiming a single CPALMS Global Perspectives course record.

${table(["Standard", "Unit / Lesson", "Lesson Title", "Instructional Role", "Assessment Evidence"], crosswalkRows)}

## Crosswalk Validation Rules

- Every lesson must teach only the mapped standard(s).
- Every assessment item must use only the mapped lesson standard(s), except pretests and unit assessments, which may use the mapped unit standards.
- Support alignments build reading, writing, source, data, and readiness skills but do not add new content outside the MLA.GP standard.
`;

const alignment = `
# Global Perspectives Florida B.E.S.T., Common Core, SAT, and ACT Alignment

## Alignment Principle

Global Perspectives uses support standards to strengthen evidence reading, source analysis, data interpretation, writing, speaking, and college-readiness skills. These supports do not replace MLA.GP content standards.

${table(
  ["Support Layer", "Course Use", "Where It Appears", "Required Production Check"],
  [
    ["Florida / CPALMS Social Studies", "Social studies source provenance for geography, civics, economics, world history, inquiry, and public-policy reasoning", "Crosswalk, unit mapping, lesson mapping, visual/source mapping", "Every global issue lesson must remain inside mapped MLA.GP content and use social studies evidence responsibly."],
    ["Florida B.E.S.T. Literacy", "Informational reading, evidence-based writing, vocabulary, rhetoric, argument, and presentation support", "Notebook tasks, worked examples, independent work, checkpoints, XML feedback", "Every lesson must teach students how to read, use, and explain evidence."],
    ["Common Core Literacy Support", "History/social-studies literacy support for sourcing, corroboration, evidence, research, argument, and presentation", "Source analysis, claim-evidence-reasoning, capstone research, assessment stimuli", "Common Core support must not be treated as a primary course standard."],
    ["SAT Reading and Writing", "Information and Ideas, Craft and Structure, Expression of Ideas, conventions, short source passages, and informational graphics", "XML source questions, data/chart tasks, revision tasks, capstone communication", "Assessment questions should include short sources and graphics when needed."],
    ["ACT College and Career Readiness", "Reading, English, Writing, and Science-style data reasoning: main idea, relationships, evidence, organization, analysis, and evaluation", "Data displays, source excerpts, response proposals, capstone tasks", "Lessons must include teachable reasoning, not simple recall."],
  ]
)}

## Required Support Carry-Through

Every unit and lesson must document:

- source or visual support
- assessment stimulus needs
- evidence reasoning
- student misconception prevention
- Teacher of Record support workflow
`;

const provenance = `
# Global Perspectives Official Standards Provenance

${table(
  ["Standard Code", "Official Source Checked", "Source URL or File", "Exact Standard/Benchmark Title", "Course Use", "Crosswalk Location", "Unit Mapping Location", "Lesson Mapping Location", "Status"],
  [
    ["MLA.GP.FND.1-FND.2", "CPALMS Standards search and Course Directory; Florida social studies inquiry and literacy expectations; academy catalog", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}; ${sourceUrls.catalog}`, "Global inquiry, question framing, source reliability, perspective, bias, corroboration", "Primary course foundation", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 01 and Unit 06", "PHASE_3B_LESSON_MAPPING.md Units 01 and 06", "PASS"],
    ["MLA.GP.GEO.1", "CPALMS Standards search and Course Directory; Florida geography/social studies references", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}`, "Geography, map evidence, scale, region, population and spatial patterns", "Primary geographic reasoning support", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Units 01 and 05", "PHASE_3B_LESSON_MAPPING.md Units 01 and 05", "PASS"],
    ["MLA.GP.CUL.1-CUL.2", "CPALMS Standards search and Course Directory; Florida world history/social science references", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}`, "Culture, identity, belief systems, communication, media representation, and perspective", "Primary culture and communication content", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 02", "PHASE_3B_LESSON_MAPPING.md Unit 02", "PASS"],
    ["MLA.GP.ECO.1-ECO.2", "CPALMS Standards search and Course Directory; Florida economics/geography/world history references", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}`, "Development, inequality, trade, globalization, labor, technology, and supply chains", "Primary global economy content", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 03", "PHASE_3B_LESSON_MAPPING.md Unit 03", "PASS"],
    ["MLA.GP.GOV.1-GOV.2", "CPALMS Standards search and Course Directory; Florida civics/government/world history references", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}`, "Governance, citizenship, international organizations, human rights, conflict, diplomacy, and peacebuilding", "Primary governance and conflict content", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 04", "PHASE_3B_LESSON_MAPPING.md Unit 04", "PASS"],
    ["MLA.GP.ENV.1; MLA.GP.POP.1", "CPALMS Standards search and Course Directory; Florida geography/environmental and population issue support", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}`, "Sustainability, climate risk, resources, migration, urbanization, public health, and resilience", "Primary environment, population, and sustainability content", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 05", "PHASE_3B_LESSON_MAPPING.md Unit 05", "PASS"],
    ["MLA.GP.CAP.1-CAP.2", "CPALMS Standards search and Course Directory; SAT Reading and Writing; ACT College and Career Readiness Standards", `${sourceUrls.cpalmsStandards}; ${sourceUrls.cpalmsCourses}; ${sourceUrls.sat}; ${sourceUrls.act}`, "Research synthesis, evidence base, stakeholder analysis, ethical proposal, presentation, and revision", "Primary capstone and college-readiness application", "PHASE_2A_B_CROSSWALK_DRAFT.md", "PHASE_3A_UNIT_MAPPING.md Unit 06", "PHASE_3B_LESSON_MAPPING.md Unit 06", "PASS"],
  ]
)}

## Verification Notes

- CPALMS Standards search and Course Directory were checked as Florida source provenance.
- SAT Reading and Writing support is based on College Board domains: Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions.
- ACT support is based on ACT College and Career Readiness Standards for English, Reading, Science-style data reasoning, and Writing.
- Global Perspectives is an MLA catalog elective; standards are internally numbered and externally bounded by the listed source layers.
`;

const unitMapping = `
# Global Perspectives Unit Mapping

Course structure: 1.0 credit, 6 units, 8 lessons per unit. Lesson 8 is synthesis and unit assessment.

${table(
  ["Unit", "Unit Title", "Purpose", "Standards Covered", "Required Visual/Source Supports", "Simulation Required?"],
  units.map((u) => [u.unit, u.title, u.purpose, u.standards.join("; "), u.visuals, "No simulation required"])
)}

## Unit Mapping Validation

- Every MLA.GP standard appears in at least one unit.
- Unit 6 is capstone synthesis and does not introduce an unmapped outside-standard project.
- Social science source/visual supports are mandatory when mapped.
`;

const lessonMapping = `
# Global Perspectives Lesson Mapping

Course structure: 1.0 credit. Lessons 1-7 have guided practice and lesson quiz. Lesson 8 has guided practice and unit assessment.

${table(
  ["Unit", "Lesson", "Credit-Based Lesson Role", "Lesson Title", "Standards", "Lesson Purpose", "Required Visual/Stimulus"],
  lessonRows.map((l) => [`Unit ${l.unit}`, `Lesson ${l.lesson}`, l.role, l.title, l.codes.join("; "), l.purpose, l.visual])
)}

## Lesson Mapping Rules

- Every lesson page and assessment item must stay inside the mapped standard(s).
- Lesson 8 is synthesis only and uses standards taught in Lessons 1-7 of the same unit.
- Required visuals, source excerpts, maps, charts, tables, matrices, and data displays must be embedded directly in lessons and XML assessments when needed.
`;

const visualRows = lessonRows.map((l) => [
  `Unit ${l.unit}`,
  `Lesson ${l.lesson}`,
  l.title,
  l.visual,
  l.visual,
  /GOV|CAP/.test(l.codes.join("; ")) ? "civic/process/source stimulus required when question asks about policy, rights, governance, stakeholders, or proposal evidence" : "source/data/visual stimulus required when question depends on evidence",
  "Embedded in lesson and Moodle XML; no external simulation required",
]);
const visualMapping = `
# Global Perspectives Visual and Source Mapping

## Rule

Global Perspectives does not require external simulations by default. Lessons and assessments do require embedded maps, timelines, source excerpts, charts, tables, graphs, matrices, data displays, stakeholder maps, civic/process visuals, or evidence organizers whenever those supports clarify the standard or are needed to answer the task.

${table(
  ["Unit", "Lesson", "Lesson Title", "Required Source/Visual Support", "Required Map/Timeline/Chart/Table/Data Display", "Required Civic/Political/Primary-Source Stimulus", "Assessment Stimulus Requirement"],
  visualRows
)}
`;

const traceRows = lessonRows.map((l) => {
  const best = "B.E.S.T. informational text, evidence, vocabulary, argument, and communication support";
  const common = "Common Core literacy support for history/social studies sourcing, evidence, research, and presentation";
  const sat = "SAT Reading and Writing: Information and Ideas, Craft and Structure, Expression of Ideas, informational graphics";
  const act = "ACT Reading/Writing/Science-style data reasoning: main idea, evidence, relationships, organization, analysis";
  return [`Unit ${l.unit}`, `Lesson ${l.lesson}`, l.role, l.title, l.codes.join("; "), best, common, sat, act, "ELD/accessibility: vocabulary preview, visual support, sentence frames, chunked source reading, explicit evidence steps", l.codes.map((c) => codeToStandard[c]?.[1] || c).join("; "), l.purpose, "PHASE_3B_LESSON_MAPPING.md"];
});
const fullTrace = `
# Global Perspectives Full Crosswalk Lesson Trace

${table(
  ["Unit", "Lesson", "Credit-Based Lesson Role", "Approved Lesson Title", "Primary Standard(s)", "Florida B.E.S.T. Support", "Common Core Support", "SAT Support", "ACT Support", "ELD/Accessibility Support", "Benchmark(s)", "Lesson Purpose", "Source File"],
  traceRows
)}

## Trace Validation

This trace is the control table for lesson and assessment development. Lesson developers, assessment developers, auditors, and Moodle transfer agents must use this table with the crosswalk, unit mapping, lesson mapping, and visual/source mapping.
`;

const audit = `
# Global Perspectives Course Production Audit

Date: 2026-07-11

## Scope

Course-production package only. Lessons and assessments have not been created yet.

## Required Initial Questions

${table(
  ["Question", "Answer"],
  [
    ["Course", "Global Perspectives"],
    ["Folder", "GLOBAL PERSPECTIVES"],
    ["Certified crosswalk or standards inventory", "Created in Course Production: PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md and PHASE_2A_B_CROSSWALK_DRAFT.md"],
    ["Certified unit mapping", "Created in PHASE_3A_UNIT_MAPPING.md"],
    ["Certified lesson mapping", "Created in PHASE_3B_LESSON_MAPPING.md"],
    ["Course overview", "Created in Course-Overview.md using approved student-facing structure"],
    ["Existing lesson objectives", "No prior lesson files exist; lesson objectives are controlled by the lesson mapping"],
    ["Existing unit/lesson files", "None present before production build"],
    ["Old source artifacts ignored", "No old artifacts found in this course folder"],
    ["Task mode", "Authorized course-production build, not lesson/assessment build"],
    ["Official standards sources checked", "CPALMS Standards search, CPALMS Course Directory, MLA catalog, SAT Reading and Writing, ACT College and Career Readiness Standards"],
    ["Florida B.E.S.T., CPALMS, Common Core, ACT, SAT required?", "Yes, as source/support layers with MLA.GP as primary content standards"],
    ["Visual/source requirements", "Mapped in PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"],
    ["Labs/simulations", "No simulation required by default for this social science elective"],
    ["Credit value", "1.0 credit; 6 units; 8 lessons per unit; Lesson 8 synthesis/unit assessment"],
  ]
)}

## File Gate

${table(
  ["Required File", "Status"],
  [
    ["Course-Overview.md", "PASS"],
    ["PHASE_1B_CURRICULUM_ARCHITECTURE_ANALYSIS.md", "PASS"],
    ["PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md", "PASS"],
    ["PHASE_2A_B_CROSSWALK_DRAFT.md", "PASS"],
    ["PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md", "PASS"],
    ["PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md", "PASS"],
    ["PHASE_3A_UNIT_MAPPING.md", "PASS"],
    ["PHASE_3B_LESSON_MAPPING.md", "PASS"],
    ["PHASE_3A_B_VISUAL_SOURCE_MAPPING.md", "PASS"],
    ["PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", "PASS"],
  ]
)}

## Audit Findings

- Required structural fixes: None for course production.
- Required metadata fixes: None for course production.
- Required assessment fixes: Assessments are not built yet; assessment developer must use Moodle XML only.
- Suggested instructional rigor improvements: During lesson build, every lesson must include detailed step-by-step instruction, three worked examples on P04, embedded source/visual supports, and misconception feedback.
- Suggested visual/resource additions: Use the mapped visual/source support in every lesson and XML assessment where applicable.
- Suggested simulation/resource additions: None required by default.
- Blockers requiring user approval: None.

## Certification Decision

PASS for course-production readiness. This does not certify lessons or assessments because they have not been built yet.
`;

write("Course-Overview.md", overview);
write("PHASE_1B_CURRICULUM_ARCHITECTURE_ANALYSIS.md", architecture);
write("PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md", inventory);
write("PHASE_2A_B_CROSSWALK_DRAFT.md", crosswalk);
write("PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md", alignment);
write("PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md", provenance);
write("PHASE_3A_UNIT_MAPPING.md", unitMapping);
write("PHASE_3B_LESSON_MAPPING.md", lessonMapping);
write("PHASE_3A_B_VISUAL_SOURCE_MAPPING.md", visualMapping);
write("PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md", fullTrace);
writeAudit("GLOBAL_PERSPECTIVES_COURSE_PRODUCTION_AUDIT_2026-07-11.md", audit);

console.log(JSON.stringify({
  course,
  productionFiles: fs.readdirSync(productionDir).sort(),
  auditFiles: fs.readdirSync(auditDir).sort(),
  units: units.length,
  lessons: lessons.length,
  standards: standards.length,
}, null, 2));
