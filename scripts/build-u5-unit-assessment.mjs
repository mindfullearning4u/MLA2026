import{readFileSync,writeFileSync}from"node:fs";
const root=process.argv[2],out=process.argv[3];if(!root||!out)throw Error("Usage: node script <Moodle XML directory> <output>");
const plans={1:[0,5,6,15,16],2:[0,5,7,15,19],3:[0,5,8,15,20],4:[0,5,6,7,15,18],5:[0,5,7,9,15,18],6:[0,1,5,6,7,8,15],7:[0,5,6,7,8,15]};
const blocks=[];let serial=1;
for(const [lesson,indices]of Object.entries(plans)){
 const path=`${root}/WH_U05_L${String(lesson).padStart(2,"0")}_Quiz_Production_MoodleXML.xml`;
 const xml=readFileSync(path,"utf8");const qs=[...xml.matchAll(/<question type="multichoice">[\s\S]*?<\/question>/g)].map(x=>x[0]);if(qs.length!==25)throw Error(`Lesson ${lesson}: expected 25, found ${qs.length}`);
 blocks.push(`<question type="category"><category><text>$course$/top/Unit 5/Unit Assessment - Production/Lesson ${lesson}</text></category></question>`);
 for(const idx of indices){let q=qs[idx];const newId=`WH_U05_UA_L${lesson}_Q${String(serial).padStart(2,"0")}`;q=q.replace(/WH_U05_L\d{2}_Q\d{2}/g,newId);blocks.push(q);serial++;}
}
if(serial!==41)throw Error(`Expected 40 questions, built ${serial-1}`);
writeFileSync(out,`<?xml version="1.0" encoding="UTF-8"?><quiz>${blocks.join("")}</quiz>`,`utf8`);
