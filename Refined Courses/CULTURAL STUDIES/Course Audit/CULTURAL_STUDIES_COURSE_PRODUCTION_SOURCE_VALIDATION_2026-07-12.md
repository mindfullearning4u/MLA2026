# Cultural Studies Course Production Source Validation

Date: 2026-07-12

## Scope

Audit the Cultural Studies course-production layer before accepting lesson or assessment work as final. The audit checked whether the standards inventory, crosswalk, unit mapping, and lesson mapping were accurate enough to support accreditation-ready course development.

## Sources Checked

| Source Layer | Checked Source | Result |
| --- | --- | --- |
| CPALMS | CPALMS Standards Search and live search endpoint at `https://www.cpalms.org/Search/GetSearchStandard` | Verified CPALMS Social Studies and English Language Arts (B.E.S.T.) standards are available. No one-to-one Cultural Studies high-school course record was located during this audit. |
| Florida B.E.S.T. | CPALMS English Language Arts (B.E.S.T.) search results | Verified support standards for evidence, argument, research, presentation, perspective, and digital media. |
| Common Core | Official Common Core site attempted at `https://www.thecorestandards.org/ELA-Literacy/RH/11-12/` and `https://www.thecorestandards.org/ELA-Literacy/WHST/11-12/` | Site returned a verification challenge during the audit. The crosswalk therefore treats Common Core as a secondary support-code layer only, not as a primary verified Florida requirement. |
| SAT | College Board SAT Reading and Writing page | Verified official SAT support domains: Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions. |
| ACT | ACT College and Career Readiness Standards page | Verified ACT standards page and subject areas for English, Reading, Science, and Writing readiness support. |

## Findings

| Finding | Evidence | Decision |
| --- | --- | --- |
| Original crosswalk support language was too vague. | The prior crosswalk used phrases such as `Florida social studies/humanities inquiry support` and `CPALMS search checked` without exact support codes. | FAIL before repair. |
| MLA.CS standards are internally coherent. | All 13 MLA.CS standards in the standards inventory appear in the crosswalk and lesson trace. | PASS after source-layer clarification. |
| No single governing CPALMS Cultural Studies course was verified. | CPALMS source search produced related Social Studies and B.E.S.T. support standards, not a one-to-one Cultural Studies course source. | PASS with limitation documented. |
| Unit mapping covers all MLA.CS standards. | Units 1-6 collectively cover FND.1, FND.2, ID.1, ID.2, COM.1, BEL.1, HIS.1, ART.1, MED.1, GLB.1, ETH.1, RES.1, and CAP.1. | PASS. |
| Lesson mapping covers all mapped unit standards. | Every unit standard has at least one lesson placement, and synthesis lessons collect unit standards. | PASS. |
| Course production needed exact support-code repair. | Crosswalk did not provide enough source provenance for accreditation documentation. | REPAIRED in `PHASE_2A_B_CROSSWALK_DRAFT.md`. |

## Repaired Crosswalk Controls

The crosswalk now states:

- MLA.CS standards are primary content standards.
- CPALMS/FDOE, Florida B.E.S.T., Common Core, SAT, and ACT are support/readiness layers only.
- Support alignments must not add content outside the approved Cultural Studies mapping.
- CPALMS support codes and Florida B.E.S.T. support codes are listed explicitly.
- SAT and ACT are documented as readiness support, not replacement standards.

## Course Production Decision

PASS FOR COURSE-PRODUCTION MAPPING ONLY.

This does not certify lessons or assessments. It means the course-production source layer is now sufficiently documented to support the next audit step: checking lessons and assessments against the repaired crosswalk, unit mapping, and lesson mapping.
