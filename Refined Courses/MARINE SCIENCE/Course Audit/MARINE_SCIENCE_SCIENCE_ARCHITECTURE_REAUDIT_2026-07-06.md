# Marine Science Science Architecture Re-Audit

Audit date: 2026-07-06  
Course: Marine Science  
Course number: `2002500`

## Purpose

This audit applies the updated MLA science architecture requirements for official source provenance, lab planning, simulation review, visual planning, assessment stimulus planning, safety controls, and direct resource identification.

## Files Reviewed

| File | Status |
|---|---|
| `Course-Overview.md` | Reviewed |
| `PHASE_1B_CURRICULUM_ARCHITECTURE_ANALYSIS.md` | Reviewed |
| `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md` | Reviewed |
| `PHASE_2A_B_CROSSWALK_DRAFT.md` | Reviewed |
| `PHASE_3A_A_MAPPING_FRAMEWORK.md` | Updated |
| `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md` | Updated |
| `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md` | Updated |
| `MARINE_SCIENCE_LAB_AND_VIRTUAL_LAB_MATRIX.md` | Reviewed |
| `MARINE_SCIENCE_TEXT_AND_DATA_SOURCE_MATRIX.md` | Reviewed |
| `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` | Created |
| `FINAL_ARCHITECTURE_AUDIT.md` | Updated |

## Official Source Verification

| Requirement | Result | Notes |
|---|---|---|
| Florida course source identified | PASS | Marine Science, course number `2002500`. |
| CPALMS / Florida science benchmark source identified | PASS | Existing architecture uses CPALMS Marine Science / Florida science benchmarks as primary source. |
| Florida B.E.S.T. support source bounded | PASS | Used only for embedded ELA expectations and science communication support where CPALMS embeds them. |
| Florida MTR support source bounded | PASS | Used only for maps, models, bathymetry, water-quality data, data displays, and quantitative reasoning support. |
| ELD support source bounded | PASS | Used only for science communication and instructional language support. |
| Common Core support bounded | PASS | Used only for science and technical literacy support. |
| ACT Science readiness support identified | PASS | Used for data interpretation, investigation, models, and evidence reasoning. |
| SAT evidence/data support identified | PASS | Used for command of evidence, graphics, quantitative information, and synthesis. |

## Findings and Corrections

| Finding | Severity | Correction |
|---|---|---|
| Marine Science already had lab and data-source matrices, but they did not fully match the newer standardized science gate requiring official source controls, direct resource requirements, and explicit assessment stimuli. | Medium | Created `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` using the existing matrices and the lesson map as source. |
| The mapping framework, unit map, and lesson map could be read without the stricter lab/visual/simulation matrix. | High | Updated those files to require the companion matrix before lesson, assessment, Moodle XML, or Moodle transfer work. |
| Safety constraints needed to be explicit because Marine Science can involve water collection, fieldwork, live organisms, glassware, water-quality testing, pollutants, shoreline visits, boating, diving, and equipment use. | High | Added safety controls that default to virtual labs, simulations, public data, maps, models, images, videos, teacher-provided data, or TOR/school-approved activities. |
| Lesson-level assessment stimulus needs were not locked in a single production gate. | High | Added lesson-by-lesson assessment stimulus requirements for all 48 lessons. |

## Architecture Validation

| Requirement | Status |
|---|---|
| 6 units represented | PASS |
| 48 lessons represented | PASS |
| Unit-level lab/data focus captured | PASS |
| Unit-level visual/model/data-display needs captured | PASS |
| Unit-level simulation/virtual lab review captured | PASS |
| Unit-level safety notes captured | PASS |
| Unit-level assessment stimulus needs captured | PASS |
| Lesson-level lab/data/investigation needs captured | PASS |
| Lesson-level visuals/models/data displays captured | PASS |
| Lesson-level direct resource requirements captured | PASS |
| Lesson-level assessment stimulus needs captured | PASS |
| Direct resource controls documented | PASS |
| Science lab standard referenced | PASS |

## Production Gate

Future Marine Science work must use the following files together:

1. `Course-Overview.md`
2. `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md`
3. `PHASE_2A_B_CROSSWALK_DRAFT.md`
4. `PHASE_3A_A_MAPPING_FRAMEWORK.md`
5. `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
6. `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
7. `MARINE_SCIENCE_LAB_AND_VIRTUAL_LAB_MATRIX.md`
8. `MARINE_SCIENCE_TEXT_AND_DATA_SOURCE_MATRIX.md`
9. `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`

No lesson or assessment may be certified if a required marine lab, field-data task, simulation review, ocean map, graph, bathymetry display, water-quality table, model, food web, population graph, coastal map, safety note, source excerpt, or assessment stimulus from the mapping is missing.

## Remaining Production Requirements

This architecture re-audit does not certify:

- final lesson rigor
- final lesson HTML
- final assessment XML
- Moodle question-bank import
- Moodle course transfer
- external simulation/resource verification

Assessments must use Moodle XML only and must embed every required stimulus directly in the question.

## Final Decision

PASS FOR COURSE PRODUCTION ARCHITECTURE

Marine Science may proceed to lesson and assessment production only if all future agents use the updated science architecture gate.
