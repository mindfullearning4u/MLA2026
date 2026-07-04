# DEPRECATED - Legacy GIFT Source Notes Only

This file is deprecated. Do not use it as the active assessment standard.

The active production assessment standard is:

`.codex/standards/06-assessment-moodle-xml-standard.md`

Moodle XML is required for every production assessment in every course. GIFT is legacy/source material only and must not be certified, exported, or delivered as a final production assessment.

---

# Legacy Assessment Moodle Import Notes

## Purpose

Assessment files must be ready for Moodle test-bank import and must support mastery through standards-aligned questions and teachable feedback.

## Required Assessment Counts

Default math requirement:

- Guided Practice = 5 questions
- Lesson Quiz Bank = 25 questions; Moodle delivery pulls 5 random questions per attempt
- Unit Pretest = 10 questions
- Unit Assessment Bank = 40 questions

If a course-specific standard conflicts, report the conflict and use the current course standard only after confirmation.

## Required Import Formats

For math courses, Moodle XML is the primary certified Moodle import format when graphs, tables, diagrams, or other visuals improve assessment clarity.

Math Moodle XML requirements:

- `.xml`
- UTF-8
- Moodle XML question-bank format
- embedded base64 image files when visuals are needed
- answer choices must not include visible `A.`, `B.`, `C.`, or `D.` prefixes because Moodle XML supplies answer lettering
- HTML is allowed only inside Moodle XML fields where needed for tables, superscripts, and embedded images
- every XML question must still include Question ID and MLA Standard in the question text
- exactly four answer choices
- exactly one correct answer
- teachable feedback for every answer choice

For math courses, GIFT may remain as the plain-text source, audit artifact, or fallback import format. Do not delete certified GIFT files unless the course owner explicitly requests it.

If the assessment requires a graph, coordinate plane, shaded inequality, table, diagram, or other visual to make the question clear, generate or embed that visual in Moodle XML before the assessment can be marked production ready. Do not accept "GIFT cannot show visuals" as a reason to omit a needed visual from a math assessment.

Current ALG1 conversion pipeline:

- `.codex/tools/convert-alg1-gift-to-moodlexml.ps1`
- converts all ALG1 `.gift` assessment banks to Moodle XML
- stores generated XML beside each source bank in a `Moodle XML` folder
- embeds generated graph PNGs directly in Moodle XML using base64 file attachments
- preserves the original GIFT files unchanged

## GIFT Source/Fallback File Types

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

## Required GIFT Character Escaping

Before any `.gift` file is written, exported, or certified, escape reserved GIFT characters that appear inside any displayed GIFT text.

This applies to:

- question stems and directions
- visible answer-choice text
- answer feedback after the feedback delimiter

Do not alter the leading GIFT control character that begins an answer choice:

- keep correct choices starting with `=A.`, `=B.`, `=C.`, or `=D.`
- keep distractors starting with `~A.`, `~B.`, `~C.`, or `~D.`

Do not alter the structural feedback delimiter `#` that separates answer text from feedback. Escape reserved characters inside the feedback text after that delimiter.

Required escaping inside displayed GIFT text:

- `=` becomes `\=`
- `~` becomes `\~`
- `#` becomes `\#`
- `{` becomes `\{`
- `}` becomes `\}`
- `>=` becomes `>\=`
- `<=` becomes `<\=`

Examples:

- Correct: `=A. y \= 5x + 12#The slope is 5 and the y-intercept is 12.`
- Incorrect: `=A. y = 5x + 12#The slope is 5 and the y-intercept is 12.`
- Correct: `~B. x >\= -4#This includes the boundary and shades right.`
- Incorrect: `~B. x >= -4#This includes the boundary and shades right.`
- Correct: `=C. y <\= -2x + 4#The solid boundary and shading below match the inequality.`
- Incorrect: `=C. y <= -2x + 4#The solid boundary and shading below match the inequality.`
- Correct: `=D. y \= 4x - 1#Use y \= mx + b with m \= 4 and b \= -1.`
- Incorrect: `=D. y \= 4x - 1#Use y = mx + b with m = 4 and b = -1.`

This is a Moodle import safety requirement. Any unescaped reserved character inside question text, visible answer text, or feedback text is a certification failure because Moodle can split the text into unintended answer choices.

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
- unescaped reserved GIFT characters inside question text, visible answer-choice text, or feedback text
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
