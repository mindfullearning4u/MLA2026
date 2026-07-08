# Biology Direct Resource Link Correction and Reaudit

Date: 2026-07-08

## Purpose

This report documents the Biology correction required by the updated MLA science direct-link standard.

The prior Biology audit and architecture language treated external simulations/resources as approval-only candidate resources. The current MLA science standard is stricter: science/lab courses must include exact direct clickable links for free, student-safe, directly aligned trusted resources without requiring students to search or navigate provider websites.

## Files Updated

- `BIOLOGY/Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- `BIOLOGY/Units/Unit 01` through `BIOLOGY/Units/Unit 06`, Lessons 01-08:
  - `P01.html`
  - `P03.html`
  - `lesson.json`
- `scripts/add_biology_direct_resource_links.js`

## Corrections Made

Each Biology lesson now includes:

- a student-facing `Direct Resource Link` section in `P03.html`
- exact direct HTTPS URLs to the specific resource, simulation, data set, or trusted support page
- student-facing wording telling students to use the exact lesson link and not search for a different activity
- `lesson.json` metadata under `labVisualSimulationRequirements.approvedDirectResources`
- revised P01 science safety/resource wording removing the old `approval-only` language

The Biology lab/visual/simulation mapping file now states that free, student-safe, directly aligned trusted resources may be inserted without separate approval under the standing science-course directive. It preserves approval requirements for resources that require login, payment, special hardware, unsafe activity, non-public access, questionable source quality, or uncertain alignment.

## Validation Performed

| Check | Result |
|---|---|
| 48 of 48 Biology `P03.html` files contain a `Direct Resource Link` section | PASS |
| 48 of 48 Biology `lesson.json` files contain `approvedDirectResources` metadata | PASS |
| All updated `lesson.json` files parse as valid JSON | PASS |
| All resource links in updated P03 pages use HTTPS URLs | PASS |
| Old P01 `approval-only` resource wording removed from all 48 lessons | PASS |
| Student-facing wording avoids telling students to search or browse for the required resource | PASS |

## Certification Decision

PASS.

Biology now satisfies the direct-resource-link requirement for Moodle transfer readiness.
