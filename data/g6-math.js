/* Grade 6 Math rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- Ratios, Rates & Percents ---------- */
{
  id: 'g6-math-smoothie-lockdown', std: 'g6-math-ratios', format: 'escape',
  title: 'The Smoothie Shop Lockdown',
  tagline: 'The blenders are locked until you master ratios, unit rates, and percents.',
  story: '<p>You just started your summer job at <b>Blend It!</b>, the busiest smoothie shop on Mass Ave in Indianapolis. On your first morning, the new smart register locks every blender. A message flashes: <b>"Ratio check required."</b></p><p>Solve five locks before the lunch rush!</p>',
  code: 'RATIO',
  stages: [
    { title: 'Lock 1: Ratio Language', content: '<p>The famous Strawberry Splash recipe uses <b>3 cups of strawberries for every 2 cups of yogurt</b>.</p><p>A <b>ratio</b> compares two quantities. You can write it three ways: <b>3 to 2</b>, <b>3:2</b>, or <b>3/2</b>. Order matters! Strawberries to yogurt is 3:2, but yogurt to strawberries is 2:3.</p><p>A <b>part-to-whole</b> ratio compares one part to the total: strawberries are 3 of the 5 total cups.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the ratio of yogurt to strawberries?', choices: ['2:3', '3:2', '2:5', '5:3'], answer: 0 },
        { type: 'mc', q: 'What fraction of the smoothie is strawberries?', choices: ['3/5', '3/2', '2/5', '2/3'], answer: 0 },
        { type: 'input', q: 'The shop has 12 boys and 16 girls on its summer team. Write the ratio of boys to girls in simplest form (like 1:2).', answer: ['3:4', '3 to 4'], placeholder: 'e.g. 1:2' }
      ] },
    { title: 'Lock 2: The Recipe Table', content: '<p>To make bigger batches, keep the ratio the same by <b>multiplying both quantities</b> by the same number.</p><div class="tablewrap"><table><tr><th>Strawberries (cups)</th><td>3</td><td>6</td><td>9</td><td>?</td></tr><tr><th>Yogurt (cups)</th><td>2</td><td>4</td><td>?</td><td>10</td></tr></table></div>',
      puzzles: [
        { type: 'input', q: 'How many cups of yogurt go with 9 cups of strawberries?', answer: ['6'], unit: 'cups' },
        { type: 'input', q: 'How many cups of strawberries go with 10 cups of yogurt?', answer: ['15'], unit: 'cups' },
        { type: 'mc', q: 'Which ratio is NOT equivalent to 3:2?', choices: ['5:4', '6:4', '12:8', '15:10'], answer: 0, hint: 'Equivalent ratios come from multiplying both numbers by the same factor.' }
      ] },
    { title: 'Lock 3: Unit Rates', content: '<p>A <b>unit rate</b> tells how much for <b>one</b> unit: dollars per smoothie, miles per hour, ounces per dollar. To find it, divide.</p><blockquote>4 smoothies for $18 → $18 ÷ 4 = <b>$4.50 per smoothie</b></blockquote>',
      puzzles: [
        { type: 'input', q: 'A family buys 4 smoothies for $18. What is the price per smoothie?', answer: ['4.50', '4.5'], unit: 'dollars' },
        { type: 'mc', q: 'Which is the better deal?', choices: ['24 oz for $5.40', '16 oz for $4.00', 'They cost the same per ounce', 'Impossible to tell'], answer: 0, hint: 'Find the price per ounce: $4.00 ÷ 16 and $5.40 ÷ 24.' },
        { type: 'input', q: 'The shop makes 45 smoothies in 3 hours. How many smoothies per hour?', answer: ['15'] }
      ] },
    { title: 'Lock 4: Percents', content: '<p>A <b>percent</b> is a ratio out of 100. 25% means 25 out of 100, or 25/100.</p><blockquote>To find 25% of 80: 25/100 × 80 = 20.<br>Or use benchmarks: 10% of 80 is 8, so 20% is 16, and 5% is 4. 16 + 4 = 20.</blockquote>',
      puzzles: [
        { type: 'input', q: 'What is 25% of 80?', answer: ['20'] },
        { type: 'input', q: 'Of 40 smoothies sold this morning, 30 were Strawberry Splash. What percent is that?', answer: ['75', '75%'], unit: '%', hint: '30/40 = ?/100' },
        { type: 'input', q: 'A customer leaves a 15% tip on a $20 order. How much is the tip?', answer: ['3', '3.00'], unit: 'dollars', hint: '10% of 20 is 2, and 5% is 1.' }
      ] },
    { title: 'Lock 5: The Party Order', content: '<p>A birthday party orders <b>24 smoothies</b>. The recipe card says <b>8 smoothies use 6 cups of fruit</b>.</p><p>You can use a ratio table, a double number line, or find a unit rate.</p>',
      puzzles: [
        { type: 'input', q: 'How many cups of fruit are needed for 24 smoothies?', answer: ['18'], unit: 'cups' },
        { type: 'mc', q: 'How much fruit is in ONE smoothie?', choices: ['3/4 cup', '4/3 cups', '2 cups', '1/8 cup'], answer: 0, hint: '6 cups ÷ 8 smoothies' }
      ] }
  ],
  finale: '<p>The blenders whir to life just as the lunch line forms out the door. By closing time, you\'ve made 214 perfect smoothies, every one in exactly the right ratio. The manager gives you a raise: 10% more per hour!</p>',
  exit: [
    { q: 'A recipe uses 2 cups of rice for every 3 cups of water. How much water for 8 cups of rice?', choices: ['9 cups', '12 cups', '11 cups', '16 cups'], answer: 1 },
    { q: 'What is 30% of 50?', choices: ['15', '30', '35', '1.5'], answer: 0 },
    { q: 'Store A sells 6 granola bars for $3.00. Store B sells 10 for $4.50. Which is the better buy? Show the unit rates.', answer: 'Store B. A: $3.00 ÷ 6 = $0.50 per bar. B: $4.50 ÷ 10 = $0.45 per bar.', lines: 4 }
  ]
},
{
  id: 'g6-math-road-trip', std: 'g6-math-ratios', format: 'fieldtrip',
  title: 'Hoosier Road Trip',
  tagline: 'Drive across Indiana using rates for speed, gas, time, and group tickets.',
  story: '<p>Your family is taking a road trip across Indiana: from Indianapolis to the Indiana Dunes and back through Fort Wayne. You\'re the official trip planner. At each stop, use <b>rates</b> and <b>ratios</b> to keep the trip on track.</p><p class="note">Distances and prices are rounded for practice.</p>',
  code: 'MILES',
  stages: [
    { title: 'Stop 1: Leaving Indianapolis', content: '<p>Your family drives <b>130 miles in 2 hours</b> on I-65.</p><p>Speed is a <b>rate</b>: distance per unit of time. To find miles per hour (mph), divide miles by hours.</p>',
      puzzles: [
        { type: 'input', q: 'What was your average speed in miles per hour?', answer: ['65'], unit: 'mph' },
        { type: 'input', q: 'At that same speed, how far would you travel in 3 hours?', answer: ['195'], unit: 'miles' }
      ] },
    { title: 'Stop 2: The Gas Station', content: '<p>Your car gets <b>30 miles per gallon</b>. The gas tank holds <b>12 gallons</b>. Gas costs <b>$3.20 per gallon</b>.</p>',
      puzzles: [
        { type: 'input', q: 'How many miles can you drive on a full tank?', answer: ['360'], unit: 'miles' },
        { type: 'input', q: 'How much does it cost to fill a 12-gallon tank?', answer: ['38.40', '38.4'], unit: 'dollars' },
        { type: 'input', q: 'How many gallons would you need to drive 150 miles?', answer: ['5'], unit: 'gallons' }
      ] },
    { title: 'Stop 3: Indiana Dunes', content: '<p>At the Dunes, your family meets up with cousins. The group has adults and kids in a ratio of <b>2 adults to 5 kids</b>. There are <b>21 people</b> in all.</p><p>A <b>tape diagram</b> helps: draw 2 boxes for adults and 5 boxes for kids. That\'s 7 equal boxes for 21 people.</p>',
      puzzles: [
        { type: 'input', q: 'How many people does each box in the tape diagram represent?', answer: ['3'] },
        { type: 'input', q: 'How many kids are in the group?', answer: ['15'] },
        { type: 'mc', q: 'Kid tickets for the dune climb cost $4 each. How much for all the kids?', choices: ['$60', '$24', '$84', '$20'], answer: 0 }
      ] },
    { title: 'Stop 4: On to Fort Wayne', content: '<p>The drive to Fort Wayne is <b>180 miles</b> at an average speed of <b>60 mph</b>.</p><p>Remember: 1 hour = 60 minutes. Also, <b>1 mile ≈ 1.6 kilometers</b>.</p>',
      puzzles: [
        { type: 'input', q: 'How many hours will the drive to Fort Wayne take?', answer: ['3'], unit: 'hours' },
        { type: 'mc', q: 'How many minutes are in 2.5 hours?', choices: ['150 minutes', '250 minutes', '125 minutes', '90 minutes'], answer: 0 },
        { type: 'input', q: 'About how many kilometers is 50 miles?', answer: ['80'], unit: 'km' }
      ] },
    { title: 'Stop 5: Comparing Cars', content: '<p>Your uncle is thinking about buying a new car. He compares two:</p><ul><li><b>Car A</b>: drove 150 miles on 5 gallons.</li><li><b>Car B</b>: drove 200 miles on 8 gallons.</li></ul>',
      puzzles: [
        { type: 'input', q: 'What is Car B\'s rate in miles per gallon?', answer: ['25'], unit: 'mpg' },
        { type: 'mc', q: 'Which car uses gas more efficiently?', choices: ['Car A (30 mpg)', 'Car B', 'They are the same', 'Impossible to tell'], answer: 0 }
      ] }
  ],
  finale: '<p>You pull back into the driveway in Indianapolis after more than 450 miles. Every gas stop, every ticket, and every arrival time was planned with rates. The family votes you Trip Planner for life!</p>',
  exit: [
    { q: 'A car travels 240 miles in 4 hours. What is its speed?', choices: ['40 mph', '60 mph', '80 mph', '960 mph'], answer: 1 },
    { q: 'A group has 3 teachers for every 8 students. If there are 32 students, how many teachers are there?', choices: ['8', '12', '11', '24'], answer: 1 },
    { q: 'A bus goes 55 miles per hour. How far will it travel in 4 hours? Show how you know.', answer: '220 miles. 55 × 4 = 220 (or a ratio table: 1 hr → 55, 2 → 110, 4 → 220).', lines: 3 }
  ]
},
{
  id: 'g6-math-sale-scam', std: 'g6-math-ratios', format: 'mystery',
  title: 'The Sale Price Scam',
  tagline: 'A store\'s "amazing deals" don\'t add up. Use percents to expose the tricky signs.',
  story: '<p>Shoppers at the <b>MegaDeal Outlet</b> are complaining that the sale prices seem wrong. The consumer protection office has hired you as a math detective. Examine each piece of evidence and check the math behind every sign.</p>',
  code: 'PRICE',
  stages: [
    { title: 'Evidence File #1: The Jacket', content: '<p><b>Store sign:</b> "Winter jacket: Was $60. Now 50% OFF: only $40!"</p><p><b>Detective note:</b> 50% means 50 out of 100, or one-half. To find the discount, find 50% of the original price. Subtract it to find the sale price.</p>',
      puzzles: [
        { type: 'input', q: 'What SHOULD the sale price be at 50% off $60?', answer: ['30', '30.00'], unit: 'dollars' },
        { type: 'mc', q: 'What percent off is $40 actually, from an original price of $60?', choices: ['About 33%', '50%', '40%', '20%'], answer: 0, hint: 'The discount is $20. What percent of 60 is 20?' }
      ] },
    { title: 'Evidence File #2: The Price Tags', content: '<p>Some tags show discounts as fractions or decimals instead of percents. To convert, make an equivalent ratio out of 100.</p><blockquote>3/4 = 75/100 = 75%<br>0.4 = 40/100 = 40%</blockquote>',
      puzzles: [
        { type: 'match', q: 'Match each tag to its percent.', pairs: [['3/4 off', '75%'], ['0.4 off', '40%'], ['7/20 off', '35%'], ['1/5 off', '20%']] },
        { type: 'mc', q: 'Which discount is the biggest?', choices: ['3/4 off', '0.4 off', '35% off', '1/5 off'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Double Discount', content: '<p><b>Store sign:</b> "Sneakers: $50. Take 30% off, then take an EXTRA 20% off! That\'s 50% off, only $25!"</p><p><b>Detective note:</b> The extra 20% is taken off the <b>new</b> price, not the original price.</p><blockquote>Step 1: 30% of $50 = $15. $50 − $15 = $35.<br>Step 2: 20% of $35 = ?</blockquote>',
      puzzles: [
        { type: 'input', q: 'What is 20% of $35?', answer: ['7', '7.00'], unit: 'dollars' },
        { type: 'input', q: 'What is the real final price of the sneakers?', answer: ['28', '28.00'], unit: 'dollars' },
        { type: 'tf', q: 'True or false: 30% off followed by 20% off is the same as 50% off.', answer: false, explain: 'The second discount is taken from a smaller price. The real final price is $28, not $25.' }
      ] },
    { title: 'Evidence File #4: The Receipt', content: '<p>A shopper\'s receipt shows:</p><ul><li>A $12 discount on a video game, labeled "20% off."</li><li>Indiana sales tax of <b>7%</b> on a $40 purchase.</li></ul><p>To find the <b>whole</b> when you know a part and a percent: if 20% is $12, then 10% is $6, and 100% is 10 × $6.</p>',
      puzzles: [
        { type: 'input', q: 'If $12 is 20% of the original price, what was the original price?', answer: ['60', '60.00'], unit: 'dollars' },
        { type: 'input', q: 'What is 7% sales tax on $40?', answer: ['2.80', '2.8'], unit: 'dollars' }
      ] },
    { title: 'Evidence File #5: The Final Report', content: '<p>Your report lists the store\'s percent statements. Check each one.</p>',
      puzzles: [
        { type: 'sort', q: 'Is each statement true or false?', buckets: ['True', 'False'], items: [['10% of 250 is 25', 0], ['50% of 30 is 15', 0], ['200% of 8 is 16', 0], ['1% of 400 is 40', 1], ['25% of 60 is 20', 1]] },
        { type: 'mc', q: 'What should shoppers do when they see a sale sign?', choices: ['Check the math using percents and unit prices', 'Trust every sign', 'Only buy things that are 50% off', 'Never buy anything on sale'], answer: 0 }
      ] }
  ],
  finale: '<p>The consumer protection office orders MegaDeal Outlet to fix every sign. The jacket is now truly $30, and the sneakers are marked $28. Shoppers thank you, and the store manager signs up for a math class. Case closed!</p>',
  exit: [
    { q: 'A $80 game is 25% off. What is the sale price?', choices: ['$20', '$55', '$60', '$75'], answer: 2 },
    { q: 'Which is equal to 60%?', choices: ['6/100', '3/5', '0.06', '1/6'], answer: 1 },
    { q: 'A shirt costs $24 and is 15% off. Find the sale price and show your work.', answer: '15% of 24 = 3.60 (10% = 2.40, 5% = 1.20). 24 − 3.60 = $20.40.', lines: 4 }
  ]
},

/* ---------- Expressions & Equations ---------- */
{
  id: 'g6-math-algebra-vault', std: 'g6-math-expressions', format: 'escape',
  title: 'The Algebra Vault',
  tagline: 'Every lock is an equation. Translate, evaluate, and solve for the combination.',
  story: '<p>Deep beneath the Indiana State Museum is a vault that hasn\'t been opened in 100 years. Legend says its locks were designed by a mathematician who loved algebra. Each lock\'s combination is hidden inside an expression or equation.</p><p>Crack all five to reveal what\'s inside.</p>',
  code: 'SOLVE',
  stages: [
    { title: 'Lock 1: The Word Wall', content: '<p>The first wall is carved with phrases. Translate each into an algebraic expression.</p><ul><li>"more than," "sum," "increased by" → <b>+</b></li><li>"less than," "difference," "decreased by" → <b>−</b></li><li>"times," "product," "twice" → <b>×</b></li><li>"divided by," "quotient" → <b>÷</b></li></ul><p class="note">Careful: "3 less than n" is <b>n − 3</b>, not 3 − n.</p>',
      puzzles: [
        { type: 'match', q: 'Match each phrase to its expression.', pairs: [['5 more than n', 'n + 5'], ['3 less than n', 'n − 3'], ['The product of 4 and n', '4n'], ['n divided by 2', 'n ÷ 2'], ['3 less than twice n', '2n − 3']] },
        { type: 'mc', q: 'What does 3x mean?', choices: ['3 times x', '3 plus x', '3 minus x', 'x to the third power'], answer: 0 }
      ] },
    { title: 'Lock 2: Evaluate', content: '<p>To <b>evaluate</b> an expression, substitute the value for the variable and use the <b>order of operations</b>: Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right).</p><blockquote>2n + 3 when n = 5: 2(5) + 3 = 10 + 3 = 13</blockquote>',
      puzzles: [
        { type: 'input', q: 'Evaluate 4(x − 2) when x = 7.', answer: ['20'] },
        { type: 'input', q: 'Evaluate a² + b when a = 3 and b = 4.', answer: ['13'], hint: 'a² means a × a.' },
        { type: 'input', q: 'Evaluate 18 ÷ k + 5 when k = 3.', answer: ['11'] }
      ] },
    { title: 'Lock 3: Equivalent Expressions', content: '<p><b>Equivalent expressions</b> have the same value for every value of the variable. Two properties help:</p><ul><li><b>Distributive property</b>: 3(x + 4) = 3x + 12</li><li><b>Combining like terms</b>: 5y + 2y − 3 = 7y − 3</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Which expressions are equivalent to 2(x + 3)?', buckets: ['Equivalent', 'Not equivalent'], items: [['2x + 6', 0], ['x + x + 6', 0], ['6 + 2x', 0], ['2x + 3', 1], ['2x + 5', 1]] },
        { type: 'mc', q: 'Simplify: 5y + 2y − 3', choices: ['7y − 3', '4y', '10y − 3', '7y + 3'], answer: 0 },
        { type: 'mc', q: 'Which expression is equivalent to 3x + 12?', choices: ['3(x + 4)', '3(x + 12)', '15x', 'x + 4'], answer: 0 }
      ] },
    { title: 'Lock 4: One-Step Equations', content: '<p>To solve an equation, get the variable alone by using <b>inverse operations</b>. Whatever you do to one side, do to the other.</p><blockquote>x + 7 = 15 → subtract 7 from both sides → x = 8<br>Check: 8 + 7 = 15 ✓</blockquote>',
      puzzles: [
        { type: 'input', q: 'Solve: 6y = 42', answer: ['7', 'y=7'] },
        { type: 'input', q: 'Solve: m ÷ 4 = 9', answer: ['36', 'm=36'] },
        { type: 'input', q: 'Solve: n − 12 = 30', answer: ['42', 'n=42'] }
      ] },
    { title: 'Lock 5: The Final Combination', content: '<p>The final lock has three riddles. Write an equation for each, then solve it.</p>',
      puzzles: [
        { type: 'mc', q: 'Mia had some money. She spent $12 and has $30 left. Which equation matches?', choices: ['x − 12 = 30', 'x + 12 = 30', '12x = 30', 'x ÷ 12 = 30'], answer: 0 },
        { type: 'input', q: 'How much money did Mia start with?', answer: ['42'], unit: 'dollars' },
        { type: 'sort', q: 'Which values of x make the inequality x > 5 true?', buckets: ['Makes x > 5 true', 'Does not'], items: [['6', 0], ['10', 0], ['5.5', 0], ['5', 1], ['2', 1], ['0', 1]] }
      ] }
  ],
  finale: '<p>The vault door swings open to reveal... a single chalkboard with one equation: <b>you + practice = success</b>. The mathematician had a sense of humor. You solved every lock!</p>',
  exit: [
    { q: 'Which expression means "7 less than a number n"?', choices: ['7 − n', 'n − 7', '7n', 'n + 7'], answer: 1 },
    { q: 'Solve: 8x = 56', choices: ['x = 48', 'x = 64', 'x = 7', 'x = 448'], answer: 2 },
    { q: 'Evaluate 3(n + 2) − 4 when n = 5. Show each step.', answer: '3(5 + 2) − 4 = 3(7) − 4 = 21 − 4 = 17', lines: 3 }
  ]
},
{
  id: 'g6-math-balance-quest', std: 'g6-math-expressions', format: 'quest',
  title: 'The Balance Scale Quest',
  tagline: 'Keep the scales balanced through five levels of one-step equations.',
  story: '<p>In the land of <b>Equilibria</b>, every bridge is held up by a giant balance scale. If a scale tips, the bridge collapses! Your quest: cross five bridges by solving equations and keeping every scale in balance.</p>',
  code: 'EQUAL',
  stages: [
    { title: 'Level 1: The Balance Rule', content: '<p>An equation is like a balance scale: both sides have the <b>same value</b>. To keep it balanced, whatever you do to one side, you must do to the other.</p><blockquote>x + 4 = 10<br>Take 4 away from both sides: x = 6</blockquote>',
      puzzles: [
        { type: 'input', q: 'Solve: x + 4 = 10', answer: ['6', 'x=6'] },
        { type: 'mc', q: 'To solve x + 9 = 20, what should you do to both sides?', choices: ['Subtract 9', 'Add 9', 'Multiply by 9', 'Divide by 9'], answer: 0 },
        { type: 'input', q: 'Solve: 15 = k + 6', answer: ['9', 'k=9'] }
      ] },
    { title: 'Level 2: The Subtraction Bridge', content: '<p>When a number is <b>subtracted</b> from the variable, <b>add</b> it to both sides.</p><blockquote>x − 9 = 14 → add 9 to both sides → x = 23</blockquote>',
      puzzles: [
        { type: 'input', q: 'Solve: x − 9 = 14', answer: ['23', 'x=23'] },
        { type: 'input', q: 'Solve: 25 = y − 8', answer: ['33', 'y=33'] }
      ] },
    { title: 'Level 3: The Multiplication Bridge', content: '<p>When the variable is <b>multiplied</b> by a number (the <b>coefficient</b>), <b>divide</b> both sides by that number.</p><blockquote>7x = 56 → divide both sides by 7 → x = 8</blockquote>',
      puzzles: [
        { type: 'input', q: 'Solve: 7x = 56', answer: ['8', 'x=8'] },
        { type: 'input', q: 'Solve: 12 = 3k', answer: ['4', 'k=4'] },
        { type: 'input', q: 'Solve: 0.5p = 6', answer: ['12', 'p=12'], hint: 'Divide 6 by 0.5. How many halves are in 6?' }
      ] },
    { title: 'Level 4: The Division Bridge', content: '<p>When the variable is <b>divided</b> by a number, <b>multiply</b> both sides by that number.</p><blockquote>x ÷ 5 = 6 → multiply both sides by 5 → x = 30</blockquote>',
      puzzles: [
        { type: 'input', q: 'Solve: x ÷ 5 = 6', answer: ['30', 'x=30'] },
        { type: 'input', q: 'Solve: w/3 = 11', answer: ['33', 'w=33'] },
        { type: 'match', q: 'Match each equation to the inverse operation that solves it.', pairs: [['x + 8 = 20', 'Subtract 8'], ['x − 8 = 20', 'Add 8'], ['8x = 20', 'Divide by 8'], ['x ÷ 8 = 20', 'Multiply by 8']] }
      ] },
    { title: 'Level 5: The Final Bridge', content: '<p>The last bridge has real-world scales. Write the equation, solve it, and <b>check</b> your answer by substituting it back in.</p>',
      puzzles: [
        { type: 'mc', q: 'Four movie tickets cost $38 in all. Which equation finds the price of one ticket, t?', choices: ['4t = 38', 't + 4 = 38', 't − 4 = 38', 't ÷ 4 = 38'], answer: 0 },
        { type: 'input', q: 'What is the price of one ticket?', answer: ['9.50', '9.5'], unit: 'dollars' },
        { type: 'input', q: 'Jake is 12. He is 3 years younger than his sister. Solve s − 3 = 12 to find her age.', answer: ['15'], unit: 'years' },
        { type: 'tf', q: 'True or false: x = 4 is a solution to 3x + 2 = 14.', answer: true, explain: '3(4) + 2 = 12 + 2 = 14 ✓' }
      ] }
  ],
  finale: '<p>You step off the final bridge as all five scales hold perfectly level behind you. The people of Equilibria cheer! You learned the secret: keep both sides balanced and use inverse operations. Quest complete!</p>',
  exit: [
    { q: 'Solve: x − 15 = 22', choices: ['x = 7', 'x = 37', 'x = 330', 'x = 17'], answer: 1 },
    { q: 'Which operation solves y ÷ 6 = 4?', choices: ['Divide both sides by 6', 'Add 6 to both sides', 'Multiply both sides by 6', 'Subtract 6'], answer: 2 },
    { q: 'Write and solve an equation: A pack of 5 pens costs $7.50. What does one pen cost?', answer: '5p = 7.50, so p = 7.50 ÷ 5 = $1.50 per pen.', lines: 3 }
  ]
},
{
  id: 'g6-math-variable-villain', std: 'g6-math-expressions', format: 'mystery',
  title: 'The Variable Villain',
  tagline: 'A villain who speaks only in algebra has hidden the city\'s loot. Decode the expressions to catch them.',
  story: '<p>A mysterious thief known as <b>The Variable</b> has stolen the Golden Pacer trophy and left behind a trail of notes written entirely in algebra. The police are baffled. They need someone who can read expressions and solve equations: you!</p>',
  code: 'TERMS',
  stages: [
    { title: 'Evidence File #1: The Calling Card', content: '<p>The villain\'s calling card reads: <b>4x + 7</b></p><p><b>Detective vocabulary:</b></p><ul><li><b>Term</b>: a number, a variable, or their product, separated by + or − signs. 4x + 7 has 2 terms.</li><li><b>Coefficient</b>: the number multiplied by a variable (4).</li><li><b>Variable</b>: the letter standing for an unknown (x).</li><li><b>Constant</b>: a term with no variable (7).</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each part of 4x + 7.', pairs: [['4', 'Coefficient'], ['x', 'Variable'], ['7', 'Constant']] },
        { type: 'input', q: 'How many terms are in 3a + 2b − 5?', answer: ['3', 'three'] }
      ] },
    { title: 'Evidence File #2: The Age Riddle', content: '<p>A second note says: <i>"In 5 years, my age will be a + 5. Three times my age two years ago was 3(a − 2)."</i></p><p><b>Police tip:</b> The Variable\'s real age is <b>a = 32</b>.</p>',
      puzzles: [
        { type: 'input', q: 'Evaluate a + 5 when a = 32.', answer: ['37'] },
        { type: 'input', q: 'Evaluate 3(a − 2) when a = 32.', answer: ['90'] }
      ] },
    { title: 'Evidence File #3: The Scrambled Terms', content: '<p>The third note is messy: <b>6m + 3 + 2m − 1</b></p><p><b>Like terms</b> have exactly the same variable part. You can combine them: 6m and 2m are like terms; 3 and −1 are like terms.</p>',
      puzzles: [
        { type: 'mc', q: 'Simplify 6m + 3 + 2m − 1.', choices: ['8m + 2', '8m + 4', '10m', '4m + 2'], answer: 0 },
        { type: 'sort', q: 'Which terms are like terms with 4x?', buckets: ['Like term with 4x', 'Not a like term'], items: [['x', 0], ['9x', 0], ['0.5x', 0], ['4', 1], ['4y', 1], ['x²', 1]] }
      ] },
    { title: 'Evidence File #4: The Warehouse Code', content: '<p>The warehouse door code is written as <b>5(2n + 3)</b>. The police also found a crumpled note: <b>12x + 18</b>.</p><blockquote>Distributive property: a(b + c) = ab + ac<br>Factoring is the reverse: find the greatest common factor (GCF) and pull it out.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Use the distributive property: 5(2n + 3) = ?', choices: ['10n + 15', '10n + 3', '7n + 8', '2n + 15'], answer: 0 },
        { type: 'mc', q: 'Factor 12x + 18 using the GCF.', choices: ['6(2x + 3)', '3(4x + 18)', '12(x + 18)', '2(6x + 18)'], answer: 0 },
        { type: 'input', q: 'If n = 4, what is the warehouse code 5(2n + 3)?', answer: ['55'] }
      ] },
    { title: 'Evidence File #5: The Hideout', content: '<p>The final note: <i>"The trophy is in locker L, where L ÷ 3 = 24. My getaway car cost c dollars, and c + 150 = 900."</i></p><p>The villain also left a table showing how their loot grew each night:</p><div class="tablewrap"><table><tr><th>Nights (x)</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>Stolen items (y)</th><td>3</td><td>6</td><td>9</td><td>12</td></tr></table></div>',
      puzzles: [
        { type: 'input', q: 'Solve L ÷ 3 = 24. Which locker is the trophy in?', answer: ['72'] },
        { type: 'input', q: 'Solve c + 150 = 900. How much did the car cost?', answer: ['750'], unit: 'dollars' },
        { type: 'mc', q: 'Which equation matches the table?', choices: ['y = 3x', 'y = x + 3', 'y = x + 2', 'x = 3y'], answer: 0 },
        { type: 'mc', q: 'In the table, which is the dependent variable?', choices: ['Stolen items (y), because it depends on the number of nights', 'Nights (x)', 'Both', 'Neither'], answer: 0 }
      ] }
  ],
  finale: '<p>Police open locker 72 and find the Golden Pacer trophy, polished and safe. The Variable is caught trying to sell a $750 getaway car. "How did you crack my code?" the villain asks. You smile: "Algebra."</p>',
  exit: [
    { q: 'In the expression 9y − 4, what is the coefficient?', choices: ['9', 'y', '−4', '5'], answer: 0 },
    { q: 'Which expression is equivalent to 4(x + 5)?', choices: ['4x + 5', '4x + 20', 'x + 20', '9x'], answer: 1 },
    { q: 'Simplify 7a + 4 + 3a − 2 and explain which terms you combined.', answer: '10a + 2. Combine the like terms 7a and 3a to get 10a, and combine 4 and −2 to get 2.', lines: 3 }
  ]
},

/* ---------- Integers & the Coordinate Plane ---------- */
{
  id: 'g6-math-extreme-earth', std: 'g6-math-integers', format: 'fieldtrip',
  title: 'Extreme Earth Field Trip',
  tagline: 'Visit the lowest, highest, coldest, and hottest places, measuring everything with integers.',
  story: '<p>Your virtual field trip visits some of the most extreme places on Earth and in Indiana. <b>Positive and negative numbers</b> describe them all: above and below sea level, above and below zero. Grab your gear!</p>',
  code: 'DEPTH',
  stages: [
    { title: 'Stop 1: Death Valley, California', content: '<p>You stand at <b>Badwater Basin</b>, the lowest point in North America: <b>282 feet below sea level</b>. Sea level is our zero point. Places above sea level have positive elevations; places below sea level have negative elevations.</p><p>Not far away, Mount Whitney rises to <b>14,505 feet</b> above sea level.</p>',
      puzzles: [
        { type: 'input', q: 'Write the elevation of Badwater Basin as an integer.', answer: ['-282', '−282'], unit: 'feet' },
        { type: 'input', q: 'What is the opposite of −282?', answer: ['282'] },
        { type: 'mc', q: 'What number represents sea level?', choices: ['0', '1', '−1', '100'], answer: 0 }
      ] },
    { title: 'Stop 2: The Deepest and the Highest', content: '<p>Next, a submarine takes you to the <b>Challenger Deep</b> in the Mariana Trench, about <b>36,000 feet below sea level</b> (−36,000 ft). Then you fly to <b>Mount Everest</b>, at about <b>29,000 feet</b> above sea level (+29,000 ft).</p><p>The <b>absolute value</b> of a number is its distance from zero. It is always positive (or zero). |−36,000| = 36,000.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is farther from sea level?', choices: ['Challenger Deep, because |−36,000| > 29,000', 'Mount Everest', 'They are the same distance', 'Neither is far from sea level'], answer: 0 },
        { type: 'input', q: 'What is |−282|?', answer: ['282'] },
        { type: 'mc', q: 'Which statement is true?', choices: ['−36,000 < 29,000', '−36,000 > 29,000', '−36,000 = 29,000', '|−36,000| < 29,000'], answer: 0 }
      ] },
    { title: 'Stop 3: Indiana Weather Records', content: '<p>Back home in Indiana:</p><ul><li>Record low: <b>−36 °F</b> in New Whiteland (January 1994)</li><li>Record high: <b>116 °F</b> in Collegeville (July 1936)</li><li>A typical January morning in South Bend: <b>−12 °F</b> with wind chill</li><li>Water freezes at <b>32 °F</b>.</li></ul><p>On a number line, numbers increase from left to right. −12 is to the right of −36, so −12 > −36.</p>',
      puzzles: [
        { type: 'order', q: 'Order the temperatures from least (coldest) to greatest.', items: ['−36 °F', '−12 °F', '0 °F', '32 °F', '116 °F'] },
        { type: 'mc', q: 'Which temperature is colder?', choices: ['−12 °F', '−8 °F', 'They are the same', '0 °F'], answer: 0 }
      ] },
    { title: 'Stop 4: The Bank', content: '<p>Integers also describe money. A <b>deposit</b> adds money (+). A <b>withdrawal</b> or <b>debt</b> is negative (−).</p><p>Maya\'s account balance is <b>−$25</b>. She owes the bank $25. Jordan\'s balance is <b>−$10</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Who owes more money?', choices: ['Maya (−$25)', 'Jordan (−$10)', 'They owe the same', 'Neither owes money'], answer: 0 },
        { type: 'mc', q: 'Which balance is greater: −$25 or −$10?', choices: ['−$10', '−$25', 'They are equal', 'Cannot compare'], answer: 0, explain: '−10 is to the right of −25 on the number line, so it is greater, even though a debt of $25 is a larger debt.' },
        { type: 'sort', q: 'Which numbers are greater than −15?', buckets: ['Greater than −15', 'Less than −15'], items: [['−14', 0], ['−2', 0], ['0', 0], ['5', 0], ['−20', 1], ['−16', 1]] }
      ] },
    { title: 'Stop 5: The Elevator Ride', content: '<p>The last stop is a tall building with underground parking. Ground level is floor 0. Parking levels are negative: −1, −2, −3.</p><p>To find the distance between two numbers on a number line:</p><ul><li>If they have <b>opposite signs</b>, add their absolute values.</li><li>If they have the <b>same sign</b>, subtract their absolute values.</li></ul>',
      puzzles: [
        { type: 'input', q: 'How many floors is it from parking level −3 up to floor 9?', answer: ['12'], unit: 'floors' },
        { type: 'input', q: 'What is the distance between −8 and −2 on a number line?', answer: ['6'] },
        { type: 'input', q: 'What is the distance between −5 and 7?', answer: ['12'] }
      ] }
  ],
  finale: '<p>From 36,000 feet under the ocean to 29,000 feet up Everest, and from −36 °F to 116 °F, integers helped you describe it all. Field trip complete, Extreme Explorer!</p>',
  exit: [
    { q: 'Which is the greatest?', choices: ['−8', '−3', '−12', '−20'], answer: 1 },
    { q: 'What is |−19|?', choices: ['−19', '0', '19', '1/19'], answer: 2 },
    { q: 'At 6 a.m., the temperature was −7 °F. By noon, it was 15 °F. How many degrees did it rise? Explain using a number line.', answer: '22 degrees. From −7 to 0 is 7 degrees, and from 0 to 15 is 15 degrees. 7 + 15 = 22.', lines: 3 }
  ]
},
{
  id: 'g6-math-treasure-plane', std: 'g6-math-integers', format: 'escape',
  title: 'Treasure Map Escape',
  tagline: 'A pirate\'s map uses all four quadrants. Plot, reflect, and measure to find the treasure and escape.',
  story: '<p>You\'ve washed up on <b>Quadrant Island</b>, where Captain Coordinate buried her treasure long ago. Her map is a coordinate plane, and every lock on her treasure chest is a coordinate puzzle. Solve them all to claim the treasure and sail home.</p>',
  code: 'PLANE',
  stages: [
    { title: 'Lock 1: The Four Quadrants', content: '<p>The coordinate plane has two number lines: the horizontal <b>x-axis</b> and the vertical <b>y-axis</b>. They cross at the <b>origin (0, 0)</b>, making four <b>quadrants</b>, numbered counterclockwise starting at the top right.</p><div class="tablewrap"><table><tr><th>Quadrant</th><th>x</th><th>y</th></tr><tr><td>I</td><td>+</td><td>+</td></tr><tr><td>II</td><td>−</td><td>+</td></tr><tr><td>III</td><td>−</td><td>−</td></tr><tr><td>IV</td><td>+</td><td>−</td></tr></table></div>',
      puzzles: [
        { type: 'sort', q: 'Which quadrant is each point in?', buckets: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], items: [['(3, 5)', 0], ['(−4, 2)', 1], ['(−6, −1)', 2], ['(2, −7)', 3], ['(1, 1)', 0], ['(−2, −9)', 2]] },
        { type: 'mc', q: 'In an ordered pair (x, y), which number do you move along first?', choices: ['x, left or right', 'y, up or down', 'Either one', 'The larger one'], answer: 0 }
      ] },
    { title: 'Lock 2: Plot the Path', content: '<p>The captain\'s directions: <i>"Start at the palm tree at the origin. Walk 4 paces left and 3 paces down."</i></p><p>Points on an axis are not in any quadrant. A point on the x-axis has y = 0. A point on the y-axis has x = 0.</p>',
      puzzles: [
        { type: 'mc', q: 'Where do the captain\'s directions lead?', choices: ['(−4, −3)', '(4, 3)', '(−3, −4)', '(4, −3)'], answer: 0 },
        { type: 'mc', q: 'Which point lies on the y-axis?', choices: ['(0, 5)', '(5, 0)', '(5, 5)', '(−5, 5)'], answer: 0 },
        { type: 'mc', q: 'Are (3, 2) and (2, 3) the same point?', choices: ['No, the order of x and y matters', 'Yes, they have the same numbers', 'Only in Quadrant I', 'Only if you flip the map'], answer: 0 }
      ] },
    { title: 'Lock 3: The Mirror Rocks', content: '<p>Two mirror-shaped rocks show <b>reflections</b>:</p><ul><li>Reflecting across the <b>x-axis</b> changes the sign of the <b>y</b>-coordinate: (5, −2) → (5, 2).</li><li>Reflecting across the <b>y-axis</b> changes the sign of the <b>x</b>-coordinate: (5, −2) → (−5, −2).</li></ul>',
      puzzles: [
        { type: 'mc', q: 'Reflect (3, 6) across the x-axis.', choices: ['(3, −6)', '(−3, 6)', '(−3, −6)', '(6, 3)'], answer: 0 },
        { type: 'mc', q: 'Reflect (−4, −1) across the y-axis.', choices: ['(4, −1)', '(−4, 1)', '(4, 1)', '(−1, −4)'], answer: 0 },
        { type: 'mc', q: 'A point is reflected across BOTH axes. (2, 5) becomes...', choices: ['(−2, −5)', '(2, −5)', '(−2, 5)', '(5, 2)'], answer: 0 }
      ] },
    { title: 'Lock 4: Pacing the Distance', content: '<p>To find the distance between two points that share an x- or y-coordinate, count along the line. Use absolute value:</p><ul><li>(−3, 4) to (5, 4): same y. Distance = |−3| + |5| = 3 + 5 = 8.</li><li>If both coordinates have the <b>same sign</b>, subtract: (2, 3) to (2, 9) = 9 − 3 = 6.</li></ul>',
      puzzles: [
        { type: 'input', q: 'What is the distance from (−6, 2) to (4, 2)?', answer: ['10'], unit: 'units' },
        { type: 'input', q: 'What is the distance from (2, −6) to (2, 3)?', answer: ['9'], unit: 'units' },
        { type: 'input', q: 'What is the distance from (−7, −1) to (−2, −1)?', answer: ['5'], unit: 'units' }
      ] },
    { title: 'Lock 5: The Treasure Rectangle', content: '<p>The treasure is buried inside a rectangle with vertices at <b>(−2, 3), (4, 3), (4, −1), and (−2, −1)</b>.</p><p>Find the side lengths by finding the distance between vertices that share a coordinate.</p>',
      puzzles: [
        { type: 'input', q: 'What is the width of the rectangle (from x = −2 to x = 4)?', answer: ['6'], unit: 'units' },
        { type: 'input', q: 'What is the height (from y = −1 to y = 3)?', answer: ['4'], unit: 'units' },
        { type: 'input', q: 'What is the area of the treasure rectangle?', answer: ['24'], unit: 'square units' },
        { type: 'input', q: 'What is the perimeter?', answer: ['20'], unit: 'units' }
      ] }
  ],
  finale: '<p>You dig in the center of the rectangle and hit wood: Captain Coordinate\'s chest! Inside is a golden compass engraved with (0, 0), the place where every journey on the coordinate plane begins. You sail home a coordinate master.</p>',
  exit: [
    { q: 'In which quadrant is (−5, 8)?', choices: ['I', 'II', 'III', 'IV'], answer: 1 },
    { q: 'What is the distance between (3, −4) and (3, 6)?', choices: ['2', '10', '9', '6'], answer: 1 },
    { q: 'Point A is at (−3, 2). Reflect it across the x-axis. Give the new point and explain how you found it.', answer: '(−3, −2). Reflecting across the x-axis keeps x the same and changes the sign of y.', lines: 3 }
  ]
},
{
  id: 'g6-math-sonar-quest', std: 'g6-math-integers', format: 'quest',
  title: 'The Sonar Submarine Quest',
  tagline: 'Pilot a research sub through the depths using integers, opposites, and absolute value.',
  story: '<p>You are the pilot of the research submarine <b>Nautilus II</b>, exploring Lake Michigan and then the deep ocean. The sonar screen shows everything as integers: positive heights above the surface, negative depths below it. Clear each level to dive deeper!</p>',
  code: 'SONAR',
  stages: [
    { title: 'Level 1: Surface Check', content: '<p>The surface of the water is <b>0</b>. Above the water is positive; below is negative.</p><ul><li>A seagull flies at <b>+35 m</b>.</li><li>The sub is at <b>−150 m</b>.</li><li>A shipwreck rests at <b>−90 m</b>.</li></ul><p><b>Opposites</b> are the same distance from zero on opposite sides: 35 and −35.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is deeper?', choices: ['The sub at −150 m', 'The shipwreck at −90 m', 'They are the same depth', 'The seagull'], answer: 0 },
        { type: 'input', q: 'What is the opposite of the seagull\'s height, +35?', answer: ['-35', '−35'] },
        { type: 'mc', q: 'What does −90 m mean?', choices: ['90 meters below the surface', '90 meters above the surface', 'The water is 90 degrees', 'The sub is 90 meters long'], answer: 0 }
      ] },
    { title: 'Level 2: Absolute Depths', content: '<p>The sonar reports <b>absolute value</b>, the distance from the surface, ignoring direction.</p><blockquote>|−150| = 150 means the sub is 150 m from the surface.</blockquote>',
      puzzles: [
        { type: 'input', q: 'What is |−150|?', answer: ['150'] },
        { type: 'sort', q: 'Which expressions equal 8?', buckets: ['Equals 8', 'Does not equal 8'], items: [['|−8|', 0], ['|8|', 0], ['the opposite of −8', 0], ['−|8|', 1], ['−8', 1]] },
        { type: 'mc', q: 'Which has the greater absolute value?', choices: ['−150', '90', '35', '0'], answer: 0 }
      ] },
    { title: 'Level 3: Ordering the Depths', content: '<p>The sonar shows five objects. Order them from <b>lowest</b> (least) to <b>highest</b> (greatest).</p><ul><li>Seagull: +35 m</li><li>Surface buoy: 0 m</li><li>Fish school: −20 m</li><li>Shipwreck: −90 m</li><li>Nautilus II: −150 m</li></ul>',
      puzzles: [
        { type: 'order', q: 'Order from least to greatest.', items: ['−150 (Nautilus II)', '−90 (Shipwreck)', '−20 (Fish school)', '0 (Buoy)', '+35 (Seagull)'] },
        { type: 'mc', q: 'Which statement is true?', choices: ['−20 > −90', '−90 > −20', '−150 > 0', '−20 < −150'], answer: 0 }
      ] },
    { title: 'Level 4: Distance Dive', content: '<p>To reach the shipwreck, you need to know distances between depths.</p><ul><li>Same sign: subtract the absolute values.</li><li>Opposite signs: add the absolute values.</li></ul>',
      puzzles: [
        { type: 'input', q: 'How far is it from the sub (−150 m) up to the shipwreck (−90 m)?', answer: ['60'], unit: 'm' },
        { type: 'input', q: 'How far is it from the sub (−150 m) to the seagull (+35 m)?', answer: ['185'], unit: 'm' },
        { type: 'input', q: 'How far is the fish school (−20 m) from the surface?', answer: ['20'], unit: 'm' }
      ] },
    { title: 'Level 5: Mission Log', content: '<p>Write your mission log. Integers describe many real-world situations. Match each situation to its integer.</p>',
      puzzles: [
        { type: 'match', q: 'Match each situation to its integer.', pairs: [['20 degrees below zero', '−20'], ['A $50 deposit', '+50'], ['A loss of 10 yards in football', '−10'], ['Sea level', '0'], ['Climbing 300 feet up a hill', '+300']] },
        { type: 'mc', q: 'Why is absolute value useful for a submarine pilot?', choices: ['It tells the distance from the surface no matter the direction', 'It makes numbers negative', 'It measures temperature', 'It tells the speed of the sub'], answer: 0 }
      ] }
  ],
  finale: '<p>The Nautilus II surfaces into the sunlight, back to 0 m. Your sonar log is perfect: every depth, distance, and opposite recorded correctly. Quest complete, Captain!</p>',
  exit: [
    { q: 'Which number is less than −6?', choices: ['−5', '0', '−9', '6'], answer: 2 },
    { q: 'A diver is at −40 ft. A bird is at +25 ft. How far apart are they?', choices: ['15 ft', '65 ft', '40 ft', '25 ft'], answer: 1 },
    { q: 'Explain why −10 is greater than −50, even though 50 is greater than 10.', answer: 'On a number line, −10 is to the right of −50 (closer to zero), and numbers increase to the right. −50 is farther below zero.', lines: 3 }
  ]
}
);
