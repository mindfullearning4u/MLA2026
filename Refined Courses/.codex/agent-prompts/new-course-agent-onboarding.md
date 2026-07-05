# New Course Agent Onboarding

## Purpose

Use this prompt whenever a new agent starts work on a specific course. The agent must inherit the same production expectations used across MLA2026 course development.

## Required First Action

Before auditing, building, correcting, or certifying the course, read:

- `.codex/standards/00-course-production-master-protocol.md`
- `.codex/standards/01-initial-mapping-analysis-protocol.md`
- `.codex/workflows/course-build-workflow.md`
- `.codex/workflows/unit-completion-audit-workflow.md`
- `.codex/workflows/course-completion-audit-workflow.md`
- `.codex/workflows/moodle-lesson-transfer-workflow.md` when Moodle lesson transfer is requested
- `.codex/agent-prompts/lesson-developer-agent.md` when lesson pages are being built, expanded, or repaired
- `.codex/agent-prompts/assessment-developer-agent.md` when assessments are being built, converted, expanded, or repaired
- all relevant subagent prompts in `.codex/agent-prompts/`

Then locate and read the course crosswalk, standards inventory, unit mapping, lesson mapping, course overview, lesson JSON, quiz JSON, lesson pages, and assessment files.

Before any coursewide audit or certification claim, create an explicit subagent coverage plan. The plan must name each unit and each audit category. Do not proceed as if a single whole-course scan, script run, or main-agent-only review is enough.

## Non-Negotiable User Requirements

The user requires precision, accuracy, consistency, strict standards alignment, accreditation readiness, and compliance readiness from the beginning of production.

Every course must follow the approved unit mapping and lesson mapping. No lesson, page, assessment, question, visual, or standard may drift from the mapping.

Every mapped standard must be:

- taught in the assigned lesson
- visible or traceable in lesson files
- assessed in the appropriate guided practice, quiz, pretest, or unit assessment structure
- documented in audit evidence

No mapped standard may be missing. No assessment may ask outside the approved lesson or unit mapping.

## Instructional Quality Requirement

Lessons must teach like a veteran teacher in an asynchronous mastery course. The student has no live teacher in the moment, so the lesson must be detailed, sequential, clear, and self-contained.

The agent must check:

- step-by-step explanation
- why each step is done
- prerequisite support
- likely student confusion
- common mistakes with teachable correction
- visuals, tables, graphs, number lines, diagrams, models, or data displays when a veteran teacher would show them
- no ambiguity
- no skipped reasoning

When the task is lesson creation, lesson repair, or lesson rigor expansion, the agent must use `.codex/agent-prompts/lesson-developer-agent.md`. Auditor prompts are not enough for development work.

## Assessment Requirement

Assessments must be Moodle-ready and aligned question by question.

Use Moodle XML for every production assessment in every course. GIFT is legacy/source material only and is not sufficient for production assessment delivery.

Every assessment question must be checked for:

- correct unit/lesson mapping
- correct standard
- correct content scope
- four answer choices
- one correct answer
- no answer pattern
- teachable feedback
- required visual/table/diagram/data display embedded directly in the question

When the task is assessment creation, Moodle XML conversion, question repair, feedback repair, or assessment visual insertion, the agent must use `.codex/agent-prompts/assessment-developer-agent.md`. Auditor prompts are not enough for development work.

## Subagent Structure

For full course production, major repair, recertification, or coursewide audit, the main agent must coordinate layered audits with ALG1-level rigor:

- one instructional rigor auditor per unit
- one structure/workflow auditor per unit
- one assessment alignment auditor per unit
- one assessment visual/XML auditor per unit
- one metadata/LMS-format auditor per unit
- resource/simulation auditor when relevant, and always for science/lab courses
- cross-checking verification auditor layer
- final certification auditor after all fixes and reruns

Subagents must cite mapping evidence and current-file evidence. A PASS without evidence is invalid. If a subagent reports something missing or weak, the main agent must inspect the exact current file, make the necessary fix when the finding is valid, rerun the relevant audit, and document the correction.

For a six-unit course, the minimum expected audit evidence is unit-by-unit and category-by-category:

- Unit 01 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- Unit 02 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- Unit 03 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- Unit 04 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- Unit 05 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- Unit 06 instructional rigor, structure/workflow, assessment alignment, assessment visuals/XML, metadata/LMS
- cross-course mapping/source verification
- cross-course subagent-miss verification
- final certification

Do not tell the user a course has the same rigor as ALG1 unless this layered evidence exists.

## Certification Rule

Do not call the course clean, complete, student ready, production ready, certified, or PASS unless all required gates pass.

Any missing mapped standard, missing assessment coverage, missing mandatory visual, out-of-mapping lesson content, out-of-mapping assessment question, malformed Moodle file, weak feedback, broken structure, empty required file, or unsupported PASS claim is a blocker.

## Moodle Lesson Transfer Requirement

When the user asks to transfer, load, copy, update, or paste lesson pages into Moodle, the agent must read:

- `.codex/workflows/moodle-lesson-transfer-workflow.md`
- `Codex Moodle Transfer Instructions/TRANSFER_LESSONS_TO_MOODLE.md`

The Moodle transfer standard controls the workflow. Do not improvise transfer steps. Do not use Moodle import, GIFT, or XML for lesson page transfer. Do not transfer `P05.html` unless explicitly requested. Save, verify, and log each Moodle page transfer.
