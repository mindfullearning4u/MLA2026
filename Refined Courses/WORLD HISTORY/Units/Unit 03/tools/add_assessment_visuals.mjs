import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', 'Moodle XML');

const files = fs.readdirSync(root).filter((name) => name.endsWith('.xml'));

const lessonNames = {
  L01: 'Medieval Japan',
  L02: 'Italian City-States and Humanism',
  L03: 'Renaissance Innovation',
  L04: 'Scientific Revolution',
  L05: 'Reformation and Catholic Response',
  L06: 'Exploration and Columbian Exchange',
  L07: 'Colonial Systems and Forced Labor',
};

const visualPlans = {
  L01: [
    ['map', 'Japan: Island Geography', ['Hokkaido', 'Honshu', 'Shikoku', 'Kyushu', 'Sea routes to Korea and China']],
    ['hierarchy', 'Medieval Japanese Political Order', ['Emperor', 'Shogun', 'Daimyo', 'Samurai', 'Farmers and artisans']],
    ['flow', 'Cultural Diffusion into Japan', ['China and Korea', 'Writing and Buddhism', 'Japanese adaptation']],
    ['timeline', 'Selected Developments in Medieval Japan', ['794 Heian period begins', '1185 warrior rule expands', '1274 and 1281 Mongol invasions', '1603 Tokugawa shogunate']],
    ['comparison', 'Authority and Influence', ['Emperor: symbolic legitimacy', 'Shogun: military government', 'Daimyo: regional authority']],
  ],
  L02: [
    ['map', 'Renaissance Italy: Connected City-States', ['Venice', 'Milan', 'Florence', 'Rome', 'Mediterranean trade routes']],
    ['flow', 'Wealth, Patronage, and Culture', ['Trade and banking', 'Patronage', 'Artists and scholars', 'Renaissance works']],
    ['network', 'Urban Networks of Renaissance Italy', ['Merchants', 'Bankers', 'Guilds', 'Political leaders', 'Humanists']],
    ['comparison', 'Medieval and Humanist Education', ['Scholastic tradition', 'Classical texts', 'Rhetoric and civic life']],
    ['timeline', 'Selected Renaissance Developments', ['1300s Italian humanism', '1400s Medici patronage', '1450s movable-type printing', '1500s wider European diffusion']],
  ],
  L03: [
    ['perspective', 'Linear Perspective Construction', ['Horizon line', 'Vanishing point', 'Orthogonal lines', 'Foreground and background']],
    ['press', 'Movable-Type Printing Process', ['Arrange reusable type', 'Apply ink', 'Press paper', 'Distribute copies']],
    ['chart', 'Effect of Faster Reproduction', ['Fewer hand-copied texts', 'More printed copies', 'Lower cost per copy', 'Wider readership']],
    ['comparison', 'Classical Influence and Renaissance Innovation', ['Ancient models', 'Observation of nature', 'New artistic techniques']],
    ['flow', 'Vernacular Printing and Cultural Change', ['Printing press', 'Vernacular texts', 'Expanded readership', 'Diffusion of ideas']],
  ],
  L04: [
    ['orbits', 'Geocentric and Heliocentric Models', ['Geocentric: Earth centered', 'Heliocentric: Sun centered', 'Models organize observations']],
    ['method', 'Evidence-Based Investigation', ['Question', 'Observation', 'Hypothesis', 'Test', 'Analyze evidence', 'Revise explanation']],
    ['timeline', 'Selected Scientific Revolution Developments', ['1543 Copernicus publishes', '1609 Galileo uses telescope', '1620 Bacon promotes empirical method', '1687 Newton publishes Principia']],
    ['chart', 'Observation and Explanation', ['Repeated observations', 'Recorded measurements', 'Pattern identified', 'Model evaluated']],
    ['comparison', 'Ways of Establishing Knowledge', ['Inherited authority', 'Direct observation', 'Experiment', 'Mathematical reasoning']],
  ],
  L05: [
    ['timeline', 'Selected Reformation Developments', ['1517 Ninety-Five Theses', '1534 Act of Supremacy', '1545 Council of Trent begins', '1555 Peace of Augsburg']],
    ['split', 'Western Christianity after Reform', ['Western Church', 'Catholic reform', 'Lutheran churches', 'Reformed churches', 'Anglican Church']],
    ['flow', 'Printing and Religious Debate', ['Reform arguments', 'Printing presses', 'Vernacular pamphlets', 'Wider debate']],
    ['comparison', 'Reformation and Catholic Response', ['Criticism and reform', 'Doctrine and authority', 'Education and missions']],
    ['map', 'Religious Change across Western Europe', ['German states: mixed confessions', 'England: Anglican settlement', 'Italy and Spain: predominantly Catholic', 'Switzerland: Reformed centers']],
  ],
  L06: [
    ['map', 'Atlantic and Indian Ocean Routes', ['Europe', 'West Africa', 'Americas', 'Indian Ocean', 'Prevailing route connections']],
    ['exchange', 'Columbian Exchange', ['Americas to Afro-Eurasia: maize, potatoes', 'Afro-Eurasia to Americas: horses, wheat, disease']],
    ['navigation', 'Navigation Tools and Their Uses', ['Compass: direction', 'Astrolabe: latitude estimate', 'Caravel: maneuverable sailing']],
    ['timeline', 'Selected Oceanic Exploration', ['1488 Dias rounds Cape of Good Hope', '1492 Columbus crosses Atlantic', '1498 da Gama reaches India', '1519–1522 first circumnavigation']],
    ['cause', 'Exploration: Causes and Consequences', ['Trade competition', 'Maritime technology', 'Oceanic voyages', 'Exchange and conquest']],
  ],
  L07: [
    ['map', 'Atlantic Colonial System', ['Europe', 'West Africa', 'Americas', 'Goods, forced migration, and extracted resources']],
    ['comparison', 'Colonial Labor Systems', ['Encomienda: tribute and labor demands', 'Repartimiento: rotating coerced labor', 'Chattel slavery: hereditary property status']],
    ['flow', 'Plantation Economy', ['Land seizure', 'Cash crops', 'Coerced labor', 'Atlantic export', 'Colonial profit']],
    ['hierarchy', 'Constructed Colonial Hierarchy', ['Colonial officials and elites', 'Merchants and landholders', 'Free laborers', 'Indigenous and enslaved peoples']],
    ['chart', 'Demographic Change after Contact', ['Population decline from disease and violence', 'Forced migration from Africa', 'Growth of mixed colonial societies']],
  ],
};

const esc = (value) => value.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

function lessonCode(questionName) {
  const match = questionName.match(/_L(0?[1-7])_/);
  return match ? `L${String(Number(match[1])).padStart(2, '0')}` : null;
}

function svgFor(plan, evidenceTerms) {
  const [kind, title, labels] = plan;
  const all = [...labels, ...evidenceTerms].slice(0, 7);
  const colors = ['#15375f', '#1f6d68', '#8a4b20', '#65478a', '#8a6b18', '#365f2f', '#78364a'];
  let shapes = '';
  if (kind === 'timeline') {
    shapes += '<line x1="70" y1="220" x2="830" y2="220" stroke="#26384a" stroke-width="5"/>';
    all.slice(0, 5).forEach((label, i) => {
      const x = 95 + i * 175;
      shapes += `<circle cx="${x}" cy="220" r="12" fill="${colors[i]}"/><text x="${x}" y="255" text-anchor="middle" class="small">${esc(label)}</text>`;
    });
  } else if (kind === 'map') {
    shapes += '<path d="M120 155 C180 90,260 110,310 165 C355 215,310 285,225 290 C145 290,80 230,120 155Z" fill="#d8e8d1" stroke="#365f2f" stroke-width="3"/><path d="M560 120 C650 85,760 130,790 210 C750 290,650 310,560 260 C515 215,520 160,560 120Z" fill="#eadfc7" stroke="#8a6b18" stroke-width="3"/><path d="M345 185 C390 145,445 150,485 205 C450 255,395 270,350 235Z" fill="#d5e2ef" stroke="#15375f" stroke-width="3"/>';
    all.slice(0, 5).forEach((label, i) => shapes += `<text x="${145 + (i%3)*245}" y="${345 + Math.floor(i/3)*28}" class="small">• ${esc(label)}</text>`);
    shapes += '<path d="M310 185 C390 125,480 125,560 170" fill="none" stroke="#8a4b20" stroke-width="4" marker-end="url(#arrow)"/>';
  } else if (kind === 'orbits') {
    shapes += '<circle cx="260" cy="215" r="35" fill="#5b78a0"/><circle cx="260" cy="215" r="105" fill="none" stroke="#777" stroke-width="3"/><circle cx="260" cy="110" r="18" fill="#d6a52c"/><text x="260" y="360" text-anchor="middle" class="label">Geocentric model</text><circle cx="650" cy="215" r="35" fill="#d6a52c"/><circle cx="650" cy="215" r="105" fill="none" stroke="#777" stroke-width="3"/><circle cx="650" cy="110" r="18" fill="#5b78a0"/><text x="650" y="360" text-anchor="middle" class="label">Heliocentric model</text>';
  } else if (kind === 'perspective') {
    shapes += '<line x1="60" y1="175" x2="840" y2="175" stroke="#555" stroke-width="3"/><circle cx="450" cy="175" r="8" fill="#8a4b20"/><text x="465" y="160" class="small">Vanishing point</text><line x1="80" y1="390" x2="450" y2="175" stroke="#15375f" stroke-width="3"/><line x1="820" y1="390" x2="450" y2="175" stroke="#15375f" stroke-width="3"/><rect x="330" y="225" width="240" height="150" fill="none" stroke="#1f6d68" stroke-width="5"/><text x="450" y="420" text-anchor="middle" class="label">Orthogonal lines create the appearance of depth</text>';
  } else if (kind === 'chart') {
    all.slice(0, 5).forEach((label, i) => {
      const h = 55 + i * 32;
      shapes += `<rect x="90" y="${110+i*62}" width="${h*5}" height="38" fill="${colors[i]}" opacity="0.85"/><text x="105" y="${135+i*62}" class="small light">${esc(label)}</text>`;
    });
  } else {
    all.slice(0, 6).forEach((label, i) => {
      const x = 60 + (i%3)*285, y = 115 + Math.floor(i/3)*170;
      shapes += `<rect x="${x}" y="${y}" width="230" height="95" rx="14" fill="${colors[i]}"/><text x="${x+115}" y="${y+42}" text-anchor="middle" class="small light">${esc(label)}</text>`;
      if (i < all.slice(0,6).length-1 && i%3!==2) shapes += `<line x1="${x+230}" y1="${y+48}" x2="${x+275}" y2="${y+48}" stroke="#26384a" stroke-width="4" marker-end="url(#arrow)"/>`;
    });
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="470" viewBox="0 0 900 470" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">Labeled instructional visual for interpreting historical evidence.</desc><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#26384a"/></marker><style>.title{font:700 26px Arial;fill:#172a3a}.label{font:700 17px Arial;fill:#172a3a}.small{font:15px Arial;fill:#172a3a}.light{fill:#fff}</style></defs><rect width="900" height="470" rx="18" fill="#f7f3e8"/><text x="450" y="52" text-anchor="middle" class="title">${esc(title)}</text>${shapes}<text x="450" y="455" text-anchor="middle" class="small">Read the labels, direction of arrows, scale, and sequence before answering.</text></svg>`;
}

for (const file of files) {
  const sourcePath = path.join(root, file);
  let xml = fs.readFileSync(sourcePath, 'utf8');
  xml = xml.replace(/(<question type="category"><category><text>)([^<]+)(<\/text>)/, (_, a, category, c) => `${a}${category} Visual-Ready${c}`);
  let visualIndex = 0;
  xml = xml.replace(/<question type="multichoice">[\s\S]*?<\/question>/g, (question) => {
    const nameMatch = question.match(/<name><text>([^<]+)<\/text><\/name>/);
    if (!nameMatch) return question;
    const originalName = nameMatch[1];
    question = question.replace(`<name><text>${originalName}</text></name>`, `<name><text>${originalName}_V2</text></name>`);
    if (!question.includes('<table')) return question;

    const code = lessonCode(originalName) ?? `L0${(visualIndex % 7) + 1}`;
    const planList = visualPlans[code] ?? visualPlans.L01;
    const plan = planList[visualIndex % planList.length];
    const strongTerms = [...question.matchAll(/<strong>([^<]+)<\/strong>/g)].map((m) => m[1]).filter((x) => !/source|visual|evidence/i.test(x)).slice(0, 2);
    const svg = svgFor(plan, strongTerms);
    const filename = `${originalName.toLowerCase()}-visual.svg`;
    const encoded = Buffer.from(svg, 'utf8').toString('base64');
    question = question.replace('<p>Which conclusion is best supported by the evidence table?</p>', `<p><img src="@@PLUGINFILE@@/${filename}" alt="${esc(plan[1])}: labeled instructional visual" style="max-width:100%;height:auto"></p><p><strong>Use both the evidence table and the visual.</strong> Which conclusion is best supported?</p>`);
    question = question.replace('</questiontext>', `<file name="${filename}" path="/" encoding="base64">${encoded}</file></questiontext>`);
    visualIndex++;
    return question;
  });
  const outputPath = sourcePath.replace(/\.xml$/i, '_VisualReady.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(path.basename(outputPath));
}
