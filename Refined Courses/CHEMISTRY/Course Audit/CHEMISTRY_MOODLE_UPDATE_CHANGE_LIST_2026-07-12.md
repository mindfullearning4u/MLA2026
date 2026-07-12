# Chemistry Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes, if Chemistry has already been transferred to Moodle.** The repo-side final audit changed production lesson pages and Moodle XML assessment banks.

If Chemistry has not yet been transferred, transfer the full corrected course from the current repo source.

## Required Moodle Updates

### 1. Re-import or update all Chemistry Moodle XML assessment banks

Scope: all 102 Chemistry Moodle XML files.

Reason:

- Expanded answer feedback to be teachable and standard-specific for every answer choice.
- Resequenced correct-answer positions to remove repeated answer patterns.
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

- Added/normalized `Science Safety and Resource Note` language.
- Corrected four PhET links so they open directly to the activity HTML page instead of a launch page.

### 3. Re-transfer all 48 P03 lesson pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P03.html`.

Reason:

- Added `Direct Resource Link` sections using existing metadata resource links and student directions.
- Corrected the four PhET direct-resource blockers in matching P03 pages.

### 4. Re-transfer short-page scaffold corrections

Scope:

- P02 pages that received `Notebook Evidence Self-Check` scaffolds.
- P03/P06 pages that received `Science Work Self-Check` scaffolds.
- P04 pages that received `Worked Example Verification` scaffolds.

Reason:

- Added no-teacher support so the pages meet the final independent-learning depth threshold.

## Direct PhET Link Corrections

The following four lesson resource links were corrected from PhET landing pages to direct HTML activity URLs:

- `Units/Unit 05/Lesson 03/P01.html` and `P03.html`
- `Units/Unit 06/Lesson 03/P01.html` and `P03.html`
- `Units/Unit 06/Lesson 04/P01.html` and `P03.html`
- `Units/Unit 06/Lesson 05/P01.html` and `P03.html`

Correct direct URLs now used:

- `https://phet.colorado.edu/sims/html/reactions-and-rates/latest/reactions-and-rates_all.html`
- `https://phet.colorado.edu/sims/html/reversible-reactions/latest/reversible-reactions_all.html`

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now use valid normalized metadata with top-level standards, approved direct resources, and Moodle XML references.
- All 48 `quiz.json` files now use consistent production assessment metadata.
- Six `pretest.json` files were created.
- Chemistry crosswalk wording now explicitly names CPALMS Florida Chemistry 1 and Florida B.E.S.T. literacy expectations.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 lessons are present with P01-P07 pages.
- P01 pages show science safety/resource notes.
- P03 pages show direct resource links and student-facing use directions.
- The four corrected PhET links open directly to the activity.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Questions display MLA Chemistry standard references.
- Assessment feedback is teachable for every answer choice.
- No blank pages, missing activities, or missing assessment questions are present.
