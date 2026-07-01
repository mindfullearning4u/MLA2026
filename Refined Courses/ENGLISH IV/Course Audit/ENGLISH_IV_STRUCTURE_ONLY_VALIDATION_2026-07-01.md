# English IV Structure-Only Validation Report

## Course

English IV

## Date

2026-07-01

## Mode

Structure-only. No instructional lesson content or assessment item content was rewritten.

## Required Protocol Reading

- Requested `AGENTS.md`: not found at `C:/Users/acrue/MLA2026-1/Refined Courses/AGENTS.md`.
- Read `.codex/standards/`.
- Read `.codex/workflows/`.
- Read `.codex/agent-prompts/`.

## Sources Used

Primary source order followed:

1. `ENGLISH IV/Course Production/PHASE_2A_B_ENGLISH_IV_CROSSWALK_DRAFT.md`
2. `ENGLISH IV/Course Production/PHASE_3A_B_1_ENGLISH_IV_UNIT_LEVEL_MAPPING.md`
3. `ENGLISH IV/Course Production/PHASE_3A_B_2_ENGLISH_IV_LESSON_LEVEL_MAPPING.md`
4. `ENGLISH IV/Course Production/Course-Overview.md`
5. Current lesson, metadata, and assessment files under `ENGLISH IV/Units/`
6. ALG1 Unit 1 and Unit 3 layout/model files as reference

Historical audit reports in `ENGLISH IV/Course Audit/` were treated as context only.

## Mapping Traceability Summary

The approved mapping preserves:

- 6 units
- 8 lessons per unit
- Lessons 1-7 with Lesson Quiz
- Lesson 8 as synthesis
- Lesson 8 with Unit Assessment
- No new primary standard introduced in Lesson 8

| Unit | Approved Unit Title | Lesson Count | Lesson 8 Role | Result |
|---|---|---:|---|---|
| 1 | Foundations of Grade 12 Close Reading, Evidence, and Academic Voice | 8 | Unit 1 synthesis | PASS |
| 2 | Advanced Literary Evaluation, Perspective, Poetry, and Narrative Synthesis | 8 | Unit 2 synthesis | PASS |
| 3 | Advanced Informational Text, Rhetoric, and Argument Evaluation | 8 | Unit 3 synthesis | PASS |
| 4 | Topical Research, Argument, and In-Depth Text Analysis | 8 | Unit 4 synthesis | PASS |
| 5 | Language, Vocabulary, Style, and Revision | 8 | Unit 5 synthesis | PASS |
| 6 | Synthesis, Presentation, Digital Evaluation, and Multimedia Publication | 8 | Unit 6 synthesis | PASS |

## Direct Validation Results

| Check | Evidence | Result |
|---|---|---|
| Unit and lesson inventory | 48 lesson folders checked | PASS |
| Required lesson pages | 336 HTML pages checked, P01-P07 present | PASS |
| Required metadata | `lesson.json` and `quiz.json` present and parseable for 48 lessons | PASS |
| Required assessment files | 102 `.gift` files checked: 6 pretests plus 96 lesson/unit assessment files | PASS |
| Assessment counts | Guided Practice 5, Lesson Quiz 25, Unit Pretest 10, Unit Assessment 40 | PASS |
| GIFT mechanics | exactly one correct answer and three incorrect choices per question | PASS |
| HTML contamination in GIFT | no HTML tags detected in `.gift` files | PASS |
| Caret exponent notation in GIFT | no caret notation detected | PASS |
| Visible backend `.gift` filenames in HTML | none detected | PASS |
| Upload wording in HTML | no `Upload` wording detected | PASS |
| TOR support boxes | 336 HTML pages checked; exactly one `mla-tor-support-box` per page | PASS |
| Page heading trace | P01-P07 page markers found in all 336 HTML pages | PASS |

## Files Changed

- Added this validation report only.

## Files Not Changed Due To Structure-Only Mode

No lesson HTML, metadata JSON, or assessment GIFT files were changed.

## Blockers Requiring Content-Change Approval

The following items require assessment content edits and were not changed in structure-only mode:

1. Weak or generic assessment feedback was detected in 13 assessment files, totaling 528 feedback findings. These include feedback patterns such as generic incorrect-answer review language that should be rewritten into teachable, item-specific feedback.
2. `ENGLISH IV/Units/Unit 06/Lesson 08/ENG4_U06_L08_UnitAssessment.gift` has a predictable answer pattern: `AAAAAAAAAAAAAAABBCBAABCCDABCBBCDABCBDDAB`, with distribution A=20, B=10, C=6, D=4 across 40 questions.

## Structure-Only Decision

PASS for file structure, metadata validity, lesson page presence, required assessment counts, and mechanical GIFT readiness.

NOT CERTIFIED for final course completion until the content-level assessment feedback and answer-pattern blockers are approved for correction and revalidated.
