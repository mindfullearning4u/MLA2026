# Biology Veteran-Teacher Rebuild Audit

Date: 2026-07-15

## Decision

**PASS for repository production and Moodle pilot transfer review.**

This audit applies to the rebuilt Biology course, not to the earlier generic lesson version.

## Production Scope

| Item | Verified Count |
|---|---:|
| Units | 6 |
| Lessons | 48 |
| Moodle-fragment lesson pages | 336 |
| Moodle XML banks | 102 |
| Moodle XML questions | 1,590 |
| Unique question IDs | 1,590 |
| XML banks with an embedded SVG stimulus | 102 |
| XML banks with an embedded table stimulus | 102 |
| Lesson 8 quiz banks | 0 |

## Instructional Quality Gates

- Every lesson begins with prior-knowledge retrieval, a student-facing reason to learn the content, a clear target, and a next-lesson connection.
- P02 includes vocabulary, a visible original MLA diagram/model/graph, and a lesson-specific teaching sequence.
- P03 separates displayed evidence from biological meaning and includes a completed guided-notes answer showing where each part came from.
- Every standard P04 includes the teaching visual and exactly three complete worked examples: identify, observe, interpret, check the boundary, and answer.
- Every Lesson 7 P04 is Data Collection and Analysis and includes a specific investigation question, claim, controlled conditions, station evidence, calculations/interpretation, limitations, and CER preparation.
- P06 includes a visible practice stimulus, concrete Part A/Part B/Part C deliverables, calculations when relevant, and an exact submission list.
- P07 includes a transfer stimulus, required evidence, biological reasoning, a limitation, mastery expectations, and accessible Teacher of Record support.
- The old repeated standards boilerplate and generic evidence-reasoning routine were removed from P02-P07.
- No page uses negative “no teacher” or “without a teacher” language.

## Assessment Quality Gates

- Guided Practice and quiz questions use embedded biology diagrams, models, data tables, or evidence cards.
- Guided Practice questions do not reappear as the first quiz questions.
- All questions contain four answer choices, exactly one keyed answer, standard traceability, and feedback for every choice.
- No duplicate question ID or duplicate normalized stem-plus-stimulus combination was found.
- Unit Pretests contain 10 questions; Guided Practice contains 5 per lesson; Lessons 1-7 quizzes contain 25; Lesson 8 Unit Assessments contain 40.
- All 102 XML documents and all generated lesson/quiz JSON files parse successfully.

## Visual System

The course uses original MLA instructional visuals rather than copying OpenStax artwork. The visual system includes cell comparisons, numbered unknown-cell practice diagrams, organelle pathways, membrane transport, negative feedback, plant transport, human-system coordination, water/macromolecule models, enzyme graphs, ATP cycling, photosynthesis/respiration, DNA replication, gene expression, Punnett squares, cell division, evolutionary data, cladograms, aquatic profiles, succession, population graphs, food webs, biodiversity data, sustainability comparisons, and Lesson 7 investigation dashboards.

## Verification Note

Automated source, XML, JSON, stimulus, and question-structure audits passed. The in-app browser could not reach the local preview server in this environment, so final Moodle theme rendering remains part of the pilot-transfer review rather than being claimed as completed here.

## Reproducible Checks

- Rebuild: `repair_biology_lesson7_science_investigation_model.js`
- Curated content: `biology_rebuild_profiles.js`
- Page and assessment renderer: `biology_rebuild_renderer.js`
- Current audit: `audit_biology_veteran_rebuild.js`
