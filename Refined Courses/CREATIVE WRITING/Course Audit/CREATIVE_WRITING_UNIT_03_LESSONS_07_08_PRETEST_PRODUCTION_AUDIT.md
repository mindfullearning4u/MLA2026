# Creative Writing Unit 3 Lessons 7-8 and Pretest Production Audit

Audit date: 2026-06-21

Scope:
- `Refined Courses/CREATIVE WRITING/Units/Unit 03/Lesson 07`
- `Refined Courses/CREATIVE WRITING/Units/Unit 03/Lesson 08`
- `Refined Courses/CREATIVE WRITING/Units/Unit 03/CW_U03_Pretest.gift`
- `Refined Courses/CREATIVE WRITING/Units/Unit 03/pretest.json`

## Architecture Check

Result: Pass

- Lesson 07 includes `lesson.json`, `quiz.json`, `P01.html` through `P07.html`, `CW_U03_L07_GuidedPractice.gift`, and `CW_U03_L07_Quiz.gift`.
- Lesson 08 includes `lesson.json`, `quiz.json`, `P01.html` through `P07.html`, `CW_U03_L08_GuidedPractice.gift`, and `CW_U03_L08_UnitAssessment.gift`.
- Unit 3 includes `pretest.json` and `CW_U03_Pretest.gift`.
- No required production files in the audit scope are empty.

## Standards Alignment Check

Result: Pass

- Lesson 07 aligns to `MLA.CW.FIC.06` and `MLA.CW.FIC.07`, with support from `MLA.CW.FIC.02`, `MLA.CW.FIC.04`, `MLA.CW.WR.01`, and `MLA.CW.WR.02`.
- Lesson 08 aligns to Unit 3 synthesis standards: `MLA.CW.FIC.02`, `MLA.CW.FIC.04`, `MLA.CW.FIC.06`, `MLA.CW.FIC.07`, `MLA.CW.WR.01`, `MLA.CW.WR.02`, and `MLA.CW.WR.04`, with support from `MLA.CW.NAR.01`, `MLA.CW.WR.08`, and `MLA.CW.WR.10`.
- Assessment controls match the approved mapping: Lesson 07 uses a lesson quiz; Lesson 08 uses a unit assessment only.

## Instructional Page Check

Result: Pass

- P01 pages include lesson overview, standards, learning targets, student work expectations, mastery expectations, student-friendly standard connection, and TOR support language.
- P02 pages include notebook title, vocabulary, detailed step-by-step instruction, notebook task, and remedial/standard/accelerated support.
- P03 pages include continued teaching, notebook task part 2, and common mistake feedback with correct and incorrect examples.
- P04 pages include three worked examples with step-by-step explanation and a common mistake section.
- P05 pages direct students to Moodle-ready guided practice and assessment files.
- P06 pages include independent work instructions with Part A, Part B, and Part C.
- P07 pages include TOR support, submission workflow, checkpoint task, and mastery criteria.

## Moodle and GIFT Readiness Check

Result: Pass

Validated GIFT files:
- `CW_U03_L07_GuidedPractice.gift`: 5 questions, 5 correct answers, 15 distractors, 4 choices per question.
- `CW_U03_L07_Quiz.gift`: 25 questions, 25 correct answers, 75 distractors, 4 choices per question.
- `CW_U03_L08_GuidedPractice.gift`: 5 questions, 5 correct answers, 15 distractors, 4 choices per question.
- `CW_U03_L08_UnitAssessment.gift`: 25 questions, 25 correct answers, 75 distractors, 4 choices per question.
- `CW_U03_Pretest.gift`: 25 questions, 25 correct answers, 75 distractors, 4 choices per question.

Additional GIFT checks:
- No HTML was found in GIFT files.
- Every question includes A-D answer choices only.
- Every question includes its own passage, scenario, source element, or central idea.
- Each choice includes teachable feedback.
- Correct answer positions were normalized to avoid answer patterns.
- No correct-feedback choices remain marked as incorrect in GIFT syntax.

## JSON Validation Check

Result: Pass

- Lesson 07 `lesson.json` and `quiz.json` parse as valid JSON.
- Lesson 08 `lesson.json` and `quiz.json` parse as valid JSON.
- Unit 3 `pretest.json` parses as valid JSON.

## Wording and Conflict Check

Result: Pass

- No `Submit` wording found in the audit scope.
- No merge conflict markers found in the audit scope.

## Out-of-Scope Note

The existing `Refined Courses/CREATIVE WRITING/Units/Unit 03/Unit Overview.md` appears to describe poetry and language content, while the approved lesson-level mapping and built Unit 3 lessons focus on fiction, theme, adaptation, and world building. This audit did not revise the overview because the production request was limited to Lessons 7 and 8 plus the pretest.

## Audit Conclusion

Result: Pass

Creative Writing Unit 3 Lessons 7 and 8, plus the Unit 3 pretest, are production-ready for the checked scope.

Revisions made:
- Built Lesson 07 lesson metadata, pages, guided practice, and lesson quiz.
- Built Lesson 08 lesson metadata, pages, guided practice, and unit assessment.
- Added Unit 3 pretest metadata and GIFT assessment bank.
- Normalized GIFT answer markers and correct-answer positions after writing the assessment banks.

Approval needed:
- None for the Lessons 7-8 and pretest production scope.
- Separate approval/scope is recommended before revising the existing Unit 3 overview file because it appears out of alignment with the approved Unit 3 lesson mapping.
