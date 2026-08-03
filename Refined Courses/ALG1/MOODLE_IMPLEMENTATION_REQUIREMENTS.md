# Moodle Implementation Requirements

Status: Approved architecture input for Workflow 02.

## Course structure

- Create eight approved unit folders in the order defined by `COURSE_MAP.md` and `UNIT_AND_LESSON_MAPPING.md`.
- Create 64 lesson records and eight separate unit pretests.
- Every unit begins with an ungraded pretest carrying zero grade weight.
- A pretest score of 90% or higher records accelerated-path eligibility; pathway content and routing are administered separately.
- Every unit’s final lesson is a synthesis lesson containing the graded unit assessment. It must not be an assessment-only shell.
- Quizzes may be lesson-level or clustered exactly as identified in the approved assessment map; do not create a quiz merely because a lesson exists.

## Required lesson shell

Each lesson must preserve the MLA shell and header conventions and include:

1. Lesson Overview and Learning Objectives
2. Vocabulary only when required by the lesson content
3. Approved notebook task(s)
4. Guided instruction and worked examples
5. Guided and independent practice
6. Checkpoint or other approved formative evidence
7. Help and Teacher-of-Record Support
8. Quiz only where the assessment map assigns one

Workflow 02 may create structure and trackers but must not transfer Savvas instructional content or assessment questions.

## Lesson metadata

Each production record must include the MLA lesson ID, unit and sequence, title, student objective, Florida benchmark codes, Savvas lesson/source name, Savvas URL or source identifier, required resources, vocabulary decision, formative evidence, quiz relationship, notebook evidence, accessibility requirements, and attribution/licensing status.

## Technical and accessibility requirements

- Use MathJax-compatible markup for equations, exponents, radicals, factoring, function notation, and inequalities.
- Use responsive tables and accessible graph/image handling with meaningful alternative text.
- Preserve passage, graph, table, and image dependencies with assessment items.
- Record external URLs, required authentication, browser requirements, and a failure alternative.
- Provide accessible alternatives when an interactive cannot operate outside Savvas.
- Keep teacher-only answer keys separate from student-facing resources.

## Savvas and licensing controls

- Treat MathXL, Savvas interactives, videos, eText pages, printable/editable resources, assessment banks, and answer keys as licensed links unless copying permission is explicitly confirmed.
- Do not embed or transfer proprietary Savvas pages or questions during Workflow 02.
- Assessment licensing/exportability confirmation is a gate for question transfer and Moodle assessment population, not for creating the repository baseline and production trackers.
- Record `License/Export Status: Pending` wherever rights have not yet been confirmed.

## Gradebook controls

- Unit pretests: zero weight and excluded from final grade.
- Unit assessments: graded and assigned to the final synthesis lesson.
- Quiz objects and weights: only those approved in the assessment map.
- Notebook, checkpoint, quiz, and unit-assessment weights must follow the separately approved grading policy; Workflow 02 must not invent weights.

## Workflow 02 boundary

Workflow 02 is authorized to create the production baseline, unit folders, trackers, task files, dashboard, manifest, and change log. It is not authorized to write instructional lessons, copy Savvas content, transfer questions, or alter the approved architecture.
