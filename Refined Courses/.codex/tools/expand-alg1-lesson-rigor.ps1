param(
  [Parameter(Mandatory=$true)]
  [string]$CourseRoot,

  [int]$MinimumWords = 250
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function ConvertTo-PlainText {
  param([string]$Html)
  $text = [regex]::Replace($Html, "<script[\s\S]*?</script>", " ", "IgnoreCase")
  $text = [regex]::Replace($text, "<style[\s\S]*?</style>", " ", "IgnoreCase")
  $text = [regex]::Replace($text, "<[^>]+>", " ")
  $text = [System.Net.WebUtility]::HtmlDecode($text)
  $text = $text -replace "\s+", " "
  return $text.Trim()
}

function Get-WordCount {
  param([string]$Text)
  if ([string]::IsNullOrWhiteSpace($Text)) { return 0 }
  return ([regex]::Matches($Text, "\b[\w']+\b")).Count
}

function Get-LessonMetadata {
  param([string]$LessonDir)
  $jsonPath = Join-Path $LessonDir "lesson.json"
  if (Test-Path -LiteralPath $jsonPath) {
    try {
      return (Get-Content -LiteralPath $jsonPath -Raw | ConvertFrom-Json)
    } catch {
      return $null
    }
  }
  return $null
}

function Get-StandardsText {
  param($Metadata)
  if ($null -eq $Metadata -or -not ($Metadata.PSObject.Properties.Name -contains "primaryStandards") -or $null -eq $Metadata.primaryStandards) {
    return "the mapped lesson standard and readiness skill"
  }

  $codes = @()
  foreach ($standard in $Metadata.primaryStandards) {
    if ($standard.code) { $codes += [string]$standard.code }
  }

  if ($codes.Count -eq 0) {
    return "the mapped lesson standard and readiness skill"
  }

  return ($codes -join ", ")
}

function New-RigorBlock {
  param(
    [string]$PageId,
    [string]$LessonTitle,
    [string]$StandardsText
  )

  $heading = switch ($PageId) {
    "P02" { "Teacher-Guided Thinking for Notebook Part 1" }
    "P03" { "Teacher-Guided Thinking for Notebook Part 2" }
    "P04" { "Worked-Example Coaching Notes" }
    "P06" { "Independent Work Success Criteria" }
    default { "Teacher-Guided Thinking" }
  }

  $body = switch ($PageId) {
    "P02" {
      @"
<p style="margin-bottom: 12px;"><strong>Read this as your teacher modeling the first layer of the lesson.</strong> In <em>$LessonTitle</em>, do not begin by guessing a procedure. First name what the problem is asking, identify the quantities or expression parts you can see, and connect the task to <strong>$StandardsText</strong>. This keeps your work aligned to the approved unit and lesson mapping.</p>
<p style="margin-bottom: 12px;"><strong>Step 1:</strong> Copy the vocabulary and underline the words that tell you what operation, relationship, graph feature, or model is being used. <strong>Step 2:</strong> Write what each number, variable, point, table entry, or expression part represents before calculating. <strong>Step 3:</strong> Choose the rule only after the structure is clear. A veteran teacher would pause here because many mistakes happen when students compute before they understand the representation.</p>
<p style="margin-bottom: 0;"><strong>Self-check:</strong> If a classmate asked why this method works, you should be able to answer in a sentence, not only show arithmetic. If your notes do not explain the why, add one more line before moving to Part 2.</p>
"@
    }
    "P03" {
      @"
<p style="margin-bottom: 12px;"><strong>Use this page to make the process visible.</strong> In <em>$LessonTitle</em>, each example should show the decision, the operation, and the reason for the operation. Before copying an answer, ask: What changed from the previous step? What stayed equivalent? How does this connect to <strong>$StandardsText</strong>?</p>
<p style="margin-bottom: 12px;"><strong>Step 1:</strong> Read the example from left to right and label the first move. <strong>Step 2:</strong> Explain why that move is valid. <strong>Step 3:</strong> Simplify carefully and check whether the result answers the original question. If the lesson uses a graph, table, number line, or diagram, describe what the visual is showing before writing the numeric answer.</p>
<p style="margin-bottom: 0;"><strong>Common confusion to avoid:</strong> Do not copy a pattern from one example into a different structure. If the sign, exponent, slope, intercept, domain, table pattern, or context changes, the reasoning may also change. Slow down and re-identify the structure.</p>
"@
    }
    "P04" {
      @"
<p style="margin-bottom: 12px;"><strong>Study the worked examples like a teacher is solving beside you.</strong> For <em>$LessonTitle</em>, the goal is not only to get the final answer. The goal is to understand why each step follows from the previous step and how that supports <strong>$StandardsText</strong>.</p>
<p style="margin-bottom: 12px;"><strong>Before Example 1:</strong> Identify the known information and the unknown. <strong>During each example:</strong> Pause after every step and say what mathematical idea was used: inverse operation, equivalent expression, slope, graph feature, function rule, factoring, model comparison, data interpretation, or financial formula. <strong>After each example:</strong> Check whether the answer is reasonable in the original problem.</p>
<p style="margin-bottom: 0;"><strong>Teacher move:</strong> When an error is shown, do not only mark it wrong. Explain the exact moment the reasoning stopped matching the structure of the problem. That explanation is what turns the mistake into mastery evidence.</p>
"@
    }
    "P06" {
      @"
<p style="margin-bottom: 12px;"><strong>Independent work is where you prove mastery, not where you rush.</strong> For <em>$LessonTitle</em>, every response must match the mapped lesson target for <strong>$StandardsText</strong>. Use your notebook notes, worked examples, and visuals from the lesson before asking for another attempt.</p>
<p style="margin-bottom: 12px;"><strong>Part A expectation:</strong> Show the core skill step by step. <strong>Part B expectation:</strong> Explain the reason behind the step, especially when a graph, table, formula, inequality, function, model, or context is involved. <strong>Part C expectation:</strong> Identify the misconception, correct the work, and explain how the correction changes the outcome.</p>
<p style="margin-bottom: 0;"><strong>Before submitting:</strong> Check that each answer includes units or context when needed, that graph/table questions refer to the visual evidence, and that no answer is based on guessing from answer choices. If you cannot explain the method, return to P02-P04 before submitting.</p>
"@
    }
  }

  return @"
<div class="mla-rigor-expansion" style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.75; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto; background: #f8fafc; border: 1px solid #cbd5e1; border-left: 6px solid #0f766e; border-radius: 10px; padding: 22px;">
  <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 10px;">$heading</h2>
  $body
</div>
"@
}

$resolvedRoot = (Resolve-Path -LiteralPath $CourseRoot).Path
$pages = Get-ChildItem -Path (Join-Path $resolvedRoot "Units") -Recurse -File -Include "P02.html","P03.html","P04.html","P06.html" |
  Sort-Object FullName

$edited = @()
foreach ($page in $pages) {
  $html = Get-Content -LiteralPath $page.FullName -Raw
  if ($html -match 'class="mla-rigor-expansion"') { continue }

  $wordsBefore = Get-WordCount -Text (ConvertTo-PlainText -Html $html)
  if ($wordsBefore -ge $MinimumWords) { continue }

  $lessonDir = Split-Path -Parent $page.FullName
  $metadata = Get-LessonMetadata -LessonDir $lessonDir
  if ($null -ne $metadata -and ($metadata.PSObject.Properties.Name -contains "title") -and $metadata.title) {
    $lessonTitle = [string]$metadata.title
  } else {
    $lessonTitle = Split-Path -Leaf $lessonDir
  }

  $standardsText = Get-StandardsText -Metadata $metadata
  $pageId = [System.IO.Path]::GetFileNameWithoutExtension($page.Name)
  $block = New-RigorBlock -PageId $pageId -LessonTitle $lessonTitle -StandardsText $standardsText

  if ($html -match '<div class="mla-tor-support-box"') {
    $newHtml = [regex]::Replace($html, '<div class="mla-tor-support-box"', ($block + "`r`n" + '<div class="mla-tor-support-box"'), 1)
  } else {
    $newHtml = $html.TrimEnd() + "`r`n" + $block + "`r`n"
  }

  Set-Content -LiteralPath $page.FullName -Value $newHtml -Encoding UTF8
  $wordsAfter = Get-WordCount -Text (ConvertTo-PlainText -Html $newHtml)
  $edited += [pscustomobject]@{
    File = $page.FullName.Substring($resolvedRoot.Length + 1)
    Before = $wordsBefore
    After = $wordsAfter
  }
}

$edited | Sort-Object File
