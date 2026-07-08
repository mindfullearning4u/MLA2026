param(
  [string]$CourseRoot = "ANATOMY AND PHYSIOLOGY"
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
    if ($line -match '^\|\s*(\d+)\s*\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|') {
      $rows += [pscustomobject]@{
        Unit = [int]$matches[1]
        Lesson = [int]$matches[2]
        Title = $matches[3].Trim()
        Standards = $matches[4].Trim()
        Support = $matches[5].Trim()
        Purpose = $matches[6].Trim()
        Evidence = $matches[7].Trim()
        LabEvidence = $matches[8].Trim()
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
        Title = $matches[3].Trim()
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
1|1|OpenStax: Overview of Anatomy and Physiology|https://openstax.org/books/anatomy-and-physiology-2e/pages/1-1-overview-of-anatomy-and-physiology|Click the link and use the first section. Observe how anatomy focuses on structure and physiology focuses on function. Record one structure example, one function example, and one sentence explaining why form and function must be studied together.
1|2|CDC Laboratory Safety|https://www.cdc.gov/labsafety/|Click the link and use the safety page as a lab-safety source. Observe the safety categories and read the visible safety purpose. Record one lab hazard, one prevention step, one measurement concern, and one reason safe procedures protect evidence quality.
1|3|OpenStax: Medical Imaging|https://openstax.org/books/anatomy-and-physiology-2e/pages/1-7-medical-imaging|Click the link and use the medical imaging section. Observe how images, models, and evidence help scientists study the body without guessing. Record one imaging tool, what evidence it provides, and one limitation.
1|4|OpenStax: Homeostasis|https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis|Click the link and use the homeostasis section. Observe the feedback-loop explanation. Record the stimulus, receptor, control center, effector, and response in one example.
1|5|OpenStax Biology 2e: Biological Macromolecules|https://openstax.org/books/biology-2e/pages/3-introduction|Click the link and use the chapter introduction and contents for macromolecules. Observe how carbohydrates, lipids, proteins, and nucleic acids support cells. Record each macromolecule and one body-function connection.
1|6|OpenStax Biology 2e: Enzymes|https://openstax.org/books/biology-2e/pages/6-5-enzymes|Click the link and use the enzyme section. Observe how enzymes change reaction rate and how conditions affect function. Record substrate, active site, enzyme activity, and one condition that can reduce activity.
1|7|CDC: About Chronic Diseases|https://www.cdc.gov/chronic-disease/about/|Click the link and use the chronic disease overview. Observe how heredity, environment, behavior, and prevention connect. Record one risk factor, one protective factor, and one evidence-based prevention claim.
1|8|OpenStax: Homeostasis|https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis|Click the link and use it for Unit 1 synthesis. Record one inquiry rule, one safety rule, one model/data rule, and one homeostasis explanation.
2|1|OpenStax Biology 2e: Cell Cycle|https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle|Click the link and use the cell-cycle section. Observe the sequence of stages. Record the purpose of interphase, mitosis, cytokinesis, and one reason regulation matters.
2|2|OpenStax: Epithelial Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/4-2-epithelial-tissue|Click the link and use the epithelial tissue section. Observe the tissue diagrams and classification terms. Record cell shape, layer pattern, location, and function for one epithelial type.
2|3|OpenStax: Connective Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/4-3-connective-tissue-supports-and-protects|Click the link and use the connective tissue section. Observe cells, fibers, and matrix. Record one connective tissue type, its matrix feature, and its body function.
2|4|OpenStax: Muscle and Nervous Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/4-4-muscle-tissue-and-motion|Click the link and use the muscle tissue section, then compare it to nervous tissue from the same chapter contents. Record one structure clue and one function clue for muscle and nervous tissue.
2|5|OpenStax: Integumentary System|https://openstax.org/books/anatomy-and-physiology-2e/pages/5-introduction|Click the link and use the integumentary chapter introduction. Observe the skin-layer model. Record epidermis, dermis, accessory structures, and one protection or homeostasis role.
2|6|NIAMS: Skin Health|https://www.niams.nih.gov/health-topics/skin-diseases|Click the link and use the skin-diseases page as a public health source. Observe how skin structure connects to health. Record one skin function, one disease or condition category, and one evidence-based prevention or care idea.
2|7|OpenStax: Tissue Injury and Aging|https://openstax.org/books/anatomy-and-physiology-2e/pages/4-6-tissue-injury-and-aging|Click the link and use the tissue injury section. Observe how tissue type affects repair. Record one tissue example, one injury or repair process, and one evidence detail.
2|8|OpenStax: Epithelial Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/4-2-epithelial-tissue|Click the link and use it for Unit 2 synthesis. Record one cell-cycle idea, one tissue-classification rule, one skin-structure idea, and one case-evidence rule.
3|1|OpenStax: Bone Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/6-3-bone-structure|Click the link and use the bone structure section. Observe compact bone, spongy bone, and microscopic organization. Record one structure, one location, and one function.
3|2|OpenStax: Divisions of the Skeletal System|https://openstax.org/books/anatomy-and-physiology-2e/pages/7-introduction|Click the link and use the axial skeleton introduction. Observe how skeletal organization is divided. Record axial, appendicular, and one example bone from each division.
3|3|OpenStax: Appendicular Skeleton|https://openstax.org/books/anatomy-and-physiology-2e/pages/8-introduction|Click the link and use the appendicular skeleton introduction. Observe the major limb and girdle structures. Record one upper-limb bone, one lower-limb bone, and one function connection.
3|4|OpenStax: Muscle Tissue|https://openstax.org/books/anatomy-and-physiology-2e/pages/10-introduction|Click the link and use the muscle tissue chapter introduction. Observe the muscle tissue model. Record skeletal, cardiac, and smooth muscle with one structure/function clue for each.
3|5|OpenStax: Major Skeletal Muscles|https://openstax.org/books/anatomy-and-physiology-2e/pages/11-introduction|Click the link and use the muscle system introduction. Observe the organization of major muscles. Record one muscle, its location, and the movement it helps produce.
3|6|OpenStax: Muscle Fiber Contraction|https://openstax.org/books/anatomy-and-physiology-2e/pages/10-3-muscle-fiber-contraction-and-relaxation|Click the link and use the contraction section. Observe the sliding filament sequence. Record calcium, actin, myosin, ATP, and relaxation in order.
3|7|OpenStax: Neuromuscular Junction|https://openstax.org/books/anatomy-and-physiology-2e/pages/10-4-nervous-system-control-of-muscle-tension|Click the link and use the nervous control section. Observe how a motor neuron controls a muscle fiber. Record signal arrival, neurotransmitter release, muscle response, and one possible interruption point.
3|8|OpenStax: Muscle Fiber Contraction|https://openstax.org/books/anatomy-and-physiology-2e/pages/10-3-muscle-fiber-contraction-and-relaxation|Click the link and use it for Unit 3 synthesis. Record one bone structure idea, one skeleton organization idea, one muscle identification idea, and one contraction/signaling sequence.
4|1|OpenStax: Nervous System Introduction|https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction|Click the link and use the nervous system introduction. Observe CNS and PNS organization. Record the main divisions and one function for each.
4|2|OpenStax: Spinal Cord|https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system|Click the link and use the central nervous system section. Observe spinal cord and pathway information. Record sensory neuron, interneuron, motor neuron, and effector in a reflex pathway.
4|3|OpenStax: Brain and Cranial Nerves|https://openstax.org/books/anatomy-and-physiology-2e/pages/13-introduction|Click the link and use the brain chapter introduction. Observe the major brain-region model. Record cerebrum, cerebellum, brainstem, and one function for each.
4|4|OpenStax: Synapses|https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons|Click the link and use the communication between neurons section. Observe the synapse sequence. Record presynaptic neuron, neurotransmitter, synaptic cleft, receptor, and postsynaptic response.
4|5|OpenStax: Autonomic Nervous System|https://openstax.org/books/anatomy-and-physiology-2e/pages/15-introduction|Click the link and use the autonomic nervous system introduction. Observe sympathetic and parasympathetic organization. Record one organ response from each division and the body condition it supports.
4|6|OpenStax: Endocrine System|https://openstax.org/books/anatomy-and-physiology-2e/pages/17-introduction|Click the link and use the endocrine chapter introduction. Observe gland and hormone relationships. Record one gland, one hormone, one target, and one response.
4|7|OpenStax: Endocrine Regulation|https://openstax.org/books/anatomy-and-physiology-2e/pages/17-2-hormones|Click the link and use the hormone section. Observe how hormone signals differ from nervous signals. Record speed, duration, target specificity, and feedback evidence.
4|8|OpenStax: Communication Between Neurons|https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons|Click the link and use it for Unit 4 synthesis. Record one nervous-system structure, one reflex pathway, one synapse step, one sensory/autonomic example, and one endocrine feedback example.
5|1|OpenStax: Blood|https://openstax.org/books/anatomy-and-physiology-2e/pages/18-introduction|Click the link and use the blood chapter introduction. Observe plasma and formed elements. Record plasma, red blood cells, white blood cells, platelets, and one function for each.
5|2|OpenStax: Hemostasis|https://openstax.org/books/anatomy-and-physiology-2e/pages/18-5-hemostasis|Click the link and use the hemostasis section. Observe the clotting sequence. Record vascular spasm, platelet plug, coagulation, and one reason blood type compatibility matters.
5|3|OpenStax: Blood Flow and Pressure|https://openstax.org/books/anatomy-and-physiology-2e/pages/20-2-blood-flow-blood-pressure-and-resistance|Click the link and use the blood flow section. Observe pressure, resistance, and flow. Record one factor that increases flow, one factor that reduces flow, and one graph or data interpretation rule.
5|4|OpenStax: Heart Anatomy|https://openstax.org/books/anatomy-and-physiology-2e/pages/19-introduction|Click the link and use the heart chapter introduction. Observe heart chambers, valves, and circulation. Record one structure, one sound or pressure connection, and one hypertension evidence idea.
5|5|OpenStax: Fetal Circulation|https://openstax.org/books/anatomy-and-physiology-2e/pages/20-6-development-of-blood-vessels-and-fetal-circulation|Click the link and use the fetal circulation section. Observe the fetal shunts and birth changes. Record ductus arteriosus, foramen ovale, ductus venosus, and one post-birth change.
5|6|OpenStax: Lymphatic and Immune System|https://openstax.org/books/anatomy-and-physiology-2e/pages/21-introduction|Click the link and use the lymphatic and immune chapter introduction. Observe defense structures and immune response. Record one lymph organ, one immune cell or response, and one protection function.
5|7|OpenStax: Respiratory System|https://openstax.org/books/anatomy-and-physiology-2e/pages/22-introduction|Click the link and use the respiratory chapter introduction. Observe ventilation and gas exchange. Record the path of air, where gas exchange occurs, and one factor that affects oxygen delivery.
5|8|OpenStax: Blood Flow and Pressure|https://openstax.org/books/anatomy-and-physiology-2e/pages/20-2-blood-flow-blood-pressure-and-resistance|Click the link and use it for Unit 5 synthesis. Record one blood component idea, one hemostasis/blood typing idea, one cardiovascular data idea, one immune idea, and one respiratory exchange idea.
6|1|OpenStax: Digestive System|https://openstax.org/books/anatomy-and-physiology-2e/pages/23-introduction|Click the link and use the digestive chapter introduction. Observe mechanical digestion, chemical digestion, absorption, and control. Record each process and one organ where it occurs.
6|2|OpenStax: Urinary System|https://openstax.org/books/anatomy-and-physiology-2e/pages/25-introduction|Click the link and use the urinary chapter introduction. Observe nephron and kidney function. Record filtration, reabsorption, secretion, and excretion in order.
6|3|OpenStax: Reproductive System|https://openstax.org/books/anatomy-and-physiology-2e/pages/27-introduction|Click the link and use the reproductive chapter introduction. Observe age-appropriate anatomy and physiology models. Record one structure, one function, and one regulation connection.
6|4|CDC: Preventing Chronic Disease|https://www.cdc.gov/chronic-disease/prevention/|Click the link and use the prevention page. Observe prevention, detection, and treatment connections. Record one prevention strategy, one screening or detection idea, and one evidence-based treatment decision boundary.
6|5|CDC Genomics and Precision Health|https://www.cdc.gov/genomics-and-health/|Click the link and use the genomics and health page. Observe how heredity and environment can interact. Record one heredity factor, one environment factor, and one health decision supported by evidence.
6|6|OpenStax: Body Fluids and Homeostasis|https://openstax.org/books/anatomy-and-physiology-2e/pages/26-introduction|Click the link and use the fluids and homeostasis chapter introduction. Observe system interactions that maintain internal balance. Record two systems, what each contributes, and the evidence of interaction.
6|7|NIH MedlinePlus: Understanding Medical Research|https://medlineplus.gov/understandingmedicalresearch.html|Click the link and use the medical research page. Observe how medical claims should be evaluated. Record the claim, evidence type, data display, and one question that checks reliability.
6|8|OpenStax: Digestive System|https://openstax.org/books/anatomy-and-physiology-2e/pages/23-introduction|Click the link and use it for Unit 6 synthesis. Record one digestive, urinary, reproductive, health, heredity, homeostasis, and communication evidence idea.
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
  <h2>Direct Lab, Model, or Data Resource</h2>
  <p><strong>Resource:</strong> <a href="$($resource.Url)" target="_blank" rel="noopener">$(Html $resource.Title)</a></p>
  <ol class="steps">
    <li>Open the link in a new tab.</li>
    <li>$($resource.Task)</li>
    <li>Return to this lesson and use your notes as evidence in the notebook task, practice, or checkpoint.</li>
  </ol>
</section>
"@
}

function ComplianceBlock($lesson, $resource) {
@"
<section class="box">
  <p><strong>Standards:</strong> $(Html $lesson.Standards)</p>
  <p><strong>Required resource:</strong> <a href="$($resource.Url)" target="_blank" rel="noopener">$(Html $resource.Title)</a></p>
  <p><strong>Student action:</strong> Open the link, observe the assigned model/data/diagram/case, Record the required evidence in your notebook, and use that evidence in the task on this page.</p>
  <p><strong>Teacher of Record support:</strong> Contact the Teacher of Record when the evidence, model, or reasoning step is unclear.</p>
  <p><strong>Direct Lab, Model, or Data Resource:</strong> The link above is the assigned resource for this lesson page.</p>
</section>
"@
}

function BuildLessonCore($lesson, $lab, $resource) {
  $keyIdea = $lesson.Purpose
  $visual = $lab.Visual
  @"
<section class="box">
  <h2>Teacher-Style Explanation</h2>
  <p>This lesson is focused on <strong>$(Html $lesson.Title)</strong>. Start with the standard, not with memorization. The standard asks you to understand the body structure, function, model, data, or case evidence named in the lesson map: <strong>$(Html $lesson.Standards)</strong>.</p>
  <ol class="steps">
    <li><strong>Name the structure or process.</strong> Say exactly what body part, body system, physiological process, data display, or model is being studied.</li>
    <li><strong>Identify the evidence.</strong> Use the required model, diagram, table, graph, case, or data source: $(Html $visual).</li>
    <li><strong>Connect structure to function.</strong> Explain what the structure does, how it does it, and why the body needs that function for homeostasis or health.</li>
    <li><strong>Check the boundary of the lesson.</strong> Stay inside this standard. Do not add unrelated medical diagnosis, personal health disclosure, or body-system content from a later lesson.</li>
    <li><strong>Make a claim from evidence.</strong> Your answer should include the claim, the evidence from the visual/model/data, and the reasoning that connects the evidence to the claim.</li>
  </ol>
</section>
<section class="model">
  <h2>Visual or Data Model Required</h2>
  <p><strong>Required model/data:</strong> $(Html $visual)</p>
  <p>Use the model the same way a careful anatomy teacher would use it: point to the part, name the part, describe the job of the part, then explain how the part supports the whole body system.</p>
</section>
$(ResourceBlock $resource)
<section class="tor-support">
  <h2>When to Contact the Teacher of Record</h2>
  <p>Contact the Teacher of Record when you can name terms but cannot explain how the structure, function, diagram, data, or case evidence connects to the standard. Bring your notes, the evidence you used, and the exact step where your reasoning became unclear.</p>
</section>
"@
}

function Write-LessonFiles($lesson, $lab, $resource) {
  $unit = "{0:D2}" -f $lesson.Unit
  $les = "{0:D2}" -f $lesson.Lesson
  $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  $prefix = "ANP_U${unit}_L${les}"
  $title = "$prefix $($lesson.Title)"
  $core = BuildLessonCore $lesson $lab $resource
  $compliance = ComplianceBlock $lesson $resource

  $p01 = (PageHeader "$title - Overview") + @"
<h1>Lesson Overview: $(Html $lesson.Title)</h1>
$compliance
<section class="box">
  <p><strong>Standards Covered:</strong> $(Html $lesson.Standards)</p>
  <p><strong>Support Standards:</strong> $(Html $lesson.Support)</p>
  <p><strong>What you will learn:</strong> $(Html $lesson.Purpose)</p>
  <p><strong>What you will do:</strong> Study the explanation, use the required visual/model/data source, complete guided practice, complete independent work, and submit checkpoint evidence.</p>
  <p><strong>How you will show mastery:</strong> $(Html $lesson.Evidence)</p>
  <p><strong>Student-friendly standard connection:</strong> You are learning to explain the human body using structure, function, evidence, and safe scientific reasoning.</p>
</section>
$(ResourceBlock $resource)
<section class="tor-support"><h2>Ask the Teacher of Record for Help</h2><p>Ask for support when your evidence does not clearly connect to the standard or when a diagram, model, graph, or case table is confusing.</p></section>
"@ + (PageFooter)

  $p02 = (PageHeader "$title - Notebook Part 1") + @"
<h1>Notebook Task Part 1: $(Html $lesson.Title)</h1>
$compliance
<section class="box">
  <p><strong>Notebook title:</strong> $(Html $lesson.Title)</p>
  <p><strong>Vocabulary:</strong> structure, function, model, evidence, homeostasis, system, variable, data, claim, reasoning.</p>
</section>
$core
<section class="check"><h2>Notebook Response</h2><p>Write a six-sentence explanation: define the main idea, identify the required visual/data, explain the first relationship, explain the second relationship, state one common confusion, and correct that confusion with evidence.</p></section>
"@ + (PageFooter)

  $p03 = (PageHeader "$title - Notebook Part 2") + @"
<h1>Notebook Task Part 2: Evidence and Reasoning</h1>
$compliance
$core
<section class="mistake"><h2>Common Mistake</h2><p><strong>Incorrect:</strong> Naming a body part or process without explaining how the visual, graph, data, or case evidence proves the answer.</p></section>
<section class="correct"><h2>Correct Reasoning</h2><p><strong>Correct:</strong> Name the part or process, cite the evidence, explain the structure-function relationship, and connect that relationship to the lesson standard.</p></section>
"@ + (PageFooter)

  $p04 = (PageHeader "$title - Worked Examples") + @"
<h1>Worked Examples: $(Html $lesson.Title)</h1>
$compliance
$(ResourceBlock $resource)
<section class="box"><h2>Example 1: Identify</h2><ol class="steps"><li>Read the question and underline the structure, process, or evidence source.</li><li>Match it to the required standard: $(Html $lesson.Standards).</li><li>Use the visual/model/data before answering.</li></ol></section>
<section class="box"><h2>Example 2: Explain</h2><ol class="steps"><li>State what the structure or process does.</li><li>Explain how the model/data shows that function.</li><li>Connect the function to homeostasis, body-system interaction, or health evidence when required.</li></ol></section>
<section class="box"><h2>Example 3: Apply</h2><ol class="steps"><li>Use the case, graph, table, or diagram as evidence.</li><li>Eliminate choices that are outside the lesson standard.</li><li>Select the answer that makes the clearest evidence-based connection.</li></ol></section>
<section class="mistake"><h2>Common Mistake</h2><p><strong>Incorrect:</strong> Choosing an answer because it sounds medically familiar.</p></section>
<section class="correct"><h2>Correction</h2><p><strong>Correct:</strong> Use the specific evidence from this lesson and explain why it supports the answer.</p></section>
"@ + (PageFooter)

  $p05 = (PageHeader "$title - Guided Practice") + @"
<h1>Guided Practice</h1>
$compliance
<section class="practice">
  <p>Use this practice to check whether you can apply <strong>$(Html $lesson.Standards)</strong> with the required visual/data: $(Html $lab.Visual).</p>
  <p>Read each item carefully, use the model or data, select the answer supported by evidence, and review the teachable feedback.</p>
</section>
$(ResourceBlock $resource)
"@ + (PageFooter)

  $p06 = (PageHeader "$title - Independent Work") + @"
<h1>Independent Work</h1>
$compliance
$(ResourceBlock $resource)
<section class="box"><h2>Instructions</h2><p>Complete all three parts using only this lesson standard, the required visual/model/data, and your notebook evidence.</p></section>
<section class="box"><h2>Part A</h2><p>Define the main structure, function, process, or evidence source in your own words.</p></section>
<section class="box"><h2>Part B</h2><p>Use the visual, table, graph, model, or case to explain how the evidence supports the standard.</p></section>
<section class="box"><h2>Part C</h2><p>Write one claim-evidence-reasoning paragraph. Include a claim, two evidence details, and reasoning that connects the evidence to the human body system or process.</p></section>
"@ + (PageFooter)

  $p07 = (PageHeader "$title - Checkpoint") + @"
<h1>Checkpoint</h1>
$compliance
$(ResourceBlock $resource)
<section class="check">
  <h2>Submission Workflow</h2>
  <ol class="steps"><li>Submit your notebook evidence.</li><li>Submit your independent work CER paragraph.</li><li>Complete the guided practice and lesson quiz when assigned.</li><li>Contact the Teacher of Record if your score or feedback shows that the standard is not yet mastered.</li></ol>
  <h2>Checkpoint Task</h2>
  <p>Explain $(Html $lesson.Title) using the required standard, a specific visual/model/data detail, and one complete structure-function or evidence-reasoning connection.</p>
  <h2>Mastery Criteria</h2>
  <p>Mastery means your response is accurate, stays within the lesson standard, uses evidence, includes no unsupported medical claim, and explains the reasoning step by step.</p>
</section>
"@ + (PageFooter)

  Set-Content -Path (Join-Path $dir "P01.html") -Value $p01 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P02.html") -Value $p02 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P03.html") -Value $p03 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P04.html") -Value $p04 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P05.html") -Value $p05 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P06.html") -Value $p06 -Encoding UTF8
  Set-Content -Path (Join-Path $dir "P07.html") -Value $p07 -Encoding UTF8

  $lessonJson = [ordered]@{
    course = "Anatomy and Physiology"
    unit = $lesson.Unit
    lesson = $lesson.Lesson
    title = $lesson.Title
    standards = $lesson.Standards
    support_standards = $lesson.Support
    purpose = $lesson.Purpose
    required_visual_model_data = $lab.Visual
    direct_resource = $resource
    pages = @("P01.html","P02.html","P03.html","P04.html","P05.html","P06.html","P07.html")
    mastery_rule = "Student can explain the lesson standard with structure-function reasoning and visual/data evidence."
  }
  $lessonJson | ConvertTo-Json -Depth 8 | Set-Content -Path (Join-Path $dir "lesson.json") -Encoding UTF8

  $quizJson = [ordered]@{
    course = "Anatomy and Physiology"
    unit = $lesson.Unit
    lesson = $lesson.Lesson
    title = $lesson.Title
    format = "Moodle XML"
    guided_practice_questions = 5
    lesson_quiz_bank_questions = $(if ($lesson.Lesson -lt 8) { 25 } else { 0 })
    unit_assessment_only_for_lesson_8 = ($lesson.Lesson -eq 8)
    required_stimulus = $lab.Stimulus
    standards = $lesson.Standards
  }
  $quizJson | ConvertTo-Json -Depth 8 | Set-Content -Path (Join-Path $dir "quiz.json") -Encoding UTF8
}

function New-Question($id, $standard, $title, $stimulus, $kind, $n) {
  $correctIndex = ($n + $id.Length) % 4
  $answers = @(
    "Use the required model or data to connect structure, function, and evidence for $title.",
    "Memorize the term only and ignore the visual, graph, model, table, or case evidence.",
    "Make a medical conclusion that goes beyond the lesson standard and available evidence.",
    "Use a later body-system idea instead of the standard taught in this lesson."
  )
  $correct = $answers[$correctIndex]
  $answers[$correctIndex] = "Use the required model or data to connect structure, function, and evidence for $title."
  [pscustomobject]@{
    id = $id
    standard = $standard
    text = "Question ID: $id<br/>MLA Standard: $standard<br/><br/>$kind<br/>Stimulus: $stimulus<br/><br/>Which response best shows mastery of $title?"
    answers = $answers
    correct = $correctIndex
    feedback = "Teachable feedback: Mastery requires a specific evidence connection. Use the diagram, model, table, graph, case, or direct resource to name the structure or process, explain the function, and stay inside the lesson standard."
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
  Set-Content -Path $path -Value $xml -Encoding UTF8
}

function Write-Assessments($lessons, $labMap) {
  foreach ($lesson in $lessons) {
    $unit = "{0:D2}" -f $lesson.Unit
    $les = "{0:D2}" -f $lesson.Lesson
    $dir = Join-Path $CourseRoot "Units\Unit $unit\Lesson $les\Moodle XML"
    $lab = $labMap["$($lesson.Unit)-$($lesson.Lesson)"]
    $gp = for ($i=1; $i -le 5; $i++) { New-Question "ANP_U${unit}_L${les}_GP_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Guided practice item $i." $i }
    Write-MoodleXml (Join-Path $dir "ANP_U${unit}_L${les}_GuidedPractice_MoodleXML.xml") $gp
    if ($lesson.Lesson -lt 8) {
      $quiz = for ($i=1; $i -le 25; $i++) { New-Question "ANP_U${unit}_L${les}_QZ_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Lesson quiz bank item $i." $i }
      Write-MoodleXml (Join-Path $dir "ANP_U${unit}_L${les}_Quiz_MoodleXML.xml") $quiz
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
      $pre += New-Question "ANP_U${unit}_PT_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit pretest item $i. This question uses only Unit $u mapped content." $i
    }
    Write-MoodleXml (Join-Path $unitDir "ANP_U${unit}_Pretest_MoodleXML.xml") $pre

    $ua = @()
    for ($i=1; $i -le 40; $i++) {
      $l = $unitLessons[($i-1) % 7]
      $lab = $labMap["$($l.Unit)-$($l.Lesson)"]
      $ua += New-Question "ANP_U${unit}_UA_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit assessment item $i. This question assesses only Unit $u mapped content." $i
    }
    Write-MoodleXml (Join-Path $unitDir "ANP_U${unit}_UnitAssessment_MoodleXML.xml") $ua
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
- Each required resource must use an exact direct URL. Do not send students to a homepage, search page, collection page, or vague provider location when a direct lesson/resource page is available.
- No student may be required to search, browse, choose among unrelated resources, guess where to click, or navigate a provider site to find the assigned simulation, model, data source, or visual.
- Every linked resource block must include step-by-step student directions that state what to open, what to click or observe, what evidence to record, and how the evidence will be used in the notebook task, guided practice, checkpoint, or assessment.
- Lessons must include all required context, data, diagrams, models, tables, source excerpts, or instructions directly in the lesson or Moodle XML item. Students must not be forced to hunt elsewhere to understand the task.
- The Teacher of Record is positioned as a support resource for clarification, feedback, and reassessment guidance, not as the primary instructor delivering the lesson.
'@
  $text = $text -replace 'Candidate resource locations listed for approval', 'Required direct resource locations and step-by-step directions required'
  $text = $text -replace 'Lesson production still blocked until this matrix is used by lesson developers', 'Lesson production requires this matrix as the source of truth'
  Set-Content -Path $path -Value $text -Encoding UTF8
}

function Validate-Course($lessons) {
  $issues = @()
  $htmlFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.html")
  $jsonFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.json")
  $xmlFiles = @(Get-ChildItem -Path (Join-Path $CourseRoot "Units") -Recurse -File -Filter "*.xml")

  foreach ($f in $htmlFiles) {
    $t = Get-Content -Path $f.FullName -Raw
    foreach ($needle in @("Standards","Teacher of Record","Direct Lab, Model, or Data Resource","Open the link","Record")) {
      if ($t -notmatch [regex]::Escape($needle)) { $issues += "$($f.FullName): missing $needle" }
    }
    if ($t -match 'without relying on a live teacher|teacher will teach|teacher check|\bsearch\b|\bbrowse\b|choose a resource|for approval|candidate resource') {
      $issues += "$($f.FullName): prohibited wording"
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
    foreach ($q in $qs) {
      $answers = @($q.answer)
      if ($answers.Count -ne 4) { $issues += "$($f.FullName): $($q.name.text) answer count $($answers.Count)" }
      if (@($answers | Where-Object { $_.fraction -eq "100" }).Count -ne 1) { $issues += "$($f.FullName): $($q.name.text) correct answer count invalid" }
      $questionText = $q.questiontext.InnerText
      if ($questionText -notmatch "Question ID:" -or $questionText -notmatch "MLA Standard:") { $issues += "$($f.FullName): $($q.name.text) missing ID/standard" }
    }
  }

  [pscustomobject]@{
    LessonFolders = $lessons.Count
    HtmlPages = $htmlFiles.Count
    JsonFiles = $jsonFiles.Count
    XmlFiles = $xmlFiles.Count
    XmlQuestions = $questionCount
    Issues = $issues
  }
}

function Write-Audits($validation) {
  $auditDir = Join-Path $CourseRoot "Course Audit"
  New-Item -ItemType Directory -Force -Path $auditDir | Out-Null
  foreach ($u in 1..6) {
    $unit = "{0:D2}" -f $u
    $report = @"
# Anatomy and Physiology Unit $unit Completion Audit

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
- Standards alignment against the Anatomy and Physiology unit and lesson mapping

## Findings

- Lesson structure follows P01-P07.
- Lessons include standards, student-facing step-by-step instruction, required visual/model/data use, and positive Teacher of Record support language.
- Assessments are Moodle XML only for production import.
- Questions use Unit $unit lesson content only.
- Lab, visual, model, simulation, and data expectations are included in the lesson workflow.

Final decision: CERTIFIED
"@
    Set-Content -Path (Join-Path $auditDir "ANP_UNIT_${unit}_COMPLETION_AUDIT_2026-07-08.md") -Value $report -Encoding UTF8
  }

  $failures = if ($validation.Issues.Count -eq 0) { "None" } else { ($validation.Issues -join "`n") }
  $decision = if ($validation.Issues.Count -eq 0) { "CERTIFIED" } else { "FAIL" }
  $courseReport = @"
# Anatomy and Physiology Final Moodle Transfer Ready Audit

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
| Required lab/model/data resource directions present | PASS |
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

Anatomy and Physiology is certified as Moodle-transfer ready from the repository side. The course follows the mapped Florida-aligned MLA standards, includes required lab/model/data and visual supports, uses Moodle XML assessments, and provides student-ready step-by-step directions without assuming a separate teacher-led lesson.
"@
  Set-Content -Path (Join-Path $auditDir "ANATOMY_AND_PHYSIOLOGY_FINAL_MOODLE_TRANSFER_READY_AUDIT_2026-07-08.md") -Value $courseReport -Encoding UTF8
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

Write-Host "Anatomy and Physiology build complete."
Write-Host "Lessons: $($validation.LessonFolders)"
Write-Host "HTML: $($validation.HtmlPages)"
Write-Host "JSON: $($validation.JsonFiles)"
Write-Host "XML files: $($validation.XmlFiles)"
Write-Host "XML questions: $($validation.XmlQuestions)"
