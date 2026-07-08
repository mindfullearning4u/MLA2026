# Science Course Audit Workflow

## Purpose

Use this workflow for science course production audits, recertification, lab review, and Moodle transfer readiness.

Science courses require all standard MLA course gates plus lab, virtual lab, data, safety, simulation, and CER gates.

## Required Reading

Before auditing a science course, read:

- `.codex/standards/00-course-production-master-protocol.md`
- `.codex/standards/01-initial-mapping-analysis-protocol.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/04-instructional-rigor-and-mastery-standard.md`
- `.codex/standards/06-assessment-moodle-xml-standard.md`
- `.codex/standards/07-assessment-visual-audit-standard.md`
- `.codex/standards/10-json-metadata-and-file-structure-standard.md`
- `.codex/standards/11-external-learning-resources-and-simulations-standard.md`
- `.codex/standards/13-unit-completion-audit-standard.md`
- `.codex/standards/14-course-completion-audit-standard.md`
- `.codex/standards/15-detail-compliance-audit-matrix.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`
- `.codex/agent-prompts/science-lab-auditor-subagent.md`
- `.codex/agent-prompts/science-simulation-resource-auditor-subagent.md`

## Required Course Sources

Locate:

- Course Overview
- standards inventory
- crosswalk
- mapping framework
- unit-level mapping
- lesson-level mapping
- lab and virtual lab matrix, when present
- existing architecture audits
- current lesson files
- current Moodle XML assessments
- current metadata files

Do not use old `Unit Overview.md` files as source of truth.

## Required Subagent Coverage

For a six-unit science course, use:

- one instructional rigor auditor per unit
- one structure/workflow auditor per unit
- one assessment alignment auditor per unit
- one assessment visual/XML auditor per unit
- one metadata/LMS-format auditor per unit
- one science lab auditor per unit
- one science simulation/resource auditor for the course, with unit-by-unit and lesson-by-lesson findings
- cross-check verification auditor
- final certification auditor

The main agent must inspect and fix every valid finding, then rerun affected audits.

## Audit Steps

1. Confirm the course folder.
2. Confirm the course is a science course and whether it is lab-designated.
3. Locate standards, crosswalk, unit mapping, lesson mapping, and lab matrix.
4. Verify official standards source provenance, including Florida B.E.S.T., CPALMS, Common Core, ACT, and SAT alignment where applicable.
5. Build a mapping trace table.
6. Build a lab/data/visual/simulation requirement table before lesson production.
7. Inventory files: units, lessons, P01-P07, JSON, XML, lab matrices.
8. Audit lesson rigor and self-paced instruction.
9. Audit lab/data/investigation evidence.
10. Audit lab safety.
11. Audit CER and scientific explanation.
12. Audit visuals, diagrams, models, data tables, and graphs.
13. Audit Moodle XML assessments and embedded stimuli.
14. Audit assessment alignment to lesson/unit mapping.
15. Run simulation/resource review.
16. Verify exact direct clickable URLs are present in lessons for every approved or required lab, simulation, data set, or resource.
17. Fix confirmed issues.
18. Rerun failed category audits.
19. Produce unit completion audits.
20. Produce final course completion/certification report.

## Required Science Audit Table

Use this table in science reports:

| Unit | Lesson | Mapping Focus | Lab/Data Requirement | Lesson Evidence | Safety Evidence | Visual/Data Evidence | CER Evidence | Simulation Review | Exact Direct URL Evidence | Assessment Evidence | Result | Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

## Required Architecture Mapping Tables

Before science lesson production, produce or verify:

| Standard Code | Official Source Checked | CPALMS/FDOE Reference | MLA Numbering Status | Unit Placement | Lesson Placement | Lab/Data Requirement | Visual/Model/Data Requirement | ACT/SAT/Common Core Readiness Note | Status |
|---|---|---|---|---|---|---|---|---|---|

| Unit | Lesson | Lesson Focus | Lab or Investigation | Simulation/Virtual Lab Candidate | Visuals/Data/Models Needed | Safety Notes | Candidate or Approved Exact Direct Resource URL | Assessment Stimulus Needed |
|---|---|---|---|---|---|---|---|---|

## Certification Gate

A science course cannot be marked certified or ready for Moodle transfer unless:

- all standard course audit gates pass
- official standards source provenance has been checked and documented
- Moodle XML assessments exist and validate
- lab/data requirements are mapped and present
- safety guidance is present where needed
- simulations/resources were reviewed
- exact direct clickable URLs are present for approved or required simulations/resources
- required visuals/data/diagrams/models are present
- assessment questions include needed stimuli directly in XML
- no lesson relies on teacher-led instruction
- final report documents the evidence

## Output Decision

Use:

- `CERTIFIED`
- `CERTIFIED WITH SUGGESTIONS`
- `NOT CERTIFIED`

Do not use `CERTIFIED` if simulation review, exact direct URL evidence, lab audit, safety audit, or XML assessment validation is missing.
