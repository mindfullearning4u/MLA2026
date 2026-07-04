# MLA Course Production Master Protocol

## Purpose

This file is the master operating protocol for building, auditing, correcting, and certifying MLA2026 courses. Every main agent and subagent must read this protocol before working on a course.

This protocol carries the user's non-negotiable production expectations. A new agent must not rely on chat memory, prior summaries, or assumptions. The MD standards, workflows, agent prompts, approved crosswalk, unit mapping, and lesson mapping are the controlling requirements.

The expected quality bar is strict: every course must be built as if it will be reviewed for student readiness, standards coverage, accreditation evidence, compliance readiness, Moodle import quality, and instructional defensibility.

## Non-Negotiable Rules

1. Follow the certified course architecture.
2. Do not change the approved crosswalk, standards inventory, unit mapping, or lesson mapping.
3. Do not use `Unit Overview.md` as a source of truth. Unit Overview files are old artifacts and may be archived only when explicitly requested.
4. Use Course Overview, certified mapping documents, existing lesson objectives, and existing course architecture as the operating sources.
5. Every lesson must have exactly seven pages: `P01.html` through `P07.html`.
6. Every lesson must include `lesson.json` and `quiz.json`.
7. Every lesson must display or trace the mapped standards required by the certified mapping.
8. Lesson pages must follow the ALG1 Math Department visual/layout model unless the course has a separately approved department model.
9. Instruction must be detailed, sequential, and written as if a veteran teacher is teaching asynchronously.
10. Assessments must be Moodle-ready and mechanically valid. Use Moodle XML when visuals, formatted tables, diagrams, formulas, equations, passages, data displays, or other embedded representations are needed. GIFT may remain only as a plain-text source/backup format when no visual or special formatting is required.
11. Correct answers must not follow a predictable answer pattern.
12. Feedback must be teachable feedback, not short right/wrong labels.
13. External resources and simulations are suggestions only unless explicitly approved for insertion.
14. Reports and prior audits are useful context but never override direct validation of current files.
15. Standards, accreditation readiness, and compliance readiness must be maintained from the start of production, not added at the end.
16. Every lesson, page, assessment question, visual, standard, and activity must trace to the approved unit mapping and lesson mapping.
17. No mapped standard may be missing from instruction or assessment evidence.
18. No assessment may ask questions outside the approved lesson or unit mapping.
19. Math lessons and assessments must include veteran-teacher-style visuals, tables, graphs, number lines, diagrams, and data displays wherever they clarify the concept, remove ambiguity, or are warranted by the question.
20. A course, unit, lesson, or assessment cannot be called clean, complete, student ready, production ready, certified, or PASS unless all blocking gates pass from direct current-file inspection.

## Main Agent Responsibility

The main agent is responsible for the final quality of the course. Subagents provide evidence, but the main agent must verify that subagents followed the standards and did not miss required mapping, rigor, structure, assessment, visual, LMS, or compliance checks.

The main agent must reject any subagent report that:

- does not cite the approved unit and lesson mapping
- does not inspect current files directly
- gives a PASS without evidence
- treats missing mandatory visuals as suggestions
- treats missing mapped standards as suggestions
- relies on old Unit Overview files as source of truth
- validates only file existence instead of content quality and alignment

## Layered Subagent Audit Model

For full course production or repair, use layered unit-level audits:

1. Unit instructional rigor auditor for each unit.
2. Unit structure/workflow auditor for each unit.
3. Unit assessment auditor for each unit.
4. Unit assessment visual auditor for each unit.
5. Cross-checking verification auditor to review the previous subagent findings.
6. Final certification auditor after all unit gates pass.

Each unit-level subagent must check the approved unit mapping and lesson mapping. Every PASS decision must cite evidence.

## Locked Content Boundary

When the current task is structure-only mode:

- Do not rewrite instructional content.
- Do not expand instructional content.
- Do not simplify instructional content.
- Do not change worked examples.
- Do not add new lesson meaning.
- Do not remove provided content.
- Allowed content wording change: `Upload` to `Submit`.
- Improvements to rigor, clarity, examples, scaffolding, visuals, or resources must be reported as suggestions only.

When the user explicitly authorizes rebuild mode, use the standards in these files to write or revise content, but still preserve the approved mapping and course architecture.

## Required Source Order

Use sources in this order:

1. Standards Inventory or Benchmark Tracker
2. Crosswalk
3. Unit Mapping
4. Lesson Mapping
5. Existing lesson objectives
6. Course Overview
7. Existing course architecture
8. ALG1 Math Department model for page layout and workflow
9. Course audit reports for historical context only

Do not use old `Unit Overview.md` files to determine what a unit or lesson should teach.

## Required Production Sequence

For each course:

1. Confirm the course folder.
2. Identify all required source files.
3. Build a mapping trace table before edits.
4. Confirm unit count, lesson count, and lesson titles.
5. Audit current structure.
6. Audit lesson-page model.
7. Audit standards traceability.
8. Audit instructional rigor.
9. Audit mathematical or domain visuals.
10. Audit assessments.
11. Audit assessment visuals with the blocking visual gate.
12. Audit external resources and simulations.
13. Make only approved corrections.
14. Re-validate current files directly.
15. Run unit completion audit after each completed unit.
16. Run cross-check verification on subagent reports.
17. Run final course completion audit after all units pass.
18. Produce final PASS/FAIL report.

## PASS Requirements

A course cannot receive PASS unless:

- Unit and lesson sequence match certified mapping.
- Every mapped standard is taught in the assigned lesson.
- Every mapped standard has appropriate assessment evidence.
- Every assessment question traces to the approved lesson or unit mapping.
- Every required file exists and is non-empty where content is required.
- Every lesson has `lesson.json`, `quiz.json`, and `P01.html` through `P07.html`.
- Standards are included or traceable in every lesson.
- Lesson 8 in every unit functions as synthesis.
- P04, P06, and P07 meet page-specific requirements.
- Assessments meet count, format, syntax, feedback, standards, mapping, visual, and answer-pattern requirements.
- Mandatory visuals or representations are present directly in lessons and assessment questions where needed.
- Science lab/simulation review is complete when applicable.
- Unit completion audits are complete.
- Full course completion audit is complete.
- Final report lists remaining issues and certification decision.

## Output Buckets

Every audit report must separate findings into:

1. Required structural fixes
2. Required metadata fixes
3. Required assessment fixes
4. Allowed wording fixes: `Upload` to `Submit`
5. Suggested instructional rigor improvements
6. Suggested visual/resource additions
7. Suggested simulation/resource additions
8. Blockers requiring user approval

## Certification Language Rule

Use exact decision language:

- `PASS` only when every required gate passes.
- `PASS WITH SUGGESTIONS` only when all compliance requirements pass and remaining items are optional improvements.
- `FAIL` when any required mapping, standard, structure, rigor, visual, assessment, LMS, accreditation, or compliance requirement is not met.

Never use casual terms such as "clean," "done," "student ready," or "complete" unless the relevant audit gates have passed.
