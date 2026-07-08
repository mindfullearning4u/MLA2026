# Chemistry Unit 2 Lesson Build and Initial Audit

**Course:** Chemistry  
**Unit:** Unit 02 - Atomic Structure and the Periodic Table  
**Date:** 2026-07-07  
**Scope:** Unit 2 lesson pages and lesson/quiz metadata only. Moodle XML assessment construction is deferred until lesson audit gates pass.

## Sources Used

- `Course Production/Course-Overview.md`
- `Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_A_MAPPING_FRAMEWORK.md`
- `Course Production/PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`
- Repaired Unit 1 rigor expectations as the practical build baseline.

## Unit 2 Mapping Trace

| Lesson | Approved Lesson Title | Primary Standards | Required Lab/Visual/Data Focus | Build Result |
|---|---|---|---|---|
| 01 | Atomic Theory and Experimental Evidence | MLA.CHEM.ATO.01 | Atomic model timeline; model/evidence table | Built |
| 02 | Protons, Neutrons, Electrons, and Atomic Structure | MLA.CHEM.ATO.02 | Atomic particle diagram/table | Built |
| 03 | Isotopes, Atomic Mass, and Atomic Identity | MLA.CHEM.ATO.02 | Isotope and abundance data table | Built |
| 04 | Electron Arrangement and Periodic Position | MLA.CHEM.ATO.03 | Periodic/electron arrangement table | Built |
| 05 | Periodic Trends and Chemical Properties | MLA.CHEM.ATO.03 | Periodic trend table | Built |
| 06 | Quantized Energy and Atomic Energy Levels | MLA.CHEM.ATO.03 | Energy-level and emission/absorption model | Built |
| 07 | Electromagnetic Spectrum and Atomic Applications | MLA.CHEM.ATO.04 | EM spectrum wavelength/frequency/energy table | Built |
| 08 | Putting It All Together | Unit 2 synthesis standards | Mixed atomic model, isotope, periodic trend, energy, and spectrum stimuli | Built |

## Files Built

Each Unit 2 lesson now includes:

- `P01.html` through `P07.html`
- `lesson.json`
- `quiz.json`

Total populated lesson/metadata files in this pass: 72.

## Initial Validation Results

| Gate | Result |
|---|---|
| 8 Unit 2 lesson folders exist | PASS |
| Each lesson has exactly 7 HTML pages | PASS |
| Each lesson has `lesson.json` and `quiz.json` | PASS |
| No Unit 2 HTML/JSON file remains zero bytes | PASS |
| All Unit 2 JSON parses successfully | PASS |
| Exactly one TOR support box per page | PASS |
| Prohibited teacher-led language search | PASS |
| Standards appear in lesson pages | PASS |
| Required visual/table/model/data support present | PASS |
| P04 has three worked examples | PASS |
| P06 includes self-contained Part B work | PASS |

## Rigor Notes

Unit 2 was built from the repaired Unit 1 rigor expectation rather than the earlier shell-only pattern. Each lesson includes:

- vocabulary before use
- step-by-step teaching sequence
- required model/data/table display
- how-to-read guidance for the visual/model/data
- lesson-specific misconception
- incorrect and corrected examples
- three worked examples
- self-contained independent work
- safety boundaries

## Assessment Status

Assessments are not built in this pass.

Existing `.gift` files remain zero-byte legacy placeholders and are not production-ready. Per the science-course workflow, Unit 2 Moodle XML should be built only after lesson audit gates pass.

## Initial Decision

**Unit 2 lesson build status:** BUILT AND INITIALLY VALIDATED.  
**Certification status:** NOT CERTIFIED. Unit 2 still requires rigorous lesson audit, assessment XML production after lesson pass, assessment audit, and unit completion audit.
