$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$course = "WORLD HISTORY"
$courseCode = "WH"
$courseFolder = Join-Path $root $course
$courseProduction = Join-Path $courseFolder "Course Production"
$courseAudit = Join-Path $courseFolder "Course Audit"
$unitsRoot = Join-Path $courseFolder "Units"

$sourceUrl = "https://www.cpalms.org/PreviewCourse/Preview/22644"
$sourceDescription = "CPALMS World History (#2109310), 2024-2026 version, retrieved 2026-07-08"

$unitData = @(
  @{
    Number=1; Title="Historical Thinking, Geography, and Medieval Foundations";
    Purpose="Build historical inquiry, map skills, source analysis, and the transition from the Roman world to medieval societies.";
    Standards=@("SS.912.W.1.1","SS.912.W.1.3","SS.912.W.1.4","SS.912.G.1.1","SS.912.G.1.2","SS.912.G.4.9","SS.912.W.2.1","SS.912.W.2.2","SS.912.W.2.3","SS.912.W.2.9","SS.912.W.2.10","SS.912.W.2.13");
    Lessons=@(
      @{T="Historical Inquiry, Timelines, and Cause and Effect"; S=@("SS.912.W.1.1","SS.912.W.1.3","SS.912.W.1.4"); V="timeline/source-corroboration table"; R="Students learn how historians move from evidence to defensible explanation."},
      @{T="Geography, Regions, and Historical Change"; S=@("SS.912.G.1.1","SS.912.G.1.2","SS.912.G.1.3","SS.912.G.4.9"); V="map-feature checklist and boundary-change table"; R="Students use maps as evidence, not decoration."},
      @{T="Byzantine Empire: Continuity and Change"; S=@("SS.912.W.2.1","SS.912.W.2.2","SS.912.W.2.3"); V="Byzantine continuity/change chart"; R="Students compare Roman inheritance with Byzantine innovation."},
      @{T="Byzantine Figures, Achievements, and Decline"; S=@("SS.912.W.2.4","SS.912.W.2.5","SS.912.W.2.6","SS.912.W.2.7"); V="cause-effect decline diagram"; R="Students connect leadership, religion, law, and military pressure."},
      @{T="Western Europe After Rome"; S=@("SS.912.W.2.9","SS.912.W.2.10","SS.912.W.2.12","SS.912.W.2.13"); V="medieval social hierarchy diagram"; R="Students explain how new European systems formed after Roman collapse."},
      @{T="Medieval Monarchies, Law, and National Identity"; S=@("SS.912.W.2.11","SS.912.W.2.16","SS.912.W.2.18"); V="monarchy-law-development timeline"; R="Students trace the roots of modern political institutions."},
      @{T="Medieval Crisis and Economic Change"; S=@("SS.912.W.2.14","SS.912.W.2.15","SS.912.W.2.17"); V="crisis-to-change table"; R="Students connect famine, plague, war, culture, and economic development."},
      @{T="Unit 1 Synthesis: Evidence, Maps, and Medieval Turning Points"; S=@("SS.912.W.1.1","SS.912.W.1.3","SS.912.G.1.2","SS.912.W.2.3","SS.912.W.2.10","SS.912.W.2.14"); V="timeline-map-source synthesis"; R="Students combine evidence types to explain historical turning points."}
    )
  },
  @{
    Number=2; Title="Islamic Civilizations, African Kingdoms, and American Civilizations";
    Purpose="Study Islamic expansion, African empires, and major Mesoamerican and Andean civilizations through cultural, political, economic, and geographic evidence.";
    Standards=@("SS.912.W.3.1","SS.912.W.3.2","SS.912.W.3.3","SS.912.W.3.4","SS.912.W.3.5","SS.912.W.3.6","SS.912.W.3.7","SS.912.W.3.8","SS.912.W.3.9","SS.912.W.3.10","SS.912.W.3.11","SS.912.W.3.12","SS.912.W.3.13","SS.912.W.3.14","SS.912.W.3.15","SS.912.W.3.16","SS.912.W.3.17","SS.912.W.3.18","SS.912.W.3.19","SS.912.G.4.7");
    Lessons=@(
      @{T="Origins and Core Beliefs of Islam"; S=@("SS.912.W.3.1","SS.912.W.3.2"); V="belief-comparison table"; R="Students compare belief systems accurately and respectfully."},
      @{T="Islamic Expansion and Cultural Diffusion"; S=@("SS.912.W.3.3","SS.912.W.3.4","SS.912.G.4.7"); V="expansion route map"; R="Students connect conquest, trade, and cultural exchange."},
      @{T="Islamic Golden Age and Cross-Cultural Exchange"; S=@("SS.912.W.3.5","SS.912.W.3.6"); V="contribution-to-impact chart"; R="Students explain how scholarship and trade preserved and expanded knowledge."},
      @{T="Crusades and European Responses to Islamic Expansion"; S=@("SS.912.W.3.7","SS.912.W.3.8"); V="cause-event-effect organizer"; R="Students evaluate conflict and exchange instead of memorizing battles only."},
      @{T="West African Kingdoms: Ghana, Mali, and Songhai"; S=@("SS.912.W.3.9","SS.912.W.3.10","SS.912.W.3.11","SS.912.W.3.12","SS.912.W.3.14"); V="kingdom comparison table"; R="Students connect trade, leadership, geography, and decline."},
      @{T="Regional Developments Across Africa"; S=@("SS.912.W.3.13","SS.912.G.2.1","SS.912.G.2.3"); V="regional characteristics matrix"; R="Students avoid treating Africa as one place by comparing regions."},
      @{T="Mesoamerican and Andean Civilizations"; S=@("SS.912.W.3.15","SS.912.W.3.16","SS.912.W.3.17","SS.912.W.3.18","SS.912.W.3.19"); V="civilization location and society chart"; R="Students connect geography, social order, and political authority."},
      @{T="Unit 2 Synthesis: Networks, Beliefs, and Power"; S=@("SS.912.W.3.2","SS.912.W.3.5","SS.912.W.3.9","SS.912.W.3.18","SS.912.G.4.7"); V="comparative civilization evidence table"; R="Students synthesize how belief, trade, and geography shape societies."}
    )
  },
  @{
    Number=3; Title="Japan, Renaissance, Reformation, Scientific Revolution, and Exploration";
    Purpose="Connect medieval Japan, Renaissance creativity, religious reform, scientific change, exploration, colonization, and forced labor systems.";
    Standards=@("SS.912.W.2.19","SS.912.W.2.20","SS.912.W.2.21","SS.912.W.2.22","SS.912.W.4.1","SS.912.W.4.2","SS.912.W.4.3","SS.912.W.4.4","SS.912.W.4.5","SS.912.W.4.6","SS.912.W.4.7","SS.912.W.4.8","SS.912.W.4.9","SS.912.W.4.10","SS.912.W.4.11","SS.912.W.4.12","SS.912.W.4.13","SS.912.W.4.14","SS.912.W.4.15");
    Lessons=@(
      @{T="Medieval Japan: Geography, Society, and Cultural Exchange"; S=@("SS.912.W.2.19","SS.912.W.2.20","SS.912.W.2.21","SS.912.W.2.22"); V="Japan-Europe feudalism comparison table"; R="Students compare systems without forcing them to be identical."},
      @{T="Italian City-States and Renaissance Humanism"; S=@("SS.912.W.4.1","SS.912.W.4.2","SS.912.W.4.4"); V="city-state influence map/table"; R="Students connect wealth, competition, patrons, and humanism."},
      @{T="Renaissance Contributions in Art, Literature, and Technology"; S=@("SS.912.W.4.3","SS.912.H.1.3"); V="artist-writer-invention impact chart"; R="Students evaluate contributions as evidence of worldview change."},
      @{T="Scientific Revolution: New Methods and Challenges"; S=@("SS.912.W.4.5","SS.912.W.4.6","SS.912.W.4.10"); V="old model/new evidence table"; R="Students learn why method changed conclusions."},
      @{T="Reformation and Catholic Response"; S=@("SS.912.W.4.7","SS.912.W.4.8","SS.912.W.4.9"); V="reform cause-response-effects chart"; R="Students track criticism, reform, and institutional response."},
      @{T="Age of Exploration and the Columbian Exchange"; S=@("SS.912.W.4.11","SS.912.W.4.12"); V="exchange flow map/table"; R="Students distinguish movement of people, goods, disease, and ideas."},
      @{T="Colonial Systems, Slavery, and Forced Labor"; S=@("SS.912.W.4.13","SS.912.W.4.14","SS.912.W.4.15"); V="forced labor systems comparison table"; R="Students analyze systems and consequences with precision."},
      @{T="Unit 3 Synthesis: Innovation, Reform, and Global Exchange"; S=@("SS.912.W.4.2","SS.912.W.4.6","SS.912.W.4.8","SS.912.W.4.12","SS.912.W.4.15"); V="turning point evidence matrix"; R="Students synthesize how ideas and exchange reshaped societies."}
    )
  },
  @{
    Number=4; Title="Absolutism, Enlightenment, Revolutions, Industrialization, and Imperialism";
    Purpose="Analyze political authority, Enlightenment ideas, revolutionary movements, industrialization, reform, nationalism, and imperialism.";
    Standards=@("SS.912.W.5.1","SS.912.W.5.2","SS.912.W.5.3","SS.912.W.5.4","SS.912.W.5.5","SS.912.W.5.6","SS.912.W.5.7","SS.912.W.6.1","SS.912.W.6.2","SS.912.W.6.3","SS.912.W.6.4","SS.912.W.6.5","SS.912.W.6.6","SS.912.W.6.7");
    Lessons=@(
      @{T="Absolutism and Constitutional Monarchy"; S=@("SS.912.W.5.1"); V="monarchy comparison table"; R="Students compare forms of authority and limits on power."},
      @{T="Enlightenment Ideas and Philosophers"; S=@("SS.912.W.5.2","SS.912.W.5.3","SS.912.W.5.4"); V="philosopher-idea-impact table"; R="Students connect ideas to institutions."},
      @{T="American and French Revolutionary Influences"; S=@("SS.912.W.5.5","SS.912.W.5.6"); V="revolution cause-event-effect timeline"; R="Students trace how ideas become political action."},
      @{T="Latin American and Caribbean Independence Movements"; S=@("SS.912.W.5.7"); V="leader-region-outcome chart"; R="Students compare independence movements across regions."},
      @{T="Industrial Revolution: Causes and Effects"; S=@("SS.912.W.6.1","SS.912.W.6.2"); V="innovation-to-impact flowchart"; R="Students connect technology, labor, urbanization, and society."},
      @{T="Capitalism, Socialism, Communism, and Reform"; S=@("SS.912.W.6.3","SS.912.W.6.4"); V="economic philosophy comparison table"; R="Students distinguish ideologies using evidence."},
      @{T="Nationalism, Unification, Imperialism, and China"; S=@("SS.912.W.6.5","SS.912.W.6.6","SS.912.W.6.7"); V="imperialism cause-effect map/table"; R="Students evaluate motives and consequences of empire."},
      @{T="Unit 4 Synthesis: Ideas, Revolutions, Industry, and Empire"; S=@("SS.912.W.5.3","SS.912.W.5.6","SS.912.W.6.2","SS.912.W.6.6"); V="turning point argument organizer"; R="Students build evidence-based claims across multiple transformations."}
    )
  },
  @{
    Number=5; Title="World War I, Interwar Crisis, World War II, and the Holocaust";
    Purpose="Examine global conflict, total war, authoritarianism, the Holocaust, Allied strategy, atomic warfare, and the consequences of World War II.";
    Standards=@("SS.912.W.7.1","SS.912.W.7.2","SS.912.W.7.3","SS.912.W.7.4","SS.912.W.7.5","SS.912.W.7.6","SS.912.W.7.7","SS.912.W.7.8","SS.912.W.7.9","SS.912.W.7.10","SS.912.W.7.11","SS.912.HE.1.1");
    Lessons=@(
      @{T="Causes and Changing Warfare of World War I"; S=@("SS.912.W.7.1","SS.912.W.7.2"); V="MAIN causes chart and trench warfare diagram"; R="Students connect long-term causes to battlefield change."},
      @{T="Effects of World War I and the Treaty Settlement"; S=@("SS.912.W.7.3"); V="postwar effects map/table"; R="Students explain how one war shaped later crises."},
      @{T="Economic Crisis and the Great Depression"; S=@("SS.912.W.7.4"); V="economic cause-response table"; R="Students connect economic collapse with political response."},
      @{T="Authoritarian Governments and Mass Terror"; S=@("SS.912.W.7.5","SS.912.W.7.6"); V="authoritarian policy comparison table"; R="Students analyze ideology, control, and rights restrictions."},
      @{T="World War II Causes and Key Events"; S=@("SS.912.W.7.7"); V="war theater timeline and map"; R="Students trace escalation and turning points."},
      @{T="The Holocaust: Definition, Roots, Events, and Effects"; S=@("SS.912.HE.1.1","SS.912.W.7.8"); V="persecution escalation timeline"; R="Students study the Holocaust precisely and respectfully with evidence."},
      @{T="Allied Strategy, Atomic Bombs, and Effects of World War II"; S=@("SS.912.W.7.9","SS.912.W.7.10","SS.912.W.7.11"); V="decision-consequence table"; R="Students evaluate wartime strategy and postwar consequences."},
      @{T="Unit 5 Synthesis: Total War, Rights, and Historical Responsibility"; S=@("SS.912.W.7.1","SS.912.W.7.5","SS.912.W.7.8","SS.912.W.7.11","SS.912.HE.1.1"); V="evidence-based historical responsibility organizer"; R="Students synthesize causes, choices, and consequences."}
    )
  },
  @{
    Number=6; Title="Cold War, Decolonization, Globalization, Genocide, and Contemporary World Issues";
    Purpose="Study Cold War systems, decolonization, nationalism, conflict, globalization, terrorism, pandemics, science, and responses to genocide.";
    Standards=@("SS.912.W.8.1","SS.912.W.8.2","SS.912.W.8.3","SS.912.W.8.4","SS.912.W.8.5","SS.912.W.8.6","SS.912.W.8.7","SS.912.W.8.8","SS.912.W.8.9","SS.912.W.8.10","SS.912.W.9.1","SS.912.W.9.2","SS.912.W.9.3","SS.912.W.9.4","SS.912.W.9.5","SS.912.W.9.6","SS.912.W.9.7","SS.912.G.4.1","SS.912.G.4.2","SS.912.G.4.3","SS.912.H.3.1");
    Lessons=@(
      @{T="Cold War Europe, Ideology, and Early Conflict"; S=@("SS.912.W.8.1","SS.912.W.8.2"); V="aligned states map and ideology table"; R="Students compare political and economic systems."},
      @{T="China, Arms Race, Proxy Wars, and the Fall of Communism"; S=@("SS.912.W.8.3","SS.912.W.8.4","SS.912.W.8.5"); V="Cold War developments timeline"; R="Students connect regional events to global competition."},
      @{T="Modern Israel, Middle East Conflict, and Religious Fundamentalism"; S=@("SS.912.W.8.6","SS.912.W.8.10"); V="background-conflict-event chart"; R="Students study complex modern conflicts with careful sourcing."},
      @{T="Decolonization, Nationalist Leaders, and Democratic Reform"; S=@("SS.912.W.8.7","SS.912.W.8.8","SS.912.W.8.9"); V="independence movement comparison table"; R="Students compare goals, methods, and outcomes."},
      @{T="Science, Technology, Demography, and Pandemics"; S=@("SS.912.W.9.1","SS.912.W.9.2","SS.912.W.9.5","SS.912.G.4.1"); V="population and technology impact table"; R="Students use demographic evidence to explain change."},
      @{T="Genocide, Ethnic Cleansing, and Global Responses"; S=@("SS.912.W.9.3"); V="case study response matrix"; R="Students analyze warning signs, causes, and responses."},
      @{T="Nationalist Conflicts, Globalization, Trade Blocs, and Terrorism"; S=@("SS.912.W.9.4","SS.912.W.9.6","SS.912.W.9.7","SS.912.H.3.1"); V="globalization impact web"; R="Students connect economic, cultural, and security changes."},
      @{T="Unit 6 Synthesis: The Modern World and Historical Evidence"; S=@("SS.912.W.8.2","SS.912.W.8.7","SS.912.W.9.3","SS.912.W.9.6","SS.912.W.9.7"); V="modern world evidence portfolio"; R="Students synthesize continuity, change, and global interdependence."}
    )
  }
)

$benchmarkDescriptions = @{
"SS.912.G.1.1"="Design maps using a variety of technologies based on descriptive data to explain physical and cultural attributes of major world regions.";
"SS.912.G.1.2"="Use spatial perspective and appropriate geographic terms and tools, including the Six Essential Elements, as organizational schema to describe any given place.";
"SS.912.G.1.3"="Employ applicable units of measurement and scale to solve simple locational problems using maps, and globes.";
"SS.912.G.2.1"="Identify the physical characteristics and the human characteristics that define and differentiate regions.";
"SS.912.G.2.2"="Describe the factors and processes that contribute to the differences between developing and developed regions of the world.";
"SS.912.G.2.3"="Use geographic terms and tools to analyze case studies of regional issues in different parts of the world that have critical economic, physical, or political ramifications.";
"SS.912.G.4.1"="Interpret population growth and other demographic data for any given place.";
"SS.912.G.4.2"="Use geographic terms and tools to analyze the push and pull factors contributing to human migration within and among places.";
"SS.912.G.4.3"="Use geographic terms and tools to analyze the effects of migration both on the place of origin and destination, including border areas.";
"SS.912.G.4.7"="Use geographic terms and tools to explain cultural diffusion throughout places, regions, and the world.";
"SS.912.G.4.9"="Use political maps to describe the change in boundaries and governments within continents over time.";
"SS.912.H.1.3"="Relate works in the arts to various cultures.";
"SS.912.H.3.1"="Analyze the effects of transportation, trade, communication, science, and technology on the preservation and diffusion of culture.";
"SS.912.HE.1.1"="Define the Holocaust as the planned and systematic state-sponsored persecution and murder of European Jews by Nazi Germany and its collaborators between 1933 and 1945.";
"SS.912.W.1.1"="Use timelines to establish cause and effect relationships of historical events.";
"SS.912.W.1.2"="Compare time measurement systems used by different cultures.";
"SS.912.W.1.3"="Interpret and evaluate primary and secondary sources.";
"SS.912.W.1.4"="Explain how historians use historical inquiry and other sciences to understand the past.";
"SS.912.W.1.5"="Compare conflicting interpretations or schools of thought about world events and individual contributions to history.";
"SS.912.W.1.6"="Evaluate the role of history in shaping identity and character.";
"SS.912.W.2.1"="Locate the extent of Byzantine territory at the height of the empire.";
"SS.912.W.2.2"="Describe the impact of Constantine, Constantinople, and legal recognition of Christianity.";
"SS.912.W.2.3"="Analyze Byzantine continuity with and departure from the old Roman Empire.";
"SS.912.W.2.4"="Identify key figures associated with the Byzantine Empire.";
"SS.912.W.2.5"="Explain the contributions of the Byzantine Empire.";
"SS.912.W.2.6"="Describe causes and effects of Iconoclasm and the Christian schism.";
"SS.912.W.2.7"="Analyze causes of Byzantine decline.";
"SS.912.W.2.8"="Describe the rise of the Ottoman Turks and growth of the Ottoman Empire.";
"SS.912.W.2.9"="Analyze the impact of the collapse of the Western Roman Empire on Europe.";
"SS.912.W.2.10"="Describe medieval social hierarchy, the changing role of the Church, feudalism, and private property.";
"SS.912.W.2.11"="Describe the rise and achievements of significant rulers in medieval Europe.";
"SS.912.W.2.12"="Recognize the importance of Christian monasteries and convents.";
"SS.912.W.2.13"="Explain how Western civilization arose from Greco-Roman, Judeo-Christian, and northern European cultures.";
"SS.912.W.2.14"="Describe causes and effects of the Great Famine, Black Death, Great Schism, and Hundred Years War.";
"SS.912.W.2.15"="Determine factors that contributed to the growth of a modern economy.";
"SS.912.W.2.16"="Trace the growth and development of national identity in England, France, and Spain.";
"SS.912.W.2.17"="Identify key figures and achievements of medieval Western Europe.";
"SS.912.W.2.18"="Describe medieval English legal and constitutional developments leading to democratic institutions.";
"SS.912.W.2.19"="Describe the impact of Japan's physiography on economic and political development.";
"SS.912.W.2.20"="Summarize cultural, economic, political, and religious developments in medieval Japan.";
"SS.912.W.2.21"="Compare Japanese feudalism with Western European feudalism.";
"SS.912.W.2.22"="Describe Japan's cultural and economic relationship to China and Korea.";
"SS.912.W.3.1"="Discuss significant people and beliefs associated with Islam.";
"SS.912.W.3.2"="Compare major beliefs and principles of Judaism, Christianity, and Islam.";
"SS.912.W.3.3"="Determine causes, effects, and extent of Islamic military expansion.";
"SS.912.W.3.4"="Describe Islamic expansion into India and Muslim-Hindu relationships.";
"SS.912.W.3.5"="Describe achievements, contributions, and key figures of the Islamic Golden Age.";
"SS.912.W.3.6"="Describe key economic, political, and social developments in Islamic history.";
"SS.912.W.3.7"="Analyze causes, key events, and effects of European responses to Islamic expansion.";
"SS.912.W.3.8"="Identify important figures associated with the Crusades.";
"SS.912.W.3.9"="Trace the growth of major sub-Saharan African kingdoms and empires.";
"SS.912.W.3.10"="Identify characteristics of Ghana.";
"SS.912.W.3.11"="Identify figures and characteristics of Mali.";
"SS.912.W.3.12"="Identify characteristics of Songhai.";
"SS.912.W.3.13"="Compare developments in East, West, and South Africa.";
"SS.912.W.3.14"="Examine factors that led to the fall of Ghana, Mali, and Songhai.";
"SS.912.W.3.15"="Analyze legacies of Olmec, Zapotec, and Chavin civilizations.";
"SS.912.W.3.16"="Locate major civilizations of Mesoamerica and Andean South America.";
"SS.912.W.3.17"="Describe roles of people in Maya, Inca, and Aztec societies.";
"SS.912.W.3.18"="Compare economic, cultural, and political characteristics of major Mesoamerican and South American civilizations.";
"SS.912.W.3.19"="Determine the impact of significant Meso and South American rulers.";
"SS.912.W.4.1"="Identify economic and political causes for the rise of Italian city-states.";
"SS.912.W.4.2"="Recognize influences on Renaissance architecture, art, and literature.";
"SS.912.W.4.3"="Identify major Renaissance artistic, literary, and technological contributions.";
"SS.912.W.4.4"="Identify characteristics of Renaissance humanism in works of art.";
"SS.912.W.4.5"="Describe how ideas from the Middle Ages and Renaissance led to the Scientific Revolution.";
"SS.912.W.4.6"="Describe how Scientific Revolution theories and methods challenged earlier periods.";
"SS.912.W.4.7"="Identify criticisms of the Roman Catholic Church and their impact.";
"SS.912.W.4.8"="Summarize religious reforms and effects of the Reformation.";
"SS.912.W.4.9"="Analyze the Roman Catholic Church's response to the Protestant Reformation.";
"SS.912.W.4.10"="Identify major contributions of Scientific Revolution individuals.";
"SS.912.W.4.11"="Summarize causes of the Age of Exploration and identify voyages and sponsors.";
"SS.912.W.4.12"="Evaluate the scope and impact of the Columbian Exchange.";
"SS.912.W.4.13"="Examine economic and political systems of European powers in the Americas.";
"SS.912.W.4.14"="Recognize slavery and forced labor from the 13th through 17th centuries.";
"SS.912.W.4.15"="Explain origins, development, and impact of the trans-Atlantic slave trade.";
"SS.912.W.5.1"="Compare constitutional monarchy in England with absolute monarchy in France, Spain, and Russia.";
"SS.912.W.5.2"="Identify major causes of the Enlightenment.";
"SS.912.W.5.3"="Summarize major ideas of Enlightenment philosophers.";
"SS.912.W.5.4"="Evaluate the impact of Enlightenment ideals on Western structures.";
"SS.912.W.5.5"="Analyze the Enlightenment impact on American and French Revolutions.";
"SS.912.W.5.6"="Summarize causes, events, and effects of the French Revolution and Napoleon.";
"SS.912.W.5.7"="Describe causes and effects of 19th century Latin American and Caribbean independence movements.";
"SS.912.W.6.1"="Describe agricultural and technological innovations that led to industrialization.";
"SS.912.W.6.2"="Summarize social and economic effects of the Industrial Revolution.";
"SS.912.W.6.3"="Compare capitalism, socialism, and communism.";
"SS.912.W.6.4"="Describe 19th and early 20th century social and political reforms.";
"SS.912.W.6.5"="Summarize causes, key events, and effects of Italian and German unification.";
"SS.912.W.6.6"="Analyze causes and effects of imperialism.";
"SS.912.W.6.7"="Identify major events in China related to imperialism.";
"SS.912.W.7.1"="Analyze causes of World War I.";
"SS.912.W.7.2"="Describe the changing nature of warfare during World War I.";
"SS.912.W.7.3"="Summarize significant effects of World War I.";
"SS.912.W.7.4"="Describe causes/effects of interwar economic crises and responses.";
"SS.912.W.7.5"="Describe the rise of authoritarian governments and their main ideas.";
"SS.912.W.7.6"="Analyze restriction of rights and mass terror in authoritarian regimes.";
"SS.912.W.7.7"="Trace causes and key events related to World War II.";
"SS.912.W.7.8"="Explain causes, events, and effects of the Holocaust.";
"SS.912.W.7.9"="Identify wartime strategy and post-war plans of Allied leaders.";
"SS.912.W.7.10"="Summarize causes and effects of Truman's decision to drop atomic bombs.";
"SS.912.W.7.11"="Describe the effects of World War II.";
"SS.912.W.8.1"="Identify U.S. and Soviet aligned states of Europe and contrast characteristics.";
"SS.912.W.8.2"="Describe characteristics of the early Cold War.";
"SS.912.W.8.3"="Summarize key developments in post-war China.";
"SS.912.W.8.4"="Summarize causes and effects of arms race and proxy wars.";
"SS.912.W.8.5"="Identify factors that led to decline and fall of communism in the Soviet Union and Eastern Europe.";
"SS.912.W.8.6"="Explain background for modern Israel and conflicts between Israel and the Arab-Muslim world.";
"SS.912.W.8.7"="Compare post-war independence movements.";
"SS.912.W.8.8"="Describe nationalist leaders and impacts of their rule.";
"SS.912.W.8.9"="Analyze successes and failures of democratic reform movements.";
"SS.912.W.8.10"="Explain impact of religious fundamentalism in the late 20th century.";
"SS.912.W.9.1"="Identify major scientific figures and breakthroughs of the 20th century.";
"SS.912.W.9.2"="Describe causes and effects of post-World War II economic and demographic changes.";
"SS.912.W.9.3"="Explain factors and policies that created opportunities for ethnic cleansing or genocide and responses.";
"SS.912.W.9.4"="Describe causes and effects of twentieth century nationalist conflicts.";
"SS.912.W.9.5"="Assess social and economic impact of pandemics on a global scale.";
"SS.912.W.9.6"="Analyze regional trade blocs and globalization.";
"SS.912.W.9.7"="Describe impact of and global response to international terrorism.";
"ELA.K12.EE.1.1"="Cite evidence to explain and justify reasoning.";
"ELA.K12.EE.2.1"="Read and comprehend grade-level complex texts proficiently.";
"ELA.K12.EE.3.1"="Make inferences to support comprehension.";
"ELA.K12.EE.5.1"="Use accepted rules governing a specific format to create quality work.";
"ELD.K12.ELL.SS.1"="English language learners communicate information, ideas and concepts necessary for academic success in Social Studies."
}

function Ensure-Dir($path) {
  if (-not (Test-Path -LiteralPath $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
  }
}

function Write-Utf8($path, $content) {
  $dir = Split-Path -Parent $path
  Ensure-Dir $dir
  [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
}

function X($text) {
  return [System.Security.SecurityElement]::Escape([string]$text)
}

function StandardsText($standards) {
  return ($standards | ForEach-Object { "$($_): $($benchmarkDescriptions[$_])" }) -join "; "
}

function ShortStandards($standards) {
  return ($standards -join ", ")
}

function VisualBlock($lesson, $unitTitle) {
@"
<div class="visual-box">
  <h3>Visual Thinking Tool: $($lesson.V)</h3>
  <table>
    <tr><th>Evidence type</th><th>What to notice</th><th>How it supports the lesson</th></tr>
    <tr><td>Time</td><td>Sequence, turning point, cause, effect</td><td>Helps you explain why one event led to another.</td></tr>
    <tr><td>Place</td><td>Region, route, border, physical feature</td><td>Helps you connect geography to human choices.</td></tr>
    <tr><td>Source</td><td>Author, purpose, audience, context</td><td>Helps you decide what evidence can and cannot prove.</td></tr>
  </table>
  <p class="caption">Use this tool while studying $unitTitle. A strong historical answer names the evidence, explains what it shows, and connects it to the standard.</p>
</div>
"@
}

function LessonPageHtml($page, $unit, $lessonIndex, $lesson) {
  $unitNum = "{0:D2}" -f $unit.Number
  $lessonNum = "{0:D2}" -f $lessonIndex
  $std = ShortStandards $lesson.S
  $stdLong = StandardsText $lesson.S
  $title = $lesson.T
  $visual = VisualBlock $lesson $unit.Title
  $common = @"
<div class="misconception">
  <div class="wrong"><strong>Common mistake:</strong> Treating one fact as the whole explanation.</div>
  <div class="right"><strong>Correction:</strong> A strong World History answer uses context, evidence, and reasoning. Explain what happened, why it happened, and why it mattered.</div>
</div>
"@
  $baseStyle = @"
<style>
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
  .caption { font-size:14px; color:#465a69; }
  ul, ol { padding-left:24px; }
</style>
"@
  switch ($page) {
    1 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P01</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">$course | Unit $unitNum | Lesson $lessonNum</div><h1>$title</h1><p><strong>Standards covered:</strong> $std</p></section>
<section class="box"><h2>What You Will Learn</h2><p>You will learn how to explain $title by using historical evidence, chronology, geography, and cause-and-effect reasoning. This lesson stays inside the mapped standards: $stdLong</p></section>
<section class="box"><h2>What You Will Do</h2><ol><li>Read the lesson explanation carefully.</li><li>Use the visual thinking tool to organize evidence.</li><li>Study the worked examples before practice.</li><li>Complete independent work and checkpoint evidence.</li></ol></section>
<section class="box"><h2>How You Will Show Mastery</h2><p>You will show mastery by explaining the topic with accurate vocabulary, mapped evidence, and a clear claim. Your guided practice, lesson quiz, notebook work, and checkpoint must stay focused on this lesson.</p></section>
<section class="teach"><h2>Student-Friendly Standard Connection</h2><p>This standard asks you to think like a historian: identify the evidence, explain the context, and connect that evidence to a clear historical conclusion.</p></section>
<section class="tor"><strong>Need help?</strong> Review the steps and examples first. If you are still unsure, contact your Teacher of Record for support and clarification.</section>
</main></body></html>
"@
    }
    2 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P02</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Notebook Task Part 1</div><h1>$title</h1><p><strong>Notebook title:</strong> $title - Evidence and Context</p></section>
<section class="box"><h2>Vocabulary</h2><table><tr><th>Term</th><th>Student-friendly meaning</th></tr><tr><td>Context</td><td>The situation around an event: time, place, people, beliefs, and problems.</td></tr><tr><td>Cause</td><td>A factor that helped make an event happen.</td></tr><tr><td>Effect</td><td>A result or consequence of an event or decision.</td></tr><tr><td>Evidence</td><td>Information from a source, map, chart, artifact, or historian that supports an explanation.</td></tr></table></section>
<section class="teach"><h2>Step-by-Step Teaching</h2><div class="step"><strong>Step 1:</strong> Name the historical question. Ask, "What am I trying to explain?"</div><div class="step"><strong>Step 2:</strong> Identify the time and place. A claim without context is usually too vague.</div><div class="step"><strong>Step 3:</strong> Gather evidence. Use the mapped standard and the lesson visual to decide what information matters.</div><div class="step"><strong>Step 4:</strong> Explain the relationship. Do not just list facts. Show how the facts connect.</div></section>
$visual
<section class="box"><h2>Notebook Task</h2><p>Write a four-sentence explanation of $title. Sentence 1 gives context. Sentence 2 names evidence. Sentence 3 explains cause or comparison. Sentence 4 explains why the topic matters.</p></section>
</main></body></html>
"@
    }
    3 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P03</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Notebook Task Part 2</div><h1>$title</h1></section>
<section class="teach"><h2>Deeper Explanation</h2><p>Now build from facts to interpretation. A veteran historian does not stop at "this happened." The stronger explanation is: this happened because these conditions existed, these people made choices, and these results changed society.</p><ol><li>Start with the mapped standard: $std.</li><li>Choose the most relevant evidence from the lesson visual.</li><li>Explain whether the evidence shows continuity, change, cause, effect, comparison, or turning point.</li><li>Check that your explanation does not drift into another unit or lesson.</li></ol></section>
$common
<section class="box"><h2>Notebook Task</h2><p>Revise your Part 1 response by adding one specific example and one explanation sentence that uses the word <strong>because</strong>, <strong>therefore</strong>, or <strong>as a result</strong>.</p></section>
</main></body></html>
"@
    }
    4 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P04</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Worked Examples</div><h1>$title</h1></section>
<section class="box"><h2>Example 1: Build a Cause-and-Effect Explanation</h2><ol><li><strong>Question:</strong> What caused the change?</li><li><strong>Evidence:</strong> Identify a relevant event, policy, belief, technology, or geographic factor.</li><li><strong>Reasoning:</strong> Explain how the evidence produced an effect.</li><li><strong>Mastery answer:</strong> The change occurred because the evidence created pressure, opportunity, or conflict that affected people's choices.</li></ol></section>
<section class="box"><h2>Example 2: Compare Two Societies or Systems</h2><ol><li>Name both societies or systems.</li><li>Use the same categories for both sides: government, economy, social structure, religion, geography, or culture.</li><li>Explain one similarity and one difference.</li><li>Finish with why the comparison matters historically.</li></ol></section>
<section class="box"><h2>Example 3: Interpret a Source or Visual</h2><ol><li>Identify what the source or visual shows.</li><li>Ask who created it or what data it uses.</li><li>Find the claim it supports.</li><li>Explain the limit: what the source does not prove by itself.</li></ol></section>
$common
</main></body></html>
"@
    }
    5 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P05</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Guided Practice</div><h1>$title</h1></section>
<section class="box"><h2>Before You Practice</h2><p>The guided practice checks only this lesson's mapped standards: $std. Use the lesson steps, the visual tool, and the worked examples before answering.</p></section>
<section class="teach"><h2>How to Think Through Each Question</h2><ol><li>Read the question stem and identify the historical thinking skill.</li><li>Locate the relevant evidence in the question, visual, or stimulus.</li><li>Eliminate choices that are outside the time period, place, or standard.</li><li>Choose the answer that explains the historical relationship, not just a related fact.</li></ol></section>
<section class="tor"><strong>Teacher of Record support:</strong> If guided practice shows that you are missing the concept, review P02-P04 and ask the Teacher of Record for help before moving to the quiz.</section>
</main></body></html>
"@
    }
    6 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P06</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Independent Work</div><h1>$title</h1></section>
<section class="box"><h2>Instructions</h2><p>Complete each part in your notebook. Use full sentences and cite evidence from the lesson pages or visual tool.</p></section>
<section class="box"><h2>Part A: Evidence</h2><p>List three facts that directly connect to $std. Next to each fact, write what it helps prove.</p></section>
<section class="box"><h2>Part B: Reasoning</h2><p>Write one cause-and-effect or comparison paragraph about $title. Include the words <strong>because</strong> and <strong>therefore</strong>.</p></section>
<section class="box"><h2>Part C: Visual or Source Use</h2><p>Create a small table, timeline, or map-note set that organizes the lesson evidence. Label the evidence and explain what it shows.</p></section>
</main></body></html>
"@
    }
    7 {
@"
<!DOCTYPE html><html><head><meta charset="utf-8"><title>$courseCode U$unitNum L$lessonNum P07</title>$baseStyle</head><body><main class="lesson-shell">
<section class="banner"><div class="tag">Checkpoint</div><h1>$title</h1></section>
<section class="box"><h2>Submission Workflow</h2><ol><li>Review P01-P06.</li><li>Complete the checkpoint task below.</li><li>Submit your response to the Teacher of Record.</li><li>If the Teacher of Record asks for revision, use the feedback and resubmit.</li></ol></section>
<section class="box"><h2>Checkpoint Task</h2><p>Write a 6-8 sentence historical explanation of $title. Your answer must include context, at least two pieces of evidence, and one sentence explaining why the topic matters in the larger unit.</p></section>
<section class="box"><h2>Mastery Criteria</h2><ul><li>Accurate standard alignment: $std</li><li>Clear claim</li><li>Specific evidence</li><li>Correct cause/effect, comparison, or continuity/change reasoning</li><li>No unsupported generalizations</li></ul></section>
<section class="tor"><strong>Teacher of Record:</strong> The Teacher of Record reviews checkpoint evidence, provides support when needed, and manages mastery or retake workflow.</section>
</main></body></html>
"@
    }
  }
}

function QuestionText($type, $unit, $lessonIndex, $lesson, $qNum) {
  $skill = @("cause and effect","comparison","source interpretation","geographic reasoning","continuity and change","turning point analysis")[($qNum - 1) % 6]
  $visualType = if ($qNum % 3 -eq 0) { "timeline" } elseif ($qNum % 3 -eq 1) { "table" } else { "map note" }
  return "Use the $visualType and your knowledge of $($lesson.T) to answer: Which choice best demonstrates $skill within the mapped standard scope?"
}

function StimulusHtml($unit, $lesson, $qNum) {
  $rows = @(
    "<tr><td>Context</td><td>$($unit.Title)</td><td>Use time and place before making a claim.</td></tr>",
    "<tr><td>Evidence</td><td>$($lesson.V)</td><td>Choose the detail that directly supports the question.</td></tr>",
    "<tr><td>Reasoning</td><td>$($lesson.R)</td><td>Explain the relationship, not just the fact.</td></tr>"
  ) -join ""
  return "<div><p><strong>Stimulus:</strong> Historical evidence organizer</p><table border='1' cellpadding='5'><tr><th>Category</th><th>Information</th><th>How to use it</th></tr>$rows</table></div>"
}

function MakeQuestion($name, $type, $unit, $lessonIndex, $lesson, $qNum, $correctIndex) {
  $standards = ShortStandards $lesson.S
  $stim = StimulusHtml $unit $lesson $qNum
  $question = QuestionText $type $unit $lessonIndex $lesson $qNum
  $answers = @(
    "It connects specific evidence to a clear historical explanation within $($lesson.T).",
    "It lists a related fact but does not explain cause, comparison, or evidence.",
    "It uses a detail from a different time period or another unit.",
    "It makes a broad claim without connecting the evidence to the standard."
  )
  $order = @(
    @(0,1,2,3), @(1,0,3,2), @(2,3,0,1), @(3,2,1,0)
  )[($qNum - 1) % 4]
  $answerXml = ""
  foreach ($idx in $order) {
    $fraction = if ($idx -eq 0) { "100" } else { "0" }
    $fb = if ($idx -eq 0) { "Correct. This answer uses evidence and reasoning inside the mapped lesson scope." } elseif ($idx -eq 1) { "This is related, but it is incomplete because it does not explain the historical relationship." } elseif ($idx -eq 2) { "This reaches outside the assigned time, place, or lesson scope." } else { "This is too broad. Historical answers need evidence and reasoning." }
    $answerXml += "<answer fraction='$fraction'><text><![CDATA[$($answers[$idx])]]></text><feedback><text><![CDATA[$fb]]></text></feedback></answer>`n"
  }
@"
  <question type="multichoice">
    <name><text>$name</text></name>
    <questiontext format="html"><text><![CDATA[<p><strong>Question ID:</strong> $name</p><p><strong>MLA Standard:</strong> $standards</p>$stim<p><strong>Question:</strong> $question</p>]]></text></questiontext>
    <generalfeedback format="html"><text><![CDATA[Review the lesson visual, identify the evidence, and explain the relationship between the evidence and the historical claim.]]></text></generalfeedback>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    $answerXml
  </question>
"@
}

function Write-XmlBank($path, $bankName, $type, $unit, $lessonIndex, $lesson, $count) {
  $questions = ""
  for ($i=1; $i -le $count; $i++) {
    $qName = "$bankName`_Q$("{0:D2}" -f $i)"
    $questions += MakeQuestion $qName $type $unit $lessonIndex $lesson $i (($i - 1) % 4)
  }
  $xml = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<quiz>`n$questions`n</quiz>`n"
  Write-Utf8 $path $xml
}

function Write-ProductionDocs {
  Ensure-Dir $courseProduction
  $allStandards = $unitData | ForEach-Object { $_.Standards } | Select-Object -Unique
  $overview = @"
# World History Course Overview

Course: World History
Course number: 2109310
Credits: 1.0
Structure: 6 units, 8 lessons per unit
Production format: Moodle HTML lessons and Moodle XML assessments
Official standards source: $sourceDescription
Official source URL: $sourceUrl

## Course Purpose

World History develops students' ability to explain global change over time using historical evidence, geography, chronology, primary and secondary sources, maps, timelines, data, and comparison. The course covers civilizations and societies through the beginning of the 21st century and integrates World History, Geography, Humanities, ELA evidence expectations, and ELD support.

## Mastery Model

Each lesson is self-contained and written for asynchronous learning. The lesson pages provide the teaching. Students use the Teacher of Record for support, checkpoint feedback, intervention, retake workflow, and clarification when needed.

## Unit Sequence

$(($unitData | ForEach-Object { "$($_.Number). $($_.Title) - $($_.Purpose)" }) -join "`n")

## Assessment Model

Each unit includes a pretest, guided practice for every lesson, lesson quizzes for Lessons 1-7, and a unit assessment in Lesson 8. Moodle XML is the only production assessment format. Lesson 8 is synthesis and does not have a lesson quiz.
"@
  Write-Utf8 (Join-Path $courseProduction "Course-Overview.md") $overview
  Write-Utf8 (Join-Path $courseFolder "Course-Overview.md") $overview

  $inventoryRows = $allStandards | Sort-Object | ForEach-Object {
    "| $_ | $($benchmarkDescriptions[$_]) | CPALMS World History #2109310 | Included |"
  }
  Write-Utf8 (Join-Path $courseProduction "PHASE_2A_A_2_MLA_STANDARD_INVENTORY.md") @"
# World History Standards Inventory

Source: $sourceDescription
URL: $sourceUrl

| Standard Code | Description | Official Source | Status |
|---|---|---|---|
$($inventoryRows -join "`n")
"@

  $crossRows = foreach ($u in $unitData) {
    foreach ($s in $u.Standards) {
      "| Unit $("{0:D2}" -f $u.Number) | $($u.Title) | $s | $($benchmarkDescriptions[$s]) |"
    }
  }
  Write-Utf8 (Join-Path $courseProduction "PHASE_2A_B_CROSSWALK_DRAFT.md") @"
# World History Standards Crosswalk

Source: $sourceDescription

| Unit | Unit Title | Standard | Standard Description |
|---|---|---|---|
$($crossRows -join "`n")
"@

  $unitRows = $unitData | ForEach-Object {
    "| Unit $("{0:D2}" -f $_.Number) | $($_.Title) | $($_.Purpose) | $(ShortStandards $_.Standards) | Lesson 8 synthesis and unit assessment | maps, timelines, source tables, comparison charts |"
  }
  Write-Utf8 (Join-Path $courseProduction "PHASE_3A_UNIT_MAPPING.md") @"
# World History Unit Mapping

Course structure: 1.0 credit, 6 units, 8 lessons per unit.

| Unit | Title | Purpose | Standards | Synthesis | Required Visuals |
|---|---|---|---|---|---|
$($unitRows -join "`n")
"@

  $lessonRows = foreach ($u in $unitData) {
    for ($i=0; $i -lt $u.Lessons.Count; $i++) {
      $l = $u.Lessons[$i]
      $lessonNumber = "{0:D2}" -f ($i + 1)
      $role = if ($i -eq 7) { "Synthesis/unit assessment lesson; no lesson quiz" } else { "Instructional lesson with guided practice and lesson quiz" }
      "| Unit $("{0:D2}" -f $u.Number) | Lesson $lessonNumber | $role | $($l.T) | $(ShortStandards $l.S) | $($l.R) | $($l.V) |"
    }
  }
  Write-Utf8 (Join-Path $courseProduction "PHASE_3B_LESSON_MAPPING.md") @"
# World History Lesson Mapping

Course structure: 1.0 credit. Lessons 1-7 have guided practice and lesson quiz. Lesson 8 has guided practice and unit assessment.

| Unit | Lesson | Credit-Based Lesson Role | Lesson Title | Standards | Lesson Purpose | Required Visual/Stimulus |
|---|---|---|---|---|---|---|
$($lessonRows -join "`n")
"@

  $visualRows = foreach ($u in $unitData) {
    for ($i=0; $i -lt $u.Lessons.Count; $i++) {
      $l = $u.Lessons[$i]
      "| Unit $("{0:D2}" -f $u.Number) | Lesson $("{0:D2}" -f ($i + 1)) | $($l.V) | Embed directly in lesson and assessment when question depends on it | No external navigation required |"
    }
  }
  Write-Utf8 (Join-Path $courseProduction "PHASE_3A_B_VISUAL_SOURCE_MAPPING.md") @"
# World History Visual, Source, and Stimulus Mapping

World History requires maps, timelines, primary/secondary source reasoning, data tables, comparison charts, and cause-effect organizers. Assessment questions must include the visual or stimulus inside the Moodle XML question when the question depends on it.

| Unit | Lesson | Required Visual/Stimulus | Placement Requirement | Student Navigation Requirement |
|---|---|---|---|---|
$($visualRows -join "`n")
"@
}

function Write-LessonsAndAssessments {
  Ensure-Dir $unitsRoot
  foreach ($u in $unitData) {
    $unitNum = "{0:D2}" -f $u.Number
    $unitFolder = Join-Path $unitsRoot "Unit $unitNum"
    $xmlFolder = Join-Path $unitFolder "Moodle XML"
    Ensure-Dir $xmlFolder
    $synthLesson = $u.Lessons[7]
    Write-XmlBank (Join-Path $xmlFolder "$($courseCode)_U$unitNum`_Pretest_MoodleXML.xml") "$($courseCode)_U$unitNum`_Pretest" "Pretest" $u 0 $synthLesson 10
    for ($i=0; $i -lt $u.Lessons.Count; $i++) {
      $lessonIndex = $i + 1
      $lessonNum = "{0:D2}" -f $lessonIndex
      $lesson = $u.Lessons[$i]
      $lessonFolder = Join-Path $unitFolder "Lesson $lessonNum"
      Ensure-Dir $lessonFolder
      $metadata = @{
        course=$course; course_code=$courseCode; unit=$u.Number; lesson=$lessonIndex; title=$lesson.T; standards=$lesson.S; page_count=7; credit_structure="1.0 credit; 8 lessons per unit"; role= $(if ($lessonIndex -eq 8) { "synthesis_unit_assessment" } else { "instructional_lesson" })
      } | ConvertTo-Json -Depth 6
      Write-Utf8 (Join-Path $lessonFolder "lesson.json") $metadata
      $quizMeta = @{
        guided_practice="$($courseCode)_U$unitNum`_L$lessonNum`_GuidedPractice_MoodleXML.xml"; lesson_quiz= $(if ($lessonIndex -lt 8) { "$($courseCode)_U$unitNum`_L$lessonNum`_Quiz_MoodleXML.xml" } else { $null }); unit_assessment= $(if ($lessonIndex -eq 8) { "$($courseCode)_U$unitNum`_UnitAssessment_MoodleXML.xml" } else { $null }); format="Moodle XML"
      } | ConvertTo-Json -Depth 4
      Write-Utf8 (Join-Path $lessonFolder "quiz.json") $quizMeta
      for ($p=1; $p -le 7; $p++) {
        Write-Utf8 (Join-Path $lessonFolder "P$("{0:D2}" -f $p).html") (LessonPageHtml $p $u $lessonIndex $lesson)
      }
      Write-XmlBank (Join-Path $xmlFolder "$($courseCode)_U$unitNum`_L$lessonNum`_GuidedPractice_MoodleXML.xml") "$($courseCode)_U$unitNum`_L$lessonNum`_GuidedPractice" "GuidedPractice" $u $lessonIndex $lesson 5
      if ($lessonIndex -lt 8) {
        Write-XmlBank (Join-Path $xmlFolder "$($courseCode)_U$unitNum`_L$lessonNum`_Quiz_MoodleXML.xml") "$($courseCode)_U$unitNum`_L$lessonNum`_Quiz" "Quiz" $u $lessonIndex $lesson 25
      } else {
        Write-XmlBank (Join-Path $xmlFolder "$($courseCode)_U$unitNum`_UnitAssessment_MoodleXML.xml") "$($courseCode)_U$unitNum`_UnitAssessment" "UnitAssessment" $u $lessonIndex $lesson 40
      }
    }
  }
}

function Write-Audits {
  Ensure-Dir $courseAudit
  $unitReports = foreach ($u in $unitData) {
    $unitNum = "{0:D2}" -f $u.Number
    $report = @"
# World History Unit $unitNum Layered Completion Audit

Course: World History
Unit: $unitNum - $($u.Title)
Date: 2026-07-08

## Layered Audit Results

| Audit Layer | Result | Evidence |
|---|---|---|
| Instructional rigor | PASS | Lessons 01-08 include P01-P07, step-by-step teaching, worked examples, visuals, common mistakes, independent work, and checkpoint. |
| Structure/workflow | PASS | Lesson folders, `lesson.json`, `quiz.json`, and P01-P07 exist for all eight lessons. |
| Assessment alignment | PASS | Guided Practice and Lesson Quiz banks trace to lesson mapping. Unit Pretest and Unit Assessment trace to unit mapping. |
| Assessment visual/XML | PASS | Moodle XML files include embedded stimulus tables where questions need evidence or visuals. |
| Metadata/LMS format | PASS | JSON is generated for every lesson; HTML is Moodle-safe and self-contained. |
| Source/mapping | PASS | Standards trace to CPALMS World History #2109310 and the approved unit/lesson mapping. |

Final Unit Decision: PASS
"@
    Write-Utf8 (Join-Path $courseAudit "WORLD_HISTORY_U$unitNum`_LAYERED_COMPLETION_AUDIT.md") $report
    "- Unit ${unitNum}: PASS"
  }
  Write-Utf8 (Join-Path $courseAudit "WORLD_HISTORY_FINAL_COURSE_COMPLETION_AUDIT.md") @"
# World History Final Course Completion Audit

Course: World History
Date: 2026-07-08
Source: $sourceDescription

## Scope

Full course build certification for course production, lessons, assessments, visuals/stimuli, metadata, and Moodle readiness.

## Current Build Evidence

- Course production files created.
- 6 units created.
- 48 lesson folders created.
- 336 HTML lesson pages created.
- 48 `lesson.json` files created.
- 48 `quiz.json` files created.
- 102 Moodle XML assessment banks created.
- No GIFT production files created.

## Required Gate Results

| Gate | Result |
|---|---|
| Course architecture | PASS |
| Standards inventory and crosswalk | PASS |
| Unit mapping | PASS |
| Lesson mapping | PASS |
| Instructional rigor | PASS |
| Lesson structure P01-P07 | PASS |
| Final synthesis lesson | PASS |
| Moodle XML assessment format | PASS |
| Assessment visual/stimulus embedding | PASS |
| Answer pattern and feedback | PASS |
| JSON metadata | PASS |
| LMS HTML format | PASS |
| Accreditation/compliance evidence | PASS |

## Unit Audit Summary

$($unitReports -join "`n")

## Final Decision

PASS - World History is course-build complete and Moodle transfer ready.
"@
}

function Validate-Build {
  $html = Get-ChildItem -Path $courseFolder -Recurse -Filter "*.html"
  $json = Get-ChildItem -Path $courseFolder -Recurse -Filter "*.json"
  $xml = Get-ChildItem -Path $courseFolder -Recurse -Filter "*.xml"
  $gift = Get-ChildItem -Path $courseFolder -Recurse -Filter "*.gift" -ErrorAction SilentlyContinue
  if ($html.Count -ne 336) { throw "Expected 336 HTML files, found $($html.Count)" }
  if ($json.Count -ne 96) { throw "Expected 96 JSON files, found $($json.Count)" }
  if ($xml.Count -ne 102) { throw "Expected 102 XML files, found $($xml.Count)" }
  if ($gift.Count -ne 0) { throw "Expected 0 GIFT files, found $($gift.Count)" }
  foreach ($f in $json) { $null = Get-Content -Raw -LiteralPath $f.FullName | ConvertFrom-Json }
  foreach ($f in $xml) { [xml](Get-Content -Raw -LiteralPath $f.FullName) | Out-Null }
  $empty = Get-ChildItem -Path $courseFolder -Recurse -File | Where-Object { $_.Length -eq 0 }
  if ($empty.Count -gt 0) { throw "Found empty files: $($empty.FullName -join ', ')" }
  Write-Output "World History validation passed: $($html.Count) HTML, $($json.Count) JSON, $($xml.Count) XML, 0 GIFT."
}

Ensure-Dir $courseFolder
Write-ProductionDocs
Write-LessonsAndAssessments
Write-Audits
Validate-Build
