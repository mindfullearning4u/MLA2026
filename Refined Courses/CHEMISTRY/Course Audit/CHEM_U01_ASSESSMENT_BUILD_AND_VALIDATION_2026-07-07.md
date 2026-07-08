# Chemistry Unit 1 Assessment Build and Validation

**Course:** Chemistry  
**Unit:** Unit 01 - Scientific Thinking, Measurement, and Matter  
**Date:** 2026-07-07  
**Scope:** Production Moodle XML assessment banks for Unit 1.

## Sources Used

- `Course Production/Course-Overview.md`
- `Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- `.codex/standards/06-assessment-moodle-xml-standard.md`
- `.codex/standards/07-assessment-visual-audit-standard.md`
- `.codex/standards/08-answer-pattern-and-feedback-standard.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`

## Files Created

| Assessment Bank | Required Count | Created Count | Result |
|---|---:|---:|---|
| `Units/Unit 01/Moodle XML/CHEM_U01_Pretest_MoodleXML.xml` | 10 | 10 | PASS |
| `Lesson 01/Moodle XML/CHEM_U01_L01_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 01/Moodle XML/CHEM_U01_L01_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 02/Moodle XML/CHEM_U01_L02_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 02/Moodle XML/CHEM_U01_L02_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 03/Moodle XML/CHEM_U01_L03_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 03/Moodle XML/CHEM_U01_L03_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 04/Moodle XML/CHEM_U01_L04_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 04/Moodle XML/CHEM_U01_L04_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 05/Moodle XML/CHEM_U01_L05_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 05/Moodle XML/CHEM_U01_L05_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 06/Moodle XML/CHEM_U01_L06_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 06/Moodle XML/CHEM_U01_L06_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 07/Moodle XML/CHEM_U01_L07_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 07/Moodle XML/CHEM_U01_L07_Quiz_MoodleXML.xml` | 25 | 25 | PASS |
| `Lesson 08/Moodle XML/CHEM_U01_L08_GuidedPractice_MoodleXML.xml` | 5 | 5 | PASS |
| `Lesson 08/Moodle XML/CHEM_U01_UnitAssessment_MoodleXML.xml` | 40 | 40 | PASS |

**Total production XML files:** 17  
**Total questions:** 265

## Validation Results

Mechanical validation was run against all Unit 1 Moodle XML files.

| Gate | Result |
|---|---|
| XML parses successfully | PASS |
| Moodle XML quiz structure present | PASS |
| Every question has a Question ID | PASS |
| Every question includes MLA standard text | PASS |
| Every question includes embedded stimulus HTML | PASS |
| Every question has exactly four answer choices | PASS |
| Every question has exactly one correct answer | PASS |
| Every answer choice has feedback | PASS |
| No feedback is limited to `Correct.`, `Incorrect.`, or `Try again.` | PASS |
| Answer distributions are balanced enough for each bank size | PASS |
| Unit assessment answer distribution is balanced 10/10/10/10 | PASS |

## Visual, Data, and Stimulus Evidence

Every Unit 1 XML question includes an embedded stimulus table aligned to the lesson matrix:

- evidence/source tables for Lesson 01
- safety/tool/procedure tables for Lesson 02
- measurement/significant-figure tables for Lesson 03
- data and graph interpretation tables for Lesson 04
- particle/state tables for Lesson 05
- physical/chemical property and change tables for Lesson 06
- model/law/theory tables for Lesson 07
- mixed synthesis tables for Lesson 08 and the Unit Assessment

No question refers to a missing graph, table, diagram, passage, or model outside the question.

## Metadata Updates

Each Unit 1 `quiz.json` now identifies production Moodle XML files in `productionAssessmentFiles` and marks legacy GIFT as non-production placeholder material.

## Legacy GIFT Status

The existing `.gift` files remain in place as legacy placeholders. They are not production assessment files and were not certified.

## Remaining Required Gates

This build passes mechanical XML validation and initial mapping/stimulus checks. Unit 1 still requires layered assessment audits before the unit can be certified:

1. Assessment alignment audit.
2. Assessment visual/XML audit.
3. Answer-pattern and feedback audit.
4. Metadata/LMS audit.
5. Unit completion audit after confirmed fixes.

## Decision

**Assessment build status:** BUILT AND MECHANICALLY VALIDATED.  
**Certification status:** NOT CERTIFIED until the required layered Unit 1 audits are completed and any findings are corrected.
