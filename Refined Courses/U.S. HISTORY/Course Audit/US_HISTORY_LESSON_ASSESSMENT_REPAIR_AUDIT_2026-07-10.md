# U.S. History Lesson and Assessment Repair Audit

Date: 2026-07-10

## Scope

This repair audit covers the generated U.S. History course lesson and assessment files:

- `U.S. HISTORY/Units/Unit 01` through `Unit 06`
- `U.S. HISTORY/Units/*/Moodle XML`
- `U.S. HISTORY/Course Audit/repair-tools/build_us_history_course.js`
- `U.S. HISTORY/Course Audit/repair-tools/validate_us_history_course.js`

## Required Repairs Completed

1. Repaired Unit 04 content/profile alignment.
   - Unit 04 Lesson 03 now stays on atomic weapons, Nuremberg, the United Nations, and international justice.
   - Unit 04 Lesson 04 now stays on the early Cold War Red Scare, containment, alliances, and nuclear proliferation.
   - Unit 04 Lesson 05 now stays on the Korean War and presidential Cold War foreign policy from Truman through Nixon.

2. Removed weak generated assessment patterns.
   - No `helps explain the lesson because`.
   - No `because explain`.
   - No stale outside-unit distractors such as `Gilded Age railroad dispute`, `colonial-era event`, or `twentieth-century Cold War policy`.

3. Strengthened lesson rigor.
   - P02 step-by-step teaching now includes specific historical context, evidence use, and scope checks.
   - P03 misconception sections now use direct student-facing clarification.
   - P04 worked examples now use `Worked Model` and `Student Think-Aloud`, not teacher-dependent wording.
   - P06 independent work prompts now avoid awkward agent/template language.

4. Strengthened visual/stimulus use.
   - Each lesson includes an instructional visual/stimulus block tied to the mapped lesson content.
   - Timeline/map/table/matrix visuals are generated according to the mapped visual type.
   - Student directions require using the visual/stimulus as evidence rather than decoration.

5. Strengthened Moodle XML assessment quality.
   - Assessment stems now use lesson-appropriate reasoning tasks.
   - XML stimuli are embedded in the question text.
   - Guided practice, quizzes, pretests, and unit assessments remain inside the mapped lesson/unit standards.
   - Lesson 8 has guided practice and unit assessment only; no Lesson 8 quiz.

6. Removed live-teacher dependency language.
   - No `teacher will teach`, `teacher check`, `wait for teacher`, or `not rely on live teacher` language.
   - Teacher of Record language is limited to support, submission, intervention, and revision workflow.

## Validation Results

Validation command:

```powershell
node "U.S. HISTORY\Course Audit\repair-tools\validate_us_history_course.js"
```

Result:

```json
{
  "htmlPages": 336,
  "lessonJson": 48,
  "quizJson": 48,
  "xmlFiles": 102,
  "xmlQuestions": 1590,
  "xmlBad": [],
  "weakXmlPatternCount": 0,
  "weakXmlHits": [],
  "weakHtmlPatternCount": 0,
  "weakHtmlHits": [],
  "prohibitedLanguageCount": 0,
  "genericVisualPhraseCount": 0,
  "contentVisualPages": 48
}
```

## Final Decision

PASS for repository-level lesson/assessment generation repair.

U.S. History lessons and Moodle XML assessments are ready for final transfer-prep review under the Moodle transfer workflow.
