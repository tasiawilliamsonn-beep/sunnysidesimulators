/*
 * Sunnyside Simulators: Grade 6 social studies simulations (the Expedition wing).
 * Primary-source excerpts come from public-domain translations. Excerpts marked "adapted"
 * are shortened or modernized for sixth graders.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

var SS6_BG = (function () {
  // A simple Europe outline in the same map style as the globe navigator (lon -12..45, lat 34..72).
  function P(poly) { return 'M' + poly.map(function (p) { return ((p[0] + 12) / 57 * 600).toFixed(1) + ' ' + ((72 - p[1]) / 38 * 400).toFixed(1); }).join(' L') + 'Z'; }
  var EU = [[-9.5,43],[-8.9,37],[-6,36.2],[-5,36.2],[-2,36.7],[0,38.7],[0.5,40.5],[3.2,42],[3,43.3],[5,43.3],[7.5,43.8],[9.5,44.3],[10.5,43],[12.5,41.5],[15.6,40],[16,38],[17,39],[18.5,40.2],[16,41.5],[14,42.5],[12.3,44.5],[12.5,45.5],[13.7,45.6],[14.5,45.2],[17,43],[19.5,41.8],[19.5,40],[21,38],[23,36.5],[24,38],[23,39.5],[24,40.8],[26,40.8],[29,41.2],[28,42],[28,43.5],[29.7,45.3],[31.5,46.6],[33.5,46],[34.8,44.4],[36.6,45.2],[38,47],[39.7,47.1],[38.3,46.4],[40,43.5],[41.5,41.6],[45,42],[50,42],[50,68],[45,68],[40,66.5],[37,66.5],[34.5,65],[33,66.8],[36,69.1],[33,69.4],[30,70],[28,71],[24,71],[19.5,70],[16,69],[13,67.5],[12.5,65.5],[10.5,64],[8,63],[5,62],[5,60],[5.5,58.9],[7.5,58],[10.5,59.3],[11.2,58.9],[12,57.5],[12.9,55.5],[14.3,55.5],[16.5,56.3],[16.6,57.8],[18.9,59.8],[17.3,60.7],[17.5,62.5],[21,64.5],[22.3,65.8],[25.3,65.3],[25,64.3],[21.5,62.5],[21.5,61],[22.9,59.9],[25,60.3],[28,60.5],[30,60],[28,59.5],[24,59.3],[23.5,58.5],[24.2,57.5],[21.2,57.2],[21,56],[21.2,55.2],[19.8,54.5],[18.5,54.7],[16,54.3],[14.3,53.9],[12,54.2],[10.3,54.5],[10.5,56.2],[10.6,57.7],[8.2,57],[8.1,55.5],[8.6,54],[7,53.5],[5,53.3],[4.6,52.5],[3.5,51.4],[1.8,51],[1.3,50],[0,49.7],[-1.3,49.6],[-1.9,48.7],[-4.7,48.4],[-4.3,47.8],[-2.2,47.2],[-1.2,46],[-1.5,44],[-1.8,43.4],[-4,43.4],[-8,43.7]];
  var GB = [[-5.7,50],[-3,50.5],[1.4,51.2],[1.7,52.7],[0.2,53.5],[-0.2,54.5],[-1.6,55.6],[-2.1,57.1],[-1.8,57.6],[-3.3,58.6],[-5,58.6],[-5.7,57],[-5.5,56],[-4.9,55],[-3.1,54.9],[-3.4,54.2],[-3,53.4],[-4.5,53.3],[-4.3,52.3],[-5.3,51.8],[-3.2,51.4],[-4.4,51.1]];
  var IE = [[-6,52],[-6.2,53.7],[-5.5,54.6],[-7.5,55.3],[-8.5,54.4],[-10,53.5],[-10.3,51.8],[-8,51.6]];
  var AF = [[-12,28],[-9.8,29.5],[-9.5,32],[-6.8,34],[-5.9,35.8],[-2,35.1],[3,36.8],[10,37.3],[11,35.5],[10,34],[11.5,33],[15,32],[20,31],[45,31],[45,20],[-12,20]];
  var SI = [[12.4,38],[15.6,38.2],[15.1,36.7]];
  var land = [EU, GB, IE, AF, SI].map(function (p) { return '<path d="' + P(p) + '" fill="#d8e8c0" stroke="#6b8f3a" stroke-width="1.2"/>'; }).join('');
  return {
    europe: '<rect width="600" height="400" fill="#9fd0f5"/>' + land + '<g fill="#8d6e4a" font-size="14" opacity=".75"><text x="245" y="274">▲▲▲</text><text x="60" y="345">▲</text><text x="180" y="110">▲</text></g><text x="120" y="385" font-size="12" font-weight="800" fill="#1864ab" letter-spacing="2">MEDITERRANEAN SEA</text><text x="20" y="200" font-size="12" font-weight="800" fill="#1864ab" letter-spacing="2" transform="rotate(-80 20 200)">ATLANTIC</text>',
    meso: '<rect width="600" height="400" fill="#8ec9f0"/><path d="M0 0 H330 L320 40 L290 70 L270 110 L300 120 L340 105 L360 130 L330 160 L300 175 L330 195 L360 200 L340 215 L300 205 L260 190 L200 160 L140 120 L90 80 L40 40 L0 30Z" fill="#d9e8b5" stroke="#6b8f3a" stroke-width="2"/><path d="M340 215 L380 205 L440 220 L520 260 L560 320 L540 400 H380 L360 350 L345 300 L335 250Z" fill="#c9e3a0" stroke="#6b8f3a" stroke-width="2"/><g fill="#8d6e4a" font-size="15" opacity=".8"><text x="352" y="260">▲</text><text x="362" y="290">▲</text><text x="372" y="350">▲</text><text x="366" y="385">▲</text></g><text x="370" y="240" font-size="11" fill="#5c3d1e" font-weight="700">Andes Mountains</text><text x="420" y="60" font-size="13" font-weight="800" fill="#1864ab">Gulf of Mexico · Caribbean Sea</text><text x="130" y="300" font-size="13" font-weight="800" fill="#1864ab">PACIFIC OCEAN</text><g font-size="16" opacity=".55"><text x="300" y="150">🌳</text><text x="455" y="275">🌳</text><text x="485" y="300">🌳</text></g><text x="455" y="255" font-size="11" fill="#2b8a3e" font-weight="700">Amazon rainforest</text>',
    manor: '<rect width="600" height="400" fill="#b7d98b"/><path d="M0 330 Q150 300 300 335 T600 320 V360 Q450 380 300 370 T0 365Z" fill="#74c0fc"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<rect x="' + (330 + i * 40) + '" y="160" width="36" height="130" fill="' + (i % 2 ? '#e9d8a6' : '#d4b86a') + '" stroke="#8d6e4a"/>'; }).join('') + '<text x="360" y="150" font-size="12" font-weight="800" fill="#5c3d1e">Strip fields</text><path d="M60 140 Q130 60 200 140Z" fill="#a9c77a"/><g font-size="22" opacity=".7"><text x="10" y="60">🌲</text><text x="40" y="40">🌲</text><text x="520" y="70">🌲</text><text x="560" y="100">🌲</text></g><path d="M140 250 Q220 230 300 250" fill="none" stroke="#a07c4a" stroke-width="8" stroke-linecap="round"/>',
    florence: '<rect width="600" height="400" fill="#f1e3c6"/><path d="M0 280 Q150 260 300 285 T600 275 V325 Q450 335 300 320 T0 330Z" fill="#6fb7e0"/><text x="30" y="315" font-size="13" font-weight="800" fill="#1864ab">Arno River</text>' + [[40, 60], [120, 90], [480, 70], [540, 150], [60, 190], [420, 200]].map(function (b) { return '<rect x="' + b[0] + '" y="' + b[1] + '" width="44" height="34" fill="#e0a96d" stroke="#8b5e34"/><path d="M' + (b[0] - 3) + ' ' + b[1] + ' L' + (b[0] + 22) + ' ' + (b[1] - 14) + ' L' + (b[0] + 47) + ' ' + b[1] + 'Z" fill="#b5452a"/>'; }).join('') + '<path d="M0 30 Q300 0 600 30" fill="none" stroke="#b5452a" stroke-width="4" stroke-dasharray="10 6"/><text x="250" y="22" font-size="11" fill="#8b5e34" font-weight="700">City walls</text>'
  };
})();

/* ======================= Early civilizations of the Americas ======================= */
SUNNY_SIMS.push({
  id: 'g6-ss-three-empires', std: 'g6-ss-americas', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Expedition: Maya, Aztec & Inca', model: 'expedition', minutes: 30, icon: '🛕',
  setup: {
    title: 'Mesoamerica and the Andes', bg: SS6_BG.meso, avatar: '🧑‍🔬', start: 'tenoch',
    roads: [['tenoch', 'chichen'], ['chichen', 'tikal'], ['tikal', 'cusco'], ['cusco', 'machu']],
    places: [
      { id: 'tenoch', name: 'Tenochtitlan', icon: '🏝', x: 130, y: 105, scene: { title: 'Tenochtitlan, capital of the Aztec (Mexica) Empire, 1500s', sub: 'An island city in Lake Texcoco, today Mexico City', paragraphs: ['{tn1|The Aztec built their capital on an island in a shallow lake, joined to the shore by long stone causeways.} {tn2|Around the city, farmers built chinampas, floating gardens made of mud and reeds, which produced several harvests a year.} {tn3|The empire collected tribute (payments of goods like cacao, cotton, and feathers) from the peoples it conquered.} {tn4|About 200,000 people may have lived here, more than in any city in Spain at the time.}'], source: { by: 'Bernal Díaz del Castillo, a Spanish soldier, describing his first sight of the city (1519)', text: '{tns|"We were amazed and said that it was like the enchantments they tell of in the legend of Amadis, on account of the great towers and cues and buildings rising from the water, and all built of masonry."}' }, items: [['chinampa', '🌽', 'Chinampa garden', 'Floating gardens turned a swampy lake into rich farmland.'], ['causeway', '🛣', 'Stone causeway', 'Causeways connected the island city to the shore.'], ['tribute', '🧾', 'Tribute list', 'Conquered peoples paid the Aztec in goods.']] } },
      { id: 'chichen', name: 'Chichén Itzá', icon: '🔺', x: 330, y: 125, labelUp: true, scene: { title: 'Chichén Itzá, a Maya city', sub: 'The Yucatán Peninsula', paragraphs: ['{cz1|The Maya built stone pyramids like El Castillo, which has 365 steps in all, one for each day of their solar calendar.} {cz2|Maya astronomers tracked the sun, moon, and Venus so carefully that they could predict eclipses.} {cz3|The Yucatán has almost no rivers, so the Maya got water from cenotes, natural sinkholes filled with groundwater.}'], items: [['castillo', '🔺', 'El Castillo pyramid', 'Its 365 steps match the days of the solar year.'], ['cenote', '💧', 'Cenote (sinkhole well)', 'Cenotes supplied water where there were no rivers.']] } },
      { id: 'tikal', name: 'Tikal', icon: '🗿', x: 300, y: 172, scene: { title: 'Tikal, a Maya city-state', sub: 'The rainforest of Guatemala', paragraphs: ['{tk1|Maya civilization was not one empire but many city-states, each ruled by its own king.} {tk2|At Tikal, scribes carved glyphs, a writing system of hundreds of symbols, onto stone monuments called stelae.} {tk3|The Maya were among the first people in the world to use a symbol for zero.} {tk4|Millions of Maya people still live in Mexico and Central America and speak Maya languages today.}'], items: [['stela', '🗿', 'Carved stela', 'Stone monuments recorded kings and dates in glyphs.'], ['zero', '🐚', 'Shell glyph for zero', 'The Maya used a shell symbol for zero.']] } },
      { id: 'cusco', name: 'Cusco', icon: '🏔', x: 395, y: 330, scene: { title: 'Cusco, capital of the Inca Empire, 1500s', sub: 'High in the Andes Mountains', paragraphs: ['{cu1|The Inca Empire stretched about 2,500 miles along the Andes Mountains.} {cu2|To connect it, the Inca built more than 14,000 miles of roads with rope suspension bridges over deep canyons.} {cu3|Relay runners called chasquis carried messages up to 150 miles in a single day.} {cu4|The Inca had no written alphabet, so officials kept records on quipus, cords with knots that stood for numbers.}'], source: { by: 'Pedro Cieza de León, a Spanish traveler (adapted)', date: '1553', text: '{cus|"I believe that since the history of man there has been no account of such grandeur as is to be seen in this road."}' }, items: [['quipu', '🪢', 'Quipu', 'Knotted cords recorded numbers like taxes and populations.'], ['road', '🛤', 'Inca road and rope bridge', 'Roads and bridges tied the huge empire together.'], ['chasqui', '🏃', 'Chasqui runner', 'Relay runners carried news across the empire.']] } },
      { id: 'machu', name: 'Machu Picchu', icon: '⛰', x: 370, y: 300, labelUp: true, scene: { title: 'Machu Picchu', sub: 'A royal estate on a mountain ridge', paragraphs: ['{mp1|Machu Picchu sits on a ridge nearly 8,000 feet high.} {mp2|The Inca cut terraces, flat steps, into the steep slopes so they could farm without the soil washing away.} {mp3|Stones were cut so precisely that they fit together without mortar and have survived earthquakes for 500 years.}'], items: [['terrace', '🪜', 'Farming terraces', 'Terraces created flat farmland on steep mountains.'], ['wall', '🧱', 'Mortarless stone wall', 'Precisely cut stones survived earthquakes.']] } }
    ]
  },
  place: 'Expedition · Mesoamerica and the Andes',
  mission: 'Travel across 2,000 years and thousands of miles to visit three great civilizations. Enter each city, examine the evidence, and figure out how each civilization adapted to its geography and what it achieved.',
  question: 'How did the Maya, Aztec, and Inca adapt to their environments, and what did they achieve?',
  takeaway: 'Each civilization solved the problems of its geography: the Aztec built chinampas in a lake, the Maya used cenotes in a riverless rainforest, and the Inca built terraces and roads in the Andes. Their achievements include calendars, the concept of zero, glyph writing, quipus, and engineering that still stands today.',
  vocab: [['Civilization', 'A complex society with cities, government, specialized jobs, and records.'], ['City-state', 'An independent city with its own ruler.'], ['Tribute', 'Payments of goods to a ruling power.'], ['Chinampa', 'An Aztec floating garden.'], ['Quipu', 'Knotted cords the Inca used for records.']],
  warmup: { style: 'Solve the geography', prompt: 'How would you farm in each place?', items: [['A steep mountain', 'Cut flat steps (terraces).'], ['A shallow lake', 'Build up islands of mud (chinampas).'], ['A rainforest with no rivers', 'Find underground water (cenotes).']] },
  steps: [
    { tag: 'explore', title: 'Enter Tenochtitlan', sheet: 1, goal: { text: 'Enter Tenochtitlan and examine all 3 objects.', check: { entered_tenoch: true, got_chinampa: true, got_causeway: true, got_tribute: true } }, q: { type: 'mc', q: 'Bernal Díaz compares the city to "enchantments" in a legend. What does this tell you?', choices: ['The Spanish were amazed by how advanced the city was', 'The city was imaginary', 'The Spanish thought the city was small'], answer: 0 } },
    { tag: 'explore', title: 'Visit all five sites', sheet: 2, goal: { text: 'Enter all 5 sites and collect at least 12 pieces of evidence.', check: { n_entered: { gte: 5 }, n_items: { gte: 12 } } } },
    { tag: 'record', title: 'Compare the civilizations', sheet: 3, q: { type: 'table', q: 'Complete the comparison chart from your journal.', rowHead: 'Civilization', cols: [{ label: 'Geography', accept: function (v, r) { return r.g.some(function (w) { return v.toLowerCase().indexOf(w) >= 0; }); } }, { label: 'One achievement', accept: function (v, r) { return r.a.some(function (w) { return v.toLowerCase().indexOf(w) >= 0; }); } }], rows: [{ label: 'Maya', g: ['rain', 'forest', 'yucat', 'jungle'], a: ['calendar', 'zero', 'glyph', 'writ', 'pyramid', 'astronom'] }, { label: 'Aztec', g: ['lake', 'island', 'valley', 'mexico'], a: ['chinampa', 'causeway', 'tribute', 'city', 'garden'] }, { label: 'Inca', g: ['mountain', 'andes'], a: ['road', 'quipu', 'terrace', 'bridge', 'machu'] }] } },
    { tag: 'reason', title: 'Adaptation', sheet: 4, q: { type: 'sort', q: 'Which geography problem did each solution solve?', bins: ['Steep mountains', 'A lake', 'No rivers'], items: [['Terraces', 0], ['Chinampas', 1], ['Cenotes', 2], ['Causeways', 1], ['Rope suspension bridges', 0]] } },
    { tag: 'reason', title: 'Misconception check', sheet: 4, q: { type: 'mc', q: 'Which statement is TRUE?', choices: ['Millions of Maya people still live in Mexico and Central America today', 'The Maya disappeared completely', 'The Maya, Aztec, and Inca all lived at the same time in the same place'], answer: 0 } },
    { tag: 'write', title: 'Greatest achievement (CER)', sheet: 5, q: { type: 'write', q: 'Which achievement was the most impressive? Support your claim with evidence from the expedition.', parts: [
      { label: 'Claim', min: 10, need: [{ words: ['maya', 'aztec', 'inca'], label: 'Names a civilization' }] },
      { label: 'Evidence (quote or fact)', min: 12, need: [{ words: ['chinampa', 'road', 'quipu', 'terrace', 'zero', 'calendar', 'glyph', 'causeway', 'pyramid', 'cenote', 'bridge', '14,000', '365'], label: 'Names specific evidence' }] },
      { label: 'Reasoning', starter: 'This was impressive because', min: 14, need: [{ words: ['geography', 'mountain', 'lake', 'problem', 'without', 'solve', 'adapt'], label: 'Connects to geography or challenge' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: whose words?', sheet: 6, q: { type: 'text', q: 'Both primary sources on this expedition were written by Spanish visitors. Quote one and explain what perspective might be missing.', min: 25, quote: true, need: [{ words: ['spanish', 'european', 'outsider', 'native', 'aztec', 'inca', 'perspective'], label: 'Discusses perspective' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-farm-engineers', std: 'g6-ss-americas', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Farm Engineers of the Americas', model: 'adaptLab', minutes: 20, icon: '🌽',
  setup: {
    envs: [{ id: 'andes', name: 'Andes slopes (Inca)', icon: '🏔', kind: 'mountain', problem: 'The land is steep, so rain washes the soil down the mountain and crops fall over.' }, { id: 'lake', name: 'Lake Texcoco (Aztec)', icon: '🏝', kind: 'lake', problem: 'The capital is on an island in a shallow, swampy lake with little dry farmland.' }, { id: 'yucatan', name: 'Yucatán rainforest (Maya)', icon: '🌳', kind: 'forest', problem: 'Thin rainforest soil loses its nutrients quickly when one crop is planted over and over.' }, { id: 'desert', name: 'Peru\'s desert coast', icon: '🏜', kind: 'plains', problem: 'It almost never rains, but rivers flow down from the mountains.' }],
    techs: [['terrace', 'Terraces', '🪜', 'Cut flat steps into a slope and hold them with stone walls.'], ['chinampa', 'Chinampas', '🟩', 'Pile mud and plants into raised gardens in shallow water.'], ['milpa', 'Milpa (Three Sisters)', '🌽', 'Plant corn, beans, and squash together and rest fields in between.'], ['irrigate', 'Irrigation canals', '💧', 'Dig canals to carry river water to dry fields.']],
    results: { 'andes|terrace': [3, 'Terraces stop erosion and create flat fields. The Inca grew potatoes and corn on mountainsides this way.'], 'andes|irrigate': [2, 'Canals help, but on steep slopes the soil still washes away. The Inca combined canals WITH terraces.'], 'andes|milpa': [1, 'Good crops, but the slope still washes the soil away.'], 'andes|chinampa': [0, 'Chinampas need shallow water. There is no lake on a mountainside!'], 'lake|chinampa': [3, 'Chinampas turn the lake into rich farmland with up to seven harvests a year.'], 'lake|terrace': [0, 'There are no slopes to terrace in a flat lake.'], 'lake|irrigate': [1, 'There is plenty of water already. The problem is having no dry land!'], 'lake|milpa': [1, 'You need land to plant a milpa. The lake has little of it.'], 'yucatan|milpa': [3, 'Beans add nutrients back to the soil, and resting fields lets the forest soil recover.'], 'yucatan|irrigate': [1, 'Water is not the main problem in a rainforest.'], 'yucatan|terrace': [1, 'The land is mostly flat, so terraces don\'t solve the soil problem.'], 'yucatan|chinampa': [1, 'There are few lakes on the Yucatán.'], 'desert|irrigate': [3, 'Canals bring mountain river water to the desert. Peoples like the Moche and Inca farmed the coast this way.'], 'desert|terrace': [1, 'Flat steps don\'t help if there is no water.'], 'desert|milpa': [0, 'Without water, nothing grows.'], 'desert|chinampa': [0, 'There is no lake in the desert.'] }
  },
  place: 'Expedition · Engineering Field Station',
  mission: 'Farmers across the Americas faced four very different problems. Test each farming technology in each place, run four seasons, and discover which ancient engineering solution fits each environment, and why.',
  question: 'How did the peoples of the Americas change their environments to grow food?',
  takeaway: 'Early American civilizations engineered solutions to their geography: Inca terraces on mountains, Aztec chinampas in a lake, Maya milpa farming in the rainforest, and irrigation canals in coastal deserts. The right technology depends on the environment\'s specific problem.',
  vocab: [['Terrace', 'A flat step cut into a hillside for farming.'], ['Erosion', 'Soil being worn or washed away.'], ['Irrigation', 'Bringing water to crops through canals or ditches.'], ['Milpa', 'A field of corn, beans, and squash planted together.']],
  warmup: { style: 'Problem → solution', prompt: 'Name a solution.', items: [['Water runs off a hill too fast', 'Build steps or walls to slow it.'], ['Soil is worn out', 'Rest it or plant crops that add nutrients.'], ['No rain but a river nearby', 'Dig ditches to bring the water.']] },
  steps: [
    { tag: 'predict', title: 'Predict', q: { type: 'predict', q: 'Which technology do you predict works best on the Andes slopes?', choices: ['Terraces', 'Chinampas', 'Irrigation canals'] } },
    { tag: 'test', title: 'The Andes', sheet: 1, goal: { text: 'Get an excellent harvest on the Andes slopes.', check: { best_andes: true } }, q: { type: 'mc', q: 'Why did terraces work on the Andes slopes?', choices: ['They stop soil from washing downhill and create flat land', 'They bring water from the lake', 'They add nutrients to the soil'], answer: 0, why: 'You predicted: {{pred:s0}}.' } },
    { tag: 'test', title: 'Solve every environment', sheet: 2, goal: { text: 'Get an excellent harvest in all four places.', check: { n_best: { gte: 4 } } } },
    { tag: 'record', title: 'Record your results', sheet: 3, q: { type: 'table', q: 'Record the best technology for each place.', rowHead: 'Place', cols: [{ label: 'Best technology', accept: function (v, r) { return v.toLowerCase().indexOf(r.t) >= 0; } }], rows: [{ label: 'Andes slopes', t: 'terrace' }, { label: 'Lake Texcoco', t: 'chinampa' }, { label: 'Yucatán rainforest', t: 'milpa' }, { label: 'Desert coast', t: 'irrigat' }] } },
    { tag: 'reason', title: 'Failed tests', sheet: 4, q: { type: 'mc', q: 'Why did chinampas FAIL on the Andes slopes?', choices: ['Chinampas need shallow water, and mountains have none', 'Mountains are too cold for corn', 'Chinampas are too expensive'], answer: 0 } },
    { tag: 'write', title: 'Engineering report', sheet: 5, q: { type: 'write', q: 'Write an engineering report comparing two civilizations.', parts: [
      { label: 'Civilization 1: problem and solution', min: 14, need: [{ words: ['inca', 'aztec', 'maya'], label: 'Names a civilization' }, { words: ['terrace', 'chinampa', 'milpa', 'irrigat', 'canal'], label: 'Names the technology' }] },
      { label: 'Civilization 2: problem and solution', min: 14, need: [{ words: ['inca', 'aztec', 'maya'], label: 'Names a civilization' }, { words: ['terrace', 'chinampa', 'milpa', 'irrigat', 'canal'], label: 'Names the technology' }] },
      { label: 'Big idea', starter: 'Both show that', min: 10, need: [{ words: ['environment', 'geography', 'adapt', 'change', 'modify'], label: 'States the big idea' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: modern connection', sheet: 6, q: { type: 'text', q: 'Farmers today still use terraces and irrigation. Describe where one of these technologies is used now and why.', min: 20 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-civ-compare', std: 'g6-ss-americas', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Three Civilizations Museum Sort', model: 'sortLab', minutes: 15, icon: '🏺',
  setup: {
    prompt: 'The museum\'s artifact labels got mixed up. Sort each card to the civilization it belongs to, or to "All three."',
    bins: [['Maya', '🗿', '#2f9e44'], ['Aztec', '🏝', '#e8590c'], ['Inca', '🏔', '#7048e8'], ['All three', '🌎', '#1d2433']],
    cards: [['Glyph writing carved on stelae', 0, 'The Maya had a full writing system of glyphs.'], ['A symbol for zero', 0, 'Maya mathematicians used a shell for zero.'], ['Independent city-states with their own kings', 0, 'Maya cities were separate city-states.'], ['Capital built on an island in a lake', 1, 'Tenochtitlan was on Lake Texcoco.'], ['Chinampa floating gardens', 1, 'Chinampas were Aztec.'], ['Collected tribute from conquered peoples', 1, 'The Aztec Empire ran on tribute.'], ['Quipus: knotted cords for records', 2, 'The Inca used quipus.'], ['14,000 miles of mountain roads', 2, 'The Inca road system crossed the Andes.'], ['Machu Picchu', 2, 'Machu Picchu is an Inca site.'], ['Grew corn and adapted farming to geography', 3, 'All three civilizations grew corn and adapted their farming.'], ['Built large stone temples or pyramids', 3, 'All three built monumental stone architecture.']]
  },
  place: 'Expedition · Sunnyside History Museum',
  mission: 'The new exhibit opens tomorrow, but every artifact label is scrambled! Use what you know about each civilization to sort the cards, including the traits all three shared.',
  question: 'How were the Maya, Aztec, and Inca similar and different?',
  takeaway: 'The Maya (city-states, glyphs, zero, calendars), Aztec (island capital, chinampas, tribute), and Inca (Andes empire, roads, quipus, terraces) were different civilizations in different times and places, but all adapted farming to their geography and built great stone architecture.',
  vocab: [['Artifact', 'An object made by people long ago.'], ['Compare', 'Tell how things are alike.'], ['Contrast', 'Tell how things are different.'], ['Empire', 'Many lands and peoples under one ruler.']],
  warmup: { style: 'Venn warm-up', prompt: 'Alike or different?', items: [['A cat and a dog', 'Alike: pets. Different: sounds, size.'], ['What goes in the middle of a Venn diagram?', 'Traits both share.'], ['Name one trait ALL civilizations share', 'Cities, government, jobs, records.']] },
  steps: [
    { tag: 'test', title: 'Sort the exhibit', sheet: 1, goal: { text: 'Sort all 11 artifact cards correctly.', check: { allRight: true } } },
    { tag: 'reason', title: 'Records', sheet: 2, q: { type: 'mc', q: 'The Maya used glyphs and the Inca used quipus. What does this show?', choices: ['Civilizations found different ways to keep records', 'The Inca could not count', 'Glyphs and quipus were the same thing'], answer: 0 } },
    { tag: 'reason', title: 'Time and place', sheet: 2, q: { type: 'mc', q: 'Why is it wrong to say these three civilizations "lived at the same time and place"?', choices: ['They were centuries and thousands of miles apart', 'They were all in Mexico', 'They all fell in 1492'], answer: 0 } },
    { tag: 'write', title: 'Compare and contrast', sheet: 3, q: { type: 'write', q: 'Compare and contrast two civilizations.', parts: [
      { label: 'Alike', starter: 'Both the', min: 12, need: [{ words: ['maya', 'aztec', 'inca'], label: 'Names civilizations' }] },
      { label: 'Different', starter: 'However,', min: 14, need: [{ words: ['glyph', 'zero', 'quipu', 'road', 'chinampa', 'island', 'tribute', 'city-state', 'andes', 'terrace'], label: 'Names a specific difference' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: write a label', sheet: 4, q: { type: 'text', q: 'Write a museum label (3–4 sentences) for one artifact: what it is, which civilization made it, and why it matters.', min: 35 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-maya-numbers', std: 'g6-ss-americas', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Maya Number Stele', model: 'mayaCount', minutes: 20, icon: '🗿',
  setup: { targets: [8, 13, 20, 45, 365] },
  place: 'Expedition · Tikal stone workshop',
  mission: 'The king of Tikal needs numbers carved on a new stele, and only you know the Maya number system! Use dots, bars, and the shell for zero to carve each number. Discover why the Maya system counts by 20s.',
  question: 'How did the Maya number system work, and why was the concept of zero a major achievement?',
  takeaway: 'Maya numbers used dots (1), bars (5), and a shell (0), stacked in levels worth 1, 20, and 400 (base 20). Using zero as a placeholder let them write very large numbers for calendars and astronomy, an idea many civilizations did not have.',
  vocab: [['Base 20', 'A number system that groups by twenties.'], ['Place value', 'A digit\'s value depends on its position.'], ['Placeholder', 'A symbol (like zero) that holds an empty place.'], ['Stele', 'A carved stone monument.']],
  warmup: { style: 'Place value', prompt: 'Think about our base-10 system.', items: [['What is the 3 worth in 307?', '300.'], ['What does the 0 do in 307?', 'Holds the tens place empty.'], ['Why might a people count by 20s?', 'Fingers AND toes!']] },
  steps: [
    { tag: 'explore', title: 'Carve 8', sheet: 1, goal: { text: 'Carve the number 8.', check: { built_8: true } }, q: { type: 'mc', q: 'How did you make 8?', choices: ['One bar and three dots', 'Eight dots', 'Two bars'], answer: 0 } },
    { tag: 'explore', title: 'Carve 20', sheet: 1, text: 'Use **Next mission**. 20 is tricky: a level can only hold up to 19!', goal: { text: 'Carve the number 20.', check: { built_20: true } }, q: { type: 'mc', q: 'How is 20 written in Maya numbers?', choices: ['One dot in the 20s level and a shell (zero) in the 1s level', 'Four bars', 'Twenty dots'], answer: 0 } },
    { tag: 'test', title: 'All missions', sheet: 2, goal: { text: 'Carve all five numbers, including 365.', check: { nBuilt: { gte: 5 } } } },
    { tag: 'record', title: 'Decode', sheet: 3, q: { type: 'num', q: 'A stele shows 2 dots in the 20s level and 1 bar + 1 dot in the 1s level. What number is it?', answer: 46, work: true } },
    { tag: 'reason', title: 'Why zero?', sheet: 4, q: { type: 'mc', q: 'Why was a symbol for zero so important?', choices: ['It holds an empty place, so large numbers can be written clearly', 'It means "nothing happened"', 'It was only decoration'], answer: 0 } },
    { tag: 'write', title: 'Explain the system', sheet: 5, q: { type: 'write', q: 'Teach the Maya number system to a younger student.', parts: [
      { label: 'The symbols', min: 10, need: [{ words: ['dot'], label: 'Explains dots' }, { words: ['bar'], label: 'Explains bars' }, { words: ['shell', 'zero'], label: 'Explains zero' }] },
      { label: 'The levels', min: 10, need: [{ words: ['20', 'twenty'], label: 'Explains base 20' }] },
      { label: 'Why it mattered', min: 10, need: [{ words: ['calendar', 'astronom', 'large', 'zero', 'record'], label: 'Connects to Maya achievements' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the 400s', sheet: 6, q: { type: 'num', q: 'How would you find the value of 1 dot in the 400s level, 0 in the 20s, and 0 in the 1s? What number is it?', answer: 400 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-encounter-timeline', std: 'g6-ss-americas', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Encounter: The Fall of Two Empires', model: 'timeline', minutes: 20, icon: '⚔️',
  setup: {
    events: [['col', 1492, 'Columbus reaches the Caribbean', 'Spain begins exploring the Americas', '⛵'], ['cortes', 1519, 'Cortés lands in Mexico', 'He allies with the Tlaxcalans, enemies of the Aztec', '🐎'], ['pox1', 1520, 'Smallpox strikes Tenochtitlan', 'Thousands die, including the emperor', '🦠'], ['fall', 1521, 'Tenochtitlan falls', 'The Aztec Empire ends', '🏚'], ['pox2', 1527, 'Smallpox reaches the Inca', 'The Inca emperor Huayna Capac dies', '🦠'], ['civil', 1529, 'Inca civil war', 'Two brothers, Huáscar and Atahualpa, fight for the throne', '⚔️'], ['capture', 1532, 'Pizarro captures Atahualpa', 'A small Spanish force takes the emperor', '⛓'], ['cusco', 1533, 'Spanish take Cusco', 'The Inca capital falls', '🏔']],
    links: [['pox1', 'fall', 'Disease killed so many defenders that the city could not hold.'], ['pox2', 'civil', 'The emperor\'s death from smallpox left no clear heir, starting a war.'], ['civil', 'capture', 'The civil war divided and weakened the empire right before Pizarro arrived.'], ['cortes', 'fall', 'Thousands of Tlaxcalan allies fought beside the Spanish.'], ['capture', 'cusco', 'Without their emperor, the Inca could not organize a defense.']]
  },
  place: 'Expedition · Archive of the Americas',
  mission: 'How did a few hundred Spanish soldiers bring down two of the largest empires in the world? Put the events in order, then link the causes and effects. The answer is more complicated than "better weapons."',
  question: 'Why did the Aztec and Inca Empires fall to the Spanish?',
  takeaway: 'The Aztec and Inca Empires fell mainly because of disease (smallpox killed millions who had no immunity), alliances with other Native peoples who opposed the Aztec, and an Inca civil war, along with Spanish steel, horses, and guns.',
  vocab: [['Conquistador', 'A Spanish conqueror of the Americas.'], ['Epidemic', 'A disease that spreads to many people.'], ['Alliance', 'An agreement to work together.'], ['Civil war', 'A war between groups in the same country.']],
  warmup: { style: 'Rank the causes', prompt: 'Guess: which mattered MOST in the fall of the Aztec?', items: [['Steel swords', 'Helped, but not the biggest.'], ['Smallpox', 'Killed a huge share of the population.'], ['Allies', 'Tens of thousands of Native allies joined Cortés.']] },
  steps: [
    { tag: 'test', title: 'Order the events', sheet: 1, goal: { text: 'Put all 8 events in order.', check: { ordered: true } } },
    { tag: 'test', title: 'Link causes and effects', sheet: 2, goal: { text: 'Find all 5 cause-and-effect links.', check: { allLinks: true } } },
    { tag: 'reason', title: 'Most important cause', sheet: 3, q: { type: 'mc', q: 'Which cause appears in BOTH empires\' falls?', choices: ['Smallpox', 'The Tlaxcalan alliance', 'The capture of Atahualpa'], answer: 0 } },
    { tag: 'reason', title: 'Time math', sheet: 3, q: { type: 'num', q: 'How many years after Columbus did Tenochtitlan fall?', answer: 29, unit: 'years' } },
    { tag: 'write', title: 'Why did they fall? (CER)', sheet: 4, q: { type: 'write', q: 'What was the MOST important reason the empires fell?', parts: [
      { label: 'Claim', min: 8, need: [{ words: ['disease', 'smallpox', 'allies', 'alliance', 'civil war', 'weapons', 'horses', 'steel'], label: 'Names a cause' }] },
      { label: 'Evidence from the timeline', min: 14, number: true },
      { label: 'Reasoning', starter: 'This mattered most because', min: 14 }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: a myth', sheet: 5, q: { type: 'text', q: 'Some books say the Spanish won "because of their superior weapons." Using the timeline, explain why this is an oversimplification.', min: 30, need: [{ words: ['disease', 'smallpox', 'allies', 'civil'], label: 'Uses other causes' }] } }
  ]
});

/* ======================= Medieval Europe to the Renaissance ======================= */
SUNNY_SIMS.push({
  id: 'g6-ss-feudal-manor', std: 'g6-ss-europe', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Life on a Medieval Manor', model: 'expedition', minutes: 25, icon: '🏰',
  setup: {
    title: 'A manor in England, 1200', bg: SS6_BG.manor, avatar: '🧑‍🌾', start: 'village', compass: false,
    roads: [['village', 'fields'], ['village', 'church'], ['village', 'castle'], ['castle', 'yard'], ['village', 'mill'], ['mill', 'fields']],
    places: [
      { id: 'castle', name: 'Lord\'s castle', icon: '🏰', x: 130, y: 110, scene: { title: 'The lord\'s castle', paragraphs: ['{cs1|Lord Edmund holds this manor as a fief, land granted by a greater lord, the Earl, who received it from the king.} {cs2|In return, Edmund must be loyal and send knights to fight when the Earl calls.} {cs3|Here in the great hall, Edmund also acts as judge, settling arguments between the peasants of the manor.}'], source: { by: 'An oath of fealty recorded by Galbert of Bruges', date: '1127', text: '{css|"I promise on my faith that I will in future be faithful to count William, and that I will observe my homage to him completely against all persons in good faith and without deceit."}' }, items: [['fief', '📜', 'Grant of the fief', 'Land was given in exchange for loyalty and military service.'], ['court', '⚖️', 'Manor court', 'The lord judged disputes among his peasants.']] } },
      { id: 'yard', name: 'Knights\' yard', icon: '🛡', x: 240, y: 70, scene: { title: 'The knights\' training yard', paragraphs: ['{ky1|Knights train every day with sword, lance, and shield.} {ky2|A knight received land or support from his lord and, in exchange, promised to fight for him.} {ky3|Knights were expected to follow a code called chivalry: be brave, loyal, and protect the weak.}'], items: [['armor', '🛡', 'Chain mail armor', 'Knights were expensive warriors who needed land to support them.'], ['chivalry', '🤝', 'Code of chivalry', 'Knights promised bravery, loyalty, and protection of the weak.']] } },
      { id: 'church', name: 'Parish church', icon: '⛪', x: 280, y: 200, scene: { title: 'The parish church', paragraphs: ['{pc1|The Catholic Church was the most powerful institution in medieval Europe.} {pc2|Everyone on the manor attended, and peasants paid a tithe, one-tenth of their harvest, to the Church.} {pc3|Priests and monks were among the few people who could read and write.}'], items: [['tithe', '🌾', 'Tithe barn', 'Peasants gave one-tenth of their crops to the Church.'], ['book', '📖', 'Handwritten Bible', 'Monks copied books by hand, so books were rare.']] } },
      { id: 'village', name: 'Village', icon: '🛖', x: 200, y: 290, scene: { title: 'The peasants\' village', paragraphs: ['{vl1|Most people on the manor are serfs, peasants who are bound to the land.} {vl2|A serf cannot leave the manor or marry without the lord\'s permission.} {vl3|In exchange for protection and a small plot of land, serfs work the lord\'s fields about three days a week.} {vl4|Families live in one-room huts of wood and mud with thatched roofs, often sharing space with their animals.}'], items: [['hut', '🛖', 'Wattle-and-daub hut', 'Serfs lived in simple one-room homes.'], ['bound', '⛓', 'Rule: serfs may not leave', 'Serfs were bound to the land and the lord.']] } },
      { id: 'fields', name: 'Strip fields', icon: '🌾', x: 450, y: 225, scene: { title: 'The open fields', paragraphs: ['{fd1|The farmland is divided into long strips.} {fd2|Some strips belong to the lord (his demesne), and some are farmed by serf families for themselves.} {fd3|Fields are rotated: one grows wheat, one grows peas or beans, and one rests, so the soil stays healthy.}'], items: [['demesne', '👑', 'The lord\'s strips', 'Serfs had to farm the lord\'s land before their own.'], ['rotation', '🔄', 'Three-field rotation', 'Rotating crops kept the soil fertile.']] } },
      { id: 'mill', name: 'Mill', icon: '⚙️', x: 470, y: 330, labelUp: true, scene: { title: 'The lord\'s mill', paragraphs: ['{ml1|Peasants must grind their grain at the lord\'s mill, and the lord keeps a share of the flour as a fee.} {ml2|The manor tries to produce everything it needs: food, cloth, tools, and flour.}'], items: [['fee', '🪙', 'Milling fee', 'Lords profited from mills, ovens, and other services.'], ['self', '🏘', 'Self-sufficient manor', 'Manors produced almost everything they needed.']] } }
    ]
  },
  place: 'Expedition · A medieval manor, 1200',
  mission: 'You are a traveling scribe recording life on a medieval manor. Visit every part of it, collect evidence, and figure out how feudalism worked: who gave what, and who got what in return?',
  question: 'How did feudalism and the manor system organize life in medieval Europe?',
  takeaway: 'Feudalism was a system of exchanges: kings granted land (fiefs) to lords for loyalty and military service; lords gave land to knights who fought for them; serfs farmed the land in exchange for protection but were bound to it. The Church was powerful in everyone\'s life, and manors produced almost everything they needed.',
  vocab: [['Feudalism', 'A system where land was exchanged for loyalty and service.'], ['Fief', 'Land granted by a lord.'], ['Serf', 'A peasant bound to the lord\'s land.'], ['Manor', 'A lord\'s estate with its village and fields.'], ['Tithe', 'One-tenth of income given to the Church.']],
  warmup: { style: 'Fair trade?', prompt: 'Would you make this trade?', items: [['Farm someone\'s land 3 days a week for protection', 'Answers vary; this is the serf\'s deal.'], ['Fight in battles in exchange for land', 'The knight\'s deal.'], ['What if you couldn\'t leave?', 'Serfs were bound to the land.']] },
  steps: [
    { tag: 'explore', title: 'Start in the village', sheet: 1, goal: { text: 'Enter the village and examine both objects.', check: { entered_village: true, got_hut: true, got_bound: true } }, q: { type: 'mc', q: 'What did a serf get in exchange for working the lord\'s land?', choices: ['Protection and a small plot of land', 'A salary in gold', 'Freedom to move anywhere'], answer: 0 } },
    { tag: 'explore', title: 'Tour the manor', sheet: 2, goal: { text: 'Enter all 6 places and collect at least 11 objects.', check: { n_entered: { gte: 6 }, n_items: { gte: 11 } } } },
    { tag: 'reason', title: 'Feudal pyramid', sheet: 3, q: { type: 'order', q: 'Order the feudal pyramid from the TOP (most power) to the BOTTOM.', items: ['King', 'Lords (nobles)', 'Knights', 'Serfs (peasants)'] } },
    { tag: 'sort', title: 'Who gives what?', sheet: 3, q: { type: 'sort', q: 'What did each group mainly GIVE?', bins: ['Lord', 'Knight', 'Serf'], items: [['Land (fiefs) and protection', 0], ['Military service', 1], ['Labor in the fields', 2], ['Justice in the manor court', 0], ['Part of the harvest', 2]] } },
    { tag: 'write', title: 'A day on the manor', sheet: 4, q: { type: 'write', q: 'Explain feudalism from the point of view of a serf OR a knight. Use a quote or fact from the manor.', parts: [
      { label: 'Who I am', min: 8, need: [{ words: ['serf', 'knight', 'peasant'], label: 'Names a role' }] },
      { label: 'What I give and get', min: 16, need: [{ words: ['protect', 'land', 'fight', 'work', 'labor', 'loyal'], label: 'Explains the exchange' }] },
      { label: 'Evidence', min: 8, quote: true }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the oath', sheet: 5, q: { type: 'text', q: 'Quote the oath of fealty and explain why promises like this held feudal society together.', min: 25, quote: true, need: [{ words: ['loyal', 'faithful', 'promise', 'trust'], label: 'Explains loyalty' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-black-death', std: 'g6-ss-europe', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'The Black Death Tracker', model: 'plagueMap', minutes: 25, icon: '🐀',
  setup: {},
  place: 'Expedition · Map room, 1346–1353',
  mission: 'In 1346, a deadly plague appeared at the Black Sea port of Caffa. Watch it travel across Europe along trade routes, test how ships and quarantines changed its spread, then visit a manor after the plague to see how it changed society.',
  question: 'How did the Black Death spread, and how did it change European society?',
  takeaway: 'The Black Death (1347–1351) spread fastest along sea trade routes, carried by fleas on rats and by travelers, and killed about one-third of Europe\'s people. With so few workers left, surviving peasants could demand higher wages or leave, which weakened feudalism.',
  vocab: [['Plague', 'A deadly contagious disease.'], ['Trade route', 'A path merchants use to carry goods.'], ['Quarantine', 'Keeping people or ships apart to stop disease.'], ['Labor shortage', 'Not enough workers.']],
  warmup: { style: 'How do things spread?', prompt: 'Think about how things travel.', items: [['How can a rumor spread fastest?', 'Through the most connected people.'], ['Why do colds spread in school?', 'People are close together and share things.'], ['In 1347, what was the fastest way to travel?', 'By ship.']] },
  steps: [
    { tag: 'predict', title: 'Predict', q: { type: 'predict', q: 'Predict: will the plague reach port cities or inland cities first?', choices: ['Port cities', 'Inland cities', 'All at the same time'] } },
    { tag: 'observe', title: 'Watch it spread', sheet: 1, text: 'Press ▶ Play and watch the red dots.', goal: { text: 'Play until the plague reaches every city.', check: { all: true } }, q: { type: 'mc', q: 'Which kind of cities were reached first?', choices: ['Port cities on sea trade routes', 'Cities in the mountains', 'Cities far from any trade'], answer: 0, why: 'You predicted: {{pred:s0}}.' } },
    { tag: 'test', title: 'Stop the ships', sheet: 2, text: 'Turn OFF "Ships can sail trade routes" and play again.', goal: { text: 'Watch the plague reach every city with ships stopped.', check: { allNoSea: true } }, q: { type: 'mc', q: 'What happened when ships were stopped?', choices: ['The plague spread more slowly over land but still spread', 'The plague stopped completely', 'It spread faster'], answer: 0 } },
    { tag: 'test', title: 'Quarantine', sheet: 3, text: 'Turn ships back ON, then turn ON the 40-day quarantine.', goal: { text: 'Run the plague with quarantined ports.', check: { allQuar: true } } },
    { tag: 'record', title: 'Record', sheet: 3, q: { type: 'table', q: 'Record the "Months until every city was reached" readout for each test.', rowHead: 'Test', cols: [{ label: 'Months', value: function (s, r) { return s[r.k]; }, tol: 2 }], rows: [{ label: 'Ships sailing', k: 'baseEnd' }, { label: 'Ships stopped', k: 'noSeaEnd' }] } },
    { tag: 'observe', title: 'The manor after the plague', sheet: 4, text: 'Open the **manor after the plague** tab. Move the slider to show that fewer peasants survived.', goal: { text: 'Set the survivors to 50 or fewer.', check: { workers: { lte: 50 } } }, q: { type: 'mc', q: 'What happened to wages when there were fewer workers?', choices: ['They went up because lords competed for workers', 'They went down', 'They stayed the same'], answer: 0 } },
    { tag: 'write', title: 'Cause and effect (CER)', sheet: 5, q: { type: 'write', q: 'How did the Black Death help end feudalism? Use evidence from BOTH tabs.', parts: [
      { label: 'Claim', min: 10, need: [{ words: ['feudal', 'serf', 'peasant', 'wage'], label: 'Connects to feudalism' }] },
      { label: 'Evidence', min: 14, number: true, need: [{ words: ['worker', 'wage', 'died', 'third', 'fields', 'pennies'], label: 'Uses evidence' }] },
      { label: 'Reasoning', starter: 'This weakened feudalism because', min: 14, need: [{ words: ['leave', 'demand', 'power', 'free', 'pay'], label: 'Explains the change' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: then and now', sheet: 6, q: { type: 'text', q: 'Compare how the plague spread with how diseases can spread today. What is similar and different about trade and travel?', min: 30, need: [{ words: ['plane', 'airplane', 'travel', 'trade', 'fast'], label: 'Connects to travel today' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-magna-carta', std: 'g6-ss-europe', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Showdown at Runnymede, 1215', model: 'turnSim', minutes: 25, icon: '📜',
  setup: {
    role: 'You are a baron of England negotiating with King John', endTitle: 'The legacy of Magna Carta',
    meters: [['king', 'King\'s unchecked power', '👑', 85, '#7048e8'], ['rights', 'Rights under the law', '⚖️', 15, '#2b8a3e'], ['peace', 'Peace in England', '🕊', 50, '#1c7ed6']],
    ending: 'Magna Carta was reissued several times after King John died, and its idea that even the ruler must obey the law spread. Centuries later, it inspired the U.S. Constitution and Bill of Rights, including the right to due process.',
    turns: [
      { year: '1214', title: 'Heavy taxes', text: 'King John has lost costly wars in France. He demands huge scutage payments (money instead of military service) and seizes barons\' lands without trial.', options: [{ label: 'Join other barons, renounce loyalty, and capture London', fx: { king: -20, peace: -20 }, result: 'The rebel barons take London. The king is forced to negotiate.', hist: true }, { label: 'Pay the taxes and hope things improve', fx: { king: 10 }, result: 'The king grows even bolder.' }], real: 'In 1215, rebel barons captured London.' },
      { year: 'June 1215', title: 'Meeting at Runnymede', text: 'King John agrees to meet the barons in a meadow by the Thames River.', options: [{ label: 'Demand a written charter of promises the king must seal', fx: { rights: 25, king: -20, peace: 15 }, result: 'The king seals Magna Carta ("Great Charter").', hist: true }, { label: 'Accept the king\'s spoken promise', fx: { peace: 5 }, result: 'Nothing is written down, and promises are easily broken.' }], real: 'King John sealed Magna Carta at Runnymede on June 15, 1215.' },
      { year: 'Clause 12', title: 'Limits on taxes', text: 'What rule should limit the king\'s taxes?', source: { by: 'Magna Carta, clause 12 (translation)', text: '"No \'scutage\' or \'aid\' may be levied in our kingdom without its general consent."' }, options: [{ label: 'The king needs the general consent of the kingdom\'s leaders for new taxes', fx: { rights: 15, king: -15 }, result: 'Taxes now require the consent of a council of leaders.', hist: true }, { label: 'The king may tax whenever he wants', fx: { king: 15, rights: -10 }, result: 'Nothing changes.' }], real: 'Clause 12 required "general consent" for special taxes, an early form of "no taxation without consent."' },
      { year: 'Clause 39', title: 'Fair treatment', text: 'Should the king be able to imprison people however he likes?', source: { by: 'Magna Carta, clause 39 (translation)', text: '"No free man shall be seized or imprisoned, or stripped of his rights or possessions, or outlawed or exiled... except by the lawful judgement of his equals or by the law of the land."' }, options: [{ label: 'No: free men can only be punished by lawful judgment or the law of the land', fx: { rights: 25, king: -15 }, result: 'This becomes the most famous promise in Magna Carta.', hist: true }, { label: 'Yes: the king\'s word is law', fx: { king: 15, rights: -15 }, result: 'Anyone can be jailed without a trial.' }], real: 'Clause 39 established that even the king must follow the law, the idea of due process.' },
      { year: 'Clause 61', title: 'Enforcing the promises', text: 'How will you make sure the king keeps his word?', options: [{ label: 'Create a council of 25 barons who can take action if he breaks the charter', fx: { rights: 10, king: -10, peace: -10 }, result: 'The king resents being watched.', hist: true }, { label: 'Trust the king', fx: { king: 10 }, result: 'There is no way to hold him to his promises.' }], real: 'Clause 61 created a council of 25 barons to enforce the charter.' },
      { year: 'Autumn 1215', title: 'The king breaks his word', text: 'King John asks the Pope to cancel Magna Carta, and the Pope agrees. War breaks out again.', options: [{ label: 'Keep fighting to defend the charter', fx: { peace: -20, rights: 5 }, result: 'War continues until King John dies in 1216. The new king\'s advisors reissue Magna Carta.', hist: true }, { label: 'Give up the charter', fx: { king: 20, rights: -25 }, result: 'The idea of limiting the king is lost.' }], real: 'The Pope annulled the charter, but after John died in 1216 it was reissued, and a version became part of English law in 1225.' }
    ]
  },
  place: 'Expedition · Runnymede, England',
  mission: 'King John taxes and imprisons whoever he likes. As a rebel baron, negotiate the charter that will limit his power. Read the actual clauses, watch the meters, and compare your choices with history.',
  question: 'How did Magna Carta limit the power of the king, and why does it matter today?',
  takeaway: 'In 1215, English barons forced King John to seal Magna Carta, which said the king must obey the law: no special taxes without general consent (clause 12) and no punishment without lawful judgment (clause 39). At first it protected mostly nobles, but its ideas about the rule of law inspired the U.S. Constitution and Bill of Rights.',
  vocab: [['Magna Carta', '"Great Charter" (1215) limiting the English king\'s power.'], ['Baron', 'A powerful noble who held land from the king.'], ['Rule of law', 'The idea that everyone, even rulers, must obey the law.'], ['Due process', 'Fair legal procedures before punishment.']],
  warmup: { style: 'Class rules', prompt: 'Should the teacher follow class rules too?', items: [['If the teacher breaks a rule, what should happen?', 'Answers vary: rules apply to everyone.'], ['Who should decide new rules?', 'Answers vary: the group, by consent.'], ['What does "rule of law" mean?', 'Everyone must follow the law.']] },
  steps: [
    { tag: 'test', title: 'Negotiate the charter', sheet: 1, goal: { text: 'Make all 6 decisions and read the legacy.', check: { done: true } } },
    { tag: 'observe', title: 'Read the meters', sheet: 2, q: { type: 'mc', q: 'Which clause most increased the ⚖️ "Rights under the law" meter?', choices: ['Clause 39: no imprisonment without lawful judgment', 'Accepting a spoken promise', 'Paying the taxes'], answer: 0 } },
    { tag: 'reason', title: 'Then and now', sheet: 3, q: { type: 'sort', q: 'Match each Magna Carta idea to the American idea it inspired.', bins: ['Clause 12 (consent for taxes)', 'Clause 39 (lawful judgment)'], items: [['"No taxation without representation"', 0], ['The right to a trial by jury', 1], ['Due process of law (5th Amendment)', 1], ['Congress must approve taxes', 0]] } },
    { tag: 'reason', title: 'Who was protected?', sheet: 3, q: { type: 'mc', q: 'At first, who did Magna Carta mostly protect?', choices: ['Nobles and free men, not serfs', 'Every person in England', 'Only the king'], answer: 0 } },
    { tag: 'write', title: 'Why it matters (RACE)', sheet: 4, q: { type: 'write', q: 'Why is Magna Carta important to Americans today? Quote a clause.', parts: [
      { label: 'Answer', min: 12, need: [{ words: ['law', 'rights', 'limit', 'power'], label: 'States the idea' }] },
      { label: 'Cite', min: 10, quote: true },
      { label: 'Explain', min: 14, need: [{ words: ['constitution', 'bill of rights', 'trial', 'due process', 'amendment', 'taxation'], label: 'Connects to the U.S.' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: a charter for today', sheet: 5, q: { type: 'text', q: 'Write a "clause" for a student charter that limits the power of whoever makes the rules. Explain how it echoes Magna Carta.', min: 30 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-printing-press', std: 'g6-ss-europe', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Race of the Printing Press', model: 'pressRace', minutes: 20, icon: '🖨',
  setup: { pages: 200 },
  place: 'Expedition · Mainz, Germany, about 1455',
  mission: 'Johannes Gutenberg claims his new printing press with movable type will change the world. Race scribes against the press, compare the costs, and figure out how cheap books spread new ideas across Europe.',
  question: 'How did the printing press change the spread of ideas in Europe?',
  takeaway: 'Gutenberg\'s printing press (about 1450) could produce books hundreds of times faster and far more cheaply than scribes copying by hand. Cheaper books meant more people learned to read, and new ideas of the Renaissance and Reformation spread quickly across Europe.',
  vocab: [['Movable type', 'Individual metal letters that can be rearranged and reused.'], ['Scribe', 'A person who copies books by hand.'], ['Literacy', 'The ability to read and write.'], ['Reformation', 'A 1500s movement that challenged the Catholic Church and split Western Christianity.']],
  warmup: { style: 'Copy challenge', prompt: 'Imagine copying a whole book by hand.', items: [['How long to copy one page neatly?', 'Maybe an hour or more.'], ['How long for a 200-page book?', 'Weeks or months.'], ['What would that do to the price?', 'Books would be very expensive.']] },
  steps: [
    { tag: 'predict', title: 'Predict', q: { type: 'predict', q: 'In 100 days, how many times more books do you predict one press will make than 5 scribes?', choices: ['About 2 times more', 'About 20 times more', 'More than 100 times more'] } },
    { tag: 'test', title: 'Run the race', sheet: 1, text: 'Use 5 scribes, 1 press, and a 100-day race.', goal: { text: 'Run a race of at least 100 days.', check: { ran: true, raceDays: { gte: 100 }, books_p: { gte: 1 } } } },
    { tag: 'record', title: 'Record', sheet: 2, q: { type: 'table', q: 'Record the results of your race.', rowHead: 'Shop', cols: [{ label: 'Books finished', value: function (s, r) { return s[r.k]; }, tol: 2 }], rows: [{ label: 'Scribes', k: 'books_s' }, { label: 'Printing press', k: 'books_p' }] } },
    { tag: 'reason', title: 'How many times more?', sheet: 2, q: { type: 'num', q: 'How many times more books did the press make? (Press books ÷ scribe books, rounded.)', answer: function (s) { return s.ratio; }, tol: 3, work: true, why: 'You predicted: {{pred:s0}}.' } },
    { tag: 'reason', title: 'Cost per book', sheet: 3, q: { type: 'mc', q: 'Look at the cost per book readout. What happened to the price of books?', choices: ['Printed books cost much less than hand-copied books', 'Printed books cost more', 'They cost the same'], answer: 0 } },
    { tag: 'reason', title: 'Effects', sheet: 4, q: { type: 'order', q: 'Put this chain of effects in order.', items: ['The printing press is invented', 'Books become faster and cheaper to make', 'More people can afford books and learn to read', 'New ideas spread quickly across Europe'] } },
    { tag: 'write', title: 'World-changing invention?', sheet: 5, q: { type: 'write', q: 'Was the printing press the most important invention of its time? Use numbers from your race.', parts: [
      { label: 'Claim', min: 8 },
      { label: 'Evidence (numbers)', min: 12, number: true },
      { label: 'Reasoning', starter: 'This mattered because', min: 14, need: [{ words: ['ideas', 'read', 'literacy', 'cheap', 'spread', 'renaissance', 'reformation', 'luther'], label: 'Explains the effect on ideas' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: Luther\'s pamphlets', sheet: 6, q: { type: 'text', q: 'In 1517, Martin Luther\'s ideas were printed and spread across Germany within weeks. Explain how this could not have happened with scribes.', min: 25, number: true } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-renaissance-florence', std: 'g6-ss-europe', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Renaissance Florence Walk', model: 'expedition', minutes: 25, icon: '🎨',
  setup: {
    title: 'Florence, Italy, about 1500', bg: SS6_BG.florence, avatar: '🧑‍🎨', start: 'bridge',
    roads: [['bridge', 'medici'], ['medici', 'duomo'], ['duomo', 'workshop'], ['workshop', 'signoria'], ['signoria', 'bridge'], ['duomo', 'library']],
    places: [
      { id: 'bridge', name: 'Ponte Vecchio', icon: '🌉', x: 300, y: 300, scene: { title: 'The Ponte Vecchio and the banks', paragraphs: ['{pv1|Florence grew rich from trade in wool and cloth and from banking.} {pv2|Italian city-states like Florence and Venice sat on trade routes between Europe and Asia.} {pv3|Wealthy merchant and banking families had money to spend on art, buildings, and learning.}'], items: [['florin', '🪙', 'Gold florin', 'Florence\'s gold coin was trusted across Europe.'], ['wool', '🧶', 'Bolt of fine wool cloth', 'Trade made Florence rich.']] } },
      { id: 'medici', name: 'Medici Palace', icon: '🏛', x: 150, y: 180, scene: { title: 'Palazzo Medici', paragraphs: ['{md1|The Medici family were bankers who became the most powerful family in Florence.} {md2|They were patrons, people who paid artists and scholars to create new works.} {md3|Lorenzo de\' Medici invited young artists, including Michelangelo, to study in his gardens.}'], items: [['patron', '💰', 'Patron\'s contract', 'Patrons paid artists to create new works.'], ['lorenzo', '👑', 'Portrait of Lorenzo de\' Medici', 'The Medici used their wealth to support the arts.']] } },
      { id: 'duomo', name: 'Duomo', icon: '⛪', x: 300, y: 110, scene: { title: 'The Cathedral and Brunelleschi\'s Dome', paragraphs: ['{dm1|For decades, no one knew how to build a dome wide enough to cover the cathedral.} {dm2|Filippo Brunelleschi studied ancient Roman buildings and invented new machines and a double-shell design.} {dm3|Finished in 1436, it is still the largest brick dome ever built.}'], items: [['dome', '🧱', 'Brick herringbone pattern', 'Brunelleschi\'s clever brick pattern let the dome hold itself up as it rose.'], ['rome', '🏺', 'Sketch of Roman ruins', 'Renaissance builders learned from ancient Rome.']] } },
      { id: 'workshop', name: 'Artist\'s workshop', icon: '🖌', x: 470, y: 160, scene: { title: 'A master artist\'s workshop', paragraphs: ['{ws1|Young Leonardo da Vinci trained here as an apprentice, grinding paints and learning to draw.} {ws2|Renaissance artists studied anatomy, light, and perspective, a technique that makes flat paintings look three-dimensional.} {ws3|Leonardo filled notebooks with drawings of the human body, machines, and nature, written in mirror writing.}'], source: { by: 'Leonardo da Vinci, notebooks (attributed)', text: '{wss|"The painter has the Universe in his mind and hands."}' }, items: [['perspective', '📐', 'Perspective drawing', 'Lines meet at a vanishing point to create depth.'], ['notebook', '📓', 'Leonardo\'s notebook', 'Leonardo studied science and art together.']] } },
      { id: 'signoria', name: 'Piazza della Signoria', icon: '🗽', x: 470, y: 250, labelUp: true, scene: { title: 'Piazza della Signoria', paragraphs: ['{ps1|In 1504, Michelangelo\'s giant marble statue of David was placed here, in front of the city hall.} {ps2|David, the young hero who defeated a giant, became a symbol of Florence standing up to more powerful enemies.} {ps3|The statue shows a realistic human body, inspired by ancient Greek and Roman sculpture.}'], items: [['david', '🗿', 'Michelangelo\'s David', 'Realistic, heroic human figures were a Renaissance hallmark.']] } },
      { id: 'library', name: 'Scholars\' library', icon: '📚', x: 110, y: 60, scene: { title: 'A humanist library', paragraphs: ['{lb1|Scholars here collect and translate ancient Greek and Roman writings that had been forgotten in Western Europe.} {lb2|These humanists believe people should develop their talents and study subjects like history, poetry, and philosophy.} {lb3|The word Renaissance means "rebirth": a rebirth of interest in the learning of ancient Greece and Rome.}'], source: { by: 'Pico della Mirandola, Oration on the Dignity of Man (adapted)', date: '1486', text: '{lbs|"You may fashion yourself in whatever form you prefer."}' }, items: [['greek', '📜', 'Ancient Greek manuscript', 'Scholars rediscovered classical learning.'], ['humanism', '🧠', 'Humanist essay', 'Humanism celebrated human potential and achievement.']] } }
    ]
  },
  place: 'Expedition · Florence, Italy, about 1500',
  mission: 'Walk through Renaissance Florence. Visit the banks, a patron\'s palace, the cathedral, an artist\'s workshop, the town square, and a scholars\' library. Collect evidence to explain why this "rebirth" happened HERE.',
  question: 'Why did the Renaissance begin in Italian city-states like Florence, and what were its big ideas?',
  takeaway: 'The Renaissance began in wealthy Italian city-states like Florence, where trade and banking created rich patrons (like the Medici) who funded artists and scholars. Humanists revived ancient Greek and Roman learning, and artists used realism and perspective. "Renaissance" means rebirth.',
  vocab: [['Renaissance', 'A "rebirth" of art and learning (about 1350–1600).'], ['Patron', 'A person who pays to support artists or scholars.'], ['Humanism', 'Belief in human potential and the value of classical learning.'], ['Perspective', 'A technique for showing depth on a flat surface.']],
  warmup: { style: 'Why here?', prompt: 'What does a city need for art to flourish?', items: [['Money', 'To pay artists and builders.'], ['Ideas', 'New and old knowledge to inspire people.'], ['People', 'Talented artists and supportive patrons.']] },
  steps: [
    { tag: 'explore', title: 'Follow the money', sheet: 1, goal: { text: 'Enter the Ponte Vecchio and the Medici Palace and examine every object.', check: { entered_bridge: true, entered_medici: true, got_florin: true, got_wool: true, got_patron: true, got_lorenzo: true } }, q: { type: 'mc', q: 'Why did money matter for the Renaissance?', choices: ['Rich patrons could pay artists and scholars', 'Artists had to buy their own schools', 'Money was not important'], answer: 0 } },
    { tag: 'explore', title: 'Tour Florence', sheet: 2, goal: { text: 'Enter all 6 places and collect at least 10 objects.', check: { n_entered: { gte: 6 }, n_items: { gte: 10 } } } },
    { tag: 'sort', title: 'Causes and features', sheet: 3, q: { type: 'sort', q: 'Is each card a CAUSE of the Renaissance or a FEATURE of Renaissance art and thought?', bins: ['Cause', 'Feature'], items: [['Wealth from trade and banking', 0], ['Rediscovered Greek and Roman texts', 0], ['Perspective in paintings', 1], ['Realistic human figures', 1], ['Patrons like the Medici', 0], ['Humanist belief in human potential', 1]] } },
    { tag: 'reason', title: 'Rebirth of what?', sheet: 4, q: { type: 'mc', q: '"Renaissance" means rebirth. What was reborn?', choices: ['Interest in the learning and art of ancient Greece and Rome', 'The Roman Empire\'s army', 'Feudalism'], answer: 0 } },
    { tag: 'write', title: 'Why Florence? (CER)', sheet: 5, q: { type: 'write', q: 'Why did the Renaissance begin in Florence? Use evidence from at least two places you visited.', parts: [
      { label: 'Claim', min: 10 },
      { label: 'Evidence', min: 16, need: [{ words: ['medici', 'patron', 'bank', 'trade', 'florin', 'wool', 'greek', 'roman', 'ancient'], label: 'Uses specific evidence' }] },
      { label: 'Reasoning', starter: 'These show that', min: 14 }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: humanism', sheet: 6, q: { type: 'text', q: 'Quote Pico della Mirandola or Leonardo and explain how the quote shows humanist ideas.', min: 25, quote: true, need: [{ words: ['human', 'potential', 'talent', 'person', 'people', 'individual'], label: 'Explains humanism' }] } }
  ]
});

/* ======================= Geography of Europe and the Americas ======================= */
SUNNY_SIMS.push({
  id: 'g6-ss-latlong-flight', std: 'g6-ss-geo', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Latitude & Longitude Flight School', model: 'globeNav', minutes: 25, icon: '✈️',
  setup: {
    startLat: 40, startLon: -86,
    places: [['indy', 'Indianapolis', 39.8, -86.2, '🏁', 'Home base: about 40°N, 86°W.'], ['quito', 'Quito, Ecuador', -0.2, -78.5, '🏔', 'A capital city almost exactly on the Equator.'], ['madrid', 'Madrid, Spain', 40.4, -3.7, '🇪🇸', 'Same latitude as Indianapolis!'], ['london', 'London, England', 51.5, -0.1, '🇬🇧', 'The Prime Meridian runs through Greenwich, London.'], ['buenos', 'Buenos Aires', -34.6, -58.4, '🇦🇷', 'Southern AND Western Hemispheres.'], ['mexico', 'Mexico City', 19.4, -99.1, '🇲🇽', 'Built on the site of Tenochtitlan.'], ['rome', 'Rome, Italy', 41.9, 12.5, '🇮🇹', 'Northern AND Eastern Hemispheres.'], ['oslo', 'Oslo, Norway', 59.9, 10.7, '🇳🇴', 'Far north, but kept milder by the Gulf Stream.', true]],
    missions: [['Fly home to 40°N, 86°W', 'indy'], ['Fly to 0°, 78°W: a capital on the Equator', 'quito'], ['Fly to 40°N, 4°W: same latitude as home', 'madrid'], ['Fly to 52°N, 0°: where the Prime Meridian begins', 'london'], ['Fly to 35°S, 58°W', 'buenos'], ['Mystery: fly to 60°N, 11°E', 'oslo']]
  },
  place: 'Expedition · Sunnyside Flight School',
  mission: 'Welcome to flight school! Your plane only understands latitude and longitude. Read coordinates on the map, fly to six missions, and discover a surprising connection between Indianapolis and Spain.',
  question: 'How do latitude and longitude help us locate any place on Earth?',
  takeaway: 'Latitude lines run east–west and measure distance north or south of the Equator (0°). Longitude lines run north–south and measure distance east or west of the Prime Meridian (0°). Coordinates are written latitude first: Indianapolis is about 40°N, 86°W.',
  vocab: [['Latitude', 'Distance north or south of the Equator, in degrees.'], ['Longitude', 'Distance east or west of the Prime Meridian, in degrees.'], ['Equator', '0° latitude; divides north and south.'], ['Prime Meridian', '0° longitude; runs through Greenwich, England.'], ['Hemisphere', 'Half of Earth.']],
  warmup: { style: 'Air traces', prompt: 'Trace in the air with your finger.', items: [['A line of latitude', 'Side to side (like a ladder\'s rungs: "latitude is flat-itude").'], ['A line of longitude', 'Up and down (long lines from pole to pole).'], ['Which comes first in coordinates?', 'Latitude.']] },
  steps: [
    { tag: 'explore', title: 'Read the map', sheet: 1, text: 'Tap anywhere on the map. The readout shows the coordinates of the spot you tapped.', goal: { text: 'Tap the map at least 3 times and read the coordinates.', check: { taps: { gte: 3 } } }, q: { type: 'mc', q: 'Which line is the red line across the middle of the map?', choices: ['The Equator (0° latitude)', 'The Prime Meridian', 'The Tropic of Cancer'], answer: 0 } },
    { tag: 'test', title: 'First flights', sheet: 2, text: 'Type the numbers, choose N or S and E or W, then press Take off.', goal: { text: 'Complete the first two missions.', check: { at_indy: true, at_quito: true } } },
    { tag: 'test', title: 'All missions', sheet: 3, goal: { text: 'Complete all six flight missions.', check: { n_at: { gte: 6 } } } },
    { tag: 'record', title: 'Flight log', sheet: 3, q: { type: 'table', q: 'Write the coordinates of each place (round to the nearest degree).', rowHead: 'Place', cols: [{ label: 'Latitude', accept: function (v, r) { return v.replace(/\s/g, '').toUpperCase() === r.a; } }, { label: 'Longitude', accept: function (v, r) { return v.replace(/\s/g, '').toUpperCase() === r.o; } }], rows: [{ label: 'Madrid', a: '40°N', o: '4°W' }, { label: 'Buenos Aires', a: '35°S', o: '58°W' }], tip: 'Write it like 40°N (use N/S for latitude and E/W for longitude).' } },
    { tag: 'sort', title: 'Hemispheres', sheet: 4, q: { type: 'sort', q: 'Which hemispheres is each city in?', bins: ['Northern + Western', 'Southern + Western', 'Northern + Eastern'], items: [['Indianapolis', 0], ['Buenos Aires', 1], ['Rome', 2], ['Mexico City', 0], ['Oslo', 2]] } },
    { tag: 'reason', title: 'Same latitude, different place', sheet: 5, q: { type: 'mc', q: 'Madrid and Indianapolis are both near 40°N. What does that tell you?', choices: ['They are the same distance from the Equator', 'They are the same distance from the Prime Meridian', 'They have the same time zone'], answer: 0 } },
    { tag: 'write', title: 'Explain to a new pilot', sheet: 6, q: { type: 'write', q: 'Explain to a new pilot how to find a place using coordinates.', parts: [
      { label: 'Latitude', min: 10, need: [{ words: ['equator', 'north', 'south'], label: 'Explains latitude' }] },
      { label: 'Longitude', min: 10, need: [{ words: ['prime meridian', 'east', 'west'], label: 'Explains longitude' }] },
      { label: 'Example', min: 8, number: true }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the mystery city', sheet: 7, q: { type: 'text', q: 'Oslo is at 60°N, farther north than all of Canada\'s big cities, yet its winters are milder than many of them. Predict why, then check it in the Climate Lab sim.', min: 20, need: [{ words: ['ocean', 'current', 'gulf stream', 'warm', 'water'], label: 'Mentions oceans or currents' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-climate-lab', std: 'g6-ss-geo', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Climate Control Lab', model: 'climateLab', minutes: 25, icon: '🌡',
  setup: { presets: [['indy', 'Indianapolis', 40, 750, 'inland', 'none', 'about 53°F average; cold winters, hot summers'], ['london', 'London', 51, 50, 'coast', 'warm', 'about 52°F average; mild winters'], ['quito', 'Quito', 0, 9350, 'inland', 'none', 'about 58°F average all year, despite being on the Equator'], ['manaus', 'Manaus (Amazon)', 3, 300, 'inland', 'none', 'about 82°F average; hot and rainy all year'], ['moscow', 'Moscow', 56, 500, 'inland', 'none', 'about 42°F average; very cold winters']] },
  place: 'Expedition · Sunnyside Climate Lab',
  mission: 'Why is London warmer in winter than Indianapolis, even though it is farther north? Why is Quito cool even though it sits on the Equator? Control latitude, elevation, and oceans to discover what shapes climate.',
  question: 'What factors shape the climate of a place?',
  takeaway: 'Climate depends on latitude (farther from the Equator is colder), elevation (higher is colder), distance from the ocean (oceans make winters milder and summers cooler), and ocean currents (the warm Gulf Stream keeps western Europe mild).',
  vocab: [['Climate', 'The usual weather of a place over many years.'], ['Elevation', 'Height above sea level.'], ['Ocean current', 'A stream of warm or cold water in the ocean.'], ['Gulf Stream', 'A warm current that flows from the Gulf of Mexico toward Europe.']],
  warmup: { style: 'Weather vs. climate', prompt: 'Weather or climate?', items: [['"It is raining today."', 'Weather.'], ['"Indiana has cold winters."', 'Climate.'], ['Why are mountaintops snowy?', 'Higher elevation is colder.']] },
  steps: [
    { tag: 'predict', title: 'Predict', q: { type: 'predict', q: 'If you move a place farther from the Equator, its average temperature will…', choices: ['Go down', 'Go up', 'Stay the same'] } },
    { tag: 'test', title: 'Latitude test', sheet: 1, text: 'Keep everything else the same. Move ONLY the latitude slider from 0° to 70°.', goal: { text: 'Try at least 6 different settings.', check: { runs: { gte: 6 } } }, q: { type: 'mc', q: 'What happens to the average temperature as latitude increases?', choices: ['It decreases', 'It increases', 'It doesn\'t change'], answer: 0, why: 'You predicted: {{pred:s0}}.' } },
    { tag: 'test', title: 'Elevation: Quito', sheet: 2, goal: { text: 'Test the Quito preset.', check: { preset_quito: true } }, q: { type: 'mc', q: 'Quito is on the Equator. Why isn\'t it hot?', choices: ['Its high elevation makes it cooler', 'It is near the ocean', 'It has a cold current'], answer: 0 } },
    { tag: 'test', title: 'Oceans: London vs. Indianapolis', sheet: 3, goal: { text: 'Test the London and Indianapolis presets.', check: { preset_london: true, preset_indy: true } } },
    { tag: 'record', title: 'Record', sheet: 3, q: { type: 'table', q: 'Record the summer vs. winter gap for each city.', rowHead: 'City', cols: [{ label: 'Gap (°F)', accept: function (v, r) { var n = parseFloat(v); return !isNaN(n) && Math.abs(n - r.v) <= 3; } }], rows: [{ label: 'London (coast, warm current)', v: 21 }, { label: 'Indianapolis (inland)', v: 39 }], tip: 'Press each city\'s button and read the "Summer vs. winter gap" readout.' } },
    { tag: 'test', title: 'Find every zone', sheet: 4, goal: { text: 'Create a Tropical, a Polar, and a Highland climate.', check: { zone_Tropical: true, zone_Polar: true, zone_Highland: true } } },
    { tag: 'write', title: 'Explain a climate (CER)', sheet: 5, q: { type: 'write', q: 'Why are London\'s winters milder than Indianapolis\'s, even though London is farther north?', parts: [
      { label: 'Claim', min: 10, need: [{ words: ['ocean', 'current', 'gulf stream', 'coast'], label: 'Names the ocean factor' }] },
      { label: 'Evidence from the lab', min: 12, number: true },
      { label: 'Reasoning', min: 14, need: [{ words: ['warm', 'water', 'milder', 'heat'], label: 'Explains how oceans affect temperature' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: design a city', sheet: 6, q: { type: 'text', q: 'Design a city with mild temperatures all year. What latitude, elevation, and ocean settings would you choose? Explain using your lab results.', min: 30, number: true } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-adapt-modify', std: 'g6-ss-geo', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'People & Places: Adapt or Modify?', model: 'adaptLab', minutes: 20, icon: '🌍',
  setup: {
    envs: [{ id: 'nl', name: 'The Netherlands', icon: '🌷', kind: 'lowland', problem: 'About a quarter of the country is below sea level, and the North Sea floods the land.' }, { id: 'andes', name: 'Andes of Peru', icon: '🏔', kind: 'mountain', problem: 'Steep slopes make farming difficult, and rain washes soil away.' }, { id: 'norway', name: 'Norway\'s fjord coast', icon: '🐟', kind: 'coast', problem: 'Rocky mountains and a short growing season leave little farmland, but the sea is rich.' }, { id: 'plains', name: 'Great Plains, USA', icon: '🌾', kind: 'plains', problem: 'Rich soil, but some years there is too little rain for crops.' }],
    techs: [['dike', 'Dikes & pumps', '🧱', 'Build walls to hold back the sea and pump water off the land (MODIFY).'], ['terrace', 'Terraces', '🪜', 'Cut flat steps into slopes (MODIFY).'], ['fish', 'Fishing fleets', '⛵', 'Depend on the ocean\'s resources (DEPEND/ADAPT).'], ['irrigate', 'Irrigation', '💧', 'Pump groundwater or river water to fields (MODIFY).']],
    results: { 'nl|dike': [3, 'Dikes and pumps created new land called polders. The Dutch now farm land that was once under the sea.'], 'nl|fish': [2, 'Fishing helps, but the flooding problem remains.'], 'nl|irrigate': [0, 'Adding more water to flooded land makes it worse!'], 'nl|terrace': [0, 'The Netherlands is very flat, so there are no slopes to terrace.'], 'andes|terrace': [3, 'Terraces, used since Inca times, create flat, stable farmland.'], 'andes|irrigate': [2, 'Canals help, but slopes still erode without terraces.'], 'andes|fish': [0, 'There\'s no sea in the mountains.'], 'andes|dike': [0, 'There\'s no sea to hold back.'], 'norway|fish': [3, 'Norwegians have depended on fishing for centuries; the sea provides food and trade.'], 'norway|terrace': [1, 'A few terraces help, but farmland is still scarce.'], 'norway|irrigate': [0, 'Water isn\'t the problem; land and growing season are.'], 'norway|dike': [1, 'The fjords are deep and rocky; dikes won\'t create much farmland.'], 'plains|irrigate': [3, 'Irrigation turns dry years into good harvests, but pumping too much groundwater can drain aquifers.'], 'plains|terrace': [1, 'The Plains are mostly flat.'], 'plains|fish': [0, 'The Plains are far from the sea.'], 'plains|dike': [0, 'There\'s no sea to hold back.'] }
  },
  place: 'Expedition · Global Geography Office',
  mission: 'People everywhere interact with their environment. They ADAPT to it, DEPEND on it, and MODIFY it. Visit four real places, test solutions, and decide whether each successful solution is adapting, depending, or modifying.',
  question: 'How do people adapt to, depend on, and modify their environments?',
  takeaway: 'Human–environment interaction happens three ways: people adapt (terraces, clothing), depend on natural resources (Norway\'s fishing), and modify the environment (Dutch dikes and polders, irrigation). Modifying the environment brings benefits but can also cause problems, like drained aquifers.',
  vocab: [['Human–environment interaction', 'How people and their environment affect each other.'], ['Adapt', 'Change your way of life to fit the environment.'], ['Modify', 'Change the environment to fit your needs.'], ['Polder', 'Low land reclaimed from the sea using dikes.']],
  warmup: { style: 'Adapt, depend, or modify?', prompt: 'Label each.', items: [['Wearing a heavy coat in winter', 'Adapt.'], ['Building a dam', 'Modify.'], ['A town that lives on fishing', 'Depend.']] },
  steps: [
    { tag: 'test', title: 'The Netherlands', sheet: 1, goal: { text: 'Get an excellent harvest in the Netherlands.', check: { best_nl: true } }, q: { type: 'mc', q: 'Did the Dutch ADAPT to or MODIFY their environment?', choices: ['Modify: they changed the land itself with dikes', 'Adapt: they changed their clothes', 'Neither'], answer: 0 } },
    { tag: 'test', title: 'All four places', sheet: 2, goal: { text: 'Solve all four places.', check: { n_best: { gte: 4 } } } },
    { tag: 'sort', title: 'Adapt, depend, or modify', sheet: 3, q: { type: 'sort', q: 'Sort the solutions.', bins: ['Adapt', 'Depend', 'Modify'], items: [['Norway\'s fishing fleets', 1], ['Dutch dikes and polders', 2], ['Great Plains irrigation', 2], ['Wearing wool clothing in the Andes cold', 0], ['Building homes on stilts near rivers', 0]] } },
    { tag: 'reason', title: 'Consequences', sheet: 4, q: { type: 'mc', q: 'What is one possible NEGATIVE consequence of irrigation on the Great Plains?', choices: ['Pumping too much groundwater can drain aquifers', 'Crops grow too well', 'It causes the sea to flood'], answer: 0 } },
    { tag: 'write', title: 'Helpful or harmful?', sheet: 5, q: { type: 'write', q: 'Choose one example of people MODIFYING their environment. Was it helpful, harmful, or both?', parts: [
      { label: 'Example', min: 8, need: [{ words: ['dike', 'polder', 'irrigat', 'terrace', 'dam', 'canal'], label: 'Names a modification' }] },
      { label: 'Benefits', min: 10 },
      { label: 'Costs or risks', min: 10 },
      { label: 'Judgment', starter: 'Overall, it was', min: 8 }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: Indiana', sheet: 6, q: { type: 'text', q: 'Give one example of people in Indiana adapting to, depending on, or modifying the environment, and explain it.', min: 25 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-grand-tour', std: 'g6-ss-geo', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Grand Tour of Europe\'s Landforms', model: 'expedition', minutes: 25, icon: '🗺',
  setup: {
    title: 'Physical features of Europe', bg: SS6_BG.europe, avatar: '🚂', start: 'plain', scale: { per: 4.8, unit: 'miles' },
    roads: [['plain', 'polder'], ['plain', 'alps'], ['plain', 'fjord'], ['alps', 'med'], ['alps', 'iberia'], ['med', 'iberia'], ['polder', 'iberia']],
    places: [
      { id: 'plain', name: 'Great European Plain', icon: '🌾', x: 337, y: 210, scene: { title: 'The Great European Plain', sub: 'From France to Russia', paragraphs: ['{gp1|This huge, flat lowland stretches from western France all the way into Russia.} {gp2|Its rich soil and gentle rivers make it one of the best farming regions in the world.} {gp3|Because it is so flat and open, armies and traders have crossed it for thousands of years, and many of Europe\'s largest cities grew here.}'], items: [['wheat', '🌾', 'Wheat field', 'Flat land and fertile soil support large farms.'], ['river', '🚢', 'River barge', 'Slow, navigable rivers carry goods across the plain.']] } },
      { id: 'polder', name: 'Netherlands polders', icon: '🌷', x: 179, y: 207, labelUp: true, scene: { title: 'The polders of the Netherlands', paragraphs: ['{pl1|Much of the Netherlands lies below sea level.} {pl2|For centuries, the Dutch have built dikes (walls) and used windmills, and later pumps, to drain water and create new land called polders.} {pl3|The name Netherlands means "low countries."}'], items: [['windmill', '🌬', 'Drainage windmill', 'Windmills pumped water off the land.'], ['dike', '🧱', 'Dike', 'Dikes hold back the North Sea.']] } },
      { id: 'alps', name: 'The Alps', icon: '🏔', x: 231, y: 266, labelUp: true, scene: { title: 'The Alps', paragraphs: ['{al1|The Alps are Europe\'s highest mountain range, curving across France, Switzerland, Italy, Austria, and more.} {al2|The tallest peak, Mont Blanc, rises over 15,700 feet.} {al3|The mountains are a barrier that separated Italy from northern Europe, but glaciers here feed major rivers like the Rhine and the Rhône.}'], items: [['glacier', '🧊', 'Glacier', 'Alpine glaciers feed Europe\'s great rivers.'], ['pass', '🛤', 'Mountain pass', 'Travelers crossed the Alps through high passes.']] } },
      { id: 'fjord', name: 'Norway\'s fjords', icon: '⛰', x: 189, y: 116, scene: { title: 'The fjords of the Scandinavian Peninsula', paragraphs: ['{fj1|Fjords are long, narrow, deep inlets of the sea between steep cliffs.} {fj2|They were carved by glaciers during the Ice Age.} {fj3|With little flat farmland, Norwegians have depended on the sea for fishing and trade, from the Vikings to today.}'], items: [['fjordimg', '🌊', 'Fjord', 'Glaciers carved deep valleys that filled with seawater.'], ['viking', '⛵', 'Viking ship model', 'Seafaring grew from life along the fjords.']] } },
      { id: 'iberia', name: 'Iberian Peninsula', icon: '☀️', x: 84, y: 330, scene: { title: 'The Iberian Peninsula', paragraphs: ['{ib1|Spain and Portugal share the Iberian Peninsula, surrounded by water on three sides.} {ib2|Its center is the Meseta, a high, dry plateau with hot summers and cold winters.} {ib3|Its long coastlines helped make Spain and Portugal leaders in ocean exploration in the 1400s and 1500s.}'], items: [['meseta', '🏜', 'Meseta plateau', 'A high, dry central plateau.'], ['caravel', '⛵', 'Caravel ship', 'Peninsula nations looked to the sea for exploration.']] } },
      { id: 'med', name: 'Mediterranean coast', icon: '🫒', x: 263, y: 320, labelUp: true, scene: { title: 'The Mediterranean coast of Italy', paragraphs: ['{mc1|Italy is a boot-shaped peninsula reaching into the Mediterranean Sea.} {mc2|The Mediterranean climate has hot, dry summers and mild, rainy winters, ideal for olives and grapes.} {mc3|The sea connected Europe, Africa, and Asia, making Italian cities centers of trade.}'], items: [['olive', '🫒', 'Olive grove', 'Olives thrive in hot, dry summers.'], ['port', '⚓', 'Trade port', 'The Mediterranean was a highway of trade.']] } }
    ]
  },
  place: 'Expedition · Across Europe by train',
  mission: 'Ride across Europe from the plains to the peaks. Enter each landform, collect evidence, and explain how each physical feature shaped the way people live there.',
  question: 'What are Europe\'s major physical features, and how do they affect how people live?',
  takeaway: 'Europe\'s landforms shape life: the flat, fertile Great European Plain supports farming and big cities; the Alps are a barrier and a source of rivers; Norway\'s fjords pushed people toward the sea; the Netherlands reclaimed land with dikes; peninsulas like Iberia and Italy turned people toward sea trade and exploration.',
  vocab: [['Peninsula', 'Land surrounded by water on three sides.'], ['Plateau', 'A high, flat area of land.'], ['Fjord', 'A long, narrow sea inlet between cliffs, carved by glaciers.'], ['Plain', 'A large area of flat land.']],
  warmup: { style: 'Landform match', prompt: 'Name the landform.', items: [['Water on three sides', 'Peninsula.'], ['High and flat', 'Plateau.'], ['Low and flat', 'Plain.']] },
  steps: [
    { tag: 'explore', title: 'Start on the plain', sheet: 1, goal: { text: 'Enter the Great European Plain and examine both objects.', check: { entered_plain: true, got_wheat: true, got_river: true } } },
    { tag: 'explore', title: 'Ride the whole route', sheet: 2, goal: { text: 'Enter all 6 places and collect at least 11 objects.', check: { n_entered: { gte: 6 }, n_items: { gte: 11 } } } },
    { tag: 'sort', title: 'Landform types', sheet: 3, q: { type: 'sort', q: 'What type of landform is each?', bins: ['Mountains', 'Plain / lowland', 'Peninsula', 'Coastal inlet'], items: [['The Alps', 0], ['Great European Plain', 1], ['Iberia', 2], ['Italy', 2], ['Norway\'s fjords', 3], ['The Netherlands', 1]] } },
    { tag: 'reason', title: 'Geography and history', sheet: 4, q: { type: 'mc', q: 'Why did Spain and Portugal lead ocean exploration in the 1400s?', choices: ['The Iberian Peninsula has long coastlines facing the Atlantic', 'They had the tallest mountains', 'They were landlocked'], answer: 0 } },
    { tag: 'record', title: 'Distance', sheet: 4, q: { type: 'num', q: 'Check the distance readout. About how many miles did you travel? (nearest 100)', answer: function (s) { return Math.round((s.dist || 0) / 100) * 100; }, tol: 100, unit: 'miles' } },
    { tag: 'write', title: 'Travel journal', sheet: 5, q: { type: 'write', q: 'Write a travel journal entry about two landforms and how each affects people\'s lives.', parts: [
      { label: 'Landform 1', min: 14, need: [{ words: ['plain', 'alps', 'fjord', 'polder', 'peninsula', 'meseta', 'mediterranean'], label: 'Names a landform' }] },
      { label: 'Landform 2', min: 14, need: [{ words: ['plain', 'alps', 'fjord', 'polder', 'peninsula', 'meseta', 'mediterranean'], label: 'Names a landform' }] },
      { label: 'Comparison', starter: 'These two places are different because', min: 10 }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: barriers and highways', sheet: 6, q: { type: 'text', q: 'Some landforms are barriers and some are highways. Classify three from your trip and explain.', min: 30, need: [{ words: ['barrier'], label: 'Uses "barrier"' }, { words: ['highway', 'connect', 'trade', 'travel'], label: 'Uses "highway" or connection' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ss-americas-features', std: 'g6-ss-geo', subject: 'social', grade: 6, code: '2026 code pending',
  title: 'Mystery Features of the Americas', model: 'globeNav', minutes: 20, icon: '🧭',
  setup: {
    startLat: 40, startLon: -86, tol: 4,
    places: [['rockies', 'Rocky Mountains', 40, -106, '⛰', 'The Rockies run from Canada to New Mexico.', true], ['mississippi', 'Mouth of the Mississippi', 29, -89.3, '🌊', 'North America\'s great river reaches the Gulf of Mexico.', true], ['lakes', 'Great Lakes', 45, -84, '💧', 'The largest group of freshwater lakes on Earth.', true], ['panama', 'Isthmus of Panama', 9, -79.5, '🚢', 'A narrow strip of land joining two continents.', true], ['amazon', 'Mouth of the Amazon', 0, -50, '🌳', 'The Amazon carries more water than any other river.', true], ['andes', 'Andes Mountains', -15, -72, '🏔', 'The longest mountain range on land.', true], ['horn', 'Cape Horn', -56, -67.3, '🌬', 'The stormy southern tip of South America.', true]],
    missions: [['Fly to 40°N, 106°W', 'rockies'], ['Fly to 29°N, 89°W', 'mississippi'], ['Fly to 45°N, 84°W', 'lakes'], ['Fly to 9°N, 80°W', 'panama'], ['Fly to 0°, 50°W', 'amazon'], ['Fly to 15°S, 72°W', 'andes'], ['Fly to 56°S, 67°W', 'horn']]
  },
  place: 'Expedition · Survey plane over the Americas',
  mission: 'Seven mystery features are hidden on the map. Fly to each set of coordinates to reveal them, then use what you discover to explain how physical features shape life in the Americas.',
  question: 'What are the major physical features of the Americas, and how do they affect people?',
  takeaway: 'Major features of the Americas include the Rocky Mountains and Andes (long mountain chains in the west), the Mississippi and Amazon rivers, the Great Lakes, the Isthmus of Panama, and Cape Horn. Rivers and lakes are highways for trade; mountains and isthmuses shape travel and climate.',
  vocab: [['Isthmus', 'A narrow strip of land connecting two larger areas.'], ['Mouth (of a river)', 'Where a river empties into a larger body of water.'], ['Mountain range', 'A connected chain of mountains.'], ['Cape', 'A point of land extending into the sea.']],
  warmup: { style: 'Coordinates recall', prompt: 'Quick review.', items: [['Latitude or longitude first?', 'Latitude.'], ['Which hemisphere is 15°S, 72°W in?', 'Southern and Western.'], ['What is an isthmus?', 'A narrow land bridge.']] },
  steps: [
    { tag: 'test', title: 'First mysteries', sheet: 1, goal: { text: 'Reveal the first three mystery features.', check: { at_rockies: true, at_mississippi: true, at_lakes: true } } },
    { tag: 'test', title: 'All seven', sheet: 2, goal: { text: 'Reveal all seven features.', check: { n_at: { gte: 7 } } } },
    { tag: 'record', title: 'Feature log', sheet: 2, q: { type: 'table', q: 'Record each feature\'s name.', rowHead: 'Coordinates', cols: [{ label: 'Feature', accept: function (v, r) { return v.toLowerCase().indexOf(r.w) >= 0; } }], rows: [{ label: '9°N, 80°W', w: 'panama' }, { label: '0°, 50°W', w: 'amazon' }, { label: '15°S, 72°W', w: 'andes' }] } },
    { tag: 'reason', title: 'Patterns', sheet: 3, q: { type: 'mc', q: 'What pattern do the Rockies and the Andes share?', choices: ['Both are long mountain chains along the WESTERN side of their continents', 'Both are in the Eastern Hemisphere', 'Both are rivers'], answer: 0 } },
    { tag: 'reason', title: 'Panama', sheet: 3, q: { type: 'mc', q: 'Why was a canal built across the Isthmus of Panama?', choices: ['Ships could travel between the Atlantic and Pacific without going around Cape Horn', 'To water crops', 'To stop hurricanes'], answer: 0 } },
    { tag: 'write', title: 'Feature report', sheet: 4, q: { type: 'write', q: 'Choose two features and explain how each affects people.', parts: [
      { label: 'Feature 1', min: 14, need: [{ words: ['rock', 'andes', 'mississippi', 'amazon', 'great lakes', 'panama', 'horn'], label: 'Names a feature' }] },
      { label: 'Feature 2', min: 14, need: [{ words: ['rock', 'andes', 'mississippi', 'amazon', 'great lakes', 'panama', 'horn'], label: 'Names a feature' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: write a mission', sheet: 5, q: { type: 'text', q: 'Write a new flight mission: give the coordinates of a feature not on this map (look it up or estimate) and describe what the pilot will find.', min: 20, number: true } }
  ]
});
