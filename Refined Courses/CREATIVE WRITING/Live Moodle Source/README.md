# Finalized Moodle recovery source

Source: backup-moodle2-course-48-CW-20260910-2113-nu.mbz

`Export XML` contains exact Moodle records, including all question versions and category mappings, activity settings, navigation, rubrics, gradebook and content-bank definitions. `Assets/index.json` maps original filenames to preserved payloads. Lesson HTML is in the unit/lesson folders; four orientation pages are in `Orientation`; assignment instructions and readable rubrics are in `Submissions`. Use the `.mbz` archive for complete Moodle restoration. Standalone HTML preserves the source markup but Moodle-hosted interactions may require Moodle restoration to run. The lesson assessment XML files contain the active bank questions; the archive preserves full version history.
