# Moodle Lesson Transfer Workflow

## Required Standard

Before any agent transfers repository lesson pages into Moodle, the agent must read and follow:

`Codex Moodle Transfer Instructions/TRANSFER_LESSONS_TO_MOODLE.md`

This file is the controlling standard for Moodle lesson page transfer. It applies whenever the user asks to transfer, load, copy, update, or paste repository lesson pages into Moodle.

## Required Pre-Transfer Gate

Moodle transfer is not allowed until the repository course files are production ready.

Before any Moodle transfer begins, the main agent must verify and cite evidence that:

- lesson developer work is complete and PASS for the requested scope
- assessment developer work is complete and PASS for the requested scope
- all required unit audits are PASS for the requested scope
- the final course audit/certification gate is PASS when the requested scope is a full course
- every confirmed issue from lesson rigor, structure/workflow, assessment alignment, assessment visual/XML, metadata/LMS, mapping, and final audit has been fixed and rerun
- the transfer agent has performed a final repository checkpoint on the exact lesson files to be transferred
- for full-course transfer, the course overview follows the approved ALG1-style student-facing structure and contains no internal-only production, architecture, draft, source-validation, or placeholder language

If any required gate is missing, unsupported, incomplete, or FAIL, stop. Do not open Moodle for transfer. Complete the lesson, assessment, and audit work first.

## Final Repository Checkpoint Before Moodle

Before opening Moodle or saving any Moodle page, the assigned transfer agent must re-check the exact repository files in the transfer scope. This checkpoint is required even when prior lesson developers, assessment developers, and auditors already passed the course.

For every lesson page in scope, verify:

- the page belongs to the correct course, unit, lesson, and page number
- the page follows the approved unit mapping and lesson mapping
- mapped standards are visible or traceable
- no outside-standard, future-unit, future-lesson, or unmapped content is being transferred
- the lesson teaches asynchronously and does not rely on teacher-led instruction
- no prohibited teacher-led language remains, including teacher check, teacher guidance, teacher will explain, teacher will show, or wait for teacher instruction
- Teacher of Record language is limited to support, intervention, checkpoint, submission, clarification, retake, and workflow decisions
- the page is self-contained enough that the student can learn from the lesson without a live teacher filling in missing steps

If this checkpoint finds a defect, stop transfer for the affected scope. Correct the repository file first, rerun the relevant audit or checkpoint, and only then continue Moodle transfer. Do not fix repository defects directly inside Moodle.

## Mandatory Rules

- Repository HTML is the source of truth.
- Moodle is the destination.
- Use one active Moodle transfer owner per course.
- Use one dedicated browser session per active transfer agent.
- Do not delete Moodle pages, activities, course sections, files, quizzes, question banks, or repository files.
- Do not create new Moodle pages unless the user explicitly asks.
- Do not use Moodle import, GIFT, or XML for lesson page transfers.
- Do not paste into the normal rich text editor as the final method.
- Transfer by opening Moodle `Tools > Source code` and pasting the exact current repository HTML into that source-code dialog.
- If the source-code dialog is blank, paste directly into the blank source-code content area; do not run select-all/delete on an empty page.
- If the source-code dialog already contains content, or the page is being corrected/replaced, click inside the actual code content area, not the line-number gutter, then select all existing source, delete it, and paste the repository HTML.
- After saving/updating the source-code dialog, immediately use the visible Moodle content box as the quick visual audit before clicking Moodle `Save page`. If the colored boxes, borders, spacing, headings, tables, visuals, and page layout visibly render correctly in the content box, click `Save page` without running a separate preview audit for that page.
- If the content box is empty, stripped to plain layout, visually wrong, or shows wrong-page content or artifacts, do not click Moodle `Save page`. Reopen `Tools > Source code`, replace the source again, save/update the dialog again, and re-check the content box.
- Do not paste lesson HTML into the visible TinyMCE editor, Moodle content box, hidden editor textarea, browser DOM field, or any surface other than `Tools > Source code`. Those methods can strip boxes, inline styles, colors, borders, spacing, layout, and embedded visuals.
- A lesson page is not academy-compliant unless the transfer log explicitly certifies `Paste method: Tools > Source code` and the audit confirms the rendered page preserved the repository visual structure.
- Do not transfer `P05.html` unless the user explicitly asks.
- Save and verify each Moodle page before moving to the next page.
- Log every confirmed saved page in the course Moodle upload log.

## Required Page Scope

Standard Moodle lesson transfer scope is:

- `P01.html`
- `P02.html`
- `P03.html`
- `P04.html`
- `P06.html`
- `P07.html`

`P05.html` is excluded from standard lesson transfer unless explicitly requested.

## Required Agent Behavior

The main agent must:

1. Read the transfer standard.
2. Identify the course, unit, lesson, Moodle course URL, Moodle activity, and repository folder.
3. Assign one transfer owner per course.
4. Define subagent roles using the required assignment format in the transfer standard.
5. Verify transfer logs and subagent reports.
6. Inspect and resolve discrepancies.
7. Report final pass/fail to the user.

No agent may start Moodle transfer from a vague instruction. The assignment must include course, unit, scope, allowed actions, and expected output.

## Required Audit Decision

The Moodle render audit must verify both transfer method and visual result.

PASS requires:

- the transfer log explicitly states `Paste method: Tools > Source code` for each lesson page
- existing Moodle source was replaced with the exact repository HTML source
- the rendered Moodle page preserves styled boxes, colors, borders, spacing, layout, tables, visuals, and workflow sections from the repository file
- no page was transferred through the visible/rich text editor as the final method

If the only evidence says "pasted into the editor," "pasted as HTML," "content box," "TinyMCE editor," or similar wording without `Tools > Source code`, the audit decision must be FAIL or NOT SOURCE-CERTIFIED until the affected pages are verified through the source-code dialog or re-transferred through `Tools > Source code`.
