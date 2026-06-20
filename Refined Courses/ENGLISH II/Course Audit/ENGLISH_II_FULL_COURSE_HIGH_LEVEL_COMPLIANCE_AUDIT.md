# English II Full Course High-Level Compliance and Accreditation Audit

## Audit Scope

Course: English II  
Audit type: Full course compliance, accreditation, readiness, structure, metadata, page, assessment, and standards audit  
Audit date: 2026-06-20  
Production model: English I / Unit 1 gold-standard structure  

This audit reviewed all production files for English II Units 1-6:

- 6 units
- 48 lessons
- 336 HTML lesson pages
- 102 JSON metadata files
- 102 Moodle-ready GIFT assessment files
- 1,500 total assessment questions

## Source Controls Checked

- Certified English II architecture package expectations
- English II Standard Inventory
- English II Crosswalk
- English II Unit-Level Mapping
- English II Lesson-Level Mapping
- English and Communication vertical alignment expectations
- Approved MLA English lesson shell
- Approved English I production model
- Existing English II course shell and file structure
- Unit 1 production structure as the local gold standard
- Unit-level rigorous audits for Units 1-6

## Course Structure Verification

| Requirement | Result |
|---|---|
| Units 01-06 exist | PASS |
| Each unit contains Lessons 01-08 | PASS |
| Each lesson contains P01.html-P07.html | PASS |
| Each lesson contains `lesson.json` | PASS |
| Each lesson contains `quiz.json` | PASS |
| Each unit contains `pretest.json` | PASS |
| Each unit contains one Unit Pretest GIFT | PASS |
| Lessons 01-07 contain Guided Practice and Lesson Quiz GIFT files | PASS |
| Lesson 08 contains Guided Practice and Unit Assessment GIFT files | PASS |
| No Lesson 09 or later content found | PASS |

## Unit Results

| Unit | Lessons | Pages | JSON Files | GIFT Files | Questions | Open Issues | Result |
|---|---:|---:|---:|---:|---:|---:|---|
| Unit 01 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |
| Unit 02 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |
| Unit 03 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |
| Unit 04 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |
| Unit 05 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |
| Unit 06 | 8 | 56 | 17 | 17 | 250 | 0 | PASS |

## Page Structure Verification

| Page | Required Elements | Result |
|---|---|---|
| P01 | Lesson title, standards covered, what students will learn, what students will do, mastery language, student-friendly standard connection, Teacher of Record support | PASS |
| P02 | Notebook title, vocabulary, detailed teaching, step-by-step explanation, embedded passage/source/context where needed, notebook directions, model example | PASS |
| P03 | Continued application, deeper learning, step-by-step explanation, common mistake, red incorrect example, green correct example | PASS |
| P04 | Three worked examples, modeled thinking, explicit reasoning, common mistake, red incorrect example, green correct example | PASS |
| P05 | Guided practice page aligned to Guided Practice GIFT | PASS |
| P06 | Independent work instructions with Part A, Part B, and Part C | PASS |
| P07 | Teacher of Record reminder, submission workflow, checkpoint task, mastery criteria | PASS |

All audited pages use ENG2 headers and approved English production box styling consistent with the English I / Unit 1 production model.

## JSON and Metadata Verification

| Requirement | Result |
|---|---|
| All `lesson.json` files parse as valid JSON | PASS |
| All `quiz.json` files parse as valid JSON | PASS |
| All `pretest.json` files parse as valid JSON | PASS |
| Course identifier is `ENG2` | PASS |
| Unit identifiers match folder unit numbers | PASS |
| Lesson identifiers match folder lesson numbers | PASS |
| Lessons 01-07 use `assessmentType: Lesson Quiz` | PASS |
| Lesson 08 uses `assessmentType: Unit Assessment` | PASS |
| Pretest metadata references the correct unit pretest GIFT file | PASS |
| Standards fields use English II MLA standard codes | PASS |

## Assessment Verification

| Assessment Category | Expected Structure | Result |
|---|---|---|
| Unit Pretests | 6 files, 10 questions each | PASS |
| Guided Practice | 48 files, 5 questions each | PASS |
| Lesson Quizzes | 42 files, 25 questions each | PASS |
| Unit Assessments | 6 files, 25 questions each | PASS |
| Total assessment questions | 1,500 | PASS |

## GIFT Formatting Verification

| Requirement | Result |
|---|---|
| Every GIFT question has A, B, C, and D choices only | PASS |
| Every GIFT question has exactly one correct answer | PASS |
| MLA.ENG2 standard is visible in every question | PASS |
| Feedback is plain text and contains no HTML | PASS |
| Correct and incorrect feedback markers are aligned | PASS |
| No three-answer correct-answer clustering found | PASS |
| Moodle-ready formatting preserved across older and newer GIFT file styles | PASS |
| Passage, source, draft, scenario, or context is embedded where needed | PASS |

## Standards and Mapping Coverage

| Area | Result |
|---|---|
| Unit 1 foundation reading, paraphrase, vocabulary, conventions, and academic voice standards | PASS |
| Unit 2 literary analysis, perspective, figurative language, adaptation, and narrative craft standards | PASS |
| Unit 3 informational text, rhetoric, structure, argument, and expository communication standards | PASS |
| Unit 4 research, source evaluation, paraphrase, synthesis, expository writing, and publication standards | PASS |
| Unit 5 language, vocabulary, etymology, word meaning, conventions, tone, and revision standards | PASS |
| Unit 6 oral communication, digital presentation, evidence, rehearsal, feedback, and publication readiness standards | PASS |
| Lesson 8 in each unit synthesizes Lessons 1-7 without introducing a new primary standard | PASS |
| Unit Pretests sample readiness before instruction | PASS |
| Unit Assessments align to taught unit standards | PASS |

## Mastery-Based and Student-Use Readiness

| Requirement | Result |
|---|---|
| Lessons teach directly to students without assuming live teacher instruction | PASS |
| Lessons include explicit step-by-step instruction | PASS |
| Lessons support remedial, standard, and accelerated learners | PASS |
| Notebook tasks are clear and standards-aligned | PASS |
| Worked examples include modeled thinking and explicit reasoning | PASS |
| Common mistakes include red incorrect and green correct examples | PASS |
| Guided practice includes teachable feedback | PASS |
| Independent work includes clear Part A, Part B, and Part C expectations | PASS |
| Checkpoints include Teacher of Record reminders, submission workflow, task directions, and mastery criteria | PASS |
| Required passages, drafts, source sets, or scenarios are embedded where students need them | PASS |

## Corrections Made During Course Audit

The full-course audit identified and corrected the following structural or metadata issues:

1. Units 01-03 Lessons 01-07 `quiz.json` files were missing explicit `assessmentType: Lesson Quiz`.
2. Unit 02 Lesson 08 `quiz.json` contained a non-standard `primaryStandard: Unit 2 synthesis` string while the correct `primaryStandards` array was already present.
3. Unit 01 Lesson 08 P01 used `What You Will Review`; this was normalized to the required `What You Will Learn` heading.
4. Unit 04 Lessons 02-06 P06 pages had Part A/B/C directions but were missing the explicit `Instructions` heading.

Corrections applied:

- Added or normalized `assessmentType: Lesson Quiz` in Units 01-03 Lessons 01-07 quiz metadata.
- Removed the non-standard Unit 02 Lesson 08 `primaryStandard` string while preserving the correct standards array.
- Normalized the Unit 01 Lesson 08 P01 heading.
- Added the required `Instructions` heading to Unit 04 Lessons 02-06 P06 pages.

These were structure, LMS metadata, and compliance corrections only. No instructional meaning, worked examples, assessment question meaning, or feedback meaning was changed.

## Cross-Course Contamination Check

| Check | Result |
|---|---|
| No English I standard codes found in production lesson or assessment files | PASS |
| No `ENG1` assessment naming found in production lesson or assessment files | PASS |
| No Lesson 09 or later content found | PASS |
| No remaining `Upload` wording found in production lesson or assessment files | PASS |
| Unit Pretests exist only at the unit level | PASS |
| Unit Assessments exist only in Lesson 08 folders | PASS |

## Accreditation and Compliance Decision

English II meets the required production architecture, approved mapping expectations, unit and lesson structure, mastery-based instructional model, student-facing self-paced teaching requirements, Moodle-ready assessment formatting, embedded-context accessibility requirement, standards coverage, Lesson 8 synthesis rule, Unit Pretest placement, Unit Assessment placement, and Teacher of Record support expectations.

The course is structurally complete and ready for student use from a production compliance and accreditation-readiness standpoint.

## Final Audit Decision

PASS

English II Full Course Production Audit:

PASS - APPROVED FOR STUDENT USE AND ACCREDITATION REVIEW
