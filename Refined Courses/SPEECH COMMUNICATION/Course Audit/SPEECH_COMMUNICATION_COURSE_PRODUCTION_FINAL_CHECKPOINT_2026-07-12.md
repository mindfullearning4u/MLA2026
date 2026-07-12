# Speech Communication Course Production Final Checkpoint

**Audit date:** 2026-07-12  
**Course:** Speech Communication  
**Scope:** Repo-side final checkpoint before Moodle enrollment readiness.

## Final Decision

**PASS AFTER CORRECTION.**

Speech Communication is repo-side course-production ready after correction. Standards coverage, source crosswalk, unit and lesson mapping, lesson pages, metadata, and Moodle XML assessment banks now align.

## Source, Crosswalk, And Mapping Audit

- MLA Speech Communication standards inventory count: 25.
- Crosswalk standards count: 25.
- Unit-level mapping standards count: 25.
- Lesson-level mapping standards count: 25.
- Missing standards from crosswalk/unit/lesson maps: 0.
- Extra standards in crosswalk/unit/lesson maps: 0.
- External references present: CPALMS, Florida B.E.S.T., Common Core, SAT, and ACT.
- Crosswalk wording explicitly names Florida B.E.S.T./CPALMS.
- Course overview unit sequence matches the approved unit-level mapping.
- Lesson mapping confirms 48 lessons across 6 units, with Lesson 8 reserved for synthesis and unit assessment.

## Lesson Production Audit

- Units present: 6 of 6.
- Lessons present: 48 of 48.
- HTML lesson pages present: 336 of 336.
- `lesson.json` files present and valid: 48 of 48.
- `quiz.json` files present and valid: 48 of 48.
- `pretest.json` files present and valid: 6 of 6.
- Assessment JSON files with `assessmentType` and `questionCount`: 54 of 54.
- P02/P03 notebook headings compliant: 96 of 96.
- P02/P03/P04/P06 minimum-depth check: 0 under-depth pages.
- Placeholder/TODO artifact check: 0 findings.
- Student-facing Moodle XML/GIFT production wording: 0 findings.
- P01 visible lesson titles now align to lesson-level mapping: 48 of 48.
- `lesson.json` title metadata now aligns to lesson-level mapping: 48 of 48.
- Legacy `.gift` production wording in `lesson.json`: 0 findings.
- Unit 6 Lesson 8 lesson metadata now matches the 15 standards assessed in the Unit 6 final assessment.

## Assessment Audit

- Moodle XML files present: 102.
- Total XML questions: 1,590.
- Guided Practice questions: 240.
- Lesson Quiz questions: 1,050.
- Unit Assessment questions: 240.
- Pretest questions: 60.
- XML parse errors: 0.
- Questions missing MLA standard labels: 0.
- Bracketed/malformed standard-label formats: 0.
- Visible `A.`, `B.`, `C.`, `D.` answer prefixes: 0.
- Exact duplicate answer choices within a question: 0.
- Predictable answer-pattern flags: 0.
- Weak/prohibited feedback entries: 0.
- Generic one-word correct-feedback entries: 0.
- Exact repeated feedback maximum: 4 occurrences, with answer-specific text and standard references.
- Literal trailing backslash artifacts in question text: 0.

## Corrections Made

- Updated all 48 `lesson.json` files with production Moodle XML assessment references and production assessment metadata.
- Removed legacy `.gift` production wording from all 48 `lesson.json` files.
- Normalized all 48 `quiz.json` files and all six `pretest.json` files with consistent `assessmentType`, `questionCount`, `questionBankSize`, and `questionsPerAttempt` metadata.
- Updated the Speech crosswalk introduction to explicitly name Florida B.E.S.T./CPALMS.
- Aligned Unit 6 Lesson 8 lesson metadata to the 15 standards assessed in the Unit 6 final assessment.
- Aligned all 48 P01 visible lesson titles and `lesson.json` titles to the lesson-level mapping.
- Added depth support to eight Lesson 8 P02/P06 synthesis pages that were below the no-teacher detail threshold.
- Removed visible answer-letter prefixes from all 102 Moodle XML files.
- Rewrote all Moodle XML answer feedback to include the standard, selected answer, and prompt-specific reasoning for item-specific teachable feedback.

## Moodle Transfer Status

Speech Communication requires Moodle updates because production XML and P01/P02/P06 pages changed after prior course production.

Note: visible `A.`, `B.`, `C.`, `D.` prefixes were intentionally removed from answer text. Moodle handles answer numbering; keeping manual prefixes in answer text creates duplicate labels after import.

Use `SPEECH_COMMUNICATION_MOODLE_UPDATE_CHANGE_LIST_2026-07-12.md` as the Moodle agent handoff list.
