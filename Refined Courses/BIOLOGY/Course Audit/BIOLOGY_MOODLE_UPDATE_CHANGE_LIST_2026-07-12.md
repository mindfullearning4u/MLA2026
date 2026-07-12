# Biology Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes, if Biology has already been transferred to Moodle.** The repo-side final audit changed production lesson pages and Moodle XML assessment banks.

If Biology has not yet been transferred, transfer the full corrected course from the current repo source.

## Required Moodle Updates

### 1. Re-import or update all Biology Moodle XML assessment banks

Scope: all 102 Biology Moodle XML files.

Reason:

- Correct-answer positions were resequenced to remove repeated category-wide answer patterns.
- Seven question stems were reworded from image/micrograph wording to self-contained text-stimulus/observation-record wording.
- Correct answers, answer text, standards, and feedback remain attached to the same answer choices.

Assessment folders to process:

- All unit pretest XML files in `Units/Unit ##/Moodle XML/`.
- All Guided Practice XML files in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Lesson Quiz XML files for Lessons 1-7 in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Unit Assessment XML files for Lesson 8 in `Units/Unit ##/Lesson 08/Moodle XML/`.

Important import note:

- Do not manually add `A.`, `B.`, `C.`, `D.` prefixes to answer text in Moodle. Moodle handles answer numbering.

### 2. Re-transfer 43 Biology P06 independent-work pages

Scope: P06 pages that received added independent-work self-check scaffolds.

Reason:

- Added no-teacher science self-check guidance requiring standard connection, evidence, reasoning, and label/unit/vocabulary verification.

Affected pages:

- `Units/Unit 01/Lesson 03/P06.html`
- `Units/Unit 01/Lesson 04/P06.html`
- `Units/Unit 01/Lesson 07/P06.html`
- `Units/Unit 02/Lesson 01/P06.html`
- `Units/Unit 02/Lesson 02/P06.html`
- `Units/Unit 02/Lesson 03/P06.html`
- `Units/Unit 02/Lesson 04/P06.html`
- `Units/Unit 02/Lesson 05/P06.html`
- `Units/Unit 02/Lesson 06/P06.html`
- `Units/Unit 02/Lesson 07/P06.html`
- `Units/Unit 02/Lesson 08/P06.html`
- `Units/Unit 03/Lesson 01/P06.html`
- `Units/Unit 03/Lesson 02/P06.html`
- `Units/Unit 03/Lesson 03/P06.html`
- `Units/Unit 03/Lesson 04/P06.html`
- `Units/Unit 03/Lesson 05/P06.html`
- `Units/Unit 03/Lesson 06/P06.html`
- `Units/Unit 03/Lesson 07/P06.html`
- `Units/Unit 03/Lesson 08/P06.html`
- `Units/Unit 04/Lesson 01/P06.html`
- `Units/Unit 04/Lesson 02/P06.html`
- `Units/Unit 04/Lesson 03/P06.html`
- `Units/Unit 04/Lesson 04/P06.html`
- `Units/Unit 04/Lesson 05/P06.html`
- `Units/Unit 04/Lesson 06/P06.html`
- `Units/Unit 04/Lesson 07/P06.html`
- `Units/Unit 04/Lesson 08/P06.html`
- `Units/Unit 05/Lesson 01/P06.html`
- `Units/Unit 05/Lesson 02/P06.html`
- `Units/Unit 05/Lesson 03/P06.html`
- `Units/Unit 05/Lesson 04/P06.html`
- `Units/Unit 05/Lesson 05/P06.html`
- `Units/Unit 05/Lesson 06/P06.html`
- `Units/Unit 05/Lesson 07/P06.html`
- `Units/Unit 05/Lesson 08/P06.html`
- `Units/Unit 06/Lesson 01/P06.html`
- `Units/Unit 06/Lesson 02/P06.html`
- `Units/Unit 06/Lesson 03/P06.html`
- `Units/Unit 06/Lesson 04/P06.html`
- `Units/Unit 06/Lesson 05/P06.html`
- `Units/Unit 06/Lesson 06/P06.html`
- `Units/Unit 06/Lesson 07/P06.html`
- `Units/Unit 06/Lesson 08/P06.html`

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now include top-level standards, approved direct resources, and Moodle XML references.
- All 48 `quiz.json` files now use consistent production assessment metadata.
- Six `pretest.json` files were created.
- Biology crosswalk wording now explicitly names CPALMS Florida Biology 1 and Florida B.E.S.T. literacy expectations.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 lessons are present with P01-P07 pages.
- The changed P06 pages show the independent-work self-check block.
- Direct resource links on P03 pages open and include student-facing use directions.
- Science safety/resource notes are present on P01 pages.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Questions display MLA Biology standard references.
- Assessment feedback is teachable for every answer choice.
- No blank pages, missing activities, or missing assessment questions are present.
