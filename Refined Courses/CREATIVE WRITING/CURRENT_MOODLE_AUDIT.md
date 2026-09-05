# Creative Writing Moodle Backup Audit

**Course:** Creative Writing
**Moodle course ID:** 48
**Audit date:** September 5, 2026
**Status:** Live lesson and orientation content captured; assessment question exports and full archive pending

Commit 8ed00f952 reorganized existing repository content. The subsequent September 5 capture replaces all 288 lesson HTML files in Units with the current rendered Moodle HTML. All four orientation pages are preserved under Live Moodle Source/Orientation. Each lesson has a live-source.json recording the source URL, page IDs, page names, navigation, and capture time. This verifies capture and structure, not instructional-quality approval.

## Completed live content capture

- 48 lessons, 288 HTML pages, and 48 navigation/source records.
- All 48 lessons have the exact six expected page names in order.
- Four orientation pages captured directly from their editor HTML fields.
- All 54 assessment activity question lists and bank references captured under Live Moodle Source/Assessments.
- Bank inventory files are partial and are not complete question/answer exports.
- Existing GIFT/XML assessment files remain legacy copies until current answers and feedback are captured and compared.

## Live gradebook verification

Verified directly in Moodle course 48 on September 5, 2026:

- All six pretests: 0.0%, with weight override enabled.
- Notebook category: 20.0%, with weight override enabled; 48 submissions.
- Checkpoint category: 20.0%, with weight override enabled; 48 submissions.
- Quiz category: 30.0%, with weight override enabled; 42 quizzes.
- Unit Assessment category: 30.0%, with weight override enabled; all six final assessments.

## Outstanding backup work

- Obtain the requested full Moodle archive, currently shown as Process pending.
- Capture and compare the current pretest, quiz, and unit-assessment questions and settings. File presence and successful parsing do not prove content synchronization or alignment.

## Course structure

- Six units
- Eight lessons per unit
- Forty-eight lessons total
- Every lesson contains exactly six pages in this order:
  1. Lesson Overview
  2. Vocabulary and Definitions
  3. Lesson
  4. Worked Example
  5. Independent Work
  6. Checkpoint
- Guided Practice pages and assessment files have been removed.
- Standalone Independent Work and Checkpoint activities have been removed after their content was merged into each main lesson.
- Every lesson page uses Next and Previous navigation as appropriate.

## Assessment structure

- One pretest per unit, weighted at 0%.
- Lessons 1-7 contain lesson quizzes, weighted at 30%.
- Lesson 8 contains the unit assessment instead of a lesson quiz, weighted at 30%.
- Notebook Evidence is weighted at 20%.
- Checkpoint is weighted at 20%.
- Pretests, lesson quizzes, and unit assessments were reviewed against their corresponding lesson and unit topics.

## Required completion checks (not yet certified for this backup)

- Lesson Overview identifies focus, standards/skills, learning goals, workflow, mastery evidence, and support.
- Vocabulary pages define lesson-specific language; unfamiliar contextual terms are defined or assigned for definition.
- Direct Teaching pages provide explicit explanation, models, and visual supports such as tables or diagrams where useful.
- Worked Examples guide students step by step and include at least two substantial examples or three shorter examples.
- Independent Work and Checkpoint pages are self-contained and aligned to the lesson objective.
- Content increases in challenge and independence across the course.
- Course Overview and Expectations reflects the six-page lesson workflow and current grading weights.
- Source manifests contain only `P01.html` through `P06.html`.
- No `P07.html`, Guided Practice file, or Guided Practice reference remains in this backup source.

## Human-audit note

The Moodle course remains the live delivery copy. No full Moodle backup archive has yet been added to this repository. The current lesson HTML and orientation captures are recovery sources for their page content. The repository is not yet a complete verified recovery copy of assessments and course settings.
