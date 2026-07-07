const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 06");

const css = "font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.65; color: #1f2933; max-width: 980px; margin: 0 auto 22px auto;";
const colors = [["#0f766e", "#f0fdfa"], ["#2563eb", "#eff6ff"], ["#f59e0b", "#fffbeb"], ["#16a34a", "#f0fdf4"]];

function section(color, bg, title, body) {
  return `  <section style="border: 1px solid #d1d5db; border-left: 6px solid ${color}; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: ${bg};">
    <h2 style="font-size: 23px; margin-top: 0;">${title}</h2>
${body}
  </section>`;
}
function hero(title, sub = "") {
  return `  <section style="background: #eef7ff; border-left: 8px solid #2563eb; border-radius: 10px; padding: 24px; margin-bottom: 18px;"><h1 style="font-size: 30px; margin: 0;">${title}</h1>${sub ? `<h2 style="font-size: 24px; margin: 10px 0 0 0;">${sub}</h2>` : ""}</section>`;
}
function tor(text) {
  return `  <div class="mla-tor-support-box" style="font-size: 16px; line-height: 1.45; color: #1f2933; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 12px 16px;">
    <p style="font-size: 18px; font-weight: 700; margin: 0 0 6px 0;">Need Help?</p>
    <p style="margin: 0 0 6px 0;">Contact your Teacher of Record ${text}</p>
    <p style="margin: 0;">Use the data table, graph, map, food web, or worked example that matches the task before requesting support.</p>
  </div>`;
}
function shell(l, inner) {
  return `<div style="${css}">
  <div style="background: #102a43; color: #ffffff; border-radius: 10px; padding: 14px 18px; margin-bottom: 18px;"><strong>BIOLOGY | Unit 06 | Lesson ${l.no}</strong></div>
${inner}
</div>
`;
}
function list(items) { return `<ul style="padding-left: 24px;">${items.map(i => `<li>${i}</li>`).join("")}</ul>`; }
function ol(items) { return `<ol style="padding-left: 24px;">${items.map(i => `<li>${i}</li>`).join("")}</ol>`; }
function table(headers, rows) {
  return `<table style="width: 100%; border-collapse: collapse; font-size: 17px; margin-top: 10px;"><tr style="background: #dbeafe;">${headers.map(h => `<th style="border: 1px solid #94a3b8; padding: 10px;">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border: 1px solid #cbd5e1; padding: 10px;">${c}</td>`).join("")}</tr>`).join("")}</table>`;
}

const lessons = [
  {
    no: "01", title: "Aquatic Systems and Distribution of Life", standards: ["MLA.BIO.ECO.01"], support: ["SC.912.L.17.2", "MLA.BIO.LAB.03"],
    purpose: "Explain aquatic life distribution using chemistry, geography, light, depth, salinity, and temperature.",
    lab: "Aquatic distribution data/map analysis.", visuals: ["Aquatic zone diagram", "Map", "Light/depth/salinity/temperature table"], resources: ["NOAA", "USGS", "NASA", "OpenStax Biology 2e"], stimulus: "Aquatic system map/data table",
    vocab: ["<strong>Aquatic system:</strong> water-based ecosystem.", "<strong>Salinity:</strong> amount of dissolved salt in water.", "<strong>Photic zone:</strong> water depth where enough light supports photosynthesis.", "<strong>Abiotic factor:</strong> nonliving environmental condition.", "<strong>Distribution:</strong> where organisms are found across an ecosystem."],
    teach1: `<p>Aquatic organisms are not distributed randomly. Their locations depend on abiotic conditions such as light, depth, temperature, dissolved oxygen, salinity, nutrients, and geography. A shallow clear zone can support photosynthetic producers because light reaches it. A deeper or colder zone may support different organisms because less light and different oxygen conditions are available.</p>${table(["Aquatic Factor", "What It Affects", "Evidence Clue"], [["Light", "Photosynthesis and producer location", "Light decreases with depth"], ["Temperature", "Metabolism and oxygen levels", "Cold/deep zones differ from warm/shallow zones"], ["Salinity", "Freshwater, estuary, or marine organism tolerance", "Salt level changes across locations"], ["Dissolved oxygen", "Animal survival", "Low oxygen limits many consumers"], ["Geography", "Current, shoreline, or depth patterns", "Map location matters"]])}`,
    teach2: `<p>When using an aquatic map or table, first identify the zone or location, then read the abiotic data, and finally connect those conditions to the organisms that can survive there. Do not answer from the organism name alone; use the environmental evidence.</p>`,
    bad: "Aquatic organisms live anywhere in the water as long as water is present.",
    good: "Aquatic organisms are distributed according to abiotic conditions such as light, depth, temperature, salinity, oxygen, nutrients, and geography.",
    explain: "Water alone is not enough evidence; students must connect the specific condition to organism survival.",
    examples: [
      ["Use light and depth", "A data table shows high algae growth in shallow clear water and low algae growth in deep dark water. What explains the pattern?", ["Identify the producer. Why: algae need photosynthesis.", "Read light and depth. Why: light decreases with depth.", "Connect light to growth. Why: producers grow where photosynthesis can occur."], "Light availability helps explain aquatic producer distribution."],
      ["Use salinity", "A fish is found in an estuary where salinity changes daily. What trait matters?", ["Identify the location. Why: estuaries mix fresh and salt water.", "Read salinity variation. Why: changing salt levels stress organisms.", "Connect to tolerance. Why: organisms must tolerate the abiotic range."], "Salinity tolerance affects distribution."],
      ["Use map evidence", "A map shows low oxygen near a river outflow and fewer fish there. What conclusion is supported?", ["Read the map pattern. Why: location and oxygen are linked.", "Compare fish abundance. Why: distribution data shows where fish are found.", "Connect oxygen to survival. Why: many fish need dissolved oxygen."], "Low oxygen can limit aquatic consumers."]
    ],
    independent: ["Complete an aquatic zone and abiotic factor table.", "Explain how one abiotic factor affects organism distribution.", "Write a CER response using an aquatic map or data table."],
    checkpoint: "Use an aquatic system map/data table to explain why organisms are distributed differently across aquatic zones."
  },
  {
    no: "02", title: "Ecosystem Change and Succession", standards: ["MLA.BIO.ECO.01"], support: ["SC.912.L.17.4", "ELA.K12.EE.3.1"],
    purpose: "Describe ecosystem changes from seasonal variation, climate change, and succession.",
    lab: "Succession/climate/seasonal change evidence analysis.", visuals: ["Succession timeline", "Ecosystem change data graph"], resources: ["HHMI BioInteractive", "NOAA climate resources", "NASA Earth Observatory"], stimulus: "Succession timeline or change graph",
    vocab: ["<strong>Succession:</strong> gradual ecosystem change after disturbance or new habitat formation.", "<strong>Primary succession:</strong> succession where soil is not present at first.", "<strong>Secondary succession:</strong> succession after disturbance where soil remains.", "<strong>Seasonal change:</strong> predictable short-term environmental change.", "<strong>Climate change:</strong> long-term shift in climate patterns."],
    teach1: `<p>Ecosystems change over time. Some changes are seasonal and repeat each year. Some are disturbances such as fires, storms, or floods. Succession describes how communities change after a disturbance or on new surfaces. Climate change involves long-term shifts that can alter habitat conditions and species distributions.</p>${table(["Change Type", "Time Scale", "Evidence to Look For"], [["Seasonal variation", "Short-term/repeating", "Monthly temperature, rainfall, migration, flowering"], ["Secondary succession", "Years to decades", "Soil remains; grasses, shrubs, trees return"], ["Primary succession", "Longer; begins without soil", "Bare rock, lichens, soil formation"], ["Climate change", "Long-term trend", "Multi-year temperature, rainfall, sea-level, range shifts"]])}`,
    teach2: `<p>To analyze ecosystem change, separate what happened from what the evidence supports. A one-month change may be seasonal, while a multi-decade pattern may support climate-related change. Succession timelines require you to identify the starting condition and the order of community changes.</p>`,
    bad: "Any ecosystem change is automatically climate change.",
    good: "The type of ecosystem change depends on the evidence, time scale, and starting conditions.",
    explain: "Students must distinguish seasonal variation, disturbance recovery, succession, and long-term climate trends.",
    examples: [
      ["Identify secondary succession", "A forest fire removes trees, but soil remains and grasses grow the next year. What process is shown?", ["Identify disturbance. Why: fire changed the ecosystem.", "Check for soil. Why: soil remaining indicates secondary succession.", "Name early colonizers. Why: grasses often appear early."], "Soil remaining after disturbance supports secondary succession."],
      ["Read a climate graph", "A graph shows average temperature increasing over 40 years. What type of evidence is this?", ["Read the time scale. Why: 40 years is long-term.", "Identify trend. Why: sustained increase matters.", "Connect to climate. Why: long-term patterns support climate-related conclusions."], "Long-term data can support climate change analysis."],
      ["Use seasonal data", "A pond has more algae in summer than winter each year. What should you consider first?", ["Identify repeated yearly pattern. Why: repetition suggests seasonality.", "Connect sunlight/temperature to algae. Why: conditions affect growth.", "Avoid overclaiming. Why: seasonal pattern alone is not a full climate claim."], "Seasonal variation can explain repeated annual changes."]
    ],
    independent: ["Label stages on a succession timeline.", "Distinguish seasonal, succession, and climate examples.", "Write a CER response using ecosystem change data."],
    checkpoint: "Use a succession timeline or change graph to explain the type of ecosystem change shown and the evidence for it."
  },
  {
    no: "03", title: "Population Size, Limiting Factors, and Carrying Capacity", standards: ["MLA.BIO.ECO.02"], support: ["SC.912.L.17.5", "MA.K12.MTR.7.1"],
    purpose: "Analyze population change using births, deaths, immigration, emigration, and limiting factors.",
    lab: "Population growth/carrying capacity data investigation.", visuals: ["Population graph", "Carrying capacity curve", "Limiting factor table"], resources: ["HHMI BioInteractive", "PhET/CK-12 population resources", "NOAA/USGS data"], stimulus: "Population graph/scenario",
    vocab: ["<strong>Population:</strong> members of one species in an area.", "<strong>Limiting factor:</strong> resource or condition that restricts population size.", "<strong>Carrying capacity:</strong> maximum population an environment can support over time.", "<strong>Immigration:</strong> movement into a population.", "<strong>Emigration:</strong> movement out of a population."],
    teach1: `<p>Population size changes when individuals are added or removed. Births and immigration add individuals. Deaths and emigration remove individuals. Limiting factors such as food, water, space, disease, predators, and weather can slow growth. Carrying capacity is shown when a population levels off around what the environment can support.</p>${table(["Population Process", "Effect on Size", "Evidence Clue"], [["Births", "Increase", "New individuals are born"], ["Deaths", "Decrease", "Individuals die"], ["Immigration", "Increase", "Individuals enter"], ["Emigration", "Decrease", "Individuals leave"], ["Limiting factor", "Restricts growth", "Food, space, disease, predator, weather, water"]])}`,
    teach2: `<p>Population graphs often rise, fall, or level off. A rising graph means additions exceed removals. A falling graph means removals exceed additions. A graph that levels near the same value suggests carrying capacity, especially if limiting factors are present.</p>`,
    bad: "A population can grow forever if it has a few resources.",
    good: "Population growth is limited by resources and conditions, so populations often level near carrying capacity.",
    explain: "Carrying capacity reasoning connects graph shape to limiting factors.",
    examples: [
      ["Calculate population change", "A population has 20 births, 8 deaths, 5 immigrants, and 7 emigrants. What is the net change?", ["Add births and immigrants. Why: they increase population size.", "Add deaths and emigrants. Why: they decrease population size.", "Subtract removals from additions. Why: net change shows direction."], "Net change is (20 + 5) - (8 + 7) = 10 individuals added."],
      ["Identify carrying capacity", "A graph rises quickly and then levels near 500 individuals. What does 500 likely represent?", ["Read the leveling point. Why: carrying capacity appears where growth stabilizes.", "Connect to resources. Why: environment limits growth.", "Use likely wording. Why: data supports an interpretation."], "The graph likely levels near carrying capacity."],
      ["Find a limiting factor", "A deer population drops after drought reduces plant growth. What factor limited the population?", ["Identify environmental change. Why: drought is abiotic.", "Connect drought to food. Why: reduced plants affect deer resources.", "Name food/water availability as limiting. Why: it restricts survival and reproduction."], "Resource availability can limit population size."]
    ],
    independent: ["Calculate population change from births, deaths, immigration, and emigration.", "Interpret a carrying capacity graph.", "Write a CER response identifying a limiting factor from a scenario."],
    checkpoint: "Use a population graph/scenario to explain population change, limiting factors, and carrying capacity."
  },
  {
    no: "04", title: "Food Webs and Energy Transfer", standards: ["MLA.BIO.ECO.02", "MLA.BIO.ENE.05"], support: ["SC.912.L.17.9"],
    purpose: "Use food webs to explain producers, consumers, decomposers, trophic levels, and energy reduction.",
    lab: "Food web and trophic energy model analysis.", visuals: ["Food web", "Energy pyramid", "Trophic level table"], resources: ["HHMI BioInteractive", "CK-12", "OpenStax Biology 2e"], stimulus: "Food web/energy pyramid",
    vocab: ["<strong>Producer:</strong> organism that makes food, usually through photosynthesis.", "<strong>Consumer:</strong> organism that gets energy by eating other organisms.", "<strong>Decomposer:</strong> organism that breaks down dead matter.", "<strong>Trophic level:</strong> feeding position in a food chain/web.", "<strong>Energy pyramid:</strong> model showing energy decreases at higher trophic levels."],
    teach1: `<p>Food webs show feeding relationships and energy flow. Arrows point from the food source to the organism receiving energy. Producers capture energy and support the web. Consumers transfer energy by eating other organisms. Decomposers recycle matter from dead organisms. Energy decreases at each trophic transfer, so higher levels usually support less biomass.</p>${table(["Food Web Role", "Evidence Clue", "Energy/Matter Connection"], [["Producer", "Plant/algae/photosynthesis", "Captures energy"], ["Primary consumer", "Eats producer", "Receives producer energy"], ["Secondary consumer", "Eats primary consumer", "Receives less available energy"], ["Decomposer", "Breaks down dead matter", "Recycles matter"]])}`,
    teach2: `<p>To read a food web, trace arrows carefully. If grass points to a rabbit, energy moves from grass to rabbit. If rabbits decrease, predators that eat rabbits may decrease and plants eaten by rabbits may increase. Always use the arrows instead of guessing from animal names.</p>`,
    bad: "Food web arrows point to what an organism wants to eat.",
    good: "Food web arrows point from the food source to the organism receiving energy.",
    explain: "Arrow direction is essential for accurate energy-transfer reasoning.",
    examples: [
      ["Trace energy", "In a web, algae -> small fish -> large fish. Which organism receives energy from small fish?", ["Read arrow direction. Why: arrow shows energy flow.", "Locate small fish as food source for large fish. Why: arrow points to receiver.", "Name large fish. Why: it receives energy from small fish."], "The large fish receives energy from the small fish."],
      ["Predict impact", "If grass decreases, what may happen to grasshoppers that eat grass?", ["Identify grass as producer. Why: it supports primary consumers.", "Find grasshopper feeding relationship. Why: it eats grass.", "Predict decrease. Why: less food can reduce population size."], "Grasshopper populations may decrease if food decreases."],
      ["Use energy pyramid", "Why is there usually less biomass at higher trophic levels?", ["Recall energy transfer. Why: not all energy moves to the next level.", "Connect to biomass. Why: less available energy supports fewer organisms.", "State higher levels have less available energy. Why: energy is reduced at each transfer."], "Energy decreases at higher trophic levels."]
    ],
    independent: ["Label producers, consumers, decomposers, and trophic levels in a food web.", "Predict one population effect from a food-web change.", "Write a CER response using arrow direction and energy reduction."],
    checkpoint: "Use a food web/energy pyramid to explain energy transfer and predict an ecosystem effect."
  },
  {
    no: "05", title: "Biodiversity Loss and Invasive Species", standards: ["MLA.BIO.ECO.03", "MLA.BIO.SCI.02"], support: ["SC.912.L.17.8"],
    purpose: "Recognize biodiversity loss from catastrophic events, climate change, human activity, and invasive species.",
    lab: "Biodiversity/invasive species data case.", visuals: ["Biodiversity data table", "Invasive species map/graph"], resources: ["NOAA", "USGS", "National Invasive Species Information Center", "HHMI"], stimulus: "Biodiversity/invasive species data",
    vocab: ["<strong>Biodiversity:</strong> variety of life in an area.", "<strong>Invasive species:</strong> nonnative species that harms an ecosystem.", "<strong>Native species:</strong> species naturally found in an area.", "<strong>Catastrophic event:</strong> major disturbance such as wildfire, hurricane, flood, or drought.", "<strong>Human impact:</strong> effect of human activity on ecosystems."],
    teach1: `<p>Biodiversity can decrease when habitats are damaged, climate patterns shift, catastrophic events occur, pollution increases, or invasive species disrupt food webs. Invasive species may compete with native species, prey on them, spread disease, or change habitat conditions. Use data before making a claim.</p>${table(["Cause", "Evidence Clue", "Possible Biodiversity Effect"], [["Catastrophic event", "Sudden disturbance", "Rapid habitat or population loss"], ["Climate change", "Long-term condition shift", "Range shifts or stress"], ["Human activity", "Land use, pollution, overharvest", "Habitat loss or reduced populations"], ["Invasive species", "Nonnative population increases", "Native species decline or food web change"]])}`,
    teach2: `<p>When reading biodiversity data, compare before and after values, native species counts, invasive species abundance, and habitat condition. A good answer identifies the cause, the data pattern, and the likely effect on biodiversity.</p>`,
    bad: "A new species always increases biodiversity and helps the ecosystem.",
    good: "A nonnative species may reduce biodiversity if it harms native species or disrupts ecosystem relationships.",
    explain: "The effect depends on evidence, not just the number of species present.",
    examples: [
      ["Use invasive species data", "A graph shows invasive plant cover rising while native plant richness falls. What is supported?", ["Identify both trends. Why: two data patterns are shown.", "Connect invasive increase to native decrease. Why: competition may be occurring.", "State biodiversity loss cautiously. Why: data supports a relationship."], "The invasive plant may be contributing to biodiversity loss."],
      ["Use catastrophic event evidence", "A hurricane destroys nesting habitat and bird counts fall. What cause is shown?", ["Identify the disturbance. Why: hurricane is a catastrophic event.", "Connect habitat loss to population decline. Why: nesting habitat supports reproduction.", "Explain biodiversity impact. Why: fewer species or individuals reduces biodiversity."], "Catastrophic disturbance can reduce biodiversity."],
      ["Avoid overclaiming", "A data table shows two years of decline. What should the conclusion include?", ["State the observed decline. Why: use direct evidence.", "Name possible cause only if data supports it. Why: correlation is not always causation.", "Identify what extra evidence would help. Why: scientific claims need support."], "Careful claims include evidence and limits."]
    ],
    independent: ["Analyze a biodiversity data table.", "Explain how one invasive species can affect a food web.", "Write a CER response identifying a cause of biodiversity loss."],
    checkpoint: "Use biodiversity/invasive species data to explain a supported cause and effect."
  },
  {
    no: "06", title: "Resources, Costs, Benefits, and Sustainability", standards: ["MLA.BIO.ECO.03"], support: ["SC.912.L.17.11", "SC.912.L.17.20"],
    purpose: "Evaluate renewable/nonrenewable resources and individual sustainability impacts.",
    lab: "Resource and sustainability evidence comparison.", visuals: ["Renewable/nonrenewable comparison table", "Impact graph"], resources: ["EPA", "NOAA", "NASA Earth Observatory", "OpenStax"], stimulus: "Resource scenario/data table",
    vocab: ["<strong>Renewable resource:</strong> resource that can be replenished naturally on a useful time scale.", "<strong>Nonrenewable resource:</strong> resource used faster than it forms.", "<strong>Sustainability:</strong> using resources in ways that meet needs while reducing long-term harm.", "<strong>Cost-benefit analysis:</strong> comparing positive and negative impacts of a choice.", "<strong>Ecological footprint:</strong> measure of resource use and environmental impact."],
    teach1: `<p>Resource decisions involve tradeoffs. Renewable resources can still have environmental costs, and nonrenewable resources can provide benefits while creating long-term impacts. Sustainability analysis uses evidence about resource availability, habitat effects, pollution, carbon emissions, cost, reliability, and individual or community choices.</p>${table(["Resource Decision Factor", "Question to Ask", "Evidence Example"], [["Renewability", "Can it replenish on a useful time scale?", "Solar vs fossil fuel"], ["Environmental cost", "What habitat, pollution, or emissions impact occurs?", "Land use or CO2 data"], ["Benefit", "What human need is met?", "Energy reliability or food production"], ["Sustainability", "Can impact be reduced over time?", "Efficiency, conservation, recycling"]])}`,
    teach2: `<p>Evaluate both costs and benefits. Do not label a choice perfect or useless. A stronger response states the benefit, the environmental cost, and one evidence-based way to reduce the impact.</p>`,
    bad: "Renewable resources have no environmental costs.",
    good: "Renewable resources may reduce some impacts but still require evidence-based cost-benefit analysis.",
    explain: "Sustainability reasoning weighs benefits, costs, and possible mitigation.",
    examples: [
      ["Compare resources", "A table shows coal has high energy output and high emissions, while solar has low emissions but variable output. What is the tradeoff?", ["Identify benefits. Why: energy output and reliability matter.", "Identify costs. Why: emissions and variability matter.", "State balanced comparison. Why: sustainability uses tradeoffs."], "Resource choices involve costs and benefits."],
      ["Evaluate an action", "A household reduces electricity use by 20%. What sustainability impact is supported?", ["Read the percent change. Why: data shows reduced use.", "Connect to resource demand. Why: lower use can reduce demand.", "Avoid claiming it solves all problems. Why: one action has limited scope."], "Conservation can reduce resource demand."],
      ["Use evidence", "Why should a policy recommendation include data?", ["Identify decision claim. Why: recommendation needs support.", "Use cost-benefit evidence. Why: impacts can be compared.", "Include limitation. Why: no decision is impact-free."], "Evidence makes sustainability recommendations defensible."]
    ],
    independent: ["Complete a renewable/nonrenewable resource comparison table.", "Identify one cost, one benefit, and one mitigation strategy.", "Write a CER response recommending a sustainable choice."],
    checkpoint: "Use a resource scenario/data table to evaluate costs, benefits, and sustainability impacts."
  },
  {
    no: "07", title: "Environmental Monitoring and Policy Decisions", standards: ["MLA.BIO.ECO.03", "MLA.BIO.SCI.02"], support: ["SC.912.L.17.13", "ELA.K12.EE.1.1"],
    purpose: "Discuss monitoring data needed for environmental policy decisions.",
    lab: "Monitoring data and policy evidence analysis.", visuals: ["Monitoring map", "Water/air/land data table", "Policy evidence organizer"], resources: ["EPA", "NOAA", "USGS", "NASA", "state/local public data sources"], stimulus: "Monitoring data table/map",
    vocab: ["<strong>Environmental monitoring:</strong> repeated measurement of environmental conditions.", "<strong>Indicator:</strong> measurable sign of ecosystem condition.", "<strong>Policy decision:</strong> rule or action chosen to address a problem.", "<strong>Baseline:</strong> starting data used for comparison.", "<strong>Evidence-based argument:</strong> claim supported by data and reasoning."],
    teach1: `<p>Environmental policy decisions should be based on reliable monitoring data. Monitoring may track water quality, air quality, land use, species abundance, pollution, temperature, salinity, dissolved oxygen, or biodiversity. A policy argument should identify the problem, use baseline and trend data, compare options, and explain likely impacts.</p>${table(["Monitoring Data", "What It Can Show", "Policy Use"], [["Water quality", "pH, oxygen, nitrate, turbidity", "Protect aquatic life"], ["Air quality", "Particulate or ozone levels", "Reduce health/ecosystem risk"], ["Land data", "Habitat loss or fragmentation", "Guide land-use decisions"], ["Species data", "Population or biodiversity trends", "Protect threatened ecosystems"]])}`,
    teach2: `<p>Good policy reasoning does not start with an opinion. It starts with a measurable problem, reads the data trend, evaluates costs and benefits, and then recommends an action. If the data are limited, the answer should say what additional monitoring is needed.</p>`,
    bad: "Environmental policy should be chosen before looking at data.",
    good: "Environmental policy should be supported by monitoring data, trend evidence, costs, benefits, and limits.",
    explain: "Policy decisions are stronger when the evidence explains the problem and supports the response.",
    examples: [
      ["Use water data", "A river table shows dissolved oxygen falling below fish survival needs. What policy goal is supported?", ["Read the indicator. Why: dissolved oxygen affects aquatic animals.", "Compare to survival needs. Why: evidence shows risk.", "Recommend reducing the cause if identified. Why: policy should address the problem."], "Monitoring data can support water-quality policy."],
      ["Use baseline data", "A site had 80% wetland cover in 2000 and 45% in 2025. Why is the baseline useful?", ["Identify starting value. Why: baseline allows comparison.", "Compute direction of change. Why: wetland cover decreased.", "Connect to policy. Why: land-use decisions need trend evidence."], "Baseline data helps measure environmental change."],
      ["Name missing evidence", "A policy claim says pollution is increasing, but only one data point is provided. What is missing?", ["Identify the claim. Why: increasing means trend.", "Check evidence. Why: one point cannot show trend.", "Ask for repeated measurements. Why: monitoring requires comparison over time."], "Trend claims need repeated monitoring data."]
    ],
    independent: ["Analyze a monitoring map or table.", "Identify what policy decision the data can support.", "Write a CER policy argument including evidence and limits."],
    checkpoint: "Use monitoring data to support an environmental policy decision and identify any additional evidence needed."
  },
  {
    no: "08", title: "Putting It All Together", standards: ["MLA.BIO.ECO.01", "MLA.BIO.ECO.02", "MLA.BIO.ECO.03", "MLA.BIO.ENE.05"], support: ["ELA.K12.EE.1.1", "MA.K12.MTR.6.1"],
    purpose: "Synthesize ecosystems, populations, food webs, biodiversity, resources, monitoring, sustainability, and human impact.",
    lab: "Unit synthesis across ecosystems, populations, food webs, biodiversity, resources, and monitoring.", visuals: ["Map", "Food web", "Population graph", "Biodiversity data", "Resource table"], resources: ["Approved resources from Lessons 1-7 only"], stimulus: "Unit-level mixed stimuli from taught lessons",
    vocab: ["<strong>Synthesis:</strong> combining several evidence-based ideas in one explanation.", "<strong>Ecosystem evidence:</strong> maps, tables, graphs, and models used to explain relationships.", "<strong>Human impact:</strong> effect of human decisions on ecosystems.", "<strong>Tradeoff:</strong> cost and benefit that must be weighed.", "<strong>Evidence limit:</strong> what the data do not prove."],
    teach1: `<p>Unit 6 synthesis connects ecology data to decisions. Aquatic conditions explain distribution. Ecosystem change and succession explain change over time. Population graphs show limiting factors and carrying capacity. Food webs show energy transfer. Biodiversity and invasive species data show ecosystem risk. Resource and monitoring data support sustainability and policy decisions.</p>${table(["Unit 6 Evidence", "What It Explains", "Decision Connection"], [["Map/data table", "Aquatic distribution", "Habitat protection"], ["Succession timeline", "Ecosystem change over time", "Recovery planning"], ["Population graph", "Limiting factors/carrying capacity", "Resource management"], ["Food web", "Energy transfer and indirect effects", "Species protection"], ["Biodiversity/resource/monitoring data", "Human impact and tradeoffs", "Sustainability policy"]])}`,
    teach2: `<p>A strong Unit 6 synthesis response names the evidence source, explains the ecological relationship, and connects it to a human impact or decision when appropriate. It must stay inside the data instead of making broad claims that the evidence does not support.</p>`,
    bad: "Ecology questions can be answered with opinions because they involve human decisions.",
    good: "Ecology decisions should be supported by ecosystem evidence, data trends, costs, benefits, and clear limits.",
    explain: "Human-impact questions still require scientific evidence and reasoning.",
    examples: [
      ["Connect population and food web", "A limiting factor reduces rabbits in a food web. What could happen to predators?", ["Identify limiting factor effect. Why: rabbit population decreases.", "Trace food web arrows. Why: predators receive energy from prey.", "Predict predator decrease if rabbits are major food. Why: less food can reduce predator survival/reproduction."], "Population data and food webs can be connected."],
      ["Connect biodiversity and policy", "Monitoring data show invasive species increasing and native species declining. What decision is supported?", ["Read both trends. Why: evidence shows ecosystem change.", "Connect invasive increase to biodiversity risk. Why: native decline matters.", "Recommend monitoring/control with limits. Why: policy needs evidence and follow-up data."], "Biodiversity data can support management decisions."],
      ["Connect resource tradeoffs", "A community considers a lower-emission resource with higher land-use impact. What should the analysis include?", ["Identify benefit. Why: lower emissions are positive evidence.", "Identify cost. Why: land-use impact affects habitat.", "Weigh tradeoff and mitigation. Why: sustainability decisions require balanced evidence."], "Resource decisions require cost-benefit evidence."]
    ],
    independent: ["Complete a mixed Unit 6 evidence organizer.", "Explain two connections among population, food web, biodiversity, resources, and monitoring evidence.", "Write a synthesis CER using at least three Unit 6 evidence sources."],
    checkpoint: "Use mixed Unit 6 stimuli to write a synthesis response connecting ecosystem evidence, human impact, sustainability, and monitoring decisions."
  }
];

function p01(l) { return shell(l, `${hero("P01 Lesson Overview", l.title)}
${section(colors[0][0], colors[0][1], "Standards Covered in This Lesson", `<p><strong>Primary standard(s):</strong> ${l.standards.join(", ")}</p><p><strong>Support standard(s):</strong> ${l.support.join(", ")}</p>`)}
${section(colors[1][0], colors[1][1], "What You Will Learn", `<p>${l.purpose}</p>`)}
${section(colors[2][0], colors[2][1], "What You Will Do", list([`Analyze ${l.stimulus}.`, `Use the required visual/data display for this investigation: ${l.lab}`, "Write evidence-based explanations independently using the lesson pages."]))}
${section(colors[3][0], colors[3][1], "How You Will Show Mastery", `<p>You will complete notebook evidence, Moodle Guided Practice, independent work, and a Teacher of Record graded checkpoint with at least 80% mastery.</p>`)}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This lesson helps you use ecosystem data to explain organism distribution, population patterns, food web relationships, biodiversity, sustainability, monitoring, and human impact. Required visuals are included so you can reason from evidence instead of guessing.</p>`)}
${tor("if you reviewed the overview and still cannot explain what the lesson is asking you to master.")}`); }
function p02(l) { return shell(l, `${hero("P02 Notebook Task - Part 1", `Notebook Title: ${l.title}`)}
${section(colors[0][0], colors[0][1], "Vocabulary", list(l.vocab))}
${section(colors[1][0], colors[1][1], "Detailed Teaching Sequence", l.teach1)}
${section(colors[2][0], colors[2][1], "Notebook Task", `<p>Copy the required map, graph, table, food web, energy pyramid, timeline, or evidence organizer into your notebook. Add a final column titled <strong>Evidence clue</strong> and write the clue that supports each answer.</p>`)}
${tor("if you copied the visual/data display and still cannot identify the evidence clue.")}`); }
function p03(l) { return shell(l, `${hero("P03 Notebook Task - Part 2")}
${section(colors[0][0], colors[0][1], "Continue the Teaching Sequence", l.teach2)}
${section(colors[1][0], colors[1][1], "Step-by-Step Reasoning Routine", ol(["Name the ecology concept, relationship, trend, or decision in the question. Why: this prevents guessing from topic words only.", "Find the evidence in the map, graph, data table, food web, energy pyramid, timeline, or monitoring display. Why: ecology answers must be supported by evidence.", "Connect the evidence to the mapped standard vocabulary. Why: the answer must stay inside the lesson scope.", "Explain the conclusion in one complete sentence and include any limit. Why: mastery requires careful reasoning, not overclaiming."]))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you can name the concept but cannot explain the evidence behind it.")}`); }
function p04(l) { const ex = l.examples.map((e, i) => section(colors[i][0], colors[i][1], `Worked Example ${i + 1}: ${e[0]}`, `<p><strong>Problem:</strong> ${e[1]}</p>${ol(e[2].map((s, idx) => `<strong>Step ${idx + 1}:</strong> ${s}`))}<p><strong>Interpretation:</strong> ${e[3]}</p>`)).join("\n"); return shell(l, `${hero("P04 Worked Example")}
${ex}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> "${l.bad}"</p><p><strong style="color:#047857;">Correct:</strong> "${l.good}"</p><p><strong>Teachable explanation:</strong> ${l.explain}</p>`)}
${tor("if you tried all three worked examples and still cannot explain the reasoning step.")}`); }
function p05(l) { return shell(l, `${hero("P05 Guided Practice")}
${section(colors[0][0], colors[0][1], "Practice Focus", `<p>The guided practice checks this lesson target: ${l.purpose} It uses the mapped assessment stimulus: <strong>${l.stimulus}</strong>.</p>`)}
${section(colors[1][0], colors[1][1], "Before You Start", list(["Read the question first so you know what evidence to look for.", "Use the embedded map, graph, data table, food web, energy pyramid, timeline, model, or monitoring display before selecting an answer.", "Read feedback as instruction if you miss a question."]))}
${section(colors[2][0], colors[2][1], "Moodle Guided Practice", `<p>Complete the Moodle Guided Practice for this lesson. The practice is aligned only to this lesson's mapped standard(s), not future lessons.</p>`)}
${tor("after reviewing guided practice feedback if you still cannot connect the stimulus to the correct concept.")}`); }
function p06(l) { return shell(l, `${hero("P06 Independent Work")}
${section(colors[0][0], colors[0][1], "Instructions", `<p>Complete Parts A, B, and C in your notebook. Use the required map, graph, data table, food web, energy pyramid, timeline, model, or monitoring display as support.</p>`)}
${section(colors[1][0], colors[1][1], "Part A", `<p>${l.independent[0]}</p>`)}
${section(colors[2][0], colors[2][1], "Part B", `<p>${l.independent[1]}</p>`)}
${section(colors[3][0], colors[3][1], "Part C", `<p>${l.independent[2]}</p>`)}
${tor("if you completed Parts A and B but cannot write the Part C explanation.")}`); }
function p07(l) { return shell(l, `${hero("P07 Checkpoint")}
${section(colors[0][0], colors[0][1], "Teacher of Record Graded", `<p>This checkpoint is reviewed by your Teacher of Record. It shows whether you can use the lesson evidence and vocabulary independently.</p>`)}
${section(colors[1][0], colors[1][1], "Checkpoint Task", `<p>${l.checkpoint}</p>`)}
${section(colors[2][0], colors[2][1], "Notebook Evidence Submission", list(["P02 vocabulary and table/model notes.", "P03 reasoning routine and common mistake correction.", "P06 Parts A, B, and C.", "Final checkpoint response."]))}
${section("#334155", "#f8fafc", "Checkpoint Submission", `<p>Submit the required notebook evidence and final checkpoint response in the approved course location.</p>`)}
${section("#334155", "#f8fafc", "Submission Workflow", ol(["Review the lesson pages and notebook evidence before submitting.", "Check that your answer uses the embedded visual, data, model, table, graph, map, or scenario.", "Use Teacher of Record review feedback to correct or resubmit when the workflow requires it."]))}
${section(colors[3][0], colors[3][1], "Mastery Criteria", `<p>To meet mastery, your checkpoint must earn at least 80% and show accurate vocabulary, correct use of evidence, careful claim limits, and a complete explanation. If your work does not meet mastery, complete Teacher of Record intervention when required and resubmit corrections through the approved workflow.</p>`)}
${tor("if feedback shows that your answer is missing evidence, reasoning, or mapped lesson vocabulary.")}`); }
function json(l) { return JSON.stringify({ course: "Biology", unit: "Unit 06", lesson: `Lesson ${l.no}`, lessonTitle: l.title, mappedStandards: l.standards, supportStandards: l.support, lessonPurpose: l.purpose, pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"], masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment readiness" : "Lesson quiz"], labVisualSimulationRequirements: { labDataInvestigation: l.lab, requiredVisuals: l.visuals, candidateResourcesForApproval: l.resources, assessmentStimulus: l.stimulus }, asynchronousBoundary: "Lesson pages provide the instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only." }, null, 2); }

for (const l of lessons) {
  const dir = path.join(unitRoot, `Lesson ${l.no}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "P01.html"), p01(l), "utf8");
  fs.writeFileSync(path.join(dir, "P02.html"), p02(l), "utf8");
  fs.writeFileSync(path.join(dir, "P03.html"), p03(l), "utf8");
  fs.writeFileSync(path.join(dir, "P04.html"), p04(l), "utf8");
  fs.writeFileSync(path.join(dir, "P05.html"), p05(l), "utf8");
  fs.writeFileSync(path.join(dir, "P06.html"), p06(l), "utf8");
  fs.writeFileSync(path.join(dir, "P07.html"), p07(l), "utf8");
  fs.writeFileSync(path.join(dir, "lesson.json"), json(l), "utf8");
}
console.log("Generated Biology Unit 6 lessons.");
