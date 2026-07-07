const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "BIOLOGY", "Units", "Unit 06");

const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

const lessons = {
  "01": {
    title: "Aquatic Systems and Distribution of Life",
    standards: ["MLA.BIO.ECO.01"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Zone</th><th>Depth</th><th>Light</th><th>Common Producers</th></tr><tr><td>Shallow shelf</td><td>0-20 m</td><td>High</td><td>Many algae</td></tr><tr><td>Deep basin</td><td>200+ m</td><td>Very low</td><td>Few photosynthetic producers</td></tr></table>`, stem: "Which factor best explains the producer distribution?", correct: "Light decreases with depth, limiting photosynthesis in the deep basin.", distractors: ["Producers are always evenly distributed in all water depths.", "Depth affects only land organisms.", "Photosynthesis does not depend on light."], feedback: "Photosynthetic producers need light, so depth and light help explain distribution." },
      { html: `<table border="1" cellpadding="6"><tr><th>Site</th><th>Salinity</th><th>Organism Count</th></tr><tr><td>River mouth</td><td>Low</td><td>High freshwater insect larvae</td></tr><tr><td>Estuary middle</td><td>Variable</td><td>High tolerant fish</td></tr><tr><td>Open ocean</td><td>High</td><td>High marine plankton</td></tr></table>`, stem: "What conclusion is best supported by the data?", correct: "Different organisms are distributed according to salinity tolerance.", distractors: ["Salinity has no relationship to aquatic distribution.", "All organisms in the table prefer the same salinity.", "Only temperature can affect aquatic life."], feedback: "The organism counts change across salinity conditions, supporting salinity tolerance as a factor." },
      { html: `<table border="1" cellpadding="6"><tr><th>Location</th><th>Water Temperature</th><th>Dissolved Oxygen</th><th>Fish Count</th></tr><tr><td>A</td><td>18 C</td><td>8 mg/L</td><td>42</td></tr><tr><td>B</td><td>31 C</td><td>3 mg/L</td><td>8</td></tr></table>`, stem: "Which evidence best explains the lower fish count at Location B?", correct: "Low dissolved oxygen may limit fish survival.", distractors: ["Higher temperature always increases dissolved oxygen.", "Fish counts are unrelated to water chemistry.", "Location A has fewer fish than Location B."], feedback: "Many fish need adequate dissolved oxygen; low oxygen can restrict distribution." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Aquatic map description:</strong> Site 1 is a sunny shallow wetland. Site 2 is a shaded deep channel. Site 3 is a brackish estuary.</div>`, stem: "Where would photosynthetic aquatic plants most likely be most abundant?", correct: "Site 1, because it is shallow and sunny.", distractors: ["Site 2, because deep shaded water has the most light.", "Site 3, because brackish water always has the most plants.", "All three sites must have identical plant abundance."], feedback: "Shallow sunny water provides stronger light availability for photosynthesis." },
      { html: `<table border="1" cellpadding="6"><tr><th>Abiotic Factor</th><th>Possible Distribution Effect</th></tr><tr><td>Light</td><td>Producer location</td></tr><tr><td>Salinity</td><td>Freshwater/marine tolerance</td></tr><tr><td>Dissolved oxygen</td><td>Animal survival</td></tr><tr><td>Temperature</td><td>Metabolism and oxygen availability</td></tr></table>`, stem: "What is the best general rule for aquatic distribution?", correct: "Organism distribution depends on specific abiotic conditions in the water.", distractors: ["Only biotic factors ever affect aquatic distribution.", "All aquatic organisms need identical abiotic conditions.", "Aquatic distribution can be explained without data."], feedback: "Aquatic distribution is tied to abiotic data such as light, salinity, oxygen, and temperature." }
    ]
  },
  "02": {
    title: "Ecosystem Change and Succession",
    standards: ["MLA.BIO.ECO.01"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Year After Fire</th><th>Dominant Community</th><th>Soil Present?</th></tr><tr><td>1</td><td>Grasses</td><td>Yes</td></tr><tr><td>10</td><td>Shrubs</td><td>Yes</td></tr><tr><td>60</td><td>Young forest</td><td>Yes</td></tr></table>`, stem: "Which process is shown?", correct: "Secondary succession", distractors: ["Primary succession", "No ecosystem change", "Only seasonal migration"], feedback: "Soil remained after the fire, so the recovery sequence is secondary succession." },
      { html: `<table border="1" cellpadding="6"><tr><th>Surface</th><th>First Colonizers</th><th>Soil at Start</th></tr><tr><td>New lava rock</td><td>Lichens and mosses</td><td>No</td></tr></table>`, stem: "Why is this primary succession?", correct: "The sequence begins on a surface without soil.", distractors: ["The sequence begins after a farm field is abandoned.", "Soil remains from the previous forest.", "Primary succession requires a mature forest at the start."], feedback: "Primary succession begins where soil is absent, such as new rock." },
      { html: `<table border="1" cellpadding="6"><tr><th>Month</th><th>Pond Algae Level</th></tr><tr><td>January</td><td>Low</td></tr><tr><td>July</td><td>High</td></tr><tr><td>Next January</td><td>Low</td></tr></table>`, stem: "Which explanation best fits this repeating pattern?", correct: "Seasonal variation", distractors: ["A permanent climate trend is proven by one year.", "Primary succession on bare rock", "No environmental condition changed."], feedback: "A repeating annual pattern is evidence for seasonal variation." },
      { html: `<table border="1" cellpadding="6"><tr><th>Decade</th><th>Average Temperature</th><th>Species Range</th></tr><tr><td>1980s</td><td>22 C</td><td>Southern area</td></tr><tr><td>2020s</td><td>25 C</td><td>Southern and central areas</td></tr></table>`, stem: "What type of evidence is shown?", correct: "Long-term climate-related ecosystem change", distractors: ["One-day weather only", "A food web arrow direction", "No change in species distribution"], feedback: "Multi-decade temperature and range data can support climate-related ecosystem change." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Best Classification</th></tr><tr><td>Soil remains after disturbance</td><td>Secondary succession</td></tr><tr><td>No soil at start</td><td>Primary succession</td></tr><tr><td>Repeats each year</td><td>Seasonal variation</td></tr></table>`, stem: "What should students use to identify the type of ecosystem change?", correct: "Starting conditions, time scale, and evidence pattern", distractors: ["The longest answer choice", "Only the name of one organism", "A personal opinion about the ecosystem"], feedback: "Ecosystem change classification depends on starting conditions, time scale, and evidence." }
    ]
  },
  "03": {
    title: "Population Size, Limiting Factors, and Carrying Capacity",
    standards: ["MLA.BIO.ECO.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Births</th><th>Deaths</th><th>Immigration</th><th>Emigration</th></tr><tr><td>30</td><td>12</td><td>8</td><td>6</td></tr></table>`, stem: "What is the net population change?", correct: "20 individuals added", distractors: ["20 individuals removed", "56 individuals added", "No change"], feedback: "Births plus immigration are 38; deaths plus emigration are 18; net change is +20." },
      { html: `<table border="1" cellpadding="6"><tr><th>Year</th><th>Population Size</th></tr><tr><td>1</td><td>100</td></tr><tr><td>2</td><td>260</td></tr><tr><td>3</td><td>420</td></tr><tr><td>4</td><td>495</td></tr><tr><td>5</td><td>505</td></tr></table>`, stem: "What does the leveling near 500 most likely represent?", correct: "Carrying capacity", distractors: ["Emigration only", "A food web", "Primary succession"], feedback: "A population leveling around a stable value often indicates carrying capacity." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Scenario:</strong> A drought reduces plant growth. The rabbit population decreases during the same period.</div>`, stem: "Which limiting factor is most directly shown?", correct: "Food availability", distractors: ["Unlimited space", "Increased producer biomass", "No abiotic effect"], feedback: "Reduced plant growth can reduce food for rabbits, limiting population size." },
      { html: `<table border="1" cellpadding="6"><tr><th>Condition</th><th>Population Effect</th></tr><tr><td>Predator population increases</td><td>Prey deaths increase</td></tr><tr><td>Disease spreads</td><td>Survival decreases</td></tr></table>`, stem: "What do these conditions have in common?", correct: "They can act as limiting factors.", distractors: ["They always increase prey population size.", "They are producers.", "They remove carrying capacity from ecosystems."], feedback: "Predation and disease can restrict population growth." },
      { html: `<table border="1" cellpadding="6"><tr><th>Graph Pattern</th><th>Best Interpretation</th></tr><tr><td>Population rises rapidly, overshoots, then falls and stabilizes</td><td>?</td></tr></table>`, stem: "Which interpretation best completes the table?", correct: "The population exceeded resources and then moved back near carrying capacity.", distractors: ["Resources were unlimited forever.", "No limiting factors were present.", "The population could not change."], feedback: "Overshoot and decline can happen when a population exceeds available resources." }
    ]
  },
  "04": {
    title: "Food Webs and Energy Transfer",
    standards: ["MLA.BIO.ECO.02", "MLA.BIO.ENE.05"],
    stimuli: [
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Food web arrows:</strong> grass -> grasshopper -> frog -> snake</div>`, stem: "Which organism receives energy directly from the grasshopper?", correct: "Frog", distractors: ["Grass", "Snake", "Sunlight"], feedback: "The arrow from grasshopper to frog means energy moves from grasshopper to frog." },
      { html: `<table border="1" cellpadding="6"><tr><th>Trophic Level</th><th>Energy Available</th></tr><tr><td>Producers</td><td>10,000 units</td></tr><tr><td>Primary consumers</td><td>1,000 units</td></tr><tr><td>Secondary consumers</td><td>100 units</td></tr></table>`, stem: "What pattern is shown?", correct: "Available energy decreases at higher trophic levels.", distractors: ["Energy increases at every transfer.", "Secondary consumers have the most energy.", "Energy pyramids do not use trophic levels."], feedback: "Energy is reduced at each trophic transfer, so higher levels have less available energy." },
      { html: `<table border="1" cellpadding="6"><tr><th>Organism</th><th>Food Source</th></tr><tr><td>Algae</td><td>Makes food using light</td></tr><tr><td>Snail</td><td>Eats algae</td></tr><tr><td>Fish</td><td>Eats snails</td></tr></table>`, stem: "Which organism is the producer?", correct: "Algae", distractors: ["Snail", "Fish", "All three are decomposers"], feedback: "A producer makes food, usually by photosynthesis; the algae fits that role." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Food web change:</strong> A disease reduces rabbit populations. Coyotes eat rabbits as a major food source. Grasses are eaten by rabbits.</div>`, stem: "Which prediction is most reasonable?", correct: "Coyotes may decrease and grasses may increase.", distractors: ["Coyotes must increase because rabbits decrease.", "Grasses must decrease because fewer rabbits eat them.", "The food web cannot change."], feedback: "Fewer rabbits can reduce food for coyotes and reduce grazing pressure on grasses." },
      { html: `<table border="1" cellpadding="6"><tr><th>Role</th><th>Function</th></tr><tr><td>Producer</td><td>Captures energy</td></tr><tr><td>Consumer</td><td>Eats other organisms</td></tr><tr><td>Decomposer</td><td>Breaks down dead matter</td></tr></table>`, stem: "Why are decomposers important?", correct: "They recycle matter from dead organisms.", distractors: ["They create all sunlight.", "They stop energy from decreasing.", "They are always top predators."], feedback: "Decomposers break down dead material and return matter to ecosystems." }
    ]
  },
  "05": {
    title: "Biodiversity Loss and Invasive Species",
    standards: ["MLA.BIO.ECO.03", "MLA.BIO.SCI.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Year</th><th>Invasive Plant Cover</th><th>Native Plant Species</th></tr><tr><td>1</td><td>10%</td><td>18</td></tr><tr><td>5</td><td>70%</td><td>7</td></tr></table>`, stem: "Which claim is best supported?", correct: "As invasive plant cover increased, native plant diversity decreased.", distractors: ["Native plant diversity increased.", "Invasive species had no possible relationship to biodiversity.", "The table shows only animal migration."], feedback: "The data show invasive cover rising while native species count falls." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Event:</strong> A hurricane destroys nesting trees on an island. Bird nesting success drops the following season.</div>`, stem: "Which cause of biodiversity loss is shown?", correct: "Catastrophic event causing habitat loss", distractors: ["Increased habitat availability", "No ecosystem disturbance", "Food web energy gain"], feedback: "A hurricane is a catastrophic event, and nesting habitat loss can reduce reproduction." },
      { html: `<table border="1" cellpadding="6"><tr><th>Habitat Condition</th><th>Species Richness</th></tr><tr><td>Connected forest</td><td>42 species</td></tr><tr><td>Fragmented forest</td><td>19 species</td></tr></table>`, stem: "What effect is best supported?", correct: "Habitat fragmentation is associated with lower species richness.", distractors: ["Fragmentation increased species richness.", "Species richness stayed the same.", "Habitat condition cannot be measured."], feedback: "The fragmented forest has fewer species in the data table." },
      { html: `<table border="1" cellpadding="6"><tr><th>Climate Trend</th><th>Species Response</th></tr><tr><td>Warmer average temperatures</td><td>Cold-water species decline</td></tr><tr><td>Longer warm season</td><td>Warm-tolerant species expand</td></tr></table>`, stem: "Which conclusion is most careful?", correct: "Long-term climate shifts can change biodiversity patterns.", distractors: ["Climate never affects species distribution.", "Every species responds in the same way.", "The data prove no biodiversity change."], feedback: "The table connects long-term temperature patterns to species responses." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence Needed</th><th>Reason</th></tr><tr><td>Before-and-after species counts</td><td>Shows biodiversity change</td></tr><tr><td>Invasive abundance</td><td>Shows possible pressure</td></tr><tr><td>Habitat condition</td><td>Shows ecosystem context</td></tr></table>`, stem: "Why should claims about biodiversity loss use multiple data types?", correct: "Multiple data types help support the cause, effect, and limits of the claim.", distractors: ["Extra data always makes reasoning unnecessary.", "Biodiversity claims should rely only on opinion.", "One organism name proves every ecosystem effect."], feedback: "Biodiversity claims are stronger when cause, effect, and context are supported by evidence." }
    ]
  },
  "06": {
    title: "Resources, Costs, Benefits, and Sustainability",
    standards: ["MLA.BIO.ECO.03"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Resource</th><th>Renewable?</th><th>Benefit</th><th>Cost</th></tr><tr><td>Solar</td><td>Yes</td><td>Low emissions during use</td><td>Land/material needs</td></tr><tr><td>Coal</td><td>No</td><td>Reliable energy output</td><td>High emissions</td></tr></table>`, stem: "What is the best cost-benefit conclusion?", correct: "Both resources have benefits and costs that must be compared with evidence.", distractors: ["Renewable resources never have costs.", "Coal has no environmental impact.", "Cost-benefit analysis ignores data."], feedback: "Sustainability decisions require balanced evidence about benefits and costs." },
      { html: `<table border="1" cellpadding="6"><tr><th>Action</th><th>Electricity Use Before</th><th>Electricity Use After</th></tr><tr><td>Efficiency upgrade</td><td>500 kWh/month</td><td>400 kWh/month</td></tr></table>`, stem: "What sustainability impact is supported?", correct: "The action reduced electricity use by 100 kWh/month.", distractors: ["The action increased electricity use.", "The action proves all environmental impacts are gone.", "No resource use changed."], feedback: "The data show a 100 kWh/month reduction, which can reduce resource demand." },
      { html: `<table border="1" cellpadding="6"><tr><th>Choice</th><th>Short-Term Benefit</th><th>Long-Term Concern</th></tr><tr><td>Convert wetland to development</td><td>More housing</td><td>Reduced habitat and flood buffering</td></tr></table>`, stem: "Which issue must be included in a sustainability analysis?", correct: "The tradeoff between human benefit and ecosystem cost", distractors: ["Only the short-term benefit", "Only personal preference", "No environmental evidence"], feedback: "Sustainability weighs benefits, costs, and long-term ecosystem effects." },
      { html: `<table border="1" cellpadding="6"><tr><th>Resource</th><th>Formation Time</th><th>Use Rate</th></tr><tr><td>Fossil fuel</td><td>Millions of years</td><td>Used rapidly</td></tr><tr><td>Wind</td><td>Continuously available</td><td>Used without consuming wind</td></tr></table>`, stem: "Which resource is nonrenewable on a human time scale?", correct: "Fossil fuel", distractors: ["Wind", "Sunlight", "Both are equally renewable"], feedback: "Fossil fuels form over millions of years and are used faster than they are replaced." },
      { html: `<table border="1" cellpadding="6"><tr><th>Recommendation</th><th>Evidence Required</th></tr><tr><td>Reduce single-use plastic</td><td>Waste data, wildlife impact, cost, alternatives</td></tr></table>`, stem: "Why is evidence required before making the recommendation?", correct: "Evidence supports the claim and helps compare costs, benefits, and limits.", distractors: ["Evidence makes environmental decisions less accurate.", "Recommendations should be made before data are reviewed.", "Only one opinion is needed for sustainability decisions."], feedback: "Evidence-based recommendations are stronger because they compare impacts and tradeoffs." }
    ]
  },
  "07": {
    title: "Environmental Monitoring and Policy Decisions",
    standards: ["MLA.BIO.ECO.03", "MLA.BIO.SCI.02"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Month</th><th>Dissolved Oxygen</th><th>Fish Stress Reports</th></tr><tr><td>May</td><td>7 mg/L</td><td>Low</td></tr><tr><td>August</td><td>3 mg/L</td><td>High</td></tr></table>`, stem: "What policy goal is best supported?", correct: "Investigate and reduce causes of low dissolved oxygen in late summer.", distractors: ["Stop collecting water data.", "Assume oxygen has no effect on fish.", "Make policy without identifying the problem."], feedback: "Monitoring data show low oxygen associated with fish stress, supporting further investigation and action." },
      { html: `<table border="1" cellpadding="6"><tr><th>Year</th><th>Wetland Cover</th></tr><tr><td>2000</td><td>80%</td></tr><tr><td>2026</td><td>45%</td></tr></table>`, stem: "Why is the 2000 value useful?", correct: "It provides a baseline for measuring change.", distractors: ["It proves no change occurred.", "It replaces all future monitoring.", "It is unrelated to policy decisions."], feedback: "A baseline allows comparison with later data to measure change." },
      { html: `<table border="1" cellpadding="6"><tr><th>Claim</th><th>Data Available</th></tr><tr><td>Pollution is increasing</td><td>One water sample from one day</td></tr></table>`, stem: "What additional evidence is most needed?", correct: "Repeated measurements over time", distractors: ["A single opinion survey only", "No additional data", "A food web with no pollution data"], feedback: "An increasing trend requires repeated measurements across time." },
      { html: `<table border="1" cellpadding="6"><tr><th>Monitoring Indicator</th><th>Policy Use</th></tr><tr><td>Nitrate level</td><td>Manage runoff</td></tr><tr><td>Turbidity</td><td>Track sediment</td></tr><tr><td>Species count</td><td>Track biodiversity</td></tr></table>`, stem: "What does the table show?", correct: "Different indicators answer different policy questions.", distractors: ["One indicator answers every environmental question.", "Monitoring data cannot support policy.", "Only species counts matter."], feedback: "Policy decisions need indicators matched to the environmental problem." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Policy case:</strong> A city wants to restrict fertilizer use near a river. Available data show high nitrate levels after rain and algae blooms downstream.</div>`, stem: "Which evidence best supports the restriction?", correct: "High nitrate after rain and downstream algae blooms", distractors: ["The name of the river only", "A claim with no monitoring data", "A temperature reading from a different ecosystem"], feedback: "The nitrate and algae data connect fertilizer runoff to a water-quality problem." }
    ]
  },
  "08": {
    title: "Putting It All Together",
    standards: ["MLA.BIO.ECO.01", "MLA.BIO.ECO.02", "MLA.BIO.ECO.03", "MLA.BIO.ENE.05"],
    stimuli: [
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Ecology Connection</th></tr><tr><td>Low oxygen aquatic data</td><td>Distribution of fish</td></tr><tr><td>Population graph levels off</td><td>Carrying capacity</td></tr></table>`, stem: "Which synthesis statement is best?", correct: "Abiotic conditions and population limits both help explain ecosystem patterns.", distractors: ["Aquatic data and population graphs are unrelated to ecology.", "Carrying capacity means unlimited growth.", "Fish distribution cannot be affected by oxygen."], feedback: "Unit 6 synthesis connects abiotic conditions and population patterns." },
      { html: `<div style="border:1px solid #94a3b8;padding:8px;"><strong>Mixed stimulus:</strong> grass -> rabbit -> hawk. Drought reduces grass growth. Rabbit population falls.</div>`, stem: "Which connection is best supported?", correct: "A limiting factor can affect a population and then change a food web.", distractors: ["Drought increases grass and rabbits in the stimulus.", "Food webs do not include populations.", "Hawks are producers."], feedback: "The drought limits grass, rabbit numbers fall, and food-web relationships can be affected." },
      { html: `<table border="1" cellpadding="6"><tr><th>Data Pattern</th><th>Decision Need</th></tr><tr><td>Invasive species increases while native richness decreases</td><td>Management plan</td></tr><tr><td>Wetland cover decreases</td><td>Land-use review</td></tr></table>`, stem: "What do both rows show?", correct: "Environmental decisions should be based on monitoring and biodiversity evidence.", distractors: ["Policy should ignore ecosystem data.", "Only food-web arrows can support decisions.", "Biodiversity data cannot guide management."], feedback: "Monitoring and biodiversity data can support environmental management decisions." },
      { html: `<table border="1" cellpadding="6"><tr><th>Resource Choice</th><th>Benefit</th><th>Cost</th></tr><tr><td>Solar field</td><td>Lower emissions</td><td>Habitat conversion</td></tr><tr><td>Fossil fuel plant</td><td>Reliable output</td><td>Higher emissions</td></tr></table>`, stem: "Which response shows sustainability reasoning?", correct: "Compare benefits and costs, then recommend a choice with mitigation for impacts.", distractors: ["Choose without evidence.", "Ignore all costs if one benefit exists.", "Assume every resource is impact-free."], feedback: "Sustainability reasoning requires evidence-based cost-benefit comparison and mitigation." },
      { html: `<table border="1" cellpadding="6"><tr><th>Evidence Tool</th><th>Best Use</th></tr><tr><td>Aquatic map</td><td>Organism distribution</td></tr><tr><td>Population graph</td><td>Carrying capacity</td></tr><tr><td>Food web</td><td>Energy transfer</td></tr><tr><td>Monitoring table</td><td>Policy decision</td></tr></table>`, stem: "What is the best strategy for a mixed Unit 6 question?", correct: "Match the claim to the evidence tool that directly supports it.", distractors: ["Use the same evidence tool for every ecology question.", "Ignore the embedded data and guess.", "Choose the answer with the broadest unsupported claim."], feedback: "The correct evidence tool depends on the ecological claim being assessed." }
    ]
  }
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function cdata(s) {
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}
function questionXml(q) {
  return `  <question type="multichoice">
    <name><text>${esc(q.id)}</text></name>
    <questiontext format="html"><text>${cdata(q.text)}</text></questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
${q.answers.map((a) => `    <answer fraction="${a.correct ? 100 : 0}" format="html">
      <text>${cdata(a.text)}</text>
      <feedback format="html"><text>${cdata(a.feedback)}</text></feedback>
    </answer>`).join("\n")}
  </question>`;
}
function bankXml(category, questions) {
  return `<?xml version="1.0" encoding="utf-8"?>
<quiz>
  <question type="category">
    <category><text>$course$/${esc(category)}</text></category>
  </question>
${questions.map(questionXml).join("\n")}
</quiz>
`;
}
function makeQuestion(id, lesson, base, variant, correctIndex) {
  const standard = lesson.standards[variant % lesson.standards.length];
  const focus = [
    "Use the embedded Unit 6 ecology stimulus exactly as written.",
    "Focus on evidence from the map, graph, data table, food web, energy pyramid, resource table, or monitoring display.",
    "Connect the evidence to the mapped Biology ecology standard.",
    "Do not confuse aquatic conditions, succession, population limits, food-web energy, biodiversity, sustainability, and policy claims.",
    "Explain the ecology concept without overclaiming beyond the stimulus."
  ][variant % 5];
  const prompt = variant === 0 ? base.stem : `${base.stem} ${focus}`;
  const text = `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${prompt}</p>`;
  const wrongs = base.distractors.map((d, i) => ({
    text: variant === 0 ? d : `${d} (${["This ignores the embedded evidence.", "This confuses a Unit 6 ecology concept.", "This goes beyond the provided stimulus."][i % 3]})`,
    feedback: `${["This choice does not use the included stimulus.", "This choice confuses ecological evidence, mechanism, relationship, or decision reasoning.", "This choice overstates or misreads the evidence."][i % 3]} Recheck the embedded map, graph, table, food web, model, or scenario and connect the answer to the lesson standard.`
  }));
  const correct = {
    text: base.correct,
    feedback: `${base.feedback} This matches the mapped Unit 6 lesson content and uses the included stimulus.`
  };
  const answers = [];
  let w = 0;
  for (let i = 0; i < 4; i++) {
    answers.push(i === correctIndex ? { ...correct, correct: true } : { ...wrongs[w++], correct: false });
  }
  return { id, text, answers };
}
function buildBank(prefix, lessonNo, type, count) {
  const lesson = lessons[lessonNo];
  const qs = [];
  for (let i = 0; i < count; i++) {
    const base = lesson.stimuli[i % lesson.stimuli.length];
    const id = `${prefix}_U06_L${lessonNo}_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / lesson.stimuli.length), correctPattern[i % correctPattern.length]));
  }
  return qs;
}
function buildUnitBank(prefix, type, count) {
  const qs = [];
  for (let i = 0; i < count; i++) {
    const lessonNo = String((i % 8) + 1).padStart(2, "0");
    const lesson = lessons[lessonNo];
    const base = lesson.stimuli[Math.floor(i / 8) % lesson.stimuli.length];
    const id = `${prefix}_U06_${type}_Q${String(i + 1).padStart(2, "0")}`;
    qs.push(makeQuestion(id, lesson, base, Math.floor(i / 8), correctPattern[i % correctPattern.length]));
  }
  return qs;
}
function writeXml(filePath, category, questions) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, bankXml(category, questions), "utf8");
}

const coursePrefix = "BIO";

writeXml(path.join(unitRoot, "Moodle XML", "BIO_U06_Pretest_MoodleXML.xml"), "BIOLOGY/Units/Unit 06/Pretest", buildUnitBank(coursePrefix, "PT", 10));

for (const lessonNo of Object.keys(lessons)) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U06_L${lessonNo}_GuidedPractice_MoodleXML.xml`), `BIOLOGY/Units/Unit 06/Lesson ${lessonNo}/GuidedPractice`, buildBank(coursePrefix, lessonNo, "GP", 5));
}

for (const lessonNo of Object.keys(lessons).filter((n) => n !== "08")) {
  writeXml(path.join(unitRoot, `Lesson ${lessonNo}`, "Moodle XML", `BIO_U06_L${lessonNo}_Quiz_MoodleXML.xml`), `BIOLOGY/Units/Unit 06/Lesson ${lessonNo}/Quiz`, buildBank(coursePrefix, lessonNo, "QZ", 25));
}

writeXml(path.join(unitRoot, "Lesson 08", "Moodle XML", "BIO_U06_UnitAssessment_MoodleXML.xml"), "BIOLOGY/Units/Unit 06/UnitAssessment", buildUnitBank(coursePrefix, "UA", 40));

console.log("Generated Biology Unit 6 Moodle XML assessments.");
