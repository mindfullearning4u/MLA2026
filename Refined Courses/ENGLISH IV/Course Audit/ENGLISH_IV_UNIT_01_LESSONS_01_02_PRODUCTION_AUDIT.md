# English IV Unit 1 Lessons 1-2 Production Audit

## Audit Scope

This audit reviews the production build for:

- `Refined Courses/ENGLISH IV/Units/Unit 01/Lesson 01`
- `Refined Courses/ENGLISH IV/Units/Unit 01/Lesson 02`

The audit verifies only Lessons 1 and 2. No Unit Pretest, Unit Assessment, or Lesson 3 content was created.

## Approved Mapping Used

| Lesson | Lesson Focus | Primary Standard | Support Standards |
|---|---|---|---|
| Unit 1 Lesson 1 | Grade 12 close reading and accurate paraphrase | MLA.ENG4.R.10 | MLA.ENG4.V.01, MLA.ENG4.L.01 |
| Unit 1 Lesson 2 | Academic vocabulary for advanced analysis | MLA.ENG4.V.01 | MLA.ENG4.R.10, MLA.ENG4.L.01 |

## File Presence Verification

| Requirement | Lesson 1 | Lesson 2 | Result |
|---|---:|---:|---|
| Lesson folder exists | Yes | Yes | PASS |
| P01.html exists | Yes | Yes | PASS |
| P02.html exists | Yes | Yes | PASS |
| P03.html exists | Yes | Yes | PASS |
| P04.html exists | Yes | Yes | PASS |
| P05.html exists | Yes | Yes | PASS |
| P06.html exists | Yes | Yes | PASS |
| P07.html exists | Yes | Yes | PASS |
| Guided Practice GIFT exists | Yes | Yes | PASS |
| Lesson Quiz GIFT exists | Yes | Yes | PASS |
| lesson.json exists | Yes | Yes | PASS |
| quiz.json exists | Yes | Yes | PASS |

## JSON Validation

| File | Result |
|---|---|
| Lesson 1 lesson.json | PASS - valid JSON |
| Lesson 1 quiz.json | PASS - valid JSON |
| Lesson 2 lesson.json | PASS - valid JSON |
| Lesson 2 quiz.json | PASS - valid JSON |

## GIFT Validation

| File | Questions | Choices | Correct Answers | HTML in Feedback | Result |
|---|---:|---:|---:|---:|---|
| ENG4_U01_L01_GuidedPractice.gift | 5 | 20 | 5 | 0 | PASS |
| ENG4_U01_L01_Quiz.gift | 25 | 100 | 25 | 0 | PASS |
| ENG4_U01_L02_GuidedPractice.gift | 5 | 20 | 5 | 0 | PASS |
| ENG4_U01_L02_Quiz.gift | 25 | 100 | 25 | 0 | PASS |

## Standards Validation

| Check | Result |
|---|---|
| MLA standards displayed in every Guided Practice question | PASS |
| MLA standards displayed in every Lesson Quiz question | PASS |
| Lesson 1 standards match approved mapping | PASS |
| Lesson 2 standards match approved mapping | PASS |
| No future standards introduced | PASS |
| No crosswalk, mapping, unit placement, or future lesson standards added | PASS |

## Instructional Design Validation

| Requirement | Result |
|---|---|
| P01 includes lesson title, standards, learning targets, mastery, student-friendly standard connection, and ToR help reminder | PASS |
| P02 includes notebook title, vocabulary, detailed teaching, step-by-step explanation, embedded passage, directions, and model example | PASS |
| P03 includes continued notebook application, deeper learning, step-by-step explanation, embedded passage, and common mistake section | PASS |
| P04 includes three worked examples with modeled thinking, reasoning, and common mistake section | PASS |
| P05 aligns to Guided Practice GIFT | PASS |
| P06 includes instructions plus Parts A, B, and C | PASS |
| P07 includes Teacher of Record reminder, submission workflow, checkpoint task, detailed instructions, and mastery criteria | PASS |
| Notebook tasks are clear | PASS |
| Common mistakes included | PASS |
| Incorrect examples use red styling | PASS |
| Correct examples use green styling | PASS |
| Checkpoints align to lesson standards | PASS |

## Embedded Passage Validation

| Requirement | Result |
|---|---|
| Lesson 1 passage included directly in instruction, practice, independent work, checkpoint, guided practice, and quiz contexts | PASS |
| Lesson 2 passage included directly in instruction, practice, independent work, checkpoint, guided practice, and quiz contexts | PASS |
| Students are not required to locate passages elsewhere | PASS |

## Moodle and Shell Validation

| Requirement | Result |
|---|---|
| Moodle-ready HTML structure preserved | PASS |
| Visual design follows approved ALG1 production shell conventions | PASS |
| English instructional flow follows approved English production model | PASS |
| Guided Practice GIFT contains no HTML | PASS |
| Lesson Quiz GIFT contains no HTML | PASS |
| GIFT choices use A, B, C, D only | PASS |
| GIFT items contain one correct answer only | PASS |

## Learner Support and Rigor Validation

| Requirement | Result |
|---|---|
| Lessons support self-paced learning | PASS |
| Lessons support remedial learners through explicit instruction and modeling | PASS |
| Lessons support standard learners through guided application and independent practice | PASS |
| Lessons support accelerated learners through evaluation, precision, and effectiveness judgments | PASS |
| Grade 12 rigor is preserved | PASS |
| Lessons require evaluation, functional significance, and independent reasoning with scaffolding | PASS |
| College/workforce readiness connection is present | PASS |

## Production Scope Validation

| Check | Result |
|---|---|
| No Unit Pretest created | PASS |
| No Unit Assessment created | PASS |
| No Lesson 3 content created or modified | PASS |
| Work stopped after Lessons 1 and 2 | PASS |

## Issue Found and Re-Audit

Initial GIFT validation identified that several Lesson Quiz items had correct-answer feedback text but were still marked as distractors. The affected items were corrected by changing the appropriate answer markers to a single `=` correct-answer marker.

Re-audit confirmed:

- Lesson 1 Guided Practice: 5 questions, 5 correct answers
- Lesson 1 Quiz: 25 questions, 25 correct answers
- Lesson 2 Guided Practice: 5 questions, 5 correct answers
- Lesson 2 Quiz: 25 questions, 25 correct answers
- No HTML in GIFT feedback
- No incorrect answer marked with correct-answer feedback

## Final Audit Decision

English IV Unit 1 Lessons 1-2 Production Batch:

PASS — APPROVED FOR NEXT LESSON BATCH
