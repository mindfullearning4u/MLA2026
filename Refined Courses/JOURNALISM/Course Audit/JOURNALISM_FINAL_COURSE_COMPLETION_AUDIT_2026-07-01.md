# Journalism Final Course Completion Audit

Date: 2026-07-01

## Course

Journalism

## Scope

Full-course audit and correction pass for Moodle transfer readiness. The review followed the repository locked standard, MLA course production protocols, Journalism crosswalk, Journalism unit mapping, Journalism lesson mapping, and the English II correction workflow model.

## Sources Used

- `C:\Users\acrue\MLA2026-1\AGENTS.md`
- `.codex/standards/00-course-production-master-protocol.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/06-assessment-gift-standard.md`
- `.codex/standards/08-answer-pattern-and-feedback-standard.md`
- `.codex/standards/09-lesson-8-synthesis-standard.md`
- `.codex/standards/10-json-metadata-and-file-structure-standard.md`
- `.codex/standards/12-final-course-certification-report-standard.md`
- `.codex/workflows/course-audit-workflow.md`
- `.codex/workflows/course-completion-audit-workflow.md`
- `JOURNALISM/Course Production/Course-Overview.md`
- `JOURNALISM/Course Production/PHASE_2A_A_2_JOURNALISM_MLA_STANDARD_INVENTORY.md`
- `JOURNALISM/Course Production/PHASE_2A_B_JOURNALISM_CROSSWALK_DRAFT.md`
- `JOURNALISM/Course Production/PHASE_3A_B_1_JOURNALISM_UNIT_LEVEL_MAPPING.md`
- `JOURNALISM/Course Production/PHASE_3A_B_2_JOURNALISM_LESSON_LEVEL_MAPPING.md`

## Units and Lessons Reviewed

- 6 units reviewed.
- 48 lessons reviewed.
- 336 HTML lesson pages reviewed.
- 102 GIFT assessment files reviewed.
- 1,590 GIFT questions validated.

## Subagent Audit Inputs

Three read-only subagent audits were completed:

- Mapping/source traceability audit
- Lesson/page/metadata/LMS structure audit
- Assessment/GIFT audit

## Corrections Made

- Normalized P01 standards labels to `Standards Covered in This Lesson`.
- Normalized P02 and P03 page-role headings to the exact `Notebook Task - Part` model.
- Normalized P04 example labels to `Worked Example 1`, `Worked Example 2`, and `Worked Example 3`.
- Normalized `Teachable Explanation` labels where pages used alternate wording or casing.
- Repaired Unit 1 Lesson 4 P01/P03 page-model label gaps.
- Normalized Unit 1 Lesson 4 visible course header from `JOUR` to `JOURNALISM`.
- Normalized all P05 references to `Moodle Guided Practice`.
- Replaced corrupted TOR icon text with plain `Need Help?` text.
- Removed malformed duplicate paragraph closing tags.
- Corrected Lesson 8 P01 title wording in Units 1-3 to match the approved mapping.
- Added Unit 6 Lesson 8 synthesis/no-new-primary metadata in `lesson.json` and `quiz.json`.
- Corrected Lesson 8 unit assessment `quiz.json` question counts to match 40-question banks.
- Corrected out-of-scope assessment standard tags:
  - Unit 4 Lesson 8 Q32 now uses `MLA.JOUR.MED.01`.
  - Unit 5 Lesson 8 Q32 now uses `MLA.JOUR.DIG.01`.
  - Unit 5 Lesson 8 Q34 now uses `MLA.JOUR.DIG.03`.
- Rewrote incorrect-answer feedback so each distractor has choice-specific teachable feedback.
- Rebalanced correct-answer positions across GIFT banks to remove detectable answer patterns.

## Validation Results

| Area | Result |
|---|---|
| Course architecture | PASS |
| Required files and folders | PASS |
| JSON parse | PASS |
| `quiz.json` assessment counts | PASS |
| P01-P07 required page sections | PASS |
| LMS/HTML formatting | PASS |
| Empty containers / blank boxes | PASS |
| Visible backend `.gift` filenames | PASS |
| Upload wording | PASS |
| TOR support box count | PASS |
| Mojibake/corruption scan | PASS |
| GIFT syntax and counts | PASS |
| Four A-D choices per question | PASS |
| One correct answer per question | PASS |
| Duplicate stems / duplicate choices | PASS |
| Feedback quality and specificity | PASS |
| Answer-pattern validation | PASS |
| Out-of-scope assessment standard spot-check | PASS |
| Lesson 8 synthesis review | PASS |

## Lesson 8 Assessment-Control Note

The Journalism lesson mapping says Lesson 8 contains Unit Assessment only. The current course architecture and MLA Lesson 8 synthesis standard require Lesson 8 Guided Practice before Unit Assessment, and the existing course contains Lesson 8 Guided Practice files for all units. This audit preserved the Guided Practice files as practice support and interpreted the mapping control as prohibiting a Lesson 8 lesson quiz, not prohibiting Guided Practice.

## Files Not Changed Due to Locked Content

No broad instructional rewrites were made. Existing lesson examples, scenarios, and instructional meaning were preserved except where assessment compliance required standards-tag correction or feedback specificity.

## Remaining Issues

No required blockers remain.

Suggested only:

- Root-level `JOURNALISM/Course Overview.md` conflicts with the approved Course Production mapping on some unit-title wording. Continue using `JOURNALISM/Course Production/Course-Overview.md` and the certified mapping files as source of truth.
- `Unit Overview.md` files remain historical artifacts and should not be used as source of truth. Archive only if explicitly requested.

## Final Decision

CERTIFIED WITH SOURCE-NOTE.

Journalism passes the audited structural, workflow, mapping, LMS, JSON, and Moodle-ready GIFT assessment checks after correction. The source note above documents the Lesson 8 Guided Practice interpretation used to preserve the global MLA Lesson 8 synthesis standard and the existing production architecture.
