# Chemistry Final Moodle Transfer Ready Audit

Date: 2026-07-08

## Decision

CERTIFIED

Chemistry is ready for Moodle transfer after correction and reaudit.

## Audit Scope

- Course production files reviewed for science/lab/resource rules.
- Current `CHEMISTRY/Units` lesson files reviewed directly.
- Current Moodle XML assessment files reviewed directly.
- Unit and lesson mapping alignment was checked through current lesson metadata and assessment metadata.
- Science lab/simulation requirements were checked against the global MLA science standards.

## Required Validation Results

| Gate | Result | Evidence |
|---|---:|---|
| Lesson folders | PASS | 48 lesson folders found |
| P01-P07 pages | PASS | 336 HTML lesson pages found |
| Lesson/quiz JSON | PASS | 96 required lesson-level JSON files present and valid |
| Moodle XML files | PASS | 102 XML files found |
| Moodle XML questions | PASS | 1,590 multichoice questions validated |
| XML answer count | PASS | Every validated question has exactly 4 answers |
| XML correct answer count | PASS | Every validated question has exactly 1 correct answer |
| XML standard display | PASS | Every validated question displays `MLA Standard` |
| XML feedback | PASS | No weak/empty feedback remained after correction |
| Resource pages | PASS | 48 linked resource/simulation pages found |
| Resource directions | PASS | Every linked lesson page includes click/open, observe, record, and evidence directions |
| Search/navigation language | PASS | No student-facing `search`, `find`, `choose`, or `browse` direction remains in linked resource pages |
| Live-teacher dependency language | PASS | No prohibited student-facing live-teacher dependency language remains |

## Corrections Made

1. Replaced negative Unit 2 P07 mastery language:
   - Removed: `Explain every reasoning step without relying on a live teacher explanation.`
   - Added: `Explain each reasoning step clearly, using the lesson examples, evidence, and TOR support when needed.`

2. Repaired Chemistry Moodle XML standard labels:
   - Replaced XML question labels from `Standard:` to `MLA Standard:`.
   - This brings the assessment banks into the required MLA/Moodle XML display standard.

3. Repaired short Chemistry XML feedback:
   - Expanded short pH feedback so the feedback teaches why pH is not relevant to the item.

4. Strengthened all linked lesson resource directions:
   - Added explicit student-facing click/open wording.
   - Added explicit observe language to the evidence check.
   - Confirmed every linked P01 resource block tells students what to click/open, observe, record, and use as evidence.

5. Corrected Unit 6 Lesson 7 ACS resource link:
   - Replaced the ACS Reactions collection page with a specific ACS article page.
   - Updated the student task so students use the article section under the title and do not need to search or browse.
   - Direct URL inserted: `https://www.acs.org/pressroom/reactions/library/mexican-coke-problem-solved.html`

6. Tightened Unit 1 Lesson 2 ACS safety wording:
   - Replaced `find the RAMP safety framework` with `use the RAMP safety framework section`.

## Science Lab/Simulation Certification

PASS.

Chemistry has required lab/data/simulation/resource evidence in every lesson metadata file and every linked student-facing lesson page includes adjacent step-by-step directions. The course does not rely on students searching provider homepages, choosing from collections, or guessing which activity to open.

## Assessment Certification

PASS.

All production assessment banks are Moodle XML. Legacy GIFT is not used for certification. Current XML validates for structure, standard display, answer count, correct-answer count, and teachable feedback.

## Final Decision

CERTIFIED.

Chemistry is Moodle-transfer ready for lessons and assessments based on the current repository files audited on 2026-07-08.
