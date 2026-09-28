/*
 * Adds discussion and practice to each lesson in lessons.js:
 *   talk:  a turn-and-talk question for each mini-lesson step (reasoning, not recall)
 *   wedo:  guided practice the class solves together, revealed one step at a time
 *   youdo: an independent check students answer before the activity
 */
(function (X) {
  function MC(q, choices, answer, explain) { return { type: 'mc', q: q, choices: choices, answer: answer, explain: explain }; }
  function IN(q, answer, explain, unit) { return { type: 'input', q: q, answer: [].concat(answer), explain: explain, unit: unit }; }
  function add(id, o) { if (X[id]) Object.keys(o).forEach(function (k) { X[id][k] = o[k]; }); }

  add('g5-sci-matter', {
    talk: ['Is air matter? How could you prove it to someone who says no?', 'Why do scientists measure mass with a balance instead of just guessing by how big something looks?', 'Melting ice and burning wood both change. What is the key difference between them?', 'The open cup lost mass. Where did that matter go? Is it gone forever?'],
    wedo: { q: 'A sealed bag holds 40 g of vinegar and 5 g of baking soda. They fizz and the bag puffs up. What does the bag weigh now?', steps: ['Find the starting mass: 40 g + 5 g = 45 g.', 'Is the system open or closed? The bag is sealed, so it is closed.', 'The fizzing made a new gas (a chemical change), but the gas is trapped in the bag.', 'Nothing entered or left, so the mass stays the same.'], a: '45 g' },
    youdo: MC('An OPEN cup holds 150 g of water and a 10 g antacid tablet. After fizzing, the scale reads 157 g. What happened to the other 3 g?', ['It escaped into the air as a gas', 'It was destroyed', 'The scale is broken', 'It turned into water'], 0, '160 g − 157 g = 3 g of gas escaped the open cup. Matter is conserved.')
  });
  add('g5-sci-space', {
    talk: ['If Earth stopped spinning, what would happen to day and night where you live?', 'Why would a shadow be longer at 5 p.m. than at noon? Use the word "angle" or "low."', 'Earth is actually a little closer to the Sun in January. Why isn\'t January summer in Indiana?', 'Why can\'t we see the new moon, even though it is still up there?'],
    wedo: { q: 'At 7:00 a.m. a tree\'s shadow is long and points west. Predict its length and direction at 6:00 p.m.', steps: ['At 7 a.m. the Sun is low in the east, so the shadow points away from it: west.', 'Through the day, Earth rotates, so the Sun appears to move across the sky toward the west.', 'At 6 p.m. the Sun is low in the west.', 'The shadow will be long again and point away from the Sun: east.'], a: 'Long and pointing east' },
    youdo: MC('Which pattern is caused by Earth\'s REVOLUTION around the Sun, not its rotation?', ['The seasons change over a year', 'The Sun rises every morning', 'Shadows change during one day', 'Day turns into night'], 0, 'One revolution takes a year; the tilted axis during that orbit causes seasons.')
  });
  add('g5-sci-eco', {
    talk: ['Where does a hawk\'s energy really come from? Trace it all the way back.', 'Why do you think arrows point toward the eater instead of toward the food?', 'Is a bear a herbivore, carnivore, or omnivore? What evidence would you need?', 'If all the frogs in a pond disappeared, name two populations that would change and explain why.'],
    wedo: { q: 'Food chain: grass → grasshopper → frog → snake. A drought kills much of the grass. Predict what happens to the snakes.', steps: ['Grass is the producer. Less grass means less food for grasshoppers.', 'Fewer grasshoppers survive, so there is less food for frogs.', 'Frogs decrease, so snakes have less food.', 'The snake population will likely decrease too: the change ripples up the chain.'], a: 'Snakes decrease' },
    youdo: MC('In a forest, owls eat mice and mice eat seeds. A disease kills most owls. What happens to the seeds first?', ['Fewer seeds, because more mice eat them', 'More seeds, because mice disappear', 'No change', 'Seeds turn into decomposers'], 0, 'Fewer owls → more mice → more seeds eaten.')
  });
  add('g6-sci-particles', {
    talk: ['A spoon feels solid and still. Are its particles moving? How do you know?', 'Why can you pour water but not a block of ice? Explain with particles.', 'Why does the thermometer stop rising while water is boiling, even though the stove is still on?', 'Frost disappears on a cold, sunny morning without melting. What happened to the particles?'],
    wedo: { q: 'Explain why a balloon shrinks when you put it in the freezer.', steps: ['The balloon is full of gas particles moving quickly and hitting the inside of the balloon.', 'In the freezer, thermal energy leaves the gas.', 'The particles slow down and hit the balloon walls less often and less hard.', 'The gas takes up less space, so the balloon shrinks. The number of particles did not change.'], a: 'Slower particles take up less space' },
    youdo: MC('Water vapor touches a cold window and forms droplets. Which describes the particles?', ['They lose energy, slow down, and move closer together', 'They gain energy and spread out', 'They stop moving completely', 'They turn into new substances'], 0, 'Condensation: gas particles lose thermal energy and come together as a liquid.')
  });
  add('g6-sci-energy', {
    talk: ['A bowling ball and a tennis ball roll at the same speed. Which has more kinetic energy? Why?', 'Why does the first hill of a roller coaster have to be the tallest?', 'When you hold an ice cube, does cold move into your hand, or heat move out? Explain.', 'Why does a cooler keep drinks cold? Which type of heat transfer is it blocking?'],
    wedo: { q: 'A skateboarder starts at the top of a ramp and rolls to the bottom. Describe the energy changes.', steps: ['At the top, the skateboarder is high and still: mostly potential energy.', 'As they roll down, height decreases, so potential energy decreases.', 'Speed increases, so kinetic energy increases.', 'At the bottom, most potential energy has become kinetic energy. The total stays about the same (some is lost to friction as heat).'], a: 'PE changes into KE' },
    youdo: MC('A pot of soup is heated from the bottom. The warm soup rises and the cooler soup sinks. This is:', ['Convection', 'Conduction', 'Radiation', 'Insulation'], 0, 'Currents in a fluid (liquid or gas) are convection.')
  });
  add('g6-sci-space', {
    talk: ['If gravity suddenly turned off, what would the Moon do? Why?', 'Why is the Moon always half lit, even at a new moon?', 'Why don\'t we have a solar eclipse every single month at the new moon?', 'The Sun also pulls on the oceans. Why does the Moon have a bigger effect on tides?'],
    wedo: { q: 'Tonight is a first quarter moon. What phase will you see in about one week? What about two weeks?', steps: ['The order after first quarter is waxing gibbous, then full.', 'It takes about one week to go from one main phase to the next.', 'In one week: full moon.', 'In two weeks: third quarter (the other half is lit).'], a: 'Full moon, then third quarter' },
    youdo: MC('During a solar eclipse, what is the order of the objects?', ['Sun – Moon – Earth', 'Sun – Earth – Moon', 'Earth – Sun – Moon', 'Moon – Sun – Earth'], 0, 'The Moon blocks the Sun from Earth, so it is in the middle.')
  });
  add('g5-ss-colonial', {
    talk: ['How did the environment shape the homes Native nations built? Give one example.', 'The Columbian Exchange helped and harmed. Give one example of each.', 'If you were a colonist who loved farming, which region would you choose and why?', 'How can one clue in a letter (like "cod fleet") point to a whole region?'],
    wedo: { q: 'Clue: "Our plantation grows tobacco, and ships carry it to England." Which colonial region is this, and what evidence proves it?', steps: ['Underline the evidence: "plantation," "tobacco," "ships carry it to England."', 'Plantations and cash crops like tobacco needed a warm climate and a long growing season.', 'That describes the Southern colonies.', 'Claim: Southern colonies. Evidence: tobacco and plantations. Reason: warm climate supported cash crops.'], a: 'Southern colonies' },
    youdo: MC('Which clue would MOST likely come from the Middle colonies?', ['"Our wheat fields feed families across the colonies."', '"The rocky soil makes farming hard."', '"Enslaved workers harvest rice in the heat."', '"We hunt bison on the plains."'], 0, 'Wheat and grain made the Middle colonies the "breadbasket."')
  });
  add('g5-ss-revolution', {
    talk: ['Britain said the taxes paid for protecting the colonies. Was that fair? Argue one side.', 'Why might a boycott be more powerful than one person complaining?', 'Which event do you think made war most likely? Defend your choice.', 'Why was help from France so important to winning the war?'],
    wedo: { q: 'Put these in cause-and-effect order and explain the link: Tea Act, Intolerable Acts, Boston Tea Party.', steps: ['First: the Tea Act (1773) gave one British company control of tea sales.', 'Colonists protested by dumping tea into Boston Harbor: the Boston Tea Party.', 'Britain punished Boston with the Intolerable Acts (1774).', 'Each event caused the next, raising tensions toward war.'], a: 'Tea Act → Boston Tea Party → Intolerable Acts' },
    youdo: MC('Why did colonists say "No taxation without representation"?', ['They had no vote in Parliament, which made the tax laws', 'They wanted no taxes ever', 'The king was not British', 'France was taxing them'], 0, 'They wanted a voice in the lawmaking body that taxed them.')
  });
  add('g5-ss-civics', {
    talk: ['Why would a very weak national government be a problem? Think about money and defense.', 'What is the difference between a government run by "We the People" and one run by a king?', 'Why not let one branch do everything? It would be faster.', 'Which freedom in the Bill of Rights matters most to you at school? Why?'],
    wedo: { q: 'The Supreme Court rules that a new law breaks the First Amendment. Which check is this, and which branch is being checked?', steps: ['The Supreme Court is the judicial branch.', 'Congress (the legislative branch) wrote the law.', 'The courts can declare a law unconstitutional.', 'So the judicial branch is checking the legislative branch.'], a: 'Judicial checks legislative' },
    youdo: MC('The President nominates a judge, but the Senate votes no. This shows:', ['Checks and balances', 'Popular sovereignty only', 'The Articles of Confederation', 'A veto'], 0, 'The Senate (legislative) checked the President (executive).')
  });
  add('g6-ss-americas', {
    talk: ['Why might a civilization with a calendar and writing be able to grow large?', 'Why was building a city in a lake both smart and risky?', 'How would roads and quipus help the Inca rule a huge empire?', 'Why did disease have such a huge effect on Native populations?'],
    wedo: { q: 'Compare how the Aztec and Inca solved the problem of farming difficult land.', steps: ['The Aztec lived on a lake with little dry land.', 'They built chinampas: floating garden beds made from mud and reeds.', 'The Inca lived on steep mountains.', 'They carved terraces: flat steps that held soil and water. Both changed the land to grow food.'], a: 'Chinampas (Aztec) and terraces (Inca)' },
    youdo: MC('Which achievement shows the Inca had a highly organized government?', ['Quipus used to record census counts and tribute', 'Floating gardens', 'A 365-day calendar', 'Pyramids in the rainforest'], 0, 'Counting people and taxes for a huge empire requires organized records.')
  });
  add('g6-ss-europe', {
    talk: ['Why would a serf agree to such a hard life? What did they get in return?', 'How is the idea "even the king must obey the law" still used in the United States today?', 'Why would a disaster like the plague actually give some peasants MORE power?', 'How is the printing press like the internet?'],
    wedo: { q: 'Explain how the Black Death weakened feudalism, step by step.', steps: ['The plague killed about 1 in 3 Europeans.', 'Lords suddenly did not have enough workers.', 'Surviving peasants could demand wages or leave for another lord.', 'Serfs gained freedom and power, so the feudal system of land for labor broke down.'], a: 'Labor shortage gave peasants power' },
    youdo: MC('Why did the Renaissance spread quickly after 1450?', ['The printing press made books cheap and fast to copy', 'Knights carried ideas', 'The plague ended', 'Serfs learned to paint'], 0, 'Gutenberg\'s press spread ideas across Europe.')
  });
  add('g6-ss-geo', {
    talk: ['Why do mapmakers need BOTH latitude and longitude to find one spot?', 'What would go wrong if one person wrote longitude first and another wrote latitude first?', 'Two cities are at the same latitude but have very different winters. What could explain it?', 'Is building a dam adapting, depending, or modifying? Could it be more than one?'],
    wedo: { q: 'A city is at 34° S, 58° W. Which hemispheres is it in, and which continent?', steps: ['S latitude means south of the Equator: Southern Hemisphere.', 'W longitude means west of the Prime Meridian: Western Hemisphere.', 'Southern and Western Hemispheres together include South America.', 'This is Buenos Aires, Argentina.'], a: 'Southern and Western Hemispheres; South America' },
    youdo: MC('Which factor BEST explains why a mountaintop at the Equator can have snow?', ['High elevation', 'Low latitude', 'Distance from the Prime Meridian', 'The Gulf Stream'], 0, 'Temperature drops as elevation increases.')
  });
  add('g6-ss-ancient', {
    talk: ['How might life be different if you lived in a city cut off from others by mountains?', 'Which achievement, Greek or Roman, would you miss most if it disappeared today? Why?', 'Is it fair that only some people could vote in Athens? How is that different from the U.S. today?', 'Why would a huge empire need good roads and one kind of money?'],
    wedo: { q: 'Use G.R.A.P.E.S. to explain why Rome could build a bigger empire than Greece.', steps: ['Geography: Greece was split by mountains and seas into separate city-states.', 'Geography: Rome sat in the middle of Italy with plains that were easier to unite and control.', 'Achievements and economics: Roman roads and one currency connected the lands Rome conquered.', 'So Rome could unite and hold together a much larger empire than the separate Greek city-states.'], a: 'United geography, roads, and one currency helped Rome grow' },
    youdo: MC('Which pair shows a Greek idea and a Roman idea that the United States uses today?', ['Democracy (Greece) and a republic with a Senate (Rome)', 'Pharaohs (Greece) and pyramids (Rome)', 'Feudalism (Greece) and knights (Rome)', 'Chinampas (Greece) and quipus (Rome)'], 0, 'The U.S. uses democratic voting and an elected Senate.')
  });
  add('g5-ela-theme', {
    talk: ['Why isn\'t "friendship" a theme? What would you add to make it one?', 'Think of a movie character who changed. What did they learn?', 'Why should a theme statement work for anyone, not just the character?', 'What is the difference between a summary and a retelling of every detail?'],
    wedo: { q: 'Story: Ben forgets his lines in the play, freezes, then keeps going and finishes. The audience cheers. Write the theme.', steps: ['Challenge: Ben forgets his lines.', 'Response: he freezes, then keeps going.', 'Change: he finishes and gets cheers.', 'Theme: Pushing through a mistake can still lead to success.'], a: 'Pushing through mistakes can still lead to success.' },
    youdo: MC('Which is the BEST summary sentence for "The Tortoise and the Hare"?', ['A slow tortoise beats a fast hare in a race because the hare stops to nap and the tortoise keeps going.', 'The hare is very fast and brags a lot.', 'I liked the tortoise best.', 'The race was on a sunny day.'], 0, 'It includes who, the problem, the key event, and the resolution.')
  });
  add('g5-ela-info', {
    talk: ['How can a main idea be in the middle of a paragraph? What would that look like?', 'A fun fact is interesting. Why might it still not be a key detail?', 'Why do authors use headings in longer articles?', 'Which text structure would you use to explain how to make a sandwich? Why?'],
    wedo: { q: 'Paragraph: "Because farmers cleared forests, rain washed soil into rivers. As a result, fish lost their habitats." Name the structure and the signal words.', steps: ['Look for signal words: "Because" and "As a result."', 'These words connect a cause to its effect.', 'Cause: clearing forests. Effects: soil washed away; fish lost habitats.', 'Structure: cause and effect.'], a: 'Cause and effect ("because," "as a result")' },
    youdo: MC('"Unlike alligators, crocodiles have narrow snouts. Both live in warm water." The structure is:', ['Compare and contrast', 'Sequence', 'Problem and solution', 'Description'], 0, '"Unlike" and "both" signal compare and contrast.')
  });
  add('g5-ela-vocab', {
    talk: ['What should you do first when you hit a word you don\'t know? Why?', 'How could knowing the root "port" help you understand "transport" and "portable"?', 'How does adding "un-" or "re-" change a word? Give an example.', 'Why do authors use figurative language instead of just saying it plainly?'],
    wedo: { q: 'Figure out "reconstruct" in: "After the flood, the town worked to reconstruct the bridge."', steps: ['Break it apart: re- + struct.', 're- means again; struct means build.', 'Context: after a flood, the bridge was probably damaged.', 'Reconstruct means to build again.'], a: 'To build again' },
    youdo: MC('"The old car coughed and wheezed up the hill." What kind of figurative language is this?', ['Personification', 'Simile', 'Idiom', 'Hyperbole'], 0, 'A car cannot really cough; it is given human actions.')
  });
  add('g6-ela-evidence', {
    talk: ['Why don\'t authors just tell us everything directly?', 'How can a quote be about the right topic and still be weak evidence?', 'Why is it not enough to drop a quote into your answer?', 'How can a story\'s ending help you figure out its theme?'],
    wedo: { q: 'Text: "Maya stared at her untouched lunch and kept checking the door." Make an inference and support it.', steps: ['Text clues: untouched lunch, checking the door.', 'What I know: people who are worried or waiting lose their appetite and watch for someone.', 'Inference: Maya is nervous or waiting for someone.', 'Evidence sentence: The text states she "kept checking the door," which shows she is anxious.'], a: 'Maya is nervous or waiting for someone.' },
    youdo: MC('Claim: Leo is kind. Which evidence is STRONGEST?', ['"He slid his pretzels to the middle of the table for her."', '"Leo was in science class."', '"It was lunchtime."', '"Leo had a backpack."'], 0, 'Sharing food directly shows kindness.')
  });
  add('g6-ela-central', {
    talk: ['How is a central idea different from a topic?', 'Which is stronger evidence: an expert statistic or a personal story? Can both be useful?', 'Why do advertisers use words like "best" and "everyone"?', 'Why would a writer bring up the other side of an argument on purpose?'],
    wedo: { q: 'Argument: "Schools should have longer recess. A study found students focus better after 20 minutes of play. Recess is the best!" Label the claim, evidence, and unsupported part.', steps: ['Claim: Schools should have longer recess.', 'Evidence: A study found students focus better after 20 minutes of play.', 'Unsupported: "Recess is the best!" is opinion with no proof.', 'The strongest part is the study because it is specific and can be checked.'], a: 'Claim, study = evidence, "the best" = unsupported' },
    youdo: MC('Which sentence is a counterclaim?', ['Some people argue that longer recess wastes learning time.', 'Recess helps students focus.', 'A study found students focus better after play.', 'Schools should add ten minutes.'], 0, '"Some people argue" introduces the other side.')
  });
  add('g6-ela-vocab', {
    talk: ['Would you rather be called "thrifty" or "stingy"? What is the difference?', 'How can two authors describe the same place and make readers feel opposite things?', 'Why might a writer use an allusion instead of explaining directly?', 'Which is more reliable, the context or the root, when they seem to disagree?'],
    wedo: { q: 'Change the tone: "The kitten walked across the room." Make it sound sneaky, then playful.', steps: ['Tone depends on word choice.', 'Sneaky: "The kitten crept across the room."', 'Playful: "The kitten bounced across the room."', 'Only the verb changed, but the connotation changed the whole feeling.'], a: '"crept" (sneaky) vs. "bounced" (playful)' },
    youdo: MC('"The council rammed through a greedy new fee." The author\'s tone toward the council is:', ['Critical', 'Neutral', 'Admiring', 'Humorous'], 0, '"Rammed" and "greedy" have negative connotations.')
  });
  add('g5-math-fractions', {
    talk: ['Why can\'t you just add the denominators: 1/2 + 1/4 = 2/6? Use a picture to explain.', 'How do you choose the best common denominator?', 'When do you need to regroup a whole when subtracting mixed numbers?', 'Why does multiplying by a fraction less than 1 make a number smaller?'],
    wedo: { q: 'Solve: 2 1/3 + 1 3/4.', steps: ['Common denominator for 3 and 4 is 12.', '2 1/3 = 2 4/12 and 1 3/4 = 1 9/12.', 'Add wholes and fractions: 3 13/12.', '13/12 = 1 1/12, so the answer is 4 1/12.'], a: '4 1/12' },
    youdo: IN('Solve: 3/4 − 1/3 (write a fraction)', ['5/12'], '9/12 − 4/12 = 5/12.')
  });
  add('g5-math-decimals', {
    talk: ['Why is 0.5 greater than 0.45 even though 45 is more than 5?', 'What does each zero in 0.050 tell you?', 'Why do we look only at one digit to decide how to round?', 'Why must decimal points be lined up to add but not to multiply?'],
    wedo: { q: 'Solve: 3.6 × 0.4.', steps: ['Multiply as whole numbers: 36 × 4 = 144.', 'Count decimal places: 3.6 has 1, 0.4 has 1, total 2.', 'Place the point 2 places from the right: 1.44.', 'Estimate: about 4 × 0.4 = 1.6, so 1.44 makes sense.'], a: '1.44' },
    youdo: IN('Solve: 12.5 − 4.75', ['7.75'], '12.50 − 4.75 = 7.75.')
  });
  add('g5-math-volume', {
    talk: ['Why is volume measured in cubic units instead of square units?', 'Does it matter which face you call the base? Why or why not?', 'How is V = l × w × h the same as V = B × h?', 'How would you find the volume of an L-shaped room?'],
    wedo: { q: 'A fish tank is 5 dm long, 3 dm wide, and 4 dm tall. How many liters does it hold? (1 dm³ = 1 liter)', steps: ['One layer: 5 × 3 = 15 cubes.', 'Stack 4 layers: 15 × 4 = 60.', 'V = 60 dm³.', 'Since 1 dm³ = 1 liter, the tank holds 60 liters.'], a: '60 liters' },
    youdo: IN('A box has a base of 20 cm² and a height of 6 cm. What is its volume?', ['120'], '20 × 6 = 120 cm³.', 'cm³')
  });
  add('g6-math-ratios', {
    talk: ['Why does 3:2 mean something different from 2:3?', 'How can a double number line help you check a ratio?', 'Why is the unit rate the fairest way to compare two deals?', 'How can knowing 10% help you find 15% or 35% in your head?'],
    wedo: { q: 'A recipe uses 2 cups of rice for 5 people. How much rice for 20 people?', steps: ['Ratio: 2 cups : 5 people.', '20 people is 4 times as many as 5.', 'Multiply both parts by 4: 8 cups : 20 people.', 'Check with a unit rate: 2 ÷ 5 = 0.4 cup per person; 0.4 × 20 = 8.'], a: '8 cups' },
    youdo: IN('A shirt costs $40 and is 15% off. How much is the discount?', ['6', '6.00'], '10% = $4, 5% = $2, so 15% = $6.', 'dollars')
  });
  add('g6-math-expressions', {
    talk: ['Why is "3 less than n" written n − 3 and not 3 − n?', 'What happens if you skip the order of operations when evaluating?', 'Why can you combine 4x and 2x but not 4x and 2?', 'Why must you do the same operation to both sides of an equation?'],
    wedo: { q: 'Solve and check: 5x = 45.', steps: ['x is multiplied by 5.', 'The inverse of multiplying is dividing, so divide both sides by 5.', 'x = 9.', 'Check: 5 × 9 = 45 ✓'], a: 'x = 9' },
    youdo: IN('Solve: y ÷ 6 = 7', ['42', 'y=42'], 'Multiply both sides by 6: y = 42.')
  });
  add('g6-math-integers', {
    talk: ['Name a real situation where 0 is not "nothing" but a starting point.', 'Why is −2 greater than −20, even though 20 is bigger than 2?', 'Why can distance never be negative?', 'Why do you add absolute values when two points are on opposite sides of an axis?'],
    wedo: { q: 'What is the distance between (−4, 3) and (5, 3)?', steps: ['Both points have y = 3, so they are on the same horizontal line.', 'The x-values −4 and 5 have opposite signs.', 'Add the absolute values: |−4| + |5| = 4 + 5.', 'Distance = 9 units.'], a: '9 units' },
    youdo: MC('Which is the coldest temperature?', ['−14 °F', '−4 °F', '0 °F', '6 °F'], 0, '−14 is farthest left on the number line.')
  });
})(window.CX_LESSONS);
