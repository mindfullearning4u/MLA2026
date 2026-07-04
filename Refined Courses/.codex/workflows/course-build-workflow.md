# Course Build Workflow

## Purpose

Use this workflow when building or repairing a course.

## Sequence

1. Main agent reads master standards.
2. Mapping agent performs initial source analysis.
3. Main agent confirms mapping trace table and locks it as the source of truth for all unit agents.
4. Structure auditor checks file shell and verifies every unit/lesson folder traces to the mapping.
5. Main agent fixes approved structural issues.
6. Rigor auditor reviews lesson quality and verifies every mapped standard is taught in the assigned lesson.
7. Visual auditor or rigor auditor identifies needed visuals.
8. Main agent validates Moodle XML exists and is structurally valid for every production assessment bank.
9. Assessment auditor validates assessments and verifies every question traces to the unit and lesson mapping.
10. Assessment visual auditor checks every question.
11. Resource/simulation agent researches suggestions.
12. Main agent applies only approved corrections.
13. Unit completion auditor checks each unit before the next unit begins.
14. Verification subagents re-audit the previous subagent findings and check for missed mapping, standards, visual, rigor, structure, workflow, and assessment issues.
15. Course completion auditor checks the full course.
16. Final certification auditor issues decision.
17. Main agent writes final report.

## Editing Rule

Subagents are read-only unless the user explicitly authorizes subagent edits.

## Mapping Enforcement Rule

Every subagent must use the approved unit mapping and lesson mapping. A subagent report that does not cite mapping evidence is incomplete and cannot support PASS.

No lesson, assessment, unit, or course can pass if:

- a mapped standard is missing from instruction
- a mapped standard is missing from assessment evidence
- a lesson teaches standards outside its approved mapping without explicit support/review authorization
- an assessment asks questions outside the lesson or unit mapping
- old unit overview files are used as source-of-truth mapping
