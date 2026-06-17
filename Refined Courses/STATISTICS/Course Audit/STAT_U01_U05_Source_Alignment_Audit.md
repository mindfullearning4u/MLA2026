# Statistics Units 1-5 Source Alignment Audit

## Executive Summary

Statistics Units 1-5 were checked against the approved course-level source requirements:

- Statistics standards crosswalk
- Statistics standards audit
- Statistics course overview
- Existing lesson and assessment metadata

Unit Overview.md files were intentionally ignored during this audit.

Final Recommendation: PASS AFTER CORRECTIONS

## Strengths

All five completed units use Statistics-only MLA standards.

No ALG1, Geometry, ALG2, or incorrect-course standard references were found in Units 1-5.

Within each completed unit, lesson pages, Guided Practice files, Lesson Quiz files, Unit Assessments, and Unit Pretests are internally aligned to the standards used in that unit.

Assessment files for Units 1-5 use Moodle-safe GIFT formatting and preserve visible Question ID and MLA Standard metadata.

Unit 1 aligns to the course overview focus of Statistical Thinking and Data Foundations.

## Findings

### Finding 1: Unit Topic Sequence Did Not Fully Match the Approved Course Overview

The Statistics Course Overview previously listed this unit sequence:

| Unit | Course Overview Unit Focus |
|---|---|
| Unit 1 | Statistical Thinking and Data Foundations |
| Unit 2 | Data Collection and Research Design |
| Unit 3 | Data Visualization and Descriptive Statistics |
| Unit 4 | Bivariate Data, Association, and Models |
| Unit 5 | Probability, Simulation, and Uncertainty |
| Unit 6 | Statistical Inference, Claims, and Decisions |

The completed Units 1-5 and the Statistics Benchmark Master Tracker show this mapped sequence:

| Unit | Built Lesson / Assessment Focus |
|---|---|
| Unit 1 | Statistical Thinking and Data Foundations |
| Unit 2 | Data Visualization and Descriptive Statistics |
| Unit 3 | Bivariate Data, Association, and Models |
| Unit 4 | Probability and Probability Rules |
| Unit 5 | Sampling, Bias, Simulation, Inference, and Data-Based Decisions |

Unit 1 matched the course overview.

Units 2-5 were internally consistent and matched the Statistics Benchmark Master Tracker, but the Course Overview had not been updated to match the benchmark/unit mapping.

Correction applied:

Course-Overview.md was updated so the approved unit sequence now matches the Statistics Benchmark Master Tracker and the completed Units 1-5:

| Unit | Corrected Course Overview Unit Focus |
|---|---|
| Unit 1 | Statistical Thinking and Data Foundations |
| Unit 2 | Numerical Data, Variability, and Distribution Models |
| Unit 3 | Bivariate Data, Association, and Models |
| Unit 4 | Probability, Conditional Probability, and Counting |
| Unit 5 | Sampling, Bias, Simulation, and Statistical Inference |
| Unit 6 | Random Variables, Expected Value, and Probability Decisions |

### Finding 2: Approved Unit Mapping Source Confirmed

The approved mapping source was confirmed as:

- Refined Courses/STATISTICS/BEST Standards/Statistics Benchmark Master Tracker.md

This tracker establishes the single standards source of truth for Statistics and assigns CPALMS/MLA standards to units and lessons. Units 1-5 match that tracker.

### Finding 3: Older Metadata Shape Existed in Units 1-2

Units 1-2 lesson.json files use older metadata fields such as primaryStandards instead of the cleaner standard_ids structure used in Units 3-5.

This does not affect lesson content or assessment alignment because P01 pages and GIFT files include the correct Statistics standards, but metadata normalization is recommended for consistency.

Correction applied:

Units 1-2 lesson.json files were updated with standard_ids and benchmark_ids fields while preserving the existing primaryStandards metadata and all instructional content.

## Required Corrections

Completed:

Course-Overview.md was corrected to match the Statistics Benchmark Master Tracker and the completed unit sequence.

Metadata-only correction completed:

Units 1-2 lesson.json files now include standard_ids and benchmark_ids consistently with Units 3-5. This did not change instructional content.

## Recommended Improvements

Create or place the approved Statistics unit mapping file inside Refined Courses/STATISTICS so future audits can compare directly against the official mapping rather than inferring from course overview and built lesson metadata.

Maintain one metadata convention across all future Statistics units:

- standard_ids
- benchmark_ids
- guided_practice
- quiz or unit_assessment

## Standards Coverage Summary

| Unit | Standards Found in Assessments | Status |
|---|---|---|
| Unit 1 | MLA.STAT.STQ.1, MLA.STAT.STQ.2, MLA.STAT.DVD.3 | PASS |
| Unit 2 | MLA.STAT.DVD.4, MLA.STAT.DVD.5, MLA.STAT.DVD.6 | PASS |
| Unit 3 | MLA.STAT.BVM.1-MLA.STAT.BVM.10 | PASS |
| Unit 4 | MLA.STAT.PSU.1-MLA.STAT.PSU.10 | PASS |
| Unit 5 | MLA.STAT.DCR.1-MLA.STAT.DCR.5, MLA.STAT.INF.1-MLA.STAT.INF.7, MLA.STAT.DMC.1 | PASS |

## Assessment Coverage Summary

| Unit | Assessment Coverage | Status |
|---|---|---|
| Unit 1 | Guided Practice, Lesson Quizzes, Unit Assessment, Unit Pretest | PASS |
| Unit 2 | Guided Practice, Lesson Quizzes, Unit Assessment, Unit Pretest | PASS |
| Unit 3 | Guided Practice, Lesson Quizzes, Unit Assessment, Unit Pretest | PASS |
| Unit 4 | Guided Practice, Lesson Quizzes, Unit Assessment, Unit Pretest | PASS |
| Unit 5 | Guided Practice, Lesson Quizzes, Unit Assessment, Unit Pretest | PASS |

## Audit Sections

Files Built / Verified: PASS

Standards Alignment: PASS

Lesson Content Accuracy: PASS

Assessment Content Accuracy: PASS

Feedback Quality: PASS

Standards Placement: PASS

Standards Coverage: PASS

Answer Distribution: PASS

Duplicate Choice Audit: PASS

Missing Feedback Audit: PASS

Cross-Course Scan: PASS

JSON Validation: PASS

Shell Compliance: PASS

Moodle Formatting Compliance: PASS

Final Recommendation: PASS AFTER CORRECTIONS
