# Source of Truth and Research Protocol

## Purpose

This protocol defines what agents may use when deciding course content, lesson sequence, standards alignment, or resource suggestions.

## Internal Course Sources

Use these internal sources first:

1. Standards inventory
2. Crosswalk
3. Unit mapping
4. Lesson mapping
5. Existing lesson objectives
6. Course Overview
7. Current lesson files
8. Current assessment files
9. Current metadata files
10. Current audit reports as historical context

## Ignored Internal Sources

Do not use these as authoritative mapping sources:

- `Unit Overview.md`
- old production notes
- obsolete certification statements contradicted by current files
- visible backend filenames inside student pages
- temporary scripts unless the user identifies them as current

## External Research Sources

Use external research only for:

- free simulations
- external learning resources
- official standards clarification when necessary
- public domain or official instructional support resources

Do not use external sources to change certified mapping.

## Official Standards Source Verification

When building or auditing standards inventories, crosswalks, unit mappings, lesson mappings, or course overview documents, agents must verify standards against official or primary sources when those sources are available.

For Florida courses, use official sources first:

- Florida Department of Education standards pages
- CPALMS official benchmark pages
- Florida B.E.S.T. Standards documents when applicable
- Florida Next Generation Sunshine State Standards when applicable to the course
- official Florida course descriptions or course codes when available

For college-readiness alignment, use official sources first:

- official ACT College and Career Readiness Standards or ACT test-domain documentation
- official College Board SAT Suite documents or SAT Skills Insight documentation
- official Common Core State Standards only when the course explicitly requires a Common Core comparison or literacy-in-science alignment

Do not rely on unofficial summaries, third-party worksheets, blogs, or AI memory for standard text, numbering, course codes, benchmark language, ACT/SAT alignment, or CPALMS references.

If the official source has changed, is inaccessible, or conflicts with an existing course file, document the conflict and do not silently rewrite the mapping.

## Full Crosswalk Stack Requirement

For all MLA course production, the crosswalk must identify the complete alignment stack required for that course. Agents must not treat CPALMS or any single state content source as the whole crosswalk when the course also requires support alignment.

A complete crosswalk must document, as applicable:

- primary course content standard source, such as CPALMS/FDOE, Florida B.E.S.T., NGSSS, CTE framework, or other controlling standard
- Florida B.E.S.T. ELA or Mathematics support expectations when included or required
- Common Core literacy, history/social studies, science/technical, or math support alignment when required
- SAT readiness alignment as support, not a replacement standard
- ACT readiness alignment as support, not a replacement standard
- ELD/accessibility support alignment when applicable
- visual, source, data, lab, simulation, or assessment-stimulus requirements

Lesson and assessment agents must build from the approved full crosswalk package: standards inventory, crosswalk, unit mapping, lesson mapping, and visual/source/resource mapping. If any required support layer is missing, build readiness is blocked until the crosswalk is repaired or the omission is documented with user approval.

## Research Priority Sources

For simulations and resources, prefer:

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
- NCTM resources when freely accessible
- official state or university education resources

For science lab and visual planning, also search for:

- official lab safety guidance when relevant
- official agency data sets
- official diagrams, maps, or public-domain visuals
- virtual lab/simulation pages from trusted education or science organizations
- course-approved lab/virtual lab matrices already in the repository

## Research Output Requirements

For every suggested resource, report:

- resource name
- URL
- provider
- free status
- account/login requirement
- course/unit/lesson alignment
- standard alignment when possible
- what the student does with it
- why it supports mastery
- accessibility or safety notes
- recommendation: approve, reject, or review

## No Automatic Insertion

Agents may not insert external links into lessons unless the user explicitly approves the addition.
