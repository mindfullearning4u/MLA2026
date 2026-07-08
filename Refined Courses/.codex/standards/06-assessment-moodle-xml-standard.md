# Assessment Moodle XML Standard

## Purpose

Production assessment files must be ready for Moodle test-bank import in Moodle XML format and must support mastery through standards-aligned questions, embedded representations, and teachable feedback.

Moodle XML is the required production assessment format for all MLA courses.

GIFT is no longer an approved production assessment format. Existing `.gift` files may be treated only as legacy source material, conversion input, or archival evidence. Do not certify, export, or deliver `.gift` files as final production assessments.

## Required Assessment Counts

Default requirement:

- Guided Practice = 5 questions
- Lesson Quiz Bank = 25 questions; Moodle delivery pulls 5 random questions per attempt unless the course owner specifies otherwise
- Unit Pretest = 10 questions
- Unit Assessment Bank = 40 questions

Credit-based assessment structure:

- 1.0-credit courses use 6 units with 8 lessons per unit. Lessons 1-7 have lesson quiz banks. Lesson 8 is synthesis and has Guided Practice plus Unit Assessment, but no Lesson 8 lesson quiz unless the approved mapping explicitly requires one.
- 0.5-credit courses use 6 units with 5 lessons per unit. Lessons 1-4 have lesson quiz banks. Lesson 5 is synthesis and has Guided Practice plus Unit Assessment, but no Lesson 5 lesson quiz.
- Do not create, require, certify, stage, or import a lesson quiz bank for the synthesis/unit-assessment lesson unless the approved mapping explicitly overrides the academy structure.

If a course-specific standard conflicts, report the conflict and use the current course standard only after confirmation.

## Required Moodle XML Format

Every production assessment bank must be:

- `.xml`
- UTF-8
- valid Moodle XML question-bank format
- import-ready for Moodle
- organized in the correct course, unit, and lesson location
- named clearly enough to identify course, unit, lesson, and assessment type

Every production XML question must include:

- Question ID
- MLA Standard or approved support-standard note
- self-contained question text
- all required stimulus material inside the question
- exactly four answer choices
- exactly one correct answer
- teachable feedback for every answer choice
- no predictable answer pattern

Answer choices must not include visible `A.`, `B.`, `C.`, or `D.` prefixes because Moodle XML supplies answer lettering.

HTML is allowed inside Moodle XML fields when needed for tables, superscripts, passages, scientific notation, diagrams, embedded images, and accessible formatting.

## Visual and Stimulus Requirement

If the assessment requires or benefits from a graph, coordinate plane, number line, shaded inequality, formatted table, diagram, map, model, passage, lab data table, scientific figure, or other visual/stimulus material, that representation must be embedded directly in the Moodle XML question.

Do not reference:

- "the graph above"
- "the table below"
- "the passage"
- "the diagram"
- "the data shown"

unless that object is actually included in the same question.

This rule applies to every department, including math, science, ELA, social studies, world languages, electives, CTE, health, and fine arts.

For math, use superscripts for exponents in XML display text. Do not use caret notation such as `x^2`, `2^3`, or `16^(1/2)` in final student-facing assessment text.

## Legacy GIFT Rule

Existing `.gift` files may remain in the repository as legacy source material or conversion input. They do not satisfy production readiness.

Do not:

- export `.gift` files to the production assessment drive
- certify `.gift` files as final Moodle-ready assessments
- call a course complete because `.gift` files pass syntax checks
- use "GIFT cannot show visuals" as a reason to omit a needed representation
- create new production-only `.gift` assessment banks

If a legacy `.gift` file is used as source, it must be converted to Moodle XML and then audited as XML before certification.

## Legacy GIFT Conversion Safety

This section applies only when a legacy `.gift` source file still exists and is used as conversion input. It is not a production certification substitute.

Before any legacy `.gift` file is used as source for XML conversion, reserved GIFT characters inside displayed source text must be escaped so the conversion does not split answer choices incorrectly.

Do not alter the leading GIFT control character that begins an answer choice:

- keep correct choices starting with `=A.`, `=B.`, `=C.`, or `=D.`
- keep distractors starting with `~A.`, `~B.`, `~C.`, or `~D.`

Do not alter the structural feedback delimiter `#` that separates answer text from feedback. Escape reserved characters inside the feedback text after that delimiter.

Required escaping inside displayed legacy GIFT source text:

- `=` becomes `\=`
- `~` becomes `\~`
- `#` becomes `\#`
- `{` becomes `\{`
- `}` becomes `\}`
- `>=` becomes `>\=`
- `<=` becomes `<\=`

Any unescaped reserved character inside legacy source question text, visible answer text, or feedback text is a conversion blocker.

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

## Moodle XML Safety Requirements

Moodle XML files must satisfy:

- valid XML
- Moodle XML question-bank structure
- UTF-8 encoding
- four answer choices
- one correct answer
- embedded visuals/stimulus where needed
- no visible backend filenames in question text
- no duplicate answer choices
- no duplicate question stems
- no missing correct answers
- no more than one correct answer
- no broken image/file references
- no malformed HTML inside CDATA
- no inaccessible required stimulus stored outside the question

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

## Certification Rule

Final production assessment certification requires:

- Moodle XML exists for every required assessment bank
- XML validates structurally
- all required questions are present
- every question aligns to mapping
- every mapped standard has assessment evidence
- every required visual/stimulus is embedded
- feedback is teachable
- answer pattern is not predictable
- no legacy GIFT file is treated as the certified production assessment

If any requirement fails, the assessment decision is `FAIL`.
