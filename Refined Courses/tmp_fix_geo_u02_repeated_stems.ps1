$root = "GEOMETRY/Units/Unit 02"
$files = Get-ChildItem -Path $root -Recurse -Filter *.gift
$clarifiers = @(
    "",
    " Choose the most precise answer.",
    " Choose the answer supported by the lesson concept.",
    " Choose the option that uses valid geometric reasoning.",
    " Choose the option that avoids relying only on appearance.",
    " Choose the strongest justification."
)

foreach ($file in $files) {
    $path = $file.FullName
    $text = [System.IO.File]::ReadAllText($path)
    $counts = @{}
    $updated = [regex]::Replace($text, '(?ms)(Question:<br>)(.*?)(\s*\{)', {
        param($match)
        $prefix = $match.Groups[1].Value
        $stem = ($match.Groups[2].Value -replace '\s+', ' ').Trim()
        $suffix = $match.Groups[3].Value
        if (-not $counts.ContainsKey($stem)) {
            $counts[$stem] = 0
        }
        $counts[$stem] += 1
        $index = [Math]::Min($counts[$stem] - 1, $clarifiers.Count - 1)
        $newStem = $stem + $clarifiers[$index]
        return $prefix + $newStem + $suffix
    })
    if ($updated -ne $text) {
        [System.IO.File]::WriteAllText($path, $updated, [System.Text.UTF8Encoding]::new($false))
    }
}
