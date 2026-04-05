$ErrorActionPreference = 'Stop'

$targets = Get-ChildItem courses/USGOV -Recurse -Filter P05-guided-practice.html |
  Where-Object { -not (Select-String -Path $_.FullName -Pattern '<strong>Respond:</strong>|<strong>Choose ONE option and respond:</strong>' -Quiet) }

foreach ($file in $targets) {
  $text = Get-Content -Raw $file.FullName
  $text = $text -replace "`r`n", "`n"
  $text = [regex]::Replace(
    $text,
    '(<div class="directions-block">\s*)',
    ('$1' + '      <p><strong>Respond:</strong></p>' + "`n"),
    1
  )
  [System.IO.File]::WriteAllText($file.FullName, $text, [System.Text.Encoding]::UTF8)
}
