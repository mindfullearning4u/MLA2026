# Environmental Science Course Production Final Checkpoint

Date: 2026-07-12

Decision: PASS AFTER CORRECTION

## Scope

Repo-side final course production audit for Environmental Science before Moodle transfer/update.

Audit layers completed:

- Source of truth: CPALMS, Florida B.E.S.T. support, Common Core, SAT, ACT, MLA numbering
- Standards inventory, crosswalk, unit mapping, lesson mapping, lab/resource mapping, text/data source mapping
- Lesson structure, standards traceability, science safety/resource labels, direct resource specificity, asynchronous rigor
- Moodle XML assessments, embedded stimulus, counts, standards labels, feedback, answer patterns

## Source and Mapping Validation

Final source coverage:

| Source File | MLA Standards Present | Missing MLA Standards |
|---|---:|---:|
| `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md` | 28 | 0 |
| `PHASE_2A_B_CROSSWALK_DRAFT.md` | 28 | 0 |
| `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md` | 28 | 0 |
| `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md` | 28 | 0 |
| `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` | 28 | 0 |
| `ENV_LAB_AND_VIRTUAL_LAB_MATRIX.md` | 28 | 0 |
| `ENV_TEXT_AND_DATA_SOURCE_MATRIX.md` | 28 | 0 |

Findings:

- CPALMS course source is present in the inventory/crosswalk/resource source controls.
- Florida B.E.S.T. literacy/readiness support is explicitly named in the inventory, crosswalk, and text/data source controls.
- Common Core, SAT, and ACT support are present in the crosswalk and lab/resource source controls.
- Unit and lesson mapping use all 28 approved MLA Environmental Science standards.
- No mapped MLA standard is missing from assessment evidence.

## Course Structure Validation

Final counts:

| Item | Count | Status |
|---|---:|---|
| Units | 6 | PASS |
| Lessons | 48 | PASS |
| HTML lesson pages | 336 | PASS |
| `lesson.json` files | 48 | PASS |
| `quiz.json` files | 48 | PASS |
| `pretest.json` files | 6 | PASS |
| Moodle XML files | 102 | PASS |
| Moodle XML questions | 1,590 | PASS |

Lesson structure result:

- Every lesson has `P01.html` through `P07.html`.
- Every lesson has `lesson.json` and `quiz.json`.
- Every unit has `pretest.json`.
- P01 Science Safety and Resource Note is present.
- P03 Direct Resource Link section is present.
- No old `Direct Lab, Model, or Data Resource` heading remains.
- No prohibited teacher-dependent instruction language remains.
- Embedded model/data tables are present in all 336 lesson pages.

## Corrections Made

Source and mapping corrections:

- Added explicit Florida B.E.S.T. literacy/readiness wording to the standards inventory, crosswalk, and text/data source matrix.
- Added MLA standard traceability companion sections to the lab/resource, virtual lab, and text/data source matrices.

Lesson corrections:

- Normalized all 48 `lesson.json` files with top-level standards, primary standards, support standards, approved direct resources, and assessment metadata.
- Normalized all 48 `quiz.json` files with Moodle XML references, question counts, bank size, questions per attempt, and mastery threshold.
- Created 6 unit-level `pretest.json` files.
- Added P01 Science Safety and Resource Note sections across all 48 lessons.
- Normalized direct resource labels across all lesson pages.
- Added embedded model/data tables to all 336 lesson pages.
- Added independent mastery checks to short pages that needed additional asynchronous verification guidance.
- Replaced confirmed broad Units 01-03 resource links with exact student-facing direct resources and specific action directions.

Confirmed resource-link repairs included:

- Unit 01 Lesson 01: EPA particulate matter source page
- Unit 01 Lesson 02: EPA AirData basic information page
- Unit 01 Lesson 03: USGS monitoring-location graph
- Unit 01 Lesson 06: EPA sustainability overview
- Unit 01 Lesson 07: USGS monitoring-location graph for investigation design
- Unit 01 Lesson 08: EPA particulate matter source page
- Unit 02 Lesson 07: USGS zebra mussel fact sheet
- Unit 03 Lesson 04: per-capita energy-use graph
- Unit 03 Lesson 05: CDC Environmental Public Health Tracking Data Explorer
- Unit 03 Lesson 07: EPA outdoor air quality indicator

Assessment corrections:

- Resequenced answer order in all 102 XML files to remove predictable answer patterns.
- Embedded stimulus tables directly into all 1,590 Moodle XML questions.
- Preserved standards labels, four-answer format, one correct answer, and teachable feedback.

## Final Assessment Validation

| Gate | Result |
|---|---|
| XML parses as Moodle XML | PASS |
| Required XML files present | PASS |
| Guided Practice count: 5 | PASS |
| Lesson Quiz count: 25 | PASS |
| Unit Pretest count: 10 | PASS |
| Unit Assessment count: 40 | PASS |
| MLA standard label in every question | PASS |
| Every inventory standard assessed | PASS |
| No out-of-inventory MLA standards assessed | PASS |
| Embedded stimulus table in every question | PASS |
| No external-only graph/table/diagram references | PASS |
| No visible A/B/C/D answer prefixes | PASS |
| Teachable feedback present | PASS |
| No duplicate answer choices detected | PASS |
| No predictable answer-pattern flags | PASS |

## Independent Audit Reconciliation

- Units 04-06 read-only audit: PASS.
- Units 01-03 initial read-only audit: FAIL for broad direct-resource links.
- Units 01-03 focused re-audit after repair: PASS. The previously broad resource links were replaced with exact direct student-facing resources and specific action directions.

## Certification Decision

Environmental Science is repo-side course-production ready after correction.

Moodle transfer/update agents should use the companion Moodle change list before importing or updating the course in Moodle.
