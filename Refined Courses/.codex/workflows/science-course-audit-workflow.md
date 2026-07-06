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
4. Build a mapping trace table.
5. Inventory files: units, lessons, P01-P07, JSON, XML, lab matrices.
6. Audit lesson rigor and self-paced instruction.
7. Audit lab/data/investigation evidence.
8. Audit lab safety.
9. Audit CER and scientific explanation.
10. Audit visuals, diagrams, models, data tables, and graphs.
11. Audit Moodle XML assessments and embedded stimuli.
12. Audit assessment alignment to lesson/unit mapping.
13. Run simulation/resource review.
14. Fix confirmed issues.
15. Rerun failed category audits.
16. Produce unit completion audits.
17. Produce final course completion/certification report.

## Required Science Audit Table

Use this table in science reports:

| Unit | Lesson | Mapping Focus | Lab/Data Requirement | Lesson Evidence | Safety Evidence | Visual/Data Evidence | CER Evidence | Simulation Review | Assessment Evidence | Result | Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|

## Certification Gate

A science course cannot be marked certified or ready for Moodle transfer unless:

- all standard course audit gates pass
- Moodle XML assessments exist and validate
- lab/data requirements are mapped and present
- safety guidance is present where needed
- simulations/resources were reviewed
- required visuals/data/diagrams/models are present
- assessment questions include needed stimuli directly in XML
- no lesson relies on teacher-led instruction
- final report documents the evidence

## Output Decision

Use:

- `CERTIFIED`
- `CERTIFIED WITH SUGGESTIONS`
- `NOT CERTIFIED`

Do not use `CERTIFIED` if simulation review, lab audit, safety audit, or XML assessment validation is missing.

