# Chemistry Template Conformance Repair and Reaudit

Date: 2026-07-14

## Scope

This audit checked Chemistry lesson page template conformance against the Moodle-safe ALG1-style fragment pattern.

Required template rules:

- No `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, or `<main>` wrappers.
- Each page begins with a standalone styled course header.
- Pages use styled `<div>` content blocks instead of full-document shells.
- Exactly one `class="mla-tor-support-box"` appears on each page.
- P01-P07 role labels and required student-facing instructional sections remain present.
- No backend assessment filenames appear in student pages.
- No empty section or div containers remain.

## Initial Findings

Initial Chemistry template scan failed:

- Lesson directories checked: 48
- HTML pages checked: 336
- Full document shell pages: 336
- ALG1-style Chemistry headers: 0
- TOR support box count failures: 336

This would cause Moodle rendering problems because the pages were full HTML documents instead of Moodle-safe fragments.

## Repo Corrections Made

The repair converted all 336 Chemistry lesson pages to the ALG1-style Moodle fragment structure.

Corrections included:

- Removed full HTML document shells from all P01-P07 lesson pages.
- Added standardized header block: `CHEMISTRY | Unit ## | Lesson ##`.
- Added P01-P07 role cards using the established lesson page labels.
- Converted section and div containers to styled `<div>` blocks suitable for Moodle page content.
- Normalized Teacher of Record support boxes to exactly one `mla-tor-support-box` per page.
- Preserved lesson content, standards language, notebook tasks, guided practice, independent work, lab/safety notes, worked examples, and checkpoint content.
- Normalized required page text where needed, including notebook title, worked-example labels, guided practice labels, independent-work parts, checkpoint submission workflow, mastery language, and correction/intervention wording.

No assessment XML files were changed in this template repair.

## Final Validation

Final strict template gate passed:

- Lesson directories checked: 48
- Pages expected: 336
- HTML pages found: 336
- Template findings: 0
- Full document shell pages: 0
- Chemistry header count: 336
- TOR support box count failures: 0

## Moodle Transfer Note

Science courses have not been transferred yet. The Chemistry repository pages should be transferred from the corrected repo state so Moodle receives fragment-safe page HTML rather than full HTML documents.
