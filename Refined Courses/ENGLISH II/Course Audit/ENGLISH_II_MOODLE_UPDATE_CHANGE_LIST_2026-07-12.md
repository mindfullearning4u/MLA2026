# English II Moodle Update Change List

Course: English II  
Course code: ENG2  
Created: 2026-07-12  
Purpose: Handoff list for Moodle after repo-side final checkpoint corrections

## Moodle Update Status

Moodle update required: YES.

This audit changed Moodle-facing XML answer choices and six Moodle-facing P01 lesson titles. Moodle must be updated before the Moodle-side enrollment audit is considered current.

## Assessment Updates Required In Moodle

Assessment XML update required: YES

Re-import or update all 102 English II Moodle XML assessment banks from the current repository XML files.

Reason:

- Visible `A.`, `B.`, `C.`, and `D.` prefixes were removed from answer choices because Moodle supplies answer lettering.

Current XML validation passed with:

- 102 Moodle XML files.
- 1,590 total multichoice questions.
- 0 XML parse errors.
- 0 missing standard labels.
- 0 answer-set, duplicate-answer, or feedback defects.
- 0 visible answer-letter prefixes.

## Lesson Page Updates Required In Moodle

Lesson page update required: YES

Re-transfer these current repository P01 pages through Moodle `Tools > Source code`:

- `Units/Unit 01/Lesson 01/P01.html`
- `Units/Unit 01/Lesson 03/P01.html`
- `Units/Unit 01/Lesson 04/P01.html`
- `Units/Unit 01/Lesson 05/P01.html`
- `Units/Unit 02/Lesson 02/P01.html`
- `Units/Unit 06/Lesson 08/P01.html`

Reason:

- Visible lesson titles were aligned to the certified lesson-level mapping.

## Repo-Only Corrections

These corrections do not require Moodle content updates unless Moodle displays repository metadata directly:

- Updated all 48 `lesson.json` files so production assessment references point to Moodle XML instead of legacy GIFT.
- Added `assessmentFormat: Moodle XML`.
- Marked GIFT as legacy/source only in lesson metadata.
- Corrected all six Lesson 8 `quiz.json` Unit Assessment counts from 25 to 40.

## Optional Moodle Verification

Because English II was already transferred to Moodle, the Moodle-side agent should still verify:

- Existing lesson pages are not blank.
- Existing question banks remain imported.
- All re-imported XML answer choices no longer show visible `A.`, `B.`, `C.`, or `D.` prefixes inside answer text.
- The six updated P01 pages show the certified lesson titles listed above.
- Unit Assessments still show 40 questions each.
- Lesson quizzes still show 25 questions each.
- Unit pretests still show 10 questions each.
- No missing visuals, missing passages, missing standard labels, or empty feedback fields are visible in Moodle.
