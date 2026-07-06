# Biology Science Architecture Re-Audit

**Date:** 2026-07-06  
**Course:** Biology  
**Florida Course Reference:** Biology 1, course number `2000310`  
**Course Folder:** `BIOLOGY/`  
**Audit Scope:** Course production architecture files only  

This audit applies the updated MLA science architecture requirements for official source provenance, lab planning, simulation review, visual planning, assessment stimulus planning, and candidate resource identification.

## Files Reviewed

| File | Status |
|---|---|
| `Course-Overview.md` | Reviewed |
| `PHASE_1B_CURRICULUM_ARCHITECTURE_ANALYSIS.md` | Reviewed |
| `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md` | Reviewed |
| `PHASE_2A_B_CROSSWALK_DRAFT.md` | Reviewed |
| `PHASE_3A_A_MAPPING_FRAMEWORK.md` | Reviewed and updated |
| `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md` | Reviewed and updated |
| `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md` | Reviewed and updated |
| `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` | Created |
| `FINAL_ARCHITECTURE_AUDIT.md` | Reviewed |

## Official Source Verification

| Requirement | Result | Notes |
|---|---|---|
| Florida course source identified | PASS | Biology 1, course number `2000310`, CPALMS course record `23776`. |
| CPALMS / Florida science benchmark source identified | PASS | Existing architecture uses CPALMS Biology 1 / Florida science benchmarks as primary source. |
| Florida B.E.S.T. support source bounded | PASS | Used only for embedded ELA expectations and science communication support where CPALMS embeds them. |
| MTR support source bounded | PASS | Used only for data, graph, quantitative reasoning, and mathematical thinking support. |
| Common Core support bounded | PASS | Used only as science/technical literacy support, not as a replacement for Florida science benchmarks. |
| ACT Science readiness source identified | PASS | Official ACT College and Career Readiness Standards, Science, required as readiness support. |
| SAT evidence/data readiness source identified | PASS | Official College Board Digital SAT Suite framework / SAT evidence and data expectations required as readiness support. |
| MLA numbering present | PASS | MLA Biology domains and numbering remain intact. |

## Initial Findings

| Finding | Severity | Correction |
|---|---|---|
| Unit and lesson maps included lab/data expectations generally, but did not identify exact required labs, simulations, visuals, candidate resource locations, and assessment stimuli lesson by lesson. | High | Created `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` with unit-level and 48-lesson-level requirements. |
| The mapping framework did not explicitly make the lab/visual/simulation matrix a gate for lesson development, assessment development, Moodle XML, and Moodle transfer. | High | Updated `PHASE_3A_A_MAPPING_FRAMEWORK.md` to require the new matrix before production. |
| The unit-level map could be used alone without the new science controls. | Medium | Updated `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md` to require the companion matrix. |
| The lesson-level map could be used alone without the new science controls. | Medium | Updated `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md` to require the companion matrix. |

## Required Science Mapping Corrections Completed

| Requirement | Status |
|---|---|
| Unit-level lab/data expectations captured | PASS |
| Unit-level required visuals/models/data displays captured | PASS |
| Unit-level simulation or virtual lab review requirement captured | PASS |
| Unit-level safety notes captured | PASS |
| Unit-level assessment stimulus needs captured | PASS |
| Lesson-level lab/data/investigation requirements captured for all 48 lessons | PASS |
| Lesson-level required visuals/models/data displays captured for all 48 lessons | PASS |
| Lesson-level candidate resource locations captured for approval | PASS |
| Lesson-level assessment stimulus needs captured | PASS |
| Candidate resources marked as approval-only | PASS |
| External resources blocked from automatic insertion | PASS |

## Production Gate

Biology lesson developers, assessment developers, audit subagents, and Moodle transfer agents must use:

1. `PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md`
2. `PHASE_2A_B_CROSSWALK_DRAFT.md`
3. `PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
4. `PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
5. `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`

No lesson or assessment may be certified if a required lab, investigation, simulation review, visual, graph, table, data display, model, safety note, or assessment stimulus from the mapping is missing.

## Remaining Production Requirements

This audit does not certify the already-existing lesson HTML, JSON, assessment files, Moodle XML, or Moodle transfer status. Those require separate lesson rigor, science lab, science assessment XML, and Moodle transfer audits.

Biology assessments must be converted to Moodle XML under the current MLA assessment rule before Moodle transfer.

## Final Decision

**PASS FOR COURSE PRODUCTION ARCHITECTURE**

Biology architecture is now ready to move into detailed lesson and assessment audit using the updated science requirements. The next phase should audit actual lesson files and assessment files against the course production package and the new lab/visual/simulation matrix.
