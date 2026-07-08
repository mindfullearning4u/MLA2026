# Chemistry Direct Simulation Link Repair Report

**Course:** Chemistry  
**Date:** 2026-07-08  
**Status:** PASS - Direct simulation/resource links inserted and validated across all Chemistry lessons.

## Requirement

The updated simulation requirement is implemented as student-facing direct access: students must be taken to the exact simulation/resource and must not be asked to navigate a site or guess which simulation to choose.

## Repair Applied

All 48 Chemistry lessons were updated.

Each `P01.html` now includes:

- `Required Direct Simulation Link`
- one exact linked simulation/resource title
- the direct URL shown visibly
- a lesson-specific task for what to do in that simulation/resource
- a warning not to search for or choose a different simulation

Each `lesson.json` now includes:

- `directSimulationRequired`
- `directSimulationTitle`
- `directSimulationUrl`
- `directSimulationStudentTask`

## Validation Results

| Check | Result |
|---|---:|
| Lessons checked | 48 |
| Lessons with direct simulation/resource section | 48 |
| Lessons missing direct-link section | 0 |
| Lesson JSON files missing direct-link fields | 0 |
| Bad lesson JSON files | 0 |
| Unique direct URLs checked | 21 |
| Unique URLs resolving successfully | 21 |
| Unique URLs failing validation | 0 |
| Generic navigation/search directions found | 0 |

## Link Control

The inserted links are exact student-facing destinations, not generic search pages. Where a lesson uses a PhET simulation with a direct HTML launch URL, that launch URL is used. Where the mapped resource is not a PhET simulation, the lesson links to an exact standards-aligned resource page rather than an organization home page.

## Audit Decision

**PASS.**

The Chemistry course now satisfies the direct simulation/resource link requirement at the lesson level.
