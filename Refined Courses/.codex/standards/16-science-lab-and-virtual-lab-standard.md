# Science Lab and Virtual Lab Standard

## Purpose

Science courses are laboratory science courses when the approved course architecture identifies a lab component. Lab work is not enrichment. It is part of the course evidence for standards mastery, accreditation readiness, and student learning.

This standard controls science lesson development, science assessment development, science lab review, simulation review, unit audits, and final course certification.

## Applies To

This standard applies to all science courses, including:

- Biology
- Chemistry
- Physics
- Earth Space Science
- Environmental Science
- Marine Science
- Anatomy and Physiology

If a science course or unit has a lab/data/investigation requirement in the course overview, crosswalk, unit mapping, lesson mapping, lab matrix, or virtual lab matrix, the lab requirement is mandatory.

## Source of Truth

Use sources in this order:

1. Approved standards inventory or benchmark tracker
2. Approved crosswalk
3. Approved unit mapping
4. Approved lesson mapping
5. Approved lab and virtual lab matrix, when present
6. Course Overview
7. Course architecture files
8. Current lesson files and assessment files

Do not use old `Unit Overview.md` files as source of truth.

## Official Standards and Readiness Source Requirement

Before science lesson or assessment production begins, the architecture package must document which official sources were used to verify the standards and readiness alignments.

Required source checks when applicable:

- Florida B.E.S.T. Standards
- CPALMS official benchmark and course references
- Florida Department of Education course or standards documents
- Common Core literacy in science/technical subjects when explicitly required
- ACT College and Career Readiness Standards or official ACT science/readiness documentation
- College Board SAT Suite or SAT Skills Insight documentation

The science mapping package must not rely on unofficial summaries for standard text, standard numbering, lab requirements, or readiness alignment.

The crosswalk, unit mapping, and lesson mapping must capture:

- exact standard or benchmark code
- official source checked
- MLA numbering alignment
- lab/data/investigation requirement
- required visual/model/data display
- simulation or virtual lab review requirement
- candidate resource location for approval
- approved exact direct resource URL when inserted
- assessment stimulus requirement

## Lab Requirement

Every lab-aligned unit or lesson must include student-facing lab or investigation support appropriate to the mapped standard.

A valid science lab experience may include:

- hands-on investigation instructions
- virtual lab or simulation-based investigation
- authentic data analysis
- model-based investigation
- graph-based investigation
- microscopy/image evidence analysis
- field-observation data analysis
- case-data analysis
- experimental design and critique

Do not invent a lab that is outside the approved mapping. Do not add experiments requiring unsafe materials, live specimens, hazardous chemicals, heat, pressure, electricity, sharp tools, or specialized equipment unless the approved course architecture explicitly supports it and the safety controls are fully documented.

If the official standard or benchmark implies investigation, data analysis, model analysis, graph interpretation, lab safety, scientific explanation, or evidence-based reasoning, capture that requirement in the unit and lesson mapping before lesson development begins.

## Required Lab Components

A lab or investigation must include, as appropriate:

- lab title
- mapped standard(s)
- purpose or investigative question
- safety note
- materials or simulation/resource needed
- variables and controls when applicable
- procedure or investigation steps
- observation or data table
- graph or model requirement when applicable
- analysis questions
- claim-evidence-reasoning or scientific explanation
- conclusion/reflection
- mastery evidence
- TOR support workflow when students need clarification or retake/intervention support

## Safety Requirement

Every lab-aligned lesson must include safety guidance appropriate to the activity.

Required safety rules:

- Do not tell students to perform unsafe procedures.
- Do not require chemicals, heat, flames, blades, glassware, pressure systems, electrical circuits, biological samples, dissection tools, or household experiments without explicit approved safety controls.
- Prefer safe virtual labs, simulations, public data sets, images, models, or teacher-approved household observation activities when a hands-on lab is not practical.
- State when an activity is virtual/data-based and does not require physical materials.
- If an activity requires adult supervision, school equipment, or controlled conditions, mark it as TOR/school-approved only.

## Virtual Lab and Simulation Requirement

For science lab courses, simulation and virtual lab review is mandatory.

For every unit, and for every lesson where a simulation or virtual lab could support the mapped concept, the resource/simulation auditor must search for free resources and identify the exact direct activity/resource URL.

Priority sources:

- PhET Interactive Simulations
- CK-12
- HHMI BioInteractive
- Concord Consortium
- NASA
- NOAA
- USGS
- OpenStax
- official universities
- public education agencies
- official science organizations

Standing science-course directive: the user has explicitly directed that science/lab courses must include exact direct links for required or strongly aligned free simulations, virtual labs, data sets, and trusted resources. A science course agent does not need to ask again before inserting a free, student-safe, directly aligned resource link from a trusted source.

Ask for approval only when the resource requires login, payment, special hardware, unsafe activity, non-public access, questionable source quality, or the alignment is uncertain.

When a resource is inserted:

- use the exact direct clickable URL for the specific simulation, virtual lab, data set, or resource
- do not use only a provider name, provider homepage, search page, or collection page when a direct activity URL exists
- do not tell students to search for the resource
- place the link in the lesson page where the student needs it and record it in `lesson.json` or audit evidence
- place step-by-step student-use directions next to the link so students know what to click, what controls/settings/sections to use, what to observe, what evidence to record, and how the observation supports the lesson standard
- for simulations, include launch/play directions and the specific model controls, toggles, variables, or views students should use when applicable
- for linked readings, data sets, diagrams, agency resources, or visual pages, identify the specific heading, image, table, figure, or section students should examine and what information they must collect
- verify free access, login requirements, and whether the link opens directly to the intended activity
- treat a missing exact direct link as a certification and Moodle-transfer blocker
- treat missing step-by-step student-use directions as a certification and Moodle-transfer blocker

## Data and Visual Requirement

Science lessons and assessments must include visuals when a veteran science teacher would use them to make the concept clear.

Required when relevant:

- diagrams
- lab setup images or diagrams
- data tables
- graphs
- models
- cycles
- maps
- food webs
- particle diagrams
- force diagrams
- wave diagrams
- anatomy diagrams
- microscopy images
- classification charts
- CER organizers
- variable/control tables

Visuals must teach or support reasoning. They must not be decorative.

## CER Requirement

Science lessons and labs must teach students how to support conclusions with evidence.

When a lesson asks students to explain results, analyze data, or justify a scientific conclusion, include:

- Claim: the answer or conclusion
- Evidence: data, observation, model detail, or source information
- Reasoning: the science concept that connects the evidence to the claim

Assessments must include CER-style reasoning when required by the mapped standard or lesson objective.

## Assessment Requirement

Science assessments must use Moodle XML only.

Every science assessment question must:

- align to the approved lesson or unit mapping
- include the mapped standard
- contain all needed diagrams, tables, data, models, passages, or stimuli directly inside the Moodle XML question
- use exactly four answer choices
- have exactly one correct answer
- include teachable feedback for every answer
- avoid predictable answer patterns
- avoid asking students to interpret a missing diagram, missing graph, missing data table, or missing lab setup

Guided Practice and Lesson Quiz questions must assess only the assigned lesson. Unit Pretests and Unit Assessments must assess only the assigned unit.

## Accreditation Evidence

A science course is not certification-ready unless the audit evidence shows:

- lab designation, when applicable
- lab or investigation integration across units
- virtual lab/simulation review
- exact direct URLs for approved or required simulations, virtual labs, data sets, or resources
- step-by-step student-use directions for every approved or required simulation, virtual lab, data set, or resource
- standards alignment
- data analysis opportunities
- scientific explanation/CER opportunities
- safety controls
- assessment evidence for lab/data skills where mapped
- final report documenting PASS, PASS WITH SUGGESTIONS, or FAIL

## Fail Conditions

Mark the unit or course `FAIL` when:

- a lab-designated course has no lab or virtual lab evidence
- a lab-aligned lesson lacks lab/investigation support
- a science lesson lacks needed diagrams, tables, data displays, or models
- an assessment requires a missing diagram/table/data display/model
- a question assesses outside the mapped lesson or unit
- lab safety is missing where an investigation is present
- a simulation review was skipped
- a resource was inserted without approval
- an approved or required simulation/resource is named but lacks an exact direct clickable URL
- an approved or required simulation/resource is linked but lacks student-facing directions for what to click, what to observe, what to record, and how to use the evidence
- students are told to search, browse, or navigate to find a required lab/simulation/resource
- old Unit Overview files were used as source of truth

## Output Requirement

Science lab audits must report:

| Course | Unit | Lesson | Lab/Data Requirement | Evidence Found | Safety Present? | Simulation Review Present? | Exact Direct URL Present When Required? | Assessment Evidence | Result | Required Fix |
|---|---|---|---|---|---|---|---|---|---|---|
