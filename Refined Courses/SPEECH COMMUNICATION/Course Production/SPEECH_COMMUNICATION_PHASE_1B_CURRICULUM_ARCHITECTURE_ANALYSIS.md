# Phase 1B: Speech Communication Curriculum Architecture Analysis

## Executive Summary

This architecture analysis establishes the Speech Communication course framework using the approved English I-IV production model and the verified CPALMS `Speech 1 (#1007300)` standards record as the primary standards source.

The course preserves the MLA mastery model:

- 6 units
- 8 lessons per unit
- Lessons 1-7 contain Lesson Quiz
- Lesson 8 remains Putting It All Together
- Lesson 8 contains Unit Assessment
- Lesson 8 introduces no new primary standard

This document is architecture only. It does not create lessons, assessments, HTML files, quizzes, GIFT files, quiz JSON files, lesson JSON files, LMS pages, or student-facing instructional content.

## Official Course Source

| Item | Verified Source |
|---|---|
| Primary course | CPALMS `Speech 1 (#1007300)` |
| CPALMS course detail ID | `24723` |
| Current version | `2025 - And Beyond` |
| Course path | English/Language Arts > Oral Communications |
| Course length | Year |
| Credit | One credit |
| Grade levels | 9, 10, 11, 12 |
| Course status | Course Approved |

## Course Identity

Speech Communication is a high-school oral communications course. The verified CPALMS course description supports instruction in:

- structuring various types of speeches
- researching information
- audience analysis
- presentation of speeches
- public speaking confidence
- speech critique focused on content, organization, language, and delivery style
- production and presentation of well-structured, developed speeches

The architecture does not impose a literary-tradition frame. Reading and rhetoric standards are used as speech critique, source analysis, rhetorical evaluation, and argument evaluation supports.

## Architecture Rationale

| Design Element | Architecture Decision |
|---|---|
| Unit structure | Six units preserve the approved MLA English production framework. |
| Lesson structure | Eight lessons per unit preserve pacing and production consistency. |
| Lesson 8 | Each Unit 8 lesson remains Putting It All Together and contains the Unit Assessment only. |
| Standard model | All 25 official CPALMS-listed standards are assigned exactly once in the MLA inventory. |
| Domain model | Domains use Speech-specific codes while preserving MLA numbering logic. |
| Progression | Units move from foundations, audience, listening, and speech structure into research-supported speaking, persuasive speaking, digital/multimedia communication, and professional communication. |

## Six-Unit Architecture

| Unit | Unit Title | Primary Architecture Purpose |
|---:|---|---|
| 1 | Foundations of Communication, Audience, and Listening | Establishes communication norms, active listening, voice/tone, academic language, and speech-course foundations. |
| 2 | Speech Structure, Organization, and Informative Speaking | Builds logical speech organization, coherent focus, expository explanation, paraphrase, and presentation format expectations. |
| 3 | Rhetoric, Argument, and Persuasive Speaking | Develops rhetorical analysis, opposing argument evaluation, argument writing, evidence, counterclaim awareness, and persuasive speech planning. |
| 4 | Research-Supported Speaking and Source Use | Connects research questions, reliable sources, complex text comprehension, inference, evidence, and source-based speech development. |
| 5 | Delivery, Revision, Digital Presentation, and Publication | Builds revision from feedback, standard English, vocabulary precision, digital presentation support, and online collaboration. |
| 6 | Professional, Multimedia, and Integrated Communication | Synthesizes oral, digital, collaborative, research-supported, and professional communication without introducing new primary standards. |

## Progression Against English I-IV Framework

| Area | English I-IV Pattern Preserved | Speech Communication Adaptation |
|---|---|---|
| MLA mastery | Standards are inventoried, crosswalked, mapped to units, and mapped to lessons. | Speech-specific domains preserve the same auditability. |
| Evidence | Evidence appears in reading, writing, research, and communication. | Evidence is applied to speech reasoning, speech critique, and source-supported presentations. |
| Writing | Writing supports argument, exposition, revision, and conventions. | Writing functions as speech planning, scripting, revision, publication, and speaker notes. |
| Reading | Reading supports literary/informational analysis in English courses. | Reading supports source analysis, rhetoric, argument comparison, and speech critique. |
| Communication | English courses include oral/digital presentation. | Communication is the central course identity. |

## Production Controls

- Do not create lesson content during architecture.
- Do not create assessments during architecture.
- Do not create HTML, GIFT, quiz JSON, lesson JSON, or LMS pages during architecture.
- Maintain `Course Production` for architecture and production-control documents.
- Store final audits in sibling `Course Audit` folder.
- Preserve the Lesson 8 restriction: Putting It All Together, Unit Assessment only, no new primary standard.
