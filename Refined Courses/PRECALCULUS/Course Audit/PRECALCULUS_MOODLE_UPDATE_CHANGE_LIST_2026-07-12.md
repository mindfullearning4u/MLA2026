# Precalculus Moodle Update Change List

**Course:** Precalculus  
**Generated:** 2026-07-12  
**Purpose:** Exact repo-side changes that must be reflected in Moodle before final Moodle-side enrollment QA.

## Moodle Update Required

Precalculus requires Moodle updates because lesson HTML pages and two Unit 03 XML files were changed during the final checkpoint audit.

## Lesson Page Updates

Update these Moodle lesson pages from the repo so pi notation displays correctly.

| Unit | Lesson | Pages |
|---|---|---|
| Unit 02 | Lesson 01 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |
| Unit 02 | Lesson 02 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |
| Unit 02 | Lesson 03 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |
| Unit 02 | Lesson 04 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |
| Unit 05 | Lesson 05 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |
| Unit 05 | Lesson 07 | `P06_Independent_Work.html`, `P07_Checkpoint_Submission.html` |

## Assessment XML Updates

Reimport or update these XML files so Moodle does not display the pseudo-standard `MLA.PC.SYNTHESIS`.

| File | Change |
|---|---|
| `Units/Unit 03/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | Replaced `MLA.PC.SYNTHESIS` with `MLA.PC.TR.12; MLA.PC.TR.13; MLA.PC.TR.14 (Unit 3 synthesis)` on 40 questions. |
| `Units/Unit 03/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | Replaced `MLA.PC.SYNTHESIS` with `MLA.PC.TR.12; MLA.PC.TR.13; MLA.PC.TR.14 (Unit 3 synthesis)` on 10 questions. |

## Repo Metadata Updates

These metadata updates are repo-side, but Moodle should be checked if activity descriptions or question-bank metadata display them.

| File | Change |
|---|---|
| `Units/Unit 06/Lesson 07/lesson.json` | Corrected `MLA.PC.FA.6` metadata wording to remove no-primary/support-only language. |
| `Units/Unit 06/Lesson 07/quiz.json` | Corrected notes to show the quiz is aligned to `MLA.PC.FA.6`. |

## Moodle QA Checklist

- Confirm the 12 updated lesson pages display pi notation correctly.
- Confirm Unit 03 pretest and unit assessment questions display concrete `MLA.PC.TR.12`, `MLA.PC.TR.13`, and/or `MLA.PC.TR.14` labels rather than `MLA.PC.SYNTHESIS`.
- Confirm Unit 06 Lesson 07 metadata, if visible in Moodle, references `MLA.PC.FA.6` without no-primary/support-only wording.
- Confirm no Moodle question displays `MLA.PC.SYNTHESIS`, blank standard labels, or support-only/no-primary labels.
- Confirm answer choices, correct answers, feedback, and embedded visuals still render after XML update.

