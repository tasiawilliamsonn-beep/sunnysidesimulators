/*
 * Sunnyside Simulators: science models (PhET-style labs).
 * Each model is SUNNY_MODELS[name] = function (M) { ... } and draws into M.el.
 * It reports what students do through M.set(...) so the lab guide can check it.
 * Models must be self-contained (they only use M and M.kit) because their source is
 * copied into standalone Canvas files.
 */
var SUNNY_MODELS = window.SUNNY_MODELS = window.SUNNY_MODELS || {};

/* ------------------------------------------------------------------ */
/* Melting Lab: heat or cool ice in a sealed or open beaker on a scale  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.meltLab = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var sample = { ice: 50, water: 0, vapor: 0, lost: 0, T: -10 };
  var setT = -10, lid = 'sealed', speed = 1, time = 0, start = 50;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 380', class: 'sn-svg', role: 'img', 'aria-label': 'Beaker with ice on a digital scale over a hot plate' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rM = K.readout('Scale (mass)', 'g', true), rT = K.readout('Thermometer', '°C', true), rI = K.readout('Ice left', '%'), rTm = K.readout('Time', 'min');
  [rM, rT, rI, rTm].forEach(function (r) { reads.appendChild(r.el); });
  M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var heat = K.slider({ label: '🔥 Hot / ❄ cold plate', min: -20, max: 110, step: 5, value: setT, unit: '°C', onInput: function (v) { setT = v; M.set('touchedHeat', true); M.set('setTemp', v); } });
  var lidSeg = K.seg([['sealed', '🔒 Sealed lid'], ['open', '🔓 Open']], lid, function (v) { lid = v; M.set('lid', v); if (v === 'open') M.set('opened', true); });
  var amt = K.seg([['20', '20 g'], ['50', '50 g'], ['100', '100 g']], '50', function (v) { newSample(+v); });
  var spd = K.seg([['1', '▶ 1×'], ['5', '⏩ 5×'], ['0', '❚❚ Pause']], '1', function (v) { speed = +v; });
  ctr.appendChild(heat.el);
  var row = K.el('<div class="sn-row"></div>'); row.appendChild(K.el('<b class="sn-note">Lid:</b>')); row.appendChild(lidSeg.el); row.appendChild(K.el('<b class="sn-note">New ice:</b>')); row.appendChild(amt.el); row.appendChild(K.el('<b class="sn-note">Speed:</b>')); row.appendChild(spd.el);
  ctr.appendChild(row);
  M.el.appendChild(ctr);

  function newSample(g) {
    start = g; sample = { ice: g, water: 0, vapor: 0, lost: 0, T: Math.min(setT, -5) }; time = 0;
    M.set({ startMass: g, mass: g, melted: false, frozen: true, refrozen: false, lost: 0, trial: (S.trial || 0) + 1 });
  }

  // Draw
  var drops = [];
  for (var i = 0; i < 26; i++) drops.push({ x: Math.random(), y: Math.random(), s: Math.random() });
  function draw() {
    var total = sample.ice + sample.water, iceF = sample.ice / Math.max(1, total);
    var hot = K.clamp((setT - 20) / 90, 0, 1), cold = K.clamp(-setT / 20, 0, 1);
    var bx = 240, bw = 160, by = 120, bh = 150, waterH = Math.min(bh - 12, sample.water / 100 * 90 + (sample.water > 0 ? 4 : 0));
    var h = '';
    h += '<defs><linearGradient id="mlBg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#dfeef3"/><stop offset="1" stop-color="#c8dde6"/></linearGradient><linearGradient id="mlGlass" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".15"/><stop offset="1" stop-color="#ffffff" stop-opacity=".5"/></linearGradient><linearGradient id="mlWater" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#74c0fc"/><stop offset="1" stop-color="#1c7ed6"/></linearGradient></defs>';
    h += '<rect width="640" height="380" fill="url(#mlBg)"/>';
    // shelf + window
    h += '<rect x="30" y="30" width="140" height="90" rx="8" fill="#f8fbfc" stroke="#9fb7c2" stroke-width="3"/><line x1="100" y1="30" x2="100" y2="120" stroke="#9fb7c2" stroke-width="3"/><line x1="30" y1="75" x2="170" y2="75" stroke="#9fb7c2" stroke-width="3"/>';
    h += '<rect x="470" y="60" width="140" height="8" rx="3" fill="#8b6b4a"/><rect x="485" y="30" width="20" height="30" rx="4" fill="#ffd166"/><rect x="515" y="38" width="16" height="22" rx="3" fill="#06d6a0"/><rect x="540" y="26" width="22" height="34" rx="4" fill="#ef476f"/>';
    // bench
    h += '<rect x="0" y="320" width="640" height="60" fill="#5b4636"/><rect x="0" y="316" width="640" height="8" fill="#7a5f49"/>';
    // hot plate
    h += '<rect x="200" y="298" width="240" height="22" rx="6" fill="#343a40"/><rect x="215" y="292" width="210" height="10" rx="5" fill="' + (hot > 0 ? 'rgb(' + Math.round(120 + 135 * hot) + ',' + Math.round(70 - 30 * hot) + ',40)' : cold > 0 ? 'rgb(' + Math.round(120 - 60 * cold) + ',' + Math.round(170 + 40 * cold) + ',230)' : '#6c757d') + '"/>';
    h += '<circle cx="420" cy="309" r="6" fill="' + (hot > 0 ? '#ff6b6b' : cold > 0 ? '#74c0fc' : '#adb5bd') + '"/><text x="222" y="314" font-size="11" fill="#fff" font-weight="700">' + (setT >= 0 ? 'HOT PLATE ' : 'COOLING PLATE ') + setT + '°C</text>';
    // scale
    h += '<rect x="215" y="270" width="210" height="24" rx="5" fill="#e9ecef" stroke="#868e96"/><rect x="290" y="274" width="60" height="16" rx="3" fill="#111a22"/><text x="320" y="286" font-size="11" text-anchor="middle" fill="#7cf5c4" font-family="monospace">' + K.fmt(sample.ice + sample.water + (lid === 'sealed' ? sample.vapor : 0), 1) + ' g</text>';
    // beaker
    h += '<path d="M' + bx + ' ' + by + ' v' + bh + ' q0 10 10 10 h' + (bw - 20) + ' q10 0 10 -10 v-' + bh + '" fill="rgba(210,235,245,.35)" stroke="#6c8a99" stroke-width="3"/>';
    for (var t = 1; t <= 5; t++) h += '<line x1="' + (bx + 6) + '" x2="' + (bx + 22) + '" y1="' + (by + bh - t * 25) + '" y2="' + (by + bh - t * 25) + '" stroke="#6c8a99" stroke-width="2"/>';
    if (waterH > 0) h += '<rect x="' + (bx + 3) + '" y="' + (by + bh + 7 - waterH) + '" width="' + (bw - 6) + '" height="' + waterH + '" rx="6" fill="url(#mlWater)" opacity=".85"/>';
    // ice cubes
    var cubes = Math.ceil(sample.ice / 10), cs = 16 + 20 * Math.sqrt(iceF) * (sample.ice > 0 ? 1 : 0);
    for (var c = 0; c < cubes; c++) {
      var col = c % 4, rw = Math.floor(c / 4), sz = Math.max(8, cs * Math.min(1, sample.ice / (cubes * 10) + 0.3));
      var cx = bx + 20 + col * 32 + (rw % 2) * 10, cy = by + bh - 2 - (rw + 1) * (sz + 2) - (waterH > 20 ? waterH - 20 : 0) * 0.6;
      h += '<rect x="' + cx + '" y="' + cy + '" width="' + sz + '" height="' + sz + '" rx="4" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2" opacity=".95"/><rect x="' + (cx + 3) + '" y="' + (cy + 3) + '" width="' + sz / 3 + '" height="' + sz / 5 + '" rx="2" fill="#fff"/>';
    }
    // vapor
    var vap = K.clamp((sample.T - 30) / 70, 0, 1) * (sample.water > 0 ? 1 : 0);
    if (vap > 0) drops.forEach(function (d) {
      var x = bx + 15 + d.x * (bw - 30), y = lid === 'sealed' ? by + 8 + d.y * 40 : by - 60 + d.y * 80;
      h += '<circle cx="' + x + '" cy="' + y + '" r="' + (3 + d.s * 4) + '" fill="#fff" opacity="' + (0.25 + 0.5 * vap) + '"/>';
    });
    if (lid === 'sealed') {
      if (vap > 0.2) for (var k = 0; k < 8; k++) h += '<circle cx="' + (bx + 20 + k * 18) + '" cy="' + (by + 16 + (k % 3) * 6) + '" r="3" fill="#a5d8ff"/>';
      h += '<rect x="' + (bx - 8) + '" y="' + (by - 14) + '" width="' + (bw + 16) + '" height="14" rx="5" fill="#495057"/><rect x="' + (bx + bw / 2 - 12) + '" y="' + (by - 24) + '" width="24" height="12" rx="4" fill="#343a40"/>';
    } else h += '<text x="' + (bx + bw / 2) + '" y="' + (by - 70) + '" text-anchor="middle" font-size="13" fill="#495057" font-weight="700">' + (vap > 0 ? 'water vapor escaping ↑' : 'open to the air') + '</text>';
    // thermometer
    var tx = bx + bw - 30, tf = K.clamp((sample.T + 20) / 130, 0, 1);
    h += '<rect x="' + tx + '" y="' + (by - 40) + '" width="12" height="' + (bh + 10) + '" rx="6" fill="#fff" stroke="#495057" stroke-width="2"/><rect x="' + (tx + 3) + '" y="' + (by - 37 + (bh + 4) * (1 - tf)) + '" width="6" height="' + ((bh + 4) * tf) + '" rx="3" fill="#e03131"/><circle cx="' + (tx + 6) + '" cy="' + (by + bh - 26) + '" r="9" fill="#e03131" stroke="#495057" stroke-width="2"/>';
    // label
    h += '<text x="' + (bx + bw / 2) + '" y="' + (by + bh + 38) + '" text-anchor="middle" font-size="12" fill="#212529" font-weight="700"></text>';
    h += '<text x="620" y="360" text-anchor="end" font-size="12" fill="#f1e3d3">' + (sample.ice > 0 && sample.water > 0 ? 'melting…' : sample.ice > 0 ? 'solid (ice)' : sample.water > 0 ? 'liquid (water)' : 'empty') + '</text>';
    svg.innerHTML = h;
    var mass = sample.ice + sample.water + (lid === 'sealed' ? sample.vapor : 0);
    rM.set(K.fmt(mass, 1)); rT.set(K.fmt(sample.T, 0)); rI.set(Math.round(100 * sample.ice / Math.max(0.0001, start))); rTm.set(Math.floor(time));
  }

  M.loop(function (dt) {
    if (!speed) { draw(); return; }
    var d = dt * speed; time += d;
    var s = sample;
    if (s.ice > 0 && setT > 0 && s.T >= 0) { s.T = 0; var m = Math.min(s.ice, d * (setT / 10) * 1.2); s.ice -= m; s.water += m; }
    else if (s.water > 0 && setT < 0 && s.T <= 0) { s.T = 0; var f = Math.min(s.water, d * (-setT / 10) * 1.2); s.water -= f; s.ice += f; }
    else { s.T += (setT - s.T) * Math.min(1, d * 0.35); if (s.ice > 0 && s.T > 0 && setT > 0) s.T = 0; if (s.water > 0 && s.T < 0 && setT < 0 && s.ice < 0.001) s.T = 0; }
    if (s.ice > 0 && s.water > 0) s.T = Math.max(Math.min(s.T, 0.4), -0.4);
    if (s.water > 0 && s.T > 20) {
      var ev = d * Math.pow((s.T - 20) / 80, 1.6) * (s.T >= 99 ? 2.2 : 0.55); ev = Math.min(ev, s.water);
      s.water -= ev; if (lid === 'sealed') s.vapor += ev; else s.lost += ev;
    } else if (s.vapor > 0 && s.T < 60) { var cnd = Math.min(s.vapor, d * 0.8); s.vapor -= cnd; s.water += cnd; }
    if (lid === 'open' && s.vapor > 0) { s.lost += s.vapor; s.vapor = 0; }
    var mass = s.ice + s.water + (lid === 'sealed' ? s.vapor : 0);
    var nm = Math.round(mass * 10) / 10, melted = s.ice < 0.05 && s.water > 0, frozen = s.water < 0.05 && s.ice > 0;
    if (nm !== S.mass || melted !== S.melted || frozen !== S.frozen || Math.round(s.T) !== S.temp || Math.round(s.lost * 10) / 10 !== S.lost) {
      if (melted && s.ice > 0) { s.water += s.ice; s.ice = 0; }
      if (frozen && s.water > 0) { s.ice += s.water; s.water = 0; }
      M.set({ mass: nm, temp: Math.round(s.T), melted: melted, frozen: frozen, lost: Math.round(s.lost * 10) / 10, icePct: Math.round(100 * s.ice / Math.max(0.001, start)) });
      if (melted) s.wasMelted = true;
      if (frozen && s.wasMelted) M.set('refrozen', true);
    }
    draw();
  });

  M.set({ startMass: 50, mass: 50, temp: -10, lid: 'sealed', melted: false, frozen: true, lost: 0, trial: 1, setTemp: setT });
  draw();
  return {
    reset: function () { newSample(50); },
    setup: function (o) { if (o.amount) { amt.set(String(o.amount)); newSample(o.amount); } if (o.lid) { lid = o.lid; lidSeg.set(o.lid); M.set('lid', o.lid); } if (o.heat != null) { heat.set(o.heat); } },
    auto: function (st) { // test helper: jump the model to satisfy a goal
      var g = st.goal && st.goal.check || {};
      if (g.startMass) newSample(g.startMass);
      if (g.lid) { lid = g.lid; lidSeg.set(g.lid); M.set('lid', g.lid); }
      if (g.lost) { lid = 'open'; lidSeg.set('open'); sample.ice = 0; sample.water = start - 5; sample.lost = 5; M.set({ lid: 'open', opened: true, lost: 5, mass: start - 5, melted: true }); }
      if (g.melted || g.meltedSealed) { sample.water = sample.ice + sample.water; sample.ice = 0; sample.T = 20; setT = 20; sample.wasMelted = true; M.set({ melted: true, lost: 0, mass: start }); }
      if (g.refrozen) { sample.ice = sample.water; sample.water = 0; sample.T = -5; setT = -10; M.set({ frozen: true, refrozen: true, mass: start }); }
      M.set('touchedHeat', true);
    }
  };
};

/* ------------------------------------------------------------------ */
/* Fizz Lab: vinegar + baking soda on a scale, open / balloon / stopper */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.fizzLab = function (M) {
  var K = M.kit, S = M.state;
  var vin = 100, soda = 10, cover = 'open', poured = false, reacted = 0, gas = 0, escaped = 0, popped = false, temp = 21, bubbles = [];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 360', class: 'sn-svg', role: 'img', 'aria-label': 'Flask of vinegar and a cup of baking soda on a digital scale' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rM = K.readout('Scale: total mass', 'g', true), rT = K.readout('Temperature', '°C'), rG = K.readout('Gas made', 'g');
  [rM, rT, rG].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var vS = K.slider({ label: '🧪 Vinegar', min: 50, max: 150, step: 25, value: vin, unit: 'g', onInput: function (v) { if (poured) return; vin = v; update(); } });
  var sS = K.slider({ label: '🥄 Baking soda', min: 5, max: 20, step: 5, value: soda, unit: 'g', onInput: function (v) { if (poured) return; soda = v; update(); } });
  var cS = K.seg([['open', 'Open flask'], ['balloon', '🎈 Balloon'], ['stopper', 'Rubber stopper']], cover, function (v) { if (poured) { M.toast('Reset first to change the cover.'); cS.set(cover); return; } cover = v; update(); });
  var pour = K.btn('Pour the baking soda in ⤵', function () { if (poured) return; poured = true; M.set({ poured: true, before: total(), cover: cover, trial: (S.trial || 0) + 1 }); pour.disabled = true; }, 'primary');
  var reset = K.btn('↺ Reset', function () { poured = false; reacted = 0; gas = 0; escaped = 0; popped = false; temp = 21; pour.disabled = false; M.set({ poured: false, done: false, popped: false, lost: 0, gas: 0 }); update(); });
  ctr.appendChild(vS.el); ctr.appendChild(sS.el);
  var row = K.el('<div class="sn-row"></div>'); row.appendChild(K.el('<b class="sn-note">Cover:</b>')); row.appendChild(cS.el); row.appendChild(pour); row.appendChild(reset); ctr.appendChild(row);
  M.el.appendChild(ctr);

  function maxReact() { return Math.min(soda, vin * 0.084); } // 5% vinegar: acid limits the reaction
  function total() { return vin + soda + 30 + (cover === 'balloon' ? 3 : cover === 'stopper' ? 8 : 0) - escaped; } // 30 g = cup + flask (tared) … shown as total
  function update() {
    var inFlask = poured, left = soda - reacted, r = gas;
    var bal = cover === 'balloon' ? Math.min(1, gas / 5) : 0;
    var h = '<rect width="640" height="360" fill="#e3edf1"/><rect y="300" width="640" height="60" fill="#5b4636"/><rect y="296" width="640" height="7" fill="#7a5f49"/>';
    h += '<rect x="150" y="262" width="340" height="34" rx="6" fill="#dee2e6" stroke="#868e96" stroke-width="2"/><rect x="280" y="270" width="80" height="20" rx="4" fill="#111a22"/><text x="320" y="285" font-size="13" fill="#7cf5c4" text-anchor="middle" font-family="monospace">' + K.fmt(total(), 1) + ' g</text>';
    // flask
    var fx = 260, fy = 110;
    h += '<path d="M' + (fx + 28) + ' ' + fy + ' v50 l-50 90 q-6 12 8 12 h124 q14 0 8 -12 l-50 -90 v-50 z" fill="rgba(220,240,248,.5)" stroke="#6c8a99" stroke-width="3"/>';
    var lvl = 190 + (1 - vin / 150) * 50;
    h += '<path d="M' + (fx + 10 + (lvl - 160) * -0.55 + 18) + ' ' + lvl + ' L' + (fx - 20) + ' 250 q-4 8 8 8 h112 q12 0 8 -8 L' + (fx + 82 - (lvl - 160) * -0.55 - 18) + ' ' + lvl + ' z" fill="' + (inFlask ? '#fff3bf' : '#fff9db') + '" stroke="none" opacity=".9"/>';
    if (inFlask && left > 0.1) h += '<ellipse cx="' + (fx + 40) + '" cy="252" rx="' + (10 + left * 1.6) + '" ry="6" fill="#fff" stroke="#ced4da"/>';
    bubbles.forEach(function (b) { h += '<circle cx="' + b.x + '" cy="' + b.y + '" r="' + b.r + '" fill="none" stroke="#fff" stroke-width="2" opacity=".9"/>'; });
    // cover
    if (cover === 'balloon') { var br = 14 + bal * 46; h += '<path d="M' + (fx + 28) + ' ' + (fy + 2) + ' q-6 -14 ' + (20 - br * 0.1) + ' -22" stroke="#c92a2a" stroke-width="10" fill="none"/><ellipse cx="' + (fx + 50) + '" cy="' + (fy - 20 - br) + '" rx="' + br * 0.9 + '" ry="' + br + '" fill="#fa5252" stroke="#c92a2a" stroke-width="2"/><ellipse cx="' + (fx + 38) + '" cy="' + (fy - 30 - br * 1.3) + '" rx="' + br * 0.15 + '" ry="' + br * 0.3 + '" fill="#fff" opacity=".5"/>'; }
    if (cover === 'stopper') { var sy = popped ? fy - 120 : fy - 12; h += '<path d="M' + (fx + 24) + ' ' + sy + ' h32 l-3 20 h-26 z" fill="#343a40"/>' + (popped ? '<text x="' + (fx + 70) + '" y="' + (fy - 60) + '" font-size="22" font-weight="800" fill="#e8590c">POP!</text>' : ''); }
    if (cover === 'open' && poured && gas > 0.2 && reacted < maxReact() - 0.05) h += '<text x="' + (fx + 40) + '" y="' + (fy - 16) + '" font-size="13" text-anchor="middle" fill="#495057" font-weight="700">gas escaping ↑ ↑ ↑</text>';
    // cup of soda
    if (!inFlask) { h += '<path d="M390 222 h60 l-8 40 h-44 z" fill="#f1f3f5" stroke="#868e96" stroke-width="2"/><ellipse cx="420" cy="226" rx="' + (12 + soda) + '" ry="6" fill="#fff" stroke="#ced4da"/><text x="420" y="214" font-size="11" text-anchor="middle" fill="#495057">baking soda ' + soda + ' g</text>'; }
    else h += '<path d="M390 222 h60 l-8 40 h-44 z" fill="#f1f3f5" stroke="#868e96" stroke-width="2"/><text x="420" y="214" font-size="11" text-anchor="middle" fill="#495057">empty cup</text>';
    h += '<text x="' + (fx + 40) + '" y="326" font-size="12" text-anchor="middle" fill="#f8f9fa" font-weight="700">vinegar ' + vin + ' g · cover + flask + cup 30 g</text>';
    svg.innerHTML = h;
    rM.set(K.fmt(total(), 1)); rT.set(K.fmt(temp, 1)); rG.set(K.fmt(gas, 1));
  }
  M.loop(function (dt) {
    if (poured && reacted < maxReact() - 0.001) {
      var d = Math.min(maxReact() - reacted, dt * 2.2); reacted += d; gas += d * 0.52; temp = 21 - 3 * reacted / Math.max(1, maxReact());
      if (cover === 'open' || popped) { escaped += d * 0.52; }
      if (cover === 'stopper' && !popped && gas > 2.5) { popped = true; escaped += gas; M.set('popped', true); }
      if (Math.random() < 0.6) bubbles.push({ x: 262 + Math.random() * 70, y: 250, r: 2 + Math.random() * 4 });
    } else if (poured && !S.done) { M.set({ done: true, after: Math.round(total() * 10) / 10, lost: Math.round(escaped * 10) / 10, gas: Math.round(gas * 10) / 10, used: Math.round(reacted * 10) / 10, leftover: Math.round((soda - reacted) * 10) / 10 }); }
    if (!poured) temp += (21 - temp) * dt;
    bubbles.forEach(function (b) { b.y -= 60 * dt; b.x += (Math.random() - 0.5) * 2; }); bubbles = bubbles.filter(function (b) { return b.y > (cover === 'open' ? 60 : 130); });
    update();
  });
  M.set({ poured: false, done: false, cover: cover, vin: vin, soda: soda });
  update();
  return {
    auto: function (st) {
      var c = st.goal.check || {}; cover = c.cover || cover; if (c.soda) soda = c.soda; if (c.vin) vin = c.vin; cS.set(cover);
      var before = total(); poured = true; reacted = maxReact(); gas = reacted * 0.52; if (cover === 'open' || (cover === 'stopper' && gas > 2.5)) { escaped = gas; popped = cover === 'stopper'; }
      M.set({ poured: true, done: true, before: before, cover: cover, soda: soda, vin: vin, after: Math.round(total() * 10) / 10, lost: Math.round(escaped * 10) / 10, gas: Math.round(gas * 10) / 10, popped: popped, trial: (S.trial || 0) + 1 });
    }
  };
  // note: vin/soda state is only reported when poured so table rows match the trial
};

/* ------------------------------------------------------------------ */
/* Measure Lab: balance + graduated cylinder (displacement) + ruler      */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.measureLab = function (M) {
  var K = M.kit, S = M.state;
  var OBJ = (M.cfg.objects || [
    { id: 'rock', name: 'Rock', mass: 54, vol: 20, col: '#868e96', shape: 'rock' },
    { id: 'marble', name: 'Glass marble', mass: 12.5, vol: 5, col: '#4dabf7', shape: 'ball' },
    { id: 'key', name: 'Metal key', mass: 16, vol: 2, col: '#fab005', shape: 'key' },
    { id: 'clay', name: 'Clay ball', mass: 36, vol: 18, col: '#e8590c', shape: 'ball' },
    { id: 'dino', name: 'Toy dinosaur', mass: 22, vol: 14, col: '#40c057', shape: 'dino' }
  ]).map(function (o) { var c = {}; for (var k in o) c[k] = o[k]; return c; });
  var W0 = 50, pos = {}, where = {}, flat = false;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 680 380', class: 'sn-svg', role: 'img', 'aria-label': 'Balance scale, graduated cylinder, and objects on a shelf' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rM = K.readout('Balance', 'g', true), rV = K.readout('Cylinder', 'mL', true);
  reads.appendChild(rM.el); reads.appendChild(rV.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Drag an object onto the <b>balance</b> or into the <b>cylinder</b>. Drag it back to the shelf to remove it.</span></div>');
  var sq = K.btn('✋ Squish the clay into a pancake', function () { flat = !flat; sq.textContent = flat ? '✋ Roll the clay back into a ball' : '✋ Squish the clay into a pancake'; M.set('squished', flat ? true : S.squished); M.set('clayFlat', flat); draw(); report(); });
  var zoom = K.toggle('🔍 Magnifier on the cylinder', true, function () { draw(); });
  ctr.appendChild(sq); ctr.appendChild(zoom.el); M.el.appendChild(ctr);
  OBJ.forEach(function (o, i) { pos[o.id] = [58 + i * 70, 92]; where[o.id] = 'shelf'; });
  var SC = [180, 270], CY = [470, 110, 70, 200]; // scale pan center; cylinder x,y,w,h
  function level() { var v = W0; OBJ.forEach(function (o) { if (where[o.id] === 'cyl') v += o.vol; }); return v; }
  function onScale() { var m = 0; OBJ.forEach(function (o) { if (where[o.id] === 'scale') m += o.mass; }); return m; }
  function shapeSVG(o, x, y) {
    var s = '', c = o.col;
    if (o.id === 'clay' && flat) return '<ellipse cx="' + x + '" cy="' + (y + 8) + '" rx="26" ry="8" fill="' + c + '" stroke="#00000033"/>';
    if (o.shape === 'rock') s = '<path d="M' + (x - 18) + ' ' + (y + 12) + ' q-4 -20 12 -24 q18 -6 24 8 q6 14 -6 18 z" fill="' + c + '" stroke="#495057"/>';
    else if (o.shape === 'ball') s = '<circle cx="' + x + '" cy="' + y + '" r="' + (o.vol > 10 ? 15 : 10) + '" fill="' + c + '" stroke="#00000044"/><circle cx="' + (x - 4) + '" cy="' + (y - 4) + '" r="3" fill="#fff" opacity=".6"/>';
    else if (o.shape === 'key') s = '<circle cx="' + (x - 10) + '" cy="' + y + '" r="8" fill="none" stroke="' + c + '" stroke-width="5"/><rect x="' + (x - 3) + '" y="' + (y - 3) + '" width="22" height="6" fill="' + c + '"/><rect x="' + (x + 12) + '" y="' + (y + 2) + '" width="4" height="7" fill="' + c + '"/>';
    else if (o.shape === 'dino') s = '<path d="M' + (x - 18) + ' ' + (y + 10) + ' q2 -18 16 -16 l6 -12 q6 -4 8 2 l-4 10 q10 4 10 16 z" fill="' + c + '" stroke="#2b8a3e"/><circle cx="' + (x + 8) + '" cy="' + (y - 14) + '" r="1.6" fill="#000"/>';
    return s;
  }
  function draw() {
    var h = '<rect width="680" height="380" fill="#e9f1f4"/><rect y="330" width="680" height="50" fill="#5b4636"/><rect y="326" width="680" height="6" fill="#7a5f49"/>';
    h += '<rect x="24" y="112" width="360" height="10" rx="3" fill="#8b6b4a"/><text x="36" y="140" font-size="12" fill="#495057" font-weight="700">SHELF</text>';
    // balance
    h += '<rect x="110" y="290" width="140" height="36" rx="6" fill="#dee2e6" stroke="#868e96" stroke-width="2"/><rect x="146" y="298" width="68" height="20" rx="4" fill="#111a22"/><text x="180" y="313" text-anchor="middle" font-size="13" fill="#7cf5c4" font-family="monospace">' + K.fmt(onScale(), 1) + ' g</text><rect x="120" y="280" width="120" height="10" rx="4" fill="#adb5bd"/><text x="180" y="350" text-anchor="middle" font-size="12" fill="#f8f9fa" font-weight="700">BALANCE</text>';
    // cylinder
    var x = CY[0], y = CY[1], w = CY[2], hh = CY[3], L = level(), px = hh / 100; // 100 mL tall
    h += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" rx="8" fill="rgba(230,245,255,.5)" stroke="#6c8a99" stroke-width="3"/><rect x="' + (x - 12) + '" y="' + (y + hh) + '" width="' + (w + 24) + '" height="10" rx="3" fill="#6c8a99"/>';
    h += '<rect x="' + (x + 3) + '" y="' + (y + hh - L * px) + '" width="' + (w - 6) + '" height="' + (L * px - 3) + '" rx="5" fill="#74c0fc" opacity=".75"/>';
    for (var t = 0; t <= 100; t += 2) { var yy = y + hh - t * px; h += '<line x1="' + x + '" x2="' + (x + (t % 10 ? 10 : 20)) + '" y1="' + yy + '" y2="' + yy + '" stroke="#1d2433" stroke-width="' + (t % 10 ? 1 : 1.6) + '"/>' + (t % 10 ? '' : '<text x="' + (x - 6) + '" y="' + (yy + 4) + '" font-size="11" text-anchor="end" fill="#1d2433">' + t + '</text>'); }
    h += '<text x="' + (x + w / 2) + '" y="350" text-anchor="middle" font-size="12" fill="#f8f9fa" font-weight="700">GRADUATED CYLINDER (mL)</text>';
    if (zoom.get()) { var zy = y + hh - L * px; h += '<g><circle cx="' + (x + w + 70) + '" cy="' + zy + '" r="46" fill="#fff" stroke="#343a40" stroke-width="4"/><clipPath id="mlz"><circle cx="' + (x + w + 70) + '" cy="' + zy + '" r="44"/></clipPath><g clip-path="url(#mlz)"><rect x="' + (x + w + 24) + '" y="' + zy + '" width="92" height="60" fill="#74c0fc" opacity=".75"/>';
      for (var t2 = Math.floor(L / 2) * 2 - 6; t2 <= L + 6; t2 += 2) { var y2 = zy + (L - t2) * 10; h += '<line x1="' + (x + w + 26) + '" x2="' + (x + w + (t2 % 10 ? 56 : 76)) + '" y1="' + y2 + '" y2="' + y2 + '" stroke="#1d2433" stroke-width="2"/><text x="' + (x + w + 112) + '" y="' + (y2 + 4) + '" font-size="12" text-anchor="end" font-weight="700" fill="#1d2433">' + t2 + '</text>'; }
      h += '</g><line x1="' + (x + w) + '" x2="' + (x + w + 24) + '" y1="' + zy + '" y2="' + zy + '" stroke="#343a40" stroke-width="2"/></g>'; }
    OBJ.forEach(function (o) {
      var p = pos[o.id];
      h += '<g class="ml-obj" data-o="' + o.id + '" role="button" tabindex="0" aria-label="' + o.name + '">' + shapeSVG(o, p[0], p[1]) + '<text x="' + p[0] + '" y="' + (p[1] + 34) + '" font-size="10.5" font-weight="700" text-anchor="middle" fill="#343a40">' + (where[o.id] === 'shelf' ? o.name : '') + '</text><rect x="' + (p[0] - 26) + '" y="' + (p[1] - 26) + '" width="52" height="52" fill="transparent"/></g>';
    });
    svg.innerHTML = h;
    svg.querySelectorAll('.ml-obj').forEach(function (g) {
      var id = g.getAttribute('data-o');
      K.drag(g, { svg: svg, pos: function () { return pos[id]; }, move: function (a, b) { pos[id] = [K.clamp(a, 20, 660), K.clamp(b, 20, 320)]; var e = svg.querySelector('[data-o="' + id + '"]'); if (e) e.setAttribute('transform', 'translate(' + (pos[id][0] - dragStart[0]) + ',' + (pos[id][1] - dragStart[1]) + ')'); }, start: function (a, b) { dragStart = [a, b]; }, end: function (a, b) { drop(id, a, b); } });
    });
    rM.set(K.fmt(onScale(), 1)); rV.set(K.fmt(L, 0));
  }
  var dragStart = [0, 0];
  function drop(id, a, b) {
    var old = where[id];
    if (a > 110 && a < 250 && b > 200 && b < 330) { where[id] = 'scale'; var n = OBJ.filter(function (o) { return where[o.id] === 'scale'; }).length; pos[id] = [150 + (n - 1) * 30, 262]; }
    else if (a > CY[0] - 30 && a < CY[0] + CY[2] + 30 && b > CY[1] - 60 && b < CY[1] + CY[3]) { where[id] = 'cyl'; var n2 = OBJ.filter(function (o) { return where[o.id] === 'cyl'; }).length; pos[id] = [CY[0] + CY[2] / 2, CY[1] + CY[3] - 22 - (n2 - 1) * 28]; }
    else { where[id] = 'shelf'; var i = OBJ.map(function (o) { return o.id; }).indexOf(id); pos[id] = [58 + i * 70, 92]; }
    if (old !== where[id]) M.set('moves', (S.moves || 0) + 1);
    draw(); report();
  }
  function report() {
    var sc = OBJ.filter(function (o) { return where[o.id] === 'scale'; }).map(function (o) { return o.id; }), cy = OBJ.filter(function (o) { return where[o.id] === 'cyl'; }).map(function (o) { return o.id; });
    var st = { scale: sc.join('+'), cyl: cy.join('+'), mass: onScale(), level: level(), volIn: level() - W0 };
    sc.forEach(function (id) { st['massed_' + id] = true; }); cy.forEach(function (id) { st['dunked_' + id] = true; });
    M.set(st);
  }
  draw(); M.set({ level: W0, mass: 0, scale: '', cyl: '', clayFlat: false });
  return {
    auto: function (st) { var c = st.goal.check || {}; OBJ.forEach(function (o) { where[o.id] = 'shelf'; });
      if (c.scale) String(c.scale).split('+').forEach(function (id) { where[id] = 'scale'; }); if (c.cyl) String(c.cyl).split('+').forEach(function (id) { where[id] = 'cyl'; });
      if (c.clayFlat) { flat = true; M.set('squished', true); M.set('clayFlat', true); }
      draw(); report(); }
  };
};

/* ------------------------------------------------------------------ */
/* Property Bench: magnet, circuit, and water tests on materials         */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.propBench = function (M) {
  var K = M.kit, S = M.state;
  var MAT = M.cfg.materials || [
    { id: 'nail', name: 'Iron nail', icon: '🔩', magnet: true, conduct: true, water: 'sinks', col: '#868e96' },
    { id: 'copper', name: 'Copper wire', icon: '〰️', magnet: false, conduct: true, water: 'sinks', col: '#d9480f' },
    { id: 'foil', name: 'Aluminum foil', icon: '🥈', magnet: false, conduct: true, water: 'floats (flat)', col: '#ced4da' },
    { id: 'wood', name: 'Wood block', icon: '🪵', magnet: false, conduct: false, water: 'floats', col: '#b07d48' },
    { id: 'spoon', name: 'Plastic spoon', icon: '🥄', magnet: false, conduct: false, water: 'floats', col: '#74c0fc' },
    { id: 'salt', name: 'Salt', icon: '🧂', magnet: false, conduct: false, water: 'dissolves', col: '#f8f9fa' },
    { id: 'sand', name: 'Sand', icon: '⏳', magnet: false, conduct: false, water: 'sinks', col: '#e9c46a' },
    { id: 'mystery', name: 'Mystery sample X', icon: '❓', magnet: true, conduct: true, water: 'sinks', col: '#495057', mystery: true }
  ];
  var sel = null, tests = {}, anim = null;
  M.el.innerHTML = '';
  var wrap = K.el('<div class="pb"><div class="pb-tray" role="list" aria-label="Materials"></div><div class="pb-stations"></div><div class="pb-result" aria-live="polite">Pick a material, then choose a test.</div></div>');
  M.el.appendChild(wrap);
  var style = K.el('<style>.pb{display:flex;flex-direction:column;gap:10px}.pb-tray{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}.pb-m{display:flex;flex-direction:column;align-items:center;gap:2px;border:2px solid var(--sn-line);background:#fff;border-radius:12px;padding:8px 4px;cursor:pointer;font-weight:700;font-size:.85em}.pb-m span{font-size:1.8em}.pb-m.sel{border-color:var(--sn-acc);box-shadow:0 0 0 3px var(--sn-acc2)}.pb-m small{font-weight:600;color:var(--sn-soft)}.pb-stations{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.pb-st{border:2px solid var(--sn-line);border-radius:12px;background:#fff;padding:6px;cursor:pointer;text-align:center}.pb-st:disabled{opacity:.5;cursor:not-allowed}.pb-st svg{width:100%;height:auto;display:block}.pb-st b{display:block;font-size:.9em}.pb-result{background:#111a22;color:#7cf5c4;border-radius:10px;padding:10px 14px;font-family:ui-monospace,Menlo,monospace;min-height:44px}@media(max-width:600px){.pb-stations{grid-template-columns:1fr}}</style>');
  M.el.appendChild(style);
  var tray = wrap.querySelector('.pb-tray'), sts = wrap.querySelector('.pb-stations'), res = wrap.querySelector('.pb-result');
  function paintTray() {
    tray.innerHTML = MAT.map(function (m) { var t = tests[m.id] || {}, n = Object.keys(t).length; return '<button type="button" class="pb-m' + (sel === m.id ? ' sel' : '') + '" data-m="' + m.id + '" role="listitem"><span aria-hidden="true">' + m.icon + '</span>' + m.name + '<small>' + (n ? n + '/3 tests' : 'not tested') + '</small></button>'; }).join('');
    tray.querySelectorAll('[data-m]').forEach(function (b) { b.addEventListener('click', function () { sel = b.getAttribute('data-m'); paintTray(); paintSt(); M.set('picked', sel); }); });
  }
  var ST = [['magnet', '🧲 Magnet test'], ['conduct', '💡 Circuit test'], ['water', '💧 Water test']];
  function stSVG(kind, m, on) {
    var c = m ? m.col : '#dee2e6', h = '<svg viewBox="0 0 200 120" aria-hidden="true"><rect width="200" height="120" rx="10" fill="#f1f3f5"/>';
    if (kind === 'magnet') { h += '<path d="M70 20 v40 a30 30 0 0 0 60 0 v-40 h-18 v40 a12 12 0 0 1 -24 0 v-40 z" fill="#e03131"/><rect x="70" y="20" width="18" height="14" fill="#adb5bd"/><rect x="112" y="20" width="18" height="14" fill="#adb5bd"/>'; if (m) h += '<rect x="80" y="' + (on && m.magnet ? 92 : 100) + '" width="40" height="12" rx="4" fill="' + c + '" stroke="#495057"/>' + (on ? '<text x="100" y="116" font-size="10" text-anchor="middle" fill="#495057">' + (m.magnet ? 'pulled up!' : 'no pull') + '</text>' : ''); }
    if (kind === 'conduct') { h += '<rect x="20" y="40" width="30" height="50" rx="4" fill="#343a40"/><text x="35" y="70" font-size="10" fill="#fff" text-anchor="middle">1.5V</text><path d="M50 50 h40 M150 50 h-20 M35 40 v-20 h120 v30 M130 50 h-20" stroke="#495057" stroke-width="3" fill="none"/><circle cx="155" cy="62" r="14" fill="' + (on && m && m.conduct ? '#ffe066' : '#f8f9fa') + '" stroke="#495057" stroke-width="2"/>' + (on && m && m.conduct ? '<circle cx="155" cy="62" r="24" fill="#ffe066" opacity=".35"/>' : ''); if (m) h += '<rect x="88" y="44" width="24" height="12" rx="3" fill="' + c + '" stroke="#495057"/>'; }
    if (kind === 'water') { h += '<rect x="60" y="30" width="80" height="80" rx="6" fill="rgba(116,192,252,.35)" stroke="#6c8a99" stroke-width="2"/><rect x="62" y="50" width="76" height="58" fill="#74c0fc" opacity=".6"/>'; if (m) { var y = !on ? 20 : /float/.test(m.water) ? 44 : /dissol/.test(m.water) ? -99 : 96; if (y > 0) h += '<rect x="86" y="' + y + '" width="28" height="12" rx="3" fill="' + c + '" stroke="#495057"/>'; if (on && /dissol/.test(m.water)) h += '<text x="100" y="80" font-size="10" text-anchor="middle" fill="#1864ab">(mixed in, invisible)</text>'; } }
    return h + '</svg>';
  }
  function paintSt() {
    var m = MAT.filter(function (x) { return x.id === sel; })[0];
    sts.innerHTML = ST.map(function (s) { var done = m && tests[m.id] && s[0] in tests[m.id]; return '<button type="button" class="pb-st" data-t="' + s[0] + '"' + (m ? '' : ' disabled') + '>' + stSVG(s[0], m, done) + '<b>' + s[1] + '</b></button>'; }).join('');
    sts.querySelectorAll('[data-t]').forEach(function (b) { b.addEventListener('click', function () { run(b.getAttribute('data-t')); }); });
  }
  function run(kind) {
    var m = MAT.filter(function (x) { return x.id === sel; })[0]; if (!m) return;
    tests[m.id] = tests[m.id] || {}; tests[m.id][kind] = m[kind];
    var out = kind === 'magnet' ? (m.magnet ? 'ATTRACTED to the magnet' : 'NOT attracted to the magnet') : kind === 'conduct' ? (m.conduct ? 'Bulb LIGHTS: conducts electricity' : 'Bulb stays OFF: does not conduct') : 'In water it ' + m.water.toUpperCase();
    res.textContent = m.name + ': ' + out;
    paintSt(); paintTray();
    var st = { lastTest: kind, lastMat: m.id, nTested: Object.keys(tests).length };
    st['t_' + m.id + '_' + kind] = true;
    var all = true; ST.forEach(function (s) { if (!(s[0] in (tests[m.id] || {}))) all = false; }); if (all) st['all_' + m.id] = true;
    st.fullTested = MAT.filter(function (x) { return ST.every(function (s) { return tests[x.id] && s[0] in tests[x.id]; }); }).length;
    M.set(st);
  }
  paintTray(); paintSt(); M.set({ nTested: 0, fullTested: 0 });
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^(?:t|all)_(\w+?)(?:_(\w+))?$/); if (mm) { sel = mm[1]; (mm[2] ? [mm[2]] : ['magnet', 'conduct', 'water']).forEach(run); } } if (c.fullTested) MAT.forEach(function (m) { sel = m.id; ['magnet', 'conduct', 'water'].forEach(run); }); if (c.nTested) MAT.slice(0, c.nTested.gte || c.nTested).forEach(function (m) { sel = m.id; run('magnet'); }); } };
};

/* ------------------------------------------------------------------ */
/* Mix and Separate: make a mixture on a scale, then separate it         */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.mixLab = function (M) {
  var K = M.kit, S = M.state;
  var amt = { sand: 0, salt: 0, iron: 0, water: 0 }, out = { iron: 0, sand: 0, salt: 0, water: 0 }, stage = 'mix', evap = 0, heating = false;
  var NAMES = { sand: 'Sand', salt: 'Salt', iron: 'Iron filings', water: 'Water' }, COL = { sand: '#e9c46a', salt: '#f8f9fa', iron: '#495057', water: '#74c0fc' };
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 680 330', class: 'sn-svg', role: 'img', 'aria-label': 'Mixing bowl on a scale with separating tools' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rB = K.readout('Bowl (mixture)', 'g', true), rP = K.readout('Separated parts total', 'g', true);
  reads.appendChild(rB.el); reads.appendChild(rP.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var addRow = K.el('<div class="sn-row"><b class="sn-note">Add 10 g:</b></div>');
  ['sand', 'salt', 'iron', 'water'].forEach(function (k) { addRow.appendChild(K.btn('+ ' + NAMES[k], function () { if (stage !== 'mix') { M.toast('You already started separating. Press ↺ to start over.'); return; } amt[k] += k === 'water' ? 50 : 10; if (k === 'water') M.toast('Water adds 50 g.'); if (k === 'salt' && amt.water) M.toast('The salt dissolves in the water.'); report(); draw(); }, 'sm')); });
  var tools = K.el('<div class="sn-row"><b class="sn-note">Separate:</b></div>');
  var tMag = K.btn('🧲 Magnet', function () { if (!amt.iron) { M.toast('No iron to pull out.'); return; } stage = 'sep'; out.iron += amt.iron; amt.iron = 0; M.set('usedMagnet', true); report(); draw(); }, 'sm');
  var tFil = K.btn('⏳ Filter', function () { if (!amt.water) { M.toast('Filtering needs water to pour through. Add water first.'); return; } if (!amt.sand) { M.toast('Nothing stuck in the filter.'); } stage = 'sep'; out.sand += amt.sand; amt.sand = 0; M.set('usedFilter', true); report(); draw(); }, 'sm');
  var tEv = K.btn('🔥 Evaporate the water', function () { if (!amt.water) { M.toast('No water to evaporate.'); return; } if (amt.sand || amt.iron) { M.toast('Tip: take out the sand and iron first, or they will be left in the dish too.'); } stage = 'sep'; heating = true; M.set('usedEvap', true); }, 'sm');
  var tCatch = K.toggle('Catch the steam (condenser)', true, function (b) { M.set('condenser', b); });
  var rs = K.btn('↺ Start over', function () { amt = { sand: 0, salt: 0, iron: 0, water: 0 }; out = { iron: 0, sand: 0, salt: 0, water: 0 }; stage = 'mix'; evap = 0; heating = false; M.set({ usedMagnet: false, usedFilter: false, usedEvap: false, separated: false }); report(); draw(); }, 'sm ghost');
  [tMag, tFil, tEv].forEach(function (b) { tools.appendChild(b); }); tools.appendChild(tCatch.el); tools.appendChild(rs);
  ctr.appendChild(addRow); ctr.appendChild(tools); M.el.appendChild(ctr);
  function bowl() { return amt.sand + amt.salt + amt.iron + amt.water; }
  function parts() { return out.iron + out.sand + out.salt + out.water; }
  function report() {
    var st = { sand: amt.sand + out.sand, salt: amt.salt + out.salt, iron: amt.iron + out.iron, bowl: bowl(), parts: Math.round(parts() * 10) / 10, stage: stage, lostSteam: Math.round(evap * 10) / 10 };
    st.mixTotal = S.mixTotal && stage === 'sep' ? S.mixTotal : bowl();
    st.ingredients = ['sand', 'salt', 'iron', 'water'].filter(function (k) { return amt[k] + out[k] > 0; }).length;
    st.separated = stage === 'sep' && bowl() < 0.05;
    st.recovered = Math.round((parts()) * 10) / 10;
    M.set(st);
  }
  function draw() {
    var h = '<rect width="680" height="330" fill="#eaf1ee"/><rect y="280" width="680" height="50" fill="#5b4636"/><rect y="276" width="680" height="6" fill="#7a5f49"/>';
    // bowl on scale
    h += '<rect x="60" y="244" width="200" height="30" rx="6" fill="#dee2e6" stroke="#868e96" stroke-width="2"/><rect x="125" y="250" width="70" height="18" rx="4" fill="#111a22"/><text x="160" y="264" text-anchor="middle" font-size="12" fill="#7cf5c4" font-family="monospace">' + K.fmt(bowl(), 1) + ' g</text>';
    h += '<g transform="translate(0,36)"><path d="M70 150 q90 110 180 0 z" fill="#f1f3f5" stroke="#6c8a99" stroke-width="3"/>';
    var tot = bowl(); if (tot > 0) { var lvl = 150 + 60 * (1 - Math.min(1, tot / 250)); h += '<clipPath id="mxb"><path d="M70 150 q90 110 180 0 z"/></clipPath><g clip-path="url(#mxb)"><rect x="60" y="' + lvl + '" width="200" height="120" fill="' + (amt.water ? '#a5d8ff' : '#f8f0dc') + '"/>'; var r = K.rng('mix'); ['sand', 'iron', 'salt'].forEach(function (k) { if (k === 'salt' && amt.water) return; for (var i = 0; i < amt[k] / 2; i++) h += '<circle cx="' + (90 + r() * 140) + '" cy="' + (lvl + 8 + r() * (205 - lvl)) + '" r="' + (k === 'iron' ? 1.8 : 2.4) + '" fill="' + COL[k] + '" stroke="#00000022"/>'; }); h += '</g>'; }
    h += '</g>';
    h += '<text x="160" y="300" text-anchor="middle" font-size="12" fill="#f8f9fa" font-weight="700">MIXING BOWL</text>';
    // separated dishes
    var dx = [330, 420, 510, 600];
    ['iron', 'sand', 'salt', 'water'].forEach(function (k, i) {
      var x = dx[i];
      h += '<ellipse cx="' + x + '" cy="232" rx="36" ry="10" fill="#f1f3f5" stroke="#868e96" stroke-width="2"/>';
      if (out[k] > 0) { if (k === 'water') h += '<rect x="' + (x - 16) + '" y="' + (232 - Math.min(60, out[k] / 3)) + '" width="32" height="' + Math.min(60, out[k] / 3) + '" rx="4" fill="#74c0fc"/>'; else h += '<ellipse cx="' + x + '" cy="228" rx="' + (8 + Math.min(20, out[k])) + '" ry="7" fill="' + COL[k] + '" stroke="#495057"/>'; }
      h += '<rect x="' + (x - 34) + '" y="244" width="68" height="30" rx="5" fill="#dee2e6" stroke="#868e96"/><text x="' + x + '" y="264" text-anchor="middle" font-size="12" font-family="monospace" fill="#1d2433">' + K.fmt(out[k], 1) + ' g</text><text x="' + x + '" y="300" text-anchor="middle" font-size="11" fill="#f8f9fa" font-weight="700">' + NAMES[k].toUpperCase() + '</text>';
    });
    if (heating) h += '<text x="160" y="110" text-anchor="middle" font-size="13" fill="#495057" font-weight="700">' + (tCatch.get() ? 'steam → condenser → water dish' : 'steam escaping into the air ↑') + '</text><path d="M120 130 q10 -20 0 -40 M160 130 q10 -20 0 -40 M200 130 q10 -20 0 -40" stroke="#adb5bd" stroke-width="3" fill="none"/>';
    svg.innerHTML = h;
    rB.set(K.fmt(bowl(), 1)); rP.set(K.fmt(parts(), 1));
  }
  M.loop(function (dt) {
    if (!heating) return;
    var d = Math.min(amt.water, dt * 40); amt.water -= d; if (tCatch.get()) out.water += d; else evap += d;
    if (amt.water <= 0.001) { amt.water = 0; heating = false; out.salt += amt.salt; amt.salt = 0; if (amt.sand) { out.sand += amt.sand; amt.sand = 0; } if (amt.iron) { out.iron += amt.iron; amt.iron = 0; } }
    report(); draw();
  });
  report(); draw(); M.set('condenser', true);
  return { auto: function (st) {
    var c = st.goal.check || {};
    if (c.ingredients || c.bowl) { amt = { sand: 20, salt: 10, iron: 10, water: 100 }; out = { iron: 0, sand: 0, salt: 0, water: 0 }; stage = 'mix'; S.mixTotal = 0; report(); }
    if (c.usedMagnet || c.separated) { out.iron += amt.iron; amt.iron = 0; stage = 'sep'; M.set('usedMagnet', true); }
    if (c.usedFilter || c.separated) { out.sand += amt.sand; amt.sand = 0; M.set('usedFilter', true); }
    if (c.usedEvap || c.separated) { out.water += amt.water; out.salt += amt.salt; amt.water = 0; amt.salt = 0; M.set('usedEvap', true); }
    report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Dissolve Lab: sugar in water, temperature and stirring                */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.dissolveLab = function (M) {
  var K = M.kit, S = M.state;
  var water = 200, temp = 20, stir = false, cubes = [], t = 0, running = false, trials = [];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 320', class: 'sn-svg', role: 'img', 'aria-label': 'Beaker of water with sugar cubes on a scale' });
  M.el.appendChild(svg);
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var reads = K.el('<div class="sn-reads" style="align-content:start"></div>'), rM = K.readout('Scale', 'g', true), rS = K.readout('Sugar you can see', 'g'), rT = K.readout('Timer', 's');
  [rM, rS, rT].forEach(function (r) { reads.appendChild(r.el); });
  var g = K.graph({ title: 'Time to dissolve 2 cubes', xLabel: 'Water temperature (°C)', yLabel: 'Seconds', xMax: 100, yMax: 120, dots: true, series: [{ name: 'Not stirred', color: '#e8590c' }, { name: 'Stirred', color: '#1971c2' }] });
  row.appendChild(reads); row.appendChild(g.el); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var tS = K.slider({ label: '🌡 Water temperature', min: 5, max: 90, step: 5, value: temp, unit: '°C', onInput: function (v) { if (running) { M.toast('Wait until the cubes dissolve, or reset.'); tS.set(temp, true); return; } temp = v; M.set('temp', v); draw(); } });
  var add = K.btn('🧊 Drop in 2 sugar cubes (10 g)', function () { if (running) return; cubes = [5, 5]; t = 0; running = true; M.set({ dropped: true, before: water + 10 + 100, dissolved: false }); }, 'primary');
  var stT = K.toggle('🥄 Stir', false, function (b) { stir = b; M.set('stir', b); });
  var rs = K.btn('↺ Fresh water', function () { cubes = []; running = false; t = 0; M.set({ dissolved: false, dropped: false }); S.dropped = false; draw(); }, 'ghost');
  ctr.appendChild(tS.el); var r2 = K.el('<div class="sn-row"></div>'); [add, stT.el, rs].forEach(function (b) { r2.appendChild(b); }); ctr.appendChild(r2); M.el.appendChild(ctr);
  function sugar() { return cubes.reduce(function (a, b) { return a + b; }, 0); }
  function mass() { return water + 100 + 10; } // beaker 100 g + water + 10 g of sugar (in the dish or in the water)
  var parts = []; for (var i = 0; i < 60; i++) parts.push([Math.random(), Math.random()]);
  function draw() {
    var h = '<rect width="640" height="320" fill="#eef4f6"/><rect y="270" width="640" height="50" fill="#5b4636"/>';
    h += '<rect x="180" y="236" width="280" height="30" rx="6" fill="#dee2e6" stroke="#868e96" stroke-width="2"/><rect x="285" y="242" width="70" height="18" rx="4" fill="#111a22"/><text x="320" y="256" text-anchor="middle" font-size="12" fill="#7cf5c4" font-family="monospace">' + K.fmt(mass(), 1) + ' g</text>';
    h += '<path d="M240 60 v166 q0 8 8 8 h144 q8 0 8 -8 v-166" fill="rgba(230,245,255,.5)" stroke="#6c8a99" stroke-width="3"/>';
    var warm = K.clamp((temp - 5) / 85, 0, 1);
    h += '<rect x="243" y="100" width="154" height="130" rx="6" fill="rgb(' + Math.round(116 + 120 * warm) + ',' + Math.round(192 - 60 * warm) + ',' + Math.round(252 - 150 * warm) + ')" opacity=".55"/>';
    var dis = S.dropped ? 10 - sugar() : 0;
    parts.forEach(function (p, i) { if (i < dis * 6) h += '<circle cx="' + (250 + p[0] * 140) + '" cy="' + (106 + p[1] * 118) + '" r="1.8" fill="#fff" opacity=".9"/>'; });
    cubes.forEach(function (c, i) { if (c <= 0) return; var s = 8 + 14 * Math.cbrt(c / 5); h += '<rect x="' + (280 + i * 50) + '" y="' + (226 - s) + '" width="' + s + '" height="' + s + '" rx="3" fill="#fff" stroke="#ced4da" stroke-width="2"/>'; });
    if (!S.dropped) h += '<ellipse cx="425" cy="232" rx="26" ry="6" fill="#f1f3f5" stroke="#868e96"/><rect x="405" y="212" width="16" height="16" rx="3" fill="#fff" stroke="#ced4da" stroke-width="2"/><rect x="427" y="212" width="16" height="16" rx="3" fill="#fff" stroke="#ced4da" stroke-width="2"/><text x="425" y="205" font-size="11" text-anchor="middle" fill="#495057">2 sugar cubes</text>';
    if (stir) h += '<rect x="330" y="30" width="8" height="190" rx="3" fill="#adb5bd" transform="rotate(' + (Math.sin(t * 6) * 10) + ' 334 80)"/>';
    if (temp > 50) h += '<path d="M280 50 q10 -16 0 -30 M320 50 q10 -16 0 -30 M360 50 q10 -16 0 -30" stroke="#ced4da" stroke-width="3" fill="none"/>';
    h += '<text x="320" y="296" text-anchor="middle" font-size="12" fill="#f8f9fa">200 g of water at ' + temp + ' °C · beaker 100 g</text>';
    svg.innerHTML = h;
    rM.set(K.fmt(mass(), 1)); rS.set(K.fmt(sugar(), 1)); rT.set(Math.floor(t));
  }
  M.loop(function (dt) {
    if (running) {
      t += dt * 4; // 4 s of lab time per real second
      var rate = 0.03 * Math.pow(1.045, temp) * (stir ? 2.5 : 1);
      cubes = cubes.map(function (c) { return Math.max(0, c - rate * dt * 4); });
      if (sugar() <= 0.001) {
        running = false; var sec = Math.round(t);
        trials.push({ temp: temp, stir: stir, sec: sec });
        g.set(0, trials.filter(function (x) { return !x.stir; }).map(function (x) { return [x.temp, x.sec]; }).sort(function (a, b) { return a[0] - b[0]; }));
        g.set(1, trials.filter(function (x) { return x.stir; }).map(function (x) { return [x.temp, x.sec]; }).sort(function (a, b) { return a[0] - b[0]; }));
        var st = { dissolved: true, lastTime: sec, lastTemp: temp, lastStir: stir, trials: trials.length, after: mass() };
        st['time_' + temp + (stir ? 's' : '')] = sec; st['done_' + temp + (stir ? 's' : '')] = true;
        st.hotTrials = trials.filter(function (x) { return x.temp >= 60; }).length; st.coldTrials = trials.filter(function (x) { return x.temp <= 20; }).length; st.stirTrials = trials.filter(function (x) { return x.stir; }).length;
        M.set(st);
      }
    }
    draw();
  });
  M.set({ temp: temp, stir: false, dropped: false, dissolved: false, trials: 0 }); draw();
  return { auto: function (st) {
    var c = st.goal.check || {};
    var want = []; for (var k in c) { var mm = k.match(/^done_(\d+)(s?)$/); if (mm) want.push([+mm[1], !!mm[2]]); }
    if (!want.length) want.push([c.lastTemp && c.lastTemp.gte ? c.lastTemp.gte : c.temp || 20, !!c.stir || !!(c.stirTrials)]);
    if (c.hotTrials) want.push([70, false]); if (c.coldTrials) want.push([10, false]);
    want.forEach(function (w) { temp = w[0]; stir = w[1]; tS.set(temp, true); stT.set(stir); cubes = [5, 5]; S.dropped = true; running = true; t = 0; var rate = 0.03 * Math.pow(1.045, temp) * (stir ? 2.5 : 1); t = 5 / rate; cubes = [0, 0]; });
    M.set({ temp: temp, stir: stir, dropped: true, before: 310 });
  } };
};
