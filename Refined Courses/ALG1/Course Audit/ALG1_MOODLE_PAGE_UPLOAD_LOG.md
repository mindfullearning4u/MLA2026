# Algebra 1 Moodle Page Upload Log

Purpose: Track every Moodle lesson page updated from repo HTML so the Moodle page, unit, lesson, and source file can be audited.

Rules:
- Record only confirmed saved Moodle page updates.
- Match each Moodle page to the exact repo file path used.
- Do not reuse a repo file across a different unit or lesson without recording the reason.
- Verify the saved Moodle source includes inline styling markers such as `style=`, `background:`, and `border-left` when the repo HTML contains styled boxes.

## Confirmed Saves

| Date | Moodle course | Moodle activity | Moodle page | Moodle edit URL | Repo source file | Save verification |
|---|---|---|---|---|---|---|
| 2026-07-05 | Algebra 1 (`courseid=20`) | U4 L1 Overview, Notebook Task, Concept, & Worked Example (`lesson id=2264`) | Overview (`pageid=3066`) | `https://mla.moodlecloud.com/mod/lesson/editpage.php?id=2264&pageid=3066&edit=1` | `C:\Users\acrue\MLA2026-1\Refined Courses\ALG1\Units\Unit 04\Lesson 01\P01.html` | Saved; returned to lesson editor at `#lesson-3066`. |
| 2026-07-05 | Algebra 1 (`courseid=20`) | U4 L1 Overview, Notebook Task, Concept, & Worked Example (`lesson id=2264`) | Notebook Task - Part 1 (`pageid=3067`) | `https://mla.moodlecloud.com/mod/lesson/editpage.php?id=2264&pageid=3067&edit=1` | `C:\Users\acrue\MLA2026-1\Refined Courses\ALG1\Units\Unit 04\Lesson 01\P02.html` | Saved; reopened page verified `style=`, `background:`, and `border-left` present. |
| 2026-07-05 | Algebra 1 (`courseid=20`) | U4 L1 Overview, Notebook Task, Concept, & Worked Example (`lesson id=2264`) | Notebook Task - Part 2 (`pageid=3068`) | `https://mla.moodlecloud.com/mod/lesson/editpage.php?id=2264&pageid=3068&edit=1` | `C:\Users\acrue\MLA2026-1\Refined Courses\ALG1\Units\Unit 04\Lesson 01\P03.html` | Saved; reopened page verified `style=`, `background:`, and `border-left` present. |
| 2026-07-05 | Algebra 1 (`courseid=20`) | U4 L1 Overview, Notebook Task, Concept, & Worked Example (`lesson id=2264`) | Worked Example (`pageid=3069`) | `https://mla.moodlecloud.com/mod/lesson/editpage.php?id=2264&pageid=3069&edit=1` | `C:\Users\acrue\MLA2026-1\Refined Courses\ALG1\Units\Unit 04\Lesson 01\P04.html` | Saved; reopened page verified `style=`, `background:`, and `border-left` present. |

## Notes

- The Unit 4 Lesson 1 lesson editor URL is `https://mla.moodlecloud.com/mod/lesson/edit.php?id=2264`.
- The successful workflow was to paste the exact repo HTML into Moodle `Tools > Source code`, use the source dialog's internal save/update, then click Moodle `Save page`.
- Earlier Unit 1 inspection/import attempts are not listed because they were not confirmed saved Moodle page uploads.
