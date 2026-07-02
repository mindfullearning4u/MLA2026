# ALG2 Moodle XML Assessment Visual Conversion Report

Report date: 2026-07-02

## Purpose

ALG2 assessments were reviewed using the same assessment-readiness standard applied to ALG1, then converted from GIFT-only delivery to Moodle XML so math visuals, rendered tables, and Moodle-safe question text can import cleanly.

The original `.gift` files were not deleted or changed. They remain source/plain-text backups. The Moodle XML files are now the preferred import files when visual clarity matters.

## Source And Output

| Item | Result |
|---|---:|
| Source GIFT files audited | 102 |
| Moodle XML files created | 102 |
| Questions converted | 1,380 |
| Answer choices validated | 5,520 |
| Embedded graph visuals | 66 |
| Moodle HTML table renderings | 9 |
| Structural validation failures | 0 |

Generated manifest:

`ALG2/ALG2_MOODLE_XML_ASSESSMENT_CONVERSION_MANIFEST.md`

Generated XML location pattern:

`ALG2/Units/Unit XX/.../Moodle XML/*_MoodleXML.xml`

## Certified Question Counts Preserved

| Assessment type | Expected count | Result |
|---|---:|---|
| Unit Pretest | 10 | Pass |
| Lesson Guided Practice | 5 | Pass |
| Lesson Quiz | 20 | Pass |
| Unit Assessment | 40 | Pass |

ALG2 keeps 20-question lesson quiz banks because the existing ALG2 certification report identifies 20 questions as the certified course-specific requirement. This conversion did not add unapproved quiz content to force a 25-question count.

## Issues Fixed

| Issue found | Fix applied |
|---|---|
| GIFT could not embed graphs, shaded regions, or rendered tables. | Created Moodle XML packages with embedded base64 visuals and Moodle-safe HTML question text. |
| Quadratic graph, vertex, zero, boundary, and shading questions were answerable but visually weaker. | Added generated parabola visuals where the question supplied enough information to draw the visual without inventing data. |
| Linear graph, slope, point-pair, boundary, and systems/inequality questions were answerable but visually weaker. | Added coordinate-plane visuals where the question supplied enough mathematical data to draw the graph safely. |
| Plain-text input/output tables were harder to scan in Moodle. | Converted supported x/y table text into Moodle HTML tables. |
| Superscript notation could appear as caret notation or encoding artifacts in XML-visible math. | Normalized supported square/cube powers into HTML superscript in question text and answer choices. |
| Visible answer-letter prefixes could duplicate Moodle answer labels. | Removed visible `A.`, `B.`, `C.`, and `D.` prefixes from XML answer choices. |
| Earlier GIFT audit language referenced 25-question lesson quizzes. | Preserved the current ALG2-certified 20-question quiz count and documented the discrepancy. |
| Quadratic graph titles initially included answer-choice text during the conversion QA pass. | Repaired the converter so graph titles use only the detected equation/expression, then regenerated all ALG2 XML files. |

## Visual Distribution

| Unit | Embedded visuals |
|---|---:|
| Unit 01 | 1 |
| Unit 02 | 44 |
| Unit 03 | 0 |
| Unit 04 | 1 |
| Unit 05 | 16 |
| Unit 06 | 4 |

Unit 03 remains at 0 embedded visuals because the current assessment text did not provide enough clean, machine-drawable rational/radical graph data without creating new content. Those questions remain answerable from text. Unit 03 should receive a separate owner-approved content-authoring pass if custom asymptote, restriction, or radical-function visuals are desired.

## Validation Results

Validation checks completed:

- Every XML file parses successfully.
- Every question has exactly 4 answer choices.
- Every question has exactly 1 correct answer.
- Feedback is present for every answer choice.
- Unit Pretest, Guided Practice, Lesson Quiz, and Unit Assessment counts match the certified ALG2 counts.
- Embedded images are included in the XML as base64 Moodle files.
- Supported table data renders as HTML tables.
- Original GIFT source files remain intact.

Final decision: PASS
