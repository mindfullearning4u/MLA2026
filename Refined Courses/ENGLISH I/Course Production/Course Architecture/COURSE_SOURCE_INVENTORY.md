# English I Course Source Inventory

**Status:** Architecture proposal source inventory
**Course:** MLA English I / Savvas myPerspectives Florida Grade 9
**Inventory date:** 2026-08-03

## Access summary

Savvas Realize instructor access was confirmed. The program landing page, all five unit tables of contents, teacher-facing resources, student-facing resources, assessment entries, and coursewide support collections were visible. The existing MLA English I repository was also reviewed. No Moodle lesson construction or assessment-question transfer occurred.

## Savvas coursewide sources

| Source | Access | Architecture use |
|---|---|---|
| Program table of contents | Available | Confirms five principal Savvas units and sequence |
| Instructor/Teacher Edition unit PDFs | Available for Units 1-5 | Objectives, teaching notes, standards, pacing, differentiation |
| Student Edition unit PDFs | Available for Units 1-5 | Student-facing readings and tasks |
| Curriculum Map documents | Available for Units 1-5 | Unit objectives, standards, resources, pacing |
| Unit introductions and mentor texts | Available | Unit framing and essential-question launch |
| Whole-Class Learning collections | Available | Core instructional selections |
| Peer-Group Learning collections | Available | Collaborative and comparative reading options |
| Independent Learning collections | Available | Extension, choice, and enrichment options |
| Selection lesson resources | Available | SE/TE lessons, accessible text, summaries, close-read guides, vocabulary, comprehension, analysis, language/craft, and quizzes |
| Performance tasks | Available | Writing, speaking, multimedia, research, and synthesis evidence |
| Performance-Based Assessments | Available | Unit culmination evidence |
| Unit projects | Available | Optional/extended application |
| Unit Tests, Parts 1 and 2 | Available for Units 1-5 | Summative assessment source mapping |
| Home Connection Letters | Available | Family communication; not core instruction |
| Florida, Start Here! | Available | Florida implementation and standards context |
| Preview and Practice Unit | Available | Readiness and platform practice |
| Language Lab | Available | Language development, vocabulary, grammar, and intervention |
| Appendix B Readings | Available | Supplemental/extension readings |
| Access Points Resources | Available | Florida access-point support |
| ELL Support | Available | Language scaffolds and accommodations |
| Benchmark Tests | Available | Diagnostic/benchmark evidence |
| FAST Reading & B.E.S.T. Writing Test Prep | Available | Florida assessment readiness |
| Foundational Skills Center | Available | Prerequisite and remediation resources |
| Skills and Resources Center | Available | Cross-unit skills support |
| Media Studio / Digital Library | Available | Media and enrichment resources |

## Savvas unit inventory

### Savvas Unit 1: Inside the Nightmare

Core sources include the unit introduction, *My Introduction to Gothic Literature*, *The Fall of the House of Usher*, *House Taken Over*, comparative Gothic writing, *How to Tell You're Reading a Gothic Novel-In Pictures*, *Where Is Here?*, *The Dream Collector*, *Why Do Some Brains Enjoy Fear?*, the Gothic poetry collection, independent readings, two performance tasks, the performance-based assessment, projects, and Unit Test Parts 1-2.

### Savvas Unit 2: Outsiders and Outcasts

Core sources include the unit introduction, *Isn't Everyone a Little Bit Weird?*, *The Metamorphosis*, *Franz Kafka and Metamorphosis*, *The Censors*, *Harrison Bergeron*, two poetry collections, *Revenge of the Geeks*, *Encountering the Other*, independent readings, argumentative writing, multimedia presentation, the performance-based assessment, projects, and Unit Test Parts 1-2.

### Savvas Unit 3: Crazy, Stupid Love

Core sources include the unit introduction, the mentor text on *Romeo and Juliet*, literature-and-culture background, all five acts of *The Tragedy of Romeo and Juliet*, *Pyramus and Thisbe*, paired test practice, pro/con criticism of the play, poetry, independent readings, literary argument, advertisement performance task, the performance-based assessment, projects, and Unit Test Parts 1-2.

### Savvas Unit 4: Journeys of Transformation

Core sources include the unit introduction, *Gone and Back Again*, literature-and-culture background for *The Odyssey*, *The Odyssey* Parts 1-2, the graphic-novel adaptation, cross-genre test practice, a mariner's-license application, research writing, *The Return*, *The Writing on the Wall*, *The Hero's Adventure*, *Rules of the Game*, poetry, independent readings, an instructions performance task, the performance-based assessment, projects, and Unit Test Parts 1-2.

### Savvas Unit 5: World's End

Core sources include the unit introduction, *Dream's Winter*, *There Will Come Soft Rains*, *By the Waters of Babylon*, comparative genre writing, *The Nuclear Tourist*, poetry, *Preparedness 101: Zombie Apocalypse*, *War of the Worlds* audio/content, panic-analysis text and test practice, independent readings, short-story writing, poster presentation, the performance-based assessment, projects, and Unit Test Parts 1-2.

## Existing MLA repository sources

| Repository source | Finding |
|---|---|
| `Course-Overview.md` | Current six-unit skill-domain model; conflicts with requested Savvas thematic architecture |
| Existing Units 01-06 and `lesson.json` files | Eight lessons per unit; production content must not be overwritten during architecture |
| MLA English I standard inventory | 24 MLA standards across Reading, Writing, Language, Vocabulary, Research, and Communication |
| Existing crosswalk draft | Maps MLA standards to Florida B.E.S.T., Common Core, SAT, ACT, college, and workforce expectations |
| Unit- and lesson-level mapping files | Establish current skill-domain placement and spiral logic |
| `UNIT_02_INSIDE_THE_NIGHTMARE_SAVVAS_MOODLE_MAP.md` | Existing five-lesson Savvas thematic map; useful validated starting point |
| Existing Moodle XML, GIFT, and JSON assessments | Production artifacts; inventoried but not copied or modified |
| Existing MLA Unit 1 supplied by the user | **Complete and authoritative:** no new lessons, content, pretest, quizzes, or unit assessment are needed |

## Missing or unresolved evidence

- Savvas proprietary resource bodies and assessment questions were not copied into the repository.
- Item-level answer keys and question-to-standard mappings require controlled review during assessment production; they are not transferred in this phase.
- Exact per-selection Savvas URLs are confirmed for the existing Inside the Nightmare map; equivalent stable links for every later selection should be captured during unit production because Savvas uses session/program routing.
- CPALMS course applicability is independently confirmed for current English 1 course 1001310. Final academic approval is still required before publication.
- The Unit 1 curriculum-map document rendered in the live viewer and supplied goals, tasks, selections, and benchmark assignments. Chrome blocked the embedded Unit 2 document frame during the same session; therefore the package does not claim that all five curriculum-map document bodies were extracted. Unit 2-5 inventory evidence instead comes from the live unit tables of contents and selection containers and must be reconciled to the documents before final approval.
- The rendered Unit 1 curriculum-map document contains an internal metadata inconsistency: its overview identifies *Inside the Nightmare* and â€œWhat is the allure of fear?â€, while a later table-of-contents row displays â€œRites of Passageâ€ and â€œWhat are some challenges of growing up?â€ This appears to be publisher template residue and must not control the MLA architecture without clarification.

## Unit 1 scope boundary

Unit 1, **Literary and Informational Foundations**, is complete. This architecture package does not redesign, replace, audit, or request any new Unit 1 lesson, content, pretest, clustered quiz, or unit assessment. Unit 1 is referenced only to show the full course sequence and prerequisite relationship.
