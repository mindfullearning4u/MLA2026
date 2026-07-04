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

$resolvedRoot = (Resolve-Path -LiteralPath $CourseRoot).Path
$auditDir = Join-Path $resolvedRoot "Course Audit"
if (-not (Test-Path -LiteralPath $auditDir)) {
  New-Item -ItemType Directory -Path $auditDir | Out-Null
}

$pages = Get-ChildItem -Path (Join-Path $resolvedRoot "Units") -Recurse -File -Include "P02.html","P03.html","P04.html","P06.html" |
  Sort-Object FullName

$failures = @()
foreach ($page in $pages) {
  $html = Get-Content -LiteralPath $page.FullName -Raw
  $plain = ConvertTo-PlainText -Html $html
  $words = Get-WordCount -Text $plain
  if ($words -lt $MinimumWords) {
    $relative = $page.FullName.Substring($resolvedRoot.Length + 1)
    $failures += [pscustomobject]@{
      File = $relative
      Words = $words
    }
  }
}

$reportPath = Join-Path $auditDir "ALG1_LESSON_RIGOR_DEPTH_AUDIT.md"
$decision = if ($failures.Count -eq 0) { "PASS" } else { "FAIL" }

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# ALG1 Lesson Rigor Depth Audit")
$lines.Add("")
$lines.Add("- Course root: `$resolvedRoot")
$lines.Add("- Pages checked: $($pages.Count)")
$lines.Add("- Minimum word threshold: $MinimumWords")
$lines.Add("- Pages below threshold: $($failures.Count)")
$lines.Add("- Final decision: $decision")
$lines.Add("")
$lines.Add("## Audit Rule")
$lines.Add("")
$lines.Add("P02, P03, P04, and P06 pages must contain enough direct teaching, modeling, anticipated student confusion, and independent-work guidance to function without a live teacher presentation. Word count is not the complete quality standard, but pages below the threshold require review because they are unlikely to meet the veteran-teacher explanation requirement.")
$lines.Add("")

if ($failures.Count -gt 0) {
  $lines.Add("## Pages Requiring Expansion")
  $lines.Add("")
  $lines.Add("| File | Words |")
  $lines.Add("|---|---:|")
  foreach ($failure in $failures) {
    $lines.Add("| `$($failure.File)` | $($failure.Words) |")
  }
} else {
  $lines.Add("## Result")
  $lines.Add("")
  $lines.Add("No P02, P03, P04, or P06 pages are below the lesson-rigor depth threshold.")
}

$lines | Set-Content -LiteralPath $reportPath -Encoding UTF8

[pscustomobject]@{
  CourseRoot = $resolvedRoot
  PagesChecked = $pages.Count
  MinimumWords = $MinimumWords
  PagesBelowThreshold = $failures.Count
  FinalDecision = $decision
  ReportPath = $reportPath
}
