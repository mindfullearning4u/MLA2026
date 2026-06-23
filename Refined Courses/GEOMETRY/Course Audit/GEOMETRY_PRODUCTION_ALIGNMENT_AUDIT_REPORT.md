# Geometry Production Alignment Audit Report

## Scope

Course reviewed: Geometry

Scope reviewed:

- Units 1-6
- Lessons 1-8
- Pages P01-P07
- Unit pretest folders
- lesson.json and quiz.json files
- Guided Practice, Lesson Quiz, Unit Pretest, and Unit Assessment GIFT files
- Approved Geometry unit mapping source: `mla_geometry_unit_mapping_v2.md`

No lesson content was modified during this audit.

## Executive Summary

Geometry has complete lesson folders and valid assessment files, and lesson metadata aligns to the approved Geometry unit mapping. However, the lesson production shell is not yet fully compliant with the current MLA/ALG1 production model.

The largest deficiencies are missing required shell labels and workflow language, especially:

- P03 common mistake structure
- P04 step-by-step worked-example labeling
- P04 teachable explanation labeling
- P05 visible MLA.GEO standards display
- P07 TOR intervention language

Final audit decision: **FAIL - STRUCTURAL CORRECTIONS REQUIRED BEFORE CERTIFICATION**

## Validation Totals

| Area | Result |
|---|---:|
| Lessons checked | 48 |
| Lesson pages checked | 336 |
| Missing lesson pages | 0 |
| Page/shell issues found | 320 |
| JSON files checked | 96 |
| Invalid JSON files | 0 |
| GIFT files checked | 102 |
| GIFT count or HTML-tag issues | 0 |
| Mapping rows parsed | 48 |
| Mapping/metadata issues | 0 |

## Page Shell Findings

| Finding Type | Count |
|---|---:|
| P02 missing `Notebook Title` | 10 |
| P02 missing `Vocabulary` | 4 |
| P03 missing `Common Mistake` | 47 |
| P03 missing `Incorrect` | 40 |
| P03 missing `Correct` | 30 |
| P04 missing `Step-by-step explanation` | 48 |
| P04 missing `Teachable Explanation` | 48 |
| P05 missing `Guided Practice` label | 2 |
| P05 missing visible `MLA.GEO` standard display | 43 |
| P07 missing `TOR Intervention` language | 48 |

## Workflow Findings

P06 workflow structure is largely aligned to the current MLA model:

- P06 Independent Work title present.
- Opening independent-work instructions present.
- Notebook evidence language present.
- Part A, Part B, and Part C present.

P07 requires correction:

- All 48 P07 pages are missing explicit `TOR Intervention` language.
- Submission workflow components are otherwise present.
- 80% mastery and resubmission language are present.

## Assessment and Moodle Readiness Findings

Assessment files passed mechanical validation:

- Guided Practice files contain the expected 5 questions.
- Lesson Quiz files contain the expected 25 questions.
- Unit Pretest files contain the expected 10 questions.
- Unit Assessment files contain the expected 40 questions.
- No malformed JSON was detected.
- No GIFT HTML-tag issues were detected.

Pretest folders exist, but no pretest P01 overview pages were found:

- Unit 01 Pretest P01 missing
- Unit 02 Pretest P01 missing
- Unit 03 Pretest P01 missing
- Unit 04 Pretest P01 missing
- Unit 05 Pretest P01 missing
- Unit 06 Pretest P01 missing

This may be acceptable if Geometry pretests are intended to exist only as GIFT/JSON assets. If Geometry is expected to match the ALG2 pretest overview-page model, six pretest P01 pages should be created.

## Standards and Mapping Alignment

The approved mapping file `mla_geometry_unit_mapping_v2.md` was parsed across all 48 mapped lessons.

Result:

- Mapping rows parsed: 48
- lesson.json mapping/metadata issues: 0

The lesson metadata aligns to the approved unit mapping. No missing mapped standards or unauthorized extra standards were detected in lesson metadata.

## Content and Rigor Observations

This audit did not rewrite or regrade instructional content. Based on structural review:

- Lessons are present and populated.
- No empty P01-P07 lesson pages were detected.
- The required shell labels are inconsistent, so content cannot yet be certified as fully MLA production-ready even when the underlying instructional material appears present.
- P04 worked examples appear to contain mathematical work, but the required production labels for step-by-step explanation and teachable explanation are not consistently displayed.
- P05 assessment pages often lack visible MLA.GEO standard tags, which affects standards transparency for students.

## Required Corrections

Before Geometry can pass production alignment certification, correct the following without changing instructional meaning:

1. Add missing P02 `Notebook Title` and `Vocabulary` labels where absent.
2. Normalize P03 to include `Common Mistake`, red/incorrect example, green/correct example, and teachable explanation language.
3. Normalize all P04 pages to include:
   - Example 1
   - Example 2
   - Example 3
   - Step-by-step explanation
   - Common Mistake
   - Incorrect example
   - Correct example
   - Teachable Explanation
4. Add visible `MLA.GEO` standard display to P05 pages where missing.
5. Add explicit P07 `TOR Intervention` language to all checkpoint pages.
6. Decide whether Geometry pretest folders need P01 overview pages to match the ALG2 pretest model.

## Final Certification Decision

Geometry Production Alignment:

**FAIL - STRUCTURAL CORRECTIONS REQUIRED BEFORE CERTIFICATION**

No corrections were made during this audit pass.
