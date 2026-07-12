# ALG1 Moodle Update Change List

**Course:** ALG1 - Algebra 1  
**Created:** 2026-07-12  
**Purpose:** Exact repo-side corrections that a Moodle agent must apply or verify in the transferred Moodle course.  
**Scope:** Changes made during final repo-side audit after Moodle transfer.  

---

## Moodle Update Priority

1. Update the lesson pages listed in Section 1.
2. Update/verify the student-facing course information pages listed in Section 2.
3. Verify assessment activity names and question banks listed in Section 3.
4. Do not reimport assessment XML unless Moodle content does not match the current repo XML. The audit did not change production XML files.

---

## 1. Lesson Page Updates Required in Moodle

These lesson HTML pages changed and should be updated in Moodle from the current repo file content.

| Unit | Lesson | Page | Moodle Action | Correction |
|---|---|---:|---|---|
| Unit 01 | Lesson 06 - Properties of Exponents | P02 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in visual examples; use HTML superscripts such as `2<sup>4</sup>`, `x<sup>3</sup>`, `x<sup>2</sup>`, `x<sup>5</sup>`, `x<sup>6</sup>`. |
| Unit 01 | Lesson 06 - Properties of Exponents | P03 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in visual examples; use HTML superscripts. |
| Unit 01 | Lesson 06 - Properties of Exponents | P04 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in worked example and visual examples; use HTML superscripts. |
| Unit 01 | Lesson 06 - Properties of Exponents | P05 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in guided practice and visual examples; use HTML superscripts. |
| Unit 01 | Lesson 06 - Properties of Exponents | P06 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in independent work and visual examples; use HTML superscripts. |
| Unit 01 | Lesson 06 - Properties of Exponents | P07 | Replace Moodle page HTML with current repo HTML | Correct exponent notation in checkpoint and visual examples; use HTML superscripts. |
| Unit 02 | Lesson 05 - Literal Equations and Formulas | P06 | Replace Moodle page HTML with current repo HTML | Correct circumference formula display to `C = 2&pi;r`. |
| Unit 04 | Lesson 02 - Function Notation | P05 | Replace Moodle page HTML with current repo HTML | Correct quadratic notation to `x<sup>2</sup>`. |
| Unit 04 | Lesson 03 - Evaluating Functions | P05 | Replace Moodle page HTML with current repo HTML | Correct quadratic notation to `x<sup>2</sup>`. |
| Unit 05 | Lesson 01 - Polynomial Operations and Radical Readiness | P05 | Replace Moodle page HTML with current repo HTML | Correct polynomial notation in visual table to `3x<sup>2</sup> + 5x - 2x<sup>2</sup>`. |
| Unit 05 | Lesson 01 - Polynomial Operations and Radical Readiness | P06 | Replace Moodle page HTML with current repo HTML | Correct polynomial notation in visual table to `3x<sup>2</sup> + 5x - 2x<sup>2</sup>`. |
| Unit 05 | Lesson 02 - Factoring Quadratic Expressions | P05 | Replace Moodle page HTML with current repo HTML | Correct quadratic notation to `x<sup>2</sup> + 5x + 6`. |
| Unit 05 | Lesson 06 - Exponential Functions: Growth and Decay | P07 | Replace Moodle page HTML with current repo HTML | Correct exponential model notation to `y = a(1.2)<sup>x</sup>` and `y = a(0.8)<sup>x</sup>`. |

**Moodle verification after page updates:** Confirm the pages do not show mojibake sequences, replacement diamonds, or malformed exponent symbols in the corrected math expressions.

---

## 2. Course Information Pages to Update or Verify

These repo files were corrected for display/encoding consistency. If these files were transferred into Moodle as pages/books/labels, update or verify the corresponding Moodle content.

| Repo File | Moodle Action | Correction |
|---|---|---|
| `ALG1/Course-Overview.md` | Update/verify Moodle course overview page | Bullets/arrows normalized so workflow and unit sequence display cleanly. |
| `ALG1/Course-Acknowledgement.md` | Update/verify Moodle acknowledgement page | Bullets normalized. |
| `ALG1/Expectations-and-Policies.md` | Update/verify Moodle expectations/policies page | Bullets and dash normalized. |
| `ALG1/mla_algebra_1_unit_mapping_v3.md` | Repo reference only unless exposed in Moodle | Mapping text normalized; no Moodle update needed unless this file is visible to students/staff in Moodle. |

---

## 3. Assessment Updates and Moodle Verification

### 3.1 XML Question Banks

**Production XML changed:** No.  
**Moodle XML reimport required:** No, unless Moodle is missing questions, standards labels, or correct activity naming.

The repo audit parsed the current XML and found:

- 42 lesson quiz XML files
- 48 guided practice XML files
- 6 unit pretest XML files
- 6 unit assessment XML files
- 1,590 parsed assessment questions
- 0 XML parse errors
- 0 parsed questions missing a `MLA Standard:` label

### 3.2 Moodle Assessment Verification Required

| Moodle Item | Action | Reason |
|---|---|---|
| Unit 01 Lesson 01 quiz activity | Verify activity title is `Algebra Readiness Diagnostic and Mathematical Thinking` | Repo quiz metadata had a stale title from an old rational-exponents quiz; XML content is readiness diagnostic. |
| Unit 01 Lesson 05 quiz activity/question bank | Verify standard label is `MLA.A1.FND.4` | Repo metadata was corrected; XML already contains `MLA.A1.FND.4` on questions. |
| All lesson quiz banks | Verify each lesson quiz bank has 25 questions where applicable | Repo metadata was corrected to match XML bank size. |
| All lesson quiz banks | Verify every question displays a standard label | XML audit passed with 0 missing `MLA Standard:` labels. |
| Lesson 8 in each unit | Verify there is no separate Lesson 8 lesson quiz | Lesson 8 is synthesis/unit assessment structure. |
| Unit assessments | Verify Unit 01-06 assessments are present | Repo contains 6 unit assessment XML files. |

### 3.3 Repo-Only Assessment Metadata Corrections

These corrections were made in `quiz.json` files for repo consistency. They do not require XML reimport by themselves:

- Normalized `primaryStandard` to `primaryStandards`.
- Normalized `xmlFile` to `quizFile`.
- Corrected `bankSize`/`questionCount` fields to match actual XML.
- Corrected `correctAnswerDistribution` fields to match actual XML answer keys.
- Corrected Unit 1 Lesson 5 metadata to include `MLA.A1.FND.4`.
- Corrected Unit 1 Lesson 1 quiz title.

---

## 4. Lesson Metadata Corrections - Repo Only

The following lesson metadata files were corrected so `primaryStandards` contains only real MLA standard codes. These changes are repo-side standards hygiene and do not require Moodle page edits unless Moodle displays lesson metadata directly.

| Lesson Metadata | Correction |
|---|---|
| Unit 01 Lesson 01 `lesson.json` | Removed `Readiness Support Only` from `primaryStandards`; readiness note remains metadata. |
| Unit 01 Lesson 08 `lesson.json` | Removed `Synthesis Only` from `primaryStandards`; synthesis note remains metadata. |
| Unit 02 Lesson 01 `lesson.json` | Removed `Prerequisite Support` from `primaryStandards`. |
| Unit 02 Lesson 02 `lesson.json` | Removed `Prerequisite Support` from `primaryStandards`. |
| Unit 02 Lesson 04 `lesson.json` | Removed `MLA.A1.AR.1 Support` from `primaryStandards`; this is support, not a new primary standard. |
| Unit 02 Lesson 06 `lesson.json` | Removed `Application Support` from `primaryStandards`. |
| Unit 02 Lesson 07 `lesson.json` | Removed `Cumulative Support` from `primaryStandards`. |
| Unit 02 Lesson 08 `lesson.json` | Removed `Synthesis Only` from `primaryStandards`. |
| Unit 03 Lesson 04 `lesson.json` | Removed `Bridge Support` from `primaryStandards`. |
| Unit 03 Lesson 08 `lesson.json` | Removed `Synthesis Only` from `primaryStandards`. |

---

## 5. Final Moodle Agent Checklist

- [ ] Update the 13 lesson pages listed in Section 1 from current repo HTML.
- [ ] Verify corrected math notation renders cleanly in Moodle.
- [ ] Update or verify the course overview, acknowledgement, and expectations/policies pages.
- [ ] Verify Unit 01 Lesson 01 quiz title.
- [ ] Verify Unit 01 Lesson 05 quiz questions show `MLA.A1.FND.4`.
- [ ] Verify lesson quiz banks have 25 questions where applicable.
- [ ] Verify every assessment question displays `MLA Standard:`.
- [ ] Verify Lesson 8 uses unit assessment structure and no extra Lesson 8 lesson quiz exists.
- [ ] Verify all 6 unit assessments are present.

**Repo-side ALG1 status after these corrections:** PASS AFTER CORRECTION.  
**Moodle status:** Pending live Moodle update/verification using this change list.
