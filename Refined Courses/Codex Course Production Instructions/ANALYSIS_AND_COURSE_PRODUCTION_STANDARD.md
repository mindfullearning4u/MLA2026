# Academy Standard: Analysis and Course Production

This is the required first-stage standard for analyzing, mapping, building, auditing, and certifying a course before Moodle transfer.

An agent must read this file before beginning course analysis, crosswalk development, unit mapping, lesson mapping, course overview work, lesson development, assessment development, or course certification.

## Purpose

This stage creates and verifies the academic foundation of the course. Moodle transfer must not begin until this stage and the later development/audit stages have passed.

The required first-stage outputs usually include:

- course source analysis
- standards inventory or benchmark tracker
- crosswalk
- unit mapping
- lesson mapping
- course overview
- course architecture
- production readiness plan
- official standards provenance table
- lab/data/visual/simulation mapping table when applicable

## Required Reading

Before course production work begins, read:

```text
.codex/standards/00-course-production-master-protocol.md
.codex/standards/01-initial-mapping-analysis-protocol.md
.codex/standards/02-source-of-truth-and-research-protocol.md
.codex/standards/03-lesson-page-model-p01-p07.md
.codex/standards/04-instructional-rigor-and-mastery-standard.md
.codex/standards/05-mathematical-visual-standard.md
.codex/standards/06-assessment-moodle-xml-standard.md
.codex/standards/07-assessment-visual-audit-standard.md
.codex/standards/10-json-metadata-and-file-structure-standard.md
.codex/standards/13-unit-completion-audit-standard.md
.codex/standards/14-course-completion-audit-standard.md
.codex/standards/15-detail-compliance-audit-matrix.md
.codex/standards/16-science-lab-and-virtual-lab-standard.md
.codex/agent-prompts/course-builder-main-agent.md
.codex/agent-prompts/mapping-and-source-analysis-agent.md
.codex/agent-prompts/lesson-developer-agent.md
.codex/agent-prompts/assessment-developer-agent.md
.codex/workflows/science-course-audit-workflow.md
```

## Non-Negotiable Rules

- Do not use old `Unit Overview.md` files as the source of truth.
- Do not change approved standards, crosswalks, unit mappings, or lesson mappings without explicit approval.
- Do not build lessons before course mapping is clear.
- Do not build assessments before lesson and unit scope are clear.
- Do not begin science lesson production until labs, simulations, visuals, safety, data, and CER expectations have been captured in the mapping package.
- Do not certify a course based only on file existence.
- Do not transfer to Moodle before production and audit gates pass.
- Do not call a course complete unless current files have been directly inspected and required audits have passed.

## Source-of-Truth Order

Use sources in this order:

1. Standards inventory or benchmark tracker.
2. Approved standards/crosswalk source.
3. Unit mapping.
4. Lesson mapping.
5. Existing lesson objectives.
6. Course overview.
7. Existing course architecture.
8. Department visual/layout model.
9. Prior audit reports for historical context only.

Old `Unit Overview.md` files are not source-of-truth documents.

## Stage 1: Course Analysis

The analysis agent must identify:

- course name
- course folder
- standards source
- official standards source provenance
- Florida B.E.S.T., CPALMS, Common Core, ACT, and SAT alignment requirements where applicable
- benchmark tracker or standards inventory
- required unit count
- required lesson count
- course credit value and required lesson count per unit
- course pacing or mastery sequence
- available source materials
- missing source materials
- approved department model
- existing course overview
- existing mapping documents
- existing audits
- lab and virtual lab matrix, when present
- required labs, simulations, data displays, diagrams, models, and visuals
- candidate source locations for labs, simulations, data sets, or visuals

The analysis agent must report source conflicts instead of resolving them silently.

## Stage 2: Crosswalk

The crosswalk must show how course standards connect to course units and instructional priorities.

The crosswalk must:

- include every required standard or benchmark
- cite the official source used to verify each standard or benchmark
- verify MLA numbering accuracy and consistency
- identify applicable Florida B.E.S.T., CPALMS, Common Core, ACT, and SAT alignment where required
- avoid orphaned standards
- avoid duplicate primary ownership unless approved
- identify support or review standards when needed
- establish the basis for unit mapping
- preserve accreditation and compliance traceability

No lesson or assessment should be developed from topic similarity alone. Development must trace to the approved crosswalk and mapping.

## Stage 3: Unit Mapping

The unit mapping must define:

- unit number
- unit title
- unit purpose
- standards assigned to the unit
- lab/data/investigation requirements for the unit
- required visuals, diagrams, models, maps, tables, graphs, or data displays for the unit
- required simulation or virtual lab review for the unit
- candidate resource locations for labs, simulations, data sets, or visuals
- lesson sequence
- credit-based lesson structure: 8 lessons per unit for 1.0-credit courses or 5 lessons per unit for 0.5-credit courses
- mastery progression
- pretest and unit assessment scope
- prerequisite knowledge
- synthesis expectations

The unit mapping must prevent future-unit or out-of-scope content from entering lessons or assessments.

## Stage 4: Lesson Mapping

The lesson mapping must define:

- lesson number
- lesson title
- standards assigned to the lesson
- lesson purpose
- prerequisite knowledge
- student mastery evidence
- guided practice scope
- lesson quiz scope
- final synthesis lesson location: Lesson 8 for 1.0-credit courses or Lesson 5 for 0.5-credit courses
- required visuals or representations when known
- required lab, investigation, data, model, safety, CER, simulation, or virtual lab component when applicable
- where the lesson developer can find candidate labs, simulations, visuals, diagrams, data sets, or models for approval

Every lesson page and lesson-level assessment must trace to this mapping.

## Stage 5: Course Overview

The course overview must explain:

- course purpose
- mastery-based learning model
- unit sequence
- student workflow
- assessment model
- Teacher of Record support
- expectations and policies
- how students show mastery

The course overview must align with the crosswalk, unit mapping, lesson mapping, and Moodle structure.

## Stage 6: Lesson and Assessment Production

Lesson development must follow:

```text
.codex/agent-prompts/lesson-developer-agent.md
```

Assessment development must follow:

```text
.codex/agent-prompts/assessment-developer-agent.md
```

Lessons must support asynchronous mastery learning. Assessments must be Moodle XML and standards aligned.

## Stage 7: Layered Audit Checkpoints

Before certification, the course must receive layered audit checks:

- instructional rigor audit
- structure/workflow audit
- assessment alignment audit
- assessment visual/XML audit
- metadata/LMS-format audit
- resource/simulation audit when applicable
- cross-check verification audit
- final certification audit

Every audit must inspect current files directly and cite evidence.

## Stage 8: Certification Before Moodle Transfer

A course or requested scope is approved for Moodle transfer only when:

- mapping is complete and approved
- lessons pass development and audit gates
- assessments pass development and audit gates
- visual, structure, workflow, metadata, and LMS gates pass
- final certification is PASS/CERTIFIED when required
- unresolved blockers are either fixed or explicitly approved as blocked

If any gate fails, Moodle transfer is blocked.

## Required Production Report

The main agent must maintain a production report or certification record showing:

```markdown
| Stage | Status | Evidence file/report | Open issues | Decision |
| --- | --- | --- | --- | --- |
| Course analysis |  |  |  |  |
| Crosswalk |  |  |  |  |
| Unit mapping |  |  |  |  |
| Lesson mapping |  |  |  |  |
| Course overview |  |  |  |  |
| Lesson development |  |  |  |  |
| Assessment development |  |  |  |  |
| Unit audits |  |  |  |  |
| Final certification |  |  |  |  |
| Moodle transfer approval |  |  |  |  |
```

The main agent must not give a PASS, CERTIFIED, or approved-for-transfer decision without evidence in this chain.
