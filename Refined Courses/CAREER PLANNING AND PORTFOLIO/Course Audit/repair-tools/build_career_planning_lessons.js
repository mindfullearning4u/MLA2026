const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const unitsRoot = path.join(root, "Units");

const unitTitles = {
  1: "Career Self-Knowledge: Interests, Skills, and Values",
  2: "Occupations, Industries, and Labor-Market Evidence",
  3: "Postsecondary Pathways, Credentials, and Training Providers",
  4: "Career Decisions, Skills, Credentials, and Paying for Training",
  5: "Academic Planning, Graduation Pathways, and Opportunity Alignment",
  6: "Portfolio Synthesis and Career Readiness Presentation",
};

const lessons = [
  {
    u: 1, l: 1, title: "Career Interests and Personal Evidence", standards: ["MLA.CPP.SELF.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 01.01",
    visual: "interest evidence table",
    objective: "explain career interests using assessment results, personal experience, research, and reflection",
    vocab: [["career interest", "a type of work activity or problem that attracts your attention"], ["assessment evidence", "information from an inventory, survey, or reflection that supports a conclusion"], ["reflection", "careful thinking about what evidence says about you"]],
    rows: [["Interest signal", "What the evidence looks like", "How to use it"], ["People", "You prefer helping, teaching, serving, leading, or communicating", "Look for careers with frequent interaction"], ["Data and systems", "You enjoy organizing information, finding patterns, or improving processes", "Look for careers that use analysis or operations"], ["Hands-on work", "You prefer building, repairing, designing, or using tools", "Look for careers with technical or applied tasks"]],
    scenario: "A student completes an interest inventory and notices high scores in helping, organizing information, and solving practical problems. The student also enjoys tutoring classmates and planning club events.",
    examples: [["Interest evidence", "The tutoring and club planning evidence points toward helping and organization interests.", "Do not list a career just because it sounds impressive."], ["Research connection", "A career profile for school counselor, human resources specialist, or project coordinator would give stronger evidence about fit.", "Do not stop at the inventory score."], ["Reflection statement", "A complete statement says: My evidence suggests I may prefer careers that combine helping people and organizing plans.", "Do not write only I like people."]],
    tasks: ["Complete a three-row interest evidence table using assessment, experience, and research evidence.", "Write one paragraph explaining which interest pattern has the strongest evidence.", "Identify one career to research next and explain why it fits the evidence."]
  },
  {
    u: 1, l: 2, title: "Career Skills: Strengths and Growth Areas", standards: ["MLA.CPP.SELF.2"],
    benchmark: "CPALMS/FDOE Career and Education Planning 01.02",
    visual: "skills growth chart",
    objective: "describe current and developable career-related skills using assessment evidence and reflection",
    vocab: [["career-related skill", "an ability used in workplace tasks"], ["strength", "a skill you can already use with consistency"], ["growth area", "a skill that can improve with practice, training, feedback, or experience"]],
    rows: [["Skill", "Current evidence", "Growth evidence"], ["Communication", "Explains ideas clearly in group work", "Can improve by practicing concise emails and presentations"], ["Organization", "Uses a planner for school deadlines", "Can improve by setting weekly progress checks"], ["Technical learning", "Learns new apps after tutorials", "Can improve through certification practice"]],
    scenario: "A student says communication is a strength because they lead group discussions, but time management is a growth area because long projects are often finished at the last minute.",
    examples: [["Separate skill from personality", "Communication is a skill because it can be observed in speaking, writing, listening, and feedback.", "Do not write I am nice as the whole skill description."], ["Use evidence", "Leading a group discussion is evidence; saying I am good at it without an example is not enough.", "Do not make unsupported claims."], ["Plan growth", "A growth area should include a practice step, such as using a project calendar.", "Do not treat growth areas as permanent weaknesses."]],
    tasks: ["List three career-related skills and one piece of evidence for each.", "Choose one growth area and write a practice plan.", "Explain how one skill could transfer to two different careers."]
  },
  {
    u: 1, l: 3, title: "Lifestyle and Workplace Values", standards: ["MLA.CPP.SELF.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 01.03",
    visual: "values tradeoff matrix",
    objective: "explain lifestyle and workplace values that affect career decisions",
    vocab: [["lifestyle value", "a life condition that matters when choosing work"], ["workplace value", "a feature of the work setting or job role that matters to you"], ["tradeoff", "a decision in which gaining one value may require giving up part of another"]],
    rows: [["Value", "Question to ask", "Possible tradeoff"], ["Salary and benefits", "Will the income support my goals and responsibilities?", "Higher pay may require longer training or less schedule flexibility"], ["Work environment", "Do I prefer office, outdoor, remote, lab, shop, or field work?", "Preferred setting may limit available occupations"], ["Work/life balance", "How predictable does my schedule need to be?", "Flexible jobs may have variable income or hours"]],
    scenario: "A student wants high earnings, a predictable schedule, and outdoor work. The student compares nursing, construction management, and accounting.",
    examples: [["Name the value", "High earnings is a salary value, predictable schedule is a balance value, and outdoor work is an environment value.", "Do not combine all values into one vague preference."], ["Analyze tradeoffs", "Construction management may fit outdoor work and earnings but may involve changing sites and deadlines.", "Do not assume one career satisfies every value equally."], ["Prioritize", "A decision matrix can rank which values matter most before choosing careers to research.", "Do not let the first attractive detail decide the career."]],
    tasks: ["Rank five lifestyle or workplace values from most to least important.", "Complete a values tradeoff matrix for two careers.", "Write a short explanation of which value would be hardest for you to compromise."]
  },
  {
    u: 1, l: 4, title: "Career Choices and Positive Impact", standards: ["MLA.CPP.SELF.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 01.04",
    visual: "impact values organizer",
    objective: "explain values related to positive impact when weighing career choices",
    vocab: [["positive impact", "a helpful effect on people, communities, systems, or the environment"], ["service value", "a belief about helping others through work"], ["impact evidence", "details showing who benefits and how"]],
    rows: [["Impact area", "Career evidence to look for", "Question for reflection"], ["People", "The work supports health, safety, education, service, or well-being", "Who is helped directly?"], ["Community", "The work improves local systems, access, infrastructure, or civic life", "What problem is reduced?"], ["World or environment", "The work addresses larger needs such as sustainability, technology, or public health", "What long-term result matters?"]],
    scenario: "A student is comparing cybersecurity, nursing, and environmental technology. Each could help others, but the type of impact is different.",
    examples: [["Identify the beneficiary", "Nursing often has direct impact on patients; cybersecurity may protect people indirectly by protecting systems.", "Do not say only it helps people without naming how."], ["Match values to work", "If direct service matters most, frequent contact with clients or patients may be important.", "Do not confuse a career's public image with daily tasks."], ["Use impact evidence", "A strong explanation uses who benefits, what action helps them, and why the impact matters.", "Do not make unsupported claims about changing the world."]],
    tasks: ["Choose three impact values and define what each means in career decisions.", "Compare two careers by type of positive impact.", "Write a claim explaining which impact value should guide your next career research step."]
  },
  {
    u: 1, l: 5, title: "Synthesis: My Career Self-Knowledge Profile", standards: ["MLA.CPP.SELF.1", "MLA.CPP.SELF.2", "MLA.CPP.SELF.3", "MLA.CPP.SELF.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 01.01-01.04",
    visual: "self-knowledge profile",
    objective: "integrate interests, skills, lifestyle values, workplace values, and impact values into a career self-knowledge profile",
    vocab: [["profile", "an organized summary of evidence about a person"], ["alignment", "a clear match between evidence and a possible career direction"], ["synthesis", "combining multiple pieces of learning into one stronger conclusion"]],
    rows: [["Profile section", "Evidence required", "Quality check"], ["Interests", "Assessment and personal-experience evidence", "Does the evidence show a pattern?"], ["Skills", "Strengths and growth areas", "Does each skill include proof or a practice plan?"], ["Values", "Lifestyle, workplace, and impact priorities", "Are tradeoffs acknowledged?"], ["Career direction", "One or more career areas to research next", "Does the direction follow from the evidence?"]],
    scenario: "A student has interests in helping and organizing, strengths in communication, a growth area in time management, and values a stable schedule and direct service.",
    examples: [["Combine evidence", "Helping plus communication plus direct service may point toward education, health, counseling, or customer success careers.", "Do not choose one result from one inventory as the final answer."], ["Address tradeoffs", "A stable schedule may make some emergency-service roles less aligned than school-based or office-based service roles.", "Do not ignore values that complicate the choice."], ["Write the synthesis", "A strong profile states the pattern, cites evidence, and names what to research next.", "Do not write a list with no conclusion."]],
    tasks: ["Complete the self-knowledge profile organizer.", "Write a synthesis paragraph explaining your strongest career direction so far.", "Identify two questions your next occupation research must answer."],
    synthesis: true
  },

  {
    u: 2, l: 1, title: "Career Clusters, Industries, and Occupations", standards: ["MLA.CPP.LMI.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 02.01",
    visual: "cluster hierarchy chart",
    objective: "define career clusters, industries, and occupations and explain how they are related",
    vocab: [["career cluster", "a broad group of careers connected by similar work"], ["industry", "a field of business or production"], ["occupation", "a specific job role with duties and requirements"]],
    rows: [["Level", "Example", "How it helps research"], ["Career cluster", "Health Science", "Narrows a broad area of interest"], ["Industry", "Hospitals and outpatient care", "Shows where jobs are located"], ["Occupation", "Radiologic technologist", "Identifies duties, training, pay, and outlook"]],
    scenario: "A student says they want a job in science. The statement is too broad, so the student sorts possible options into clusters, industries, and occupations.",
    examples: [["Start broad", "Science may connect to Health Science, Agriculture, STEM, or Manufacturing clusters.", "Do not treat a broad interest as a finished career choice."], ["Move to industry", "Health care is an industry where science skills may be used in patient care or testing.", "Do not confuse industry with occupation."], ["Name the occupation", "Radiologic technologist is a specific occupation that can be researched for requirements.", "Do not list only a workplace such as hospital."]],
    tasks: ["Build a hierarchy chart for one career area.", "Classify five terms as cluster, industry, or occupation.", "Explain why occupation-level research is needed before making a plan."]
  },
  {
    u: 2, l: 2, title: "Wages, Poverty Thresholds, and Family-Sustaining Income", standards: ["MLA.CPP.LMI.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 02.02",
    visual: "wage threshold table",
    objective: "define and compare poverty, average wage, and family-sustaining wage thresholds",
    vocab: [["regional poverty threshold", "an income level used to estimate basic economic hardship in a region"], ["average wage", "typical pay for workers in a region or occupation"], ["family-sustaining wage", "income likely to support ordinary living costs for a household"]],
    rows: [["Measure", "What it tells you", "Career decision use"], ["Poverty threshold", "Minimum hardship comparison point", "Shows whether wages may be too low for basic needs"], ["Average wage", "Typical pay level", "Helps compare occupations"], ["Family-sustaining wage", "Income connected to household costs", "Helps judge long-term financial fit"]],
    scenario: "Occupation A pays close to the regional poverty threshold. Occupation B pays near the average wage. Occupation C pays above a family-sustaining wage but requires more training.",
    examples: [["Read the measure", "A wage above the poverty threshold does not automatically mean it supports all household costs.", "Do not treat all thresholds as the same."], ["Compare fit", "Occupation C may support long-term stability but may require more time or money for training.", "Do not ignore training costs."], ["Use evidence carefully", "A strong conclusion says which measure was used and why it matters.", "Do not say best pay without naming the comparison."]],
    tasks: ["Define each wage measure in your own words.", "Use a sample wage table to rank three occupations by financial fit.", "Explain one tradeoff between wages and training requirements."]
  },
  {
    u: 2, l: 3, title: "Reading Regional Labor-Market Data", standards: ["MLA.CPP.LMI.2"],
    benchmark: "CPALMS/FDOE Career and Education Planning 02.03",
    visual: "labor-market data table",
    objective: "use regional labor-market data to identify top occupations by employment, growth, and salary",
    vocab: [["employment", "the number of jobs or workers in an occupation"], ["growth", "expected increase in jobs over time"], ["salary", "pay earned in an occupation"]],
    rows: [["Occupation", "Employment rank", "Growth rank", "Salary rank"], ["Medical assistant", "High", "High", "Medium"], ["Software developer", "Medium", "High", "High"], ["Retail salesperson", "High", "Low", "Low"]],
    scenario: "A student sees that one occupation has many current jobs, another is growing quickly, and a third pays more. The student must decide what the data actually means.",
    examples: [["Employment", "High employment may mean many openings, but it does not always mean high pay.", "Do not assume many jobs means best career."], ["Growth", "High growth may show future opportunity, especially if training is realistic.", "Do not ignore whether the occupation exists in the region."], ["Salary", "High salary matters, but it must be weighed with interests, skills, training, and values.", "Do not choose by salary alone."]],
    tasks: ["Read a labor-market table and identify top occupations by employment, growth, and salary.", "Choose one occupation that appears strong on two measures.", "Write a data-based explanation using at least two data points."]
  },
  {
    u: 2, l: 4, title: "Comparing Occupations with Personal Fit", standards: ["MLA.CPP.LMI.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 02.04-02.05",
    visual: "occupation comparison matrix",
    objective: "select and compare occupations aligned with interests, skills, values, salary, employment, and growth",
    vocab: [["personal fit", "how well an occupation matches interests, skills, values, and practical needs"], ["comparison matrix", "a table used to compare options by the same criteria"], ["evidence weight", "the importance given to a factor in a decision"]],
    rows: [["Criterion", "Occupation 1", "Occupation 2", "Occupation 3"], ["Interest fit", "High", "Medium", "High"], ["Skill fit", "Medium", "High", "Medium"], ["Salary/growth", "Medium", "High", "Low"], ["Value fit", "High", "Medium", "High"]],
    scenario: "A student compares dental hygienist, software developer, and elementary teacher using interest, skill, wage, growth, and workplace values.",
    examples: [["Use same criteria", "Each occupation must be compared with the same factors so the decision is fair.", "Do not use salary for one job and schedule for another only."], ["Explain the weight", "If work/life balance is most important, value fit may receive more weight than salary.", "Do not hide the reason behind your ranking."], ["Make a research decision", "The best next step may be to research the occupation with strongest total fit, not the most familiar one.", "Do not choose only because you know someone in that job."]],
    tasks: ["Complete a three-occupation comparison matrix.", "Rank the three occupations and explain the top choice.", "Name one missing data point you would need before making a final decision."]
  },
  {
    u: 2, l: 5, title: "Synthesis: Occupation Research and Evidence Summary", standards: ["MLA.CPP.LMI.1", "MLA.CPP.LMI.2", "MLA.CPP.LMI.3", "MLA.CPP.LMI.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 02.01-02.06",
    visual: "occupational learning organizer",
    objective: "summarize occupational evidence from cluster research, labor-market data, occupation comparison, and firsthand-style learning",
    vocab: [["occupational summary", "an evidence-based explanation of what was learned about a career"], ["source evidence", "information gathered from a profile, interview, fair, shadowing, speaker, or work-based source"], ["synthesis evidence", "combined evidence from multiple parts of a unit"]],
    rows: [["Evidence type", "Question answered", "What to include"], ["Cluster/industry", "Where does this occupation fit?", "Cluster, industry, and occupation name"], ["Labor market", "What does the data show?", "Employment, growth, and salary"], ["Firsthand-style source", "What is daily work like?", "Duties, setting, skills, and advice"], ["Personal fit", "Why might it fit me?", "Interest, skill, value, and wage evidence"]],
    scenario: "A student researched physical therapist assistant and has cluster information, wage data, growth data, and notes from an informational interview transcript.",
    examples: [["Organize evidence", "The summary should separate data evidence from personal-fit evidence.", "Do not mix every detail into one unsupported paragraph."], ["Use source learning", "A transcript note about daily patient interaction supports the work-environment analysis.", "Do not cite an interview as proof of salary unless salary was actually discussed."], ["Make a balanced conclusion", "A strong summary names the benefits, concerns, and next research step.", "Do not write that the career is perfect."]],
    tasks: ["Complete an occupational learning organizer.", "Write a one-paragraph occupation summary using at least three evidence types.", "Identify one concern or unanswered question for future planning."],
    synthesis: true
  },

  {
    u: 3, l: 1, title: "Options After High School", standards: ["MLA.CPP.PATH.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 03.01",
    visual: "pathway pros and cons chart",
    objective: "evaluate the pros and cons of education, employment, entrepreneurship, or enlistment immediately after high school",
    vocab: [["postsecondary pathway", "a route after high school toward work, training, service, or education"], ["entrepreneurship", "starting or operating a business or venture"], ["enlistment", "joining a branch of military service"]],
    rows: [["Pathway", "Possible benefit", "Possible challenge"], ["Education/training", "Builds credentials for long-term options", "May require cost, time, and admissions steps"], ["Employment", "Builds income and work experience quickly", "May limit advancement without later training"], ["Entrepreneurship", "Allows ownership and creativity", "Requires risk, planning, and financial discipline"], ["Enlistment", "Offers service, training, structure, and benefits", "Requires commitment and eligibility"]],
    scenario: "A student wants to earn income quickly but also needs a credential for the preferred long-term occupation.",
    examples: [["Identify the goal", "If the occupation requires a license, immediate work alone may not be enough.", "Do not evaluate pathways without the career goal."], ["Compare pros and cons", "Employment could support savings while part-time training builds credentials.", "Do not assume only one path is possible."], ["State a reasoned choice", "A strong choice names the goal, the benefit, the challenge, and a next step.", "Do not say because it is easiest."]],
    tasks: ["Complete a pros and cons chart for all four pathway types.", "Choose the pathway that best supports one career goal.", "Write a paragraph explaining the choice and one risk to manage."]
  },
  {
    u: 3, l: 2, title: "Training Providers and Admissions Requirements", standards: ["MLA.CPP.PATH.2"],
    benchmark: "CPALMS/FDOE Career and Education Planning 03.02",
    visual: "provider requirements table",
    objective: "define training provider options and admissions requirements",
    vocab: [["apprenticeship", "paid structured training that combines work experience and instruction"], ["technical college", "a school focused on career and technical training"], ["admissions requirement", "a condition a student must meet to enter a program"]],
    rows: [["Provider type", "Common requirement", "Best fit when"], ["Apprenticeship", "Application, age, diploma/GED, aptitude or interview", "You want paid hands-on training"], ["Technical college", "Application, program prerequisites, fees", "You want focused career preparation"], ["State/community college", "Application, placement, program prerequisites", "You want certificate or degree options"], ["University", "Admission criteria, test/GPA/course expectations", "You need a bachelor's or higher pathway"]],
    scenario: "A student interested in aviation maintenance compares a technical college, apprenticeship-style training, and a state college program.",
    examples: [["Read requirements", "If a program requires algebra readiness or a background check, those are planning details.", "Do not look only at the program title."], ["Match provider to goal", "A technical certificate may fit faster entry; an associate degree may support advancement.", "Do not assume the longest program is always best."], ["Plan next steps", "A complete plan lists documents, deadlines, prerequisites, and cost questions.", "Do not wait until senior year to check requirements."]],
    tasks: ["Define four provider types.", "Complete a provider requirements table for one career goal.", "Write three admissions questions you must answer before choosing a provider."]
  },
  {
    u: 3, l: 3, title: "Credentials, Licenses, Certificates, and Degrees", standards: ["MLA.CPP.PATH.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 03.03",
    visual: "credential stack diagram",
    objective: "explain credentialing and stacking options",
    vocab: [["credential", "recognized proof that a person has learned or can do specific work"], ["license", "permission from an authority to perform regulated work"], ["stacking", "earning credentials in a sequence that builds toward higher opportunity"]],
    rows: [["Credential type", "What it shows", "Example planning question"], ["Industry certification", "Specific technical skill or tool readiness", "Does this certification help with entry-level hiring?"], ["Apprenticeship certificate", "Completion of structured work-based training", "What occupations use this route?"], ["License", "Legal authorization for regulated work", "What exam or hours are required?"], ["Degree", "Broader academic or professional preparation", "Is an associate or bachelor's degree expected?"]],
    scenario: "A student wants to become a practical nurse and later a registered nurse. The student must understand how certificates, licenses, and degrees may stack.",
    examples: [["Name the credential", "A license is different from a certificate because it may be legally required to practice.", "Do not use all credential words as if they mean the same thing."], ["Sequence the stack", "A certificate can support entry, while later coursework may support an associate degree.", "Do not assume one credential ends all learning."], ["Check fit", "The right credential depends on the occupation, state rules, employer expectations, and advancement goal.", "Do not choose a credential because it sounds official."]],
    tasks: ["Create a credential stack for one occupation.", "Explain the difference between a certificate, license, and degree.", "Identify one credential that supports entry and one that supports advancement."]
  },
  {
    u: 3, l: 4, title: "Comparing Cost, Debt, Earnings, and Placement", standards: ["MLA.CPP.PATH.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 03.04-03.06",
    visual: "cost/outcome comparison table",
    objective: "compare training options and provider outcomes aligned to career assessment results and occupational exploration",
    vocab: [["total cost", "the full estimated cost of a training option"], ["debt after graduation", "money a student may owe after completing a program"], ["placement rate", "the percentage of completers who find related employment or further placement"]],
    rows: [["Provider", "Total cost", "Average debt", "Median earnings", "Placement"], ["Provider A", "Lower", "Low", "Medium", "Medium"], ["Provider B", "Medium", "Medium", "High", "High"], ["Provider C", "High", "High", "High", "Unknown"]],
    scenario: "A student compares three medical assisting programs. One is cheaper, one has stronger placement, and one has limited outcome data.",
    examples: [["Compare more than price", "The lowest cost provider may not be best if completion or placement support is weak.", "Do not choose by tuition alone."], ["Notice missing data", "Unknown placement is a warning that the student needs more research.", "Do not treat missing data as positive."], ["Use career alignment", "A provider should match the credential needed for the preferred occupation.", "Do not compare programs that do not lead to the same goal."]],
    tasks: ["Read a provider outcome table and identify the strongest evidence.", "Write a comparison paragraph using cost, debt, earnings, and placement.", "List two questions to ask a provider before choosing it."]
  },
  {
    u: 3, l: 5, title: "Synthesis: My Postsecondary Pathway Evidence", standards: ["MLA.CPP.PATH.1", "MLA.CPP.PATH.2", "MLA.CPP.PATH.3", "MLA.CPP.PATH.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 03.01-03.06",
    visual: "pathway decision organizer",
    objective: "integrate pathway, provider, credential, and outcome evidence into a postsecondary pathway decision",
    vocab: [["pathway evidence", "details that justify a route after high school"], ["provider fit", "how well a training option matches goals, requirements, costs, and outcomes"], ["pathway risk", "a challenge that must be planned for"]],
    rows: [["Decision area", "Evidence to include", "Quality check"], ["Pathway type", "education, employment, entrepreneurship, or enlistment", "Does it match the career goal?"], ["Provider", "requirements and program details", "Are admission steps clear?"], ["Credential", "certificate, license, degree, or apprenticeship", "Is it recognized for the occupation?"], ["Outcomes", "cost, debt, earnings, placement", "Are data and risks explained?"]],
    scenario: "A student chooses a state college program because it leads to an associate degree, has manageable cost, and reports strong placement in the chosen field.",
    examples: [["Connect all parts", "The pathway is strong only if the provider, credential, and outcomes all support the career goal.", "Do not list details without explaining the connection."], ["Identify risk", "A program can be a good choice while still requiring a plan for transportation, cost, or prerequisites.", "Do not hide barriers."], ["Write a decision", "A complete decision uses evidence from each part of the organizer.", "Do not use preference alone."]],
    tasks: ["Complete the pathway decision organizer.", "Write a pathway decision paragraph with at least four evidence points.", "Name one risk and one action step to reduce it."],
    synthesis: true
  },

  {
    u: 4, l: 1, title: "Choosing an Occupation with a Decision Matrix", standards: ["MLA.CPP.PLAN.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.01",
    visual: "occupation decision matrix",
    objective: "prioritize an occupation using a decision-making technique",
    vocab: [["decision matrix", "a table that compares options by weighted criteria"], ["criteria", "factors used to judge options"], ["priority", "the option ranked highest after evidence is weighed"]],
    rows: [["Criterion", "Weight", "Occupation A", "Occupation B"], ["Interest fit", "High", "4", "3"], ["Skill fit", "Medium", "3", "4"], ["Training realism", "High", "3", "2"], ["Wage/growth", "Medium", "3", "4"]],
    scenario: "A student compares dental hygienist and software developer using interest fit, skill fit, training realism, and wage/growth evidence.",
    examples: [["Choose criteria", "Criteria should come from the course evidence, not from random preferences.", "Do not include a factor you cannot explain."], ["Use weights", "A high-weight factor should affect the decision more than a low-weight factor.", "Do not pretend every factor matters equally if it does not."], ["Prioritize", "The top occupation should be supported by the weighted evidence.", "Do not pick a different career after the matrix without explaining why."]],
    tasks: ["Build a decision matrix for two occupations.", "Assign weights and explain why they matter.", "Use the matrix to prioritize one occupation."]
  },
  {
    u: 4, l: 2, title: "Explaining the Career Choice with Evidence", standards: ["MLA.CPP.PLAN.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.02",
    visual: "claim-evidence-reasoning frame",
    objective: "explain the reasoning for choosing a preferred occupation",
    vocab: [["claim", "the decision or position being explained"], ["evidence", "facts, data, or examples that support the claim"], ["reasoning", "the explanation that connects evidence to the claim"]],
    rows: [["CER part", "Career-planning version", "Quality check"], ["Claim", "My preferred occupation is...", "Is the choice clear?"], ["Evidence", "Interest, skill, value, wage, growth, or pathway evidence", "Is evidence specific?"], ["Reasoning", "This matters because...", "Does it explain why the evidence supports the choice?"]],
    scenario: "A student chooses physical therapist assistant because it matches helping interests, uses communication skills, has clear training requirements, and shows regional growth.",
    examples: [["Write the claim", "The preferred occupation is physical therapist assistant.", "Do not start with a vague field like health."], ["Use evidence", "Helping interests and regional growth are two different evidence types.", "Do not repeat the same evidence in different words."], ["Explain reasoning", "Growth matters because it may increase opportunity after training.", "Do not assume the reader knows why evidence matters."]],
    tasks: ["Write a career choice claim.", "Add three different types of evidence.", "Write a reasoning paragraph that connects the evidence to the choice."]
  },
  {
    u: 4, l: 3, title: "Credentials, Technical Skills, and Employability Skills", standards: ["MLA.CPP.PLAN.2", "MLA.CPP.PLAN.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.03-04.05",
    visual: "credential-provider decision table",
    objective: "identify credentials, technical skills, employability skills, entrepreneurship skills, and prioritize credential/provider choices",
    vocab: [["technical skill", "a specific work skill connected to tools, procedures, systems, or knowledge"], ["employability skill", "a transferable workplace skill such as communication, reliability, teamwork, or problem solving"], ["provider choice", "the selected program or training source for a credential goal"]],
    rows: [["Career need", "Evidence source", "Planning action"], ["Credential", "Occupation profile or program requirement", "Choose recognized credential"], ["Technical skill", "Job duties and training curriculum", "Practice or enroll in aligned course"], ["Employability skill", "Employer expectations", "Build through school, work, service, or clubs"], ["Provider", "Admissions and outcomes data", "Compare and prioritize"]],
    scenario: "A student interested in web development compares an industry certification, a technical college certificate, and an associate degree pathway.",
    examples: [["Separate skill types", "HTML, CSS, and debugging are technical skills; communication and deadline management are employability skills.", "Do not call every skill technical."], ["Prioritize credential", "The best first credential depends on entry requirements and long-term goals.", "Do not choose the credential with the longest title."], ["Choose provider", "Provider choice should use cost, requirements, outcomes, and schedule fit.", "Do not choose only because it is nearby."]],
    tasks: ["List required credentials and skills for one occupation.", "Compare two credential/provider options.", "Write a prioritized choice with evidence."]
  },
  {
    u: 4, l: 4, title: "Paying for Postsecondary Training", standards: ["MLA.CPP.PLAN.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.06",
    visual: "funding comparison chart",
    objective: "define ways to pay for postsecondary training, including scholarships, grants, savings, work, work-study, private loans, and federal loans",
    vocab: [["scholarship", "money awarded for education that usually does not need to be repaid"], ["grant", "financial aid that usually does not need to be repaid"], ["loan", "borrowed money that must be repaid, often with interest"]],
    rows: [["Funding source", "Repayment?", "Planning caution"], ["State scholarship", "Usually no", "Eligibility rules and deadlines matter"], ["Grant", "Usually no", "Need or program rules may apply"], ["Savings/work", "No borrowing", "May take time to build enough money"], ["Work-study", "Earned through eligible work", "Availability and hours may be limited"], ["Private/federal loan", "Yes", "Borrow only after comparing cost and repayment"]],
    scenario: "A student has a program cost of 8,000 dollars and considers a state scholarship, part-time work, a grant, and a small federal loan.",
    examples: [["Start with no-repayment sources", "Scholarships and grants reduce cost without loan repayment.", "Do not begin with private loans."], ["Calculate the gap", "If aid and savings do not cover the full cost, the remaining gap must be planned.", "Do not ignore fees, books, tools, or transportation."], ["Explain risk", "Loans can help access training but create repayment obligations.", "Do not call loan money free money."]],
    tasks: ["Define seven funding sources.", "Sort funding sources by repayment risk.", "Write a funding plan for a sample training cost."]
  },
  {
    u: 4, l: 5, title: "Synthesis: Career Pathway Plan", standards: ["MLA.CPP.PLAN.1", "MLA.CPP.PLAN.2", "MLA.CPP.PLAN.3", "MLA.CPP.PLAN.4"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.01-04.06",
    visual: "career pathway plan template",
    objective: "build an evidence-based career pathway plan using occupation choice, credential, skills, provider, and funding evidence",
    vocab: [["career pathway plan", "a step-by-step plan connecting career choice to training, skills, funding, and next actions"], ["implementation step", "a specific action needed to carry out the plan"], ["evidence gap", "missing information that must be researched before the plan is final"]],
    rows: [["Plan section", "Evidence required", "Student check"], ["Occupation choice", "Decision matrix and rationale", "Is the choice justified?"], ["Skills and credentials", "Technical, employability, and credential requirements", "Are requirements accurate?"], ["Provider", "Admissions and outcome comparison", "Is the provider justified?"], ["Funding", "Scholarship, grant, work, savings, loan, or other plan", "Is repayment risk addressed?"], ["Next steps", "Near-term action list", "Are steps specific?"]],
    scenario: "A student chooses cybersecurity analyst, identifies a certification and associate degree path, compares providers, and creates a funding plan using scholarships, work, and limited loans.",
    examples: [["Link decisions", "The credential should support the chosen occupation, and the provider should offer that credential.", "Do not choose unrelated parts."], ["Check feasibility", "A plan must address cost, prerequisites, schedule, and required skills.", "Do not write a dream path with no action steps."], ["Use next steps", "Next steps might include meeting a counselor, checking program prerequisites, and preparing scholarship materials.", "Do not end with I will try hard."]],
    tasks: ["Complete the career pathway plan template.", "Write a summary explaining how the parts connect.", "List three next steps with dates or sequence."],
    synthesis: true
  },

  {
    u: 5, l: 1, title: "Florida Graduation Pathways and Career Goals", standards: ["MLA.CPP.ACAD.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.07",
    visual: "graduation pathway checklist",
    objective: "describe ways to meet Florida graduation pathways while preparing for career goals",
    vocab: [["graduation pathway", "the required course, assessment, and credit route toward a diploma"], ["diploma designation", "an added recognition based on meeting specific requirements"], ["career preparation", "courses and experiences that build readiness for a future occupation"]],
    rows: [["Planning area", "What to check", "Career connection"], ["Required credits", "English, math, science, social studies, electives", "Keeps graduation on track"], ["Assessments", "Required assessments or concordant options", "Prevents delayed completion"], ["Designations", "Scholar or merit options where applicable", "May show readiness or credential achievement"], ["Electives", "Career-aligned courses", "Builds pathway evidence"]],
    scenario: "A student wants a health career and must choose electives while keeping graduation requirements on track.",
    examples: [["Start with requirements", "Required credits come before electives because missing a requirement can delay graduation.", "Do not build a schedule from favorite courses only."], ["Use career alignment", "Health science electives may support the career goal if requirements are still met.", "Do not confuse interest with graduation compliance."], ["Plan ahead", "Some pathways require prerequisite courses before advanced options.", "Do not wait until senior year to discover sequence problems."]],
    tasks: ["Complete a graduation pathway checklist.", "Identify two career-aligned course choices.", "Explain how one course supports both graduation and career preparation."]
  },
  {
    u: 5, l: 2, title: "Accelerated Credit, CTE, Work-Based Learning, and Certifications", standards: ["MLA.CPP.ACAD.1"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.07",
    visual: "opportunity alignment chart",
    objective: "describe accelerated credit, work-based learning, CTE credit, and industry certification opportunities",
    vocab: [["accelerated credit", "college or advanced credit earned while in high school"], ["CTE", "career and technical education focused on workplace skills and credentials"], ["work-based learning", "structured learning connected to real workplace tasks"]],
    rows: [["Opportunity", "What it can provide", "Question to ask"], ["Dual enrollment or AP/AICE/IB style acceleration", "College-level credit or readiness", "Does it fit my academic plan?"], ["CTE course or program", "Technical skills and career exploration", "Does it connect to my occupation?"], ["Industry certification", "Recognized skill evidence", "Do employers or programs value it?"], ["Work-based learning", "Experience, references, and applied skills", "What requirements or supervision are needed?"]],
    scenario: "A student interested in information technology compares a CTE program, an industry certification, and dual enrollment.",
    examples: [["Align to goals", "An IT certification may show technical readiness for entry-level support roles.", "Do not collect credentials that do not support the goal."], ["Check workload", "Accelerated credit can be useful but requires time management and readiness.", "Do not overload a schedule without a support plan."], ["Use opportunity evidence", "A strong plan explains what the opportunity adds to the career pathway.", "Do not list activities without purpose."]],
    tasks: ["Define four opportunity types.", "Complete an alignment chart for two opportunities.", "Choose one opportunity and explain how it supports your career goal."]
  },
  {
    u: 5, l: 3, title: "Freshman Course Schedule Planning", standards: ["MLA.CPP.ACAD.2"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.08",
    visual: "schedule planner",
    objective: "develop a freshman-year course schedule that meets graduation requirements and supports career goals",
    vocab: [["course sequence", "the order in which courses are taken"], ["prerequisite", "a course or condition required before another course"], ["balanced schedule", "a schedule that meets requirements without creating unreasonable workload"]],
    rows: [["Schedule slot", "Requirement served", "Career connection"], ["English", "Required credit", "Builds reading/writing for all careers"], ["Math", "Required credit and pathway readiness", "Supports technical, business, health, and STEM options"], ["Science", "Required credit", "Supports health, environmental, and technical careers"], ["Elective", "Career or interest exploration", "Connects to pathway evidence"]],
    scenario: "A student wants engineering but avoids math. The schedule must still include math progress that supports the career goal.",
    examples: [["Start with required courses", "A freshman schedule should protect graduation progress first.", "Do not fill the schedule with only electives."], ["Check prerequisites", "Future engineering courses may require strong math sequence choices.", "Do not choose a course without considering what comes next."], ["Balance challenge", "A schedule can be ambitious and still include support and workload balance.", "Do not take every hard course at once without a reason."]],
    tasks: ["Draft a freshman schedule with required courses and one career-aligned elective.", "Explain how each course supports graduation or career preparation.", "Identify one question to ask a counselor or Teacher of Record about the schedule."]
  },
  {
    u: 5, l: 4, title: "Extracurricular Activities and Career Alignment", standards: ["MLA.CPP.ACAD.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.09",
    visual: "activity alignment matrix",
    objective: "identify extracurricular activities aligned with occupational and postsecondary training goals",
    vocab: [["extracurricular activity", "a school or community activity outside required coursework"], ["alignment", "a clear connection between an activity and a goal"], ["readiness evidence", "proof that an activity helped build a relevant skill or experience"]],
    rows: [["Activity", "Skill or evidence built", "Career connection"], ["Health club or volunteering", "Service, communication, responsibility", "Health and human service careers"], ["Robotics or coding club", "Technical problem solving", "Engineering or IT careers"], ["Student government", "Leadership and communication", "Public service, business, education"], ["Part-time work", "Reliability and customer interaction", "Many workplace pathways"]],
    scenario: "A student lists five activities but cannot explain how any connect to a career goal. The student must choose activities intentionally.",
    examples: [["Choose for evidence", "A coding club supports an IT goal because it builds technical practice and project evidence.", "Do not join only for resume padding."], ["Limit overload", "Two meaningful activities are better than six shallow commitments.", "Do not build a plan that prevents academic success."], ["Document learning", "Portfolio notes should explain what skill the activity built.", "Do not assume the activity title explains the value."]],
    tasks: ["Complete an activity alignment matrix.", "Choose two activities that support a career or training goal.", "Write how each activity could become portfolio evidence."]
  },
  {
    u: 5, l: 5, title: "Synthesis: Academic and Opportunity Plan", standards: ["MLA.CPP.ACAD.1", "MLA.CPP.ACAD.2", "MLA.CPP.ACAD.3"],
    benchmark: "CPALMS/FDOE Career and Education Planning 04.07-04.09",
    visual: "academic plan template",
    objective: "integrate graduation pathway, course schedule, accelerated or CTE opportunities, and activities into an academic plan",
    vocab: [["academic plan", "a course and opportunity plan that supports graduation and future goals"], ["opportunity plan", "a plan for experiences beyond required courses"], ["course alignment", "a match between course choices and long-term goals"]],
    rows: [["Plan part", "Evidence required", "Quality check"], ["Graduation pathway", "Required courses and key milestones", "Does the plan meet requirements?"], ["Freshman schedule", "Course list and reasons", "Does each course serve a purpose?"], ["Opportunities", "Accelerated, CTE, certification, or work-based options", "Do choices support the career goal?"], ["Activities", "Extracurricular or service options", "Can they become portfolio evidence?"]],
    scenario: "A student interested in teaching builds a schedule with core courses, a child development elective, a service activity, and a future dual enrollment goal.",
    examples: [["Check compliance first", "The plan must meet graduation requirements before adding career opportunities.", "Do not create an exciting plan that misses required credits."], ["Connect opportunities", "A child development elective and tutoring activity both support education career evidence.", "Do not include activities with no explanation."], ["Revise for realism", "A plan should include workload balance and next questions.", "Do not ignore transportation, time, or prerequisites."]],
    tasks: ["Complete the academic and opportunity plan template.", "Write a plan explanation using graduation, schedule, opportunity, and activity evidence.", "List two next actions needed to confirm the plan."],
    synthesis: true
  },

  {
    u: 6, l: 1, title: "Portfolio Evidence and Artifact Selection", standards: ["MLA.CPP.PORT.1"],
    benchmark: "Portfolio evidence vehicle for CPALMS/FDOE Career and Education Planning 01.0-04.0",
    visual: "artifact checklist",
    objective: "organize interests, skills, values, occupation research, pathway evidence, and planning artifacts into a portfolio structure",
    vocab: [["artifact", "a piece of evidence placed in a portfolio"], ["portfolio section", "a category used to organize evidence"], ["evidence quality", "how clearly an artifact proves learning or readiness"]],
    rows: [["Portfolio section", "Artifact examples", "Evidence check"], ["Self-knowledge", "Interest table, skills chart, values matrix", "Does it explain who you are as a planner?"], ["Occupation research", "Labor-market table, occupation comparison", "Does it use data and source evidence?"], ["Pathway planning", "Credential stack, provider comparison", "Does it show realistic training options?"], ["Academic plan", "Schedule, opportunity, activity plan", "Does it connect school choices to goals?"]],
    scenario: "A student has many documents but no order. The portfolio must be organized so a reader can understand the plan.",
    examples: [["Select artifacts", "Choose artifacts that prove a standard, not every worksheet ever completed.", "Do not include weak duplicates."], ["Label evidence", "Each artifact should explain what it shows and why it matters.", "Do not assume the reader knows why it is included."], ["Organize sections", "A clear structure makes the career plan easier to review.", "Do not mix research, schedules, and reflections randomly."]],
    tasks: ["Create a portfolio artifact checklist.", "Select one artifact for each major course area.", "Write a label explaining what each artifact proves."]
  },
  {
    u: 6, l: 2, title: "Revising Portfolio Artifacts for Quality", standards: ["MLA.CPP.PORT.2"],
    benchmark: "Portfolio evidence vehicle for CPALMS/FDOE Career and Education Planning 01.0-04.0",
    visual: "revision rubric",
    objective: "revise portfolio artifacts for clarity, accuracy, audience, and evidence quality",
    vocab: [["revision", "improving content, organization, evidence, and clarity"], ["accuracy check", "a review to confirm facts, data, and labels are correct"], ["audience", "the reader or viewer who needs to understand the portfolio"]],
    rows: [["Rubric area", "Strong evidence", "Revision question"], ["Clarity", "The artifact is easy to understand", "What sentence or label needs to be clearer?"], ["Accuracy", "Data and terms are correct", "What fact should be checked?"], ["Evidence", "Claims are supported", "Where is the proof?"], ["Audience", "The artifact explains why it matters", "Would another person understand it?"]],
    scenario: "A student's occupation comparison has good data but unclear labels, missing sources, and a conclusion that does not match the table.",
    examples: [["Revise labels", "Changing Salary to Regional median salary makes the table clearer.", "Do not leave vague headings."], ["Fix evidence", "If the conclusion says highest growth, the growth data must show it.", "Do not make claims the table cannot support."], ["Improve audience access", "A short note can explain why the artifact belongs in the portfolio.", "Do not submit raw data with no explanation."]],
    tasks: ["Use a revision rubric on two artifacts.", "Revise one weak artifact label, explanation, or evidence connection.", "Write a revision note explaining what changed and why."]
  },
  {
    u: 6, l: 3, title: "Presenting a Career and Academic Plan", standards: ["MLA.CPP.PORT.3"],
    benchmark: "Portfolio evidence vehicle for CPALMS/FDOE Career and Education Planning 01.0-04.0",
    visual: "presentation planner",
    objective: "present a career and academic plan using a clear portfolio structure and evidence-based explanation",
    vocab: [["presentation purpose", "the reason the portfolio is being shared"], ["audience need", "what the viewer must understand"], ["evidence sequence", "the order in which evidence is presented"]],
    rows: [["Presentation part", "Purpose", "Evidence to include"], ["Opening", "Name the career direction and main claim", "Self-knowledge summary"], ["Evidence body", "Prove the plan is researched", "Occupation, pathway, academic, and funding evidence"], ["Reflection", "Show readiness and next steps", "Gap/action table"], ["Closing", "State the next decision or action", "Final plan summary"]],
    scenario: "A student has strong artifacts but presents them in random order. The audience cannot tell what the career goal is or how the plan supports it.",
    examples: [["Open with a claim", "My current goal is to explore diagnostic medical sonography because my evidence shows strong fit.", "Do not begin by reading every artifact title."], ["Sequence evidence", "Self-knowledge should come before occupation and pathway evidence.", "Do not make the audience guess the connection."], ["Close with next steps", "A presentation should end with actions, not just a thank you.", "Do not stop before explaining what happens next."]],
    tasks: ["Create a presentation outline with opening, evidence body, reflection, and closing.", "Choose three artifacts to present and explain why.", "Write a 60-second presentation script using evidence."]
  },
  {
    u: 6, l: 4, title: "Readiness Gaps and Next Steps", standards: ["MLA.CPP.PORT.4"],
    benchmark: "Portfolio evidence vehicle for CPALMS/FDOE Career and Education Planning 01.0-04.0",
    visual: "gap action table",
    objective: "reflect on readiness gaps and next steps for academic, career, financial, and portfolio growth",
    vocab: [["readiness gap", "a missing skill, requirement, experience, or information needed for the plan"], ["next step", "a specific action that moves the plan forward"], ["reflection evidence", "details showing what was learned and what needs to happen next"]],
    rows: [["Gap type", "Example", "Next-step action"], ["Academic", "Need stronger math sequence for STEM pathway", "Ask about next math placement and support"], ["Career", "Need firsthand information about daily tasks", "Schedule informational interview questions"], ["Financial", "Need scholarship eligibility details", "Research state scholarship requirements"], ["Portfolio", "Need clearer artifact labels", "Revise labels using rubric"]],
    scenario: "A student's plan is promising, but the student has not checked program prerequisites, scholarship requirements, or whether the chosen career includes shift work.",
    examples: [["Name the gap", "Program prerequisite unknown is a readiness gap because it could block entry.", "Do not write I need to learn more with no detail."], ["Make the action specific", "Check the provider admissions page for math prerequisite is stronger than research college.", "Do not write vague next steps."], ["Connect reflection to evidence", "The gap should come from something discovered in the portfolio.", "Do not invent a gap unrelated to the plan."]],
    tasks: ["Complete a gap action table with academic, career, financial, and portfolio gaps.", "Write one specific next step for each gap.", "Explain which next step is most urgent and why."]
  },
  {
    u: 6, l: 5, title: "Synthesis: Final Career Planning Portfolio", standards: ["MLA.CPP.PORT.1", "MLA.CPP.PORT.2", "MLA.CPP.PORT.3", "MLA.CPP.PORT.4"],
    benchmark: "Portfolio evidence vehicle for complete CPALMS/FDOE Career and Education Planning personalized academic and career plan",
    visual: "final portfolio rubric",
    objective: "submit a final portfolio and explain how the evidence supports a personalized academic and career plan",
    vocab: [["final portfolio", "the completed organized evidence set for the career and academic plan"], ["portfolio defense", "an explanation of how evidence supports the plan"], ["mastery evidence", "proof that the course standards have been learned and applied"]],
    rows: [["Rubric area", "Mastery evidence", "Final check"], ["Self-knowledge", "Interests, skills, values, impact profile", "Does it explain personal fit?"], ["Occupation evidence", "Labor-market and occupation comparison", "Does it use data?"], ["Pathway plan", "Credential, provider, and funding evidence", "Is it realistic?"], ["Academic plan", "Graduation, course, opportunity, and activity plan", "Does school planning support the goal?"], ["Reflection", "Readiness gaps and next steps", "Are actions specific?"]],
    scenario: "A student prepares a final career planning portfolio for review. The portfolio must prove the plan with evidence, not just display finished pages.",
    examples: [["Check coverage", "Every major course standard should appear through at least one artifact.", "Do not submit a portfolio missing an entire unit of evidence."], ["Defend the plan", "The defense should explain why the evidence supports the career and academic plan.", "Do not simply describe what files are included."], ["Use revision evidence", "A final portfolio should show that weak artifacts were improved.", "Do not submit first drafts without checking clarity and accuracy."]],
    tasks: ["Complete the final portfolio rubric.", "Write a portfolio defense paragraph using evidence from at least four sections.", "Prepare the final checkpoint response explaining readiness gaps and next steps."],
    synthesis: true
  },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function css() {
  return `body{font-family:Arial,sans-serif;line-height:1.58;color:#17202a;max-width:980px;margin:0 auto;padding:24px}
.box,.mla-visual,.task-box{border:1px solid #8aa4bd;background:#f6fbff;padding:14px;margin:14px 0}
.note{border-left:6px solid #345b73;background:#f8fafc;padding:12px;margin:14px 0}
.mistake .correct{border-left:6px solid #15803d;padding-left:10px;background:#f0fdf4}
.mistake .incorrect{border-left:6px solid #b91c1c;padding-left:10px;background:#fef2f2}
table{border-collapse:collapse;width:100%;margin:10px 0}td,th{border:1px solid #9ca3af;padding:8px;text-align:left;vertical-align:top}th{background:#e5eef7}
h1{font-size:30px;margin-bottom:6px}h2{font-size:22px;margin-top:18px}h3{font-size:18px;margin-top:12px}
ul,ol{padding-left:24px}.small-check{font-size:.95rem;color:#374151}`;
}

function html(title, body) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>${esc(title)}</title><style>${css()}</style></head>
<body>${body}</body>
</html>
`;
}

function tor() {
  return `<div class="box tor-support"><p><strong>Teacher of Record Support:</strong> Ask your Teacher of Record for help after you have used the lesson explanation, examples, visual organizer, and self-check criteria. The Teacher of Record can help you review feedback, identify a misconception, plan remediation, confirm checkpoint expectations, and determine when you are ready for another attempt.</p></div>`;
}

function standardBlock(lesson) {
  return `<div class="box"><p><strong>Standards Covered in This Lesson:</strong> ${esc(lesson.standards.join("; "))}. ${esc(lesson.benchmark)}.</p><p><strong>Student-Friendly Standard Connection:</strong> This lesson teaches you to ${esc(lesson.objective)}. The support skills are reading career information, using evidence, interpreting tables or organizers, and explaining decisions clearly.</p></div>`;
}

function table(rows) {
  const [head, ...body] = rows;
  return `<table><thead><tr>${head.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function vocabList(lesson) {
  return `<table><thead><tr><th>Vocabulary</th><th>Meaning in this lesson</th></tr></thead><tbody>${lesson.vocab.map(([term, def]) => `<tr><td>${esc(term)}</td><td>${esc(def)}</td></tr>`).join("")}</tbody></table>`;
}

function visual(lesson) {
  return `<div class="mla-visual content-visual"><h3>${esc(lesson.visual)}</h3>${table(lesson.rows)}</div>`;
}

function p01(lesson) {
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P01`, `<h1>P01 Lesson Overview</h1><h2>${esc(lesson.title)}</h2>${standardBlock(lesson)}<div class="box"><p><strong>What You Will Learn:</strong> You will learn how to ${esc(lesson.objective)} using evidence instead of guesses.</p><p><strong>What You Will Do:</strong> You will study a scenario, use the ${esc(lesson.visual)}, complete notebook work, practice with feedback, and prepare a checkpoint response.</p><p><strong>How You Will Show Mastery:</strong> You will use accurate vocabulary, cite specific evidence, complete the lesson tasks, and reach at least 80% mastery on required assessments.</p></div>${visual(lesson)}${tor()}`);
}

function p02(lesson) {
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P02`, `<h1>P02 Notebook Task - Part 1</h1><h2>${esc(lesson.title)}</h2>${standardBlock(lesson)}<h2>Notebook Title</h2><p>${esc(lesson.title)}: Evidence Before Decision</p><h2>Vocabulary</h2>${vocabList(lesson)}<h2>Teaching Sequence</h2><ol><li><strong>Start with the standard.</strong> The lesson asks you to ${esc(lesson.objective)}. That means your answer must show evidence, not just preference.</li><li><strong>Read the scenario.</strong> ${esc(lesson.scenario)}</li><li><strong>Separate facts from assumptions.</strong> Facts are details given in the scenario or table. Assumptions are guesses that may sound reasonable but are not proven.</li><li><strong>Use the visual organizer.</strong> The organizer gives you a repeatable method for sorting evidence before writing an answer.</li></ol>${visual(lesson)}<div class="note"><strong>Notebook Check:</strong> Write one sentence naming the strongest evidence in the scenario and one sentence explaining what that evidence does and does not prove.</div>${tor()}`);
}

function p03(lesson) {
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P03`, `<h1>P03 Notebook Task - Part 2</h1><h2>${esc(lesson.title)}</h2><h2>Continue the Teaching Sequence</h2><ol><li><strong>Match evidence to the correct category.</strong> Use the ${esc(lesson.visual)} to decide which part of the standard the evidence supports.</li><li><strong>Explain why the evidence matters.</strong> A complete career-planning answer does not only name an option; it explains why the option fits the evidence.</li><li><strong>Check for missing information.</strong> If the evidence does not answer an important question, name that gap instead of pretending the plan is final.</li></ol>${visual(lesson)}<h2>Common Mistake</h2><div class="mistake"><p class="incorrect"><strong>Incorrect example:</strong> I choose this because it seems like a good career.</p><p class="correct"><strong>Correct example:</strong> I choose this as the next option to research because the evidence shows a match between the lesson standard, the scenario details, and the planning criteria in the organizer.</p></div><h2>Teachable Explanation</h2><p>The incorrect answer is too general. The correct answer names the evidence path: standard, scenario, organizer, and decision. This keeps the lesson inside the mapped standard and prevents unsupported career advice.</p><div class="note"><strong>Self-Check:</strong> If another student could ask, "How do you know?", your answer must point to a specific detail in the scenario, table, organizer, or standard.</div>${tor()}`);
}

function p04(lesson) {
  const examples = lesson.examples.map(([focus, answer, mistake], index) => `<h2>Worked Example ${index + 1}: ${esc(focus)}</h2><p><strong>Prompt:</strong> ${esc(lesson.scenario)}</p><p><strong>Step 1 - Identify the task:</strong> This example focuses on ${esc(focus.toLowerCase())}.</p><p><strong>Step 2 - Find the evidence:</strong> Use the ${esc(lesson.visual)} and the scenario details before writing the answer.</p><p><strong>Step 3 - Explain the reasoning:</strong> ${esc(answer)}</p><p><strong>Step 4 - Interpret the answer:</strong> This supports ${esc(lesson.standards.join(", "))} because it connects a planning decision to evidence.</p><div class="mistake"><p class="incorrect"><strong>Incorrect:</strong> ${esc(mistake)}</p><p class="correct"><strong>Correct:</strong> Name the evidence, explain the connection, and state what the evidence suggests for the plan.</p></div>`).join("\n");
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P04`, `<h1>P04 Worked Example</h1><h2>${esc(lesson.title)}</h2>${examples}${visual(lesson)}<h2>Teachable Explanation</h2><p>All three worked examples use the same mastery routine: identify the task, locate evidence, explain reasoning, and interpret the decision. That routine matters because career planning can become opinion-based if the student skips evidence.</p><div class="note"><strong>Mastery Check:</strong> Before moving on, make sure you can explain why each example answer is supported and why the incorrect example is not strong enough.</div>${tor()}`);
}

function p05(lesson) {
  const quizText = lesson.synthesis ? "After Guided Practice, you will prepare for the Unit Assessment. This synthesis lesson does not have a Lesson Quiz." : "After Guided Practice, you will complete the Lesson Quiz for this lesson.";
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P05`, `<h1>P05 Guided Practice</h1><h2>${esc(lesson.title)}</h2>${standardBlock(lesson)}<p>Guided Practice helps you check whether you can apply the lesson evidence routine before graded mastery work. Read each question carefully, use the ${esc(lesson.visual)}, and study the feedback for every answer choice.</p><div class="task-box"><h2>Before Guided Practice</h2><ul><li>Review the vocabulary table from P02.</li><li>Review the worked examples from P04.</li><li>Use the organizer to identify evidence before choosing an answer.</li><li>Write down one question you still need to clarify.</li></ul></div><div class="task-box"><h2>After Guided Practice</h2><p>${esc(quizText)}</p><p class="small-check">Do not move to the next graded step until you can explain the correct answer and the misconception behind at least one incorrect answer.</p></div>${tor()}`);
}

function p06(lesson) {
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P06`, `<h1>P06 Independent Work</h1><h2>${esc(lesson.title)}</h2><p>Complete the independent work in your notebook or assigned submission space. Your work must be self-contained, specific, and based on the lesson standard.</p><h2>Instructions</h2><ol><li>Use the vocabulary and visual organizer from the lesson.</li><li>Answer each part with complete evidence, not one-word responses.</li><li>Check that every answer stays within ${esc(lesson.standards.join(", "))}.</li></ol><h2>Part A</h2><p>${esc(lesson.tasks[0])}</p><h2>Part B</h2><p>${esc(lesson.tasks[1])}</p><h2>Part C</h2><p>${esc(lesson.tasks[2])}</p><div class="mla-visual"><h3>Independent Work Evidence Checklist</h3><table><thead><tr><th>Requirement</th><th>Complete when...</th></tr></thead><tbody><tr><td>Evidence</td><td>You used a specific scenario detail, table detail, organizer row, or researched fact.</td></tr><tr><td>Reasoning</td><td>You explained why the evidence supports your answer.</td></tr><tr><td>Vocabulary</td><td>You used lesson vocabulary accurately.</td></tr><tr><td>Standard fit</td><td>Your answer stays inside the mapped lesson standard.</td></tr></tbody></table></div>${tor()}`);
}

function p07(lesson) {
  const checkpoint = lesson.synthesis ? "Create a synthesis response that combines the unit evidence into one clear planning conclusion." : "Create a checkpoint response that applies this lesson standard to a new but similar planning scenario.";
  return html(`U${pad(lesson.u)} L${pad(lesson.l)} P07`, `<h1>P07 Checkpoint</h1><h2>${esc(lesson.title)}</h2><div class="box"><p><strong>Teacher of Record Graded:</strong> This checkpoint is reviewed for mastery evidence.</p><p><strong>Checkpoint Task:</strong> ${esc(checkpoint)} Your response must include a claim, at least two pieces of evidence, reasoning that connects the evidence to the claim, and a final next-step statement.</p><p><strong>Notebook Evidence Submission:</strong> Submit your P06 work and the checkpoint response according to your course directions.</p><p><strong>Checkpoint Submission:</strong> Your submission should be clear enough that the Teacher of Record can see what evidence you used and how you reasoned from it.</p><p><strong>Submission Workflow:</strong> Submit the checkpoint, review feedback, make corrections if required, and follow the retake or resubmission directions provided by the Teacher of Record.</p><p><strong>Mastery Criteria:</strong> 80% mastery requires accurate vocabulary, correct use of evidence, complete reasoning, and alignment to ${esc(lesson.standards.join(", "))}.</p><p><strong>Correction / Resubmission:</strong> If your work does not meet mastery, revise the evidence, reasoning, or standard connection before resubmitting.</p><p><strong>TOR Intervention:</strong> The Teacher of Record may require review, remediation, or a conference before another attempt.</p></div><div class="mla-visual"><h3>Checkpoint Rubric</h3><table><thead><tr><th>Criterion</th><th>Meets Mastery</th><th>Needs Revision</th></tr></thead><tbody><tr><td>Claim</td><td>Clear and aligned to the lesson task</td><td>Vague, missing, or outside the lesson</td></tr><tr><td>Evidence</td><td>Specific details from the lesson scenario, organizer, or data</td><td>General opinion or unsupported preference</td></tr><tr><td>Reasoning</td><td>Explains why the evidence supports the answer</td><td>Lists details without explanation</td></tr><tr><td>Next step</td><td>Names a realistic planning action or question</td><td>Ends without a useful action</td></tr></tbody></table></div>${tor()}`);
}

function lessonJson(lesson) {
  return {
    course: "Career Planning and Portfolio",
    credit: 0.5,
    unit: lesson.u,
    lesson: lesson.l,
    title: lesson.title,
    unit_title: unitTitles[lesson.u],
    standards: lesson.standards,
    benchmark: lesson.benchmark,
    pages: ["P01.html", "P02.html", "P03.html", "P04.html", "P05.html", "P06.html", "P07.html"],
    visual_required: lesson.visual,
    no_live_teacher_dependency: true,
    mastery_threshold: "80%",
    synthesis_lesson: Boolean(lesson.synthesis),
    note: lesson.synthesis ? "Guided Practice and Unit Assessment only. No Lesson Quiz for Lesson 05 in a 0.5-credit course." : "Guided Practice and Lesson Quiz included."
  };
}

function quizJson(lesson) {
  return {
    course: "Career Planning and Portfolio",
    unit: lesson.u,
    lesson: lesson.l,
    title: lesson.title,
    standards: lesson.standards,
    guided_practice_questions: 5,
    lesson_quiz_questions: lesson.synthesis ? 0 : 25,
    unit_assessment_questions: lesson.synthesis ? 40 : 0,
    format: "Moodle XML only",
    no_lesson_quiz: Boolean(lesson.synthesis)
  };
}

function writeLesson(lesson) {
  const dir = path.join(unitsRoot, `Unit ${pad(lesson.u)}`, `Lesson ${pad(lesson.l)}`);
  fs.mkdirSync(dir, { recursive: true });
  const pages = [p01, p02, p03, p04, p05, p06, p07];
  pages.forEach((fn, idx) => fs.writeFileSync(path.join(dir, `P${pad(idx + 1)}.html`), fn(lesson), "utf8"));
  fs.writeFileSync(path.join(dir, "lesson.json"), JSON.stringify(lessonJson(lesson), null, 2) + "\n", "utf8");
  fs.writeFileSync(path.join(dir, "quiz.json"), JSON.stringify(quizJson(lesson), null, 2) + "\n", "utf8");
}

for (const lesson of lessons) writeLesson(lesson);

console.log(JSON.stringify({
  course: "Career Planning and Portfolio",
  lessons: lessons.length,
  htmlPages: lessons.length * 7,
  metadataFiles: lessons.length * 2,
  unitsRoot,
}, null, 2));
