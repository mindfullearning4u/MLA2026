# English IV Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes.** English IV was already transferred, but the repo-side final audit made production corrections that must be reflected in Moodle before student enrollment.

## Required Moodle Updates

### 1. Re-import or update all English IV Moodle XML assessment banks

Scope: all 102 English IV Moodle XML files.

Reason:

- Removed visible `A.`, `B.`, `C.`, `D.` prefixes from all answer choices.
- XML now relies on Moodle answer numbering rather than hard-coded answer letters.
- Replaced short/prohibited correct-answer feedback with teachable feedback.
- Removed literal trailing backslash artifacts from Unit Assessment question text.

Assessment folders to process:

- All unit pretest XML files in `Units/Unit ##/Moodle XML/`.
- All Guided Practice XML files in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Lesson Quiz XML files for Lessons 1-7 in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Unit Assessment XML files for Lesson 8 in `Units/Unit ##/Lesson 08/Moodle XML/`.

### 2. Re-transfer all 48 P01 lesson overview pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P01.html`.

Reason:

- P01 visible lesson titles were aligned exactly to the lesson-level mapping.
- Lesson 8 synthesis titles were corrected from `Unit # Synthesis` to `Unit # synthesis` to match the approved map.
- Use Moodle page editor `Tools > Source code` and replace the current P01 source with the repo P01 source.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now reference production Moodle XML files instead of legacy `.gift` files or missing assessment references.
- All 48 `lesson.json` files now include production assessment format metadata.
- All six Lesson 8 `quiz.json` files were verified against the 40-question Unit Assessment XML files.
- Legacy `.gift` files remain only as source/archive artifacts.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 P01 pages are present and show the corrected lesson titles.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Correct-answer feedback is detailed and teachable rather than literal `Correct` or short confirmation only.
- Unit Assessment question text does not show stray trailing backslashes.
- All questions still display MLA standard references in the question stem.
- No blank pages, missing activities, or missing assessment questions are present.
