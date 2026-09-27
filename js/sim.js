/*
 * Sunnyside Simulators: the simulation engine.
 *
 * SunnySim() returns { run, kit, css }.
 *   run(mount, def, opts) plays one simulation. `def` is a simulation from data/sims-*.js and
 *   its interactive model comes from SUNNY_MODELS[def.model] (js/models-*.js).
 *
 * A simulation is a list of steps. Each step can have:
 *   goal:  something students must DO in the model (checked against the model's live state)
 *   q:     a question (mc, multi, predict, num, text, order, sort, table, write)
 *   sheet: the lab sheet box where students record it on paper
 * Students always see cause and effect first (goal), then explain what they observed (q).
 *
 * The engine is self-contained (no globals besides SUNNY_MODELS) so its source can be copied
 * into a single standalone HTML file for Canvas.
 */
function SunnySim() {
  'use strict';
  var MODELS = typeof SUNNY_MODELS !== 'undefined' ? SUNNY_MODELS : {};

  /* ======================================================================
   * Kit: small helpers shared by every model
   * ==================================================================== */
  var NS = 'http://www.w3.org/2000/svg';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = String(html).trim(); return t.content.firstElementChild; }
  function svgEl(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function round(v, d) { var p = Math.pow(10, d || 0); return Math.round(v * p) / p; }
  function fmt(v, d) { d = d == null ? 2 : d; var s = round(v, d).toFixed(d); if (d > 0) s = s.replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; }
  function money(v) { return (v < 0 ? '−$' : '$') + Math.abs(v).toFixed(2); }
  function hash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = hash(seed) || 1; return function () { a ^= a << 13; a ^= a >>> 17; a ^= a << 5; return ((a >>> 0) % 100000) / 100000; }; }
  function norm(s) { return String(s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[^a-z0-9.'"\-\s/]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function words(s) { return norm(s).split(' ').filter(Boolean); }
  function parseNum(s) {
    s = String(s == null ? '' : s).trim().replace(/[$,]/g, '').replace(/[−–]/g, '-');
    var m = s.match(/^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/); if (m) return (m[1] ? -1 : 1) * (+m[2] + +m[3] / +m[4]);
    m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/); if (m) return +m[1] / +m[2];
    s = s.replace(/\s+/g, ''); if (s === '' || isNaN(+s)) return NaN;
    return +s;
  }

  function slider(o) {
    var id = 'sl' + Math.random().toString(36).slice(2, 8);
    var e = el('<label class="sn-slider" for="' + id + '"><span class="sn-sl-l">' + esc(o.label) + '</span><input id="' + id + '" type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + o.value + '"><output class="sn-sl-v"></output></label>');
    var inp = e.querySelector('input'), out = e.querySelector('output');
    function show() { out.textContent = (o.fmt ? o.fmt(+inp.value) : inp.value) + (o.unit ? ' ' + o.unit : ''); }
    inp.addEventListener('input', function () { show(); if (o.onInput) o.onInput(+inp.value); });
    show();
    return { el: e, get: function () { return +inp.value; }, set: function (v, quiet) { inp.value = v; show(); if (!quiet && o.onInput) o.onInput(+inp.value); }, disable: function (b) { inp.disabled = !!b; e.classList.toggle('off', !!b); } };
  }
  function btn(label, onClick, cls) { var b = el('<button type="button" class="sn-b ' + (cls || '') + '">' + label + '</button>'); b.addEventListener('click', onClick); return b; }
  function readout(label, unit, big) {
    var e = el('<div class="sn-read' + (big ? ' big' : '') + '"><span class="sn-read-l">' + esc(label) + '</span><b class="sn-read-v">—</b>' + (unit ? '<span class="sn-read-u">' + esc(unit) + '</span>' : '') + '</div>');
    var v = e.querySelector('b');
    return { el: e, set: function (x) { v.textContent = x; } };
  }
  function toggle(label, on, onChange) {
    var e = el('<label class="sn-tog"><input type="checkbox"' + (on ? ' checked' : '') + '><span></span>' + esc(label) + '</label>'), i = e.querySelector('input');
    i.addEventListener('change', function () { onChange(i.checked); });
    return { el: e, get: function () { return i.checked; }, set: function (b) { i.checked = !!b; } };
  }
  function seg(options, value, onChange) { // segmented buttons
    var e = el('<div class="sn-seg" role="group"></div>');
    options.forEach(function (op) {
      var b = el('<button type="button" data-v="' + esc(op[0]) + '">' + op[1] + '</button>');
      b.addEventListener('click', function () { set(op[0]); onChange(op[0]); });
      e.appendChild(b);
    });
    function set(v) { Array.prototype.forEach.call(e.children, function (b) { b.classList.toggle('on', b.getAttribute('data-v') === String(v)); b.setAttribute('aria-pressed', b.getAttribute('data-v') === String(v)); }); }
    set(value);
    return { el: e, set: set };
  }

  // Pointer dragging for an SVG or HTML element. Coordinates are in the SVG's viewBox units
  // when `svg` is given. Arrow keys move the element too, so it works without a mouse.
  function drag(target, o) {
    var on = false, off = [0, 0];
    function pt(ev) {
      if (o.svg) { var p = o.svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; var m = o.svg.getScreenCTM(); if (!m) return [0, 0]; p = p.matrixTransform(m.inverse()); return [p.x, p.y]; }
      var r = (o.box || target.parentNode).getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top];
    }
    target.style.touchAction = 'none'; target.style.cursor = 'grab';
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '0');
    target.addEventListener('pointerdown', function (ev) {
      if (o.enabled && !o.enabled()) return;
      ev.preventDefault(); on = true; target.setPointerCapture && target.setPointerCapture(ev.pointerId);
      var p = pt(ev), c = o.pos ? o.pos() : [0, 0]; off = [p[0] - c[0], p[1] - c[1]];
      target.style.cursor = 'grabbing'; if (o.start) o.start(p[0] - off[0], p[1] - off[1]);
    });
    target.addEventListener('pointermove', function (ev) { if (!on) return; var p = pt(ev); if (o.move) o.move(p[0] - off[0], p[1] - off[1]); });
    function up(ev) { if (!on) return; on = false; target.style.cursor = 'grab'; var p = pt(ev); if (o.end) o.end(p[0] - off[0], p[1] - off[1]); }
    target.addEventListener('pointerup', up); target.addEventListener('pointercancel', up);
    target.addEventListener('keydown', function (ev) {
      var d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key];
      if (ev.key === 'Enter' || ev.key === ' ') { if (o.key) { ev.preventDefault(); o.key(); } return; }
      if (!d || !o.pos) return; ev.preventDefault();
      var c = o.pos(), s = o.keyStep || 10; if (o.start) o.start(c[0], c[1]); if (o.move) o.move(c[0] + d[0] * s, c[1] + d[1] * s); if (o.end) o.end(c[0] + d[0] * s, c[1] + d[1] * s);
    });
  }

  // A live line graph (SVG). series: [{name, color}]
  function graph(o) {
    var W = o.w || 360, H = o.h || 220, L = 46, B = 34, T = 12, R = 12;
    var e = el('<figure class="sn-graph"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'Graph') + '"></svg>' + (o.title ? '<figcaption>' + esc(o.title) + '</figcaption>' : '') + '</figure>');
    var s = e.querySelector('svg'), data = (o.series || [{}]).map(function () { return []; }), xMax = o.xMax || 10, yMax = o.yMax || 10, yMin = o.yMin || 0;
    function X(x) { return L + (x / xMax) * (W - L - R); } function Y(y) { return H - B - ((y - yMin) / (yMax - yMin)) * (H - B - T); }
    function draw() {
      s.innerHTML = '';
      svgEl('rect', { x: L, y: T, width: W - L - R, height: H - B - T, fill: 'var(--sn-card)', stroke: 'var(--sn-line)' }, s);
      for (var i = 0; i <= 4; i++) {
        var yv = yMin + (yMax - yMin) * i / 4, yy = Y(yv);
        svgEl('line', { x1: L, x2: W - R, y1: yy, y2: yy, stroke: 'var(--sn-line)', 'stroke-dasharray': '3 3' }, s);
        svgEl('text', { x: L - 6, y: yy + 4, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--sn-soft)' }, s).textContent = fmt(yv, 1);
        var xv = xMax * i / 4; svgEl('text', { x: X(xv), y: H - B + 15, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--sn-soft)' }, s).textContent = fmt(xv, 1);
      }
      if (yMin < 0) svgEl('line', { x1: L, x2: W - R, y1: Y(0), y2: Y(0), stroke: 'var(--sn-ink)', 'stroke-width': 1.2 }, s);
      svgEl('text', { x: (L + W - R) / 2, y: H - 4, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: 'var(--sn-ink)' }, s).textContent = o.xLabel || '';
      var yl = svgEl('text', { x: 12, y: (T + H - B) / 2, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: 'var(--sn-ink)', transform: 'rotate(-90 12 ' + (T + H - B) / 2 + ')' }, s); yl.textContent = o.yLabel || '';
      data.forEach(function (pts, k) {
        var col = (o.series[k] || {}).color || '#e8590c';
        if (pts.length > 1) svgEl('polyline', { points: pts.map(function (p) { return X(Math.min(p[0], xMax)) + ',' + Y(clamp(p[1], yMin, yMax)); }).join(' '), fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linejoin': 'round' }, s);
        if (o.dots) pts.forEach(function (p) { svgEl('circle', { cx: X(p[0]), cy: Y(clamp(p[1], yMin, yMax)), r: 4, fill: col }, s); });
      });
      if (o.series && o.series.length > 1) o.series.forEach(function (sr, k) {
        var x0 = L + 8 + k * 100; svgEl('rect', { x: x0, y: T + 6, width: 12, height: 12, rx: 3, fill: sr.color }, s);
        svgEl('text', { x: x0 + 16, y: T + 16, 'font-size': 11, fill: 'var(--sn-ink)' }, s).textContent = sr.name;
      });
    }
    draw();
    return { el: e, add: function (k, x, y) { data[k].push([x, y]); if (x > xMax && o.grow) xMax = Math.ceil(x * 1.25); draw(); }, set: function (k, pts) { data[k] = pts.slice(); draw(); }, clear: function () { data = data.map(function () { return []; }); draw(); }, range: function (a, b, c) { xMax = a; yMax = b; if (c != null) yMin = c; draw(); }, data: function () { return data; } };
  }

  var KIT = { esc: esc, el: el, svgEl: svgEl, clamp: clamp, round: round, fmt: fmt, money: money, hash: hash, rng: rng, norm: norm, words: words, parseNum: parseNum, slider: slider, btn: btn, readout: readout, toggle: toggle, seg: seg, drag: drag, graph: graph };

  /* ======================================================================
   * Levels and ranks
   * ==================================================================== */
  var LEVELS = {
    explorer: { name: 'Explorer', icon: '🧭', blurb: 'Hints are open, a "remove a wrong answer" tool, sentence starters, and a word bank.', removes: 2, hintAfter: 0, starters: true, stars: 1 },
    scientist: { name: 'Investigator', icon: '🔎', blurb: 'The standard mission. A hint unlocks after one try.', removes: 0, hintAfter: 1, starters: false, stars: 1 },
    legend: { name: 'Legend', icon: '🏆', blurb: 'Extra challenge steps, tougher writing checks, and no word bank.', removes: 0, hintAfter: 2, starters: false, stars: 1, extra: true }
  };
  var LVKEYS = ['explorer', 'scientist', 'legend'];
  var TAGS = { read: 'Read', explore: 'Explore', predict: 'Predict', test: 'Test', observe: 'Observe', record: 'Record data', explain: 'Explain', apply: 'Apply', write: 'Write', reason: 'Reason', check: 'Check', challenge: 'Legend challenge', model: 'Watch and learn', practice: 'Practice', sort: 'Sort' };


  /* ======================================================================
   * run(): play one simulation
   * ==================================================================== */
  function run(mount, def, opts) {
    opts = opts || {};
    var doc = mount.ownerDocument || document;
    injectCSS(doc);
    var subject = def.subject || 'science';
    var store = null; try { store = window.localStorage; } catch (e) { store = null; }
    var KEY = 'sunny:' + def.id;
    var S = load() || { level: null, i: 0, done: {}, stars: {}, tries: {}, answers: {}, removed: {}, drafts: {}, sup: {}, started: false };
    if (opts.level && !S.level) S.level = opts.level;
    var steps = [];
    var model = null, M = null;

    function save() { if (opts.preview || opts.demo) return; try { if (store) store.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage off */ } }
    function load() { if (opts.fresh || opts.demo) return null; try { var t = store && store.getItem('sunny:' + def.id); return t ? JSON.parse(t) : null; } catch (e) { return null; } }

    function buildSteps() {
      var lv = S.level || 'scientist';
      steps = def.steps.filter(function (st) { return !st.levels || st.levels.indexOf(lv) >= 0; }).map(function (st, k) {
        var o = {}; for (var a in st) if (LVKEYS.indexOf(a) < 0) o[a] = st[a];
        var ov = st[lv]; if (ov) for (var b in ov) o[b] = ov[b];
        if (o.q && o.q[lv]) { var q2 = {}; for (var c in o.q) if (LVKEYS.indexOf(c) < 0) q2[c] = o.q[c]; for (var d in o.q[lv]) q2[d] = o.q[lv][d]; o.q = q2; }
        o.key = st.id || ('s' + def.steps.indexOf(st));
        return o;
      });
    }

    /* ---------- shell ---------- */
    var root = el('<div class="sn sn-' + esc(subject) + (opts.demo ? ' sn-demo' : '') + '" data-theme-subject="' + esc(subject) + '"></div>');
    mount.innerHTML = ''; mount.appendChild(root);
    var SUBJ = { science: ['🔬', 'Science Lab'], math: ['📐', 'Math World'], ela: ['📖', 'Reading Room'], social: ['🧭', 'Expedition'] }[subject] || ['☀️', 'Lab'];

    function shell() {
      root.innerHTML =
        '<header class="sn-top">' +
          '<div class="sn-brand"><span class="sn-sun" aria-hidden="true">☀</span><span class="sn-brand-t">Sunnyside<br><small>Simulators</small></span></div>' +
          '<div class="sn-title"><span class="sn-kick">' + SUBJ[0] + ' ' + esc(SUBJ[1]) + ' · Grade ' + esc(def.grade) + ' · ' + esc(def.code || '') + '</span><h1>' + esc(def.title) + '</h1></div>' +
          '<div class="sn-progress" aria-label="Progress"></div>' +
          '<div class="sn-tools">' + (opts.demo ? '' : '<button type="button" class="sn-tb" data-sup>♿ Supports</button><span class="sn-lvl" data-lvl></span>') + '<span class="sn-stars" data-stars></span></div>' +
        '</header>' +
        '<div class="sn-body"><section class="sn-stage" aria-label="Simulation"><div class="sn-scene"></div></section>' +
        '<aside class="sn-guide" aria-label="Lab guide"><div class="sn-log"></div><div class="sn-card-wrap" aria-live="polite"></div></aside></div>' +
        '<div class="sn-drawer" hidden></div><div class="sn-ruler" hidden></div><div class="sn-toast" role="status" aria-live="polite"></div>';
      var supB = root.querySelector('[data-sup]'); if (supB) supB.addEventListener('click', function () { toggleDrawer(); });
    }

    function toast(t, bad) { var e = root.querySelector('.sn-toast'); e.textContent = t; e.className = 'sn-toast show' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(function () { e.className = 'sn-toast'; }, 2200); }

    /* ---------- model ---------- */
    function startModel() {
      var host = root.querySelector('.sn-scene');
      var listeners = [], loops = [], timers = [];
      M = {
        el: host, def: def, cfg: def.setup || {}, state: {}, kit: KIT, level: function () { return S.level || 'scientist'; }, subject: subject,
        set: function (k, v) { if (typeof k === 'object') { for (var a in k) M.state[a] = k[a]; } else M.state[k] = v; changed(); },
        bump: function (k, n) { M.state[k] = (M.state[k] || 0) + (n == null ? 1 : n); changed(); },
        push: function (k, v) { (M.state[k] = M.state[k] || []).push(v); changed(); },
        on: function (fn) { listeners.push(fn); },
        loop: function (fn) {
          var last = 0, alive = true, rec = { stop: function () { alive = false; } };
          function tick(t) { if (!alive || !root.isConnected) return; var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t; fn(dt); requestAnimationFrame(tick); }
          requestAnimationFrame(tick); loops.push(rec); return rec;
        },
        after: function (ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; },
        toast: toast,
        lock: function (names) { M.locked = names || []; if (model && model.lock) model.lock(M.locked); }
      };
      var maker = MODELS[def.model];
      if (!maker) { host.innerHTML = '<div class="sn-missing">This simulation\'s model (' + esc(def.model) + ') is missing.</div>'; model = {}; return; }
      model = maker(M) || {};
      M.destroy = function () { loops.forEach(function (l) { l.stop(); }); timers.forEach(clearTimeout); };
    }
    var lastSig = '';
    function changed() {
      var st = steps[S.i]; if (!st || !st.goal || S.done[st.key]) return;
      var sig = goalMet(st) ? 1 : 0; if (String(sig) === lastSig) return; lastSig = String(sig);
      paintGoal(st);
    }
    function goalMet(st) {
      var g = st.goal; if (!g) return true; if (!M) return false;
      if (S.done[st.key] || S.goalOK && S.goalOK[st.key]) return true;
      try { return !!(typeof g.check === 'function' ? g.check(M.state, S) : evalCheck(g.check, M.state)); } catch (e) { return false; }
    }
    // Declarative checks: {key: value} (all must match), {key: {gte, lte, eq, has, len}}.
    function evalCheck(c, s) {
      if (!c) return true;
      for (var k in c) {
        var want = c[k], got = s[k];
        if (want && typeof want === 'object' && !Array.isArray(want)) {
          if ('gte' in want && !(got >= want.gte)) return false;
          if ('lte' in want && !(got <= want.lte)) return false;
          if ('eq' in want && got !== want.eq) return false;
          if ('ne' in want && got === want.ne) return false;
          if ('has' in want && !(got && got.indexOf && [].concat(want.has).every(function (h) { return got.indexOf(h) >= 0; }))) return false;
          if ('len' in want && !((got || []).length >= want.len)) return false;
        } else if (got !== want) return false;
      }
      return true;
    }

    /* ---------- start screen ---------- */
    function startScreen() {
      var host = root.querySelector('.sn-card-wrap');
      root.querySelector('.sn-log').innerHTML = '';
      var lvHTML = LVKEYS.map(function (k) { var L = LEVELS[k]; return '<button type="button" class="sn-lvcard' + (S.level === k ? ' on' : '') + '" data-pick="' + k + '"><span class="sn-lvi">' + L.icon + '</span><b>' + L.name + '</b><small>' + esc(L.blurb) + '</small></button>'; }).join('');
      host.innerHTML = '<div class="sn-card sn-start">' +
        '<div class="sn-place">' + esc(def.place || SUBJ[1]) + '</div>' +
        '<h2>' + esc(def.title) + '</h2>' +
        '<p class="sn-mission">' + esc(def.mission || '') + '</p>' +
        '<div class="sn-bigq"><span>Your question to investigate</span><b>' + esc(def.question || '') + '</b></div>' +
        '<div class="sn-sheetnote"><span class="sn-paper" aria-hidden="true">📄</span><div><b>Have your lab sheet and a pencil ready.</b> When a step shows <span class="sn-sheetb">Sheet ①</span>, write your answer in that box on paper. Your lab sheet is what you turn in.</div></div>' +
        (opts.level && opts.lockLevel ? '' : '<h3>Choose your level</h3><div class="sn-lvgrid">' + lvHTML + '</div>') +
        '<button type="button" class="sn-b primary big" data-go' + (S.level ? '' : ' disabled') + '>Start the simulation →</button>' +
        (S.started && S.i > 0 ? '<p class="sn-small">Your progress is saved. You will pick up at step ' + (S.i + 1) + '.</p>' : '') +
        '</div>';
      host.querySelectorAll('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { S.level = b.getAttribute('data-pick'); host.querySelectorAll('[data-pick]').forEach(function (x) { x.classList.toggle('on', x === b); }); host.querySelector('[data-go]').disabled = false; }); });
      host.querySelector('[data-go]').addEventListener('click', function () {
        if (!S.level) return; if (!S.started) { S.started = true; S.i = 0; } buildSteps(); save(); paintTop(); render();
      });
    }

    /* ---------- top bar ---------- */
    function starsTotal() { var n = 0; for (var k in S.stars) n += S.stars[k]; return n; }
    function starsMax() { return steps.filter(function (s) { return s.q && s.q.type !== 'predict'; }).length * 3; }
    function paintTop() {
      var p = root.querySelector('.sn-progress');
      if (!S.level || !steps.length) { p.innerHTML = ''; } else p.innerHTML = steps.map(function (st, k) { return '<span class="sn-dot' + (S.done[st.key] ? ' done' : '') + (k === S.i ? ' now' : '') + '" title="' + esc((TAGS[st.tag] || 'Step') + ': ' + (st.title || '')) + '"></span>'; }).join('') + '<span class="sn-pct">Step ' + Math.min(S.i + 1, steps.length) + ' of ' + steps.length + '</span>';
      var l = root.querySelector('[data-lvl]'); if (l) l.innerHTML = S.level ? LEVELS[S.level].icon + ' ' + LEVELS[S.level].name : '';
      var s = root.querySelector('[data-stars]'); if (s) s.textContent = S.level ? '⭐ ' + starsTotal() : '';
    }

    /* ---------- guide ---------- */
    function circ(n) { return n == null ? '' : ('①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳'.charAt(n - 1) || n); }
    function fill(t) { // {{pred:stepId}} shows a saved prediction; {{val:key}} shows model state
      return esc(t || '').replace(/\{\{pred:([\w-]+)\}\}/g, function (_, k) { var a = S.answers[k]; return '<b class="sn-pred">' + esc(a == null ? '(no prediction)' : a) + '</b>'; })
        .replace(/\{\{val:([\w.]+)\}\}/g, function (_, k) { var v = M && M.state[k]; return '<b>' + esc(v == null ? '—' : v) + '</b>'; })
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    }

    function render() {
      if (!S.level) { startScreen(); return; }
      if (S.i >= steps.length) { finish(); return; }
      var st = steps[S.i];
      lastSig = '';
      if (st.setup && model.setup && !S['setup' + st.key]) { model.setup(st.setup, st); }
      if (model.step) model.step(st, S.i);
      paintLog(); paintTop();
      var host = root.querySelector('.sn-card-wrap');
      var lv = LEVELS[S.level];
      var h = '<article class="sn-card sn-step" data-tag="' + esc(st.tag || '') + '">' +
        '<div class="sn-sh"><span class="sn-tag t-' + esc(st.tag || 'step') + '">' + esc(TAGS[st.tag] || 'Step') + '</span>' + (st.sheet ? '<span class="sn-sheetb" title="Write this on your lab sheet">Sheet ' + circ(st.sheet) + '</span>' : '') + '</div>' +
        '<h2>' + esc(st.title || '') + '</h2>' +
        (st.text ? '<div class="sn-text">' + fill(st.text) + '</div>' : '') +
        (st.idea ? '<div class="sn-idea"><span>Key idea</span>' + fill(st.idea) + '</div>' : '') +
        (st.strategy ? '<div class="sn-strat"><span>Strategy</span>' + fill(st.strategy) + '</div>' : '') +
        (st.goal ? '<div class="sn-goal" data-goal><span class="sn-gi">▶</span><div><b>Do it:</b> ' + fill(st.goal.text) + (st.goal.hint && (lv.hintAfter === 0) ? '<div class="sn-ghint">Tip: ' + fill(st.goal.hint) + '</div>' : '') + '</div>' + (st.goal.button ? '<button type="button" class="sn-b" data-gcheck>' + esc(st.goal.button) + '</button>' : '') + '</div><div class="sn-gfb" data-gfb></div>' : '') +
        '<div class="sn-q" data-q></div>' +
        '<div class="sn-nav"><button type="button" class="sn-b ghost" data-back' + (S.i ? '' : ' disabled') + '>← Back</button><button type="button" class="sn-b primary" data-next disabled>Next →</button></div>' +
        '</article>';
      host.innerHTML = h;
      host.querySelector('[data-back]').addEventListener('click', function () { if (S.i > 0) { S.i--; save(); render(); } });
      host.querySelector('[data-next]').addEventListener('click', next);
      var gb = host.querySelector('[data-gcheck]');
      if (gb) gb.addEventListener('click', function () {
        var ok = goalMet(st), fb = host.querySelector('[data-gfb]');
        if (ok) { S.goalOK = S.goalOK || {}; S.goalOK[st.key] = true; fb.innerHTML = '<div class="sn-fb ok">✓ ' + fill(st.goal.yes || 'Yes! You found it.') + '</div>'; save(); paintGoal(st); }
        else { S.tries[st.key + 'g'] = (S.tries[st.key + 'g'] || 0) + 1; var w = typeof st.goal.why === 'function' ? st.goal.why(M.state) : st.goal.no; fb.innerHTML = '<div class="sn-fb no">✗ ' + fill(w || 'Not yet. Look again.') + (st.goal.hint && S.tries[st.key + 'g'] >= 1 ? '<br><i>Hint: ' + fill(st.goal.hint) + '</i>' : '') + '</div>'; }
      });
      paintGoal(st);
      if (opts.onStep) opts.onStep(S.i, st);
      if (S.sup.read) speak(stepSpeech(st));
    }
    function stepSpeech(st) { return [st.title, st.text, st.idea, st.goal && ('Do it: ' + st.goal.text), st.q && st.q.q].filter(Boolean).join('. ').replace(/\*\*/g, '').replace(/\{\{[^}]+\}\}/g, ''); }

    function paintGoal(st) {
      var host = root.querySelector('.sn-card-wrap'); if (!host) return;
      var g = host.querySelector('[data-goal]'), met = goalMet(st);
      if (g) { g.classList.toggle('met', met); g.querySelector('.sn-gi').textContent = met ? '✓' : '▶'; }
      var qh = host.querySelector('[data-q]');
      if (st.q) {
        if (met && !qh.getAttribute('data-built')) { qh.setAttribute('data-built', '1'); buildQ(st, qh); }
        else if (!met && !qh.getAttribute('data-built')) qh.innerHTML = '<div class="sn-locked">🔒 The question opens after you do the step above in the simulation.</div>';
      } else if (met && !S.done[st.key]) { S.done[st.key] = true; save(); }
      setNext(st);
    }
    function setNext(st) {
      var n = root.querySelector('[data-next]'); if (!n) return;
      var ok = S.done[st.key] || (!st.q && goalMet(st));
      n.disabled = !ok; n.textContent = S.i === steps.length - 1 ? 'Finish ✓' : 'Next →';
      if (ok && !S.done[st.key]) { S.done[st.key] = true; save(); }
      if (ok) paintTopDots();
    }
    function paintTopDots() { paintTop(); }
    function next() { S.i++; save(); render(); var g = root.querySelector('.sn-guide'); if (g) g.scrollTop = 0; }

    function paintLog() {
      var log = root.querySelector('.sn-log'), n = Math.min(S.i, steps.length);
      if (!n) { log.innerHTML = ''; return; }
      var open = !!S.logOpen;
      log.innerHTML = '<button type="button" class="sn-logt" data-logt aria-expanded="' + open + '"><span>✓ ' + n + ' step' + (n > 1 ? 's' : '') + ' done</span><span>' + (open ? 'Hide ▲' : 'Review ▼') + '</span></button>' + (open ? steps.slice(0, n).map(function (st, k) {
        var a = S.answers[st.key];
        return '<button type="button" class="sn-logi" data-jump="' + k + '"><span class="sn-logn">' + (k + 1) + '</span><span>' + esc(st.title) + (a != null && typeof a !== 'object' ? '<em>' + esc(String(a).slice(0, 60)) + '</em>' : '') + '</span>' + (S.stars[st.key] ? '<span class="sn-logs">' + '★★★'.slice(0, S.stars[st.key]) + '</span>' : '<span class="sn-logs">✓</span>') + '</button>';
      }).join('') : '');
      log.querySelector('[data-logt]').addEventListener('click', function () { S.logOpen = !S.logOpen; paintLog(); });
      log.querySelectorAll('[data-jump]').forEach(function (b) { b.addEventListener('click', function () { S.i = +b.getAttribute('data-jump'); save(); render(); }); });
    }

    /* ---------- questions ---------- */
    function award(st, assisted) {
      if (S.done[st.key]) return;
      var t = S.tries[st.key] || 0, s = assisted ? 1 : t <= 0 ? 3 : t === 1 ? 2 : 1;
      if (st.q.type !== 'predict') S.stars[st.key] = s;
      S.done[st.key] = true; save(); setNext(st); paintTop();
      if (s === 3 && st.q.type !== 'predict') { var st0 = root.querySelector('[data-stars]'); if (st0) { st0.classList.remove('pop'); void st0.offsetWidth; st0.classList.add('pop'); } }
    }
    function miss(st) { S.tries[st.key] = (S.tries[st.key] || 0) + 1; save(); }
    function hintHTML(st) {
      var q = st.q, lv = LEVELS[S.level], t = S.tries[st.key] || 0;
      if (!q.hint || t < lv.hintAfter) return '';
      return '<div class="sn-hint"><b>Hint:</b> ' + fill(q.hint) + '</div>';
    }
    function fbBox(ok, msg) { return '<div class="sn-fb ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓ ' : '✗ ') + fill(msg) + '</div>'; }
    function showMe(st, qh, ansText) {
      if ((S.tries[st.key] || 0) < 3 || S.done[st.key]) return '';
      return '<button type="button" class="sn-b ghost sm" data-showme>Show me the answer</button>';
    }

    function buildQ(st, qh) {
      var q = st.q, T = Q[q.type] || Q.mc;
      qh.innerHTML = '<div class="sn-qq">' + fill(q.q) + '</div><div class="sn-qbody"></div><div class="sn-qfb" data-fb></div>';
      T(st, q, qh.querySelector('.sn-qbody'), qh.querySelector('[data-fb]'));
    }

    function afterWrong(st, fbEl, msg, reveal) {
      miss(st);
      fbEl.innerHTML = fbBox(false, msg || 'Not quite. Look at the simulation again.') + hintHTML(st) + showMe(st);
      var sm = fbEl.querySelector('[data-showme]');
      if (sm) sm.addEventListener('click', function () { reveal(); award(st, true); });
    }
    function afterRight(st, fbEl, msg) { fbEl.innerHTML = fbBox(true, msg || 'Correct!') + (st.q.why ? '<div class="sn-why"><b>Why:</b> ' + fill(st.q.why) + '</div>' : ''); award(st); }

    var Q = {};
    Q.mc = function (st, q, body, fb) {
      var lv = LEVELS[S.level], order = q.choices.map(function (_, k) { return k; });
      if (!q.keep) { var r = rng(def.id + st.key); for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; } }
      var removed = S.removed[st.key] || [];
      body.innerHTML = '<div class="sn-choices' + (q.choices.length > 4 || q.grid ? ' grid' : '') + '">' + order.map(function (k, n) { return '<button type="button" class="sn-ch' + (removed.indexOf(k) >= 0 ? ' gone' : '') + '" data-k="' + k + '"' + (removed.indexOf(k) >= 0 ? ' disabled' : '') + '><span class="sn-chl">' + 'ABCDEFGH'[n] + '</span><span>' + fill(q.choices[k]) + '</span></button>'; }).join('') + '</div>' +
        (lv.removes && q.type !== 'predict' && q.choices.length > 2 ? '<button type="button" class="sn-b ghost sm" data-remove>✂ Remove a wrong answer</button>' : '');
      if (S.done[st.key]) { var ak = q.type === 'predict' ? q.choices.indexOf(S.answers[st.key]) : q.answer; var b0 = body.querySelector('[data-k="' + ak + '"]'); if (b0) b0.classList.add(q.type === 'predict' ? 'picked' : 'right'); fb.innerHTML = q.type === 'predict' ? fbBox(true, 'Prediction saved. Now test it!') : fbBox(true, 'Answered.') + (q.why ? '<div class="sn-why"><b>Why:</b> ' + fill(q.why) + '</div>' : ''); return; }
      body.querySelectorAll('[data-k]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (S.done[st.key] && q.type !== 'predict') return;
          var k = +b.getAttribute('data-k');
          if (q.type === 'predict') {
            body.querySelectorAll('[data-k]').forEach(function (x) { x.classList.toggle('picked', x === b); });
            S.answers[st.key] = q.choices[k]; fb.innerHTML = fbBox(true, 'Prediction saved: "' + q.choices[k] + '". Write it on your lab sheet, then test it in the simulation.'); award(st); return;
          }
          if (k === q.answer) { b.classList.add('right'); S.answers[st.key] = q.choices[k]; afterRight(st, fb, (q.fb && q.fb[k]) || q.yes); }
          else { b.classList.add('wrong'); b.disabled = true; afterWrong(st, fb, (q.fb && q.fb[k]) || q.no, function () { var rb = body.querySelector('[data-k="' + q.answer + '"]'); rb.classList.add('right'); S.answers[st.key] = q.choices[q.answer]; }); }
        });
      });
      var rm = body.querySelector('[data-remove]');
      if (rm) rm.addEventListener('click', function () {
        var used = (S.removed[st.key] || []), left = order.filter(function (k) { return k !== q.answer && used.indexOf(k) < 0 && !body.querySelector('[data-k="' + k + '"]').disabled; });
        if (used.length >= lv.removes || left.length <= 1) { toast('No more removals for this question.'); return; }
        var k = left[Math.floor(Math.random() * left.length)]; used.push(k); S.removed[st.key] = used; save();
        var b = body.querySelector('[data-k="' + k + '"]'); b.classList.add('gone'); b.disabled = true;
      });
    };
    Q.predict = Q.mc;

    Q.multi = function (st, q, body, fb) {
      body.innerHTML = '<p class="sn-small">Choose all that are true.</p><div class="sn-choices">' + q.choices.map(function (c, k) { return '<label class="sn-ch sn-chk"><input type="checkbox" data-k="' + k + '"><span>' + fill(c) + '</span></label>'; }).join('') + '</div><button type="button" class="sn-b primary" data-check>Check</button>';
      if (S.done[st.key]) { q.answer.forEach(function (k) { body.querySelector('[data-k="' + k + '"]').checked = true; }); fb.innerHTML = fbBox(true, 'Answered.'); return; }
      body.querySelector('[data-check]').addEventListener('click', function () {
        var sel = []; body.querySelectorAll('[data-k]').forEach(function (i) { if (i.checked) sel.push(+i.getAttribute('data-k')); });
        var want = q.answer.slice().sort().join(','), got = sel.sort().join(',');
        if (got === want) afterRight(st, fb, q.yes);
        else { var extra = sel.filter(function (k) { return q.answer.indexOf(k) < 0; }).length, missing = q.answer.filter(function (k) { return sel.indexOf(k) < 0; }).length; afterWrong(st, fb, (extra ? extra + ' of your choices ' + (extra > 1 ? 'are' : 'is') + ' not true. ' : '') + (missing ? 'You missed ' + missing + '.' : ''), function () { body.querySelectorAll('[data-k]').forEach(function (i) { i.checked = q.answer.indexOf(+i.getAttribute('data-k')) >= 0; }); }); }
      });
    };

    Q.num = function (st, q, body, fb) {
      body.innerHTML = '<div class="sn-inrow"><input type="text" inputmode="decimal" class="sn-in" aria-label="Your answer" autocomplete="off" value="' + esc(S.drafts[st.key] || '') + '">' + (q.unit ? '<span class="sn-unit">' + esc(q.unit) + '</span>' : '') + '<button type="button" class="sn-b primary" data-check>Check</button></div>' + (q.work ? '<label class="sn-work"><span>Show your thinking (how did you figure it out?)</span><textarea rows="2" data-work>' + esc(S.drafts[st.key + 'w'] || '') + '</textarea></label>' : '');
      var inp = body.querySelector('input'), wk = body.querySelector('[data-work]');
      inp.addEventListener('input', function () { S.drafts[st.key] = inp.value; save(); });
      if (wk) wk.addEventListener('input', function () { S.drafts[st.key + 'w'] = wk.value; save(); });
      function go() {
        var v = parseNum(inp.value), ans = [].concat(q.answer), tol = q.tol == null ? 0.001 : q.tol;
        if (inp.value.trim() === '' || isNaN(v)) { fb.innerHTML = fbBox(false, 'Type a number' + (q.unit ? ' (' + q.unit + ')' : '') + '.'); return; }
        if (wk && words(wk.value).length < (q.workMin || 4)) { fb.innerHTML = fbBox(false, 'Explain your thinking in a few words first. How did you get it?'); return; }
        if (ans.some(function (a) { return Math.abs(v - (typeof a === 'function' ? a(M.state) : a)) <= tol; })) { S.answers[st.key] = inp.value + (q.unit ? ' ' + q.unit : ''); afterRight(st, fb, q.yes); }
        else { var msg = q.no; if (q.traps) q.traps.forEach(function (t) { if (Math.abs(v - t[0]) <= tol) msg = t[1]; }); afterWrong(st, fb, msg, function () { inp.value = typeof ans[0] === 'function' ? ans[0](M.state) : ans[0]; S.answers[st.key] = inp.value; }); }
      }
      body.querySelector('[data-check]').addEventListener('click', go);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      if (S.done[st.key]) { inp.value = S.answers[st.key] ? String(S.answers[st.key]).replace(/\s.*$/, '') : inp.value; fb.innerHTML = fbBox(true, 'Answered.'); }
    };

    // Short constructed response checked for key ideas. need: [[synonyms...], ...] each group must appear.
    Q.text = function (st, q, body, fb) {
      var lv = LEVELS[S.level], start = lv.starters && q.starter ? q.starter : '';
      var d = S.drafts[st.key]; if (d == null) d = start;
      body.innerHTML = '<textarea class="sn-ta" rows="' + (q.rows || 3) + '" aria-label="Your answer" placeholder="' + esc(q.placeholder || 'Write your answer in a complete sentence.') + '">' + esc(d) + '</textarea>' +
        (q.bank && lv.starters ? '<div class="sn-bank"><span>Word bank:</span>' + q.bank.map(function (w) { return '<button type="button" class="sn-chip" data-w="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div>' : '') +
        '<div class="sn-row"><button type="button" class="sn-b primary" data-check>Check my answer</button><span class="sn-wc" data-wc></span></div>';
      var ta = body.querySelector('textarea'), wc = body.querySelector('[data-wc]');
      function count() { wc.textContent = words(ta.value).length + ' words'; }
      ta.addEventListener('input', function () { S.drafts[st.key] = ta.value; save(); count(); }); count();
      body.querySelectorAll('[data-w]').forEach(function (b) { b.addEventListener('click', function () { ta.value = (ta.value.replace(/\s+$/, '') + ' ' + b.getAttribute('data-w')).trim(); ta.dispatchEvent(new Event('input')); ta.focus(); }); });
      body.querySelector('[data-check]').addEventListener('click', function () {
        var r = checkText(ta.value, q, S.level);
        if (r.ok) { S.answers[st.key] = ta.value.trim(); afterRight(st, fb, q.yes || 'Strong answer. Copy it onto your lab sheet.'); fb.innerHTML += r.list; }
        else { miss(st); fb.innerHTML = fbBox(false, 'Almost. Fix the parts marked ✗ and check again.') + r.list + hintHTML(st) + (q.model && (S.tries[st.key] || 0) >= 3 ? '<div class="sn-why"><b>Example answer:</b> ' + fill(q.model) + '</div>' : ''); if ((S.tries[st.key] || 0) >= 4) { S.answers[st.key] = ta.value.trim(); award(st, true); } }
      });
      if (S.done[st.key]) fb.innerHTML = fbBox(true, 'Answered.');
    };
    function checkText(txt, q, level) {
      var t = ' ' + norm(txt) + ' ', rows = [], ok = true, n = words(txt).length;
      var min = q.min || 6; if (level === 'legend' && q.legendMin) min = q.legendMin;
      rows.push([n >= min, 'At least ' + min + ' words (' + n + ' so far)']);
      (q.need || []).forEach(function (g) {
        var grp = g.words || g, label = g.label || ('Uses an idea like "' + grp[0] + '"');
        var hit = grp.some(function (w) { w = norm(w); return w.indexOf(' ') >= 0 || w.length > 4 ? t.indexOf(w) >= 0 : new RegExp('[^a-z0-9]' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^a-z0-9]').test(t); });
        rows.push([hit, label]);
      });
      if (level === 'legend' && q.legendNeed) q.legendNeed.forEach(function (g) { var grp = g.words || g; rows.push([grp.some(function (w) { return t.indexOf(norm(w)) >= 0; }), (g.label || 'Legend: uses "' + grp[0] + '"')]); });
      if (q.number) rows.push([/\d/.test(txt), 'Includes a number from your data']);
      if (q.quote) { var qs = (txt.match(/["“]([^"”]{4,})["”]/g) || []).map(function (x) { return norm(x.replace(/["“”]/g, '')); }); var src = norm(q.quote === true ? (def.passageText || '') : q.quote); rows.push([qs.length > 0 && qs.some(function (x) { return src.indexOf(x) >= 0; }), 'Quotes the text exactly, inside quotation marks']); }
      if (q.avoid) q.avoid.forEach(function (a) { rows.push([t.indexOf(norm(a[0])) < 0, a[1]]); });
      rows.forEach(function (r) { if (!r[0]) ok = false; });
      return { ok: ok, list: '<ul class="sn-crit">' + rows.map(function (r) { return '<li class="' + (r[0] ? 'y' : 'n') + '">' + (r[0] ? '✓ ' : '✗ ') + esc(r[1]) + '</li>'; }).join('') + '</ul>' };
    }

    // Put items in order (buttons move items up and down; also drag).
    Q.order = function (st, q, body, fb) {
      var cur = S.drafts[st.key] || shuffleIdx(q.items.length, def.id + st.key);
      function paint() {
        body.innerHTML = '<ol class="sn-order">' + cur.map(function (k, n) { return '<li><span class="sn-on">' + (n + 1) + '</span><span class="sn-ot">' + fill(q.items[k]) + '</span><span class="sn-ob"><button type="button" aria-label="Move up" data-up="' + n + '"' + (n ? '' : ' disabled') + '>▲</button><button type="button" aria-label="Move down" data-dn="' + n + '"' + (n < cur.length - 1 ? '' : ' disabled') + '>▼</button></span></li>'; }).join('') + '</ol>' + (q.labels ? '<div class="sn-olab"><span>' + esc(q.labels[0]) + '</span><span>' + esc(q.labels[1]) + '</span></div>' : '') + '<button type="button" class="sn-b primary" data-check>Check order</button>';
        body.querySelectorAll('[data-up]').forEach(function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-up'); var t = cur[n - 1]; cur[n - 1] = cur[n]; cur[n] = t; S.drafts[st.key] = cur; paint(); }); });
        body.querySelectorAll('[data-dn]').forEach(function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-dn'); var t = cur[n + 1]; cur[n + 1] = cur[n]; cur[n] = t; S.drafts[st.key] = cur; paint(); }); });
        body.querySelector('[data-check]').addEventListener('click', function () {
          var right = cur.filter(function (k, n) { return k === n; }).length;
          if (right === cur.length) { S.answers[st.key] = cur.map(function (k) { return q.items[k]; }).join(' → '); afterRight(st, fb, q.yes); }
          else afterWrong(st, fb, right + ' of ' + cur.length + ' are in the right place. ' + (q.no || ''), function () { cur = q.items.map(function (_, k) { return k; }); paint(); });
        });
      }
      paint();
      if (S.done[st.key]) { cur = q.items.map(function (_, k) { return k; }); paint(); fb.innerHTML = fbBox(true, 'Answered.'); }
    };
    function shuffleIdx(n, seed) { var a = []; for (var i = 0; i < n; i++) a.push(i); var r = rng(seed); do { for (var j = n - 1; j > 0; j--) { var k = Math.floor(r() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; } } while (n > 1 && a.every(function (v, i) { return v === i; })); return a; }

    // Sort cards into bins. q.items: [[text, binIndex]], q.bins: [names]
    Q.sort = function (st, q, body, fb) {
      var place = S.drafts[st.key] || q.items.map(function () { return -1; }), sel = -1;
      var order = shuffleIdx(q.items.length, def.id + st.key);
      function paint() {
        body.innerHTML = '<p class="sn-small">Tap a card, then tap the group it belongs in.</p><div class="sn-pool">' + order.filter(function (k) { return place[k] < 0; }).map(function (k) { return '<button type="button" class="sn-card2' + (sel === k ? ' sel' : '') + '" data-c="' + k + '">' + fill(q.items[k][0]) + '</button>'; }).join('') + '</div>' +
          '<div class="sn-bins">' + q.bins.map(function (b, bi) { return '<div class="sn-bin" data-bin="' + bi + '" role="button" tabindex="0"><b>' + esc(b) + '</b>' + order.filter(function (k) { return place[k] === bi; }).map(function (k) { return '<button type="button" class="sn-card2 in" data-c="' + k + '">' + fill(q.items[k][0]) + '</button>'; }).join('') + '</div>'; }).join('') + '</div>' +
          '<button type="button" class="sn-b primary" data-check' + (place.indexOf(-1) >= 0 ? ' disabled' : '') + '>Check groups</button>';
        body.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var k = +b.getAttribute('data-c'); if (place[k] >= 0) { place[k] = -1; sel = k; } else sel = sel === k ? -1 : k; paint(); }); });
        body.querySelectorAll('[data-bin]').forEach(function (b) { function drop() { if (sel < 0) return; place[sel] = +b.getAttribute('data-bin'); sel = -1; S.drafts[st.key] = place; save(); paint(); } b.addEventListener('click', drop); b.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
        var ck = body.querySelector('[data-check]');
        ck.addEventListener('click', function () {
          var wrong = q.items.filter(function (it, k) { return place[k] !== it[1]; }).length;
          if (!wrong) { S.answers[st.key] = 'sorted'; afterRight(st, fb, q.yes); }
          else { afterWrong(st, fb, wrong + ' card' + (wrong > 1 ? 's are' : ' is') + ' in the wrong group. They are back in the pile.', function () { place = q.items.map(function (it) { return it[1]; }); paint(); }); if (!S.done[st.key]) { q.items.forEach(function (it, k) { if (place[k] !== it[1]) place[k] = -1; }); paint(); } }
        });
      }
      if (S.done[st.key]) place = q.items.map(function (it) { return it[1]; });
      paint();
      if (S.done[st.key]) fb.innerHTML = fbBox(true, 'Answered.');
    };

    // Data table. Each row: {label, when: check (model condition), cells:[stateKey...]} — students set the
    // model to the row's condition, read the instruments, and type what they see.
    Q.table = function (st, q, body, fb) {
      var vals = S.drafts[st.key] || {}, okRows = S.answers[st.key] || {};
      function paint() {
        body.innerHTML = '<div class="sn-tblw"><table class="sn-tbl"><thead><tr><th>' + esc(q.rowHead || 'Trial') + '</th>' + q.cols.map(function (c) { return '<th>' + esc(c.label) + (c.unit ? ' <small>(' + esc(c.unit) + ')</small>' : '') + '</th>'; }).join('') + '<th></th></tr></thead><tbody>' +
          q.rows.map(function (r, ri) {
            return '<tr class="' + (okRows[ri] ? 'ok' : '') + '"><th>' + fill(r.label) + '</th>' + q.cols.map(function (c, ci) { var v = (vals[ri] || {})[ci]; return '<td>' + (c.given ? '<b>' + esc(r.given ? r.given[ci] : '') + '</b>' : '<input type="text" inputmode="decimal" data-r="' + ri + '" data-c="' + ci + '" value="' + esc(v == null ? '' : v) + '" aria-label="' + esc(r.label + ' ' + c.label) + '"' + (okRows[ri] ? ' disabled' : '') + '>') + '</td>'; }).join('') +
              '<td>' + (okRows[ri] ? '✓' : '<button type="button" class="sn-b sm" data-rec="' + ri + '">Check row</button>') + '</td></tr>';
          }).join('') + '</tbody></table></div><p class="sn-small">' + esc(q.tip || 'Set up the simulation for each row, read the instruments, and type exactly what you observe.') + '</p>';
        body.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', function () { var r = i.getAttribute('data-r'), c = i.getAttribute('data-c'); vals[r] = vals[r] || {}; vals[r][c] = i.value; S.drafts[st.key] = vals; save(); }); });
        body.querySelectorAll('[data-rec]').forEach(function (b) {
          b.addEventListener('click', function () {
            var ri = +b.getAttribute('data-rec'), r = q.rows[ri];
            if (r.when && !(typeof r.when === 'function' ? r.when(M.state) : evalCheck(r.when, M.state))) { fb.innerHTML = fbBox(false, 'First set up the simulation for this row: ' + (r.setup || r.label) + '.'); return; }
            var bad = [];
            q.cols.forEach(function (c, ci) {
              if (c.given) return;
              var want = typeof c.value === 'function' ? c.value(M.state, r) : r.values ? r.values[ci] : M.state[c.key], got = ((vals[ri] || {})[ci] || '').trim();
              if (typeof want === 'number') { var g = parseNum(got); if (isNaN(g) || Math.abs(g - want) > (c.tol == null ? 0.051 : c.tol)) bad.push(c.label); }
              else if (norm(got) !== norm(want) && !(c.accept && c.accept.some(function (a) { return norm(a) === norm(got); }))) bad.push(c.label);
            });
            if (!bad.length) { okRows[ri] = true; S.answers[st.key] = okRows; save(); fb.innerHTML = fbBox(true, 'Row recorded. Copy it onto your lab sheet.'); paint(); if (Object.keys(okRows).length === q.rows.length) afterRight(st, fb, q.yes || 'Data table complete!'); }
            else { miss(st); fb.innerHTML = fbBox(false, 'Check ' + bad.join(' and ') + '. Look closely at the readout in the simulation.') + hintHTML(st); if ((S.tries[st.key] || 0) >= 6) { okRows[ri] = true; S.answers[st.key] = okRows; paint(); if (Object.keys(okRows).length === q.rows.length) award(st, true); } }
          });
        });
      }
      paint();
      if (S.done[st.key]) fb.innerHTML = fbBox(true, 'Data table complete.');
    };

    // Structured writing (RACE, CER, claim) with checked parts.
    Q.write = function (st, q, body, fb) {
      var lv = LEVELS[S.level], d = S.drafts[st.key] || {};
      body.innerHTML = (q.passage ? '<blockquote class="sn-pass">' + fill(q.passage) + '</blockquote>' : '') + q.parts.map(function (p, k) {
        var v = d[k]; if (v == null) v = lv.starters && p.starter ? p.starter : '';
        return '<div class="sn-wpart"><label><span class="sn-wl"><b>' + esc(p.label) + '</b>' + (p.help ? ' · ' + esc(p.help) : '') + '</span><textarea rows="' + (p.rows || 2) + '" data-p="' + k + '" placeholder="' + esc(p.placeholder || '') + '">' + esc(v) + '</textarea></label>' + (lv.starters && p.frames ? '<div class="sn-bank"><span>Starters:</span>' + p.frames.map(function (f) { return '<button type="button" class="sn-chip" data-fr="' + k + '" data-w="' + esc(f) + '">' + esc(f) + '</button>'; }).join('') + '</div>' : '') + '<div class="sn-pfb" data-pfb="' + k + '"></div></div>';
      }).join('') + '<button type="button" class="sn-b primary" data-check>Check my writing</button>';
      body.querySelectorAll('textarea').forEach(function (ta) { ta.addEventListener('input', function () { d[ta.getAttribute('data-p')] = ta.value; S.drafts[st.key] = d; save(); }); });
      body.querySelectorAll('[data-fr]').forEach(function (b) { b.addEventListener('click', function () { var ta = body.querySelector('[data-p="' + b.getAttribute('data-fr') + '"]'); ta.value = (ta.value.replace(/\s+$/, '') + ' ' + b.getAttribute('data-w')).trim() + ' '; ta.dispatchEvent(new Event('input')); ta.focus(); }); });
      body.querySelector('[data-check]').addEventListener('click', function () {
        var all = true;
        q.parts.forEach(function (p, k) {
          var r = checkText(d[k] || '', p, S.level);
          body.querySelector('[data-pfb="' + k + '"]').innerHTML = r.list;
          if (!r.ok) all = false;
        });
        if (all) { S.answers[st.key] = q.parts.map(function (p, k) { return (d[k] || '').trim(); }).join(' '); afterRight(st, fb, q.yes || 'Every part checks out. Copy your paragraph onto your lab sheet.'); }
        else { miss(st); fb.innerHTML = fbBox(false, 'Fix each part marked ✗, then check again.') + hintHTML(st); if ((S.tries[st.key] || 0) >= 5) { fb.innerHTML += '<p class="sn-small">You can keep revising or move on. Your teacher will read this part on your lab sheet.</p>'; award(st, true); } }
      });
      if (S.done[st.key]) fb.innerHTML = fbBox(true, 'Writing checked.');
    };

    /* ---------- finish ---------- */
    function finish() {
      paintLog(); paintTop();
      var tot = starsTotal(), max = starsMax(), pct = max ? tot / max : 1;
      var rank = pct >= 0.9 ? ['🏆', 'Master ' + (subject === 'science' ? 'Scientist' : subject === 'math' ? 'Mathematician' : subject === 'ela' ? 'Reader' : 'Historian')] : pct >= 0.7 ? ['🥇', 'Expert'] : pct >= 0.5 ? ['🥈', 'Apprentice'] : ['🥉', 'Rookie'];
      var code = completionCode(def.id, S.level, tot);
      var host = root.querySelector('.sn-card-wrap');
      host.innerHTML = '<div class="sn-card sn-done"><div class="sn-rank">' + rank[0] + '</div><h2>Simulation complete!</h2><p class="sn-big">' + esc(rank[1]) + ' · ⭐ ' + tot + ' of ' + max + '</p>' +
        '<div class="sn-code"><span>Completion code: write it in the last box of your lab sheet</span><b>' + esc(code) + '</b></div>' +
        (def.takeaway ? '<div class="sn-idea"><span>What you figured out</span>' + fill(def.takeaway) + '</div>' : '') +
        '<div class="sn-checklist"><b>Before you turn in your lab sheet:</b><ul><li>Every numbered box is filled in.</li><li>Your answers use evidence from the simulation.</li><li>The completion code is in the last box.</li></ul></div>' +
        '<div class="sn-row"><button type="button" class="sn-b ghost" data-review>Review my steps</button><button type="button" class="sn-b" data-again>Play again at another level</button></div></div>';
      host.querySelector('[data-review]').addEventListener('click', function () { S.i = 0; save(); render(); });
      host.querySelector('[data-again]').addEventListener('click', function () { var lv = S.level; S = { level: null, i: 0, done: {}, stars: {}, tries: {}, answers: {}, removed: {}, drafts: {}, sup: S.sup, started: false }; save(); render(); if (model.reset) model.reset(); });
      if (opts.onDone) opts.onDone({ stars: tot, max: max, code: code, level: S.level });
    }

    /* ---------- supports drawer ---------- */
    function toggleDrawer() {
      var d = root.querySelector('.sn-drawer');
      if (!d.hidden) { d.hidden = true; return; }
      var sup = S.sup;
      d.innerHTML = '<div class="sn-drh"><b>Supports</b><button type="button" class="sn-x" data-close aria-label="Close">×</button></div>' +
        [['read', '🔊 Read each step aloud'], ['big', '🔠 Bigger text'], ['space', '↔ Easy-read spacing'], ['contrast', '◐ High contrast'], ['ruler', '📏 Reading ruler']].map(function (o) { return '<label class="sn-tog"><input type="checkbox" data-s="' + o[0] + '"' + (sup[o[0]] ? ' checked' : '') + '><span></span>' + o[1] + '</label>'; }).join('') +
        '<button type="button" class="sn-b sm" data-hear>🔊 Hear this step now</button>' +
        (def.vocab && def.vocab.length && S.level !== 'legend' ? '<h4>Word bank</h4><dl class="sn-wb">' + def.vocab.map(function (v) { return '<dt>' + esc(v[0]) + '</dt><dd>' + esc(v[1]) + '</dd>'; }).join('') + '</dl>' : '') +
        (subject === 'math' || subject === 'science' ? '<h4>Calculator</h4><div class="sn-calc"><input type="text" aria-label="Calculator" placeholder="e.g. 12 * 3.5"><output>=</output></div>' : '') +
        '<h4>Scratch pad</h4><textarea class="sn-scratch" rows="4" aria-label="Scratch pad">' + esc(S.drafts._scratch || '') + '</textarea>';
      d.hidden = false;
      d.querySelector('[data-close]').addEventListener('click', function () { d.hidden = true; });
      d.querySelectorAll('[data-s]').forEach(function (i) { i.addEventListener('change', function () { sup[i.getAttribute('data-s')] = i.checked; save(); applySup(); }); });
      d.querySelector('[data-hear]').addEventListener('click', function () { var st = steps[S.i]; if (st) speak(stepSpeech(st)); });
      var ci = d.querySelector('.sn-calc input');
      if (ci) ci.addEventListener('input', function () { var o = d.querySelector('.sn-calc output'), e = ci.value.replace(/×/g, '*').replace(/÷/g, '/'); if (/^[\d\s.+\-*/()]+$/.test(e)) { try { var v = Function('return (' + e + ')')(); o.textContent = '= ' + (isFinite(v) ? round(v, 6) : '?'); } catch (x) { o.textContent = '='; } } else o.textContent = '='; });
      d.querySelector('.sn-scratch').addEventListener('input', function (e) { S.drafts._scratch = e.target.value; save(); });
    }
    function applySup() {
      var s = S.sup;
      root.classList.toggle('sup-big', !!s.big); root.classList.toggle('sup-space', !!s.space); root.classList.toggle('sup-contrast', !!s.contrast);
      var r = root.querySelector('.sn-ruler'); r.hidden = !s.ruler;
    }
    root.addEventListener('pointermove', function (e) { if (!S.sup.ruler) return; var r = root.querySelector('.sn-ruler'), b = root.getBoundingClientRect(); r.style.top = (e.clientY - b.top - 22) + 'px'; });
    function speak(t) { try { if (!window.speechSynthesis) return; speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.rate = 0.95; speechSynthesis.speak(u); } catch (e) { /* no speech */ } }
    root.addEventListener('click', function (e) { if (!S.sup.read) return; var t = e.target.closest('.sn-text,.sn-qq,.sn-ch,.sn-idea'); if (t) speak(t.textContent); });

    /* ---------- go ---------- */
    shell(); startModel(); applySup();
    if (S.level) buildSteps();
    if (opts.demo) { S.level = opts.level || 'scientist'; buildSteps(); }
    paintTop(); render();

    return {
      state: function () { return S; }, model: function () { return M; }, steps: function () { return steps; },
      go: function (i) { S.i = i; render(); }, next: next,
      // Test helper: solve the current step with the right answer.
      autoSolve: function () {
        var st = steps[S.i]; if (!st) return false;
        if (st.goal) { if (st.goal.auto) st.goal.auto(M, model); else if (model.auto) model.auto(st); S.goalOK = S.goalOK || {}; S.goalOK[st.key] = true; paintGoal(st); }
        if (st.q && !S.done[st.key]) { var qh = root.querySelector('[data-q]'); if (!qh.getAttribute('data-built')) { qh.setAttribute('data-built', '1'); buildQ(st, qh); } S.answers[st.key] = st.q.type === 'predict' ? st.q.choices[0] : 'auto'; S.tries[st.key] = S.tries[st.key] || 0; award(st); }
        setNext(st); return true;
      }
    };
  }

  function completionCode(id, lv, stars) {
    var h = hash(id + '|' + lv).toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '');
    return (h + 'SUNNY').slice(0, 3) + '-' + ({ explorer: 'E', scientist: 'I', legend: 'L' }[lv] || 'I') + (stars == null ? '' : stars);
  }

  /* ======================================================================
   * CSS
   * ==================================================================== */
  var CSS = [
    '.sn{--sn-bg:#f6f4ee;--sn-card:#fff;--sn-ink:#1c2230;--sn-soft:#5d6577;--sn-line:#dcd8cc;--sn-acc:#e8590c;--sn-acc2:#ffb703;--sn-ok:#1a7f4b;--sn-no:#c0392b;--sn-stage:#eef3f7;--sn-top:#1c2230;--sn-topink:#fff;--sn-font:"Nunito","Segoe UI",system-ui,sans-serif;--sn-head:"Fredoka","Nunito","Segoe UI",system-ui,sans-serif;',
    'font-family:var(--sn-font);color:var(--sn-ink);background:var(--sn-bg);display:flex;flex-direction:column;min-height:100%;height:100%;position:relative;font-size:16px;line-height:1.45;overflow:hidden;border-radius:inherit}',
    '.sn *{box-sizing:border-box}.sn button{font:inherit;color:inherit}',
    '.sn-science{--sn-acc:#0e8f8f;--sn-acc2:#ffd166;--sn-stage:#e7eef2;--sn-top:#123040;--sn-bg:#eef3f4}',
    '.sn-math{--sn-acc:#e8590c;--sn-acc2:#ffd43b;--sn-stage:#fff6e0;--sn-top:#3b2a14;--sn-bg:#fbf7ee}',
    '.sn-ela{--sn-acc:#7048e8;--sn-acc2:#ffc9c9;--sn-stage:#f7f1e6;--sn-top:#2b2340;--sn-bg:#f6f2ea}',
    '.sn-social{--sn-acc:#2b8a3e;--sn-acc2:#f4c150;--sn-stage:#efe6d2;--sn-top:#2f2a1c;--sn-bg:#f4efe3}',
    '.sn-top{display:flex;align-items:center;gap:14px;padding:8px 14px;background:var(--sn-top);color:var(--sn-topink);flex-wrap:wrap}',
    '.sn-brand{display:flex;align-items:center;gap:6px;font-family:var(--sn-head);font-weight:700;line-height:1}',
    '.sn-sun{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle,#ffe066 50%,#ffb703 100%);color:#e8590c;font-size:20px;box-shadow:0 0 0 3px rgba(255,224,102,.3)}',
    '.sn-brand-t small{font-size:.72em;opacity:.8;letter-spacing:.06em;text-transform:uppercase}',
    '.sn-title{flex:1;min-width:180px}.sn-title h1{margin:0;font:700 1.25em/1.1 var(--sn-head)}.sn-kick{font-size:.72em;letter-spacing:.06em;text-transform:uppercase;opacity:.8}',
    '.sn-progress{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.sn-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.25)}.sn-dot.done{background:var(--sn-acc2)}.sn-dot.now{outline:2px solid #fff;outline-offset:1px}.sn-pct{font-size:.78em;margin-left:6px;opacity:.9}',
    '.sn-tools{display:flex;align-items:center;gap:8px}.sn-tb{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:999px;padding:5px 12px;cursor:pointer;font-weight:700;font-size:.85em}.sn-tb:hover{background:rgba(255,255,255,.25)}',
    '.sn-lvl,.sn-stars{font-size:.85em;font-weight:800;white-space:nowrap}.sn-stars.pop{animation:snpop .5s}@keyframes snpop{50%{transform:scale(1.4)}}',
    '.sn-body{flex:1;display:grid;grid-template-columns:minmax(0,1.55fr) minmax(320px,1fr);min-height:0}',
    '.sn-stage{background:var(--sn-stage);overflow:auto;padding:14px;display:flex;flex-direction:column;min-height:0}',
    '.sn-scene{flex:1;display:flex;flex-direction:column;gap:10px;min-height:0}',
    '.sn-guide{background:var(--sn-bg);border-left:1px solid var(--sn-line);overflow:auto;padding:12px 14px 30px;min-height:0}',
    '.sn-science .sn-guide{background-color:#fbfdfd;background-image:linear-gradient(#e3eef0 1px,transparent 1px),linear-gradient(90deg,#e3eef0 1px,transparent 1px);background-size:22px 22px}',
    '.sn-ela .sn-guide{background:#fffdf8}.sn-social .sn-guide{background:#fbf6ea}',
    '.sn-card{background:var(--sn-card);border:1px solid var(--sn-line);border-radius:14px;padding:16px 18px;box-shadow:0 2px 0 rgba(0,0,0,.04)}',
    '.sn-card h2{font:700 1.3em/1.2 var(--sn-head);margin:.25em 0 .4em;text-wrap:balance}',
    '.sn-sh{display:flex;justify-content:space-between;align-items:center;gap:8px}',
    '.sn-tag{font-size:.72em;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:var(--sn-acc);color:#fff;border-radius:6px;padding:3px 9px}',
    '.sn-tag.t-predict{background:#7048e8}.sn-tag.t-test{background:#e8590c}.sn-tag.t-observe,.sn-tag.t-record{background:#1971c2}.sn-tag.t-explain,.sn-tag.t-write{background:#2b8a3e}.sn-tag.t-challenge{background:#b8860b}.sn-tag.t-read{background:#6b4f2a}.sn-tag.t-model{background:#495057}',
    '.sn-sheetb{font-size:.78em;font-weight:800;border:2px dashed var(--sn-ink);border-radius:8px;padding:2px 8px;background:#fffbe6;white-space:nowrap}',
    '.sn-text{margin:.2em 0 .6em}.sn-idea,.sn-strat{border-left:5px solid var(--sn-acc2);background:#fffbea;border-radius:8px;padding:8px 12px;margin:.5em 0}.sn-idea span,.sn-strat span,.sn-bigq span{display:block;font-size:.7em;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--sn-soft)}.sn-strat{border-color:#74c0fc;background:#eef7ff}',
    '.sn-goal{display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap;border:2px solid var(--sn-acc);border-radius:10px;padding:9px 12px;margin:.6em 0;background:#fff}.sn-goal>div{flex:1;min-width:180px}.sn-gi{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--sn-acc);color:#fff;font-size:.8em;flex:none}.sn-goal.met{border-color:var(--sn-ok);background:#ebfbee}.sn-goal.met .sn-gi{background:var(--sn-ok)}.sn-ghint{font-size:.88em;color:var(--sn-soft);margin-top:3px}',
    '.sn-locked{color:var(--sn-soft);font-style:italic;padding:8px 0}',
    '.sn-qq{font-weight:800;margin:.5em 0}',
    '.sn-choices{display:grid;gap:7px}.sn-choices.grid{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}',
    '.sn-ch{display:flex;gap:10px;align-items:center;text-align:left;border:2px solid var(--sn-line);background:#fff;border-radius:10px;padding:8px 10px;cursor:pointer;transition:transform .08s}.sn-ch:hover:not(:disabled){border-color:var(--sn-acc);transform:translateY(-1px)}',
    '.sn-chl{display:grid;place-items:center;width:26px;height:26px;border-radius:7px;background:var(--sn-bg);font-weight:800;flex:none}',
    '.sn-ch.right{border-color:var(--sn-ok);background:#ebfbee}.sn-ch.wrong{border-color:var(--sn-no);background:#fff0f0;opacity:.8}.sn-ch.picked{border-color:#7048e8;background:#f3f0ff}.sn-ch.gone{opacity:.3;text-decoration:line-through}.sn-chk input{width:18px;height:18px}',
    '.sn-fb{border-radius:8px;padding:8px 11px;margin:.5em 0;font-weight:700}.sn-fb.ok{background:#ebfbee;color:#0b5d33}.sn-fb.no{background:#fff0f0;color:#9b1c1c}',
    '.sn-why{background:#f1f3f5;border-radius:8px;padding:8px 11px;font-size:.95em}.sn-hint{background:#fff9db;border-radius:8px;padding:8px 11px;margin:.4em 0;font-size:.95em}',
    '.sn-b{border:2px solid var(--sn-ink);background:#fff;border-radius:10px;padding:8px 14px;font-weight:800;cursor:pointer}.sn-b:hover:not(:disabled){background:var(--sn-bg)}.sn-b:disabled{opacity:.4;cursor:not-allowed}',
    '.sn-b.primary{background:var(--sn-acc);border-color:var(--sn-acc);color:#fff}.sn-b.primary:hover:not(:disabled){filter:brightness(1.08);background:var(--sn-acc)}.sn-b.ghost{border-color:var(--sn-line)}.sn-b.sm{padding:4px 10px;font-size:.85em}.sn-b.big{font-size:1.1em;padding:12px 20px;width:100%;margin-top:12px}',
    '.sn-b.on{background:var(--sn-ink);color:#fff}',
    '.sn-nav{display:flex;justify-content:space-between;gap:8px;margin-top:14px;padding-top:12px;border-top:1px dashed var(--sn-line)}',
    '.sn-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:.4em 0}',
    '.sn-inrow{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.sn-in{font:inherit;font-size:1.15em;width:9em;padding:7px 10px;border:2px solid var(--sn-line);border-radius:9px}.sn-in:focus,.sn-ta:focus,.sn-wpart textarea:focus{outline:3px solid var(--sn-acc2);border-color:var(--sn-acc)}.sn-unit{font-weight:700}',
    '.sn-work{display:block;margin-top:8px}.sn-work span{font-size:.85em;color:var(--sn-soft)}.sn-work textarea,.sn-ta,.sn-wpart textarea{width:100%;font:inherit;padding:8px 10px;border:2px solid var(--sn-line);border-radius:9px;resize:vertical}',
    '.sn-wc{font-size:.8em;color:var(--sn-soft)}.sn-crit{list-style:none;padding:0;margin:.4em 0;font-size:.9em}.sn-crit li{padding:2px 0}.sn-crit li.y{color:var(--sn-ok)}.sn-crit li.n{color:var(--sn-no);font-weight:700}',
    '.sn-bank{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:.35em 0;font-size:.85em}.sn-bank>span{color:var(--sn-soft);font-weight:700}.sn-chip{border:1px solid var(--sn-line);background:var(--sn-bg);border-radius:999px;padding:2px 9px;cursor:pointer}',
    '.sn-wpart{margin:.5em 0}.sn-wl{display:block;font-size:.9em;margin-bottom:3px}.sn-pass{margin:.4em 0;padding:8px 12px;border-left:4px solid var(--sn-acc);background:var(--sn-bg);font-family:Georgia,serif}',
    '.sn-order{list-style:none;padding:0;margin:0;display:grid;gap:6px}.sn-order li{display:flex;align-items:center;gap:8px;border:2px solid var(--sn-line);border-radius:9px;padding:6px 8px;background:#fff}.sn-on{font-weight:800;width:22px}.sn-ot{flex:1}.sn-ob button{border:1px solid var(--sn-line);background:var(--sn-bg);border-radius:6px;width:30px;height:28px;cursor:pointer}.sn-ob button:disabled{opacity:.3}.sn-olab{display:flex;justify-content:space-between;font-size:.8em;color:var(--sn-soft);margin:.3em 0}',
    '.sn-pool{display:flex;flex-wrap:wrap;gap:6px;min-height:40px;padding:6px;border:2px dashed var(--sn-line);border-radius:10px;margin-bottom:8px}.sn-card2{border:2px solid var(--sn-ink);background:#fff;border-radius:8px;padding:5px 9px;cursor:pointer;font-size:.92em}.sn-card2.sel{background:var(--sn-acc2);transform:translateY(-2px)}.sn-card2.in{border-color:var(--sn-line);font-size:.85em}',
    '.sn-bins{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}.sn-bin{border:2px solid var(--sn-line);border-radius:10px;padding:8px;min-height:90px;display:flex;flex-direction:column;gap:5px;background:var(--sn-bg);cursor:pointer}.sn-bin>b{font-size:.85em}',
    '.sn-tblw{overflow-x:auto}.sn-tbl{border-collapse:collapse;width:100%;font-size:.92em}.sn-tbl th,.sn-tbl td{border:1px solid var(--sn-line);padding:5px 6px;text-align:left}.sn-tbl thead th{background:var(--sn-top);color:#fff}.sn-tbl input{width:5.5em;font:inherit;padding:4px 6px;border:2px solid var(--sn-line);border-radius:6px}.sn-tbl tr.ok{background:#ebfbee}',
    '.sn-small{font-size:.85em;color:var(--sn-soft)}.sn-big{font-size:1.2em;font-weight:800}',
    '.sn-log{display:grid;gap:4px;margin-bottom:10px}.sn-logt{display:flex;justify-content:space-between;border:1px solid var(--sn-line);background:rgba(255,255,255,.8);border-radius:8px;padding:5px 10px;font-weight:800;font-size:.85em;cursor:pointer;color:var(--sn-ok)}.sn-logi{display:flex;align-items:center;gap:8px;text-align:left;background:rgba(255,255,255,.7);border:1px solid var(--sn-line);border-radius:8px;padding:4px 8px;font-size:.82em;cursor:pointer}.sn-logi em{display:block;font-style:normal;color:var(--sn-soft);font-size:.92em}.sn-logn{display:grid;place-items:center;min-width:20px;height:20px;border-radius:50%;background:var(--sn-ok);color:#fff;font-weight:800;font-size:.85em}.sn-logi>span:nth-child(2){flex:1}.sn-logs{color:#e0a100;font-weight:800}',
    '.sn-start .sn-place{font-size:.75em;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--sn-acc)}.sn-mission{font-size:1.02em}.sn-bigq{background:var(--sn-bg);border-radius:10px;padding:10px 12px;margin:.5em 0}.sn-bigq b{font-size:1.1em}',
    '.sn-sheetnote{display:flex;gap:10px;align-items:flex-start;background:#fffbe6;border:2px dashed #e0b400;border-radius:10px;padding:9px 12px;margin:.7em 0}.sn-paper{font-size:1.6em}',
    '.sn-lvgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}.sn-lvcard{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;border:2px solid var(--sn-line);background:#fff;border-radius:12px;padding:10px;cursor:pointer}.sn-lvcard small{color:var(--sn-soft);line-height:1.3}.sn-lvcard.on{border-color:var(--sn-acc);box-shadow:0 0 0 3px var(--sn-acc2)}.sn-lvi{font-size:1.5em}',
    '.sn-done{text-align:center}.sn-rank{font-size:3.4em}.sn-code{border:3px dashed var(--sn-ink);border-radius:12px;padding:10px;margin:.8em 0;background:#fffbe6}.sn-code span{display:block;font-size:.8em;color:var(--sn-soft)}.sn-code b{font:700 2em/1.1 ui-monospace,Menlo,monospace;letter-spacing:.08em}.sn-checklist{text-align:left;background:var(--sn-bg);border-radius:10px;padding:8px 12px;margin:.6em 0}.sn-done .sn-row{justify-content:center}',
    '.sn-drawer{position:absolute;right:10px;top:60px;width:min(340px,calc(100% - 20px));max-height:calc(100% - 70px);overflow:auto;background:#fff;border:2px solid var(--sn-ink);border-radius:14px;padding:12px 14px;z-index:20;box-shadow:0 10px 30px rgba(0,0,0,.2)}.sn-drh{display:flex;justify-content:space-between;align-items:center}.sn-x{border:0;background:none;font-size:1.6em;cursor:pointer}.sn-drawer h4{margin:.8em 0 .3em}.sn-wb dt{font-weight:800}.sn-wb dd{margin:0 0 5px}.sn-calc{display:flex;gap:6px}.sn-calc input{flex:1;font:inherit;padding:5px 8px;border:2px solid var(--sn-line);border-radius:8px}.sn-scratch{width:100%;font:inherit;border:2px solid var(--sn-line);border-radius:8px}',
    '.sn-tog{display:flex;align-items:center;gap:8px;cursor:pointer;margin:5px 0;font-weight:600}.sn-tog input{position:absolute;opacity:0}.sn-tog>span{width:38px;height:22px;border-radius:999px;background:#ced4da;position:relative;flex:none;transition:.2s}.sn-tog>span::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:.2s}.sn-tog input:checked+span{background:var(--sn-acc)}.sn-tog input:checked+span::after{left:19px}.sn-tog input:focus-visible+span{outline:3px solid var(--sn-acc2)}',
    '.sn-ruler{position:absolute;left:0;right:0;height:44px;background:rgba(255,230,120,.25);border-top:2px solid rgba(200,150,0,.6);border-bottom:2px solid rgba(200,150,0,.6);pointer-events:none;z-index:15}',
    '.sn-toast{position:absolute;left:50%;bottom:16px;transform:translate(-50%,30px);opacity:0;background:var(--sn-ink);color:#fff;border-radius:10px;padding:8px 14px;font-weight:700;transition:.25s;pointer-events:none;z-index:30}.sn-toast.show{opacity:1;transform:translate(-50%,0)}.sn-toast.bad{background:var(--sn-no)}',
    '.sn.sup-big{font-size:19px}.sn.sup-space .sn-guide{letter-spacing:.04em;word-spacing:.14em;line-height:1.75}.sn.sup-contrast{--sn-bg:#fff;--sn-line:#000;--sn-soft:#000;--sn-stage:#fff}.sn.sup-contrast .sn-card,.sn.sup-contrast .sn-ch{border-color:#000}',
    /* model widgets */
    '.sn-panel{background:var(--sn-card);border:1px solid var(--sn-line);border-radius:12px;padding:10px 12px}.sn-panel h3{margin:0 0 6px;font:700 .95em var(--sn-head)}',
    '.sn-ctrls{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;background:var(--sn-card);border:1px solid var(--sn-line);border-radius:12px;padding:10px 12px}',
    '.sn-slider{display:flex;align-items:center;gap:8px;font-weight:700;font-size:.9em;flex:1;min-width:220px}.sn-slider input{flex:1;accent-color:var(--sn-acc);min-width:90px}.sn-sl-v{min-width:4.5em;text-align:right;font-variant-numeric:tabular-nums;background:var(--sn-bg);border-radius:6px;padding:1px 6px}.sn-slider.off{opacity:.45}',
    '.sn-reads{display:flex;flex-wrap:wrap;gap:8px}.sn-read{background:#111a22;color:#7cf5c4;border-radius:10px;padding:6px 12px;font-family:ui-monospace,Menlo,monospace;min-width:110px;box-shadow:inset 0 0 0 2px #2c3e50}.sn-read-l{display:block;font-size:.66em;color:#a7c4bc;font-family:var(--sn-font);text-transform:uppercase;letter-spacing:.08em}.sn-read-v{font-size:1.35em;font-variant-numeric:tabular-nums}.sn-read-u{font-size:.8em;margin-left:4px;color:#a7c4bc}.sn-read.big .sn-read-v{font-size:2em}',
    '.sn-math .sn-read{background:#fff;color:var(--sn-ink);box-shadow:inset 0 0 0 2px var(--sn-line)}.sn-math .sn-read-l,.sn-math .sn-read-u{color:var(--sn-soft)}',
    '.sn-seg{display:inline-flex;border:2px solid var(--sn-ink);border-radius:10px;overflow:hidden}.sn-seg button{border:0;background:#fff;padding:6px 11px;font-weight:700;cursor:pointer;border-right:1px solid var(--sn-line)}.sn-seg button:last-child{border-right:0}.sn-seg button.on{background:var(--sn-ink);color:#fff}',
    '.sn-scene>.sn-svg,.sn-scene>.sn-stagebox>.sn-svg{max-height:min(52vh,460px)}.sn-svg{overflow:hidden;width:100%;height:auto;display:block;border-radius:12px;background:var(--sn-card);border:1px solid var(--sn-line);user-select:none;-webkit-user-select:none;touch-action:manipulation}',
    '.sn-graph{margin:0;background:var(--sn-card);border:1px solid var(--sn-line);border-radius:12px;padding:6px}.sn-graph svg{width:100%;height:auto;display:block}.sn-graph figcaption{font-size:.8em;text-align:center;color:var(--sn-soft)}',
    '.sn-note{font-size:.85em;color:var(--sn-soft)}.sn-missing{padding:30px;text-align:center;color:var(--sn-no)}',
    '.sn-demo .sn-guide{display:none}.sn-demo .sn-body{grid-template-columns:1fr}.sn-demo .sn-top{display:none}',
    '@media (max-width:900px){.sn{height:auto;overflow:visible}.sn-body{grid-template-columns:1fr}.sn-guide{border-left:0;border-top:1px solid var(--sn-line)}.sn-stage{max-height:none}.sn-progress .sn-dot{display:none}}',
    '@media (prefers-reduced-motion:reduce){.sn *{transition:none!important;animation:none!important}}'
  ].join('\n');
  function injectCSS(doc) {
    if (doc.getElementById('sunny-css')) return;
    var s = doc.createElement('style'); s.id = 'sunny-css'; s.textContent = CSS; doc.head.appendChild(s);
    if (!doc.getElementById('sunny-font')) { var l = doc.createElement('link'); l.id = 'sunny-font'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Nunito:wght@400;600;800&display=swap'; doc.head.appendChild(l); }
  }

  return { run: run, kit: KIT, css: CSS, levels: LEVELS, code: completionCode, injectCSS: injectCSS };
}
if (typeof window !== 'undefined') window.SunnySim = SunnySim;
