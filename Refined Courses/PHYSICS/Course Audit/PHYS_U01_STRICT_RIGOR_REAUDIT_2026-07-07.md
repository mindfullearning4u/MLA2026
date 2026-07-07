# Physics Unit 1 Strict Rigor Re-Audit

Date: 2026-07-07

## Scope

Course: Physics

Unit: Unit 01 - Scientific Thinking, Measurement, and Motion

This re-audit was performed after identifying that the first Unit 1 build was structurally correct but not yet detailed enough for the rigor expected in a hard Physics course.

## Source of Truth

- `PHYSICS/Course Production/PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
- `PHYSICS/Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
- `PHYSICS/Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- MLA instructional rigor and mastery standard
- MLA science lab and virtual lab standard
- MLA Moodle XML assessment standard

## Required Rigor Standard Applied

Physics lessons must not only name concepts. They must teach students how to think through the concept step by step without a live teacher. The re-audit required:

- quantity identification before calculation
- units included and explained
- direction preserved for vector quantities
- table, graph, model, and data displays explained before use
- formulas introduced with meaning and use cases
- common misconceptions corrected with teachable feedback
- support for remedial, standard, and accelerated readiness levels
- no reliance on Teacher of Record instruction to teach core content

## Corrections Made

| Area | Correction |
|---|---|
| P02 instruction | Added `Veteran Teacher Slow Walk` sections to Lessons 01-08. |
| Formulas and quantities | Added formula meaning/use tables for graphing, precision/error, scalar/vector, position/velocity, and acceleration lessons. |
| Motion rigor | Expanded Lesson 06 to distinguish speed, velocity, displacement, direction, and reference frames before calculation. |
| Acceleration rigor | Expanded Lesson 07 to clarify acceleration as velocity change over time, not simply "moving fast." |
| Graph/data rigor | Expanded Lesson 03 to explain axes, labels, units, and graph-pattern reading. |
| Readiness supports | Added remedial, standard, and accelerated support language in P03 for every lesson. |
| P04 worked examples | Added a `Before the Worked Examples` setup section before the three worked examples in every lesson. |
| Teacher boundary | Preserved asynchronous lesson boundary; TOR language remains support/intervention only. |

## Lesson-Level Decision

| Lesson | Title | Strict Rigor Decision |
|---:|---|---|
| 01 | Physics as a Science | PASS |
| 02 | Lab Safety, Tools, and Measurement | PASS |
| 03 | Data Tables, Graphs, and Models | PASS |
| 04 | Precision, Error, and Evidence | PASS |
| 05 | Scalars, Vectors, and Units | PASS |
| 06 | Position and Velocity | PASS |
| 07 | Acceleration and Motion Models | PASS |
| 08 | Putting It All Together | PASS |

## Validation

`node scripts/validate_physics_unit1.js`

Result: PASS

Validated:

- P01-P07 files exist for Lessons 01-08
- exactly one TOR support box per page
- no prohibited teacher-led instruction language
- P04 includes exactly three worked examples per lesson
- all JSON files parse
- all Moodle XML files exist
- XML question counts match required banks
- every XML question has exactly four answers
- every XML question has exactly one correct answer

## Final Decision

PASS

Physics Unit 1 now meets the stricter Physics rigor expectation for step-by-step asynchronous instruction, embedded visuals/data/models, and Moodle XML assessment readiness.
