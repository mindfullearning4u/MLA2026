# English II Course Production Final Checkpoint

Course: English II  
Course code: ENG2  
Audit date: 2026-07-12  
Audit scope: Repo-side final course-production checkpoint before student enrollment

## Final Determination

PASS AFTER CORRECTION

English II is repo-side course-production ready after the metadata, XML, and title corrections recorded in this checkpoint and in `ENGLISH_II_MOODLE_UPDATE_CHANGE_LIST_2026-07-12.md`.

Because English II has already been transferred to Moodle, Moodle must be updated for the corrected Moodle XML files and six corrected P01 lesson pages before the Moodle-side enrollment audit is treated as current.

## Source And Mapping Audit

Source of truth checked:

- `Course Production/PHASE_2A_A_2_ENGLISH_II_MLA_STANDARD_INVENTORY.md`
- `Course Production/PHASE_2A_B_ENGLISH_II_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_B_1_ENGLISH_II_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_ENGLISH_II_LESSON_LEVEL_MAPPING.md`
- `Course Production/Course-Overview.md`

Result: PASS AFTER CORRECTION

Findings:

- MLA standards inventory contains 24 unique English II standards.
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

Result: PASS

Validation:

- 6 units present.
- 8 lessons per unit present.
- 48 lesson folders present.
- P01-P07 present for every lesson.
- `lesson.json` present for every lesson.
- `quiz.json` present for every lesson.
- Unit pretest structures present.
- P02 headings use `P02 Notebook Task - Part 1`.
- P03 headings use `P03 Notebook Task - Part 2`.
- Lesson 8 is synthesis/unit-assessment role.
- Lesson 8 has Guided Practice and Unit Assessment XML.

Corrections made:

- Aligned six `lesson.json` titles and matching P01 visible lesson titles to the certified lesson-level mapping:
  - Unit 01 Lesson 01: `Grade 10 close reading and accurate paraphrase`
  - Unit 01 Lesson 03: `Paraphrase with relevant textual evidence`
  - Unit 01 Lesson 04: `Evidence-based written response`
  - Unit 01 Lesson 05: `Conventions and clarity in short responses`
  - Unit 02 Lesson 02: `Comparative theme development across literary text`
  - Unit 06 Lesson 08: `Putting It All Together: Unit 6 synthesis`

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

Result: PASS AFTER CORRECTION

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
- Visible A/B/C/D answer prefixes: 0.
- Missing primary standards from XML coverage: 0.
- Extra unapproved MLA standards in XML coverage: 0.

Corrections made:

- Removed visible `A.`, `B.`, `C.`, and `D.` prefixes from answer choices in all 102 Moodle XML files. Moodle supplies answer lettering, so visible prefixes inside answer text were not compliant.

## Moodle Transfer Readiness

Repo-side status: PASS AFTER CORRECTION

Moodle-side status: UPDATE REQUIRED BEFORE FINAL ENROLLMENT AUDIT IS CURRENT

Required Moodle update scope:

- Re-import/update all 102 English II Moodle XML assessment banks because answer-choice text was corrected.
- Re-transfer the six corrected P01 pages listed in `ENGLISH_II_MOODLE_UPDATE_CHANGE_LIST_2026-07-12.md`.

Repo-only corrections:

- `lesson.json` production assessment references changed from legacy GIFT to Moodle XML.
- Lesson 8 `quiz.json` Unit Assessment counts corrected from 25 to 40.

## Final Validation Snapshot

Final direct validation returned:

- Source standards: 24/24 across inventory, crosswalk, unit mapping, and lesson mapping.
- Structure issues: 0.
- P02/P03 heading issues: 0.
- Certified title mismatches: 0.
- JSON errors: 0.
- Legacy GIFT production references: 0.
- Broken XML references: 0.
- Metadata count mismatches: 0.
- Core under-depth pages: 0.
- Artifact files: 0.
- XML files/questions: 102 / 1,590.
- XML problems: 0.
- Missing XML standard labels: 0.
- Visible answer-letter prefixes: 0.

Final determination: PASS AFTER CORRECTION.
