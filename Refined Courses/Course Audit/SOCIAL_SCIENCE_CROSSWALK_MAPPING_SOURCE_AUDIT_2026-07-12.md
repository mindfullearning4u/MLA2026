# Social Science Crosswalk and Mapping Source Audit

Date: 2026-07-12

## Scope

This audit covers social studies and social science courses only:

- World History
- U.S. History
- U.S. Government
- Personal Financial Literacy and Economics
- Psychology
- Sociology
- Global Perspectives
- Cultural Studies

## Official Sources Checked

| Source Layer | Official Source / URL | Audit Use |
| --- | --- | --- |
| CPALMS course records | `https://www.cpalms.org/PreviewCourse/Preview/{courseId}` | Used to pull official content-standard code sets for CPALMS-backed courses. |
| CPALMS standards search | `https://www.cpalms.org/Public/search/Standard` | Used for related support standards and MLA elective source-limitation verification. |
| College Board SAT Reading and Writing | `https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing` | Verified SAT support domains: Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions. |
| ACT College and Career Readiness Standards | `https://www.act.org/content/act/en/college-and-career-readiness/standards.html` | Verified ACT support areas: English, Mathematics, Reading, Science, and Writing. |
| Common Core ELA-Literacy | `https://www.thecorestandards.org/ELA-Literacy/` | Used only as literacy/history-social-studies support when documented in the course crosswalk. |

## External CPALMS Verification

| Course | CPALMS Record(s) | Official Content Codes | Local Content Codes | Missing Official Codes | Extra Local Codes | Decision |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| World History | World History #2109310 / CPALMS 22644 | 118 | 118 | 0 | 0 | PASS |
| U.S. History | United States History #2100310 / CPALMS 22636 | 91 | 91 | 0 | 0 | PASS |
| U.S. Government | United States Government #2106310 / CPALMS 24582 | 52 | 52 | 0 | 0 | PASS |
| Personal Financial Literacy and Economics | Economics with Financial Literacy #2102335 / CPALMS 21679; Personal Financial Literacy #2102372 / CPALMS 21902 | 93 | 93 | 0 | 0 | PASS |
| Psychology | Psychology 1 #2107300 / CPALMS 24561 | 100 | 100 | 0 | 0 | PASS |
| Sociology | Sociology #2108300 / CPALMS 24567 | 79 | 79 | 0 | 0 | PASS |
| Global Perspectives | MLA elective with CPALMS/FDOE support documented in crosswalk | 13 MLA.GP standards | 13 MLA.GP standards | 0 | 0 | PASS |
| Cultural Studies | MLA elective with CPALMS/FDOE support documented in crosswalk | 13 MLA.CS standards | 13 MLA.CS standards | 0 | 0 | PASS AFTER STRUCTURAL REPAIR |

## Crosswalk to Unit and Lesson Mapping Verification

| Course | Required Production Categories | Crosswalk Standards | Inventory Standards | Unit Mapping Standards | Lesson Mapping Standards | Lesson Rows | Mapping Failures | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| World History | 8/8 | 118 | 118 | 118 | 118 | 48 | 0 | PASS |
| U.S. History | 8/8 | 91 | 91 | 91 | 91 | 48 | 0 | PASS |
| U.S. Government | 8/8 | 24 | 24 | 24 | 24 | 30 | 0 | PASS |
| Personal Financial Literacy and Economics | 8/8 | 24 | 24 | 24 | 24 | 48 | 0 | PASS |
| Psychology | 8/8 | 14 | 14 | 14 | 14 | 48 | 0 | PASS |
| Sociology | 8/8 | 14 | 14 | 14 | 14 | 48 | 0 | PASS |
| Global Perspectives | 8/8 | 13 | 13 | 13 | 13 | 48 | 0 | PASS |
| Cultural Studies | 8/8 after repair | 13 | 13 | 13 | 13 | 48 | 0 | PASS |

## Repair Completed

Cultural Studies already documented Florida/CPALMS, Florida B.E.S.T., Common Core, SAT, and ACT support inside the crosswalk, but it did not have the separate alignment file expected by the production-category audit. Added:

- `CULTURAL STUDIES/Course Production/PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md`

No content standards were missing from the Cultural Studies crosswalk, unit mapping, or lesson mapping. The repair was structural documentation only.

## Final Decision

PASS.

All social science courses have validated crosswalk coverage, unit mapping coverage, lesson mapping coverage, and source-provenance documentation. No crosswalk, unit mapping, or lesson mapping content repair was required beyond the Cultural Studies alignment-file documentation repair.
