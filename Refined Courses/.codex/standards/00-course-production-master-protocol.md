# MLA Course Production Master Protocol

## Purpose

This file is the master operating protocol for building, auditing, correcting, and certifying MLA2026 courses. Every main agent and subagent must read this protocol before working on a course.

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
10. Assessments must be Moodle-ready GIFT, UTF-8 plain text, and mechanically valid.
11. Correct answers must not follow a predictable answer pattern.
12. Feedback must be teachable feedback, not short right/wrong labels.
13. External resources and simulations are suggestions only unless explicitly approved for insertion.
14. Reports and prior audits are useful context but never override direct validation of current files.
15. Standards, accreditation readiness, and compliance readiness must be maintained from the start of production, not added at the end.

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
11. Audit external resources and simulations.
12. Make only approved corrections.
13. Re-validate current files directly.
14. Run unit completion audit after each completed unit.
15. Run final course completion audit after all units pass.
16. Produce final PASS/FAIL report.

## PASS Requirements

A course cannot receive PASS unless:

- Unit and lesson sequence match certified mapping.
- Every required file exists and is non-empty where content is required.
- Every lesson has `lesson.json`, `quiz.json`, and `P01.html` through `P07.html`.
- Standards are included or traceable in every lesson.
- Lesson 8 in every unit functions as synthesis.
- P04, P06, and P07 meet page-specific requirements.
- Assessments meet count, syntax, feedback, standards, and answer-pattern requirements.
- Necessary visuals or representations are present or reported for approval.
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
