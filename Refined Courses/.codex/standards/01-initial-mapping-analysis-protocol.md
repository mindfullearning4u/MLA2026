# Initial Mapping and Analysis Protocol

## Purpose

This protocol prevents agents from building from assumptions. Before creating or editing lessons, the agent must determine exactly what the course is supposed to contain according to certified sources.

## Required Initial Questions

Before building or auditing, answer these questions in writing:

1. What course is being worked on?
2. What folder is the course in?
3. What is the certified crosswalk or standards inventory?
4. What is the certified unit mapping?
5. What is the certified lesson mapping?
6. What course overview applies?
7. Which existing lesson objectives are authoritative?
8. Which unit and lesson files already exist?
9. Which old files must be ignored as source-of-truth artifacts?
10. Is this task read-only audit, structure-only correction, or authorized rebuild?
11. Which official standards sources were checked?
12. Are Florida B.E.S.T., CPALMS, Common Core, ACT, and SAT alignments required for this course?
13. Which labs, simulations, data displays, diagrams, models, or visuals are required by the standards or mapping?
14. Where can approved or candidate labs, simulations, data sets, or visuals be found for later approval, including exact direct URLs when available?
15. Is this course 1.0 credit or 0.5 credit, and does it require 8 lessons per unit or 5 lessons per unit?

## Required Source Discovery

Search the course folder for:

- `*crosswalk*`
- `*standards*`
- `*mapping*`
- `*lesson*mapping*`
- `Course-Overview*`
- `Course Overview*`
- `lesson.json`
- `quiz.json`
- `.xml`
- `Course Audit`
- `*lab*`
- `*virtual*lab*`
- `*simulation*`
- `*source*matrix*`
- `*data*source*`

Do not use `Unit Overview.md` to define expected content. It may be listed as an old artifact but not used as mapping evidence.

## Mapping Trace Table

Before edits, produce a table with these columns:

| Unit | Lesson | Credit-Based Lesson Role | Approved Lesson Title | Primary Standard(s) | Florida B.E.S.T. Support | Common Core Support | SAT Support | ACT Support | ELD/Accessibility Support | Benchmark(s) | Lesson Purpose | Source File |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Every unit and lesson must appear in the table.

The mapping trace table must use the full course crosswalk stack. Do not create a lesson mapping from CPALMS, Florida standards, or any single content-standard source alone when the course requires Florida B.E.S.T., Common Core, SAT, and ACT support alignment. Support alignments do not replace the primary content standard, but they must be documented and carried into lesson and assessment expectations.

For 1.0-credit courses, list Lessons 1-8 in each unit and identify Lesson 8 as the synthesis/unit-assessment lesson.

For 0.5-credit courses, list Lessons 1-5 in each unit and identify Lesson 5 as the synthesis/unit-assessment lesson. Do not map a Lesson 5 lesson quiz for a 0.5-credit course.

For science courses, and for any course with required visuals/resources, the mapping trace table must also include:

| Unit | Lesson | Lab/Data Requirement | Required Visuals/Models/Data Displays | Required Simulation or Virtual Lab Review | Candidate or Approved Exact Direct Resource URL | Safety Notes | Assessment Stimulus Requirement |
|---|---|---|---|---|---|---|---|

These columns are not optional for science courses. If a lesson does not require a lab, simulation, or visual, write `None required by mapping` and cite the evidence.

## Official Standards Provenance Table

Before approving a crosswalk or mapping package, produce a standards provenance table:

| Standard Code | Official Source Checked | Source URL or File | Exact Standard/Benchmark Title | Course Use | Crosswalk Location | Unit Mapping Location | Lesson Mapping Location | Status |
|---|---|---|---|---|---|---|---|---|

Required checks:

- MLA numbering is accurate and internally consistent.
- Florida B.E.S.T. or applicable Florida standards are correctly represented.
- CPALMS benchmark/course references are checked when available.
- Common Core is used only when explicitly required or for appropriate literacy-in-science/technical alignment.
- ACT/SAT alignment is documented as readiness support, not as a replacement for Florida or MLA standards.
- For every course crosswalk, the agent verifies whether Florida B.E.S.T., Common Core, SAT, and ACT are required support layers and documents them explicitly when required.
- The crosswalk must distinguish primary content standards from support/readiness standards so lessons and assessments stay inside the course standard while still building evidence, reading, data, and readiness skills.
- No standard is orphaned.
- No mapped standard is missing from unit or lesson mapping.
- No unapproved standard is introduced.

## Source Conflict Rule

If sources conflict:

1. Crosswalk and standards inventory define what must be covered.
2. Unit and lesson mapping define where it is covered.
3. Existing course architecture defines file placement.
4. Course Overview provides course-level framing.
5. Audit reports provide historical context only.
6. Old Unit Overview files do not decide the lesson sequence.

Do not resolve conflicts silently. Report the conflict and ask for approval if it blocks work.

## Required Analysis Before Building

For each lesson, determine:

- What standard is taught?
- What Florida B.E.S.T., Common Core, SAT, and ACT support alignments apply?
- What prerequisite knowledge is required?
- What mathematical or subject object is central?
- What examples are required to teach the skill?
- What visuals or resources may be needed?
- What assessment evidence is expected?
- Whether the final lesson is synthesis or new content. For 1.0-credit courses this is Lesson 8; for 0.5-credit courses this is Lesson 5.
- For science, what lab, investigation, data set, model, safety note, CER, simulation, or virtual lab evidence is required?
- For science, what diagram, table, graph, map, model, lab setup, or data display must be included in lessons and assessments?
- Where candidate labs, simulations, or visuals may be sourced for user approval, including exact direct URLs when available.

## Completion Criteria

Initial analysis is complete only when:

- All sources are identified.
- Old source artifacts are excluded.
- Mapping trace table is complete.
- Full crosswalk stack is complete: primary standards plus required Florida B.E.S.T., Common Core, SAT, ACT, and ELD/accessibility support alignments.
- Standards provenance table is complete when standards or crosswalk accuracy is being audited.
- Science lab/data/visual/simulation mapping columns are complete for science courses.
- Missing source files are listed.
- Conflicts are listed.
- Build/audit mode is stated.
