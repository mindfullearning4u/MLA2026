# English III Pre-Moodle Transfer Readiness Audit

**Date:** 2026-07-11
**Course:** English III
**Audit Type:** Repo-to-Moodle transfer readiness checkpoint
**Status:** READY FOR MOODLE TRANSFER

## Scope

This audit verifies that English III is ready to begin Moodle transfer work under the academy transfer protocol. It checks the course production evidence, standards crosswalk, unit and lesson mapping, lesson artifact counts, assessment XML availability, and pre-transfer HTML cleanliness.

This audit does not certify Moodle enrollment readiness. Moodle enrollment readiness can only be certified after the course overview, question banks, assessment activities, lesson pages, Moodle visual checks, and final enrollment audit are complete inside Moodle.

## Source Files Reviewed

- `ENGLISH III/Course Production/Course-Overview.md`
- `ENGLISH III/Course Production/PHASE_2A_A_2_ENGLISH_III_MLA_STANDARD_INVENTORY.md`
- `ENGLISH III/Course Production/PHASE_2A_B_ENGLISH_III_CROSSWALK_DRAFT.md`
- `ENGLISH III/Course Production/PHASE_3A_A_ENGLISH_III_MAPPING_FRAMEWORK.md`
- `ENGLISH III/Course Production/PHASE_3A_B_1_ENGLISH_III_UNIT_LEVEL_MAPPING.md`
- `ENGLISH III/Course Production/PHASE_3A_B_2_ENGLISH_III_LESSON_LEVEL_MAPPING.md`
- `ENGLISH III/Course Audit/ENGLISH_III_MASTER_COURSE_CERTIFICATION_AUDIT.md`
- `ENGLISH III/Course Audit/ENGLISH_III_FINAL_LESSON_RIGOR_AND_XML_ASSESSMENT_AUDIT_2026-07-06.md`

## Standards And Crosswalk Check

**Result:** PASS

- The English III crosswalk contains 24 MLA English III standards.
- Florida B.E.S.T. / CPALMS benchmark alignment is documented with ELA.11 benchmark codes.
- The standards inventory states that benchmark codes and wording were verified against public CPALMS benchmark cards.
- Common Core, SAT, ACT, college readiness, and workforce readiness alignment columns are present in the crosswalk.
- No missing standard rows were found in the crosswalk count.

## Unit And Lesson Mapping Check

**Result:** PASS

- The course contains 6 units.
- Each unit contains 8 lessons.
- The course contains 48 total lessons.
- Lesson 8 is preserved as the unit synthesis / application lesson.
- Lesson 8 does not introduce new primary standards.
- Lesson sequence and unit progression match the documented mapping framework.

## Artifact Count Check

**Result:** PASS

- HTML lesson pages found in repo: 336
- `lesson.json` files found in repo: 48
- `quiz.json` files found in repo: 48
- Moodle XML assessment files found in repo: 102

## HTML Cleanliness Check

**Initial Finding:** Corrective action required.

The pre-transfer scan found visible repo artifacts in lesson HTML pages:

- `@{code=...; description=...}` standard-object text was visible in lesson content.
- Duplicate `Important Important:` labels appeared in lesson content.

**Correction Completed:** PASS

The visible standard-object artifacts were converted to student-facing standard labels using this format:

`MLA.ENG3.X.## - Standard Description`

Duplicate `Important Important:` labels were reduced to `Important:`.

**Post-Correction Scan:** PASS

The following artifact patterns were checked after correction and no remaining matches were found in English III lesson HTML:

- `@{`
- `Important Important`
- literal PowerShell newline artifacts: `` `r `` and `` `n ``
- mojibake/corrupted characters: `Ã` and `Â`
- invalid generated text markers: `undefined` and `NaN`

## Course Overview Check

**Result:** PASS

The course overview follows the required academy structure:

- Course Description
- Standards Alignment
- Learning Objectives / Outcomes
- Prerequisite Knowledge / Skills
- Course Structure
- Lesson Workflow
- Assessment Structure
- Mastery & Progression Criteria
- College / Skill Readiness Integration

## Assessment Staging Check

**Result:** PASS

The English III repo contains 102 Moodle XML files. The files have been staged for Moodle import at:

`D:\Assessment\ENG3`

The staged D-drive unit folder counts are:

- `D:\Assessment\ENG3\Unit 01`: 17 XML files
- `D:\Assessment\ENG3\Unit 02`: 17 XML files
- `D:\Assessment\ENG3\Unit 03`: 17 XML files
- `D:\Assessment\ENG3\Unit 04`: 17 XML files
- `D:\Assessment\ENG3\Unit 05`: 17 XML files
- `D:\Assessment\ENG3\Unit 06`: 17 XML files

The Moodle transfer agent must import assessments from these D-drive staging folders into the matching Moodle question bank using Moodle XML format.

## Transfer Readiness Decision

**Decision:** English III is approved to proceed to Moodle transfer. The corrected repo files have been committed/synced, and the 102 Moodle XML files have been staged to `D:\Assessment\ENG3`.

The Moodle transfer sequence must follow the academy transfer protocol:

1. Transfer the course overview.
2. Copy assessment XML files to the D-drive assessment staging folder.
3. Import all assessment XML files into the correct Moodle question banks.
4. Add questions from the question banks into the correct Moodle assessment activities.
5. Transfer lesson pages P01, P02, P03, P04, P06, and P07 only.
6. Transfer every lesson page through **Tools > Source code** only.
7. Confirm the content renders correctly in the Moodle editor before saving each page.
8. Complete the final course transfer and enrollment readiness audit.

## Restrictions

- Do not touch Marine Science files during English III transfer work.
- Do not use GIFT files for assessment transfer.
- Do not paste lesson HTML directly into the Moodle content box.
- Do not skip D-drive XML staging.
- Do not certify enrollment readiness until Moodle visual checks and assessment activity checks pass.
