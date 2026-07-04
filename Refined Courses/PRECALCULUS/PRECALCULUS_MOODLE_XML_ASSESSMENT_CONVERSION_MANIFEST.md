# PRECALCULUS Moodle XML Assessment Conversion Manifest

Generated: 2026-07-03 21:31:40 -04:00

Purpose: Convert PRECALCULUS Moodle-ready assessment banks from GIFT to Moodle XML while preserving the original GIFT files and embedding visuals where they support student understanding.

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
- Embedded graph/diagram visuals generated: 1181

| Source GIFT | Moodle XML | Questions | Embedded visuals |
|---|---|---:|---:|
| `Units/Unit 01/Lesson 01/guided_practice.gift` | `Units/Unit 01/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 01/Lesson 01/quiz.gift` | `Units/Unit 01/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 12 |
| `Units/Unit 01/Lesson 02/guided_practice.gift` | `Units/Unit 01/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 02/quiz.gift` | `Units/Unit 01/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 3 |
| `Units/Unit 01/Lesson 03/guided_practice.gift` | `Units/Unit 01/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 01/Lesson 03/quiz.gift` | `Units/Unit 01/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 01/Lesson 04/guided_practice.gift` | `Units/Unit 01/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 04/quiz.gift` | `Units/Unit 01/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 1 |
| `Units/Unit 01/Lesson 05/guided_practice.gift` | `Units/Unit 01/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 01/Lesson 05/quiz.gift` | `Units/Unit 01/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 2 |
| `Units/Unit 01/Lesson 06/guided_practice.gift` | `Units/Unit 01/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 01/Lesson 06/quiz.gift` | `Units/Unit 01/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 1 |
| `Units/Unit 01/Lesson 07/guided_practice.gift` | `Units/Unit 01/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 01/Lesson 07/quiz.gift` | `Units/Unit 01/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 0 |
| `Units/Unit 01/Lesson 08/guided_practice.gift` | `Units/Unit 01/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 01/Unit Assessment/unit_assessment.gift` | `Units/Unit 01/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 6 |
| `Units/Unit 01/Unit Pretest/unit_pretest.gift` | `Units/Unit 01/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 3 |
| `Units/Unit 02/Lesson 01/guided_practice.gift` | `Units/Unit 02/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 01/quiz.gift` | `Units/Unit 02/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 02/guided_practice.gift` | `Units/Unit 02/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 02/quiz.gift` | `Units/Unit 02/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 03/guided_practice.gift` | `Units/Unit 02/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 03/quiz.gift` | `Units/Unit 02/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 04/guided_practice.gift` | `Units/Unit 02/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 04/quiz.gift` | `Units/Unit 02/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 05/guided_practice.gift` | `Units/Unit 02/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 05/quiz.gift` | `Units/Unit 02/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 06/guided_practice.gift` | `Units/Unit 02/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 06/quiz.gift` | `Units/Unit 02/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 07/guided_practice.gift` | `Units/Unit 02/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Lesson 07/quiz.gift` | `Units/Unit 02/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 02/Lesson 08/guided_practice.gift` | `Units/Unit 02/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 02/Unit Assessment/unit_assessment.gift` | `Units/Unit 02/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 40 |
| `Units/Unit 02/Unit Pretest/unit_pretest.gift` | `Units/Unit 02/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 10 |
| `Units/Unit 03/Lesson 01/guided_practice.gift` | `Units/Unit 03/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 01/quiz.gift` | `Units/Unit 03/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 02/guided_practice.gift` | `Units/Unit 03/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 02/quiz.gift` | `Units/Unit 03/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 03/guided_practice.gift` | `Units/Unit 03/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 03/quiz.gift` | `Units/Unit 03/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 04/guided_practice.gift` | `Units/Unit 03/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 04/quiz.gift` | `Units/Unit 03/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 05/guided_practice.gift` | `Units/Unit 03/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 05/quiz.gift` | `Units/Unit 03/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 06/guided_practice.gift` | `Units/Unit 03/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 06/quiz.gift` | `Units/Unit 03/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 07/guided_practice.gift` | `Units/Unit 03/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Lesson 07/quiz.gift` | `Units/Unit 03/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 03/Lesson 08/guided_practice.gift` | `Units/Unit 03/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 03/Unit Assessment/unit_assessment.gift` | `Units/Unit 03/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 40 |
| `Units/Unit 03/Unit Pretest/unit_pretest.gift` | `Units/Unit 03/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 10 |
| `Units/Unit 04/Lesson 01/guided_practice.gift` | `Units/Unit 04/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Lesson 01/quiz.gift` | `Units/Unit 04/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 04/Lesson 02/guided_practice.gift` | `Units/Unit 04/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Lesson 02/quiz.gift` | `Units/Unit 04/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 04/Lesson 03/guided_practice.gift` | `Units/Unit 04/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Lesson 03/quiz.gift` | `Units/Unit 04/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 04/Lesson 04/guided_practice.gift` | `Units/Unit 04/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Lesson 04/quiz.gift` | `Units/Unit 04/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 04/Lesson 05/guided_practice.gift` | `Units/Unit 04/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Lesson 05/quiz.gift` | `Units/Unit 04/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 04/Lesson 06/guided_practice.gift` | `Units/Unit 04/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 04/Lesson 06/quiz.gift` | `Units/Unit 04/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 04/Lesson 07/guided_practice.gift` | `Units/Unit 04/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 04/Lesson 07/quiz.gift` | `Units/Unit 04/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 04/Lesson 08/guided_practice.gift` | `Units/Unit 04/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 04/Unit Assessment/unit_assessment.gift` | `Units/Unit 04/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 30 |
| `Units/Unit 04/Unit Pretest/unit_pretest.gift` | `Units/Unit 04/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 10 |
| `Units/Unit 05/Lesson 01/guided_practice.gift` | `Units/Unit 05/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 01/quiz.gift` | `Units/Unit 05/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 02/guided_practice.gift` | `Units/Unit 05/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 02/quiz.gift` | `Units/Unit 05/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 03/guided_practice.gift` | `Units/Unit 05/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 03/quiz.gift` | `Units/Unit 05/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 04/guided_practice.gift` | `Units/Unit 05/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 04/quiz.gift` | `Units/Unit 05/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 05/guided_practice.gift` | `Units/Unit 05/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 05/quiz.gift` | `Units/Unit 05/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 20 |
| `Units/Unit 05/Lesson 06/guided_practice.gift` | `Units/Unit 05/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 06/quiz.gift` | `Units/Unit 05/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 07/guided_practice.gift` | `Units/Unit 05/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Lesson 07/quiz.gift` | `Units/Unit 05/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 05/Lesson 08/guided_practice.gift` | `Units/Unit 05/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 5 |
| `Units/Unit 05/Unit Assessment/unit_assessment.gift` | `Units/Unit 05/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 40 |
| `Units/Unit 05/Unit Pretest/unit_pretest.gift` | `Units/Unit 05/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 10 |
| `Units/Unit 06/Lesson 01/guided_practice.gift` | `Units/Unit 06/Lesson 01/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 06/Lesson 01/quiz.gift` | `Units/Unit 06/Lesson 01/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 06/Lesson 02/guided_practice.gift` | `Units/Unit 06/Lesson 02/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 06/Lesson 02/quiz.gift` | `Units/Unit 06/Lesson 02/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 06/Lesson 03/guided_practice.gift` | `Units/Unit 06/Lesson 03/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 0 |
| `Units/Unit 06/Lesson 03/quiz.gift` | `Units/Unit 06/Lesson 03/Moodle XML/quiz_MoodleXML.xml` | 25 | 20 |
| `Units/Unit 06/Lesson 04/guided_practice.gift` | `Units/Unit 06/Lesson 04/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 3 |
| `Units/Unit 06/Lesson 04/quiz.gift` | `Units/Unit 06/Lesson 04/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 06/Lesson 05/guided_practice.gift` | `Units/Unit 06/Lesson 05/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 2 |
| `Units/Unit 06/Lesson 05/quiz.gift` | `Units/Unit 06/Lesson 05/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 06/Lesson 06/guided_practice.gift` | `Units/Unit 06/Lesson 06/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 06/Lesson 06/quiz.gift` | `Units/Unit 06/Lesson 06/Moodle XML/quiz_MoodleXML.xml` | 25 | 4 |
| `Units/Unit 06/Lesson 07/guided_practice.gift` | `Units/Unit 06/Lesson 07/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 1 |
| `Units/Unit 06/Lesson 07/quiz.gift` | `Units/Unit 06/Lesson 07/Moodle XML/quiz_MoodleXML.xml` | 25 | 24 |
| `Units/Unit 06/Lesson 08/guided_practice.gift` | `Units/Unit 06/Lesson 08/Moodle XML/guided_practice_MoodleXML.xml` | 5 | 4 |
| `Units/Unit 06/Unit Assessment/unit_assessment.gift` | `Units/Unit 06/Unit Assessment/Moodle XML/unit_assessment_MoodleXML.xml` | 40 | 12 |
| `Units/Unit 06/Unit Pretest/unit_pretest.gift` | `Units/Unit 06/Unit Pretest/Moodle XML/unit_pretest_MoodleXML.xml` | 10 | 4 |
