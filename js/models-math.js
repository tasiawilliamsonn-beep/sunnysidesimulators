/*
 * Sunnyside Simulators: math models (real-world worlds).
 * Each model is SUNNY_MODELS[name] = function (M) { ... }. Models are self-contained (they use only
 * M and M.kit) because their source is copied into standalone Canvas files.
 * Math sims push reasoning: students model, estimate, count up, decompose, and explain, instead of
 * running one memorized algorithm.
 */
var SUNNY_MODELS = window.SUNNY_MODELS = window.SUNNY_MODELS || {};

/* ------------------------------------------------------------------ */
/* Pizza Kitchen: re-cut pizzas into equal slices to add or subtract   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.fracKitchen = function (M) {
  var K = M.kit, S = M.state;
  var ORDERS = M.cfg.orders || [{ op: '+', a: [1, 2], b: [1, 3] }, { op: '+', a: [2, 3], b: [1, 4] }, { op: '-', a: [3, 4], b: [1, 6] }, { op: '+', a: [3, 4], b: [5, 8] }];
  var k = 0, cut = 0, done = false;
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 660 250', class: 'sn-svg', role: 'img', 'aria-label': 'Two pizzas and a pizza box' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var cS = K.slider({ label: '🔪 Re-cut both pizzas into', min: 1, max: 24, step: 1, value: 1, unit: 'equal slices', onInput: function (v) { cut = v === 1 ? 0 : v; done = false; report(); draw(); } });
  var go = K.btn('📦 Put it in the box', function () { var o = ORDERS[k]; if (!cut || cut % o.a[1] || cut % o.b[1]) { M.toast('The slices must be the same size first. Pick a slice count both pizzas can be cut into evenly.', true); M.set('triedUnequal', true); return; } done = true; report(); draw(); }, 'primary');
  var nx = K.btn('Next order ▶', function () { k = (k + 1) % ORDERS.length; cut = 0; done = false; cS.set(1, true); report(); draw(); }, 'ghost');
  ctr.appendChild(cS.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(go); r2.appendChild(nx); ctr.appendChild(r2); M.el.appendChild(ctr);
  function result() { var o = ORDERS[k]; return o.op === '+' ? K.fadd(o.a, o.b) : K.fsub(o.a, o.b); }
  function pie(cx, cy, r, den, shade, color, lines) {
    var h = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#f4d58d" stroke="#b07d48" stroke-width="4"/>';
    var n = lines || den, per = shade / den; // shade fraction of whole
    for (var i = 0; i < n; i++) {
      var a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = a0 + 2 * Math.PI / n, on = (i + 0.5) / n <= per + 1e-9;
      if (on) h += '<path d="M' + cx + ' ' + cy + ' L' + (cx + r * Math.cos(a0)) + ' ' + (cy + r * Math.sin(a0)) + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + (cx + r * Math.cos(a1)) + ' ' + (cy + r * Math.sin(a1)) + ' Z" fill="' + color + '" stroke="#fff" stroke-width="1.5"/>';
    }
    for (var j = 0; j < n; j++) { var a = -Math.PI / 2 + j * 2 * Math.PI / n; if (n > 1) h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r * Math.cos(a)) + '" y2="' + (cy + r * Math.sin(a)) + '" stroke="#7a5230" stroke-width="' + (n > 12 ? 1 : 2) + '"/>'; }
    return h;
  }
  function draw() {
    var o = ORDERS[k], N = cut || 0;
    ticket.innerHTML = '<b>🧾 Order #' + (k + 1) + ':</b> ' + (o.op === '+' ? 'Put <b>' + K.fstr(o.a) + '</b> of a pepperoni pizza and <b>' + K.fstr(o.b) + '</b> of a veggie pizza in ONE box. How much pizza is in the box?' : 'There is <b>' + K.fstr(o.a) + '</b> of a pizza left. A customer eats <b>' + K.fstr(o.b) + '</b> of a whole pizza. How much is left?') + (N ? '<br><span class="sn-note">Cut into ' + N + ' slices: ' + K.fstr(o.a) + ' = ' + (o.a[0] * N / o.a[1] % 1 ? '?' : (o.a[0] * N / o.a[1]) + '/' + N) + ' and ' + K.fstr(o.b) + ' = ' + (o.b[0] * N / o.b[1] % 1 ? '?' : (o.b[0] * N / o.b[1]) + '/' + N) + '</span>' : '');
    var fitsA = N && N % o.a[1] === 0, fitsB = N && N % o.b[1] === 0;
    var h = '<rect width="660" height="250" fill="#fff4e6"/><rect y="220" width="660" height="30" fill="#c08457"/>';
    h += pie(110, 115, 85, o.a[1], o.a[0], '#e8590c', fitsA ? N : (N ? N : o.a[1])) + '<text x="110" y="238" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">' + (o.op === '+' ? 'Pepperoni ' : 'Left: ') + K.fstr(o.a) + (N && !fitsA ? ' ✗ uneven' : '') + '</text>';
    h += pie(320, 115, 85, o.b[1], o.b[0], '#2f9e44', fitsB ? N : (N ? N : o.b[1])) + '<text x="320" y="238" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">' + (o.op === '+' ? 'Veggie ' : 'Eaten: ') + K.fstr(o.b) + (N && !fitsB ? ' ✗ uneven' : '') + '</text>';
    h += '<text x="215" y="125" text-anchor="middle" font-size="40" font-weight="800" fill="#495057">' + (o.op === '+' ? '+' : '−') + '</text>';
    h += '<rect x="440" y="20" width="200" height="190" rx="8" fill="#fff" stroke="#adb5bd" stroke-width="3"/><text x="540" y="40" text-anchor="middle" font-size="12" font-weight="800" fill="#495057">PIZZA BOX</text>';
    if (done) { var r = result(), num = r[0] * N / r[1]; h += pie(540, 125, 70, N, num, '#fd7e14', N) + '<text x="540" y="238" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">' + num + '/' + N + ' of a pizza</text>'; }
    svg.innerHTML = h;
  }
  function report() {
    var o = ORDERS[k], N = cut, ok = !!N && N % o.a[1] === 0 && N % o.b[1] === 0, r = result(), st = { order: k, cut: N, common: ok, lcd: ok && N === K.lcm(o.a[1], o.b[1]), boxed: done };
    if (done) { st.boxNum = r[0] * N / r[1]; st.boxDen = N; st['box_' + k] = K.fstr(r); st['cut_' + k] = N; }
    M.set(st);
  }
  report(); draw();
  return {
    setup: function (o) { if (o.order != null) { k = o.order; cut = 0; done = false; cS.set(1, true); report(); draw(); } },
    auto: function (st) { var c = st.goal.check || {}; if (c.order != null) k = c.order; var o = ORDERS[k]; cut = K.lcm(o.a[1], o.b[1]); if (c.cut && c.cut.gte) cut = Math.max(cut, c.cut.gte); if (c.lcd === false || (typeof st.goal.check === 'function' && /lcd === false|!s.lcd/.test(String(st.goal.check)))) cut *= 2; cS.set(cut, true); done = true; for (var kk in c) { var mm = kk.match(/^box_(\d+)$/); if (mm) { k = +mm[1]; o = ORDERS[k]; cut = K.lcm(o.a[1], o.b[1]); } } report(); draw(); }
  };
};

/* ------------------------------------------------------------------ */
/* Ribbon Shop: subtract mixed numbers by counting up on a ruler      */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.ribbonShop = function (M) {
  var K = M.kit, S = M.state;
  var JOBS = M.cfg.jobs || [{ L: [13, 3], C: [11, 4] }, { L: [7, 2], C: [5, 3] }, { L: [9, 2], C: [17, 8] }];
  var j = 0, ticks = 4, mark = null, hops = [], X0 = 40, W = 560;
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 640 220', class: 'sn-svg', role: 'img', 'aria-label': 'Ribbon on a measuring ruler' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rH = K.readout('Hops so far', 'yd', true); reads.appendChild(rH.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var tS = K.seg([[2, 'Halves'], [3, 'Thirds'], [4, 'Fourths'], [6, 'Sixths'], [8, 'Eighths'], [12, 'Twelfths']], ticks, function (v) { ticks = +v; mark = null; hops = []; report(); draw(); });
  var hopRow = K.el('<div class="sn-row"><b class="sn-note">Count up from the cut:</b></div>');
  var h1 = K.btn('Hop +1 yd', function () { hop([1, 1]); }, 'sm'), hT = K.btn('Hop + one tick', function () { hop([1, ticks]); }, 'sm'), un = K.btn('↶ Undo hop', function () { hops.pop(); report(); draw(); }, 'ghost sm');
  [h1, hT, un].forEach(function (b) { hopRow.appendChild(b); });
  var nx = K.btn('Next customer ▶', function () { j = (j + 1) % JOBS.length; mark = null; hops = []; report(); draw(); }, 'ghost sm');
  var r1 = K.el('<div class="sn-row"><b class="sn-note">Ruler marks:</b></div>'); r1.appendChild(tS.el);
  ctr.appendChild(r1); ctr.appendChild(hopRow); ctr.appendChild(nx); M.el.appendChild(ctr);
  function X(v) { return X0 + v / 5 * W; }
  function hopSum() { return hops.reduce(function (a, b) { return K.fadd(a, b); }, [0, 1]); }
  function hop(f) { if (!mark) { M.toast('First click the ruler where the customer\'s cut goes.', true); return; } var nxt = K.fadd(K.fadd(mark, hopSum()), f); if (K.fval(nxt) > K.fval(JOBS[j].L) + 1e-9) { M.toast('That hop goes past the end of the ribbon. Try a smaller hop.', true); return; } hops.push(f); report(); draw(); }
  function report() {
    var J = JOBS[j], left = K.fsub(J.L, J.C), fitsC = (J.C[1] && ticks % J.C[1] === 0), fitsL = ticks % J.L[1] === 0, sum = hopSum();
    var st = { job: j, ticks: ticks, fitsBoth: fitsC && fitsL, marked: !!mark && K.fval(mark) === K.fval(J.C), hopTotal: K.fstr(sum, true), landed: !!mark && Math.abs(K.fval(K.fadd(mark, sum)) - K.fval(J.L)) < 1e-9, hopCount: hops.length };
    if (st.landed) st['left_' + j] = K.fstr(left, true);
    M.set(st); rH.set(K.fstr(sum, true));
  }
  function draw() {
    var J = JOBS[j];
    ticket.innerHTML = '<b>✂️ Customer ' + (j + 1) + ':</b> The spool has <b>' + K.fstr(J.L, true) + ' yards</b> of ribbon. The customer buys <b>' + K.fstr(J.C, true) + ' yards</b>. How much is left on the spool?<br><span class="sn-note">1) Pick ruler marks that show both numbers. 2) Click the ruler at the cut. 3) Hop from the cut to the end of the ribbon.</span>';
    var h = '<rect width="640" height="220" fill="#fff0f6"/>';
    h += '<rect x="' + X0 + '" y="70" width="' + (X(K.fval(J.L)) - X0) + '" height="26" rx="4" fill="#f06595"/>';
    if (mark) h += '<rect x="' + X0 + '" y="70" width="' + (X(K.fval(mark)) - X0) + '" height="26" rx="4" fill="#fcc2d7" stroke="#c2255c" stroke-dasharray="4 3"/><text x="' + ((X0 + X(K.fval(mark))) / 2) + '" y="88" text-anchor="middle" font-size="12" font-weight="800" fill="#a61e4d">sold</text>';
    h += '<rect x="' + (X0 - 10) + '" y="104" width="' + (W + 20) + '" height="44" rx="4" fill="#ffe066" stroke="#e0b400"/>';
    for (var i = 0; i <= 5 * ticks; i++) { var v = i / ticks, x = X(v), whole = i % ticks === 0; h += '<line x1="' + x + '" x2="' + x + '" y1="104" y2="' + (whole ? 130 : 118) + '" stroke="#1d2433" stroke-width="' + (whole ? 2.5 : 1.2) + '"/>' + (whole ? '<text x="' + x + '" y="144" text-anchor="middle" font-size="13" font-weight="800">' + (i / ticks) + '</text>' : ''); }
    h += '<rect class="rb-hit" x="' + X0 + '" y="60" width="' + W + '" height="90" fill="transparent" style="cursor:crosshair"/>';
    if (mark) { var p = K.fval(mark); hops.forEach(function (f) { var a = X(p), b = X(p + K.fval(f)); h += '<path d="M' + a + ' 66 Q' + ((a + b) / 2) + ' ' + (30 - Math.min(24, (b - a) / 4)) + ' ' + b + ' 66" fill="none" stroke="#7048e8" stroke-width="3"/><text x="' + ((a + b) / 2) + '" y="' + (40 - Math.min(20, (b - a) / 5)) + '" text-anchor="middle" font-size="11" font-weight="800" fill="#5f3dc4">+' + K.fstr(f, true) + '</text>'; p += K.fval(f); });
      h += '<line x1="' + X(K.fval(mark)) + '" x2="' + X(K.fval(mark)) + '" y1="60" y2="150" stroke="#c92a2a" stroke-width="3"/><text x="' + X(K.fval(mark)) + '" y="170" text-anchor="middle" font-size="12" fill="#c92a2a" font-weight="800">cut at ' + K.fstr(mark, true) + '</text>'; }
    h += '<text x="' + X(K.fval(J.L)) + '" y="190" text-anchor="middle" font-size="12" fill="#a61e4d" font-weight="800">end ' + K.fstr(J.L, true) + '</text>';
    svg.innerHTML = h;
    svg.querySelector('.rb-hit').addEventListener('click', function (ev) {
      var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; var q = pt.matrixTransform(svg.getScreenCTM().inverse());
      var v = Math.round((q.x - X0) / W * 5 * ticks); mark = K.simp([Math.max(0, v), ticks]); hops = [];
      if (K.fval(mark) !== K.fval(JOBS[j].C)) M.toast('Cut placed at ' + K.fstr(mark, true) + ' yd. Is that what the customer asked for?', K.fval(mark) !== K.fval(JOBS[j].C));
      report(); draw();
    });
  }
  report(); draw();
  return {
    setup: function (o) { if (o.job != null) { j = o.job; mark = null; hops = []; report(); draw(); } },
    auto: function (st) { var c = st.goal.check || {}; if (c.job != null) j = c.job; var J = JOBS[j]; ticks = K.lcm(J.L[1], J.C[1]); if (ticks > 12) ticks = 12; tS.set(ticks); mark = J.C; hops = []; var left = K.fsub(J.L, J.C); hops.push(left); report(); draw(); }
  };
};

/* ------------------------------------------------------------------ */
/* Recipe Scaler: multiply fractions by whole numbers and fractions   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.recipeScale = function (M) {
  var K = M.kit, S = M.state;
  var R = M.cfg.recipe || { name: 'Sunnyside Granola Bars (makes 12)', items: [['Oats', [5, 2], 'cups'], ['Honey', [3, 4], 'cup'], ['Peanut butter', [2, 3], 'cup'], ['Raisins', [1, 2], 'cup']] };
  var mult = [1, 1], pick = 0, scoops = 0;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:10px"></div>');
  var card = K.el('<div class="sn-panel" style="background:#fffdf5;font-family:Georgia,serif"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 380 260', class: 'sn-svg', role: 'img', 'aria-label': 'Measuring cups on a kitchen counter' });
  row.appendChild(card); row.appendChild(svg); M.el.appendChild(row);
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Measured so far', '', true); reads.appendChild(rT.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mS = K.seg([['1/2', '½ batch'], ['1/1', '1 batch'], ['2/1', '2 batches'], ['3/1', '3 batches'], ['3/2', '1½ batches']], '1/1', function (v) { var p = v.split('/'); mult = [+p[0], +p[1]]; scoops = 0; report(); draw(); });
  var add = K.btn('🥄 Add one scoop of the recipe amount', function () { scoops++; report(); draw(); }, 'primary');
  var half = K.btn('Add half a scoop', function () { scoops += 0.5; report(); draw(); }, 'sm');
  var clr = K.btn('Empty the bowl', function () { scoops = 0; report(); draw(); }, 'ghost sm');
  var ctr2 = K.el('<div class="sn-row"><b class="sn-note">Batch size:</b></div>'); ctr2.appendChild(mS.el); ctr.appendChild(ctr2);
  var r3 = K.el('<div class="sn-row"></div>'); [add, half, clr].forEach(function (b) { r3.appendChild(b); }); ctr.appendChild(r3); M.el.appendChild(ctr);
  function need(i) { return K.fmul(R.items[i][1], mult); }
  function have() { var f = R.items[pick][1]; return K.fmul(f, K.simp([Math.round(scoops * 2), 2])); }
  function report() { var st = { batch: K.fstr(mult), pick: pick, scoops: scoops, have: K.fstr(have(), true), match: K.fval(have()) === K.fval(need(pick)) }; if (st.match) st['done_' + pick + '_' + K.fstr(mult).replace('/', '_')] = true; M.set(st); rT.set(K.fstr(have(), true) + ' ' + R.items[pick][2]); }
  function draw() {
    card.innerHTML = '<h3 style="font-family:Georgia,serif">📜 ' + K.esc(R.name) + '</h3><p class="sn-note">Batch: × ' + K.fstr(mult, true) + '. Tap an ingredient to measure it.</p>' + R.items.map(function (it, i) { return '<button type="button" class="sn-ch" data-i="' + i + '" style="width:100%;margin:3px 0;' + (i === pick ? 'border-color:var(--sn-acc);background:#fff4e6' : '') + '"><span style="flex:1"><b>' + K.fstr(it[1], true) + ' ' + it[2] + '</b> ' + it[0] + '</span>' + (S['done_' + i + '_' + K.fstr(mult).replace('/', '_')] ? '✓' : '') + '</button>'; }).join('');
    card.querySelectorAll('[data-i]').forEach(function (b) { b.addEventListener('click', function () { pick = +b.getAttribute('data-i'); scoops = 0; report(); draw(); }); });
    var f = have(), v = K.fval(f), cups = Math.max(1, Math.ceil(v - 1e-9)), h = '<rect width="380" height="260" fill="#f8f0e3"/><rect y="220" width="380" height="40" fill="#ced4da"/><text x="190" y="22" text-anchor="middle" font-size="13" font-weight="800">' + R.items[pick][0] + ': measuring in 1-cup measures</text>';
    for (var c = 0; c < Math.min(cups, 6); c++) { var x = 40 + c * 55, fill = K.clamp(v - c, 0, 1); h += '<path d="M' + x + ' 110 h44 l-4 100 h-36 z" fill="#fff" stroke="#495057" stroke-width="2"/><rect x="' + (x + 4) + '" y="' + (210 - fill * 100) + '" width="36" height="' + fill * 100 + '" fill="#e9c46a"/>'; for (var q = 1; q < 4; q++) h += '<line x1="' + x + '" x2="' + (x + 12) + '" y1="' + (210 - q * 25) + '" y2="' + (210 - q * 25) + '" stroke="#495057"/>'; h += '<text x="' + (x + 22) + '" y="236" text-anchor="middle" font-size="11">cup ' + (c + 1) + '</text>'; }
    h += '<text x="190" y="80" text-anchor="middle" font-size="12" fill="#495057">Each scoop = ' + K.fstr(R.items[pick][1], true) + ' ' + R.items[pick][2] + ' · scoops: ' + scoops + '</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { setup: function (o) { if (o.batch) { mS.set(o.batch); var p = o.batch.split('/'); mult = [+p[0], +p[1]]; } if (o.pick != null) pick = o.pick; scoops = 0; report(); draw(); },
    auto: function (st) { var c = st.goal.check || {}; for (var kk in c) { var mm = kk.match(/^done_(\d+)_(\d+)_(\d+)$/); if (mm) { pick = +mm[1]; mult = [+mm[2], +mm[3]]; scoops = K.fval(mult); report(); } } if (c.match) { scoops = K.fval(mult); } report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Community Garden: area model for fraction × fraction               */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.areaModel = function (M) {
  var K = M.kit, S = M.state;
  var TASKS = M.cfg.tasks || [{ a: [3, 4], b: [2, 3], txt: 'The garden gives 3/4 of its land to vegetables. Tomatoes get 2/3 of the vegetable land.' }, { a: [1, 2], b: [3, 5], txt: 'Half the garden is flowers. Sunflowers get 3/5 of the flower land.' }, { a: [5, 6], b: [1, 4], txt: '5/6 of the garden is planted. Carrots get 1/4 of the planted part.' }];
  var t = 0, cols = 1, rows = 1, colOn = {}, rowOn = {};
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 520 330', class: 'sn-svg', role: 'img', 'aria-label': 'Garden plot divided into a grid' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rC = K.readout('Tomato plots', ''), rA = K.readout('Total plots', ''); reads.appendChild(rC.el); reads.appendChild(rA.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Step 1: cut into columns and tap columns to shade. Step 2: cut into rows and tap rows to shade.</span></div>');
  var cS = K.slider({ label: '⬍ Columns', min: 1, max: 8, step: 1, value: 1, onInput: function (v) { cols = v; colOn = {}; report(); draw(); } });
  var rS = K.slider({ label: '⬌ Rows', min: 1, max: 8, step: 1, value: 1, onInput: function (v) { rows = v; rowOn = {}; report(); draw(); } });
  var nx = K.btn('Next garden ▶', function () { t = (t + 1) % TASKS.length; reset(); }, 'ghost sm');
  [cS.el, rS.el, nx].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function reset() { cols = 1; rows = 1; colOn = {}; rowOn = {}; cS.set(1, true); rS.set(1, true); report(); draw(); }
  function nC() { return Object.keys(colOn).length; } function nR() { return Object.keys(rowOn).length; }
  function report() { var T = TASKS[t]; var st = { task: t, cols: cols, rows: rows, colShade: nC(), rowShade: nR(), overlap: nC() * nR(), total: cols * rows }; st.aRight = nC() / cols === K.fval(T.a); st.bRight = nR() / rows === K.fval(T.b); if (st.aRight && st.bRight) st['prod_' + t] = nC() * nR() + '/' + cols * rows; M.set(st); rC.set(nC() * nR()); rA.set(cols * rows); }
  function draw() {
    var T = TASKS[t], x0 = 60, y0 = 40, W = 400, H = 250, h = '<rect width="520" height="330" fill="#d3f9d8"/>';
    ticket.innerHTML = '<b>🌱 Garden plan ' + (t + 1) + ':</b> ' + T.txt + ' What fraction of the WHOLE garden is ' + (T.txt.match(/Tomatoes|Sunflowers|Carrots/) || ['that'])[0].toLowerCase() + '?';
    h += '<rect x="' + x0 + '" y="' + y0 + '" width="' + W + '" height="' + H + '" fill="#b08968" stroke="#5c3a1a" stroke-width="4"/>';
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) { var inC = colOn[c], inR = rowOn[r]; var fill = inC && inR ? '#e03131' : inC ? '#69db7c' : inR ? '#ffd8a8' : 'none'; if (fill !== 'none') h += '<rect x="' + (x0 + c * W / cols) + '" y="' + (y0 + r * H / rows) + '" width="' + W / cols + '" height="' + H / rows + '" fill="' + fill + '" opacity=".85"/>'; if (inC && inR) h += '<text x="' + (x0 + (c + 0.5) * W / cols) + '" y="' + (y0 + (r + 0.5) * H / rows + 6) + '" text-anchor="middle" font-size="16">🍅</text>'; }
    for (var i = 1; i < cols; i++) h += '<line x1="' + (x0 + i * W / cols) + '" x2="' + (x0 + i * W / cols) + '" y1="' + y0 + '" y2="' + (y0 + H) + '" stroke="#5c3a1a" stroke-width="2"/>';
    for (var j = 1; j < rows; j++) h += '<line y1="' + (y0 + j * H / rows) + '" y2="' + (y0 + j * H / rows) + '" x1="' + x0 + '" x2="' + (x0 + W) + '" stroke="#5c3a1a" stroke-width="2" stroke-dasharray="6 3"/>';
    for (var c2 = 0; c2 < cols; c2++) h += '<rect class="ga-c" data-c="' + c2 + '" x="' + (x0 + c2 * W / cols) + '" y="12" width="' + W / cols + '" height="24" fill="' + (colOn[c2] ? '#2f9e44' : '#fff') + '" stroke="#2f9e44" role="button" tabindex="0"/><text x="' + (x0 + (c2 + 0.5) * W / cols) + '" y="29" text-anchor="middle" font-size="11" pointer-events="none">col</text>';
    for (var r2 = 0; r2 < rows; r2++) h += '<rect class="ga-r" data-r="' + r2 + '" x="18" y="' + (y0 + r2 * H / rows) + '" width="36" height="' + H / rows + '" fill="' + (rowOn[r2] ? '#e8590c' : '#fff') + '" stroke="#e8590c" role="button" tabindex="0"/><text x="36" y="' + (y0 + (r2 + 0.5) * H / rows + 4) + '" text-anchor="middle" font-size="11" pointer-events="none">row</text>';
    h += '<text x="260" y="318" text-anchor="middle" font-size="12" fill="#1d2433">Green = ' + K.fstr(T.a) + ' part · Orange rows = ' + K.fstr(T.b) + ' of it · Red = both</text>';
    svg.innerHTML = h;
    svg.querySelectorAll('.ga-c').forEach(function (e) { e.addEventListener('click', function () { var c = e.getAttribute('data-c'); if (colOn[c]) delete colOn[c]; else colOn[c] = 1; report(); draw(); }); });
    svg.querySelectorAll('.ga-r').forEach(function (e) { e.addEventListener('click', function () { var r = e.getAttribute('data-r'); if (rowOn[r]) delete rowOn[r]; else rowOn[r] = 1; report(); draw(); }); });
  }
  report(); draw();
  return { setup: function (o) { if (o.task != null) { t = o.task; reset(); } },
    auto: function (st) { var c = st.goal.check || {}; if (c.task != null) t = c.task; for (var kk in c) { var mm = kk.match(/^prod_(\d+)$/); if (mm) t = +mm[1]; } var T = TASKS[t]; cols = T.a[1]; rows = T.b[1]; colOn = {}; rowOn = {}; for (var i = 0; i < T.a[0]; i++) colOn[i] = 1; for (var j2 = 0; j2 < T.b[0]; j2++) rowOn[j2] = 1; cS.set(cols, true); rS.set(rows, true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Trail Relay: estimate with benchmarks, then add on a number line   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.fracLine = function (M) {
  var K = M.kit, S = M.state;
  var RACES = M.cfg.races || [{ legs: [[3, 4], [2, 3]], goal: 2 }, { legs: [[5, 6], [3, 8], [1, 2]], goal: 2 }, { legs: [[7, 8], [4, 5]], goal: 2 }];
  var r = 0, est = null, placed = 0, X0 = 40, W = 560, MAXV = 3;
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 640 230', class: 'sn-svg', role: 'img', 'aria-label': 'Trail map as a number line in miles' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">1) Drag the 🚩 to ESTIMATE the finish. 2) Then run each leg to find the exact total.</span></div>');
  var run = K.btn('🏃 Run the next leg', function () { if (est == null) { M.toast('Estimate first! Drag the flag.', true); return; } if (placed < RACES[r].legs.length) placed++; report(); draw(); }, 'primary');
  var nx = K.btn('Next race ▶', function () { r = (r + 1) % RACES.length; est = null; placed = 0; report(); draw(); }, 'ghost sm');
  ctr.appendChild(run); ctr.appendChild(nx); M.el.appendChild(ctr);
  function X(v) { return X0 + v / MAXV * W; }
  function total(n) { return RACES[r].legs.slice(0, n == null ? RACES[r].legs.length : n).reduce(function (a, b) { return K.fadd(a, b); }, [0, 1]); }
  function report() { var R = RACES[r], T = K.fval(total()); var st = { race: r, estimated: est != null, est: est == null ? null : K.round(est, 2), legsRun: placed, finished: placed === R.legs.length, total: K.fstr(total(), true), estClose: est != null && Math.abs(est - T) <= 0.25, overGoal: T > R.goal }; if (st.finished) st['tot_' + r] = st.total; M.set(st); }
  function draw() {
    var R = RACES[r];
    ticket.innerHTML = '<b>🏁 Relay ' + (r + 1) + ':</b> Legs: ' + R.legs.map(function (l, i) { return 'Runner ' + (i + 1) + ' runs <b>' + K.fstr(l) + ' mi</b>'; }).join(', ') + '. Is the team\'s total more or less than <b>' + R.goal + ' miles</b>?<br><span class="sn-note">Benchmarks: is each leg closer to 0, ½, or 1?</span>';
    var h = '<rect width="640" height="230" fill="#e6fcf5"/><path d="M20 150 Q320 120 620 150" stroke="#b2f2bb" stroke-width="40" fill="none"/>';
    h += '<line x1="' + X0 + '" x2="' + (X0 + W) + '" y1="150" y2="150" stroke="#1d2433" stroke-width="3"/>';
    for (var i = 0; i <= MAXV * 4; i++) { var v = i / 4, x = X(v), whole = i % 4 === 0, half = i % 2 === 0; h += '<line x1="' + x + '" x2="' + x + '" y1="' + (whole ? 136 : half ? 140 : 144) + '" y2="' + (whole ? 164 : 156) + '" stroke="#1d2433" stroke-width="' + (whole ? 2.5 : 1) + '"/>' + (whole ? '<text x="' + x + '" y="182" text-anchor="middle" font-size="14" font-weight="800">' + v + '</text>' : half ? '<text x="' + x + '" y="178" text-anchor="middle" font-size="11" fill="#495057">' + (Math.floor(v) ? Math.floor(v) + ' ' : '') + '½</text>' : ''); }
    h += '<line x1="' + X(R.goal) + '" x2="' + X(R.goal) + '" y1="110" y2="170" stroke="#e03131" stroke-width="3" stroke-dasharray="5 3"/><text x="' + X(R.goal) + '" y="104" text-anchor="middle" font-size="12" fill="#e03131" font-weight="800">goal ' + R.goal + ' mi</text>';
    var p = 0; R.legs.slice(0, placed).forEach(function (l, i) { var a = X(p), b = X(p + K.fval(l)); h += '<path d="M' + a + ' 146 Q' + ((a + b) / 2) + ' 90 ' + b + ' 146" fill="none" stroke="' + ['#1971c2', '#7048e8', '#e8590c'][i % 3] + '" stroke-width="4"/><text x="' + ((a + b) / 2) + '" y="' + 96 + '" text-anchor="middle" font-size="12" font-weight="800">+' + K.fstr(l) + '</text>'; p += K.fval(l); });
    if (placed) h += '<text x="' + X(p) + '" y="210" text-anchor="middle" font-size="13" font-weight="800" fill="#1971c2">🏃 ' + K.fstr(total(placed), true) + ' mi</text>';
    var ex = X(est == null ? 0.2 : est); h += '<g class="fl-est" role="button" aria-label="Estimate flag. Drag it."><line x1="' + ex + '" x2="' + ex + '" y1="40" y2="150" stroke="#f08c00" stroke-width="3"/><path d="M' + ex + ' 40 l22 8 l-22 8 z" fill="#f08c00"/><text x="' + (ex + 4) + '" y="34" font-size="11" fill="#e67700" font-weight="800">estimate' + (est != null ? ' ≈ ' + K.fmt(est, 2) : '') + '</text><rect x="' + (ex - 16) + '" y="30" width="44" height="120" fill="transparent"/></g>';
    svg.innerHTML = h;
    K.drag(svg.querySelector('.fl-est'), { svg: svg, pos: function () { return [ex, 90]; }, move: function (x) { est = K.clamp(Math.round((x - X0) / W * MAXV * 8) / 8, 0, MAXV); draw(); }, end: function () { report(); }, keyStep: 7 });
  }
  report(); draw();
  return { setup: function (o) { if (o.race != null) { r = o.race; est = null; placed = 0; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.race != null) r = c.race; est = K.round(K.fval(total()), 1); placed = RACES[r].legs.length; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Sunnyside Grocery: shop with a budget, estimate, add by place value */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.grocery = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var ITEMS = cfg.items || [['bread', 'Whole wheat bread', '🍞', 2.49], ['milk', 'Milk (1 gal)', '🥛', 3.19], ['eggs', 'Eggs (dozen)', '🥚', 2.98], ['apples', 'Apples (bag)', '🍎', 4.35], ['cereal', 'Cereal', '🥣', 4.75], ['bananas', 'Bananas', '🍌', 1.25], ['cheese', 'Cheese', '🧀', 5.06], ['soup', 'Tomato soup', '🥫', 1.29], ['juice', 'Orange juice', '🧃', 3.5], ['rice', 'Rice (2 lb)', '🍚', 2.07]];
  var LIST = cfg.list || ['bread', 'milk', 'eggs', 'bananas'], BUDGET = cfg.budget || 20;
  var cart = [], mat = false;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:10px"></div>');
  var shelf = K.el('<div class="gr-shelf"></div>');
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var listBox = K.el('<div class="sn-panel"></div>'), cartBox = K.el('<div class="sn-panel gr-cart"></div>');
  side.appendChild(listBox); side.appendChild(cartBox);
  row.appendChild(shelf); row.appendChild(side); M.el.appendChild(row);
  var matBox = K.el('<div class="sn-panel" hidden></div>'); M.el.appendChild(matBox);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mT = K.toggle('Show the place value mat', false, function (b) { mat = b; M.set('usedMat', b ? true : S.usedMat); draw(); });
  var clr = K.btn('Empty the cart', function () { cart = []; report(); draw(); }, 'ghost sm');
  ctr.appendChild(mT.el); ctr.appendChild(clr); M.el.appendChild(ctr);
  M.el.appendChild(K.el('<style>.gr-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;background:linear-gradient(#fff 0 0) padding-box,repeating-linear-gradient(180deg,#e9ecef 0 118px,#c08457 118px 126px);padding:8px;border-radius:12px;border:1px solid var(--sn-line)}.gr-it{display:flex;flex-direction:column;align-items:center;gap:2px;background:#fff;border:2px solid var(--sn-line);border-radius:10px;padding:6px;cursor:pointer;font-size:.82em;font-weight:700}.gr-it:hover{border-color:var(--sn-acc)}.gr-it span.e{font-size:2em}.gr-tag{background:#ffe066;border:1px solid #e0b400;border-radius:4px;padding:0 6px;font-family:ui-monospace,Menlo,monospace;font-size:1.1em}.gr-cart li{display:flex;justify-content:space-between;gap:6px}.gr-cart ul{list-style:none;padding:0;margin:4px 0}.gr-mat td,.gr-mat th{text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:1.05em}</style>'));
  function item(id) { return ITEMS.filter(function (x) { return x[0] === id; })[0]; }
  function total() { return Math.round(cart.reduce(function (a, id) { return a + item(id)[3] * 100; }, 0)) / 100; }
  function report() {
    var t = total(), st = { cart: cart.slice(), count: cart.length, total: t, change: K.round(BUDGET - t, 2), under: t <= BUDGET, listDone: LIST.every(function (id) { return cart.indexOf(id) >= 0; }), onlyList: cart.length === LIST.length && LIST.every(function (id) { return cart.indexOf(id) >= 0; }) };
    st.estimate = cart.reduce(function (a, id) { return a + Math.round(item(id)[3]); }, 0);
    ITEMS.forEach(function (it) { st['n_' + it[0]] = cart.filter(function (x) { return x === it[0]; }).length; });
    M.set(st);
  }
  function draw() {
    shelf.innerHTML = ITEMS.map(function (it) { return '<button type="button" class="gr-it" data-id="' + it[0] + '"><span class="e" aria-hidden="true">' + it[2] + '</span>' + K.esc(it[1]) + '<span class="gr-tag">' + K.money(it[3]) + '</span></button>'; }).join('');
    shelf.querySelectorAll('[data-id]').forEach(function (b) { b.addEventListener('click', function () { cart.push(b.getAttribute('data-id')); report(); draw(); }); });
    listBox.innerHTML = '<h3>📝 Shopping list · budget ' + K.money(BUDGET) + '</h3>' + LIST.map(function (id) { var it = item(id); return '<div>' + (cart.indexOf(id) >= 0 ? '✅' : '⬜') + ' ' + it[1] + '</div>'; }).join('');
    cartBox.innerHTML = '<h3>🛒 Cart (' + cart.length + ')</h3><ul>' + cart.map(function (id, i) { var it = item(id); return '<li><span>' + it[2] + ' ' + K.esc(it[1]) + '</span><span><b>' + K.money(it[3]) + '</b> <button type="button" class="sn-b sm ghost" data-rm="' + i + '" aria-label="Remove">✕</button></span></li>'; }).join('') + '</ul><p class="sn-note">The register total prints at checkout. Add it up yourself first!</p>';
    cartBox.querySelectorAll('[data-rm]').forEach(function (b) { b.addEventListener('click', function () { cart.splice(+b.getAttribute('data-rm'), 1); report(); draw(); }); });
    matBox.hidden = !mat;
    if (mat) {
      var cols = ['Tens', 'Ones', '.', 'Tenths', 'Hundredths'];
      matBox.innerHTML = '<h3>Place value mat: add each column, then regroup</h3><div class="sn-tblw"><table class="sn-tbl gr-mat"><thead><tr><th>Item</th>' + cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' + cart.map(function (id) { var v = item(id)[3].toFixed(2).padStart(5, '0'); return '<tr><th>' + item(id)[2] + '</th><td>' + (v[0] === '0' ? '' : v[0]) + '</td><td>' + v[1] + '</td><td>.</td><td>' + v[3] + '</td><td>' + v[4] + '</td></tr>'; }).join('') + '<tr><th>Column totals</th><td>' + sumCol(0) + '</td><td>' + sumCol(1) + '</td><td>.</td><td>' + sumCol(3) + '</td><td>' + sumCol(4) + '</td></tr></tbody></table></div><p class="sn-note">Regroup: every 10 hundredths make 1 tenth; every 10 tenths make 1 one.</p>';
    }
  }
  function sumCol(i) { return cart.reduce(function (a, id) { var v = item(id)[3].toFixed(2).padStart(5, '0'); return a + (+v[i]); }, 0); }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.listDone || c.onlyList) { cart = LIST.slice(); } for (var k in c) { var mm = k.match(/^n_(\w+)$/); if (mm) { var want = c[k].eq != null ? c[k].eq : c[k].gte != null ? c[k].gte : c[k]; while (cart.filter(function (x) { return x === mm[1]; }).length < want) cart.push(mm[1]); } } if (c.usedMat) { mat = true; mT.set(true); M.set('usedMat', true); } report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Deli Counter: read, compare, and round weights to thousandths       */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.deliScale = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SL = { cheese: [0.025, '🧀 Cheese slice', '#ffd43b'], turkey: [0.05, '🦃 Turkey slice', '#f4a261'], ham: [0.1, '🍖 Ham slab', '#f783ac'] };
  var pile = { cheese: 0, turkey: 0, ham: 0 }, round = 'none';
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 340 260', class: 'sn-svg', role: 'img', 'aria-label': 'Deli scale with meat and cheese' });
  var pv = K.el('<div class="sn-panel"></div>');
  row.appendChild(svg); row.appendChild(pv); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  Object.keys(SL).forEach(function (k) { ctr.appendChild(K.btn('+ ' + SL[k][1] + ' (' + SL[k][0] + ' lb)', function () { pile[k]++; report(); draw(); }, 'sm')); ctr.appendChild(K.btn('−', function () { if (pile[k]) pile[k]--; report(); draw(); }, 'sm ghost')); });
  var rS = K.seg([['none', 'Exact'], ['1', 'Label: nearest tenth'], ['2', 'Label: nearest hundredth']], round, function (v) { round = v; M.set('round', v); draw(); });
  var clr = K.btn('Clear scale', function () { pile = { cheese: 0, turkey: 0, ham: 0 }; report(); draw(); }, 'ghost sm');
  var r2 = K.el('<div class="sn-row"><b class="sn-note">Price label:</b></div>'); r2.appendChild(rS.el); r2.appendChild(clr); ctr.appendChild(r2); M.el.appendChild(ctr);
  function w() { return Math.round((pile.cheese * 25 + pile.turkey * 50 + pile.ham * 100)) / 1000; }
  function label() { var v = w(); return round === 'none' ? v.toFixed(3) : v.toFixed(+round); }
  function report() { var v = w(), st = { weight: v, w1000: Math.round(v * 1000), cheese: pile.cheese, turkey: pile.turkey, ham: pile.ham, label: label() }; st['w_' + Math.round(v * 1000)] = true; M.set(st); }
  function draw() {
    var v = w(), s = v.toFixed(3), h = '<rect width="340" height="260" fill="#f1f3f5"/><rect x="40" y="170" width="260" height="70" rx="10" fill="#dee2e6" stroke="#868e96" stroke-width="3"/><rect x="95" y="190" width="150" height="36" rx="5" fill="#111a22"/><text x="170" y="216" text-anchor="middle" font-size="22" font-family="monospace" fill="#7cf5c4">' + s + ' lb</text><rect x="60" y="150" width="220" height="20" rx="6" fill="#adb5bd"/>';
    var y = 148; ['ham', 'turkey', 'cheese'].forEach(function (k) { for (var i = 0; i < pile[k]; i++) { h += '<rect x="' + (80 + (i % 3) * 6) + '" y="' + (y - 6) + '" width="' + (k === 'ham' ? 170 : 160) + '" height="' + (k === 'ham' ? 7 : 4) + '" rx="3" fill="' + SL[k][2] + '" stroke="#00000033"/>'; y -= k === 'ham' ? 7 : 4; } });
    h += '<rect x="40" y="16" width="260" height="34" rx="6" fill="#fff" stroke="#adb5bd"/><text x="170" y="38" text-anchor="middle" font-size="15" font-family="monospace" font-weight="700">LABEL: ' + label() + ' lb × $6.00</text>';
    svg.innerHTML = h;
    var d = s.split('');
    pv.innerHTML = '<h3>Place value of the reading</h3><div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>Ones</th><th>.</th><th>Tenths</th><th>Hundredths</th><th>Thousandths</th></tr></thead><tbody><tr style="font-size:1.6em;font-family:ui-monospace,Menlo,monospace;text-align:center"><td>' + d[0] + '</td><td>.</td><td>' + d[2] + '</td><td>' + d[3] + '</td><td>' + d[4] + '</td></tr></tbody></table></div><p>In words: <b>' + words(v) + '</b></p><p class="sn-note">1 cheese slice = 25 thousandths of a pound.</p>';
  }
  function words(v) { var n = Math.round(v * 1000); if (!n) return 'zero'; var ones = Math.floor(n / 1000), r = n % 1000; var N = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'], T = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']; function two(x) { return x < 20 ? N[x] : T[Math.floor(x / 10)] + (x % 10 ? '-' + N[x % 10] : ''); } function three(x) { return (x >= 100 ? N[Math.floor(x / 100)] + ' hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : ''); } return (ones ? N[ones] + (r ? ' and ' : '') : '') + (r ? three(r) + ' thousandths' : ''); }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^w_(\d+)$/); if (mm) { var n = +mm[1]; pile = { ham: Math.floor(n / 100), turkey: Math.floor(n % 100 / 50), cheese: Math.round(n % 50 / 25) }; } } if (c.w1000 != null) { var n2 = c.w1000.eq != null ? c.w1000.eq : c.w1000.gte != null ? c.w1000.gte : c.w1000; pile = { ham: Math.floor(n2 / 100), turkey: Math.floor(n2 % 100 / 50), cheese: Math.round(n2 % 50 / 25) }; } if (c.round) { round = c.round; rS.set(round); M.set('round', round); } report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Unit Price Detective: divide price by amount to find the better buy */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.unitPrice = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var PAIRS = cfg.pairs || [{ item: 'Juice boxes', a: ['4-pack', 4, 3.2], b: ['10-pack', 10, 7.5], unit: 'box' }, { item: 'Granola bars', a: ['6-pack', 6, 4.5], b: ['8-pack', 8, 5.2], unit: 'bar' }, { item: 'Pencils', a: ['5-pack', 5, 1.75], b: ['12-pack', 12, 4.8], unit: 'pencil' }];
  var p = 0, split = { a: 1, b: 1 }, pick = null;
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 660 260', class: 'sn-svg', role: 'img', 'aria-label': 'Two packages on a store shelf with price bars' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Split each price bar into equal parts, one part per item, to find the price of ONE.</span></div>');
  var sA = K.slider({ label: 'Split left price into', min: 1, max: 12, step: 1, value: 1, unit: 'parts', onInput: function (v) { split.a = v; report(); draw(); } });
  var sB = K.slider({ label: 'Split right price into', min: 1, max: 12, step: 1, value: 1, unit: 'parts', onInput: function (v) { split.b = v; report(); draw(); } });
  var pa = K.btn('🛒 Buy the left one', function () { pick = 'a'; report(); draw(); }, 'sm'), pb = K.btn('🛒 Buy the right one', function () { pick = 'b'; report(); draw(); }, 'sm');
  var nx = K.btn('Next aisle ▶', function () { p = (p + 1) % PAIRS.length; split = { a: 1, b: 1 }; pick = null; sA.set(1, true); sB.set(1, true); report(); draw(); }, 'ghost sm');
  [sA.el, sB.el].forEach(function (e) { ctr.appendChild(e); }); var r2 = K.el('<div class="sn-row"></div>'); [pa, pb, nx].forEach(function (b) { r2.appendChild(b); }); ctr.appendChild(r2); M.el.appendChild(ctr);
  function up(side) { var o = PAIRS[p][side]; return Math.round(o[2] / o[1] * 1000) / 1000; }
  function report() { var P = PAIRS[p], best = up('a') < up('b') ? 'a' : 'b', st = { pair: p, splitA: split.a === P.a[1], splitB: split.b === P.b[1], pick: pick, pickedBest: pick === best, upA: up('a'), upB: up('b') }; if (st.splitA && st.splitB) st['both_' + p] = true; if (pick) st['pick_' + p] = pick === best; M.set(st); }
  function bar(x, y, w, side) {
    var o = PAIRS[p][side], n = split[side], h = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="34" rx="4" fill="#ffe066" stroke="#e0b400"/>';
    for (var i = 1; i < n; i++) h += '<line x1="' + (x + i * w / n) + '" x2="' + (x + i * w / n) + '" y1="' + y + '" y2="' + (y + 34) + '" stroke="#1d2433" stroke-width="1.5"/>';
    h += '<text x="' + (x + w / 2) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="13" font-weight="800">' + K.money(o[2]) + '</text>';
    if (n === o[1]) h += '<text x="' + (x + w / (2 * n)) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="11" font-weight="800">' + K.money(o[2] / o[1]) + '</text><text x="' + (x + w / 2) + '" y="' + (y + 56) + '" text-anchor="middle" font-size="12" fill="#2b8a3e" font-weight="800">✓ ' + n + ' equal parts: ' + K.money(o[2] / o[1]) + ' per ' + PAIRS[p].unit + (Math.abs(o[2] / o[1] * 100 - Math.round(o[2] / o[1] * 100)) > 1e-6 ? ' (about)' : '') + '</text>';
    else if (n > 1) h += '<text x="' + (x + w / 2) + '" y="' + (y + 56) + '" text-anchor="middle" font-size="12" fill="#c92a2a">' + n + ' parts, but the pack has ' + o[1] + ' items</text>';
    return h;
  }
  function draw() {
    var P = PAIRS[p];
    ticket.innerHTML = '<b>🔎 Aisle ' + (p + 1) + ': ' + P.item + '</b>. Which package is the better buy? Find the price of ONE ' + P.unit + ' in each.';
    var h = '<rect width="660" height="260" fill="#f8f9fa"/><rect y="118" width="660" height="10" fill="#c08457"/>';
    [['a', 40], ['b', 350]].forEach(function (q) { var o = P[q[0]], x = q[1]; for (var i = 0; i < Math.min(o[1], 12); i++) h += '<rect x="' + (x + (i % 6) * 40) + '" y="' + (40 + Math.floor(i / 6) * 38) + '" width="34" height="34" rx="4" fill="' + (q[0] === 'a' ? '#74c0fc' : '#ffa8a8') + '" stroke="#495057"/>'; h += '<text x="' + (x + 120) + '" y="28" text-anchor="middle" font-size="13" font-weight="800">' + o[0] + (pick === q[0] ? ' 🛒' : '') + '</text>' + bar(x, 160, 260, q[0]); });
    svg.innerHTML = h;
  }
  report(); draw();
  return { setup: function (o) { if (o.pair != null) { p = o.pair; split = { a: 1, b: 1 }; pick = null; sA.set(1, true); sB.set(1, true); report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.pair != null) p = c.pair; for (var kk in c) { var mm = kk.match(/^(both|pick)_(\d+)$/); if (mm) p = +mm[2]; } var P = PAIRS[p]; split = { a: P.a[1], b: P.b[1] }; sA.set(split.a, true); sB.set(split.b, true); pick = up('a') < up('b') ? 'a' : 'b'; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Cashier: make change by counting up with bills and coins            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.cashier = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SALES = cfg.sales || [[13.47, 20], [6.82, 10], [28.35, 50], [4.09, 5]];
  var MON = [[10, '$10', 'bill'], [5, '$5', 'bill'], [1, '$1', 'bill'], [0.25, '25¢', 'q'], [0.1, '10¢', 'd'], [0.05, '5¢', 'n'], [0.01, '1¢', 'p']];
  var s = 0, tray = [];
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 660 200', class: 'sn-svg', role: 'img', 'aria-label': 'Cash register and change tray' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rC = K.readout('Counting up', '', true); reads.appendChild(rC.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><b class="sn-note">Give change:</b></div>');
  MON.forEach(function (m) { ctr.appendChild(K.btn(m[1], function () { tray.push(m[0]); report(); draw(); }, 'sm')); });
  ctr.appendChild(K.btn('↶ Take back', function () { tray.pop(); report(); draw(); }, 'ghost sm'));
  ctr.appendChild(K.btn('Next customer ▶', function () { s = (s + 1) % SALES.length; tray = []; report(); draw(); }, 'ghost sm'));
  M.el.appendChild(ctr);
  function given() { return Math.round(tray.reduce(function (a, b) { return a + b * 100; }, 0)) / 100; }
  function report() { var T = SALES[s], need = Math.round((T[1] - T[0]) * 100) / 100, g = given(), st = { sale: s, given: g, need: need, exact: Math.abs(g - need) < 0.001, over: g > need + 0.001, coins: tray.length }; if (st.exact) st['ok_' + s] = true; M.set(st); rC.set(K.money(T[0] + g)); }
  function draw() {
    var T = SALES[s];
    ticket.innerHTML = '<b>🧾 Customer ' + (s + 1) + ':</b> The total is <b>' + K.money(T[0]) + '</b>. The customer pays with <b>' + K.money(T[1]) + '</b>. Count up from ' + K.money(T[0]) + ' to ' + K.money(T[1]) + ' as you hand back money.';
    var h = '<rect width="660" height="200" fill="#e7f5ff"/><rect x="20" y="20" width="170" height="160" rx="10" fill="#343a40"/><rect x="36" y="36" width="138" height="44" rx="4" fill="#111a22"/><text x="105" y="66" text-anchor="middle" font-size="22" fill="#7cf5c4" font-family="monospace">' + K.money(T[0]) + '</text><text x="105" y="110" text-anchor="middle" font-size="12" fill="#fff">PAID ' + K.money(T[1]) + '</text>';
    h += '<rect x="210" y="30" width="430" height="150" rx="10" fill="#fff" stroke="#adb5bd" stroke-width="2"/><text x="224" y="50" font-size="12" font-weight="800" fill="#495057">CHANGE TRAY</text>';
    var run = T[0]; tray.forEach(function (v, i) { run += v; var x = 224 + (i % 9) * 46, y = 62 + Math.floor(i / 9) * 56; if (v >= 1) h += '<rect x="' + x + '" y="' + y + '" width="42" height="24" rx="3" fill="#8ce99a" stroke="#2b8a3e"/><text x="' + (x + 21) + '" y="' + (y + 17) + '" text-anchor="middle" font-size="11" font-weight="800">$' + v + '</text>'; else h += '<circle cx="' + (x + 20) + '" cy="' + (y + 12) + '" r="' + (v === 0.25 ? 14 : v === 0.05 ? 12 : v === 0.1 ? 10 : 11) + '" fill="' + (v === 0.01 ? '#e8a87c' : '#ced4da') + '" stroke="#868e96"/><text x="' + (x + 20) + '" y="' + (y + 16) + '" text-anchor="middle" font-size="9" font-weight="800">' + Math.round(v * 100) + '¢</text>'; h += '<text x="' + (x + 20) + '" y="' + (y + 40) + '" text-anchor="middle" font-size="9" fill="#495057">' + K.money(run) + '</text>'; });
    svg.innerHTML = h;
  }
  report(); draw();
  return { setup: function (o) { if (o.sale != null) { s = o.sale; tray = []; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.sale != null) s = c.sale; for (var kk in c) { var mm = kk.match(/^ok_(\d+)$/); if (mm) s = +mm[1]; } var T = SALES[s], left = Math.round((T[1] - T[0]) * 100); tray = []; MON.forEach(function (m) { var v = Math.round(m[0] * 100); while (left >= v) { tray.push(m[0]); left -= v; } }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Powers of Ten Machine: digits shift on a place value chart          */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.powersTen = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var val = cfg.start || 4.37, hist = [], anim = 0;
  var PL = ['Thousands', 'Hundreds', 'Tens', 'Ones', 'Tenths', 'Hundredths', 'Thousandths'];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 700 220', class: 'sn-svg', role: 'img', 'aria-label': 'Place value chart machine' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rV = K.readout('Number', '', true), rH = K.readout('Machine history', ''); reads.appendChild(rV.el); reads.appendChild(rH.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  [['× 10', 10], ['× 100', 100], ['÷ 10', 0.1], ['÷ 100', 0.01], ['× 1,000', 1000], ['÷ 1,000', 0.001]].forEach(function (b) { ctr.appendChild(K.btn(b[0], function () { op(b[1], b[0]); }, 'sm')); });
  var inp = K.el('<label class="sn-slider" style="flex:0 0 auto;min-width:0">New number <input type="text" inputmode="decimal" style="width:6em;font:inherit;padding:3px 6px;border:2px solid var(--sn-line);border-radius:6px" value="' + val + '"></label>');
  inp.querySelector('input').addEventListener('change', function (e) { var v = K.parseNum(e.target.value); if (!isNaN(v) && v > 0 && v < 10000) { val = v; hist = []; report(); draw(); } });
  ctr.appendChild(inp); M.el.appendChild(ctr);
  function op(f, name) { var nv = Math.round(val * f * 1e6) / 1e6; if (nv >= 10000 || nv < 0.001) { M.toast('That would go off the chart!', true); return; } val = nv; hist.push(name); anim = f > 1 ? -1 : 1; report(); draw(); }
  function digits() { var s = val.toFixed(3), p = s.split('.'), w = p[0].padStart(4, ' '); return (w + p[1]).split(''); }
  function report() { var st = { value: val, ops: hist.length, last: hist[hist.length - 1] || '' }; st['v_' + String(val).replace('.', '_')] = true; M.set(st); rV.set(String(val)); rH.set(hist.slice(-4).join(', ') || 'none'); }
  function draw() {
    var d = digits(), h = '<rect width="700" height="220" fill="#fff9db"/>';
    PL.forEach(function (p, i) { var x = 20 + i * 95 + (i > 3 ? 20 : 0); h += '<rect x="' + x + '" y="40" width="88" height="110" rx="8" fill="#fff" stroke="#e0b400" stroke-width="2"/><text x="' + (x + 44) + '" y="30" text-anchor="middle" font-size="12" font-weight="800">' + p + '</text>'; var ch = d[i] === ' ' ? '' : d[i], decs = (String(val).split('.')[1] || '').length, hide = i > 3 && i - 3 > decs; if (!hide) h += '<text x="' + (x + 44) + '" y="115" text-anchor="middle" font-size="54" font-weight="800" fill="#1d2433" font-family="ui-monospace,Menlo,monospace">' + ch + '</text>'; });
    h += '<circle cx="' + (20 + 4 * 95 + 10) + '" cy="130" r="7" fill="#e8590c"/><text x="350" y="190" text-anchor="middle" font-size="13" fill="#495057">The decimal point stays put. The DIGITS move: left when × 10, right when ÷ 10.</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^v_(\d+)(?:_(\d+))?$/); if (mm) { val = +(mm[1] + (mm[2] ? '.' + mm[2] : '')); hist.push('×/÷'); } } if (c.ops) hist = ['× 10', '÷ 100', '× 1,000']; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Swim Meet Timing: order and round times to the thousandths          */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.raceTimes = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SW = cfg.swimmers || [['Lane 1 · Ana', 52.431], ['Lane 2 · Ben', 52.413], ['Lane 3 · Cho', 52.43], ['Lane 4 · Dev', 52.5], ['Lane 5 · Eli', 52.08]];
  var order = SW.map(function (_, i) { return i; }), round = 'exact', swim = false, t = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 660 200', class: 'sn-svg', role: 'img', 'aria-label': 'Swimming pool lanes and scoreboard' }); M.el.appendChild(svg);
  var board = K.el('<div class="sn-panel"></div>'); M.el.appendChild(board);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var go = K.btn('🏊 Replay the race', function () { swim = true; t = 0; M.set('watched', true); }, 'primary');
  var rS = K.seg([['exact', 'Exact (thousandths)'], ['2', 'Round to hundredths'], ['1', 'Round to tenths']], round, function (v) { round = v; M.set('round', v); draw(); });
  ctr.appendChild(go); ctr.appendChild(rS.el); M.el.appendChild(ctr);
  function shown(v) { return round === 'exact' ? v.toFixed(3) : v.toFixed(+round); }
  function report() { var right = order.every(function (k, i) { return i === 0 || SW[order[i - 1]][1] <= SW[k][1]; }); var st = { ordered: right, round: round }; var vals = SW.map(function (s) { return shown(s[1]); }); st.ties = vals.length - vals.filter(function (v, i) { return vals.indexOf(v) === i; }).length; M.set(st); }
  function draw() {
    var h = '<rect width="660" height="200" fill="#4dabf7"/>';
    SW.forEach(function (s, i) { var y = 10 + i * 37; h += '<rect x="0" y="' + y + '" width="660" height="34" fill="' + (i % 2 ? '#339af0' : '#4dabf7') + '"/><text x="8" y="' + (y + 22) + '" font-size="12" fill="#fff" font-weight="800">' + s[0] + '</text>'; var x = swim ? Math.min(610, 110 + t / s[1] * 52 * 9.6) : 110; h += '<text x="' + x + '" y="' + (y + 25) + '" font-size="22">🏊</text>'; h += '<text x="650" y="' + (y + 22) + '" font-size="13" fill="#fff" font-weight="800" text-anchor="end" font-family="monospace">' + (swim && t >= s[1] ? shown(s[1]) : '') + '</text>'; });
    h += '<rect x="620" y="0" width="6" height="200" fill="#fff"/>';
    svg.innerHTML = h;
    board.innerHTML = '<h3>🏆 Results board: put the swimmers in order (fastest first)</h3><ol class="sn-order">' + order.map(function (k, i) { return '<li><span class="sn-on">' + (i + 1) + '</span><span class="sn-ot"><b>' + SW[k][0] + '</b> · <span style="font-family:ui-monospace,Menlo,monospace">' + shown(SW[k][1]) + ' s</span></span><span class="sn-ob"><button type="button" data-u="' + i + '"' + (i ? '' : ' disabled') + ' aria-label="Move up">▲</button><button type="button" data-d="' + i + '"' + (i < order.length - 1 ? '' : ' disabled') + ' aria-label="Move down">▼</button></span></li>'; }).join('') + '</ol>';
    board.querySelectorAll('[data-u]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-u'); var x = order[i - 1]; order[i - 1] = order[i]; order[i] = x; report(); draw(); }); });
    board.querySelectorAll('[data-d]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-d'); var x = order[i + 1]; order[i + 1] = order[i]; order[i] = x; report(); draw(); }); });
  }
  M.loop(function (dt) { if (!swim) return; var was = t; t += dt * 12; if (t > 56) swim = false; if (Math.floor(was) !== Math.floor(t) || !swim) draw(); });
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.ordered) { order.sort(function (a, b) { return SW[a][1] - SW[b][1]; }); } if (c.round) { round = c.round; rS.set(round); } if (c.watched) M.set('watched', true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Box Builder: fill a prism with unit cubes, layer by layer           */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.boxBuilder = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var l = cfg.l || 4, w = cfg.w || 3, h = cfg.h || 2, placed = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 560 340', class: 'sn-svg', role: 'img', 'aria-label': 'A box being filled with unit cubes' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rC = K.readout('Cubes placed', '', true), rL = K.readout('Full layers', ''); reads.appendChild(rC.el); reads.appendChild(rL.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sl = [['Length', 'l', 6], ['Width', 'w', 5], ['Height', 'h', 5]].map(function (d) { return K.slider({ label: d[0], min: 1, max: d[2], step: 1, value: d[1] === 'l' ? l : d[1] === 'w' ? w : h, unit: 'units', onInput: function (v) { if (d[1] === 'l') l = v; else if (d[1] === 'w') w = v; else h = v; placed = 0; report(); draw(); } }); });
  sl.forEach(function (s) { ctr.appendChild(s.el); });
  var r2 = K.el('<div class="sn-row"><b class="sn-note">Fill:</b></div>');
  [['+1 cube', 1], ['+1 row', 'row'], ['+1 layer', 'layer'], ['Fill it all', 'all']].forEach(function (b) { r2.appendChild(K.btn(b[0], function () { add(b[1]); }, 'sm')); });
  r2.appendChild(K.btn('Empty', function () { placed = 0; report(); draw(); }, 'ghost sm'));
  ctr.appendChild(r2); M.el.appendChild(ctr);
  function V() { return l * w * h; }
  function add(n) { var B = l * w; if (n === 'row') n = l - placed % l || l; if (n === 'layer') n = B - placed % B || B; if (n === 'all') n = V() - placed; placed = Math.min(V(), placed + n); M.set('usedLayer', S.usedLayer || n === l * w); report(); draw(); }
  function report() { var st = { l: l, w: w, h: h, placed: placed, full: placed === V(), V: V(), base: l * w, layers: Math.floor(placed / (l * w)) }; st['dims_' + l + 'x' + w + 'x' + h] = placed === V(); M.set(st); rC.set(placed); rL.set(Math.floor(placed / (l * w)) + ' of ' + h); }
  function draw() {
    var s = Math.min(34, 260 / (l + w + h)), iso = K.iso(280, 70 + h * s * 0.2, s), out = '<rect width="560" height="340" fill="#fff9db"/>';
    var cubes = [];
    for (var i = 0; i < placed; i++) { var z = Math.floor(i / (l * w)), r = i % (l * w), y = Math.floor(r / l), x = r % l; cubes.push([x, y, z]); }
    cubes.sort(function (a, b) { return a[2] - b[2] || (a[0] + a[1]) - (b[0] + b[1]); });
    out += iso.outline(0, 0, 0, l, w, h, '#adb5bd');
    cubes.forEach(function (c) { out += iso(c[0], c[1], c[2], ['#74c0fc', '#63e6be', '#ffa94d', '#b197fc', '#ff8787'][c[2] % 5]); });
    out += iso.outline(0, 0, 0, l, w, h, '#1d2433');
    var pL = iso.P(l / 2, w + 0.6, 0), pW = iso.P(l + 0.6, w / 2, 0), pH = iso.P(l + 0.3, 0, h / 2);
    out += '<text x="' + pL[0] + '" y="' + (pL[1] + 16) + '" font-size="14" font-weight="800" text-anchor="middle">length ' + l + '</text><text x="' + (pW[0] + 30) + '" y="' + (pW[1] + 10) + '" font-size="14" font-weight="800">width ' + w + '</text><text x="' + (pH[0] + 16) + '" y="' + pH[1] + '" font-size="14" font-weight="800">height ' + h + '</text>';
    svg.innerHTML = out;
  }
  report(); draw();
  return { setup: function (o) { if (o.l) { l = o.l; w = o.w; h = o.h; sl[0].set(l, true); sl[1].set(w, true); sl[2].set(h, true); placed = 0; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.l) { l = c.l; w = c.w; h = c.h; sl[0].set(l, true); sl[1].set(w, true); sl[2].set(h, true); } for (var k in c) { var mm = k.match(/^dims_(\d)x(\d)x(\d)$/); if (mm) { l = +mm[1]; w = +mm[2]; h = +mm[3]; } } if (c.layers) placed = Math.min(V(), l * w * (c.layers.gte || c.layers)); else placed = c.placed != null ? (c.placed.gte || c.placed) : V(); if (c.full || /dims_/.test(Object.keys(c).join())) placed = V(); if (c.usedLayer) M.set('usedLayer', true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Shipping Center: measure boxes, compare volumes, fill a truck        */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.shipping = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var BOX = cfg.boxes || [['A', 5, 2, 2, '#ffd8a8'], ['B', 3, 3, 3, '#b2f2bb'], ['C', 4, 3, 2, '#a5d8ff'], ['D', 6, 2, 1, '#eebefa']];
  var CAP = cfg.capacity || 100, measured = {}, loaded = [], sel = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 700 300', class: 'sn-svg', role: 'img', 'aria-label': 'Shipping boxes and a delivery truck' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Truck space used', 'cubic ft', true), rC = K.readout('Truck capacity', 'cubic ft'); reads.appendChild(rT.el); reads.appendChild(rC.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var bS = K.seg(BOX.map(function (b, i) { return [String(i), 'Box ' + b[0]]; }), '0', function (v) { sel = +v; draw(); });
  var ms = K.btn('📏 Measure it', function () { measured[BOX[sel][0]] = true; report(); draw(); });
  var ld = K.btn('🚚 Load into truck', function () { if (used() + vol(BOX[sel]) > CAP) { M.toast('It won\'t fit! Only ' + (CAP - used()) + ' cubic feet of space left.', true); M.set('overTried', true); return; } loaded.push(sel); report(); draw(); }, 'primary');
  var un = K.btn('Unload all', function () { loaded = []; report(); draw(); }, 'ghost sm');
  [bS.el, ms, ld, un].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function vol(b) { return b[1] * b[2] * b[3]; }
  function used() { return loaded.reduce(function (a, i) { return a + vol(BOX[i]); }, 0); }
  function report() { var st = { measuredCount: Object.keys(measured).length, used: used(), left: CAP - used(), loads: loaded.length, exactFull: used() === CAP }; BOX.forEach(function (b) { st['m_' + b[0]] = !!measured[b[0]]; st['n_' + b[0]] = loaded.filter(function (i) { return BOX[i][0] === b[0]; }).length; }); M.set(st); rT.set(used()); rC.set(CAP); }
  function draw() {
    var out = '<rect width="700" height="300" fill="#f1f3f5"/><rect y="250" width="700" height="50" fill="#adb5bd"/>';
    BOX.forEach(function (b, i) { var iso = K.iso(70 + i * 105, 150 - b[3] * 14, 14); var cs = []; for (var z = 0; z < b[3]; z++) for (var y = 0; y < b[2]; y++) for (var x = 0; x < b[1]; x++) cs.push([x, y, z]); cs.sort(function (p, q) { return p[2] - q[2] || (p[0] + p[1]) - (q[0] + q[1]); }); if (measured[b[0]]) cs.forEach(function (c) { out += iso(c[0], c[1], c[2], b[4]); }); else out += iso.outline(0, 0, 0, b[1], b[2], b[3], '#495057') + '<polygon points="' + [iso.P(0, 0, b[3]), iso.P(b[1], 0, b[3]), iso.P(b[1], b[2], b[3]), iso.P(0, b[2], b[3])].map(function (p) { return p.join(','); }).join(' ') + '" fill="' + b[4] + '"/>';
      out += '<text x="' + (70 + i * 105) + '" y="236" text-anchor="middle" font-size="13" font-weight="800">Box ' + b[0] + (i === sel ? ' ◀' : '') + '</text>' + (measured[b[0]] ? '<text x="' + (70 + i * 105) + '" y="252" text-anchor="middle" font-size="11">' + b[1] + ' × ' + b[2] + ' × ' + b[3] + ' ft</text>' : '<text x="' + (70 + i * 105) + '" y="252" text-anchor="middle" font-size="11" fill="#868e96">not measured</text>'); });
    out += '<rect x="480" y="90" width="190" height="130" rx="6" fill="#fff" stroke="#495057" stroke-width="3"/><rect x="430" y="140" width="50" height="80" rx="6" fill="#339af0"/><circle cx="470" cy="228" r="14" fill="#343a40"/><circle cx="640" cy="228" r="14" fill="#343a40"/><text x="575" y="84" text-anchor="middle" font-size="12" font-weight="800">TRUCK: ' + CAP + ' cubic ft</text>';
    var fill = used() / CAP; out += '<rect x="484" y="' + (216 - 122 * fill) + '" width="182" height="' + 122 * fill + '" fill="#ffd8a8" opacity=".8"/>'; loaded.forEach(function (i, k) { out += '<text x="' + (492 + (k % 6) * 29) + '" y="' + (210 - Math.floor(k / 6) * 20) + '" font-size="12" font-weight="800">' + BOX[i][0] + '</text>'; });
    svg.innerHTML = out;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; BOX.forEach(function (b) { measured[b[0]] = true; }); if (c.exactFull || (typeof st.goal.check === 'function')) { loaded = []; var left = CAP; var idx = BOX.map(function (b, i) { return i; }).sort(function (a, b) { return vol(BOX[b]) - vol(BOX[a]); }); idx.forEach(function (i) { while (left - vol(BOX[i]) >= 0 && !(left - vol(BOX[i]) > 0 && left - vol(BOX[i]) < Math.min.apply(0, BOX.map(vol)))) { loaded.push(i); left -= vol(BOX[i]); } }); } for (var k in c) { var mm = k.match(/^n_(\w)$/); if (mm) { var bi = BOX.map(function (b) { return b[0]; }).indexOf(mm[1]); var want = c[k].gte || c[k].eq || c[k]; while (loaded.filter(function (i) { return i === bi; }).length < want) loaded.push(bi); } } if (c.overTried) M.set('overTried', true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Aquarium Planner: volume in cubic centimeters and liters            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.aquarium = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var L = cfg.l || 50, W = cfg.w || 20, H = cfg.h || 30, water = 0, fish = false;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 600 320', class: 'sn-svg', role: 'img', 'aria-label': 'Glass aquarium being filled with water' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rD = K.readout('Water depth', 'cm', true), rP = K.readout('Liters poured', 'L'); reads.appendChild(rD.el); reads.appendChild(rP.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sz = K.seg([['50x20x30', 'Tank A 50×20×30 cm'], ['40x25x20', 'Tank B 40×25×20 cm'], ['60x30x40', 'Tank C 60×30×40 cm']], L + 'x' + W + 'x' + H, function (v) { var p = v.split('x').map(Number); L = p[0]; W = p[1]; H = p[2]; water = 0; report(); draw(); });
  var p1 = K.btn('🪣 Pour 1 liter', function () { pour(1000); }), p5 = K.btn('🪣 Pour 5 liters', function () { pour(5000); }), emp = K.btn('Drain', function () { water = 0; report(); draw(); }, 'ghost sm');
  var fT = K.toggle('Add a 1,000 cm³ rock', false, function (b) { fish = b; M.set('rock', b); report(); draw(); });
  [sz.el, p1, p5, emp, fT.el].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function cap() { return L * W * H; }
  function pour(ml) { if (water + ml + (fish ? 1000 : 0) > cap()) { water = cap() - (fish ? 1000 : 0); M.toast('The tank overflowed! It\'s full.', true); M.set('overflow', true); } else water += ml; report(); draw(); }
  function depth() { return (water + (fish ? 1000 : 0)) / (L * W); }
  function report() { var st = { tank: L + 'x' + W + 'x' + H, water: water, liters: water / 1000, depth: K.round(depth(), 2), full: water + (fish ? 1000 : 0) >= cap() - 1, cap: cap() }; st['d_' + L + 'x' + W + 'x' + H + '_' + water / 1000] = K.round(depth(), 2); M.set(st); rD.set(K.fmt(depth(), 2)); rP.set(water / 1000); }
  function draw() {
    var s = Math.min(6, 360 / L, 220 / H), x0 = 120, y0 = 280, w = L * s, hh = H * s, d = W * s * 0.5;
    var out = '<rect width="600" height="320" fill="#e3fafc"/><rect y="282" width="600" height="38" fill="#8b5a2b"/>';
    out += '<polygon points="' + x0 + ',' + y0 + ' ' + (x0 + w) + ',' + y0 + ' ' + (x0 + w + d) + ',' + (y0 - d) + ' ' + (x0 + d) + ',' + (y0 - d) + '" fill="#c5f6fa" stroke="#0c8599"/>';
    var dh = Math.min(hh, depth() * s); if (dh > 0) out += '<polygon points="' + x0 + ',' + y0 + ' ' + (x0 + w) + ',' + y0 + ' ' + (x0 + w) + ',' + (y0 - dh) + ' ' + x0 + ',' + (y0 - dh) + '" fill="#4dabf7" opacity=".7"/><polygon points="' + x0 + ',' + (y0 - dh) + ' ' + (x0 + w) + ',' + (y0 - dh) + ' ' + (x0 + w + d) + ',' + (y0 - dh - d) + ' ' + (x0 + d) + ',' + (y0 - dh - d) + '" fill="#74c0fc" opacity=".8"/><polygon points="' + (x0 + w) + ',' + y0 + ' ' + (x0 + w + d) + ',' + (y0 - d) + ' ' + (x0 + w + d) + ',' + (y0 - d - dh) + ' ' + (x0 + w) + ',' + (y0 - dh) + '" fill="#339af0" opacity=".7"/>';
    if (fish) out += '<ellipse cx="' + (x0 + w * 0.3) + '" cy="' + (y0 - 12) + '" rx="30" ry="14" fill="#868e96"/>';
    out += '<rect x="' + x0 + '" y="' + (y0 - hh) + '" width="' + w + '" height="' + hh + '" fill="none" stroke="#0c8599" stroke-width="3"/><polyline points="' + x0 + ',' + (y0 - hh) + ' ' + (x0 + d) + ',' + (y0 - hh - d) + ' ' + (x0 + w + d) + ',' + (y0 - hh - d) + ' ' + (x0 + w + d) + ',' + (y0 - d) + ' ' + (x0 + w) + ',' + y0 + '" fill="none" stroke="#0c8599" stroke-width="3"/><line x1="' + (x0 + w) + '" y1="' + (y0 - hh) + '" x2="' + (x0 + w + d) + '" y2="' + (y0 - hh - d) + '" stroke="#0c8599" stroke-width="3"/>';
    for (var t = 0; t <= H; t += 5) out += '<line x1="' + (x0 - 8) + '" x2="' + x0 + '" y1="' + (y0 - t * s) + '" y2="' + (y0 - t * s) + '" stroke="#1d2433"/><text x="' + (x0 - 12) + '" y="' + (y0 - t * s + 4) + '" text-anchor="end" font-size="11">' + t + '</text>';
    out += '<text x="' + (x0 + w / 2) + '" y="' + (y0 + 20) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">length ' + L + ' cm</text><text x="' + (x0 + w + d + 8) + '" y="' + (y0 - d / 2) + '" font-size="13" font-weight="800">width ' + W + ' cm</text><text x="' + (x0 - 40) + '" y="' + (y0 - hh - 6) + '" font-size="12" font-weight="800">cm</text>';
    svg.innerHTML = out;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.tank) { var p = c.tank.split('x').map(Number); L = p[0]; W = p[1]; H = p[2]; sz.set(c.tank); } if (c.rock != null) { fish = c.rock; fT.set(fish); M.set('rock', fish); } if (c.full) water = cap() - (fish ? 1000 : 0); if (c.liters != null) water = (c.liters.gte || c.liters.eq || c.liters) * 1000; for (var k in c) { var mm = k.match(/^d_(\d+)x(\d+)x(\d+)_(\d+)$/); if (mm) { L = +mm[1]; W = +mm[2]; H = +mm[3]; water = +mm[4] * 1000; sz.set(L + 'x' + W + 'x' + H); } } if (c.overflow) M.set('overflow', true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Composite Buildings: split an L-shaped building into prisms         */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.composite = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SH = cfg.shapes || [{ name: 'Sunnyside Library', a: [6, 4, 2], b: [2, 4, 3], bx: 0 }, { name: 'Community Center', a: [5, 3, 2], b: [5, 2, 4], by: 3 }, { name: 'Clock Tower Shop', a: [4, 4, 1], b: [2, 2, 5], bx: 1, byy: 1 }];
  var k = 0, cut = 'none';
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 600 330', class: 'sn-svg', role: 'img', 'aria-label': 'Building made of cubes' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var cS = K.seg([['none', 'Whole building'], ['split', '✂ Split into 2 boxes'], ['sub', '➖ Big box minus the gap']], cut, function (v) { cut = v; var tried = (S.cutsTried || []).slice(); if (tried.indexOf(v) < 0) tried.push(v); M.set({ cut: v, cutsTried: tried }); draw(); });
  var nx = K.btn('Next building ▶', function () { k = (k + 1) % SH.length; cut = 'none'; cS.set('none'); M.set({ shape: k, cut: 'none', cutsTried: [] }); draw(); }, 'ghost sm');
  ctr.appendChild(cS.el); ctr.appendChild(nx); M.el.appendChild(ctr);
  function cubes(sh) { var set = {}, list = []; function add(x, y, z, part) { var key = x + ',' + y + ',' + z; if (set[key]) return; set[key] = part; list.push([x, y, z, part]); } for (var z = 0; z < sh.a[2]; z++) for (var y = 0; y < sh.a[1]; y++) for (var x = 0; x < sh.a[0]; x++) add(x, y, z, 'a'); var ox = sh.bx || 0, oy = sh.by || sh.byy || 0; for (var z2 = 0; z2 < sh.b[2]; z2++) for (var y2 = 0; y2 < sh.b[1]; y2++) for (var x2 = 0; x2 < sh.b[0]; x2++) add(x2 + ox, y2 + oy, z2, 'b'); return list; }
  function total(sh) { return cubes(sh).length; }
  function draw() {
    var sh = SH[k], cs = cubes(sh), T = cs.length, s = 22, iso = K.iso(300, 90, s), out = '<rect width="600" height="330" fill="#f8f9fa"/>';
    var ox = sh.bx || 0, oy = sh.by || sh.byy || 0;
    var bl = [Math.max(sh.a[0], ox + sh.b[0]), Math.max(sh.a[1], oy + sh.b[1]), Math.max(sh.a[2], sh.b[2])];
    cs.sort(function (p, q) { return p[2] - q[2] || (p[0] + p[1]) - (q[0] + q[1]); });
    if (cut === 'sub') out += iso.outline(0, 0, 0, bl[0], bl[1], bl[2], '#e03131');
    cs.forEach(function (c) { var col = cut === 'split' ? (c[3] === 'a' ? '#74c0fc' : '#ffa94d') : '#ced4da'; out += iso(c[0], c[1], c[2], col); });
    var bOnly = sh.b[0] * sh.b[1] * sh.b[2] - cs.filter(function (c) { return c[3] === 'a' && c[0] >= ox && c[0] < ox + sh.b[0] && c[1] >= oy && c[1] < oy + sh.b[1] && c[2] < sh.b[2]; }).length;
    var aV = sh.a[0] * sh.a[1] * sh.a[2], bOnlyV = T - aV;
    var info = cut === 'split' ? '<b style="color:#1971c2">Blue box:</b> ' + sh.a.join(' × ') + ' = ' + '?' + ' &nbsp; <b style="color:#e8590c">Orange part:</b> the rest of the building. Find each, then add.' : cut === 'sub' ? '<b style="color:#e03131">Big box (red outline):</b> ' + bl.join(' × ') + '. Find it, then subtract the empty space.' : 'Pick a strategy below to see the building as boxes.';
    ticket.innerHTML = '<b>🏗 ' + sh.name + '</b>: What is the volume of the building (in unit cubes)? <br><span class="sn-note">' + info + '</span>';
    out += '<text x="20" y="310" font-size="12" fill="#495057">Each cube = 1 cubic unit. Hidden cubes are there too!</text>';
    svg.innerHTML = out;
    M.set({ shape: k, total: T, bigBox: bl[0] * bl[1] * bl[2], gap: bl[0] * bl[1] * bl[2] - T, partA: aV, partB: bOnlyV });
  }
  M.set({ shape: 0, cut: 'none', cutsTried: [] }); draw();
  return { setup: function (o) { if (o.shape != null) { k = o.shape; cut = 'none'; cS.set('none'); M.set({ cut: 'none', cutsTried: [] }); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.shape != null) k = c.shape; if (c.cut) { cut = c.cut; cS.set(cut); } var tried = ['none', 'split', 'sub']; M.set({ cut: cut, cutsTried: tried }); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Same Volume Designer: find every box with a given volume            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.dimensions = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var target = cfg.target || 24, l = 2, w = 3, h = 4, found = [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 420 320', class: 'sn-svg', role: 'img', 'aria-label': 'A box made of unit cubes' });
  var list = K.el('<div class="sn-panel"></div>');
  row.appendChild(svg); row.appendChild(list); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sl = [['Length', 'l'], ['Width', 'w'], ['Height', 'h']].map(function (d) { return K.slider({ label: d[0], min: 1, max: 12, step: 1, value: d[1] === 'l' ? l : d[1] === 'w' ? w : h, onInput: function (v) { if (d[1] === 'l') l = v; else if (d[1] === 'w') w = v; else h = v; report(); draw(); } }); });
  sl.forEach(function (s) { ctr.appendChild(s.el); });
  var sv = K.btn('💾 Save this box design', function () { if (l * w * h !== target) { M.toast('This box holds ' + (l * w * h) + ' cubes, not ' + target + '.', true); return; } var key = [l, w, h].sort(function (a, b) { return a - b; }).join('×'); if (found.indexOf(key) >= 0) { M.toast('You already found ' + key + ' (turning a box doesn\'t make a new one).'); return; } found.push(key); report(); draw(); }, 'primary');
  ctr.appendChild(sv); M.el.appendChild(ctr);
  function all() { var out = []; for (var a = 1; a <= target; a++) for (var b = a; b <= target; b++) for (var c = b; c <= target; c++) if (a * b * c === target) out.push(a + '×' + b + '×' + c); return out; }
  function report() { M.set({ V: l * w * h, is: l * w * h === target, found: found.length, allCount: all().length, foundAll: found.length === all().length, cube: l === w && w === h }); }
  function draw() {
    var s = Math.min(26, 250 / (l + w + h)), iso = K.iso(210, 60, s), out = '<rect width="420" height="320" fill="#fff4e6"/>', cs = [];
    for (var z = 0; z < h; z++) for (var y = 0; y < w; y++) for (var x = 0; x < l; x++) cs.push([x, y, z]);
    if (cs.length <= 300) { cs.sort(function (p, q) { return p[2] - q[2] || (p[0] + p[1]) - (q[0] + q[1]); }); cs.forEach(function (c) { out += iso(c[0], c[1], c[2], l * w * h === target ? '#69db7c' : '#ffa8a8'); }); }
    out += '<text x="210" y="305" text-anchor="middle" font-size="15" font-weight="800">' + l + ' × ' + w + ' × ' + h + ' = ' + (l * w * h) + ' cubes</text>';
    svg.innerHTML = out;
    list.innerHTML = '<h3>Box designs with volume ' + target + '</h3><p class="sn-note">Found ' + found.length + '. (A 2×3×4 box and a 4×3×2 box count as the same box.)</p><ol>' + found.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ol>';
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var A = all(); var need = c.foundAll ? A.length : c.found ? (c.found.gte || c.found) : 1; A.slice(0, need).forEach(function (k2) { if (found.indexOf(k2) < 0) found.push(k2); }); var p = A[0].split('×').map(Number); l = p[0]; w = p[1]; h = p[2]; report(); draw(); } };
};
