/* Grade 5 Social Studies: themes, maps, timelines, and interactive puzzles */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function hit(id, label, x, y, w, h) { return { t: 'rect', id: id, label: label, showLabel: false, x: x, y: y, w: w, h: h, fill: 'rgba(0,0,0,0)', sw: 0 }; }
  function town(id, label, cx, cy, lx, ly) { return { t: 'circle', id: id, label: label, cx: cx, cy: cy, r: 13, fill: '#7A1F1F', stroke: '#fff', sw: 3, lx: lx != null ? lx : cx, ly: ly != null ? ly : cy - 22, lc: '#2B1E10' }; }

  var COLONIES = { kind: 'scene', w: 600, h: 420, bg: '#BFE3F3', shapes: [
    { t: 'poly', points: '0,0 230,0 210,40 150,120 130,220 120,420 0,420', fill: '#E7DDBF', sw: 0 },
    { t: 'poly', id: 'ne', label: 'New England', points: '220,20 350,14 385,70 350,120 250,130 205,75', fill: '#C9E4B4', sw: 2.5 },
    { t: 'poly', id: 'mid', label: 'Middle', points: '160,135 250,130 350,120 330,200 230,215 150,195', fill: '#F4D58D', sw: 2.5 },
    { t: 'poly', id: 'south', label: 'Southern', points: '130,205 230,215 330,200 300,300 245,395 130,395', fill: '#F2B38A', sw: 2.5, ly: 330 },
    { t: 'circle', cx: 338, cy: 88, r: 6, fill: '#2B1E10' }, { t: 'text', x: 395, y: 92, s: 'Boston', size: 13 },
    { t: 'circle', cx: 300, cy: 172, r: 6, fill: '#2B1E10' }, { t: 'text', x: 372, y: 176, s: 'Philadelphia', size: 13 },
    { t: 'circle', cx: 292, cy: 250, r: 6, fill: '#2B1E10' }, { t: 'text', x: 368, y: 254, s: 'Williamsburg', size: 13 },
    { t: 'circle', cx: 258, cy: 340, r: 6, fill: '#2B1E10' }, { t: 'text', x: 322, y: 344, s: 'Charleston', size: 13 },
    { t: 'text', x: 500, y: 230, s: 'ATLANTIC', size: 18, fill: '#1F5C73' }, { t: 'text', x: 500, y: 252, s: 'OCEAN', size: 18, fill: '#1F5C73' },
    { t: 'text', x: 60, y: 60, s: 'Appalachian', size: 12, fill: '#6b5a3a' }, { t: 'text', x: 60, y: 76, s: 'Mountains', size: 12, fill: '#6b5a3a' },
    { t: 'text', x: 560, y: 405, s: 'Not to scale', size: 11, bold: false, anchor: 'end' }
  ] };
  var TRADE = { kind: 'scene', w: 620, h: 380, bg: '#BFE3F3', shapes: [
    { t: 'poly', points: '0,40 150,30 190,120 170,260 120,380 0,380', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'text', x: 80, y: 200, s: 'The colonies', size: 15 },
    { t: 'poly', points: '420,0 620,0 620,120 520,150 450,110', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'text', x: 540, y: 60, s: 'Britain', size: 15 },
    { t: 'poly', points: '470,200 620,190 620,380 500,380 450,290', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'text', x: 550, y: 300, s: 'West Africa', size: 15 },
    { t: 'line', x1: 190, y1: 110, x2: 440, y2: 80, arrow: true, sw: 4 },
    { t: 'line', x1: 470, y1: 150, x2: 500, y2: 190, arrow: true, sw: 4 },
    { t: 'line', x1: 460, y1: 290, x2: 190, y2: 230, arrow: true, sw: 4 },
    { t: 'rect', id: 'r1', label: 'Route 1', x: 260, y: 70, w: 100, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 },
    { t: 'rect', id: 'r2', label: 'Route 2', x: 500, y: 150, w: 100, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 },
    { t: 'rect', id: 'r3', label: 'Route 3', x: 270, y: 250, w: 100, h: 34, rx: 8, fill: '#FFF8E1', sw: 2.5 },
    { t: 'text', x: 310, y: 130, s: 'furs, lumber, tobacco', size: 12, bold: false },
    { t: 'text', x: 320, y: 305, s: 'enslaved Africans (forced voyage)', size: 12, bold: false },
    { t: 'text', x: 520, y: 215, s: 'cloth, guns, tools', size: 12, bold: false, anchor: 'end' }
  ] };
  FX['g5-ss-colonial-roadtrip'] = {
    theme: 'travel',
    stages: {
      0: { set: { visual: Object.assign({ caption: 'Your route: Boston → Philadelphia → Williamsburg → Charleston' }, COLONIES) } },
      1: { append: [{ type: 'tap', q: 'Tap the colonial region known as the "breadbasket" colonies.', visual: COLONIES, answer: 'mid', hint: 'Philadelphia was in this region. Its fertile soil grew huge amounts of wheat.', why: { ne: 'New England\'s rocky soil made large farms hard.', south: 'The South grew cash crops like tobacco and rice, not mostly grain.' }, explain: 'The Middle colonies grew so much wheat, corn, and oats that people called them the breadbasket.' }] },
      2: { append: [{ type: 'highlight', q: 'Tap the THREE cash crops in this sentence from your travel notes.', segments: ['Plantations in the South grew', 'tobacco,', 'rice,', 'and indigo', 'to sell in Europe,', 'while families also raised', 'chickens', 'for their own meals.'], answer: [1, 2, 3], hint: 'A cash crop is grown to SELL.', explain: 'Tobacco, rice, and indigo were grown to sell in Europe. The chickens were food for the family.' }] },
      3: { append: [{ type: 'tap', q: 'Tap the route that shows the Middle Passage.', visual: TRADE, answer: 'r3', hint: 'The Middle Passage carried enslaved Africans across the Atlantic to the Americas.', explain: 'Route 3, from West Africa to the Americas, was the brutal forced voyage called the Middle Passage.' }] },
      4: { append: [{ type: 'tap', q: 'One last check for your report: tap the region where whaling, fishing, and shipbuilding were the main jobs.', visual: COLONIES, answer: 'ne', hint: 'This region had rocky soil, cold winters, and forests for building ships.', explain: 'New England turned to the sea because its rocky soil made farming hard.' }] }
    }
  };

  var REGIONS = { kind: 'scene', w: 620, h: 420, bg: '#BFE3F3', shapes: [
    { t: 'poly', id: 'arctic', label: 'Arctic', points: '40,20 580,20 560,90 420,110 250,100 120,112 40,82', fill: '#EEF7FB', sw: 2.5 },
    { t: 'poly', id: 'pnw', label: 'Pacific NW', points: '40,82 120,112 150,230 112,300 58,232', fill: '#9CCB9C', sw: 2.5, lx: 98, ly: 200 },
    { t: 'poly', id: 'plains', label: 'Great Plains', points: '150,120 330,118 352,330 192,330 160,230', fill: '#F2D58A', sw: 2.5 },
    { t: 'poly', id: 'sw', label: 'Southwest', points: '112,300 160,230 192,330 262,330 250,400 120,400', fill: '#E9A36B', sw: 2.5, lx: 186, ly: 370 },
    { t: 'poly', id: 'ew', label: 'Eastern Woodlands', points: '330,118 420,110 560,90 580,200 540,380 352,330', fill: '#A8D08D', sw: 2.5 },
    { t: 'text', x: 600, y: 410, s: 'Simplified map of culture regions', size: 11, bold: false, anchor: 'end' }
  ] };
  FX['g5-ss-native-gallery'] = {
    theme: 'museum',
    stages: {
      0: { set: { cards: [['Corn', 'Grows tall and gives beans a pole to climb.'], ['Beans', 'Add nutrients (nitrogen) to the soil that help the other plants grow.'], ['Squash', 'Big leaves shade the ground, keeping it moist and blocking weeds.']] },
        append: [{ type: 'tap', q: 'Tap the culture region that includes present-day Indiana.', visual: REGIONS, answer: 'ew', hint: 'Indiana is east of the Mississippi River, in a region of thick forests.', explain: 'Indiana is in the Eastern Woodlands, home to the Miami, Potawatomi, Shawnee, and others.' }] },
      2: { append: [{ type: 'tap', q: 'Tap the culture region where people built multi-story adobe pueblos.', visual: REGIONS, answer: 'sw', hint: 'Adobe is made of sun-dried clay. Think hot and dry.', why: { plains: 'Plains peoples used movable tipis to follow the bison.' }, explain: 'The hot, dry Southwest had clay for adobe, and thick adobe walls stay cool.' }] },
      4: { append: [{ type: 'tap', q: 'Tap the region where people relied on the bison for food, clothing, and shelter.', visual: REGIONS, answer: 'plains', hint: 'This region is a huge grassland in the middle of the continent.', explain: 'Bison herds roamed the Great Plains grasslands.' }] }
    }
  };

  var COMPASS = { kind: 'scene', w: 420, h: 340, bg: '#F4E7C8', shapes: [
    { t: 'circle', cx: 210, cy: 170, r: 118, fill: '#fff8e6', stroke: '#2A1A0E', sw: 3 },
    { t: 'circle', cx: 210, cy: 170, r: 96, fill: 'none', stroke: '#8C2F1E', sw: 1.5, dash: '4 4' },
    { t: 'poly', points: '210,60 226,170 210,280 194,170', fill: '#8C2F1E', sw: 2 },
    { t: 'poly', points: '100,170 210,154 320,170 210,186', fill: '#2A1A0E', sw: 2 },
    { t: 'circle', id: 'N', label: 'N', cx: 210, cy: 34, r: 24, fill: '#E2B046', lsize: 20 },
    { t: 'circle', id: 'E', label: 'E', cx: 350, cy: 170, r: 24, fill: '#E2B046', lsize: 20 },
    { t: 'circle', id: 'S', label: 'S', cx: 210, cy: 306, r: 24, fill: '#E2B046', lsize: 20 },
    { t: 'circle', id: 'W', label: 'W', cx: 70, cy: 170, r: 24, fill: '#E2B046', lsize: 20 }
  ] };
  FX['g5-ss-explorer-escape'] = {
    theme: 'ship',
    stages: {
      0: { set: { cards: [['Gold', 'Riches and a faster trade route to Asia\'s spices and silk.'], ['Glory', 'Fame and power for the explorer and the country.'], ['God', 'Spreading Christianity to new lands.']] } },
      1: { append: [{ type: 'numberline', q: 'The captain\'s map is torn. Place Jacques Cartier\'s voyage up the St. Lawrence River (1534) on the timeline.', min: 1480, max: 1620, ticks: 14, minor: 2, labels: [0, 2, 4, 6, 8, 10, 12, 14], snap: 1, tol: 3, answer: 1534, fmt: 'int', hint: '1534 is a little less than halfway between 1520 and 1540.', explain: 'Cartier sailed for France in 1534, about 42 years after Columbus.' }] },
      3: { set: { cards: [['Compass', 'A magnetic needle always points north.'], ['Astrolabe', 'Measures the angle of the Sun or stars to find latitude.'], ['Caravel', 'A small, fast ship with triangle sails that could sail into the wind.']] },
        append: [{ type: 'tap', q: 'To reach the Americas from Spain, the ship must sail across the Atlantic toward the setting Sun. Tap that direction on the compass rose.', visual: COMPASS, answer: 'W', hint: 'The Sun sets in the ___.', explain: 'The Americas are west of Europe, so explorers sailed west.' }] }
    }
  };

  FX['g5-ss-escape-1776'] = {
    theme: 'parchment',
    stages: {
      2: { append: [{ type: 'numberline', q: 'One event fell off the timeline! Place the Boston Tea Party (1773) where it belongs.', min: 1760, max: 1790, ticks: 6, minor: 5, snap: 1, tol: 0.5, answer: 1773, fmt: 'int', hint: 'Each small tick is one year. Count 3 ticks past 1770.', explain: '1773: three years after the Boston Massacre and two years before Lexington and Concord.' }] },
      3: { patch: { 2: { replace: { type: 'highlight', q: 'Tap the THREE unalienable rights named in this famous sentence.', segments: ['We hold these truths to be self-evident,', 'that all men are created equal,', 'that they are endowed by their Creator with certain unalienable Rights,', 'that among these are', 'Life,', 'Liberty', 'and the pursuit of Happiness.'], answer: [4, 5, 6], hint: 'Look right after the words "among these are."', explain: 'Life, Liberty, and the pursuit of Happiness: rights the Declaration says no government can take away.' } } } },
      4: { append: [{ type: 'order', q: 'Restore the rest of the timeline. Put these events of the war in order.', items: ['Washington crosses the Delaware (1776)', 'Victory at Saratoga (1777)', 'Clark captures Vincennes (1779)', 'British surrender at Yorktown (1781)', 'Treaty of Paris (1783)'], hint: 'Use the years on each card.' }] }
    }
  };

  var LANTERNS = { kind: 'scene', w: 600, h: 320, bg: '#1B2340', shapes: [
    { t: 'rect', x: 90, y: 140, w: 120, h: 160, fill: '#E9DAB4' }, { t: 'poly', points: '90,140 150,20 210,140', fill: '#8B1E16' },
    { t: 'rect', x: 125, y: 160, w: 50, h: 70, rx: 25, fill: '#0f152b' }, { t: 'circle', cx: 150, cy: 195, r: 13, fill: '#FFD166', stroke: '#F4A300', sw: 3 },
    { t: 'text', x: 150, y: 318, s: 'Steeple A', fill: '#F2E6CF' },
    { t: 'rect', x: 390, y: 140, w: 120, h: 160, fill: '#E9DAB4' }, { t: 'poly', points: '390,140 450,20 510,140', fill: '#8B1E16' },
    { t: 'rect', x: 415, y: 160, w: 70, h: 70, rx: 25, fill: '#0f152b' }, { t: 'circle', cx: 435, cy: 195, r: 13, fill: '#FFD166', stroke: '#F4A300', sw: 3 }, { t: 'circle', cx: 465, cy: 195, r: 13, fill: '#FFD166', stroke: '#F4A300', sw: 3 },
    { t: 'text', x: 450, y: 318, s: 'Steeple B', fill: '#F2E6CF' },
    hit('one', 'Steeple A, one lantern', 80, 10, 140, 300), hit('two', 'Steeple B, two lanterns', 380, 10, 140, 300)
  ] };
  var RIDE = { kind: 'scene', w: 620, h: 300, bg: '#E9DAB4', shapes: [
    { t: 'path', d: 'M60,230 Q100,200 150,170', fill: 'none', stroke: '#1F5C73', sw: 8 },
    { t: 'path', d: 'M150,170 Q250,110 370,120', fill: 'none', stroke: '#A8261C', sw: 4 },
    { t: 'path', d: 'M80,240 Q220,250 370,130', fill: 'none', stroke: '#2C3E6B', sw: 4, dash: '8 6' },
    { t: 'path', d: 'M370,120 Q450,100 540,130', fill: 'none', stroke: '#2A2014', sw: 4, dash: '3 6' },
    town('boston', 'Boston', 80, 240, 80, 272), town('charlestown', 'Charlestown', 150, 170, 150, 150), town('lexington', 'Lexington', 370, 125, 370, 162), town('concord', 'Concord', 540, 130, 540, 166),
    { t: 'text', x: 250, y: 100, s: 'Revere', size: 13, fill: '#A8261C' }, { t: 'text', x: 240, y: 232, s: 'Dawes', size: 13, fill: '#2C3E6B' }, { t: 'text', x: 460, y: 96, s: 'Prescott', size: 13 },
    { t: 'text', x: 100, y: 200, s: 'Charles River', size: 11, bold: false, fill: '#1F5C73' }
  ] };
  FX['g5-ss-midnight-messenger'] = {
    theme: 'detective',
    stages: {
      0: { append: [{ type: 'tap', q: 'Robert Newman climbs the Old North Church to send the signal. The British are crossing the river by boat. Tap the steeple showing the correct signal.', visual: LANTERNS, answer: 'two', hint: '"One if by land, two if by sea."', why: { one: 'One lantern meant the British were coming by land.' }, explain: 'Two lanterns meant "by sea," across the Charles River.' }] },
      1: { append: [{ type: 'tap', q: 'Revere and Dawes were stopped by a British patrol. Tap the town that only Samuel Prescott reached to spread the warning.', visual: RIDE, answer: 'concord', hint: 'Prescott escaped and rode on past Lexington.', why: { lexington: 'Revere and Dawes both reached Lexington first.' }, explain: 'Prescott reached Concord in time for the militia to hide their weapons.' }] },
      3: { append: [{ type: 'highlight', q: 'The Patriot newspaper is biased. Tap the TWO words that show its opinion instead of facts.', segments: ['British troops fired on', 'innocent', 'farmers at Lexington in a', 'cruel', 'attack!'], answer: [1, 3], hint: 'Look for words that make you FEEL a certain way about each side.', explain: '"Innocent" and "cruel" are loaded words chosen to make readers angry at the British.' }] }
    }
  };

  FX['g5-ss-voices-revolution'] = {
    theme: 'museum',
    stages: {
      0: { set: { cards: [['Valley Forge', 'The army\'s brutal winter camp in 1777–78.'], ['Continental Army', 'The army of the united colonies, led by Washington.'], ['First President', 'Washington led the new nation from 1789 to 1797.']] } },
      1: { append: [{ type: 'highlight', q: 'Tap the words in Abigail Adams\'s letter that show exactly what she was asking for.', segments: ['...in the new Code of Laws', 'which I suppose it will be necessary for you to make', 'I desire you would', 'Remember the Ladies,', 'and be more generous and favourable to them', 'than your ancestors.'], answer: [3, 4], hint: 'Find the part that tells John what to DO.', explain: 'She asked him to "Remember the Ladies" and treat women more fairly in the new laws.' }] },
      3: { append: [{ type: 'numberline', q: 'Place George Rogers Clark\'s capture of Fort Sackville (1779) on the Revolution timeline.', min: 1770, max: 1790, ticks: 4, minor: 5, snap: 1, tol: 0.5, answer: 1779, fmt: 'int', points: [{ v: 1776, label: 'Declaration' }, { v: 1783, label: 'Treaty of Paris' }], hint: 'Count 9 small ticks past 1770.', explain: 'Clark\'s victory came in 1779, in the middle of the war.' }] }
    }
  };

  var BRANCHES = { kind: 'scene', w: 620, h: 300, bg: '#F6F2E9', shapes: [
    { t: 'poly', points: '20,95 110,55 200,95', fill: '#B22234' }, { t: 'rect', id: 'leg', label: 'LEGISLATIVE', x: 20, y: 95, w: 180, h: 170, fill: '#FFFFFF', sw: 3, ly: 150 },
    { t: 'text', x: 110, y: 180, s: 'Congress', size: 16, bold: false }, { t: 'text', x: 110, y: 205, s: 'Senate + House', size: 13, bold: false },
    { t: 'poly', points: '220,95 310,55 400,95', fill: '#1E3A6E' }, { t: 'rect', id: 'exe', label: 'EXECUTIVE', x: 220, y: 95, w: 180, h: 170, fill: '#FFFFFF', sw: 3, ly: 150 },
    { t: 'text', x: 310, y: 180, s: 'President', size: 16, bold: false }, { t: 'text', x: 310, y: 205, s: 'Vice President, Cabinet', size: 13, bold: false },
    { t: 'poly', points: '420,95 510,55 600,95', fill: '#F2C14E' }, { t: 'rect', id: 'jud', label: 'JUDICIAL', x: 420, y: 95, w: 180, h: 170, fill: '#FFFFFF', sw: 3, ly: 150 },
    { t: 'text', x: 510, y: 180, s: 'Supreme Court', size: 16, bold: false }, { t: 'text', x: 510, y: 205, s: '9 justices', size: 13, bold: false },
    { t: 'text', x: 310, y: 292, s: 'The U.S. Constitution', size: 15 }
  ] };
  FX['g5-ss-branches-quest'] = {
    theme: 'civic',
    stages: {
      1: { set: { visual: { kind: 'chart', type: 'bar', ymax: 60, ystep: 10, ylabel: 'Seats in the House', caption: 'House of Representatives seats (based on the 2020 census)', data: [['California', 52, '#1E3A6E'], ['Texas', 38, '#1E3A6E'], ['Indiana', 9, '#B22234'], ['Wyoming', 1, '#1E3A6E']] } } },
      2: { append: [{ type: 'tap', q: 'Tap the branch that can VETO a bill.', visual: BRANCHES, answer: 'exe', hint: 'The veto belongs to the President.', explain: 'The President, head of the executive branch, can veto bills from Congress.' }] },
      3: { append: [{ type: 'tap', q: 'Tap the branch that can declare a law unconstitutional.', visual: BRANCHES, answer: 'jud', hint: 'This branch interprets laws.', explain: 'Courts decide what laws mean, and the Supreme Court can strike down a law that breaks the Constitution.' }] },
      4: { append: [{ type: 'order', q: 'Put the steps of a veto override in order.', items: ['Congress passes a bill', 'The President vetoes it', 'Congress votes on the bill again', 'Two-thirds of both houses vote yes', 'The bill becomes a law anyway'], hint: 'Start with the bill passing Congress the first time.' }] }
    }
  };

  FX['g5-ss-bill-of-rights'] = {
    theme: 'civic',
    stages: {
      0: { append: [{ type: 'numberline', q: 'The Constitution was written in 1787. Place the year the Bill of Rights was ratified (1791) on the timeline.', min: 1775, max: 1800, ticks: 5, minor: 5, snap: 1, tol: 0.5, answer: 1791, fmt: 'int', points: [{ v: 1776, label: 'Declaration' }, { v: 1787, label: 'Constitution' }], hint: 'Count 1 small tick past 1790.', explain: 'The Bill of Rights was added in 1791, four years after the Constitution was written.' }] },
      1: { set: { cards: [['Religion', 'Practice any religion, or none.'], ['Assembly', 'Gather peacefully in groups.'], ['Press', 'Publish news without government censorship.'], ['Petition', 'Ask the government to fix problems.'], ['Speech', 'Say what you think.']] } },
      2: { append: [{ type: 'highlight', q: 'Case file: Tap the part of this report that breaks the 4th Amendment.', segments: ['Officer Kane knocked on the Lopez family\'s door at noon.', 'He walked in', 'without a warrant or permission', 'and searched every drawer in the house.', 'He found nothing.'], answer: [2], block: true, hint: 'The 4th Amendment protects against searches without a warrant.', explain: 'Searching a home without a warrant or good reason is an unreasonable search under the 4th Amendment.' }] }
    }
  };

  var MALL = { kind: 'scene', w: 660, h: 360, bg: '#CFE6B8', shapes: [
    { t: 'rect', x: 40, y: 170, w: 580, h: 44, fill: '#E9E2CC', sw: 0 },
    { t: 'text', x: 330, y: 240, s: 'The National Mall', size: 13, fill: '#556b2f' },
    { t: 'rect', id: 'lincoln', label: 'Lincoln Memorial', x: 20, y: 160, w: 110, h: 64, rx: 4, fill: '#FFFFFF', sw: 2.5, lsize: 12 },
    { t: 'poly', id: 'monument', label: 'Washington Monument', points: '310,110 322,110 330,214 302,214', fill: '#FFFFFF', sw: 2.5, lx: 316, ly: 100, lsize: 12 },
    { t: 'rect', id: 'wh', label: 'White House', x: 262, y: 30, w: 110, h: 50, rx: 4, fill: '#FFFFFF', sw: 2.5 },
    { t: 'rect', id: 'archives', label: 'National Archives', x: 400, y: 110, w: 130, h: 44, rx: 4, fill: '#FFFFFF', sw: 2.5, lsize: 12 },
    { t: 'rect', id: 'capitol', label: 'U.S. Capitol', x: 530, y: 160, w: 110, h: 64, rx: 6, fill: '#FFFFFF', sw: 2.5 },
    { t: 'path', d: 'M560,160 Q585,130 610,160', fill: '#FFFFFF', sw: 2.5 },
    { t: 'rect', id: 'court', label: 'Supreme Court', x: 545, y: 260, w: 100, h: 50, rx: 4, fill: '#FFFFFF', sw: 2.5, lsize: 12 },
    { t: 'text', x: 30, y: 30, s: 'N ↑', size: 16 }
  ] };
  FX['g5-ss-dc-fieldtrip'] = {
    theme: 'civic',
    stages: {
      0: { set: { visual: Object.assign({ caption: 'Map of the National Mall (simplified)' }, MALL) }, append: [{ type: 'tap', q: 'Tap the building where the original Constitution is kept.', visual: MALL, answer: 'archives', hint: 'It is the first stop on your trip.', explain: 'The National Archives displays the Declaration, Constitution, and Bill of Rights.' }] },
      1: { append: [{ type: 'tap', q: 'Tap the building where the branch that MAKES laws meets.', visual: MALL, answer: 'capitol', hint: 'Congress makes laws.', why: { wh: 'The White House is home to the executive branch, which carries out laws.', court: 'The Supreme Court interprets laws.' }, explain: 'Congress, the legislative branch, meets in the U.S. Capitol.' }] },
      3: { append: [{ type: 'tap', q: 'Tap the building of the branch that INTERPRETS laws.', visual: MALL, answer: 'court', hint: 'This branch decided the Tinker case.', explain: 'The Supreme Court, head of the judicial branch, interprets laws and the Constitution.' }] },
      4: { set: { cards: [['Right: vote', 'Citizens 18 and older choose their leaders.'], ['Responsibility: jury duty', 'Serve on a jury so trials are fair.'], ['Right: free speech', 'Share ideas without government punishment.'], ['Responsibility: stay informed', 'Learn about issues before you vote.']] } }
    }
  };
})(window.CX_FX);
