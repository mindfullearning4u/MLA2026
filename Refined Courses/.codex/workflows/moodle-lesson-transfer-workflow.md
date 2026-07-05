# Moodle Lesson Transfer Workflow

## Required Standard

Before any agent transfers repository lesson pages into Moodle, the agent must read and follow:

`Codex Moodle Transfer Instructions/TRANSFER_LESSONS_TO_MOODLE.md`

This file is the controlling standard for Moodle lesson page transfer. It applies whenever the user asks to transfer, load, copy, update, or paste repository lesson pages into Moodle.

## Mandatory Rules

- Repository HTML is the source of truth.
- Moodle is the destination.
- Use one active Moodle transfer owner per course.
- Use one dedicated browser session per active transfer agent.
- Do not delete Moodle pages, activities, course sections, files, quizzes, question banks, or repository files.
- Do not create new Moodle pages unless the user explicitly asks.
- Do not use Moodle import, GIFT, or XML for lesson page transfers.
- Do not paste into the normal rich text editor as the final method.
- Transfer by replacing the Moodle source-code editor content with the exact current repository HTML.
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
