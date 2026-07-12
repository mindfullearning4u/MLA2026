# Statistics Moodle Update Change List

**Course:** Statistics  
**Generated:** 2026-07-12  
**Purpose:** Exact repo-side changes that must be reflected or checked in Moodle before final Moodle-side enrollment QA.

## Moodle Update Required

Statistics requires Moodle page updates only if these course information pages are already present in Moodle.

No Moodle XML assessment files were changed during this checkpoint.

## Course Page Updates

Update these Moodle course-facing pages from the repo:

| File | Moodle action |
|---|---|
| `Course-Acknowledgement.md` | Update the Moodle page if this acknowledgement text is displayed in Moodle. Encoding artifacts were removed. |
| `Expectations-and-Policies.md` | Update the Moodle page if this policy text is displayed in Moodle. Encoding artifacts were removed. |
| `How-This-Course-Works.md` | Update the Moodle page if this workflow text is displayed in Moodle. Encoding artifacts were removed. |

## Assessment XML Updates

No XML reimport is required from this checkpoint.

Current repo validation confirmed:

- 102 Moodle XML files parse cleanly.
- 1,590 XML questions were checked.
- 0 questions are missing MLA standard labels.
- 0 questions use vague support-only/no-primary standard labels.
- 53 prior visual-gate failure IDs were rechecked and now have embedded representations.

## Repo Metadata Updates

These metadata updates are repo-side, but Moodle should be checked if activity descriptions, pretest descriptions, or question-bank metadata display them.

| File | Change |
|---|---|
| `Units/Unit 02/Pretest/quiz.json` | Added Unit 02 standards: `MLA.STAT.DVD.4`, `MLA.STAT.DVD.5`, `MLA.STAT.DVD.6`. |
| `Units/Unit 02/Lesson 08/quiz.json` | Added Unit 02 standards to unit assessment metadata. |
| `Units/Unit 06/Lesson 08/quiz.json` | Added Unit 06 standards to unit assessment metadata. |
| `Units/Unit 06/pretest.json` | Added missing Unit 06 pretest metadata tied to the pretest XML. |

## Moodle QA Checklist

- Confirm the three course information pages do not display encoding artifacts.
- Confirm all Statistics pretests are present in Moodle.
- Confirm Unit 02 and Unit 06 pretest/unit assessment activity metadata, if visible, aligns to the unit standards above.
- Confirm no Moodle question displays a blank, support-only, or no-primary standard line.
- Confirm visual-heavy Statistics questions still display embedded tables, diagrams, or images after Moodle rendering.

