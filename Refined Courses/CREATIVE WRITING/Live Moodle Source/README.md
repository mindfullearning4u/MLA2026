# Live Moodle source capture

Captured September 5, 2026 from Creative Writing, Moodle course 48.

- `Orientation/P01.html` through `P04.html`: exact editor HTML for Course Overview, How This Course Works, Expectations and Policies, and Course Acknowledgement.
- `../Units/Unit NN/Lesson NN/P01.html` through `P06.html`: current content HTML read from the expanded Moodle lesson display. Browser HTML normalization may differ from raw editor formatting while preserving rendered content.
- Each lesson's `live-source.json`: source URL, capture time, page IDs, page titles, and navigation labels/jumps.
- `Assessments/activity-inventory.json`: 54 live assessment activities.
- `Assessments/<activity-id>.json`: current question list, fixed-question links or random-bank references. These records do not contain complete answers or feedback.
- `Assessments/<activity-id>-bank.json`: partial question-bank inventories; not a substitute for full XML exports.
- `Questions/CW_U01_PRE_Q01.json` through `CW_U01_PRE_Q10.json`: complete Unit 1 pretest question editor fields, including question HTML, answer HTML, scores, feedback, and behavior settings. Other question banks remain pending.

Assessment GIFT/XML files elsewhere in the course tree have not yet been verified against current Moodle answers and feedback. A full course archive remains pending in Moodle. Consult `../CURRENT_MOODLE_AUDIT.md` for the precise completion status.
