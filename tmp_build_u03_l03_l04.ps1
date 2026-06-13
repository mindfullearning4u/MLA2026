function Card($bg, $border, $title, $body) {
@"
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 22px; background: $bg; border-left: 6px solid $border;"><h2 style="font-size: 24px; margin-top: 0; margin-bottom: 10px;">$title</h2>
$body
</div>
"@
}

function Top($lesson, $pageTitle) {
@"
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);"><div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">ALG2 | Unit 03 | Lesson $lesson</div></div>
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #e8f4ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px;"><h1 style="font-size: 30px; margin-top: 0; margin-bottom: 12px;">$pageTitle</h1></div>
"@
}

function WritePage($dir, $name, $content) {
    Set-Content -LiteralPath (Join-Path $dir $name) -Value $content -Encoding UTF8
}

function Choice($correct, $answer, $feedback) {
    [pscustomobject]@{ Correct = $correct; Answer = $answer; Feedback = $feedback }
}

function BuildItem($id, $std, $prompt, $correct, $correctFb, $wrongs, $pos) {
    $choices = New-Object System.Collections.Generic.List[object]
    for ($i = 0; $i -lt $wrongs.Count; $i += 2) {
        $choices.Add((Choice $false $wrongs[$i] $wrongs[$i + 1]))
    }
    $choices.Insert($pos, (Choice $true $correct ("Correct. " + $correctFb)))
    [pscustomobject]@{ Id = $id; Std = $std; Prompt = $prompt; Choices = $choices }
}

function WriteGift($path, $items) {
    $out = New-Object System.Collections.Generic.List[string]
    foreach ($item in $items) {
        $out.Add("::$($item.Id)::")
        $out.Add("Question ID:<br>$($item.Id)<br><br>MLA Standard:<br>$($item.Std)<br><br>Question:<br>$($item.Prompt) {")
        foreach ($choice in $item.Choices) {
            $prefix = if ($choice.Correct) { "=" } else { "~" }
            $out.Add("$prefix $($choice.Answer)#$($choice.Feedback)")
        }
        $out.Add("}")
        $out.Add("")
    }
    Set-Content -LiteralPath $path -Value ($out -join "`n") -Encoding UTF8
}

function MakeItems($prefix, $std, $specs) {
    $items = New-Object System.Collections.Generic.List[object]
    for ($i = 0; $i -lt $specs.Count; $i++) {
        $s = $specs[$i]
        $id = if ($prefix.EndsWith("_GP")) { "{0}{1:D2}" -f $prefix, ($i + 1) } else { "{0}_Q{1:D2}" -f $prefix, ($i + 1) }
        $items.Add((BuildItem $id $std $s[0] $s[1] $s[2] $s[3] ($i % 4)))
    }
    return $items
}

$root = "Refined Courses/ALG2/Units/Unit 03"
$l3 = Join-Path $root "Lesson 03"
$l4 = Join-Path $root "Lesson 04"
New-Item -ItemType Directory -Force -Path $l3 | Out-Null
New-Item -ItemType Directory -Force -Path $l4 | Out-Null

$std3 = "MLA.A2.RR.1; MLA.A2.RR.3"
$fb3 = "MA.912.AR.7.1; MA.912.AR.7.3"
$std4 = "MLA.A2.AE.6"
$fb4 = "MA.912.AR.1.9"

$p01L3 = (Top "03" "P01 Lesson Overview") +
(Card "#fffbeb" "#f59e0b" "Lesson Title" '<p style="margin-bottom: 14px;"><strong>Lesson 3: Radical Equations and Applications</strong></p><p style="margin-bottom: 14px;">Solve radical equations, check for extraneous solutions, and interpret radical models in context.</p>') +
(Card "#f8fafc" "#64748b" "Standards Covered in This Lesson" '<p style="margin-bottom: 14px;"><strong>MLA.A2.RR.1; MLA.A2.RR.3</strong></p><p style="margin-bottom: 14px;"><strong>Florida B.E.S.T. Benchmark:</strong> MA.912.AR.7.1; MA.912.AR.7.3</p><p style="margin-bottom: 14px;">Solve radical equations, check solution validity, and interpret radical relationships in applications.</p>') +
(Card "#ecfdf5" "#059669" "What You Will Learn" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Solve equations that contain square roots or cube roots.</li><li style="margin-bottom: 8px;">Check solutions in the original equation to identify extraneous solutions.</li><li style="margin-bottom: 8px;">Use domain restrictions to decide whether a radical solution makes sense.</li><li style="margin-bottom: 8px;">Interpret radical equations and models in context.</li></ul>') +
(Card "#fff7ed" "#ea580c" "What You Will Do" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Take notebook notes on radical equation-solving steps.</li><li style="margin-bottom: 8px;">Study worked examples that square both sides and then check solutions.</li><li style="margin-bottom: 8px;">Complete guided practice, independent work, checkpoint, notebook evidence, and a lesson quiz.</li></ul>') +
(Card "#fef2f2" "#dc2626" "How You Will Show Mastery" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Solve radical equations accurately.</li><li style="margin-bottom: 8px;">Reject extraneous solutions with a clear check.</li><li style="margin-bottom: 8px;">Explain what a radical model solution means in context.</li></ul>') +
(Card "#f5f3ff" "#7c3aed" "Student-Friendly Standard Connection" '<p style="margin-bottom: 14px;"><strong>MLA.A2.RR.1; MLA.A2.RR.3:</strong> Solve radical equations and interpret radical relationships in context.</p><p style="margin-bottom: 14px;">In student language: <strong>I can solve radical equations, check every solution, and explain which answers make sense in a real situation.</strong></p>')

$p02L3 = (Top "03" "P02 Notebook Task Part 1") +
(Card "#fffbeb" "#f59e0b" "Notebook Setup" '<p style="margin-bottom: 14px;">Title your notes: <strong>Lesson 3: Radical Equations and Applications</strong>.</p><p style="margin-bottom: 14px;">Write the standard: <strong>MLA.A2.RR.1; MLA.A2.RR.3</strong>.</p>') +
(Card "#f8fafc" "#64748b" "Key Vocabulary" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Radical equation: an equation with a variable inside a radical.</li><li style="margin-bottom: 8px;">Extraneous solution: a value that appears during solving but does not satisfy the original equation.</li><li style="margin-bottom: 8px;">Domain restriction: an input limitation needed for a radical expression or context.</li><li style="margin-bottom: 8px;">Radical model: a function or equation using radicals to describe a relationship.</li></ul>') +
(Card "#ecfdf5" "#059669" "Correct Example" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> If &radic;(x + 5) = 4, then x + 5 = 16, so x = 11. Check: &radic;(11 + 5) = 4.</div>') +
(Card "#fef2f2" "#dc2626" "Incorrect Example" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> If &radic;(x + 9) = x - 3, listing x = 0 and x = 7 without checking is incorrect. x = 0 gives 3 = -3, so it is extraneous.</div>')

$p03L3 = (Top "03" "P03 Notebook Task Part 2") +
(Card "#fffbeb" "#f59e0b" "Notebook Task" '<ol style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Copy each worked example and label the inverse operation used.</li><li style="margin-bottom: 8px;">Write the check step in the original equation.</li><li style="margin-bottom: 8px;">Explain why an extraneous solution can appear after squaring both sides.</li></ol>') +
(Card "#ecfdf5" "#059669" "Correct Reasoning" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> &radic;(2x - 1) = x - 2 gives x = 1 or x = 5 after squaring, but only x = 5 checks in the original equation.</div>') +
(Card "#fef2f2" "#dc2626" "Common Mistake" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> Keeping every squared-equation solution is incorrect because squaring can create answers that do not satisfy the original radical equation.</div>')

$p04L3 = (Top "03" "P04 Concept Instruction / Worked Examples") +
(Card "#f8fafc" "#64748b" "Concept Instruction" '<p style="margin-bottom: 14px;">To solve a radical equation, isolate the radical, use an inverse operation such as squaring, solve the resulting equation, and check every possible solution in the original equation.</p><p style="margin-bottom: 14px;">The check step is required because squaring both sides can create extraneous solutions.</p>') +
(Card "#ecfdf5" "#059669" "Worked Examples" '<p style="margin-bottom: 14px;"><strong>Example 1:</strong> &radic;(x - 2) = 5 &rarr; x - 2 = 25 &rarr; x = 27. Check: &radic;25 = 5.</p><p style="margin-bottom: 14px;"><strong>Example 2:</strong> &radic;(2x - 1) = x - 2. Square: 2x - 1 = x<sup>2</sup> - 4x + 4. Then x<sup>2</sup> - 6x + 5 = 0, so x = 1 or x = 5. Check: x = 1 gives 1 = -1, so reject. x = 5 gives 3 = 3, so accept.</p><p style="margin-bottom: 14px;"><strong>Example 3:</strong> If d = &radic;(16t) models distance after t seconds and d = 12, then 12 = &radic;(16t), so 144 = 16t and t = 9 seconds.</p>') +
(Card "#ecfdf5" "#059669" "Correct Reasoning Check" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> &radic;(x + 4) = x - 2 requires x - 2 &ge; 0, so any possible solution less than 2 must be rejected during checking.</div>') +
(Card "#fef2f2" "#dc2626" "Common Mistake" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> &radic;(x + 4) = x - 2 &rarr; x + 4 = x - 2 is incorrect because squaring the right side must give (x - 2)<sup>2</sup>, not x - 2.</div>')

$p05L3 = (Top "03" "P05 Guided Practice") +
(Card "#fffbeb" "#f59e0b" "Guided Practice" '<p style="margin-bottom: 14px;">Complete the guided practice in Moodle. Show isolation, inverse operation, solving, and checking steps in your notebook before choosing an answer.</p>') +
(Card "#ecfdf5" "#059669" "Before You Submit" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Check that the radical is isolated before squaring.</li><li style="margin-bottom: 8px;">Check every possible solution in the original equation.</li><li style="margin-bottom: 8px;">Reject answers that do not fit the equation or context.</li></ul>')

$p06L3 = (Top "03" "P06 Independent Work + Checkpoint Submission + Notebook Evidence Submission") +
(Card "#f8fafc" "#64748b" "Independent Work" '<ol style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Solve &radic;(x + 6) = 5 and check your solution.</li><li style="margin-bottom: 8px;">Solve &radic;(3x + 1) = 4 and check your solution.</li><li style="margin-bottom: 8px;">Solve &radic;(x + 9) = x - 3 and identify any extraneous solution.</li><li style="margin-bottom: 8px;">A model d = &radic;(25t) gives distance d. Find t when d = 15.</li><li style="margin-bottom: 8px;">Explain why checking is required after squaring both sides.</li></ol>') +
(Card "#fff7ed" "#ea580c" "Checkpoint Submission" '<p style="margin-bottom: 14px;">Submit one solved radical equation that includes the original equation check and a sentence explaining whether any solution was extraneous.</p>') +
(Card "#f5f3ff" "#7c3aed" "Notebook Evidence Submission" '<p style="margin-bottom: 14px;">Submit notebook evidence showing vocabulary, worked examples, corrected mistakes, independent work, and checkpoint reasoning.</p>')

$p07L3 = (Top "03" "P07 Lesson Quiz") +
(Card "#fffbeb" "#f59e0b" "Lesson Quiz" '<p style="margin-bottom: 14px;">Complete the lesson quiz in Moodle after finishing notebook work, guided practice, independent work, and checkpoint submission.</p><p style="margin-bottom: 14px;">Use solution checks and context restrictions before selecting an answer.</p>') +
(Card "#ecfdf5" "#059669" "Quiz Expectations" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Isolate radicals before applying inverse operations.</li><li style="margin-bottom: 8px;">Check each possible solution in the original equation.</li><li style="margin-bottom: 8px;">Identify extraneous or context-invalid solutions.</li><li style="margin-bottom: 8px;">Demonstrate at least 80% mastery or complete Teacher of Record intervention before another randomized attempt is released.</li></ul>')

WritePage $l3 "P01.html" $p01L3; WritePage $l3 "P02.html" $p02L3; WritePage $l3 "P03.html" $p03L3; WritePage $l3 "P04.html" $p04L3; WritePage $l3 "P05.html" $p05L3; WritePage $l3 "P06.html" $p06L3; WritePage $l3 "P07.html" $p07L3

$p01L4 = (Top "04" "P01 Lesson Overview") +
(Card "#fffbeb" "#f59e0b" "Lesson Title" '<p style="margin-bottom: 14px;"><strong>Lesson 4: Rational Expression Foundations</strong></p><p style="margin-bottom: 14px;">Simplify, multiply, and divide rational expressions while identifying restrictions.</p>') +
(Card "#f8fafc" "#64748b" "Standards Covered in This Lesson" '<p style="margin-bottom: 14px;"><strong>MLA.A2.AE.6</strong></p><p style="margin-bottom: 14px;"><strong>Florida B.E.S.T. Benchmark:</strong> MA.912.AR.1.9</p><p style="margin-bottom: 14px;">Rewrite and operate with rational expressions while maintaining equivalent forms and restrictions.</p>') +
(Card "#ecfdf5" "#059669" "What You Will Learn" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Identify values that make a rational expression undefined.</li><li style="margin-bottom: 8px;">Simplify rational expressions by factoring and canceling common factors.</li><li style="margin-bottom: 8px;">Multiply and divide rational expressions using equivalent forms.</li><li style="margin-bottom: 8px;">State restrictions from the original expression.</li></ul>') +
(Card "#fff7ed" "#ea580c" "What You Will Do" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Take notebook notes on rational expression vocabulary and restrictions.</li><li style="margin-bottom: 8px;">Study worked examples involving factoring, simplifying, multiplying, and dividing.</li><li style="margin-bottom: 8px;">Complete guided practice, independent work, checkpoint, notebook evidence, and a lesson quiz.</li></ul>') +
(Card "#fef2f2" "#dc2626" "How You Will Show Mastery" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Simplify rational expressions accurately.</li><li style="margin-bottom: 8px;">State excluded values from original denominators.</li><li style="margin-bottom: 8px;">Use factoring to multiply and divide rational expressions.</li></ul>') +
(Card "#f5f3ff" "#7c3aed" "Student-Friendly Standard Connection" '<p style="margin-bottom: 14px;"><strong>MLA.A2.AE.6:</strong> Rewrite rational expressions and perform operations while tracking restrictions.</p><p style="margin-bottom: 14px;">In student language: <strong>I can simplify, multiply, and divide rational expressions and explain which input values are not allowed.</strong></p>')

$p02L4 = (Top "04" "P02 Notebook Task Part 1") +
(Card "#fffbeb" "#f59e0b" "Notebook Setup" '<p style="margin-bottom: 14px;">Title your notes: <strong>Lesson 4: Rational Expression Foundations</strong>.</p><p style="margin-bottom: 14px;">Write the standard: <strong>MLA.A2.AE.6</strong>.</p>') +
(Card "#f8fafc" "#64748b" "Key Vocabulary" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Rational expression: a ratio of polynomial expressions.</li><li style="margin-bottom: 8px;">Restriction: a value that makes an original denominator equal 0.</li><li style="margin-bottom: 8px;">Common factor: a factor shared by a numerator and denominator.</li><li style="margin-bottom: 8px;">Reciprocal: the flipped form used when dividing rational expressions.</li></ul>') +
(Card "#ecfdf5" "#059669" "Correct Example" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> (x<sup>2</sup> - 9)/(x - 3) = x + 3, with x &ne; 3, because the original denominator cannot equal 0.</div>') +
(Card "#fef2f2" "#dc2626" "Incorrect Example" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> (x<sup>2</sup> - 9)/(x - 3) = x + 3 with no restriction is incomplete because x = 3 was not allowed in the original expression.</div>')

$p03L4 = (Top "04" "P03 Notebook Task Part 2") +
(Card "#fffbeb" "#f59e0b" "Notebook Task" '<ol style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Copy each worked example and underline the original denominator.</li><li style="margin-bottom: 8px;">List restrictions before canceling common factors.</li><li style="margin-bottom: 8px;">Explain why canceling terms is not the same as canceling factors.</li></ol>') +
(Card "#ecfdf5" "#059669" "Correct Reasoning" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> (x<sup>2</sup> + 5x)/(x) = x + 5 with x &ne; 0. The factor x cancels, but the original denominator still creates a restriction.</div>') +
(Card "#fef2f2" "#dc2626" "Common Mistake" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> (x + 5)/x = 5 is incorrect because x is a term in the numerator expression, not a common factor of every numerator term.</div>')

$p04L4 = (Top "04" "P04 Concept Instruction / Worked Examples") +
(Card "#f8fafc" "#64748b" "Concept Instruction" '<p style="margin-bottom: 14px;">A rational expression is undefined when its denominator equals 0. Restrictions come from original denominators, even if factors later cancel.</p><p style="margin-bottom: 14px;">To simplify, factor first, cancel common factors, and keep the restrictions. To divide, multiply by the reciprocal of the second expression.</p>') +
(Card "#ecfdf5" "#059669" "Worked Examples" '<p style="margin-bottom: 14px;"><strong>Example 1:</strong> (x<sup>2</sup> - 16)/(x - 4) = ((x - 4)(x + 4))/(x - 4) = x + 4, with x &ne; 4.</p><p style="margin-bottom: 14px;"><strong>Example 2:</strong> (3x/5) &middot; (10/x<sup>2</sup>) = 30x/(5x<sup>2</sup>) = 6/x, with x &ne; 0.</p><p style="margin-bottom: 14px;"><strong>Example 3:</strong> (x<sup>2</sup> - 1)/(x + 2) &divide; ((x - 1)/(x + 2)) = ((x - 1)(x + 1))/(x + 2) &middot; (x + 2)/(x - 1) = x + 1, with x &ne; -2 and x &ne; 1.</p>') +
(Card "#ecfdf5" "#059669" "Correct Reasoning Check" '<div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 16px;"><strong>Correct:</strong> Restrictions are found before simplifying because the original expression controls which inputs are allowed.</div>') +
(Card "#fef2f2" "#dc2626" "Common Mistake" '<div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 10px; padding: 16px;"><strong>Incorrect:</strong> Canceling the x in (x + 4)/x is incorrect because x is not a factor of the entire numerator.</div>')

$p05L4 = (Top "04" "P05 Guided Practice") +
(Card "#fffbeb" "#f59e0b" "Guided Practice" '<p style="margin-bottom: 14px;">Complete the guided practice in Moodle. Factor before simplifying and write restrictions before canceling common factors.</p>') +
(Card "#ecfdf5" "#059669" "Before You Submit" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Find excluded values from the original denominator.</li><li style="margin-bottom: 8px;">Cancel only common factors, not isolated terms.</li><li style="margin-bottom: 8px;">When dividing, multiply by the reciprocal before simplifying.</li></ul>')

$p06L4 = (Top "04" "P06 Independent Work + Checkpoint Submission + Notebook Evidence Submission") +
(Card "#f8fafc" "#64748b" "Independent Work" '<ol style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Simplify (x<sup>2</sup> - 25)/(x - 5) and state the restriction.</li><li style="margin-bottom: 8px;">Simplify (x<sup>2</sup> + 7x)/(x) and state the restriction.</li><li style="margin-bottom: 8px;">Multiply (2x/3) &middot; (9/x<sup>2</sup>) and state restrictions.</li><li style="margin-bottom: 8px;">Divide (x<sup>2</sup> - 4)/(x + 1) by (x - 2)/(x + 1).</li><li style="margin-bottom: 8px;">Explain why restrictions remain even after a factor cancels.</li></ol>') +
(Card "#fff7ed" "#ea580c" "Checkpoint Submission" '<p style="margin-bottom: 14px;">Submit one simplified rational expression that includes factoring, canceled common factors, and restrictions from the original denominator.</p>') +
(Card "#f5f3ff" "#7c3aed" "Notebook Evidence Submission" '<p style="margin-bottom: 14px;">Submit notebook evidence showing vocabulary, worked examples, corrected mistakes, independent work, and checkpoint reasoning.</p>')

$p07L4 = (Top "04" "P07 Lesson Quiz") +
(Card "#fffbeb" "#f59e0b" "Lesson Quiz" '<p style="margin-bottom: 14px;">Complete the lesson quiz in Moodle after finishing notebook work, guided practice, independent work, and checkpoint submission.</p><p style="margin-bottom: 14px;">Include restrictions whenever a rational expression has a denominator.</p>') +
(Card "#ecfdf5" "#059669" "Quiz Expectations" '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Factor before simplifying.</li><li style="margin-bottom: 8px;">Cancel common factors only.</li><li style="margin-bottom: 8px;">State restrictions from original denominators.</li><li style="margin-bottom: 8px;">Demonstrate at least 80% mastery or complete Teacher of Record intervention before another randomized attempt is released.</li></ul>')

WritePage $l4 "P01.html" $p01L4; WritePage $l4 "P02.html" $p02L4; WritePage $l4 "P03.html" $p03L4; WritePage $l4 "P04.html" $p04L4; WritePage $l4 "P05.html" $p05L4; WritePage $l4 "P06.html" $p06L4; WritePage $l4 "P07.html" $p07L4

$gp3 = @(
@("Solve &radic;(x + 6) = 5.", "x = 19", "Squaring gives x + 6 = 25, so x = 19, and the original equation checks.", @("x = -1", "This subtracts incorrectly after squaring.", "x = 11", "This uses 5 + 6 instead of 25 - 6.", "x = 31", "This adds 6 after squaring instead of subtracting it.")),
@("Solve &radic;(3x + 1) = 4.", "x = 5", "Squaring gives 3x + 1 = 16, so 3x = 15 and x = 5.", @("x = 3", "This does not make 3x + 1 equal 16.", "x = 15", "This misses the division by 3.", "x = 17", "This adds instead of solving 3x + 1 = 16.")),
@("Which value checks for &radic;(x + 9) = x - 3?", "x = 7 only", "Squaring gives x = 0 or x = 7, but x = 0 gives 3 = -3, so only x = 7 checks.", @("x = 0 only", "x = 0 is extraneous because the right side is -3.", "x = 0 and x = 7", "Both appear after squaring, but x = 0 fails the original equation.", "no solution", "x = 7 satisfies the original equation.")),
@("A model d = &radic;(25t) gives distance d. If d = 15, what is t?", "t = 9", "15 = &radic;(25t), so 225 = 25t and t = 9.", @("t = 3", "This divides 15 by 5 but does not square first.", "t = 15", "This does not solve 225 = 25t.", "t = 225", "This is d squared, not the value of t.")),
@("Why must radical equation solutions be checked?", "squaring can create extraneous solutions", "Squaring both sides can make a false original equation appear true in the squared equation.", @("radicals cannot have solutions", "Radical equations can have valid solutions.", "checking changes the equation", "Checking substitutes into the original equation; it does not change it.", "all squared equations have no solutions", "Squared equations often have solutions, but they must be verified."))
)
$quiz3 = @(
@("Solve &radic;(x - 4) = 6.", "x = 40", "Squaring gives x - 4 = 36, so x = 40.", @("x = 10", "This adds 4 to 6 rather than to 36.", "x = 32", "This subtracts 4 after squaring instead of adding it.", "x = 2", "This does not satisfy the original radical equation.")),
@("Solve &radic;(2x + 3) = 7.", "x = 23", "Squaring gives 2x + 3 = 49, so x = 23.", @("x = 10", "This does not account for squaring 7.", "x = 26", "This forgets to divide by 2.", "x = 46", "This subtracts 3 but does not divide by 2.")),
@("Solve &radic;(x + 1) = x - 1.", "x = 3", "Squaring gives x + 1 = x<sup>2</sup> - 2x + 1, so x(x - 3) = 0; only x = 3 checks.", @("x = 0", "x = 0 is extraneous because the right side is -1.", "x = 0 and x = 3", "Both arise after squaring, but x = 0 fails the original equation.", "no solution", "x = 3 satisfies the original equation.")),
@("Solve &radic;(4x - 3) = 5.", "x = 7", "Squaring gives 4x - 3 = 25, so 4x = 28 and x = 7.", @("x = 5", "This does not make the radicand 25.", "x = 22", "This misses division by 4.", "x = 28", "This is 4x, not x.")),
@("Which solution checks for &radic;(x + 4) = x - 2?", "x = 5", "Squaring gives x = 0 or x = 5, but x = 0 makes the right side negative.", @("x = 0", "x = 0 is extraneous because 2 is not equal to -2.", "x = 0 and x = 5", "Only x = 5 checks in the original equation.", "no solution", "x = 5 satisfies the original equation.")),
@("Solve &radic;<sup>3</sup>(x - 1) = 4.", "x = 65", "Cubing gives x - 1 = 64, so x = 65.", @("x = 5", "This adds 1 to 4 instead of cubing 4.", "x = 63", "This subtracts 1 after cubing instead of adding it.", "x = 16", "This uses 4 squared, not 4 cubed.")),
@("Solve &radic;(x/2) = 3.", "x = 18", "Squaring gives x/2 = 9, so x = 18.", @("x = 6", "This multiplies 3 by 2 but does not square first.", "x = 9", "This is x/2, not x.", "x = 12", "This does not satisfy the original equation.")),
@("A model h = &radic;(64t) gives height-related output h. If h = 16, find t.", "t = 4", "16 = &radic;(64t), so 256 = 64t and t = 4.", @("t = 2", "This divides 16 by 8 but does not square first.", "t = 8", "This does not solve 256 = 64t.", "t = 16", "This is the output value, not t.")),
@("What is the first algebraic step for &radic;(x + 8) = 9?", "square both sides", "The radical is already isolated, so square both sides to undo the square root.", @("subtract 8 from both sides", "The 8 is inside the radical, so this is not the first step.", "divide by 9", "There is no coefficient to divide by.", "cube both sides", "A square root is undone by squaring.")),
@("Why is x = 1 extraneous for &radic;(2x + 3) = x + 1 if it appears during work?", "it does not satisfy the original equation", "A candidate solution must make the original radical equation true.", @("it is always outside every radical domain", "x = 1 can be inside the domain; the issue is the equation check.", "it is negative", "x = 1 is positive.", "it makes the radicand zero", "2(1) + 3 is 5, not 0.")),
@("Solve &radic;(x + 10) - 2 = 4.", "x = 26", "Add 2 to get &radic;(x + 10) = 6, then square to get x + 10 = 36.", @("x = 6", "This stops after isolating the square root.", "x = 14", "This squares 4 before isolating the radical.", "x = 38", "This adds 10 instead of subtracting it after squaring.")),
@("Solve 2&radic;(x - 1) = 10.", "x = 26", "Divide by 2 to get &radic;(x - 1) = 5, then square.", @("x = 6", "This forgets to square 5.", "x = 24", "This subtracts 1 instead of adding it.", "x = 101", "This squares before dividing by 2.")),
@("Which equation results from squaring &radic;(3x - 2) = x?", "3x - 2 = x<sup>2</sup>", "Squaring both sides gives the radicand equal to x squared.", @("3x - 2 = x", "The right side must also be squared.", "9x<sup>2</sup> - 4 = x<sup>2</sup>", "The radicand itself is not squared after removing the square root.", "3x = x<sup>2</sup>", "This drops the -2 term.")),
@("Solve &radic;(x + 12) = x.", "x = 4", "Squaring gives x + 12 = x<sup>2</sup>, so x = 4 or -3; only x = 4 checks.", @("x = -3", "x = -3 fails because the right side is negative.", "x = -3 and x = 4", "Only x = 4 checks in the original equation.", "no solution", "x = 4 satisfies the original equation.")),
@("A solution to a radical model is t = -4 seconds. What should happen in context?", "reject it because time cannot be negative", "Elapsed time is usually restricted to nonnegative values.", @("keep it because all algebraic solutions work", "Context restrictions must be checked.", "change it to t = 4", "Changing the sign changes the solution.", "use it as the maximum", "A negative time is not automatically a maximum.")),
@("Solve &radic;(5x) = 10.", "x = 20", "Squaring gives 5x = 100, so x = 20.", @("x = 2", "This divides 10 by 5 before squaring.", "x = 10", "This does not make 5x equal 100.", "x = 100", "This is the squared output, not x.")),
@("Solve &radic;(x - 7) = 0.", "x = 7", "The square root is 0 only when the radicand is 0.", @("x = 0", "Substituting 0 gives a negative radicand.", "x = -7", "This does not make x - 7 equal 0.", "no solution", "x = 7 checks.")),
@("Which candidate should be rejected for &radic;(x + 6) = x?", "x = -2", "x = -2 can appear after squaring, but the right side is negative and does not equal the principal square root.", @("x = 3", "x = 3 checks because &radic;9 = 3.", "both x = -2 and x = 3", "x = 3 is valid.", "neither candidate", "x = -2 fails the original equation.")),
@("Solve &radic;<sup>3</sup>(2x + 1) = 3.", "x = 13", "Cubing gives 2x + 1 = 27, so x = 13.", @("x = 1", "This does not cube 3.", "x = 14", "This forgets to divide by 2.", "x = 26", "This is 2x, not x.")),
@("What does an extraneous solution mean?", "a candidate that fails the original equation", "It may solve a transformed equation but not the original.", @("a solution with a radical symbol", "Valid radical solutions can include radical notation.", "a negative number always", "Negative numbers are not automatically extraneous.", "a solution found by checking", "Checking identifies whether it is valid or extraneous.")),
@("Solve &radic;(x + 2) + 1 = 6.", "x = 23", "Subtract 1, square 5, and solve x + 2 = 25.", @("x = 3", "This subtracts but does not square.", "x = 25", "This is the radicand value, not x.", "x = 34", "This squares 6 before isolating the radical.")),
@("If &radic;(9t) = 12 in a distance model, what is t?", "t = 16", "Squaring gives 9t = 144, so t = 16.", @("t = 4", "This divides 12 by 3 but skips squaring.", "t = 12", "This is the distance output.", "t = 144", "This is the squared output, not t.")),
@("Which domain restriction applies to &radic;(x - 5)?", "x &ge; 5", "The radicand must be nonnegative, so x - 5 &ge; 0.", @("x &le; 5", "That would make the radicand nonpositive, not always nonnegative.", "x &ne; 5", "Square roots can equal 0, so x = 5 is allowed.", "all real numbers", "Inputs less than 5 make a negative radicand.")),
@("Solve &radic;(2x - 7) = 1.", "x = 4", "Squaring gives 2x - 7 = 1, so x = 4.", @("x = 3", "This does not make the radicand 1.", "x = 8", "This forgets to divide by 2.", "x = -4", "This is outside the domain and does not check.")),
@("Which step checks x = 11 for &radic;(x + 5) = 4?", "&radic;(11 + 5) = 4", "Substitute x = 11 into the original equation to verify it.", @("11 + 5 = 4", "This omits the radical.", "&radic;(11) + 5 = 4", "The 5 belongs inside the radical.", "11 = 4<sup>2</sup>", "This does not check the original equation."))
)

$gp4 = @(
@("Simplify (x<sup>2</sup> - 9)/(x - 3).", "x + 3, x &ne; 3", "Factor x<sup>2</sup> - 9 as (x - 3)(x + 3), then keep the original restriction x &ne; 3.", @("x - 3, x &ne; 3", "The remaining factor after canceling is x + 3.", "x + 3, no restriction", "The original denominator still gives x &ne; 3.", "x<sup>2</sup> + 3, x &ne; 3", "The numerator must be factored before canceling.")),
@("What restriction applies to (x + 4)/(x - 7)?", "x &ne; 7", "The denominator x - 7 cannot equal 0.", @("x &ne; -4", "The numerator does not create a restriction.", "x &ne; -7", "The sign is reversed.", "all real numbers", "x = 7 makes the denominator 0.")),
@("Simplify (6x<sup>2</sup>)/(3x), with x &ne; 0.", "2x", "Divide coefficients and subtract exponents: 6x<sup>2</sup>/(3x) = 2x.", @("2x<sup>2</sup>", "One factor of x cancels.", "3x", "The coefficients simplify to 2, not 3.", "2/x", "The remaining x stays in the numerator.")),
@("Multiply (2x/5)(10/x<sup>2</sup>).", "4/x, x &ne; 0", "The product is 20x/(5x<sup>2</sup>) = 4/x, and x cannot be 0.", @("4x", "One x remains in the denominator.", "2/x, x &ne; 0", "The coefficient simplifies to 4, not 2.", "4/x, no restriction", "The original denominator includes x<sup>2</sup>.")),
@("Divide (x<sup>2</sup> - 4)/(x + 1) by (x - 2)/(x + 1).", "x + 2, x &ne; -1 and x &ne; 2", "Multiply by the reciprocal; factors x - 2 and x + 1 cancel, but original restrictions remain.", @("x - 2", "The remaining factor is x + 2.", "x + 2, no restriction", "Restrictions from original denominators and divisor must be kept.", "1/(x + 2)", "This flips the wrong expression."))
)

$quiz4 = @(
@("Simplify (x<sup>2</sup> - 16)/(x - 4).", "x + 4, x &ne; 4", "Factor as (x - 4)(x + 4), cancel the common factor, and keep x &ne; 4.", @("x - 4, x &ne; 4", "The remaining factor is x + 4.", "x + 4, no restriction", "The original denominator still excludes x = 4.", "x<sup>2</sup> + 4, x &ne; 4", "The numerator must be factored first.")),
@("What restriction applies to 5/(x + 2)?", "x &ne; -2", "The denominator x + 2 cannot equal 0.", @("x &ne; 2", "The sign is reversed.", "x &ne; 5", "The numerator does not create a restriction.", "all real numbers", "x = -2 makes the denominator 0.")),
@("Simplify (x<sup>2</sup> + 6x)/(x).", "x + 6, x &ne; 0", "Factor the numerator as x(x + 6) and keep the original restriction.", @("x + 6, no restriction", "The original denominator excludes x = 0.", "x<sup>2</sup> + 6", "The common factor x should cancel.", "6, x &ne; 0", "Canceling x from only one term is not valid.")),
@("Multiply (3x/4)(8/x).", "6, x &ne; 0", "The x factors cancel and 24/4 = 6.", @("6x, x &ne; 0", "The x cancels completely.", "2, x &ne; 0", "The coefficient simplifies to 6.", "6, no restriction", "The original denominator x excludes 0.")),
@("Divide (x + 5)/x by (x + 5)/3.", "3/x, x &ne; 0 and x &ne; -5", "Multiply by 3/(x + 5); x + 5 cancels but the divisor cannot be 0.", @("x/3", "This does not multiply by the reciprocal correctly.", "3/x, x &ne; 0", "The divisor also creates x &ne; -5.", "3", "The x remains in the denominator.")),
@("Simplify (x<sup>2</sup> - 25)/(x - 5).", "x + 5, x &ne; 5", "Use difference of squares and keep the original denominator restriction.", @("x - 5, x &ne; 5", "The remaining factor is x + 5.", "x + 5, x &ne; -5", "The denominator x - 5 excludes 5.", "x<sup>2</sup> + 5, x &ne; 5", "The numerator must be factored.")),
@("What values are excluded from (x + 1)/((x - 2)(x + 3))?", "x &ne; 2 and x &ne; -3", "Each denominator factor cannot equal 0.", @("x &ne; -1", "The numerator does not create restrictions.", "x &ne; -2 and x &ne; 3", "Both signs are reversed.", "all real numbers", "The denominator is zero at 2 and -3.")),
@("Simplify (4x<sup>3</sup>)/(8x).", "x<sup>2</sup>/2, x &ne; 0", "Reduce 4/8 to 1/2 and cancel one factor of x.", @("2x<sup>2</sup>, x &ne; 0", "The coefficient should be 1/2, not 2.", "x<sup>3</sup>/2, x &ne; 0", "One x factor cancels.", "x<sup>2</sup>/2, no restriction", "The original denominator excludes x = 0.")),
@("Multiply (x - 1)/(x + 2) by (x + 2)/(x + 5).", "(x - 1)/(x + 5), x &ne; -2 and x &ne; -5", "Cancel x + 2 and keep restrictions from original denominators.", @("(x - 1)/(x + 2), x &ne; -2", "The x + 2 factor cancels.", "(x - 1)/(x + 5), no restriction", "Original denominators create restrictions.", "(x + 2)/(x + 5)", "The wrong factor remains.")),
@("Why can (x + 4)/x not simplify to 4?", "x is not a factor of every numerator term", "Only common factors can cancel across a fraction.", @("because x is never allowed in a denominator", "x can be in a denominator with restrictions.", "because 4 is not a polynomial", "4 is a polynomial constant.", "because addition always cancels first", "Terms do not cancel like factors.")),
@("Simplify (x<sup>2</sup> - x)/(x - 1).", "x, x &ne; 1", "Factor x(x - 1), cancel x - 1, and keep x &ne; 1.", @("x - 1, x &ne; 1", "The remaining factor is x.", "x, no restriction", "The original denominator excludes x = 1.", "1, x &ne; 1", "The factor x remains.")),
@("What restriction applies to (2x)/(x<sup>2</sup> - 9)?", "x &ne; 3 and x &ne; -3", "Factor the denominator as (x - 3)(x + 3).", @("x &ne; 9", "The denominator zeros are not 9.", "x &ne; -9", "This is not a zero of x<sup>2</sup> - 9.", "x &ne; 0", "The numerator does not create a denominator restriction.")),
@("Simplify (9x)/(3x<sup>2</sup>).", "3/x, x &ne; 0", "Reduce 9/3 to 3 and cancel one x.", @("3x, x &ne; 0", "The remaining x is in the denominator.", "6/x, x &ne; 0", "The coefficients divide to 3.", "3/x, no restriction", "The original denominator excludes x = 0.")),
@("Divide (x - 3)/(x + 4) by (x - 3)/(x - 1).", "(x - 1)/(x + 4), x &ne; -4, 1, and 3", "Multiply by the reciprocal and keep restrictions from the original denominator and divisor.", @("(x + 4)/(x - 1)", "This flips the final result.", "(x - 1)/(x + 4), x &ne; -4", "The divisor also excludes x = 1 and x = 3.", "1", "Only one common factor cancels.")),
@("Simplify (x<sup>2</sup> + 3x + 2)/(x + 1).", "x + 2, x &ne; -1", "Factor the numerator as (x + 1)(x + 2).", @("x + 1, x &ne; -1", "The remaining factor is x + 2.", "x + 2, no restriction", "The original denominator excludes x = -1.", "x<sup>2</sup> + 2, x &ne; -1", "The numerator must be factored.")),
@("What restriction applies to (x - 8)/(4x)?", "x &ne; 0", "The denominator 4x is zero when x = 0.", @("x &ne; 8", "The numerator does not create a restriction.", "x &ne; 4", "The coefficient 4 does not make the denominator zero.", "all real numbers", "x = 0 makes the denominator 0.")),
@("Simplify (12x<sup>2</sup>y)/(3xy), assuming variables in denominators are nonzero.", "4x", "Divide coefficients and cancel one x and one y.", @("4xy", "The y cancels completely.", "9x", "The coefficients divide to 4.", "4/y", "The remaining factor is x, not 1/y.")),
@("Multiply (x/(x - 2))((x - 2)/(x + 1)).", "x/(x + 1), x &ne; 2 and x &ne; -1", "Cancel x - 2 and keep restrictions from original denominators.", @("x/(x - 2), x &ne; 2", "The x - 2 factor cancels.", "x/(x + 1), no restriction", "Original denominators create restrictions.", "1/(x + 1)", "The numerator x remains.")),
@("Which expression is undefined at x = 6?", "4/(x - 6)", "The denominator is zero when x = 6.", @("(x - 6)/4", "The denominator is 4, not zero.", "x + 6", "This polynomial is defined for all real x.", "6/x", "This is undefined at x = 0, not x = 6.")),
@("Simplify (x<sup>2</sup> - 4)/(x<sup>2</sup> + 3x + 2).", "(x - 2)/(x + 1), x &ne; -1 and x &ne; -2", "Factor numerator and denominator, then cancel x + 2.", @("(x + 2)/(x + 1), x &ne; -1 and x &ne; -2", "The remaining numerator factor is x - 2.", "(x - 2)/(x + 1), x &ne; -1", "The original denominator also excludes x = -2.", "x - 2, x &ne; -2", "The denominator factor x + 1 remains.")),
@("What is the reciprocal of (x - 5)/(x + 2)?", "(x + 2)/(x - 5)", "The reciprocal flips numerator and denominator.", @("(x - 5)/(x + 2)", "This is the original expression.", "-(x - 5)/(x + 2)", "A reciprocal is not a sign change.", "(x + 5)/(x - 2)", "Signs inside the factors do not change.")),
@("Simplify (x<sup>2</sup> - 1)/(x + 1).", "x - 1, x &ne; -1", "Factor as (x - 1)(x + 1), cancel, and keep the restriction.", @("x + 1, x &ne; -1", "The remaining factor is x - 1.", "x - 1, no restriction", "The original denominator excludes x = -1.", "x<sup>2</sup> + 1, x &ne; -1", "Use difference of squares.")),
@("Simplify (x<sup>2</sup> + 8x + 15)/(x + 3).", "x + 5, x &ne; -3", "Factor the numerator as (x + 3)(x + 5), cancel, and keep x &ne; -3.", @("x + 3, x &ne; -3", "The remaining factor is x + 5.", "x + 5, no restriction", "The original denominator excludes x = -3.", "x<sup>2</sup> + 5, x &ne; -3", "The numerator must be factored.")),
@("Multiply (5/(x - 1))((x - 1)/(2x)).", "5/(2x), x &ne; 1 and x &ne; 0", "Cancel x - 1 and keep restrictions from both original denominators.", @("5/2, x &ne; 1", "The x remains in the denominator.", "5/(2x), no restriction", "Original denominators create restrictions.", "2x/5", "This flips the product.")),
@("Divide x/(x + 6) by 3/(x + 6).", "x/3, x &ne; -6", "Multiply by the reciprocal (x + 6)/3 and cancel x + 6.", @("3/x, x &ne; -6", "This is the reciprocal of the simplified result.", "x/3, no restriction", "The original denominator excludes x = -6.", "1/3, x &ne; -6", "The numerator x remains."))
)

WriteGift (Join-Path $l3 "ALG2_U03_L03_GuidedPractice.gift") (MakeItems "ALG2_U03_L03_GP" $std3 $gp3)
WriteGift (Join-Path $l3 "ALG2_U03_L03_Quiz.gift") (MakeItems "ALG2_U03_L03" $std3 $quiz3)
WriteGift (Join-Path $l4 "ALG2_U03_L04_GuidedPractice.gift") (MakeItems "ALG2_U03_L04_GP" $std4 $gp4)
WriteGift (Join-Path $l4 "ALG2_U03_L04_Quiz.gift") (MakeItems "ALG2_U03_L04" $std4 $quiz4)

$lessonJson3 = @{
    course = "ALG2"; assessment = "Quiz"; unit = "Unit 03"; lesson = "Lesson 03"; title = "Radical Equations and Applications"
    guidedPractice = @{ questionCount = 5; graded = $false; file = "ALG2_U03_L03_GuidedPractice.gift"; feedback = "immediate" }
    masteryThreshold = 80
    primaryStandards = @(@{ code = $std3; description = "Solve radical equations, check for extraneous solutions, and interpret radical models in context."; floridaBenchmark = $fb3 })
    pages = @("P01","P02","P03","P04","P05","P06","P07" | ForEach-Object { @{ title = $_; id = $_; file = "$_.html" } })
    quiz = @{ attemptPolicy = "one_attempt_then_TOR_intervention_if_below_80"; randomizedRetakeRequired = $true; questionBank = $true; questionsPerAttempt = 5; bankSize = 25; file = "ALG2_U03_L03_Quiz.gift" }
}
$quizJson3 = @{
    course = "ALG2"; unit = "Unit 03"; lesson = "Lesson 03"; title = "Quiz: Radical Equations and Applications"
    primaryStandard = @{ code = $std3; description = "Solve radical equations, check for extraneous solutions, and interpret radical models in context."; floridaBenchmark = $fb3 }
    format = "GIFT"; giftFile = "ALG2_U03_L03_Quiz.gift"; questionBankSize = 25; questionsPerAttempt = 5; masteryThreshold = 80
    attemptPolicy = @{ studentAttemptsBeforeIntervention = 1; belowMasteryAction = "Teacher of Record intervention and release of another randomized attempt."; questionReuseRule = "Questions must not repeat exactly across attempts." }
    correctAnswerDistribution = @{ A = 7; B = 6; C = 6; D = 6 }
}
$lessonJson4 = @{
    course = "ALG2"; assessment = "Quiz"; unit = "Unit 03"; lesson = "Lesson 04"; title = "Rational Expression Foundations"
    guidedPractice = @{ questionCount = 5; graded = $false; file = "ALG2_U03_L04_GuidedPractice.gift"; feedback = "immediate" }
    masteryThreshold = 80
    primaryStandards = @(@{ code = $std4; description = "Simplify, multiply, and divide rational expressions while identifying restrictions."; floridaBenchmark = $fb4 })
    pages = @("P01","P02","P03","P04","P05","P06","P07" | ForEach-Object { @{ title = $_; id = $_; file = "$_.html" } })
    quiz = @{ attemptPolicy = "one_attempt_then_TOR_intervention_if_below_80"; randomizedRetakeRequired = $true; questionBank = $true; questionsPerAttempt = 5; bankSize = 25; file = "ALG2_U03_L04_Quiz.gift" }
}
$quizJson4 = @{
    course = "ALG2"; unit = "Unit 03"; lesson = "Lesson 04"; title = "Quiz: Rational Expression Foundations"
    primaryStandard = @{ code = $std4; description = "Simplify, multiply, and divide rational expressions while identifying restrictions."; floridaBenchmark = $fb4 }
    format = "GIFT"; giftFile = "ALG2_U03_L04_Quiz.gift"; questionBankSize = 25; questionsPerAttempt = 5; masteryThreshold = 80
    attemptPolicy = @{ studentAttemptsBeforeIntervention = 1; belowMasteryAction = "Teacher of Record intervention and release of another randomized attempt."; questionReuseRule = "Questions must not repeat exactly across attempts." }
    correctAnswerDistribution = @{ A = 7; B = 6; C = 6; D = 6 }
}

$lessonJson3 | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $l3 "lesson.json") -Encoding UTF8
$quizJson3 | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $l3 "quiz.json") -Encoding UTF8
$lessonJson4 | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $l4 "lesson.json") -Encoding UTF8
$quizJson4 | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $l4 "quiz.json") -Encoding UTF8
