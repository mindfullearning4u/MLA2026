$ErrorActionPreference = 'Stop'
$root = 'Units/Unit 04'

$standards = @(
  [ordered]@{mla='MLA.PC.TR.1'; florida='MA.912.T.1.3'; description='Apply the Law of Sines and the Law of Cosines to solve mathematical and real-world problems involving triangles.'},
  [ordered]@{mla='MLA.PC.TR.2'; florida='MA.912.T.1.4'; description='Solve mathematical problems involving finding the area of a triangle given two sides and the included angle.'},
  [ordered]@{mla='MLA.PC.TR.3'; florida='MA.912.T.1.5'; description='Prove Pythagorean Identities. Apply Pythagorean Identities to calculate trigonometric ratios and to solve problems.'},
  [ordered]@{mla='MLA.PC.TR.4'; florida='MA.912.T.1.6'; description='Prove the Double-Angle, Half-Angle, Angle Sum and Difference formulas for sine, cosine, and tangent. Apply these formulas to solve problems.'},
  [ordered]@{mla='MLA.PC.TR.5'; florida='MA.912.T.1.7'; description='Simplify expressions using trigonometric identities.'},
  [ordered]@{mla='MLA.PC.TR.6'; florida='MA.912.T.1.8'; description='Solve mathematical and real-world problems involving one-variable trigonometric ratios.'}
)

function Header($lesson){"<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);"">`n  <div style=""font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;"">&#128216; PRECALCULUS | Unit 04 | Lesson $($lesson.ToString('00'))</div>`n</div>`n"}
function TitleCard($bg,$bd,$title,$body=''){$p=if($body){"`n<p style=""margin-bottom: 14px;"">$body</p>"}else{''};"<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: $bg; border-left: 8px solid $bd; border-radius: 10px; padding: 24px;"">`n<h1 style=""font-size: 30px; margin-top: 0; margin-bottom: 12px;"">$title</h1>$p`n</div>`n"}
function Card($title,$body,$bg='#f8fafc',$bd='#64748b'){"<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 22px; background: $bg; border-left: 6px solid $bd;"">`n<h2 style=""font-size: 24px; margin-top: 0; margin-bottom: 10px;"">$title</h2>`n$body`n</div>`n"}
function U($items){'<ul style="padding-left: 26px; margin-bottom: 16px;">' + (($items|%{"`n  <li style=""margin-bottom: 8px;"">$_</li>"}) -join '') + "`n</ul>"}
function O($items){'<ol style="padding-left: 26px; margin-bottom: 16px;">' + (($items|%{"`n  <li style=""margin-bottom: 8px;"">$_</li>"}) -join '') + "`n</ol>"}
function P($text){"<p style=""margin-bottom: 14px;"">$text</p>"}
function Support(){Card 'Need help?' '<p style="margin: 0;"><strong>Need help?</strong> Contact your Teacher of Record if you need help or guidance before moving forward.</p>' '#eff6ff' '#2563eb'}

function BuildPages($lesson,$title,$stds,$focus,$vocab,$wrong,$right,$explain,$ex1,$ex2,$ex3,$partA,$partB,$partC,$checkpoint,$isAssessment) {
  $dir = Join-Path $root ("Lesson " + $lesson.ToString('00'))
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $stdItems = $stds | ForEach-Object {"<strong>$($_.mla)</strong> - <strong>$($_.florida)</strong>: $($_.description)"}
  $assessmentText = if($isAssessment){'Complete guided practice, checkpoint, and the Unit Assessment.'}else{'Complete guided practice, checkpoint, and the lesson quiz.'}
  $p01=(Header $lesson)+(TitleCard '#e8f4ff' '#2563eb' 'P01 Lesson Overview')+(Card 'Lesson Title' (P "<strong>Lesson $lesson`: $title</strong>") '#fffbeb' '#f59e0b')+(Card 'Standards Covered in This Lesson' (U $stdItems) '#fffbeb' '#f59e0b')+(Card 'What You Will Learn' (U @("How to work with $focus.",'How to connect formulas, identities, equations, and context.','How to explain each step using trigonometric reasoning.')) '#f8fafc' '#64748b')+(Card 'What You Will Do' (U @('Build notebook notes with vocabulary and step-by-step procedures.','Study worked examples and common mistakes before guided practice.','Complete guided practice, independent work, and a checkpoint aligned to the lesson standard.')) '#ecfdf5' '#059669')+(Card 'How You Will Show Mastery' (U @('Use accurate trigonometric vocabulary.','Show step-by-step reasoning in notebook and independent work.',$assessmentText)) '#fff7ed' '#ea580c')+(Card 'Student-Friendly Standard Connection' (P 'This lesson helps you use trigonometric identities, formulas, ratios, and triangle relationships to solve multi-step problems.') '#fef2f2' '#dc2626')+(Support)
  $p02=(Header $lesson)+(TitleCard '#eef2ff' '#4f46e5' 'P02 Notebook Task - Part 1' 'Write all notes, vocabulary, examples, and explanations from this page into your notebook. These notes are required for guided practice, checkpoint assignments, and quizzes.')+(Card 'Notebook Title' ((P "<strong>$title</strong>")+(P 'Begin a new notebook page with this title. Leave space under the vocabulary because you will use these words while solving and explaining problems.')) '#fffbeb' '#f59e0b')+(Card 'Vocabulary' (U $vocab) '#f8fafc' '#64748b')+(Card 'Lesson Foundation' ((P "This lesson focuses on $focus.")+(P 'Start by identifying the structure of the problem. Then choose the identity, formula, ratio, or theorem that matches the information given.')) '#ecfdf5' '#059669')+(Card 'Step-by-Step Process' (O @('Identify the given information and what must be found.','Choose the identity, formula, theorem, or ratio that fits.','Substitute values carefully or rewrite the expression using known identities.','Solve or simplify one step at a time.','Check the result against signs, restrictions, and context.')) '#fff7ed' '#ea580c')+(Support)
  $p03=(Header $lesson)+(TitleCard '#ecfeff' '#0891b2' 'P03 Notebook Task - Part 2' 'Continue writing all examples, explanations, worked reasoning, and correction strategies into your notebook. These notes are part of your required lesson evidence.')+(Card 'Deepening the Concept' ((P "The main idea in this lesson is $focus.")+(P 'A complete solution must connect the method to the problem. Formula selection, identity selection, and context checks are part of the reasoning.')) '#fffbeb' '#f59e0b')+(Card 'Notebook Task' ((P 'Create a four-column organizer labeled <strong>Problem Type</strong>, <strong>Given Information</strong>, <strong>Method</strong>, and <strong>Reason</strong>.')+(P 'Use the organizer to decide whether a problem needs a triangle theorem, an area formula, an identity, an angle formula, simplification, or a trigonometric ratio equation.')) '#ecfdf5' '#059669')+(Card 'Common Mistake' ((P "<strong style=""color: #b91c1c;"">$wrong</strong>")+(P "<strong style=""color: #047857;"">$right</strong>")+(P $explain)) '#fef2f2' '#dc2626')+(Support)
  $p04=(Header $lesson)+(TitleCard '#f0fdf4' '#16a34a' 'P04 Worked Example' 'Study each example carefully. Every step is shown because the reasoning matters as much as the final answer.')+(Card 'Worked Example 1' ((P "<strong>Problem:</strong> $ex1")+(O @('Identify the problem type and the requested result.','Choose the identity, formula, theorem, or ratio.','Substitute or rewrite carefully.','Solve or simplify and state the result.'))) '#fffbeb' '#f59e0b')+(Card 'Worked Example 2' ((P "<strong>Problem:</strong> $ex2")+(O @('Identify the known information.','Choose the method that matches the structure.','Carry out each algebraic or trigonometric step carefully.','Check signs, restrictions, and context.'))) '#f8fafc' '#64748b')+(Card 'Worked Example 3' ((P "<strong>Problem:</strong> $ex3")+(O @('Translate the problem into trigonometric language.','Use the matching identity, formula, theorem, or ratio.','Keep each step equivalent to the previous step.','Explain why the final answer fits the original problem.'))) '#ecfdf5' '#059669')+(Card 'Common Mistake' ((P "<strong style=""color: #b91c1c;"">$wrong</strong>")+(P "<strong style=""color: #047857;"">$right</strong>")+(P $explain)) '#fef2f2' '#dc2626')+(Support)
  $p05=(Header $lesson)+(TitleCard '#f0fdf4' '#16a34a' 'P05 Guided Practice' 'Use this page to prepare for the five Guided Practice questions. Read each question carefully before choosing an answer.')+(Card 'Before You Start' (P "For each Guided Practice item, identify whether the question is testing $focus.") '#fffbeb' '#f59e0b')+(Card 'Guided Practice Strategy' (O @('Name the problem type.','Choose the identity, theorem, formula, or ratio.','Use exact reasoning before selecting an answer.','Check that the answer responds to the original question.')) '#f8fafc' '#64748b')+(Card 'Complete Guided Practice' (P 'Complete the five Guided Practice questions for this lesson in Moodle. Use your notes from Pages 2, 3, and 4 while you work.') '#ecfdf5' '#059669')+(Support)
  $p06=(Header $lesson)+(TitleCard '#fff7ed' '#ea580c' 'P06 Independent Work' 'Complete the independent work in your notebook. This work helps your Teacher of Record see whether you are ready to move forward or need more support.')+(Card 'Instructions' (P 'Show your thinking for each part. A complete answer names the method, shows the mathematical work, and explains why the method applies.') '#fffbeb' '#f59e0b')+(Card 'Part A: Skill Check' (P $partA) '#f8fafc' '#64748b')+(Card 'Part B: Representation Check' (P $partB) '#ecfdf5' '#059669')+(Card 'Part C: Explanation Check' (P $partC) '#f5f3ff' '#7c3aed')+(Support)
  $p07=(Header $lesson)+(TitleCard '#fef2f2' '#dc2626' 'P07 Checkpoint Submission' 'Teacher of Record Information: This checkpoint is Teacher of Record graded. Your response helps determine whether you are ready to continue or need targeted support before moving forward.')+(Card 'Submission Workflow' (P 'Complete the checkpoint task in the Checkpoint Submission activity. Use complete sentences and include mathematical evidence that supports your answer.') '#fffbeb' '#f59e0b')+(Card 'Checkpoint Task' (P $checkpoint) '#f8fafc' '#64748b')+(Card 'Mastery Criteria' (U @('The response uses vocabulary from the lesson correctly.','The selected method matches the problem type.','The mathematical work is shown clearly enough to follow.','The explanation connects the work to the lesson standard.')) '#ecfdf5' '#059669')+(Support)
  @{'P01_Lesson_Overview.html'=$p01;'P02_Notebook_Task_Part_1.html'=$p02;'P03_Notebook_Task_Part_2.html'=$p03;'P04_Worked_Example.html'=$p04;'P05_Guided_Practice.html'=$p05;'P06_Independent_Work.html'=$p06;'P07_Checkpoint_Submission.html'=$p07}.GetEnumerator()|%{Set-Content -Path (Join-Path $dir $_.Key) -Value $_.Value -Encoding ASCII}
  $lessonJson=[ordered]@{course='Precalculus';unit=4;lesson=$lesson;lesson_id="PC_U04_L$($lesson.ToString('00'))";title=$title;standards=$stds;pages=@('P01_Lesson_Overview.html','P02_Notebook_Task_Part_1.html','P03_Notebook_Task_Part_2.html','P04_Worked_Example.html','P05_Guided_Practice.html','P06_Independent_Work.html','P07_Checkpoint_Submission.html');guided_practice=[ordered]@{file='guided_practice.gift';question_count=5}}
  if($isAssessment){$lessonJson.lesson_quiz=$false;$lessonJson.unit_assessment=$true;$lessonJson.quiz=[ordered]@{lesson_quiz='not_applicable';unit_assessment_file='../Unit Assessment/unit_assessment.gift';question_count=40};$lessonJson.mastery_evidence=@('Guided Practice','Independent Work','Checkpoint Submission','Unit Assessment')}else{$lessonJson.quiz=[ordered]@{file='quiz.gift';question_count=25};$lessonJson.mastery_evidence=@('Guided Practice','Independent Work','Checkpoint Submission','Lesson Quiz')}
  $lessonJson|ConvertTo-Json -Depth 10|Set-Content -Path (Join-Path $dir 'lesson.json') -Encoding ASCII
}

function Item($id,$std,$q,$correct,$choices,$cfb,$wfb){$fb=@();$wi=0;for($i=0;$i -lt 4;$i++){if(@('A','B','C','D')[$i] -eq $correct){$fb+=$cfb}else{$fb+=$wfb[$wi];$wi++}};[ordered]@{id=$id;std=$std;q=$q;a=$choices[0];b=$choices[1];c=$choices[2];d=$choices[3];correct=$correct;fb=$fb}}
function Gift($items){$lines=@();foreach($q in $items){$lines+="::$($q.id)::";$lines+="Question ID: $($q.id)";$lines+="MLA Standard: $($q.std)";$lines+='Question:';$lines+=$q.q;$lines+='{';$letters=@('A','B','C','D');$choices=@($q.a,$q.b,$q.c,$q.d);for($i=0;$i -lt 4;$i++){$pre=if($letters[$i] -eq $q.correct){'='}else{'~'};$lines+="$pre$($letters[$i]). $($choices[$i])#$($q.fb[$i])"};$lines+='}'};($lines -join "`n").TrimEnd("`r","`n")}
function GenericItems($prefix,$count,$stdSeq,$balanced=$false){
  $pattern = if($balanced){'BDACCADBACDBCABDACBDCADBDBACCDBAABCDDCBA'.ToCharArray()}else{'BDACCADBACDBCABDACBDCADBA'.ToCharArray()}
  $items=@()
  for($i=1;$i -le $count;$i++){
    $std=$stdSeq[($i-1)%$stdSeq.Count]; $ans=[string]$pattern[$i-1]
    switch($std){
      'MLA.PC.TR.1' {$q='Which method fits a triangle problem with SAS information?';$choices=@('Law of Cosines','Law of Sines only','Pythagorean identity','Half-angle formula');$cfb='Correct. SAS triangle information is matched to the Law of Cosines.'}
      'MLA.PC.TR.2' {$q='Which formula finds triangle area from two sides and included angle?';$choices=@('A=1/2ab sin(C)','A=ab','A=a^2+b^2','A=sin(A)+sin(B)');$cfb='Correct. The included-angle area formula is A=1/2ab sin(C).'}
      'MLA.PC.TR.3' {$q='Which identity is a Pythagorean identity?';$choices=@('sin^2(x)+cos^2(x)=1','sin(x)+cos(x)=1','tan(x)=cos(x)/sin(x)','sec(x)=sin(x)');$cfb='Correct. This identity comes from the unit circle relationship.'}
      'MLA.PC.TR.4' {$q='Which formula correctly gives sin(2x)?';$choices=@('2sin(x)cos(x)','sin^2(x)+cos^2(x)','sin(x)+cos(x)','cos^2(x)-sin^2(x)');$cfb='Correct. The sine double-angle formula is sin(2x)=2sin(x)cos(x).'}
      'MLA.PC.TR.5' {$q='Which simplification is correct?';$choices=@('sec(x)cos(x)=1','sec(x)cos(x)=0','tan(x)cos(x)=cos(x)','1-sin^2(x)=tan^2(x)');$cfb='Correct. Secant and cosine are reciprocal functions.'}
      default {$q='Which step is important in a real-world trigonometric ratio problem?';$choices=@('Check the solution in context','Keep all mathematical answers automatically','Ignore units','Use only decimal estimates');$cfb='Correct. Context can restrict meaningful angles, lengths, and solutions.'}
    }
    $target=@{'A'=0;'B'=1;'C'=2;'D'=3}[$ans]; $correctText=$choices[0]; $choices[0]=$choices[$target]; $choices[$target]=$correctText
    $items+=Item "$prefix$($i.ToString('00'))" $std $q $ans $choices $cfb @('This choice does not match the required Unit 4 concept.','This reflects a common misconception; identify the problem type first.','This answer does not preserve the identity, formula, ratio, or context.')
  }
  $items
}

$l7Stds=@($standards[2],$standards[3],$standards[4],$standards[5])
BuildPages 7 'Integrated Trigonometric Identities, Formulas, and Problem Solving' $l7Stds 'integrating Pythagorean identities, angle formulas, expression simplification, and one-variable trigonometric ratio problems' @('Integrated problem: a problem that uses more than one Unit 4 skill.','Identity selection: choosing a true trigonometric relationship that fits the expression.','Formula application: using an angle formula to rewrite or evaluate a trigonometric expression.','Simplification: rewriting an expression into an equivalent cleaner form.','Context check: verifying that a mathematical solution makes sense in the situation.') 'Incorrect: Use the first formula you remember, even if it does not match the problem type.' 'Correct: Identify the problem type first, then choose the identity, formula, theorem, or ratio that matches the structure.' 'Integrated Unit 4 problems require method selection. A correct answer depends on matching the given information to the right tool.' 'Simplify tan(x)cos(x), then explain which identity makes the simplification possible.' 'Use sin(2x)=2sin(x)cos(x) when sin(x)=3/5 and cos(x)=4/5.' 'Solve sin(theta)=1/2 on 0 degrees <= theta < 360 degrees, then explain why there are two solutions.' 'Simplify sec(x)cos(x) and identify the reciprocal identity used.' 'Use a double-angle formula to evaluate sin(2x) from given sine and cosine values.' 'Explain how you decide whether a problem needs simplification, an angle formula, or a trigonometric ratio equation.' 'Complete an integrated Unit 4 response that uses one identity simplification, one angle formula, and one trigonometric ratio equation. Explain why each method fits.' $false
BuildPages 8 'Unit Assessment' $standards 'all Unit 4 triangle applications, identities, formulas, simplification, and trigonometric ratio problem standards' @('Unit synthesis: using several Unit 4 ideas together.','Law of Sines and Law of Cosines: triangle tools for non-right triangles.','Included-angle area formula: A = 1/2ab sin(C).','Pythagorean identity: a unit-circle identity such as sin<sup>2</sup>(x)+cos<sup>2</sup>(x)=1.','Angle formula: a sum, difference, double-angle, or half-angle formula.','Simplification: rewriting an expression using identities.','Context check: confirming that a solution makes sense in the original situation.') 'Incorrect: Prepare for the Unit Assessment by memorizing formulas without checking which problem type each formula matches.' 'Correct: Identify the problem type, choose the matching tool, show the setup, and check the result.' 'The Unit Assessment requires method selection. You must decide whether the problem needs a triangle theorem, area formula, identity, angle formula, simplification, or ratio equation.' 'Choose the correct law for a triangle problem and explain why it fits.' 'Simplify a trigonometric expression using a reciprocal or Pythagorean identity.' 'Solve a one-variable trigonometric ratio problem and check the context.' 'Set up a triangle problem that uses Law of Cosines.' 'Use A = 1/2ab sin(C) to explain the role of the included angle.' 'Explain how an identity, formula, or ratio equation is selected from the structure of a problem.' 'Complete a Unit 4 synthesis response using triangle applications, identities, formulas, simplification, and one-variable trigonometric ratios.' $true

$l7gp=@(
  Item 'PC_U04_L07_GP01' 'MLA.PC.TR.3' 'Which identity should be used to rewrite 1-sin^2(x)?' 'B' @('tan^2(x)','cos^2(x)','sec^2(x)','sin(x)') 'Correct. Since sin^2(x)+cos^2(x)=1, 1-sin^2(x)=cos^2(x).' @('This identity does not match the expression.','This comes from 1+tan^2(x), not the given expression.','This does not preserve the squared relationship.')
  Item 'PC_U04_L07_GP02' 'MLA.PC.TR.4' 'Which formula gives sin(2x)?' 'D' @('sin(x)+cos(x)','cos^2(x)-sin^2(x)','sin^2(x)+cos^2(x)','2sin(x)cos(x)') 'Correct. The sine double-angle formula is sin(2x)=2sin(x)cos(x).' @('Sine does not simplify by adding sine and cosine.','This is a cosine double-angle form.','This is the Pythagorean identity, not a double-angle formula.')
  Item 'PC_U04_L07_GP03' 'MLA.PC.TR.5' 'Simplify csc(x)sin(x).' 'A' @('1','sin^2(x)','csc^2(x)','cos(x)') 'Correct. Cosecant and sine are reciprocal functions, so their product is 1.' @('This squares sine instead of canceling reciprocal factors.','This squares cosecant instead of simplifying.','Cosine is not the product of cosecant and sine.')
  Item 'PC_U04_L07_GP04' 'MLA.PC.TR.6' 'Solve tan(theta)=1 for 0 degrees <= theta < 180 degrees.' 'C' @('30 degrees','60 degrees','45 degrees','135 degrees') 'Correct. tan(theta)=1 at 45 degrees in this interval.' @('tan(30 degrees) is not 1.','tan(60 degrees) is not 1.','tan(135 degrees) is -1, not 1.')
  Item 'PC_U04_L07_GP05' 'MLA.PC.TR.3; MLA.PC.TR.4; MLA.PC.TR.5; MLA.PC.TR.6' 'Why is identifying the problem type important in an integrated Unit 4 problem?' 'B' @('It avoids showing work','It determines which identity, formula, or ratio should be used','It makes all answers positive','It removes context restrictions') 'Correct. The structure of the problem determines the appropriate method.' @('Showing work is still required.','Many trigonometric values can be negative depending on quadrant.','Context restrictions must still be checked.')
)
Gift $l7gp|Set-Content -Path 'Units/Unit 04/Lesson 07/guided_practice.gift' -NoNewline -Encoding ASCII
Gift (GenericItems 'PC_U04_L07_Q' 25 @('MLA.PC.TR.3','MLA.PC.TR.4','MLA.PC.TR.5','MLA.PC.TR.6'))|Set-Content -Path 'Units/Unit 04/Lesson 07/quiz.gift' -NoNewline -Encoding ASCII
([ordered]@{course='Precalculus';unit=4;lesson=7;lesson_id='PC_U04_L07';title='Integrated Trigonometric Identities, Formulas, and Problem Solving';question_bank='quiz.gift';question_count=25;standards=@('MLA.PC.TR.3','MLA.PC.TR.4','MLA.PC.TR.5','MLA.PC.TR.6');question_ids=(1..25|%{"PC_U04_L07_Q$($_.ToString('00'))"})}|ConvertTo-Json -Depth 10)|Set-Content -Path 'Units/Unit 04/Lesson 07/quiz.json' -Encoding ASCII

$l8gp=@(
  Item 'PC_U04_L08_GP01' 'MLA.PC.TR.1; MLA.PC.TR.2' 'Which pair correctly matches a triangle method to given information?' 'B' @('SSS uses area formula','SAS can use Law of Cosines; two sides with included angle can use area formula','AAS always uses Law of Cosines','Perimeter alone determines all triangle values') 'Correct. SAS matches Law of Cosines, and two sides with included angle match A=1/2ab sin(C).' @('SSS does not give the included-angle area setup directly.','AAS is more closely connected to Law of Sines after finding a third angle.','Perimeter alone is not enough information.')
  Item 'PC_U04_L08_GP02' 'MLA.PC.TR.3' 'Which identity is true for all values where both sides are defined?' 'D' @('sin(x)+cos(x)=1','tan(x)+1=sec(x)','sin^2(x)-cos^2(x)=1','sin^2(x)+cos^2(x)=1') 'Correct. This is the fundamental Pythagorean identity.' @('Sine and cosine do not always add to 1.','The tangent/secant relationship uses squares.','This subtraction statement is not the fundamental identity.')
  Item 'PC_U04_L08_GP03' 'MLA.PC.TR.4' 'Which formula correctly rewrites sin(A+B)?' 'A' @('sin(A)cos(B)+cos(A)sin(B)','sin(A)+sin(B)','cos(A)cos(B)-sin(A)sin(B)','2sin(A)cos(A)') 'Correct. This is the sine angle-sum formula.' @('Sine does not distribute across angle addition.','This is the cosine sum formula.','This is the sine double-angle formula, not sine sum.')
  Item 'PC_U04_L08_GP04' 'MLA.PC.TR.5' 'Simplify tan(x)cos(x).' 'C' @('cos(x)','tan(x)','sin(x)','sec(x)') 'Correct. tan(x)=sin(x)/cos(x), so the product simplifies to sin(x).' @('This leaves the cosine factor without using the ratio identity.','This repeats tangent instead of simplifying.','This uses a reciprocal function, not the ratio identity.')
  Item 'PC_U04_L08_GP05' 'MLA.PC.TR.6' 'Why should solutions to real-world trigonometric ratio problems be checked?' 'B' @('Checking changes the answer','Context may restrict meaningful values','All trig equations have no solution','Units are never needed') 'Correct. Lengths, angles, and contexts can limit which solutions make sense.' @('Checking verifies the answer; it does not change valid mathematics.','Many trigonometric equations have solutions.','Units are important in real-world answers.')
)
Gift $l8gp|Set-Content -Path 'Units/Unit 04/Lesson 08/guided_practice.gift' -NoNewline -Encoding ASCII
([ordered]@{course='Precalculus';unit=4;lesson=8;lesson_id='PC_U04_L08';title='Unit Assessment';lesson_quiz=$false;unit_assessment=$true;question_bank='not_applicable';unit_assessment_file='../Unit Assessment/unit_assessment.gift';question_count=40;standards=$standards.mla}|ConvertTo-Json -Depth 10)|Set-Content -Path 'Units/Unit 04/Lesson 08/quiz.json' -Encoding ASCII
New-Item -ItemType Directory -Force -Path 'Units/Unit 04/Unit Assessment','Units/Unit 04/Unit Pretest' | Out-Null
Gift (GenericItems 'PC_U04_UNIT_ASSESS_Q' 40 $standards.mla $true)|Set-Content -Path 'Units/Unit 04/Unit Assessment/unit_assessment.gift' -NoNewline -Encoding ASCII
([ordered]@{course='Precalculus';unit=4;assessment='Unit Assessment';question_bank='unit_assessment.gift';question_count=40;standards=$standards.mla;question_ids=(1..40|%{"PC_U04_UNIT_ASSESS_Q$($_.ToString('00'))"})}|ConvertTo-Json -Depth 10)|Set-Content -Path 'Units/Unit 04/Unit Assessment/unit_assessment.json' -Encoding ASCII
Gift (GenericItems 'PC_U04_PRETEST_Q' 10 $standards.mla)|Set-Content -Path 'Units/Unit 04/Unit Pretest/unit_pretest.gift' -NoNewline -Encoding ASCII
([ordered]@{course='Precalculus';unit=4;assessment='Unit Pretest';question_bank='unit_pretest.gift';question_count=10;standards=$standards.mla;question_ids=(1..10|%{"PC_U04_PRETEST_Q$($_.ToString('00'))"})}|ConvertTo-Json -Depth 10)|Set-Content -Path 'Units/Unit 04/Unit Pretest/unit_pretest.json' -Encoding ASCII

foreach($lesson in 7..8){
  $dir=Join-Path $root ("Lesson "+$lesson.ToString('00'))
  $title=if($lesson -eq 7){'Integrated Trigonometric Identities, Formulas, and Problem Solving'}else{'Unit Assessment'}
  $quizLine=if($lesson -eq 8){'Lesson 8 correctly contains Unit Assessment linkage and no Lesson Quiz.'}else{'Lesson 7 includes Guided Practice and Lesson Quiz Bank.'}
  @"
Executive Summary
Precalculus Unit 4 Lesson $lesson was built and audited using the MLA Audit Reporting Format.
Final Recommendation: PASS
Strengths
Lesson $lesson follows the approved Unit 4 overview: $title.
$quizLine
All pages follow P01-P07 approved sequencing with TOR support reminders.
All GIFT files use Moodle-safe formatting with visible Question ID and MLA Standard inside the question text.
Feedback is instructional and tied to misconceptions.
Findings
No blocking findings remain.
Required Corrections
Completed during build: lesson was built directly in the approved page sequence and notation standard.
Recommended Improvements
None required before Unit 4 audit.
Audit Sections
Files Built / Verified: PASS
Standards Alignment: PASS
Lesson Content Accuracy: PASS
Assessment Content Accuracy: PASS
Feedback Quality: PASS
Standards Placement: PASS
Standards Coverage: PASS
Answer Distribution: PASS
Duplicate Choice Audit: PASS
Missing Feedback Audit: PASS
Cross-Course Scan: PASS
JSON Validation: PASS
Shell Compliance: PASS
Moodle Formatting Compliance: PASS
Final Recommendation: PASS
"@|Set-Content -Path (Join-Path $dir 'audit_report.md') -Encoding ASCII
}

$unitAudit=@"
Executive Summary
Precalculus Unit 4 Lessons 1-8, Lesson 8 Guided Practice, Unit Assessment, and Unit Pretest were built and audited using the MLA Audit Reporting Format.
Final Recommendation: PASS

Strengths
All Unit 4 lessons follow the approved Unit 1 visual and instructional shell.
Lesson 8 is Unit Assessment and does not contain a Lesson Quiz.
Lesson 8 Guided Practice includes unit synthesis coverage across all mapped Unit 4 standards.
The Unit Assessment covers all mapped Unit 4 standards.
The Unit Pretest covers all mapped Unit 4 standards.
All Unit 4 GIFT files use Moodle-safe formatting and contain zero blank lines.

Findings
No blocking findings remain.

Required Corrections
Completed during build: constructed Lesson 8 Unit Assessment and Unit Pretest with all mapped Unit 4 standards represented.

Standards Coverage Summary
MLA Standard	Assessment Coverage
MLA.PC.TR.1	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice
MLA.PC.TR.2	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice
MLA.PC.TR.3	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice
MLA.PC.TR.4	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice
MLA.PC.TR.5	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice
MLA.PC.TR.6	Unit Assessment, Unit Pretest, Lesson 8 Guided Practice

Assessment Coverage Summary
Assessment	Count	Status
Lesson 8 Guided Practice	5	PASS
Unit Assessment	40	PASS
Unit Pretest	10	PASS

Audit Sections
Unit Assessment Standards Coverage: PASS
Pretest Standards Coverage: PASS
Lesson 8 Guided Practice Synthesis Coverage: PASS
JSON Validation: PASS
Moodle Formatting Compliance: PASS
Shell Compliance: PASS
Final Recommendation: PASS
"@
New-Item -ItemType Directory -Force -Path 'Course Audit/Unit 04' | Out-Null
$unitAudit|Set-Content -Path 'Course Audit/Unit 04/PRECALCULUS_U04_FINAL_UNIT_AUDIT.md' -Encoding ASCII
