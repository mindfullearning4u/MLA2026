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
10. Assessments must be Moodle-ready Moodle XML and mechanically valid. Moodle XML is required for every production assessment in every course. GIFT is legacy/source material only and is not a production assessment format.
11. Correct answers must not follow a predictable answer pattern.
12. Feedback must be teachable feedback, not short right/wrong labels.
13. External resources and simulations are suggestions only unless explicitly approved for insertion or explicitly required by the user for the course/scope. For science/lab courses, the user has already explicitly required exact direct links for free, student-safe, directly aligned resources from trusted sources. When approved or required, the lesson must include the exact direct clickable URL to the specific activity/resource, not a provider homepage or search page. Ask for approval only when a resource requires login, payment, special hardware, unsafe activity, non-public access, questionable source quality, or uncertain alignment.
14. Reports and prior audits are useful context but never override direct validation of current files.
15. Standards, accreditation readiness, and compliance readiness must be maintained from the start of production, not added at the end.
16. Every lesson, page, assessment question, visual, standard, and activity must trace to the approved unit mapping and lesson mapping.
17. No mapped standard may be missing from instruction or assessment evidence.
18. No assessment may ask questions outside the approved lesson or unit mapping.
19. Math lessons and assessments must include veteran-teacher-style visuals, tables, graphs, number lines, diagrams, and data displays wherever they clarify the concept, remove ambiguity, or are warranted by the question.
20. Social studies and social science lessons and assessments must include embedded maps, timelines, charts, tables, source excerpts, source organizers, political/civic visuals, data displays, or other visual/source supports wherever they clarify the concept, remove ambiguity, or are required to answer the task or question. Social studies simulations are not required by default.
21. A course, unit, lesson, or assessment cannot be called clean, complete, student ready, production ready, certified, or PASS unless all blocking gates pass from direct current-file inspection.
22. Moodle lesson transfer must follow `.codex/workflows/moodle-lesson-transfer-workflow.md` and `Codex Moodle Transfer Instructions/TRANSFER_LESSONS_TO_MOODLE.md`. Do not improvise Moodle transfer steps.
23. Lesson content development and assessment development must use developer prompt files, not audit-only prompt files.
24. Moodle transfer is a post-certification action only. Do not transfer lessons to Moodle until lesson development passes, assessment development passes, and the final course audit/certification gate passes with evidence.
25. Lessons must not rely on teacher-led instruction, teacher checks, or teacher guidance. The lesson pages must teach the content. Teacher of Record language is allowed only for support, intervention, checkpoint, submission, clarification, retake, and workflow decisions.
26. Lessons and assessments must stay within the approved course standards, unit mapping, and lesson mapping. No outside-standard content, future-unit content, future-lesson content, or unmapped content may be taught or assessed unless explicitly allowed by the approved mapping.
27. Course credit value controls lesson count. A 1.0-credit course uses 6 units with 8 lessons per unit. A 0.5-credit course uses 6 units with 5 lessons per unit. For 0.5-credit courses, Lesson 5 is the synthesis/unit-assessment lesson, includes Guided Practice and Unit Assessment, and must not have a Lesson Quiz. Lessons 1-4 have lesson quizzes.

## Main Agent Responsibility

The main agent is responsible for the final quality of the course. Subagents provide evidence, but the main agent must verify that subagents followed the standards and did not miss required mapping, rigor, structure, assessment, visual, LMS, or compliance checks.

The main agent may use scripts and tools for mechanical validation, but tool output does not replace the required subagent audit model for full course production, major repair, recertification, or any user request to audit a course. Every course must receive the ALG1-level audit structure unless the user explicitly asks for a limited, narrow check.

The main agent must distinguish development prompts from audit prompts:

- Use `.codex/agent-prompts/lesson-developer-agent.md` when creating, expanding, or repairing lesson pages.
- Use `.codex/agent-prompts/assessment-developer-agent.md` when creating, converting, expanding, or repairing assessment files.
- Use auditor prompts only for independent review, evidence, and PASS/FAIL decisions.

If a subagent identifies a missing item, unclear lesson, missing visual, mapping drift, weak assessment, metadata defect, or compliance issue, the main agent must inspect the current file directly and either fix the issue or document why it is not a valid finding. The main agent must not merely summarize subagent findings without acting on confirmed defects.

The main agent must reject any subagent report that:

- does not cite the approved unit and lesson mapping
- does not inspect current files directly
- gives a PASS without evidence
- treats missing mandatory visuals as suggestions
- treats missing mapped standards as suggestions
- relies on old Unit Overview files as source of truth
- validates only file existence instead of content quality and alignment

## Layered Subagent Audit Model

For full course production, major repair, recertification, or coursewide audit, layered subagent audits are mandatory. A main agent must not replace these audits with only scripts, spot checks, or a single whole-course read.

Required unit/category audit grid:

1. Unit instructional rigor auditor for each unit.
2. Unit structure/workflow auditor for each unit.
3. Unit assessment alignment auditor for each unit.
4. Unit assessment visual/XML auditor for each unit.
5. Unit metadata/LMS-format auditor for each unit.
6. Resource/simulation auditor when the course or unit would benefit from external practice, and always for science/lab courses.
7. Cross-checking verification auditor layer to review whether the unit/category subagents missed mapping, rigor, visual, structure, workflow, assessment, LMS, or compliance defects.
8. Final certification auditor only after all unit and category gates pass.

Each unit-level and category-level subagent must check the approved unit mapping and lesson mapping. Every PASS decision must cite evidence. A PASS without mapped standard evidence, lesson-file evidence, assessment-file evidence, and current-file inspection is invalid.

For a six-unit course, the minimum audit coverage is:

- six instructional rigor audits, one per unit
- six structure/workflow audits, one per unit
- six assessment alignment audits, one per unit
- six assessment visual/XML audits, one per unit
- six metadata/LMS-format audits, one per unit
- one cross-course mapping and source analysis
- one cross-course verification audit checking subagent misses
- one final certification audit after fixes and reruns

The main agent may group units into parallel subagent assignments only when the assignment still names the units and category explicitly and produces unit-by-unit findings. Broad statements such as "Geometry looks good" or "course passed" are not acceptable evidence.

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

## Moodle Lesson Transfer Boundary

When the user asks to transfer, load, copy, paste, or update lesson pages in Moodle, the Moodle lesson transfer standard controls the work.

Moodle transfer must not begin until all required production gates are complete:

- lesson developer work has passed for the assigned course/unit/lesson scope
- assessment developer work has passed for the assigned course/unit/lesson scope
- required unit audits have passed
- required course completion/final certification audit has passed
- any confirmed defects from lesson, assessment, structure, visual, mapping, metadata, or LMS audits have been fixed and rerun

If any of these items are missing, incomplete, unsupported by evidence, or still FAIL, the agent must stop and complete the development/audit work before Moodle transfer.

Required transfer files:

- `Codex Moodle Transfer Instructions/TRANSFER_LESSONS_TO_MOODLE.md`
- `.codex/workflows/moodle-lesson-transfer-workflow.md`

Mandatory transfer rules:

- repository lesson HTML is the source of truth
- Moodle is the destination
- one course has one active transfer owner at a time
- one transfer owner uses one dedicated Moodle browser session
- standard page transfer scope is `P01.html`, `P02.html`, `P03.html`, `P04.html`, `P06.html`, and `P07.html`
- `P05.html` is excluded unless the user explicitly requests it
- no Moodle page, Moodle activity, course section, Moodle file, quiz, question bank, or repository file may be deleted
- every saved Moodle page must be verified and logged

Lesson transfer to Moodle is not assessment import. Do not use Moodle import, GIFT, or XML for lesson page transfer.

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
17. Fix every confirmed subagent finding or document why it is invalid.
18. Rerun the affected unit/category audits after fixes.
19. Run final course completion audit after all units pass.
20. Produce final PASS/FAIL report.

## PASS Requirements

A course cannot receive PASS unless:

- Unit and lesson sequence match certified mapping.
- Every mapped standard is taught in the assigned lesson.
- Every mapped standard has appropriate assessment evidence.
- Every assessment question traces to the approved lesson or unit mapping.
- Every required file exists and is non-empty where content is required.
- Every lesson has `lesson.json`, `quiz.json`, and `P01.html` through `P07.html`.
- Standards are included or traceable in every lesson.
- The final lesson in every unit functions as synthesis. For 1.0-credit courses this is Lesson 8; for 0.5-credit courses this is Lesson 5.
- P04, P06, and P07 meet page-specific requirements.
- Assessments meet count, format, syntax, feedback, standards, mapping, visual, and answer-pattern requirements.
- Mandatory visuals or representations are present directly in lessons and assessment questions where needed.
- Social studies/social science courses have embedded source and visual supports where required by the standard, task, or question; external simulations are not required unless explicitly directed or mapped.
- Science lab/simulation review is complete when applicable, and approved or required resources include exact direct clickable URLs.
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
