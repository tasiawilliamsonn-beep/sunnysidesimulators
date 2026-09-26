/* Grade 6 Science: themes, simulations, diagrams, and interactive puzzles */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  var HEATING = { kind: 'chart', type: 'line', xmin: 0, xmax: 10, ymin: -40, ymax: 140, ystep: 20, unit: '°', ylabel: 'Temperature (°C)', xlabel: 'Energy added over time →', points: [[0, -20], [1.2, 0], [3, 0], [6.2, 100], [9, 100], [10, 125]], segLabels: ['Ice warming', 'Ice melting', 'Water warming', 'Water boiling', 'Steam warming'] };
  var CYCLE = { kind: 'scene', w: 620, h: 360, bg: '#DFF1FF', shapes: [
    { t: 'circle', cx: 70, cy: 60, r: 36, fill: '#FFD166', stroke: '#F4A300', sw: 4 },
    { t: 'path', d: 'M380,60 Q390,30 430,40 Q450,15 490,35 Q530,30 530,60 Q540,85 500,90 L400,90 Q370,85 380,60 Z', fill: '#FFFFFF', sw: 2.5 },
    { t: 'path', d: 'M0,290 Q150,270 300,295 L300,360 L0,360 Z', fill: '#3F8FE0', sw: 0 },
    { t: 'path', d: 'M300,295 L420,200 L620,190 L620,360 L300,360 Z', fill: '#8FBF6A', sw: 0 },
    { t: 'line', x1: 170, y1: 270, x2: 330, y2: 110, arrow: true, sw: 3, dash: '6 5' },
    { t: 'line', x1: 470, y1: 100, x2: 520, y2: 190, arrow: true, sw: 3, dash: '3 6' },
    { t: 'line', x1: 560, y1: 250, x2: 340, y2: 300, arrow: true, sw: 3 },
    { t: 'rect', id: 'evap', label: 'Evaporation', x: 130, y: 170, w: 130, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 },
    { t: 'rect', id: 'cond', label: 'Condensation', x: 390, y: 104, w: 130, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 },
    { t: 'rect', id: 'precip', label: 'Precipitation', x: 520, y: 130, w: 96, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5, lsize: 12 },
    { t: 'rect', id: 'collect', label: 'Collection', x: 400, y: 300, w: 120, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 }
  ] };
  var TRACK = { kind: 'scene', w: 620, h: 300, bg: '#EAF6FF', shapes: [
    { t: 'path', d: 'M30,60 C90,60 120,250 175,252 C230,252 270,130 320,130 C370,130 400,252 455,252 C500,252 530,205 590,205', fill: 'none', stroke: '#E63946', sw: 6 },
    { t: 'circle', id: 'A', label: 'A', cx: 40, cy: 60, r: 18, fill: '#FFD166', lsize: 16 },
    { t: 'circle', id: 'B', label: 'B', cx: 175, cy: 252, r: 18, fill: '#FFD166', lsize: 16 },
    { t: 'circle', id: 'C', label: 'C', cx: 320, cy: 130, r: 18, fill: '#FFD166', lsize: 16 },
    { t: 'circle', id: 'D', label: 'D', cx: 580, cy: 205, r: 18, fill: '#FFD166', lsize: 16 },
    { t: 'text', x: 580, y: 245, s: 'brakes', size: 12, bold: false }
  ] };
  var LODGE = { kind: 'scene', w: 620, h: 340, bg: '#FFF4E6', shapes: [
    { t: 'rect', x: 20, y: 120, w: 170, h: 200, rx: 6, fill: '#8a6a55', sw: 2.5 }, { t: 'rect', x: 45, y: 180, w: 120, h: 110, rx: 50, fill: '#2b1d16' },
    { t: 'path', d: 'M70,290 Q80,220 100,250 Q110,200 125,245 Q140,215 140,290 Z', fill: '#FF8A3D', stroke: '#E4572E', sw: 2 },
    { t: 'path', d: 'M200,200 Q230,190 240,200 M200,230 Q235,222 250,232 M200,260 Q230,254 244,262', fill: 'none', stroke: '#E4572E', sw: 3, dash: '5 5' },
    { t: 'rect', x: 330, y: 190, w: 110, h: 110, rx: 10, fill: '#b9c3cf', sw: 3 }, { t: 'path', d: 'M440,210 Q480,215 475,250 Q470,280 440,275', fill: 'none', stroke: '#1d2433', sw: 8 },
    { t: 'rect', x: 336, y: 198, w: 98, h: 20, fill: '#7a4a2a', sw: 0 },
    { t: 'path', d: 'M360,180 Q345,150 365,125 Q380,100 365,75 M395,180 Q380,150 400,125 Q415,100 400,70', fill: 'none', stroke: '#9aa3b5', sw: 4 },
    { t: 'line', x1: 420, y1: 190, x2: 470, y2: 110, sw: 6, stroke: '#6b7280' },
    { t: 'circle', id: 'fire', label: 'Fireplace glow', cx: 105, cy: 140, r: 26, fill: '#FFD166', lsize: 11, ly: 100 },
    { t: 'circle', id: 'steam', label: 'Rising steam', cx: 380, cy: 60, r: 26, fill: '#DDE7F3', lsize: 11, ly: 24 },
    { t: 'circle', id: 'spoon', label: 'Hot metal spoon', cx: 495, cy: 100, r: 26, fill: '#E5E7EB', lsize: 11, ly: 64 },
    { t: 'text', x: 385, y: 330, s: 'Metal mug of hot cocoa', size: 13, bold: false }
  ] };
  var SOURCES = { kind: 'scene', w: 620, h: 220, bg: '#F7FAF5', shapes: [
    { t: 'poly', points: '40,170 120,170 105,120 55,120', fill: '#2b2b2b' }, { t: 'rect', id: 'coal', label: 'Coal', x: 20, y: 60, w: 120, h: 130, fill: 'rgba(0,0,0,0)', sw: 0, ly: 200 },
    { t: 'line', x1: 230, y1: 180, x2: 230, y2: 80, sw: 5, stroke: '#9aa3b5' }, { t: 'path', d: 'M230,80 L230,30 M230,80 L272,102 M230,80 L188,102', fill: 'none', stroke: '#3DDC97', sw: 7 }, { t: 'rect', id: 'wind', label: 'Wind', x: 170, y: 20, w: 120, h: 170, fill: 'rgba(0,0,0,0)', sw: 0, ly: 200 },
    { t: 'path', d: 'M380,170 Q350,130 380,90 Q390,120 405,100 Q430,140 400,170 Z', fill: '#4F8FE0', stroke: '#1F5CB0', sw: 2 }, { t: 'rect', id: 'gas', label: 'Natural gas', x: 330, y: 60, w: 120, h: 130, fill: 'rgba(0,0,0,0)', sw: 0, ly: 200 },
    { t: 'rect', x: 510, y: 90, w: 60, h: 80, rx: 6, fill: '#3a3a3a' }, { t: 'rect', id: 'oil', label: 'Oil', x: 480, y: 60, w: 120, h: 130, fill: 'rgba(0,0,0,0)', sw: 0, ly: 200 }
  ] };
  var SHADOWS = { kind: 'scene', w: 620, h: 240, bg: '#0B1026', caption: 'Not to scale', dark: true, shapes: [
    { t: 'circle', cx: 40, cy: 120, r: 70, fill: '#FFD166' },
    { t: 'poly', points: '300,108 600,40 600,200 300,132', fill: 'rgba(160,170,200,.25)', sw: 0 },
    { t: 'poly', points: '300,112 560,105 560,135 300,128', fill: 'rgba(0,0,0,.85)', sw: 0 },
    { t: 'circle', cx: 300, cy: 120, r: 14, fill: '#b9b9b9' }, { t: 'text', x: 300, y: 96, s: 'Moon', fill: '#dfe6ff' },
    { t: 'circle', cx: 560, cy: 120, r: 50, fill: '#2f7ad1', op: 0.9 },
    { t: 'text', x: 470, y: 125, s: 'umbra', fill: '#fff', size: 13 }, { t: 'text', x: 520, y: 40, s: 'penumbra', fill: '#dfe6ff', size: 13 }
  ] };
  var BULGES = { kind: 'scene', w: 620, h: 280, bg: '#0B1026', shapes: [
    { t: 'ellipse', cx: 240, cy: 140, rx: 118, ry: 88, fill: '#5cc6e8', op: 0.55, sw: 0 },
    { t: 'circle', cx: 240, cy: 140, r: 78, fill: '#2f7ad1', sw: 0 },
    { t: 'path', d: 'M200,100 q30,-20 60,0 q-10,30 -40,26 z M230,170 q30,-6 40,20 q-30,14 -40,-20 z', fill: '#5fbf6a', sw: 0 },
    { t: 'circle', cx: 560, cy: 140, r: 26, fill: '#d9d9d9' }, { t: 'text', x: 560, y: 190, s: 'Moon', fill: '#dfe6ff' },
    { t: 'circle', id: 'near', label: 'W', cx: 352, cy: 140, r: 16, fill: '#FFB547', lsize: 13 },
    { t: 'circle', id: 'far', label: 'X', cx: 128, cy: 140, r: 16, fill: '#FFB547', lsize: 13 },
    { t: 'circle', id: 'top', label: 'Y', cx: 240, cy: 58, r: 16, fill: '#FFB547', lsize: 13 },
    { t: 'circle', id: 'bottom', label: 'Z', cx: 240, cy: 222, r: 16, fill: '#FFB547', lsize: 13 },
    { t: 'text', x: 240, y: 270, s: 'Ocean bulges (exaggerated) · view from above the North Pole', fill: '#dfe6ff', size: 12, bold: false }
  ] };
  var SEASONS = { kind: 'scene', w: 600, h: 300, bg: '#0B1026', shapes: [
    { t: 'circle', cx: 300, cy: 150, r: 46, fill: '#FFD166', stroke: '#F4A300', sw: 4 },
    { t: 'ellipse', cx: 300, cy: 150, rx: 230, ry: 70, fill: 'none', stroke: '#56608a', dash: '5 7', sw: 1.5 },
    { t: 'circle', cx: 80, cy: 150, r: 34, fill: '#2f7ad1', stroke: '#9ecbff', sw: 2, id: 'left', label: 'A', lc: '#fff' },
    { t: 'line', x1: 66, y1: 118, x2: 94, y2: 182, stroke: '#fff', sw: 3 }, { t: 'text', x: 60, y: 108, s: 'N', fill: '#fff' },
    { t: 'circle', cx: 520, cy: 150, r: 34, fill: '#2f7ad1', stroke: '#9ecbff', sw: 2, id: 'right', label: 'B', lc: '#fff' },
    { t: 'line', x1: 506, y1: 118, x2: 534, y2: 182, stroke: '#fff', sw: 3 }, { t: 'text', x: 500, y: 108, s: 'N', fill: '#fff' }
  ] };

  FX['g6-sci-deep-freeze'] = {
    theme: 'arctic',
    stages: {
      0: { set: { cards: [['Particles', 'All matter is made of tiny particles.'], ['Always moving', 'Particles never stop moving, even in a solid.'], ['Empty space', 'There is space between particles.'], ['Attraction', 'Particles pull on each other.']] } },
      1: { set: { sim: { kind: 'particles', start: -25, title: 'Station particle simulator: change the temperature' } } },
      3: { set: { cards: [['Condensation', 'Gas → liquid (energy removed)'], ['Freezing', 'Liquid → solid (energy removed)'], ['Deposition', 'Gas → solid (energy removed)'], ['Sublimation', 'Solid → gas (energy added)']] } },
      4: { set: { visual: HEATING }, append: [{ type: 'tap', q: 'Tap the part of the heating curve where the ice is MELTING.', visual: HEATING, answer: 's1', hint: 'Melting happens at 0 °C, and the temperature stays flat while it happens.', why: { s0: 'Here the ice is still solid and getting warmer.', s3: 'This flat part is at 100 °C: that\'s boiling.' }, explain: 'The first flat part at 0 °C is melting: energy breaks particles out of their fixed positions.' },
        { type: 'tap', q: 'Now tap the part where the water is BOILING.', visual: HEATING, answer: 's3', hint: 'Boiling happens at 100 °C.', explain: 'The flat part at 100 °C is boiling: energy lets particles escape as a gas.' }] }
    }
  };
  FX['g6-sci-deep-freeze'].stages[4].set = {};

  FX['g6-sci-vapor-quest'] = {
    theme: 'sky',
    stages: {
      0: { set: { sim: { kind: 'particles', start: -15, title: 'You are one of these particles! Warm them up.' } } },
      4: { append: [{ type: 'tap', q: 'Tap the step of the water cycle where H₂O-7 turned from water vapor into a cloud droplet.', visual: CYCLE, answer: 'cond', hint: 'Gas → liquid is called...', why: { evap: 'Evaporation is liquid → gas, when H₂O-7 left the puddle.', precip: 'Precipitation is when water falls as rain or snow.' }, explain: 'Condensation: vapor cools, slows down, and clumps into droplets.' },
        { type: 'tap', q: 'Tap the step where H₂O-7 escaped from the puddle into the air.', visual: CYCLE, answer: 'evap', hint: 'Liquid → gas at the surface.', explain: 'Evaporation: the fastest particles escape the liquid\'s surface as a gas.' }] }
    }
  };

  FX['g6-sci-molecule-museum'] = {
    theme: 'museum',
    stages: {
      0: { set: { sim: { kind: 'diffusion', title: 'Recreate the exhibit: drop dye into cold and hot water' } } },
      2: { set: { visual: [{ kind: 'cylinder', ml: 50, max: 100, step: 10, caption: '50 mL water' }, { kind: 'cylinder', ml: 50, max: 100, step: 10, caption: '50 mL alcohol' }, { kind: 'cylinder', ml: 96, max: 100, step: 10, caption: 'Mixed: about 96 mL' }] } }
    }
  };

  FX['g6-sci-coaster-lockdown'] = {
    theme: 'themepark',
    stages: {
      0: { set: { cards: [['Kinetic energy', 'Energy of motion. Faster or heavier = more.'], ['Potential energy', 'Stored energy. Higher or heavier = more.'], ['Joule (J)', 'The unit used to measure energy.']] } },
      3: { set: { sim: { kind: 'coaster', title: 'Drive the Timber Twister and watch the energy bars' } },
        append: [{ type: 'tap', q: 'Tap the point where the car has the MOST kinetic energy.', visual: TRACK, answer: 'B', hint: 'Kinetic energy is greatest where the car is moving fastest: at the bottom of the biggest drop.', why: { A: 'At the top of the first hill the car has the most POTENTIAL energy.', C: 'Climbing the second hill turned kinetic energy back into potential energy.', D: 'The brakes turn kinetic energy into heat.' }, explain: 'At B, the car has dropped the farthest, so most of its potential energy has become kinetic energy.' }] }
    }
  };

  FX['g6-sci-cold-cocoa'] = {
    theme: 'arctic',
    stages: {
      0: { set: { cards: [['Conductor', 'Lets heat move through it quickly. Metals.'], ['Insulator', 'Slows heat transfer. Foam, wood, wool, ceramic.']] } },
      2: { append: [{ type: 'tap', q: 'Look around the lodge. Tap the example of heat transfer by RADIATION.', visual: LODGE, answer: 'fire', hint: 'Radiation travels as waves, without touching and without moving air.', why: { spoon: 'The spoon heats up by touching the cocoa: conduction.', steam: 'Rising steam and warm air are convection currents.' }, explain: 'The fireplace warms faces across the room with infrared waves: radiation.' }] },
      3: { set: { visual: { kind: 'chart', type: 'bar', ymax: 70, ystep: 10, unit: '°', ylabel: 'Temperature after 10 min (°C)', caption: 'All three mugs started at 70 °C', data: [['Metal, by window', 38, '#2F6FA7'], ['Metal, by fire', 49, '#E85D75'], ['Ceramic + lid', 58, '#3F7D3A']] } } },
      4: { append: [{ type: 'tap', q: 'Final check: tap the example of CONDUCTION.', visual: LODGE, answer: 'spoon', hint: 'Conduction happens through direct contact.', explain: 'Heat moves from the hot cocoa into the metal spoon by direct contact.' }] }
    }
  };

  FX['g6-sci-power-trip'] = {
    theme: 'energy',
    stages: {
      0: { set: { visual: { kind: 'chain', items: ['Moving air (kinetic)', 'Spinning blades', 'Generator', 'Electrical energy'] } } },
      2: { set: { cards: [['Radiant', 'Light energy, like sunlight.'], ['Chemical', 'Energy stored in food, fuel, and batteries.'], ['Electrical', 'Energy of moving electric charges.'], ['Thermal', 'Energy of moving particles: heat.']] } },
      3: { append: [{ type: 'tap', q: 'Tap the RENEWABLE energy source.', visual: SOURCES, answer: 'wind', hint: 'Renewable sources won\'t run out.', why: { coal: 'Coal takes millions of years to form: nonrenewable.', gas: 'Natural gas is a fossil fuel: nonrenewable.', oil: 'Oil is a fossil fuel: nonrenewable.' }, explain: 'Wind will keep blowing, so it is renewable.' }] }
    }
  };

  FX['g6-sci-eclipse-chasers'] = {
    theme: 'space',
    stages: {
      0: { set: { sim: { kind: 'moonphase', eclipse: true, start: 20, title: 'Line up the Sun, Earth, and Moon (try new moon and full moon)' } } },
      1: { set: { visual: SHADOWS } },
      2: { append: [{ type: 'tap', q: 'Tap the Moon position where a SOLAR eclipse can happen.', visual: { kind: 'orbit8', dark: true }, answer: 'p0', hint: 'The Moon must be between the Sun and Earth.', why: { p4: 'Here Earth is between the Sun and Moon. That could make a LUNAR eclipse.' }, explain: 'Position A is the new moon, between the Sun and Earth, where its shadow can fall on Earth.' }] },
      3: { append: [{ type: 'tap', q: 'Now tap the Moon position where a LUNAR eclipse can happen.', visual: { kind: 'orbit8', dark: true }, answer: 'p4', hint: 'Earth must be between the Sun and the Moon.', explain: 'Position E is the full moon, on the far side of Earth, where Earth\'s shadow can fall on it.' }] }
    }
  };

  FX['g6-sci-gravity-station'] = {
    theme: 'space',
    stages: {
      0: { set: { cards: [['More mass', 'Stronger gravity.'], ['More distance', 'Weaker gravity.'], ['Gravity is mutual', 'Earth pulls on you, and you pull on Earth.']] } },
      2: { set: { sim: { kind: 'orbit', title: 'Newton\'s cannon: find the speed that makes an orbit' } } },
      3: { set: { visual: { kind: 'balance', left: ['x'], right: [], label: '' } } }
    }
  };
  delete FX['g6-sci-gravity-station'].stages[3];

  FX['g6-sci-tides-quest'] = {
    theme: 'ocean',
    stages: {
      0: { append: [{ type: 'tap', q: 'The Moon is to the right. Tap a place on Earth that is having HIGH tide right now.', visual: BULGES, answer: ['near', 'far'], hint: 'High tides happen under the two ocean bulges.', why: { top: 'Y is between the bulges: low tide.', bottom: 'Z is between the bulges: low tide.' }, explain: 'Both W (facing the Moon) and X (the far side) are under ocean bulges, so both have high tide.' }] },
      2: { set: { sim: { kind: 'moonphase', start: 200, title: 'Move the Moon and watch the phase from Earth' } } },
      3: { append: [{ type: 'tap', q: 'Tap the Earth that shows JUNE: summer in the Northern Hemisphere.', visual: SEASONS, answer: 'left', hint: 'In June, the North Pole (N) tilts toward the Sun.', why: { right: 'Here the North Pole tilts away from the Sun: December.' }, explain: 'At Earth A the Northern Hemisphere leans toward the Sun, getting direct rays and long days.' }] }
    }
  };
})(window.CX_FX);
