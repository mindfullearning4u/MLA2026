# English IV Unit 1 Rigorous Production Audit

## Executive Summary

English IV Unit 1 was audited as a complete production package.

Scope reviewed:

- Unit 1 Pretest
- Lessons 1-8
- P01-P07 lesson pages for all lessons
- Guided Practice GIFT files
- Lesson Quiz GIFT files for Lessons 1-7
- Lesson 8 Unit Assessment GIFT
- `lesson.json` and `quiz.json` files
- Visual shell consistency
- Standards scope
- Moodle readiness
- Self-paced mastery design requirements

Overall result:

**PASS**

The unit is structurally complete, visually consistent, Moodle-ready, instructionally aligned, and assessment-ready after answer-key distribution revision.

Revision completed:

- Answer choice positions were mechanically rebalanced in affected GIFT files.
- Question wording, answer choice wording, correct answer meaning, feedback intent, standards, and passages were preserved.
- No instructional lesson content was modified.

## Unit Structure Audit

| Requirement | Result |
|---|---|
| Unit 1 contains Lesson 01 through Lesson 08 | PASS |
| Each lesson contains P01-P07 | PASS |
| Each lesson contains `lesson.json` | PASS |
| Each lesson contains `quiz.json` | PASS |
| Lessons 1-7 contain Guided Practice GIFT | PASS |
| Lessons 1-7 contain Lesson Quiz GIFT | PASS |
| Lesson 8 contains Guided Practice GIFT | PASS |
| Lesson 8 contains Unit Assessment GIFT | PASS |
| Lesson 8 does not contain a Lesson Quiz GIFT | PASS |
| Unit 1 contains `pretest.json` | PASS |
| Unit 1 contains Pretest GIFT | PASS |

## File Presence Summary

| Component | Expected | Actual | Result |
|---|---:|---:|---|
| Lesson folders | 8 | 8 | PASS |
| HTML lesson pages | 56 | 56 | PASS |
| Lesson JSON files | 8 | 8 | PASS |
| Quiz JSON files | 8 | 8 | PASS |
| Guided Practice GIFT files | 8 | 8 | PASS |
| Lesson Quiz GIFT files | 7 | 7 | PASS |
| Unit Assessment GIFT files | 1 | 1 | PASS |
| Unit Pretest JSON files | 1 | 1 | PASS |
| Unit Pretest GIFT files | 1 | 1 | PASS |

## JSON Validation

All JSON files parse successfully.

| JSON Category | Files Checked | Result |
|---|---:|---|
| Unit pretest JSON | 1 | PASS |
| Lesson JSON | 8 | PASS |
| Quiz / assessment JSON | 8 | PASS |

Metadata reference validation:

- All `lesson.json` page references point to existing P01-P07 files.
- All `quiz.json` Guided Practice references point to existing GIFT files.
- Lessons 1-7 `quiz.json` files point to Lesson Quiz GIFT files.
- Lesson 8 `quiz.json` points to `ENG4_U01_L08_UnitAssessment.gift`.
- `pretest.json` points to `ENG4_U01_Pretest.gift`.

Result: **PASS**

## GIFT Structure Audit

| File | Questions | Choices | Correct Answers | HTML in GIFT | Standards Displayed | Result |
|---|---:|---:|---:|---:|---:|---|
| `ENG4_U01_Pretest.gift` | 10 | 40 | 10 | 0 | 10 | PASS |
| `ENG4_U01_L01_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L01_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L02_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L02_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L03_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L03_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L04_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L04_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L05_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L05_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L06_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L06_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L07_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L07_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | PASS |
| `ENG4_U01_L08_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | PASS |
| `ENG4_U01_L08_UnitAssessment.gift` | 25 | 100 | 25 | 0 | 25 | PASS |

GIFT syntax result: **PASS**

## Answer-Key Distribution Audit

The audit reviewed correct-answer distribution and consecutive answer clustering.

| File | Distribution | Maximum Consecutive Same Answer | Result |
|---|---|---:|---|
| `ENG4_U01_Pretest.gift` | A=3, B=3, C=2, D=2 | 1 | PASS |
| `ENG4_U01_L01_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L01_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L02_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L02_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L03_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L03_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L04_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L04_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L05_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L05_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L06_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L06_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L07_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L07_Quiz.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U01_L08_GuidedPractice.gift` | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U01_L08_UnitAssessment.gift` | A=7, B=6, C=6, D=6 | 1 | PASS |

Finding:

Answer-key distributions are now balanced and avoid clustering.

Revision completed:

- Rebalanced answer choice positions in affected GIFT files.
- Preserved all question wording, answer choice wording, correct answer meaning, feedback intent, standards, and passages.
- Re-audit confirms all GIFT files remain structurally valid.

## Standards Scope Audit

Standards found in Unit 1 files:

- `MLA.ENG4.R.10`
- `MLA.ENG4.V.01`
- `MLA.ENG4.L.01`
- `MLA.ENG4.C.01`
- `MLA.ENG4.W.04`

Validation:

- `MLA.ENG4.R.10` and `MLA.ENG4.V.01` are approved Unit 1 primary standards.
- `MLA.ENG4.L.01` and `MLA.ENG4.C.01` are approved Unit 1 support standards.
- `MLA.ENG4.W.04` appears only in Lesson 4 as an approved support standard according to the English IV lesson-level mapping.
- No future Unit 2-6 primary standards were introduced as Unit 1 primary targets.

Result: **PASS**

## Lesson Mapping Audit

| Lesson | Approved Focus | Standards Status | Result |
|---|---|---|---|
| Lesson 1 | Grade 12 close reading and accurate paraphrase | Matches approved mapping | PASS |
| Lesson 2 | Academic vocabulary for advanced analysis | Matches approved mapping | PASS |
| Lesson 3 | Paraphrase with relevant textual evidence | Matches approved mapping | PASS |
| Lesson 4 | Advanced analytical written response foundations | Matches approved mapping, including W.04 support | PASS |
| Lesson 5 | Conventions and clarity in advanced responses | Matches approved mapping | PASS |
| Lesson 6 | Academic vocabulary in speaking and writing | Matches approved mapping | PASS |
| Lesson 7 | Integrated close reading, evidence, and academic voice | Matches approved mapping | PASS |
| Lesson 8 | Putting It All Together: Unit 1 synthesis | Synthesizes Unit 1 standards only | PASS |

## Lesson 8 Audit

Lesson 8 was reviewed against the approved rule:

- Lesson 8 = Putting It All Together
- Lesson 8 contains Unit Assessment
- Lesson 8 has no Lesson Quiz

Findings:

- Lesson 8 title and overview identify the lesson as a Unit 1 synthesis.
- Lesson 8 `quiz.json` identifies the assessment type as Unit Assessment.
- `ENG4_U01_L08_UnitAssessment.gift` exists and contains 25 questions.
- No `ENG4_U01_L08_Quiz.gift` file exists.
- Lesson 8 does not introduce unrelated or future standards.

Result: **PASS**

## Visual and HTML Shell Audit

Visual shell indicators reviewed:

- Arial/Helvetica font stack
- Boxed content sections
- Border radius
- Color-coded instructional boxes
- Consistent spacing
- P01-P07 structure

Result:

All 56 HTML pages use the approved production-style visual shell signals.

Result: **PASS**

## Required Page Flow Audit

| Page Type | Requirement | Unit 1 Result |
|---|---|---|
| P01 | Lesson overview, standards, learning path, mastery, ToR support | PASS |
| P02 | Notebook Task Part 1, vocabulary, direct teaching | PASS |
| P03 | Notebook Task Part 2, deeper learning, common mistake | PASS |
| P04 | Worked examples and common mistake | PASS |
| P05 | Guided Practice connection | PASS |
| P06 | Independent Work with Part A, Part B, Part C | PASS |
| P07 | ToR reminder, submission workflow, checkpoint, mastery criteria | PASS |

Result: **PASS**

## Common Mistake Audit

Each P03 and P04 file was checked for required common mistake support.

| Requirement | Result |
|---|---|
| P03 includes Common Mistake section in all lessons | PASS |
| P04 includes Common Mistake section in all lessons | PASS |
| Incorrect examples use red styling | PASS |
| Correct examples use green styling | PASS |
| Explanations are teachable and feedback-oriented | PASS |

## Passage Accessibility Audit

Unit 1 was checked for embedded source handling.

Findings:

- Passages needed for instruction are embedded in the lesson pages.
- Passages needed for guided practice, quizzes, checkpoint tasks, and the Unit Assessment are embedded directly in the relevant file or page.
- Students are not required to search elsewhere for required passages.

Result: **PASS**

## Moodle Readiness Audit

| Requirement | Result |
|---|---|
| GIFT files contain no HTML | PASS |
| GIFT questions use A-D answer choices | PASS |
| Each question has one correct answer | PASS |
| Feedback markers are present | PASS |
| MLA standards are shown in GIFT questions | PASS |
| No malformed answer choice lines found | PASS |
| Lesson 8 uses Unit Assessment instead of Lesson Quiz | PASS |
| Answer-key distribution avoids clustering | PASS |

## Self-Paced Mastery Audit

Unit 1 supports the MLA self-paced model.

Strengths:

- Lessons include explicit teaching before practice.
- Notebook tasks scaffold thinking before independent work.
- Worked examples model reasoning.
- Common mistakes provide corrective feedback.
- Guided Practice provides immediate feedback.
- Independent Work includes clear parts.
- Checkpoints include submission workflow and mastery criteria.
- Grade 12 expectations are present through paraphrase, evidence, vocabulary precision, conventions, academic voice, and synthesis.

Result: **PASS**

## Compliance Findings

### Passing Areas

- Folder structure
- Required files
- P01-P07 page structure
- JSON validity
- JSON file references
- GIFT syntax
- GIFT question counts
- GIFT answer choice counts
- One correct answer per question
- Standards displayed in questions
- No HTML in GIFT
- Embedded passages
- Common mistake red/green structure
- Teacher of Record reminders
- Checkpoint structure
- Lesson 8 Unit Assessment rule
- Visual shell consistency

### Revision Completed

Assessment answer-key balance was corrected before final Unit 1 approval.

Files revised:

- `ENG4_U01_L01_GuidedPractice.gift`
- `ENG4_U01_L01_Quiz.gift`
- `ENG4_U01_L02_GuidedPractice.gift`
- `ENG4_U01_L02_Quiz.gift`
- `ENG4_U01_L03_GuidedPractice.gift`
- `ENG4_U01_L03_Quiz.gift`
- `ENG4_U01_L04_GuidedPractice.gift`
- `ENG4_U01_L04_Quiz.gift`
- `ENG4_U01_L05_GuidedPractice.gift`
- `ENG4_U01_L05_Quiz.gift`
- `ENG4_U01_L06_GuidedPractice.gift`
- `ENG4_U01_L06_Quiz.gift`
- `ENG4_U01_L07_GuidedPractice.gift`
- `ENG4_U01_L07_Quiz.gift`
- `ENG4_U01_L08_GuidedPractice.gift`
- `ENG4_U01_L08_UnitAssessment.gift`

Re-audit result:

- All revised GIFT files retain the correct question count.
- All revised GIFT files retain four A-D choices per question.
- All revised GIFT files retain exactly one correct answer per question.
- No HTML was introduced into GIFT files.
- Standards remain displayed.
- Correct-answer positions are balanced and non-clustered.

## Final Audit Decision

English IV Unit 1 Full Production Audit:

**PASS**

Unit 1 is structurally complete, visually consistent, Moodle-ready, instructionally aligned, and assessment-ready.

English IV Unit 1 is approved for final production use and continuation to Unit 2 production.
