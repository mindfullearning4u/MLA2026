# U.S. Government Final Course Audit

## Mechanical Validation

```json
{
  "htmlPages": 210,
  "lessonJson": 30,
  "quizJson": 30,
  "xmlFiles": 66,
  "xmlQuestions": 1050,
  "productionFiles": 8,
  "failures": [],
  "decision": "PASS"
}
```

## Social Studies Visual and Source Audit

Additional audit against `.codex/standards/17-social-studies-visual-and-source-standard.md`:

```json
{
  "htmlPages": 210,
  "htmlMissingVisual": 0,
  "xmlFiles": 66,
  "xmlQuestions": 1050,
  "xmlQuestionsMissingVisual": 0,
  "filesWithUnembeddedReferencePattern": 0,
  "lessonOrAssessmentSimulationApprovalPlaceholders": 0
}
```

Findings:

- Every lesson page contains embedded visual/source support using `content-visual`, `mla-visual`, or an instructional table.
- Every Moodle XML question contains embedded visual/source support inside the question text.
- No XML question references a missing map, timeline, source, chart, table, image, or above/below stimulus.
- U.S. Government does not require simulations; all social studies support is embedded directly in lessons and XML assessment questions.

Final decision: **PASS**
