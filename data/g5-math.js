/* Grade 5 Math rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- Fractions ---------- */
{
  id: 'g5-math-pizza-lockdown', std: 'g5-math-fractions', format: 'escape',
  title: 'The Pizza Parlor Lockdown',
  tagline: 'Tony\'s Pizzeria locked its kitchen. Slice, add, and multiply fractions to get the ovens running.',
  story: '<p>It\'s Friday night at Tony\'s Pizzeria and 40 pizzas are on order, but the kitchen doors have locked themselves! Tony\'s new "smart kitchen" only opens for someone who can do fraction math.</p><p>Solve the five locks before the customers get hungry. <b>Tip:</b> you can type fractions like <b>3/4</b> and mixed numbers like <b>2 1/2</b>.</p>',
  code: 'SLICE',
  stages: [
    { title: 'Lock 1: Equivalent Slices', content: '<p>The first lock shows two pizzas the same size. One is cut into 4 equal slices, the other into 8.</p><p><b>Equivalent fractions</b> name the same amount. To make one, multiply (or divide) the numerator and denominator by the same number:</p><blockquote>3/4 = (3 × 2)/(4 × 2) = 6/8</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Which fraction is equivalent to 3/4?', choices: ['6/8', '3/8', '4/6', '6/4'], answer: 0 },
        { type: 'input', q: '2/3 = ?/12. What is the missing numerator?', answer: ['8'], hint: '3 × 4 = 12, so multiply the numerator by 4 too.' },
        { type: 'sort', q: 'Which fractions are equivalent to 1/2?', buckets: ['Equal to 1/2', 'Not equal to 1/2'], items: [['2/4', 0], ['5/10', 0], ['4/8', 0], ['2/3', 1], ['3/5', 1], ['5/8', 1]] }
      ] },
    { title: 'Lock 2: Adding Toppings', content: '<p>Tony covers <b>1/3</b> of a pizza with pepperoni and <b>1/4</b> with mushrooms. How much of the pizza has toppings?</p><p>To add fractions with <b>unlike denominators</b>, find a <b>common denominator</b> first. Thirds and fourths both fit into twelfths:</p><blockquote>1/3 = 4/12 and 1/4 = 3/12</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is the least common denominator of 1/3 and 1/4?', choices: ['12', '7', '4', '24'], answer: 0 },
        { type: 'input', q: '1/3 + 1/4 = ?', answer: ['7/12'], placeholder: 'e.g. 5/12', hint: '4/12 + 3/12' },
        { type: 'input', q: 'Another pizza is 2/5 cheese and 1/2 veggie. What fraction has toppings? (2/5 + 1/2)', answer: ['9/10'], hint: 'Use tenths: 2/5 = 4/10 and 1/2 = 5/10.' }
      ] },
    { title: 'Lock 3: Leftovers', content: '<p>Customers leave leftovers. To <b>subtract</b> fractions, use a common denominator, then subtract the numerators.</p><blockquote>5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2</blockquote>',
      puzzles: [
        { type: 'input', q: 'A table has 3/4 of a pizza left. They eat 2/3 of a whole pizza. How much is left? (3/4 − 2/3)', answer: ['1/12'], hint: 'Use twelfths: 9/12 − 8/12.' },
        { type: 'mc', q: 'Mia had 7/8 of a pizza. She ate 1/2 of a whole pizza. How much is left?', choices: ['3/8', '6/6', '1/4', '5/8'], answer: 0, hint: '1/2 = 4/8' },
        { type: 'input', q: '5/6 − 1/4 = ?', answer: ['7/12'], hint: 'Use twelfths: 10/12 − 3/12.' }
      ] },
    { title: 'Lock 4: Mixed Number Orders', content: '<p>Big orders use <b>mixed numbers</b>. Add or subtract the whole numbers and the fractions separately. If the fraction is more than 1, regroup it into a whole. If you can\'t subtract the fractions, trade 1 whole for fractional parts.</p><blockquote>3 1/4 − 1 3/4 → 2 5/4 − 1 3/4 = 1 2/4 = 1 1/2</blockquote>',
      puzzles: [
        { type: 'input', q: 'Tony uses 2 1/2 pounds of cheese on Friday and 1 3/4 pounds on Saturday. How many pounds in all?', answer: ['4 1/4', '17/4', '4.25'], placeholder: 'e.g. 3 1/2', hint: '2 2/4 + 1 3/4 = 3 5/4. Regroup 4/4 as 1 whole.' },
        { type: 'input', q: '5 1/3 − 2 2/3 = ?', answer: ['2 2/3', '8/3'], placeholder: 'e.g. 1 1/3', hint: 'Regroup: 5 1/3 = 4 4/3.' },
        { type: 'mc', q: 'Estimate: 3 7/8 + 2 1/10 is closest to...', choices: ['6', '5', '4', '7'], answer: 0, hint: '3 7/8 is almost 4, and 2 1/10 is almost 2.' }
      ] },
    { title: 'Lock 5: Delivery Math', content: '<p>To <b>multiply</b> fractions, multiply the numerators and multiply the denominators. No common denominator needed!</p><blockquote>2/3 × 3/4 = 6/12 = 1/2</blockquote><p>The word <b>"of"</b> often means multiply: 1/2 of 10 = 1/2 × 10 = 5.</p>',
      puzzles: [
        { type: 'input', q: '1/2 × 3/4 = ?', answer: ['3/8'] },
        { type: 'input', q: 'Tony has 12 delivery orders. 2/3 of them are going to Fort Wayne. How many orders is that?', answer: ['8'], hint: '12 ÷ 3 = 4, and 4 × 2 = 8' },
        { type: 'mc', q: 'Each pizza box needs 2/5 of a yard of tape. How much tape for 3 boxes?', choices: ['1 1/5 yards', '6/15 yard', '2/15 yard', '5/6 yard'], answer: 0, hint: '3 × 2/5 = 6/5' }
      ] }
  ],
  finale: '<p>The kitchen doors slide open and the ovens roar to life. All 40 pizzas go out on time. Tony hands you a slice (exactly 1/8 of a pizza) and a "Fraction Chef" apron. Buon appetito!</p>',
  exit: [
    { q: '1/2 + 1/5 = ?', choices: ['2/7', '7/10', '1/10', '2/10'], answer: 1 },
    { q: '2/3 × 1/4 = ?', choices: ['3/7', '2/12, or 1/6', '8/3', '3/12'], answer: 1 },
    { q: 'Jada ran 1 1/2 miles on Monday and 2 3/4 miles on Tuesday. How far did she run in all? Show your work.', answer: '4 1/4 miles (1 2/4 + 2 3/4 = 3 5/4 = 4 1/4).', lines: 4 }
  ]
},
{
  id: 'g5-math-fraction-trail', std: 'g5-math-fractions', format: 'quest',
  title: 'Fraction Trail Quest',
  tagline: 'Hike the Hoosier National Forest, adding and multiplying fractions of a mile to reach the summit.',
  story: '<p>Your scout troop is hiking the Hickory Ridge trails in the Hoosier National Forest. Trail signs show distances in fractions of a mile. Clear each level to reach the overlook at the top!</p><p><b>Tip:</b> type fractions like <b>7/10</b> and mixed numbers like <b>2 7/12</b>.</p>',
  code: 'TRAIL',
  stages: [
    { title: 'Level 1: Benchmark Trailhead', content: '<p>Good hikers estimate before they calculate. Compare each fraction to the <b>benchmarks</b> 0, 1/2, and 1.</p><ul><li>A fraction is close to <b>0</b> when the numerator is very small compared to the denominator (1/9).</li><li>It is close to <b>1/2</b> when the numerator is about half the denominator (5/11).</li><li>It is close to <b>1</b> when the numerator is almost equal to the denominator (9/10).</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Which benchmark is each fraction closest to?', buckets: ['Close to 0', 'Close to 1/2', 'Close to 1'], items: [['1/8', 0], ['1/10', 0], ['5/10', 1], ['4/9', 1], ['7/8', 2], ['11/12', 2]] },
        { type: 'mc', q: 'Without calculating: is 3/8 + 4/9 more or less than 1?', choices: ['Less than 1, because both fractions are less than 1/2', 'More than 1', 'Exactly 1', 'Impossible to tell'], answer: 0 }
      ] },
    { title: 'Level 2: Trail Markers', content: '<p>Trail sign: <b>Creek: 3/10 mile. Waterfall: 2/5 mile past the creek.</b></p><p>Remember: rewrite fractions with a common denominator, then add the numerators. If the answer is more than 1, you can write it as a mixed number.</p>',
      puzzles: [
        { type: 'input', q: 'How far is it from the trailhead to the waterfall? (3/10 + 2/5)', answer: ['7/10'], hint: '2/5 = 4/10' },
        { type: 'input', q: '1/6 + 3/4 = ?', answer: ['11/12'], hint: 'Use twelfths: 2/12 + 9/12.' },
        { type: 'input', q: '2/3 + 5/6 = ? (You may answer as a mixed number.)', answer: ['1 1/2', '3/2', '9/6'], hint: '4/6 + 5/6 = 9/6' }
      ] },
    { title: 'Level 3: Uphill Subtraction', content: '<p>The Ridge Trail is <b>4 1/4 miles</b> long. Your troop has hiked <b>1 2/3 miles</b> so far.</p><blockquote>To subtract mixed numbers with unlike denominators: 1) find a common denominator, 2) regroup if needed, 3) subtract wholes and fractions.</blockquote>',
      puzzles: [
        { type: 'input', q: 'How much farther to the end of the Ridge Trail? (4 1/4 − 1 2/3)', answer: ['2 7/12', '31/12'], placeholder: 'e.g. 1 5/12', hint: '4 3/12 − 1 8/12. Regroup 4 3/12 as 3 15/12.' },
        { type: 'input', q: 'Your water bottle holds 7/8 liter. You drink 1/4 liter. How much is left?', answer: ['5/8'], hint: '1/4 = 2/8' },
        { type: 'mc', q: 'Which problem needs regrouping (trading a whole)?', choices: ['5 1/5 − 2 3/5', '5 3/5 − 2 1/5', '4 4/5 − 1 2/5', '3 2/5 − 1 1/5'], answer: 0, hint: 'You need to regroup when the first fraction is smaller than the one you subtract.' }
      ] },
    { title: 'Level 4: Campsite Multiplication', content: '<p>At the campsite, scouts split up tasks. Remember: multiplying by a fraction less than 1 gives a <b>smaller</b> answer than you started with.</p><blockquote>3/4 of 20 = 3/4 × 20 = 60/4 = 15</blockquote>',
      puzzles: [
        { type: 'input', q: '3/4 of the 20 scouts go swimming. How many scouts swim?', answer: ['15'] },
        { type: 'input', q: '2/3 × 3/5 = ?', answer: ['2/5', '6/15'], hint: 'Multiply the tops and multiply the bottoms, then simplify.' },
        { type: 'mc', q: 'Each scout drinks 3/4 of a liter of water at lunch. How much do 5 scouts drink?', choices: ['3 3/4 liters', '15/20 liter', '5 3/4 liters', '8/4 liters'], answer: 0, hint: '5 × 3/4 = 15/4' },
        { type: 'mc', q: 'Without calculating: is 7/8 × 16 more or less than 16?', choices: ['Less than 16', 'More than 16', 'Exactly 16', 'Exactly 7/8'], answer: 0 }
      ] },
    { title: 'Level 5: The Summit', content: '<p>You can see the overlook! These final problems take more than one step.</p>',
      puzzles: [
        { type: 'input', q: 'The summit trail is 3 miles. You hike 1 1/2 miles, rest, then hike 3/4 mile more. How far is left?', answer: ['3/4', '0.75'], hint: 'First add: 1 1/2 + 3/4 = 2 1/4. Then subtract from 3.' },
        { type: 'input', q: 'The campsite is a rectangle 3/4 mile long and 2/3 mile wide. What is its area in square miles?', answer: ['1/2', '6/12'], unit: 'sq mi', hint: 'Area = length × width' }
      ] }
  ],
  finale: '<p>You reach the overlook above the forest. The trees stretch for miles in every direction. Your troop leader tallies the day: 7 3/4 miles hiked and every fraction solved. Quest complete!</p>',
  exit: [
    { q: '3/8 + 1/4 = ?', choices: ['4/12', '5/8', '4/8', '1/2'], answer: 1 },
    { q: 'Which answer will be LESS than 12?', choices: ['12 × 3/2', '12 × 1', '12 × 5/6', '12 × 2'], answer: 2 },
    { q: 'A trail is 5 1/3 miles long. Leo has hiked 2 3/4 miles. How much farther does he have to go? Show your work.', answer: '2 7/12 miles (5 4/12 − 2 9/12 = 4 16/12 − 2 9/12 = 2 7/12).', lines: 4 }
  ]
},
{
  id: 'g5-math-bakery-mystery', std: 'g5-math-fractions', format: 'mystery',
  title: 'The Bakery Recipe Mystery',
  tagline: 'Someone sabotaged the prize-winning cookie recipe. Use fraction math to find the mistakes.',
  story: '<p>Sweet Hoosier Bakery\'s famous cookies won first place at the Indiana State Fair. But this week, every batch has come out wrong. The owner, Ms. Bell, thinks someone has been making fraction mistakes on purpose.</p><p>Examine each evidence file and do the math. <b>Tip:</b> type mixed numbers like <b>2 11/12</b>.</p>',
  code: 'FLOUR',
  stages: [
    { title: 'Evidence File #1: The Original Recipe', content: '<div class="tablewrap"><table><tr><th>Ingredient</th><th>Amount</th></tr><tr><td>Flour</td><td>2 1/4 cups</td></tr><tr><td>Sugar</td><td>3/4 cup</td></tr><tr><td>Butter</td><td>1/2 cup</td></tr><tr><td>Milk</td><td>2/3 cup</td></tr><tr><td>Chocolate chips</td><td>1 1/3 cups</td></tr></table></div><p>This is the prize-winning recipe for one batch of 24 cookies.</p>',
      puzzles: [
        { type: 'input', q: 'How many cups of sugar and butter are in the recipe altogether?', answer: ['1 1/4', '5/4', '1.25'], hint: '3/4 + 2/4' },
        { type: 'input', q: 'How many cups of flour and milk altogether?', answer: ['2 11/12', '35/12'], hint: '2 3/12 + 8/12' }
      ] },
    { title: 'Evidence File #2: The Double Batch', content: '<p>For the State Fair, Ms. Bell made a <b>double batch</b> (2 × every ingredient). Her assistant wrote down these amounts:</p><ul><li>Flour: 4 1/2 cups</li><li>Milk: 4/6 cup</li><li>Chocolate chips: 2 2/3 cups</li></ul><p><b>Detective note:</b> One of these is wrong.</p>',
      puzzles: [
        { type: 'input', q: 'What is the correct amount of milk for a double batch? (2 × 2/3)', answer: ['1 1/3', '4/3'], hint: '2 × 2/3 = 4/3' },
        { type: 'mc', q: 'What mistake did the assistant make with the milk?', choices: ['Multiplied both the numerator and the denominator by 2', 'Added 2/3 + 2/3 correctly', 'Used the flour amount', 'Forgot the milk'], answer: 0, explain: '4/6 is equal to 2/3, so the assistant didn\'t double the milk at all. Multiply only the numerator: 2 × 2/3 = 4/3.' },
        { type: 'tf', q: 'True or false: 4 1/2 cups of flour is correct for a double batch.', answer: true, explain: '2 × 2 1/4 = 4 2/4 = 4 1/2' }
      ] },
    { title: 'Evidence File #3: The Half Batch', content: '<p>On Tuesday, the bakery made a <b>half batch</b> (1/2 × every ingredient). The cookies came out flat and runny.</p><p><b>Tuesday\'s notes:</b> Sugar 3/8 cup. Flour 1 1/2 cups. Butter 1/4 cup.</p>',
      puzzles: [
        { type: 'input', q: 'What is the correct amount of flour for a half batch? (1/2 × 2 1/4)', answer: ['1 1/8', '9/8'], hint: '2 1/4 = 9/4, and 1/2 × 9/4 = 9/8' },
        { type: 'mc', q: 'Which of Tuesday\'s amounts was wrong?', choices: ['Flour', 'Sugar', 'Butter', 'None of them'], answer: 0, hint: 'Check: 1/2 × 3/4 = 3/8 and 1/2 × 1/2 = 1/4.' }
      ] },
    { title: 'Evidence File #4: The Suspicious Cocoa', content: '<p>A sticky note in the trash says:</p><blockquote>"Cocoa: 1/3 cup + 1/6 cup = 2/9 cup"</blockquote><p>Another note says: <i>"Vanilla: 3/5 teaspoon − 1/2 teaspoon = 2/3 teaspoon."</i></p>',
      puzzles: [
        { type: 'mc', q: 'What mistake was made on the cocoa note?', choices: ['Added the numerators and added the denominators', 'Used a common denominator correctly', 'Multiplied instead of added', 'There is no mistake'], answer: 0 },
        { type: 'input', q: 'What is the correct answer to 1/3 + 1/6?', answer: ['1/2', '3/6'], hint: '1/3 = 2/6' },
        { type: 'input', q: 'What is the correct answer to 3/5 − 1/2?', answer: ['1/10'], hint: 'Use tenths: 6/10 − 5/10.' }
      ] },
    { title: 'Evidence File #5: The Final Count', content: '<p>Ms. Bell checks her supplies to catch the saboteur. She started the week with a <b>5-cup</b> bag of flour. The recipe cards say she used <b>2 1/4 cups</b> on Monday and <b>1 1/2 cups</b> on Wednesday.</p><p>She also baked 12 cookies for a party. 2/3 of them were chocolate chip.</p>',
      puzzles: [
        { type: 'input', q: 'How much flour should be left in the bag?', answer: ['1 1/4', '5/4', '1.25'], hint: '2 1/4 + 1 1/2 = 3 3/4. Then 5 − 3 3/4.' },
        { type: 'input', q: 'How many of the 12 party cookies were chocolate chip?', answer: ['8'] }
      ] }
  ],
  finale: '<p>Mystery solved! It wasn\'t sabotage after all. A new assistant kept adding numerators and denominators and multiplying the wrong parts. Ms. Bell gives a quick fraction lesson (just like yours), and the next batch comes out perfect.</p>',
  exit: [
    { q: 'A recipe needs 3/4 cup of sugar. How much for a half batch?', choices: ['3/8 cup', '3/2 cups', '1/4 cup', '6/8 cup'], answer: 0 },
    { q: 'Which is the correct way to find 1/4 + 2/3?', choices: ['3/7', '3/12 + 8/12 = 11/12', '2/12', '1/4 × 2/3'], answer: 1 },
    { q: 'A student says 2/5 + 1/5 = 3/10. Explain the mistake and give the correct answer.', answer: 'They added the denominators. The denominators are already the same (fifths), so only add the numerators: 2/5 + 1/5 = 3/5.', lines: 3 }
  ]
},

/* ---------- Decimals ---------- */
{
  id: 'g5-math-speedway-trip', std: 'g5-math-decimals', format: 'fieldtrip',
  title: 'Speedway Decimal Field Trip',
  tagline: 'Tour the Indianapolis Motor Speedway, where races are won by thousandths of a second.',
  story: '<p>Welcome to the Indianapolis Motor Speedway, home of the Indy 500! At the Speedway, a race can be decided by a few <b>thousandths</b> of a second. Your guide will take you through five stops where decimals matter.</p><p class="note">The numbers in this trip are examples made for practice.</p>',
  code: 'SPEED',
  stages: [
    { title: 'Stop 1: The Timing Tower', content: '<p>The timing tower shows lap times to the <b>thousandths</b> of a second. Today\'s fastest lap: <b>40.582 seconds</b>.</p><div class="tablewrap"><table><tr><th>Tens</th><th>Ones</th><th>.</th><th>Tenths</th><th>Hundredths</th><th>Thousandths</th></tr><tr><td>4</td><td>0</td><td>.</td><td>5</td><td>8</td><td>2</td></tr></table></div><p>Each place is <b>10 times</b> the value of the place to its right.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the value of the 8 in 40.582?', choices: ['8 hundredths (0.08)', '8 tenths (0.8)', '8 thousandths (0.008)', '8 ones'], answer: 0 },
        { type: 'input', q: 'Complete the expanded form: 40.582 = 40 + 0.5 + 0.08 + ___', answer: ['0.002', '.002'] },
        { type: 'mc', q: 'How do you say 40.582 in words?', choices: ['Forty and five hundred eighty-two thousandths', 'Forty and five hundred eighty-two hundredths', 'Four hundred five and eighty-two', 'Forty point five eight two tenths'], answer: 0 }
      ] },
    { title: 'Stop 2: Qualifying Day', content: '<p>Drivers qualify by average speed in miles per hour. Here are four qualifying speeds:</p><ul><li>Car 12: <b>232.790</b> mph</li><li>Car 5: <b>232.709</b> mph</li><li>Car 27: <b>232.97</b> mph</li><li>Car 8: <b>232.079</b> mph</li></ul><p>To compare decimals, line up the decimal points and compare digits from left to right. You can add zeros to the end without changing the value: 232.97 = 232.970.</p>',
      puzzles: [
        { type: 'order', q: 'Order the speeds from fastest to slowest.', items: ['232.97 (Car 27)', '232.790 (Car 12)', '232.709 (Car 5)', '232.079 (Car 8)'], hint: 'Write them all with three decimal places, then compare.' },
        { type: 'mc', q: 'Which symbol makes this true? 0.45 ___ 0.5', choices: ['<', '>', '='], answer: 0, hint: '0.5 = 0.50' }
      ] },
    { title: 'Stop 3: The Scoreboard', content: '<p>The big scoreboard rounds numbers so fans can read them quickly. To round, look at the digit just to the <b>right</b> of the place you are rounding to. If it is 5 or more, round up. If it is 4 or less, keep the digit the same.</p><blockquote>40.582 → nearest tenth: look at the 8 → round up → 40.6</blockquote>',
      puzzles: [
        { type: 'input', q: 'Round 40.582 to the nearest hundredth.', answer: ['40.58'] },
        { type: 'input', q: 'Round 229.463 to the nearest whole number.', answer: ['229'] },
        { type: 'input', q: 'Round 38.951 to the nearest tenth.', answer: ['39.0', '39'], hint: 'The hundredths digit is 5, so the 9 tenths rounds up to 10 tenths.' }
      ] },
    { title: 'Stop 4: Pit Road', content: '<p>On pit road, crews change tires and add fuel in seconds. To add and subtract decimals, <b>line up the decimal points</b>. Add zeros as placeholders if you need them.</p><blockquote>&nbsp;&nbsp;8.75<br>+ 9.30<br>———<br>&nbsp;18.05</blockquote>',
      puzzles: [
        { type: 'input', q: 'A car makes two pit stops: 8.75 seconds and 9.3 seconds. What is the total time?', answer: ['18.05'], unit: 'seconds' },
        { type: 'input', q: 'Driver A\'s lap was 41.26 seconds. Driver B\'s was 39.8 seconds. How much faster was Driver B?', answer: ['1.46'], unit: 'seconds', hint: '41.26 − 39.80' },
        { type: 'mc', q: 'Which is the correct way to line up 12.5 + 3.47?', choices: ['Line up the decimal points: 12.50 + 3.47', 'Line up the last digits on the right', 'Line up the first digits on the left', 'Ignore the decimal points'], answer: 0 }
      ] },
    { title: 'Stop 5: The Garage', content: '<p>In the garage, engineers multiply and divide decimals.</p><ul><li><b>Multiply</b> as if they are whole numbers, then count the total decimal places in the factors: 0.4 × 6 = 2.4.</li><li><b>Multiply by 10, 100, or 1,000</b>: each digit moves 1, 2, or 3 places to the left.</li><li><b>Divide</b> a decimal by a whole number: put the decimal point in the answer straight above the one in the dividend.</li></ul>',
      puzzles: [
        { type: 'input', q: 'A model race car uses 0.4 liters of fuel per lap. How much fuel for 6 laps?', answer: ['2.4'], unit: 'liters' },
        { type: 'input', q: 'A 12.6-mile practice run is split into 3 equal parts. How long is each part?', answer: ['4.2'], unit: 'miles' },
        { type: 'mc', q: '0.36 × 10 = ?', choices: ['3.6', '0.036', '36', '0.36'], answer: 0 }
      ] }
  ],
  finale: '<p>At the end of the tour you get to "kiss the bricks," the famous yard of bricks at the finish line. Your guide says, "At the Speedway, a thousandth of a second can be the difference between first and second place. Now you know how to read it."</p>',
  exit: [
    { q: 'Which number is greatest?', choices: ['0.609', '0.69', '0.6', '0.096'], answer: 1 },
    { q: 'Round 7.846 to the nearest tenth.', choices: ['7.8', '7.9', '7.85', '8'], answer: 0 },
    { q: 'Explain how to find 3.6 × 0.4. Then give the product.', answer: 'Multiply 36 × 4 = 144. There are 2 decimal places in all, so the product is 1.44. (Estimate: about 4 × 0.4 = 1.6.)', lines: 3 }
  ]
},
{
  id: 'g5-math-bank-vault', std: 'g5-math-decimals', format: 'escape',
  title: 'Bank Vault Breakout',
  tagline: 'You\'re locked inside the First Crossroads Bank vault. Count, add, and split money to escape.',
  story: '<p>You were on a class tour of the First Crossroads Bank when the vault door swung shut behind you! The bank manager\'s voice comes through the speaker: "Don\'t panic. The vault opens for anyone who can handle money math. Every dollar amount is a decimal!"</p>',
  code: 'CENTS',
  stages: [
    { title: 'Lock 1: Counting Coins', content: '<p>Money is written with two decimal places. Each place has a value:</p><ul><li><b>Ones</b> place = dollars</li><li><b>Tenths</b> place = dimes (1 dime = $0.10)</li><li><b>Hundredths</b> place = pennies (1 penny = $0.01)</li></ul><blockquote>$3.47 = 3 dollars + 4 dimes + 7 pennies = 3 + 0.4 + 0.07</blockquote>',
      puzzles: [
        { type: 'input', q: 'Write 4 dimes and 3 pennies as a decimal of a dollar.', answer: ['0.43', '.43'], placeholder: 'e.g. 0.25' },
        { type: 'mc', q: 'In $6.58, what is the value of the 5?', choices: ['5 tenths, or 50 cents', '5 hundredths, or 5 cents', '5 dollars', '5 thousandths'], answer: 0 },
        { type: 'input', q: '2 dollars, 9 dimes, and 6 pennies = $___', answer: ['2.96'] }
      ] },
    { title: 'Lock 2: Deposits', content: '<p>The deposit machine is jammed. Add these deposits by lining up the decimal points.</p><blockquote>Tip: $12.99 + $4.05 + $0.96: add the cents first, then regroup.</blockquote>',
      puzzles: [
        { type: 'input', q: '$125.50 + $38.75 = $___', answer: ['164.25'] },
        { type: 'input', q: '$12.99 + $4.05 + $0.96 = $___', answer: ['18.00', '18'] }
      ] },
    { title: 'Lock 3: Withdrawals', content: '<p>Now subtract the withdrawals. When there aren\'t enough cents, regroup from the dollars.</p><blockquote>$10.00 − $3.45: regroup 1 dollar as 10 dimes, and 1 dime as 10 pennies.</blockquote>',
      puzzles: [
        { type: 'input', q: '$200.00 − $57.38 = $___', answer: ['142.62'] },
        { type: 'input', q: 'You pay for a $3.45 snack with a $10 bill. How much change do you get?', answer: ['6.55'] },
        { type: 'mc', q: 'Estimate: $49.87 − $19.95 is about...', choices: ['$30', '$70', '$20', '$40'], answer: 0 }
      ] },
    { title: 'Lock 4: The Gift Shop Receipt', content: '<p>The bank gift shop left a receipt in the vault. To multiply decimals: multiply as whole numbers, then count the decimal places in both factors.</p><blockquote>4.2 × 0.3 → 42 × 3 = 126 → 2 decimal places → 1.26</blockquote>',
      puzzles: [
        { type: 'input', q: '3 notebooks cost $1.25 each. What is the total?', answer: ['3.75'] },
        { type: 'input', q: 'A $18.40 T-shirt is half price (× 0.5). What is the sale price?', answer: ['9.20', '9.2'] },
        { type: 'input', q: '4.2 × 0.3 = ?', answer: ['1.26'] }
      ] },
    { title: 'Lock 5: Split the Treasure', content: '<p>The last lock is on a treasure chest of coins. The class must split it fairly. When dividing a decimal by a whole number, the decimal point goes straight up into the quotient.</p><blockquote>45.60 ÷ 4: 4 goes into 45 eleven times with 1 left; 16 ÷ 4 = 4; 0 ÷ 4 = 0 → 11.40</blockquote>',
      puzzles: [
        { type: 'input', q: '$45.60 is shared equally by 4 students. How much does each get?', answer: ['11.40', '11.4'] },
        { type: 'input', q: '$7.20 buys pencils that cost $0.90 each. How many pencils? (7.2 ÷ 0.9)', answer: ['8'], hint: 'How many groups of 0.9 fit in 7.2? Try 72 ÷ 9.' },
        { type: 'input', q: 'Round $14.678 to the nearest cent (hundredth).', answer: ['14.68'] }
      ] }
  ],
  finale: '<p>The vault door swings open with a hiss. The bank manager applauds. "You counted, deposited, withdrew, and split money perfectly. Want a summer job?" You walk out $0.00 richer but a lot smarter.</p>',
  exit: [
    { q: '$15.60 + $7.85 = ?', choices: ['$22.45', '$23.45', '$22.35', '$8.75'], answer: 1 },
    { q: '0.6 × 0.4 = ?', choices: ['2.4', '0.24', '0.024', '24'], answer: 1 },
    { q: 'Three friends share $13.50 equally. How much does each friend get? Show or explain your work.', answer: '$4.50 each (13.50 ÷ 3 = 4.50).', lines: 3 }
  ]
},
{
  id: 'g5-math-place-value-museum', std: 'g5-math-decimals', format: 'gallery',
  title: 'The Place Value Museum',
  tagline: 'Wander five exhibits on powers of ten, base-ten blocks, number lines, and rounding.',
  story: '<p>Welcome to the <b>Place Value Museum</b>, where every exhibit is about the tiny places to the right of the decimal point. Visit the exhibits in any order. Each one hides a letter of the museum\'s secret word.</p>',
  code: 'TENTH',
  stages: [
    { title: 'The Powers of Ten Hall', content: '<h3>Placard</h3><p>Our number system is based on ten. Each place is <b>10 times</b> the place to its right and <b>1/10</b> of the place to its left.</p><ul><li>Multiply by 10: digits move <b>1</b> place left (3.6 × 10 = 36).</li><li>Multiply by 100: digits move <b>2</b> places left.</li><li>Divide by 10: digits move <b>1</b> place right (36 ÷ 10 = 3.6).</li><li>Divide by 1,000: digits move <b>3</b> places right.</li></ul>',
      puzzles: [
        { type: 'input', q: '3.6 × 100 = ?', answer: ['360'] },
        { type: 'input', q: '45 ÷ 1,000 = ?', answer: ['0.045', '.045'] },
        { type: 'input', q: '0.72 × 10 = ?', answer: ['7.2'] },
        { type: 'mc', q: 'The 4 in 0.4 is how many times the value of the 4 in 0.04?', choices: ['10 times', '100 times', '1/10', 'The same'], answer: 0 }
      ] },
    { title: 'The Base-Ten Block Room', content: '<h3>Placard</h3><p>In this room, a <b>flat</b> (a 10 × 10 square) represents <b>1 whole</b>.</p><ul><li>A <b>rod</b> (a strip of 10) represents <b>1 tenth</b> (0.1).</li><li>A <b>unit</b> (one small cube) represents <b>1 hundredth</b> (0.01).</li></ul><p>On the display table: <b>2 flats, 3 rods, and 5 units</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What decimal is shown on the display table?', answer: ['2.35'] },
        { type: 'mc', q: 'How many units (hundredths) make one rod (tenth)?', choices: ['10', '100', '1', '1,000'], answer: 0 }
      ] },
    { title: 'The Number Line Walkway', content: '<h3>Placard</h3><p>The floor of this walkway is a giant number line from <b>0.6 to 0.7</b>, with 10 equal steps between them. Each step is <b>one hundredth</b>.</p><p>A red footprint sits on the <b>6th step</b> after 0.6.</p>',
      puzzles: [
        { type: 'input', q: 'What number is the red footprint on?', answer: ['0.66', '.66'] },
        { type: 'mc', q: 'Which number is between 1.4 and 1.5?', choices: ['1.45', '1.54', '1.04', '1.5'], answer: 0 }
      ] },
    { title: 'The Comparison Gallery', content: '<h3>Placard</h3><p>To compare decimals, line up the decimal points. Compare the tenths first, then the hundredths, then the thousandths. A longer decimal is <b>not</b> always bigger: 0.5 > 0.405.</p>',
      puzzles: [
        { type: 'sort', q: 'Is each number less than or greater than 0.5?', buckets: ['Less than 0.5', 'Greater than 0.5'], items: [['0.45', 0], ['0.405', 0], ['0.499', 0], ['0.55', 1], ['0.505', 1], ['0.6', 1]] },
        { type: 'order', q: 'Order from least to greatest.', items: ['0.09', '0.19', '0.9', '0.91'] }
      ] },
    { title: 'The Rounding Room', content: '<h3>Placard</h3><p>Rounding makes numbers easier to use. Find the place you are rounding to, then look one place to the right: <b>5 or more</b> rounds up; <b>4 or less</b> stays the same.</p><blockquote>7.846 → nearest tenth → 7.8 (the 4 means stay)<br>7.846 → nearest hundredth → 7.85 (the 6 means round up)</blockquote>',
      puzzles: [
        { type: 'input', q: 'Round 3.172 to the nearest tenth.', answer: ['3.2'] },
        { type: 'input', q: 'Round 12.349 to the nearest hundredth.', answer: ['12.35'] },
        { type: 'mc', q: 'Which number rounds to 3.5 when rounded to the nearest tenth?', choices: ['3.46', '3.44', '3.56', '3.405'], answer: 0 }
      ] }
  ],
  finale: '<p>The museum curator stamps your ticket with the secret word: <b>TENTH</b>. "Every place to the right of the decimal is ten times smaller than the one before it," she says. "You\'re officially a place value expert."</p>',
  exit: [
    { q: 'What is 5.2 × 1,000?', choices: ['52', '520', '5,200', '0.0052'], answer: 2 },
    { q: 'Which decimal is shown by 1 flat, 4 rods, and 7 units (flat = 1)?', choices: ['14.7', '1.47', '0.147', '147'], answer: 1 },
    { q: 'Sam says 0.35 is greater than 0.4 because 35 is greater than 4. Is Sam correct? Explain.', answer: 'No. Compare tenths first: 0.4 has 4 tenths and 0.35 has 3 tenths, so 0.4 is greater (0.40 > 0.35).', lines: 3 }
  ]
},

/* ---------- Volume ---------- */
{
  id: 'g5-math-shipping-escape', std: 'g5-math-volume', format: 'escape',
  title: 'The Shipping Container Escape',
  tagline: 'Trapped in a warehouse, you must pack, measure, and calculate volume to reach the loading dock.',
  story: '<p>You are touring a giant shipping warehouse in Plainfield, Indiana, when the security system locks down. The only way out is through five locked shipping containers. Each lock asks you to find a <b>volume</b>: the amount of space inside a 3-D shape, measured in <b>cubic units</b>.</p>',
  code: 'CUBES',
  stages: [
    { title: 'Container 1: Unit Cubes', content: '<p>The first container is filled with 1-centimeter cubes. Each cube has a volume of <b>1 cubic centimeter (1 cm³)</b>.</p><p>The cubes are arranged in a box that is <b>4 cubes long, 3 cubes wide, and 2 cubes tall</b>.</p><p>Volume counts how many unit cubes fill the space, with no gaps or overlaps.</p>',
      puzzles: [
        { type: 'input', q: 'How many cubes are in the bottom layer?', answer: ['12'], hint: '4 × 3' },
        { type: 'input', q: 'What is the volume of the box?', answer: ['24'], unit: 'cm³', hint: '2 layers of 12 cubes' },
        { type: 'mc', q: 'What does volume measure?', choices: ['The amount of space inside a 3-D figure', 'The distance around a shape', 'The flat surface of a shape', 'How heavy something is'], answer: 0 }
      ] },
    { title: 'Container 2: The Formula', content: '<p>Counting cubes takes too long for big boxes. Use the formula:</p><blockquote><b>V = l × w × h</b> (volume = length × width × height)</blockquote><p>A crate on the shelf is <b>6 cm long, 5 cm wide, and 4 cm tall</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What is the volume of the crate?', answer: ['120'], unit: 'cm³' },
        { type: 'input', q: 'A box is 9 inches long, 2 inches wide, and 3 inches tall. What is its volume?', answer: ['54'], unit: 'in³' },
        { type: 'sort', q: 'Sort the units.', buckets: ['Measures area (2-D)', 'Measures volume (3-D)'], items: [['square feet (ft²)', 0], ['square cm (cm²)', 0], ['cubic feet (ft³)', 1], ['cubic inches (in³)', 1], ['cubic meters (m³)', 1]] }
      ] },
    { title: 'Container 3: Base Times Height', content: '<p>Another formula for volume is:</p><blockquote><b>V = B × h</b>, where <b>B</b> is the area of the base (length × width).</blockquote><p>It\'s the same idea: the base tells how many cubes are in one layer, and the height tells how many layers.</p>',
      puzzles: [
        { type: 'input', q: 'A box has a base area of 36 square inches and a height of 5 inches. What is its volume?', answer: ['180'], unit: 'in³' },
        { type: 'input', q: 'A box\'s base is 7 feet by 4 feet, and it is 10 feet tall. What is its volume?', answer: ['280'], unit: 'ft³', hint: 'B = 7 × 4 = 28' }
      ] },
    { title: 'Container 4: The Missing Measurement', content: '<p>The shipping labels are smudged! You know the volume, but one measurement is missing. Work backward using division.</p><blockquote>If V = l × w × h, then h = V ÷ (l × w).</blockquote>',
      puzzles: [
        { type: 'input', q: 'A box has a volume of 96 cm³. It is 4 cm long and 4 cm wide. How tall is it?', answer: ['6'], unit: 'cm', hint: '4 × 4 = 16, and 96 ÷ 16 = ?' },
        { type: 'input', q: 'A box has a volume of 60 ft³ and a base area of 15 ft². What is its height?', answer: ['4'], unit: 'ft' }
      ] },
    { title: 'Container 5: The Loading Dock', content: '<p>The loading dock is shaped like two rectangular prisms joined together, called a <b>composite figure</b>.</p><ul><li><b>Part A</b>: 5 m long, 3 m wide, 2 m tall.</li><li><b>Part B</b>: 2 m long, 3 m wide, 4 m tall.</li></ul><p>To find the volume of a composite figure, find the volume of each part, then <b>add</b>.</p>',
      puzzles: [
        { type: 'input', q: 'What is the volume of Part A?', answer: ['30'], unit: 'm³' },
        { type: 'input', q: 'What is the volume of Part B?', answer: ['24'], unit: 'm³' },
        { type: 'input', q: 'What is the total volume of the loading dock?', answer: ['54'], unit: 'm³' }
      ] }
  ],
  finale: '<p>The loading dock door rolls up and sunlight pours in. A forklift driver waves. "Nobody has ever packed their way out of here before!" You measured every container in cubic units and escaped.</p>',
  exit: [
    { q: 'A box is 5 in long, 2 in wide, and 3 in tall. What is its volume?', choices: ['10 in³', '30 in³', '25 in³', '15 in³'], answer: 1 },
    { q: 'Which unit could measure the volume of a swimming pool?', choices: ['Meters', 'Square meters', 'Cubic meters', 'Kilograms'], answer: 2 },
    { q: 'A composite figure is made of a 4 × 2 × 3 prism and a 2 × 2 × 2 prism. Find the total volume and explain your steps.', answer: '24 + 8 = 32 cubic units. Find each prism\'s volume (4 × 2 × 3 = 24 and 2 × 2 × 2 = 8), then add.', lines: 4 }
  ]
},
{
  id: 'g5-math-aquarium-quest', std: 'g5-math-volume', format: 'quest',
  title: 'The Aquarium Builder Quest',
  tagline: 'Design tanks for the Indianapolis Zoo\'s new aquarium, one layer of cubes at a time.',
  story: '<p>The zoo is building a new aquarium, and you are the junior tank designer! Every tank must hold the right amount of water for its animals. Clear five levels of volume challenges to earn your designer badge.</p>',
  code: 'LAYER',
  stages: [
    { title: 'Level 1: Layers', content: '<p>A test tank is being filled with 1-inch cubes. The bottom layer is <b>5 cubes long and 4 cubes wide</b>. The tank is <b>3 layers</b> tall.</p><p>Thinking in layers: <b>(cubes in one layer) × (number of layers) = volume</b>.</p>',
      puzzles: [
        { type: 'input', q: 'How many cubes are in one layer?', answer: ['20'] },
        { type: 'input', q: 'What is the volume of the test tank?', answer: ['60'], unit: 'in³' }
      ] },
    { title: 'Level 2: The Clownfish Tank', content: '<p>The clownfish tank is <b>30 cm long, 20 cm wide, and 25 cm tall</b>.</p><p>Fun fact: <b>1,000 cubic centimeters = 1 liter</b> of water.</p>',
      puzzles: [
        { type: 'input', q: 'What is the volume of the clownfish tank in cm³?', answer: ['15000', '15,000'], unit: 'cm³', hint: '30 × 20 = 600, and 600 × 25 = ?' },
        { type: 'input', q: 'How many liters of water does the tank hold?', answer: ['15'], unit: 'liters', hint: '15,000 ÷ 1,000' }
      ] },
    { title: 'Level 3: Which Tank Is Bigger?', content: '<p>Two tank designs are on the table:</p><ul><li><b>Tank A</b>: 40 cm × 20 cm × 20 cm</li><li><b>Tank B</b>: 30 cm × 30 cm × 20 cm</li></ul><p>The seahorses need the tank with more space.</p>',
      puzzles: [
        { type: 'input', q: 'What is the volume of Tank A?', answer: ['16000', '16,000'], unit: 'cm³' },
        { type: 'input', q: 'What is the volume of Tank B?', answer: ['18000', '18,000'], unit: 'cm³' },
        { type: 'mc', q: 'Which tank should the seahorses get, and how much more space does it have?', choices: ['Tank B, 2,000 cm³ more', 'Tank A, 2,000 cm³ more', 'Tank B, 200 cm³ more', 'They are the same'], answer: 0 }
      ] },
    { title: 'Level 4: Same Volume, Different Shape', content: '<p>The jellyfish exhibit needs a tank with a volume of exactly <b>24 cubic feet</b>, but the shape can be different. Many different boxes can have the same volume!</p>',
      puzzles: [
        { type: 'sort', q: 'Which tank dimensions have a volume of 24 ft³?', buckets: ['Volume is 24 ft³', 'Volume is not 24 ft³'], items: [['2 × 3 × 4', 0], ['1 × 4 × 6', 0], ['2 × 2 × 6', 0], ['3 × 3 × 3', 1], ['2 × 5 × 2', 1], ['4 × 4 × 2', 1]] },
        { type: 'mc', q: 'If you double only the height of a tank, what happens to its volume?', choices: ['It doubles', 'It stays the same', 'It is cut in half', 'It becomes 4 times bigger'], answer: 0 }
      ] },
    { title: 'Level 5: The Shark Tunnel', content: '<p>The final design is a shark exhibit made of two connected tanks (a composite figure):</p><ul><li><b>Main tank</b>: 10 m long, 5 m wide, 4 m deep.</li><li><b>Side tank</b>: 6 m long, 5 m wide, 4 m deep.</li></ul>',
      puzzles: [
        { type: 'input', q: 'What is the total volume of the shark exhibit?', answer: ['320'], unit: 'm³', hint: '(10 × 5 × 4) + (6 × 5 × 4)' },
        { type: 'mc', q: 'Why do you ADD the two volumes?', choices: ['The exhibit is made of both tanks together', 'Because the tanks are the same size', 'Because volume is always added', 'You should multiply them instead'], answer: 0 }
      ] }
  ],
  finale: '<p>The zoo director unrolls your blueprints and nods. "Every tank is the perfect size." On opening day, the sharks glide through the tunnel you designed. Quest complete, Designer!</p>',
  exit: [
    { q: 'A tank has 8 cubes in each layer and 5 layers. What is its volume?', choices: ['13 cubic units', '40 cubic units', '85 cubic units', '58 cubic units'], answer: 1 },
    { q: 'Which box does NOT have a volume of 36 cubic units?', choices: ['3 × 3 × 4', '2 × 3 × 6', '6 × 6 × 1', '4 × 4 × 2'], answer: 3 },
    { q: 'Explain why V = l × w × h gives the number of cubes that fill a box. Use the word "layer."', answer: 'l × w tells how many cubes fit in one layer on the bottom. h tells how many layers are stacked, so multiplying gives the total number of cubes.', lines: 3 }
  ]
},
{
  id: 'g5-math-stolen-sand', std: 'g5-math-volume', format: 'mystery',
  title: 'The Case of the Stolen Sand',
  tagline: 'Sand vanished from the park sandbox overnight. Use volume to figure out how much, and who could carry it.',
  story: '<p>Detective, we have a strange case at Riverside Park. Yesterday the sandbox was full. This morning, some of the sand is gone! The park ranger has collected evidence. Use volume to figure out how much sand was taken and which suspect could have taken it.</p>',
  code: 'BOXES',
  stages: [
    { title: 'Evidence File #1: The Sandbox', content: '<p><b>Park records:</b> The sandbox is a rectangular prism <b>6 feet long, 4 feet wide, and 1 foot deep</b>. It was filled to the top yesterday.</p><p><b>Ranger\'s note:</b> "This morning, only <b>18 cubic feet</b> of sand is left."</p>',
      puzzles: [
        { type: 'input', q: 'How much sand did the full sandbox hold?', answer: ['24'], unit: 'ft³' },
        { type: 'input', q: 'How many cubic feet of sand were taken?', answer: ['6'], unit: 'ft³' }
      ] },
    { title: 'Evidence File #2: The Sand Level', content: '<p>The ranger measured how deep the sand is now. The base of the sandbox is still 6 ft × 4 ft, and there are 18 ft³ of sand left.</p><p><b>Detective thinking:</b> Volume = base area × height, so height = volume ÷ base area.</p>',
      puzzles: [
        { type: 'input', q: 'What is the area of the sandbox base?', answer: ['24'], unit: 'ft²' },
        { type: 'input', q: 'How deep is the sand now, in feet? (You may use a fraction or decimal.)', answer: ['3/4', '0.75'], unit: 'ft', hint: '18 ÷ 24' },
        { type: 'mc', q: 'Is 3/4 of a foot deeper or shallower than it was yesterday?', choices: ['Shallower, because yesterday it was 1 foot deep', 'Deeper', 'The same depth', 'Impossible to know'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Suspects\' Containers', content: '<p>Three suspects were seen in the park last night, each with a container:</p><ul><li><b>Suspect A</b>, the gardener: a wheelbarrow bin, 2 ft × 2 ft × 1 ft</li><li><b>Suspect B</b>, the builder: a wagon, 3 ft × 2 ft × 1 ft</li><li><b>Suspect C</b>, the artist: a tall barrel shaped like a box, 1 ft × 1 ft × 5 ft</li></ul><p>The thief carried away all the missing sand in one trip, filling their container exactly to the top.</p>',
      puzzles: [
        { type: 'match', q: 'Match each suspect to the volume of their container.', pairs: [['Suspect A (gardener)', '4 ft³'], ['Suspect B (builder)', '6 ft³'], ['Suspect C (artist)', '5 ft³']] },
        { type: 'mc', q: 'Which suspect\'s container holds exactly the missing sand?', choices: ['Suspect B, the builder', 'Suspect A, the gardener', 'Suspect C, the artist', 'None of them'], answer: 0 }
      ] },
    { title: 'Evidence File #4: The Builder\'s Garage', content: '<p>In the builder\'s garage, the detective finds a new garden bed shaped like an <b>L</b>. It is made of two rectangular prisms:</p><ul><li><b>Part 1</b>: 3 ft × 1 ft × 1 ft</li><li><b>Part 2</b>: 3 ft × 1 ft × 1 ft</li></ul><p>It is filled with sand.</p>',
      puzzles: [
        { type: 'input', q: 'What is the total volume of the L-shaped garden bed?', answer: ['6'], unit: 'ft³' },
        { type: 'mc', q: 'What does this evidence show?', choices: ['The garden bed holds exactly the amount of missing sand', 'The builder has more sand than was stolen', 'The garden bed is empty', 'The sandbox was never full'], answer: 0 }
      ] },
    { title: 'Evidence File #5: Returning the Sand', content: '<p>The builder confesses: "I only borrowed it for my garden! I\'ll return it." To refill the sandbox, the park will use buckets that each hold <b>2 cubic feet</b> of sand.</p><p>The park also plans a second sandbox that is <b>8 ft × 5 ft × 1 ft</b>.</p>',
      puzzles: [
        { type: 'input', q: 'How many 2-cubic-foot buckets are needed to return 6 ft³ of sand?', answer: ['3'], unit: 'buckets' },
        { type: 'input', q: 'What will the volume of the new sandbox be?', answer: ['40'], unit: 'ft³' },
        { type: 'mc', q: 'How much MORE sand will the new sandbox hold than the old one (24 ft³)?', choices: ['16 ft³', '64 ft³', '14 ft³', '40 ft³'], answer: 0 }
      ] }
  ],
  finale: '<p>Case closed! The sandbox is full again, the builder apologizes, and the park ranger thanks you. "I never thought math could solve a crime," she says. "But volume told us exactly how much was missing and who could have carried it."</p>',
  exit: [
    { q: 'A sandbox is 5 ft × 3 ft × 2 ft. What is its volume?', choices: ['10 ft³', '15 ft³', '30 ft³', '25 ft³'], answer: 2 },
    { q: 'A box has a volume of 40 cm³ and a base area of 10 cm². What is its height?', choices: ['4 cm', '30 cm', '400 cm', '50 cm'], answer: 0 },
    { q: 'Explain how you would find the volume of an L-shaped figure made of two rectangular prisms.', answer: 'Split the figure into two rectangular prisms, find each volume with l × w × h, then add the two volumes together.', lines: 3 }
  ]
}
);
