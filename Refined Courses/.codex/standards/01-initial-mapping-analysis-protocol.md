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
- `.gift`
- `Course Audit`

Do not use `Unit Overview.md` to define expected content. It may be listed as an old artifact but not used as mapping evidence.

## Mapping Trace Table

Before edits, produce a table with these columns:

| Unit | Lesson | Approved Lesson Title | Primary Standard(s) | Support Standard(s) | Benchmark(s) | Lesson Purpose | Source File |
|---|---|---|---|---|---|---|---|

Every unit and lesson must appear in the table.

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
- What prerequisite knowledge is required?
- What mathematical or subject object is central?
- What examples are required to teach the skill?
- What visuals or resources may be needed?
- What assessment evidence is expected?
- Whether Lesson 8 is synthesis or new content.

## Completion Criteria

Initial analysis is complete only when:

- All sources are identified.
- Old source artifacts are excluded.
- Mapping trace table is complete.
- Missing source files are listed.
- Conflicts are listed.
- Build/audit mode is stated.

