const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const production = path.join(root, "Course Production");
const unitsRoot = path.join(root, "Units");
const lessonMapPath = path.join(production, "PHASE_3B_LESSON_MAPPING.md");
const tracePath = path.join(production, "PHASE_3C_FULL_CROSSWALK_LESSON_TRACE.md");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sentenceStem(s) {
  return String(s ?? "").replace(/[.?!]\s*$/, "");
}

function cleanSentence(s) {
  return polishText(sentenceStem(s));
}

function lowerLead(s) {
  const value = cleanSentence(s);
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function polishText(s) {
  return String(s ?? "")
    .replace(/\s+/g, " ")
    .replace(/\.\./g, ".")
    .replace(/\bholocaust\b/g, "Holocaust")
    .replace(/\bnuremberg\b/g, "Nuremberg")
    .replace(/\bunited nations\b/g, "United Nations")
    .replace(/\bcold war\b/g, "Cold War")
    .replace(/\bred scare\b/g, "Red Scare")
    .replace(/\bkorean war\b/g, "Korean War")
    .replace(/\bvietnam war\b/g, "Vietnam War")
    .replace(/\bworld war i\b/g, "World War I")
    .replace(/\bworld war ii\b/g, "World War II")
    .replace(/\bsupreme court\b/g, "Supreme Court")
    .replace(/\bkennedy Space Center\b/g, "Kennedy Space Center")
    .replace(/\bcuban migration\b/g, "Cuban migration")
    .replace(/\beverglades restoration\b/g, "Everglades restoration")
    .trim();
}

function lowerFirst(s) {
  const text = cleanSentence(s);
  return text ? text[0].toLowerCase() + text.slice(1) : text;
}

function studentFacing(s) {
  return polishText(s)
    .replace(/^Students analyze\b/i, "You will analyze")
    .replace(/^Students evaluate\b/i, "You will evaluate")
    .replace(/^Students explain\b/i, "You will explain")
    .replace(/^Students connect\b/i, "You will connect")
    .replace(/^Students compare\b/i, "You will compare")
    .replace(/^Students examine\b/i, "You will examine")
    .replace(/^Students identify\b/i, "You will identify")
    .replace(/^Students review\b/i, "You will review")
    .replace(/^Students trace\b/i, "You will trace")
    .replace(/^Students synthesize\b/i, "You will synthesize")
    .replace(/\bStudents analyze\b/g, "You will analyze")
    .replace(/\bStudents evaluate\b/g, "You will evaluate")
    .replace(/\bStudents explain\b/g, "You will explain")
    .replace(/\bStudents connect\b/g, "You will connect")
    .replace(/\bStudents compare\b/g, "You will compare")
    .replace(/\bStudents examine\b/g, "You will examine")
    .replace(/\bStudents identify\b/g, "You will identify")
    .replace(/\bStudents review\b/g, "You will review")
    .replace(/\bStudents trace\b/g, "You will trace")
    .replace(/\bStudents synthesize\b/g, "You will synthesize")
    .replace(/\bStudents should\b/g, "You should")
    .replace(/\bstudents should\b/g, "you should")
    .replace(/\bstudents must\b/g, "you must")
    .replace(/\bhelp students\b/g, "help you")
    .replace(/\bthe student\b/g, "you")
    .replace(/\bThe student\b/g, "You");
}

function shortLabel(text, fallback) {
  const clean = cleanSentence(text)
    .replace(/^The\s+/i, "")
    .replace(/^A\s+/i, "")
    .replace(/^An\s+/i, "");
  const words = clean.split(/\s+/).filter(Boolean).slice(0, 4);
  return words.length ? words.join(" ") : fallback;
}

function assessmentSequence(profile) {
  const evidence = profile.sequence.filter((entry) => !/^(A strong answer|Do not|Use the required|Name the historical setting|Explain the consequence)/i.test(cleanSentence(entry)));
  return evidence.length >= 2 ? evidence : profile.sequence;
}

function cdataSafe(s) {
  return String(s ?? "").replace(/\]\]>/g, "]]]]><![CDATA[>");
}

function parseTable(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  return lines
    .filter((line) => /^\| Unit \d{2} \| Lesson \d{2} \|/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

const lessonRows = parseTable(lessonMapPath).map((cells) => ({
  unitLabel: cells[0],
  lessonLabel: cells[1],
  role: cells[2],
  title: cells[3],
  standards: cells[4],
  purpose: cells[5],
  visual: cells[6],
}));

const traceRows = parseTable(tracePath).map((cells) => ({
  unitLabel: cells[0],
  lessonLabel: cells[1],
  standards: cells[2],
  best: cells[3],
  commonCore: cells[4],
  sat: cells[5],
  act: cells[6],
  eld: cells[7],
  visual: cells[8],
}));

const traceByKey = new Map(traceRows.map((row) => [`${row.unitLabel}-${row.lessonLabel}`, row]));
const byUnit = new Map();
for (const row of lessonRows) {
  const unit = Number(row.unitLabel.match(/\d+/)[0]);
  const lesson = Number(row.lessonLabel.match(/\d+/)[0]);
  const trace = traceByKey.get(`${row.unitLabel}-${row.lessonLabel}`);
  if (!trace) throw new Error(`Missing trace for ${row.unitLabel} ${row.lessonLabel}`);
  const item = { ...row, ...trace, unit, lesson };
  if (!byUnit.has(unit)) byUnit.set(unit, []);
  byUnit.get(unit).push(item);
}

const unitNames = {
  1: "Evidence, Rights, Reconstruction, and Historical Memory",
  2: "Industrial America, Migration, Labor, and Reform",
  3: "Expansion, War, Culture, Rights, and Economic Crisis",
  4: "World War II, Rights, Justice, and Cold War Decision-Making",
  5: "Prosperity, Rights, Reform, and Trust",
  6: "Contemporary U.S. History and Evidence-Based Citizenship",
};

function contentProfile(item) {
  const t = item.title.toLowerCase();
  const defaultProfile = {
    anchor: `This lesson focuses on ${item.title}. You should identify the historical setting, the central issue, the evidence available, and the reason the issue matters in U.S. History.`,
    sequence: [
      `Connect the major issues from ${unitNames[item.unit]} to one clear historical question.`,
      "Identify the people, groups, institutions, or policies involved.",
      "Use the required visual/source stimulus to locate a pattern or conflict.",
      "Write the consequence or significance by naming the specific change, continuity, cause, effect, right, policy, region, or cultural issue.",
    ],
    evidence: "Use the required visual or source stimulus as the evidence base for the lesson.",
    confusion: "Do not confuse a familiar term with the full historical explanation. The answer must explain what the evidence proves.",
  };
  const cases = [
    [/world war i causes, mobilization/, {
      anchor: "This lesson explains why the United States entered World War I and how the federal government prepared the country for war. Students connect cause, mobilization, government power, and civil-liberties limits.",
      sequence: ["German submarine warfare, economic ties to the Allies, the Zimmermann Telegram, and concern for international security pushed the United States toward war.", "Mobilization required the Selective Service Act, military training, war industries, food and fuel conservation, and public messaging.", "The Committee on Public Information and wartime propaganda encouraged support for the war while shaping public opinion.", "The Espionage Act and Sedition Act showed that wartime preparation could create serious debates over free speech and civil liberties."],
      evidence: "The WWI cause-mobilization organizer should connect trigger, government action, home-front response, and civil-liberties consequence.",
      confusion: "Do not jump from World War I directly to the Great Depression. This lesson stays with causes of entry, mobilization, home-front preparation, and wartime government power.",
    }],
    [/demobilization, red scare/, {
      anchor: "This lesson explains how the end of World War I created economic uncertainty, labor unrest, fear of radicalism, immigration restriction, and foreign economic policy choices in the 1920s.",
      sequence: ["Demobilization meant shifting from wartime production and military service back to a peacetime economy, which created unemployment, inflation, and labor tensions.", "The Red Scare grew from fear of communism, anarchism, labor unrest, bombings, and the Russian Revolution.", "Nativism and immigration restriction increased as some Americans connected foreign-born people with radicalism or cultural change.", "Foreign economic policy in the 1920s included loans, debts, tariffs, and efforts to protect American economic interests after the war."],
      evidence: "The demobilization-to-policy timeline should connect postwar adjustment, fear, restriction, and economic policy.",
      confusion: "Do not confuse this post-World War I Red Scare with the Cold War Red Scare. This lesson focuses on the 1919-1920s reaction after World War I.",
    }],
    [/civil rights currents, kkk/, {
      anchor: "This lesson compares civil rights currents, resistance, racial violence, the Ku Klux Klan, the Great Depression, the New Deal, and Florida connections during the early twentieth century.",
      sequence: ["African Americans, women, immigrant communities, labor groups, and reformers pursued rights and opportunity while facing discrimination and violence.", "The Ku Klux Klan expanded in the 1920s by using racism, antisemitism, anti-Catholicism, nativism, intimidation, and political influence.", "The Great Depression created bank failures, unemployment, poverty, migration, and demands for federal action.", "The New Deal expanded federal responsibility through relief, recovery, and reform programs, but benefits and exclusions were uneven across groups and regions, including Florida."],
      evidence: "The rights-resistance and Depression/New Deal cause-effect table should connect group, barrier, economic pressure, federal response, and uneven consequence.",
      confusion: "Do not treat civil rights, the Klan, the Great Depression, and the New Deal as one simple topic. Compare how rights, resistance, economic crisis, and federal policy interacted.",
    }],
    [/atomic weapons|nuremberg|united nations|international justice/, {
      anchor: "This lesson examines the decisions and consequences that came at the end of World War II: atomic weapons, war-crimes trials, the United Nations, and the question of how nations should respond to mass violence and aggression.",
      sequence: ["The atomic bombing of Hiroshima and Nagasaki ended the war against Japan but created lasting debates about military necessity, civilian casualties, and nuclear weapons.", "The Nuremberg Trials established that leaders and military officials could be held responsible for war crimes and crimes against humanity.", "The United Nations was created to promote international cooperation, security, human rights, and peaceful conflict resolution after World War II.", "A strong answer weighs wartime decision-making, postwar justice, and international organization without treating any one decision as simple or consequence-free."],
      evidence: "The atomic decision/Nuremberg/UN consequence chart should connect decision, stated purpose, affected people, legal or diplomatic consequence, and long-term impact.",
      confusion: "Do not turn this into a general World War II causes lesson. The focus is wartime decisions, justice after the war, and postwar international organization.",
    }],
    [/red scare, early cold war|nuclear proliferation|early cold war/, {
      anchor: "This lesson connects domestic anticommunism, containment, alliance systems, and nuclear technology. Students should see how Cold War fear shaped both foreign policy and life inside the United States.",
      sequence: ["The early Cold War grew from conflict between the United States and Soviet Union over ideology, security, influence, and the future of Europe and Asia.", "Containment shaped policies such as the Truman Doctrine, Marshall Plan, NATO, and support for allies against communist expansion.", "The Red Scare and McCarthyism affected domestic policy by encouraging investigations, loyalty programs, accusations, and fears about communist influence.", "Nuclear proliferation created controversy because new weapons changed military planning, diplomacy, public fear, and debates over security versus risk."],
      evidence: "The Cold War cause-effect timeline should connect event, policy response, domestic effect, nuclear issue, and consequence.",
      confusion: "Do not confuse the post-World War I Red Scare with the early Cold War Red Scare. This lesson focuses on Cold War containment, domestic anticommunism, alliances, and nuclear technology.",
    }],
    [/korean war|cold war foreign policy/, {
      anchor: "This lesson studies the Korean War and presidential foreign policy from Truman through Nixon. Students should connect containment, limited war, alliances, military action, diplomacy, and changing presidential strategies.",
      sequence: ["The Korean War began after North Korea invaded South Korea, and the United States joined through United Nations action to support containment.", "The war became a limited war because U.S. leaders fought to stop communist expansion without starting a wider war with China or the Soviet Union.", "Presidents from Truman through Nixon used different Cold War tools, including military commitments, diplomacy, nuclear deterrence, alliances, covert action, and detente.", "A strong answer compares presidential policy choices by asking what problem each president faced, what tool was used, and what consequence followed."],
      evidence: "The presidential foreign policy table should compare president, Cold War problem, policy tool, region, and consequence.",
      confusion: "Do not replace the Korean War with World War II content. Keep the lesson focused on Korea and Cold War foreign policy from Truman through Nixon.",
    }],
    [/civil rights strategies|leaders, and organizations/, {
      anchor: "Civil rights activism used multiple strategies at the same time: court cases, boycotts, sit-ins, Freedom Rides, marches, voter registration drives, local organizing, media attention, and federal legislation.",
      sequence: ["The NAACP used litigation, including school desegregation cases, to challenge legal segregation through the courts.", "The Montgomery Bus Boycott showed how economic pressure, local organizing, and leadership could challenge segregation.", "SNCC, CORE, SCLC, and local activists used sit-ins, Freedom Rides, marches, and voter registration campaigns to force public attention and federal action.", "Civil rights leadership was not one person only; Martin Luther King Jr., Malcolm X, Rosa Parks, Ella Baker, John Lewis, Fannie Lou Hamer, and many local activists used different methods and goals."],
      evidence: "The civil rights strategy and leadership chart should compare organizations, leaders, methods, opposition, and outcomes.",
      confusion: "Do not reduce the civil rights movement to one speech or one leader. Compare strategy, organization, opposition, and result.",
    }],
    [/postwar prosperity/, {
      anchor: "Postwar prosperity after World War II expanded the middle class, suburbs, consumer spending, education, and home ownership, but the benefits were uneven across race, gender, class, and region.",
      sequence: ["The GI Bill, defense spending, highway construction, and expanding industries helped many families enter the middle class.", "Suburban growth changed housing, transportation, schools, shopping, and family life, but segregation and lending discrimination limited access for many African American families.", "Consumer culture grew through automobiles, appliances, television, advertising, and credit.", "A strong postwar prosperity answer must compare opportunity with inequality instead of saying everyone benefited equally."],
      evidence: "The postwar prosperity data comparison should compare income, housing, education, suburbanization, and unequal access.",
      confusion: "Do not describe the postwar era as equally prosperous for all Americans. The standard requires analysis of prosperity and social class.",
    }],
    [/women and 1960s presidential policies/, {
      anchor: "This lesson connects women's changing status to 1960s presidential policies. Students should examine work, education, family roles, feminism, civil rights law, and the policy goals of Kennedy, Johnson, and Nixon-era debates where relevant.",
      sequence: ["Women's roles changed as more women pursued education, paid work, public leadership, and legal equality, while many still faced discrimination and traditional expectations.", "The President's Commission on the Status of Women and the Equal Pay Act reflected federal attention to workplace inequality.", "The Civil Rights Act of 1964, especially Title VII, became a legal tool against sex discrimination in employment.", "1960s presidential policies such as the New Frontier and Great Society expanded federal action in civil rights, poverty, education, health care, and opportunity."],
      evidence: "The women/status timeline and presidential policy table should connect policy, year, goal, affected group, and impact.",
      confusion: "Do not answer this lesson with general civil rights details only. The focus is women's status and presidential policy in the 1960s.",
    }],
    [/coalitions, court decisions/, {
      anchor: "Rights coalitions and Supreme Court decisions shaped equal protection, due process, voting rights, school rights, criminal procedure, privacy, and civil liberties.",
      sequence: ["Coalitions bring groups together around shared goals even when they do not agree on every issue.", "Supreme Court decisions can expand, limit, or clarify rights by interpreting the Constitution.", "A case matrix should include the issue, constitutional question, decision, and impact.", "A strong answer explains how the decision or coalition changed rights, policy, or public action."],
      evidence: "The coalition and Supreme Court case matrix should compare issue, group, case, ruling, and effect.",
      confusion: "Do not name a court case without explaining the right or policy question it addressed.",
    }],
    [/social movements of the 1960s and 1970s/, {
      anchor: "Social movements of the 1960s and 1970s included civil rights, women's rights, Latino activism, Native American activism, environmentalism, antiwar activism, disability rights, and other reform efforts.",
      sequence: ["Each movement had a specific grievance, such as discrimination, unequal political power, environmental damage, war, or lack of legal protection.", "Movements used strategies such as protest, litigation, lobbying, direct action, public education, and coalition building.", "Opposition and backlash shaped how movements developed and how quickly policy changed.", "Outcomes included laws, court decisions, agencies, public awareness, and long-term debates."],
      evidence: "The social movement comparison table should compare goals, methods, opposition, and outcomes.",
      confusion: "Do not treat all movements as identical. Compare their goals, strategies, and results.",
    }],
    [/great society/, {
      anchor: "The Great Society extended some New Deal ideas by using federal policy to address poverty, education, health care, civil rights, urban problems, and inequality.",
      sequence: ["New Deal programs responded to the Great Depression with relief, recovery, reform, and expanded federal responsibility.", "Great Society programs included Medicare, Medicaid, education funding, anti-poverty programs, and civil rights enforcement.", "Supporters argued federal action could expand opportunity and reduce poverty; critics questioned cost, bureaucracy, and effectiveness.", "A strong answer evaluates both successes and limits using program goals and outcomes."],
      evidence: "The New Deal-Great Society comparison chart should compare problem, program, goal, method, and criticism.",
      confusion: "Do not say Great Society and New Deal are identical. They share federal activism but responded to different historical problems.",
    }],
    [/vietnam, watergate/, {
      anchor: "Vietnam and Watergate affected public trust by raising questions about war powers, honesty, protest, media, secrecy, executive power, and presidential accountability.",
      sequence: ["Vietnam divided Americans over containment, escalation, the draft, casualties, protest, and whether the war was justified.", "Television and journalism brought war images, official claims, and public criticism into American homes.", "Watergate involved political spying, cover-up, investigation, tapes, resignation, and distrust of executive power.", "Together, Vietnam and Watergate changed how many Americans viewed government credibility and presidential authority."],
      evidence: "The Vietnam-Watergate trust timeline should show event, government action, public reaction, and trust impact.",
      confusion: "Do not combine Vietnam and Watergate as the same issue. They affected trust in different but connected ways.",
    }],
    [/u\.s\. foreign policy in africa/, {
      anchor: "Regional U.S. foreign policy must be read with geography. The United States used diplomacy, military action, aid, trade, sanctions, alliances, and security policy differently across Africa, Asia, the Caribbean, Latin America, and the Middle East.",
      sequence: ["In Latin America and the Caribbean, U.S. policy involved Cuba, the Cold War, migration, trade, security, and debates over intervention.", "In the Middle East, U.S. policy involved oil, Israel and Arab states, the Persian Gulf, terrorism, military action, and diplomacy.", "In Asia, U.S. policy involved Korea, Vietnam, China, Japan, trade, alliances, and containment or post-Cold War security concerns.", "In Africa, U.S. policy involved decolonization, Cold War influence, apartheid opposition, humanitarian concerns, trade, and security partnerships."],
      evidence: "The regional foreign policy map/table must connect region, policy tool, historical context, and consequence.",
      confusion: "Do not treat all regions as the same. The same policy tool, such as aid or military action, can have different causes and consequences depending on the region.",
    }],
    [/late 20th and 21st century political/, {
      anchor: "Late twentieth- and twenty-first-century concerns include political polarization, economic change, technology, demographic change, environmental issues, civil liberties, public health, and debates over government's role.",
      sequence: ["Political concerns include party conflict, elections, public trust, rights debates, and the role of government.", "Economic concerns include globalization, recessions, inequality, labor change, technology, and consumer debt.", "Social concerns include demographic change, immigration, education, health care, environment, and cultural conflict.", "A strong answer connects the concern to a cause, affected group, and policy or social response."],
      evidence: "The contemporary concerns cause-effect chart should connect issue, cause, affected people, policy response, and consequence.",
      confusion: "Do not list modern issues without explaining cause and effect.",
    }],
    [/united states in the global economy/, {
      anchor: "The United States in the global economy involves trade agreements, international competition, outsourcing, labor change, technology, environmental concerns, and cultural diffusion.",
      sequence: ["Trade agreements and global markets can create lower prices and new markets while increasing competition for workers and businesses.", "Outsourcing and automation changed manufacturing, service work, wages, and regional economies.", "Environmental and labor concerns emerged when production crossed national borders.", "Cultural diffusion spread products, media, ideas, and practices across countries."],
      evidence: "The global economy data table should compare trade, labor, environment, competition, and cultural diffusion.",
      confusion: "Do not describe globalization as only good or only bad. Explain benefits, costs, and affected groups.",
    }],
    [/foreign and domestic terrorism/, {
      anchor: "Foreign and domestic terrorism affected American people, government policy, security practices, civil liberties debates, emergency response, and public life.",
      sequence: ["Domestic terrorism includes attacks carried out within the United States by individuals or groups connected to domestic causes, such as the Oklahoma City bombing.", "Foreign terrorism includes attacks connected to international networks or conflicts, such as the September 11 attacks.", "Government responses included security changes, intelligence efforts, emergency management, military action, and laws such as the USA PATRIOT Act.", "A strong answer explains both the human impact and the policy/civil-liberties debate that followed."],
      evidence: "The terrorism event-response timeline should include event, perpetrator/context, target, government response, public impact, and rights/security debate.",
      confusion: "Do not treat every act of violence as the same. Identify whether the question asks about domestic terrorism, foreign terrorism, response, or effect.",
    }],
    [/immigration policy and migration since 1950/, {
      anchor: "Immigration policy and migration since 1950 involved changing laws, push-pull factors, refugees, labor needs, family reunification, border debates, and attitudes toward immigrants.",
      sequence: ["Push factors include violence, poverty, political instability, disaster, and limited opportunity.", "Pull factors include jobs, family networks, safety, education, and political or religious freedom.", "Policy changes affected who could immigrate, how families reunified, how refugees were admitted, and how borders were enforced.", "Migration changed communities, labor markets, schools, politics, and cultural life."],
      evidence: "The immigration policy and migration flow chart should connect origin, destination, push factor, pull factor, policy, and impact.",
      confusion: "Do not confuse migration patterns with immigration policy. Patterns describe movement; policy describes rules and government decisions.",
    }],
    [/public policy, public health/, {
      anchor: "Public policy and public health regulation influence disease prevention, safety, access to care, community behavior, and government responsibility.",
      sequence: ["Public health policy can include vaccination rules, disease reporting, sanitation, food safety, tobacco regulation, emergency response, and health education.", "Government regulation tries to reduce risk and promote health, but it can also raise debates about cost, freedom, enforcement, and fairness.", "A policy impact organizer should identify the health problem, policy action, affected group, intended benefit, and possible concern.", "A strong answer evaluates how the policy influences health promotion or disease prevention."],
      evidence: "The public policy impact organizer should connect health issue, government action, evidence, affected people, and prevention outcome.",
      confusion: "Do not answer with personal opinion only. Public health policy must be evaluated using evidence about impact and prevention.",
    }],
    [/roaring twenties economy/, {
      anchor: "The Roaring Twenties combined economic growth, consumer culture, mass media, racial and cultural expression, and deep social tension. Students must explain both the prosperity and the conflict.",
      sequence: ["Consumer culture expanded through automobiles, radios, advertising, installment buying, and new expectations for leisure and modern life.", "The Harlem Renaissance used literature, music, art, and intellectual life to express African American identity, creativity, and resistance.", "Prohibition, fundamentalism, immigration restriction, nativism, and the Scopes Trial showed conflict over values and social change.", "The 1920s economy looked strong for many consumers, but uneven wealth, credit use, and speculation helped create vulnerability before the Great Depression."],
      evidence: "The 1920s culture and economy evidence chart should compare consumer culture, Harlem Renaissance, social tension, and economic weakness.",
      confusion: "Do not describe the 1920s as only fun or only conflict. The decade included prosperity, creativity, exclusion, and instability at the same time.",
    }],
    [/world war ii causes/, {
      anchor: "World War II causes and U.S. response require students to connect global aggression, isolationism, aid to Allies, Pearl Harbor, mobilization, and consequences for the United States and the world.",
      sequence: ["Axis aggression included Japanese expansion in Asia, Italian expansion in Africa, and Nazi expansion in Europe.", "The United States began with neutrality and isolationist pressure but increasingly supported Allies through policies such as Lend-Lease.", "Pearl Harbor moved the United States from support and preparation into direct war against Japan and then Germany and Italy.", "Mobilization changed the economy, labor, government power, military production, and the United States' role in global affairs."],
      evidence: "The WWII cause-response timeline should show aggression, U.S. neutrality/support, Pearl Harbor, mobilization, and global consequences.",
      confusion: "Do not treat U.S. entry as sudden with no background. Students need the sequence from global aggression to U.S. response.",
    }],
    [/world war i technology|world war i technology, service/, {
      anchor: "World War I changed warfare and the home front through new weapons, expanded government power, military service, propaganda, civil-liberties limits, treaty debates, and Florida wartime connections.",
      sequence: ["New technologies such as machine guns, poison gas, tanks, airplanes, submarines, and trench systems increased destruction and changed how war was fought.", "American service included the draft, the American Expeditionary Forces, African American soldiers, women in wartime roles, and support work on the home front.", "The home front involved liberty bonds, propaganda, rationing, war industries, the Espionage and Sedition Acts, and debates over civil liberties.", "The Treaty of Versailles and League of Nations debate showed disagreement over whether the United States should take a larger international role after the war."],
      evidence: "The weaponry/service/home-front/Treaty comparison chart should compare technology, service, home-front policy, treaty debate, and Florida wartime connections.",
      confusion: "Do not turn this into a 1920s or Great Depression lesson. This lesson stays with World War I technology, service, home front, treaty debate, and Florida connections.",
    }],
    [/vietnam war: causes|vietnam war/, {
      anchor: "The Vietnam War lesson traces escalation, containment, military strategy, public debate, protest, media coverage, and consequences for U.S. policy and public trust.",
      sequence: ["Containment and Cold War fears shaped U.S. involvement in Vietnam after French colonial rule ended and Vietnam was divided.", "Escalation grew through advisers, the Gulf of Tonkin Resolution, troop increases, bombing campaigns, and ground combat.", "The war created intense debate over the draft, casualties, protest, credibility, media coverage, and whether U.S. goals were achievable.", "Consequences included withdrawal, the War Powers debate, refugee issues, veterans' experiences, and long-term effects on public trust."],
      evidence: "The Vietnam escalation timeline and map should show Vietnam's location, division, escalation points, protest/public opinion, and consequences.",
      confusion: "Do not teach this as a general Cold War lesson. Keep the evidence tied to Vietnam escalation, debate, and consequences.",
    }],
    [/holocaust, rights, internment/, {
      anchor: "This lesson compares wartime policy and human rights by studying the Holocaust, expansion and contraction of rights, and Japanese American internment during World War II.",
      sequence: ["The Holocaust escalated from antisemitic laws and exclusion to ghettos, deportations, concentration camps, extermination camps, and genocide.", "Japanese American internment removed and confined many people of Japanese ancestry, including U.S. citizens, because of wartime fear, racism, and government policy.", "Rights can expand for some groups while contracting for others during war, which is why students must compare policy effects carefully.", "A strong answer explains both historical context and consequence instead of saying only that the decision was good or bad."],
      evidence: "The Holocaust escalation and rights-policy evidence table should compare targeted group, government action, stated justification, rights impact, and consequence.",
      confusion: "Do not collapse the Holocaust and internment into the same event. They are different historical cases, but both help students analyze government power, rights, and wartime policy.",
    }],
    [/florida in world war ii/, {
      anchor: "Florida's role in World War II and the Cold War connects state history to national military, economic, demographic, and strategic change.",
      sequence: ["During World War II, Florida's location and climate supported military training bases, airfields, naval activity, and wartime mobilization.", "The war brought population growth, defense jobs, and changes in Florida communities as military personnel and workers moved through the state.", "During the Cold War, Florida's location made it important for events connected to Cuba, the Caribbean, missiles, refugees, and national security.", "Florida examples must be connected back to national history, not treated as isolated local facts."],
      evidence: "The Florida-to-national-history evidence card should connect a Florida event, person, place, or policy to the broader national WWII or Cold War context.",
      confusion: "Do not list Florida facts without explaining the national connection. The standard requires connecting Florida to U.S. History.",
    }],
    [/florida history in contemporary/, {
      anchor: "Florida contemporary history connects state events and people to broader United States history through migration, civil rights, space exploration, environmental policy, tourism, elections, hurricanes, and national security.",
      sequence: ["Florida population growth changed political representation, housing, roads, schools, and the state's role in national elections.", "Kennedy Space Center and the Space Coast connected Florida to Cold War competition, science, technology, and national identity.", "Cuban migration, Haitian migration, Caribbean connections, and refugee debates tied Florida to immigration policy and foreign policy.", "Everglades restoration, hurricanes, tourism, and coastal development connected Florida to national environmental and emergency-management policy."],
      evidence: "The Florida contemporary history evidence card should name the Florida event/person/place, the national context, the evidence detail, and the U.S. History connection.",
      confusion: "Do not treat Florida examples as trivia. Every Florida detail must connect to a national trend, policy, conflict, or consequence.",
    }],
    [/historical inquiry|historiography|source reliability/, {
      anchor: "Historians do not accept every source at face value. They ask who created it, when it was created, why it was created, what perspective it shows, what it leaves out, and whether other evidence confirms it.",
      sequence: ["A political speech, newspaper article, photograph, law, court ruling, or personal account must be sourced by author, date, audience, and purpose.", "A Reconstruction newspaper and a later historian may describe the same event differently because they were created for different audiences.", "Bias is a limitation, but it can also reveal what a group feared, valued, or wanted readers to believe.", "Corroboration means checking one source against another source before treating the interpretation as reliable."],
      evidence: "The source reliability checklist and corroboration table show how a historian moves from source details to a defensible interpretation.",
      confusion: "A biased source can still be useful. The key is to explain what the bias reveals and what it cannot prove by itself.",
    }],
    [/timelines|visual evidence/, {
      anchor: "Timelines, images, maps, charts, and graphs help historians see relationships that may be hard to notice in paragraph form. Sequence helps reveal cause, effect, change, and continuity.",
      sequence: ["A timeline of Reconstruction, Jim Crow, imperialism, war, reform, or civil rights must be read by title and time span first.", "Events close together may show pressure building, such as economic panic before reform or wartime fear before rights restrictions.", "A political cartoon, map, chart, or photograph has symbols and categories that must be decoded before answering.", "A visual becomes evidence only when the student explains what pattern, contrast, or turning point it shows."],
      evidence: "The timeline and visual-evidence chart require students to connect sequence and representation to historical meaning.",
      confusion: "A timeline does not prove causation by itself. It shows order; the student must explain the relationship using evidence.",
    }],
    [/socio-cultural|american life/, {
      anchor: "Culture is evidence. Art, literature, music, education, newspapers, photographs, and artifacts reveal how people experienced and responded to historical change.",
      sequence: ["A song, painting, photograph, school textbook, newspaper, or novel can show how people understood a historical change.", "The Harlem Renaissance, wartime posters, civil rights music, and student publications show identity, resistance, and public persuasion.", "The creator's audience matters because art made for protest differs from art made for government messaging.", "Culture becomes historical evidence when it reveals values, conflict, identity, or response to a major event."],
      evidence: "The artifact/image/source interpretation table helps students treat culture as historical evidence instead of decoration.",
      confusion: "Culture is not separate from politics and economics. Cultural evidence often shows how ordinary people experienced those forces.",
    }],
    [/civil war causes/, {
      anchor: "The Civil War review is included only to support Reconstruction. Students need the causes and consequences that explain why reunification, citizenship, rights, and federal power became central after 1865.",
      sequence: ["Sectional conflict grew from slavery, economic differences, states' rights arguments, and competition over political power in new territories.", "Secession challenged whether the Union could survive when states rejected federal authority.", "Emancipation changed the war by making freedom a central Union purpose, not only reunion.", "The Union victory created Reconstruction questions about citizenship, voting rights, readmission, federal power, and protection for formerly enslaved people."],
      evidence: "The cause-consequence timeline shows how prewar conflict led to wartime change and postwar constitutional questions.",
      confusion: "Do not turn this into a full Civil War course. The purpose is to understand the foundation needed for Reconstruction.",
    }],
    [/reconstruction/, {
      anchor: "Reconstruction was the national effort to rebuild the Union, define citizenship, protect rights, and decide who would control the postwar South. It involved presidents, Congress, freedpeople, white Southerners, political parties, and constitutional amendments.",
      sequence: ["The 13th Amendment abolished slavery, but it did not by itself define citizenship or protect voting rights.", "The 14th Amendment defined birthright citizenship and equal protection after Southern states tried to limit freedpeople's rights.", "The 15th Amendment prohibited denying the vote based on race, color, or previous condition of servitude, but enforcement remained contested.", "Presidents, Radical Republicans, freedpeople, Southern Democrats, and white supremacist groups fought over how much the federal government should protect Reconstruction changes."],
      evidence: "The amendment and political-actor chart helps students connect people, parties, policies, and constitutional change.",
      confusion: "Do not list amendments without explaining what problem each amendment attempted to solve.",
    }],
    [/jim crow|black codes|sharecropping/, {
      anchor: "After Reconstruction, legal, economic, and social systems restricted African American freedom. Black Codes, Jim Crow laws, violence, disenfranchisement, segregation, and sharecropping limited rights and opportunity.",
      sequence: ["Black Codes tried to control freedpeople's labor, movement, and legal rights immediately after the Civil War.", "Jim Crow laws later enforced racial segregation in public life after Reconstruction protections weakened.", "Sharecropping often trapped families in debt because landowners controlled land, credit, supplies, and crop settlement.", "The Nadir describes the period of severe racial violence, disenfranchisement, segregation, and limited federal protection after Reconstruction."],
      evidence: "The comparison table shows that different systems worked together to limit freedom.",
      confusion: "Sharecropping was not the same as slavery, but it often trapped families in debt and limited real independence.",
    }],
    [/native american|western regions/, {
      anchor: "Western expansion involved federal policy, land pressure, military conflict, reservation systems, cultural assimilation, and resistance by Native nations. Geography matters because land, resources, railroads, and regional settlement shaped policy.",
      sequence: ["Great Plains pressure increased as railroads, mining, ranching, and farming expanded into Native homelands.", "Federal policy used treaties, reservations, military force, allotment, and assimilation programs such as boarding schools.", "Native nations such as the Lakota, Cheyenne, Nez Perce, Apache, and others resisted, negotiated, adapted, and experienced land loss in different regional contexts.", "Geography matters because the Plains, Southwest, Pacific Northwest, rail corridors, resource areas, and reservation boundaries shaped conflict and policy."],
      evidence: "The policy and region map helps students connect place to historical experience.",
      confusion: "Do not describe Native Americans as one identical group. Different nations had different locations, cultures, leaders, and responses.",
    }],
    [/labor movement|economic ideologies|political machines/, {
      anchor: "Labor movements, economic ideologies, and political machines developed because industrial growth created new conflicts over work, wages, safety, power, and political representation.",
      sequence: ["Workers organized unions and strikes in response to low wages, long hours, dangerous conditions, and limited bargaining power.", "Business leaders and workers often disagreed over laissez-faire ideas, regulation, socialism, capitalism, collective bargaining, and the role of government in the economy.", "Political machines traded services and jobs for votes, helping some immigrants and working-class residents while also encouraging corruption and patronage.", "A strong answer compares the problem, the group responding, the method used, and the consequence for workers, cities, business, or politics."],
      evidence: "The labor ideology and political-machine comparison table should connect problem, group, ideology or method, response, and consequence.",
      confusion: "Do not treat unions, economic ideologies, and political machines as the same thing. They are connected by industrial-era pressure, but each one answers a different problem.",
    }],
    [/progressive reform|florida connections/, {
      anchor: "Progressive reform grew from industrial and urban problems such as unsafe work, child labor, political corruption, monopoly power, poverty, unsafe food, and unequal access to power.",
      sequence: ["Progressives identified specific problems in cities, workplaces, business, government, and public health before proposing reforms.", "Reform methods included muckraking journalism, legislation, regulation, settlement houses, public campaigns, voting reforms, and court action.", "Florida Progressive connections should be tied to specific reform goals, local problems, or state-level political change instead of treated as unrelated state trivia.", "A strong answer names the problem, identifies the reform response, and explains what changed or what limitation remained."],
      evidence: "The Progressive reform matrix and Florida evidence card should connect problem, reformer or group, method, Florida connection, and result.",
      confusion: "Do not call every change progressive. A Progressive reform must connect to a specific social, political, economic, or public-health problem.",
    }],
    [/farmers|populism/, {
      anchor: "Farmers in the late 1800s faced debt, railroad rates, crop prices, currency debates, and political power struggles. Populism grew from economic pressure and demands for reform.",
      sequence: ["Farmers often faced falling crop prices, debt, high railroad shipping rates, and dependence on lenders.", "The Grange and Farmers' Alliances organized farmers to push for regulation and political change.", "Populists supported reforms such as railroad regulation, coinage of silver, direct election of senators, and a stronger voice for ordinary farmers and workers.", "Populism showed that economic hardship could become a national political movement even when every reform did not pass immediately."],
      evidence: "The farm economy cause-response chart helps students move from problem to political movement.",
      confusion: "Populism was not just anger. It was a political response to specific economic conditions.",
    }],
    [/industrial revolution|big business|inventors|innovation/, {
      anchor: "Industrialization changed production, transportation, communication, labor, cities, and wealth. Students must connect inventions and business practices to social consequences.",
      sequence: ["Steel, oil, railroads, electricity, the telephone, and mechanized production increased the speed and scale of American industry.", "Corporations, trusts, monopolies, vertical integration, and horizontal integration concentrated economic power.", "Industrial growth created cheaper goods and new jobs, but also unsafe workplaces, long hours, child labor, pollution, and inequality.", "Inventors and entrepreneurs changed daily life only when their innovations affected transportation, communication, production, or consumption."],
      evidence: "Industry, inventor, and impact charts show how technology reshaped economic and social life.",
      confusion: "Do not treat inventions as isolated trivia. Explain how each innovation changed daily life or economic power.",
    }],
    [/immigration|migration|cities/, {
      anchor: "Immigration and internal migration changed cities, labor markets, neighborhoods, politics, culture, and reform needs. Push factors drove people away; pull factors attracted them to new places.",
      sequence: ["Southern and Eastern European immigrants often entered through Ellis Island, while many Asian immigrants encountered Angel Island and exclusion laws on the West Coast.", "Push factors included poverty, persecution, famine, political unrest, and limited opportunity; pull factors included jobs, family networks, religious freedom, and political opportunity.", "Urban settlement patterns included ethnic neighborhoods, tenements, settlement houses such as Hull House, and political machines that traded services for votes.", "Nativism and restriction efforts grew as some Americans blamed immigrants for job competition, cultural change, religious difference, or urban problems."],
      evidence: "Maps and urban reform tables help students connect movement to social change.",
      confusion: "Migration is not just movement. It changes both the place people leave and the place they enter.",
    }],
    [/labor|political machines|progressive/, {
      anchor: "Labor conflict and Progressive reform grew from industrial problems: unsafe work, long hours, child labor, corruption, poverty, and unequal political power.",
      sequence: ["Workers organized unions and strikes in response to low wages, long hours, dangerous conditions, and limited bargaining power.", "Political machines traded services and jobs for votes, helping some immigrants while also encouraging corruption.", "Progressives targeted problems such as child labor, unsafe food, monopoly power, urban poverty, and political corruption.", "Florida Progressive connections should be tied to specific reform goals instead of treated as unrelated state trivia."],
      evidence: "Labor timelines, reform matrices, and political-machine charts help students compare problem, action, and outcome.",
      confusion: "A reform is not just a good idea. It must be connected to the specific problem it tried to fix.",
    }],
    [/imperialism|spanish-american|panama canal/, {
      anchor: "U.S. expansion overseas involved economic interests, strategic concerns, ideology, military action, and debate over empire. Students must explain motives and consequences, not only identify territories.",
      sequence: ["Economic motives included new markets, raw materials, investment opportunities, and access to trade routes.", "Strategic motives included naval bases, coaling stations, the Panama Canal route, and influence in the Caribbean and Pacific.", "Ideological motives included Social Darwinism, missionary arguments, nationalism, and belief in spreading American institutions.", "The Spanish-American War, annexation debates, and territorial acquisitions affected Cuba, Puerto Rico, Guam, the Philippines, Hawaii, and Panama in different ways."],
      evidence: "Maps, timelines, and motive tables show why location and strategy mattered.",
      confusion: "Expansion was debated. Do not assume every American supported imperialism.",
    }],
    [/world war i(?!i)|demobilization|great depression|new deal/, {
      anchor: "The early twentieth century connected war, government power, civil liberties, consumer culture, social tension, economic crisis, and reform. Students must track how one era's decisions shaped the next.",
      sequence: ["World War I involvement connected submarine warfare, economic ties, the Zimmermann Telegram, mobilization, propaganda, and limits on civil liberties.", "The Red Scare and nativism reflected fear of radicalism, immigration, labor unrest, and postwar instability.", "The 1920s combined consumer credit, automobiles, radio, advertising, Harlem Renaissance culture, Prohibition, fundamentalism, and social tension.", "The Great Depression and New Deal connected bank failure, unemployment, relief, recovery, reform, expanded federal power, and Florida experiences."],
      evidence: "Timelines and cause-effect tables help students connect war, culture, economic crisis, and reform.",
      confusion: "Do not separate culture from economics. The 1920s and 1930s show how prosperity, fear, inequality, and crisis interacted.",
    }],
    [/world war ii|holocaust|atomic|nuremberg|united nations|cold war|korean|vietnam|florida in world war ii/, {
      anchor: "World War II and the Cold War involved military decisions, civil liberties, genocide, international justice, alliances, containment, nuclear weapons, and public debate.",
      sequence: ["World War II causes included aggression by Axis powers, appeasement, invasion, isolationism, and the eventual U.S. response after Pearl Harbor.", "The Holocaust required examining antisemitism, Nazi policy escalation, ghettos, deportations, concentration and extermination camps, and international response.", "Japanese American internment showed how wartime fear and racism could restrict civil liberties even in a democracy.", "The Cold War involved containment, NATO, nuclear weapons, Korea, Vietnam, presidential foreign policy, dissent, and debates over national security."],
      evidence: "War timelines, policy tables, rights evidence, and maps help students connect decisions to consequences.",
      confusion: "Do not evaluate wartime decisions with one-word judgments. Explain the historical context and the consequences.",
    }],
    [/postwar|women|civil rights|coalitions|social movements|great society|watergate/, {
      anchor: "Postwar America included prosperity and inequality, civil rights activism, women's changing roles, social movements, government reform, and public distrust after Vietnam and Watergate.",
      sequence: ["Postwar prosperity expanded suburbs, consumer culture, education access, and the middle class, but benefits were unequal across race, gender, and class.", "Civil rights strategies included litigation, boycotts, sit-ins, freedom rides, marches, voter registration, coalition building, and federal legislation.", "Leaders and organizations such as Martin Luther King Jr., Malcolm X, Rosa Parks, SNCC, SCLC, CORE, NAACP, and local activists used different methods and goals.", "Vietnam and Watergate changed public trust by raising questions about government honesty, war powers, protest, media, and presidential accountability."],
      evidence: "Movement charts, court-case matrices, policy tables, and trust timelines help students compare goals, methods, and outcomes.",
      confusion: "Civil rights history is not one event or one leader. It includes many groups, strategies, institutions, and legal changes.",
    }],
    [/foreign policy|global economy|terrorism|immigration policy|public policy|public health|contemporary/, {
      anchor: "Contemporary U.S. History requires students to connect policy decisions to regional, economic, social, health, migration, and security consequences.",
      sequence: ["Late twentieth- and twenty-first-century foreign policy involved Africa, Asia, the Caribbean, Latin America, and the Middle East through diplomacy, military action, trade, aid, and security concerns.", "Globalization connected trade agreements, outsourcing, technology, labor competition, environmental concerns, cultural diffusion, and international markets.", "Terrorism and public safety policy involved events such as domestic terrorism, September 11, security legislation, civil liberties debates, and emergency response.", "Immigration and public policy debates connected push-pull factors, migration patterns, regulation, public health, disease prevention, government action, and community impact."],
      evidence: "Maps, data tables, event-response timelines, migration flow charts, and policy organizers help students evaluate modern issues with evidence.",
      confusion: "Contemporary does not mean opinion-only. Students still need historical evidence, policy context, and clear reasoning.",
    }],
  ];
  for (const [pattern, profile] of cases) {
    if (pattern.test(t)) return profile;
  }
  return defaultProfile;
}

const topicGuidance = [
  "Start by naming the time period, the people or groups involved, and the historical problem. This keeps the answer anchored before details are added.",
  "Read the standard as an action statement. Words such as analyze, explain, compare, evaluate, trace, and describe tell you what the response must do.",
  "Use the required stimulus before selecting an answer or writing a notebook response. Identify the title, time period, categories, and any pattern or contrast.",
  "Connect evidence to reasoning. A strong history answer does not only name a fact; it explains how that fact proves a claim about change, continuity, cause, effect, rights, geography, policy, or culture.",
  "Check the boundary. Stay inside this lesson's mapped standard and do not bring in later-unit material unless the lesson explicitly asks for review or synthesis.",
];

function standardsList(standards) {
  return standards.split(",").map((s) => s.trim()).filter(Boolean);
}

function supportTable(item) {
  return `<table><tr><th>Layer</th><th>How it is used in this lesson</th></tr>
<tr><td>Primary standards</td><td>${esc(item.standards)}</td></tr>
<tr><td>Florida B.E.S.T.</td><td>${esc(item.best)}</td></tr>
<tr><td>Common Core literacy</td><td>${esc(item.commonCore)}</td></tr>
<tr><td>SAT readiness</td><td>${esc(item.sat)}</td></tr>
<tr><td>ACT readiness</td><td>${esc(item.act)}</td></tr>
<tr><td>ELD/accessibility</td><td>${esc(item.eld)}</td></tr>
<tr><td>Required visual/source/stimulus</td><td>${esc(item.visual)}</td></tr></table>`;
}

function visualBlock(item, mode = "lesson") {
  const profile = contentProfile(item);
  const label = esc(item.visual);
  const lowerVisual = item.visual.toLowerCase();
  const isMap = /map|route|region|migration|flow/.test(lowerVisual);
  const isTimeline = /timeline|escalation|event-response|cause-response|status/.test(lowerVisual);
  const isMatrix = /matrix|comparison|chart|table|organizer|portfolio|card|evidence/.test(lowerVisual);
  const timelineSvg = isTimeline ? `<svg role="img" aria-label="${label} sequence visual" viewBox="0 0 900 260" width="100%" style="max-width:900px;border:1px solid #9fb3c8;background:#fffdfa;margin:10px 0">
  <rect x="0" y="0" width="900" height="260" fill="#fffdfa"/>
  <text x="24" y="34" font-size="20" font-weight="700" fill="#1f2933">${label}</text>
  <line x1="80" y1="126" x2="820" y2="126" stroke="#305f72" stroke-width="5"/>
  ${profile.sequence.map((s, i) => {
    const x = 110 + i * 220;
    const labelText = shortLabel(s, `Evidence ${i + 1}`);
    return `<circle cx="${x}" cy="126" r="14" fill="#2f855a"/><text x="${x - 58}" y="95" font-size="13" font-weight="700" fill="#1f2933">${esc(labelText).slice(0, 28)}</text><foreignObject x="${x - 70}" y="145" width="150" height="86"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.25;color:#1f2933">${esc(studentFacing(s)).slice(0, 135)}</div></foreignObject>`;
  }).join("")}
  <text x="30" y="238" font-size="14" fill="#465a69">Read left to right: context, pressure, turning point, consequence. Then explain why the sequence matters.</text>
</svg>` : "";
  const mapSvg = isMap ? `<svg role="img" aria-label="${label} with regions and movement evidence" viewBox="0 0 860 320" width="100%" style="max-width:860px;border:1px solid #9fb3c8;background:#fffdfa;margin:10px 0">
  <rect x="0" y="0" width="860" height="320" fill="#fffdfa"/>
  <text x="24" y="34" font-size="20" font-weight="700" fill="#1f2933">${label}</text>
  <rect x="48" y="78" width="180" height="82" fill="#eef6f8" stroke="#305f72" stroke-width="2"/>
  <text x="62" y="104" font-size="15" font-weight="700" fill="#1f2933">Origin / Region</text>
  <text x="62" y="132" font-size="13" fill="#1f2933">${esc(profile.sequence[0]).slice(0, 70)}</text>
  <path d="M235 120 C300 72, 370 72, 430 120" fill="none" stroke="#305f72" stroke-width="4"/>
  <polygon points="430,120 414,111 416,130" fill="#305f72"/>
  <rect x="440" y="78" width="180" height="82" fill="#f0fff4" stroke="#2f855a" stroke-width="2"/>
  <text x="454" y="104" font-size="15" font-weight="700" fill="#1f2933">Policy / Route</text>
  <text x="454" y="132" font-size="13" fill="#1f2933">${esc(profile.sequence[1]).slice(0, 70)}</text>
  <path d="M530 166 C540 220, 620 235, 690 205" fill="none" stroke="#b7791f" stroke-width="4"/>
  <polygon points="690,205 672,201 681,217" fill="#b7791f"/>
  <rect x="638" y="172" width="176" height="86" fill="#fffaf0" stroke="#b7791f" stroke-width="2"/>
  <text x="652" y="199" font-size="15" font-weight="700" fill="#1f2933">Impact / Destination</text>
  <text x="652" y="227" font-size="13" fill="#1f2933">${esc(profile.sequence[2]).slice(0, 68)}</text>
  <circle cx="280" cy="225" r="38" fill="#fff5f5" stroke="#c53030" stroke-width="2"/>
  <text x="248" y="221" font-size="13" font-weight="700" fill="#1f2933">Conflict</text>
  <text x="251" y="240" font-size="12" fill="#1f2933">${esc(profile.sequence[3]).slice(0, 44)}</text>
  <text x="34" y="294" font-size="14" fill="#465a69">Use this as a place-based reasoning map: identify location or origin, trace movement or policy, then explain impact.</text>
</svg>` : "";
  const visualHeaders = isTimeline
    ? ["Time / Sequence Point", "Event or Policy", "Why This Point Changes the Historical Explanation"]
    : isMap
      ? ["Place / Route / Region", "Historical Evidence", "Geographic or Policy Meaning"]
      : isMatrix
        ? ["Category", "Specific Evidence", "Historical Meaning"]
        : ["Historical Detail", "What to Notice", "How It Supports the Mapped Standard"];
  const rowLabels = isTimeline
    ? ["Beginning", "Escalation", "Turning Point", "Consequence"]
    : isMap
      ? ["Region 1", "Movement / Policy", "Affected People", "Consequence"]
      : isMatrix
        ? ["Context", "Evidence", "Response", "Significance"]
        : ["Detail 1", "Detail 2", "Detail 3", "Detail 4"];
  return `<section class="visual-box content-visual">
<h2>Instructional Visual: ${label}</h2>
<p><strong>How this visual teaches the lesson:</strong> ${esc(studentFacing(profile.evidence))} Use it to track the exact relationship the standard requires instead of treating the visual as decoration.</p>
${timelineSvg}${mapSvg}
<table>
<tr><th>${visualHeaders[0]}</th><th>${visualHeaders[1]}</th><th>${visualHeaders[2]}</th></tr>
${profile.sequence.map((s, i) => `<tr><td>${rowLabels[i] || `Evidence ${i + 1}`}</td><td>${esc(studentFacing(s))}</td><td>${esc(i === 0 ? studentFacing(profile.anchor) : i === 1 ? "This evidence shows the policy, group, action, or pressure that drives the lesson." : i === 2 ? "This evidence shows how people, government, geography, economics, rights, or culture responded." : "This evidence explains the consequence you must connect back to the standard.")}</td></tr>`).join("")}
</table>
<h3>How to Use This Visual</h3>
<ol><li>First, identify the historical context before making a claim.</li><li>Second, point to one exact visual or source detail.</li><li>Third, explain what the detail proves about the lesson purpose: ${esc(studentFacing(item.purpose))}</li><li>Finally, check that the explanation stays inside ${esc(item.standards)}.</li></ol>
${mode === "assessment" ? "" : `<p><strong>Student verification:</strong> If your explanation names a fact but does not explain what the fact proves, add one sentence beginning with "This matters because..."</p>`}
</section>`;
}

function torBox() {
  return `<section class="tor"><strong>Teacher of Record Support:</strong> If you have used the lesson steps, reviewed the examples, and are still unsure, contact your Teacher of Record with your notebook evidence and the exact step where you became confused.</section>`;
}

function pageShell(item, page, subtitle, body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>USH U${String(item.unit).padStart(2, "0")} L${String(item.lesson).padStart(2, "0")} ${page}</title><style>
body { font-family: Arial, sans-serif; color:#1f2933; line-height:1.55; margin:0; padding:0; background:#ffffff; }
.lesson-shell { max-width: 980px; margin:0 auto; padding:24px; }
.banner { border-left:6px solid #305f72; background:#eef6f8; padding:16px 18px; margin-bottom:18px; }
.banner h1 { margin:0 0 6px 0; font-size:28px; }
.tag { font-weight:bold; color:#305f72; }
.box { border:1px solid #cbd5df; border-radius:6px; padding:16px; margin:16px 0; background:#fbfdff; }
.teach { border-left:5px solid #2f855a; background:#f0fff4; padding:14px; margin:14px 0; }
.step { margin:10px 0; padding-left:8px; }
.visual-box { border:1px solid #7aa6b8; background:#f4fbfd; padding:14px; margin:16px 0; border-radius:6px; }
table { width:100%; border-collapse:collapse; margin:10px 0; }
th, td { border:1px solid #9fb3c8; padding:9px; vertical-align:top; }
th { background:#d9e8ef; }
.misconception { border:1px solid #d9dee8; border-radius:6px; overflow:hidden; margin:16px 0; }
.wrong { background:#fff5f5; border-left:6px solid #c53030; padding:12px; }
.right { background:#f0fff4; border-left:6px solid #2f855a; padding:12px; }
.tor { border:1px solid #b8c2cc; background:#f7fafc; padding:12px; border-radius:6px; margin-top:18px; }
ul, ol { padding-left:24px; }
</style></head><body><main class="lesson-shell">
<section class="banner"><div class="tag">${esc(subtitle)}</div><h1>${esc(item.title)}</h1><p><strong>Unit ${String(item.unit).padStart(2, "0")}:</strong> ${esc(unitNames[item.unit])}</p></section>
${body}
</main></body></html>
`;
}

function p01(item) {
  const friendlyTitle = polishText(item.title);
  return pageShell(item, "P01", "P01 Lesson Overview", `<section class="box"><h2>Lesson Title</h2><p>${esc(item.title)}</p></section>
<section class="box"><h2>Standards Covered in This Lesson</h2>${supportTable(item)}</section>
<section class="box"><h2>What You Will Learn</h2><p>${esc(studentFacing(item.purpose))}</p><p>You will learn how to move from historical context to evidence and then to an explanation that stays inside the mapped standards.</p></section>
<section class="box"><h2>What You Will Do</h2><ul><li>Build vocabulary in your notebook.</li><li>Analyze the required visual or source stimulus: ${esc(item.visual)}.</li><li>Practice reading evidence before answering.</li><li>Write short historical explanations that connect evidence to the standard.</li></ul></section>
<section class="box"><h2>How You Will Show Mastery</h2><p>You will show mastery by explaining the lesson concept with accurate vocabulary, using evidence from the visual/source stimulus, completing guided practice, and submitting a checkpoint response that is aligned to ${esc(item.standards)}.</p></section>
<section class="teach"><h2>Student-Friendly Standard Connection</h2><p>In student language: I can use historical evidence to explain ${esc(friendlyTitle)}. I can support my answer with details instead of guessing or giving a broad opinion.</p></section>
${torBox()}`);
}

function stepTeachingLine(item, step, index) {
  const profile = contentProfile(item);
  const specificChecks = [
    `Before making a claim, identify the time period and the exact historical problem in this lesson: ${item.title}.`,
    `Ask what changed, who was affected, and why this evidence belongs to the mapped standard instead of a different unit.`,
    `Use the mapped visual or source as proof. A memory-only answer is weaker than an evidence-based answer.`,
    `End with a consequence or significance statement that names the policy, group, right, conflict, region, or economic issue involved.`,
  ];
  const meanings = [
    `${specificChecks[0]} ${profile.confusion}`,
    `${specificChecks[1]} This is where the cause, pressure, policy, or conflict begins to explain the event.`,
    `${specificChecks[2]} Name the exact detail and explain why it proves the relationship.`,
    `${specificChecks[3]} This final sentence is what turns facts into mastery-level historical reasoning.`,
  ];
  return `<div class="step"><strong>Step ${index + 1}:</strong> ${esc(studentFacing(step))} <br><strong>What this means:</strong> ${esc(studentFacing(meanings[index] || meanings[3]))} <br><strong>How to check your thinking:</strong> Your explanation should name the evidence, explain the relationship, and connect back to this purpose: ${esc(studentFacing(item.purpose))}</div>`;
}

function p02(item) {
  const profile = contentProfile(item);
  return pageShell(item, "P02", "P02 Notebook Task - Part 1", `<section class="box"><h2>Notebook Title</h2><p>${esc(item.title)} - Context, Evidence, and Reasoning</p></section>
<section class="box"><h2>Vocabulary</h2><table><tr><th>Term</th><th>Student-friendly meaning</th><th>How to use it</th></tr>
<tr><td>Context</td><td>The time, place, people, and problem around the event or source.</td><td>Use it before judging why something happened.</td></tr>
<tr><td>Evidence</td><td>A detail from a source, map, table, chart, timeline, or image that supports a claim.</td><td>Name the exact detail, not just the topic.</td></tr>
<tr><td>Corroboration</td><td>Checking one source against another source or known fact.</td><td>Use it to decide whether evidence is reliable.</td></tr>
<tr><td>Historical significance</td><td>Why an event, decision, person, or pattern mattered.</td><td>Explain the consequence or lasting connection.</td></tr></table></section>
<section class="teach"><h2>Core Content Mini-Lesson</h2><p>${esc(studentFacing(profile.anchor))}</p><table><tr><th>Teaching move</th><th>What you should do</th></tr>${profile.sequence.map((s, i) => `<tr><td>Move ${i + 1}</td><td>${esc(studentFacing(s))}</td></tr>`).join("")}</table><p><strong>Evidence focus:</strong> ${esc(studentFacing(profile.evidence))}</p></section>
<section class="teach"><h2>Step-by-Step Historical Teaching</h2>${profile.sequence.map((step, i) => stepTeachingLine(item, step, i)).join("")}
<div class="step"><strong>Final Step:</strong> Turn the details into a complete historical explanation. Name the issue, use one exact evidence detail, explain what it proves, and connect the explanation to ${esc(item.standards)}.</div></section>
${visualBlock(item)}
<section class="box"><h2>Notebook Task</h2><p>Write a five-sentence explanation for ${esc(item.title)}.</p><ol><li>Sentence 1: Name the time period or historical setting.</li><li>Sentence 2: Identify the main issue or question.</li><li>Sentence 3: Use one evidence detail from the visual/source stimulus.</li><li>Sentence 4: Explain what the evidence proves.</li><li>Sentence 5: Connect the explanation to ${esc(item.standards)}.</li></ol></section>
${torBox()}`);
}

function p03(item) {
  const profile = contentProfile(item);
  return pageShell(item, "P03", "P03 Notebook Task - Part 2", `<section class="teach"><h2>Continue the Learning Sequence</h2>
<div class="step"><strong>Step 1: Separate claim from evidence.</strong> A claim is what you think the historical evidence shows. Evidence is the specific detail that supports the claim.</div>
<div class="step"><strong>Step 2: Read the stimulus in layers.</strong> For ${esc(item.visual)}, first read the title, then the categories, then the pattern, then the source or time period.</div>
<div class="step"><strong>Step 3: Explain the relationship.</strong> Use words such as because, therefore, however, as a result, in contrast, and this shows to connect details.</div>
<div class="step"><strong>Step 4: Verify scope.</strong> If your answer is interesting but does not connect to ${esc(item.title)}, it does not meet this lesson's mapping.</div></section>
<section class="box"><h2>What You May Need Clarified</h2><p>${esc(studentFacing(profile.confusion))}</p><p>To avoid that confusion, always pair the historical term with a time period, a group or policy, and a consequence. That turns a memorized term into an explanation.</p></section>
<section class="box"><h2>Guided Notes</h2><table><tr><th>Question to Ask</th><th>What a strong student answer includes</th></tr>
<tr><td>What is happening?</td><td>Names the historical setting and the main issue.</td></tr>
<tr><td>What evidence proves it?</td><td>Uses one exact detail from the source, table, map, chart, timeline, or image.</td></tr>
<tr><td>Why does it matter?</td><td>Explains cause, effect, comparison, change, continuity, policy, rights, culture, or geography.</td></tr>
<tr><td>How do I know I stayed on track?</td><td>The answer can be traced back to ${esc(item.standards)} and the lesson purpose.</td></tr></table></section>
<section class="misconception"><div class="wrong"><strong>Common Mistake - Incorrect:</strong> "I can answer by naming one familiar event from the lesson."</div><div class="right"><strong>Correct:</strong> "I need to name the evidence and explain how it proves the mapped purpose: ${esc(studentFacing(item.purpose))}"</div><div class="box"><strong>Teachable Explanation:</strong> A familiar event is only the starting point. You must explain the relationship between the evidence, the historical context, and the standard.</div></section>
<section class="box"><h2>Student Verification Check</h2><p>Before moving on, check that your notebook includes one context sentence, one evidence sentence, one reasoning sentence, and one standards connection. If one part is missing, add it now.</p></section>
${torBox()}`);
}

function workedExample(item, n, focus) {
  const profile = contentProfile(item);
  const detail = studentFacing(profile.sequence[(n - 1) % profile.sequence.length]);
  const reason = studentFacing(profile.sequence[n % profile.sequence.length]);
  const exampleBodies = [
    `<p><strong>Worked Model:</strong> Begin by naming the historical setting, because the same word can mean different things in different eras. In this lesson, the important detail is <em>${esc(cleanSentence(detail))}</em>. Do not stop at naming it; ask what problem, decision, or conflict this detail helps explain.</p><p><strong>Student Think-Aloud:</strong> The detail points toward this relationship: ${esc(cleanSentence(reason))}. That tells you the answer needs cause-and-effect reasoning, not just a definition.</p>`,
    `<p><strong>Worked Model:</strong> Use the visual or source stimulus like evidence in a case. Read the title first, then the categories, then the detail that changes the explanation. Here, the useful evidence is <em>${esc(cleanSentence(detail))}</em>.</p><p><strong>Student Think-Aloud:</strong> Underline the part of the stimulus that connects to ${esc(item.standards)}. Then explain this relationship in your own words: ${esc(cleanSentence(reason))}.</p>`,
    `<p><strong>Worked Model:</strong> A final answer should sound complete enough that another student can follow the reasoning without extra explanation. It should name the evidence, explain what it proves, and stay inside ${esc(item.title)}.</p><p><strong>Student Think-Aloud:</strong> Do not add unrelated facts from another lesson. Use <em>${esc(cleanSentence(detail))}</em> and connect it directly to this mapped purpose: ${esc(studentFacing(item.purpose))}</p>`,
  ];
  return `<section class="box"><h2>Worked Example ${n}: ${esc(focus)}</h2>
<p><strong>Problem:</strong> A student is studying ${esc(item.title)} and needs to explain this evidence detail: <em>${esc(cleanSentence(detail))}</em></p>
${exampleBodies[(n - 1) % exampleBodies.length]}
<p><strong>Model Answer:</strong> ${esc(cleanSentence(detail))}. This matters because it shows this relationship: ${esc(cleanSentence(reason))}. The answer is strong because it uses a specific detail, explains the historical relationship, and stays within ${esc(item.title)} instead of drifting into another lesson.</p>
<div class="misconception"><div class="wrong"><strong>Incorrect shortcut:</strong> "${esc(shortLabel(detail, item.title))} is enough because I remember seeing it in the lesson."</div><div class="right"><strong>Correct thinking:</strong> The evidence must be connected to the historical relationship it proves: ${esc(cleanSentence(reason))}.</div><div class="box"><strong>Teachable correction:</strong> ${esc(studentFacing(profile.confusion))} The fix is to pair the evidence with a cause, consequence, comparison, or policy impact from this exact lesson.</div></div></section>`;
}

function p04(item) {
  return pageShell(item, "P04", "P04 Worked Example", `${workedExample(item, 1, "Reading the standard")}
${workedExample(item, 2, "Using the visual/source stimulus")}
${workedExample(item, 3, "Writing the final explanation")}
<section class="misconception"><div class="wrong"><strong>Common Mistake - Incorrect:</strong> The student chooses an answer because one word sounds familiar, but does not check the source, time period, or lesson standard.</div><div class="right"><strong>Correct:</strong> The student first identifies context, then checks the stimulus, then selects the answer that proves the claim inside the mapped lesson.</div><div class="box"><strong>Teachable Explanation:</strong> Familiar words can be distractors. U.S. History mastery requires evidence-based reasoning, not recognition alone.</div></section>
${torBox()}`);
}

function p05(item) {
  const finalLesson = item.lesson === 8;
  return pageShell(item, "P05", "P05 Guided Practice", `<section class="box"><h2>Guided Practice Readiness</h2><p>You are ready for Guided Practice when you can explain ${esc(item.title)} using context, evidence, and reasoning without looking for missing directions somewhere else.</p></section>
<section class="box"><h2>Standards Display</h2><p><strong>MLA Standard(s):</strong> ${esc(item.standards)}</p><p><strong>Required stimulus:</strong> ${esc(item.visual)}</p></section>
<section class="teach"><h2>Before You Start</h2><ol><li>Review your notebook vocabulary.</li><li>Review the visual/source stimulus and ask what it proves.</li><li>For each question, eliminate choices that are outside the lesson scope.</li><li>Choose the answer that best connects evidence to the standard.</li></ol></section>
<section class="box"><h2>Moodle Practice</h2><p>Complete the Moodle Guided Practice for this lesson. ${finalLesson ? "This synthesis lesson also prepares you for the Unit Assessment." : "After Guided Practice, complete the lesson quiz bank assigned in Moodle."}</p></section>
${torBox()}`);
}

function p06(item) {
  return pageShell(item, "P06", "P06 Independent Work", `<section class="box"><h2>Independent Work Instructions</h2><p>Complete all three parts in your notebook. Each part must stay aligned to ${esc(item.standards)} and use evidence from this lesson.</p></section>
<section class="box"><h2>Part A - Vocabulary and Context</h2><p>Write four key terms from the lesson. For each term, write a student-friendly definition and one sentence explaining how the term helps you understand ${esc(item.title)}.</p></section>
<section class="box"><h2>Part B - Visual/Source Analysis</h2><p>Use the required stimulus, ${esc(item.visual)}, to complete this table.</p><table><tr><th>Evidence detail</th><th>What it shows</th><th>Why it matters</th></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table></section>
<section class="box"><h2>Part C - Written Explanation</h2><p>Write one paragraph that answers this prompt: What does the evidence in this lesson prove about ${esc(item.title)}? Include context, one evidence detail, reasoning, and a standards connection to ${esc(item.standards)}.</p></section>
<section class="teach"><h2>Self-Check</h2><p>Your work is complete when it includes exact evidence, not general statements; explains what the evidence proves; and stays inside the lesson mapping.</p></section>
${torBox()}`);
}

function p07(item) {
  return pageShell(item, "P07", "P07 Checkpoint", `<section class="box"><h2>Teacher of Record Graded</h2><p>This checkpoint is submitted for review. Use your notebook evidence from P02-P06.</p></section>
<section class="box"><h2>Checkpoint Task</h2><p>Create a historical evidence response for ${esc(item.title)}. Your response must include:</p><ul><li>the mapped standard(s): ${esc(item.standards)}</li><li>one context statement</li><li>one exact evidence detail from ${esc(item.visual)}</li><li>one reasoning statement explaining why the evidence matters</li><li>one sentence explaining how the lesson connects to the unit theme: ${esc(unitNames[item.unit])}</li></ul></section>
<section class="box"><h2>Notebook Evidence Submission</h2><p>Submit your P02 vocabulary, P03 guided notes, P04 worked-example notes, and P06 independent work with the checkpoint response.</p></section>
<section class="box"><h2>Submission Workflow</h2><p>Submit the checkpoint through the assigned course workflow. If revision is required, use the feedback to correct the exact missing part: context, evidence, reasoning, visual/source use, or standards connection.</p></section>
<section class="box"><h2>Mastery Criteria</h2><ul><li>80% or higher demonstrates mastery.</li><li>The response uses accurate U.S. History content.</li><li>The response includes evidence and reasoning, not only a topic statement.</li><li>The response stays inside the approved lesson mapping.</li></ul></section>
${torBox()}`);
}

function lessonJson(item) {
  const unit = String(item.unit).padStart(2, "0");
  const lesson = String(item.lesson).padStart(2, "0");
  return {
    course: "U.S. HISTORY",
    course_code: "USH",
    unit: item.unit,
    lesson: item.lesson,
    title: item.title,
    page_count: 7,
    credit_structure: "1.0 credit; 8 lessons per unit",
    role: item.lesson === 8 ? "synthesis_unit_assessment_lesson" : "instructional_lesson",
    pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"],
    moodle_lesson_transfer_pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P06.html", "P07.html"],
    assessment_references: {
      guided_practice: `Units/Unit ${unit}/Moodle XML/USH_U${unit}_L${lesson}_GuidedPractice_MoodleXML.xml`,
      lesson_quiz: item.lesson === 8 ? null : `Units/Unit ${unit}/Moodle XML/USH_U${unit}_L${lesson}_Quiz_MoodleXML.xml`,
      unit_assessment: item.lesson === 8 ? `Units/Unit ${unit}/Moodle XML/USH_U${unit}_UnitAssessment_MoodleXML.xml` : null,
    },
    standards: standardsList(item.standards),
    full_crosswalk_trace: {
      florida_best: item.best,
      common_core: item.commonCore,
      sat: item.sat,
      act: item.act,
      eld_accessibility: item.eld,
      visual_source_stimulus: item.visual,
    },
  };
}

function quizJson(item) {
  const finalLesson = item.lesson === 8;
  const unit = String(item.unit).padStart(2, "0");
  const lesson = String(item.lesson).padStart(2, "0");
  return {
    course: "U.S. HISTORY",
    course_code: "USH",
    unit: item.unit,
    lesson: item.lesson,
    production_format: "Moodle XML",
    assessment_files: {
      guided_practice: `Units/Unit ${unit}/Moodle XML/USH_U${unit}_L${lesson}_GuidedPractice_MoodleXML.xml`,
      quiz_bank: finalLesson ? null : `Units/Unit ${unit}/Moodle XML/USH_U${unit}_L${lesson}_Quiz_MoodleXML.xml`,
      unit_assessment: finalLesson ? `Units/Unit ${unit}/Moodle XML/USH_U${unit}_UnitAssessment_MoodleXML.xml` : null,
    },
    guided_practice_questions: 5,
    quiz_bank_questions: finalLesson ? 0 : 25,
    unit_assessment_questions: finalLesson ? 40 : 0,
    final_synthesis_lesson: finalLesson,
    standards: standardsList(item.standards),
  };
}

function questionStimulus(item, kind, index) {
  const profile = contentProfile(item);
  const sequence = assessmentSequence(profile);
  const task = reasoningTask(item, index);
  const detail = sequence[index % sequence.length];
  return `<div><p><strong>Stimulus:</strong> ${esc(item.visual)}</p><table border="1" cellpadding="5"><tr><th>Historical Context</th><th>Evidence Detail</th><th>Reasoning Task</th></tr><tr><td>${esc(studentFacing(profile.anchor))}</td><td>${esc(studentFacing(detail))}</td><td>Explain ${task.focus} without drifting outside ${esc(item.standards)}.</td></tr></table></div><p><strong>Question:</strong> ${esc(task.stem)} (${esc(item.title)})</p>`;
}

function reasoningTask(item, index) {
  const title = item.title.toLowerCase();
  const visual = item.visual.toLowerCase();
  const baseTasks = [
    { focus: "context and evidence", stem: "Which conclusion is best supported by the evidence detail?", frame: "The strongest conclusion uses this evidence" },
    { focus: "cause and consequence", stem: "What cause-and-effect relationship does the evidence show?", frame: "The cause-and-effect relationship is shown by this evidence" },
    { focus: "comparison and contrast", stem: "Which comparison best fits the evidence and the mapped lesson?", frame: "The best comparison uses this evidence" },
    { focus: "change and continuity", stem: "What change or continuity should the student identify?", frame: "The change or continuity is shown by this evidence" },
    { focus: "rights and policy impact", stem: "What rights, policy, or public-response impact is shown?", frame: "The rights or policy impact is shown by this evidence" },
    { focus: "historical significance", stem: "Why is this detail historically significant in this lesson?", frame: "The historical significance is shown by this evidence" },
  ];
  if (/source|artifact|historiography|reliability|corroboration/.test(title + " " + visual)) {
    baseTasks.push({ focus: "source reliability", stem: "How should the student use this evidence without overclaiming?", frame: "The evidence should be used carefully" });
  }
  if (/map|route|region|migration|geograph|foreign policy|vietnam|korea|korean|florida history|immigration/.test(title + " " + visual)) {
    baseTasks.push({ focus: "geographic or regional reasoning", stem: "How does place, region, route, or location affect the explanation?", frame: "The geographic explanation uses this evidence" });
  }
  if (/timeline|sequence|war|cold war|terrorism|depression|new deal|reconstruction|civil rights/.test(title + " " + visual)) {
    baseTasks.push({ focus: "sequence and turning point", stem: "Which sequence or turning point best explains the evidence?", frame: "The sequence is best explained by this evidence" });
  }
  return baseTasks[index % baseTasks.length];
}

function answerSet(item, correctIndex, index = 0) {
  const profile = contentProfile(item);
  const sequence = assessmentSequence(profile);
  const task = reasoningTask(item, index);
  const detail = studentFacing(sequence[index % sequence.length]);
  const reason = studentFacing(sequence[(index + 1) % sequence.length]);
  const nextReason = studentFacing(sequence[(index + 2) % sequence.length]);
  const lessonMisconception = cleanSentence(studentFacing(profile.confusion).replace(/^Do not /, "It is incorrect to "));
  const answers = [
    {
      text: `${cleanSentence(detail)}. This evidence matters because it shows this relationship: ${cleanSentence(reason)}.`,
      feedback: `Correct. This answer uses the stimulus evidence, explains the ${task.focus} relationship, and stays inside ${item.title} and ${item.standards}.`,
      correct: true,
    },
    {
      text: `The student should repeat the topic "${item.title}" but avoid explaining the evidence detail from the stimulus.`,
      feedback: `This is incomplete. A title is not evidence. A valid answer must use the stimulus and explain how the detail supports ${item.title}.`,
      correct: false,
    },
    {
      text: `The student should list this detail, "${cleanSentence(detail)}," and stop without explaining cause, consequence, comparison, or significance.`,
      feedback: `This is incomplete. Listing a detail is not mastery; the student must explain how the evidence proves the mapped historical relationship.`,
      correct: false,
    },
    {
      text: `${cleanSentence(nextReason)} is related to the lesson, but it is incomplete unless the answer explains the specific stimulus detail in the question. ${lessonMisconception}`,
      feedback: `This drifts away from the question. The correct answer must connect the provided stimulus detail to the lesson purpose and standard.`,
      correct: false,
    },
  ];
  const correct = answers[0];
  const distractors = answers.slice(1);
  const order = [];
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) order.push(correct);
    else order.push(distractors.shift());
  }
  return order;
}

function xmlQuestion(id, item, kind, index, correctIndex) {
  const qtext = `<p><strong>Question ID:</strong> ${esc(id)}</p><p><strong>MLA Standard:</strong> ${esc(item.standards)}</p>${questionStimulus(item, kind, index)}`;
  const answers = answerSet(item, correctIndex, index).map((ans) => `<answer fraction="${ans.correct ? "100" : "0"}"><text><![CDATA[${cdataSafe(ans.text)}]]></text><feedback><text><![CDATA[${cdataSafe(ans.feedback)}]]></text></feedback></answer>`).join("\n");
  return `<question type="multichoice">
<name><text>${esc(id)}</text></name>
<questiontext format="html"><text><![CDATA[${cdataSafe(qtext)}]]></text></questiontext>
<generalfeedback format="html"><text><![CDATA[Use the stimulus, identify the evidence, explain the reasoning, and check the mapped standard before finalizing your answer.]]></text></generalfeedback>
<defaultgrade>1.0000000</defaultgrade>
<penalty>0.3333333</penalty>
<hidden>0</hidden>
<single>true</single>
<shuffleanswers>true</shuffleanswers>
<answernumbering>abc</answernumbering>
${answers}
</question>`;
}

function xmlBank(bankId, items, kind, count, displayLesson = null) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const item = items[i % items.length];
    const lessonNumber = displayLesson ?? item.lesson;
    const lessonPart = kind.includes("Pretest") || kind.includes("UnitAssessment") ? "" : `_L${String(lessonNumber).padStart(2, "0")}`;
    const id = `${bankId}${lessonPart}_${kind}_Q${String(i + 1).padStart(2, "0")}`;
    questions.push(xmlQuestion(id, item, kind, i, i % 4));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n${questions.join("\n")}\n</quiz>\n`;
}

for (const [unit, items] of byUnit.entries()) {
  const unitDir = path.join(unitsRoot, `Unit ${String(unit).padStart(2, "0")}`);
  ensureDir(unitDir);
  for (const item of items) {
    const lessonDir = path.join(unitDir, `Lesson ${String(item.lesson).padStart(2, "0")}`);
    ensureDir(lessonDir);
    fs.writeFileSync(path.join(lessonDir, "P01.html"), p01(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P02.html"), p02(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P03.html"), p03(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P04.html"), p04(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P05.html"), p05(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P06.html"), p06(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "P07.html"), p07(item), "utf8");
    fs.writeFileSync(path.join(lessonDir, "lesson.json"), JSON.stringify(lessonJson(item), null, 2) + "\n", "utf8");
    fs.writeFileSync(path.join(lessonDir, "quiz.json"), JSON.stringify(quizJson(item), null, 2) + "\n", "utf8");
  }
  const xmlDir = path.join(unitDir, "Moodle XML");
  ensureDir(xmlDir);
  const bankId = `USH_U${String(unit).padStart(2, "0")}`;
  const instructionalItems = items.filter((item) => item.lesson !== 8);
  fs.writeFileSync(path.join(xmlDir, `${bankId}_Pretest_MoodleXML.xml`), xmlBank(bankId, instructionalItems, "Pretest", 10), "utf8");
  for (const item of items) {
    const base = `${bankId}_L${String(item.lesson).padStart(2, "0")}`;
    const guidedItems = item.lesson === 8 ? instructionalItems : [item];
    fs.writeFileSync(path.join(xmlDir, `${base}_GuidedPractice_MoodleXML.xml`), xmlBank(bankId, guidedItems, "GuidedPractice", 5, item.lesson), "utf8");
    if (item.lesson !== 8) {
      fs.writeFileSync(path.join(xmlDir, `${base}_Quiz_MoodleXML.xml`), xmlBank(bankId, [item], "Quiz", 25), "utf8");
    }
  }
  fs.writeFileSync(path.join(xmlDir, `${bankId}_UnitAssessment_MoodleXML.xml`), xmlBank(bankId, instructionalItems, "UnitAssessment", 40), "utf8");
}

fs.writeFileSync(path.join(root, "Course-Overview.md"), fs.readFileSync(path.join(production, "Course-Overview.md"), "utf8"), "utf8");
console.log(`Built ${lessonRows.length} U.S. History lessons and Moodle XML banks.`);
