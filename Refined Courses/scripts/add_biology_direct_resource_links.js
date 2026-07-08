const fs = require("fs");
const path = require("path");

const root = process.cwd();
const courseRoot = path.join(root, "BIOLOGY", "Units");

const resources = {
  "01-01": [["OpenStax Biology 2e: The Process of Science", "https://openstax.org/books/biology-2e/pages/1-2-the-process-of-science"]],
  "01-02": [["OpenStax Biology 2e: The Process of Science", "https://openstax.org/books/biology-2e/pages/1-2-the-process-of-science"]],
  "01-03": [["OpenStax Biology 2e: The Process of Science", "https://openstax.org/books/biology-2e/pages/1-2-the-process-of-science"]],
  "01-04": [["OpenStax Biology 2e: Studying Cells", "https://openstax.org/books/biology-2e/pages/4-1-studying-cells"]],
  "01-05": [["OpenStax Biology 2e: The Process of Science", "https://openstax.org/books/biology-2e/pages/1-2-the-process-of-science"]],
  "01-06": [["OpenStax Biology 2e: Studying Cells", "https://openstax.org/books/biology-2e/pages/4-1-studying-cells"]],
  "01-07": [
    ["OpenStax Biology 2e: Water", "https://openstax.org/books/biology-2e/pages/2-2-water"],
    ["OpenStax Biology 2e: Biological Macromolecules", "https://openstax.org/books/biology-2e/pages/3-introduction"],
  ],
  "01-08": [
    ["OpenStax Biology 2e: The Process of Science", "https://openstax.org/books/biology-2e/pages/1-2-the-process-of-science"],
    ["OpenStax Biology 2e: Studying Cells", "https://openstax.org/books/biology-2e/pages/4-1-studying-cells"],
    ["OpenStax Biology 2e: Water", "https://openstax.org/books/biology-2e/pages/2-2-water"],
  ],
  "02-01": [["OpenStax Biology 2e: Prokaryotic Cells", "https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells"]],
  "02-02": [["OpenStax Biology 2e: Eukaryotic Cells", "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells"]],
  "02-03": [
    ["PhET: Membrane Channels", "https://phet.colorado.edu/en/simulations/membrane-channels"],
    ["OpenStax Biology 2e: Passive Transport", "https://openstax.org/books/biology-2e/pages/5-2-passive-transport"],
  ],
  "02-04": [["OpenStax Biology 2e: Introduction to Animal Structure and Function", "https://openstax.org/books/biology-2e/pages/33-introduction"]],
  "02-05": [["OpenStax Biology 2e: Transport of Water and Solutes in Plants", "https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants"]],
  "02-06": [["OpenStax Biology 2e: Animal Body Systems", "https://openstax.org/books/biology-2e/pages/33-introduction"]],
  "02-07": [
    ["CDC: How Vaccines Work", "https://www.cdc.gov/vaccines/basics/index.html"],
    ["OpenStax Biology 2e: Adaptive Immune Response", "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response"],
  ],
  "02-08": [
    ["OpenStax Biology 2e: Eukaryotic Cells", "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells"],
    ["PhET: Membrane Channels", "https://phet.colorado.edu/en/simulations/membrane-channels"],
    ["OpenStax Biology 2e: Adaptive Immune Response", "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response"],
  ],
  "03-01": [["OpenStax Biology 2e: Biological Macromolecules", "https://openstax.org/books/biology-2e/pages/3-introduction"]],
  "03-02": [["OpenStax Biology 2e: Enzymes", "https://openstax.org/books/biology-2e/pages/6-5-enzymes"]],
  "03-03": [["OpenStax Biology 2e: ATP in Living Systems", "https://openstax.org/books/biology-2e/pages/6-4-atp-adenosine-triphosphate"]],
  "03-04": [["OpenStax Biology 2e: Overview of Photosynthesis", "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis"]],
  "03-05": [["OpenStax Biology 2e: Cellular Respiration", "https://openstax.org/books/biology-2e/pages/7-introduction"]],
  "03-06": [
    ["OpenStax Biology 2e: Overview of Photosynthesis", "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis"],
    ["OpenStax Biology 2e: Cellular Respiration", "https://openstax.org/books/biology-2e/pages/7-introduction"],
  ],
  "03-07": [
    ["NASA Earth Observatory: The Carbon Cycle", "https://earthobservatory.nasa.gov/features/CarbonCycle"],
    ["USGS Water Science School: The Water Cycle", "https://www.usgs.gov/special-topics/water-science-school/science/water-cycle"],
  ],
  "03-08": [
    ["OpenStax Biology 2e: Enzymes", "https://openstax.org/books/biology-2e/pages/6-5-enzymes"],
    ["OpenStax Biology 2e: Overview of Photosynthesis", "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis"],
    ["NASA Earth Observatory: The Carbon Cycle", "https://earthobservatory.nasa.gov/features/CarbonCycle"],
  ],
  "04-01": [["OpenStax Biology 2e: DNA Structure and Function", "https://openstax.org/books/biology-2e/pages/14-introduction"]],
  "04-02": [
    ["PhET: Gene Expression Essentials", "https://phet.colorado.edu/en/simulations/gene-expression-essentials"],
    ["OpenStax Biology 2e: Genes and Proteins", "https://openstax.org/books/biology-2e/pages/15-introduction"],
  ],
  "04-03": [["OpenStax Biology 2e: DNA Mutation and Repair", "https://openstax.org/books/biology-2e/pages/14-6-dna-repair"]],
  "04-04": [["OpenStax Biology 2e: Mendel's Experiments and Heredity", "https://openstax.org/books/biology-2e/pages/12-1-mendels-experiments-and-the-laws-of-probability"]],
  "04-05": [["OpenStax Biology 2e: Modern Understandings of Inheritance", "https://openstax.org/books/biology-2e/pages/13-introduction"]],
  "04-06": [["OpenStax Biology 2e: Meiosis", "https://openstax.org/books/biology-2e/pages/11-introduction"]],
  "04-07": [
    ["OpenStax Biology 2e: Biotechnology and Genomics", "https://openstax.org/books/biology-2e/pages/17-introduction"],
    ["National Human Genome Research Institute: Cells and DNA", "https://www.genome.gov/about-genomics/fact-sheets/Cells-and-DNA-Fact-Sheet"],
  ],
  "04-08": [
    ["PhET: Gene Expression Essentials", "https://phet.colorado.edu/en/simulations/gene-expression-essentials"],
    ["OpenStax Biology 2e: Mendel's Experiments and Heredity", "https://openstax.org/books/biology-2e/pages/12-1-mendels-experiments-and-the-laws-of-probability"],
    ["OpenStax Biology 2e: Meiosis", "https://openstax.org/books/biology-2e/pages/11-introduction"],
  ],
  "05-01": [["OpenStax Biology 2e: Evidence of Evolution", "https://openstax.org/books/biology-2e/pages/18-1-understanding-evolution"]],
  "05-02": [
    ["PhET: Natural Selection", "https://phet.colorado.edu/en/simulations/natural-selection"],
    ["OpenStax Biology 2e: Natural Selection", "https://openstax.org/books/biology-2e/pages/18-3-the-processes-of-evolution"],
  ],
  "05-03": [["OpenStax Biology 2e: Population Evolution", "https://openstax.org/books/biology-2e/pages/19-introduction"]],
  "05-04": [["OpenStax Biology 2e: Phylogenies and the History of Life", "https://openstax.org/books/biology-2e/pages/20-introduction"]],
  "05-05": [["OpenStax Biology 2e: Prokaryotes and Domains", "https://openstax.org/books/biology-2e/pages/22-introduction"]],
  "05-06": [["OpenStax Biology 2e: Evolution and the Origin of Species", "https://openstax.org/books/biology-2e/pages/18-introduction"]],
  "05-07": [["Smithsonian Human Origins: Human Evolution Evidence", "https://humanorigins.si.edu/evidence"]],
  "05-08": [
    ["PhET: Natural Selection", "https://phet.colorado.edu/en/simulations/natural-selection"],
    ["OpenStax Biology 2e: Phylogenies and the History of Life", "https://openstax.org/books/biology-2e/pages/20-introduction"],
    ["Smithsonian Human Origins: Human Evolution Evidence", "https://humanorigins.si.edu/evidence"],
  ],
  "06-01": [
    ["NOAA Ocean Service: Ocean Zones", "https://oceanservice.noaa.gov/facts/light_travel.html"],
    ["OpenStax Biology 2e: Ecology and the Biosphere", "https://openstax.org/books/biology-2e/pages/44-introduction"],
  ],
  "06-02": [["NASA Earth Observatory: World of Change", "https://earthobservatory.nasa.gov/world-of-change"]],
  "06-03": [["OpenStax Biology 2e: Population and Community Ecology", "https://openstax.org/books/biology-2e/pages/45-introduction"]],
  "06-04": [["OpenStax Biology 2e: Ecosystems", "https://openstax.org/books/biology-2e/pages/46-introduction"]],
  "06-05": [
    ["USGS: Invasive Species", "https://www.usgs.gov/programs/invasive-species-program"],
    ["OpenStax Biology 2e: Conservation Biology and Biodiversity", "https://openstax.org/books/biology-2e/pages/47-introduction"],
  ],
  "06-06": [
    ["EPA: Learn About Sustainability", "https://www.epa.gov/sustainability/learn-about-sustainability"],
    ["NASA Earth Observatory: World of Change", "https://earthobservatory.nasa.gov/world-of-change"],
  ],
  "06-07": [
    ["EPA: Environmental Data", "https://www.epa.gov/enviro"],
    ["USGS Water Data for the Nation", "https://waterdata.usgs.gov/nwis"],
  ],
  "06-08": [
    ["OpenStax Biology 2e: Ecosystems", "https://openstax.org/books/biology-2e/pages/46-introduction"],
    ["OpenStax Biology 2e: Conservation Biology and Biodiversity", "https://openstax.org/books/biology-2e/pages/47-introduction"],
    ["EPA: Environmental Data", "https://www.epa.gov/enviro"],
  ],
};

const oldSafetyText = "External simulations and resources are approval-only. Use the lesson content, embedded tables, diagrams, maps, models, and data displays as the required source for mastery unless an approved resource is later added.";
const newSafetyText = "Approved direct resource links are included when a free, student-safe resource supports the lesson. Use the exact lesson link provided; do not search for a different activity or resource.";

for (let u = 1; u <= 6; u++) {
  for (let l = 1; l <= 8; l++) {
    const unit = String(u).padStart(2, "0");
    const lesson = String(l).padStart(2, "0");
    const key = `${unit}-${lesson}`;
    const items = resources[key];
    if (!items || items.length === 0) continue;

    const lessonDir = path.join(courseRoot, `Unit ${unit}`, `Lesson ${lesson}`);
    const jsonPath = path.join(lessonDir, "lesson.json");
    const p01Path = path.join(lessonDir, "P01.html");
    const p03Path = path.join(lessonDir, "P03.html");
    if (!fs.existsSync(jsonPath) || !fs.existsSync(p01Path) || !fs.existsSync(p03Path)) continue;

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    data.labVisualSimulationRequirements = data.labVisualSimulationRequirements || {};
    data.labVisualSimulationRequirements.approvedDirectResources = items.map(([name, url]) => ({
      name,
      exactDirectUrl: url,
      access: "Free public resource; verify availability before Moodle transfer.",
    }));
    fs.writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

    let p01 = fs.readFileSync(p01Path, "utf8");
    p01 = p01.replace(oldSafetyText, newSafetyText);
    fs.writeFileSync(p01Path, p01, "utf8");

    let html = fs.readFileSync(p03Path, "utf8");
    html = html.replace(/\n  <section style="border: 1px solid #d1d5db; border-left: 6px solid #f59e0b;[\s\S]*?<\/section>\r?\n/g, "\n");
    const links = items
      .map(([name, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></li>`)
      .join("");
    const section = `  <section style="border: 1px solid #d1d5db; border-left: 6px solid #f59e0b; border-radius: 10px; padding: 20px; margin-bottom: 18px; background: #fffbeb;">\n    <h2 style="font-size: 23px; margin-top: 0;">Direct Resource Link</h2>\n<p>Use the direct link below only when the lesson or checkpoint asks you to use an approved virtual resource. The link opens the specific resource; you should not search for a different activity.</p><ul style="padding-left: 24px;">${links}</ul>\n  </section>\n`;

    const marker = '  <section style="border: 1px solid #d1d5db; border-left: 6px solid #7c3aed;';
    if (!html.includes("Direct Resource Link")) {
      if (html.includes(marker)) {
        html = html.replace(marker, `${section}${marker}`);
      } else {
        html = html.replace('  <div class="mla-tor-support-box"', `${section}  <div class="mla-tor-support-box"`);
      }
    }
    fs.writeFileSync(p03Path, html, "utf8");
  }
}
