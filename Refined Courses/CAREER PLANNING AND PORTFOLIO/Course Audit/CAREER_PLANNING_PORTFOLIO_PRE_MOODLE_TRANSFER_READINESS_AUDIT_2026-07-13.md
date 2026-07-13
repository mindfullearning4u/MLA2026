# Career Planning and Portfolio Pre-Moodle Transfer Readiness Audit

**Date:** 2026-07-13
**Course:** Career Planning and Portfolio
**Audit Type:** Repo-to-Moodle transfer readiness checkpoint
**Status:** REPOSITORY READY - STAGING REQUIRED BEFORE MOODLE IMPORT

## Scope

This audit verifies whether the repository course package is ready to begin Moodle transfer work under the academy lesson and assessment transfer protocols. It does not certify enrollment readiness, because enrollment readiness can only be certified after Moodle course overview transfer, question-bank import, lesson-page transfer, activity configuration, and Moodle render checks are complete.

## Gate Results

| Gate | Result | Evidence |
|---|---:|---|
| Course completion audit | PASS | Completion audit exists and reports PASS with zero findings. |
| Course overview | PASS | Required overview sections are present and no internal/draft markers were detected. |
| Mapping and standards files | PASS | Source-of-truth, standards inventory, crosswalk, unit mapping, lesson mapping, and trace files are present. |
| Lesson folder structure | PASS | 30/30 lesson folders found in 6 units. |
| Repository lesson transfer pages | PASS | P01, P02, P03, P04, P06, and P07 exist for all 30 lessons; no mojibake, backend file leakage, placeholder artifacts, or prohibited teacher-led language detected. |
| Lesson and assessment metadata | PASS | Lesson 1-4 quiz metadata and Lesson 5 synthesis/unit-assessment metadata match the 0.5-credit model. |
| Assessment repository package | PASS | 66 Moodle XML files, 1,050 multichoice questions, no GIFT files, and no Lesson 5 quiz XML files found. |
| D-drive assessment staging | PENDING | D:\Assessment\CPP does not exist. Assessment XML has not yet been staged for Moodle import. |

## Required Transfer Counts

- Transfer lesson pages: 180 files (P01, P02, P03, P04, P06, P07 for 30 lessons).
- Repository Moodle XML files: 66.
- Repository Moodle XML questions: 1,050.
- D-drive staged XML files expected before import: 66.
- Expected D-drive unit folders: `D:\Assessment\CPP\Unit 01` through `Unit 06`, 11 XML files per unit.

## Findings

- PENDING: D-drive XML staging is still required before Moodle assessment import.

## Readiness Decision

Career Planning and Portfolio is repository-ready for Moodle transfer, but assessment XML must be staged to the approved D-drive path before Moodle question-bank import can begin.

## Transfer Restrictions

- Do not import assessments from the repository folders directly into Moodle.
- Do not import GIFT files.
- Do not transfer P05 pages into Moodle lesson activities under the standard transfer page map.
- Use only Moodle XML for assessment import.
- Use Moodle source-code paste for lesson-page transfer.
- Do not certify enrollment readiness until Moodle render and activity checks are complete.
