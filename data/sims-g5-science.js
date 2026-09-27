/*
 * Sunnyside Simulators: Grade 5 science simulations.
 * Every step: students DO something in the model (goal), then explain what they saw (q).
 * sheet: N = the numbered box on the paper lab sheet.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

SUNNY_SIMS.push({
  id: 'g5-sci-melting-lab', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.1–5.PS.2',
  title: 'Melting Lab', model: 'meltLab', minutes: 25, icon: '🧊',
  place: 'Sunnyside Science Lab · Bench 3',
  mission: 'The lab\'s ice samples are melting, and a student claims the lab is "losing matter." Use the hot plate, the lid, and the digital scale to find out what really happens to mass when ice melts, water freezes, and water evaporates.',
  question: 'Does matter disappear when it melts, freezes, or evaporates?',
  takeaway: 'When a substance is heated or cooled, its particles rearrange but none are created or destroyed. In a sealed container the mass stays the same. In an open container, mass seems to "disappear" only because water vapor escapes into the air.',
  vocab: [['Mass', 'How much matter is in an object, measured in grams (g).'], ['Matter', 'Anything that has mass and takes up space.'], ['Melting', 'A solid changing to a liquid when heated.'], ['Evaporation', 'A liquid changing to a gas (vapor).'], ['Sealed system', 'A closed container. No matter can get in or out.'], ['Conservation of mass', 'Matter is not created or destroyed, so total mass stays the same.']],
  warmup: {
    style: 'Would you rather bet?', prompt: 'Look at each pair. Which one has MORE mass, or are they the SAME? Write your choice and one reason.',
    items: [['A 1 kg bag of feathers or a 1 kg bag of rocks?', 'Same. Both are 1 kg; size is not mass.'], ['A frozen juice pop, or the same juice pop after it melts in a sealed bag?', 'Same. Melting only rearranges particles.'], ['A glass of water today, or the same glass left uncovered for a week?', 'Today. Water evaporates and escapes, so the glass loses mass.']]
  },
  steps: [
    { tag: 'explore', title: 'Meet your lab bench', text: 'Your beaker holds a **50 g ice cube** on a digital scale. The hot plate can heat or cool it. The scale is zeroed, so it shows only the mass of what is inside the beaker.',
      goal: { text: 'Drag the **Hot plate** slider to any temperature above 0 °C and watch the thermometer.', check: { touchedHeat: true, setTemp: { gte: 5 } } } },
    { tag: 'predict', title: 'Make a prediction', sheet: 1, text: 'Before you test it, predict. Write your prediction in box 1 of your lab sheet.',
      q: { type: 'predict', q: 'A 50 g ice cube melts completely in a SEALED beaker. What will the scale show?', choices: ['More than 50 g', 'Exactly 50 g', 'Less than 50 g'] } },
    { tag: 'test', title: 'Test it: melt the ice', sheet: 2, text: 'Keep the lid **sealed**. Heat the ice until it is all liquid. Use ⏩ 5× to speed up time.',
      goal: { text: 'Melt all 50 g of ice with the lid sealed.', check: { startMass: 50, lid: 'sealed', melted: true, lost: 0 }, hint: 'Set the hot plate to 40 °C or more, then press ⏩ 5×. If you opened the lid, press "50 g" to get new ice.' },
      q: { type: 'num', q: 'Read the scale. What is the mass of the water now?', unit: 'g', answer: 50, tol: 0.2, hint: 'Look at the big green number labeled "Scale (mass)".', traps: [[0, 'The scale does not show 0. Read the green number again.']] } },
    { tag: 'observe', title: 'Compare to your prediction', sheet: 2, text: 'You predicted: {{pred:s1}}.',
      q: { type: 'mc', q: 'What happened to the mass when the ice melted?', choices: ['It stayed the same, 50 g', 'It went up because water is heavier', 'It went down because ice "shrinks"', 'It went to 0 because the ice disappeared'], answer: 0,
        fb: [null, 'Check the scale: it did not go up. Liquid water and ice made of the same particles have the same mass.', 'The water may look smaller, but the scale shows the mass did not go down.', 'The ice did not disappear. It changed into liquid water, and the scale still reads 50 g.'],
        why: 'Melting only changes how the particles are arranged. No particles are added or taken away, so the mass is conserved.' } },
    { tag: 'record', title: 'Collect more data', sheet: 3, text: 'Scientists repeat tests. Run two more trials with different amounts of ice. Keep the lid sealed each time.',
      q: { type: 'table', q: 'For each row, press the ice amount, melt it with the lid sealed, and type the scale readings.', rowHead: 'Trial',
        cols: [{ label: 'Mass of ice before', unit: 'g', value: function (s) { return s.startMass; } }, { label: 'Mass of water after', unit: 'g', value: function (s) { return s.mass; }, tol: 0.2 }],
        rows: [{ label: 'Trial A: 20 g of ice', when: { startMass: 20, melted: true, lid: 'sealed', lost: 0 }, setup: 'press "20 g", keep the lid sealed, and melt all the ice' }, { label: 'Trial B: 100 g of ice', when: { startMass: 100, melted: true, lid: 'sealed', lost: 0 }, setup: 'press "100 g", keep the lid sealed, and melt all the ice' }],
        hint: 'Melt ALL the ice first. The "Ice left" reading should say 0.' } },
    { tag: 'reason', title: 'Look for a pattern', sheet: 3,
      q: { type: 'mc', q: 'Look at all three trials (50 g, 20 g, 100 g). What pattern do you see?', choices: ['The mass after melting always equals the mass before', 'Bigger ice cubes lose more mass', 'The mass always goes up by a little', 'There is no pattern'], answer: 0,
        fb: [null, 'Check trial B. 100 g of ice became 100 g of water. Nothing was lost.', 'Look at your table again. Before and after were equal every time.', 'There is a pattern: before and after match every time.'] } },
    { tag: 'test', title: 'Now open the lid', sheet: 4, text: 'What if the container is **not** sealed? Open the lid and heat the water hot enough to make vapor.',
      goal: { text: 'Open the lid, heat the water to 80 °C or more, and let the scale drop by at least 3 g.', check: { lid: 'open', lost: { gte: 3 } }, hint: 'Choose 🔓 Open, set the hot plate to 100 °C, and use ⏩ 5×.' },
      q: { type: 'mc', q: 'The mass went DOWN this time. Where did that matter go?', choices: ['It escaped into the air as water vapor', 'It was destroyed by the heat', 'It turned into nothing', 'The scale broke'], answer: 0,
        fb: [null, 'Heat cannot destroy matter. Watch the white vapor above the beaker. Where is it going?', 'Matter cannot turn into nothing. The water particles went somewhere you can\'t easily see.', 'The scale worked in the sealed trials. Something left the beaker this time.'],
        why: 'The water particles gained energy and spread out as water vapor. With the lid open, they left the beaker, so the scale could not weigh them anymore.' } },
    { tag: 'reason', title: 'Catch the missing matter', sheet: 4,
      q: { type: 'num', q: 'Suppose you started with 100 g of water. After boiling it in an open beaker, the scale reads 88 g. How many grams of water vapor escaped into the air?', unit: 'g', answer: 12, hint: 'Start amount minus what is left = what escaped.', traps: [[188, 'You added. The vapor LEFT the beaker, so subtract.'], [88, '88 g is what is still in the beaker. How much is missing?']], why: '100 − 88 = 12 g. If you could catch that vapor, the total would still be 100 g.' } },
    { tag: 'test', title: 'Freeze it back', sheet: 5, text: 'Cooling is a change of state too. Seal the lid, melt a new ice sample, then cool it until it freezes again.',
      goal: { text: 'With the lid sealed, turn melted water back into ice (set the plate below 0 °C).', check: { refrozen: true, lid: 'sealed' }, hint: 'Melt it first, then drag the slider to −20 °C and use ⏩ 5×.' },
      q: { type: 'mc', q: 'What did the scale show when the water froze again?', choices: ['The same mass as before', 'More mass because ice is solid', 'Less mass because cold makes things lighter'], answer: 0,
        fb: [null, 'Ice feels solid, but the scale shows the same mass. Freezing does not add particles.', 'Cooling does not remove particles. Check the scale.'] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend challenge: a trick question', sheet: 5,
      q: { type: 'mc', q: 'A sealed bottle of water freezes in a freezer and the ice cracks the bottle open. Which statement is true?', choices: ['The mass stayed the same; ice takes up MORE space than water', 'The ice has more mass, so it pushed the bottle', 'Freezing added air particles', 'The mass went down, so it shrank'], answer: 0, why: 'Water expands when it freezes: the particles lock into a spaced-out pattern. The volume grows, but the mass does not change.' } },
    { tag: 'explain', title: 'Explain it to a classmate', sheet: 6, text: 'Lena says: "Ice gets lighter when it melts because the water looks smaller."',
      q: { type: 'text', q: 'Is Lena right? Explain using a number from your data.', number: true, rows: 3,
        starter: 'Lena is not right because when the ice melted, the mass',
        bank: ['stayed the same', 'particles', 'sealed', 'grams', 'conserved'],
        need: [{ words: ['same', 'equal', 'did not change', "didn't change", 'stayed', 'conserved'], label: 'Says the mass stayed the same' }, { words: ['particle', 'matter', 'water', 'molecule'], label: 'Talks about the matter or particles' }],
        legendNeed: [{ words: ['sealed', 'closed', 'lid'], label: 'Legend: explains why the container being sealed matters' }],
        hint: 'Use your data: 50 g of ice became ___ g of water.', model: 'Lena is not right. When 50 g of ice melted in the sealed beaker, the water was still 50 g. The particles only changed their arrangement, so the mass stayed the same.' } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 7, text: 'Answer the lab question with a Claim, Evidence, and Reasoning. The checker makes sure each part is there.',
      q: { type: 'write', q: 'Does matter disappear when it melts, freezes, or evaporates?',
        parts: [
          { label: 'Claim', help: 'Answer the question in one sentence.', starter: 'Matter does not', min: 6, need: [{ words: ['not', "doesn't", 'never', 'no'], label: 'States that matter does not disappear' }], frames: ['Matter does not disappear when', 'The mass stays the same when'] },
          { label: 'Evidence', help: 'Use numbers from your data table.', starter: 'In my test,', min: 10, number: true, need: [{ words: ['g', 'gram', 'grams'], label: 'Gives masses in grams' }], frames: ['In my test, ___ g of ice became ___ g of water.', 'When the lid was open, the mass dropped to'] },
          { label: 'Reasoning', help: 'Explain WHY using what you know about particles.', starter: 'This happens because', min: 12, need: [{ words: ['particle', 'molecule', 'matter'], label: 'Uses the idea of particles or matter' }, { words: ['vapor', 'escape', 'air', 'gas', 'left'], label: 'Explains where the "missing" mass went in the open beaker' }], frames: ['This happens because the particles', 'When the lid was open, the water vapor'] }
        ] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-fizz-lab', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.1–5.PS.2',
  title: 'Fizz Lab', model: 'fizzLab', minutes: 25, icon: '🫧',
  place: 'Sunnyside Science Lab · Chemistry Corner',
  mission: 'When vinegar and baking soda mix, they fizz and make a gas. Some students say the fizz makes matter vanish. Mix them on a digital scale with an open flask, a balloon, and a stopper to find out where the mass goes.',
  question: 'When two substances mix and make a new substance, is the total mass conserved?',
  takeaway: 'Mixing vinegar and baking soda makes new substances, including carbon dioxide gas. The total mass stays the same when the gas is trapped (balloon). In an open flask the gas escapes, so the scale drops even though no matter was destroyed.',
  vocab: [['Chemical reaction', 'Substances combine to make new substances.'], ['Gas', 'Matter that spreads out to fill its container. Hard to see, but it has mass.'], ['Carbon dioxide', 'The gas made when vinegar and baking soda react.'], ['Evidence', 'Observations that show something is true (bubbles, temperature change, new substance).'], ['Conservation of mass', 'The total mass before and after a change is the same in a sealed system.']],
  warmup: {
    style: 'Which one doesn\'t belong?', prompt: 'Circle the one that doesn\'t belong and explain why.',
    items: [['Melting ice · cutting paper · burning a candle · tearing foil', 'Burning a candle. It makes new substances (a chemical change); the others only change shape or state.'], ['Air · water · a rock · a shadow', 'A shadow. It is not matter; the others have mass and take up space.'], ['Bubbles · color change · temperature change · smaller pieces', 'Smaller pieces. The others are evidence of a chemical reaction.']]
  },
  steps: [
    { tag: 'explore', title: 'Set up your reaction', text: 'The scale shows the **total** mass of everything on it: the flask of vinegar, the cup of baking soda, and the cover.',
      goal: { text: 'Choose **Open flask**, then press **Pour the baking soda in** and watch.', check: { poured: true, cover: 'open', done: true }, hint: 'The cover buttons are under the sliders.' },
      q: { type: 'multi', q: 'What evidence of a chemical reaction did you observe? Use the simulation and the readouts.', choices: ['Bubbles of gas formed', 'The temperature dropped', 'The vinegar changed color to blue', 'The scale reading changed'], answer: [0, 1, 3], hint: 'Watch the Temperature readout and the Gas made readout.' } },
    { tag: 'observe', title: 'What happened to the mass?', sheet: 1,
      q: { type: 'num', q: 'How many grams did the scale go DOWN in the open flask? (Before minus after.)', unit: 'g', answer: function (s) { return Math.round((s.before - s.after) * 10) / 10; }, tol: 0.15, hint: 'The scale started at {{val:before}} g. What does it read now?' } },
    { tag: 'predict', title: 'Predict: trap the gas', sheet: 2,
      q: { type: 'predict', q: 'Now you will put a balloon over the flask to trap the gas. What will happen to the total mass?', choices: ['It will go down, like before', 'It will stay the same', 'It will go up'] } },
    { tag: 'test', title: 'Test it with a balloon', sheet: 2, text: 'Press **↺ Reset**, choose **🎈 Balloon**, and pour again.',
      goal: { text: 'Run the reaction with the balloon on.', check: { cover: 'balloon', done: true, poured: true } },
      q: { type: 'mc', q: 'You predicted: {{pred:s2}}. What did the scale do this time?', choices: ['It stayed the same', 'It went down', 'It went up'], answer: 0, fb: [null, 'Look again: with the balloon the gas cannot leave, so it is still weighed.', 'The balloon did not add matter. The same particles just rearranged.'], why: 'The balloon trapped the carbon dioxide. Every particle stayed on the scale, so the total mass was conserved.' } },
    { tag: 'record', title: 'Record a data table', sheet: 3, text: 'Run each trial with **10 g of baking soda** and **100 g of vinegar**.',
      q: { type: 'table', q: 'Record the scale before and after for each cover.', rowHead: 'Cover',
        cols: [{ label: 'Total before', unit: 'g', value: function (s) { return s.before; }, tol: 0.15 }, { label: 'Total after', unit: 'g', value: function (s) { return s.after; }, tol: 0.15 }],
        rows: [{ label: 'Open flask', when: function (s) { return s.cover === 'open' && s.done && s.soda === 10 && s.vin === 100; }, setup: 'reset, set 10 g soda and 100 g vinegar, choose Open flask, and pour' }, { label: 'Balloon', when: function (s) { return s.cover === 'balloon' && s.done && s.soda === 10 && s.vin === 100; }, setup: 'reset, set 10 g soda and 100 g vinegar, choose Balloon, and pour' }] } },
    { tag: 'test', title: 'The stopper surprise', sheet: 4, text: 'A rubber stopper seals the flask tightly. Try it!',
      goal: { text: 'Run the reaction with the **Rubber stopper**.', check: { cover: 'stopper', done: true } },
      q: { type: 'mc', q: 'The stopper popped off! Why did the mass go down after it popped?', choices: ['The trapped gas pushed the stopper out and escaped', 'The stopper destroyed the gas', 'Gas has no mass, so nothing changed', 'The vinegar evaporated instantly'], answer: 0, fb: [null, 'A stopper can\'t destroy matter.', 'The scale DID change, so the gas must have mass.', 'Only the gas left; the vinegar is still in the flask.'], why: 'The gas particles pushed on the stopper until it popped. Then the gas escaped, taking its mass with it.' } },
    { tag: 'reason', title: 'Does the amount matter?', sheet: 5, text: 'Change the amount of baking soda and run a trial with the balloon.',
      goal: { text: 'Run a balloon trial with **20 g** of baking soda.', check: { cover: 'balloon', done: true, soda: 20 } },
      q: { type: 'mc', q: 'With 20 g of soda, some white powder was left over. What does that tell you?', choices: ['The vinegar ran out, so the rest of the soda could not react', 'Baking soda doesn\'t react with vinegar', 'The mass was destroyed', 'The balloon stopped the reaction'], answer: 0, hint: 'Check the flask: is there still powder at the bottom?', why: 'Reactions need both substances. When the acid in the vinegar is used up, extra baking soda stays unreacted, but all of it is still on the scale.' } },
    { tag: 'apply', title: 'Real-world case', sheet: 5,
      q: { type: 'mc', q: 'A baker weighs bread dough (500 g), bakes it, and the bread weighs 450 g. Which explanation fits what you learned?', choices: ['Water vapor and gas escaped from the dough while baking', 'The oven destroyed 50 g of matter', 'Bread is lighter because it is fluffy', 'The scale was broken'], answer: 0, why: 'Like the open flask, gases and water vapor escaped into the air. If you could trap them, the total would still be 500 g.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: design the experiment', sheet: 6,
      q: { type: 'order', q: 'Put the steps in order to PROVE mass is conserved in this reaction.', items: ['Put the balloon over the flask', 'Weigh everything together before mixing', 'Tip the baking soda from the balloon into the vinegar', 'Weigh everything again after the fizzing stops', 'Compare the two masses'] } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 7,
      q: { type: 'write', q: 'When two substances mix and make a new substance, is the total mass conserved?', parts: [
        { label: 'Claim', starter: 'The total mass', min: 6, need: [{ words: ['same', 'conserved', 'equal', 'stay'], label: 'Says the mass stays the same (is conserved)' }] },
        { label: 'Evidence', starter: 'With the balloon, the scale', min: 10, number: true, need: [{ words: ['balloon', 'sealed', 'trapped'], label: 'Uses the balloon (sealed) trial' }, { words: ['open', 'went down', 'dropped', 'escaped'], label: 'Compares it to the open flask' }] },
        { label: 'Reasoning', starter: 'This is because', min: 12, need: [{ words: ['gas', 'carbon dioxide', 'particles'], label: 'Explains using the gas or particles' }, { words: ['escape', 'left', 'air', 'trapped'], label: 'Explains where the gas went' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-measure-lab', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.1',
  title: 'Measure Lab: Mass & Volume', model: 'measureLab', minutes: 25, icon: '⚖️',
  place: 'Sunnyside Science Lab · Measuring Station',
  mission: 'The lab needs a measurement report for 5 mystery objects. Weigh them on the balance and use water displacement in a graduated cylinder to find the volume of objects with weird shapes.',
  question: 'How can we measure the mass and volume of any object, even a lumpy one?',
  takeaway: 'Mass is measured with a balance in grams. Volume is the space an object takes up. For odd shapes, measure how much the water level rises in a graduated cylinder (1 mL = 1 cm³). Changing an object\'s shape does not change its mass.',
  vocab: [['Mass', 'The amount of matter, measured in grams (g) with a balance.'], ['Volume', 'The amount of space something takes up, in mL or cm³.'], ['Graduated cylinder', 'A tall tube with marks for measuring liquid volume.'], ['Displacement', 'Water pushed out of the way by an object. The rise equals the object\'s volume.'], ['Meniscus', 'The curved top of water. Read the bottom of the curve.']],
  warmup: {
    style: 'Estimation station', prompt: 'Estimate first, then give a reason. Close is good!',
    items: [['About how many grams is a paper clip? (1 g, 100 g, or 1,000 g)', 'About 1 g.'], ['A water bottle holds 500 mL. About how many mL is a spoonful?', 'About 5 mL (a teaspoon).'], ['Which takes up more space: 1 kg of rocks or 1 kg of popcorn?', 'Popcorn: same mass, much more volume.']]
  },
  steps: [
    { tag: 'explore', title: 'Use the balance', text: 'Drag the **rock** from the shelf onto the balance.',
      goal: { text: 'Put the rock on the balance.', check: { scale: 'rock' } },
      q: { type: 'num', q: 'What is the mass of the rock?', unit: 'g', answer: 54, hint: 'Read the balance display.' } },
    { tag: 'model', title: 'Read the cylinder', text: 'The cylinder starts with water. Look through the magnifier. Read the **bottom of the curve** (the meniscus).', idea: 'Each small line on the cylinder is **2 mL**.',
      q: { type: 'num', q: 'How much water is in the cylinder right now?', unit: 'mL', answer: 50 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'What will happen to the water level when you drop the rock in?', choices: ['It will go up', 'It will stay the same', 'It will go down'] } },
    { tag: 'test', title: 'Water displacement', sheet: 1, text: 'Take the rock off the balance and drag it into the cylinder.',
      goal: { text: 'Put only the rock in the cylinder.', check: { cyl: 'rock' } },
      q: { type: 'num', q: 'The water rose from 50 mL to {{val:level}} mL. What is the rock\'s volume?', unit: 'mL', answer: 20, hint: 'New level − starting level = volume of the rock.', traps: [[70, '70 mL is the new water level. Subtract the 50 mL that was already there.']], strategy: 'Volume of object = level after − level before.' } },
    { tag: 'record', title: 'Measurement report', sheet: 2, text: 'Measure three more objects. Use the balance for mass. Put each object **alone** in the cylinder for volume.',
      q: { type: 'table', q: 'Fill in the report. (Put each object on the balance and in the cylinder, then type what you read.)', rowHead: 'Object', tip: 'Each row checks the object you have on the balance or in the cylinder right now.',
        cols: [{ label: 'Mass', unit: 'g', value: function (s, r) { return r.values[0]; } }, { label: 'Volume', unit: 'mL', value: function (s, r) { return r.values[1]; } }],
        rows: [{ label: 'Glass marble', values: [12.5, 5], when: function (s) { return s.massed_marble && s.dunked_marble; }, setup: 'weigh the marble and drop it in the cylinder' }, { label: 'Metal key', values: [16, 2], when: function (s) { return s.massed_key && s.dunked_key; }, setup: 'weigh the key and drop it in the cylinder' }, { label: 'Toy dinosaur', values: [22, 14], when: function (s) { return s.massed_dino && s.dunked_dino; }, setup: 'weigh the dinosaur and drop it in the cylinder' }] } },
    { tag: 'reason', title: 'Compare', sheet: 3,
      q: { type: 'mc', q: 'The key has MORE mass than the marble but LESS volume. What does that show?', choices: ['Mass and volume are different properties', 'The balance is wrong', 'Bigger objects always have more mass', 'Volume and mass are the same thing'], answer: 0, why: 'Mass is how much matter; volume is how much space. A small metal key packs a lot of matter into a small space.' } },
    { tag: 'predict', title: 'Predict: squish the clay', sheet: 4, q: { type: 'predict', q: 'If you squish the clay ball into a flat pancake, its mass will...', choices: ['go up', 'stay the same', 'go down'] } },
    { tag: 'test', title: 'Squish test', sheet: 4, text: 'Weigh the clay ball, then squish it with the button while it is on the balance.',
      goal: { text: 'Put the clay on the balance and squish it into a pancake.', check: { scale: 'clay', clayFlat: true } },
      q: { type: 'mc', q: 'You predicted the mass would {{pred:s6}}. What did the balance show?', choices: ['Still 36 g: the same', 'More than 36 g', 'Less than 36 g'], answer: 0, why: 'Changing shape does not add or remove matter. The mass is conserved.' } },
    { tag: 'apply', title: 'Two objects at once', sheet: 5, text: 'Put the **marble** AND the **key** in the cylinder together.',
      goal: { text: 'Put the marble and the key in the cylinder at the same time.', check: { cyl: 'marble+key' } },
      q: { type: 'num', q: 'What is the new water level?', unit: 'mL', answer: 57, hint: '50 mL + marble volume + key volume.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: box volume', sheet: 5,
      q: { type: 'num', q: 'A box is 4 cm long, 3 cm wide, and 2 cm tall. It sinks in the cylinder. How many mL will the water rise? (1 cm³ = 1 mL)', unit: 'mL', answer: 24, work: true, why: '4 × 3 × 2 = 24 cm³, and 24 cm³ of space pushes up 24 mL of water.' } },
    { tag: 'explain', title: 'Explain the method', sheet: 6,
      q: { type: 'text', q: 'Explain to a new lab assistant how to find the volume of a lumpy rock.', rows: 3, starter: 'First, read the water level. Then',
        need: [{ words: ['water', 'cylinder'], label: 'Mentions the water in the cylinder' }, { words: ['rise', 'rises', 'goes up', 'higher', 'difference', 'subtract', 'minus'], label: 'Explains how to use the rise (subtract)' }], number: false, model: 'Read the water level first (50 mL). Drop the rock in and read the new level. Subtract: the rise is the rock\'s volume.' } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-property-bench', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.1',
  title: 'Property Detective Bench', model: 'propBench', minutes: 25, icon: '🧲',
  place: 'Sunnyside Science Lab · Testing Bench',
  mission: 'A mystery sample X was found in the lab. Test known materials with a magnet, an electric circuit, and water. Then use the properties to figure out what sample X is made of.',
  question: 'How can observable properties identify a material?',
  takeaway: 'Every material has properties you can observe and test: whether a magnet attracts it, whether it conducts electricity, and whether it floats, sinks, or dissolves in water. Matching properties can identify an unknown material.',
  vocab: [['Property', 'A trait you can observe or measure, like hardness or magnetism.'], ['Magnetic', 'Attracted by a magnet (iron, steel, nickel).'], ['Conductor', 'Lets electricity flow through it; metals are good conductors.'], ['Insulator', 'Does not let electricity flow (wood, plastic, rubber).'], ['Dissolve', 'Mix into a liquid so completely you cannot see it.']],
  warmup: {
    style: 'Two truths and a lie', prompt: 'Two statements are true and one is false. Find the lie and fix it.',
    items: [['A. All metals stick to magnets. B. Wood floats. C. Salt dissolves in water.', 'A is the lie: only some metals (like iron) are magnetic.'], ['A. Copper wires carry electricity. B. Plastic covers wires to keep us safe. C. Rubber is a great conductor.', 'C is the lie: rubber is an insulator.'], ['A. Sand dissolves in water. B. Sugar dissolves in water. C. A penny sinks.', 'A is the lie: sand does not dissolve.']]
  },
  steps: [
    { tag: 'explore', title: 'Run your first test', text: 'Tap a material, then tap a test station.', goal: { text: 'Test the **iron nail** with the magnet.', check: { t_nail_magnet: true } },
      q: { type: 'mc', q: 'What did the magnet do to the iron nail?', choices: ['It attracted (pulled) the nail', 'Nothing happened', 'It pushed the nail away'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'Will the magnet attract the copper wire and the aluminum foil too? They are metals.', choices: ['Yes, magnets attract all metals', 'No, only some metals are attracted', 'Only the foil'] } },
    { tag: 'test', title: 'Test the other metals', sheet: 1, goal: { text: 'Test the **copper wire** and the **aluminum foil** with the magnet.', check: { t_copper_magnet: true, t_foil_magnet: true } },
      q: { type: 'mc', q: 'You predicted: {{pred:s1}}. What did you find?', choices: ['Only iron was attracted; copper and aluminum were not', 'All three metals were attracted', 'None of the metals were attracted'], answer: 0, why: 'Magnetism is a property of only a few metals, like iron. It is a useful clue for identifying a material.' } },
    { tag: 'record', title: 'Property chart', sheet: 2, text: 'Run all three tests on each material in the table.',
      q: { type: 'table', q: 'Record the results. Type yes/no, or floats/sinks/dissolves.', rowHead: 'Material',
        cols: [{ label: 'Magnetic?', value: function (s, r) { return r.values[0]; }, accept: [] }, { label: 'Conducts?', value: function (s, r) { return r.values[1]; } }, { label: 'In water', value: function (s, r) { return r.values[2]; } }],
        rows: [{ label: 'Wood block', values: ['no', 'no', 'floats'], when: { all_wood: true }, setup: 'run all 3 tests on the wood block' }, { label: 'Copper wire', values: ['no', 'yes', 'sinks'], when: { all_copper: true }, setup: 'run all 3 tests on the copper wire' }, { label: 'Salt', values: ['no', 'no', 'dissolves'], when: { all_salt: true }, setup: 'run all 3 tests on the salt' }] } },
    { tag: 'sort', title: 'Conductors vs. insulators', sheet: 3, goal: { text: 'Run the circuit test on at least 5 materials.', check: function (s) { return Object.keys(s).filter(function (k) { return /^t_\w+_conduct$/.test(k); }).length >= 5; } },
      q: { type: 'sort', q: 'Sort the materials by what the bulb did.', bins: ['Conductor (bulb lit)', 'Insulator (bulb off)'], items: [['Iron nail', 0], ['Copper wire', 0], ['Aluminum foil', 0], ['Wood block', 1], ['Plastic spoon', 1], ['Salt (dry)', 1]] } },
    { tag: 'reason', title: 'Why wires are built this way', sheet: 3,
      q: { type: 'mc', q: 'Electric cords have copper inside and plastic outside. Use your test results to explain why.', choices: ['Copper conducts electricity; plastic insulates so we don\'t get shocked', 'Plastic conducts better than copper', 'Copper is magnetic so it holds the plastic', 'It is only for color'], answer: 0 } },
    { tag: 'test', title: 'Test the mystery sample', sheet: 4, goal: { text: 'Run all three tests on **Mystery sample X**.', check: { all_mystery: true } },
      q: { type: 'mc', q: 'Sample X is magnetic, conducts electricity, and sinks. Which material matches ALL of its properties?', choices: ['Iron', 'Copper', 'Wood', 'Salt'], answer: 0, fb: [null, 'Copper conducts, but is it magnetic? Check your chart.', 'Wood floats and doesn\'t conduct.', 'Salt dissolves.'], why: 'Only iron matched all three properties. Using several properties is stronger evidence than just one.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: one test is not enough', sheet: 5,
      q: { type: 'mc', q: 'If you had ONLY run the circuit test on sample X, could you know it was iron?', choices: ['No. Copper and aluminum also conduct, so more tests were needed', 'Yes, only iron conducts', 'Yes, the bulb is always brighter for iron'], answer: 0 } },
    { tag: 'write', title: 'Identify sample X (CER)', sheet: 6,
      q: { type: 'write', q: 'What is Mystery sample X made of?', parts: [
        { label: 'Claim', starter: 'Sample X is', min: 4, need: [{ words: ['iron'], label: 'Names the material (iron)' }] },
        { label: 'Evidence', starter: 'In my tests, sample X', min: 12, need: [{ words: ['magnet'], label: 'Uses the magnet test' }, { words: ['conduct', 'bulb', 'electric'], label: 'Uses the circuit test' }, { words: ['sink', 'sank', 'water'], label: 'Uses the water test' }] },
        { label: 'Reasoning', starter: 'This shows it is iron because', min: 10, need: [{ words: ['same', 'match', 'matches', 'like the nail', 'only'], label: 'Explains that the properties match iron' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-mix-separate', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.2',
  title: 'Mix & Separate Lab', model: 'mixLab', minutes: 25, icon: '🥣',
  place: 'Sunnyside Science Lab · Recycling Station',
  mission: 'The recycling station received a messy mixture of sand, salt, iron filings, and water. Make the mixture on a scale, then separate every part and weigh it. Can you get back ALL the mass?',
  question: 'When we mix substances and then separate them, is any mass lost?',
  takeaway: 'In a mixture, each substance keeps its own properties, so we can separate them: a magnet pulls iron, a filter catches sand, and evaporation leaves salt behind. If we catch the water vapor too, the separated parts add up to the same total mass as the mixture.',
  vocab: [['Mixture', 'Two or more substances mixed together that keep their own properties.'], ['Solution', 'A mixture where one substance dissolves in another (salt water).'], ['Filter', 'A tool that lets liquid through but catches solid pieces.'], ['Evaporate', 'Change from liquid to gas when heated.'], ['Condenser', 'A cool tube that turns steam back into liquid water.']],
  warmup: {
    style: 'Real-world riddle', prompt: 'Answer each riddle with a separating tool and a reason.',
    items: [['You dropped paper clips in the sandbox. How can you get them out fast?', 'A magnet: steel clips are magnetic, sand is not.'], ['How does a pasta strainer separate pasta from water?', 'It is a filter: water passes through holes, pasta is too big.'], ['How could you get salt back from salt water?', 'Evaporate the water: heat it until only salt is left.']]
  },
  steps: [
    { tag: 'explore', title: 'Make the mixture', sheet: 1, text: 'Add at least **20 g of sand, 10 g of salt, 10 g of iron, and water**. Watch the bowl\'s scale.',
      goal: { text: 'Add all four ingredients to the bowl.', check: function (s) { return s.sand >= 20 && s.salt >= 10 && s.iron >= 10 && s.bowl > 0 && s.ingredients === 4; } },
      q: { type: 'num', q: 'What is the total mass of your mixture? Write it in box 1.', unit: 'g', answer: function (s) { return s.mixTotal; }, hint: 'Read the Bowl (mixture) display.' } },
    { tag: 'observe', title: 'Where did the salt go?', q: { type: 'mc', q: 'After you added water, the salt grains disappeared from view. Is the salt still in the bowl?', choices: ['Yes. It dissolved but is still there; the scale did not go down', 'No, the water destroyed it', 'No, it evaporated'], answer: 0, why: 'Dissolving mixes salt particles evenly into the water. They are too small to see, but they are still there (and still have mass).' } },
    { tag: 'predict', title: 'Plan the order', sheet: 2, q: { type: 'predict', q: 'Which tool should you use FIRST?', choices: ['Magnet: pull out the iron', 'Evaporate: boil off the water', 'Filter: catch the sand'] } },
    { tag: 'test', title: 'Pull out the iron', sheet: 2, goal: { text: 'Use the **🧲 Magnet**.', check: { usedMagnet: true } },
      q: { type: 'mc', q: 'Why does the magnet separate ONLY the iron?', choices: ['Iron is magnetic; sand, salt, and water are not', 'The magnet is too weak for sand', 'Iron is the heaviest'], answer: 0 } },
    { tag: 'test', title: 'Filter the sand', goal: { text: 'Use the **⏳ Filter**.', check: { usedFilter: true } },
      q: { type: 'mc', q: 'Salt water went through the filter but sand did not. Why?', choices: ['Sand grains are too big to pass; dissolved salt particles are tiny', 'Sand is magnetic', 'Salt is heavier than sand'], answer: 0 } },
    { tag: 'test', title: 'Evaporate the water', sheet: 3, text: 'Keep **Catch the steam** on so the water is collected.',
      goal: { text: 'Evaporate all the water.', check: { separated: true, lostSteam: 0 } },
      q: { type: 'num', q: 'Add up the four dishes. What is the total mass of the separated parts?', unit: 'g', answer: function (s) { return s.recovered; }, work: true, hint: 'Iron + sand + salt + water. The display "Separated parts total" can help you check.' } },
    { tag: 'reason', title: 'Compare the totals', sheet: 3,
      q: { type: 'mc', q: 'Compare the mixture total (box 1) with the separated total. What do you notice?', choices: ['They are equal: no mass was lost', 'The separated total is less', 'The separated total is more'], answer: 0, why: 'Mixing and separating only rearrange substances. The total mass is conserved.' } },
    { tag: 'test', title: 'What if steam escapes?', sheet: 4, text: 'Press ↺ Start over. Make any mixture with water, turn **Catch the steam OFF**, and evaporate.',
      goal: { text: 'Evaporate with the condenser OFF.', check: function (s) { return s.lostSteam > 0; } },
      q: { type: 'mc', q: 'The separated total is less than the mixture this time. Was matter destroyed?', choices: ['No. The water became vapor and escaped into the air', 'Yes. Heat destroys water', 'Yes. Salt disappears when heated'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: plan it in order', sheet: 5,
      q: { type: 'order', q: 'Put the separation steps in the best order to get every part back.', items: ['Use the magnet to remove the iron', 'Pour through the filter to catch the sand', 'Heat the salt water with a condenser', 'Weigh each dish and add the masses'] } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 6,
      q: { type: 'write', q: 'When we mix substances and then separate them, is any mass lost?', parts: [
        { label: 'Claim', starter: 'No mass is lost when', min: 6, need: [{ words: ['no', 'not', 'same', 'conserved'], label: 'Answers the question' }] },
        { label: 'Evidence', starter: 'My mixture had a mass of', min: 12, number: true, need: [{ words: ['separated', 'parts', 'dishes', 'total'], label: 'Compares the mixture total and the separated total' }] },
        { label: 'Reasoning', starter: 'This happens because', min: 12, need: [{ words: ['properties', 'magnetic', 'filter', 'dissolve', 'evaporate'], label: 'Uses the properties that let us separate them' }, { words: ['matter', 'particles', 'conserved', 'not destroyed'], label: 'Explains that matter is not created or destroyed' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-dissolve-lab', std: 'g5-sci-matter', subject: 'science', grade: 5, code: '5.PS.1–5.PS.2',
  title: 'Sugar Dissolve Lab', model: 'dissolveLab', minutes: 25, icon: '🍬',
  place: 'Sunnyside Science Lab · Kitchen Chemistry',
  mission: 'The cafeteria wants to make lemonade faster. Test how water temperature and stirring change how fast sugar dissolves, and prove the sugar is still there even after you can\'t see it.',
  question: 'What happens to sugar\'s mass when it dissolves, and what makes it dissolve faster?',
  takeaway: 'Dissolved sugar breaks into particles too small to see, but the mass stays the same. Hotter water and stirring make particles move and mix faster, so sugar dissolves faster.',
  vocab: [['Dissolve', 'When a solid mixes into a liquid so evenly you cannot see it.'], ['Solution', 'A mixture where one substance is dissolved in another.'], ['Variable', 'Something you change or measure in an experiment.'], ['Fair test', 'Changing only ONE variable at a time.'], ['Particles', 'Tiny pieces of matter too small to see.']],
  warmup: {
    style: 'Notice & wonder', prompt: 'Picture a glass of iced tea with a spoonful of sugar at the bottom. Write 2 things you notice and 1 thing you wonder.',
    items: [['What do you notice about sugar in cold tea versus hot tea?', 'Sugar dissolves faster in hot tea; it can sit at the bottom of cold tea.'], ['If sugar disappears into tea, how could you prove it is still there?', 'Taste it (sweet), or weigh it: the mass stays the same.'], ['What could you do to make sugar dissolve faster?', 'Stir it, use warmer water, or crush it into smaller pieces.']]
  },
  steps: [
    { tag: 'predict', title: 'Predict the mass', sheet: 1, q: { type: 'predict', q: 'The beaker + water + 2 sugar cubes weigh 310 g. After the sugar dissolves, the scale will read...', choices: ['Less than 310 g', 'Exactly 310 g', 'More than 310 g'] } },
    { tag: 'test', title: 'Dissolve the sugar', sheet: 1, goal: { text: 'Drop in 2 sugar cubes and wait until they fully dissolve.', check: { dissolved: true } },
      q: { type: 'num', q: 'What does the scale read now?', unit: 'g', answer: 310, why: 'The sugar particles spread out between the water particles, but they are all still in the beaker.' } },
    { tag: 'observe', title: 'Invisible but there', q: { type: 'mc', q: 'You predicted: {{pred:s0}}. Why can\'t you see the sugar anymore?', choices: ['It broke into particles too small to see and mixed evenly', 'It turned into water', 'It was destroyed', 'It floated away as gas'], answer: 0 } },
    { tag: 'predict', title: 'Plan a fair test', sheet: 2, q: { type: 'mc', q: 'You want to test if TEMPERATURE changes dissolving speed. What should you keep the same?', choices: ['Stirring and number of cubes', 'Nothing', 'Only the beaker color', 'The temperature'], answer: 0, why: 'In a fair test you change only one variable (temperature) and keep everything else the same.' } },
    { tag: 'record', title: 'Temperature trials', sheet: 3, text: 'Keep **Stir OFF**. Use fresh water each time.',
      q: { type: 'table', q: 'Run each temperature and record the timer when the sugar is gone.', rowHead: 'Water temp',
        cols: [{ label: 'Time to dissolve', unit: 's', value: function (s, r) { return s['time_' + r.t]; }, tol: 1.1 }],
        rows: [{ label: '10 °C (cold)', t: 10, when: function (s) { return s.done_10; }, setup: 'set 10 °C, stir off, drop in cubes' }, { label: '40 °C (warm)', t: 40, when: function (s) { return s.done_40; }, setup: 'set 40 °C, stir off, drop in cubes' }, { label: '80 °C (hot)', t: 80, when: function (s) { return s.done_80; }, setup: 'set 80 °C, stir off, drop in cubes' }] } },
    { tag: 'reason', title: 'Read the graph', sheet: 4, q: { type: 'mc', q: 'Look at the graph. As the temperature goes up, the time to dissolve...', choices: ['goes down (faster)', 'goes up (slower)', 'stays the same'], answer: 0, why: 'In hot water, particles move faster and bump the sugar more often, pulling sugar particles away sooner.' } },
    { tag: 'test', title: 'Test stirring', sheet: 5, goal: { text: 'Run a trial at **40 °C with Stir ON**.', check: { done_40s: true } },
      q: { type: 'num', q: 'How many seconds did it take with stirring? Compare it to 40 °C without stirring.', unit: 's', answer: function (s) { return s.time_40s; }, tol: 1.1 } },
    { tag: 'apply', title: 'The lemonade plan', sheet: 5, q: { type: 'mc', q: 'The cafeteria makes lemonade with cold water. What is the BEST advice from your data?', choices: ['Dissolve the sugar in a little warm water and stir, then add cold water', 'Add more sugar cubes so it dissolves faster', 'Don\'t stir, just wait', 'Use colder water'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: explain the particles', sheet: 6, q: { type: 'text', q: 'Explain in terms of particles why stirring makes sugar dissolve faster.', need: [{ words: ['particle', 'molecule'], label: 'Uses particles' }, { words: ['move', 'moving', 'bump', 'spread', 'mix'], label: 'Describes movement or mixing' }], min: 12 } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 7, q: { type: 'write', q: 'What happens to sugar\'s mass when it dissolves, and what makes it dissolve faster?', parts: [
      { label: 'Claim', starter: 'When sugar dissolves, its mass', min: 8, need: [{ words: ['same', 'stays', 'conserved', 'does not change'], label: 'Mass stays the same' }, { words: ['hot', 'warm', 'stir'], label: 'Names what makes it faster' }] },
      { label: 'Evidence', starter: 'The scale read', min: 12, number: true, need: [{ words: ['310', 'scale', 'g'], label: 'Uses the scale reading' }, { words: ['seconds', 's', 'faster', 'time'], label: 'Uses timing data' }] },
      { label: 'Reasoning', starter: 'This is because the particles', min: 10, need: [{ words: ['particle'], label: 'Explains with particles' }] }] } }
  ]
});

/* ======================= 5.ESS: Earth, Sun, Moon & space ======================= */
SUNNY_SIMS.push({
  id: 'g5-sci-shadow-clock', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.1–5.ESS.2',
  title: 'Shadow Clock', model: 'shadowLab', minutes: 25, icon: '🕰️',
  place: 'Sunnyside School Playground · Sundial Garden',
  mission: 'The school garden is building a sundial. Move the Sun across the sky, mark the stick\'s shadow at different times and seasons, and discover the pattern that makes a shadow clock work.',
  question: 'Why do shadows change length and direction during the day and across the seasons?',
  takeaway: 'Earth\'s rotation makes the Sun appear to move from east to west, so shadows point west in the morning, north at noon, and east in the afternoon. Shadows are shortest when the Sun is highest. The Sun is higher in summer, so summer shadows are shorter.',
  vocab: [['Rotation', 'Earth spinning on its axis, once every 24 hours.'], ['Shadow', 'A dark area where an object blocks light.'], ['Sun height (altitude)', 'How high the Sun is above the horizon, in degrees.'], ['Pattern', 'Something that repeats in a predictable way.'], ['Solar noon', 'When the Sun is highest in the sky.']],
  warmup: { style: 'Quick sketch', prompt: 'Sketch and label, then answer.', items: [['Draw a flagpole and its shadow at 8 AM if the Sun is in the east.', 'Shadow points west (away from the Sun) and is long.'], ['When is your own shadow shortest: morning, noon, or evening?', 'Around noon, when the Sun is highest.'], ['Does the Sun really move across the sky? Explain.', 'No. Earth rotates; the Sun only appears to move.']] },
  steps: [
    { tag: 'explore', title: 'Move the Sun', text: 'Drag the **Time of day** slider and watch the shadow in the top view and the Sun in the sky view.', goal: { text: 'Move the time slider.', check: { movedTime: true } } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'In the morning the Sun is in the east. Which way will the shadow point?', choices: ['West, away from the Sun', 'East, toward the Sun', 'Straight down, no shadow'] } },
    { tag: 'test', title: 'Morning shadow', sheet: 1, goal: { text: 'Set the time to **9:00 AM** in **March**.', check: { time: 9, season: 'equinox' } },
      q: { type: 'mc', q: 'Which way does the 9:00 AM shadow point?', choices: ['Northwest', 'Southeast', 'South', 'East'], answer: 0, why: 'The Sun is in the southeast, so the shadow points the opposite way: northwest.' } },
    { tag: 'record', title: 'Record shadow data', sheet: 2, text: 'Stay in **March**. Set each time, then type the shadow length and direction you see.',
      q: { type: 'table', q: 'Shadow data for a 1-meter stick', rowHead: 'Time', cols: [{ label: 'Shadow length', unit: 'm', value: function (s) { return s.len; }, tol: 0.06 }, { label: 'Points', value: function (s) { return s.dir; }, accept: [] }],
        rows: [{ label: '7:00 AM', when: { time: 7, season: 'equinox' } }, { label: '12:00 PM (noon)', when: { time: 12, season: 'equinox' } }, { label: '3:00 PM', when: { time: 15, season: 'equinox' } }], hint: 'Directions are letters like N, NE, E. Read the "Shadow points" display.' } },
    { tag: 'reason', title: 'Find the pattern', sheet: 3, q: { type: 'mc', q: 'Use your table. When is the shadow shortest, and why?', choices: ['At noon, because the Sun is highest in the sky', 'At 7 AM, because the Sun is closest', 'At 3 PM, because it is warmest', 'It never changes'], answer: 0 } },
    { tag: 'reason', title: 'Why does the Sun move?', q: { type: 'mc', q: 'What really causes the Sun to seem to move from east to west each day?', choices: ['Earth rotates (spins) toward the east', 'The Sun orbits around Earth every day', 'Earth orbits the Sun every day', 'Clouds push the Sun'], answer: 0, fb: [null, 'It looks that way, but the Sun does not circle Earth. Earth spins.', 'One orbit takes a whole year, not a day.', 'Clouds do not move the Sun.'] } },
    { tag: 'test', title: 'Try a different season', sheet: 4, text: 'Mark the **noon** shadow in **June** and in **December**.', goal: { text: 'Mark the noon shadow in June and in December.', check: function (s) { return s.mark_summer_12 != null && s.mark_winter_12 != null; } },
      q: { type: 'num', q: 'How much LONGER is the December noon shadow than the June noon shadow?', unit: 'm', answer: function (s) { return Math.round((s.mark_winter_12 - s.mark_summer_12) * 10) / 10; }, tol: 0.11, work: true, hint: 'Subtract the June length from the December length.' } },
    { tag: 'explain', title: 'Explain seasons and shadows', sheet: 4, q: { type: 'mc', q: 'Why are winter shadows longer at noon?', choices: ['The Sun is lower in the winter sky', 'The Sun is farther from Earth in winter', 'The stick shrinks in the cold', 'There is less daylight'], answer: 0, why: 'In winter the Sun does not climb as high, so its light comes in at a lower angle and makes longer shadows.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: tell time by shadow', sheet: 5, q: { type: 'mc', q: 'In March, a shadow points northeast and is about 1.4 m long. About what time is it?', choices: ['3:00 PM', '9:00 AM', '12:00 PM', '6:00 PM'], answer: 0, why: 'NE shadows happen when the Sun is in the southwest: afternoon. 1.4 m matches 3:00 PM in your table.' } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 6, q: { type: 'write', q: 'Why do shadows change length and direction during the day?', parts: [
      { label: 'Claim', starter: 'Shadows change because', min: 6, need: [{ words: ['rotat', 'spin', 'sun moves', 'position'], label: 'Names the cause (Earth rotating / Sun position)' }] },
      { label: 'Evidence', starter: 'At 7 AM the shadow was', min: 12, number: true, need: [{ words: ['noon', '12'], label: 'Uses the noon data' }, { words: ['long', 'short'], label: 'Describes length' }] },
      { label: 'Reasoning', starter: 'This happens because', min: 12, need: [{ words: ['east', 'west'], label: 'Explains the east-to-west motion' }, { words: ['high', 'low', 'height', 'angle'], label: 'Connects Sun height to shadow length' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-day-night', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.1',
  title: 'Day & Night Spinner', model: 'spinEarth', minutes: 20, icon: '🌍',
  place: 'Sunnyside Space Center · Mission Control',
  mission: 'Mission Control needs to call astronauts\' families in Indiana, London, and Tokyo, but it is always a different time somewhere! Spin Earth to figure out how rotation creates day, night, and time zones.',
  question: 'How does Earth\'s rotation cause day and night?',
  takeaway: 'Earth spins on its axis once every 24 hours. The half facing the Sun has day; the half facing away has night. Because Earth rotates, places take turns facing the Sun, which is why it is daytime in Indiana while it is nighttime in Tokyo.',
  vocab: [['Axis', 'An imaginary line through the North and South Poles that Earth spins around.'], ['Rotation', 'One full spin of Earth on its axis (24 hours).'], ['Sunrise / sunset', 'When a place turns into or out of the Sun\'s light.'], ['Time zone', 'A region where everyone uses the same clock time.']],
  warmup: { style: 'True or false?', prompt: 'Write T or F. Fix each false one.', items: [['The Sun goes around Earth once a day.', 'False: Earth spins once a day.'], ['When it is day in Indiana, it is day everywhere.', 'False: the far side of Earth has night.'], ['Earth spins once every 24 hours.', 'True.']] },
  steps: [
    { tag: 'explore', title: 'Spin the planet', text: 'You are looking down on the North Pole. Sunlight comes from the left.', goal: { text: 'Spin Earth a full day (24 hours). Use Play, the buttons, or drag Earth.', check: { fullDay: true } },
      q: { type: 'mc', q: 'While Earth spun, which side was always lit?', choices: ['The side facing the Sun', 'The side with Indiana', 'The top half', 'It changed randomly'], answer: 0 } },
    { tag: 'test', title: 'Find noon in Indiana', sheet: 1, goal: { text: 'Spin until it is **12:00 PM (noon)** in Indiana.', check: { noon: true }, hint: 'Noon is when Indiana points straight at the Sun.' },
      q: { type: 'mc', q: 'Where is Indiana pointing at noon?', choices: ['Straight at the Sun', 'Straight away from the Sun', 'At the North Pole'], answer: 0 } },
    { tag: 'test', title: 'Find midnight', sheet: 1, goal: { text: 'Spin until it is **12:00 AM (midnight)** in Indiana.', check: { midnight: true } },
      q: { type: 'num', q: 'How many hours did it take to go from noon to midnight?', unit: 'hours', answer: 12 } },
    { tag: 'record', title: 'Time around the world', sheet: 2, text: 'Set the times below and read the clocks.',
      q: { type: 'table', q: 'Read Indiana and Tokyo\'s times.', rowHead: 'Moment', cols: [{ label: 'Indiana has', value: function (s) { return s.day ? 'day' : 'night'; }, accept: [] }, { label: 'Tokyo has', value: function (s) { var t = s.tokyo; return t >= 6 && t < 18 ? 'day' : 'night'; } }],
        rows: [{ label: 'Indiana noon', when: { noon: true } }, { label: 'Indiana midnight', when: { midnight: true } }], tip: 'Type day or night.' } },
    { tag: 'reason', title: 'Why different times?', sheet: 3, q: { type: 'mc', q: 'When it is noon in Indiana, it is nighttime in Tokyo. Why?', choices: ['Tokyo is on the side of Earth facing away from the Sun', 'Tokyo is closer to the Moon', 'The Sun turns off over Asia', 'Tokyo spins slower'], answer: 0 } },
    { tag: 'test', title: 'Sunrise direction', sheet: 4, goal: { text: 'Spin until it is **sunrise** (6:00 AM) in Indiana.', check: { sunrise: true } },
      q: { type: 'mc', q: 'At sunrise, Indiana is turning from night into day. Which way is Earth spinning (seen from above the North Pole)?', choices: ['Counterclockwise', 'Clockwise', 'It does not spin'], answer: 0, why: 'Earth spins counterclockwise seen from above the North Pole. That is why the Sun rises in the east.' } },
    { tag: 'apply', title: 'Plan the call', sheet: 5, q: { type: 'num', q: 'Tokyo is 14 hours ahead of Indiana. If it is 7:00 PM in Indiana, what hour is it in Tokyo the next morning? (Type the hour, like 9.)', unit: 'AM', answer: 9, work: true, hint: '7 PM + 14 hours. Count 5 hours to midnight, then 9 more.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: faster spin', sheet: 5, q: { type: 'mc', q: 'If Earth spun twice as fast, how long would one day-and-night cycle last?', choices: ['12 hours', '48 hours', '24 hours', '6 hours'], answer: 0 } },
    { tag: 'explain', title: 'Explain it', sheet: 6, q: { type: 'text', q: 'Explain how Earth\'s rotation causes day and night. Use the words rotate and Sun.', rows: 3, starter: 'Earth rotates on its axis, so', need: [{ words: ['rotat', 'spin'], label: 'Uses rotate/spin' }, { words: ['sun', 'light'], label: 'Mentions the Sun\'s light' }, { words: ['facing', 'faces', 'toward', 'away'], label: 'Explains facing toward / away' }], model: 'Earth rotates on its axis once every 24 hours. The side facing the Sun has day, and the side facing away has night. As Earth spins, places take turns in the light.' } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-night-sky', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.1',
  title: 'Seasonal Night Sky', model: 'orbitSky', minutes: 20, icon: '✨',
  place: 'Sunnyside Planetarium',
  mission: 'The planetarium needs a star guide for the whole school year. Move Earth around its orbit and find out which constellations can be seen at midnight each season, and why they change.',
  question: 'Why do we see different constellations in different seasons?',
  takeaway: 'Earth orbits the Sun once a year. At night we look out from the side of Earth facing away from the Sun, so as Earth moves around its orbit, our night sky points toward different stars. That is why Orion is a winter constellation and Scorpius is a summer one.',
  vocab: [['Orbit', 'The path Earth travels around the Sun (one trip = 1 year).'], ['Constellation', 'A group of stars that forms a pattern in the sky.'], ['Revolution', 'One complete trip around the Sun.'], ['Night side', 'The half of Earth facing away from the Sun.']],
  warmup: { style: 'Notice & wonder', prompt: 'Think about the night sky where you live.', items: [['Have you ever noticed the same stars in the sky all year? What do you wonder?', 'Some stars stay all year (like the Big Dipper), but many change with the seasons.'], ['Why can\'t we see stars during the day?', 'The Sun\'s light is so bright it hides them.'], ['How long does Earth take to orbit the Sun?', 'About 365 days (1 year).']] },
  steps: [
    { tag: 'explore', title: 'Start in January', text: 'The dashed line shows where Indiana looks at midnight.', goal: { text: 'Look at the sky in **January**.', check: { month: 0 } }, q: { type: 'mc', q: 'Which constellation do we see at midnight in January?', choices: ['Orion', 'Scorpius', 'Leo', 'Pegasus'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'If Earth moves halfway around its orbit (to July), will we still see Orion at midnight?', choices: ['Yes, the stars never change', 'No, we will see a different constellation', 'We will see no stars'] } },
    { tag: 'test', title: 'Move to July', sheet: 1, goal: { text: 'Drag Earth (or use the slider) to **July**.', check: { month: 6 } }, q: { type: 'mc', q: 'You predicted: {{pred:s1}}. What do we see in July?', choices: ['Scorpius', 'Orion', 'No stars'], answer: 0 } },
    { tag: 'record', title: 'Star guide', sheet: 2, q: { type: 'table', q: 'Fill in the star guide for each season.', rowHead: 'Month', cols: [{ label: 'Constellation at midnight', value: function (s) { return s.visName; } }],
      rows: [{ label: 'January (winter)', when: { month: 0 } }, { label: 'April (spring)', when: { month: 3 } }, { label: 'July (summer)', when: { month: 6 } }, { label: 'October (fall)', when: { month: 9 } }] } },
    { tag: 'reason', title: 'Where is Orion in July?', sheet: 3, q: { type: 'mc', q: 'In July, Orion is still out there. Why can\'t we see it?', choices: ['Orion is on the same side as the Sun, so it is in the daytime sky', 'Orion burns out in summer', 'Clouds cover it every July', 'Orion moves to the other side of the galaxy'], answer: 0, why: 'In July, the Sun is between Earth and Orion. Orion is up during the day, hidden by sunlight.' } },
    { tag: 'reason', title: 'Rotation or revolution?', sheet: 3, q: { type: 'sort', q: 'Sort each effect by its cause.', bins: ['Earth\'s rotation (spin, 24 h)', 'Earth\'s revolution (orbit, 1 year)'], items: [['Day and night', 0], ['Sun rises in the east', 0], ['Different constellations each season', 1], ['Stars seem to move across the sky in one night', 0], ['Orion returns every January', 1]] } },
    { tag: 'test', title: 'Complete the year', sheet: 4, goal: { text: 'Visit all four constellations by moving Earth around the whole orbit.', check: { seenCount: 4 } }, q: { type: 'num', q: 'How many months until the January stars come back to the midnight sky?', unit: 'months', answer: 12 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: 6 months later', sheet: 5, q: { type: 'mc', q: 'Leo is overhead at midnight in April. When will Leo be hidden near the Sun?', choices: ['October', 'May', 'January', 'Never'], answer: 0, why: 'Half an orbit (6 months) later, Earth is on the opposite side, so Leo is behind the Sun.' } },
    { tag: 'write', title: 'Explain it (CER)', sheet: 6, q: { type: 'write', q: 'Why do we see different constellations in different seasons?', parts: [
      { label: 'Claim', starter: 'We see different constellations because', min: 6, need: [{ words: ['orbit', 'revolv', 'around the sun', 'moves'], label: 'Names Earth\'s orbit' }] },
      { label: 'Evidence', starter: 'In January we saw', min: 10, need: [{ words: ['orion', 'scorpius', 'leo', 'pegasus'], label: 'Names constellations from your star guide' }] },
      { label: 'Reasoning', starter: 'At night we face', min: 10, need: [{ words: ['away', 'night side', 'opposite'], label: 'Explains we see stars on the night side, away from the Sun' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-moon-phases', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.1',
  title: 'Moon Phase Viewer', model: 'moonPhase', minutes: 25, icon: '🌓',
  place: 'Sunnyside Observatory',
  mission: 'The observatory\'s moon calendar got scrambled. Move the Moon around Earth, compare the top view with the view from Earth, and rebuild the calendar in the right order.',
  question: 'Why does the Moon seem to change shape?',
  takeaway: 'The Sun always lights half of the Moon. As the Moon orbits Earth (about 29.5 days), we see different amounts of that lit half. That changing view is the Moon\'s phases. The Moon doesn\'t change shape, and Earth\'s shadow does not cause phases.',
  vocab: [['Phase', 'The shape of the lit part of the Moon we see from Earth.'], ['Waxing', 'The lit part we see is growing.'], ['Waning', 'The lit part we see is shrinking.'], ['Crescent / Gibbous', 'Less than half lit / more than half lit.']],
  warmup: { style: 'Fix the mistake', prompt: 'Each statement has a mistake. Rewrite it correctly.', items: [['The Moon makes its own light.', 'The Moon reflects sunlight.'], ['Earth\'s shadow causes the Moon\'s phases.', 'Phases come from how much of the lit half we see.'], ['A full moon happens every week.', 'About once every 29.5 days.']] },
  steps: [
    { tag: 'explore', title: 'Two views', text: 'Left: the top view from space. Right: what someone on Earth sees.', goal: { text: 'Drag the Moon to a new spot on its orbit.', check: function (s) { return s.day > 0.5; } } },
    { tag: 'observe', title: 'The lit half', q: { type: 'mc', q: 'In the top view, which half of the Moon is always lit?', choices: ['The half facing the Sun', 'The half facing Earth', 'The top half'], answer: 0 } },
    { tag: 'test', title: 'Full moon', sheet: 1, goal: { text: 'Move the Moon to make a **Full moon**.', check: { phaseIdx: 4 } }, q: { type: 'mc', q: 'Where is the Moon during a full moon?', choices: ['On the far side of Earth from the Sun', 'Between Earth and the Sun', 'Beside Earth, at a right angle'], answer: 0 } },
    { tag: 'test', title: 'New moon', sheet: 1, goal: { text: 'Move the Moon to make a **New moon**.', check: { phaseIdx: 0 } }, q: { type: 'mc', q: 'Why can\'t we see the new moon?', choices: ['Its lit half faces away from Earth', 'Earth\'s shadow covers it', 'It is too far away'], answer: 0, fb: [null, 'This is a common idea, but in the top view Earth\'s shadow points the other way.', 'It is the same distance as always.'] } },
    { tag: 'record', title: 'Rebuild the calendar', sheet: 2, text: 'Use **+7 days** from the new moon.', q: { type: 'table', q: 'Record the phase name.', rowHead: 'Day', cols: [{ label: 'Phase', value: function (s) { return s.phase; } }, { label: 'Lit part we see', unit: '%', value: function (s) { return s.lit; }, tol: 3 }],
      rows: [{ label: 'About day 7', when: { phaseIdx: 2 } }, { label: 'About day 15', when: { phaseIdx: 4 } }, { label: 'About day 22', when: { phaseIdx: 6 } }] } },
    { tag: 'reason', title: 'Put the phases in order', sheet: 3, q: { type: 'order', q: 'Order the phases starting at the new moon.', items: ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Third quarter', 'Waning crescent'] } },
    { tag: 'test', title: 'See every phase', sheet: 4, goal: { text: 'Move the Moon through all 8 phases.', check: { phasesSeen: 8 } }, q: { type: 'num', q: 'About how many days does it take to go from one full moon to the next?', unit: 'days', answer: [29.5, 29, 30], tol: 0.51 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: which side?', sheet: 5, q: { type: 'mc', q: 'Tonight the RIGHT side of the Moon is lit and it is getting bigger each night. What phase comes next?', choices: ['First quarter, then waxing gibbous', 'Waning crescent', 'New moon', 'Third quarter'], answer: 0 } },
    { tag: 'explain', title: 'Bust the myth', sheet: 6, q: { type: 'text', q: 'Your friend says, "Phases happen because Earth\'s shadow covers part of the Moon." Explain what really causes phases.', rows: 3, starter: 'Phases are not caused by Earth\'s shadow. They happen because', need: [{ words: ['half', 'lit'], label: 'The Sun always lights half the Moon' }, { words: ['orbit', 'moves around', 'position'], label: 'The Moon orbits Earth' }, { words: ['see', 'view', 'from earth'], label: 'We see different amounts of the lit half' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-solar-scale', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.2',
  title: 'Solar System to Scale', model: 'solarScale', minutes: 25, icon: '🪐',
  place: 'Sunnyside Space Center · Flight Planning',
  mission: 'Flight Planning is designing a mission to the outer planets. Explore the solar system to scale: how far apart the planets are, how big they are, and how long a spacecraft would travel.',
  question: 'How big and how spread out is our solar system?',
  takeaway: 'The solar system is mostly empty space. The four rocky inner planets are close to the Sun and small. The gas and ice giants are huge and very far apart; Neptune is 30 times farther from the Sun than Earth. Spacecraft take years to reach the outer planets.',
  vocab: [['AU (astronomical unit)', 'Earth\'s distance from the Sun, about 150 million km.'], ['Inner planets', 'Mercury, Venus, Earth, Mars: small and rocky.'], ['Outer planets', 'Jupiter, Saturn, Uranus, Neptune: giant planets.'], ['Scale model', 'A model where sizes or distances are shrunk by the same amount.']],
  warmup: { style: 'Rank it', prompt: 'Rank from smallest to largest. Explain your first choice.', items: [['Earth, the Sun, the Moon, Jupiter', 'Moon, Earth, Jupiter, Sun.'], ['A trip to: the Moon, Mars, Neptune', 'Moon (days), Mars (months), Neptune (years).'], ['Which is closer to the Sun: Mars or Jupiter?', 'Mars.']] },
  steps: [
    { tag: 'explore', title: 'The distance map', goal: { text: 'Tap 3 different planets to open their fact cards.', check: { infoCount: { gte: 3 } } } },
    { tag: 'observe', title: 'Crowded or spread out?', sheet: 1, q: { type: 'mc', q: 'On the distance map, where are the four rocky planets?', choices: ['Bunched up close to the Sun', 'Spread out evenly', 'Past Jupiter'], answer: 0 } },
    { tag: 'test', title: 'Zoom in', goal: { text: 'Turn on **Zoom in on the inner planets**.', check: { zoomed: true } }, q: { type: 'num', q: 'How far is Mars from the Sun?', unit: 'AU', answer: 1.52, tol: 0.011 } },
    { tag: 'reason', title: 'How many times farther?', sheet: 2, q: { type: 'num', q: 'Neptune is 30.1 AU from the Sun and Earth is 1 AU. About how many times farther from the Sun is Neptune than Earth?', unit: 'times', answer: 30, tol: 0.2 } },
    { tag: 'test', title: 'Size lineup', sheet: 3, goal: { text: 'Switch to **Size lineup** and tap Jupiter.', check: { mode: 'size', pick: 'Jupiter' } }, q: { type: 'num', q: 'How many Earths wide is Jupiter?', unit: 'Earths', answer: 11.2, tol: 0.05 } },
    { tag: 'reason', title: 'Sort the planets', sheet: 3, q: { type: 'sort', q: 'Sort the planets.', bins: ['Inner, rocky, small', 'Outer, giant'], items: [['Mercury', 0], ['Venus', 0], ['Earth', 0], ['Mars', 0], ['Jupiter', 1], ['Saturn', 1], ['Uranus', 1], ['Neptune', 1]] } },
    { tag: 'test', title: 'Plan a trip', sheet: 4, goal: { text: 'Open the **Trip planner** and choose **Saturn** at **17 km/s**.', check: { mode: 'trip', dest: 'Saturn', speed: 17 } }, q: { type: 'num', q: 'About how many years would the trip to Saturn take?', unit: 'years', answer: function (s) { return s.tripYears; }, tol: 0.11 } },
    { tag: 'apply', title: 'Speed it up', sheet: 4, goal: { text: 'Change the speed to **34 km/s** (twice as fast) for the Saturn trip.', check: { dest: 'Saturn', speed: 34 } }, q: { type: 'mc', q: 'What happened to the travel time when the speed doubled?', choices: ['It was cut in half', 'It doubled', 'It stayed the same'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: scale model', sheet: 5, q: { type: 'num', q: 'In a playground model, Earth is 1 m from the Sun. How far away should Neptune be?', unit: 'm', answer: 30.1, tol: 0.2 } },
    { tag: 'explain', title: 'Report to Flight Planning', sheet: 6, q: { type: 'text', q: 'Explain why a trip to Neptune takes much longer than a trip to Mars. Use numbers.', number: true, rows: 3, need: [{ words: ['au', 'far', 'distance'], label: 'Compares distances' }, { words: ['year', 'time', 'longer'], label: 'Connects distance to travel time' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-sci-star-brightness', std: 'g5-sci-space', subject: 'science', grade: 5, code: '5.ESS.2',
  title: 'Star Brightness Lab', model: 'starBright', minutes: 20, icon: '⭐',
  place: 'Sunnyside Observatory · Light Lab',
  mission: 'Why does the Sun look so much brighter than every other star? Test lamps and light meters in the dark lab, then use real star data to answer the question.',
  question: 'Why does the Sun look brighter than other stars?',
  takeaway: 'Light spreads out as it travels, so a light looks dimmer the farther away it is: twice as far looks 4 times dimmer. The Sun is an ordinary star, but it is extremely close to us, so it looks far brighter than stars that are actually much more powerful.',
  vocab: [['Apparent brightness', 'How bright a light looks from where you are.'], ['Actual brightness', 'How much light a star really gives off.'], ['Light-year', 'The distance light travels in a year (about 9.5 trillion km).'], ['Light meter', 'A tool that measures how bright light is.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose, then give a reason.', items: [['Read by a flashlight 1 meter away or a stadium light 1 kilometer away?', 'The flashlight: close lights can look brighter.'], ['Why does a car\'s headlight look dim far away but blinding up close?', 'Light spreads out with distance.'], ['Is the Sun the biggest, brightest star in the universe?', 'No. It is an average star that is very close.']] },
  steps: [
    { tag: 'explore', title: 'Two identical lamps', goal: { text: 'Move lamp B to **2 m** away.', check: { dB: 2, pB: 1 } }, q: { type: 'num', q: 'Lamp A reads 100 at 1 m. What does lamp B read at 2 m?', unit: 'units', answer: 25 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'If lamp B moves to 4 m (twice as far as 2 m), the meter will read...', choices: ['Half of 25', 'One-fourth of 25', 'The same'] } },
    { tag: 'record', title: 'Distance data', sheet: 1, q: { type: 'table', q: 'Record meter B for a normal lamp.', rowHead: 'Distance', cols: [{ label: 'Meter B', unit: 'units', value: function (s) { return s.meterB; }, tol: 0.2 }], rows: [{ label: '1 m', when: { dB: 1, pB: 1 } }, { label: '2 m', when: { dB: 2, pB: 1 } }, { label: '3 m', when: { dB: 3, pB: 1 } }, { label: '4 m', when: { dB: 4, pB: 1 } }] } },
    { tag: 'reason', title: 'The pattern', sheet: 2, q: { type: 'mc', q: 'You predicted: {{pred:s1}}. What happens when the distance doubles?', choices: ['The light looks 4 times dimmer', 'The light looks 2 times dimmer', 'Nothing changes'], answer: 0, why: '100 → 25 when distance went 1 m → 2 m. Light spreads out over a bigger area, so less reaches the meter.' } },
    { tag: 'test', title: 'A stronger lamp far away', sheet: 3, goal: { text: 'Make lamp B **4× stronger** and find a distance where both meters read the SAME.', check: { equalFar: true } }, q: { type: 'mc', q: 'A 4× stronger lamp looks the same as lamp A when it is 2 m away. What does this show?', choices: ['A powerful light can look dim if it is far away', 'Stronger lamps always look brighter', 'Distance doesn\'t matter'], answer: 0 } },
    { tag: 'test', title: 'Real stars', sheet: 4, goal: { text: 'Switch to **Real stars** and tap Rigel.', check: { mode: 'sky', star_Rigel: true } }, q: { type: 'mc', q: 'Rigel really gives off 120,000 times more light than the Sun. Why does it look like a tiny dot?', choices: ['It is 860 light-years away', 'It is smaller than the Sun', 'It is turned off at night'], answer: 0 } },
    { tag: 'reason', title: 'Close vs far', sheet: 4, q: { type: 'mc', q: 'Proxima Centauri is the closest star after the Sun, but we can\'t see it without a telescope. Use the data table: why?', choices: ['It gives off very little light (0.0017 × the Sun)', 'It is the farthest star', 'It is behind the Moon'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: 3 times as far', sheet: 5, q: { type: 'num', q: 'A lamp reads 90 at 1 m. What would it read at 3 m?', unit: 'units', answer: 10, work: true, why: '3 times as far = 3 × 3 = 9 times dimmer. 90 ÷ 9 = 10.' } },
    { tag: 'write', title: 'Final claim (CER)', sheet: 6, q: { type: 'write', q: 'Why does the Sun look brighter than other stars?', parts: [
      { label: 'Claim', starter: 'The Sun looks brighter because', min: 6, need: [{ words: ['close', 'closer', 'near', 'distance'], label: 'Names distance as the reason' }] },
      { label: 'Evidence', starter: 'In the lamp lab,', min: 12, number: true, need: [{ words: ['meter', 'lamp', 'dimmer', '25'], label: 'Uses lamp lab data' }] },
      { label: 'Reasoning', starter: 'This shows that', min: 10, need: [{ words: ['far', 'distance', 'away'], label: 'Connects distance to how bright it looks' }, { words: ['rigel', 'sirius', 'other stars', 'stars'], label: 'Compares to other stars' }] }] } }
  ]
});
