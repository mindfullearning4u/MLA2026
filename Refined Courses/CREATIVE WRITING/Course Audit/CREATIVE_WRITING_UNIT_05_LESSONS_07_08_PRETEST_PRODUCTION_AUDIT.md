# Creative Writing Unit 05 Lessons 07-08 and Pretest Production Audit

## Scope

- Course: Creative Writing only
- Unit: Unit 05, Revision, Workshop, Portfolio, and Publication
- Items audited:
  - Lesson 07: Integrated Publication-Ready Portfolio Preparation
  - Lesson 08: Putting It All Together: Unit 5 Synthesis
  - Unit 05 Pretest

## Required Architecture Check

PASS.

Lesson 07 includes:

- `lesson.json`
- `quiz.json`
- `P01.html` through `P07.html`
- `CW_U05_L07_GuidedPractice.gift`
- `CW_U05_L07_Quiz.gift`

Lesson 08 includes:

- `lesson.json`
- `quiz.json`
- `P01.html` through `P07.html`
- `CW_U05_L08_GuidedPractice.gift`
- `CW_U05_L08_UnitAssessment.gift`

Unit 05 pretest includes:

- `pretest.json`
- `CW_U05_Pretest.gift`

No empty files remain in the scoped lesson folders or pretest files.

## Standards Alignment Check

PASS.

Lesson 07 aligns to:

- Primary: `MLA.CW.PUB.01`, `MLA.CW.REV.01`
- Supports: `MLA.CW.PUB.02`, `MLA.CW.REV.02`, `MLA.CW.COM.01`

Lesson 08 aligns to Unit 5 synthesis standards:

- Primary standards: `MLA.CW.REV.01`, `MLA.CW.REV.02`, `MLA.CW.PUB.01`, `MLA.CW.PUB.02`, `MLA.CW.COM.01`, `MLA.CW.COM.02`
- Supports: `MLA.CW.COM.03`, `MLA.CW.WR.05`, `MLA.CW.WR.08`

The Unit 05 pretest covers the Unit 5 standards and readiness skills.

## Lesson Page Check

PASS.

Each lesson includes:

- P01 lesson overview with standards, learning targets, mastery expectations, student-friendly connection, and TOR support.
- P02 notebook task part 1 with vocabulary and step-by-step instruction.
- P03 notebook task part 2 with additional instruction and common mistake feedback.
- P04 worked example with three modeled examples and common mistake correction.
- P05 guided practice launch page pointing to the correct GIFT file.
- P06 independent work with instructions and Part A, Part B, and Part C.
- P07 checkpoint with TOR support, submission workflow, checkpoint task, and mastery criteria.

## Moodle and GIFT Readiness Check

PASS.

Validated files:

- `CW_U05_L07_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U05_L07_Quiz.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.
- `CW_U05_L08_GuidedPractice.gift`: 5 questions, 5 correct markers, 15 distractors, no HTML, feedback present.
- `CW_U05_L08_UnitAssessment.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.
- `CW_U05_Pretest.gift`: 25 questions, 25 correct markers, 75 distractors, no HTML, feedback present.

Answer positions are mixed and do not follow a simple repeated pattern.

## Technical Validation Check

PASS.

- `lesson.json` parses successfully for both lessons.
- `quiz.json` parses successfully for both lessons.
- `pretest.json` parses successfully.
- No required page files are missing.
- No conflict markers found.
- No `Submit` wording found.
- No non-Creative Writing course files were included in this audit scope.

## Findings and Fixes

Finding 1: Lesson 07 and Lesson 08 files were empty placeholders.

Fix: Completed all required metadata, HTML pages, guided practice, lesson quiz, and unit assessment files.

Finding 2: Unit 05 did not have a pretest file pair.

Fix: Added `pretest.json` and `CW_U05_Pretest.gift` at the Unit 05 root using the established Creative Writing unit structure.

Finding 3: Initial validation found six Lesson 07 quiz items with correct feedback but missing the `=` GIFT correct-answer marker.

Fix: Corrected `CW_U05_L07_Q11`, `CW_U05_L07_Q15`, `CW_U05_L07_Q19`, `CW_U05_L07_Q22`, `CW_U05_L07_Q23`, and `CW_U05_L07_Q24`.

Finding 4: Second validation found four Unit Assessment items with correct feedback but missing the `=` GIFT correct-answer marker.

Fix: Corrected `CW_U05_L08_UA_Q11`, `CW_U05_L08_UA_Q20`, `CW_U05_L08_UA_Q22`, and `CW_U05_L08_UA_Q23`.

## Audit Outcome After Rerun

PASS. Unit 05 Lessons 07 and 08 and the Unit 05 pretest are production-ready within the scoped audit.

## Approval Needed

None for Unit 05 Lessons 07 and 08 or the Unit 05 pretest production files.

## Note for Future Full Unit 05 Audit

The broader Unit 05 overview should be checked during the full Unit 05 audit to ensure it matches the completed Creative Writing MLA standard language and current Unit 5 lesson sequence.
