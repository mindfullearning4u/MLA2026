# English IV Unit 2 Rigorous Production Audit

## Audit Scope

This audit reviews English IV Unit 2 for production readiness after completion of all Unit 2 lessons, assessments, and the Unit 2 pretest.

Audited location:

- `Refined Courses/ENGLISH IV/Units/Unit 02`

Audited items:

- Unit 2 Pretest
- Lessons 1-8
- P01-P07 pages for all lessons
- Guided Practice GIFT files
- Lesson Quiz GIFT files for Lessons 1-7
- Unit Assessment GIFT file for Lesson 8
- `lesson.json`, `quiz.json`, and `pretest.json`
- Visual shell consistency
- Standards alignment
- Moodle-ready formatting
- Lesson 8 assessment rule

## Executive Summary

English IV Unit 2 is production-ready. The unit contains the required eight lessons, a valid Unit 2 Pretest, Guided Practice files for all lessons, Lesson Quiz files for Lessons 1-7, and a Unit Assessment file for Lesson 8.

All required JSON files are valid. All GIFT files contain the correct number of questions, four answer choices per question, exactly one correct answer per question, MLA standards displayed in every question, no HTML, and balanced answer placement. Lesson 8 correctly functions as Putting It All Together and contains the Unit Assessment instead of a Lesson Quiz.

No production revisions were required after the final rigorous unit audit.

## Required File Inventory

| Component | Expected | Actual | Result |
|---|---:|---:|---|
| Lesson folders | 8 | 8 | PASS |
| P01-P07 lesson pages | 56 | 56 | PASS |
| lesson.json files | 8 | 8 | PASS |
| quiz.json files | 8 | 8 | PASS |
| Guided Practice GIFT files | 8 | 8 | PASS |
| Lesson Quiz GIFT files | 7 | 7 | PASS |
| Unit Assessment GIFT files | 1 | 1 | PASS |
| Unit Pretest JSON files | 1 | 1 | PASS |
| Unit Pretest GIFT files | 1 | 1 | PASS |

## JSON Validation

All JSON files parsed successfully.

| File Type | Count | Result |
|---|---:|---|
| Lesson JSON | 8 | PASS |
| Quiz JSON | 8 | PASS |
| Pretest JSON | 1 | PASS |

Reference checks:

- Lessons 1-7 `quiz.json` files point to existing Lesson Quiz GIFT files.
- Lessons 1-8 `quiz.json` files point to existing Guided Practice GIFT files.
- Lesson 8 `quiz.json` points to `ENG4_U02_L08_UnitAssessment.gift`.
- `pretest.json` points to `ENG4_U02_Pretest.gift`.

## GIFT Validation

| File | Questions | Choices | Correct Answers | Incorrect Correct Markers | HTML | Standards Displayed | Answer Balance | Result |
|---|---:|---:|---:|---:|---:|---:|---|---|
| ENG4_U02_L01_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L01_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L02_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L02_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L03_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L03_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L04_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L04_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L05_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L05_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L06_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L06_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L07_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=2, C=1, D=1; max run 1 | PASS |
| ENG4_U02_L07_Quiz.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_L08_GuidedPractice.gift | 5 | 20 | 5 | 0 | 0 | 5 | A=1, B=1, C=1, D=2; max run 1 | PASS |
| ENG4_U02_L08_UnitAssessment.gift | 25 | 100 | 25 | 0 | 0 | 25 | A=7, B=6, C=6, D=6; max run 1 | PASS |
| ENG4_U02_Pretest.gift | 10 | 40 | 10 | 0 | 0 | 10 | A=3, B=3, C=2, D=2; max run 1 | PASS |

## Standards Alignment

Unit 2 lesson standards match the approved English IV lesson-level mapping.

| Lesson | Approved Focus | Standards | Result |
|---|---|---|---|
| Lesson 1 | Literary elements and functional significance | MLA.ENG4.R.01; MLA.ENG4.R.10; MLA.ENG4.V.01; MLA.ENG4.L.01 | PASS |
| Lesson 2 | Two or more themes and their development | MLA.ENG4.R.02; MLA.ENG4.R.01; MLA.ENG4.R.10; MLA.ENG4.V.01 | PASS |
| Lesson 3 | Character perspective and conflicting perspectives | MLA.ENG4.R.03; MLA.ENG4.R.10; MLA.ENG4.V.03; MLA.ENG4.C.01 | PASS |
| Lesson 4 | Major poets in historical context | MLA.ENG4.R.04; MLA.ENG4.R.02; MLA.ENG4.V.03; MLA.ENG4.C.01 | PASS |
| Lesson 5 | Author use of figurative language | MLA.ENG4.R.09; MLA.ENG4.R.04; MLA.ENG4.V.03 | PASS |
| Lesson 6 | Classic literature influence on contemporary world texts | MLA.ENG4.R.11; MLA.ENG4.R.01; MLA.ENG4.R.10; MLA.ENG4.V.01 | PASS |
| Lesson 7 | Complex narratives with multiple perspectives and universal themes | MLA.ENG4.W.01; MLA.ENG4.R.02; MLA.ENG4.R.03; MLA.ENG4.W.04; MLA.ENG4.L.01 | PASS |
| Lesson 8 | Putting It All Together: Unit 2 synthesis | MLA.ENG4.R.01; MLA.ENG4.R.02; MLA.ENG4.R.03; MLA.ENG4.R.04; MLA.ENG4.R.09; MLA.ENG4.R.11; MLA.ENG4.W.01; MLA.ENG4.R.10; MLA.ENG4.V.01; MLA.ENG4.L.01 | PASS |

No Unit 3 or later standards were introduced into Unit 2.

## Lesson 8 Audit

Lesson 8 was reviewed against the approved rule:

- Lesson 8 = Putting It All Together
- Lesson 8 contains Unit Assessment
- Lesson 8 has no Lesson Quiz
- Lesson 8 introduces no new primary standard

Findings:

- Lesson 8 title and overview identify the lesson as Unit 2 synthesis.
- Lesson 8 `lesson.json` identifies `lesson_type` as `putting_it_all_together`.
- Lesson 8 `quiz.json` identifies `assessment_type` as `Unit Assessment`.
- No `ENG4_U02_L08_Quiz.gift` file exists.
- `ENG4_U02_L08_UnitAssessment.gift` exists and validates.
- Lesson 8 synthesizes Unit 2 standards only.

Result: PASS

## Page Shell and Instructional Flow Validation

| Requirement | Expected | Actual | Result |
|---|---:|---:|---|
| P01 Lesson Overview includes required overview sections | 8 | 8 | PASS |
| P02 includes Notebook Title and Vocabulary | 8 | 8+ | PASS |
| P03 includes continued notebook application and common mistake | 8 | 8 | PASS |
| P04 includes worked example and common mistake | 8 | 8 | PASS |
| P05 includes Guided Practice reference | 8 | 8 | PASS |
| P06 includes Independent Work with Parts A, B, and C | 8 | 8 | PASS |
| P07 includes Teacher of Record reminder, workflow, checkpoint task, and mastery criteria | 8 | 8 | PASS |

Common mistake validation:

- All P03 files include a common mistake block.
- All P04 files include a common mistake block.
- Incorrect examples use red formatting.
- Correct examples use green formatting.

## Visual and LMS Formatting Validation

| Check | Result |
|---|---|
| HTML pages use consistent production-shell visual formatting. | PASS |
| Pages use boxed sections, spacing, and readable student-facing layout consistent with the established model. | PASS |
| `font-family` production shell styling is present across pages. | PASS |
| `border-radius` production shell styling is present across pages. | PASS |
| GIFT files are Moodle-ready and contain no HTML. | PASS |
| Submission language uses `Submit`, not `Upload`. | PASS |

## Embedded Passage and Accessibility Validation

Passages and context required for instruction, guided practice, quizzes, checkpoint tasks, and the Unit Assessment are embedded directly where students need them.

Students are not required to search elsewhere for a passage.

Result: PASS

## Mastery-Based Learning Validation

| Requirement | Result |
|---|---|
| Lessons teach explicitly and sequentially. | PASS |
| Lessons include modeling and worked examples. | PASS |
| Lessons include common mistakes with corrective teaching. | PASS |
| Lessons include guided practice before independent work. | PASS |
| Lessons include independent work and checkpoint submission. | PASS |
| Lessons support remedial learners through direct explanation and scaffolding. | PASS |
| Lessons support standard learners through structured application. | PASS |
| Lessons support accelerated learners through Grade 12 evaluation and synthesis. | PASS |
| Grade 12 rigor is preserved. | PASS |

## Findings and Revisions

No new issues were identified during the final rigorous Unit 2 production audit.

Earlier batch-level GIFT marker and answer-balance issues had already been corrected and re-audited before this unit audit. The final unit audit confirms those corrections remain valid across the completed unit.

## Final Audit Decision

English IV Unit 2 Rigorous Production Audit:

**PASS — APPROVED FOR UNIT 3 PRODUCTION**
