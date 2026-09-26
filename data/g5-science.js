/* Grade 5 Science rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 5.PS Matter ---------- */
{
  id: 'g5-sci-melting-lab', std: 'g5-sci-matter', format: 'escape',
  title: 'The Melting Lab Lockdown',
  tagline: 'Dr. Ortiz\'s lab sealed itself shut. Measure, mix, and melt your way to the exit.',
  story: '<p>You are a summer intern at the Purdue Materials Lab. A power surge triggered the safety lockdown and every cabinet is sealed with a combination lock. Dr. Ortiz left notes about her experiments on each lock.</p><p>To get out, you will have to think like a scientist: measure carefully, and remember that matter never just vanishes.</p>',
  code: 'GRAMS',
  stages: [
    { title: 'The Balance Scale', content: '<p>The first lock is taped to a digital balance. A sticky note reads:</p><blockquote>Mass is how much matter is in something. We measure it in <b>grams (g)</b> using a balance. Volume is how much space something takes up. We measure liquid volume in <b>milliliters (mL)</b>.</blockquote><p>On the balance sits an empty beaker (<b>120 g</b>). Dr. Ortiz pours in water, and the balance now reads <b>245 g</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What is the mass of the water alone, in grams?', answer: ['125'], unit: 'g', hint: 'Total mass minus the mass of the empty beaker.', explain: '245 g − 120 g = 125 g of water.' },
        { type: 'mc', q: 'Which tool measures the <b>volume</b> of a liquid?', choices: ['Graduated cylinder', 'Balance', 'Thermometer', 'Magnet'], answer: 0, hint: 'Volume of a liquid is measured in mL. Which tool has mL lines?' },
        { type: 'sort', q: 'Sort each measurement: is it measuring mass or volume?', buckets: ['Mass', 'Volume'], items: [['350 g', 0], ['2 kg', 0], ['75 mL', 1], ['1 liter', 1], ['40 cm³', 1], ['900 grams', 0]], hint: 'Grams and kilograms measure mass. mL, liters, and cm³ measure volume.' }
      ] },
    { title: 'The Property Cabinet', content: '<p>The second cabinet holds five unlabeled samples. Dr. Ortiz\'s notes describe properties you can observe or test:</p><ul><li><b>Magnetism</b>: Does a magnet attract it?</li><li><b>Conductivity</b>: Does electricity or heat pass through it easily?</li><li><b>Solubility</b>: Does it dissolve in water?</li><li><b>Hardness</b>: Can it scratch other materials or be scratched?</li></ul><p>Test results: Sample A is attracted to a magnet. Sample B dissolves in water. Sample C lights a bulb in a circuit. Sample D floats in water.</p>',
      puzzles: [
        { type: 'match', q: 'Match each sample to the property it showed.', pairs: [['Sample A', 'Magnetism'], ['Sample B', 'Solubility'], ['Sample C', 'Electrical conductivity'], ['Sample D', 'Density (floats)']], hint: 'Reread the test results line by line.' },
        { type: 'mc', q: 'Sample A is most likely made of which material?', choices: ['Iron nail', 'Wooden stick', 'Plastic bead', 'Rubber band'], answer: 0, hint: 'Which material is attracted to a magnet?' },
        { type: 'mc', q: 'Sample B dissolves in water. Which could it be?', choices: ['Sugar', 'Sand', 'Copper wire', 'A marble'], answer: 0 }
      ] },
    { title: 'The Freezer Door', content: '<p>The freezer lock has a digital screen. Dr. Ortiz\'s experiment log says:</p><blockquote>Day 1: Sealed a plastic bottle with <b>500 g</b> of water inside. Placed in freezer.<br>Day 2: The water is now solid ice. The bottle is bulging a little.</blockquote><p>A <b>physical change</b> changes size, shape, or state, but no new substance forms. Melting, freezing, boiling, dissolving, cutting, and crushing are physical changes.</p>',
      puzzles: [
        { type: 'input', q: 'What is the mass of the ice in the sealed bottle on Day 2, in grams?', answer: ['500'], unit: 'g', hint: 'Nothing was added and nothing escaped from the sealed bottle.', explain: 'Freezing is a physical change. The same particles are there, so the mass is still 500 g, even though the volume grew a little.' },
        { type: 'tf', q: 'True or false: The bottle bulged because the ice has more mass than the water did.', answer: false, hint: 'Did anything new get into the sealed bottle?', explain: 'Water expands when it freezes. The volume increased, but the mass stayed the same.' },
        { type: 'sort', q: 'Sort these changes.', buckets: ['Physical change', 'Chemical change'], items: [['Ice melting', 0], ['Tearing paper', 0], ['Salt dissolving in water', 0], ['Wood burning', 1], ['A nail rusting', 1], ['Baking a cake', 1]], hint: 'Chemical changes make a new substance. Clues: gas, light, heat, new color, or a smell.' }
      ] },
    { title: 'The Fizzing Flask', content: '<p>The fourth lock is next to two flasks. Dr. Ortiz did this experiment twice:</p><div class="tablewrap"><table><tr><th></th><th>Flask 1 (open)</th><th>Flask 2 (balloon sealed on top)</th></tr><tr><td>Vinegar + baking soda before</td><td>200 g</td><td>200 g</td></tr><tr><td>After fizzing stops</td><td>194 g</td><td>200 g</td></tr></table></div><p>Fizzing and bubbles are a clue that a <b>gas</b> formed. That is a chemical change.</p>',
      puzzles: [
        { type: 'mc', q: 'Why did the open flask lose 6 grams?', choices: ['A gas formed and escaped into the air', 'The matter was destroyed', 'Vinegar has no mass', 'The balance broke'], answer: 0, hint: 'What happens to bubbles in an open container?' },
        { type: 'mc', q: 'What does Flask 2 prove?', choices: ['In a closed system, mass is conserved', 'Balloons add mass', 'Chemical changes destroy matter', 'Gas has no mass'], answer: 0, explain: 'When the gas was trapped in the balloon, the total mass stayed at 200 g. Matter was rearranged, not destroyed.' },
        { type: 'input', q: 'In a sealed bag, 40 g of baking soda is mixed with 150 g of vinegar. What will the total mass be after the fizzing stops?', answer: ['190'], unit: 'g', hint: 'Sealed bag = closed system. Add the starting masses.' }
      ] },
    { title: 'The Exit Keypad', content: '<p>The last note is taped to the exit door:</p><blockquote>Before you leave, prove you understand my favorite rule of science: <b>the Law of Conservation of Mass.</b> In any physical or chemical change in a closed system, the total mass before equals the total mass after.</blockquote>',
      puzzles: [
        { type: 'input', q: '75 g of warm water and 25 g of sugar are stirred until the sugar disappears. What is the mass of the sugar water?', answer: ['100'], unit: 'g', hint: 'The sugar did not vanish. It spread out into the water.' },
        { type: 'order', q: 'Put the steps of a fair conservation of mass test in order.', items: ['Measure the mass of all materials and the container', 'Seal the container', 'Mix or heat the materials to cause a change', 'Measure the mass again', 'Compare the two masses'], hint: 'You need a "before" measurement and an "after" measurement.' }
      ] }
  ],
  finale: '<p>The exit door clicks open. Dr. Ortiz is waiting in the hallway, impressed. "You kept track of every gram," she says. "Matter can melt, freeze, dissolve, and fizz, but it never disappears. It just changes form."</p>',
  exit: [
    { q: 'A sealed jar holds 300 g of ice. After the ice melts, what is the mass of the water?', choices: ['Less than 300 g', 'Exactly 300 g', 'More than 300 g', 'It cannot be measured'], answer: 1 },
    { q: 'Which is a chemical change?', choices: ['Chocolate melting', 'Paper being cut', 'An egg being fried', 'Water freezing'], answer: 2 },
    { q: 'Baking soda and vinegar are mixed in an open cup, and the mass goes down. Explain where the missing mass went.', answer: 'A gas (carbon dioxide) formed and escaped into the air. The matter still exists; it was not destroyed.', lines: 3 }
  ]
},
{
  id: 'g5-sci-matter-museum', std: 'g5-sci-matter', format: 'gallery',
  title: 'Museum of Marvelous Matter',
  tagline: 'Tour five exhibits on properties of matter at the Indianapolis Children\'s Museum of Science.',
  story: '<p>Welcome to the new <b>Hall of Matter</b>. Each exhibit has a placard to read and a puzzle to solve. The museum curator hid one letter of a secret password at every exhibit. Visit them in any order.</p>',
  code: 'ATOMS',
  hook: 'Hold up a pencil, a cup of water, and your breath on a cold window. Ask: "What do all three have in common?" (They are all matter.)',
  stages: [
    { title: 'Is It Matter?', content: '<h3>Placard</h3><p><b>Matter</b> is anything that has mass and takes up space. Solids, liquids, and gases are all matter, including the air you breathe. Things like light, sound, heat, and feelings are <b>not</b> matter: they have no mass and do not take up space.</p><p class="note">Look closely at the display case: a rock, a glass of juice, a balloon, a flashlight beam, and a song playing from a speaker.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the items from the display case.', buckets: ['Matter', 'Not matter'], items: [['A rock', 0], ['Juice', 0], ['Air in a balloon', 0], ['A flashlight beam', 1], ['A song', 1], ['Steam', 0], ['Heat from a stove', 1]], hint: 'Ask: does it have mass? Does it take up space?' },
        { type: 'tf', q: 'True or false: Air is matter because it has mass and takes up space.', answer: true, explain: 'A balloon gets bigger when you blow air into it: air takes up space. A full balloon also has slightly more mass than an empty one.' }
      ] },
    { title: 'The Property Wall', content: '<h3>Placard</h3><p>Scientists describe matter by its <b>properties</b>. Some you can observe with your senses: color, texture, shape, hardness. Others you test: magnetism, conductivity (does heat or electricity pass through it?), and solubility (does it dissolve?).</p><p>Copper wire is used in electrical cords because it is an excellent <b>conductor</b>. Rubber and plastic are wrapped around the wire because they are <b>insulators</b>: electricity does not pass through them easily.</p>',
      puzzles: [
        { type: 'mc', q: 'Why are pots and pans usually made of metal?', choices: ['Metal conducts heat well', 'Metal is magnetic', 'Metal dissolves in water', 'Metal is soft'], answer: 0 },
        { type: 'mc', q: 'Why is the handle of a pan often made of plastic or wood?', choices: ['They are insulators, so the handle stays cool', 'They conduct heat quickly', 'They are magnetic', 'They are heavier than metal'], answer: 0 },
        { type: 'match', q: 'Match each property with a material that shows it.', pairs: [['Attracted to a magnet', 'Steel paper clip'], ['Dissolves in water', 'Salt'], ['Conducts electricity', 'Copper wire'], ['Insulator', 'Rubber glove']] }
      ] },
    { title: 'Measure Up!', content: '<h3>Placard</h3><p>At this exhibit, visitors measure a gold-colored cube. Each side is <b>3 cm</b> long. Its volume is found by multiplying length × width × height. Its mass on the museum balance is <b>52 g</b>.</p><p>Liquid volume is measured with a graduated cylinder. Read the line at the bottom of the curved surface, called the <b>meniscus</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What is the volume of the cube in cubic centimeters (cm³)?', answer: ['27'], unit: 'cm³', hint: '3 × 3 × 3', explain: '3 cm × 3 cm × 3 cm = 27 cm³.' },
        { type: 'mc', q: 'A graduated cylinder has 40 mL of water. A rock is dropped in, and the water rises to 55 mL. What is the rock\'s volume?', choices: ['15 mL', '55 mL', '95 mL', '40 mL'], answer: 0, hint: 'The rock pushed the water up. How much did it rise?' }
      ] },
    { title: 'Changing States', content: '<h3>Placard</h3><p>Water is the only substance you commonly see in all three states on Earth. Heating ice at 0 °C melts it into liquid water. Heating water to 100 °C boils it into water vapor (a gas). Cooling does the opposite.</p><p>Changing state is a <b>physical change</b>: the water is still water. Its mass stays the same even though its shape and volume can change.</p>',
      puzzles: [
        { type: 'match', q: 'Match each change of state to its name.', pairs: [['Solid → liquid', 'Melting'], ['Liquid → solid', 'Freezing'], ['Liquid → gas', 'Evaporation / boiling'], ['Gas → liquid', 'Condensation']] },
        { type: 'mc', q: 'Water droplets form on the outside of a cold glass of lemonade. Where did the water come from?', choices: ['Water vapor in the air condensed', 'Lemonade leaked through the glass', 'The ice made new water', 'The glass melted'], answer: 0, hint: 'Cool air can\'t hold as much water vapor.' }
      ] },
    { title: 'Mixtures & Solutions', content: '<h3>Placard</h3><p>A <b>mixture</b> is two or more substances combined, where each keeps its own properties. You can often separate a mixture: pick out pieces, use a magnet, or pour through a filter.</p><p>A <b>solution</b> is a special mixture where one substance dissolves evenly into another, like salt in water. You can separate it by <b>evaporating</b> the water, leaving the salt behind.</p>',
      puzzles: [
        { type: 'match', q: 'Match each mixture to the best way to separate it.', pairs: [['Iron filings and sand', 'Use a magnet'], ['Salt water', 'Evaporate the water'], ['Pebbles and water', 'Pour through a filter or screen'], ['Trail mix', 'Pick out pieces by hand']] },
        { type: 'mc', q: '20 g of salt is dissolved in 180 g of water. The water is then evaporated. About how much salt is left?', choices: ['20 g', '0 g, it disappeared', '200 g', '180 g'], answer: 0, explain: 'The salt was in the water the whole time. Evaporating the water leaves the 20 g of salt behind.' }
      ] }
  ],
  finale: '<p>The curator stamps your museum pass. "You now know the secret password of every scientist: matter is made of tiny particles. Everything in this building, including you, is matter."</p>',
  exit: [
    { q: 'Which is NOT matter?', choices: ['Air', 'Water vapor', 'Sunlight', 'Sand'], answer: 2 },
    { q: 'Which property makes copper a good choice for electrical wires?', choices: ['It is magnetic', 'It conducts electricity', 'It dissolves in water', 'It is an insulator'], answer: 1 },
    { q: 'Describe one way to separate a mixture of salt and sand. Explain why it works.', answer: 'Add water to dissolve the salt, filter out the sand, then evaporate the water to get the salt back. It works because salt dissolves and sand does not.', lines: 4 }
  ]
},
{
  id: 'g5-sci-missing-mass', std: 'g5-sci-matter', format: 'mystery',
  title: 'The Case of the Missing Mass',
  tagline: 'Someone claims matter vanished at the county science fair. Examine the evidence and prove them wrong.',
  story: '<p>At the Tippecanoe County Science Fair, three projects claim to have made matter <b>disappear</b>. The head judge is suspicious and has hired you, a junior science detective, to examine the evidence.</p><p>Your job: find out what really happened to the "missing" mass in each case.</p>',
  code: 'SCALE',
  stages: [
    { title: 'Suspect 1: The Vanishing Sugar', content: '<p><b>Evidence report:</b> Maya put 250 g of water in a jar and added 30 g of sugar. After stirring, the sugar could not be seen. Maya wrote on her poster: "The sugar disappeared, so the jar now weighs 250 g."</p><p><b>Detective note:</b> The judge placed the jar on a scale. It read <b>280 g</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What really happened to the sugar?', choices: ['It dissolved and spread out evenly in the water', 'It turned into air', 'It was destroyed', 'It sank and became water'], answer: 0 },
        { type: 'input', q: 'If Maya added another 15 g of sugar, what would the scale read?', answer: ['295'], unit: 'g', hint: '280 + 15' },
        { type: 'tf', q: 'True or false: Dissolving is a physical change.', answer: true, explain: 'The sugar is still sugar. You can get it back by evaporating the water.' }
      ] },
    { title: 'Suspect 2: The Shrinking Snowman', content: '<p><b>Evidence report:</b> Jamal packed snow into a sealed plastic container and measured it: <b>620 g</b>. He left it in the sun for an hour. The snow turned into water, and the water only filled half the container. His poster says: "Melting makes matter disappear. Look how much space is gone!"</p>',
      puzzles: [
        { type: 'mc', q: 'What would the scale read after the snow melted in the sealed container?', choices: ['620 g', 'About 310 g, since it takes half the space', '0 g', 'More than 620 g'], answer: 0, hint: 'Volume can change without mass changing.' },
        { type: 'mc', q: 'What mistake did Jamal make?', choices: ['He confused volume (space) with mass (amount of matter)', 'He used too much snow', 'He should have used a thermometer', 'He forgot to add salt'], answer: 0, explain: 'Fluffy snow has lots of air spaces. When it melts, it takes up less space, but the amount of matter (mass) is the same.' }
      ] },
    { title: 'Suspect 3: The Magic Fizz', content: '<p><b>Evidence report:</b> Lily put an antacid tablet (5 g) into a cup of water (100 g). It fizzed for two minutes. The open cup then weighed <b>103 g</b>. Lily\'s poster: "2 grams of matter disappeared forever!"</p><p><b>Detective note:</b> Fizzing and bubbles are evidence that a new gas was made. That makes this a <b>chemical change</b>.</p>',
      puzzles: [
        { type: 'input', q: 'How many grams of matter seemed to "disappear"?', answer: ['2'], unit: 'g', hint: 'Starting total: 5 + 100. Ending: 103.' },
        { type: 'mc', q: 'Where did the 2 grams go?', choices: ['Gas bubbles escaped into the air', 'The water evaporated instantly', 'The tablet destroyed the matter', 'The scale was wrong'], answer: 0 },
        { type: 'mc', q: 'How could Lily redesign her experiment to prove mass is conserved?', choices: ['Do it in a sealed bottle with a balloon on top', 'Use hotter water', 'Use two tablets', 'Stir it faster'], answer: 0 }
      ] },
    { title: 'The Clue Sort', content: '<p>The judge wants a list of clues that tell whether a change is <b>chemical</b> (a new substance forms) or <b>physical</b> (same substance, new form).</p><p>Chemical change clues: gas bubbles you didn\'t add, a new color, a new smell, light, or heat given off. Physical changes are often reversible: you can freeze melted water again.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each science fair observation.', buckets: ['Physical change', 'Chemical change'], items: [['Crushing a can', 0], ['A banana turning brown', 1], ['Glass shattering', 0], ['Milk souring and smelling bad', 1], ['Butter melting', 0], ['Fireworks exploding', 1], ['Sugar dissolving', 0], ['Steel wool rusting', 1]], hint: 'Did a NEW substance form? Look for color change, new smell, gas, light, or heat.' }
      ] },
    { title: 'The Final Report', content: '<p>Time to write your report for the judge. Remember the Law of Conservation of Mass: <b>in a closed system, the mass before a change equals the mass after.</b> When mass seems to go missing, matter has usually escaped as a gas.</p>',
      puzzles: [
        { type: 'mc', q: 'Which statement should go in your report?', choices: ['Matter was not destroyed in any project. It dissolved, changed state, or escaped as a gas.', 'Matter disappeared in all three projects.', 'Only the sugar project destroyed matter.', 'Melting creates new matter.'], answer: 0 },
        { type: 'input', q: 'A sealed bag has 60 g of vinegar and 10 g of baking soda. What will it weigh after fizzing? (Enter grams.)', answer: ['70'], unit: 'g' }
      ] }
  ],
  finale: '<p>Case closed! The judge reads your report to the crowd. "No matter disappeared today. It dissolved, it changed shape, or it floated away as a gas. Our detective used a scale, not magic." You earn a blue ribbon for science.</p>',
  exit: [
    { q: 'A sealed bag contains 50 g of ice. The ice melts. What is the mass now?', choices: ['25 g', '50 g', '100 g', '0 g'], answer: 1 },
    { q: 'Which is evidence of a chemical change?', choices: ['Ice cracking', 'Paper folding', 'Bubbles forming when two liquids mix', 'Water boiling'], answer: 2 },
    { q: 'A student says, "When sugar dissolves in water, the sugar is gone." Use the words mass and particles to explain why they are wrong.', answer: 'The sugar particles spread out between the water particles. They are still there, so the total mass equals the mass of the water plus the sugar.', lines: 4 }
  ]
},

/* ---------- 5.ESS Earth, Sun, Moon ---------- */
{
  id: 'g5-sci-solar-tour', std: 'g5-sci-space', format: 'fieldtrip',
  title: 'Grand Tour of the Solar System',
  tagline: 'Board the starship Wabash for a stop-by-stop trip from the Sun to Neptune.',
  story: '<p>Buckle up! Today your class is riding the starship <b>Wabash</b>, launching from Indiana on a tour of the solar system. At each stop, your tour guide shares facts about where you are. Pay attention: the ship\'s computer will quiz you before it moves on.</p>',
  code: 'ORBIT',
  hook: 'Tell students: "If the Sun were the size of a basketball, Earth would be the size of a peppercorn about 26 meters (85 feet) away." Ask: "How far away do you think Neptune would be?" (About 780 m, nearly half a mile.)',
  stages: [
    { title: 'Stop 1: The Sun', content: '<p>Welcome to our closest star! The Sun is a giant ball of hot gas that makes its own light. About <b>1.3 million Earths</b> could fit inside it.</p><p>The Sun looks bigger and brighter than any other star only because it is so much closer. The next closest star, Proxima Centauri, is about 270,000 times farther away.</p><p>The Sun\'s gravity holds all eight planets in their orbits.</p>',
      puzzles: [
        { type: 'mc', q: 'Why does the Sun look so much brighter than other stars?', choices: ['It is much closer to Earth', 'It is the biggest star in the universe', 'Other stars do not make light', 'It is the only star in space'], answer: 0 },
        { type: 'tf', q: 'True or false: The Sun is a star.', answer: true },
        { type: 'mc', q: 'What keeps the planets orbiting the Sun?', choices: ['The Sun\'s gravity', 'The Sun\'s light', 'Wind in space', 'Magnets'], answer: 0 }
      ] },
    { title: 'Stop 2: The Inner Planets', content: '<p>The four planets closest to the Sun are the <b>rocky</b> (terrestrial) planets: <b>Mercury, Venus, Earth, and Mars</b>. They are small and made of rock and metal.</p><ul><li><b>Mercury</b>: smallest planet, closest to the Sun.</li><li><b>Venus</b>: hottest planet because of its thick, heat-trapping clouds.</li><li><b>Earth</b>: the only planet known to have liquid water on its surface and life.</li><li><b>Mars</b>: the "Red Planet," covered in rusty dust.</li></ul>',
      puzzles: [
        { type: 'order', q: 'Put the inner planets in order from closest to the Sun to farthest.', items: ['Mercury', 'Venus', 'Earth', 'Mars'], hint: 'Mercury is closest. Earth is third.' },
        { type: 'match', q: 'Match each planet with its fact.', pairs: [['Mercury', 'Smallest planet'], ['Venus', 'Hottest planet'], ['Earth', 'Liquid water on its surface'], ['Mars', 'Red, rusty dust']] }
      ] },
    { title: 'Stop 3: The Asteroid Belt', content: '<p>Between Mars and Jupiter, we fly through the <b>asteroid belt</b>: millions of rocky chunks orbiting the Sun. Don\'t worry, they are spread very far apart!</p><p>The asteroid belt separates the rocky inner planets from the giant outer planets. The largest object here, <b>Ceres</b>, is a dwarf planet.</p>',
      puzzles: [
        { type: 'mc', q: 'The asteroid belt is located between which two planets?', choices: ['Mars and Jupiter', 'Earth and Mars', 'Jupiter and Saturn', 'Venus and Earth'], answer: 0 },
        { type: 'mc', q: 'What does the asteroid belt separate?', choices: ['Inner rocky planets from outer gas giants', 'The Sun from Mercury', 'Earth from the Moon', 'Stars from planets'], answer: 0 }
      ] },
    { title: 'Stop 4: The Gas Giants', content: '<p>The outer planets are huge and made mostly of gas and ice: <b>Jupiter, Saturn, Uranus, and Neptune</b>.</p><ul><li><b>Jupiter</b>: the largest planet. More than 1,300 Earths could fit inside. Its Great Red Spot is a storm bigger than Earth.</li><li><b>Saturn</b>: famous for its bright rings made of ice and rock.</li><li><b>Uranus</b>: spins on its side.</li><li><b>Neptune</b>: the farthest planet, with the fastest winds in the solar system.</li></ul><p>The farther a planet is from the Sun, the longer its orbit takes. Neptune takes about <b>165 Earth years</b> to orbit once!</p>',
      puzzles: [
        { type: 'order', q: 'Put the outer planets in order from closest to the Sun to farthest.', items: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], hint: 'Jupiter is fifth from the Sun, Neptune is eighth.' },
        { type: 'mc', q: 'Which planet takes the LONGEST to orbit the Sun?', choices: ['Neptune', 'Jupiter', 'Mercury', 'Earth'], answer: 0, hint: 'Farther planets have longer orbits.' },
        { type: 'sort', q: 'Sort the planets into inner (rocky) or outer (gas giant).', buckets: ['Inner rocky planet', 'Outer gas giant'], items: [['Mars', 0], ['Saturn', 1], ['Venus', 0], ['Neptune', 1], ['Mercury', 0], ['Jupiter', 1], ['Earth', 0], ['Uranus', 1]] }
      ] },
    { title: 'Stop 5: Looking Back at Earth', content: '<p>From far away, Earth looks like a tiny blue dot. Your guide explains how Earth moves:</p><ul><li>Earth <b>rotates</b> (spins) on its axis once every <b>24 hours</b>. This causes day and night.</li><li>Earth <b>revolves</b> (orbits) around the Sun once every <b>365¼ days</b>, or one year.</li><li>The Moon orbits Earth about once every <b>27 days</b>, and we see a full cycle of phases about every <b>29.5 days</b>.</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each motion to how long it takes.', pairs: [['Earth rotates once', 'About 24 hours'], ['Earth orbits the Sun once', 'About 365 days'], ['A full cycle of Moon phases', 'About 29.5 days']] },
        { type: 'mc', q: 'What causes day and night on Earth?', choices: ['Earth rotating on its axis', 'Earth orbiting the Sun', 'The Moon blocking the Sun', 'The Sun turning off'], answer: 0 }
      ] }
  ],
  finale: '<p>The starship Wabash glides back into Indiana\'s atmosphere and lands safely. You traveled billions of miles, saw eight planets, and learned how Earth\'s motions give us days and years. Welcome home, space explorer!</p>',
  exit: [
    { q: 'Which list shows the planets in order from the Sun?', choices: ['Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune', 'Mercury, Earth, Venus, Mars, Saturn, Jupiter, Neptune, Uranus', 'Venus, Mercury, Earth, Mars, Jupiter, Uranus, Saturn, Neptune', 'Earth, Mars, Venus, Mercury, Jupiter, Saturn, Uranus, Neptune'], answer: 0 },
    { q: 'How long does it take Earth to orbit the Sun?', choices: ['24 hours', '29.5 days', 'About 365 days', '165 years'], answer: 2 },
    { q: 'The Sun is a star, but it looks much bigger and brighter than other stars. Explain why.', answer: 'The Sun is much closer to Earth than any other star, so it appears larger and brighter.', lines: 3 }
  ]
},
{
  id: 'g5-sci-shadow-clock', std: 'g5-sci-space', format: 'escape',
  title: 'Shadow Clock Escape',
  tagline: 'Trapped in an old observatory, you must read shadows and the tilt of Earth to unlock the doors.',
  story: '<p>You are exploring the old Goethe Link Observatory near Mooresville when the heavy wooden door swings shut behind you. The lock has no keyhole, only a sundial and a riddle:</p><blockquote>"Only those who understand the sky may leave. Read the shadows, know the seasons, and the doors will open."</blockquote>',
  code: 'EARTH',
  stages: [
    { title: 'The Spinning Globe', content: '<p>A huge globe sits in the entry hall with a tag: <b>"Spin me the way Earth spins."</b></p><p>Earth rotates from <b>west to east</b> (counterclockwise when you look down at the North Pole). That is why the Sun appears to <b>rise in the east</b> and <b>set in the west</b>. The Sun is not moving across our sky; we are spinning.</p><p>At any moment, half of Earth faces the Sun (day) and half faces away (night).</p>',
      puzzles: [
        { type: 'mc', q: 'In which direction does the Sun appear to rise?', choices: ['East', 'West', 'North', 'South'], answer: 0 },
        { type: 'tf', q: 'True or false: The Sun moves around Earth once a day.', answer: false, explain: 'Earth rotates once a day, which makes the Sun appear to move across the sky.' },
        { type: 'mc', q: 'When it is noon in Indiana, what is it like on the opposite side of Earth?', choices: ['Night', 'Also noon', 'Sunrise', 'The same season and time'], answer: 0 }
      ] },
    { title: 'The Sundial Lock', content: '<p>A sundial in the courtyard casts a shadow. Shadows form on the side of an object <b>opposite</b> the Sun.</p><ul><li><b>Morning</b>: Sun is low in the east. Shadows are <b>long</b> and point <b>west</b>.</li><li><b>Noon</b>: Sun is highest in the sky. Shadows are <b>shortest</b>.</li><li><b>Evening</b>: Sun is low in the west. Shadows are <b>long</b> and point <b>east</b>.</li></ul>',
      puzzles: [
        { type: 'order', q: 'A flagpole\'s shadow was measured three times one day. Order them from morning to evening.', items: ['Long shadow pointing west', 'Short shadow', 'Long shadow pointing east'], tip: 'Put the earliest time of day at the top.', hint: 'In the morning the Sun is in the east, so the shadow points the opposite way.' },
        { type: 'mc', q: 'When is your shadow the shortest?', choices: ['Around noon, when the Sun is highest', 'At sunrise', 'At sunset', 'At midnight'], answer: 0 },
        { type: 'mc', q: 'Your shadow points toward the east. What time of day is it most likely?', choices: ['Late afternoon or evening', 'Early morning', 'Exactly noon', 'Midnight'], answer: 0, hint: 'The shadow points away from the Sun. If the shadow points east, where is the Sun?' }
      ] },
    { title: 'The Tilted Axis', content: '<p>A model of Earth hangs from the ceiling at a slant. The label says:</p><blockquote>Earth\'s axis is tilted about <b>23.5°</b>. The tilt always points the same direction in space as Earth orbits the Sun.</blockquote><p>When the Northern Hemisphere (where Indiana is) tilts <b>toward</b> the Sun, we get more direct sunlight and longer days: <b>summer</b>. When it tilts <b>away</b>, sunlight is spread out and days are short: <b>winter</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What causes Earth\'s seasons?', choices: ['The tilt of Earth\'s axis as it orbits the Sun', 'Earth getting closer to and farther from the Sun', 'The Moon blocking sunlight', 'Clouds'], answer: 0 },
        { type: 'mc', q: 'It is summer in Indiana. What season is it in Australia (Southern Hemisphere)?', choices: ['Winter', 'Summer', 'Spring', 'Fall'], answer: 0, hint: 'If the north tilts toward the Sun, the south tilts away.' },
        { type: 'tf', q: 'True or false: In summer, Indiana has more hours of daylight than in winter.', answer: true }
      ] },
    { title: 'The Star Map', content: '<p>The observatory ceiling is painted with constellations. A plaque explains:</p><blockquote>As Earth orbits the Sun, we look out at different parts of space at night. So the constellations we can see <b>change with the seasons</b>. Orion is easy to see on winter evenings in Indiana, but not in summer.</blockquote><p>Stars also seem to move across the sky during a single night, because Earth is rotating.</p>',
      puzzles: [
        { type: 'mc', q: 'Why do we see different constellations in winter than in summer?', choices: ['Earth is in a different part of its orbit, so the night side faces a different part of space', 'The stars move around each season', 'Stars only shine in winter', 'The Moon covers them'], answer: 0 },
        { type: 'mc', q: 'Why do stars appear to move across the sky during one night?', choices: ['Earth rotates', 'Stars orbit Earth', 'Clouds push them', 'The Moon pulls them'], answer: 0 }
      ] },
    { title: 'The Final Door', content: '<p>The final door has two motions carved into it: <b>ROTATION</b> and <b>REVOLUTION</b>. Match the patterns you have seen to the motion that causes them.</p>',
      puzzles: [
        { type: 'sort', q: 'Which motion causes each pattern?', buckets: ['Rotation (spinning, 24 hours)', 'Revolution (orbiting the Sun, 1 year)'], items: [['Day and night', 0], ['Sun rising in the east', 0], ['Shadows changing during the day', 0], ['Seasons (with the tilt)', 1], ['Different constellations in winter and summer', 1], ['One year', 1]], hint: 'Anything that repeats every day comes from spinning. Anything that repeats every year comes from orbiting.' }
      ] }
  ],
  finale: '<p>With a deep groan, the observatory doors swing open to a bright afternoon. Your shadow stretches out long toward the east. You know exactly why. The sky has no secrets from you now.</p>',
  exit: [
    { q: 'At 8:00 a.m., which way will a tree\'s shadow point?', choices: ['East', 'West', 'Straight down, no shadow', 'North'], answer: 1 },
    { q: 'What causes day and night?', choices: ['Earth orbiting the Sun', 'Earth rotating on its axis', 'The Moon\'s orbit', 'The tilt of Earth'], answer: 1 },
    { q: 'Explain why Indiana has summer in June and winter in December.', answer: 'Earth\'s axis is tilted. In June the Northern Hemisphere tilts toward the Sun, getting direct light and longer days. In December it tilts away, so sunlight is spread out and days are shorter.', lines: 4 }
  ]
},
{
  id: 'g5-sci-moon-quest', std: 'g5-sci-space', format: 'quest',
  title: 'Moonlight Quest',
  tagline: 'Level up through the eight Moon phases and the patterns of the night sky.',
  story: '<p>Luna the owl can only fly home if she knows what the Moon will look like each night. Help her by clearing five levels of Moon knowledge. Each level you finish powers up her wings with one letter of moonlight.</p>',
  code: 'LUNAR',
  stages: [
    { title: 'Level 1: Moonlight Is Sunlight', content: '<p>The Moon does not make its own light. It <b>reflects</b> light from the Sun, like a mirror. At all times, the half of the Moon facing the Sun is lit.</p><p>From Earth, we see different amounts of that lit half as the Moon orbits us. These changing shapes are called <b>phases</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Where does moonlight come from?', choices: ['Sunlight reflecting off the Moon', 'Fire inside the Moon', 'Light from Earth\'s cities', 'The Moon makes its own light'], answer: 0 },
        { type: 'tf', q: 'True or false: Half of the Moon is always lit by the Sun.', answer: true }
      ] },
    { title: 'Level 2: Name That Phase', content: '<p>The phases go in this order over about <b>29.5 days</b>:</p><ol><li><b>New moon</b>: we cannot see the lit side.</li><li><b>Waxing crescent</b>: a thin sliver of light on the right.</li><li><b>First quarter</b>: right half lit.</li><li><b>Waxing gibbous</b>: more than half lit.</li><li><b>Full moon</b>: the whole face is lit.</li><li><b>Waning gibbous</b></li><li><b>Third (last) quarter</b>: left half lit.</li><li><b>Waning crescent</b></li></ol><p><b>Waxing</b> means growing. <b>Waning</b> means shrinking.</p>',
      puzzles: [
        { type: 'order', q: 'Put the first five phases in order, starting with the new moon.', items: ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon'] },
        { type: 'mc', q: 'What does "waning" mean?', choices: ['Shrinking', 'Growing', 'Disappearing forever', 'Spinning'], answer: 0 }
      ] },
    { title: 'Level 3: Predict the Moon', content: '<p>The cycle always repeats in the same order. If you know tonight\'s phase, you can predict the next one. It takes about <b>one week</b> to go from one "main" phase to the next (new → first quarter → full → third quarter → new).</p>',
      puzzles: [
        { type: 'mc', q: 'Tonight is a first quarter moon. What will the Moon look like in about one week?', choices: ['Full moon', 'New moon', 'Third quarter', 'Waxing crescent'], answer: 0 },
        { type: 'mc', q: 'Tonight is a full moon. About how many days until the next full moon?', choices: ['About 29–30 days', 'About 7 days', 'About 365 days', '1 day'], answer: 0 },
        { type: 'mc', q: 'Which phase comes right after the waning gibbous?', choices: ['Third quarter', 'Full moon', 'New moon', 'Waxing crescent'], answer: 0 }
      ] },
    { title: 'Level 4: Sun, Earth, Moon', content: '<p>The phase depends on where the Moon is in its orbit:</p><ul><li><b>New moon</b>: the Moon is between Earth and the Sun. The lit side faces away from us.</li><li><b>Full moon</b>: Earth is between the Sun and the Moon. We see the whole lit side.</li><li><b>Quarter moons</b>: the Moon is off to the side, making a right angle with the Sun and Earth.</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match the positions to the phase we see.', pairs: [['Moon between Earth and Sun', 'New moon'], ['Earth between Sun and Moon', 'Full moon'], ['Moon off to the side (right angle)', 'Quarter moon']] },
        { type: 'mc', q: 'Why can\'t we see the Moon during a new moon?', choices: ['The lit side faces away from Earth', 'Earth\'s shadow covers it', 'The Moon leaves its orbit', 'Clouds always cover it'], answer: 0 }
      ] },
    { title: 'Level 5: Boss Level', content: '<p>The Boss Owl has one last challenge. Be careful: some statements are myths!</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each statement.', buckets: ['Fact', 'Myth'], items: [['Moon phases are caused by Earth\'s shadow.', 1], ['The Moon reflects sunlight.', 0], ['The Moon changes shape because pieces break off.', 1], ['The phase cycle takes about 29.5 days.', 0], ['We always see the same side of the Moon.', 0], ['A full moon happens every week.', 1]], hint: 'Earth\'s shadow only falls on the Moon during a lunar eclipse, not during phases.' }
      ] }
  ],
  finale: '<p>Luna spreads her glowing wings and soars across the sky under a bright full moon. "Thanks to you, I will never be lost again," she hoots. Quest complete!</p>',
  exit: [
    { q: 'Tonight is a new moon. What will you see in about two weeks?', choices: ['New moon', 'First quarter', 'Full moon', 'Waning crescent'], answer: 2 },
    { q: 'Why does the Moon have phases?', choices: ['Earth\'s shadow covers part of it', 'We see different amounts of its sunlit half as it orbits Earth', 'Clouds block parts of it', 'The Moon changes size'], answer: 1 },
    { q: 'Describe where the Sun, Earth, and Moon are during a full moon.', answer: 'Earth is between the Sun and the Moon, so we see the Moon\'s entire sunlit side.', lines: 3 }
  ]
},

/* ---------- 5.LS Ecosystems ---------- */
{
  id: 'g5-sci-habitat-hike', std: 'g5-sci-eco', format: 'fieldtrip',
  title: 'Hoosier Habitat Hike',
  tagline: 'A virtual trip to five Indiana ecosystems, from the Dunes to a Brown County forest.',
  story: '<p>Lace up your hiking boots! Ranger Rivera is leading a virtual field trip through five Indiana ecosystems. At every stop, you will study who eats whom and how energy moves through the community.</p>',
  code: 'DUNES',
  stages: [
    { title: 'Stop 1: Brown County Forest', content: '<p>Tall oak and hickory trees make food from sunlight. Squirrels and white-tailed deer eat acorns and leaves. Red-tailed hawks swoop down on squirrels. Under the leaves, mushrooms and earthworms break down fallen logs.</p><p><b>Producers</b> make their own food from sunlight. <b>Consumers</b> eat other living things. <b>Decomposers</b> break down dead matter and return nutrients to the soil.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the forest organisms by their role.', buckets: ['Producer', 'Consumer', 'Decomposer'], items: [['Oak tree', 0], ['Hickory tree', 0], ['Squirrel', 1], ['Red-tailed hawk', 1], ['White-tailed deer', 1], ['Mushroom', 2], ['Earthworm', 2]] },
        { type: 'mc', q: 'Where does the energy in an acorn originally come from?', choices: ['The Sun', 'The soil', 'The squirrel', 'Rain'], answer: 0 }
      ] },
    { title: 'Stop 2: Indiana Dunes', content: '<p>At Indiana Dunes National Park, marram grass holds the sand in place. Grasshoppers munch on the grass. Six-lined racerunner lizards eat grasshoppers. Hognose snakes sometimes eat the lizards.</p><p>In a food chain, arrows show the <b>flow of energy</b>. The arrow points from the organism being eaten <b>to</b> the organism that eats it.</p>',
      puzzles: [
        { type: 'order', q: 'Build the Dunes food chain in the order energy flows.', items: ['Sun', 'Marram grass', 'Grasshopper', 'Racerunner lizard', 'Hognose snake'], tip: 'Start with where the energy begins.' },
        { type: 'mc', q: 'In the chain "grass → grasshopper," what does the arrow mean?', choices: ['Energy moves from the grass to the grasshopper', 'The grass eats the grasshopper', 'The grasshopper makes the grass', 'They live in the same place'], answer: 0 }
      ] },
    { title: 'Stop 3: The Wabash River', content: '<p>In the Wabash River, algae and water plants are producers. Mayfly larvae eat the algae. Smallmouth bass eat mayflies. Great blue herons wade in and catch bass. Raccoons eat fish, crayfish, and berries along the banks.</p><p><b>Herbivores</b> eat only plants. <b>Carnivores</b> eat only animals. <b>Omnivores</b> eat both.</p>',
      puzzles: [
        { type: 'match', q: 'Match each river organism to its type.', pairs: [['Algae', 'Producer'], ['Mayfly larva', 'Herbivore'], ['Great blue heron', 'Carnivore'], ['Raccoon', 'Omnivore']] },
        { type: 'mc', q: 'Which organism is the <b>prey</b> in this pair: heron and bass?', choices: ['Bass', 'Heron', 'Both', 'Neither'], answer: 0 }
      ] },
    { title: 'Stop 4: Prairie Food Web', content: '<p>At Prophetstown State Park\'s restored prairie, many food chains connect into a <b>food web</b>:</p><ul><li>Rabbits and grasshoppers eat prairie grasses.</li><li>Meadowlarks eat grasshoppers.</li><li>Coyotes eat rabbits and meadowlarks.</li><li>Red foxes eat rabbits.</li></ul><p>When one population changes, it affects others in the web.</p>',
      puzzles: [
        { type: 'mc', q: 'A disease causes the rabbit population to drop. What is most likely to happen to the foxes?', choices: ['Their population decreases because they have less food', 'Their population increases', 'Nothing changes', 'They start eating grass'], answer: 0 },
        { type: 'mc', q: 'If rabbits decrease, what will likely happen to the prairie grass?', choices: ['It will increase because fewer animals eat it', 'It will disappear', 'It will stop growing', 'It will turn into rabbits'], answer: 0 },
        { type: 'mc', q: 'Coyotes eat both rabbits and meadowlarks. If rabbits decrease, what might coyotes do?', choices: ['Eat more meadowlarks', 'Eat more grass', 'Stop eating', 'Become producers'], answer: 0 }
      ] },
    { title: 'Stop 5: Back at the Ranger Station', content: '<p>Ranger Rivera explains the big idea: <b>matter cycles, and energy flows.</b></p><p>Energy enters as sunlight, moves up the food chain, and some is lost as heat at every step. Matter (like carbon and nutrients) is recycled over and over: decomposers break down dead plants and animals, returning nutrients to the soil so producers can grow again.</p>',
      puzzles: [
        { type: 'mc', q: 'What would happen to a forest if all decomposers disappeared?', choices: ['Dead matter would pile up and soil would lose nutrients', 'Plants would grow faster', 'Nothing would change', 'Animals would have more food'], answer: 0 },
        { type: 'order', q: 'Order the steps in the cycle of matter.', items: ['A plant grows using nutrients from the soil', 'A deer eats the plant', 'The deer dies', 'Decomposers break down the deer', 'Nutrients return to the soil'] }
      ] }
  ],
  finale: '<p>Ranger Rivera hands you a Junior Naturalist patch. "From the Dunes to the Wabash, every Indiana ecosystem runs on sunlight and recycling," she says. "Producers, consumers, and decomposers all have a job."</p>',
  exit: [
    { q: 'Which organism is a decomposer?', choices: ['Oak tree', 'Mushroom', 'Rabbit', 'Hawk'], answer: 1 },
    { q: 'In the chain grass → rabbit → fox, which way does energy flow?', choices: ['From fox to grass', 'From grass to rabbit to fox', 'From rabbit to grass', 'It does not flow'], answer: 1 },
    { q: 'Explain what might happen in a pond if all the algae died.', answer: 'Animals that eat algae would lose food and decrease, and then animals that eat them would also decrease. The whole food web would be affected.', lines: 4 }
  ]
},
{
  id: 'g5-sci-food-web-crash', std: 'g5-sci-eco', format: 'mystery',
  title: 'Who Crashed the Food Web?',
  tagline: 'Fish are vanishing from Lake Monroe. Follow the food web clues to find out why.',
  story: '<p>Something is wrong at Lake Monroe. Fishermen say the bluegill population has dropped by half, and the water is turning green. The Department of Natural Resources has called in a food web detective: you.</p><p>Examine each evidence file. Every clue brings you closer to the cause.</p>',
  code: 'CHAIN',
  stages: [
    { title: 'Evidence File #1: The Lake Food Web', content: '<p><b>DNR survey:</b></p><ul><li>Algae and pondweed are the producers.</li><li>Zooplankton (tiny animals) eat algae.</li><li>Bluegill eat zooplankton and insects.</li><li>Largemouth bass eat bluegill.</li><li>Ospreys and herons eat bass and bluegill.</li></ul>',
      puzzles: [
        { type: 'order', q: 'Put one food chain from the lake in order of energy flow.', items: ['Algae', 'Zooplankton', 'Bluegill', 'Largemouth bass', 'Osprey'] },
        { type: 'mc', q: 'Which organism is a producer?', choices: ['Pondweed', 'Bluegill', 'Osprey', 'Zooplankton'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Mystery Fish', content: '<p><b>Fisherman interview:</b> "Last spring, someone dumped a bucket of bait fish into the lake. They were a kind I had never seen here before."</p><p><b>DNR lab report:</b> The new fish is an <b>invasive species</b>: a living thing brought to an ecosystem where it does not naturally live. It eats huge amounts of zooplankton and has no natural predators in the lake.</p>',
      puzzles: [
        { type: 'mc', q: 'What is an invasive species?', choices: ['An organism brought to an ecosystem where it does not naturally live, often causing harm', 'Any fish in a lake', 'A native plant', 'A decomposer'], answer: 0 },
        { type: 'mc', q: 'The invasive fish eats zooplankton. What will likely happen to the zooplankton population?', choices: ['Decrease', 'Increase', 'Stay the same', 'Turn into algae'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Green Water', content: '<p><b>Water sample report:</b> Algae levels are three times higher than last year. The water is cloudy and green.</p><p><b>Detective thinking:</b> Remember, zooplankton eat algae. What happens to algae when their consumers disappear?</p>',
      puzzles: [
        { type: 'mc', q: 'Why is there more algae now?', choices: ['Fewer zooplankton are eating it', 'Bluegill are eating it', 'The Sun got hotter', 'Algae eat fish'], answer: 0 },
        { type: 'mc', q: 'Why are bluegill decreasing?', choices: ['Their food (zooplankton) is being eaten by the invasive fish', 'Bluegill eat too much algae', 'Bass stopped eating them', 'The water is too cold'], answer: 0 }
      ] },
    { title: 'Evidence File #4: Ripple Effects', content: '<p><b>Osprey nest survey:</b> Fewer osprey chicks hatched this year. <b>Bass survey:</b> Bass are thinner than usual.</p><p>One change in a food web can ripple through many populations. Scientists call this a <b>chain reaction</b>.</p>',
      puzzles: [
        { type: 'order', q: 'Put the chain reaction in order.', items: ['Invasive fish are released', 'Zooplankton decrease', 'Bluegill lose food and decrease', 'Bass have less to eat', 'Ospreys have less food for their chicks'] },
        { type: 'sort', q: 'Did each population increase or decrease after the invasive fish arrived?', buckets: ['Increased', 'Decreased'], items: [['Algae', 0], ['Invasive fish', 0], ['Zooplankton', 1], ['Bluegill', 1], ['Bass', 1]] }
      ] },
    { title: 'Evidence File #5: The Solution', content: '<p>The DNR wants your recommendation. Good solutions reduce the invasive species and help the native food web recover. Ideas on the table: remove the invasive fish with nets, teach people not to dump bait, add more of the invasive fish, and restock native bluegill.</p>',
      puzzles: [
        { type: 'sort', q: 'Which ideas would help the lake recover?', buckets: ['Helps', 'Does not help'], items: [['Net and remove the invasive fish', 0], ['Post signs: never dump bait fish', 0], ['Restock native bluegill', 0], ['Add more invasive fish', 1], ['Remove all the algae-eating zooplankton', 1]] },
        { type: 'mc', q: 'Which is the best long-term way to prevent this from happening again?', choices: ['Teach people not to release non-native animals', 'Drain the lake', 'Remove all the fish', 'Add fertilizer'], answer: 0 }
      ] }
  ],
  finale: '<p>The DNR adopts your plan. A year later, zooplankton are back, the water is clearing, and the bluegill are biting again. The mystery of Lake Monroe is solved: one small change broke the chain, and understanding the food web fixed it.</p>',
  exit: [
    { q: 'An invasive species eats all the zooplankton in a lake. What happens to the algae?', choices: ['It increases', 'It decreases', 'It stays the same', 'It becomes a consumer'], answer: 0 },
    { q: 'Which organism is a consumer?', choices: ['Pondweed', 'Algae', 'Bluegill', 'Oak tree'], answer: 2 },
    { q: 'Explain how a change to one population can affect other organisms in a food web. Use an example.', answer: 'Organisms are connected. Example: if zooplankton decrease, bluegill that eat them decrease, then bass and ospreys that eat bluegill have less food.', lines: 4 }
  ]
},
{
  id: 'g5-sci-decomposer-dash', std: 'g5-sci-eco', format: 'quest',
  title: 'Decomposer Dash',
  tagline: 'Race through the life of a fallen log and discover how energy flows and matter cycles.',
  story: '<p>A huge old maple tree has fallen in Turkey Run State Park. Over the next years, it will feed an entire community. You are shrunk to the size of an ant to follow the matter and energy through five levels.</p>',
  code: 'FUNGI',
  stages: [
    { title: 'Level 1: Sun Power', content: '<p>Before it fell, the maple tree was a <b>producer</b>. Its leaves used sunlight, water, and carbon dioxide from the air to make sugar (food) in a process called <b>photosynthesis</b>. Plants give off oxygen as they do this.</p><p>Plants get <b>energy</b> from the Sun. They get <b>matter</b> for growing mostly from air (carbon dioxide) and water.</p>',
      puzzles: [
        { type: 'sort', q: 'What does a plant need, and what does it give off, during photosynthesis?', buckets: ['Plant takes in', 'Plant makes or gives off'], items: [['Sunlight', 0], ['Water', 0], ['Carbon dioxide', 0], ['Sugar (food)', 1], ['Oxygen', 1]] },
        { type: 'tf', q: 'True or false: Plants get their food by eating soil.', answer: false, explain: 'Plants make their own food using sunlight, water, and carbon dioxide. Soil gives nutrients, not food energy.' }
      ] },
    { title: 'Level 2: The Log Falls', content: '<p>A storm knocks the maple over. Now it is dead matter. Who will use it? Soon <b>decomposers</b> arrive:</p><ul><li><b>Fungi</b> (like mushrooms) grow threads into the wood and digest it.</li><li><b>Bacteria</b> too small to see break down the soft parts.</li><li><b>Earthworms, termites, and millipedes</b> chew up rotting wood and leaves.</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Which organisms are decomposers (or decomposer helpers)?', buckets: ['Decomposer', 'Not a decomposer'], items: [['Mushroom', 0], ['Bacteria', 0], ['Earthworm', 0], ['Millipede', 0], ['Maple tree', 1], ['Owl', 1], ['Chipmunk', 1]] },
        { type: 'mc', q: 'What do decomposers do?', choices: ['Break down dead matter and return nutrients to the soil', 'Make food from sunlight', 'Hunt other animals', 'Pollinate flowers'], answer: 0 }
      ] },
    { title: 'Level 3: Log Neighborhood', content: '<p>The rotting log becomes a home and a food source. Beetle larvae eat the soft wood. Salamanders eat beetle larvae and worms. Garter snakes eat salamanders. An owl eats snakes and chipmunks.</p>',
      puzzles: [
        { type: 'order', q: 'Put this log food chain in order of energy flow.', items: ['Rotting wood', 'Beetle larva', 'Salamander', 'Garter snake', 'Owl'] },
        { type: 'mc', q: 'In the chain above, which is the top predator?', choices: ['Owl', 'Beetle larva', 'Salamander', 'Rotting wood'], answer: 0 }
      ] },
    { title: 'Level 4: Energy Pyramid', content: '<p>Energy is lost at every step of a food chain. Animals use most of the energy they eat to move, grow, and stay warm, and much is released as heat. Only about <b>10%</b> passes on to the next level.</p><p>That is why there are many more plants than plant-eaters, and many more plant-eaters than top predators.</p>',
      puzzles: [
        { type: 'mc', q: 'Which organisms would there be the MOST of in a forest?', choices: ['Producers (plants)', 'Top predators (owls)', 'Snakes', 'Salamanders'], answer: 0 },
        { type: 'input', q: 'Grass captures 1,000 units of energy. About 10% passes to the rabbit that eats it. How many units does the rabbit get?', answer: ['100'], unit: 'units', hint: '10% of 1,000 = 1,000 ÷ 10' },
        { type: 'input', q: 'About 10% of the rabbit\'s 100 units passes to a fox that eats it. How many units does the fox get?', answer: ['10'], unit: 'units' }
      ] },
    { title: 'Level 5: Back to the Soil', content: '<p>Years later, the log is gone. It has become rich, dark soil full of nutrients. A maple seed lands and sprouts, using those nutrients to grow. <b>Matter cycles</b> around and around. <b>Energy flows</b> in from the Sun and out as heat.</p>',
      puzzles: [
        { type: 'mc', q: 'Which statement is correct?', choices: ['Matter is recycled; energy flows in from the Sun and leaves as heat', 'Energy is recycled; matter is used up', 'Both energy and matter are used up', 'Neither energy nor matter moves'], answer: 0 },
        { type: 'mc', q: 'How do decomposers help the new maple seedling?', choices: ['They returned nutrients from the old log to the soil', 'They give it sunlight', 'They eat its leaves', 'They plant the seed'], answer: 0 }
      ] }
  ],
  finale: '<p>You grow back to full size just as a new maple seedling pokes out of the soil where the old log lay. The cycle starts again. Dash complete! You finished as a certified Decomposer Expert.</p>',
  exit: [
    { q: 'Which of these is a decomposer?', choices: ['Fern', 'Bacteria', 'Deer', 'Hawk'], answer: 1 },
    { q: 'Why are there fewer top predators than producers in an ecosystem?', choices: ['Predators are lazy', 'Energy is lost at each level of the food chain', 'Producers eat predators', 'Predators live longer'], answer: 1 },
    { q: 'Explain how matter from a dead tree can end up in a new plant.', answer: 'Decomposers break down the dead tree and return nutrients to the soil. A new plant absorbs those nutrients through its roots as it grows.', lines: 3 }
  ]
}
);
