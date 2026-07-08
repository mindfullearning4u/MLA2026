# Chemistry Unit 1 Lesson Build and Initial Audit

**Course:** Chemistry  
**Unit:** Unit 01 - Scientific Thinking, Measurement, and Matter  
**Date:** 2026-07-07  
**Scope:** Unit 1 lesson pages and lesson/quiz metadata only. Moodle XML assessment construction is intentionally deferred until lesson audit gates pass.

## Sources Used

- `Course Production/Course-Overview.md`
- `Course Production/PHASE_2A_B_CROSSWALK_DRAFT.md`
- `Course Production/PHASE_3A_A_MAPPING_FRAMEWORK.md`
- `Course Production/PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`

## Unit 1 Mapping Trace

| Lesson | Approved Lesson Title | Primary Standards | Required Lab/Visual/Data Focus | Build Result |
|---|---|---|---|---|
| 01 | What Counts as Chemistry Evidence? | MLA.CHEM.SCI.01; MLA.CHEM.SCI.02 | Evidence table; CER organizer; source/claim classification | Built |
| 02 | Lab Safety, Tools, and Procedures | MLA.CHEM.LAB.01; MLA.CHEM.SCI.01 | Safety icons/table; apparatus/procedure visuals | Built |
| 03 | Measurement, Units, and Significant Figures | MLA.CHEM.LAB.02; MLA.CHEM.MAT.03 | Measurement table; significant figures; scientific notation | Built |
| 04 | Data Tables, Graphs, Precision, and Uncertainty | MLA.CHEM.LAB.03 | Data table; graph interpretation; uncertainty/outlier reasoning | Built |
| 05 | States of Matter and Particle Models | MLA.CHEM.MAT.01 | Particle model table; phase-change reasoning | Built |
| 06 | Physical and Chemical Properties and Changes | MLA.CHEM.MAT.02 | Property/change classification table | Built |
| 07 | Models, Laws, Theories, and Chemistry Decisions | MLA.CHEM.SCI.03 | Model-law-theory table; decision evidence organizer | Built |
| 08 | Putting It All Together | Unit 1 synthesis standards | Mixed Unit 1 stimuli across safety, measurement, data, matter, and models | Built |

## Files Built

Each Unit 1 lesson now includes:

- `P01.html` through `P07.html`
- `lesson.json`
- `quiz.json`

Total files populated in this pass: 72.

## Lesson Structure Result

Initial structure check: PASS for lesson-page presence and required page roles.

- Every Unit 1 lesson has exactly seven HTML lesson pages.
- Every Unit 1 lesson has `lesson.json` and `quiz.json`.
- JSON files parse successfully.
- No Unit 1 HTML or JSON file remains zero bytes.

## P01-P07 Page Model Result

Initial model check: PASS for required page sections.

- P01 includes overview, standards, learning goals, mastery evidence, lab/data/safety connection, and TOR support.
- P02 includes vocabulary, teaching sequence, and required visual/model/data display.
- P03 includes continued reasoning, common mistake, incorrect example, correct example, and teachable explanation.
- P04 includes three worked examples and misconception/correction support.
- P05 references Guided Practice without exposing backend assessment filenames.
- P06 includes Instructions, Part A, Part B, and Part C.
- P07 includes Teacher of Record graded language, checkpoint task, notebook submission, workflow, mastery criteria, 80% mastery language, and resubmission/intervention language.

## Asynchronous Instruction Result

Initial check: PASS for the searched prohibited teacher-led language.

Searched and found no matches for:

- `teacher will explain`
- `teacher will show`
- `your teacher will explain`
- `your teacher will show`
- `wait for teacher`
- `teacher guidance`
- `teacher check`
- `teacher-led`
- `Upload`

TOR language is used for support, clarification, intervention, submission, retake, and grading workflow only.

## Science Lab, Visual, Simulation, and Safety Result

Initial check: PASS WITH REQUIRED FUTURE REVIEW.

- Each lesson includes the lab/data/investigation focus from the Unit 1 matrix.
- Each lesson includes a required table, organizer, model, graph/data description, classification chart, or mixed stimulus aligned to the matrix.
- Each lesson includes safety boundaries.
- External resources are listed as candidate review only and are not inserted as unapproved student links.

Simulation/resource insertion remains approval-only.

## Assessment Status

NOT BUILT in this pass by instruction.

- Existing `.gift` files remain zero-byte legacy placeholders.
- No Moodle XML files exist yet for Unit 1.
- Assessment construction must occur only after lesson audits pass.
- Required future production assessment work includes Unit Pretest XML, Lesson 01-07 Guided Practice XML, Lesson 01-07 Quiz XML, Lesson 08 Guided Practice XML, and Unit Assessment XML with embedded stimuli.

## Remaining Required Gates

Before Unit 1 can be considered complete or ready for assessment production:

1. Full layered lesson rigor audit.
2. Structure/workflow audit.
3. Standards alignment audit.
4. Lab/visual/simulation audit.
5. Main-agent review of any audit findings.
6. Corrections and rerun of failed categories.

## Decision

**Initial lesson build status:** BUILT, NOT CERTIFIED.  
**Reason:** Lesson files and metadata are populated and passed initial mechanical checks, but full layered lesson audits and Moodle XML assessments are not complete.
