# Geometry Repo-to-Moodle Change Tracker

Date: 2026-07-09
Purpose: Track Geometry repository changes that may require Moodle verification or updates.

## Summary

- Scope reviewed: Geometry only.
- Assessment XML files changed: No. Pending quiz-bank reductions were restored before commit.
- GIFT files changed: No. Pending legacy GIFT reductions were restored before commit.
- Lesson HTML files changed: Yes, Unit 1 P01 headers only.
- Course overview changed: Yes, formatting cleanup only.

## Assessment Safety Note

A pending worktree change had reduced Geometry lesson quiz banks from 25 questions to 20 questions across all lesson quiz Moodle XML files. That change was not acceptable under the current assessment standard. The Geometry `.xml` and `.gift` assessment reductions were restored to the committed state.

Validation after restoration:

| Check | Result |
|---|---|
| Guided Practice banks | PASS - 5 questions where expected |
| Lesson Quiz banks | PASS - 25 questions where expected |
| Unit Pretests | PASS - 10 questions where expected |
| Unit Assessment banks | PASS - 40 questions where expected |
| XML parse validation | PASS - no XML parse errors found |

## Moodle Action Required

The following Geometry repo lesson pages changed and should be checked against Moodle. If Moodle already displays the corrected header, mark verified. If Moodle still shows mojibake text in the top lesson banner, update the Moodle page from the repo source.

| Repo file | Moodle action | Reason |
|---|---|---|
| `GEOMETRY/Units/Unit 01/Lesson 01/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 01`. |
| `GEOMETRY/Units/Unit 01/Lesson 02/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 02`. |
| `GEOMETRY/Units/Unit 01/Lesson 03/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 03`. |
| `GEOMETRY/Units/Unit 01/Lesson 04/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 04`. |
| `GEOMETRY/Units/Unit 01/Lesson 05/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 05`. |
| `GEOMETRY/Units/Unit 01/Lesson 06/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 06`. |
| `GEOMETRY/Units/Unit 01/Lesson 07/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 07`. |
| `GEOMETRY/Units/Unit 01/Lesson 08/P01.html` | Verify/update | Removed visible mojibake before `GEO | Unit 01 | Lesson 08`. |

## Course Overview Note

`GEOMETRY/Course-Overview.md` was cleaned for Markdown formatting consistency only. Verify Moodle only if this file has been copied into a Moodle course overview, summary, or page.

## Final Note

Do not update Geometry Moodle assessments for this cleanup. The assessment reductions were rejected and restored.
