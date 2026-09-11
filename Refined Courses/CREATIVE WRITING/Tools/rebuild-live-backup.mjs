import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';

// Mechanical conversion of the captured Moodle editor fields. No network access.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const live=path.join(root,'Live Moodle Source');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const write=(p,s)=>fs.writeFileSync(p,s+'\n','utf8');
const json=(p,o)=>write(p,JSON.stringify(o,null,2));
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const gift=s=>String(s??'').replaceAll('\\','\\\\').replace(/[~=#{}:]/g,'\\$&').replace(/\r?\n/g,' ');
const inventory=read(path.join(live,'Assessments/question-inventory.json'));
const records=fs.readdirSync(path.join(live,'Questions')).filter(f=>f.endsWith('.json')).map(f=>read(path.join(live,'Questions',f)));
const qid=q=>new URL(q.url).searchParams.get('id');
const get=(q,n)=>q.fields.find(f=>f.name===n)?.value??'';
const checked=(q,n)=>q.fields.find(f=>f.name===n)?.checked===true;
const byId=new Map(records.map(q=>[qid(q),q]));
if(records.length!==1350||byId.size!==1350||inventory.some(q=>!byId.has(qid(q))))throw Error('Question coverage is incomplete');
if(new Set(records.map(q=>get(q,'name'))).size!==1350)throw Error('Duplicate question names');
const fmt=(q,n)=>({'0':'moodle_auto_format','1':'html','2':'plain_text','4':'markdown'}[get(q,n)]||'html');
const tag=(n,s)=>`<${n}>${esc(s)}</${n}>`;
const rich=(n,s,f='html')=>`<${n} format="${f}"><text>${esc(s)}</text></${n}>`;
const answers=q=>q.fields.filter(f=>/^answer\[\d+\]\[text\]$/.test(f.name)&&f.value.trim()).map(f=>({i:Number(f.name.match(/\d+/)[0]),text:f.value}));
for(const q of records){
 const a=answers(q);
 if(!get(q,'questiontext[text]')||a.length!==4||a.filter(x=>Number(get(q,`fraction[${x.i}]`))===1).length!==1)throw Error('Question structure/scoring: '+get(q,'name'));
}
function xmlQuestion(q){
 let s='<question type="multichoice">'+rich('name',get(q,'name')).replace(' format="html"','');
 s+=rich('questiontext',get(q,'questiontext[text]'),fmt(q,'questiontext[format]'));
 s+=rich('generalfeedback',get(q,'generalfeedback[text]'),fmt(q,'generalfeedback[format]'));
 s+=tag('defaultgrade',get(q,'defaultmark'))+tag('penalty',get(q,'penalty'))+tag('hidden','0')+tag('idnumber',get(q,'idnumber'));
 s+=tag('single',get(q,'single')==='1'?'true':'false')+tag('shuffleanswers',checked(q,'shuffleanswers')?'true':'false')+tag('answernumbering',get(q,'answernumbering'))+tag('showstandardinstruction',get(q,'showstandardinstruction'));
 for(const n of ['correctfeedback','partiallycorrectfeedback','incorrectfeedback'])s+=rich(n,get(q,n+'[text]'),fmt(q,n+'[format]'));
 if(checked(q,'shownumcorrect'))s+='<shownumcorrect/>';
 for(const a of answers(q))s+=`<answer fraction="${Number(get(q,`fraction[${a.i}]`))*100}" format="${fmt(q,`answer[${a.i}][format]`)}"><text>${esc(a.text)}</text>${rich('feedback',get(q,`feedback[${a.i}][text]`),fmt(q,`feedback[${a.i}][format]`))}</answer>`;
 for(const h of q.fields.filter(f=>/^hint\[\d+\]\[text\]$/.test(f.name)&&f.value.trim())){const i=h.name.match(/\d+/)[0];s+=`<hint format="${fmt(q,`hint[${i}][format]`)}"><text>${esc(h.value)}</text>${checked(q,`hintclearwrong[${i}]`)?'<clearwrong/>':''}${checked(q,`hintshownumcorrect[${i}]`)?'<shownumcorrect/>':''}</hint>`;}
 if(get(q,'tags[]'))s+='<tags><tag><text>'+esc(get(q,'tags[]'))+'</text></tag></tags>';
 return s+'</question>';
}
function giftQuestion(q){
 let s=`::${gift(get(q,'name'))}::[html]${gift(get(q,'questiontext[text]'))} {\n`;
 for(const a of answers(q)){const fraction=Number(get(q,`fraction[${a.i}]`));s+=(fraction===1?'=':fraction===0?'~':`~%${fraction*100}%`)+gift(a.text)+'#'+gift(get(q,`feedback[${a.i}][text]`))+'\n';}
 if(get(q,'generalfeedback[text]'))s+='####'+gift(get(q,'generalfeedback[text]'))+'\n';
 return s+'}\n';
}
const activities=read(path.join(live,'Assessments/activity-inventory.json'));
const bankReports=[];
for(const a of activities){
 const id=new URL(a.url).searchParams.get('id');
 const map=read(path.join(live,'Assessments',id+'.json'));
 const settings=read(path.join(live,'Assessments',id+'-settings.json'));
 const qs=inventory.filter(q=>q.cmid===id).map(q=>byId.get(qid(q))).sort((a,b)=>get(a,'name').localeCompare(get(b,'name')));
 const u=String(Number(a.title.match(/^U(\d)/)[1])).padStart(2,'0');
 const isPre=/PRETEST/i.test(a.title), isFinal=/Final Assessment/.test(a.title);
 const l=isPre?null:isFinal?'08':String(Number(a.title.match(/L(\d)/)[1])).padStart(2,'0');
 const dir=path.join(root,'Units','Unit '+u,...(l?['Lesson '+l]:[]));
 const stem=`CW_U${u}`+(isPre?'_Pretest':`_L${l}_${isFinal?'UnitAssessment':'Quiz'}`);
 const expected=isPre?10:isFinal?40:25;
 const slots=Number(map.text.match(/Questions:\s*(\d+)/)?.[1]);
 if(qs.length!==expected||!slots)throw Error('Bank/slot mismatch '+a.title);
 write(path.join(dir,'Moodle XML',stem+'_MoodleXML.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n'+qs.map(xmlQuestion).join('\n')+'\n</quiz>');
 write(path.join(dir,stem+'.gift'),'// Derived from current Moodle editor fields. Use XML for full feedback and behavior fidelity.\n\n'+qs.map(giftQuestion).join('\n'));
 const metaPath=path.join(dir,isPre?'pretest.json':'quiz.json');
 const meta=read(metaPath);meta.questionBankSize=qs.length;meta.questionsPerAttempt=slots;meta.moodleActivityId=id;meta.liveSourceSettings=path.relative(dir,path.join(live,'Assessments',id+'-settings.json')).replaceAll('\\','/');meta.backupCapturedAt=settings.capturedAt;
 json(metaPath,meta);
 bankReports.push({activity:settings.activity,cmid:id,questions:qs.length,questionsPerAttempt:slots,xml:path.relative(root,path.join(dir,'Moodle XML',stem+'_MoodleXML.xml')).replaceAll('\\','/')});
}
const pageNames=['Lesson Overview','Vocabulary and Definitions','Lesson','Worked Example','Independent Work','Checkpoint'];
const units=[];
for(let u=1;u<=6;u++){
 const uu=String(u).padStart(2,'0'), unitDir=path.join(root,'Units','Unit '+uu);
 const source=read(path.join(live,'Units','Unit-'+uu+'.json'));
 const lessons=[...new Map(source.links.filter(x=>x.url.includes('/lesson/')&&x.title.startsWith(`U${u} L`)).map(x=>[x.url,x])).values()];
 if(lessons.length!==8)throw Error('Unit lesson count');
 let md=`# ${source.title}\n\nCurrent Moodle course 48 unit outline, captured September 5, 2026.\n\n## Lessons\n\n`;
 for(let l=1;l<=8;l++){
  const ll=String(l).padStart(2,'0'), dir=path.join(unitDir,'Lesson '+ll);
  const lesson=lessons.find(x=>new RegExp(`^U${u} L${l}:`).test(x.title));if(!lesson)throw Error('Missing lesson '+u+'/'+l);
  const title=lesson.title.replace(new RegExp(`^U${u} L${l}:\\s*`),'').replace(/\s+Lesson$/,'').split('\n')[0].trim();
  const metaPath=path.join(dir,'lesson.json'),meta=read(metaPath);meta.title=title;meta.lessonTitle=title;json(metaPath,meta);
  const pages=read(path.join(dir,'live-source.json')).pages;if(JSON.stringify(pages.map(p=>p.title))!==JSON.stringify(pageNames))throw Error('Page names/order');
  for(let p=1;p<=6;p++)if(fs.statSync(path.join(dir,'P0'+p+'.html')).size<50)throw Error('Empty page');
  md+=`${l}. [${title}](Lesson%20${ll}/P01.html)\n`;
 }
 md+='\n## Learning sequence and assessment\n\nEach lesson has six pages: Lesson Overview; Vocabulary and Definitions; Lesson; Worked Example; Independent Work; Checkpoint. Submit vocabulary and Independent Work through Notebook Evidence, and Checkpoint responses separately. Lessons 1–7 use lesson quizzes; Lesson 8 leads to the unit assessment.\n\nThe diagnostic pretest has 10 fixed questions. Lesson quizzes draw 5 questions from 25-question banks. The unit assessment draws 10 questions from its 40-question bank. Grade weights: pretest 0%; Notebook 20%; Checkpoint 20%; Quiz 30%; Unit Assessment 30%. See the captured settings for exact completion, attempt, and release conditions.\n\n## Authoritative recovery sources\n\n- The six HTML pages and live-source.json inside each lesson directory.\n- [Live unit outline and activity links](../../Live%20Moodle%20Source/Units/Unit-'+uu+'.json).\n- [Assessment settings and bank mappings](../../Live%20Moodle%20Source/Assessments/).\n- [Submission instructions and rubrics](../../Live%20Moodle%20Source/Submissions/).\n\nThis is a backup of live course content, not a new instructional-quality certification.\n';
 write(path.join(unitDir,'Unit Overview.md'),md);units.push({unit:u,lessons:8,pages:48});
}
const findings=records.filter(q=>q.fields.some(f=>typeof f.value==='string'&&f.value.includes('MLA.SPEECH'))).map(q=>({name:get(q,'name'),url:q.url,fields:q.fields.filter(f=>typeof f.value==='string'&&f.value.includes('MLA.SPEECH')).map(f=>f.name)}));
json(path.join(live,'CONTENT_FINDINGS.json'),findings);
const submissionCount=fs.readdirSync(path.join(live,'Submissions')).filter(f=>f.endsWith('.json')).length;
if(submissionCount!==96)throw Error('Submission coverage');
const report={verifiedAt:new Date().toISOString(),courseId:48,units,lessonPages:288,orientationPages:4,submissions:submissionCount,assessmentActivities:54,questionRecords:1350,uniqueQuestionIds:byId.size,missingQuestionIds:[],assessmentBanks:bankReports,liveContentWarnings:findings.length,fullMoodleArchiveIncluded:false};
json(path.join(live,'BACKUP_VALIDATION.json'),report);
const files=[];function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(e.name!=='SHA256SUMS.txt')files.push(p);}}walk(root);
write(path.join(live,'SHA256SUMS.txt'),files.sort().map(p=>crypto.createHash('sha256').update(fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n')).digest('hex')+'  '+path.relative(root,p).replaceAll('\\','/')).join('\n'));
console.log(JSON.stringify({questions:records.length,banks:bankReports.length,submissions:submissionCount,liveContentWarnings:findings.length},null,2));
