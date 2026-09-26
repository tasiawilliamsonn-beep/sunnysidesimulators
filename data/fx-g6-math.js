/* Grade 6 Math: themes, ratio models, balance scales, number lines, and coordinate grids */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function NL(q, min, max, ticks, minor, answer, extra) {
    return Object.assign({ type: 'numberline', q: q, min: min, max: max, ticks: ticks, minor: minor, snap: 1, tol: 0.5, answer: answer }, extra || {});
  }
  function BAL(q, x, units, right, answer, extra) {
    return Object.assign({ type: 'balance', q: q, left: { x: x, units: units }, right: { units: right }, answer: answer }, extra || {});
  }
  function PLANE(q, answer, extra) {
    return Object.assign({ type: 'plot', q: q, xmin: -8, xmax: 8, ymin: -8, ymax: 8, answer: answer }, extra || {});
  }
  function AREA(a, left, right, lw, rw, cap) {
    return { kind: 'scene', w: 460, h: 190, max: 460, caption: cap, label: 'An area model', shapes: [
      { t: 'rect', x: 50, y: 40, w: lw, h: 110, fill: '#FFD166', sw: 2.5 },
      { t: 'rect', x: 50 + lw, y: 40, w: rw, h: 110, fill: '#8EC5FF', sw: 2.5 },
      { t: 'text', x: 30, y: 101, s: a, size: 20 },
      { t: 'text', x: 50 + lw / 2, y: 28, s: left[0], size: 18 }, { t: 'text', x: 50 + lw + rw / 2, y: 28, s: right[0], size: 18 },
      { t: 'text', x: 50 + lw / 2, y: 102, s: left[1], size: 22 }, { t: 'text', x: 50 + lw + rw / 2, y: 102, s: right[1], size: 22 }
    ] };
  }

  /* ---------- rooms ---------- */
  FX['g6-math-smoothie-lockdown'] = {
    theme: 'sweets',
    stages: {
      0: { set: { visual: { kind: 'tape', parts: [{ n: 3, label: 'Strawberries', fill: '#F28B9B', each: '1 c' }, { n: 2, label: 'Yogurt', fill: '#FFF4DC', each: '1 c' }], total: '5 cups in the blender', caption: 'Strawberry Splash: 3 cups strawberries for every 2 cups yogurt' } },
        append: [{ type: 'shade', q: 'The blender holds 5 equal cups. Shade the fraction of the smoothie that is strawberries.', model: 'bar', parts: 5, answer: '3/5', hint: 'Part-to-whole: strawberries out of ALL the cups.', explain: '3 of the 5 cups are strawberries, so 3/5 of the smoothie is strawberries.' }] },
      1: { set: { visual: { kind: 'dnl', top: { label: 'Strawberries', values: ['0', '3', '6', '9', '?'] }, bottom: { label: 'Yogurt', values: ['0', '2', '4', '?', '10'] }, caption: 'The recipe as a double number line' } } },
      2: { append: [NL('Mark the price of ONE smoothie on the number line (4 smoothies cost $18).', 0, 9, 9, 2, 4.5, { snap: 0.5, tol: 0.1, unit: null, hint: '$18 ÷ 4 = ? Each small tick is 50¢.', explain: '$18 ÷ 4 = $4.50, halfway between $4 and $5.' })] },
      3: { patch: { 1: { replace: { type: 'shade', q: 'Of 40 smoothies sold this morning, 30 were Strawberry Splash. Shade the 100-grid to show that percent.', model: 'grid100', answer: '75%', hint: '30 out of 40 = ? out of 100. Multiply both by 2.5.', explain: '30/40 = 3/4 = 75/100 = 75%.' } } } },
      4: { set: { visual: { kind: 'dnl', top: { label: 'Smoothies', values: ['0', '8', '16', '24'] }, bottom: { label: 'Cups of fruit', values: ['0', '6', '12', '?'] }, caption: 'Scale up the recipe card' } } }
    }
  };

  FX['g6-math-road-trip'] = {
    theme: 'racing',
    stages: {
      0: { set: { visual: { kind: 'dnl', top: { label: 'Miles', values: ['0', '65', '130', '?'] }, bottom: { label: 'Hours', values: ['0', '1', '2', '3'] }, caption: 'Your trip on I-65' } } },
      1: { append: [{ type: 'shade', q: 'The fuel gauge has 12 bars, one for each gallon. You have 9 gallons left. Shade the gauge.', model: 'bar', parts: 12, answer: '9/12', hint: 'Shade 1 bar for each gallon left.', explain: '9 of 12 gallons = 9/12 = 3/4 of a tank, enough for 9 × 30 = 270 more miles.' }] },
      2: { set: { visual: { kind: 'tape', parts: [{ n: 2, label: 'Adults', fill: '#8EC5FF', each: '?' }, { n: 5, label: 'Kids', fill: '#FFD166', each: '?' }], total: '21 people in all', caption: '2 adults for every 5 kids' } } },
      3: { append: [NL('Mark 2.5 hours on this number line of MINUTES.', 0, 180, 6, 3, 150, { snap: 10, tol: 5, hint: '2 hours = 120 minutes. Half an hour = 30 more.', explain: '2.5 × 60 = 150 minutes.' })] },
      4: { patch: { 1: { replace: { type: 'tap', q: 'Tap the bar for the car that uses gas MORE efficiently.', visual: { kind: 'chart', type: 'bar', data: [['Car A', 30, '#1F7A5C'], ['Car B', 25, '#C8272D']], ymax: 35, ystep: 5, ylabel: 'Miles per gallon', w: 400, label: 'Miles per gallon for two cars' }, answer: 'b0', hint: 'More miles from each gallon is more efficient.', why: { b1: 'Car B goes only 25 miles on each gallon.' }, explain: 'Car A gets 150 ÷ 5 = 30 mpg. Car B gets 200 ÷ 8 = 25 mpg. Car A goes farther on each gallon.' } } } }
    }
  };

  FX['g6-math-sale-scam'] = {
    theme: 'shop',
    stages: {
      0: { set: { visual: { kind: 'tape', parts: [{ n: 6, label: 'Original price', fill: '#FFD166', each: '$10' }], total: '$60', caption: 'The jacket\'s price in $10 parts' } },
        append: [{ type: 'shade', q: 'The sign says the jacket costs $40. Shade the parts of the $60 price the shopper actually pays.', model: 'bar', parts: 6, answer: '4/6', hint: 'Each part is $10.', explain: '$40 is 4 of the 6 parts, or 2/3 of the price. The shopper saves only 1/3, about 33%, not 50%!' }] },
      1: { append: [{ type: 'shade', q: 'A tag says "3/4 off." Shade the grid to show the percent off.', model: 'grid100', answer: '75%', hint: '3/4 = ?/100', explain: '3/4 = 75/100 = 75%.' }] },
      2: { append: [NL('Mark the REAL final price of the sneakers on the number line.', 0, 50, 10, 5, 28, { points: [{ v: 25, label: 'Sign' }], hint: '$35 minus 20% of $35.', explain: '$35 − $7 = $28, not the $25 the sign claims.' })] },
      3: { set: { visual: { kind: 'dnl', top: { label: 'Percent', values: ['0%', '10%', '20%', '…', '100%'] }, bottom: { label: 'Dollars', values: ['$0', '$6', '$12', '…', '?'] }, caption: 'If 20% is $12, what is 100%?' } } }
    }
  };

  FX['g6-math-algebra-vault'] = {
    theme: 'vault',
    stages: {
      0: { append: [
        { type: 'assemble', q: 'Build the expression: "3 less than n."', tiles: ['3', '−', 'n', '+'], answer: ['n', '−', '3'], joiner: ' ', hint: '"Less than" flips the order: start with n.', why: { '3|−|n': '3 − n means n less than 3. "3 less than n" starts with n.' }, explain: '"3 less than n" means start with n and take away 3: n − 3.' },
        { type: 'assemble', q: 'Build the expression: "twice a number x, increased by 5."', tiles: ['5', '+', '2x', '−', 'x²'], answer: ['2x', '+', '5'], answers: [['2x', '+', '5'], ['5', '+', '2x']], joiner: ' ', hint: '"Twice" means times 2. "Increased by" means add.', explain: '2x + 5.' }] },
      1: { set: { cards: [['P', 'Parentheses first'], ['E', 'Exponents next'], ['M D', 'Multiply and divide, left to right'], ['A S', 'Add and subtract, left to right']] } },
      2: { set: { visual: AREA('2', ['x', '2x'], ['3', '6'], 240, 120, 'An area model for 2(x + 3): 2 × x plus 2 × 3') } },
      3: { patch: { 0: { replace: BAL('Solve 6x = 42. Use the scale to get x alone.', 6, 0, 42, 7, { hint: 'Split both sides into 6 equal groups.', explain: '42 ÷ 6 = 7, so x = 7. Check: 6 × 7 = 42 ✓' }) } } },
      4: { patch: { 0: { replace: { type: 'assemble', q: 'Mia had m dollars. She spent $12 and has $30 left. Build the equation.', tiles: ['30', '=', '12', 'm', '−', '+'], answer: ['m', '−', '12', '=', '30'], joiner: ' ', hint: 'Start with what she had, then show what happened.', explain: 'm − 12 = 30. Add 12 to both sides: m = 42.' } } } }
    }
  };

  FX['g6-math-balance-quest'] = {
    theme: 'arcade',
    stages: {
      0: { patch: {
        0: { replace: BAL('Solve x + 4 = 10. Take the same amount off both sides until x is alone.', 1, 4, 10, 6, { hint: 'Take 4 off each side.', explain: 'x + 4 − 4 = 10 − 4, so x = 6.' }) },
        2: { replace: BAL('Solve k + 6 = 15 on the scale. (The letter on the block stands for k.)', 1, 6, 15, 9, { hint: 'Take 6 off each side.', explain: '15 − 6 = 9, so k = 9. Check: 9 + 6 = 15 ✓' }) } } },
      1: { append: [NL('x − 9 = 14. Undo the subtraction: start at 14 and jump up 9. Mark x.', 0, 30, 6, 5, 23, { hint: '14 + 9 = ?', explain: 'Adding 9 undoes subtracting 9: x = 23.' })] },
      2: { patch: {
        0: { replace: BAL('Solve 7x = 56. Split the scale into equal groups.', 7, 0, 56, 8, { hint: 'Split both sides into 7 equal groups.', explain: '56 ÷ 7 = 8, so x = 8.' }) },
        1: { replace: BAL('Solve 3k = 12 on the scale. (The letter on the block stands for k.)', 3, 0, 12, 4, { hint: 'Split both sides into 3 equal groups.', explain: '12 ÷ 3 = 4, so k = 4.' }) } } },
      3: { set: { visual: { kind: 'tape', parts: [{ n: 5, label: '5 equal groups', fill: '#B5A8FF', each: '6' }], total: 'x', caption: 'x ÷ 5 = 6: x is 5 groups of 6' } } },
      4: { patch: { 0: { visual: { kind: 'tape', parts: [{ n: 4, label: '4 tickets', fill: '#FFD166', each: 't' }], total: '$38 in all' } } } }
    }
  };

  FX['g6-math-variable-villain'] = {
    theme: 'comic',
    stages: {
      0: { append: [{ type: 'highlight', q: 'Tap every TERM in 3a + 2b − 5.', segments: ['3a', '+', '2b', '−', '5'], answer: [0, 2, 4], hint: 'Terms are separated by + and − signs.', explain: 'The three terms are 3a, 2b, and 5 (a constant).' }] },
      2: { patch: { 0: { replace: { type: 'assemble', q: 'Crack the scrambled note! Build the simplified form of 6m + 3 + 2m − 1.', tiles: ['2', '8m', '+', '4m', '−', '6m'], answer: ['8m', '+', '2'], answers: [['8m', '+', '2'], ['2', '+', '8m']], joiner: ' ', hint: 'Combine 6m and 2m. Then combine 3 and −1.', explain: '6m + 2m = 8m, and 3 − 1 = 2, so the note simplifies to 8m + 2.' } } } },
      3: { set: { visual: AREA('5', ['2n', '10n'], ['3', '15'], 240, 110, 'An area model for 5(2n + 3)') } },
      4: { append: [PLANE('The loot table follows a pattern. Plot the point for night 5.', [5, 15], { xmin: 0, xmax: 6, ymin: 0, ymax: 18, xlabel: 'Nights', ylabel: 'Items', points: [{ x: 1, y: 3 }, { x: 2, y: 6 }, { x: 3, y: 9 }, { x: 4, y: 12 }], hint: 'The items go up by 3 each night: y = 3x.', explain: 'y = 3 × 5 = 15, so the point is (5, 15).' })] }
    }
  };

  FX['g6-math-extreme-earth'] = {
    theme: 'travel',
    stages: {
      0: { append: [NL('Mark Badwater Basin (−282 ft) on the elevation line.', -400, 400, 8, 2, -282, { vertical: true, fmt: 'neg', unit: 'ft', snap: 1, tol: 25, points: [{ v: 0, label: 'Sea level' }], hint: '−282 is below 0, a little past −250.', explain: 'Badwater Basin is 282 feet BELOW sea level, so it sits under 0.' })] },
      1: { set: { visual: { kind: 'nline', vertical: true, min: -40000, max: 30000, ticks: 7, fmt: 'neg', points: [{ v: 29000, label: 'Everest' }, { v: 0, label: 'Sea' }, { v: -36000, label: 'Challenger Deep', color: '#1F6FD1' }], caption: 'Elevation in feet' } } },
      2: { set: { visual: [{ kind: 'thermo', min: -40, max: 120, step: 20, value: -36, unit: '°', label: 'Record low', caption: 'Record low: −36 °F' }, { kind: 'thermo', min: -40, max: 120, step: 20, value: -12, unit: '°', label: 'South Bend', caption: 'South Bend: −12 °F' }, { kind: 'thermo', min: -40, max: 120, step: 20, value: 116, unit: '°', label: 'Record high', caption: 'Record high: 116 °F' }] },
        append: [NL('Mark −12 °F on the number line.', -40, 40, 8, 2, -12, { fmt: 'neg', tol: 1, points: [{ v: -36, label: 'Record low' }], hint: '−12 is between −10 and −15, closer to −10.', explain: '−12 is to the right of −36, so −12 °F is warmer than −36 °F.' })] },
      3: { append: [NL('Maya\'s balance is −$25. Mark Jordan\'s balance of −$10.', -30, 10, 4, 5, -10, { fmt: 'neg', points: [{ v: -25, label: 'Maya' }], hint: '−10 is closer to zero than −25.', explain: 'Jordan owes less, so −10 is to the right of −25 and is the greater balance.' })] },
      4: { append: [NL('The elevator starts on floor 5 and goes DOWN 7 floors. Mark where it stops.', -3, 9, 12, 1, -2, { vertical: true, fmt: 'neg', points: [{ v: 5, label: 'Start' }], hint: 'Count down 7: 4, 3, 2, 1, 0, −1, −2.', explain: '5 − 7 = −2, the second parking level.' })] }
    }
  };

  FX['g6-math-treasure-plane'] = {
    theme: 'ship',
    stages: {
      0: { append: [PLANE('Mark the old cannon at (−3, 4). Remember: x first, then y.', [-3, 4], { hint: 'Move 3 LEFT, then 4 UP.', explain: '(−3, 4) is in Quadrant II, where x is negative and y is positive.' })] },
      1: { patch: { 0: { replace: PLANE('Follow the captain: start at the palm tree (0, 0), walk 4 paces left and 3 paces down. Mark where you end up.', [-4, -3], { points: [{ x: 0, y: 0, label: 'Palm tree' }], hint: 'Left is negative x. Down is negative y.', explain: 'You end at (−4, −3), in Quadrant III.' }) } } },
      2: { patch: { 0: { replace: PLANE('Reflect the rock at (3, 6) across the x-axis. Mark its mirror image.', [3, -6], { points: [{ x: 3, y: 6, label: 'Rock' }], hint: 'Across the x-axis, x stays the same and y changes sign.', explain: '(3, 6) → (3, −6). The x-axis acts like a mirror.' }) } } },
      3: { patch: { 0: { visual: { kind: 'coord', xmin: -8, xmax: 8, ymin: -8, ymax: 8, points: [{ x: -6, y: 2, label: 'A' }, { x: 4, y: 2, label: 'B' }] } } } },
      4: { set: { visual: { kind: 'coord', xmin: -4, xmax: 6, ymin: -3, ymax: 5, poly: [[-2, 3], [4, 3], [4, -1], [-2, -1]], points: [{ x: -2, y: 3, label: '(−2, 3)' }, { x: 4, y: 3, label: '(4, 3)' }, { x: 4, y: -1, label: '(4, −1)' }, { x: -2, y: -1, label: '(−2, −1)' }], caption: 'The treasure rectangle' } } }
    }
  };

  var DEPTHS = { kind: 'nline', vertical: true, min: -160, max: 40, ticks: 10, fmt: 'neg', points: [{ v: 35, label: 'Seagull' }, { v: 0, label: 'Buoy' }, { v: -20, label: 'Fish', color: '#1F6FD1' }, { v: -90, label: 'Wreck', color: '#6B5646' }, { v: -150, label: 'Sub', color: '#1F7A5C' }], caption: 'Sonar screen (meters)' };
  FX['g6-math-sonar-quest'] = {
    theme: 'ocean',
    stages: {
      0: { append: [NL('Mark the shipwreck (−90 m) on the sonar line.', -160, 40, 10, 2, -90, { vertical: true, fmt: 'neg', snap: 10, tol: 5, points: [{ v: 35, label: 'Seagull' }, { v: -150, label: 'Sub' }], hint: '−90 is between −80 and −100.', explain: 'The wreck is 90 m below the surface, above the sub at −150 m.' })] },
      3: { set: { visual: DEPTHS } }
    }
  };
})(window.CX_FX);
