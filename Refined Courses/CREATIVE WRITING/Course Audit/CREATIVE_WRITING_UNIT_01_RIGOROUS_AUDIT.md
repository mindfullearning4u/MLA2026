# Creative Writing Unit 1 Rigorous Audit

Audit date: 2026-06-21

Scope: `Refined Courses/CREATIVE WRITING/Units/Unit 01`

Restriction followed: Creative Writing only. No other course files were edited.

## Audit Priority

This audit checked Creative Writing Unit 1 for:

- Required lesson architecture: `lesson.json`, `quiz.json`, and P01-P07 for each lesson.
- Pretest, guided practice, lesson quizzes, and Unit 1 assessment Moodle readiness.
- Standards alignment to the approved Creative Writing Unit 1 lesson map.
- ALG1-style visual shell consistency: boxed sections, color-coded instructional blocks, and readable LMS formatting.
- Self-paced instructional quality for students without a live teacher.
- Remedial, standard, and accelerated learning support.
- Common mistake sections with correct and incorrect examples.
- Worked examples with step-by-step explanation.
- Checkpoint workflow, TOR support, submission instructions, and mastery criteria.
- Answer-position balance and no obvious answer pattern.

## Initial Findings

1. Lesson 1 and Lesson 2 metadata contained unresolved merge markers in `lesson.json` and `quiz.json`.
   - Impact: JSON was not valid and was not audit ready.
   - Correction made: Removed conflict markers and retained the richer structured standards metadata plus the existing lesson quiz settings.

2. Unit 1 GIFT files had answer-position patterns and uneven answer distribution.
   - Impact: Assessment banks were technically readable but not assessment-quality ready.
   - Correction made: Reordered answer choices across Unit 1 GIFT files while preserving question content, correct answers, and feedback.

3. Lessons 1-8 needed a consistent adaptive self-paced support path.
   - Impact: The lessons taught the skills, but the course standard requires explicit support for remedial, standard, and accelerated students in a no-teacher environment.
   - Correction made: Added or standardized `Self-Paced Learning Path` blocks on P02 pages with explicit remedial, standard, and accelerated routes.

4. P01 help wording did not consistently use the TOR acronym.
   - Impact: The required "Ask TOR for help" component was present in meaning but not consistently explicit.
   - Correction made: Updated P01 help boxes to say `Ask Your TOR (Teacher of Record) for Help`.

## Re-Audit Results

### Structure

PASS

- Lessons 1-8 each contain P01-P07.
- Lessons 1-8 each contain `lesson.json`.
- Lessons 1-8 each contain `quiz.json`.
- Unit 1 contains `pretest.json`.
- Unit 1 contains the pretest GIFT file.

### JSON

PASS

- `pretest.json`: valid.
- Lesson 1-8 `lesson.json`: valid.
- Lesson 1-8 `quiz.json`: valid.

Note: Lesson 1 and Lesson 2 JSON files originally contained merge markers. The file contents now validate as JSON, and the repaired files have been marked resolved in Git.

### Moodle GIFT Readiness

PASS

- Pretest: 25 questions.
- Lesson guided practice files: 5 questions each.
- Lesson quizzes: 25 questions each.
- Lesson 8 Unit Assessment: 25 questions.
- Every GIFT question has 4 choices.
- Every GIFT question has exactly 1 correct answer marker.
- No HTML detected in GIFT files.
- No incorrect choice contains `#Correct`.

### Answer Pattern Audit

PASS

- 25-question banks now use balanced distribution: A=7, B=6, C=6, D=6.
- Guided practice banks use balanced 5-question distribution: A=1, B=1, C=2, D=1.
- No repeated ABCD answer-key cycle remains.

### Standards Alignment

PASS

- Lesson 1: `MLA.CW.COM.02`; supports `MLA.CW.COM.04`, `MLA.CW.COM.05`.
- Lesson 2: `MLA.CW.COM.03`; supports `MLA.CW.WR.05`, `MLA.CW.NAR.01`.
- Lesson 3: `MLA.CW.WR.05`; supports `MLA.CW.COM.03`, `MLA.CW.WR.07`.
- Lesson 4: `MLA.CW.WR.09`; supports `MLA.CW.WR.03`, `MLA.CW.WR.10`.
- Lesson 5: `MLA.CW.WR.10`; supports `MLA.CW.WR.09`, `MLA.CW.WR.08`.
- Lesson 6: `MLA.CW.WR.08`; supports `MLA.CW.WR.09`, `MLA.CW.COM.02`.
- Lesson 7: `MLA.CW.COM.04`, `MLA.CW.COM.05`; supports `MLA.CW.COM.02`, `MLA.CW.COM.03`.
- Lesson 8: Unit 1 synthesis and assessment; includes Unit 1 standards plus `MLA.CW.WR.03`, `MLA.CW.REV.01`.

### Instructional Quality

PASS

- P01 pages include lesson title, standards, learning targets, work expectations, mastery expectations, student-friendly standard connection, and TOR help.
- P02 pages include notebook title, vocabulary, teaching sequence, task instructions, and adaptive learning path.
- P03 pages include continued teaching, notebook task part 2, and common mistake feedback with correct and incorrect examples.
- P04 pages include worked examples 1, 2, and 3 with step-by-step explanation and common mistake feedback.
- P06 pages include instructions and Part A, Part B, and Part C.
- P07 pages include TOR reminder, submission workflow, checkpoint task, and mastery criteria.

### Visual Shell

PASS

- Unit 1 uses boxed, color-coded LMS-compatible HTML sections.
- Pages use a consistent Creative Writing course header.
- Formatting follows the ALG1-style visual pattern requested for clear instructional blocks.

## Final Decision

PASS after revisions.

Creative Writing Unit 1 is audit ready for structure, standards alignment, visuals, self-paced instructional support, Moodle GIFT readiness, answer-key distribution, and checkpoint/mastery workflow.
