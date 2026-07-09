# ALG1 Repo-to-Moodle Change Tracker

Date: 2026-07-09
Purpose: Track ALG1 repository lesson changes that may require Moodle lesson page updates or verification.

## Summary

- Scope reviewed: ALG1 only.
- Assessment files changed: No.
- Moodle XML files changed: No.
- GIFT files changed: No.
- Lesson HTML files changed: Yes.
- Moodle upload log changed: Yes.
- Cleanup completed: Repaired pending ALG1 math markup so exponent notation uses HTML superscript instead of caret notation, removed malformed inline CSS/text merge, and verified no visible PowerShell newline artifacts remain in changed lesson HTML files.

## Moodle Action Required

The following ALG1 lesson pages changed in the repository and should be checked against Moodle. If Moodle already contains the corrected content, mark verified. If Moodle still has older or malformed content, update the Moodle page from the repo source.

| Repo file | Moodle action | Reason |
|---|---|---|
| `ALG1/Units/Unit 01/Lesson 07/P07.html` | Verify/update | Removed visible literal newline artifact before Mastery Criteria. |
| `ALG1/Units/Unit 04/Lesson 02/P03.html` | Verify/update | Repaired exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 04/Lesson 03/P03.html` | Verify/update | Repaired exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 04/Lesson 05/P03.html` | Verify/update | Cleaned equation display in absolute-value lesson text. |
| `ALG1/Units/Unit 04/Lesson 06/P02.html` | Verify/update | Cleaned function notation display. |
| `ALG1/Units/Unit 04/Lesson 06/P03.html` | Verify/update | Cleaned function notation display. |
| `ALG1/Units/Unit 04/Lesson 07/P02.html` | Verify/update | Cleaned function/comparison notation display. |
| `ALG1/Units/Unit 04/Lesson 07/P03.html` | Verify/update | Cleaned function/comparison notation display. |
| `ALG1/Units/Unit 05/Lesson 01/P02.html` | Verify/update | Repaired polynomial exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 01/P03.html` | Verify/update | Repaired polynomial exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 01/P04.html` | Verify/update | Repaired polynomial visual/table exponent notation. |
| `ALG1/Units/Unit 05/Lesson 01/P07.html` | Verify/update | Repaired polynomial visual/table exponent notation. |
| `ALG1/Units/Unit 05/Lesson 02/P01.html` | Verify/update | Repaired quadratic exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 02/P02.html` | Verify/update | Repaired quadratic exponent notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 02/P03.html` | Verify/update | Repaired quadratic exponent notation and fixed malformed table cell style/content. |
| `ALG1/Units/Unit 05/Lesson 02/P04.html` | Verify/update | Repaired quadratic visual/table exponent notation. |
| `ALG1/Units/Unit 05/Lesson 02/P06.html` | Verify/update | Repaired quadratic visual/table exponent notation. |
| `ALG1/Units/Unit 05/Lesson 02/P07.html` | Verify/update | Repaired quadratic visual/table exponent notation. |
| `ALG1/Units/Unit 05/Lesson 03/P02.html` | Verify/update | Cleaned equation display. |
| `ALG1/Units/Unit 05/Lesson 03/P03.html` | Verify/update | Repaired quadratic/exponent notation. |
| `ALG1/Units/Unit 05/Lesson 04/P02.html` | Verify/update | Repaired exponent/radical notation. |
| `ALG1/Units/Unit 05/Lesson 04/P03.html` | Verify/update | Cleaned equation display. |
| `ALG1/Units/Unit 05/Lesson 05/P02.html` | Verify/update | Repaired exponential notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 05/P03.html` | Verify/update | Repaired exponential notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 06/P01.html` | Verify/update | Repaired exponential notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 06/P02.html` | Verify/update | Repaired exponential notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 06/P03.html` | Verify/update | Repaired exponential notation to Moodle-safe superscript display. |
| `ALG1/Units/Unit 05/Lesson 06/P04.html` | Verify/update | Repaired exponential visual/table notation. |
| `ALG1/Units/Unit 06/Lesson 06/P01.html` | Verify/update | Repaired compound-interest formula exponent to Moodle-safe superscript display. |
| `ALG1/Units/Unit 06/Lesson 06/P02.html` | Verify/update | Repaired compound-interest formula exponent to Moodle-safe superscript display. |
| `ALG1/Units/Unit 06/Lesson 06/P03.html` | Verify/update | Repaired compound-interest formula exponent to Moodle-safe superscript display. |

## Validation Completed

| Check | Result |
|---|---|
| Remaining caret exponent patterns in ALG1 lesson HTML | PASS - none found |
| Remaining malformed `padding:9px^...` strings | PASS - none found |
| Remaining visible PowerShell newline artifacts in changed lesson HTML | PASS - none found |
| Remaining mojibake markers `Ã` / `Â` in ALG1 lesson HTML | PASS - none found |
| ALG1 assessment files modified in this cleanup | PASS - none |

## Moodle Action Completed

Date completed: 2026-07-09

Result: PASS - all 31 listed ALG1 Moodle lesson pages were updated from the listed repository HTML files and preview-verified in Moodle.

Evidence: See `ALG1\Course Audit\ALG1_MOODLE_PAGE_UPLOAD_LOG.md`, section `2026-07-09 Repo-to-Moodle Repair Verification`.

Verification confirmed:

- Exponents render with HTML superscript where the repo source requires superscript.
- No caret exponent notation is visible in Moodle preview.
- No mojibake characters such as `Ã` or `Â` are visible in Moodle preview.
- No visible PowerShell newline artifacts such as `` `r `` or `` `n `` are visible in Moodle preview.
- No malformed table/CSS text is visible in Moodle preview.
- No ALG1 assessments were changed.

## Final Note

Do not update Moodle assessments for this cleanup. Only the listed lesson pages and Moodle upload log were affected.
