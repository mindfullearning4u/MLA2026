# English I Course Production Final Checkpoint

Course: English I  
Course code: ENG1  
Audit date: 2026-07-12  
Audit scope: Repo-side final course-production checkpoint before student enrollment

## Final Determination

PASS AFTER CORRECTION

English I is repo-side course-production ready after the corrections recorded in this checkpoint and in `ENGLISH_I_MOODLE_UPDATE_CHANGE_LIST_2026-07-12.md`.

Because English I has already been transferred to Moodle, Moodle must be updated for the changed P02/P03 lesson pages before the Moodle-side enrollment audit is treated as current.

## Source And Mapping Audit

Source of truth checked:

- `Course Production/PHASE_2A_A_2_ENGLISH_I_MLA_STANDARD_INVENTORY.md`
- `Course Production/PHASE_2A_B_ENGLISH_I_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_B_1_ENGLISH_I_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_ENGLISH_I_LESSON_LEVEL_MAPPING.md`
- `Course Production/Course-Overview.md`

Result: PASS

Findings:

- MLA standards inventory contains 24 unique English I standards.
- Crosswalk contains 24/24 standards.
- Unit-level mapping contains 24/24 standards.
- Lesson-level mapping contains 24/24 standards.
- Missing standards from crosswalk: 0.
- Missing standards from unit mapping: 0.
- Missing standards from lesson mapping: 0.
- Extra unapproved standards in crosswalk/mapping: 0.

Domain distribution:

- Reading: 12
- Writing: 4
- Language: 1
- Vocabulary: 3
- Research: 1
- Communication: 3

Support layers checked:

- Florida ELA/B.E.S.T. benchmark references are present in the crosswalk stack.
- SAT, ACT, and Common Core readiness/support references are present in the crosswalk stack.

## Structure And Lesson Model Audit

Result: PASS AFTER CORRECTION

Validation:

- 6 units present.
- 8 lessons per unit present.
- 48 lesson folders present.
- P01-P07 present for every lesson.
- `lesson.json` present for every lesson.
- `quiz.json` present for every lesson.
- Unit pretest structures present.
- Lesson 8 is synthesis/unit-assessment role.
- Lesson 8 has Guided Practice and Unit Assessment XML.
- No Lesson 8 lesson-quiz XML files were found.

Correction made:

- Updated all P02 page headings from `P02 Notebook Task Part 1` to `P02 Notebook Task - Part 1`.
- Updated all P03 page headings from `P03 Notebook Task Part 2` to `P03 Notebook Task - Part 2`.

Files changed:

- 48 `P02.html` files.
- 48 `P03.html` files.

## Metadata Audit

Result: PASS AFTER CORRECTION

Validation after correction:

- JSON parse errors: 0.
- Missing standards in JSON metadata: 0.
- Broken Moodle XML references in `lesson.json`: 0.
- Legacy GIFT references in production `lesson.json`: 0.
- Assessment count mismatches in `quiz.json`: 0.

Corrections made:

- Updated all 48 `lesson.json` files so production assessment references point to Moodle XML files instead of legacy `.gift` files.
- Added `assessmentFormat: Moodle XML`.
- Marked GIFT as legacy/source only in lesson metadata.
- Corrected all six Lesson 8 `quiz.json` Unit Assessment metadata counts from 25 to 40 to match the actual Unit Assessment XML question counts.

## Lesson Rigor Audit

Result: PASS

Direct validation:

- HTML lesson files checked: 336.
- Core pages checked for depth: P02, P03, P04, and P06.
- Core pages under 250-word rigor threshold: 0.
- Visible placeholder/artifact files: 0.

Instructional determination:

Lessons meet the asynchronous course requirement. The course provides student-facing explanation, evidence expectations, reading/writing tasks, and Teacher of Record support language without relying on live teacher-led instruction to teach the core lesson content.

## Assessment Audit

Result: PASS

Direct Moodle XML validation:

- Moodle XML files checked: 102.
- Total multichoice questions checked: 1,590.
- Guided Practice questions: 240.
- Lesson Quiz questions: 1,050.
- Unit Assessment questions: 240.
- Unit Pretest questions: 60.
- XML parse errors: 0.
- Missing question text: 0.
- Missing MLA standard labels: 0.
- Invalid pseudo-standard labels: 0.
- Bad answer sets: 0.
- Duplicate answer choices: 0.
- Missing answer feedback: 0.
- Missing primary standards from XML coverage: 0.
- Extra unapproved MLA standards in XML coverage: 0.

Assessment XML content was not changed in this audit.

## Moodle Transfer Readiness

Repo-side status: PASS AFTER CORRECTION

Moodle-side status: UPDATE REQUIRED BEFORE FINAL ENROLLMENT AUDIT IS CURRENT

Required Moodle update scope:

- Re-transfer all 48 `P02.html` pages through Moodle `Tools > Source code`.
- Re-transfer all 48 `P03.html` pages through Moodle `Tools > Source code`.

Repo-only corrections that do not require Moodle lesson-page updates:

- `lesson.json` production assessment metadata updates from GIFT to Moodle XML.
- Lesson 8 `quiz.json` Unit Assessment count corrections from 25 to 40.

## Final Validation Snapshot

Final direct validation returned:

- Source standards: 24/24 across inventory, crosswalk, unit mapping, and lesson mapping.
- Structure issues: 0.
- P02/P03 heading issues: 0.
- JSON errors: 0.
- Legacy GIFT production references: 0.
- Broken XML references: 0.
- Metadata count mismatches: 0.
- Core under-depth pages: 0.
- Artifact files: 0.
- XML files/questions: 102 / 1,590.
- XML problems: 0.
- Missing XML standard labels: 0.

Final determination: PASS AFTER CORRECTION.
