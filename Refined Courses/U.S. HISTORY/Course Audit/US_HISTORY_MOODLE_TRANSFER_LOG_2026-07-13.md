# U.S. History Moodle Transfer Log

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

- `USH_U01_Pretest_MoodleXML.xml`
- `USH_U02_Pretest_MoodleXML.xml`
- `USH_U03_Pretest_MoodleXML.xml`
- `USH_U04_Pretest_MoodleXML.xml`
- `USH_U05_Pretest_MoodleXML.xml`
- `USH_U06_Pretest_MoodleXML.xml`

## Repository-Only Source Trace Updates

The repository now includes explicit source/support trace coverage for:

- CPALMS United States History #2100310
- Florida B.E.S.T. ELA expectations
- ELD support
- MTR data-reasoning support
- Common Core literacy in history/social studies
- SAT readiness
- ACT readiness

Updated source-trace files:

- `PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md`
- `PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md`
- `PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md`

## Verification Checklist

After Moodle update, verify:

- The six affected pretest XML banks import without errors.
- Each pretest contains 10 questions.
- Each question displays its mapped `SS.912.*` or `HE.912.C.2.4` standard.
- Each question has four answer choices and exactly one correct answer.
- Correct-answer feedback names the same embedded support/stimulus shown in the question.
- Incorrect-answer feedback is specific and teachable, not generic.
- No lesson HTML pages were changed or overwritten during the update.
- No guided practice, quiz, or unit assessment banks were changed during this update.
