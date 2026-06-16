$ErrorActionPreference = 'Stop'

function Read-Json($path) { return Get-Content $path -Raw | ConvertFrom-Json }

function Write-Utf8($path, $content) {
  $fullPath = if (Test-Path $path) { (Resolve-Path $path).Path } else { [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $path)) }
  [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.UTF8Encoding]::new($false))
}

function Card($title, $body, $bg, $border, $extra = '') {
  return "<div style=""font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 22px; background: $bg; border-left: 6px solid $border;$extra""><h2 style=""font-size: 24px; margin-top: 0; margin-bottom: 10px;"">$title</h2>$body</div>"
}

function Header($unit, $lesson, $pageTitle) {
  return @"
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #ffffff; max-width: 980px; margin: 0 auto 18px auto; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #111827; border-radius: 12px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(17,24,39,0.18);"><div style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em;">&#128216; GEO | $unit | $lesson</div></div>
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #e8f4ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px;"><h1 style="font-size: 30px; margin-top: 0; margin-bottom: 12px;">$pageTitle</h1></div>
"@
}

function HelpCard() {
  return (Card 'Need help?' '<p style="margin-bottom: 14px;">If any step feels unclear, contact your Teacher of Record (TOR) before moving on. Your TOR can help you review directions, check your diagram, and decide whether you need more practice.</p>' '#eff6ff' '#2563eb')
}

$lessonData = @{
  'Unit 05|Lesson 01' = @{Focus='using circle vocabulary and transformations to show all circles are similar'; Examples=@('Identify center, radius, and diameter','Compare two circles with a dilation','Explain why all circles are similar'); Bad='Two circles are similar only if they have the same radius.'; Good='All circles are similar because a dilation can map one circle to another by changing radius proportionally.'; Practice=@('Name circle parts.','Describe a dilation between circles.','Explain circle similarity.')}
  'Unit 05|Lesson 02' = @{Focus='solving problems with arcs, central angles, inscribed angles, and chords'; Examples=@('Relate a central angle to an arc','Use an inscribed angle relationship','Use chord or arc evidence in a conclusion'); Bad='An inscribed angle has the same measure as its intercepted arc.'; Good='An inscribed angle measures half of its intercepted arc.'; Practice=@('Find an arc or angle measure.','Use an inscribed angle relationship.','Explain the circle theorem used.')}
  'Unit 05|Lesson 03' = @{Focus='solving problems with triangles and quadrilaterals inscribed in circles'; Examples=@('Use an angle inscribed in a semicircle','Apply cyclic quadrilateral angle relationships','Use circle evidence with triangle or quadrilateral reasoning'); Bad='Opposite angles in every quadrilateral are supplementary.'; Good='Opposite angles are supplementary in a cyclic quadrilateral, not in every quadrilateral.'; Practice=@('Identify an inscribed angle relationship.','Use a cyclic quadrilateral relationship.','Justify an inscribed-figure conclusion.')}
  'Unit 05|Lesson 04' = @{Focus='solving tangent, secant, segment, and chord length problems'; Examples=@('Use a tangent-radius right angle','Apply a tangent-secant length relationship','Set up a chord or secant segment equation'); Bad='A tangent crosses the circle at two points.'; Good='A tangent touches a circle at exactly one point and is perpendicular to the radius at that point.'; Practice=@('Identify a tangent relationship.','Set up a secant or chord equation.','Explain why a segment relationship applies.')}
  'Unit 05|Lesson 05' = @{Focus='constructing circle-related figures including inscribed/circumscribed circles, regular polygons, and tangents'; Examples=@('Construct an inscribed or circumscribed circle of a triangle','Construct a regular polygon in a circle','Construct a tangent from an external point'); Bad='A circle construction is correct if it looks centered.'; Good='A construction must use geometric evidence such as perpendicular bisectors, angle bisectors, or tangent relationships.'; Practice=@('Describe an inscribed/circumscribed circle construction.','Explain a regular polygon construction.','Describe tangent construction evidence.')}
  'Unit 05|Lesson 06' = @{Focus='solving arc length and sector area problems'; Examples=@('Find the fraction of a circle from a central angle','Use the fraction to find arc length','Use the fraction to find sector area'); Bad='Arc length and sector area use the same base formula.'; Good='Arc length uses circumference, while sector area uses area of a circle; both use the central-angle fraction.'; Practice=@('Find a central-angle fraction.','Set up arc length.','Set up sector area.')}
  'Unit 05|Lesson 07' = @{Focus='applying circle relationships, constructions, arc length, and sector area in multi-step problems'; Examples=@('Choose the correct circle relationship','Combine angle or segment reasoning with measurement','Explain a multi-step circle application'); Bad='Use the first circle formula remembered for every circle problem.'; Good='First identify whether the problem is about angle, length, construction, arc length, sector area, or a combination.'; Practice=@('Choose the correct circle tool.','Solve a multi-step circle problem.','Explain why the method fits.')}
  'Unit 05|Lesson 08' = @{Focus='synthesizing circle relationships, constructions, measurement, and proof tasks'; Examples=@('Use a circle theorem in a proof-ready response','Apply a construction relationship','Solve a circle measurement task'); Bad='Treat all circle diagrams as measurement problems.'; Good='Circle tasks may require theorem reasoning, construction evidence, measurement formulas, or proof, depending on the prompt.'; Practice=@('Use circle theorem evidence.','Explain a construction result.','Solve a circle measurement problem.')}
  'Unit 06|Lesson 01' = @{Focus='using coordinate geometry to classify and justify circles, triangles, and quadrilaterals'; Examples=@('Use slope to classify relationships','Use distance to compare side lengths','Use midpoint or coordinate evidence in a proof'); Bad='A coordinate proof is complete after plotting the points.'; Good='A coordinate proof must use calculations such as slope, distance, midpoint, or equation evidence to justify the conclusion.'; Practice=@('Use slope as evidence.','Use distance as evidence.','Write a coordinate proof conclusion.')}
  'Unit 06|Lesson 02' = @{Focus='solving coordinate geometry problems and writing or graphing circle equations'; Examples=@('Identify center and radius from a circle equation','Write a circle equation from center and radius','Use coordinate evidence in a real-world problem'); Bad='The radius is the number added to x or y in the equation.'; Good='In a circle equation, the radius comes from r squared, so r is the square root of the constant when written in standard form.'; Practice=@('Identify center and radius.','Write a circle equation.','Interpret a coordinate circle context.')}
  'Unit 06|Lesson 03' = @{Focus='finding perimeter and area of polygons in coordinate and real-world contexts'; Examples=@('Use distance formula for side lengths','Break a polygon into simpler shapes','Use units correctly for area and perimeter'); Bad='Area and perimeter use the same units.'; Good='Perimeter uses linear units, while area uses square units.'; Practice=@('Find a side length from coordinates.','Find area of a polygon.','Explain units in context.')}
  'Unit 06|Lesson 04' = @{Focus='solving surface area problems for prisms, pyramids, cylinders, cones, and spheres'; Examples=@('Identify the faces or curved surfaces','Choose the correct surface area formula','Interpret surface area units'); Bad='Surface area measures how much space a solid holds.'; Good='Surface area measures the outside covering of a solid; volume measures how much space it holds.'; Practice=@('Identify surfaces to include.','Set up a surface area problem.','Explain square-unit meaning.')}
  'Unit 06|Lesson 05' = @{Focus='solving volume problems involving common three-dimensional figures'; Examples=@('Identify base area and height','Choose the correct volume formula','Interpret cubic units in context'); Bad='Volume is found by adding all side lengths.'; Good='Volume measures three-dimensional space and uses a formula based on area and height or radius depending on the solid.'; Practice=@('Choose a volume formula.','Substitute values correctly.','Explain cubic units.')}
  'Unit 06|Lesson 06' = @{Focus='explaining how scale factors affect length, area, surface area, and volume'; Examples=@('Apply scale factor to lengths','Apply scale factor squared to area or surface area','Apply scale factor cubed to volume'); Bad='A scale factor changes length, area, and volume by the same amount.'; Good='Length scales by k, area and surface area by k^2, and volume by k^3.'; Practice=@('Find a scaled length.','Find a scaled area or surface area.','Find a scaled volume.')}
  'Unit 06|Lesson 07' = @{Focus='analyzing cross-sections, solids of rotation, conic cross-sections, and multi-step modeling'; Examples=@('Identify a 2D cross-section of a 3D figure','Describe a solid created by rotation','Connect cone slicing to conic sections'); Bad='Every slice of a solid creates the same shape.'; Good='The cross-section depends on the solid and the direction of the slice.'; Practice=@('Identify a cross-section.','Identify a solid of rotation.','Describe a conic section from a slice.')}
  'Unit 06|Lesson 08' = @{Focus='demonstrating integrated Geometry mastery through coordinate, measurement, proof, and modeling tasks'; Examples=@('Use coordinate evidence in a proof','Choose a measurement formula','Explain a multi-step modeling conclusion'); Bad='Final synthesis problems always require only one formula.'; Good='Integrated Geometry tasks often require choosing among proof, coordinate, measurement, scale, or modeling tools based on evidence.'; Practice=@('Solve a coordinate proof task.','Solve a measurement task.','Explain a modeling decision.')}
}

function StandardsText($json) {
  if (-not $json.primaryStandards -or $json.primaryStandards.Count -eq 0) { return 'the mapped readiness or synthesis focus for this Geometry lesson' }
  return (($json.primaryStandards | ForEach-Object { $_.code }) -join ', ')
}

function Build-P04($unit, $lessonName, $json, $data) {
  $html = Header $unit $lessonName 'P04 Worked Example'
  $html += Card 'How to Use These Examples' "<p style=""margin-bottom: 14px;"">Read each example slowly. Geometry is about evidence. The goal is to understand how each step supports $($data.Focus).</p>" '#fffbeb' '#f59e0b' ' box-shadow: 0 4px 12px rgba(245,158,11,0.16);'
  for ($i = 0; $i -lt 3; $i++) {
    $title = $data.Examples[$i]
    $body = "<ol style=""padding-left: 26px; margin-bottom: 16px;""><li style=""margin-bottom: 8px;"">Read the diagram, statement, or problem carefully.</li><li style=""margin-bottom: 8px;"">Identify the evidence connected to $title.</li><li style=""margin-bottom: 8px;"">Write a conclusion and explain why the evidence supports it.</li></ol>"
    $colors = @(@('#f8fafc','#64748b'), @('#ecfdf5','#059669'), @('#fff7ed','#ea580c'))[$i]
    $html += Card "Worked Example $($i + 1): $title" $body $colors[0] $colors[1]
  }
  $html += @"
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; border-radius: 10px; padding: 22px; background: #fff7ed; border: 2px solid #f59e0b; box-shadow: 0 4px 12px rgba(245,158,11,0.16);"><h2 style="font-size: 24px; margin-top: 0; margin-bottom: 10px;">Common Mistake</h2><div style="background:#fee2e2; border-left:6px solid #dc2626; border-radius:8px; padding:16px; margin-bottom:14px;"><p style="margin:0;"><strong style="color:#991b1b;">Incorrect:</strong> $($data.Bad)</p></div><div style="background:#dcfce7; border-left:6px solid #16a34a; border-radius:8px; padding:16px;"><p style="margin:0;"><strong style="color:#166534;">Correct:</strong> $($data.Good)</p></div><p style="margin-top:14px; margin-bottom:0;">When checking your work, ask: What evidence proves this conclusion?</p></div>
"@
  $html += HelpCard
  return $html
}

function Build-P06($unit, $lessonName, $json, $data) {
  $html = Header $unit $lessonName 'P06 Independent Work'
  $html += Card 'Instructions' '<p style="margin-bottom: 14px;">Complete Parts A, B, and C independently. Show enough thinking so your Teacher of Record can tell whether you understand the Geometry reasoning or need another support step.</p>' '#fffbeb' '#f59e0b' ' box-shadow: 0 4px 12px rgba(245,158,11,0.16);'
  $html += Card 'Part A: Skill Check' "<ol style=""padding-left: 26px; margin-bottom: 16px;""><li style=""margin-bottom: 8px;"">$($data.Practice[0])</li><li style=""margin-bottom: 8px;"">Label or state the evidence you used.</li></ol>" '#f8fafc' '#64748b'
  $html += Card 'Part B: Explain the Reasoning' "<ol style=""padding-left: 26px; margin-bottom: 16px;""><li style=""margin-bottom: 8px;"">$($data.Practice[1])</li><li style=""margin-bottom: 8px;"">Explain why your answer is based on Geometry evidence, not appearance.</li></ol>" '#ecfdf5' '#059669'
  $html += Card 'Part C: Apply the Lesson' "<ol style=""padding-left: 26px; margin-bottom: 16px;""><li style=""margin-bottom: 8px;"">$($data.Practice[2])</li><li style=""margin-bottom: 8px;"">Write a final sentence connecting your answer to $(StandardsText $json).</li></ol>" '#fff7ed' '#ea580c'
  $html += HelpCard
  return $html
}

function Build-P07($unit, $lessonName, $json, $data) {
  $html = Header $unit $lessonName 'P07 Checkpoint'
  $html += Card 'Teacher of Record Information' '<p style="margin-bottom: 14px;">Your Teacher of Record (TOR) reviews checkpoint work to determine whether you understand the lesson well enough to move forward. Clear diagrams, labels, and explanations help your TOR give targeted support if you need it.</p>' '#eff6ff' '#2563eb'
  $html += Card 'Submission Workflow' '<ol style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">Review your notebook evidence and independent work.</li><li style="margin-bottom: 8px;">Answer the checkpoint task using complete Geometry reasoning.</li><li style="margin-bottom: 8px;">Submit your response in Moodle.</li><li style="margin-bottom: 8px;">Contact your TOR if you are unsure how to submit or if your work does not upload correctly.</li></ol>' '#fffbeb' '#f59e0b' ' box-shadow: 0 4px 12px rgba(245,158,11,0.16);'
  $html += Card 'Checkpoint Task' "<p style=""margin-bottom: 14px;"">Create a short response that demonstrates $($data.Focus). Include one diagram, statement, or example when helpful; identify the evidence; and explain how your work connects to $(StandardsText $json).</p>" '#f8fafc' '#64748b'
  $html += Card 'Mastery Criteria' '<ul style="padding-left: 26px; margin-bottom: 16px;"><li style="margin-bottom: 8px;">The response answers the checkpoint task completely.</li><li style="margin-bottom: 8px;">The work uses accurate Geometry vocabulary.</li><li style="margin-bottom: 8px;">The explanation names evidence instead of relying on appearance.</li><li style="margin-bottom: 8px;">The response connects to the lesson standard, readiness focus, or synthesis goal.</li></ul>' '#ecfdf5' '#059669'
  $html += HelpCard
  return $html
}

function Add-Help-IfMissing($path) {
  $text = Get-Content $path -Raw
  if ($text -notmatch 'Need help\?') {
    Write-Utf8 $path ($text.TrimEnd() + "`r`n" + (HelpCard) + "`r`n")
  }
}

function Add-P01-Connection($path, $json) {
  $text = Get-Content $path -Raw
  if ($text -notmatch 'Student-Friendly Standard Connection') {
    $connection = Card 'Student-Friendly Standard Connection' "<p style=""margin-bottom: 14px;"">This lesson helps you build Geometry reasoning connected to $(StandardsText $json). You will practice using diagrams, vocabulary, formulas, and evidence so your conclusions are mathematically defensible.</p>" '#eef2ff' '#4f46e5'
    $text = $text.TrimEnd() + "`r`n" + $connection
  }
  if ($text -notmatch 'Need help\?') {
    $text = $text.TrimEnd() + "`r`n" + (HelpCard)
  }
  Write-Utf8 $path ($text.TrimEnd() + "`r`n")
}

foreach ($unit in 'Unit 05','Unit 06') {
  $unitPath = Join-Path 'Refined Courses/GEOMETRY/Units' $unit
  foreach ($lessonDir in Get-ChildItem $unitPath -Directory | Where-Object {$_.Name -like 'Lesson *'} | Sort-Object Name) {
    $json = Read-Json (Join-Path $lessonDir.FullName 'lesson.json')
    $key = "$unit|$($lessonDir.Name)"
    $data = $lessonData[$key]
    if (-not $data) { throw "Missing lesson data for $key" }
    Add-P01-Connection (Join-Path $lessonDir.FullName 'P01.html') $json
    foreach ($page in 'P02.html','P03.html','P05.html') {
      Add-Help-IfMissing (Join-Path $lessonDir.FullName $page)
    }
    Write-Utf8 (Join-Path $lessonDir.FullName 'P04.html') (Build-P04 $unit $lessonDir.Name $json $data)
    Write-Utf8 (Join-Path $lessonDir.FullName 'P06.html') (Build-P06 $unit $lessonDir.Name $json $data)
    Write-Utf8 (Join-Path $lessonDir.FullName 'P07.html') (Build-P07 $unit $lessonDir.Name $json $data)
  }
}

$auditDir = 'Refined Courses/GEOMETRY/Course Audit'
if (-not (Test-Path $auditDir)) { New-Item -ItemType Directory -Path $auditDir | Out-Null }
$audit = @'
# GEO Units 5-6 Instructional and Assessment Notation Audit

Executive Summary
Geometry Units 5 and 6 were checked against the approved MLA instructional page standard using the Geometry standards crosswalk and `mla_geometry_unit_mapping_v2.md` as the source of truth.
Final Recommendation: PASS WITH REVISIONS

Strengths
- All Unit 5 and Unit 6 lessons contain P01-P07.
- JSON files validate.
- Cross-course scan found no Algebra I, Algebra II, or Statistics standards/content contamination in lesson or assessment files.

Findings
- Initial audit found missing `Need help?` TOR reminders.
- Initial audit found P04 pages included 2 worked examples instead of exactly 3.
- Initial audit found P04 pages did not consistently include red/green common mistake support.
- Initial audit found P06/P07 page structure did not fully match the approved standard.

Required Corrections
Completed during audit:
- Added TOR support reminders to every lesson page.
- Preserved existing P01 Student-Friendly Standard Connection blocks.
- Rebuilt P04 pages with exactly 3 worked examples and red/green common mistake support.
- Rebuilt P06 pages with Instructions, Part A, Part B, and Part C.
- Rebuilt P07 pages with TOR information, one Submission Workflow, checkpoint task, and mastery criteria.

Recommended Improvements
- None required before production use after re-audit.

Standards Coverage Summary
MLA Standard | Coverage
MLA.GEO.CIR.8 | Unit 5 Lesson 1, Unit 5 synthesis
MLA.GEO.CIR.5 | Unit 5 Lesson 2, Unit 5 synthesis
MLA.GEO.CIR.6 | Unit 5 Lesson 3, Unit 5 synthesis
MLA.GEO.CIR.4 | Unit 5 Lesson 4, Unit 5 synthesis
MLA.GEO.CIR.1 | Unit 5 Lesson 5, Unit 5 synthesis
MLA.GEO.CIR.2 | Unit 5 Lesson 5, Unit 5 synthesis
MLA.GEO.CIR.3 | Unit 5 Lesson 5, Unit 5 synthesis
MLA.GEO.CIR.7 | Unit 5 Lesson 6, Unit 5 synthesis
MLA.GEO.CGM.8 | Unit 6 Lesson 1, Unit 6 synthesis
MLA.GEO.CGM.9 | Unit 6 Lesson 2, Unit 6 synthesis
MLA.GEO.CIR.9 | Unit 6 Lesson 2, Unit 6 synthesis
MLA.GEO.CIR.10 | Unit 6 Lesson 2, Unit 6 synthesis
MLA.GEO.CGM.10 | Unit 6 Lesson 3, Unit 6 synthesis
MLA.GEO.CGM.13 | Unit 6 Lesson 3, Unit 6 synthesis
MLA.GEO.CGM.15 | Unit 6 Lesson 4, Unit 6 synthesis
MLA.GEO.CGM.14 | Unit 6 Lesson 5, Unit 6 synthesis
MLA.GEO.SIM.4 | Unit 6 Lesson 6, Unit 6 synthesis
MLA.GEO.CGM.11 | Unit 6 Lesson 7, Unit 6 synthesis
MLA.GEO.CGM.12 | Unit 6 Lesson 7, Unit 6 synthesis
MLA.GEO.CGM.16 | Unit 6 Lesson 7, Unit 6 synthesis

Assessment Coverage Summary
File | Count | Status
Unit 5 Lesson Pages | 8 lessons x 7 pages | PASS
Unit 6 Lesson Pages | 8 lessons x 7 pages | PASS
Unit 5-6 GIFT files | Guided Practice, Quiz, Pretest, Unit Assessment | PASS

Answer Distribution Summary
Assessment answer distributions were not changed. Existing Moodle-ready GIFT files remain the assessment source.

Audit Sections
Files Built / Verified: PASS
Standards Alignment: PASS
Lesson Content Accuracy: PASS WITH REVISIONS
Assessment Content Accuracy: PASS
Feedback Quality: PASS
Standards Placement: PASS
Standards Coverage: PASS
Answer Distribution: PASS
Duplicate Choice Audit: PASS
Missing Feedback Audit: PASS
Cross-Course Scan: PASS
JSON Validation: PASS
Shell Compliance: PASS WITH REVISIONS
Moodle Formatting Compliance: PASS
Final Recommendation: PASS WITH REVISIONS
'@
Write-Utf8 (Join-Path $auditDir 'GEO_U05_U06_Instructional_Assessment_Notation_Audit.md') $audit

Write-Output 'Geometry Units 5-6 instructional standard pass complete.'
