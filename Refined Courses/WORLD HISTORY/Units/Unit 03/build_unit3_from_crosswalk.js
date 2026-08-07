const fs = require('fs');
const path = require('path');

const root = __dirname;
const crosswalkDir = path.join(root, 'Crosswalk');
const pageNames = ['Lesson Overview','Learn the Historical Content','Historical Evidence Lab','Historical Thinking','Guided Investigation','Independent Investigation','Mastery Checkpoint Directions'];

function text(n) { return fs.readFileSync(path.join(crosswalkDir, `Lesson ${String(n).padStart(2,'0')}.txt`), 'utf8').replace(/\r/g,''); }
function one(src, re, fallback='') { const m=src.match(re); return m ? m[1].trim() : fallback; }
function between(src,a,b){ const i=src.indexOf(a); if(i<0)return ''; const j=src.indexOf(b,i+a.length); if(j<0)return ''; return src.slice(i+a.length,j).trim(); }
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function clean(s){return s.replace(/â€”/g,'—').replace(/â€“/g,'–').replace(/â€™/g,'’').replace(/â†’/g,'→').replace(/\u00a0/g,' ').trim();}
function render(raw){
  const lines=clean(raw).split('\n').map(x=>x.trim()).filter(Boolean);
  let out='', list=false;
  const close=()=>{if(list){out+='</ul>';list=false;}};
  for(const line of lines){
    if (/Codex|Production Readiness|Question Pool|Gradebook category|Use the approved|Suggested Resources|Approved Source Repositories/i.test(line)) continue;
    if (/^(Students must|Students should|Students answer|Students identify|Students complete|Students construct|Students evaluate|Students rank|Students record|Students analyze|Students compare|Students learn|Students examine|Students investigate|Students may|Students are)/i.test(line)) {close(); out+=`<p>${esc(line.replace(/^Students /,'You '))}</p>`; continue;}
    if (/^(Part [A-F]|Step \d+|Component \d+|Evidence [A-D]|Visual \d+|Required |Common mistake|Correction|Paragraph \d+|Investigation Question|Response Format|Recommended organization|Mastery Success Criteria|Lesson Focus|Student purpose)/i.test(line)){close();out+=`<h3>${esc(line)}</h3>`;continue;}
    if (/^\d+\.\s/.test(line)){close();out+=`<h3>${esc(line)}</h3>`;continue;}
    if (/^[A-Z][A-Za-z0-9 /&()'’,-]{2,55}$/.test(line) && !/[.!?]$/.test(line)){close();out+=`<h3>${esc(line)}</h3>`;continue;}
    if(!list){out+='<ul>';list=true;} out+=`<li>${esc(line)}</li>`;
  }
  close(); return out;
}
function vocab(src){
  const raw=between(src,'Required Vocabulary','Required Evidence and Visuals') || between(src,'Required Vocabulary','Required Historical Sources') || between(src,'Required Vocabulary','P03');
  const rows=[];
  for(const line of raw.split('\n')){const p=line.trim().split('\t'); if(p.length>=2 && !/^Term$/i.test(p[0])) rows.push([clean(p[0]),clean(p.slice(1).join(' '))]);}
  return rows;
}
function shell(n,title,page,body){return `<!doctype html><html><head><meta charset="utf-8"><title>WH U03 L${String(n).padStart(2,'0')} P${String(page).padStart(2,'0')}</title></head><body><main style="max-width:1000px;margin:0 auto;padding:24px;background:#fff;color:#24323d;font:16px/1.65 Arial,sans-serif"><header style="background:linear-gradient(135deg,#244f5f,#376f80);color:white;padding:24px 28px;border-radius:10px"><p style="margin:0">World History | Unit 3 | Lesson ${n} | Page ${page}</p><h1 style="margin:8px 0;font-size:30px">${esc(title)}</h1><p style="margin:0">${pageNames[page-1]}</p></header>${body}<section style="margin-top:22px;padding:16px 20px;border:2px solid #376f80;border-radius:8px;background:#f2f9fb"><h2 style="margin-top:0">Need help?</h2><p>Contact your Teacher of Record (TOR) before guessing. Tell your TOR the lesson, page, and exact step that is confusing.</p></section><footer style="margin-top:22px;border-top:2px solid #cbd7df;padding-top:14px"><strong>Navigation:</strong> Use Moodle’s Previous and Next buttons below. Review this page before selecting Next.</footer></main></body></html>`;}
function box(title,html,accent='#376f80'){return `<section style="border:1px solid #cbd7df;border-radius:9px;margin:20px 0;overflow:hidden"><h2 style="margin:0;padding:14px 18px;background:#e8f2f5;border-left:6px solid ${accent};font-size:22px">${esc(title)}</h2><div style="padding:18px 21px">${html}</div></section>`;}

for(let n=1;n<=8;n++){
 const src=text(n), title=one(src,/Lesson Title\s+(.+)/), iq=one(src,/Investigation Question\s+(.+)/), standards=one(src,/MLA Standards\s+(.+)/), primary=one(src,/Primary Historical-Thinking Skill\s+(.+)/), supporting=one(src,/Supporting Historical-Thinking Skills\s+(.+)/);
 const focus=between(src,'Lesson Focus','Required Historical Content');
 const content=between(src,'Required Historical Content','Required Vocabulary');
 const evidence=between(src,'Required Evidence and Visuals','Required Historical Sources') || between(src,'Required Historical Sources','Historical Evidence Lab Requirements');
 const lab=between(src,'Historical Evidence Lab Requirements','P04 Historical Thinking Specification');
 const thinking=between(src,'P04 Historical Thinking Specification','Historian’s Notebook Requirements') || between(src,'P04 Historical Thinking Specification',"Historian's Notebook Requirements");
 const independent=between(src,'Independent Investigation — P06','Notebook Evidence Submission');
 const cpStart=src.indexOf('Mastery Checkpoint — P07');
 let cpEnd=src.indexOf('Lesson Quiz Blueprint',cpStart);
 if(n===8){const l8End=src.indexOf('Lesson 8 Quiz',cpStart); if(l8End>0) cpEnd=l8End;}
 const checkpoint=cpStart>=0?src.slice(cpStart+'Mastery Checkpoint — P07'.length,cpEnd<0?src.length:cpEnd):'';
 const v=vocab(src);
 const nav=`<p><strong>Investigation Question:</strong> ${esc(iq)}</p>`;
 let p1=box('Investigation Question',`<p style="font-size:22px;font-weight:bold">${esc(iq)}</p>`)+box('What You Will Learn',render(focus))+box('Historical Thinking',`<p><strong>Primary skill:</strong> ${esc(primary)}</p><p><strong>Supporting skills:</strong> ${esc(supporting)}</p><p><strong>Standards:</strong> ${esc(standards)}</p>`)+box('Your Seven-Page Path','<ol>'+pageNames.map(x=>`<li>${esc(x)}</li>`).join('')+'</ol>');
 let vt='<table style="width:100%;border-collapse:collapse"><tr><th style="border:1px solid #8fa9b6;padding:8px;background:#dcecf1">Term</th><th style="border:1px solid #8fa9b6;padding:8px;background:#dcecf1">Meaning</th></tr>'+v.map(([a,b])=>`<tr><td style="border:1px solid #8fa9b6;padding:8px"><strong>${esc(a)}</strong></td><td style="border:1px solid #8fa9b6;padding:8px">${esc(b)}</td></tr>`).join('')+'</table>';
 let p2=box('Notebook Task: Vocabulary and Meaning',`<p>Write every term and its provided meaning in your Historian’s Notebook. This is a foundation task: copy accurately; you are not being asked to test yourself yet.</p>${vt}`)+box('Learn the Historical Content',render(content))+box('Notebook Notes to Keep',`<p>After reading, write a concise set of notes that answers: <em>What happened or developed? Who or what was involved? Why does it matter to the Investigation Question?</em> Use headings and short complete statements, not copied paragraphs.</p>`);
 let p3=box('Evidence Set',render(evidence))+box('How Historians Examine Evidence',render(lab))+box('Notebook Evidence to Submit',`<p>Complete the evidence table required above. For each source or visual, record what it shows, what it helps explain, and what it cannot prove by itself. These notes have merit because they become the evidence base for your investigation.</p>`);
 let p4=box('Apply the Skill',render(thinking))+box('Worked Example',`<p>Read the model carefully. Notice that it names specific evidence, explains the connection, and acknowledges limits. This page is an example; copying it into your notebook is optional and is not required for submission.</p>`,'#2f855a');
 let guidedTask=independent || focus;
 let p5=box('Guided Investigation',`${nav}<p>This is guided notebook work. Follow the reasoning sequence below. You are not expected to invent the process on your own.</p>${render(guidedTask)}`)+box('Meaningful Notebook Summary',`<p>Do not copy every instruction. Record one organized summary containing: the claim being tested, the strongest evidence, the reasoning that connects that evidence to the claim, and one limitation. This summary is required notebook evidence.</p>`,'#2f855a');
 let p6=box('Independent Investigation',`${nav}${render(independent)}`)+box('What Your Finished Product Should Look Like',`<table style="width:100%;border-collapse:collapse"><tr><th style="border:1px solid #8fa9b6;padding:8px;background:#dcecf1">Section</th><th style="border:1px solid #8fa9b6;padding:8px;background:#dcecf1">What the TOR should see</th></tr><tr><td style="border:1px solid #8fa9b6;padding:8px">Evidence</td><td style="border:1px solid #8fa9b6;padding:8px">Specific labeled details from every required evidence type</td></tr><tr><td style="border:1px solid #8fa9b6;padding:8px">Reasoning</td><td style="border:1px solid #8fa9b6;padding:8px">A clear explanation of how each detail supports the conclusion</td></tr><tr><td style="border:1px solid #8fa9b6;padding:8px">Organization</td><td style="border:1px solid #8fa9b6;padding:8px">The exact parts named above, in order, with headings</td></tr><tr><td style="border:1px solid #8fa9b6;padding:8px">Quality check</td><td style="border:1px solid #8fa9b6;padding:8px">Accurate vocabulary, complete sentences where requested, and one stated limitation or alternative</td></tr></table><p><strong>Example reasoning sentence:</strong> “The evidence shows ___; this matters because ___; however, this evidence alone cannot prove ___.” Replace each blank with lesson-specific information.</p>`);
 const nextAssessment=n===8?'Unit Assessment':'quiz';
 let p7=box('Mastery Checkpoint',`${nav}${render(checkpoint)}`)+box('Checkpoint Organization',`<ol><li><strong>Introduction:</strong> establish context and state a direct claim.</li><li><strong>Body:</strong> present the exact required evidence and explain how it supports the claim.</li><li><strong>Conclusion:</strong> answer the question, show the required historical-thinking skill, and explain significance or limits.</li></ol><p>Use this introduction–body–conclusion approach whenever a World History assignment requires developed writing.</p>`)+box('Checkpoint Checklist',`<ul><li>I answered the exact Investigation Question.</li><li>I met the required length and product format.</li><li>I included every required number and type of evidence.</li><li>I explained evidence instead of listing facts.</li><li>I used the required historical-thinking skill and lesson vocabulary.</li><li>I proofread for clarity and submitted to <strong>Lesson ${n} Mastery Checkpoint Submission</strong>.</li></ul><p>You need at least <strong>80% mastery</strong> to progress. If you do not reach 80%, meet with your TOR for feedback and then resubmit the checkpoint. The ${nextAssessment} opens only after you achieve 80%.</p>`,'#8a5a16');
 const dir=path.join(root,`Lesson ${String(n).padStart(2,'0')}`); fs.mkdirSync(dir,{recursive:true});
 [p1,p2,p3,p4,p5,p6,p7].forEach((p,i)=>fs.writeFileSync(path.join(dir,`P${String(i+1).padStart(2,'0')}.html`),shell(n,title,i+1,p),'utf8'));
 fs.writeFileSync(path.join(dir,'lesson.json'),JSON.stringify({course:'WORLD HISTORY',course_code:'WH',unit:3,lesson:n,title,role:n===8?'unit_synthesis':'instructional_lesson',page_count:7,standards:standards.split(',').map(x=>x.trim()),investigation_question:iq,primary_skill:primary,supporting_skills:supporting.split(',').map(x=>x.trim())},null,2)+'\n');
}
console.log('Built Unit 3 P01-P07 for Lessons 1-8 from the approved crosswalk files.');
