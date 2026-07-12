# English III Moodle Update Change List

**Created:** 2026-07-12  
**Purpose:** Handoff list for Moodle agent after repo-side final course-production audit.

## Moodle Update Required

**Yes.** English III was already transferred, but the repo-side final audit made production corrections that must be reflected in Moodle before student enrollment.

## Required Moodle Updates

### 1. Re-import or update all English III Moodle XML assessment banks

Scope: all 102 English III Moodle XML files.

Reason:

- Removed visible `A.`, `B.`, `C.`, `D.` prefixes from all answer choices.
- Resequenced correct-answer positions in four quiz banks to remove predictable answer patterns.

Assessment folders to process:

- All unit pretest XML files in `Units/Unit ##/Moodle XML/`.
- All Guided Practice XML files in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Lesson Quiz XML files for Lessons 1-7 in `Units/Unit ##/Lesson ##/Moodle XML/`.
- All Unit Assessment XML files for Lesson 8 in `Units/Unit ##/Lesson 08/Moodle XML/`.

Four XML files with answer-position resequencing:

- `Units/Unit 01/Lesson 05/Moodle XML/ENG3_U01_L05_Quiz_MoodleXML.xml`
- `Units/Unit 01/Lesson 06/Moodle XML/ENG3_U01_L06_Quiz_MoodleXML.xml`
- `Units/Unit 01/Lesson 07/Moodle XML/ENG3_U01_L07_Quiz_MoodleXML.xml`
- `Units/Unit 02/Lesson 01/Moodle XML/ENG3_U02_L01_Quiz_MoodleXML.xml`

### 2. Re-transfer all 48 P01 lesson overview pages

Scope: `Units/Unit 01` through `Units/Unit 06`, Lessons 01-08, `P01.html`.

Reason:

- P01 visible lesson titles were aligned exactly to the lesson-level mapping.
- Use Moodle page editor `Tools > Source code` and replace the current P01 source with the repo P01 source.

## Repo-Only Corrections

These do not require direct Moodle content edits unless the Moodle workflow reads metadata during transfer:

- All 48 `lesson.json` files now reference production Moodle XML files instead of legacy `.gift` files.
- All 48 `lesson.json` files now include production assessment format metadata.
- All six Lesson 8 `quiz.json` files now show 40-question unit assessment counts.
- Legacy `.gift` files remain only as source/archive artifacts.

## Post-Update Moodle Audit

After Moodle updates, verify:

- All 48 P01 pages are present and show the corrected lesson titles.
- All 102 assessment banks import without XML errors.
- Moodle answer choices do not display duplicate `A.`, `B.`, `C.`, `D.` prefixes.
- Unit 01 Lessons 05-07 quizzes and Unit 02 Lesson 01 quiz do not show predictable correct-answer positions.
- All questions still display MLA standard references in the question stem.
- No blank pages, missing activities, or missing assessment questions are present.
