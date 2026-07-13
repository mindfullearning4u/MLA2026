# U.S. History Course Production Final Checkpoint

Date: 2026-07-13

## Decision

PASS AFTER CORRECTION

U.S. History passed the final repository-side social science course audit after support-layer trace documentation was tightened and the six unit pretest XML banks were corrected.

## Audit Scope

Course folder: `U.S. HISTORY`

Sources checked:

- `Course Production/PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md`
- `Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md`
- `Course Production/PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md`
- `Course Production/PHASE_3A_UNIT_MAPPING.md`
- `Course Production/PHASE_3B_LESSON_MAPPING.md`
- `Course Production/PHASE_3A_B_VISUAL_SOURCE_MAPPING.md`
- `Course Production/PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md`
- `Course Production/Course-Overview.md`

## Source And Mapping Result

Source-layer decision: PASS AFTER CORRECTION

The controlling source of truth is CPALMS United States History course #2100310:

https://www.cpalms.org/PreviewCourse/Preview/22636

The audit confirmed the standards inventory includes 107 standards/support expectations:

- 92 primary content standards: `SS.912.*` and `HE.912.C.2.4`
- 15 support standards: Florida B.E.S.T. ELA, ELD, and MTR

Coverage result:

- Primary standards missing from full lesson trace: 0
- Primary standards missing from assessment XML: 0
- Support standards missing from alignment file: 0
- Support standards missing from full lesson trace: 0

Corrections made:

- Added `PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md`.
- Added explicit ELD and MTR support-code trace to `PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md`.
- Replaced the MTR range notation in `PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md` with explicit MTR standard codes.

No unit mapping or lesson mapping changes were required after the source trace was repaired.

## Lesson Result

Lesson decision: PASS

No lesson HTML files were changed by this audit.

The strict validation confirmed:

- 48 lessons present
- 336 lesson HTML pages present
- mapped standards appear in lesson files
- required visual/source/stimulus supports are present
- lesson structure supports independent student use without live-teacher dependency

## Assessment Correction

Assessment decision: PASS AFTER CORRECTION

The audit found answer/feedback evidence alignment issues in the six unit pretest XML banks. The pretests were repaired so the correct answer, distractors, and teachable feedback reference the embedded support/stimulus used in each question and stay inside the mapped standard.

Corrected Moodle XML banks:

- `Units/Unit 01/Moodle XML/USH_U01_Pretest_MoodleXML.xml`
- `Units/Unit 02/Moodle XML/USH_U02_Pretest_MoodleXML.xml`
- `Units/Unit 03/Moodle XML/USH_U03_Pretest_MoodleXML.xml`
- `Units/Unit 04/Moodle XML/USH_U04_Pretest_MoodleXML.xml`
- `Units/Unit 05/Moodle XML/USH_U05_Pretest_MoodleXML.xml`
- `Units/Unit 06/Moodle XML/USH_U06_Pretest_MoodleXML.xml`

No guided practice, lesson quiz, or unit assessment XML banks were changed.

## Validation Evidence

Final strict validator result:

- Lessons: 48
- HTML pages: 336
- Moodle XML files: 102
- Moodle XML questions: 1,590
- GIFT files: 0
- Mapped standards: 92
- Lesson standards: 92
- Assessment standards: 92
- Findings: 0
- Decision: PASS

Pretest structure check:

- 6 pretest XML banks
- 10 questions in each pretest
- 10 correct-answer keys in each pretest

## Moodle Transfer Readiness

Repository-side status: PASS AFTER CORRECTION.

Moodle must be updated only for the six U.S. History pretest XML banks listed in the Moodle update change list. No U.S. History lesson pages require Moodle changes from this audit.
