/* Grade 6 Science rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 6.PS Particles & States of Matter ---------- */
{
  id: 'g6-sci-deep-freeze', std: 'g6-sci-particles', format: 'escape',
  title: 'Particle Panic at Polar Station',
  tagline: 'The Arctic research station\'s heaters failed. Use the particle model to restart the systems.',
  story: '<p>You are a junior scientist at <b>Polar Station Aurora</b> in the Arctic. A blizzard knocked out the main heater, and the station computer locked every control panel. To restart the systems, you must prove you understand how particles behave as energy is added or removed.</p><p>Outside temperature: <b>−40 °C</b>. Better hurry.</p>',
  code: 'PHASE',
  stages: [
    { title: 'Panel 1: Particles Everywhere', content: '<p>The computer screen displays the <b>particle model of matter</b>:</p><ul><li>All matter is made of tiny particles (atoms and molecules).</li><li>Particles are <b>always moving</b>, even in solids.</li><li>There is empty space between particles.</li><li>Particles attract each other. The stronger the attraction compared to their motion, the more tightly they stay together.</li></ul>',
      puzzles: [
        { type: 'tf', q: 'True or false: Particles in a solid are completely still.', answer: false, explain: 'Particles in a solid vibrate in place. They never stop moving completely.' },
        { type: 'mc', q: 'What is between the particles of a gas?', choices: ['Mostly empty space', 'Air', 'Water', 'Nothing, they are touching'], answer: 0 },
        { type: 'mc', q: 'Which statement fits the particle model?', choices: ['All matter is made of particles that are always moving', 'Only liquids are made of particles', 'Particles grow bigger when heated', 'Particles only move in gases'], answer: 0 }
      ] },
    { title: 'Panel 2: Solid, Liquid, Gas', content: '<p>The second panel asks you to program the station\'s particle simulator.</p><div class="tablewrap"><table><tr><th>State</th><th>Particle arrangement</th><th>Particle motion</th><th>Shape & volume</th></tr><tr><td>Solid</td><td>Tightly packed in a fixed pattern</td><td>Vibrate in place</td><td>Definite shape and volume</td></tr><tr><td>Liquid</td><td>Close together, no fixed pattern</td><td>Slide past each other</td><td>Definite volume, takes container\'s shape</td></tr><tr><td>Gas</td><td>Far apart</td><td>Move fast in all directions</td><td>Fills its container</td></tr></table></div>',
      puzzles: [
        { type: 'sort', q: 'Sort each description to its state of matter.', buckets: ['Solid', 'Liquid', 'Gas'], items: [['Particles vibrate in fixed positions', 0], ['Keeps its own shape', 0], ['Particles slide past one another', 1], ['Takes the shape of its container but keeps its volume', 1], ['Particles are far apart and move fast', 2], ['Spreads out to fill any container', 2]] },
        { type: 'mc', q: 'Why can a gas be compressed (squeezed) into a smaller space, but a solid cannot?', choices: ['Gas particles have lots of space between them', 'Gas particles are smaller', 'Solids have no particles', 'Gas has no mass'], answer: 0 }
      ] },
    { title: 'Panel 3: Adding Energy', content: '<p>The backup heater is ready. When thermal energy is <b>added</b>, particles move faster and <b>temperature rises</b>. When particles gain enough energy to overcome their attractions, the substance <b>changes state</b>.</p><ul><li>Solid → liquid: <b>melting</b></li><li>Liquid → gas: <b>evaporation</b> (at the surface) or <b>boiling</b> (throughout)</li><li>Solid → gas: <b>sublimation</b> (like dry ice)</li></ul>',
      puzzles: [
        { type: 'mc', q: 'What happens to water particles as ice is heated?', choices: ['They move faster', 'They move slower', 'They get bigger', 'They disappear'], answer: 0 },
        { type: 'mc', q: 'Snow in the Arctic can turn directly into water vapor without melting. What is this called?', choices: ['Sublimation', 'Condensation', 'Freezing', 'Deposition'], answer: 0 },
        { type: 'mc', q: 'What is the difference between temperature and thermal energy?', choices: ['Temperature measures average particle motion; thermal energy is the total energy of all the particles', 'They are exactly the same', 'Temperature is only for gases', 'Thermal energy is measured with a ruler'], answer: 0 }
      ] },
    { title: 'Panel 4: Removing Energy', content: '<p>Outside, the blizzard is removing energy from everything. When thermal energy is <b>removed</b>, particles slow down, temperature drops, and attractions pull particles closer together.</p><ul><li>Gas → liquid: <b>condensation</b> (frost on your goggles starts as water vapor from your breath)</li><li>Liquid → solid: <b>freezing</b></li><li>Gas → solid: <b>deposition</b> (frost forming directly on a cold window)</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Is energy added or removed during each change?', buckets: ['Energy added', 'Energy removed'], items: [['Melting', 0], ['Boiling', 0], ['Sublimation', 0], ['Condensation', 1], ['Freezing', 1], ['Deposition', 1]] },
        { type: 'mc', q: 'Your breath forms a cloud of tiny droplets in the cold air. Which change of state is this?', choices: ['Condensation', 'Evaporation', 'Melting', 'Sublimation'], answer: 0 }
      ] },
    { title: 'Panel 5: The Heating Curve', content: '<p>The final panel shows a <b>heating curve</b> for water, from −20 °C ice to 120 °C steam:</p><ol><li>Ice warms from −20 °C to 0 °C.</li><li>At 0 °C, the temperature stays flat while the ice melts.</li><li>Liquid water warms from 0 °C to 100 °C.</li><li>At 100 °C, the temperature stays flat while the water boils.</li><li>Steam warms above 100 °C.</li></ol><p>During the flat parts, the added energy goes into breaking particles apart, not into speeding them up.</p>',
      puzzles: [
        { type: 'order', q: 'Put the stages of the heating curve in order.', items: ['Ice warms up', 'Ice melts at 0 °C', 'Water warms up', 'Water boils at 100 °C', 'Steam warms up'] },
        { type: 'mc', q: 'Why does the temperature stay the same while ice is melting?', choices: ['The energy is being used to break the particles out of their fixed positions', 'The heater turned off', 'Ice cannot absorb energy', 'The particles stop moving'], answer: 0 },
        { type: 'input', q: 'At what temperature (in °C) does pure water boil at sea level?', answer: ['100'], unit: '°C' }
      ] }
  ],
  finale: '<p>The main heater roars back to life, and warm air fills Polar Station Aurora. The station commander radios: "Great work. You understood the particles better than the computer did." Outside, frost sparkles on the windows, deposited straight from the air.</p>',
  exit: [
    { q: 'In which state of matter do particles vibrate in fixed positions?', choices: ['Solid', 'Liquid', 'Gas', 'All of them'], answer: 0 },
    { q: 'What happens to particles when a liquid freezes?', choices: ['They gain energy and speed up', 'They lose energy, slow down, and lock into place', 'They get smaller', 'They turn into a gas'], answer: 1 },
    { q: 'Use the particle model to explain why a puddle disappears on a sunny day.', answer: 'Sunlight adds thermal energy, so water particles speed up. Some gain enough energy to escape the surface and become water vapor (evaporation).', lines: 4 }
  ]
},
{
  id: 'g6-sci-vapor-quest', std: 'g6-sci-particles', format: 'quest',
  title: 'The Water Molecule\'s Quest',
  tagline: 'Play as a single water molecule traveling through every state of matter.',
  story: '<p>You are <b>H₂O-7</b>, a single water molecule frozen in an icicle on the Indiana Statehouse roof. Your quest: travel through every state of matter and make it to a cloud. At each level, you must understand what is happening to you and your neighbor molecules.</p>',
  code: 'VAPOR',
  stages: [
    { title: 'Level 1: Locked in Ice', content: '<p>You are stuck in a crystal pattern with your neighbors. You can only <b>vibrate</b> in place. The strong attractions between molecules hold you in position.</p><p>Ice has a definite shape and volume. Interestingly, water molecules in ice are arranged in an open pattern with more space than liquid water, which is why ice floats!</p>',
      puzzles: [
        { type: 'mc', q: 'How do water molecules move in ice?', choices: ['They vibrate in fixed positions', 'They slide past each other', 'They fly apart', 'They do not move at all'], answer: 0 },
        { type: 'mc', q: 'Why does ice float on water?', choices: ['Its molecules are arranged in an open pattern, making it less dense', 'Ice has no mass', 'Ice is a gas', 'Ice molecules are bigger'], answer: 0 }
      ] },
    { title: 'Level 2: The Thaw', content: '<p>The sun comes out and adds <b>thermal energy</b>. You vibrate faster and faster. At <b>0 °C</b>, you break free from the crystal pattern and start sliding past your neighbors. You are now a <b>liquid</b>, dripping off the icicle!</p><p>As a liquid, you and your neighbors are still close together and still attract each other, but you can flow.</p>',
      puzzles: [
        { type: 'mc', q: 'What is this change of state called?', choices: ['Melting', 'Freezing', 'Condensation', 'Evaporation'], answer: 0 },
        { type: 'mc', q: 'Which property does liquid water have?', choices: ['Definite volume, but takes the shape of its container', 'Definite shape', 'Fills any container completely', 'No volume'], answer: 0 },
        { type: 'mc', q: 'What caused you to change state?', choices: ['Thermal energy from the sun was added', 'Energy was removed', 'Your mass changed', 'You became a different substance'], answer: 0 }
      ] },
    { title: 'Level 3: The Puddle', content: '<p>You land in a puddle on the sidewalk. Molecules in the puddle are moving at different speeds. The <b>fastest</b> molecules at the surface can escape into the air as <b>water vapor</b>. This is <b>evaporation</b>, and it can happen at any temperature.</p><p><b>Boiling</b> is different: it happens throughout the liquid, at the boiling point (100 °C at sea level), and forms bubbles of vapor.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each statement.', buckets: ['Evaporation', 'Boiling'], items: [['Happens only at the surface', 0], ['Can happen at room temperature', 0], ['Happens throughout the liquid', 1], ['Forms bubbles of vapor', 1], ['Happens at 100 °C for water at sea level', 1]] },
        { type: 'mc', q: 'Which puddle will evaporate fastest?', choices: ['A shallow puddle on a hot, sunny, windy day', 'A deep puddle on a cold, cloudy day', 'A puddle in a shady, still spot', 'A frozen puddle'], answer: 0 }
      ] },
    { title: 'Level 4: Floating Free', content: '<p>You escaped! As water vapor, you are a <b>gas</b>. You zoom around, far from other molecules, bouncing off air particles. You rise higher and higher into the sky.</p><p>Gas particles move fastest and have the most space between them. A gas has no definite shape or volume. In a sealed container, gas particles hit the walls, creating <b>pressure</b>. Heating the gas makes the particles hit harder and more often, raising the pressure.</p>',
      puzzles: [
        { type: 'mc', q: 'Why does a sealed bag of chips puff up when taken up a mountain?', choices: ['Lower air pressure outside lets the gas inside spread out', 'The chips grow', 'Gas particles get bigger', 'The bag melts'], answer: 0 },
        { type: 'mc', q: 'A balloon is placed in a freezer. What happens?', choices: ['It shrinks because the gas particles slow down', 'It grows because particles speed up', 'It pops immediately', 'Nothing changes'], answer: 0 },
        { type: 'tf', q: 'True or false: When a gas is heated, the particles themselves get bigger.', answer: false, explain: 'The particles stay the same size. They move faster and spread farther apart.' }
      ] },
    { title: 'Level 5: Into the Cloud', content: '<p>High in the sky, the air is cold. You lose energy and slow down. Attractions pull you together with other water molecules around a tiny dust speck. You <b>condense</b> into a droplet, and billions of droplets form a <b>cloud</b>. Quest nearly complete!</p>',
      puzzles: [
        { type: 'order', q: 'Put H₂O-7\'s journey in order.', items: ['Solid in an icicle', 'Melts into liquid water', 'Lands in a puddle', 'Evaporates into water vapor', 'Condenses into a cloud droplet'] },
        { type: 'mc', q: 'During the whole journey, what stayed the same about H₂O-7?', choices: ['It was always a water molecule, the same substance', 'Its speed', 'Its state of matter', 'Its location'], answer: 0, explain: 'Changes of state are physical changes. The molecule is still H₂O the whole time.' }
      ] }
  ],
  finale: '<p>You drift in a fluffy cloud over Indianapolis. Soon you will fall as rain or snow and start the journey all over again. Quest complete! You have been a solid, a liquid, and a gas, and you were water the whole time.</p>',
  exit: [
    { q: 'Which change of state happens when water vapor turns into liquid droplets?', choices: ['Evaporation', 'Condensation', 'Melting', 'Sublimation'], answer: 1 },
    { q: 'What happens to the motion of particles when a substance is heated?', choices: ['Particles slow down', 'Particles speed up', 'Particles stop', 'Particles shrink'], answer: 1 },
    { q: 'Draw or describe the particles of water as a solid, a liquid, and a gas. How are they different?', answer: 'Solid: tightly packed, vibrating in fixed places. Liquid: close together but sliding past each other. Gas: far apart, moving quickly in all directions.', lines: 4 }
  ]
},
{
  id: 'g6-sci-molecule-museum', std: 'g6-sci-particles', format: 'gallery',
  title: 'The Museum of Moving Particles',
  tagline: 'Five exhibits prove that matter is made of particles that never stop moving.',
  story: '<p>Welcome to the <b>Museum of Moving Particles</b>. Scientists can\'t see individual particles with their eyes, so how do they know particles exist? Each exhibit shows a piece of evidence. Visit them in any order.</p>',
  code: 'SOLID',
  stages: [
    { title: 'Exhibit: The Food Coloring Race', content: '<h3>Placard</h3><p>A drop of food coloring was placed in two beakers at the same time. One held <b>hot water</b> (80 °C) and the other held <b>cold water</b> (5 °C). Within one minute, the color spread through the hot water. In the cold water, it took more than ten minutes.</p><p>This spreading is called <b>diffusion</b>: particles moving from where they are crowded to where they are less crowded.</p>',
      puzzles: [
        { type: 'mc', q: 'Why did the color spread faster in hot water?', choices: ['Particles in hot water move faster', 'Hot water has more color', 'Cold water has no particles', 'The drop was bigger in the hot water'], answer: 0 },
        { type: 'mc', q: 'What does this experiment show about particles?', choices: ['They are always moving, and move faster at higher temperatures', 'They stop moving in cold water', 'Food coloring is not made of particles', 'Particles only exist in hot water'], answer: 0 }
      ] },
    { title: 'Exhibit: The Perfume Puzzle', content: '<h3>Placard</h3><p>A museum worker opened a bottle of perfume at one end of the room. A few minutes later, visitors on the far side could smell it, even though no fan was on.</p><p>The perfume\'s liquid particles evaporated into a gas and spread out through the air by <b>diffusion</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'How did the smell reach the other side of the room?', choices: ['Gas particles of perfume spread out by moving randomly through the air', 'The smell traveled by light', 'Someone carried it', 'The perfume particles grew larger'], answer: 0 },
        { type: 'mc', q: 'Would the smell spread faster in a warm room or a cold room?', choices: ['Warm room', 'Cold room', 'Same speed', 'It would not spread in either'], answer: 0 }
      ] },
    { title: 'Exhibit: The Mixing Mystery', content: '<h3>Placard</h3><p>Scientists mixed <b>50 mL of water</b> with <b>50 mL of rubbing alcohol</b>. You might expect 100 mL. But the measuring cylinder showed only about <b>96 mL</b>!</p><p>A model helps explain it: imagine mixing a bucket of marbles with a bucket of sand. The sand fills the spaces between the marbles.</p>',
      puzzles: [
        { type: 'mc', q: 'Why is the total volume less than 100 mL?', choices: ['Some particles fit into the empty spaces between other particles', 'Some liquid disappeared', 'The cylinder is broken', 'Alcohol has no volume'], answer: 0 },
        { type: 'mc', q: 'What does this exhibit show about particles?', choices: ['There is space between particles', 'Particles are all the same size', 'Particles do not move', 'Liquids are not made of particles'], answer: 0 },
        { type: 'tf', q: 'True or false: The total MASS also decreased when the liquids were mixed.', answer: false, explain: 'Mass is conserved. The particles are all still there; they are just packed more closely.' }
      ] },
    { title: 'Exhibit: The Expanding Bridge', content: '<h3>Placard</h3><p>A model of an Indiana highway bridge shows gaps called <b>expansion joints</b>. On hot summer days, the steel and concrete <b>expand</b> (get slightly longer). In winter, they <b>contract</b> (shrink). Without the gaps, the bridge could crack or buckle.</p><p>When heated, particles move faster and push slightly farther apart. The particles themselves don\'t get bigger.</p>',
      puzzles: [
        { type: 'mc', q: 'Why do bridges expand on hot days?', choices: ['Particles move faster and spread slightly farther apart', 'The particles get bigger', 'New particles are added', 'The bridge melts'], answer: 0 },
        { type: 'mc', q: 'A jar lid is stuck. Why might running it under hot water help?', choices: ['The metal lid expands a little, loosening it', 'Hot water is slippery', 'The glass shrinks away completely', 'Heat makes the lid lighter'], answer: 0 }
      ] },
    { title: 'Exhibit: Build a Model', content: '<h3>Placard</h3><p>Scientists use <b>models</b> to explain things too small to see. A good particle model shows: the particles, the space between them, their arrangement, and their motion. Arrows can show how fast particles move.</p>',
      puzzles: [
        { type: 'match', q: 'Match each exhibit to what it proves about particles.', pairs: [['Food coloring race', 'Particles move faster when warmer'], ['Mixing water and alcohol', 'There is space between particles'], ['Expanding bridge', 'Heated particles spread farther apart'], ['Perfume across the room', 'Gas particles spread out by diffusion']] },
        { type: 'sort', q: 'Which details should a particle model of a liquid include?', buckets: ['Include', 'Do not include'], items: [['Particles close together', 0], ['Particles able to slide past each other', 0], ['Motion arrows', 0], ['Particles drawn in a perfect grid, not moving', 1], ['Particles drawn larger when hot', 1]] }
      ] }
  ],
  finale: '<p>At the museum exit, you look back at the exhibits. None of them showed a single particle, yet together they proved particles are real, always moving, and have space between them. That\'s how scientists use evidence!</p>',
  exit: [
    { q: 'Why does food coloring spread faster in hot water than in cold water?', choices: ['Hot water particles move faster', 'Cold water has no particles', 'Hot water is heavier', 'Food coloring melts'], answer: 0 },
    { q: 'What happens to particles when a metal is heated?', choices: ['They get bigger', 'They move faster and spread slightly apart', 'They stop moving', 'They turn into a gas immediately'], answer: 1 },
    { q: 'Describe one piece of evidence that matter is made of moving particles.', answer: 'Example: Perfume can be smelled across a room because its gas particles move and spread through the air by diffusion.', lines: 3 }
  ]
},

/* ---------- 6.PS Energy ---------- */
{
  id: 'g6-sci-coaster-lockdown', std: 'g6-sci-energy', format: 'escape',
  title: 'Roller Coaster Lockdown',
  tagline: 'The Thunder Hollow coaster is stuck. Use kinetic and potential energy to restart the ride.',
  story: '<p>You\'re at Thunder Hollow Amusement Park in southern Indiana when the wooden roller coaster, <b>The Timber Twister</b>, stops at the top of its first hill. The park engineer needs help: the ride\'s control computer will only restart for someone who understands how energy moves through a coaster.</p>',
  code: 'JOULE',
  stages: [
    { title: 'Lock 1: Stored or Moving?', content: '<p>The engineer explains two main kinds of energy:</p><ul><li><b>Kinetic energy (KE)</b>: the energy of motion. Anything moving has it.</li><li><b>Potential energy (PE)</b>: stored energy. Gravitational PE depends on an object\'s <b>height</b> and <b>mass</b>. Elastic PE is stored in stretched or squished objects. Chemical PE is stored in food, fuel, and batteries.</li></ul><p>Energy is measured in <b>joules (J)</b>.</p>',
      puzzles: [
        { type: 'sort', q: 'Does each object mainly have kinetic or potential energy?', buckets: ['Mostly kinetic', 'Mostly potential'], items: [['A coaster car stopped at the top of a hill', 1], ['A stretched rubber band', 1], ['A battery on a shelf', 1], ['A rolling bowling ball', 0], ['A falling apple', 0], ['A running cheetah', 0]] },
        { type: 'mc', q: 'What unit is energy measured in?', choices: ['Joules', 'Meters', 'Grams', 'Degrees'], answer: 0 }
      ] },
    { title: 'Lock 2: Height and Mass', content: '<p>The coaster computer compares cars on different hills:</p><div class="tablewrap"><table><tr><th>Car</th><th>Mass</th><th>Height</th></tr><tr><td>A</td><td>500 kg</td><td>20 m</td></tr><tr><td>B</td><td>500 kg</td><td>40 m</td></tr><tr><td>C</td><td>1,000 kg</td><td>40 m</td></tr></table></div><p>Gravitational potential energy increases with <b>more height</b> and <b>more mass</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Which car has the MOST gravitational potential energy?', choices: ['Car C', 'Car A', 'Car B', 'They are all equal'], answer: 0 },
        { type: 'mc', q: 'Car B is twice as high as Car A (same mass). How does its potential energy compare?', choices: ['About twice as much', 'Half as much', 'The same', 'Four times as much'], answer: 0 }
      ] },
    { title: 'Lock 3: Speed and Mass', content: '<p>Kinetic energy depends on <b>mass</b> and <b>speed</b>. Speed matters most: if you <b>double the speed</b>, kinetic energy becomes <b>four times</b> as large. If you double the mass, KE doubles.</p><p>A loaded coaster train (full of riders) has more mass than an empty one.</p>',
      puzzles: [
        { type: 'mc', q: 'Which has more kinetic energy?', choices: ['A full train moving at 20 m/s', 'An empty train moving at 20 m/s', 'A full train that is stopped', 'They are all equal'], answer: 0 },
        { type: 'mc', q: 'A car doubles its speed. What happens to its kinetic energy?', choices: ['It becomes 4 times as large', 'It doubles', 'It stays the same', 'It is cut in half'], answer: 0 },
        { type: 'mc', q: 'A bowling ball and a tennis ball roll at the same speed. Which has more kinetic energy?', choices: ['The bowling ball, because it has more mass', 'The tennis ball', 'They have the same', 'Neither has kinetic energy'], answer: 0 }
      ] },
    { title: 'Lock 4: The Energy Track', content: '<p>The ride map shows five points on the track:</p><ol><li><b>Top of the first hill</b> (car is momentarily stopped)</li><li><b>Halfway down</b></li><li><b>Bottom of the hill</b></li><li><b>Top of a smaller second hill</b></li><li><b>Brake run at the end</b></li></ol><p>As the car goes down, <b>PE changes into KE</b>. As it goes up, <b>KE changes back into PE</b>. The total energy stays the same, except some changes into <b>thermal energy</b> and <b>sound</b> because of friction and air resistance.</p>',
      puzzles: [
        { type: 'match', q: 'Match each point on the track to its energy.', pairs: [['Top of the first hill', 'Most potential energy'], ['Bottom of the hill', 'Most kinetic energy'], ['Halfway down', 'About half PE and half KE']] },
        { type: 'mc', q: 'Why is the second hill always shorter than the first?', choices: ['Some energy changes to thermal energy and sound from friction, so there is less to climb with', 'Energy is destroyed', 'The car gains mass', 'Gravity gets stronger'], answer: 0 },
        { type: 'mc', q: 'Where does the kinetic energy go when the brakes stop the car?', choices: ['It transforms into thermal energy (heat) in the brakes', 'It disappears', 'It becomes more mass', 'It turns into potential energy'], answer: 0 }
      ] },
    { title: 'Lock 5: Conservation of Energy', content: '<p>The final lock displays the <b>Law of Conservation of Energy</b>: <b>Energy cannot be created or destroyed. It can only change form or be transferred.</b></p><p>The Timber Twister starts with <b>600,000 J</b> of potential energy at the top of the first hill.</p>',
      puzzles: [
        { type: 'input', q: 'Halfway down, the car has 300,000 J of kinetic energy. Ignoring friction, how much potential energy does it have?', answer: ['300000', '300,000'], unit: 'J', hint: 'Total energy stays 600,000 J.' },
        { type: 'input', q: 'At the bottom, 20,000 J have changed into heat and sound. How much kinetic energy does the car have?', answer: ['580000', '580,000'], unit: 'J', hint: '600,000 − 20,000' },
        { type: 'order', q: 'Put the energy transformations of a coaster ride in order.', items: ['A motor lifts the car (electrical → potential)', 'Car at the top has maximum PE', 'Car speeds down (PE → KE)', 'Brakes stop the car (KE → thermal energy)'] }
      ] }
  ],
  finale: '<p>The motor hums, the chain clanks, and The Timber Twister roars back to life. As the riders scream down the first hill, you watch potential energy turn into kinetic energy right before your eyes. The engineer gives you a lifetime front-row pass!</p>',
  exit: [
    { q: 'Where does a roller coaster car have the most kinetic energy?', choices: ['At the top of the first hill', 'At the bottom of the first hill', 'Stopped at the station', 'Halfway up the second hill'], answer: 1 },
    { q: 'Which change would give a car the MOST gravitational potential energy?', choices: ['Lower hill, less mass', 'Higher hill, more mass', 'Lower hill, more mass', 'Higher hill, less mass'], answer: 1 },
    { q: 'A ball is dropped from a tall building. Describe the energy changes from the moment it is dropped until it hits the ground.', answer: 'At the top it has maximum potential energy. As it falls, PE changes into kinetic energy and it speeds up. When it hits the ground, KE changes into sound and thermal energy.', lines: 4 }
  ]
},
{
  id: 'g6-sci-cold-cocoa', std: 'g6-sci-energy', format: 'mystery',
  title: 'The Case of the Cold Cocoa',
  tagline: 'Every mug of hot cocoa at the ski lodge goes cold too fast. Trace the heat to solve it.',
  story: '<p>At Perfect North Slopes, the lodge manager has a problem. Hot cocoa is going cold in minutes, and customers are complaining. She hires you, a thermal energy detective, to follow the heat and find out where it\'s going.</p><p>Remember: heat is thermal energy that always moves from <b>warmer</b> objects to <b>cooler</b> ones.</p>',
  code: 'WARMS',
  stages: [
    { title: 'Evidence File #1: The Metal Mugs', content: '<p><b>Witness:</b> "The lodge switched from ceramic mugs to new metal mugs last week. Customers say the mugs are too hot to hold at first, then the cocoa gets cold fast."</p><p><b>Detective note:</b> <b>Conduction</b> is heat transfer by direct contact. Particles bump into their neighbors and pass energy along. Metals are good <b>conductors</b>. Materials like ceramic, plastic, foam, and wood are <b>insulators</b>: they slow heat transfer.</p>',
      puzzles: [
        { type: 'mc', q: 'Why do the metal mugs feel so hot to hold?', choices: ['Metal conducts heat quickly from the cocoa to your hand', 'Metal makes its own heat', 'The cocoa is hotter in metal', 'Your hand is cold'], answer: 0 },
        { type: 'sort', q: 'Sort each material.', buckets: ['Good conductor', 'Good insulator'], items: [['Copper', 0], ['Aluminum', 0], ['Steel spoon', 0], ['Foam cup', 1], ['Wooden handle', 1], ['Wool mitten', 1]] }
      ] },
    { title: 'Evidence File #2: The Steam', content: '<p><b>Observation:</b> Steam rises from each open mug. Near the ceiling, the air is warm, while near the floor it is chilly.</p><p><b>Detective note:</b> <b>Convection</b> is heat transfer by the movement of a <b>fluid</b> (liquid or gas). Warm fluid is less dense, so it rises. Cooler fluid sinks to take its place, creating a <b>convection current</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Why does the warm air collect near the ceiling?', choices: ['Warm air is less dense, so it rises', 'Warm air is heavier', 'The ceiling makes heat', 'Cold air rises'], answer: 0 },
        { type: 'mc', q: 'How could the lodge slow down convection from the top of the cocoa?', choices: ['Put a lid on the mug', 'Stir the cocoa', 'Use a bigger mug', 'Open the windows'], answer: 0 },
        { type: 'mc', q: 'Which is an example of convection?', choices: ['A pot of soup circulating as it heats on the stove', 'A hot pan burning your hand', 'Sunlight warming your face', 'An ice cube melting in your hand'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Fireplace', content: '<p><b>Observation:</b> Customers sitting near the big fireplace stay warm, even though they don\'t touch the fire and the air between them isn\'t moving much. Their faces feel warm, but their backs stay cool.</p><p><b>Detective note:</b> <b>Radiation</b> is heat transfer by <b>electromagnetic waves</b> (like infrared light). It doesn\'t need particles, so it can even travel through empty space. That\'s how the Sun heats Earth.</p>',
      puzzles: [
        { type: 'mc', q: 'How does the fireplace warm customers\' faces?', choices: ['Radiation', 'Conduction', 'Convection', 'Evaporation'], answer: 0 },
        { type: 'mc', q: 'Why can\'t conduction or convection bring the Sun\'s heat to Earth?', choices: ['Space is almost empty, with too few particles to carry heat', 'The Sun is too cold', 'Earth blocks conduction', 'Convection only works at night'], answer: 0 }
      ] },
    { title: 'Evidence File #4: The Window Table', content: '<p><b>Observation:</b> Cocoa goes cold fastest at the tables by the big windows. Cold air leaks in around the frames, and the glass is icy.</p><p>The detective places thermometers in three mugs of cocoa, each starting at <b>70 °C</b>. After 10 minutes:</p><div class="tablewrap"><table><tr><th>Mug</th><th>Location</th><th>Temperature</th></tr><tr><td>Metal, no lid</td><td>By window</td><td>38 °C</td></tr><tr><td>Metal, no lid</td><td>By fireplace</td><td>49 °C</td></tr><tr><td>Ceramic, with lid</td><td>By window</td><td>58 °C</td></tr></table></div>',
      puzzles: [
        { type: 'input', q: 'How many degrees did the metal mug by the window cool in 10 minutes?', answer: ['32'], unit: '°C' },
        { type: 'mc', q: 'Why did the metal mug by the window cool faster than the one by the fireplace?', choices: ['The cold air around it is a bigger temperature difference, so heat leaves faster', 'The window adds cold particles', 'The fireplace cocoa had more sugar', 'Cold flows into the cocoa'], answer: 0 },
        { type: 'mc', q: 'What does the ceramic mug with a lid show?', choices: ['Insulating material and a lid slow heat loss', 'Lids make cocoa hotter', 'Ceramic creates heat', 'Location doesn\'t matter'], answer: 0 }
      ] },
    { title: 'Evidence File #5: The Solution', content: '<p>Time to write your report. Match each problem with the type of heat transfer causing it, then recommend a fix.</p>',
      puzzles: [
        { type: 'match', q: 'Match each problem to its type of heat transfer.', pairs: [['Heat moving from cocoa through the metal mug to hands', 'Conduction'], ['Warm air and steam rising off the open mug', 'Convection'], ['Customers warmed by the fireplace from across the room', 'Radiation']] },
        { type: 'sort', q: 'Which changes would keep the cocoa warm longer?', buckets: ['Keeps cocoa warm', 'Does not help'], items: [['Switch back to ceramic or foam mugs', 0], ['Add lids', 0], ['Seal drafts around the windows', 0], ['Use thinner metal mugs', 1], ['Serve cocoa on the outdoor deck', 1]] }
      ] }
  ],
  finale: '<p>Case closed! The lodge switches back to thick ceramic mugs with lids and seals the drafty windows. The next weekend, customers sip hot cocoa by the windows for a full hour. The manager names a new drink after you: the Thermal Detective Double Chocolate.</p>',
  exit: [
    { q: 'A metal spoon in hot soup gets hot. Which type of heat transfer is this?', choices: ['Radiation', 'Convection', 'Conduction', 'Condensation'], answer: 2 },
    { q: 'In which direction does heat always flow?', choices: ['From cold to hot', 'From hot to cold', 'Up only', 'It doesn\'t move'], answer: 1 },
    { q: 'Explain why a thermos keeps soup hot. Name at least two types of heat transfer it reduces.', answer: 'The insulated walls reduce conduction, the sealed lid reduces convection, and shiny inner surfaces reflect radiation, so heat leaves slowly.', lines: 4 }
  ]
},
{
  id: 'g6-sci-power-trip', std: 'g6-sci-energy', format: 'fieldtrip',
  title: 'Power Up Indiana Field Trip',
  tagline: 'Visit a wind farm, a hydroelectric dam, a solar field, and more to trace energy transformations.',
  story: '<p>Where does the electricity in your classroom come from? Today your class is taking a virtual bus tour of the places that power Indiana. At each stop, follow the energy as it changes from one form to another.</p>',
  code: 'POWER',
  stages: [
    { title: 'Stop 1: The Wind Farm', content: '<p>In Benton County, hundreds of wind turbines stand taller than a 30-story building. Wind is moving air: it has <b>kinetic energy</b>. The wind pushes the blades, which spin a shaft connected to a <b>generator</b>. The generator changes kinetic energy into <b>electrical energy</b>.</p><p>Wind is <b>renewable</b>: it won\'t run out.</p>',
      puzzles: [
        { type: 'mc', q: 'What kind of energy does wind have?', choices: ['Kinetic energy', 'Chemical energy', 'Nuclear energy', 'Elastic energy'], answer: 0 },
        { type: 'mc', q: 'What does a generator do?', choices: ['Changes kinetic energy into electrical energy', 'Stores wind', 'Makes wind', 'Changes electricity into light'], answer: 0 }
      ] },
    { title: 'Stop 2: The Hydroelectric Dam', content: '<p>Next is a hydroelectric dam on a river. The dam holds back water in a tall reservoir. Water held high up has <b>gravitational potential energy</b>. When gates open, the water falls and speeds up (<b>potential → kinetic</b>), spinning turbines connected to generators (<b>kinetic → electrical</b>).</p>',
      puzzles: [
        { type: 'order', q: 'Put the energy transformations in a hydroelectric dam in order.', items: ['Water stored high behind the dam (potential energy)', 'Water falls and speeds up (kinetic energy)', 'Moving water spins a turbine', 'Generator produces electrical energy'] },
        { type: 'mc', q: 'Why is the water stored high behind the dam?', choices: ['Higher water has more potential energy', 'To keep fish safe', 'So it can freeze', 'To make it lighter'], answer: 0 }
      ] },
    { title: 'Stop 3: The Solar Field', content: '<p>Rows of solar panels soak up sunlight near Indianapolis. The Sun produces energy through nuclear fusion and sends it to Earth as <b>radiant energy</b> (light). Solar panels change radiant energy directly into <b>electrical energy</b>.</p><p>Plants do something similar: during photosynthesis, they change radiant energy into <b>chemical energy</b> stored in sugar.</p>',
      puzzles: [
        { type: 'match', q: 'Match each device or process to its energy transformation.', pairs: [['Solar panel', 'Radiant → electrical'], ['Photosynthesis', 'Radiant → chemical'], ['Wind turbine', 'Kinetic → electrical']] },
        { type: 'mc', q: 'What is one downside of solar power?', choices: ['It produces less electricity at night and on cloudy days', 'It pollutes the air', 'It will run out soon', 'It needs coal to work'], answer: 0 }
      ] },
    { title: 'Stop 4: The Power Plant', content: '<p>Many power plants burn <b>fossil fuels</b> like coal or natural gas. These fuels store <b>chemical potential energy</b> from ancient plants and animals. Burning them releases <b>thermal energy</b>, which boils water into steam. The steam spins a turbine (<b>kinetic</b>), and the generator makes <b>electrical energy</b>.</p><p>Fossil fuels are <b>nonrenewable</b>: they take millions of years to form. Burning them releases carbon dioxide.</p>',
      puzzles: [
        { type: 'order', q: 'Put the energy transformations in a coal power plant in order.', items: ['Chemical energy in coal', 'Thermal energy from burning', 'Kinetic energy of steam spinning a turbine', 'Electrical energy from the generator'] },
        { type: 'sort', q: 'Sort each energy source.', buckets: ['Renewable', 'Nonrenewable'], items: [['Wind', 0], ['Solar', 0], ['Hydroelectric', 0], ['Coal', 1], ['Natural gas', 1], ['Oil', 1]] }
      ] },
    { title: 'Stop 5: Back in the Classroom', content: '<p>The electricity arrives at your school through power lines. Every device changes electrical energy into other forms. And in every transformation, some energy becomes <b>thermal energy</b> that isn\'t useful. That\'s why a laptop gets warm.</p><p>Remember the <b>Law of Conservation of Energy</b>: energy is never created or destroyed, only transformed.</p>',
      puzzles: [
        { type: 'match', q: 'Match each classroom device to its main energy transformation.', pairs: [['Light bulb', 'Electrical → light (and heat)'], ['Speaker', 'Electrical → sound'], ['Electric fan', 'Electrical → kinetic'], ['Hot plate', 'Electrical → thermal']] },
        { type: 'mc', q: 'Why does a light bulb get warm?', choices: ['Some electrical energy is transformed into thermal energy', 'Energy is created inside it', 'Light is cold', 'The bulb is broken'], answer: 0 },
        { type: 'mc', q: 'Which statement is true?', choices: ['Energy changes form but the total amount stays the same', 'Power plants create new energy', 'Energy is used up and disappears', 'Only renewable energy follows the law of conservation'], answer: 0 }
      ] }
  ],
  finale: '<p>The bus pulls back into the school parking lot. You flip on the classroom lights and think about the journey: sunlight, wind, falling water, or ancient plants, transformed step by step into the electricity lighting up the room. Trip complete!</p>',
  exit: [
    { q: 'Which energy transformation happens in a solar panel?', choices: ['Chemical → electrical', 'Radiant → electrical', 'Kinetic → chemical', 'Thermal → radiant'], answer: 1 },
    { q: 'Which is a renewable energy source?', choices: ['Coal', 'Natural gas', 'Wind', 'Oil'], answer: 2 },
    { q: 'Trace the energy transformations in a hydroelectric dam, from water behind the dam to electricity.', answer: 'Water behind the dam has potential energy. As it falls, it changes to kinetic energy, spins a turbine, and the generator changes it into electrical energy.', lines: 4 }
  ]
},

/* ---------- 6.ESS Gravity & Earth–Sun–Moon ---------- */
{
  id: 'g6-sci-eclipse-chasers', std: 'g6-sci-space', format: 'fieldtrip',
  title: 'Eclipse Chasers: April 8, 2024',
  tagline: 'Relive the total solar eclipse over Indiana, stop by stop along the path of totality.',
  story: '<p>On <b>April 8, 2024</b>, the Moon\'s shadow raced across Indiana during a <b>total solar eclipse</b>. Cities like Evansville, Bloomington, Indianapolis, and Muncie went dark in the middle of the afternoon. Today you\'ll relive that day as an eclipse chaser, stopping along the path to learn how the Sun, Earth, and Moon line up.</p>',
  code: 'TOTAL',
  stages: [
    { title: 'Stop 1: Why Eclipses Happen', content: '<p>A <b>solar eclipse</b> happens when the Moon passes directly between the Sun and Earth, blocking sunlight. The Moon\'s shadow falls on Earth.</p><p>The Sun is about <b>400 times wider</b> than the Moon, but it is also about <b>400 times farther away</b>. That amazing coincidence makes them look almost the same size in our sky, so the Moon can cover the Sun exactly.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the order of objects during a solar eclipse?', choices: ['Sun – Moon – Earth', 'Sun – Earth – Moon', 'Moon – Sun – Earth', 'Earth – Sun – Moon'], answer: 0 },
        { type: 'mc', q: 'Why can the small Moon cover the huge Sun?', choices: ['The Sun is about 400 times farther away, so they look the same size', 'The Moon is actually bigger', 'The Sun shrinks during an eclipse', 'Clouds help block the Sun'], answer: 0 }
      ] },
    { title: 'Stop 2: Evansville, 2:02 p.m.', content: '<p>Totality begins in southwest Indiana. The Moon\'s shadow has two parts:</p><ul><li><b>Umbra</b>: the dark center. People inside see a <b>total</b> eclipse. The sky goes dark and the Sun\'s glowing outer atmosphere, the <b>corona</b>, appears.</li><li><b>Penumbra</b>: the lighter outer shadow. People there see a <b>partial</b> eclipse.</li></ul><p>The path of totality was only about <b>115 miles wide</b>, but it stretched from Mexico to Canada.</p>',
      puzzles: [
        { type: 'match', q: 'Match each shadow part to what people see.', pairs: [['Umbra', 'Total eclipse'], ['Penumbra', 'Partial eclipse']] },
        { type: 'mc', q: 'What is the corona?', choices: ['The Sun\'s outer atmosphere, visible during totality', 'The Moon\'s shadow', 'A planet', 'A cloud'], answer: 0 },
        { type: 'mc', q: 'Why did Chicago (north of the path) see only a partial eclipse?', choices: ['It was in the penumbra, not the umbra', 'It was nighttime there', 'The Moon was on the other side of Earth', 'Chicago is too far west'], answer: 0 }
      ] },
    { title: 'Stop 3: Indianapolis, 3:06 p.m.', content: '<p>Thousands gather at the Indianapolis Motor Speedway to watch. Totality lasts about <b>3 minutes 46 seconds</b> here. Birds go quiet, streetlights flicker on, and the temperature drops a few degrees.</p><p><b>Why don\'t we see an eclipse every month?</b> The Moon\'s orbit is tilted about <b>5°</b> compared to Earth\'s orbit around the Sun. Most months, the Moon passes a little above or below the Sun from our view.</p>',
      puzzles: [
        { type: 'mc', q: 'A solar eclipse can only happen during which Moon phase?', choices: ['New moon', 'Full moon', 'First quarter', 'Waning gibbous'], answer: 0, hint: 'The Moon must be between the Sun and Earth.' },
        { type: 'mc', q: 'Why don\'t solar eclipses happen at every new moon?', choices: ['The Moon\'s orbit is tilted about 5°, so it usually passes above or below the Sun', 'The Moon is too small', 'Earth stops rotating', 'The Sun moves away'], answer: 0 },
        { type: 'mc', q: 'Why did the temperature drop during totality?', choices: ['Less sunlight (radiant energy) reached the ground', 'The Moon is cold', 'Wind blew from the north', 'Earth moved away from the Sun'], answer: 0 }
      ] },
    { title: 'Stop 4: Lunar Eclipses', content: '<p>On the drive home, your guide explains the other kind of eclipse. A <b>lunar eclipse</b> happens when <b>Earth</b> passes between the Sun and the Moon. Earth\'s shadow falls on the Moon.</p><p>During a total lunar eclipse, the Moon often turns a coppery red, because sunlight bends through Earth\'s atmosphere onto it. A lunar eclipse can only happen at a <b>full moon</b>, and anyone on the night side of Earth can see it.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each fact.', buckets: ['Solar eclipse', 'Lunar eclipse'], items: [['Moon is between Sun and Earth', 0], ['Happens at new moon', 0], ['Only seen along a narrow path', 0], ['Earth is between Sun and Moon', 1], ['Happens at full moon', 1], ['Moon can turn red', 1]] },
        { type: 'mc', q: 'Why is it safe to look at a lunar eclipse without special glasses, but not a solar eclipse?', choices: ['During a lunar eclipse you are looking at the dim Moon, not the Sun', 'Lunar eclipses happen during the day', 'The Moon makes its own light', 'It is never safe'], answer: 0 }
      ] },
    { title: 'Stop 5: The Next Eclipse', content: '<p>Eclipse chasers plan years ahead because astronomers can predict eclipses precisely using the regular motions of the Sun, Earth, and Moon. The next total solar eclipse visible in the continental United States will be on <b>August 23, 2044</b>, crossing Montana and the Dakotas. Indianapolis may have to wait more than a century for its next one!</p>',
      puzzles: [
        { type: 'mc', q: 'How can astronomers predict eclipses decades in advance?', choices: ['The motions of the Sun, Earth, and Moon follow regular, predictable patterns', 'They guess', 'They watch the weather', 'Eclipses happen every year in the same place'], answer: 0 },
        { type: 'input', q: 'In what year will the next total solar eclipse be visible from the continental U.S.?', answer: ['2044'] }
      ] }
  ],
  finale: '<p>You put away your eclipse glasses. On April 8, 2024, Indianapolis saw its first total solar eclipse since the year 1205, all because the Sun, Moon, and Earth lined up perfectly. Trip complete, eclipse chaser!</p>',
  exit: [
    { q: 'During a lunar eclipse, what is between the Sun and the Moon?', choices: ['The Moon', 'Earth', 'Mars', 'Nothing'], answer: 1 },
    { q: 'During which Moon phase can a solar eclipse happen?', choices: ['Full moon', 'New moon', 'First quarter', 'Third quarter'], answer: 1 },
    { q: 'Explain why we don\'t have a solar eclipse every month, even though there is a new moon every month.', answer: 'The Moon\'s orbit is tilted about 5° compared to Earth\'s orbit, so most months the Moon passes slightly above or below the Sun and its shadow misses Earth.', lines: 3 }
  ]
},
{
  id: 'g6-sci-gravity-station', std: 'g6-sci-space', format: 'escape',
  title: 'Gravity Station Escape',
  tagline: 'Stranded on a space station, you must master gravity and orbits to steer home.',
  story: '<p>You are the youngest crew member aboard the <b>Hoosier Orbital Station</b>. A solar flare scrambled the navigation computer, and it has locked the airlock. To steer the return capsule home, you must answer the computer\'s questions about gravity and orbits.</p>',
  code: 'FORCE',
  stages: [
    { title: 'Lock 1: What Is Gravity?', content: '<p>The computer screen reads:</p><blockquote><b>Gravity</b> is a force of attraction between any two objects that have mass. Every object pulls on every other object.</blockquote><p>The strength of gravity depends on two things:</p><ul><li><b>Mass</b>: more mass = stronger pull.</li><li><b>Distance</b>: objects farther apart pull on each other less.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'Which pair has the strongest gravitational pull between them?', choices: ['Earth and the Moon', 'Two pencils on a desk', 'Two marbles', 'A student and a book'], answer: 0 },
        { type: 'mc', q: 'What happens to gravity between two objects as they move farther apart?', choices: ['It gets weaker', 'It gets stronger', 'It stays the same', 'It disappears completely'], answer: 0 },
        { type: 'tf', q: 'True or false: You pull on Earth with gravity, too.', answer: true, explain: 'Gravity is always mutual. Your pull on Earth is tiny because your mass is so small compared to Earth\'s.' }
      ] },
    { title: 'Lock 2: Weightless?', content: '<p>Astronauts on the station float, but there IS gravity here! At the station\'s height (about 400 km up), Earth\'s gravity is still about <b>90%</b> as strong as on the ground.</p><p>Astronauts float because the station and everyone inside are <b>falling around Earth</b> together, moving sideways so fast (about 28,000 km per hour) that they keep missing the ground. This is called <b>free fall</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Why do astronauts float on the space station?', choices: ['They are in free fall, falling around Earth with the station', 'There is no gravity in space', 'The station has anti-gravity machines', 'They are too far from Earth for gravity'], answer: 0 },
        { type: 'input', q: 'About what percent of Earth\'s surface gravity is felt at the height of the space station?', answer: ['90', '90%'], unit: '%' }
      ] },
    { title: 'Lock 3: How Orbits Work', content: '<p>An <b>orbit</b> is the curved path of an object around another object. Two things work together to create an orbit:</p><ol><li><b>Forward motion</b> (inertia): the object tries to keep moving in a straight line.</li><li><b>Gravity</b>: pulls the object toward the larger body.</li></ol><p>Together, they bend the path into a curve. If gravity suddenly disappeared, the object would fly off in a straight line. If the object stopped moving forward, gravity would pull it straight in.</p>',
      puzzles: [
        { type: 'mc', q: 'If Earth\'s gravity suddenly disappeared, what would the Moon do?', choices: ['Fly off in a straight line', 'Crash into Earth', 'Stop moving', 'Orbit faster'], answer: 0 },
        { type: 'mc', q: 'What keeps the planets in orbit around the Sun?', choices: ['The Sun\'s gravity combined with the planets\' forward motion', 'Magnetism', 'Wind in space', 'The planets\' own light'], answer: 0 },
        { type: 'mc', q: 'Which planet feels the strongest pull from the Sun\'s gravity for its mass?', choices: ['Mercury, because it is closest', 'Neptune, because it is farthest', 'All feel the same pull', 'Jupiter, because it is closest'], answer: 0 }
      ] },
    { title: 'Lock 4: Mass vs. Weight', content: '<p><b>Mass</b> is the amount of matter in an object. It stays the same everywhere. <b>Weight</b> is the force of gravity pulling on that mass, so it changes depending on where you are.</p><div class="tablewrap"><table><tr><th>Place</th><th>Gravity compared to Earth</th></tr><tr><td>Moon</td><td>about 1/6</td></tr><tr><td>Mars</td><td>about 3/8</td></tr><tr><td>Jupiter</td><td>about 2.5 times</td></tr></table></div><p>An astronaut weighs <b>180 pounds</b> on Earth.</p>',
      puzzles: [
        { type: 'input', q: 'About how much would the astronaut weigh on the Moon?', answer: ['30'], unit: 'pounds', hint: '1/6 of 180' },
        { type: 'mc', q: 'On the Moon, what happens to the astronaut\'s MASS?', choices: ['It stays the same', 'It becomes 1/6 as much', 'It doubles', 'It becomes zero'], answer: 0 },
        { type: 'input', q: 'About how much would the astronaut weigh on Jupiter?', answer: ['450'], unit: 'pounds', hint: '180 × 2.5' }
      ] },
    { title: 'Lock 5: Steering Home', content: '<p>The return capsule is ready. The computer asks you to confirm the forces in the solar system before launch.</p>',
      puzzles: [
        { type: 'match', q: 'Match each motion to what causes it.', pairs: [['The Moon orbiting Earth', 'Earth\'s gravity'], ['Earth orbiting the Sun', 'The Sun\'s gravity'], ['Ocean tides on Earth', 'Mainly the Moon\'s gravity'], ['Jupiter\'s moons orbiting Jupiter', 'Jupiter\'s gravity']] },
        { type: 'mc', q: 'Why does the Sun\'s gravity control the whole solar system?', choices: ['The Sun has more than 99% of the solar system\'s mass', 'The Sun is the brightest', 'The Sun is hot', 'The Sun is in the middle by accident'], answer: 0 }
      ] }
  ],
  finale: '<p>The airlock hisses open and you climb into the capsule. You fire the thrusters to slow down, and Earth\'s gravity gently pulls you home. Splashdown! Mission control cheers: "Welcome back. You understood gravity better than our computer."</p>',
  exit: [
    { q: 'What two factors affect the strength of gravity between objects?', choices: ['Color and shape', 'Mass and distance', 'Speed and temperature', 'Size and brightness'], answer: 1 },
    { q: 'A rock has a mass of 10 kg on Earth. What is its mass on the Moon?', choices: ['About 1.7 kg', '10 kg', '60 kg', '0 kg'], answer: 1 },
    { q: 'Explain how gravity and forward motion work together to keep the Moon in orbit.', answer: 'The Moon moves forward and would travel in a straight line, but Earth\'s gravity pulls it inward. Together they bend its path into a curved orbit around Earth.', lines: 4 }
  ]
},
{
  id: 'g6-sci-tides-quest', std: 'g6-sci-space', format: 'quest',
  title: 'The Tides & Seasons Quest',
  tagline: 'Journey from the Bay of Fundy to the Equator to decode tides, phases, and seasons.',
  story: '<p>You\'ve joined a science expedition to investigate Earth\'s biggest patterns: tides, Moon phases, and seasons. Each level takes you to a new place on Earth and adds one letter to the expedition\'s password.</p>',
  code: 'TIDES',
  stages: [
    { title: 'Level 1: The Bay of Fundy', content: '<p>In Canada\'s Bay of Fundy, the water can rise more than <b>15 meters</b> between low and high tide, the biggest tides in the world.</p><p>Tides are caused mainly by the <b>Moon\'s gravity</b> pulling on Earth\'s oceans. This creates two <b>bulges</b> of water: one on the side facing the Moon and one on the opposite side. As Earth rotates through both bulges, most coasts get <b>two high tides and two low tides</b> about every 24 hours and 50 minutes.</p>',
      puzzles: [
        { type: 'mc', q: 'What mainly causes ocean tides?', choices: ['The Moon\'s gravity', 'Wind', 'Earth\'s tilt', 'Earthquakes'], answer: 0 },
        { type: 'input', q: 'How many high tides do most coasts have in about one day?', answer: ['2', 'two'] },
        { type: 'mc', q: 'Why are there tidal bulges on BOTH sides of Earth?', choices: ['The Moon pulls the near side ocean more strongly and the far side ocean less strongly than Earth\'s center', 'The Sun blocks the Moon', 'The oceans are different sizes', 'There is only one bulge'], answer: 0 }
      ] },
    { title: 'Level 2: Spring and Neap Tides', content: '<p>The <b>Sun\'s gravity</b> affects tides too, but less than the Moon because it is so far away.</p><ul><li><b>Spring tides</b>: extra-high high tides and extra-low low tides. They happen when the Sun, Moon, and Earth are <b>lined up</b> (new moon and full moon).</li><li><b>Neap tides</b>: the smallest difference between high and low tide. They happen when the Sun and Moon are at a <b>right angle</b> (first and third quarter).</li></ul><p class="note">"Spring" here means "to spring up," not the season.</p>',
      puzzles: [
        { type: 'match', q: 'Match each Moon phase to the kind of tide.', pairs: [['Full moon', 'Spring tide'], ['New moon', 'Spring tide (lined up)'], ['First quarter', 'Neap tide']] },
        { type: 'mc', q: 'Why are spring tides so large?', choices: ['The Sun\'s and Moon\'s gravity pull in the same line', 'It is springtime', 'The Moon is closer', 'The Sun is hotter'], answer: 0 }
      ] },
    { title: 'Level 3: Phases from Space', content: '<p>Your expedition ship has a telescope that shows the Moon from space. From space, you can see the Moon is <b>always half lit</b> by the Sun. From Earth, we see different amounts of the lit half during the Moon\'s <b>29.5-day</b> cycle.</p><ul><li><b>Waxing</b>: lit part growing (new → full). The right side is lit, as seen from the Northern Hemisphere.</li><li><b>Waning</b>: lit part shrinking (full → new). The left side is lit.</li></ul>',
      puzzles: [
        { type: 'order', q: 'Put the phases in order, starting after the full moon.', items: ['Full moon', 'Waning gibbous', 'Third quarter', 'Waning crescent', 'New moon'] },
        { type: 'mc', q: 'From Indiana, you see a Moon lit on its right side, less than half. What phase is it?', choices: ['Waxing crescent', 'Waning crescent', 'Waning gibbous', 'Full moon'], answer: 0 },
        { type: 'tf', q: 'True or false: Moon phases are caused by Earth\'s shadow.', answer: false, explain: 'Phases come from our changing view of the Moon\'s sunlit half. Earth\'s shadow on the Moon only happens during a lunar eclipse.' }
      ] },
    { title: 'Level 4: The Equator and the Poles', content: '<p>The expedition travels to the Equator, then to the Arctic Circle in June. Earth\'s axis is tilted <b>23.5°</b>, and it points the same direction in space all year.</p><ul><li>In <b>June</b>, the Northern Hemisphere tilts <b>toward</b> the Sun: direct rays, long days, summer. The Arctic has 24-hour daylight!</li><li>In <b>December</b>, the Northern Hemisphere tilts <b>away</b>: indirect, spread-out rays, short days, winter.</li><li>Near the Equator, sunlight is fairly direct all year, so it stays warm.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'In June, why is it summer in Indiana?', choices: ['The Northern Hemisphere tilts toward the Sun, getting more direct rays and longer days', 'Earth is closest to the Sun in June', 'The Sun gets hotter in June', 'The Moon is farther away'], answer: 0 },
        { type: 'mc', q: 'When it is summer in Indiana, what season is it in Argentina (Southern Hemisphere)?', choices: ['Winter', 'Summer', 'Spring', 'Fall'], answer: 0 },
        { type: 'mc', q: 'Why do direct rays heat the ground more than slanted rays?', choices: ['Direct rays concentrate the same energy on a smaller area', 'Direct rays are closer to the Sun', 'Slanted rays are colder light', 'Direct rays last longer'], answer: 0 }
      ] },
    { title: 'Level 5: The Big Picture', content: '<p>Back at base, the expedition leader asks you to connect all three patterns to the motions and forces that cause them.</p>',
      puzzles: [
        { type: 'sort', q: 'What causes each pattern?', buckets: ['Moon\'s orbit around Earth', 'Earth\'s tilt as it orbits the Sun', 'Moon\'s (and Sun\'s) gravity'], items: [['Moon phases', 0], ['Solar and lunar eclipses', 0], ['Seasons', 1], ['Longer days in summer', 1], ['High and low tides', 2], ['Spring and neap tides', 2]] }
      ] }
  ],
  finale: '<p>The expedition leader stamps your logbook: <b>Pattern Master.</b> "Tides, phases, and seasons all come from the same dance: the Sun, Earth, and Moon moving through space, held together by gravity." Quest complete!</p>',
  exit: [
    { q: 'Spring tides happen during which phases?', choices: ['First and third quarter', 'New and full moon', 'Waxing and waning crescent', 'Only full moon'], answer: 1 },
    { q: 'What causes Earth\'s seasons?', choices: ['Earth\'s distance from the Sun', 'The tilt of Earth\'s axis as it orbits the Sun', 'The Moon\'s gravity', 'Earth\'s rotation'], answer: 1 },
    { q: 'Explain how the Moon\'s gravity causes two high tides each day in most places.', answer: 'The Moon\'s gravity creates two bulges of ocean water, one facing the Moon and one on the opposite side. As Earth rotates, a location passes through both bulges each day.', lines: 4 }
  ]
}
);
