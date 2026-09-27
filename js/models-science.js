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

/* ------------------------------------------------------------------ */
/* Shadow Clock: move the Sun through the day and seasons               */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.shadowLab = function (M) {
  var K = M.kit, S = M.state;
  var SEA = { summer: { rise: 4.8, set: 19.2, max: 73, name: 'June (summer)' }, equinox: { rise: 6, set: 18, max: 50, name: 'March (spring)' }, winter: { rise: 7.3, set: 16.7, max: 27, name: 'December (winter)' } };
  var t = 9, sea = 'equinox', marks = [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:10px"></div>');
  var top = K.svgEl('svg', { viewBox: '0 0 360 360', class: 'sn-svg', role: 'img', 'aria-label': 'Top view of a stick and its shadow with compass directions' });
  var side = K.svgEl('svg', { viewBox: '0 0 360 220', class: 'sn-svg', role: 'img', 'aria-label': 'Sky view of the Sun\'s path from east to west' });
  var right = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  right.appendChild(side);
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Time', ''), rA = K.readout('Sun height', '°'), rL = K.readout('Shadow length', 'm'), rD = K.readout('Shadow points', '');
  [rT, rA, rL, rD].forEach(function (r) { reads.appendChild(r.el); }); right.appendChild(reads);
  row.appendChild(top); row.appendChild(right); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var tS = K.slider({ label: '🕘 Time of day', min: 4.5, max: 19.5, step: 0.5, value: t, fmt: clock, onInput: function (v) { t = v; M.set('movedTime', true); update(); } });
  var sS = K.seg([['summer', '☀️ June'], ['equinox', '🌷 March'], ['winter', '❄️ December']], sea, function (v) { sea = v; M.set('season', v); M.set('seasonsTried', uniq((S.seasonsTried || []).concat([v]))); update(); });
  var mk = K.btn('📍 Mark the shadow', function () { var s = sun(); if (s.alt <= 0) { M.toast('No shadow: the Sun is down.'); return; } marks.push({ t: t, sea: sea, len: s.len, az: s.az }); var st = { marks: marks.length }; st['mark_' + sea + '_' + t] = K.round(s.len, 1); st['marks_' + sea] = marks.filter(function (m) { return m.sea === sea; }).length; M.set(st); update(); }, 'primary');
  var cl = K.btn('Erase marks', function () { marks = []; M.set('marks', 0); update(); }, 'ghost sm');
  ctr.appendChild(tS.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(sS.el); r2.appendChild(mk); r2.appendChild(cl); ctr.appendChild(r2); M.el.appendChild(ctr);
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function clock(v) { var h = Math.floor(v), m = Math.round((v - h) * 60); var ap = h >= 12 ? 'PM' : 'AM', hh = h % 12 || 12; return hh + ':' + (m < 10 ? '0' : '') + m + ' ' + ap; }
  function sun(tt, ss) {
    var e = SEA[ss || sea], x = ((tt == null ? t : tt) - e.rise) / (e.set - e.rise);
    if (x <= 0 || x >= 1) return { alt: -5, az: x <= 0 ? 90 : 270, len: 0 };
    var alt = e.max * Math.sin(Math.PI * x), az = 90 + 180 * x; // east (90) → south (180) → west (270)
    return { alt: alt, az: az, len: 1 / Math.tan(alt * Math.PI / 180) };
  }
  function dirName(az) { var d = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']; return d[Math.round(((az % 360) + 360) % 360 / 45) % 8]; }
  function update() {
    var s = sun(), cx = 180, cy = 180, R = 150;
    var h = '<rect width="360" height="360" fill="#8fbf6a"/><circle cx="180" cy="180" r="160" fill="#a5d27a"/>';
    h += '<circle cx="180" cy="180" r="' + R + '" fill="none" stroke="#6d9f4d" stroke-width="2" stroke-dasharray="4 5"/>';
    [['N', 0], ['E', 90], ['S', 180], ['W', 270]].forEach(function (d) { var a = (d[1] - 90) * Math.PI / 180; h += '<text x="' + (cx + Math.cos(a) * 134) + '" y="' + (cy + Math.sin(a) * 134 + 6) + '" text-anchor="middle" font-size="18" font-weight="800" fill="#1d3a12">' + d[0] + '</text>'; });
    marks.forEach(function (m) { if (m.sea !== sea) return; var a = (m.az + 180 - 90) * Math.PI / 180, L = Math.min(m.len, 4.6) * 26; h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a) * L) + '" y2="' + (cy + Math.sin(a) * L) + '" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/><circle cx="' + (cx + Math.cos(a) * L) + '" cy="' + (cy + Math.sin(a) * L) + '" r="4" fill="#fff"/><text x="' + (cx + Math.cos(a) * (L + 12)) + '" y="' + (cy + Math.sin(a) * (L + 12) + 4) + '" font-size="10" text-anchor="middle" fill="#1d3a12">' + clock(m.t).replace(':00', '') + '</text>'; });
    if (s.alt > 0) { var a2 = (s.az + 180 - 90) * Math.PI / 180, L2 = Math.min(s.len, 4.6) * 26; h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a2) * L2) + '" y2="' + (cy + Math.sin(a2) * L2) + '" stroke="#2f3e28" stroke-width="10" stroke-linecap="round" opacity=".75"/>' + (s.len > 4.6 ? '<text x="' + (cx + Math.cos(a2) * 140) + '" y="' + (cy + Math.sin(a2) * 140) + '" font-size="11" fill="#1d3a12" text-anchor="middle">(longer)</text>' : '');
      var a3 = (s.az - 90) * Math.PI / 180; h += '<circle cx="' + (cx + Math.cos(a3) * 160) + '" cy="' + (cy + Math.sin(a3) * 160) + '" r="14" fill="#ffd43b" stroke="#f08c00" stroke-width="3"/>'; }
    h += '<circle cx="180" cy="180" r="7" fill="#8b5a2b" stroke="#5c3a1a" stroke-width="2"/><text x="180" y="352" text-anchor="middle" font-size="12" fill="#1d3a12" font-weight="700">TOP VIEW · 1-meter stick</text>';
    top.innerHTML = h;
    // side sky view
    var e = SEA[sea], hs = '<defs><linearGradient id="skyG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + (s.alt > 0 ? '#74c0fc' : '#1b2a4a') + '"/><stop offset="1" stop-color="' + (s.alt > 0 ? '#d0ebff' : '#364fc7') + '"/></linearGradient></defs><rect width="360" height="220" fill="url(#skyG)"/>';
    var pts = []; for (var tt = e.rise; tt <= e.set; tt += 0.25) { var q = sun(tt); var x = 20 + (q.az - 90) / 180 * 320; pts.push(x + ',' + (190 - q.alt * 2.2)); }
    hs += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>';
    if (s.alt > 0) { var sx = 20 + (s.az - 90) / 180 * 320; hs += '<circle cx="' + sx + '" cy="' + (190 - s.alt * 2.2) + '" r="13" fill="#ffd43b" stroke="#f08c00" stroke-width="3"/>'; }
    else hs += '<text x="180" y="100" text-anchor="middle" font-size="16" fill="#fff" font-weight="700">Night: the Sun is below the horizon</text>';
    hs += '<rect y="190" width="360" height="30" fill="#6d9f4d"/><text x="20" y="210" font-size="13" font-weight="800" fill="#fff">E</text><text x="180" y="210" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">S</text><text x="340" y="210" font-size="13" font-weight="800" fill="#fff" text-anchor="end">W</text><text x="10" y="18" font-size="11" fill="#fff" font-weight="700">SKY VIEW (looking south) · ' + e.name + '</text>';
    side.innerHTML = hs;
    rT.set(clock(t)); rA.set(s.alt > 0 ? Math.round(s.alt) : 'down'); rL.set(s.alt > 0 ? K.fmt(s.len, 1) : '—'); rD.set(s.alt > 0 ? dirName(s.az + 180) : '—');
    M.set({ time: t, alt: Math.round(Math.max(0, s.alt)), len: s.alt > 0 ? K.round(s.len, 1) : 0, dir: s.alt > 0 ? dirName(s.az + 180) : 'none', up: s.alt > 0, season: sea });
  }
  M.set({ season: sea, marks: 0, seasonsTried: [sea] }); update();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.season) { sea = c.season; sS.set(sea); } if (c.time != null) { t = c.time; tS.set(t, true); } M.set('movedTime', true); update();
    for (var k in c) { var mm = k.match(/^mark_(\w+)_([\d.]+)$/); if (mm) { sea = mm[1]; t = +mm[2]; sS.set(sea); tS.set(t, true); update(); mk.click(); } var m2 = k.match(/^marks_(\w+)$/); if (m2) { sea = m2[1]; sS.set(sea); [8, 10, 12, 14, 16].forEach(function (x) { t = x; update(); mk.click(); }); } }
    if (c.marks) { [9, 12, 15].forEach(function (x) { t = x; update(); mk.click(); }); }
    if (c.seasonsTried) { M.set('seasonsTried', ['summer', 'equinox', 'winter']); } } };
};

/* ------------------------------------------------------------------ */
/* Earth Spinner: rotation makes day and night                          */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.spinEarth = function (M) {
  var K = M.kit, S = M.state;
  var hours = 6, playing = false, dirOK = true, spun = 0;
  var CITIES = M.cfg.cities || [{ id: 'indiana', name: 'Indiana', ahead: 0, col: '#e8590c' }, { id: 'tokyo', name: 'Tokyo', ahead: 14, col: '#7048e8' }, { id: 'london', name: 'London', ahead: 5, col: '#1971c2' }];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 360', class: 'sn-svg', role: 'img', 'aria-label': 'Earth seen from above the North Pole with sunlight from the left' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Time in Indiana', '', true), rDN = K.readout('Indiana has', ''), rH = K.readout('Hours spun', 'h'), rTk = K.readout('Time in Tokyo', '');
  [rT, rDN, rH, rTk].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Drag Earth to spin it, or use the buttons.</span></div>');
  var b1 = K.btn('⟲ Spin 1 hour', function () { step(1); }), b6 = K.btn('⟲ Spin 6 hours', function () { step(6); }), pl = K.btn('▶ Play a day', function () { playing = !playing; pl.textContent = playing ? '❚❚ Pause' : '▶ Play a day'; }, 'primary');
  var lbl = K.toggle('Show day/night labels', true, function () { draw(); });
  [b1, b6, pl, lbl.el].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function clock(hh) { hh = ((hh % 24) + 24) % 24; var h = Math.floor(hh), m = Math.round((hh - h) * 60); if (m === 60) { h = (h + 1) % 24; m = 0; } return (h % 12 || 12) + ':' + (m < 10 ? '0' : '') + m + (h >= 12 ? ' PM' : ' AM'); }
  function step(dh) { hours += dh; spun += Math.abs(dh); report(); draw(); }
  // Indiana's local time = hours; noon when Indiana faces the Sun (left).
  // Seen from above the North Pole, Earth spins counterclockwise. Noon points at the Sun (left, 180°).
  function angleOf(ahead) { return 180 - (hours + (ahead || 0) - 12) * 15; }
  function report() {
    var ind = ((hours % 24) + 24) % 24, day = ind >= 6 && ind < 18;
    var st = { hours: K.round(hours, 2), time: K.round(ind, 2), day: day, spun: K.round(spun, 1), tokyo: K.round((ind + 14) % 24, 2) };
    st.noon = Math.abs(ind - 12) < 0.26; st.midnight = ind < 0.26 || ind > 23.74; st.sunrise = Math.abs(ind - 6) < 0.26; st.sunset = Math.abs(ind - 18) < 0.26;
    if (st.noon) st.sawNoon = true; if (st.midnight) st.sawMidnight = true; if (st.sunrise) st.sawSunrise = true; if (st.sunset) st.sawSunset = true;
    if (spun >= 24) st.fullDay = true;
    M.set(st);
    rT.set(clock(ind)); rDN.set(day ? '☀ DAY' : '🌙 NIGHT'); rH.set(K.fmt(spun, 1)); rTk.set(clock(ind + 14));
  }
  function draw() {
    var cx = 400, cy = 180, R = 120;
    var h = '<rect width="640" height="360" fill="#0b1026"/>';
    for (var i = 0; i < 60; i++) { var r = K.rng('st' + i); h += '<circle cx="' + (r() * 640) + '" cy="' + (r() * 360) + '" r="' + (r() * 1.4 + .3) + '" fill="#fff" opacity=".7"/>'; }
    h += '<circle cx="-40" cy="180" r="120" fill="#ffd43b"/><circle cx="-40" cy="180" r="150" fill="#ffd43b" opacity=".15"/><text x="20" y="40" fill="#ffd43b" font-size="14" font-weight="800">SUNLIGHT →</text>';
    for (var y = 70; y <= 290; y += 44) h += '<line x1="90" y1="' + y + '" x2="' + (cx - R - 10) + '" y2="' + y + '" stroke="#ffe066" stroke-width="2" opacity=".5" marker-end=""/>';
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="#1c7ed6"/>';
    var rot = angleOf(0);
    h += '<g transform="rotate(' + (rot - 180) + ' ' + cx + ' ' + cy + ')"><path d="M' + (cx - 60) + ' ' + (cy - 70) + ' q40 -30 70 0 q20 30 -10 50 q-40 10 -60 -50 z" fill="#40c057"/><path d="M' + (cx + 30) + ' ' + (cy + 40) + ' q30 -10 50 10 q10 30 -20 40 q-30 -10 -30 -50 z" fill="#40c057"/><path d="M' + (cx - 20) + ' ' + (cy + 60) + ' q20 10 10 40 q-30 0 -10 -40 z" fill="#40c057"/></g>';
    h += '<path d="M' + cx + ' ' + (cy - R) + ' A' + R + ' ' + R + ' 0 0 1 ' + cx + ' ' + (cy + R) + ' Z" fill="#000" opacity=".55"/>';
    if (lbl.get()) h += '<text x="' + (cx - 60) + '" y="' + (cy - R - 10) + '" fill="#ffe066" font-size="14" font-weight="800" text-anchor="middle">DAY SIDE</text><text x="' + (cx + 60) + '" y="' + (cy - R - 10) + '" fill="#91a7ff" font-size="14" font-weight="800" text-anchor="middle">NIGHT SIDE</text>';
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#fff"/><text x="' + cx + '" y="' + (cy + 20) + '" fill="#fff" font-size="10" text-anchor="middle">North Pole</text>';
    h += '<path d="M' + (cx + R + 24) + ' ' + (cy + 40) + ' A' + (R + 24) + ' ' + (R + 24) + ' 0 0 0 ' + (cx + R + 24) + ' ' + (cy - 40) + '" fill="none" stroke="#adb5bd" stroke-width="3" marker-end="url(#arr)"/><defs><marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#adb5bd"/></marker></defs><text x="' + (cx + R + 30) + '" y="' + (cy + 70) + '" fill="#adb5bd" font-size="11">spins this way</text>';
    CITIES.forEach(function (c) {
      var a = (angleOf(c.ahead)) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, x2 = cx + Math.cos(a) * (R + 26), y2 = cy + Math.sin(a) * (R + 26);
      h += '<line x1="' + x + '" y1="' + y + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c.col + '" stroke-width="3"/><circle cx="' + x2 + '" cy="' + y2 + '" r="7" fill="' + c.col + '" stroke="#fff" stroke-width="2"/><text x="' + (cx + Math.cos(a) * (R + 46)) + '" y="' + (cy + Math.sin(a) * (R + 46) + 4) + '" fill="#fff" font-size="12" font-weight="800" text-anchor="middle">' + c.name + '</text>';
    });
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 6) + '" fill="transparent" class="se-grab"/>';
    svg.innerHTML = h;
  }
  // Drag to spin: angle of pointer around the center.
  svg.addEventListener('pointerdown', function (ev) {
    var pt = svg.createSVGPoint(); function ang(e) { pt.x = e.clientX; pt.y = e.clientY; var m = svg.getScreenCTM(); if (!m) return 0; var q = pt.matrixTransform(m.inverse()); return Math.atan2(q.y - 180, q.x - 400) * 180 / Math.PI; }
    var a0 = ang(ev), on = true; svg.setPointerCapture && svg.setPointerCapture(ev.pointerId);
    function mv(e) { if (!on) return; var a = ang(e), d = a - a0; if (d > 180) d -= 360; if (d < -180) d += 360; a0 = a; if (d > 0) { if (!S.wrongWay) M.set('wrongWay', true); } hours -= d / 15; spun += Math.abs(d / 15); report(); draw(); }
    function up() { on = false; svg.removeEventListener('pointermove', mv); svg.removeEventListener('pointerup', up); }
    svg.addEventListener('pointermove', mv); svg.addEventListener('pointerup', up);
  });
  M.loop(function (dt) { if (playing) { hours += dt * 3; spun += dt * 3; report(); draw(); } });
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.fullDay) { spun = 24; } if (c.sawNoon || c.noon) hours = 12; if (c.sawMidnight || c.midnight) hours = 24; if (c.sawSunrise || c.sunrise) hours = 30; if (c.sawSunset || c.sunset) hours = 42; if (c.sawNoon && c.sawMidnight) { hours = 12; report(); hours = 24; } report(); draw(); if (c.sawNoon) M.set('sawNoon', true); if (c.sawMidnight) M.set('sawMidnight', true); if (c.sawSunset) M.set('sawSunset', true); if (c.sawSunrise) M.set('sawSunrise', true); } };
};

/* ------------------------------------------------------------------ */
/* Orbit & Night Sky: Earth's orbit changes the stars we see            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.orbitSky = function (M) {
  var K = M.kit, S = M.state;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var CON = [{ id: 'orion', name: 'Orion', ang: 180, stars: [[0, -18], [10, -10], [-8, -8], [-4, 0], [0, 0], [4, 0], [-8, 12], [10, 14]], season: 'winter' }, { id: 'leo', name: 'Leo', ang: 270, stars: [[-14, 0], [-6, -8], [2, -10], [8, -4], [4, 4], [14, 8], [-4, 8]], season: 'spring' }, { id: 'scorpius', name: 'Scorpius', ang: 0, stars: [[-14, -12], [-8, -6], [-2, 0], [2, 6], [6, 12], [12, 12], [16, 6]], season: 'summer' }, { id: 'pegasus', name: 'Pegasus', ang: 90, stars: [[-10, -10], [10, -10], [10, 10], [-10, 10], [-18, -16], [18, 14]], season: 'fall' }];
  var month = 0; // 0 = January
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 420 420', class: 'sn-svg', role: 'img', 'aria-label': 'Earth orbiting the Sun with four constellations far away' });
  var sky = K.svgEl('svg', { viewBox: '0 0 260 260', class: 'sn-svg', role: 'img', 'aria-label': 'Midnight sky from Indiana' });
  var rc = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>'); rc.appendChild(sky);
  var reads = K.el('<div class="sn-reads"></div>'), rM = K.readout('Month', ''), rV = K.readout('Seen at midnight', '');
  reads.appendChild(rM.el); reads.appendChild(rV.el); rc.appendChild(reads);
  row.appendChild(svg); row.appendChild(rc); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mS = K.slider({ label: '📅 Month', min: 0, max: 11, step: 1, value: month, fmt: function (v) { return MONTHS[v]; }, onInput: function (v) { month = v; draw(); } });
  var lines = K.toggle('Show line of sight at midnight', true, function () { draw(); });
  ctr.appendChild(mS.el); ctr.appendChild(lines.el); M.el.appendChild(ctr);
  function earthAng() { return 180 + month * 30; } // Earth angle around the Sun (deg). Jan: Earth on left.
  function visible() { var ea = earthAng() % 360; var best = null, bd = 999; CON.forEach(function (c) { var d = Math.abs(((c.ang - ea + 540) % 360) - 180); if (d < bd) { bd = d; best = c; } }); return best; }
  function draw() {
    var h = '<rect width="420" height="420" fill="#0b1026"/>', cx = 210, cy = 210;
    CON.forEach(function (c) { var a = c.ang * Math.PI / 180, x = cx + Math.cos(a) * 180, y = cy + Math.sin(a) * 180; c.stars.forEach(function (s) { h += '<circle cx="' + (x + s[0] * 0.9) + '" cy="' + (y + s[1] * 0.9) + '" r="2.2" fill="#fff"/>'; }); h += '<text x="' + x + '" y="' + (y + (c.ang === 90 ? -24 : 30)) + '" fill="#bac8ff" font-size="12" text-anchor="middle" font-weight="700">' + c.name + '</text>'; });
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="115" fill="none" stroke="#495057" stroke-dasharray="4 5"/>';
    for (var m = 0; m < 12; m++) { var am = (180 + m * 30) * Math.PI / 180; h += '<text x="' + (cx + Math.cos(am) * 132) + '" y="' + (cy + Math.sin(am) * 132 + 4) + '" fill="#868e96" font-size="10" text-anchor="middle">' + MONTHS[m] + '</text>'; }
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="28" fill="#ffd43b"/><circle cx="' + cx + '" cy="' + cy + '" r="38" fill="#ffd43b" opacity=".2"/>';
    var a = earthAng() * Math.PI / 180, ex = cx + Math.cos(a) * 115, ey = cy + Math.sin(a) * 115;
    if (lines.get()) h += '<line x1="' + ex + '" y1="' + ey + '" x2="' + (cx + Math.cos(a) * 190) + '" y2="' + (cy + Math.sin(a) * 190) + '" stroke="#91a7ff" stroke-width="2" stroke-dasharray="5 4"/>';
    h += '<g class="os-earth" role="button" aria-label="Earth. Drag it around its orbit."><circle cx="' + ex + '" cy="' + ey + '" r="16" fill="#1c7ed6" stroke="#fff" stroke-width="2"/><path d="M' + ex + ' ' + (ey - 16) + ' A16 16 0 0 ' + (1) + ' ' + ex + ' ' + (ey + 16) + '" transform="rotate(' + (earthAng() - 180) + ' ' + ex + ' ' + ey + ')" fill="#000" opacity=".55"/><circle cx="' + ex + '" cy="' + ey + '" r="24" fill="transparent"/></g>';
    h += '<text x="10" y="410" fill="#adb5bd" font-size="11">Earth\'s night side faces away from the Sun.</text>';
    svg.innerHTML = h;
    var v = visible();
    var hs = '<rect width="260" height="260" fill="#10193a"/><text x="130" y="22" text-anchor="middle" fill="#fff" font-size="13" font-weight="800">Indiana · midnight · ' + MONTHS[month] + '</text>';
    v.stars.forEach(function (s) { hs += '<circle cx="' + (130 + s[0] * 4) + '" cy="' + (130 + s[1] * 4) + '" r="4" fill="#fff"/>'; });
    for (var i = 0; i < v.stars.length - 1; i++) hs += '<line x1="' + (130 + v.stars[i][0] * 4) + '" y1="' + (130 + v.stars[i][1] * 4) + '" x2="' + (130 + v.stars[i + 1][0] * 4) + '" y2="' + (130 + v.stars[i + 1][1] * 4) + '" stroke="#748ffc" stroke-width="1.5" opacity=".6"/>';
    hs += '<text x="130" y="232" text-anchor="middle" fill="#bac8ff" font-size="16" font-weight="800">' + v.name + '</text><rect y="240" width="260" height="20" fill="#1b2a1b"/>';
    sky.innerHTML = hs;
    rM.set(MONTHS[month]); rV.set(v.name);
    var st = { month: month, monthName: MONTHS[month], visible: v.id, visName: v.name }; st['saw_' + v.id] = true;
    var seen = (S.seenList || []).slice(); if (seen.indexOf(v.id) < 0) seen.push(v.id); st.seenList = seen; st.seenCount = seen.length;
    M.set(st);
    var g = svg.querySelector('.os-earth');
    K.drag(g, { svg: svg, pos: function () { return [ex, ey]; }, move: function (x, y) { var ang = Math.atan2(y - cy, x - cx) * 180 / Math.PI; var m2 = Math.round((((ang - 180) % 360) + 360) % 360 / 30) % 12; if (m2 !== month) { month = m2; mS.set(month, true); draw(); } } });
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.month != null) { month = c.month; } for (var k in c) { var mm = k.match(/^saw_(\w+)$/); if (mm) { var cc = CON.filter(function (x) { return x.id === mm[1]; })[0]; month = ((cc.ang - 180) / 30 + 12) % 12; draw(); } } if (c.seenCount) [0, 3, 6, 9].forEach(function (m) { month = m; draw(); }); mS.set(month, true); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Moon Phases: move the Moon around Earth; see it from Earth           */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.moonPhase = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var day = cfg.startDay || 0, CYC = 29.5;
  var NAMES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Third quarter', 'Waning crescent'];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 440 400', class: 'sn-svg', role: 'img', 'aria-label': 'Top view of the Moon orbiting Earth with sunlight from the left' });
  var view = K.svgEl('svg', { viewBox: '0 0 240 240', class: 'sn-svg', role: 'img', 'aria-label': 'The Moon as seen from Earth' });
  var rc = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>'); rc.appendChild(view);
  var reads = K.el('<div class="sn-reads"></div>'), rP = K.readout('Phase', ''), rD = K.readout('Days since new moon', ''), rL = K.readout('Lit side we see', '%');
  [rP, rD, rL].forEach(function (r) { reads.appendChild(r.el); }); rc.appendChild(reads);
  row.appendChild(svg); row.appendChild(rc); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"><span class="sn-note">Drag the Moon along its orbit, or step one day at a time.</span></div>');
  var b1 = K.btn('+1 day', function () { day = (day + 1) % CYC; draw(); }), b7 = K.btn('+7 days', function () { day = (day + 7.4) % CYC; draw(); }, 'primary');
  var half = K.toggle('Show the half the Sun lights', true, function () { draw(); });
  [b1, b7, half.el].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function elong() { return day / CYC * 360; } // 0 = new, 180 = full
  function phaseIdx() { return Math.round(elong() / 45) % 8; }
  function discPath(cx, cy, R, e) {
    e = ((e % 360) + 360) % 360; var rx = Math.abs(Math.cos(e * Math.PI / 180)) * R;
    if (e < 180) { var s = e < 90 ? 0 : 1; return 'M' + cx + ' ' + (cy - R) + ' A' + R + ' ' + R + ' 0 0 1 ' + cx + ' ' + (cy + R) + ' A' + rx + ' ' + R + ' 0 0 ' + s + ' ' + cx + ' ' + (cy - R) + ' Z'; }
    var s2 = e > 270 ? 1 : 0; return 'M' + cx + ' ' + (cy - R) + ' A' + R + ' ' + R + ' 0 0 0 ' + cx + ' ' + (cy + R) + ' A' + rx + ' ' + R + ' 0 0 ' + s2 + ' ' + cx + ' ' + (cy - R) + ' Z';
  }
  function draw() {
    var cx = 250, cy = 200, R = 140, e = elong(), th = (180 - e) * Math.PI / 180, mx = cx + Math.cos(th) * R, my = cy + Math.sin(th) * R;
    var h = '<rect width="440" height="400" fill="#0b1026"/><text x="10" y="22" fill="#ffd43b" font-size="13" font-weight="800">SUNLIGHT →</text>';
    for (var y = 50; y <= 360; y += 40) h += '<line x1="10" y1="' + y + '" x2="70" y2="' + y + '" stroke="#ffe066" stroke-width="2" opacity=".6"/>';
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#495057" stroke-dasharray="4 5"/>';
    for (var k = 0; k < 8; k++) { var ta = (180 - k * 45) * Math.PI / 180; h += '<circle cx="' + (cx + Math.cos(ta) * R) + '" cy="' + (cy + Math.sin(ta) * R) + '" r="3" fill="#495057"/>'; }
    h += '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="#1c7ed6"/><path d="M' + cx + ' ' + (cy - 34) + ' A34 34 0 0 1 ' + cx + ' ' + (cy + 34) + ' Z" fill="#000" opacity=".5"/><text x="' + cx + '" y="' + (cy + 52) + '" fill="#fff" font-size="11" text-anchor="middle">Earth</text>';
    h += '<g class="mp-moon" role="button" aria-label="Moon. Drag it around Earth."><circle cx="' + mx + '" cy="' + my + '" r="18" fill="#343a40"/>' + (half.get() ? '<path d="M' + mx + ' ' + (my - 18) + ' A18 18 0 0 0 ' + mx + ' ' + (my + 18) + ' Z" fill="#f1f3f5"/>' : '') + '<circle cx="' + mx + '" cy="' + my + '" r="28" fill="transparent"/></g>';
    h += '<line x1="' + cx + '" y1="' + cy + '" x2="' + mx + '" y2="' + my + '" stroke="#91a7ff" stroke-width="1.5" stroke-dasharray="3 4"/>';
    svg.innerHTML = h;
    var v = '<rect width="240" height="240" fill="#10193a"/><text x="120" y="22" text-anchor="middle" fill="#fff" font-size="13" font-weight="800">View from Earth</text><circle cx="120" cy="125" r="70" fill="#2b2f3a"/>';
    if (e > 3 && e < 357) v += '<path d="' + discPath(120, 125, 70, e) + '" fill="#f1f3f5"/>';
    var lit = Math.round((1 - Math.cos(e * Math.PI / 180)) / 2 * 100);
    v += '<text x="120" y="222" text-anchor="middle" fill="#bac8ff" font-size="15" font-weight="800">' + NAMES[phaseIdx()] + '</text>';
    view.innerHTML = v;
    rP.set(NAMES[phaseIdx()]); rD.set(K.fmt(day, 1)); rL.set(lit);
    var st = { day: K.round(day, 1), phase: NAMES[phaseIdx()], phaseIdx: phaseIdx(), lit: lit }; st['saw_' + phaseIdx()] = true;
    var seen = (S.seenPhases || []).slice(); if (seen.indexOf(phaseIdx()) < 0) seen.push(phaseIdx()); st.seenPhases = seen; st.phasesSeen = seen.length;
    M.set(st);
    K.drag(svg.querySelector('.mp-moon'), { svg: svg, pos: function () { return [mx, my]; }, move: function (x, y) { var a = Math.atan2(y - cy, x - cx) * 180 / Math.PI; var ee = ((180 - a) % 360 + 360) % 360; var nd = ee / 360 * CYC; var n = Math.round(nd / (CYC / 8)); if (Math.abs(nd - n * CYC / 8) < 0.6) nd = n * CYC / 8; day = nd % CYC; draw(); } });
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^saw_(\d)$/); if (mm) { day = +mm[1] * CYC / 8; draw(); } } if (c.phaseIdx != null) { day = (c.phaseIdx.eq != null ? c.phaseIdx.eq : c.phaseIdx) * CYC / 8; draw(); } if (c.phasesSeen) for (var i = 0; i < 8; i++) { day = i * CYC / 8; draw(); } draw(); } };
};

/* ------------------------------------------------------------------ */
/* Solar System to Scale: distances, sizes, and trips                   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.solarScale = function (M) {
  var K = M.kit, S = M.state;
  var P = [['Mercury', 0.39, 0.38, '#adb5bd', 'rocky', 88, '176 Earth days'], ['Venus', 0.72, 0.95, '#f4d58d', 'rocky', 225, '243 Earth days'], ['Earth', 1, 1, '#1c7ed6', 'rocky', 365, '24 hours'], ['Mars', 1.52, 0.53, '#e8590c', 'rocky', 687, '24.6 hours'], ['Jupiter', 5.2, 11.2, '#d9a066', 'gas giant', 4333, '10 hours'], ['Saturn', 9.5, 9.45, '#e9c46a', 'gas giant', 10759, '10.7 hours'], ['Uranus', 19.2, 4.0, '#66d9e8', 'ice giant', 30687, '17 hours'], ['Neptune', 30.1, 3.88, '#4263eb', 'ice giant', 60190, '16 hours']];
  var mode = 'distance', pick = 'Earth', zoom = false, dest = 'Mars', speed = 17;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 720 300', class: 'sn-svg', role: 'img', 'aria-label': 'Solar system scale model' });
  M.el.appendChild(svg);
  var card = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(card);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mS = K.seg([['distance', '📏 Distance map'], ['size', '⚪ Size lineup'], ['trip', '🚀 Trip planner']], mode, function (v) { mode = v; M.set('mode', v); M.set('modes', uniq((S.modes || []).concat([v]))); draw(); });
  var zT = K.toggle('Zoom in on the inner planets', false, function (b) { zoom = b; M.set('zoomed', b ? true : S.zoomed); draw(); });
  var sp = K.slider({ label: '🚀 Spacecraft speed', min: 10, max: 60, step: 1, value: speed, unit: 'km/s', onInput: function (v) { speed = v; M.set('speed', v); draw(); } });
  ctr.appendChild(mS.el); ctr.appendChild(zT.el); ctr.appendChild(sp.el); M.el.appendChild(ctr);
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function info(n) { return P.filter(function (p) { return p[0] === n; })[0]; }
  function years(au) { return au * 149.6e6 / (speed * 3.156e7); }
  function draw() {
    var h = '<rect width="720" height="300" fill="#0b1026"/>';
    if (mode === 'distance') {
      var max = zoom ? 2 : 31, x0 = 40, x1 = 700, sc = (x1 - x0) / max;
      h += '<circle cx="' + x0 + '" cy="150" r="22" fill="#ffd43b"/><text x="' + x0 + '" y="190" fill="#ffd43b" font-size="11" text-anchor="middle">Sun</text><line x1="' + x0 + '" y1="150" x2="' + x1 + '" y2="150" stroke="#495057"/>';
      for (var a = 0; a <= max; a += zoom ? 0.5 : 5) h += '<line x1="' + (x0 + a * sc) + '" x2="' + (x0 + a * sc) + '" y1="235" y2="245" stroke="#868e96"/><text x="' + (x0 + a * sc) + '" y="260" fill="#868e96" font-size="11" text-anchor="middle">' + a + '</text>';
      h += '<text x="370" y="285" fill="#adb5bd" font-size="12" text-anchor="middle">Distance from the Sun (AU). 1 AU = Earth\'s distance = 150 million km</text>';
      if (!zoom) h += '<text x="' + (x0 + 1 * sc) + '" y="98" fill="#ffe066" font-size="12" text-anchor="middle" font-weight="700">Inner planets</text><text x="' + (x0 + 1 * sc) + '" y="112" fill="#adb5bd" font-size="10" text-anchor="middle">(zoom in to see them)</text>';
      P.forEach(function (p, i) { if (p[1] > max) return; var x = x0 + p[1] * sc, y = 150 + (i % 2 ? 34 : -34), lab = zoom || p[1] > 2; h += '<g class="ss-p" data-p="' + p[0] + '" role="button" tabindex="0"><line x1="' + x + '" y1="150" x2="' + x + '" y2="' + y + '" stroke="' + (lab ? '#495057' : 'none') + '"/><circle cx="' + x + '" cy="150" r="' + (p[0] === pick ? 7 : 5) + '" fill="' + p[3] + '" stroke="' + (p[0] === pick ? '#fff' : 'none') + '" stroke-width="2"/><text x="' + x + '" y="' + (y + (i % 2 ? 14 : -4)) + '" fill="#fff" font-size="12" text-anchor="middle" font-weight="700">' + p[0] + '</text><circle cx="' + x + '" cy="150" r="16" fill="transparent"/></g>'; });
    } else if (mode === 'size') {
      h += '<circle cx="-2150" cy="150" r="2200" fill="#ffd43b"/><text x="20" y="30" fill="#0b1026" font-size="12" font-weight="800">edge of the Sun (109× Earth)</text>';
      var x = 90; P.forEach(function (p) { var r = p[2] * 5; x += r + 8; h += '<g class="ss-p" data-p="' + p[0] + '" role="button" tabindex="0"><circle cx="' + x + '" cy="150" r="' + r + '" fill="' + p[3] + '" stroke="' + (p[0] === pick ? '#fff' : 'none') + '" stroke-width="2"/><text x="' + x + '" y="' + (150 + Math.max(r, 8) + 16) + '" fill="#fff" font-size="11" text-anchor="middle">' + p[0] + '</text><circle cx="' + x + '" cy="150" r="' + Math.max(r, 12) + '" fill="transparent"/></g>'; x += r + 6; });
      h += '<text x="360" y="285" fill="#adb5bd" font-size="12" text-anchor="middle">Sizes to scale (distances not to scale). Earth is ' + 10 + ' px wide.</text>';
    } else {
      var d = info(dest), yrs = years(d[1] - 1 < 0 ? 1 - d[1] : d[1] - 1);
      h += '<text x="20" y="30" fill="#fff" font-size="14" font-weight="800">Trip from Earth to ' + dest + ' (straight line, planets lined up)</text>';
      var sc2 = 640 / 30; h += '<line x1="40" y1="160" x2="680" y2="160" stroke="#495057"/>';
      P.forEach(function (p) { var xx = 40 + p[1] * sc2; h += '<g class="ss-p" data-p="' + p[0] + '" role="button" tabindex="0"><circle cx="' + xx + '" cy="160" r="' + (p[0] === dest ? 8 : 5) + '" fill="' + p[3] + '"/><text x="' + xx + '" y="' + (p[1] < 2 ? 190 + P.indexOf(p) * 12 : 185) + '" fill="#fff" font-size="10" text-anchor="middle">' + p[0] + '</text><circle cx="' + xx + '" cy="160" r="14" fill="transparent"/></g>'; });
      h += '<text x="360" y="90" fill="#ffd43b" font-size="26" font-weight="800" text-anchor="middle">' + (yrs < 1 ? Math.round(yrs * 365) + ' days' : K.fmt(yrs, 1) + ' years') + '</text><text x="360" y="115" fill="#adb5bd" font-size="12" text-anchor="middle">at ' + speed + ' km/s (Voyager 1 flies about 17 km/s)</text>';
      M.set({ dest: dest, tripYears: K.round(yrs, 1), tripDays: Math.round(yrs * 365) });
    }
    svg.innerHTML = h;
    svg.querySelectorAll('.ss-p').forEach(function (g) { function go() { var n = g.getAttribute('data-p'); if (mode === 'trip') { dest = n; } pick = n; var st = { pick: n }; st['info_' + n] = true; var seen = (S.infoSeen || []).slice(); if (seen.indexOf(n) < 0) seen.push(n); st.infoSeen = seen; st.infoCount = seen.length; M.set(st); draw(); } g.addEventListener('click', go); g.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); }); });
    var p = info(pick);
    card.innerHTML = '<h3>' + p[0] + '</h3><div class="sn-reads"><div class="sn-read"><span class="sn-read-l">Distance from Sun</span><b class="sn-read-v">' + p[1] + '</b><span class="sn-read-u">AU</span></div><div class="sn-read"><span class="sn-read-l">Width (Earth = 1)</span><b class="sn-read-v">' + p[2] + '</b><span class="sn-read-u">×</span></div><div class="sn-read"><span class="sn-read-l">Type</span><b class="sn-read-v" style="font-size:1em">' + p[4] + '</b></div><div class="sn-read"><span class="sn-read-l">1 year</span><b class="sn-read-v">' + p[5].toLocaleString() + '</b><span class="sn-read-u">days</span></div><div class="sn-read"><span class="sn-read-l">1 day (spin)</span><b class="sn-read-v" style="font-size:1em">' + p[6] + '</b></div></div>';
  }
  M.set({ mode: mode, modes: [mode], speed: speed }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.mode) { mode = c.mode; mS.set(mode); M.set('mode', mode); } if (c.modes) M.set('modes', ['distance', 'size', 'trip']); if (c.zoomed) { zoom = true; zT.set(true); M.set('zoomed', true); } if (c.dest) { mode = 'trip'; dest = c.dest; } if (c.speed) { speed = c.speed.eq || c.speed; sp.set(speed, true); M.set('speed', speed); } for (var k in c) { var mm = k.match(/^info_(\w+)$/); if (mm) { pick = mm[1]; var s2 = {}; s2[k] = true; M.set(s2); } } if (c.infoCount) M.set('infoCount', 8); if (c.pick) { pick = c.pick; M.set('pick', pick); } draw(); } };
};

/* ------------------------------------------------------------------ */
/* Star Brightness: distance makes lights look dimmer                  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.starBright = function (M) {
  var K = M.kit, S = M.state;
  var dB = 1, pB = 1, mode = 'lab';
  var STARS = [['Sun', 1, 0.0000158, '#ffd43b'], ['Sirius', 25, 8.6, '#d0ebff'], ['Proxima Centauri', 0.0017, 4.2, '#ff8787'], ['Rigel', 120000, 860, '#a5d8ff'], ['Vega', 40, 25, '#e7f5ff']];
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 700 300', class: 'sn-svg', role: 'img', 'aria-label': 'Two lamps and two light meters on a dark lab bench' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rA = K.readout('Meter A (lamp A at 1 m)', 'units', true), rB = K.readout('Meter B', 'units', true);
  reads.appendChild(rA.el); reads.appendChild(rB.el); M.el.appendChild(reads);
  var tbl = K.el('<div class="sn-panel" hidden></div>'); M.el.appendChild(tbl);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mS = K.seg([['lab', '💡 Lamp lab'], ['sky', '✨ Real stars']], mode, function (v) { mode = v; M.set('mode', v); draw(); });
  var dS = K.slider({ label: '↔ Lamp B distance', min: 1, max: 4, step: 0.5, value: dB, unit: 'm', onInput: function (v) { dB = v; draw(); } });
  var pS = K.seg([['1', 'Lamp B: normal'], ['4', 'Lamp B: 4× stronger'], ['9', 'Lamp B: 9× stronger']], '1', function (v) { pB = +v; draw(); });
  ctr.appendChild(mS.el); ctr.appendChild(dS.el); ctr.appendChild(pS.el); M.el.appendChild(ctr);
  function meter(power, d) { return Math.round(100 * power / (d * d) * 10) / 10; }
  function draw() {
    var lab = mode === 'lab'; dS.el.hidden = !lab; pS.el.hidden = !lab; tbl.hidden = lab; reads.hidden = !lab;
    var h = '<rect width="700" height="300" fill="#141a2a"/>';
    if (lab) {
      h += '<rect y="250" width="700" height="50" fill="#3b2f2f"/>';
      function lamp(x, y, p, label) { var g = 10 + 10 * Math.sqrt(p); return '<circle cx="' + x + '" cy="' + y + '" r="' + (g * 2.6) + '" fill="#ffe066" opacity=".12"/><circle cx="' + x + '" cy="' + y + '" r="' + g + '" fill="#fff3bf"/><rect x="' + (x - 8) + '" y="' + (y + g - 2) + '" width="16" height="' + (250 - y - g) + '" fill="#868e96"/><text x="' + x + '" y="' + (y - g * 2.6 - 4) + '" fill="#fff" font-size="12" text-anchor="middle" font-weight="800">' + label + '</text>'; }
      var mx = 60, sc = 150;
      h += '<rect x="' + (mx - 20) + '" y="60" width="40" height="190" rx="6" fill="#343a40"/><text x="' + mx + '" y="54" fill="#fff" font-size="12" text-anchor="middle">meters</text>';
      h += '<rect x="' + (mx - 14) + '" y="80" width="28" height="18" rx="3" fill="#111a22"/><text x="' + mx + '" y="93" fill="#7cf5c4" font-size="10" text-anchor="middle">A</text><rect x="' + (mx - 14) + '" y="190" width="28" height="18" rx="3" fill="#111a22"/><text x="' + mx + '" y="203" fill="#7cf5c4" font-size="10" text-anchor="middle">B</text>';
      h += lamp(mx + sc * 1, 90, 1, 'Lamp A · 1 m') + lamp(mx + sc * dB, 200, pB, 'Lamp B · ' + dB + ' m');
      for (var m = 0; m <= 4; m++) h += '<text x="' + (mx + sc * m) + '" y="280" fill="#adb5bd" font-size="11" text-anchor="middle">' + m + ' m</text>';
      var a = meter(1, 1), b = meter(pB, dB); rA.set(a); rB.set(b);
      var st = { dB: dB, pB: pB, meterA: a, meterB: b, equal: Math.abs(a - b) < 0.05 }; st['m_' + pB + '_' + dB] = b; if (st.equal && pB > 1) st.equalFar = true; M.set(st);
    } else {
      var sel = S.starPick || 'Sirius';
      h += STARS.map(function (s, i) { var x = 80 + i * 135, app = Math.log10(s[1] / (s[2] * s[2]) * 1e-6 + 1e-12); return '<g class="sb-s" data-s="' + s[0] + '" role="button" tabindex="0"><circle cx="' + x + '" cy="130" r="' + (s[0] === 'Sun' ? 36 : Math.max(3, 6 + app * 1.5)) + '" fill="' + s[3] + '"/><text x="' + x + '" y="200" fill="#fff" font-size="12" text-anchor="middle" font-weight="' + (s[0] === sel ? 800 : 400) + '">' + s[0] + '</text><circle cx="' + x + '" cy="130" r="40" fill="transparent"/></g>'; }).join('');
      h += '<text x="350" y="260" fill="#adb5bd" font-size="12" text-anchor="middle">How bright each star LOOKS from Earth (tap a star)</text>';
      tbl.innerHTML = '<h3>Star data</h3><div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>Star</th><th>Real brightness (Sun = 1)</th><th>Distance (light-years)</th></tr></thead><tbody>' + STARS.map(function (s) { return '<tr><th>' + s[0] + '</th><td>' + s[1].toLocaleString() + '</td><td>' + (s[0] === 'Sun' ? '0.0000158 (8 light-minutes)' : s[2]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    }
    svg.innerHTML = h;
    svg.querySelectorAll('.sb-s').forEach(function (g) { g.addEventListener('click', function () { M.set('starPick', g.getAttribute('data-s')); var o = {}; o['star_' + g.getAttribute('data-s').split(' ')[0]] = true; M.set(o); draw(); }); });
  }
  M.set({ mode: mode }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.mode) { mode = c.mode; mS.set(mode); } if (c.dB) { dB = c.dB.eq || c.dB; dS.set(dB, true); } if (c.pB) { pB = c.pB.eq || c.pB; pS.set(String(pB)); } if (c.equalFar) { pB = 4; dB = 2; pS.set('4'); dS.set(2, true); } for (var k in c) { var mm = k.match(/^m_(\d+)_([\d.]+)$/); if (mm) { pB = +mm[1]; dB = +mm[2]; draw(); } } draw(); for (var k2 in c) if (/^star_/.test(k2)) { var o = {}; o[k2] = true; M.set(o); } } };
};

/* ------------------------------------------------------------------ */
/* Food Web Builder: draw energy arrows, label roles                   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.foodWeb = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var ORG = cfg.organisms || [
    { id: 'sun', name: 'Sun', icon: '☀️', x: 60, y: 60, role: 'energy' }, { id: 'grass', name: 'Grass', icon: '🌾', x: 150, y: 290, role: 'producer' }, { id: 'clover', name: 'Clover', icon: '🍀', x: 300, y: 300, role: 'producer' },
    { id: 'grasshopper', name: 'Grasshopper', icon: '🦗', x: 120, y: 190, role: 'consumer' }, { id: 'rabbit', name: 'Rabbit', icon: '🐇', x: 300, y: 200, role: 'consumer' }, { id: 'mouse', name: 'Mouse', icon: '🐁', x: 450, y: 240, role: 'consumer' },
    { id: 'frog', name: 'Frog', icon: '🐸', x: 120, y: 100, role: 'consumer' }, { id: 'snake', name: 'Snake', icon: '🐍', x: 380, y: 110, role: 'consumer' }, { id: 'fox', name: 'Fox', icon: '🦊', x: 250, y: 90, role: 'consumer' }, { id: 'hawk', name: 'Hawk', icon: '🦅', x: 480, y: 50, role: 'consumer' },
    { id: 'mushroom', name: 'Mushroom', icon: '🍄', x: 520, y: 320, role: 'decomposer' }
  ];
  var OK = cfg.links || ['sun>grass', 'sun>clover', 'grass>grasshopper', 'grass>rabbit', 'clover>rabbit', 'grass>mouse', 'clover>mouse', 'grasshopper>frog', 'grasshopper>mouse', 'frog>snake', 'mouse>snake', 'rabbit>fox', 'mouse>fox', 'mouse>hawk', 'snake>hawk', 'rabbit>hawk', 'frog>hawk', 'grass>mushroom', 'rabbit>mushroom', 'fox>mushroom', 'hawk>mushroom', 'clover>mushroom', 'mouse>mushroom', 'snake>mushroom', 'frog>mushroom', 'grasshopper>mushroom'];
  var arrows = [], from = null, roles = {}, mode = 'arrow', roleSel = 'producer';
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 600 380', class: 'sn-svg', role: 'img', 'aria-label': 'Meadow food web board' });
  M.el.appendChild(svg);
  var msg = K.el('<div class="sn-panel" aria-live="polite"><b>Draw arrows:</b> tap the organism that is EATEN, then tap the one that EATS it. Arrows show where energy goes.</div>'); M.el.appendChild(msg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var mS = K.seg([['arrow', '➜ Draw energy arrows'], ['role', '🏷 Label roles']], mode, function (v) { mode = v; from = null; draw(); msg.innerHTML = v === 'arrow' ? '<b>Draw arrows:</b> tap the organism that is EATEN, then tap the one that EATS it.' : '<b>Label roles:</b> pick a role, then tap organisms.'; });
  var rS = K.seg([['producer', '🌱 Producer'], ['consumer', '🍽 Consumer'], ['decomposer', '🍄 Decomposer']], roleSel, function (v) { roleSel = v; });
  var undo = K.btn('↶ Undo arrow', function () { arrows.pop(); report(); draw(); }, 'ghost sm');
  ctr.appendChild(mS.el); ctr.appendChild(rS.el); ctr.appendChild(undo); M.el.appendChild(ctr);
  function org(id) { return ORG.filter(function (o) { return o.id === id; })[0]; }
  function report() {
    var st = { arrows: arrows.length, good: arrows.filter(function (a) { return OK.indexOf(a) >= 0; }).length };
    arrows.forEach(function (a) { st['a_' + a.replace('>', '_')] = true; });
    st.rolesRight = ORG.filter(function (o) { return o.role !== 'energy' && roles[o.id] === o.role; }).length; st.rolesTotal = ORG.filter(function (o) { return o.role !== 'energy'; }).length;
    st.chainToHawk = pathLen('sun', 'hawk'); M.set(st);
  }
  function pathLen(a, b) { var best = 0; (function dfs(n, d, seen) { if (n === b) { best = Math.max(best, d); return; } arrows.forEach(function (ar) { var p = ar.split('>'); if (p[0] === n && seen.indexOf(p[1]) < 0) dfs(p[1], d + 1, seen.concat([p[1]])); }); })(a, 0, [a]); return best; }
  function tap(id) {
    if (mode === 'role') { var o = org(id); if (o.role === 'energy') { M.toast('The Sun is not a living thing. It is the energy source.'); return; } roles[id] = roleSel; if (roleSel !== o.role) M.toast(o.name + ' as a ' + roleSel + '? Check how it gets its energy.', true); report(); draw(); return; }
    if (!from) { from = id; draw(); return; }
    if (from === id) { from = null; draw(); return; }
    var key = from + '>' + id, rev = id + '>' + from;
    if (arrows.indexOf(key) >= 0) { M.toast('That arrow is already there.'); }
    else if (OK.indexOf(key) >= 0) { arrows.push(key); M.toast('✓ Energy flows from ' + org(from).name + ' to ' + org(id).name + '.'); }
    else if (OK.indexOf(rev) >= 0) { M.toast('Backwards! Arrows point from the food TO the eater.', true); M.set('backwards', (S.backwards || 0) + 1); }
    else { M.toast('In this meadow, the ' + org(id).name.toLowerCase() + ' does not eat the ' + org(from).name.toLowerCase() + '.', true); }
    from = null; report(); draw();
  }
  function draw() {
    var h = '<defs><marker id="fwA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#c92a2a"/></marker><linearGradient id="fwBg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d0ebff"/><stop offset=".45" stop-color="#e6fcf5"/><stop offset=".46" stop-color="#b2f2bb"/><stop offset="1" stop-color="#8ce99a"/></linearGradient></defs><rect width="600" height="380" fill="url(#fwBg)"/>';
    arrows.forEach(function (a) { var p = a.split('>'), A = org(p[0]), B = org(p[1]), dx = B.x - A.x, dy = B.y - A.y, L = Math.sqrt(dx * dx + dy * dy); h += '<line x1="' + (A.x + dx / L * 28) + '" y1="' + (A.y + dy / L * 28) + '" x2="' + (B.x - dx / L * 30) + '" y2="' + (B.y - dy / L * 30) + '" stroke="#c92a2a" stroke-width="3" marker-end="url(#fwA)" opacity=".85"/>'; });
    ORG.forEach(function (o) {
      var r = roles[o.id], col = r ? (r === o.role ? '#2b8a3e' : '#c92a2a') : '#495057';
      h += '<g class="fw-o" data-o="' + o.id + '" role="button" tabindex="0" aria-label="' + o.name + '"><circle cx="' + o.x + '" cy="' + o.y + '" r="26" fill="#fff" stroke="' + (from === o.id ? '#f08c00' : col) + '" stroke-width="' + (from === o.id ? 5 : 2.5) + '"/><text x="' + o.x + '" y="' + (o.y + 9) + '" font-size="24" text-anchor="middle">' + o.icon + '</text><text x="' + o.x + '" y="' + (o.y + 42) + '" font-size="11" text-anchor="middle" font-weight="800" fill="#1d2433">' + o.name + '</text>' + (r ? '<text x="' + o.x + '" y="' + (o.y - 31) + '" font-size="10" text-anchor="middle" fill="' + col + '" font-weight="800">' + r.toUpperCase() + '</text>' : '') + '</g>';
    });
    svg.innerHTML = h;
    svg.querySelectorAll('.fw-o').forEach(function (g) { g.addEventListener('click', function () { tap(g.getAttribute('data-o')); }); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(g.getAttribute('data-o')); } }); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^a_(\w+)_(\w+)$/); if (mm && arrows.indexOf(mm[1] + '>' + mm[2]) < 0) arrows.push(mm[1] + '>' + mm[2]); } if (c.good) OK.slice(0, (c.good.gte || c.good)).forEach(function (a) { if (arrows.indexOf(a) < 0) arrows.push(a); }); if (c.chainToHawk) ['sun>grass', 'grass>grasshopper', 'grasshopper>frog', 'frog>snake', 'snake>hawk'].forEach(function (a) { if (arrows.indexOf(a) < 0) arrows.push(a); }); if (c.rolesRight) ORG.forEach(function (o) { if (o.role !== 'energy') roles[o.id] = o.role; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Meadow Populations: grass, rabbits, foxes over time                  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.ecoPop = function (M) {
  var K = M.kit, S = M.state;
  var P = { a: 0.6, b: 0.3, d: 0.075, h: 0.6, e: 0.4, f: 0.15 };
  var s, month, hist, foxes = true, drought = false, running = false, acc = 0, events = [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 360 260', class: 'sn-svg', role: 'img', 'aria-label': 'Meadow with grass, rabbits, and foxes' });
  var g = K.graph({ title: 'Populations over time', xLabel: 'Months', yLabel: 'Number', xMax: 48, yMax: 400, grow: true, series: [{ name: 'Grass ÷ 5', color: '#2f9e44' }, { name: 'Rabbits', color: '#868e96' }, { name: 'Foxes × 5', color: '#e8590c' }] });
  row.appendChild(svg); row.appendChild(g.el); M.el.appendChild(row);
  var reads = K.el('<div class="sn-reads"></div>'), rM = K.readout('Month', ''), rG = K.readout('Grass patches', ''), rR = K.readout('Rabbits', ''), rF = K.readout('Foxes', '');
  [rM, rG, rR, rF].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var play = K.btn('▶ Run time', function () { running = !running; play.textContent = running ? '❚❚ Pause' : '▶ Run time'; M.set('ran', true); }, 'primary');
  var rmF = K.btn('🦊 Remove all foxes', function () { if (!foxes) return; foxes = false; s.F = 0; events.push('No foxes (month ' + month + ')'); M.set({ foxesRemoved: true, removedAt: month, rabbitsAtRemove: Math.round(s.R) }); draw(); });
  var addF = K.btn('🦊 +10 foxes', function () { foxes = true; s.F += 10; events.push('+10 foxes (month ' + month + ')'); M.set({ foxesAdded: true, addedAt: month, rabbitsAtAdd: Math.round(s.R) }); draw(); });
  var dr = K.btn('☀️ Start a drought', function () { drought = !drought; dr.textContent = drought ? '🌧 End the drought' : '☀️ Start a drought'; events.push((drought ? 'Drought starts' : 'Drought ends') + ' (month ' + month + ')'); M.set(drought ? { drought: true, droughtAt: month, rabbitsAtDrought: Math.round(s.R), foxesAtDrought: Math.round(s.F) } : { drought: false }); });
  var rs = K.btn('↺ New meadow', function () { reset(); }, 'ghost');
  [play, rmF, addF, dr, rs].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function reset() { s = { G: 700, R: 60, F: 10 }; month = 0; hist = []; foxes = true; drought = false; running = false; events = []; play.textContent = '▶ Run time'; dr.textContent = '☀️ Start a drought'; g.clear(); g.range(48, 400); M.set({ month: 0, foxesRemoved: false, foxesAdded: false, drought: false, peakRabbits: 0, grassLow: 700 }); draw(); }
  function step() {
    var Kc = 1000 * (drought ? 0.45 : 1), eatG = P.a * s.R * s.G / (s.G + 300), eatR = foxes ? P.h * s.F * s.R / (s.R + 40) : 0;
    s = { G: Math.max(5, s.G + 0.35 * s.G * (1 - s.G / Kc) - eatG), R: Math.max(0, s.R + P.b * eatG - P.d * s.R - eatR), F: foxes ? Math.max(0, s.F + P.e * eatR - P.f * s.F) : 0 };
    month++;
    g.add(0, month, s.G / 5); g.add(1, month, s.R); g.add(2, month, s.F * 5);
    var st = { month: month, grass: Math.round(s.G), rabbits: Math.round(s.R), foxes: Math.round(s.F) };
    st.peakRabbits = Math.max(S.peakRabbits || 0, st.rabbits); st.grassLow = Math.min(S.grassLow == null ? 9999 : S.grassLow, st.grass);
    if (S.foxesRemoved) { st.sinceRemove = month - S.removedAt; st.peakAfterRemove = Math.max(S.peakAfterRemove || 0, st.rabbits); }
    if (S.drought) st.sinceDrought = month - S.droughtAt;
    if (S.foxesAdded) st.sinceAdd = month - S.addedAt;
    M.set(st);
  }
  function draw() {
    var h = '<rect width="360" height="260" fill="#b2f2bb"/><rect width="360" height="70" fill="#d0ebff"/>' + (drought ? '<rect width="360" height="260" fill="#ffd8a8" opacity=".45"/><circle cx="320" cy="30" r="20" fill="#ffd43b"/>' : '<circle cx="320" cy="30" r="16" fill="#ffe066"/>');
    var r = K.rng('meadow'), gN = Math.round(s.G / 40), rN = Math.round(s.R / 10), fN = Math.round(s.F / 2);
    for (var i = 0; i < gN; i++) h += '<text x="' + (10 + r() * 330) + '" y="' + (90 + r() * 160) + '" font-size="16">🌾</text>';
    for (var j = 0; j < rN; j++) h += '<text x="' + (10 + r() * 330) + '" y="' + (100 + r() * 150) + '" font-size="18">🐇</text>';
    for (var k = 0; k < fN; k++) h += '<text x="' + (10 + r() * 330) + '" y="' + (100 + r() * 150) + '" font-size="20">🦊</text>';
    h += '<rect x="0" y="238" width="360" height="22" fill="#fff" opacity=".8"/><text x="8" y="253" font-size="11" fill="#1d2433" font-weight="700">Key: 🌾 = 40 grass patches · 🐇 = 10 rabbits · 🦊 = 2 foxes</text>';
    svg.innerHTML = h;
    rM.set(month); rG.set(Math.round(s.G)); rR.set(Math.round(s.R)); rF.set(Math.round(s.F));
  }
  M.loop(function (dt) { if (!running) return; acc += dt; if (acc > 0.25) { acc = 0; step(); draw(); if (month >= 120) { running = false; play.textContent = '▶ Run time'; } } });
  reset();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.foxesRemoved) rmF.click(); if (c.drought) dr.click(); if (c.foxesAdded) addF.click(); var n = 0; var need = Math.max(c.month && c.month.gte || 0, c.sinceRemove && c.sinceRemove.gte || 0, c.sinceDrought && c.sinceDrought.gte || 0, c.sinceAdd && c.sinceAdd.gte || 0, 1); while (n++ < need + 1) step(); M.set('ran', true); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Decomposer Lab: two sealed garden boxes, with and without decomposers */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.decompLab = function (M) {
  var K = M.kit, S = M.state;
  var weeks = 0, dec = { worms: true, fungi: true, bacteria: true }, A = { leaf: 100, soil: 20 }, B = { leaf: 100, soil: 20 }, planted = false, plantA = 0, plantB = 0, running = false, acc = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 300', class: 'sn-svg', role: 'img', 'aria-label': 'Two garden boxes with fallen leaves' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rW = K.readout('Weeks', ''), rA = K.readout('Box A leaves left', '%'), rB = K.readout('Box B leaves left', '%'), rN = K.readout('Box A soil nutrients', '');
  [rW, rA, rB, rN].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"><b class="sn-note">Box A decomposers:</b></div>');
  var tw = K.toggle('🪱 Worms', true, function (b) { dec.worms = b; M.set('decA', count()); }), tf = K.toggle('🍄 Fungi', true, function (b) { dec.fungi = b; M.set('decA', count()); }), tb = K.toggle('🦠 Bacteria', true, function (b) { dec.bacteria = b; M.set('decA', count()); });
  var run = K.btn('▶ Let time pass', function () { running = !running; run.textContent = running ? '❚❚ Pause' : '▶ Let time pass'; }, 'primary');
  var pl = K.btn('🌱 Plant bean seeds in both boxes', function () { planted = true; plantA = 1; plantB = 1; M.set({ planted: true, plantedAt: weeks }); draw(); });
  var rs = K.btn('↺ Reset', function () { weeks = 0; A = { leaf: 100, soil: 20 }; B = { leaf: 100, soil: 20 }; planted = false; running = false; run.textContent = '▶ Let time pass'; M.set({ weeks: 0, planted: false }); draw(); }, 'ghost');
  [tw.el, tf.el, tb.el, run, pl, rs].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function count() { return (dec.worms ? 1 : 0) + (dec.fungi ? 1 : 0) + (dec.bacteria ? 1 : 0); }
  function tick() {
    weeks++;
    var rate = 3.2 * count(); var d = Math.min(A.leaf, rate); A.leaf -= d; A.soil += d * 0.8; B.leaf = Math.max(B.leaf - 0.15, 0);
    if (planted) { plantA += 0.4 + A.soil / 60; plantB += 0.25 + B.soil / 200; }
    var st = { weeks: weeks, leafA: Math.round(A.leaf), leafB: Math.round(B.leaf), soilA: Math.round(A.soil), soilB: Math.round(B.soil), decA: count(), plantA: K.round(plantA, 1), plantB: K.round(plantB, 1) };
    if (planted) st.grownWeeks = weeks - S.plantedAt; M.set(st);
  }
  function box(x, lbl, b, withDec, plant) {
    var h = '<rect x="' + x + '" y="60" width="260" height="190" rx="10" fill="rgba(230,245,255,.4)" stroke="#6c8a99" stroke-width="3"/><rect x="' + (x + 4) + '" y="170" width="252" height="76" rx="6" fill="' + (b.soil > 60 ? '#5c3a1a' : '#8b5a2b') + '"/><text x="' + (x + 130) + '" y="50" text-anchor="middle" font-size="14" font-weight="800" fill="#1d2433">' + lbl + '</text>';
    var n = Math.round(b.leaf / 5), r = K.rng(lbl); for (var i = 0; i < n; i++) h += '<text x="' + (x + 14 + r() * 220) + '" y="' + (168 - r() * 30) + '" font-size="18" transform="rotate(' + (r() * 60 - 30) + ' ' + (x + 20 + r() * 220) + ' 160)">🍂</text>';
    if (withDec) { if (dec.worms) h += '<text x="' + (x + 40) + '" y="215" font-size="18">🪱</text><text x="' + (x + 170) + '" y="230" font-size="18">🪱</text>'; if (dec.fungi) h += '<text x="' + (x + 200) + '" y="165" font-size="18">🍄</text>'; if (dec.bacteria) h += '<text x="' + (x + 110) + '" y="205" font-size="12" fill="#ffe066">· · bacteria · ·</text>'; }
    if (plant > 0) { var ph = Math.min(90, plant * 6); h += '<line x1="' + (x + 130) + '" y1="170" x2="' + (x + 130) + '" y2="' + (170 - ph) + '" stroke="#2f9e44" stroke-width="5"/><ellipse cx="' + (x + 118) + '" cy="' + (170 - ph * 0.7) + '" rx="' + (6 + ph / 10) + '" ry="5" fill="#40c057"/><ellipse cx="' + (x + 142) + '" cy="' + (170 - ph * 0.5) + '" rx="' + (6 + ph / 10) + '" ry="5" fill="#40c057"/><text x="' + (x + 150) + '" y="' + (164 - ph) + '" font-size="11" font-weight="700">' + K.fmt(plant, 1) + ' cm</text>'; }
    return h;
  }
  function draw() {
    var h = '<rect width="640" height="300" fill="#f1f3f5"/>' + box(40, 'Box A: WITH decomposers', A, true, plantA) + box(340, 'Box B: NO decomposers (sterilized)', B, false, plantB);
    h += '<text x="320" y="290" text-anchor="middle" font-size="12" fill="#495057">Both boxes are sealed, get the same light and water, and started with 100 leaves.</text>';
    svg.innerHTML = h;
    rW.set(weeks); rA.set(Math.round(A.leaf)); rB.set(Math.round(B.leaf)); rN.set(Math.round(A.soil));
  }
  M.loop(function (dt) { if (!running) return; acc += dt; if (acc > 0.35) { acc = 0; tick(); draw(); if (weeks >= 30) { running = false; run.textContent = '▶ Let time pass'; } } });
  M.set({ weeks: 0, leafA: 100, leafB: 100, decA: 3, planted: false }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.decA != null) { var v = c.decA.eq != null ? c.decA.eq : c.decA; dec.worms = v > 0; dec.fungi = v > 1; dec.bacteria = v > 2; tw.set(dec.worms); tf.set(dec.fungi); tb.set(dec.bacteria); M.set('decA', count()); } if (c.planted) { planted = true; plantA = 1; plantB = 1; M.set({ planted: true, plantedAt: weeks }); } var need = Math.max(c.weeks && c.weeks.gte || 0, (c.grownWeeks && c.grownWeeks.gte || 0)); for (var i = 0; i < need; i++) tick(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Plant Growth Chamber: where does a plant's mass come from?           */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.plantLab = function (M) {
  var K = M.kit, S = M.state;
  var light = true, water = true, air = true, day = 0, plant = 5, soil = 2000, used = 0, running = false, acc = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 320', class: 'sn-svg', role: 'img', 'aria-label': 'Sealed plant growth chamber with a pot on a scale' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rD = K.readout('Day', ''), rP = K.readout('Plant mass', 'g', true), rS = K.readout('Soil mass (dry)', 'g', true), rW = K.readout('Water taken in', 'g');
  [rD, rP, rS, rW].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var tL = K.toggle('💡 Light', true, function (b) { light = b; draw(); }), tW = K.toggle('💧 Water', true, function (b) { water = b; draw(); }), tA = K.toggle('🌬 Air with carbon dioxide', true, function (b) { air = b; draw(); });
  var go = K.btn('▶ Grow 30 days', function () { if (day >= 30) { M.toast('Press ↺ to start a new trial.'); return; } running = true; }, 'primary');
  var rs = K.btn('↺ New seedling', function () { day = 0; plant = 5; soil = 2000; used = 0; running = false; M.set({ day: 0, grown: false }); draw(); }, 'ghost');
  [tL.el, tW.el, tA.el, go, rs].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function tick() {
    day++;
    var ok = light && water && air, g = ok ? plant * 0.09 : 0;
    if (!water) plant = Math.max(3, plant - 0.08); if (!light && water && air) plant = Math.max(3, plant - 0.05);
    plant += g; used += water ? (ok ? 8 : 2) : 0; soil -= ok ? 0.03 : 0;
    if (day >= 30) { running = false; var cond = (light ? 'L' : '') + (water ? 'W' : '') + (air ? 'A' : ''); var st = { day: day, grown: true, plant: K.round(plant, 1), soil: K.round(soil, 1), used: Math.round(used), cond: cond, gain: K.round(plant - 5, 1), soilLoss: K.round(2000 - soil, 1) }; st['trial_' + (cond || 'none')] = K.round(plant, 1); M.set(st); }
    else M.set({ day: day });
  }
  function draw() {
    var h = '<rect width="640" height="320" fill="#e9ecef"/><rect x="170" y="20" width="300" height="250" rx="14" fill="rgba(230,245,255,.55)" stroke="#6c8a99" stroke-width="4"/><text x="320" y="14" text-anchor="middle" font-size="12" fill="#495057" font-weight="700">SEALED GROWTH CHAMBER</text>';
    if (light) h += '<rect x="250" y="26" width="140" height="12" rx="4" fill="#ffe066"/><path d="M270 40 l-20 60 M320 40 v60 M370 40 l20 60" stroke="#ffe066" stroke-width="3" opacity=".7"/>';
    if (air) for (var i = 0; i < 10; i++) { var r = K.rng('co2' + i); h += '<text x="' + (190 + r() * 250) + '" y="' + (60 + r() * 120) + '" font-size="10" fill="#495057">CO₂</text>'; }
    var ph = Math.min(150, 20 + plant * 1.4), wilt = !water || !light;
    h += '<path d="M320 222 q' + (wilt ? 20 : 0) + ' -' + ph / 2 + ' 0 -' + ph + '" stroke="#2f9e44" stroke-width="' + (4 + plant / 20) + '" fill="none"/>';
    for (var l = 0; l < Math.min(10, Math.round(plant / 6)); l++) { var y = 215 - (l + 1) * ph / 11, s = l % 2 ? 1 : -1; h += '<ellipse cx="' + (320 + s * (12 + plant / 12)) + '" cy="' + (y + (wilt ? 6 : 0)) + '" rx="' + (10 + plant / 14) + '" ry="5" fill="' + (wilt ? '#a9a24a' : '#40c057') + '" transform="rotate(' + (s * (wilt ? 40 : 20)) + ' ' + (320 + s * 12) + ' ' + y + ')"/>'; }
    h += '<path d="M275 222 h90 l-10 40 h-70 z" fill="#b5651d"/><rect x="270" y="216" width="100" height="10" rx="3" fill="#8b5a2b"/>';
    h += '<rect x="240" y="266" width="160" height="26" rx="5" fill="#dee2e6" stroke="#868e96"/><text x="320" y="284" text-anchor="middle" font-size="12" font-family="monospace" fill="#1d2433">soil ' + K.fmt(soil, 1) + ' g</text>';
    if (water) h += '<text x="420" y="240" font-size="22">💧</text>';
    svg.innerHTML = h;
    rD.set(day); rP.set(K.fmt(plant, 1)); rS.set(K.fmt(soil, 1)); rW.set(Math.round(used));
  }
  M.loop(function (dt) { if (!running) return; acc += dt; if (acc > 0.1) { acc = 0; tick(); draw(); } });
  M.set({ day: 0, grown: false }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; var cond = null; for (var k in c) { var mm = k.match(/^trial_(\w+)$/); if (mm) cond = mm[1]; } if (c.cond) cond = c.cond; if (cond) { light = /L/.test(cond); water = /W/.test(cond); air = /A/.test(cond); tL.set(light); tW.set(water); tA.set(air); } day = 0; plant = 5; soil = 2000; used = 0; while (day < 30) tick(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Energy Pyramid: pass energy up the food chain (10% rule)            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.energyPyramid = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var LV = cfg.levels || [['Sunlight captured by grass', '🌾', 'Producers'], ['Grasshoppers', '🦗', 'Primary consumers'], ['Frogs', '🐸', 'Secondary consumers'], ['Snakes', '🐍', 'Tertiary consumers'], ['Hawks', '🦅', 'Top predators']];
  var start = 10000, pct = 10, reached = 0, anim = null;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 340', class: 'sn-svg', role: 'img', 'aria-label': 'Energy pyramid with five levels' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rL = K.readout('Energy at top level reached', 'units', true), rH = K.readout('Lost as heat & life activities', 'units');
  reads.appendChild(rL.el); reads.appendChild(rH.el); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var up = K.btn('⬆ Pass energy up one level', function () { if (reached >= LV.length - 1) { M.toast('This is the top of the food chain.'); return; } reached++; M.set({ reached: reached }); report(); draw(); }, 'primary');
  var pS = K.slider({ label: '% passed to next level', min: 5, max: 20, step: 5, value: pct, unit: '%', onInput: function (v) { pct = v; M.set('pct', v); report(); draw(); } });
  var sS = K.slider({ label: '☀ Energy captured by grass', min: 1000, max: 20000, step: 1000, value: start, unit: 'units', onInput: function (v) { start = v; M.set('start', v); report(); draw(); } });
  var rs = K.btn('↺ Start over', function () { reached = 0; M.set({ reached: 0 }); report(); draw(); }, 'ghost');
  ctr.appendChild(pS.el); ctr.appendChild(sS.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(up); r2.appendChild(rs); ctr.appendChild(r2); M.el.appendChild(ctr);
  function E(i) { return start * Math.pow(pct / 100, i); }
  function report() { var st = { reached: reached, top: K.round(E(reached), 1), lost: K.round(start - E(reached), 1), pct: pct, start: start }; for (var i = 0; i <= reached; i++) st['e' + i] = K.round(E(i), 1); M.set(st); rL.set(K.fmt(E(reached), 1)); rH.set(K.fmt(start - E(reached), 1)); }
  function draw() {
    var h = '<rect width="640" height="340" fill="#f8f9fa"/>', n = LV.length, H = 56;
    for (var i = 0; i < n; i++) { var y = 300 - (i + 1) * H, w = 520 - i * 100, x = 320 - w / 2, on = i <= reached, col = ['#2f9e44', '#74b816', '#f08c00', '#e8590c', '#c92a2a'][i];
      h += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (H - 4) + '" rx="6" fill="' + (on ? col : '#dee2e6') + '" opacity="' + (on ? 1 : .6) + '"/><text x="' + (x + 14) + '" y="' + (y + 32) + '" font-size="22">' + LV[i][1] + '</text><text x="' + (x + 44) + '" y="' + (y + 22) + '" font-size="12" font-weight="800" fill="' + (on ? '#fff' : '#495057') + '">' + LV[i][2] + '</text><text x="' + (x + 44) + '" y="' + (y + 38) + '" font-size="11" fill="' + (on ? '#fff' : '#495057') + '">' + LV[i][0] + '</text>' + (on ? '<text x="' + (x + w - 12) + '" y="' + (y + 32) + '" font-size="15" font-weight="800" fill="#fff" text-anchor="end">' + K.fmt(E(i), 1) + '</text>' : '<text x="' + (x + w - 12) + '" y="' + (y + 32) + '" font-size="13" fill="#495057" text-anchor="end">?</text>');
      if (on && i < reached) h += '<text x="' + (x + w + 8) + '" y="' + (y + 10) + '" font-size="18">🔥</text>'; }
    h += '<text x="320" y="330" text-anchor="middle" font-size="12" fill="#495057">Numbers show energy units at each level. 🔥 = energy used for living and lost as heat.</text>';
    svg.innerHTML = h;
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.pct) { pct = c.pct.eq || c.pct; pS.set(pct, true); } if (c.start) { start = c.start.eq || c.start; sS.set(start, true); } var want = c.reached && (c.reached.gte || c.reached) || 0; reached = Math.max(reached, want); if (c.reached === 0) reached = 0; M.set('pct', pct); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Wildlife Camera: watch clips and tag each organism's role            */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.ecoCam = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var CLIPS = cfg.clips || [
    { id: 'oak', name: 'Oak tree', icon: '🌳', role: 'producer', scene: 'Sunlight hits the leaves. The tree makes sugar from light, air, and water. It never eats anything.', food: '☀️' },
    { id: 'deer', name: 'Deer', icon: '🦌', role: 'herbivore', scene: 'The deer nibbles clover and acorns all morning.', food: '🍀' },
    { id: 'owl', name: 'Owl', icon: '🦉', role: 'carnivore', scene: 'At night the owl swoops down and catches a mouse.', food: '🐁' },
    { id: 'raccoon', name: 'Raccoon', icon: '🦝', role: 'omnivore', scene: 'The raccoon eats berries, then catches a crayfish in the creek.', food: '🫐🦞' },
    { id: 'mushroom', name: 'Mushroom', icon: '🍄', role: 'decomposer', scene: 'Mushrooms grow on a fallen, rotting log and slowly break it down.', food: '🪵' },
    { id: 'worm', name: 'Earthworm', icon: '🪱', role: 'decomposer', scene: 'Worms pull dead leaves into the soil and break them into tiny bits.', food: '🍂' },
    { id: 'algae', name: 'Pond algae', icon: '🟢', role: 'producer', scene: 'Green algae float at the sunny surface of the pond, making their own food.', food: '☀️' },
    { id: 'hawk', name: 'Red-tailed hawk', icon: '🦅', role: 'carnivore', scene: 'The hawk circles the field and dives to catch a snake.', food: '🐍' }
  ];
  var i = 0, tags = {}, t = 0;
  M.el.innerHTML = '';
  var wrap = K.el('<div style="display:flex;flex-direction:column;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 640 300', class: 'sn-svg', role: 'img', 'aria-label': 'Trail camera footage' });
  var cap = K.el('<div class="sn-panel" aria-live="polite"></div>');
  var tagRow = K.el('<div class="sn-ctrls"><b class="sn-note">Tag this organism:</b></div>');
  wrap.appendChild(svg); wrap.appendChild(cap); wrap.appendChild(tagRow); M.el.appendChild(wrap);
  var ROLES = [['producer', '🌱 Producer'], ['herbivore', '🥕 Consumer: herbivore'], ['carnivore', '🥩 Consumer: carnivore'], ['omnivore', '🍽 Consumer: omnivore'], ['decomposer', '🍄 Decomposer']];
  ROLES.forEach(function (r) { tagRow.appendChild(K.btn(r[1], function () { tag(r[0]); }, 'sm')); });
  var nav = K.el('<div class="sn-row"></div>');
  nav.appendChild(K.btn('◀ Previous clip', function () { i = (i + CLIPS.length - 1) % CLIPS.length; t = 0; show(); }, 'ghost sm'));
  nav.appendChild(K.btn('Next clip ▶', function () { i = (i + 1) % CLIPS.length; t = 0; show(); }, 'sm'));
  tagRow.appendChild(nav);
  function tag(r) {
    var c = CLIPS[i]; tags[c.id] = r; var ok = r === c.role;
    M.toast(ok ? '✓ Tagged ' + c.name + ' as ' + r + '.' : '✗ Look again: how does the ' + c.name.toLowerCase() + ' get energy?', !ok);
    var st = { tagged: Object.keys(tags).length, right: CLIPS.filter(function (x) { return tags[x.id] === x.role; }).length }; st['tag_' + c.id] = r; M.set(st); show();
  }
  function show() {
    var c = CLIPS[i];
    cap.innerHTML = '<b>Clip ' + (i + 1) + ' of ' + CLIPS.length + ': ' + c.name + '</b><br>' + c.scene + (tags[c.id] ? '<br><i>Your tag: ' + tags[c.id] + (tags[c.id] === c.role ? ' ✓' : ' ✗ (try again)') + '</i>' : '');
    var st = { clip: c.id }; st['watched_' + c.id] = true; var w = (S.watched || []).slice(); if (w.indexOf(c.id) < 0) w.push(c.id); st.watched = w; st.watchedCount = w.length; M.set(st);
  }
  M.loop(function (dt) {
    t += dt; var c = CLIPS[i], x = 120 + Math.sin(t) * 40;
    var h = '<rect width="640" height="300" fill="#2b3a2b"/><rect x="8" y="8" width="624" height="284" rx="8" fill="#3b5d3b"/><text x="20" y="30" fill="#ff6b6b" font-size="12" font-family="monospace">● REC  TRAIL CAM 0' + (i + 1) + '</text><text x="620" y="30" fill="#fff" font-size="12" font-family="monospace" text-anchor="end">' + (c.id === 'owl' ? '02:14 AM' : '10:32 AM') + '</text>';
    h += '<rect x="8" y="220" width="624" height="72" fill="#4a6b3a"/>';
    h += '<text x="' + (320 + Math.sin(t * 1.5) * 60) + '" y="200" font-size="96" text-anchor="middle">' + c.icon + '</text><text x="' + (470 - (t * 20) % 60) + '" y="235" font-size="38" text-anchor="middle">' + c.food + '</text>';
    h += '<rect x="8" y="8" width="624" height="284" rx="8" fill="none" stroke="#000" stroke-width="6" opacity=".4"/>';
    svg.innerHTML = h;
  });
  show();
  return { auto: function (st) { var c = st.goal.check || {}; CLIPS.forEach(function (cl, k) { if (c.right || c.tagged || c['tag_' + cl.id]) { i = k; tag(cl.role); } if (c.watchedCount) { i = k; show(); } }); } };
};

/* ================================================================== */
/*                     GRADE 6 SCIENCE MODELS                          */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/* Particle Box: heat or cool a substance and watch its particles       */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.particleBox = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var SUB = { water: { name: 'Water', mp: 0, bp: 100, col: '#339af0' }, oxygen: { name: 'Oxygen', mp: -218, bp: -183, col: '#ff8787' }, iron: { name: 'Iron', mp: 1538, bp: 2862, col: '#868e96' } };
  var sub = 'water', T = -20, heatRate = 0, N = 48, parts = [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:10px"></div>');
  var cv = document.createElement('canvas'); cv.width = 520; cv.height = 360; cv.className = 'sn-svg'; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Particles in a closed box');
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Temperature', '°C', true), rS = K.readout('State', ''), rV = K.readout('Average particle speed', '');
  [rT, rS, rV].forEach(function (r) { reads.appendChild(r.el); });
  var therm = K.svgEl('svg', { viewBox: '0 0 200 60', class: 'sn-svg', 'aria-hidden': 'true' });
  side.appendChild(reads); side.appendChild(therm);
  row.appendChild(cv); row.appendChild(side); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var hS = K.slider({ label: '🔥 Add or ❄ remove heat', min: -3, max: 3, step: 1, value: 0, fmt: function (v) { return v > 0 ? 'heat +' + v : v < 0 ? 'cool ' + v : 'off'; }, onInput: function (v) { heatRate = v; if (v > 0) M.set('heated', true); if (v < 0) M.set('cooled', true); } });
  var subS = K.seg([['water', '💧 Water'], ['oxygen', '🫧 Oxygen'], ['iron', '⛓ Iron']], sub, function (v) { sub = v; Hc = 2 / 3; T = SUB[v].mp - 20; init(); M.set({ substance: v }); });
  ctr.appendChild(hS.el); ctr.appendChild(subS.el); M.el.appendChild(ctr);
  // Heat content Hc (normalized): 0-1 solid warming, 1-1.6 melting, 1.6-2.6 liquid warming, 2.6-3.6 boiling, 3.6-4.2 gas warming.
  var Hc = 2 / 3;
  function tempOf(h) { var s = SUB[sub]; if (h < 1) return s.mp - 60 + h * 60; if (h < 1.6) return s.mp; if (h < 2.6) return s.mp + (h - 1.6) * (s.bp - s.mp); if (h < 3.6) return s.bp; return s.bp + (h - 3.6) / 0.6 * 120; }
  function phaseOf(h) { return h < 1 ? 'solid' : h < 1.6 ? 'melting' : h < 2.6 ? 'liquid' : h < 3.6 ? 'boiling' : 'gas'; }
  function state() { var p = phaseOf(Hc); return p === 'melting' ? 'solid' : p === 'boiling' ? 'liquid' : p; }
  function freeFrac() { return Hc < 1 ? 0 : Hc < 1.6 ? (Hc - 1) / 0.6 : 1; }
  function gasFrac() { return Hc < 2.6 ? 0 : Hc < 3.6 ? (Hc - 2.6) : 1; }
  function init() { parts = []; var cols = 8; for (var i = 0; i < N; i++) { var gx = i % cols, gy = Math.floor(i / cols); parts.push({ hx: 150 + gx * 28, hy: 330 - gy * 28, x: 150 + gx * 28, y: 330 - gy * 28, vx: 0, vy: 0 }); } }
  function speed() { return Math.sqrt(Math.max(1, T - SUB[sub].mp + 60)) * 18; }
  var ctx = cv.getContext('2d');
  M.loop(function (dt) {
    var s = SUB[sub];
    Hc = K.clamp(Hc + heatRate * dt * 0.11, 0, 4.2); T = tempOf(Hc);
    var ph = phaseOf(Hc), st = state(), ff = freeFrac(), gf = gasFrac();
    var sp = speed(), W = cv.width, H = cv.height;
    parts.forEach(function (p, i) {
      var order = (i * 37) % N / N; // which particles break free first
      if (order >= ff) { var a = 1 + (T - s.mp + 60) / 30; p.x += (p.hx - p.x) * 0.3 + (Math.random() - 0.5) * a; p.y += (p.hy - p.y) * 0.3 + (Math.random() - 0.5) * a; p.vx = 0; p.vy = 0; return; }
      var gas = order < gf;
      p.vx += (Math.random() - 0.5) * sp * 0.4; p.vy += (Math.random() - 0.5) * sp * 0.4 + (gas ? 0 : 20);
      var v = Math.sqrt(p.vx * p.vx + p.vy * p.vy), want = gas ? sp * 1.6 : sp * 0.55; if (v > 0) { p.vx *= want / v; p.vy *= want / v; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      var top = gas ? 14 : Math.max(14, H - 14 - Math.ceil(N / 10) * 30);
      if (p.x < 14) { p.x = 14; p.vx = Math.abs(p.vx); } if (p.x > W - 14) { p.x = W - 14; p.vx = -Math.abs(p.vx); }
      if (p.y > H - 14) { p.y = H - 14; p.vy = -Math.abs(p.vy); } if (p.y < top) { p.y = top; p.vy = Math.abs(p.vy); }
    });
    // draw
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#10212b'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#6c8a99'; ctx.lineWidth = 6; ctx.strokeRect(3, 3, W - 6, H - 6);
    parts.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, 7); ctx.fillStyle = s.col; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.stroke(); });
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.fillText(s.name + ' particles (zoomed in 100 million times)', 14, 26);
    rT.set(Math.round(T)); rS.set(ph === 'solid' ? '🧊 SOLID' : ph === 'melting' ? '🧊→💧 MELTING' : ph === 'liquid' ? '💧 LIQUID' : ph === 'boiling' ? '💧→💨 BOILING' : '💨 GAS'); rV.set(ph === 'solid' ? 'vibrating' : Math.round(sp) + ' (relative)');
    var tf = K.clamp((T - (s.mp - 60)) / (s.bp + 120 - (s.mp - 60)), 0, 1);
    therm.innerHTML = '<rect x="10" y="22" width="180" height="16" rx="8" fill="#fff" stroke="#495057" stroke-width="2"/><rect x="12" y="24" width="' + (176 * tf) + '" height="12" rx="6" fill="#e03131"/><text x="10" y="16" font-size="10" fill="#495057">' + (s.mp - 60) + '°</text><text x="190" y="16" font-size="10" fill="#495057" text-anchor="end">' + (s.bp + 120) + '°</text><line x1="' + (10 + 180 * (60 / (s.bp - s.mp + 180))) + '" x2="' + (10 + 180 * (60 / (s.bp - s.mp + 180))) + '" y1="18" y2="44" stroke="#1971c2" stroke-width="2"/><text x="' + (10 + 180 * (60 / (s.bp - s.mp + 180))) + '" y="56" font-size="9" text-anchor="middle" fill="#1971c2">melts ' + s.mp + '°</text><line x1="' + (10 + 180 * ((s.bp - s.mp + 60) / (s.bp - s.mp + 180))) + '" x2="' + (10 + 180 * ((s.bp - s.mp + 60) / (s.bp - s.mp + 180))) + '" y1="18" y2="44" stroke="#e8590c" stroke-width="2"/><text x="' + (10 + 180 * ((s.bp - s.mp + 60) / (s.bp - s.mp + 180))) + '" y="56" font-size="9" text-anchor="middle" fill="#e8590c">boils ' + s.bp + '°</text>';
    var ns = { temp: Math.round(T), phase: st, phaseNow: ph, substance: sub, pausedAt: ph === 'melting' || ph === 'boiling' ? Math.round(T) : null };
    if (st === 'liquid') ns['was_liquid_' + sub] = true; if (st === 'gas') ns['was_gas_' + sub] = true; if (st === 'solid' && S['was_liquid_' + sub]) ns['refroze_' + sub] = true;
    if (ns.pausedAt != null) ns['paused_' + sub + '_' + ns.pausedAt] = true;
    if (ns.temp !== S.temp || ns.phase !== S.phase || ns.pausedAt !== S.pausedAt) M.set(ns);
  });
  init(); M.set({ temp: T, phase: 'solid', substance: sub });
  return { auto: function (st) { var c = st.goal.check || {}; if (c.substance) { sub = c.substance; subS.set(sub); init(); } var S2 = SUB[sub]; var o = { heated: true, cooled: !!c.cooled, substance: sub }; for (var k in c) { var mm = k.match(/^(was_liquid|was_gas|refroze|paused)_(\w+?)(?:_(-?\d+))?$/); if (mm) { o[k] = true; if (mm[1] === 'was_gas') T = S2.bp + 10; if (mm[1] === 'was_liquid') T = (S2.mp + S2.bp) / 2; if (mm[1] === 'refroze') T = S2.mp - 10; } } if (c.phase) { var ph = c.phase.eq || c.phase; T = ph === 'solid' ? S2.mp - 10 : ph === 'liquid' ? (S2.mp + S2.bp) / 2 : S2.bp + 10; } if (c.temp) T = c.temp.gte != null ? c.temp.gte + 1 : c.temp.lte != null ? c.temp.lte - 1 : T; Hc = T < S2.mp ? (T - S2.mp + 60) / 60 : T < S2.bp ? 1.6 + (T - S2.mp) / (S2.bp - S2.mp) : 3.6 + (T - S2.bp) / 200; o.temp = Math.round(T); o.phase = state(); M.set(o); } };
};

/* ------------------------------------------------------------------ */
/* Heating Curve: steady heat on ice → water → steam                   */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.heatCurve = function (M) {
  var K = M.kit, S = M.state;
  var t = 0, T = -30, ice = 100, water = 0, steam = 0, power = 1, on = false, acc = 0;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1.4fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 260 300', class: 'sn-svg', role: 'img', 'aria-label': 'Beaker of ice on a burner' });
  var g = K.graph({ title: 'Heating curve', xLabel: 'Time (minutes)', yLabel: 'Temperature (°C)', xMax: 30, yMax: 140, yMin: -40, grow: true, series: [{ name: 'Temperature', color: '#e03131' }] });
  row.appendChild(svg); row.appendChild(g.el); M.el.appendChild(row);
  var reads = K.el('<div class="sn-reads"></div>'), rt = K.readout('Time', 'min'), rT = K.readout('Temperature', '°C', true), rI = K.readout('Ice', '%'), rW = K.readout('Liquid water', '%'), rS = K.readout('Steam', '%');
  [rt, rT, rI, rW, rS].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var go = K.btn('🔥 Turn on the burner', function () { on = !on; go.textContent = on ? '⏸ Turn off' : '🔥 Turn on the burner'; M.set('started', true); }, 'primary');
  var pw = K.seg([['1', 'Low flame'], ['2', 'High flame']], '1', function (v) { power = +v; M.set('power', power); });
  var rs = K.btn('↺ New ice', function () { t = 0; T = -30; ice = 100; water = 0; steam = 0; on = false; go.textContent = '🔥 Turn on the burner'; g.clear(); g.range(30, 140, -40); M.set({ time: 0, done: false, meltStart: null, meltEnd: null, boilStart: null }); draw(); }, 'ghost');
  [go, pw.el, rs].forEach(function (b) { ctr.appendChild(b); }); M.el.appendChild(ctr);
  function tick() {
    t += 0.25; var q = power * 0.25 * 16; // energy per step
    if (ice > 0 && T < 0) T = Math.min(0, T + q / 2);
    else if (ice > 0) { if (S.meltStart == null) M.set('meltStart', K.round(t, 1)); ice = Math.max(0, ice - q / 3.2); water = 100 - ice; if (ice === 0) M.set('meltEnd', K.round(t, 1)); }
    else if (T < 100) T = Math.min(100, T + q / 4);
    else if (water > 0) { if (S.boilStart == null) M.set('boilStart', K.round(t, 1)); water = Math.max(0, water - q / 22); steam = 100 - water; if (water === 0) M.set('boilEnd', K.round(t, 1)); }
    else T = Math.min(140, T + q / 2);
    g.add(0, t, T);
    M.set({ time: K.round(t, 2), temp: Math.round(T), ice: Math.round(ice), water: Math.round(water), steam: Math.round(steam), done: steam >= 100 });
  }
  function draw() {
    var h = '<rect width="260" height="300" fill="#eef4f6"/><path d="M70 60 v170 q0 8 8 8 h104 q8 0 8 -8 v-170" fill="rgba(230,245,255,.5)" stroke="#6c8a99" stroke-width="3"/>';
    var wl = water * 1.4; if (wl > 0) h += '<rect x="73" y="' + (234 - wl) + '" width="114" height="' + wl + '" rx="5" fill="#74c0fc" opacity=".8"/>';
    for (var i = 0; i < Math.ceil(ice / 12); i++) h += '<rect x="' + (80 + (i % 4) * 26) + '" y="' + (212 - Math.floor(i / 4) * 24 - wl * 0.5) + '" width="22" height="22" rx="4" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2"/>';
    if (T >= 100 && water > 0) for (var b = 0; b < 8; b++) h += '<circle cx="' + (85 + Math.random() * 90) + '" cy="' + (234 - Math.random() * wl) + '" r="3" fill="none" stroke="#fff" stroke-width="1.5"/>';
    if (steam > 0) h += '<path d="M100 50 q10 -20 0 -40 M130 50 q10 -20 0 -40 M160 50 q10 -20 0 -40" stroke="#ced4da" stroke-width="' + (2 + steam / 25) + '" fill="none"/>';
    h += '<rect x="90" y="246" width="80" height="12" rx="3" fill="#343a40"/>' + (on ? '<path d="M110 246 q10 -18 20 0 M130 246 q10 -' + (12 + power * 6) + ' 20 0" fill="#ff922b"/>' : '') + '<rect x="100" y="258" width="60" height="30" fill="#495057"/>';
    svg.innerHTML = h;
    rt.set(K.fmt(t, 1)); rT.set(Math.round(T)); rI.set(Math.round(ice)); rW.set(Math.round(water)); rS.set(Math.round(steam));
  }
  M.loop(function (dt) { if (!on || S.done) { draw(); return; } acc += dt; while (acc > 0.08) { acc -= 0.08; tick(); } draw(); });
  M.set({ time: 0, temp: -30, done: false, power: 1 }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.power) { power = c.power; pw.set(String(power)); } var guard = 0; while (!S.done && guard++ < 2000) { tick(); if (c.temp && c.temp.gte != null && T >= c.temp.gte && !c.done) break; } draw(); } };
};

/* ------------------------------------------------------------------ */
/* Diffusion: food coloring in cold vs hot water                       */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.diffusion = function (M) {
  var K = M.kit, S = M.state;
  var tA = 10, tB = 70, dye = [], t = 0, running = false;
  M.el.innerHTML = '';
  var cv = document.createElement('canvas'); cv.width = 640; cv.height = 300; cv.className = 'sn-svg'; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Two beakers with food coloring spreading');
  M.el.appendChild(cv);
  var reads = K.el('<div class="sn-reads"></div>'), rt = K.readout('Time', 's'), rA = K.readout('Beaker A mixed', '%', true), rB = K.readout('Beaker B mixed', '%', true);
  [rt, rA, rB].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sA = K.slider({ label: 'Beaker A temp', min: 5, max: 90, step: 5, value: tA, unit: '°C', onInput: function (v) { if (running) { sA.set(tA, true); M.toast('Reset to change temperatures.'); return; } tA = v; M.set('tA', v); } });
  var sB = K.slider({ label: 'Beaker B temp', min: 5, max: 90, step: 5, value: tB, unit: '°C', onInput: function (v) { if (running) { sB.set(tB, true); M.toast('Reset to change temperatures.'); return; } tB = v; M.set('tB', v); } });
  var drop = K.btn('💧 Add a drop of food coloring to both', function () { if (running) return; dye = []; for (var i = 0; i < 300; i++) dye.push({ b: i % 2, x: 0, y: 0 }); t = 0; running = true; M.set({ dropped: true, doneA: null, doneB: null, trialA: tA, trialB: tB }); }, 'primary');
  var rs = K.btn('↺ Reset', function () { running = false; dye = []; t = 0; M.set({ dropped: false }); }, 'ghost');
  ctr.appendChild(sA.el); ctr.appendChild(sB.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(drop); r2.appendChild(rs); ctr.appendChild(r2); M.el.appendChild(ctr);
  var ctx = cv.getContext('2d');
  function mixed(b) { var arr = dye.filter(function (d) { return d.b === b; }); if (!arr.length) return 0; var cells = {}; arr.forEach(function (d) { cells[Math.floor((d.x + 110) / 44) + ',' + Math.floor((d.y + 80) / 40)] = 1; }); return Math.min(100, Math.round(Object.keys(cells).length / 20 * 100)); }
  M.loop(function (dt) {
    if (running) {
      t += dt * 5;
      dye.forEach(function (d) { var T = d.b ? tB : tA, s = Math.sqrt(T + 273) * 0.07 * Math.pow(1.03, T - 20) * 2.6; for (var k = 0; k < 5; k++) { d.x += (Math.random() - 0.5) * s; d.y += (Math.random() - 0.5) * s; } d.x = K.clamp(d.x, -108, 108); d.y = K.clamp(d.y, -78, 78); });
      var a = mixed(0), b = mixed(1), st = { time: Math.round(t), mixA: a, mixB: b };
      if (a >= 95 && S.doneA == null) st.doneA = Math.round(t); if (b >= 95 && S.doneB == null) st.doneB = Math.round(t);
      if ((S.doneA != null || st.doneA != null) && (S.doneB != null || st.doneB != null)) { running = false; st.finished = true; var key = 'time_' + tA; st[key] = S.doneA != null ? S.doneA : st.doneA; st['time_' + tB] = S.doneB != null ? S.doneB : st.doneB; }
      M.set(st);
    }
    ctx.clearRect(0, 0, 640, 300); ctx.fillStyle = '#eef4f6'; ctx.fillRect(0, 0, 640, 300);
    [[170, tA, 'A'], [470, tB, 'B']].forEach(function (bk, bi) {
      var cx = bk[0], cy = 150, warm = K.clamp((bk[1] - 5) / 85, 0, 1);
      ctx.fillStyle = 'rgba(' + Math.round(116 + 120 * warm) + ',' + Math.round(192 - 60 * warm) + ',' + Math.round(252 - 150 * warm) + ',.35)'; ctx.fillRect(cx - 115, cy - 85, 230, 170);
      ctx.strokeStyle = '#6c8a99'; ctx.lineWidth = 4; ctx.strokeRect(cx - 115, cy - 85, 230, 170);
      dye.forEach(function (d) { if (d.b !== bi) return; ctx.fillStyle = 'rgba(214,51,108,.55)'; ctx.beginPath(); ctx.arc(cx + d.x, cy + d.y, 5, 0, 7); ctx.fill(); });
      ctx.fillStyle = '#1d2433'; ctx.font = 'bold 14px sans-serif'; ctx.fillText('Beaker ' + bk[2] + ' · ' + bk[1] + ' °C', cx - 60, cy + 110);
    });
    rt.set(Math.round(t)); rA.set(mixed(0)); rB.set(mixed(1));
  });
  M.set({ tA: tA, tB: tB, dropped: false });
  return { auto: function (st) { var c = st.goal.check || {}; if (c.tA != null) { tA = c.tA.eq || c.tA; sA.set(tA, true); } if (c.tB != null) { tB = c.tB.eq || c.tB; sB.set(tB, true); } var o = { dropped: true, finished: true, trialA: tA, trialB: tB }; var ta = Math.round(900 / Math.pow(1.03, tA)), tb = Math.round(900 / Math.pow(1.03, tB)); o.doneA = ta; o.doneB = tb; o['time_' + tA] = ta; o['time_' + tB] = tb; for (var k in c) { var mm = k.match(/^time_(\d+)$/); if (mm) o[k] = Math.round(900 / Math.pow(1.03, +mm[1])); } M.set(o); } };
};

/* ------------------------------------------------------------------ */
/* Gas Piston: temperature, volume, and particle collisions (pressure) */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.piston = function (M) {
  var K = M.kit, S = M.state;
  var T = 300, V = 1, n = 30, parts = [], hits = 0, hitT = 0, pressure = 0;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:10px"></div>');
  var cv = document.createElement('canvas'); cv.width = 440; cv.height = 340; cv.className = 'sn-svg'; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Gas particles in a cylinder with a movable piston');
  var side = K.el('<div class="sn-reads" style="align-content:start"></div>'), rT = K.readout('Temperature', 'K'), rV = K.readout('Volume', 'L'), rN = K.readout('Particles', ''), rP = K.readout('Pressure gauge', 'kPa', true);
  [rT, rV, rN, rP].forEach(function (r) { side.appendChild(r.el); });
  row.appendChild(cv); row.appendChild(side); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sT = K.slider({ label: '🌡 Temperature', min: 150, max: 600, step: 50, value: T, unit: 'K', onInput: function (v) { T = v; M.set('T', v); } });
  var sV = K.slider({ label: '⬇ Push the piston (volume)', min: 0.5, max: 1, step: 0.25, value: V, unit: 'L', onInput: function (v) { V = v; M.set('V', v); } });
  var add = K.btn('+10 particles', function () { addN(10); }), rem = K.btn('−10 particles', function () { if (n <= 10) return; n -= 10; parts.splice(0, 10); M.set('n', n); });
  ctr.appendChild(sT.el); ctr.appendChild(sV.el); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(add); r2.appendChild(rem); ctr.appendChild(r2); M.el.appendChild(ctr);
  function addN(k) { for (var i = 0; i < k; i++) { var a = Math.random() * 6.28; parts.push({ x: 60 + Math.random() * 300, y: 280 - Math.random() * 100, vx: Math.cos(a), vy: Math.sin(a) }); } n = parts.length; M.set('n', n); }
  addN(30);
  var ctx = cv.getContext('2d');
  M.loop(function (dt) {
    var top = 340 - 300 * V, sp = Math.sqrt(T) * 9;
    parts.forEach(function (p) {
      var v = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1; p.vx = p.vx / v * sp; p.vy = p.vy / v * sp;
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 30) { p.x = 30; p.vx = Math.abs(p.vx); hits++; } if (p.x > 410) { p.x = 410; p.vx = -Math.abs(p.vx); hits++; }
      if (p.y > 325) { p.y = 325; p.vy = -Math.abs(p.vy); hits++; } if (p.y < top + 20) { p.y = top + 20; p.vy = Math.abs(p.vy); hits++; }
    });
    hitT += dt;
    var target = Math.round(n * T / V / 90); // ideal gas: P ∝ nT/V
    pressure += (target - pressure) * Math.min(1, dt * 3);
    ctx.clearRect(0, 0, 440, 340); ctx.fillStyle = '#10212b'; ctx.fillRect(0, 0, 440, 340);
    ctx.fillStyle = '#495057'; ctx.fillRect(15, top, 410, 16); ctx.fillRect(205, 0, 30, top);
    ctx.strokeStyle = '#adb5bd'; ctx.lineWidth = 6; ctx.strokeRect(18, 3, 404, 334);
    var warm = K.clamp((T - 150) / 450, 0, 1);
    parts.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, 7); ctx.fillStyle = 'rgb(' + Math.round(80 + 175 * warm) + ',' + Math.round(160 - 60 * warm) + ',' + Math.round(255 - 180 * warm) + ')'; ctx.fill(); });
    if (hitT > 0.5) { var hr = Math.round(hits / hitT); hits = 0; hitT = 0; M.set({ hitsPerSec: hr }); }
    var P = Math.round(pressure); rT.set(T); rV.set(V); rN.set(n); rP.set(P);
    if (Math.abs(P - (S.P || 0)) >= 1 && Math.abs(P - target) <= 1) { var st = { P: target, T: T, V: V, n: n }; st['p_' + T + '_' + V + '_' + n] = target; M.set(st); }
  });
  M.set({ T: T, V: V, n: n, P: Math.round(n * T / V / 90) });
  return { auto: function (st) { var c = st.goal.check || {}; if (c.T) { T = c.T.eq || c.T; sT.set(T, true); } if (c.V) { V = c.V.eq || c.V; sV.set(V, true); } if (c.n) { var want = c.n.eq || c.n; while (n < want) addN(10); while (n > want) { n -= 10; parts.splice(0, 10); } } var s2 = { T: T, V: V, n: n, P: Math.round(n * T / V / 90) }; s2['p_' + T + '_' + V + '_' + n] = s2.P; for (var k in c) { var mm = k.match(/^p_(\d+)_([\d.]+)_(\d+)$/); if (mm) s2[k] = Math.round(+mm[3] * +mm[1] / +mm[2] / 90); } pressure = s2.P; M.set(s2); } };
};

/* ------------------------------------------------------------------ */
/* Thermal Expansion: thermometer column and balloon on a bottle       */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.expansion = function (M) {
  var K = M.kit, S = M.state;
  var bath = 20, mode = 'thermo', marks = {};
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 640 320', class: 'sn-svg', role: 'img', 'aria-label': 'Homemade thermometer and a balloon on a bottle in a water bath' });
  M.el.appendChild(svg);
  var reads = K.el('<div class="sn-reads"></div>'), rB = K.readout('Water bath', '°C', true), rC = K.readout('Liquid column height', 'mm'), rBl = K.readout('Balloon width', 'cm');
  [rB, rC, rBl].forEach(function (r) { reads.appendChild(r.el); }); M.el.appendChild(reads);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sB = K.slider({ label: '🌡 Water bath temperature', min: 0, max: 80, step: 10, value: bath, unit: '°C', onInput: function (v) { bath = v; draw(); } });
  var mk = K.btn('✏️ Mark the column on the tube', function () { marks[bath] = col(); M.set('marks', Object.keys(marks).length); var o = {}; o['mark_' + bath] = col(); M.set(o); draw(); });
  ctr.appendChild(sB.el); ctr.appendChild(mk); M.el.appendChild(ctr);
  function col() { return Math.round(40 + bath * 1.5); } // mm
  function balloon() { return K.round(6 + bath * 0.07, 1); }
  function draw() {
    var warm = K.clamp(bath / 80, 0, 1), wc = 'rgb(' + Math.round(116 + 130 * warm) + ',' + Math.round(192 - 70 * warm) + ',' + Math.round(252 - 160 * warm) + ')';
    var h = '<rect width="640" height="320" fill="#f1f3f5"/><rect x="40" y="170" width="560" height="120" rx="10" fill="' + wc + '" opacity=".55" stroke="#6c8a99" stroke-width="3"/><text x="320" y="310" text-anchor="middle" font-size="12" fill="#495057">Water bath: ' + bath + ' °C</text>';
    // thermometer bottle
    h += '<path d="M130 290 v-80 q0 -20 20 -20 h40 q20 0 20 20 v80 z" fill="rgba(255,255,255,.6)" stroke="#495057" stroke-width="3"/><rect x="134" y="230" width="72" height="56" fill="#e03131" opacity=".75"/>';
    h += '<rect x="162" y="30" width="16" height="200" rx="4" fill="#fff" stroke="#495057" stroke-width="2"/><rect x="165" y="' + (228 - col()) + '" width="10" height="' + col() + '" fill="#e03131"/>';
    Object.keys(marks).forEach(function (k) { var y = 228 - marks[k]; h += '<line x1="178" x2="196" y1="' + y + '" y2="' + y + '" stroke="#1d2433" stroke-width="2"/><text x="200" y="' + (y + 4) + '" font-size="11" fill="#1d2433" font-weight="700">' + k + '°</text>'; });
    h += '<text x="170" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#1d2433">Homemade thermometer</text>';
    // balloon bottle
    var bw = balloon() * 8;
    h += '<path d="M430 290 v-70 q0 -20 16 -30 v-30 h28 v30 q16 10 16 30 v70 z" fill="rgba(255,255,255,.6)" stroke="#495057" stroke-width="3"/><ellipse cx="460" cy="' + (158 - bw * 0.9) + '" rx="' + bw * 0.8 + '" ry="' + bw + '" fill="#f06595" stroke="#c2255c" stroke-width="2"/><text x="460" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#1d2433">Balloon on an empty bottle</text>';
    svg.innerHTML = h;
    rB.set(bath); rC.set(col()); rBl.set(K.fmt(balloon(), 1));
    var st = { bath: bath, column: col(), balloon: balloon() }; st['b_' + bath] = balloon(); if (bath >= 60) st.hot = true; if (bath <= 10) st.cold = true; M.set(st);
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.bath != null) { bath = c.bath.eq != null ? c.bath.eq : c.bath; sB.set(bath, true); } if (c.hot) { bath = 70; draw(); } if (c.cold) { bath = 0; draw(); } for (var k in c) { var mm = k.match(/^mark_(\d+)$/); if (mm) { bath = +mm[1]; draw(); mk.click(); } } if (c.marks) [0, 20, 40, 60, 80].forEach(function (b) { bath = b; draw(); mk.click(); }); sB.set(bath, true); draw(); } };
};

/* ------------------------------------------------------------------ */
/* States Chart: which substances are solid, liquid, gas at a temperature */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.stateChart = function (M) {
  var K = M.kit, S = M.state;
  var SUBS = [['Oxygen', -218, -183, '🫧'], ['Ethanol', -114, 78, '🧪'], ['Mercury', -39, 357, '🌡'], ['Water', 0, 100, '💧'], ['Candle wax', 60, 370, '🕯'], ['Tin', 232, 2602, '🥫'], ['Iron', 1538, 2862, '⛓']];
  var T = 20;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 700 340', class: 'sn-svg', role: 'img', 'aria-label': 'Chart of melting and boiling points' });
  M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sT = K.slider({ label: '🌡 Lab temperature', min: -250, max: 3000, step: 1, value: T, unit: '°C', onInput: function (v) { T = v; draw(); } });
  var quick = K.el('<div class="sn-row"><b class="sn-note">Jump to:</b></div>');
  [[-200, 'Deep space freezer −200°'], [-50, 'Antarctic winter −50°'], [20, 'Room 20°'], [100, 'Boiling water 100°'], [500, 'Oven-hot 500°'], [2000, 'Furnace 2,000°']].forEach(function (q) { quick.appendChild(K.btn(q[1], function () { T = q[0]; sT.set(T, true); draw(); }, 'sm')); });
  ctr.appendChild(sT.el); ctr.appendChild(quick); M.el.appendChild(ctr);
  function X(t) { var s = Math.sign(t) * Math.log10(1 + Math.abs(t)); return 90 + (s + 2.45) / (3.5 + 2.45) * 590; }
  function state(s) { return T < s[1] ? 'solid' : T < s[2] ? 'liquid' : 'gas'; }
  function draw() {
    var h = '<rect width="700" height="340" fill="#fff"/>';
    SUBS.forEach(function (s, i) {
      var y = 30 + i * 40, x1 = X(s[1]), x2 = X(s[2]);
      h += '<text x="10" y="' + (y + 20) + '" font-size="13" font-weight="800" fill="#1d2433">' + s[3] + ' ' + s[0] + '</text>';
      h += '<rect x="90" y="' + (y + 6) + '" width="' + (x1 - 90) + '" height="20" fill="#a5d8ff"/><rect x="' + x1 + '" y="' + (y + 6) + '" width="' + (x2 - x1) + '" height="20" fill="#74c0fc"/><rect x="' + x2 + '" y="' + (y + 6) + '" width="' + (680 - x2) + '" height="20" fill="#ffd8a8"/>';
      var st = state(s); h += '<text x="686" y="' + (y + 21) + '" font-size="11" font-weight="800" fill="' + (st === 'gas' ? '#e8590c' : st === 'liquid' ? '#1971c2' : '#495057') + '" text-anchor="end">' + st.toUpperCase() + '</text>';
    });
    [-200, -100, -10, 0, 10, 100, 1000].forEach(function (t) { h += '<text x="' + X(t) + '" y="320" font-size="10" text-anchor="middle" fill="#495057">' + t + '°</text><line x1="' + X(t) + '" x2="' + X(t) + '" y1="305" y2="310" stroke="#495057"/>'; });
    h += '<line x1="' + X(T) + '" x2="' + X(T) + '" y1="20" y2="305" stroke="#e03131" stroke-width="3"/><text x="' + X(T) + '" y="16" font-size="12" font-weight="800" fill="#e03131" text-anchor="middle">' + T + ' °C</text>';
    h += '<text x="200" y="336" font-size="11" fill="#495057">Key: light blue = solid, blue = liquid, orange = gas. The scale squeezes very big numbers.</text>';
    svg.innerHTML = h;
    var st = { T: T }; SUBS.forEach(function (s) { st['s_' + s[0].split(' ')[0].toLowerCase()] = state(s); }); st.liquids = SUBS.filter(function (s) { return state(s) === 'liquid'; }).length; st.gases = SUBS.filter(function (s) { return state(s) === 'gas'; }).length; M.set(st);
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.T != null) T = c.T.eq != null ? c.T.eq : c.T.gte != null ? c.T.gte : c.T.lte != null ? c.T.lte : c.T; if (typeof st.goal.check === 'function') { for (var t = -250; t <= 3000; t++) { T = t; draw(); if (st.goal.check(M.state)) break; } } sT.set(T, true); draw(); } };
};
