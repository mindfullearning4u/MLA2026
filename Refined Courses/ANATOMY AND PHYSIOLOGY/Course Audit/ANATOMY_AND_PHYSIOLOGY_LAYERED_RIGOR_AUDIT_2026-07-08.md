# Anatomy and Physiology Layered Rigor Audit

Date: 2026-07-08

## Final Decision

SUPERSEDED - PRIOR FAILURE CORRECTED

This audit documented the failure condition found before the July 8 rigorous rebuild. It is retained as an evidence trail, but it no longer represents the current state of the course.

Current controlling certification file:

- `ANATOMY_AND_PHYSIOLOGY_FINAL_MOODLE_TRANSFER_READY_AUDIT_2026-07-08.md`

Correction completed after this failure audit:

- Units 01-06 rebuilt with lesson-specific anatomy and physiology teaching profiles.
- P02-P04 now include step-by-step body-system, process, diagram, model, graph, or case-data reasoning tied to the mapped lesson standard.
- Required lab/model/data resources remain direct links and include step-by-step student directions for what to open, observe, record, and use.
- Moodle XML assessments were regenerated with lesson-specific scenarios, content-specific answer choices, exactly four choices, exactly one correct answer, and teachable feedback.
- Validation now rejects the prior generic XML wording, duplicate answer choices, duplicate stems, missing standards, invalid XML, and prohibited resource/teacher-language patterns.

## Audit Layers

| Layer | Result | Finding |
|---|---|---|
| Course structure | PASS | Six units, forty-eight lessons, P01-P07 pages, JSON files, and Moodle XML files are present. |
| Mapping alignment | CONDITIONAL PASS | Lesson titles and standards follow the existing unit and lesson mapping, but deeper content must be checked lesson by lesson during redevelopment. |
| Lab / model / data resource presence | CONDITIONAL PASS | Direct links and step-by-step resource directions are present, but the lesson teaching around those resources is not consistently deep enough. |
| Lesson rigor | FAIL | Many pages use generic structure-function teaching language instead of detailed anatomy/physiology instruction for the specific body system, tissue, process, case, graph, or model. |
| Assessment rigor | FAIL | XML assessments are structurally valid but not academically valid. Many questions repeat generic mastery language and do not assess the exact anatomy/physiology content. |
| Visual/model specificity | FAIL | Required visuals are named, but many lessons do not include enough embedded diagram interpretation, sequence modeling, histology guidance, anatomy labeling, physiological graph interpretation, or case-data explanation. |
| Feedback quality | FAIL | Feedback is mostly generic and must be rewritten as specific teachable moments tied to the anatomy/physiology misconception in each answer choice. |
| Accreditation readiness | FAIL | The course should not be represented as final student-ready until unit-by-unit redevelopment and layered audits pass. |

## Specific Red Flags Observed

- Example lesson pages describe a general process such as "Name the structure or process" instead of teaching the actual anatomy or physiology in depth.
- Example assessment XML contains repeated answer choices such as "Use the required model or data to connect structure, function, and evidence..." across questions.
- Some XML question stems are incomplete or generic, such as asking which response best shows mastery without a content-specific scenario.
- The course currently passes structural checks but fails the deeper instructional and assessment validity standard expected for MLA student-ready science courses.

## Required Corrections

1. Rebuild Unit 01 through Unit 06 one unit at a time.
2. For every lesson, rewrite P02, P03, and P04 with lesson-specific step-by-step teaching that a veteran Anatomy and Physiology teacher would give.
3. Add concrete anatomy diagrams, histology descriptions, process sequences, physiological graphs, data tables, and medical case evidence directly in the lesson where needed.
4. Rebuild all Moodle XML assessments so every question assesses the exact mapped lesson or unit content.
5. Replace generic answer choices with content-specific distractors based on likely student misconceptions.
6. Replace generic feedback with detailed teachable feedback tied to the specific correct or incorrect anatomy/physiology reasoning.
7. Run unit-level audits after each unit is corrected.
8. Run a final course-level audit only after all six unit audits pass.

## Required Unit Audit Sequence

| Audit | Requirement |
|---|---|
| Unit mapping audit | Every lesson and assessment matches only the mapped unit/lesson standards. |
| Lesson rigor audit | P02-P04 teach the specific concept step by step with examples and anticipated confusion. |
| Visual/model audit | Required diagrams, histology images/descriptions, body-system models, process sequences, graphs, tables, and case data are present where warranted. |
| Resource audit | Direct links are exact and include what to click, observe, record, and submit. |
| Assessment audit | Guided practice, lesson quiz, pretest, and unit assessment XML questions are specific, valid, aligned, and include teachable feedback. |
| Structure audit | P01-P07, JSON metadata, XML files, workflow, TOR support, and Moodle readiness are complete. |

## Final Statement

This file records the original failure condition. The current course status is controlled by the final Moodle transfer ready audit, which reports zero validation failures after the rigorous rebuild.
