# English II Unit 2 Lessons 5-6 Production Audit

## Audit Scope

Audited the Unit 2 Lesson 5 and Lesson 6 production batch:

- `Units/Unit 02/Lesson 05`
- `Units/Unit 02/Lesson 06`
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
- Unit 2 approved production pattern

## Executive Decision

**PASS - APPROVED**

English II Unit 2 Lessons 5-6 meet the required structure, mapping, standards, page layout, assessment, GIFT formatting, answer-distribution, and mastery-based production expectations.

## Mapping and Standards Audit

| Lesson | Approved Focus | Approved Primary Standard | Approved Support Standards | Result |
|---|---|---|---|---|
| 5 | Poetic ambiguity and multiple layers of meaning | MLA.ENG2.R.04 | MLA.ENG2.R.01, MLA.ENG2.R.02, MLA.ENG2.V.03 | PASS |
| 6 | Mythical, classical, or religious text adaptation | MLA.ENG2.R.11 | MLA.ENG2.R.04, MLA.ENG2.R.10, MLA.ENG2.V.01 | PASS |

No Unit 2 Lesson 7 or Lesson 8 primary standards were introduced into Lessons 5-6.

## File Structure Audit

| Requirement | Result |
|---|---|
| Lesson 05 folder exists | PASS |
| Lesson 06 folder exists | PASS |
| Each lesson has `P01.html` through `P07.html` | PASS |
| Each lesson has `lesson.json` | PASS |
| Each lesson has `quiz.json` | PASS |
| Each lesson has Guided Practice GIFT | PASS |
| Each lesson has Lesson Quiz GIFT | PASS |
| Required files are nonempty | PASS |
| Lessons 7-8 were not built or populated | PASS |

## JSON Audit

| JSON Area | Result | Notes |
|---|---|---|
| `lesson.json` validity | PASS | Both lesson metadata files parse successfully. |
| `quiz.json` validity | PASS | Both quiz metadata files parse successfully. |
| Course identifier | PASS | Uses `ENG2`. |
| Unit identifier | PASS | Uses `Unit 02`. |
| Lesson identifiers | PASS | Uses `Lesson 05` and `Lesson 06`. |
| Standards metadata | PASS | Matches approved English II Unit 2 lesson-level mapping. |
| Page references | PASS | Each lesson lists `P01.html` through `P07.html` in order. |
| GIFT references | PASS | Metadata references the correct Guided Practice and Lesson Quiz files. |

## Page Layout and Content Audit

| Page | Required Structure | Lesson 5 Result | Lesson 6 Result |
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
| Lesson 5 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 5 Quiz | 25 | 25 | PASS | PASS | PASS | PASS | PASS |
| Lesson 6 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 6 Quiz | 25 | 25 | PASS | PASS | PASS | PASS | PASS |

Answer distribution:

| Assessment | Answer Sequence | Distribution | Result |
|---|---|---|---|
| Lesson 5 Guided Practice | ABCDA | A=2, B=1, C=1, D=1 | PASS |
| Lesson 5 Quiz | ADCBADCBADCBADCBADCBADCBA | A=7, B=6, C=6, D=6 | PASS |
| Lesson 6 Guided Practice | ABCDB | A=1, B=2, C=1, D=1 | PASS |
| Lesson 6 Quiz | ABCBADCBADCBADCBADCBADCBA | A=7, B=7, C=6, D=5 | PASS |

GIFT formatting audit:

- No HTML detected inside GIFT files.
- Each question includes an MLA English II standard tag.
- Each question includes the needed poem, source/adaptation, or passage excerpt directly in the item.
- Feedback is plain text and teachable.
- No question has more than one correct answer.
- No question has fewer or more than four answer choices.
- Draft marker and distractor-quality issues were corrected before final audit.

## Lesson Quality Audit

| Requirement | Result | Notes |
|---|---|---|
| Self-paced instruction | PASS | Pages teach directly to the student with step-by-step explanations. |
| Remedial support | PASS | Vocabulary, model examples, sentence frames, and common mistakes are included. |
| Standard learner support | PASS | Guided practice, notebook tasks, and worked examples align to the lesson target. |
| Accelerated support | PASS | Students analyze poetic ambiguity, multiple interpretations, and source/adaptation transformations with evidence. |
| Passage accessibility | PASS | Required poem and source/adaptation texts are embedded in lessons and assessments. |
| Mastery language | PASS | P01 and P07 specify how mastery is shown. |
| Visual layout | PASS | Pages follow the approved English production box layout and ENG2 header pattern. |
| Compliance wording | PASS | No `Upload` wording found; submission language uses `Submit`. |
| Identifier cleanup | PASS | No `ENG1`, `MLA.ENG1`, or `ENG1_U` identifiers found in produced files. |

## Automated Audit Summary

PowerShell audit completed across file structure, JSON parsing, page headers, required common mistake sections, red/green examples, GIFT syntax, feedback flags, standard tags, HTML-in-GIFT detection, and future-lesson nonpopulation.

| Audit Area | Checks | Failures |
|---|---:|---:|
| Structure, JSON, HTML, GIFT, and future-lesson safeguards | 62 | 0 |

## Final Audit Decision

English II Unit 2 Lessons 5-6 Production Batch:

PASS — APPROVED FOR NEXT LESSON BATCH
