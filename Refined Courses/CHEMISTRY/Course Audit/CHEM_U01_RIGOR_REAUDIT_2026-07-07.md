# Chemistry Unit 1 Instructional Rigor Re-Audit

**Course:** Chemistry  
**Unit:** Unit 01 - Scientific Thinking, Measurement, and Matter  
**Date:** 2026-07-07  
**Scope:** Re-audit of Unit 1 lesson pages using the stricter standard that no teacher is presenting the course and Chemistry must be explained step by step with no assumptions.

## Reason for Re-Audit

The prior Unit 1 audit confirmed structure, mapping, required file presence, page model compliance, JSON validity, Moodle XML mechanics, safety boundaries, and absence of prohibited teacher-led language.

This re-audit applies a higher instructional question:

> Can a student learn the Chemistry content from the lesson pages alone, with detailed step-by-step explanation, without relying on a live teacher to fill in gaps?

## Sources Used

- `Course Production/Course-Overview.md`
- `Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md`
- `Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md`
- `.codex/standards/03-lesson-page-model-p01-p07.md`
- `.codex/standards/04-instructional-rigor-and-mastery-standard.md`
- `.codex/standards/16-science-lab-and-virtual-lab-standard.md`
- Current Unit 1 lesson files, `P01.html` through `P07.html`

Old `Unit Overview.md` files were not used.

## Re-Audit Summary

**Revised Unit 1 instructional rigor decision:** FAIL

Unit 1 remains structurally valid and mapped, but it does not yet meet the required Chemistry instructional depth for a no-live-teacher course.

## What Still Passes

| Gate | Result | Evidence |
|---|---|---|
| Required lesson files | PASS | Lessons 01-08 contain `P01.html` through `P07.html`. |
| JSON metadata | PASS | `lesson.json` and `quiz.json` parse successfully. |
| Page shell model | PASS | Required P01-P07 sections are present. |
| Standards mapping | PASS | Lesson titles and primary standards match the approved Unit 1 lesson mapping. |
| Safety boundaries | PASS | Lessons avoid unsafe unsupervised chemistry activities. |
| No teacher-led language | PASS | No prohibited phrases such as `teacher will explain`, `teacher check`, or `wait for teacher` were found. |
| Assessment XML mechanics | PASS | Existing Unit 1 Moodle XML banks parse and meet basic mechanical requirements. |

## Blocking Rigor Findings

### 1. P03 pages are too generic across lessons

Many P03 pages use the same broad reasoning template instead of continuing the specific Chemistry instruction for the assigned lesson. For example, Lesson 06 `P03.html` tells students to identify an object, find evidence, connect evidence, and state a conclusion. That is a useful general strategy, but it does not deeply teach physical versus chemical properties and changes.

Required fix:

Each P03 must continue the specific lesson concept with additional Chemistry explanation, examples, non-examples, and common misconceptions tied to that lesson.

### 2. P04 worked examples are present but not detailed enough

P04 pages include three worked examples, but many examples are short paragraphs followed by generic step lists. For Chemistry, P04 needs to show the actual reasoning step by step.

Example issue from Lesson 03 `P04.html`:

- The example converts `3500 g` to scientific notation, but it does not fully explain why the decimal moves, how the exponent is chosen, what two significant figures means, or how a student can check the result.
- The significant-figure addition example gives the rule and answer, but it needs more explicit place-value reasoning.

Required fix:

Each worked example must include:

- the given information
- the question being answered
- the relevant rule or concept
- each step of the reasoning
- why each step is done
- the final answer interpreted in context
- a lesson-specific common mistake and correction

### 3. P06 independent work is not self-contained enough

P06 pages often ask students to build a table, choose axes, classify evidence, or complete a scenario without providing enough actual data or task materials on the page.

Example issue from Lesson 04 `P06.html`:

- It tells students to build a data table from a scenario and choose graph axes, but the page does not provide a complete scenario/data set for the student to use.

Required fix:

Each P06 must include actual self-contained tasks, such as a provided data table, scenario, particle model description, property/change evidence list, safety procedure, or source excerpt. Students should not have to invent the task materials.

### 4. Visuals are present but often underdeveloped as teaching tools

Most lessons include a table or organizer, but some visuals function as summary charts rather than explicit teaching supports. Chemistry visuals need to help students reason through the concept.

Required fix:

Each required visual/table/model should include student-facing interpretation prompts or explanation, such as:

- what to notice first
- how to read each row or feature
- what conclusion the visual supports
- what mistake students often make when reading it

### 5. Lesson-specific misconceptions are too broad

The common mistake language is often generic, such as treating a single clue as proof or choosing an answer because it looks right. That is useful, but Chemistry needs targeted misconceptions.

Required fix examples:

- Lesson 03: confusing precision with accuracy; inventing extra significant figures; dropping units.
- Lesson 04: putting variables on the wrong axes; deleting outliers without investigation.
- Lesson 05: thinking phase change creates a new substance.
- Lesson 06: assuming every color change proves chemical change.
- Lesson 07: treating a scientific theory as a guess.

### 6. Lessons need more no-assumption scaffolding

The current lessons assume students can bridge from definitions to application too quickly. For Chemistry, each page should slow down the reasoning process.

Required fix:

Lessons need more explicit transition language:

- “First notice...”
- “This matters because...”
- “The evidence tells us...”
- “Do not conclude yet, because...”
- “Now connect the observation to the definition...”
- “Here is how to check your answer...”

## Lesson-by-Lesson Rigor Decision

| Lesson | Title | Rigor Result | Required Revision Focus |
|---|---|---|---|
| 01 | What Counts as Chemistry Evidence? | FAIL | Add deeper source reliability instruction, stronger CER modeling, and self-contained evidence tasks. |
| 02 | Lab Safety, Tools, and Procedures | FAIL | Add more detailed tool-use reasoning, procedure critique examples, and unsafe/safe procedure rewrites. |
| 03 | Measurement, Units, and Significant Figures | FAIL | Expand unit reasoning, significant-figure rules, scientific notation steps, and measurement precision examples. |
| 04 | Data Tables, Graphs, Precision, and Uncertainty | FAIL | Provide complete data sets, graph-axis reasoning, uncertainty/outlier decisions, and interpretation practice. |
| 05 | States of Matter and Particle Models | FAIL | Expand particle-level explanation, energy/phase-change reasoning, and model interpretation. |
| 06 | Physical and Chemical Properties and Changes | FAIL | Add stronger evidence tests for new substances, targeted misconceptions, and classification scenarios. |
| 07 | Models, Laws, Theories, and Chemistry Decisions | FAIL | Deepen model/law/theory distinctions, model limitations, and evidence-based decision reasoning. |
| 08 | Putting It All Together | FAIL | Add full synthesis walkthroughs using safety, measurement, graph/data, matter model, and evidence reasoning together. |

## Assessment Impact

The Unit 1 Moodle XML files passed mechanical validation, but because the lesson rigor gate now fails, the assessments should not be considered finally certified yet.

Assessment certification depends on lessons being instructionally sufficient. If lessons are expanded, assessment items should be rechecked afterward for alignment to the revised student-facing instruction and for sufficient embedded stimuli.

## Required Corrections Before Unit 1 Can Pass Rigor

1. Expand P02/P03 for each lesson with deeper Chemistry-specific teaching.
2. Rewrite P04 worked examples to show full step-by-step reasoning with why each step is done.
3. Replace generic P03/P04 common mistakes with lesson-specific misconceptions.
4. Make P06 independent work fully self-contained with actual scenarios, data, models, or evidence sets.
5. Add explanation around each visual/table/model so students know how to read and use it.
6. Re-run the instructional rigor audit after revisions.
7. Recheck assessment alignment after the lesson revisions.

## Revised Decision

**Previous Unit 1 decision:** PASS for structure and mechanical compliance.  
**Revised Unit 1 instructional rigor decision:** FAIL.  
**Current Unit 1 status:** STRUCTURALLY BUILT, ASSESSMENTS MECHANICALLY VALID, NOT STUDENT-READY FOR CHEMISTRY RIGOR.

Unit 1 should not be treated as complete, certified, or student-ready until the required rigor repairs are made and re-audited.
