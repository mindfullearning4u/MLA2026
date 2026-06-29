# Assessment GIFT Standard

## Purpose

Assessment files must be ready for Moodle test-bank import and must support mastery through standards-aligned questions and teachable feedback.

## Required Assessment Counts

Default math requirement:

- Guided Practice = 5 questions
- Lesson Quiz Bank = 25 questions; Moodle delivery pulls 5 random questions per attempt
- Unit Pretest = 10 questions
- Unit Assessment Bank = 40 questions

If a course-specific standard conflicts, report the conflict and use the current course standard only after confirmation.

## Required File Types

Assessment files must be:

- `.gift`
- UTF-8
- plain text
- Moodle-ready
- no HTML
- no rich text
- no formatting conversion

Math notation must use UTF-8 mathematical plain text:

- use superscripts for exponents, such as `x²`, `2³`, `10⁻²`, and `16⁽¹⁄²⁾`
- do not use caret notation such as `x^2`, `2^3`, or `16^(1/2)` in final assessment files
- keep notation plain text; do not use HTML, images, MathJax, LaTeX delimiters, or rich-text conversion for exponent formatting

## Required Question Structure

Each question must include:

- GIFT question marker when used
- Question ID
- MLA Standard or approved support-standard note
- question text
- exactly four answer choices
- answer choices labeled A, B, C, D
- exactly one correct answer
- feedback for every answer choice

## Feedback Requirement

Feedback must explain:

- why the correct answer is correct
- what misconception each incorrect answer represents
- what the student should notice or do next time

Prohibited feedback:

- "Correct."
- "Incorrect."
- "Try again."
- "Good job."
- one-word feedback
- feedback that does not teach

## Moodle Safety Requirements

GIFT files must avoid:

- HTML tags
- malformed braces
- duplicate answer choices
- duplicate question stems
- missing correct answers
- more than one correct answer
- unsupported rich formatting
- backend filenames in question text
- internal blank lines that create import artifacts

## Assessment Alignment

Assessment scope is locked to the approved course source documents. Auditors and builders must verify every assessment question against the course crosswalk, unit mapping, and lesson mapping before marking the file complete.

Each question must align to the correct assessment scope:

- Guided Practice questions must assess only the specific lesson being practiced.
- Lesson Quiz Bank questions must assess only the specific lesson attached to that quiz.
- Unit Pretest questions must assess only standards, skills, and concepts that are taught in that unit according to the approved unit mapping and lesson mapping.
- Unit Assessment Bank questions must assess only material covered in that unit according to the approved unit mapping and lesson mapping.
- No assessment may ask questions from a future lesson, future unit, omitted standard, unapproved support skill, or topic not present in the certified mapping.
- Every question must trace to an approved standard or approved support-standard note.

Required alignment evidence:

- course crosswalk source
- unit mapping source
- lesson mapping source
- assessment file path
- question ID
- matched lesson or unit scope
- matched standard or approved support note

If a question cannot be traced directly to the approved mapping, mark it `FAIL` or `BLOCKED`. Do not infer alignment from topic similarity alone.
