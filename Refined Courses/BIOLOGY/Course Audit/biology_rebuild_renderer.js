const profiles = require('./biology_rebuild_profiles');

const pad = (n) => String(n).padStart(2, '0');
const keyFor = (lesson) => `U${pad(lesson.unit.n)}L${pad(lesson.number)}`;
const profileFor = (lesson) => {
  const profile = profiles[keyFor(lesson)];
  if (!profile) throw new Error(`Missing Biology rebuild profile: ${keyFor(lesson)}`);
  return profile;
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const xmlEsc = esc;

function shell(lesson, label, body) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.65;color:#172033;max-width:980px;margin:0 auto 22px">
  <div style="background:#111827;color:#fff;border-radius:12px;padding:14px 18px;margin-bottom:16px;font-weight:700">📘 BIOLOGY | Unit ${pad(lesson.unit.n)} | Lesson ${pad(lesson.number)}</div>
  <div style="background:#eaf4ff;border-left:6px solid #2563eb;border-radius:10px;padding:18px 22px;margin-bottom:18px"><h1 style="font-size:30px;margin:0">${label}</h1><p style="font-size:21px;margin:4px 0 0"><strong>${lesson.title}</strong></p></div>
  ${body}
  </div>`;
}

function card(title, body, color = '#0f766e', bg = '#f0fdfa') {
  return `<section style="border:1px solid #cbd5e1;border-left:6px solid ${color};border-radius:10px;padding:18px 20px;margin:0 0 18px;background:${bg}"><h2 style="font-size:23px;margin:0 0 10px">${title}</h2>${body}</section>`;
}

function help(text) {
  return card('Teacher of Record Support', `<p style="margin:0">Help is available. If ${text}, contact your Teacher of Record and share the exact step, label, value, or relationship that is unclear. Your Teacher of Record can clarify the idea and help you plan the next attempt.</p>`, '#2563eb', '#eff6ff').replace('<section ', '<section class="mla-tor-support-box" ');
}

const labDetails = {
  1:{question:'Which combination of cell observations, water-property evidence, and macromolecule functions best explains why cells can carry out life processes?',claim:'Cells depend on water and carbon-based molecules for boundaries, transport, energy use, biological work, and information storage.',controls:'Use the supplied evidence only; keep units, comparison conditions, and graph scales unchanged.'},
  2:{question:'How do cell structures and selective transport support homeostasis and health across cells, plants, and human systems?',claim:'Biological structures maintain function by regulating matter movement, coordinating responses, and recognizing specific health threats.',controls:'Use the same cell type and time interval within each transport comparison; use the stated sample sizes for rate calculations.'},
  3:{question:'How do enzyme conditions, ATP transfer, photosynthesis, respiration, and Earth cycles connect matter movement with energy transformation?',claim:'Matter is rearranged and cycled while energy is captured, transferred through ATP, used for work, and dispersed.',controls:'Use the same enzyme amount for rate comparisons and the stated system boundary for every flux calculation.'},
  4:{question:'How can DNA sequence, protein, inheritance, cell-division, and biotechnology evidence support a responsible genetics conclusion?',claim:'Genetic evidence can support a mechanism and probability when sequence analysis, inheritance models, controls, and ethical limits agree.',controls:'Use the provided fictional case only; preserve strand orientation, codon reading frame, allele notation, and control labels.'},
  5:{question:'How do multiple evidence sources support evolutionary relationships, mechanisms of change, classification revisions, and cautious historical explanations?',claim:'Converging fossil, anatomical, molecular, population, and classification evidence supports evolution while each source retains limits.',controls:'Use the same sequence regions, generation intervals, and trait definitions when comparing organisms or populations.'},
  6:{question:'Which ecological action is best supported by aquatic, population, food-web, biodiversity, resource, and monitoring evidence?',claim:'A defensible ecological action integrates multiple indicators, considers tradeoffs, and includes repeat monitoring.',controls:'Compare matched sites and dates, preserve measurement units, and evaluate every policy option with the same criteria.'},
};

function table(headers, rows, caption = '') {
  return `${caption ? `<p style="font-weight:700;margin:0 0 8px">${caption}</p>` : ''}<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:17px"><thead><tr style="background:#dbeafe">${headers.map((h) => `<th style="border:1px solid #94a3b8;padding:10px;text-align:left">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((v) => `<td style="border:1px solid #cbd5e1;padding:10px;vertical-align:top">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function flowSvg(profile, title) {
  const labels = profile.facts.slice(0, 4).map((f) => f[0]);
  return `<figure style="margin:12px 0"><svg viewBox="0 0 900 240" role="img" aria-label="${esc(title)} process model" style="width:100%;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px">
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/></marker></defs>
  ${labels.map((label, i) => `<rect x="${30 + i * 220}" y="72" width="180" height="92" rx="16" fill="${['#dbeafe','#dcfce7','#fef3c7','#ede9fe'][i]}" stroke="#334155" stroke-width="2"/><text x="${120 + i * 220}" y="112" text-anchor="middle" font-size="18" font-weight="700" fill="#172033">${esc(label)}</text><text x="${120 + i * 220}" y="140" text-anchor="middle" font-size="14" fill="#334155">Evidence → meaning</text>${i < 3 ? `<line x1="${210 + i * 220}" y1="118" x2="${245 + i * 220}" y2="118" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow)"/>` : ''}`).join('')}
  <text x="450" y="35" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">${esc(title)}</text></svg><figcaption style="font-size:15px;color:#475569;margin-top:6px">Original MLA instructional model. Read each label, then follow the arrows before interpreting the relationship.</figcaption></figure>`;
}

function graphSvg(profile, title) {
  const ys = [155,120,82,135,62,104];
  const labels = profile.facts.slice(0, 6).map((f) => f[0]);
  const points = ys.map((y, i) => `${90 + i * 130},${y}`).join(' ');
  return `<figure style="margin:12px 0"><svg viewBox="0 0 900 310" role="img" aria-label="${esc(title)} evidence graph" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="450" y="30" text-anchor="middle" font-size="22" font-weight="700">${esc(title)}</text><line x1="70" y1="230" x2="850" y2="230" stroke="#1e293b" stroke-width="3"/><line x1="70" y1="50" x2="70" y2="230" stroke="#1e293b" stroke-width="3"/><text x="18" y="140" transform="rotate(-90 18 140)" text-anchor="middle" font-size="15">Measured response</text><polyline points="${points}" fill="none" stroke="#0f766e" stroke-width="5"/>${ys.map((y,i)=>`<circle cx="${90+i*130}" cy="${y}" r="7" fill="#f97316"/><text x="${90+i*130}" y="255" text-anchor="middle" font-size="12">${esc(labels[i].slice(0,15))}</text>`).join('')}<text x="450" y="292" text-anchor="middle" font-size="15">Evidence condition or stage</text></svg><figcaption style="font-size:15px;color:#475569;margin-top:6px">Instructional pattern graph. The labeled evidence table below provides the exact values and meaning; do not estimate values from this overview graph.</figcaption></figure>`;
}

function cellCompareSvg() {
  return `<figure><svg viewBox="0 0 920 390" role="img" aria-label="Labeled bacterial, plant, and animal cell comparison" style="width:100%;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px"><text x="460" y="30" text-anchor="middle" font-size="23" font-weight="700">Compare the structures—not the outline alone</text>
  <rect x="35" y="90" width="245" height="150" rx="70" fill="#fde68a" stroke="#92400e" stroke-width="5"/><path d="M80 155 C120 110 185 205 240 145" fill="none" stroke="#7c2d12" stroke-width="8"/><circle cx="115" cy="195" r="5"/><circle cx="155" cy="190" r="5"/><circle cx="205" cy="195" r="5"/><text x="157" y="275" text-anchor="middle" font-size="20" font-weight="700">Bacterial cell</text><text x="157" y="302" text-anchor="middle" font-size="16">nucleoid • ribosomes • no nucleus</text>
  <rect x="340" y="65" width="245" height="220" rx="18" fill="#dcfce7" stroke="#166534" stroke-width="8"/><circle cx="470" cy="150" r="42" fill="#c4b5fd" stroke="#5b21b6" stroke-width="3"/><ellipse cx="395" cy="105" rx="28" ry="14" fill="#86efac" stroke="#166534" stroke-width="3"/><ellipse cx="540" cy="220" rx="28" ry="14" fill="#86efac" stroke="#166534" stroke-width="3"/><rect x="385" y="175" width="120" height="75" rx="28" fill="#bfdbfe" stroke="#1d4ed8"/><text x="462" y="315" text-anchor="middle" font-size="20" font-weight="700">Plant cell</text><text x="462" y="342" text-anchor="middle" font-size="16">nucleus • wall • chloroplasts • vacuole</text>
  <ellipse cx="760" cy="175" rx="125" ry="110" fill="#fee2e2" stroke="#be123c" stroke-width="5"/><circle cx="760" cy="150" r="42" fill="#c4b5fd" stroke="#5b21b6" stroke-width="3"/><ellipse cx="700" cy="220" rx="25" ry="13" fill="#fdba74" stroke="#c2410c"/><ellipse cx="825" cy="220" rx="25" ry="13" fill="#fdba74" stroke="#c2410c"/><text x="760" y="315" text-anchor="middle" font-size="20" font-weight="700">Animal cell</text><text x="760" y="342" text-anchor="middle" font-size="16">nucleus • membrane • no wall/chloroplast</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA schematic; structures are simplified and not drawn to scale.</figcaption></figure>`;
}

function organelleSvg() {
  return `<figure><svg viewBox="0 0 900 420" role="img" aria-label="Labeled eukaryotic cell with organelles and protein pathway" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="450" y="30" text-anchor="middle" font-size="23" font-weight="700">Cell parts work as a coordinated system</text><ellipse cx="360" cy="215" rx="290" ry="165" fill="#fef3c7" stroke="#b45309" stroke-width="5"/><circle cx="260" cy="190" r="65" fill="#ddd6fe" stroke="#6d28d9" stroke-width="4"/><text x="260" y="195" text-anchor="middle" font-size="18" font-weight="700">Nucleus</text><path d="M330 150 C420 105 430 190 520 145 M330 175 C420 130 430 215 520 170" fill="none" stroke="#2563eb" stroke-width="8"/><text x="430" y="115" text-anchor="middle" font-size="17">Rough ER + ribosomes</text><path d="M565 175 q70 30 0 60 q70 30 0 60" fill="none" stroke="#db2777" stroke-width="12"/><text x="660" y="250" font-size="17">Golgi</text><ellipse cx="380" cy="290" rx="55" ry="28" fill="#fdba74" stroke="#c2410c" stroke-width="4"/><path d="M340 290 q40 -28 80 0 q-40 28 -80 0" fill="none" stroke="#9a3412"/><text x="380" y="342" text-anchor="middle" font-size="17">Mitochondrion</text><circle cx="530" cy="90" r="28" fill="#bfdbfe" stroke="#1d4ed8"/><text x="600" y="95" font-size="17">Vesicle</text><path d="M315 185 L365 155 M520 155 L560 185 M620 225 L720 170" stroke="#0f766e" stroke-width="4" marker-end="url(#oa)"/><defs><marker id="oa" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#0f766e"/></marker></defs><text x="720" y="145" font-size="17" font-weight="700">Protein pathway</text><text x="720" y="175" font-size="15">nucleus → ribosome/ER</text><text x="720" y="198" font-size="15">→ Golgi → vesicle</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA schematic; organelles are enlarged for learning and are not to scale.</figcaption></figure>`;
}

function membraneSvg() {
  const headsTop = Array.from({length:12},(_,i)=>`<circle cx="${70+i*68}" cy="125" r="16" fill="#38bdf8"/><line x1="${63+i*68}" y1="140" x2="${58+i*68}" y2="195" stroke="#64748b" stroke-width="5"/><line x1="${77+i*68}" y1="140" x2="${82+i*68}" y2="195" stroke="#64748b" stroke-width="5"/>`).join('');
  const headsBottom = Array.from({length:12},(_,i)=>`<circle cx="${70+i*68}" cy="270" r="16" fill="#38bdf8"/><line x1="${63+i*68}" y1="255" x2="${58+i*68}" y2="200" stroke="#64748b" stroke-width="5"/><line x1="${77+i*68}" y1="255" x2="${82+i*68}" y2="200" stroke="#64748b" stroke-width="5"/>`).join('');
  return `<figure><svg viewBox="0 0 900 390" role="img" aria-label="Phospholipid bilayer showing diffusion channel and ATP pump" style="width:100%;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px"><text x="450" y="32" text-anchor="middle" font-size="23" font-weight="700">Selective membrane transport</text>${headsTop}${headsBottom}<rect x="350" y="105" width="85" height="185" rx="28" fill="#a78bfa" stroke="#5b21b6" stroke-width="4"/><text x="392" y="330" text-anchor="middle" font-size="16">channel</text><rect x="650" y="100" width="100" height="195" rx="35" fill="#fbbf24" stroke="#92400e" stroke-width="4"/><text x="700" y="330" text-anchor="middle" font-size="16">ATP pump</text>${[95,145,195,245].map((x)=>`<circle cx="${x}" cy="70" r="9" fill="#ef4444"/>`).join('')}<circle cx="95" cy="340" r="9" fill="#ef4444"/><path d="M210 70 L210 105" stroke="#ef4444" stroke-width="4"/><path d="M392 65 L392 105" stroke="#2563eb" stroke-width="5"/><path d="M700 305 L700 350" stroke="#92400e" stroke-width="5"/><text x="745" y="365" font-size="16">ATP → ADP</text><text x="150" y="58" font-size="16">high concentration</text><text x="90" y="370" font-size="16">low concentration</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA model. Compare concentration, protein use, and ATP use before naming transport.</figcaption></figure>`;
}

function cycleSvg(title, nodes, centerLabel) {
  const coords=[[450,75],[735,210],[625,365],[275,365],[165,210]];
  return `<figure><svg viewBox="0 0 900 440" role="img" aria-label="${esc(title)} cycle model" style="width:100%;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px"><defs><marker id="cy" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#0f766e"/></marker></defs><text x="450" y="30" text-anchor="middle" font-size="23" font-weight="700">${esc(title)}</text><circle cx="450" cy="225" r="82" fill="#e0f2fe" stroke="#0369a1" stroke-width="4"/><text x="450" y="220" text-anchor="middle" font-size="20" font-weight="700">${esc(centerLabel)}</text><text x="450" y="247" text-anchor="middle" font-size="15">trace direction and function</text>${nodes.slice(0,5).map((n,i)=>`<rect x="${coords[i][0]-90}" y="${coords[i][1]-32}" width="180" height="64" rx="14" fill="${['#dcfce7','#fef3c7','#fee2e2','#ede9fe','#dbeafe'][i]}" stroke="#334155"/><text x="${coords[i][0]}" y="${coords[i][1]+5}" text-anchor="middle" font-size="16" font-weight="700">${esc(n)}</text><line x1="${coords[i][0]}" y1="${coords[i][1]+35}" x2="${coords[(i+1)%5][0]}" y2="${coords[(i+1)%5][1]-40}" stroke="#0f766e" stroke-width="3" marker-end="url(#cy)"/>`).join('')}</svg><figcaption style="font-size:15px;color:#475569">Original MLA cycle model. Follow the arrows and distinguish matter, information, or energy as labeled in the lesson.</figcaption></figure>`;
}

function dnaSvg(mode='replication') {
  return `<figure><svg viewBox="0 0 900 430" role="img" aria-label="DNA complementary base pairing and ${esc(mode)} model" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="450" y="32" text-anchor="middle" font-size="23" font-weight="700">DNA: sequence, pairing, and ${esc(mode)}</text><g transform="translate(95,65)">${[['A','T'],['C','G'],['G','C'],['T','A'],['A','T'],['C','G']].map(([a,b],i)=>`<line x1="90" y1="${25+i*50}" x2="250" y2="${25+i*50}" stroke="#94a3b8" stroke-width="5"/><circle cx="80" cy="${25+i*50}" r="22" fill="#bfdbfe"/><circle cx="260" cy="${25+i*50}" r="22" fill="#fbcfe8"/><text x="80" y="${31+i*50}" text-anchor="middle" font-size="18" font-weight="700">${a}</text><text x="260" y="${31+i*50}" text-anchor="middle" font-size="18" font-weight="700">${b}</text>`).join('')}<line x1="45" y1="10" x2="45" y2="300" stroke="#2563eb" stroke-width="9"/><line x1="295" y1="10" x2="295" y2="300" stroke="#db2777" stroke-width="9"/></g><path d="M500 100 C600 40 690 160 790 95 M500 145 C600 85 690 205 790 140" fill="none" stroke="#7c3aed" stroke-width="8"/><text x="645" y="52" text-anchor="middle" font-size="17">parental strands separate</text><path d="M520 250 C600 190 680 310 760 245" fill="none" stroke="#2563eb" stroke-width="8"/><path d="M520 275 C600 215 680 335 760 270" fill="none" stroke="#f97316" stroke-width="8"/><text x="645" y="350" text-anchor="middle" font-size="17">one old + one new strand in each copy</text><text x="200" y="395" text-anchor="middle" font-size="16">A–T and C–G preserve complementary information</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA DNA model. Colors distinguish strands; spacing and molecular shape are simplified.</figcaption></figure>`;
}

function geneExpressionSvg() {
  return `<figure><svg viewBox="0 0 920 390" role="img" aria-label="DNA to mRNA to ribosome to protein model" style="width:100%;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px"><defs><marker id="ge" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/></marker></defs><text x="460" y="30" text-anchor="middle" font-size="23" font-weight="700">Genetic information flows from sequence to function</text><ellipse cx="165" cy="195" rx="125" ry="130" fill="#ede9fe" stroke="#6d28d9" stroke-width="4"/><text x="165" y="85" text-anchor="middle" font-size="18" font-weight="700">Nucleus</text><text x="165" y="155" text-anchor="middle" font-size="20">DNA</text><text x="165" y="185" text-anchor="middle" font-size="17">3′–TAC GGA ACT–5′</text><text x="165" y="230" text-anchor="middle" font-size="17">mRNA</text><text x="165" y="260" text-anchor="middle" font-size="17">5′–AUG CCU UGA–3′</text><line x1="290" y1="195" x2="380" y2="195" stroke="#2563eb" stroke-width="5" marker-end="url(#ge)"/><text x="335" y="175" text-anchor="middle" font-size="15">mRNA exits</text><ellipse cx="505" cy="195" rx="105" ry="60" fill="#fde68a" stroke="#a16207" stroke-width="4"/><text x="505" y="190" text-anchor="middle" font-size="19" font-weight="700">Ribosome</text><text x="505" y="218" text-anchor="middle" font-size="15">reads codons</text><line x1="610" y1="195" x2="690" y2="195" stroke="#2563eb" stroke-width="5" marker-end="url(#ge)"/><path d="M720 155 q35 55 70 0 q35 -55 70 0 q-35 55 -70 0 q-35 -55 -70 0" fill="none" stroke="#16a34a" stroke-width="10"/><text x="790" y="250" text-anchor="middle" font-size="18" font-weight="700">Folded protein</text><text x="460" y="350" text-anchor="middle" font-size="17">transcription in nucleus → translation at ribosome → protein structure and function</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA central-dogma model. The displayed DNA strand is explicitly the template strand.</figcaption></figure>`;
}

function processSvg(title, left, middle, right, footer) {
  return `<figure><svg viewBox="0 0 900 330" role="img" aria-label="${esc(title)} model" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><defs><marker id="pr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/></marker></defs><text x="450" y="32" text-anchor="middle" font-size="23" font-weight="700">${esc(title)}</text>${[[165,left,'#dbeafe'],[450,middle,'#dcfce7'],[735,right,'#fef3c7']].map(([x,t,c])=>`<rect x="${x-115}" y="85" width="230" height="130" rx="22" fill="${c}" stroke="#334155" stroke-width="3"/><text x="${x}" y="135" text-anchor="middle" font-size="19" font-weight="700">${esc(t[0])}</text><text x="${x}" y="170" text-anchor="middle" font-size="15">${esc(t[1])}</text>`).join('')}<line x1="280" y1="150" x2="330" y2="150" stroke="#2563eb" stroke-width="5" marker-end="url(#pr)"/><line x1="565" y1="150" x2="615" y2="150" stroke="#2563eb" stroke-width="5" marker-end="url(#pr)"/><text x="450" y="275" text-anchor="middle" font-size="17">${esc(footer)}</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA process model. Read inputs, transformation, and outputs before explaining function.</figcaption></figure>`;
}

function blankCellCompareSvg() {
  return `<figure><svg viewBox="0 0 920 340" role="img" aria-label="Numbered unlabeled bacterial plant and animal cells for independent practice" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="460" y="30" text-anchor="middle" font-size="22" font-weight="700">Independent labeling model: use structure evidence</text><rect x="40" y="95" width="230" height="130" rx="65" fill="#fef3c7" stroke="#92400e" stroke-width="5"/><path d="M80 160 C120 115 185 205 235 145" fill="none" stroke="#7c2d12" stroke-width="7"/><text x="155" y="260" text-anchor="middle" font-size="21" font-weight="700">Unknown A</text><rect x="345" y="70" width="230" height="190" rx="18" fill="#dcfce7" stroke="#166534" stroke-width="8"/><circle cx="455" cy="135" r="38" fill="#ddd6fe"/><ellipse cx="395" cy="205" rx="27" ry="13" fill="#86efac"/><rect x="440" y="175" width="95" height="55" rx="22" fill="#bfdbfe"/><text x="460" y="295" text-anchor="middle" font-size="21" font-weight="700">Unknown B</text><ellipse cx="765" cy="165" rx="125" ry="100" fill="#fee2e2" stroke="#be123c" stroke-width="5"/><circle cx="765" cy="145" r="38" fill="#ddd6fe"/><ellipse cx="705" cy="205" rx="26" ry="13" fill="#fdba74"/><text x="765" y="295" text-anchor="middle" font-size="21" font-weight="700">Unknown C</text><g font-size="17" font-weight="700">${[[100,115,'1'],[180,165,'2'],[455,135,'3'],[395,205,'4'],[505,202,'5'],[765,145,'6'],[705,205,'7']].map(([x,y,n])=>`<circle cx="${x}" cy="${y}" r="14" fill="#fff" stroke="#111827"/><text x="${x}" y="${y+6}" text-anchor="middle">${n}</text>`).join('')}</g></svg><figcaption style="font-size:15px;color:#475569">Label 1–7, classify A–C, and cite the structures that support each classification.</figcaption></figure>`;
}

function punnettSvg() {
  return `<figure><svg viewBox="0 0 760 430" role="img" aria-label="Completed Aa by Aa Punnett square" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="380" y="35" text-anchor="middle" font-size="24" font-weight="700">Aa × Aa: model every gamete combination</text><g transform="translate(205,80)"><rect width="360" height="280" fill="#f8fafc" stroke="#334155" stroke-width="3"/><line x1="120" y1="0" x2="120" y2="280" stroke="#334155" stroke-width="3"/><line x1="240" y1="0" x2="240" y2="280" stroke="#334155" stroke-width="3"/><line x1="0" y1="80" x2="360" y2="80" stroke="#334155" stroke-width="3"/><line x1="0" y1="180" x2="360" y2="180" stroke="#334155" stroke-width="3"/><text x="180" y="52" text-anchor="middle" font-size="28">A</text><text x="300" y="52" text-anchor="middle" font-size="28">a</text><text x="60" y="145" text-anchor="middle" font-size="28">A</text><text x="60" y="245" text-anchor="middle" font-size="28">a</text><text x="180" y="145" text-anchor="middle" font-size="28" font-weight="700">AA</text><text x="300" y="145" text-anchor="middle" font-size="28" font-weight="700">Aa</text><text x="180" y="245" text-anchor="middle" font-size="28" font-weight="700">Aa</text><text x="300" y="245" text-anchor="middle" font-size="28" font-weight="700">aa</text></g><text x="380" y="395" text-anchor="middle" font-size="18">Expected genotypes: 25% AA • 50% Aa • 25% aa</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA probability model. The four boxes are equally likely modeled outcomes, not four guaranteed children.</figcaption></figure>`;
}

function cladogramSvg() {
  return `<figure><svg viewBox="0 0 860 390" role="img" aria-label="Cladogram with root nodes and derived traits" style="width:100%;height:auto;background:#fff;border:1px solid #cbd5e1;border-radius:10px"><text x="430" y="32" text-anchor="middle" font-size="23" font-weight="700">Read shared nodes, not tip spacing</text><path d="M100 330 L100 90 M100 300 L250 300 L250 235 M250 270 L400 270 L400 180 M400 235 L550 235 L550 125 M550 180 L700 180 L700 75" fill="none" stroke="#334155" stroke-width="5"/><text x="70" y="355" font-size="16">root</text><text x="120" y="95" font-size="18">Outgroup</text><text x="270" y="230" font-size="18">Taxon A</text><text x="420" y="175" font-size="18">Taxon B</text><text x="570" y="120" font-size="18">Taxon C</text><text x="720" y="70" font-size="18">Taxon D</text><circle cx="250" cy="300" r="8" fill="#f97316"/><circle cx="400" cy="270" r="8" fill="#f97316"/><circle cx="550" cy="235" r="8" fill="#f97316"/><circle cx="700" cy="180" r="8" fill="#f97316"/><text x="280" y="325" font-size="15">derived trait 1</text><text x="445" y="292" font-size="15">trait 2</text><text x="595" y="257" font-size="15">trait 3</text></svg><figcaption style="font-size:15px;color:#475569">Original MLA cladogram. A node represents a shared ancestor; branch rotation does not change relationships.</figcaption></figure>`;
}

function foodWebSvg() {
  return `<figure><svg viewBox="0 0 900 440" role="img" aria-label="Pond food web with arrows from food to eater" style="width:100%;height:auto;background:#f0fdf4;border:1px solid #86efac;border-radius:10px"><defs><marker id="fw" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#166534"/></marker></defs><text x="450" y="32" text-anchor="middle" font-size="23" font-weight="700">Pond food web: arrow means “energy from food to eater”</text>${[['Algae',150,350,'#86efac'],['Plants',360,350,'#86efac'],['Snail',170,230,'#fde68a'],['Insect',370,230,'#fde68a'],['Small fish',570,230,'#fdba74'],['Large fish',700,120,'#fca5a5'],['Heron',450,80,'#c4b5fd'],['Decomposers',730,350,'#bfdbfe']].map(([t,x,y,c])=>`<rect x="${x-65}" y="${y-25}" width="130" height="50" rx="14" fill="${c}" stroke="#334155"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700">${t}</text>`).join('')}${[[150,325,170,255],[360,325,370,255],[170,205,450,105],[370,205,570,255],[570,205,700,145],[700,95,500,85],[150,375,665,350],[360,375,665,350],[570,255,700,325]].map(([a,b,c,d])=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#166534" stroke-width="4" marker-end="url(#fw)"/>`).join('')}</svg><figcaption style="font-size:15px;color:#475569">Original MLA model. Trace more than one pathway before predicting an indirect effect.</figcaption></figure>`;
}

function figure(lesson, profile) {
  if (profile.visual === 'cellCompare') return cellCompareSvg();
  if (profile.visual === 'organelles') return organelleSvg();
  if (profile.visual === 'membrane') return membraneSvg();
  if (profile.visual === 'dna') return dnaSvg('semiconservative replication');
  if (profile.visual === 'geneExpression' || profile.visual === 'mutation') return geneExpressionSvg();
  if (profile.visual === 'punnett' || profile.visual === 'nonMendelian') return punnettSvg();
  if (profile.visual === 'cladogram' || profile.visual === 'domains') return cladogramSvg();
  if (profile.visual === 'foodWeb') return foodWebSvg();
  if (profile.visual === 'atp') return cycleSvg('ATP and ADP energy-transfer cycle',['ATP: 3 phosphates','Cellular work','ADP + phosphate','Energy from food/light','ATP reformed'],'energy coupling');
  if (profile.visual === 'feedback') return cycleSvg('Negative-feedback regulation',['Stimulus','Receptor','Control center','Effector','Return toward range'],'homeostasis');
  if (profile.visual === 'plant') return processSvg('Plant transport from root to leaf',['Root hairs','water + minerals'],['Xylem and phloem','water up; sugar to sinks'],['Leaf stomata','CO₂ in; water vapor out'],'Root, stem, and leaf structures coordinate matter transport.');
  if (profile.visual === 'systems') return processSvg('Human systems cooperate',['Nervous system','rapid information'],['Cardiovascular system','transport and exchange'],['Immune system','recognition and response'],'Coordinated systems help maintain homeostasis.');
  if (profile.visual === 'photosynthesis') return processSvg('Photosynthesis',['CO₂ + H₂O + light','matter + energy inputs'],['Chloroplast','light energy captured'],['Glucose + O₂','matter products'],'Carbon enters glucose; light energy becomes chemical energy.');
  if (profile.visual === 'respiration') return processSvg('Cellular respiration',['Glucose + O₂','reactants'],['Mitochondrion','energy transferred'],['CO₂ + H₂O + ATP','products + usable transfer'],'Breathing supplies gases; respiration occurs in cells.');
  if (profile.visual === 'energyLink') return cycleSvg('Photosynthesis–respiration relationship',['CO₂ + H₂O','Photosynthesis','Glucose + O₂','Cellular respiration','ATP + biological work'],'matter cycles; energy flows');
  if (profile.visual === 'division') return processSvg('Mitosis compared with meiosis',['Replicated diploid cell','DNA copied once'],['Mitosis: 1 division','2 similar diploid cells'],['Meiosis: 2 divisions','4 varied haploid cells'],'Homolog separation, crossing over, and assortment create varied gametes.');
  if (profile.visual === 'succession') return processSvg('Succession after disturbance',['Disturbance','check whether soil remains'],['Pioneer and intermediate stages','abundance changes over time'],['Later community','dynamic, not permanent'],'No soil supports primary succession; remaining soil supports secondary succession.');
  if (profile.visual === 'origin') return processSvg('Testing origin-of-life steps',['Early-Earth inputs','gases, water, energy'],['Organic products and vesicles','testable chemical steps'],['Missing complete system','heredity + evolution required'],'Evidence for one step does not prove the complete origin of life.');
  if (/Lab$/.test(profile.visual)) return cycleSvg(`${lesson.title}: investigation stations`,profile.facts.map((f)=>f[0]),'integrate evidence');
  if (['enzyme','selection','population','aquatic','biodiversity','sustainability','measurement','sources'].includes(profile.visual)) return graphSvg(profile, lesson.title);
  return flowSvg(profile, lesson.title);
}

function practiceFigure(lesson, profile) {
  if (profile.visual === 'cellCompare' || profile.visual === 'organelles') return blankCellCompareSvg();
  return figure(lesson, profile);
}

function standards(lesson) {
  return card('Standards and Student Target', `<p style="margin:0 0 8px"><strong>Primary:</strong> ${lesson.standards.join('; ')}</p><p style="margin:0 0 8px"><strong>Supporting:</strong> ${lesson.support.join('; ')}</p><p style="margin:0"><strong>I can:</strong> ${lesson.purpose}</p>`);
}

function pageP01(lesson) {
  const p = profileFor(lesson);
  return shell(lesson, 'P01 Lesson Overview',
    standards(lesson) +
    card('Look Back', `<p style="margin:0">${p.bridge}</p>`, '#7c3aed', '#f5f3ff') +
    card('Why This Matters', `<p style="margin:0">${p.why}</p>`, '#ea580c', '#fff7ed') +
    card('Your Learning Path', `<ol style="margin:0;padding-left:24px"><li>Learn the vocabulary and read the labeled model.</li><li>Follow the teaching sequence and complete the guided check.</li><li>Study three fully solved examples${lesson.number === 7 ? ' through the investigation analysis sequence' : ''}.</li><li>Complete Guided Practice, independent work, and the checkpoint.</li></ol><p><strong>Mastery evidence:</strong> You can interpret a new visual or data set and explain the relevant biological relationship accurately.</p>`) +
    card('Look Ahead', `<p style="margin:0">${p.next}</p>`, '#16a34a', '#f0fdf4') + help('you are unsure what the lesson is asking you to learn'));
}

function pageP02(lesson) {
  const p = profileFor(lesson);
  const lab = lesson.number===7 ? labDetails[lesson.unit.n] : null;
  return shell(lesson, 'P02 Notebook Task - Part 1',
    (lab ? card('Investigation Notebook Setup', `<p><strong>Investigation Question:</strong> ${lab.question}</p><p><strong>Claim Being Tested:</strong> ${lab.claim}</p><p><strong>Controlled Conditions:</strong> ${lab.controls}</p>${table(['Evidence Source or Condition','How the Student Should Use It'],p.facts.slice(0,4).map(f=>[f[0],`Record the exact observation, value, or label; then explain: ${f[2]}`]))}`, '#ea580c', '#fff7ed') : '') +
    card('Notebook Setup', `<p><strong>Title:</strong> ${lesson.title}</p><p>Copy the vocabulary table and leave space for the labeled model, evidence notes, and your explanation. You submit these notes with the checkpoint.</p>`) +
    card('Vocabulary You Will Use', table(['Term','Student-Friendly Meaning'], p.vocab.map(([a,b])=>[`<strong>${a}</strong>`,b]))) +
    card('First, Read the Biology', figure(lesson,p) + `<p><strong>How to read this visual:</strong> Name each labeled part or condition. Follow arrows only in their stated direction. Then connect the visible feature to a biological function or process.</p>`, '#7c3aed', '#f5f3ff') +
    card('Step-by-Step Teaching Sequence', `<ol style="padding-left:24px;margin:0">${p.steps.map((s,i)=>`<li><strong>Step ${i+1}:</strong> ${s}</li>`).join('')}</ol>`) + help('a vocabulary term or visual label is still unclear'));
}

function pageP03(lesson) {
  const p = profileFor(lesson);
  const rows = p.facts.map(([source, evidence, meaning])=>[`<strong>${source}</strong>`, evidence, meaning]);
  const lesson7 = lesson.number === 7;
  return shell(lesson, 'P03 Notebook Task - Part 2',
    card(lesson7 ? 'Follow This Investigation Procedure' : 'Read the Evidence Before Explaining It', lesson7
      ? `<ol style="padding-left:24px;margin:0">${p.steps.map((s,i)=>`<li><strong>${i+1}.</strong> ${s} Record the named value, label, calculation, or pattern before moving on.</li>`).join('')}</ol>`
      : `<p>A scientific explanation begins with a visible detail, not a memorized slogan. In the table, the middle column states what is directly given. The final column models the biological meaning. Read across each row.</p>`) +
    card('Evidence and Meaning', table(['Part, Condition, or Source','What the Evidence Shows','What It Means Biologically'],rows)) +
    card('Guided Notes Check — Completed Model', `<p><strong>Question:</strong> What does the first evidence row show, and why does it matter?</p><p><strong>Completed answer:</strong> The evidence shows <em>${p.facts[0][1]}</em> This matters because ${p.facts[0][2].charAt(0).toLowerCase()+p.facts[0][2].slice(1)}</p><p><strong>Where the answer came from:</strong> The exact observation is in row 1, column 2. The biological meaning is in row 1, column 3. A complete answer uses both.</p>`, '#ea580c', '#fff7ed') +
    card('Common Mistake to Avoid', `<p><strong>Incomplete:</strong> “The picture proves the standard.”</p><p><strong>Improved:</strong> Name the visible structure, value, trend, or relationship; then explain the exact biological process it supports. A model shows selected features and never proves more than it displays.</p>`, '#dc2626', '#fef2f2') + help('you cannot locate the evidence used in the completed answer'));
}

function exampleBlock(p, index) {
  const [source,evidence,meaning] = p.facts[index];
  return card(`Worked Example ${index+1}: ${source}`, `<div style="background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:12px"><p style="margin:0"><strong>Displayed evidence:</strong> ${evidence}</p></div><ol style="padding-left:24px"><li><strong>Name what is being studied:</strong> ${source}.</li><li><strong>Observe:</strong> Restate the exact label, comparison, or value: ${evidence}</li><li><strong>Interpret:</strong> ${meaning}</li><li><strong>Check the boundary:</strong> Do not claim more conditions, organisms, or causes than the displayed evidence supports.</li></ol><p><strong>Complete answer:</strong> ${meaning} The supporting evidence is that ${evidence.charAt(0).toLowerCase()+evidence.slice(1)}</p>`, ['#0f766e','#7c3aed','#ea580c'][index], ['#f0fdfa','#f5f3ff','#fff7ed'][index]);
}

function pageP04(lesson) {
  const p = profileFor(lesson);
  if (lesson.number === 7) {
    const lab=labDetails[lesson.unit.n];
    return shell(lesson, 'P04 Data Collection and Analysis',
      card('Investigation Evidence Is Included Here', `<p><strong>Question:</strong> ${lab.question}</p><p><strong>Claim being tested:</strong> ${lab.claim}</p>` + figure(lesson,p) + table(['Analysis Station','Data or Observation','How the Student Should Use It'],p.facts.map((f)=>[f[0],f[1],f[2]])) + `<p><strong>Limitation:</strong> State one feature the model or data set does not include. <strong>CER:</strong> Use the station evidence to write a claim, exact evidence, reasoning, and limitation.</p>`) +
      exampleBlock(p,0)+exampleBlock(p,1)+exampleBlock(p,2)+
      card('Your Analysis Record', `<p>For stations 4–6, copy the evidence, show any calculation, state the pattern, and write one biological meaning. These entries become the evidence bank for P06.</p>`) + help('a calculation, axis, model arrow, or conclusion boundary is unclear'));
  }
  return shell(lesson, 'P04 Worked Examples',
    card('The Visual Used in These Examples', figure(lesson,p) + `<p>Keep this model visible while following each solution. The worked examples below point to its structures, conditions, or relationships and add exact evidence.</p>`, '#2563eb', '#eff6ff') +
    card('How to Study a Worked Example', `<p>Do not copy only the final sentence. Follow how the answer is derived: identify the biological structure or process, read the displayed evidence, interpret it with lesson vocabulary, then check the conclusion boundary.</p>`) +
    exampleBlock(p,0)+exampleBlock(p,1)+exampleBlock(p,2)+help('one step in a worked solution does not follow from the displayed evidence'));
}

function pageP05(lesson) {
  const p = profileFor(lesson);
  return shell(lesson, 'P05 Guided Practice',
    card('What You Will Practice', `<p>The five Moodle questions use actual ${lesson.title.toLowerCase()} diagrams, data, and scenarios. They check whether you can:</p><ol style="padding-left:24px">${p.steps.map((s)=>`<li>${s}</li>`).join('')}<li>Transfer the idea to a new but comparable example.</li></ol>`) +
    card('Before You Begin', `<p>Keep P02–P04 open. For every question: (1) read the visual or table title, (2) identify labels and units, (3) state the pattern, (4) choose the answer whose biological explanation matches the evidence. Feedback explains why each option is correct or incorrect.</p><p><strong>Notebook:</strong> Correct every missed item by writing the evidence detail and the biological reason.</p>`, '#7c3aed', '#f5f3ff') + help('feedback does not resolve why an answer is incorrect'));
}

function pageP06(lesson) {
  const p = profileFor(lesson);
  const rows = p.facts.slice(3).map((f,i)=>[`Case ${String.fromCharCode(65+i)}`,f[1],'<em>Student completes: name the concept, interpret the evidence, and state a limit.</em>']);
  return shell(lesson, 'P06 Independent Work',
    card('Use This Practice Evidence Set', table(['Case','Displayed Evidence','Your Analysis'],rows) + practiceFigure(lesson,p)) +
    card('Part A: Identify and Label', `<ol style="padding-left:24px"><li>Copy a simplified version of the displayed visual.</li><li>Label the parts, conditions, axes, or stages named in P02.</li><li>For Cases A–C, name the vocabulary concept that best matches the evidence.</li></ol>`) +
    card('Part B: Analyze', `<ol style="padding-left:24px"><li>For each case, quote or copy the exact value, label, structure, or relationship used.</li><li>Complete at least two evidence rows by explaining what the evidence shows and what it means biologically.</li><li>When numbers are provided, show the calculation and include units.</li></ol>`, '#ea580c', '#fff7ed') +
    card('Part C: Explain and Transfer', `<p>Write one concise, complete CER response that answers: <strong>How does the displayed evidence support the central idea of ${lesson.title}?</strong> Include two different evidence details, the mechanism connecting them, and one boundary or limitation. Do not add a required sentence merely to make the response longer.</p>`, '#16a34a', '#f0fdf4') +
    card('What to Submit', `<ul style="padding-left:24px"><li>Your labeled visual</li><li>Completed Case A–C analysis</li><li>Calculations with units, when present</li><li>Your evidence-based explanation</li></ul>`) + help('you need clarification before completing a case or calculation'));
}

function pageP07(lesson) {
  const p = profileFor(lesson);
  const a=p.facts[4], b=p.facts[5];
  return shell(lesson, 'P07 Checkpoint',
    card('Checkpoint Transfer Case', practiceFigure(lesson,p) + `<p><strong>Scenario evidence 1:</strong> ${a[1]}</p><p><strong>Scenario evidence 2:</strong> ${b[1]}</p><p><strong>Your task:</strong> Identify the structure, process, pattern, or relationship represented by each evidence statement. Explain how the two pieces of evidence answer the lesson’s central biological question. State one conclusion the evidence supports and one conclusion it does not support.</p>`) +
    card('Required Submission', `<ol style="padding-left:24px"><li>A labeled sketch, model annotation, calculation, or two-row evidence table appropriate to this lesson.</li><li>A direct claim answering the Checkpoint Task.</li><li>Two exact evidence statements from the displayed scenario.</li><li>A complete CER response using the lesson vocabulary.</li><li>One explicit limitation or boundary.</li></ol><p><strong>Mastery target:</strong> 80% or higher. If revision is needed, use feedback and contact your Teacher of Record for targeted support before the next attempt.</p>`, '#7c3aed', '#f5f3ff') +
    card('Self-Check Before Submitting', `<ul style="padding-left:24px"><li>Can a reader locate every fact I cited in the displayed case?</li><li>Did I explain the biology rather than repeat the data?</li><li>Did I avoid adding causes, conditions, or certainty the evidence does not show?</li></ul>`) + help('you are unsure what evidence belongs in the checkpoint response'));
}

const stemTemplates = [
  (f)=>`Which interpretation is best supported by the displayed evidence about ${f[0]}?`,
  (f)=>`A student claims the evidence has no biological meaning. Which response correctly explains ${f[0]}?`,
  (f)=>`Which conclusion stays within the boundary of the ${f[0]} evidence?`,
  (f)=>`Which explanation correctly connects the ${f[0]} observation to the biological process?`,
  (f)=>`Which statement should be recorded in the “what it means” column for ${f[0]}?`,
];
const answerPatterns = [0,2,1,3,1,0,3,2,0,1,3,2,1,0,2,3,0,2,1,3,2,0,3,1,2,3,1,0,2,3,0,1,3,2,0,1,2,3,1,0];

function miniStimulus(lesson, profile, factIndex, questionIndex) {
  const f=profile.facts[factIndex];
  if (questionIndex % 5 === 4) return figure(lesson, profile);
  if (questionIndex % 3 === 0) return `<div style="border:2px solid #2563eb;border-radius:8px;padding:10px"><p><strong>${f[0]}</strong></p><p>${f[1]}</p></div>`;
  if (questionIndex % 3 === 1) return `<table border="1" cellpadding="7"><tr><th>Evidence source</th><th>Observation or data</th></tr><tr><td>${f[0]}</td><td>${f[1]}</td></tr></table>`;
  return `<div style="background:#f0fdfa;border-left:5px solid #0f766e;padding:10px"><p><strong>Observe → interpret</strong></p><p>${f[1]}</p></div>`;
}

function questionXml(id, standard, prompt, stimulus, choices, correctIndex, correctFeedback) {
  const ordered=[]; let d=0;
  for(let i=0;i<4;i++) ordered.push(i===correctIndex?{text:choices[0],ok:true,fb:correctFeedback}:{text:choices[++d],ok:false,fb:`This option describes a different biological relationship: “${choices[d]}” The displayed label, value, or relationship does not support that interpretation.`});
  const html=`<p><strong>Question ID:</strong> ${id}</p><p><strong>MLA Standard:</strong> ${standard}</p>${stimulus}<p>${prompt}</p>`;
  return `  <question type="multichoice"><name><text>${id}</text></name><questiontext format="html"><text>${xmlEsc(html)}</text></questiontext><defaultgrade>1.0000000</defaultgrade><penalty>0.3333333</penalty><hidden>0</hidden><single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>\n${ordered.map(c=>`    <answer fraction="${c.ok?100:0}" format="html"><text>${xmlEsc(c.text)}</text><feedback format="html"><text>${xmlEsc(c.fb)}</text></feedback></answer>`).join('\n')}\n  </question>`;
}

function assessmentItems(lesson, type, count) {
  const p=profileFor(lesson); const qs=[];
  const offset=type==='quiz'?2:0;
  for(let i=0;i<count;i++){
    const fi=(i+offset)%p.facts.length, f=p.facts[fi], standard=lesson.standards[i%lesson.standards.length];
    const id=`BIO_U${pad(lesson.unit.n)}_L${pad(lesson.number)}_${type.toUpperCase()}_Q${pad(i+1)}`;
    const correct=f[2];
    const distractorFacts=[p.facts[(fi+1)%p.facts.length],p.facts[(fi+2)%p.facts.length],p.facts[(fi+3)%p.facts.length]];
    const distractors=distractorFacts.map((x)=>x[2]);
    const stemIndex=(Math.floor(i/p.facts.length)+offset)%stemTemplates.length;
    const demand=type==='quiz'?`Quiz transfer — apply the lesson to a new presentation. ${stemTemplates[stemIndex](f)}`:stemTemplates[stemIndex](f);
    qs.push(questionXml(id,standard,demand,miniStimulus(lesson,p,fi,i+(type==='quiz'?11:0)),[correct,...distractors],answerPatterns[(i+offset)%answerPatterns.length],`Correct. ${f[2]} The decisive displayed evidence is: ${f[1]}`));
  }
  return qs.join('\n');
}

function unitItems(unit,type,count,lessonObj) {
  const lessons=unit.lessons.map((_,i)=>lessonObj(unit,i+1)); const qs=[];
  for(let i=0;i<count;i++){
    const lesson=lessons[i%lessons.length], p=profileFor(lesson), fi=Math.floor(i/lessons.length)%p.facts.length, f=p.facts[fi];
    const standard=lesson.standards[i%lesson.standards.length], id=`BIO_U${pad(unit.n)}_${type.toUpperCase()}_Q${pad(i+1)}`;
    const other=[profiles[`U${pad(unit.n)}L${pad((lesson.number%8)+1)}`].facts[0][2],p.facts[(fi+1)%p.facts.length][2],`The topic name alone is sufficient; the displayed evidence does not need to be interpreted.`];
    const prompt=type==='pretest'?`Pretest — ${lesson.title}, ${f[0]}: Which statement shows the strongest readiness to interpret this Unit ${unit.n} evidence?`:`Unit assessment — ${lesson.title}, ${f[0]}: Which explanation correctly applies Unit ${unit.n} biology to the new evidence?`;
    qs.push(questionXml(id,standard,prompt,miniStimulus(lesson,p,fi,i),[f[2],...other],answerPatterns[i%answerPatterns.length],`Correct. ${f[2]} This conclusion follows from the displayed evidence: ${f[1]}`));
  }
  return qs.join('\n');
}

module.exports={pageP01,pageP02,pageP03,pageP04,pageP05,pageP06,pageP07,assessmentItems,unitItems,profileFor,figure};
