# External Learning Resources and Simulations Standard

## Purpose

Agents must identify free resources that could enhance student learning, especially simulations and interactive experiences. Resources are suggestions for approval, not automatic additions.

When the user approves insertion or explicitly directs that lab, simulation, or resource links must be included, the lesson must contain the exact direct clickable URL to the specific activity, virtual lab, data set, or resource. Provider names, homepages, search pages, collection pages, or vague directions to "search for" a resource are not sufficient when a direct activity URL exists.

Direct links alone are not sufficient for student use. When a resource, simulation, virtual lab, data set, or interactive is inserted, the same lesson page must also tell the student exactly what to do after the link opens. Directions must be written for a student working alone without a live teacher.

Standing science-course directive: the user has explicitly directed that science/lab courses must include exact direct links for required or strongly aligned free simulations, virtual labs, data sets, and trusted resources. A science course agent does not need to ask again before inserting a free, student-safe, directly aligned resource link from a trusted source. Ask for approval only when the resource requires login, payment, special hardware, unsafe activity, non-public access, questionable source quality, or the alignment is uncertain.

## Applies To

This standard applies to all departments:

- math
- science
- English/language arts
- social studies/social science
- communication
- electives

For science courses with lab components, simulation review is mandatory.

For social studies and social science courses, external simulations are not required by default. Agents should prioritize embedded maps, timelines, charts, tables, source excerpts, civic/process visuals, source organizers, and data displays inside lessons and Moodle XML assessments. External simulations or links may be suggested only when explicitly requested, clearly mapped, or unusually valuable enrichment.

## Resource Types

Suggest when aligned:

- simulations
- virtual labs
- interactive practice tools
- virtual manipulatives
- graphing tools
- data visualizers
- animations
- passage supports
- public reference resources
- official agency resources
- embedded maps, timelines, source excerpts, charts, tables, and public-domain social studies visuals

## Priority Free Sources

Research these first when relevant:

- PhET Interactive Simulations
- CK-12
- HHMI BioInteractive
- Concord Consortium
- NASA
- NOAA
- USGS
- OpenStax
- GeoGebra
- Desmos
- NCTM free resources
- official universities or public education agencies

## Required Resource Review Questions

For each unit or lesson, ask:

- Is there a free simulation or interactive resource that helps students understand this topic?
- Does the resource directly align to the lesson objective?
- Does it require an account?
- Is it student-safe?
- Is it accessible without payment?
- Does it support mastery rather than distract from the lesson?
- Would it be extra support, required lab support, or enrichment?
- For social studies/social science, would an embedded map, timeline, chart, source excerpt, organizer, or data display be more appropriate than an external simulation?

## Science Lab Requirement

For science lab courses:

- every lab-aligned unit or lesson must be reviewed for simulations or virtual labs
- if a free, student-safe, directly aligned resource is found from a trusted source, insert the exact direct clickable URL into the lesson where students need it without asking for separate approval
- ask for approval only for resources with login, payment, special hardware, unsafe activity, non-public access, questionable source quality, or uncertain alignment
- the link must open the specific activity, simulation, virtual lab, data set, or resource directly
- student-facing directions must not require students to search, browse a provider homepage, or guess which resource to open
- student-facing directions must state what to click, what setting/tab/model to use when applicable, what to observe, what evidence to record, and how the evidence connects to the lesson standard
- for simulations, include launch/play instructions, required toggles or controls when applicable, the exact observation task, and the data or claim-evidence-reasoning evidence the student must collect
- for data/resource pages, include the heading, table, figure, image, or section the student should use and what information to extract from it
- verify whether the link is free, whether login is required, and whether it opens without payment
- record the exact URL in `lesson.json`, the lesson page, or the audit evidence
- if not found, report search notes and "No appropriate free simulation found"
- do not invent labs
- do not replace required lab content
- do not insert links that require approval until approval is received
- missing exact direct links for required or approved labs/simulations are blockers for Moodle transfer readiness
- missing step-by-step student-use directions for required or approved labs/simulations/resources are blockers for Moodle transfer readiness

## Social Studies and Social Science Resource Rule

For social studies and social science courses:

- do not require simulations unless the user explicitly requests them or the approved mapping requires one
- do not add external links when an embedded map, timeline, source excerpt, chart, table, organizer, or data display will better support mastery
- embed the needed source or visual directly in the lesson page and assessment question when the task depends on it
- use public-domain, official, or course-created visual/source supports whenever possible
- any optional external resource must be clearly labeled as enrichment, aligned to the mapped lesson, and handled under the same direct-link and step-by-step direction rules as other approved resources
- final certification must report `No simulation required` for social studies/social science units when no simulation is explicitly required

## Output Format

Use this table:

| Course | Unit | Lesson | Topic | Resource Name | Exact Direct URL | Provider | Free? | Login Required? | Opens Directly To Activity? | Inserted In Lesson? | Why It Helps | Recommendation |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
