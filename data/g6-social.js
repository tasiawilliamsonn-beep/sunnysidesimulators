/* Grade 6 Social Studies rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 6.1 Civilizations of the Americas ---------- */
{
  id: 'g6-ss-three-empires', std: 'g6-ss-americas', format: 'fieldtrip',
  title: 'Journey to Three Empires',
  tagline: 'A virtual expedition to the Maya, Aztec, and Inca, from rainforest cities to mountain roads.',
  story: '<p>Pack your field notebook! You\'re joining an archaeology team on a virtual expedition through Mesoamerica and South America. You\'ll visit the lands of three great civilizations: the <b>Maya</b>, the <b>Aztec</b>, and the <b>Inca</b>. At each stop, record how the people adapted to their environment and what they achieved.</p>',
  code: 'QUIPU',
  stages: [
    { title: 'Stop 1: Tikal, Guatemala (Maya)', content: '<p>You climb a stone temple rising above the rainforest canopy. The Maya built cities like <b>Tikal</b> and <b>Chichén Itzá</b> across southern Mexico and Central America. Their Classic Period lasted from about <b>250 to 900 CE</b>.</p><ul><li>Maya <b>city-states</b> were each ruled by a king who was seen as a link to the gods.</li><li>They developed a <b>writing system of glyphs</b>, carved on stone monuments and painted in folding books called codices.</li><li>Maya astronomers created a <b>365-day calendar</b> and used the concept of <b>zero</b>.</li></ul><p>Millions of Maya people still live in the region today and speak Mayan languages.</p>',
      puzzles: [
        { type: 'mc', q: 'How was Maya government organized?', choices: ['Independent city-states, each with its own king', 'One emperor ruled all Maya lands', 'A democracy with elected leaders', 'Spanish governors'], answer: 0 },
        { type: 'sort', q: 'Which achievements belong to the Maya?', buckets: ['Maya achievement', 'Not Maya'], items: [['Glyph writing system', 0], ['365-day calendar', 0], ['Using the concept of zero', 0], ['Machu Picchu', 1], ['Quipu knotted strings', 1]] },
        { type: 'tf', q: 'True or false: The Maya people disappeared completely.', answer: false, explain: 'Many Classic Maya cities were abandoned by about 900 CE, but millions of Maya people live in Mexico and Central America today.' }
      ] },
    { title: 'Stop 2: Tenochtitlan (Aztec)', content: '<p>You stand at the edge of <b>Lake Texcoco</b>, where the Mexica (Aztec) people founded their capital, <b>Tenochtitlan</b>, in about <b>1325</b>. It grew into one of the largest cities in the world, with perhaps 200,000 people. Today, Mexico City stands on the same spot.</p><ul><li>To farm in a swampy lake, the Aztec built <b>chinampas</b>: floating gardens made of mud and plants anchored in the shallow water.</li><li><b>Causeways</b> (raised roads) connected the island city to the shore.</li><li>The Aztec built an empire by conquering neighbors and demanding <b>tribute</b> (payments of goods like cacao, cotton, and feathers).</li></ul>',
      puzzles: [
        { type: 'mc', q: 'How did the Aztec grow food in a lake?', choices: ['They built chinampas, floating gardens', 'They cut terraces into mountains', 'They only fished', 'They imported all their food from Spain'], answer: 0 },
        { type: 'mc', q: 'What is tribute?', choices: ['Payments of goods demanded from conquered peoples', 'A kind of temple', 'A floating garden', 'A calendar'], answer: 0 },
        { type: 'mc', q: 'What modern city stands where Tenochtitlan once was?', choices: ['Mexico City', 'Lima', 'Cusco', 'Guatemala City'], answer: 0 }
      ] },
    { title: 'Stop 3: The Andes Mountains (Inca)', content: '<p>The air is thin at 3,400 meters (11,000 feet) in <b>Cusco, Peru</b>, capital of the Inca Empire. Under the ruler <b>Pachacuti</b> (from about 1438), the Inca built the largest empire in the Americas, stretching about 4,000 km (2,500 miles) along the Andes.</p><ul><li>Farmers carved <b>terraces</b>, flat steps in the mountainsides, to grow potatoes, corn, and quinoa.</li><li>A road system of more than <b>40,000 km</b> (about 25,000 miles), with rope suspension bridges, connected the empire.</li><li>With no written alphabet, officials kept records on <b>quipus</b>, knotted cords.</li><li>Instead of paying taxes with money, people owed labor to the state, called <b>mit\'a</b>.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'How did the Inca farm on steep mountains?', choices: ['Terrace farming', 'Chinampas', 'Irrigating deserts only', 'Floating gardens'], answer: 0 },
        { type: 'mc', q: 'What was a quipu used for?', choices: ['Keeping records with knotted strings', 'Building bridges', 'Fighting battles', 'Measuring time with the Sun'], answer: 0 },
        { type: 'mc', q: 'Why was the Inca road system important?', choices: ['It connected the huge empire for armies, messengers, and trade', 'It was used for chariot races', 'It led to Europe', 'It was only decoration'], answer: 0 }
      ] },
    { title: 'Stop 4: Machu Picchu', content: '<p>At sunrise, clouds lift off <b>Machu Picchu</b>, a royal estate built around <b>1450</b> high on a mountain ridge. Its stone walls were cut so precisely that they fit together without mortar, and many have survived centuries of earthquakes.</p><p>Machu Picchu was never found by the Spanish. It became world-famous in 1911 and is now a UNESCO World Heritage Site.</p>',
      puzzles: [
        { type: 'mc', q: 'What skill do Machu Picchu\'s walls show?', choices: ['Precise stonework that fits together without mortar', 'Iron tools from Europe', 'Glass-making', 'Use of wheels and carts'], answer: 0 },
        { type: 'match', q: 'Match each civilization to its homeland.', pairs: [['Maya', 'Rainforests of southern Mexico and Central America'], ['Aztec', 'Valley of Mexico (Lake Texcoco)'], ['Inca', 'Andes Mountains of South America']] }
      ] },
    { title: 'Stop 5: Encounter and Conquest', content: '<p>The final stop is a museum exhibit on the arrival of the Spanish.</p><ul><li>In <b>1519</b>, <b>Hernán Cortés</b> arrived in Mexico. With the help of thousands of Native allies who resented Aztec rule, he conquered Tenochtitlan by <b>1521</b>. The Aztec ruler Moctezuma II died during the conflict.</li><li>In <b>1532</b>, <b>Francisco Pizarro</b> captured the Inca ruler Atahualpa, who was already weakened by a civil war.</li><li>Most deadly of all were <b>European diseases</b> like smallpox, which killed millions of people who had no immunity.</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Which factors helped the Spanish conquer the Aztec and Inca?', buckets: ['Helped the Spanish', 'Did not help'], items: [['Diseases like smallpox', 0], ['Native allies who opposed the Aztec', 0], ['Steel weapons and horses', 0], ['An Inca civil war', 0], ['Chinampas', 1], ['Quipus', 1]] },
        { type: 'order', q: 'Put the events in order.', items: ['Tenochtitlan is founded', 'Pachacuti expands the Inca Empire', 'Cortés arrives in Mexico', 'Tenochtitlan falls to the Spanish', 'Pizarro captures Atahualpa'] }
      ] }
  ],
  finale: '<p>Your expedition ends at the Zócalo in Mexico City, where the ruins of the Aztec Templo Mayor sit next to a Spanish cathedral. Two worlds, layered on top of each other. You close your notebook knowing that the Maya, Aztec, and Inca each built brilliant civilizations by adapting to very different lands.</p>',
  exit: [
    { q: 'Which civilization built chinampas?', choices: ['Maya', 'Aztec', 'Inca', 'None of them'], answer: 1 },
    { q: 'What was the main reason so many Native people died after the Spanish arrived?', choices: ['Earthquakes', 'European diseases like smallpox', 'Floods', 'Famine only'], answer: 1 },
    { q: 'Choose two of the three civilizations. Compare how each adapted to its geography.', answer: 'Example: The Aztec built chinampas to farm in a swampy lake, while the Inca carved terraces into the Andes Mountains to farm on steep slopes.', lines: 4 }
  ]
},
{
  id: 'g6-ss-temple-escape', std: 'g6-ss-americas', format: 'escape',
  title: 'Escape the Temple of the Sun',
  tagline: 'Trapped in a replica Maya temple at the museum, you must read glyphs and calendars to escape.',
  story: '<p>The museum\'s new replica of a Maya pyramid is amazing, until the heavy stone door slides shut behind you. A recorded voice announces: <b>"Only those who know the wisdom of the Americas may leave the temple."</b></p><p>Five carved stone locks stand between you and the exit.</p>',
  code: 'AZTEC',
  stages: [
    { title: 'Lock 1: The Number Stone', content: '<p>The first stone is covered in dots and bars. The Maya used a <b>base-20</b> number system:</p><ul><li>A <b>dot</b> = 1</li><li>A <b>bar</b> = 5</li><li>A <b>shell</b> = 0</li></ul><p>So 2 bars and 3 dots = 5 + 5 + 1 + 1 + 1 = <b>13</b>.</p><p>The Maya were one of the first civilizations in the world to use a symbol for <b>zero</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What number is 1 bar and 4 dots?', answer: ['9'] },
        { type: 'input', q: 'What number is 3 bars and 2 dots?', answer: ['17'] },
        { type: 'mc', q: 'Why was the Maya use of zero important?', choices: ['It made place value and complex calculations possible', 'It was used only for decoration', 'It meant "the end"', 'It stood for the number 20'], answer: 0 }
      ] },
    { title: 'Lock 2: The Calendar Wheel', content: '<p>A giant stone wheel shows the Maya calendars:</p><ul><li>The <b>Haab\'</b>: a <b>365-day</b> solar calendar of 18 months of 20 days, plus 5 extra days.</li><li>The <b>Tzolk\'in</b>: a <b>260-day</b> sacred calendar used for ceremonies.</li></ul><p>Maya astronomers tracked the Sun, Moon, and Venus so carefully that they could predict eclipses. At Chichén Itzá, the pyramid El Castillo was built so that on the spring and fall equinoxes, a shadow "serpent" slides down its steps.</p>',
      puzzles: [
        { type: 'input', q: 'In the Haab\', 18 months × 20 days = how many days, before the 5 extra days are added?', answer: ['360'] },
        { type: 'mc', q: 'What does the El Castillo shadow serpent show about the Maya?', choices: ['They had advanced knowledge of astronomy and architecture', 'They worshipped snakes only', 'They had electric lights', 'The pyramid was built by accident'], answer: 0 }
      ] },
    { title: 'Lock 3: The Market of Tlatelolco', content: '<p>A mural shows the great Aztec market at <b>Tlatelolco</b>, where tens of thousands of people traded each day. Spanish soldiers were amazed by its size and order.</p><p>Merchants traded food, cloth, pottery, gold, feathers, and enslaved people. <b>Cacao beans</b> and cotton cloaks were used as money. Market judges settled disputes and checked fair prices.</p>',
      puzzles: [
        { type: 'mc', q: 'What did the Aztec use as a form of money?', choices: ['Cacao beans', 'Paper bills', 'Silver coins from Spain', 'Quipus'], answer: 0 },
        { type: 'mc', q: 'What does the huge, organized market tell us about Aztec society?', choices: ['It had a complex economy with trade and rules', 'People did not trade', 'Only kings could buy things', 'Markets were illegal'], answer: 0 }
      ] },
    { title: 'Lock 4: Gods and Government', content: '<p>Carvings show how religion and government were linked in all three civilizations:</p><ul><li><b>Maya</b> kings performed ceremonies to communicate with the gods.</li><li>The <b>Aztec</b> emperor (the <i>huey tlatoani</i>) was the supreme ruler. The Aztec believed the sun god Huitzilopochtli needed offerings, including human sacrifice, to keep the Sun moving.</li><li>The <b>Inca</b> emperor, the <i>Sapa Inca</i>, was believed to be the son of the sun god <b>Inti</b>.</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each ruler title to its civilization.', pairs: [['Sapa Inca', 'Inca'], ['Huey tlatoani', 'Aztec'], ['City-state kings (k\'uhul ajaw)', 'Maya']] },
        { type: 'mc', q: 'What did all three civilizations have in common?', choices: ['Rulers were closely connected to religion and the gods', 'They were all democracies', 'They all used the same language', 'They all lived in the Andes'], answer: 0 }
      ] },
    { title: 'Lock 5: The Final Glyph', content: '<p>The last lock asks you to compare all three civilizations.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each fact to the correct civilization.', buckets: ['Maya', 'Aztec', 'Inca'], items: [['Base-20 numbers and zero', 0], ['El Castillo at Chichén Itzá', 0], ['Tenochtitlan on Lake Texcoco', 1], ['Cacao beans as money', 1], ['Quipus and mit\'a labor', 2], ['Roads and rope bridges in the Andes', 2]] },
        { type: 'mc', q: 'Which civilization flourished EARLIEST?', choices: ['Maya', 'Aztec', 'Inca', 'All at exactly the same time'], answer: 0, hint: 'The Maya Classic Period was about 250–900 CE.' }
      ] }
  ],
  finale: '<p>With a deep rumble, the stone door slides open. The museum guide smiles. "You didn\'t just escape the temple. You learned to count like the Maya, trade like the Aztec, and compare three of the greatest civilizations in history."</p>',
  exit: [
    { q: 'In Maya numbers, what does 2 bars and 1 dot equal?', choices: ['3', '7', '11', '21'], answer: 2 },
    { q: 'What was the Sapa Inca believed to be?', choices: ['A Spanish explorer', 'The son of the sun god', 'A merchant', 'A farmer'], answer: 1 },
    { q: 'Describe one major achievement of the Maya, Aztec, or Inca and explain why it was important.', answer: 'Example: The Inca road system connected their huge empire, letting armies, messengers, and goods move quickly across the Andes.', lines: 4 }
  ]
},
{
  id: 'g6-ss-artifacts-gallery', std: 'g6-ss-americas', format: 'gallery',
  title: 'Artifacts of the Americas',
  tagline: 'Examine five museum artifacts and figure out what they reveal about the people who made them.',
  story: '<p>You are an intern at a history museum, and the curator has a challenge: <b>"Artifacts are clues. Every object tells us something about the people who made it."</b></p><p>Study each artifact in the gallery. Use the placard to make inferences about the civilization it came from.</p>',
  code: 'GLYPH',
  stages: [
    { title: 'Artifact: A Folding Book', content: '<h3>Placard: The Dresden Codex (Maya, about 1200s CE)</h3><p>This book is made of bark paper folded like an accordion. It is filled with painted glyphs, numbers, and pictures of gods. Scholars have found that it contains tables that track the planet <b>Venus</b> and predict <b>eclipses</b>.</p><p>Spanish priests burned most Maya codices in the 1500s. Only <b>four</b> are known to survive today.</p>',
      puzzles: [
        { type: 'mc', q: 'What can we infer from the Dresden Codex?', choices: ['The Maya had writing and studied astronomy carefully', 'The Maya could not read', 'The Maya did not care about the sky', 'The Maya learned writing from Spain'], answer: 0 },
        { type: 'mc', q: 'Why do so few codices survive?', choices: ['Most were destroyed by Spanish priests', 'The Maya never made many', 'They were sold to other countries', 'They were written on stone'], answer: 0 }
      ] },
    { title: 'Artifact: The Sun Stone', content: '<h3>Placard: The Aztec Sun Stone (about 1500 CE)</h3><p>This giant carved basalt disk is about <b>3.6 meters (12 feet)</b> across and weighs about <b>24 tons</b>. At its center is a face often identified as a sun god. Around it are symbols for the 20 day signs of the calendar and the four earlier "suns" (worlds) that Aztec belief said had been destroyed.</p><p>It was buried after the Spanish conquest and rediscovered in Mexico City in <b>1790</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What does the Sun Stone suggest about the Aztec?', choices: ['Religion, time, and the Sun were deeply important to them', 'They had no calendar', 'They were mostly farmers with no art', 'They worshipped the ocean'], answer: 0 },
        { type: 'mc', q: 'Moving a 24-ton stone without wheels or large work animals suggests...', choices: ['The Aztec could organize huge numbers of workers', 'The Aztec had cranes', 'The stone was hollow', 'It was carved by Spanish engineers'], answer: 0 }
      ] },
    { title: 'Artifact: Knotted Cords', content: '<h3>Placard: A Quipu (Inca, 1400s–1500s CE)</h3><p>This bundle of cotton cords has knots tied at different positions. Inca officials called <b>quipucamayocs</b> used quipus to record numbers: population counts, crop harvests, taxes, and storehouse supplies. The position of a knot showed its place value (ones, tens, hundreds), and colors may have stood for different categories.</p><p>Some scholars think quipus may have recorded stories and history too.</p>',
      puzzles: [
        { type: 'mc', q: 'What does the quipu tell us about Inca government?', choices: ['It kept careful records to manage a large empire', 'It had no officials', 'It used paper money', 'It did not count its people'], answer: 0 },
        { type: 'mc', q: 'On a quipu, a knot in the "tens" position and 3 knots in the "ones" position would stand for...', choices: ['13', '31', '4', '130'], answer: 0 },
        { type: 'tf', q: 'True or false: The quipu shows the Inca used a place-value system.', answer: true }
      ] },
    { title: 'Artifact: A Farming Model', content: '<h3>Placard: Model of Moray Terraces (Inca, near Cusco)</h3><p>At Moray, the Inca carved huge circular terraces into a natural bowl in the land. The temperature at the bottom can be several degrees warmer than at the top. Many researchers believe the Inca used Moray as an agricultural "laboratory" to test which crops grew best at different elevations.</p><p>The Inca grew thousands of varieties of <b>potatoes</b>, and they freeze-dried them into <b>chuño</b> that could be stored for years.</p>',
      puzzles: [
        { type: 'mc', q: 'What does Moray suggest about the Inca?', choices: ['They experimented to improve farming in the mountains', 'They did not farm', 'They only grew rice', 'They lived at sea level'], answer: 0 },
        { type: 'mc', q: 'Why was chuño (freeze-dried potato) useful?', choices: ['It could be stored for years in case of famine', 'It tasted like chocolate', 'It was used as money', 'It was a building material'], answer: 0 }
      ] },
    { title: 'Artifact: The Curator\'s Challenge', content: '<h3>Placard</h3><p>Historians use two kinds of sources: <b>primary sources</b> (made during the time being studied, like artifacts and eyewitness accounts) and <b>secondary sources</b> (made later by people studying the past). The only written eyewitness descriptions of Tenochtitlan come from Spanish conquistadors like Bernal Díaz del Castillo, and from Aztec accounts recorded after the conquest.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each source.', buckets: ['Primary source', 'Secondary source'], items: [['The Aztec Sun Stone', 0], ['An Inca quipu', 0], ['Bernal Díaz\'s 1500s account of Tenochtitlan', 0], ['A 2020 documentary about the Maya', 1], ['Your textbook', 1]] },
        { type: 'mc', q: 'Why should historians be careful with conquistadors\' descriptions of the Aztec?', choices: ['The Spanish had reasons to exaggerate or show the Aztec negatively', 'They were written in Maya', 'They are secondary sources', 'Conquistadors never saw the Aztec'], answer: 0 }
      ] }
  ],
  finale: '<p>The curator reads your notes and nods. "You looked at a book, a stone, some string, and a hillside, and you uncovered writing, astronomy, government, and science. That\'s how history is built: one artifact at a time."</p>',
  exit: [
    { q: 'What were quipus used for?', choices: ['Carving calendars', 'Keeping records with knots', 'Farming on lakes', 'Writing glyphs'], answer: 1 },
    { q: 'Which is a primary source about the Aztec?', choices: ['A 2019 website', 'The Sun Stone', 'A modern encyclopedia', 'A movie about Cortés'], answer: 1 },
    { q: 'Choose one artifact from the gallery. What does it tell us about the civilization that made it?', answer: 'Example: The Dresden Codex shows the Maya had a writing system and tracked Venus and eclipses, so they had advanced astronomy.', lines: 4 }
  ]
},

/* ---------- 6.1 Medieval Europe to the Renaissance ---------- */
{
  id: 'g6-ss-castle-quest', std: 'g6-ss-europe', format: 'quest',
  title: 'Castle Quest: Life on the Manor',
  tagline: 'Climb from serf to noble, learning how feudalism and the Magna Carta shaped medieval Europe.',
  story: '<p>The year is <b>1200 CE</b>, and you wake up in a small hut on a manor in England. You are a <b>serf</b>. Your quest: climb the feudal ladder, level by level, to understand how medieval society worked.</p>',
  code: 'MANOR',
  stages: [
    { title: 'Level 1: The Serf\'s Hut', content: '<p>As a serf, you farm the lord\'s land. You must give him a large share of your harvest and work several days a week in his fields. In return, the lord protects you from raiders.</p><p>Serfs were not enslaved, but they were <b>bound to the land</b>: you could not leave the manor, marry, or change jobs without the lord\'s permission. Most people in medieval Europe (about 90%) were peasants.</p>',
      puzzles: [
        { type: 'mc', q: 'What did serfs receive from their lord in exchange for their labor?', choices: ['Protection and a place to live and farm', 'Wages in gold', 'Land of their own to sell', 'The right to vote'], answer: 0 },
        { type: 'tf', q: 'True or false: Serfs could leave the manor whenever they wanted.', answer: false }
      ] },
    { title: 'Level 2: The Manor', content: '<p>You explore the <b>manor</b>, the lord\'s estate. It includes the lord\'s house or castle, fields, a village, a church, a mill, pastures, and woods. Manors produced almost everything people needed, so there was little trade. This kind of economy is called <b>self-sufficient</b>.</p><p>Farmers used the <b>three-field system</b>: one field planted in fall, one in spring, and one left empty (fallow) to let the soil recover.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "self-sufficient" mean for a manor?', choices: ['It produced nearly everything its people needed', 'It traded with Asia every day', 'It depended on the king for food', 'It had no farms'], answer: 0 },
        { type: 'mc', q: 'Why was one field left fallow in the three-field system?', choices: ['To let the soil recover its nutrients', 'For knights to practice', 'Because of floods', 'For a castle to be built'], answer: 0 }
      ] },
    { title: 'Level 3: The Knight\'s Oath', content: '<p>You are promoted to a <b>knight</b>! You kneel before a lord and swear an oath of loyalty called <b>fealty</b>. The lord grants you a <b>fief</b> (a piece of land). In return, you promise military service, usually about 40 days a year.</p><p>Knights followed a code of behavior called <b>chivalry</b>: be brave, loyal, and honest, and protect the weak.</p>',
      puzzles: [
        { type: 'match', q: 'Match each term to its meaning.', pairs: [['Fief', 'Land granted in exchange for service'], ['Fealty', 'An oath of loyalty'], ['Chivalry', 'A knight\'s code of behavior'], ['Vassal', 'A person who receives land and owes loyalty']] },
        { type: 'order', q: 'Put the feudal ladder in order from most powerful to least powerful.', items: ['King', 'Nobles (lords)', 'Knights', 'Peasants and serfs'] }
      ] },
    { title: 'Level 4: The Church', content: '<p>You visit the great cathedral. The <b>Roman Catholic Church</b> was the most powerful institution in medieval Western Europe. It owned huge amounts of land, collected a tax called the <b>tithe</b> (one-tenth of income), ran schools, and copied books by hand in monasteries.</p><p>Church leaders could even challenge kings. The Church also launched the <b>Crusades</b> (1096–1291), wars to control the Holy Land in the Middle East. The Crusades increased trade and brought new goods and ideas to Europe.</p>',
      puzzles: [
        { type: 'mc', q: 'What was a tithe?', choices: ['A payment of one-tenth of income to the Church', 'A type of castle', 'A knight\'s sword', 'A crop'], answer: 0 },
        { type: 'mc', q: 'What was one important effect of the Crusades?', choices: ['Increased trade and new goods and ideas in Europe', 'The end of the Catholic Church', 'The discovery of the Americas', 'The invention of the printing press'], answer: 0 }
      ] },
    { title: 'Level 5: Runnymede, 1215', content: '<p>You are now a <b>noble</b>, and you and other barons are angry. <b>King John</b> of England has raised taxes, seized land, and jailed nobles without trial. In June <b>1215</b>, at a meadow called <b>Runnymede</b>, the barons force him to seal the <b>Magna Carta</b> ("Great Charter").</p><p>It said the king must follow the law too. One famous section promised that no free man could be imprisoned or have his land taken "except by the lawful judgment of his peers or by the law of the land."</p><p>Centuries later, these ideas influenced the U.S. Constitution and Bill of Rights, including the right to a trial by jury.</p>',
      puzzles: [
        { type: 'mc', q: 'What was the most important idea of the Magna Carta?', choices: ['Even the king must obey the law', 'The king has unlimited power', 'Serfs can vote', 'The Church controls England'], answer: 0 },
        { type: 'mc', q: 'Who was protected most by the Magna Carta at first?', choices: ['Nobles and free men', 'Serfs', 'Enslaved people', 'Women only'], answer: 0 },
        { type: 'mc', q: 'Which American right grew partly from the Magna Carta\'s "lawful judgment of his peers"?', choices: ['Trial by jury', 'Freedom of religion', 'The right to bear arms', 'Voting at 18'], answer: 0 }
      ] }
  ],
  finale: '<p>From serf to knight to noble, you\'ve climbed the whole feudal ladder and helped limit a king\'s power. The Magna Carta you just witnessed would be remembered for more than 800 years as a key step toward the rule of law. Quest complete!</p>',
  exit: [
    { q: 'In feudalism, what did a knight receive in exchange for military service?', choices: ['A fief (land)', 'A salary', 'A seat in Parliament', 'Nothing'], answer: 0 },
    { q: 'The Magna Carta (1215) was important because it...', choices: ['Ended the Crusades', 'Limited the king\'s power', 'Created the Catholic Church', 'Freed all serfs'], answer: 1 },
    { q: 'Explain how the feudal system worked. Describe what at least two groups gave and received.', answer: 'Kings gave land to nobles for loyalty; nobles gave fiefs to knights for military service; serfs farmed the land and got protection.', lines: 4 }
  ]
},
{
  id: 'g6-ss-plague-detective', std: 'g6-ss-europe', format: 'mystery',
  title: 'The Plague Detective',
  tagline: 'It\'s 1348 and a deadly sickness is sweeping Europe. Examine the evidence to find its cause and effects.',
  story: '<p>The year is <b>1348</b>. A terrible sickness has reached your town in Italy. People develop fevers and painful swellings, and many die within days. The town council has asked you to investigate. Where did it come from? How does it spread? What will it change?</p><p class="note">You are a detective with modern knowledge, looking back at medieval evidence.</p>',
  code: 'FLEAS',
  stages: [
    { title: 'Evidence File #1: The Ships', content: '<p><b>Harbor record:</b> In October 1347, trading ships from the Black Sea arrived in Messina, Sicily. Many sailors aboard were dead or dying. Within months, the sickness spread to Genoa, Venice, and Marseille.</p><p><b>Detective note:</b> Busy trade routes connected Europe, the Middle East, and Asia. The disease had already spread across Central Asia along the <b>Silk Road</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'How did the plague reach Europe?', choices: ['On trading ships and along trade routes', 'Through the air from the Moon', 'From the Americas', 'It started in England'], answer: 0 },
        { type: 'mc', q: 'Why did trade help the disease spread?', choices: ['Ships and caravans carried infected rats, fleas, and people to new places', 'Traders created the disease', 'Trade goods were poisoned', 'Trade made people stronger'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Real Cause', content: '<p><b>Medieval theories:</b> People at the time blamed bad air ("miasma"), the position of the planets, or punishment from God. Some people wrongly and cruelly blamed Jewish communities, leading to terrible attacks.</p><p><b>Modern science:</b> The plague was caused by a bacterium, <b><i>Yersinia pestis</i></b>. It was carried by <b>fleas</b> living on <b>black rats</b>. When an infected flea bit a person, the bacteria entered their blood. One form, pneumonic plague, could also spread person to person through coughing.</p>',
      puzzles: [
        { type: 'mc', q: 'What actually caused the Black Death?', choices: ['Bacteria spread mainly by fleas on rats', 'Bad air', 'The planets', 'Eating too much bread'], answer: 0 },
        { type: 'mc', q: 'Why did medieval people come up with wrong explanations?', choices: ['They did not yet know about germs and bacteria', 'They did not care', 'They had microscopes but ignored them', 'They were not sick'], answer: 0 },
        { type: 'order', q: 'Put the chain of infection in order.', items: ['Bacteria infect black rats', 'Fleas bite the infected rats', 'Rats travel on ships to new cities', 'Infected fleas bite people'] }
      ] },
    { title: 'Evidence File #3: The Death Toll', content: '<p><b>Town census:</b></p><div class="tablewrap"><table><tr><th>Year</th><th>Population of the town</th></tr><tr><td>1347</td><td>12,000</td></tr><tr><td>1350</td><td>7,800</td></tr></table></div><p>Across Europe, the Black Death (1347–1351) killed an estimated <b>one-third to one-half</b> of all people, perhaps <b>25 million</b> or more. Crowded cities with poor sanitation were hit hardest.</p>',
      puzzles: [
        { type: 'input', q: 'How many people in the town died between 1347 and 1350?', answer: ['4200', '4,200'], unit: 'people' },
        { type: 'mc', q: 'About what fraction of the town died?', choices: ['About one-third', 'About one-tenth', 'About three-quarters', 'Almost none'], answer: 0, hint: '4,200 is about what fraction of 12,000?' },
        { type: 'mc', q: 'Why were cities hit harder than the countryside?', choices: ['People and rats lived crowded together with poor sanitation', 'Cities were colder', 'Cities had no doctors', 'Cities were farther from ships'], answer: 0 }
      ] },
    { title: 'Evidence File #4: After the Plague', content: '<p><b>A lord\'s letter, 1352:</b> "There are not enough workers to harvest my fields. The peasants demand wages, and when I refuse, they leave for another lord who will pay them!"</p><p><b>Detective note:</b> With so many people dead, <b>labor was scarce</b>. Surviving peasants could demand higher wages and more freedom. Some lords tried to force them to stay, which led to revolts like the <b>English Peasants\' Revolt of 1381</b>. Over time, serfdom in Western Europe declined, and the feudal system weakened.</p>',
      puzzles: [
        { type: 'mc', q: 'Why could peasants demand higher wages after the plague?', choices: ['So many workers had died that labor was scarce', 'Kings ordered higher wages', 'There was more gold', 'Lords became kinder'], answer: 0 },
        { type: 'order', q: 'Put the chain of effects in order.', items: ['The plague kills many workers', 'Labor becomes scarce', 'Peasants demand wages and freedom', 'Serfdom and feudalism weaken'] }
      ] },
    { title: 'Evidence File #5: Case Report', content: '<p>Your final report must explain the <b>causes</b> and <b>effects</b> of the Black Death.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each item.', buckets: ['Cause of the plague\'s spread', 'Effect of the plague'], items: [['Trade ships and routes', 0], ['Fleas on black rats', 0], ['Crowded, dirty cities', 0], ['Labor shortage', 1], ['Weakening of feudalism', 1], ['Peasant revolts', 1], ['Attacks on Jewish communities', 1]] },
        { type: 'mc', q: 'Which statement best summarizes the Black Death\'s importance?', choices: ['It killed a huge share of Europe\'s people and helped end the feudal system', 'It had no lasting effects', 'It only affected Asia', 'It made feudalism stronger'], answer: 0 }
      ] }
  ],
  finale: '<p>Your report is complete. The Black Death was one of the deadliest events in human history. But in its aftermath, surviving workers gained new power, and the old feudal order began to crack. Historians see it as a turning point that helped lead Europe toward a new age.</p>',
  exit: [
    { q: 'What spread the Black Death?', choices: ['Bad air', 'Bacteria carried by fleas on rats', 'Poisoned water only', 'Volcanoes'], answer: 1 },
    { q: 'How did the Black Death affect feudalism?', choices: ['It made serfs work for free', 'It weakened feudalism because workers were scarce', 'It made lords more powerful forever', 'It had no effect'], answer: 1 },
    { q: 'Explain one cause of the Black Death\'s rapid spread and one long-term effect on Europe.', answer: 'Cause: trade ships carried infected rats and fleas between cities. Effect: labor shortages let peasants demand wages and freedom, weakening feudalism.', lines: 4 }
  ]
},
{
  id: 'g6-ss-renaissance-gallery', std: 'g6-ss-europe', format: 'gallery',
  title: 'The Renaissance Gallery',
  tagline: 'Stroll a virtual Florence gallery of the artists, inventors, and reformers who reshaped Europe.',
  story: '<p>Welcome to a virtual gallery in <b>Florence, Italy</b>, the city where the Renaissance began. The word <b>Renaissance</b> means "rebirth": a rebirth of interest in the art, science, and learning of ancient Greece and Rome, from about 1350 to 1600.</p><p>Visit each gallery room in any order.</p>',
  code: 'PAINT',
  stages: [
    { title: 'Room: The Medici Family', content: '<h3>Placard</h3><p>Florence was a rich <b>city-state</b> thanks to banking and trade in wool and cloth. The most powerful family was the <b>Medici</b>, bankers who used their wealth to become <b>patrons</b>: they paid artists, architects, and scholars to create new works.</p><p>Italian city-states like Florence, Venice, and Genoa grew rich because they sat on trade routes between Europe, the Middle East, and Asia, partly thanks to trade that expanded after the Crusades.</p>',
      puzzles: [
        { type: 'mc', q: 'What is a patron?', choices: ['A wealthy person who pays artists and scholars to create work', 'A type of painting', 'A church leader', 'A serf'], answer: 0 },
        { type: 'mc', q: 'Why did the Renaissance begin in Italian city-states?', choices: ['They were rich from trade and banking and could support the arts', 'They were the poorest places in Europe', 'They were far from any trade routes', 'They had no connection to ancient Rome'], answer: 0 }
      ] },
    { title: 'Room: Leonardo da Vinci', content: '<h3>Placard</h3><p><b>Leonardo da Vinci</b> (1452–1519) painted the <i>Mona Lisa</i> and <i>The Last Supper</i>. He also filled notebooks with sketches of flying machines, human anatomy, and engineering ideas, written in mirror-image handwriting.</p><p>Leonardo is often called a <b>"Renaissance man"</b>: a person skilled in many fields, from art to science.</p><p>Renaissance artists used <b>perspective</b>, a technique that makes flat paintings look three-dimensional, and studied real human bodies to paint them realistically.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "Renaissance man" mean?', choices: ['A person skilled in many different fields', 'A man who lived in Florence', 'A painter only', 'A knight'], answer: 0 },
        { type: 'mc', q: 'What is perspective in art?', choices: ['A technique that makes paintings look three-dimensional', 'Painting only religious scenes', 'Using gold paint', 'Painting on ceilings'], answer: 0 }
      ] },
    { title: 'Room: Michelangelo', content: '<h3>Placard</h3><p><b>Michelangelo</b> (1475–1564) carved the marble statue <i>David</i> (finished in 1504), which stands more than 5 meters (17 feet) tall. From 1508 to 1512, he painted the ceiling of the <b>Sistine Chapel</b> in Rome, lying on scaffolding for four years.</p><p>His work reflects <b>humanism</b>, a Renaissance idea that celebrated human potential and achievement, and that encouraged the study of classical (Greek and Roman) texts.</p>',
      puzzles: [
        { type: 'mc', q: 'What is humanism?', choices: ['An idea celebrating human potential and the study of classical texts', 'A type of government', 'A farming method', 'A disease'], answer: 0 },
        { type: 'match', q: 'Match each work to its creator.', pairs: [['Mona Lisa', 'Leonardo da Vinci'], ['David (statue)', 'Michelangelo'], ['Sistine Chapel ceiling', 'Michelangelo (painter)']] }
      ] },
    { title: 'Room: The Printing Press', content: '<h3>Placard</h3><p>Around <b>1450</b>, <b>Johannes Gutenberg</b> in Germany developed a printing press with <b>movable metal type</b>. Before this, books were copied by hand, which could take months.</p><p>Soon, printers could make hundreds of copies quickly and cheaply. By 1500, millions of books had been printed in Europe. More people learned to read, and new ideas spread faster than ever before.</p>',
      puzzles: [
        { type: 'order', q: 'Put the chain of effects in order.', items: ['Gutenberg develops movable-type printing', 'Books become cheaper and faster to make', 'More people can buy books and learn to read', 'New ideas spread quickly across Europe'] },
        { type: 'mc', q: 'How were books made before the printing press?', choices: ['Copied by hand', 'Printed by computers', 'Carved in stone only', 'They did not exist'], answer: 0 }
      ] },
    { title: 'Room: The Reformation', content: '<h3>Placard</h3><p>In <b>1517</b>, a German monk named <b>Martin Luther</b> wrote the <b>Ninety-Five Theses</b>, criticizing the Catholic Church, especially the sale of <b>indulgences</b> (payments that people were told would reduce punishment for sins).</p><p>Thanks to the printing press, copies spread across Germany in weeks. Luther\'s ideas led to the <b>Protestant Reformation</b> and the creation of new Christian churches. Europe was divided between Catholic and Protestant regions, which led to many conflicts.</p>',
      puzzles: [
        { type: 'mc', q: 'What did Martin Luther criticize in the Ninety-Five Theses?', choices: ['The sale of indulgences by the Church', 'The printing press', 'Renaissance art', 'The Magna Carta'], answer: 0 },
        { type: 'mc', q: 'How did the printing press help the Reformation?', choices: ['It spread Luther\'s ideas quickly to many people', 'It stopped Luther\'s ideas', 'It was invented by Luther', 'It had nothing to do with it'], answer: 0 },
        { type: 'sort', q: 'Sort each item by era.', buckets: ['Middle Ages', 'Renaissance & Reformation'], items: [['Feudalism and manors', 0], ['Magna Carta (1215)', 0], ['The Black Death (1347)', 0], ['Gutenberg\'s printing press', 1], ['Michelangelo\'s David', 1], ['Ninety-Five Theses (1517)', 1]] }
      ] }
  ],
  finale: '<p>You step out of the gallery into a sunny Florence piazza. From banking families to painters, sculptors, printers, and reformers, the Renaissance transformed how Europeans thought about art, learning, religion, and themselves. Tour complete!</p>',
  exit: [
    { q: 'What does "Renaissance" mean?', choices: ['Revolution', 'Rebirth', 'Religion', 'Reform'], answer: 1 },
    { q: 'Which invention helped ideas spread quickly during the Renaissance?', choices: ['The steam engine', 'The telescope', 'The printing press', 'The compass'], answer: 2 },
    { q: 'Choose one person from the gallery. Explain how their work changed Europe.', answer: 'Example: Gutenberg\'s printing press made books cheaper and faster to produce, so more people could read and new ideas spread quickly.', lines: 4 }
  ]
},

/* ---------- 6.3 Geography ---------- */
{
  id: 'g6-ss-lost-coordinates', std: 'g6-ss-geo', format: 'escape',
  title: 'Lost Coordinates Escape',
  tagline: 'A pilot\'s GPS failed. Use latitude, longitude, and map skills to unlock the cockpit and land safely.',
  story: '<p>You are the co-pilot of a cargo plane flying from Indianapolis. A lightning strike has fried the GPS, and the backup navigation computer is locked. It will only unlock for someone who can navigate the old-fashioned way: with <b>latitude, longitude, and a map</b>.</p>',
  code: 'GLOBE',
  stages: [
    { title: 'Lock 1: The Grid', content: '<p>The navigation manual explains the global grid:</p><ul><li><b>Latitude</b> lines run east–west, parallel to the <b>Equator (0°)</b>. They measure distance <b>north or south</b>, up to 90° at the poles.</li><li><b>Longitude</b> lines (meridians) run north–south from pole to pole. They measure distance <b>east or west</b> of the <b>Prime Meridian (0°)</b>, which passes through Greenwich, England, up to 180°.</li><li>Coordinates are written <b>latitude first</b>: Indianapolis is about <b>40° N, 86° W</b>.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'Which line is at 0° latitude?', choices: ['The Equator', 'The Prime Meridian', 'The Tropic of Cancer', 'The Arctic Circle'], answer: 0 },
        { type: 'mc', q: 'Longitude measures distance...', choices: ['East or west of the Prime Meridian', 'North or south of the Equator', 'Above sea level', 'From the North Pole'], answer: 0 },
        { type: 'mc', q: 'Which coordinate is written correctly?', choices: ['40° N, 86° W', '86° W, 40° N', '40° W, 86° N', '40, 86'], answer: 0 }
      ] },
    { title: 'Lock 2: Hemispheres', content: '<p>The Equator divides Earth into the <b>Northern</b> and <b>Southern Hemispheres</b>. The Prime Meridian and the 180° line divide it into the <b>Eastern</b> and <b>Western Hemispheres</b>.</p><ul><li>N latitude = Northern Hemisphere; S latitude = Southern Hemisphere.</li><li>E longitude = Eastern Hemisphere; W longitude = Western Hemisphere.</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Which hemispheres is each city in?', buckets: ['Northern & Western', 'Southern & Western', 'Northern & Eastern'], items: [['Indianapolis (40° N, 86° W)', 0], ['Mexico City (19° N, 99° W)', 0], ['Buenos Aires (35° S, 58° W)', 1], ['Lima (12° S, 77° W)', 1], ['Rome (42° N, 12° E)', 2], ['Berlin (53° N, 13° E)', 2]] }
      ] },
    { title: 'Lock 3: Find the City', content: '<p>The radio crackles with coordinates for possible landing airports. Use the chart to identify each one.</p><div class="tablewrap"><table><tr><th>City</th><th>Coordinates (approx.)</th></tr><tr><td>London, UK</td><td>52° N, 0°</td></tr><tr><td>Paris, France</td><td>49° N, 2° E</td></tr><tr><td>Rio de Janeiro, Brazil</td><td>23° S, 43° W</td></tr><tr><td>Quito, Ecuador</td><td>0°, 79° W</td></tr><tr><td>Toronto, Canada</td><td>44° N, 79° W</td></tr></table></div>',
      puzzles: [
        { type: 'mc', q: 'Which city is almost exactly on the Equator?', choices: ['Quito', 'London', 'Paris', 'Toronto'], answer: 0 },
        { type: 'mc', q: 'Which city is almost exactly on the Prime Meridian?', choices: ['London', 'Rio de Janeiro', 'Quito', 'Toronto'], answer: 0 },
        { type: 'mc', q: 'Quito and Toronto share the same longitude (79° W). What does that mean?', choices: ['Toronto is almost directly north of Quito', 'They have the same climate', 'They are the same distance from the Equator', 'They are in different hemispheres east-west'], answer: 0 }
      ] },
    { title: 'Lock 4: Map Tools', content: '<p>The paper maps in the cockpit have these tools:</p><ul><li><b>Compass rose</b>: shows directions (N, S, E, W, and in between).</li><li><b>Scale</b>: shows how map distance compares to real distance (1 inch = 500 miles).</li><li><b>Legend (key)</b>: explains the symbols and colors.</li><li><b>Title</b>: tells what the map shows.</li></ul><p>Different map <b>projections</b> flatten the round Earth in different ways. Every flat map distorts something: shape, size, distance, or direction. On a Mercator map, Greenland looks as big as Africa, but Africa is actually about <b>14 times</b> larger!</p>',
      puzzles: [
        { type: 'match', q: 'Match each map tool to its job.', pairs: [['Compass rose', 'Shows direction'], ['Scale', 'Measures real distance'], ['Legend', 'Explains symbols'], ['Grid lines', 'Locate exact positions']] },
        { type: 'input', q: 'On a map where 1 inch = 500 miles, two cities are 3 inches apart. How far apart are they in real life?', answer: ['1500', '1,500'], unit: 'miles' },
        { type: 'mc', q: 'Why does Greenland look so big on a Mercator map?', choices: ['Mercator maps stretch land near the poles', 'Greenland is bigger than Africa', 'The map is upside down', 'Greenland is near the Equator'], answer: 0 }
      ] },
    { title: 'Lock 5: The Landing', content: '<p>The navigation computer asks one final set of questions before it shows the runway.</p>',
      puzzles: [
        { type: 'mc', q: 'You fly from Indianapolis (40° N, 86° W) straight toward 40° N, 3° W (Madrid, Spain). Which direction are you flying?', choices: ['East', 'North', 'South', 'West'], answer: 0, hint: 'The latitude stays the same. The longitude number gets smaller as you approach the Prime Meridian.' },
        { type: 'mc', q: 'A city is at 35° S, 58° W. Which continent is it most likely on?', choices: ['South America', 'Europe', 'Africa', 'North America'], answer: 0 },
        { type: 'mc', q: 'Which lines of latitude are the Tropic of Cancer and Tropic of Capricorn?', choices: ['About 23.5° N and 23.5° S', '0° and 90° N', '45° N and 45° S', '66.5° N and 66.5° S'], answer: 0 }
      ] }
  ],
  finale: '<p>The computer beeps and shows the runway lights. You guide the plane in for a smooth landing. The pilot shakes your hand. "Latitude, longitude, and a good map. Who needs GPS?"</p>',
  exit: [
    { q: 'Latitude lines measure distance...', choices: ['East or west of the Prime Meridian', 'North or south of the Equator', 'Between two cities', 'Above sea level'], answer: 1 },
    { q: 'A place at 10° S, 60° W is in which hemispheres?', choices: ['Northern and Eastern', 'Southern and Western', 'Northern and Western', 'Southern and Eastern'], answer: 1 },
    { q: 'Explain the difference between latitude and longitude, and give the approximate coordinates of Indianapolis.', answer: 'Latitude measures north/south of the Equator; longitude measures east/west of the Prime Meridian. Indianapolis is about 40° N, 86° W.', lines: 3 }
  ]
},
{
  id: 'g6-ss-grand-tour', std: 'g6-ss-geo', format: 'fieldtrip',
  title: 'Grand Tour of Two Continents',
  tagline: 'Fly from the Andes to the Alps, exploring the physical features and climates of the Americas and Europe.',
  story: '<p>Your class has booked a virtual around-the-world ticket! You\'ll visit major physical features and climate regions in <b>South America, North America, and Europe</b>. At each stop, observe how land and climate shape the way people live.</p>',
  code: 'ANDES',
  stages: [
    { title: 'Stop 1: The Andes Mountains', content: '<p>The <b>Andes</b> are the longest mountain range on Earth above sea level, running about <b>7,000 km</b> (4,300 miles) along the western edge of South America through seven countries. Peaks rise over 6,900 meters.</p><p>Climate changes with <b>elevation</b>: the higher you go, the colder it gets. Farmers grow tropical fruit in low valleys, corn in the middle, and potatoes and quinoa high up. Llamas and alpacas are raised for wool and transport.</p>',
      puzzles: [
        { type: 'mc', q: 'How does elevation affect climate in the Andes?', choices: ['Higher elevations are colder', 'Higher elevations are hotter', 'Elevation has no effect', 'All elevations get the same weather'], answer: 0 },
        { type: 'mc', q: 'On which side of South America are the Andes?', choices: ['Western', 'Eastern', 'Northern only', 'In the center'], answer: 0 }
      ] },
    { title: 'Stop 2: The Amazon Rainforest', content: '<p>You glide down the <b>Amazon River</b>, which carries more water than any other river in the world. The <b>Amazon Rainforest</b> covers about <b>5.5 million km²</b>, mostly in Brazil. It lies on the <b>Equator</b>, so it is hot and receives more than 2 meters (80 inches) of rain a year: a <b>tropical rainforest climate</b>.</p><p>The rainforest is home to about 10% of all known species. <b>Deforestation</b> (cutting down forests) for farms, ranches, and logging is a major threat.</p>',
      puzzles: [
        { type: 'mc', q: 'Why is the Amazon hot and wet all year?', choices: ['It is located near the Equator', 'It is at a high elevation', 'It is near the North Pole', 'It is in the desert'], answer: 0 },
        { type: 'mc', q: 'What is deforestation?', choices: ['Cutting down or clearing forests', 'Planting new forests', 'Building dams', 'Flooding forests'], answer: 0 },
        { type: 'tf', q: 'True or false: The Amazon River carries more water than any other river.', answer: true }
      ] },
    { title: 'Stop 3: The Great Plains & the Mississippi', content: '<p>Back in North America, you fly over the <b>Great Plains</b>, a vast, flat grassland between the Mississippi River and the Rocky Mountains. Its fertile soil makes it one of the world\'s great farming regions for wheat and corn. Indiana is part of the nearby Corn Belt.</p><p>The <b>Mississippi River</b> system drains much of the central U.S. and is a major route for shipping grain by barge to the Gulf of Mexico.</p>',
      puzzles: [
        { type: 'mc', q: 'Why is the Great Plains an important farming region?', choices: ['It is flat with fertile soil', 'It has high mountains', 'It is a rainforest', 'It is covered in ice'], answer: 0 },
        { type: 'mc', q: 'How do farmers use the Mississippi River?', choices: ['To ship grain by barge', 'To grow rice in the river', 'As a source of salt', 'For skiing'], answer: 0 }
      ] },
    { title: 'Stop 4: The Alps', content: '<p>Across the Atlantic, you land in Switzerland to see the <b>Alps</b>, Europe\'s highest mountain range, stretching through eight countries. The Alps are a source of major rivers like the Rhine and the Rhône.</p><p>Europe is sometimes called a "peninsula of peninsulas." Major peninsulas include the <b>Scandinavian</b>, <b>Iberian</b> (Spain and Portugal), <b>Italian</b>, and <b>Balkan</b>. North of the Alps, the flat <b>Great European Plain</b> stretches from France to Russia with rich farmland.</p>',
      puzzles: [
        { type: 'match', q: 'Match each physical feature to its location.', pairs: [['Iberian Peninsula', 'Spain and Portugal'], ['Scandinavian Peninsula', 'Norway and Sweden'], ['Alps', 'Switzerland, Austria, and nearby countries'], ['Great European Plain', 'France to Russia']] },
        { type: 'mc', q: 'What is a peninsula?', choices: ['Land surrounded by water on three sides', 'Land surrounded by water on all sides', 'A tall mountain', 'A large river'], answer: 0 }
      ] },
    { title: 'Stop 5: The Gulf Stream Mystery', content: '<p>Your last stop is London. It is at about <b>52° N</b>, farther north than any city in the lower 48 U.S. states. Yet London\'s winters are mild, with January temperatures around <b>5 °C</b> (41 °F). Montréal, Canada, at a lower latitude of 45° N, averages about <b>−10 °C</b> (14 °F) in January.</p><p>The reason: the <b>Gulf Stream</b> and North Atlantic Current carry warm water from the Gulf of Mexico across the Atlantic. Winds blowing over this warm water keep western Europe mild. Cities near oceans also tend to have milder temperatures than cities far inland.</p>',
      puzzles: [
        { type: 'input', q: 'How many degrees Celsius warmer is London in January than Montréal?', answer: ['15'], unit: '°C', hint: '5 − (−10)' },
        { type: 'mc', q: 'Why is London\'s winter milder than Montréal\'s?', choices: ['Warm ocean currents (the Gulf Stream) and ocean winds', 'London is closer to the Equator', 'London is at a higher elevation', 'Montréal is near the ocean'], answer: 0 },
        { type: 'sort', q: 'Which factors affect a place\'s climate?', buckets: ['Affects climate', 'Does not affect climate'], items: [['Latitude', 0], ['Elevation', 0], ['Nearness to oceans', 0], ['Ocean currents', 0], ['The country\'s flag', 1], ['The city\'s population', 1]] }
      ] }
  ],
  finale: '<p>Your plane lands back in Indianapolis. From the cold heights of the Andes to the steamy Amazon, the flat plains, the snowy Alps, and mild London, you saw how <b>physical features and climate</b> shape how people live. Tour complete!</p>',
  exit: [
    { q: 'Which is the longest mountain range above sea level?', choices: ['Rocky Mountains', 'Alps', 'Andes', 'Appalachians'], answer: 2 },
    { q: 'Why does western Europe have mild winters for its latitude?', choices: ['The Gulf Stream brings warm water', 'It is near the Equator', 'It has high mountains', 'It has no winter'], answer: 0 },
    { q: 'Describe how one physical feature or climate affects the way people live in that region.', answer: 'Example: In the Andes, farmers build terraces and grow different crops at different elevations because it gets colder higher up.', lines: 4 }
  ]
},
{
  id: 'g6-ss-changing-landscape', std: 'g6-ss-geo', format: 'mystery',
  title: 'The Case of the Changing Landscape',
  tagline: 'Five places have transformed. Investigate how people adapted to, depended on, and changed their environment.',
  story: '<p>The Global Geography Bureau has received satellite photos showing dramatic changes in five places across Europe and the Americas. Your assignment: figure out <b>how</b> and <b>why</b> people changed these landscapes.</p><p>Geographers call this <b>human–environment interaction</b>. People <b>depend on</b> the environment, <b>adapt to</b> it, and <b>modify</b> (change) it.</p>',
  code: 'ADAPT',
  stages: [
    { title: 'Evidence File #1: The Netherlands', content: '<p><b>Satellite report:</b> About <b>one-quarter</b> of the Netherlands lies below sea level. Yet millions of people live and farm there.</p><p><b>Investigation:</b> For centuries, the Dutch have built <b>dikes</b> (walls to hold back water) and used windmills, and later electric pumps, to drain land. This reclaimed land is called a <b>polder</b>. Today, giant storm-surge barriers protect the coast.</p>',
      puzzles: [
        { type: 'mc', q: 'How did the Dutch create new land?', choices: ['Building dikes and pumping out water to make polders', 'Moving to the mountains', 'Cutting down forests', 'Building terraces'], answer: 0 },
        { type: 'mc', q: 'This is an example of people...', choices: ['Modifying the environment', 'Depending on the environment without changing it', 'Ignoring the environment', 'Moving away from the environment'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Panama Canal', content: '<p><b>Satellite report:</b> A channel cuts across the narrow <b>Isthmus of Panama</b>, connecting the Atlantic and Pacific Oceans.</p><p><b>Investigation:</b> Opened in <b>1914</b>, the Panama Canal uses a system of <b>locks</b> to raise and lower ships. Before it, ships sailing from New York to San Francisco had to go all the way around South America, a trip of about 13,000 miles. The canal cut the trip to about 5,000 miles.</p>',
      puzzles: [
        { type: 'input', q: 'About how many miles did the Panama Canal save on a trip from New York to San Francisco?', answer: ['8000', '8,000'], unit: 'miles' },
        { type: 'mc', q: 'Why did people build the canal at Panama?', choices: ['It is a narrow strip of land between two oceans', 'It is the widest part of the Americas', 'It is in the Andes', 'It had no rivers'], answer: 0 },
        { type: 'mc', q: 'What is one effect of the canal on world trade?', choices: ['Shipping between the Atlantic and Pacific became faster and cheaper', 'Ships stopped sailing', 'Trade moved only to Europe', 'It closed the Pacific Ocean'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Amazon', content: '<p><b>Satellite report:</b> Photos from 1985 and today show large areas of the Amazon Rainforest replaced by cattle ranches and soybean fields.</p><p><b>Investigation:</b> Clearing forest creates jobs and farmland, but it also destroys habitats, reduces the number of species, and releases carbon dioxide. Rainforests help regulate Earth\'s climate. Brazil and other countries have created protected areas and monitor the forest by satellite.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the effects of clearing the rainforest.', buckets: ['Benefit to people', 'Cost to the environment'], items: [['New farmland and ranches', 0], ['Jobs in logging and farming', 0], ['Loss of animal habitats', 1], ['Fewer species', 1], ['More carbon dioxide in the air', 1]] },
        { type: 'mc', q: 'Which action could help protect the rainforest while still helping people?', choices: ['Creating protected areas and supporting sustainable farming', 'Clearing all remaining forest', 'Building more roads through the forest', 'Ignoring satellite data'], answer: 0 }
      ] },
    { title: 'Evidence File #4: The Andes Terraces', content: '<p><b>Satellite report:</b> Mountain slopes in Peru are carved into hundreds of flat steps.</p><p><b>Investigation:</b> These are <b>terraces</b>, first built by the Inca and their ancestors. Terraces create flat land for farming, slow down rainwater, and prevent soil from washing away (<b>erosion</b>). Many are still used by farmers today.</p><p>Meanwhile, in Norway, people living along narrow <b>fjords</b> depend on the sea for fishing and travel by boat.</p>',
      puzzles: [
        { type: 'mc', q: 'How do terraces help farmers?', choices: ['They create flat land and prevent soil erosion', 'They make mountains taller', 'They block sunlight', 'They create lakes'], answer: 0 },
        { type: 'match', q: 'Match each example to the type of human–environment interaction.', pairs: [['Norwegians fishing along fjords for food', 'Depend on the environment'], ['Andean people wearing thick alpaca wool in the cold', 'Adapt to the environment'], ['The Dutch building dikes', 'Modify the environment']] }
      ] },
    { title: 'Evidence File #5: Your Own Backyard', content: '<p><b>Final report:</b> Human–environment interaction happens in Indiana, too. Early settlers drained huge wetlands in northern Indiana, like the Grand Kankakee Marsh, to create farmland. The Indiana Dunes were protected as a National Park in 2019. Lakes like Lake Monroe were created by building dams.</p>',
      puzzles: [
        { type: 'sort', q: 'Is each Indiana example depending, adapting, or modifying?', buckets: ['Depend', 'Adapt', 'Modify'], items: [['Using fertile soil to grow corn', 0], ['Using Lake Michigan for drinking water', 0], ['Wearing winter coats in January', 1], ['Building homes with basements for tornado safety', 1], ['Draining the Kankakee Marsh', 2], ['Building a dam to create Lake Monroe', 2]] },
        { type: 'mc', q: 'Which statement best summarizes your investigation?', choices: ['People everywhere depend on, adapt to, and change their environments, with both benefits and costs', 'People never change their environment', 'Only Europeans change their environment', 'Changes to the environment are always harmful'], answer: 0 }
      ] }
  ],
  finale: '<p>The Global Geography Bureau files your report. From Dutch dikes to the Panama Canal, the Amazon, the Andes, and your own backyard, you found that people are always shaping the land, and the land is always shaping people. Case closed!</p>',
  exit: [
    { q: 'Building a dam to create a lake is an example of people...', choices: ['Depending on the environment', 'Adapting to the environment', 'Modifying the environment', 'Ignoring the environment'], answer: 2 },
    { q: 'Why was the Panama Canal built where it is?', choices: ['Panama is a narrow isthmus between two oceans', 'Panama has no people', 'Panama is in Europe', 'Panama has the highest mountains'], answer: 0 },
    { q: 'Give one example of people modifying their environment. Describe one benefit and one cost.', answer: 'Example: Clearing the Amazon for farms. Benefit: farmland and jobs. Cost: loss of habitats and more carbon dioxide in the air.', lines: 4 }
  ]
}
);
