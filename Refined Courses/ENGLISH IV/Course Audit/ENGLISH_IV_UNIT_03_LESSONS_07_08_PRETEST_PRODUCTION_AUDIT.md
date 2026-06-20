# English IV Unit 3 Lessons 7-8 and Pretest Production Audit

## Audit Scope

This audit reviews English IV Unit 3 Lessons 7 and 8, plus the Unit 3 Pretest, after production build.

Reviewed locations:

- `Refined Courses/ENGLISH IV/Units/Unit 03/Lesson 07`
- `Refined Courses/ENGLISH IV/Units/Unit 03/Lesson 08`
- `Refined Courses/ENGLISH IV/Units/Unit 03/ENG4_U03_Pretest.gift`
- `Refined Courses/ENGLISH IV/Units/Unit 03/pretest.json`

## Lesson Mapping Validation

| Lesson | Lesson Title | Primary Standard | Support Standards | Status |
|---|---|---|---|---|
| Unit 3 Lesson 7 | Integrated Effectiveness, Argument, and Rhetoric Evaluation | MLA.ENG4.R.12 | MLA.ENG4.R.05; MLA.ENG4.R.06; MLA.ENG4.R.08; MLA.ENG4.C.01 | PASS |
| Unit 3 Lesson 8 | Putting It All Together: Unit 3 Synthesis | Unit 3 primary standards: MLA.ENG4.R.05; MLA.ENG4.R.06; MLA.ENG4.R.07; MLA.ENG4.R.08; MLA.ENG4.R.12 | MLA.ENG4.R.10; MLA.ENG4.V.01; MLA.ENG4.L.01; MLA.ENG4.C.01 | PASS |

No Unit 4 or later standards were introduced.

## Required File Validation

| Item | Required Files | Status |
|---|---|---|
| Lesson 7 | P01-P07, lesson.json, quiz.json, Guided Practice GIFT, Lesson Quiz GIFT | PASS |
| Lesson 8 | P01-P07, lesson.json, quiz.json, Guided Practice GIFT, Unit Assessment GIFT | PASS |
| Unit 3 Pretest | ENG4_U03_Pretest.gift, pretest.json | PASS |

## JSON Validation

| File | Status |
|---|---|
| Unit 3 pretest.json | VALID |
| Lesson 7 lesson.json | VALID |
| Lesson 7 quiz.json | VALID |
| Lesson 8 lesson.json | VALID |
| Lesson 8 quiz.json | VALID |

## GIFT Validation Results

| File | Questions | Choices | Correct Answers | HTML in GIFT | Standards Displayed | Answer Pattern | Status |
|---|---:|---:|---:|---:|---:|---|---|
| ENG4_U03_Pretest.gift | 10 | 40 | 10 | 0 | 10 | Balanced | PASS |
| ENG4_U03_L07_GuidedPractice.gift | 5 | 20 | 5 | 0 | 5 | Balanced | PASS |
| ENG4_U03_L07_Quiz.gift | 25 | 100 | 25 | 0 | 25 | Balanced | PASS |
| ENG4_U03_L08_GuidedPractice.gift | 5 | 20 | 5 | 0 | 5 | Balanced | PASS |
| ENG4_U03_L08_UnitAssessment.gift | 25 | 100 | 25 | 0 | 25 | Balanced | PASS |

Additional GIFT checks:

- Every question contains exactly four answer choices.
- Every question contains one correct answer only.
- Answer choices use A, B, C, and D only.
- Feedback is plain text with no HTML.
- MLA standards are displayed in every question.
- Passage information is embedded directly in the question where needed.

## Lesson 8 Rule Validation

| Requirement | Status |
|---|---|
| Lesson 8 is titled Putting It All Together | PASS |
| Lesson 8 contains Unit Assessment | PASS |
| Lesson 8 does not contain Lesson Quiz GIFT | PASS |
| Lesson 8 does not introduce new primary standards | PASS |

## Page Structure Validation

| Requirement | Status |
|---|---|
| P01 includes lesson overview, standards, mastery, student-friendly connection, and Teacher of Record help | PASS |
| P02 includes notebook title, vocabulary, explicit teaching, embedded passage, notebook directions, and model example | PASS |
| P03 includes continued application, deeper learning, embedded passage, common mistake, red incorrect example, green correct example, and teachable explanation | PASS |
| P04 includes three worked examples, modeled thinking, explicit reasoning, common mistake, red incorrect example, green correct example, and teachable explanation | PASS |
| P05 aligns to Guided Practice GIFT | PASS |
| P06 includes instructions and Parts A, B, and C | PASS |
| P07 includes Teacher of Record reminder, submission workflow, checkpoint task, detailed instructions, and mastery criteria | PASS |

## Visual and HTML Validation

| Check | Result |
|---|---|
| Approved visual shell markers present | PASS |
| Box styling and spacing present | PASS |
| Moodle-ready inline HTML preserved | PASS |
| HTML tag balance for P01-P07 in Lessons 7 and 8 | PASS |
| Uses `Submit` instead of `Upload` | PASS |

## Corrections Made During Audit

| Finding | Correction | Re-Audit Result |
|---|---|---|
| Some GIFT correct answers were initially marked with the wrong Moodle prefix after drafting. | Correct answers were normalized to `=` and incorrect answers to `~`. | PASS |
| Answer letters needed balancing across quiz, assessment, guided practice, and pretest files. | Answer labels were rebalanced without changing question meaning, standards, or feedback. | PASS |
| Unit 3 pretest JSON answer distribution needed to match the rebalanced GIFT file. | Metadata was updated to A=3, B=3, C=2, D=2. | PASS |

## Final Audit Decision

English IV Unit 3 Lessons 7-8 and Pretest Production Batch:

**PASS - APPROVED FOR UNIT 3 FINAL AUDIT**
