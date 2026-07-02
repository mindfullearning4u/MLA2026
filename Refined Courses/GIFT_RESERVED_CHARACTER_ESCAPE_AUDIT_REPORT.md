# GIFT Reserved Character Escape Audit Report

Audit date: 2026-07-01

## Purpose

Moodle GIFT import treats unescaped reserved characters inside answer text as control characters. This audit corrected answer choices where mathematical equations or inequalities used unescaped reserved characters, causing Moodle to split answer choices during import.

## Required Escape Rule

Visible answer-choice text must escape:

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

## Scope

Active `.gift` files were audited across the repository, excluding `_Archive`.

Initial scan:

- Active GIFT files checked: 2,004
- Files with unescaped answer-text reserved characters: 236
- Answer-choice lines corrected: 4,367

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

- Remaining unescaped reserved characters inside visible answer-choice text: 0
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
