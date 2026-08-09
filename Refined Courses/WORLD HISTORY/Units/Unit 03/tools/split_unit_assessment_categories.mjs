import fs from 'node:fs';
import path from 'node:path';

const xmlDir = path.resolve(import.meta.dirname, '..', 'Moodle XML');
const input = path.join(xmlDir, 'WH_U03_UnitAssessment_MoodleXML_VisualReady.xml');
const output = path.join(xmlDir, 'WH_U03_UnitAssessment_MoodleXML_VisualReady_Stratified.xml');
const source = fs.readFileSync(input, 'utf8');

const questions = [...source.matchAll(/<question type="multichoice">[\s\S]*?<\/question>/g)].map((match) => match[0]);
let result = '<?xml version="1.0" encoding="UTF-8"?><quiz>';
let previousLesson = '';

for (let question of questions) {
  const name = question.match(/<name><text>([^<]+)<\/text><\/name>/)?.[1] ?? '';
  const lesson = name.match(/_L(0?[1-7])_/)?.[1];
  if (!lesson) continue;
  const lessonNumber = String(Number(lesson));
  if (lessonNumber !== previousLesson) {
    result += `<question type="category"><category><text>$course$/top/WH U03 Unit Assessment Visual-Ready/Lesson ${lessonNumber}</text></category></question>`;
    previousLesson = lessonNumber;
  }
  question = question.replace(/(<name><text>[^<]+)(_V2)(<\/text><\/name>)/, '$1$2_STRAT$3');
  result += question;
}

result += '</quiz>';
fs.writeFileSync(output, result, 'utf8');
console.log(output);
