# Academy Standard: Transfer Lessons to Moodle

This is the required standard operating procedure for transferring repository lesson pages into Moodle.

An agent must read this entire file before performing any Moodle lesson transfer. The agent must follow this procedure exactly. Do not improvise, skip steps, change the page map, use a different paste method, or save uncertain work.

## Trigger Phrases

Use this standard whenever the user says a phrase like:

- "transfer lessons to Moodle"
- "transfer course lessons to Moodle"
- "update unit lessons with the most up to date lessons from the repo"
- "load the lesson pages from the repo"
- "copy the repo lesson pages to Moodle"
- "update Unit # Lesson # in Moodle"
- "load overview, notebook, worked example, independent work, and checkpoint"

This standard applies to all courses in the repository, not only Algebra 1.

## Required Pre-Transfer Gate

Moodle lesson transfer happens only after course production is ready.

An agent must not transfer lesson pages into Moodle until the following are all true for the requested scope:

1. Lesson developer work has been completed and passed using `.codex/agent-prompts/lesson-developer-agent.md`.
2. Assessment developer work has been completed and passed using `.codex/agent-prompts/assessment-developer-agent.md`.
3. Required unit audits have passed with mapping evidence and current-file evidence.
4. The final course audit/certification gate has passed when the transfer scope is a full course.
5. All confirmed defects from lesson rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS, mapping, and final audit have been fixed and rerun.

If any item above is missing, incomplete, unsupported by evidence, or FAIL, stop. Do not begin Moodle transfer. The main agent must complete or coordinate the missing development, correction, and audit work first.

## Required Outcome

The required outcome is that the correct existing Moodle lesson pages contain the exact current HTML source from the matching repository lesson files.

The repository is the source of truth. Moodle is the destination.

The agent must:

1. Identify the correct course.
2. Identify the correct unit.
3. Identify the correct lesson.
4. Identify the correct existing Moodle activity.
5. Match each Moodle lesson page to the correct repository HTML file.
6. Replace the Moodle page source code with the repository HTML source code.
7. Save each Moodle page.
8. Verify each saved page.
9. Record each transfer in a Moodle upload log.

## Non-Negotiable Safety Rules

The agent must obey these rules with no exceptions:

- One Moodle browser session must belong to one active transfer agent at a time.
- One course must have one assigned transfer owner at a time.
- No agent may edit a course, unit, lesson, or Moodle page assigned to another active agent.
- Do not delete Moodle pages, Moodle activities, Moodle course sections, Moodle files, Moodle question banks, Moodle quizzes, or repository files.
- Do not create new Moodle pages unless the user explicitly asks for new pages.
- Do not use Moodle import for lesson page transfers.
- Do not use GIFT for lesson page transfers.
- Do not use XML for lesson page transfers.
- Do not paste into the normal rich text editor as the final transfer method.
- Do not save a Moodle page when the course, unit, lesson, page title, or repo file is uncertain.
- Do not assume that a similarly named page is correct. Confirm the course, unit, lesson, activity, and page title.
- Do not transfer `P05.html` unless the user explicitly asks for page 5.
- Do not alter repository lesson HTML while transferring to Moodle. Read repo files only.
- Do not continue after an error as if the page saved successfully.
- Do not mark a page complete until Moodle `Save page` has been clicked and the saved result has been verified.

When this standard says "delete old source code," it means delete only the existing HTML inside the Moodle source-code editor for the specific page being edited. It never means deleting a Moodle page, activity, section, quiz, question bank, file, or repository file.

## Multi-Agent Course Transfer Model

Multiple agents may work at the same time only when their work is separated by course and browser session.

The main agent is responsible for orchestration. The main agent must assign each course to a specific transfer agent before Moodle editing begins.

Required multi-agent structure:

| Role | Responsibility | Moodle access |
| --- | --- | --- |
| Main agent | Assigns courses, enforces this standard, reviews reports, gives final pass/fail to the user | May inspect any course, but should not edit a course assigned to another active transfer agent |
| Course transfer agent | Transfers one assigned course only | Uses its own dedicated Moodle browser session |
| Course audit agent | Audits one assigned course after transfer | Uses its own review session or evidence provided by the transfer agent |
| Unit build or prep agent | Checks or prepares repository files for assigned units | No Moodle editing unless separately assigned as transfer agent |

Each active transfer agent must have:

- One assigned course.
- One dedicated Moodle browser session.
- One course repository folder.
- One course Moodle upload log.
- A clear list of assigned units and lessons.

Parallel Moodle editing is allowed only across different courses. Parallel editing inside the same course is not allowed unless the user explicitly creates a course-level locking plan and assigns non-overlapping units, lessons, logs, and browser sessions.

Preferred academy rule:

```text
One course = one active Moodle transfer agent = one browser session = one upload log owner.
```

Agents must not share the same Moodle browser tab, editor session, unsaved page, or upload log edit at the same time.

Before a transfer agent begins, the main agent must record or state the assignment:

```text
Assigned agent: <agent name or identifier>
Assigned course: <course name>
Repository course folder: <path>
Moodle course URL: <url>
Assigned units/lessons: <scope>
Browser/session: <dedicated session identifier if available>
Upload log: <path>
```

If two agents appear to be working in the same Moodle course or same browser session, stop immediately and ask the user how to proceed.

## Subagent Role Requirements

The main agent must define each subagent's role before work begins. A subagent may perform only the role and scope assigned by the main agent.

### Main Agent

The main agent is the course-transfer manager. The main agent must:

1. Read this entire standard before assigning work.
2. Identify the requested courses.
3. Identify each course repository folder.
4. Identify each Moodle course URL.
5. Assign one active transfer owner per course.
6. Assign prep/build agents by course, unit, or lesson as needed.
7. Assign audit agents after prep/build or transfer work is complete.
8. Review all subagent reports.
9. Resolve all discrepancies before Moodle transfer or final certification.
10. Maintain or verify the course upload log.
11. Give the user the final pass/fail report.

The main agent must not accept vague subagent updates such as "done," "looks good," or "completed." Every subagent report must include evidence, paths, Moodle identifiers where applicable, and any unresolved concerns.

### Course Transfer Agent

A course transfer agent performs Moodle edits for one assigned course only.

The course transfer agent must:

1. Read this entire standard.
2. Work only in the assigned Moodle course.
3. Use only the assigned dedicated browser session.
4. Use only the assigned repository course folder.
5. Transfer only the assigned units and lessons.
6. Follow the required page map exactly.
7. Save each Moodle page before moving to the next page.
8. Verify each saved page.
9. Log each saved page immediately.
10. Report completion, blockers, and verification status to the main agent.

The course transfer agent must not edit another course, another agent's assigned Moodle page, or an unassigned unit or lesson.

### Unit Build or Prep Agent

A unit build or prep agent works in the repository only unless separately assigned as a transfer agent.

The unit build or prep agent must:

1. Read this standard's source-of-truth, page-map, and naming sections.
2. Work only in the assigned course and unit.
3. Confirm that each assigned lesson folder exists.
4. Confirm that each assigned lesson has the required transfer files:
   - `P01.html`
   - `P02.html`
   - `P03.html`
   - `P04.html`
   - `P06.html`
   - `P07.html`
5. Confirm that the files are in the correct course, unit, and lesson path.
6. Report missing files, naming problems, duplicate lesson folders, or suspected content mismatches.
7. Avoid changing Moodle.

If the user or main agent asks the prep agent to repair repository lesson files, the prep agent must follow the course content standards for that course and must report every repository file changed.

### Unit Audit Agent

A unit audit agent verifies repository readiness for an assigned course unit.

The unit audit agent must:

1. Be independent from the agent that built or prepared the same unit whenever possible.
2. Read this standard.
3. Check every assigned lesson folder against the required page map.
4. Confirm that course, unit, lesson, and page filenames align.
5. Confirm no required transfer page is missing.
6. Confirm `P05.html` is not included in the standard transfer scope unless explicitly requested.
7. Report pass/fail by lesson.
8. Report every discrepancy with exact file paths.

The unit audit agent must not certify a unit by sampling only some lessons unless the main agent explicitly assigned a sampling audit. The academy standard expectation is full coverage.

### Course Audit Agent

A course audit agent verifies a completed Moodle transfer for one assigned course.

The course audit agent must:

1. Read this entire standard.
2. Review the course upload log.
3. Confirm each logged row has course, unit, lesson, Moodle activity, Moodle page, page ID if visible, repository file, save status, and verification notes.
4. Confirm every required page in the assigned scope is logged.
5. Confirm the repository file paths in the log match the Moodle course, unit, lesson, and page map.
6. Inspect Moodle pages or provided evidence to confirm saved content and styling were preserved.
7. Report pass/fail by unit and lesson.
8. Identify any missing, mismatched, unverified, or suspicious transfer.

The course audit agent must not be the only reviewer of its own transfer work. If the same agent performed the transfer and audit due to limited staffing, the final report must say that the audit was not independent.

## Required Subagent Assignment Format

The main agent must give each subagent a written assignment using this format:

```text
Role: <Main / Course Transfer / Unit Prep / Unit Audit / Course Audit>
Assigned course: <course name>
Repository course folder: <absolute path>
Moodle course URL: <url, if Moodle access is required>
Assigned unit(s): <unit numbers or all>
Assigned lesson(s): <lesson numbers or all>
Allowed actions: <repo read / repo edit / Moodle inspect / Moodle edit / log update>
Not allowed: <specific boundaries>
Required standard: Codex Moodle Transfer Instructions\TRANSFER_LESSONS_TO_MOODLE.md
Required output: <report type>
```

No subagent should begin work from a vague request such as "work on Unit 1." The assignment must include course, unit, scope, allowed actions, and expected output.

## Required Subagent Report Format

Each subagent must report back using a structured report.

Required report format:

```markdown
## Subagent Report

Role:
Assigned course:
Assigned scope:
Repository folder:
Moodle course URL, if used:
Browser/session, if used:

### Work Completed
| Unit | Lesson | Page/File | Status | Evidence |
| --- | --- | --- | --- | --- |

### Discrepancies
| Unit | Lesson | Issue | Evidence | Required decision |
| --- | --- | --- | --- | --- |

### Files Changed
| File | Change made |
| --- | --- |

### Moodle Pages Edited
| Moodle activity | Moodle page | Page ID | Repository file | Saved | Verified |
| --- | --- | ---: | --- | --- | --- |

### Final Status
Pass/Fail:
Reason:
Open items:
```

If a section does not apply, the subagent must write `Not applicable`. The subagent must not omit sections.

## Multi-Agent Build, Transfer, and Audit Sequence

For academy-scale work, use this sequence:

1. Main agent reads this standard.
2. Main agent identifies all courses requested by the user.
3. Main agent assigns each course to one transfer owner.
4. Unit build or prep agents validate repository files for their assigned units.
5. Curriculum development agents correct any repository lesson files that are incomplete, inaccurate, misaligned, or not ready for Moodle.
6. Unit audit agents verify that corrected repository lesson files meet the required course and lesson standards.
7. Course transfer agents transfer Moodle pages course by course using this standard.
8. Course audit agents audit completed transfers against this standard.
9. Main agent reviews all transfer logs and audit reports.
10. Main agent gives the user a final course-level pass/fail report.

Build/prep agents and audit agents should be separate when possible. An agent should not be the only auditor of its own transfer work.

The main agent must not report that a course passed lesson transfer until:

- All required repository files exist for the requested scope.
- All required repository files have passed curriculum readiness review.
- All required Moodle pages were transferred.
- Every transfer is logged.
- Every logged transfer was verified.
- A post-transfer audit found no unresolved course, unit, lesson, page, source, or formatting discrepancies.

## Curriculum Development Quality Gate

Moodle transfer must not begin until the repository lesson files are ready. The agent must not assume that a file is correct simply because it exists.

Before Moodle transfer, every required repository file in the transfer scope must pass a curriculum readiness review.

Required curriculum readiness checks:

- The file is in the correct course, unit, and lesson folder.
- The file name matches the required page map.
- The content matches the intended lesson page purpose.
- The math, instructions, examples, questions, and student tasks are complete.
- The content is not a placeholder, draft note, duplicate from another lesson, or copied from the wrong unit.
- The page title, headings, and internal references match the correct course, unit, and lesson.
- The formatting, boxes, colors, and layout are present in the HTML source.
- The visual design, structure, and student workflow are consistent with the academy standard for that course.
- The content follows the applicable course curriculum and instructional standards.
- The page does not contain obvious broken markup, missing sections, or unfinished editor notes.

If any repository lesson file fails curriculum readiness, the main agent must stop the Moodle transfer for that file, lesson, or unit and assign a curriculum development agent to correct the repository content first.

The transfer agent must not fix curriculum content inside Moodle. Corrections must be made in the repository first, then transferred from the corrected repository source into Moodle.

## Curriculum Development Agent

A curriculum development agent edits, revises, and corrects repository lesson content before Moodle transfer.

The curriculum development agent must:

1. Work only in the assigned course, unit, and lesson repository files.
2. Correct incomplete, inaccurate, misaligned, duplicated, or unfinished lesson content.
3. Preserve the required page map and filenames.
4. Preserve or improve HTML structure, styling, boxes, colors, and layout.
5. Ensure internal lesson references match the correct course, unit, and lesson.
6. Report every file changed.
7. Report the reason each file was changed.
8. Mark the corrected files ready for independent audit.

The curriculum development agent must not edit Moodle unless separately assigned as a course transfer agent.

Required curriculum development report format:

```markdown
## Curriculum Development Report

Assigned course:
Assigned unit:
Assigned lesson(s):
Repository folder:

### Files Corrected
| File | Issue found | Correction made | Ready for audit |
| --- | --- | --- | --- |

### Remaining Concerns
| File | Concern | Needed decision |
| --- | --- | --- |

### Final Status
Ready for audit / Blocked:
Reason:
```

After curriculum development work is complete, a separate audit agent must review the corrected repository files before Moodle transfer begins.

## Visual, Structure, and Workflow Consistency Gate

Content accuracy alone is not enough for Moodle transfer. A lesson page must also look, read, and flow consistently with the academy standard.

The lesson transfer agent must check visual, structure, and workflow consistency before transferring a page and again after saving it in Moodle.

Required consistency checks:

- Page structure follows the expected page type.
- Headings are clear, consistent, and in the correct order.
- Student directions are complete and easy to follow.
- The page has the expected boxes, sections, callouts, examples, prompts, or task areas for that page type.
- Visual styling is consistent with nearby lessons in the same course.
- Colors, borders, spacing, and box treatments are preserved from the repository HTML.
- The student workflow is logical from top to bottom.
- The page does not feel like a draft, fragment, template stub, or mismatched copy from another lesson.
- The lesson page does not skip a required instructional step.
- The lesson page does not include unnecessary or confusing extra steps.
- Notebook tasks, worked examples, independent work, and checkpoints each function as their page type requires.
- The saved Moodle page visually matches the repository source as closely as Moodle allows.

If a page fails visual, structure, or workflow consistency, the transfer agent must not "clean it up" only in Moodle. The issue must be corrected in the repository first, then the corrected repository source must be transferred to Moodle.

The transfer agent must stop and route the issue to the curriculum development agent when:

- The content is mostly correct but the layout is inconsistent.
- The student workflow is confusing or out of order.
- The visual design does not match the course pattern.
- Boxes, colors, headings, or sections are missing.
- The page type does not match the required page map.
- The Moodle paste strips or changes important visual structure.

The audit agent must treat visual inconsistency as a transfer failure until corrected and reverified.

Required visual consistency report note:

```text
Visual/structure/workflow check: Passed / Failed
Evidence: <specific observation>
Required correction, if failed: <repo file and issue>
```

## Final Course Certification Standard

The main agent may tell the user that a course passed lesson transfer only after all of the following are true:

1. The course was assigned to one transfer owner.
2. Every subagent assignment and report was reviewed.
3. Repository readiness passed for the requested scope.
4. Moodle transfer was completed for every required page in the requested scope.
5. The upload log contains one verified row for every saved Moodle page.
6. The course audit agent found no unresolved discrepancies.
7. The main agent independently checked the audit report against this standard.

The final certification must use one of these statuses:

```text
PASSED: Course lesson transfer meets the academy standard.
FAILED: Course lesson transfer has unresolved discrepancies.
PARTIAL: Some assigned units or lessons passed, but the full requested scope is not complete.
BLOCKED: Transfer or audit cannot continue without user action.
```

The final certification report must include:

- Course name.
- Moodle course URL.
- Repository course folder.
- Units and lessons included.
- Units and lessons excluded, if any.
- Upload log path.
- Transfer agent name or identifier.
- Audit agent name or identifier.
- Final status.
- Summary of unresolved issues, if any.

## Source of Truth

Lesson HTML files are stored in this repository under the relevant course folder.

Typical path pattern:

```text
C:\Users\acrue\MLA2026-1\Refined Courses\<Course Name>\Units\Unit ##\Lesson ##\P##.html
```

Examples:

```text
C:\Users\acrue\MLA2026-1\Refined Courses\ALG1\Units\Unit 04\Lesson 01\P01.html
C:\Users\acrue\MLA2026-1\Refined Courses\Math for College Readiness\Units\Unit 02\Lesson 05\P04.html
```

The course name, unit number, and lesson number in the repository path must match the Moodle course, Moodle unit, and Moodle lesson being edited.

If the matching repository file does not exist, stop and ask the user. Do not substitute another file.

## Required Page Map

Only the following lesson pages are part of a standard transfer:

| Transfer order | Repository file | Moodle page title or meaning |
| ---: | --- | --- |
| 1 | `P01.html` | Overview |
| 2 | `P02.html` | Notebook Task - Part 1 |
| 3 | `P03.html` | Notebook Task - Part 2 |
| 4 | `P04.html` | Worked Example |
| 5 | `P06.html` | Independent Work |
| 6 | `P07.html` | Checkpoint |

`P05.html` is intentionally skipped. The agent must not transfer page 5 unless the user explicitly requests it.

If a Moodle page uses a slightly different title, the agent must verify that the page meaning matches the required page map before editing it. If the meaning cannot be confirmed, stop and ask the user.

## Required Naming and Path Match

The agent must enforce a strict one-to-one match between the repository source and the Moodle destination. Every transfer must match at all of these levels:

| Level | Repository source must match | Moodle destination must match |
| --- | --- | --- |
| Course | Course folder name or approved course abbreviation | Moodle course name or approved course abbreviation |
| Unit | `Unit ##` folder | Moodle unit section or activity unit number |
| Lesson | `Lesson ##` folder | Moodle lesson number in the activity/page path or title |
| Page | `P01`, `P02`, `P03`, `P04`, `P06`, or `P07` | Matching Moodle page title from the required page map |

The agent must not transfer content if any level does not match.

Required match examples:

```text
Repo:   ALG1\Units\Unit 04\Lesson 01\P01.html
Moodle: Algebra 1 -> Unit 4 -> Lesson 1 -> Overview
Result: Allowed, if the Moodle activity is the Unit 4 Lesson 1 activity.
```

```text
Repo:   Math for College Readiness\Units\Unit 02\Lesson 05\P04.html
Moodle: Math for College Readiness -> Unit 2 -> Lesson 5 -> Worked Example
Result: Allowed, if the Moodle activity is the Unit 2 Lesson 5 activity.
```

Forbidden mismatch examples:

```text
Repo:   ALG1\Units\Unit 04\Lesson 01\P01.html
Moodle: Algebra 1 -> Unit 1 -> Lesson 1 -> Overview
Result: Stop. Unit mismatch.
```

```text
Repo:   ALG1\Units\Unit 04\Lesson 01\P04.html
Moodle: Algebra 1 -> Unit 4 -> Lesson 1 -> Notebook Task - Part 1
Result: Stop. Page mismatch. P04 must go to Worked Example.
```

```text
Repo:   Math for College Readiness\Units\Unit 02\Lesson 05\P01.html
Moodle: Algebra 1 -> Unit 2 -> Lesson 5 -> Overview
Result: Stop. Course mismatch.
```

Before editing each Moodle page, the agent must state or internally confirm the full transfer identity in this format:

```text
Course: <course>
Unit: Unit ##
Lesson: Lesson ##
Moodle activity: <activity name>
Moodle page: <page title>
Repository file: <course>\Units\Unit ##\Lesson ##\P##.html
Expected page meaning: <Overview / Notebook Task - Part 1 / Notebook Task - Part 2 / Worked Example / Independent Work / Checkpoint>
```

If the Moodle URL, breadcrumb, activity title, page title, or visible page list contradicts the repository path, stop before saving.

## Mandatory Preflight Checklist

Before editing Moodle, complete this checklist:

1. Read this entire standard.
2. Identify the requested course.
3. Identify the requested unit number.
4. Identify the requested lesson number.
5. Locate the matching course folder in the repository.
6. Locate the matching unit folder.
7. Locate the matching lesson folder.
8. Confirm that all required source files exist:
   - `P01.html`
   - `P02.html`
   - `P03.html`
   - `P04.html`
   - `P06.html`
   - `P07.html`
9. Identify the Moodle course page.
10. Identify the Moodle unit section.
11. Identify the existing Moodle activity for that lesson.
12. Identify the existing Moodle lesson pages that correspond to the required page map.
13. Confirm that the Moodle course, unit, lesson, activity, and page titles match the repository course, unit, lesson, and page map.
14. Prepare or locate the course Moodle upload log.

If any required file or Moodle page is missing, stop and report exactly what is missing.

## Required User-Facing Confirmation Before Saving

Before saving the first Moodle page in a course/unit/lesson transfer, the agent must tell the user:

- The Moodle course currently open.
- The Moodle unit and lesson.
- The Moodle activity name.
- The repository lesson folder being used.
- The exact page map that will be transferred.

If the user has not already clearly authorized the transfer, wait for approval before clicking the first Moodle `Save page`.

If the user has clearly instructed the agent to transfer the specified course/unit/lesson and all preflight checks pass, the agent may proceed, but must still report the mapping before the first save.

## Exact Moodle Page Editing Procedure

Repeat this procedure for each required page in transfer order.

1. Open the correct existing Moodle lesson page.
2. Confirm the Moodle page title matches the required page map.
3. Open the page editor.
4. In the editor toolbar, open `Tools > Source code`.
5. Click inside the source-code editor.
6. Select all existing source code in the source-code editor.
7. Delete the selected old source code.
8. Read the exact full contents of the matching repository HTML file.
9. Paste the exact full repository HTML source into the Moodle source-code editor.
10. Confirm the pasted source is not empty.
11. Confirm the pasted source belongs to the correct repo file.
12. Save or update the source-code dialog.
13. Click Moodle `Save page`.
14. Reopen or inspect the saved Moodle page.
15. Verify that the saved page contains the expected content and formatting.
16. Add the completed transfer to the Moodle upload log.

The Moodle `Save page` button is mandatory. Saving or updating only the source-code dialog is not enough.

## Required Paste Method

The required paste method is:

```text
Moodle editor toolbar -> Tools -> Source code -> replace all source -> save/update source dialog -> Save page
```

The agent must paste HTML into Moodle source code. The normal visual/rich text editor is not acceptable as the final transfer method because it can strip boxes, inline styles, colors, layout, and formatting.

If `Tools > Source code` cannot be opened, stop and report the issue. Do not use the normal editor as a workaround.

## Verification Requirements

After each page is saved, verify all of the following:

- The saved Moodle page is still in the correct course.
- The saved Moodle page is still in the correct unit and lesson activity.
- The saved Moodle page title matches the intended page.
- The transferred content corresponds to the correct repository file.
- The page was saved with Moodle `Save page`.
- The source or rendered page shows expected styling and structure.

If the repository HTML contains styled boxes, colors, or layout, verify that the saved source or rendered page preserved styling markers such as:

- `style=`
- `background:`
- `border`
- `border-left`
- other course-specific inline style markers present in the repo file

If styling was stripped or content is incomplete, the page is not complete. Reopen `Tools > Source code`, replace the source with the repo HTML again, save the source dialog, click Moodle `Save page`, and verify again.

## Logging Requirement

Every saved Moodle page must be logged immediately after verification.

Use the course's existing Moodle upload log if one exists. If no log exists, create one in the course's audit or documentation folder.

Recommended log path pattern:

```text
C:\Users\acrue\MLA2026-1\Refined Courses\<Course Name>\Course Audit\<COURSE>_MOODLE_PAGE_UPLOAD_LOG.md
```

The log must include one row per Moodle page. Each row must include:

- Date
- Moodle course
- Unit and lesson
- Moodle activity name
- Moodle page title
- Moodle page ID, if visible
- Repository file used
- Save status
- Verification notes

Required table format:

```markdown
| Date | Moodle course | Unit/Lesson | Moodle activity | Moodle page | Page ID | Repository file | Status | Verification notes |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| 2026-07-04 | Algebra 1 | Unit 04 Lesson 01 | U4 L1 Overview, Notebook Task, Concept, & Worked Example | Overview | 3066 | ALG1\Units\Unit 04\Lesson 01\P01.html | Saved | Source styling verified |
```

If a transfer is interrupted, log only the pages that were actually saved and verified. Do not log unsaved pages as complete.

## Completion Report

After finishing the requested transfer, report to the user:

- Course transferred.
- Unit and lesson transferred.
- Moodle activity updated.
- Each Moodle page updated.
- Each repository file used.
- Upload log path.
- Any pages skipped and why.
- Any verification issues.

Keep the report factual. Do not claim completion for pages that were not saved and verified.

## Existing Content Rule

Many Moodle pages already contain older content.

For existing content, the required action is:

1. Open `Tools > Source code`.
2. Select all existing Moodle source code.
3. Delete the existing source code inside the source editor.
4. Paste the current repository source code.
5. Save or update the source-code dialog.
6. Click Moodle `Save page`.
7. Verify the saved result.
8. Log the completed page.

This replaces old Moodle page source with current repository source. It does not delete any Moodle page or activity.

## Imports and Assessments

This standard is only for Moodle lesson page content.

Do not use this procedure for:

- Question banks
- Quizzes
- Guided practice imports
- Moodle XML assessment files
- GIFT files
- Course backup or restore files

If the user asks to import questions or assessments, use the appropriate assessment import workflow instead and wait for user approval before importing any file.

## Stop Conditions

Stop immediately and ask the user before saving if any of the following occur:

- The Moodle course is not clearly the requested course.
- The Moodle unit is not clearly the requested unit.
- The Moodle lesson is not clearly the requested lesson.
- The Moodle activity title does not match the requested lesson.
- The Moodle page title does not match the required page map.
- A required repository file is missing.
- A repository file appears to belong to a different course, unit, or lesson.
- `Tools > Source code` cannot be opened.
- The source-code editor does not accept the paste.
- The pasted source is empty or incomplete.
- Moodle shows a warning about overwriting, deleting, importing, restoring, or replacing something outside the current page.
- The agent is unsure whether the page saved successfully.
- The agent cannot verify the saved result.

When stopped, report:

1. The exact page or step where the stop occurred.
2. The Moodle URL or page title, if available.
3. The repository file path being used.
4. The reason for stopping.
5. What decision or approval is needed from the user.

## Confirmed Example, Not a Limitation

The following Algebra 1 Unit 04 Lesson 01 pages were successfully transferred and saved in Moodle. This is an example of correct execution. It does not limit this standard to Algebra 1.

| Moodle page | Moodle page ID | Repository file |
| --- | ---: | --- |
| Overview | 3066 | `ALG1\Units\Unit 04\Lesson 01\P01.html` |
| Notebook Task - Part 1 | 3067 | `ALG1\Units\Unit 04\Lesson 01\P02.html` |
| Notebook Task - Part 2 | 3068 | `ALG1\Units\Unit 04\Lesson 01\P03.html` |
| Worked Example | 3069 | `ALG1\Units\Unit 04\Lesson 01\P04.html` |

This example confirms the required method: repository HTML source was pasted through Moodle `Tools > Source code`, Moodle `Save page` was clicked, styling was verified, and the transfer was logged.
