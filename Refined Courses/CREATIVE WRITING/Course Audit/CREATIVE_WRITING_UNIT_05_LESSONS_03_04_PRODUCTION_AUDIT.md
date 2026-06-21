# Creative Writing Unit 05 Lessons 03-04 Production Audit

## Scope

- Course: Creative Writing only
- Unit: Unit 05, Revision, Workshop, Portfolio, and Publication
- Lessons audited:
  - Lesson 03: Workshop Collaboration and Active Listening
  - Lesson 04: Format-Specific Quality Work

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

- Primary: `MLA.CW.COM.02`
- Supports: `MLA.CW.REV.01`, `MLA.CW.COM.03`

Lesson 04 aligns to:

- Primary: `MLA.CW.PUB.02`
- Supports: `MLA.CW.REV.02`, `MLA.CW.WR.05`

The page content, guided practice, and quiz items match the listed standards and lesson mapping.

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

- `CW_U05_L03_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U05_L03_Quiz.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.
- `CW_U05_L04_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U05_L04_Quiz.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.

Answer positions are mixed and do not follow a simple repeated pattern.

## Technical Validation Check

PASS.

- `lesson.json` parses successfully for both lessons.
- `quiz.json` parses successfully for both lessons.
- No required page files are missing.
- No conflict markers found.
- No `Submit` wording found.
- No non-Creative Writing course files were included in this audit scope.

## Findings and Fixes

Finding 1: Lesson 04 P04-P07 were empty.

Fix: Completed Lesson 04 worked example, guided practice page, independent work, and checkpoint page using the established Unit 5 visual shell.

Finding 2: Lesson 03 and Lesson 04 GIFT files were empty.

Fix: Added guided practice and lesson quiz GIFT banks for both lessons with A-D answer choices and detailed teachable feedback.

Finding 3: Initial validation found one Lesson 04 quiz item with feedback marked as correct but missing the `=` GIFT correct-answer marker.

Fix: Corrected `CW_U05_L04_Q20` and reran validation. The rerun passed.

## Audit Outcome After Rerun

PASS. Unit 05 Lessons 03 and 04 are production-ready within the scoped audit.

## Approval Needed

None for Unit 05 Lessons 03 and 04 production files.

## Note for Future Full Unit 05 Audit

The broader Unit 05 overview should be checked during the full Unit 05 audit to ensure it matches the completed Creative Writing standard language and lesson sequence across all eight lessons.
