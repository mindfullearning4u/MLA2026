import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('MLA2026/Refined Courses/WORLD HISTORY/Units/Unit 06');
const counts = [5, 6, 6, 6, 5, 6, 6];
const parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<quiz>'];

for (let lesson = 1; lesson <= 7; lesson += 1) {
  const source = path.join(root, 'Moodle XML', `WH_U06_L${String(lesson).padStart(2, '0')}_Quiz_MoodleXML.xml`);
  const xml = fs.readFileSync(source, 'utf8');
  const questions = xml.match(/<question type="multichoice">[\s\S]*?<\/question>/g) ?? [];
  if (questions.length < counts[lesson - 1]) {
    throw new Error(`Lesson ${lesson} has only ${questions.length} questions.`);
  }
  parts.push(
    '<question type="category">',
    `<category><text>$course$/top/Unit 6 Assessment/Lesson ${lesson}</text></category>`,
    '</question>',
    ...questions.slice(0, counts[lesson - 1]),
  );
}

parts.push('</quiz>');
const output = path.join(root, 'Moodle XML', 'WH_U06_UnitAssessment_Stratified_MoodleXML.xml');
fs.writeFileSync(output, `${parts.join('\n')}\n`, 'utf8');
console.log(output);
