# Geometry Lesson Rigor Remediation Report - 2026-07-04

## Source of Truth

- Course: GEOMETRY
- Mapping: `mla_geometry_unit_mapping_v2.md`
- Crosswalk: `mla_geometry_standards_crosswalk.xlsx`
- Course overview: `Course-Overview.md`
- Unit overview files are not used as source of truth.

## Work Completed

- Ran the strict lesson-rigor depth audit across Geometry instructional pages.
- Checked P02, P03, P04, and P06 pages for every lesson in Units 01-06.
- Expanded every page below the strict minimum instructional-depth threshold.
- Added a `mla-rigor-expansion` section to pages needing remediation.
- Preserved existing lesson structure, TOR support boxes, diagrams, and page sequence.
- Converted remaining Geometry `quiz.json` references from legacy GIFT metadata to existing Moodle XML files.
- Added reusable generic course tools for future course rigor audits and expansions.

## Lesson Rigor Fixes

Initial audit:

- Pages checked: 192
- Pages below threshold before remediation: 144
- Initial decision: FAIL

Remediation added:

- Teacher-guided thinking for P02 notebook instruction.
- Diagram-evidence and theorem-selection guidance for P03 notebook instruction.
- Worked-example coaching notes for P04.
- Independent-work success criteria for P06.
- Explicit reminders to use diagram markings, coordinates, constructions, transformations, tables, formulas, and units where relevant.
- Alignment language connecting each page to the approved lesson title and mapped standard metadata.

Final lesson-rigor audit:

- Pages checked: 192
- Pages below threshold after remediation: 0
- Final decision: PASS
- Audit report: `GEOMETRY_LESSON_RIGOR_DEPTH_AUDIT.md`

## Assessment Metadata Fixes

During validation, Geometry lesson HTML had no legacy `.gift` references, but `quiz.json` metadata still contained legacy GIFT references.

Corrected:

- 48 Geometry `quiz.json` files checked.
- 48 Geometry `quiz.json` files now point to Moodle XML where assessment file references are present.
- Remaining `.gift` references in lesson HTML: 0
- Remaining `.gift` references in quiz metadata: 0
- Missing referenced XML files: 0

## Assessment Visual Regression Check

- Moodle XML files checked: 102
- Questions checked: 1590
- Questions with visual markup: 974
- Mandatory visuals required: 4
- Mandatory visuals present: 4
- Mandatory visuals missing: 0
- XML visual gate decision: PASS

## Final Decision

PASS for the current strict lesson-rigor depth gate and assessment metadata regression checks.

Geometry now satisfies the same lesson-depth remediation gate applied to ALG1. Future revisions must preserve exact unit and lesson mapping alignment, standard coverage, veteran-teacher step-by-step instruction, and visual/diagram support where it helps students understand the Geometry concept.
