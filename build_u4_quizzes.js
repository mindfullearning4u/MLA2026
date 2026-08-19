const fs = require('fs');
const data = JSON.parse(fs.readFileSync('u4_quiz_data.json', 'utf8'));

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function questionXml(lesson, number, band, prompt, answers) {
  return `<question type="multichoice"><name><text>U4L${lesson} ${band} ${String(number).padStart(2, '0')}</text></name><questiontext format="html"><text><![CDATA[<p>${prompt}</p>]]></text></questiontext><defaultgrade>1.0000000</defaultgrade><penalty>0.3333333</penalty><hidden>0</hidden><single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>${answers.map((answer, index) => `<answer fraction="${index === 0 ? 100 : 0}" format="html"><text><![CDATA[<p>${answer}</p>]]></text><feedback format="html"><text></text></feedback></answer>`).join('')}</question>\n`;
}

for (let lesson = 1; lesson <= 7; lesson += 1) {
  const d = data[lesson];
  const questions = [];
  d.vocab.forEach(([term, definition]) => questions.push([
    'Foundational',
    `Which definition best matches ${term}?`,
    [definition, 'A policy that ended all international conflict immediately.', 'A military event unrelated to this lesson.', 'A claim that every group experienced the same outcome.']
  ]));
  d.facts.forEach(([prompt, correct, b, c, e]) => questions.push(['Content', prompt, [correct, b, c, e]]));
  d.topics.slice(0, 5).forEach((topic) => questions.push([
    'Source',
    `A historical source about ${topic} was created during this era. Which step should a historian take before using it as evidence?`,
    ['Identify its creator, date, audience, purpose, and relevant details, then corroborate it with other evidence.', 'Assume it represents every person living at the time.', 'Ignore its origin because all primary sources are equally reliable.', 'Use only the title and skip the source details.']
  ]));
  d.topics.slice(5, 10).forEach((topic, index) => questions.push([
    'Reasoning',
    `Which approach would best explain the historical significance of ${topic}?`,
    [`Connect ${topic} to its context, identify specific evidence, and explain how it changed later choices or outcomes.`, `State that ${topic} was important without evidence.`, `List dates but do not explain a relationship.`, `Assume ${topic} affected every group in exactly the same way.`]
  ]));
  for (let index = 0; index < 5; index += 1) {
    const a = d.topics[index];
    const b = d.topics[index + 5];
    questions.push([
      'Application',
      `Which method best analyzes the relationship between ${a} and ${b}?`,
      ['Establish chronology and context, use precise evidence for both developments, explain cause or consequence, and acknowledge limits.', 'Mention both developments without explaining how they are related.', 'Choose the more famous development as the only cause.', 'Assume a later event caused an earlier event.']
    ]);
  }
  if (questions.length !== 25) throw new Error(`Lesson ${lesson} generated ${questions.length} questions.`);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n<question type="category"><category><text>$course$/top/U4L${lesson} Q</text></category></question>\n`;
  questions.forEach((q, index) => { xml += questionXml(lesson, index + 1, q[0], esc(q[1]), q[2].map(esc)); });
  xml += '</quiz>\n';
  fs.writeFileSync(`USH_U04_L0${lesson}_Quiz_MoodleXML.xml`, xml);
}

console.log('Wrote seven Unit 4 lesson quiz banks with 25 questions each.');
