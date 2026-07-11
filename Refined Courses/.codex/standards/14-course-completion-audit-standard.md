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
- unit/category subagent coverage table
- all unit instructional rigor subagent reports
- all unit structure/workflow subagent reports
- all unit assessment alignment subagent reports
- all unit assessment visual/XML subagent reports
- all unit metadata/LMS-format subagent reports
- cross-check verification subagent report
- final certification subagent report
- all current course files
- current assessment files
- current metadata files
- current final validation results
- resource/simulation audit
- `.codex/standards/*`

Do not rely only on prior certification reports. Validate current files directly.

Do not rely only on scripts, tools, or main-agent direct inspection. For full course certification, ALG1-level layered subagent evidence is required. A course cannot be certified if the required unit/category subagent coverage is missing or incomplete.

## Completion and Commit Gate

A course cannot be called completely built, clean, certified, student-ready, or Moodle-transfer-ready until:

- every confirmed audit finding has been corrected or explicitly documented as blocked
- every affected unit/category audit has been rerun after the correction
- every required lesson, assessment, metadata, mapping, or course-production change has been saved in the repository
- every required course-content change has been committed
- the course working tree is clean, or the only remaining uncommitted items are intentionally excluded logs, transfer notes, or user-owned files named in the final report

If a valid audit finding remains unfixed, if rerun evidence is missing, or if required course-content changes are still uncommitted, the final decision must be `NOT CERTIFIED`.

## Required Subagent Coverage Certification

Verify:

- each unit has an instructional rigor audit
- each unit has a structure/workflow audit
- each unit has an assessment alignment audit
- each unit has an assessment visual/XML audit
- each unit has a metadata/LMS-format audit
- science/lab courses have resource/simulation review
- cross-course source/mapping analysis was completed
- cross-check verification reviewed whether subagents missed anything
- every valid subagent finding was inspected by the main agent
- every confirmed defect was fixed or documented as blocked
- affected audits were rerun after fixes

If any required unit/category audit is missing, unsupported, or lacks mapping/current-file evidence, final decision must be `NOT CERTIFIED`.

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
- every mapped standard appears in instruction and in appropriate assessment evidence
- no unauthorized standard is introduced
- no standard is orphaned
- no duplicate primary ownership appears unless mapping allows it
- lesson titles match mapping
- lesson purposes match mapping
- the final lesson in every unit is synthesis: Lesson 8 for 1.0-credit courses and Lesson 5 for 0.5-credit courses
- every lesson, page, guided practice, quiz, pretest, and unit assessment cites or traces to the approved mapping
- no old unit overview or old source artifact is used as source-of-truth mapping

## Instructional Certification

Verify:

- lessons are self-contained
- instruction is sequential and teacher-like
- P04 has three worked examples in every lesson
- P06/P07 are self-contained
- passages are included wherever needed
- visuals support mastery
- for social studies/social science courses, maps, timelines, charts, tables, source excerpts, source organizers, civic/process visuals, political visuals, and data displays are embedded wherever needed for mastery
- common misconceptions are addressed
- locked-content suggestions are reported separately

## Assessment Certification

Verify:

- all production assessment files are Moodle-ready XML
- all required counts are met
- every question has four choices
- every question has one correct answer
- standards are displayed
- feedback is teachable
- answer patterns are avoided
- visual necessity was reviewed question by question
- mapping alignment was reviewed question by question
- no mapped standard is missing assessment coverage
- no assessment question reaches outside its approved lesson or unit mapping
- no malformed XML or broken embedded media
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
- social studies/social science courses were reviewed for embedded source and visual supports; simulations are not required unless explicitly requested or mapped
- suggestions are approval-only
- no unapproved external resources were inserted
- approved or required labs, simulations, data sets, and resources include exact direct clickable URLs
- no required resource asks students to search, browse a provider homepage, or guess which activity to open

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

`NOT CERTIFIED` is also required when the subagent coverage table is incomplete or when any subagent PASS lacks evidence.

`NOT CERTIFIED` is also required when required audit corrections remain unmade, affected audits have not been rerun, or required course-content changes remain uncommitted.
