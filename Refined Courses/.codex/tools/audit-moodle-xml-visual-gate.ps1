param(
  [Parameter(Mandatory=$true)]
  [string]$CourseRoot,

  [Parameter(Mandatory=$false)]
  [string]$ReportPath
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $CourseRoot)) {
  throw "Course root not found: $CourseRoot"
}

$resolvedRoot = (Resolve-Path -LiteralPath $CourseRoot).Path
if (-not $ReportPath) {
  $auditDir = Join-Path $resolvedRoot 'Course Audit'
  if (-not (Test-Path -LiteralPath $auditDir)) {
    New-Item -ItemType Directory -Path $auditDir | Out-Null
  }
  $courseName = Split-Path $resolvedRoot -Leaf
  $safeCourseName = ($courseName -replace '[^A-Za-z0-9]+','_').Trim('_')
  $ReportPath = Join-Path $auditDir "$safeCourseName`_ASSESSMENT_VISUAL_GATE_AUDIT.md"
}

$hardPattern = '(?i)(use the (graph|table|diagram|number line)|shown in the (graph|table|diagram)|from the (graph|table|diagram)|given the (graph|table|diagram)|which graph represents|which graph shows|which graph|matches the graph|represents the graph|based on the graph|according to the graph|the graph of|number line reference|number line|sign-rule table|ratio table shows|ratio table|a table shows|the table shows|table has|table matches|which table matches|which table|which points are in a table|create a table|data table|scatterplot|dot plot|histogram|box plot|two-way table|coordinate plane|shaded region|solution region)'

$xmlFiles = Get-ChildItem -Path $resolvedRoot -Recurse -Filter '*.xml' |
  Where-Object {
    ($_.FullName -match '\\Moodle XML\\' -or $_.Name -match 'MoodleXML') -and
    $_.FullName -notmatch '\\Moodle XML Visual Trial\\' -and
    $_.FullName -notmatch '\\_Archive\\' -and
    $_.FullName -notmatch '\\Archive\\'
  }

$rows = New-Object System.Collections.Generic.List[object]
$totalQuestions = 0
$visualPresent = 0
$mandatoryRequired = 0
$mandatoryPresent = 0
$mandatoryMissing = 0

foreach ($file in $xmlFiles) {
  try {
    [xml]$xml = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  } catch {
    $rows.Add([pscustomobject]@{
      File = $file.FullName.Substring($resolvedRoot.Length + 1)
      QuestionID = 'FILE_PARSE_ERROR'
      CurrentRepresentation = 'Unreadable XML'
      NeededRepresentation = 'Valid Moodle XML'
      Reason = $_.Exception.Message
      Recommendation = 'FAIL - repair XML before certification'
    })
    $mandatoryRequired++
    $mandatoryMissing++
    continue
  }

  foreach ($question in @($xml.quiz.question | Where-Object { $_.type -ne 'category' })) {
    $totalQuestions++
    $html = $question.questiontext.text.'#cdata-section'
    if (-not $html) { $html = $question.questiontext.text.InnerText }
    if (-not $html) { $html = [string]$question.questiontext.text }
    $plain = ($html -replace '<[^>]+>', ' ' -replace '&nbsp;', ' ' -replace '\s+', ' ').Trim()
    $hasEmbeddedVisual = ($null -ne $question.questiontext.file) -or ($html -match '<img\b') -or ($html -match '<table\b') -or ($html -match '<svg\b')
    if ($hasEmbeddedVisual) { $visualPresent++ }

    if ($plain -match $hardPattern) {
      $mandatoryRequired++
      $needed = 'Embedded visual/table/diagram in question text'
      if ($hasEmbeddedVisual) {
        $mandatoryPresent++
        $recommendation = 'PASS - mandatory representation present'
        $current = 'Embedded representation present'
      } else {
        $mandatoryMissing++
        $recommendation = 'FAIL - add representation before certification'
        $current = 'No embedded representation found'
      }

      $rows.Add([pscustomobject]@{
        File = $file.FullName.Substring($resolvedRoot.Length + 1)
        QuestionID = $question.name.text
        CurrentRepresentation = $current
        NeededRepresentation = $needed
        Reason = $plain.Substring(0, [Math]::Min(220, $plain.Length))
        Recommendation = $recommendation
      })
    }
  }
}

$decision = if ($mandatoryMissing -eq 0) { 'PASS' } else { 'FAIL' }
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz'

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# Assessment Visual Gate Audit")
$lines.Add("")
$lines.Add("Generated: $timestamp")
$lines.Add("")
$lines.Add('Course root: `' + $resolvedRoot + '`')
$lines.Add("")
$lines.Add("## Summary")
$lines.Add("")
$lines.Add("- Moodle XML files checked: $($xmlFiles.Count)")
$lines.Add("- Questions checked: $totalQuestions")
$lines.Add("- Questions with embedded visual/table markup: $visualPresent")
$lines.Add("- Mandatory visuals required: $mandatoryRequired")
$lines.Add("- Mandatory visuals present: $mandatoryPresent")
$lines.Add("- Mandatory visuals missing: $mandatoryMissing")
$lines.Add("- Final decision: **$decision**")
$lines.Add("")
$lines.Add("## Certification Rule")
$lines.Add("")
$lines.Add("PASS requires every mandatory assessment visual, table, diagram, graph, number line, or data display to be embedded directly inside the question where students need it.")
$lines.Add("")
$lines.Add("## Mandatory Visual Findings")
$lines.Add("")
$lines.Add("| File | Question ID | Current Representation | Needed Representation | Reason | Recommendation |")
$lines.Add("|---|---|---|---|---|---|")

foreach ($row in $rows) {
  $reason = $row.Reason -replace '\|', '\|' -replace '\r?\n', ' '
  $lines.Add('| `' + $row.File + '` | `' + $row.QuestionID + '` | ' + $row.CurrentRepresentation + ' | ' + $row.NeededRepresentation + ' | ' + $reason + ' | ' + $row.Recommendation + ' |')
}

Set-Content -LiteralPath $ReportPath -Value $lines -Encoding UTF8

[pscustomobject]@{
  CourseRoot = $resolvedRoot
  XmlFilesChecked = $xmlFiles.Count
  QuestionsChecked = $totalQuestions
  QuestionsWithVisualMarkup = $visualPresent
  MandatoryVisualsRequired = $mandatoryRequired
  MandatoryVisualsPresent = $mandatoryPresent
  MandatoryVisualsMissing = $mandatoryMissing
  FinalDecision = $decision
  ReportPath = $ReportPath
}
