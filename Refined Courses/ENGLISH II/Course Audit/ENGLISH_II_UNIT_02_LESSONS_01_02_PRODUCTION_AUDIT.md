# English II Unit 2 Lessons 1-2 Production Audit

## Audit Scope

Audited the Unit 2 Lesson 1 and Lesson 2 production batch:

- `Units/Unit 02/Lesson 01`
- `Units/Unit 02/Lesson 02`
- All `P01.html` through `P07.html` pages
- All `lesson.json` and `quiz.json` files
- Guided Practice and Lesson Quiz GIFT files

Audit sources used:

- Certified English II architecture package
- English II Standard Inventory
- English II Crosswalk
- English II Unit-Level Mapping
- English II Lesson-Level Mapping
- English I approved production model
- Unit 1 gold-standard production structure

## Executive Decision

**PASS - APPROVED**

English II Unit 2 Lessons 1-2 meet the required structure, mapping, standards, page layout, assessment, GIFT formatting, answer-distribution, and mastery-based production expectations.

## Mapping and Standards Audit

| Lesson | Approved Focus | Approved Primary Standard | Approved Support Standards | Result |
|---|---|---|---|---|
| 1 | Literary elements and layered meaning | MLA.ENG2.R.01 | MLA.ENG2.R.10, MLA.ENG2.V.01, MLA.ENG2.L.01 | PASS |
| 2 | Comparative theme development across literary text | MLA.ENG2.R.02 | MLA.ENG2.R.01, MLA.ENG2.R.10, MLA.ENG2.V.01 | PASS |

No Unit 2 Lesson 3 or later primary standards were introduced into Lessons 1-2.

## File Structure Audit

| Requirement | Result |
|---|---|
| Lesson 01 folder exists | PASS |
| Lesson 02 folder exists | PASS |
| Each lesson has `P01.html` through `P07.html` | PASS |
| Each lesson has `lesson.json` | PASS |
| Each lesson has `quiz.json` | PASS |
| Each lesson has Guided Practice GIFT | PASS |
| Each lesson has Lesson Quiz GIFT | PASS |
| Required files are nonempty | PASS |
| Lessons 3-8 were not built or populated | PASS |

## JSON Audit

| JSON Area | Result | Notes |
|---|---|---|
| `lesson.json` validity | PASS | Both lesson metadata files parse successfully. |
| `quiz.json` validity | PASS | Both quiz metadata files parse successfully. |
| Course identifier | PASS | Uses `ENG2`. |
| Unit identifier | PASS | Uses `Unit 02`. |
| Lesson identifiers | PASS | Uses `Lesson 01` and `Lesson 02`. |
| Standards metadata | PASS | Matches approved English II Unit 2 lesson-level mapping. |
| Page references | PASS | Each lesson lists `P01.html` through `P07.html` in order. |
| GIFT references | PASS | Metadata references the correct Guided Practice and Lesson Quiz files. |

## Page Layout and Content Audit

| Page | Required Structure | Lesson 1 Result | Lesson 2 Result |
|---|---|---|---|
| P01 | Lesson overview, standards, learn/do/mastery/student connection/TOR help | PASS | PASS |
| P02 | Notebook Part 1, vocabulary, step-by-step teaching, embedded passage, directions, model | PASS | PASS |
| P03 | Notebook Part 2, deeper learning, embedded passage, common mistake, red incorrect, green correct | PASS | PASS |
| P04 | Worked Example with Example 1, Example 2, Example 3, common mistake | PASS | PASS |
| P05 | Guided Practice aligned to GIFT and lesson standard | PASS | PASS |
| P06 | Independent Work with Instructions, Part A, Part B, Part C | PASS | PASS |
| P07 | Checkpoint, TOR reminder, workflow, task, mastery criteria | PASS | PASS |

## Assessment Audit

| Assessment | Required Count | Actual Count | Four A-D Choices | One Correct Answer | Plain-Text Feedback | MLA Standard Displayed | Result |
|---|---:|---:|---|---|---|---|---|
| Lesson 1 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 1 Quiz | 25 | 25 | PASS | PASS | PASS | PASS | PASS |
| Lesson 2 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 2 Quiz | 25 | 25 | PASS | PASS | PASS | PASS | PASS |

Answer distribution:

| Assessment | Answer Sequence | Distribution | Result |
|---|---|---|---|
| Lesson 1 Guided Practice | ACBDB | A=1, B=2, C=1, D=1 | PASS |
| Lesson 1 Quiz | ADCBADCBADCBADCBADCBADCBA | A=7, B=6, C=6, D=6 | PASS |
| Lesson 2 Guided Practice | ACBDB | A=1, B=2, C=1, D=1 | PASS |
| Lesson 2 Quiz | ADCBADCBADCBADCBADCBADCBA | A=7, B=6, C=6, D=6 | PASS |

GIFT formatting audit:

- No HTML detected inside GIFT files.
- Each question includes an MLA English II standard tag.
- Each question includes the needed passage or passage excerpt directly in the item.
- Feedback is plain text and teachable.
- No question has more than one correct answer.
- No question has fewer or more than four answer choices.

## Lesson Quality Audit

| Requirement | Result | Notes |
|---|---|---|
| Self-paced instruction | PASS | Pages teach directly to the student with step-by-step explanations. |
| Remedial support | PASS | Vocabulary, model examples, sentence frames, and common mistakes are included. |
| Standard learner support | PASS | Guided practice, notebook tasks, and worked examples align to the lesson target. |
| Accelerated support | PASS | Students analyze layered meaning and comparative theme development with evidence. |
| Passage accessibility | PASS | Required passages are embedded in lessons and assessments. |
| Mastery language | PASS | P01 and P07 specify how mastery is shown. |
| Visual layout | PASS | Pages follow the approved English production box layout and ENG2 header pattern. |
| Compliance wording | PASS | No `Upload` wording found; submission language uses `Submit`. |
| Identifier cleanup | PASS | No `ENG1`, `MLA.ENG1`, or `ENG1_U` identifiers found in produced files. |

## Automated Audit Summary

PowerShell audit completed across file structure, JSON parsing, page headers, GIFT syntax, feedback flags, standard tags, HTML-in-GIFT detection, and future-lesson nonpopulation.

| Audit Area | Checks | Failures |
|---|---:|---:|
| Structure, JSON, HTML, GIFT, and future-lesson safeguards | 106 | 0 |

## Final Audit Decision

English II Unit 2 Lessons 1-2 Production Batch:

PASS — APPROVED FOR NEXT LESSON BATCH
