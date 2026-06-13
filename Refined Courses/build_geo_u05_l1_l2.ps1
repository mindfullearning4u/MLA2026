$ErrorActionPreference = "Stop"

function Write-Utf8File($Path, $Content) {
    $dir = Split-Path -Parent $Path
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
    [System.IO.File]::WriteAllText((Join-Path (Get-Location) $Path), $Content, [System.Text.UTF8Encoding]::new($false))
}

function Header($unit, $lesson, $pageTitle, $color, $border) {
    return "<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);""><div style=""font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;"">GEO | Unit $unit | Lesson $lesson</div></div><div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: $color; border-left: 8px solid $border; border-radius: 10px; padding: 24px;""><h1 style=""font-size: 30px; margin-top: 0; margin-bottom: 12px;"">$pageTitle</h1></div>"
}

function Card($title, $body, $bg, $border) {
    return "<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 22px; background: $bg; border-left: 6px solid $border;""><h2 style=""font-size: 24px; margin-top: 0; margin-bottom: 10px;"">$title</h2>$body</div>"
}

function UL($items) {
    $s = "<ul style=""padding-left: 26px;"">"
    foreach ($item in $items) { $s += "<li style=""margin-bottom: 8px;"">$item</li>" }
    return $s + "</ul>"
}

function IncorrectCorrect($incorrect, $correct) {
    return "<p><strong style=""color:#b91c1c;"">Incorrect:</strong></p><p style=""font-size:26px;font-weight:600;color:#b91c1c;"">$incorrect</p><p><strong style=""color:#047857;"">Correct:</strong></p><p style=""font-size:26px;font-weight:600;color:#047857;"">$correct</p>"
}

function Build-Pages($lesson, $title, $standardsHtml, $learnItems, $doItems, $connection, $vocabItems, $notebookItems, $part2Items, $part2Note, $keyConcept, $example1, $example2, $mistakeBad, $mistakeGood, $gpPreview, $independentItems, $evidenceItems, $checkpoint, $criteriaItems) {
    $dir = "GEOMETRY/Units/Unit 05/Lesson $lesson"
    $unit = "05"
    $p01 = Header $unit $lesson "P01 Lesson Overview" "#eef2ff" "#4f46e5"
    $p01 += Card "Lesson Title" "<p style=""font-size: 26px; font-weight: 700; margin: 0;"">$title</p>" "#fffbeb" "#f59e0b"
    $p01 += Card "Standards Covered in This Lesson" $standardsHtml "#f8fafc" "#334155"
    $p01 += Card "What You Will Learn" (UL $learnItems) "#ecfdf5" "#059669"
    $p01 += Card "What You Will Do" (UL $doItems) "#eef2ff" "#4f46e5"
    $p01 += Card "How You Will Show Mastery" (UL @("Complete notebook evidence.","Submit the checkpoint response.","Complete Guided Practice and the lesson quiz.")) "#fef2f2" "#dc2626"
    $p01 += Card "Student-Friendly Standard Connection" "<p>$connection</p>" "#fff7ed" "#ea580c"
    Write-Utf8File "$dir/P01.html" $p01

    $p02 = Header $unit $lesson "P02 Notebook Task &ndash; Part 1" "#eef2ff" "#4f46e5"
    $p02 += Card "Notebook Title" "<p><strong>$title</strong></p>" "#fffbeb" "#f59e0b"
    $p02 += Card "Vocabulary" (UL $vocabItems) "#f8fafc" "#64748b"
    $p02 += Card "Notebook Task" (UL $notebookItems) "#ecfdf5" "#059669"
    $p02 += Card "Common Mistake to Avoid" (IncorrectCorrect $mistakeBad $mistakeGood) "#fef2f2" "#dc2626"
    Write-Utf8File "$dir/P02.html" $p02

    $p03 = Header $unit $lesson "P03 Notebook Task &ndash; Part 2" "#eef2ff" "#4f46e5"
    $p03 += Card "Diagram Reasoning Task" (UL $part2Items) "#ecfdf5" "#059669"
    $p03 += Card "Observation vs. Conclusion" "<p>$part2Note</p>" "#fff7ed" "#ea580c"
    $p03 += Card "Short Mathematical Explanation" "<p>Use complete sentences and cite the circle relationship, transformation, or angle-arc evidence that supports the conclusion.</p>" "#f8fafc" "#64748b"
    Write-Utf8File "$dir/P03.html" $p03

    $p04 = Header $unit $lesson "P04 Concept Development / Worked Examples" "#ecfdf5" "#059669"
    $p04 += Card "Key Concept" "<p>$keyConcept</p>" "#ecfdf5" "#059669"
    $p04 += Card "Worked Example 1" "<p><strong>Example:</strong> $example1</p>" "#fff7ed" "#ea580c"
    $p04 += Card "Worked Example 2" "<p><strong>Example:</strong> $example2</p>" "#fff7ed" "#ea580c"
    $p04 += Card "Error Check" (IncorrectCorrect $mistakeBad $mistakeGood) "#fef2f2" "#dc2626"
    Write-Utf8File "$dir/P04.html" $p04

    $p05 = Header $unit $lesson "P05 Guided Practice" "#ecfdf5" "#059669"
    $p05 += Card "Guided Practice Preview" "<p>$gpPreview</p>" "#ecfdf5" "#059669"
    $p05 += Card "Independent Work" (UL $independentItems) "#fff7ed" "#ea580c"
    $p05 += Card "Before You Submit" (UL @("Check each answer against the diagram evidence.","Use precise circle vocabulary and notation.","Revise explanations that rely only on appearance.")) "#fef2f2" "#dc2626"
    Write-Utf8File "$dir/P05.html" $p05

    $p06 = Header $unit $lesson "P06 Notebook Evidence Submission" "#ecfdf5" "#059669"
    $p06 += Card "Notebook Evidence Checklist" (UL $evidenceItems) "#ecfdf5" "#059669"
    $p06 += Card "Evidence Quality" "<p>Strong notebook evidence shows why the conclusion follows from circle definitions, transformations, measurements, or marked relationships.</p>" "#fff7ed" "#ea580c"
    Write-Utf8File "$dir/P06.html" $p06

    $p07 = Header $unit $lesson "P07 Checkpoint Submission" "#fef2f2" "#dc2626"
    $p07 += Card "Checkpoint Task" "<p>$checkpoint</p>" "#ecfdf5" "#059669"
    $p07 += Card "Mastery Criteria" ((UL $criteriaItems) + "<p><strong>Mastery workflow:</strong> Notebook Evidence &rarr; Checkpoint Submission &rarr; Lesson Quiz</p>") "#fef2f2" "#dc2626"
    Write-Utf8File "$dir/P07.html" $p07
}

function NewQuestion($id, $std, $question, $correctLetter, $correctText, $correctFeedback, $d1, $f1, $d2, $f2, $d3, $f3) {
    return [pscustomobject]@{
        id=$id; standard=$std; question=$question; correctLetter=$correctLetter; correctText=$correctText; correctFeedback=$correctFeedback;
        distractors=@(
            [pscustomobject]@{text=$d1; feedback=$f1},
            [pscustomobject]@{text=$d2; feedback=$f2},
            [pscustomobject]@{text=$d3; feedback=$f3}
        )
    }
}

function BuildGift($items) {
    $out = ""
    foreach ($item in $items) {
        $letters = @("A","B","C","D")
        $wrong = @($item.distractors)
        $wi = 0
        $choices = @()
        foreach ($letter in $letters) {
            if ($letter -eq $item.correctLetter) {
                $choices += "=$letter. $($item.correctText)#$($item.correctFeedback)"
            } else {
                $choices += "~$letter. $($wrong[$wi].text)#$($wrong[$wi].feedback)"
                $wi++
            }
        }
        $texts = $choices | ForEach-Object { ($_ -replace '^[~=][A-D]\. ', '') -replace '#.*$', '' }
        if (($texts | Select-Object -Unique).Count -ne 4) { throw "Duplicate choices in $($item.id)" }
        $out += "::" + $item.id + "::`r`n"
        $out += "Question ID:<br>$($item.id)<br><br>MLA Standard:<br>$($item.standard)<br><br>Question:<br>$($item.question) {`r`n"
        $out += ($choices -join "`r`n")
        $out += "`r`n}`r`n`r`n"
    }
    return $out
}

function Letter($index) {
    $letters = @("A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A","B","C","D","A")
    return $letters[$index]
}

function CircleSimilarityItems($prefix, $count, $startIndex) {
    $items = @()
    $contexts = @("coin","clock face","wheel","round table","button","circular logo","plate","lens","ring","medallion","circular window","target")
    for ($i=0; $i -lt $count; $i++) {
        $n = $startIndex + $i
        $letter = Letter $i
        $c = $contexts[$i % $contexts.Count]
        if ($i % 5 -eq 0) {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.8" "A circle with radius $($i+3) cm is compared to a circle with radius $(($i+3)*2) cm. Which transformation proves the circles are similar?" $letter "A dilation with scale factor 2 maps the smaller circle to the larger circle." "All circles are similar because a dilation can map one radius to the other while preserving circular shape." "A translation alone maps the smaller circle to the larger circle." "A translation changes location but not size, so it cannot change the radius." "A reflection alone changes the radius." "A reflection preserves size and cannot produce a larger circle." "No transformation can compare circles of different sizes." "A dilation is exactly the transformation that compares circles with different radii."
        } elseif ($i % 5 -eq 1) {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.8" "Which pair of features is enough to describe the size and location of a circle?" $letter "Center and radius" "The center gives location and the radius determines size." "Chord and secant" "Chords and secants are related lines but do not fully define one circle." "Arc and tangent" "An arc and tangent do not identify both the center and radius." "Diameter and color" "Diameter gives size, but color is not a geometric feature."
        } elseif ($i % 5 -eq 2) {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.8" "Circle A has diameter $($i+8) units and Circle B has diameter $(($i+8)*3) units. What scale factor maps Circle A to Circle B?" $letter "3" "Corresponding lengths in circles scale by the diameter ratio, so $(($i+8)*3) divided by $($i+8) is 3." "$($i+8)" "This uses the original diameter, not the ratio between diameters." "$(($i+8)*3)" "This uses the image diameter, not the scale factor." "<sup>1</sup>&frasl;<sub>3</sub>" "This is the reverse scale factor from Circle B to Circle A."
        } elseif ($i % 5 -eq 3) {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.8" "A $c is modeled by a circle. Which statement correctly names a radius?" $letter "A segment from the center to a point on the circle" "A radius always connects the center of the circle to a point on the circle." "A segment connecting two points on the circle through the center" "That describes a diameter, not a radius." "A line that touches the circle at one point" "That describes a tangent line." "A line that intersects the circle at two points" "That describes a secant line."
        } else {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.8" "Why does appearance alone not prove that two circular diagrams are similar?" $letter "A transformation argument using centers and radii is needed." "The proof should cite a dilation, possibly with a rigid motion, that maps one circle to the other." "Any two drawings that look round are automatically proven similar." "The conclusion may be true for circles, but a proof needs mathematical reasoning." "Similarity depends on the color of the diagrams." "Color is not a geometric property." "Only circles with the same radius can be similar." "Circles with different radii are similar by dilation."
        }
    }
    return $items
}

function ArcAngleItems($prefix, $count, $startIndex) {
    $items = @()
    for ($i=0; $i -lt $count; $i++) {
        $n = $startIndex + $i
        $letter = Letter $i
        if ($i % 5 -eq 0) {
            $arc = 40 + (10 * ($i % 8))
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.5" "A central angle intercepts an arc measuring $arc&deg;. What is the measure of the central angle?" $letter "$arc&deg;" "A central angle has the same measure as its intercepted arc." "$($arc/2)&deg;" "Halving the arc measure applies to an inscribed angle, not a central angle." "$($arc*2)&deg;" "Doubling the arc measure does not describe a central angle." "Cannot be determined" "The intercepted arc measure is given, so the central angle measure can be determined."
        } elseif ($i % 5 -eq 1) {
            $arc = 80 + (10 * ($i % 7))
            $half = $arc / 2
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.5" "An inscribed angle intercepts an arc measuring $arc&deg;. What is the measure of the inscribed angle?" $letter "$half&deg;" "An inscribed angle measures half its intercepted arc." "$arc&deg;" "That would be the central angle measure, not the inscribed angle." "$($arc*2)&deg;" "This doubles the arc instead of halving it." "Cannot be determined" "The intercepted arc measure is given, so the inscribed angle can be determined by halving the arc."
        } elseif ($i % 5 -eq 2) {
            $angle = 25 + (5 * ($i % 8))
            $arc = $angle * 2
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.5" "An inscribed angle measures $angle&deg;. What is the measure of its intercepted arc?" $letter "$arc&deg;" "The intercepted arc is twice the inscribed angle measure." "$angle&deg;" "This confuses the inscribed angle with the arc it intercepts." "$([Math]::Round($angle/2,1))&deg;" "This halves the angle instead of doubling it to find the arc." "180&deg;" "The intercepted arc is not necessarily a semicircle."
        } elseif ($i % 5 -eq 3) {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.5" "Two chords are congruent in the same circle. What can be concluded about their intercepted minor arcs?" $letter "The intercepted minor arcs are congruent." "Congruent chords in the same circle intercept congruent arcs." "The arcs must add to 180&deg;." "Congruent chords do not necessarily form a semicircle." "One intercepted arc is twice the other." "Congruent chords support equal arcs, not a doubled relationship." "No arc relationship can be concluded." "A chord theorem gives a valid arc conclusion."
        } else {
            $items += NewQuestion "$prefix$('{0:D2}' -f $n)" "MLA.GEO.CIR.5" "Which relationship is correct for an angle with vertex on the circle?" $letter "The angle measure is half the measure of its intercepted arc." "An angle with vertex on the circle is an inscribed angle, so it is half its intercepted arc." "The angle measure equals twice its intercepted arc." "This reverses the inscribed angle relationship." "The angle measure always equals 180&deg;." "Only special cases form a straight angle." "The angle measure equals the circle radius." "Angle measure and radius measure different quantities."
        }
    }
    return $items
}

$l1Standards = "<ul style=""padding-left: 26px;""><li style=""margin-bottom: 8px;""><strong>MLA.GEO.CIR.8:</strong> I can use transformations to prove that all circles are similar.</li></ul>"
Build-Pages "01" "Circle Fundamentals and Similarity" $l1Standards `
@("Use center, radius, diameter, chord, secant, and tangent vocabulary accurately.","Explain why a dilation can map one circle to another.","Use transformation reasoning to prove all circles are similar.") `
@("Label parts of circle diagrams.","Compare circles using centers and radii.","Write short explanations that use transformations as evidence.") `
"This lesson begins Unit 5 by connecting circle vocabulary to similarity transformations, especially dilations." `
@("<strong>Circle:</strong> the set of all points in a plane that are the same distance from a center.","<strong>Radius:</strong> a segment from the center to a point on the circle.","<strong>Diameter:</strong> a chord that passes through the center; its length is twice the radius.","<strong>Chord:</strong> a segment with endpoints on the circle.","<strong>Tangent:</strong> a line that touches a circle at exactly one point.","<strong>Secant:</strong> a line that intersects a circle at two points.") `
@("Sketch a circle and label the center, a radius, a diameter, a chord, a tangent, and a secant.","Write one observation from the diagram and one conclusion that is supported by definitions.","Compare two circles and describe the dilation that maps one radius to the other.") `
@("Identify what is shown: center, radius, diameter, chord, tangent, or secant.","State what can be concluded from the markings and definitions.","Explain how a translation followed by a dilation can map one circle to another.") `
"A diagram may look circular, but a conclusion about similarity should be supported by a transformation argument using the centers and radii." `
"A circle is determined by its center and radius. Since a dilation can scale one radius to another, and a rigid motion can align centers, any circle can be mapped to any other circle by transformations. Therefore, all circles are similar." `
"If Circle A has radius 4 and Circle B has radius 10, the scale factor from A to B is <sup>10</sup>&frasl;<sub>4</sub> = 2.5. A dilation with scale factor 2.5 maps the radius length of Circle A to the radius length of Circle B." `
"A diameter is any segment with endpoints on the circle." `
"A diameter is a chord that passes through the center of the circle." `
"The guided practice checks circle vocabulary, radius and diameter relationships, and transformation reasoning for circle similarity." `
@("Label a circle diagram using correct vocabulary.","Find radius or diameter from given information.","Explain why all circles are similar using a dilation.") `
@("Vocabulary definitions for circle, center, radius, diameter, chord, tangent, and secant.","One labeled circle diagram.","One transformation explanation proving two circles are similar.","One correction of a conclusion that relies only on appearance.") `
"Submit a circle similarity explanation that identifies the center/radius evidence and describes the transformation that maps one circle to another." `
@("Circle vocabulary is used accurately.","The dilation or scale factor is identified correctly.","The explanation supports the conclusion with mathematical evidence.")

$l2Standards = "<ul style=""padding-left: 26px;""><li style=""margin-bottom: 8px;""><strong>MLA.GEO.CIR.5:</strong> I can solve problems involving arcs and angles in circles.</li></ul>"
Build-Pages "02" "Arcs, Angles, and Chords" $l2Standards `
@("Relate central angles to intercepted arcs.","Use inscribed angle relationships to find missing measures.","Connect congruent chords with congruent arcs in the same circle.") `
@("Interpret circle diagrams with arcs, central angles, inscribed angles, and chords.","Calculate missing angle or arc measures.","Write short justifications for circle angle relationships.") `
"This lesson builds the arc and angle theorem base needed for circle applications, inscribed figures, tangents, secants, and sector measurement." `
@("<strong>Arc:</strong> a connected part of a circle.","<strong>Minor arc:</strong> an arc measuring less than 180&deg;.","<strong>Major arc:</strong> an arc measuring greater than 180&deg;.","<strong>Central angle:</strong> an angle with vertex at the center of the circle.","<strong>Inscribed angle:</strong> an angle with vertex on the circle and sides that contain chords.","<strong>Chord:</strong> a segment with endpoints on the circle.") `
@("Draw a circle with one central angle and one inscribed angle.","Label the intercepted arc for each angle.","Write what relationship is shown and what can be concluded.") `
@("Identify whether an angle is central or inscribed.","Use the correct arc-angle relationship.","Explain how chord congruence supports an arc conclusion.") `
"A circle diagram may show several angles and arcs; the conclusion depends on the vertex location and the intercepted arc, not on which angle looks larger." `
"A central angle has the same measure as its intercepted arc. An inscribed angle has half the measure of its intercepted arc. Congruent chords in the same circle intercept congruent arcs." `
"If an inscribed angle intercepts a 96&deg; arc, the angle measures <sup>1</sup>&frasl;<sub>2</sub>(96&deg;) = 48&deg;." `
"An inscribed angle has the same measure as its intercepted arc." `
"An inscribed angle has half the measure of its intercepted arc." `
"The guided practice checks central angles, inscribed angles, intercepted arcs, and chord-arc relationships." `
@("Classify angles as central or inscribed.","Find missing arc and angle measures.","Justify one conclusion using the correct circle theorem.") `
@("Vocabulary definitions for arc, central angle, inscribed angle, and chord.","One diagram showing a central angle and its intercepted arc.","One diagram showing an inscribed angle and its intercepted arc.","One written explanation using a chord or arc relationship.") `
"Submit a circle angle explanation that identifies the angle type, the intercepted arc, and the theorem used to find the measure." `
@("The angle type is identified correctly.","The intercepted arc is matched correctly.","The calculation and justification use the correct circle relationship.")

$l1gp = CircleSimilarityItems "GEO_U05_L01_GP" 5 1
$l1quiz = CircleSimilarityItems "GEO_U05_L01_Q" 25 1
$l2gp = ArcAngleItems "GEO_U05_L02_GP" 5 1
$l2quiz = ArcAngleItems "GEO_U05_L02_Q" 25 1

Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 01/GEO_U05_L01_GuidedPractice.gift" (BuildGift $l1gp)
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 01/GEO_U05_L01_Quiz.gift" (BuildGift $l1quiz)
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 02/GEO_U05_L02_GuidedPractice.gift" (BuildGift $l2gp)
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 02/GEO_U05_L02_Quiz.gift" (BuildGift $l2quiz)

$l1LessonJson = '{"course":"GEO","unit":"Unit 05","lesson":"Lesson 01","title":"Circle Fundamentals and Similarity","primaryStandards":[{"code":"MLA.GEO.CIR.8","description":"I can use transformations to prove that all circles are similar."}],"assessment":"Quiz","pages":[{"id":"P01","file":"P01.html"},{"id":"P02","file":"P02.html"},{"id":"P03","file":"P03.html"},{"id":"P04","file":"P04.html"},{"id":"P05","file":"P05.html"},{"id":"P06","file":"P06.html"},{"id":"P07","file":"P07.html"}],"guidedPractice":{"file":"GEO_U05_L01_GuidedPractice.gift","questionCount":5},"quiz":{"file":"GEO_U05_L01_Quiz.gift","bankSize":25}}'
$l1QuizJson = '{"course":"GEO","unit":"Unit 05","lesson":"Lesson 01","title":"Circle Fundamentals and Similarity Quiz","standards":[{"code":"MLA.GEO.CIR.8","description":"I can use transformations to prove that all circles are similar."}],"giftFile":"GEO_U05_L01_Quiz.gift","questionCount":25,"questionType":"multiple_choice","choicesPerQuestion":4,"masteryThreshold":80}'
$l2LessonJson = '{"course":"GEO","unit":"Unit 05","lesson":"Lesson 02","title":"Arcs, Angles, and Chords","primaryStandards":[{"code":"MLA.GEO.CIR.5","description":"I can solve problems involving arcs and angles in circles."}],"assessment":"Quiz","pages":[{"id":"P01","file":"P01.html"},{"id":"P02","file":"P02.html"},{"id":"P03","file":"P03.html"},{"id":"P04","file":"P04.html"},{"id":"P05","file":"P05.html"},{"id":"P06","file":"P06.html"},{"id":"P07","file":"P07.html"}],"guidedPractice":{"file":"GEO_U05_L02_GuidedPractice.gift","questionCount":5},"quiz":{"file":"GEO_U05_L02_Quiz.gift","bankSize":25}}'
$l2QuizJson = '{"course":"GEO","unit":"Unit 05","lesson":"Lesson 02","title":"Arcs, Angles, and Chords Quiz","standards":[{"code":"MLA.GEO.CIR.5","description":"I can solve problems involving arcs and angles in circles."}],"giftFile":"GEO_U05_L02_Quiz.gift","questionCount":25,"questionType":"multiple_choice","choicesPerQuestion":4,"masteryThreshold":80}'

Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 01/lesson.json" $l1LessonJson
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 01/quiz.json" $l1QuizJson
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 02/lesson.json" $l2LessonJson
Write-Utf8File "GEOMETRY/Units/Unit 05/Lesson 02/quiz.json" $l2QuizJson
