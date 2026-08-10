import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('Refined Courses/WORLD HISTORY/Units/Unit 04/Moodle XML');
const lessonFiles = Array.from({length: 7}, (_, i) => path.join(root, `WH_U04_L${String(i + 1).padStart(2, '0')}_Quiz_MoodleXML.xml`));
const plan = [
  {F:1,I:2,A:2}, {F:1,I:3,A:1}, {F:1,I:3,A:2}, {F:1,I:3,A:1},
  {F:2,I:4,A:1}, {F:1,I:3,A:2}, {F:1,I:2,A:3},
];

const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const questionBlocks = xml => [...xml.matchAll(/<question type="multichoice">[\s\S]*?<\/question>/g)].map(m => m[0]);
const questionName = block => block.match(/<name><text>(.*?)<\/text><\/name>/s)?.[1] ?? '';
const category = name => name.includes('_Foundational_') ? 'F' : name.includes('_Interpretation_') ? 'I' : 'A';
const rename = (block, lesson, seq, rigor) => block.replace(/<name><text>.*?<\/text><\/name>/s, `<name><text>WH_U04_UnitAssessment_L${lesson}_${rigor}_Q${String(seq).padStart(2,'0')}</text></name>`);
const catBlock = lesson => `<question type="category"><category><text>$course$/top/WH/U04/Unit Assessment/L${lesson}</text></category></question>`;

let assessment = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';
const chosenByLesson = [];
lessonFiles.forEach((file, index) => {
  const lesson = String(index + 1).padStart(2,'0');
  const groups = {F:[],I:[],A:[]};
  for (const block of questionBlocks(fs.readFileSync(file,'utf8'))) groups[category(questionName(block))].push(block);
  const selected = [];
  for (const rigor of ['F','I','A']) selected.push(...groups[rigor].slice(0, plan[index][rigor]).map(b => ({rigor, block:b})));
  if (selected.length !== Object.values(plan[index]).reduce((a,b)=>a+b,0)) throw new Error(`Insufficient questions for L${lesson}`);
  chosenByLesson.push(selected);
  assessment += `${catBlock(lesson)}\n`;
  selected.forEach((item, n) => assessment += `${rename(item.block, lesson, n + 1, item.rigor)}\n`);
});
assessment += '</quiz>\n';
fs.writeFileSync(path.join(root,'WH_U04_UnitAssessment_MoodleXML.xml'),assessment,'utf8');

// Ten broad diagnostic items: one from every lesson plus three additional lessons.
const preSelections = [chosenByLesson[0][0],chosenByLesson[1][1],chosenByLesson[2][2],chosenByLesson[3][1],chosenByLesson[4][3],chosenByLesson[5][2],chosenByLesson[6][1],chosenByLesson[2][4],chosenByLesson[4][5],chosenByLesson[6][4]];
let pretest = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n<question type="category"><category><text>$course$/top/WH/U04/Pretest</text></category></question>\n';
preSelections.forEach((item,n) => pretest += `${item.block.replace(/<name><text>.*?<\/text><\/name>/s, `<name><text>WH_U04_Pretest_Q${String(n+1).padStart(2,'0')}</text></name>`)}\n`);
pretest += '</quiz>\n';
fs.writeFileSync(path.join(root,'WH_U04_Pretest_MoodleXML.xml'),pretest,'utf8');

console.log('Wrote Unit 4 pretest: 10 questions');
console.log('Wrote Unit 4 assessment: 40 questions (8 foundational, 20 interpretation, 12 application)');
