# English II Unit 1 Full Production Audit

## Audit Scope

Audited Unit 1 end to end after revision fixes:

- `Units/Unit 01/pretest.json`
- `Units/Unit 01/ENG2_U01_Pretest.gift`
- `Units/Unit 01/Lesson 01` through `Units/Unit 01/Lesson 08`
- All `P01.html` through `P07.html` pages
- All `lesson.json` and `quiz.json` files
- All Guided Practice, Lesson Quiz, and Unit Assessment GIFT files

Audit sources used:

- English II MLA Standard Inventory
- English II Crosswalk Draft
- English II Unit-Level Mapping
- English II Lesson-Level Mapping
- English I approved production model
- Unit 1 production requirements, including Lesson 8 as synthesis from Lessons 1-7 and Unit Assessment placement

## Revision Summary

The prior full audit identified Lesson 8 structural gaps and Unit Assessment answer clustering. The following revisions were completed:

1. Lesson 8 `P03.html` now uses required `Common Mistake`, `Incorrect`, and `Correct` labels with red/green examples.
2. Lesson 8 `P04.html` now uses required `P04 Worked Example` structure with Example 1, Example 2, and Example 3.
3. Lesson 8 `P05.html` now displays the five actual guided practice questions from `ENG2_U01_L08_GuidedPractice.gift`, including passages and A-D answer choices.
4. Lesson 8 `P06.html` now uses required Independent Work structure with Instructions, Part A, Part B, and Part C.
5. Lessons 2-7 `P06.html` pages now include explicit `Instructions` headings while preserving the existing Part A/B/C work.
6. Lesson 8 Unit Assessment answer choices were reordered to remove answer-key clustering while preserving correct answer content and feedback.

## Executive Decision

**PASS - UNIT 1 APPROVED**

Unit 1 now meets the required structure, mapping, standards, page layout, assessment, GIFT formatting, answer-distribution, and mastery-based production expectations.

## High-Level Results

| Audit Area | Result | Summary |
|---|---|---|
| Folder/file structure | PASS | All expected Unit 1 folders and required files exist and are nonempty. |
| JSON validity | PASS | All lesson, quiz, and pretest JSON files parse successfully. |
| Mapping alignment | PASS | Lesson standards match the approved English II Unit 1 lesson-level mapping. |
| Crosswalk alignment | PASS | Unit 1 standards are approved Unit 1 standards or Unit 1 support standards from the crosswalk. |
| Lesson 8 synthesis metadata | PASS | Lesson 8 is marked `Putting It All Together` and introduces no new primary standard. |
| Page structure | PASS | All P01-P07 pages now include required sections and page-specific structures. |
| Visual layout | PASS | Pages use the approved English production box layout and ENG2 headers. |
| GIFT question counts | PASS | Pretest, guided practice, lesson quizzes, and unit assessment contain expected counts. |
| GIFT answer structure | PASS | All audited GIFT questions have four A-D choices and exactly one correct answer. |
| GIFT feedback quality | PASS | Correct and incorrect choices include teachable plain-text feedback. |
| GIFT answer distribution | PASS | No assessment has 3-answer clustering. |
| Identifier cleanup | PASS | No `ENG1`, `MLA.ENG1`, or `ENG1_U` identifiers found in Unit 1 production files. |

## Mapping and Standards Audit

### Approved Unit 1 Mapping

| Lesson | Approved Focus | Approved Primary Standard(s) | Approved Support Standards | Result |
|---|---|---|---|---|
| 1 | Grade 10 close reading and accurate paraphrase | MLA.ENG2.R.10 | MLA.ENG2.V.01, MLA.ENG2.L.01 | PASS |
| 2 | Academic vocabulary and academic voice | MLA.ENG2.V.01 | MLA.ENG2.R.10, MLA.ENG2.L.01 | PASS |
| 3 | Paraphrase with relevant textual evidence | MLA.ENG2.R.10 | MLA.ENG2.V.01, MLA.ENG2.C.01 | PASS |
| 4 | Evidence-based written response | MLA.ENG2.R.10 | MLA.ENG2.V.01, MLA.ENG2.W.04, MLA.ENG2.L.01 | PASS |
| 5 | Conventions and clarity in short responses | MLA.ENG2.L.01 | MLA.ENG2.R.10, MLA.ENG2.V.01 | PASS |
| 6 | Academic vocabulary in speaking and writing | MLA.ENG2.V.01 | MLA.ENG2.C.01, MLA.ENG2.R.10 | PASS |
| 7 | Integrated close reading, evidence, and academic voice | MLA.ENG2.R.10, MLA.ENG2.V.01 | MLA.ENG2.L.01, MLA.ENG2.C.01 | PASS |
| 8 | Putting It All Together: Unit 1 synthesis | MLA.ENG2.R.10, MLA.ENG2.V.01 | MLA.ENG2.L.01, MLA.ENG2.C.01 | PASS |

### Crosswalk Alignment

Unit 1 correctly uses the crosswalk-approved foundation standards:

- `MLA.ENG2.R.10` - Paraphrase Grade-Level Texts
- `MLA.ENG2.V.01` - Integrate Academic Vocabulary
- `MLA.ENG2.L.01` - Apply Standard English Conventions
- `MLA.ENG2.C.01` - Present Ideas Orally
- `MLA.ENG2.W.04` - Revise for Audience Needs, used only as Lesson 4 support

No Unit 2+ future standards were introduced into Unit 1 lessons, quizzes, guided practice, pretest, or unit assessment.

## File Structure Audit

| Requirement | Result |
|---|---|
| Unit 1 folder exists | PASS |
| Lesson 01-Lesson 08 folders exist | PASS |
| Each lesson has P01-P07 | PASS |
| Lessons 1-7 have Lesson Quiz GIFT files | PASS |
| Lesson 8 has Unit Assessment GIFT file | PASS |
| Unit 1 has Pretest GIFT and `pretest.json` | PASS |
| All required files are nonempty | PASS |

## JSON Audit

| JSON Area | Result | Notes |
|---|---|---|
| `lesson.json` validity | PASS | All eight parse correctly. |
| `quiz.json` validity | PASS | All eight parse correctly. |
| `pretest.json` validity | PASS | Parses correctly. |
| Course identifier | PASS | Uses `ENG2`. |
| Unit identifier | PASS | Uses `Unit 01`. |
| Lesson titles | PASS | Titles match the approved production mapping/model. |
| Standards metadata | PASS | Lesson standards match the approved Unit 1 lesson mapping. |
| Page references | PASS | Each lesson lists `P01.html` through `P07.html` in order. |
| Lessons 1-7 quiz metadata | PASS | Each references the correct Lesson Quiz GIFT file. |
| Lesson 8 metadata | PASS | `lessonType` is `Putting It All Together`; `newPrimaryStandardIntroduced` is `false`. |
| Lesson 8 assessment metadata | PASS | `assessmentType` is `Unit Assessment`; gift file is `ENG2_U01_L08_UnitAssessment.gift`. |
| Pretest metadata | PASS | Pretest references `ENG2_U01_Pretest.gift` and Unit 1 standards. |

## HTML Page Layout and Content Audit

| Page | Required Structure | Unit 1 Result |
|---|---|---|
| P01 | Lesson overview, standards, learn/do/mastery/student connection/TOR help | PASS |
| P02 | Notebook Task Part 1, vocabulary, step-by-step teaching/review, passage, notebook directions | PASS |
| P03 | Notebook Task Part 2, passage, notebook directions, common mistake, red incorrect, green correct | PASS |
| P04 | Worked Example with Example 1, Example 2, Example 3, common mistake | PASS |
| P05 | Guided Practice aligned to GIFT, five questions visible | PASS |
| P06 | Independent Work with Instructions, Part A, Part B, Part C | PASS |
| P07 | Checkpoint, submission workflow, TOR support, mastery criteria | PASS |

Visual model checks passed:

- Arial/Helvetica font stack
- ENG2 Unit/Lesson header bar
- `max-width: 980px`
- colored instructional boxes
- left-border section styling
- rounded box styling
- consistent English production model layout

## Assessment Audit

| Assessment | Expected Count | Actual Count | Structure | Standards | Feedback | Answer Pattern | Result |
|---|---:|---:|---|---|---|---|---|
| Unit Pretest | 10 | 10 | 4 choices, 1 correct | Unit 1 standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 1 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 1 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 2 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 2 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 3 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 3 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 4 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 4 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 5 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 5 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 6 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 6 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 7 Guided Practice | 5 | 5 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 7 Quiz | 25 | 25 | 4 choices, 1 correct | Lesson standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 8 Guided Practice | 5 | 5 | 4 choices, 1 correct | Unit 1 standards | Plain-text teachable feedback | No clustering | PASS |
| Lesson 8 Unit Assessment | 25 | 25 | 4 choices, 1 correct | Unit 1 standards | Plain-text teachable feedback | No clustering | PASS |

Lesson 8 Unit Assessment final answer sequence:

`ADCBADCBADCBCABDCABDCABDB`

Distribution:

- A = 6
- B = 7
- C = 6
- D = 6

No three-answer clustering detected.

## Assessment-to-Content Alignment

| Lesson | Assessment Alignment Result |
|---|---|
| Lesson 1 | Questions align to close reading and accurate paraphrase. PASS |
| Lesson 2 | Questions align to academic vocabulary and academic voice. PASS |
| Lesson 3 | Questions align to paraphrase with relevant textual evidence. PASS |
| Lesson 4 | Questions align to evidence-based written response and clarity/revision support. PASS |
| Lesson 5 | Questions align to conventions and clarity in short responses. PASS |
| Lesson 6 | Questions align to academic vocabulary in speaking and writing. PASS |
| Lesson 7 | Questions align to integrated close reading, evidence, and academic voice. PASS |
| Lesson 8 | Guided Practice and Unit Assessment synthesize Lessons 1-7 without introducing new primary standards. PASS |
| Pretest | Pretest samples Unit 1 foundation standards before instruction. PASS |

## Passage Accessibility Audit

Result: **PASS**

- Questions that require passages include the relevant passage or sentence context directly in the GIFT item.
- HTML lesson pages include the passage or task context needed for notebook work, guided practice, independent work, and checkpoint tasks.
- Lesson 8 P05 now displays the same guided practice passages and answer choices that appear in the GIFT file.
- Students do not need to search elsewhere for required Unit 1 passages.

## Rigor and Mastery-Based Learning Audit

| Requirement | Result | Notes |
|---|---|---|
| Mastery-based adaptive structure | PASS | Lessons use overview, notebook instruction, guided practice, independent work, checkpoint, and assessment flow. |
| No live teacher assumption | PASS | Pages teach directly with explicit steps, examples, reminders, and mastery criteria. |
| Remedial learner support | PASS | Vocabulary, common mistakes, examples, and guided questions provide access. |
| Standard learner support | PASS | Lessons build expected Unit 1 skill sequence in manageable increments. |
| Accelerated learner support | PASS | Lesson 7 integration and Lesson 8 synthesis support combined application. |
| Academic voice progression | PASS | Academic vocabulary and response clarity spiral through the full unit. |
| Lesson 8 synthesis | PASS | Lesson 8 reviews and applies Lessons 1-7 only; no new primary standard is introduced. |

## Final Audit Decision

**PASS - UNIT 1 APPROVED**

English II Unit 1 Full Production Audit:

PASS — APPROVED FOR NEXT UNIT PRODUCTION
