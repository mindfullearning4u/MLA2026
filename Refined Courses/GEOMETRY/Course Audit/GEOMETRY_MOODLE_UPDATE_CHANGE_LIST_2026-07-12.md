# Geometry Moodle Update Change List

**Course:** Geometry  
**Generated:** 2026-07-12  
**Purpose:** Exact repo-side changes that must be reflected in Moodle before final Moodle-side enrollment QA.

## Moodle Update Required

Geometry requires Moodle updates because repo-side lesson pages, Moodle XML assessment files, and assessment standard labels were changed during the final checkpoint audit.

## Lesson Page Updates

Update these Moodle lesson pages from the repo:

| Unit | Lesson | Pages | Reason |
|---|---|---|---|
| Unit 06 | Lesson 01 | `P01.html` - `P07.html` | Added `MLA.GEO.CGM.7` weighted-average and partition-point instruction, examples, guided practice, independent practice, and checkpoint coverage. |

## Assessment XML Updates

Reimport or update these Moodle XML files:

| File | Required Moodle Change |
|---|---|
| `Units/Unit 06/Lesson 01/Moodle XML/GEO_U06_L01_GuidedPractice_MoodleXML.xml` | Includes `MLA.GEO.CGM.7` guided-practice coverage. |
| `Units/Unit 06/Lesson 01/Moodle XML/GEO_U06_L01_Quiz_MoodleXML.xml` | Includes `MLA.GEO.CGM.7` quiz coverage in Q21-Q25. |
| `Units/Unit 06/Pretest/Moodle XML/GEO_U06_Pretest_MoodleXML.xml` | Includes `MLA.GEO.CGM.7` pretest coverage. |
| `Units/Unit 06/Lesson 08/Moodle XML/GEO_U06_L08_GuidedPractice_MoodleXML.xml` | Includes `MLA.GEO.CGM.7` synthesis guided-practice coverage. |
| `Units/Unit 06/Lesson 08/Moodle XML/GEO_U06_UnitAssessment_MoodleXML.xml` | Includes `MLA.GEO.CGM.7` unit-assessment coverage. |

After update, Moodle should show 9 total XML question references to `MLA.GEO.CGM.7`.

## Assessment Standard Label Repairs

The following XML files had Moodle-facing standard labels repaired. Reimport/update them so Moodle no longer displays `Readiness Support Only`, `No new primary MLA standard`, or unlabeled assessment questions.

| File | Standard label applied |
|---|---|
| `Units/Unit 01/Lesson 01/Moodle XML/GEO_U01_L01_GuidedPractice_MoodleXML.xml` | `MLA.GEO.RP.1; MLA.GEO.RP.6` |
| `Units/Unit 01/Lesson 01/Moodle XML/GEO_U01_L01_Quiz_MoodleXML.xml` | `MLA.GEO.RP.1; MLA.GEO.RP.6` |
| `Units/Unit 01/Lesson 02/Moodle XML/GEO_U01_L02_GuidedPractice_MoodleXML.xml` | `MLA.GEO.FND.1; MLA.GEO.FND.2; MLA.GEO.RP.1` |
| `Units/Unit 01/Lesson 02/Moodle XML/GEO_U01_L02_Quiz_MoodleXML.xml` | `MLA.GEO.FND.1; MLA.GEO.FND.2; MLA.GEO.RP.1` |
| `Units/Unit 01/Lesson 03/Moodle XML/GEO_U01_L03_GuidedPractice_MoodleXML.xml` | `MLA.GEO.RP.6` |
| `Units/Unit 01/Lesson 03/Moodle XML/GEO_U01_L03_Quiz_MoodleXML.xml` | `MLA.GEO.RP.6` |
| `Units/Unit 02/Lesson 01/Moodle XML/GEO_U02_L01_GuidedPractice_MoodleXML.xml` | `MLA.GEO.RP.4; MLA.GEO.RP.6` |
| `Units/Unit 02/Lesson 01/Moodle XML/GEO_U02_L01_Quiz_MoodleXML.xml` | `MLA.GEO.RP.4; MLA.GEO.RP.6` |
| `Units/Unit 03/Lesson 01/Moodle XML/GEO_U03_L01_GuidedPractice_MoodleXML.xml` | `MLA.GEO.TRI.2` |
| `Units/Unit 03/Lesson 01/Moodle XML/GEO_U03_L01_Quiz_MoodleXML.xml` | `MLA.GEO.TRI.2` |
| `Units/Unit 03/Lesson 03/Moodle XML/GEO_U03_L03_GuidedPractice_MoodleXML.xml` | `MLA.GEO.TRI.1; MLA.GEO.TRI.3` |
| `Units/Unit 03/Lesson 03/Moodle XML/GEO_U03_L03_Quiz_MoodleXML.xml` | `MLA.GEO.TRI.1; MLA.GEO.TRI.3` |
| `Units/Unit 03/Lesson 05/Moodle XML/GEO_U03_L05_GuidedPractice_MoodleXML.xml` | `MLA.GEO.TRI.1; MLA.GEO.TRI.3; MLA.GEO.RP.5` |
| `Units/Unit 03/Lesson 05/Moodle XML/GEO_U03_L05_Quiz_MoodleXML.xml` | `MLA.GEO.TRI.1; MLA.GEO.TRI.3; MLA.GEO.RP.5` |
| `Units/Unit 03/Lesson 06/Moodle XML/GEO_U03_L06_GuidedPractice_MoodleXML.xml` | `MLA.GEO.TRI.2` |
| `Units/Unit 03/Lesson 06/Moodle XML/GEO_U03_L06_Quiz_MoodleXML.xml` | `MLA.GEO.TRI.2` |
| `Units/Unit 04/Lesson 01/Moodle XML/GEO_U04_L01_GuidedPractice_MoodleXML.xml` | `MLA.GEO.SIM.2; MLA.GEO.SIM.3` |
| `Units/Unit 04/Lesson 01/Moodle XML/GEO_U04_L01_Quiz_MoodleXML.xml` | `MLA.GEO.SIM.2; MLA.GEO.SIM.3` |
| `Units/Unit 04/Lesson 05/Moodle XML/GEO_U04_L05_GuidedPractice_MoodleXML.xml` | `MLA.GEO.TRI.5` |
| `Units/Unit 04/Lesson 05/Moodle XML/GEO_U04_L05_Quiz_MoodleXML.xml` | `MLA.GEO.TRI.5` |
| `Units/Unit 04/Lesson 08/Moodle XML/GEO_U04_UnitAssessment_MoodleXML.xml` | `MLA.GEO.TRI.5` for right-triangle support questions Q25-Q30 |
| `Units/Unit 05/Lesson 07/Moodle XML/GEO_U05_L07_Quiz_MoodleXML.xml` | `MLA.GEO.CIR.4; MLA.GEO.CIR.5; MLA.GEO.CIR.6; MLA.GEO.CIR.7` |

## Metadata And Source Updates

These are repo-side source/metadata updates. Moodle should be checked against them when visible in course pages, activity descriptions, or question-bank metadata.

| File | Change |
|---|---|
| `mla_geometry_standards_crosswalk.xlsx` | `MLA.GEO.CGM.7` placement updated to Unit 06 Lesson 1; corrections log updated. |
| `BEST Standards/Geometry Benchmark Master Tracker.md` | `MA.912.GR.3.1` placement updated to Unit 06 Lesson 1. |
| `mla_geometry_unit_mapping_v2.md` | `MLA.GEO.CGM.7` assigned to Unit 06 Lesson 1 and added to Unit 06 standards coverage. |
| `Units/Unit 06/Lesson 01/lesson.json` | Added `MLA.GEO.CGM.7` as a primary standard. |
| `Units/Unit 06/Lesson 01/quiz.json` | Added `MLA.GEO.CGM.7`; question count corrected to match XML. |
| `Units/Unit 06/Pretest/pretest.json` | Added full Unit 06 standard coverage including `MLA.GEO.CGM.7`. |
| `Units/Unit 06/Lesson 08/quiz.json` | Replaced generic `Synthesis` metadata with full Unit 06 standard list. |
| `Units/Unit 01/Lesson 01-03/lesson.json` and `quiz.json` | Removed non-standard `Readiness Support Only` metadata labels. |

## Moodle QA Checklist

- Confirm Unit 06 Lesson 01 pages display the new weighted-average and partition-point instruction.
- Confirm Unit 06 Lesson 01 quiz contains `MLA.GEO.CGM.7` questions.
- Confirm Unit 06 pretest includes `MLA.GEO.CGM.7`.
- Confirm Unit 06 Lesson 08 guided practice and unit assessment include `MLA.GEO.CGM.7`.
- Confirm all repaired readiness/application assessment questions display concrete MLA standard labels.
- Confirm no Moodle question displays `Readiness Support Only`, `No new primary MLA standard`, or a blank standard line.
- Confirm all imported XML questions display correctly with no blank question text, missing answer choices, or missing feedback.

