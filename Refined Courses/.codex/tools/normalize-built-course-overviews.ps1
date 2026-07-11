$courses = @(
  @{
    Title='English III'; Code='ENG3'; Credit='1.0 High School English Language Arts Credit'; Type='Mastery-Based High School English Language Arts Course'
    Paths=@('ENGLISH III\Course Production\Course-Overview.md')
    Description="English III advances students' ability to read complex literary and informational texts, evaluate author choices, analyze Classical Period speeches and essays, conduct literary research, write literary and complex text analyses, use language precisely, and communicate ideas effectively."
    Standards='Florida B.E.S.T. Grade 11 English Language Arts Benchmarks; Common Core Grade 11-12 English Language Arts Standards; SAT Reading and Writing expectations; ACT English and Reading expectations'
    Objectives=@('Paraphrase complex Grade 11 literary and informational texts accurately.','Evaluate how literary elements, structure, rhetoric, and style shape meaning.','Analyze universal themes, juxtaposition, character perspective, poetry, allegory, and contemporaneous authors.','Evaluate Classical Period speeches, essays, arguments, claims, reasoning, and rhetoric.','Conduct literary research using primary and secondary sources.','Write complex narratives, literary analyses, complex text analyses, and research-supported responses.','Revise writing for clarity, structure, style, audience, and standard English control.','Present and publish information using oral, digital, and multimedia formats.')
    Prereq=@('English I and English II close reading, evidence use, literary analysis, rhetoric, research, writing, revision, vocabulary, and digital communication skills.')
    Units=@('Foundations of Grade 11 Close Reading, Evidence, and Academic Voice','Literary Analysis, Juxtaposition, Poetry, and Complex Narrative','Classical Speeches, Essays, Rhetoric, and Argument','Literary Research and Complex Text Analysis','Language, Vocabulary, Style, and Revision','Synthesis, Oral Presentation, and Digital Publication')
    Readiness='advanced English coursework, college reading and writing, research, public communication, and digital publication'
  },
  @{
    Title='English IV'; Code='ENG4'; Credit='1.0 High School English Language Arts Credit'; Type='Mastery-Based High School English Language Arts Course'
    Paths=@('ENGLISH IV\Course Production\Course-Overview.md')
    Description='English IV prepares students for advanced reading, writing, research, rhetoric, presentation, and publication through complex literary, informational, argumentative, and multimedia tasks.'
    Standards='Florida B.E.S.T. Grade 12 English Language Arts Benchmarks; Common Core Grade 11-12 English Language Arts Standards; SAT Reading and Writing expectations; ACT English and Reading expectations'
    Objectives=@('Analyze complex literary and informational texts with precision and evidence.','Evaluate advanced author choices, rhetoric, argument structure, perspective, and style.','Write narrative, argumentative, analytical, research-based, and multimedia texts for specific audiences.','Conduct topical research using credible sources and responsible synthesis.','Revise writing for clarity, sophistication, coherence, tone, and standard English control.','Present information orally and digitally using purposeful organization and evidence.','Evaluate digital and multimedia communication for audience impact.','Prepare for college, career, and civic communication demands.')
    Prereq=@('English I, English II, and English III reading, writing, research, rhetoric, analysis, revision, vocabulary, and communication skills.')
    Units=@('Foundations of Grade 12 Close Reading, Evidence, and Academic Voice','Advanced Literary Evaluation, Perspective, Poetry, and Narrative Synthesis','Advanced Informational Text, Rhetoric, and Argument Evaluation','Topical Research, Argument, and In-Depth Text Analysis','Language, Vocabulary, Style, and Revision','Synthesis, Presentation, Digital Evaluation, and Multimedia Publication')
    Readiness='college composition, workplace communication, advanced research, digital publication, and senior-level academic independence'
  },
  @{
    Title='Biology'; Code='BIO'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('BIOLOGY\Course Production\Course-Overview.md')
    Description='Biology is a laboratory science course focused on living systems, scientific inquiry, data analysis, cells, homeostasis, cellular energy, DNA, genetics, evolution, classification, ecology, interdependence, and human impact.'
    Standards='CPALMS Biology 1; Florida science benchmarks; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Ask testable biological questions and design evidence-based investigations.','Apply lab safety, variables, measurement, data tables, graphs, and scientific tools.','Explain cell theory, cell structure, transport, and homeostasis.','Analyze ATP, photosynthesis, respiration, enzymes, and matter and energy flow.','Explain DNA, gene expression, mutation, inheritance, mitosis, meiosis, biotechnology, and reproduction.','Evaluate evidence for evolution, natural selection, classification, and diversity.','Analyze ecosystems, populations, food webs, biodiversity, sustainability, and human impact.','Communicate biological explanations using evidence, models, data, and technical vocabulary.')
    Prereq=@('Middle school science readiness, scientific vocabulary, observations and evidence, tables, graphs, diagrams, measurement, and short evidence-based explanations.')
    Units=@('Scientific Thinking and Biology Foundations','Cells, Homeostasis, and Transport','Cellular Energy and Life Processes','DNA, Genetics, and Heredity','Evolution, Classification, and Diversity of Life','Ecology, Interdependence, and Human Impact')
    Readiness='scientific literacy, laboratory reasoning, health science readiness, data interpretation, and future science coursework'
  },
  @{
    Title='Chemistry'; Code='CHEM'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('CHEMISTRY\Course Production\Course-Overview.md')
    Description='Chemistry develops understanding of matter, measurement, atomic structure, periodic trends, bonding, compounds, reactions, quantitative chemistry, gases, solutions, acids, bases, equilibrium, and real-world chemical applications.'
    Standards='CPALMS Chemistry 1; Florida science benchmarks; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use measurement, significant figures, scientific notation, and lab safety procedures.','Analyze matter, properties, atomic structure, periodic trends, and electron arrangements.','Explain bonding, molecular structure, formulas, compounds, and nomenclature.','Interpret chemical reactions, conservation of mass, mole relationships, and stoichiometry.','Analyze thermochemistry, gases, phase behavior, solutions, and concentration.','Explain acids, bases, pH, reaction rates, catalysts, and equilibrium.','Use data, models, equations, and diagrams to support chemical reasoning.','Communicate chemical explanations using evidence and technical vocabulary.')
    Prereq=@('Algebra readiness, scientific measurement, data tables, graphs, variables, basic matter concepts, and evidence-based explanations.')
    Units=@('Scientific Thinking, Measurement, and Matter','Atomic Structure and the Periodic Table','Chemical Bonding and Compounds','Chemical Reactions and Quantitative Chemistry','Energy, Gases, and Solutions','Acids, Bases, Equilibrium, and Real-World Chemistry')
    Readiness='laboratory chemistry, data analysis, quantitative reasoning, health science, environmental science, and college science readiness'
  },
  @{
    Title='Physics'; Code='PHYS'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('PHYSICS\Course Production\Course-Overview.md')
    Description='Physics develops the ability to explain motion, forces, energy, momentum, thermal systems, waves, sound, light, optics, electricity, magnetism, matter, modern physics, and applied systems using evidence, mathematics, models, and data.'
    Standards='CPALMS Physics 1; Florida science benchmarks; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use measurement, variables, graphs, models, and lab safety to investigate physical systems.','Analyze motion using position, velocity, acceleration, scalar, and vector reasoning.','Explain Newton laws, force interactions, gravity, orbital relationships, and momentum.','Analyze work, energy, power, conservation, thermal systems, and collisions.','Explain waves, sound, electromagnetic waves, light, lenses, mirrors, and ray diagrams.','Analyze charge, fields, voltage, current, resistance, power, circuits, and electromagnetic applications.','Use mathematical models and data displays to support physics claims.','Communicate physics reasoning with equations, diagrams, evidence, and units.')
    Prereq=@('Algebra readiness, graph interpretation, unit conversion, proportional reasoning, measurement, and basic scientific inquiry skills.')
    Units=@('Scientific Thinking, Measurement, and Motion','Forces and Newtonian Mechanics','Work, Energy, Momentum, and Thermal Systems','Waves, Sound, Light, and Optics','Electricity, Magnetism, and Matter','Modern, Cosmic, and Applied Physics Systems')
    Readiness='college science, engineering thinking, technical problem solving, data interpretation, and applied quantitative reasoning'
  },
  @{
    Title='Earth/Space Science'; Code='ESS'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('EARTH SPACE SCIENCE\Course Production\Course-Overview.md')
    Description='Earth/Space Science teaches students to explain Earth systems, geology, plate tectonics, weather, climate, oceans, atmosphere, Earth history, astronomy, solar system patterns, galaxies, space exploration, and applied Earth-space systems using evidence and models.'
    Standards='CPALMS Earth/Space Science; Florida science benchmarks; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use inquiry, lab safety, models, measurement, and data displays to study Earth and space systems.','Explain Earth spheres, system interactions, geologic processes, plate tectonics, and Florida geology.','Analyze weather, climate, oceans, atmosphere, severe weather, and climate evidence.','Interpret fossils, Earth history, scientific theories, and evidence of change over time.','Explain Big Bang evidence, astronomical distances, stars, the Sun, planets, and Earth-Moon-Sun relationships.','Analyze space exploration, electromagnetic evidence, radiation, waves, motion, gravity, and applied systems.','Use maps, diagrams, models, graphs, and data to support scientific explanations.','Communicate Earth and space science conclusions using evidence and technical vocabulary.')
    Prereq=@('Middle school Earth and space science readiness, map and graph interpretation, measurement, models, observations, and evidence-based explanation.')
    Units=@('Scientific Thinking and Earth Systems Foundations','Geology, Plate Tectonics, and Earth Structure','Weather, Climate, Oceans, and Atmosphere','Earth History and Change Over Time','Astronomy, Solar System, and Stars','Galaxies, Space Exploration, and Earth-Space Systems')
    Readiness='scientific literacy, environmental reasoning, space science awareness, data analysis, and future science coursework'
  },
  @{
    Title='Environmental Science'; Code='ENV'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('ENVIRONMENTAL SCIENCE\Course Production\Course-Overview.md')
    Description='Environmental Science teaches students to analyze environmental systems, ecosystems, biodiversity, populations, human impact, resources, pollution, climate, sustainability, policy, and evidence-based environmental solutions.'
    Standards='Florida environmental science benchmarks; CPALMS-aligned science expectations; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use inquiry, lab safety, monitoring, evidence, data, and models to study environmental systems.','Analyze ecosystems, energy flow, organism relationships, biodiversity, and ecosystem change.','Explain population dynamics, carrying capacity, human population patterns, and environmental health.','Evaluate natural resources, energy choices, land use, forests, wildlife, and sustainability decisions.','Analyze pollution, climate, ocean-atmosphere systems, waste, technology, and environmental change.','Evaluate environmental policy, conservation, lifestyle impacts, monitoring, and future solutions.','Use charts, maps, data displays, models, and case evidence to support claims.','Communicate environmental conclusions using scientific evidence and responsible reasoning.')
    Prereq=@('Middle school life, Earth, and physical science readiness; graph and map reading; data interpretation; scientific vocabulary; and evidence-based explanations.')
    Units=@('Environmental Science Foundations and Scientific Inquiry','Ecosystems, Energy Flow, and Biodiversity','Population Dynamics and Human Impact','Natural Resources and Resource Management','Pollution, Climate, and Environmental Change','Sustainability, Environmental Policy, and Future Solutions')
    Readiness='environmental literacy, civic decision-making, scientific data analysis, sustainability reasoning, and future science coursework'
  },
  @{
    Title='Marine Science'; Code='MAR'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('MARINE SCIENCE\Course Production\Course-Overview.md')
    Description='Marine Science teaches students to analyze ocean systems, marine inquiry, ocean structure, chemistry, physical systems, ecosystems, biodiversity, food webs, fisheries, conservation, exploration, technology, and global ocean issues.'
    Standards='Florida marine science benchmarks; CPALMS-aligned science expectations; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use marine inquiry, safety, field and lab data, maps, models, and source reliability to study ocean systems.','Analyze ocean basins, zones, currents, waves, tides, salinity, density, water quality, geology, and coasts.','Explain marine habitats, coral reefs, estuaries, open ocean, deep sea, biodiversity, adaptation, and ecosystem change.','Analyze populations, limiting factors, species interactions, food webs, productivity, nutrient cycles, and water quality.','Evaluate pollution, fisheries, aquaculture, resource use, endangered species, restoration, monitoring, and policy.','Explain ocean exploration tools, sonar, satellites, sensors, ROVs, deep-ocean evidence, and global ocean systems.','Use maps, diagrams, charts, data displays, and marine evidence to support claims.','Communicate marine science explanations using evidence and technical vocabulary.')
    Prereq=@('Middle school science readiness, graph and map interpretation, data tables, observations, source evidence, and basic Earth and life science vocabulary.')
    Units=@('Marine Science Foundations and Ocean Inquiry','Ocean Structure, Chemistry, and Physical Systems','Marine Ecosystems and Biodiversity','Marine Processes, Food Webs, and Energy Flow','Human Impacts, Fisheries, and Marine Conservation','Ocean Exploration, Marine Technology, and Global Ocean Systems')
    Readiness='marine science literacy, environmental reasoning, field-data interpretation, resource decision-making, and future science coursework'
  },
  @{
    Title='Anatomy and Physiology'; Code='ANP'; Credit='1.0 High School Science Credit'; Type='Mastery-Based High School Laboratory Science Course'; Lab=$true
    Paths=@('ANATOMY AND PHYSIOLOGY\Course Production\Course-Overview.md')
    Description='Anatomy and Physiology teaches students to explain human body organization, homeostasis, cells, tissues, integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, respiratory, immune, digestive, urinary, reproductive, and whole-body integration systems.'
    Standards='Florida anatomy and physiology science expectations; CPALMS-aligned science practices; Florida B.E.S.T. embedded literacy expectations; Common Core Literacy in Science and Technical Subjects; ACT Science readiness; SAT science reading and data expectations'
    Objectives=@('Use scientific inquiry, lab safety, anatomical models, data, and evidence to study human body systems.','Explain organization levels, homeostasis, macromolecules, enzymes, and health evidence.','Analyze cells, tissues, integumentary structures, cell-cycle models, and histology evidence.','Explain skeletal and muscular systems, bone tissue, major muscles, contraction, and movement.','Analyze nervous and endocrine systems, reflexes, synapses, sensory systems, hormones, and feedback.','Explain cardiovascular, respiratory, lymphatic, and immune systems using diagrams, data, and case evidence.','Analyze digestive, urinary, reproductive, disease-prevention, and whole-body homeostasis cases.','Communicate anatomical and physiological explanations using evidence, models, diagrams, and technical vocabulary.')
    Prereq=@('Life science readiness, cell vocabulary, data interpretation, diagrams, models, measurement, health vocabulary, and evidence-based explanation.')
    Units=@('Human Body Organization, Homeostasis, and Scientific Inquiry','Cells, Tissues, and Integumentary System','Skeletal and Muscular Systems','Nervous and Endocrine Systems','Cardiovascular, Respiratory, and Immune Systems','Digestive, Urinary, Reproductive Systems and Whole-Body Integration')
    Readiness='health science readiness, biological literacy, body-system reasoning, data interpretation, and future science coursework'
  }
)

$courses += @(
  @{Title='World History'; Code='WH'; Credit='1.0 High School Social Studies Credit'; Type='Mastery-Based High School World History Course'; Paths=@('WORLD HISTORY\Course-Overview.md','WORLD HISTORY\Course Production\Course-Overview.md'); Description='World History develops students ability to explain global change over time using historical evidence, geography, chronology, primary and secondary sources, maps, timelines, data, comparison, and cause-and-effect reasoning.'; Standards='CPALMS World History; Florida social studies expectations; Florida B.E.S.T. literacy support; Common Core Literacy in History/Social Studies; SAT evidence and data expectations; ACT reading and research expectations'; Objectives=@('Use historical thinking, chronology, geography, sourcing, and evidence to explain global developments.','Analyze civilizations, societies, religions, empires, trade, conflict, revolution, industrialization, imperialism, war, globalization, and contemporary issues.','Interpret maps, timelines, charts, source excerpts, political visuals, and historical data displays.','Compare historical causes, consequences, continuities, changes, and perspectives.','Write evidence-based historical explanations using accurate vocabulary and source support.','Evaluate primary and secondary sources for purpose, perspective, reliability, and usefulness.','Connect historical developments to civic, geographic, economic, and cultural patterns.','Demonstrate mastery through unit assessments, checkpoints, quizzes, and source-based tasks.'); Prereq=@('Middle school social studies readiness, map and timeline reading, basic source analysis, paragraph writing, academic vocabulary, and evidence-based explanation.'); Units=@('Historical Thinking, Geography, and Medieval Foundations','Islamic Civilizations, African Kingdoms, and American Civilizations','Japan, Renaissance, Reformation, Scientific Revolution, and Exploration','Absolutism, Enlightenment, Revolutions, Industrialization, and Imperialism','World War I, Interwar Crisis, World War II, and the Holocaust','Cold War, Decolonization, Globalization, Genocide, and Contemporary World Issues'); Readiness='historical literacy, civic reasoning, source analysis, college reading, writing, and evidence-based communication'},
  @{Title='U.S. History'; Code='USH'; Credit='1.0 High School Social Studies Credit'; Type='Mastery-Based High School United States History Course'; Paths=@('U.S. HISTORY\Course-Overview.md','U.S. HISTORY\Course Production\Course-Overview.md'); Description='U.S. History develops students ability to explain United States history using historical evidence, constitutional context, geography, chronology, source analysis, civic reasoning, economics, maps, timelines, charts, and historical argument.'; Standards='CPALMS United States History; Florida social studies expectations; Florida B.E.S.T. literacy support; Common Core Literacy in History/Social Studies; SAT evidence and data expectations; ACT reading and research expectations'; Objectives=@('Use historical thinking, chronology, geography, and source analysis to explain U.S. developments.','Analyze founding principles, constitutional change, expansion, reform, conflict, industrialization, world wars, civil rights, contemporary issues, and civic decision-making.','Interpret maps, timelines, source excerpts, data charts, political visuals, and historical evidence.','Evaluate causes, consequences, continuity, change, perspective, and historical significance.','Write evidence-based explanations and arguments using accurate historical vocabulary.','Evaluate primary and secondary sources for reliability, purpose, perspective, and usefulness.','Connect U.S. history to civic responsibilities, government, economics, rights, and policy choices.','Demonstrate mastery through standards-aligned lessons, checkpoints, quizzes, and unit assessments.'); Prereq=@('Middle school U.S. history and civics readiness, map and timeline reading, source analysis, academic vocabulary, and evidence-based writing.'); Units=@('Foundations, Reconstruction, and the Rise of Modern America','Industrialization, Immigration, Progressivism, and Imperialism','World War I, the 1920s, Great Depression, and New Deal','World War II, Cold War, and Postwar America','Civil Rights, Social Change, and Modern Political Development','Contemporary America, Global Issues, and Civic Synthesis'); Readiness='historical literacy, civic reasoning, source analysis, college reading, writing, and evidence-based communication'},
  @{Title='U.S. Government'; Code='USG'; Credit='0.5 High School Social Studies Credit'; Type='Mastery-Based High School U.S. Government Course'; Half=$true; Paths=@('U.S. GOVERNMENT\Course Production\Course-Overview.md'); Description='U.S. Government teaches constitutional principles, civic responsibility, rights, branches of government, federalism, elections, public policy, Florida government, comparative systems, and civic action through direct, student-facing instruction.'; Standards='CPALMS U.S. Government; Florida social studies expectations; Florida B.E.S.T. literacy support; Common Core Literacy in History/Social Studies; SAT evidence and data expectations; ACT reading and research expectations'; Objectives=@('Explain constitutional foundations, limited government, civic principles, and civic responsibility.','Analyze the Constitution, branches of government, checks and balances, separation of powers, and federalism.','Explain rights, liberties, responsibilities, landmark cases, and limits on government action.','Analyze political participation, elections, parties, public opinion, media, campaigns, and civic voice.','Evaluate public policy, budgets, federalism in action, court interpretation, and policy choices.','Compare government systems, explain Florida government, and plan lawful civic action.','Use charts, civic diagrams, political visuals, source excerpts, and decision matrices to support reasoning.','Demonstrate mastery through checkpoints, quizzes in Lessons 1-4, and unit assessments in Lesson 5.'); Prereq=@('Civics readiness, reading informational text, identifying claims and evidence, using academic vocabulary, and explaining civic examples.'); Units=@('Constitutional Foundations and Civic Principles','The Constitution, Branches, and Federal Power','Rights, Liberties, and Responsibilities','Political Participation, Elections, and Public Opinion','Public Policy, Federalism in Action, and Landmark Cases','Comparative Government, Florida Government, and Civic Action'); Readiness='civic literacy, responsible participation, source analysis, public policy reasoning, and college/career communication'},
  @{Title='Personal Financial Literacy and Economics'; Code='PFLE'; Credit='1.0 High School Social Studies and Financial Literacy Credit'; Type='Mastery-Based High School Personal Financial Literacy and Economics Course'; Paths=@('PERSONAL FINANCIAL LITERACY AND ECONOMICS\Course Production\Course-Overview.md'); Description='Personal Financial Literacy and Economics teaches students to use economics and personal finance evidence to make responsible decisions about income, budgeting, banking, credit, investing, insurance, consumer protection, markets, and major life choices.'; Standards='Florida personal financial literacy and economics expectations; CPALMS social studies and financial literacy support; Florida B.E.S.T. literacy support; Common Core literacy support; SAT evidence/data expectations; ACT reading/research expectations'; Objectives=@('Apply economic decision-making, incentives, opportunity cost, markets, and tradeoffs to financial choices.','Analyze earning income, careers, taxes, benefits, and financial stability.','Create and evaluate budgets, banking decisions, saving plans, and consumer choices.','Explain creditworthiness, borrowing costs, debt risk, consumer protection, and credit decisions.','Analyze investing, retirement, insurance, risk, return, and long-term planning.','Integrate economics and personal finance into realistic life decisions and capstone planning.','Use charts, tables, decision matrices, data displays, and financial scenarios to support choices.','Demonstrate mastery through standards-aligned checkpoints, quizzes, XML assessments, and unit tasks.'); Prereq=@('Basic arithmetic, percent reasoning, reading charts and tables, interpreting scenarios, and explaining decisions with evidence.'); Units=@('Economic Decision-Making and Market Thinking','Earning Income, Careers, Taxes, and Benefits','Budgeting, Banking, Saving, and Consumer Decisions','Credit, Borrowing, Debt, and Consumer Protection','Investing, Retirement, Insurance, and Risk Management','Life Decisions, Financial Systems, and Capstone Planning'); Readiness='financial independence, economic reasoning, consumer decision-making, career planning, and adult life readiness'},
  @{Title='Speech Communication'; Code='SPEECH'; Credit='1.0 High School Communication Credit'; Type='Mastery-Based High School Speech Communication Course'; Paths=@('SPEECH COMMUNICATION\Course Production\Course-Overview.md'); Description='Speech Communication develops students ability to listen actively, organize ideas, speak clearly, use evidence, adapt to audience, evaluate rhetoric, use sources responsibly, revise communication, and create oral, digital, collaborative, and multimedia presentations.'; Standards='Florida B.E.S.T. English Language Arts communication benchmarks; Common Core speaking/listening and literacy support; SAT evidence and communication expectations; ACT reading, English, and communication expectations'; Objectives=@('Apply audience awareness, active listening, voice, tone, language access, and communication purpose.','Organize informative speeches with coherent focus, structure, and supporting evidence.','Develop persuasive communication using claims, counterclaims, reasoning, rhetoric, and evidence.','Conduct research, evaluate sources, paraphrase information, and integrate evidence ethically.','Revise speeches and presentations for clarity, conventions, vocabulary precision, delivery, and impact.','Create digital and multimedia presentations tailored to purpose and audience.','Use rubrics, organizers, speaking plans, source notes, and presentation visuals to improve communication.','Demonstrate mastery through checkpoints, presentations, quizzes, and unit assessments.'); Prereq=@('Basic reading, writing, discussion, listening, paragraph organization, source use, and digital communication skills.'); Units=@('Foundations of Communication, Audience, and Listening','Speech Structure, Organization, and Informative Speaking','Rhetoric, Argument, and Persuasive Speaking','Research-Supported Speaking and Source Use','Delivery, Revision, Digital Presentation, and Publication','Professional, Multimedia, and Integrated Communication'); Readiness='public speaking, workplace communication, digital presentation, collaboration, and college communication'},
  @{Title='Creative Writing'; Code='CW'; Credit='1.0 High School English Elective Credit'; Type='Mastery-Based High School Creative Writing Course'; Paths=@('CREATIVE WRITING\Course Overview.md','CREATIVE WRITING\Course Production\Course-Overview.md'); Description='Creative Writing develops students ability to use voice, imagery, figurative language, narrative craft, poetry, creative nonfiction, style, revision, presentation, and publication to create original writing with purpose and audience awareness.'; Standards='Florida B.E.S.T. English Language Arts writing, language, vocabulary, communication, and presentation benchmarks; Common Core writing support; SAT writing expectations; ACT English/reading expectations'; Objectives=@('Develop writing habits, voice, imagery, figurative language, and vocabulary precision.','Create narratives with plot, character, conflict, point of view, pacing, tension, mood, and tone.','Write poetry using form, symbolism, sound devices, figurative language, connotation, and denotation.','Write creative nonfiction using memoir, reflection, real-world storytelling, and source awareness.','Revise writing for tone, sentence flow, clarity, style, feedback, and publication readiness.','Build a portfolio that shows growth across genres and revision cycles.','Present and publish creative work using oral, digital, and multimedia tools.','Demonstrate mastery through writing artifacts, checkpoints, quizzes, and unit assessments.'); Prereq=@('English writing foundations, sentence and paragraph control, vocabulary, reading comprehension, revision habits, and willingness to develop original writing.'); Units=@('Foundations of Creative Expression','Narrative Writing','Poetry and Language','Creative Nonfiction','Style and Revision','Portfolio and Publication'); Readiness='creative expression, portfolio development, publication readiness, communication, and advanced writing confidence'},
  @{Title='Journalism'; Code='JOUR'; Credit='1.0 High School English Elective Credit'; Type='Mastery-Based High School Journalism Course'; Paths=@('JOURNALISM\Course Overview.md','JOURNALISM\Course Production\Course-Overview.md'); Description='Journalism develops students ability to gather information, evaluate sources, write accurate news and feature content, identify bias, verify facts, conduct interviews, edit responsibly, make ethical decisions, and publish for an audience.'; Standards='Florida B.E.S.T. English Language Arts informational writing, research, language, vocabulary, communication, and presentation benchmarks; Common Core literacy support; SAT evidence expectations; ACT reading/English expectations'; Objectives=@('Explain journalism purpose, audience, factual reporting, and news values.','Write organized news content using clear leads, structure, transitions, and precise language.','Evaluate source reliability, bias, credibility, fact-checking, and verification.','Conduct interviews, develop questions, take notes, and integrate source information accurately.','Revise and edit for accuracy, fairness, clarity, ethics, and publication standards.','Create articles and multimedia products for a defined audience and purpose.','Use organizers, source notes, evidence charts, and publication rubrics to improve reporting.','Demonstrate mastery through reporting tasks, checkpoints, quizzes, and unit assessments.'); Prereq=@('English reading and writing foundations, source use, paragraph organization, vocabulary, digital tools, and willingness to verify information carefully.'); Units=@('Foundations of Journalism and News Writing','News Structure and Informational Writing','Source Evaluation, Bias, and Credibility','Reporting, Interviews, and Information Gathering','Editing, Ethics, and Media Responsibility','Publication, Presentation, and Media Production'); Readiness='media literacy, responsible publication, source evaluation, informational writing, and workplace communication'},
  @{Title='Psychology'; Code='PSY'; Credit='1.0 High School Social Sciences Credit'; Type='Mastery-Based High School Psychology Course'; Paths=@('PSYCHOLOGY\Course Production\Course-Overview.md'); Description='Psychology teaches students to use psychological science, research evidence, ethics, biological and cognitive models, developmental and social frameworks, and mental-health literacy to explain behavior and mental processes responsibly.'; Standards='CPALMS/FDOE social science expectations; Florida literacy support; Common Core literacy in social studies support; SAT evidence/data expectations; ACT reading/research expectations'; Objectives=@('Explain psychology as a scientific field using research methods, ethics, and evidence.','Analyze biological bases of behavior, sensation, perception, consciousness, and cognition.','Explain learning, memory, thinking, intelligence, motivation, emotion, and development.','Analyze personality, social psychology, culture, group influence, and behavior patterns.','Explain stress, coping, psychological disorders, mental-health literacy, and responsible support-seeking.','Use charts, diagrams, research-data displays, case examples, and evidence organizers to support claims.','Avoid unsupported diagnosis, stereotyping, and overgeneralization.','Demonstrate mastery through lesson evidence, checkpoints, quizzes, and Moodle XML assessments.'); Prereq=@('Reading informational text, interpreting charts and research summaries, using evidence, writing explanations, and applying respectful discussion norms.'); Units=@('Psychological Foundations, Research, and Ethics','Biology, Sensation, Perception, and Consciousness','Learning, Memory, Thinking, and Intelligence','Development, Motivation, Emotion, and Personality','Social Psychology, Culture, and Group Behavior','Mental Health, Stress, Disorders, Treatment, and Capstone Application'); Readiness='scientific literacy, social science reasoning, mental-health literacy, research interpretation, and responsible communication'},
  @{Title='Sociology'; Code='SOC'; Credit='1.0 High School Social Sciences Credit'; Type='Mastery-Based High School Sociology Course'; Paths=@('SOCIOLOGY\Course Production\Course-Overview.md'); Description='Sociology teaches students to use sociological imagination, research evidence, ethical inquiry, cultural analysis, group and institutional analysis, stratification evidence, and civic application to explain social patterns responsibly.'; Standards='CPALMS/FDOE social science expectations; Florida literacy support; Common Core literacy in social studies support; SAT evidence/data expectations; ACT reading/research expectations'; Objectives=@('Explain sociology as a social science using sociological imagination, evidence, and ethics.','Analyze culture, socialization, identity, roles, norms, values, and the life course.','Explain groups, organizations, deviance, social control, and social change.','Analyze stratification, inequality, social categories, opportunity, and mobility using evidence.','Explain social institutions including family, education, religion, economy, government, and health.','Analyze community, civic life, globalization, and social patterns responsibly.','Use charts, source excerpts, social-pattern diagrams, timelines, data displays, and evidence organizers.','Avoid stereotyping, unsupported claims, and overgeneralization.'); Prereq=@('Reading informational text, interpreting charts and social data, using evidence, writing explanations, and applying respectful discussion norms.'); Units=@('Sociological Foundations, Perspectives, Research, and Ethics','Culture, Socialization, Identity, Roles, and the Life Course','Groups, Organizations, Deviance, Social Control, and Change','Stratification, Inequality, Social Categories, and Opportunity','Social Institutions: Family, Education, Religion, Economy, Government, and Health','Community, Civic Life, Globalization, and Capstone Application'); Readiness='social science reasoning, civic literacy, research interpretation, respectful communication, and evidence-based analysis'}
)

function To-Bullets($items) {
  return ($items | ForEach-Object { "- $_" }) -join "`n"
}

function Build-Overview($course) {
  $lessonRange = if ($course.Half) { 'Lessons 1-4' } else { 'Lessons 1-7' }
  $finalLesson = if ($course.Half) { 'Lesson 5' } else { 'Lesson 8' }
  $lessonFinal = "$finalLesson is the synthesis lesson and contains the Unit Assessment instead of a Lesson Quiz."
  $unitLines = for ($i = 0; $i -lt $course.Units.Count; $i++) { "- Unit $($i + 1): $($course.Units[$i])" }
  $labText = if ($course.Lab) { "`n`nThis is a laboratory science course. Lessons include lab or virtual lab experiences, direct student-safe resource links when required, step-by-step directions for what students should do after opening a resource, data tables, diagrams, models, and evidence-based analysis tasks." } else { '' }

@"
# $($course.Code) - $($course.Title)
**Credit:** $($course.Credit)  
**Course Type:** $($course.Type)  

---

## Course Description

$($course.Description)

Instruction is designed for independent student mastery in an online learning environment. Lessons explicitly teach concepts, model skills, provide worked examples, address common mistakes, guide practice, support independent application, and verify mastery. Students may seek Teacher of Record support for clarification, checkpoint feedback, remediation, and retake workflow when needed.$labText

---

## Standards Alignment

As a registered private school in the State of Florida, Mindful Learning Academy follows Florida academic standards and official course expectations as the primary academic framework for this course.

To support students across the United States and prepare them for future academic success, MLA standards are also cross-referenced to:

- $($course.Standards)

Mindful Learning Academy uses the MLA Standards Framework, a competency-based system designed to organize learning outcomes, assessments, and mastery progression. Each MLA standard is mapped to one or more external academic frameworks to ensure comprehensive coverage and academic rigor.

Students residing in states that do not use Florida or Common Core standards should notify the Academy during enrollment. Upon request, MLA can provide information regarding how course competencies align with applicable state-specific academic standards.

Instruction emphasizes conceptual understanding, evidence-based reasoning, academic communication, real-world application, and mastery of the approved unit and lesson mapping.

---

## Learning Objectives / Outcomes

By the end of this course, students will be able to:

$(To-Bullets $course.Objectives)

---

## Prerequisite Knowledge / Skills

Students entering this course should have prior experience with the following skills. Foundational skills are reviewed, reinforced, and extended throughout the course as needed.

$(To-Bullets $course.Prereq)

Students are not expected to begin the course with mastery of all course standards. The course teaches required skills step by step and provides practice, examples, feedback, and mastery checks throughout the learning sequence.

---

## Course Structure

The course is organized into six units, each designed to build progressively toward standards mastery.

Approved unit sequence:

$($unitLines -join "`n")

Each unit begins with a Unit Pretest. $lessonRange then follow the standard MLA instructional workflow. $lessonFinal

This structure provides multiple opportunities to learn, practice, apply, revise, and demonstrate understanding before advancing.

---

## Lesson Workflow

$lessonRange follow the same learning sequence:

Lesson Overview  
->  
Notebook Task Part 1  
->  
Notebook Task Part 2  
->  
Worked Example  
->  
Guided Practice  
->  
Independent Work  
->  
Checkpoint  
->  
Notebook Evidence Submission  
->  
Checkpoint Submission  
->  
Lesson Quiz

This consistent structure helps students build understanding, receive feedback, demonstrate mastery, and prepare for success on unit assessments.

$finalLesson is the exception to the standard lesson workflow. $finalLesson is Putting It All Together and contains the Unit Assessment instead of a Lesson Quiz.

---

## Assessment Structure

Student learning is evaluated using multiple standards-aligned measures:

### Unit Pretests

Diagnostic assessments aligned to MLA standards and cross-referenced academic frameworks. Used to determine readiness, identify learning gaps, and evaluate eligibility for acceleration.

### Notebook Evidence Submissions (Teacher of Record Graded)

Includes:

- Notebook Task Part 1
- Notebook Task Part 2
- Independent Work

Students may also include additional notes, worked examples, annotations, planning work, source notes, data work, response drafts, revision notes, and practice work completed during instruction.

Notebook Evidence demonstrates engagement, organization, note-taking, reasoning, and the learning process.

### Checkpoint Submissions (Teacher of Record Graded)

Application-based mastery tasks requiring students to demonstrate reasoning, communication, evidence use, and understanding of the lesson standards.

Checkpoint Submission demonstrates application of course skills in contexts that require explanation, support, organization, and communication.

### Guided Practice

Guided Practice provides immediate lesson-level practice with teachable feedback before independent work and assessment.

### Lesson Quizzes

Standards-aligned quizzes appear in $lessonRange and verify mastery of taught lesson skills before students advance.

### Unit Assessments

Comprehensive evaluations measure mastery of standards taught throughout the unit. Unit Assessment appears in $finalLesson, Putting It All Together.

### Grading Breakdown

Notebook Evidence = 10%

Checkpoint Submission = 20%

Lesson Quizzes = 30%

Unit Assessments = 40%

This multi-measure approach ensures that mastery is demonstrated through multiple forms of evidence rather than a single assessment.

---

## Mastery & Progression Criteria

Mindful Learning Academy follows a mastery-based learning model.

To progress successfully through the course, students must:

- Complete all required lesson components.
- Submit Notebook Evidence.
- Submit Checkpoint Responses.
- Demonstrate lesson mastery through Lesson Quizzes.
- Complete all Unit Assessments.
- Revise and resubmit work when required to demonstrate mastery.

Mastery is demonstrated through consistent performance across:

- Notebook Evidence Submissions
- Checkpoint Submissions
- Lesson Quizzes
- Unit Assessments

A minimum mastery level of 80% is required before advancement.

Students may be required to revise and resubmit work until mastery is demonstrated. Students are not advanced based solely on time spent in the course. Advancement occurs only after mastery is demonstrated and learning gaps have been addressed.

Revision opportunities, additional practice, remediation, Teacher of Record support, and progress monitoring may be provided when students need support in demonstrating mastery.

---

## College / Skill Readiness Integration

This course builds skills essential for $($course.Readiness). Students develop:

- Academic vocabulary and precise communication.
- Evidence-based reasoning and explanation.
- Interpretation of visuals, sources, models, data, or discipline-specific examples.
- Independent learning habits in a mastery-based online environment.
- Transferable reading, writing, thinking, and communication skills.

Instruction includes structured opportunities aligned with college readiness, career readiness, and lifelong learning expectations.
"@
}

foreach ($course in $courses) {
  $content = Build-Overview $course
  foreach ($path in $course.Paths) {
    Set-Content -LiteralPath $path -Value $content -Encoding UTF8
  }
}

Write-Output "Normalized $($courses.Count) built-course overview definitions."
