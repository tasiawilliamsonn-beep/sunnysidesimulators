/*
 * Sunnyside Simulators: Grade 6 math simulations.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

/* ======================= Ratios, rates & percents ======================= */
SUNNY_SIMS.push({
  id: 'g6-math-smoothie-mixer', std: 'g6-math-ratios', subject: 'math', grade: 6, code: '6.NS.9',
  title: 'Smoothie Mixer', model: 'smoothie', minutes: 20, icon: '🥤',
  place: 'Sunnyside Smoothie Bar',
  mission: 'The smoothie bar\'s famous Berry Blast uses 2 cups of strawberries for every 3 cups of yogurt. Customers order different sizes, and every size must taste exactly the same. Mix, taste-test, and build a ratio table.',
  question: 'How do equivalent ratios keep a recipe the same at any size?',
  takeaway: 'Equivalent ratios describe the same relationship: 2:3, 4:6, 6:9, and 10:15 all taste the same because both quantities are multiplied by the same number. Ratio tables and double number lines show equivalent ratios and help scale recipes up or down.',
  vocab: [['Ratio', 'A comparison of two quantities, like 2:3.'], ['Equivalent ratios', 'Ratios that show the same relationship.'], ['Ratio table', 'A table of equivalent ratios.'], ['Double number line', 'Two number lines lined up to show equivalent ratios.'], ['Scale', 'Multiply both quantities by the same number.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain.', items: [['A drink with 1 scoop of powder in 2 cups of water, or 3 scoops in 5 cups? Which is stronger?', '3:5 (0.6 scoop per cup) is stronger than 1:2 (0.5).'], ['Is 2:3 the same as 3:2?', 'No: order matters.'], ['Double the recipe 2 cups : 3 cups.', '4 cups : 6 cups.']] },
  steps: [
    { tag: 'explore', title: 'Make the original', goal: { text: 'Make one batch that passes the taste test.', check: { ok_2_3: true } }, q: { type: 'mc', q: 'Which ratio did you use?', choices: ['2 strawberry : 3 yogurt', '3 strawberry : 2 yogurt', '2 : 2'], answer: 0 } },
    { tag: 'test', title: 'A mistake', sheet: 1, goal: { text: 'Try 3 strawberry : 4 yogurt and taste it (one more of each).', check: { a: 3, b: 4 } },
      q: { type: 'mc', q: 'Why does 3:4 NOT taste the same as 2:3, even though you added 1 to each?', choices: ['Adding the same amount changes the relationship; you must MULTIPLY both', '3:4 is exactly the same', 'It has too much yogurt'], answer: 0 } },
    { tag: 'record', title: 'Build a ratio table', sheet: 2, goal: { text: 'Save at least 4 different batch sizes that pass the taste test.', check: { saved: { gte: 4 } } },
      q: { type: 'table', q: 'Complete the ratio table.', rowHead: 'Size', cols: [{ label: 'Strawberry (cups)', value: function (s, r) { return r.a; } }, { label: 'Yogurt (cups)', value: function (s, r) { return r.b; } }], rows: [{ label: 'Small', a: 2, b: 3 }, { label: 'Medium', a: 4, b: 6 }, { label: 'Party', a: 10, b: 15 }] } },
    { tag: 'test', title: 'Double number line', sheet: 3, goal: { text: 'Turn on the double number line.', check: { usedDNL: true } },
      q: { type: 'num', q: 'The party blender uses 18 cups of yogurt. How many cups of strawberries?', unit: 'cups', answer: 12, work: true } },
    { tag: 'reason', title: 'Equivalent or not?', sheet: 4, q: { type: 'sort', q: 'Which will taste like Berry Blast (2:3)?', bins: ['Tastes the same', 'Tastes different'], items: [['6 : 9', 0], ['8 : 12', 0], ['5 : 6', 1], ['14 : 21', 0], ['3 : 2', 1], ['7 : 10', 1]] } },
    { tag: 'apply', title: 'Scale down', sheet: 5, q: { type: 'num', q: 'A kid-size smoothie uses 1 cup of strawberries. How much yogurt?', unit: 'cups', answer: 1.5, work: true } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: part to whole', sheet: 6, q: { type: 'num', q: 'What FRACTION of any Berry Blast is strawberry? (Hint: part to whole.)', answer: 0.4, tol: 0.001, why: '2 out of every 5 cups = 2/5.' } },
    { tag: 'explain', title: 'Train a new employee', sheet: 7, q: { type: 'text', q: 'Explain how to make a Berry Blast of ANY size so it tastes the same.', rows: 3, need: [{ words: ['multiply', 'times', 'same number', 'scale', 'double', 'triple'], label: 'Multiply both by the same number' }, { words: ['2', '3', 'ratio'], label: 'Uses the 2:3 ratio' }], avoid: [['add the same', 'Does not say to add the same amount']] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-race-rates', std: 'g6-math-ratios', subject: 'math', grade: 6, code: '6.NS.10',
  title: 'Animal Race Rates', model: 'raceRates', minutes: 20, icon: '🐆',
  place: 'Sunnyside Nature Center · Speed Track',
  mission: 'The nature center measured how far animals ran in different amounts of time. That makes them hard to compare! Find each unit rate (meters per 1 second), predict distances, then race them to check.',
  question: 'How do unit rates help us compare and predict?',
  takeaway: 'A unit rate tells how much for ONE unit (meters per 1 second). Divide the distance by the time. Unit rates let you compare fairly and predict: distance = unit rate × time.',
  vocab: [['Rate', 'A ratio comparing two different units, like meters and seconds.'], ['Unit rate', 'A rate for 1 unit, like 30 meters per second.'], ['Per', 'For each one.'], ['Predict', 'Use a pattern to tell what will happen.']],
  warmup: { style: 'Number talk', prompt: 'Solve in your head and explain.', items: [['150 m in 5 s is how many meters in 1 s?', '30 m.'], ['6 apples for $3. Price of 1?', '$0.50.'], ['Who is faster: 84 m in 6 s or 72 m in 4 s?', '72 m in 4 s (18 m/s vs 14 m/s).']] },
  steps: [
    { tag: 'predict', title: 'Predict the winner', sheet: 1, q: { type: 'predict', q: 'Using only the data, who do you think is faster: the horse (84 m in 6 s) or the rabbit (72 m in 4 s)?', choices: ['Horse (it ran farther)', 'Rabbit', 'Tie'] } },
    { tag: 'record', title: 'Find unit rates', sheet: 1, q: { type: 'table', q: 'Find each racer\'s unit rate.', rowHead: 'Racer', cols: [{ label: 'Meters per 1 second', unit: 'm/s', value: function (s, r) { return r.v; }, tol: 0.001 }], rows: [{ label: 'Cheetah (150 m in 5 s)', v: 30 }, { label: 'Horse (84 m in 6 s)', v: 14 }, { label: 'Rabbit (72 m in 4 s)', v: 18 }, { label: 'Sixth grader (42 m in 7 s)', v: 6 }] } },
    { tag: 'test', title: 'Race for 10 seconds', sheet: 2, goal: { text: 'Run a 10-second race.', check: { raced: true, lastT: 10 } },
      q: { type: 'mc', q: 'You predicted: {{pred:s0}}. Who beat whom between the horse and rabbit?', choices: ['The rabbit (18 m/s beats 14 m/s)', 'The horse', 'Tie'], answer: 0 } },
    { tag: 'reason', title: 'Use the rate', sheet: 3, q: { type: 'num', q: 'Predict: how far does the sixth grader run in 10 seconds?', unit: 'm', answer: 60, work: true } },
    { tag: 'test', title: 'Check predictions', sheet: 3, goal: { text: 'Race for 3 seconds.', check: { d_cheetah_3: { gte: 1 } } },
      q: { type: 'num', q: 'How far did the cheetah run in 3 seconds?', unit: 'm', answer: 90 } },
    { tag: 'apply', title: 'Head start', sheet: 4, q: { type: 'num', q: 'The sixth grader gets a 100 m head start in a 10-second race against the rabbit. Who is ahead at the end, and by how many meters? (Type the gap.)', unit: 'm', answer: 20, work: true, why: 'Sixth grader: 100 + 60 = 160 m. Rabbit: 180 m. The rabbit leads by 20 m.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: time to finish', sheet: 5, q: { type: 'num', q: 'How many seconds does the horse need to run 350 m?', unit: 's', answer: 25, work: true } },
    { tag: 'explain', title: 'Why unit rates?', sheet: 6, q: { type: 'text', q: 'Explain why comparing "84 m in 6 s" to "72 m in 4 s" is tricky, and how unit rates help.', rows: 3, need: [{ words: ['different', 'not the same'], label: 'Different times make it tricky' }, { words: ['1 second', 'one second', 'per second', 'unit rate', 'divide'], label: 'Unit rate compares per 1 second' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-sale-day', std: 'g6-math-ratios', subject: 'math', grade: 6, code: '6.NS.10',
  title: 'Sale Day Percents', model: 'percentStore', minutes: 20, icon: '🏷️',
  place: 'Sunnyside Mall · Big Sale',
  mission: 'Everything at the mall is on sale, and shoppers want to know what they\'ll really pay. Use a percent bar (a tape diagram) to find the discount and the sale price, without a calculator.',
  question: 'How can a percent bar help us find a percent of a quantity?',
  takeaway: 'A percent is a rate per 100. On a percent bar, 100% matches the whole price. Find 10% by dividing by 10, then build other percents from it (25% = 10% + 10% + 5%). The sale price = 100% − discount %.',
  vocab: [['Percent', 'Per hundred: 25% means 25 out of 100.'], ['Discount', 'The amount taken off a price.'], ['Sale price', 'The price after the discount.'], ['Tape diagram', 'A bar split into parts to show a ratio or percent.']],
  warmup: { style: 'Number talk', prompt: 'Find mentally. Explain one strategy.', items: [['10% of $60', '$6.'], ['5% of $60', '$3 (half of 10%).'], ['25% of $60', '$15 (10% + 10% + 5%, or 1/4).']] },
  steps: [
    { tag: 'explore', title: 'Find 10%', setup: { item: 0 }, goal: { text: 'Drag the marker to **10%** on the sneakers bar.', check: { item: 0, pct: 10 } }, q: { type: 'num', q: 'What is 10% of $60?', unit: '$', answer: 6 } },
    { tag: 'test', title: 'The discount', sheet: 1, strategy: '25% = 10% + 10% + 5%.', goal: { text: 'Move the marker to the discount percent (25%).', check: { off_0: true } }, q: { type: 'num', q: 'How much do you SAVE on the sneakers?', unit: '$', answer: 15, work: true } },
    { tag: 'test', title: 'What you pay', sheet: 1, goal: { text: 'Move the marker to the percent you PAY (100% − 25%).', check: { pay_0: true } }, q: { type: 'num', q: 'What is the sale price?', unit: '$', answer: 45 } },
    { tag: 'record', title: 'Sale table', sheet: 2, q: { type: 'table', q: 'Use the percent bar for each item.', rowHead: 'Item', cols: [{ label: 'You save', unit: '$', value: function (s, r) { return r.s; }, tol: 0.001 }, { label: 'You pay', unit: '$', value: function (s, r) { return r.p; }, tol: 0.001 }], rows: [{ label: 'Jacket $80, 30% off', s: 24, p: 56 }, { label: 'Backpack $45, 20% off', s: 9, p: 36 }, { label: 'Headphones $120, 15% off', s: 18, p: 102 }] } },
    { tag: 'reason', title: 'Better deal?', sheet: 3, q: { type: 'mc', q: 'Which saves more money: 30% off $80, or 15% off $120?', choices: ['30% off $80 ($24 vs $18)', '15% off $120', 'They save the same'], answer: 0 } },
    { tag: 'reason', title: 'Error detective', sheet: 4, text: 'Jordan says, "20% off $45 means the price is $25, because 45 − 20 = 25."', q: { type: 'mc', q: 'What did Jordan do wrong?', choices: ['Subtracted 20 dollars instead of 20 percent. 20% of $45 is $9, so the price is $36', 'Nothing', 'Should have added'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: backwards', sheet: 5, q: { type: 'num', q: 'A hoodie on sale for 40% off costs $27. What was the original price?', unit: '$', answer: 45, work: true, why: '$27 is 60% of the price. 10% = $4.50, so 100% = $45.' } },
    { tag: 'explain', title: 'Shopper tip', sheet: 6, q: { type: 'text', q: 'Explain how to find 25% off a $60 item without a calculator.', number: true, rows: 3, need: [{ words: ['10%', '10 percent', 'ten percent', 'quarter', '1/4', 'fourth'], label: 'Uses a friendly percent' }, { words: ['45', 'subtract', 'pay', '75%'], label: 'Finds what you pay' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-road-trip', std: 'g6-math-ratios', subject: 'math', grade: 6, code: '6.NS.9–6.NS.10',
  title: 'Road Trip Map Scale', model: 'mapScale', minutes: 20, icon: '🗺️',
  place: 'Sunnyside Travel Agency',
  mission: 'A family is planning a road trip through five towns. Measure the roads on the map with a ruler, use the map scale to find real distances, and figure out how long the drive will take.',
  question: 'How do map scales use ratios to find real distances?',
  takeaway: 'A map scale is a ratio: 1 cm on the map = 10 real miles. Multiply the map distance by the scale to find the real distance. Then a rate (miles per hour) tells how long the trip takes: time = distance ÷ speed.',
  vocab: [['Scale', 'A ratio comparing map distance to real distance.'], ['Scale drawing', 'A drawing that shrinks or enlarges something by the same ratio.'], ['Rate', 'Like 50 miles per hour.'], ['Proportional', 'Changing by the same multiplier.']],
  warmup: { style: 'Estimation station', prompt: 'Estimate and explain.', items: [['If 1 inch = 5 miles, what is 4 inches?', '20 miles.'], ['At 50 mph, how long to drive 100 miles?', '2 hours.'], ['Why do maps need a scale?', 'To shrink real distances by the same amount so they fit.']] },
  steps: [
    { tag: 'explore', title: 'First road', goal: { text: 'Tap **Sunnyside** then **Maple Falls** to measure.', check: { 'm_MapleFalls|Sunnyside': { gte: 1 } } },
      q: { type: 'num', q: 'How many centimeters long is the road on the map?', unit: 'cm', answer: 15 } },
    { tag: 'reason', title: 'Real distance', sheet: 1, q: { type: 'num', q: 'Using the scale (1 cm = 10 miles), how many real miles is it?', unit: 'miles', answer: 150 } },
    { tag: 'record', title: 'Trip table', sheet: 2, q: { type: 'table', q: 'Measure each road and convert.', rowHead: 'Road', cols: [{ label: 'Map', unit: 'cm', value: function (s, r) { return s[r.k]; }, tol: 0.15 }, { label: 'Real', unit: 'mi', value: function (s, r) { return s[r.k] * 10; }, tol: 1.5 }],
      rows: [{ label: 'Maple Falls → Oak Ridge', k: 'm_MapleFalls|OakRidge', when: function (s) { return s['m_MapleFalls|OakRidge'] != null; } }, { label: 'Oak Ridge → Pine Lake', k: 'm_OakRidge|PineLake', when: function (s) { return s['m_OakRidge|PineLake'] != null; } }, { label: 'Pine Lake → Cedar Point', k: 'm_CedarPoint|PineLake', when: function (s) { return s['m_CedarPoint|PineLake'] != null; } }] } },
    { tag: 'apply', title: 'Drive time', sheet: 3, q: { type: 'num', q: 'The family drives 50 miles per hour. How many hours from Sunnyside to Maple Falls (150 mi)?', unit: 'hours', answer: 3 } },
    { tag: 'reason', title: 'Which route?', sheet: 4, q: { type: 'mc', q: 'To get from Maple Falls to Pine Lake, is it shorter to go through Oak Ridge (80 + 120 mi) or through Cedar Point (≈122 + 100 mi)?', choices: ['Through Oak Ridge (200 mi vs about 222 mi)', 'Through Cedar Point', 'Same'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: new scale', sheet: 5, q: { type: 'num', q: 'A new map uses 1 cm = 25 miles. How many cm would the 150-mile road be?', unit: 'cm', answer: 6 } },
    { tag: 'explain', title: 'Trip plan', sheet: 6, q: { type: 'text', q: 'Explain how you used the map scale and the speed to plan the trip from Sunnyside to Maple Falls.', number: true, rows: 3, need: [{ words: ['cm', 'centimeter'], label: 'Measured in cm' }, { words: ['10', 'scale', 'multiply'], label: 'Used the scale' }, { words: ['hour', 'mph', '50'], label: 'Used the rate' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-paint-mixer', std: 'g6-math-ratios', subject: 'math', grade: 6, code: '6.NS.9–6.NS.10',
  title: 'Paint Mixer', model: 'paintMix', minutes: 20, icon: '🎨',
  place: 'Sunnyside Hardware · Paint Counter',
  mission: 'The school is painting a mural. The paint counter mixes custom colors by ratio. Match each color exactly in bigger batches, then find what part and what percent of each can is blue.',
  question: 'How are part-to-part ratios, part-to-whole ratios, and percents related?',
  takeaway: 'A part-to-part ratio compares two parts (1 blue : 3 yellow). A part-to-whole ratio compares a part to the total (1 blue out of 4 parts = 1/4 = 25%). Scaling both parts by the same number keeps the color the same.',
  vocab: [['Part-to-part', 'Compares one part to another part (1:3).'], ['Part-to-whole', 'Compares one part to the total (1 out of 4).'], ['Percent', 'A part-to-whole ratio out of 100.'], ['Equivalent', 'Same value, different numbers.']],
  warmup: { style: 'Which one doesn\'t belong?', prompt: 'Which does NOT name the same relationship?', items: [['1:3 · 2:6 · 3:9 · 3:1', '3:1: the order is flipped.'], ['1/4 · 25% · 0.25 · 1/3', '1/3.'], ['In 1 blue : 3 yellow, what fraction is blue?', '1/4.']] },
  steps: [
    { tag: 'explore', title: 'Sunnyside Green', setup: { target: 0 }, goal: { text: 'Mix an exact match for Sunnyside Green (1 blue : 3 yellow).', check: { target: 0, match: true } } },
    { tag: 'test', title: 'Bigger batch', sheet: 1, goal: { text: 'Make a batch of Sunnyside Green with **12 total** cans.', check: { match_0_12: true } }, q: { type: 'table', q: 'Record the batch.', rowHead: 'Batch', cols: [{ label: 'Blue', value: function (s, r) { return r.b; } }, { label: 'Yellow', value: function (s, r) { return r.y; } }, { label: 'Total', value: function (s, r) { return r.b + r.y; } }], rows: [{ label: 'Recipe', b: 1, y: 3 }, { label: 'Big batch', b: 3, y: 9 }] } },
    { tag: 'reason', title: 'Part to whole', sheet: 2, q: { type: 'num', q: 'What percent of Sunnyside Green is blue?', unit: '%', answer: 25 } },
    { tag: 'test', title: 'Ocean Teal', setup: { target: 1 }, sheet: 3, goal: { text: 'Match Ocean Teal (3 blue : 2 yellow) with 15 total cans.', check: { match_1_15: true } }, q: { type: 'num', q: 'What percent of Ocean Teal is blue?', unit: '%', answer: 60, work: true } },
    { tag: 'test', title: 'Spring Lime', setup: { target: 2 }, sheet: 4, goal: { text: 'Match Spring Lime (1 blue : 4 yellow) with 10 total cans.', check: { match_2_10: true } }, q: { type: 'num', q: 'How many cans of yellow did you use?', unit: 'cans', answer: 8 } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Riya says Ocean Teal is 3/2 blue because the ratio is 3:2.', q: { type: 'mc', q: 'What is Riya mixing up?', choices: ['Part-to-part (3:2) with part-to-whole (3 out of 5 = 3/5)', 'Nothing', 'Blue and yellow'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: mural order', sheet: 6, q: { type: 'num', q: 'The mural needs 40 cans of Spring Lime. How many cans of blue are needed?', unit: 'cans', answer: 8, work: true } },
    { tag: 'explain', title: 'Paint counter guide', sheet: 7, q: { type: 'text', q: 'Explain the difference between "1 blue : 3 yellow" and "blue is 1/4 of the paint."', rows: 3, need: [{ words: ['part', 'compare'], label: 'Talks about parts' }, { words: ['whole', 'total', 'all'], label: 'Talks about the whole' }] } }
  ]
});

/* ======================= Expressions & equations ======================= */
SUNNY_SIMS.push({
  id: 'g6-math-balance-scale', std: 'g6-math-expressions', subject: 'math', grade: 6, code: '6.AF.3',
  title: 'Balance Scale Solver', model: 'balance', minutes: 20, icon: '⚖️',
  place: 'Sunnyside Math Lab · Balance Bench',
  mission: 'Mystery bags each hold the same number of blocks. Keep the scale balanced while you remove and split blocks, and you\'ll discover the hidden number, which is exactly how equations are solved.',
  question: 'How does keeping a balance help us solve equations?',
  takeaway: 'An equation is like a balanced scale. Whatever you do to one side, you must do to the other to keep it balanced. Subtracting the same amount from both sides, or dividing both sides into the same number of equal groups, gets x alone.',
  vocab: [['Equation', 'A statement that two expressions are equal (it balances).'], ['Variable', 'A letter, like x, for an unknown number.'], ['Inverse operation', 'An operation that undoes another (− undoes +, ÷ undoes ×).'], ['Solution', 'The value that makes the equation true.']],
  warmup: { style: 'Mystery number', prompt: 'Find the mystery number and explain how.', items: [['? + 3 = 8', '5.'], ['3 × ? = 12', '4.'], ['2 × ? + 5 = 17', '6.']] },
  steps: [
    { tag: 'explore', title: 'x + 3 = 8', setup: { eq: 0 }, goal: { text: 'Try **Take 1 block off the LEFT only** and watch the scale.', check: { unbalanced: true } },
      q: { type: 'mc', q: 'What happened when you changed only one side?', choices: ['The scale tipped: the two sides were no longer equal', 'Nothing', 'The bag got lighter'], answer: 0 } },
    { tag: 'test', title: 'Solve it fairly', sheet: 1, text: 'Press ↺ Reset scale.', goal: { text: 'Solve x + 3 = 8 by keeping the scale balanced the whole time.', check: { solved_0: { gte: 0 } } },
      q: { type: 'num', q: 'What is x?', answer: 5, why: 'Removing 3 from both sides leaves x = 5.' } },
    { tag: 'test', title: '3x = 12', setup: { eq: 1 }, sheet: 2, goal: { text: 'Solve 3x = 12.', check: { solved_1: { gte: 0 } } },
      q: { type: 'mc', q: 'Which move solved it?', choices: ['Split both sides into 3 equal groups (divide by 3)', 'Take 3 blocks off both sides', 'Add 3 to both sides'], answer: 0 } },
    { tag: 'test', title: '2x + 5 = 17', setup: { eq: 2 }, sheet: 3, goal: { text: 'Solve 2x + 5 = 17.', check: { solved_2: { gte: 0 } } },
      q: { type: 'order', q: 'Put your moves in order.', items: ['Take 5 blocks off both sides → 2x = 12', 'Split both sides into 2 groups → x = 6', 'Check: 2 × 6 + 5 = 17 ✓'] } },
    { tag: 'reason', title: 'Check the solution', sheet: 4, q: { type: 'mc', q: 'How can you CHECK that x = 6 is right for 2x + 5 = 17?', choices: ['Put 6 in for x: 2(6) + 5 = 17, true', 'Ask a friend', 'x is always 6'], answer: 0 } },
    { tag: 'test', title: '4x + 2 = 22', setup: { eq: 3 }, sheet: 5, goal: { text: 'Solve 4x + 2 = 22.', check: { solved_3: { gte: 0 } } }, q: { type: 'num', q: 'x = ?', answer: 5, work: true } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: no scale', sheet: 6, q: { type: 'num', q: 'Solve without the scale: 7x + 9 = 65.', answer: 8, work: true } },
    { tag: 'explain', title: 'Explain the rule', sheet: 7, q: { type: 'text', q: 'Explain why you must do the same thing to both sides of an equation.', rows: 3, need: [{ words: ['both sides', 'each side'], label: 'Mentions both sides' }, { words: ['balance', 'equal', 'same'], label: 'Keeps it equal/balanced' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-function-machine', std: 'g6-math-expressions', subject: 'math', grade: 6, code: '6.AF.1–6.AF.2',
  title: 'Function Machine', model: 'funcMachine', minutes: 20, icon: '⚙️',
  place: 'Sunnyside Makerspace · Mystery Machines',
  mission: 'The makerspace has five mystery machines. Each one follows a secret rule. Feed them inputs, study the table, and write each rule as an expression with a variable.',
  question: 'How can we write an expression that describes a pattern?',
  takeaway: 'An expression uses a variable (like n) to stand for any input. Look at how the output changes when the input goes up by 1: that is the number multiplied by n. Then check what is added or subtracted. Test your expression on several inputs.',
  vocab: [['Expression', 'Numbers, variables, and operations, like 2n + 1.'], ['Variable', 'A letter that stands for a number that can change.'], ['Coefficient', 'The number multiplied by a variable (the 2 in 2n).'], ['Evaluate', 'Find the value by substituting a number for the variable.']],
  warmup: { style: 'What\'s my rule?', prompt: 'Find the rule for each table.', items: [['1→5, 2→6, 3→7', 'Add 4.'], ['1→3, 2→6, 3→9', 'Multiply by 3.'], ['1→3, 2→5, 3→7', 'Multiply by 2, add 1.']] },
  steps: [
    { tag: 'explore', title: 'Machine 1', setup: { machine: 0 }, goal: { text: 'Feed Machine 1 at least 3 different inputs.', check: { machine: 0, inputs: { gte: 3 } } } },
    { tag: 'test', title: 'Crack the rule', sheet: 1, goal: { text: 'Type your rule for Machine 1 and test it.', check: { rule_0: true } }, q: { type: 'mc', q: 'Which expression is Machine 1\'s rule?', choices: ['n + 4', '4n', 'n − 4', '4'], answer: 0 } },
    { tag: 'test', title: 'Machine 3', setup: { machine: 2 }, sheet: 2, strategy: 'Try inputs 0, 1, 2, 3 in order. How much does the output grow each time?', goal: { text: 'Crack Machine 3 and test your rule.', check: { rule_2: true } },
      q: { type: 'num', q: 'Use the rule: what is the output for n = 10?', answer: 21 } },
    { tag: 'test', title: 'Machine 4', setup: { machine: 3 }, sheet: 3, goal: { text: 'Crack Machine 4.', check: { rule_3: true } },
      q: { type: 'text', q: 'Write Machine 4\'s rule as an expression.', need: [{ words: ['5n', '5 n', '5 × n', '5*n'], label: 'Multiplies n by 5' }, { words: ['- 3', '−3', '-3', '− 3'], label: 'Subtracts 3' }], min: 1 } },
    { tag: 'reason', title: 'Spot the coefficient', sheet: 4, q: { type: 'mc', q: 'Machine 4\'s outputs grow by 5 each time n goes up by 1. What does that tell you?', choices: ['The rule multiplies n by 5', 'The rule adds 5', 'The output is always 5'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: Machine 5', setup: { machine: 4 }, sheet: 5, goal: { text: 'Crack Machine 5.', check: { rule_4: true } }, q: { type: 'num', q: 'What is Machine 5\'s output for n = 20?', answer: 11 } },
    { tag: 'explain', title: 'Explain your method', sheet: 6, q: { type: 'text', q: 'Explain how you figured out a machine\'s rule. Use the words "input" and "output".', rows: 3, need: [{ words: ['input'], label: 'Uses input' }, { words: ['output'], label: 'Uses output' }, { words: ['pattern', 'each time', 'grow', 'goes up', 'table'], label: 'Describes finding the pattern' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-algebra-tiles', std: 'g6-math-expressions', subject: 'math', grade: 6, code: '6.AF.2',
  title: 'Algebra Tile Workshop', model: 'algebraTiles', minutes: 20, icon: '🧩',
  place: 'Sunnyside Math Lab · Tile Table',
  mission: 'Two expressions can look different but always give the same answer. Build groups of algebra tiles, copy them, and sort like tiles to prove expressions are equivalent.',
  question: 'How can tiles show that two expressions are equivalent?',
  takeaway: 'The distributive property says 3(x + 2) = 3x + 6: three groups of (x + 2) have 3 x-tiles and 6 unit tiles. Combining like terms (x-tiles with x-tiles, units with units) simplifies expressions without changing their value.',
  vocab: [['Equivalent expressions', 'Expressions that are equal for every value of the variable.'], ['Distributive property', 'a(b + c) = ab + ac.'], ['Like terms', 'Terms with the same variable part, like 2x and 5x.'], ['Simplify', 'Rewrite with fewer terms.']],
  warmup: { style: 'Number talk', prompt: 'Compute two ways. Are they equal?', items: [['3 × (10 + 2) vs 3 × 10 + 3 × 2', 'Both 36.'], ['4 groups of (5 + 1)', '24 = 20 + 4.'], ['Is 2x + 3x the same as 5x?', 'Yes.']] },
  steps: [
    { tag: 'explore', title: 'Build x + 2', goal: { text: 'Build one group: 1 x-tile and 2 unit tiles.', check: { gx: 1, gu: 2 } } },
    { tag: 'test', title: 'Make 3 groups', sheet: 1, goal: { text: 'Make 3 groups of (x + 2), then sort like tiles.', check: { g_3_1_2: true, sorted: true } },
      q: { type: 'mc', q: 'What is 3(x + 2) after sorting?', choices: ['3x + 6', '3x + 2', 'x + 6', '5x'], answer: 0 } },
    { tag: 'test', title: '2(2x + 3)', sheet: 2, goal: { text: 'Build 2 groups of (2x + 3) and sort.', check: { g_2_2_3: true, sorted: true } },
      q: { type: 'text', q: 'Write 2(2x + 3) without parentheses.', need: [{ words: ['4x'], label: '4x' }, { words: ['6'], label: '+ 6' }], min: 1 } },
    { tag: 'test', title: 'Messy pile', sheet: 3, goal: { text: 'Load the messy pile and sort like tiles.', check: { mess: true, sorted: true } },
      q: { type: 'mc', q: 'What does 2x + 3 + x + 1 + 2x simplify to?', choices: ['5x + 4', '9x', '4x + 5', '5x + 1'], answer: 0 } },
    { tag: 'reason', title: 'Prove it with a number', sheet: 4, q: { type: 'mc', q: 'Test 3(x + 2) and 3x + 6 with x = 4. What do you get?', choices: ['Both equal 18', '18 and 14', '12 and 18'], answer: 0 } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Tia says 4(x + 3) = 4x + 3.', q: { type: 'mc', q: 'What did Tia forget?', choices: ['To multiply the 3 by 4 as well (4x + 12)', 'Nothing', 'To add 4'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: factor it', sheet: 6, q: { type: 'mc', q: 'Which expression is equivalent to 6x + 9?', choices: ['3(2x + 3)', '6(x + 9)', '3(2x + 9)', '9(6x)'], answer: 0 } },
    { tag: 'explain', title: 'Explain with tiles', sheet: 7, q: { type: 'text', q: 'Explain how the tiles show 3(x + 2) = 3x + 6.', rows: 3, need: [{ words: ['group', 'copies'], label: 'Uses groups' }, { words: ['x tile', 'x-tile', '3x'], label: 'Counts x tiles' }, { words: ['6', 'unit', 'ones'], label: 'Counts unit tiles' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-arcade-tokens', std: 'g6-math-expressions', subject: 'math', grade: 6, code: '6.AF.1',
  title: 'Arcade Token Tracker', model: 'arcade', minutes: 20, icon: '🕹️',
  place: 'Sunnyside Arcade',
  mission: 'You start with 50 tokens at the arcade. Every game costs 4 tokens and wins 12 tickets, plus a 5-ticket welcome bonus. Play games, track the patterns, and write expressions that predict tokens and tickets for ANY number of games.',
  question: 'How can we write and evaluate expressions for a real situation?',
  takeaway: 'Tokens left = 50 − 4g, where g is the number of games. Tickets = 12g + 5. An expression can predict the result for any number of games by substituting a value for g.',
  vocab: [['Expression', 'A math phrase with numbers, variables, and operations.'], ['Substitute', 'Replace the variable with a number.'], ['Evaluate', 'Find the value of an expression.'], ['Constant', 'A number that doesn\'t change, like the 5-ticket bonus.']],
  warmup: { style: 'Translate it', prompt: 'Write each phrase as an expression.', items: [['4 less than a number n', 'n − 4.'], ['12 times a number g, plus 5', '12g + 5.'], ['50 minus 4 groups of g', '50 − 4g.']] },
  steps: [
    { tag: 'explore', title: 'Play 3 games', goal: { text: 'Play 3 games.', check: { g_3: true } }, q: { type: 'table', q: 'Record tokens and tickets as you play.', rowHead: 'Games', cols: [{ label: 'Tokens left', value: function (s, r) { return 50 - 4 * r.g; } }, { label: 'Tickets', value: function (s, r) { return 12 * r.g + 5; } }], rows: [{ label: '1', g: 1 }, { label: '2', g: 2 }, { label: '3', g: 3 }] } },
    { tag: 'reason', title: 'Tokens expression', sheet: 1, q: { type: 'mc', q: 'Which expression gives tokens left after g games?', choices: ['50 − 4g', '4g − 50', '50 + 4g', '46g'], answer: 0 } },
    { tag: 'reason', title: 'Tickets expression', sheet: 1, q: { type: 'mc', q: 'Which expression gives tickets after g games (g ≥ 1)?', choices: ['12g + 5', '17g', '12 + 5g', '5g + 12g'], answer: 0 } },
    { tag: 'apply', title: 'Evaluate', sheet: 2, q: { type: 'num', q: 'Evaluate 12g + 5 for g = 8. How many tickets?', answer: 101, work: true } },
    { tag: 'test', title: 'Check with the machine', sheet: 2, goal: { text: 'Play until you have played 8 games.', check: { games: 8 } }, q: { type: 'num', q: 'How many tokens are left after 8 games?', answer: 18 } },
    { tag: 'test', title: 'Out of tokens', sheet: 3, goal: { text: 'Play as many games as you can.', check: { games: 12 } }, q: { type: 'num', q: 'What is the most games you can play?', answer: 12, why: '50 − 4(12) = 2 tokens left, not enough for game 13.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the prize', sheet: 4, q: { type: 'num', q: 'A giant panda prize costs 150 tickets. What is the fewest games to earn it?', unit: 'games', answer: 13, work: true, why: '12g + 5 ≥ 150 → g ≥ 12.08, so 13 games. But you only have tokens for 12! You would need more tokens.' } },
    { tag: 'explain', title: 'Explain the expression', sheet: 5, q: { type: 'text', q: 'Explain what each part of 50 − 4g means at the arcade.', rows: 3, need: [{ words: ['50', 'start'], label: 'Explains 50' }, { words: ['4', 'cost', 'each game'], label: 'Explains 4' }, { words: ['g', 'games'], label: 'Explains g' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-ride-heights', std: 'g6-math-expressions', subject: 'math', grade: 6, code: '6.AF.4',
  title: 'Ride Height Inequalities', model: 'inequality', minutes: 20, icon: '🎢',
  place: 'Sunnyside Amusement Park · Ride Entrance',
  mission: 'Every ride has a height sign. Graph each rule on a number line, then check which friends can ride. The graph shows ALL the heights that work, not just one answer.',
  question: 'How do inequalities show all the values that make a statement true?',
  takeaway: 'An inequality like h ≥ 48 has many solutions. On a number line, a closed circle means the number is included (≥ or ≤); an open circle means it is not included (> or <). Shade toward the numbers that work.',
  vocab: [['Inequality', 'A statement using <, >, ≤, or ≥.'], ['≥', 'Greater than or equal to ("at least").'], ['≤', 'Less than or equal to ("at most").'], ['Solution set', 'All the values that make the inequality true.']],
  warmup: { style: 'True or false?', prompt: 'Decide and explain.', items: [['48 ≥ 48', 'True.'], ['44 > 44', 'False.'], ['"At least 48" means 48 or more.', 'True.']] },
  steps: [
    { tag: 'explore', title: 'Thunder Coaster', setup: { ride: 0 }, goal: { text: 'Graph h ≥ 48 for the Thunder Coaster.', check: { ride: 0, graphOK: true } },
      q: { type: 'mc', q: 'Why is the circle CLOSED at 48?', choices: ['48 inches is allowed ("at least" includes 48)', '48 is not allowed', 'Closed circles look nicer'], answer: 0 } },
    { tag: 'test', title: 'Check riders', sheet: 1, goal: { text: 'Check all 6 riders for the Thunder Coaster.', check: { ride: 0, tested: 6 } }, q: { type: 'multi', q: 'Who can ride Thunder Coaster?', choices: ['Ava (50)', 'Ben (48)', 'Cam (41)', 'Eli (46)'], answer: [0, 1] } },
    { tag: 'test', title: 'Kiddie Carousel', setup: { ride: 1 }, sheet: 2, goal: { text: 'Graph h ≤ 42 for the Kiddie Carousel.', check: { ride: 1, graphOK: true } }, q: { type: 'mc', q: 'Which way is the graph shaded, and why?', choices: ['Left: smaller heights are allowed', 'Right', 'Both ways'], answer: 0 } },
    { tag: 'test', title: 'Bumper Boats', setup: { ride: 2 }, sheet: 3, goal: { text: 'Graph h > 44 for the Bumper Boats.', check: { ride: 2, graphOK: true } }, q: { type: 'mc', q: 'Dee is exactly 44 inches. Can Dee ride the Bumper Boats?', choices: ['No: 44 is not greater than 44 (open circle)', 'Yes', 'Only with a parent'], answer: 0 } },
    { tag: 'reason', title: 'Match the words', sheet: 4, q: { type: 'sort', q: 'Match each sign to its inequality.', bins: ['h ≥ 50', 'h < 50', 'h ≤ 50', 'h > 50'], items: [['At least 50 inches', 0], ['Under 50 inches', 1], ['No taller than 50 inches', 2], ['Taller than 50 inches', 3]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: two rules', sheet: 5, q: { type: 'mc', q: 'The Go-Karts need 44 < h ≤ 50. Who can ride? (Ava 50, Ben 48, Dee 44, Eli 46)', choices: ['Ava, Ben, and Eli', 'Everyone', 'Only Ben and Eli', 'Dee only'], answer: 0 } },
    { tag: 'explain', title: 'Explain the circles', sheet: 6, q: { type: 'text', q: 'Explain when to use an open circle and when to use a closed circle.', rows: 3, need: [{ words: ['open'], label: 'Explains open' }, { words: ['closed'], label: 'Explains closed' }, { words: ['included', 'equal', 'counts'], label: 'Connects to "equal to"' }] } }
  ]
});

/* ======================= Integers & coordinate plane ======================= */
SUNNY_SIMS.push({
  id: 'g6-math-sea-levels', std: 'g6-math-integers', subject: 'math', grade: 6, code: '6.NS.1–6.NS.2',
  title: 'Sea Level Submarine', model: 'seaLevels', minutes: 25, icon: '🌊',
  place: 'Sunnyside Ocean Research Station',
  mission: 'Pilot the research submarine through the ocean\'s levels, from the sunlight zone to the midnight zone. Read elevations, compare depths, and use sonar to measure distances between things above and below sea level.',
  question: 'How do positive and negative numbers describe elevation, and how do we find distances between them?',
  takeaway: 'Sea level is 0. Above it is positive, below it is negative. A deeper depth is a LOWER (smaller) number: −60 < −15. The distance between two elevations is always positive: find it by adding the distances to 0 when they are on opposite sides, or subtracting when they are on the same side.',
  vocab: [['Integer', 'A whole number or its opposite: …, −2, −1, 0, 1, 2, ….'], ['Elevation', 'Height above (+) or below (−) sea level.'], ['Opposite', 'The same distance from 0 on the other side: −15 and 15.'], ['Absolute value', 'Distance from 0, always positive: |−15| = 15.']],
  warmup: { style: 'Real-world riddle', prompt: 'Answer with an integer.', items: [['A diver is 12 meters below the surface.', '−12.'], ['A bird flies 25 meters above the water.', '+25.'], ['Which is deeper: −30 m or −8 m?', '−30 m.']] },
  steps: [
    { tag: 'explore', title: 'Level 1: Dive!', goal: { text: 'Dive the submarine to −30 m (next to the shark).', check: { at_n30: true } },
      q: { type: 'mc', q: 'What does −30 m mean?', choices: ['30 meters below sea level', '30 meters above sea level', '30 meters from the boat sideways'], answer: 0 } },
    { tag: 'record', title: 'Level 2: Elevation chart', sheet: 1, q: { type: 'table', q: 'Record each elevation from the chart.', rowHead: 'Thing', cols: [{ label: 'Elevation', unit: 'm', value: function (s, r) { return r.v; } }, { label: 'Absolute value', unit: 'm', value: function (s, r) { return Math.abs(r.v); } }], rows: [{ label: 'Seagull', v: 25 }, { label: 'Diver', v: -15 }, { label: 'Shipwreck', v: -60 }, { label: 'Anglerfish', v: -90 }] } },
    { tag: 'reason', title: 'Level 3: Order', sheet: 2, q: { type: 'order', q: 'Order from LOWEST elevation to HIGHEST.', items: ['Anglerfish −90', 'Shipwreck −60', 'Diver −15', 'Sea turtle −8', 'Boat 0', 'Seagull 25'], labels: ['lowest', 'highest'] } },
    { tag: 'reason', title: 'Compare', sheet: 2, q: { type: 'mc', q: 'Which statement is true?', choices: ['−60 < −15', '−60 > −15', '|−60| < |−15|'], answer: 0, why: '−60 is farther below sea level, so it is less than −15, even though its absolute value is bigger.' } },
    { tag: 'test', title: 'Level 4: Sonar', sheet: 3, goal: { text: 'Take the sub to −60 m and aim the sonar at the boat.', check: { d_boat_n60: { gte: 0 } } },
      q: { type: 'num', q: 'How far is the sub from the boat?', unit: 'm', answer: 60 } },
    { tag: 'test', title: 'Across sea level', sheet: 4, strategy: 'Opposite sides of 0? Add the distances to 0: 25 + 30.', goal: { text: 'Go to −30 m and aim the sonar at the seagull.', check: { d_gull_n30: { gte: 0 } } },
      q: { type: 'num', q: 'How far is it from the seagull (+25) to the sub (−30)?', unit: 'm', answer: 55 } },
    { tag: 'challenge', levels: ['legend'], title: 'Level 5: Rescue', sheet: 5, q: { type: 'num', q: 'The sub is at −90 m and must rise to the shipwreck, then to the diver. How many meters does it rise in total?', unit: 'm', answer: 75, work: true } },
    { tag: 'explain', title: 'Captain\'s log', sheet: 6, q: { type: 'text', q: 'Explain why −60 is less than −15 even though 60 is bigger than 15.', rows: 3, need: [{ words: ['below', 'deeper', 'lower', 'farther'], label: 'Uses below/deeper' }, { words: ['0', 'zero', 'sea level'], label: 'Refers to 0 / sea level' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-weather-station', std: 'g6-math-integers', subject: 'math', grade: 6, code: '6.NS.1–6.NS.2',
  title: 'Winter Weather Station', model: 'weatherStation', minutes: 20, icon: '🌡️',
  place: 'Sunnyside Weather Station',
  mission: 'A cold wave is sweeping the country. Read temperatures from five cities over three days, order them, and find how much the temperature changed. Watch out: negative numbers work differently!',
  question: 'How do we compare, order, and find differences between temperatures below zero?',
  takeaway: 'On a thermometer, colder temperatures are lower (smaller numbers): −12 < −6 < 3. The change from −6 to 3 is 9 degrees (6 up to zero, then 3 more). Comparing the positions on the number line tells which is warmer.',
  vocab: [['Negative number', 'A number less than 0.'], ['Compare', 'Tell which number is greater or less.'], ['Change', 'How much a value went up or down.'], ['Number line', 'A line showing numbers in order; left/down is smaller.']],
  warmup: { style: 'Which is warmer?', prompt: 'Circle the warmer temperature and explain.', items: [['−3 °F or −9 °F', '−3 °F.'], ['−1 °F or 0 °F', '0 °F.'], ['How many degrees from −4 up to 5?', '9.']] },
  steps: [
    { tag: 'explore', title: 'Monday readings', goal: { text: 'Look at every city on Monday.', check: { seenCount: { gte: 5 } } } },
    { tag: 'reason', title: 'Order Monday', sheet: 1, q: { type: 'order', q: 'Order Monday\'s temperatures from coldest to warmest.', items: ['Anchorage −12', 'Minneapolis −9', 'Fort Wayne −6', 'Indianapolis −3', 'Miami 22'], labels: ['coldest', 'warmest'] } },
    { tag: 'test', title: 'Fort Wayne warms up', sheet: 2, strategy: 'Count up to 0 first, then past it.', goal: { text: 'Look at Fort Wayne on Monday and Wednesday.', check: { t_0_0: -6, t_0_2: 3 } },
      q: { type: 'num', q: 'How many degrees did Fort Wayne warm up from Monday (−6) to Wednesday (3)?', unit: '°F', answer: 9 } },
    { tag: 'test', title: 'Minneapolis cools', sheet: 3, goal: { text: 'Look at Minneapolis on Tuesday and Wednesday.', check: { t_2_1: -4, t_2_2: -11 } },
      q: { type: 'num', q: 'How many degrees did Minneapolis drop from Tuesday to Wednesday?', unit: '°F', answer: 7 } },
    { tag: 'reason', title: 'Biggest gap', sheet: 4, q: { type: 'num', q: 'On Monday, how many degrees warmer was Miami (22) than Anchorage (−12)?', unit: '°F', answer: 34, work: true } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Leo says −9 is warmer than −3 because 9 is bigger than 3.', q: { type: 'mc', q: 'What is wrong with Leo\'s thinking?', choices: ['−9 is farther below 0, so it is colder; −3 is warmer', 'Nothing', 'They are the same'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: average', sheet: 6, q: { type: 'num', q: 'What is Anchorage\'s average temperature over the three days (−12, −15, −9)?', unit: '°F', answer: -12, work: true } },
    { tag: 'explain', title: 'Weather report', sheet: 7, q: { type: 'text', q: 'Write a one-paragraph weather report comparing two cities. Use at least one negative temperature and the words "warmer" or "colder".', number: true, rows: 3, need: [{ words: ['warmer', 'colder'], label: 'Compares' }, { words: ['-', '−', 'below zero', 'negative'], label: 'Uses a negative temperature' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-bank-account', std: 'g6-math-integers', subject: 'math', grade: 6, code: '6.NS.3',
  title: 'Bank Account Tracker', model: 'bankAccount', minutes: 20, icon: '🏦',
  place: 'Sunnyside Community Bank · Kids\' Savings',
  mission: 'Your savings account starts with $25. Earn money, spend money, and see what happens when you spend more than you have. Use absolute value to describe how much you owe.',
  question: 'How do negative numbers and absolute value describe money owed?',
  takeaway: 'A negative balance means debt: −$15 means you owe $15. Absolute value tells the size of the amount without the direction: |−15| = 15. A balance of −$30 is a bigger debt than −$15, even though −30 < −15.',
  vocab: [['Balance', 'The amount of money in an account.'], ['Deposit', 'Money added (+).'], ['Withdrawal', 'Money taken out (−).'], ['Debt', 'Money owed; a negative balance.'], ['Absolute value', 'The size of a number without its sign.']],
  warmup: { style: 'True or false?', prompt: 'Decide and fix.', items: [['A balance of −$10 means you have $10.', 'False: you owe $10.'], ['|−10| = 10', 'True.'], ['Owing $30 is worse than owing $15.', 'True.']] },
  steps: [
    { tag: 'explore', title: 'Earn some money', goal: { text: 'Add your allowance and birthday money.', check: { used_0: true, used_1: true } }, q: { type: 'num', q: 'What is your balance?', unit: '$', answer: function (s) { return s.balance; } } },
    { tag: 'test', title: 'Overspend', sheet: 1, text: 'Press ↺ Start over (balance $25).', goal: { text: 'Buy the bike helmet ($40) right away.', check: { balance: -15 } },
      q: { type: 'mc', q: 'Your balance is −$15. What does that mean?', choices: ['You owe the bank $15', 'You have $15', 'You have $40'], answer: 0 } },
    { tag: 'reason', title: 'Absolute value', sheet: 2, q: { type: 'num', q: 'What is |−15|?', answer: 15 } },
    { tag: 'test', title: 'Deeper in debt', sheet: 3, goal: { text: 'From −$15, buy the video game too.', check: { balance: -45 } },
      q: { type: 'mc', q: 'Which statement is true?', choices: ['−45 < −15, and owing $45 is a bigger debt', '−45 > −15', 'The debts are the same'], answer: 0 } },
    { tag: 'test', title: 'Climb out', sheet: 4, goal: { text: 'Add deposits until you are out of debt (balance 0 or more).', check: function (s) { return s.minBal <= -40 && s.balance >= 0; } },
      q: { type: 'num', q: 'How much money did you need to deposit to get from −$45 back to $0?', unit: '$', answer: 45 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: which is worse?', sheet: 5, q: { type: 'sort', q: 'Sort each account.', bins: ['Owes more than $20', 'Owes $20 or less / has money'], items: [['−$35', 0], ['−$12', 1], ['$5', 1], ['−$21', 0], ['−$20', 1]] } },
    { tag: 'explain', title: 'Explain debt', sheet: 6, q: { type: 'text', q: 'Explain why −$45 is LESS than −$15, but is a BIGGER debt.', rows: 3, need: [{ words: ['less', 'left', 'lower', 'smaller'], label: 'Compares on the number line' }, { words: ['absolute', 'owe', 'distance', 'debt'], label: 'Uses absolute value or owing' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-treasure-map', std: 'g6-math-integers', subject: 'math', grade: 6, code: '6.NS.3 · 6.GM.4',
  title: 'Treasure Island Coordinates', model: 'coordMap', minutes: 25, icon: '🏴‍☠️',
  place: 'Sunnyside Island · Captain\'s Map',
  mission: 'An old captain\'s map uses a four-quadrant grid. Sail to landmarks, find their coordinates, decode reflection clues, and dig for the treasure.',
  question: 'How do we locate points in all four quadrants and find distances between them?',
  takeaway: 'A point (x, y) tells how far left/right (x) and down/up (y) from the origin. Signs tell the quadrant: (+,+) I, (−,+) II, (−,−) III, (+,−) IV. Reflecting across the x-axis changes the sign of y; across the y-axis changes the sign of x. Points on the same horizontal line are |x₁ − x₂| apart.',
  vocab: [['Coordinate plane', 'A grid formed by an x-axis and a y-axis.'], ['Ordered pair', '(x, y): x first, then y.'], ['Quadrant', 'One of the four regions of the plane.'], ['Reflection', 'A flip across an axis.']],
  warmup: { style: 'Where am I?', prompt: 'Name the quadrant or axis.', items: [['(3, −5)', 'IV.'], ['(−2, −7)', 'III.'], ['(0, 4)', 'On the y-axis.']] },
  steps: [
    { tag: 'explore', title: 'Set sail', goal: { text: 'Sail to Skull Rock 💀.', check: { visit_skull: true } }, q: { type: 'mc', q: 'What are Skull Rock\'s coordinates?', choices: ['(4, 6)', '(6, 4)', '(−4, 6)', '(4, −6)'], answer: 0 } },
    { tag: 'record', title: 'Landmark log', sheet: 1, q: { type: 'table', q: 'Sail to each landmark and record it.', rowHead: 'Landmark', cols: [{ label: 'x', value: function (s, r) { return r.x; } }, { label: 'y', value: function (s, r) { return r.y; } }, { label: 'Quadrant', value: function (s, r) { return r.q; } }],
      rows: [{ label: 'Palm Grove 🌴', x: -5, y: 3, q: 'II', when: { visit_palm: true } }, { label: 'Bat Cave 🕳', x: -6, y: -4, q: 'III', when: { visit_cave: true } }, { label: 'Old Dock ⚓', x: 7, y: -2, q: 'IV', when: { visit_dock: true } }] } },
    { tag: 'test', title: 'Clue 1: reflection', sheet: 2, text: 'Clue: "The first chest is Skull Rock reflected across the x-axis."', goal: { text: 'Sail there and dig.', check: { 'dig_4_-6': true } },
      q: { type: 'mc', q: 'Why is the reflection at (4, −6)?', choices: ['Reflecting across the x-axis keeps x and changes the sign of y', 'You swap x and y', 'You change both signs'], answer: 0 } },
    { tag: 'reason', title: 'Distance', sheet: 3, q: { type: 'num', q: 'How far is it from Skull Rock (4, 6) to the chest at (4, −6)?', unit: 'units', answer: 12, why: 'Same x, so count the y distance: 6 up to 0, 6 down: 6 + 6 = 12.' } },
    { tag: 'test', title: 'Clue 2', sheet: 4, text: 'Clue: "The second chest is Palm Grove reflected across the y-axis."', goal: { text: 'Sail there and dig.', check: { dig_5_3: true } },
      q: { type: 'num', q: 'How far is the second chest from Palm Grove?', unit: 'units', answer: 10 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the final chest', sheet: 5, text: 'Clue: "Start at the Bat Cave. Reflect across BOTH axes."', q: { type: 'mc', q: 'Where is the final chest?', choices: ['(6, 4)', '(−6, 4)', '(6, −4)', '(4, 6)'], answer: 0 } },
    { tag: 'explain', title: 'Captain\'s notes', sheet: 6, q: { type: 'text', q: 'Explain how you can tell which quadrant a point is in just from its signs.', rows: 3, need: [{ words: ['positive', '+'], label: 'Mentions positive' }, { words: ['negative', '−', '-'], label: 'Mentions negative' }, { words: ['quadrant', 'I', 'II'], label: 'Names quadrants' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-math-elevator-tower', std: 'g6-math-integers', subject: 'math', grade: 6, code: '6.NS.1–6.NS.3',
  title: 'Elevator Tower', model: 'elevator', minutes: 15, icon: '🛗',
  place: 'Sunnyside Tower',
  mission: 'Sunnyside Tower has 12 floors above the lobby and 6 levels underground. Ride the elevator for different visitors, log each trip, and use absolute value to find how far the elevator really traveled.',
  question: 'How do we find distances between positive and negative numbers?',
  takeaway: 'Floors below ground are negative. The distance between two floors is the absolute value of their difference: from 8 to −3 is |8 − (−3)| = 11 floors. Crossing zero means adding the two distances from 0.',
  vocab: [['Integer', 'Whole numbers and their opposites.'], ['Absolute value', 'Distance from 0.'], ['Distance', 'How far apart; always positive.'], ['Ground level', 'Floor 0.']],
  warmup: { style: 'Quick sketch', prompt: 'Draw a vertical number line from −6 to 12.', items: [['Mark floor −3 and floor 8.', 'Check the placement.'], ['How many floors between them?', '11.'], ['How far is floor −6 from the lobby?', '6 floors.']] },
  steps: [
    { tag: 'explore', title: 'First ride', goal: { text: 'Ride from the lobby (0) to the Gym (−1).', check: function (s) { return s['trip_0_-1'] != null; } }, q: { type: 'num', q: 'How many floors did the elevator travel?', unit: 'floors', answer: 1 } },
    { tag: 'test', title: 'Office worker', sheet: 1, goal: { text: 'Ride from floor 8 (Offices) to Parking P3 (−3).', check: function (s) { return s['trip_8_-3'] != null; } }, q: { type: 'num', q: 'How far did the elevator travel?', unit: 'floors', answer: 11, strategy: '8 down to 0 is 8. 0 down to −3 is 3. 8 + 3 = 11.' } },
    { tag: 'record', title: 'Trip log', sheet: 2, q: { type: 'table', q: 'Calculate each trip (you can ride them to check).', rowHead: 'Trip', cols: [{ label: 'Distance', unit: 'floors', value: function (s, r) { return r.d; } }], rows: [{ label: '12 → 4', d: 8 }, { label: '−6 → 1', d: 7 }, { label: '−3 → −6', d: 3 }, { label: '4 → −6', d: 10 }] } },
    { tag: 'reason', title: 'Same side, other side', sheet: 3, q: { type: 'mc', q: 'For −3 → −6, why do you SUBTRACT (6 − 3) instead of add?', choices: ['Both floors are on the same side of 0', 'You always subtract', 'Negative numbers can\'t be added'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: total day', sheet: 4, q: { type: 'num', q: 'A cleaner rides 0 → 12 → −6 → 4. Total floors traveled?', unit: 'floors', answer: 40, work: true } },
    { tag: 'explain', title: 'Explain the distance', sheet: 5, q: { type: 'text', q: 'Explain how to find the distance from floor 8 to floor −3.', number: true, rows: 3, need: [{ words: ['0', 'zero', 'ground', 'lobby'], label: 'Uses 0 as a stopping point' }, { words: ['11'], label: 'Gets 11' }] } }
  ]
});
