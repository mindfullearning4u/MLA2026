# English IV Unit 2 Lessons 1-2 Production Audit

## Executive Summary

English IV Unit 2 Lessons 1 and 2 were built and audited as a production batch.

Scope reviewed:

- Unit 2 Lesson 1: Literary elements and functional significance
- Unit 2 Lesson 2: Two or more themes and their development
- P01-P07 pages
- Guided Practice GIFT files
- Lesson Quiz GIFT files
- `lesson.json`
- `quiz.json`
- Visual shell consistency
- Standards scope
- Moodle readiness
- Self-paced mastery design requirements

Final result:

**PASS**

## Approved Mapping Verification

| Lesson | Focus | Primary Standard | Support Standards | Result |
|---|---|---|---|---|
| Unit 2 Lesson 1 | Literary elements and functional significance | MLA.ENG4.R.01 | MLA.ENG4.R.10, MLA.ENG4.V.01, MLA.ENG4.L.01 | PASS |
| Unit 2 Lesson 2 | Two or more themes and their development | MLA.ENG4.R.02 | MLA.ENG4.R.01, MLA.ENG4.R.10, MLA.ENG4.V.01 | PASS |

## File Presence Audit

| Requirement | Lesson 1 | Lesson 2 | Result |
|---|---|---|---|
| P01 Lesson Overview | Present | Present | PASS |
| P02 Notebook Task Part 1 | Present | Present | PASS |
| P03 Notebook Task Part 2 | Present | Present | PASS |
| P04 Worked Example | Present | Present | PASS |
| P05 Guided Practice | Present | Present | PASS |
| P06 Independent Work | Present | Present | PASS |
| P07 Checkpoint | Present | Present | PASS |
| `lesson.json` | Present | Present | PASS |
| `quiz.json` | Present | Present | PASS |
| Guided Practice GIFT | Present | Present | PASS |
| Lesson Quiz GIFT | Present | Present | PASS |

## JSON Validation

| File | Result |
|---|---|
| `Lesson 01/lesson.json` | PASS |
| `Lesson 01/quiz.json` | PASS |
| `Lesson 02/lesson.json` | PASS |
| `Lesson 02/quiz.json` | PASS |

Metadata reference validation:

- Lesson 1 `lesson.json` page references resolve to P01-P07.
- Lesson 2 `lesson.json` page references resolve to P01-P07.
- Lesson 1 `quiz.json` references existing Guided Practice and Lesson Quiz GIFT files.
- Lesson 2 `quiz.json` references existing Guided Practice and Lesson Quiz GIFT files.

Result: **PASS**

## GIFT Validation

| File | Questions | Choices | Correct Answers | HTML | Standards Displayed | Answer Distribution | Max Run | Result |
|---|---:|---:|---:|---:|---:|---|---:|---|
| `ENG4_U02_L01_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U02_L01_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | A=7, B=6, C=6, D=6 | 1 | PASS |
| `ENG4_U02_L02_GuidedPractice.gift` | 5 | 20 | 5 | 0 | 5 | A=1, B=2, C=1, D=1 | 1 | PASS |
| `ENG4_U02_L02_Quiz.gift` | 25 | 100 | 25 | 0 | 25 | A=7, B=6, C=6, D=6 | 1 | PASS |

GIFT requirements verified:

- Each Guided Practice contains exactly 5 questions.
- Each Lesson Quiz contains exactly 25 questions.
- Each question contains four A-D answer choices.
- Each question has exactly one correct answer.
- MLA standards are displayed.
- Feedback is present.
- No HTML appears inside GIFT files.
- No malformed answer choice lines were found.
- Correct-answer positions are balanced and non-clustered.

Result: **PASS**

## Issues Found and Corrected

Initial audit finding:

- Several GIFT answer choices had correct feedback but were still marked with the incorrect-answer symbol.
- Answer-key positions required balancing to avoid clustering.

Corrective action:

- Correct-answer markers were repaired.
- Answer choice positions were mechanically rebalanced.
- Question wording, answer wording, feedback intent, passages, and standards were preserved.

Re-audit result:

- All GIFT files passed question count, answer count, choice count, standard display, feedback, HTML, and answer distribution checks.

## Visual and Structural Shell Audit

| Requirement | Result |
|---|---|
| ALG1-style boxed visual layout used | PASS |
| Arial/Helvetica font stack present | PASS |
| Boxed sections with consistent spacing present | PASS |
| P01-P07 lesson flow preserved | PASS |
| P07 contains Teacher of Record reminder | PASS |
| P07 contains submission workflow | PASS |
| P07 contains checkpoint task | PASS |
| P07 contains mastery criteria | PASS |

## English Instructional Flow Audit

| Requirement | Lesson 1 | Lesson 2 | Result |
|---|---|---|---|
| Explicit teaching before practice | Present | Present | PASS |
| Step-by-step explanation | Present | Present | PASS |
| Embedded passage included | Present | Present | PASS |
| Notebook Task Part 1 | Present | Present | PASS |
| Notebook Task Part 2 | Present | Present | PASS |
| Common mistake in P03 | Present | Present | PASS |
| Worked examples in P04 | Present | Present | PASS |
| Common mistake in P04 | Present | Present | PASS |
| Independent Work Parts A, B, C | Present | Present | PASS |
| Checkpoint aligns to lesson standards | Present | Present | PASS |

## Common Mistake Audit

| File | Common Mistake Present | Incorrect Example Red | Correct Example Green | Result |
|---|---|---|---|---|
| Lesson 1 P03 | Yes | Yes | Yes | PASS |
| Lesson 1 P04 | Yes | Yes | Yes | PASS |
| Lesson 2 P03 | Yes | Yes | Yes | PASS |
| Lesson 2 P04 | Yes | Yes | Yes | PASS |

## Standards Scope Audit

Approved standards used:

- `MLA.ENG4.R.01`
- `MLA.ENG4.R.02`
- `MLA.ENG4.R.10`
- `MLA.ENG4.V.01`
- `MLA.ENG4.L.01`

No unapproved future Unit 2 standards were introduced into Lessons 1 or 2.

Result: **PASS**

## Embedded Passage Audit

Lesson 1 uses the embedded passage "The Lantern Keeper."

Lesson 2 uses the embedded passage "The Empty Chair."

Passages are included directly in:

- Instructional lesson pages
- Independent work
- Checkpoint tasks
- Guided Practice questions
- Lesson Quiz questions

Students are not required to search elsewhere for source passages.

Result: **PASS**

## Final Audit Decision

English IV Unit 2 Lessons 1-2 Production Batch:

**PASS — APPROVED FOR NEXT LESSON BATCH**
