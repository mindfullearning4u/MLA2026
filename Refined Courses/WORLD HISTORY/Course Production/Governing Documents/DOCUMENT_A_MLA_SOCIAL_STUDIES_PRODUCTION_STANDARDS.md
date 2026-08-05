MLA Social Studies Production Standards

Version: 1.0
Applies to: World History and future MLA Social Studies courses
Purpose: This document tells Codex exactly how to construct every MLA Social Studies lesson page, submission activity, and assessment. Course-specific content is controlled by the approved course crosswalk.


## 1. Governing Rule

Codex must use two sources when producing a course:

MLA Social Studies Production Standards
Controls how every page and activity is designed.

Approved course crosswalk
Controls what content, standards, vocabulary, evidence, maps, visuals, investigations, and assessments belong in each lesson.

The production standards control format and instructional structure.

The course crosswalk controls academic content.

Codex must not invent, remove, combine, or relocate required content unless the crosswalk explicitly authorizes it.


## 2. Required Lesson Structure

Lessons 1–7 contain seven connected instructional pages:

| Page | Official Page Name | Single Instructional Job |
| --- | --- | --- |
| P01 | Lesson Overview | Orient the student |
| P02 | Learn the Historical Content | Teach the content |
| P03 | Historical Evidence Lab | Analyze evidence |
| P04 | Historical Thinking | Teach and practice historical reasoning |
| P05 | Guided Investigation | Investigate with structured support |
| P06 | Independent Investigation | Investigate independently |
| P07 | Mastery Checkpoint | Explain how mastery will be demonstrated |

After the seven-page lesson, Moodle contains:

Historian’s Notebook Submission

Mastery Checkpoint Submission

Lesson Quiz

Lesson 8 is the unit synthesis lesson and ends with the Unit Assessment instead of a regular Lesson Quiz.


## 3. Nonnegotiable Page Separation

Every page must perform one instructional job.

Codex must not blend the purposes of multiple pages.

| Page | Governing Question |
| --- | --- |
| P01 | What am I learning and why? |
| P02 | What historical knowledge do I need? |
| P03 | What evidence do historians have? |
| P04 | How should I reason with that evidence? |
| P05 | Can I investigate with support? |
| P06 | Can I investigate independently? |
| P07 | How will I demonstrate mastery? |

No page may duplicate large sections from another page.

No generic paragraphs may be copied across lessons merely by replacing the lesson title.


## 4. Standard HTML Shell

Every page must use a complete, self-contained HTML block suitable for direct placement in Moodle.

Use this general structure:

<div class="mla-ss-lesson">


<style>

/* Complete page-specific MLA CSS */

</style>


<header class="mla-ss-banner">

<!-- Course, unit, lesson, page, and title -->

</header>


<main>

<!-- Page-specific instructional sections -->

</main>


<footer class="mla-tor-support">

<!-- Required Teacher of Record support -->

</footer>


</div>

Do not include:

<!DOCTYPE html>

<html>

<head>

<body>

Moodle does not require a complete external webpage document.

All CSS class names must begin with:

mla-ss-

or another sufficiently specific MLA prefix.

Avoid generic class names such as:

.box

.title

.content

.note

Generic CSS names may conflict with Moodle themes.


## 5. Standard Page Width and Typography

Use these default standards:

.mla-ss-lesson {

max-width: 1000px;

margin: 0 auto;

padding: 24px;

background: #ffffff;

color: #24323d;

font-family: Arial, Helvetica, sans-serif;

font-size: 16px;

line-height: 1.65;

}

Required typography:

| Element | Standard |
| --- | --- |
| Main page title | 28–32 px |
| Section heading | 21–23 px |
| Subheading | 18–20 px |
| Body text | 16 px |
| Captions | 14–15 px |
| Minimum line height | 1.55 |
| Text alignment | Left aligned |
| Maximum reading width | Approximately 1000 px |

Do not:

Use script fonts.

Use decorative fonts.

Use body text smaller than 16 px.

Center long paragraphs.

Use all capital letters for full headings.

create large, uninterrupted walls of text.


## 6. MLA Social Studies Color Palette

Use this palette consistently.

| Purpose | Color |
| --- | --- |
| Primary dark teal | #244f5f |
| Primary medium teal | #376f80 |
| Light teal background | #e8f2f5 |
| Pale evidence background | #f2f9fb |
| Dark body text | #24323d |
| Secondary text | #465a69 |
| Border gray-blue | #cbd7df |
| Success green | #3f7d62 |
| Success background | #edf8f2 |
| Caution gold | #a87922 |
| Caution background | #fffaf0 |
| Error red | #a33a3a |
| Error background | #fff4f4 |
| Neutral background | #f4f7f9 |

Color must support meaning.

Examples:

Teal: standard instruction and navigation

Green: mastery tips, correct reasoning, or significance

Gold: caution, common mistake, or important requirement

Red: incorrect reasoning or prohibited action

Gray: neutral support or transition information

Do not use color as the only way to communicate meaning.


## 7. Standard Lesson Banner

Every page must begin with a consistent banner.

Required information:

Course name

Unit number

Lesson number

Page number

Official lesson title

Official page name

Example:

<header class="mla-ss-banner">

<p class="mla-ss-eyebrow">

World History | Unit 1 | Lesson 1 | Page 3

</p>


<h1>Historical Inquiry, Timelines, and Cause and Effect</h1>


<p class="mla-ss-page-name">Historical Evidence Lab</p>

</header>

Required banner styling:

.mla-ss-banner {

background: linear-gradient(135deg, #244f5f 0%, #376f80 100%);

color: #ffffff;

padding: 26px 28px;

border-radius: 10px;

margin-bottom: 22px;

box-shadow: 0 3px 10px rgba(31, 41, 51, 0.14);

}

The page title must remain readable on mobile devices.


## 8. Standard Content Box

Use a consistent bordered section for major content blocks.

.mla-ss-section {

border: 1px solid #cbd7df;

border-radius: 9px;

margin: 20px 0;

overflow: hidden;

background: #ffffff;

box-shadow: 0 2px 7px rgba(31, 41, 51, 0.07);

}


.mla-ss-section-title {

margin: 0;

padding: 14px 18px;

background: #e8f2f5;

border-left: 6px solid #376f80;

color: #243f4b;

font-size: 22px;

}


.mla-ss-section-body {

padding: 18px 21px 21px;

}

Use boxes to separate meaningful instructional stages.

Do not put every paragraph in its own box.


## 9. Required Teacher of Record Support Box

Every page must end with a Teacher of Record support box.

Required placement:

At the bottom of the page

After the page transition

Before the closing outer div

Standard language:

<footer class="mla-ss-tor-support">

<strong>Need help?</strong>

Review the directions, examples, evidence, and completed notebook work on this

page. If you are still unsure, contact your Teacher of Record for clarification

before continuing.

</footer>

Standard style:

.mla-ss-tor-support {

border: 1px solid #b8c2cc;

border-left: 6px solid #6b7280;

background: #f4f7f9;

padding: 14px 16px;

border-radius: 7px;

margin-top: 22px;

}

The message may be adjusted slightly to fit the page.

Examples:

P01:

Contact your Teacher of Record if you need clarification about the lesson requirements.

P03:

Contact your Teacher of Record if you need help interpreting a source, map, timeline, or data display.

P06:

Ask for clarification before submitting if you do not understand the Independent Investigation directions.

P07:

Contact your Teacher of Record before submitting if you are unsure about the checkpoint requirements.

The TOR box must not introduce new content.


## 10. Required Page Transition

Every page must end with a short transition identifying what comes next.

Example:

<div class="mla-ss-next-step">

<strong>Next:</strong> Continue to Page 3, Historical Evidence Lab, to examine

the sources historians use to investigate this question.

</div>

Style:

.mla-ss-next-step {

background: #f4f7f9;

border: 1px solid #cbd5df;

border-radius: 8px;

padding: 16px 18px;

margin-top: 22px;

}

The transition must be lesson-specific.

Do not use a generic statement such as:

Continue to the next page.


## 11. P01 — Lesson Overview

11.1 Purpose

P01 orients the student.

It does not teach the lesson in depth.

It must be concise, inviting, and clear.

11.2 Required Sections

P01 must include these sections in this order:

Lesson banner

Investigation Question

Quick Lesson Overview

Why This Lesson Matters

Learning Objectives

MLA Standards Connection

Lesson Path

What You Must Complete

Transition to P02

TOR support box

11.3 Investigation Question

Place the question near the top in a prominent box.

<section class="mla-ss-investigation-question">

<p class="mla-ss-question-label">Investigation Question</p>

<p class="mla-ss-question-text">

How do historians know what happened in the past?

</p>

</section>

The question must:

Be approved in the course crosswalk.

Drive P02–P07.

Require evidence and reasoning.

Be answerable using lesson content.

Appear again in P05, P06, and P07.

11.4 Quick Lesson Overview

Use approximately two short paragraphs.

Explain:

The central topic

What students will investigate

The broad historical context

Do not include:

Full vocabulary definitions

Long historical explanations

Source analysis

Practice tasks

11.5 Why This Lesson Matters

Use a green purpose box.

Explain:

Why the topic matters historically

How it connects to the unit

How the skill will be used later

11.6 Learning Objectives

Use three to six measurable objectives.

Every objective must begin with an observable verb, such as:

Identify

Explain

Analyze

Compare

Evaluate

Interpret

Trace

Construct

Do not use vague verbs such as:

Know

Understand

Learn about

Become familiar with

Objectives must come from the approved MLA standards and lesson crosswalk.

11.7 MLA Standards Connection

List only the MLA standards assigned to the lesson.

Example:

<div class="mla-ss-standards-box">

<strong>MLA Standards:</strong>

MLA.WH.HI.01, MLA.WH.HI.02, MLA.WH.HI.03

</div>

Add a short student-friendly explanation of what the standards require.

Do not place Florida, CPALMS, Common Core, SAT, or ACT codes on the student page unless explicitly required by MLA policy.

11.8 Lesson Path

Show all seven pages in sequence.

Each step must include:

Page number

Official page name

One-sentence purpose

The path may use cards or a responsive table.

11.9 What You Must Complete

Use a concise table showing:

Historian’s Notebook work

Notebook Evidence Submission

Mastery Checkpoint Submission

Lesson Quiz

Do not include detailed assignment directions here.

11.10 P01 Visual

P01 must include one concise orientation visual.

Acceptable options:

Investigation pathway

Chronology preview

Simplified location map

Unit connection diagram

Historical inquiry process

Evidence-to-conclusion flowchart

The visual must orient the student, not teach the full lesson.

11.11 Prohibited on P01

Do not include:

Vocabulary definitions

Detailed source excerpts

Independent questions

Guided investigation prompts

Quiz questions

Full checkpoint directions

New historical claims requiring extensive explanation


## 12. P02 — Learn the Historical Content

12.1 Purpose

P02 teaches the historical knowledge students need before analyzing evidence.

P02 should function like a concise, well-organized digital textbook chapter.

12.2 Required Sections

P02 must include:

Lesson banner

Connection to the Investigation Question

Historical Context

Chronological Content Development

Required Vocabulary and Definitions

Essential People, Places, Events, and Ideas

Required Map or Timeline, when specified

Cause, Change, or Context Explanation

Key Takeaways

Historian’s Notebook Directions

Transition to P03

TOR support box

12.3 Historical Content Requirements

Content must:

Follow historical chronology where appropriate.

Use accurate dates, regions, names, and terminology.

Explain relationships, not merely list facts.

Distinguish long-term causes, immediate causes, events, and effects.

Explain geographic context when geography affects the topic.

Identify uncertainty or scholarly disagreement when relevant.

Avoid unsupported simplifications.

12.4 Content Length

P02 should be substantial enough to teach the assigned standards but not overloaded.

Use:

Short paragraphs

Subheadings

Timelines

Tables

Maps

Process diagrams

Key-point boxes

Avoid more than three medium paragraphs without a heading, visual, list, or table break.

12.5 Vocabulary

Vocabulary must come from the course crosswalk.

Use a table:

| Term | Student-Friendly Definition | Historical Use |
| --- | --- | --- |

Definitions must:

Be accurate

Be understandable to high school students

Explain the term in lesson context

Avoid circular definitions

Students must be directed to copy the assigned terms and provided definitions into the Historian’s Notebook.

12.6 Maps

When a map is required, it must include:

Map title

Geographic labels

Legend or key

Direction indicator when needed

Time period

Caption explaining what students should notice

Alt text or accessible description

A map must support a specific question.

Examples:

How did terrain shape settlement?

Which trade routes connected these regions?

How did boundaries change over time?

Why was the location strategically important?

Do not add a generic map merely because the lesson concerns a place.

12.7 Timelines

When chronology is central, include a timeline containing:

Ordered dates

Short event labels

Cause-and-effect connections where appropriate

Turning-point markers

Clear beginning and ending scope

12.8 P02 Notebook Work

Students record:

Required vocabulary and definitions

Essential lesson notes specified in the crosswalk

Directions must be explicit.

Example:

<div class="mla-ss-notebook-task">

<h3>Historian’s Notebook</h3>

<ol>

<li>Copy the eight vocabulary terms and provided definitions.</li>

<li>Record the four required historical notes listed below.</li>

<li>Add the three assigned events to your lesson timeline.</li>

</ol>

</div>

Do not tell students simply to “take notes.”

State exactly what they must record.

12.9 P02 Visuals

P02 normally requires one or more instructional visuals specified in the crosswalk.

Possible visuals:

Map

Timeline

Labeled diagram

Political structure chart

Social hierarchy

Trade-network map

Before-and-after comparison

Cause-and-effect sequence

12.10 Prohibited on P02

Do not include:

Full source analysis

Guided Investigation

Independent Investigation

Checkpoint response

Quiz questions

Extensive standards language

Rubric text


## 13. P03 — Historical Evidence Lab

13.1 Purpose

P03 presents the evidence students will use to investigate the lesson question.

This page must teach students to distinguish evidence from explanation.

13.2 Required Sections

P03 must include:

Lesson banner

Evidence Lab Purpose

Evidence Set Overview

Two or more evidence items, unless the crosswalk specifies otherwise

Source identification

Source context

Accessible evidence display

Evidence-analysis questions

Evidence limitations

Historian’s Notebook evidence table

Transition to P04

TOR support box

13.3 Evidence Types

Use the evidence specified in the course crosswalk.

Possible evidence:

Primary-source excerpt

Secondary-source excerpt

Map

Timeline

Artifact

Photograph

Painting

Political cartoon

Census or population table

Economic data

Law or government document

Speech

Letter

Diary

Archaeological finding

Scholarly interpretation

13.4 Evidence Labeling

Each item must be labeled clearly.

Example:

Evidence A — Primary Source

Author:

Date:

Source Type:

Historical Context:

For secondary sources:

Evidence B — Secondary Source

Author or Organization:

Publication Date:

Type:

Historical Focus:

13.5 Source Excerpts

Excerpts must be:

Short enough for focused analysis

Properly attributed

Within copyright and public-use requirements

Contextualized

Free from misleading truncation

Written exactly as sourced, except clearly marked modernization when necessary

Do not fabricate quotations.

Do not place quotation marks around paraphrases.

13.6 Source Analysis Prompts

Students should analyze:

Creator or author

Date

Audience

Purpose

Context

Main claim or observation

Evidence provided

Perspective or bias

Usefulness

Limitation

Do not require every category for every source. Select the categories that support the assigned MLA standards.

13.7 Evidence Limitation

Every evidence set must explain that a source has limits.

Example:

This source provides evidence about the author’s observations, but it does not prove that every person experienced the event in the same way.

13.8 P03 Notebook Work

Students complete an evidence table such as:

| Evidence | What It Shows | What It Does Not Prove | Connection to the Investigation Question |
| --- | --- | --- | --- |

The exact table must match the lesson crosswalk.

13.9 P03 Visuals

P03 requires at least one authentic or instructional evidence visual when the crosswalk calls for it.

Possible visual combinations:

Historical map plus written source

Timeline plus population table

Political cartoon plus speech excerpt

Artifact image plus archaeological interpretation

Two conflicting accounts

13.10 Prohibited on P03

Do not:

Deliver another full lecture.

Give students the final conclusion.

Complete the evidence analysis for them.

Introduce the checkpoint.

Add unrelated documents merely to increase source count.

use fake primary sources.


## 14. P04 — Historical Thinking

14.1 Purpose

P04 explicitly teaches the primary historical-thinking skill assigned in the crosswalk.

The skill must be applied to the evidence introduced on P03.

14.2 Approved Historical-Thinking Skills

Possible primary skills include:

Historical inquiry

Chronology

Cause and effect

Contextualization

Sourcing

Corroboration

Comparison

Continuity and change

Perspective

Historical significance

Geographic reasoning

Claim-evidence-reasoning

Only one skill should be identified as the primary focus of a lesson.

Supporting skills may appear.

14.3 Required Sections

P04 must include:

Lesson banner

Name and definition of the thinking skill

Why historians use the skill

Step-by-step method

Modeled example using lesson evidence

Think-aloud explanation

Historical-thinking organizer

Common mistake and correction

Historian’s Notebook directions

Transition to P05

TOR support box

14.4 Step-by-Step Method

Provide a repeatable procedure.

Example for corroboration:

Identify what each source claims.

Note where the sources agree.

Note where the sources differ.

Compare each source’s date, author, purpose, and context.

Determine which claims are supported by multiple pieces of evidence.

State what remains uncertain.

14.5 Modeled Example

The example must use the lesson’s actual evidence.

Do not use an unrelated historical example unless absolutely necessary.

Clearly separate:

Evidence

Historian’s thinking

Conclusion

14.6 Think-Aloud

Use language such as:

I notice that Source A was created during the event, while Source B was written many years later. Source A may capture immediate observations, but Source B may have access to additional evidence. I should compare their claims before deciding which explanation is better supported.

The think-aloud must model reasoning, not merely provide the correct answer.

14.7 Common Mistake Box

Include one lesson-specific mistake.

Example:

<div class="mla-ss-misconception">

<div class="mla-ss-wrong">

<strong>Common mistake:</strong>

Assuming that an older source is automatically more reliable.

</div>


<div class="mla-ss-correction">

<strong>Correction:</strong>

Reliability depends on context, access to information, purpose, evidence,

and corroboration—not age alone.

</div>

</div>

14.8 P04 Notebook Work

Students complete the assigned historical-thinking organizer.

Examples:

Cause-and-effect organizer

Source reliability chart

Corroboration table

Comparison matrix

Continuity-and-change chart

Geographic reasoning organizer

Claim-evidence-reasoning chart

14.9 P04 Visual

Include the organizer or a model of the thinking process.

The visual must show how the reasoning works.

14.10 Prohibited on P04

Do not:

Introduce substantial new historical content.

Repeat P03 in full.

Complete the Independent Investigation.

Reveal the full checkpoint answer.

Treat historical thinking as a vocabulary definition only.


## 15. P05 — Guided Investigation

15.1 Purpose

P05 lets the student apply the content, evidence, and thinking skill with structured support.

This is practice, not independent mastery.

15.2 Required Sections

P05 must include:

Lesson banner

Investigation Question

Evidence students must use

Step-by-step guided prompts

Hints or scaffolds

Feedback or model reasoning after each stage

Guided conclusion

Optional notebook notes

Readiness check

Transition to P06

TOR support box

15.3 Guided Structure

Use a progression such as:

Step 1 — Identify

What does the evidence say?

Step 2 — Interpret

What does the evidence mean in context?

Step 3 — Compare

How does it agree or disagree with other evidence?

Step 4 — Reason

What historical relationship does the evidence show?

Step 5 — Conclude

Which claim is best supported?

15.4 Feedback

Feedback must teach.

Example:

A strong answer identifies the specific evidence before explaining its meaning. “The population decreased” is incomplete unless you identify the years, amount of change, and connection to the historical event.

Do not provide only:

Correct

Incorrect

Try again

15.5 Guided Response Format

Students may complete:

Short-answer prompts

Selection prompts with feedback

Evidence sorting

Timeline ordering

Map analysis

Source comparison

Cause-and-effect sequencing

Claim matching

15.6 Submission Status

Guided Investigation work is generally not submitted separately unless the crosswalk or Moodle design explicitly requires it.

It supports the student’s notebook and preparation for P06.

15.7 P05 Visuals

Use visuals when required by the task.

Examples:

Annotated map

Partially completed organizer

Source table with one modeled row

Timeline with missing events

Cause-and-effect diagram

15.8 Readiness Check

End with a brief checklist:

I can identify relevant evidence.

I can explain what the evidence shows.

I can apply the lesson’s historical-thinking skill.

I am ready to investigate independently.

15.9 Prohibited on P05

Do not:

Require independent mastery.

Grade the guided responses as the checkpoint.

Introduce new evidence needed for P06 without explanation.

Give the complete final response students must later submit.

Replace feedback with generic encouragement.


## 16. P06 — Independent Investigation

16.1 Purpose

P06 requires students to apply the lesson independently and complete the required Historian’s Notebook evidence.

This page generates the notebook work that will be submitted through the Notebook Evidence Submission activity.

16.2 Required Sections

P06 must include:

Lesson banner

Independent Investigation Question or Task

Evidence students may use

Exact notebook requirements

Required organizer or format

Completion checklist

Notebook submission reminder

Preparation for P07

Transition to P07

TOR support box

16.3 Independence Rule

P06 must not provide:

Step-by-step answers

Completed reasoning

Model response matching the task

Sentence-by-sentence writing directions that eliminate independent thought

Students may receive structure without receiving the answer.

16.4 Required Notebook Components

P06 must identify exactly what will be submitted.

Typical requirements:

Vocabulary and definitions from P02

Required lesson notes from P02

Evidence table from P03

Historical-thinking organizer from P04

Independent Investigation from P06

Do not use vague language such as:

Submit your notebook work.

State every required item.

16.5 Independent Investigation Design

The task must:

Align with MLA standards

Use lesson evidence

Require the primary historical-thinking skill

Prepare students for the checkpoint

Be different from the checkpoint

Produce visible evidence of learning

Examples:

Complete a cause-and-effect organizer.

Compare two historical systems using assigned categories.

Evaluate three sources and rank their usefulness.

Construct an annotated timeline.

Analyze how geography shaped a historical development.

Develop a claim and supporting evidence chart.

16.6 Notebook Submission Reminder

Include:

<div class="mla-ss-submission-reminder">

<strong>Notebook Evidence Submission:</strong>

After completing this page, submit all required Historian’s Notebook components

through the designated Moodle assignment. Make sure every page is readable and

all required sections are included.

</div>

16.7 Completion Checklist

The checklist must be objective.

Example:

All assigned vocabulary terms and definitions are present.

The required notes are complete.

Every evidence row is completed.

The organizer contains all required categories.

The Independent Investigation answers every prompt.

The uploaded file is readable.

16.8 P06 Visuals

Use only visuals needed for the independent task.

Examples:

Blank organizer

Blank timeline

Source matrix

Map to annotate

Cause-and-effect chart

Comparison table

16.9 Prohibited on P06

Do not:

Provide final answers.

Insert new content not taught previously.

Include full checkpoint submission directions.

Treat the notebook as optional.

Ask the student to repeat identical work already completed on P05.


## 17. P07 — Mastery Checkpoint

17.1 Purpose

P07 explains the independent mastery task.

The actual student response is submitted through the separate Mastery Checkpoint Submission activity in Moodle.

P07 must contain no new instruction.

17.2 Required Sections

P07 must include:

Lesson banner

Mastery statement

Investigation Question

Exact checkpoint task

Required response format

Required historical evidence

Required historical-thinking skill

Success criteria

Submission workflow

Academic-integrity reminder

TOR support box

17.3 Checkpoint Task

The checkpoint must:

Directly assess the assigned MLA standards

Answer the investigation question

Require independent reasoning

Require evidence from the lesson

Require use of the Historian’s Notebook

Be completed separately from the notebook

Match the checkpoint rubric

17.4 Response Length

The crosswalk must specify the expected product.

Examples:

150–200 words

200–250 words

Two developed paragraphs

Completed source-analysis response

Annotated map plus explanation

Comparison table plus written conclusion

Claim-evidence-reasoning response

Do not assign “250 words” automatically to every lesson.

The response format must match the standards and task.

17.5 Required Evidence

State the exact evidence requirement.

Examples:

At least two pieces of evidence from different sources

One map detail and one written-source detail

Two specific timeline events

One similarity and one difference

One cause and two effects

Evidence from at least three data points

Do not use only:

Include evidence.

17.6 Success Criteria

Use an objective checklist aligned with the rubric.

Example:

Directly answers the investigation question

Uses at least two accurate pieces of historical evidence

Applies the lesson’s cause-and-effect skill

Explains how the evidence supports the conclusion

Uses assigned historical vocabulary accurately

Meets the required response format

Reflects the student’s own understanding

17.7 Submission Workflow

Include:

Review P01–P06.

Review the completed Historian’s Notebook.

Draft the checkpoint response.

Compare the response to the success criteria.

Submit through the designated Mastery Checkpoint activity.

Review TOR feedback.

Revise and resubmit if required.

17.8 Academic Integrity

Include:

Your checkpoint must reflect your own understanding. You may use your Historian’s Notebook and lesson materials. Do not submit AI-generated or copied work as your own.

17.9 P07 Visuals

P07 generally does not require a decorative or content visual.

A task-specific organizer may be included only when essential to the checkpoint format.

17.10 Prohibited on P07

Do not:

Teach new content

Add new vocabulary

Introduce unseen evidence

Provide a model answer too similar to the assigned response

Include quiz questions

Repeat the full rubric table unless required

Combine notebook and checkpoint submission directions


## 18. Historian’s Notebook Submission Standards

The Moodle assignment must clearly identify required evidence.

Use this standard structure:

Assignment Title

Unit [#] Lesson [#] Historian’s Notebook Submission

Required Evidence

List each required item from the lesson crosswalk.

Example:

Vocabulary and provided definitions

Required lesson notes

Timeline entry

Source-analysis table

Cause-and-effect organizer

Independent Investigation

File Requirements

Accepted formats may include:

PDF

DOCX

Clear image files

Approved digital notebook export

Requirements:

Every page must be readable.

Student name, course, unit, and lesson must appear.

All required components must be included in one submission when possible.

Work must appear in the correct orientation.

Blurry, cropped, unreadable, or incomplete work may be returned.

Rubric

Use the approved Historian’s Notebook rubric.

Gradebook weight:

20%


## 19. Mastery Checkpoint Submission Standards

Assignment Title

Unit [#] Lesson [#] Mastery Checkpoint Submission

Assignment Content

Repeat only:

Investigation Question

Required task

Response format

Required evidence

Success criteria

Academic-integrity statement

Do not repeat the entire lesson.

Rubric

Use the approved Mastery Checkpoint rubric.

Gradebook weight:

20%


## 20. Lesson Quiz Standards

Gradebook weight:

30%

Lessons 1–7 conclude with a Lesson Quiz.

20.1 Quiz Purpose

The quiz objectively verifies lesson understanding after instruction, notebook work, and the Mastery Checkpoint.

20.2 Quiz Bank

Unless otherwise specified, create a lesson question pool large enough to support randomized attempts.

The crosswalk must state:

Question-bank size

Questions delivered per attempt

Number of attempts

Passing score

Feedback rules

Do not assume five fixed questions unless the approved assessment design states that requirement.

20.3 Required Coverage

The quiz pool should include:

Historical content

Vocabulary in context

Source interpretation

Visual interpretation

Historical-thinking skill

Application

20.4 Question Quality

Questions must:

Have four choices: A, B, C, and D

Have one defensible correct answer

Use plausible distractors

Avoid predictable answer patterns

Avoid “all of the above”

Avoid trick wording

Avoid unnecessary negatives

Remain inside the assigned MLA standards

Be answerable from the lesson

Use self-contained stimuli

20.5 Visual Questions

When a question depends on a map, timeline, chart, source, or image, include the full stimulus within the item.

Do not require the student to remember a visual from another Moodle page.

20.6 Cognitive Rigor

The quiz must include more than recall.

Recommended range:

20–30% recall and vocabulary

40–50% interpretation and comprehension

20–30% application and historical reasoning


## 21. Unit 8 Synthesis Lesson Standards

Lesson 8 is not a standard Lesson 1–7 lesson.

It must synthesize the unit without introducing new primary standards.

Recommended page roles:

| Page | Lesson 8 Purpose |
| --- | --- |
| P01 | Unit synthesis overview |
| P02 | Review major historical content |
| P03 | Compare unit evidence |
| P04 | Apply multiple historical-thinking skills |
| P05 | Guided synthesis investigation |
| P06 | Independent unit synthesis |
| P07 | Unit Assessment preparation |

Lesson 8 must:

Revisit all major unit standards

Connect multiple lessons

Use cumulative evidence

Emphasize turning points, patterns, continuity, and change

Prepare students for the Unit Assessment

Lesson 8 ends with the Unit Assessment instead of a Lesson Quiz.


## 22. Unit Assessment Standards

Gradebook weight:

30%

The Unit Assessment must:

Measure cumulative unit mastery

Represent all major MLA standards from the unit

Include source-based items

Include visual-analysis items where appropriate

Include chronology, causation, comparison, or other assigned reasoning skills

Avoid introducing unseen content

Use an approved randomized question pool when applicable

The unit crosswalk must specify:

Question-pool size

Questions delivered

Attempts

Passing score

Standards distribution

Rigor distribution

Visual requirements


## 23. Visual Production Standards

23.1 Purpose

Every visual must perform an instructional function.

Approved functions:

Establish location

Establish chronology

Compare systems

Show change

Show cause and effect

Organize evidence

Display data

Explain structure

Support source analysis

Model reasoning

23.2 Approved Visual Types

Maps

Timelines

Flowcharts

Comparison tables

Evidence matrices

Social hierarchies

Political structures

Cause-and-effect diagrams

Continuity-and-change charts

Data displays

Annotated primary sources

SVG instructional diagrams

23.3 Decorative Visuals

Do not include an image merely to fill space.

A visual is not acceptable if removing it would have no effect on learning.

23.4 SVG Standards

SVGs must:

Include role="img"

Include an accurate aria-label

Use readable text

Use high contrast

Remain responsive

Avoid tiny labels

Include a caption or explanation

Be historically accurate

23.5 Map Standards

Every map must include:

Title

Time period

Key or legend when symbols or colors are used

Clear region labels

Accessible description

Source or production note when required

Student direction explaining what to observe

23.6 Image Use

Use only:

Public-domain images

Open-license images

MLA-created graphics

Publisher resources MLA is licensed to use

Record source and license information in production notes.

Do not display raw external image links that may break.


## 24. Accessibility Requirements

Every page must:

Use heading levels in logical order

Use sufficient color contrast

Include descriptive alt text

Use aria-label for meaningful SVGs

Use tables only for tabular information

Include table headers

Avoid color-only directions

Support keyboard use

Avoid flashing or moving content

Use descriptive link text

Remain readable at 200% zoom

Display correctly on desktop, tablet, and mobile

Avoid:

Click here.

Use:

Open the Unit 1 source-analysis guide.


## 25. Historical Accuracy Standards

Codex must:

Verify dates, people, places, events, and terminology.

Distinguish fact from interpretation.

Avoid presenting contested interpretations as undisputed fact.

Use culturally respectful and historically precise language.

Avoid presentism unless explicitly analyzing present-day interpretation.

Avoid overgeneralizing civilizations, religions, nations, or cultures.

Identify geographic and chronological scope.

Use primary sources accurately.

Never invent quotations, statistics, documents, or historical evidence.

For sensitive topics such as genocide, enslavement, persecution, war, religion, or colonialism:

Use precise terminology.

Avoid sensationalism.

Center historical evidence.

Avoid false equivalence.

Maintain age-appropriate but academically honest explanations.


## 26. Writing Standards

Student-facing writing must:

Be clear and direct

Use complete sentences

Define necessary academic vocabulary

Explain relationships

Avoid unnecessary jargon

Avoid repetitive filler

Maintain high-school rigor

Support independent learners

Use second person when giving directions

Use third person or appropriate historical language when explaining content

Do not use:

“As we all know”

“Obviously”

“Simply”

“Just memorize”

“This is easy”

Generic motivational filler


## 27. Page-Length Standards

Page length must be driven by the assigned standards and content.

General guidance:

| Page | Expected Relative Length |
| --- | --- |
| P01 | Short |
| P02 | Longest instructional page |
| P03 | Moderate to long |
| P04 | Moderate |
| P05 | Moderate |
| P06 | Moderate |
| P07 | Short to moderate |

Do not force every page to have equal length.

Do not shorten content so severely that standards are inadequately taught.

Do not inflate content with repetition.


## 28. Mobile Responsiveness

Use a mobile breakpoint around:

@media (max-width: 700px)

On mobile:

Reduce outer padding

Reduce banner font size

Stack cards

Convert complex tables into readable blocks where possible

Preserve all labels

Ensure SVG text remains readable

Avoid horizontal scrolling


## 29. Naming Conventions

Moodle Lesson Activity

Lesson [#]: [Official Lesson Title]

Pages

P01 – Lesson Overview

P02 – Learn the Historical Content

P03 – Historical Evidence Lab

P04 – Historical Thinking

P05 – Guided Investigation

P06 – Independent Investigation

P07 – Mastery Checkpoint

Assignments

Unit [#] Lesson [#] Historian’s Notebook Submission

Unit [#] Lesson [#] Mastery Checkpoint Submission

Quiz

Unit [#] Lesson [#] Quiz

Internal File Names

WH_U01_L01_P01.html

WH_U01_L01_P02.html

WH_U01_L01_P03.html

WH_U01_L01_P04.html

WH_U01_L01_P05.html

WH_U01_L01_P06.html

WH_U01_L01_P07.html

Use two digits for unit, lesson, and page numbers.


## 30. Codex Production Sequence

Codex must complete work in this order:

Step 1 — Read Governing Documents

Read:

MLA Social Studies Production Standards

Approved World History Crosswalk

Approved rubrics

Existing Moodle shell naming

Step 2 — Validate Lesson Specification

Before writing, identify:

Unit

Lesson

Official title

MLA standards

Investigation Question

Required content

Vocabulary

Historical-thinking skill

Required evidence

Required maps and visuals

Notebook requirements

Checkpoint

Quiz blueprint

If any required field is missing, flag it instead of inventing it.

Step 3 — Build P01

Check against the P01 requirements.

Step 4 — Build P02

Check against the P02 requirements.

Step 5 — Build P03

Check against the P03 requirements.

Step 6 — Build P04

Check against the P04 requirements.

Step 7 — Build P05

Check against the P05 requirements.

Step 8 — Build P06

Check against the P06 requirements.

Step 9 — Build P07

Check against the P07 requirements.

Step 10 — Build Supporting Activities

Create:

Notebook assignment directions

Checkpoint assignment directions

Lesson quiz pool

Step 11 — Run Lesson QA

Compare every file against:

Production standards

Crosswalk

Rubrics

Moodle naming

Accessibility requirements

Step 12 — Produce a QA Report

The report must identify:

Files created

Standards addressed

Required visuals included

Notebook components included

Checkpoint alignment

Quiz alignment

Accessibility checks

Any unresolved issue


## 31. Codex Prohibited Actions

Codex must not:

Change official unit or lesson titles

Change lesson order

Change MLA standards

Add standards not assigned in the crosswalk

Change gradebook weights

Change rubrics

Change release restrictions

Remove Notebook Evidence Submission

Combine notebook and checkpoint submissions

Replace the seven-page structure

Copy generic content across lessons

Invent historical evidence

Invent quotations

Add decorative visuals

Introduce new content on P07

Create assessments before teaching the content

Use a future lesson’s content prematurely

Rewrite the course architecture

use external publisher content without authorization


## 32. Lesson QA Checklist

Codex and the human reviewer must verify:

Lesson Identity

Correct course

Correct unit

Correct lesson

Correct title

Correct MLA standards

Correct Investigation Question

P01

Concise orientation

Objectives included

MLA standards included

Required components listed

Orientation visual included

No detailed teaching

P02

Required content fully taught

Vocabulary included

Dates and chronology accurate

Required map or timeline included

Exact notebook directions included

P03

Required evidence included

Sources correctly labeled

Context provided

Limitations addressed

Notebook evidence table included

P04

Primary historical-thinking skill taught

Steps explained

Lesson-specific model included

Think-aloud included

Common mistake corrected

Organizer included

P05

Guided Investigation included

Scaffolds included

Feedback teaches

No checkpoint answer provided

P06

Independent Investigation included

Exact notebook submission components listed

Completion checklist included

No guided answers provided

P07

No new content

Exact checkpoint task included

Evidence requirement included

Response format included

Success criteria included

Submission workflow included

Visuals

All required visuals included

Every visual has an instructional purpose

Maps have labels and legends

SVGs include accessibility attributes

No decorative filler

Footer

Next-page transition included

TOR support box included on every page

Assessments

Notebook assignment matches P02–P06

Checkpoint matches P07

Quiz measures taught content

No assessment uses untaught content

Rubrics remain unchanged

Accessibility

Heading hierarchy correct

Alt text included

Contrast adequate

Tables accessible

Mobile layout verified

Historical Accuracy

Dates verified

Names verified

Terminology verified

Sources verified

No fabricated information


## 33. Final Approval Rule

A lesson is ready for Moodle only when:

All seven pages are complete.

Notebook directions match the Notebook Evidence Submission.

P07 matches the Mastery Checkpoint Submission.

The quiz matches taught lesson content.

All required visuals are present.

Every page contains the TOR support box.

The lesson passes the complete QA checklist.

No unresolved crosswalk conflict remains.

If the crosswalk and lesson content conflict, the crosswalk controls.

If the Production Standards and generated formatting conflict, the Production Standards control.

Codex must report the conflict rather than silently changing the curriculum.

## 34. Approved Coursewide Assessment Defaults

These defaults apply to World History unless an approved unit or lesson specification states otherwise.

### Lesson Quizzes

- Question pool: 25 questions
- Questions delivered per attempt: 5 randomized questions
- Initial attempts: 1
- Passing score: 80%
- Reassessment: One additional attempt only after remediation or Teacher of Record authorization
- Question format: Four answer choices (A-D) with one defensible correct answer
- Score feedback: Released after submission
- Correct-answer and detailed feedback: Released after the attempt closes or according to the approved Moodle review settings
- Pool distribution: 5 vocabulary/foundational-content questions; 10 source, map, timeline, chart, or visual-interpretation questions; 10 application/historical-reasoning questions

Every stimulus-based question must contain the complete source or visual required to answer it.

### Unit Assessments

- Question pool: 40 questions
- Questions delivered per attempt: 10 randomized questions
- Initial attempts: 1
- Passing score: 80%
- Reassessment: One additional attempt after remediation or Teacher of Record authorization
- Score feedback: Released after submission
- Correct-answer and detailed feedback: Controlled to protect the question pool
- Coverage: All major unit MLA standards and all Lessons 1-7
- Required evidence types: Maps, timelines, sources, charts, or other visuals where specified
- Rigor distribution: Approximately 20% recall, 50% interpretation, and 30% application/synthesis

Unit assessments must use stratified category draws: one question from each Lesson 1-7 category plus three additional questions drawn from three different lesson categories. The three additional categories rotate randomly across attempts, and no lesson may contribute more than two delivered questions. The delivered assessment must preserve the approved visual, source, and rigor distributions.

### Mastery Checkpoints

Every lesson specification must identify:

- Exact task
- Exact product or word range
- Exact number and type of evidence required
- Required historical-thinking skill
- Required vocabulary or concepts
- Objective success criteria

Checkpoint formats must be selected to match the assigned standards and may include a 150-200-word response, a 200-250-word response, two developed paragraphs, a claim-evidence-reasoning response, a comparison chart with a written conclusion, or an annotated map with an explanation. Do not impose one response length on every lesson.

### Approved Historical-Thinking Labels

- Historical Inquiry
- Chronology
- Cause and Effect
- Contextualization
- Sourcing
- Corroboration
- Comparison
- Continuity and Change
- Perspective
- Historical Significance
- Geographic Reasoning
- Claim-Evidence-Reasoning

Lesson 8 may use **Unit Synthesis** as its lesson function, but its historical-thinking requirements must name specific approved skills.

### Source Selection and Documentation

When an approved crosswalk specifies a source type without naming the exact document, Codex may select a historically accurate public-domain or properly licensed source from an approved repository. Codex must:

- Verify historical accuracy and instructional relevance.
- Prefer primary sources when appropriate.
- Record the title, creator, date, repository, URL or source identifier, and license or public-domain status.
- Use only the excerpt needed for instruction.
- Preserve the original wording.
- Clearly mark any modernization, translation, omission, or editorial note.
- Never fabricate, combine, or materially alter quotations.
- Never present a paraphrase as a quotation.
- Flag any source whose rights or authenticity cannot be verified.
