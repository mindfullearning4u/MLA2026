# Course Build Workflow

## Purpose

Use this workflow when building or repairing a course.

## Sequence

1. Main agent reads master standards.
2. Mapping agent performs initial source analysis.
3. Main agent confirms mapping trace table and locks it as the source of truth for all unit agents.
4. Main agent creates a required unit/category subagent coverage plan before coursewide edits or certification.
5. Structure/workflow auditor checks each unit and verifies every unit/lesson folder traces to the mapping.
6. Main agent fixes approved structural issues.
7. Instructional rigor auditor reviews each unit and verifies every mapped standard is taught in the assigned lesson.
8. Visual auditor or rigor auditor identifies needed visuals for each unit.
9. Main agent validates Moodle XML exists and is structurally valid for every production assessment bank.
10. Assessment alignment auditor validates each unit and verifies every question traces to the unit and lesson mapping.
11. Assessment visual/XML auditor checks every question in each unit.
12. Metadata/LMS-format auditor checks each unit.
13. Resource/simulation agent researches suggestions when relevant, and always for science/lab courses.
14. Main agent inspects every reported issue and applies necessary corrections for confirmed findings.
15. Unit completion auditor checks each unit before the next unit begins or before final certification.
16. Verification subagents re-audit the previous subagent findings and check for missed mapping, standards, visual, rigor, structure, workflow, metadata, LMS, and assessment issues.
17. Main agent reruns affected unit/category audits after fixes.
18. Course completion auditor checks the full course.
19. Final certification auditor issues decision.
20. Main agent verifies that every confirmed audit correction has been made, affected audits have been rerun, and required course-content changes have been committed.
21. Main agent writes final report.

## Required Unit/Category Subagent Plan

For a six-unit course, the plan must include:

- Unit 01: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- Unit 02: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- Unit 03: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- Unit 04: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- Unit 05: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- Unit 06: instructional rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS
- coursewide source/mapping analysis
- coursewide resource/simulation review when applicable
- cross-check verification layer
- final certification layer

The main agent may use grouped subagent assignments only when the output remains unit-by-unit and category-specific. A single all-course subagent is not sufficient for full production or certification.

## Editing Rule

Subagents are read-only unless the user explicitly authorizes subagent edits.

The main agent owns remediation. If a subagent finds a defect, the main agent must inspect the current file, make the necessary fix when valid, rerun validation, and document the correction.

## Completion and Commit Rule

Do not report a course as completely built, clean, certified, student-ready, or Moodle-transfer-ready while valid audit findings are still pending or while required course-content changes are uncommitted.

Before final PASS or Moodle-transfer-ready status, the main agent must verify:

- confirmed audit findings were fixed or explicitly documented as blocked
- affected audits were rerun after fixes
- required course-content changes were committed
- the course working tree is clean, except for intentionally excluded logs, transfer notes, or user-owned files named in the final report

## Mapping Enforcement Rule

Every subagent must use the approved unit mapping and lesson mapping. A subagent report that does not cite mapping evidence is incomplete and cannot support PASS.

No lesson, assessment, unit, or course can pass if:

- a mapped standard is missing from instruction
- a mapped standard is missing from assessment evidence
- a lesson teaches standards outside its approved mapping without explicit support/review authorization
- an assessment asks questions outside the lesson or unit mapping
- old unit overview files are used as source-of-truth mapping
