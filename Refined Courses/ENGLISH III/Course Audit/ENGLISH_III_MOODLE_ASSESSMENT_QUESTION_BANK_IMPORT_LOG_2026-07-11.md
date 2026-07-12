# English III Moodle Assessment Question Bank Import Log

**Course:** English III  
**Moodle course shell:** English 3  
**Moodle course id:** 45  
**Assessment staging root:** `D:\Assessment\ENG3`  
**Transfer date:** 2026-07-11  
**Transfer stage:** Assessment XML import to Moodle question banks

## Source of Truth

The XML files staged in `D:\Assessment\ENG3\Unit 01` through `D:\Assessment\ENG3\Unit 06` were used as the source of truth for Moodle question-bank imports.

Required Moodle XML naming sequence:

- Pretest: `ENG3_U##_Pretest_MoodleXML.xml`
- Guided Practice: `ENG3_U##_L##_GuidedPractice_MoodleXML.xml`
- Lesson Quiz: `ENG3_U##_L##_Quiz_MoodleXML.xml`
- Unit Assessment: `ENG3_U##_L08_UnitAssessment_MoodleXML.xml`

Required Moodle question bank naming sequence:

- `U# PRETEST`
- `U#L# GP`
- `U#L# Q`
- `U#L8 UA`

## Moodle Import Rule Used

Each Moodle question bank was opened before import and checked for its existing question count. If the selected bank already showed the expected count, the bank was not re-imported. Empty banks were imported using Moodle XML format only.

MoodleCloud file picker behavior observed during this transfer:

1. Click `Choose a file...`.
2. Select the matching XML file from `D:\Assessment\ENG3\Unit ##`.
3. Click `Upload this file`.
4. If the file picker dialog appears to hang or the chosen filename is not visible after upload, close the dialog and click `Import`.
5. Click `Continue` if Moodle displays the continuation page.
6. Reopen or verify the question bank and confirm the selected category count matches the required count.

## Expected Counts

- Unit pretest: 10 questions
- Guided Practice: 5 questions
- Lesson Quiz: 25 questions
- Unit Assessment: 40 questions

## Import Verification Summary

| Unit | Banks Imported/Verified | Expected Banks | Verification Result |
|---|---:|---:|---|
| Unit 01 | 17 | 17 | PASS |
| Unit 02 | 17 | 17 | PASS |
| Unit 03 | 17 | 17 | PASS |
| Unit 04 | 17 | 17 | PASS |
| Unit 05 | 17 | 17 | PASS |
| Unit 06 | 17 | 17 | PASS |

Total Moodle question banks imported/verified: **102 of 102**.

## Unit Bank Coverage

Each unit includes:

- `U# PRETEST`
- `U#L1 GP`, `U#L1 Q`
- `U#L2 GP`, `U#L2 Q`
- `U#L3 GP`, `U#L3 Q`
- `U#L4 GP`, `U#L4 Q`
- `U#L5 GP`, `U#L5 Q`
- `U#L6 GP`, `U#L6 Q`
- `U#L7 GP`, `U#L7 Q`
- `U#L8 GP`
- `U#L8 UA`

## Verification Notes

- Unit 01 through Unit 03 banks were verified during import in Moodle by selected-category count after each load.
- Unit 04 through Unit 06 banks were imported and verified on 2026-07-11 using the same selected-category count check.
- The `U#L8 UA` file path was verified against the actual repository/staging filename pattern that includes `L08`.
- No assessment activity placement is certified by this log. This log certifies only the question-bank import stage.

## Status

**PASS - English III Moodle question bank import stage complete.**

Next required Moodle transfer stage: add the imported question-bank questions to the matching Moodle assessment activities, then preview/audit each activity.
