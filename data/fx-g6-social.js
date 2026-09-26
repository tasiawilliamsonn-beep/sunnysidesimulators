/* Grade 6 Social Studies: themes, maps, timelines, and interactive puzzles */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function hit(id, label, x, y, w, h) { return { t: 'rect', id: id, label: label, showLabel: false, x: x, y: y, w: w, h: h, fill: 'rgba(0,0,0,0)', sw: 0 }; }
  function tag(x, y, s) { return [{ t: 'circle', cx: x, cy: y, r: 15, fill: '#FFF8E1', stroke: '#2B1E10', sw: 2.5 }, { t: 'text', x: x, y: y + 6, s: s, size: 16 }]; }

  /* ---------- maps and pictures ---------- */
  var AMERICAS = { kind: 'scene', w: 600, h: 520, bg: '#BFE3F3', caption: 'Simplified map of Mexico, Central America, and South America (not to scale)', shapes: [
    { t: 'poly', points: '0,0 600,0 600,40 480,60 452,120 436,80 380,84 320,92 290,110 268,140 256,160 268,166 276,146 300,142 306,172 290,206 262,226 230,214 200,206 160,190 120,160 84,120 50,84 20,60 0,52', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', points: '262,226 290,206 304,228 334,262 352,272 346,284 318,274 290,256 266,242', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', points: '346,284 392,270 440,284 500,308 560,340 546,392 502,432 462,470 422,508 398,518 388,480 376,430 362,380 346,332 336,300', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', id: 'aztec', label: 'Central Mexico (Aztec)', showLabel: false, points: '150,150 210,150 236,176 226,204 196,202 160,184', fill: '#E9A36B', sw: 2.5 },
    { t: 'poly', id: 'maya', label: 'Yucatán and Guatemala (Maya)', showLabel: false, points: '256,160 268,166 276,146 300,142 306,172 290,206 262,226 244,212 240,178', fill: '#9CCB9C', sw: 2.5 },
    { t: 'poly', id: 'inca', label: 'Andes Mountains (Inca)', showLabel: false, points: '336,300 358,292 374,340 388,400 400,460 408,506 398,516 388,480 374,430 360,380 346,332', fill: '#F2D58A', sw: 2.5 },
    { t: 'text', x: 350, y: 120, s: 'Gulf of Mexico', size: 13, fill: '#1F5C73' },
    { t: 'text', x: 150, y: 330, s: 'PACIFIC OCEAN', size: 16, fill: '#1F5C73' },
    { t: 'text', x: 520, y: 240, s: 'ATLANTIC', size: 16, fill: '#1F5C73' },
    { t: 'text', x: 470, y: 380, s: 'Amazon', size: 12, bold: false, fill: '#6b5a3a' },
    { t: 'text', x: 80, y: 40, s: 'North America', size: 13, bold: false, fill: '#6b5a3a' }
  ].concat(tag(180, 236, 'A'), tag(330, 196, 'B'), tag(318, 420, 'C')) };

  var CASTILLO = (function () {
    var sh = [{ t: 'rect', x: 0, y: 284, w: 520, h: 36, fill: '#7FA65A', sw: 0 }];
    for (var i = 0; i < 9; i++) sh.push({ t: 'rect', x: 60 + i * 22, y: 260 - i * 24, w: 400 - i * 44, h: 24, fill: i % 2 ? '#CFA970' : '#C49A5E', stroke: '#6b4f2a', sw: 1.5 });
    sh.push({ t: 'rect', x: 212, y: 30, w: 96, h: 38, fill: '#B8894F', stroke: '#6b4f2a', sw: 2 });
    sh.push({ t: 'rect', x: 248, y: 44, w: 24, h: 24, fill: '#3B2A18', sw: 0 });
    sh.push({ t: 'poly', points: '228,284 292,284 272,68 248,68', fill: '#E9D2A2', stroke: '#6b4f2a', sw: 1.5 });
    for (var k = 0; k < 18; k++) sh.push({ t: 'line', x1: 229 + k * 1.1, y1: 284 - k * 12, x2: 291 - k * 1.1, y2: 284 - k * 12, stroke: '#9c7a45', sw: 1 });
    sh.push({ t: 'poly', points: '214,284 228,284 228,270 214,276', fill: '#4E7D3A', sw: 1.5 });
    sh.push({ t: 'poly', points: '306,284 292,284 292,270 306,276', fill: '#4E7D3A', sw: 1.5 });
    sh.push({ t: 'line', x1: 392, y1: 150, x2: 282, y2: 180, arrow: true, sw: 2.5 });
    sh.push({ t: 'text', x: 450, y: 142, s: '91 steps', size: 16 });
    sh.push({ t: 'text', x: 450, y: 162, s: 'on each of 4 sides', size: 13, bold: false });
    sh.push({ t: 'text', x: 110, y: 40, s: '+ 1 step to the', size: 13, bold: false });
    sh.push({ t: 'text', x: 110, y: 58, s: 'temple at the top', size: 13, bold: false });
    sh.push({ t: 'line', x1: 160, y1: 50, x2: 208, y2: 64, arrow: true, sw: 2 });
    return { kind: 'scene', w: 520, h: 320, bg: '#F6E7C8', label: 'El Castillo, a stepped pyramid at Chichén Itzá', shapes: sh };
  })();

  var SUNSTONE = (function () {
    var sh = [{ t: 'circle', cx: 160, cy: 160, r: 146, fill: '#B9B2A5', stroke: '#5b544a', sw: 3 }, { t: 'circle', cx: 160, cy: 160, r: 118, fill: '#A69F92', stroke: '#5b544a', sw: 2 }];
    for (var i = 0; i < 20; i++) {
      var a = i * Math.PI / 10, x = 160 + 100 * Math.sin(a), y = 160 - 100 * Math.cos(a);
      sh.push({ t: 'rect', x: Math.round(x - 9), y: Math.round(y - 9), w: 18, h: 18, rx: 3, fill: '#C9C1B1', stroke: '#5b544a', sw: 1.5 });
    }
    for (var j = 0; j < 8; j++) {
      var b = j * Math.PI / 4, px = 160 + 132 * Math.sin(b), py = 160 - 132 * Math.cos(b);
      sh.push({ t: 'circle', cx: Math.round(px), cy: Math.round(py), r: 6, fill: '#8f887b', sw: 1 });
    }
    sh.push({ t: 'circle', cx: 160, cy: 160, r: 74, fill: '#BDB6A8', stroke: '#5b544a', sw: 2 });
    sh.push({ t: 'poly', points: '160,92 182,138 228,160 182,182 160,228 138,182 92,160 138,138', fill: '#A69F92', stroke: '#5b544a', sw: 2 });
    sh.push({ t: 'circle', cx: 160, cy: 160, r: 34, fill: '#D8B25A', stroke: '#5b544a', sw: 2.5 });
    sh.push({ t: 'circle', cx: 148, cy: 152, r: 4, fill: '#3B3223', sw: 0 }, { t: 'circle', cx: 172, cy: 152, r: 4, fill: '#3B3223', sw: 0 });
    sh.push({ t: 'path', d: 'M150,172 Q160,180 170,172', fill: 'none', stroke: '#3B3223', sw: 2.5 });
    sh.push({ t: 'text', x: 160, y: 330, s: 'about 3.6 m (12 ft) across · 20 day signs in a ring', size: 12, bold: false });
    return { kind: 'scene', w: 320, h: 340, label: 'The Aztec Sun Stone', max: 340, shapes: sh };
  })();

  var MORAY = { kind: 'scene', w: 560, h: 300, bg: '#DDEFFB', caption: 'Cross-section of the Moray terraces', shapes: [
    { t: 'poly', points: '0,70 100,70 100,110 160,110 160,150 220,150 220,190 340,190 340,150 400,150 400,110 460,110 460,70 560,70 560,300 0,300', fill: '#B08A5E', stroke: '#6b4f2a', sw: 2 },
    { t: 'rect', id: 'L1', label: 'Top terrace (left)', showLabel: false, x: 0, y: 56, w: 100, h: 14, fill: '#6FA84E', sw: 1.5 },
    { t: 'rect', id: 'L1b', label: 'Top terrace (right)', showLabel: false, x: 460, y: 56, w: 100, h: 14, fill: '#6FA84E', sw: 1.5 },
    { t: 'rect', id: 'L2', label: 'Second terrace (left)', showLabel: false, x: 100, y: 96, w: 60, h: 14, fill: '#79B455', sw: 1.5 },
    { t: 'rect', id: 'L2b', label: 'Second terrace (right)', showLabel: false, x: 400, y: 96, w: 60, h: 14, fill: '#79B455', sw: 1.5 },
    { t: 'rect', id: 'L3', label: 'Third terrace (left)', showLabel: false, x: 160, y: 136, w: 60, h: 14, fill: '#84C05C', sw: 1.5 },
    { t: 'rect', id: 'L3b', label: 'Third terrace (right)', showLabel: false, x: 340, y: 136, w: 60, h: 14, fill: '#84C05C', sw: 1.5 },
    { t: 'rect', id: 'L4', label: 'Bottom of the bowl', showLabel: false, x: 220, y: 176, w: 120, h: 14, fill: '#8FCB62', sw: 1.5 },
    { t: 'text', x: 280, y: 30, s: 'Cold mountain wind blows across the top', size: 13, bold: false, fill: '#1F5C73' },
    { t: 'text', x: 280, y: 250, s: 'Each step is a stone-walled terrace', size: 13, bold: false, fill: '#FFF8E1' }
  ] };

  var MANOR = { kind: 'scene', w: 600, h: 380, bg: '#CFE8B0', caption: 'A medieval manor', shapes: [
    { t: 'rect', id: 'f1', label: 'Fall field (wheat)', showLabel: false, x: 20, y: 20, w: 180, h: 150, rx: 6, fill: '#E8C95A', sw: 2 },
    { t: 'rect', id: 'f2', label: 'Spring field (oats and peas)', showLabel: false, x: 210, y: 20, w: 180, h: 150, rx: 6, fill: '#8CC66A', sw: 2 },
    { t: 'rect', id: 'f3', label: 'Fallow field', showLabel: false, x: 400, y: 20, w: 180, h: 150, rx: 6, fill: '#A2825C', sw: 2 },
    { t: 'path', d: 'M35,50 H185 M35,80 H185 M35,110 H185 M35,140 H185', stroke: '#B8952E', sw: 3 },
    { t: 'path', d: 'M225,45 v12 M255,45 v12 M285,45 v12 M315,45 v12 M345,45 v12 M375,45 v12 M225,95 v12 M255,95 v12 M285,95 v12 M315,95 v12 M345,95 v12 M375,95 v12 M225,140 v12 M255,140 v12 M285,140 v12 M315,140 v12 M345,140 v12 M375,140 v12', stroke: '#3F7D3A', sw: 3 },
    { t: 'path', d: 'M0,330 C150,300 300,350 600,300', stroke: '#4F9ED6', sw: 16 },
    { t: 'rect', x: 40, y: 212, w: 96, h: 64, fill: '#B8B2A6', sw: 2 },
    { t: 'rect', x: 28, y: 190, w: 26, h: 86, fill: '#A7A195', sw: 2 },
    { t: 'rect', x: 122, y: 190, w: 26, h: 86, fill: '#A7A195', sw: 2 },
    { t: 'rect', x: 78, y: 246, w: 20, h: 30, rx: 8, fill: '#5c4428', sw: 1.5 },
    hit('castle', 'The lord\'s manor house', 26, 186, 124, 92),
    { t: 'rect', x: 190, y: 222, w: 56, h: 54, fill: '#E9E1CF', sw: 2 },
    { t: 'poly', points: '184,224 218,192 252,224', fill: '#9B4A3A', sw: 2 },
    { t: 'path', d: 'M218,170 v22 M210,178 h16', stroke: '#2B1E10', sw: 3 },
    hit('church', 'The church', 182, 166, 72, 112),
    { t: 'rect', x: 280, y: 240, w: 34, h: 28, fill: '#D8C39A', sw: 1.5 }, { t: 'poly', points: '276,242 297,222 318,242', fill: '#B98B3E', sw: 1.5 },
    { t: 'rect', x: 330, y: 250, w: 34, h: 28, fill: '#D8C39A', sw: 1.5 }, { t: 'poly', points: '326,252 347,232 368,252', fill: '#B98B3E', sw: 1.5 },
    { t: 'rect', x: 380, y: 236, w: 34, h: 28, fill: '#D8C39A', sw: 1.5 }, { t: 'poly', points: '376,238 397,218 418,238', fill: '#B98B3E', sw: 1.5 },
    hit('village', 'The serfs\' village', 272, 214, 150, 68),
    { t: 'rect', x: 470, y: 222, w: 60, h: 58, fill: '#C9A36A', sw: 2 },
    { t: 'poly', points: '464,224 500,196 536,224', fill: '#7A4E2A', sw: 2 },
    { t: 'circle', cx: 548, cy: 290, r: 26, fill: '#8a6a3a', stroke: '#2B1E10', sw: 2.5 },
    { t: 'path', d: 'M548,264 V316 M522,290 H574 M530,272 L566,308 M566,272 L530,308', stroke: '#2B1E10', sw: 2 },
    hit('mill', 'The mill', 462, 192, 116, 126),
    { t: 'text', x: 110, y: 364, s: 'stream', size: 12, bold: false, fill: '#1F5C73' }
  ] };

  var MED = { kind: 'scene', w: 600, h: 360, bg: '#BFE3F3', caption: 'Trade routes of 1347 (simplified map)', shapes: [
    { t: 'poly', points: '0,0 600,0 600,130 560,150 520,120 480,150 440,130 410,160 385,120 360,110 330,120 300,140 262,128 230,140 200,120 150,150 100,130 60,170 0,160', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', points: '330,118 352,150 382,196 404,236 392,244 366,214 340,186 322,150', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', points: '352,262 398,256 380,286', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'poly', points: '0,310 600,296 600,360 0,360', fill: '#E7DDBF', stroke: '#8a7a55' },
    { t: 'ellipse', cx: 540, cy: 70, rx: 50, ry: 28, fill: '#BFE3F3', stroke: '#8a7a55' },
    { t: 'text', x: 540, y: 76, s: 'Black Sea', size: 12, fill: '#1F5C73' },
    { t: 'text', x: 180, y: 250, s: 'Mediterranean Sea', size: 15, fill: '#1F5C73' },
    { t: 'text', x: 300, y: 335, s: 'North Africa', size: 13, bold: false, fill: '#6b5a3a' },
    { t: 'path', d: 'M540,100 C520,200 460,250 400,260', stroke: '#7A1F1F', sw: 3, dash: '8 6' },
    { t: 'circle', id: 'messina', label: 'Messina, Sicily', cx: 392, cy: 262, r: 11, fill: '#7A1F1F', stroke: '#fff', sw: 3, lx: 440, ly: 290, lc: '#2B1E10' },
    { t: 'circle', id: 'genoa', label: 'Genoa', cx: 318, cy: 128, r: 11, fill: '#7A1F1F', stroke: '#fff', sw: 3, lx: 318, ly: 106, lc: '#2B1E10' },
    { t: 'circle', id: 'venice', label: 'Venice', cx: 372, cy: 112, r: 11, fill: '#7A1F1F', stroke: '#fff', sw: 3, lx: 372, ly: 90, lc: '#2B1E10' },
    { t: 'circle', id: 'marseille', label: 'Marseille', cx: 262, cy: 134, r: 11, fill: '#7A1F1F', stroke: '#fff', sw: 3, lx: 250, ly: 112, lc: '#2B1E10' },
    { t: 'text', x: 500, y: 190, s: 'ships from', size: 12, bold: false }, { t: 'text', x: 500, y: 205, s: 'the Black Sea', size: 12, bold: false }
  ] };

  var HALL = (function () {
    var sh = [{ t: 'rect', x: 0, y: 0, w: 560, h: 340, fill: '#F1E4C8', sw: 0 },
      { t: 'poly', points: '0,0 560,0 322,127.5 238,127.5', fill: '#D9C29A', sw: 1.5 },
      { t: 'poly', points: '0,340 560,340 322,178.5 238,178.5', fill: '#C9A878', sw: 1.5 },
      { t: 'poly', points: '0,0 238,127.5 238,178.5 0,340', fill: '#E6D3AE', sw: 1.5 },
      { t: 'poly', points: '560,0 322,127.5 322,178.5 560,340', fill: '#E6D3AE', sw: 1.5 },
      { t: 'rect', x: 238, y: 127.5, w: 84, h: 51, fill: '#9FC3E0', sw: 1.5 }];
    [70, 140, 210, 350, 420, 490].forEach(function (x0) {
      var bx = x0 + 0.85 * (280 - x0);
      sh.push({ t: 'line', x1: x0, y1: 340, x2: bx, y2: 178.5, stroke: '#8a6a3a', sw: 1.5 });
    });
    [[0, 0], [560, 0], [0, 340], [560, 340], [140, 340], [420, 340]].forEach(function (c) {
      var bx = c[0] + 0.85 * (280 - c[0]), by = c[1] + 0.85 * (150 - c[1]);
      sh.push({ t: 'line', x1: bx, y1: by, x2: 280, y2: 150, stroke: '#C8272D', sw: 1.5, dash: '4 4' });
    });
    sh.push({ t: 'path', d: 'M60,260 V120 Q90,80 120,110 V230', fill: 'none', stroke: '#8a6a3a', sw: 3 });
    sh.push({ t: 'path', d: 'M500,260 V120 Q470,80 440,110 V230', fill: 'none', stroke: '#8a6a3a', sw: 3 });
    [['p1', 'Spot 1', 150, 280], ['vp', 'Spot 2', 280, 150], ['p3', 'Spot 3', 440, 60]].forEach(function (d, i) {
      sh.push({ t: 'circle', id: d[0], label: d[1], cx: d[2], cy: d[3], r: 17, fill: 'rgba(255,248,225,.85)', stroke: '#2B1E10', sw: 2.5, showLabel: false });
      sh.push({ t: 'text', x: d[2], y: d[3] + 6, s: String(i + 1), size: 16 });
    });
    return { kind: 'scene', w: 560, h: 340, label: 'A hallway drawn in one-point perspective', shapes: sh };
  })();

  var COMPASS = (function () {
    var sh = [{ t: 'circle', cx: 180, cy: 180, r: 160, fill: '#F6EBD2', stroke: '#6b5646', sw: 3 }, { t: 'circle', cx: 180, cy: 180, r: 120, fill: 'none', stroke: '#b9a27d', sw: 1.5 }];
    var names = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], full = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    [1, 3, 5, 7, 0, 2, 4, 6].forEach(function (i) {
      var a = i * Math.PI / 4, L = i % 2 ? 105 : 145, wd = i % 2 ? 16 : 22;
      var tx = 180 + L * Math.sin(a), ty = 180 - L * Math.cos(a), lx = 180 + wd * Math.cos(a), ly = 180 + wd * Math.sin(a), rx = 180 - wd * Math.cos(a), ry = 180 - wd * Math.sin(a);
      var f = function (v) { return Math.round(v * 10) / 10; };
      sh.push({ t: 'poly', id: names[i], label: full[i], showLabel: false, points: f(tx) + ',' + f(ty) + ' ' + f(lx) + ',' + f(ly) + ' 180,180 ' + f(rx) + ',' + f(ry), fill: i % 2 ? '#C9A56B' : (i === 0 ? '#C8272D' : '#2E4A7A'), stroke: '#2B1E10', sw: 2 });
    });
    sh.push({ t: 'circle', cx: 180, cy: 180, r: 9, fill: '#FFD166', stroke: '#2B1E10', sw: 2 });
    sh.push({ t: 'text', x: 180, y: 28, s: 'N', size: 18, fill: '#C8272D' });
    return { kind: 'scene', w: 360, h: 360, label: 'A compass rose', max: 360, shapes: sh };
  })();

  function GRID(q, answer, extra) {
    return Object.assign({ type: 'plot', q: q, xmin: -100, xmax: 20, ymin: -40, ymax: 60, step: 10, xfmt: 'lon', yfmt: 'lat', xlabel: 'Longitude', ylabel: 'Latitude', answer: answer, tip: 'Tap the grid to place the plane. Find the latitude on the up-and-down axis and the longitude on the side-to-side axis.' }, extra || {});
  }

  var ANDES = { kind: 'scene', w: 560, h: 320, bg: '#DDEFFB', caption: 'Climate zones on the side of the Andes', shapes: [
    { t: 'poly', id: 'low', label: 'Hot lowlands', showLabel: false, points: '20,300 540,300 472.6,230 87.4,230', fill: '#3F9A48', sw: 2 },
    { t: 'poly', id: 'mid', label: 'Mild valleys', showLabel: false, points: '87.4,230 472.6,230 405.2,160 154.8,160', fill: '#9CC46A', sw: 2 },
    { t: 'poly', id: 'high', label: 'Cold high grasslands', showLabel: false, points: '154.8,160 405.2,160 337.8,90 222.2,90', fill: '#BFA878', sw: 2 },
    { t: 'poly', id: 'snow', label: 'Snowy peaks', showLabel: false, points: '222.2,90 337.8,90 280,30', fill: '#FFFFFF', sw: 2 },
    { t: 'text', x: 548, y: 234, s: '~1,800 m', size: 12, bold: false, anchor: 'end' },
    { t: 'text', x: 548, y: 164, s: '~3,600 m', size: 12, bold: false, anchor: 'end' },
    { t: 'text', x: 548, y: 94, s: '~5,400 m', size: 12, bold: false, anchor: 'end' },
    { t: 'text', x: 548, y: 314, s: 'sea level', size: 12, bold: false, anchor: 'end' },
    { t: 'circle', cx: 300, cy: 138, r: 6, fill: '#7A1F1F', stroke: '#fff', sw: 2 },
    { t: 'text', x: 360, y: 134, s: 'Cusco (3,400 m)', size: 12 }
  ] };

  var RIVERS = { kind: 'chart', type: 'bar', data: [['Amazon', 209, '#1F7A5C'], ['Congo', 41, '#1F6FD1'], ['Mississippi', 17, '#1F6FD1'], ['Nile', 3, '#1F6FD1']], ymax: 240, ystep: 40, ylabel: 'Thousand m³ per second', label: 'Average water flow of four great rivers', caption: 'Average water flow (thousands of cubic meters every second)' };

  var PLAINS = { kind: 'scene', w: 600, h: 320, bg: '#BFE3F3', caption: 'Simplified map of the United States (not to scale)', shapes: [
    { t: 'rect', id: 'west', label: 'Pacific Coast', showLabel: false, x: 20, y: 20, w: 140, h: 280, rx: 10, fill: '#B7D3A0', sw: 2 },
    { t: 'rect', id: 'rockies', label: 'Rocky Mountains', showLabel: false, x: 160, y: 20, w: 90, h: 280, fill: '#C8B79A', sw: 2 },
    { t: 'poly', points: '165,90 190,40 215,90', fill: '#8a7a66', sw: 1.5 }, { t: 'poly', points: '195,150 222,96 248,150', fill: '#8a7a66', sw: 1.5 },
    { t: 'poly', points: '165,210 192,156 218,210', fill: '#8a7a66', sw: 1.5 }, { t: 'poly', points: '198,270 224,218 248,270', fill: '#8a7a66', sw: 1.5 },
    { t: 'rect', id: 'plains', label: 'Great Plains', showLabel: false, x: 250, y: 20, w: 150, h: 280, fill: '#F2D58A', sw: 2 },
    { t: 'rect', id: 'east', label: 'Eastern states', showLabel: false, x: 412, y: 20, w: 168, h: 280, rx: 10, fill: '#A8D08D', sw: 2 },
    { t: 'path', d: 'M404,20 C396,80 414,120 402,170 C392,220 412,260 404,300', stroke: '#1F6FD1', sw: 8 },
    { t: 'text', x: 205, y: 314, s: 'Rocky Mountains', size: 12 },
    { t: 'text', x: 470, y: 314, s: 'Mississippi River →', size: 12, anchor: 'end', fill: '#1F5C73' }
  ] };

  var DIKE = { kind: 'scene', w: 600, h: 300, bg: '#CFE8F7', caption: 'Cross-section of a Dutch dike and polder', shapes: [
    { t: 'poly', id: 'sea', label: 'The North Sea', showLabel: false, points: '0,140 216,140 238,300 0,300', fill: '#4F9ED6', sw: 2 },
    { t: 'path', d: 'M20,150 q15,-8 30,0 t30,0 M110,170 q15,-8 30,0 t30,0', stroke: '#DDEFFB', sw: 2 },
    { t: 'poly', id: 'dike', label: 'The dike', showLabel: false, points: '200,300 236,108 292,108 330,300', fill: '#7FAF5A', sw: 2 },
    { t: 'poly', id: 'polder', label: 'The polder', showLabel: false, points: '330,300 318,200 600,200 600,300', fill: '#A8D08D', sw: 2 },
    { t: 'line', x1: 0, y1: 140, x2: 600, y2: 140, stroke: '#1F5C73', sw: 2, dash: '8 6' },
    { t: 'text', x: 590, y: 132, s: 'sea level', size: 13, anchor: 'end', fill: '#1F5C73' },
    { t: 'rect', x: 380, y: 170, w: 36, h: 30, fill: '#E9E1CF', sw: 1.5 }, { t: 'poly', points: '374,172 398,152 422,172', fill: '#B5452E', sw: 1.5 },
    { t: 'rect', x: 500, y: 130, w: 18, h: 70, fill: '#8a6a3a', sw: 1.5 },
    { t: 'path', d: 'M509,130 L470,100 M509,130 L548,160 M509,130 L540,92 M509,130 L478,168', stroke: '#2B1E10', sw: 5 },
    { t: 'ellipse', cx: 450, cy: 214, rx: 16, ry: 8, fill: '#fff', sw: 1.5 }, { t: 'ellipse', cx: 560, cy: 218, rx: 16, ry: 8, fill: '#fff', sw: 1.5 }
  ] };

  var TERRACES = { kind: 'scene', w: 600, h: 300, bg: '#DDEFFB', caption: 'Two hillsides during a storm', shapes: [
    { t: 'path', d: 'M40,20 l-10,26 M90,14 l-10,26 M140,24 l-10,26 M200,14 l-10,26 M360,20 l-10,26 M420,14 l-10,26 M480,24 l-10,26 M540,14 l-10,26', stroke: '#4F9ED6', sw: 3 },
    { t: 'poly', id: 'steep', label: 'The steep, bare hillside', showLabel: false, points: '20,280 280,280 280,60', fill: '#B08A5E', sw: 2 },
    { t: 'path', d: 'M270,80 Q200,150 110,240 M250,120 Q190,190 150,250', stroke: '#6b4f2a', sw: 3, dash: '6 5' },
    { t: 'poly', id: 'terraced', label: 'The terraced hillside', showLabel: false, points: '320,280 320,260 370,260 370,220 420,220 420,180 470,180 470,140 520,140 520,100 580,100 580,280', fill: '#9C7B55', sw: 2 },
    { t: 'path', d: 'M322,256 H368 M372,216 H418 M422,176 H468 M472,136 H518 M522,96 H578', stroke: '#4E9A3A', sw: 6 },
    { t: 'text', x: 150, y: 296, s: 'Hillside 1', size: 13 }, { t: 'text', x: 450, y: 296, s: 'Hillside 2', size: 13 }
  ] };

  function NL(q, min, max, ticks, minor, answer, extra) {
    return Object.assign({ type: 'numberline', q: q, min: min, max: max, ticks: ticks, minor: minor, snap: 1, tol: 0.5, answer: answer, fmt: 'int' }, extra || {});
  }

  /* ---------- rooms ---------- */
  FX['g6-ss-three-empires'] = {
    theme: 'temple',
    stages: {
      0: { append: [{ type: 'tap', q: 'You are standing on a temple at Tikal. Tap the homeland of the Maya on the map.', visual: AMERICAS, answer: 'maya', hint: 'Tikal is in Guatemala, near the Yucatán Peninsula, which juts north into the Gulf of Mexico.', why: { aztec: 'This is central Mexico, where the Aztec later built Tenochtitlan.', inca: 'This is the Andes in South America, home of the Inca.' }, explain: 'Region B, the Yucatán Peninsula and Guatemala, was the heart of the Maya world.' }] },
      1: { set: { cards: [['Chinampas', 'Garden beds built up from lake mud and reeds, anchored by willow trees.'], ['Causeways', 'Raised stone roads that linked the island city to the lakeshore.'], ['Tribute', 'Goods such as cloth, feathers, and food that conquered peoples had to send the Aztec.']] },
        append: [NL('Place the founding of Tenochtitlan (about 1325) on the timeline.', 1200, 1600, 8, 5, 1325, { snap: 5, tol: 5, hint: 'Each small tick is 10 years. 1325 is halfway between 1300 and 1350.', explain: 'The Mexica founded Tenochtitlan around 1325, on an island in Lake Texcoco.' })] },
      2: { patch: { 1: { visual: { kind: 'quipu', cords: [[2, 3], [1, 5], [3, 0]], caption: 'A quipu: knots near the top are tens, knots near the bottom are ones.' } } },
        append: [{ type: 'tap', q: 'Tap the region where the Inca built their empire.', visual: AMERICAS, answer: 'inca', hint: 'The Inca lived high in a mountain chain along the western edge of South America.', why: { maya: 'This is the Yucatán and Guatemala, the Maya homeland.', aztec: 'This is central Mexico, the Aztec homeland.' }, explain: 'Region C: the Inca Empire stretched about 4,000 km along the Andes Mountains.' }] },
      3: { append: [{ type: 'highlight', block: true, q: 'Tap the TWO details that show Inca engineering skill.', segments: ['Machu Picchu sits high on a mountain ridge above the clouds.', 'Its cut stones fit together so tightly that no mortar was needed.', 'Stone terraces and drains kept the soil from washing away in heavy rain.', 'Today, most visitors arrive by train and bus.', 'Llamas often graze on the grassy slopes.'], answer: [1, 2], hint: 'Engineering means designing and building something to solve a problem.', explain: 'Mortar-free stonework and terraces with drains are both clever building solutions. The others describe the place or modern visitors.' }] },
      4: { append: [NL('Cortés arrived in Mexico in 1519. Place Pizarro\'s capture of the Inca ruler Atahualpa (1532) on the timeline.', 1500, 1550, 5, 10, 1532, { points: [{ v: 1519, label: '1519' }], hint: 'Each small tick is one year. Count 2 ticks past 1530.', explain: 'In 1532, just 13 years after Cortés arrived in Mexico, Pizarro captured Atahualpa in Peru.' })] }
    }
  };

  FX['g6-ss-temple-escape'] = {
    theme: 'temple',
    stages: {
      0: { patch: { 0: { visual: { kind: 'maya', n: 9, caption: 'The first carving' } }, 1: { visual: { kind: 'maya', n: 17, caption: 'The second carving' } } },
        insert: [[2, { type: 'maya', q: 'The third carving has worn away. The door says it should show the number 19. Rebuild it with bars and dots.', answer: 19, hint: '19 = 5 + 5 + 5 + 4. How many bars? How many dots?', explain: 'Three bars (15) and four dots (4) make 19, the biggest number that fits in one Maya place.' }]] },
      1: { set: { visual: CASTILLO },
        append: [{ type: 'input', q: 'El Castillo has 4 staircases of 91 steps, plus 1 step up to the temple. How many steps are there in all?', answer: ['365'], unit: 'steps', hint: 'Multiply 91 × 4, then add 1.', explain: '91 × 4 = 364, plus 1 = 365, the number of days in the Haab\' solar year.' }] },
      2: { set: { cards: [['1 large tomato', '1 cacao bean'], ['1 turkey egg', '3 cacao beans'], ['1 avocado', '3 cacao beans'], ['1 turkey hen', '100 cacao beans']] },
        append: [{ type: 'input', q: 'Flip the price cards (from a 1545 price list). You buy 2 turkey eggs and 4 large tomatoes. How many cacao beans do you pay?', answer: ['10'], unit: 'beans', hint: '2 eggs × 3 beans, plus 4 tomatoes × 1 bean.', explain: '6 + 4 = 10 cacao beans. Cacao worked like coins because everyone agreed on its value.' }] },
      3: { append: [{ type: 'tap', q: 'The huey tlatoani ruled from Tenochtitlan. Tap the homeland of his empire.', visual: AMERICAS, answer: 'aztec', hint: 'Tenochtitlan stood where Mexico City is today, in central Mexico.', why: { maya: 'This is the Maya homeland, ruled by many separate kings.', inca: 'This is the Inca homeland, ruled by the Sapa Inca.' }, explain: 'Region A, central Mexico, was the center of the Aztec Empire.' }] },
      4: { append: [NL('Place the start of the Maya Classic Period (about 250 CE) on the timeline.', 0, 1600, 8, 2, 250, { snap: 50, tol: 50, points: [{ v: 1325, label: 'Aztec' }, { v: 1438, label: 'Inca' }], hint: 'Each small tick is 100 years. 250 is halfway between the 200 and 300 ticks.', explain: 'The Maya Classic Period began around 250 CE, more than 1,000 years before the Aztec and Inca empires rose.' })] }
    }
  };

  FX['g6-ss-artifacts-gallery'] = {
    theme: 'museum',
    stages: {
      0: { set: { visual: { kind: 'maya', n: [7, 12, 0], caption: 'Numbers like these fill the Dresden Codex\'s astronomy tables.' } },
        append: [{ type: 'input', q: 'A page of the codex shows the number above. What number is it?', visual: { kind: 'maya', n: 14 }, answer: ['14'], hint: 'Each bar is 5 and each dot is 1.', explain: 'Two bars (10) and four dots (4) make 14. The codex used numbers like this to track Venus and eclipses.' }] },
      1: { set: { visual: SUNSTONE },
        append: [{ type: 'input', q: 'The Sun Stone weighs about 24 tons. One ton is 2,000 pounds. About how many pounds does it weigh?', answer: ['48000', '48,000'], unit: 'pounds', hint: '24 × 2,000 = ?', explain: 'About 48,000 pounds: as much as three or four school buses, moved without wheels or large work animals.' }] },
      2: { patch: { 1: { visual: { kind: 'quipu', cords: [[1, 3]], caption: 'One cord: 1 knot in the tens place, 3 in the ones place' } } },
        append: [{ type: 'input', q: 'An official recorded llama herds from three villages on this quipu. What is the total?', visual: { kind: 'quipu', cords: [[3, 4], [2, 6], [1, 0]] }, answer: ['70'], unit: 'llamas', hint: 'Read each cord: tens knots on top, ones knots on the bottom. Then add.', explain: '34 + 26 + 10 = 70. A quipu stored numbers using place value, just like our number system.' }] },
      3: { append: [{ type: 'tap', q: 'Scientists found that temperatures differ from level to level at Moray. Tap the level that stays the WARMEST.', visual: MORAY, answer: 'L4', hint: 'Cold wind sweeps the top. The deep bowl is sheltered and soaks up the sun\'s heat all day.', why: { L1: 'The top rim is the coldest and windiest.', L1b: 'The top rim is the coldest and windiest.', L2: 'Warmer than the rim, but not the warmest.', L2b: 'Warmer than the rim, but not the warmest.', L3: 'Close! Keep going down.', L3b: 'Close! Keep going down.' }, explain: 'The sheltered bottom can be several degrees warmer than the rim, so the Inca could test crops in different mini-climates.' }] },
      4: { append: [{ type: 'highlight', q: 'Read this line from a Spanish soldier\'s letter. Tap the TWO words or phrases that show a one-sided (biased) view.', segments: ['We saw a great city', 'built on the water,', 'with wide streets and busy markets,', 'but its savage people', 'bowed to', 'wicked idols.'], answer: [3, 5], hint: 'Look for loaded words that judge the people instead of describing them.', explain: '"Savage people" and "wicked idols" judge the Aztec. The other parts describe what the soldier saw.' }] }
    }
  };

  FX['g6-ss-castle-quest'] = {
    theme: 'castle',
    stages: {
      0: { set: { cards: [['Lord', 'Owns the manor and protects the people who live on it.'], ['Serf', 'Works the lord\'s land and cannot leave without permission.'], ['Manor', 'The lord\'s estate: land, village, mill, church, and castle.']] },
        append: [{ type: 'tap', q: 'Serfs had to pay the lord a share of grain to grind it into flour. Tap the building where grain was ground.', visual: MANOR, answer: 'mill', hint: 'Look for the building with a water wheel beside the stream.', why: { castle: 'This is the lord\'s manor house.', church: 'This is the church, marked by its cross.', village: 'This is the village where serf families lived.', f1: 'This is a field.', f2: 'This is a field.', f3: 'This is a field.' }, explain: 'The mill used the stream to turn its wheel. Serfs had to use the lord\'s mill and pay him for it.' }] },
      1: { append: [{ type: 'tap', q: 'Under the three-field system, one field rests each year. Tap the field left fallow.', visual: MANOR, answer: 'f3', hint: 'A fallow field has nothing planted in it.', why: { f1: 'This field is full of wheat planted in the fall.', f2: 'This field has oats and peas planted in the spring.' }, explain: 'The bare brown field is resting so its soil can recover. Next year, the fields rotate.' }] },
      2: { append: [{ type: 'tap', q: 'Tap the level of feudal society that swore fealty and fought for a lord in exchange for a fief.', visual: { kind: 'pyramid', levels: ['King', 'Nobles', 'Knights', 'Peasants & serfs'] }, answer: 'L2', hint: 'These trained warriors fought on horseback.', why: { L0: 'The king granted land to nobles.', L1: 'Nobles received land from the king and granted fiefs to knights.', L3: 'Peasants and serfs worked the land. They did not receive fiefs.' }, explain: 'Knights received fiefs from lords and promised military service in return.' }] },
      3: { append: [{ type: 'input', q: 'A peasant family harvests 120 bushels of grain. The tithe is one-tenth. How many bushels go to the Church?', answer: ['12'], unit: 'bushels', hint: 'One-tenth means divide by 10.', explain: '120 ÷ 10 = 12 bushels, paid to the Church every year.' }] },
      4: { append: [NL('Place the Magna Carta (1215) on this timeline of rights.', 1000, 1800, 8, 2, 1215, { snap: 5, tol: 15, points: [{ v: 1776, label: 'Declaration' }], hint: 'Each small tick is 50 years. 1215 is just past 1200.', explain: 'The Magna Carta came in 1215, more than 550 years before the Declaration of Independence.' })] }
    }
  };

  FX['g6-ss-plague-detective'] = {
    theme: 'detective',
    stages: {
      0: { append: [{ type: 'tap', q: 'Tap the port where the sick sailors first arrived in October 1347.', visual: MED, answer: 'messina', hint: 'Reread the harbor record. The port is on the island of Sicily.', why: { genoa: 'The sickness reached Genoa later.', venice: 'The sickness reached Venice later.', marseille: 'The sickness reached Marseille later.' }, explain: 'Ships from the Black Sea docked at Messina, Sicily. Trade routes then carried the plague across Europe.' }] },
      1: { set: { cards: [['"Bad air" (miasma)', 'WRONG: bad smells do not cause disease.'], ['The planets', 'WRONG: the stars and planets do not cause illness.'], ['Blaming others', 'WRONG and cruel: Jewish communities were falsely blamed and attacked.'], ['The real cause', 'Bacteria (Yersinia pestis) carried by fleas that lived on rats.']] } },
      2: { set: { visual: { kind: 'chart', type: 'bar', data: [['1347', 12000, '#5E7F8E', '12,000'], ['1350', 7800, '#8E3B46', '7,800']], ymax: 12000, ystep: 3000, ylabel: 'People', label: 'Town population before and after the plague', w: 420, caption: 'Town census' } } },
      3: { append: [{ type: 'highlight', q: 'Tap the TWO phrases in the lord\'s letter that show peasants gained more power.', segments: ['There are not enough workers', 'to harvest my fields.', 'The peasants demand wages,', 'and when I refuse,', 'they leave for another lord', 'who will pay them!'], answer: [2, 4], hint: 'Before the plague, serfs could not demand pay or leave the manor.', explain: 'Demanding wages and leaving for a better lord were new powers. Workers were scarce, so their labor was worth more.' }] }
    }
  };

  FX['g6-ss-renaissance-gallery'] = {
    theme: 'renaissance',
    stages: {
      0: { set: { cards: [['Patron', 'A wealthy person who pays artists and thinkers to create.'], ['City-state', 'An independent city that rules itself and the land around it, like Florence.'], ['Banking', 'The Medici grew rich by lending money across Europe.']] } },
      1: { append: [{ type: 'tap', q: 'Renaissance artists used one-point perspective: all the lines going into the distance meet at one spot. Tap the vanishing point.', visual: HALL, answer: 'vp', hint: 'Follow the red dotted lines to where they all meet.', why: { p1: 'This spot is on the floor. Follow the lines farther back.', p3: 'This spot is on the ceiling. The lines do not meet here.' }, explain: 'Spot 2 is the vanishing point. Making every line meet there makes a flat painting look deep and 3-D.' }] },
      2: { append: [NL('Place the year Michelangelo finished the statue David (1504) on the timeline.', 1450, 1550, 10, 5, 1504, { labels: [0, 2, 4, 6, 8, 10], points: [{ v: 1452, label: 'Leonardo born' }], hint: 'Each small tick is 2 years. 1504 is two small ticks past 1500.', explain: 'David was finished in 1504, when Michelangelo was 29. He painted the Sistine Chapel ceiling from 1508 to 1512.', snap: 2, tol: 1 })] },
      3: { append: [{ type: 'assemble', q: 'Set the movable type! Arrange the metal letters to spell the Renaissance idea that celebrated human potential and learning from ancient Greece and Rome.', tiles: ['M', 'S', 'H', 'A', 'U', 'I', 'N', 'M'], answer: ['H', 'U', 'M', 'A', 'N', 'I', 'S', 'M'], joiner: '', hint: 'It starts with HUMAN.', explain: 'HUMANISM. Printers set every page letter by letter like this, then could print hundreds of copies.' }] },
      4: { append: [NL('Place Luther\'s Ninety-Five Theses (1517) on the timeline.', 1400, 1600, 10, 2, 1517, { labels: [0, 2, 4, 6, 8, 10], points: [{ v: 1450, label: 'Printing press' }], snap: 1, tol: 5, hint: 'Each small tick is 10 years. 1517 is just short of 1520.', explain: 'In 1517, about 67 years after Gutenberg\'s press, printed copies of Luther\'s ideas spread across Germany in weeks.' })] }
    }
  };

  FX['g6-ss-lost-coordinates'] = {
    theme: 'cockpit',
    stages: {
      0: { append: [GRID('Autopilot test: place the plane where the Equator meets the Prime Meridian (0°, 0°).', [0, 0], { hint: 'Both numbers are zero: find where the two dark axis lines cross.', explain: '0° latitude, 0° longitude is in the Atlantic Ocean, off the coast of West Africa.' })] },
      1: { append: [GRID('Place the plane at 20° S, 60° W, a spot in the Southern and Western Hemispheres.', [-60, -20], { hint: 'S means below the Equator. W means left of the Prime Meridian.', explain: '20° S, 60° W is in the middle of South America, in both the Southern and Western Hemispheres.' })] },
      2: { append: [GRID('Quito is almost on the Equator at about 80° W. Place the plane on Quito.', [-80, 0], { points: [{ x: 0, y: 50, label: 'London' }], hint: 'Stay on the Equator (0°) and move west to 80° W.', explain: 'Quito sits at about 0°, 79° W, high in the Andes.' })] },
      3: { append: [{ type: 'tap', q: 'The cockpit compass is missing its labels. Tap the arrow that points southwest (SW).', visual: COMPASS, answer: 'SW', hint: 'Southwest is halfway between south (bottom) and west (left).', why: { SE: 'That is southeast, between south and east.', NW: 'That is northwest, between north and west.', NE: 'That is northeast.', S: 'That is due south.', W: 'That is due west.' }, explain: 'SW sits between S and W, at the lower left of the compass rose.' }] },
      4: { append: [GRID('Final approach! Fly east from Indianapolis along 40° N. Place the plane where 40° N meets the Prime Meridian, on the coast of Spain.', [0, 40], { points: [{ x: -86, y: 40, label: 'Indianapolis' }], hint: 'Keep the latitude at 40° N and move right until the longitude is 0°.', explain: '40° N, 0° is on Spain\'s east coast, near Valencia. You stayed on the same latitude the whole flight.' })] }
    }
  };

  FX['g6-ss-grand-tour'] = {
    theme: 'travel',
    stages: {
      0: { append: [{ type: 'tap', q: 'Farmers in Cusco grow potatoes. Tap the zone where bananas and cacao, which need heat, grow best.', visual: ANDES, answer: 'low', hint: 'The higher you go, the colder it gets. Heat-loving crops need the lowest land.', why: { mid: 'Mild valleys grow corn and fruit, but they are not hot enough for bananas.', high: 'This is where Cusco is. It is too cold for bananas.', snow: 'The snowy peaks are far too cold for any crops.' }, explain: 'The hot lowlands at the foot of the Andes are warm enough for bananas and cacao. Elevation changes climate.' }] },
      1: { patch: { 2: { visual: RIVERS } },
        append: [{ type: 'tap', q: 'Use the chart. Tap the bar for the river that carries about 12 times as much water as the Mississippi.', visual: RIVERS, answer: 'b0', hint: '17 × 12 = about 204. Which bar is close to that?', why: { b1: 'The Congo carries about 41 thousand, only about 2 to 3 times the Mississippi.', b2: 'This is the Mississippi itself.', b3: 'The Nile carries less water than the Mississippi.' }, explain: 'The Amazon carries about 209 thousand m³ every second, about 12 times the Mississippi.' }] },
      2: { append: [{ type: 'tap', q: 'Tap the Great Plains on the map.', visual: PLAINS, answer: 'plains', hint: 'The Great Plains lie between the Rocky Mountains and the Mississippi River.', why: { west: 'This is the Pacific Coast, west of the Rockies.', rockies: 'These are the Rocky Mountains, the western edge of the Plains.', east: 'This land is east of the Mississippi River.' }, explain: 'The Great Plains stretch between the Rockies and the Mississippi, a flat grassland of rich soil for wheat and corn.' }] },
      3: { set: { cards: [['Glacier', 'A huge, slow-moving river of ice. The Alps have thousands.'], ['River source', 'Melting Alpine snow and ice feed the Rhine and the Rhône.'], ['Mountain pass', 'A low gap between peaks that travelers and trains use to cross.']] } },
      4: { set: { visual: [{ kind: 'thermo', min: -20, max: 20, step: 5, value: 5, unit: '°C', label: 'London in January', caption: 'London (52° N)' }, { kind: 'thermo', min: -20, max: 20, step: 5, value: -10, unit: '°C', label: 'Montréal in January', caption: 'Montréal (45° N)' }] },
        append: [NL('Place Montréal\'s average January temperature on the number line.', -20, 10, 6, 5, -10, { fmt: 'neg', unit: '°C', points: [{ v: 5, label: 'London' }], hint: '−10 is to the LEFT of zero, colder than London\'s 5 °C.', explain: 'Montréal averages −10 °C in January, 15 degrees colder than London, even though it is farther south.' })] }
    }
  };

  FX['g6-ss-changing-landscape'] = {
    theme: 'sky',
    stages: {
      0: { append: [{ type: 'tap', q: 'Tap the land that lies BELOW sea level.', visual: DIKE, answer: 'polder', hint: 'Find the dashed sea-level line. Which land is lower than it?', why: { sea: 'This is the sea. The dike holds it back.', dike: 'The dike is built higher than the sea to hold the water back.' }, explain: 'The polder is land reclaimed from the sea. Pumps (once windmills) keep water off it.' }] },
      1: { patch: { 0: { visual: { kind: 'chart', type: 'bar', data: [['Around South America', 13000, '#8E3B46', '13,000'], ['Through the canal', 5000, '#1F7A5C', '5,000']], ymax: 15000, ystep: 5000, ylabel: 'Miles', w: 440, label: 'New York to San Francisco by ship' } } } },
      2: { set: { cards: [['1985 satellite photo', 'Unbroken green forest on both sides of a new road.'], ['Today\'s satellite photo', 'A "fishbone" pattern of cleared land for ranches and soybean fields.'], ['Why it matters', 'Fewer trees means less habitat and less carbon dioxide absorbed.']] } },
      3: { append: [{ type: 'tap', q: 'A storm is coming. Tap the hillside where rain will wash away the most soil.', visual: TERRACES, answer: 'steep', hint: 'Water rushes down a smooth, steep slope. Flat steps slow it down.', why: { terraced: 'The terraces are flat steps that slow the water and hold the soil in place.' }, explain: 'On the bare, steep hillside, rain carries soil downhill. Terraces are a way people modify the land to farm mountains.' }] }
    }
  };
})(window.CX_FX);
