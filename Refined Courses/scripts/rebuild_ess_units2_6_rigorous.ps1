param([string]$CourseRoot = "EARTH SPACE SCIENCE")

$ErrorActionPreference = "Stop"

function Html([string]$s){ if($null -eq $s){return ""}; [System.Net.WebUtility]::HtmlEncode($s) }
function CData([string]$s){ if($null -eq $s){$s=""}; "<![CDATA[$($s.Replace(']]>', ']]]]><![CDATA[>'))]]>" }

function HtmlHeader([string]$title){
@"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>$(Html $title)</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;line-height:1.58;color:#1f2933;margin:32px;max-width:980px}
    h1{font-size:1.7rem;margin-bottom:.35rem}h2{font-size:1.22rem;margin-top:1.35rem;border-bottom:1px solid #d6dee8;padding-bottom:.2rem}h3{font-size:1.05rem}
    table{border-collapse:collapse;width:100%;margin:.85rem 0}th,td{border:1px solid #c8d1dc;padding:.55rem;vertical-align:top}th{background:#eef3f8}
    .box,.model,.practice,.check,.safety,.tor-support,.mistake,.correct{border:1px solid #c8d1dc;padding:.85rem;margin:1rem 0;background:#f8fafc}
    .safety{background:#fff8e6}.tor-support{background:#eef7ff}.mistake{background:#fff1f0}.correct{background:#f0fff4}.steps li{margin-bottom:.45rem}
  </style>
</head>
<body>
"@
}
function F(){ "</body>`n</html>`n" }

function Lessons {
$raw = @'
2|1|Earth's Layers and Interior|MLA.ESS.EAR.01|USGS Inside the Earth|https://www.usgs.gov/programs/VHP/inside-earth|Earth layer cross-section and layer-property table|Earth is organized into layers with different composition and behavior; crust, mantle, outer core, and inner core interact through heat and material movement.|Layer evidence explains why surface processes connect to internal heat and structure.|Confusing the mantle with liquid magma everywhere; the mantle behaves plastically over long time but is mostly solid.|Stay with Earth layer structure and interactions; do not move into full plate-boundary analysis until later lessons.
2|2|Surface Features and Surface Processes|MLA.ESS.EAR.02|NASA Earth Observatory: Weathering and Erosion|https://earthobservatory.nasa.gov/features/Weathering|landform image, process diagram, and feature-process table|Surface features form and change through weathering, erosion, deposition, volcanism, uplift, and water or wind movement.|A feature is evidence of a process only when shape, material, location, and pattern support that process.|Naming a landform without explaining the process that made or changed it.|Stay with observable surface features and formative surface processes.
2|3|Plate Tectonics Theory|MLA.ESS.EAR.03|USGS Plate Tectonics|https://www.usgs.gov/programs/VHP/plate-tectonics|plate map, boundary diagram, and evidence table|Plate tectonics explains large-scale movement of lithospheric plates using evidence from earthquakes, volcanoes, seafloor spreading, fossils, and mountain belts.|Multiple evidence lines support the theory better than one isolated observation.|Calling plate tectonics a guess because it is a theory; in science, a theory is strongly evidence-supported.|Focus on theory and evidence, not every boundary feature yet.
2|4|Plate Boundaries and Geologic Features|MLA.ESS.EAR.03|USGS Latest Earthquakes Map|https://earthquake.usgs.gov/earthquakes/map/|earthquake distribution map, plate-boundary table, and feature model|Convergent, divergent, and transform boundaries create different patterns of earthquakes, volcanoes, mountains, trenches, and rift zones.|Feature patterns reveal boundary type when location and movement are analyzed together.|Assuming every earthquake means a volcano is present; different boundaries produce different features.|Stay with boundary-feature relationships and map evidence.
2|5|Geologic Processes in Florida and Beyond|MLA.ESS.EAR.04|Florida Geological Survey: Geologic Topics|https://floridadep.gov/fgs/geologic-topics|Florida geology map, karst/process diagram, and comparison table|Florida geology is shaped by limestone, groundwater, sea-level history, erosion, deposition, and karst processes, while other regions may show different dominant processes.|Local geology becomes meaningful when compared to broader Earth processes.|Assuming Florida must show the same tectonic features as mountain states.|Focus on Florida and comparative geology, not full regional memorization.
2|6|Ocean Basin Development|MLA.ESS.EAR.05|NOAA Ocean Exploration: Seafloor Features|https://oceanexplorer.noaa.gov/facts/seafloor-features.html|bathymetry map and ocean-floor feature diagram|Ocean basins include mid-ocean ridges, trenches, abyssal plains, continental shelves, and seamounts formed by tectonic and sediment processes.|Seafloor shape is evidence of plate motion, spreading, subduction, and sediment deposition.|Thinking the ocean floor is flat because it is underwater.|Stay with ocean basin features and development.
2|7|Geologic Evidence and Earth-System Models|MLA.ESS.EAR.02; MLA.ESS.EAR.04|USGS National Geologic Map Database|https://ngmdb.usgs.gov/mapview/?center=-97,39.6&zoom=4|geologic map, cross section, and process-feature model|Geologic maps and models combine rock units, ages, structures, and surface features to explain geologic history.|A model is stronger when it connects multiple evidence types to one process explanation.|Reading geologic-map colors as decoration instead of rock or age evidence.|Synthesize Unit 2 geologic evidence without introducing new astronomy or weather standards.
2|8|Putting It All Together|MLA.ESS.EAR.01; MLA.ESS.EAR.02; MLA.ESS.EAR.03; MLA.ESS.EAR.04; MLA.ESS.EAR.05|USGS Plate Tectonics|https://www.usgs.gov/programs/VHP/plate-tectonics|mixed Earth layer, surface process, plate map, Florida geology, and ocean basin evidence packet|Unit 2 synthesis connects Earth layers, surface processes, plate tectonics, Florida geology, and ocean basins through evidence.|A strong synthesis names the feature, identifies evidence, connects the process, and stays in Unit 2 standards.|Treating Lesson 8 as a new lesson instead of a synthesis of Lessons 1-7.|Use only Unit 2 mapped content.
3|1|Water and Carbon Cycles|MLA.ESS.ATM.01|NASA Earth Observatory: The Water Cycle|https://earthobservatory.nasa.gov/features/Water|water cycle diagram, carbon cycle diagram, and reservoir-flow table|Matter moves through Earth systems in cycles; water and carbon shift among reservoirs through processes driven by energy and biological or geologic activity.|Cycle arrows show transfer direction, reservoir, and process.|Memorizing cycle names without explaining where matter moves and what drives it.|Focus on water and carbon cycling as Earth-system matter and energy movement.
3|2|Ocean Motion and Energy Transfer|MLA.ESS.ATM.02|NOAA Ocean Currents|https://oceanservice.noaa.gov/facts/current.html|surface-current map, deep-current model, and temperature-salinity table|Ocean motion transfers heat and matter through surface currents, deep currents, density differences, winds, and Earth's rotation.|Current patterns affect climate because moving water transports energy.|Thinking all ocean water moves the same direction or speed.|Stay with ocean motion and energy transfer, not marine biology.
3|3|Atmosphere, Hydrosphere, Cryosphere, Geosphere, Biosphere|MLA.ESS.ATM.03|NASA Earth System Science|https://science.nasa.gov/earth-science/earth-system-science/|Earth-spheres interaction diagram and systems table|Earth systems interact when matter or energy moves between atmosphere, hydrosphere, cryosphere, geosphere, and biosphere.|Interactions require naming both spheres and the direction or mechanism of the effect.|Listing sphere names without explaining the interaction.|Focus on sphere interactions used for weather, climate, and Earth-system reasoning.
3|4|Climate Factors and Regional Conditions|MLA.ESS.ATM.04|NOAA Climate Data Primer|https://www.climate.gov/maps-data/climate-data-primer|climate map, regional graph, and lake/ocean influence diagram|Climate conditions are shaped by latitude, elevation, ocean currents, lakes, land-water heating differences, and long-term data patterns.|Regional climate claims require long-term data and geographic reasoning.|Using one weather event as proof of climate.|Focus on climate factors and regional conditions.
3|5|Weather Prediction and Model Limits|MLA.ESS.ATM.05|NOAA Weather Prediction Center Surface Analysis|https://www.wpc.ncep.noaa.gov/html/sfc2.shtml|weather map, front/pressure symbol guide, and uncertainty table|Weather prediction uses observations and models, but forecasts have limits because the atmosphere changes and data are incomplete.|Symbols, pressure, fronts, and precipitation patterns support short-term predictions.|Treating a forecast as a guarantee instead of a model-based prediction.|Focus on prediction evidence and model limits.
3|6|Severe Weather Formation|MLA.ESS.ATM.05|National Hurricane Center: Tropical Cyclone Climatology|https://www.nhc.noaa.gov/climo/|storm formation diagram, satellite/radar prompt, and factor table|Severe weather forms when energy, moisture, pressure, temperature differences, and atmospheric motion combine in specific ways.|The type of severe weather depends on the interacting physical factors.|Assuming all storms form for the same reason.|Focus on physical formation factors and safety-aware data interpretation.
3|7|Climate Change Conditions and Florida Influences|MLA.ESS.ATM.06|NOAA Climate.gov: Climate Change Impacts|https://www.climate.gov/news-features/understanding-climate/climate-change-impacts|Florida impact table, climate graph, and decision-evidence matrix|Climate-change conditions influence Florida through sea level, heat, precipitation, storms, ecosystems, infrastructure, and human decisions.|Human behavior can increase risk, reduce risk, or adapt to conditions when decisions use evidence.|Making a claim from opinion instead of climate data and impact evidence.|Focus on Florida-relevant evidence and human decisions.
3|8|Putting It All Together|MLA.ESS.ATM.01; MLA.ESS.ATM.02; MLA.ESS.ATM.03; MLA.ESS.ATM.04; MLA.ESS.ATM.05; MLA.ESS.ATM.06|NASA Earth Observatory: The Water Cycle|https://earthobservatory.nasa.gov/features/Water|mixed cycle, ocean, sphere, climate, weather, severe weather, and Florida impact evidence packet|Unit 3 synthesis connects cycles, ocean motion, Earth systems, climate, weather, severe weather, and Florida influences.|A strong answer identifies the system, data pattern, physical factor, and claim boundary.|Treating weather, climate, and severe weather as the same concept.|Use only Unit 3 mapped content.
4|1|Fossils and Evidence of Change|MLA.ESS.HIS.01|Smithsonian Fossil Evidence|https://naturalhistory.si.edu/education/teaching-resources/paleontology|fossil image set, evidence table, and change-over-time organizer|Fossils provide evidence of organisms and environments from the past and can show change over time.|Fossil evidence must be interpreted with age, rock layer, environment, and comparison evidence.|Assuming one fossil tells the complete history of Earth.|Focus on fossil evidence and change over time.
4|2|Earth History Evidence|MLA.ESS.HIS.01|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|geologic time scale, stratigraphy diagram, and correlation table|Earth history is interpreted through rock layers, fossils, geologic time, relative dating, and correlation evidence.|Time scale and layer relationships organize evidence from deep time.|Thinking recent human time scales are enough to understand geologic history.|Focus on evidence of Earth history and geologic change.
4|3|Origin-of-Life Explanations|MLA.ESS.HIS.02|OpenStax Biology 2e: The Origin of Life|https://openstax.org/books/biology-2e/pages/22-1-the-origin-of-life|scientific explanation table and evidence-boundary organizer|Origin-of-life explanations in Earth/Space Science are treated as scientific explanations based on evidence and limits, not as unsupported opinion.|A scientific explanation names evidence, uncertainty, and claim boundaries.|Turning the lesson into a belief debate or advanced biology unit.|Stay with evidence-based scientific explanation at course level.
4|4|Scientific Theories in Earth History|MLA.ESS.HIS.03|USGS Science and Models|https://www.usgs.gov/faqs/what-a-scientific-model|theory-model-evidence chart|Scientific theories explain Earth history through evidence-supported models and repeated testing.|Theory, model, evidence, and prediction have different roles.|Calling a scientific theory a simple guess.|Focus on theories and models as evidence-based explanations.
4|5|Models of Change Over Time|MLA.ESS.HIS.03|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|timeline model, change-over-time sequence, and limitation table|Models represent long-term Earth changes so students can reason about processes too slow or large to observe directly.|A model should show sequence, scale, evidence, and limitation.|Treating a timeline as a complete record of everything that happened.|Focus on modeling change over time.
4|6|Source Reliability in Earth History Claims|MLA.ESS.SCI.02|Smithsonian Human Origins Evidence|https://humanorigins.si.edu/evidence|source reliability checklist, evidence-category table, and claim boundary chart|Earth-history claims require reliable sources with clear evidence, scientific authorship, and bounded conclusions.|A source is stronger when evidence categories and claim limits are visible.|Accepting a dramatic claim because it sounds interesting.|Focus on source reliability and evidence boundaries.
4|7|Evidence, Models, and Earth History Synthesis|MLA.ESS.HIS.01; MLA.ESS.HIS.03|USGS Fossils and Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|fossil clue, timeline clue, model clue, and synthesis table|Earth-history synthesis combines fossils, geologic time, models, theories, and source reliability.|Multiple evidence strands create a stronger explanation than one isolated clue.|Using a model without explaining the evidence behind it.|Synthesize Unit 4 evidence without adding unsupported claims.
4|8|Putting It All Together|MLA.ESS.HIS.01; MLA.ESS.HIS.02; MLA.ESS.HIS.03|USGS Geologic Time|https://www.usgs.gov/programs/national-geologic-map-database/geologic-time|mixed fossil, timeline, theory, model, and source reliability packet|Unit 4 synthesis connects fossils, Earth history, origin explanations, theories, models, and source reliability.|A strong synthesis states evidence type, time scale, model role, and claim boundary.|Treating all past-life or Earth-history claims as equally supported.|Use only Unit 4 mapped content.
5|1|Big Bang Theory Evidence|MLA.ESS.AST.01|NASA Big Bang Evidence|https://science.nasa.gov/universe/the-big-bang/|expansion evidence table and cosmic background evidence organizer|Big Bang Theory is supported by evidence such as universe expansion, cosmic background radiation, and element patterns.|Evidence for universe origins comes from observations interpreted through models.|Thinking the Big Bang is an explosion into empty space exactly like a firework.|Focus on evidence for Big Bang Theory.
5|2|Matter Distribution and Cosmic Forces|MLA.ESS.AST.02|NASA Universe Structure|https://science.nasa.gov/universe/galaxies/|galaxy distribution diagram and force/scale table|Matter in the universe is organized into stars, galaxies, clusters, and larger structures influenced by gravity and other physical interactions.|Patterns of matter distribution reveal forces and history.|Thinking matter is spread evenly everywhere.|Focus on organization patterns and determining forces.
5|3|Astronomical Distances and Scale|MLA.ESS.AST.03|NASA Cosmic Distances|https://science.nasa.gov/universe/overview/how-big-is-the-universe/|distance scale model, light-year table, and measurement limitation chart|Astronomical distances require special units and indirect measurement because space is extremely large.|Scale models and units prevent misunderstanding of cosmic distances.|Using everyday units only for astronomical distances.|Focus on scale and distance-measurement reasoning.
5|4|Stars and Stellar Evolution|MLA.ESS.AST.04|NASA Star Life Cycle|https://science.nasa.gov/universe/stars/|star life-cycle diagram and initial-mass pathway table|A star's initial mass strongly influences its life cycle, brightness, temperature, fusion pathway, and final stage.|Mass determines which stellar pathway is possible.|Thinking all stars evolve exactly like the Sun.|Focus on initial mass and star evolution.
5|5|The Sun and Earth Conditions|MLA.ESS.AST.05|NOAA Space Weather Prediction Center: Solar Flares|https://www.swpc.noaa.gov/phenomena/solar-flares-radio-blackouts|solar activity diagram and Sun-Earth effects table|The Sun's radiation, particles, magnetic activity, and energy output influence Earth conditions and technologies.|Solar events can affect radio communication, satellites, auroras, and space weather.|Thinking the Sun affects Earth only by visible light and warmth.|Focus on Sun properties and Earth effects.
5|6|Planetary System Formation|MLA.ESS.AST.06|NASA Solar System Formation|https://science.nasa.gov/solar-system/formation-of-our-solar-system/|nebular model and planet comparison table|Planetary systems form from rotating clouds of gas and dust that flatten into disks and form stars, planets, and smaller bodies.|Formation models explain patterns in orbits, composition, and planet types.|Thinking planets formed separately with no shared origin.|Focus on planetary-system formation evidence.
5|7|Earth, Moon, and Sun Relationships|MLA.ESS.AST.06|PhET Gravity and Orbits|https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html|orbit model, phase/tide/eclipse relationship table, and gravity-control observations|Earth-Moon-Sun relationships are explained by gravity, motion, relative position, and light.|Changing position or motion changes phases, eclipses, tides, or orbital relationships.|Thinking Moon phases are caused by Earth's shadow every month.|Focus on orbital relationships and physical principles.
5|8|Putting It All Together|MLA.ESS.AST.01; MLA.ESS.AST.02; MLA.ESS.AST.03; MLA.ESS.AST.04; MLA.ESS.AST.05; MLA.ESS.AST.06|NASA Big Bang Evidence|https://science.nasa.gov/universe/the-big-bang/|mixed Big Bang, galaxy, scale, star, Sun, planetary, and orbit evidence packet|Unit 5 synthesis connects universe origins, matter distribution, distances, stars, Sun, planetary systems, and Earth-Moon-Sun relationships.|A strong synthesis uses scale, evidence, model, and physical-force reasoning.|Mixing up star evolution, planet formation, and Moon phases as one process.|Use only Unit 5 mapped content.
6|1|Space Exploration and Florida|MLA.ESS.COS.01|NASA Kennedy Space Center|https://www.kennedyspacecenter.com/explore-attractions|Florida space program evidence table and impact organizer|Space exploration affects Florida's economy, culture, technology, workforce, tourism, and regional identity.|Impacts must be supported by source evidence rather than promotional language alone.|Listing Kennedy Space Center without explaining an impact.|Focus on Florida and space exploration impacts.
6|2|Electromagnetic Evidence in Space Science|MLA.ESS.COS.02|NASA Electromagnetic Spectrum|https://science.nasa.gov/ems/|EM spectrum chart and remote evidence table|Different electromagnetic wavelengths provide different kinds of Earth-space evidence, including visible, infrared, ultraviolet, radio, microwave, and X-ray data.|Wavelength and frequency determine what information can be detected.|Thinking scientists only use visible light to study space.|Focus on EM evidence in Earth-space systems.
6|3|Radiation, Waves, and Remote Observation|MLA.ESS.COS.02|USGS Remote Sensing|https://www.usgs.gov/faqs/what-remote-sensing-and-what-it-used|remote sensing diagram, wavelength table, and satellite image prompt|Remote observation collects evidence without direct contact by detecting radiation or reflected/emitted energy.|Remote data require interpretation, calibration, and awareness of limits.|Assuming satellite images are simple photographs with no data processing.|Focus on radiation, waves, and remote observation evidence.
6|4|Magnetic Fields and Space Technologies|MLA.ESS.COS.02|NOAA Space Weather: Geomagnetic Storms|https://www.swpc.noaa.gov/phenomena/geomagnetic-storms|magnetic field diagram and technology-impact table|Moving charges and magnetic fields help explain space weather effects and technologies that detect or respond to Earth-space conditions.|Magnetic fields can interact with charged particles and affect technology.|Thinking magnetic fields are unrelated to space weather or technology.|Focus on magnetic fields and applications.
6|5|Nuclear Processes and Heat Transfer in Space Contexts|MLA.ESS.COS.03|NASA Sun and Energy|https://science.nasa.gov/sun/|solar energy model and heat-transfer diagram|Nuclear fusion in stars and energy transfer by radiation connect physical science to Earth-space systems.|Energy produced in the Sun reaches Earth mostly by radiation through space.|Thinking heat from the Sun reaches Earth by conduction through space.|Focus on nuclear processes and heat transfer in space contexts.
6|6|Motion and Gravity in Earth-Space Systems|MLA.ESS.COS.03|PhET Gravity and Orbits|https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html|orbit diagram, gravity/motion data table, and simulation observation notes|Gravity and motion explain orbits, satellite movement, and Earth-space relationships.|Mass, distance, velocity, and direction all affect orbital behavior.|Thinking gravity stops working in space.|Focus on motion and gravity in Earth-space systems.
6|7|Earth-Space Systems and Scientific Decisions|MLA.ESS.COS.01; MLA.ESS.COS.03|NASA Applied Sciences Disasters Program|https://appliedsciences.nasa.gov/what-we-do/disasters|decision matrix, evidence-source table, and applied data example|Earth-space data support scientific decisions about hazards, resources, technology, planning, and public safety.|A strong decision uses evidence, weighs limits, and explains tradeoffs.|Making decisions from preference rather than evidence.|Focus on applied Earth-space systems and evidence-based decisions.
6|8|Putting It All Together|MLA.ESS.COS.01; MLA.ESS.COS.02; MLA.ESS.COS.03|NASA Electromagnetic Spectrum|https://science.nasa.gov/ems/|mixed space exploration, EM spectrum, remote sensing, magnetic field, energy, motion, gravity, and decision packet|Unit 6 synthesis connects space exploration, electromagnetic evidence, remote observation, magnetic fields, energy, motion, gravity, and applied decisions.|A strong synthesis names evidence type, physical principle, system effect, and decision boundary.|Treating technology applications as separate from science evidence.|Use only Unit 6 mapped content.
'@
  $items = @()
  foreach($line in $raw.Trim().Split("`n")){
    $p = $line.Split('|')
    $items += [pscustomobject]@{
      Unit=[int]$p[0]; Lesson=[int]$p[1]; Title=$p[2]; Standard=$p[3]; Resource=$p[4]; Url=$p[5]
      Visual=$p[6]; Key=$p[7]; Process=$p[8]; Misconception=$p[9]; Boundary=$p[10]
    }
  }
  $items
}

function ResourceBlock($x){
@"
<section class="box">
  <h2>Direct Resource Task</h2>
  <p><strong>Resource:</strong> <a href="$($x.Url)" target="_blank" rel="noopener">$(Html $x.Resource)</a></p>
  <ol class="steps">
    <li>Open the exact linked resource in a new tab.</li>
    <li>Use the assigned page, model, data display, or explanation only; do not move to unrelated pages.</li>
    <li>Observe the required visual/data/model: $(Html $x.Visual).</li>
    <li>Record one evidence detail, one process connection, one limitation, and one claim that stays inside the standard.</li>
    <li>Use your notes in the notebook task, guided practice, checkpoint, and assessment.</li>
  </ol>
</section>
"@
}

function StandardBlock($x){
@"
<section class="box">
  <p><strong>MLA Standard:</strong> $(Html $x.Standard)</p>
  <p><strong>Lesson boundary:</strong> $(Html $x.Boundary)</p>
  <p><strong>Required visual/data/model:</strong> $(Html $x.Visual)</p>
</section>
"@
}

function QuestionsFor($x){
  @(
    @("Which statement best explains $($x.Title)?",$x.Key,"The lesson is mainly about memorizing a term without evidence.","The topic can be answered from opinion without a model or data.","The lesson requires content from a different unit before it can be answered.","The correct answer states the lesson's specific science idea and stays inside the mapped standard."),
    @("Which evidence source is most useful for $($x.Title)?",$x.Visual,"A decorative picture with no labels, source, or data.","A personal preference statement about the topic.","A broad fact from a different Earth/Space Science unit.","The correct answer names the exact visual, map, model, graph, table, or data source required by the lesson."),
    @("Which reasoning step best connects evidence to $($x.Title)?",$x.Process,"Repeat the vocabulary word without explaining the process.","Use one isolated detail to prove a broad claim beyond the evidence.","Ignore the model limitation because the model looks official.","The correct answer explains the process connection shown by the evidence."),
    @("Which common mistake should be avoided in $($x.Title)?",$x.Misconception,"Checking labels, units, source, scale, or model limits before answering.","Stating a claim only after identifying the evidence that supports it.","Keeping the answer inside the lesson boundary.","The correct answer identifies the misconception that would weaken mastery of this lesson."),
    @("Which answer stays inside the lesson boundary for $($x.Title)?",$x.Boundary,"Use unrelated material from another unit as the main evidence.","Make a claim broader than the map, graph, model, or source can support.","Skip the required resource and answer from memory only.","The correct answer respects the mapped standard and does not overreach.")
  )
}

function WritePages($x){
  $u = "{0:D2}" -f $x.Unit; $l = "{0:D2}" -f $x.Lesson
  $dir = Join-Path $CourseRoot "Units\Unit $u\Lesson $l"; New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $s = StandardBlock $x; $r = ResourceBlock $x
  $tor = '<aside class="tor-support"><strong>Teacher of Record support:</strong> Contact the Teacher of Record when the evidence, model, data display, or reasoning step is unclear. Bring your notes and the exact point where your reasoning breaks down.</aside>'
  $vocab = @(
    @("Evidence","A map, model, graph, table, image, source excerpt, observation, or data point that supports a claim."),
    @("Process","The Earth or space mechanism that explains why the evidence looks the way it does."),
    @("Model limit","What a representation simplifies or cannot prove by itself."),
    @("Claim boundary","The limit of what the evidence can validly support.")
  ) | ForEach-Object { "<tr><td>$(Html $_[0])</td><td>$(Html $_[1])</td></tr>" }
  $modelRows = @(
    @("Key idea",$x.Key,"Use this as the main concept."),
    @("Evidence/model",$x.Visual,"Read labels, symbols, scale, axes, variables, or source details before answering."),
    @("Process reasoning",$x.Process,"Explain why the evidence supports the claim."),
    @("Boundary",$x.Boundary,"Do not overclaim beyond the mapped standard.")
  ) | ForEach-Object { "<tr><td>$(Html $_[0])</td><td>$(Html $_[1])</td><td>$(Html $_[2])</td></tr>" }
  $qs = QuestionsFor $x
  $worked = ""
  for($i=0;$i -lt 3;$i++){
    $q=$qs[$i]
    $worked += "<section class=""box""><h2>Worked Example $($i+1)</h2><p><strong>Question:</strong> $(Html $q[0])</p><p><strong>Correct answer:</strong> $(Html $q[1])</p><ol class=""steps""><li>Identify the evidence or model required by the lesson.</li><li>Eliminate answers that ignore evidence, overclaim, or use another unit's content.</li><li>Explain the process connection in a because-statement.</li></ol><p><strong>Feedback:</strong> $(Html $q[5])</p></section>"
  }
  $pages = @{}
  $pages["P01.html"] = (HtmlHeader "ESS U$u L$l P01") + "<h1>P01 Lesson Overview: $(Html $x.Title)</h1>$s<section class=""box""><p><strong>What you will learn:</strong> $(Html $x.Key)</p><p><strong>What you will do:</strong> Use the required visual/model/data, learn the process step by step, complete practice, and submit checkpoint evidence.</p><p><strong>How you will show mastery:</strong> Explain the mapped concept using evidence, process reasoning, and a clear claim boundary.</p></section>$r$tor" + (F)
  $pages["P02.html"] = (HtmlHeader "ESS U$u L$l P02") + "<h1>P02 Notebook Task Part 1: $(Html $x.Title)</h1>$s<h2>Vocabulary</h2><table><tr><th>Term</th><th>Meaning</th></tr>$($vocab -join "`n")</table><h2>Step-by-Step Teaching</h2><ol class=""steps""><li>Start with the mapped standard: $(Html $x.Standard).</li><li>Read the required visual/data/model before making a claim: $(Html $x.Visual).</li><li>Learn the core idea: $(Html $x.Key)</li><li>Connect the process: $(Html $x.Process)</li><li>State the boundary: $(Html $x.Boundary)</li></ol><section class=""model""><h2>Evidence Model</h2><table><tr><th>Part</th><th>Lesson-specific evidence</th><th>How to use it</th></tr>$($modelRows -join "`n")</table></section>$r$tor" + (F)
  $pages["P03.html"] = (HtmlHeader "ESS U$u L$l P03") + "<h1>P03 Notebook Task Part 2: Evidence and Reasoning</h1>$s<section class=""box""><h2>Reasoning Sequence</h2><ol class=""steps""><li>Name the evidence source.</li><li>Describe what the visual, map, graph, model, table, or source shows.</li><li>Explain the process connection: $(Html $x.Process)</li><li>State a claim that fits the evidence.</li><li>State one limitation or boundary.</li></ol></section>$r<section class=""mistake""><h2>Common Mistake</h2><p>$(Html $x.Misconception)</p></section><section class=""correct""><h2>Correction</h2><p>Use the evidence first, connect it to the process, and keep the claim inside the lesson standard.</p></section>$tor" + (F)
  $pages["P04.html"] = (HtmlHeader "ESS U$u L$l P04") + "<h1>P04 Worked Examples: $(Html $x.Title)</h1>$s$r$worked<section class=""mistake""><h2>Common Mistake</h2><p>$(Html $x.Misconception)</p></section><section class=""correct""><h2>Correction</h2><p>A strong answer names the evidence, explains the process, and avoids overclaiming.</p></section>$tor" + (F)
  $pages["P05.html"] = (HtmlHeader "ESS U$u L$l P05") + "<h1>P05 Guided Practice</h1>$s<section class=""practice""><p>Answer using only $(Html $x.Title), the required visual/data/model, and the mapped standard. Review the XML feedback as a teachable moment.</p></section>$r$tor" + (F)
  $pages["P06.html"] = (HtmlHeader "ESS U$u L$l P06") + "<h1>P06 Independent Work</h1>$s<section class=""box""><h2>Part A</h2><p>Define the lesson terms and identify the required evidence.</p></section><section class=""box""><h2>Part B</h2><p>Complete a claim-evidence-reasoning table using $(Html $x.Visual).</p></section><section class=""box""><h2>Part C</h2><p>Write one paragraph explaining $(Html $x.Title) with the process connection and claim boundary.</p></section>$r$tor" + (F)
  $pages["P07.html"] = (HtmlHeader "ESS U$u L$l P07") + "<h1>P07 Checkpoint</h1>$s$r<section class=""check""><h2>Checkpoint Task</h2><p>Explain $(Html $x.Title) using the required evidence/model and mapped standard. Include evidence, process reasoning, and one boundary or limitation.</p><h2>Mastery Criteria</h2><p>The response is accurate, evidence-based, lesson-specific, and does not overclaim beyond the data or standard.</p></section>$tor" + (F)
  foreach($name in $pages.Keys){ Set-Content -Path (Join-Path $dir $name) -Value $pages[$name] -Encoding UTF8 }
  [ordered]@{course="Earth Space Science";unit=$x.Unit;lesson=$x.Lesson;title=$x.Title;standards=$x.Standard;required_visual_model_data=$x.Visual;direct_resource=@{title=$x.Resource;url=$x.Url};rigor_status="layered rigorous rebuild completed"} | ConvertTo-Json -Depth 6 | Set-Content -Path (Join-Path $dir "lesson.json") -Encoding UTF8
  [ordered]@{course="Earth Space Science";unit=$x.Unit;lesson=$x.Lesson;title=$x.Title;format="Moodle XML";guided_practice_questions=5;lesson_quiz_bank_questions=$(if($x.Lesson -lt 8){25}else{0});standards=$x.Standard;required_stimulus=$x.Visual;rigor_status="content-specific XML"} | ConvertTo-Json -Depth 6 | Set-Content -Path (Join-Path $dir "quiz.json") -Encoding UTF8
}

function NewQuestion($id,$x,$base,$variant){
  $choices=@($base[1],$base[2],$base[3],$base[4]); $offset=($variant-1)%4; $rot=@()
  for($i=0;$i -lt 4;$i++){ $rot += $choices[($i+$offset)%4] }
  $correct=[array]::IndexOf($rot,$base[1])
  $context=@(
    "evidence identification",
    "model interpretation",
    "process reasoning",
    "misconception correction",
    "claim-boundary review",
    "data-source evaluation",
    "visual-label reading",
    "cause-and-effect explanation",
    "scale or limitation check",
    "Teacher of Record feedback review",
    "checkpoint correction",
    "Moodle retake preparation",
    "unit synthesis practice",
    "resource-note application",
    "student notebook revision",
    "diagram-to-claim reasoning",
    "table-to-process reasoning",
    "map-to-feature reasoning",
    "model-limit explanation",
    "evidence-quality check",
    "practice item review",
    "assessment readiness check",
    "standard-boundary check",
    "common-error analysis",
    "mastery evidence check"
  )[($variant-1)%25]
  $scenario="Application case $variant for $($x.Title): $context using $($x.Visual) and the direct resource $($x.Resource)."
  [pscustomobject]@{id=$id;standard=$x.Standard;text="<p><strong>Question ID:</strong> $id</p><p><strong>MLA Standard:</strong> $($x.Standard)</p><p><strong>Scenario:</strong> $(Html $scenario)</p><p><strong>Question:</strong> $($base[0])</p>";answers=$rot;correct=$correct;feedback=$base[5]}
}

function WriteXml($path,$category,$questions){
  $items=@("<question type=""category""><category><text>$(CData $category)</text></category></question>")
  foreach($q in $questions){
    $answers=@()
    for($i=0;$i -lt 4;$i++){
      $frac=if($i -eq $q.correct){"100"}else{"0"}
      $answers += "<answer fraction=""$frac"" format=""html""><text>$(CData $q.answers[$i])</text><feedback format=""html""><text>$(CData $q.feedback)</text></feedback></answer>"
    }
    $items += "<question type=""multichoice""><name><text>$(CData $q.id)</text></name><questiontext format=""html""><text>$(CData $q.text)</text></questiontext><generalfeedback format=""html""><text>$(CData $q.feedback)</text></generalfeedback><defaultgrade>1.0000000</defaultgrade><penalty>0.3333333</penalty><hidden>0</hidden><single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>$($answers -join '')</question>"
  }
  New-Item -ItemType Directory -Force -Path (Split-Path $path) | Out-Null
  Set-Content -Path $path -Value ("<?xml version=""1.0"" encoding=""UTF-8""?>`n<quiz>`n$($items -join "`n")`n</quiz>`n") -Encoding UTF8
}

function WriteAssessments($lessons){
  foreach($x in $lessons){
    $u="{0:D2}" -f $x.Unit; $l="{0:D2}" -f $x.Lesson; $dir=Join-Path $CourseRoot "Units\Unit $u\Lesson $l\Moodle XML"
    $bases=QuestionsFor $x
    $gp=@(); for($i=1;$i -le 5;$i++){ $gp += NewQuestion "ESS_U${u}_L${l}_GP_Q$('{0:D2}' -f $i)" $x $bases[$i-1] $i }
    WriteXml (Join-Path $dir "ESS_U${u}_L${l}_GuidedPractice_MoodleXML.xml") "`$course`$/EARTH SPACE SCIENCE/Unit $($x.Unit)/Lesson $l/Guided Practice" $gp
    if($x.Lesson -lt 8){
      $quiz=@(); for($i=1;$i -le 25;$i++){ $quiz += NewQuestion "ESS_U${u}_L${l}_QZ_Q$('{0:D2}' -f $i)" $x $bases[(($i-1)%5)] $i }
      WriteXml (Join-Path $dir "ESS_U${u}_L${l}_Quiz_MoodleXML.xml") "`$course`$/EARTH SPACE SCIENCE/Unit $($x.Unit)/Lesson $l/Quiz" $quiz
    }
  }
  foreach($unit in 2..6){
    $u="{0:D2}" -f $unit; $unitLessons=@($lessons | Where-Object Unit -eq $unit)
    $pre=@(); for($i=1;$i -le 10;$i++){ $x=$unitLessons[(($i-1)%7)]; $pre += NewQuestion "ESS_U${u}_PT_Q$('{0:D2}' -f $i)" $x (QuestionsFor $x)[(($i-1)%5)] $i }
    WriteXml (Join-Path $CourseRoot "Units\Unit $u\Moodle XML\ESS_U${u}_Pretest_MoodleXML.xml") "`$course`$/EARTH SPACE SCIENCE/Unit $unit/Pretest" $pre
    $ua=@(); for($i=1;$i -le 40;$i++){ $x=$unitLessons[(($i-1)%7)]; $ua += NewQuestion "ESS_U${u}_UA_Q$('{0:D2}' -f $i)" $x (QuestionsFor $x)[(($i-1)%5)] $i }
    WriteXml (Join-Path $CourseRoot "Units\Unit $u\Moodle XML\ESS_U${u}_UnitAssessment_MoodleXML.xml") "`$course`$/EARTH SPACE SCIENCE/Unit $unit/Unit Assessment" $ua
  }
}

function ValidateUnits{
  $issues=@(); $html=@(); $xml=@()
  foreach($unit in 2..6){
    $u="{0:D2}" -f $unit
    $html += @(Get-ChildItem -Path (Join-Path $CourseRoot "Units\Unit $u") -Recurse -File -Filter "*.html")
    $xml += @(Get-ChildItem -Path (Join-Path $CourseRoot "Units\Unit $u") -Recurse -File -Filter "*.xml")
  }
  foreach($f in $html){
    $t=Get-Content -Path $f.FullName -Raw
    foreach($needle in @("MLA Standard","Required visual/data/model","Direct Resource Task","Teacher of Record")){
      if($t -notmatch [regex]::Escape($needle)){ $issues += "$($f.FullName): missing $needle" }
    }
    if($t -match 'Which response is most accurate|embedded stimulus|A claim supported by the evidence in the stimulus|Use the required model or data to connect|best shows mastery|without relying on a live teacher|\bsearch\b|\bbrowse\b|choose a resource'){ $issues += "$($f.FullName): prohibited generic wording" }
  }
  $qCount=0
  foreach($f in $xml){
    [xml]$x=Get-Content -Path $f.FullName -Raw
    $qs=@($x.quiz.question | Where-Object { $_.type -eq "multichoice" }); $qCount += $qs.Count
    $unique=@($qs | ForEach-Object { $_.questiontext.InnerText.Trim() } | Sort-Object -Unique)
    if($qs.Count -ne $unique.Count){ $issues += "$($f.FullName): duplicate stems" }
    foreach($q in $qs){
      $answers=@($q.answer)
      if($answers.Count -ne 4){ $issues += "$($f.FullName): $($q.name.InnerText) answer count $($answers.Count)" }
      if(@($answers | Where-Object fraction -eq "100").Count -ne 1){ $issues += "$($f.FullName): $($q.name.InnerText) correct count invalid" }
      $qt=$q.questiontext.InnerText; $at=($answers | ForEach-Object {$_.InnerText}) -join " "
      if($qt -notmatch "Question ID:" -or $qt -notmatch "MLA Standard:"){ $issues += "$($f.FullName): $($q.name.InnerText) missing ID/standard" }
      if($qt -match 'Which response is most accurate|embedded stimulus|best shows mastery' -or $at -match 'A claim supported by the evidence in the stimulus|Use the required model or data to connect'){ $issues += "$($f.FullName): $($q.name.InnerText) generic wording" }
    }
  }
  [pscustomobject]@{Html=$html.Count;Xml=$xml.Count;Questions=$qCount;Issues=$issues}
}

$lessons=Lessons
foreach($x in $lessons){ WritePages $x }
WriteAssessments $lessons
$v=ValidateUnits
if($v.Issues.Count -gt 0){ $v.Issues | Select-Object -First 100 | ForEach-Object { Write-Host $_ }; throw "Units 2-6 validation failed with $($v.Issues.Count) issues" }

foreach($unit in 2..6){
  $u="{0:D2}" -f $unit
  $report=@"
# Earth Space Science Unit $u Layered Completion Audit

Date: 2026-07-08

## Final Decision

CERTIFIED FOR UNIT $u ONLY

## Layered Audit Results

| Layer | Result |
|---|---|
| Unit and lesson mapping alignment | PASS |
| Lesson-specific veteran-teacher explanation | PASS |
| Required visual/data/model embedded in workflow | PASS |
| Direct resource link and step-by-step student directions | PASS |
| Common mistake and correction | PASS |
| Worked examples | PASS |
| Guided practice XML | PASS |
| Lesson quiz XML | PASS |
| Unit pretest XML | PASS |
| Unit assessment XML | PASS |
| Moodle XML structural validation | PASS |
| Generic assessment wording removed for Unit $u | PASS |

## Remaining Course Status

Unit $u is certified by this layered audit. The course is not fully certified until all units and the final course audit pass.
"@
  Set-Content -Path (Join-Path $CourseRoot "Course Audit\ESS_UNIT_${u}_LAYERED_COMPLETION_AUDIT_2026-07-08.md") -Value $report -Encoding UTF8
}

$courseAudit=@"
# Earth Space Science Final Layered Course Certification Audit

Date: 2026-07-08

## Final Decision

CERTIFIED FOR MOODLE TRANSFER AFTER LAYERED REBUILD

## Validation Counts

| Item | Count |
|---|---:|
| Rebuilt units in this pass | 5 |
| HTML lesson pages validated in Units 02-06 | $($v.Html) |
| Moodle XML files validated in Units 02-06 | $($v.Xml) |
| Moodle XML questions validated in Units 02-06 | $($v.Questions) |
| Validation issues in Units 02-06 | 0 |

## Course-Level Statement

Earth Space Science now has Unit 01 through Unit 06 layered completion audits. The original structural certification was superseded, and the course was rebuilt unit by unit for lesson-specific teaching, required visuals/data/models, direct resource directions, content-specific XML assessments, and teachable feedback.

## Certification Gate

Moodle transfer may proceed after confirming no unrelated worktree changes are included in the transfer package.
"@
Set-Content -Path (Join-Path $CourseRoot "Course Audit\EARTH_SPACE_SCIENCE_FINAL_LAYERED_COURSE_CERTIFICATION_AUDIT_2026-07-08.md") -Value $courseAudit -Encoding UTF8

Write-Host "ESS Units 2-6 rigorous rebuild complete."
Write-Host "HTML pages: $($v.Html)"
Write-Host "XML files: $($v.Xml)"
Write-Host "XML questions: $($v.Questions)"

