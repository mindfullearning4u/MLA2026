# Geometry Pre-Transfer Assessment Count Correction

Date: 2026-07-07  
Course: Geometry  
Scope: Lesson quiz source banks and Moodle XML production files

## Reason for Correction

During the Moodle pre-transfer gate, the current Geometry assessment files were checked directly against the approved assessment certification standard.

The existing `GEOMETRY_COURSE_ASSESSMENT_CERTIFICATION_REPORT.md` states that Geometry lesson quiz banks must contain 20 questions each. However, the current repository files still contained 25 questions in each of the 42 lesson quiz banks.

This blocked Moodle transfer because Moodle must receive the current certified repository source of truth.

## Correction Applied

For each Geometry lesson quiz bank in Units 1-6, Lessons 1-7:

- Retained Questions 1-20.
- Removed Questions 21-25 from the legacy GIFT source file.
- Removed Questions 21-25 from the matching Moodle XML production file.
- Did not modify Guided Practice, Unit Pretest, or Unit Assessment files.

The removed overage questions used the generic post-Q20 pattern and were outside the certified lesson quiz count.

## Current Validation Results

| Check | Result | Status |
|---|---:|---|
| Lesson quiz GIFT files checked | 42 | PASS |
| Lesson quiz GIFT files with exactly 20 questions | 42 | PASS |
| Moodle XML files checked | 102 | PASS |
| Moodle XML parse failures | 0 | PASS |
| Guided Practice XML count errors | 0 | PASS |
| Lesson Quiz XML count errors | 0 | PASS |
| Unit Pretest XML count errors | 0 | PASS |
| Unit Assessment XML count errors | 0 | PASS |

## Transfer Status

The assessment-count blocker is corrected. Geometry assessment XML is now ready for D-drive staging and Moodle question-bank import, pending Moodle shell confirmation and user approval for import actions.

