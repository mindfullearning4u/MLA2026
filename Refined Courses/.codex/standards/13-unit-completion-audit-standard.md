# Unit Completion Audit Standard

## Purpose

Run this audit after each unit is built or corrected. A unit is not complete until it passes structure, mapping, instructional, visual, assessment, metadata, LMS, resource, accreditation, and compliance checks.

## Required Timing

Use this audit:

- before moving from one unit to the next
- after any unit-level correction pass
- before full course certification

Standards, accreditation readiness, and compliance must be checked during production, not saved for the end.

## Required Sources

Use:

1. Course Overview
2. Standards Inventory or Crosswalk
3. Unit Mapping
4. Lesson Mapping
5. Existing lesson objectives
6. Current unit files
7. Current assessment files
8. `.codex/standards/*`

Do not use `Unit Overview.md` as a source of truth.

## Unit Inventory Checks

Verify:

- Unit folder exists.
- Lessons 01-08 exist.
- Unit Pretest exists.
- Lesson 01-07 Guided Practice files exist.
- Lesson 01-07 Lesson Quiz files exist.
- Lesson 08 Guided Practice exists.
- Lesson 08 Unit Assessment exists.
- No required lesson folder is missing.
- No required assessment file is missing.

## Lesson File Checks

For every lesson:

- `lesson.json` exists.
- `lesson.json` is non-empty.
- `lesson.json` is valid JSON.
- `quiz.json` exists.
- `quiz.json` is non-empty.
- `quiz.json` is valid JSON.
- `P01.html` through `P07.html` exist.
- Page files are not empty.
- Page names are exact.
- No page is duplicated or skipped.

## Mapping and Standards Checks

For every lesson:

- Lesson title matches approved lesson mapping.
- Lesson purpose matches approved lesson mapping.
- Primary standards match approved mapping.
- Support standards are not treated as unauthorized primary standards.
- Standards appear or are traceable in lesson files.
- Every mapped standard is explicitly taught in the assigned lesson pages.
- Every mapped standard has assessment evidence in that lesson or unit assessment structure.
- Every guided practice and lesson quiz question traces to the lesson mapping.
- Every pretest and unit assessment question traces to the unit mapping.
- No future-unit content appears.
- No future-lesson content appears in lesson-specific assessments.
- No unauthorized standards appear.
- No off-topic drift appears.
- Mapping evidence is cited for every PASS decision.

Mapping failures are blockers. Do not mark a unit PASS or PASS WITH SUGGESTIONS if any mapped standard is missing from instruction or assessment, or if an assessment question reaches outside the approved mapping.

## Page Model Checks

For every lesson:

- P01 has overview, standards, learning goals, mastery evidence, and TOR support.
- P02 has notebook title, vocabulary, and detailed instruction.
- P03 continues detailed instruction and includes common mistake support.
- P04 has exactly three worked examples.
- P04 has step-by-step explanation.
- P04 has common mistake, incorrect red example, correct green example, and teachable explanation.
- P05 aligns with Guided Practice and does not display backend filenames.
- P06 has Instructions, Part A, Part B, Part C, and actual tasks.
- P07 has TOR graded language, submission workflow, checkpoint task, mastery criteria, 80% requirement, intervention, and resubmission language.

## HTML and LMS Checks

For every page:

- HTML is Moodle-safe.
- Inline styling follows department model.
- Containers are balanced.
- No empty containers.
- No text sits outside intended containers.
- Exactly one TOR support box appears.
- No visible `.gift` filename appears.
- No broken layout.
- No malformed character corruption.
- Page headings match page role.

## Visual Checks

For every page:

- Visuals are mathematically or instructionally necessary.
- Visuals are not decorative placeholders.
- Required tables, graphs, number lines, diagrams, passages, or data displays are present.
- Graphs have axes, labels, tick marks, plotted points, and mathematical accuracy when required.
- Visual appears near the example/task it supports.
- Missing useful visuals are listed for approval when content is locked.

## Assessment Checks

For every assessment file:

- File is `.gift`.
- File is UTF-8 plain text.
- File contains no HTML.
- Moodle GIFT syntax is valid.
- Guided Practice has required count.
- Lesson Quiz has required count.
- Unit Pretest has required count.
- Unit Assessment has required count.
- Every question has exactly four choices.
- Every question has exactly one correct answer.
- Every question displays a standard or approved support note.
- Feedback exists for every answer choice.
- Feedback is teachable.
- No duplicate stems.
- No duplicate answer choices.
- No answer pattern.
- Visual necessity is checked question by question.
- Question-to-mapping alignment is checked question by question.
- Missing assessment coverage for mapped standards is checked.

## Resource and Simulation Checks

For every unit:

- Free external resources were reviewed.
- Simulations were reviewed.
- Science lab simulations were reviewed when applicable.
- Suggested resources are listed for approval only.
- No external links were inserted without approval.

## Unit Audit Output

Create or recommend:

`[COURSE]/Course Audit/[COURSE]_U##_UNIT_COMPLETION_AUDIT.md`

Required sections:

1. Unit reviewed
2. Source files used
3. Mapping trace result
4. Structure result
5. Lesson page result
6. Instructional rigor result
7. Visual result
8. Assessment result
9. Assessment visual result
10. JSON/metadata result
11. HTML/LMS result
12. Resource/simulation suggestions
13. Accreditation/compliance readiness result
14. Remaining issues
15. Final decision: PASS, PASS WITH SUGGESTIONS, or FAIL
