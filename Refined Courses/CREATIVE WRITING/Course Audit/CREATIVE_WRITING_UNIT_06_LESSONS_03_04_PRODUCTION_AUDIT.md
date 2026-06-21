# Creative Writing Unit 06 Lessons 03-04 Production Audit

## Scope

- Course: Creative Writing only
- Unit: Unit 06, Author Portfolio, Presentation, and Publication Synthesis
- Lessons audited:
  - Lesson 03: Narrative and Fiction Portfolio Revision
  - Lesson 04: Poetry and Style Portfolio Revision

## Required Architecture Check

PASS. Each lesson includes the required production files:

- `lesson.json`
- `quiz.json`
- `P01.html` through `P07.html`
- Guided practice GIFT bank
- Lesson quiz GIFT bank

No empty files remain in Lesson 03 or Lesson 04.

## Standards Alignment Check

PASS.

Lesson 03 aligns to:

- Primary: `MLA.CW.REV.01`
- Supports: `MLA.CW.NAR.01`, `MLA.CW.NAR.02`, `MLA.CW.FIC.06`

Lesson 04 aligns to:

- Primary: `MLA.CW.REV.01`
- Supports: `MLA.CW.POE.01`, `MLA.CW.POE.03`, `MLA.CW.WR.07`

The page content, guided practice, and quiz items follow the approved Unit 6 lesson mapping.

## Lesson Page Check

PASS.

Each lesson includes:

- P01 lesson overview with standards, learning targets, mastery expectations, student-friendly connection, and TOR support.
- P02 notebook task part 1 with vocabulary and step-by-step instruction.
- P03 notebook task part 2 with additional step-by-step instruction and common mistake feedback.
- P04 worked example with three modeled examples and common mistake correction.
- P05 guided practice launch page pointing to the correct GIFT file.
- P06 independent work with instructions and Part A, Part B, and Part C.
- P07 checkpoint with TOR support, submission workflow, checkpoint task, and mastery criteria.

## Moodle and GIFT Readiness Check

PASS.

Validated files:

- `CW_U06_L03_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U06_L03_Quiz.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.
- `CW_U06_L04_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U06_L04_Quiz.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.

Quiz answer positions were normalized to avoid a simple repeated pattern.

## Technical Validation Check

PASS.

- `lesson.json` parses successfully for both lessons.
- `quiz.json` parses successfully for both lessons.
- No required page files are missing.
- No conflict markers found.
- No `Submit` wording found.
- No non-Creative Writing course files were included in this audit scope.

## Findings and Fixes

Finding 1: Lesson 03 and Lesson 04 files were empty placeholders.

Fix: Completed all required HTML pages, metadata files, guided practice banks, and lesson quiz banks.

Finding 2: Initial validation found quiz items with correct feedback but missing the `=` GIFT correct-answer marker.

Fix: Converted correct-feedback answer lines to Moodle correct-answer markers in the Lesson 03 and Lesson 04 GIFT banks.

Finding 3: Quiz answer distributions needed normalization after marker correction.

Fix: Reordered Lesson 03 and Lesson 04 quiz answer choices while preserving all answer text and feedback.

## Audit Outcome After Rerun

PASS. Unit 06 Lessons 03 and 04 are production-ready within the scoped audit.

## Approval Needed

None for Unit 06 Lessons 03 and 04 production files.
