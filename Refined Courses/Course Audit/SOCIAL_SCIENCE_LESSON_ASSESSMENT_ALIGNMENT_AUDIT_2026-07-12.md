# Social Science Lesson and Assessment Alignment Audit

Date: 2026-07-12

Scope:
- World History
- U.S. History
- U.S. Government
- Personal Financial Literacy and Economics
- Psychology
- Sociology
- Global Perspectives
- Cultural Studies

## Audit Purpose

This audit verifies that social science course lessons and Moodle XML assessments align to the validated course production files, especially the crosswalk, unit mapping, and lesson mapping.

The audit checks:
- Every mapped content standard appears in lessons.
- Every mapped content standard appears in Moodle XML assessment coverage.
- No unmapped content standard appears in lesson or assessment scope.
- Lesson page structure is complete.
- Visual, source, chart, map, timeline, organizer, or table support is present where required.
- Assessments are Moodle XML only.
- No `.gift` files exist.
- Guided practice, quiz, pretest, and unit assessment question counts are correct.
- Each XML question has four answer choices and exactly one correct answer.
- Prohibited teacher-led language is absent.

## Repairs Completed

### World History

- Removed duplicate standards from `PHASE_3B_LESSON_MAPPING.md`:
  - Unit 01 Lesson 04: duplicate `SS.912.W.2.8`
  - Unit 06 Lesson 05: duplicate `SS.912.G.4.2` and `SS.912.G.4.3`

### U.S. History

- Rebuilt all six Lesson 08 Guided Practice Moodle XML files so they use the mapped synthesis Lesson 08 standards and visual/source stimulus:
  - Unit 01: `source-timeline-rights synthesis organizer`
  - Unit 02: `industrialization evidence portfolio`
  - Unit 03: `turning-point evidence matrix`
  - Unit 04: `war-rights-justice-policy synthesis organizer`
  - Unit 05: `postwar rights and reform evidence portfolio`
  - Unit 06: `contemporary U.S. evidence portfolio`
- Added exact support-standard trace metadata to U.S. History `lesson.json` and `quiz.json` files for ELA, ELD, and MTR support standards. These are support/readiness standards for literacy, access, data reasoning, SAT/ACT readiness, and accreditation traceability; they do not replace the mapped U.S. History content standards.

### Psychology

- Updated Unit 06 Pretest XML so `MLA.PSY.CAP.2` is explicitly assessed in the capstone pretest coverage.

### Sociology

- Updated Unit 03 Pretest XML so `MLA.SOC.STR.2` is explicitly assessed.
- Updated Unit 03 Unit Assessment XML so `MLA.SOC.STR.2` is explicitly assessed.
- Updated Unit 06 Pretest XML so `MLA.SOC.CAP.2` is explicitly assessed.

### Cultural Studies

- Added mapped `standards` arrays to all 48 `quiz.json` metadata files.
- Confirmed Lesson 08 remains unit assessment only and has no lesson quiz bank.

## Final Validation Summary

| Course | Decision | Lessons | HTML Pages | XML Files | XML Questions | Gift Files | Mapped Standards | Lesson Standards | Assessment Standards |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| World History | PASS | 48 | 336 | 102 | 1590 | 0 | 118 | 118 | 118 |
| U.S. History | PASS | 48 | 336 | 102 | 1590 | 0 | 92 | 92 | 92 |
| U.S. Government | PASS | 30 | 210 | 66 | 1050 | 0 | 24 | 24 | 24 |
| Personal Financial Literacy and Economics | PASS | 48 | 336 | 102 | 1590 | 0 | 24 | 24 | 24 |
| Psychology | PASS | 48 | 336 | 102 | 1590 | 0 | 14 | 14 | 14 |
| Sociology | PASS | 48 | 336 | 102 | 1590 | 0 | 14 | 14 | 14 |
| Global Perspectives | PASS | 48 | 336 | 102 | 1590 | 0 | 13 | 13 | 13 |
| Cultural Studies | PASS | 48 | 336 | 102 | 1590 | 0 | 13 | 13 | 13 |

## Final Decision

PASS

All scoped social science courses pass the repository-side lesson and assessment alignment audit. Moodle transfer still requires the normal Moodle import/preview check.
