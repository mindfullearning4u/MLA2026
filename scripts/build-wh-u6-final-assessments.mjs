import{readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';
const dir=join(process.cwd(),'Refined Courses','WORLD HISTORY','Units','Unit 06','Moodle XML');
const lessonFiles=Array.from({length:7},(_,i)=>join(dir,`WH_U06_L0${i+1}_Quiz_MoodleXML.xml`));
const blocks=s=>[...s.matchAll(/<question type="multichoice">[\s\S]*?<\/question>/g)].map(m=>m[0]);
const name=q=>(q.match(/<name><text>([\s\S]*?)<\/text><\/name>/)||[])[1]||'';
const rigor=q=>{const n=name(q);if(/\bF\d|\[foundation\]/i.test(n))return'foundation';if(/\bI\d|\[interpretation\]/i.test(n))return'interpretation';if(/\bA\d|\[application\]/i.test(n))return'application';throw Error(`Unknown rigor ${n}`)};
const pools=lessonFiles.map(f=>{const qs=blocks(readFileSync(f,'utf8'));return{foundation:qs.filter(q=>rigor(q)==='foundation'),interpretation:qs.filter(q=>rigor(q)==='interpretation'),application:qs.filter(q=>rigor(q)==='application')}});
const rename=(q,prefix,lesson,idx)=>q.replace(/<name><text>[\s\S]*?<\/text><\/name>/,`<name><text>${prefix} L${lesson} Q${String(idx).padStart(2,'0')} ${rigor(q)} MLA.WH Unit 6</text></name>`);
const cat=t=>`<question type="category"><category><text>$course$/top/${t}</text></category></question>`;
const xml=qs=>`<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n${qs.join('\n')}\n</quiz>\n`;
// Exact assessment blueprint: L1 5, L2 6, L3 6, L4 6, L5 5, L6 6, L7 6; total 8F/20I/12A.
const plan=[[1,2,2],[1,3,2],[1,3,2],[1,3,2],[1,3,1],[1,3,2],[2,3,1]];
let unit=[];let totals={foundation:0,interpretation:0,application:0};
for(let l=1;l<=7;l++){unit.push(cat(`Unit 6 Assessment - Lesson ${l}`));let idx=1;for(const [type,count] of [['foundation',plan[l-1][0]],['interpretation',plan[l-1][1]],['application',plan[l-1][2]]]){for(const q of pools[l-1][type].slice(0,count)){unit.push(rename(q,'WH U06 UA',l,idx++));totals[type]++}}}
writeFileSync(join(dir,'WH_U06_UnitAssessment_Stratified_MoodleXML.xml'),xml(unit),'utf8');
writeFileSync(join(dir,'WH_U06_UnitAssessment_MoodleXML.xml'),xml(unit),'utf8');
// Ten fixed diagnostic items: all seven lessons, with extra transfer items from Lessons 1–3.
const picks=[[1,'foundation',0],[1,'interpretation',0],[2,'foundation',0],[2,'application',0],[3,'foundation',0],[3,'interpretation',0],[4,'interpretation',0],[5,'interpretation',0],[6,'interpretation',0],[7,'application',0]];
let pre=[cat('Unit 6 Pretest - Production')];picks.forEach(([l,t,i],k)=>pre.push(rename(pools[l-1][t][i],'WH U06 PRE',l,k+1)));
writeFileSync(join(dir,'WH_U06_Pretest_MoodleXML.xml'),xml(pre),'utf8');
console.log(JSON.stringify({unitQuestions:unit.filter(x=>x.includes('multichoice')).length,rigor:totals,pretestQuestions:10},null,2));
