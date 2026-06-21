# Creative Writing Unit 4 Rigorous Audit

Audit date: 2026-06-21

Audit scope: `Refined Courses/CREATIVE WRITING/Units/Unit 04`

Course restriction: Creative Writing only. No other course was reviewed or edited.

## Audit Standard Applied

This audit checked Unit 4 against the approved Creative Writing production requirements:

- Unit 1 gold-standard structure
- Seven-page lesson architecture: P01-P07
- Required lesson files: `lesson.json`, `quiz.json`, P01-P07
- Required pretest files: `pretest.json`, `CW_U04_Pretest.gift`
- Approved Unit 4 lesson mapping and standards alignment
- ALG1-style visual shell consistency for HTML pages
- No-teacher instructional model: detailed, sequential, step-by-step teaching
- Mastery-based adaptive support for remedial, standard, and accelerated learners
- Moodle-ready GIFT formatting with no HTML
- A-D only answer choices
- No answer-pattern dependency
- Detailed teachable feedback for correct and incorrect answers
- Poem line, poem excerpt, or context included with every question
- Checkpoint workflow, TOR support, submission instructions, and mastery criteria
- Repository readiness: no empty files, no merge conflicts, no prohibited `Upload` wording

## Approved Unit 4 Mapping Checked

| Lesson | Approved Focus | Primary Standard(s) | Supporting Standard(s) |
| --- | --- | --- | --- |
| 1 | Figurative language and mood | MLA.CW.POE.02 | MLA.CW.WR.07, MLA.CW.COM.03 |
| 2 | Advanced figurative language and mood | MLA.CW.POE.03 | MLA.CW.POE.02, MLA.CW.WR.05 |
| 3 | Poetic layers of meaning and ambiguity | MLA.CW.POE.01 | MLA.CW.POE.03, MLA.CW.WR.10 |
| 4 | Word origins and poetic diction | MLA.CW.WR.06 | MLA.CW.WR.05, MLA.CW.WR.07 |
| 5 | Connotation, denotation, and style | MLA.CW.WR.07 | MLA.CW.POE.02, MLA.CW.COM.03 |
| 6 | Paraphrase and interpretation of poetic models | MLA.CW.WR.03 | MLA.CW.POE.01, MLA.CW.WR.09 |
| 7 | Integrated poem development | MLA.CW.POE.01, MLA.CW.POE.03 | MLA.CW.POE.02, MLA.CW.WR.06, MLA.CW.WR.07 |
| 8 | Unit 4 synthesis | MLA.CW.POE.01, MLA.CW.POE.02, MLA.CW.POE.03, MLA.CW.WR.06, MLA.CW.WR.07, MLA.CW.WR.03 | MLA.CW.WR.05, MLA.CW.COM.03, MLA.CW.REV.01 |

## Initial Findings

### 1. Required Architecture

Status: PASS

Unit 4 contains the required production structure:

- 8 lesson folders
- Each lesson contains P01-P07
- Each lesson contains `lesson.json`
- Each lesson contains `quiz.json`
- Unit 4 contains `pretest.json`
- Unit 4 contains `CW_U04_Pretest.gift`
- Lesson 8 contains the unit assessment bank

No required lesson page, JSON file, guided practice file, quiz file, pretest file, or unit assessment file was missing.

### 2. JSON Metadata

Status: PASS

All Unit 4 JSON files parsed successfully:

- `pretest.json`
- Lesson 1-8 `lesson.json`
- Lesson 1-8 `quiz.json`

Lesson metadata was checked against the approved Unit 4 mapping. Primary and supporting standards matched the approved lesson-level standards for Lessons 1-8.

### 3. Unit Overview Alignment

Status: PASS

`Unit Overview.md` now identifies Unit 4 as Poetry, Figurative Language, Mood, and Style. The previous Creative Nonfiction/B.E.S.T. mismatch has been removed, and the overview aligns to the approved Unit 4 Creative Writing standards and lesson sequence.

### 4. Lesson Page Requirements

Status: FIXED AND PASSED ON RE-AUDIT

Initial finding:

- Lesson 8 P02 was missing explicit remedial/standard/accelerated adaptive support language.

Correction made:

- Added a `Self-Paced Learning Path` section to `Lesson 08/P02.html` with remedial, standard, and accelerated guidance for Unit 4 synthesis review.

After correction, all lesson pages passed required page-level instructional checks:

- P01 includes lesson overview and TOR support language.
- P02 includes notebook task, vocabulary, adaptive learning support, and step-by-step teaching.
- P03 includes continued teaching and common mistake feedback.
- P04 includes Worked Examples 1, 2, and 3 with step-by-step explanation and common mistake feedback.
- P06 includes Independent Work Parts A, B, and C.
- P07 includes TOR support, submission workflow, checkpoint task, and mastery criteria.

### 5. Moodle and GIFT Readiness

Status: PASS

All Unit 4 GIFT files were checked for Moodle readiness:

- No HTML detected inside GIFT banks.
- Questions use A-D choices only.
- Each question contains one correct answer.
- Each multiple-choice question contains four answer choices.
- Correct and incorrect answer choices include teachable feedback.
- Guided practice banks contain 5 questions.
- Lesson quiz banks contain 25 questions.
- Pretest contains 25 questions.
- Lesson 8 unit assessment contains 25 questions.
- Every item includes its own poem line, poem excerpt, or context.

Correct answer positions were also checked. Lesson quiz, pretest, and unit assessment banks use a normalized distribution to avoid answer-pattern dependency.

### 6. Quiz and Assessment Configuration

Status: PASS

Quiz configuration was checked against the expected Unit 4 model:

- Lessons 1-7 use 25-question quiz banks.
- Lessons 1-7 draw 5 questions per attempt.
- Lessons 1-7 use an 80 percent mastery threshold.
- Lesson 8 uses the unit assessment bank.
- Lesson 8 draws 25 questions for the unit assessment.
- Pretest uses the Unit 4 pretest bank.
- All referenced GIFT files exist at the expected paths.

### 7. Visual Shell and LMS Formatting

Status: PASS

Unit 4 HTML pages use the established Creative Writing / ALG1-style visual shell:

- Lesson sections are organized in clear boxes.
- Correct and incorrect examples use visible color-coded feedback.
- Page structure is consistent across lessons.
- Pages are LMS-ready HTML files.
- Submission wording uses `Submit` rather than prohibited `Upload` wording.

### 8. Repository Readiness

Status: PASS

Scoped repository checks found:

- No empty Unit 4 files.
- No merge conflict markers.
- No prohibited `Upload` wording.
- No old Unit 4 Creative Nonfiction/B.E.S.T. overview references.
- No missing GIFT references from quiz JSON files.

## Corrections Made During Audit

- Revised `Refined Courses/CREATIVE WRITING/Units/Unit 04/Lesson 08/P02.html` to add explicit self-paced remedial, standard, and accelerated learning support.
- Added this rigorous Unit 4 audit report.

No lesson standards, quiz JSON settings, GIFT bank answer content, pretest content, or unit assessment content required correction during this rigorous audit.

## Re-Audit Outcome

After the correction, Unit 4 was rechecked in the same scoped area.

| Audit Area | Re-Audit Result |
| --- | --- |
| Required lesson architecture | PASS |
| Required P01-P07 files | PASS |
| Required lesson and quiz JSON files | PASS |
| JSON validity | PASS |
| Standards metadata alignment | PASS |
| Unit Overview alignment | PASS |
| GIFT formatting | PASS |
| Guided practice readiness | PASS |
| Lesson quiz readiness | PASS |
| Pretest readiness | PASS |
| Unit assessment readiness | PASS |
| No-teacher instructional detail | PASS |
| Adaptive learner support | PASS |
| Worked examples | PASS |
| Common mistake feedback | PASS |
| Independent work structure | PASS |
| Checkpoint workflow and mastery criteria | PASS |
| ALG1-style visual shell consistency | PASS |
| No empty files | PASS |
| No merge conflict markers | PASS |
| `Submit` wording | PASS |

## Final Audit Decision

Unit 4 is audit-ready after the Lesson 8 P02 adaptive-support correction.

## Revisions Made

- Fixed Lesson 8 P02 adaptive support.
- Added this rigorous Unit 4 audit report.

## Approval Needed

None.
