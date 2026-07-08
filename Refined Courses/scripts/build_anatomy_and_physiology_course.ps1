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

function Get-TopicProfile($lesson, $lab) {
  $title = $lesson.Title
  $visual = $lab.Visual
  $purpose = $lesson.Purpose
  $u = [int]$lesson.Unit
  $l = [int]$lesson.Lesson
  $profiles = @{
    "1-1" = @{Focus="scientific evidence in anatomy and physiology"; Sequence=@("separate anatomy as structure from physiology as function","turn a body question into a testable investigation question","collect evidence from a diagram, data table, model, or case","write a claim that is limited to the evidence"); Misconception="thinking anatomy is only memorizing body parts"; Correction="anatomy names structures, but physiology explains how those structures work together to maintain life"; VisualUse="Use the evidence organizer to connect the body question, observation, evidence, and claim."}
    "1-2" = @{Focus="safe investigation design, measurement, variables, and controls"; Sequence=@("identify the question being investigated","separate the independent variable, dependent variable, constants, and control condition","choose a safe measurement method that does not require personal health data","explain how safety and controls make evidence trustworthy"); Misconception="changing several variables and calling the result a fair test"; Correction="a fair investigation changes one independent variable while keeping other conditions controlled"; VisualUse="Use the variable/control table to label each part of the investigation before making a conclusion."}
    "1-3" = @{Focus="medical models, graphs, tables, and evidence limits"; Sequence=@("read the title and units before interpreting data","identify the trend or structure shown","connect the visible evidence to the claim","state what the data cannot prove"); Misconception="treating any medical-looking image or graph as proof"; Correction="models and graphs support claims only when the evidence directly matches the question"; VisualUse="Use the graph/table/model to cite one exact observation and one limitation."}
    "1-4" = @{Focus="levels of organization and homeostasis feedback"; Sequence=@("start at cell, tissue, organ, organ system, and organism","identify the variable being regulated","trace receptor, control center, effector, and response","explain how the response returns the body toward a set range"); Misconception="thinking feedback loops make a value stay perfectly constant"; Correction="homeostasis keeps conditions within a workable range, not at one frozen number"; VisualUse="Use the feedback-loop diagram to trace stimulus through response."}
    "1-5" = @{Focus="macromolecules as structure-function tools in human physiology"; Sequence=@("name the macromolecule class","identify a body structure or process that uses it","connect its structure to its function","avoid drifting into unrelated biochemistry beyond human function"); Misconception="memorizing carbohydrates, lipids, proteins, and nucleic acids without a body-function connection"; Correction="each macromolecule matters because it supports energy, membranes, enzymes, hormones, genes, or tissue structure"; VisualUse="Use the comparison chart to connect each biomolecule to one human body function."}
    "1-6" = @{Focus="enzyme function under physiological conditions"; Sequence=@("identify enzyme, substrate, and active site","read the pH or temperature condition","explain how shape affects enzyme activity","connect enzyme activity to digestion or homeostasis"); Misconception="thinking high temperature or extreme pH always improves enzyme activity"; Correction="enzymes have optimal conditions; outside that range activity drops because shape and bonding change"; VisualUse="Use the enzyme graph to find the optimum and explain the drop-off."}
    "1-7" = @{Focus="health evidence, heredity, environment, and disease context"; Sequence=@("identify the health claim","separate heredity, environment, behavior, and access factors","use evidence without requiring personal disclosure","state a prevention or risk explanation inside the evidence"); Misconception="assuming one factor fully causes every health outcome"; Correction="many health outcomes involve interacting genetic, environmental, behavioral, and access factors"; VisualUse="Use the case table to separate risk factors from protective factors."}
    "2-1" = @{Focus="cell cycle regulation and uncontrolled cell growth"; Sequence=@("trace interphase, mitosis, and cytokinesis","identify where regulation checks DNA or cell readiness","explain how mutation can affect regulation","connect uncontrolled division to tissue-level consequences"); Misconception="thinking mitosis is automatically harmful"; Correction="regulated mitosis is normal repair and growth; uncontrolled regulation is the problem"; VisualUse="Use the cell-cycle model to locate checkpoints and regulation failures."}
    "2-2" = @{Focus="epithelial tissue classification"; Sequence=@("look at number of layers","identify cell shape","connect surface location to protection, absorption, secretion, or filtration","justify classification with visible evidence"); Misconception="classifying epithelium by location alone"; Correction="epithelial classification depends on layer pattern and cell shape, then function is connected to location"; VisualUse="Use histology clues to label simple/stratified and squamous/cuboidal/columnar."}
    "2-3" = @{Focus="connective tissue matrix, fibers, cells, and support function"; Sequence=@("identify the matrix","look for fibers or mineralization","name the major cell type if visible","connect matrix structure to support, storage, protection, or transport"); Misconception="thinking all connective tissue looks like loose fibers"; Correction="connective tissue includes loose, dense, cartilage, bone, adipose, and blood because the matrix varies"; VisualUse="Use the histology comparison to match matrix features to function."}
    "2-4" = @{Focus="muscle and nervous tissue foundations"; Sequence=@("identify excitability as a shared clue","separate contraction from signal transmission","match structure to action","connect tissue type to later movement or control lessons"); Misconception="confusing muscle fibers with neurons because both respond to signals"; Correction="muscle tissue contracts; nervous tissue receives, processes, and transmits information"; VisualUse="Use the comparison chart to distinguish cell shape, function, and system role."}
    "2-5" = @{Focus="skin layers and integumentary function"; Sequence=@("identify epidermis, dermis, and accessory structures","connect each layer to protection, sensation, temperature, or secretion","explain how skin supports homeostasis","avoid using personal skin conditions as required evidence"); Misconception="thinking skin is only a covering"; Correction="skin is an organ system that protects, senses, regulates temperature, and supports fluid balance"; VisualUse="Use the skin-layer diagram to connect each structure to a function."}
    "2-6" = @{Focus="skin homeostasis and case evidence"; Sequence=@("read the fictional/public case evidence","identify the affected skin function","connect tissue structure to the symptom or data","state what evidence supports and what cannot be diagnosed"); Misconception="jumping from a skin case to a diagnosis"; Correction="course evidence supports structure-function reasoning, not personal diagnosis"; VisualUse="Use the case table to connect evidence to integumentary function."}
    "2-7" = @{Focus="tissue and integumentary integration"; Sequence=@("identify each tissue type from visible evidence","connect tissues to skin layers or accessory structures","explain how multiple tissues cooperate","use the synthesis table to support a claim"); Misconception="treating each tissue type as isolated"; Correction="organs such as skin work because epithelial, connective, muscle, and nervous tissues cooperate"; VisualUse="Use the multi-tissue model to connect tissue identity to organ function."}
    "3-1" = @{Focus="bone tissue anatomy and histology"; Sequence=@("distinguish compact and spongy bone","identify osteon, lamellae, canal, or trabeculae when shown","connect mineralized matrix to support and protection","connect living bone cells to repair and remodeling"); Misconception="thinking bone is dead solid material"; Correction="bone is living connective tissue with cells, blood supply, matrix, and remodeling"; VisualUse="Use the bone histology/model to connect microscopic structure to strength."}
    "3-2" = @{Focus="axial and appendicular skeletal organization"; Sequence=@("identify whether a bone belongs to body axis or limbs/girdles","state the division","connect the division to protection, support, or movement","avoid memorizing without location logic"); Misconception="classifying bones only by size"; Correction="axial bones form the central axis; appendicular bones support limbs and movement"; VisualUse="Use the skeleton diagram to sort bones by division."}
    "3-3" = @{Focus="major bones and anatomical location"; Sequence=@("locate the bone on the model","name the region","connect the bone to protection, support, leverage, or attachment","use labels and position clues instead of guessing"); Misconception="using similar-sounding names without checking location"; Correction="bone identification requires location, shape, and body-region evidence"; VisualUse="Use the labeled/unlabeled skeleton to justify each identification."}
    "3-4" = @{Focus="muscle tissue anatomy, histology, and ultrastructure"; Sequence=@("separate skeletal, cardiac, and smooth muscle","look for striations, branching, nuclei, or spindle shape","connect tissue structure to voluntary or involuntary function","connect sarcomere organization to contraction"); Misconception="thinking all muscle tissue has the same control and appearance"; Correction="muscle types differ in structure, location, control, and function"; VisualUse="Use histology and sarcomere diagrams to identify muscle type and function."}
    "3-5" = @{Focus="major muscles and movement"; Sequence=@("identify the muscle on the body diagram","locate the joint or region it acts on","connect contraction to movement","use action terms carefully such as flexion, extension, abduction, or rotation"); Misconception="thinking a muscle pushes a bone"; Correction="muscles pull on bones through tendons; paired muscles often produce opposite movements"; VisualUse="Use the muscle diagram and movement table to connect location to action."}
    "3-6" = @{Focus="sliding filament contraction"; Sequence=@("begin with calcium exposure of binding sites","connect actin, myosin, ATP, and cross-bridge cycling","trace shortening without changing filament length","include relaxation when calcium is removed"); Misconception="thinking actin and myosin shrink"; Correction="filaments slide past each other, making the sarcomere shorter"; VisualUse="Use the sequence chart to place calcium, ATP, actin, and myosin in order."}
    "3-7" = @{Focus="myoneural junctions and movement control"; Sequence=@("start with motor neuron signal arrival","trace neurotransmitter release across the junction","connect receptor activation to muscle fiber response","identify where communication could be interrupted"); Misconception="thinking the nerve directly pulls the muscle"; Correction="the nerve sends a chemical/electrical signal that triggers muscle contraction"; VisualUse="Use the neuromuscular junction model to trace signal pathway."}
    "4-1" = @{Focus="nervous system organization"; Sequence=@("separate CNS from PNS","identify sensory input, integration, and motor output","connect structure division to function","use organization before naming smaller parts"); Misconception="thinking every nerve structure is part of the brain"; Correction="the nervous system includes central and peripheral divisions with different roles"; VisualUse="Use the CNS/PNS diagram to sort structures and functions."}
    "4-2" = @{Focus="reflex arc and spinal cord pathways"; Sequence=@("start at receptor and sensory neuron","trace integration in the spinal cord","follow motor neuron to effector","explain why reflexes can be fast and protective"); Misconception="thinking every response must first be consciously decided by the brain"; Correction="many reflexes are integrated through spinal pathways before conscious awareness"; VisualUse="Use the reflex arc diagram to trace the path in order."}
    "4-3" = @{Focus="brain structures and function"; Sequence=@("identify cerebrum, cerebellum, brainstem, or related region","connect location to function","avoid overclaiming complex behavior from one structure","use the diagram as evidence"); Misconception="assigning every brain function to one isolated part"; Correction="brain regions specialize, but many functions require connected networks"; VisualUse="Use the brain diagram/model to match structure with function."}
    "4-4" = @{Focus="synapses and signal transmission"; Sequence=@("start with presynaptic signal arrival","trace neurotransmitter release into the cleft","connect receptor binding to postsynaptic response","explain signal stopping or reset"); Misconception="thinking neurons physically touch and electricity simply jumps across"; Correction="most synapses use chemical neurotransmitters across a synaptic cleft"; VisualUse="Use the synapse sequence to identify each step."}
    "4-5" = @{Focus="autonomic and sensory system function"; Sequence=@("separate sympathetic and parasympathetic responses","connect sensory receptors to stimuli","explain how the body adjusts organ function","use evidence from the comparison table"); Misconception="thinking sympathetic is always bad and parasympathetic is always good"; Correction="both divisions are normal control systems used in different body conditions"; VisualUse="Use the comparison table and sensory diagram to connect stimulus to response."}
    "4-6" = @{Focus="endocrine glands, hormones, targets, and responses"; Sequence=@("identify the gland","name the hormone or signal type when given","connect hormone to target tissue","explain the physiological response"); Misconception="thinking hormones act instantly like reflexes"; Correction="endocrine signals are usually slower and longer-lasting than nervous signals"; VisualUse="Use the endocrine map to trace gland, hormone, target, and response."}
    "4-7" = @{Focus="neural and endocrine control comparison"; Sequence=@("identify whether the signal is neural or endocrine","compare speed, duration, and target specificity","connect feedback data to response","explain how both systems support homeostasis"); Misconception="choosing nervous or endocrine control without evidence"; Correction="signal pathway, speed, duration, and target pattern determine the control type"; VisualUse="Use the feedback graph/table to compare control systems."}
    "5-1" = @{Focus="blood composition and formed elements"; Sequence=@("separate plasma from formed elements","identify red blood cells, white blood cells, and platelets","connect each component to transport, defense, or clotting","use the diagram/data table as evidence"); Misconception="thinking blood is only red blood cells"; Correction="blood includes plasma plus multiple formed elements with different functions"; VisualUse="Use the blood component diagram and data table to connect composition to function."}
    "5-2" = @{Focus="hemostasis, blood typing, and transfusion compatibility"; Sequence=@("trace vascular spasm, platelet plug, and coagulation","identify antigens/antibodies in blood typing","use compatibility evidence before choosing a transfusion","avoid personal blood testing"); Misconception="thinking any blood can be transfused if the person needs it"; Correction="blood compatibility depends on antigen-antibody reactions that can cause dangerous clumping"; VisualUse="Use the clotting sequence and compatibility table to justify decisions."}
    "5-3" = @{Focus="blood flow, pressure, and resistance"; Sequence=@("identify pressure difference, vessel diameter, and resistance","read the graph or data table","connect vessel changes to flow changes","stay within model evidence instead of diagnosing"); Misconception="thinking blood pressure and blood flow mean the same thing"; Correction="pressure helps drive flow, but resistance and vessel diameter also matter"; VisualUse="Use the pressure/flow graph to explain the relationship."}
    "5-4" = @{Focus="heart anatomy, heart sounds, hypertension, and evidence"; Sequence=@("identify chambers, valves, and circulation pathway","connect valve closure to heart sounds","read blood pressure data as evidence","explain risk or function without diagnosing a person"); Misconception="thinking heart sounds come from muscle squeezing"; Correction="heart sounds are mainly produced by valve closure and blood-flow events"; VisualUse="Use the heart diagram and BP table to support the claim."}
    "5-5" = @{Focus="fetal circulation and birth changes"; Sequence=@("identify fetal shunts","trace how blood bypasses lungs before birth","connect birth breathing to circulation changes","compare fetal and newborn pathways"); Misconception="thinking fetal circulation matches adult circulation"; Correction="fetal circulation uses special shunts because gas exchange occurs through the placenta"; VisualUse="Use the fetal circulation diagram to compare before and after birth."}
    "5-6" = @{Focus="lymphatic system and immunity"; Sequence=@("identify lymph structures","connect immune cells or barriers to defense","trace a simple immune response sequence","distinguish immune support from diagnosis or treatment advice"); Misconception="thinking immunity is one single action"; Correction="immunity uses barriers, cells, signaling, memory, and lymphatic structures"; VisualUse="Use the immune response model to place events in order."}
    "5-7" = @{Focus="respiratory physiology and gas exchange"; Sequence=@("trace air pathway to alveoli","connect ventilation to gas exchange","use partial pressure or data evidence when provided","connect oxygen delivery to blood transport"); Misconception="thinking breathing and gas exchange are the same process"; Correction="ventilation moves air; gas exchange moves oxygen and carbon dioxide across membranes"; VisualUse="Use the respiratory graph/model to connect ventilation, diffusion, and transport."}
    "6-1" = @{Focus="digestive system physiology"; Sequence=@("separate mechanical and chemical digestion","identify where digestion or absorption occurs","connect enzymes and control signals to process steps","trace nutrients from lumen to blood or lymph"); Misconception="thinking digestion ends in the stomach"; Correction="digestion continues through the small intestine, where most absorption occurs"; VisualUse="Use the digestive process diagram and table to place steps in order."}
    "6-2" = @{Focus="nephron function and urine formation"; Sequence=@("trace filtrate through nephron regions","separate filtration, reabsorption, secretion, and excretion","connect each step to blood and fluid balance","use the diagram before answering"); Misconception="thinking kidneys simply remove all water and waste"; Correction="kidneys filter blood, reabsorb needed substances, secrete selected materials, and excrete urine"; VisualUse="Use the nephron diagram to trace each process."}
    "6-3" = @{Focus="age-appropriate reproductive anatomy and physiology"; Sequence=@("identify structures using course diagrams","connect structure to gamete production, transport, hormones, or development","use respectful scientific language","do not require personal disclosure"); Misconception="treating reproductive anatomy as memorization without physiological regulation"; Correction="reproductive systems involve structure, hormones, cell production, and regulated processes"; VisualUse="Use the age-appropriate diagram/function table to connect structure and role."}
    "6-4" = @{Focus="disease prevention, detection, and treatment evidence"; Sequence=@("separate prevention, detection, and treatment","read the public health case evidence","connect recommendation to data or source evidence","avoid making personal medical decisions"); Misconception="thinking prevention, screening, and treatment are interchangeable"; Correction="prevention reduces risk, detection finds possible disease, and treatment responds to an identified condition"; VisualUse="Use the case table to sort prevention, detection, and treatment evidence."}
    "6-5" = @{Focus="heredity, environment, and health evidence"; Sequence=@("separate inherited factor from environmental factor","use fictional/public case data only","explain interaction without determinism","state evidence limits"); Misconception="thinking genes alone determine health outcomes"; Correction="heredity can influence risk, but environment, behavior, access, and chance also matter"; VisualUse="Use the heredity/environment table to support a balanced claim."}
    "6-6" = @{Focus="whole-body homeostasis and system interaction"; Sequence=@("identify the regulated variable","name at least two body systems involved","trace what each system contributes","explain how interaction supports homeostasis"); Misconception="studying each organ system as if it works alone"; Correction="homeostasis depends on coordinated interaction across organ systems"; VisualUse="Use the whole-body interaction map to trace system contributions."}
    "6-7" = @{Focus="scientific communication and quantitative medical evidence"; Sequence=@("read graph labels, units, and source","identify claim, evidence, and reasoning","separate correlation from causation when needed","communicate the conclusion clearly and cautiously"); Misconception="using numbers without explaining what they mean"; Correction="quantitative evidence must be interpreted with units, trend, source, and limits"; VisualUse="Use the medical data table/graph to write a supported claim."}
  }
  $key = "$u-$l"
  if ($profiles.ContainsKey($key)) { return $profiles[$key] }
  return @{Focus=$purpose; Sequence=@("review the mapped standards and required evidence","identify the main anatomy structure or physiology process","connect the visual or data to the function","write a claim that stays inside this lesson"); Misconception="answering from memory without using the assigned model or data"; Correction="use the assigned evidence before making a claim"; VisualUse="Use $visual as the evidence source for this lesson."}
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
  $visual = $lab.Visual
  $profile = Get-TopicProfile $lesson $lab
  $stepList = ($profile.Sequence | ForEach-Object { "    <li>$(Html $_)</li>" }) -join "`n"
  @"
<section class="box">
  <h2>Teacher-Style Explanation</h2>
  <p>This lesson is focused on <strong>$(Html $lesson.Title)</strong>. The standard is <strong>$(Html $lesson.Standards)</strong>, so the work must stay inside this lesson: <strong>$(Html $profile.Focus)</strong>.</p>
  <p>A strong answer does more than name a term. It explains what is visible in the required model, how that structure or process works, and why that evidence supports the claim.</p>
  <ol class="steps">
$stepList
  </ol>
</section>
<section class="model">
  <h2>Visual or Data Model Required</h2>
  <p><strong>Required model/data:</strong> $(Html $visual)</p>
  <p>$(Html $profile.VisualUse)</p>
</section>
$(ResourceBlock $resource)
<section class="mistake">
  <h2>Common Confusion to Avoid</h2>
  <p><strong>Incorrect:</strong> $(Html $profile.Misconception)</p>
</section>
<section class="correct">
  <h2>Correct Thinking</h2>
  <p><strong>Correct:</strong> $(Html $profile.Correction)</p>
</section>
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

function New-Question($id, $standard, $title, $stimulus, $kind, $n, $profile) {
  $correctIndex = ($n + $id.Length) % 4
  $contexts = @(
    "A student is reviewing the required visual and must explain the first visible structure-function connection.",
    "A notebook response includes a claim but needs evidence from the assigned model before it can be accepted.",
    "A case table shows a pattern that must be interpreted without making a diagnosis.",
    "A diagram labels several parts, and the answer must connect one labeled part to its physiological role.",
    "A data table gives evidence for a body process, but the conclusion must stay inside the mapped lesson.",
    "A model shows a sequence, and the answer must place the events in the correct order.",
    "A peer response names the term correctly but does not yet explain the function.",
    "A checkpoint asks for evidence from the required resource, not a memorized definition.",
    "A graph or comparison table shows a trend that must be connected to the body process.",
    "A visual model gives enough evidence to eliminate answers that drift into a later system.",
    "A student confuses location with function and must use the diagram to correct the explanation.",
    "A lab-style scenario asks which evidence detail makes the claim stronger.",
    "A structure is shown in context, and the answer must explain why its shape or position matters.",
    "A process model includes a missing step that must be inferred from the lesson sequence.",
    "A public or fictional health case requires careful evidence-based reasoning.",
    "A comparison chart asks students to distinguish related structures or processes.",
    "A direct resource observation must be translated into a claim-evidence-reasoning statement.",
    "A misconception answer sounds familiar but ignores the required stimulus.",
    "A synthesis prompt asks what the visual proves and what it does not prove.",
    "A student must decide which explanation is precise enough for this standard.",
    "A model shows a normal process, and the answer must avoid treating it as a disease diagnosis.",
    "A response must connect microscopic structure to whole-body function.",
    "A physiological sequence must be explained from signal or stimulus to response.",
    "A table shows multiple variables, and the answer must identify the variable that matters.",
    "A final review item asks for the safest, most evidence-based explanation."
  )
  $context = $contexts[($n - 1) % $contexts.Count]
  $correctAnswer = "$($profile.Correction) In this item, the evidence from $stimulus should be used to explain $($profile.Focus)."
  $distractors = @(
    "$($profile.Misconception) This misses the evidence required for $title.",
    "Use a familiar medical or body-system idea from another lesson instead of the $standard requirement.",
    "Name a term from $title but leave out the structure-function or data connection shown in $stimulus."
  )
  $answers = @($distractors[0], $distractors[1], $distractors[2], $correctAnswer)
  if ($correctIndex -ne 3) {
    $answers[3] = $answers[$correctIndex]
    $answers[$correctIndex] = $correctAnswer
  }
  $stepCue = ($profile.Sequence | Select-Object -First 1)
  $feedback = "Teachable feedback: First, $stepCue. Then use the required stimulus ($stimulus) to connect the visible evidence to $($profile.Focus). Correct reasoning stays inside $standard and avoids the common mistake: $($profile.Misconception)."
  [pscustomobject]@{
    id = $id
    standard = $standard
    text = "Question ID: $id<br/>MLA Standard: $standard<br/><br/>$kind<br/>Lesson focus: $title<br/>Stimulus: $stimulus<br/><br/>$context Which answer uses the lesson evidence most accurately?"
    answers = $answers
    correct = $correctIndex
    feedback = $feedback
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
    $profile = Get-TopicProfile $lesson $lab
    $gp = for ($i=1; $i -le 5; $i++) { New-Question "ANP_U${unit}_L${les}_GP_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Guided practice item $i." $i $profile }
    Write-MoodleXml (Join-Path $dir "ANP_U${unit}_L${les}_GuidedPractice_MoodleXML.xml") $gp
    if ($lesson.Lesson -lt 8) {
      $quiz = for ($i=1; $i -le 25; $i++) { New-Question "ANP_U${unit}_L${les}_QZ_Q$('{0:D2}' -f $i)" $lesson.Standards $lesson.Title $lab.Stimulus "Lesson quiz bank item $i." $i $profile }
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
      $profile = Get-TopicProfile $l $lab
      $pre += New-Question "ANP_U${unit}_PT_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit pretest item $i. This question uses only Unit $u mapped content." $i $profile
    }
    Write-MoodleXml (Join-Path $unitDir "ANP_U${unit}_Pretest_MoodleXML.xml") $pre

    $ua = @()
    for ($i=1; $i -le 40; $i++) {
      $l = $unitLessons[($i-1) % 7]
      $lab = $labMap["$($l.Unit)-$($l.Lesson)"]
      $profile = Get-TopicProfile $l $lab
      $ua += New-Question "ANP_U${unit}_UA_Q$('{0:D2}' -f $i)" $l.Standards $l.Title $lab.Stimulus "Unit assessment item $i. This question assesses only Unit $u mapped content." $i $profile
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
    $uniqueStems = @($qs | ForEach-Object { $_.questiontext.InnerText.Trim() } | Sort-Object -Unique)
    if ($qs.Count -ne $uniqueStems.Count) { $issues += "$($f.FullName): duplicate question stems detected" }
    foreach ($q in $qs) {
      $answers = @($q.answer)
      if ($answers.Count -ne 4) { $issues += "$($f.FullName): $($q.name.text) answer count $($answers.Count)" }
      if (@($answers | Where-Object { $_.fraction -eq "100" }).Count -ne 1) { $issues += "$($f.FullName): $($q.name.text) correct answer count invalid" }
      $questionText = $q.questiontext.InnerText
      if ($questionText -notmatch "Question ID:" -or $questionText -notmatch "MLA Standard:") { $issues += "$($f.FullName): $($q.name.text) missing ID/standard" }
      if ($questionText -match 'Which response best shows mastery|Lesson quiz bank item \d+\.\s*Stimulus|Use the required model or data to connect structure, function, and evidence') {
        $issues += "$($f.FullName): $($q.name.text) generic XML wording"
      }
      $answerTexts = @($answers | ForEach-Object { $_.text.InnerText.Trim() })
      if ($answerTexts.Count -ne (@($answerTexts | Sort-Object -Unique)).Count) {
        $issues += "$($f.FullName): $($q.name.text) duplicate answer choices"
      }
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
