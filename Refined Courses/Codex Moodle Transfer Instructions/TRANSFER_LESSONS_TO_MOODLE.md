# Academy Standard: Transfer Lessons to Moodle

This is the required standard operating procedure for transferring repository lesson pages into Moodle.

An agent must read this entire file before performing any Moodle lesson transfer. The agent must follow this procedure exactly. Do not improvise, skip steps, change the page map, use a different paste method, or save uncertain work.

## Trigger Phrases

Use this standard whenever the user says a phrase like:

- "transfer lessons to Moodle"
- "transfer a course to Moodle"
- "transfer course to Moodle"
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

## Primary Agent Full-Course Transfer Responsibility

When the user asks to transfer a full course to Moodle, the primary agent owns the complete course-transfer outcome. The primary agent may use subagents for focused work, but the primary agent remains responsible for the final course-level decision.

The primary agent must not treat Moodle transfer as a mechanical copy task. Before any Moodle editing begins, the primary agent must perform a second-level readiness check even when lesson builders, assessment builders, and auditors have already passed the course.

Required primary-agent checks before transfer:

1. Read this file completely.
2. Read `Codex Moodle Transfer Instructions\TRANSFER_ASSESSMENTS_TO_MOODLE.md` completely.
3. Read the course production, lesson, assessment, and audit standards listed in this file.
4. Identify the exact repository course folder.
5. Identify the exact Moodle course shell.
6. Confirm the course overview file exists and belongs to the correct course.
7. Confirm unit and lesson mapping files exist and are current.
8. Confirm every required lesson folder belongs to the correct course, unit, and lesson.
9. Confirm required transfer pages `P01`, `P02`, `P03`, `P04`, `P06`, and `P07` exist for every lesson in scope.
10. Confirm no lesson content has bled into the wrong unit, wrong lesson, or wrong page type.
11. Confirm lesson page titles, headings, examples, tasks, vocabulary, standards, and internal references match the intended unit and lesson.
12. Confirm lesson files visually and structurally follow the academy standard before transfer.
13. Confirm Moodle XML assessments exist for every required pretest, guided practice, quiz, and unit assessment.
14. Confirm assessment files align to the same course, unit, lesson, and mastery sequence as the lesson pages.
15. Confirm assessment files are staged for Moodle import using the approved D drive path and naming sequence.
16. Confirm no open audit defect remains unresolved.
17. Perform the final repository checkpoint on the exact lesson pages to be transferred before opening Moodle or saving any Moodle page.

If any check fails, the primary agent must stop Moodle transfer for the affected scope and assign or perform repository correction before Moodle work continues. The agent must not "fix around" repository problems directly in Moodle.

Course-specific exceptions are allowed only when they are documented in the approved mapping or final course audit. The primary agent must record the evidence before transfer begins. Example: a final lesson may function as a synthesis/unit-review lesson, so its visible page headings may say "Unit Review" while the required Moodle page map still treats `P02` as Notebook Task Part 1 and `P03` as Notebook Task Part 2. This is acceptable only when the course audit or mapping confirms that the final lesson is intentionally a synthesis lesson. If the evidence is missing, stop and route the issue back to course correction before Moodle transfer.

The primary agent must treat this as a layered academy control system:

```text
Course production -> Lesson development -> Assessment development -> Repository audit -> Moodle transfer -> Moodle render audit -> Final enrollment-readiness decision
```

Every layer must agree. If Moodle transfer reveals a defect missed by an earlier layer, the primary agent must route the defect back to the correct development or correction step, then repeat the affected transfer and audit.

## Final Repository Checkpoint Before Moodle

This is the last repository-level quality gate before Moodle transfer begins. It is required even when previous lesson developer, assessment developer, unit audit, and final audit reports already passed.

The transfer agent must inspect the exact repository lesson files in the requested transfer scope before opening Moodle or saving any Moodle page.

For every `P01`, `P02`, `P03`, `P04`, `P06`, and `P07` file in scope, confirm:

1. The file belongs to the correct course, unit, lesson, and page number.
2. The file follows the approved course architecture, crosswalk, unit mapping, and lesson mapping.
3. The visible standards and lesson content match the assigned lesson standard(s).
4. Every mapped standard assigned to the lesson is taught or traceable.
5. No outside-standard, future-unit, future-lesson, or unmapped content is being transferred.
6. The lesson teaches asynchronously and does not rely on a live teacher to explain, demonstrate, guide, check, or fill in missing steps.
7. No prohibited teacher-led language remains, including "teacher check," "your teacher will explain," "your teacher will show you," "wait for teacher guidance," or similar wording.
8. Teacher of Record language is limited to support, intervention, checkpoint review, submission workflow, clarification, retake approval, and help after the student has used the lesson.
9. The page is self-contained enough for remedial, standard, and accelerated students to learn from the lesson itself.
10. Required visuals, tables, graphs, diagrams, number lines, models, examples, and student guidance are present when the lesson or standard warrants them.
11. No corrupted characters, mojibake, replacement characters, or broken emoji encodings appear anywhere in the visible lesson text or HTML source.
12. The top lesson banner/header must begin cleanly with the expected course/unit/lesson marker, such as `GEO | Unit 01 | Lesson 05`, with no extra characters before it.
13. The repository source must not contain visible corruption patterns such as `Ã`, `Â`, `Å`, `â`, `�`, `Ã°Å¸`, `â€œ`, or similar broken encoding artifacts in headings, banners, labels, mastery criteria, checklist text, or support boxes.

If any item fails, stop Moodle transfer for the affected scope. Correct the repository file first, rerun the relevant audit or checkpoint, and only then resume Moodle transfer. Do not repair a repository defect directly inside Moodle. Moodle must receive the corrected repository source of truth.

Required repository encoding scan before transfer:

Before transferring any lesson scope, run or perform an equivalent scan on the exact `P01`, `P02`, `P03`, `P04`, `P06`, and `P07` files in scope for corrupted characters and mojibake. A recommended search pattern is:

```text
Ã|Â|Å|â|�|Ã°Å¸|â€œ|â€|ð
```

If the scan finds corrupted characters, the transfer agent must inspect the line in context. If the text is a broken emoji, broken punctuation, replacement character, or extra garbage before a title/header, the affected repository file fails the checkpoint. Correct the repository source first, rerun the scan, then transfer the corrected source to Moodle.

## Required Full-Course Moodle Transfer Sequence

For a full course transfer, use this exact order:

1. Confirm repository readiness, mapping alignment, assessment readiness, and audit evidence.
2. Transfer the course overview in `Course Orientation & Expectations`.
3. Import all production Moodle XML assessments into the matching Moodle question banks.
4. Transfer unit lesson pages into the Moodle lesson activities using only pages `P01`, `P02`, `P03`, `P04`, `P06`, and `P07`.
5. Attach imported question-bank questions to the actual Moodle assessment activities.
6. Preview and audit all lesson pages and assessment activities in Moodle.
7. Fix every mismatch, rendering issue, missing question, wrong bank, visual problem, broken layout, or mapping discrepancy.
8. Produce a final course transfer report.

The course is not considered transferred for student enrollment until the final Moodle render audit passes for both lesson content and assessment activities.

## Required Outcome

The required outcome is that the correct existing Moodle lesson pages contain the exact current HTML source from the matching repository lesson files.

The repository is the source of truth. Moodle is the destination.

The agent must:

1. Identify the correct course.
2. Transfer the course orientation overview first when the requested scope is a full course transfer.
3. Identify the correct unit.
4. Identify the correct lesson.
5. Identify the correct existing Moodle activity.
6. Match each Moodle lesson page to the correct repository HTML file.
7. Replace the Moodle page source code with the repository HTML source code.
8. Save each Moodle page.
9. Verify each saved page.
10. Record each transfer in a Moodle upload log.

The course orientation overview is a required first phase for full-course transfer. It uses the repository course overview markdown file and the Moodle content editor, not the lesson-page `Tools > Source code` HTML replacement method. This is the only approved exception in this standard.

## Mandatory Pre-Transfer Mastery Certification Gate

Moodle lesson transfer is a post-certification action. The transfer agent must not move lesson pages into Moodle until the requested course, unit, or lesson scope has passed the required lesson, assessment, and audit gates.

Before Moodle transfer begins, the main agent and transfer agent must read and apply these controlling files:

```text
.codex/agent-prompts/lesson-developer-agent.md
.codex/agent-prompts/assessment-developer-agent.md
.codex/agent-prompts/course-completion-auditor-subagent.md
.codex/agent-prompts/final-certification-auditor-subagent.md
.codex/standards/00-course-production-master-protocol.md
.codex/standards/03-lesson-page-model-p01-p07.md
.codex/standards/04-instructional-rigor-and-mastery-standard.md
.codex/standards/05-mathematical-visual-standard.md
.codex/standards/06-assessment-moodle-xml-standard.md
.codex/standards/07-assessment-visual-audit-standard.md
.codex/standards/08-answer-pattern-and-feedback-standard.md
.codex/standards/14-course-completion-audit-standard.md
.codex/workflows/moodle-lesson-transfer-workflow.md
Codex Course Production Instructions\ANALYSIS_AND_COURSE_PRODUCTION_STANDARD.md
Codex Moodle Transfer Instructions\TRANSFER_ASSESSMENTS_TO_MOODLE.md
Codex Moodle Transfer Instructions\TRANSFER_LESSONS_TO_MOODLE.md
```

The transfer agent must understand what the course is expected to accomplish before transferring it. This is a mastery-based academy course model. A page is not ready for Moodle merely because it exists or because its basic content is correct.

Required pre-transfer evidence:

- Lesson developer work is complete and PASS for the requested scope.
- Assessment developer work is complete and PASS for the requested scope.
- Required unit audits are complete and PASS for the requested scope.
- Course completion or final certification audit is complete and PASS/CERTIFIED when the requested scope is a full course.
- Every confirmed lesson, assessment, mapping, structure, visual, workflow, metadata, LMS, or compliance defect has been fixed and rerun.
- The current repository files, not old reports alone, have been inspected.
- The final repository checkpoint has passed for the exact lesson files being transferred.

If any required gate is missing, unsupported, incomplete, or FAIL/NOT CERTIFIED, stop. Do not open Moodle for transfer. Complete the development, correction, and audit work first.

## Mastery-Based Lesson Expectations

The transfer agent must verify that transferred lessons support asynchronous mastery learning.

Every transferred lesson must:

- teach like a veteran teacher is teaching the student directly
- be self-contained for students working without a live teacher presentation
- follow the approved course architecture, crosswalk, unit mapping, and lesson mapping
- teach every mapped standard assigned to that lesson
- avoid future-unit, future-lesson, unmapped, or unauthorized content
- explain what to do and why each step is done
- anticipate student confusion before it happens
- include common mistakes with teachable corrections when required
- include necessary visuals, tables, graphs, number lines, diagrams, models, or data displays
- preserve the required seven-page model
- remain Moodle-friendly HTML

The transfer agent is not the curriculum writer, but the transfer agent must recognize when a lesson does not meet these expectations and must stop transfer until the curriculum development agent corrects the repository files.

## Mastery-Based Assessment Expectations

The transfer agent must also confirm that assessment readiness has passed before lesson transfer.

Production assessments must:

- be Moodle XML, not GIFT
- align to approved course, unit, and lesson mapping
- assess only the assigned lesson for guided practice and lesson quiz banks
- assess only the assigned unit for unit pretests and unit assessment banks
- contain the required question counts unless an approved course-specific standard says otherwise
- contain exactly four answer choices per question
- contain exactly one correct answer per question
- include teachable feedback for every answer choice
- avoid predictable answer patterns
- embed required visuals, tables, graphs, passages, data displays, models, or other stimuli directly in the Moodle XML question
- avoid duplicate stems, duplicate answer choices, malformed XML, broken media, or missing standards traceability

Lesson transfer is not assessment import. However, a mastery-based course is not ready for Moodle lesson transfer unless the matching lesson and assessment ecosystem has passed. If assessments are missing, still GIFT-only, not Moodle XML, visually incomplete, weakly aligned, or not audited, stop and route the issue to the assessment developer or assessment audit agent.

## Required Pre-Transfer Evidence Statement

Before the first Moodle save for a requested course/unit/lesson scope, the main agent must produce or cite a pre-transfer evidence statement:

```text
Course:
Requested scope:
Lesson developer gate: PASS / FAIL / Missing
Assessment developer gate: PASS / FAIL / Missing
Unit audit gate: PASS / FAIL / Missing
Course/final certification gate, if full course: PASS / CERTIFIED / FAIL / NOT CERTIFIED / Not applicable
Repository files directly inspected: Yes / No
Final repository checkpoint: PASS / FAIL / Missing
Open defects: None / Listed below
Decision: Approved for Moodle transfer / Blocked
Evidence files or reports:
- <path>
- <path>
```

If the decision is `Blocked`, no Moodle page may be saved.

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
- Do not paste into the visible TinyMCE editor, the Moodle content box, hidden editor textareas, browser DOM fields, or any editor surface other than `Tools > Source code` for lesson pages. A lesson page transferred by any method other than `Tools > Source code` is not academy-compliant and must be re-transferred through source code before it can be logged as complete.
- Exception: the course orientation overview page must be transferred into the Moodle content editor from the repository course overview markdown file, then cleaned and verified as described in this standard.
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
| Primary/main agent | Owns the full course-transfer outcome, verifies repository readiness, assigns subagents, reviews reports, performs final Moodle render audit, gives final pass/fail to the user | May inspect any course, but should not edit a course assigned to another active transfer agent unless taking ownership back |
| Lesson transfer agent | Transfers course overview and lesson pages for one assigned course or clearly assigned course scope | Uses its own dedicated Moodle browser session |
| Assessment transfer agent | Imports Moodle XML into question banks and attaches questions to assessment activities for one assigned course or clearly assigned course scope | Uses its own dedicated Moodle browser session |
| Course audit agent | Audits one assigned course after transfer but does not replace the primary agent's final decision | Uses its own review session or evidence provided by the transfer agent |
| Unit build or prep agent | Checks or prepares repository files for assigned units | No Moodle editing unless separately assigned as transfer agent |
| Assessment developer agent | Builds, converts, or repairs Moodle XML assessment files before transfer certification | No Moodle lesson-page editing unless separately assigned |
| Assessment audit agent | Audits Moodle XML assessment readiness, alignment, visuals, feedback, and answer patterns | Read-only unless separately assigned development work |

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

## Primary Agent Subagent Assignment Rules

The primary agent may assign subagents only after completing the primary-agent pre-transfer readiness check.

Recommended full-course subagent split:

```text
Primary agent:
- Owns course scope, standards, mapping, repository readiness, subagent instructions, log review, and final Moodle render audit.

Lesson transfer subagent:
- Transfers course overview and lesson pages only.
- Uses TRANSFER_LESSONS_TO_MOODLE.md.
- Does not import XML.
- Does not attach questions to quizzes.

Assessment transfer subagent:
- Imports XML into question banks and attaches questions to assessment activities only.
- Uses TRANSFER_ASSESSMENTS_TO_MOODLE.md.
- Does not edit lesson page source.

Course audit subagent:
- Reviews completed Moodle transfer evidence.
- Reports discrepancies.
- Does not certify final enrollment readiness alone.
```

The primary agent must give each subagent the exact course, units, lessons, Moodle course URL, repository folder, standards file, allowed actions, and output format. No subagent may infer missing scope.

Required subagent boundary rules:

- A lesson transfer subagent must not touch question banks, XML import, quiz question selection, random-question setup, or assessment preview except as explicitly assigned.
- An assessment transfer subagent must not edit Moodle lesson page source, course overview content, repository lesson HTML, or unit lesson pages.
- A course audit subagent must not repair Moodle content unless the primary agent explicitly reassigns them as a transfer agent.
- A prep or audit subagent must report suspected wrong-unit, wrong-lesson, wrong-page, wrong-standard, or bleed-over content immediately.
- All subagents must stop when mapping, file identity, Moodle category, or target activity is uncertain.

The primary agent must review every subagent report before allowing the next phase to begin.

Phase gates:

```text
Course overview transfer cannot begin until repository readiness is approved.
Question-bank import cannot begin until assessment XML and staging paths are verified.
Lesson page transfer cannot begin until the course overview is saved and verified.
Assessment activity attachment cannot begin until question-bank import is complete and verified.
Final course audit cannot pass until lesson rendering and assessment rendering are both verified in Moodle.
```

If one subagent finds a repository defect, Moodle defect, assessment mismatch, or rendering issue, the primary agent must pause the affected phase, route the correction, and require re-verification after the fix.

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

### Assessment Developer Agent

An assessment developer agent prepares production assessment files before Moodle lesson transfer is approved.

The assessment developer agent must:

1. Read `.codex/agent-prompts/assessment-developer-agent.md`.
2. Read the required assessment standards listed in that prompt.
3. Work only in the assigned course, unit, lesson, or assessment scope.
4. Produce or repair Moodle XML assessment files.
5. Treat GIFT as legacy/source material only.
6. Confirm assessment questions align to the approved course, unit, and lesson mapping.
7. Confirm required visuals or stimuli are embedded directly in the Moodle XML question.
8. Confirm every answer choice has teachable feedback.
9. Confirm answer choices have no predictable correct-answer pattern.
10. Report every assessment file changed and every validation result.

The assessment developer agent must not certify an assessment as production-ready unless Moodle XML, mapping, standards, visual, feedback, answer-pattern, and metadata gates pass.

### Assessment Audit Agent

An assessment audit agent independently verifies assessment readiness before Moodle transfer certification.

The assessment audit agent must:

1. Read the assessment developer prompt and assessment audit standards.
2. Inspect current Moodle XML files directly.
3. Verify required assessment counts.
4. Verify alignment to approved mapping.
5. Verify every question has exactly four answer choices and one correct answer.
6. Verify feedback is teachable for every answer choice.
7. Verify answer patterns are not predictable.
8. Verify mandatory visuals, passages, tables, graphs, diagrams, models, or data displays are embedded in the question.
9. Verify GIFT is not being treated as the production assessment format.
10. Report PASS/FAIL with evidence by assessment file.

If any assessment gate fails, Moodle lesson transfer is blocked until assessment development repairs the issue and the assessment audit is rerun.

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
- All required Moodle assessment question banks were imported and verified when the scope is a full course transfer.
- All required assessment activities were populated from the correct question banks.
- All required assessment activities were previewed and verified.
- The primary agent has completed the final enrollment-readiness audit.
- The root course build tracker has been updated after final certification.

## Final Moodle Course Transfer Audit

The primary agent must perform the final course transfer audit before telling the user that the course is transferred to Moodle for student enrollment.

This audit is required even when subagents completed lesson transfer, assessment transfer, and course audit work.

The final audit must verify:

### Course Identity

- Moodle course title matches the repository course.
- Moodle course shell is the intended active shell, not an old copy, template, or wrong course.
- Repository course folder is the source used for transfer.
- Course overview page was transferred, saved, verified, and logged.

### Lesson Rendering

- Every required unit and lesson in the requested scope is present in Moodle.
- Every transferred lesson activity has the correct title and unit/lesson number.
- Only pages `P01`, `P02`, `P03`, `P04`, `P06`, and `P07` were transferred unless the user explicitly requested otherwise.
- Each Moodle page title matches the required academy naming standard.
- The saved Moodle content renders the repository boxes, colors, headings, layout, tables, visuals, and workflow.
- No raw source-code artifacts, broken characters, extra markup, or stray copied text appear.
- No visible content has bled over from another unit, lesson, or page.
- Mastery criteria, submission checklist, help/TOR support, independent work, and checkpoint sections render correctly where required.

### Assessment Rendering

- Every required question bank contains the correct imported Moodle XML questions.
- Question-bank categories match the course, unit, lesson, and assessment type.
- Pretests and guided practices use all selected questions from the correct bank.
- Lesson quizzes use 5 random questions from the correct quiz bank.
- Unit assessments use 10 random questions from the correct unit assessment bank.
- Every assessment activity opens and previews without an error.
- Answer choices display correctly and are not unintentionally scrambled.
- Visuals, tables, formulas, passages, feedback, and question text render correctly.
- No wrong-bank, wrong-unit, wrong-lesson, duplicate, missing, or malformed question appears.

### Logs and Evidence

- Lesson transfer log is complete.
- Assessment import log is complete.
- Assessment activity attachment log is complete.
- Every log row has enough evidence to identify the source file and Moodle destination.
- All known discrepancies were fixed and rechecked.
- The root course build tracker has been updated with the final Moodle transfer status and evidence path.

### Course Build Tracker

After a full-course Moodle transfer passes final enrollment-readiness certification, the primary agent must update the root course build tracker before telling the user that the course is fully transferred and ready for enrollment:

```text
C:\Users\acrue\MLA2026-1\Refined Courses\COURSE_BUILD_TRACKER.md
```

The tracker update must cover every matching location in the tracker:

1. Quick View counts.
2. Course Status Summary row.
3. Completed / Moodle Transfer Ready Courses row, if the course appears there.
4. Moodle Transfer Tracking row.
5. Evidence or notes text with the final transfer log or certification audit path.

Required tracker status after successful full-course certification:

```text
Moodle Transfer: Transferred to Moodle
Lesson Transfer: Transferred to Moodle
Assessment Transfer: Transferred to Moodle
Moodle QA Preview: Transferred to Moodle
Student Enrollment Ready: Transferred to Moodle
Evidence: Final transfer log or enrollment-readiness certification audit path
```

Do not update a course to `Transferred to Moodle` in the tracker until the final Moodle transfer certification has passed. If transfer is incomplete, blocked, unaudited, or still waiting on Moodle verification, leave the tracker as `In Moodle transfer / needs confirmation` or `Needs confirmation` and state the blocker.

The final course status may be reported only as one of:

```text
PASS - Ready for student enrollment
PASS WITH USER-APPROVED EXCEPTIONS - Ready only with listed exceptions
BLOCKED - Not ready for student enrollment
```

If the final status is `BLOCKED`, the primary agent must list every blocker and the exact correction needed. The primary agent must not use phrases such as "course transferred," "ready," or "complete" for a blocked course.

If any item in the final audit fails, fix the issue first, rerun the affected transfer or assessment setup step, and audit again before reporting completion.

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
- The rendered Moodle page does not show transfer artifacts such as visible `` `n``, literal `\n`, escaped HTML fragments, broken tags, duplicated punctuation, stray backticks, or editor residue.
- The rendered Moodle page does not show source-code artifacts immediately before headings, boxes, mastery criteria, TOR support boxes, lists, or section breaks.

If a page fails visual, structure, or workflow consistency, the transfer agent must not "clean it up" only in Moodle. The issue must be corrected in the repository first, then the corrected repository source must be transferred to Moodle.

The transfer agent must stop and route the issue to the curriculum development agent when:

- The content is mostly correct but the layout is inconsistent.
- The student workflow is confusing or out of order.
- The visual design does not match the course pattern.
- Boxes, colors, headings, or sections are missing.
- The page type does not match the required page map.
- The Moodle paste strips or changes important visual structure.
- The rendered Moodle page shows visible transfer artifacts such as `` `n``, literal `\n`, malformed markup, or stray source-code residue.

The audit agent must treat visual inconsistency as a transfer failure until corrected and reverified.

Required visual consistency report note:

```text
Visual/structure/workflow check: Passed / Failed
Evidence: <specific observation>
Required correction, if failed: <repo file and issue>
```

## Final Rendered Moodle Visual Check

Source verification is required, but it is not enough. A page can have the correct source markers and still render with visible transfer artifacts.

After saving and source-verifying each Moodle page, the transfer agent or audit agent must view the rendered Moodle page and visually check the student-facing content.

The rendered-page check must include:

- Scroll through the full saved page.
- Check the area before and after every major heading.
- Check the area above `Mastery Criteria`.
- Check the area above and inside TOR support boxes.
- Check the area above notebook task sections, worked examples, independent work sections, checkpoint tasks, and submission workflow sections.
- Confirm no visible `` `n`` or literal `\n` appears.
- Confirm no broken HTML tags, escaped entities, duplicated fragments, or source-code residue appears.
- Confirm no corrupted characters, mojibake, replacement characters, or broken emoji encodings appear anywhere in the rendered page.
- Confirm visible strings such as `Ã`, `Â`, `Å`, `â`, `�`, `Ã°Å¸`, `â€œ`, or similar artifacts do not appear in headers, section titles, body text, mastery criteria, checklist boxes, or TOR support boxes.
- Confirm the top banner/header begins cleanly with the expected course/unit/lesson marker and does not show extra characters before the marker.
- Confirm boxes, colors, borders, spacing, lists, and headings appear consistent with the repository/course pattern.

If any rendered artifact appears, the page does not pass transfer audit. The agent must:

1. Identify the exact Moodle page and page ID.
2. Check whether the artifact exists in the repository file.
3. If the artifact exists in the repository, correct the repository source first or route to the curriculum development agent.
4. If the artifact appeared only after transfer, reopen Moodle `Tools > Source code`, remove the artifact only if doing so preserves exact repo-approved content, save the page, and reverify.
5. Log the correction and final verification.

Required rendered visual verification language:

```text
Rendered visual check: Passed / Failed
Artifact scan: No visible `n, literal \n, broken tags, escaped markup, editor residue, mojibake, replacement characters, or corrupted header characters found.
Checked areas: top banner/header, headings, section breaks, Mastery Criteria, TOR support box, task lists.
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
8. The root course build tracker was updated with the final status and evidence path.

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
- Course build tracker update confirmation.

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

## Required First Phase: Course Orientation Overview Transfer

When the requested scope is a full course transfer, the agent must transfer the course orientation overview before transferring unit lesson pages.

This first phase applies to the Moodle section and lesson activity normally named:

```text
Moodle section: Course Orientation & Expectations
Moodle lesson activity: Course Overview and Expectations
Moodle lesson page: Course Overview
Repository source file: <COURSE>\Course-Overview.md
```

Course-specific folder names may differ, but the agent must locate the matching repository course overview markdown file before opening Moodle. Common valid patterns include:

```text
<COURSE>\Course-Overview.md
<COURSE>\Course Production\Course-Overview.md
<COURSE>\Course Overview.md
```

If more than one possible course overview source exists, stop and determine which one is current using course production reports, final audit evidence, and the user's stated course. Do not guess.

### Course Orientation Identity Check

Before editing the orientation page, confirm the full identity:

```text
Course: <course>
Moodle section: Course Orientation & Expectations
Moodle lesson activity: Course Overview and Expectations
Moodle page: Course Overview
Repository file: <course>\Course-Overview.md or approved course-specific equivalent
Expected page meaning: Course overview and expectations for the whole course
```

If the Moodle course title, course URL, Moodle section, lesson activity, page title, or repository course folder does not match, stop before saving.

### Exact Course Orientation Editing Procedure

Use this procedure for the orientation course overview page only.

1. Open the correct Moodle course.
2. Go to the Moodle section `Course Orientation & Expectations`.
3. Open the existing Moodle lesson activity `Course Overview and Expectations`.
4. Open `Edit lesson` or the available page editing route.
5. Select the Moodle lesson page titled `Course Overview`.
6. Open `Edit page contents` for `Course Overview`.
7. Confirm the page title field is `Course Overview`.
8. Read the full repository course overview markdown file.
9. Inspect the repository course overview content before Moodle paste. The overview must have a clean course title, no duplicate course-name construction such as `STATISTICS - Statistics`, no mojibake or corrupted bullets such as `Ã¢`, `Â`, replacement characters, or broken punctuation, and no stale copied course text from another course.
10. If the course overview content is off, stop Moodle editing for the overview, correct the repository overview file first, then load the corrected repository source into Moodle. Do not fix the overview only inside Moodle.
11. Convert or paste the corrected course overview into the Moodle content page so headings, paragraphs, lists, horizontal rules, bullets, and arrows render cleanly.
12. Clean the editor content before saving:
    - remove extra blank paragraph icons or empty paragraph blocks after headings
    - remove empty paragraphs created by paste artifacts
    - preserve legitimate paragraph spacing
    - preserve bullets, numbered lists, arrows, and course-specific symbols
    - prevent mojibake or replacement characters
13. Do not modify any other orientation pages during this step.
14. Click Moodle `Save page`.
15. Wait until Moodle finishes loading and returns to the saved page.
16. Verify the rendered saved page.
17. Log the orientation transfer in the course Moodle upload log.

The `Save page` button is mandatory. Do not report completion if the page was pasted but not saved.

### Course Orientation Verification Requirements

After saving the course orientation overview, verify all of the following:

- The saved page is still in the correct Moodle course.
- The saved page is still in `Course Overview and Expectations`.
- The saved page title is `Course Overview`.
- The rendered page contains the expected course title or course name from the corrected repository file.
- The rendered course title is clean and not duplicated, for example `Statistics`, not `STATISTICS - Statistics`.
- Major headings from the repository course overview appear in Moodle.
- Lists render as lists where appropriate.
- There are no extra blank paragraph icons or empty paragraph blocks after headings.
- There are no broken encoding characters.
- There are no mojibake bullets, corrupted punctuation, replacement characters, or visible strings such as `Ã¢`, `Â`, `Ãƒ`, `Ã‚`, or `ï¿½`.
- The page includes the expected course-wide mastery, assessment, workflow, or readiness sections present in the repository file.

If any verification item fails, reopen `Edit page contents`, correct the content, click `Save page` again, and rerun verification.

### Course Orientation Logging Requirement

The course overview transfer must be logged in the same Moodle upload log used for lesson page transfers.

Use this identity in the log:

```text
Unit/Lesson: Course Orientation
Moodle activity: Course Overview and Expectations
Moodle page: Course Overview
Repository file: <COURSE>\Course-Overview.md or approved equivalent
Status: Saved
Verification notes: Rendered course overview verified; no blank paragraph artifacts; no broken characters
```

Do not begin the unit lesson transfer phase until the course orientation overview has been saved, verified, and logged.

## Mandatory Preflight Checklist

Before editing Moodle, complete this checklist:

1. Read this entire standard.
2. Identify the requested course.
3. Determine whether the request is a full-course transfer, unit transfer, or specific lesson transfer.
4. Locate the matching course folder in the repository.
5. For full-course transfers, locate and verify the current course overview source file before opening Moodle.
6. For full-course transfers, inspect the course overview source for duplicate course titles, wrong-course text, stale copied text, mojibake bullets, corrupted characters, broken punctuation, and formatting artifacts. Correct the repository overview first if any issue is found.
7. For unit or lesson transfers, identify the requested unit number.
8. For lesson transfers, identify the requested lesson number.
9. Locate the matching unit folder when the transfer scope includes unit lesson pages.
10. Locate the matching lesson folder when the transfer scope includes lesson pages.
11. Confirm that all required lesson source files exist when the transfer scope includes lesson pages:
   - `P01.html`
   - `P02.html`
   - `P03.html`
   - `P04.html`
   - `P06.html`
   - `P07.html`
12. Identify the Moodle course page.
13. For full-course transfers, identify the Moodle `Course Orientation & Expectations` section, `Course Overview and Expectations` lesson activity, and `Course Overview` page.
14. Identify the Moodle unit section when the transfer scope includes unit lesson pages.
15. Identify the existing Moodle activity for each lesson in scope.
16. Identify the existing Moodle lesson pages that correspond to the required page map.
17. Confirm that the Moodle course, orientation page, unit, lesson, activity, and page titles match the repository course, overview file, unit, lesson, and page map.
18. Prepare or locate the course Moodle upload log.

If any required file or Moodle page is missing, stop and report exactly what is missing.

## Required User-Facing Confirmation Before Saving

Before saving the first Moodle page in a course/unit/lesson transfer, the agent must tell the user:

- The Moodle course currently open.
- For full-course transfers, the Moodle orientation section, orientation lesson activity, orientation page title, and repository course overview file being used.
- For unit or lesson transfers, the Moodle unit and lesson.
- For unit or lesson transfers, the Moodle activity name.
- For unit or lesson transfers, the repository lesson folder being used.
- For unit or lesson transfers, the exact page map that will be transferred.

If the user has not already clearly authorized the transfer, wait for approval before clicking the first Moodle `Save page`.

If the user has clearly instructed the agent to transfer the specified course/unit/lesson and all preflight checks pass, the agent may proceed, but must still report the mapping before the first save.

## Exact Moodle Page Editing Procedure

Repeat this procedure for each required page in transfer order.

1. Open the correct existing Moodle lesson page.
2. Confirm the Moodle page title matches the required page map.
3. Open the page editor.
4. In the editor toolbar, open `Tools > Source code`.
5. Click inside the actual source-code content area.
6. If the source-code content area is blank, do not run select-all/delete. Paste the exact repository HTML directly into the blank source-code area.
7. If the source-code content area already contains content, or if the page is being corrected/replaced, select all existing source inside the source-code content area and delete it before pasting.
8. Read the exact full contents of the matching repository HTML file.
9. Paste the exact full repository HTML source into the Moodle source-code editor.
10. Confirm the pasted source is not empty.
11. Confirm the pasted source belongs to the correct repo file.
12. Save or update the source-code dialog.
13. Immediately inspect the visible Moodle content box in the same editor after the source-code dialog closes.
14. Confirm the content box visibly renders the repository page structure before clicking Moodle `Save page`: colored/styled boxes, backgrounds, borders, border-left accents, spacing, headings, lists, tables, and visuals appear as expected; the Moodle page title and rendered content match the intended repository page; and no plain stripped layout, wrong-page content, empty content, mojibake, or visible source artifacts appear.
15. If the content box renders correctly, treat this as the immediate page-level visual audit and click Moodle `Save page`.
16. Reopen or inspect the saved Moodle page when the content-box audit was uncertain, Moodle lagged, the page is high-risk, or the user requested a separate preview audit.
17. Add the completed transfer to the Moodle upload log.

The Moodle `Save page` button is mandatory. Saving or updating only the source-code dialog is not enough.

MoodleCloud editor warning: do not rely on hidden editor textareas or internal form fields as the only proof that a source paste worked. On some lesson pages, the hidden field can remain empty or can normalize markup even after Moodle has accepted the source-code dialog update. The visible content box after the source-code dialog closes is the required quick visual audit before Moodle `Save page`. The required pre-save evidence is:

1. The source-code editor copyback contains the expected repository page title, unit/lesson marker, and content markers.
2. The source-code editor copyback contains no visible transfer artifacts such as `` `n``, literal `\n`, `Â`, `Ã`, broken tags, or wrong-page content.
3. After saving/updating the source-code dialog, the Moodle editor content box visibly renders the expected styled layout, including colored boxes, borders, spacing, headings, lists, tables, and visuals from the repository file.
4. After clicking Moodle `Save page`, the rendered student-facing page passes the repository signal, styling, and artifact audit.

If the visible content box is empty, incomplete, visually wrong, stripped to plain layout, or does not match the repository signals, do not click Moodle `Save page`. Reopen `Tools > Source code`; if content is present, select all source inside the code content area, not the line-number gutter, delete it, paste the exact repository HTML again, save/update the source-code dialog again, and re-check the visible content box. If the source-code area is blank, paste the repository HTML directly into the blank area. Repeat until the content box passes or stop and report a Moodle/editor blocker.

## Efficient Moodle Lesson Navigation

The transfer agent must avoid unnecessary returns to the course shell during sequential lesson-page edits.

Required efficient navigation pattern:

1. Open the Moodle course shell only to identify the correct lesson activity and confirm the course/unit/lesson context.
2. Open the target Moodle lesson activity's `Edit lessons` page.
3. For the overview/notebook/worked-example activity, stay inside that lesson activity and edit the existing pages in order:
   - `Overview` -> repository `P01.html`
   - `Notebook Task - Part 1` -> repository `P02.html`
   - `Notebook Task - Part 2` -> repository `P03.html`
   - `Worked Example` -> repository `P04.html`
4. After saving one Moodle page, return to that same lesson activity's edit-page list or use Moodle's available in-lesson navigation to open the next page editor.
5. Do not go back to the course shell between `P01`, `P02`, `P03`, and `P04` unless Moodle fails to load, the page context becomes uncertain, or the agent must re-confirm the correct lesson activity.
6. Open the independent/checkpoint activity once and edit the existing pages in order:
   - `Independent Work` -> repository `P06.html`
   - `Checkpoint` -> repository `P07.html`
7. Do not go back to the course shell between `P06` and `P07` unless Moodle fails to load, the page context becomes uncertain, or the agent must re-confirm the correct lesson activity.
8. Return to the course shell after the full lesson transfer is complete, after the full lesson audit is complete, at a unit boundary, or when Moodle needs time to settle after lag.

Acceptable reasons to return to the course shell:

- Confirm the next lesson or unit activity before editing.
- Recover from Moodle timeout, frozen editor, missing toolbar, wrong page, uncertain page ID, or unexpected Moodle state.
- Let Moodle settle after a completed lesson or chunk while updating the transfer log.
- Start a new lesson, unit, or activity group.

Inefficient navigation warning: returning to the course shell after every individual page save creates unnecessary Moodle page loads and increases timeout risk. The agent must use the within-lesson edit list and next-page flow whenever the current lesson context is clear.

## Moodle Timeout, Freeze, And Reload Recovery

If Moodle freezes, times out, or stops responding during lesson transfer, the agent must recover in this order:

1. Look for a Moodle-provided in-page recovery button such as `Reload`, `Refresh`, `Try again`, or a similar retry button.
2. If that button is visible, click it once.
3. Wait for the page to fully reload. Do not click ahead while the page is still loading.
4. Re-confirm the exact course, unit, lesson activity, Moodle page title, and repository file before editing or saving anything else.
5. If the Moodle recovery button is not visible or does not respond after one careful attempt, click/focus the browser address bar URL and press `Enter` or otherwise request navigation to the same URL.
6. If the browser shows a dialog asking whether to `Wait` or `Exit page`/leave the page, choose `Exit page`/leave. This abandons the frozen Moodle request.
7. After choosing `Exit page`/leave, Moodle may show a second Moodle recovery screen/dialog with a `Load`, `Reload`, `Refresh`, or `Try again` button. Click `Load` when it appears.
8. After clicking `Load`, wait for the page to refresh completely. Do not continue while Moodle is still loading.
9. Re-confirm course, unit, lesson activity, Moodle page title, and repository file.
10. If the URL-click -> `Exit page` -> `Load` flow does not recover the page, use the browser refresh/reload once.
11. After browser refresh, wait for Moodle to fully load and re-confirm context before continuing.
12. If the editor returns to the wrong page, loses the toolbar, or leaves uncertainty about whether the source saved, stop the chunk flow and audit/fix the affected page before moving forward.

Never continue a paste, save, page audit, or next-page navigation after a timeout/freeze until the page context is certain again.

## Unit-Chunk Transfer And Audit Workflow

For normal full-course or full-unit Moodle lesson transfer, the required efficient workflow is unit-chunk transfer first, unit audit second. This is the academy default for Moodle lesson transfer because it reduces page-load volume, lowers MoodleCloud timeout risk, and keeps page verification organized at the unit level.

Required unit-chunk sequence:

1. Confirm the unit's exact Moodle lesson activity IDs and repository lesson folders before saving the first page in the unit.
2. Transfer all lesson pages for the unit first:
   - Lesson 1 `P01`, `P02`, `P03`, `P04`, `P06`, `P07`
   - Lesson 2 `P01`, `P02`, `P03`, `P04`, `P06`, `P07`
   - Continue through the final lesson in the unit.
3. During transfer, use the efficient in-lesson editor flow:
   - stay inside the overview/notebook/worked-example activity for `P01` through `P04`
   - stay inside the independent/checkpoint activity for `P06` and `P07`
   - move directly to the next lesson activity after the current lesson's six pages are saved
4. Do not perform full rendered-page audit after every individual lesson during normal transfer. This creates unnecessary Moodle preview loads and increases timeout risk.
5. After all lessons in the unit are transferred, run the unit-level audit across every required page in that unit.
6. Fix only the Moodle pages that fail the unit audit, then re-audit the corrected pages.
7. Log the unit transfer and unit audit result after the unit audit passes.

Operational rule: if the user asks whether to audit after every lesson or transfer each unit first, choose unit-first transfer followed by unit audit unless there is a specific Moodle error, visible page defect, or mapping uncertainty that requires immediate verification.

Required unit-level audit checks:

- All expected repository page markers are present in Moodle for every transferred page.
- No page contains wrong-unit, wrong-lesson, or wrong-page content.
- No rendered page shows mojibake, replacement characters, raw source-code artifacts, visible `` `n``, literal `\n`, malformed markup, or editor residue.
- Top banners/headers begin cleanly with the expected course/unit/lesson marker.
- Boxes, colors, borders, spacing, lists, headings, mastery criteria, TOR support boxes, independent work, and checkpoint sections render consistently with the academy standard.

Exceptions requiring immediate audit before finishing the unit:

- Moodle renders a page empty, visibly wrong, or obviously incomplete.
- The source-code editor fails to accept the paste.
- The agent sees corrupted characters, raw code artifacts, or wrong-page content before saving.
- Moodle times out, freezes, loses the editor toolbar, returns to the wrong page, or creates uncertainty about whether a page saved.
- The agent is unsure about the current course, unit, lesson, page title, page ID, or repository file.

If an exception occurs, stop the unit-chunk flow, verify and correct the affected page, then resume the unit transfer only after the page context is certain.

## Required Paste Method

The required paste method is:

```text
Moodle editor toolbar -> Tools -> Source code -> replace all source -> save/update source dialog -> Save page
```

The agent must paste HTML into Moodle source code. The normal visual/rich text editor is not acceptable as the final transfer method because it can strip boxes, inline styles, colors, layout, and formatting.

If `Tools > Source code` cannot be opened, stop and report the issue. Do not use the normal editor as a workaround.

### Source-Code Certification Requirement

Every Moodle lesson-page transfer log must explicitly certify the paste method used for each saved page.

Required certification language:

```text
Paste method: Tools > Source code
Source replacement: Existing source selected/deleted; exact repository HTML pasted into Moodle source-code dialog
Visual structure verification: Styled boxes, colors, borders, spacing, and page layout preserved after Moodle Save page
```

If a prior transfer log says only "pasted into the editor," "pasted as HTML," "content box," "rich text editor," "TinyMCE editor," "hidden textarea," or any similar language without explicitly stating `Tools > Source code`, that log does not prove academy-compliant lesson transfer. The affected course, unit, lesson, or page must be treated as not source-certified until one of the following is completed:

1. The page is re-opened in Moodle and the source-code dialog is verified to contain the exact repository HTML with styling markers intact, then the rendered page is audited; or
2. The page is re-transferred from the repository through `Tools > Source code`, saved, rendered, audited, and logged with the required certification language.

Rendered visual correctness alone is not enough to prove transfer-method compliance. The academy standard requires source-code transfer and visual/render audit.

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

If the source-code dialog appears correct but the rendered page is empty or wrong, treat the rendered page as authoritative. The transfer is not complete until the saved rendered page matches the repository content and style. Reopen source, clear all source, paste from the repository again, save the source dialog, save the Moodle page, and reverify.

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
| 2026-07-04 | Algebra 1 | Unit 04 Lesson 01 | U4 L1 Overview, Notebook Tasks & Worked Example | Overview | 3066 | ALG1\Units\Unit 04\Lesson 01\P01.html | Saved | Source styling verified |
```

If a transfer is interrupted, log only the pages that were actually saved and verified. Do not log unsaved pages as complete.

## Completion Report

After finishing the requested transfer, report to the user:

- Course transferred.
- Course orientation overview transferred, if full-course transfer.
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
