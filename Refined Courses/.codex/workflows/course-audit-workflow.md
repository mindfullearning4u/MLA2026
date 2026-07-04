# Course Audit Workflow

## Purpose

Use this workflow for read-only course audits.

## Required Subagents

For a coursewide audit, subagents are mandatory. A script-only audit or main-agent-only audit is not sufficient for certification.

Use this required coverage:

- mapping-and-source-analysis-agent for the full course before unit audits
- instructional-rigor-auditor-subagent for each unit
- lesson-structure-auditor-subagent for each unit
- assessment-auditor-subagent for each unit
- assessment-visual-auditor-subagent for each unit
- metadata-json-auditor-subagent for each unit
- lms-html-formatting-auditor-subagent for each unit
- resource-and-simulation-research-subagent when relevant, and always for science/lab courses
- unit-completion-auditor-subagent after each unit is corrected
- course-completion-auditor-subagent after all unit audits pass
- final-certification-auditor-subagent after all corrections and reruns

Every unit audit must cite the approved unit mapping and lesson mapping. Every category audit must cite current-file evidence. A PASS without evidence is invalid.

If any subagent reports a missing item, mapping drift, weak lesson rigor, missing visual, assessment issue, metadata issue, LMS issue, or compliance issue, the main agent must inspect and fix the confirmed defect before final reporting.

## Output

Consolidate findings into:

1. Required structural fixes
2. Required metadata fixes
3. Required assessment fixes
4. Suggested rigor improvements
5. Suggested visual additions
6. Suggested external resources/simulations
7. Approval-needed items
8. PASS/FAIL decision

## Required Coverage Table

Every course audit report must include a coverage table with one row per unit and columns for:

- mapping checked
- instructional rigor checked
- structure/workflow checked
- assessment alignment checked
- assessment visuals/XML checked
- metadata/LMS checked
- resources/simulations checked when applicable
- corrections made
- rerun result

Do not certify a course if this table is incomplete.
