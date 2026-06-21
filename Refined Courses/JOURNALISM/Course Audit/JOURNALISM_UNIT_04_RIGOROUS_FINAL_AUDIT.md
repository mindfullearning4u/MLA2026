# Journalism Unit 4 Rigorous Final Audit

## Audit Scope

This rigorous final audit covers the full Journalism Unit 4 production package:

- Unit Overview
- Unit Pretest
- Lessons 1-8
- P01-P07 lesson pages
- Guided Practice GIFT files
- Lesson Quiz GIFT files for Lessons 1-7
- Unit Assessment GIFT file for Lesson 8
- `lesson.json`, `quiz.json`, and `pretest.json`
- Prior production batch audit reports

## Approved Unit Identity

- Unit: 04
- Approved Unit Title: Media Literacy, Rhetoric, and Audience
- Approved Structure: 8 lessons
- Lesson 8: Putting It All Together: Unit 4 Synthesis
- Lesson 8 Assessment Type: Unit Assessment only

Status: PASS

## Unit Overview Audit

### Finding and Resolution

Initial audit found that `Unit Overview.md` still contained legacy reporting/interviewing content that conflicted with the approved Unit 4 media literacy structure.

Corrective action completed:

- Replaced legacy reporting/interviewing overview content.
- Aligned the overview to Media Literacy, Rhetoric, and Audience.
- Updated primary standards, supporting standards, lesson breakdown, mastery expectations, and Unit Assessment alignment.
- Re-ran the full unit audit after correction.

Post-correction status: PASS

## Standards and Mapping Verification

| Lesson | Lesson Title | Primary Standard(s) | Support Standard(s) | Status |
|--------|--------------|---------------------|---------------------|--------|
| 1 | Media Text Structures and Features | MLA.JOUR.MED.01 | MLA.JOUR.NEWS.03, MLA.JOUR.MED.03 | PASS |
| 2 | Central Idea Support in Media Texts | MLA.JOUR.MED.02 | MLA.JOUR.REP.02, MLA.JOUR.MED.01 | PASS |
| 3 | Author Purpose, Appeals, and Language | MLA.JOUR.MED.03 | MLA.JOUR.MED.07, MLA.JOUR.NEWS.08 | PASS |
| 4 | Opposing Arguments and Claims | MLA.JOUR.MED.04 | MLA.JOUR.NEWS.02, MLA.JOUR.REP.02 | PASS |
| 5 | Mood and Language Effects | MLA.JOUR.MED.05 | MLA.JOUR.NEWS.08, MLA.JOUR.MED.03 | PASS |
| 6 | Rhetoric in Media Texts | MLA.JOUR.MED.07 | MLA.JOUR.MED.03, MLA.JOUR.MED.04 | PASS |
| 7 | Integrated Media Literacy and Audience Analysis | MLA.JOUR.MED.02, MLA.JOUR.MED.04 | MLA.JOUR.MED.01, MLA.JOUR.MED.03, MLA.JOUR.MED.07 | PASS |
| 8 | Putting It All Together: Unit 4 Synthesis | MLA.JOUR.MED.01, MLA.JOUR.MED.02, MLA.JOUR.MED.03, MLA.JOUR.MED.04, MLA.JOUR.MED.05, MLA.JOUR.MED.07 | MLA.JOUR.NEWS.02, MLA.JOUR.REP.02 | PASS |

Standards alignment status: PASS

## File Structure Audit

Each lesson folder contains:

- `P01.html`
- `P02.html`
- `P03.html`
- `P04.html`
- `P05.html`
- `P06.html`
- `P07.html`
- `lesson.json`
- `quiz.json`
- Guided Practice GIFT file

Lessons 1-7 contain Lesson Quiz GIFT files.

Lesson 8 contains:

- `JOUR_U04_L08_GuidedPractice.gift`
- `JOUR_U04_L08_UnitAssessment.gift`
- No Lesson Quiz assessment key in `lesson.json`

Unit root contains:

- `JOUR_U04_Pretest.gift`
- `pretest.json`
- `Unit Overview.md`

File structure status: PASS

## Page Structure and Visual Audit

All lesson pages were checked for required MLA lesson shell elements.

- P01 includes lesson title, standards covered, learning targets, student work expectations, mastery explanation, student-friendly standard connection, and Teacher of Record help reminder.
- P02 includes notebook title, vocabulary, detailed step-by-step instruction, embedded source, notebook directions, and model example.
- P03 includes continued notebook application, deeper learning, embedded source reminder, common mistake, red incorrect example, green correct example, teachable explanation, and notebook directions.
- P04 includes three worked examples, step-by-step reasoning, modeled thinking, common mistake, red incorrect example, green correct example, and teachable explanation.
- P05 includes Guided Practice instructions, embedded source, and Guided Practice strategy.
- P06 includes Independent Work instructions with Part A, Part B, and Part C.
- P07 includes Teacher of Record reminder, submission workflow, checkpoint task, and mastery criteria.

Visual shell markers verified:

- Arial font family
- `max-width: 980px`
- boxed content sections
- left-border visual treatment
- consistent spacing and colors
- Moodle-ready HTML structure

Page and visual status: PASS

## Assessment Audit

### Unit Pretest

- `JOUR_U04_Pretest.gift`
- Exactly 20 questions
- Four answer choices per question
- One correct answer per question
- Embedded source included in each item
- No HTML in GIFT feedback
- `pretest.json` valid
- `questionsPerAttempt`: 10
- `questionBankSize`: 20

Status: PASS

### Guided Practice

- Lessons 1-8 each contain exactly 5 Guided Practice questions.
- Each item contains four answer choices.
- Each item contains one correct answer.
- Each item displays the MLA standard.
- Each item includes detailed teachable feedback.
- Each item embeds the required source.
- No HTML appears in GIFT feedback.
- No answer pattern clustering was found.

Status: PASS

### Lesson Quizzes

- Lessons 1-7 each contain exactly 25 Lesson Quiz questions.
- Each item contains four answer choices.
- Each item contains one correct answer.
- Each item displays the MLA standard.
- Each item includes detailed teachable feedback.
- Each item embeds the required source.
- No HTML appears in GIFT feedback.
- No answer pattern clustering was found.

Status: PASS

### Unit Assessment

- Lesson 8 contains `JOUR_U04_L08_UnitAssessment.gift`.
- Unit Assessment contains exactly 40 questions.
- Each item contains four answer choices.
- Each item contains one correct answer.
- Each item displays the MLA standard.
- Each item includes detailed teachable feedback.
- Each item embeds the required source.
- No HTML appears in GIFT feedback.
- No answer pattern clustering was found.
- `quiz.json` correctly points to the Unit Assessment file.
- Lesson 8 does not contain a Lesson Quiz assessment key.

Status: PASS

## JSON Validation

All required JSON files were parsed successfully:

- Lesson 1 `lesson.json` and `quiz.json`
- Lesson 2 `lesson.json` and `quiz.json`
- Lesson 3 `lesson.json` and `quiz.json`
- Lesson 4 `lesson.json` and `quiz.json`
- Lesson 5 `lesson.json` and `quiz.json`
- Lesson 6 `lesson.json` and `quiz.json`
- Lesson 7 `lesson.json` and `quiz.json`
- Lesson 8 `lesson.json` and `quiz.json`
- Unit 4 `pretest.json`

JSON status: PASS

## Instructional Quality Audit

Unit 4 was reviewed against MLA self-paced mastery expectations.

Verified:

- Instruction is explicit and sequential.
- Lessons do not assume live teacher instruction.
- Embedded sources are present where students need them.
- Notebook tasks are detailed enough for independent learning.
- Worked examples model reasoning before independent application.
- Common mistakes are corrective and teachable.
- Checkpoints align to lesson standards.
- Lesson sequence progresses from media features to central idea support, author purpose, opposing claims, mood/language effects, rhetoric, integrated analysis, and synthesis.
- Remedial, standard, and accelerated learners have clear access points through explicit explanation, modeling, guided practice, and independent work.

Instructional quality status: PASS

## LMS and Formatting Audit

Verified:

- HTML files use Moodle-ready inline structure.
- GIFT files contain no HTML.
- GIFT questions use A, B, C, D answer choices only.
- GIFT feedback is detailed and teachable.
- No merge markers were found.
- No generation artifacts were found.
- Submit terminology was verified.
- No unfinished-template markers were found.

LMS readiness status: PASS

## Corrective Actions Completed

| Finding | Action Taken | Re-Audit Result |
|---------|--------------|-----------------|
| Unit Overview contained legacy reporting/interviewing content. | Replaced overview with approved Unit 4 media literacy overview. | PASS |

No additional corrective actions were required.

## Final Audit Result

SUMMARY failures=0 warnings=0

## Final Decision

JOURNALISM Unit 4:

PASS -- APPROVED FOR NEXT UNIT PRODUCTION
