# English II Unit 2 Lessons 7-8 and Pretest Production Audit

## Audit Scope

Audited the Unit 2 Lesson 7, Lesson 8, and Unit 2 Pretest production batch:

- `Units/Unit 02/pretest.json`
- `Units/Unit 02/ENG2_U02_Pretest.gift`
- `Units/Unit 02/Lesson 07`
- `Units/Unit 02/Lesson 08`
- All `P01.html` through `P07.html` pages
- All `lesson.json` and `quiz.json` files
- Guided Practice, Lesson Quiz, and Unit Assessment GIFT files

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

English II Unit 2 Lessons 7-8 and the Unit 2 Pretest meet the required structure, mapping, standards, page layout, assessment, GIFT formatting, answer-distribution, and mastery-based production expectations.

## Mapping and Standards Audit

| Lesson/Assessment | Approved Focus | Approved Primary Standard(s) | Approved Support Standards | Result |
|---|---|---|---|---|
| Pretest | Unit 2 readiness check | Unit 2 primary standards | Unit 2 support standards | PASS |
| 7 | Narrative pacing for tension, mood, and tone | MLA.ENG2.W.01 | MLA.ENG2.R.03, MLA.ENG2.R.09, MLA.ENG2.W.04, MLA.ENG2.L.01 | PASS |
| 8 | Putting It All Together: Unit 2 synthesis | MLA.ENG2.R.01, MLA.ENG2.R.02, MLA.ENG2.R.03, MLA.ENG2.R.04, MLA.ENG2.R.09, MLA.ENG2.R.11, MLA.ENG2.W.01 | MLA.ENG2.R.10, MLA.ENG2.V.01, MLA.ENG2.L.01 | PASS |

Lesson 8 is a synthesis lesson and introduces no new primary standard.

## File Structure Audit

| Requirement | Result |
|---|---|
| Unit 2 Pretest GIFT exists | PASS |
| Unit 2 `pretest.json` exists | PASS |
| Lesson 07 folder exists | PASS |
| Lesson 08 folder exists | PASS |
| Each lesson has `P01.html` through `P07.html` | PASS |
| Each lesson has `lesson.json` | PASS |
| Each lesson has `quiz.json` | PASS |
| Lesson 7 has Guided Practice and Lesson Quiz GIFT | PASS |
| Lesson 8 has Guided Practice and Unit Assessment GIFT | PASS |
| Required files are nonempty | PASS |

## JSON Audit

| JSON Area | Result | Notes |
|---|---|---|
| `pretest.json` validity | PASS | Parses successfully. |
| `lesson.json` validity | PASS | Lesson 7 and Lesson 8 metadata parse successfully. |
| `quiz.json` validity | PASS | Lesson 7 quiz and Lesson 8 Unit Assessment metadata parse successfully. |
| Course identifier | PASS | Uses `ENG2`. |
| Unit identifier | PASS | Uses `Unit 02`. |
| Lesson identifiers | PASS | Uses `Lesson 07` and `Lesson 08`. |
| Standards metadata | PASS | Matches approved English II Unit 2 lesson-level mapping. |
| Page references | PASS | Each lesson lists `P01.html` through `P07.html` in order. |
| Lesson 8 synthesis metadata | PASS | `lessonType` is `Putting It All Together`; `newPrimaryStandardIntroduced` is `false`. |
| Lesson 8 assessment metadata | PASS | Uses Unit Assessment metadata and references `ENG2_U02_L08_UnitAssessment.gift`. |

## Page Layout and Content Audit

| Page | Required Structure | Lesson 7 Result | Lesson 8 Result |
|---|---|---|---|
| P01 | Lesson overview, standards, learn/do/mastery/student connection/TOR help | PASS | PASS |
| P02 | Notebook Part 1, vocabulary, step-by-step teaching/review, embedded passage, directions, model | PASS | PASS |
| P03 | Notebook Part 2, deeper learning, embedded passage, common mistake, red incorrect, green correct | PASS | PASS |
| P04 | Worked Example with Example 1, Example 2, Example 3, common mistake | PASS | PASS |
| P05 | Guided Practice aligned to GIFT and lesson standard | PASS | PASS |
| P06 | Independent Work with Instructions, Part A, Part B, Part C | PASS | PASS |
| P07 | Checkpoint, TOR reminder, workflow, task, mastery criteria | PASS | PASS |

## Assessment Audit

| Assessment | Required Count | Actual Count | Four A-D Choices | One Correct Answer | Plain-Text Feedback | MLA Standard Displayed | Result |
|---|---:|---:|---|---|---|---|---|
| Unit 2 Pretest | 10 | 10 | PASS | PASS | PASS | PASS | PASS |
| Lesson 7 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 7 Quiz | 25 | 25 | PASS | PASS | PASS | PASS | PASS |
| Lesson 8 Guided Practice | 5 | 5 | PASS | PASS | PASS | PASS | PASS |
| Lesson 8 Unit Assessment | 25 | 25 | PASS | PASS | PASS | PASS | PASS |

Answer distribution:

| Assessment | Answer Sequence | Distribution | Result |
|---|---|---|---|
| Unit 2 Pretest | ABCDABCBAD | A=3, B=3, C=2, D=2 | PASS |
| Lesson 7 Guided Practice | ABCDB | A=1, B=2, C=1, D=1 | PASS |
| Lesson 7 Quiz | ABCBABCBADABDDCBDCDBDBCDA | A=5, B=8, C=5, D=7 | PASS |
| Lesson 8 Guided Practice | ABCDB | A=1, B=2, C=1, D=1 | PASS |
| Lesson 8 Unit Assessment | ABCDABCBABABABCDCDBCDBADA | A=7, B=8, C=5, D=5 | PASS |

GIFT formatting audit:

- No HTML detected inside GIFT files.
- Each question includes an MLA English II standard tag.
- Each question includes the needed passage, excerpt, or source/adaptation context directly in the item.
- Feedback is plain text and teachable.
- No question has more than one correct answer.
- No question has fewer or more than four answer choices.
- Draft answer-marker and answer-distribution issues were corrected before final audit.

## Lesson Quality Audit

| Requirement | Result | Notes |
|---|---|---|
| Self-paced instruction | PASS | Pages teach directly to the student with step-by-step explanations. |
| Remedial support | PASS | Vocabulary, model examples, sentence frames, and common mistakes are included. |
| Standard learner support | PASS | Guided practice, notebook tasks, and worked examples align to the lesson target. |
| Accelerated support | PASS | Students synthesize literary analysis, adaptation, ambiguity, mood, and narrative pacing with evidence. |
| Passage accessibility | PASS | Required passages and excerpts are embedded in lessons and assessments. |
| Mastery language | PASS | P01 and P07 specify how mastery is shown. |
| Visual layout | PASS | Pages follow the approved English production box layout and ENG2 header pattern. |
| Compliance wording | PASS | No `Upload` wording found; submission language uses `Submit`. |
| Identifier cleanup | PASS | No `ENG1`, `MLA.ENG1`, or `ENG1_U` identifiers found in produced files. |

## Automated Audit Summary

PowerShell audit completed across file structure, JSON parsing, page headers, required common mistake sections, red/green examples, GIFT syntax, feedback flags, standard tags, HTML-in-GIFT detection, pretest count, guided practice count, quiz count, and Unit Assessment count.

| Audit Area | Checks | Failures |
|---|---:|---:|
| Structure, JSON, HTML, GIFT, and assessment safeguards | 42 | 0 |

## Final Audit Decision

English II Unit 2 Lessons 7-8 and Pretest Production Batch:

PASS — APPROVED FOR UNIT 2 FULL AUDIT
