$ErrorActionPreference = 'Stop'

function Rotate-Seq($seq, $map) {
  ($seq.ToCharArray() | ForEach-Object { $map[[string]$_] }) -join ''
}

function Reorder-Gift($path, $targetSequence) {
  $text = Get-Content -Raw $path
  $blocks = [regex]::Split($text, '(?m)(?=^::)')
  $targets = $targetSequence.ToCharArray()
  $out = New-Object System.Collections.Generic.List[string]
  $questionIndex = 0

  foreach ($block in $blocks) {
    if ([string]::IsNullOrWhiteSpace($block)) { continue }
    $lines = $block -split "`n"
    $choiceIndexes = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
      $line = $lines[$i].TrimEnd("`r")
      if ($line -match '^[=~][A-D]\.\s') {
        $choiceIndexes += $i
      }
    }

    if ($choiceIndexes.Count -ne 4) {
      throw "Expected 4 choices in $path question $($questionIndex + 1), found $($choiceIndexes.Count)."
    }

    $target = [string]$targets[$questionIndex]
    $targetIndex = @{'A'=0;'B'=1;'C'=2;'D'=3}[$target]
    $choices = @()
    foreach ($idx in $choiceIndexes) {
      $raw = $lines[$idx].TrimEnd("`r")
      if ($raw -notmatch '^([=~])([A-D])\.\s(.*)$') {
        throw "Could not parse choice line in $path`: $raw"
      }
      $choices += [ordered]@{ marker=$matches[1]; body=$matches[3] }
    }

    $correct = $choices | Where-Object { $_.marker -eq '=' }
    if (@($correct).Count -ne 1) {
      throw "Expected exactly one correct choice in $path question $($questionIndex + 1)."
    }
    $distractors = @($choices | Where-Object { $_.marker -eq '~' } | ForEach-Object { $_.body })
    $newBodies = New-Object 'string[]' 4
    $newBodies[$targetIndex] = $correct.body
    $distractorIndex = 0
    for ($i = 0; $i -lt 4; $i++) {
      if ($i -eq $targetIndex) { continue }
      $newBodies[$i] = $distractors[$distractorIndex]
      $distractorIndex++
    }

    $labels = @('A','B','C','D')
    for ($i = 0; $i -lt 4; $i++) {
      $prefix = if ($i -eq $targetIndex) { '=' } else { '~' }
      $lines[$choiceIndexes[$i]] = "$prefix$($labels[$i]). $($newBodies[$i])"
    }

    $out.Add(($lines -join "`n").TrimEnd("`r","`n"))
    $questionIndex++
  }

  if ($questionIndex -ne $targets.Count) {
    throw "Target sequence length $($targets.Count) does not match question count $questionIndex for $path."
  }

  ($out -join "`n") | Set-Content -Path $path -NoNewline -Encoding ASCII
}

$quizBase = 'BDACCADBACDBCABDACBDCADBA'
$quizMaps = @(
  @{A='A';B='B';C='C';D='D'},
  @{A='B';B='C';C='D';D='A'},
  @{A='C';B='D';C='A';D='B'},
  @{A='D';B='A';C='B';D='C'},
  @{A='A';B='C';C='B';D='D'},
  @{A='B';B='D';C='A';D='C'},
  @{A='C';B='A';C='D';D='B'}
)
$gpSeqs = @('BDACB','DACBA','CBADB','ADBCA','BCADB','DCBAD','CADBC','BDACB')
$assessmentSeq = 'BDACCADBACDBCABDACBDCADBDBACACDBADCBADCA'
$pretestSeq = 'BDACBADACB'

for ($lesson = 1; $lesson -le 7; $lesson++) {
  $lessonText = $lesson.ToString('00')
  Reorder-Gift "Units/Unit 03/Lesson $lessonText/guided_practice.gift" $gpSeqs[$lesson - 1]
  Reorder-Gift "Units/Unit 03/Lesson $lessonText/quiz.gift" (Rotate-Seq $quizBase $quizMaps[$lesson - 1])
}

Reorder-Gift 'Units/Unit 03/Lesson 08/guided_practice.gift' $gpSeqs[7]
Reorder-Gift 'Units/Unit 03/Unit Assessment/unit_assessment.gift' $assessmentSeq
Reorder-Gift 'Units/Unit 03/Unit Pretest/unit_pretest.gift' $pretestSeq
