/*
 * Sunnyside Simulators: Grade 6 science simulations.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

/* ======================= 6.PS.1–2: Particles and states ======================= */
SUNNY_SIMS.push({
  id: 'g6-sci-particle-box', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.1–6.PS.2',
  title: 'Particle Box', model: 'particleBox', minutes: 25, icon: '⚛️',
  place: 'Sunnyside Science Lab · Molecular Microscope',
  mission: 'The lab\'s molecular microscope zooms in 100 million times. Heat and cool water, oxygen, and iron and build a particle model that explains solids, liquids, and gases.',
  question: 'How does adding or removing thermal energy change particle motion and state?',
  takeaway: 'All matter is made of particles in constant motion. Adding thermal energy makes particles move faster, raising temperature; at the melting and boiling points, the energy breaks particles free instead of raising the temperature. Removing energy slows particles until they lock into a solid.',
  vocab: [['Particle', 'A tiny piece of matter (atom or molecule).'], ['Thermal energy', 'The total energy of moving particles.'], ['Temperature', 'A measure of the average speed (kinetic energy) of particles.'], ['Melting point', 'The temperature where a solid becomes a liquid.'], ['Boiling point', 'The temperature where a liquid becomes a gas.']],
  warmup: { style: 'Draw a model', prompt: 'Draw 6 circles for particles in each box: solid, liquid, gas. Then answer.', items: [['How are particles arranged in a solid?', 'Tightly packed in a pattern, vibrating in place.'], ['What is different about a gas?', 'Particles are far apart and move fast in all directions.'], ['Do particles in an ice cube move at all?', 'Yes, they vibrate.']] },
  steps: [
    { tag: 'explore', title: 'Frozen water', text: 'The water starts as ice at −20 °C.', goal: { text: 'Watch the ice particles for a few seconds, then add a little heat.', check: { heated: true } },
      q: { type: 'mc', q: 'Before heating, what were the ice particles doing?', choices: ['Vibrating in fixed places', 'Not moving at all', 'Flying around the box'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'As you keep heating, what will happen to the temperature when the ice reaches 0 °C?', choices: ['It keeps rising steadily', 'It pauses at 0 °C while the ice melts', 'It drops'] } },
    { tag: 'test', title: 'Melt the ice', sheet: 1, goal: { text: 'Heat the water until it is a liquid.', check: { was_liquid_water: true } },
      q: { type: 'mc', q: 'You predicted: {{pred:s1}}. What did the thermometer do at 0 °C?', choices: ['It paused at 0 °C while particles broke free', 'It jumped to 100 °C', 'It kept rising the whole time'], answer: 0, why: 'At the melting point, added energy goes into breaking particles out of their fixed positions, not into speeding them up, so the temperature pauses.' } },
    { tag: 'test', title: 'Boil it', sheet: 2, goal: { text: 'Keep heating until the water becomes a gas.', check: { was_gas_water: true } },
      q: { type: 'multi', q: 'Compare the gas to the liquid. Choose all that are true.', choices: ['Particles move faster', 'Particles are farther apart', 'Particles fill the whole box', 'The particles got bigger'], answer: [0, 1, 2], hint: 'Particles never change size.' } },
    { tag: 'record', title: 'Particle data', sheet: 3, q: { type: 'table', q: 'Record the state and describe the particle motion.', rowHead: 'Temperature', cols: [{ label: 'State', value: function (s, r) { return r.st; } }],
      rows: [{ label: '−20 °C', st: 'solid' }, { label: '50 °C', st: 'liquid' }, { label: '120 °C', st: 'gas' }], tip: 'Type solid, liquid, or gas. Use the model to check.' } },
    { tag: 'test', title: 'Remove energy', sheet: 4, goal: { text: 'Cool the water back into ice.', check: { refroze_water: true } },
      q: { type: 'mc', q: 'What happened to the particles as you removed thermal energy?', choices: ['They slowed down and locked into place', 'They sped up', 'They disappeared', 'They shrank'], answer: 0 } },
    { tag: 'test', title: 'Oxygen', sheet: 5, goal: { text: 'Switch to **Oxygen** and find its state change temperatures.', check: { substance: 'oxygen', was_gas_oxygen: true } },
      q: { type: 'num', q: 'At what temperature does oxygen boil?', unit: '°C', answer: -183, tol: 1 } },
    { tag: 'reason', title: 'Same model, different numbers', sheet: 5, q: { type: 'mc', q: 'Water, oxygen, and iron all follow the same particle model. What is different?', choices: ['The temperatures where they melt and boil', 'Iron particles never move', 'Oxygen has no particles', 'Only water can be a gas'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: iron', sheet: 6, goal: { text: 'Melt iron.', check: { was_liquid_iron: true } }, q: { type: 'mc', q: 'Why does iron need so much more thermal energy to melt than ice?', choices: ['Iron particles are held together much more strongly', 'Iron particles are bigger', 'Iron has fewer particles'], answer: 0 } },
    { tag: 'write', title: 'Particle model (CER)', sheet: 7, q: { type: 'write', q: 'How does adding thermal energy change particles and state?', parts: [
      { label: 'Claim', starter: 'Adding thermal energy makes particles', min: 6, need: [{ words: ['faster', 'speed', 'move more'], label: 'Particles move faster' }] },
      { label: 'Evidence', starter: 'In the particle box,', min: 12, number: true, need: [{ words: ['solid', 'liquid', 'gas'], label: 'Uses observations of the states' }, { words: ['0', '100', 'pause'], label: 'Uses the melting/boiling point data' }] },
      { label: 'Reasoning', starter: 'This happens because', min: 12, need: [{ words: ['energy'], label: 'Explains with energy' }, { words: ['apart', 'break', 'free', 'spread'], label: 'Explains how particles separate' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-heating-curve', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.2',
  title: 'Heating Curve Lab', model: 'heatCurve', minutes: 25, icon: '📈',
  place: 'Sunnyside Science Lab · Data Station',
  mission: 'A strange thing happens when you heat ice: the thermometer gets "stuck" twice. Heat ice steadily, graph the temperature over time, and explain the flat parts using particles.',
  question: 'Why does temperature stop rising during melting and boiling?',
  takeaway: 'A heating curve has two flat plateaus: at 0 °C (melting) and 100 °C (boiling). During a plateau, the energy added breaks particles apart from each other instead of speeding them up, so temperature stays the same until the change of state is complete.',
  vocab: [['Heating curve', 'A graph of temperature versus time as something is heated.'], ['Plateau', 'A flat part of the graph where temperature stays the same.'], ['Change of state', 'Melting, freezing, boiling, condensing.'], ['Slope', 'How steep a line is; steeper means faster change.']],
  warmup: { style: 'Read the graph', prompt: 'Sketch a graph of temperature vs time for a cup of hot cocoa cooling. Answer:', items: [['What would the line do over time?', 'Go down quickly at first, then more slowly.'], ['What does a flat line on a temperature graph mean?', 'The temperature is not changing.'], ['At what temperature does ice melt? Water boil?', '0 °C and 100 °C.']] },
  steps: [
    { tag: 'predict', title: 'Predict the shape', sheet: 1, q: { type: 'predict', q: 'If you heat ice at a steady rate, what will the temperature graph look like?', choices: ['A straight line going up', 'A line going up with flat parts', 'A line going down'] } },
    { tag: 'test', title: 'Heat the ice', sheet: 1, goal: { text: 'Turn on the burner (low flame) and heat until ALL the water becomes steam.', check: { done: true } },
      q: { type: 'mc', q: 'You predicted: {{pred:s0}}. How many flat parts (plateaus) are on the graph?', choices: ['2', '1', '0', '4'], answer: 0 } },
    { tag: 'record', title: 'Read the graph', sheet: 2, q: { type: 'table', q: 'Record when each plateau started (read the graph or readouts).', rowHead: 'Event', cols: [{ label: 'Temperature', unit: '°C', value: function (s, r) { return r.t; } }, { label: 'Started at', unit: 'min', value: function (s, r) { return s[r.k]; }, tol: 0.3 }],
      rows: [{ label: 'Melting plateau', t: 0, k: 'meltStart' }, { label: 'Boiling plateau', t: 100, k: 'boilStart' }] } },
    { tag: 'reason', title: 'Where does the energy go?', sheet: 3, q: { type: 'mc', q: 'The burner keeps adding energy during the plateaus. Where does that energy go?', choices: ['Into breaking particles apart (changing state)', 'Nowhere; it is wasted', 'Into making particles bigger', 'Into cooling the beaker'], answer: 0 } },
    { tag: 'reason', title: 'Which plateau is longer?', sheet: 3, q: { type: 'mc', q: 'The boiling plateau is much longer than the melting plateau. What does that tell you?', choices: ['Boiling needs more energy to pull particles completely apart', 'Water boils slower because it is hot', 'The burner turned down'], answer: 0 } },
    { tag: 'test', title: 'High flame', sheet: 4, text: 'Press ↺ New ice and repeat with **High flame**.', goal: { text: 'Heat new ice to steam on high flame.', check: { done: true, power: 2 } },
      q: { type: 'mc', q: 'With more power, what changed and what stayed the same?', choices: ['Everything happened faster, but plateaus were still at 0 °C and 100 °C', 'The plateaus moved to new temperatures', 'There were no plateaus'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: cooling curve', sheet: 5, q: { type: 'order', q: 'Steam is cooled steadily. Put the parts of its COOLING curve in order.', items: ['Steam cools down to 100 °C', 'Flat at 100 °C while steam condenses', 'Water cools from 100 °C to 0 °C', 'Flat at 0 °C while water freezes', 'Ice cools below 0 °C'] } },
    { tag: 'write', title: 'Explain the plateaus (CER)', sheet: 6, q: { type: 'write', q: 'Why does temperature stop rising during melting and boiling?', parts: [
      { label: 'Claim', starter: 'Temperature stops rising because', min: 6, need: [{ words: ['energy', 'state'], label: 'Mentions energy or change of state' }] },
      { label: 'Evidence', starter: 'My graph was flat at', min: 10, number: true, need: [{ words: ['0', '100'], label: 'Names the plateau temperatures' }] },
      { label: 'Reasoning', starter: 'During the plateau, the particles', min: 12, need: [{ words: ['apart', 'break', 'free', 'separate'], label: 'Explains particles breaking apart' }, { words: ['speed', 'faster', 'temperature'], label: 'Explains why speed/temperature doesn\'t rise' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-diffusion', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.1',
  title: 'Food Coloring Race', model: 'diffusion', minutes: 20, icon: '🧪',
  place: 'Sunnyside Science Lab · Evidence Bench',
  mission: 'Nobody can see particles moving. But you can see their effects! Race food coloring through cold and hot water and use the results as evidence for the particle model.',
  question: 'What evidence shows that particles move faster at higher temperatures?',
  takeaway: 'Food coloring spreads (diffuses) through water because water particles are always moving and bumping the dye particles. In hot water it spreads faster because the particles move faster. This is evidence that temperature measures how fast particles move.',
  vocab: [['Diffusion', 'Particles spreading from where there are many to where there are few.'], ['Evidence', 'Observations that support a claim.'], ['Kinetic energy', 'The energy of motion.'], ['Controlled variable', 'Something kept the same in a fair test.']],
  warmup: { style: 'Real-world riddle', prompt: 'Explain each with particles.', items: [['Why can you smell cookies baking from another room?', 'Scent particles move and spread through the air.'], ['Does a tea bag make tea faster in hot or cold water?', 'Hot water: particles move faster.'], ['Why does a drop of ink eventually color a whole glass even if you don\'t stir?', 'Particles are always moving and mixing.']] },
  steps: [
    { tag: 'predict', title: 'Predict the winner', sheet: 1, q: { type: 'predict', q: 'Beaker A is 10 °C, Beaker B is 70 °C. Which will mix completely first?', choices: ['Beaker A (cold)', 'Beaker B (hot)', 'A tie'] } },
    { tag: 'test', title: 'Race!', sheet: 1, goal: { text: 'Add food coloring (A = 10 °C, B = 70 °C) and wait until both are fully mixed.', check: { finished: true, trialA: 10, trialB: 70 } },
      q: { type: 'table', q: 'Record the time to fully mix.', rowHead: 'Beaker', cols: [{ label: 'Time', unit: 's', value: function (s, r) { return s['time_' + r.t]; }, tol: 1.1 }], rows: [{ label: 'A: 10 °C', t: 10 }, { label: 'B: 70 °C', t: 70 }] } },
    { tag: 'reason', title: 'Explain the winner', sheet: 2, q: { type: 'mc', q: 'You predicted: {{pred:s0}}. Why did the hot beaker mix faster?', choices: ['Hot water particles move faster and bump the dye around more', 'Hot water is thinner', 'The dye melts in hot water', 'Cold water has no particles'], answer: 0 } },
    { tag: 'test', title: 'Fair test check', sheet: 3, text: 'Reset and set BOTH beakers to 40 °C.', goal: { text: 'Run a race with both beakers at 40 °C.', check: { finished: true, trialA: 40, trialB: 40 } },
      q: { type: 'mc', q: 'Both beakers were the same temperature. What happened, and why is this trial useful?', choices: ['About a tie. It shows temperature was the cause of the difference', 'Beaker A always wins', 'It proves nothing'], answer: 0 } },
    { tag: 'test', title: 'Find the pattern', sheet: 4, text: 'Test more temperatures (set A and B to different values).', goal: { text: 'Collect times for at least 4 different temperatures.', check: function (s) { return Object.keys(s).filter(function (k) { return /^time_\d+$/.test(k); }).length >= 4; } },
      q: { type: 'mc', q: 'What is the relationship between temperature and mixing time?', choices: ['Higher temperature → shorter mixing time', 'Higher temperature → longer mixing time', 'No relationship'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: a gas', sheet: 5, q: { type: 'mc', q: 'Perfume spreads across a room faster on a hot day than a cold day. Which part of the particle model explains this?', choices: ['Particles have more kinetic energy at higher temperatures', 'Hot air has no particles', 'Perfume particles get lighter in heat'], answer: 0 } },
    { tag: 'write', title: 'Evidence report (CER)', sheet: 6, q: { type: 'write', q: 'What evidence shows particles move faster at higher temperatures?', parts: [
      { label: 'Claim', starter: 'Particles move faster when', min: 6, need: [{ words: ['hot', 'warm', 'higher temperature'], label: 'States the relationship' }] },
      { label: 'Evidence', starter: 'In the food coloring race,', min: 12, number: true, need: [{ words: ['seconds', 's', 'faster', 'time'], label: 'Uses timing data' }] },
      { label: 'Reasoning', starter: 'The dye spread faster because', min: 10, need: [{ words: ['particle'], label: 'Uses particles' }, { words: ['bump', 'collide', 'move', 'energy'], label: 'Explains motion/collisions' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-gas-piston', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.1–6.PS.2',
  title: 'Gas Pressure Piston', model: 'piston', minutes: 25, icon: '🎈',
  place: 'Sunnyside Science Lab · Pressure Chamber',
  mission: 'Why does a bike tire look flat on a cold morning? Why do aerosol cans warn "do not heat"? Experiment with a gas in a piston to find how temperature, volume, and particles affect pressure.',
  question: 'How does the motion of gas particles cause pressure?',
  takeaway: 'Gas pressure comes from particles colliding with the walls. Heating a gas makes particles move faster, so they hit harder and more often: pressure rises. Squeezing a gas into less volume, or adding more particles, also means more collisions and more pressure.',
  vocab: [['Pressure', 'How hard particles push on an area (from collisions).'], ['Collision', 'When particles hit each other or the walls.'], ['Volume', 'The space the gas fills.'], ['Kelvin (K)', 'A temperature scale that starts at absolute zero.']],
  warmup: { style: 'Real-world riddle', prompt: 'Use particles to explain.', items: [['Why do balloons shrink when left in a cold car?', 'Cold particles move slower and push less.'], ['Why does a bike pump get harder to push?', 'Squeezing particles into less space means more collisions.'], ['Why does a bag of chips puff up on a mountain drive?', 'Less air pressure outside to push back.']] },
  steps: [
    { tag: 'explore', title: 'Watch the particles', goal: { text: 'Change the temperature slider and watch the particles and the gauge.', check: function (s) { return s.T !== 300; } },
      q: { type: 'mc', q: 'What causes the pressure gauge reading?', choices: ['Particles hitting the walls and piston', 'The color of the particles', 'Particles sticking to the walls'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'If you double the temperature (300 K → 600 K), the pressure will...', choices: ['double', 'stay the same', 'drop by half'] } },
    { tag: 'record', title: 'Temperature trials', sheet: 1, q: { type: 'table', q: 'Keep 1 L and 30 particles. Record the pressure.', rowHead: 'Temperature', cols: [{ label: 'Pressure', unit: 'kPa', value: function (s, r) { return s['p_' + r.T + '_1_30']; }, tol: 1.1 }],
      rows: [{ label: '150 K', T: 150, when: function (s) { return s.p_150_1_30 != null; }, setup: 'set 150 K, 1 L, 30 particles, and wait for the gauge to settle' }, { label: '300 K', T: 300, when: function (s) { return s.p_300_1_30 != null; }, setup: 'set 300 K, 1 L, 30 particles' }, { label: '600 K', T: 600, when: function (s) { return s.p_600_1_30 != null; }, setup: 'set 600 K, 1 L, 30 particles' }] } },
    { tag: 'reason', title: 'Temperature rule', sheet: 2, q: { type: 'mc', q: 'You predicted the pressure would {{pred:s1}}. What pattern does your table show?', choices: ['Double the temperature, double the pressure', 'Temperature doesn\'t affect pressure', 'Higher temperature, lower pressure'], answer: 0 } },
    { tag: 'test', title: 'Squeeze it', sheet: 3, goal: { text: 'At 300 K with 30 particles, push the piston down to **0.5 L**.', check: { T: 300, V: 0.5, n: 30 } },
      q: { type: 'num', q: 'What is the pressure at 0.5 L?', unit: 'kPa', answer: function (s) { return s.P; }, tol: 1.1, why: 'Half the space means particles hit the walls twice as often.' } },
    { tag: 'test', title: 'Add particles', sheet: 4, goal: { text: 'Back to 1 L and 300 K, then add particles to reach **60**.', check: { T: 300, V: 1, n: 60 } },
      q: { type: 'mc', q: 'What happened to the pressure with twice as many particles, and why?', choices: ['It doubled: twice as many collisions', 'It halved', 'It stayed the same'], answer: 0 } },
    { tag: 'apply', title: 'Real world', sheet: 5, q: { type: 'sort', q: 'Sort each situation by what happens to the pressure inside.', bins: ['Pressure goes UP', 'Pressure goes DOWN'], items: [['A soda can in a hot car', 0], ['A basketball left outside in winter', 1], ['Pumping more air into a tire', 0], ['Letting air out of a balloon', 1], ['Squeezing a sealed syringe', 0]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: combine changes', sheet: 6, q: { type: 'num', q: 'A gas is at 90 kPa. You double its temperature AND squeeze it to half the volume. What is the new pressure?', unit: 'kPa', answer: 360, work: true, why: 'Doubling temperature doubles pressure (180). Halving volume doubles it again (360).' } },
    { tag: 'write', title: 'Explain the warning label (CER)', sheet: 7, q: { type: 'write', q: 'Why do aerosol cans say "Do not heat"?', parts: [
      { label: 'Claim', starter: 'Heating an aerosol can is dangerous because', min: 6, need: [{ words: ['pressure'], label: 'Names pressure' }] },
      { label: 'Evidence', starter: 'In the piston,', min: 12, number: true, need: [{ words: ['temperature', 'k', 'heat'], label: 'Uses temperature data' }, { words: ['kpa', 'pressure'], label: 'Uses pressure data' }] },
      { label: 'Reasoning', starter: 'The particles', min: 12, need: [{ words: ['faster', 'speed'], label: 'Particles move faster' }, { words: ['hit', 'collide', 'collision', 'push'], label: 'Explains collisions' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-thermometer-design', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.2',
  title: 'Build-a-Thermometer', model: 'expansion', minutes: 20, icon: '🌡️',
  place: 'Sunnyside Science Lab · Engineering Bench',
  mission: 'The weather club needs a homemade thermometer. Place a bottle with a thin tube and a balloon bottle in water baths of different temperatures, calibrate the tube with marks, and explain why it works.',
  question: 'Why do liquids and gases expand when heated, and how can that measure temperature?',
  takeaway: 'When matter is heated, its particles move faster and spread slightly farther apart, so it expands. The liquid in a thin tube rises when heated and falls when cooled. By marking the height at known temperatures, we can build a thermometer.',
  vocab: [['Thermal expansion', 'Matter getting bigger (taking up more space) when heated.'], ['Contraction', 'Matter getting smaller when cooled.'], ['Calibrate', 'Mark a tool using known values so it measures accurately.'], ['Linear pattern', 'Changing by the same amount each step.']],
  warmup: { style: 'Notice & wonder', prompt: 'Answer with what you notice and wonder.', items: [['Bridges have small gaps between sections. Why?', 'So they can expand in hot weather without cracking.'], ['Why is it easier to open a tight jar lid after running it under hot water?', 'The metal lid expands.'], ['What do you think is inside a thermometer?', 'A liquid (like colored alcohol) that expands.']] },
  steps: [
    { tag: 'explore', title: 'Warm it up', goal: { text: 'Set the water bath to 60 °C or more.', check: { hot: true } },
      q: { type: 'multi', q: 'What changed when the bath got hot? Choose all.', choices: ['The liquid column rose', 'The balloon got bigger', 'The bottles got heavier'], answer: [0, 1] } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'What will happen to the balloon in ice water (0 °C)?', choices: ['It will shrink', 'It will grow', 'No change'] } },
    { tag: 'test', title: 'Cool it down', sheet: 1, goal: { text: 'Set the bath to 0 °C.', check: { cold: true } }, q: { type: 'mc', q: 'You predicted: {{pred:s1}}. Why did the balloon shrink?', choices: ['Air particles slowed down and took up less space', 'Air leaked out', 'The balloon froze'], answer: 0 } },
    { tag: 'record', title: 'Calibrate', sheet: 2, text: 'Put the thermometer in each bath and press ✏️ Mark.', q: { type: 'table', q: 'Record the column height at each temperature.', rowHead: 'Bath', cols: [{ label: 'Column', unit: 'mm', value: function (s, r) { return s['mark_' + r.t]; }, tol: 0.6 }],
      rows: [{ label: '0 °C', t: 0, when: function (s) { return s.mark_0 != null; } }, { label: '20 °C', t: 20, when: function (s) { return s.mark_20 != null; } }, { label: '40 °C', t: 40, when: function (s) { return s.mark_40 != null; } }, { label: '80 °C', t: 80, when: function (s) { return s.mark_80 != null; } }] } },
    { tag: 'reason', title: 'Find the rule', sheet: 3, q: { type: 'num', q: 'How many mm does the column rise for every 10 °C?', unit: 'mm', answer: 15, work: true } },
    { tag: 'apply', title: 'Use your thermometer', sheet: 3, q: { type: 'num', q: 'The column reads 85 mm. What is the temperature?', unit: '°C', answer: 30, work: true, hint: '0 °C = 40 mm. Each 10 °C adds 15 mm.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: design choice', sheet: 4, q: { type: 'mc', q: 'Why do real thermometers use a very THIN tube?', choices: ['A small expansion makes a big, easy-to-read change in height', 'Thin tubes are cheaper only', 'Liquid expands more in thin tubes'], answer: 0 } },
    { tag: 'write', title: 'How it works (CER)', sheet: 5, q: { type: 'write', q: 'Explain how your homemade thermometer measures temperature.', parts: [
      { label: 'Claim', starter: 'The thermometer works because', min: 6, need: [{ words: ['expand', 'bigger', 'rise'], label: 'Names expansion' }] },
      { label: 'Evidence', starter: 'At 0 °C the column was', min: 12, number: true, need: [{ words: ['mm'], label: 'Uses column heights' }] },
      { label: 'Reasoning', starter: 'When heated, the particles', min: 12, need: [{ words: ['faster', 'move'], label: 'Particles move faster' }, { words: ['apart', 'space', 'room'], label: 'Particles spread apart' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-deep-freeze', std: 'g6-sci-particles', subject: 'science', grade: 6, code: '6.PS.2',
  title: 'Deep Freeze to Furnace', model: 'stateChart', minutes: 20, icon: '❄️',
  place: 'Sunnyside Science Lab · Extreme Temperature Wing',
  mission: 'The extreme temperature wing can go from −250 °C to 3,000 °C. Use the chart of melting and boiling points to predict the state of seven substances in each chamber, then solve the lab\'s storage puzzles.',
  question: 'How can melting and boiling points predict a substance\'s state?',
  takeaway: 'Each substance has its own melting and boiling point. Below its melting point it is a solid; between the two it is a liquid; above its boiling point it is a gas. Comparing a temperature to these points predicts the state.',
  vocab: [['Melting point', 'Solid ↔ liquid temperature.'], ['Boiling point', 'Liquid ↔ gas temperature.'], ['Characteristic property', 'A property that helps identify a substance, like its boiling point.'], ['Room temperature', 'About 20 °C.']],
  warmup: { style: 'True or false?', prompt: 'T or F? Fix the false ones.', items: [['Everything melts at 0 °C.', 'False: each substance has its own melting point.'], ['Oxygen is a gas at room temperature.', 'True.'], ['Metals can never be liquids.', 'False: mercury is liquid at room temperature, and metals melt when very hot.']] },
  steps: [
    { tag: 'explore', title: 'Room temperature', goal: { text: 'Jump to **Room 20°**.', check: { T: 20 } }, q: { type: 'num', q: 'How many substances are liquids at 20 °C?', unit: 'liquids', answer: function (s) { return s.liquids; } } },
    { tag: 'reason', title: 'Read the chart', sheet: 1, q: { type: 'mc', q: 'Mercury is used in old thermometers. Using the chart, why is it a good choice?', choices: ['It is liquid from −39 °C to 357 °C', 'It is a gas at room temperature', 'It is solid at room temperature'], answer: 0 } },
    { tag: 'record', title: 'State table', sheet: 2, q: { type: 'table', q: 'Set each temperature and record the states.', rowHead: 'Temperature', cols: [{ label: 'Water', value: function (s) { return s.s_water; } }, { label: 'Ethanol', value: function (s) { return s.s_ethanol; } }, { label: 'Tin', value: function (s) { return s.s_tin; } }],
      rows: [{ label: '−50 °C', when: { T: -50 } }, { label: '100 °C exactly', when: { T: 100 } }, { label: '500 °C', when: { T: 500 } }], tip: 'Type solid, liquid, or gas.' } },
    { tag: 'test', title: 'Storage puzzle 1', sheet: 3, goal: { text: 'Find a temperature where water AND ethanol are BOTH liquids but oxygen is a gas. Set the slider there.', check: function (s) { return s.s_water === 'liquid' && s.s_ethanol === 'liquid' && s.s_oxygen === 'gas'; } },
      q: { type: 'mc', q: 'Which range works for puzzle 1?', choices: ['Between 0 °C and 78 °C', 'Between −114 °C and 0 °C', 'Above 100 °C'], answer: 0 } },
    { tag: 'test', title: 'Storage puzzle 2', sheet: 3, goal: { text: 'Find a temperature where tin is LIQUID but candle wax is a GAS.', check: function (s) { return s.s_tin === 'liquid' && s.s_candle === 'gas'; } },
      q: { type: 'num', q: 'What is the lowest whole-degree temperature where wax is a gas and tin is liquid?', unit: '°C', answer: 370 } },
    { tag: 'reason', title: 'Identify by boiling point', sheet: 4, q: { type: 'mc', q: 'A clear unknown liquid boils at 78 °C. Which substance is it most likely?', choices: ['Ethanol', 'Water', 'Mercury', 'Oxygen'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: particles', sheet: 5, q: { type: 'mc', q: 'Oxygen boils at −183 °C but iron boils at 2,862 °C. What does this say about their particles?', choices: ['Iron particles attract each other much more strongly', 'Oxygen particles are heavier', 'Iron particles don\'t move'], answer: 0 } },
    { tag: 'explain', title: 'Explain the rule', sheet: 6, q: { type: 'text', q: 'Explain how to use melting and boiling points to predict if a substance is a solid, liquid, or gas.', rows: 3, need: [{ words: ['below', 'less', 'lower', 'under'], label: 'Below melting point → solid' }, { words: ['between'], label: 'Between the points → liquid' }, { words: ['above', 'higher', 'more than', 'over'], label: 'Above boiling point → gas' }] } }
  ]
});
