# Speech Communication Final Course Audit

## Course

Speech Communication

## Date

2026-07-01

## Scope

This audit reviewed and corrected the current Speech Communication course files for MLA structure, mapping traceability, P01-P07 workflow, LMS HTML readiness, JSON metadata validity, Moodle-ready GIFT assessment readiness, answer-pattern safety, feedback quality, and final Moodle readiness.

## Sources Used

- `Course Production/Course-Overview.md`
- `Course Production/PHASE_2A_A_2_SPEECH_COMMUNICATION_MLA_STANDARD_INVENTORY.md`
- `Course Production/PHASE_2A_B_SPEECH_COMMUNICATION_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_B_1_SPEECH_COMMUNICATION_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_SPEECH_COMMUNICATION_LESSON_LEVEL_MAPPING.md`
- `.codex/standards/*`
- `.codex/workflows/*`
- `.codex/agent-prompts/*`
- ALG1 Unit 1 and Unit 3 lesson-page model references

## Ignored Sources

No `Unit Overview.md` files were used as source of truth. Prior audit reports were treated as historical context only.

## Units and Lessons Reviewed

- Units reviewed: 6 of 6
- Lessons reviewed: 48 of 48
- Required lesson pages reviewed: 336 of 336
- Required lesson JSON files reviewed: 48 of 48
- Required quiz JSON files reviewed: 48 of 48
- Unit pretest JSON files reviewed: 6 of 6
- GIFT files reviewed: 102 of 102
- Assessment questions reviewed: 1,590

## Corrections Made

- Standardized P01 labels to `Standards Covered in This Lesson`.
- Standardized P02 headings to `P02 Notebook Task - Part 1`.
- Standardized P03 headings to `P03 Notebook Task - Part 2`.
- Added explicit `Teachable Explanation` support where required by the MLA page model.
- Standardized P04 examples to `Worked Example 1`, `Worked Example 2`, and `Worked Example 3`.
- Removed duplicate legacy visible TOR-help cards while preserving one standardized `.mla-tor-support-box` per page.
- Repaired corrupted TOR text/mojibake.
- Normalized JSON files to parse cleanly without BOM issues.
- Corrected Unit 3 Lesson 8 metadata to match the approved Unit 3 synthesis mapping.
- Expanded Unit 6 Lesson 8 metadata and P01 standards display to trace the final course synthesis standard set.
- Normalized GIFT marker IDs and `Question ID:` fields.
- Strengthened short/generic assessment feedback.
- Removed HTML/rich-text contamination from GIFT files.

## Lesson 8 Guided Practice Note

The approved lesson mapping states Lesson 8 assessment control is Unit Assessment only. The course also contains Lesson 8 Guided Practice files. These are retained as formative Guided Practice required by the MLA P05/Lesson 8 workflow and are not treated as the summative assessment control. The Unit Assessment remains the controlled Lesson 8 summative assessment.

## Validation Results

| Category | Result | Evidence |
|---|---|---|
| Mapping traceability | PASS | 48 lesson folders match certified lesson mapping; Unit 3 Lesson 8 and Unit 6 Lesson 8 metadata corrected. |
| Course structure | PASS | 6 units, 48 lessons, required files present. |
| Page sequence | PASS | All lessons contain `P01.html` through `P07.html`. |
| P01-P07 workflow | PASS | Required labels, page roles, P04 worked examples, P06 parts, and P07 mastery workflow validated. |
| Lesson 8 synthesis | PASS | All Unit Lesson 8 files function as synthesis and introduce no new primary standard. |
| JSON metadata | PASS | 102 JSON files parse as valid JSON. |
| LMS HTML | PASS | No blank boxes, duplicate TOR boxes, visible backend `.gift` filenames, mojibake, script/iframe markup, or unbalanced div structure found. |
| Assessment counts | PASS | GP 48 x 5, quizzes 42 x 25, pretests 6 x 10, unit assessments 6 x 40. |
| GIFT mechanics | PASS | 102 GIFT files, 1,590 questions, exactly four A-D choices, exactly one correct answer, no HTML. |
| Assessment alignment | PASS | Guided Practice and Lesson Quiz banks align to the attached lesson; pretests and unit assessments align to mapped unit scope. |
| Assessment self-containment | PASS | Speech/source-dependent items include the needed `Speech excerpt`, `Source excerpt`, or scenario directly in the question stem. |
| Feedback quality | PASS | Feedback exists for every answer choice and teaches the misconception or reasoning. |
| Answer pattern | PASS | No ABCD cycles or excessive same-letter runs flagged. |
| Accessibility/student usability | PASS | Assessment items do not require students to search for outside passages/media. |

## Remaining Issues

None requiring correction.

## Suggestions Only

- JSON schema names remain mixed across older files, but all JSON is valid and current course tools can parse the files.
- Optional future cleanup could standardize metadata field names across the course.

## Final Decision

CERTIFIED

Speech Communication is ready for Moodle import and course deployment based on the current MLA standards, approved course mapping, lesson workflow, and assessment-readiness checks.
