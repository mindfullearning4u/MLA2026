param(
    [string]$CourseRoot = "ALG1",
    [switch]$CleanGenerated
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

function ConvertFrom-GiftVisibleText {
    param([string]$Text)
    if ($null -eq $Text) { return "" }
    $result = $Text
    $result = $result -replace '\\=', '='
    $result = $result -replace '\\~', '~'
    $result = $result -replace '\\#', '#'
    $result = $result -replace '\\{', '{'
    $result = $result -replace '\\}', '}'
    return $result.Trim()
}

function ConvertTo-HtmlText {
    param([string]$Text)
    $decoded = ConvertFrom-GiftVisibleText $Text
    return [System.Net.WebUtility]::HtmlEncode($decoded)
}

function ConvertTo-CDataSafe {
    param([string]$Text)
    if ($null -eq $Text) { return "" }
    return $Text -replace '\]\]>', ']]]]><![CDATA[>'
}

function Get-SafeFilePart {
    param([string]$Text)
    return ($Text -replace '[^A-Za-z0-9_\-]+', '_').Trim('_')
}

function Convert-Superscripts {
    param([string]$Text)
    $result = $Text
    $mojibakeSup2 = [string][char]0x00C2 + [string][char]0x00B2
    $mojibakeSup3 = [string][char]0x00C2 + [string][char]0x00B3
    $result = $result -replace [regex]::Escape($mojibakeSup2), '<sup>2</sup>'
    $result = $result -replace [regex]::Escape($mojibakeSup3), '<sup>3</sup>'
    $result = $result -replace [regex]::Escape([string][char]0x00B2), '<sup>2</sup>'
    $result = $result -replace [regex]::Escape([string][char]0x00B3), '<sup>3</sup>'
    $result = $result -replace 'x\^2', 'x<sup>2</sup>'
    $result = $result -replace 'x\^3', 'x<sup>3</sup>'
    $result = $result -replace 'y\^2', 'y<sup>2</sup>'
    $result = $result -replace '(\d+)\^2', '$1<sup>2</sup>'
    $result = $result -replace '(\d+)\^3', '$1<sup>3</sup>'
    return $result
}

function New-XYHtmlTable {
    param(
        [string]$XValuesText,
        [string]$YValuesText
    )
    $xValues = $XValuesText.Split(',') | ForEach-Object { $_.Trim() }
    $yValues = $YValuesText.Split(',') | ForEach-Object { $_.Trim() }
    if ($xValues.Count -ne $yValues.Count -or $xValues.Count -lt 2) {
        return $null
    }

    $html = '<table class="mla-assessment-table" style="border-collapse:collapse;margin:8px 0;"><tr><th style="border:1px solid #555;padding:4px 8px;">x</th>'
    foreach ($value in $xValues) {
        $html += '<td style="border:1px solid #555;padding:4px 8px;text-align:center;">' + (Convert-Superscripts ([System.Net.WebUtility]::HtmlEncode($value))) + '</td>'
    }
    $html += '</tr><tr><th style="border:1px solid #555;padding:4px 8px;">y</th>'
    foreach ($value in $yValues) {
        $html += '<td style="border:1px solid #555;padding:4px 8px;text-align:center;">' + (Convert-Superscripts ([System.Net.WebUtility]::HtmlEncode($value))) + '</td>'
    }
    $html += '</tr></table>'
    return $html
}

function Convert-StemToHtml {
    param([string]$Stem)
    $lines = $Stem -split "\r?\n"
    $htmlParts = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i].Trim()
        if ($line.Length -eq 0) { continue }

        if ($i + 1 -lt $lines.Count) {
            $next = $lines[$i + 1].Trim()
            $xMatch = [regex]::Match($line, '^(?:Input\s*)?x:\s*(.+)$', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            $yMatch = [regex]::Match($next, '^(?:Output\s*)?y:\s*(.+)$', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            if ($xMatch.Success -and $yMatch.Success) {
                $table = New-XYHtmlTable -XValuesText $xMatch.Groups[1].Value -YValuesText $yMatch.Groups[1].Value
                if ($table) {
                    $htmlParts += $table
                    $i++
                    continue
                }
            }
        }

        $htmlParts += '<p>' + (Convert-Superscripts ([System.Net.WebUtility]::HtmlEncode($line))) + '</p>'
    }
    return ($htmlParts -join '')
}

function Convert-ChoiceTextToHtml {
    param([string]$Text)
    $visible = ConvertFrom-GiftVisibleText $Text
    $visible = $visible -replace '^[A-D]\.\s*', ''

    $tableMatch = [regex]::Match($visible, '^\s*x:\s*([^;]+);\s*y:\s*(.+)$', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($tableMatch.Success) {
        $html = New-XYHtmlTable -XValuesText $tableMatch.Groups[1].Value -YValuesText $tableMatch.Groups[2].Value
        if ($html) {
            return $html
        }
    }

    return Convert-Superscripts ([System.Net.WebUtility]::HtmlEncode($visible))
}

function Parse-GiftQuestions {
    param([string]$Path)
    $raw = [System.IO.File]::ReadAllText($Path, [System.Text.UTF8Encoding]::new($false))
    $pattern = '(?ms)::(?<name>.*?)::\s*(?<body>.*?)(?:\r?\n)?\{\s*(?<answers>.*?)\s*\}\s*(?=(?:\r?\n){2,}::|\z)'
    $matches = [regex]::Matches($raw, $pattern)
    $questions = @()

    foreach ($match in $matches) {
        $body = $match.Groups['body'].Value.Trim()
        $bodyLines = $body -split "\r?\n"
        $questionId = $match.Groups['name'].Value.Trim()
        $standard = ""
        $stemLines = @()
        $inStem = $false

        foreach ($line in $bodyLines) {
            $trim = $line.Trim()
            if ($trim -match '^Question ID:\s*(.+)$') {
                $questionId = $Matches[1].Trim()
                continue
            }
            if ($trim -match '^MLA Standard:\s*(.+)$') {
                $standard = $Matches[1].Trim()
                continue
            }
            if ($trim -match '^Question:\s*$') {
                $inStem = $true
                continue
            }
            if ($inStem -or ($trim.Length -gt 0 -and $trim -notmatch '^Question ID:|^MLA Standard:')) {
                $stemLines += $line
            }
        }

        $answers = @()
        foreach ($line in ($match.Groups['answers'].Value -split "\r?\n")) {
            $trim = $line.Trim()
            if ($trim.Length -eq 0) { continue }
            if ($trim[0] -ne '=' -and $trim[0] -ne '~') { continue }
            $correct = $trim[0] -eq '='
            $payload = $trim.Substring(1)
            $parts = $payload.Split('#', 2)
            $answerText = if ($parts.Count -gt 0) { $parts[0].Trim() } else { "" }
            $feedback = if ($parts.Count -gt 1) { $parts[1].Trim() } else { "" }
            $answers += [pscustomobject]@{
                Correct = $correct
                Text = $answerText
                Feedback = $feedback
            }
        }

        $questions += [pscustomobject]@{
            Name = $match.Groups['name'].Value.Trim()
            QuestionId = $questionId
            Standard = $standard
            Stem = (ConvertFrom-GiftVisibleText (($stemLines -join "`n").Trim()))
            Answers = $answers
        }
    }

    return $questions
}

function Get-LinearEquation {
    param([string]$Text)
    $visible = ConvertFrom-GiftVisibleText $Text
    $match = [regex]::Match($visible, 'y\s*([<>]=?|=)\s*([+-]?\s*(?:\d+(?:/\d+)?|\d*\.\d+)?\s*x)\s*([+-]\s*\d+(?:\.\d+)?)?', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if (-not $match.Success) { return $null }

    $op = $match.Groups[1].Value
    $coefText = ($match.Groups[2].Value -replace '\s+', '') -replace 'x', ''
    if ($coefText -eq '' -or $coefText -eq '+') { $m = 1.0 }
    elseif ($coefText -eq '-') { $m = -1.0 }
    elseif ($coefText -match '^([+-]?\d+)/(\d+)$') { $m = [double]$Matches[1] / [double]$Matches[2] }
    else { $m = [double]$coefText }

    $b = 0.0
    if ($match.Groups[3].Success -and $match.Groups[3].Value.Trim().Length -gt 0) {
        $b = [double](($match.Groups[3].Value -replace '\s+', ''))
    }

    if ([double]::IsNaN($m) -or [double]::IsInfinity($m) -or [double]::IsNaN($b) -or [double]::IsInfinity($b)) {
        return $null
    }

    return [pscustomobject]@{ M = $m; B = $b; Operator = $op; Equation = $match.Value.Trim() }
}

function Get-PointPair {
    param([string]$Text)
    $visible = ConvertFrom-GiftVisibleText $Text
    $matches = [regex]::Matches($visible, '\((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)')
    if ($matches.Count -lt 2) { return $null }
    return @(
        @([double]$matches[0].Groups[1].Value, [double]$matches[0].Groups[2].Value),
        @([double]$matches[1].Groups[1].Value, [double]$matches[1].Groups[2].Value)
    )
}

function ConvertTo-ParseMathText {
    param([string]$Text)
    $plain = ConvertFrom-GiftVisibleText $Text
    $mojibakeSup2 = [string][char]0x00C2 + [string][char]0x00B2
    $mojibakeSup3 = [string][char]0x00C2 + [string][char]0x00B3
    $plain = $plain -replace [regex]::Escape($mojibakeSup2), '^2'
    $plain = $plain -replace [regex]::Escape($mojibakeSup3), '^3'
    $plain = $plain -replace [regex]::Escape([string][char]0x00B2), '^2'
    $plain = $plain -replace [regex]::Escape([string][char]0x00B3), '^3'
    $plain = $plain -replace '\s+', ''
    return $plain
}

function ConvertFrom-ParseMathText {
    param([string]$Text)
    $result = $Text
    $result = $result -replace '\^2', ([string][char]0x00B2)
    $result = $result -replace '\^3', ([string][char]0x00B3)
    return $result
}

function Convert-Coefficient {
    param([string]$Text)
    if ([string]::IsNullOrWhiteSpace($Text) -or $Text -eq '+') { return 1.0 }
    if ($Text -eq '-') { return -1.0 }
    return [double]$Text
}

function Get-QuadraticEquation {
    param([string]$Text)
    $parse = ConvertTo-ParseMathText $Text
    $visible = ConvertFrom-GiftVisibleText $Text

    $standard = [regex]::Match($parse, '(?:y|f\(x\)|g\(x\)|h\(x\))([<>]=?|=)([+-]?\d*)x\^2(([+-]\d*)x)?([+-]\d+)?', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($standard.Success) {
        $a = Convert-Coefficient $standard.Groups[2].Value
        $b = 0.0
        if ($standard.Groups[4].Success) { $b = Convert-Coefficient $standard.Groups[4].Value }
        $c = 0.0
        if ($standard.Groups[5].Success) { $c = [double]$standard.Groups[5].Value }
        return [pscustomobject]@{ A = $a; B = $b; C = $c; Operator = $standard.Groups[1].Value; Equation = (ConvertFrom-ParseMathText $standard.Value) }
    }

    $vertex = [regex]::Match($parse, '(?:y|f\(x\)|g\(x\)|h\(x\))([<>]=?|=)([+-]?\d*)\(x([+-]\d+)\)\^2([+-]\d+)?', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($vertex.Success) {
        $a = Convert-Coefficient $vertex.Groups[2].Value
        $h = -1.0 * [double]$vertex.Groups[3].Value
        $k = 0.0
        if ($vertex.Groups[4].Success) { $k = [double]$vertex.Groups[4].Value }
        $b = -2.0 * $a * $h
        $c = ($a * $h * $h) + $k
        return [pscustomobject]@{ A = $a; B = $b; C = $c; Operator = $vertex.Groups[1].Value; Equation = (ConvertFrom-ParseMathText $vertex.Value) }
    }

    $factored = [regex]::Match($parse, '(?:y|f\(x\)|g\(x\)|h\(x\))([<>]=?|=)([+-]?\d*)\(x([+-]\d+)\)\(x([+-]\d+)\)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($factored.Success) {
        $a = Convert-Coefficient $factored.Groups[2].Value
        $r1 = -1.0 * [double]$factored.Groups[3].Value
        $r2 = -1.0 * [double]$factored.Groups[4].Value
        $b = -1.0 * $a * ($r1 + $r2)
        $c = $a * $r1 * $r2
        return [pscustomobject]@{ A = $a; B = $b; C = $c; Operator = $factored.Groups[1].Value; Equation = (ConvertFrom-ParseMathText $factored.Value) }
    }

    $zeros = [regex]::Match($visible, 'zeros?\s+(-?\d+(?:\.\d+)?)\s+and\s+(-?\d+(?:\.\d+)?).*opens\s+(upward|downward)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($zeros.Success) {
        $r1 = [double]$zeros.Groups[1].Value
        $r2 = [double]$zeros.Groups[2].Value
        $a = if ($zeros.Groups[3].Value -match 'down') { -1.0 } else { 1.0 }
        $b = -1.0 * $a * ($r1 + $r2)
        $c = $a * $r1 * $r2
        return [pscustomobject]@{ A = $a; B = $b; C = $c; Operator = '='; Equation = 'zeros ' + $r1 + ' and ' + $r2 + ', opens ' + $zeros.Groups[3].Value.ToLower() }
    }

    return $null
}

function Get-VisualDecision {
    param($Question)
    $stem = $Question.Stem
    $combined = $stem + "`n" + (($Question.Answers | ForEach-Object { ConvertFrom-GiftVisibleText $_.Text }) -join "`n")

    $quadratic = Get-QuadraticEquation $combined
    if ($quadratic -and $combined -match '(graph|shade|boundary|parabola|vertex|zeros|x-axis|solution region|opens)') {
        return [pscustomobject]@{ Kind = 'quadratic'; Reason = 'Parabola graph supports quadratic, vertex, zero, boundary, or shading interpretation.'; Points = $null; Linear = $null; Quadratic = $quadratic }
    }

    $points = Get-PointPair $combined
    if ($points -and $combined -match '(slope|line|graph|rate of change)') {
        return [pscustomobject]@{ Kind = 'points'; Reason = 'Point-pair graph supports slope/rate interpretation.'; Points = $points; Linear = $null; Quadratic = $null }
    }

    $linear = Get-LinearEquation $combined
    if ($linear -and $combined -match '(graph|shade|boundary|slope|intercept|line|inequality)') {
        return [pscustomobject]@{ Kind = 'linear'; Reason = 'Coordinate graph supports line, slope, intercept, or inequality interpretation.'; Points = $null; Linear = $linear; Quadratic = $null }
    }

    if ($combined -match 'table|linear relationship|constant (rate|change)|x:\s*|Input\s+x:') {
        return [pscustomobject]@{ Kind = 'answer-table'; Reason = 'Table text converted into Moodle HTML tables.'; Points = $null; Linear = $null; Quadratic = $null }
    }

    return [pscustomobject]@{ Kind = 'none'; Reason = 'No visual required by question wording.'; Points = $null; Linear = $null; Quadratic = $null }
}

function New-GraphImage {
    param(
        [string]$OutPath,
        [double]$M = 1,
        [double]$B = 0,
        [string]$Title = "Coordinate Graph",
        [object[]]$Points = @(),
        [string]$Operator = "=",
        [double]$VerticalX = [double]::NaN
    )

    if (([double]::IsNaN($M) -or [double]::IsInfinity($M)) -and [double]::IsNaN($VerticalX)) { return $false }
    if ([double]::IsNaN($B) -or [double]::IsInfinity($B)) { $B = 0 }

    $width = 760
    $height = 500
    $left = 70
    $right = 35
    $top = 65
    $bottom = 70
    if ($Points.Count -gt 0) {
        $xValues = @($Points | ForEach-Object { [double]$_[0] }) + 0
        $yValues = @($Points | ForEach-Object { [double]$_[1] }) + 0
        $xmin = ($xValues | Measure-Object -Minimum).Minimum - 2
        $xmax = ($xValues | Measure-Object -Maximum).Maximum + 2
        $ymin = ($yValues | Measure-Object -Minimum).Minimum - 2
        $ymax = ($yValues | Measure-Object -Maximum).Maximum + 2
    }
    else {
        $xmin = -10.0
        $xmax = 10.0
        $ymin = -10.0
        $ymax = 10.0
    }

    if (-not [double]::IsNaN($VerticalX)) {
        $xmin = [Math]::Min($xmin, $VerticalX - 3)
        $xmax = [Math]::Max($xmax, $VerticalX + 3)
    }
    elseif ($Points.Count -eq 0) {
        $y1 = $M * $xmin + $B
        $y2 = $M * $xmax + $B
        if (-not [double]::IsInfinity($y1) -and -not [double]::IsNaN($y1)) { $ymin = [Math]::Min($ymin, $y1 - 1); $ymax = [Math]::Max($ymax, $y1 + 1) }
        if (-not [double]::IsInfinity($y2) -and -not [double]::IsNaN($y2)) { $ymin = [Math]::Min($ymin, $y2 - 1); $ymax = [Math]::Max($ymax, $y2 + 1) }
    }

    $xmin = [Math]::Floor($xmin)
    $xmax = [Math]::Ceiling($xmax)
    $ymin = [Math]::Floor($ymin)
    $ymax = [Math]::Ceiling($ymax)
    if ($xmax -le $xmin) { $xmax = $xmin + 10 }
    if ($ymax -le $ymin) { $ymax = $ymin + 10 }

    function PX([double]$x) { return [int]($left + (($x - $xmin) / ($xmax - $xmin)) * ($width - $left - $right)) }
    function PY([double]$y) { return [int]($height - $bottom - (($y - $ymin) / ($ymax - $ymin)) * ($height - $top - $bottom)) }

    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)

    $font = [System.Drawing.Font]::new("Arial", 12)
    $titleFont = [System.Drawing.Font]::new("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $axisPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(45,45,45), 2)
    $gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(225,225,225), 1)
    $linePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(24,99,188), 4)
    if ($Operator -eq '<' -or $Operator -eq '>') { $linePen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash }

    $g.DrawString($Title, $titleFont, [System.Drawing.Brushes]::Black, 30, 18)

    $xStep = [Math]::Max(1, [Math]::Ceiling(($xmax - $xmin) / 16))
    $yStep = [Math]::Max(1, [Math]::Ceiling(($ymax - $ymin) / 16))

    for ($x = [int]$xmin; $x -le [int]$xmax; $x += $xStep) {
        $px = PX $x
        $g.DrawLine($gridPen, $px, $top, $px, $height - $bottom)
        if ($x -ne 0) { $g.DrawString([string]$x, $font, [System.Drawing.Brushes]::Black, $px - 8, $height - $bottom + 8) }
    }
    for ($y = [int]$ymin; $y -le [int]$ymax; $y += $yStep) {
        $py = PY $y
        $g.DrawLine($gridPen, $left, $py, $width - $right, $py)
        if ($y -ne 0) { $g.DrawString([string]$y, $font, [System.Drawing.Brushes]::Black, 18, $py - 9) }
    }

    if ($xmin -le 0 -and $xmax -ge 0) { $g.DrawLine($axisPen, (PX 0), $top, (PX 0), $height - $bottom) }
    if ($ymin -le 0 -and $ymax -ge 0) { $g.DrawLine($axisPen, $left, (PY 0), $width - $right, (PY 0)) }
    $g.DrawString("x", $font, [System.Drawing.Brushes]::Black, $width - 25, (PY 0) - 25)
    $g.DrawString("y", $font, [System.Drawing.Brushes]::Black, (PX 0) + 8, $top + 4)

    if ($Operator -match '[<>]') {
        $shadeBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(45, 48, 150, 214))
        $shadePath = [System.Drawing.Drawing2D.GraphicsPath]::new()
        if (-not [double]::IsNaN($VerticalX)) {
            $vx = PX $VerticalX
            if ($Operator -match '>') {
                $shadePath.AddPolygon(@(
                    [System.Drawing.Point]::new($vx, $top),
                    [System.Drawing.Point]::new($width - $right, $top),
                    [System.Drawing.Point]::new($width - $right, $height - $bottom),
                    [System.Drawing.Point]::new($vx, $height - $bottom)
                ))
            }
            else {
                $shadePath.AddPolygon(@(
                    [System.Drawing.Point]::new($left, $top),
                    [System.Drawing.Point]::new($vx, $top),
                    [System.Drawing.Point]::new($vx, $height - $bottom),
                    [System.Drawing.Point]::new($left, $height - $bottom)
                ))
            }
        }
        else {
            $x1 = $xmin
            $x2 = $xmax
            $p1 = [System.Drawing.Point]::new((PX $x1), (PY ($M * $x1 + $B)))
            $p2 = [System.Drawing.Point]::new((PX $x2), (PY ($M * $x2 + $B)))
            if ($Operator -match '>') {
                $shadePath.AddPolygon(@($p1, $p2, [System.Drawing.Point]::new((PX $x2), $top), [System.Drawing.Point]::new((PX $x1), $top)))
            }
            else {
                $shadePath.AddPolygon(@($p1, $p2, [System.Drawing.Point]::new((PX $x2), $height - $bottom), [System.Drawing.Point]::new((PX $x1), $height - $bottom)))
            }
        }
        $g.FillPath($shadeBrush, $shadePath)
        $shadePath.Dispose()
        $shadeBrush.Dispose()
    }

    if (-not [double]::IsNaN($VerticalX)) {
        $vx = PX $VerticalX
        $g.DrawLine($linePen, $vx, $top, $vx, $height - $bottom)
    }
    else {
        $g.DrawLine($linePen, (PX $xmin), (PY ($M * $xmin + $B)), (PX $xmax), (PY ($M * $xmax + $B)))
    }

    foreach ($point in $Points) {
        $px = PX ([double]$point[0])
        $py = PY ([double]$point[1])
        $g.FillEllipse([System.Drawing.Brushes]::Crimson, $px - 7, $py - 7, 14, 14)
        $label = "(" + $point[0] + ", " + $point[1] + ")"
        $g.DrawString($label, $font, [System.Drawing.Brushes]::Black, $px + 8, $py - 22)
    }

    if ($Points.Count -ge 2) {
        $g.DrawString("Use rise over run between the marked points.", $font, [System.Drawing.Brushes]::Black, 32, $height - 28)
    }
    elseif ($Operator -match '[<>]') {
        $boundary = if ($Operator -eq '<' -or $Operator -eq '>') { "dashed" } else { "solid" }
        $shade = if ($Operator -match '>') { "above" } else { "below" }
        $g.DrawString("Boundary is $boundary; shade $shade.", $font, [System.Drawing.Brushes]::Black, 32, $height - 28)
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $linePen.Dispose()
    $gridPen.Dispose()
    $axisPen.Dispose()
    $font.Dispose()
    $titleFont.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    return $true
}

function New-QuadraticImage {
    param(
        [string]$OutPath,
        [double]$A,
        [double]$B,
        [double]$C,
        [string]$Operator = "=",
        [string]$Title = "Quadratic Graph"
    )

    if ([Math]::Abs($A) -lt 0.000001) { return $false }

    $width = 760
    $height = 500
    $left = 70
    $right = 35
    $top = 65
    $bottom = 70
    $vx = -1.0 * $B / (2.0 * $A)
    $vy = ($A * $vx * $vx) + ($B * $vx) + $C
    $xmin = [Math]::Floor($vx - 6)
    $xmax = [Math]::Ceiling($vx + 6)
    $samples = @()
    for ($i = 0; $i -le 120; $i++) {
        $x = $xmin + (($xmax - $xmin) * $i / 120.0)
        $y = ($A * $x * $x) + ($B * $x) + $C
        $samples += [pscustomobject]@{ X = $x; Y = $y }
    }
    $ymin = [Math]::Floor((($samples | Measure-Object -Property Y -Minimum).Minimum) - 2)
    $ymax = [Math]::Ceiling((($samples | Measure-Object -Property Y -Maximum).Maximum) + 2)
    $ymin = [Math]::Max($ymin, -25)
    $ymax = [Math]::Min($ymax, 25)
    if ($ymax -le $ymin) { $ymax = $ymin + 10 }

    function PX([double]$x) { return [int]($left + (($x - $xmin) / ($xmax - $xmin)) * ($width - $left - $right)) }
    function PY([double]$y) { return [int]($height - $bottom - (($y - $ymin) / ($ymax - $ymin)) * ($height - $top - $bottom)) }

    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)
    $font = [System.Drawing.Font]::new("Arial", 12)
    $titleFont = [System.Drawing.Font]::new("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $axisPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(45,45,45), 2)
    $gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(225,225,225), 1)
    $curvePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(24,99,188), 4)
    if ($Operator -eq '<' -or $Operator -eq '>') { $curvePen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash }

    $g.DrawString($Title, $titleFont, [System.Drawing.Brushes]::Black, 30, 18)
    $xStep = [Math]::Max(1, [Math]::Ceiling(($xmax - $xmin) / 12))
    $yStep = [Math]::Max(1, [Math]::Ceiling(($ymax - $ymin) / 12))
    for ($x = [int]$xmin; $x -le [int]$xmax; $x += $xStep) {
        $px = PX $x
        $g.DrawLine($gridPen, $px, $top, $px, $height - $bottom)
        if ($x -ne 0) { $g.DrawString([string]$x, $font, [System.Drawing.Brushes]::Black, $px - 8, $height - $bottom + 8) }
    }
    for ($y = [int]$ymin; $y -le [int]$ymax; $y += $yStep) {
        $py = PY $y
        $g.DrawLine($gridPen, $left, $py, $width - $right, $py)
        if ($y -ne 0) { $g.DrawString([string]$y, $font, [System.Drawing.Brushes]::Black, 18, $py - 9) }
    }
    if ($xmin -le 0 -and $xmax -ge 0) { $g.DrawLine($axisPen, (PX 0), $top, (PX 0), $height - $bottom) }
    if ($ymin -le 0 -and $ymax -ge 0) { $g.DrawLine($axisPen, $left, (PY 0), $width - $right, (PY 0)) }
    $g.DrawString("x", $font, [System.Drawing.Brushes]::Black, $width - 25, (PY 0) - 25)
    if ($xmin -le 0 -and $xmax -ge 0) { $g.DrawString("y", $font, [System.Drawing.Brushes]::Black, (PX 0) + 8, $top + 4) }

    $points = @()
    foreach ($sample in $samples) {
        if ($sample.Y -ge $ymin -and $sample.Y -le $ymax) {
            $points += [System.Drawing.Point]::new((PX $sample.X), (PY $sample.Y))
        }
    }

    if ($Operator -match '[<>]' -and $points.Count -gt 1) {
        $shadeBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(45, 48, 150, 214))
        $shadePath = [System.Drawing.Drawing2D.GraphicsPath]::new()
        $poly = @()
        $poly += $points
        if ($Operator -match '>') {
            $poly += [System.Drawing.Point]::new($points[-1].X, $top)
            $poly += [System.Drawing.Point]::new($points[0].X, $top)
        }
        else {
            $poly += [System.Drawing.Point]::new($points[-1].X, $height - $bottom)
            $poly += [System.Drawing.Point]::new($points[0].X, $height - $bottom)
        }
        $shadePath.AddPolygon($poly)
        $g.FillPath($shadeBrush, $shadePath)
        $shadePath.Dispose()
        $shadeBrush.Dispose()
    }

    if ($points.Count -gt 1) { $g.DrawLines($curvePen, $points) }
    $g.FillEllipse([System.Drawing.Brushes]::Crimson, (PX $vx) - 6, (PY $vy) - 6, 12, 12)
    $g.DrawString(("vertex (" + [Math]::Round($vx,2) + ", " + [Math]::Round($vy,2) + ")"), $font, [System.Drawing.Brushes]::Black, (PX $vx) + 8, (PY $vy) - 22)
    if ($Operator -match '[<>]') {
        $boundary = if ($Operator -eq '<' -or $Operator -eq '>') { "dashed" } else { "solid" }
        $shade = if ($Operator -match '>') { "above" } else { "below" }
        $g.DrawString("Boundary is $boundary; shade $shade.", $font, [System.Drawing.Brushes]::Black, 32, $height - 28)
    }
    else {
        $g.DrawString("Use the parabola's vertex, intercepts, and opening direction.", $font, [System.Drawing.Brushes]::Black, 32, $height - 28)
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $curvePen.Dispose()
    $gridPen.Dispose()
    $axisPen.Dispose()
    $font.Dispose()
    $titleFont.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    return $true
}

function New-MoodleXml {
    param(
        [string]$SourceGift,
        [array]$Questions,
        [string]$OutXml,
        [string]$AssetDir,
        [string]$CourseCode
    )

    $sourceName = [System.IO.Path]::GetFileNameWithoutExtension($SourceGift)
    $afterUnits = $SourceGift -replace '^.*?\\Units\\', ''
    $category = $CourseCode + '/Units/' + (($afterUnits -replace '\\', '/') -replace '\.gift$', '')
    $visualCount = 0
    $questionCount = 0

    $settings = [System.Xml.XmlWriterSettings]::new()
    $settings.Encoding = [System.Text.UTF8Encoding]::new($false)
    $settings.Indent = $true
    $settings.NewLineChars = "`n"

    $writer = [System.Xml.XmlWriter]::Create($OutXml, $settings)
    $writer.WriteStartDocument()
    $writer.WriteStartElement("quiz")

    $writer.WriteStartElement("question")
    $writer.WriteAttributeString("type", "category")
    $writer.WriteStartElement("category")
    $writer.WriteStartElement("text")
    $writer.WriteString('$course$/' + $category)
    $writer.WriteEndElement()
    $writer.WriteEndElement()
    $writer.WriteEndElement()

    foreach ($question in $Questions) {
        $questionCount++
        $decision = Get-VisualDecision $question
        $files = @()
        $questionHtml = '<p><strong>Question ID:</strong> ' + (ConvertTo-HtmlText $question.QuestionId) + '</p>'
        if ($question.Standard) {
            $questionHtml += '<p><strong>MLA Standard:</strong> ' + (ConvertTo-HtmlText $question.Standard) + '</p>'
        }
        $questionHtml += Convert-StemToHtml $question.Stem

        if ($decision.Kind -eq 'points') {
            $p1 = $decision.Points[0]
            $p2 = $decision.Points[1]
            $dx = [double]$p2[0] - [double]$p1[0]
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_graph.png"
            $imgPath = Join-Path $AssetDir $imgName
            if ([Math]::Abs($dx) -lt 0.000001) {
                $created = New-GraphImage -OutPath $imgPath -Title "Vertical Line Through Two Points" -Points $decision.Points -VerticalX ([double]$p1[0])
            }
            else {
                $m = ([double]$p2[1] - [double]$p1[1]) / $dx
                $b = [double]$p1[1] - ($m * [double]$p1[0])
                $created = New-GraphImage -OutPath $imgPath -M $m -B $b -Title "Slope Between Two Points" -Points $decision.Points
            }
            if ($created) {
                $visualCount++
                $questionHtml += '<p><img src="@@PLUGINFILE@@/' + $imgName + '" alt="' + (ConvertTo-HtmlText $decision.Reason) + '" style="max-width:100%;height:auto;" /></p>'
                $files += [pscustomobject]@{ Name = $imgName; Path = $imgPath }
            }
        }
        elseif ($decision.Kind -eq 'linear') {
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_graph.png"
            $imgPath = Join-Path $AssetDir $imgName
            $created = New-GraphImage -OutPath $imgPath -M $decision.Linear.M -B $decision.Linear.B -Operator $decision.Linear.Operator -Title ("Graph of " + $decision.Linear.Equation)
            if ($created) {
                $visualCount++
                $questionHtml += '<p><img src="@@PLUGINFILE@@/' + $imgName + '" alt="' + (ConvertTo-HtmlText $decision.Reason) + '" style="max-width:100%;height:auto;" /></p>'
                $files += [pscustomobject]@{ Name = $imgName; Path = $imgPath }
            }
        }
        elseif ($decision.Kind -eq 'quadratic') {
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_graph.png"
            $imgPath = Join-Path $AssetDir $imgName
            $created = New-QuadraticImage -OutPath $imgPath -A $decision.Quadratic.A -B $decision.Quadratic.B -C $decision.Quadratic.C -Operator $decision.Quadratic.Operator -Title ("Graph of " + $decision.Quadratic.Equation)
            if ($created) {
                $visualCount++
                $questionHtml += '<p><img src="@@PLUGINFILE@@/' + $imgName + '" alt="' + (ConvertTo-HtmlText $decision.Reason) + '" style="max-width:100%;height:auto;" /></p>'
                $files += [pscustomobject]@{ Name = $imgName; Path = $imgPath }
            }
        }

        $writer.WriteStartElement("question")
        $writer.WriteAttributeString("type", "multichoice")
        $writer.WriteStartElement("name")
        $writer.WriteElementString("text", $question.QuestionId)
        $writer.WriteEndElement()
        $writer.WriteStartElement("questiontext")
        $writer.WriteAttributeString("format", "html")
        $writer.WriteStartElement("text")
        $writer.WriteCData((ConvertTo-CDataSafe $questionHtml))
        $writer.WriteEndElement()
        foreach ($file in $files) {
            $writer.WriteStartElement("file")
            $writer.WriteAttributeString("name", $file.Name)
            $writer.WriteAttributeString("path", "/")
            $writer.WriteAttributeString("encoding", "base64")
            $writer.WriteString([Convert]::ToBase64String([System.IO.File]::ReadAllBytes($file.Path)))
            $writer.WriteEndElement()
        }
        $writer.WriteEndElement()
        $writer.WriteElementString("defaultgrade", "1.0000000")
        $writer.WriteElementString("penalty", "0.3333333")
        $writer.WriteElementString("hidden", "0")
        $writer.WriteElementString("single", "true")
        $writer.WriteElementString("shuffleanswers", "true")
        $writer.WriteElementString("answernumbering", "abc")

        foreach ($answer in $question.Answers) {
            $writer.WriteStartElement("answer")
            $writer.WriteAttributeString("fraction", $(if ($answer.Correct) { "100" } else { "0" }))
            $writer.WriteAttributeString("format", "html")
            $writer.WriteStartElement("text")
            $writer.WriteCData((ConvertTo-CDataSafe (Convert-ChoiceTextToHtml $answer.Text)))
            $writer.WriteEndElement()
            $writer.WriteStartElement("feedback")
            $writer.WriteAttributeString("format", "html")
            $writer.WriteStartElement("text")
            $writer.WriteCData((ConvertTo-CDataSafe (Convert-Superscripts (ConvertTo-HtmlText $answer.Feedback))))
            $writer.WriteEndElement()
            $writer.WriteEndElement()
            $writer.WriteEndElement()
        }

        $writer.WriteEndElement()
    }

    $writer.WriteEndElement()
    $writer.WriteEndDocument()
    $writer.Dispose()

    return [pscustomobject]@{
        Source = $SourceGift
        Xml = $OutXml
        Questions = $questionCount
        Visuals = $visualCount
    }
}

$root = Resolve-Path $CourseRoot
$courseCode = Split-Path $root.Path -Leaf
if ($CleanGenerated) {
    Get-ChildItem -Path (Join-Path $root "Units") -Recurse -Directory -Filter "Moodle XML" | ForEach-Object {
        if ($_.FullName.StartsWith($root.Path, [System.StringComparison]::OrdinalIgnoreCase)) {
            Remove-Item -LiteralPath $_.FullName -Recurse -Force
        }
    }
}

$giftFiles = Get-ChildItem -Path (Join-Path $root "Units") -Recurse -Filter "*.gift" |
    Where-Object { $_.FullName -notmatch 'Moodle XML Visual Trial' } |
    Sort-Object FullName

$results = @()
foreach ($gift in $giftFiles) {
    $questions = Parse-GiftQuestions $gift.FullName
    if ($questions.Count -eq 0) {
        throw "No questions parsed from $($gift.FullName)"
    }
    $outDir = Join-Path $gift.DirectoryName "Moodle XML"
    $assetDir = Join-Path $outDir "assets"
    New-Item -ItemType Directory -Force -Path $assetDir | Out-Null
    $xmlName = [System.IO.Path]::GetFileNameWithoutExtension($gift.Name) + "_MoodleXML.xml"
    $outXml = Join-Path $outDir $xmlName
    $results += New-MoodleXml -SourceGift $gift.FullName -Questions $questions -OutXml $outXml -AssetDir $assetDir -CourseCode $courseCode
}

$manifestPath = Join-Path $root ($courseCode + "_MOODLE_XML_ASSESSMENT_CONVERSION_MANIFEST.md")
$totalQuestions = ($results | Measure-Object -Property Questions -Sum).Sum
$totalVisuals = ($results | Measure-Object -Property Visuals -Sum).Sum
$lines = @(
    "# $courseCode Moodle XML Assessment Conversion Manifest",
    "",
    "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')",
    "",
    "Purpose: Convert $courseCode Moodle-ready assessment banks from GIFT to Moodle XML while preserving the original GIFT files and embedding visuals where they support student understanding.",
    "",
    "Rules applied:",
    "- Original `.gift` files were not deleted or modified.",
    "- Moodle XML files are stored in `Moodle XML` folders beside their source assessment banks.",
    "- Graph visuals are embedded inside the XML question text using Moodle XML base64 file attachments.",
    "- Answer choices strip visible `A.`, `B.`, `C.`, `D.` prefixes because Moodle XML supplies answer lettering.",
    "- Table-style answer choices are converted into Moodle HTML tables.",
    "- Math exponents are rendered with HTML superscript where detected.",
    "",
    "Summary:",
    "- Source GIFT files converted: $($results.Count)",
    "- XML files created: $($results.Count)",
    "- Questions converted: $totalQuestions",
    "- Embedded graph visuals generated: $totalVisuals",
    "",
    "| Source GIFT | Moodle XML | Questions | Embedded visuals |",
    "|---|---|---:|---:|"
)
foreach ($result in $results) {
    $sourceRel = $result.Source.Substring($root.Path.Length + 1) -replace '\\', '/'
    $xmlRel = $result.Xml.Substring($root.Path.Length + 1) -replace '\\', '/'
    $lines += "| ``$($sourceRel)`` | ``$($xmlRel)`` | $($result.Questions) | $($result.Visuals) |"
}
[System.IO.File]::WriteAllLines($manifestPath, $lines, [System.Text.UTF8Encoding]::new($false))

[pscustomobject]@{
    CourseRoot = $root.Path
    ConvertedFiles = $results.Count
    Questions = $totalQuestions
    EmbeddedVisuals = $totalVisuals
    Manifest = $manifestPath
}
