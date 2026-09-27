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

/* ================================================================== */
/*                       GRADE 6 MATH MODELS                           */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/* Smoothie Mixer: equivalent ratios by taste and color               */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.smoothie = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var R = cfg.ratio || [2, 3], NAMES = cfg.names || ['strawberry', 'yogurt'], COL = [[231, 49, 49], [248, 244, 232]];
  var a = 0, b = 0, made = [], dnl = false;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 300 300', class: 'sn-svg', role: 'img', 'aria-label': 'Blender with a smoothie' });
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var tbl = K.el('<div class="sn-panel"></div>'), line = K.svgEl('svg', { viewBox: '0 0 400 120', class: 'sn-svg', role: 'img', 'aria-label': 'Double number line' });
  side.appendChild(tbl); side.appendChild(line);
  row.appendChild(svg); row.appendChild(side); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var aB = K.btn('🍓 +1 cup ' + NAMES[0], function () { a++; report(); draw(); }, 'sm'), bB = K.btn('🥛 +1 cup ' + NAMES[1], function () { b++; report(); draw(); }, 'sm');
  var taste = K.btn('😋 Taste test & save', function () { if (!a || !b) { M.toast('Add both ingredients first.', true); return; } var ok = a * R[1] === b * R[0]; M.toast(ok ? '✓ Tastes exactly like the recipe!' : '✗ Too much ' + (a * R[1] > b * R[0] ? NAMES[0] : NAMES[1]) + '. It doesn\'t match.', !ok); if (ok && !made.some(function (m) { return m[0] === a; })) made.push([a, b]); made.sort(function (p, q) { return p[0] - q[0]; }); report(); draw(); }, 'primary');
  var dump = K.btn('Pour out', function () { a = 0; b = 0; report(); draw(); }, 'ghost sm');
  var dT = K.toggle('Show double number line', false, function (v) { dnl = v; M.set('usedDNL', v ? true : S.usedDNL); draw(); });
  [aB, bB, taste, dump, dT.el].forEach(function (x) { ctr.appendChild(x); }); M.el.appendChild(ctr);
  function report() { var st = { a: a, b: b, match: a > 0 && a * R[1] === b * R[0], saved: made.length, savedList: made.map(function (m) { return m.join(':'); }).join(', ') }; made.forEach(function (m) { st['ok_' + m[0] + '_' + m[1]] = true; }); M.set(st); }
  function draw() {
    var t = a + b, f = t ? a / t : 0, c = COL[0].map(function (v, i) { return Math.round(v * f + COL[1][i] * (1 - f)); }), tf = R[0] / (R[0] + R[1]), tc = COL[0].map(function (v, i) { return Math.round(v * tf + COL[1][i] * (1 - tf)); });
    var h = '<rect width="300" height="300" fill="#fff0f6"/><path d="M90 40 h120 l-15 170 h-90 z" fill="rgba(255,255,255,.7)" stroke="#495057" stroke-width="3"/>';
    var lvl = Math.min(160, t * 10); if (t) h += '<path d="M' + (105 - lvl * 0.02) + ' ' + (208 - lvl) + ' h' + (90 + lvl * 0.04) + ' l-' + (lvl * 0.09) + ' ' + lvl + ' h-' + (90 - lvl * 0.14) + ' z" fill="rgb(' + c.join(',') + ')"/>';
    h += '<rect x="80" y="210" width="140" height="50" rx="8" fill="#495057"/><circle cx="150" cy="235" r="10" fill="#ced4da"/><text x="150" y="30" text-anchor="middle" font-size="12" font-weight="800">' + a + ' cups ' + NAMES[0] + ' : ' + b + ' cups ' + NAMES[1] + '</text>';
    h += '<circle cx="255" cy="80" r="26" fill="rgb(' + tc.join(',') + ')" stroke="#495057" stroke-width="2"/><text x="255" y="122" text-anchor="middle" font-size="10">recipe color</text><circle cx="255" cy="170" r="26" fill="rgb(' + c.join(',') + ')" stroke="#495057" stroke-width="2"/><text x="255" y="212" text-anchor="middle" font-size="10">your color</text>';
    svg.innerHTML = h;
    tbl.innerHTML = '<h3>📜 Recipe: ' + R[0] + ' cups ' + NAMES[0] + ' for every ' + R[1] + ' cups ' + NAMES[1] + '</h3><div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>Batch</th><th>' + NAMES[0] + '</th><th>' + NAMES[1] + '</th></tr></thead><tbody>' + (made.length ? made.map(function (m, i) { return '<tr><td>' + (i + 1) + '</td><td>' + m[0] + '</td><td>' + m[1] + '</td></tr>'; }).join('') : '<tr><td colspan="3" class="sn-note">Saved batches that taste right appear here.</td></tr>') + '</tbody></table></div>';
    line.style.display = dnl ? '' : 'none';
    if (dnl) { var L = '<rect width="400" height="120" fill="#fff"/><line x1="20" x2="380" y1="40" y2="40" stroke="#1d2433" stroke-width="2"/><line x1="20" x2="380" y1="90" y2="90" stroke="#1d2433" stroke-width="2"/><text x="6" y="26" font-size="11" font-weight="800">' + NAMES[0] + '</text><text x="6" y="112" font-size="11" font-weight="800">' + NAMES[1] + '</text>'; for (var k = 0; k <= 5; k++) { var x = 20 + k * 72; L += '<line x1="' + x + '" x2="' + x + '" y1="34" y2="46" stroke="#1d2433"/><line x1="' + x + '" x2="' + x + '" y1="84" y2="96" stroke="#1d2433"/><text x="' + x + '" y="30" text-anchor="middle" font-size="12" font-weight="800">' + (R[0] * k) + '</text><text x="' + x + '" y="110" text-anchor="middle" font-size="12" font-weight="800">' + (R[1] * k) + '</text>'; } line.innerHTML = L; }
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var want = c.saved ? (c.saved.gte || c.saved) : 1; for (var kk in c) { var mm = kk.match(/^ok_(\d+)_(\d+)$/); if (mm) { a = +mm[1]; b = +mm[2]; if (!made.some(function (m) { return m[0] === a; })) made.push([a, b]); } } for (var i = 1; made.length < want; i++) { if (!made.some(function (m) { return m[0] === R[0] * i; })) made.push([R[0] * i, R[1] * i]); } made.sort(function (p, q) { return p[0] - q[0]; }); if (c.usedDNL) { dnl = true; dT.set(true); M.set('usedDNL', true); } if (c.match) { a = R[0] * 2; b = R[1] * 2; } report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Race Track Rates: unit rates from distance and time                 */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.raceRates = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var RC = cfg.racers || [['🐆', 'Cheetah', 150, 5], ['🐎', 'Horse', 84, 6], ['🐇', 'Rabbit', 72, 4], ['🧒', 'Sixth grader', 42, 7]];
  var t = 0, T = 10, running = false, seen = {};
  M.el.innerHTML = '';
  var info = K.el('<div class="sn-panel"></div>'); M.el.appendChild(info);
  var svg = K.svgEl('svg', { viewBox: '0 0 700 250', class: 'sn-svg', role: 'img', 'aria-label': 'Race track with four racers' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var dS = K.slider({ label: '⏱ Race length', min: 1, max: 10, step: 1, value: T, unit: 'seconds', onInput: function (v) { T = v; t = 0; running = false; draw(); } });
  var go = K.btn('🏁 Start race', function () { t = 0; running = true; }, 'primary');
  ctr.appendChild(dS.el); ctr.appendChild(go); M.el.appendChild(ctr);
  function rate(r) { return r[2] / r[3]; }
  function draw() {
    info.innerHTML = '<b>🏟 Speed data from the nature center:</b> ' + RC.map(function (r) { return r[0] + ' ' + r[1] + ' ran <b>' + r[2] + ' m in ' + r[3] + ' s</b>'; }).join(' · ');
    var h = '<rect width="700" height="250" fill="#8ce99a"/>', max = 320;
    RC.forEach(function (r, i) { var y = 20 + i * 55, d = rate(r) * Math.min(t, T); h += '<rect x="0" y="' + y + '" width="700" height="46" fill="' + (i % 2 ? '#e8590c' : '#f76707') + '" opacity=".75"/>'; for (var m = 0; m <= max; m += 40) h += '<line x1="' + (50 + m * 2) + '" x2="' + (50 + m * 2) + '" y1="' + y + '" y2="' + (y + 46) + '" stroke="#fff" stroke-width="1" opacity=".6"/>' + (i === 0 ? '<text x="' + (50 + m * 2) + '" y="248" font-size="10" text-anchor="middle">' + m + ' m</text>' : ''); h += '<text x="' + Math.min(680, 50 + d * 2) + '" y="' + (y + 34) + '" font-size="28" text-anchor="middle">' + r[0] + '</text><text x="6" y="' + (y + 28) + '" font-size="11" font-weight="800" fill="#fff">' + r[1] + '</text>' + (t >= T || !running && t > 0 ? '<text x="' + Math.min(690, 50 + d * 2 + 26) + '" y="' + (y + 20) + '" font-size="12" font-weight="800" fill="#fff">' + K.fmt(d, 1) + ' m</text>' : ''); });
    svg.innerHTML = h;
  }
  M.loop(function (dt) { if (!running) return; t += dt * 2; if (t >= T) { t = T; running = false; var st = { raced: true, lastT: T }; RC.forEach(function (r) { st['d_' + r[1].split(' ')[0].toLowerCase() + '_' + T] = K.round(rate(r) * T, 1); }); seen[T] = true; st.times = Object.keys(seen).length; M.set(st); } draw(); });
  M.set({ raced: false }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var Ts = []; for (var k in c) { var mm = k.match(/^d_\w+_(\d+)$/); if (mm) Ts.push(+mm[1]); } if (c.lastT) Ts.push(c.lastT.eq || c.lastT); if (!Ts.length) Ts.push(T); if (c.times) Ts = Ts.concat([1, 3, 10]); Ts.forEach(function (x) { T = x; var st2 = { raced: true, lastT: T }; RC.forEach(function (r) { st2['d_' + r[1].split(' ')[0].toLowerCase() + '_' + T] = K.round(rate(r) * T, 1); }); seen[T] = true; st2.times = Object.keys(seen).length; M.set(st2); }); t = T; dS.set(T, true); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Sale Day: percent of a quantity with a percent bar                 */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.percentStore = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var ITEMS = cfg.items || [['👟', 'Sneakers', 60, 25], ['🧥', 'Jacket', 80, 30], ['🎒', 'Backpack', 45, 20], ['🎧', 'Headphones', 120, 15]];
  var k = 0, pct = 50;
  M.el.innerHTML = '';
  var ticket = K.el('<div class="sn-panel"></div>'); M.el.appendChild(ticket);
  var svg = K.svgEl('svg', { viewBox: '0 0 680 230', class: 'sn-svg', role: 'img', 'aria-label': 'Percent bar model for a price tag' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rP = K.readout('Marker at', '%', true), rD = K.readout('Dollar amount at marker', ''); reads.appendChild(rP.el); reads.appendChild(rD.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Drag the ▼ marker along the percent bar. It snaps to every 5%.</span></div>');
  var iS = K.seg(ITEMS.map(function (it, i) { return [String(i), it[0] + ' ' + it[1]]; }), '0', function (v) { k = +v; pct = 50; report(); draw(); });
  ctr.appendChild(iS.el); M.el.appendChild(ctr);
  var X0 = 40, W = 600;
  function price() { return ITEMS[k][2]; }
  function report() { var it = ITEMS[k], st = { item: k, pct: pct, amount: K.round(price() * pct / 100, 2) }; st['at_' + k + '_' + pct] = true; if (pct === it[3]) st['off_' + k] = true; if (pct === 100 - it[3]) st['pay_' + k] = true; M.set(st); rP.set(pct); rD.set(K.money(price() * pct / 100)); }
  function draw() {
    var it = ITEMS[k];
    ticket.innerHTML = '<b>' + it[0] + ' ' + it[1] + '</b> · Original price <b>' + K.money(it[2]) + '</b> · 🏷 SALE: <b>' + it[3] + '% OFF</b>. How much do you save, and what do you pay?';
    var h = '<rect width="680" height="230" fill="#fff9db"/>';
    h += '<rect x="' + X0 + '" y="70" width="' + W + '" height="44" fill="#fff" stroke="#1d2433" stroke-width="2"/>';
    for (var p = 10; p < 100; p += 10) h += '<line x1="' + (X0 + p / 100 * W) + '" x2="' + (X0 + p / 100 * W) + '" y1="70" y2="114" stroke="#adb5bd"/>';
    h += '<rect x="' + X0 + '" y="70" width="' + (pct / 100 * W) + '" height="44" fill="#ffa94d" opacity=".75"/>';
    for (var q = 0; q <= 100; q += 10) { var x = X0 + q / 100 * W; h += '<text x="' + x + '" y="60" text-anchor="middle" font-size="11" font-weight="700">' + q + '%</text><text x="' + x + '" y="134" text-anchor="middle" font-size="11" fill="#495057">' + K.money(it[2] * q / 100).replace('.00', '') + '</text>'; }
    var mx = X0 + pct / 100 * W; h += '<g class="ps-m" role="slider" aria-valuenow="' + pct + '" aria-label="Percent marker" tabindex="0"><path d="M' + (mx - 11) + ' 150 h22 l-11 -16 z" fill="#e03131"/><line x1="' + mx + '" x2="' + mx + '" y1="66" y2="150" stroke="#e03131" stroke-width="3"/><text x="' + mx + '" y="174" text-anchor="middle" font-size="14" font-weight="800" fill="#e03131">' + pct + '% = ' + K.money(it[2] * pct / 100) + '</text><rect x="' + (mx - 20) + '" y="60" width="40" height="120" fill="transparent"/></g>';
    h += '<text x="' + X0 + '" y="210" font-size="12" fill="#495057">The whole bar is 100% = ' + K.money(it[2]) + '. Each 10% section is ' + K.money(it[2] / 10) + '.</text>';
    svg.innerHTML = h;
    K.drag(svg.querySelector('.ps-m'), { svg: svg, pos: function () { return [mx, 100]; }, move: function (x) { var np = K.clamp(Math.round((x - X0) / W * 20) * 5, 0, 100); if (np !== pct) { pct = np; report(); draw(); } }, keyStep: W / 20 });
  }
  report(); draw();
  return { setup: function (o) { if (o.item != null) { k = o.item; iS.set(String(k)); pct = 50; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.item != null) { k = c.item; iS.set(String(k)); } for (var kk in c) { var mm = kk.match(/^(off|pay)_(\d)$/); if (mm) { k = +mm[2]; pct = mm[1] === 'off' ? ITEMS[k][3] : 100 - ITEMS[k][3]; report(); } var m2 = kk.match(/^at_(\d)_(\d+)$/); if (m2) { k = +m2[1]; pct = +m2[2]; report(); } } if (c.pct != null) pct = c.pct.eq != null ? c.pct.eq : c.pct; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Road Trip Map Scale: measure with a ruler, convert with a ratio    */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.mapScale = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var TOWNS = cfg.towns || [['Sunnyside', 80, 250], ['Maple Falls', 380, 250], ['Oak Ridge', 380, 90], ['Pine Lake', 620, 90], ['Cedar Point', 620, 290]];
  var SC = cfg.scale || 10, PX = 20; // 1 cm = 10 miles; 1 cm = 20 px on screen
  var a = null, b = null, ruler = { x1: 80, y1: 310, x2: 280, y2: 310 };
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 700 340', class: 'sn-svg', role: 'img', 'aria-label': 'Road map of towns with a scale bar and ruler' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rR = K.readout('Ruler reads', 'cm', true), rT = K.readout('Trip', ''); reads.appendChild(rR.el); reads.appendChild(rT.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Tap two towns to lay the ruler between them. You can also drag the ruler\'s ends.</span></div>'); M.el.appendChild(ctr);
  function cm() { var dx = ruler.x2 - ruler.x1, dy = ruler.y2 - ruler.y1; return K.round(Math.sqrt(dx * dx + dy * dy) / PX, 1); }
  function report() { var st = { cm: cm(), from: a, to: b }; if (a != null && b != null) { var key = [TOWNS[a][0], TOWNS[b][0]].sort().join('|'); st['m_' + key.replace(/\s/g, '')] = cm(); var ms = (S.measures || []).slice(); if (ms.indexOf(key) < 0) ms.push(key); st.measures = ms; st.measured = ms.length; } M.set(st); rR.set(cm()); rT.set(a != null && b != null ? TOWNS[a][0] + ' → ' + TOWNS[b][0] : '—'); }
  function draw() {
    var h = '<rect width="700" height="340" fill="#e6fcf5"/><path d="M0 200 Q200 170 350 210 T700 190" stroke="#74c0fc" stroke-width="18" fill="none" opacity=".6"/>';
    [[0, 1], [1, 2], [2, 3], [1, 4], [3, 4]].forEach(function (e) { var p = TOWNS[e[0]], q = TOWNS[e[1]]; h += '<line x1="' + p[1] + '" y1="' + p[2] + '" x2="' + q[1] + '" y2="' + q[2] + '" stroke="#adb5bd" stroke-width="8" stroke-linecap="round"/><line x1="' + p[1] + '" y1="' + p[2] + '" x2="' + q[1] + '" y2="' + q[2] + '" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>'; });
    TOWNS.forEach(function (t, i) { h += '<g class="ms-t" data-i="' + i + '" role="button" tabindex="0"><circle cx="' + t[1] + '" cy="' + t[2] + '" r="10" fill="' + (i === a || i === b ? '#e8590c' : '#1971c2') + '" stroke="#fff" stroke-width="3"/><text x="' + t[1] + '" y="' + (t[2] - 16) + '" text-anchor="middle" font-size="13" font-weight="800">' + t[0] + '</text><circle cx="' + t[1] + '" cy="' + t[2] + '" r="22" fill="transparent"/></g>'; });
    h += '<g><rect x="520" y="16" width="160" height="40" rx="6" fill="#fff" stroke="#495057"/><line x1="530" x2="' + (530 + PX) + '" y1="44" y2="44" stroke="#1d2433" stroke-width="4"/><text x="' + (536 + PX) + '" y="48" font-size="12" font-weight="800">1 cm = ' + SC + ' miles</text><text x="530" y="32" font-size="10" fill="#495057">MAP SCALE</text></g>';
    var dx = ruler.x2 - ruler.x1, dy = ruler.y2 - ruler.y1, L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
    h += '<g transform="translate(' + ruler.x1 + ' ' + ruler.y1 + ') rotate(' + ang + ')"><rect x="0" y="-9" width="' + L + '" height="18" fill="#ffe066" opacity=".85" stroke="#e0b400"/>';
    for (var c = 0; c * PX <= L; c++) h += '<line x1="' + c * PX + '" x2="' + c * PX + '" y1="-9" y2="' + (c % 5 ? -2 : 4) + '" stroke="#1d2433"/>' + (c % 5 === 0 ? '<text x="' + c * PX + '" y="8" font-size="8" text-anchor="middle">' + c + '</text>' : '');
    h += '</g><circle class="ms-e1" cx="' + ruler.x1 + '" cy="' + ruler.y1 + '" r="9" fill="#f08c00"/><circle class="ms-e2" cx="' + ruler.x2 + '" cy="' + ruler.y2 + '" r="9" fill="#f08c00"/>';
    svg.innerHTML = h;
    svg.querySelectorAll('.ms-t').forEach(function (g) { g.addEventListener('click', function () { var i = +g.getAttribute('data-i'); if (a == null || (a != null && b != null)) { a = i; b = null; } else if (i !== a) { b = i; var p1 = TOWNS[a], p2 = TOWNS[b]; if (p2[1] < p1[1] || (p2[1] === p1[1] && p2[2] < p1[2])) { var tmp = p1; p1 = p2; p2 = tmp; } ruler = { x1: p1[1], y1: p1[2], x2: p2[1], y2: p2[2] }; } report(); draw(); }); });
    [['ms-e1', 'x1', 'y1'], ['ms-e2', 'x2', 'y2']].forEach(function (e) { K.drag(svg.querySelector('.' + e[0]), { svg: svg, pos: function () { return [ruler[e[1]], ruler[e[2]]]; }, move: function (x, y) { ruler[e[1]] = K.clamp(x, 0, 700); ruler[e[2]] = K.clamp(y, 0, 340); a = null; b = null; draw(); report(); } }); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var pairs = []; for (var k in c) { var mm = k.match(/^m_(\w+)\|(\w+)$/); if (mm) pairs.push([mm[1], mm[2]]); } if (c.measured) pairs = [['MapleFalls', 'Sunnyside'], ['MapleFalls', 'OakRidge'], ['OakRidge', 'PineLake']]; pairs.forEach(function (p) { var i = TOWNS.map(function (t) { return t[0].replace(/\s/g, ''); }).indexOf(p[0]), j = TOWNS.map(function (t) { return t[0].replace(/\s/g, ''); }).indexOf(p[1]); a = i; b = j; ruler = { x1: TOWNS[a][1], y1: TOWNS[a][2], x2: TOWNS[b][1], y2: TOWNS[b][2] }; report(); }); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Paint Mixer: part-to-part and part-to-whole ratios                 */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.paintMix = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var TARGETS = cfg.targets || [{ name: 'Sunnyside Green', b: 1, y: 3 }, { name: 'Ocean Teal', b: 3, y: 2 }, { name: 'Spring Lime', b: 1, y: 4 }];
  var ti = 0, blue = 0, yellow = 0, saved = [];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 260', class: 'sn-svg', role: 'img', 'aria-label': 'Paint cans and a mixing bucket' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rR = K.readout('Blue : Yellow', '', true), rW = K.readout('Blue part of whole', ''); reads.appendChild(rR.el); reads.appendChild(rW.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var tS = K.seg(TARGETS.map(function (t, i) { return [String(i), t.name]; }), '0', function (v) { ti = +v; blue = 0; yellow = 0; report(); draw(); });
  var bB = K.btn('🔵 +1 blue', function () { blue++; report(); draw(); }, 'sm'), yB = K.btn('🟡 +1 yellow', function () { yellow++; report(); draw(); }, 'sm'), dm = K.btn('Empty bucket', function () { blue = 0; yellow = 0; report(); draw(); }, 'ghost sm');
  ctr.appendChild(tS.el); var r2 = K.el('<div class="sn-row"></div>'); [bB, yB, dm].forEach(function (x) { r2.appendChild(x); }); ctr.appendChild(r2); M.el.appendChild(ctr);
  function mix(b, y) { var t = b + y; if (!t) return [240, 240, 240]; var fb = b / t; return [Math.round(30 * fb + 250 * (1 - fb)), Math.round(110 * fb + 210 * (1 - fb)), Math.round(220 * fb + 20 * (1 - fb))]; }
  function report() { var T = TARGETS[ti], st = { target: ti, blue: blue, yellow: yellow, match: blue > 0 && blue * T.y === yellow * T.b, total: blue + yellow }; if (st.match) { st['match_' + ti + '_' + (blue + yellow)] = true; } M.set(st); rR.set(blue + ' : ' + yellow); rW.set(blue + yellow ? blue + '/' + (blue + yellow) : '—'); }
  function draw() {
    var T = TARGETS[ti], tc = mix(T.b, T.y), mc = mix(blue, yellow);
    var h = '<rect width="640" height="260" fill="#f8f9fa"/><rect x="30" y="60" width="90" height="120" rx="8" fill="#1c7ed6"/><text x="75" y="200" text-anchor="middle" font-size="12" font-weight="800">BLUE</text><rect x="140" y="60" width="90" height="120" rx="8" fill="#fcc419"/><text x="185" y="200" text-anchor="middle" font-size="12" font-weight="800">YELLOW</text>';
    h += '<path d="M300 80 h140 l-12 150 h-116 z" fill="#dee2e6" stroke="#495057" stroke-width="3"/>'; var lv = Math.min(140, (blue + yellow) * 7); if (lv) h += '<path d="M' + (312 + (140 - lv) * 0) + ' ' + (228 - lv) + ' h116 l-' + (lv * 0.08) + ' ' + lv + ' h-' + (116 - lv * 0.16) + ' z" fill="rgb(' + mc.join(',') + ')"/>';
    h += '<text x="370" y="70" text-anchor="middle" font-size="12" font-weight="800">' + blue + ' blue + ' + yellow + ' yellow</text>';
    h += '<rect x="480" y="60" width="130" height="80" rx="8" fill="rgb(' + tc.join(',') + ')" stroke="#495057" stroke-width="2"/><text x="545" y="160" text-anchor="middle" font-size="12" font-weight="800">' + T.name + '</text><text x="545" y="176" text-anchor="middle" font-size="11">recipe ' + T.b + ' blue : ' + T.y + ' yellow</text><text x="545" y="200" text-anchor="middle" font-size="12" font-weight="800" fill="' + (blue && blue * T.y === yellow * T.b ? '#2b8a3e' : '#c92a2a') + '">' + (blue + yellow ? (blue * T.y === yellow * T.b ? '✓ exact match' : '✗ not a match') : '') + '</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { setup: function (o) { if (o.target != null) { ti = o.target; tS.set(String(ti)); blue = 0; yellow = 0; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.target != null) ti = c.target; var T = TARGETS[ti], n = 1; for (var kk in c) { var mm = kk.match(/^match_(\d)_(\d+)$/); if (mm) { ti = +mm[1]; T = TARGETS[ti]; n = +mm[2] / (T.b + T.y); } } if (c.total) n = Math.ceil((c.total.gte || c.total) / (T.b + T.y)); blue = T.b * n; yellow = T.y * n; tS.set(String(ti)); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Balance Scale: keep it balanced while solving equations             */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.balance = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var EQ = cfg.equations || [{ lx: 1, lu: 3, ru: 8, x: 5 }, { lx: 3, lu: 0, ru: 12, x: 4 }, { lx: 2, lu: 5, ru: 17, x: 6 }, { lx: 4, lu: 2, ru: 22, x: 5 }];
  var e = 0, lx, lu, ru, rx, tilt = 0, moves = 0, unbal = false;
  M.el.innerHTML = '';
  var eqBox = K.el('<div class="sn-panel" style="font-size:1.4em;text-align:center;font-weight:800" aria-live="polite"></div>'); M.el.appendChild(eqBox);
  var svg = K.svgEl('svg', { viewBox: '0 0 640 280', class: 'sn-svg', role: 'img', 'aria-label': 'Pan balance with mystery bags and blocks' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var b1 = K.btn('➖ Take 1 block off BOTH sides', function () { if (lu < 1 || ru < 1) { M.toast('Both sides need a block to take off.', true); return; } lu--; ru--; moves++; report(); draw(); }, 'primary');
  var b2 = K.btn('➖ Take 1 block off the LEFT only', function () { if (lu < 1) return; lu--; unbal = true; moves++; report(); draw(); }, 'ghost');
  var sp = K.btn('➗ Split both sides into equal groups', function () { if (lx < 2) { M.toast('There is only one bag on the left.'); return; } if (lu % lx || ru % lx) { M.toast('The blocks can\'t be split into ' + lx + ' equal groups yet. Remove blocks first.', true); return; } lu /= lx; ru /= lx; lx = 1; moves++; report(); draw(); });
  var rs = K.btn('↺ Reset scale', function () { load(e); }, 'ghost sm');
  var nx = K.btn('Next equation ▶', function () { load((e + 1) % EQ.length); }, 'ghost sm');
  [b1, b2, sp, rs, nx].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function load(i) { e = i; var q = EQ[e]; lx = q.lx; lu = q.lu; ru = q.ru; rx = 0; unbal = false; moves = 0; report(); draw(); }
  function side(n) { return n; }
  function report() { var q = EQ[e], L = lx * q.x + lu, R = ru, bal = L === R; tilt = bal ? 0 : L > R ? 1 : -1; var st = { eq: e, lx: lx, lu: lu, ru: ru, balanced: bal, solved: bal && lx === 1 && lu === 0, moves: moves, unbalanced: unbal || S.unbalanced }; if (st.solved) st['solved_' + e] = ru; M.set(st); }
  function draw() {
    var q = EQ[e];
    eqBox.innerHTML = (lx ? (lx > 1 ? lx : '') + 'x' : '') + (lu ? ' + ' + lu : '') + ' = ' + ru + (tilt ? ' <span style="color:#c92a2a;font-size:.6em">⚠ NOT BALANCED</span>' : '');
    var ang = tilt * 8, h = '<rect width="640" height="280" fill="#f3f0ff"/><polygon points="300,250 340,250 320,150" fill="#5f3dc4"/><rect x="200" y="250" width="240" height="14" rx="4" fill="#5f3dc4"/>';
    h += '<g transform="rotate(' + ang + ' 320 150)"><rect x="80" y="144" width="480" height="10" rx="4" fill="#7048e8"/>';
    function pan(cx, bags, blocks) { var o = '<path d="M' + (cx - 100) + ' 150 L' + (cx - 80) + ' 210 H' + (cx + 80) + ' L' + (cx + 100) + ' 150" fill="none" stroke="#7048e8" stroke-width="3"/><rect x="' + (cx - 90) + '" y="210" width="180" height="10" rx="4" fill="#9775fa"/>'; var items = []; for (var i = 0; i < bags; i++) items.push('bag'); for (var j = 0; j < blocks; j++) items.push('blk'); items.forEach(function (t, k) { var col = k % 8, row = Math.floor(k / 8), x = cx - 84 + col * 21, y = 190 - row * 22; o += t === 'bag' ? '<path d="M' + x + ' ' + (y + 18) + ' q-2 -14 9 -16 q11 2 9 16 z" fill="#e8590c" stroke="#862e0a"/><text x="' + (x + 9) + '" y="' + (y + 15) + '" font-size="10" text-anchor="middle" fill="#fff" font-weight="800">x</text>' : '<rect x="' + x + '" y="' + (y + 2) + '" width="18" height="18" rx="3" fill="#fcc419" stroke="#e67700"/>'; }); return o; }
    h += pan(170, lx, lu) + pan(470, rx, ru) + '</g>';
    h += '<text x="170" y="275" text-anchor="middle" font-size="12" font-weight="800">LEFT</text><text x="470" y="275" text-anchor="middle" font-size="12" font-weight="800">RIGHT</text><text x="320" y="30" text-anchor="middle" font-size="12" fill="#495057">Each 🟧 bag holds the same unknown number of blocks (x). Each 🟨 = 1 block.</text>';
    svg.innerHTML = h;
  }
  load(0);
  return { setup: function (o) { if (o.eq != null) load(o.eq); }, auto: function (st) { var c = st.goal.check || {}; if (c.eq != null) e = c.eq; for (var k in c) { var mm = k.match(/^solved_(\d)$/); if (mm) e = +mm[1]; } if (c.unbalanced) { M.set('unbalanced', true); } var q = EQ[e]; lx = 1; lu = 0; ru = q.x; moves = 3; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Function Machine: discover the rule and write it as an expression   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.funcMachine = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var RULES = cfg.rules || ['n + 4', '3n', '2n + 1', '5n - 3', 'n/2 + 1'];
  var r = 0, log = [], guess = '';
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 380 260', class: 'sn-svg', role: 'img', 'aria-label': 'Function machine' });
  var tb = K.el('<div class="sn-panel"></div>');
  row.appendChild(svg); row.appendChild(tb); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var nIn = K.el('<label class="sn-slider" style="flex:0 0 auto;min-width:0">Input n <input type="number" min="0" max="20" value="1" style="width:5em;font:inherit;padding:3px 6px;border:2px solid var(--sn-line);border-radius:6px"></label>');
  var feed = K.btn('▶ Feed the machine', function () { var n = +nIn.querySelector('input').value; if (isNaN(n)) return; run(n); }, 'primary');
  var gIn = K.el('<label class="sn-slider" style="flex:1;min-width:220px">My rule: output = <input type="text" placeholder="like 2n + 3" style="flex:1;font:inherit;padding:3px 6px;border:2px solid var(--sn-line);border-radius:6px"></label>');
  var test = K.btn('🧪 Test my rule', function () { testRule(gIn.querySelector('input').value); });
  var nx = K.btn('Next machine ▶', function () { r = (r + 1) % RULES.length; log = []; report(); draw(); }, 'ghost sm');
  [nIn, feed, gIn, test, nx].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function compile(expr) { var e = String(expr).toLowerCase().replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/(\d)(n|\()/g, '$1*$2').replace(/n(\d|\()/g, 'n*$1').replace(/\)(n|\d|\()/g, ')*$1'); if (!/^[\dn+\-*/().]+$/.test(e)) return null; try { var f = new Function('n', 'return (' + e + ');'); f(1); return f; } catch (x) { return null; } }
  function rule(n) { return compile(RULES[r])(n); }
  function run(n) { var out = K.round(rule(n), 3); if (!log.some(function (p) { return p[0] === n; })) log.push([n, out]); log.sort(function (a, b) { return a[0] - b[0]; }); report(); draw(n, out); }
  function testRule(g) { var f = compile(g); if (!f) { M.toast('I can\'t read that rule. Use n, numbers, +, −, ×, ÷.', true); return; } var ok = true; for (var n = 0; n <= 12; n++) if (Math.abs(f(n) - rule(n)) > 1e-9) ok = false; M.toast(ok ? '✓ Your rule matches the machine for every input!' : '✗ Your rule doesn\'t match every input. Test more inputs.', !ok); var st = { lastGuess: g, tries: (S.tries || 0) + 1 }; if (ok) { st['rule_' + r] = true; st.ruleOK = true; } else st.ruleOK = false; M.set(st); }
  function report() { var st = { machine: r, inputs: log.length, ruleOK: false }; M.set(st); }
  function draw(n, out) {
    var h = '<rect width="380" height="260" fill="#f8f9fa"/><rect x="110" y="60" width="160" height="120" rx="14" fill="#7048e8"/><circle cx="150" cy="100" r="10" fill="#ffe066"/><circle cx="230" cy="100" r="10" fill="#ffe066"/><rect x="150" y="130" width="80" height="24" rx="6" fill="#5f3dc4"/><text x="190" y="147" text-anchor="middle" font-size="14" fill="#fff" font-weight="800">RULE: ???</text><text x="190" y="50" text-anchor="middle" font-size="13" font-weight="800">Machine ' + (r + 1) + '</text>';
    h += '<path d="M30 120 H110" stroke="#495057" stroke-width="4"/><path d="M270 120 H350" stroke="#495057" stroke-width="4"/>';
    if (n != null) h += '<rect x="30" y="92" width="54" height="26" rx="6" fill="#fff" stroke="#495057"/><text x="57" y="111" text-anchor="middle" font-size="15" font-weight="800">' + n + '</text><rect x="296" y="92" width="64" height="26" rx="6" fill="#fff" stroke="#495057"/><text x="328" y="111" text-anchor="middle" font-size="15" font-weight="800">' + out + '</text>';
    h += '<text x="57" y="150" text-anchor="middle" font-size="11">IN</text><text x="328" y="150" text-anchor="middle" font-size="11">OUT</text>';
    svg.innerHTML = h;
    tb.innerHTML = '<h3>Input / output table</h3><div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>n (in)</th><th>out</th></tr></thead><tbody>' + (log.length ? log.map(function (p) { return '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td></tr>'; }).join('') : '<tr><td colspan="2" class="sn-note">Feed the machine some inputs.</td></tr>') + '</tbody></table></div><p class="sn-note">Tip: try inputs in order (0, 1, 2, 3) and look at how the output changes.</p>';
  }
  report(); draw();
  return { setup: function (o) { if (o.machine != null) { r = o.machine; log = []; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.machine != null) r = c.machine; for (var k in c) { var mm = k.match(/^rule_(\d)$/); if (mm) r = +mm[1]; } [0, 1, 2, 3].forEach(run); if (c.inputs) [4, 5].forEach(run); testRule(RULES[r]); } };
};

/* ------------------------------------------------------------------ */
/* Algebra Tiles: equivalent expressions and the distributive property */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.algebraTiles = function (M) {
  var K = M.kit, S = M.state;
  var gx = 0, gu = 0, copies = 1, sorted = false, mess = null;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 680 300', class: 'sn-svg', role: 'img', 'aria-label': 'Algebra tile workspace' }); M.el.appendChild(svg);
  var eqBox = K.el('<div class="sn-panel" style="font-size:1.25em;font-weight:800;text-align:center" aria-live="polite"></div>'); M.el.appendChild(eqBox);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var r1 = K.el('<div class="sn-row"><b class="sn-note">Build one group:</b></div>');
  r1.appendChild(K.btn('+ x tile', function () { gx++; sorted = false; mess = null; report(); draw(); }, 'sm')); r1.appendChild(K.btn('+ 1 tile', function () { gu++; sorted = false; mess = null; report(); draw(); }, 'sm')); r1.appendChild(K.btn('Clear', function () { gx = 0; gu = 0; copies = 1; sorted = false; mess = null; report(); draw(); }, 'ghost sm'));
  var cS = K.slider({ label: 'Number of groups', min: 1, max: 5, step: 1, value: 1, onInput: function (v) { copies = v; sorted = false; report(); draw(); } });
  var so = K.btn('🧹 Sort like tiles together', function () { sorted = true; report(); draw(); }, 'primary');
  var ms = K.btn('🎲 Messy pile: 2x + 3 + x + 1 + 2x', function () { mess = [2, 3, 1, 1, 2]; gx = 0; gu = 0; copies = 1; sorted = false; report(); draw(); }, 'sm');
  ctr.appendChild(r1); ctr.appendChild(cS.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(so); r2.appendChild(ms); ctr.appendChild(r2); M.el.appendChild(ctr);
  function totals() { if (mess) return [5, 4]; return [gx * copies, gu * copies]; }
  function report() { var t = totals(), st = { gx: gx, gu: gu, copies: copies, sorted: sorted, tx: t[0], tu: t[1], mess: !!mess }; st['g_' + copies + '_' + gx + '_' + gu] = true; if (sorted) st['s_' + t[0] + '_' + t[1]] = true; M.set(st); }
  function xt(x, y) { return '<rect x="' + x + '" y="' + y + '" width="16" height="64" rx="3" fill="#40c057" stroke="#2b8a3e"/><text x="' + (x + 8) + '" y="' + (y + 36) + '" font-size="11" font-weight="800" text-anchor="middle" fill="#fff">x</text>'; }
  function ut(x, y) { return '<rect x="' + x + '" y="' + y + '" width="16" height="16" rx="3" fill="#fcc419" stroke="#e67700"/>'; }
  function draw() {
    var h = '<rect width="680" height="300" fill="#f8f9fa"/>', t = totals();
    if (mess && !sorted) { var parts = [['x', 2], ['u', 3], ['x', 1], ['u', 1], ['x', 2]], x = 20; parts.forEach(function (p) { for (var i = 0; i < p[1]; i++) { h += p[0] === 'x' ? xt(x, 60) : ut(x, 108); x += 20; } x += 26; }); }
    else if (!sorted) { for (var g = 0; g < copies; g++) { var ox = 16 + g * 132; h += '<rect x="' + ox + '" y="30" width="122" height="160" rx="10" fill="none" stroke="#7048e8" stroke-width="2" stroke-dasharray="6 4"/><text x="' + (ox + 61) + '" y="24" font-size="11" text-anchor="middle" fill="#7048e8" font-weight="800">group ' + (g + 1) + '</text>'; for (var i2 = 0; i2 < gx; i2++) h += xt(ox + 8 + i2 * 20, 44); for (var j = 0; j < gu; j++) h += ut(ox + 8 + (j % 6) * 18, 124 + Math.floor(j / 6) * 20); } }
    else { for (var a = 0; a < t[0]; a++) h += xt(20 + a * 20, 50); for (var b = 0; b < t[1]; b++) h += ut(20 + (b % 20) * 20, 140 + Math.floor(b / 20) * 20); h += '<text x="20" y="40" font-size="12" font-weight="800" fill="#2b8a3e">' + t[0] + ' x tiles</text><text x="20" y="132" font-size="12" font-weight="800" fill="#e67700">' + t[1] + ' unit tiles</text>'; }
    h += '<text x="20" y="286" font-size="11" fill="#495057">Green bar = x (unknown). Yellow square = 1.</text>';
    svg.innerHTML = h;
    var one = (gx ? (gx > 1 ? gx : '') + 'x' : '') + (gx && gu ? ' + ' : '') + (gu ? gu : '');
    eqBox.textContent = mess ? (sorted ? '2x + 3 + x + 1 + 2x  =  5x + 4' : '2x + 3 + x + 1 + 2x') : (!gx && !gu ? 'Build a group of tiles' : (copies > 1 ? copies + '(' + one + ')' : one) + (sorted ? '  =  ' + (t[0] ? t[0] + 'x' : '') + (t[0] && t[1] ? ' + ' : '') + (t[1] || '') : ''));
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^g_(\d)_(\d)_(\d)$/); if (mm) { copies = +mm[1]; gx = +mm[2]; gu = +mm[3]; cS.set(copies, true); } var m2 = k.match(/^s_(\d+)_(\d+)$/); if (m2 && !mess) { sorted = true; } } if (c.mess) { mess = [2, 3, 1, 1, 2]; } if (c.sorted) sorted = true; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Arcade Tokens: write and evaluate expressions from a situation      */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.arcade = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var START = cfg.start || 50, COST = cfg.cost || 4, WIN = cfg.win || 12, BONUS = cfg.bonus || 5;
  var g = 0, log = {};
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 660 250', class: 'sn-svg', role: 'img', 'aria-label': 'Arcade token counter and ticket machine' }); M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rG = K.readout('Games played (g)', '', true), rT = K.readout('Tokens left', ''), rK = K.readout('Tickets won', ''); [rG, rT, rK].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var p1 = K.btn('🕹 Play one game', function () { if (START - COST * (g + 1) < 0) { M.toast('Not enough tokens!', true); return; } g++; log[g] = true; report(); draw(); }, 'primary');
  var rs = K.btn('↺ New visit', function () { g = 0; report(); draw(); }, 'ghost sm');
  ctr.appendChild(p1); ctr.appendChild(rs); M.el.appendChild(ctr);
  function report() { var st = { games: g, tokens: START - COST * g, tickets: g ? WIN * g + BONUS : 0, maxGames: Math.floor(START / COST) }; st['g_' + g] = true; M.set(st); rG.set(g); rT.set(START - COST * g); rK.set(g ? WIN * g + BONUS : 0); }
  function draw() {
    var tk = START - COST * g, h = '<rect width="660" height="250" fill="#2b2340"/><text x="20" y="28" fill="#ffd43b" font-size="14" font-weight="800">🎟 SUNNYSIDE ARCADE</text><text x="20" y="50" fill="#dee2e6" font-size="12">You start with ' + START + ' tokens. Each game costs ' + COST + ' tokens. Each game wins ' + WIN + ' tickets, plus a one-time ' + BONUS + '-ticket welcome bonus when you play.</text>';
    for (var i = 0; i < tk; i++) h += '<circle cx="' + (30 + (i % 25) * 14) + '" cy="' + (90 + Math.floor(i / 25) * 16) + '" r="6" fill="#fcc419" stroke="#e67700"/>';
    h += '<text x="30" y="140" fill="#fff" font-size="12">tokens left: ' + tk + '</text>';
    var tix = g ? WIN * g + BONUS : 0; for (var j = 0; j < Math.min(tix, 120); j++) h += '<rect x="' + (400 + (j % 12) * 20) + '" y="' + (80 + Math.floor(j / 12) * 14) + '" width="16" height="10" rx="2" fill="#ff8787"/>';
    h += '<text x="400" y="240" fill="#fff" font-size="12">tickets: ' + tix + '</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var want = c.games != null ? (c.games.eq != null ? c.games.eq : c.games.gte != null ? c.games.gte : c.games) : g; for (var k in c) { var mm = k.match(/^g_(\d+)$/); if (mm) { g = +mm[1]; report(); } } if (c.tokens != null) want = (START - (c.tokens.eq != null ? c.tokens.eq : c.tokens)) / COST; g = want; report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Ride Height Check: inequalities on a number line                   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.inequality = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var RIDES = cfg.rides || [{ name: 'Thunder Coaster', rule: '≥', v: 48, txt: 'Riders must be AT LEAST 48 inches tall.' }, { name: 'Kiddie Carousel', rule: '≤', v: 42, txt: 'Riders must be 42 inches tall OR SHORTER.' }, { name: 'Bumper Boats', rule: '>', v: 44, txt: 'Riders must be TALLER THAN 44 inches.' }];
  var KIDS = [['Ava', 50], ['Ben', 48], ['Cam', 41], ['Dee', 44], ['Eli', 46], ['Fay', 42]];
  var ri = 0, pt = 45, closed = true, dir = 'right', tested = {};
  M.el.innerHTML = '';
  var info = K.el('<div class="sn-panel"></div>'); M.el.appendChild(info);
  var svg = K.svgEl('svg', { viewBox: '0 0 680 220', class: 'sn-svg', role: 'img', 'aria-label': 'Number line of heights with a ride sign' }); M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var pS = K.slider({ label: 'Circle at', min: 38, max: 54, step: 1, value: pt, unit: 'in.', onInput: function (v) { pt = v; report(); draw(); } });
  var cS = K.seg([['closed', '● Closed (included)'], ['open', '○ Open (not included)']], 'closed', function (v) { closed = v === 'closed'; report(); draw(); });
  var dS = K.seg([['left', '← Shade left'], ['right', 'Shade right →']], dir, function (v) { dir = v; report(); draw(); });
  var nx = K.btn('Next ride ▶', function () { ri = (ri + 1) % RIDES.length; tested = {}; report(); draw(); }, 'ghost sm');
  ctr.appendChild(pS.el); var r2 = K.el('<div class="sn-row"></div>'); [cS.el, dS.el, nx].forEach(function (b) { r2.appendChild(b); }); ctr.appendChild(r2);
  var kidRow = K.el('<div class="sn-row"><b class="sn-note">Check a rider:</b></div>'); KIDS.forEach(function (k) { kidRow.appendChild(K.btn(k[0] + ' ' + k[1] + '"', function () { var R = RIDES[ri], ok = allowed(k[1], R); tested[k[0]] = ok; M.toast(k[0] + ' (' + k[1] + ' in.) ' + (ok ? 'CAN ride ✓' : 'can NOT ride ✗')); report(); draw(); }, 'sm')); }); ctr.appendChild(kidRow);
  M.el.appendChild(ctr);
  function allowed(h, R) { return R.rule === '≥' ? h >= R.v : R.rule === '≤' ? h <= R.v : R.rule === '>' ? h > R.v : h < R.v; }
  function graphOK() { var R = RIDES[ri]; return pt === R.v && closed === (R.rule === '≥' || R.rule === '≤') && dir === (R.rule === '≥' || R.rule === '>' ? 'right' : 'left'); }
  function report() { var st = { ride: ri, graphOK: graphOK(), tested: Object.keys(tested).length }; if (graphOK()) st['graph_' + ri] = true; M.set(st); }
  function X(v) { return 40 + (v - 36) / 20 * 600; }
  function draw() {
    var R = RIDES[ri]; info.innerHTML = '<b>🎢 ' + R.name + ':</b> ' + R.txt + ' Graph the heights that CAN ride.';
    var h = '<rect width="680" height="220" fill="#fff4e6"/><line x1="30" x2="650" y1="120" y2="120" stroke="#1d2433" stroke-width="3"/>';
    for (var v = 36; v <= 56; v++) h += '<line x1="' + X(v) + '" x2="' + X(v) + '" y1="112" y2="128" stroke="#1d2433"/>' + (v % 2 === 0 ? '<text x="' + X(v) + '" y="148" text-anchor="middle" font-size="12">' + v + '</text>' : '');
    var x = X(pt); h += '<line x1="' + x + '" x2="' + (dir === 'right' ? 650 : 30) + '" y1="120" y2="120" stroke="#e8590c" stroke-width="8" stroke-linecap="round"/><polygon points="' + (dir === 'right' ? '660,120 644,110 644,130' : '20,120 36,110 36,130') + '" fill="#e8590c"/><circle cx="' + x + '" cy="120" r="10" fill="' + (closed ? '#e8590c' : '#fff') + '" stroke="#e8590c" stroke-width="4"/>';
    KIDS.forEach(function (k, i) { if (!(k[0] in tested)) return; h += '<text x="' + X(k[1]) + '" y="' + (80 - (i % 2) * 24) + '" text-anchor="middle" font-size="18">' + (tested[k[0]] ? '🙂' : '🙁') + '</text><text x="' + X(k[1]) + '" y="' + (96 - (i % 2) * 24) + '" text-anchor="middle" font-size="10" font-weight="800">' + k[0] + '</text>'; });
    h += '<text x="340" y="190" text-anchor="middle" font-size="14" font-weight="800">h ' + R.rule + ' ' + R.v + (graphOK() ? '  ✓ your graph matches' : '') + '</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { setup: function (o) { if (o.ride != null) { ri = o.ride; tested = {}; report(); draw(); } }, auto: function (st) { var c = st.goal.check || {}; if (c.ride != null) ri = c.ride; for (var k in c) { var mm = k.match(/^graph_(\d)$/); if (mm) ri = +mm[1]; } var R = RIDES[ri]; pt = R.v; closed = R.rule === '≥' || R.rule === '≤'; dir = R.rule === '≥' || R.rule === '>' ? 'right' : 'left'; pS.set(pt, true); cS.set(closed ? 'closed' : 'open'); dS.set(dir); if (c.tested) KIDS.forEach(function (kd) { tested[kd[0]] = allowed(kd[1], R); }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Sea Levels: elevations above and below sea level with a submarine   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.seaLevels = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var THINGS = cfg.things || [['gull', '🐦', 'Seagull', 25, 470], ['cliff', '🏔', 'Cliff top', 35, 90], ['boat', '⛵', 'Boat', 0, 380], ['turtle', '🐢', 'Sea turtle', -8, 520], ['diver', '🤿', 'Diver', -15, 300], ['shark', '🦈', 'Shark', -30, 460], ['wreck', '🚢', 'Shipwreck', -60, 380], ['angler', '🐟', 'Anglerfish', -90, 500]];
  var y = 0, target = null, visited = {};
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 600 440', class: 'sn-svg', role: 'img', 'aria-label': 'Ocean scene from sky to deep sea with a submarine' });
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var reads = K.el('<div class="sn-reads"></div>'), rE = K.readout('Sub elevation', 'm', true), rS = K.readout('Sonar distance', 'm');
  reads.appendChild(rE.el); reads.appendChild(rS.el); side.appendChild(reads);
  var list = K.el('<div class="sn-panel"></div>'); side.appendChild(list);
  row.appendChild(svg); row.appendChild(side); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  [['⬆ Up 10 m', 10], ['⬆ Up 1 m', 1], ['⬇ Down 1 m', -1], ['⬇ Down 10 m', -10]].forEach(function (b) { ctr.appendChild(K.btn(b[0], function () { move(b[1]); }, 'sm')); });
  M.el.appendChild(ctr);
  function Y(e) { return 120 - e * 3.2; }
  function move(d) { var ny = K.clamp(y + d, -100, 0); if (ny === y && d > 0) M.toast('A submarine can\'t fly above sea level!', true); y = ny; report(); draw(); }
  function report() { var st = { sub: y }; st['at_' + (y < 0 ? 'n' + (-y) : y)] = true; visited[y] = true; st.depthsVisited = Object.keys(visited).length; if (target) { var t = THINGS.filter(function (x) { return x[0] === target; })[0]; st.sonar = Math.abs(y - t[3]); st['d_' + target + '_' + (y < 0 ? 'n' + (-y) : y)] = Math.abs(y - t[3]); st.target = target; } M.set(st); }
  function draw() {
    var h = '<defs><linearGradient id="slSea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4dabf7"/><stop offset=".45" stop-color="#1864ab"/><stop offset="1" stop-color="#0b1026"/></linearGradient></defs><rect width="600" height="120" fill="#d0ebff"/><rect y="120" width="600" height="320" fill="url(#slSea)"/>';
    h += '<path d="M0 120 L0 0 L120 0 L150 ' + Y(35) + ' L170 120 Z" fill="#8d6e63"/><path d="M0 440 L0 ' + Y(-70) + ' Q120 ' + Y(-95) + ' 250 ' + Y(-98) + ' T600 ' + Y(-92) + ' L600 440 Z" fill="#5c3a1a" opacity=".8"/>';
    h += '<text x="596" y="' + (Y(-5) + 4) + '" text-anchor="end" font-size="10" fill="#e7f5ff">SUNLIGHT ZONE</text><text x="596" y="' + (Y(-45)) + '" text-anchor="end" font-size="10" fill="#a5d8ff">TWILIGHT ZONE</text><text x="596" y="' + (Y(-85)) + '" text-anchor="end" font-size="10" fill="#748ffc">MIDNIGHT ZONE</text>';
    for (var e = 40; e >= -100; e -= 10) h += '<line x1="30" x2="' + (e === 0 ? 600 : 44) + '" y1="' + Y(e) + '" y2="' + Y(e) + '" stroke="' + (e === 0 ? '#fff' : '#ced4da') + '" stroke-width="' + (e === 0 ? 2 : 1) + '"/><text x="48" y="' + (Y(e) + 4) + '" font-size="10" fill="' + (e < 0 ? '#e7f5ff' : '#1d2433') + '" font-weight="700">' + e + ' m</text>';
    h += '<text x="300" y="' + (Y(0) - 4) + '" font-size="11" fill="#1864ab" font-weight="800">sea level (0 m)</text>';
    THINGS.forEach(function (t) { h += '<g class="sl-t" data-t="' + t[0] + '" role="button" tabindex="0" aria-label="' + t[2] + '"><text x="' + t[4] + '" y="' + (Y(t[3]) + 8) + '" font-size="24" text-anchor="middle">' + t[1] + '</text>' + (target === t[0] ? '<circle cx="' + t[4] + '" cy="' + Y(t[3]) + '" r="20" fill="none" stroke="#ffe066" stroke-width="3"/>' : '') + '<rect x="' + (t[4] - 20) + '" y="' + (Y(t[3]) - 18) + '" width="40" height="36" fill="transparent"/></g>'; });
    var sx = 200, sy = Y(y); h += '<g><ellipse cx="' + sx + '" cy="' + sy + '" rx="34" ry="14" fill="#fcc419" stroke="#e67700" stroke-width="2"/><rect x="' + (sx - 8) + '" y="' + (sy - 24) + '" width="16" height="12" rx="3" fill="#fcc419" stroke="#e67700"/><circle cx="' + (sx + 14) + '" cy="' + sy + '" r="5" fill="#74c0fc" stroke="#1864ab"/><text x="' + (sx - 44) + '" y="' + (sy + 4) + '" text-anchor="end" font-size="12" font-weight="800" fill="#fff">SUB ' + y + ' m</text></g>';
    if (target) { var t2 = THINGS.filter(function (x) { return x[0] === target; })[0]; h += '<line x1="' + (sx + 36) + '" y1="' + sy + '" x2="' + (t2[4] - 18) + '" y2="' + Y(t2[3]) + '" stroke="#ffe066" stroke-width="2" stroke-dasharray="6 4"/>'; }
    svg.innerHTML = h;
    svg.querySelectorAll('.sl-t').forEach(function (g) { g.addEventListener('click', function () { target = g.getAttribute('data-t'); report(); draw(); }); });
    rE.set(y); rS.set(target ? Math.abs(y - THINGS.filter(function (x) { return x[0] === target; })[0][3]) : '—');
    list.innerHTML = '<h3>📋 Elevation chart</h3><p class="sn-note">Tap a creature or object to aim the sonar at it.</p>' + THINGS.map(function (t) { return '<div>' + t[1] + ' ' + t[2] + ': ' + (visited._seen && visited._seen[t[0]] ? '<b>' + t[3] + ' m</b>' : '<b>' + t[3] + ' m</b>') + '</div>'; }).join('');
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.sub != null) y = c.sub.eq != null ? c.sub.eq : c.sub.lte != null ? c.sub.lte : c.sub; for (var k in c) { var mm = k.match(/^at_(n?)(\d+)$/); if (mm) { y = (mm[1] ? -1 : 1) * +mm[2]; report(); } var m2 = k.match(/^d_(\w+)_(n?)(\d+)$/); if (m2) { target = m2[1]; y = (m2[2] ? -1 : 1) * +m2[3]; report(); } } if (c.target) target = c.target; if (c.depthsVisited) [-10, -20, -30, -40].forEach(function (d) { y = d; report(); }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Weather Station: compare, order, and find changes in temperatures   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.weatherStation = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var CITIES = cfg.cities || [['Fort Wayne', -6, -2, 3], ['Anchorage', -12, -15, -9], ['Minneapolis', -9, -4, -11], ['Indianapolis', -3, 1, 4], ['Miami', 22, 24, 23]];
  var DAYS = ['Monday', 'Tuesday', 'Wednesday'], d = 0, sel = 0;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 460 340', class: 'sn-svg', role: 'img', 'aria-label': 'Weather board with city temperatures on a thermometer number line' });
  var th = K.svgEl('svg', { viewBox: '0 0 160 340', class: 'sn-svg', role: 'img', 'aria-label': 'Big thermometer' });
  row.appendChild(svg); row.appendChild(th); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var dS = K.seg(DAYS.map(function (x, i) { return [String(i), x]; }), '0', function (v) { d = +v; report(); draw(); });
  var cS = K.seg(CITIES.map(function (c, i) { return [String(i), c[0]]; }), '0', function (v) { sel = +v; report(); draw(); });
  ctr.appendChild(dS.el); ctr.appendChild(cS.el); M.el.appendChild(ctr);
  function T(i, day) { return CITIES[i][1 + (day == null ? d : day)]; }
  function report() { var st = { day: d, city: sel, temp: T(sel) }; st['t_' + sel + '_' + d] = T(sel); var seen = (S.seen || []).slice(); if (seen.indexOf(sel + '_' + d) < 0) seen.push(sel + '_' + d); st.seen = seen; st.seenCount = seen.length; M.set(st); }
  function Y(t) { return 170 - t * 5.5; }
  function draw() {
    var h = '<rect width="460" height="340" fill="#e7f5ff"/><text x="10" y="20" font-size="13" font-weight="800">Temperatures (°F) · ' + DAYS[d] + '</text>';
    h += '<line x1="60" x2="60" y1="' + Y(26) + '" y2="' + Y(-18) + '" stroke="#1d2433" stroke-width="2"/>';
    for (var t = -15; t <= 25; t += 5) h += '<line x1="54" x2="66" y1="' + Y(t) + '" y2="' + Y(t) + '" stroke="#1d2433"/><text x="48" y="' + (Y(t) + 4) + '" text-anchor="end" font-size="11" font-weight="' + (t === 0 ? 800 : 400) + '">' + t + '°</text>';
    h += '<line x1="60" x2="450" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="#1971c2" stroke-dasharray="4 4"/><text x="446" y="' + (Y(0) - 4) + '" text-anchor="end" font-size="10" fill="#1971c2">0 °F</text>';
    CITIES.forEach(function (c, i) { var x = 100 + i * 72, tt = T(i); h += '<circle cx="' + x + '" cy="' + Y(tt) + '" r="' + (i === sel ? 9 : 6) + '" fill="' + (tt < 0 ? '#1971c2' : '#e8590c') + '" stroke="#fff" stroke-width="2"/><text x="' + x + '" y="' + (Y(tt) - 12) + '" text-anchor="middle" font-size="12" font-weight="800">' + tt + '°</text><text x="' + x + '" y="330" text-anchor="middle" font-size="10" font-weight="' + (i === sel ? 800 : 400) + '">' + c[0] + '</text>'; });
    svg.innerHTML = h;
    var tt = T(sel), f = K.clamp((tt + 20) / 50, 0, 1), g = '<rect width="160" height="340" fill="#fff"/><rect x="66" y="30" width="28" height="250" rx="14" fill="#f1f3f5" stroke="#495057" stroke-width="2"/><rect x="72" y="' + (276 - 240 * f) + '" width="16" height="' + 240 * f + '" rx="8" fill="#e03131"/><circle cx="80" cy="292" r="22" fill="#e03131" stroke="#495057" stroke-width="2"/>';
    for (var q = -20; q <= 30; q += 10) g += '<line x1="94" x2="106" y1="' + (276 - (q + 20) / 50 * 240) + '" y2="' + (276 - (q + 20) / 50 * 240) + '" stroke="#495057"/><text x="110" y="' + (280 - (q + 20) / 50 * 240) + '" font-size="11">' + q + '°</text>';
    g += '<text x="80" y="20" text-anchor="middle" font-size="12" font-weight="800">' + CITIES[sel][0] + '</text><text x="80" y="330" text-anchor="middle" font-size="16" font-weight="800">' + tt + ' °F</text>';
    th.innerHTML = g;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.day != null) d = c.day; if (c.city != null) sel = c.city; for (var k in c) { var mm = k.match(/^t_(\d)_(\d)$/); if (mm) { sel = +mm[1]; d = +mm[2]; report(); } } if (c.seenCount) CITIES.forEach(function (x, i) { sel = i; report(); }); dS.set(String(d)); cS.set(String(sel)); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Bank Account: positive balances, debt, and absolute value           */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.bankAccount = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var TX = cfg.tx || [['💵 Allowance', 15], ['🎂 Birthday money', 20], ['🚲 Bike helmet', -40], ['📚 Book fair', -12], ['🐶 Dog walking', 18], ['🎮 Video game', -30]];
  var start = cfg.start || 25, hist = [];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 680 200', class: 'sn-svg', role: 'img', 'aria-label': 'Bank balance on a number line' }); M.el.appendChild(svg);
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var reads = K.el('<div class="sn-reads" style="align-content:start"></div>'), rB = K.readout('Balance', '$', true), rS = K.readout('Status', ''); reads.appendChild(rB.el); reads.appendChild(rS.el);
  var led = K.el('<div class="sn-panel"></div>'); row.appendChild(reads); row.appendChild(led); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  TX.forEach(function (t, i) { ctr.appendChild(K.btn(t[0] + ' ' + (t[1] > 0 ? '+' : '−') + '$' + Math.abs(t[1]), function () { hist.push(i); report(); draw(); }, 'sm')); });
  ctr.appendChild(K.btn('↺ Start over', function () { hist = []; report(); draw(); }, 'ghost sm')); M.el.appendChild(ctr);
  function bal() { return hist.reduce(function (a, i) { return a + TX[i][1]; }, start); }
  function report() { var b = bal(), st = { balance: b, debt: b < 0 ? -b : 0, inDebt: b < 0, count: hist.length, minBal: Math.min.apply(0, [start].concat(hist.map(function (_, k) { return hist.slice(0, k + 1).reduce(function (a, i) { return a + TX[i][1]; }, start); }))) }; hist.forEach(function (i) { st['used_' + i] = true; }); M.set(st); rB.set(b < 0 ? '−' + Math.abs(b) : b); rS.set(b < 0 ? 'owes $' + Math.abs(b) : b === 0 ? 'even' : 'has $' + b); }
  function X(v) { return 40 + (v + 60) / 120 * 600; }
  function draw() {
    var b = bal(), h = '<rect width="680" height="200" fill="#ebfbee"/><line x1="30" x2="650" y1="110" y2="110" stroke="#1d2433" stroke-width="3"/>';
    for (var v = -60; v <= 60; v += 10) h += '<line x1="' + X(v) + '" x2="' + X(v) + '" y1="102" y2="118" stroke="#1d2433"/><text x="' + X(v) + '" y="138" text-anchor="middle" font-size="12" font-weight="' + (v === 0 ? 800 : 400) + '" fill="' + (v < 0 ? '#c92a2a' : '#1d2433') + '">' + (v < 0 ? '−' : '') + '$' + Math.abs(v) + '</text>';
    h += '<rect x="' + Math.min(X(0), X(b)) + '" y="96" width="' + Math.abs(X(b) - X(0)) + '" height="8" fill="' + (b < 0 ? '#ff8787' : '#69db7c') + '"/><text x="' + ((X(0) + X(b)) / 2) + '" y="88" text-anchor="middle" font-size="12" font-weight="800">|' + b + '| = ' + Math.abs(b) + '</text>';
    h += '<circle cx="' + X(K.clamp(b, -60, 60)) + '" cy="110" r="11" fill="' + (b < 0 ? '#c92a2a' : '#2b8a3e') + '" stroke="#fff" stroke-width="3"/><text x="' + X(K.clamp(b, -60, 60)) + '" y="70" text-anchor="middle" font-size="22">' + (b < 0 ? '😬' : '😀') + '</text>';
    h += '<text x="' + X(-30) + '" y="180" text-anchor="middle" font-size="12" fill="#c92a2a" font-weight="800">OWES MONEY (debt)</text><text x="' + X(30) + '" y="180" text-anchor="middle" font-size="12" fill="#2b8a3e" font-weight="800">HAS MONEY</text>';
    svg.innerHTML = h;
    var run = start; led.innerHTML = '<h3>🧾 Account ledger</h3><div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>Event</th><th>Change</th><th>Balance</th></tr></thead><tbody><tr><td>Start</td><td></td><td>$' + start + '</td></tr>' + hist.map(function (i) { run += TX[i][1]; return '<tr><td>' + TX[i][0] + '</td><td>' + (TX[i][1] > 0 ? '+' : '−') + Math.abs(TX[i][1]) + '</td><td>' + (run < 0 ? '−$' + (-run) : '$' + run) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^used_(\d)$/); if (mm && hist.indexOf(+mm[1]) < 0) hist.push(+mm[1]); } if (c.inDebt && bal() >= 0) { hist.push(2); if (bal() >= 0) hist.push(5); } if (c.balance != null) { var want = c.balance.eq != null ? c.balance.eq : c.balance; hist = []; var combos = [[2], [5], [3], [2, 3], [2, 5], [0, 2], [1, 2], [2, 3, 5]]; combos.some(function (cb) { if (cb.reduce(function (a, i) { return a + TX[i][1]; }, start) === want) { hist = cb.slice(); return true; } return false; }); } report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Treasure Map: the four-quadrant coordinate plane                    */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.coordMap = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SPOTS = cfg.spots || [['skull', '💀', 'Skull Rock', 4, 6], ['palm', '🌴', 'Palm Grove', -5, 3], ['cave', '🕳', 'Bat Cave', -6, -4], ['dock', '⚓', 'Old Dock', 7, -2], ['volcano', '🌋', 'Volcano', 0, 7]];
  var sx = 0, sy = 0, visited = {}, digs = [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 440 440', class: 'sn-svg', role: 'img', 'aria-label': 'Treasure map on a coordinate grid' });
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var reads = K.el('<div class="sn-reads"></div>'), rP = K.readout('Ship at', '', true), rQ = K.readout('Quadrant', ''); reads.appendChild(rP.el); reads.appendChild(rQ.el); side.appendChild(reads);
  var legend = K.el('<div class="sn-panel"></div>'); side.appendChild(legend);
  row.appendChild(svg); row.appendChild(side); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Tap the grid to sail there, or type coordinates.</span></div>');
  var cin = K.el('<label class="sn-slider" style="flex:0 0 auto;min-width:0">Sail to ( <input type="text" aria-label="x" style="width:3em;font:inherit;padding:2px 4px;border:2px solid var(--sn-line);border-radius:6px"> , <input type="text" aria-label="y" style="width:3em;font:inherit;padding:2px 4px;border:2px solid var(--sn-line);border-radius:6px"> )</label>');
  var go = K.btn('⛵ Sail', function () { var ins = cin.querySelectorAll('input'), x = K.parseNum(ins[0].value), y = K.parseNum(ins[1].value); if (isNaN(x) || isNaN(y) || Math.abs(x) > 9 || Math.abs(y) > 9) { M.toast('Use whole numbers from −9 to 9.', true); return; } sail(x, y); }, 'primary');
  var dig = K.btn('⛏ Dig here', function () { digs.push([sx, sy]); var st = {}; st['dig_' + sx + '_' + sy] = true; st.digs = digs.length; M.set(st); M.toast('You dug at (' + sx + ', ' + sy + ').'); draw(); });
  [cin, go, dig].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function P(x, y) { return [220 + x * 22, 220 - y * 22]; }
  function quad(x, y) { return x > 0 && y > 0 ? 'I' : x < 0 && y > 0 ? 'II' : x < 0 && y < 0 ? 'III' : x > 0 && y < 0 ? 'IV' : 'on an axis'; }
  function sail(x, y) { sx = x; sy = y; var st = { x: x, y: y, quad: quad(x, y) }; st['at_' + x + '_' + y] = true; SPOTS.forEach(function (s) { if (s[3] === x && s[4] === y) st['visit_' + s[0]] = true; }); M.set(st); draw(); }
  function draw() {
    var h = '<rect width="440" height="440" fill="#a5d8ff"/><ellipse cx="220" cy="220" rx="190" ry="175" fill="#ffe8a1"/><ellipse cx="220" cy="220" rx="170" ry="155" fill="#b2f2bb"/>';
    for (var i = -9; i <= 9; i++) { var p = P(i, 0), q = P(0, i); h += '<line x1="' + p[0] + '" x2="' + p[0] + '" y1="22" y2="418" stroke="#1d2433" stroke-opacity=".15"/><line y1="' + q[1] + '" y2="' + q[1] + '" x1="22" x2="418" stroke="#1d2433" stroke-opacity=".15"/>'; if (i && i % 2 === 0) h += '<text x="' + p[0] + '" y="' + (p[1] + 14) + '" font-size="9" text-anchor="middle">' + i + '</text><text x="' + (q[0] - 8) + '" y="' + (q[1] + 3) + '" font-size="9" text-anchor="end">' + i + '</text>'; }
    h += '<line x1="22" x2="418" y1="220" y2="220" stroke="#1d2433" stroke-width="2"/><line x1="220" x2="220" y1="22" y2="418" stroke="#1d2433" stroke-width="2"/><text x="412" y="212" font-size="12" font-weight="800">x</text><text x="228" y="30" font-size="12" font-weight="800">y</text>';
    [['I', 320, 110], ['II', 110, 110], ['III', 110, 330], ['IV', 320, 330]].forEach(function (qq) { h += '<text x="' + qq[1] + '" y="' + qq[2] + '" font-size="26" font-weight="800" fill="#1d2433" opacity=".12" text-anchor="middle">' + qq[0] + '</text>'; });
    SPOTS.forEach(function (s) { var p = P(s[3], s[4]); h += '<text x="' + p[0] + '" y="' + (p[1] + 8) + '" font-size="20" text-anchor="middle">' + s[1] + '</text>'; });
    digs.forEach(function (d) { var p = P(d[0], d[1]); h += '<text x="' + p[0] + '" y="' + (p[1] + 6) + '" font-size="14" text-anchor="middle">✖</text>'; });
    var s = P(sx, sy); h += '<text x="' + s[0] + '" y="' + (s[1] + 8) + '" font-size="22" text-anchor="middle">⛵</text><rect class="cm-hit" x="11" y="11" width="418" height="418" fill="transparent"/>';
    svg.innerHTML = h;
    svg.querySelector('.cm-hit').addEventListener('click', function (ev) { var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; var q2 = pt.matrixTransform(svg.getScreenCTM().inverse()); sail(K.clamp(Math.round((q2.x - 220) / 22), -9, 9), K.clamp(Math.round((220 - q2.y) / 22), -9, 9)); });
    rP.set('(' + sx + ', ' + sy + ')'); rQ.set(quad(sx, sy));
    legend.innerHTML = '<h3>🗺 Map legend</h3>' + SPOTS.map(function (sp) { return '<div>' + sp[1] + ' ' + sp[2] + '</div>'; }).join('') + '<p class="sn-note">Find each place\'s coordinates by sailing to it.</p>';
  }
  sail(0, 0);
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^(at|dig)_(-?\d+)_(-?\d+)$/); if (mm) { sail(+mm[2], +mm[3]); if (mm[1] === 'dig') dig.click(); } var m2 = k.match(/^visit_(\w+)$/); if (m2) { var sp = SPOTS.filter(function (x) { return x[0] === m2[1]; })[0]; sail(sp[3], sp[4]); } } if (c.quad) { var qq = { I: [3, 3], II: [-3, 3], III: [-3, -3], IV: [3, -3] }[c.quad]; sail(qq[0], qq[1]); } } };
};

/* ------------------------------------------------------------------ */
/* Elevator Tower: integers as floors above and below ground           */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.elevator = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var LO = -6, HI = 12, floor = 0, target = 0, pos = 0, trips = [], total = 0;
  var LABEL = { 12: '🌇 Rooftop garden', 8: '🏢 Offices', 4: '🍕 Food court', 1: '🛍 Shops', 0: '🚪 Lobby (ground)', '-1': '🏋 Gym', '-3': '🅿 Parking P3', '-6': '🔧 Boiler room' };
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 320 460', class: 'sn-svg', role: 'img', 'aria-label': 'Tall building with an elevator and basement floors' });
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var reads = K.el('<div class="sn-reads"></div>'), rF = K.readout('Floor', '', true), rL = K.readout('Last trip', 'floors'), rT = K.readout('Total distance', 'floors'); [rF, rL, rT].forEach(function (r) { reads.appendChild(r.el); }); side.appendChild(reads);
  var pad = K.el('<div class="sn-panel"><h3>Elevator buttons</h3><div class="ev-pad" style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px"></div></div>'); side.appendChild(pad);
  var logBox = K.el('<div class="sn-panel"></div>'); side.appendChild(logBox);
  row.appendChild(svg); row.appendChild(side); M.el.appendChild(row);
  for (var f = HI; f >= LO; f--) (function (ff) { var b = K.btn(String(ff), function () { call(ff); }, 'sm'); pad.querySelector('.ev-pad').appendChild(b); })(f);
  var rs = K.btn('↺ Reset trips', function () { trips = []; total = 0; report(); draw(); }, 'ghost sm'); side.appendChild(rs);
  function call(f) { if (f === floor) return; var d = Math.abs(f - floor); trips.push([floor, f, d]); total += d; target = f; var st = { from: floor, to: f, last: d, total: total, trips: trips.length }; st['trip_' + floor + '_' + f] = d; floor = f; st.floor = f; M.set(st); report(); }
  function report() { rF.set(floor); rL.set(trips.length ? trips[trips.length - 1][2] : '—'); rT.set(total); logBox.innerHTML = '<h3>Trip log</h3>' + (trips.length ? trips.slice(-5).map(function (t) { return '<div>' + t[0] + ' → ' + t[1] + ': |' + t[1] + ' − ' + (t[0] < 0 ? '(' + t[0] + ')' : t[0]) + '| = ' + t[2] + ' floors</div>'; }).join('') : '<p class="sn-note">No trips yet.</p>'); }
  function Y(f) { return 30 + (HI - f) * 22; }
  function draw() {
    var h = '<rect width="320" height="460" fill="#d0ebff"/><rect y="' + (Y(0) + 11) + '" width="320" height="' + (460 - Y(0) - 11) + '" fill="#8d6e63"/>';
    for (var f2 = HI; f2 >= LO; f2--) { var y = Y(f2); h += '<rect x="60" y="' + y + '" width="200" height="22" fill="' + (f2 < 0 ? '#a1887f' : '#f8f9fa') + '" stroke="#adb5bd"/><text x="54" y="' + (y + 15) + '" text-anchor="end" font-size="11" font-weight="800">' + f2 + '</text>' + (LABEL[f2] ? '<text x="116" y="' + (y + 15) + '" font-size="10">' + LABEL[f2] + '</text>' : ''); }
    h += '<rect x="62" y="' + (Y(pos) + 1) + '" width="46" height="20" rx="3" fill="#fcc419" stroke="#e67700" stroke-width="2"/><text x="85" y="' + (Y(pos) + 15) + '" text-anchor="middle" font-size="10" font-weight="800">🛗</text>';
    h += '<text x="300" y="' + (Y(0) + 26) + '" text-anchor="end" font-size="11" fill="#fff" font-weight="800">GROUND LEVEL (0)</text>';
    svg.innerHTML = h;
  }
  M.loop(function (dt) { if (Math.abs(pos - target) < 0.01) { if (pos !== target) { pos = target; draw(); } return; } pos += Math.sign(target - pos) * Math.min(Math.abs(target - pos), dt * 8); draw(); });
  M.set({ floor: 0, total: 0, trips: 0 }); report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^trip_(-?\d+)_(-?\d+)$/); if (mm) { if (floor !== +mm[1]) call(+mm[1]); call(+mm[2]); } } if (c.floor != null) { var f = c.floor.eq != null ? c.floor.eq : c.floor.lte != null ? c.floor.lte : c.floor; call(f); } if (c.trips) { call(5); call(-3); call(8); } pos = floor; draw(); } };
};
