import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reasons=[
'Coherence is demonstrated by consistent claims and evidence across components, not by when the pieces were written. Matching the final artifact to the statement, revision trail, and presentation makes that consistency verifiable.',
'A fixed inventory establishes what must be checked and which versions are approved. A conclusion cannot establish whether required components, standards, or evidence are missing.',
'An author statement must analyze the version readers actually receive. Replacing outdated viewpoint claims with precise final-draft evidence repairs the mismatch while retaining meaningful craft analysis.',
'A revision trail must show a change and explain its effect. Comparing the earlier and revised scene makes changes in pacing visible; a final draft alone cannot demonstrate what improved.',
'Gap analysis compares requirements with the evidence available. Personal favorites do not reveal which required skills or connections are missing.',
'Privacy and unintended editing access are release-blocking risks. Cosmetic preferences can wait while the author protects information and ensures readers receive appropriate access.',
'Separate checks give each type of risk focused attention. The purpose is to find and repair omissions in craft, accessibility, rights, links, and version control, not to prevent revision.',
'Provenance establishes where an item came from, who owns it, and what permission supports its use. A peer score evaluates work but does not document its origin or rights.',
'A useful cross-reference lets readers locate the exact evidence behind a claim. Naming the final work and passage supports verification; matching icons do not connect a claim to textual evidence.',
'A digital poem must remain readable while preserving intentional line breaks. Test the actual mobile display and offer an accessible line-preserving version when needed; unreadably small text does not solve the problem.',
'Evidence-based craft reasoning identifies a specific revision and explains its effect on interpretation. The recurring door image supports an inference about avoidance; completion alone cannot prove artistic success.',
'A release candidate is an identified near-final package that has passed explicit checks. It must have a clear version and file identity so the checked package is the one readers receive.',
'The exported reader-facing file may behave differently from the editor. Opening that exact file and testing its links and media provides stronger evidence than relying on a single editor-screen inspection.',
'The excerpt and the portfolio must point to the same approved artifact. Presenting a draft that is absent from the portfolio breaks the evidence connection; heading count does not explain that mismatch.',
'Removing a name does not necessarily make a voice or personal details unidentifiable. Document consent before publication and review the recording for identifying information.',
'A readiness judgment requires stated criteria and evidence of checks, not a general impression. Portfolios can be evaluated by showing what was tested, what the results establish, and what limitations remain.',
'Begin with the criterion, present relevant evidence, explain how it was verified, acknowledge limitations, and then justify the judgment. Guessing or publishing before verification cannot support a defensible conclusion.',
'An artifact map links components to demonstrated skills, exact evidence, and standards. Unrelated quotations do not show which requirement each component fulfills.',
'First determine which ending was approved using the inventory and revision record. Giving both files the same final label hides the conflict instead of resolving it.',
'Accessible audio needs clear controls and an accurate text alternative; publication also requires appropriate consent. An unlabeled link neither explains the destination nor provides a transcript.',
'Alignment requires the presentation excerpt, craft claim, and revision example to match the final included work. Summarizing every artifact does not by itself establish that those specific connections are accurate.',
'A limitation can be accepted only if it is disclosed, does not breach a required criterion, and has a responsible plan. An unresolved private-link exposure is a release risk, not a harmless limitation.',
'Range concerns the different skills demonstrated, not just the number of artifacts or references. Repeating one technique while omitting a required poetry skill creates duplication and an evidence gap.',
'The actual release file is the evidence. If alternative text is missing, the checklist must be corrected and the file repaired; a checked box cannot make an inaccessible image accessible.',
'Mastery requires verified standards-based evidence, consistency across components, and successful access and rights checks. A quick glance is not a systematic verification process.',
'Select work for demonstrated craft and documented growth. Controlled nonlinear structure and a revision that improves reader orientation provide evidence; liking a title is only a preference.',
'A credible author statement names a purposeful technique and acknowledges a specific limitation. The sentence about fragments and a compressed transition is precise and reflective rather than vague or self-congratulatory.',
'A craft rationale explains how an exact textual choice serves a purpose and affects readers. Adjectives without evidence do not establish that relationship.',
'An earned ending grows from earlier causes, choices, and preparation. Trace what the ending depends on and revise those foundations; an unrelated surprise does not repair missing causality.',
'Controlled focalization limits information to an intentional perspective. Mara can observe Theo folding the letter but cannot know its hidden contents; purposeless movement between minds breaks that control.',
'A full scene gives readers time to experience and interpret a consequential choice or discovery. Moments without meaningful change can often be compressed so important turns receive appropriate emphasis.',
'Enjambment carries a sentence or phrase beyond a line ending. The interaction of syntax and line break can delay completion or shift pace, emphasis, and meaning; it does not guarantee humor.',
'Concrete cups, cooling, and steam make the feeling available through sensory detail. Naming a feeling and explaining that everyone left still states the emotion rather than embodying it in an image.',
'Reading alternative lineations aloud reveals how line breaks change breath, emphasis, pace, and ambiguity. Compare their effects in context; no single fixed sound meaning applies to every reading.',
'Intentional lineation is part of a poem’s meaning and pacing. Test the reader-facing display and supply an accessible alternative when necessary; merging every stanza into one paragraph removes deliberate structure.',
'Descriptive link text tells readers what they will reach even when read out of context. Naming the author’s revision reflection communicates the destination; “This” does not.',
'A voice may remain identifiable after its file name is removed. Obtain informed consent, document it, and provide accessible playback and an accurate transcript before release.',
'Choose a representative, self-contained excerpt that supports the presentation’s craft claim within its time limit. Ease of reading alone does not show that the passage is meaningful evidence.',
'Cut repetition that does not support the presentation’s purpose before removing essential analysis or closure. Keep a purposeful conclusion and audience invitation when they contribute to the planned communication.',
'An actual timed rehearsal and targeted listener responses reveal pacing and clarity. Planned duration alone cannot show how long delivery takes or whether listeners understand the craft claim.'
];
const findings=JSON.parse(fs.readFileSync(path.join(root,'Live Moodle Source/CONTENT_FINDINGS.json'),'utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const repairs=findings.map(f=>{
 const q=JSON.parse(fs.readFileSync(path.join(root,'Live Moodle Source/Questions',f.name+'.json'),'utf8'));
 const fields=Object.fromEntries(q.fields.map(x=>[x.name,x.value]));
 const n=Number(f.name.match(/Q(\d+)$/)[1]);
 if(Number(fields['fraction[0]'])!==1||!reasons[n-1])throw Error('Unexpected answer key');
 return {...f,generalFeedback:'<p>Craft explanation: '+escape(reasons[n-1])+'</p>',feedback:Array.from({length:4},(_,i)=>'<p>'+(i===0?'Correct. ':'Incorrect. ')+escape(reasons[n-1])+'</p>'),before:q};
});
fs.writeFileSync(path.join(root,'Live Moodle Source/feedback-repair-plan.json'),JSON.stringify(repairs,null,2)+'\n');
console.log('Prepared '+repairs.length+' targeted question-feedback repairs.');
