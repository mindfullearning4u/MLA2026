# GEO Subagent Audit Fix Report

## Scope

Geometry assessment visual audit, assessment alignment/GIFT audit, and instructional rigor audit after subagent review.

## Sources Used

- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/04-instructional-rigor-and-mastery-standard.md`
- `.codex/standards/05-mathematical-visual-standard.md`
- `.codex/standards/06-assessment-gift-standard.md`
- `.codex/standards/07-assessment-visual-audit-standard.md`
- `.codex/standards/08-answer-pattern-and-feedback-standard.md`
- `.codex/standards/09-lesson-8-synthesis-standard.md`
- `.codex/agent-prompts/assessment-visual-auditor-subagent.md`
- `.codex/agent-prompts/assessment-auditor-subagent.md`
- `.codex/agent-prompts/instructional-rigor-auditor-subagent.md`
- `GEOMETRY/mla_geometry_unit_mapping_v2.md`
- `GEOMETRY/mla_geometry_standards_crosswalk.xlsx`

## Subagent Findings Addressed

| Area | Finding | Fix Applied |
|---|---|---|
| Assessment visuals | 73 Unit 5 questions referenced missing numbered diagrams or construction tasks. | Removed unsupported numbered diagram/task wording and converted stems to self-contained text-only questions where the question was already answerable from text. |
| Assessment alignment | No future-unit, future-lesson, or unmapped content found. | Preserved certified mapping and lesson/unit placement. |
| Lesson quiz counts | All Lesson 01-07 quiz banks had 20 questions; standard requires 25. | Added five lesson-aligned questions to each Lesson 01-07 quiz bank using the approved lesson topic and standard scope. |
| Answer patterns | Several pretests, quizzes, and unit assessments used repeated ABCD sequences. | Reordered answer choices mechanically to avoid ABCD cycling while preserving exactly one correct answer. |
| GIFT notation | `cm?`, caret exponent notation, and correspondence `<->` appeared in some files. | Repaired to UTF-8 plain text notation such as `cm²`, `cm³`, superscripts, and `↔`. |
| Duplicate choices | Unit 6 unit-label questions had duplicate-looking choices because square/cubic units were corrupted. | Repaired square and cubic unit labels so choices are distinct and meaningful. |
| Lesson rigor | P02/P03/P04/P06/P07 were shell-like and not step-by-step. | Rebuilt P02-P07 across all 48 lessons with sequential instruction, worked examples, independent work, checkpoint tasks, and visual/table objects tied to the lesson topic. |
| Lesson visuals | Lessons referenced diagrams/graphs/figures but lacked embedded Moodle-safe visuals. | Added inline SVG or table visual objects to the rebuilt lesson pages. |
| Lesson 8 synthesis | Lesson 8 pages were labeled synthesis but used generic tasks. | Rebuilt Lesson 8 pages with synthesis-oriented instruction, worked examples, independent work, and checkpoint language. |
| Unit 03 Lesson 08 P05 | P05 had the wrong page role heading. | Rebuilt as `P05 Guided Practice`. |

## Validation Performed

Automated validation confirmed:

- All required Geometry lesson JSON files parse successfully.
- P02-P07 pages have exactly one `mla-tor-support-box`.
- P02, P03, P04, P06, and P07 include a Moodle-safe visual/table object.
- Guided Practice banks contain 5 questions.
- Lesson Quiz banks contain 25 questions.
- Unit Pretest banks contain 10 questions.
- Unit Assessment banks contain 40 questions.
- Every checked GIFT block has four labeled choices and exactly one correct answer.
- No duplicate answer-choice text remains in checked GIFT blocks.
- No caret exponent notation remains in GIFT files.
- No answer-choice `cm?` unit corruption remains.
- No numbered diagram references or construction-task references remain.
- No repeated `ABCDABCD` answer pattern remains.

## Remaining Notes

The lesson rebuild is mapping-preserving and standards-scoped, but it is a broad content repair pass. A final human instructional review is still recommended before declaring full course certification.
