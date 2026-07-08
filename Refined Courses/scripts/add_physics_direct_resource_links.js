const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courseRoot = path.join(root, "PHYSICS", "Units");

const resources = {
  "01-01": [
    ["OpenStax: Physics and the Laws of Nature", "https://openstax.org/books/college-physics-2e/pages/1-introduction-to-science-and-the-realm-of-physics-physical-quantities-and-units"],
  ],
  "01-02": [
    ["OpenStax: Physical Quantities and Units", "https://openstax.org/books/college-physics-2e/pages/1-2-physical-quantities-and-units"],
  ],
  "01-03": [
    ["OpenStax: Accuracy, Precision, and Significant Figures", "https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures"],
  ],
  "01-04": [
    ["OpenStax: Accuracy, Precision, and Significant Figures", "https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures"],
  ],
  "01-05": [
    ["OpenStax: Vectors, Scalars, and Coordinate Systems", "https://openstax.org/books/college-physics-2e/pages/3-2-vector-addition-and-subtraction-graphical-methods"],
    ["PhET: Vector Addition", "https://phet.colorado.edu/en/simulations/vector-addition"],
  ],
  "01-06": [
    ["PhET: The Moving Man", "https://phet.colorado.edu/en/simulations/moving-man"],
    ["OpenStax: Position and Displacement", "https://openstax.org/books/college-physics-2e/pages/2-1-displacement"],
  ],
  "01-07": [
    ["PhET: The Moving Man", "https://phet.colorado.edu/en/simulations/moving-man"],
    ["OpenStax: Acceleration", "https://openstax.org/books/college-physics-2e/pages/2-4-acceleration"],
  ],
  "01-08": [
    ["PhET: The Moving Man", "https://phet.colorado.edu/en/simulations/moving-man"],
    ["PhET: Vector Addition", "https://phet.colorado.edu/en/simulations/vector-addition"],
    ["OpenStax: Physical Quantities and Units", "https://openstax.org/books/college-physics-2e/pages/1-2-physical-quantities-and-units"],
  ],
  "02-01": [
    ["PhET: Forces and Motion Basics", "https://phet.colorado.edu/en/simulations/forces-and-motion-basics"],
    ["OpenStax: Force", "https://openstax.org/books/college-physics-2e/pages/4-1-force"],
  ],
  "02-02": [
    ["PhET: Forces and Motion Basics", "https://phet.colorado.edu/en/simulations/forces-and-motion-basics"],
    ["OpenStax: Newton's First Law of Motion", "https://openstax.org/books/college-physics-2e/pages/4-3-newtons-first-law-of-motion-inertia"],
  ],
  "02-03": [
    ["PhET: Forces and Motion Basics", "https://phet.colorado.edu/en/simulations/forces-and-motion-basics"],
    ["OpenStax: Newton's Third Law of Motion", "https://openstax.org/books/college-physics-2e/pages/4-4-newtons-third-law-of-motion-symmetry-in-forces"],
  ],
  "02-04": [
    ["PhET: Gravity Force Lab Basics", "https://phet.colorado.edu/en/simulations/gravity-force-lab-basics"],
    ["OpenStax: Newton's Law of Universal Gravitation", "https://openstax.org/books/college-physics-2e/pages/6-5-newtons-universal-law-of-gravitation"],
  ],
  "02-05": [
    ["PhET: Gravity and Orbits", "https://phet.colorado.edu/en/simulations/gravity-and-orbits"],
    ["NASA/JPL Eyes: Solar System Interactive", "https://eyes.nasa.gov/apps/solar-system/"],
  ],
  "02-06": [
    ["PhET: Collision Lab", "https://phet.colorado.edu/en/simulations/collision-lab"],
    ["OpenStax: Linear Momentum and Force", "https://openstax.org/books/college-physics-2e/pages/8-1-linear-momentum-and-force"],
  ],
  "02-07": [
    ["CERN: The Standard Model", "https://home.cern/science/physics/standard-model/"],
  ],
  "02-08": [
    ["PhET: Forces and Motion Basics", "https://phet.colorado.edu/en/simulations/forces-and-motion-basics"],
    ["PhET: Gravity and Orbits", "https://phet.colorado.edu/en/simulations/gravity-and-orbits"],
    ["PhET: Collision Lab", "https://phet.colorado.edu/en/simulations/collision-lab"],
  ],
  "03-01": [
    ["PhET: Energy Skate Park", "https://phet.colorado.edu/en/simulations/energy-skate-park"],
    ["OpenStax: Energy", "https://openstax.org/books/college-physics-2e/pages/7-introduction-to-work-energy-and-energy-resources"],
  ],
  "03-02": [
    ["PhET: Energy Skate Park", "https://phet.colorado.edu/en/simulations/energy-skate-park"],
    ["OpenStax: Conservation of Energy", "https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy"],
  ],
  "03-03": [
    ["PhET: Energy Skate Park", "https://phet.colorado.edu/en/simulations/energy-skate-park"],
    ["OpenStax: Conservation of Energy", "https://openstax.org/books/college-physics-2e/pages/7-6-conservation-of-energy"],
  ],
  "03-04": [
    ["OpenStax: Work", "https://openstax.org/books/college-physics-2e/pages/7-1-work-the-scientific-definition"],
  ],
  "03-05": [
    ["OpenStax: Power", "https://openstax.org/books/college-physics-2e/pages/7-7-power"],
  ],
  "03-06": [
    ["PhET: States of Matter Basics", "https://phet.colorado.edu/en/simulations/states-of-matter-basics"],
    ["OpenStax: Temperature and Kinetic Theory", "https://openstax.org/books/college-physics-2e/pages/13-3-the-ideal-gas-law"],
  ],
  "03-07": [
    ["PhET: Collision Lab", "https://phet.colorado.edu/en/simulations/collision-lab"],
    ["OpenStax: Conservation of Momentum", "https://openstax.org/books/college-physics-2e/pages/8-3-conservation-of-momentum"],
  ],
  "03-08": [
    ["PhET: Energy Skate Park", "https://phet.colorado.edu/en/simulations/energy-skate-park"],
    ["PhET: States of Matter Basics", "https://phet.colorado.edu/en/simulations/states-of-matter-basics"],
    ["PhET: Collision Lab", "https://phet.colorado.edu/en/simulations/collision-lab"],
  ],
  "04-01": [
    ["PhET: Wave on a String", "https://phet.colorado.edu/en/simulations/wave-on-a-string"],
    ["OpenStax: Waves", "https://openstax.org/books/college-physics-2e/pages/16-introduction-to-oscillatory-motion-and-waves"],
  ],
  "04-02": [
    ["PhET: Wave Interference", "https://phet.colorado.edu/en/simulations/wave-interference"],
    ["OpenStax: Waves", "https://openstax.org/books/college-physics-2e/pages/16-introduction-to-oscillatory-motion-and-waves"],
  ],
  "04-03": [
    ["PhET: Sound", "https://phet.colorado.edu/en/simulations/sound"],
    ["OpenStax: Sound", "https://openstax.org/books/college-physics-2e/pages/17-introduction-to-physics-of-hearing"],
  ],
  "04-04": [
    ["NASA: Electromagnetic Spectrum", "https://science.nasa.gov/ems/"],
    ["OpenStax: Electromagnetic Waves", "https://openstax.org/books/college-physics-2e/pages/24-introduction-to-electromagnetic-waves"],
  ],
  "04-05": [
    ["NASA: Electromagnetic Spectrum", "https://science.nasa.gov/ems/"],
    ["OpenStax: Special Relativity", "https://openstax.org/books/college-physics-2e/pages/28-introduction-to-special-relativity"],
  ],
  "04-06": [
    ["PhET: Bending Light", "https://phet.colorado.edu/en/simulations/bending-light"],
    ["OpenStax: Reflection and Refraction", "https://openstax.org/books/college-physics-2e/pages/25-introduction-to-geometric-optics"],
  ],
  "04-07": [
    ["PhET: Geometric Optics", "https://phet.colorado.edu/en/simulations/geometric-optics"],
    ["OpenStax: Image Formation by Lenses", "https://openstax.org/books/college-physics-2e/pages/25-6-image-formation-by-lenses"],
  ],
  "04-08": [
    ["PhET: Wave on a String", "https://phet.colorado.edu/en/simulations/wave-on-a-string"],
    ["NASA: Electromagnetic Spectrum", "https://science.nasa.gov/ems/"],
    ["PhET: Geometric Optics", "https://phet.colorado.edu/en/simulations/geometric-optics"],
  ],
  "05-01": [
    ["PhET: Balloons and Static Electricity", "https://phet.colorado.edu/en/simulations/balloons-and-static-electricity"],
    ["OpenStax: Electric Charge and Electric Field", "https://openstax.org/books/college-physics-2e/pages/18-introduction-to-electric-charge-and-electric-field"],
  ],
  "05-02": [
    ["PhET: Charges and Fields", "https://phet.colorado.edu/en/simulations/charges-and-fields"],
    ["OpenStax: Electric Field", "https://openstax.org/books/college-physics-2e/pages/18-4-electric-field-concept-of-a-field-revisited"],
  ],
  "05-03": [
    ["OpenStax: Conductors and Electric Fields", "https://openstax.org/books/college-physics-2e/pages/18-7-conductors-and-electric-fields-in-static-equilibrium"],
  ],
  "05-04": [
    ["PhET: Circuit Construction Kit DC", "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc"],
    ["OpenStax: Ohm's Law", "https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits"],
  ],
  "05-05": [
    ["PhET: Circuit Construction Kit DC", "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc"],
    ["OpenStax: Electric Power and Energy", "https://openstax.org/books/college-physics-2e/pages/20-4-electric-power-and-energy"],
  ],
  "05-06": [
    ["PhET: Faraday's Law", "https://phet.colorado.edu/en/simulations/faradays-law"],
    ["OpenStax: Electromagnetic Induction", "https://openstax.org/books/college-physics-2e/pages/23-introduction-to-electromagnetic-induction-ac-circuits-and-electrical-technologies"],
  ],
  "05-07": [
    ["PhET: Circuit Construction Kit DC", "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc"],
    ["OpenStax: Circuits and DC Instruments", "https://openstax.org/books/college-physics-2e/pages/21-introduction-to-circuits-bioelectricity-and-dc-instruments"],
  ],
  "05-08": [
    ["PhET: Balloons and Static Electricity", "https://phet.colorado.edu/en/simulations/balloons-and-static-electricity"],
    ["PhET: Charges and Fields", "https://phet.colorado.edu/en/simulations/charges-and-fields"],
    ["PhET: Circuit Construction Kit DC", "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc"],
    ["PhET: Faraday's Law", "https://phet.colorado.edu/en/simulations/faradays-law"],
  ],
  "06-01": [
    ["NASA: Types of Galaxies", "https://science.nasa.gov/universe/galaxies/types/"],
  ],
  "06-02": [
    ["PhET: Gravity Force Lab Basics", "https://phet.colorado.edu/en/simulations/gravity-force-lab-basics"],
    ["NASA/JPL Eyes: Solar System Interactive", "https://eyes.nasa.gov/apps/solar-system/"],
  ],
  "06-03": [
    ["PhET: Rutherford Scattering", "https://phet.colorado.edu/en/simulations/rutherford-scattering"],
    ["OpenStax: Atomic Physics", "https://openstax.org/books/college-physics-2e/pages/30-introduction-to-atomic-physics"],
  ],
  "06-04": [
    ["OpenStax: Special Relativity", "https://openstax.org/books/college-physics-2e/pages/28-introduction-to-special-relativity"],
  ],
  "06-05": [
    ["OpenStax: Frontiers of Physics", "https://openstax.org/books/college-physics-2e/pages/34-introduction-to-frontiers-of-physics"],
  ],
  "06-06": [
    ["Understanding Science: How Science Works", "https://undsci.berkeley.edu/understanding-science-101/how-science-works/"],
    ["NIST: SI Redefinition", "https://www.nist.gov/si-redefinition"],
  ],
  "06-07": [
    ["Department of Energy: LED Lighting", "https://www.energy.gov/energysaver/led-lighting"],
    ["NIST: SI Redefinition", "https://www.nist.gov/si-redefinition"],
  ],
  "06-08": [
    ["NASA: Types of Galaxies", "https://science.nasa.gov/universe/galaxies/types/"],
    ["PhET: Rutherford Scattering", "https://phet.colorado.edu/en/simulations/rutherford-scattering"],
    ["NIST: SI Redefinition", "https://www.nist.gov/si-redefinition"],
  ],
};

function procedureFor(name, url) {
  const lower = `${name} ${url}`.toLowerCase();
  if (lower.includes("phet")) {
    return [
      "Click the link, then click the play or launch button for the simulation. If the page offers versions, use the HTML5 version.",
      "Start with the default screen or the first simulation screen. Turn on labels, vectors, values, paths, graphs, or field lines when those controls are available.",
      "Change only one variable at a time, such as mass, force, distance, charge, wavelength, or velocity. Watch what changes before adjusting another control.",
      "Record one observation from the model and identify the Physics relationship shown by that observation.",
      "Use the observation as evidence in the notebook task, guided practice, or checkpoint when the lesson asks for simulation evidence.",
    ];
  }
  if (lower.includes("eyes.nasa.gov")) {
    return [
      "Click the link and wait for NASA/JPL Eyes to load. If a start or launch button appears, click it.",
      "Use the Solar System view that opens. Rotate, zoom, or select the Sun, Earth, Moon, or another body only as needed for this lesson.",
      "Observe how distance, orbit path, and relative motion are represented in the model.",
      "Record one observation about orbital motion, scale, or gravitational organization.",
      "Connect the observation to the lesson by explaining how gravity and motion organize the system.",
    ];
  }
  if (lower.includes("openstax")) {
    return [
      "Click the link and stay on the exact OpenStax section that opens.",
      "Read the section title, first explanation, key equation or model, and any figure or table in the linked section.",
      "Identify the quantity, relationship, law, or model that matches the lesson.",
      "Record one formula, visual detail, or evidence statement from the section.",
      "Return to the lesson and use that evidence in the notebook task or checkpoint.",
    ];
  }
  if (lower.includes("nasa") && lower.includes("galaxies")) {
    return [
      "Click the link and use the NASA Types of Galaxies page that opens.",
      "Read the headings for galaxy types and examine the images or descriptions for each type.",
      "Record how matter is arranged in at least two galaxy types.",
      "Explain how gravity and matter distribution help organize large-scale structures.",
      "Use that evidence in the Unit 6 matter-in-the-universe task.",
    ];
  }
  if (lower.includes("nasa") && lower.includes("ems")) {
    return [
      "Click the link and use the NASA Electromagnetic Spectrum page that opens.",
      "Find the spectrum order from radio waves through gamma rays.",
      "Compare wavelength, frequency, or energy for two parts of the spectrum.",
      "Record one pattern from the spectrum and one example of how that wave type is used or observed.",
      "Connect the pattern to the lesson's wave or electromagnetic radiation concept.",
    ];
  }
  if (lower.includes("berkeley") || lower.includes("understanding-science")) {
    return [
      "Click the link and use the How Science Works page that opens.",
      "Read the section headings and identify how evidence, testing, peer review, and revision work together.",
      "Record two reliability features that make a scientific claim stronger.",
      "Explain why repeated evidence or review matters before accepting a claim.",
      "Use the notes in the reliability or scientific-change task.",
    ];
  }
  if (lower.includes("nist")) {
    return [
      "Click the link and use the NIST SI Redefinition page that opens.",
      "Read the section explaining that SI units are based on constants of nature.",
      "Identify one measurement unit or constant discussed on the page.",
      "Record how using constants improves reliability or consistency in science.",
      "Connect that evidence to the lesson's reliability, measurement, or Physics-informed decision task.",
    ];
  }
  if (lower.includes("energy.gov")) {
    return [
      "Click the link and use the Department of Energy LED Lighting page that opens.",
      "Read the sections that compare LED lighting efficiency, energy use, and benefits.",
      "Record one benefit, one constraint, and one evidence statement about LED lighting.",
      "Use the evidence to complete a Physics-informed decision comparison.",
      "Return to the lesson and explain the decision using energy, power, or efficiency reasoning.",
    ];
  }
  if (lower.includes("cern")) {
    return [
      "Click the link and use the CERN Standard Model page that opens.",
      "Read the explanation of particles and forces at the subatomic scale.",
      "Record one particle or interaction described by the page.",
      "Explain how this evidence supports the lesson's atomic or modern Physics model.",
      "Use the note as evidence in the lesson task.",
    ];
  }
  return [
    "Click the link and use only the exact page that opens.",
    "Read the heading, labels, captions, and any table, image, graph, or diagram before taking notes.",
    "Record one observation, model detail, formula, or fact from the resource.",
    "Explain how that evidence connects to the lesson objective.",
    "Return to the lesson task and use the evidence in your response.",
  ];
}

function procedureHtml(items) {
  return items
    .map(([name, url]) => {
      const steps = procedureFor(name, url).map((step) => `<li>${step}</li>`).join("");
      return `<div style="margin-top:14px;"><h3 style="font-size:20px; margin:0 0 6px 0;">How to use ${name}</h3><ol style="padding-left:24px; margin-top:6px;">${steps}</ol></div>`;
    })
    .join("");
}

for (let u = 1; u <= 6; u++) {
  for (let l = 1; l <= 8; l++) {
    const unit = String(u).padStart(2, "0");
    const lesson = String(l).padStart(2, "0");
    const key = `${unit}-${lesson}`;
    const items = resources[key];
    if (!items || items.length === 0) continue;

    const lessonDir = path.join(courseRoot, `Unit ${unit}`, `Lesson ${lesson}`);
    const jsonPath = path.join(lessonDir, "lesson.json");
    const p03Path = path.join(lessonDir, "P03.html");
    if (!fs.existsSync(jsonPath) || !fs.existsSync(p03Path)) continue;

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    data.labVisualSimulationRequirements = data.labVisualSimulationRequirements || {};
    data.labVisualSimulationRequirements.approvedDirectResources = items.map(([name, url]) => ({
      name,
      exactDirectUrl: url,
      access: "Free public resource; verify availability before Moodle transfer.",
    }));
    fs.writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

    let html = fs.readFileSync(p03Path, "utf8");
    html = html.replace(/\n  <section style="border:1px solid #d1d5db; border-left:6px solid #f59e0b;[\s\S]*?<\/section>\r?\n/g, "\n");

    const links = items
      .map(([name, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`)
      .join("");
    const section = `  <section style="border:1px solid #d1d5db; border-left:6px solid #f59e0b; border-radius:10px; padding:20px; margin-bottom:18px; background:#fffbeb;">\n    <h2 style="font-size:23px; margin-top:0;">Direct Resource Link</h2>\n<p>Use the direct link below only when the lesson or checkpoint asks you to use an approved virtual resource. The link opens the specific resource; you should not search for a different activity.</p><ul style="padding-left:24px;">${links}</ul>\n${procedureHtml(items)}\n  </section>\n`;

    if (!html.includes("Direct Resource Link")) {
      const marker = '  <section style="border:1px solid #d1d5db; border-left:6px solid #7c3aed;';
      html = html.replace(marker, `${section}${marker}`);
    }
    fs.writeFileSync(p03Path, html, "utf8");
  }
}
