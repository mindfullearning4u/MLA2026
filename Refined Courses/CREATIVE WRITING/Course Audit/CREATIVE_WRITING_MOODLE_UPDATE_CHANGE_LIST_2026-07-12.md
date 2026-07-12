# Creative Writing Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes.** Creative Writing needs Moodle updates because the repo-side final audit changed production lesson pages and Moodle XML assessment banks.

## Required Moodle Updates

### 1. Re-import or update all Creative Writing Moodle XML assessment banks

Scope: all 102 Creative Writing Moodle XML files.

Reason:

- Removed visible `A.`, `B.`, `C.`, `D.` prefixes from answer text.
- Normalized malformed/bracketed standard labels in Unit 01 Lesson 07 quiz and Unit 01 pretest XML.
- Rewrote correct-answer feedback to be item-specific and teachable.
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
- Use Moodle page editor `Tools > Source code` and replace the current P01 source with the repo P01 source.

### 3. Re-transfer all 48 P05 guided practice pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P05.html`.

Reason:

- Removed student-facing production wording that referred to `Moodle XML guided practice`.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- `Course Production/Course-Overview.md` unit titles now match the approved unit-level mapping.
- All 48 `lesson.json` files now include top-level production Moodle XML references.
- Legacy `.gift` files remain only as source/archive artifacts.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 P01 pages are present and show the corrected lesson titles.
- All 48 P05 pages no longer mention `Moodle XML guided practice`.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Correct-answer feedback is detailed, teachable, and item-specific.
- Unit Assessment question text does not show stray trailing backslashes.
- All questions display MLA Creative Writing standard references in the required format.
- No blank pages, missing activities, or missing assessment questions are present.
