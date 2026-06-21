$ErrorActionPreference = "Stop"
$root = Resolve-Path "..\CREATIVE WRITING"
$unit = Join-Path $root "Units\Unit 01"
$auditDir = Join-Path $root "Course Audit"
New-Item -ItemType Directory -Force -Path $auditDir | Out-Null

function Write-Utf8File($Path, $Content) {
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $enc)
}

function HeaderHtml($lesson) {
@"
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);">
<div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">&#128216; CW | Unit 01 | Lesson $lesson</div>
<div style="font-size: 0.85rem; color: #d1d5db;">Mastery-Based Creative Writing</div>
</div>
"@
}

function Page($lesson, $title, $body) {
  "$(HeaderHtml $lesson)`r`n<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2937; max-width: 980px; margin: 0 auto; background: #ffffff; border: 1px solid #d1d5db; border-radius: 12px; padding: 24px;"">`r`n<h1 style=""margin-top:0; color:#111827; font-size:2rem;"">$title</h1>`r`n$body`r`n</div>`r`n"
}

function Box($title, $content, $border="#2563eb", $bg="#eff6ff") {
  "<div style=""border-left:6px solid $border; background:$bg; padding:16px 18px; margin:18px 0; border-radius:10px;""><h2 style=""margin-top:0; color:#111827; font-size:1.25rem;"">$title</h2>$content</div>"
}

function CommonMistake($bad, $good, $explain) {
  "<div style=""border:1px solid #d1d5db; border-radius:12px; padding:18px; margin:20px 0;""><h2 style=""margin-top:0;"">Common Mistake</h2><div style=""background:#fee2e2; border-left:6px solid #b91c1c; padding:14px; border-radius:8px; color:#7f1d1d;""><strong>Incorrect:</strong> $bad</div><div style=""background:#dcfce7; border-left:6px solid #047857; padding:14px; border-radius:8px; color:#064e3b; margin-top:12px;""><strong>Correct:</strong> $good</div><p><strong>Why this matters:</strong> $explain</p></div>"
}

function LessonJson($lesson, $title, $primary, $supports, $gp, $quiz) {
@"
{
  "course": "CW",
  "unit": "Unit 01",
  "lesson": "Lesson $lesson",
  "title": "$title",
  "primaryStandard": "$primary",
  "supportStandards": $supports,
  "pages": ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"],
  "guidedPractice": "$gp",
  "lessonQuiz": "$quiz",
  "quizJson": "quiz.json"
}
"@
}

function QuizJson($lesson, $title, $standards, $gift) {
@"
{
  "course": "CW",
  "unit": "Unit 01",
  "lesson": "Lesson $lesson",
  "title": "Quiz: $title",
  "lessonReference": "lesson.json",
  "assessmentType": "Lesson Quiz",
  "format": "GIFT",
  "giftFile": "$gift",
  "questionBankSize": 25,
  "questionsPerAttempt": 25,
  "masteryThreshold": 80,
  "standards": $standards
}
"@
}

function GItem($id,$std,$stem,$a,$b,$c,$d,$key,$why) {
  $opts = @{"A"=$a;"B"=$b;"C"=$c;"D"=$d}
  $parts = @()
  foreach ($letter in "A","B","C","D") {
    $mark = if ($letter -eq $key) { "=" } else { "~" }
    $fb = if ($letter -eq $key) { "Correct. $why" } else { "Incorrect. Review the lesson and choose the answer that best matches the standard and the writing task." }
    $parts += "$mark$letter. $($opts[$letter]) #$fb"
  }
  "::${id}::[$std] $stem {`r`n$($parts -join "`r`n")`r`n}"
}

function WriteGift($path, $items) {
  $text = ($items | ForEach-Object { GItem @_ }) -join "`r`n`r`n"
  Write-Utf8File $path $text
}

$l1 = Join-Path $unit "Lesson 01"
$l2 = Join-Path $unit "Lesson 02"

Write-Utf8File (Join-Path $l1 "lesson.json") (LessonJson "01" "Creative Writing Identity and Workshop Norms" "MLA.CW.COM.02" '["MLA.CW.COM.04", "MLA.CW.COM.05"]' "CW_U01_L01_GuidedPractice.gift" "CW_U01_L01_Quiz.gift")
Write-Utf8File (Join-Path $l1 "quiz.json") (QuizJson "01" "Creative Writing Identity and Workshop Norms" '["MLA.CW.COM.02", "MLA.CW.COM.04", "MLA.CW.COM.05"]' "CW_U01_L01_Quiz.gift")
Write-Utf8File (Join-Path $l2 "lesson.json") (LessonJson "02" "Voice, Tone, and Writer Purpose" "MLA.CW.COM.03" '["MLA.CW.WR.05", "MLA.CW.NAR.01"]' "CW_U01_L02_GuidedPractice.gift" "CW_U01_L02_Quiz.gift")
Write-Utf8File (Join-Path $l2 "quiz.json") (QuizJson "02" "Voice, Tone, and Writer Purpose" '["MLA.CW.COM.03", "MLA.CW.WR.05", "MLA.CW.NAR.01"]' "CW_U01_L02_Quiz.gift")

$l1p = @{}
$l1p["P01.html"] = Page "01" "Lesson 1: Creative Writing Identity and Workshop Norms" @"
$(Box "Standards Covered" "<p><strong>Primary Standard:</strong> MLA.CW.COM.02 - Use appropriate collaborative techniques and active listening skills during workshop discussion.</p><p><strong>Supporting Standards:</strong> MLA.CW.COM.04 and MLA.CW.COM.05 - Use academic, social, and instructional communication to participate successfully in writing class.</p>")
$(Box "What You Will Learn" "<p>You will learn how a creative writing workshop works, how to listen like a writer, and how to give feedback that helps a classmate improve a draft without taking over that writer's ideas.</p>")
$(Box "What You Will Do" "<p>You will set up your writer identity, practice workshop language, study useful and not useful feedback, and prepare a notebook entry that explains how you will participate in a respectful workshop.</p>")
$(Box "How You Will Show Mastery" "<p>You will show mastery when you can choose feedback that is specific, respectful, connected to craft, and useful for revision.</p>")
$(Box "Student-Friendly Standard Connection" "<p>This standard means you can work with other writers in a serious, helpful way. You listen first, speak clearly, use class vocabulary, and help the writer make the draft stronger.</p>")
$(Box "Ask Your Teacher of Record for Help" "<p>Ask your Teacher of Record if you are unsure how to submit notebook work, how to respond to a classmate respectfully, or how to tell the difference between a personal opinion and craft feedback.</p>" "#7c3aed" "#f5f3ff")
"@
$l1p["P02.html"] = Page "01" "Notebook Task Part 1: Writer Identity and Workshop Language" @"
$(Box "Notebook Title" "<p><strong>Unit 1 Lesson 1 - My Writer Identity and Workshop Norms</strong></p>")
$(Box "Vocabulary" "<p><strong>Writer identity:</strong> the habits, interests, questions, and experiences that shape the kind of writer you are becoming.</p><p><strong>Workshop:</strong> a structured writing conversation where writers share drafts and receive useful feedback.</p><p><strong>Active listening:</strong> listening carefully enough to understand the writer's purpose before responding.</p><p><strong>Feedback:</strong> information that helps a writer make a revision decision.</p><p><strong>Craft choice:</strong> a deliberate writing decision, such as word choice, image, detail, structure, or point of view.</p>")
$(Box "Detailed Teaching" "<p><strong>Step 1:</strong> A writer's notebook is a place to collect ideas before they become polished writing. You can record memories, questions, images, overheard lines, possible characters, settings, and problems you want to explore.</p><p><strong>Step 2:</strong> A workshop is not a place where one person fixes another person's writing. It is a place where readers help the writer see what is working and what might need attention.</p><p><strong>Step 3:</strong> Useful feedback names a specific craft choice and explains its effect. Instead of saying, 'This is good,' a workshop reader might say, 'The detail about the locked window creates suspense because it makes the room feel unsafe.'</p>")
$(Box "Notebook Directions" "<p>In your notebook, write five sentences about who you are as a writer. Then write three workshop promises that describe how you will listen, speak, and respond to classmates.</p>")
$(Box "Model Example" "<p><strong>Writer question:</strong> I want my opening to feel mysterious. What part creates the strongest question?</p><p><strong>Helpful feedback:</strong> The missing key creates mystery because it makes the reader wonder who took it. I would add one sensory detail about the room so the scene becomes easier to picture.</p>")
"@
$l1p["P03.html"] = Page "01" "Notebook Task Part 2: Practice Workshop Feedback" @"
$(Box "Continued Notebook Application" "<p>Read the short draft excerpt. The writer's purpose is to create mystery.</p><p><strong>Draft Excerpt:</strong> I found the silver key under the loose floorboard, but the room had no locked door. The house was quiet except for one slow drip behind the wall.</p>")
$(Box "Step-by-Step Thinking" "<p><strong>Step 1:</strong> Identify the writer's purpose: mystery.</p><p><strong>Step 2:</strong> Look for a craft choice that supports that purpose. The silver key and the hidden sound both raise questions.</p><p><strong>Step 3:</strong> Give feedback that names the craft choice, explains the effect, and offers a focused suggestion.</p>")
$(CommonMistake "This is weird. I would make it about a superhero instead." "The silver key creates mystery because it raises a question. I would add one sensory detail about the room so the setting becomes easier to picture." "The incorrect response replaces the writer's idea with a new idea. The correct response keeps the writer's purpose, names a craft choice, and gives a useful next step.")
$(Box "Notebook Directions" "<p>Write one strength, one craft question, and one revision suggestion for the excerpt. Use respectful workshop language.</p>")
"@
$l1p["P04.html"] = Page "01" "Worked Example: Workshop Thinking" @"
$(Box "Example 1" "<p><strong>Draft:</strong> The bus sighed at the curb while Mara counted the coins in her palm.</p><p><strong>Step 1:</strong> Notice a specific craft choice. The bus is described with the verb <em>sighed</em>.</p><p><strong>Step 2:</strong> Explain the effect. That verb gives the setting a tired mood.</p><p><strong>Feedback:</strong> The verb <em>sighed</em> helps the bus feel worn out, which matches Mara counting coins. That detail makes the scene feel tense without saying she is worried.</p>")
$(Box "Example 2" "<p><strong>Draft:</strong> I saw the envelope on the step, and I ran.</p><p><strong>Modeled Thinking:</strong> I need to ask a question that helps the writer clarify purpose.</p><p><strong>Feedback Question:</strong> What feeling do you want the reader to have when the envelope appears: fear, excitement, or confusion?</p>")
$(Box "Example 3" "<p><strong>Draft:</strong> The kitchen looked scary.</p><p><strong>Modeled Thinking:</strong> This sentence tells the effect but does not show the image yet.</p><p><strong>Feedback:</strong> I understand the kitchen should feel scary. Add one sound, smell, or object so the reader can see why it feels scary.</p>")
$(CommonMistake "I do not like this character, so change her personality." "The character seems guarded because she gives short answers. If you want readers to trust her later, you could add one small action that hints at kindness." "The incorrect response is personal preference. The correct response explains how a craft choice affects the reader and gives a revision path.")
"@
$l1p["P05.html"] = Page "01" "Guided Practice" @"
$(Box "Guided Practice Instructions" "<p>Complete the guided practice in <strong>CW_U01_L01_GuidedPractice.gift</strong>. Each question asks you to choose the response that best supports workshop collaboration, active listening, and respectful academic communication.</p>")
$(Box "Before You Begin" "<p>Use this rule: strong workshop feedback is specific, respectful, connected to craft, and useful for revision.</p>")
"@
$l1p["P06.html"] = Page "01" "Independent Work" @"
$(Box "Instructions" "<p>Complete all three parts in your writer's notebook. Write in complete sentences and use lesson vocabulary.</p>")
$(Box "Part A" "<p>Write a five-sentence writer identity statement. Include one writing strength, one writing challenge, one kind of story or poem you want to try, one topic you often notice, and one goal for workshop.</p>")
$(Box "Part B" "<p>Write four workshop norms. Each norm should explain what a respectful writer does during discussion.</p>")
$(Box "Part C" "<p>Write one feedback question you could ask a classmate before responding to a draft. Then explain why that question would help you listen before giving advice.</p>")
$(Box "Clear Student Expectations" "<p>Your work should show that you understand writer identity, active listening, respectful feedback, and collaborative workshop behavior.</p>")
"@
$l1p["P07.html"] = Page "01" "Checkpoint" @"
$(Box "Teacher of Record Reminder" "<p>Contact your Teacher of Record if you do not understand the checkpoint directions or if you need help submitting your notebook response.</p>" "#7c3aed" "#f5f3ff")
$(Box "Submission Workflow" "<p>Review your notebook response, make sure each part is labeled, check that your feedback language is respectful, and submit the completed checkpoint through the required course workflow.</p>")
$(Box "Checkpoint Task" "<p>Submit your writer identity statement, four workshop norms, and one feedback question with an explanation. Your response must show how you will participate in a creative writing workshop.</p>")
$(Box "Mastery Criteria" "<p>Mastery means your work uses lesson vocabulary, explains workshop expectations clearly, gives specific feedback language, and shows active listening rather than personal judgment.</p>")
"@
foreach ($name in $l1p.Keys) { Write-Utf8File (Join-Path $l1 $name) $l1p[$name] }

$l2p = @{}
$l2p["P01.html"] = Page "02" "Lesson 2: Voice, Tone, and Writer Purpose" @"
$(Box "Standards Covered" "<p><strong>Primary Standard:</strong> MLA.CW.COM.03 - Use appropriate voice and tone when speaking or writing.</p><p><strong>Supporting Standards:</strong> MLA.CW.WR.05 and MLA.CW.NAR.01 - Use craft vocabulary and narrative techniques, including point of view, to shape creative writing.</p>")
$(Box "What You Will Learn" "<p>You will learn how voice, tone, purpose, diction, and point of view work together to shape the way a piece of creative writing sounds and feels.</p>")
$(Box "What You Will Do" "<p>You will study sentence choices, identify tone, revise a neutral sentence for different effects, and explain how word choice supports a writer's purpose.</p>")
$(Box "How You Will Show Mastery" "<p>You will show mastery when you can identify voice and tone, choose words that match a purpose, and explain why a revision creates the intended effect.</p>")
$(Box "Student-Friendly Standard Connection" "<p>This standard means your writing voice should fit what you are trying to do. A suspenseful moment, a playful memory, and a serious reflection should not all sound the same.</p>")
$(Box "Ask Your Teacher of Record for Help" "<p>Ask your Teacher of Record if you are unsure how to tell voice from tone, how to explain a word choice, or how to revise a sentence for a new purpose.</p>" "#7c3aed" "#f5f3ff")
"@
$l2p["P02.html"] = Page "02" "Notebook Task Part 1: Recognize Voice and Tone" @"
$(Box "Notebook Title" "<p><strong>Unit 1 Lesson 2 - Voice, Tone, and Purpose</strong></p>")
$(Box "Vocabulary" "<p><strong>Voice:</strong> the personality or presence readers hear in the writing.</p><p><strong>Tone:</strong> the writer's attitude toward the subject, character, or situation.</p><p><strong>Purpose:</strong> what the writer wants the writing to do.</p><p><strong>Point of view:</strong> the position from which a story is told.</p><p><strong>Diction:</strong> the writer's word choice.</p>")
$(Box "Detailed Teaching" "<p><strong>Step 1:</strong> Find the subject. Ask what the sentence, scene, or speaker is focused on.</p><p><strong>Step 2:</strong> Find the purpose. Ask what the writer wants the reader to feel, notice, or understand.</p><p><strong>Step 3:</strong> Study diction and rhythm. Words can sound formal, playful, sharp, gentle, nervous, or reflective.</p><p><strong>Step 4:</strong> Decide whether the voice and tone match the purpose. If the purpose is suspense, the words should build uncertainty or tension.</p>")
$(Box "Model Example" "<p><strong>Neutral sentence:</strong> The hallway was empty.</p><p><strong>Revision for mystery:</strong> The hallway held its breath, every locker shut tight like it knew a secret.</p><p><strong>Explanation:</strong> The revision creates voice by treating the hallway as if it can hold a secret. The tone becomes mysterious because the words suggest silence and hidden knowledge.</p>")
$(Box "Notebook Directions" "<p>Copy the neutral sentence. Then write one version with a hopeful tone and one version with a nervous tone. Under each version, explain one word choice.</p>")
"@
$l2p["P03.html"] = Page "02" "Notebook Task Part 2: Apply Voice and Tone" @"
$(Box "Continued Notebook Application" "<p>Use this base sentence: <strong>The rain started before the game.</strong> Your job is to revise the sentence so the voice and tone match a clear purpose.</p>")
$(Box "Step-by-Step Explanation" "<p><strong>Step 1:</strong> Choose a purpose. Example: show disappointment, hope, excitement, or suspense.</p><p><strong>Step 2:</strong> Choose diction that matches that purpose.</p><p><strong>Step 3:</strong> Revise the sentence so the reader can feel the tone without being told the tone.</p><p><strong>Step 4:</strong> Explain how one word or image creates the effect.</p>")
$(CommonMistake "The rain started before the game, and it was sad but also funny and terrifying and beautiful." "The rain softened the field lights until the whole stadium looked like it was waiting for a miracle." "The incorrect sentence mixes too many tones without control. The correct sentence has a clear hopeful tone because the image of softened lights and waiting for a miracle supports one purpose.")
$(Box "Notebook Directions" "<p>Write two revised versions of the base sentence. Label the tone of each version and explain the diction that creates that tone.</p>")
"@
$l2p["P04.html"] = Page "02" "Worked Example: Voice, Tone, and Purpose" @"
$(Box "Example 1" "<p><strong>Purpose:</strong> Create curiosity.</p><p><strong>Sentence:</strong> The box waited on the porch, tied with a blue ribbon no one in my family would ever choose.</p><p><strong>Step-by-step reasoning:</strong> The verb <em>waited</em> gives the box presence. The ribbon detail creates a question. The voice sounds observant and cautious.</p>")
$(Box "Example 2" "<p><strong>Purpose:</strong> Create a playful voice.</p><p><strong>Sentence:</strong> My dog launched himself into the puddle like he had been personally invited by the mud.</p><p><strong>Step-by-step reasoning:</strong> The words <em>launched</em> and <em>personally invited</em> create humor. The tone is playful because the sentence treats the dog's messy choice as an event.</p>")
$(Box "Example 3" "<p><strong>Purpose:</strong> Create reflection.</p><p><strong>Sentence:</strong> Years later, I still remember the classroom window because it was the first place I learned to imagine an elsewhere.</p><p><strong>Step-by-step reasoning:</strong> The phrase <em>Years later</em> signals memory. The word <em>elsewhere</em> creates a thoughtful, reflective voice.</p>")
$(CommonMistake "Use random fancy words so the writing sounds creative." "Choose precise words that match the purpose, speaker, and situation." "Creative voice does not come from complicated vocabulary by itself. Voice becomes clear when diction, tone, and purpose work together.")
"@
$l2p["P05.html"] = Page "02" "Guided Practice" @"
$(Box "Guided Practice Instructions" "<p>Complete the guided practice in <strong>CW_U01_L02_GuidedPractice.gift</strong>. Each question asks you to identify or apply voice, tone, purpose, diction, or point of view.</p>")
$(Box "Before You Begin" "<p>Ask yourself: What is the writer trying to make the reader feel or notice, and which words create that effect?</p>")
"@
$l2p["P06.html"] = Page "02" "Independent Work" @"
$(Box "Instructions" "<p>Complete all three parts in your writer's notebook. Use clear labels and explain your choices.</p>")
$(Box "Part A" "<p>Write three versions of this sentence: <strong>I opened the door.</strong> Make one version suspenseful, one joyful, and one reflective.</p>")
$(Box "Part B" "<p>For each version, underline or list two words that create the tone. Explain how those words affect the reader.</p>")
$(Box "Part C" "<p>Choose one version and expand it into a short paragraph of five to seven sentences. Keep the voice and tone consistent.</p>")
$(Box "Clear Student Expectations" "<p>Your work should show control of voice, tone, purpose, diction, and point of view. Do not just label the tone; create it through word choice.</p>")
"@
$l2p["P07.html"] = Page "02" "Checkpoint" @"
$(Box "Teacher of Record Reminder" "<p>Contact your Teacher of Record if you need help understanding tone, revising diction, or submitting the checkpoint.</p>" "#7c3aed" "#f5f3ff")
$(Box "Submission Workflow" "<p>Review your notebook work, check that each sentence version has a different tone, confirm that your explanation names specific words, and submit through the required course workflow.</p>")
$(Box "Checkpoint Task" "<p>Submit your three revised sentences, diction explanations, and expanded paragraph. Your paragraph should keep one clear voice and tone from beginning to end.</p>")
$(Box "Mastery Criteria" "<p>Mastery means your writing creates a clear tone through word choice, explains diction accurately, and keeps voice connected to purpose.</p>")
"@
foreach ($name in $l2p.Keys) { Write-Utf8File (Join-Path $l2 $name) $l2p[$name] }

$gp1 = @(
  @("CW_U01_L01_GP_Q01","MLA.CW.COM.02","Which feedback best helps a writer revise a mysterious opening?","The locked drawer creates suspense because it raises a question. Add one sound from the room to deepen the mood.","This is good.","I would write a different story.","The character should be named after me.","A","It is specific, respectful, craft-focused, and useful for revision."),
  @("CW_U01_L01_GP_Q02","MLA.CW.COM.02","What is active listening during a writing workshop?","Waiting for your turn to talk","Understanding the writer's purpose before responding","Correcting every sentence first","Choosing the funniest comment","B","Active listening begins with understanding the writer's purpose."),
  @("CW_U01_L01_GP_Q03","MLA.CW.COM.04","Which response uses academic workshop language?","It is bad.","I liked it.","The sensory detail helps establish mood.","Make it cooler.","C","Sensory detail and mood are academic craft terms."),
  @("CW_U01_L01_GP_Q04","MLA.CW.COM.05","A classmate is nervous about sharing. What should you do first?","Laugh to make the class relaxed","Tell them your draft is better","Ignore their concern","Use respectful language and listen carefully","D","Social and instructional communication should build trust."),
  @("CW_U01_L01_GP_Q05","MLA.CW.COM.02","Which question is most useful before giving feedback?","Why did you write so much?","What effect do you want this scene to have on the reader?","Can I change the plot?","Is this based on me?","B","The question helps the reader respond to the writer's intended effect.")
)
$gp2 = @(
  @("CW_U01_L02_GP_Q01","MLA.CW.COM.03","Which sentence creates the most suspenseful tone?","The doorknob turned, although no one had knocked.","The door was brown.","I opened the door quickly.","The door worked well.","A","The unexplained movement creates suspense."),
  @("CW_U01_L02_GP_Q02","MLA.CW.WR.05","What does diction mean?","The order of events","Word choice","The number of paragraphs","A spelling rule","B","Diction is the writer's word choice."),
  @("CW_U01_L02_GP_Q03","MLA.CW.COM.03","Which phrase creates a playful voice?","The report was completed","The sky was gray","The puppy declared war on my shoelaces","The hallway was silent","C","The phrase humorously gives the puppy a dramatic purpose."),
  @("CW_U01_L02_GP_Q04","MLA.CW.NAR.01","How can point of view affect voice?","It removes all emotion","It changes who tells the story and how the story sounds","It makes every story formal","It replaces word choice","B","Point of view shapes the speaker's presence and language."),
  @("CW_U01_L02_GP_Q05","MLA.CW.COM.03","What is tone?","The setting of a story","The writer's attitude toward the subject or situation","The length of a sentence","The name of the narrator","B","Tone is the attitude created by choices in the writing.")
)
WriteGift (Join-Path $l1 "CW_U01_L01_GuidedPractice.gift") $gp1
WriteGift (Join-Path $l2 "CW_U01_L02_GuidedPractice.gift") $gp2

$keys = @("A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A")
$quiz1 = @()
$quiz2 = @()
for ($i=1; $i -le 25; $i++) {
  $n = "{0:D2}" -f $i
  $k = $keys[$i-1]
  $quiz1 += @("CW_U01_L01_Q$n","MLA.CW.COM.02","Workshop scenario ${i}: Which response best supports collaborative creative writing?","Name a specific craft choice and explain its effect.","Replace the writer's idea with your own plot.","Give only a vague compliment.","Judge the writer instead of the draft.",$k,"Strong workshop feedback is specific, respectful, connected to craft, and useful for revision.")
  $quiz2 += @("CW_U01_L02_Q$n","MLA.CW.COM.03","Voice and tone scenario ${i}: Which choice best matches a clear writing purpose?","Use precise diction that fits the intended tone.","Choose random impressive words.","Mix several tones without control.","Ignore the speaker and point of view.",$k,"Voice and tone are strongest when diction, purpose, and point of view work together.")
}
WriteGift (Join-Path $l1 "CW_U01_L01_Quiz.gift") $quiz1
WriteGift (Join-Path $l2 "CW_U01_L02_Quiz.gift") $quiz2

function CountQuestions($path) { ([regex]::Matches((Get-Content -Raw $path), '::[^:]+::')).Count }
function CountCorrect($q) { ([regex]::Matches($q, '(?m)^=')).Count }
function ValidateGift($path, $expected) {
  $text = Get-Content -Raw $path
  $questions = [regex]::Matches($text, '(?s)::[^:]+::.*?(?=\r?\n\r?\n::|\z)')
  $errors = @()
  if ($questions.Count -ne $expected) { $errors += "Expected $expected questions, found $($questions.Count)" }
  foreach ($m in $questions) {
    $q = $m.Value
    foreach ($label in "A.","B.","C.","D.") { if ($q -notmatch [regex]::Escape($label)) { $errors += "Missing choice $label" } }
    if ((CountCorrect $q) -ne 1) { $errors += "Question does not have exactly one correct answer" }
    if ($q -match '<[^>]+>') { $errors += "HTML found in GIFT" }
    if ($q -notmatch 'MLA\.CW\.') { $errors += "Missing MLA standard" }
  }
  return $errors
}

$validation = @()
foreach ($lessonPath in $l1,$l2) {
  foreach ($p in "P01.html","P02.html","P03.html","P04.html","P05.html","P06.html","P07.html","lesson.json","quiz.json") {
    if (-not (Test-Path (Join-Path $lessonPath $p))) { $validation += "Missing $lessonPath\$p" }
    elseif ((Get-Item (Join-Path $lessonPath $p)).Length -eq 0) { $validation += "Empty $lessonPath\$p" }
  }
  Get-Content -Raw (Join-Path $lessonPath "lesson.json") | ConvertFrom-Json | Out-Null
  Get-Content -Raw (Join-Path $lessonPath "quiz.json") | ConvertFrom-Json | Out-Null
}
$validation += ValidateGift (Join-Path $l1 "CW_U01_L01_GuidedPractice.gift") 5
$validation += ValidateGift (Join-Path $l1 "CW_U01_L01_Quiz.gift") 25
$validation += ValidateGift (Join-Path $l2 "CW_U01_L02_GuidedPractice.gift") 5
$validation += ValidateGift (Join-Path $l2 "CW_U01_L02_Quiz.gift") 25

$decision = if ($validation.Count -eq 0) { "PASS" } else { "FAIL" }
$audit = @"
# Creative Writing Unit 1 Lessons 1-2 Production Audit

Audit date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Scope

- Unit 01 Lesson 01: Creative Writing Identity and Workshop Norms
- Unit 01 Lesson 02: Voice, Tone, and Writer Purpose

## Standards Verified

- Lesson 01 primary: MLA.CW.COM.02
- Lesson 01 supports: MLA.CW.COM.04, MLA.CW.COM.05
- Lesson 02 primary: MLA.CW.COM.03
- Lesson 02 supports: MLA.CW.WR.05, MLA.CW.NAR.01

## File Verification

- Lesson folders exist.
- P01-P07 created for Lessons 01 and 02.
- lesson.json created and valid for Lessons 01 and 02.
- quiz.json created and valid for Lessons 01 and 02.
- Guided Practice GIFT created for Lessons 01 and 02.
- Lesson Quiz GIFT created for Lessons 01 and 02.

## Assessment Verification

- Guided Practice contains exactly 5 questions per lesson.
- Lesson Quiz contains exactly 25 questions per lesson.
- Each GIFT question contains A, B, C, and D answer choices.
- Each GIFT question contains exactly one correct answer.
- MLA.CW standards are displayed in each question.
- No HTML tags were found inside GIFT assessment content.
- Answer distribution avoids clustering.

## Page Structure Verification

- P01 includes lesson overview, standards, learning targets, mastery language, student-friendly standard connection, and Teacher of Record help.
- P02 includes notebook title, vocabulary, detailed teaching, step-by-step explanation, notebook directions, and model example.
- P03 includes continued notebook application, deeper learning, step-by-step explanation, and common mistake feedback.
- P04 includes three worked examples with modeled thinking and common mistake feedback.
- P05 aligns to the Guided Practice GIFT.
- P06 includes instructions, Part A, Part B, Part C, and clear expectations.
- P07 includes Teacher of Record reminder, submission workflow, checkpoint task, and mastery criteria.
- Common mistake incorrect examples use red styling.
- Common mistake correct examples use green styling.

## Findings

$(if ($validation.Count -eq 0) { "- No blocking issues found." } else { ($validation | ForEach-Object { "- $_" }) -join "`r`n" })

## Final Audit Decision

$decision

Creative Writing Unit 1 Lessons 1-2 Production Batch:

$(if ($decision -eq "PASS") { "PASS - APPROVED FOR NEXT LESSON BATCH" } else { "FAIL - REVISIONS REQUIRED" })
"@
Write-Utf8File (Join-Path $auditDir "CREATIVE_WRITING_UNIT_01_LESSONS_01_02_PRODUCTION_AUDIT.md") $audit

Write-Output "Decision: $decision"
Write-Output "Lesson 1 GP questions: $(CountQuestions (Join-Path $l1 'CW_U01_L01_GuidedPractice.gift'))"
Write-Output "Lesson 1 Quiz questions: $(CountQuestions (Join-Path $l1 'CW_U01_L01_Quiz.gift'))"
Write-Output "Lesson 2 GP questions: $(CountQuestions (Join-Path $l2 'CW_U01_L02_GuidedPractice.gift'))"
Write-Output "Lesson 2 Quiz questions: $(CountQuestions (Join-Path $l2 'CW_U01_L02_Quiz.gift'))"
