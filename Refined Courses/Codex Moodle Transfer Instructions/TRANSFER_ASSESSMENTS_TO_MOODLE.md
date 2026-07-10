# Academy Standard: Transfer Assessments to Moodle

This is the required standard operating procedure for transferring production assessment banks into Moodle.

An agent must read this entire file before importing, uploading, or transferring any assessment file into Moodle. The agent must follow this procedure exactly. Do not improvise, use legacy formats as production files, import uncertain files, or overwrite existing Moodle question banks without approval.

## Trigger Phrases

Use this standard whenever the user says a phrase like:

- "transfer assessments to Moodle"
- "import questions to Moodle"
- "import the question bank"
- "upload the Moodle XML"
- "load the guided practice questions"
- "load the lesson quiz"
- "load the pretest"
- "load the unit assessment"
- "transfer questions from the thumb drive to the question bank"
- "transfer questions from D drive to Moodle"
- "load the questions into the Moodle question bank"

This standard applies to all courses in the repository.

## Required Format

Moodle XML is the only production assessment transfer format.

GIFT is legacy/source material only. Do not import GIFT into Moodle unless the user explicitly overrides the academy standard for a special case.

The agent must never treat a `.gift` file as the production-ready assessment bank.

## Required Reading

Before importing any assessment into Moodle, read:

```text
.codex/agent-prompts/assessment-developer-agent.md
.codex/agent-prompts/assessment-auditor-subagent.md
.codex/agent-prompts/assessment-visual-auditor-subagent.md
.codex/standards/00-course-production-master-protocol.md
.codex/standards/06-assessment-moodle-xml-standard.md
.codex/standards/07-assessment-visual-audit-standard.md
.codex/standards/08-answer-pattern-and-feedback-standard.md
.codex/standards/10-json-metadata-and-file-structure-standard.md
Codex Moodle Transfer Instructions\TRANSFER_ASSESSMENTS_TO_MOODLE.md
```

## Required Outcome

The required outcome is that the correct Moodle question bank category contains the correct production Moodle XML assessment questions for the matching course, unit, lesson, and assessment type.

The repository is the source of truth. Moodle is the destination.

The external assessment staging drive is the transfer source used for Moodle uploads. The current academy staging convention is:

```text
D:\Assessment\<COURSE>\Unit ##\<COURSE>_U##_Pretest_MoodleXML.xml
D:\Assessment\<COURSE>\Unit ##\<COURSE>_U##_L##_GuidedPractice_MoodleXML.xml
D:\Assessment\<COURSE>\Unit ##\<COURSE>_U##_L##_Quiz_MoodleXML.xml
D:\Assessment\<COURSE>\Unit ##\<COURSE>_U##_UnitAssessment_MoodleXML.xml
```

If the user refers to a thumb drive, external drive, or D drive, the agent must treat that as the Moodle upload staging location, not as permission to use an arbitrary file. The file still must match the repository-produced Moodle XML assessment and the Moodle destination category.

## Full Course Moodle Transfer Order

For a full course Moodle build, the required academy sequence is:

1. Transfer the course overview in `Course Orientation & Expectations`.
2. Transfer all production Moodle XML assessments into their matching Moodle question banks.
3. Transfer the unit lesson page content into the Moodle lesson activities.
4. Attach the imported question-bank questions to the actual Moodle assessment activities.
5. Preview and audit the assessment activities.
6. Produce the final transfer and audit report.

The agent must not attach questions to Moodle quiz activities until the matching question-bank import has completed and passed verification. The agent must not report the course as transferred until both lesson pages and assessment activities have been configured and previewed.

The primary agent owns the final course-transfer decision. Assessment transfer subagents may import question banks and attach questions to activities, but they cannot independently declare the course ready for student enrollment.

Assessment transfer work must coordinate with `Codex Moodle Transfer Instructions\TRANSFER_LESSONS_TO_MOODLE.md`. The final enrollment-readiness audit must confirm both:

- Lesson content renders correctly in Moodle.
- Assessment question banks and student-facing assessment activities render correctly in Moodle.

If an assessment transfer agent finds a wrong-unit, wrong-lesson, wrong-bank, wrong-category, wrong-file, random-question count error, broken preview, scrambled answer-choice issue, missing visual, or malformed question, the agent must stop and report it to the primary agent. The affected item must be fixed and previewed again before the course can be reported as transferred.

## Non-Negotiable Safety Rules

- Do not import an assessment file unless the user has approved the import.
- Do not import GIFT as a production assessment.
- Do not import a file when course, unit, lesson, assessment type, or Moodle category is uncertain.
- Do not overwrite, delete, or replace existing Moodle questions unless the user explicitly approves.
- Do not import into a category that does not match the repository course, unit, lesson, and assessment type.
- Do not rename Moodle categories or restructure the question bank unless the user explicitly asks.
- Do not call an assessment transfer complete until Moodle confirms the import and the result is verified.
- Do not transfer assessments before assessment development and audit gates pass.
- If a Moodle question bank shows a duplicate or multiple import, such as Guided Practice showing 10 questions instead of 5, a Lesson Quiz showing 50 questions instead of 25, a Pretest showing 20 questions instead of 10, or a Unit Assessment showing 80 questions instead of 40, do not attach questions from that bank. With explicit user approval or active full-course cleanup authorization, delete all questions from the affected imported category, re-import exactly one clean Moodle XML file, verify the expected count, and only then attach questions to the Moodle assessment activity.

## Required Naming and Path Match

The agent must enforce a strict one-to-one match between repository assessment source and Moodle destination.

Every assessment import must match:

| Level | Repository source must match | Moodle destination must match |
| --- | --- | --- |
| Course | Course folder or approved course abbreviation | Moodle course and question-bank category |
| Unit | `Unit ##` folder or unit assessment folder | Moodle unit category |
| Lesson | `Lesson ##` folder when lesson-level assessment | Moodle lesson category or activity context |
| Assessment type | Guided Practice, Lesson Quiz, Unit Pretest, or Unit Assessment | Matching Moodle question-bank category/import target |
| Format | `.xml` Moodle XML | Moodle XML import format |

If any level does not match, stop and ask the user.

## External Drive Staging Requirement

Before Moodle import, confirm the XML files are staged in the academy external-drive folder sequence.

Required staging path:

```text
D:\Assessment\<COURSE>\Unit ##
```

Examples:

```text
D:\Assessment\ALG1\Unit 01\ALG1_U01_Pretest_MoodleXML.xml
D:\Assessment\ALG1\Unit 01\ALG1_U01_L01_GuidedPractice_MoodleXML.xml
D:\Assessment\ALG1\Unit 01\ALG1_U01_L01_Quiz_MoodleXML.xml
D:\Assessment\ALG1\Unit 01\ALG1_U01_UnitAssessment_MoodleXML.xml
```

If the course folder does not exist on the staging drive, create it only when the user has authorized assessment staging work. If a unit folder does not exist, create the exact `Unit ##` folder only when the user has authorized staging work.

Do not rename files casually. File names must follow the course/unit/lesson/type sequence exactly. If a file name does not match the Moodle question-bank target, stop and correct the staging issue before importing.

Required file-name pattern:

| Assessment type | Required staged filename pattern |
| --- | --- |
| Unit Pretest | `<COURSE>_U##_Pretest_MoodleXML.xml` |
| Guided Practice | `<COURSE>_U##_L##_GuidedPractice_MoodleXML.xml` |
| Lesson Quiz | `<COURSE>_U##_L##_Quiz_MoodleXML.xml` |
| Unit Assessment | `<COURSE>_U##_UnitAssessment_MoodleXML.xml` |

The agent must not import from Downloads, Desktop, Recent Files, a browser temporary folder, or an unknown location. Import only from the approved staging path unless the user explicitly approves a different exact file path.

## Moodle Question-Bank Naming Requirement

Moodle question banks must already exist unless the user explicitly asks the agent to create them.

Use the existing Moodle question-bank naming sequence and match it to the staged XML file.

Standard short Moodle question-bank names:

| Moodle bank name pattern | Assessment type | Required file match |
| --- | --- | --- |
| `U# PRETEST` | Unit Pretest | `<COURSE>_U##_Pretest_MoodleXML.xml` |
| `U#L# GP` | Guided Practice | `<COURSE>_U##_L##_GuidedPractice_MoodleXML.xml` |
| `U#L# Q` | Lesson Quiz | `<COURSE>_U##_L##_Quiz_MoodleXML.xml` |
| `U#L# UA` | Unit Assessment | `<COURSE>_U##_UnitAssessment_MoodleXML.xml` |

For unit assessment banks, the Moodle shell may attach the unit assessment to the final lesson number in the unit, such as `U1L8 UA` for a 1.0-credit course or `U1L5 UA` for a 0.5-credit course. In that case, the staged file is still the unit-level file, such as `ALG1_U01_UnitAssessment_MoodleXML.xml`. Confirm that the unit number matches before import.

The Moodle import category must match the bank being imported. Examples:

```text
U1L1 GP question bank -> Default for U1L1 GP -> ALG1_U01_L01_GuidedPractice_MoodleXML.xml
U1L1 Q question bank -> Default for U1L1 Q -> ALG1_U01_L01_Quiz_MoodleXML.xml
U1 PRETEST question bank -> Default for U1 PRETEST -> ALG1_U01_Pretest_MoodleXML.xml
U1L8 UA question bank -> Default for U1L8 UA -> ALG1_U01_UnitAssessment_MoodleXML.xml
U1L5 UA question bank for a 0.5-credit course -> Default for U1L5 UA -> COURSE_U01_UnitAssessment_MoodleXML.xml
```

If the visible Moodle bank, selected Moodle category, and XML filename do not all point to the same course/unit/lesson/type, stop. Do not import.

## Assessment Types

Standard production assessment types:

| Assessment type | Expected production format | Scope |
| --- | --- | --- |
| Guided Practice | Moodle XML | Specific lesson only |
| Lesson Quiz Bank | Moodle XML | Specific lesson only |
| Unit Pretest | Moodle XML | Assigned unit only |
| Unit Assessment Bank | Moodle XML | Assigned unit only |

Default required counts unless the course standard says otherwise:

| Assessment type | Required question count |
| --- | ---: |
| Guided Practice | 5 |
| Lesson Quiz Bank | 25 |
| Unit Pretest | 10 |
| Unit Assessment Bank | 40 |

Credit-based assessment structure is mandatory:

- 1.0-credit courses use Lesson 8 as the synthesis/unit-assessment lesson. Lesson 8 has Guided Practice and Unit Assessment, but no Lesson 8 quiz bank unless the approved mapping explicitly requires one.
- 0.5-credit courses use Lesson 5 as the synthesis/unit-assessment lesson. Lesson 5 has Guided Practice and Unit Assessment, but no Lesson 5 quiz bank.

Course-specific assessment exceptions are allowed only when they are documented in the approved mapping, assessment certification report, or master course audit. The agent must verify and log the evidence before importing or attaching questions. If the evidence is missing, stop and route the issue back to assessment correction before Moodle import.

## Mandatory Pre-Import Gate

Before importing any assessment file, confirm:

- Moodle XML file exists.
- XML is valid Moodle XML.
- File is in the correct repository course/unit/lesson location.
- File name clearly identifies course, unit, lesson when applicable, and assessment type.
- Assessment developer gate is PASS for the file.
- Assessment alignment audit is PASS for the file.
- Assessment visual/XML audit is PASS for the file.
- Answer-pattern and feedback audit is PASS for the file.
- Metadata points to Moodle XML, not GIFT.
- Current file was inspected directly.

If any gate is missing, unsupported, incomplete, or FAIL, stop. Do not import.

## Required User Approval Before Import

Before clicking any Moodle import/upload/continue button, tell the user:

```text
Course:
Unit:
Lesson, if applicable:
Assessment type:
Repository XML file:
Moodle course:
Moodle question-bank category/import target:
Import action requested:
Risk:
```

Wait for user approval before importing unless the user has already explicitly approved that exact file and target.

For full-course assessment transfers, if the user has authorized the agent to stage/copy the repository-produced Moodle XML files into the academy D-drive staging path, that authorization also permits the agent to import those staged XML files into the matching Moodle question banks without stopping for approval on each individual file. This applies only when every file is staged under the approved path:

```text
D:\Assessment\<COURSE>\Unit ##
```

The agent must still perform the full course/unit/lesson/type match before each import. Stop immediately and ask the user if any Moodle course, Moodle bank, selected category, staged filename, repository source, unit number, lesson number, assessment type, or expected question count does not match.

## Moodle Import Procedure

For each approved assessment file:

1. Open the correct Moodle course.
2. Open the correct question bank or import page.
3. Confirm the Moodle course and category match the repository file.
4. Select Moodle XML as the import format.
5. Choose the exact approved `.xml` file.
6. Confirm the selected filename matches the intended file.
7. Confirm the import target/category is correct.
8. Confirm user approval is present through either exact-file approval or the full-course D-drive staging approval rule.
9. Import the file.
10. Review Moodle import results.
11. Confirm question count and category placement.
12. Inspect representative questions, including any visual/stimulus items.
13. Log the import.

## Detailed Moodle Question-Bank Import Procedure

Use this exact sequence for importing a staged Moodle XML file into an existing Moodle question bank.

### 1. Open the Correct Course and Question Bank

1. Open the correct Moodle course.
2. Confirm the course title and course shell match the requested course.
3. Open `More`.
4. Open `Question banks`.
5. Locate the existing question-bank activity by its short name, such as `U1L1 GP`.
6. Confirm the visible bank name matches the intended unit, lesson, and assessment type.
7. Open that question bank.
8. Confirm the page heading or course context shows the correct bank, such as `U1L1 GP QUESTION BANK`.

Do not proceed from the course list alone. Open the bank and verify the bank context.

### 2. Open Import

1. In the question bank, choose `Import`.
2. Wait for the import page to finish loading.
3. Confirm the selected category is the default category for the correct bank, such as `Default for U1L1 GP`.
4. Confirm the URL or page context still belongs to the correct question bank.

If the category defaults to a different bank, stop.

### 3. Select Moodle XML Format

1. Under `File format`, select `Moodle XML format`.
2. Verify `Moodle XML format` is checked.
3. Confirm no GIFT, Aiken, Blackboard, Cloze, or Missing Word format is selected.

Never import GIFT as the production assessment format.

### 4. Choose the Staged XML File

1. Click `Choose a file...`.
2. In the Moodle file picker, choose `Upload a file`.
3. Use the file chooser to navigate to the approved staging path:

```text
D:\Assessment\<COURSE>\Unit ##
```

4. Select the exact Moodle XML file for the bank.
5. Confirm the selected filename matches the target bank before clicking `Upload this file`.
6. Click `Upload this file`.
7. Wait for Moodle to return to the import form or show the selected file.

Important MoodleCloud behavior:

- MoodleCloud can time out or fail when actions are done too quickly.
- Do one bank at a time.
- Wait for each page, modal, upload, import-result page, and continue action to complete before moving to the next bank.
- If Moodle freezes, times out, or shows an in-page `Reload`, `Refresh`, `Try again`, or similar recovery button, click that Moodle-provided recovery button first before asking the user to reload the browser.
- After clicking a Moodle recovery button, wait for the page to fully reload, then verify the current course, question bank, category, and expected assessment context before continuing.
- If the Moodle recovery button does not respond after one careful attempt, use the browser refresh/reload once, wait for the page to fully load, and re-confirm context before continuing.
- If the browser appears stuck on the current Moodle URL, click/focus the browser address bar URL and press `Enter` or otherwise request navigation to the same URL.
- If the browser shows a dialog asking whether to `Wait` or `Exit page`/leave the page, choose `Exit page`/leave. This abandons the frozen Moodle request.
- After choosing `Exit page`/leave, Moodle may show a second Moodle recovery screen/dialog with a `Load`, `Reload`, `Refresh`, or `Try again` button. Click `Load` when it appears.
- After clicking `Load`, wait for the page to refresh completely. Do not continue while Moodle is still loading.
- Re-confirm course, activity/question bank, category, and assessment context before continuing.
- This URL-click -> leave/exit-page -> Moodle reload-button flow is an approved MoodleCloud freeze recovery process and should be attempted before asking the user to manually reload, unless the browser prompt involves unsaved work that the agent has not already verified.
- Never continue an import, question attachment, or cleanup action after a timeout/freeze until the page context is certain again.
- MoodleCloud may stall after `Upload this file`. The file picker, loading box, or thinking box may remain open, and the import form may still look empty even though Moodle has already received the XML file.
- Required recovery rule: if the file picker, loading box, or thinking box remains open after upload, wait a few seconds, close that stalled dialog/box, and return to the import form.
- After the stalled dialog/box is closed, click `Import` once even if the visible file area still appears empty or does not show the filename.
- Do not reselect or re-upload the same file before trying this close-dialog-then-import recovery step.
- If Moodle proceeds to `Parsing questions from import file`, an import-result page, or a `Continue` page, the file attached successfully even if Moodle never visibly displayed the filename first.
- If Moodle returns to the import form with a required-file validation message, then the file did not attach. Only then reopen `Choose a file...` and repeat the file selection.
- After any stalled-picker recovery, verify the question bank itself before retrying the upload. Open the bank and confirm whether the expected questions loaded; do not create duplicate imports because the file box looked empty.

### 5. Final Pre-Import Match Check

Before clicking `Import`, confirm all of the following:

```text
Moodle course:
Moodle question bank:
Selected Moodle category:
Assessment type:
Expected staged file:
Chosen file:
File format:
Expected question count:
```

Required exact checks:

- Moodle category is the default category for the target bank.
- File format is `Moodle XML format`.
- File extension is `.xml`.
- Filename includes the correct course abbreviation.
- Filename includes the correct unit number.
- Filename includes the correct lesson number for guided practice and lesson quiz.
- Filename uses the correct assessment type label: `Pretest`, `GuidedPractice`, `Quiz`, or `UnitAssessment`.

If any item is uncertain, stop.

### 6. Import and Continue

1. Click `Import`.
2. Wait for Moodle to load the import result page.
3. Confirm Moodle says it is parsing/importing questions from the import file.
4. Confirm Moodle lists the expected number of questions.
5. Confirm question IDs match the expected course, unit, lesson, and assessment type when visible.
6. Click `Continue`.
7. Wait for Moodle to return to the question bank.

Do not close the tab or move to another bank before clicking `Continue`.

### 7. Verify the Question Bank

After `Continue`, verify the question bank category shows the imported questions.

Examples of acceptable verification signals:

```text
Selected items: ALG1_U01_L01_GuidedPractice (5)
Imported 5 questions from file
Question IDs visible: ALG1_U01_L01_GP_Q01 through ALG1_U01_L01_GP_Q05
```

At minimum, verify:

- The Moodle page is the correct question bank.
- The selected category matches the imported assessment.
- The imported question count matches the expected count.
- The imported question IDs, category label, or visible question list matches the staged XML file.

If verification shows more than the expected question count, treat it as a duplicate-import error. Do not work around it by selecting one copy of each question or by adding random questions from an oversized bank. Follow this cleanup sequence:

1. Confirm the Moodle course, bank, imported category, unit, lesson, assessment type, and expected count.
2. Record the discrepancy in the transfer log.
3. If the user has not already authorized cleanup for duplicate imports, stop and ask for approval before deleting anything.
4. Open the affected imported category in the Moodle question bank.
5. Select all questions in that affected category.
6. Delete the selected questions and confirm deletion.
7. Verify the affected category is empty.
8. Import the matching staged Moodle XML file one time only.
9. Click `Continue` and return to the bank.
10. Verify the imported category now shows exactly the expected count: Pretest 10, Guided Practice 5, Lesson Quiz 25, Unit Assessment 40 unless the course-specific audit states a different approved count.
11. Attach questions to the Moodle assessment activity only after the clean count is verified.

If the Moodle file picker stalls or the file area appears empty during the cleanup re-import, use the stalled-picker recovery rule above. If Moodle returns to the import form with a required-file validation message after retrying, stop and report that Chrome file upload access must be fixed before continuing.

### 8. Move to the Next Bank Only After Verification

After a bank is verified:

1. Record the import in the assessment import log.
2. Return to `Question banks`.
3. Select the next bank in sequence.
4. Repeat the process from the beginning.

Do not batch-click multiple imports. Do not open multiple question-bank imports at the same time in the same Moodle course.

## Standard Import Sequence for a Full Unit

For each unit, use this sequence unless the course mapping says otherwise:

1. Unit Pretest.
2. Lesson 1 Guided Practice.
3. Lesson 1 Quiz.
4. Lesson 2 Guided Practice.
5. Lesson 2 Quiz.
6. Continue lesson by lesson through the final lesson in the unit.
7. Unit Assessment.

For Moodle shells that name unit assessment by final lesson, such as `U1L8 UA` for a 1.0-credit course or `U1L5 UA` for a 0.5-credit course, import the unit assessment XML into that final unit-assessment bank.

Example for Unit 1 in a 1.0-credit course with eight lessons:

```text
U1 PRETEST -> ALG1_U01_Pretest_MoodleXML.xml
U1L1 GP -> ALG1_U01_L01_GuidedPractice_MoodleXML.xml
U1L1 Q -> ALG1_U01_L01_Quiz_MoodleXML.xml
...
U1L7 GP -> ALG1_U01_L07_GuidedPractice_MoodleXML.xml
U1L7 Q -> ALG1_U01_L07_Quiz_MoodleXML.xml
U1L8 GP -> ALG1_U01_L08_GuidedPractice_MoodleXML.xml
U1L8 UA -> ALG1_U01_UnitAssessment_MoodleXML.xml
```

Example for Unit 1 in a 0.5-credit course with five lessons:

```text
U1 PRETEST -> COURSE_U01_Pretest_MoodleXML.xml
U1L1 GP -> COURSE_U01_L01_GuidedPractice_MoodleXML.xml
U1L1 Q -> COURSE_U01_L01_Quiz_MoodleXML.xml
...
U1L4 GP -> COURSE_U01_L04_GuidedPractice_MoodleXML.xml
U1L4 Q -> COURSE_U01_L04_Quiz_MoodleXML.xml
U1L5 GP -> COURSE_U01_L05_GuidedPractice_MoodleXML.xml
U1L5 UA -> COURSE_U01_UnitAssessment_MoodleXML.xml
```

Do not import or attach a Lesson 5 quiz for a 0.5-credit course.

## Proven ALG1 U1L1 GP Example

This example records the validated academy process from the ALG1 shell.

```text
Moodle course: ALG1
Moodle question bank: U1L1 GP
Moodle import category: Default for U1L1 GP
Staged XML file: D:\Assessment\ALG1\Unit 01\ALG1_U01_L01_GuidedPractice_MoodleXML.xml
Import format: Moodle XML format
Moodle result: Importing 5 questions from file
Post-continue category: ALG1_U01_L01_GuidedPractice (5)
Question IDs parsed: ALG1_U01_L01_GP_Q01 through ALG1_U01_L01_GP_Q05
```

This example is not permission to assume ALG1 for another course. It is the model for matching course, unit, lesson, assessment type, Moodle bank, category, staged file, and result count.

## Final Assessment Activity Transfer

After all question banks have been imported and verified, the agent must attach the correct questions to the Moodle assessment activities in the course shell. This step happens after lesson page content transfer.

Question-bank import and assessment-activity transfer are separate phases:

```text
Phase 1: Import Moodle XML into Moodle question banks.
Phase 2: Add the imported bank questions to the actual Moodle quiz or assessment activity.
```

Do not skip Phase 2. A Moodle question bank containing questions does not automatically mean the student-facing quiz, guided practice, pretest, or unit assessment has questions attached.

### Required Activity Attachment Rules

Use these rules for the standard mastery-based course shell:

| Activity type | Moodle action | Question source | Quantity rule |
| --- | --- | --- | --- |
| Unit Pretest | Add questions from question bank | Matching unit pretest bank | Add all selected questions |
| Guided Practice | Add questions from question bank | Matching lesson guided-practice bank | Add all selected questions |
| Lesson Quiz | Add random question | Matching lesson quiz bank | Add 5 random questions |
| Unit Assessment | Add random question | Matching unit assessment bank | Add 10 random questions |

The pretest and guided practice use fixed questions from the question bank. The lesson quiz and unit assessment use random questions from the matching bank.

### Moodle Question Picker Rules

The Moodle question picker has two separate selections that must both be correct:

1. The current question bank must be the matching course question bank, not the quiz activity's empty local bank.
2. The selected category must be the imported production category, not the default category.

When selecting the category, use Moodle's visible `Type or select...` autocomplete control and choose the imported category chip, such as `ALG1_U01_L01_GuidedPractice (5)`, `ALG1_U01_L01_Quiz (20)`, or `ALG1_U01_UnitAssessment (40)`.

Do not rely only on Moodle's hidden category select control or backend option value. Moodle may leave the visible selected item on the default category, which can make the picker return zero questions even when the imported question bank contains the correct questions.

For `Add a random question`, Moodle has two relevant category controls:

1. The filter category used to display or confirm the imported questions.
2. The random-question source category, sometimes shown as the parent/source category for the random slot.

Both category controls must point to the same imported production category before adding random questions. If only the filter category is changed and the source category remains on `Default for ...`, Moodle may return to the quiz with `Questions: 0` or add random slots from the wrong source. For lesson quizzes, confirm the random slots say they draw from the imported lesson quiz category, such as `STAT_U01_L01_Quiz and subcategories`, and from the correct short bank, such as `U1L1 Q`.

After choosing the imported category chip:

1. Confirm the visible selected item/chip shows the imported category name and count.
2. Click `Apply filters`.
3. Confirm the question list or random-question source reflects the imported category before adding questions.

If the picker shows duplicate recent-bank labels, inspect whether the duplicates point to the same Moodle question-bank id. Duplicate recent labels that point to the same bank id are not duplicate imports by themselves. If duplicate labels point to different bank ids or the category choices do not match the expected course/unit/lesson/assessment naming, stop and report the mismatch before adding questions.

For pretests, Moodle may display `Current bank: U# PRETEST` while the picker is still using the quiz activity's empty local bank. If the imported category, such as `STAT_U02_Pretest (10)`, does not appear, click `Switch bank` even if the current-bank label looks correct. In the switcher, select the course-level `U# PRETEST` entry, not the first/local quiz-bank entry. After selecting the course-level entry, wait for the category selector to repopulate and confirm the imported category appears before adding questions.

If the picker briefly returns zero questions after a bank or category change:

1. Wait for Moodle to finish rendering.
2. Re-check the visible selected category chip.
3. Re-apply filters if needed.
4. Verify the quiz setup page still shows `Questions: 0` before retrying.

If `Add a random question` appears to return to the quiz setup page with `Questions: 0`, do not immediately submit again. MoodleCloud may show stale quiz setup text during the transition. Reload or reopen the same quiz edit page once, wait for it to finish loading, and verify the actual count. Only retry the random-question add if the reloaded quiz setup page still shows `Questions: 0`.

Never add a second set of questions unless the quiz setup page confirms the activity is still empty or the existing count is incorrect and the user has approved the correction.

### Unit Pretest Activity Procedure

Use this procedure for a unit pretest activity.

1. Open the correct Moodle course shell.
2. Open the correct unit pretest activity, such as `U1 Pretest`.
3. Open the quiz question editing page.
4. Choose `Add questions from question bank`.
5. Switch the question bank to the matching pretest bank, such as `U1 PRETEST`.
6. In the visible `Type or select...` category autocomplete, choose the imported category containing the questions, such as `ALG1_U01_Pretest (10)`.
7. Confirm there is only one matching imported question set for that pretest.
8. Click `Apply filters`.
9. Confirm the filtered list shows the expected pretest questions.
10. Select all filtered questions.
11. Click `Add selected questions to the quiz`.
12. Wait for Moodle to finish loading.
13. Open the quiz.
14. Click `Preview`.
15. Verify the pretest displays correctly and contains the expected questions.

If more than one imported category or question set appears for the same pretest, stop and report the duplicate before adding questions.

### Guided Practice Activity Procedure

Use this procedure for each guided practice activity.

1. Open the correct Moodle course shell.
2. Open the correct guided practice activity, such as `U1L1 GP`.
3. Open the quiz question editing page.
4. Choose `Add questions from question bank`.
5. Switch the question bank to the matching guided-practice bank, such as `U1L1 GP`.
6. In the visible `Type or select...` category autocomplete, choose the imported category containing the questions, such as `ALG1_U01_L01_GuidedPractice (5)`.
7. Confirm there is only one matching imported question set for that guided practice.
8. Click `Apply filters`.
9. Confirm the filtered list shows the expected guided-practice questions.
10. Select all filtered questions.
11. Click `Add selected questions to the quiz`.
12. Wait for Moodle to finish loading.
13. Open the guided practice quiz/activity.
14. Click `Preview`.
15. Verify the guided practice displays correctly and contains the expected questions.

Guided practice must use all imported guided-practice questions. Do not add random questions for guided practice unless the user explicitly changes the academy rule.

### Lesson Quiz Activity Procedure

Use this procedure for each lesson quiz activity.

1. Open the correct Moodle course shell.
2. Open the correct lesson quiz activity, such as `U1L1 Q`.
3. Open the quiz question editing page.
4. Choose `Add a random question`.
5. If Moodle shows `Current bank` as the quiz activity's local bank, click `Switch bank` and choose the matching course question bank, such as `U1L1 Q`.
6. Confirm the selected question bank is the matching lesson quiz bank, such as `U1L1 Q`.
7. In the visible `Type or select...` category autocomplete or category selector, choose the imported category containing the quiz bank questions, such as `ALG1_U01_L01_Quiz (20)` or the exact count shown by the imported course category.
8. Set the random-question source category or parent category to the same imported category. Do not leave this source category on `Default for U#L# Q`.
9. Confirm there is only one matching imported question set for that lesson quiz.
10. Apply the filter or selection so Moodle loads or confirms the questions from that category.
11. Set the number of random questions to `5`.
12. Add the random questions to the quiz.
13. Confirm Moodle reports that random questions were added.
14. Verify the quiz setup page shows exactly `Questions: 5` and `Total of marks: 5.00`.
15. Verify each random slot says it draws from the imported lesson quiz category and the matching short bank.
16. Wait for Moodle to finish loading.
17. Open the quiz.
18. Click `Preview`.
19. Verify the quiz displays correctly and is drawing from the correct lesson quiz bank.

Lesson quizzes must use 5 random questions from the matching lesson quiz bank. Do not select all fixed questions for a lesson quiz unless the user explicitly changes the academy rule.

### Unit Assessment Activity Procedure

Use this procedure for each unit assessment activity.

1. Open the correct Moodle course shell.
2. Open the correct unit assessment activity, such as `U1L8 UA` for a 1.0-credit course or `U1L5 UA` for a 0.5-credit course when the unit assessment is attached to the final lesson shell.
3. Open the quiz question editing page.
4. Choose `Add a random question`.
5. Confirm the selected question bank is the matching unit assessment bank, such as `U1L8 UA` for Unit 1 in a 1.0-credit course or `U1L5 UA` for Unit 1 in a 0.5-credit course.
6. In the visible `Type or select...` category autocomplete, choose the imported category containing the unit assessment questions, such as `ALG1_U01_UnitAssessment (40)`.
7. Confirm there is only one matching imported question set for that unit assessment.
8. Apply the filter or selection so Moodle loads the questions from that category.
9. Set the number of random questions to `10`.
10. Add the random questions to the unit assessment.
11. Wait for Moodle to finish loading.
12. Open the unit assessment.
13. Click `Preview`.
14. Verify the unit assessment displays correctly and is drawing from the correct unit assessment bank.

Unit assessments must use 10 random questions from the matching unit assessment bank. Do not select all fixed questions for a unit assessment unless the user explicitly changes the academy rule.

### Assessment Activity Preview Requirements

After attaching questions to an activity, preview it before moving to the next assessment activity.

Verify:

- The preview opens without an error.
- The activity title matches the intended unit, lesson, and assessment type.
- The displayed questions belong to the correct bank.
- Answer choices display in the intended order and are not scrambled when the activity requires fixed ordering.
- Visuals, tables, graphs, passages, formulas, and feedback render correctly.
- No broken HTML, raw XML, file names, or backend artifacts appear to students.
- For random-question activities, Moodle shows the correct number of random question slots.

If preview fails or shows mismatched questions, stop and correct the activity before moving on.

### Assessment Activity Attachment Log

Every activity attachment must be logged after preview.

Recommended table:

```markdown
| Date | Moodle course | Activity | Activity type | Source question bank | Selected imported category | Add method | Question quantity | Preview status | Notes |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
```

Required `Add method` values:

```text
All selected questions
Random questions
```

Required `Preview status` values:

```text
PASS
PASS WITH USER-APPROVED EXCEPTION
BLOCKED
```

Do not mark the assessment activity transfer complete until the activity has been previewed and logged.

## Verification Requirements

After import, verify:

- Moodle reports a successful import.
- Imported question count matches expected count.
- Imported questions are in the correct course/category.
- Questions retain embedded visuals, tables, graphs, passages, or stimuli.
- Feedback imported.
- No obvious malformed HTML appears in question text.
- No backend filenames are visible to students.
- The file imported was the approved Moodle XML file.
- The selected Moodle category after import matches the imported file.
- The imported count matches the academy count or approved course-specific count.
- The question IDs, if visible, use the correct course/unit/lesson/type naming sequence.

If Moodle reports skipped questions, errors, warnings, malformed XML, missing media, or category mismatch, stop and report the issue.

## Logging Requirement

Every assessment import must be logged.

Use the course's existing Moodle assessment import log if one exists. If no log exists, create one in the course's audit or documentation folder.

Recommended log path:

```text
C:\Users\acrue\MLA2026-1\Refined Courses\<Course Name>\Course Audit\<COURSE>_MOODLE_ASSESSMENT_IMPORT_LOG.md
```

Required table format:

```markdown
| Date | Moodle course | Unit/Lesson | Assessment type | Moodle category/target | Repository XML file | Expected questions | Imported questions | Status | Verification notes |
| --- | --- | --- | --- | --- | --- | ---: | ---: | --- | --- |
```

Required verification notes must include:

- Moodle question-bank short name.
- Moodle selected category after `Continue`.
- Exact staged file path.
- Whether Moodle XML was selected.
- Moodle import result count.
- Any warnings, skipped questions, missing media, or mismatch.
- Final status: `PASS`, `PASS WITH USER-APPROVED EXCEPTION`, or `BLOCKED`.

## Stop Conditions

Stop immediately before import if:

- The user has not approved the import.
- The file is not Moodle XML.
- The file is GIFT.
- The XML file is missing or invalid.
- The Moodle course or category does not match.
- The assessment developer gate has not passed.
- The assessment audit gate has not passed.
- Required visuals or stimuli are missing.
- Feedback or answer-pattern audits are missing or failed.
- Moodle shows a warning about overwrite, replacement, deletion, or category mismatch.

When stopped, report the file, Moodle target, reason for stopping, and the decision needed from the user.
