/*
 * Student-facing cues for the lesson presenter. Slides show only these cues; everything the
 * teacher says lives in the separate presenter script PDF. Students need only a notebook,
 * the guided notes page, and a pencil.
 *   hook:  { q, options }       prediction question with three vote choices
 *   model: [lines]              worked example shown one line at a time
 *   dos:   [4 strings]          "In your notes" task for each mini-lesson step (all content included)
 */
(function (X) {
  function add(id, o) { if (X[id]) Object.keys(o).forEach(function (k) { X[id][k] = o[k]; }); }
  add('g5-sci-matter', {
    hook: { q: 'A 50-gram ice cube melts inside a sealed bag. What will the water weigh?', options: ['More than 50 g', 'Exactly 50 g', 'Less than 50 g'] },
    model: ['Problem: 30 g of water + 5 g of salt are stirred together. The salt seems to disappear. What is the total mass?', 'Step 1: The salt particles did not vanish. They spread out through the water.', 'Step 2: Nothing left the cup, and nothing was added.', 'Step 3: 30 g + 5 g = 35 g.', 'Answer: 35 g. Mass is conserved.'],
    dos: ['In your notes: list 3 properties of your pencil (color, hardness, shape, texture...).', 'In your notes: read the cylinder in the picture and write its volume in mL. Then find the box\'s volume: 3 × 2 × 2.', 'In your notes: make two columns, Physical and Chemical. Sort the four flip cards.', 'In your notes: predict what the scale will show, open and sealed. Then watch and check.'] });
  add('g5-sci-space', {
    hook: { q: 'This morning the Sun was in the east. At dismissal it will be in the west. What moved?', options: ['The Sun moved', 'Earth spun', 'Both moved'] },
    model: ['Imagine Earth spinning on its axis, with Indiana marked by a dot.', 'Step 1: When Indiana faces the Sun, it is daytime (noon when it faces it directly).', 'Step 2: As Earth keeps spinning west to east, Indiana turns away: sunset, then night.', 'Step 3: One full spin takes 24 hours: one day.', 'Step 4: Earth also orbits the Sun once a year, always tilted the same way. Tilt toward the Sun = summer.'],
    dos: ['In your notes: draw Earth, mark Indiana, and shade the night side. Label "day" and "night."', 'In your notes: make a table with 3 times (9 a.m., noon, 4 p.m.). Record the shadow as long or short.', 'In your notes: draw Earth tilted toward the Sun and label "summer in Indiana."', 'In your notes: write the name of the phase at each Moon position you try.'] });
  add('g5-sci-eco', {
    hook: { q: 'In a forest, a hawk eats a snake that ate a mouse that ate seeds. Where did the hawk\'s energy START?', options: ['The mouse', 'The seeds', 'The Sun'] },
    model: ['Food chain: acorn → squirrel → red-tailed hawk.', 'Question: A disease wipes out the squirrels. What happens?', 'Step 1: Hawks lose a food source, so the hawk population may shrink.', 'Step 2: Fewer squirrels eat acorns, so more acorns survive.', 'Step 3: More acorns means more oak seedlings grow. One change ripples through the web.'],
    dos: ['In your notes: copy this chain and circle the producer: sunlight → clover → rabbit → fox.', 'In your notes: fix this backward chain: hawk → mouse → grass.', 'In your notes: label each flip-card organism herbivore, carnivore, omnivore, or decomposer.', 'In your notes: predict what happens to the bluegill when invasive fish arrive. Then watch the simulation.'] });
  add('g6-sci-particles', {
    hook: { q: 'Which particles are moving right now: the ones in your desk, your water bottle, or the air?', options: ['Only the air', 'The water and the air', 'All three'] },
    model: ['Problem: Explain what happens to ice particles as the ice is heated.', 'Step 1: At −10 °C, particles are packed tightly and vibrate in place: solid.', 'Step 2: Adding thermal energy makes them vibrate faster.', 'Step 3: At 0 °C they break out of fixed positions and slide past each other: liquid.', 'Step 4: At 100 °C they spread far apart and move fast: gas.'],
    dos: ['In your notes: describe how the particles move at −20 °C in 5 words or fewer.', 'In your notes: draw three boxes labeled solid, liquid, gas. Draw the particles in each.', 'In your notes: explain why the heating curve is flat at 0 °C and at 100 °C.', 'In your notes: name each change: steam on a mirror, frost disappearing, a puddle drying.'] });
  add('g6-sci-energy', {
    hook: { q: 'A pencil is held still above the floor. Does it have energy?', options: ['Yes', 'No, it is not moving', 'Not sure'] },
    model: ['Imagine a roller coaster car on a big hill.', 'Step 1: At the top, the car is high and slow: most potential energy (PE).', 'Step 2: Halfway down, it has some PE and some kinetic energy (KE).', 'Step 3: At the bottom, it is low and fast: most KE.', 'Step 4: Energy changed form. It did not disappear (some becomes heat from friction).'],
    dos: ['In your notes: label each as mostly PE or KE: a book on a shelf, a rolling ball, a stretched rubber band.', 'In your notes: sketch the energy bars at the top and the bottom of the hill.', 'In your notes: explain why a metal desk feels cold. Use the words heat and warmer.', 'In your notes: write your own example of conduction, convection, and radiation.'] });
  add('g6-sci-space', {
    hook: { q: 'On April 8, 2024, the sky over Indiana went dark at midday. What lined up?', options: ['Sun – Moon – Earth', 'Sun – Earth – Moon', 'Earth – Sun – Moon'] },
    model: ['Imagine the Sun, Earth, and the Moon in a row.', 'Step 1: Moon between the Sun and Earth: that is a new moon.', 'Step 2: If the line is perfect, the Moon\'s shadow falls on Earth: solar eclipse.', 'Step 3: Earth between the Sun and the Moon: that is a full moon.', 'Step 4: If the line is perfect, Earth\'s shadow falls on the Moon: lunar eclipse.'],
    dos: ['In your notes: write what happens to the cannonball at slow, medium, and fast speeds.', 'In your notes: draw 4 Moon shapes: new, first quarter, full, third quarter.', 'In your notes: sketch the line-up for a solar eclipse and a lunar eclipse.', 'In your notes: draw Earth, the Moon, and the two ocean bulges.'] });
  add('g5-ss-colonial', {
    hook: { q: 'You must start a town with rocky soil and long, cold winters. What will most people do for work?', options: ['Grow big fields of crops', 'Fish, build ships, and trade', 'Mine for gold'] },
    model: ['Chart: New England | Middle | Southern.', 'Climate row: cold, rocky | mild, fertile | warm, long growing season.', 'Economy row: fishing, shipbuilding, trade | grain farms ("breadbasket") | plantations of tobacco, rice, indigo.', 'Key idea: geography (land and climate) shaped how people made a living.'],
    dos: ['In your notes: match each region to its way of life: Woodlands, Plains, Southwest.', 'In your notes: list one item that went each way in the Columbian Exchange.', 'In your notes: copy the three-region chart and fill in the Economy row.', 'In your notes: read this clue and name the region: "Our farms grow wheat to sell in Philadelphia."'] });
  add('g5-ss-revolution', {
    hook: { q: 'Imagine a new 10-cent tax on every pencil, and you get no vote about it. Is that fair?', options: ['Fair', 'Unfair', 'It depends'] },
    model: ['Cause-and-effect chain:', 'Debt: Britain owed money after the French and Indian War.', '→ Taxes: the Stamp Act, Townshend Acts, and Tea Act.', '→ Protests: boycotts and the Boston Tea Party.', '→ Punishment: the Intolerable Acts.', '→ Battles: Lexington and Concord, then the Declaration of Independence (1776).'],
    dos: ['In your notes: start a timeline from 1760 to 1785. Add 1763 (war ends) and 1765 (Stamp Act).', 'In your notes: write "No taxation without representation" in your own words.', 'In your notes: add 1770, 1773, and 1775 events to your timeline.', 'In your notes: circle the battle that brought France into the war: Saratoga (1777).'] });
  add('g5-ss-civics', {
    hook: { q: 'Should one student make all the class rules, enforce them, AND judge who broke them?', options: ['Yes, it is faster', 'No, it is too much power', 'Not sure'] },
    model: ['Three boxes: Legislative (Congress) | Executive (President) | Judicial (courts).', 'Step 1: Congress passes a bill.', 'Step 2: The President vetoes it (a check on Congress).', 'Step 3: Two-thirds of Congress votes to override (a check on the President).', 'Result: the bill becomes law anyway. No branch has all the power.'],
    dos: ['In your notes: list one weakness of the Articles of Confederation.', 'In your notes: write what "We the People" means in your own words.', 'In your notes: draw three boxes for the branches and write each one\'s job.', 'In your notes: draw one arrow showing one branch checking another. Label it.'] });
  add('g6-ss-americas', {
    hook: { q: 'How would you grow food on a steep mountain?', options: ['Cut flat steps into it', 'Move somewhere else', 'Only hunt and fish'] },
    model: ['Venn diagram: Maya | Aztec | Inca.', 'Maya and Aztec: stone pyramids and temples.', 'Inca only: roads, rope bridges, and quipus.', 'All three (center): farming adapted to geography, and a strong ruler tied to religion.'],
    dos: ['In your notes: draw the number 13 with Maya symbols (2 bars and 3 dots).', 'In your notes: sketch a chinampa (a garden bed built up in a lake).', 'In your notes: read the quipu cord: count the tens knots, then the ones knots.', 'In your notes: rank the causes of the conquest: disease, horses, steel, allies.'] });
  add('g6-ss-europe', {
    hook: { q: 'In medieval Europe, who do you think had the most land?', options: ['The king', 'The knights', 'The farmers'] },
    model: ['Feudal pyramid: King → Nobles → Knights → Peasants and serfs.', 'Each level gave something and got something: land for loyalty, service for protection.', 'Then the Black Death: fewer workers → peasants could demand pay → feudalism weakened.'],
    dos: ['In your notes: draw and label the feudal pyramid.', 'In your notes: write how the Magna Carta connects to the U.S. Constitution.', 'In your notes: copy the cause-and-effect chain for the Black Death.', 'In your notes: list one Renaissance artist and one invention.'] });
  add('g6-ss-geo', {
    hook: { q: 'Indianapolis (40° N) and Madrid, Spain (40° N) are the same distance from the Equator. Will their weather be the same?', options: ['Yes', 'No', 'Not sure'] },
    model: ['Problem: find 20° S, 60° W on the grid.', 'Step 1: Start at the Equator (0°). Move DOWN to 20° S.', 'Step 2: Start at the Prime Meridian (0°). Move LEFT to 60° W.', 'Step 3: Where they meet is in South America.', 'Remember: latitude first, then longitude.'],
    dos: ['In your notes: write the coordinates of the point where the Equator meets the Prime Meridian.', 'In your notes: write London\'s coordinates from the grid (latitude first).', 'In your notes: compare London and Montréal. Which is colder? Why?', 'In your notes: sort the flip cards into adapt, depend, and modify.'] });
  add('g5-ela-theme', {
    hook: { q: 'The tortoise beats the hare. Is "a race" the lesson of the story?', options: ['Yes', 'No', 'Not sure'] },
    model: ['Formula: Character + challenge + response + change → lesson.', 'Character: the tortoise. Challenge: racing a much faster hare.', 'Response: keeps moving steadily. Change: wins while the hare naps.', 'Lesson: "The tortoise learned slow and steady wins."', 'Make it universal (remove the name): "Slow and steady effort can beat talent without effort."'],
    dos: ['In your notes: turn "courage" and "friendship" into full theme sentences.', 'In your notes: answer the four questions (challenge, response, change, lesson) for the tortoise.', 'In your notes: fix this theme by removing the name: "Leo learned to share."', 'In your notes: write a 3-sentence summary of "The Tortoise and the Hare."'] });
  add('g5-ela-info', {
    hook: { q: 'A table has a top and legs. If the tabletop is the main idea, what are the legs?', options: ['Key details', 'The title', 'The pictures'] },
    model: ['Paragraph: "Monarch butterflies travel up to 3,000 miles each fall. They fly south to forests in Mexico. They rest in the same trees every year. Monarchs are orange and black."', 'Step 1: What do most sentences have in common? The long trip.', 'Step 2: Main idea: Monarchs make a long journey to Mexico each fall.', 'Step 3: "Orange and black" is interesting but does not support the trip. It is not a key detail.'],
    dos: ['In your notes: write the main idea sentence of the wetlands paragraph in the check.', 'In your notes: cross out the detail that does not support "Wetlands protect towns from floods."', 'In your notes: write a main idea for "How Bees Make Honey" and "Why Bees Are Disappearing."', 'In your notes: match each signal word card to its text structure.'] });
  add('g5-ela-vocab', {
    hook: { q: '"My backpack weighs a ton." Is that literally true?', options: ['Yes', 'No, it is an exaggeration', 'Not sure'] },
    model: ['Word: transportable.', 'Step 1: Break it apart: trans + port + able.', 'Step 2: trans = across, port = carry, able = can be.', 'Step 3: Put it together: able to be carried across.', 'Check the sentence: "The transportable stage was moved to the park." It makes sense.'],
    dos: ['In your notes: name the clue type (definition, synonym, antonym, example): "Unlike her timid brother, Rosa was bold."', 'In your notes: build three words from the root cards (like biology, telegraph, spectator).', 'In your notes: add affixes to "help" (helpful, helpless) and "view" (review, preview).', 'In your notes: write one simile, one metaphor, and one personification.'] });
  add('g6-ela-evidence', {
    hook: { q: 'A girl walks in, drops her backpack, slams her binder down, and says nothing. How does she feel?', options: ['Happy', 'Upset', 'Sleepy'] },
    model: ['Inference: Marcus is nervous about the game.', 'Evidence A: "The game started at 7:00."', 'Evidence B: "Marcus retied his shoes for the fourth time."', 'Step 1: Does A show nervousness? No. It is about the game but proves nothing about Marcus.', 'Step 2: B shows a nervous habit. B is the strongest evidence.'],
    dos: ['In your notes: complete Text clue + What I know = Inference for: "Jada checked the clock for the fifth time."', 'In your notes: rank the two pieces of evidence in the check from strongest to weakest.', 'In your notes: write one sentence: "According to the text, ___, which shows ___."', 'In your notes: make a beginning / middle / end chart for a character you know.'] });
  add('g6-ela-central', {
    hook: { q: 'Which ad is more convincing? A: "Our cereal is the BEST, everyone loves it!" B: "Our cereal has 8 grams of protein, twice the leading brand."', options: ['Ad A', 'Ad B', 'Both the same'] },
    model: ['Claim: Our school should start later.', 'Reason: Students need more sleep to learn well.', 'Evidence: The American Academy of Pediatrics recommends 8:30 a.m. or later.', 'Label: expert source = strong evidence.'],
    dos: ['In your notes: write a one-sentence central idea for an article about how school gardens help bees.', 'In your notes: label the flip cards claim, reason, and evidence.', 'In your notes: list the two unsupported phrases from the check.', 'In your notes: write a "Some people argue... However..." sentence about later school start times.'] });
  add('g6-ela-vocab', {
    hook: { q: 'Would you rather be called "thrifty" or "cheap"?', options: ['Thrifty', 'Cheap', 'No difference'] },
    model: ['Sentence: "The old house stood on the hill."', 'Version 1: "The ancient mansion loomed over the hill." (creepy tone)', 'Version 2: "The cozy cottage perched on the hill." (warm tone)', 'Only a few words changed, but the connotation changed the whole tone.'],
    dos: ['In your notes: rank thin, slender, scrawny, skinny from most negative to most positive.', 'In your notes: rewrite "The kitten walked across the room" to sound sneaky, then playful.', 'In your notes: name the figurative language in "He has the Midas touch."', 'In your notes: use the root "male" (bad) to define "malevolent."'] });
  add('g5-math-fractions', {
    hook: { q: 'You ate 1/2 of a pizza and your friend ate 1/3. Did you eat 2/5 together?', options: ['Yes, 2/5', 'No, more than 2/5', 'No, less than 2/5'] },
    model: ['Problem: 1/2 + 1/3.', 'Step 1: Halves and thirds are different sizes. Both fit into sixths.', 'Step 2: 1/2 = 3/6 and 1/3 = 2/6.', 'Step 3: 3/6 + 2/6 = 5/6.', 'Check: 5/6 is close to 1, and half a pizza plus a third is almost a whole. 2/5 was wrong.'],
    dos: ['In your notes: draw a bar, shade 1/2 and 1/4, and write the total as fourths.', 'In your notes: solve 1/3 + 1/4. Show the common denominator.', 'In your notes: solve 3 1/4 − 1 3/4 by regrouping 1 whole as 4/4.', 'In your notes: solve 1/2 × 3/4 and draw it as an area model.'] });
  add('g5-math-decimals', {
    hook: { q: 'Which is bigger: 0.5 or 0.45?', options: ['0.5', '0.45', 'They are equal'] },
    model: ['Problem: 3.6 × 0.4.', 'Step 1: Multiply as whole numbers: 36 × 4 = 144.', 'Step 2: Count decimal places: one in 3.6, one in 0.4 → two in all.', 'Step 3: 1.44.', 'Check with an estimate: about 4 × 0.4 = 1.6. 1.44 is close, so it makes sense.'],
    dos: ['In your notes: write the value of each digit in 3.572.', 'In your notes: order 0.6, 0.06, 0.66 from least to greatest.', 'In your notes: round 3.46 to the nearest tenth.', 'In your notes: solve 4.5 + 2.37 and 1.2 × 3.'] });
  add('g5-math-volume', {
    hook: { q: 'How could you find how many sugar cubes fill a box without filling it?', options: ['Count one layer, then multiply', 'Guess', 'Measure the outside only'] },
    model: ['Problem: a prism 4 cubes long, 3 wide, and 5 tall.', 'Step 1: One layer: 4 × 3 = 12 cubes.', 'Step 2: There are 5 layers.', 'Step 3: 12 × 5 = 60.', 'Answer: 60 cubic units. Formula: V = l × w × h.'],
    dos: ['In your notes: count the cubes in the prism by layers.', 'In your notes: write V = l × w × h and solve for a 5 × 2 × 3 box.', 'In your notes: find V for a box with base 6 cm² and height 4 cm.', 'In your notes: split the figure into two prisms and find each volume.'] });
  add('g6-math-ratios', {
    hook: { q: 'A 12-pack of juice costs $6. A 20-pack costs $9. Which is the better deal?', options: ['12-pack', '20-pack', 'Same price per juice'] },
    model: ['Problem: 12 for $6 or 20 for $9?', 'Step 1: Unit rate for the 12-pack: $6 ÷ 12 = $0.50 per juice.', 'Step 2: Unit rate for the 20-pack: $9 ÷ 20 = $0.45 per juice.', 'Step 3: Compare: $0.45 < $0.50.', 'Answer: the 20-pack is the better deal, by 5 cents a juice.'],
    dos: ['In your notes: write two ratios from the tape diagram (strawberries to yogurt, yogurt to strawberries).', 'In your notes: finish the double number line: 12 strawberries → ? yogurt.', 'In your notes: find the price per item: 3 pens for $2.40 and 5 pens for $3.50.', 'In your notes: find 35% of 200 using 10% first.'] });
  add('g6-math-expressions', {
    hook: { q: 'I multiplied a number by 4 and got 36. What was my number?', options: ['8', '9', '32'] },
    model: ['Problem: x + 7 = 15.', 'Step 1: x has 7 added to it.', 'Step 2: Undo +7 by subtracting 7 from BOTH sides: x + 7 − 7 = 15 − 7.', 'Step 3: x = 8.', 'Check: 8 + 7 = 15 ✓'],
    dos: ['In your notes: translate "5 more than n," "twice a number," and "7 less than x."', 'In your notes: evaluate 2n + 3 when n = 5.', 'In your notes: simplify 5y + 2 + 3y.', 'In your notes: solve x + 4 = 10 and check your answer.'] });
  add('g6-math-integers', {
    hook: { q: 'It was −8 °F in Fort Wayne and −3 °F in Evansville. Which city was colder?', options: ['Fort Wayne', 'Evansville', 'Same'] },
    model: ['Problem: plot (−3, 4), then find its distance to (5, 4).', 'Step 1: Start at the origin. x = −3, so move 3 left.', 'Step 2: y = 4, so move 4 up. That is Quadrant II.', 'Step 3: Both points have y = 4. Opposite signs, so add: |−3| + |5| = 8.', 'Answer: 8 units apart.'],
    dos: ['In your notes: write an integer for 20 feet below sea level and for a $15 deposit.', 'In your notes: order −5, 2, −9, 0 from least to greatest.', 'In your notes: find |−7|, |7|, and |0|.', 'In your notes: plot (−3, 4) on a sketch and name its quadrant.'] });
})(window.CX_LESSONS);
