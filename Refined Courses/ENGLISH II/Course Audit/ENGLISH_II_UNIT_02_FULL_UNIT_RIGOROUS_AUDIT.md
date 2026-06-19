# English II Unit 2 Full Unit Rigorous Production Audit

## Audit Scope

Course: English II  
Unit: Unit 02 - Literary Analysis, Perspective, and Narrative Craft  
Audit type: Full unit production, mapping, page structure, JSON, and assessment audit  
Audit date: 2026-06-19  
Production model: English I / Unit 1 gold-standard structure  

This audit reviewed Unit 2 Lessons 1-8, the Unit 2 pretest, all lesson pages, all lesson metadata files, all quiz metadata files, all guided practice GIFT files, all lesson quiz GIFT files, and the Lesson 8 unit assessment.

## Source Controls Checked

- Certified English II architecture package expectations
- English II Unit-Level Mapping
- English II Lesson-Level Mapping
- English II Crosswalk expectations through mapped MLA.ENG2 standards
- English and Communication vertical alignment expectations
- Approved MLA English lesson shell
- Approved English I production model
- Existing English II course shell and file structure
- Unit 1 production structure as the local gold standard

## Mapping Verification

| Lesson | Required Focus | Required Primary Standard(s) | Required Support Standards | Audit Result |
|---|---|---|---|---|
| Lesson 01 | Literary elements and layered meaning | MLA.ENG2.R.01 | MLA.ENG2.R.10, MLA.ENG2.V.01, MLA.ENG2.L.01 | PASS |
| Lesson 02 | Comparative theme development across literary texts | MLA.ENG2.R.02 | MLA.ENG2.R.01, MLA.ENG2.R.10, MLA.ENG2.V.01 | PASS |
| Lesson 03 | Coming-of-age experiences and conflicting perspectives | MLA.ENG2.R.03 | MLA.ENG2.R.10, MLA.ENG2.V.03, MLA.ENG2.C.01 | PASS |
| Lesson 04 | Figurative language, mood, and interpretive effect | MLA.ENG2.R.09 | MLA.ENG2.R.03, MLA.ENG2.V.03, MLA.ENG2.C.01 | PASS |
| Lesson 05 | Poetic ambiguity and multiple layers of meaning | MLA.ENG2.R.04 | MLA.ENG2.R.01, MLA.ENG2.R.02, MLA.ENG2.V.03 | PASS |
| Lesson 06 | Mythical, classical, or religious text adaptation | MLA.ENG2.R.11 | MLA.ENG2.R.04, MLA.ENG2.R.10, MLA.ENG2.V.01 | PASS |
| Lesson 07 | Narrative pacing for tension, mood, and tone | MLA.ENG2.W.01 | MLA.ENG2.R.03, MLA.ENG2.R.09, MLA.ENG2.W.04, MLA.ENG2.L.01 | PASS |
| Lesson 08 | Putting It All Together: Unit 2 synthesis | MLA.ENG2.R.01, MLA.ENG2.R.02, MLA.ENG2.R.03, MLA.ENG2.R.04, MLA.ENG2.R.09, MLA.ENG2.R.11, MLA.ENG2.W.01 | MLA.ENG2.R.10, MLA.ENG2.V.01, MLA.ENG2.L.01 | PASS |

Lesson 8 was verified as synthesis only. No new primary standard is introduced.

## File Structure Verification

| Requirement | Result |
|---|---|
| Unit 02 folder exists | PASS |
| Lessons 01-08 folders exist | PASS |
| Each lesson contains P01.html-P07.html | PASS |
| Each lesson contains lesson.json | PASS |
| Each lesson contains quiz.json | PASS |
| Lessons 01-07 contain Guided Practice GIFT and Lesson Quiz GIFT | PASS |
| Lesson 08 contains Guided Practice GIFT and Unit Assessment GIFT | PASS |
| Unit 02 contains ENG2_U02_Pretest.gift | PASS |
| Unit 02 contains pretest.json | PASS |
| No Lesson 09 or later content reviewed or required | PASS |

## Page Structure Verification

| Page | Required Elements | Result |
|---|---|---|
| P01 | Lesson title, standards, learning targets, work expectations, mastery language, student-friendly standard connection, Teacher of Record support | PASS |
| P02 | Notebook title, vocabulary, detailed teaching, step-by-step explanation, notebook directions, model example | PASS |
| P03 | Continued application, deeper learning, step-by-step explanation, common mistake, red incorrect example, green correct example | PASS |
| P04 | Three worked examples, modeled thinking, explicit reasoning, common mistake, red incorrect example, green correct example | PASS |
| P05 | Guided practice page aligned to Guided Practice GIFT | PASS |
| P06 | Independent work instructions with Part A, Part B, and Part C | PASS |
| P07 | Teacher of Record reminder, submission workflow, checkpoint task, mastery criteria | PASS |

All pages use the ENG2 Unit 02 header pattern and box styling consistent with the approved English I / Unit 1 production model.

## JSON Verification

| File Type | Verification | Result |
|---|---|---|
| lesson.json | Valid JSON in Lessons 01-08 | PASS |
| lesson.json | Correct course, unit, lesson, title, pages, and assessment references | PASS |
| lesson.json | Standards match approved Unit 2 lesson-level mapping | PASS |
| quiz.json | Valid JSON in Lessons 01-08 | PASS |
| quiz.json | Correct quiz or unit assessment title and GIFT reference | PASS |
| quiz.json | Standards match approved Unit 2 mapping | PASS |
| pretest.json | Valid JSON and correct Unit 2 pretest reference | PASS |

## Correction Made During Audit

The initial audit found a structural metadata issue in Lesson 08 only:

- `Units/Unit 02/Lesson 08/lesson.json` stored `primaryStandards` as plain strings instead of Unit 1 gold-standard code/description objects.
- `Units/Unit 02/Lesson 08/quiz.json` did not include the full synthesis metadata pattern used by the approved Unit 1 model.

Correction applied:

- Lesson 08 `lesson.json` now uses code/description objects for all Unit 2 primary standards.
- Lesson 08 `quiz.json` now includes Unit 2 primary standards, support standards, `primaryStandards`, and `newPrimaryStandardIntroduced: false`.

Instructional lesson content was not rewritten.

## Assessment Verification

Automated audit checks run: 2395  
Final audit failures after correction: 0  

| Assessment File | Required Count | Actual Count | Answer Distribution | Result |
|---|---:|---:|---|---|
| ENG2_U02_Pretest.gift | 10 | 10 | A3 / B3 / C2 / D2 | PASS |
| ENG2_U02_L01_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L01_Quiz.gift | 25 | 25 | A7 / B6 / C6 / D6 | PASS |
| ENG2_U02_L02_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L02_Quiz.gift | 25 | 25 | A7 / B6 / C6 / D6 | PASS |
| ENG2_U02_L03_GuidedPractice.gift | 5 | 5 | A2 / B1 / C1 / D1 | PASS |
| ENG2_U02_L03_Quiz.gift | 25 | 25 | A7 / B6 / C6 / D6 | PASS |
| ENG2_U02_L04_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L04_Quiz.gift | 25 | 25 | A7 / B6 / C6 / D6 | PASS |
| ENG2_U02_L05_GuidedPractice.gift | 5 | 5 | A2 / B1 / C1 / D1 | PASS |
| ENG2_U02_L05_Quiz.gift | 25 | 25 | A7 / B6 / C6 / D6 | PASS |
| ENG2_U02_L06_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L06_Quiz.gift | 25 | 25 | A7 / B7 / C6 / D5 | PASS |
| ENG2_U02_L07_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L07_Quiz.gift | 25 | 25 | A5 / B8 / C5 / D7 | PASS |
| ENG2_U02_L08_GuidedPractice.gift | 5 | 5 | A1 / B2 / C1 / D1 | PASS |
| ENG2_U02_L08_UnitAssessment.gift | 25 | 25 | A7 / B8 / C5 / D5 | PASS |

## GIFT Formatting Verification

| Requirement | Result |
|---|---|
| Guided Practice files contain exactly 5 questions | PASS |
| Lesson Quiz files contain exactly 25 questions | PASS |
| Unit Assessment contains exactly 25 questions | PASS |
| Unit Pretest contains 10 questions | PASS |
| Each question has A, B, C, and D choices only | PASS |
| Each question has exactly one correct answer | PASS |
| MLA.ENG2 standard is visible in each question | PASS |
| Feedback uses plain text and no HTML | PASS |
| No placeholder or draft feedback markers found | PASS |
| No three-answer correct-answer clustering found | PASS |
| Passage, poem, source, adaptation, original, excerpt, or draft context is embedded where needed | PASS |

## Content and Instructional Design Verification

| Requirement | Result |
|---|---|
| Lessons teach directly to students without assuming live teacher instruction | PASS |
| Lessons provide explicit, step-by-step explanation | PASS |
| Lessons support remedial, standard, and accelerated learners through modeling, guided practice, and independent work | PASS |
| Notebook tasks are clear and tied to lesson standards | PASS |
| Worked examples include explicit reasoning and modeled thinking | PASS |
| Common mistakes are included in P03 and P04 | PASS |
| Incorrect examples use red styling | PASS |
| Correct examples use green styling | PASS |
| Checkpoints align to lesson standards and mastery criteria | PASS |
| Required passages or text contexts are embedded where students need them | PASS |

## Cross-Unit Contamination Check

| Check | Result |
|---|---|
| No English I standard codes found in Unit 2 files | PASS |
| No ENG1 assessment naming found in Unit 2 files | PASS |
| No Unit 3 future standard codes introduced in Unit 2 files | PASS |
| No Unit 03 / Unit 3 content contamination found | PASS |

## Final Audit Decision

PASS

English II Unit 2 Full Production Audit:

PASS - APPROVED FOR NEXT UNIT PRODUCTION
