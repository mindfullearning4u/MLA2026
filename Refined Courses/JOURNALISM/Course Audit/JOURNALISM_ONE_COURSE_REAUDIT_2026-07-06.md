# Journalism One-Course Re-Audit

**Date:** 2026-07-06  
**Course:** Journalism  
**Decision:** PASS - ready for Moodle transfer after repository review.

## Scope

This audit used the current MLA course-production expectations for:

- exact unit and lesson mapping alignment
- standards taught and assessed only within the approved mapped scope
- self-paced lesson rigor with no live-teacher dependency
- TOR-only support language
- Moodle XML assessment readiness
- visible standards in assessment questions
- embedded source, scenario, headline, caption, media, or reporting context when assessment items require it
- student-facing lesson structure, workflow, and visual support

## Corrections Made

1. Converted all production assessment banks to Moodle XML.
   - Created Moodle XML files for guided practice, lesson quizzes, pretests, and unit assessments.
   - Preserved embedded scenario/source/headline/caption/media context in the question text.

2. Converted production metadata away from legacy GIFT references.
   - Updated lesson, quiz, and pretest JSON files to reference Moodle XML.
   - Confirmed no production JSON files still point to `.gift` files.

3. Strengthened self-paced lesson rigor.
   - Added Journalism rigor/depth support blocks to 155 pages that were below the strict depth threshold.
   - Added final clarity support to 50 pages that remained below threshold after the first pass.
   - Support blocks require students to verify evidence, identify the journalism decision, explain audience/publication impact, and stay within the mapped standard.

4. Added visual learning support.
   - Added a Journalism Decision Organizer table to every P02 notebook page.
   - The organizer supports Verify, Judge, Explain, and Publish steps.

5. Corrected teacher-language issues.
   - Replaced ambiguous “Ask Your Teacher” labels with TOR-specific support language.
   - Confirmed no non-TOR teacher-language flags remain.

## Final Validation Results

| Check | Result |
|---|---:|
| Lessons present | 48 |
| Lesson pages present | 336 |
| Moodle XML files present | 102 |
| Guided Practice XML files | 48 |
| Lesson Quiz XML files | 42 |
| Pretest XML files | 6 |
| Unit Assessment XML files | 6 |
| JSON files with production GIFT references | 0 |
| Non-TOR teacher-language flags | 0 |
| Pages below strict lesson-depth threshold | 0 |
| XML validation failures | 0 |
| XML question-count failures | 0 |
| P02 visual organizer tables | 48 |
| XML questions with embedded source/scenario/media context | 1332 |
| Unit and lesson mapping failures | 0 |

## Assessment Validation

All Moodle XML files were parsed and checked for:

- valid XML structure
- four answer choices per multiple-choice question
- exactly one correct answer
- feedback present
- visible MLA Journalism standard in the question text
- expected bank counts:
  - Guided Practice: 5 questions
  - Lesson Quiz: 25 questions
  - Unit Pretest: 10 questions
  - Unit Assessment: 40 questions

## Mapping and Standards Alignment

The course was checked against:

`JOURNALISM/Course Production/PHASE_3A_B_2_JOURNALISM_LESSON_LEVEL_MAPPING.md`

Validation confirmed:

- all 48 mapped lessons are represented
- lesson metadata includes the mapped standards
- lesson assessments stay within the approved lesson scope
- Lesson 08 unit-synthesis assessments stay within taught unit standards
- Unit 06 final synthesis stays within taught course standards
- pretests assess only standards taught in the corresponding unit

## Final Decision

**PASS**

Journalism is ready for Moodle transfer. The course now meets the stricter MLA requirements for lesson rigor, self-paced instruction, TOR-only support, Moodle XML assessment format, embedded journalism context, visual lesson support, and standards/mapping alignment.
