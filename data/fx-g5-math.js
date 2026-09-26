/* Grade 5 Math: themes, fraction boxes, models, number lines, money, and prism building */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function F(ans, extra) { var o = { type: 'frac', answer: ans, placeholder: null, unit: null }; for (var k in extra || {}) o[k] = extra[k]; return o; }

  FX['g5-math-pizza-lockdown'] = {
    theme: 'pizzeria',
    stages: {
      0: { patch: { 0: { visual: [{ kind: 'pie', n: 4, shaded: 3, style: 'pizza', size: 170, caption: '3/4 of a pizza' }] } },
        append: [{ type: 'shade', q: 'This pizza is cut into 8 slices. Put toppings on slices to show a fraction EQUAL to 3/4.', model: 'pie', parts: 8, style: 'pizza', answer: '6/8', hint: '3/4 = ?/8. Multiply the top and bottom by 2.', explain: '3/4 = 6/8, so 6 of the 8 slices get toppings.' }] },
      1: { patch: { 1: F('7/12', { visual: [{ kind: 'pie', n: 3, shaded: 1, size: 150, caption: '1/3 pepperoni' }, { kind: 'pie', n: 4, shaded: 1, size: 150, caption: '1/4 mushrooms' }], why: { '2/7': 'It looks like you added the tops and the bottoms. Rewrite both fractions in twelfths first.' } }),
        2: F('9/10', { why: { '3/7': 'Adding straight across doesn\'t work. Use tenths: 2/5 = 4/10 and 1/2 = 5/10.' } }) } },
      2: { patch: { 0: F('1/12', { why: { '1/1': 'Subtracting straight across doesn\'t work. Use twelfths: 9/12 − 8/12.' } }), 1: { visual: { kind: 'pie', n: 8, shaded: 7, style: 'pizza', size: 170, caption: 'Mia\'s 7/8 of a pizza' } }, 2: F('7/12') } },
      3: { patch: { 0: F('17/4', { why: { '13/4': 'Check your whole numbers: 2 + 1 = 3, and 2/4 + 3/4 = 5/4 = 1 1/4 more.' } }), 1: F('8/3') },
        append: [{ type: 'numberline', q: 'Estimate like a chef: place 3 7/8 pounds on the number line.', min: 0, max: 6, ticks: 6, minor: 8, labels: 'all', snap: 0.125, tol: 0.0626, answer: 3.875, fmt: 'int', hint: 'Each whole is split into 8 small ticks. 3 7/8 is one tick before 4.', explain: '3 7/8 is just 1/8 less than 4, so it is very close to 4.' }] },
      4: { patch: { 0: F('3/8', { visual: { kind: 'bar', n: 8, shaded: 3, caption: '1/2 of 3/4 = 3 of 8 equal parts' } }) } }
    }
  };

  FX['g5-math-fraction-trail'] = {
    theme: 'forest',
    stages: {
      0: { append: [{ type: 'numberline', q: 'A trail marker says 5/8 mile. Place 5/8 on the trail map.', min: 0, max: 1, ticks: 8, labels: 'ends', fmt: 'frac', den: 8, answer: 0.625, hint: 'The trail from 0 to 1 is split into 8 equal parts. Count 5.', explain: '5/8 is 5 of the 8 equal steps from 0 to 1, a little more than halfway.' }] },
      1: { patch: { 0: F('7/10', { visual: { kind: 'nline', min: 0, max: 1, ticks: 10, labels: 'ends', fmt: 'frac', den: 10, points: [{ v: 0.3, label: 'Creek' }], caption: 'Trail map in tenths of a mile' } }), 1: F('11/12'), 2: F('3/2') } },
      2: { patch: { 0: F('31/12', { why: { '41/12': 'Did you forget to regroup? 4 3/12 − 1 8/12: trade 1 whole for 12/12 first.' } }), 1: F('5/8') } },
      3: { patch: { 1: F('2/5') } },
      4: { patch: { 0: F('3/4'), 1: F('1/2', { visual: { kind: 'grid100', cells: 10, shaded: 0, caption: '' } }) } }
    }
  };
  // area model for 3/4 × 2/3 is clearer as a shade puzzle
  FX['g5-math-fraction-trail'].stages[4].patch[1] = F('1/2');
  FX['g5-math-fraction-trail'].stages[4].append = [{ type: 'shade', q: 'The campsite rectangle is split into 12 equal squares (4 columns for fourths, 3 rows for thirds). Shade 3/4 × 2/3 of it: 3 of the 4 columns in 2 of the 3 rows.', model: 'bar', parts: 12, answer: '6/12', hint: '3 columns × 2 rows = ? squares.', explain: '3 × 2 = 6 of the 12 squares, so 3/4 × 2/3 = 6/12 = 1/2.' }];

  FX['g5-math-bakery-mystery'] = {
    theme: 'sweets',
    stages: {
      0: { patch: { 0: F('5/4', { why: { '4/6': 'It looks like you added tops and bottoms. 3/4 + 2/4 = 5/4.' } }), 1: F('35/12') } },
      1: { patch: { 0: F('4/3', { why: { '2/3': '4/6 equals 2/3, which didn\'t double anything. Multiply only the numerator: 2 × 2/3.' } }) } },
      2: { patch: { 0: F('9/8') } },
      3: { patch: { 1: F('1/2', { why: { '2/9': 'That\'s the assistant\'s mistake! Use sixths: 2/6 + 1/6.' } }), 2: F('1/10') },
        append: [{ type: 'shade', q: 'Measuring cup check: this cup is marked in sixths. Shade how full it is after adding 1/3 cup and then 1/6 cup of cocoa.', model: 'bar', parts: 6, answer: '3/6', hint: '1/3 = 2/6. Then add 1/6 more.', explain: '2/6 + 1/6 = 3/6, which is 1/2 of the cup.' }] },
      4: { patch: { 0: F('5/4', { visual: { kind: 'bar', n: 4, shaded: 5, caption: '' } }) } }
    }
  };
  FX['g5-math-bakery-mystery'].stages[4].patch[0] = F('5/4');

  FX['g5-math-speedway-trip'] = {
    theme: 'racing',
    stages: {
      0: { append: [{ type: 'numberline', q: 'The timing screen zooms in. Place 40.58 seconds on this number line.', min: 40.5, max: 40.6, ticks: 10, labels: 'ends', fmt: 'dec', dp: 2, answer: 40.58, hint: 'Each tick is one hundredth (0.01). Count 8 ticks after 40.50.', explain: '40.58 is 8 hundredths past 40.50.' }] },
      1: { append: [{ type: 'numberline', q: 'Prove it: place 0.45 on the number line. Is it left or right of 0.5?', min: 0, max: 1, ticks: 10, minor: 2, labels: 'all', fmt: 'dec', dp: 1, answer: 0.45, hint: 'The small ticks are halfway between tenths.', explain: '0.45 is halfway between 0.4 and 0.5, so it is LESS than 0.5.' }] },
      2: { patch: { 2: { visual: { kind: 'nline', min: 38.9, max: 39.0, ticks: 10, labels: 'ends', fmt: 'dec', dp: 2, points: [{ v: 38.95, label: '38.951' }], caption: '38.951 sits at the halfway mark or just past it' } } } },
      4: { append: [{ type: 'shade', q: 'The garage fuel gauge is a 100-square grid. Shade 0.36 of the grid.', model: 'grid100', answer: '0.36', hint: '0.36 = 36 hundredths = 36 squares.', explain: '36 out of 100 squares is 0.36.' }] }
    }
  };

  FX['g5-math-bank-vault'] = {
    theme: 'vault',
    stages: {
      0: { patch: { 2: { replace: { type: 'coins', q: 'The first lock wants exactly $2.96 in the tray, using dollars, dimes, and pennies.', coins: ['b1', 'd', 'p'], answer: 2.96, hint: '2 dollars, 9 dimes (9 tenths), and 6 pennies (6 hundredths).', explain: '$2.96 = 2 ones + 9 tenths + 6 hundredths.' } } },
        append: [{ type: 'coins', q: 'Bonus lock: make $0.43 using the FEWEST coins possible.', coins: ['q', 'd', 'n', 'p'], answer: 0.43, fewest: true, hint: 'Start with the biggest coin that fits.', explain: 'A quarter, a dime, a nickel, and 3 pennies: 6 coins.' }] },
      2: { patch: { 1: { replace: { type: 'coins', q: 'You pay for a $3.45 snack with a $10 bill. Count out the correct change in the tray.', coins: ['b1', 'q', 'd', 'n', 'p'], answer: 6.55, hint: '$10.00 − $3.45 = ?', explain: '$10.00 − $3.45 = $6.55: for example, 6 dollars, 2 quarters, and a nickel.' } } } }
    }
  };

  FX['g5-math-place-value-museum'] = {
    theme: 'museum',
    stages: {
      1: { set: { visual: { kind: 'blocks', flats: 2, rods: 3, units: 5, caption: 'The display table: flats, rods, and units' } },
        append: [{ type: 'shade', q: 'Now it\'s your turn at the exhibit: a flat is 1 whole. Shade 0.35 of this flat.', model: 'grid100', answer: '0.35', hint: '0.35 = 3 tenths (3 rows of 10) + 5 hundredths.', explain: '35 of 100 squares: 3 full rods and 5 units.' }] },
      2: { patch: { 0: { replace: { type: 'numberline', q: 'Step onto the walkway: place 0.66 on the number line.', min: 0.6, max: 0.7, ticks: 10, labels: 'ends', fmt: 'dec', dp: 2, answer: 0.66, hint: 'Each step is one hundredth. Count 6 steps after 0.60.', explain: '0.66 is 6 hundredths past 0.60.' } } },
        append: [{ type: 'numberline', q: 'Place 1.45 on this walkway.', min: 1, max: 2, ticks: 10, minor: 2, labels: 'all', fmt: 'dec', dp: 1, answer: 1.45, hint: '1.45 is halfway between 1.4 and 1.5.', explain: '1.45 is between 1.4 and 1.5, right at the small halfway tick.' }] },
      4: { patch: { 2: { visual: { kind: 'nline', min: 3.4, max: 3.6, ticks: 4, minor: 5, labels: 'all', fmt: 'dec', dp: 2, caption: 'Rounding zone for 3.5: numbers from 3.45 up to (but not including) 3.55' } } } }
    }
  };

  FX['g5-math-shipping-escape'] = {
    theme: 'warehouse',
    stages: {
      0: { set: { visual: { kind: 'prism', l: 4, w: 3, h: 2, caption: 'Container 1: filled with 1-cm cubes' } } },
      1: { patch: { 0: { visual: { kind: 'prism', l: 6, w: 5, h: 4, u: 'cm', grid: false } } } },
      2: { append: [{ type: 'build', q: 'Pack a new crate: build a prism with a BASE AREA of 12 square units and a VOLUME of 36 cubic units.', target: { volume: 36, base: 12 }, max: 6, hint: 'Base area = length × width. How many layers of 12 make 36?', explain: 'Any base of 12 (like 3 × 4 or 2 × 6) with a height of 3 works: 12 × 3 = 36.' }] },
      4: { set: { visual: { kind: 'prism', boxes: [{ l: 5, w: 3, h: 2, color: 1 }, { l: 2, w: 3, h: 4, x: 5, color: 2 }], u: 'm', caption: 'The loading dock: Part A (blue) and Part B (green)' } } }
    }
  };

  FX['g5-math-aquarium-quest'] = {
    theme: 'ocean',
    stages: {
      0: { set: { visual: { kind: 'prism', l: 5, w: 4, h: 3, caption: 'The test tank filled with 1-inch cubes' } } },
      1: { patch: { 0: { visual: { kind: 'prism', l: 3, w: 2, h: 2.5, grid: false, boxes: [{ l: 3, w: 2, h: 2.5, ll: '30 cm', wl: '20 cm', hl: '25 cm' }] } } } },
      3: { append: [{ type: 'build', q: 'Design a jellyfish tank with a volume of 24 cubic feet that is DIFFERENT from 2 × 3 × 4.', target: { volume: 24, not: [2, 3, 4] }, max: 6, hint: 'Find three whole numbers that multiply to 24, like 1 × 4 × 6.', explain: 'Many shapes have a volume of 24, like 1 × 4 × 6 or 2 × 2 × 6.' }] },
      4: { set: { visual: { kind: 'prism', unit: 20, grid: false, boxes: [{ l: 5, w: 2.5, h: 2, ll: '10 m', wl: '5 m', hl: '4 m', color: 1 }, { l: 3, w: 2.5, h: 2, x: 5, ll: '6 m', wl: '', hl: '', color: 2 }], caption: 'Main tank (blue) and side tank (green)' } } }
    }
  };

  FX['g5-math-stolen-sand'] = {
    theme: 'detective',
    stages: {
      0: { set: { visual: { kind: 'prism', l: 6, w: 4, h: 1, u: 'ft', caption: 'The park sandbox' } } },
      1: { patch: { 1: F('3/4', { mixed: false }) } },
      2: { set: { visual: [{ kind: 'prism', l: 2, w: 2, h: 1, caption: 'Suspect A: wheelbarrow bin' }, { kind: 'prism', l: 3, w: 2, h: 1, caption: 'Suspect B: wagon' }, { kind: 'prism', l: 1, w: 1, h: 5, caption: 'Suspect C: tall barrel' }] } },
      3: { set: { visual: { kind: 'prism', boxes: [{ l: 3, w: 1, h: 1, color: 0 }, { l: 1, w: 3, h: 1, y: 1, color: 1, lab: false }], u: 'ft', caption: 'The L-shaped garden bed' } } },
      4: { append: [{ type: 'build', q: 'Help the park: build the new sandbox so it holds exactly 40 cubic feet.', target: { volume: 40 }, max: 8, hint: 'Try a depth of 1 foot. Which length × width makes 40?', explain: '8 × 5 × 1 = 40 cubic feet (4 × 5 × 2 works too).' }] }
    }
  };
})(window.CX_FX);
