# Anatomy and Physiology Moodle Update Change List

Date: 2026-07-12

Repo decision: PASS AFTER CORRECTION

Purpose: Moodle handoff list for any agent transferring or updating Anatomy and Physiology from the corrected repository.

## Required Moodle Lesson Updates

If Anatomy and Physiology has already been transferred to Moodle, update the lesson pages from the corrected repo.

Changed lesson page scope:

- All 48 lessons had `P01.html` updated with Science Safety and Resource Note language.
- All 48 lessons had direct resource label cleanup.
- All 336 lesson pages now include an embedded model/data table.
- 26 `P05.html` pages received additional Independent Mastery Check sections.

Minimum standard Moodle lesson update scope:

- Re-transfer/update `P01.html`, `P02.html`, `P03.html`, `P04.html`, `P06.html`, and `P07.html` for all 48 lessons.
- Also update `P05.html` anywhere Moodle includes or displays P05 pages, because 26 P05 files changed and all P05 files now include embedded model/data tables.

## Required Moodle Assessment Updates

Re-import or update all 102 Moodle XML assessment banks from the corrected repo.

Changed assessment scope:

- All 102 XML files had answer order resequenced to remove predictable answer patterns.
- All 1,590 XML questions now include embedded stimulus tables.
- Six XML banks received additional answer-pattern repair after the initial resequence.

Assessment banks to update:

- 48 Guided Practice XML files
- 42 Lesson Quiz XML files
- 6 Unit Pretest XML files
- 6 Unit Assessment XML files

## Repo-Only Updates

These do not require a Moodle page import unless the Moodle course displays internal metadata files:

- 48 `lesson.json` files normalized
- 48 `quiz.json` files normalized
- 6 `pretest.json` files created
- Source wording updated in inventory/crosswalk
- MLA traceability sections added to lab/resource mapping files

## Moodle Verification Checklist

After update/import, verify:

- Every expected lesson page is present and nonblank.
- P01 pages show Science Safety and Resource Note.
- P03 pages show Direct Resource Link.
- Lesson pages display embedded model/data tables.
- No old `Direct Lab, Model, or Data Resource` heading appears.
- Every quiz bank imports without XML errors.
- Guided Practice banks have 5 questions.
- Lesson Quiz banks have 25 questions.
- Unit Pretests have 10 questions.
- Unit Assessments have 40 questions.
- Each question displays an MLA standard and embedded stimulus table.
- Answer choices do not show manual A/B/C/D prefixes.
