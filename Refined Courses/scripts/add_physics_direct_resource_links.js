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
    ["NASA: Solar System Overview", "https://science.nasa.gov/solar-system/"],
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
    ["NASA: Universe Overview", "https://science.nasa.gov/universe/overview/"],
  ],
  "06-02": [
    ["PhET: Gravity Force Lab Basics", "https://phet.colorado.edu/en/simulations/gravity-force-lab-basics"],
    ["NASA: Solar System Overview", "https://science.nasa.gov/solar-system/"],
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
    ["NASA: Science Mission Directorate", "https://science.nasa.gov/"],
    ["NOAA: Research", "https://research.noaa.gov/"],
  ],
  "06-07": [
    ["NASA: Technology Transfer", "https://technology.nasa.gov/"],
    ["NIST: Science and Technology", "https://www.nist.gov/"],
  ],
  "06-08": [
    ["NASA: Universe Overview", "https://science.nasa.gov/universe/overview/"],
    ["PhET: Rutherford Scattering", "https://phet.colorado.edu/en/simulations/rutherford-scattering"],
    ["NASA: Science Mission Directorate", "https://science.nasa.gov/"],
  ],
};

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
    const section = `  <section style="border:1px solid #d1d5db; border-left:6px solid #f59e0b; border-radius:10px; padding:20px; margin-bottom:18px; background:#fffbeb;">\n    <h2 style="font-size:23px; margin-top:0;">Direct Resource Link</h2>\n<p>Use the direct link below only when the lesson or checkpoint asks you to use an approved virtual resource. The link opens the specific resource; you should not search for a different activity.</p><ul style="padding-left:24px;">${links}</ul>\n  </section>\n`;

    if (!html.includes("Direct Resource Link")) {
      const marker = '  <section style="border:1px solid #d1d5db; border-left:6px solid #7c3aed;';
      html = html.replace(marker, `${section}${marker}`);
    }
    fs.writeFileSync(p03Path, html, "utf8");
  }
}
