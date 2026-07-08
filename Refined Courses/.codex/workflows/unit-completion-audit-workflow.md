# Unit Completion Audit Workflow

## Purpose

Run this workflow after a unit is built or corrected.

## Sequence

1. Confirm unit mapping and lesson mapping from certified sources.
2. Run lesson structure audit.
3. Run metadata JSON audit.
4. Run LMS HTML formatting audit.
5. Run instructional rigor audit.
6. Run visual audit.
7. Run final synthesis lesson audit: Lesson 8 for 1.0-credit courses or Lesson 5 for 0.5-credit courses.
8. Run assessment Moodle XML audit.
9. Run assessment visual audit.
10. Run answer pattern and feedback audit.
11. Run resource/simulation review.
12. Run unit completion auditor.
13. Produce unit audit report with mapping evidence for every PASS decision.

## Rule

Do not move to the next unit until the unit has PASS or the user explicitly accepts PASS WITH SUGGESTIONS.

Mapping failures cannot receive PASS WITH SUGGESTIONS. If any mapped standard is missing from instruction or assessment, or any assessment reaches outside the approved unit/lesson mapping, the unit decision is FAIL.
