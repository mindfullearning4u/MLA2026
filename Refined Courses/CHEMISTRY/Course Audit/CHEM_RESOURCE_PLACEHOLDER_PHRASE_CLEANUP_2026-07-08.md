# Chemistry Resource Placeholder Phrase Cleanup Validation

**Course:** Chemistry  
**Date:** 2026-07-08  
**Status:** PASS

## Cleanup Scope

Production unit files were checked for old resource-link placeholder and approval-gated wording after direct simulation/resource links were added.

Checked file types:

- lesson HTML files
- `lesson.json`
- `quiz.json`
- Moodle XML assessment files

Historical course audit notes were not treated as student-facing production content.

## Removed / Replaced Wording Classes

- approval / approved language in production unit files
- candidate resource wording
- placeholder wording
- pending link wording
- generic navigation phrasing such as choosing or searching for a simulation
- old resource-location-for-approval metadata wording

## Validation Results

| Check | Result |
|---|---:|
| Lesson HTML files | 336 |
| JSON files | 96 |
| Bad JSON files | 0 |
| Moodle XML files | 102 |
| Bad XML files | 0 |
| Moodle XML questions | 1,590 |
| Questions with bad choice counts | 0 |
| Questions without exactly one correct answer | 0 |
| Missing feedback instances | 0 |
| Missing stimulus table instances | 0 |
| Lessons missing direct simulation metadata | 0 |
| Strict placeholder/approval/resource-navigation wording hits | 0 |

## Decision

**PASS.**

Student-facing Chemistry production unit files and production metadata no longer contain placeholder, approval-gated, candidate-resource, or generic simulation navigation wording. Direct simulation/resource links remain present.
