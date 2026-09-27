/*
 * Sunnyside Simulators: Grade 5 math simulations.
 * Real-world places; students model, estimate, and explain their strategy.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

/* ======================= Fractions ======================= */
SUNNY_SIMS.push({
  id: 'g5-math-pizza-kitchen', std: 'g5-math-fractions', subject: 'math', grade: 5, code: '5.C.4',
  title: 'Pizza Kitchen', model: 'fracKitchen', minutes: 25, icon: '🍕',
  place: 'Sunnyside Pizza Kitchen',
  mission: 'Orders are piling up at Sunnyside Pizza! Customers want leftover slices from different pizzas combined into one box. You can\'t add slices of different sizes, so re-cut the pizzas until every slice is the same size.',
  question: 'How can we add and subtract fractions with different denominators?',
  takeaway: 'To add or subtract fractions with unlike denominators, make the pieces the same size first: find a common denominator that both denominators divide into evenly (like cutting both pizzas into 6 slices for halves and thirds). Then add or subtract the numbers of equal-size pieces.',
  vocab: [['Denominator', 'How many equal pieces the whole is cut into.'], ['Numerator', 'How many of those pieces you have.'], ['Common denominator', 'A denominator both fractions can be rewritten with.'], ['Equivalent fractions', 'Fractions that name the same amount, like 1/2 and 3/6.']],
  warmup: { style: 'Which one doesn\'t belong?', prompt: 'Circle the fraction that does NOT belong. Explain.', items: [['1/2 · 2/4 · 3/6 · 3/5', '3/5: the others all equal one half.'], ['2/3 · 4/6 · 6/9 · 3/4', '3/4: the others equal two thirds.'], ['Why can\'t you just add 1/2 + 1/3 = 2/5?', 'The pieces are different sizes; 2/5 is less than 1/2 alone.']] },
  steps: [
    { tag: 'explore', title: 'Order #1', setup: { order: 0 }, text: 'Pepperoni is cut in halves, veggie in thirds. Try putting them in the box.', goal: { text: 'Press **📦 Put it in the box** before re-cutting and read what happens.', check: { triedUnequal: true } },
      q: { type: 'mc', q: 'Why can\'t you just add 1 half-slice and 1 third-slice and call it "2 slices"?', choices: ['The slices are different sizes', 'Pizza can\'t be added', 'Halves are always bigger than wholes'], answer: 0 } },
    { tag: 'predict', title: 'Estimate first', sheet: 1, q: { type: 'predict', q: 'Before cutting: is 1/2 + 1/3 more or less than one whole pizza?', choices: ['Less than 1', 'Exactly 1', 'More than 1'] } },
    { tag: 'test', title: 'Find a common cut', sheet: 1, strategy: 'Pick a number of slices that BOTH 2 and 3 divide into evenly.', goal: { text: 'Re-cut both pizzas into equal slices that work for halves AND thirds, then box it.', check: { order: 0, boxed: true } },
      q: { type: 'num', q: 'How much pizza is in the box? (Type a fraction like 5/6.)', answer: 5 / 6, why: '1/2 = 3/6 and 1/3 = 2/6. 3 sixths + 2 sixths = 5 sixths.' } },
    { tag: 'reason', title: 'Other cuts?', sheet: 2, q: { type: 'multi', q: 'Which slice counts would ALSO work for halves and thirds? Choose all.', choices: ['6', '12', '18', '4', '9'], answer: [0, 1, 2], hint: 'The number must divide evenly by 2 AND by 3.' } },
    { tag: 'test', title: 'Order #2', setup: { order: 1 }, sheet: 3, goal: { text: 'Box order #2: 2/3 + 1/4.', check: { order: 1, boxed: true } },
      q: { type: 'num', q: 'How much pizza is in the box? (Use a mixed number like 1 1/2 if it is more than 1.)', answer: 11 / 12, work: true, hint: 'Twelfths work for thirds and fourths.' } },
    { tag: 'test', title: 'Order #3: take away', setup: { order: 2 }, sheet: 4, goal: { text: 'Solve order #3: 3/4 − 1/6.', check: { order: 2, boxed: true } },
      q: { type: 'num', q: 'How much pizza is left?', answer: 7 / 12, work: true } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Marco says: "3/4 + 5/8 = 8/12. I added the tops and the bottoms."',
      q: { type: 'mc', q: 'How do you know Marco is wrong WITHOUT calculating exactly?', choices: ['3/4 is already more than 1/2, and 8/12 = 2/3 is less than 3/4 + a bit. The answer must be more than 1', '8/12 is bigger than both fractions, so it is right', 'You can never check without calculating'], answer: 0, why: '3/4 + 5/8 is about 3/4 + 1/2 = 1 1/4. An answer less than 1 is not reasonable.' } },
    { tag: 'test', title: 'Order #4', setup: { order: 3 }, sheet: 5, goal: { text: 'Box order #4: 3/4 + 5/8.', check: { order: 3, boxed: true } },
      q: { type: 'num', q: 'What is 3/4 + 5/8? Use a mixed number.', answer: 11 / 8, work: true } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: smallest cut', sheet: 6, q: { type: 'num', q: 'What is the SMALLEST number of slices that works for fourths and sixths?', unit: 'slices', answer: 12 } },
    { tag: 'explain', title: 'Teach a new cook', sheet: 7, q: { type: 'text', q: 'Explain to a new cook how to add 1/2 and 1/3 of a pizza. Use the words "same size".', rows: 3, starter: 'First, cut both pizzas into', need: [{ words: ['same size', 'equal', 'same'], label: 'Uses "same size" pieces' }, { words: ['6', 'six', 'sixths'], label: 'Names a common denominator' }, { words: ['5/6', 'five sixths', '5 sixths'], label: 'Gives the total' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-ribbon-shop', std: 'g5-math-fractions', subject: 'math', grade: 5, code: '5.C.4',
  title: 'Ribbon Shop', model: 'ribbonShop', minutes: 25, icon: '🎀',
  place: 'Sunnyside Craft Shop',
  mission: 'The craft shop sells ribbon by the yard. Customers keep asking for strange lengths like 2 3/4 yards. Measure on the ruler and count up to find out how much ribbon is left on each spool, without the standard algorithm.',
  question: 'How can we subtract mixed numbers by counting up on a number line?',
  takeaway: 'To subtract mixed numbers, you can count up: start at the smaller number and hop to the larger one, using friendly hops (to the next whole number, then whole yards, then the leftover). Choosing ruler marks that show both fractions (a common denominator) makes the hops exact.',
  vocab: [['Mixed number', 'A whole number and a fraction, like 2 3/4.'], ['Counting up', 'Finding a difference by hopping from the smaller number to the larger.'], ['Common denominator', 'Ruler marks that show both fractions exactly.'], ['Difference', 'The answer to a subtraction problem.']],
  warmup: { style: 'Number talk', prompt: 'Solve in your head. Write HOW you did it.', items: [['How far is it from 2 3/4 to 3?', '1/4.'], ['How far from 3 to 4 1/3?', '1 1/3.'], ['So how far from 2 3/4 to 4 1/3? (Combine your hops.)', '1/4 + 1 1/3 = 1 7/12.']] },
  steps: [
    { tag: 'explore', title: 'Pick the right marks', setup: { job: 0 }, text: 'The spool has 4 1/3 yd. The customer wants 2 3/4 yd.', goal: { text: 'Choose ruler marks that can show BOTH 1/3 and 3/4.', check: { job: 0, fitsBoth: true } },
      q: { type: 'mc', q: 'Why do the ruler marks need to work for both thirds and fourths?', choices: ['So both lengths land exactly on a mark', 'So the ruler looks nicer', 'Twelfths are always best'], answer: 0 } },
    { tag: 'test', title: 'Mark the cut', sheet: 1, goal: { text: 'Click the ruler at exactly 2 3/4 yards.', check: { job: 0, marked: true } } },
    { tag: 'test', title: 'Count up', sheet: 1, strategy: 'Hop to the next whole yard first, then by whole yards, then the rest.', goal: { text: 'Hop from the cut to the end of the ribbon (land exactly on 4 1/3).', check: { job: 0, landed: true } },
      q: { type: 'num', q: 'How much ribbon is left? (Type a mixed number like 1 7/12.)', answer: 19 / 12, why: '2 3/4 → 3 is 1/4. 3 → 4 is 1. 4 → 4 1/3 is 1/3. Total: 1/4 + 1 + 1/3 = 1 7/12.' } },
    { tag: 'reason', title: 'Check with an estimate', sheet: 2, q: { type: 'mc', q: 'Is 1 7/12 a reasonable answer? 4 1/3 is about 4, and 2 3/4 is about 3.', choices: ['Yes: about 4 − 3 = 1, and 1 7/12 is a little more than 1 1/2', 'No, it should be about 7', 'No, it should be less than 1'], answer: 0 } },
    { tag: 'test', title: 'Customer 2', setup: { job: 1 }, sheet: 3, goal: { text: 'Spool: 3 1/2 yd. Customer wants 1 2/3 yd. Count up to the end.', check: { job: 1, landed: true } },
      q: { type: 'num', q: 'How much is left?', answer: 11 / 6, work: true } },
    { tag: 'test', title: 'Customer 3', setup: { job: 2 }, sheet: 4, goal: { text: 'Spool: 4 1/2 yd. Customer wants 2 1/8 yd. Count up.', check: { job: 2, landed: true } },
      q: { type: 'num', q: 'How much is left?', answer: 19 / 8, work: true } },
    { tag: 'reason', title: 'Compare strategies', sheet: 5, text: 'Ava subtracts 4 1/3 − 2 3/4 by rewriting: 4 4/12 − 2 9/12. She gets stuck because 4 is less than 9.',
      q: { type: 'mc', q: 'What could Ava do instead?', choices: ['Count up from 2 3/4 to 4 1/3, or regroup 1 whole as 12/12 to get 3 16/12', 'Just subtract 9 − 4 = 5', 'Give up; it can\'t be done'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: the whole order', sheet: 6, q: { type: 'num', q: 'A spool had 6 yards. Three customers bought 1 3/4, 2 1/2, and 1 1/8 yards. How much is left?', unit: 'yd', answer: 5 / 8, work: true } },
    { tag: 'explain', title: 'Explain your hops', sheet: 7, q: { type: 'text', q: 'Explain how you found 4 1/3 − 2 3/4 by counting up.', rows: 3, number: true, need: [{ words: ['hop', 'count up', 'counted up', 'jump'], label: 'Describes counting up' }, { words: ['3', 'whole'], label: 'Uses a friendly whole number' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-recipe-scaler', std: 'g5-math-fractions', subject: 'math', grade: 5, code: '5.C.6',
  title: 'Recipe Scaler', model: 'recipeScale', minutes: 20, icon: '🥣',
  place: 'Sunnyside Bakery',
  mission: 'The bakery\'s granola bar recipe makes 12 bars, but orders come in for half batches, double batches, and 1½ batches. Measure scoops to see what multiplying a fraction really means.',
  question: 'What does it mean to multiply a fraction by a whole number or a fraction?',
  takeaway: 'Multiplying 3 × 3/4 means 3 groups of 3/4 (repeated addition): 9/4 = 2 1/4. Multiplying by 1/2 means taking half of the amount, so the answer is smaller. When you multiply by a number less than 1, the product gets smaller; by a number greater than 1, it gets bigger.',
  vocab: [['Factor', 'A number being multiplied.'], ['Product', 'The answer to a multiplication problem.'], ['Scale', 'Make bigger or smaller by multiplying.'], ['Repeated addition', 'Adding the same amount again and again.']],
  warmup: { style: 'Estimation station', prompt: 'Without solving exactly, is each answer MORE or LESS than 1? Why?', items: [['2 × 3/4', 'More: 3/4 + 3/4 is more than 1.'], ['1/2 × 3/4', 'Less: half of 3/4 is 3/8.'], ['4 × 1/5', 'Less: 4 fifths.']] },
  steps: [
    { tag: 'explore', title: 'A triple batch', setup: { batch: '3/1', pick: 1 }, text: 'Honey is 3/4 cup per batch. Make 3 batches.', goal: { text: 'Scoop honey for **3 batches** until the measure matches.', check: { done_1_3_1: true } },
      q: { type: 'num', q: 'How much honey is 3 × 3/4 cup? (Mixed number.)', unit: 'cups', answer: 9 / 4, why: '3/4 + 3/4 + 3/4 = 9/4 = 2 1/4 cups.' } },
    { tag: 'reason', title: 'Repeated addition', sheet: 1, q: { type: 'mc', q: 'Which expression means the same as 3 × 3/4?', choices: ['3/4 + 3/4 + 3/4', '3 + 3/4', '3/12', '3 × 3 ÷ 3'], answer: 0 } },
    { tag: 'predict', title: 'Predict half a batch', sheet: 2, q: { type: 'predict', q: 'For HALF a batch, will you need more or less than 3/4 cup of honey?', choices: ['Less', 'More', 'The same'] } },
    { tag: 'test', title: 'Half batch', setup: { batch: '1/2', pick: 1 }, sheet: 2, goal: { text: 'Measure honey for **½ batch** (use Add half a scoop).', check: { done_1_1_2: true } },
      q: { type: 'num', q: 'What is 1/2 × 3/4?', unit: 'cup', answer: 3 / 8, why: 'Half of 3/4 is 3/8. Multiplying by a fraction less than 1 makes the product smaller.' } },
    { tag: 'record', title: 'Scale the whole recipe', sheet: 3, q: { type: 'table', q: 'Fill in the recipe for 2 batches (type fractions or mixed numbers).', rowHead: 'Ingredient', cols: [{ label: '1 batch', given: true }, { label: '2 batches', value: function (s, r) { return r.v; }, tol: 0.001 }],
      rows: [{ label: 'Oats', given: ['2 1/2 cups'], v: 5 }, { label: 'Peanut butter', given: ['2/3 cup'], v: 4 / 3 }, { label: 'Raisins', given: ['1/2 cup'], v: 1 }] } },
    { tag: 'test', title: '1½ batches', setup: { batch: '3/2', pick: 0 }, sheet: 4, strategy: '1½ batches = 1 batch + ½ batch. Add them.', goal: { text: 'Measure oats for **1½ batches**.', check: { done_0_3_2: true } },
      q: { type: 'num', q: 'What is 1 1/2 × 2 1/2 cups of oats?', unit: 'cups', answer: 15 / 4, work: true, why: '1 batch = 2 1/2, half batch = 1 1/4. Together: 3 3/4 cups.' } },
    { tag: 'reason', title: 'Bigger or smaller?', sheet: 5, q: { type: 'sort', q: 'Without calculating, will the product be bigger or smaller than 2 1/2?', bins: ['Bigger than 2 1/2', 'Smaller than 2 1/2'], items: [['3 × 2 1/2', 0], ['1/2 × 2 1/2', 1], ['3/4 × 2 1/2', 1], ['1 1/2 × 2 1/2', 0], ['5/4 × 2 1/2', 0]] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: bars for the class', sheet: 6, q: { type: 'num', q: 'The class needs 30 bars. One batch makes 12. How many cups of honey (3/4 cup per batch) do you need?', unit: 'cups', answer: 15 / 8, work: true, why: '30 ÷ 12 = 2 1/2 batches. 2 1/2 × 3/4 = 15/8 = 1 7/8 cups.' } },
    { tag: 'explain', title: 'Explain it', sheet: 7, q: { type: 'text', q: 'Explain why 1/2 × 3/4 is SMALLER than 3/4, but 3 × 3/4 is BIGGER.', rows: 3, need: [{ words: ['half', 'part of', 'less than 1', 'less than one'], label: 'Multiplying by less than 1 takes part of it' }, { words: ['groups', 'more than 1', 'times', 'three'], label: 'Multiplying by more than 1 makes groups' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-community-garden', std: 'g5-math-fractions', subject: 'math', grade: 5, code: '5.C.6',
  title: 'Community Garden Planner', model: 'areaModel', minutes: 20, icon: '🍅',
  place: 'Sunnyside Community Garden',
  mission: 'The community garden committee divides the land again and again: part for vegetables, then part of that for tomatoes. Use an area model to find what fraction of the WHOLE garden each crop gets.',
  question: 'How does an area model show multiplying a fraction by a fraction?',
  takeaway: 'To find a fraction of a fraction, shade the first fraction with columns and the second with rows. The overlap is the product. The number of overlap squares is the numerator (numerator × numerator), and the total squares is the denominator (denominator × denominator).',
  vocab: [['Area model', 'A rectangle split into parts to show multiplication.'], ['Product', 'The answer to a multiplication problem.'], ['"Of"', 'In math, "2/3 of 3/4" means 2/3 × 3/4.'], ['Overlap', 'Where the two shadings cross.']],
  warmup: { style: 'Quick sketch', prompt: 'Draw a rectangle for each. Shade and answer.', items: [['Shade 1/2 of a rectangle. Then shade 1/2 of that half. What part of the whole is double-shaded?', '1/4.'], ['What is half of a half of a pizza?', '1/4 of the pizza.'], ['Is 2/3 of 3/4 more or less than 3/4?', 'Less.']] },
  steps: [
    { tag: 'explore', title: 'Vegetable land', setup: { task: 0 }, goal: { text: 'Cut the garden into 4 columns and shade 3 of them (3/4 for vegetables).', check: { task: 0, cols: 4, colShade: 3 } } },
    { tag: 'test', title: 'Tomato land', sheet: 1, goal: { text: 'Now cut into 3 rows and shade 2 rows (2/3 of the vegetable land).', check: { task: 0, rows: 3, rowShade: 2, colShade: 3 } },
      q: { type: 'num', q: 'What fraction of the WHOLE garden is tomatoes?', answer: 6 / 12, hint: 'Count the 🍅 squares and the total squares.', why: '6 of the 12 plots are tomatoes: 6/12 = 1/2.' } },
    { tag: 'reason', title: 'Find the shortcut', sheet: 2, q: { type: 'mc', q: 'How do the 6 tomato squares and 12 total squares connect to 3/4 × 2/3?', choices: ['3 × 2 = 6 squares and 4 × 3 = 12 squares', '3 + 2 = 6', '4 + 3 = 12 × 1'], answer: 0 } },
    { tag: 'test', title: 'Garden 2', setup: { task: 1 }, sheet: 3, goal: { text: 'Model 3/5 of 1/2 for sunflowers.', check: { task: 1, aRight: true, bRight: true } },
      q: { type: 'num', q: 'What fraction of the whole garden is sunflowers?', answer: 3 / 10 } },
    { tag: 'test', title: 'Garden 3', setup: { task: 2 }, sheet: 4, goal: { text: 'Model 1/4 of 5/6 for carrots.', check: { task: 2, aRight: true, bRight: true } },
      q: { type: 'num', q: 'What fraction of the whole garden is carrots?', answer: 5 / 24 } },
    { tag: 'reason', title: 'Smaller than both', sheet: 5, q: { type: 'mc', q: 'In every garden, the product was smaller than BOTH fractions. Why?', choices: ['You take a part of a part, so it keeps shrinking', 'Multiplication always makes numbers smaller', 'The garden got smaller'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: backwards', sheet: 6, q: { type: 'mc', q: 'Tomatoes are 1/6 of the whole garden and they got 1/2 of the vegetable land. What fraction of the garden is vegetables?', choices: ['1/3', '1/12', '2/3', '1/2'], answer: 0, why: '1/2 × 1/3 = 1/6.' } },
    { tag: 'explain', title: 'Committee report', sheet: 7, q: { type: 'text', q: 'Explain to the committee how the area model shows 2/3 × 3/4 = 6/12.', rows: 3, need: [{ words: ['column'], label: 'Mentions columns' }, { words: ['row'], label: 'Mentions rows' }, { words: ['overlap', 'both', 'cross', 'red'], label: 'Explains the overlap is the answer' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-trail-relay', std: 'g5-math-fractions', subject: 'math', grade: 5, code: '5.C.4 · 5.AT.2',
  title: 'Trail Relay', model: 'fracLine', minutes: 20, icon: '🏃',
  place: 'Sunnyside Park · Fitness Trail',
  mission: 'Relay teams must run at least 2 miles to earn a medal. Before running, estimate with benchmark fractions (0, ½, 1). Then run each leg on the number line to check.',
  question: 'How can benchmark fractions help us estimate and check fraction sums?',
  takeaway: 'Benchmark fractions (0, 1/2, 1) help you estimate: 7/8 is close to 1, 3/8 is close to 1/2. Estimating first lets you check if an exact answer is reasonable. On a number line, adding fractions is putting hops end to end.',
  vocab: [['Benchmark fraction', 'A friendly fraction for comparing, like 0, 1/2, and 1.'], ['Estimate', 'A close, reasonable guess.'], ['Reasonable', 'Makes sense compared to your estimate.'], ['Number line', 'A line with numbers placed in order at equal spaces.']],
  warmup: { style: 'Closer to...?', prompt: 'Is each fraction closer to 0, 1/2, or 1? Explain.', items: [['5/6', 'Close to 1 (only 1/6 away).'], ['3/8', 'Close to 1/2 (1/2 = 4/8).'], ['1/10', 'Close to 0.']] },
  steps: [
    { tag: 'explore', title: 'Estimate relay 1', setup: { race: 0 }, strategy: '3/4 is between 1/2 and 1. 2/3 is between 1/2 and 1. So the total is between 1 and 2.', goal: { text: 'Drag the 🚩 to your estimate for 3/4 + 2/3.', check: { race: 0, estimated: true } } },
    { tag: 'test', title: 'Run relay 1', sheet: 1, goal: { text: 'Run both legs.', check: { race: 0, finished: true } },
      q: { type: 'num', q: 'What is the team\'s exact total? (Mixed number.)', unit: 'mi', answer: 17 / 12, work: true } },
    { tag: 'reason', title: 'Medal?', sheet: 1, q: { type: 'mc', q: 'Did relay 1 reach the 2-mile goal?', choices: ['No: 1 5/12 miles is less than 2', 'Yes', 'Exactly 2'], answer: 0 } },
    { tag: 'test', title: 'Relay 2', setup: { race: 1 }, sheet: 2, goal: { text: 'Estimate, then run relay 2 (5/6 + 3/8 + 1/2).', check: { race: 1, finished: true } },
      q: { type: 'num', q: 'What is the exact total?', unit: 'mi', answer: 41 / 24, work: true } },
    { tag: 'test', title: 'Relay 3', setup: { race: 2 }, sheet: 3, goal: { text: 'Estimate, then run relay 3 (7/8 + 4/5).', check: { race: 2, finished: true } },
      q: { type: 'num', q: 'What is the exact total?', unit: 'mi', answer: 67 / 40, work: true } },
    { tag: 'reason', title: 'Use benchmarks', sheet: 4, q: { type: 'sort', q: 'Using only benchmarks, sort each relay.', bins: ['Definitely more than 1 mile', 'Definitely less than 1 mile'], items: [['1/8 + 1/5', 1], ['7/8 + 9/10', 0], ['2/5 + 1/3', 1], ['5/6 + 1/2', 0]] } },
    { tag: 'reason', title: 'Reasonable?', sheet: 5, text: 'Jordan says 7/8 + 4/5 = 11/13.', q: { type: 'mc', q: 'Use benchmarks. Is Jordan\'s answer reasonable?', choices: ['No: both are close to 1, so the sum should be close to 2, and 11/13 is less than 1', 'Yes', 'Can\'t tell'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: fourth runner', sheet: 6, q: { type: 'num', q: 'Relay 1 ran 3/4 + 2/3 miles. How far must a THIRD runner go to reach exactly 2 miles?', unit: 'mi', answer: 7 / 12, work: true } },
    { tag: 'write', title: 'Coach\'s note', sheet: 7, q: { type: 'text', q: 'Explain how you can tell 7/8 + 4/5 is more than 1 1/2 without finding the exact answer.', rows: 3, need: [{ words: ['close to 1', 'almost 1', 'near 1', 'benchmark'], label: 'Uses a benchmark' }, { words: ['more than', 'greater', 'bigger'], label: 'Compares to 1 1/2' }] } }
  ]
});

/* ======================= Decimals ======================= */
SUNNY_SIMS.push({
  id: 'g5-math-grocery', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.C.7',
  title: 'Sunnyside Grocery', model: 'grocery', minutes: 25, icon: '🛒',
  place: 'Sunnyside Grocery · Aisle 5',
  mission: 'You have $20 and a shopping list for the family. Shop the aisles, estimate before you check out, add prices using place value, and make sure you get the right change.',
  question: 'How can place value help us add and estimate with money?',
  takeaway: 'To add decimals, add digits with the same place value (hundredths with hundredths, tenths with tenths) and regroup 10 of one place into 1 of the next. Estimating first (rounding each price to the nearest dollar) tells you if your exact total is reasonable.',
  vocab: [['Tenths', 'The first place after the decimal point (dimes).'], ['Hundredths', 'The second place after the decimal point (pennies).'], ['Regroup', 'Trade 10 of one place for 1 of the next place.'], ['Estimate', 'A close answer found by rounding.'], ['Budget', 'The most money you can spend.']],
  warmup: { style: 'Estimation station', prompt: 'Round each price to the nearest dollar, then estimate the total.', items: [['$2.49 + $3.19', 'About $2 + $3 = $5.'], ['$4.75 + $1.29', 'About $5 + $1 = $6.'], ['Is $9.91 a reasonable total for $2.49, $3.19, $2.98, and $1.25?', 'Yes: estimate $2 + $3 + $3 + $1 = $9.']] },
  steps: [
    { tag: 'explore', title: 'Shop the list', goal: { text: 'Put everything on your shopping list in the cart (and nothing else).', check: { onlyList: true } } },
    { tag: 'predict', title: 'Estimate first', sheet: 1, strategy: 'Round each price to the nearest dollar and add.', q: { type: 'num', q: 'Estimate the total by rounding each price to the nearest dollar.', unit: 'dollars', answer: 9, hint: '$2.49 → $2, $3.19 → $3, $2.98 → $3, $1.25 → $1.' } },
    { tag: 'test', title: 'Add by place value', sheet: 2, goal: { text: 'Turn on the **place value mat**.', check: { usedMat: true, onlyList: true } },
      q: { type: 'num', q: 'Use the mat: add each column and regroup. What is the exact total?', unit: '$', answer: 9.91, tol: 0.001, work: true, hint: 'Hundredths: 9 + 9 + 8 + 5 = 31 hundredths = 3 tenths and 1 hundredth.' } },
    { tag: 'reason', title: 'Check with the estimate', sheet: 2, q: { type: 'mc', q: 'Your estimate was $9 and the exact total is $9.91. Is it reasonable?', choices: ['Yes: $9.91 is close to $9', 'No: it should be about $99', 'No: it should be about $0.99'], answer: 0 } },
    { tag: 'apply', title: 'Change back', sheet: 3, strategy: 'Count up: $9.91 → $10.00 is 9¢, then $10 → $20 is $10.', q: { type: 'num', q: 'You pay with $20. How much change do you get?', unit: '$', answer: 10.09, tol: 0.001, work: true } },
    { tag: 'test', title: 'Soup for the week', sheet: 4, goal: { text: 'Add **3 cans of tomato soup** to your cart.', check: { n_soup: { gte: 3 } } },
      q: { type: 'num', q: '3 cans at $1.29. Use partial products: 3 × $1 + 3 × $0.29. What do the 3 cans cost?', unit: '$', answer: 3.87, tol: 0.001, work: true } },
    { tag: 'reason', title: 'Stay on budget', sheet: 5, q: { type: 'mc', q: 'With the list items AND 3 soups, can you also afford cheese ($5.06) with $20?', choices: ['No: the total is over $20', 'Yes: the total is $18.84, which is under $20', 'No: the total is over $25'], answer: 1, hint: 'Add $9.91 + $3.87 first.' } },
    { tag: 'reason', title: 'Error detective', sheet: 6, text: 'Kai added $4.75 + $1.25 and got $5.100.',
      q: { type: 'mc', q: 'What did Kai do wrong?', choices: ['He didn\'t regroup: 10 hundredths should become 1 tenth, and 10 tenths should become 1 whole, so it is $6.00', 'Nothing, $5.100 is right', 'He should have subtracted'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: maximize', sheet: 7, q: { type: 'text', q: 'After your list items ($9.91), choose extra items so your total is as close to $20 as possible without going over. List them and your total.', number: true, need: [{ words: ['$', '.'], label: 'Gives a money total' }], min: 8 } },
    { tag: 'explain', title: 'Explain your strategy', sheet: 8, q: { type: 'text', q: 'Explain how you added the prices using place value. Use the word "regroup".', rows: 3, need: [{ words: ['regroup', 'trade'], label: 'Uses regroup' }, { words: ['hundredths', 'tenths', 'pennies', 'dimes', 'place'], label: 'Names place values' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-deli-counter', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.NS.1',
  title: 'Deli Counter Scale', model: 'deliScale', minutes: 20, icon: '🧀',
  place: 'Sunnyside Grocery · Deli Counter',
  mission: 'The deli scale reads to the thousandth of a pound. Fill customer orders, read the scale in words, compare weights, and decide how to round the price label.',
  question: 'How do we read, compare, and round decimals to the thousandths?',
  takeaway: 'Each place is 10 times the place to its right: 1 tenth = 10 hundredths = 100 thousandths. To compare decimals, line up the places and compare from the left. To round, look at the digit to the right of the place you are rounding to.',
  vocab: [['Thousandths', 'The third place after the decimal point.'], ['Expanded form', 'A number written as a sum of place values: 0.375 = 0.3 + 0.07 + 0.005.'], ['Round', 'Change to a nearby friendly number.'], ['Compare', 'Decide which is greater or less (>, <, =).']],
  warmup: { style: 'Which is greater?', prompt: 'Write >, <, or =. Explain one.', items: [['0.4 __ 0.375', '0.4 > 0.375 (4 tenths > 3 tenths).'], ['0.5 __ 0.500', 'Equal.'], ['0.09 __ 0.1', '0.09 < 0.1.']] },
  steps: [
    { tag: 'explore', title: 'Order: 0.375 lb', text: 'A customer wants **0.375 pounds** of deli meat and cheese.', goal: { text: 'Make the scale read exactly 0.375 lb.', check: { w1000: 375 } },
      q: { type: 'mc', q: 'How do you say 0.375?', choices: ['three hundred seventy-five thousandths', 'three hundred seventy-five', 'three and seventy-five hundredths', 'thirty-seven and five tenths'], answer: 0 } },
    { tag: 'reason', title: 'Expanded form', sheet: 1, q: { type: 'mc', q: 'Which shows 0.375 in expanded form?', choices: ['0.3 + 0.07 + 0.005', '3 + 7 + 5', '0.3 + 0.7 + 0.5', '0.03 + 0.07 + 0.05'], answer: 0 } },
    { tag: 'test', title: 'About half a pound', sheet: 2, goal: { text: 'A customer wants "about half a pound." Make a weight between 0.45 and 0.55 lb.', check: function (s) { return s.weight >= 0.45 && s.weight <= 0.55; } },
      q: { type: 'num', q: 'What does your scale read?', unit: 'lb', answer: function (s) { return s.weight; }, tol: 0.0005 } },
    { tag: 'record', title: 'Compare orders', sheet: 3, q: { type: 'order', q: 'Put these deli orders in order from least to greatest.', items: ['0.05 lb', '0.305 lb', '0.35 lb', '0.375 lb', '0.4 lb'], labels: ['least', 'greatest'] } },
    { tag: 'test', title: 'Round the label', sheet: 4, goal: { text: 'Make 0.375 lb again and switch the label to **nearest tenth**.', check: { w1000: 375, round: '1' } },
      q: { type: 'num', q: 'What does the label say, rounded to the nearest tenth?', unit: 'lb', answer: 0.4, tol: 0.0001, why: 'The hundredths digit is 7, which is 5 or more, so 3 tenths rounds up to 4 tenths.' } },
    { tag: 'test', title: 'Nearest hundredth', sheet: 4, goal: { text: 'Switch the label to **nearest hundredth**.', check: { w1000: 375, round: '2' } },
      q: { type: 'num', q: 'What does the label say now?', unit: 'lb', answer: 0.38, tol: 0.0001 } },
    { tag: 'reason', title: 'Fair label?', sheet: 5, q: { type: 'mc', q: 'The deli rounds 0.375 lb up to 0.4 lb on the price label. Who does this help?', choices: ['The store: the customer pays for 0.025 lb more than they get', 'The customer', 'Nobody, it is the same'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: build it', sheet: 6, q: { type: 'num', q: 'Using 0.1 lb ham, 0.05 lb turkey, and 0.025 lb cheese slices, what is the FEWEST slices that weigh exactly 0.425 lb?', unit: 'slices', answer: 5, work: true, why: '4 ham slabs (0.4 lb) + 1 cheese slice (0.025 lb) = 0.425 lb in 5 slices.' } },
    { tag: 'explain', title: 'Explain comparing', sheet: 7, q: { type: 'text', q: 'Explain why 0.4 is greater than 0.375, even though 375 is bigger than 4.', rows: 3, need: [{ words: ['tenth', 'tenths'], label: 'Compares the tenths place' }, { words: ['place', 'line up', 'left'], label: 'Talks about place value' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-unit-price', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.C.7',
  title: 'Unit Price Detective', model: 'unitPrice', minutes: 20, icon: '🔎',
  place: 'Sunnyside Grocery · Snack Aisle',
  mission: 'Is the big package ALWAYS the better deal? Split prices into equal parts to find the cost of one item, then decide which package to buy.',
  question: 'How can dividing a decimal price find the better buy?',
  takeaway: 'The unit price is the cost of ONE item: divide the price by the number of items. A bar model split into equal parts shows the division. Bigger packages are often cheaper per item, but not always, so compare unit prices.',
  vocab: [['Unit price', 'The price of one item or one unit.'], ['Divide', 'Split into equal groups.'], ['Better buy', 'The choice with the lower unit price.'], ['Bar model', 'A rectangle split into parts to show a problem.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain.', items: [['2 cookies for $1.00 or 5 cookies for $2.00?', '5 for $2.00: 40¢ each vs 50¢ each.'], ['Is a bigger package always cheaper per item?', 'No: you have to check the unit price.'], ['$3.00 ÷ 4 = ?', '$0.75.']] },
  steps: [
    { tag: 'explore', title: 'Juice boxes', setup: { pair: 0 }, goal: { text: 'Split each price bar into one part per juice box.', check: { pair: 0, splitA: true, splitB: true } },
      q: { type: 'table', q: 'Record the unit prices.', rowHead: 'Package', cols: [{ label: 'Price per box', unit: '$', value: function (s, r) { return r.v; }, tol: 0.001 }], rows: [{ label: '4-pack for $3.20', v: 0.8 }, { label: '10-pack for $7.50', v: 0.75 }] } },
    { tag: 'test', title: 'Buy the better deal', sheet: 1, goal: { text: 'Buy the better juice deal.', check: { pair: 0, pickedBest: true } } },
    { tag: 'test', title: 'Granola bars', setup: { pair: 1 }, sheet: 2, goal: { text: 'Find both unit prices and buy the better granola deal.', check: { pair: 1, pickedBest: true, splitA: true, splitB: true } },
      q: { type: 'num', q: 'What is the unit price of the better deal?', unit: '$ per bar', answer: 0.65, tol: 0.001, work: true } },
    { tag: 'predict', title: 'Predict: pencils', setup: { pair: 2 }, sheet: 3, q: { type: 'predict', q: 'Pencils: 5-pack for $1.75 or 12-pack for $4.80. Which will be the better buy?', choices: ['The 12-pack (bigger is always better)', 'The 5-pack', 'They are the same'] } },
    { tag: 'test', title: 'Check the pencils', sheet: 3, goal: { text: 'Find both unit prices and buy the better pencil deal.', check: { pair: 2, pickedBest: true, splitA: true, splitB: true } },
      q: { type: 'mc', q: 'You predicted: {{pred:s3}}. What did you find?', choices: ['The smaller 5-pack was cheaper per pencil ($0.35 vs $0.40)', 'The 12-pack was cheaper', 'Same price'], answer: 0 } },
    { tag: 'reason', title: 'Strategy check', sheet: 4, text: 'To find $4.80 ÷ 12, Rosa thinks: "$4.80 is 480 cents. 480 ÷ 12 = 40 cents."', q: { type: 'mc', q: 'Why does Rosa\'s strategy work?', choices: ['Changing dollars to cents makes a whole-number division with the same value', 'It doesn\'t work', 'She guessed'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: new deal', sheet: 5, q: { type: 'num', q: 'A 15-pack of pencils costs $5.40. What is the unit price?', unit: '$', answer: 0.36, tol: 0.001, work: true } },
    { tag: 'explain', title: 'Shopper tip', sheet: 6, q: { type: 'text', q: 'Write a tip for shoppers explaining how to find the better buy. Use an example with numbers.', number: true, rows: 3, need: [{ words: ['divide', 'split', 'each', 'one'], label: 'Explains finding the price of one' }, { words: ['compare', 'cheaper', 'lower', 'less'], label: 'Explains comparing' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-cashier', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.C.7',
  title: 'Cashier Challenge', model: 'cashier', minutes: 20, icon: '💵',
  place: 'Sunnyside Grocery · Checkout Lane 3',
  mission: 'It\'s your first shift at the register and the change machine is broken! Make exact change by counting up with bills and coins, just like real cashiers do.',
  question: 'How can counting up help us subtract decimals?',
  takeaway: 'You can subtract decimals by counting up from the price to the amount paid: first to the next dime or dollar, then by bigger jumps. The coins and bills you hand back add up to the difference.',
  vocab: [['Difference', 'The result of subtraction.'], ['Counting up', 'Adding on from the smaller number to reach the larger number.'], ['Change', 'Money given back when someone pays more than the price.'], ['Friendly number', 'An easy number to jump to, like a whole dollar.']],
  warmup: { style: 'Number talk', prompt: 'Solve mentally. Show your jumps.', items: [['$13.47 → $13.50 is how much?', '3 cents.'], ['$13.50 → $14.00?', '50 cents.'], ['$14.00 → $20.00?', '$6. Total change: $6.53.']] },
  steps: [
    { tag: 'explore', title: 'First customer', setup: { sale: 0 }, strategy: 'Pennies to the next nickel/dime, then quarters to the next dollar, then dollars.', goal: { text: 'Give EXACT change for $13.47 paid with $20.', check: { sale: 0, exact: true } },
      q: { type: 'num', q: 'How much change did you give?', unit: '$', answer: 6.53, tol: 0.001 } },
    { tag: 'reason', title: 'Why count up?', sheet: 1, q: { type: 'mc', q: 'Why is counting up easier than subtracting 20.00 − 13.47 on paper?', choices: ['You avoid regrouping across zeros, using friendly jumps instead', 'It isn\'t easier', 'You don\'t need to know place value'], answer: 0 } },
    { tag: 'test', title: 'Customer 2', setup: { sale: 1 }, sheet: 2, goal: { text: 'Make exact change for $6.82 paid with $10.', check: { sale: 1, exact: true } }, q: { type: 'num', q: 'Change?', unit: '$', answer: 3.18, tol: 0.001, work: true } },
    { tag: 'test', title: 'Customer 3', setup: { sale: 2 }, sheet: 3, goal: { text: 'Make exact change for $28.35 paid with $50.', check: { sale: 2, exact: true } }, q: { type: 'num', q: 'Change?', unit: '$', answer: 21.65, tol: 0.001, work: true } },
    { tag: 'test', title: 'Customer 4', setup: { sale: 3 }, sheet: 4, goal: { text: 'Make exact change for $4.09 paid with $5.', check: { sale: 3, exact: true } }, q: { type: 'num', q: 'Change?', unit: '$', answer: 0.91, tol: 0.001, work: true } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'A new cashier says $10.00 − $6.82 = $4.28.', q: { type: 'mc', q: 'How can you tell it is wrong using counting up?', choices: ['$6.82 + $4.28 = $11.10, not $10.00', 'It is right', 'You can\'t check subtraction'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: fewest pieces', sheet: 6, q: { type: 'num', q: 'What is the FEWEST number of bills and coins to make $6.53 in change?', unit: 'pieces', answer: 7, work: true, why: '$5 + $1 + 2 quarters + 3 pennies = 7 pieces.' } },
    { tag: 'explain', title: 'Train a new cashier', sheet: 7, q: { type: 'text', q: 'Explain to a new cashier how to count up change for a $13.47 purchase paid with $20.', number: true, rows: 3, need: [{ words: ['13.50', '14', 'next'], label: 'Jumps to a friendly number' }, { words: ['20'], label: 'Counts up to $20' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-powers-of-ten', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.NS.1 · 5.C.7',
  title: 'Powers of Ten Machine', model: 'powersTen', minutes: 20, icon: '🔟',
  place: 'Sunnyside Makerspace',
  mission: 'The makerspace\'s place value machine multiplies and divides by 10, 100, and 1,000. Feed it numbers, watch the digits slide, and figure out the pattern that lets you skip the calculator.',
  question: 'What happens to digits when we multiply or divide by powers of 10?',
  takeaway: 'Multiplying by 10 moves each digit one place to the LEFT (each digit becomes 10 times bigger). Dividing by 10 moves each digit one place to the RIGHT. × 100 or ÷ 100 moves two places, and × 1,000 or ÷ 1,000 moves three places. The decimal point stays still; the digits move.',
  vocab: [['Power of 10', 'Numbers like 10, 100, 1,000 made by multiplying 10s.'], ['Place value', 'The value of a digit based on its position.'], ['Pattern', 'A rule that repeats.'], ['Metric units', 'Units based on 10s, like meters and centimeters.']],
  warmup: { style: 'Pattern hunt', prompt: 'Fill in and describe the pattern.', items: [['4 × 10 = ___, 4 × 100 = ___, 4 × 1,000 = ___', '40, 400, 4,000.'], ['0.4 × 10 = ___', '4.'], ['What pattern do you notice?', 'Each × 10 moves digits one place left.']] },
  steps: [
    { tag: 'explore', title: 'Feed the machine', goal: { text: 'Start with 4.37 and press **× 10**.', check: { v_43_7: true } },
      q: { type: 'mc', q: 'What happened to the digits?', choices: ['Each digit moved one place to the left', 'A zero was added to the end', 'The decimal point moved right, and the digits stayed'], answer: 0, why: 'Each digit became 10 times bigger, so it shifted one place left. (Adding a zero doesn\'t work: 4.37 → 4.370 is the same number!)' } },
    { tag: 'test', title: '× 100', sheet: 1, goal: { text: 'Type 4.37 in the box, then press **× 100**.', check: { v_437: true } }, q: { type: 'num', q: 'What is 4.37 × 100?', answer: 437 } },
    { tag: 'test', title: 'Divide', sheet: 2, goal: { text: 'Now press **÷ 1,000** starting from 437.', check: { v_0_437: true } }, q: { type: 'mc', q: 'Which way did the digits move when you divided?', choices: ['Right, three places', 'Left, three places', 'They didn\'t move'], answer: 0 } },
    { tag: 'record', title: 'Pattern table', sheet: 3, q: { type: 'table', q: 'Use the machine to fill in the table.', rowHead: 'Problem', cols: [{ label: 'Answer', value: function (s, r) { return r.v; }, tol: 0.0001 }], rows: [{ label: '0.56 × 10', v: 5.6 }, { label: '0.56 × 100', v: 56 }, { label: '72.5 ÷ 10', v: 7.25 }, { label: '72.5 ÷ 100', v: 0.725 }] } },
    { tag: 'apply', title: 'Makerspace measuring', sheet: 4, strategy: '1 meter = 100 centimeters. Multiply by 100 to change meters to centimeters.', q: { type: 'num', q: 'A shelf is 1.35 m long. How many centimeters is that?', unit: 'cm', answer: 135 } },
    { tag: 'apply', title: 'Tiny parts', sheet: 4, q: { type: 'num', q: 'A screw is 8 mm long. How many meters is that? (1 m = 1,000 mm)', unit: 'm', answer: 0.008, tol: 0.00001 } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Lee says 2.5 × 10 = 2.50 because "times 10 adds a zero."', q: { type: 'mc', q: 'What is wrong?', choices: ['2.50 = 2.5, so nothing changed. The digits should move left: 25', 'Nothing', 'It should be 2.05'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: mystery input', sheet: 6, q: { type: 'num', q: 'The machine did × 100, then ÷ 1,000, and the result was 0.63. What number went in?', answer: 6.3, tol: 0.0001, work: true } },
    { tag: 'explain', title: 'Explain the rule', sheet: 7, q: { type: 'text', q: 'Explain why "just add a zero" is NOT a good rule for multiplying decimals by 10.', rows: 3, need: [{ words: ['move', 'shift', 'left', 'place'], label: 'Digits move places' }, { words: ['same', 'equal', '2.50', 'doesn\'t change'], label: 'Adding a zero after a decimal keeps the same value' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-swim-meet', std: 'g5-math-decimals', subject: 'math', grade: 5, code: '5.NS.1',
  title: 'Swim Meet Scoreboard', model: 'raceTimes', minutes: 20, icon: '🏊',
  place: 'Sunnyside Aquatic Center',
  mission: 'At the regional swim meet, races are timed to the thousandth of a second. The scoreboard can only show some digits. Put the swimmers in order, then see what rounding does to the results.',
  question: 'How do we compare and round decimals, and why does precision matter?',
  takeaway: 'Compare decimals place by place from the left. Rounding makes numbers easier to read but can create ties: 52.431 and 52.43 both round to 52.43. That is why races are timed to the thousandths.',
  vocab: [['Thousandth', 'One part of 1,000 equal parts.'], ['Precision', 'How exact a measurement is.'], ['Tie', 'When two values are equal.'], ['Round', 'Replace with a nearby number with fewer digits.']],
  warmup: { style: 'Order it', prompt: 'Order from fastest (least) to slowest.', items: [['52.5, 52.08, 52.431', '52.08, 52.431, 52.5.'], ['Round 52.431 to the nearest tenth', '52.4.'], ['Round 52.08 to the nearest tenth', '52.1.']] },
  steps: [
    { tag: 'explore', title: 'Watch the race', goal: { text: 'Replay the race and watch the finish times.', check: { watched: true } } },
    { tag: 'test', title: 'Order the finishers', sheet: 1, goal: { text: 'Put the results board in order, fastest first.', check: { ordered: true } },
      q: { type: 'mc', q: 'Who won the race?', choices: ['Eli (52.08)', 'Dev (52.5)', 'Ana (52.431)', 'Ben (52.413)'], answer: 0 } },
    { tag: 'reason', title: 'Tricky pair', sheet: 2, q: { type: 'mc', q: 'Which is faster: Ben at 52.413 or Cho at 52.43?', choices: ['Ben: 52.413 < 52.430', 'Cho, because 43 < 413', 'They tied'], answer: 0, why: 'Write 52.43 as 52.430. Compare hundredths: 1 < 3, so 52.413 is less, which means faster.' } },
    { tag: 'test', title: 'Round the board', sheet: 3, goal: { text: 'Switch the board to **Round to hundredths**.', check: { round: '2' } },
      q: { type: 'num', q: 'How many swimmers look TIED now?', unit: 'swimmers', answer: 2 } },
    { tag: 'test', title: 'Round to tenths', sheet: 3, goal: { text: 'Switch to **Round to tenths**.', check: { round: '1' } },
      q: { type: 'mc', q: 'What problem does rounding to tenths cause?', choices: ['Three swimmers all show 52.4, so you can\'t tell who got 2nd', 'Everyone shows the same time', 'Nothing'], answer: 0 } },
    { tag: 'record', title: 'Round each time', sheet: 4, q: { type: 'table', q: 'Round each time.', rowHead: 'Time', cols: [{ label: 'Nearest tenth', value: function (s, r) { return r.t; }, tol: 0.0001 }, { label: 'Nearest hundredth', value: function (s, r) { return r.h; }, tol: 0.0001 }], rows: [{ label: '52.431', t: 52.4, h: 52.43 }, { label: '52.08', t: 52.1, h: 52.08 }, { label: '52.5', t: 52.5, h: 52.5 }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: difference', sheet: 5, q: { type: 'num', q: 'How many seconds faster was Ben (52.413) than Ana (52.431)?', unit: 's', answer: 0.018, tol: 0.00001 } },
    { tag: 'explain', title: 'Why thousandths?', sheet: 6, q: { type: 'text', q: 'Explain why swim meets time races to the thousandths of a second. Use an example from the race.', number: true, rows: 3, need: [{ words: ['tie', 'same', 'round'], label: 'Explains ties from rounding' }, { words: ['52.43', '52.431', 'thousandth'], label: 'Uses an example' }] } }
  ]
});

/* ======================= Volume ======================= */
SUNNY_SIMS.push({
  id: 'g5-math-box-builder', std: 'g5-math-volume', subject: 'math', grade: 5, code: '5.M.4',
  title: 'Box Builder', model: 'boxBuilder', minutes: 20, icon: '📦',
  place: 'Sunnyside Toy Factory · Packing Room',
  mission: 'The toy factory ships building blocks in boxes. Fill boxes with unit cubes (one at a time, a row at a time, or a layer at a time) and discover a shortcut for finding volume without counting every cube.',
  question: 'Why does V = length × width × height (or base × height) find volume?',
  takeaway: 'Volume is the number of unit cubes that fill a solid. The bottom layer has length × width cubes (the base, B). Each layer is the same, so multiply the base by the number of layers (height): V = l × w × h = B × h.',
  vocab: [['Volume', 'How many cubic units fill a solid.'], ['Unit cube', 'A cube that is 1 unit long on each side (1 cubic unit).'], ['Base (B)', 'The area of the bottom layer: length × width.'], ['Layer', 'One level of cubes in a box.']],
  warmup: { style: 'Estimation station', prompt: 'Estimate, then explain your thinking.', items: [['About how many sugar cubes would fill a tissue box?', 'Accept reasoned estimates (hundreds).'], ['A floor is 4 tiles by 3 tiles. How many tiles?', '12.'], ['How is volume different from area?', 'Area counts squares on a flat surface; volume counts cubes filling space.']] },
  steps: [
    { tag: 'explore', title: 'Fill a box', setup: { l: 4, w: 3, h: 2 }, goal: { text: 'Fill the 4 × 3 × 2 box completely.', check: { dims_4x3x2: true } },
      q: { type: 'num', q: 'How many cubes fill the box?', unit: 'cubic units', answer: 24 } },
    { tag: 'reason', title: 'Count smarter', sheet: 1, q: { type: 'mc', q: 'How many cubes are in ONE layer of the 4 × 3 × 2 box?', choices: ['12', '4', '24', '7'], answer: 0 } },
    { tag: 'test', title: 'Layer by layer', setup: { l: 5, w: 2, h: 4 }, sheet: 2, strategy: 'Fill one layer, count it, then think: how many layers fit?', goal: { text: 'Use **+1 layer** to fill a 5 × 2 × 4 box.', check: { dims_5x2x4: true } },
      q: { type: 'num', q: 'What is the volume?', unit: 'cubic units', answer: 40, work: true } },
    { tag: 'record', title: 'Find the pattern', sheet: 3, q: { type: 'table', q: 'Build each box and record.', rowHead: 'Box (l × w × h)', cols: [{ label: 'Cubes in 1 layer (B)', value: function (s, r) { return r.b; } }, { label: 'Layers (h)', value: function (s, r) { return r.h; } }, { label: 'Volume', value: function (s, r) { return r.b * r.h; } }],
      rows: [{ label: '3 × 3 × 4', b: 9, h: 4, when: { dims_3x3x4: true }, setup: 'set 3, 3, 4 and fill it' }, { label: '6 × 2 × 3', b: 12, h: 3, when: { dims_6x2x3: true }, setup: 'set 6, 2, 3 and fill it' }, { label: '5 × 4 × 5', b: 20, h: 5, when: { dims_5x4x5: true }, setup: 'set 5, 4, 5 and fill it' }] } },
    { tag: 'reason', title: 'Write the rule', sheet: 4, q: { type: 'mc', q: 'Which rule works for every box in your table?', choices: ['Volume = (cubes in one layer) × (number of layers)', 'Volume = length + width + height', 'Volume = length × width only', 'Volume = 2 × height'], answer: 0 } },
    { tag: 'apply', title: 'No cubes allowed', sheet: 5, q: { type: 'num', q: 'A toy box is 8 in. long, 5 in. wide, and 6 in. tall. What is its volume?', unit: 'cubic inches', answer: 240, work: true } },
    { tag: 'reason', title: 'Order doesn\'t matter', sheet: 5, q: { type: 'mc', q: 'Maya says (8 × 5) × 6 and 8 × (5 × 6) give different volumes. Is she right?', choices: ['No: both are 240. You can multiply in any order', 'Yes', 'Only if the box is a cube'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: missing height', sheet: 6, q: { type: 'num', q: 'A box has volume 120 cubic cm and a base of 6 cm by 4 cm. How tall is it?', unit: 'cm', answer: 5, work: true } },
    { tag: 'explain', title: 'Explain the formula', sheet: 7, q: { type: 'text', q: 'Explain why V = B × h works. Use the word "layer".', rows: 3, need: [{ words: ['layer'], label: 'Uses layers' }, { words: ['base', 'bottom', 'length', 'width'], label: 'Connects to the base' }, { words: ['height', 'how many', 'stack'], label: 'Connects to height' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-shipping-center', std: 'g5-math-volume', subject: 'math', grade: 5, code: '5.M.4–5.M.5',
  title: 'Shipping Center', model: 'shipping', minutes: 25, icon: '🚚',
  place: 'Sunnyside Shipping Center',
  mission: 'A delivery truck holds exactly 100 cubic feet. Measure the boxes, find their volumes, and load the truck so it is packed exactly full, with no wasted space.',
  question: 'How can we use volume to solve real packing problems?',
  takeaway: 'Find each box\'s volume with V = l × w × h. Volume is additive: the space used by several boxes is the sum of their volumes. Comparing the total to the truck\'s capacity tells you what will fit.',
  vocab: [['Capacity', 'The most a container can hold.'], ['Additive', 'Volumes of separate parts can be added.'], ['Cubic feet (ft³)', 'Volume of a 1 ft × 1 ft × 1 ft cube.'], ['Constraint', 'A limit you must work within.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain with numbers.', items: [['Carry a 2×2×2 ft box or a 1×1×6 ft box? Which holds more?', '2×2×2 = 8 ft³ holds more than 6 ft³.'], ['Can two boxes have the same volume but different shapes?', 'Yes, e.g., 2×6×1 and 3×4×1.'], ['What is 5 × 2 × 2?', '20.']] },
  steps: [
    { tag: 'explore', title: 'Measure the boxes', goal: { text: 'Measure all four boxes.', check: { measuredCount: 4 } },
      q: { type: 'table', q: 'Record the volume of each box.', rowHead: 'Box', cols: [{ label: 'Volume', unit: 'ft³', value: function (s, r) { return r.v; } }], rows: [{ label: 'A (5 × 2 × 2)', v: 20 }, { label: 'B (3 × 3 × 3)', v: 27 }, { label: 'C (4 × 3 × 2)', v: 24 }, { label: 'D (6 × 2 × 1)', v: 12 }] } },
    { tag: 'reason', title: 'Biggest box?', sheet: 1, q: { type: 'mc', q: 'Box D is the LONGEST box. Does it have the most volume?', choices: ['No: it holds the least (12 ft³)', 'Yes, longest means biggest', 'They are all equal'], answer: 0 } },
    { tag: 'test', title: 'Too much?', sheet: 2, goal: { text: 'Load boxes until one won\'t fit.', check: { overTried: true } },
      q: { type: 'num', q: 'How many cubic feet of space are left in the truck now?', unit: 'ft³', answer: function (s) { return s.left; } } },
    { tag: 'test', title: 'Pack it perfectly', sheet: 3, goal: { text: 'Unload, then find a combination that fills the truck EXACTLY to 100 ft³.', check: { exactFull: true } },
      q: { type: 'text', q: 'Write your combination as an equation (like 20 + 20 + ... = 100).', number: true, need: [{ words: ['100'], label: 'Totals 100' }, { words: ['+'], label: 'Shows addition' }], min: 4 } },
    { tag: 'reason', title: 'Another way', sheet: 4, q: { type: 'multi', q: 'Which combinations also fill exactly 100 ft³? Choose all.', choices: ['5 Box A (20 + 20 + 20 + 20 + 20)', '2 Box C + 1 Box D + 2 Box A (24 + 24 + 12 + 20 + 20)', '3 Box B + 1 Box D (27 + 27 + 27 + 12)', '4 Box B (27 × 4)'], answer: [0, 1] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: design a box', sheet: 5, q: { type: 'text', q: 'Design ONE new box so that 4 of them fill the truck exactly. Give its length, width, and height.', number: true, need: [{ words: ['×', 'x', 'by'], label: 'Gives dimensions' }], min: 4, hint: 'Each box must be 25 ft³.' } },
    { tag: 'explain', title: 'Shipping report', sheet: 6, q: { type: 'text', q: 'Explain how you decided which boxes fit in the truck. Use the words "volume" and "add".', number: true, rows: 3, need: [{ words: ['volume'], label: 'Uses volume' }, { words: ['add', 'sum', 'total', 'plus'], label: 'Explains adding volumes' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-aquarium', std: 'g5-math-volume', subject: 'math', grade: 5, code: '5.M.4',
  title: 'Aquarium Planner', model: 'aquarium', minutes: 20, icon: '🐠',
  place: 'Sunnyside Pet Store · Fish Room',
  mission: 'The pet store needs to know how many liters of water each fish tank holds and how deep the water will be. Pour water, watch the depth change, and connect cubic centimeters to liters.',
  question: 'How are volume, depth, and liters connected?',
  takeaway: 'A tank\'s volume is length × width × height in cubic centimeters. 1,000 cm³ = 1 liter. The water\'s depth depends on the base: depth = volume of water ÷ (length × width). A rock takes up space, so the water rises.',
  vocab: [['Cubic centimeter (cm³)', 'A cube 1 cm on each side; it holds 1 mL.'], ['Liter (L)', '1,000 cm³ of liquid.'], ['Depth', 'How high the water reaches.'], ['Displace', 'Push water out of the way by taking up space.']],
  warmup: { style: 'Estimation station', prompt: 'Estimate and explain.', items: [['A big water bottle holds 1 liter. About how many bottles fill a bathtub: 5, 150, or 5,000?', 'About 150.'], ['1 liter = ___ mL', '1,000.'], ['If you drop a rock in a full glass, what happens?', 'Water spills: the rock takes up space.']] },
  steps: [
    { tag: 'explore', title: 'Tank A capacity', goal: { text: 'Fill Tank A (50 × 20 × 30 cm) until it overflows.', check: { tank: '50x20x30', full: true } },
      q: { type: 'num', q: 'How many liters does Tank A hold?', unit: 'L', answer: 30, work: true, strategy: '50 × 20 × 30 cm³, then divide by 1,000.' } },
    { tag: 'test', title: 'Depth after 5 L', sheet: 1, goal: { text: 'Drain Tank A and pour exactly 5 liters.', check: { d_50x20x30_5: { gte: 0 } } },
      q: { type: 'num', q: 'How deep is the water?', unit: 'cm', answer: 5, why: '5 L = 5,000 cm³. The base is 50 × 20 = 1,000 cm². 5,000 ÷ 1,000 = 5 cm.' } },
    { tag: 'record', title: 'Compare tanks', sheet: 2, q: { type: 'table', q: 'Pour 10 L in each tank and record the depth.', rowHead: 'Tank', cols: [{ label: 'Base (cm²)', value: function (s, r) { return r.b; } }, { label: 'Depth', unit: 'cm', value: function (s, r) { return r.d; }, tol: 0.06 }],
      rows: [{ label: 'A 50×20×30', b: 1000, d: 10, when: function (s) { return s.d_50x20x30_10 != null; } }, { label: 'B 40×25×20', b: 1000, d: 10, when: function (s) { return s.d_40x25x20_10 != null; } }, { label: 'C 60×30×40', b: 1800, d: 5.56, when: function (s) { return s.d_60x30x40_10 != null; } }] } },
    { tag: 'reason', title: 'Same depth?', sheet: 3, q: { type: 'mc', q: 'Tanks A and B are different shapes but 10 L made the same depth. Why?', choices: ['They have the same base area (1,000 cm²)', 'They have the same height', 'Coincidence'], answer: 0 } },
    { tag: 'test', title: 'Add a rock', sheet: 4, goal: { text: 'In Tank A, pour 10 L, then add the 1,000 cm³ rock.', check: { tank: '50x20x30', rock: true, liters: 10 } },
      q: { type: 'num', q: 'How deep is the water now?', unit: 'cm', answer: 11, why: 'The rock takes up 1,000 cm³, raising the water 1 cm on a 1,000 cm² base.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: fish rule', sheet: 5, q: { type: 'num', q: 'A rule says 1 small fish per 4 liters. How many small fish can live in Tank C (60 × 30 × 40 cm) when full?', unit: 'fish', answer: 18, work: true } },
    { tag: 'explain', title: 'Store sign', sheet: 6, q: { type: 'text', q: 'Write a sign explaining how to find how many liters a tank holds.', rows: 3, number: true, need: [{ words: ['length', '×', 'multiply', 'times'], label: 'Multiply the dimensions' }, { words: ['1,000', '1000', 'thousand'], label: 'Divide by 1,000 for liters' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-composite-buildings', std: 'g5-math-volume', subject: 'math', grade: 5, code: '5.M.5',
  title: 'Composite Buildings', model: 'composite', minutes: 20, icon: '🏢',
  place: 'Sunnyside City Planning Office',
  mission: 'City planners need the volume of oddly-shaped buildings to plan heating and cooling. Split each building into boxes, or start with a big box and subtract, and prove both strategies give the same answer.',
  question: 'How can we find the volume of a figure made of two rectangular prisms?',
  takeaway: 'A composite figure can be split into rectangular prisms. Find each prism\'s volume and add. Another strategy: find a big box around the figure and subtract the missing part. Different strategies give the same volume.',
  vocab: [['Composite figure', 'A shape made from two or more simpler shapes.'], ['Decompose', 'Break into smaller parts.'], ['Rectangular prism', 'A box shape.'], ['Strategy', 'A plan for solving a problem.']],
  warmup: { style: 'Quick sketch', prompt: 'Draw an L-shape out of squares. Answer:', items: [['Show two different ways to split the L into rectangles.', 'Any two valid splits.'], ['If the L is a 4×3 rectangle with a 2×1 corner missing, what is its area?', '10.'], ['Can you add two volumes to get the total?', 'Yes, if the parts don\'t overlap.']] },
  steps: [
    { tag: 'explore', title: 'The library', setup: { shape: 0 }, goal: { text: 'Choose **✂ Split into 2 boxes**.', check: { shape: 0, cut: 'split' } },
      q: { type: 'num', q: 'Blue box: 6 × 4 × 2. Orange box: 2 × 4 × 1 on top. What is the total volume?', unit: 'cubes', answer: 56, work: true } },
    { tag: 'test', title: 'Subtract instead', sheet: 1, goal: { text: 'Choose **➖ Big box minus the gap**.', check: { shape: 0, cut: 'sub' } },
      q: { type: 'num', q: 'The big box is 6 × 4 × 3 = 72. The empty gap is 4 × 4 × 1. What is the library\'s volume?', unit: 'cubes', answer: 56, work: true } },
    { tag: 'reason', title: 'Same answer?', sheet: 2, q: { type: 'mc', q: 'Both strategies gave 56. Why must they match?', choices: ['They count the same cubes, just grouped differently', 'Coincidence', 'The subtraction strategy is always bigger'], answer: 0 } },
    { tag: 'test', title: 'Community center', setup: { shape: 1 }, sheet: 3, goal: { text: 'Split the community center into 2 boxes.', check: { shape: 1, cut: 'split' } },
      q: { type: 'num', q: 'Front box 5 × 3 × 2, back box 5 × 2 × 4. Total volume?', unit: 'cubes', answer: 70, work: true } },
    { tag: 'test', title: 'Clock tower shop', setup: { shape: 2 }, sheet: 4, goal: { text: 'Look at the clock tower shop with any strategy.', check: function (s) { return s.shape === 2 && s.cut !== 'none'; } },
      q: { type: 'num', q: 'The base is 4 × 4 × 1. The tower is 2 × 2 × 5 but its bottom cube layer is inside the base. What is the total volume?', unit: 'cubes', answer: 32, work: true, hint: 'Base 16 + the tower cubes ABOVE the base (2 × 2 × 4).' } },
    { tag: 'reason', title: 'Error detective', sheet: 5, text: 'Sam found the clock tower shop by adding 4×4×1 + 2×2×5 = 36.', q: { type: 'mc', q: 'What mistake did Sam make?', choices: ['He counted the 4 cubes where the tower overlaps the base twice', 'He multiplied wrong', 'Nothing, 36 is right'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: design', sheet: 6, q: { type: 'text', q: 'Design your own building from two boxes with a total volume of exactly 50 cubes. Give both boxes\' dimensions.', number: true, need: [{ words: ['×', 'x', 'by'], label: 'Gives dimensions' }, { words: ['50'], label: 'Totals 50' }] } },
    { tag: 'explain', title: 'Planner memo', sheet: 7, q: { type: 'text', q: 'Explain two strategies for finding the volume of an L-shaped building.', rows: 3, need: [{ words: ['split', 'break', 'decompose', 'separate'], label: 'Split-and-add strategy' }, { words: ['subtract', 'minus', 'take away', 'big box'], label: 'Big-box-minus-gap strategy' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-math-same-volume', std: 'g5-math-volume', subject: 'math', grade: 5, code: '5.M.4',
  title: 'Same Volume, Different Box', model: 'dimensions', minutes: 20, icon: '🧊',
  place: 'Sunnyside Toy Factory · Design Lab',
  mission: 'The factory ships 24 blocks per box, but designers argue about the box shape. Find EVERY box that holds exactly 24 unit cubes and recommend the best design.',
  question: 'How many different rectangular prisms have the same volume?',
  takeaway: 'Different boxes can have the same volume. Any three whole numbers whose product is 24 make a box with volume 24: 1×1×24, 1×2×12, 1×3×8, 1×4×6, 2×2×6, and 2×3×4. Rotating a box does not make a new one.',
  vocab: [['Factor', 'A number that multiplies to make another number.'], ['Dimensions', 'The length, width, and height of a box.'], ['Systematic', 'Working in an organized order so you don\'t miss any.'], ['Cube', 'A box with all edges the same length.']],
  warmup: { style: 'Factor hunt', prompt: 'List as many as you can.', items: [['Factor pairs of 24', '1×24, 2×12, 3×8, 4×6.'], ['Is 2×3×4 the same box as 4×3×2?', 'Yes, just turned.'], ['Can a box with volume 24 be a cube?', 'No: 24 is not a cube number.']] },
  steps: [
    { tag: 'explore', title: 'First design', goal: { text: 'Make any box with volume 24 and save it.', check: { found: { gte: 1 } } } },
    { tag: 'test', title: 'Find them all', sheet: 1, strategy: 'Be systematic: start with length 1 and find all widths and heights, then length 2, and so on.', goal: { text: 'Find and save EVERY box design with volume 24.', check: { foundAll: true } },
      q: { type: 'num', q: 'How many different box designs have volume 24?', unit: 'designs', answer: 6 } },
    { tag: 'reason', title: 'Systematic list', sheet: 2, q: { type: 'order', q: 'Put the designs in a systematic order (smallest first dimension, then second).', items: ['1 × 1 × 24', '1 × 2 × 12', '1 × 3 × 8', '1 × 4 × 6', '2 × 2 × 6', '2 × 3 × 4'] } },
    { tag: 'reason', title: 'Cube check', sheet: 3, q: { type: 'mc', q: 'Why can\'t any box with volume 24 be a cube?', choices: ['No whole number × itself × itself = 24', 'Cubes are too small', 'Cubes can only hold 27'], answer: 0 } },
    { tag: 'apply', title: 'Recommend a design', sheet: 4, q: { type: 'mc', q: 'Which design uses the least cardboard (is the most compact)?', choices: ['2 × 3 × 4', '1 × 1 × 24', '1 × 2 × 12'], answer: 0, why: 'Shapes closer to a cube use less surface for the same volume. 1 × 1 × 24 is a long, skinny stick.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: volume 36', sheet: 5, q: { type: 'num', q: 'How many different boxes have volume 36?', unit: 'designs', answer: 8, work: true } },
    { tag: 'explain', title: 'Design memo', sheet: 6, q: { type: 'text', q: 'Explain how you know you found ALL the boxes with volume 24.', rows: 3, need: [{ words: ['order', 'system', 'organized', 'started with 1', 'list'], label: 'Describes a systematic method' }, { words: ['factor', 'multiply', 'product'], label: 'Uses factors' }] } }
  ]
});
