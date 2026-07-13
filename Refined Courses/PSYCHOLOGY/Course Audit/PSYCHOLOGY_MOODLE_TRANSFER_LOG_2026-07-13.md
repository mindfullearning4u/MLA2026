# Psychology Moodle Transfer Log

Date: 2026-07-13

## Repository Certification Status

PASS AFTER CORRECTION

This log is a repository-side handoff note. It does not confirm Moodle has already been updated.

## Expected Structure

- 6 units
- 48 lessons
- 336 lesson HTML pages
- 48 `lesson.json` files
- 48 `quiz.json` files
- 102 Moodle XML assessment banks
- 1,590 Moodle XML questions

## Required Moodle Update From This Audit

Lesson page updates:

- None

Assessment bank updates:

- `PSY_U01_Pretest.xml`
- `PSY_U02_Pretest.xml`
- `PSY_U03_Pretest.xml`
- `PSY_U04_Pretest.xml`
- `PSY_U05_Pretest.xml`
- `PSY_U06_Pretest.xml`

## Repository-Only Source Trace Updates

The repository now includes explicit official CPALMS source trace coverage:

- `PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md`
- `PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md`

These source-trace updates verify all 100 official `SS.912.P.*` codes in the CPALMS addendum are represented in the MLA/unit/lesson/assessment production trace.

## Verification Checklist

After Moodle update, verify:

- The six affected pretest XML banks import without errors.
- Each pretest contains 10 questions.
- Each question displays its `MLA.PSY.*` standard.
- Each question has four answer choices and exactly one correct answer.
- Correct-answer feedback names the same embedded support shown in the question.
- Incorrect-answer feedback is specific and teachable, not generic.
- No lesson HTML pages were changed or overwritten during the update.
- No guided practice, quiz, or unit assessment banks were changed during this update.
