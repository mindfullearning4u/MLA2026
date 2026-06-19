# English I Unit 1 Lessons 7-8 Production Audit

## Executive Summary

English I Unit 1 Lessons 7 and 8 were built and audited against the approved English I Unit 1 lesson-level mapping, MLA lesson shell requirements, Moodle-ready GIFT requirements, and MLA production model formatting expectations.

Lesson 7 functions as the final Unit 1 instructional integration lesson. Lesson 8 is correctly framed as "Putting It All Together" and synthesizes Lessons 1-7 without introducing a new primary standard.

## Lesson Batch Scope

| Lesson | Location | Approved Lesson Focus | Primary Standards | Support Standards | Status |
|---|---|---|---|---|---|
| Lesson 07 | Refined Courses/ENGLISH I/Units/Unit 01/Lesson 07 | Integrated close reading, vocabulary, and evidence | MLA.ENG1.R.10; MLA.ENG1.V.01 | MLA.ENG1.L.01; MLA.ENG1.C.01 | PASS |
| Lesson 08 | Refined Courses/ENGLISH I/Units/Unit 01/Lesson 08 | Putting It All Together: Unit 1 synthesis | MLA.ENG1.R.10; MLA.ENG1.V.01 | MLA.ENG1.L.01; MLA.ENG1.C.01 | PASS |

## Required File Validation

| Requirement | Lesson 07 | Lesson 08 | Result |
|---|---:|---:|---|
| Lesson folder exists | Yes | Yes | PASS |
| P01.html exists | Yes | Yes | PASS |
| P02.html exists | Yes | Yes | PASS |
| P03.html exists | Yes | Yes | PASS |
| P04.html exists | Yes | Yes | PASS |
| P05.html exists | Yes | Yes | PASS |
| P06.html exists | Yes | Yes | PASS |
| P07.html exists | Yes | Yes | PASS |
| Guided Practice .gift exists | Yes | Yes | PASS |
| Lesson Quiz .gift exists for Lesson 7 | Yes | Not applicable | PASS |
| Unit Assessment .gift exists for Lesson 8 | Not applicable | Yes | PASS |
| lesson.json exists and parses | Yes | Yes | PASS |
| quiz.json exists and parses | Yes | Yes | PASS |

## GIFT Validation

| File | Required Questions | Actual Questions | 4 Choices Each | Exactly 1 Correct Each | MLA Standard Label Each | No HTML in Feedback | Result |
|---|---:|---:|---|---|---|---|---|
| ENG1_U01_L07_GuidedPractice.gift | 5 | 5 | Yes | Yes | Yes | Yes | PASS |
| ENG1_U01_L07_Quiz.gift | 25 | 25 | Yes | Yes | Yes | Yes | PASS |
| ENG1_U01_L08_GuidedPractice.gift | 5 | 5 | Yes | Yes | Yes | Yes | PASS |
| ENG1_U01_L08_UnitAssessment.gift | 25 | 25 | Yes | Yes | Yes | Yes | PASS |

## Lesson 8 Validation

| Check | Result | Notes |
|---|---|---|
| Lesson 8 title is Putting It All Together | PASS | Lesson title is "Putting It All Together: Unit 1 Synthesis." |
| Lesson 8 introduces no new primary standard | PASS | lesson.json sets `newPrimaryStandardIntroduced` to false. |
| Lesson 8 synthesizes Lessons 1-7 | PASS | Review and assessment content covers paraphrase, vocabulary, evidence, conventions, and oral explanation support already taught in Unit 1. |
| Lesson 8 contains Unit Assessment | PASS | Unit Assessment file is ENG1_U01_L08_UnitAssessment.gift. |

## Standards Alignment Validation

| Check | Result | Notes |
|---|---|---|
| Standards match approved English I lesson mapping | PASS | Lesson 7 uses MLA.ENG1.R.10 and MLA.ENG1.V.01 as paired primary standards. Lesson 8 synthesizes Unit 1 primary standards only. |
| Support standards remain supportive | PASS | MLA.ENG1.L.01 and MLA.ENG1.C.01 support clarity and explanation without becoming new instructional targets. |
| No later-unit standards introduced | PASS | Lesson folders contain only Unit 1 mapped standards. |
| Checkpoints align to mapped standards | PASS | Lesson 7 checkpoint integrates Unit 1 skills. Lesson 8 checkpoint directs students to the Unit 1 Assessment. |

## Page-Level Validation

| Requirement | Lesson 07 | Lesson 08 | Result |
|---|---|---|---|
| P01 includes lesson title | Yes | Yes | PASS |
| Standards Covered appears directly below title on P01 | Yes | Yes | PASS |
| P01 includes student-friendly learning goals/review goals | Yes | Yes | PASS |
| P01 includes why this matters | Yes | Yes | PASS |
| P01 includes what students will do | Yes | Yes | PASS |
| P01 includes mastery description | Yes | Yes | PASS |
| P02 is notebook-based | Yes | Yes | PASS |
| P03 is notebook-based and deeper than P02 | Yes | Yes | PASS |
| P04 includes worked example or worked review | Yes | Yes | PASS |
| P04 includes common mistake | Yes | Yes | PASS |
| Incorrect example uses red | Yes | Yes | PASS |
| Correct example uses green | Yes | Yes | PASS |
| P05 includes 5 guided/review questions | Yes | Yes | PASS |
| P06 includes independent work/readiness check | Yes | Yes | PASS |
| P07 includes checkpoint/submission workflow | Yes | Yes | PASS |
| P07 includes mastery criteria | Yes | Yes | PASS |

## Issues Found and Corrected

| Issue | Why It Was an Issue | Correction | Revalidation Result |
|---|---|---|---|
| Several Lesson 7 Quiz GIFT items had intended correct answers marked as distractors. | Moodle requires exactly one correct answer per multiple-choice item. | Correct-answer markers were updated in ENG1_U01_L07_Quiz.gift. | PASS |

## Final Validation Commands Performed

- Required file inventory check for both lesson folders.
- JSON parse check for lesson.json and quiz.json in both lesson folders.
- GIFT question-count validation.
- GIFT answer-choice validation.
- GIFT correct-answer validation.
- GIFT MLA-standard-label validation.
- GIFT no-HTML-feedback validation.
- GIFT feedback-label integrity check.
- Lesson 8 Putting It All Together validation.
- Lesson 8 no-new-primary-standard validation.

## Final Audit Decision

English I Unit 1 Lessons 7-8 Production Batch:

PASS — APPROVED FOR UNIT 1 PRETEST CREATION
