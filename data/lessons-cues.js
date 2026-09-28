/*
 * Student-facing cues for the lesson presenter. Slides show only these cues; everything the
 * teacher says lives in the separate presenter script PDF. Students need only the printed
 * lesson worksheet (js/pdf.js notes()) and a pencil.
 *   hook:  { q, options }       prediction question with three vote choices
 *   model: [lines]              worked example shown one line at a time
 *   dos:   [4 strings]          worksheet task (Part B) for each mini-lesson step (all content included)
 */
(function (X) {
  function add(id, o) { if (X[id]) Object.keys(o).forEach(function (k) { X[id][k] = o[k]; }); }
  add('g5-sci-matter', {
    hook: { q: 'A 50-gram ice cube melts inside a sealed bag. What will the water weigh?', options: ['More than 50 g', 'Exactly 50 g', 'Less than 50 g'] },
    model: ['Problem: 30 g of water + 5 g of salt are stirred together. The salt seems to disappear. What is the total mass?', 'Step 1: The salt particles did not vanish. They spread out through the water.', 'Step 2: Nothing left the cup, and nothing was added.', 'Step 3: 30 g + 5 g = 35 g.', 'Answer: 35 g. Mass is conserved.'],
    dos: ['List 3 properties of your pencil (color, hardness, shape, texture...).', 'Read the cylinder in the picture and write its volume in mL. Then find the box\'s volume: 3 × 2 × 2.', 'Make two columns, Physical and Chemical. Sort the four flip cards.', 'Predict what the scale will show, open and sealed. Then watch and check.'] });
  add('g5-sci-space', {
    hook: { q: 'This morning the Sun was in the east. At dismissal it will be in the west. What moved?', options: ['The Sun moved', 'Earth spun', 'Both moved'] },
    model: ['Imagine Earth spinning on its axis, with Indiana marked by a dot.', 'Step 1: When Indiana faces the Sun, it is daytime (noon when it faces it directly).', 'Step 2: As Earth keeps spinning west to east, Indiana turns away: sunset, then night.', 'Step 3: One full spin takes 24 hours: one day.', 'Step 4: Earth also orbits the Sun once a year, always tilted the same way. Tilt toward the Sun = summer.'],
    dos: ['Draw Earth, mark Indiana, and shade the night side. Label "day" and "night."', 'Make a table with 3 times (9 a.m., noon, 4 p.m.). Record the shadow as long or short.', 'Draw Earth tilted toward the Sun and label "summer in Indiana."', 'Write the name of the phase at each Moon position you try.'] });
  add('g5-sci-eco', {
    hook: { q: 'In a forest, a hawk eats a snake that ate a mouse that ate seeds. Where did the hawk\'s energy START?', options: ['The mouse', 'The seeds', 'The Sun'] },
    model: ['Food chain: acorn → squirrel → red-tailed hawk.', 'Question: A disease wipes out the squirrels. What happens?', 'Step 1: Hawks lose a food source, so the hawk population may shrink.', 'Step 2: Fewer squirrels eat acorns, so more acorns survive.', 'Step 3: More acorns means more oak seedlings grow. One change ripples through the web.'],
    dos: ['Copy this chain and circle the producer: sunlight → clover → rabbit → fox.', 'Fix this backward chain: hawk → mouse → grass.', 'Label each flip-card organism herbivore, carnivore, omnivore, or decomposer.', 'Predict what happens to the bluegill when invasive fish arrive. Then watch the simulation.'] });
  add('g6-sci-particles', {
    hook: { q: 'Which particles are moving right now: the ones in your desk, your water bottle, or the air?', options: ['Only the air', 'The water and the air', 'All three'] },
    model: ['Problem: Explain what happens to ice particles as the ice is heated.', 'Step 1: At −10 °C, particles are packed tightly and vibrate in place: solid.', 'Step 2: Adding thermal energy makes them vibrate faster.', 'Step 3: At 0 °C they break out of fixed positions and slide past each other: liquid.', 'Step 4: At 100 °C they spread far apart and move fast: gas.'],
    dos: ['Describe how the particles move at −20 °C in 5 words or fewer.', 'Draw three boxes labeled solid, liquid, gas. Draw the particles in each.', 'Explain why the heating curve is flat at 0 °C and at 100 °C.', 'Name each change: steam on a mirror, frost disappearing, a puddle drying.'] });
  add('g6-sci-energy', {
    hook: { q: 'A pencil is held still above the floor. Does it have energy?', options: ['Yes', 'No, it is not moving', 'Not sure'] },
    model: ['Imagine a roller coaster car on a big hill.', 'Step 1: At the top, the car is high and slow: most potential energy (PE).', 'Step 2: Halfway down, it has some PE and some kinetic energy (KE).', 'Step 3: At the bottom, it is low and fast: most KE.', 'Step 4: Energy changed form. It did not disappear (some becomes heat from friction).'],
    dos: ['Label each as mostly PE or KE: a book on a shelf, a rolling ball, a stretched rubber band.', 'Sketch the energy bars at the top and the bottom of the hill.', 'Explain why a metal desk feels cold. Use the words heat and warmer.', 'Write your own example of conduction, convection, and radiation.'] });
  add('g6-sci-space', {
    hook: { q: 'On April 8, 2024, the sky over Indiana went dark at midday. What lined up?', options: ['Sun – Moon – Earth', 'Sun – Earth – Moon', 'Earth – Sun – Moon'] },
    model: ['Imagine the Sun, Earth, and the Moon in a row.', 'Step 1: Moon between the Sun and Earth: that is a new moon.', 'Step 2: If the line is perfect, the Moon\'s shadow falls on Earth: solar eclipse.', 'Step 3: Earth between the Sun and the Moon: that is a full moon.', 'Step 4: If the line is perfect, Earth\'s shadow falls on the Moon: lunar eclipse.'],
    dos: ['Write what happens to the cannonball at slow, medium, and fast speeds.', 'Draw 4 Moon shapes: new, first quarter, full, third quarter.', 'Sketch the line-up for a solar eclipse and a lunar eclipse.', 'Draw Earth, the Moon, and the two ocean bulges.'] });
  add('g5-ss-colonial', {
    hook: { q: 'You must start a town with rocky soil and long, cold winters. What will most people do for work?', options: ['Grow big fields of crops', 'Fish, build ships, and trade', 'Mine for gold'] },
    model: ['Chart: New England | Middle | Southern.', 'Climate row: cold, rocky | mild, fertile | warm, long growing season.', 'Economy row: fishing, shipbuilding, trade | grain farms ("breadbasket") | plantations of tobacco, rice, indigo.', 'Key idea: geography (land and climate) shaped how people made a living.'],
    dos: ['Match each region to its way of life: Woodlands, Plains, Southwest.', 'List one item that went each way in the Columbian Exchange.', 'Copy the three-region chart and fill in the Economy row.', 'Read this clue and name the region: "Our farms grow wheat to sell in Philadelphia."'] });
  add('g5-ss-revolution', {
    hook: { q: 'Imagine a new 10-cent tax on every pencil, and you get no vote about it. Is that fair?', options: ['Fair', 'Unfair', 'It depends'] },
    model: ['Cause-and-effect chain:', 'Debt: Britain owed money after the French and Indian War.', '→ Taxes: the Stamp Act, Townshend Acts, and Tea Act.', '→ Protests: boycotts and the Boston Tea Party.', '→ Punishment: the Intolerable Acts.', '→ Battles: Lexington and Concord, then the Declaration of Independence (1776).'],
    dos: ['Start a timeline from 1760 to 1785. Add 1763 (war ends) and 1765 (Stamp Act).', 'Write "No taxation without representation" in your own words.', 'Add 1770, 1773, and 1775 events to your timeline.', 'Circle the battle that brought France into the war: Saratoga (1777).'] });
  add('g5-ss-civics', {
    hook: { q: 'Should one student make all the class rules, enforce them, AND judge who broke them?', options: ['Yes, it is faster', 'No, it is too much power', 'Not sure'] },
    model: ['Three boxes: Legislative (Congress) | Executive (President) | Judicial (courts).', 'Step 1: Congress passes a bill.', 'Step 2: The President vetoes it (a check on Congress).', 'Step 3: Two-thirds of Congress votes to override (a check on the President).', 'Result: the bill becomes law anyway. No branch has all the power.'],
    dos: ['List one weakness of the Articles of Confederation.', 'Write what "We the People" means in your own words.', 'Draw three boxes for the branches and write each one\'s job.', 'Draw one arrow showing one branch checking another. Label it.'] });
  add('g6-ss-americas', {
    hook: { q: 'How would you grow food on a steep mountain?', options: ['Cut flat steps into it', 'Move somewhere else', 'Only hunt and fish'] },
    model: ['Venn diagram: Maya | Aztec | Inca.', 'Maya and Aztec: stone pyramids and temples.', 'Inca only: roads, rope bridges, and quipus.', 'All three (center): farming adapted to geography, and a strong ruler tied to religion.'],
    dos: ['Draw the number 13 with Maya symbols (2 bars and 3 dots).', 'Sketch a chinampa (a garden bed built up in a lake).', 'Read the quipu cord: count the tens knots, then the ones knots.', 'Rank the causes of the conquest: disease, horses, steel, allies.'] });
  add('g6-ss-europe', {
    hook: { q: 'In medieval Europe, who do you think had the most land?', options: ['The king', 'The knights', 'The farmers'] },
    model: ['Feudal pyramid: King → Nobles → Knights → Peasants and serfs.', 'Each level gave something and got something: land for loyalty, service for protection.', 'Then the Black Death: fewer workers → peasants could demand pay → feudalism weakened.'],
    dos: ['Draw and label the feudal pyramid.', 'Write how the Magna Carta connects to the U.S. Constitution.', 'Copy the cause-and-effect chain for the Black Death.', 'List one Renaissance artist and one invention.'] });
  add('g6-ss-geo', {
    hook: { q: 'Indianapolis (40° N) and Madrid, Spain (40° N) are the same distance from the Equator. Will their weather be the same?', options: ['Yes', 'No', 'Not sure'] },
    model: ['Problem: find 20° S, 60° W on the grid.', 'Step 1: Start at the Equator (0°). Move DOWN to 20° S.', 'Step 2: Start at the Prime Meridian (0°). Move LEFT to 60° W.', 'Step 3: Where they meet is in South America.', 'Remember: latitude first, then longitude.'],
    dos: ['Write the coordinates of the point where the Equator meets the Prime Meridian.', 'Write London\'s coordinates from the grid (latitude first).', 'Compare London and Montréal. Which is colder? Why?', 'Sort the flip cards into adapt, depend, and modify.'] });
  add('g6-ss-ancient', {
    hook: { q: 'Your class must make a rule. Who should decide?', options: ['Everyone votes', 'Elected leaders vote', 'One leader decides'] },
    model: ['G.R.A.P.E.S. chart: Greece | Rome.', 'Geography, Greece: mountains and islands split the land into city-states.', 'Geography, Rome: seven hills by the Tiber River and fertile plains, easier to unite.', 'Conclusion: geography helps explain why Rome became one large empire.'],
    dos: ['Match each Greek god to its Roman name.', 'Sort the achievement cards into Greece or Rome.', 'Complete the T-chart: Athenian democracy vs. Roman Republic.', 'Label the social classes of Athens and of Rome.'] });
  add('g5-ela-theme', {
    hook: { q: 'The tortoise beats the hare. Is "a race" the lesson of the story?', options: ['Yes', 'No', 'Not sure'] },
    model: ['Formula: Character + challenge + response + change → lesson.', 'Character: the tortoise. Challenge: racing a much faster hare.', 'Response: keeps moving steadily. Change: wins while the hare naps.', 'Lesson: "The tortoise learned slow and steady wins."', 'Make it universal (remove the name): "Slow and steady effort can beat talent without effort."'],
    dos: ['Turn "courage" and "friendship" into full theme sentences.', 'Answer the four questions (challenge, response, change, lesson) for the tortoise.', 'Fix this theme by removing the name: "Leo learned to share."', 'Write a 3-sentence summary of "The Tortoise and the Hare."'] });
  add('g5-ela-info', {
    hook: { q: 'A table has a top and legs. If the tabletop is the main idea, what are the legs?', options: ['Key details', 'The title', 'The pictures'] },
    model: ['Paragraph: "Monarch butterflies travel up to 3,000 miles each fall. They fly south to forests in Mexico. They rest in the same trees every year. Monarchs are orange and black."', 'Step 1: What do most sentences have in common? The long trip.', 'Step 2: Main idea: Monarchs make a long journey to Mexico each fall.', 'Step 3: "Orange and black" is interesting but does not support the trip. It is not a key detail.'],
    dos: ['Write the main idea sentence of the wetlands paragraph in the check.', 'Cross out the detail that does not support "Wetlands protect towns from floods."', 'Write a main idea for "How Bees Make Honey" and "Why Bees Are Disappearing."', 'Match each signal word card to its text structure.'] });
  add('g5-ela-vocab', {
    hook: { q: '"My backpack weighs a ton." Is that literally true?', options: ['Yes', 'No, it is an exaggeration', 'Not sure'] },
    model: ['Word: transportable.', 'Step 1: Break it apart: trans + port + able.', 'Step 2: trans = across, port = carry, able = can be.', 'Step 3: Put it together: able to be carried across.', 'Check the sentence: "The transportable stage was moved to the park." It makes sense.'],
    dos: ['Name the clue type (definition, synonym, antonym, example): "Unlike her timid brother, Rosa was bold."', 'Build three words from the root cards (like biology, telegraph, spectator).', 'Add affixes to "help" (helpful, helpless) and "view" (review, preview).', 'Write one simile, one metaphor, and one personification.'] });
  add('g6-ela-evidence', {
    hook: { q: 'A girl walks in, drops her backpack, slams her binder down, and says nothing. How does she feel?', options: ['Happy', 'Upset', 'Sleepy'] },
    model: ['Inference: Marcus is nervous about the game.', 'Evidence A: "The game started at 7:00."', 'Evidence B: "Marcus retied his shoes for the fourth time."', 'Step 1: Does A show nervousness? No. It is about the game but proves nothing about Marcus.', 'Step 2: B shows a nervous habit. B is the strongest evidence.'],
    dos: ['Complete Text clue + What I know = Inference for: "Jada checked the clock for the fifth time."', 'Rank the two pieces of evidence in the check from strongest to weakest.', 'Write one sentence: "According to the text, ___, which shows ___."', 'Make a beginning / middle / end chart for a character you know.'] });
  add('g6-ela-central', {
    hook: { q: 'Which ad is more convincing? A: "Our cereal is the BEST, everyone loves it!" B: "Our cereal has 8 grams of protein, twice the leading brand."', options: ['Ad A', 'Ad B', 'Both the same'] },
    model: ['Claim: Our school should start later.', 'Reason: Students need more sleep to learn well.', 'Evidence: The American Academy of Pediatrics recommends 8:30 a.m. or later.', 'Label: expert source = strong evidence.'],
    dos: ['Write a one-sentence central idea for an article about how school gardens help bees.', 'Label the flip cards claim, reason, and evidence.', 'List the two unsupported phrases from the check.', 'Write a "Some people argue... However..." sentence about later school start times.'] });
  add('g6-ela-vocab', {
    hook: { q: 'Would you rather be called "thrifty" or "cheap"?', options: ['Thrifty', 'Cheap', 'No difference'] },
    model: ['Sentence: "The old house stood on the hill."', 'Version 1: "The ancient mansion loomed over the hill." (creepy tone)', 'Version 2: "The cozy cottage perched on the hill." (warm tone)', 'Only a few words changed, but the connotation changed the whole tone.'],
    dos: ['Rank thin, slender, scrawny, skinny from most negative to most positive.', 'Rewrite "The kitten walked across the room" to sound sneaky, then playful.', 'Name the figurative language in "He has the Midas touch."', 'Use the root "male" (bad) to define "malevolent."'] });
  add('g5-math-fractions', {
    hook: { q: 'You ate 1/2 of a pizza and your friend ate 1/3. Did you eat 2/5 together?', options: ['Yes, 2/5', 'No, more than 2/5', 'No, less than 2/5'] },
    model: ['Problem: 1/2 + 1/3.', 'Step 1: Halves and thirds are different sizes. Both fit into sixths.', 'Step 2: 1/2 = 3/6 and 1/3 = 2/6.', 'Step 3: 3/6 + 2/6 = 5/6.', 'Check: 5/6 is close to 1, and half a pizza plus a third is almost a whole. 2/5 was wrong.'],
    dos: ['Draw a bar, shade 1/2 and 1/4, and write the total as fourths.', 'Solve 1/3 + 1/4. Show the common denominator.', 'Solve 3 1/4 − 1 3/4 by regrouping 1 whole as 4/4.', 'Solve 1/2 × 3/4 and draw it as an area model.'] });
  add('g5-math-decimals', {
    hook: { q: 'Which is bigger: 0.5 or 0.45?', options: ['0.5', '0.45', 'They are equal'] },
    model: ['Problem: 3.6 × 0.4.', 'Step 1: Multiply as whole numbers: 36 × 4 = 144.', 'Step 2: Count decimal places: one in 3.6, one in 0.4 → two in all.', 'Step 3: 1.44.', 'Check with an estimate: about 4 × 0.4 = 1.6. 1.44 is close, so it makes sense.'],
    dos: ['Write the value of each digit in 3.572.', 'Order 0.6, 0.06, 0.66 from least to greatest.', 'Round 3.46 to the nearest tenth.', 'Solve 4.5 + 2.37 and 1.2 × 3.'] });
  add('g5-math-volume', {
    hook: { q: 'How could you find how many sugar cubes fill a box without filling it?', options: ['Count one layer, then multiply', 'Guess', 'Measure the outside only'] },
    model: ['Problem: a prism 4 cubes long, 3 wide, and 5 tall.', 'Step 1: One layer: 4 × 3 = 12 cubes.', 'Step 2: There are 5 layers.', 'Step 3: 12 × 5 = 60.', 'Answer: 60 cubic units. Formula: V = l × w × h.'],
    dos: ['Count the cubes in the prism by layers.', 'Write V = l × w × h and solve for a 5 × 2 × 3 box.', 'Find V for a box with base 6 cm² and height 4 cm.', 'Split the figure into two prisms and find each volume.'] });
  add('g6-math-ratios', {
    hook: { q: 'A 12-pack of juice costs $6. A 20-pack costs $9. Which is the better deal?', options: ['12-pack', '20-pack', 'Same price per juice'] },
    model: ['Problem: 12 for $6 or 20 for $9?', 'Step 1: Unit rate for the 12-pack: $6 ÷ 12 = $0.50 per juice.', 'Step 2: Unit rate for the 20-pack: $9 ÷ 20 = $0.45 per juice.', 'Step 3: Compare: $0.45 < $0.50.', 'Answer: the 20-pack is the better deal, by 5 cents a juice.'],
    dos: ['Write two ratios from the tape diagram (strawberries to yogurt, yogurt to strawberries).', 'Finish the double number line: 12 strawberries → ? yogurt.', 'Find the price per item: 3 pens for $2.40 and 5 pens for $3.50.', 'Find 35% of 200 using 10% first.'] });
  add('g6-math-expressions', {
    hook: { q: 'I multiplied a number by 4 and got 36. What was my number?', options: ['8', '9', '32'] },
    model: ['Problem: x + 7 = 15.', 'Step 1: x has 7 added to it.', 'Step 2: Undo +7 by subtracting 7 from BOTH sides: x + 7 − 7 = 15 − 7.', 'Step 3: x = 8.', 'Check: 8 + 7 = 15 ✓'],
    dos: ['Translate "5 more than n," "twice a number," and "7 less than x."', 'Evaluate 2n + 3 when n = 5.', 'Simplify 5y + 2 + 3y.', 'Solve x + 4 = 10 and check your answer.'] });
  add('g6-math-integers', {
    hook: { q: 'It was −8 °F in Fort Wayne and −3 °F in Evansville. Which city was colder?', options: ['Fort Wayne', 'Evansville', 'Same'] },
    model: ['Problem: plot (−3, 4), then find its distance to (5, 4).', 'Step 1: Start at the origin. x = −3, so move 3 left.', 'Step 2: y = 4, so move 4 up. That is Quadrant II.', 'Step 3: Both points have y = 4. Opposite signs, so add: |−3| + |5| = 8.', 'Answer: 8 units apart.'],
    dos: ['Write an integer for 20 feet below sea level and for a $15 deposit.', 'Order −5, 2, −9, 0 from least to greatest.', 'Find |−7|, |7|, and |0|.', 'Plot (−3, 4) on a sketch and name its quadrant.'] });
})(window.CX_LESSONS);

// Spread the correct choices across A-D. The source data lists every answer first, so each
// multiple-choice check is rotated by a fixed amount taken from its question text. The rotation
// is deterministic, so the presenter, worksheet, key, and script always show the same letters.
(function (LS) {
  function mix(ck) {
    if (!ck || ck.type !== 'mc' || !ck.choices || ck._mixed) return;
    var h = 0, s = ck.q || '', n = ck.choices.length;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973;
    var r = h % n, old = ck.choices.slice();
    ck.choices = old.map(function (_, k) { return old[(k + r) % n]; });
    ck.answer = (ck.answer - r + n) % n;
    ck._mixed = true;
  }
  Object.keys(LS).forEach(function (id) { var L = LS[id]; (L.steps || []).forEach(function (st) { mix(st.check); }); mix(L.youdo); });
})(window.CX_LESSONS);
