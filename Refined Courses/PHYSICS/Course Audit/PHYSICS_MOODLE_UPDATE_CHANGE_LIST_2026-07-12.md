# Physics Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes, if Physics has already been transferred to Moodle.** The repo-side final audit changed production lesson pages, direct resource links, and Moodle XML assessment banks.

If Physics has not yet been transferred, transfer the full corrected course from the current repo source.

## Required Moodle Updates

### 1. Re-import or update all Physics Moodle XML assessment banks

Scope: all 102 Physics Moodle XML files.

Reason:

- Correct-answer positions were resequenced to remove repeated answer patterns.
- Seven optical-image question stems were reworded so they do not imply a missing image stimulus.
- Correct answers, answer text, standards, and feedback remain attached to the same answer choices.

Assessment folders to process:

- All unit pretest XML files in `Units/Unit ##/Moodle XML/`.
- All Guided Practice XML files in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Lesson Quiz XML files for Lessons 1-7 in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Unit Assessment XML files for Lesson 8 in `Units/Unit ##/Lesson 08/Moodle XML/`.

Important import note:

- Do not manually add `A.`, `B.`, `C.`, `D.` prefixes to answer text in Moodle. Moodle handles answer numbering.

### 2. Re-transfer 46 Physics P06 independent-work pages

Scope: P06 pages that received added `Physics Independent Work Self-Check` scaffolds.

Reason:

- Added no-teacher support so independent work requires quantity/model identification, evidence use, units/directions/signs/labels, and reasoning.

### 3. Re-transfer Physics P03 direct-resource pages with corrected PhET links

Scope: all P03 pages containing PhET links that were converted from landing pages to direct HTML activity URLs.

Reason:

- Science-course transfer requires exact direct activity/resource URLs.
- PhET landing URLs of the form `https://phet.colorado.edu/en/simulations/...` were replaced with direct HTML simulation URLs of the form `https://phet.colorado.edu/sims/html/.../latest/..._all.html`.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now use normalized metadata with top-level standards, approved direct resources, and Moodle XML references.
- All 48 `quiz.json` files now use consistent production assessment metadata.
- Six `pretest.json` files were created.
- Physics inventory/crosswalk wording now explicitly documents CPALMS Florida Physics 1 and Florida B.E.S.T. support.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 lessons are present with P01-P07 pages.
- Changed P06 pages show the added independent-work self-check.
- P03 direct resource links open directly to the intended activity/resource.
- Science safety/resource notes are present on P01 pages.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Questions display MLA Physics standard references.
- Assessment feedback is teachable for every answer choice.
- No blank pages, missing activities, or missing assessment questions are present.
