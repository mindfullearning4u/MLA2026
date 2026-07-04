# Assessment Export Workflow

## Purpose

Copy certified Moodle-ready `.xml` files from a course into the thumb drive assessment folder.

## Source

`C:/MLA/MLA2026/Refined Courses/[COURSE]`

or the current repository course folder when explicitly requested.

## Destination

`D:/Assessment/COURSE_NAME/`

Create:

- `Unit 01`
- `Unit 02`
- `Unit 03`
- `Unit 04`
- `Unit 05`
- `Unit 06`

## Files to Export Per Unit

- Unit Pretest
- Lesson 01 Guided Practice
- Lesson 01 Lesson Quiz
- Lesson 02 Guided Practice
- Lesson 02 Lesson Quiz
- Lesson 03 Guided Practice
- Lesson 03 Lesson Quiz
- Lesson 04 Guided Practice
- Lesson 04 Lesson Quiz
- Lesson 05 Guided Practice
- Lesson 05 Lesson Quiz
- Lesson 06 Guided Practice
- Lesson 06 Lesson Quiz
- Lesson 07 Guided Practice
- Lesson 07 Lesson Quiz
- Lesson 08 Guided Practice
- Lesson 08 Unit Assessment

## Rules

- Copy `.xml` Moodle XML files only.
- Preserve exact filename unless conflict exists.
- Overwrite older copies with current certified version.
- Preserve UTF-8 XML exactly.
- No conversion during export.
- Validate XML structure before export.
- Validate embedded visuals/stimulus are present where required before export.
- Validate source and destination files match exactly.
- Do not export `.gift` files. GIFT is legacy/source material only.

## Report

Create:

`D:/Assessment/COURSE_NAME/COURSE_NAME_ASSESSMENT_EXPORT_REPORT.md`

Include:

- source folder
- destination folder
- files copied
- files overwritten
- files missing
- validation failures
- XML validation failures
- missing embedded visual/stimulus failures
- source/destination mismatches
- final decision PASS or FAIL
