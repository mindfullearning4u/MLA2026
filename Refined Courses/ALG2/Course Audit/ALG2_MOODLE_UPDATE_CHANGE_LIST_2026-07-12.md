# Algebra 2 Moodle Update Change List

**Course:** Algebra 2  
**Generated:** 2026-07-12  
**Purpose:** Exact repo-side changes that must be reflected in Moodle before final Moodle-side enrollment QA.

## Moodle Update Required

Algebra 2 requires Moodle updates because Moodle XML assessment files were changed during the final checkpoint audit.

No lesson HTML pages were changed.

## XML Standard Label Repairs

Reimport or update these XML files so Moodle no longer displays support-only/no-primary standard labels and every assessment question references concrete `MLA.A2.*` standards.

| File | Change |
|---|---|
| `Units/Unit 02/Lesson 04/Moodle XML/ALG2_U02_L04_GuidedPractice_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.7; MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 04/Moodle XML/ALG2_U02_L04_Quiz_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.7; MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 05/Moodle XML/ALG2_U02_L05_GuidedPractice_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 05/Moodle XML/ALG2_U02_L05_Quiz_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 06/Moodle XML/ALG2_U02_L06_GuidedPractice_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.3; MLA.A2.PF.4; MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 06/Moodle XML/ALG2_U02_L06_Quiz_MoodleXML.xml` | Replaced support-only labels with `MLA.A2.PF.3; MLA.A2.PF.4; MLA.A2.PF.8`. |
| `Units/Unit 02/Lesson 08/Moodle XML/ALG2_U02_L08_GuidedPractice_MoodleXML.xml` | Replaced Unit 2 synthesis labels with concrete Unit 2 MLA standards. |
| `Units/Unit 02/Lesson 08/Moodle XML/ALG2_U02_UnitAssessment_MoodleXML.xml` | Replaced Unit 2 synthesis label with concrete Unit 2 MLA standards. |
| `Units/Unit 02/Pretest/Moodle XML/ALG2_U02_Pretest_MoodleXML.xml` | Replaced readiness support labels with `MLA.A2.PF.7; MLA.A2.PF.8`. |
| `Units/Unit 03/Lesson 08/Moodle XML/ALG2_U03_L08_GuidedPractice_MoodleXML.xml` | Replaced Unit 3 synthesis labels with concrete Unit 3 MLA standards. |
| `Units/Unit 03/Lesson 08/Moodle XML/ALG2_U03_UnitAssessment_MoodleXML.xml` | Replaced Unit 3 equation-solving synthesis labels with concrete MLA standards. |
| `Units/Unit 03/Pretest/Moodle XML/ALG2_U03_Pretest_MoodleXML.xml` | Replaced readiness support labels with `MLA.A2.RR.1; MLA.A2.RR.3`. |
| `Units/Unit 04/Lesson 08/Moodle XML/ALG2_U04_L08_GuidedPractice_MoodleXML.xml` | Replaced Unit 4 synthesis labels with concrete Unit 4 MLA standards. |
| `Units/Unit 04/Pretest/Moodle XML/ALG2_U04_Pretest_MoodleXML.xml` | Replaced readiness support label with concrete Unit 4 MLA standards. |
| `Units/Unit 06/Lesson 01/Moodle XML/ALG2_U06_L01_GuidedPractice_MoodleXML.xml` | Replaced financial review labels with `MLA.A2.FM.2; MLA.A2.FM.3; MLA.A2.FM.4`. |
| `Units/Unit 06/Lesson 01/Moodle XML/ALG2_U06_L01_Quiz_MoodleXML.xml` | Replaced financial review labels with `MLA.A2.FM.2; MLA.A2.FM.3; MLA.A2.FM.4`. |
| `Units/Unit 06/Lesson 02/Moodle XML/ALG2_U06_L02_GuidedPractice_MoodleXML.xml` | Replaced sequence-readiness labels with `MLA.A2.EX.1; MLA.A2.EX.2; MLA.A2.FN.1`. |
| `Units/Unit 06/Lesson 02/Moodle XML/ALG2_U06_L02_Quiz_MoodleXML.xml` | Replaced sequence-readiness labels with `MLA.A2.EX.1; MLA.A2.EX.2; MLA.A2.FN.1`. |
| `Units/Unit 06/Lesson 06/Moodle XML/ALG2_U06_L06_GuidedPractice_MoodleXML.xml` | Replaced modeling synthesis labels with `MLA.A2.FM.1; MLA.A2.EX.4; MLA.A2.FN.2`. |
| `Units/Unit 06/Lesson 06/Moodle XML/ALG2_U06_L06_Quiz_MoodleXML.xml` | Replaced modeling synthesis labels with `MLA.A2.FM.1; MLA.A2.EX.4; MLA.A2.FN.2`. |
| `Units/Unit 06/Lesson 07/Moodle XML/ALG2_U06_L07_GuidedPractice_MoodleXML.xml` | Replaced real-world application synthesis labels with `MLA.A2.FM.1; MLA.A2.EX.4; MLA.A2.FN.2`. |
| `Units/Unit 06/Lesson 07/Moodle XML/ALG2_U06_L07_Quiz_MoodleXML.xml` | Replaced real-world application synthesis labels with `MLA.A2.FM.1; MLA.A2.EX.4; MLA.A2.FN.2`. |
| `Units/Unit 06/Lesson 08/Moodle XML/ALG2_U06_L08_GuidedPractice_MoodleXML.xml` | Replaced Unit 6 synthesis labels with concrete Unit 6 MLA standards. |
| `Units/Unit 06/Lesson 08/Moodle XML/ALG2_U06_UnitAssessment_MoodleXML.xml` | Replaced Unit 6 synthesis labels with concrete Unit 6 MLA standards. |
| `Units/Unit 06/Pretest/Moodle XML/ALG2_U06_Pretest_MoodleXML.xml` | Replaced Unit 6 readiness labels with concrete Unit 6 MLA standards. |

## XML Visual Repairs

These Moodle questions now include embedded prompt representations and must be updated in Moodle.

| XML file | Question IDs repaired |
|---|---|
| `Units/Unit 01/Lesson 01/Moodle XML/ALG2_U01_L01_Quiz_MoodleXML.xml` | `ALG2_U01_L01_Q10`, `ALG2_U01_L01_Q11` |
| `Units/Unit 03/Lesson 07/Moodle XML/ALG2_U03_L07_Quiz_MoodleXML.xml` | `ALG2_U03_L07_Q10` |
| `Units/Unit 04/Lesson 01/Moodle XML/ALG2_U04_L01_GuidedPractice_MoodleXML.xml` | `ALG2_U04_L01_GP_Q01` |
| `Units/Unit 04/Lesson 01/Moodle XML/ALG2_U04_L01_Quiz_MoodleXML.xml` | `ALG2_U04_L01_Q03`, `ALG2_U04_L01_Q18`, `ALG2_U04_L01_Q20` |
| `Units/Unit 04/Lesson 04/Moodle XML/ALG2_U04_L04_Quiz_MoodleXML.xml` | `ALG2_U04_L04_Q17` |
| `Units/Unit 04/Lesson 08/Moodle XML/ALG2_U04_UnitAssessment_MoodleXML.xml` | `ALG2_U04_UA_Q19` |
| `Units/Unit 05/Lesson 02/Moodle XML/ALG2_U05_L02_Quiz_MoodleXML.xml` | `ALG2_U05_L02_Q15` |
| `Units/Unit 05/Lesson 07/Moodle XML/ALG2_U05_L07_Quiz_MoodleXML.xml` | `ALG2_U05_L07_Q05` |
| `Units/Unit 05/Lesson 08/Moodle XML/ALG2_U05_UnitAssessment_MoodleXML.xml` | `ALG2_U05_UA_Q21`, `ALG2_U05_UA_Q37` |
| `Units/Unit 06/Lesson 03/Moodle XML/ALG2_U06_L03_GuidedPractice_MoodleXML.xml` | `ALG2_U06_L03_GP_Q01` |
| `Units/Unit 06/Lesson 03/Moodle XML/ALG2_U06_L03_Quiz_MoodleXML.xml` | `ALG2_U06_L03_Q13`, `ALG2_U06_L03_Q14` |
| `Units/Unit 06/Lesson 08/Moodle XML/ALG2_U06_L08_GuidedPractice_MoodleXML.xml` | `ALG2_U06_L08_GP_Q01` |
| `Units/Unit 06/Lesson 08/Moodle XML/ALG2_U06_UnitAssessment_MoodleXML.xml` | `ALG2_U06_UA_Q03`, `ALG2_U06_UA_Q15` |
| `Units/Unit 06/Pretest/Moodle XML/ALG2_U06_Pretest_MoodleXML.xml` | `ALG2_U06_Pretest_Q03` |

## Repo Metadata Updates

These metadata changes are repo-side but should be checked if Moodle activity descriptions or question-bank metadata display them.

| File group | Change |
|---|---|
| `Units/Unit 01/Lesson 07/lesson.json` and `quiz.json` | Replaced support-only placeholder metadata with concrete Unit 1 standards. |
| `Units/Unit 01/Lesson 08/lesson.json` | Replaced Unit 1 synthesis placeholder metadata with concrete Unit 1 standards. |
| `Units/Unit 02/Lesson 04-06/quiz.json` | Replaced support-only placeholder metadata with concrete polynomial-function standards. |
| `Units/Unit 06/Lesson 01, 02, 06, 07/lesson.json` and `quiz.json` | Replaced support/review/synthesis placeholder metadata with concrete MLA standards. |
| `Units/Unit 01-06/Pretest/pretest.json` | Added missing pretest metadata files tied to active unit standards and XML counts. |

## Moodle QA Checklist

- Confirm no Moodle question displays `Support-only`, `No new primary MLA standard`, `No primary MLA`, or a blank standard line.
- Confirm every question has a visible `MLA.A2.*` standard reference.
- Confirm the 20 repaired visual-gate questions display embedded tables/representations in the prompt.
- Confirm all changed XML imports preserve answer choices, correct answers, and feedback.
- Confirm all six unit pretests are present in Moodle and aligned to their unit standards.

