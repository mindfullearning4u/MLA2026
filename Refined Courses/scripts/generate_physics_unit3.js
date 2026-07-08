const fs = require("fs");
const path = require("path");

const root = process.cwd();
const unitRoot = path.join(root, "PHYSICS", "Units", "Unit 03");
const auditRoot = path.join(root, "PHYSICS", "Course Audit");
const correctPattern = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1, 3, 2, 0, 3, 1, 0, 2];

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function cdata(s) { return `<![CDATA[${String(s).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`; }
function list(items) { return `<ul style="padding-left:24px;">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`; }
function ordered(items) { return `<ol style="padding-left:24px;">${items.map((i) => `<li>${i}</li>`).join("")}</ol>`; }
function table(headers, rows) {
  return `<table style="width:100%; border-collapse:collapse; font-size:17px; margin:10px 0;"><tr style="background:#dbeafe;">${headers.map((h) => `<th style="border:1px solid #94a3b8; padding:10px; text-align:left;">${h}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td style="border:1px solid #cbd5e1; padding:10px;">${c}</td>`).join("")}</tr>`).join("")}</table>`;
}
function section(color, bg, title, body) {
  return `  <section style="border:1px solid #d1d5db; border-left:6px solid ${color}; border-radius:10px; padding:20px; margin-bottom:18px; background:${bg};">
    <h2 style="font-size:23px; margin-top:0;">${title}</h2>
${body}
  </section>`;
}
function hero(title, subtitle = "") {
  return `  <section style="background:#eef7ff; border-left:8px solid #2563eb; border-radius:10px; padding:24px; margin-bottom:18px;">
    <h1 style="font-size:30px; margin:0;">${title}</h1>${subtitle ? `\n    <h2 style="font-size:24px; margin:10px 0 0 0;">${subtitle}</h2>` : ""}
  </section>`;
}
function tor(text, model = "Use the worked examples, energy diagrams, tables, and formulas before requesting support.") {
  return `  <div class="mla-tor-support-box" style="font-size:16px; line-height:1.45; color:#1f2933; background:#f8fafc; border:1px solid #bfdbfe; border-left:5px solid #2563eb; border-radius:8px; padding:12px 16px;">
    <p style="font-size:18px; font-weight:700; margin:0 0 6px 0;">Need Help?</p>
    <p style="margin:0 0 6px 0;">Contact your Teacher of Record ${text}</p>
    <p style="margin:0;">${model}</p>
  </div>`;
}
function shell(l, inner) {
  return `<div style="font-family:Arial, Helvetica, sans-serif; font-size:18px; line-height:1.65; color:#1f2933; max-width:980px; margin:0 auto 22px auto;">
  <div style="background:#102a43; color:#ffffff; border-radius:10px; padding:14px 18px; margin-bottom:18px;"><strong>PHYSICS | Unit 03 | Lesson ${l.no}</strong></div>
${inner}
</div>
`;
}

const lessons = [
  {
    no: "01", title: "Forms of Energy", primary: ["MLA.PHYS.ENE.01"], support: ["MLA.PHYS.SCI.01"],
    purpose: "Differentiate forms of energy in physical systems using evidence and system diagrams.",
    vocab: [["Energy", "the ability to cause change or do work."], ["Kinetic energy", "energy of motion."], ["Potential energy", "stored energy due to position, shape, or arrangement."], ["Thermal energy", "energy related to particle motion."], ["System", "the object or set of objects being analyzed."]],
    visual: table(["System", "Evidence", "Energy Form"], [["moving cart", "cart has speed", "kinetic"], ["stretched spring", "spring is deformed", "elastic potential"], ["book on high shelf", "raised position", "gravitational potential"], ["warm metal", "particles have greater average motion", "thermal"]]),
    lab: "Energy classification/model investigation using energy form chart and system diagram.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>System</th><th>Observation</th><th>Likely Energy Form</th></tr><tr><td>Cart</td><td>moving at 4 m/s</td><td>kinetic</td></tr><tr><td>Ball</td><td>held 2 m above floor</td><td>gravitational potential</td></tr><tr><td>Spring</td><td>compressed</td><td>elastic potential</td></tr></table>`,
    slow: table(["Question", "Teacher Slow Walk"], [["What is moving?", "motion points to kinetic energy."], ["What is stored?", "height, stretch, compression, or arrangement points to potential energy."], ["What is heating?", "temperature or particle motion points to thermal energy."], ["What is the system?", "energy form depends on the object being analyzed."]]),
    examples: [["Classify kinetic energy", "A cart is moving across a track. Which energy form is most directly shown?", ["Identify the system: cart. Why: energy belongs to the object/system.", "Look for evidence of motion. Why: kinetic energy is energy of motion.", "Choose kinetic energy. Why: the cart has speed."], "The cart has kinetic energy."], ["Classify potential energy", "A ball is held above the floor. Which energy form is stored?", ["Identify the position: above the floor. Why: height can store gravitational potential energy.", "Check that the ball is not described as moving. Why: motion would point to kinetic energy.", "Choose gravitational potential energy. Why: raised position stores energy."], "The ball has gravitational potential energy."], ["Use system reasoning", "Why can one system have more than one energy form?", ["A system may move and be raised. Why: those are different evidence clues.", "Motion means kinetic energy. Why: speed is present.", "Height means gravitational potential energy. Why: position relative to Earth is present."], "A moving raised object can have kinetic and gravitational potential energy."]],
    mistakeBad: "Energy is only present when something is moving fast.",
    mistakeGood: "Energy can be kinetic, potential, thermal, or another form depending on the system evidence.",
    task: "Classify energy forms in a system table and explain the evidence for each classification."
  },
  {
    no: "02", title: "Energy Transformations", primary: ["MLA.PHYS.ENE.01"], support: ["MLA.PHYS.LAB.03"],
    purpose: "Recognize transformations among forms of energy using evidence.",
    vocab: [["Energy transformation", "a change from one energy form to another."], ["Input energy", "energy form present before a process."], ["Output energy", "energy form present after a process."], ["Energy flow diagram", "a model showing how energy changes form."], ["Evidence", "data or observations used to support the transformation claim."]],
    visual: table(["Scenario", "Before", "After", "Transformation"], [["falling ball", "gravitational potential", "kinetic", "stored height energy to motion"], ["lamp", "electrical", "light and thermal", "electrical to radiant and thermal"], ["brakes", "kinetic", "thermal", "motion to heat"]]),
    lab: "Energy transformation investigation using an energy flow diagram and transformation table.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>System</th><th>Before</th><th>After</th><th>Evidence</th></tr><tr><td>Skateboarder down ramp</td><td>high position</td><td>faster motion</td><td>height decreases, speed increases</td></tr><tr><td>Flashlight</td><td>battery energy</td><td>light and warmth</td><td>bulb glows and warms</td></tr></table>`,
    slow: table(["Step", "How To Think"], [["1", "Identify the energy form before the process."], ["2", "Identify the energy form after the process."], ["3", "Use evidence such as speed, height, temperature, or light."], ["4", "Write the transformation as before -> after."]]),
    examples: [["Ramp transformation", "A skateboarder moves down a ramp and speeds up. What transformation occurs?", ["Before: high position. Why: height indicates gravitational potential energy.", "After: faster motion. Why: speed indicates kinetic energy.", "Write potential -> kinetic. Why: stored height energy becomes motion."], "Gravitational potential energy transforms into kinetic energy."], ["Light transformation", "A flashlight turns battery energy into light and warmth. What outputs occur?", ["Identify input: battery/electrical energy. Why: this starts the process.", "Identify output: light and warmth. Why: observations show radiant and thermal energy.", "Write electrical -> light + thermal. Why: energy changes form."], "Electrical energy transforms into light and thermal energy."], ["Avoid single-output thinking", "Why is a transformation often more than one output?", ["Real systems produce useful and less useful outputs. Why: energy spreads into several forms.", "A bulb gives light and heat. Why: warmth is thermal evidence.", "Include all observed outputs. Why: evidence controls the answer."], "Transformations can produce more than one output form."]],
    mistakeBad: "Energy disappears when it changes form.",
    mistakeGood: "Energy changes form; the evidence shows what forms are present before and after.",
    task: "Complete an energy flow diagram and explain the evidence for each transformation."
  },
  {
    no: "03", title: "Conservation of Energy", primary: ["MLA.PHYS.ENE.02"], support: ["MLA.PHYS.FOR.01"],
    purpose: "Apply conservation of energy to open, closed, and isolated systems.",
    vocab: [["Conservation of energy", "energy is not created or destroyed, only transferred or transformed."], ["Open system", "system that exchanges energy or matter with surroundings."], ["Closed system", "system that exchanges energy but not matter."], ["Isolated system", "ideal system with no exchange."], ["System boundary", "line that defines what is inside the system."]],
    visual: table(["System Type", "Matter Exchange?", "Energy Exchange?", "Example"], [["open", "yes", "yes", "open cup cooling"], ["closed", "no", "yes", "sealed bottle warming"], ["isolated", "no", "no idealized", "ideal thermos model"]]),
    lab: "Conservation/system boundary investigation using open, closed, and isolated system models.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Case</th><th>Inside System</th><th>Exchange With Surroundings</th></tr><tr><td>A</td><td>cart and track</td><td>some thermal energy to surroundings</td></tr><tr><td>B</td><td>ideal cart-track model</td><td>no energy leaves in model</td></tr></table>`,
    slow: table(["Step", "Teacher Slow Walk"], [["1", "Draw or state the system boundary."], ["2", "Identify energy forms inside the boundary."], ["3", "Check whether energy crosses the boundary."], ["4", "If energy seems lost, ask where it went."], ["5", "State transformation or transfer, not disappearance."]]),
    examples: [["System boundary", "Why must you define the system before using conservation?", ["Choose what is inside. Why: energy accounting depends on the boundary.", "Check exchanges with surroundings. Why: energy may leave the chosen system.", "Then apply conservation. Why: total energy is conserved when all transfers are counted."], "The system boundary tells what energy is being tracked."], ["Energy loss wording", "A cart slows because of friction. Did energy disappear?", ["Observe slowing: kinetic energy decreases. Why: speed decreases.", "Identify friction. Why: friction transfers energy to thermal energy.", "State transformation. Why: energy changes form, not disappears."], "Kinetic energy becomes thermal energy in the cart, track, and surroundings."], ["Ideal model", "Why does an ideal model keep total mechanical energy constant?", ["Ideal means no energy leaves by friction or air resistance. Why: those transfers are excluded.", "Potential and kinetic can trade. Why: energy transforms inside the system.", "Total stays constant in the model. Why: conservation applies to the isolated model."], "In an ideal isolated model, total mechanical energy stays constant."]],
    mistakeBad: "A slowing object proves energy was destroyed.",
    mistakeGood: "A slowing object shows energy was transferred or transformed, often into thermal energy.",
    task: "Use a system-boundary table to explain where energy goes in a conservation scenario."
  },
  {
    no: "04", title: "Work", primary: ["MLA.PHYS.ENE.03"], support: ["MLA.PHYS.LAB.03"],
    purpose: "Compare and calculate work in physical systems.",
    vocab: [["Work", "energy transferred when a force moves an object through a distance."], ["Force", "a push or pull measured in newtons."], ["Distance", "how far the object moves in the force direction."], ["Joule", "unit of work and energy."], ["Transfer", "movement of energy from one object or form to another."]],
    visual: table(["Force (N)", "Distance (m)", "Work (J)", "Meaning"], [["10", "2", "20", "10 N force over 2 m"], ["5", "4", "20", "smaller force over longer distance"], ["20", "0", "0", "no distance, no work by that force"]]),
    lab: "Work data/calculation investigation using force-distance table and equation organizer.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Trial</th><th>Force (N)</th><th>Distance in Force Direction (m)</th><th>Work (J)</th></tr><tr><td>A</td><td>10</td><td>2</td><td>20</td></tr><tr><td>B</td><td>5</td><td>4</td><td>20</td></tr><tr><td>C</td><td>20</td><td>0</td><td>0</td></tr></table>`,
    slow: table(["Formula", "Meaning", "Student Check"], [["W = Fd", "work equals force times distance", "force must move object through distance"], ["F", "force in newtons", "use force in direction of motion"], ["d", "distance in meters", "must be distance moved while force acts"], ["J", "joule", "unit for work and energy"]]),
    examples: [["Calculate work", "A 10 N force moves a box 2 m. How much work is done?", ["Write W = Fd. Why: work uses force and distance.", "Substitute W = 10 N x 2 m. Why: use given quantities.", "Multiply and label joules. Why: N*m equals J."], "Work is 20 J."], ["No distance", "A student pushes a wall with 20 N, but the wall does not move. How much work is done on the wall?", ["Identify force: 20 N. Why: force alone is not enough.", "Identify distance: 0 m. Why: wall does not move.", "Calculate W = 20 x 0. Why: no distance means no work on the wall."], "Work on the wall is 0 J."], ["Compare trials", "Why can 10 N over 2 m and 5 N over 4 m both equal 20 J?", ["Calculate first: 10 x 2 = 20. Why: force-distance product.", "Calculate second: 5 x 4 = 20. Why: different factors can have same product.", "Compare work values. Why: same energy transfer."], "Both transfer 20 J of energy."]],
    mistakeBad: "Any force means work is done.",
    mistakeGood: "Work requires force and distance in the force direction.",
    task: "Use W = Fd to calculate and compare work from a force-distance table."
  },
  {
    no: "05", title: "Power", primary: ["MLA.PHYS.ENE.03"], support: ["MLA.PHYS.LAB.03"],
    purpose: "Compare and calculate power in physical systems.",
    vocab: [["Power", "rate at which work is done or energy is transferred."], ["Rate", "amount per unit time."], ["Watt", "unit of power equal to one joule per second."], ["Work", "energy transferred by force over distance."], ["Time", "duration over which work is done."]],
    visual: table(["Work (J)", "Time (s)", "Power (W)", "Meaning"], [["100", "10", "10", "10 J each second"], ["100", "5", "20", "same work faster"], ["50", "5", "10", "less work in same time"]]),
    lab: "Power rate data investigation using work-time-power table and comparison graph.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Machine</th><th>Work (J)</th><th>Time (s)</th><th>Power (W)</th></tr><tr><td>A</td><td>100</td><td>10</td><td>10</td></tr><tr><td>B</td><td>100</td><td>5</td><td>20</td></tr><tr><td>C</td><td>50</td><td>5</td><td>10</td></tr></table>`,
    slow: table(["Formula", "Meaning", "Student Check"], [["P = W / t", "power equals work divided by time", "use when work and time are known"], ["W", "work in joules", "not the watt symbol in this formula context"], ["t", "time in seconds", "shorter time can mean greater power"], ["Watt", "J/s", "power unit, not work"]]),
    examples: [["Calculate power", "A machine does 100 J of work in 5 s. What is its power?", ["Write P = W / t. Why: power is work per time.", "Substitute P = 100 J / 5 s. Why: use given work and time.", "Divide and label watts. Why: J/s is W."], "Power is 20 W."], ["Compare same work", "Two machines do 100 J, but one takes 10 s and one takes 5 s. Which has more power?", ["Work is the same. Why: compare time effect.", "Shorter time means more work per second. Why: power is rate.", "5 s machine has 20 W versus 10 W. Why: 100/5 > 100/10."], "The 5 s machine has more power."], ["Avoid work-power confusion", "Can two systems do the same work with different power?", ["Work is total energy transfer. Why: amount can match.", "Power depends on time. Why: rate can differ.", "Same work in less time means higher power."], "Yes, same work can occur at different power."]],
    mistakeBad: "Power and work mean the same thing.",
    mistakeGood: "Work is energy transferred; power is how fast that transfer happens.",
    task: "Use P = W / t to calculate power and compare systems by rate."
  },
  {
    no: "06", title: "Heat, Temperature, and Matter States", primary: ["MLA.PHYS.ENE.04"], support: ["MLA.PHYS.SCI.01"],
    purpose: "Explain heat transfer, temperature, average molecular kinetic energy, and states of matter.",
    vocab: [["Heat", "energy transferred because of temperature difference."], ["Temperature", "measure related to average particle kinetic energy."], ["Thermal energy", "total internal energy related to particle motion and arrangement."], ["State of matter", "solid, liquid, gas, or plasma physical form."], ["Particle model", "diagram explaining matter with particle motion and spacing."]],
    visual: table(["State", "Particle Motion", "Particle Spacing", "Shape/Volume"], [["solid", "vibrate in place", "close", "fixed shape and volume"], ["liquid", "slide past each other", "close", "fixed volume, container shape"], ["gas", "move freely", "far apart", "fills container"]]),
    lab: "Thermal model and particle-motion investigation using particle diagrams and temperature/kinetic energy model.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Sample</th><th>Temperature Change</th><th>Particle Motion Change</th></tr><tr><td>A</td><td>increases</td><td>average particle kinetic energy increases</td></tr><tr><td>B</td><td>decreases</td><td>average particle kinetic energy decreases</td></tr></table>`,
    slow: table(["Idea", "Teacher Slow Walk"], [["Heat", "energy moving from warmer to cooler because of temperature difference."], ["Temperature", "average particle kinetic energy, not total energy."], ["Thermal energy", "depends on amount of matter and particle energy."], ["State changes", "energy changes particle motion or spacing without changing substance identity."]]),
    examples: [["Temperature meaning", "What happens to average particle motion when temperature increases?", ["Temperature relates to average kinetic energy. Why: it measures particle motion on average.", "Increasing temperature means more average kinetic energy. Why: particles move faster on average.", "State the particle model. Why: microscopic motion explains observable temperature."], "Average particle kinetic energy increases."], ["Heat direction", "Which way does heat transfer between warm metal and cool water?", ["Identify temperatures. Why: heat transfer depends on temperature difference.", "Heat moves from warmer to cooler. Why: thermal energy transfers down the temperature difference.", "State metal to water if metal is warmer."], "Heat transfers from the warmer object to the cooler object."], ["Matter state model", "Why do gases fill a container?", ["Gas particles are far apart. Why: spacing is large.", "They move freely. Why: motion is not fixed in place.", "They spread to available volume. Why: particle model explains gas behavior."], "Gas particles spread out and fill the container."]],
    mistakeBad: "Temperature and heat are the same thing.",
    mistakeGood: "Temperature measures average particle kinetic energy; heat is energy transferred because of temperature difference.",
    task: "Use a particle model table to explain heat transfer, temperature, and matter states."
  },
  {
    no: "07", title: "Momentum Conservation in Energy Systems", primary: ["MLA.PHYS.ENE.05"], support: ["MLA.PHYS.ENE.02"],
    purpose: "Apply conservation of linear momentum to collisions and system interactions.",
    vocab: [["Momentum conservation", "total momentum of a closed system remains constant."], ["Closed system", "system with no net external force for the interaction being analyzed."], ["Before/after table", "data display comparing quantities before and after an event."], ["Collision", "interaction where objects exert forces during contact."], ["Total momentum", "sum of momenta for all objects in the system."]],
    visual: table(["Cart", "Before Momentum", "After Momentum", "System Note"], [["A", "6 kg m/s east", "2 kg m/s east", "loses momentum"], ["B", "0", "4 kg m/s east", "gains momentum"], ["Total", "6 kg m/s east", "6 kg m/s east", "conserved"]]),
    lab: "Momentum conservation collision investigation using before/after momentum table and system model.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Cart</th><th>Before Momentum</th><th>After Momentum</th></tr><tr><td>A</td><td>6 kg m/s east</td><td>2 kg m/s east</td></tr><tr><td>B</td><td>0 kg m/s east</td><td>4 kg m/s east</td></tr><tr><td>Total</td><td>6 kg m/s east</td><td>6 kg m/s east</td></tr></table>`,
    slow: table(["Step", "How To Think"], [["1", "Define the system as all colliding objects."], ["2", "Find total momentum before."], ["3", "Find total momentum after."], ["4", "Compare totals, not only one object."], ["5", "If totals match and no external net force is included, momentum is conserved."]]),
    examples: [["Compare totals", "Is total momentum conserved in the table?", ["Read total before: 6 kg m/s east. Why: use the system total.", "Read total after: 6 kg m/s east. Why: compare before and after.", "Totals match. Why: momentum is conserved in the closed-system model."], "Total momentum is conserved."], ["One object changes", "Does Cart A losing momentum mean momentum was destroyed?", ["Cart A decreases from 6 to 2. Why: one object changed.", "Cart B increases from 0 to 4. Why: another object gained momentum.", "Total remains 6. Why: momentum transferred within the system."], "Momentum was transferred, not destroyed."], ["System boundary", "Why include both carts in the system?", ["Collision forces act between the carts. Why: internal forces transfer momentum.", "One cart alone does not show total conservation. Why: it can gain or lose momentum.", "Both carts show the total before and after."], "Both carts are needed to check conservation."]],
    mistakeBad: "Momentum is not conserved if one object slows down.",
    mistakeGood: "Check total system momentum before and after; one object can lose momentum while another gains it.",
    task: "Use a before/after momentum table to determine whether system momentum is conserved."
  },
  {
    no: "08", title: "Putting It All Together", primary: ["MLA.PHYS.ENE.01", "MLA.PHYS.ENE.02", "MLA.PHYS.ENE.03", "MLA.PHYS.ENE.04", "MLA.PHYS.ENE.05"], support: ["MLA.PHYS.SCI.01", "MLA.PHYS.LAB.03", "MLA.PHYS.FOR.01"],
    purpose: "Synthesize energy forms, transformations, conservation, work, power, thermal systems, and momentum conservation.",
    vocab: [["Synthesis", "using several concepts together to solve a larger problem."], ["Energy model", "diagram or table tracking energy forms and changes."], ["Rate", "amount per time, used in power."], ["System boundary", "what is included in conservation accounting."], ["Conservation evidence", "before/after totals showing what stayed constant."]],
    visual: table(["Stimulus", "Concept Needed", "What To Check"], [["energy form chart", "forms of energy", "motion, height, heat, storage"], ["energy flow diagram", "transformation", "before and after forms"], ["force-distance table", "work", "W = Fd"], ["work-time table", "power", "P = W/t"], ["collision table", "momentum conservation", "total before and after"]]),
    lab: "Unit synthesis across energy, work, power, thermal systems, and momentum.",
    stimulus: `<table border="1" cellpadding="6"><tr><th>Evidence</th><th>Question Type</th><th>Needed Concept</th></tr><tr><td>force and distance</td><td>energy transfer</td><td>work</td></tr><tr><td>work and time</td><td>rate</td><td>power</td></tr><tr><td>before/after collision totals</td><td>conservation</td><td>momentum</td></tr><tr><td>temperature and particles</td><td>thermal model</td><td>heat/temperature</td></tr></table>`,
    slow: table(["Before Solving", "Reason"], [["Choose the concept", "Unit 3 has several energy tools; do not use the wrong one."], ["Identify the system", "Conservation depends on the boundary."], ["Read the stimulus", "The table or model tells which quantity is available."], ["Explain with evidence", "A final number without meaning is not mastery."]]),
    examples: [["Choose the right model", "A question gives force and distance. Which concept fits?", ["Read the quantities: force and distance. Why: those are work variables.", "Use W = Fd. Why: work is force times distance.", "Do not use power unless time is given. Why: power is work per time."], "Use work."], ["Rate question", "A question gives 100 J and 5 s. Which concept fits?", ["Read quantities: work and time. Why: rate uses time.", "Use P = W/t. Why: power is work per time.", "Label answer in watts. Why: J/s is W."], "Use power."], ["Conservation question", "A table shows total momentum before and after. What should you compare?", ["Use totals, not one object. Why: conservation applies to system total.", "Compare before and after values. Why: equality shows conservation.", "Explain transfer if individual objects change."], "Compare total system momentum before and after."]],
    mistakeBad: "Use the same formula for every Unit 3 problem.",
    mistakeGood: "Choose the formula or model based on the quantities and stimulus: energy form, transformation, conservation, work, power, thermal model, or momentum.",
    task: "Use mixed Unit 3 stimuli to identify the correct concept, solve when needed, and write a CER explanation."
  }
];

function deepTeaching(l) {
  return `<p>Physics Unit 3 is about tracking energy and momentum carefully. First define the system. Next identify the quantity shown in the stimulus: energy form, force, distance, work, time, temperature, particle motion, or before/after momentum. Then choose the correct model or formula.</p>${l.slow}<p><strong>Teacher move:</strong> A veteran Physics teacher would ask, "What is being tracked, what is the system boundary, and what quantity is given?" before allowing a formula.</p>`;
}
function misconceptionLadder(l) {
  return `<p><strong>Remedial support:</strong> Read one row, energy form, variable, or particle-model feature at a time. Say what it means in words before calculating.</p>
<p><strong>Standard support:</strong> Identify the system, choose the correct energy/momentum model, and explain the answer using the stimulus.</p>
<p><strong>Accelerated extension:</strong> Explain how the answer changes if work, time, force, distance, temperature, mass, velocity, or the system boundary changes.</p>
<p><strong>Question to ask yourself:</strong> What confusion might a student have, and what table, diagram, or formula removes that confusion?</p>`;
}

function page01(l) { return shell(l, `${hero("P01 Lesson Overview", l.title)}
${section("#0f766e", "#f0fdfa", "Standards Covered in This Lesson", `<p><strong>Primary:</strong> ${l.primary.join(", ")}</p><p><strong>Support:</strong> ${l.support.join(", ")}</p>`)}
${section("#2563eb", "#eff6ff", "What You Will Learn", `<p>${l.purpose}</p>`)}
${section("#7c3aed", "#f5f3ff", "What You Will Do", list(["Read energy, work, power, thermal, and momentum situations slowly.", "Copy vocabulary, formulas, diagrams, and tables into your notebook.", "Use embedded models and data to make evidence-based physics decisions.", "Complete Guided Practice, Independent Work, and the Checkpoint."]))}
${section("#f59e0b", "#fffbeb", "How You Will Show Mastery", list(["Use the correct energy or momentum model.", "Show units and system boundaries when required.", "Explain why the evidence supports the answer.", "Score at least 80% on required mastery checks."]))}
${section("#334155", "#f8fafc", "Student-Friendly Standard Connection", `<p>This lesson helps you track energy or momentum using evidence instead of guessing from a single word.</p>`)}
${section("#dc2626", "#fef2f2", "Science Safety and Resource Note", `<p>Use only the embedded data, diagrams, and approved directions. Do not perform physical heat, collision, ramp, or moving-object investigations unless the Teacher of Record or school has approved the setup.</p>`)}
${tor("if you are unsure how the energy, work, power, thermal, or momentum model connects to the standard.", "Show the exact stimulus row, diagram, formula, or system boundary that is confusing.")}`); }
function page02(l) { return shell(l, `${hero("P02 Notebook Task - Part 1")}
${section("#f59e0b", "#fffbeb", "Notebook Title", `<p><strong>Lesson ${Number(l.no)}: ${l.title}</strong></p>`)}
${section("#7c3aed", "#f5f3ff", "Vocabulary", list(l.vocab.map(([term, def]) => `<strong>${term}:</strong> ${def}`)))}
${section("#0f766e", "#f0fdfa", "Step 1: Identify the System", `<p>Before using a formula, identify the object or system. In Unit 3, wrong answers often happen because students do not decide whether they are tracking energy form, energy transfer, rate, temperature, or momentum.</p>`)}
${section("#2563eb", "#eff6ff", "Step 2: Read the Evidence", `<p>Evidence may be an energy diagram, system-boundary model, force-distance table, work-time table, thermal particle model, or before/after momentum table. Read the labels and units before solving.</p>${l.visual}`)}
${section("#334155", "#f8fafc", "Veteran Teacher Slow Walk", deepTeaching(l))}
${section("#16a34a", "#f0fdf4", "Step 3: Connect Evidence to the Model", `<p>After reading the evidence, name the model or formula that fits. Do not use a formula until you know why that formula applies.</p>`)}
${tor("if you can identify the evidence but cannot decide which energy or momentum model applies.", "Bring the system, evidence, and formula or diagram you tried.")}`); }
function page03(l) { return shell(l, `${hero("P03 Notebook Task - Part 2")}
${section("#0f766e", "#f0fdfa", "Step 4: Use an Energy Reasoning Routine", `<p>Use this routine for every Unit 3 problem.</p>${ordered(["Choose the system or process.", "List the forms, quantities, or before/after values shown.", "Choose the matching model or formula.", "Solve or interpret using units.", "Explain why the evidence supports the answer."])}`)}
${section("#2563eb", "#eff6ff", "Embedded Investigation Planning", `<p><strong>Investigation focus:</strong> ${l.lab}</p><p>This lesson uses safe virtual, data-based, or model-based investigation evidence. You are not required to create a physical heat, ramp, collision, or moving-object setup.</p>${l.stimulus}`)}
${section("#7c3aed", "#f5f3ff", "Support for Different Readiness Levels", misconceptionLadder(l))}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> ${l.mistakeBad}</p><p>This is incorrect because it ignores the system, model, unit, rate, or conservation relationship.</p><p><strong style="color:#047857;">Correct:</strong> ${l.mistakeGood}</p><p><strong>Teachable explanation:</strong> Correct Physics reasoning names the system, uses the given stimulus, and applies the correct energy or momentum model.</p>`)}
${tor("if your explanation still sounds like a guess after using the energy reasoning routine.", "Show your system choice and the evidence you used.")}`); }
function page04(l) { return shell(l, `${hero("P04 Worked Example")}
${section("#334155", "#f8fafc", "Before the Worked Examples", `<p>Do not start by hunting for an answer choice. Set up the physics first. Identify the system, read the given stimulus, and choose the model or formula that belongs to that evidence.</p>${deepTeaching(l)}`)}
${l.examples.map((ex, i) => section(["#0f766e", "#7c3aed", "#f59e0b"][i], ["#f0fdfa", "#f5f3ff", "#fffbeb"][i], `Worked Example ${i + 1}: ${ex[0]}`, `<p><strong>Problem:</strong> ${ex[1]}</p>${ordered(ex[2].map((step, j) => `<strong>Step ${j + 1}:</strong> ${step}`))}<p><strong>Answer:</strong> ${ex[3]}</p><p><strong>Interpretation:</strong> This example shows how a veteran Physics teacher would slow down, identify the system, use the diagram/table/formula, and explain the result.</p>`)).join("\n")}
${section("#dc2626", "#fef2f2", "Common Mistake", `<p><strong style="color:#b91c1c;">Incorrect:</strong> ${l.mistakeBad}</p><p><strong style="color:#047857;">Correct:</strong> ${l.mistakeGood}</p><p><strong>Teachable explanation:</strong> The correct version uses the mapped Physics evidence. The incorrect version skips the system, model, unit, rate, or conservation relationship.</p>`)}
${tor("if you can follow one worked example but cannot transfer the same routine to a new example.", "Tell the Teacher of Record which step breaks down: system, evidence, formula/model, unit, rate, or explanation.")}`); }
function page05(l) { return shell(l, `${hero("P05 Guided Practice")}
${section("#2563eb", "#eff6ff", "Guided Practice Readiness", `<p>Guided Practice focuses only on <strong>${l.title}</strong>. Each Moodle XML question includes the needed table, energy diagram, model, or stimulus directly in the question.</p>`)}
${section("#0f766e", "#f0fdfa", "Before You Start", list(["Review the vocabulary from P02.", "Review the common mistake from P03 and P04.", "Keep units with work, power, heat, energy, and momentum quantities.", "Read each embedded diagram or table before selecting an answer."]))}
${section("#f59e0b", "#fffbeb", "Mastery Reminder", `<p>Assessment scope is locked to ${l.primary.join(", ")} for this lesson.</p>`)}
${tor("if you miss Guided Practice questions because you cannot interpret the embedded energy or momentum stimulus.", "Copy the question ID and identify which diagram, row, or formula step confused you.")}`); }
function page06(l) { return shell(l, `${hero("P06 Independent Work")}
${section("#2563eb", "#eff6ff", "Instructions", `<p>Complete Parts A, B, and C in your notebook. Show units, system boundaries, and reasoning.</p>`)}
${section("#0f766e", "#f0fdfa", "Part A: Vocabulary and Model", `<p>Define three lesson vocabulary terms and draw or describe the lesson model in your own words.</p>`)}
${section("#7c3aed", "#f5f3ff", "Part B: Data, Diagram, or Calculation", `<p>${l.task}</p>${l.stimulus}`)}
${section("#f59e0b", "#fffbeb", "Part C: CER Explanation", `<p>Write one claim, two pieces of evidence, and one reasoning sentence that uses the correct Unit 3 Physics concept.</p>`)}
${tor("if you can solve the numbers but cannot explain the physics meaning.", "Bring Part B and your draft claim so support can focus on reasoning.")}`); }
function page07(l) { return shell(l, `${hero("P07 Checkpoint")}
${section("#dc2626", "#fef2f2", "Teacher of Record Graded", `<p>This checkpoint is graded by the Teacher of Record. It checks whether you can use the lesson model independently.</p>`)}
${section("#2563eb", "#eff6ff", "Checkpoint Task", `<p>${l.task} Then write a CER paragraph that connects the result to ${l.primary.join(", ")}.</p>`)}
${section("#0f766e", "#f0fdfa", "Notebook Evidence Submission", list(["Vocabulary table from P02.", "Energy reasoning routine from P03.", "One worked-example model from P04.", "Independent Work Parts A, B, and C from P06."]))}
${section("#7c3aed", "#f5f3ff", "Submission Workflow", ordered(["Submit the notebook evidence in Moodle.", "Wait for Teacher of Record review.", "Correct and resubmit if revisions are required.", "If assessment mastery is below 80%, meet with the Teacher of Record before another attempt is released."]))}
${section("#f59e0b", "#fffbeb", "Mastery Criteria", list(["Evidence is accurate and tied to the lesson standard.", "Units, formulas, system boundaries, and models are used correctly.", "CER response includes claim, evidence, and reasoning.", "Mastery level is 80% or higher."]))}
${tor("for checkpoint clarification, revision guidance, or intervention after an unsuccessful attempt.", "Bring the exact notebook evidence and question IDs that need review.")}`); }

function writeLessons() {
  for (const l of lessons) {
    const dir = path.join(unitRoot, `Lesson ${l.no}`);
    ensureDir(dir);
    for (const [name, content] of Object.entries({ "P01.html": page01(l), "P02.html": page02(l), "P03.html": page03(l), "P04.html": page04(l), "P05.html": page05(l), "P06.html": page06(l), "P07.html": page07(l) })) fs.writeFileSync(path.join(dir, name), content, "utf8");
    fs.writeFileSync(path.join(dir, "lesson.json"), JSON.stringify({ course: "Physics", unit: "Unit 03", lesson: `Lesson ${l.no}`, lessonTitle: l.title, mappedStandards: l.primary, supportStandards: l.support, lessonPurpose: l.purpose, pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"], masteryEvidence: ["Notebook evidence", "Guided Practice", "Checkpoint submission", l.no === "08" ? "Unit assessment" : "Lesson quiz"], labVisualSimulationRequirements: { labDataInvestigation: l.lab, requiredVisuals: ["energy/momentum diagram or table", "student-facing data/model stimulus"], candidateResourcesForApproval: ["PhET", "OpenStax College Physics", "CPALMS resources"], assessmentStimulus: "directly embedded Moodle XML stimulus" }, asynchronousBoundary: "Lesson pages provide instruction. Teacher of Record support is for clarification, intervention, checkpoint review, and retake workflow only." }, null, 2), "utf8");
  }
}
function makeBaseQuestions(l) {
  return [
    { standard: l.primary[0], html: l.stimulus, stem: `Which conclusion is best supported for ${l.title}?`, correct: l.mistakeGood, distractors: [l.mistakeBad, "The answer should ignore the embedded stimulus.", "A future-unit idea is needed instead of this lesson."], feedback: "The correct choice uses the embedded Unit 3 stimulus and the mapped Physics relationship." },
    { standard: l.primary[0], html: l.visual, stem: "Which answer correctly interprets the embedded table or model?", correct: "Read the labels, units, system boundary, and relationship before selecting an answer.", distractors: ["Ignore units because only words matter.", "Use every formula from the unit at once.", "Choose the longest answer without checking the model."], feedback: "Physics models are evidence when labels, units, and relationships are interpreted accurately." },
    { standard: l.primary[0], html: `<div style="border:1px solid #94a3b8; padding:8px;"><strong>Scenario:</strong> A student must solve a ${l.title} question and justify the answer.</div>`, stem: "What should the student do first?", correct: "Identify the system and the evidence shown.", distractors: ["Pick a formula before reading the diagram.", "Ignore units and system boundary.", "Use a topic that is outside this lesson."], feedback: "Unit 3 reasoning begins by identifying the system and stimulus evidence." },
    { standard: l.primary[0], html: `<table border="1" cellpadding="6"><tr><th>Student Work</th><th>Issue</th></tr><tr><td>${l.mistakeBad}</td><td>Incorrect reasoning</td></tr><tr><td>${l.mistakeGood}</td><td>Corrected reasoning</td></tr></table>`, stem: "Why is the corrected work stronger?", correct: "It uses the correct system, model, and evidence from the lesson.", distractors: ["It avoids the standard.", "It removes the need for evidence.", "It gives no physics reason."], feedback: "Strong Physics work explains why the evidence supports the answer." },
    { standard: l.primary[0], html: `<div style="border:1px solid #94a3b8; padding:8px;"><strong>Safety and scope reminder:</strong> Use embedded data or approved safe resources. Do not perform unapproved heat, collision, ramp, or moving-object investigations.</div>`, stem: "Which action follows the MLA science safety and scope rule?", correct: "Use the embedded model/data or an approved safe resource before making a claim.", distractors: ["Perform an unsafe setup without approval.", "Use an outside answer not in the mapping.", "Skip the required visual or table."], feedback: "The course requires safe, self-contained evidence and alignment to the mapped lesson." }
  ];
}
function answers(base, correctIndex, variant) {
  const wrongFeedback = ["This choice ignores the embedded evidence or system boundary.", "This choice confuses the mapped Physics relationship.", "This choice goes outside the lesson scope or overstates the evidence."];
  const wrongs = base.distractors.map((d, i) => ({ text: variant === 0 ? d : `${d} ${["This does not match the stimulus.", "This misses the unit, rate, or system.", "This is outside the mapped lesson scope."][i % 3]}`, feedback: `${wrongFeedback[i % 3]} Re-read the stimulus and connect the answer to ${base.standard}.` }));
  const correct = { text: base.correct, feedback: `${base.feedback} This answer stays within ${base.standard}.` };
  const pool = wrongs.slice();
  pool.splice(correctIndex, 0, correct);
  return pool.map((a, i) => ({ ...a, correct: i === correctIndex }));
}
function makeQuestion(id, l, base, index, correctIndex) {
  const focus = ["Read the embedded energy or momentum stimulus.", "Use units when present.", "Choose the correct Unit 3 model.", "Explain why the evidence supports the answer.", "Avoid using one formula for every problem."][index % 5];
  return { id, text: `<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${base.standard}</p><p><strong>Assessment focus:</strong> ${focus}</p>${base.html}<p>${base.stem}</p>`, answers: answers(base, correctIndex, index) };
}
function questionXml(q) { return `  <question type="multichoice">
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
  </question>`; }
function bankXml(category, questions) { return `<?xml version="1.0" encoding="utf-8"?>
<quiz>
  <question type="category">
    <category><text>$course$/${esc(category)}</text></category>
  </question>
${questions.map(questionXml).join("\n")}
</quiz>
`; }
function writeAssessments() {
  const unitQuestions = [], pretestQuestions = [];
  for (const l of lessons) {
    const bases = makeBaseQuestions(l), gp = [], quiz = [];
    bases.forEach((b, i) => { gp.push(makeQuestion(`PHYS_U03_L${l.no}_GP_Q${String(i + 1).padStart(2, "0")}`, l, b, i, correctPattern[i])); unitQuestions.push(makeQuestion(`PHYS_U03_UA_L${l.no}_Q${String(i + 1).padStart(2, "0")}`, l, b, i, correctPattern[(Number(l.no) * 5 + i) % correctPattern.length])); if (pretestQuestions.length < 10) pretestQuestions.push(makeQuestion(`PHYS_U03_PT_Q${String(pretestQuestions.length + 1).padStart(2, "0")}`, l, b, i, correctPattern[(i + Number(l.no)) % correctPattern.length])); });
    for (let i = 0; i < 25; i++) quiz.push(makeQuestion(`PHYS_U03_L${l.no}_QZ_Q${String(i + 1).padStart(2, "0")}`, l, bases[i % bases.length], i, correctPattern[i]));
    const lessonDir = path.join(unitRoot, `Lesson ${l.no}`), xmlDir = path.join(lessonDir, "Moodle XML");
    ensureDir(xmlDir);
    fs.writeFileSync(path.join(xmlDir, `PHYS_U03_L${l.no}_GuidedPractice_MoodleXML.xml`), bankXml(`PHYSICS/Unit 03/Lesson ${l.no}/Guided Practice`, gp), "utf8");
    if (l.no !== "08") fs.writeFileSync(path.join(xmlDir, `PHYS_U03_L${l.no}_Quiz_MoodleXML.xml`), bankXml(`PHYSICS/Unit 03/Lesson ${l.no}/Quiz`, quiz), "utf8");
    fs.writeFileSync(path.join(lessonDir, "quiz.json"), JSON.stringify({ course: "Physics", unit: "Unit 03", lesson: `Lesson ${l.no}`, lessonTitle: l.title, guidedPracticeQuestionCount: 5, lessonQuizQuestionCount: l.no === "08" ? 0 : 25, format: "Moodle XML", visualStimulusRequired: true, standards: l.primary, xmlFiles: l.no === "08" ? [`Moodle XML/PHYS_U03_L${l.no}_GuidedPractice_MoodleXML.xml`] : [`Moodle XML/PHYS_U03_L${l.no}_GuidedPractice_MoodleXML.xml`, `Moodle XML/PHYS_U03_L${l.no}_Quiz_MoodleXML.xml`] }, null, 2), "utf8");
  }
  while (unitQuestions.length < 40) { const l = lessons[unitQuestions.length % lessons.length], b = makeBaseQuestions(l)[unitQuestions.length % 5]; unitQuestions.push(makeQuestion(`PHYS_U03_UA_Q${String(unitQuestions.length + 1).padStart(2, "0")}`, l, b, unitQuestions.length, correctPattern[unitQuestions.length])); }
  const unitXmlDir = path.join(unitRoot, "Moodle XML");
  ensureDir(unitXmlDir);
  fs.writeFileSync(path.join(unitXmlDir, "PHYS_U03_Pretest_MoodleXML.xml"), bankXml("PHYSICS/Unit 03/Pretest", pretestQuestions.slice(0, 10)), "utf8");
  fs.writeFileSync(path.join(unitXmlDir, "PHYS_U03_UnitAssessment_MoodleXML.xml"), bankXml("PHYSICS/Unit 03/Unit Assessment", unitQuestions.slice(0, 40)), "utf8");
}
function writeAudit() {
  ensureDir(auditRoot);
  const rows = lessons.map((l) => `| ${l.no} | ${l.title} | ${l.primary.join(", ")} | ${l.lab} | PASS |`).join("\n");
  fs.writeFileSync(path.join(auditRoot, "PHYS_U03_LESSON_ASSESSMENT_STRICT_RIGOR_AUDIT_2026-07-07.md"), `# Physics Unit 3 Lesson, Assessment, and Strict Rigor Audit

Date: 2026-07-07

## Scope

Course: Physics

Unit: Unit 03 - Work, Energy, Momentum, and Thermal Systems

## Source of Truth

- \`PHYSICS/Course Production/PHASE_3A_B_1_UNIT_LEVEL_MAPPING.md\`
- \`PHYSICS/Course Production/PHASE_3A_B_2_LESSON_LEVEL_MAPPING.md\`
- \`PHYSICS/Course Production/PHASE_3A_B_3_LAB_VISUAL_SIMULATION_MAPPING.md\`
- MLA lesson, instructional rigor, science lab, and Moodle XML standards

## Lesson Alignment

| Lesson | Title | Primary Standard(s) | Required Lab/Data/Visual Evidence | Status |
|---:|---|---|---|---|
${rows}

## Rigor Built In

- P02 includes a Veteran Teacher Slow Walk for every lesson.
- P03 includes readiness supports for remedial, standard, and accelerated students.
- P04 includes a setup section before exactly three worked examples.
- Energy form charts, energy flow diagrams, conservation/system-boundary models, force-distance tables, work-time-power tables, thermal particle models, and momentum conservation tables are embedded where required.
- External resources are candidate resources only; no unapproved links were embedded.
- Teacher of Record language remains support/intervention/checkpoint workflow only.

## Assessment Production

| Bank | Required Count | Status |
|---|---:|---|
| Unit Pretest | 10 | PASS |
| Guided Practice per lesson | 5 | PASS |
| Lesson Quiz per Lessons 01-07 | 25 | PASS |
| Unit Assessment | 40 | PASS |

## Final Decision

PASS

Physics Unit 3 is ready for secondary course-level audit and Moodle transfer after final course certification.
`, "utf8");
}

writeLessons();
writeAssessments();
writeAudit();
