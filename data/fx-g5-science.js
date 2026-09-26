/* Grade 5 Science: themes, visuals, simulations, and interactive puzzles */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function node(id, label, cx, cy, fill) { return { t: 'rect', id: id, label: label, x: cx - 62, y: cy - 20, w: 124, h: 40, rx: 10, fill: fill || '#FFF8E1', sw: 2.5 }; }
  function arrow(x1, y1, x2, y2) { return { t: 'line', x1: x1, y1: y1, x2: x2, y2: y2, arrow: true, sw: 3 }; }
  var CONTAINERS = { kind: 'scene', w: 600, h: 260, bg: '#F4F8FB', shapes: [
    { t: 'rect', x: 72, y: 130, w: 106, h: 78, fill: '#e8e2c8', sw: 0 },
    { t: 'path', id: 'open', label: 'Open cup', showLabel: false, d: 'M70,70 V200 Q70,210 80,210 H170 Q180,210 180,200 V70', fill: 'rgba(143,211,244,.35)', sw: 3 },
    { t: 'text', x: 125, y: 240, s: 'Open cup' },
    { t: 'rect', x: 252, y: 130, w: 106, h: 78, fill: '#e8e2c8', sw: 0 },
    { t: 'path', id: 'sealed', label: 'Jar with lid', showLabel: false, d: 'M250,60 H360 V200 Q360,210 350,210 H260 Q250,210 250,200 Z', fill: 'rgba(143,211,244,.35)', sw: 3 },
    { t: 'rect', x: 244, y: 56, w: 122, h: 12, rx: 3, fill: '#1d2433' },
    { t: 'text', x: 305, y: 240, s: 'Jar with lid screwed on' },
    { t: 'rect', x: 440, y: 160, w: 90, h: 38, fill: '#e8e2c8', sw: 0 },
    { t: 'path', id: 'bowl', label: 'Open bowl', showLabel: false, d: 'M430,150 Q430,210 485,210 Q540,210 540,150 Z', fill: 'rgba(143,211,244,.35)', sw: 3 },
    { t: 'text', x: 485, y: 240, s: 'Wide open bowl' }
  ] };

  FX['g5-sci-melting-lab'] = {
    theme: 'lab',
    stages: {
      0: { append: [{ type: 'input', q: 'Dr. Ortiz filled this graduated cylinder. How many milliliters of water are in it? Read the bottom of the curved surface.', visual: { kind: 'cylinder', ml: 65, max: 100, step: 10 }, answer: ['65'], unit: 'mL', hint: 'Each long line is 10 mL. The short lines in between are 5 mL.', explain: 'The water is halfway between 60 and 70, at 65 mL.' }] },
      1: { set: { cards: [['Magnetism', 'A magnet pulls on it. Iron and steel are magnetic.'], ['Conductivity', 'Heat or electricity passes through it easily. Metals conduct.'], ['Solubility', 'It dissolves in water, like sugar or salt.'], ['Hardness', 'How easily it scratches or gets scratched.']] } },
      2: { set: { sim: { kind: 'mix', start: 'melt', title: 'Test it: melt ice on a digital scale' } } },
      3: { set: { sim: { kind: 'mix', start: 'fizz', title: 'Run Dr. Ortiz\'s fizzing experiment (try it open and sealed)' } } },
      4: { append: [{ type: 'tap', q: 'Dr. Ortiz wants to prove that mass is conserved when baking soda and vinegar fizz. Which container should she use?', visual: CONTAINERS, answer: 'sealed', tip: 'Tap the container.', hint: 'Fizzing makes a gas. Which container keeps the gas from escaping?', why: { open: 'The gas would escape into the air, and the scale would read less.', bowl: 'A wide bowl lets the gas escape even faster.' }, explain: 'Only a sealed container makes a closed system, so the gas stays and the mass stays the same.' }] }
    }
  };

  FX['g5-sci-matter-museum'] = {
    theme: 'museum',
    stages: {
      0: { set: { cards: [['Solid', 'Keeps its own shape and volume. Example: a rock.'], ['Liquid', 'Keeps its volume but takes the shape of its container. Example: juice.'], ['Gas', 'Spreads out to fill any container. Example: air in a balloon.']] } },
      2: {
        set: { visual: { kind: 'prism', l: 3, w: 3, h: 3, u: 'cm', caption: 'The gold-colored cube' } },
        patch: { 1: { replace: { type: 'input', q: 'The cylinder held 40 mL of water. Then a rock was dropped in. Read the cylinder now. What is the rock\'s volume?', visual: { kind: 'cylinder', ml: 55, max: 100, step: 10, rock: true }, answer: ['15'], unit: 'mL', hint: 'Read the new water level, then subtract the 40 mL that was there before.', explain: 'The water rose from 40 mL to 55 mL, so the rock takes up 15 mL of space.' } } }
      },
      3: { set: { sim: { kind: 'particles', start: -20, title: 'Heat and cool the water particles' } } }
    }
  };

  FX['g5-sci-missing-mass'] = {
    theme: 'detective',
    stages: {
      0: { set: { sim: { kind: 'mix', start: 'dissolve', title: 'Recreate Maya\'s experiment' } } },
      1: { set: { visual: { kind: 'scene', w: 560, h: 230, bg: '#F4F8FB', caption: 'Jamal\'s sealed container before and after', shapes: [
        { t: 'rect', x: 60, y: 40, w: 150, h: 130, rx: 10, fill: '#ffffff', sw: 3 },
        { t: 'rect', x: 64, y: 44, w: 142, h: 122, rx: 8, fill: '#eef6fb', sw: 0 },
        { t: 'circle', cx: 100, cy: 90, r: 22, fill: '#fff', stroke: '#b7c7d6' }, { t: 'circle', cx: 150, cy: 80, r: 26, fill: '#fff', stroke: '#b7c7d6' }, { t: 'circle', cx: 125, cy: 130, r: 28, fill: '#fff', stroke: '#b7c7d6' },
        { t: 'rect', x: 50, y: 172, w: 170, h: 22, rx: 5, fill: '#6b7280', label: '620 g', lc: '#7CFFB2' },
        { t: 'text', x: 135, y: 222, s: 'Before: fluffy snow' },
        { t: 'line', x1: 240, y1: 110, x2: 320, y2: 110, arrow: true, sw: 4 },
        { t: 'rect', x: 350, y: 40, w: 150, h: 130, rx: 10, fill: '#ffffff', sw: 3 },
        { t: 'rect', x: 354, y: 110, w: 142, h: 56, fill: '#8FD3F4', sw: 0 },
        { t: 'rect', x: 340, y: 172, w: 170, h: 22, rx: 5, fill: '#6b7280', label: '620 g', lc: '#7CFFB2' },
        { t: 'text', x: 425, y: 222, s: 'After: water, half as tall' }
      ] } } },
      2: { set: { sim: { kind: 'mix', start: 'fizz', title: 'Recreate Lily\'s experiment (try open and sealed)' } } },
      4: { append: [{ type: 'highlight', q: 'The judge\'s report is almost done. Tap the sentence that explains where Lily\'s "missing" mass went.', segments: ['Maya\'s sugar dissolved and spread out in the water.', 'Jamal\'s snow melted and took up less space.', 'Lily\'s fizzing made a gas that escaped into the air.', 'The scale in the gym was brand new.'], answer: [2], block: true, hint: 'Lily\'s cup lost mass. Which sentence says where matter went?', explain: 'The fizzing made carbon dioxide gas, and in the open cup that gas escaped. The matter still exists.' }] }
    }
  };

  FX['g5-sci-solar-tour'] = {
    theme: 'space',
    stages: {
      0: { set: { cards: [['Star', 'A giant ball of hot gas that makes its own light. The Sun is our closest star.'], ['Planet', 'A large round object that orbits a star and does not make its own light.'], ['Gravity', 'The pull that keeps the planets in orbit around the Sun.']] } },
      1: { set: { visual: { kind: 'solar', dark: true, caption: 'The solar system (not to scale)' } } },
      2: { append: [{ type: 'tap', q: 'Tap the last rocky planet before the asteroid belt.', visual: { kind: 'solar', dark: true }, answer: 'Mars', hint: 'The asteroid belt is between the fourth and fifth planets.', explain: 'Mars is the fourth planet. The asteroid belt lies between Mars and Jupiter.' }] },
      3: { patch: { 1: { replace: { type: 'tap', q: 'Tap the planet that takes the LONGEST to travel once around the Sun.', visual: { kind: 'solar', dark: true }, answer: 'Neptune', hint: 'The farther a planet is from the Sun, the longer its orbit.', why: { Jupiter: 'Jupiter is the biggest, but not the farthest.', Saturn: 'Saturn takes about 29 years. One planet is even farther out.' }, explain: 'Neptune is farthest from the Sun, so its orbit is longest: about 165 Earth years.' } } },
        append: [{ type: 'tap', q: 'Tap the largest planet in the solar system. (Numbers show the order from the Sun.)', visual: { kind: 'solar', dark: true, names: false }, answer: 'Jupiter', hint: 'It is the fifth planet, just past the asteroid belt.', explain: 'Jupiter is the largest planet. More than 1,300 Earths could fit inside it.' }] },
      4: { set: { cards: [['Rotation', 'Spinning on an axis. Earth rotates once about every 24 hours.'], ['Revolution', 'Traveling in an orbit. Earth revolves around the Sun in about 365 days.']] } }
    }
  };

  var SEASONS = { kind: 'scene', w: 600, h: 300, bg: '#0B1026', shapes: [
    { t: 'circle', cx: 300, cy: 150, r: 46, fill: '#FFD166', stroke: '#F4A300', sw: 4 },
    { t: 'text', x: 300, y: 216, s: 'Sun', fill: '#FFD166' },
    { t: 'ellipse', cx: 300, cy: 150, rx: 230, ry: 70, fill: 'none', stroke: '#56608a', dash: '5 7', sw: 1.5 },
    { t: 'circle', cx: 80, cy: 150, r: 34, fill: '#2f7ad1', stroke: '#9ecbff', sw: 2, id: 'left', label: 'A', lc: '#fff' },
    { t: 'line', x1: 66, y1: 118, x2: 94, y2: 182, stroke: '#fff', sw: 3 },
    { t: 'text', x: 60, y: 108, s: 'N', fill: '#fff' },
    { t: 'circle', cx: 520, cy: 150, r: 34, fill: '#2f7ad1', stroke: '#9ecbff', sw: 2, id: 'right', label: 'B', lc: '#fff' },
    { t: 'line', x1: 506, y1: 118, x2: 534, y2: 182, stroke: '#fff', sw: 3 },
    { t: 'text', x: 500, y: 108, s: 'N', fill: '#fff' },
    { t: 'text', x: 300, y: 285, s: 'Earth\'s axis always tilts the same direction in space', fill: '#dfe6ff', size: 13, bold: false }
  ] };
  FX['g5-sci-shadow-clock'] = {
    theme: 'observatory',
    stages: {
      0: { set: { cards: [['Rotate', 'Spin on an axis. One spin = one day.'], ['East', 'Where the Sun appears to rise.'], ['West', 'Where the Sun appears to set.']] } },
      1: { set: { sim: { kind: 'shadow', title: 'Move the Sun across the sky and watch the shadow' } } },
      2: { append: [{ type: 'tap', q: 'Which Earth shows summer in Indiana (the Northern Hemisphere)? Look at where the North Pole (N) is tilted.', visual: SEASONS, answer: 'left', tip: 'Tap Earth A or Earth B.', hint: 'Summer happens when your hemisphere tilts TOWARD the Sun.', why: { right: 'At Earth B, the North Pole tilts away from the Sun. That is winter in Indiana.' }, explain: 'At Earth A the Northern Hemisphere leans toward the Sun, getting more direct light and longer days: summer.' }] }
    }
  };

  FX['g5-sci-moon-quest'] = {
    theme: 'night',
    stages: {
      0: { set: { sim: { kind: 'moonphase', start: 45, title: 'Move the Moon around Earth and watch its phase change' } } },
      2: { patch: { 0: { visual: { kind: 'moon', phase: 2, caption: 'Tonight: first quarter', dark: true } } } },
      3: { append: [{ type: 'tap', q: 'Sunlight comes from the left. Tap the position where the Moon must be for us to see a FULL moon.', visual: { kind: 'orbit8', dark: true }, answer: 'p4', hint: 'For a full moon, Earth is between the Sun and the Moon.', why: { p0: 'Here the Moon is between the Sun and Earth. The lit side faces away from us: new moon.', p2: 'Here we see half of the lit side: a quarter moon.', p6: 'Here we see half of the lit side: a quarter moon.' }, explain: 'On the far side of Earth from the Sun, we see the Moon\'s whole sunlit half.' },
        { type: 'tap', q: 'Now tap the position for a NEW moon.', visual: { kind: 'orbit8', dark: true }, answer: 'p0', hint: 'The Moon is between the Sun and Earth.', explain: 'The Moon is between the Sun and Earth, so its lit side faces away from us.' }] }
    }
  };

  var PRAIRIE = { kind: 'scene', w: 600, h: 360, bg: '#F6F3E4', shapes: [
    arrow(270, 300, 170, 242), arrow(330, 300, 440, 242), arrow(140, 200, 140, 132), arrow(190, 96, 250, 60), arrow(440, 200, 340, 62), arrow(480, 200, 480, 112),
    node('grass', 'Prairie grass', 300, 320, '#CFE8B0'), node('grasshopper', 'Grasshopper', 140, 220), node('rabbit', 'Rabbit', 460, 220),
    node('meadowlark', 'Meadowlark', 140, 110), node('coyote', 'Coyote', 300, 40), node('fox', 'Red fox', 480, 90),
    { t: 'text', x: 560, y: 350, s: 'Arrows point to the eater', size: 12, bold: false, anchor: 'end' }
  ] };
  FX['g5-sci-habitat-hike'] = {
    theme: 'forest',
    stages: {
      0: { set: { cards: [['Producer', 'Makes its own food from sunlight. Oak trees, grass, algae.'], ['Consumer', 'Eats other living things. Deer, hawks, people.'], ['Decomposer', 'Breaks down dead matter. Mushrooms, bacteria, worms.']] } },
      3: { append: [{ type: 'tap', q: 'Tap the animal in this food web that eats BOTH rabbits and meadowlarks.', visual: PRAIRIE, answer: 'coyote', hint: 'Follow the arrows that start at the rabbit and at the meadowlark.', why: { fox: 'The fox eats rabbits, but no arrow goes from the meadowlark to the fox.', grass: 'Grass is a producer. It doesn\'t eat animals.' }, explain: 'Arrows from both the rabbit and the meadowlark point to the coyote.' },
        { type: 'tap', q: 'Tap the producer in this food web.', visual: PRAIRIE, answer: 'grass', hint: 'Producers make their own food from sunlight.', explain: 'Prairie grass makes its own food through photosynthesis. Every chain starts there.' }] }
    }
  };

  FX['g5-sci-food-web-crash'] = {
    theme: 'ocean',
    stages: {
      1: { set: { cards: [['Native species', 'A living thing that naturally belongs in an ecosystem.'], ['Invasive species', 'A living thing brought to a new place, where it spreads and causes harm.']] } },
      2: { append: [{ type: 'tap', q: 'Here is the DNR\'s survey this year. Tap the population that INCREASED.', visual: { kind: 'chart', type: 'bar', ymax: 100, ystep: 25, ylabel: 'Population (relative)', data: [['Algae', 90, '#6FA23A', '▲ 90'], ['Zooplankton', 30, '#8FD3F4'], ['Bluegill', 40, '#1F6FD1'], ['Bass', 35, '#0B3148']] }, answer: 'b0', hint: 'Look for the up arrow.', explain: 'With fewer zooplankton eating it, the algae grew out of control.' }] },
      3: { set: { sim: { kind: 'populations', title: 'Release invasive fish and watch the whole food web change' } } }
    }
  };

  FX['g5-sci-decomposer-dash'] = {
    theme: 'soil',
    stages: {
      0: { set: { visual: { kind: 'scene', w: 600, h: 250, bg: '#EAF6FF', caption: 'Photosynthesis in a maple leaf', shapes: [
        { t: 'circle', cx: 60, cy: 50, r: 30, fill: '#FFD166', stroke: '#F4A300', sw: 3 },
        { t: 'path', d: 'M300,40 Q420,90 380,190 Q300,230 230,170 Q190,90 300,40 Z', fill: '#6FA23A', sw: 3 },
        { t: 'path', d: 'M300,45 Q300,130 290,210', fill: 'none', stroke: '#3d6b1f', sw: 3 },
        arrow(95, 62, 225, 110), { t: 'text', x: 150, y: 70, s: 'sunlight', size: 14 },
        arrow(60, 200, 220, 170), { t: 'text', x: 110, y: 222, s: 'water (from roots)', size: 14 },
        arrow(60, 140, 220, 140), { t: 'text', x: 120, y: 132, s: 'carbon dioxide', size: 14 },
        arrow(400, 110, 540, 80), { t: 'text', x: 500, y: 66, s: 'oxygen', size: 14 },
        arrow(390, 170, 540, 190), { t: 'text', x: 490, y: 214, s: 'sugar (food)', size: 14 }
      ] } } },
      1: { set: { cards: [['Fungi', 'Grow thread-like roots into dead wood and digest it.'], ['Bacteria', 'Too small to see, but they break down soft dead matter.'], ['Earthworms', 'Eat dead leaves and soil, mixing nutrients back in.'], ['Millipedes', 'Chew rotting wood and leaves into tiny pieces.']] } },
      3: { append: [{ type: 'tap', q: 'Tap the level of the energy pyramid that holds the MOST energy.', visual: { kind: 'pyramid', levels: ['Owl', 'Snakes', 'Salamanders', 'Beetle larvae', 'Plants & rotting wood'], colors: ['#7A1E2B', '#C0603F', '#D6A93A', '#6FA23A', '#3F7D3A'] }, answer: 'L4', hint: 'Energy is lost at every step up the pyramid.', why: { L0: 'The top predator gets the LEAST energy: only a small fraction passes all the way up.' }, explain: 'The bottom level has the most energy. About 90% is lost as heat at each step up.' }] }
    }
  };
})(window.CX_FX);
