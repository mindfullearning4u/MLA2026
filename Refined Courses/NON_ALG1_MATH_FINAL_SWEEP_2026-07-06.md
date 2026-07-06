# Non-ALG1 Math Final Sweep

Date: 2026-07-06

Scope: ALG2, GEOMETRY, STATISTICS, PRECALCULUS, and Math for College Readiness.

Excluded: ALG1. ALG1 is intentionally excluded because another agent is actively transferring ALG1 assessments to Moodle.

## Controls Applied

- Moodle transfer was not performed.
- ALG1 files were not intentionally inspected or edited.
- Lesson pages were checked against the asynchronous instruction boundary.
- Teacher-led wording and TOR-dependency wording were mechanically scanned and corrected where safe.
- Existing lesson-depth and Moodle XML visual-gate tools were rerun.
- Course-specific read-only subagents audited each non-ALG1 math course.

## Safe Corrections Made

- Replaced recurring `Ask for help as soon as you need it` language with `After reviewing the lesson steps and examples, ask for help if you are still unsure`.
- Replaced Geometry `Read this as your teacher modeling...` wording with student-facing modeling language.
- Replaced `Teacher-Guided Thinking` headings with `Student-Guided Thinking`.
- Replaced `Teacher move` labels with `Mastery move`.
- Tightened Geometry TOR support wording so the TOR suggests support/practice options instead of functioning as a teacher check.
- Tightened Math for College Readiness and related TOR wording that implied `guidance`, `another explanation`, or TOR decision-making during learning.
- Corrected MCR `P05 Independent Work & Checkpoint` labels to `P05 Guided Practice`.
- Updated `.codex/tools/audit-course-lesson-rigor.ps1` so it recognizes both `P02.html` and `P02_...html` naming patterns and writes readable report rows.

## Current Mechanical Audit Results

| Course | Lesson depth audit | Pages below threshold | Assessment visual gate | Mandatory assessment visuals missing |
|---|---:|---:|---:|---:|
| ALG2 | FAIL | 128 | FAIL | 23 |
| GEOMETRY | PASS | 0 | PASS by mechanical visual gate | 0 |
| STATISTICS | FAIL | 148 | FAIL | 53 |
| PRECALCULUS | FAIL | 58 | PASS by mechanical visual gate | 0 |
| Math for College Readiness | FAIL | 79 | FAIL | 19 |

## Subagent Findings That Remain Blockers

### ALG2

- P04 worked-example explanations remain too generic across the course and need lesson-specific veteran-teacher worked examples.
- Several P05 files still need exact standards traceability review.
- Assessment XML has graph/scatterplot/residual visual gaps.
- Unit 6 assessment XML should be render-checked for superscript math display in Moodle.

### GEOMETRY

- Teacher-led wording was corrected mechanically.
- Remaining instructional blocker from subagent review: P04/P06 content is still too templated in many lessons and needs lesson-specific worked examples and self-contained independent work.
- Subagent reported possible XML asset/readiness concerns that require Moodle import/render verification even though the mechanical visual gate passed.
- Subagent reported possible corrupted exponent rendering in some circle-equation XML that needs targeted XML/render review.

### STATISTICS

- Lesson-depth audit still fails.
- Some P04 pages have compressed or reused explanations that need lesson-specific expansion.
- P05 page-model inconsistencies remain where visible guided-practice questions are embedded instead of a Moodle Guided Practice reference page.
- `quiz.json` metadata still points to GIFT in places even though Moodle XML is the production format.
- Assessment XML has missing table/stimulus visuals in table-dependent questions.

### PRECALCULUS

- Lesson-depth audit still fails after the filename-aware audit tool correction.
- Unit 04 Lesson 03 has mapping/task drift: mapped parabola content conflicts with ellipse/foci visuals and tasks.
- Lesson 08 quiz Moodle XML appears missing across units if Lesson 8 lesson quiz evidence is required by the mapping.
- Several representation-heavy XML banks need targeted visual review even though the mechanical visual gate passed.

### Math for College Readiness

- TOR boundary wording was corrected mechanically.
- Lesson-depth audit still fails.
- Lesson quiz XML banks are undercounted at 20 questions where the standard requires 25 unless a course-specific exception is approved.
- Unit 6 assessment XML includes finance contexts/standards that appear outside the Unit 6 measurement/modeling/applied geometry mapping.
- Assessment XML has missing visuals/stimulus in table/display-dependent questions.

## Decision

BLOCKED for Moodle transfer for ALG2, GEOMETRY, STATISTICS, PRECALCULUS, and Math for College Readiness until the remaining course-specific blockers above are corrected and rerun.

GEOMETRY is improved by the wording corrections and passes the mechanical depth/visual gates, but it is not certified because subagent findings still identify lesson-specific P04/P06 and XML-render readiness concerns.

