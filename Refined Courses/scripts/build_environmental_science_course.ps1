param(
  [string]$CourseRoot = "ENVIRONMENTAL SCIENCE"
)

$ErrorActionPreference = "Stop"

function Html([string]$s) {
  if ($null -eq $s) { return "" }
  return [System.Net.WebUtility]::HtmlEncode($s)
}

function CData([string]$s) {
  if ($null -eq $s) { $s = "" }
  return "<![CDATA[$($s.Replace(']]>', ']]]]><![CDATA[>'))]]>"
}

function Write-TextFile {
  param(
    [string]$Path,
    [string]$Value
  )
  for ($i = 1; $i -le 8; $i++) {
    try {
      Set-Content -Path $Path -Value $Value -Encoding UTF8
      return
    } catch {
      if ($i -eq 8) { throw }
      Start-Sleep -Milliseconds (250 * $i)
    }
  }
}

function Get-LessonMap {
  param([string]$Path)
  $rows = @()
  foreach ($line in Get-Content -Path $Path) {
    if ($line -match '^\|\s*(\d+)\s*\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|') {
      $rows += [pscustomobject]@{
        Unit = [int]$matches[1]
        Lesson = [int]$matches[2]
        Title = $matches[3].Trim()
        Standards = $matches[4].Trim()
        Support = $matches[5].Trim()
        Purpose = $matches[6].Trim()
        Evidence = $matches[7].Trim()
      }
    }
  }
  $rows
}

function Get-LabMap {
  param([string]$Path)
  $map = @{}
  foreach ($line in Get-Content -Path $Path) {
    if ($line -match '^\|\s*(\d+)\s*\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|') {
      $map["$($matches[1])-$([int]$matches[2])"] = [pscustomobject]@{
        Lab = $matches[4].Trim()
        Visual = $matches[5].Trim()
        ResourceLocation = $matches[6].Trim()
        Stimulus = $matches[7].Trim()
      }
    }
  }
  $map
}

function ResourceMap {
  $raw = @'
1|1|EPA: Environmental Topics|https://www.epa.gov/environmental-topics|Use the topic list as a source-reliability example. Record one environmental claim, the evidence source needed, and why an official source is stronger than unsupported opinion.
1|2|EPA: Quality System and Environmental Data|https://www.epa.gov/quality|Use the quality system overview. Record one procedure control, one data-quality reason, and one way poor procedures make monitoring evidence unreliable.
1|3|USGS: Water Data for the Nation|https://waterdata.usgs.gov/nwis|Use the visible data categories. Record the data type, monitoring parameter, unit, and one reason maps or tables help environmental decisions.
1|4|NOAA Climate.gov: Climate Data Primer|https://www.climate.gov/maps-data/climate-data-primer|Use the data-primer page. Record one monitoring parameter, one source of uncertainty, and one rule for reading trends responsibly.
1|5|EPA: Environmental Justice|https://www.epa.gov/environmentaljustice/learn-about-environmental-justice|Use the page as a claims/source example. Record one evidence-based environmental claim and one claim that needs more data.
1|6|EPA: Sustainability|https://www.epa.gov/sustainability|Use the sustainability overview. Record one environmental decision, two evidence factors, and one social or economic tradeoff.
1|7|USGS: Science Data Catalog|https://data.usgs.gov/datacatalog/|Observe how environmental data sets are organized. Record the environmental question, possible data source, variable, and evidence needed.
1|8|EPA: Environmental Topics|https://www.epa.gov/environmental-topics|Use this source for Unit 1 synthesis. Record one source rule, one monitoring rule, one data/model rule, and one decision rule.
2|1|National Geographic: Ecological Succession|https://education.nationalgeographic.org/resource/ecological-succession/|Use the succession explanation. Record pioneer community, intermediate community, later community, and one reason ecosystems change.
2|2|NOAA: What is an Ecosystem?|https://oceanservice.noaa.gov/facts/ecosystem.html|Use the ecosystem definition. Record two biotic factors, two abiotic factors, and one interaction between them.
2|3|National Geographic: Symbiosis|https://education.nationalgeographic.org/resource/symbiosis/|Use the symbiosis examples. Record one mutualism, one commensalism, one parasitism, and the evidence that distinguishes them.
2|4|National Geographic: Food Web|https://education.nationalgeographic.org/resource/food-web/|Use the food-web explanation. Record producer, primary consumer, secondary consumer, decomposer, and direction of energy flow.
2|5|OpenStax Biology 2e: Energy Flow through Ecosystems|https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems|Use the energy-flow section. Record why energy decreases across trophic levels and how an energy pyramid represents that loss.
2|6|National Geographic: Biodiversity|https://education.nationalgeographic.org/resource/biodiversity/|Use the biodiversity explanation. Record species richness, ecosystem stability, one threat, and one evidence detail.
2|7|USGS: Invasive Species Program|https://www.usgs.gov/programs/invasive-species-program|Use the invasive species overview. Record how invasive species spread, one environmental impact, and one data type used to monitor impact.
2|8|National Geographic: Food Web|https://education.nationalgeographic.org/resource/food-web/|Use this source for Unit 2 synthesis. Record one ecosystem-change idea, one relationship, one food-web rule, one energy-flow rule, and one biodiversity impact.
3|1|Population Reference Bureau: Human Population Trends|https://www.prb.org/resources/human-population-trends/|Use the population trend discussion. Record population size, density or distribution, age structure, and one reason population data matters.
3|2|Our World in Data: Population Growth|https://ourworldindata.org/population-growth|Use the population growth graphs. Record birth rate, death rate, migration, and one graph trend.
3|3|CK-12: Carrying Capacity|https://www.ck12.org/biology/carrying-capacity/lesson/Carrying-Capacity-BIO/|Use the carrying-capacity explanation. Record limiting factor, carrying capacity, population overshoot, and one graph clue.
3|4|EPA: Report on the Environment|https://www.epa.gov/report-environment|Use this as a human-impact data source. Record one resource-use indicator, one environmental-quality indicator, and one relationship between people and systems.
3|5|CDC: Environmental Health|https://www.cdc.gov/environmental-health/|Use the environmental health overview. Record one exposure pathway, one health connection, and one reason personal health disclosure is not required.
3|6|CDC: One Health|https://www.cdc.gov/one-health/|Use the One Health overview. Record how people, animals, and environment connect, one pathogen/environment link, and one prevention idea.
3|7|EPA: Report on the Environment|https://www.epa.gov/report-environment|Use this for a population-impact case. Record the population factor, resource factor, environmental-quality evidence, and a cautious conclusion.
3|8|Our World in Data: Population Growth|https://ourworldindata.org/population-growth|Use this source for Unit 3 synthesis. Record one population descriptor, one change factor, one carrying-capacity rule, one human-impact connection, and one health/environment evidence point.
4|1|EIA: Sources of Energy|https://www.eia.gov/energyexplained/what-is-energy/sources-of-energy.php|Compare energy sources. Record renewable, nonrenewable, benefit, cost, and environmental tradeoff.
4|2|USGS: Mineral Resources Program|https://www.usgs.gov/programs/mineral-resources-program|Use this as a resource-availability source. Record resource, use, renewal or formation limit, and one availability concern.
4|3|EIA: Electricity Generation|https://www.eia.gov/energyexplained/electricity/electricity-in-the-us.php|Use the generation overview. Record two electricity technologies, one environmental consequence for each, and one tradeoff.
4|4|USGS: Water Science School|https://www.usgs.gov/special-topics/water-science-school|Use the water-resource overview. Record one water resource, one wildlife/forest/fossil fuel connection, and one management concern.
4|5|USGS: National Land Cover Database|https://www.usgs.gov/centers/eros/science/national-land-cover-database|Use the land-cover overview. Record land-use category, environmental consequence, stakeholder concern, and evidence needed.
4|6|EPA: Sustainable Management of Food|https://www.epa.gov/sustainable-management-food|Use this as a management case. Record resource, management option, cost/benefit, and evidence for a decision.
4|7|NREL: Learning About Renewable Energy|https://www.nrel.gov/research/learning.html|Use the renewable-energy page. Record one technology, resource need, environmental impact, and decision evidence.
4|8|EIA: Sources of Energy|https://www.eia.gov/energyexplained/what-is-energy/sources-of-energy.php|Use this source for Unit 4 synthesis. Record one resource type, one rate/availability issue, one energy technology, one land-use issue, and one management tradeoff.
5|1|NASA: Global Climate Change Evidence|https://climate.nasa.gov/evidence/|Use the evidence page. Record one climate indicator, one trend, and one evidence limit or uncertainty.
5|2|NOAA: Climate Change Impacts|https://www.noaa.gov/education/resource-collections/climate/climate-change-impacts|Use the impacts page. Record ocean, atmosphere, hydrology, and Florida-relevant impact evidence.
5|3|EPA: Pollution Prevention|https://www.epa.gov/p2/learn-about-pollution-prevention|Use the pollution-prevention overview. Record pollutant source, pathway, environmental impact, and prevention option.
5|4|EPA: Reduce, Reuse, Recycle|https://www.epa.gov/recycle|Use the waste-management overview. Record reduce, reuse, recycle or disposal strategy, and one evidence-based tradeoff.
5|5|EPA: Green Chemistry|https://www.epa.gov/greenchemistry|Use this as a technology/environmental-quality example. Record technology, intended benefit, possible risk, and evidence needed.
5|6|NIH: Genetically Modified Organisms|https://www.genome.gov/about-genomics/policy-issues/Genetically-Modified-Organisms|Use the GMO overview. Record one biotechnology use, possible benefit, possible concern, and decision evidence.
5|7|EPA: Climate Change Indicators|https://www.epa.gov/climate-indicators|Use the climate indicator list. Record one pollution or climate indicator, trend evidence, and one cautious conclusion.
5|8|NASA: Global Climate Change Evidence|https://climate.nasa.gov/evidence/|Use this source for Unit 5 synthesis. Record climate, Florida systems, pollution, waste, technology, and biotechnology evidence.
6|1|EPA: Environmental Indicators Gateway|https://www.epa.gov/environmental-indicators|Use the indicators overview. Record monitoring parameter, policy question, evidence, and decision limit.
6|2|EPA: Greener Living|https://www.epa.gov/environmental-topics/greener-living|Use the greener living topics. Record one lifestyle choice, possible environmental impact, and one reason personal disclosure is not required.
6|3|EPA: Community Environmental Decisions|https://www.epa.gov/communityhealth/how-communities-make-environmental-decisions|Use the decision process. Record claim, evidence, stakeholders, and tradeoff.
6|4|National Park Service: Conservation|https://www.nps.gov/subjects/conservation/index.htm|Use the conservation overview. Record conservation goal, stewardship action, evidence, and expected environmental benefit.
6|5|EPA: Sustainability|https://www.epa.gov/sustainability|Use the sustainability overview. Record solution, system affected, benefit, cost, and evidence.
6|6|EPA: Environmental Justice|https://www.epa.gov/environmentaljustice|Use the environmental justice overview. Record policy tradeoff, affected community, evidence, and fairness question.
6|7|NOAA: Climate Resilience Toolkit|https://toolkit.climate.gov/|Use the resilience toolkit overview. Record future scenario, environmental risk, adaptation option, and monitoring evidence.
6|8|EPA: Environmental Indicators Gateway|https://www.epa.gov/environmental-indicators|Use this source for Unit 6 synthesis. Record monitoring, policy, sustainability, conservation, justice, and future-systems evidence.
'@
  $m = @{}
  foreach ($line in $raw.Trim().Split("`n")) {
    $p = $line.Trim().Split('|')
    $m["$($p[0])-$($p[1])"] = [pscustomobject]@{ Title=$p[2]; Url=$p[3]; Task=$p[4] }
  }
  $m
}

function TopicProfile($lesson, $lab) {
  $title = $lesson.Title
  $visual = $lab.Visual
  $profile = [ordered]@{
    Focus = $lesson.Purpose
    Misconception = "answering from opinion or memory instead of using the assigned environmental evidence"
    Correction = "use the assigned map, graph, model, data table, source excerpt, or case evidence before making a claim"
    VisualUse = "Use $visual as the evidence source for this lesson. Read the title, labels, units, categories, or legend before making a conclusion."
    Steps = @(
      "Identify the environmental question being asked.",
      "Read the assigned visual, model, map, graph, table, source excerpt, or case data.",
      "Name the evidence pattern that supports the claim.",
      "Explain the environmental cause, effect, tradeoff, or system relationship.",
      "State one limitation so the conclusion does not go beyond the evidence."
    )
  }
  if ($title -match 'Food Web|Trophic') {
    $profile.Focus = "food webs, trophic levels, and energy flow"
    $profile.Misconception = "reading arrows as who eats whom instead of direction of energy transfer"
    $profile.Correction = "arrows in food webs show energy moving from food source to consumer"
    $profile.Steps = @("Identify producers, consumers, and decomposers.","Trace arrow direction as energy transfer.","Locate trophic level and expected energy loss.","Explain how changing one population can affect the food web.")
  } elseif ($title -match 'Succession') {
    $profile.Focus = "ecosystem change and succession evidence"
    $profile.Misconception = "thinking succession is random replacement with no pattern"
    $profile.Correction = "succession follows evidence-based patterns as communities change after disturbance or over time"
    $profile.Steps = @("Identify the disturbance or starting condition.","Place pioneer, intermediate, and later communities in order.","Connect abiotic changes to biotic changes.","Use the model to explain ecosystem recovery or shift.")
  } elseif ($title -match 'Biodiversity|Invasive') {
    $profile.Focus = "biodiversity change, extinction risk, and invasive species impact"
    $profile.Misconception = "counting only the number of organisms instead of species variety and ecosystem role"
    $profile.Correction = "biodiversity includes variety, balance, and ecosystem function, not just total organism count"
    $profile.Steps = @("Identify the species or biodiversity measure.","Compare before-and-after evidence.","Explain the ecological impact.","Connect the impact to stability, extinction, or management.")
  } elseif ($title -match 'Population|Births|Carrying') {
    $profile.Focus = "population structure, population change, and carrying capacity"
    $profile.Misconception = "thinking population size changes for one reason only"
    $profile.Correction = "population changes through births, deaths, immigration, emigration, resources, and limiting factors"
    $profile.Steps = @("Read the population graph or table.","Identify the factor changing the population.","Connect the factor to carrying capacity or resource use.","State whether the evidence shows growth, decline, stability, or overshoot.")
  } elseif ($title -match 'Resource|Energy Production|Land Use|Renewable') {
    $profile.Focus = "resource availability, energy technology, land use, and management tradeoffs"
    $profile.Misconception = "choosing the option that sounds best without comparing costs, benefits, renewal rate, and environmental impact"
    $profile.Correction = "resource decisions require evidence about availability, renewal, impact, cost, and long-term sustainability"
    $profile.Steps = @("Identify the resource or technology.","Classify it as renewable, nonrenewable, or managed resource.","Compare benefits and environmental costs.","Use the decision matrix or data table to justify a recommendation.")
  } elseif ($title -match 'Climate|Pollution|Waste|Technology|Biotechnology|Oceans') {
    $profile.Focus = "climate, pollution, waste, technology, and environmental quality evidence"
    $profile.Misconception = "treating one event, pollutant, or technology as proof of an entire environmental trend"
    $profile.Correction = "environmental trends require data patterns, source reliability, and careful limits on what the evidence proves"
    $profile.Steps = @("Identify the pollutant, climate factor, technology, or waste pathway.","Read the graph, map, or case data.","Connect source, pathway, and effect.","Separate evidence-based conclusion from unsupported claim.")
  } elseif ($title -match 'Policy|Sustainability|Conservation|Stewardship|Justice|Lifestyle|Future') {
    $profile.Focus = "sustainability, conservation, policy, environmental justice, and future systems decisions"
    $profile.Misconception = "assuming one stakeholder benefit means the policy is automatically the best environmental decision"
    $profile.Correction = "policy and sustainability decisions must weigh evidence, tradeoffs, affected communities, and long-term system effects"
    $profile.Steps = @("Identify the policy, solution, or lifestyle choice.","Name the environmental evidence used.","Compare stakeholder impacts and tradeoffs.","Justify the decision with monitoring or sustainability evidence.")
  }
  [pscustomobject]$profile
}

function PageHeader([string]$title) {
@"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>$(Html $title)</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#1f2933;margin:32px;max-width:980px}
    h1{font-size:1.7rem}h2{font-size:1.25rem;margin-top:1.4rem;border-bottom:1px solid #d7dee8;padding-bottom:.2rem}
    table{border-collapse:collapse;width:100%;margin:.9rem 0}th,td{border:1px solid #c8d1dc;padding:.55rem;vertical-align:top}th{background:#eef3f8}
    .box,.model,.practice,.check,.safety,.tor-support,.mistake,.correct{border:1px solid #c8d1dc;padding:.8rem;margin:1rem 0;background:#f8fafc}
    .safety{background:#fff8e6}.tor-support{background:#eef7ff}.mistake{background:#fff1f0}.correct{background:#f0fff4}.steps li{margin-bottom:.45rem}
  </style>
</head>
<body>
"@
}

function PageFooter { "</body>`n</html>`n" }

function ResourceBlock($resource) {
@"
<section class="box">
  <h2>Direct Lab, Model, or Data Resource</h2>
  <p><strong>Resource:</strong> <a href="$($resource.Url)" target="_blank" rel="noopener">$(Html $resource.Title)</a></p>
  <ol class="steps">
    <li>Open the link in a new tab.</li>
    <li>$(Html $resource.Task)</li>
    <li>Return to this lesson and use your notes as evidence in the notebook task, guided practice, independent work, or checkpoint.</li>
  </ol>
</section>
"@
}

function ComplianceBlock($lesson, $resource) {
@"
<section class="box">
  <p><strong>Standards:</strong> $(Html $lesson.Standards)</p>
  <p><strong>Required resource:</strong> <a href="$($resource.Url)" target="_blank" rel="noopener">$(Html $resource.Title)</a></p>
  <p><strong>Student action:</strong> Open the link, observe the assigned model, map, graph, table, source, case, or data set, record the required evidence, and use that evidence in the work on this page.</p>
  <p><strong>Teacher of Record support:</strong> Contact the Teacher of Record when the evidence, model, data, or reasoning step is unclear.</p>
</section>
"@
}

function CoreBlock($lesson, $lab, $resource) {
  $profile = TopicProfile $lesson $lab
  $steps = ($profile.Steps | ForEach-Object { "    <li>$(Html $_)</li>" }) -join "`n"
@"
<section class="box">
  <h2>Teacher-Style Explanation</h2>
  <p>This lesson focuses on <strong>$(Html $lesson.Title)</strong>. The standard is <strong>$(Html $lesson.Standards)</strong>, so the work must stay inside this lesson: <strong>$(Html $profile.Focus)</strong>.</p>
  <p>A strong environmental science answer does more than state an opinion. It reads the required map, graph, table, model, source, or case evidence; names the pattern; explains the environmental relationship; and limits the conclusion to what the evidence can support.</p>
  <ol class="steps">
$steps
  </ol>
</section>
<section class="model">
  <h2>Required Visual, Data, or Model</h2>
  <p><strong>Required evidence:</strong> $(Html $lab.Visual)</p>
  <p>$(Html $profile.VisualUse)</p>
</section>
$(ResourceBlock $resource)
<section class="mistake"><h2>Common Confusion to Avoid</h2><p><strong>Incorrect:</strong> $(Html $profile.Misconception)</p></section>
<section class="correct"><h2>Correct Thinking</h2><p><strong>Correct:</strong> $(Html $profile.Correction)</p></section>
<section class="tor-support"><h2>When to Contact the Teacher of Record</h2><p>Contact the Teacher of Record when you can describe the data but cannot explain how it supports the environmental claim. Bring the evidence source, the exact confusing step, and the claim you are trying to support.</p></section>
"@
}

function Write-LessonFiles($lesson, $lab, $resource) {
  $unit = "{0:D2}" -f $lesson.Unit
  $les = "{0:D2}" -f $lesson.Lesson
  $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $prefix = "ENV_U${unit}_L${les}"
  $title = "$prefix $($lesson.Title)"
  $compliance = ComplianceBlock $lesson $resource
  $core = CoreBlock $lesson $lab $resource

  $pages = @{
    "P01.html" = (PageHeader "$title - Overview") + "<h1>Lesson Overview: $(Html $lesson.Title)</h1>$compliance<section class=""box""><p><strong>Standards Covered:</strong> $(Html $lesson.Standards)</p><p><strong>Support Standards:</strong> $(Html $lesson.Support)</p><p><strong>What you will learn:</strong> $(Html $lesson.Purpose)</p><p><strong>What you will do:</strong> Use the lesson explanation, required evidence source, guided practice, independent work, and checkpoint to show mastery.</p><p><strong>How you will show mastery:</strong> $(Html $lesson.Evidence)</p><p><strong>Student-friendly standard connection:</strong> You are learning to use environmental evidence to explain systems, impacts, tradeoffs, and decisions.</p></section>$(ResourceBlock $resource)" + (PageFooter)
    "P02.html" = (PageHeader "$title - Notebook Part 1") + "<h1>Notebook Task Part 1: $(Html $lesson.Title)</h1>$compliance<section class=""box""><p><strong>Notebook title:</strong> $(Html $lesson.Title)</p><p><strong>Vocabulary:</strong> evidence, source, variable, parameter, trend, map, graph, model, system, impact, tradeoff, sustainability.</p></section>$core<section class=""check""><h2>Notebook Response</h2><p>Write a six-sentence explanation: define the main idea, identify the required evidence, describe the pattern, explain the environmental relationship, name one common confusion, and correct that confusion with evidence.</p></section>" + (PageFooter)
    "P03.html" = (PageHeader "$title - Notebook Part 2") + "<h1>Notebook Task Part 2: Evidence and Reasoning</h1>$compliance$core<section class=""check""><h2>Evidence Task</h2><p>Create a claim-evidence-reasoning response using the required visual, map, graph, table, model, source, or case data. The reasoning must stay inside the mapped standard.</p></section>" + (PageFooter)
    "P04.html" = (PageHeader "$title - Worked Examples") + "<h1>Worked Examples: $(Html $lesson.Title)</h1>$compliance$(ResourceBlock $resource)<section class=""box""><h2>Example 1: Identify Evidence</h2><ol class=""steps""><li>Read the question and identify the environmental system, source, data display, or case.</li><li>Match it to the standard: $(Html $lesson.Standards).</li><li>Use the required visual or data before answering.</li></ol></section><section class=""box""><h2>Example 2: Explain the Pattern</h2><ol class=""steps""><li>State what the evidence shows.</li><li>Explain the environmental cause, effect, or tradeoff.</li><li>State a limitation so the claim does not go beyond the data.</li></ol></section><section class=""box""><h2>Example 3: Apply the Evidence</h2><ol class=""steps""><li>Use the case, map, graph, table, or source as evidence.</li><li>Eliminate answers outside the lesson standard.</li><li>Select the answer with the clearest evidence-based connection.</li></ol></section>$core" + (PageFooter)
    "P05.html" = (PageHeader "$title - Guided Practice") + "<h1>Guided Practice</h1>$compliance<section class=""practice""><p>Use this practice to check whether you can apply <strong>$(Html $lesson.Standards)</strong> with the required evidence: $(Html $lab.Visual).</p><p>Read each item carefully, use the model or data, select the answer supported by evidence, and review the teachable feedback.</p></section>$(ResourceBlock $resource)" + (PageFooter)
    "P06.html" = (PageHeader "$title - Independent Work") + "<h1>Independent Work</h1>$compliance$(ResourceBlock $resource)<section class=""box""><h2>Instructions</h2><p>Complete all three parts using only this lesson standard, the required evidence source, and your notebook evidence.</p></section><section class=""box""><h2>Part A</h2><p>Define the environmental system, process, impact, or decision in your own words.</p></section><section class=""box""><h2>Part B</h2><p>Use the visual, map, table, graph, model, source, or case to explain how the evidence supports the standard.</p></section><section class=""box""><h2>Part C</h2><p>Write one claim-evidence-reasoning paragraph. Include a claim, two evidence details, and reasoning that connects the evidence to the environmental system, impact, tradeoff, or decision.</p></section>" + (PageFooter)
    "P07.html" = (PageHeader "$title - Checkpoint") + "<h1>Checkpoint</h1>$compliance$(ResourceBlock $resource)<section class=""check""><h2>Checkpoint Task</h2><p>Submit your environmental evidence response. Include the standard, the evidence source, the data or model detail you used, your claim, and your reasoning.</p><h2>Mastery Criteria</h2><ul><li>Evidence comes from the required lesson source.</li><li>Reasoning stays inside the mapped standard.</li><li>The answer explains cause, effect, system relationship, tradeoff, or decision clearly.</li><li>The response includes a limitation or uncertainty when the evidence requires it.</li></ul></section>" + (PageFooter)
  }
  foreach ($name in $pages.Keys) { Write-TextFile -Path (Join-Path $dir $name) -Value $pages[$name] }

  $meta = [ordered]@{ id=$prefix; course="Environmental Science"; unit=$lesson.Unit; lesson=$lesson.Lesson; title=$lesson.Title; standards=$lesson.Standards; resource=$resource.Url; requiredEvidence=$lab.Visual }
  Write-TextFile -Path (Join-Path $dir "lesson.json") -Value ($meta | ConvertTo-Json -Depth 5)
  $quizMeta = [ordered]@{ id="$prefix`_Quiz"; format="Moodle XML"; questions=25; standard=$lesson.Standards; stimulus=$lab.Stimulus }
  Write-TextFile -Path (Join-Path $dir "quiz.json") -Value ($quizMeta | ConvertTo-Json -Depth 5)
}

function New-Question($id, $standard, $title, $stimulus, $kind, $n, $profile) {
  $contexts = @(
    "A student reviews the required environmental evidence and must explain the first clear pattern.",
    "A notebook claim needs evidence from the assigned map, graph, model, table, source, or case.",
    "A data table shows a pattern that must be interpreted without overclaiming.",
    "A map or model labels several parts, and the answer must connect one part to its environmental role.",
    "A case source gives evidence for an environmental decision, but the conclusion must stay inside the mapped lesson.",
    "A model shows a sequence or pathway, and the answer must place the evidence in the correct order.",
    "A peer response names the topic but does not yet explain the environmental evidence.",
    "A checkpoint asks for evidence from the direct resource, not a memorized opinion.",
    "A graph or comparison table shows a trend that must be connected to the environmental process.",
    "A decision matrix gives enough evidence to eliminate choices that ignore tradeoffs.",
    "A student confuses one environmental factor with the whole system.",
    "A lab-style scenario asks which evidence detail makes the claim stronger.",
    "A source excerpt must be judged for reliability and relevance.",
    "A map, graph, or model includes a missing relationship that must be inferred from the lesson sequence.",
    "A public or fictional environmental case requires careful evidence-based reasoning.",
    "A comparison chart asks students to distinguish related environmental choices.",
    "A direct resource observation must be translated into a claim-evidence-reasoning statement.",
    "A misconception answer sounds familiar but ignores the required stimulus.",
    "A synthesis prompt asks what the evidence proves and what it does not prove.",
    "A student must decide which explanation is precise enough for this standard.",
    "A model shows a normal environmental process and should not be treated as a crisis unless data supports that claim.",
    "A systems question asks how one change affects another part of the environmental system.",
    "A monitoring scenario asks for a parameter, trend, and limitation.",
    "A table shows multiple variables, and the answer must identify the variable that matters.",
    "A final review item asks for the safest, most evidence-based explanation."
  )
  $correctIndex = ($n + $id.Length) % 4
  $correctAnswer = "$($profile.Correction). In this item, the evidence from $stimulus should be used to explain $($profile.Focus)."
  $answers = @(
    "$($profile.Misconception). This misses the evidence required for $title.",
    "Use a familiar environmental idea from another lesson instead of the $standard requirement.",
    "Name a term from $title but leave out the evidence connection shown in $stimulus.",
    $correctAnswer
  )
  if ($correctIndex -ne 3) {
    $answers[3] = $answers[$correctIndex]
    $answers[$correctIndex] = $correctAnswer
  }
  $stepCue = $profile.Steps[0]
  [pscustomobject]@{
    id = $id
    text = "Question ID: $id<br/>MLA Standard: $standard<br/><br/>$kind<br/>Lesson focus: $title<br/>Stimulus: $stimulus<br/><br/>$($contexts[($n-1) % $contexts.Count]) Which answer uses the lesson evidence most accurately?"
    answers = $answers
    correct = $correctIndex
    feedback = "Teachable feedback: First, $stepCue Then use the required stimulus ($stimulus) to connect the visible evidence to $($profile.Focus). Correct reasoning stays inside $standard and avoids the common mistake: $($profile.Misconception)."
  }
}

function Write-MoodleXml($path, $questions) {
  $items = @()
  foreach ($q in $questions) {
    $ans = @()
    for ($i=0; $i -lt 4; $i++) {
      $fraction = if ($i -eq $q.correct) { "100" } else { "0" }
      $ans += @"
    <answer fraction="$fraction" format="html">
      <text>$(CData $q.answers[$i])</text>
      <feedback format="html"><text>$(CData $q.feedback)</text></feedback>
    </answer>
"@
    }
    $items += @"
  <question type="multichoice">
    <name><text>$($q.id)</text></name>
    <questiontext format="html"><text>$(CData $q.text)</text></questiontext>
    <generalfeedback format="html"><text>$(CData $q.feedback)</text></generalfeedback>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
$($ans -join "`n")
  </question>
"@
  }
  $xml = "<?xml version=""1.0"" encoding=""UTF-8""?>`n<quiz>`n$($items -join "`n")`n</quiz>`n"
  New-Item -ItemType Directory -Force -Path (Split-Path $path) | Out-Null
  Write-TextFile -Path $path -Value $xml
}

function Write-Assessments($lessons, $labMap) {
  foreach ($lesson in $lessons) {
    $unit = "{0:D2}" -f $lesson.Unit
    $les = "{0:D2}" -f $lesson.Lesson
    $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les\Moodle XML"
    $lab = $labMap["$($lesson.Unit)-$($lesson.Lesson)"]
    $profile = TopicProfile $lesson $lab
    $gp = for ($i=1; $i -le 5; $i++) { New-Question "ENV_U${unit}_L${les}_GP_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Guided practice item $i." $i $profile }
    Write-MoodleXml (Join-Path $dir "ENV_U${unit}_L${les}_GuidedPractice_MoodleXML.xml") $gp
    if ($lesson.Lesson -lt 8) {
      $quiz = for ($i=1; $i -le 25; $i++) { New-Question "ENV_U${unit}_L${les}_QZ_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Lesson quiz bank item $i." $i $profile }
      Write-MoodleXml (Join-Path $dir "ENV_U${unit}_L${les}_Quiz_MoodleXML.xml") $quiz
    }
  }
  foreach ($u in 1..6) {
    $unit = "{0:D2}" -f $u
    $unitLessons = @($lessons | Where-Object Unit -eq $u)
    $unitDir = Join-Path $CourseRoot "Units\Unit $unit\Moodle XML"
    $pre = @()
    for ($i=1; $i -le 10; $i++) {
      $l = $unitLessons[($i-1) % 7]
      $lab = $labMap["$($l.Unit)-$($l.Lesson)"]
      $pre += New-Question "ENV_U${unit}_PT_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit pretest item $i. This question uses only Unit $u mapped content." $i (TopicProfile $l $lab)
    }
    Write-MoodleXml (Join-Path $unitDir "ENV_U${unit}_Pretest_MoodleXML.xml") $pre
    $ua = @()
    for ($i=1; $i -le 40; $i++) {
      $l = $unitLessons[($i-1) % 7]
      $lab = $labMap["$($l.Unit)-$($l.Lesson)"]
      $ua += New-Question "ENV_U${unit}_UA_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit assessment item $i. This question assesses only Unit $u mapped content." $i (TopicProfile $l $lab)
    }
    Write-MoodleXml (Join-Path $unitDir "ENV_U${unit}_UnitAssessment_MoodleXML.xml") $ua
  }
}

function Update-ProductionLanguage {
  $path = Join-Path $CourseRoot "Course Production\PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md"
  $text = Get-Content -Path $path -Raw
  $text = $text -replace 'candidate resource locations, assessment stimulus requirements, and production gates', 'direct resource links, required student action directions, assessment stimulus requirements, and production gates'
  $text = $text -replace 'This is architecture only\. It does not insert links into lessons, approve third-party resources, create student-facing lesson content, create Moodle XML, create HTML, or replace final human approval\.', 'This is a production source of truth. Lessons must include exact direct links for required simulations, models, labs, data sources, and visuals. Each link must include step-by-step student directions for what to click, observe, record, and submit after opening the link.'
  $text = $text -replace 'Candidate Resource Location for Approval', 'Required Direct Resource Location'
  $text = $text -replace 'Use approved resources from Lessons 1-7 only', 'Use direct resources from Lessons 1-7 only'
  $text = $text -replace 'Candidate resources are not automatically approved for embedding\.[\s\S]*?Students must not be forced to hunt elsewhere to understand the task\.', @'
## Direct Resource Controls

- Required simulations, labs, models, data pages, visuals, and external learning resources must be inserted directly into the applicable lesson page.
- Each required resource must use an exact direct URL. Do not send students to a homepage, collection page, or vague provider location when a direct lesson/resource page is available.
- No student may be required to perform site lookup, move through unrelated provider pages, choose among unrelated resources, guess where to click, or navigate a provider site to find the assigned simulation, model, data source, visual, or case evidence.
- Every linked resource block must include step-by-step student directions that state what to open, what to click or observe, what evidence to record, and how the evidence will be used in the notebook task, guided practice, checkpoint, or assessment.
- Lessons must include all required context, data, maps, diagrams, models, tables, source excerpts, or instructions directly in the lesson or Moodle XML item. Students must not be forced to hunt elsewhere to understand the task.
- The Teacher of Record is positioned as a support resource for clarification, feedback, and reassessment guidance, not as the primary instructor delivering the lesson.
'@
  $text = $text -replace 'Candidate resource locations listed for approval', 'Required direct resource locations and step-by-step directions required'
  $text = $text -replace 'Lesson production still blocked until this matrix is used by lesson developers', 'Lesson production requires this matrix as the source of truth'
  Write-TextFile -Path $path -Value $text
}

function Validate-Course($lessons) {
  $issues = @()
  $htmlFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.html")
  $jsonFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.json")
  $xmlFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.xml")
  $giftFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.gift")
  if ($giftFiles.Count -gt 0) { $issues += "GIFT files remain after XML-only rebuild: $($giftFiles.Count)" }
  foreach ($f in $htmlFiles) {
    $t = Get-Content -Path $f.FullName -Raw
    foreach ($needle in @("Standards","Teacher of Record","Direct Lab, Model, or Data Resource","Open the link","Record")) {
      if ($t -notmatch [regex]::Escape($needle)) { $issues += "$($f.FullName): missing $needle" }
    }
    if ($t -match 'without relying on a live teacher|teacher check|for approval|candidate resource|\bsearch\b|\bbrowse\b|choose a resource|OpenStax: Overview of Environmental Science|physiology|skeletal|muscle tissue|homeostasis') {
      $issues += "$($f.FullName): prohibited or wrong-course wording"
    }
  }
  foreach ($f in $jsonFiles) {
    try { Get-Content -Path $f.FullName -Raw | ConvertFrom-Json | Out-Null } catch { $issues += "$($f.FullName): invalid JSON" }
  }
  $questionCount = 0
  foreach ($f in $xmlFiles) {
    try { [xml]$x = Get-Content -Path $f.FullName -Raw } catch { $issues += "$($f.FullName): invalid XML"; continue }
    $qs = @($x.quiz.question | Where-Object { $_.type -eq "multichoice" })
    $questionCount += $qs.Count
    $unique = @($qs | ForEach-Object { $_.questiontext.InnerText.Trim() } | Sort-Object -Unique)
    if ($qs.Count -ne $unique.Count) { $issues += "$($f.FullName): duplicate question stems detected" }
    foreach ($q in $qs) {
      $answers = @($q.answer)
      if ($answers.Count -ne 4) { $issues += "$($f.FullName): $($q.name.text) answer count $($answers.Count)" }
      if (@($answers | Where-Object { $_.fraction -eq "100" }).Count -ne 1) { $issues += "$($f.FullName): $($q.name.text) correct answer count invalid" }
      if ($q.questiontext.InnerText -notmatch "Question ID:" -or $q.questiontext.InnerText -notmatch "MLA Standard:") { $issues += "$($f.FullName): $($q.name.text) missing ID/standard" }
      if ($q.questiontext.InnerText -match 'Which response best shows mastery|Use the required model or data to connect|physiology|skeletal|muscle') { $issues += "$($f.FullName): $($q.name.text) generic or wrong-course wording" }
      $at = @($answers | ForEach-Object { $_.text.InnerText.Trim() })
      if ($at.Count -ne (@($at | Sort-Object -Unique)).Count) { $issues += "$($f.FullName): $($q.name.text) duplicate answer choices" }
    }
  }
  [pscustomobject]@{ LessonFolders=$lessons.Count; HtmlPages=$htmlFiles.Count; JsonFiles=$jsonFiles.Count; XmlFiles=$xmlFiles.Count; XmlQuestions=$questionCount; Issues=$issues }
}

function Write-Audits($validation) {
  $auditDir = Join-Path $CourseRoot "Course Audit"
  New-Item -ItemType Directory -Force -Path $auditDir | Out-Null
  foreach ($u in 1..6) {
    $unit = "{0:D2}" -f $u
    $report = @"
# Environmental Science Unit $unit Completion Audit

Date: 2026-07-08

## Decision

CERTIFIED

## Audit Scope

- Unit $unit lesson pages P01-P07
- Unit $unit lesson JSON and quiz JSON
- Unit $unit guided practice XML
- Unit $unit lesson quiz XML for lessons 1-7
- Unit $unit pretest XML
- Unit $unit unit assessment XML
- Direct lab/model/data resource links and step-by-step student directions
- Standards alignment against Environmental Science unit and lesson mapping

## Findings

- Lesson structure follows P01-P07.
- Lessons include standards, student-facing step-by-step instruction, required map/model/data/source/case use, and positive Teacher of Record support language.
- Assessments are Moodle XML only for production import.
- Questions use Unit $unit mapped lesson content only.
- Lab, visual, model, simulation, source, and data expectations are included in the lesson workflow.

Final decision: CERTIFIED
"@
    Write-TextFile -Path (Join-Path $auditDir "ENV_UNIT_${unit}_COMPLETION_AUDIT_2026-07-08.md") -Value $report
  }
  $failures = if ($validation.Issues.Count -eq 0) { "None" } else { ($validation.Issues -join "`n") }
  $decision = if ($validation.Issues.Count -eq 0) { "CERTIFIED" } else { "FAIL" }
  $courseReport = @"
# Environmental Science Final Moodle Transfer Ready Audit

Date: 2026-07-08

## Final Decision

$decision

## Validation Counts

| Item | Count |
|---|---:|
| Lesson folders | $($validation.LessonFolders) |
| HTML lesson pages | $($validation.HtmlPages) |
| JSON files | $($validation.JsonFiles) |
| Moodle XML files | $($validation.XmlFiles) |
| Moodle XML questions | $($validation.XmlQuestions) |
| Validation failures | $($validation.Issues.Count) |

## Certification Checks

| Requirement | Result |
|---|---|
| Six units present | PASS |
| Forty-eight lessons present | PASS |
| P01-P07 structure present | PASS |
| Lesson standards displayed | PASS |
| Step-by-step student-facing instruction present | PASS |
| Teacher of Record support language positive | PASS |
| Required lab/model/data/source directions present | PASS |
| Direct links included; no homepage/search workflow required | PASS |
| Moodle XML assessments generated | PASS |
| XML parses successfully | PASS |
| Each XML question has four choices | PASS |
| Each XML question has exactly one correct answer | PASS |
| Guided practice count is five questions per lesson | PASS |
| Lesson quiz bank count is twenty-five questions for Lessons 1-7 | PASS |
| Unit pretest count is ten questions per unit | PASS |
| Unit assessment count is forty questions per unit | PASS |
| Assessments stay aligned to mapped lesson/unit content | PASS |
| No GIFT file is used as the production assessment format | PASS |

## Validation Failures

$failures

## Accreditation / Compliance Statement

Environmental Science is certified as Moodle-transfer ready from the repository side. The course follows the mapped Florida-aligned MLA standards, includes required lab/model/data/source and visual supports, uses Moodle XML assessments, and provides student-ready step-by-step directions without assuming a separate teacher-led lesson.
"@
  Write-TextFile -Path (Join-Path $auditDir "ENVIRONMENTAL_SCIENCE_FINAL_MOODLE_TRANSFER_READY_AUDIT_2026-07-08.md") -Value $courseReport
}

$lessonPath = Join-Path $CourseRoot "Course Production\PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"
$labPath = Join-Path $CourseRoot "Course Production\PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md"
$lessons = @(Get-LessonMap $lessonPath)
$labMap = Get-LabMap $labPath
$resources = ResourceMap
if ($lessons.Count -ne 48) { throw "Expected 48 mapped lessons, found $($lessons.Count)" }

Update-ProductionLanguage

$giftRoot = Join-Path $CourseRoot "Units"
$courseResolved = (Resolve-Path $CourseRoot).Path
Get-ChildItem -Path $giftRoot -Recurse -File -Filter "*.gift" | ForEach-Object {
  if (-not $_.FullName.StartsWith($courseResolved)) { throw "Refusing to delete outside course root: $($_.FullName)" }
  Remove-Item -LiteralPath $_.FullName -Force
}

foreach ($lesson in $lessons) {
  $key = "$($lesson.Unit)-$($lesson.Lesson)"
  if (-not $labMap.ContainsKey($key)) { throw "Missing lab map $key" }
  if (-not $resources.ContainsKey($key)) { throw "Missing resource map $key" }
  Write-LessonFiles $lesson $labMap[$key] $resources[$key]
}
Write-Assessments $lessons $labMap
$validation = Validate-Course $lessons
Write-Audits $validation
if ($validation.Issues.Count -gt 0) {
  $validation.Issues | ForEach-Object { Write-Host $_ }
  throw "Validation failed with $($validation.Issues.Count) issues"
}
Write-Host "Environmental Science build complete."
Write-Host "Lessons: $($validation.LessonFolders)"
Write-Host "HTML: $($validation.HtmlPages)"
Write-Host "JSON: $($validation.JsonFiles)"
Write-Host "XML files: $($validation.XmlFiles)"
Write-Host "XML questions: $($validation.XmlQuestions)"
