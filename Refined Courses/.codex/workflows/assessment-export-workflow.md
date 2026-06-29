# Assessment Export Workflow

## Purpose

Copy certified Moodle-ready `.gift` files from a course into the thumb drive assessment folder.

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

- Copy `.gift` files only.
- Preserve exact filename unless conflict exists.
- Overwrite older copies with current certified version.
- Preserve UTF-8 plain text exactly.
- No formatting conversion.
- Validate source and destination text match exactly.

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
- source/destination mismatches
- final decision PASS or FAIL

