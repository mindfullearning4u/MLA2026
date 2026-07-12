# Earth Space Science Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes, if Earth Space Science has already been transferred to Moodle.** The repo-side final audit changed production lesson pages and Moodle XML assessment banks.

If Earth Space Science has not yet been transferred, transfer the full corrected course from the current repo source.

## Required Moodle Updates

### 1. Re-import or update all Earth Space Science Moodle XML assessment banks

Scope: all 102 Earth Space Science Moodle XML files.

Reason:

- Expanded answer feedback to be teachable and standard-specific for every answer choice.
- Resequenced correct-answer positions to remove repeated answer patterns.
- Repaired additional strict-pattern flags in four XML banks.
- Correct answers, answer text, and standards remain attached to the same answer choices.

Assessment folders to process:

- All unit pretest XML files in `Units/Unit ##/Moodle XML/`.
- All Guided Practice XML files in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Lesson Quiz XML files for Lessons 1-7 in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Unit Assessment XML files for Lesson 8 in `Units/Unit ##/Lesson 08/Moodle XML/`.

Important import note:

- Do not manually add `A.`, `B.`, `C.`, `D.` prefixes to answer text in Moodle. Moodle handles answer numbering.

### 2. Re-transfer all 48 P01 lesson overview pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P01.html`.

Reason:

- Added `Science Safety and Resource Note` sections.

### 3. Re-transfer all 48 P03 lesson pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P03.html`.

Reason:

- Renamed/normalized resource sections to `Direct Resource Link`.
- Existing direct resource tasks and student directions were preserved.

### 4. Re-transfer one P06 independent-work page

Scope:

- `Units/Unit 04/Lesson 04/P06.html`

Reason:

- Added independent-work self-check support so the page meets the final no-teacher detail threshold.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now use normalized metadata with top-level standards, approved direct resources, and Moodle XML references.
- All 48 `quiz.json` files now use consistent production assessment metadata.
- Six `pretest.json` files were created.
- Inventory/crosswalk wording now explicitly documents CPALMS Florida Earth/Space Science and Florida B.E.S.T. support.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 lessons are present with P01-P07 pages.
- P01 pages show science safety/resource notes.
- P03 pages show direct resource links and student-facing use directions.
- `Units/Unit 04/Lesson 04/P06.html` shows the added independent-work self-check.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Questions display MLA Earth Space Science standard references.
- Assessment feedback is teachable for every answer choice.
- No blank pages, missing activities, or missing assessment questions are present.
