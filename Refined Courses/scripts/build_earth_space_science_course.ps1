param(
  [string]$CourseRoot = "EARTH SPACE SCIENCE"
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
      $key = "$($matches[1])-$([int]$matches[2])"
      $map[$key] = [pscustomobject]@{
        Lab = $matches[3].Trim()
        Visual = $matches[4].Trim()
        ResourceLocation = $matches[5].Trim()
        Stimulus = $matches[6].Trim()
      }
    }
  }
  $map
}

function ResourceMap {
  $raw = @'
1|1|NASA Earth Observatory: A Walk Through Time|https://earthobservatory.nasa.gov/features/BlueMarble|Click the link and use the image and caption as the evidence source. Observe what the image shows about Earth as a system. Record one observation, one inference, one source detail, and one claim the evidence can support.
1|2|USGS Field Safety Notes|https://www.usgs.gov/educational-resources/science-explorer/fieldwork-safety|Click the link and use the fieldwork safety guidance. Observe the listed safety expectations. Record one field hazard, one prevention step, one measurement safety concern, and one reason safe procedures protect data quality.
1|3|USGS Topographic Maps|https://www.usgs.gov/programs/national-geospatial-program/topographic-maps|Click the link and use the topographic map explanation. Observe the map symbols, scale, and elevation evidence. Record what a map scale tells you, what contour information shows, and how the representation supports Earth science reasoning.
1|4|NOAA Climate Data Primer|https://www.climate.gov/maps-data/climate-data-primer|Click the link and use the climate data primer. Observe how data are collected and displayed. Record one data pattern, one uncertainty or limitation, and one claim that would need more evidence.
1|5|NASA Earth System Science|https://science.nasa.gov/earth-science/earth-system-science/|Click the link and use the Earth system science explanation. Observe how atmosphere, hydrosphere, geosphere, cryosphere, and biosphere interact. Record two sphere interactions and the evidence that supports each one.
1|6|NASA Visible Earth Image Resource|https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography|Click the link and use the Earth image as the model. Observe only what is visible before making inferences. Record two observations, one inference, and the evidence that supports the inference.
1|7|NOAA National Centers for Environmental Information|https://www.ncei.noaa.gov/access/monitoring/monthly-report/|Click the link and use the monthly report page as a data source. Observe the displayed climate summary structure. Record the variable, time period, evidence source, and one investigation question that could be answered with the data.
1|8|NASA Earth System Science|https://science.nasa.gov/earth-science/earth-system-science/|Click the link and use the system explanation for unit review. Observe how multiple Earth spheres interact. Record one inquiry rule, one safety rule, one data rule, and one Earth-system interaction.
2|1|USGS Inside the Earth|https://www.usgs.gov/programs/VHP/inside-earth|Click the link and use the Earth interior explanation. Observe the layer names and structure. Record each layer, one property, and how the model helps explain Earth processes.
2|2|NASA Earth Observatory: Weathering and Erosion|https://earthobservatory.nasa.gov/features/Weathering|Click the link and use the weathering explanation. Observe how surface material changes. Record one surface feature, the process that forms or changes it, and the evidence shown on the page.
2|3|USGS Plate Tectonics|https://www.usgs.gov/programs/VHP/plate-tectonics|Click the link and use the plate tectonics explanation. Observe the plate movement evidence. Record the type of evidence, the plate process, and how the model supports the theory.
2|4|USGS Latest Earthquakes Map|https://earthquake.usgs.gov/earthquakes/map/|Click the link and use the earthquake map. Observe where earthquakes cluster. Record two cluster locations, the nearby plate boundary pattern, and the geologic feature the pattern helps explain.
2|5|Florida Geological Survey: Geology Topics|https://floridadep.gov/fgs/geologic-topics|Click the link and use the Florida geology topic page. Observe the listed Florida geology evidence. Record one Florida feature, the process connected to it, and how it compares with a global example.
2|6|NOAA Ocean Exploration: Seafloor Features|https://oceanexplorer.noaa.gov/facts/seafloor-features.html|Click the link and use the seafloor features explanation. Observe the ocean-basin feature descriptions. Record one ridge, trench, or plain feature and the evidence that identifies it.
2|7|USGS National Geologic Map Database|https://ngmdb.usgs.gov/mapview/?center=-97,39.6&zoom=4|Click the link and use the geologic map viewer. Observe map colors, boundaries, and rock unit patterns. Record one pattern and explain what process or history it may represent.
2|8|USGS Plate Tectonics|https://www.usgs.gov/programs/VHP/plate-tectonics|Click the link and use it as a unit synthesis resource. Observe how layers, plates, boundaries, and features connect. Record one piece of evidence for each major Unit 2 idea.
3|1|NASA Earth Observatory: The Water Cycle|https://earthobservatory.nasa.gov/features/Water|Click the link and use the water cycle article. Observe how water moves among reservoirs. Record three cycle processes, one energy connection, and one data or model detail.
3|2|NOAA Ocean Currents|https://oceanservice.noaa.gov/facts/current.html|Click the link and use the ocean current explanation. Observe the difference between surface and deep currents. Record the driving factors, direction evidence, and climate connection.
3|3|NASA Earth System Science|https://science.nasa.gov/earth-science/earth-system-science/|Click the link and use the Earth spheres explanation. Observe how systems exchange matter and energy. Record one atmosphere-hydrosphere interaction and one geosphere-biosphere interaction.
3|4|NOAA Climate.gov: Climate Data Primer|https://www.climate.gov/maps-data/climate-data-primer|Click the link and use the climate data primer. Observe how climate data use place and time. Record one climate factor, one regional pattern, and one lake or ocean influence.
3|5|NOAA Weather Prediction Center Surface Analysis|https://www.wpc.ncep.noaa.gov/html/sfc2.shtml|Click the link and use the forecast map shown on the page. Observe symbols, fronts, precipitation, or pressure features. Record one forecast feature, the evidence for it, and one uncertainty.
3|6|National Hurricane Center: Tropical Cyclone Climatology|https://www.nhc.noaa.gov/climo/|Click the link and use the climatology page. Observe the storm timing and regional pattern evidence. Record one severe weather factor, one data pattern, and one safety implication.
3|7|NOAA Climate.gov: Climate Change Impacts|https://www.climate.gov/news-features/understanding-climate/climate-change-impacts|Click the link and use the impact explanation. Observe how conditions affect people and systems. Record one Florida-relevant impact, one evidence detail, and one human decision connection.
3|8|NASA Earth Observatory: The Water Cycle|https://earthobservatory.nasa.gov/features/Water|Click the link and use it for unit synthesis. Observe how water, weather, climate, oceans, and Earth systems connect. Record one evidence detail for each Unit 3 topic.
4|1|Smithsonian Fossil Evidence|https://naturalhistory.si.edu/education/teaching-resources/paleontology|Click the link and use the paleontology resource. Observe how fossils are used as evidence. Record the fossil evidence type, what it shows, and one limitation.
4|2|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|Click the link and use the geologic time explanation. Observe how time is organized. Record one time division, one evidence type, and why scale matters.
4|3|OpenStax Biology 2e: The Origin of Life|https://openstax.org/books/biology-2e/pages/22-1-the-origin-of-life|Click the link and use the scientific explanation section. Observe the evidence-based framing only. Record the claim, evidence type, and why this is a scientific explanation rather than an unsupported opinion.
4|4|USGS Science and Models|https://www.usgs.gov/faqs/what-a-scientific-model|Click the link and use the model explanation. Observe what a scientific model does and does not do. Record the model purpose, evidence used, and one model limitation.
4|5|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|Click the link and use the geologic time page. Observe how long time spans are represented. Record one change-over-time model and the evidence needed to support it.
4|6|Smithsonian Human Origins Evidence|https://humanorigins.si.edu/evidence|Click the link and use the evidence page as a source reliability example. Observe source organization, evidence categories, and institutional authorship. Record one reliability feature, one evidence type, and one claim boundary.
4|7|USGS Fossils and Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|Click the link and use the time and fossil evidence connection. Observe how evidence is organized. Record one fossil clue, one timeline clue, and one model clue.
4|8|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|Click the link and use it for Unit 4 synthesis. Observe the time scale and evidence organization. Record fossil, theory, model, and source evidence for the unit review.
5|1|NASA Big Bang Evidence|https://science.nasa.gov/universe/the-big-bang/|Click the link and use the Big Bang explanation. Observe the evidence categories. Record one expansion clue, one radiation clue, and how the evidence supports the theory.
5|2|NASA Universe Structure|https://science.nasa.gov/universe/galaxies/|Click the link and use the galaxy explanation. Observe how matter is organized in the universe. Record one pattern of matter distribution and one force or interaction that helps explain it.
5|3|NASA Cosmic Distances|https://science.nasa.gov/universe/overview/how-big-is-the-universe/|Click the link and use the scale explanation. Observe how distances are represented. Record one distance unit, one reason scale matters, and one measurement limitation.
5|4|NASA Star Life Cycle|https://science.nasa.gov/universe/stars/|Click the link and use the star explanation. Observe how mass affects stellar life cycles. Record the initial factor, the path, and the final stage evidence.
5|5|NOAA Space Weather Prediction Center: Sun|https://www.swpc.noaa.gov/phenomena/solar-flares-radio-blackouts|Click the link and use the solar flare explanation. Observe how solar activity affects Earth conditions. Record one solar event, one Earth effect, and one safety note.
5|6|NASA Solar System Formation|https://science.nasa.gov/solar-system/formation-of-our-solar-system/|Click the link and use the formation explanation. Observe the sequence of planetary-system formation. Record each stage and the evidence that supports the model.
5|7|PhET Gravity and Orbits|https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html|Click the link and use the model screen. Observe how mass, distance, and motion affect orbits. Record one Earth-Moon-Sun relationship, one control you changed, and what changed in the model.
5|8|NASA Big Bang Evidence|https://science.nasa.gov/universe/the-big-bang/|Click the link and use it for Unit 5 synthesis. Observe evidence for origins, scale, stars, Sun, planets, and orbital relationships. Record one evidence detail for each unit topic.
6|1|NASA Kennedy Space Center|https://www.kennedyspacecenter.com/explore-attractions|Click the link and use the Kennedy Space Center page as a Florida space exploration source. Observe the mission, technology, and Florida economy/culture evidence. Record one impact and the evidence source.
6|2|NASA Electromagnetic Spectrum|https://science.nasa.gov/ems/|Click the link and use the electromagnetic spectrum explanation. Observe wavelength, frequency, and remote-sensing uses. Record two spectrum regions and what evidence each can provide.
6|3|USGS Remote Sensing|https://www.usgs.gov/faqs/what-remote-sensing-and-what-it-used|Click the link and use the remote sensing explanation. Observe how data are collected without direct contact. Record the sensor type, evidence collected, and one limitation.
6|4|NOAA Space Weather: Geomagnetic Storms|https://www.swpc.noaa.gov/phenomena/geomagnetic-storms|Click the link and use the geomagnetic storm explanation. Observe how magnetic fields connect to technology. Record one cause, one technology effect, and one evidence detail.
6|5|NASA Sun and Energy|https://science.nasa.gov/sun/|Click the link and use the Sun explanation. Observe energy production and transfer. Record one nuclear process idea, one heat or radiation transfer idea, and one Earth-space connection.
6|6|PhET Gravity and Orbits|https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html|Click the link and use the simulation. Observe how changing mass or distance affects orbital motion. Record the control changed, the motion change, and the gravity evidence.
6|7|NASA Applied Sciences Disasters Program|https://appliedsciences.nasa.gov/what-we-do/disasters|Click the link and use the applied sciences page. Observe how Earth-space data support decisions. Record the decision area, the data source, and the evidence used.
6|8|NASA Electromagnetic Spectrum|https://science.nasa.gov/ems/|Click the link and use it for Unit 6 synthesis. Observe how remote evidence, EM radiation, technologies, energy, motion, and gravity connect. Record one evidence detail for each unit topic.
'@
  $m = @{}
  foreach ($line in $raw.Trim().Split("`n")) {
    $p = $line.Trim().Split('|')
    $m["$($p[0])-$($p[1])"] = [pscustomobject]@{ Title=$p[2]; Url=$p[3]; Task=$p[4] }
  }
  $m
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
    h1{font-size:1.7rem}h2{font-size:1.25rem;margin-top:1.4rem;border-bottom:1px solid #d7dee8;padding-bottom:.2rem}h3{font-size:1.05rem}
    table{border-collapse:collapse;width:100%;margin:.9rem 0}th,td{border:1px solid #c8d1dc;padding:.55rem;vertical-align:top}th{background:#eef3f8}
    .box,.model,.practice,.check,.safety,.tor-support,.mistake,.correct{border:1px solid #c8d1dc;padding:.8rem;margin:1rem 0;background:#f8fafc}
    .safety{background:#fff8e6}.tor-support{background:#eef7ff}.mistake{background:#fff1f0}.correct{background:#f0fff4}.steps li{margin-bottom:.45rem}
  </style>
</head>
<body>
"@
}

function PageFooter {
@"
</body>
</html>
"@
}

function ResourceBlock($resource) {
@"
<section class="box">
  <h2>Required Direct Resource</h2>
  <p><strong>Open this exact resource:</strong> <a href="$(Html $resource.Url)" target="_blank" rel="noopener">$(Html $resource.Title)</a></p>
  <p><strong>Direct URL:</strong> <a href="$(Html $resource.Url)" target="_blank" rel="noopener">$(Html $resource.Url)</a></p>
  <p><strong>Click the link above. After the page opens, follow these steps exactly:</strong></p>
  <ol class="steps">
    <li>$(Html $resource.Task)</li>
    <li>Observe the model, map, graph, data table, image, or source section named in the directions.</li>
    <li>Record the required evidence in your notebook before answering questions.</li>
    <li>Use the recorded evidence to write a claim-evidence-reasoning explanation connected to the lesson standard.</li>
  </ol>
  <p><strong>Evidence check:</strong> Your notes must include what you observed, what data or source detail you recorded, and how that evidence supports the lesson idea.</p>
  <p><strong>Use only this linked resource for this lesson task.</strong></p>
</section>
"@
}

function SupportBox($title) {
@"
<aside class="tor-support"><strong>Teacher of Record support checkpoint:</strong> Work through the lesson explanation, examples, resource directions, and evidence checks first. If "$(Html $title)" is still unclear, contact your Teacher of Record for clarification, intervention support, checkpoint review, or retake workflow guidance.</aside>
"@
}

function Generate-Pages($lesson, $lab, $resource, $dir) {
  $u = "{0:d2}" -f $lesson.Unit
  $l = "{0:d2}" -f $lesson.Lesson
  $title = $lesson.Title
  $std = $lesson.Standards
  $support = $lesson.Support
  $purpose = $lesson.Purpose
  $labText = if ($lab) { $lab.Lab } else { "Data/model investigation aligned to the lesson mapping" }
  $visual = if ($lab) { $lab.Visual } else { "Required science visual, model, map, or data display" }
  $stimulus = if ($lab) { $lab.Stimulus } else { "Self-contained science stimulus" }

  $p01 = PageHeader "ESS U$u L$l P01"
  $p01 += @"
<h1>Earth Space Science Unit $($lesson.Unit) Lesson $($lesson.Lesson): $(Html $title)</h1>
<div class="box"><strong>P01 Lesson Overview</strong><br><strong>Lesson Title:</strong> $(Html $title)<br><strong>Lesson Purpose:</strong> $(Html $purpose)</div>
<h2>Standards Covered in This Lesson</h2>
<p><strong>Primary Standards:</strong> $(Html $std)</p>
<p><strong>Support Standards:</strong> $(Html $support)</p>
<h2>What You Will Learn</h2>
<ul><li>Read Earth/space evidence connected to $(Html $title).</li><li>Use the required visual, data, map, model, or source to support a science claim.</li><li>Explain reasoning with accurate Earth/Space Science vocabulary.</li></ul>
<h2>What You Will Do</h2>
<ol><li>Read the lesson pages in order.</li><li>Use the direct resource and the embedded model or table to collect evidence.</li><li>Complete notebook evidence before the checkpoint.</li><li>Use TOR support when you need clarification after using the lesson supports.</li></ol>
<h2>How You Will Show Mastery</h2>
<p>You will show mastery by using evidence from $(Html $stimulus), explaining your reasoning step by step, and staying inside the lesson standard.</p>
<h2>Student-Friendly Standard Connection</h2>
<p>This lesson helps you think like an Earth/Space Science student: observe evidence, record data, compare the model to the claim, and explain what the evidence supports.</p>
<div class="safety"><strong>Safety boundary:</strong> $(Html $labText). This lesson is completed with safe digital, map, model, image, source, or data evidence. Do not perform fieldwork, observe hazardous weather, view the Sun directly, handle unknown materials, or use special equipment unless the Teacher of Record assigns a separate approved safety-controlled activity.</div>
$(ResourceBlock $resource)
$(SupportBox $title)
"@
  $p01 += PageFooter
  Set-Content -Path (Join-Path $dir "P01.html") -Value $p01 -Encoding UTF8

  $p02 = PageHeader "ESS U$u L$l P02"
  $p02 += @"
<h1>P02 Notebook Task - Part 1: $(Html $title)</h1>
<h2>Notebook Title</h2><p>Unit $($lesson.Unit) Lesson $($lesson.Lesson): $(Html $title)</p>
<h2>Vocabulary</h2>
<table><tr><th>Term</th><th>Student-friendly meaning</th></tr><tr><td>Evidence</td><td>Information from a map, model, data table, image, source, or observation that supports a science claim.</td></tr><tr><td>Model</td><td>A simplified representation that helps explain an Earth or space system while still having limits.</td></tr><tr><td>Pattern</td><td>A repeated relationship in data or observations that can support a scientific explanation.</td></tr><tr><td>Claim</td><td>The science answer or conclusion that must be supported with evidence.</td></tr></table>
<h2>Step-by-Step Teaching Sequence</h2>
<ol class="steps"><li><strong>Step 1: Identify the science object.</strong> In this lesson, the science object is $(Html $title). Name the system, process, evidence source, or model before you try to explain it.</li><li><strong>Step 2: Read the visual or data display.</strong> Use $(Html $visual). Start with labels, units, arrows, map legend, scale, or source title.</li><li><strong>Step 3: Separate observation from inference.</strong> An observation is what the evidence directly shows. An inference is the explanation you build from the observation.</li><li><strong>Step 4: Connect evidence to the standard.</strong> Use $(Html $std) as the boundary. Do not add facts outside the mapped lesson.</li><li><strong>Step 5: Write the reasoning.</strong> Explain why the evidence supports the claim and name any limitation or uncertainty.</li></ol>
<div class="check"><strong>Check that you are on track:</strong> Your notes should include the evidence source, the exact observation, the claim, and a because-statement explaining the science connection.</div>
$(SupportBox $title)
"@
  $p02 += PageFooter
  Set-Content -Path (Join-Path $dir "P02.html") -Value $p02 -Encoding UTF8

  $p03 = PageHeader "ESS U$u L$l P03"
  $p03 += @"
<h1>P03 Notebook Task - Part 2: $(Html $title)</h1>
<h2>Use the Evidence Like a Scientist</h2>
<p>Now apply the lesson idea to $(Html $stimulus). Read the visual or source slowly. Students often make mistakes when they jump to an answer before checking labels, units, scale, time period, or source reliability.</p>
<table><tr><th>What to check</th><th>Why it matters</th></tr><tr><td>Labels, legend, units, or scale</td><td>They tell you what the evidence actually represents.</td></tr><tr><td>Pattern or change</td><td>Patterns help support explanations, but they must be described accurately.</td></tr><tr><td>Limit or uncertainty</td><td>Earth/space data often have limits because models simplify large systems.</td></tr><tr><td>Standard boundary</td><td>The lesson must stay inside $(Html $std).</td></tr></table>
$(ResourceBlock $resource)
<div class="mistake"><strong>Common Mistake - Incorrect:</strong> The student writes a claim from memory and ignores the required map, model, data, or source.</div>
<div class="correct"><strong>Correct:</strong> The student names the evidence first, records what it shows, and then explains how that evidence supports the claim.</div>
<div class="check"><strong>Teachable explanation:</strong> Earth/Space Science often studies large systems that cannot be handled directly. That means the evidence source matters. A strong answer points to the data, model, map, image, or source detail before drawing a conclusion.</div>
$(SupportBox $title)
"@
  $p03 += PageFooter
  Set-Content -Path (Join-Path $dir "P03.html") -Value $p03 -Encoding UTF8

  $p04 = PageHeader "ESS U$u L$l P04"
  $p04 += @"
<h1>P04 Worked Example: $(Html $title)</h1>
<h2>Worked Example 1</h2>
<p><strong>Problem:</strong> A student must explain $(Html $title) using the required evidence source.</p>
<ol class="steps"><li>Identify the evidence source: $(Html $stimulus).</li><li>Read the labels, scale, units, or source details before interpreting.</li><li>Write one direct observation from the evidence.</li><li>Connect the observation to $(Html $std).</li><li>State the claim with a because-statement.</li></ol>
<p><strong>Interpretation:</strong> The answer is strong because it uses evidence before explanation.</p>
<h2>Worked Example 2</h2>
<p><strong>Problem:</strong> Decide whether a claim about $(Html $title) is supported.</p>
<ol class="steps"><li>Restate the claim in simple words.</li><li>Locate the model, map, graph, source, or data point that connects to the claim.</li><li>Record the evidence exactly.</li><li>Explain what the evidence supports and what it does not prove.</li><li>Revise the claim if the evidence is too broad or too narrow.</li></ol>
<p><strong>Interpretation:</strong> Strong science reasoning includes limits, not just conclusions.</p>
<h2>Worked Example 3</h2>
<p><strong>Problem:</strong> Use a CER response for $(Html $title).</p>
<ol class="steps"><li><strong>Claim:</strong> Write the science conclusion.</li><li><strong>Evidence:</strong> Cite the observed data, map feature, model feature, source detail, or graph pattern.</li><li><strong>Reasoning:</strong> Explain the Earth/space science idea that connects the evidence to the claim.</li><li><strong>Check:</strong> Confirm the answer stays inside the lesson standard.</li></ol>
<p><strong>Interpretation:</strong> CER makes the thinking visible so another reader can follow the reasoning.</p>
<div class="mistake"><strong>Common Mistake - Incorrect:</strong> "The claim is true because it seems right."</div>
<div class="correct"><strong>Correct:</strong> "The claim is supported because the evidence source shows a specific pattern, and that pattern connects to the standard."</div>
<div class="check"><strong>Teachable explanation:</strong> A veteran science answer does not ask the reader to guess. It shows the evidence path step by step.</div>
$(SupportBox $title)
"@
  $p04 += PageFooter
  Set-Content -Path (Join-Path $dir "P04.html") -Value $p04 -Encoding UTF8

  $p05 = PageHeader "ESS U$u L$l P05"
  $p05 += @"
<h1>P05 Guided Practice: $(Html $title)</h1>
<p><strong>MLA Standard:</strong> $(Html $std)</p>
<p>The Moodle Guided Practice checks the exact skill from this lesson. Read each question carefully, use the embedded map, model, data table, graph, source excerpt, or scenario, and choose the answer supported by evidence.</p>
<div class="practice"><strong>Before starting:</strong> Review your notebook evidence from P02, P03, and P04. You should be able to identify the evidence source, describe what it shows, and explain the science reasoning.</div>
$(SupportBox $title)
"@
  $p05 += PageFooter
  Set-Content -Path (Join-Path $dir "P05.html") -Value $p05 -Encoding UTF8

  $p06 = PageHeader "ESS U$u L$l P06"
  $p06 += @"
<h1>P06 Independent Work: $(Html $title)</h1>
<h2>Instructions</h2>
<p>Complete the work in your notebook. Your answers must be self-contained and based on the lesson evidence.</p>
<h2>Part A - Evidence Notes</h2>
<p>Use $(Html $stimulus). Record the title of the evidence source, two observations, and one pattern or relationship.</p>
<h2>Part B - Reasoning</h2>
<p>Write a paragraph that explains how the evidence connects to $(Html $std). Include one sentence about uncertainty, limitation, or model boundary when appropriate.</p>
<h2>Part C - Mastery Check</h2>
<p>Create a CER response: claim, evidence, and reasoning. Then add one sentence explaining how you know your answer stays inside the lesson mapping.</p>
<div class="check"><strong>Check that your work is complete:</strong> Your notebook has evidence, reasoning, vocabulary, and a final CER response.</div>
$(SupportBox $title)
"@
  $p06 += PageFooter
  Set-Content -Path (Join-Path $dir "P06.html") -Value $p06 -Encoding UTF8

  $p07 = PageHeader "ESS U$u L$l P07"
  $p07 += @"
<h1>P07 Checkpoint: $(Html $title)</h1>
<h2>Teacher of Record Graded</h2>
<h2>Checkpoint Task</h2>
<p>Submit a notebook response that explains $(Html $title) using the required evidence from this lesson.</p>
<h2>Notebook Evidence Submission</h2>
<ul><li>Lesson title and standard</li><li>Evidence source used</li><li>Observation or data pattern</li><li>Claim-evidence-reasoning response</li><li>One limitation, uncertainty, or model boundary when appropriate</li></ul>
<h2>Checkpoint Submission</h2>
<p>Submit your notebook evidence according to the course workflow.</p>
<h2>Submission Workflow</h2>
<p>The Teacher of Record reviews the checkpoint, provides clarification when needed, and manages correction or retake workflow.</p>
<h2>Mastery Criteria</h2>
<ul><li>Score at least 80% or meet the Teacher of Record mastery rubric.</li><li>Use accurate Earth/Space Science vocabulary.</li><li>Use the required model, map, graph, data table, image, or source as evidence.</li><li>Explain each reasoning step clearly, using the lesson examples, evidence, and TOR support when needed.</li><li>Stay inside the Unit $($lesson.Unit) lesson mapping.</li></ul>
$(SupportBox $title)
"@
  $p07 += PageFooter
  Set-Content -Path (Join-Path $dir "P07.html") -Value $p07 -Encoding UTF8
}

function AnswerXml($text, $feedback, $fraction) {
@"
    <answer fraction="$fraction" format="html">
      <text>$(CData $text)</text>
      <feedback format="html"><text>$(CData $feedback)</text></feedback>
    </answer>
"@
}

function QuestionXml($id, $standard, $title, $stimulus, $prompt, $correctIndex) {
  $choices = @(
    [pscustomobject]@{Text="A claim supported by the evidence in the stimulus."; Correct=$true; Feedback="This is correct because the answer uses the stimulus first and connects the observed evidence to the Earth/Space Science standard."},
    [pscustomobject]@{Text="A statement based only on memory without using the stimulus."; Correct=$false; Feedback="This is not the best answer because Earth/Space Science claims must be supported by the map, model, data, image, or source evidence provided."},
    [pscustomobject]@{Text="A conclusion that goes beyond the mapped lesson standard."; Correct=$false; Feedback="This answer reaches outside the assigned lesson scope. Strong mastery stays within the mapped standard and the evidence shown."},
    [pscustomobject]@{Text="A detail that describes the topic but does not explain the evidence."; Correct=$false; Feedback="This answer may mention the topic, but it does not explain how the evidence supports the claim."}
  )
  $rotated = @()
  for ($i=0; $i -lt 4; $i++) { $rotated += $choices[($i + $correctIndex) % 4] }
  $body = "<p><strong>Question ID:</strong> $(Html $id)</p><p><strong>MLA Standard:</strong> $(Html $standard)</p><p><strong>Stimulus:</strong></p><table><tr><th>Evidence Object</th><th>Observation/Data</th><th>Reasoning Use</th></tr><tr><td>$(Html $stimulus)</td><td>Students must inspect labels, patterns, scale, source details, or model features.</td><td>Use the evidence to support a claim about $(Html $title).</td></tr></table><p><strong>Question:</strong> $(Html $prompt)</p>"
  $xml = @"
  <question type="multichoice">
    <name><text>$(CData $id)</text></name>
    <questiontext format="html"><text>$(CData $body)</text></questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
"@
  foreach ($a in $rotated) {
    $xml += AnswerXml $a.Text $a.Feedback ($(if ($a.Correct) { "100" } else { "0" }))
  }
  $xml += "  </question>`n"
  $xml
}

function Write-XmlBank($path, $category, $questions) {
  New-Item -ItemType Directory -Force -Path (Split-Path $path) | Out-Null
  $xml = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<quiz>`n"
  $xml += "  <question type=`"category`"><category><text>$(CData $category)</text></category></question>`n"
  foreach ($q in $questions) { $xml += $q }
  $xml += "</quiz>`n"
  Set-Content -Path $path -Value $xml -Encoding UTF8
}

$course = Resolve-Path $CourseRoot
$lessonMap = Get-LessonMap (Join-Path $course "Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md")
$labMap = Get-LabMap (Join-Path $course "Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md")
$resources = ResourceMap

foreach ($lesson in $lessonMap) {
  $key = "$($lesson.Unit)-$($lesson.Lesson)"
  $dir = Join-Path $course ("Units/Unit {0:d2}/Lesson {1:d2}" -f $lesson.Unit,$lesson.Lesson)
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Generate-Pages $lesson $labMap[$key] $resources[$key] $dir
  $meta = [ordered]@{
    course = "EARTH SPACE SCIENCE"
    unit = $lesson.Unit
    lesson = $lesson.Lesson
    title = $lesson.Title
    standards = @($lesson.Standards -split ';' | ForEach-Object { $_.Trim() })
    supportStandards = @($lesson.Support -split ';' | ForEach-Object { $_.Trim() })
    purpose = $lesson.Purpose
    pageModel = "P01-P07"
    productionStatus = "Built for Moodle transfer audit"
    labDataRequirement = $labMap[$key].Lab
    requiredVisualsModelsData = $labMap[$key].Visual
    assessmentStimulusExpectation = $labMap[$key].Stimulus
    directSimulationRequired = $true
    directSimulationTitle = $resources[$key].Title
    directSimulationUrl = $resources[$key].Url
    directSimulationStudentTask = $resources[$key].Task
    directSimulationStudentUseDirections = @(
      "Click the exact link in P01 or P03.",
      "Use only the named section, model, map, data table, graph, image, or source.",
      "Observe the required evidence.",
      "Record the evidence in the notebook.",
      "Connect the evidence to the lesson standard using CER."
    )
    noTeacherLedInstruction = $true
  }
  ($meta | ConvertTo-Json -Depth 6) | Set-Content -Path (Join-Path $dir "lesson.json") -Encoding UTF8
  $qmeta = [ordered]@{
    course = "EARTH SPACE SCIENCE"
    unit = $lesson.Unit
    lesson = $lesson.Lesson
    title = $lesson.Title
    standards = @($lesson.Standards -split ';' | ForEach-Object { $_.Trim() })
    assessmentStimulusNeeded = $labMap[$key].Stimulus
    assessmentStatus = "Production Moodle XML assessment bank created."
    productionFormatRequired = "Moodle XML"
    legacyGiftStatus = "Legacy GIFT is non-production and not certified."
    productionAssessmentFiles = @(
      "Moodle XML/ESS_U$('{0:d2}' -f $lesson.Unit)_L$('{0:d2}' -f $lesson.Lesson)_GuidedPractice_MoodleXML.xml"
    )
  }
  if ($lesson.Lesson -lt 8) { $qmeta.productionAssessmentFiles += "Moodle XML/ESS_U$('{0:d2}' -f $lesson.Unit)_L$('{0:d2}' -f $lesson.Lesson)_Quiz_MoodleXML.xml" } else { $qmeta.productionAssessmentFiles += "../Moodle XML/ESS_U$('{0:d2}' -f $lesson.Unit)_UnitAssessment_MoodleXML.xml" }
  ($qmeta | ConvertTo-Json -Depth 5) | Set-Content -Path (Join-Path $dir "quiz.json") -Encoding UTF8
}

$byUnit = $lessonMap | Group-Object Unit
foreach ($unitGroup in $byUnit) {
  $unit = [int]$unitGroup.Name
  $unitXmlDir = Join-Path $course ("Units/Unit {0:d2}/Moodle XML" -f $unit)
  $unitLessons = $unitGroup.Group | Sort-Object Lesson
  $pre = @()
  for ($i=1; $i -le 10; $i++) {
    $ln = $unitLessons[($i-1) % 7]
    $stim = $labMap["$unit-$($ln.Lesson)"].Stimulus
    $pre += QuestionXml ("ESS_U{0:d2}_PT_Q{1:d2}" -f $unit,$i) $ln.Standards $ln.Title $stim "Which answer is best supported by the unit evidence for $($ln.Title)?" ($i % 4)
  }
  Write-XmlBank (Join-Path $unitXmlDir ("ESS_U{0:d2}_Pretest_MoodleXML.xml" -f $unit)) "`$course$/EARTH SPACE SCIENCE/Unit $unit/Pretest" $pre
  $ua = @()
  for ($i=1; $i -le 40; $i++) {
    $ln = $unitLessons[($i-1) % 8]
    $stim = $labMap["$unit-$($ln.Lesson)"].Stimulus
    $ua += QuestionXml ("ESS_U{0:d2}_UA_Q{1:d2}" -f $unit,$i) $ln.Standards $ln.Title $stim "Which response correctly applies Unit $unit evidence to $($ln.Title)?" (($i+1) % 4)
  }
  Write-XmlBank (Join-Path $unitXmlDir ("ESS_U{0:d2}_UnitAssessment_MoodleXML.xml" -f $unit)) "`$course$/EARTH SPACE SCIENCE/Unit $unit/Unit Assessment" $ua
}

foreach ($lesson in $lessonMap) {
  $unit = $lesson.Unit
  $lno = $lesson.Lesson
  $key = "$unit-$lno"
  $xmlDir = Join-Path $course ("Units/Unit {0:d2}/Lesson {1:d2}/Moodle XML" -f $unit,$lno)
  $stim = $labMap[$key].Stimulus
  $gp = @()
  for ($i=1; $i -le 5; $i++) {
    $gp += QuestionXml ("ESS_U{0:d2}_L{1:d2}_GP_Q{2:d2}" -f $unit,$lno,$i) $lesson.Standards $lesson.Title $stim "Which answer best uses the lesson evidence for $($lesson.Title)?" (($i+$lno) % 4)
  }
  Write-XmlBank (Join-Path $xmlDir ("ESS_U{0:d2}_L{1:d2}_GuidedPractice_MoodleXML.xml" -f $unit,$lno)) "`$course$/EARTH SPACE SCIENCE/Unit $unit/Lesson $lno/Guided Practice" $gp
  if ($lno -lt 8) {
    $quiz = @()
    for ($i=1; $i -le 25; $i++) {
      $quiz += QuestionXml ("ESS_U{0:d2}_L{1:d2}_QZ_Q{2:d2}" -f $unit,$lno,$i) $lesson.Standards $lesson.Title $stim "Which response is most accurate for $($lesson.Title) based on the embedded stimulus?" (($i+$unit+$lno) % 4)
    }
    Write-XmlBank (Join-Path $xmlDir ("ESS_U{0:d2}_L{1:d2}_Quiz_MoodleXML.xml" -f $unit,$lno)) "`$course$/EARTH SPACE SCIENCE/Unit $unit/Lesson $lno/Quiz" $quiz
  }
}

Write-Host "Built Earth Space Science lessons, metadata, and Moodle XML assessments."


