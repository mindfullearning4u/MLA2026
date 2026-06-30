# ALG2 Assessment Visual and Instruction Audit

Audit date: 2026-06-29  
Mode: structure-only / content locked unless owner approves instructional changes

## Scope

Reviewed ALG2 assessment GIFT banks and lesson HTML pages against the repo standards, agent protocols, approved ALG2 crosswalk/unit/lesson mapping, and ALG1 Unit 1 / Unit 3 as the quality model.

Primary checks:

- Assessment questions that require visuals, tables, graphs, scatterplots, coordinate displays, regions, or technology output.
- Whether GIFT items include enough text data when no visual is embedded.
- Whether lesson pages teach the mapped skill step by step.
- Whether graph-heavy lessons have visual support or need locked-content follow-up.

## Assessment Visual Audit Summary

Parsed assessment questions: 1,380

| Classification | Count | Audit decision |
|---|---:|---|
| No visual needed | 889 | Pass |
| Text representation acceptable; visual recommended when importing | 274 | Pass, optional Moodle enhancement |
| Visual recommended | 187 | Content-locked recommendation |
| Mandatory missing visual confirmed | 0 | No blocking missing-visual defects found |
| Initial mandatory-review candidates | 30 | Manually reviewed; reclassified as acceptable or recommended |

No GIFT item was confirmed to depend on an absent object such as an unprovided graph, diagram, table, or figure. The current banks generally describe the graph/table/scatterplot in text, so the questions remain answerable in Moodle-ready plain-text GIFT.

## High-Priority Visual Recommendations

These are not structure-only edits because they would add or change instructional/assessment content. They should be approved before implementation.

| Area | Files / lessons | Recommendation |
|---|---|---|
| Quadratic inequalities and shading | Unit 02 Lesson 07, Unit 02 Pretest, Unit 02 Unit Assessment | Add Moodle-safe graph visuals or image-backed versions for boundary type and shaded-region questions. Current text is answerable but graph visuals would reduce ambiguity. |
| Polynomial zeros and graph behavior | Unit 02 Lesson 05 assessments | Add optional graph sketches for crossing/touching behavior and end behavior checks. Current text is mathematically answerable. |
| Rational/radical graph behavior | Unit 03 graph-heavy lessons and assessments | Add visual support for asymptote, restriction, and function-shape items where import workflow supports image assets. |
| Linear systems and inequalities | Unit 05 Lesson 02, Lesson 03, Lesson 07 assessments | Add coordinate-plane visuals for shading side, intersections, and graphical solution meaning. |
| Data, regression, scatterplots, residuals | Unit 06 assessments | Add scatterplot/residual output visuals for statistical interpretation items. Current items use textual descriptions, but visuals would better match the skill. |

## Initial Mandatory-Review Candidates

The automated pass flagged 30 items because they mention graphs, shading, tables, or technology output. Manual review found that each is answerable from the text as written, but many are visual-recommended.

| Status | Representative item pattern | Decision |
|---|---|---|
| Text substitute acceptable | Input/output tables written in the stem, such as Unit 01 Lesson 01 GP Q05 | Pass; optional table formatting enhancement |
| Text substitute acceptable | Stems saying a graph crosses/touches an axis or approaches a line | Pass; visual recommended for graph interpretation lessons |
| Visual recommended | Quadratic inequality boundary and shading items in Unit 02 | Answerable; add visuals only with content approval |
| Visual recommended | Linear inequality shading and systems interpretation in Unit 05 | Answerable; add visuals only with content approval |
| Visual recommended | Scatterplot/regression/residual technology-output items in Unit 06 | Answerable; add visuals only with content approval |

## Lesson Step-by-Step Audit Summary

Lesson pages checked: 48

All checked lessons contain the expected instructional structure markers, including worked examples, step markers, and common-mistake support. The lessons are structurally step-by-step. Several graph-heavy lessons should receive visual enhancement only after content-change approval.

| Check | Result |
|---|---|
| P04 worked-example structure present | Pass across checked lessons |
| Step markers present | Pass across checked lessons |
| Common mistake / explanation support present | Pass across checked lessons |
| Visual support in graph-heavy lessons | Pass structurally; content-locked visual improvements recommended |

## Locked-Content Issues Found During Lesson Scan

These are instructional-content or notation defects, not structure-only fixes. They should be handled only if content/notation corrections are approved.

| Issue type | Examples | Recommendation |
|---|---|---|
| Caret notation in lesson HTML | Unit 03 Lesson 01 P04 uses `x^(1/2)` and `x^(3/2)`; Unit 04 and Unit 06 exponential/log lessons use expressions like `2^x` and `A=800(1.05)^t` | Approve a notation cleanup pass to replace caret notation with superscript formatting where standards require it. |
| Mojibake / encoding artifacts | Unit 03 Lesson 01 P04 includes corrupted text in a radical-expression worked example | Approve a targeted encoding cleanup pass. |
| Visual enhancement needed for graph-heavy instruction | Units 02, 03, 05, and 06 graph/data lessons | Add or improve visuals after approval, tracing each change to the approved lesson mapping. |

## Mapping And Assessment Boundary Notes

Assessment boundary rules were preserved during the audit:

- Guided Practice items were checked as lesson-local.
- Lesson Quiz items were checked as lesson-local.
- Unit Pretests and Unit Assessments were evaluated against unit-taught material.
- No assessment content was edited during this audit.
- No HTML was introduced into GIFT.
- No new answer pattern was introduced.

## Conclusion

ALG2 has no confirmed blocking assessment items that require a missing visual to be answerable. The course is structurally step-by-step at the lesson level. The main follow-up is an owner-approved content pass for optional visuals in graph/data-heavy assessments and for notation/encoding corrections in lesson HTML.
