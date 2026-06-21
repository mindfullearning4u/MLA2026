# Creative Writing Unit 05 Rigorous Audit

## Scope

- Course: Creative Writing only
- Unit: Unit 05, Revision, Workshop, Portfolio, and Publication
- Files audited:
  - Unit overview
  - Unit pretest
  - Lessons 01-08
  - All lesson metadata
  - All lesson pages P01-P07
  - All guided practice, quiz, and unit assessment GIFT banks

## Audit Standards Used

The audit checked for:

- alignment to the approved Unit 5 MLA lesson mapping;
- complete lesson architecture: `lesson.json`, `quiz.json`, and P01-P07 for every lesson;
- pretest structure at the Unit 05 root;
- correct Unit 5 standards language;
- detailed no-teacher instructional sequence;
- required page sections for P01-P07;
- common mistake correction with red/green teaching feedback where required;
- Moodle-ready GIFT format with no HTML;
- A-D answer choices only;
- correct answer markers and detailed feedback on every answer choice;
- no simple repeated answer pattern within assessment banks;
- no empty files;
- no conflict markers;
- no `Submit` wording.

## Initial Findings

### Finding 1: Unit Overview Was Outdated

The Unit 05 overview still described an older B.E.S.T.-aligned style, etymology, derivations, and foreign phrases unit. It did not match the completed MLA Unit 5 lesson sequence:

- revision from feedback;
- clarity, cohesion, and conventions;
- workshop collaboration;
- format-specific quality;
- online collaborative publication;
- author presentation;
- portfolio preparation;
- Unit 5 synthesis.

### Finding 2: Lesson 1 and Lesson 2 GIFT Banks Had Blank Correct Answers

The following files had correct-answer markers stored as blank `=` lines:

- `CW_U05_L01_GuidedPractice.gift`
- `CW_U05_L01_Quiz.gift`
- `CW_U05_L02_GuidedPractice.gift`
- `CW_U05_L02_Quiz.gift`

This was a Moodle-readiness issue because the correct answer text and correct feedback were missing from those answer choices.

### Finding 3: Lesson 1 and Lesson 2 Answer Distribution Needed Correction

After the blank answers were restored, Lesson 1 and Lesson 2 banks had answer distributions that were too repetitive, especially Lesson 2. This did not meet the no-pattern assessment requirement.

## Revisions Made

### Revision 1: Rebuilt Unit Overview

Replaced `Unit Overview.md` with an MLA-aligned Unit 5 overview that now matches:

- current Unit 5 title;
- approved MLA standards;
- supporting standards;
- completed lesson sequence;
- Unit Assessment alignment;
- mastery expectations;
- final-stage writing problem-solving focus.

### Revision 2: Restored Blank Correct Answers

Restored all blank correct-answer choices in Lesson 1 and Lesson 2 guided practice and quiz banks. Each restored answer now includes:

- an A-D answer label;
- complete answer text;
- `#Correct.` feedback;
- detailed teachable explanation.

### Revision 3: Normalized Lesson 1 and Lesson 2 Answer Patterns

Reordered Lesson 1 and Lesson 2 answer choices while preserving answer text and feedback. The updated answer patterns are mixed:

- `CW_U05_L01_GuidedPractice.gift`: `CABDC`
- `CW_U05_L01_Quiz.gift`: `BDACADBCDACBADCBDABCACDBA`
- `CW_U05_L02_GuidedPractice.gift`: `CADBC`
- `CW_U05_L02_Quiz.gift`: `BDACADBCDACBADCBDABCACDBA`

## Final Audit Rerun Results

PASS.

Final rerun found:

- 0 structural issues;
- 0 JSON parsing issues;
- 0 missing lesson pages;
- 0 empty files;
- 0 missing page-section requirements;
- 0 GIFT files with HTML;
- 0 GIFT files with missing feedback;
- 0 GIFT files with incorrect correct-answer marker counts;
- 0 GIFT files with incorrect distractor counts;
- 0 conflict markers;
- 0 `Submit` wording matches;
- 0 outdated B.E.S.T./ELA overview references.

## GIFT Validation Summary

- Unit pretest: 25 questions, 25 correct markers, 75 distractors.
- Lesson 1 guided practice: 5 questions, 5 correct markers, 15 distractors.
- Lesson 1 quiz: 25 questions, 25 correct markers, 75 distractors.
- Lesson 2 guided practice: 5 questions, 5 correct markers, 15 distractors.
- Lesson 2 quiz: 25 questions, 25 correct markers, 75 distractors.
- Lessons 3-7 guided practice: 5 questions each, correct marker counts verified.
- Lessons 3-7 quizzes: 25 questions each, correct marker counts verified.
- Lesson 8 guided practice: 5 questions, correct marker count verified.
- Lesson 8 Unit Assessment: 25 questions, 25 correct markers, 75 distractors.

## Final Outcome

Unit 05 is audit-passed and production-ready within the current Creative Writing build standard.

## Approval Needed

None.
