# Chemistry Template Conformance Audit

Date: 2026-07-14

## Decision

FAIL

Chemistry does not pass the added structure/template conformance gate. Prior Chemistry course audits verified content completion, standards/metadata, direct links, lesson rigor markers, and assessment XML, but this added gate checks whether every lesson page follows the approved P01-P07 page template consistently.

## Scope

Course folder: `CHEMISTRY`

Template standard checked:

- `.codex/standards/03-lesson-page-model-p01-p07.md`

Files checked:

- 48 lesson folders
- 336 lesson HTML pages
- P01 through P07 for every lesson

## Template Checks Performed

The audit checked every Chemistry lesson page for:

- expected P01-P07 page-role text
- course lesson wrapper consistency
- required P01 overview sections
- required P02 notebook/vocabulary structure
- required P03 common-mistake structure
- required P04 three worked examples and common-mistake structure
- required P05 guided-practice page language
- required P06 independent-work structure with Part A, Part B, and Part C
- required P07 checkpoint structure, submission workflow, 80% mastery language, correction/resubmission language, and Teacher of Record intervention language
- exactly one Teacher of Record support box per page
- no backend assessment filename leakage
- no empty section/div containers

## Findings

### Major Finding 1: Units 03-06 Use A Different Legacy Template

Units 03, 04, 05, and 06 do not match the current Chemistry page template used in Units 01-02.

Evidence:

- Unit 01 pages checked: 56; pages with P01-P07 model role text: 56
- Unit 02 pages checked: 56; pages with P01-P07 model role text: 56
- Unit 03 pages checked: 56; pages with P01-P07 model role text: 0
- Unit 04 pages checked: 56; pages with P01-P07 model role text: 0
- Unit 05 pages checked: 56; pages with P01-P07 model role text: 0
- Unit 06 pages checked: 56; pages with P01-P07 model role text: 0

### Major Finding 2: Units 03-06 Do Not Use The Current Chemistry Wrapper

Units 01 and 02 use the current Chemistry `<main>` page wrapper. Units 03-06 do not.

Evidence:

- Unit 01 pages with `<main>` wrapper: 56/56
- Unit 02 pages with `<main>` wrapper: 56/56
- Unit 03 pages with `<main>` wrapper: 0/56
- Unit 04 pages with `<main>` wrapper: 0/56
- Unit 05 pages with `<main>` wrapper: 0/56
- Unit 06 pages with `<main>` wrapper: 0/56

### Major Finding 3: Mojibake Appears In Units 03-06

Units 03-06 include pages with a mojibake marker before or near the document start.

Evidence:

- Unit 03 pages with mojibake marker: 48/56
- Unit 04 pages with mojibake marker: 48/56
- Unit 05 pages with mojibake marker: 48/56
- Unit 06 pages with mojibake marker: 48/56
- Total pages with mojibake marker in Units 03-06: 192

## Moodle Impact

No Chemistry lesson HTML files or assessment XML files were changed by this audit.

Chemistry should not be considered template-conformance complete until Units 03-06 are repaired in the repository and then the same corrected lesson pages are updated in Moodle if Chemistry has already been transferred.

## Required Repair Before PASS

To pass this added gate, repair Units 03-06 so every P01-P07 page follows the same current Chemistry lesson-page structure used by Units 01-02:

- restore consistent course/unit/lesson wrapper
- restore P01-P07 page-role labels
- remove mojibake markers
- preserve mapped standards and science safety/resource directions
- preserve one Teacher of Record support box per page
- preserve existing lesson content, visuals/resources, worked examples, independent work, and checkpoint tasks

After repair, rerun this template conformance audit before any final Moodle enrollment checkpoint.
