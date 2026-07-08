# Chemistry Simulation / Virtual Lab Requirement Repair Report

**Course:** Chemistry  
**Date:** 2026-07-08  
**Status:** PASS - New simulation / virtual lab review requirement applied across built Chemistry lessons.

## Reason for Repair

The updated `PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md` makes simulation or virtual lab review explicit at the unit level. Existing Chemistry lessons included embedded models, tables, data, diagrams, and safety restrictions, but not every unit explicitly named the simulation / virtual lab review requirement in the student-facing lesson files and metadata.

## Repair Applied

All 48 Chemistry lessons were updated.

Each lesson `P01.html` now includes:

- required simulation or virtual lab review statement from the unit-level map
- lesson-specific lab/data/investigation review focus
- required model/data display from the lesson-level matrix
- candidate resource location for approval
- explicit rule that external simulations are not required or linked unless separately approved
- direction to use the embedded lesson model/data for independent work

Each lesson `lesson.json` now includes:

- `simulationVirtualLabReviewRequired`
- `simulationVirtualLabReviewRequirement`
- `simulationVirtualLabReviewFocus`
- `simulationCandidateResourceLocationForApproval`
- `simulationReviewImplementation`

## Approval Boundary

Candidate resources remain approval-gated. No unapproved external links were inserted into lessons or assessments.

## Validation Decision

**PASS.**

The course now explicitly reflects the new simulation / virtual lab review requirement while preserving the no-teacher, self-contained lesson model.
