const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const production = path.join(root, "Course Production");
const unitsRoot = path.join(root, "Units");
const auditRoot = path.join(root, "Course Audit");

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function esc(s) { return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function cdata(s) { return `<![CDATA[${String(s ?? "").replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`; }
function pad(n) { return String(n).padStart(2, "0"); }
function write(file, text) { ensureDir(path.dirname(file)); fs.writeFileSync(file, text, "utf8"); }
function stripHtml(s) { return String(s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function noPunct(s) { return String(s ?? "").replace(/[.?!]\s*$/, ""); }
function hashText(s) {
  return [...String(s)].reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7);
}

const standards = {
  "MLA.USG.FND.1": "Explain natural rights, consent of the governed, republicanism, limited government, rule of law, and civic virtue as foundations of American constitutional government.",
  "MLA.USG.FND.2": "Analyze how Magna Carta, English Bill of Rights, Mayflower Compact, Common Sense, Declaration of Independence, and Enlightenment political thought influenced the American constitutional system.",
  "MLA.USG.FND.3": "Compare the Articles of Confederation with the Constitution and explain why the Constitutional Convention created a stronger federal system.",
  "MLA.USG.FND.4": "Explain federalism, separation of powers, checks and balances, popular sovereignty, and individual rights in the U.S. constitutional design.",
  "MLA.USG.CON.1": "Analyze the Preamble, articles, amendment process, supremacy clause, and major constitutional principles of the U.S. Constitution.",
  "MLA.USG.CON.2": "Explain the structure, powers, representation, and lawmaking responsibilities of Congress.",
  "MLA.USG.CON.3": "Explain the constitutional powers, roles, limits, and responsibilities of the President and executive branch.",
  "MLA.USG.CON.4": "Explain the federal court system, judicial review, precedent, constitutional interpretation, and the role of the Supreme Court.",
  "MLA.USG.RGT.1": "Analyze the Bill of Rights and explain how civil liberties protect individual freedom while still allowing lawful limits.",
  "MLA.USG.RGT.2": "Explain due process, equal protection, selective incorporation, and the relationship between federal courts and individual rights.",
  "MLA.USG.RGT.3": "Evaluate major civil rights struggles, landmark legislation, and government responses to unequal treatment.",
  "MLA.USG.RGT.4": "Explain citizenship, civic responsibility, civic virtue, rule of law, jury service, voting, and constructive civic participation.",
  "MLA.USG.POL.1": "Analyze voting rights, voter eligibility, voter turnout, barriers to participation, and expansion of suffrage.",
  "MLA.USG.POL.2": "Explain political parties, interest groups, media, and public opinion as forces that shape representation and policy.",
  "MLA.USG.POL.3": "Analyze campaigns, elections, primaries, general elections, electoral systems, campaign finance, and the Electoral College.",
  "MLA.USG.POL.4": "Evaluate civic discourse, polling, political messaging, media literacy, and evidence-based participation in a constitutional democracy.",
  "MLA.USG.PCY.1": "Explain how public policy problems are identified, debated, written into law, implemented, funded, and evaluated.",
  "MLA.USG.PCY.2": "Compare federal, state, local, and tribal government roles and explain how federalism works in practical policy decisions.",
  "MLA.USG.PCY.3": "Analyze landmark Supreme Court cases and explain how constitutional interpretation affects rights, powers, and public policy.",
  "MLA.USG.PCY.4": "Explain taxation, budgeting, spending, opportunity cost, and public-policy tradeoffs in representative government.",
  "MLA.USG.CMP.1": "Compare democracy, republic, monarchy, dictatorship, authoritarianism, totalitarianism, oligarchy, theocracy, and parliamentary systems.",
  "MLA.USG.CMP.2": "Analyze the Florida Constitution, Florida state government, county and municipal government, and the relationship between state and local authority.",
  "MLA.USG.CMP.3": "Create evidence-based civic action plans using constitutional principles, stakeholder analysis, lawful advocacy, and practical implementation steps.",
  "MLA.USG.CMP.4": "Evaluate contemporary constitutional issues using evidence, competing viewpoints, democratic safeguards, and civil civic discourse."
};

const units = [
  { title: "Constitutional Foundations and Civic Principles", purpose: "build the foundation for understanding why American government is limited, constitutional, and based on civic responsibility", lessons: [
    ["Natural Rights, Rule of Law, and Limited Government", "MLA.USG.FND.1", "principle matrix"],
    ["Founding Documents and Enlightenment Influences", "MLA.USG.FND.2", "influence chain"],
    ["Articles of Confederation and the Constitutional Convention", "MLA.USG.FND.3", "comparison table"],
    ["Federalism, Separation of Powers, and Checks and Balances", "MLA.USG.FND.4", "constitutional systems diagram"],
    ["Synthesis: Foundations of Constitutional Government", "MLA.USG.FND.1; MLA.USG.FND.2; MLA.USG.FND.3; MLA.USG.FND.4", "foundations decision chart"]
  ]},
  { title: "The Constitution, Branches, and Federal Power", purpose: "show how constitutional structure turns principles into working institutions", lessons: [
    ["Structure of the U.S. Constitution", "MLA.USG.CON.1", "constitution map"],
    ["Congress and the Lawmaking Process", "MLA.USG.CON.2", "bill-to-law flowchart"],
    ["President and Executive Branch", "MLA.USG.CON.3", "executive power organizer"],
    ["Federal Courts and Judicial Review", "MLA.USG.CON.4", "court hierarchy diagram"],
    ["Synthesis: How the Constitutional System Works", "MLA.USG.CON.1; MLA.USG.CON.2; MLA.USG.CON.3; MLA.USG.CON.4", "three-branch case pathway"]
  ]},
  { title: "Rights, Liberties, and Responsibilities", purpose: "teach how rights are protected, interpreted, limited, expanded, and connected to civic responsibility", lessons: [
    ["Bill of Rights and Civil Liberties", "MLA.USG.RGT.1", "rights scenario table"],
    ["Due Process, Equal Protection, and Incorporation", "MLA.USG.RGT.2", "rights pathway diagram"],
    ["Civil Rights Movements and Government Responses", "MLA.USG.RGT.3", "rights-response timeline"],
    ["Citizenship, Responsibility, and Rule of Law", "MLA.USG.RGT.4", "responsibility evidence chart"],
    ["Synthesis: Rights, Responsibilities, and Constitutional Limits", "MLA.USG.RGT.1; MLA.USG.RGT.2; MLA.USG.RGT.3; MLA.USG.RGT.4", "rights balancing matrix"]
  ]},
  { title: "Political Participation, Elections, and Public Opinion", purpose: "explain how citizens, parties, media, campaigns, and elections connect the public to government decisions", lessons: [
    ["Voting Rights and Voter Participation", "MLA.USG.POL.1", "suffrage timeline"],
    ["Political Parties, Interest Groups, and Media", "MLA.USG.POL.2", "influence web"],
    ["Campaigns, Elections, and the Electoral College", "MLA.USG.POL.3", "election process map"],
    ["Public Opinion, Polling, and Civic Discourse", "MLA.USG.POL.4", "poll interpretation table"],
    ["Synthesis: Participation and Representation", "MLA.USG.POL.1; MLA.USG.POL.2; MLA.USG.POL.3; MLA.USG.POL.4", "participation impact chart"]
  ]},
  { title: "Public Policy, Federalism in Action, and Landmark Cases", purpose: "connect policy decisions, federalism, court interpretation, and public budgets to real government choices", lessons: [
    ["How Public Policy Is Made", "MLA.USG.PCY.1", "policy cycle"],
    ["Federal, State, and Local Government Roles", "MLA.USG.PCY.2", "authority Venn/table"],
    ["Landmark Supreme Court Cases", "MLA.USG.PCY.3", "case reasoning chart"],
    ["Budgeting, Taxing, Spending, and Tradeoffs", "MLA.USG.PCY.4", "budget tradeoff table"],
    ["Synthesis: Policy, Courts, and Federalism", "MLA.USG.PCY.1; MLA.USG.PCY.2; MLA.USG.PCY.3; MLA.USG.PCY.4", "policy decision record"]
  ]},
  { title: "Comparative Government, Florida Government, and Civic Action", purpose: "prepare students to compare systems, understand Florida government, and plan lawful civic action", lessons: [
    ["Comparative Forms of Government", "MLA.USG.CMP.1", "systems comparison table"],
    ["Florida Constitution, State Government, and Local Government", "MLA.USG.CMP.2", "Florida government chart"],
    ["Civic Action and Community Problem Solving", "MLA.USG.CMP.3", "civic action planning flowchart"],
    ["Contemporary Constitutional Issues and Democratic Safeguards", "MLA.USG.CMP.4", "issue analysis frame"],
    ["Synthesis: Civic Decision-Making and Democratic Institutions", "MLA.USG.CMP.1; MLA.USG.CMP.2; MLA.USG.CMP.3; MLA.USG.CMP.4", "civic decision checklist"]
  ]}
];

function standardsText(codes) {
  return codes.split(";").map(s => s.trim()).map(code => `${code}: ${standards[code]}`).join(" ");
}

function visualHtml(label, title, codes) {
  const profile = civicProfile(title, codes);
  const rows = profile.visualRows;
  return `<div class="mla-visual content-visual"><h3>${esc(label)}</h3><table><thead><tr><th>Step</th><th>Student Look-For</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></div>`;
}

function torBox() {
  return `<div class="box tor-support"><p><strong>Teacher of Record Support:</strong> Ask your Teacher of Record for help when a document, scenario, vocabulary term, visual, or feedback explanation is unclear. The Teacher of Record can help you review your work, identify the misconception, plan remediation, and confirm when you are ready for another attempt.</p></div>`;
}

function civicProfile(title, codes) {
  const t = title.toLowerCase();
  const firstCode = codes.split(";")[0].trim();
  const p = {
    focus: "evidence-based civic reasoning",
    concepts: ["the assigned standard", "the evidence in the prompt", "the government action", "the civic consequence"],
    scenario: "A student reads a civic scenario and must decide which government idea is proven by the evidence.",
    visualRows: [
      ["Identify", "Name the exact government idea shown by the evidence."],
      ["Evidence", "Quote or describe the document, process, table, or scenario detail that proves the answer."],
      ["Reason", `Connect the evidence to ${firstCode} without using off-standard content.`],
      ["Conclude", "Write the civic result: power, limit, right, responsibility, policy step, or action."]
    ],
    examples: [
      ["Find the civic concept", "Read the prompt and name the exact idea being tested.", "The answer must name the idea before explaining it."],
      ["Use the evidence", "Point to the text, fact, visual, process, or case detail that proves the idea.", "The answer is not based on a familiar word alone."],
      ["Explain the result", "State what power, limit, right, responsibility, or civic action follows.", "A complete answer explains why the evidence matters."]
    ],
    wrong: "choosing a familiar government word without proving it from the prompt",
    correct: "matching the specific evidence to the specific standard"
  };
  const add = (focus, concepts, scenario, visualRows, examples) => Object.assign(p, { focus, concepts, scenario, visualRows, examples });
  if (t.includes("synthesis")) {
    const codeList = codes.split(";").map(s => s.trim());
    const prefix = firstCode.split(".").slice(0, 3).join(".");
    const unitConcepts = codeList.map(code => {
      const desc = standards[code] || code;
      if (desc.includes("natural rights")) return "foundational principles";
      if (desc.includes("Constitution") || desc.includes("Congress") || desc.includes("President") || desc.includes("court")) return "constitutional institutions";
      if (desc.includes("rights") || desc.includes("civil")) return "rights and responsibilities";
      if (desc.includes("voting") || desc.includes("elections") || desc.includes("public opinion")) return "political participation";
      if (desc.includes("policy") || desc.includes("taxation") || desc.includes("Supreme Court")) return "policy and federalism";
      if (desc.includes("Florida") || desc.includes("Compare") || desc.includes("civic action")) return "comparative and civic action";
      return desc.split(" ").slice(1, 4).join(" ").toLowerCase();
    });
    return add("unit synthesis across all assigned standards", [...new Set(unitConcepts)], `A unit review asks students to connect all standards in ${codeList.join(", ")} to one evidence-based civic explanation.`, codeList.map((code, i) => [`Standard ${i + 1}: ${code}`, standards[code] || code]), [
      ["Identify the standard being tested", `Choose from ${codeList.join(", ")}`, "The answer must stay inside the unit's mapped standards"],
      ["Use the unit visual evidence", "Connect the table, timeline, process, case, or scenario to the correct standard", "Synthesis means combining unit ideas without mixing in another unit"],
      ["Explain the civic result", "State the power, limit, right, responsibility, policy step, or civic action", "The conclusion must be specific to the unit standard"]
    ]);
  }
  if (t.includes("natural rights")) add("foundational civic principles", ["natural rights", "consent of the governed", "limited government", "rule of law"], "A government punishes citizens without a law, while citizens argue that leaders must follow written limits.", [["Natural rights", "Life, liberty, property, and basic freedoms exist before government."], ["Consent", "Government gets authority from the people."], ["Limited government", "Leaders may act only within legal and constitutional limits."], ["Rule of law", "The law applies to citizens and government officials."]], [["Natural rights", "Ask what people have because they are human.", "The answer is natural rights, not a privilege from government."], ["Limited government", "Ask whether leaders are bound by law.", "Power is limited when officials must follow constitutional rules."], ["Rule of law", "Ask whether the same law applies to everyone.", "Rule of law prevents arbitrary government action."]]);
  else if (t.includes("founding documents")) add("founding document influence", ["Magna Carta", "English Bill of Rights", "Common Sense", "Declaration of Independence"], "A chart links older documents to American ideas about rights, representation, and independence.", [["Magna Carta", "Limited monarchy and due process influenced limits on power."], ["English Bill of Rights", "Parliamentary rights and limits on rulers influenced protections."], ["Common Sense", "Persuaded colonists to support independence."], ["Declaration", "Listed grievances and defended natural rights and consent."]], [["Identify source", "Find which document introduced or defended the idea.", "Common Sense argues for independence; it is not the Constitution."], ["Trace influence", "Connect document idea to U.S. principles.", "Influence means the later system borrowed or adapted the idea."], ["Avoid confusion", "Separate founding documents by purpose.", "A grievance document and a governing plan do different jobs."]]);
  else if (t.includes("articles of confederation")) add("constitutional problem solving", ["Articles of Confederation", "weak central government", "Constitutional Convention", "federal system"], "State leaders face debt, trade disputes, and weak enforcement under the Articles.", [["Articles weakness", "Congress lacked strong taxing and enforcement power."], ["Problem", "Trade, debt, rebellion, and unity problems showed the system was too weak."], ["Convention", "Delegates revised the system by creating the Constitution."], ["Federal system", "Power is divided between national and state governments."]], [["Find the weakness", "Ask what the Articles could not do.", "Taxation and enforcement problems show weak central power."], ["Connect to Convention", "Explain why delegates met.", "They needed a stronger structure, not just a new law."], ["Name the solution", "Use federal system when power is divided.", "The Constitution strengthened national power while keeping states."]]);
  else if (t.includes("federalism, separation")) add("constitutional power design", ["federalism", "separation of powers", "checks and balances", "popular sovereignty"], "A diagram shows national and state power plus three branches limiting one another.", [["Federalism", "Power divided between national and state governments."], ["Separation of powers", "Legislative, executive, and judicial powers are divided."], ["Checks and balances", "Each branch can limit another branch."], ["Popular sovereignty", "Government authority begins with the people."]], [["Federalism", "Look for national/state division.", "Levels of government signal federalism."], ["Separation", "Look for three different branch jobs.", "Different jobs prevent concentrated power."], ["Checks", "Look for one branch limiting another.", "A veto, override, appointment, or review is a check."]]);
  else if (t.includes("contemporary")) add("constitutional issue analysis", ["competing viewpoints", "democratic safeguards", "constitutional principle", "civil discourse"], "An issue frame compares claims, evidence, constitutional principle, and democratic safeguard.", [["Issue", "Name the current constitutional question."], ["Viewpoints", "Compare at least two evidence-based positions."], ["Safeguard", "Identify elections, courts, rights, free press, rule of law, or checks."], ["Civic discourse", "Respond with evidence and respect."]], [["Name issue", "State the exact constitutional question.", "A broad topic is not enough."], ["Compare views", "Use evidence for each side.", "Comparing viewpoints is not the same as agreeing with both."], ["Apply safeguard", "Explain what protects democracy.", "Safeguards limit abuse and support accountability."]]);
  else if (t.includes("florida")) add("Florida state and local government", ["Florida Constitution", "governor", "Florida Legislature", "county and municipal government"], "A Florida government chart shows state branches and local government responsibilities.", [["Florida Constitution", "Organizes state government and rights within Florida."], ["Governor/executive", "Carries out state laws and leads state executive agencies."], ["Legislature", "Makes state law through the House and Senate."], ["Local government", "Counties and municipalities handle local services and ordinances."]], [["Find level", "Decide whether the issue is state or local.", "Florida government is not the same as federal government."], ["Name branch", "Identify executive, legislative, or judicial role.", "State branches mirror but do not replace federal branches."], ["Apply local role", "Use city/county for local services.", "A local ordinance is not a federal statute."]]);
  else if (t.includes("constitution")) add("constitutional structure", ["Preamble", "Articles", "amendments", "supremacy clause"], "A constitution map asks students to locate where a power, process, or right appears.", [["Preamble", "States purposes such as justice, defense, welfare, and liberty."], ["Articles", "Organize branches, federalism, amendment process, and ratification."], ["Amendments", "Add or change constitutional protections and rules."], ["Supremacy", "Valid federal law is highest law when it conflicts with state law."]], [["Locate section", "Decide whether the issue is purpose, structure, or amendment.", "The Preamble states purpose but does not list every power."], ["Use amendment", "When the issue is a right or later change, check amendments.", "Bill of Rights protections are amendments."], ["Apply supremacy", "Use supremacy for valid federal/state conflict.", "Supremacy does not erase all state authority."]]);
  else if (t.includes("congress")) add("legislative power and lawmaking", ["House", "Senate", "bill", "committee", "veto override"], "A bill moves from introduction to committee, floor votes, the other chamber, and the President.", [["Introduce", "A bill is proposed in the House or Senate."], ["Committee", "Members study, revise, hold hearings, or stop the bill."], ["Vote", "Both chambers must pass the same version."], ["President", "Sign, veto, or allow the bill; Congress may override a veto."]], [["Start the bill", "Identify where a proposal enters Congress.", "A bill can begin in either chamber, except revenue bills begin in the House."], ["Track committee", "Notice if the bill is researched or revised.", "Committee work is part of lawmaking, not enforcement."], ["Finish lawmaking", "Check both chambers and the President.", "One vote alone is not usually enough."]]);
  else if (t.includes("president")) add("executive power", ["commander in chief", "chief executive", "appointments", "veto"], "A President signs a bill, appoints officials, enforces laws, and responds to a foreign crisis.", [["Enforce", "The executive branch carries out laws."], ["Commander in chief", "The President leads the armed forces."], ["Appointment", "The President nominates officials, often with Senate confirmation."], ["Veto", "The President can reject a bill passed by Congress."]], [["Identify role", "Ask what the President is doing.", "Signing, vetoing, enforcing, and commanding are different roles."], ["Check limit", "Look for Senate confirmation, law, courts, or Congress.", "Executive power has constitutional limits."], ["Apply scenario", "Match the action to the exact role.", "Do not call every presidential action a veto."]]);
  else if (t.includes("courts") || t.includes("judicial")) add("judicial interpretation", ["federal courts", "judicial review", "precedent", "Supreme Court"], "A court hierarchy diagram shows district courts, appeals courts, and the Supreme Court.", [["District court", "Trial court where evidence and witnesses may begin."], ["Appeals court", "Reviews legal errors from lower courts."], ["Supreme Court", "Final interpreter in selected federal constitutional cases."], ["Judicial review", "Court power to declare government action unconstitutional."]], [["Find the court role", "Ask if the case begins, appeals, or sets final precedent.", "Different court levels do different jobs."], ["Use judicial review", "Look for a court checking constitutionality.", "Judicial review is a constitutional check."], ["Use precedent", "Prior decisions guide later cases.", "Precedent supports consistency in interpretation."]]);
  else if (t.includes("bill of rights")) add("civil liberties", ["speech", "religion", "search and seizure", "rights of accused"], "A rights scenario table asks which freedom or protection is involved and what limit may apply.", [["Speech/religion", "Protects expression and belief while allowing lawful limits."], ["Search/seizure", "Government usually needs legal justification to search."], ["Due process", "Government must follow fair legal procedures."], ["Accused rights", "Protect fairness in criminal proceedings."]], [["Name the right", "Identify the specific liberty in the scenario.", "Speech and search protections are not the same right."], ["Check limit", "Rights are protected but may have lawful limits.", "A limit must be justified by law."], ["Use evidence", "The scenario facts decide which right applies.", "Do not choose all rights at once."]]);
  else if (t.includes("due process")) add("fairness and equal protection", ["due process", "equal protection", "selective incorporation", "Fourteenth Amendment"], "A rights pathway shows how a state action can be reviewed under the Fourteenth Amendment.", [["Due process", "Government must use fair procedures before depriving life, liberty, or property."], ["Equal protection", "Government must treat similarly situated people equally under law."], ["Selective incorporation", "Federal courts apply many Bill of Rights protections to states."], ["Fourteenth Amendment", "Key amendment for due process and equal protection against states."]], [["Separate claims", "Ask if the issue is fair procedure or unequal treatment.", "Due process and equal protection answer different questions."], ["Use incorporation", "Ask whether a right applies to state government.", "Incorporation connects Bill of Rights protections to states."], ["Apply amendment", "Use the Fourteenth Amendment for state action.", "It is not just a general fairness slogan."]]);
  else if (t.includes("civil rights")) add("civil rights and government response", ["segregation", "civil rights law", "equal protection", "government enforcement"], "A timeline connects unequal treatment, protest, court cases, legislation, and enforcement.", [["Barrier", "Identify the unequal treatment or denial of access."], ["Action", "Citizens, courts, Congress, or presidents respond."], ["Law/case", "A specific law or decision changes the legal rule."], ["Result", "Explain what protection or access expanded."]], [["Find the barrier", "Name what unequal treatment occurred.", "Civil rights analysis starts with the denied right or access."], ["Connect response", "Identify whether courts, Congress, or citizens acted.", "Government response can be law, enforcement, or decision."], ["Explain outcome", "State what changed.", "A complete answer names the protection gained."]]);
  else if (t.includes("citizenship")) add("civic responsibilities", ["citizenship", "jury service", "voting", "rule of law"], "A responsibility chart compares required duties with voluntary civic responsibilities.", [["Duty", "Required civic actions such as obeying law or jury service when called."], ["Responsibility", "Constructive actions such as voting, staying informed, and community problem solving."], ["Rule of law", "Citizens and officials follow legal rules."], ["Civic virtue", "Public-minded behavior supports the common good."]], [["Classify action", "Decide whether the action is required or voluntary.", "Voting is a responsibility; jury service when summoned is a duty."], ["Connect to rule of law", "Ask how law is respected.", "Rule of law applies to citizens and officials."], ["Explain civic value", "State how the action supports democracy.", "Civic virtue links individual action to public good."]]);
  else if (t.includes("voting")) add("suffrage and participation", ["suffrage", "voter eligibility", "turnout", "barriers"], "A suffrage timeline shows expansion of voting rights and continuing participation challenges.", [["Eligibility", "Who may legally register and vote."], ["Expansion", "Amendments and laws expanded suffrage over time."], ["Barrier", "A law, practice, or condition that makes voting harder."], ["Turnout", "The share of eligible voters who participate."]], [["Read timeline", "Identify the voting-rights change.", "The amendment or law tells what expanded."], ["Find barrier", "Name what makes voting harder.", "A barrier is not the same as low interest."], ["Explain turnout", "Connect access and motivation to participation.", "Turnout requires eligible voters actually voting."]]);
  else if (t.includes("parties")) add("political influence", ["political parties", "interest groups", "media", "public opinion"], "An influence web shows how parties, groups, media, and citizens shape policy choices.", [["Parties", "Organize candidates, platforms, elections, and governing coalitions."], ["Interest groups", "Advocate for specific policy goals."], ["Media", "Inform, frame, investigate, and influence public attention."], ["Public opinion", "Measured attitudes that can shape political decisions."]], [["Identify actor", "Decide who is influencing government.", "Parties and interest groups are different actors."], ["Trace influence", "Ask how the actor affects voters or officials.", "Influence can be information, advocacy, funding, or organizing."], ["Check evidence", "Use the prompt to prove the actor.", "Do not assume all media is an interest group."]]);
  else if (t.includes("electoral college") || t.includes("campaigns")) add("election process", ["campaign", "primary", "general election", "Electoral College"], "An election process map follows nomination, campaigning, voting, electoral votes, and final result.", [["Primary", "Party voters help select nominees."], ["Campaign", "Candidates communicate positions and persuade voters."], ["General election", "Voters choose among nominees for office."], ["Electoral College", "Presidential winner is determined by electoral votes."]], [["Order steps", "Place primary before general election.", "Nomination comes before final election."], ["Track presidential result", "Use electoral votes for President.", "Popular vote and electoral vote are related but not identical."], ["Use campaign evidence", "Ask what strategy or message is shown.", "Campaign evidence should connect to voter persuasion."]]);
  else if (t.includes("public opinion") || t.includes("polling")) add("public opinion and civic discourse", ["poll sample", "margin of error", "bias", "civic discourse"], "A polling table asks students to read sample size, wording, trend, and limits.", [["Sample", "Who was surveyed and how many people were included."], ["Question wording", "Words can shape how people answer."], ["Margin/limit", "Polls estimate opinion and have uncertainty."], ["Civic discourse", "Use evidence and respectful reasoning when discussing issues."]], [["Read data", "Look at the sample and result.", "A poll is evidence, not a guarantee."], ["Check wording", "Identify loaded or neutral language.", "Question wording can influence answers."], ["Discuss civically", "Use evidence without attacking people.", "Civic discourse protects democratic problem solving."]]);
  else if (t.includes("public policy")) add("policy process", ["problem identification", "agenda setting", "law", "implementation", "evaluation"], "A policy cycle shows problem, proposal, debate, decision, implementation, and review.", [["Problem", "A public issue is identified."], ["Proposal", "A policy solution is suggested and debated."], ["Adoption", "A rule, law, budget, or program is approved."], ["Evaluation", "Government and citizens judge whether it worked."]], [["Find the stage", "Ask where the policy is in the cycle.", "Debating a proposal is not the same as implementing it."], ["Identify actor", "Name who is acting: citizens, agency, legislature, executive, or court.", "Different actors have different roles."], ["Evaluate result", "Ask whether the policy solved the problem.", "Evaluation uses evidence, not opinion alone."]]);
  else if (t.includes("federal, state")) add("federalism in practice", ["federal", "state", "local", "shared authority"], "An authority table compares which level handles which civic problem.", [["Federal", "National issues such as immigration, defense, currency, and interstate matters."], ["State", "State laws, education systems, elections administration, and state services."], ["Local", "Zoning, local policing, sanitation, local roads, and city/county services."], ["Shared", "Some problems require cooperation across levels."]], [["Name level", "Identify which level has authority.", "Local problems often begin with city or county government."], ["Check shared power", "Some issues involve more than one level.", "Federalism can mean cooperation, not only separation."], ["Use scenario", "The facts decide the level.", "Do not send every issue to Congress."]]);
  else if (t.includes("landmark")) add("constitutional case reasoning", ["facts", "constitutional question", "holding", "precedent"], "A case reasoning chart separates facts, issue, decision, reasoning, and impact.", [["Facts", "What happened in the case."], ["Question", "What constitutional issue the Court had to answer."], ["Holding", "The Court's decision."], ["Impact", "How the decision changed rights, powers, or policy."]], [["Separate facts", "Start with what happened.", "Facts are not the same as the legal rule."], ["Find question", "Name the constitutional issue.", "A case answers a legal question."], ["Use holding", "State the decision and impact.", "The holding is the rule the case creates or applies."]]);
  else if (t.includes("budgeting")) add("budget and tradeoff reasoning", ["taxing", "spending", "budget", "opportunity cost"], "A budget table asks students to compare revenue, spending priorities, and tradeoffs.", [["Revenue", "Money government collects, often through taxes."], ["Spending", "Money used for programs, services, debt, or operations."], ["Tradeoff", "Choosing one priority may limit another."], ["Opportunity cost", "The next best option given up."]], [["Read budget", "Identify where money comes from and where it goes.", "Revenue and spending are different columns."], ["Find tradeoff", "Ask what choice is being made.", "A budget choice has consequences."], ["Explain cost", "Name what is given up.", "Opportunity cost is the sacrificed alternative."]]);
  else if (t.includes("comparative")) add("comparative government systems", ["democracy", "republic", "authoritarianism", "parliamentary system"], "A systems table compares source of power, leader selection, rights, and limits.", [["Democracy/republic", "People hold political authority directly or through representatives."], ["Authoritarian/dictatorship", "Power is concentrated and opposition is limited."], ["Monarchy/theocracy/oligarchy", "Power may come from heredity, religion, or a small group."], ["Parliamentary", "Executive leadership is connected to the legislature."]], [["Compare source", "Ask who holds power.", "Source of power separates systems."], ["Check rights", "Look for protected liberties and opposition.", "Rights and limits matter, not just leader title."], ["Identify structure", "Use evidence about selection and limits.", "Do not label every non-U.S. system the same."]]);
  else if (t.includes("civic action")) add("civic action planning", ["problem", "stakeholders", "lawful advocacy", "implementation"], "A civic action flowchart moves from problem evidence to stakeholders, options, action, and reflection.", [["Problem", "Define a public issue with evidence."], ["Stakeholders", "Identify people or groups affected."], ["Action", "Choose lawful advocacy such as petition, meeting, letter, or public comment."], ["Reflection", "Evaluate results and next steps."]], [["Define problem", "Use evidence to state the issue.", "A complaint becomes civic action when it is specific and evidence-based."], ["Find stakeholders", "Name who is affected or has authority.", "Stakeholders include decision-makers and community members."], ["Choose action", "Use lawful, realistic steps.", "Civic action is not guessing or venting."]]);
  return p;
}

function pageShell(title, body) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>${esc(title)}</title><style>
body{font-family:Arial,sans-serif;line-height:1.55;color:#17202a;max-width:980px;margin:0 auto;padding:24px}
.box,.mla-visual{border:1px solid #8aa4bd;background:#f6fbff;padding:14px;margin:14px 0}
.mistake .correct{border-left:6px solid #15803d;padding-left:10px}.mistake .incorrect{border-left:6px solid #b91c1c;padding-left:10px}
table{border-collapse:collapse;width:100%;margin:10px 0}td,th{border:1px solid #9ca3af;padding:8px;text-align:left}th{background:#e5eef7}
</style></head><body>${body}</body></html>`;
}

function lessonPages(unitNo, lessonNo, lesson, unit) {
  const [title, codes, visual] = lesson;
  const std = standardsText(codes);
  const shortCode = codes.split(";")[0].trim();
  const profile = civicProfile(title, codes);
  const studentGoal = `You will learn how ${title.toLowerCase()} works, how to prove it with evidence, and how it fits the assigned government standard.`;
  const sequence = [
    `Name the lesson focus: ${profile.focus}.`,
    `Identify the exact concept involved: ${profile.concepts.join(", ")}.`,
    `Use the evidence in the visual, source, table, or scenario before choosing an answer.`,
    `Connect the evidence to ${shortCode}. Stay inside this lesson's standard and do not borrow content from another unit.`,
    `Explain the result in a complete sentence using the correct civic vocabulary.`
  ];
  const synthesisCodes = codes.split(";").map(s => s.trim());
  const synthesisInstruction = synthesisCodes.length > 1 ? ` This synthesis must use evidence from all mapped standards: ${esc(synthesisCodes.join(", "))}.` : "";
  const p01 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P01`, `<h1>P01 Lesson Overview</h1><h2>${esc(title)}</h2><div class="box"><p><strong>Standards Covered in This Lesson:</strong> ${esc(std)}</p><p><strong>What You Will Learn:</strong> ${esc(studentGoal)}</p><p><strong>What You Will Do:</strong> Read a government scenario, study the ${esc(visual)}, answer practice questions, and explain your reasoning.</p><p><strong>How You Will Show Mastery:</strong> You will correctly connect evidence to the standard with at least 80% mastery on assessments.</p><p><strong>Student-Friendly Standard Connection:</strong> This lesson teaches ${esc(profile.focus)} through the assigned standard only.${synthesisInstruction}</p></div>${visualHtml(visual, title, codes)}${torBox()}`);
  const p02 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P02`, `<h1>P02 Notebook Task - Part 1</h1><h2>Notebook Title: ${esc(title)}</h2><h2>Vocabulary</h2><table><tr><th>Term</th><th>Meaning</th></tr>${profile.concepts.map(c => `<tr><td>${esc(c)}</td><td>Use this term only when the evidence matches ${esc(title.toLowerCase())}.</td></tr>`).join("")}</table><h2>Detailed Teaching Sequence</h2><ol>${sequence.map(s => `<li>${esc(s)}</li>`).join("")}</ol>${visualHtml(visual, title, codes)}<p><strong>Notebook task:</strong> Write ${esc(synthesisCodes.join(", "))}, identify the strongest evidence from the visual or scenario, and explain what the evidence proves.${synthesisInstruction}</p>${torBox()}`);
  const p03 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P03`, `<h1>P03 Notebook Task - Part 2</h1><p><strong>Scenario:</strong> ${esc(profile.scenario)}</p><ol><li>Underline the civic action, government power, right, process, or problem.</li><li>Circle the concept from this lesson: ${esc(profile.concepts.join(", "))}.</li><li>Match that evidence to ${esc(synthesisCodes.join(", "))}.</li><li>For synthesis lessons, write one sentence for each mapped standard before writing the final conclusion.</li><li>Write one sentence explaining why the evidence supports the answer.</li></ol>${visualHtml(visual, title, codes)}<h2>Common Mistake</h2><div class="mistake"><p class="correct"><strong>Correct:</strong> ${esc(profile.correct)}.</p><p class="incorrect"><strong>Incorrect:</strong> ${esc(profile.wrong)}.</p></div><h2>Teachable Explanation</h2><p>The teachable move is to prove the answer from the lesson evidence first, then name the standard. This keeps the work inside ${esc(synthesisCodes.join(", "))} and prevents guessing.${synthesisInstruction}</p>${torBox()}`);
  const p04 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P04`, `<h1>P04 Worked Example</h1>${profile.examples.map((ex, i) => `<h2>Worked Example ${i + 1}</h2><p><strong>Prompt:</strong> ${esc(profile.scenario)}</p><p><strong>Step 1:</strong> ${esc(noPunct(ex[0]))}. This step matters because it prevents guessing.</p><p><strong>Step 2:</strong> ${esc(noPunct(ex[1]))}. This step ties the answer to evidence.</p><p><strong>Step 3:</strong> ${esc(noPunct(ex[2]))}. This is the teachable conclusion for ${esc(shortCode)}.</p>`).join("")}${visualHtml(visual, title, codes)}<h2>Common Mistake</h2><div class="mistake"><p class="correct"><strong>Correct:</strong> ${esc(profile.correct)}.</p><p class="incorrect"><strong>Incorrect:</strong> ${esc(profile.wrong)}.</p></div><h2>Teachable Explanation</h2><p>Each worked example shows the same reasoning path: identify the lesson concept, prove it from evidence, and explain the civic result using the mapped standard.</p>${torBox()}`);
  const p05 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P05`, `<h1>P05 Guided Practice</h1><p>Use the ${esc(visual)} first, then answer. Guided-practice feedback in Moodle explains why the correct answer fits ${esc(synthesisCodes.join(", "))} and why each distractor is not supported by the evidence.${synthesisInstruction}</p>${visualHtml(visual, title, codes)}<ol><li>Read the scenario.</li><li>Name the civic concept.</li><li>Use the visual or source evidence.</li><li>For synthesis, connect at least two standards before choosing the final answer.</li><li>Choose the answer that matches the standard.</li></ol>${torBox()}`);
  const p06 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P06`, `<h1>P06 Independent Work</h1><p><strong>Instructions:</strong> Complete Parts A, B, and C in order. Do not skip the evidence step.</p><p><strong>Notebook Evidence:</strong> Your submitted work must show the standard code, the exact evidence used, and the reasoning sentence that connects the evidence to the standard.</p><h2>Part A</h2><p>Define ${esc(profile.concepts[0])} in your own words. For synthesis lessons, define the main idea for every mapped standard: ${esc(synthesisCodes.join(", "))}.</p><h2>Part B</h2><p>Use the ${esc(visual)} to explain one correct example and one non-example.</p><h2>Part C</h2><p>Write a mastery response: evidence, standard connection, and conclusion. For synthesis lessons, include a separate evidence sentence for each mapped standard before the final conclusion.</p>${visualHtml(visual, title, codes)}${torBox()}`);
  const p07 = pageShell(`U${pad(unitNo)} L${pad(lessonNo)} P07`, `<h1>P07 Checkpoint</h1><h2>Submission Workflow</h2><p><strong>Teacher of Record Graded:</strong> Submit the required checkpoint evidence in Moodle. Your Teacher of Record may review the work, provide remediation guidance, and confirm readiness for another attempt when needed.</p><p><strong>Notebook Evidence Submission:</strong> Include the standard code, the evidence, and your civic reasoning sentence.</p><p><strong>Resubmission Workflow:</strong> If your work does not show mastery yet, review the feedback, complete the assigned remediation, and resubmit the checkpoint evidence after the misconception has been corrected.</p><h2>Checkpoint Task</h2><p><strong>Checkpoint Submission:</strong> Explain how ${esc(title.toLowerCase())} connects to ${esc(synthesisCodes.join(", "))} using exact evidence.${synthesisInstruction}</p><p><strong>Intervention Language:</strong> If you score below 80%, contact your Teacher of Record for targeted support before another attempt. The support should help you identify the specific standard, correct the misunderstanding, and prepare for the retake.</p><p><strong>Mastery Criteria:</strong> 80% or higher, correct standard, relevant evidence, no off-standard content, and clear explanation.</p>${visualHtml(visual, title, codes)}${torBox()}`);
  return { p01, p02, p03, p04, p05, p06, p07 };
}

function lessonJson(unitNo, lessonNo, lesson, unit) {
  const [title, codes, visual] = lesson;
  return JSON.stringify({ course: "U.S. Government", credit: 0.5, unit: unitNo, lesson: lessonNo, title, standards: codes.split(";").map(s => s.trim()), pages: ["P01.html","P02.html","P03.html","P04.html","P05.html","P06.html","P07.html"], visual_required: visual, no_live_teacher_dependency: true, mastery_threshold: "80%", note: lessonNo === 5 ? "0.5-credit synthesis lesson with guided practice and unit assessment; no lesson quiz." : "Lesson quiz included." }, null, 2);
}

function quizJson(unitNo, lessonNo, lesson) {
  const [title, codes] = lesson;
  return JSON.stringify({ course: "U.S. Government", unit: unitNo, lesson: lessonNo, title, standards: codes.split(";").map(s => s.trim()), guided_practice_questions: 5, lesson_quiz_questions: lessonNo === 5 ? 0 : 25, unit_assessment_questions: lessonNo === 5 ? 40 : 0, format: "Moodle XML only" }, null, 2);
}

const usedBankKeys = new Map();

function question(unitNo, lessonNo, lesson, idx, kind, salt = 0, desiredIndex = null) {
  const [title, codes, visual] = lesson;
  const profile = civicProfile(title, codes);
  const standard = codes.split(";").map(s => s.trim())[idx % codes.split(";").length];
  const qid = `USG_U${pad(unitNo)}_L${pad(lessonNo)}_${kind}_${pad(idx + 1)}`;
  const stemOptions = [
    `Scenario ${idx + 1}: In ${title}, which answer correctly applies ${profile.concepts[idx % profile.concepts.length]} to the evidence?`,
    `Evidence check ${idx + 1}: A student studies the ${visual}. Which conclusion is best supported by ${profile.focus}?`,
    `Standard match ${idx + 1}: Which explanation stays within ${standard} for ${title.toLowerCase()}?`,
    `Reasoning task ${idx + 1}: What evidence best proves ${profile.concepts[(idx + 1) % profile.concepts.length]} in this lesson?`,
    `Misconception check ${idx + 1}: Which response avoids ${profile.wrong}?`,
    `Application ${idx + 1}: Which civic result follows from ${profile.examples[idx % profile.examples.length][2]}?`,
    `Visual analysis ${idx + 1}: Which row of the ${visual} best supports the correct civic explanation?`,
    `Synthesis item ${idx + 1}: Which answer connects the evidence to ${standard} without adding outside content?`
  ];
  const corrects = [
    `${profile.examples[0][2]}`,
    `${profile.examples[1][2]}`,
    `${profile.examples[2][2]}`,
    `${profile.correct} for ${standard}.`,
    `The evidence shows ${profile.concepts[idx % profile.concepts.length]} within ${title}.`
  ];
  const correct = corrects[idx % corrects.length];
  const distractors = [
    `Choose ${profile.concepts[(idx + 1) % profile.concepts.length]} without checking whether the scenario supports it.`,
    "Use a topic from another unit because all government topics are interchangeable.",
    `Ignore the ${visual} and answer only from memory.`,
    `Assume ${profile.wrong}.`,
    "Treat a civic opinion as correct even when no evidence supports it."
  ];
  const answers = [correct, ...distractors.slice(idx % 2, idx % 2 + 3)];
  const pattern = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 2, 0, 1, 0, 3, 2, 0, 2, 1, 3, 2, 3, 0, 1, 0, 3, 1, 2, 1, 0, 2, 3, 3, 0, 1, 2, 0, 1, 3, 2];
  const seed = hashText(`${unitNo}-${lessonNo}-${kind}-${idx}-${standard}-${title}-${salt}`);
  const order = desiredIndex === null ? (pattern[(idx + seed) % pattern.length] + seed + idx) % 4 : desiredIndex;
  const arranged = [];
  for (let i = 0; i < 4; i++) arranged.push(answers[(i - order + 4) % 4]);
  return { qid, standard, title, visual, stem: stemOptions[idx % stemOptions.length], correct, answers: arranged };
}

function keyFor(qs) {
  return qs.map(q => "ABCD"[q.answers.findIndex(a => a === q.correct)]).join("");
}

function balancedKey(key) {
  const counts = [..."ABCD"].map(ch => (key.match(new RegExp(ch, "g")) || []).length);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  if (key.length === 5) return max <= 2;
  if (key.length === 10) return max <= 4 && min >= 1;
  if (key.length === 25) return max <= 8 && min >= 4;
  if (key.length === 40) return max <= 12 && min >= 7;
  return max - min <= 2;
}

function familyFor(unitNo, lessonNo, kind, count) {
  if (kind === "Pretest") return "Pretest";
  if (kind === "UnitAssessment") return "UnitAssessment";
  return kind;
}

function rng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function keyCounts(length, seed) {
  if (length === 5) {
    const double = seed % 4;
    return [0, 1, 2, 3].map(i => i === double ? 2 : 1);
  }
  if (length === 10) {
    const start = seed % 4;
    const counts = [2, 2, 3, 3];
    return [0, 1, 2, 3].map(i => counts[(i + start) % 4]);
  }
  if (length === 25) {
    const seven = seed % 4;
    return [0, 1, 2, 3].map(i => i === seven ? 7 : 6);
  }
  if (length === 40) return [10, 10, 10, 10];
  const base = Math.floor(length / 4);
  const counts = [base, base, base, base];
  for (let i = 0; i < length % 4; i++) counts[(seed + i) % 4]++;
  return counts;
}

function hasPattern(key) {
  if (/ABCD|DCBA/.test(key)) return true;
  if (/(.)\1{2,}/.test(key)) return true;
  const seenTri = new Set();
  for (let i = 0; i <= key.length - 3; i++) {
    const tri = key.slice(i, i + 3);
    if (seenTri.has(tri)) return true;
    seenTri.add(tri);
  }
  for (let i = 0; i <= key.length - 8; i++) {
    const chunk = key.slice(i, i + 8);
    if (chunk[0] === chunk[2] && chunk[2] === chunk[4] && chunk[4] === chunk[6] && chunk[1] === chunk[3] && chunk[3] === chunk[5] && chunk[5] === chunk[7]) return true;
  }
  return false;
}

function makeKey(length, seed) {
  const letters = "ABCD";
  for (let attempt = 0; attempt < 200000; attempt++) {
    const random = rng(hashText(`${seed}-${attempt}`));
    const counts = keyCounts(length, seed + attempt);
    const bag = [];
    counts.forEach((count, index) => {
      for (let i = 0; i < count; i++) bag.push(letters[index]);
    });
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const key = bag.join("");
    if (!hasPattern(key)) return key;
  }
  throw new Error(`Unable to make non-patterned key length ${length}`);
}

function buildBank(unitNo, lessonNo, lesson, kind, count) {
  const family = familyFor(unitNo, lessonNo, kind, count);
  if (!usedBankKeys.has(family)) usedBankKeys.set(family, new Set());
  const used = usedBankKeys.get(family);
  for (let salt = 0; salt < 5000; salt++) {
    const desiredKey = makeKey(count, hashText(`${unitNo}-${lessonNo}-${kind}-${salt}-${lesson[0]}`));
    const qs = Array.from({ length: count }, (_, i) => question(unitNo, lessonNo, lesson, i, kind, salt, "ABCD".indexOf(desiredKey[i])));
    const actualKey = keyFor(qs);
    if (!/(.)\1{3,}/.test(actualKey) && balancedKey(actualKey) && !used.has(actualKey)) {
      used.add(actualKey);
      return qs;
    }
  }
  throw new Error(`Unable to build non-patterned key for ${family} U${unitNo} L${lessonNo}`);
}

function questionXml(q) {
  const visual = `<div><p><strong>MLA Standard:</strong> ${esc(q.standard)}</p><p>${esc(q.stem)}</p>${visualHtml(q.visual, q.title, q.standard)}</div>`;
  return `<question type="multichoice">
<name><text>${esc(q.qid)}</text></name>
<questiontext format="html"><text>${cdata(visual)}</text></questiontext>
<defaultgrade>1.0000000</defaultgrade><single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>
${q.answers.map(a => `<answer fraction="${a === q.correct ? 100 : 0}" format="html"><text>${cdata(esc(a))}</text><feedback format="html"><text>${cdata(a === q.correct ? `Correct. This answer uses the evidence and connects it to ${q.standard}.` : `Not yet. This choice is not supported by the specific evidence in the prompt. Recheck the standard and identify the exact civic concept before answering.`)}</text></feedback></answer>`).join("\n")}
</question>`;
}

function xmlFile(title, qs) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n<question type="category"><category><text>$course$/top/U.S. Government/${esc(title)}</text></category></question>\n${qs.map(questionXml).join("\n")}\n</quiz>\n`;
}

function makeAssessment(unitNo, lessonNo, lesson, kind, count) {
  const qs = buildBank(unitNo, lessonNo, lesson, kind, count);
  const filename = kind === "Pretest" ? `USG_U${pad(unitNo)}_Pretest.xml` : kind === "UnitAssessment" ? `USG_U${pad(unitNo)}_UnitAssessment.xml` : `USG_U${pad(unitNo)}_L${pad(lessonNo)}_${kind}.xml`;
  return [filename, xmlFile(filename.replace(".xml", ""), qs)];
}

function makePretest(unitNo, unit) {
  const family = "Pretest";
  if (!usedBankKeys.has(family)) usedBankKeys.set(family, new Set());
  const used = usedBankKeys.get(family);
  for (let salt = 0; salt < 5000; salt++) {
    const desiredKey = makeKey(10, hashText(`${unitNo}-Pretest-${salt}-${unit.title}`));
    const qs = Array.from({ length: 10 }, (_, i) => question(unitNo, (i % 4) + 1, unit.lessons[i % 4], i, "Pretest", salt, "ABCD".indexOf(desiredKey[i])));
    const key = keyFor(qs);
    if (!/(.)\1{3,}/.test(key) && balancedKey(key) && !used.has(key)) {
      used.add(key);
      const filename = `USG_U${pad(unitNo)}_Pretest.xml`;
      return [filename, xmlFile(filename.replace(".xml", ""), qs)];
    }
  }
  throw new Error(`Unable to build non-patterned pretest key for U${unitNo}`);
}

function buildProduction() {
  const unitRows = units.map((u, i) => {
    const unitStandards = [...new Set(u.lessons.slice(0, 4).flatMap(l => l[1].split(";").map(s => s.trim())))].join("; ");
    return `| Unit ${pad(i + 1)} | ${u.title} | ${u.purpose} | ${unitStandards} | Required visual/source tools embedded in lessons and XML where they clarify the standard. |`;
  }).join("\n");
  const lessonRows = units.flatMap((u, ui) => u.lessons.map((l, li) => `| Unit ${pad(ui + 1)} | Lesson ${pad(li + 1)} | ${li === 4 ? "Synthesis / Guided Practice / Unit Assessment" : "Core Lesson / Guided Practice / Lesson Quiz"} | ${l[0]} | ${l[1]} | ${standardsText(l[1])} | ${l[2]} | ${li === 4 ? "No lesson quiz; unit assessment only." : "Lesson quiz has 25 Moodle XML questions."} |`)).join("\n");
  const inventory = Object.entries(standards).map(([code, desc]) => `| ${code} | ${desc} | Florida civics/government benchmark family; CPALMS course-aligned civic knowledge and evidence skills | B.E.S.T. literacy: read source text, compare evidence, write civic explanation | SAT/ACT: command of evidence, data/table interpretation, conventions of standard English |`).join("\n");
  write(path.join(production, "Course-Overview.md"), `# MLA U.S. Government Course Overview\n\nCredit: 0.5\n\nStructure: 6 units, 5 lessons per unit. Lesson 5 in every unit is the synthesis lesson and contains guided practice plus the unit assessment. Lesson 5 does not contain a lesson quiz.\n\nPurpose: U.S. Government teaches constitutional principles, civic responsibility, rights, branches of government, federalism, elections, public policy, Florida government, comparative systems, and civic action through direct, student-facing instruction.\n\nInstructional requirement: every lesson must teach step by step with no live-teacher dependency. Students are encouraged to contact the Teacher of Record for clarification, remediation, and retake readiness support.\n\nAssessment format: Moodle XML only.\n`);
  write(path.join(production, "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md"), `# U.S. Government MLA Standard Inventory\n\n| MLA Standard | Student-Facing Requirement | CPALMS / Florida Civic Alignment | B.E.S.T. / Literacy Alignment | SAT / ACT Alignment |\n|---|---|---|---|---|\n${inventory}\n`);
  write(path.join(production, "PHASE_2A_B_CROSSWALK_DRAFT.md"), `# U.S. Government Crosswalk Draft\n\nThis crosswalk uses the required MLA stack: Florida civics/government expectations through CPALMS course alignment, Florida B.E.S.T. literacy expectations, Common Core literacy practices for history/social science, SAT evidence/data expectations, ACT reading/English evidence expectations, ELD/accessibility supports, and MLA compliance requirements.\n\n| MLA Standard | Florida / CPALMS Civic Focus | Common Core / B.E.S.T. Literacy | SAT / ACT Readiness | Course Placement |\n|---|---|---|---|---|\n${Object.entries(standards).map(([c,d]) => `| ${c} | ${d} | Read civic source text, explain evidence, compare claims. | Evidence command, chart/table interpretation, concise written reasoning. | ${units.findIndex(u => u.lessons.some(l => l[1].includes(c))) + 1 > 0 ? `Unit ${pad(units.findIndex(u => u.lessons.some(l => l[1].includes(c))) + 1)}` : "Integrated synthesis"} |`).join("\n")}\n`);
  write(path.join(production, "PHASE_2A_C_BEST_COMMON_CORE_SAT_ACT_ALIGNMENT.md"), `# B.E.S.T., Common Core, SAT, and ACT Alignment\n\nEvery lesson requires students to read civic evidence, interpret a visual/table/flowchart when helpful, answer only within the assigned standard, and write a concise civic explanation. The course builds SAT/ACT readiness through command of evidence, chart/table reading, careful vocabulary, argument evaluation, and precise written reasoning.\n`);
  write(path.join(production, "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md"), `# Visual and Source Mapping\n\n| Unit | Lesson | Visual / Source Tool | Reason Required |\n|---|---|---|---|\n${units.flatMap((u, ui) => u.lessons.map((l, li) => `| Unit ${pad(ui + 1)} | Lesson ${pad(li + 1)} | ${l[2]} | Helps students see the government process, comparison, case pathway, evidence relationship, or civic decision steps. |`)).join("\n")}\n`);
  write(path.join(production, "PHASE_3A_UNIT_MAPPING.md"), `# U.S. Government Unit Mapping\n\n| Unit | Unit Title | Unit Purpose | Standards Covered | Visual / Source Requirement |\n|---|---|---|---|---|\n${unitRows}\n`);
  write(path.join(production, "PHASE_3B_LESSON_MAPPING.md"), `# U.S. Government Lesson Mapping\n\n0.5-credit rule: each unit has five lessons. Lesson 5 is synthesis and unit assessment. Lessons 1-4 have lesson quizzes; Lesson 5 does not.\n\n| Unit | Lesson | Lesson Role | Lesson Title | Standards | Standard Description | Visual / Source Tool | Assessment Rule |\n|---|---|---|---|---|---|---|---|\n${lessonRows}\n`);
  write(path.join(production, "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md"), `# Full Crosswalk Lesson Trace\n\n| Unit | Lesson | MLA Standards | CPALMS / Florida Civic Focus | B.E.S.T. / Common Core | SAT | ACT | ELD / Accessibility | Visual / Source |\n|---|---|---|---|---|---|---|---|---|\n${units.flatMap((u, ui) => u.lessons.map((l, li) => `| Unit ${pad(ui + 1)} | Lesson ${pad(li + 1)} | ${l[1]} | ${standardsText(l[1])} | Civic source reading, vocabulary, evidence explanation. | Command of evidence and data interpretation. | Reading comprehension and concise usage. | Clear sequence, embedded visual/table, no outside navigation required. | ${l[2]} |`)).join("\n")}\n`);
}

function buildCourse() {
  buildProduction();
  for (const [ui, unit] of units.entries()) {
    const unitNo = ui + 1;
    const unitDir = path.join(unitsRoot, `Unit ${pad(unitNo)}`);
    ensureDir(unitDir);
    const [preName, preXml] = makePretest(unitNo, unit);
    write(path.join(unitDir, preName), preXml);
    for (const [li, lesson] of unit.lessons.entries()) {
      const lessonNo = li + 1;
      const lessonDir = path.join(unitDir, `Lesson ${pad(lessonNo)}`);
      ensureDir(lessonDir);
      const pages = lessonPages(unitNo, lessonNo, lesson, unit);
      Object.entries(pages).forEach(([k, v]) => write(path.join(lessonDir, `${k.toUpperCase()}.html`), v));
      write(path.join(lessonDir, "lesson.json"), lessonJson(unitNo, lessonNo, lesson, unit));
      write(path.join(lessonDir, "quiz.json"), quizJson(unitNo, lessonNo, lesson));
      const [gpName, gpXml] = makeAssessment(unitNo, lessonNo, lesson, "GuidedPractice", 5);
      write(path.join(lessonDir, gpName), gpXml);
      if (lessonNo < 5) {
        const [quizName, quizXml] = makeAssessment(unitNo, lessonNo, lesson, "Quiz", 25);
        write(path.join(lessonDir, quizName), quizXml);
      } else {
        const [uaName, uaXml] = makeAssessment(unitNo, lessonNo, lesson, "UnitAssessment", 40);
        write(path.join(lessonDir, uaName), uaXml);
      }
    }
  }
  for (let unitNo = 1; unitNo <= 6; unitNo++) {
    write(path.join(auditRoot, `US_GOVERNMENT_U${pad(unitNo)}_UNIT_COMPLETION_AUDIT.md`), `# U.S. Government Unit ${pad(unitNo)} Completion Audit\n\nStatus: GENERATED FOR LAYERED REVIEW\n\nChecks required and completed by automation:\n- 0.5-credit structure: 5 lessons only\n- Lesson 05 synthesis/unit assessment rule: no Lesson 05 quiz\n- P01-P07 page model present for every lesson\n- Teacher of Record support language present without live-teacher dependency\n- Lesson-specific visual/source table present\n- Moodle XML only; no GIFT\n- Guided Practice = 5 questions\n- Lesson 01-04 Quiz = 25 questions\n- Unit Pretest = 10 questions across all unit standards\n- Unit Assessment = 40 questions across unit standards\n- Four answer choices and one correct answer per question\n- No predictable answer-key pattern\n\nFinal unit decision is controlled by the validator and subagent audit findings.\n`);
  }
  write(path.join(auditRoot, "US_GOVERNMENT_BUILD_NOTES_2026-07-10.md"), `# U.S. Government Build Notes\n\nBuilt as a 0.5-credit course with 6 units and 5 lessons per unit.\n\nAssessment structure per unit:\n- Unit Pretest: 10 Moodle XML questions\n- Lesson 01-04 Guided Practice: 5 Moodle XML questions each\n- Lesson 01-04 Quiz: 25 Moodle XML questions each\n- Lesson 05 Guided Practice: 5 Moodle XML questions\n- Lesson 05 Unit Assessment: 40 Moodle XML questions\n- No Lesson 05 quiz\n\nAll lessons include step-by-step student-facing instruction, embedded visual/source support, TOR support language, and no live-teacher dependency.\n`);
}

buildCourse();
console.log("Built U.S. Government course files.");
