# U.S. Government Course Production Final Checkpoint

Date: 2026-07-13

## Decision

PASS AFTER CORRECTION

U.S. Government passed the final repository-side social science course audit after source-layer documentation was corrected to show explicit official CPALMS-to-MLA trace coverage.

## Audit Scope

Course folder: `U.S. GOVERNMENT`

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

The controlling source of truth is CPALMS United States Government course #2106310:

https://www.cpalms.org/PreviewCourse/Preview/24582

The course uses 24 local `MLA.USG.*` production standards. The external CPALMS addendum lists 52 official `SS.912.*` source codes. The audit found those official codes were listed in the crosswalk addendum but not explicitly traced in the inventory, full lesson trace, or provenance layer.

Corrections made:

- Added an official CPALMS-to-MLA inventory trace to `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md`.
- Expanded `PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md` from a short summary into a full support-layer alignment file for Florida B.E.S.T., Common Core, SAT, ACT, and ELD/accessibility.
- Added `PHASE_2A_D_OFFICIAL_STANDARDS_PROVENANCE.md`.
- Added an official CPALMS code coverage trace to `PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md`.

Final source coverage check:

- Official CPALMS codes in addendum: 52
- Missing from inventory trace: 0
- Missing from full lesson trace: 0
- Missing from official provenance: 0

No unit mapping or lesson mapping changes were required after the source trace was repaired.

## Lesson Result

Lesson decision: PASS

No lesson HTML files were changed by this audit.

The strict validation confirmed:

- 30 lessons present
- 210 lesson HTML pages present
- mapped standards appear in lesson files
- required visual/source supports are present
- lesson structure supports independent student use without live-teacher dependency

## Assessment Result

Assessment decision: PASS

No Moodle XML assessment banks were changed by this audit.

The strict validation confirmed:

- 66 Moodle XML files present
- 1,050 Moodle XML questions present
- mapped standards appear in assessment XML
- no GIFT files present
- guided practice, lesson quiz, pretest, and unit assessment counts match the 0.5-credit course structure

## Validation Evidence

Final strict validator result:

- Lessons: 30
- HTML pages: 210
- Moodle XML files: 66
- Moodle XML questions: 1,050
- GIFT files: 0
- Mapped standards: 24
- Lesson standards: 24
- Assessment standards: 24
- Findings: 0
- Decision: PASS

Updated crosswalk/lesson/assessment rigor script result:

- U.S. Government mapped lessons: 30
- U.S. Government lesson folders: 30
- U.S. Government HTML pages: 210
- U.S. Government XML files: 66
- U.S. Government XML questions: 1,050
- U.S. Government failures: 0
- U.S. Government warnings: 0

Note: the broader script still exits nonzero because unrelated Environmental Science findings remain in its multi-course report. U.S. Government itself is PASS in that report.

## Moodle Transfer Readiness

Repository-side status: PASS AFTER CORRECTION.

No Moodle lesson pages or assessment banks require update from this audit. The changed files are source/audit documentation only, unless the Moodle transfer agent stores audit documentation inside Moodle.
