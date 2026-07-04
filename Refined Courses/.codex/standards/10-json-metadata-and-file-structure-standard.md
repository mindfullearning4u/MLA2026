# JSON Metadata and File Structure Standard

## Purpose

Every lesson and unit must have the required file structure and valid metadata.

## Required Course Structure

Default MLA course structure:

- 6 units unless the certified course architecture states otherwise
- 8 lessons per unit
- 7 pages per lesson
- unit pretest per unit
- guided practice per lesson
- lesson quiz for Lessons 1-7
- unit assessment in Lesson 8

## Required Lesson Files

Every lesson folder must include:

- `lesson.json`
- `quiz.json`
- `P01.html`
- `P02.html`
- `P03.html`
- `P04.html`
- `P05.html`
- `P06.html`
- `P07.html`

`lesson.json` and `quiz.json` must not be zero bytes.

## Required Assessment Files

Typical math lesson files:

- Lessons 1-7: `COURSE_U##_L##_GuidedPractice_MoodleXML.xml`
- Lessons 1-7: `COURSE_U##_L##_Quiz_MoodleXML.xml`
- Lesson 8: `COURSE_U##_L08_GuidedPractice_MoodleXML.xml`
- Lesson 8: `COURSE_U##_UnitAssessment_MoodleXML.xml`
- Unit folder: `COURSE_U##_Pretest_MoodleXML.xml`

Legacy `.gift` files may exist as source or archive artifacts, but they are not production assessment files.

## Metadata Validation

JSON must be valid parseable JSON.

Metadata should include, when supported by course architecture:

- course code
- unit number
- lesson number
- lesson title
- order
- page list
- assessment references
- standards references

## Audit Output

Report:

- missing folders
- missing files
- zero-byte files
- invalid JSON
- unexpected filenames
- missing page sequence
- extra files that may be old artifacts
- files to ignore
- files recommended for archive
