# Physics Direct Resource Link Correction and Reaudit

Date: 2026-07-08

## Purpose

This report documents the correction required after the updated MLA science requirement that approved or required labs, simulations, data sets, and external resources must include exact direct clickable URLs in the student lesson files.

The prior final audit treated Physics external resources as approval-only candidate resources. The current requirement is stricter: when a lab, simulation, data set, or resource is approved or required for the course scope, the student must receive the exact direct link to the specific activity/resource and must not be told to search or browse a provider site.

## Files Updated

- `.codex/standards/00-course-production-master-protocol.md`
- `.codex/standards/01-initial-mapping-analysis-protocol.md`
- `.codex/standards/11-external-learning-resources-and-simulations-standard.md`
- `.codex/standards/13-unit-completion-audit-standard.md`
- `.codex/standards/14-course-completion-audit-standard.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`
- `.codex/workflows/course-audit-workflow.md`
- `.codex/workflows/science-course-audit-workflow.md`
- `.codex/agent-prompts/course-builder-main-agent.md`
- `.codex/agent-prompts/mapping-and-source-analysis-agent.md`
- `.codex/agent-prompts/new-course-agent-onboarding.md`
- `.codex/agent-prompts/resource-and-simulation-research-subagent.md`
- `.codex/agent-prompts/science-lab-auditor-subagent.md`
- `.codex/agent-prompts/science-lab-developer-agent.md`
- `.codex/agent-prompts/science-simulation-resource-auditor-subagent.md`
- `PHYSICS/Units/Unit 01` through `PHYSICS/Units/Unit 06`, Lessons 01-08:
  - `P03.html`
  - `lesson.json`
- `scripts/add_physics_direct_resource_links.js`

## Correction Summary

Each Physics lesson now includes:

- a student-facing `Direct Resource Link` section in `P03.html`
- exact direct HTTPS URLs to the specific simulation, source page, data/resource page, or support resource
- student directions stating that the student should click the provided resource and should not search for a different activity
- `lesson.json` metadata under `labVisualSimulationRequirements.approvedDirectResources`

Unit 08 synthesis lessons now include direct links to the approved unit resources from Lessons 01-07 instead of relying on students to locate earlier resources manually.

## Validation Performed

Validation script checks confirmed:

| Check | Result |
|---|---|
| 48 of 48 Physics `P03.html` files contain a `Direct Resource Link` section | PASS |
| 48 of 48 Physics `lesson.json` files contain `approvedDirectResources` metadata | PASS |
| All updated `lesson.json` files parse as valid JSON | PASS |
| All resource links in updated P03 pages use HTTPS URLs | PASS |
| No P03 direct-resource link requires a non-direct local or relative URL | PASS |
| Student-facing wording avoids telling students to search or browse for the required resource | PASS |

## Certification Decision

PASS.

Physics remains Moodle-transfer ready with the added direct-resource-link requirement satisfied. Future science course audits must use the updated `.codex` standards and agent prompt files before certification.
