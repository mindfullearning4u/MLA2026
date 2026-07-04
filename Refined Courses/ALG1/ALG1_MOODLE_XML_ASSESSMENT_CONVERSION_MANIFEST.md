# ALG1 Moodle XML Assessment Conversion Manifest

Generated: 2026-07-04 16:23:29 -04:00

Purpose: Convert ALG1 Moodle-ready assessment banks from GIFT to Moodle XML while preserving the original GIFT files and embedding visuals where they support student understanding.

Rules applied:
- Original .gift files were not deleted or modified.
- Moodle XML files are stored in Moodle XML folders beside their source assessment banks.
- Graph and diagram visuals are embedded inside the XML question text using Moodle XML base64 file attachments.
- Answer choices strip visible A., B., C., D. prefixes because Moodle XML supplies answer lettering.
- Table-style answer choices are converted into Moodle HTML tables.
- Math exponents are rendered with HTML superscript where detected.

Summary:
- Source GIFT files converted: 102
- XML files created: 102
- Questions converted: 1590
- Embedded graph/diagram visuals generated: 471

| Source GIFT | Moodle XML | Questions | Embedded visuals |
|---|---|---:|---:|
| `Units/Unit 01/ALG1_U01_Pretest.gift` | `Units/Unit 01/Moodle XML/ALG1_U01_Pretest_MoodleXML.xml` | 10 | 0 |
| `Units/Unit 01/Lesson 01/ALG1_U01_L01_GuidedPractice.gift` | `Units/Unit 01/Lesson 01/Moodle XML/ALG1_U01_L01_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 01/ALG1_U01_L01_Quiz.gift` | `Units/Unit 01/Lesson 01/Moodle XML/ALG1_U01_L01_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 02/ALG1_U01_L02_GuidedPractice.gift` | `Units/Unit 01/Lesson 02/Moodle XML/ALG1_U01_L02_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 01/Lesson 02/ALG1_U01_L02_Quiz.gift` | `Units/Unit 01/Lesson 02/Moodle XML/ALG1_U01_L02_Quiz_MoodleXML.xml` | 25 | 12 |
| `Units/Unit 01/Lesson 03/ALG1_U01_L03_GuidedPractice.gift` | `Units/Unit 01/Lesson 03/Moodle XML/ALG1_U01_L03_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 03/ALG1_U01_L03_Quiz.gift` | `Units/Unit 01/Lesson 03/Moodle XML/ALG1_U01_L03_Quiz_MoodleXML.xml` | 25 | 2 |
| `Units/Unit 01/Lesson 04/ALG1_U01_L04_GuidedPractice.gift` | `Units/Unit 01/Lesson 04/Moodle XML/ALG1_U01_L04_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 04/ALG1_U01_L04_Quiz.gift` | `Units/Unit 01/Lesson 04/Moodle XML/ALG1_U01_L04_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 05/ALG1_U01_L05_GuidedPractice.gift` | `Units/Unit 01/Lesson 05/Moodle XML/ALG1_U01_L05_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 05/ALG1_U01_L05_Quiz.gift` | `Units/Unit 01/Lesson 05/Moodle XML/ALG1_U01_L05_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 06/ALG1_U01_L06_GuidedPractice.gift` | `Units/Unit 01/Lesson 06/Moodle XML/ALG1_U01_L06_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 06/ALG1_U01_L06_Quiz.gift` | `Units/Unit 01/Lesson 06/Moodle XML/ALG1_U01_L06_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 07/ALG1_U01_L07_GuidedPractice.gift` | `Units/Unit 01/Lesson 07/Moodle XML/ALG1_U01_L07_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 07/ALG1_U01_L07_Quiz.gift` | `Units/Unit 01/Lesson 07/Moodle XML/ALG1_U01_L07_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 08/ALG1_U01_L08_GuidedPractice.gift` | `Units/Unit 01/Lesson 08/Moodle XML/ALG1_U01_L08_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 08/ALG1_U01_UnitAssessment.gift` | `Units/Unit 01/Lesson 08/Moodle XML/ALG1_U01_UnitAssessment_MoodleXML.xml` | 40 | 0 |
| `Units/Unit 02/ALG1_U02_Pretest.gift` | `Units/Unit 02/Moodle XML/ALG1_U02_Pretest_MoodleXML.xml` | 10 | 2 |
| `Units/Unit 02/Lesson 01/ALG1_U02_L01_GuidedPractice.gift` | `Units/Unit 02/Lesson 01/Moodle XML/ALG1_U02_L01_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 02/Lesson 01/ALG1_U02_L01_Quiz.gift` | `Units/Unit 02/Lesson 01/Moodle XML/ALG1_U02_L01_Quiz_MoodleXML.xml` | 25 | 1 |
| `Units/Unit 02/Lesson 02/ALG1_U02_L02_GuidedPractice.gift` | `Units/Unit 02/Lesson 02/Moodle XML/ALG1_U02_L02_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 02/Lesson 02/ALG1_U02_L02_Quiz.gift` | `Units/Unit 02/Lesson 02/Moodle XML/ALG1_U02_L02_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 02/Lesson 03/ALG1_U02_L03_GuidedPractice.gift` | `Units/Unit 02/Lesson 03/Moodle XML/ALG1_U02_L03_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 02/Lesson 03/ALG1_U02_L03_Quiz.gift` | `Units/Unit 02/Lesson 03/Moodle XML/ALG1_U02_L03_Quiz_MoodleXML.xml` | 25 | 1 |
| `Units/Unit 02/Lesson 04/ALG1_U02_L04_GuidedPractice.gift` | `Units/Unit 02/Lesson 04/Moodle XML/ALG1_U02_L04_GuidedPractice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 04/ALG1_U02_L04_Quiz.gift` | `Units/Unit 02/Lesson 04/Moodle XML/ALG1_U02_L04_Quiz_MoodleXML.xml` | 25 | 22 |
| `Units/Unit 02/Lesson 05/ALG1_U02_L05_GuidedPractice.gift` | `Units/Unit 02/Lesson 05/Moodle XML/ALG1_U02_L05_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 02/Lesson 05/ALG1_U02_L05_Quiz.gift` | `Units/Unit 02/Lesson 05/Moodle XML/ALG1_U02_L05_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 02/Lesson 06/ALG1_U02_L06_GuidedPractice.gift` | `Units/Unit 02/Lesson 06/Moodle XML/ALG1_U02_L06_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 02/Lesson 06/ALG1_U02_L06_Quiz.gift` | `Units/Unit 02/Lesson 06/Moodle XML/ALG1_U02_L06_Quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 02/Lesson 07/ALG1_U02_L07_GuidedPractice.gift` | `Units/Unit 02/Lesson 07/Moodle XML/ALG1_U02_L07_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 02/Lesson 07/ALG1_U02_L07_Quiz.gift` | `Units/Unit 02/Lesson 07/Moodle XML/ALG1_U02_L07_Quiz_MoodleXML.xml` | 25 | 1 |
| `Units/Unit 02/Lesson 08/ALG1_U02_L08_GuidedPractice.gift` | `Units/Unit 02/Lesson 08/Moodle XML/ALG1_U02_L08_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 02/Lesson 08/ALG1_U02_UnitAssessment.gift` | `Units/Unit 02/Lesson 08/Moodle XML/ALG1_U02_UnitAssessment_MoodleXML.xml` | 40 | 6 |
| `Units/Unit 03/ALG1_U03_Pretest.gift` | `Units/Unit 03/Moodle XML/ALG1_U03_Pretest_MoodleXML.xml` | 10 | 7 |
| `Units/Unit 03/Lesson 01/ALG1_U03_L01_GuidedPractice.gift` | `Units/Unit 03/Lesson 01/Moodle XML/ALG1_U03_L01_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 03/Lesson 01/ALG1_U03_L01_Quiz.gift` | `Units/Unit 03/Lesson 01/Moodle XML/ALG1_U03_L01_Quiz_MoodleXML.xml` | 25 | 14 |
| `Units/Unit 03/Lesson 02/ALG1_U03_L02_GuidedPractice.gift` | `Units/Unit 03/Lesson 02/Moodle XML/ALG1_U03_L02_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 03/Lesson 02/ALG1_U03_L02_Quiz.gift` | `Units/Unit 03/Lesson 02/Moodle XML/ALG1_U03_L02_Quiz_MoodleXML.xml` | 25 | 18 |
| `Units/Unit 03/Lesson 03/ALG1_U03_L03_GuidedPractice.gift` | `Units/Unit 03/Lesson 03/Moodle XML/ALG1_U03_L03_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 03/Lesson 03/ALG1_U03_L03_Quiz.gift` | `Units/Unit 03/Lesson 03/Moodle XML/ALG1_U03_L03_Quiz_MoodleXML.xml` | 25 | 15 |
| `Units/Unit 03/Lesson 04/ALG1_U03_L04_GuidedPractice.gift` | `Units/Unit 03/Lesson 04/Moodle XML/ALG1_U03_L04_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 03/Lesson 04/ALG1_U03_L04_Quiz.gift` | `Units/Unit 03/Lesson 04/Moodle XML/ALG1_U03_L04_Quiz_MoodleXML.xml` | 25 | 19 |
| `Units/Unit 03/Lesson 05/ALG1_U03_L05_GuidedPractice.gift` | `Units/Unit 03/Lesson 05/Moodle XML/ALG1_U03_L05_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 03/Lesson 05/ALG1_U03_L05_Quiz.gift` | `Units/Unit 03/Lesson 05/Moodle XML/ALG1_U03_L05_Quiz_MoodleXML.xml` | 25 | 20 |
| `Units/Unit 03/Lesson 06/ALG1_U03_L06_GuidedPractice.gift` | `Units/Unit 03/Lesson 06/Moodle XML/ALG1_U03_L06_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 03/Lesson 06/ALG1_U03_L06_Quiz.gift` | `Units/Unit 03/Lesson 06/Moodle XML/ALG1_U03_L06_Quiz_MoodleXML.xml` | 25 | 5 |
| `Units/Unit 03/Lesson 07/ALG1_U03_L07_GuidedPractice.gift` | `Units/Unit 03/Lesson 07/Moodle XML/ALG1_U03_L07_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 03/Lesson 07/ALG1_U03_L07_Quiz.gift` | `Units/Unit 03/Lesson 07/Moodle XML/ALG1_U03_L07_Quiz_MoodleXML.xml` | 25 | 19 |
| `Units/Unit 03/Lesson 08/ALG1_U03_L08_GuidedPractice.gift` | `Units/Unit 03/Lesson 08/Moodle XML/ALG1_U03_L08_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 03/Lesson 08/ALG1_U03_UnitAssessment.gift` | `Units/Unit 03/Lesson 08/Moodle XML/ALG1_U03_UnitAssessment_MoodleXML.xml` | 40 | 26 |
| `Units/Unit 04/ALG1_U04_Pretest.gift` | `Units/Unit 04/Moodle XML/ALG1_U04_Pretest_MoodleXML.xml` | 10 | 3 |
| `Units/Unit 04/Lesson 01/ALG1_U04_L01_GuidedPractice.gift` | `Units/Unit 04/Lesson 01/Moodle XML/ALG1_U04_L01_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 04/Lesson 01/ALG1_U04_L01_Quiz.gift` | `Units/Unit 04/Lesson 01/Moodle XML/ALG1_U04_L01_Quiz_MoodleXML.xml` | 25 | 10 |
| `Units/Unit 04/Lesson 02/ALG1_U04_L02_GuidedPractice.gift` | `Units/Unit 04/Lesson 02/Moodle XML/ALG1_U04_L02_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 04/Lesson 02/ALG1_U04_L02_Quiz.gift` | `Units/Unit 04/Lesson 02/Moodle XML/ALG1_U04_L02_Quiz_MoodleXML.xml` | 25 | 2 |
| `Units/Unit 04/Lesson 03/ALG1_U04_L03_GuidedPractice.gift` | `Units/Unit 04/Lesson 03/Moodle XML/ALG1_U04_L03_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 04/Lesson 03/ALG1_U04_L03_Quiz.gift` | `Units/Unit 04/Lesson 03/Moodle XML/ALG1_U04_L03_Quiz_MoodleXML.xml` | 25 | 5 |
| `Units/Unit 04/Lesson 04/ALG1_U04_L04_GuidedPractice.gift` | `Units/Unit 04/Lesson 04/Moodle XML/ALG1_U04_L04_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 04/Lesson 04/ALG1_U04_L04_Quiz.gift` | `Units/Unit 04/Lesson 04/Moodle XML/ALG1_U04_L04_Quiz_MoodleXML.xml` | 25 | 6 |
| `Units/Unit 04/Lesson 05/ALG1_U04_L05_GuidedPractice.gift` | `Units/Unit 04/Lesson 05/Moodle XML/ALG1_U04_L05_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 04/Lesson 05/ALG1_U04_L05_Quiz.gift` | `Units/Unit 04/Lesson 05/Moodle XML/ALG1_U04_L05_Quiz_MoodleXML.xml` | 25 | 6 |
| `Units/Unit 04/Lesson 06/ALG1_U04_L06_GuidedPractice.gift` | `Units/Unit 04/Lesson 06/Moodle XML/ALG1_U04_L06_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 04/Lesson 06/ALG1_U04_L06_Quiz.gift` | `Units/Unit 04/Lesson 06/Moodle XML/ALG1_U04_L06_Quiz_MoodleXML.xml` | 25 | 15 |
| `Units/Unit 04/Lesson 07/ALG1_U04_L07_GuidedPractice.gift` | `Units/Unit 04/Lesson 07/Moodle XML/ALG1_U04_L07_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 04/Lesson 07/ALG1_U04_L07_Quiz.gift` | `Units/Unit 04/Lesson 07/Moodle XML/ALG1_U04_L07_Quiz_MoodleXML.xml` | 25 | 3 |
| `Units/Unit 04/Lesson 08/ALG1_U04_L08_GuidedPractice.gift` | `Units/Unit 04/Lesson 08/Moodle XML/ALG1_U04_L08_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 04/Lesson 08/ALG1_U04_UnitAssessment.gift` | `Units/Unit 04/Lesson 08/Moodle XML/ALG1_U04_UnitAssessment_MoodleXML.xml` | 40 | 8 |
| `Units/Unit 05/ALG1_U05_Pretest.gift` | `Units/Unit 05/Moodle XML/ALG1_U05_Pretest_MoodleXML.xml` | 10 | 3 |
| `Units/Unit 05/Lesson 01/ALG1_U05_L01_GuidedPractice.gift` | `Units/Unit 05/Lesson 01/Moodle XML/ALG1_U05_L01_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 05/Lesson 01/ALG1_U05_L01_Quiz.gift` | `Units/Unit 05/Lesson 01/Moodle XML/ALG1_U05_L01_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 05/Lesson 02/ALG1_U05_L02_GuidedPractice.gift` | `Units/Unit 05/Lesson 02/Moodle XML/ALG1_U05_L02_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 05/Lesson 02/ALG1_U05_L02_Quiz.gift` | `Units/Unit 05/Lesson 02/Moodle XML/ALG1_U05_L02_Quiz_MoodleXML.xml` | 25 | 2 |
| `Units/Unit 05/Lesson 03/ALG1_U05_L03_GuidedPractice.gift` | `Units/Unit 05/Lesson 03/Moodle XML/ALG1_U05_L03_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 05/Lesson 03/ALG1_U05_L03_Quiz.gift` | `Units/Unit 05/Lesson 03/Moodle XML/ALG1_U05_L03_Quiz_MoodleXML.xml` | 25 | 12 |
| `Units/Unit 05/Lesson 04/ALG1_U05_L04_GuidedPractice.gift` | `Units/Unit 05/Lesson 04/Moodle XML/ALG1_U05_L04_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 05/Lesson 04/ALG1_U05_L04_Quiz.gift` | `Units/Unit 05/Lesson 04/Moodle XML/ALG1_U05_L04_Quiz_MoodleXML.xml` | 25 | 14 |
| `Units/Unit 05/Lesson 05/ALG1_U05_L05_GuidedPractice.gift` | `Units/Unit 05/Lesson 05/Moodle XML/ALG1_U05_L05_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 05/Lesson 05/ALG1_U05_L05_Quiz.gift` | `Units/Unit 05/Lesson 05/Moodle XML/ALG1_U05_L05_Quiz_MoodleXML.xml` | 25 | 6 |
| `Units/Unit 05/Lesson 06/ALG1_U05_L06_GuidedPractice.gift` | `Units/Unit 05/Lesson 06/Moodle XML/ALG1_U05_L06_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 05/Lesson 06/ALG1_U05_L06_Quiz.gift` | `Units/Unit 05/Lesson 06/Moodle XML/ALG1_U05_L06_Quiz_MoodleXML.xml` | 25 | 5 |
| `Units/Unit 05/Lesson 07/ALG1_U05_L07_GuidedPractice.gift` | `Units/Unit 05/Lesson 07/Moodle XML/ALG1_U05_L07_GuidedPractice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 05/Lesson 07/ALG1_U05_L07_Quiz.gift` | `Units/Unit 05/Lesson 07/Moodle XML/ALG1_U05_L07_Quiz_MoodleXML.xml` | 25 | 10 |
| `Units/Unit 05/Lesson 08/ALG1_U05_L08_GuidedPractice.gift` | `Units/Unit 05/Lesson 08/Moodle XML/ALG1_U05_L08_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 05/Lesson 08/ALG1_U05_UnitAssessment.gift` | `Units/Unit 05/Lesson 08/Moodle XML/ALG1_U05_UnitAssessment_MoodleXML.xml` | 40 | 8 |
| `Units/Unit 06/ALG1_U06_Pretest.gift` | `Units/Unit 06/Moodle XML/ALG1_U06_Pretest_MoodleXML.xml` | 10 | 5 |
| `Units/Unit 06/Lesson 01/ALG1_U06_L01_GuidedPractice.gift` | `Units/Unit 06/Lesson 01/Moodle XML/ALG1_U06_L01_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 06/Lesson 01/ALG1_U06_L01_Quiz.gift` | `Units/Unit 06/Lesson 01/Moodle XML/ALG1_U06_L01_Quiz_MoodleXML.xml` | 25 | 12 |
| `Units/Unit 06/Lesson 02/ALG1_U06_L02_GuidedPractice.gift` | `Units/Unit 06/Lesson 02/Moodle XML/ALG1_U06_L02_GuidedPractice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 06/Lesson 02/ALG1_U06_L02_Quiz.gift` | `Units/Unit 06/Lesson 02/Moodle XML/ALG1_U06_L02_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 06/Lesson 03/ALG1_U06_L03_GuidedPractice.gift` | `Units/Unit 06/Lesson 03/Moodle XML/ALG1_U06_L03_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 06/Lesson 03/ALG1_U06_L03_Quiz.gift` | `Units/Unit 06/Lesson 03/Moodle XML/ALG1_U06_L03_Quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 06/Lesson 04/ALG1_U06_L04_GuidedPractice.gift` | `Units/Unit 06/Lesson 04/Moodle XML/ALG1_U06_L04_GuidedPractice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 06/Lesson 04/ALG1_U06_L04_Quiz.gift` | `Units/Unit 06/Lesson 04/Moodle XML/ALG1_U06_L04_Quiz_MoodleXML.xml` | 25 | 15 |
| `Units/Unit 06/Lesson 05/ALG1_U06_L05_GuidedPractice.gift` | `Units/Unit 06/Lesson 05/Moodle XML/ALG1_U06_L05_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 06/Lesson 05/ALG1_U06_L05_Quiz.gift` | `Units/Unit 06/Lesson 05/Moodle XML/ALG1_U06_L05_Quiz_MoodleXML.xml` | 25 | 13 |
| `Units/Unit 06/Lesson 06/ALG1_U06_L06_GuidedPractice.gift` | `Units/Unit 06/Lesson 06/Moodle XML/ALG1_U06_L06_GuidedPractice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 06/Lesson 06/ALG1_U06_L06_Quiz.gift` | `Units/Unit 06/Lesson 06/Moodle XML/ALG1_U06_L06_Quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 06/Lesson 07/ALG1_U06_L07_GuidedPractice.gift` | `Units/Unit 06/Lesson 07/Moodle XML/ALG1_U06_L07_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 06/Lesson 07/ALG1_U06_L07_Quiz.gift` | `Units/Unit 06/Lesson 07/Moodle XML/ALG1_U06_L07_Quiz_MoodleXML.xml` | 25 | 14 |
| `Units/Unit 06/Lesson 08/ALG1_U06_L08_GuidedPractice.gift` | `Units/Unit 06/Lesson 08/Moodle XML/ALG1_U06_L08_GuidedPractice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 06/Lesson 08/ALG1_U06_UnitAssessment.gift` | `Units/Unit 06/Lesson 08/Moodle XML/ALG1_U06_UnitAssessment_MoodleXML.xml` | 40 | 15 |
