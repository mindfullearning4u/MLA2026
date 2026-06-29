# Course Completion Audit Standard

## Purpose

Run this audit after all units are complete. It certifies that the full course is production-ready, accreditation-ready, and compliance-ready.

## Accreditation Principle

Accreditation and compliance are not end-of-project cleanup steps. Every course must be built from the beginning with:

- standards traceability
- documented mastery progression
- consistent lesson structure
- valid assessments
- student support
- defensible audit evidence
- final certification reporting

## Required Inputs

Use:

- mapping trace table
- all unit completion audits
- all current course files
- current assessment files
- current metadata files
- current final validation results
- resource/simulation audit
- `.codex/standards/*`

Do not rely only on prior certification reports. Validate current files directly.

## Full Course Inventory

Verify:

- all required units exist
- all required lessons exist
- all required pages exist
- all `lesson.json` files exist and are valid
- all `quiz.json` files exist and are valid
- all pretests exist
- all guided practice banks exist
- all lesson quiz banks exist
- all unit assessments exist

## Standards and Mapping Certification

Verify:

- every mapped standard appears in the intended course location
- no mapped standard is missing
- no unauthorized standard is introduced
- no standard is orphaned
- no duplicate primary ownership appears unless mapping allows it
- lesson titles match mapping
- lesson purposes match mapping
- Lesson 8 in every unit is synthesis

## Instructional Certification

Verify:

- lessons are self-contained
- instruction is sequential and teacher-like
- P04 has three worked examples in every lesson
- P06/P07 are self-contained
- passages are included wherever needed
- visuals support mastery
- common misconceptions are addressed
- locked-content suggestions are reported separately

## Assessment Certification

Verify:

- all GIFT files are Moodle-ready
- all required counts are met
- every question has four choices
- every question has one correct answer
- standards are displayed
- feedback is teachable
- answer patterns are avoided
- visual necessity was reviewed question by question
- no HTML contamination
- no malformed syntax
- no duplicate stems or answer choices

## Technical and LMS Certification

Verify:

- page files are in order
- HTML is Moodle-safe
- no broken containers
- no empty containers
- no text outside containers
- exactly one TOR support box per page
- no backend filenames visible
- no mojibake/corruption
- no invalid JSON
- no zero-byte required metadata files

## External Resource Certification

Verify:

- every course was reviewed for free external learning resources
- math courses were reviewed for appropriate interactive tools or simulations
- science courses with lab components completed mandatory simulation review
- suggestions are approval-only
- no unapproved external resources were inserted

## Final Course Audit Output

Create or recommend:

`[COURSE]/Course Audit/[COURSE]_FINAL_COURSE_COMPLETION_AUDIT.md`

Required final decision:

- CERTIFIED
- CERTIFIED WITH SUGGESTIONS
- NOT CERTIFIED

`CERTIFIED` requires no unresolved blockers.

`CERTIFIED WITH SUGGESTIONS` means all compliance requirements pass, but optional improvements remain.

`NOT CERTIFIED` means at least one required standard, structure, assessment, mapping, LMS, or compliance item failed.

