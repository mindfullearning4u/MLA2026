# Career Planning and Portfolio Lesson Build Report

Date: 2026-07-13

## Scope

Built lesson pages and metadata for Career Planning and Portfolio from the approved course-production package.

Source files used:

- `Course Production/PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md`
- `Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md`
- `Course Production/PHASE_3A_UNIT_MAPPING.md`
- `Course Production/PHASE_3A_B_VISUAL_SOURCE_MAPPING.md`
- `Course Production/PHASE_3B_LESSON_MAPPING.md`
- `Course Production/PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md`
- `.codex/standards/00-course-production-master-protocol.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/04-instructional-rigor-and-mastery-standard.md`
- `.codex/standards/09-lesson-8-synthesis-standard.md`
- `.codex/standards/10-json-metadata-and-file-structure-standard.md`
- `.codex/agent-prompts/lesson-developer-agent.md`

## Files Created

| Item | Count |
|---|---:|
| Unit folders | 6 |
| Lesson folders | 30 |
| HTML lesson pages | 210 |
| `lesson.json` files | 30 |
| `quiz.json` files | 30 |

## Structure Result

PASS.

- Each unit contains Lessons 01-05.
- Each lesson contains `P01.html` through `P07.html`.
- Each lesson contains non-empty `lesson.json` and `quiz.json`.
- Each lesson uses the seven-page model.
- Lesson 5 in each unit is marked as synthesis.
- Lesson 5 quiz metadata is set to 0 questions.
- Lesson 5 unit assessment metadata is set to 40 questions.

## Rigor Result

PASS for lesson build baseline.

Each lesson includes:

- mapped standards and CPALMS/FDOE benchmark trace
- student-facing standard connection
- vocabulary table
- detailed teaching sequence
- lesson-specific visual organizer or data/decision table
- scenario-based teaching
- common mistake with incorrect/correct contrast
- three P04 worked examples
- guided-practice readiness page
- P06 independent work with Part A, Part B, and Part C
- P07 checkpoint task, mastery criteria, correction/resubmission workflow, and TOR intervention language

## Validation Result

Mechanical validation result:

| Check | Result |
|---|---|
| Lessons found | 30 |
| HTML files found | 210 |
| JSON files found | 60 |
| Missing required pages | 0 |
| Invalid JSON | 0 |
| P04 files without exactly three worked examples | 0 |
| Pages without exactly one TOR support box | 0 |
| Visible backend assessment filenames in pages | 0 |
| Lesson 5 quiz metadata violations | 0 |

Final lesson-build decision: PASS FOR LESSON FILE CREATION.

## Remaining Work

Assessment Moodle XML banks have not been created in this lesson-build pass.

Required next production steps:

- create Guided Practice Moodle XML for all 30 lessons
- create Lesson Quiz Moodle XML for Lessons 01-04 in each unit
- create Unit Pretest Moodle XML for each unit
- create Unit Assessment Moodle XML for Lesson 05 in each unit
- run unit completion audits after assessment generation
- run full course completion audit before any Moodle transfer

