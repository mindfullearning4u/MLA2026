$ErrorActionPreference = 'Stop'

$feedback = @{
  '120' = 'This adds the maximum and minimum instead of finding half the range; amplitude is half the distance between maximum and minimum.'
  '2 hours' = 'This is not the full repeating interval; the period is the time for one complete cycle.'
  'Because radians cannot be graphed' = 'Radians can be used as graph inputs; context restrictions come from the situation being modeled.'
  'Tangent only' = 'Tangent is periodic but unbounded with asymptotes, so it is not the best model for smooth bounded height.'
  'Only logarithm base' = 'This belongs to logarithmic functions, not sinusoidal modeling features such as amplitude, period, midline, and shift.'
  'Midline is never used in modeling.' = 'The midline is important because it represents the central value of a sinusoidal model.'
  '360pi' = 'This multiplies instead of converting; 180 degrees equals pi radians, so 360 degrees equals 2pi radians.'
  '(0, 1)' = 'This is the point for pi/2, not pi/6; remember that unit circle points are ordered as (cosine, sine).'
  'sec(pi)=1' = 'Secant is the reciprocal of cosine, and cos(pi)=-1, so sec(pi)=-1.'
  'All trig values are undefined.' = 'Many trigonometric values are defined; only specific ratios are undefined when their denominators are 0.'
  'Radians cannot measure rotations.' = 'Radians do measure rotations; pi radians is half a rotation and 2pi radians is one full rotation.'
  'Secant is reciprocal sine.' = 'Secant is the reciprocal of cosine; cosecant is the reciprocal of sine.'
  'cos(pi/3)=sqrt(3)/2' = 'cos(pi/3)=1/2; sqrt(3)/2 is cos(pi/6) or sin(pi/3).'
  'csc(pi/2) is undefined.' = 'sin(pi/2)=1, so csc(pi/2)=1; reciprocal values are undefined only when the denominator is 0.'
  'Midline is y=4.' = 'In y=4sin(x), the 4 is the amplitude; the midline remains y=0.'
}

$files = @(
  'Units/Unit 03/Lesson 07/guided_practice.gift',
  'Units/Unit 03/Lesson 07/quiz.gift',
  'Units/Unit 03/Lesson 08/guided_practice.gift',
  'Units/Unit 03/Unit Assessment/unit_assessment.gift',
  'Units/Unit 03/Unit Pretest/unit_pretest.gift'
)

foreach ($file in $files) {
  $lines = Get-Content $file
  $updated = @()
  foreach ($line in $lines) {
    if ($line -match '^([=~][A-D]\.\s)(.*?)#$') {
      $choiceText = $matches[2]
      if (-not $feedback.ContainsKey($choiceText)) {
        throw "No feedback mapping for '$choiceText' in $file"
      }
      $updated += "$line$($feedback[$choiceText])"
    } else {
      $updated += $line
    }
  }
  ($updated -join "`n") | Set-Content -Path $file -NoNewline -Encoding ASCII
}
