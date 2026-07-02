# GIFT Reserved Character Escape Audit Report

Audit dates: 2026-07-01 and 2026-07-02

## Purpose

Moodle GIFT import treats unescaped reserved characters inside displayed GIFT text as control characters. This audit corrected answer choices, question stems, and feedback where mathematical equations or inequalities used unescaped reserved characters, causing Moodle to split text into unintended answer choices during import.

## Required Escape Rule

Displayed GIFT text must escape these reserved characters in question stems, visible answer-choice text, and feedback text:

- `=` as `\=`
- `~` as `\~`
- `#` as `\#`
- `{` as `\{`
- `}` as `\}`
- `>=` as `>\=`
- `<=` as `<\=`

The leading answer control must remain unchanged:

- Correct answer choices still begin with `=A.`, `=B.`, `=C.`, or `=D.`
- Incorrect answer choices still begin with `~A.`, `~B.`, `~C.`, or `~D.`

The structural feedback delimiter `#` must remain unchanged, but reserved characters inside the feedback after that delimiter must be escaped.

## Scope

Active `.gift` files were audited across the repository, excluding `_Archive`.

Initial scan:

- Active GIFT files checked: 2,004
- Files with unescaped answer-text reserved characters: 236
- Answer-choice lines corrected: 4,367

Second Moodle-preview follow-up scan:

- Active GIFT files checked: 2,004
- Files with unescaped feedback or stem reserved characters: 490
- Feedback lines with unescaped reserved characters: 2,502
- Question or metadata text lines with unescaped reserved characters: 3,369
- Files corrected in second pass: 490
- Lines corrected in second pass: 5,871

Files corrected by course:

- ALG1: 64
- ALG2: 84
- GEOMETRY: 31
- Math for College Readiness: 15
- PRECALCULUS: 33
- STATISTICS: 9

## Permanent Pipeline Updates

The following reusable standards/workflows were updated:

- `.codex/standards/06-assessment-gift-standard.md`
- `.codex/workflows/assessment-export-workflow.md`
- `.codex/workflows/course-build-workflow.md`
- `.codex/agent-prompts/assessment-auditor-subagent.md`
- `.codex/standards/15-detail-compliance-audit-matrix.md`

## Validation Results

Post-fix parser validation:

- Remaining unescaped reserved characters inside question text, visible answer-choice text, and feedback text: 0
- Files with remaining escape failures: 0

Local structural note:

- The reserved-character validation passed.
- A separate structure scan found pre-existing blank-line/block-separation issues in some ELA GIFT files. Those were not part of this operator-escaping defect and were not changed in this pass.

## Moodle Import Validation

Actual Moodle import validation was not run in this workspace because no Moodle instance or Moodle import tool is available to Codex here.

Required manual Moodle spot check before final certification sign-off:

- Import representative equation items.
- Import representative `>=` inequality items.
- Import representative `<=` inequality items.
- Confirm answer text displays correctly.
- Confirm answer choices do not split.
- Confirm exactly one correct answer remains.
- Confirm feedback imports and displays correctly.

## Final Decision

PASS for repository reserved-character escape remediation and local validation.

Moodle import confirmation remains a required external validation step before marking affected exported banks as Moodle-import verified.
