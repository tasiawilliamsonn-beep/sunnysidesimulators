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

/* ======================= 6.PS.3–4: Energy ======================= */
SUNNY_SIMS.push({
  id: 'g6-sci-skate-park', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.3',
  title: 'Energy Skate Park', model: 'skatePark', minutes: 25, icon: '🛹',
  place: 'Sunnyside Skate Park',
  mission: 'The skate park is designing a new ramp. Drop skaters from different heights, watch the energy bar graph, and find out what controls a skater\'s speed and why skaters eventually stop.',
  question: 'How do potential and kinetic energy change as a skater rides a ramp?',
  takeaway: 'At the top, the skater has the most gravitational potential energy (PE). Going down, PE changes into kinetic energy (KE), so the skater is fastest at the bottom. Without friction, total energy stays the same. With friction, some energy becomes thermal energy, so the skater slows and stops.',
  vocab: [['Potential energy (PE)', 'Stored energy because of position, like height.'], ['Kinetic energy (KE)', 'Energy of motion.'], ['Thermal energy', 'Energy of moving particles, felt as heat.'], ['Conservation of energy', 'Energy is not created or destroyed, only changed.'], ['Joule (J)', 'The unit of energy.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain with the word "energy".', items: [['Ride a sled down a tall hill or a short hill?', 'Tall hill: more potential energy becomes more speed.'], ['Where is a swing moving fastest?', 'At the bottom.'], ['Why does a ball bounce lower each time?', 'Some energy turns into heat and sound.']] },
  steps: [
    { tag: 'explore', title: 'First ride', goal: { text: 'Drag the skater up the ramp and let go (or press a Drop button).', check: { released: true } },
      q: { type: 'mc', q: 'Watch the bar graph. Where is the skater\'s kinetic energy greatest?', choices: ['At the bottom of the ramp', 'At the top', 'It is the same everywhere'], answer: 0 } },
    { tag: 'observe', title: 'Energy swap', sheet: 1, q: { type: 'mc', q: 'As the skater goes UP the other side, what happens?', choices: ['KE changes back into PE and the skater slows down', 'PE and KE both grow', 'Energy disappears'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 2, q: { type: 'predict', q: 'If you drop the skater from twice as high, the top speed will...', choices: ['double', 'increase, but less than double', 'stay the same'] } },
    { tag: 'record', title: 'Height vs speed', sheet: 2, text: 'Friction OFF, 50 kg, U-ramp. Use the Drop buttons.',
      q: { type: 'table', q: 'Record the top speed for each drop height.', rowHead: 'Drop height', cols: [{ label: 'Top speed', unit: 'm/s', value: function (s, r) { return Math.round(Math.sqrt(2 * 9.8 * r.h) * 10) / 10; }, tol: 0.25 }],
        rows: [{ label: '2 m', h: 2, when: function (s) { return s.startH === 2 && s.released; } }, { label: '4 m', h: 4, when: function (s) { return s.startH === 4 && s.released; } }, { label: '8 m', h: 8, when: function (s) { return s.startH === 8 && s.released; } }], hint: 'Read "Top speed" after the skater passes the bottom.' } },
    { tag: 'reason', title: 'Find the pattern', sheet: 3, q: { type: 'mc', q: 'You predicted: {{pred:s2}}. Going from 2 m to 8 m (4 times higher), the speed...', choices: ['doubled (about 6 → 12.5 m/s)', 'became 4 times faster', 'stayed the same'], answer: 0, why: 'Kinetic energy grows with speed × speed. 4× the energy only needs 2× the speed.' } },
    { tag: 'test', title: 'Heavier skater', sheet: 4, goal: { text: 'Drop the **100 kg** skater from 4 m (friction off).', check: { mass: 100, startH: 4, released: true } },
      q: { type: 'mc', q: 'The heavier skater had twice the energy. What about the speed?', choices: ['The same speed: more mass means more energy, but the same speed', 'Twice as fast', 'Half as fast'], answer: 0 } },
    { tag: 'test', title: 'Turn on friction', sheet: 5, goal: { text: 'Turn on **Friction** and drop the skater from 6 m. Watch until the skater stops.', check: { friction: true, stopped: true } },
      q: { type: 'mc', q: 'With friction, where did the skater\'s energy go?', choices: ['It became thermal energy (heat) in the wheels and ramp', 'It was destroyed', 'It turned back into height'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: total energy', sheet: 6, q: { type: 'num', q: 'A skater has 2,000 J of PE at the top. Halfway down, she has 800 J of PE and 150 J of thermal energy. How much KE does she have?', unit: 'J', answer: 1050, work: true } },
    { tag: 'write', title: 'Ramp report (CER)', sheet: 7, q: { type: 'write', q: 'How do PE and KE change as a skater rides the ramp?', parts: [
      { label: 'Claim', starter: 'As the skater goes down,', min: 8, need: [{ words: ['potential', 'pe'], label: 'Names potential energy' }, { words: ['kinetic', 'ke'], label: 'Names kinetic energy' }] },
      { label: 'Evidence', starter: 'When I dropped the skater from', min: 12, number: true, need: [{ words: ['m/s', 'speed'], label: 'Uses speed data' }] },
      { label: 'Reasoning', starter: 'This shows that energy', min: 12, need: [{ words: ['change', 'transform', 'convert'], label: 'Explains energy changing form' }, { words: ['friction', 'thermal', 'heat'], label: 'Explains friction' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-ramp-energy', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.3',
  title: 'Ramp & Cup Collisions', model: 'rampKE', minutes: 20, icon: '🎳',
  place: 'Sunnyside Science Lab · Collision Track',
  mission: 'A bowling alley designer asks: does a heavier ball or a faster ball knock pins harder? Roll balls of different masses down ramps of different heights into a cup and measure how far the cup slides.',
  question: 'How do mass and speed affect kinetic energy?',
  takeaway: 'Kinetic energy depends on both mass and speed. Doubling the mass doubles the kinetic energy. A higher ramp gives more speed, and speed has a bigger effect because KE depends on speed × speed.',
  vocab: [['Kinetic energy', 'The energy of a moving object: KE = ½ × mass × speed².'], ['Mass', 'How much matter an object has.'], ['Independent variable', 'The one thing you change on purpose.'], ['Dependent variable', 'The thing you measure (cup distance).']],
  warmup: { style: 'Rank it', prompt: 'Rank from least to most damage in a crash. Explain.', items: [['A bike at 5 mph, a truck at 5 mph, a truck at 30 mph', 'Bike 5, truck 5, truck 30.'], ['Why do trucks need longer to stop than cars?', 'More mass means more kinetic energy.'], ['A softball and a baseball are thrown at the same speed. Which hits harder?', 'The heavier one (more mass).']] },
  steps: [
    { tag: 'explore', title: 'First roll', goal: { text: 'Release a 1 kg ball from the 1 m ramp.', check: { d_1_1: { gte: 1 } } }, q: { type: 'num', q: 'How far did the cup move?', unit: 'cm', answer: function (s) { return s.d_1_1; }, tol: 1 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'If you double the ball\'s mass (2 kg), the cup will move...', choices: ['about twice as far', 'about four times as far', 'the same distance'] } },
    { tag: 'record', title: 'Mass trials', sheet: 1, text: 'Keep the ramp at 1 m.', q: { type: 'table', q: 'Record the cup distance.', rowHead: 'Ball mass', cols: [{ label: 'Cup moved', unit: 'cm', value: function (s, r) { return s['d_1_' + r.m]; }, tol: 1 }], rows: [{ label: '1 kg', m: 1, when: function (s) { return s.d_1_1 != null; } }, { label: '2 kg', m: 2, when: function (s) { return s.d_1_2 != null; } }, { label: '4 kg', m: 4, when: function (s) { return s.d_1_4 != null; } }] } },
    { tag: 'reason', title: 'Mass pattern', sheet: 2, q: { type: 'mc', q: 'You predicted: {{pred:s1}}. What happens to KE when mass doubles?', choices: ['KE doubles', 'KE stays the same', 'KE is cut in half'], answer: 0 } },
    { tag: 'record', title: 'Height trials', sheet: 3, text: 'Keep the ball at 1 kg.', q: { type: 'table', q: 'Record the cup distance.', rowHead: 'Ramp height', cols: [{ label: 'Speed', unit: 'm/s', value: function (s, r) { return Math.round(Math.sqrt(14 * r.h) * 10) / 10; }, tol: 0.15 }, { label: 'Cup moved', unit: 'cm', value: function (s, r) { return s['d_' + r.h + '_1']; }, tol: 1 }], rows: [{ label: '0.5 m', h: 0.5, when: function (s) { return s.d_0_5_1 != null || s['d_0.5_1'] != null; } }, { label: '2 m', h: 2, when: function (s) { return s.d_2_1 != null; } }] } },
    { tag: 'reason', title: 'Speed matters', sheet: 4, q: { type: 'mc', q: 'Which change gave the ball more kinetic energy?', choices: ['Both doubling the mass and a higher ramp increased KE; a 4× higher ramp gave 4× the KE with only 2× the speed', 'Only mass matters', 'Only height matters'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: calculate KE', sheet: 5, q: { type: 'num', q: 'KE = ½ × m × v². What is the KE of a 2 kg ball moving 3 m/s?', unit: 'J', answer: 9, work: true } },
    { tag: 'write', title: 'Advice for the bowling alley (CER)', sheet: 6, q: { type: 'write', q: 'How do mass and speed affect kinetic energy?', parts: [
      { label: 'Claim', starter: 'Kinetic energy increases when', min: 8, need: [{ words: ['mass', 'heavier'], label: 'Names mass' }, { words: ['speed', 'faster', 'height'], label: 'Names speed' }] },
      { label: 'Evidence', starter: 'When the mass doubled, the cup', min: 12, number: true, need: [{ words: ['cm'], label: 'Uses distance data' }] },
      { label: 'Reasoning', starter: 'The cup moved farther because', min: 10, need: [{ words: ['energy'], label: 'Connects distance to energy' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-coaster', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.3',
  title: 'Coaster Designer', model: 'coaster', minutes: 20, icon: '🎢',
  place: 'Sunnyside Amusement Park · Design Office',
  mission: 'The park wants a coaster with three hills and no motor after the first hill. Design hill heights so the car makes it all the way, with and without friction.',
  question: 'How does energy decide whether a coaster can make it over a hill?',
  takeaway: 'A coaster car\'s total energy comes from the height of the first hill. It can only climb a hill if it has enough energy to reach that height. Friction turns some energy into heat, so later hills must be lower than the first one by a safe margin.',
  vocab: [['Potential energy', 'Stored energy from height.'], ['Kinetic energy', 'Energy of motion.'], ['Friction', 'A force that turns motion energy into heat.'], ['Design constraint', 'A rule your design must follow.']],
  warmup: { style: 'Real-world riddle', prompt: 'Answer with energy words.', items: [['Why is the first hill of a coaster always the tallest?', 'It gives the car all its energy.'], ['Could a coaster car climb a hill taller than where it started (no motor)?', 'No: it doesn\'t have enough energy.'], ['Where does the car go fastest?', 'At the lowest point.']] },
  steps: [
    { tag: 'explore', title: 'Test the starting design', goal: { text: 'Launch the car with no friction.', check: { launched: true, fric: 0 } }, q: { type: 'mc', q: 'Did the car make it over hills 2 and 3?', choices: ['Yes, both are lower than the start hill', 'No'], answer: 0 } },
    { tag: 'test', title: 'Break the rule', sheet: 1, goal: { text: 'Make hill 2 TALLER than the start hill and launch.', check: function (s) { var h = (s.hills || '').split('/').map(Number); return s.launched && h[1] > h[0] && s.madeIt === false; } },
      q: { type: 'mc', q: 'What happened, and why?', choices: ['The car rolled back: it didn\'t have enough energy to climb higher than the start', 'It went faster', 'It flew off the track'], answer: 0 } },
    { tag: 'test', title: 'Add friction', sheet: 2, goal: { text: 'Set hills to 30, 30, 20 with **Some friction** and launch.', check: function (s) { return s.hills === '30/30/20' && s.fric > 0 && s.madeIt === false; } },
      q: { type: 'mc', q: 'Hill 2 was the same height as the start, but the car still didn\'t make it. Why?', choices: ['Friction turned some energy into heat, so it had less than it started with', 'The car got heavier', 'Hill 2 moved'], answer: 0 } },
    { tag: 'test', title: 'Design a winner', sheet: 3, goal: { text: 'With **Some friction**, design hills so the car makes it all the way.', check: function (s) { return s.madeIt === true && s.fric > 0; } },
      q: { type: 'text', q: 'Describe your winning design (the three heights) and why it works.', number: true, need: [{ words: ['lower', 'shorter', 'less', 'smaller'], label: 'Later hills are lower' }, { words: ['energy', 'friction'], label: 'Explains with energy or friction' }] } },
    { tag: 'reason', title: 'Rank the designs', sheet: 4, q: { type: 'sort', q: 'With friction, sort each design (start / hill 2 / hill 3).', bins: ['Makes it', 'Rolls back'], items: [['40 / 30 / 20', 0], ['30 / 35 / 20', 1], ['35 / 30 / 25', 0], ['25 / 25 / 25', 1], ['40 / 20 / 38', 1]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: energy math', sheet: 5, q: { type: 'num', q: 'A 500 kg car starts at 40 m (PE = m × 9.8 × h). What is its PE at the top in joules?', unit: 'J', answer: 196000, work: true } },
    { tag: 'write', title: 'Design memo (CER)', sheet: 6, q: { type: 'write', q: 'What rule should the park follow when designing hills?', parts: [
      { label: 'Claim', starter: 'Each hill must be', min: 6, need: [{ words: ['lower', 'shorter', 'less', 'smaller'], label: 'States the design rule' }] },
      { label: 'Evidence', starter: 'When I tested', min: 12, number: true, need: [{ words: ['rolled back', 'made it', 'm'], label: 'Uses test results' }] },
      { label: 'Reasoning', starter: 'This is because', min: 12, need: [{ words: ['potential', 'energy'], label: 'Explains using energy' }, { words: ['friction', 'heat', 'thermal'], label: 'Accounts for friction' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-spoon-conduction', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.4',
  title: 'Spoon Conduction Test', model: 'conduction', minutes: 20, icon: '🥄',
  place: 'Sunnyside Café · Kitchen Lab',
  mission: 'The café needs new stirring spoons that won\'t burn hands. Put metal, wooden, and plastic spoons in hot cocoa, track the handle temperatures, and watch the butter pats.',
  question: 'Why do some materials conduct thermal energy better than others?',
  takeaway: 'Conduction is heat transfer by direct contact: fast-moving particles bump neighbors and pass energy along. Metals are good conductors, so a metal handle heats up quickly. Wood and plastic are insulators; energy moves through them slowly.',
  vocab: [['Conduction', 'Heat transfer by direct contact between particles.'], ['Conductor', 'A material that transfers heat well (metals).'], ['Insulator', 'A material that transfers heat poorly (wood, plastic, foam).'], ['Thermal equilibrium', 'When touching objects reach the same temperature.']],
  warmup: { style: 'Notice & wonder', prompt: 'Think about your kitchen.', items: [['Why do pots have plastic or wooden handles?', 'Those materials are insulators; they don\'t get hot quickly.'], ['A metal bench feels colder than a wood bench on the same day. Why?', 'Metal conducts heat away from your hand faster.'], ['What do you wonder about hot and cold?', 'Any real question.']] },
  steps: [
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'Which spoon\'s butter will melt first?', choices: ['Metal', 'Wooden', 'Plastic'] } },
    { tag: 'test', title: 'Run the test', sheet: 1, goal: { text: 'Put the spoons in the cocoa and run for 10 minutes.', check: { time: { gte: 10 } } },
      q: { type: 'table', q: 'Record the handle temperatures at 5 minutes (read the graph).', rowHead: 'Spoon', cols: [{ label: 'At 5 min', unit: '°C', value: function (s, r) { return s['t5_' + r.k]; }, tol: 1.1 }], rows: [{ label: 'Metal', k: 'metal' }, { label: 'Wooden', k: 'wood' }, { label: 'Plastic', k: 'plastic' }] } },
    { tag: 'reason', title: 'Conductor or insulator?', sheet: 2, q: { type: 'sort', q: 'Sort the materials.', bins: ['Conductor', 'Insulator'], items: [['Metal spoon', 0], ['Wooden spoon', 1], ['Plastic spoon', 1], ['Copper pot bottom', 0], ['Foam cup', 1], ['Oven mitt', 1]] } },
    { tag: 'explain', title: 'Particle explanation', sheet: 3, q: { type: 'mc', q: 'How did thermal energy travel up the metal spoon?', choices: ['Fast particles in the cocoa bumped spoon particles, which bumped their neighbors up the handle', 'Hot air blew up the spoon', 'The cocoa climbed the spoon'], answer: 0 } },
    { tag: 'reason', title: 'Equilibrium', sheet: 3, q: { type: 'mc', q: 'If you waited a very long time, what would happen to the cocoa and the metal spoon?', choices: ['They would reach the same temperature, then cool to room temperature', 'The spoon would get hotter than the cocoa', 'Nothing would change'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: best spoon', sheet: 4, q: { type: 'mc', q: 'The café wants a spoon that stirs well AND is safe to hold. What design is best?', choices: ['Metal bowl with a wooden or plastic handle', 'All metal', 'All foam'], answer: 0 } },
    { tag: 'write', title: 'Recommendation (CER)', sheet: 5, q: { type: 'write', q: 'Which spoon should the café buy, and why?', parts: [
      { label: 'Claim', starter: 'The café should buy', min: 6, need: [{ words: ['wood', 'plastic'], label: 'Recommends an insulator' }] },
      { label: 'Evidence', starter: 'After 5 minutes, the metal handle was', min: 12, number: true, need: [{ words: ['°c', 'degrees', 'c'], label: 'Uses temperature data' }] },
      { label: 'Reasoning', starter: 'This is because', min: 10, need: [{ words: ['conduct', 'insulat'], label: 'Uses conductor/insulator' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-cocoa-cups', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.4',
  title: 'Keep It Hot: Cup Test', model: 'cooling', minutes: 20, icon: '☕',
  place: 'Sunnyside Café · Taste Test Table',
  mission: 'Customers complain their cocoa gets cold too fast. Test four cups side by side, with and without lids, and pick the cup that keeps cocoa hot the longest.',
  question: 'Which materials slow thermal energy transfer, and why?',
  takeaway: 'Thermal energy always moves from hotter to colder objects. Insulators like foam slow conduction, so cocoa stays hot longer. A lid also slows convection and evaporation from the top. Metal cups lose heat fastest because metal is a good conductor.',
  vocab: [['Insulator', 'A material that slows heat transfer.'], ['Convection', 'Heat transfer by moving liquid or gas (warm rises, cool sinks).'], ['Rate', 'How fast something changes.'], ['Room temperature', 'About 20 °C; things cool toward it.']],
  warmup: { style: 'Estimation station', prompt: 'Estimate, then explain.', items: [['Hot cocoa starts at 80 °C. What temperature will it reach if left for a whole day?', 'Room temperature, about 20 °C.'], ['Does a thermos keep things hot or cold?', 'Both: it slows heat transfer in either direction.'], ['Why do we put lids on pots?', 'To keep heat and steam from escaping.']] },
  steps: [
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'Which cup will keep cocoa hottest after 20 minutes?', choices: ['Foam cup', 'Ceramic mug', 'Glass cup', 'Metal cup'] } },
    { tag: 'test', title: 'Race the cups', sheet: 1, goal: { text: 'Run the test WITHOUT lids for 30 minutes.', check: { time: { gte: 30 }, lid: false } },
      q: { type: 'table', q: 'Record the temperatures at 20 minutes (no lids).', rowHead: 'Cup', cols: [{ label: 'At 20 min', unit: '°C', value: function (s, r) { return s['t20_' + r.k]; }, tol: 1.1 }], rows: [{ label: 'Foam', k: 'foam' }, { label: 'Ceramic', k: 'ceramic' }, { label: 'Metal', k: 'metal' }] } },
    { tag: 'reason', title: 'Read the graph', sheet: 2, q: { type: 'mc', q: 'All four lines curve and level off. Why do they level off?', choices: ['They approach room temperature, so heat transfer slows', 'The cups run out of cocoa', 'The thermometer breaks'], answer: 0 } },
    { tag: 'test', title: 'Add lids', sheet: 3, goal: { text: 'Reset, turn ON lids, and run 30 minutes.', check: { time: { gte: 30 }, lid: true } },
      q: { type: 'num', q: 'What was the foam cup\'s temperature at 20 minutes WITH a lid?', unit: '°C', answer: function (s) { return s.t20_foam_lid; }, tol: 1.1 } },
    { tag: 'reason', title: 'Why lids help', sheet: 3, q: { type: 'mc', q: 'Why did lids keep every cup hotter?', choices: ['They stop warm air and steam from rising away (convection/evaporation)', 'Lids make the cocoa heavier', 'Lids add heat'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: iced drinks', sheet: 4, q: { type: 'mc', q: 'For an ICED drink, which cup keeps it cold longest, and why?', choices: ['Foam: insulators slow heat from the warm room getting IN', 'Metal: it is cold to touch', 'It doesn\'t matter for cold drinks'], answer: 0 } },
    { tag: 'write', title: 'Café recommendation (CER)', sheet: 5, q: { type: 'write', q: 'Which cup should the café use?', parts: [
      { label: 'Claim', starter: 'The café should use', min: 6, need: [{ words: ['foam'], label: 'Names the best cup' }] },
      { label: 'Evidence', starter: 'After 20 minutes,', min: 12, number: true, need: [{ words: ['°c', 'degrees', 'c'], label: 'Uses temperature data' }, { words: ['lid'], label: 'Uses the lid data' }] },
      { label: 'Reasoning', starter: 'Foam works because', min: 10, need: [{ words: ['insulat', 'slow'], label: 'Explains insulation' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-heat-stations', std: 'g6-sci-energy', subject: 'science', grade: 6, code: '6.PS.4',
  title: 'Three Ways Heat Moves', model: 'heatWays', minutes: 25, icon: '🔥',
  place: 'Sunnyside Science Lab · Heat Stations',
  mission: 'Visit three lab stations (a frying pan, a pot of water, and a heat lamp) and discover the three ways thermal energy moves: conduction, convection, and radiation.',
  question: 'How does thermal energy move by conduction, convection, and radiation?',
  takeaway: 'Conduction moves heat through direct contact (pan to handle). Convection moves heat as warm liquid or gas rises and cool sinks, making currents (water in a pot). Radiation moves heat as waves through space or air, with no contact needed (heat lamp, the Sun); dark surfaces absorb more.',
  vocab: [['Conduction', 'Heat moving through touching particles.'], ['Convection', 'Heat moving through currents in liquids and gases.'], ['Radiation', 'Heat moving as waves (infrared light) through space.'], ['Absorb', 'Take in energy.']],
  warmup: { style: 'Quick sort', prompt: 'Which kind of heat transfer? Guess and explain.', items: [['Feeling warm standing in sunshine', 'Radiation.'], ['A metal slide burning your legs in summer', 'Conduction.'], ['Warm air rising from a heater vent', 'Convection.']] },
  steps: [
    { tag: 'test', title: 'Station 1: frying pan', sheet: 1, goal: { text: 'Turn on the burner at the frying pan until the metal handle gets hot (above 60 °C).', check: { hotHandle: true } },
      q: { type: 'mc', q: 'The handle never touched the flame. How did it get hot?', choices: ['Conduction: particles passed energy along the metal', 'Radiation from the flame only', 'Convection currents in the metal'], answer: 0 } },
    { tag: 'test', title: 'Station 2: pot of water', sheet: 2, goal: { text: 'Go to the pot and turn on the burner. Watch the colored particles.', check: { sawCurrents: true } },
      q: { type: 'mc', q: 'What pattern did the warm (orange) and cool (blue) water make?', choices: ['A current: warm water rises, cool water sinks', 'All the water stayed still', 'Warm water sank to the bottom'], answer: 0 } },
    { tag: 'test', title: 'Station 3: heat lamp', sheet: 3, goal: { text: 'Turn on the heat lamp until the black can passes 40 °C.', check: { blackHot: true } },
      q: { type: 'table', q: 'Record both cans.', rowHead: 'Can', cols: [{ label: 'Temperature', unit: '°C', value: function (s, r) { return s[r.k]; }, tol: 1.1 }], rows: [{ label: 'Black can', k: 'black' }, { label: 'White can', k: 'white' }] } },
    { tag: 'reason', title: 'No contact needed', sheet: 3, q: { type: 'mc', q: 'The lamp never touched the cans and there was no current of air. How did energy reach them?', choices: ['Radiation: waves travel through the air', 'Conduction through the table', 'Convection from the cans'], answer: 0 } },
    { tag: 'reason', title: 'Sort real examples', sheet: 4, q: { type: 'sort', q: 'Sort each example.', bins: ['Conduction', 'Convection', 'Radiation'], items: [['Ironing a shirt', 0], ['Hot air balloon rising', 1], ['Sunburn', 2], ['Ice melting in your hand', 0], ['Sea breeze', 1], ['Warmth from a campfire across the circle', 2]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: all three', sheet: 5, q: { type: 'text', q: 'A pot of soup on a campfire. Describe where conduction, convection, AND radiation happen.', min: 18, need: [{ words: ['conduct'], label: 'Conduction example' }, { words: ['convect'], label: 'Convection example' }, { words: ['radiat'], label: 'Radiation example' }] } },
    { tag: 'write', title: 'Station summary (CER)', sheet: 6, q: { type: 'write', q: 'Why did the black can heat up more than the white can?', parts: [
      { label: 'Claim', starter: 'The black can heated more because', min: 6, need: [{ words: ['absorb', 'dark', 'black'], label: 'Dark colors absorb more' }] },
      { label: 'Evidence', starter: 'Under the lamp, the black can reached', min: 10, number: true, need: [{ words: ['white'], label: 'Compares with the white can' }] },
      { label: 'Reasoning', starter: 'Radiation', min: 10, need: [{ words: ['wave', 'radiat'], label: 'Explains radiation' }, { words: ['reflect', 'absorb'], label: 'Explains absorb vs reflect' }] }] } }
  ]
});

/* ======================= 6.ESS: Gravity and the Earth–Sun–Moon system ======================= */
SUNNY_SIMS.push({
  id: 'g6-sci-moon-calendar', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.1',
  title: 'Lunar Calendar Lab', model: 'moonPhase', minutes: 20, icon: '🌔',
  place: 'Sunnyside Observatory · Calendar Room',
  mission: 'Ancient calendars were based on the Moon. Use the Earth–Moon model to predict phases, explain the cycle with the Sun–Earth–Moon positions, and plan a night-sky viewing party for the darkest skies.',
  question: 'How does the relative position of the Sun, Earth, and Moon cause lunar phases?',
  takeaway: 'Half the Moon is always lit by the Sun. As the Moon orbits Earth every 29.5 days, the angle between the Sun, Earth, and Moon changes, so we see more or less of the lit half. At new moon the Moon is between Earth and the Sun; at full moon Earth is between.',
  vocab: [['Lunar cycle', 'One full set of phases, about 29.5 days.'], ['Waxing / waning', 'The lit part we see growing / shrinking.'], ['Gibbous', 'More than half lit.'], ['Model', 'A representation that helps explain how something works.']],
  warmup: { style: 'Predict the picture', prompt: 'Sketch what the Moon looks like, then answer.', items: [['Draw a first quarter moon. Which side is lit (for us in Indiana)?', 'The right half.'], ['Last night was a full moon. About how many days until the next new moon?', 'About 15 days.'], ['Is the far side of the Moon always dark?', 'No: it is lit during a new moon.']] },
  steps: [
    { tag: 'explore', title: 'Set up the model', goal: { text: 'Drag the Moon to a **First quarter** position.', check: { phaseIdx: 2 } },
      q: { type: 'mc', q: 'At first quarter, what angle do the Sun, Earth, and Moon make?', choices: ['A right angle (90°)', 'A straight line', 'The Moon is behind the Sun'], answer: 0 } },
    { tag: 'test', title: 'Line them up', sheet: 1, goal: { text: 'Show a **Full moon**.', check: { phaseIdx: 4 } },
      q: { type: 'mc', q: 'At full moon, what is the order in a line?', choices: ['Sun – Earth – Moon', 'Sun – Moon – Earth', 'Earth – Sun – Moon'], answer: 0 } },
    { tag: 'record', title: 'Phase calendar', sheet: 2, q: { type: 'table', q: 'Starting from new moon (day 0), record the phase.', rowHead: 'Day', cols: [{ label: 'Phase', value: function (s) { return s.phase; } }],
      rows: [{ label: 'Day 4', when: { phaseIdx: 1 } }, { label: 'Day 11', when: { phaseIdx: 3 } }, { label: 'Day 18', when: { phaseIdx: 5 } }, { label: 'Day 26', when: { phaseIdx: 7 } }], tip: 'Use +1 day from the new moon. Type the phase name.' } },
    { tag: 'reason', title: 'Always half lit', sheet: 3, q: { type: 'mc', q: 'At a waning crescent, how much of the WHOLE Moon is lit by the Sun?', choices: ['Half, as always', 'A small sliver', 'None'], answer: 0, why: 'The Sun always lights half the Moon. We just see only a sliver of that lit half from Earth.' } },
    { tag: 'apply', title: 'Plan the viewing party', sheet: 4, q: { type: 'mc', q: 'For the darkest sky to see faint stars, which phase should the party be during?', choices: ['New moon', 'Full moon', 'First quarter'], answer: 0 } },
    { tag: 'apply', title: 'Count the days', sheet: 4, q: { type: 'num', q: 'A full moon is on March 7. About what date is the next full moon? (Type the day in April.)', unit: 'April', answer: [5, 6], tol: 0.5, work: true } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: why not every month?', sheet: 5, q: { type: 'mc', q: 'The Moon passes between Earth and the Sun every month. Why don\'t we get a solar eclipse every month?', choices: ['The Moon\'s orbit is tilted, so it usually passes above or below the Sun', 'The Sun is too big', 'Clouds block it'], answer: 0 } },
    { tag: 'write', title: 'Explain the cycle (CER)', sheet: 6, q: { type: 'write', q: 'How do the positions of the Sun, Earth, and Moon cause phases?', parts: [
      { label: 'Claim', starter: 'Phases happen because', min: 8, need: [{ words: ['position', 'orbit', 'angle', 'moves'], label: 'Names changing positions' }] },
      { label: 'Evidence', starter: 'In the model, at full moon', min: 12, need: [{ words: ['full', 'new'], label: 'Uses full or new moon positions' }] },
      { label: 'Reasoning', starter: 'The Sun always lights', min: 10, need: [{ words: ['half'], label: 'Half is always lit' }, { words: ['see', 'from earth', 'view'], label: 'We see different amounts' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-eclipse-lab', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.1',
  title: 'Eclipse Predictor', model: 'eclipseLab', minutes: 25, icon: '🌑',
  place: 'Sunnyside Observatory · Eclipse Desk',
  mission: 'Indiana saw a total solar eclipse in April 2024, and people traveled from all over to see it. Use the Sun–Earth–Moon model to discover when eclipses happen and why they are so rare.',
  question: 'What has to line up for a solar or lunar eclipse to happen?',
  takeaway: 'A solar eclipse happens at new moon when the Moon passes directly between the Sun and Earth, casting its shadow on Earth. A lunar eclipse happens at full moon when Earth\'s shadow falls on the Moon. Because the Moon\'s orbit is tilted about 5°, the three usually don\'t line up exactly, so eclipses are rare.',
  vocab: [['Solar eclipse', 'The Moon blocks the Sun (only at new moon).'], ['Lunar eclipse', 'Earth\'s shadow covers the Moon (only at full moon).'], ['Tilt', 'The Moon\'s orbit is tipped about 5° compared to Earth\'s orbit.'], ['Umbra', 'The darkest part of a shadow.']],
  warmup: { style: 'Two truths and a lie', prompt: 'Find the lie and fix it.', items: [['A. Solar eclipses happen at new moon. B. Lunar eclipses happen at full moon. C. Eclipses happen every month.', 'C: the tilted orbit makes them rare.'], ['A. It is safe to look at a solar eclipse without special glasses. B. A lunar eclipse can look red. C. Earth\'s shadow causes lunar eclipses.', 'A is false and dangerous: always use eclipse glasses.'], ['A. The Moon is much smaller than the Sun. B. The Moon can block the Sun because it is much closer. C. The Moon makes its own light.', 'C: it reflects sunlight.']] },
  steps: [
    { tag: 'explore', title: 'Two views', goal: { text: 'Drag the Moon between Earth and the Sun (new moon).', check: function (s) { return s.phase === 'New moon'; } },
      q: { type: 'mc', q: 'Was there an eclipse? Look at the side view.', choices: ['It depends: the Moon may pass above or below the Sun', 'Always yes at new moon', 'Never'], answer: 0 } },
    { tag: 'test', title: 'Find a solar eclipse', sheet: 1, goal: { text: 'Change the time of year and Moon position until you make a **solar eclipse**.', check: { sawSolar: true } },
      q: { type: 'multi', q: 'What had to be true for the solar eclipse? Choose all.', choices: ['New moon phase', 'The Moon was in line (not above or below)', 'Full moon phase', 'Earth was between the Sun and Moon'], answer: [0, 1] } },
    { tag: 'test', title: 'Find a lunar eclipse', sheet: 2, goal: { text: 'Make a **lunar eclipse**.', check: { sawLunar: true } },
      q: { type: 'mc', q: 'During the lunar eclipse, what was blocking sunlight from reaching the Moon?', choices: ['Earth', 'The Moon itself', 'The Sun'], answer: 0 } },
    { tag: 'test', title: 'A near miss', sheet: 3, goal: { text: 'Find a new or full moon with NO eclipse.', check: { sawMiss: true } },
      q: { type: 'mc', q: 'Why was there no eclipse this time?', choices: ['The Moon was above or below the Sun–Earth line because of its tilted orbit', 'The Moon was too far away', 'It was cloudy'], answer: 0 } },
    { tag: 'test', title: 'Remove the tilt', sheet: 4, goal: { text: 'Turn OFF the tilt and check a new moon.', check: { tilt: false, sawSolar: true } },
      q: { type: 'mc', q: 'If the Moon\'s orbit were NOT tilted, how often would solar eclipses happen?', choices: ['Every new moon (every month)', 'Never', 'Once every 100 years'], answer: 0 } },
    { tag: 'reason', title: 'Sort eclipse facts', sheet: 5, q: { type: 'sort', q: 'Sort each fact.', bins: ['Solar eclipse', 'Lunar eclipse'], items: [['Happens at new moon', 0], ['Happens at full moon', 1], ['Moon\'s shadow falls on Earth', 0], ['Earth\'s shadow falls on the Moon', 1], ['Needs eclipse glasses to view', 0], ['Moon can look red', 1]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: who can see it?', sheet: 6, q: { type: 'mc', q: 'Why can everyone on the night side of Earth see a lunar eclipse, but only a narrow path sees a total solar eclipse?', choices: ['Earth\'s shadow covers the whole Moon, but the Moon\'s small shadow only touches a small part of Earth', 'Lunar eclipses last longer', 'Solar eclipses happen at night'], answer: 0 } },
    { tag: 'write', title: 'Explain the rarity (CER)', sheet: 7, q: { type: 'write', q: 'Why don\'t eclipses happen every month?', parts: [
      { label: 'Claim', starter: 'Eclipses are rare because', min: 6, need: [{ words: ['tilt', 'tipped', '5'], label: 'Names the tilted orbit' }] },
      { label: 'Evidence', starter: 'In the model,', min: 12, need: [{ words: ['above', 'below', 'miss'], label: 'Uses the near-miss evidence' }, { words: ['new', 'full'], label: 'Names the phases' }] },
      { label: 'Reasoning', starter: 'An eclipse only happens when', min: 10, need: [{ words: ['line', 'aligned', 'lined up'], label: 'Explains alignment' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-seasons', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.1',
  title: 'Reason for the Seasons', model: 'seasonsTilt', minutes: 25, icon: '🍂',
  place: 'Sunnyside Weather Station',
  mission: 'Many adults think summer happens because Earth is closer to the Sun. The weather station wants you to test that idea. Move Earth around its orbit, turn the tilt on and off, and collect sunlight evidence for Indiana and Australia.',
  question: 'What causes Earth\'s seasons?',
  takeaway: 'Seasons are caused by Earth\'s 23.5° tilt, not its distance from the Sun. When Indiana tilts toward the Sun (June), sunlight hits more directly (concentrated) and days are longer, so it is warmer. At the same time, Australia tilts away and has winter. With no tilt, there would be no seasons.',
  vocab: [['Axis tilt', 'Earth\'s axis leans 23.5°.'], ['Direct sunlight', 'Light hitting at a high angle, concentrated on a small area.'], ['Hemisphere', 'Half of Earth (northern or southern).'], ['Solstice', 'The longest or shortest day of the year.']],
  warmup: { style: 'Fix the mistake', prompt: 'Each idea is a common mistake. Correct it.', items: [['"It is summer because Earth is closest to the Sun."', 'Earth is actually closest in January. Tilt causes seasons.'], ['"Everyone on Earth has summer in July."', 'Australia has winter in July.'], ['"The Sun is always straight overhead at noon."', 'In Indiana it never is; the angle changes by season.']] },
  steps: [
    { tag: 'explore', title: 'June in Indiana', goal: { text: 'Set the month to **June**.', check: { month: 5, tilt: 23.5 } },
      q: { type: 'num', q: 'How high is the noon Sun in Indiana in June?', unit: '°', answer: function (s) { return s.alt; }, tol: 1 } },
    { tag: 'record', title: 'Seasons data', sheet: 1, q: { type: 'table', q: 'Record Indiana\'s data (real tilt).', rowHead: 'Month', cols: [{ label: 'Sun height', unit: '°', value: function (s) { return s.alt; }, tol: 1 }, { label: 'Daylight', unit: 'h', value: function (s) { return s.day; }, tol: 0.15 }],
      rows: [{ label: 'June', when: { month: 5, tilt: 23.5 } }, { label: 'September', when: { month: 8, tilt: 23.5 } }, { label: 'December', when: { month: 11, tilt: 23.5 } }] } },
    { tag: 'reason', title: 'Spread-out sunlight', sheet: 2, q: { type: 'mc', q: 'Look at the sunlight panel. Why is December sunlight weaker?', choices: ['The low Sun spreads the same light over a bigger area', 'The Sun makes less light in winter', 'Clouds block it'], answer: 0 } },
    { tag: 'test', title: 'Check Australia', sheet: 3, goal: { text: 'Set the month to **December** and compare Sydney.', check: { month: 11, tilt: 23.5 } },
      q: { type: 'mc', q: 'In December, the Sun is high in Sydney but low in Indiana. What season is Sydney having?', choices: ['Summer', 'Winter', 'The same as Indiana'], answer: 0, why: 'If seasons came from distance, both places would have the same season at the same time. They don\'t, so distance can\'t be the cause.' } },
    { tag: 'test', title: 'Remove the tilt', sheet: 4, goal: { text: 'Choose **No tilt** and move through the months.', check: { tilt: 0 } },
      q: { type: 'mc', q: 'With no tilt, what happens to Indiana\'s Sun height and daylight across the year?', choices: ['They stay the same every month: no seasons', 'Summer gets hotter', 'Winter lasts all year'], answer: 0 } },
    { tag: 'reason', title: 'Test the myth', sheet: 5, q: { type: 'mc', q: 'Earth is actually closest to the Sun in early January. What does this tell you about the "distance" idea?', choices: ['Distance does not cause seasons; tilt does', 'Winter should be hottest', 'Earth doesn\'t orbit the Sun'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: equator', sheet: 6, q: { type: 'mc', q: 'Why do places near the equator have almost no seasons?', choices: ['The Sun is high all year there, and day length barely changes', 'They are closer to the Sun', 'The equator has no tilt'], answer: 0 } },
    { tag: 'write', title: 'Correct the myth (CER)', sheet: 7, q: { type: 'write', q: 'What causes Earth\'s seasons?', parts: [
      { label: 'Claim', starter: 'Seasons are caused by', min: 6, need: [{ words: ['tilt'], label: 'Names the tilt' }], avoid: [['closer to the sun', 'Avoids the "closer to the Sun" myth']] },
      { label: 'Evidence', starter: 'In June, Indiana\'s noon Sun was', min: 14, number: true, need: [{ words: ['december', 'winter'], label: 'Compares to December' }, { words: ['sydney', 'australia', 'no tilt'], label: 'Uses Australia or the no-tilt test' }] },
      { label: 'Reasoning', starter: 'When Indiana tilts toward the Sun,', min: 12, need: [{ words: ['direct', 'concentrated', 'high', 'angle'], label: 'Explains direct sunlight' }, { words: ['longer', 'daylight', 'hours'], label: 'Explains day length' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-newtons-cannon', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.2',
  title: 'Newton\'s Cannon', model: 'orbitCannon', minutes: 20, icon: '🚀',
  place: 'Sunnyside Space Center · Launch Pad',
  mission: 'Isaac Newton imagined a cannon on a mountain so tall it poked out of the air. Fire cannonballs at different speeds to discover how gravity keeps the Moon and satellites in orbit.',
  question: 'How does gravity keep objects in orbit?',
  takeaway: 'Gravity pulls every object toward Earth\'s center. A slow cannonball falls and hits the ground. Fast enough (about 8 km/s), it falls around the curve of Earth without hitting it: that is an orbit. Even faster (about 11 km/s) it escapes. The Moon orbits Earth, and Earth orbits the Sun, the same way.',
  vocab: [['Gravity', 'The force that pulls objects with mass toward each other.'], ['Orbit', 'The curved path of an object around another object.'], ['Velocity', 'Speed in a direction.'], ['Escape velocity', 'The speed needed to break free of a planet\'s gravity.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain.', items: [['Throw a ball gently or as hard as you can: which lands farther away? Why?', 'Harder: more speed carries it farther before gravity brings it down.'], ['If gravity disappeared, what would the Moon do?', 'Fly off in a straight line.'], ['Do astronauts float because there is no gravity in space?', 'No: they are falling around Earth (in orbit).']] },
  steps: [
    { tag: 'explore', title: 'Slow shot', goal: { text: 'Fire at **3 km/s**.', check: { outcome: 'crashed', lastSpeed: 3 } }, q: { type: 'mc', q: 'What happened to the cannonball?', choices: ['Gravity pulled it down and it crashed', 'It went into orbit', 'It flew into space'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'If you fire faster (6 km/s), the ball will...', choices: ['land farther around Earth', 'land in the same place', 'go straight up'] } },
    { tag: 'record', title: 'Speed trials', sheet: 1, q: { type: 'table', q: 'Fire at each speed and record the result (crashed, orbit, or escaped).', rowHead: 'Speed', cols: [{ label: 'Result', value: function (s, r) { return s['out_' + r.k]; } }],
      rows: [{ label: '4 km/s', k: '4', when: function (s) { return !!s.out_4; } }, { label: '6 km/s', k: '6', when: function (s) { return !!s.out_6; } }, { label: '8 km/s', k: '8', when: function (s) { return !!s.out_8; } }, { label: '12 km/s', k: '12', when: function (s) { return !!s.out_12; } }] } },
    { tag: 'reason', title: 'Falling around Earth', sheet: 2, q: { type: 'mc', q: 'At 8 km/s the ball is still being pulled by gravity. Why doesn\'t it hit Earth?', choices: ['It moves sideways so fast that Earth curves away as it falls', 'Gravity turned off', 'It is above the atmosphere so it stops falling'], answer: 0 } },
    { tag: 'test', title: 'Turn off gravity', sheet: 3, goal: { text: 'Turn **Gravity OFF** and fire at 8 km/s.', check: { gravity: false, lastSpeed: 8 } },
      q: { type: 'mc', q: 'Without gravity, what path did the ball take?', choices: ['A straight line into space', 'The same orbit', 'It crashed'], answer: 0, why: 'Without a force pulling it inward, an object keeps moving in a straight line. Gravity is what bends the path into an orbit.' } },
    { tag: 'apply', title: 'Connect to the Moon', sheet: 4, q: { type: 'mc', q: 'How is the Moon like the 8 km/s cannonball?', choices: ['It is always falling toward Earth but moving sideways fast enough to keep missing', 'It is held up by nothing', 'It is pushed by the Sun'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the Sun\'s pull', sheet: 5, q: { type: 'mc', q: 'Earth orbits the Sun at about 30 km/s. What would happen if Earth suddenly stopped moving sideways?', choices: ['It would fall toward the Sun', 'It would stay still', 'It would fly away'], answer: 0 } },
    { tag: 'write', title: 'Explain orbits (CER)', sheet: 6, q: { type: 'write', q: 'How does gravity keep objects in orbit?', parts: [
      { label: 'Claim', starter: 'Gravity keeps objects in orbit by', min: 6, need: [{ words: ['pull', 'toward'], label: 'Gravity pulls toward the center' }] },
      { label: 'Evidence', starter: 'At 4 km/s the ball', min: 12, number: true, need: [{ words: ['crash'], label: 'Uses a crash result' }, { words: ['orbit'], label: 'Uses the orbit result' }] },
      { label: 'Reasoning', starter: 'An orbit happens when', min: 12, need: [{ words: ['fast', 'speed', 'sideways'], label: 'Explains sideways speed' }, { words: ['fall', 'falling', 'curve'], label: 'Explains falling around the curve' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-gravity-lab', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.2',
  title: 'Gravity Strength Lab', model: 'gravityLab', minutes: 20, icon: '🧲',
  place: 'Sunnyside Space Center · Physics Wing',
  mission: 'Mission planners need to know how strongly gravity pulls on objects so astronauts can plan moonwalks and Mars landings. Test how mass and distance change the pull, then weigh a student on four worlds.',
  question: 'How do mass and distance affect the strength of gravity?',
  takeaway: 'Every object with mass pulls on every other object. More mass means a stronger pull. More distance means a much weaker pull: twice as far is one-fourth the pull. That is why the Sun (huge mass) holds the planets, and why you weigh less on the Moon (less mass).',
  vocab: [['Gravitational force', 'The pull between two objects with mass.'], ['Mass', 'The amount of matter (kg).'], ['Weight', 'The pull of gravity on you, in newtons (N).'], ['Inverse square', 'Double the distance → one-fourth the force.']],
  warmup: { style: 'Estimation station', prompt: 'Estimate and explain.', items: [['On the Moon, would you weigh more, less, or the same as on Earth?', 'Less: about 1/6.'], ['Does your MASS change on the Moon?', 'No, only your weight.'], ['Why doesn\'t your pencil pull you toward it?', 'It does, but the pull is tiny because its mass is tiny.']] },
  steps: [
    { tag: 'explore', title: 'First measurement', goal: { text: 'Set Mass A = 1, Mass B = 1, Distance = 1.', check: { m1: 1, m2: 1, d: 1 } }, q: { type: 'num', q: 'What is the gravitational pull?', unit: 'units', answer: 25 } },
    { tag: 'record', title: 'Mass trials', sheet: 1, q: { type: 'table', q: 'Keep distance = 1 and Mass B = 1. Record the pull.', rowHead: 'Mass A', cols: [{ label: 'Pull', unit: 'units', value: function (s, r) { return s['f_' + r.m + '_1_1']; }, tol: 0.02 }], rows: [{ label: '1×', m: 1, when: function (s) { return s.f_1_1_1 != null; } }, { label: '2×', m: 2, when: function (s) { return s.f_2_1_1 != null; } }, { label: '4×', m: 4, when: function (s) { return s.f_4_1_1 != null; } }] } },
    { tag: 'reason', title: 'Mass pattern', sheet: 2, q: { type: 'mc', q: 'When Mass A doubled, the pull...', choices: ['doubled', 'stayed the same', 'went down'], answer: 0 } },
    { tag: 'record', title: 'Distance trials', sheet: 3, q: { type: 'table', q: 'Keep both masses at 1. Record the pull.', rowHead: 'Distance', cols: [{ label: 'Pull', unit: 'units', value: function (s, r) { return s['f_1_1_' + r.d]; }, tol: 0.02 }], rows: [{ label: '1', d: 1, when: function (s) { return s.f_1_1_1 != null; } }, { label: '2', d: 2, when: function (s) { return s.f_1_1_2 != null; } }, { label: '4', d: 4, when: function (s) { return s.f_1_1_4 != null; } }] } },
    { tag: 'reason', title: 'Distance pattern', sheet: 4, q: { type: 'mc', q: 'When the distance doubled (1 → 2), the pull became...', choices: ['one-fourth as strong', 'half as strong', 'twice as strong'], answer: 0 } },
    { tag: 'test', title: 'Weigh a student', sheet: 5, goal: { text: 'Weigh the 50 kg student on all four worlds.', check: function (s) { return s.w_Moon != null && s.w_Mars != null && s.w_Earth != null && s.w_Jupiter != null; } },
      q: { type: 'num', q: 'How many times heavier is the student on Earth than on the Moon? (Round to a whole number.)', unit: 'times', answer: 6, tol: 0.5, work: true } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: predict', sheet: 6, q: { type: 'num', q: 'Two objects pull with 24 units. You triple the distance. What is the new pull?', unit: 'units', answer: 2.67, tol: 0.05, work: true, why: '3× the distance → 1/9 the force. 24 ÷ 9 ≈ 2.67.' } },
    { tag: 'write', title: 'Mission memo (CER)', sheet: 7, q: { type: 'write', q: 'How do mass and distance affect gravity?', parts: [
      { label: 'Claim', starter: 'Gravity gets stronger when', min: 8, need: [{ words: ['mass', 'more massive'], label: 'Names mass' }, { words: ['closer', 'distance'], label: 'Names distance' }] },
      { label: 'Evidence', starter: 'When I doubled the distance,', min: 12, number: true, need: [{ words: ['units', 'pull', 'force'], label: 'Uses force data' }] },
      { label: 'Reasoning', starter: 'This explains why', min: 10, need: [{ words: ['moon', 'sun', 'planet', 'weigh'], label: 'Applies it to space or weight' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-sci-tides', std: 'g6-sci-space', subject: 'science', grade: 6, code: '6.ESS.1–6.ESS.2',
  title: 'Tide Table Lab', model: 'tidesLab', minutes: 20, icon: '🌊',
  place: 'Sunnyside Beach Town · Harbor Office',
  mission: 'The harbor master needs a tide table so boats don\'t get stuck. Use the Earth–Moon model to find out why the ocean rises and falls twice a day, and when the biggest tides happen.',
  question: 'How does the Moon\'s gravity cause tides?',
  takeaway: 'The Moon\'s gravity pulls on Earth\'s oceans, making two bulges of water: one facing the Moon and one on the opposite side. As Earth rotates through both bulges, a beach gets two high tides and two low tides each day. When the Sun and Moon line up, tides are extra big (spring tides).',
  vocab: [['Tide', 'The regular rise and fall of sea level.'], ['High tide / low tide', 'The highest / lowest water level.'], ['Spring tide', 'Extra-big tides when the Sun, Earth, and Moon line up.'], ['Neap tide', 'Smaller tides when the Sun and Moon are at a right angle.']],
  warmup: { style: 'Notice & wonder', prompt: 'Imagine a day at the beach.', items: [['Your sandcastle was dry at 9 AM but underwater at 3 PM. What happened?', 'The tide came in.'], ['Does a lake in Indiana have noticeable tides?', 'No: tides are only big in oceans.'], ['What do you wonder about the Moon and the ocean?', 'Any real question.']] },
  steps: [
    { tag: 'explore', title: 'Ocean bulges', goal: { text: 'Drag the Moon to a new spot and watch the ocean.', check: { movedMoon: true } }, q: { type: 'mc', q: 'Where are the ocean bulges?', choices: ['One facing the Moon and one on the opposite side', 'Only facing the Sun', 'All around Earth evenly'], answer: 0 } },
    { tag: 'test', title: 'Spin for a day', sheet: 1, goal: { text: 'Spin Earth one full day (Sun\'s pull off).', check: { dayDone: true, sunDay: false } }, q: { type: 'num', q: 'How many high tides did the beach town get in one day?', unit: 'high tides', answer: 2 } },
    { tag: 'reason', title: 'Why twice?', sheet: 2, q: { type: 'mc', q: 'Why are there TWO high tides each day?', choices: ['Earth rotates through both bulges', 'The Moon goes around Earth twice a day', 'The ocean sloshes'], answer: 0 } },
    { tag: 'test', title: 'Add the Sun', sheet: 3, goal: { text: 'Turn on the Sun\'s pull, line up the Moon with the Sun (straight line), and spin a day.', check: function (s) { return s.dayDone && s.sunDay && (s.moonDay === 0 || s.moonDay === 180); } },
      q: { type: 'num', q: 'What was the highest water level?', unit: 'm', answer: function (s) { return s.maxLevel; }, tol: 0.15 } },
    { tag: 'test', title: 'Right angle', sheet: 3, goal: { text: 'Now put the Moon at a right angle to the Sun (top or bottom) and spin a day.', check: function (s) { return s.dayDone && s.sunDay && (s.moonDay === 90 || s.moonDay === 270); } },
      q: { type: 'mc', q: 'Compared to when they lined up, the tides were...', choices: ['smaller (neap tides)', 'bigger (spring tides)', 'the same'], answer: 0 } },
    { tag: 'reason', title: 'Match the phase', sheet: 4, q: { type: 'sort', q: 'Which tides go with which Moon phases?', bins: ['Spring tides (biggest)', 'Neap tides (smallest)'], items: [['New moon', 0], ['Full moon', 0], ['First quarter', 1], ['Third quarter', 1]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: tide timing', sheet: 5, q: { type: 'num', q: 'High tide was at 6:00 AM. About when is the next high tide? (Type the PM hour.)', unit: 'PM', answer: 6, tol: 0.5, why: 'Bulges are half a day apart, so about 12 hours later (actually 12 h 25 min, because the Moon moves too).' } },
    { tag: 'write', title: 'Harbor report (CER)', sheet: 6, q: { type: 'write', q: 'How does the Moon cause tides?', parts: [
      { label: 'Claim', starter: 'The Moon causes tides because', min: 6, need: [{ words: ['gravity', 'pull'], label: 'Names gravity' }] },
      { label: 'Evidence', starter: 'In one day, the town had', min: 12, number: true, need: [{ words: ['high tide', 'high'], label: 'Uses the high tide count' }, { words: ['spring', 'neap', 'line', 'sun'], label: 'Uses the Sun comparison' }] },
      { label: 'Reasoning', starter: 'As Earth rotates,', min: 10, need: [{ words: ['bulge'], label: 'Explains the bulges' }] }] } }
  ]
});
