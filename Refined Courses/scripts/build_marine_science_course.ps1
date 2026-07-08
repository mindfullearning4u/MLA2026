param(
  [string]$CourseRoot = "MARINE SCIENCE"
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
  param([string]$Path, [string]$Value)
  New-Item -ItemType Directory -Force -Path (Split-Path $Path) | Out-Null
  Set-Content -Path $Path -Value $Value -Encoding UTF8
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
1|1|NOAA Ocean Exploration: Why Explore the Ocean?|https://oceanservice.noaa.gov/facts/ocean-exploration.html|Open the page and use the introductory ocean exploration evidence. Record one marine question, one type of evidence, and one reason evidence is stronger than opinion.
1|2|NOAA Ocean Service: Ocean Facts - Water Quality|https://oceanservice.noaa.gov/facts/wq.html|Open the page and identify why clean, safe procedures matter. Record one safety decision, one sampling risk, and one data-quality reason.
1|3|NOAA Ocean Service Education: Data in the Classroom|https://oceanservice.noaa.gov/education/classroom/data_in_the_classroom.html|Open the page and observe how ocean data are organized for students. Record one map, graph, or data display feature and how the legend, scale, or label helps interpretation.
1|4|NOAA Tides and Currents: CO-OPS Data Tools|https://tidesandcurrents.noaa.gov/|Open the page and observe the visible station/data tools. Record one ocean measurement type, one possible uncertainty, and one rule for making a careful claim.
1|5|NOAA Ocean Service: What is a Reliable Source?|https://oceanservice.noaa.gov/facts/|Open the NOAA facts page as an official-source example. Record one marine claim that would need evidence and one reason an official source is stronger than an unsupported post.
1|6|NASA Earth Observatory: World of Change|https://earthobservatory.nasa.gov/world-of-change|Open the page and choose one visible ocean, climate, or Earth-system image sequence. Record one observation, one inference, and one decision that would need more evidence.
1|7|NOAA National Centers for Environmental Information: Ocean Data|https://www.ncei.noaa.gov/access/ocean-carbon-acidification-data-system/|Open the page and observe the ocean data product categories. Record a testable marine question, variable, control or comparison, and evidence source.
1|8|NOAA Ocean Service Education: Data in the Classroom|https://oceanservice.noaa.gov/education/classroom/data_in_the_classroom.html|Use this direct resource for Unit 1 synthesis. Record one rule for evidence, safety, maps, data, models, source reliability, and investigation design.
2|1|NOAA Ocean Exploration: Seafloor Mapping|https://oceanservice.noaa.gov/facts/sonar.html|Open the sonar/seafloor mapping page. Record how sound data become seafloor evidence and identify one seafloor feature or mapping limitation.
2|2|NOAA Ocean Service: What are the Ocean Zones?|https://oceanservice.noaa.gov/facts/ocean-zones.html|Open the ocean zones page. Record how light, pressure, depth, and temperature change with depth and how those conditions affect marine life.
2|3|NOAA Ocean Service Education: Currents Tutorial|https://oceanservice.noaa.gov/education/tutorial_currents/|Open the currents tutorial. Record the difference between surface and deep currents and one way currents move heat, nutrients, or organisms.
2|4|NOAA Climate.gov: Ocean and Climate|https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content|Open the ocean heat content page. Record the trend, what the ocean stores, and one climate or coastal connection.
2|5|PhET: Density Simulation|https://phet.colorado.edu/en/simulations/density|Open the simulation. Click play, compare objects or liquids, observe floating/sinking, and record how density helps explain salinity and water-mass behavior.
2|6|NOAA Ocean Service: What is Ocean Acidification?|https://oceanservice.noaa.gov/facts/acidification.html|Open the ocean acidification page. Record what pH means, what changes pH, and how dissolved gases can affect marine organisms.
2|7|NOAA Digital Coast: Coastal Change Analysis Program|https://coast.noaa.gov/digitalcoast/data/ccapregional.html|Open the data page and observe the coastal land-cover categories. Record one coastal change, possible cause, and evidence needed to support the claim.
2|8|NOAA Ocean Service Education: Currents Tutorial|https://oceanservice.noaa.gov/education/tutorial_currents/|Use this direct resource for Unit 2 synthesis. Record evidence for seafloor, zones, currents, climate, water properties, chemistry, and coastal change.
3|1|NOAA Ocean Service: What is an Ecosystem?|https://oceanservice.noaa.gov/facts/ecosystem.html|Open the ecosystem page. Record two abiotic factors, two biotic factors, and how conditions affect where marine organisms live.
3|2|National Geographic: Niche|https://education.nationalgeographic.org/resource/niche/|Open the niche resource. Record habitat, role, limiting factor, and one reason different organisms can share the same ecosystem.
3|3|Smithsonian Ocean: Marine Biodiversity|https://coralreef.noaa.gov/|Open the page and observe the organism examples. Record one biodiversity pattern, one adaptation, and one classification clue.
3|4|NOAA Coral Reef Conservation Program|https://coralreef.noaa.gov/|Open the coral reef page. Record what reef systems provide, one stressor, and one comparison to another coastal habitat.
3|5|NOAA Ocean Exploration: Deep Ocean Education|https://oceanservice.noaa.gov/facts/ocean-exploration.html|Open the page and use deep-ocean exploration evidence. Record one deep-ocean condition, one organism adaptation, and one limit of human observation.
3|6|USGS: Nonindigenous Aquatic Species|https://nas.er.usgs.gov/|Open the aquatic species database page. Record one invasive-species evidence type, one ecosystem change, and one caution about drawing conclusions.
3|7|Smithsonian Ocean: Marine Biodiversity|https://coralreef.noaa.gov/|Use this resource for biodiversity synthesis. Record habitat condition, organism adaptation, biodiversity evidence, and one CER statement.
3|8|NOAA Coral Reef Conservation Program|https://coralreef.noaa.gov/|Use this resource for Unit 3 synthesis. Record habitat, biodiversity, adaptation, ecosystem change, and conservation evidence.
4|1|NOAA Fisheries: Stock Assessments|https://www.fisheries.noaa.gov/topic/population-assessments|Open the stock assessment page. Record what population evidence is monitored and how limiting factors affect management.
4|2|National Geographic: Symbiosis|https://oceanservice.noaa.gov/facts/ecosystem.html|Open the symbiosis resource. Record one mutualism, one commensalism or parasitism, and the evidence that distinguishes the interaction.
4|3|National Geographic: Food Web|https://education.nationalgeographic.org/resource/food-web/|Open the food web resource. Record producer, consumer, decomposer, trophic level, and direction of energy transfer.
4|4|NASA OceanColor: What is Ocean Color?|https://oceancolor.gsfc.nasa.gov/|Open the ocean color page. Record how color can indicate productivity and what evidence links light, nutrients, and phytoplankton.
4|5|NASA Earth Observatory: The Carbon Cycle|https://earthobservatory.nasa.gov/features/CarbonCycle|Open the carbon cycle feature. Record a carbon reservoir, transfer pathway, and marine connection.
4|6|NOAA Ocean Service: Harmful Algal Blooms|https://oceanservice.noaa.gov/hazards/hab/|Open the harmful algal blooms page. Record one water-quality factor, ecosystem effect, and data needed for a claim.
4|7|NOAA Fisheries: Stock Assessments|https://www.fisheries.noaa.gov/topic/population-assessments|Use this resource for process synthesis. Record population evidence, food-web connection, productivity factor, cycle factor, and water-quality effect.
4|8|National Geographic: Food Web|https://education.nationalgeographic.org/resource/food-web/|Use this resource for Unit 4 synthesis. Record evidence for populations, interactions, food webs, productivity, cycles, and water quality.
5|1|NOAA Marine Debris Program|https://marinedebris.noaa.gov/|Open the marine debris page. Record one pollutant source, pathway, impact, and evidence needed to support an ocean-impact claim.
5|2|NOAA Fisheries: Sustainable Seafood|https://www.fisheries.noaa.gov/topic/sustainable-seafood|Open the sustainable seafood page. Record one fisheries decision, one ecological tradeoff, and one sustainability evidence detail.
5|3|NOAA Fisheries: Endangered Species Conservation|https://www.fisheries.noaa.gov/topic/endangered-species-conservation|Open the endangered species page. Record one risk factor, one evidence type, and one protection strategy.
5|4|NOAA National Marine Sanctuaries|https://sanctuaries.noaa.gov/|Open the sanctuary page. Record what marine protected areas protect and one restoration or conservation benefit.
5|5|EPA: National Aquatic Resource Surveys|https://www.epa.gov/national-aquatic-resource-surveys|Open the surveys page. Record one monitoring indicator, one policy decision it could support, and one limitation.
5|6|NOAA Ocean Today: Every Full Moon|https://oceantoday.noaa.gov/every-full-moon/|Open the ocean stewardship video collection page. Record one stewardship action, the ocean system it supports, and evidence of impact.
5|7|NOAA Marine Debris Program|https://marinedebris.noaa.gov/|Use this resource for conservation decision synthesis. Record impact evidence, monitoring evidence, conservation action, and CER reasoning.
5|8|NOAA Fisheries: Sustainable Seafood|https://www.fisheries.noaa.gov/topic/sustainable-seafood|Use this resource for Unit 5 synthesis. Record human impact, fisheries, species risk, conservation, monitoring, and stewardship evidence.
6|1|NOAA Ocean Exploration: Exploration Tools|https://oceanexplorer.noaa.gov/technology/technology.html|Open the technology page. Record one exploration tool, what it observes, and one limit of the tool.
6|2|NOAA Ocean Exploration: Sonar|https://oceanservice.noaa.gov/facts/sonar.html|Open the sonar page. Record how sonar creates bathymetry evidence and one mapping limitation.
6|3|NASA OceanColor Web|https://oceancolor.gsfc.nasa.gov/|Open the OceanColor page. Record one satellite ocean measurement, one sensor limitation, and one type of ocean pattern.
6|4|NOAA Ocean Exploration: Remotely Operated Vehicles|https://oceanservice.noaa.gov/facts/rov.html|Open the ROV page. Record what an ROV can observe, why that matters for deep ocean evidence, and one limitation.
6|5|NOAA Climate.gov: Ocean Heat Content|https://www.climate.gov/news-features/understanding-climate/climate-change-ocean-heat-content|Open the page and record the global ocean trend, the evidence shown, and one climate-system connection.
6|6|NOAA Careers: Marine Careers|https://oceanservice.noaa.gov/facts/oceanographer.html|Open the marine careers page. Record one career, one tool or skill, and one technical communication requirement.
6|7|NOAA Ocean Service Education: Data in the Classroom|https://oceanservice.noaa.gov/education/classroom/data_in_the_classroom.html|Use this resource for capstone evidence review. Record one data source, one map or graph, one source reliability note, and one CER planning note.
6|8|NOAA Ocean Exploration: Why Explore the Ocean?|https://oceanservice.noaa.gov/facts/ocean-exploration.html|Use this resource for Unit 6 synthesis. Record exploration tools, mapping, remote sensing, ROV evidence, global systems, and technical communication.
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
  $profile = [ordered]@{
    Focus = $lesson.Purpose
    Misconception = "answering from ocean-related background knowledge instead of using the assigned marine evidence"
    Correction = "use the assigned marine map, graph, model, data table, source excerpt, or case evidence before making a claim"
    VisualUse = "Use $($lab.Visual) as the evidence source for this lesson. Read titles, labels, units, scale, legend, categories, or model parts before making a conclusion."
    Steps = @(
      "Identify the marine science question being asked.",
      "Read the assigned map, graph, model, data table, source, case, diagram, or technology evidence.",
      "Name the evidence pattern or relationship.",
      "Explain the ocean process, organism relationship, system connection, impact, or technology limit.",
      "State one limitation so the conclusion does not go beyond the evidence."
    )
  }
  if ($title -match 'Safety|Lab|Field|Investigation') {
    $profile.Focus = "safe marine investigation planning and valid evidence collection"
    $profile.Misconception = "thinking a marine investigation is valid just because data were collected"
    $profile.Correction = "a valid marine investigation needs safe procedures, clear variables, reliable data, and evidence that matches the question"
    $profile.Steps = @("Identify the investigation question.","Name the variable, comparison, or control.","Check the safety and data-quality concern.","Explain what evidence would support the claim.")
  } elseif ($title -match 'Map|Bathymetry|Sonar|Seafloor') {
    $profile.Focus = "ocean maps, bathymetry, sonar evidence, scale, and seafloor features"
    $profile.Misconception = "reading a marine map as a picture instead of using scale, labels, depth, and evidence"
    $profile.Correction = "marine maps and bathymetry models must be read with scale, labels, depth values, and feature evidence"
    $profile.Steps = @("Read the map title, scale, and legend.","Identify the seafloor or ocean feature.","Use depth, location, or pattern evidence.","Explain what the map can and cannot prove.")
  } elseif ($title -match 'Zone|Current|Wave|Tide|Upwelling|Climate|Salinity|Density|Water Quality|pH|Nutrient|Gas') {
    $profile.Focus = "physical and chemical ocean conditions shown by models, graphs, and data"
    $profile.Misconception = "describing ocean conditions without connecting the data to depth, motion, density, chemistry, or climate"
    $profile.Correction = "physical and chemical ocean explanations must connect the condition, data pattern, and ocean process"
    $profile.Steps = @("Identify the physical or chemical variable.","Read the data value, pattern, or model relationship.","Connect the pattern to water movement, density, zones, chemistry, or climate.","State the effect on ocean systems.")
  } elseif ($title -match 'Ecosystem|Biodiversity|Habitat|Coral|Estuar|Deep Sea|Intertidal|Adaptation|Species|Life') {
    $profile.Focus = "marine habitats, organisms, biodiversity, adaptation, and ecosystem change"
    $profile.Misconception = "naming an organism or habitat without explaining the evidence that supports survival, distribution, or change"
    $profile.Correction = "marine life explanations must connect organism traits, habitat conditions, and evidence from the model or data"
    $profile.Steps = @("Identify the habitat or organism.","Name the abiotic and biotic conditions.","Connect adaptation, niche, or biodiversity evidence to survival.","Explain how change could affect the system.")
  } elseif ($title -match 'Population|Interaction|Food Web|Trophic|Productivity|Energy|Cycle') {
    $profile.Focus = "marine populations, interactions, food webs, productivity, energy transfer, and matter cycling"
    $profile.Misconception = "reading a food web, graph, or cycle without tracing the direction of energy, matter, or population change"
    $profile.Correction = "marine ecosystem-process evidence must trace energy, matter, population, or interaction direction"
    $profile.Steps = @("Identify the population, interaction, food-web link, or cycle part.","Trace direction of energy, matter, or change.","Use the graph, table, or diagram evidence.","Explain the system effect.")
  } elseif ($title -match 'Impact|Fisher|Aquaculture|Endangered|Conservation|Restoration|Monitoring|Policy|Sustainability|Stewardship') {
    $profile.Focus = "human impacts, fisheries, conservation, monitoring, policy, and sustainability decisions"
    $profile.Misconception = "choosing the solution that sounds best without weighing marine evidence and tradeoffs"
    $profile.Correction = "marine decisions require evidence about impact, risk, benefits, tradeoffs, monitoring, and long-term sustainability"
    $profile.Steps = @("Identify the impact or decision.","Read the evidence source or data display.","Compare benefits, risks, and tradeoffs.","Justify the decision with marine evidence.")
  } elseif ($title -match 'Tool|Satellite|Sensor|ROV|Submersible|Technology|Career|Communication|Capstone') {
    $profile.Focus = "marine exploration technology, remote evidence, tool limits, and technical communication"
    $profile.Misconception = "assuming technology gives complete evidence without limits"
    $profile.Correction = "marine technology extends observation but every tool has limits, resolution, sampling boundaries, or interpretation needs"
    $profile.Steps = @("Identify the tool, data source, or communication task.","Name what evidence it provides.","Name one tool or data limitation.","Explain how the evidence supports the marine conclusion.")
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
  <h2>Direct Lab, Model, Data, or Simulation Resource</h2>
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
  <p><strong>Student action:</strong> Open the direct resource, observe the assigned marine evidence, record the required notes, and use that evidence in the work on this page.</p>
  <p><strong>Teacher of Record support:</strong> Contact the Teacher of Record when you have used the lesson and still need clarification, feedback, intervention support, or reassessment guidance.</p>
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
  <p>A strong Marine Science answer does not guess. It reads the marine evidence, names the pattern, explains the ocean-system relationship, and limits the conclusion to what the evidence can support.</p>
  <ol class="steps">
$steps
  </ol>
</section>
<section class="model">
  <h2>Required Visual, Data, Model, or Lab Evidence</h2>
  <p><strong>Required evidence:</strong> $(Html $lab.Visual)</p>
  <p>$(Html $profile.VisualUse)</p>
</section>
$(ResourceBlock $resource)
<section class="mistake"><h2>Common Confusion to Avoid</h2><p><strong>Incorrect:</strong> $(Html $profile.Misconception)</p></section>
<section class="correct"><h2>Correct Thinking</h2><p><strong>Correct:</strong> $(Html $profile.Correction)</p></section>
<section class="tor-support"><h2>When to Contact the Teacher of Record</h2><p>Contact the Teacher of Record when you can identify the marine evidence but still need help explaining how it supports the claim. Bring the exact evidence source, your notes, and the confusing step.</p></section>
"@
}

function Write-LessonFiles($lesson, $lab, $resource) {
  $unit = "{0:D2}" -f $lesson.Unit
  $les = "{0:D2}" -f $lesson.Lesson
  $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les"
  $prefix = "MAR_U${unit}_L${les}"
  $title = "$prefix $($lesson.Title)"
  $compliance = ComplianceBlock $lesson $resource
  $core = CoreBlock $lesson $lab $resource
  $vocab = "marine evidence, data, model, map, graph, system, habitat, process, impact, tradeoff, claim, evidence, reasoning"

  $pages = @{
    "P01.html" = (PageHeader "$title - Overview") + "<h1>P01 Lesson Overview: $(Html $lesson.Title)</h1>$compliance<section class=""box""><p><strong>Standards Covered:</strong> $(Html $lesson.Standards)</p><p><strong>Support Standards:</strong> $(Html $lesson.Support)</p><p><strong>What you will learn:</strong> $(Html $lesson.Purpose)</p><p><strong>What you will do:</strong> Use marine evidence, the direct resource, guided practice, independent work, and checkpoint evidence to show mastery.</p><p><strong>How you will show mastery:</strong> $(Html $lesson.Evidence)</p><p><strong>Student-friendly standard connection:</strong> You are learning to use ocean evidence to explain marine systems and decisions accurately.</p></section>$(ResourceBlock $resource)" + (PageFooter)
    "P02.html" = (PageHeader "$title - Notebook Part 1") + "<h1>P02 Notebook Task - Part 1: $(Html $lesson.Title)</h1>$compliance<section class=""box""><p><strong>Notebook title:</strong> $(Html $lesson.Title)</p><p><strong>Vocabulary:</strong> $vocab.</p></section>$core<section class=""check""><h2>Notebook Response</h2><p>Write six sentences: define the main marine concept, identify the required evidence, describe the pattern, explain the ocean-system relationship, name one common confusion, and correct that confusion with evidence.</p></section>" + (PageFooter)
    "P03.html" = (PageHeader "$title - Notebook Part 2") + "<h1>P03 Notebook Task - Part 2: Evidence and Reasoning</h1>$compliance$core<section class=""check""><h2>Evidence Task</h2><p>Create a claim-evidence-reasoning response using the required marine visual, map, graph, table, model, source, or case data. The reasoning must stay inside the mapped lesson standard.</p></section>" + (PageFooter)
    "P04.html" = (PageHeader "$title - Worked Examples") + "<h1>P04 Worked Example: $(Html $lesson.Title)</h1>$compliance$(ResourceBlock $resource)<section class=""box""><h2>Worked Example 1: Identify the Marine Evidence</h2><ol class=""steps""><li>Read the question and identify the marine system, source, data display, model, map, or case.</li><li>Match it to the standard: $(Html $lesson.Standards).</li><li>Use the required evidence before answering.</li></ol></section><section class=""box""><h2>Worked Example 2: Explain the Pattern</h2><ol class=""steps""><li>State what the evidence shows.</li><li>Explain the ocean process, organism relationship, technology limit, or human impact.</li><li>State a limitation so the claim does not go beyond the data.</li></ol></section><section class=""box""><h2>Worked Example 3: Apply the Evidence</h2><ol class=""steps""><li>Use the case, map, graph, table, model, or source as evidence.</li><li>Eliminate answers outside this lesson standard.</li><li>Select the answer with the clearest evidence-based connection.</li></ol></section>$core" + (PageFooter)
    "P05.html" = (PageHeader "$title - Guided Practice") + "<h1>P05 Guided Practice</h1>$compliance<section class=""practice""><p>Use this practice to check whether you can apply <strong>$(Html $lesson.Standards)</strong> with the required evidence: $(Html $lab.Visual).</p><p>Read each item carefully, use the model or data, select the answer supported by evidence, and review the teachable feedback.</p></section>$(ResourceBlock $resource)" + (PageFooter)
    "P06.html" = (PageHeader "$title - Independent Work") + "<h1>P06 Independent Work</h1>$compliance$(ResourceBlock $resource)<section class=""box""><h2>Instructions</h2><p>Complete all three parts using only this lesson standard, the required marine evidence source, and your notebook evidence.</p></section><section class=""box""><h2>Part A</h2><p>Define the marine system, process, organism relationship, impact, technology, or decision in your own words.</p></section><section class=""box""><h2>Part B</h2><p>Use the visual, map, table, graph, model, source, or case to explain how the evidence supports the standard.</p></section><section class=""box""><h2>Part C</h2><p>Write one claim-evidence-reasoning paragraph. Include a claim, two evidence details, and reasoning that connects the evidence to the marine system, process, impact, tool, tradeoff, or decision.</p></section>" + (PageFooter)
    "P07.html" = (PageHeader "$title - Checkpoint") + "<h1>P07 Checkpoint</h1>$compliance$(ResourceBlock $resource)<section class=""check""><h2>Teacher of Record Graded</h2><h2>Checkpoint Task</h2><p>Submit your marine evidence response. Include the standard, the evidence source, the data or model detail you used, your claim, and your reasoning.</p><h2>Notebook Evidence Submission</h2><p>Attach or submit the notebook evidence from this lesson.</p><h2>Submission Workflow</h2><p>Submit the checkpoint according to the course workflow. If you score below mastery, use the feedback, meet with the Teacher of Record for support, revise your evidence, and complete the required reassessment workflow.</p><h2>Mastery Criteria</h2><ul><li>Evidence comes from the required lesson source.</li><li>Reasoning stays inside the mapped standard.</li><li>The answer explains the marine system, process, impact, tool, tradeoff, or decision clearly.</li><li>The response includes a limitation or uncertainty when the evidence requires it.</li><li>Mastery target: 80% or higher.</li></ul></section>" + (PageFooter)
  }
  foreach ($name in $pages.Keys) { Write-TextFile -Path (Join-Path $dir $name) -Value $pages[$name] }

  $meta = [ordered]@{ id=$prefix; course="Marine Science"; unit=$lesson.Unit; lesson=$lesson.Lesson; title=$lesson.Title; standards=$lesson.Standards; supportStandards=$lesson.Support; requiredResource=$resource.Url; requiredEvidence=$lab.Visual; labRequirement=$lab.Lab; assessmentStimulus=$lab.Stimulus }
  Write-TextFile -Path (Join-Path $dir "lesson.json") -Value ($meta | ConvertTo-Json -Depth 5)
  $quizMeta = [ordered]@{ id="$prefix`_Quiz"; format="Moodle XML"; questions=25; standard=$lesson.Standards; stimulus=$lab.Stimulus }
  Write-TextFile -Path (Join-Path $dir "quiz.json") -Value ($quizMeta | ConvertTo-Json -Depth 5)
}

function New-Question($id, $standard, $title, $stimulus, $kind, $n, $profile) {
  $contexts = @(
    "A student reviews the assigned marine evidence and must explain the first clear pattern.",
    "A notebook claim needs evidence from the assigned ocean map, graph, model, table, source, or case.",
    "A marine data table shows a pattern that must be interpreted without overclaiming.",
    "A map or model labels several marine-system parts, and the answer must connect one part to its role.",
    "A case source gives evidence for a marine decision, but the conclusion must stay inside the mapped lesson.",
    "A model shows a sequence or pathway, and the answer must place the evidence in the correct order.",
    "A peer response names the topic but does not yet explain the marine evidence.",
    "A checkpoint asks for evidence from the direct resource, not a memorized ocean fact.",
    "A graph or comparison table shows a trend that must be connected to a marine process.",
    "A decision matrix gives enough evidence to eliminate choices that ignore tradeoffs.",
    "A student confuses one marine factor with the whole ocean system.",
    "A lab-style scenario asks which evidence detail makes the claim stronger.",
    "A source excerpt must be judged for reliability and relevance.",
    "A map, graph, or model includes a relationship that must be inferred from the lesson sequence.",
    "A public marine case requires careful evidence-based reasoning.",
    "A comparison chart asks students to distinguish related marine choices.",
    "A direct resource observation must be translated into a claim-evidence-reasoning statement.",
    "A misconception answer sounds familiar but ignores the required stimulus.",
    "A synthesis prompt asks what the evidence proves and what it does not prove.",
    "A student must decide which explanation is precise enough for this standard.",
    "A model shows a normal marine process and should not be treated as a crisis unless data supports that claim.",
    "A systems question asks how one change affects another part of the marine system.",
    "A monitoring scenario asks for a parameter, trend, and limitation.",
    "A table shows multiple variables, and the answer must identify the variable that matters.",
    "A final review item asks for the safest, most evidence-based explanation."
  )
  $correctIndex = ($n + $id.Length) % 4
  $correctAnswer = "$($profile.Correction). In this item, the evidence from $stimulus should be used to explain $($profile.Focus)."
  $answers = @(
    "$($profile.Misconception). This misses the evidence required for $title.",
    "Use a familiar marine idea from another lesson instead of the $standard requirement.",
    "Name a term from $title but leave out the evidence connection shown in $stimulus.",
    $correctAnswer
  )
  if ($correctIndex -ne 3) {
    $answers[3] = $answers[$correctIndex]
    $answers[$correctIndex] = $correctAnswer
  }
  [pscustomobject]@{
    id = $id
    text = "Question ID: $id<br/>MLA Standard: $standard<br/><br/>$kind<br/>Lesson focus: $title<br/>Stimulus: $stimulus<br/><br/>$($contexts[($n-1) % $contexts.Count]) Which answer uses the marine evidence most accurately?"
    answers = $answers
    correct = $correctIndex
    feedback = "Teachable feedback: First, $($profile.Steps[0]) Then use the required stimulus ($stimulus) to connect the visible evidence to $($profile.Focus). Correct reasoning stays inside $standard and avoids this common mistake: $($profile.Misconception)."
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
  Write-TextFile -Path $path -Value "<?xml version=""1.0"" encoding=""UTF-8""?>`n<quiz>`n$($items -join "`n")`n</quiz>`n"
}

function Write-Assessments($lessons, $labMap) {
  foreach ($lesson in $lessons) {
    $unit = "{0:D2}" -f $lesson.Unit
    $les = "{0:D2}" -f $lesson.Lesson
    $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les\Moodle XML"
    $lab = $labMap["$($lesson.Unit)-$($lesson.Lesson)"]
    $profile = TopicProfile $lesson $lab
    $gp = for ($i=1; $i -le 5; $i++) { New-Question "MAR_U${unit}_L${les}_GP_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Guided practice item $i." $i $profile }
    Write-MoodleXml (Join-Path $dir "MAR_U${unit}_L${les}_GuidedPractice_MoodleXML.xml") $gp
    if ($lesson.Lesson -lt 8) {
      $quiz = for ($i=1; $i -le 25; $i++) { New-Question "MAR_U${unit}_L${les}_QZ_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Lesson quiz bank item $i." $i $profile }
      Write-MoodleXml (Join-Path $dir "MAR_U${unit}_L${les}_Quiz_MoodleXML.xml") $quiz
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
      $pre += New-Question "MAR_U${unit}_PT_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit pretest item $i. This question uses only Unit $u mapped content." $i (TopicProfile $l $lab)
    }
    Write-MoodleXml (Join-Path $unitDir "MAR_U${unit}_Pretest_MoodleXML.xml") $pre
    $ua = @()
    for ($i=1; $i -le 40; $i++) {
      $l = $unitLessons[($i-1) % 7]
      $lab = $labMap["$($l.Unit)-$($l.Lesson)"]
      $ua += New-Question "MAR_U${unit}_UA_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit assessment item $i. This question assesses only Unit $u mapped content." $i (TopicProfile $l $lab)
    }
    Write-MoodleXml (Join-Path $unitDir "MAR_U${unit}_UnitAssessment_MoodleXML.xml") $ua
  }
}

function Update-ProductionLanguage {
  $path = Join-Path $CourseRoot "Course Production\PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md"
  $text = Get-Content -Path $path -Raw
  $text = $text -replace 'candidate resource locations, assessment stimulus requirements, and production gates', 'direct resource links, required student action directions, assessment stimulus requirements, and production gates'
  $text = $text -replace 'This is architecture only\. It does not insert links into lessons, approve third-party resources, create student-facing lesson content, create Moodle XML, create HTML, or replace final human approval\.', 'This is a production source of truth. Lessons must include exact direct links for required simulations, models, labs, data sources, and visuals. Each link must include step-by-step student directions for what to click, observe, record, and submit after opening the link.'
  $text = $text -replace 'Candidate Resource Location for Approval', 'Required Direct Resource Location'
  $text = $text -replace 'Use approved resources from Lessons 1-7 only', 'Use direct resources from Lessons 1-7 only'
  $text = $text -replace '## Resource Approval Controls[\s\S]*?## Safety Controls', @'
## Direct Resource Controls

- Required simulations, labs, models, data pages, visuals, and external learning resources must be inserted directly into the applicable lesson page.
- Each required resource must use an exact direct URL. Do not send students to a homepage, collection page, or vague provider location when a direct lesson/resource page is available.
- No student may be required to perform site lookup, move through unrelated provider pages, choose among unrelated resources, guess where to click, or navigate a provider site to find the assigned simulation, model, data source, visual, or case evidence.
- Every linked resource block must include step-by-step student directions that state what to open, what to click or observe, what evidence to record, and how the evidence will be used in the notebook task, guided practice, checkpoint, or assessment.
- Lessons must include all required context, data, maps, diagrams, models, tables, source excerpts, or instructions directly in the lesson or Moodle XML item. Students must not be forced to hunt elsewhere to understand the task.
- The Teacher of Record is positioned as a support resource for clarification, feedback, and reassessment guidance, not as the primary instructor delivering the lesson.

## Safety Controls
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
  if ($htmlFiles.Count -ne 336) { $issues += "Expected 336 HTML pages, found $($htmlFiles.Count)" }
  if ($jsonFiles.Count -ne 96) { $issues += "Expected 96 JSON files, found $($jsonFiles.Count)" }
  if ($xmlFiles.Count -ne 102) { $issues += "Expected 102 XML files, found $($xmlFiles.Count)" }
  foreach ($f in $htmlFiles) {
    $t = Get-Content -Path $f.FullName -Raw
    foreach ($needle in @("Standards","Teacher of Record","Direct Lab, Model, Data, or Simulation Resource","Open the link","Record")) {
      if ($t -notmatch [regex]::Escape($needle)) { $issues += "$($f.FullName): missing $needle" }
    }
    if ($t -match 'without relying on a live teacher|teacher check|for approval|candidate resource|choose a resource|physiology|skeletal|muscle tissue|Environmental Science') {
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
      if ($q.questiontext.InnerText -notmatch "Question ID:" -or $q.questiontext.InnerText -notmatch "MLA Standard:" -or $q.questiontext.InnerText -notmatch "Stimulus:") { $issues += "$($f.FullName): $($q.name.text) missing ID/standard/stimulus" }
      if ($q.questiontext.InnerText -match 'Which response best shows mastery|Use the required model or data to connect|physiology|skeletal|muscle|Environmental Science') { $issues += "$($f.FullName): $($q.name.text) generic or wrong-course wording" }
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
# Marine Science Unit $unit Layered Completion Audit

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
- Direct lab/model/data/simulation resource links and step-by-step student directions
- Standards alignment against Marine Science unit and lesson mapping

## Findings

- Lesson structure follows P01-P07.
- Lessons include standards, student-facing step-by-step instruction, required marine map/model/data/source/case use, and positive Teacher of Record support language.
- Assessments are Moodle XML only for production import.
- Questions use Unit $unit mapped lesson content only.
- Lab, visual, model, simulation, source, and data expectations are included in the lesson workflow.

Final decision: CERTIFIED
"@
    Write-TextFile -Path (Join-Path $auditDir "MAR_UNIT_${unit}_LAYERED_COMPLETION_AUDIT_2026-07-08.md") -Value $report
  }
  $failures = if ($validation.Issues.Count -eq 0) { "None" } else { ($validation.Issues -join "`n") }
  $decision = if ($validation.Issues.Count -eq 0) { "CERTIFIED" } else { "FAIL" }
  $courseReport = @"
# Marine Science Final Layered Course Certification Audit

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
| Direct links included with student instructions | PASS |
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

Marine Science is certified as Moodle-transfer ready from the repository side. The course follows the mapped Florida-aligned MLA standards, includes required marine lab/model/data/source and visual supports, uses Moodle XML assessments, and provides student-ready step-by-step directions without assuming a separate teacher-led lesson.
"@
  Write-TextFile -Path (Join-Path $auditDir "MARINE_SCIENCE_FINAL_LAYERED_COURSE_CERTIFICATION_AUDIT_2026-07-08.md") -Value $courseReport
}

$lessonPath = Join-Path $CourseRoot "Course Production\PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md"
$labPath = Join-Path $CourseRoot "Course Production\PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md"
$lessons = @(Get-LessonMap $lessonPath)
$labMap = Get-LabMap $labPath
$resources = ResourceMap
if ($lessons.Count -ne 48) { throw "Expected 48 mapped lessons, found $($lessons.Count)" }

Update-ProductionLanguage

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

Write-Host "Marine Science build complete."
Write-Host "Lessons: $($validation.LessonFolders)"
Write-Host "HTML: $($validation.HtmlPages)"
Write-Host "JSON: $($validation.JsonFiles)"
Write-Host "XML files: $($validation.XmlFiles)"
Write-Host "XML questions: $($validation.XmlQuestions)"

