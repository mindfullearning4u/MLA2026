# Speech Communication Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes.** Speech Communication needs Moodle updates because the repo-side final audit changed production lesson pages and Moodle XML assessment banks.

## Required Moodle Updates

### 1. Re-import or update all Speech Communication Moodle XML assessment banks

Scope: all 102 Speech Communication Moodle XML files.

Reason:

- Removed visible `A.`, `B.`, `C.`, `D.` prefixes from answer text.
- Rewrote all answer feedback to be item-specific and teachable, with standard references and selected-answer reasoning.

Important import note:

- Do not manually add `A.`, `B.`, `C.`, `D.` prefixes to answer text in Moodle. Moodle handles answer numbering; manual prefixes create duplicate labels.

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

### 3. Re-transfer eight Lesson 8 P02/P06 synthesis pages

Scope:

- `Units/Unit 01/Lesson 08/P06.html`
- `Units/Unit 02/Lesson 08/P02.html`
- `Units/Unit 02/Lesson 08/P06.html`
- `Units/Unit 03/Lesson 08/P06.html`
- `Units/Unit 04/Lesson 08/P02.html`
- `Units/Unit 04/Lesson 08/P06.html`
- `Units/Unit 05/Lesson 08/P02.html`
- `Units/Unit 05/Lesson 08/P06.html`

Reason:

- Added no-teacher synthesis guidance so these pages meet the final depth threshold.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now include top-level production Moodle XML references.
- Legacy `.gift` production wording was removed from all 48 `lesson.json` files.
- All 48 `quiz.json` files and all six `pretest.json` files now use consistent `assessmentType`, `questionCount`, `questionBankSize`, and `questionsPerAttempt` metadata.
- Unit 6 Lesson 8 `lesson.json` standards now match the 15 standards assessed in the Unit 6 final assessment.
- The crosswalk now explicitly names Florida B.E.S.T./CPALMS.
- Legacy `.gift` files remain only as source/archive artifacts.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 P01 pages are present and show the corrected lesson titles.
- The eight listed Lesson 8 P02/P06 pages include the added synthesis guidance.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Answer feedback is detailed, teachable, and item-specific.
- All questions display MLA Speech Communication standard references.
- No blank pages, missing activities, or missing assessment questions are present.
