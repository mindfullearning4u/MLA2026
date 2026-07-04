# Assessment Visual Audit Standard

## Purpose

Assessment visuals must be checked question by question. Do not assume text descriptions are enough when a representation is necessary.

This is a certification gate, not a suggestion list. A course cannot be called production ready, student ready, certified, clean, or complete when any mandatory assessment visual is missing.

## Core Decision Rule

Ask:

Can the student answer the question accurately and unambiguously without seeing the same representation a veteran teacher would show while teaching or assessing this item?

If yes, no visual is needed.

If no, the representation is mandatory. The assessment fails until the representation is embedded in the Moodle XML question or otherwise included directly inside the question.

For math, also ask:

Would a veteran math teacher draw, display, or format a representation for this question in class so students can see the structure?

If yes, the representation is mandatory or strongly recommended. Mandatory items must be fixed before certification. Strongly recommended items must be explicitly accepted by Dr. Annie before certification.

## Representations That May Be Required

Use or recommend:

- table
- graph
- coordinate plane
- number line
- diagram
- geometric figure
- data display
- scatterplot
- lab data table
- passage
- map
- image or model when approved and necessary

## Math Mandatory Visual Triggers

For math assessments, the following wording or content normally makes a visual/table mandatory:

- "which graph"
- "use the graph"
- "shown in the graph"
- "the graph of"
- "number line"
- "coordinate plane"
- "table shows"
- "which table"
- "table matches"
- "ratio table"
- "data table"
- ordered-pair patterns where students must compare input/output structure
- slope, intercept, rate-of-change, or line questions where a graph would remove ambiguity or support the intended representation
- systems of equations or inequalities where intersection or shaded region is assessed
- quadratic, exponential, or function-family questions where shape, pattern, or table behavior is assessed
- statistics/data questions involving dot plots, histograms, box plots, scatterplots, two-way tables, or other displays

The audit must inspect the actual current assessment files. Counting total visuals generated is not enough.

## Prohibited Reference Pattern

Do not write:

- "the graph above"
- "the table below"
- "the passage"
- "the diagram"

unless that object is actually included in the question.

## GIFT Constraint

Assessment GIFT files are plain text and generally must not include HTML. If a visual is required but cannot be safely embedded in GIFT, report it for approval and identify the Moodle-safe implementation options.

For math and science production assessments, Moodle XML is the required format when visuals, formatted tables, diagrams, models, equations, or data displays are needed. GIFT may remain as a source or backup, but GIFT cannot certify a visually dependent assessment.

## Certification Rule

Final decision must be:

- PASS only when mandatory visuals required = mandatory visuals embedded, no missing mandatory visuals remain, and each embedded visual is inside the question where students need it.
- FAIL when any mandatory visual is missing, substituted only by vague text, stored outside the question, or referenced without being included.

Do not mark a course, unit, or assessment bank complete if this audit fails.

## Output Required

For every assessment file, report:

- total questions checked
- questions needing no visual
- questions where a visual is recommended
- questions where a visual is mandatory for valid assessment
- questions using text description as substitute
- whether the substitute is acceptable
- exact question IDs
- recommendation for approval
- final decision: PASS or FAIL
