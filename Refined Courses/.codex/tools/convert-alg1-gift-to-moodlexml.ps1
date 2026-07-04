param(
    [string]$CourseRoot = "ALG1",
    [switch]$CleanGenerated
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$script:DegreeSymbol = [string][char]0x00B0
$script:MojibakeDegree = [string][char]0x00C2 + [string][char]0x00B0

function ConvertFrom-GiftVisibleText {
    param([string]$Text)
    if ($null -eq $Text) { return "" }
    $result = $Text
    $result = $result -replace '\\=', '='
    $result = $result -replace '\\~', '~'
    $result = $result -replace '\\#', '#'
    $result = $result -replace '\\{', '{'
    $result = $result -replace '\\}', '}'
    $result = $result -replace [regex]::Escape($script:MojibakeDegree), $script:DegreeSymbol
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
    $result = $result -replace [regex]::Escape($script:MojibakeDegree), '&deg;'
    $result = $result -replace [regex]::Escape($script:DegreeSymbol), '&deg;'
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
    $pattern = '(?ms)::(?<name>.*?)::\s*(?<body>.*?)(?:\r?\n)?\{\s*(?<answers>.*?)\s*\}\s*(?=\r?\n::|\z)'
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

function Get-GeometryVisualKind {
    param([string]$Stem)
    $text = (ConvertFrom-GiftVisibleText $Stem).ToLower()
    if ($text -notmatch 'diagram|figure|drawing|circle|arc|chord|tangent|secant|ray|segment|angle|parallel|perpendicular|triangle|quadrilateral|parallelogram|trapezoid|coordinate|rotation|reflection|translation|dilation|transformation|prism|cylinder|cone|sphere|net|marked|tick|matching|bisector|midpoint|linear pair|vertical angles') {
        return $null
    }
    if ($text -match 'circle|arc|chord|tangent|secant|inscribed|central angle') { return 'circle' }
    if ($text -match 'reflection|translation|rotation|dilation|transformation|coordinate') { return 'transform' }
    if ($text -match 'prism|cylinder|cone|sphere|net|volume|surface area') { return 'solid' }
    if ($text -match 'parallelogram|trapezoid|quadrilateral|rectangle|square|rhombus') { return 'quadrilateral' }
    if ($text -match 'triangle|isosceles|equilateral|exterior angle|interior angle|congruent.*triangle') { return 'triangle' }
    if ($text -match 'perpendicular bisector|midpoint|bisector') { return 'bisector' }
    if ($text -match 'linear pair|vertical angles|intersecting lines|parallel|perpendicular') { return 'lines' }
    if ($text -match 'tick marks|matching tick|congruent.*segment') { return 'segments' }
    if ($text -match 'ray|angle|matching arcs|square corner|right angle') { return 'angle' }
    if ($text -match 'straight line|collinear|between') { return 'line' }
    return 'geometry'
}

function Get-StatisticsVisualKind {
    param([string]$Stem)
    $text = (ConvertFrom-GiftVisibleText $Stem).ToLower()
    if ($text -notmatch 'histogram|bar chart|bar graph|scatterplot|scatter plot|box plot|dot plot|pie chart|segmented bar|two-way table|relative frequency|frequency table|normal|distribution|residual|line of best fit|correlation|data display|graph|chart|table|probability|simulation') {
        return $null
    }
    if ($text -match 'scatterplot|scatter plot|line of best fit|correlation|bivariate') { return 'scatter' }
    if ($text -match 'histogram|interval') { return 'histogram' }
    if ($text -match 'box plot|quartile|iqr|median|whisker') { return 'boxplot' }
    if ($text -match 'pie chart|slice|percent') { return 'pie' }
    if ($text -match 'segmented bar|relative frequency|percentages by|two-way') { return 'segmented' }
    if ($text -match 'bar chart|bar graph|category|categorical|favorite') { return 'bar' }
    if ($text -match 'dot plot|number line') { return 'dotplot' }
    if ($text -match 'normal|z-score|standard deviation|bell') { return 'normal' }
    if ($text -match 'residual') { return 'residual' }
    if ($text -match 'probability|simulation|random') { return 'probability' }
    if ($text -match 'table|frequency') { return 'table' }
    return 'stats'
}

function Get-PrecalculusVisualKind {
    param([string]$Stem)
    $text = (ConvertFrom-GiftVisibleText $Stem).ToLower()
    if ($text -notmatch 'graph|diagram|unit circle|radian|coterminal|reference angle|sin|cos|tan|trig|period|amplitude|phase|midline|periodic|identity|law of sines|law of cosines|circle|parabola|ellipse|hyperbola|conic|focus|directrix|asymptote|complex plane|polar|parametric|vector|magnitude|direction|sequence|series|limit|difference quotient|table') {
        return $null
    }
    if ($text -match 'unit circle|radian|coterminal|reference angle|exact value') { return 'unitcircle' }
    if ($text -match 'sin|cos|tan|trig|period|amplitude|phase|midline|periodic') { return 'triggraph' }
    if ($text -match 'law of sines|law of cosines|triangle trigonometry') { return 'trigtriangle' }
    if ($text -match 'circle.*conic|center.*radius|radius.*center') { return 'coniccircle' }
    if ($text -match 'parabola|focus|directrix') { return 'conicparabola' }
    if ($text -match 'ellipse|major axis|minor axis|foci') { return 'ellipse' }
    if ($text -match 'hyperbola|transverse axis|conjugate axis|asymptote') { return 'hyperbola' }
    if ($text -match 'complex plane|complex number|real axis|imaginary axis') { return 'complexplane' }
    if ($text -match 'polar') { return 'polar' }
    if ($text -match 'parametric') { return 'parametric' }
    if ($text -match 'vector|magnitude|direction|component') { return 'vector' }
    if ($text -match 'sequence|series|arithmetic|geometric|sigma') { return 'sequence' }
    if ($text -match 'limit|difference quotient|average rate|approaches') { return 'limit' }
    if ($text -match 'table') { return 'precalctable' }
    return 'precalcgraph'
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

    $precalculusKind = Get-PrecalculusVisualKind $stem
    if ($precalculusKind -and ($Question.QuestionId -match '^PC_|PRECALC' -or $Question.Standard -match '^MLA\.PC\.')) {
        return [pscustomobject]@{ Kind = 'precalculus'; Reason = 'Precalculus support visual reinforces the graph, diagram, coordinate representation, or table named in the question.'; Points = $null; Linear = $null; Quadratic = $null; GeometryKind = $null; StatisticsKind = $null; PrecalculusKind = $precalculusKind }
    }

    $statisticsKind = Get-StatisticsVisualKind $stem
    if ($statisticsKind) {
        return [pscustomobject]@{ Kind = 'statistics'; Reason = 'Statistics visual supports graph, table, distribution, or data-display interpretation without adding new assessment facts.'; Points = $null; Linear = $null; Quadratic = $null; GeometryKind = $null; StatisticsKind = $statisticsKind }
    }

    if ($precalculusKind) {
        return [pscustomobject]@{ Kind = 'precalculus'; Reason = 'Precalculus support visual reinforces the graph, diagram, coordinate representation, or table named in the question.'; Points = $null; Linear = $null; Quadratic = $null; GeometryKind = $null; StatisticsKind = $null; PrecalculusKind = $precalculusKind }
    }

    $geometryKind = Get-GeometryVisualKind $stem
    if ($geometryKind) {
        return [pscustomobject]@{ Kind = 'geometry'; Reason = 'Geometry diagram supports visual interpretation without adding new assessment facts.'; Points = $null; Linear = $null; Quadratic = $null; GeometryKind = $geometryKind }
    }

    return [pscustomobject]@{ Kind = 'none'; Reason = 'No visual required by question wording.'; Points = $null; Linear = $null; Quadratic = $null; GeometryKind = $null }
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

function New-GeometryImage {
    param(
        [string]$OutPath,
        [string]$Kind = "geometry",
        [string]$Title = "Geometry Diagram"
    )

    $width = 760
    $height = 460
    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)
    $font = [System.Drawing.Font]::new("Arial", 12)
    $labelFont = [System.Drawing.Font]::new("Arial", 14, [System.Drawing.FontStyle]::Bold)
    $titleFont = [System.Drawing.Font]::new("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(35,35,35), 3)
    $bluePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(24,99,188), 4)
    $redPen = [System.Drawing.Pen]::new([System.Drawing.Color]::Crimson, 3)
    $dashPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(35,35,35), 3)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash

    $g.DrawString($Title, $titleFont, [System.Drawing.Brushes]::Black, 30, 18)

    switch ($Kind) {
        "circle" {
            $cx = 380; $cy = 245; $r = 120
            $g.DrawEllipse($bluePen, $cx - $r, $cy - $r, $r * 2, $r * 2)
            $g.FillEllipse([System.Drawing.Brushes]::Black, $cx - 4, $cy - 4, 8, 8)
            $g.DrawLine($pen, $cx, $cy, $cx + 105, $cy - 55)
            $g.DrawLine($pen, $cx, $cy, $cx - 95, $cy - 70)
            $g.DrawArc($redPen, $cx - $r, $cy - $r, $r * 2, $r * 2, 208, 82)
            $g.DrawLine($dashPen, $cx - 95, $cy - 70, $cx + 105, $cy - 55)
            $g.DrawString("center", $font, [System.Drawing.Brushes]::Black, $cx + 8, $cy + 5)
            $g.DrawString("intercepted arc", $font, [System.Drawing.Brushes]::Crimson, $cx - 80, $cy - 155)
        }
        "transform" {
            for ($x = 120; $x -le 620; $x += 50) { $g.DrawLine([System.Drawing.Pens]::LightGray, $x, 95, $x, 390) }
            for ($y = 95; $y -le 390; $y += 50) { $g.DrawLine([System.Drawing.Pens]::LightGray, 120, $y, 620, $y) }
            $tri1 = @([System.Drawing.Point]::new(220,310), [System.Drawing.Point]::new(300,310), [System.Drawing.Point]::new(250,220))
            $tri2 = @([System.Drawing.Point]::new(470,310), [System.Drawing.Point]::new(550,310), [System.Drawing.Point]::new(520,220))
            $g.DrawPolygon($bluePen, $tri1)
            $g.DrawPolygon($redPen, $tri2)
            $g.DrawString("preimage", $font, [System.Drawing.Brushes]::Black, 205, 330)
            $g.DrawString("image", $font, [System.Drawing.Brushes]::Black, 485, 330)
            $g.DrawLine($dashPen, 315, 265, 445, 265)
            $g.DrawString("rigid motion / dilation", $font, [System.Drawing.Brushes]::Black, 305, 235)
        }
        "solid" {
            $g.DrawRectangle($bluePen, 210, 175, 150, 120)
            $g.DrawRectangle($bluePen, 270, 125, 150, 120)
            $g.DrawLine($bluePen, 210,175,270,125); $g.DrawLine($bluePen,360,175,420,125)
            $g.DrawLine($bluePen,210,295,270,245); $g.DrawLine($bluePen,360,295,420,245)
            $g.DrawEllipse($redPen, 500, 155, 120, 45)
            $g.DrawLine($redPen, 500,177,500,300); $g.DrawLine($redPen,620,177,620,300)
            $g.DrawEllipse($redPen, 500, 278, 120, 45)
            $g.DrawString("prism", $font, [System.Drawing.Brushes]::Black, 250, 315)
            $g.DrawString("cylinder", $font, [System.Drawing.Brushes]::Black, 530, 330)
        }
        "quadrilateral" {
            $pts = @([System.Drawing.Point]::new(230,300), [System.Drawing.Point]::new(520,300), [System.Drawing.Point]::new(450,150), [System.Drawing.Point]::new(160,150))
            $g.DrawPolygon($bluePen, $pts)
            $g.DrawLine($dashPen, 230,300,450,150)
            $g.DrawLine($dashPen, 160,150,520,300)
            $g.DrawString("opposite sides / angles", $font, [System.Drawing.Brushes]::Black, 270, 325)
            $g.DrawString("diagonals", $font, [System.Drawing.Brushes]::Black, 360, 205)
        }
        "triangle" {
            $pts = @([System.Drawing.Point]::new(220,315), [System.Drawing.Point]::new(540,315), [System.Drawing.Point]::new(380,120))
            $g.DrawPolygon($bluePen, $pts)
            $g.DrawArc($redPen, 345, 255, 70, 70, 205, 130)
            $g.DrawString("A", $labelFont, [System.Drawing.Brushes]::Black, 205, 318)
            $g.DrawString("B", $labelFont, [System.Drawing.Brushes]::Black, 545, 318)
            $g.DrawString("C", $labelFont, [System.Drawing.Brushes]::Black, 375, 92)
            $g.DrawString("use side and angle relationships", $font, [System.Drawing.Brushes]::Black, 250, 350)
        }
        "bisector" {
            $g.DrawLine($bluePen, 160,260,600,260)
            $g.DrawLine($redPen, 380,125,380,380)
            $g.DrawString("A", $labelFont, [System.Drawing.Brushes]::Black, 145, 270)
            $g.DrawString("M", $labelFont, [System.Drawing.Brushes]::Black, 368, 270)
            $g.DrawString("B", $labelFont, [System.Drawing.Brushes]::Black, 605, 270)
            $g.DrawLine($pen, 355,245,355,275); $g.DrawLine($pen, 405,245,405,275)
            $g.DrawString("midpoint and right angles", $font, [System.Drawing.Brushes]::Black, 285, 395)
        }
        "lines" {
            $g.DrawLine($bluePen, 140,310,620,135)
            $g.DrawLine($bluePen, 135,140,615,315)
            $g.DrawArc($redPen, 345, 205, 70, 70, 20, 75)
            $g.DrawArc($redPen, 345, 205, 70, 70, 200, 75)
            $g.DrawString("intersecting lines", $font, [System.Drawing.Brushes]::Black, 305, 345)
            $g.DrawString("vertical / linear-pair angles", $font, [System.Drawing.Brushes]::Black, 270, 370)
        }
        "segments" {
            $g.DrawLine($bluePen, 155,205,345,205)
            $g.DrawLine($bluePen, 415,205,605,205)
            $g.DrawLine($redPen, 240,185,250,225); $g.DrawLine($redPen, 510,185,520,225)
            $g.DrawString("D", $labelFont, [System.Drawing.Brushes]::Black, 140, 220)
            $g.DrawString("E", $labelFont, [System.Drawing.Brushes]::Black, 350, 220)
            $g.DrawString("F", $labelFont, [System.Drawing.Brushes]::Black, 400, 220)
            $g.DrawString("G", $labelFont, [System.Drawing.Brushes]::Black, 610, 220)
            $g.DrawString("matching tick marks indicate congruent segments", $font, [System.Drawing.Brushes]::Black, 210, 285)
        }
        "angle" {
            $g.DrawLine($bluePen, 220,320,560,320)
            $g.DrawLine($bluePen, 220,320,465,140)
            $g.DrawArc($redPen, 245,265,95,95,270,38)
            $g.DrawString("A", $labelFont, [System.Drawing.Brushes]::Black, 200, 330)
            $g.DrawString("shared endpoint / vertex", $font, [System.Drawing.Brushes]::Black, 275, 350)
        }
        "line" {
            $g.DrawLine($bluePen, 140,245,620,245)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 275,237,16,16)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 375,237,16,16)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 475,237,16,16)
            $g.DrawString("A", $labelFont, [System.Drawing.Brushes]::Black, 270, 260)
            $g.DrawString("B", $labelFont, [System.Drawing.Brushes]::Black, 370, 260)
            $g.DrawString("C", $labelFont, [System.Drawing.Brushes]::Black, 470, 260)
            $g.DrawString("collinear points with B between A and C", $font, [System.Drawing.Brushes]::Black, 245, 315)
        }
        default {
            $g.DrawLine($bluePen, 180,300,580,300)
            $g.DrawLine($bluePen, 250,150,510,330)
            $g.DrawArc($redPen, 275,250,80,80,270,45)
            $g.DrawString("Use only marked or stated evidence.", $font, [System.Drawing.Brushes]::Black, 240, 360)
        }
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $pen.Dispose(); $bluePen.Dispose(); $redPen.Dispose(); $dashPen.Dispose()
    $font.Dispose(); $labelFont.Dispose(); $titleFont.Dispose()
    $g.Dispose(); $bmp.Dispose()
    return $true
}

function New-StatisticsImage {
    param(
        [string]$OutPath,
        [string]$Kind = "stats",
        [string]$Title = "Statistics Support Visual"
    )

    $width = 760
    $height = 460
    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)
    $font = [System.Drawing.Font]::new("Arial", 12)
    $labelFont = [System.Drawing.Font]::new("Arial", 14, [System.Drawing.FontStyle]::Bold)
    $titleFont = [System.Drawing.Font]::new("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $axisPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(45,45,45), 2)
    $bluePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(24,99,188), 3)
    $redPen = [System.Drawing.Pen]::new([System.Drawing.Color]::Crimson, 3)
    $fillBlue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(95, 93, 159, 229))
    $fillGreen = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(95, 65, 170, 95))
    $fillGold = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(120, 235, 178, 62))

    $g.DrawString($Title, $titleFont, [System.Drawing.Brushes]::Black, 30, 18)
    $left = 110; $top = 95; $bottom = 365; $right = 650

    switch ($Kind) {
        "scatter" {
            $g.DrawLine($axisPen, $left, $bottom, $right, $bottom)
            $g.DrawLine($axisPen, $left, $bottom, $left, $top)
            $pts = @(@(150,325),@(205,300),@(250,275),@(295,255),@(350,220),@(410,200),@(470,165),@(535,135),@(595,115))
            foreach ($p in $pts) { $g.FillEllipse([System.Drawing.Brushes]::Crimson, $p[0]-5, $p[1]-5, 10, 10) }
            $g.DrawLine($bluePen, 145,330,610,105)
            $g.DrawString("x-variable", $font, [System.Drawing.Brushes]::Black, 335, 392)
            $g.DrawString("y-variable", $font, [System.Drawing.Brushes]::Black, 28, 210)
            $g.DrawString("pattern/trend", $font, [System.Drawing.Brushes]::Black, 455, 88)
        }
        "histogram" {
            $g.DrawLine($axisPen, $left, $bottom, $right, $bottom)
            $g.DrawLine($axisPen, $left, $bottom, $left, $top)
            $bars = @(90,145,205,130,75)
            for ($i = 0; $i -lt $bars.Count; $i++) {
                $x = $left + 25 + ($i * 95)
                $g.FillRectangle($fillBlue, $x, $bottom - $bars[$i], 95, $bars[$i])
                $g.DrawRectangle($bluePen, $x, $bottom - $bars[$i], 95, $bars[$i])
            }
            $g.DrawString("intervals", $font, [System.Drawing.Brushes]::Black, 335, 392)
            $g.DrawString("frequency", $font, [System.Drawing.Brushes]::Black, 28, 210)
        }
        "boxplot" {
            $y = 245
            $g.DrawLine($axisPen, 130, $y, 620, $y)
            $g.DrawLine($bluePen, 210, $y, 300, $y)
            $g.DrawLine($bluePen, 470, $y, 565, $y)
            $g.DrawRectangle($bluePen, 300, 200, 170, 90)
            $g.DrawLine($redPen, 385, 200, 385, 290)
            $g.DrawLine($bluePen, 210, 220, 210, 270)
            $g.DrawLine($bluePen, 565, 220, 565, 270)
            $g.DrawString("min", $font, [System.Drawing.Brushes]::Black, 195, 292)
            $g.DrawString("Q1", $font, [System.Drawing.Brushes]::Black, 292, 292)
            $g.DrawString("median", $font, [System.Drawing.Brushes]::Crimson, 360, 174)
            $g.DrawString("Q3", $font, [System.Drawing.Brushes]::Black, 462, 292)
            $g.DrawString("max", $font, [System.Drawing.Brushes]::Black, 550, 292)
        }
        "pie" {
            $rect = [System.Drawing.Rectangle]::new(260, 120, 230, 230)
            $g.FillPie($fillBlue, $rect, 0, 126)
            $g.FillPie($fillGreen, $rect, 126, 162)
            $g.FillPie($fillGold, $rect, 288, 72)
            $g.DrawEllipse($axisPen, $rect)
            $g.DrawString("35%", $labelFont, [System.Drawing.Brushes]::Black, 390, 160)
            $g.DrawString("45%", $labelFont, [System.Drawing.Brushes]::Black, 285, 240)
            $g.DrawString("20%", $labelFont, [System.Drawing.Brushes]::Black, 415, 292)
            $g.DrawString("parts of the whole", $font, [System.Drawing.Brushes]::Black, 305, 370)
        }
        "segmented" {
            $labels = @("Group A", "Group B")
            for ($i = 0; $i -lt 2; $i++) {
                $y = 170 + ($i * 95)
                $g.DrawString($labels[$i], $font, [System.Drawing.Brushes]::Black, 95, $y + 18)
                $g.FillRectangle($fillBlue, 190, $y, 150, 48)
                $g.FillRectangle($fillGreen, 340, $y, 210, 48)
                $g.FillRectangle($fillGold, 550, $y, 90, 48)
                $g.DrawRectangle($axisPen, 190, $y, 450, 48)
            }
            $g.DrawString("segments compare category percentages within each group", $font, [System.Drawing.Brushes]::Black, 170, 340)
        }
        "bar" {
            $g.DrawLine($axisPen, $left, $bottom, $right, $bottom)
            $g.DrawLine($axisPen, $left, $bottom, $left, $top)
            $bars = @(130, 210, 160, 90)
            for ($i = 0; $i -lt $bars.Count; $i++) {
                $x = $left + 55 + ($i * 110)
                $g.FillRectangle($fillGreen, $x, $bottom - $bars[$i], 60, $bars[$i])
                $g.DrawRectangle($bluePen, $x, $bottom - $bars[$i], 60, $bars[$i])
            }
            $g.DrawString("categories", $font, [System.Drawing.Brushes]::Black, 325, 392)
            $g.DrawString("count/frequency", $font, [System.Drawing.Brushes]::Black, 18, 205)
        }
        "dotplot" {
            $g.DrawLine($axisPen, 150, 330, 615, 330)
            $xs = @(190,190,235,280,280,280,325,370,370,415,460,460,505,550)
            $levels = @{}
            foreach ($x in $xs) {
                if (-not $levels.ContainsKey($x)) { $levels[$x] = 0 }
                $levels[$x]++
                $g.FillEllipse([System.Drawing.Brushes]::Crimson, $x - 7, 330 - ($levels[$x] * 22), 14, 14)
            }
            $g.DrawString("each dot represents one data value", $font, [System.Drawing.Brushes]::Black, 250, 365)
        }
        "normal" {
            $g.DrawLine($axisPen, $left, $bottom, $right, $bottom)
            $pts = @()
            for ($i = 0; $i -le 240; $i++) {
                $x = -3.5 + ($i / 240.0) * 7.0
                $y = [Math]::Exp(-0.5 * $x * $x)
                $px = [int]($left + (($x + 3.5) / 7.0) * ($right - $left))
                $py = [int]($bottom - ($y * 230))
                $pts += [System.Drawing.Point]::new($px, $py)
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawLine($redPen, 380, 130, 380, $bottom)
            $g.DrawString("mean", $font, [System.Drawing.Brushes]::Crimson, 365, 372)
            $g.DrawString("bell-shaped distribution", $font, [System.Drawing.Brushes]::Black, 290, 95)
        }
        "residual" {
            $g.DrawLine($axisPen, $left, 235, $right, 235)
            $pts = @(@(160,205),@(215,260),@(270,225),@(325,280),@(380,200),@(435,245),@(490,215),@(545,270),@(600,220))
            foreach ($p in $pts) { $g.FillEllipse([System.Drawing.Brushes]::Crimson, $p[0]-5, $p[1]-5, 10, 10) }
            $g.DrawString("residuals above and below 0", $font, [System.Drawing.Brushes]::Black, 275, 310)
        }
        "probability" {
            $g.DrawRectangle($bluePen, 185, 145, 390, 170)
            for ($i = 1; $i -lt 6; $i++) { $g.DrawLine($axisPen, 185 + ($i * 65), 145, 185 + ($i * 65), 315) }
            $values = @("1","2","3","4","5","6")
            for ($i = 0; $i -lt 6; $i++) { $g.DrawString($values[$i], $labelFont, [System.Drawing.Brushes]::Black, 210 + ($i * 65), 215) }
            $g.DrawString("possible outcomes", $font, [System.Drawing.Brushes]::Black, 310, 335)
        }
        "table" {
            $headers = @("Category", "Count", "Relative Freq.")
            $rows = @(@("A","12","0.30"),@("B","18","0.45"),@("C","10","0.25"))
            $x0 = 175; $y0 = 135; $cw = 135; $ch = 48
            for ($c = 0; $c -lt 3; $c++) {
                $g.FillRectangle($fillBlue, $x0 + ($c * $cw), $y0, $cw, $ch)
                $g.DrawRectangle($axisPen, $x0 + ($c * $cw), $y0, $cw, $ch)
                $g.DrawString($headers[$c], $font, [System.Drawing.Brushes]::Black, $x0 + 10 + ($c * $cw), $y0 + 14)
            }
            for ($r = 0; $r -lt 3; $r++) {
                for ($c = 0; $c -lt 3; $c++) {
                    $g.DrawRectangle($axisPen, $x0 + ($c * $cw), $y0 + (($r + 1) * $ch), $cw, $ch)
                    $g.DrawString($rows[$r][$c], $font, [System.Drawing.Brushes]::Black, $x0 + 45 + ($c * $cw), $y0 + 14 + (($r + 1) * $ch))
                }
            }
        }
        default {
            $g.DrawLine($axisPen, $left, $bottom, $right, $bottom)
            $g.DrawLine($axisPen, $left, $bottom, $left, $top)
            $g.FillRectangle($fillBlue, 170, 210, 70, 155)
            $g.FillRectangle($fillGreen, 280, 160, 70, 205)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 455, 195, 12, 12)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 510, 165, 12, 12)
            $g.DrawString("read title, axes, scale, and context", $font, [System.Drawing.Brushes]::Black, 245, 392)
        }
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $axisPen.Dispose(); $bluePen.Dispose(); $redPen.Dispose()
    $fillBlue.Dispose(); $fillGreen.Dispose(); $fillGold.Dispose()
    $font.Dispose(); $labelFont.Dispose(); $titleFont.Dispose()
    $g.Dispose(); $bmp.Dispose()
    return $true
}

function New-PrecalculusImage {
    param(
        [string]$OutPath,
        [string]$Kind,
        [string]$Title = "Precalculus Support Visual"
    )

    $width = 760
    $height = 470
    $bmp = [System.Drawing.Bitmap]::new($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::White)

    $axisPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(60, 60, 60), 2)
    $gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(224, 224, 224), 1)
    $bluePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(31, 99, 177), 3)
    $redPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(204, 45, 45), 3)
    $greenPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(38, 130, 82), 3)
    $dashPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(130, 130, 130), 2)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $fillBlue = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(223, 237, 252))
    $fillGold = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 236, 184))
    $fillGreen = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(221, 244, 231))
    $font = [System.Drawing.Font]::new("Arial", 12)
    $labelFont = [System.Drawing.Font]::new("Arial", 10)
    $titleFont = [System.Drawing.Font]::new("Arial", 18, [System.Drawing.FontStyle]::Bold)

    $g.DrawString($Title, $titleFont, [System.Drawing.Brushes]::Black, 24, 18)

    function DrawGrid([int]$left, [int]$top, [int]$right, [int]$bottom) {
        for ($x = $left; $x -le $right; $x += 45) { $g.DrawLine($gridPen, $x, $top, $x, $bottom) }
        for ($y = $top; $y -le $bottom; $y += 45) { $g.DrawLine($gridPen, $left, $y, $right, $y) }
        $g.DrawLine($axisPen, $left, [int](($top + $bottom) / 2), $right, [int](($top + $bottom) / 2))
        $g.DrawLine($axisPen, [int](($left + $right) / 2), $top, [int](($left + $right) / 2), $bottom)
    }

    switch ($Kind) {
        "unitcircle" {
            $cx = 380; $cy = 245; $r = 145
            $g.DrawEllipse($bluePen, $cx - $r, $cy - $r, 2 * $r, 2 * $r)
            $g.DrawLine($axisPen, $cx - 190, $cy, $cx + 190, $cy)
            $g.DrawLine($axisPen, $cx, $cy - 190, $cx, $cy + 190)
            $angles = @(0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330)
            foreach ($a in $angles) {
                $rad = $a * [Math]::PI / 180
                $x = [int]($cx + $r * [Math]::Cos($rad))
                $y = [int]($cy - $r * [Math]::Sin($rad))
                $g.FillEllipse([System.Drawing.Brushes]::Crimson, $x - 4, $y - 4, 8, 8)
            }
            $g.DrawLine($redPen, $cx, $cy, [int]($cx + $r * 0.707), [int]($cy - $r * 0.707))
            $g.DrawString("radian angle", $font, [System.Drawing.Brushes]::Black, 442, 145)
            $g.DrawString("(cos theta, sin theta)", $font, [System.Drawing.Brushes]::Black, 435, 210)
        }
        "triggraph" {
            DrawGrid 70 95 690 390
            $pts = @()
            for ($i = 0; $i -le 360; $i += 3) {
                $x = 70 + ($i / 360.0) * 620
                $y = 242 - [Math]::Sin($i * [Math]::PI / 90.0) * 95
                $pts += [System.Drawing.Point]::new([int]$x, [int]$y)
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawLine($dashPen, 70, 242, 690, 242)
            $g.DrawString("amplitude", $font, [System.Drawing.Brushes]::Black, 95, 135)
            $g.DrawString("period", $font, [System.Drawing.Brushes]::Black, 355, 398)
            $g.DrawString("midline", $font, [System.Drawing.Brushes]::Black, 600, 248)
        }
        "trigtriangle" {
            $points = @([System.Drawing.Point]::new(180, 340), [System.Drawing.Point]::new(560, 340), [System.Drawing.Point]::new(420, 140))
            $g.DrawPolygon($bluePen, $points)
            $g.DrawString("a", $font, [System.Drawing.Brushes]::Black, 485, 245)
            $g.DrawString("b", $font, [System.Drawing.Brushes]::Black, 285, 230)
            $g.DrawString("c", $font, [System.Drawing.Brushes]::Black, 355, 355)
            $g.DrawString("A", $font, [System.Drawing.Brushes]::Black, 158, 343)
            $g.DrawString("B", $font, [System.Drawing.Brushes]::Black, 565, 343)
            $g.DrawString("C", $font, [System.Drawing.Brushes]::Black, 420, 115)
            $g.DrawString("Use sides and included/opposite angles.", $font, [System.Drawing.Brushes]::Black, 220, 392)
        }
        "coniccircle" {
            DrawGrid 105 95 655 395
            $g.DrawEllipse($bluePen, 265, 130, 230, 230)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 375, 240, 10, 10)
            $g.DrawLine($redPen, 380, 245, 495, 245)
            $g.DrawString("center", $font, [System.Drawing.Brushes]::Black, 390, 252)
            $g.DrawString("radius", $font, [System.Drawing.Brushes]::Black, 430, 220)
        }
        "conicparabola" {
            DrawGrid 105 95 655 395
            $pts = @()
            for ($x = -120; $x -le 120; $x += 4) {
                $px = 380 + $x
                $py = 315 - (($x * $x) / 120)
                $pts += [System.Drawing.Point]::new([int]$px, [int]$py)
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawLine($dashPen, 205, 345, 555, 345)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 374, 248, 12, 12)
            $g.DrawString("focus", $font, [System.Drawing.Brushes]::Black, 392, 245)
            $g.DrawString("directrix", $font, [System.Drawing.Brushes]::Black, 565, 338)
        }
        "ellipse" {
            DrawGrid 105 95 655 395
            $g.DrawEllipse($bluePen, 220, 165, 320, 150)
            $g.DrawLine($redPen, 220, 240, 540, 240)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 295, 235, 10, 10)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 455, 235, 10, 10)
            $g.DrawString("major axis", $font, [System.Drawing.Brushes]::Black, 340, 250)
            $g.DrawString("foci", $font, [System.Drawing.Brushes]::Black, 470, 215)
        }
        "hyperbola" {
            DrawGrid 105 95 655 395
            $g.DrawLine($dashPen, 215, 360, 545, 120)
            $g.DrawLine($dashPen, 215, 120, 545, 360)
            $g.DrawArc($bluePen, 245, 160, 210, 160, 115, 130)
            $g.DrawArc($bluePen, 305, 160, 210, 160, -65, 130)
            $g.DrawString("asymptotes", $font, [System.Drawing.Brushes]::Black, 500, 115)
            $g.DrawString("branches", $font, [System.Drawing.Brushes]::Black, 335, 335)
        }
        "complexplane" {
            DrawGrid 105 95 655 395
            $g.DrawString("real", $font, [System.Drawing.Brushes]::Black, 612, 246)
            $g.DrawString("imaginary", $font, [System.Drawing.Brushes]::Black, 392, 102)
            $g.DrawLine($redPen, 380, 245, 500, 155)
            $g.FillEllipse([System.Drawing.Brushes]::Crimson, 494, 149, 12, 12)
            $g.DrawString("a + bi", $font, [System.Drawing.Brushes]::Black, 510, 145)
        }
        "polar" {
            $cx = 380; $cy = 245
            for ($r = 45; $r -le 180; $r += 45) { $g.DrawEllipse($gridPen, $cx - $r, $cy - $r, 2 * $r, 2 * $r) }
            for ($a = 0; $a -lt 180; $a += 30) {
                $rad = $a * [Math]::PI / 180
                $g.DrawLine($gridPen, [int]($cx - 190 * [Math]::Cos($rad)), [int]($cy - 190 * [Math]::Sin($rad)), [int]($cx + 190 * [Math]::Cos($rad)), [int]($cy + 190 * [Math]::Sin($rad)))
            }
            $pts = @()
            for ($i = 0; $i -le 360; $i += 4) {
                $t = $i * [Math]::PI / 180
                $r = 90 * (1 + [Math]::Cos($t))
                $pts += [System.Drawing.Point]::new([int]($cx + $r * [Math]::Cos($t)), [int]($cy - $r * [Math]::Sin($t)))
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawString("polar grid", $font, [System.Drawing.Brushes]::Black, 75, 390)
        }
        "parametric" {
            DrawGrid 105 95 655 395
            $pts = @()
            for ($i = 0; $i -le 240; $i += 4) {
                $t = $i / 28.0
                $x = 160 + $i * 1.9
                $y = 245 - 95 * [Math]::Sin($t)
                $pts += [System.Drawing.Point]::new([int]$x, [int]$y)
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawString("x(t)", $font, [System.Drawing.Brushes]::Black, 570, 250)
            $g.DrawString("y(t)", $font, [System.Drawing.Brushes]::Black, 390, 118)
            $g.DrawString("motion over time", $font, [System.Drawing.Brushes]::Black, 300, 398)
        }
        "vector" {
            DrawGrid 105 95 655 395
            $g.DrawLine($redPen, 380, 245, 560, 145)
            $g.DrawLine($redPen, 560, 145, 535, 147)
            $g.DrawLine($redPen, 560, 145, 548, 168)
            $g.DrawLine($dashPen, 380, 245, 560, 245)
            $g.DrawLine($dashPen, 560, 245, 560, 145)
            $g.DrawString("horizontal component", $font, [System.Drawing.Brushes]::Black, 400, 255)
            $g.DrawString("vertical component", $font, [System.Drawing.Brushes]::Black, 565, 185)
            $g.DrawString("magnitude and direction", $font, [System.Drawing.Brushes]::Black, 415, 130)
        }
        "sequence" {
            $x0 = 85; $y0 = 130; $cw = 98; $ch = 55
            $headers = @("n","1","2","3","4","5")
            $values = @("a_n","3","6","12","24","48")
            for ($c = 0; $c -lt 6; $c++) {
                $g.FillRectangle($fillBlue, $x0 + $c * $cw, $y0, $cw, $ch)
                $g.DrawRectangle($axisPen, $x0 + $c * $cw, $y0, $cw, $ch)
                $g.DrawString($headers[$c], $font, [System.Drawing.Brushes]::Black, $x0 + 45 + $c * $cw, $y0 + 18)
                $g.DrawRectangle($axisPen, $x0 + $c * $cw, $y0 + $ch, $cw, $ch)
                $g.DrawString($values[$c], $font, [System.Drawing.Brushes]::Black, $x0 + 35 + $c * $cw, $y0 + $ch + 18)
            }
            $g.DrawString("Look for common difference, common ratio, or summation pattern.", $font, [System.Drawing.Brushes]::Black, 130, 300)
        }
        "limit" {
            DrawGrid 105 95 655 395
            $pts1 = @()
            for ($i = -160; $i -le -12; $i += 4) {
                $x = 380 + $i
                $y = 245 - (12000 / ($i - 8))
                $pts1 += [System.Drawing.Point]::new([int]$x, [int]$y)
            }
            $pts2 = @()
            for ($i = 12; $i -le 160; $i += 4) {
                $x = 380 + $i
                $y = 245 - (12000 / ($i + 8))
                $pts2 += [System.Drawing.Point]::new([int]$x, [int]$y)
            }
            if ($pts1.Count -gt 1) { $g.DrawLines($bluePen, $pts1) }
            if ($pts2.Count -gt 1) { $g.DrawLines($bluePen, $pts2) }
            $g.DrawLine($dashPen, 380, 95, 380, 395)
            $g.DrawString("approaches", $font, [System.Drawing.Brushes]::Black, 470, 165)
            $g.DrawString("check left and right behavior", $font, [System.Drawing.Brushes]::Black, 245, 398)
        }
        "precalctable" {
            $x0 = 95; $y0 = 120; $cw = 115; $ch = 55
            $headers = @("x", "-2", "-1", "0", "1")
            $values = @("f(x)", "4", "1", "0", "1")
            for ($c = 0; $c -lt 5; $c++) {
                $g.FillRectangle($fillGreen, $x0 + $c * $cw, $y0, $cw, $ch)
                $g.DrawRectangle($axisPen, $x0 + $c * $cw, $y0, $cw, $ch)
                $g.DrawString($headers[$c], $font, [System.Drawing.Brushes]::Black, $x0 + 55 + $c * $cw, $y0 + 18)
                $g.DrawRectangle($axisPen, $x0 + $c * $cw, $y0 + $ch, $cw, $ch)
                $g.DrawString($values[$c], $font, [System.Drawing.Brushes]::Black, $x0 + 50 + $c * $cw, $y0 + $ch + 18)
            }
            $g.DrawString("Use the table to compare inputs, outputs, and pattern.", $font, [System.Drawing.Brushes]::Black, 165, 285)
        }
        default {
            DrawGrid 105 95 655 395
            $pts = @()
            for ($i = -180; $i -le 180; $i += 4) {
                $x = 380 + $i
                $y = 245 - 0.004 * $i * $i + 70
                $pts += [System.Drawing.Point]::new([int]$x, [int]$y)
            }
            $g.DrawLines($bluePen, $pts)
            $g.DrawString("identify key features and representation", $font, [System.Drawing.Brushes]::Black, 235, 398)
        }
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $axisPen.Dispose(); $gridPen.Dispose(); $bluePen.Dispose(); $redPen.Dispose(); $greenPen.Dispose(); $dashPen.Dispose()
    $fillBlue.Dispose(); $fillGold.Dispose(); $fillGreen.Dispose()
    $font.Dispose(); $labelFont.Dispose(); $titleFont.Dispose()
    $g.Dispose(); $bmp.Dispose()
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
        elseif ($decision.Kind -eq 'geometry') {
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_diagram.png"
            $imgPath = Join-Path $AssetDir $imgName
            $created = New-GeometryImage -OutPath $imgPath -Kind $decision.GeometryKind -Title "Geometry Support Diagram"
            if ($created) {
                $visualCount++
                $questionHtml += '<p><img src="@@PLUGINFILE@@/' + $imgName + '" alt="' + (ConvertTo-HtmlText $decision.Reason) + '" style="max-width:100%;height:auto;" /></p>'
                $files += [pscustomobject]@{ Name = $imgName; Path = $imgPath }
            }
        }
        elseif ($decision.Kind -eq 'statistics') {
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_visual.png"
            $imgPath = Join-Path $AssetDir $imgName
            $created = New-StatisticsImage -OutPath $imgPath -Kind $decision.StatisticsKind -Title "Statistics Support Visual"
            if ($created) {
                $visualCount++
                $questionHtml += '<p><img src="@@PLUGINFILE@@/' + $imgName + '" alt="' + (ConvertTo-HtmlText $decision.Reason) + '" style="max-width:100%;height:auto;" /></p>'
                $files += [pscustomobject]@{ Name = $imgName; Path = $imgPath }
            }
        }
        elseif ($decision.Kind -eq 'precalculus') {
            $imgName = (Get-SafeFilePart $question.QuestionId) + "_visual.png"
            $imgPath = Join-Path $AssetDir $imgName
            $created = New-PrecalculusImage -OutPath $imgPath -Kind $decision.PrecalculusKind -Title "Precalculus Support Visual"
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
    Where-Object {
        $siblingPretest = Join-Path (Join-Path $_.DirectoryName "Pretest") $_.Name
        -not ($_.Directory.Name -match '^Unit \d{2}$' -and $_.Name -match 'Pretest\.gift$' -and (Test-Path $siblingPretest))
    } |
    Sort-Object FullName

$results = @()
foreach ($gift in $giftFiles) {
    $questions = @(Parse-GiftQuestions $gift.FullName)
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
    "- Graph and diagram visuals are embedded inside the XML question text using Moodle XML base64 file attachments.",
    "- Answer choices strip visible `A.`, `B.`, `C.`, `D.` prefixes because Moodle XML supplies answer lettering.",
    "- Table-style answer choices are converted into Moodle HTML tables.",
    "- Math exponents are rendered with HTML superscript where detected.",
    "",
    "Summary:",
    "- Source GIFT files converted: $($results.Count)",
    "- XML files created: $($results.Count)",
    "- Questions converted: $totalQuestions",
    "- Embedded graph/diagram visuals generated: $totalVisuals",
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
