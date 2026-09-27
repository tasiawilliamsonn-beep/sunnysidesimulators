/*
 * Sunnyside Simulators: social studies models (the Expedition wing).
 * Students travel maps, enter places, read primary sources, make historical decisions,
 * and run cause-and-effect simulations. Models use only M and M.kit, so their source can
 * be embedded in standalone Canvas files.
 */
var SUNNY_MODELS = window.SUNNY_MODELS = window.SUNNY_MODELS || {};

/* ------------------------------------------------------------------ */
/* Expedition: move an explorer around a map, enter places, collect     */
/* evidence. cfg: { bg (svg markup, 600x400), avatar, start,            */
/*   places:[{id,name,icon,x,y,scene:{title,sub,paragraphs,source:{by,date,text},items:[[id,icon,label,fact]]}}], */
/*   roads:[[a,b]], scale:{per,unit} }                                   */
/* state: at, visited_<id>, entered_<id>, n_entered, got_<id>, n_items, dist */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.expedition = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var PL = cfg.places || [], byId = {}, texts = [];
  PL.forEach(function (p) {
    byId[p.id] = p; var sc = p.scene || {};
    var paras = (sc.paragraphs || []).slice(); if (sc.source) paras.push(sc.source.text);
    p._P = K.passage(paras.length ? paras : ['']); texts.push(p._P.text);
  });
  M.def.passageText = texts.join(' ');
  var roads = cfg.roads || [], adj = {};
  PL.forEach(function (p) { adj[p.id] = []; });
  roads.forEach(function (r) { if (adj[r[0]] && adj[r[1]]) { adj[r[0]].push(r[1]); adj[r[1]].push(r[0]); } });
  var at = cfg.start || PL[0].id, pos = [byId[at].x, byId[at].y], path = [], view = 'map', inside = null, got = {}, entered = {}, dist = 0;
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.ex-wrap{display:grid;grid-template-columns:1.6fr 1fr;gap:10px}.ex-map{position:relative}.ex-place{cursor:pointer}.ex-place:focus{outline:none}.ex-place:focus circle,.ex-place:hover circle{stroke:#e8590c;stroke-width:4}.ex-log{max-height:300px;overflow:auto}.ex-log li{margin:0 0 5px;font-size:.9em}.ex-scene{background:linear-gradient(#fffaf0,#f7ecd4);border:2px solid #b08968;border-radius:14px;padding:14px 16px}.ex-scene h3{margin:0}.ex-src{background:#f3e3bf;border:1px solid #b08968;border-left:6px solid #8b5e34;border-radius:6px;padding:10px 14px;margin:10px 0;font-family:Georgia,serif;font-style:italic;box-shadow:inset 0 0 30px #d9b98355}.ex-src small{display:block;font-style:normal;font-family:var(--sn-font);color:#6b4f2c;font-weight:700;margin-bottom:4px}.ex-items{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.ex-item{border:2px dashed #8b5e34;background:#fff;border-radius:10px;padding:6px 10px;cursor:pointer;font:inherit;text-align:left;max-width:100%}.ex-item.got{border-style:solid;background:#ebfbee;border-color:#2b8a3e}.ex-fact{display:block;font-size:.88em;margin-top:3px}@media(max-width:760px){.ex-wrap{grid-template-columns:1fr}}</style>'));
  var wrap = K.el('<div class="ex-wrap"></div>'), left = K.el('<div></div>'), side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  wrap.appendChild(left); wrap.appendChild(side); M.el.appendChild(wrap);
  var svg = K.svgEl('svg', { viewBox: cfg.vb || '0 0 600 400', class: 'sn-svg', role: 'application', 'aria-label': (cfg.title || 'Map') + '. Use Tab to pick a place and Enter to travel there.' });
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var enterB = K.btn('🚪 Enter', function () { enter(at); }, 'primary');
  var hereT = K.el('<span class="sn-note"></span>');
  ctr.appendChild(hereT); ctr.appendChild(enterB);
  var reads = K.el('<div class="sn-reads"></div>'), rAt = K.readout('You are at', '', true), rV = K.readout('Places explored', ''), rI = K.readout('Evidence found', ''), rD = cfg.scale ? K.readout('Distance traveled', cfg.scale.unit) : null;
  [rAt, rV, rI, rD].forEach(function (r) { if (r) reads.appendChild(r.el); });
  var jour = K.el('<div class="sn-panel"><h3>📓 Field journal</h3><ol class="ex-log"></ol></div>');
  var go = K.el('<div class="sn-panel"><b>🧭 Travel to:</b><div class="sn-row" style="flex-wrap:wrap;gap:5px;margin-top:5px"></div></div>');
  side.appendChild(reads); side.appendChild(go); side.appendChild(jour);
  function route(a, b) {
    if (!roads.length || a === b) return [b];
    var prev = {}, q = [a], seen = {}; seen[a] = 1;
    while (q.length) { var c = q.shift(); if (c === b) break; adj[c].forEach(function (n) { if (!seen[n]) { seen[n] = 1; prev[n] = c; q.push(n); } }); }
    if (!seen[b]) return [b];
    var out = [b]; while (prev[out[0]] && prev[out[0]] !== a) out.unshift(prev[out[0]]); return out;
  }
  function travel(id, instant) {
    if (view !== 'map') { view = 'map'; draw(); }
    var r = route(at, id);
    if (instant) { r.forEach(arrive); pos = [byId[id].x, byId[id].y]; path = []; draw(); return; }
    path = r.slice();
  }
  function arrive(id) {
    var a = byId[at], b = byId[id];
    if (cfg.scale && a && b && a !== b) { dist += Math.round(Math.hypot(a.x - b.x, a.y - b.y) * cfg.scale.per); }
    at = id; var st = { at: id, dist: dist }; st['visited_' + id] = true; M.set(st);
  }
  M.loop(function (dt) {
    if (!path.length) return;
    var t = byId[path[0]], dx = t.x - pos[0], dy = t.y - pos[1], d = Math.hypot(dx, dy), sp = 260 * dt;
    if (d <= sp) { pos = [t.x, t.y]; arrive(path.shift()); draw(); } else { pos = [pos[0] + dx / d * sp, pos[1] + dy / d * sp]; var av = svg.querySelector('.ex-av'); if (av) { av.setAttribute('x', pos[0]); av.setAttribute('y', pos[1] + 9); } }
  });
  function enter(id) {
    if (path.length) return;
    inside = id; view = 'scene'; entered[id] = true;
    var st = { n_entered: Object.keys(entered).length }; st['entered_' + id] = true; M.set(st); draw();
  }
  function collect(it) {
    if (got[it[0]]) return; got[it[0]] = it;
    var st = { n_items: Object.keys(got).length }; st['got_' + it[0]] = true; M.set(st);
    M.toast(it[1] + ' Added to your field journal.');
  }
  function draw() {
    var p = byId[at];
    rAt.set((p.icon || '📍') + ' ' + p.name); rV.set(Object.keys(entered).length + ' / ' + PL.length);
    var nItems = PL.reduce(function (n, q) { return n + ((q.scene || {}).items || []).length; }, 0);
    rI.set(Object.keys(got).length + ' / ' + nItems); if (rD) rD.set(dist.toLocaleString());
    jour.querySelector('ol').innerHTML = Object.keys(got).length ? Object.keys(got).map(function (k) { var it = got[k]; return '<li>' + it[1] + ' <b>' + K.esc(it[2]) + ':</b> ' + K.esc(it[3]) + '</li>'; }).join('') : '<li class="sn-note" style="list-style:none">Enter places and examine objects to fill your journal.</li>';
    var gb = go.querySelector('.sn-row'); gb.innerHTML = '';
    PL.forEach(function (q) { var b = K.btn((q.icon || '📍') + ' ' + K.esc(q.name) + (entered[q.id] ? ' ✓' : ''), function () { travel(q.id); }, 'sm' + (q.id === at ? ' primary' : ' ghost')); gb.appendChild(b); });
    left.innerHTML = '';
    if (view === 'scene') {
      var q = byId[inside], sc = q.scene || {};
      var box = K.el('<div class="ex-scene"><div class="sn-row" style="justify-content:space-between"><h3>' + (q.icon || '') + ' ' + K.esc(sc.title || q.name) + '</h3></div>' + (sc.sub ? '<div class="sn-note">' + K.esc(sc.sub) + '</div>' : '') + '<div class="sn-read-pass" style="background:transparent;border:0;padding:6px 0">' + q._P.html + '</div><div class="ex-items"></div></div>');
      var back = K.btn('⬅ Back to the map', function () { view = 'map'; draw(); }, 'sm'); box.querySelector('.sn-row').appendChild(back);
      if (sc.source) {
        var paras = box.querySelectorAll('.sn-read-pass p'), last = paras[paras.length - 1];
        if (last) { var src = K.el('<div class="ex-src"><small>📜 Primary source · ' + K.esc(sc.source.by || '') + (sc.source.date ? ', ' + K.esc(sc.source.date) : '') + '</small></div>'); last.parentNode.insertBefore(src, last); src.appendChild(last); last.style.margin = 0; }
      }
      var ib = box.querySelector('.ex-items');
      (sc.items || []).forEach(function (it) {
        var b = K.el('<button type="button" class="ex-item' + (got[it[0]] ? ' got' : '') + '"><span style="font-size:1.3em">' + it[1] + '</span> <b>' + (got[it[0]] ? '' : '🔍 Examine: ') + K.esc(it[2]) + '</b>' + (got[it[0]] ? '<span class="ex-fact">' + K.esc(it[3]) + '</span>' : '') + '</button>');
        b.addEventListener('click', function () { collect(it); draw(); }); ib.appendChild(b);
      });
      if (!(sc.items || []).length) ib.innerHTML = '';
      left.appendChild(box); return;
    }
    var h = cfg.bg || '<rect width="600" height="400" fill="#e9dcc0"/>';
    roads.forEach(function (r) { var a = byId[r[0]], b = byId[r[1]]; if (a && b) h += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + (cfg.roadColor || '#7a5a33') + '" stroke-width="3" stroke-dasharray="7 5" opacity=".75"/>'; });
    svg.innerHTML = h;
    PL.forEach(function (q) {
      var g = K.svgEl('g', { class: 'ex-place', tabindex: 0, role: 'button', 'aria-label': 'Travel to ' + q.name }, svg);
      g.innerHTML = '<circle cx="' + q.x + '" cy="' + q.y + '" r="17" fill="' + (entered[q.id] ? '#d3f9d8' : '#fff') + '" stroke="#1d2433" stroke-width="2"/><text x="' + q.x + '" y="' + (q.y + 7) + '" font-size="19" text-anchor="middle">' + (q.icon || '📍') + '</text><text x="' + q.x + '" y="' + (q.y + (q.labelUp ? -24 : 32)) + '" font-size="12" font-weight="800" text-anchor="middle" fill="#1d2433" stroke="#fffdf5" stroke-width="3" paint-order="stroke">' + K.esc(q.name) + '</text>';
      g.addEventListener('click', function () { if (q.id === at && !path.length) enter(q.id); else travel(q.id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (q.id === at) enter(q.id); else travel(q.id); } });
    });
    K.svgEl('text', { class: 'ex-av', x: pos[0], y: pos[1] + 9, 'font-size': 28, 'text-anchor': 'middle', 'pointer-events': 'none' }, svg).textContent = cfg.avatar || '🧑‍🚀';
    if (cfg.compass !== false) svg.insertAdjacentHTML('beforeend', '<g transform="translate(560 50)" pointer-events="none"><circle r="24" fill="#fffdf5" stroke="#1d2433"/><path d="M0 -20 L6 0 L0 20 L-6 0Z" fill="#1d2433" opacity=".25"/><path d="M0 -20 L6 0 L-6 0Z" fill="#c92a2a"/><text y="-26" font-size="11" font-weight="800" text-anchor="middle">N</text></g>');
    left.appendChild(svg); left.appendChild(ctr);
    hereT.textContent = 'Tap a place to travel. Tap it again (or press Enter) to go inside.';
    enterB.innerHTML = '🚪 Enter ' + K.esc(p.name);
  }
  var st0 = { at: at, n_entered: 0, n_items: 0, dist: 0 }; st0['visited_' + at] = true; M.set(st0);
  draw();
  return {
    auto: function (st) {
      var c = st.goal.check || {};
      PL.forEach(function (q) { travel(q.id, true); entered[q.id] = true; var s = {}; s['entered_' + q.id] = true; M.set(s); ((q.scene || {}).items || []).forEach(function (it) { got[it[0]] = it; var s2 = {}; s2['got_' + it[0]] = true; M.set(s2); }); });
      M.set({ n_entered: Object.keys(entered).length, n_items: Object.keys(got).length });
      if (typeof c === 'object' && c.at) travel(c.at, true);
      view = 'map'; draw();
    }
  };
};

/* ------------------------------------------------------------------ */
/* Timeline: put events in order, then link causes to effects           */
/* cfg: { events:[[id, year, label, detail, icon]], links:[[cause, effect, why]], showYears } */
/* state: placed, right, ordered, n_links, allLinks                       */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.timeline = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var E = cfg.events.slice().sort(function (a, b) { return a[1] - b[1]; }), N = E.length;
  var r = K.rng(K.hash(M.def.id)), pool = E.map(function (e, i) { return i; }).sort(function () { return r() - 0.5; });
  var slot = E.map(function () { return -1; }), sel = -1, ordered = false, links = [], pickC = null, view = 'order';
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.tl-pool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:2px dashed var(--sn-line);border-radius:10px;min-height:50px;background:#fffdf5}.tl-card{border:2px solid #1d2433;background:#fff;border-radius:10px;padding:6px 9px;cursor:pointer;font:inherit;font-size:.88em;text-align:left;max-width:260px;box-shadow:0 2px 0 #1d2433}.tl-card.sel{background:#ffe066}.tl-card small{display:block;color:var(--sn-soft)}.tl-line{position:relative;display:grid;gap:8px;margin-top:10px;padding-left:34px}.tl-line::before{content:"";position:absolute;left:14px;top:0;bottom:0;width:6px;border-radius:3px;background:linear-gradient(#8b5e34,#d9a066)}.tl-slot{position:relative;border:2px dashed var(--sn-line);border-radius:10px;min-height:46px;padding:5px;display:flex;align-items:center;gap:8px;cursor:pointer;background:var(--sn-card)}.tl-slot::before{content:attr(data-n);position:absolute;left:-32px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:#1d2433;color:#fff;display:grid;place-items:center;font-weight:800;font-size:.8em}.tl-slot.ok{border-style:solid;border-color:#2b8a3e;background:#ebfbee}.tl-yr{font-weight:900;color:#8b5e34;min-width:3.2em}.tl-lk{display:grid;grid-template-columns:1fr 1fr;gap:8px}.tl-arrow{font-size:.9em;padding:6px 8px;border-left:4px solid #e8590c;background:#fff4e6;border-radius:6px;margin-top:5px}</style>'));
  var tabs = K.seg([['order', '📅 Put events in order'], ['links', '🔗 Connect causes and effects']], view, function (v) { if (v === 'links' && !ordered) { tabs.set('order'); M.toast('Put the timeline in the right order first.', true); return; } view = v; draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); if (cfg.links && cfg.links.length) bar.appendChild(tabs.el); M.el.appendChild(bar);
  var area = K.el('<div></div>'); M.el.appendChild(area);
  function showYears() { return cfg.showYears || M.level() === 'explorer'; }
  function card(i, extra) { var e = E[i]; return '<button type="button" class="tl-card' + (sel === i ? ' sel' : '') + '" data-c="' + i + '">' + (e[4] || '') + ' <b>' + K.esc(e[2]) + '</b>' + (showYears() || ordered ? ' <small>' + e[1] + '</small>' : '') + (e[3] ? '<small>' + K.esc(e[3]) + '</small>' : '') + (extra || '') + '</button>'; }
  function report() { var right = slot.filter(function (s, k) { return s >= 0 && E[s][1] === E[k][1]; }).length; ordered = right === N; M.set({ placed: slot.filter(function (s) { return s >= 0; }).length, right: right, ordered: ordered, n_links: links.length, allLinks: !!(cfg.links && links.length >= cfg.links.length) }); }
  function draw() {
    if (view === 'order') {
      var h = '<p class="sn-note">Tap an event card, then tap a numbered spot on the timeline (1 = earliest). ' + (showYears() ? 'Dates are shown for Explorers.' : 'Dates are hidden: use cause and effect to reason about the order!') + '</p><div class="tl-pool">' + pool.filter(function (i) { return slot.indexOf(i) < 0; }).map(function (i) { return card(i); }).join('') + '</div><div class="tl-line">';
      for (var k = 0; k < N; k++) { var s = slot[k], ok = ordered; h += '<div class="tl-slot' + (ok ? ' ok' : '') + '" data-s="' + k + '" data-n="' + (k + 1) + '" role="button" tabindex="0">' + (s >= 0 ? (ok ? '<span class="tl-yr">' + E[s][1] + '</span>' : '') + card(s) : '<span class="sn-note">Spot ' + (k + 1) + '</span>') + '</div>'; }
      h += '</div><div class="sn-row" style="margin-top:8px"><button type="button" class="sn-b" data-chk>✓ Check my timeline</button><span class="sn-note" data-msg>' + (ordered ? '✓ The timeline is in order! Dates revealed.' : '') + '</span></div>';
      area.innerHTML = h;
      area.querySelectorAll('.tl-card').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); if (ordered) return; var i = +b.getAttribute('data-c'), k2 = slot.indexOf(i); if (k2 >= 0) { slot[k2] = -1; sel = i; } else sel = sel === i ? -1 : i; report(); draw(); }); });
      area.querySelectorAll('[data-s]').forEach(function (z) { function drop() { if (sel < 0 || ordered) return; var k2 = +z.getAttribute('data-s'); if (slot[k2] >= 0) pool.push(slot[k2]); slot[k2] = sel; sel = -1; report(); draw(); } z.addEventListener('click', drop); z.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
      area.querySelector('[data-chk]').addEventListener('click', function () {
        if (slot.indexOf(-1) >= 0) { M.toast('Place every event first.', true); return; }
        var wrong = 0; slot.forEach(function (s, k2) { if (E[s][1] !== E[k2][1]) { wrong++; slot[k2] = -1; } });
        M.bump('checks'); report();
        if (wrong) M.toast(wrong + ' event(s) were out of order and went back to the pile. Ask: what had to happen FIRST for this to happen?', true); else M.toast('✓ Perfect order!');
        draw();
      });
      return;
    }
    var L = cfg.links || [];
    var h2 = '<p class="sn-note">Tap a <b>cause</b>, then tap the <b>effect</b> it led to. Find ' + L.length + ' cause-and-effect links.</p><div class="tl-lk"><div><b>Cause</b>' + E.map(function (e, i) { return '<div style="margin-top:5px">' + card(i).replace('data-c=', 'data-cz=').replace(pickC === i ? 'tl-card' : '@@', 'tl-card sel') + '</div>'; }).join('') + '</div><div><b>Effect</b>' + E.map(function (e, i) { return '<div style="margin-top:5px">' + card(i).replace('data-c=', 'data-ef=') + '</div>'; }).join('') + '</div></div><div class="sn-panel" style="margin-top:8px"><b>Links found: ' + links.length + ' of ' + L.length + '</b>' + links.map(function (l) { return '<div class="tl-arrow">' + K.esc(E[l[0]][2]) + ' ➜ <b>' + K.esc(E[l[1]][2]) + '</b><br><span class="sn-note">' + K.esc(l[2]) + '</span></div>'; }).join('') + '</div>';
    area.innerHTML = h2;
    area.querySelectorAll('[data-cz]').forEach(function (b) { b.addEventListener('click', function () { pickC = +b.getAttribute('data-cz'); draw(); }); });
    area.querySelectorAll('[data-ef]').forEach(function (b) { b.addEventListener('click', function () {
      if (pickC == null) { M.toast('Tap a cause first.', true); return; }
      var ef = +b.getAttribute('data-ef'), a = E[pickC][0], z = E[ef][0];
      var hit = L.filter(function (l) { return l[0] === a && l[1] === z; })[0];
      if (links.some(function (l) { return l[0] === pickC && l[1] === ef; })) { M.toast('Already linked.'); return; }
      if (hit) { links.push([pickC, ef, hit[2]]); M.toast('✓ Linked: that cause led to that effect.'); } else { M.bump('badLinks'); M.toast(E[ef][1] < E[pickC][1] ? '✗ An effect can\'t happen BEFORE its cause!' : '✗ Those events are not directly connected. Look for a stronger link.', true); }
      pickC = null; report(); draw();
    }); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k = 0; k < N; k++) slot[k] = k; report(); if (c.allLinks || c.n_links) { (cfg.links || []).forEach(function (l) { var a = -1, b = -1; E.forEach(function (e, i) { if (e[0] === l[0]) a = i; if (e[0] === l[1]) b = i; }); links.push([a, b, l[2]]); }); report(); } draw(); } };
};

/* ------------------------------------------------------------------ */
/* Sort Lab: move cards into labeled bins (grid, pyramid, or Venn)      */
/* cfg: { prompt, bins:[[label, icon, color]], cards:[[text, bin, why]], layout } */
/* state: placed, right, allRight, wrong                                 */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.sortLab = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var B = cfg.bins, C = cfg.cards, place = C.map(function () { return -1; }), sel = -1;
  var r = K.rng(K.hash(M.def.id + 's')), order = C.map(function (c, i) { return i; }).sort(function () { return r() - 0.5; });
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.sl-pool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:2px dashed var(--sn-line);border-radius:10px;min-height:48px;background:#fffdf5}.sl-card{border:2px solid #1d2433;background:#fff;border-radius:9px;padding:6px 9px;cursor:pointer;font:inherit;font-size:.88em;text-align:left;box-shadow:0 2px 0 #1d2433}.sl-card.sel{background:#ffe066}.sl-bins{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:8px}.sl-bin{border:3px solid;border-radius:12px;padding:8px;min-height:110px;display:flex;flex-direction:column;gap:5px;cursor:pointer}.sl-bin>b{font-size:.85em}.sl-pyr{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:8px}.sl-pyr .sl-bin{min-height:70px}</style>'));
  if (cfg.prompt) M.el.appendChild(K.el('<div class="sn-panel"><b>' + K.esc(cfg.prompt) + '</b></div>'));
  var area = K.el('<div></div>'); M.el.appendChild(area);
  function report() { var right = C.filter(function (c, i) { return place[i] === c[1]; }).length; M.set({ placed: place.filter(function (p) { return p >= 0; }).length, right: right, allRight: right === C.length }); }
  function cardH(i) { return '<button type="button" class="sl-card' + (sel === i ? ' sel' : '') + '" data-c="' + i + '">' + K.esc(C[i][0]) + '</button>'; }
  function binH(b, bi, w) { return '<div class="sl-bin" data-b="' + bi + '" role="button" tabindex="0" style="border-color:' + b[2] + ';background:' + b[2] + '1f' + (w ? ';width:' + w + '%' : '') + '"><b>' + (b[1] || '') + ' ' + K.esc(b[0]) + '</b><div style="display:flex;flex-wrap:wrap;gap:5px">' + order.filter(function (i) { return place[i] === bi; }).map(cardH).join('') + '</div></div>'; }
  function draw() {
    var h = '<p class="sn-note">Tap a card, then tap the box where it belongs. Tap a placed card to move it.</p><div class="sl-pool">' + order.filter(function (i) { return place[i] < 0; }).map(cardH).join('') + '</div>';
    if (cfg.layout === 'pyramid') h += '<div class="sl-pyr">' + B.map(function (b, bi) { return binH(b, bi, 40 + bi * (60 / Math.max(1, B.length - 1))); }).join('') + '</div>';
    else h += '<div class="sl-bins">' + B.map(function (b, bi) { return binH(b, bi); }).join('') + '</div>';
    h += '<div class="sn-row" style="margin-top:8px"><button type="button" class="sn-b" data-chk>✓ Check</button><span class="sn-note" data-msg></span></div>';
    area.innerHTML = h;
    area.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var i = +b.getAttribute('data-c'); if (place[i] >= 0) { place[i] = -1; sel = i; } else sel = sel === i ? -1 : i; report(); draw(); }); });
    area.querySelectorAll('[data-b]').forEach(function (z) { function drop() { if (sel < 0) return; place[sel] = +z.getAttribute('data-b'); sel = -1; report(); draw(); } z.addEventListener('click', drop); z.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
    area.querySelector('[data-chk]').addEventListener('click', function () {
      var bad = C.map(function (c, i) { return place[i] >= 0 && place[i] !== c[1] ? i : -1; }).filter(function (i) { return i >= 0; });
      var msg = area.querySelector('[data-msg]');
      if (bad.length) { M.bump('wrong', bad.length); msg.textContent = '✗ ' + bad.length + ' card(s) went back. Hint: ' + (C[bad[0]][2] || 'Reread the card.'); bad.forEach(function (i) { place[i] = -1; }); report(); setTimeout(draw, 1800); }
      else msg.textContent = place.indexOf(-1) >= 0 ? '✓ All placed cards are right. Keep going!' : '✓ Every card is in the right place!';
    });
  }
  report(); draw();
  return { auto: function () { C.forEach(function (c, i) { place[i] = c[1]; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Decision turns: make choices as a historical figure, watch meters,   */
/* then compare with what really happened.                              */
/* cfg: { role, meters:[[id,label,icon,start]], turns:[{year,title,text,source:{by,text},options:[{label,fx:{},result,hist}]}] } */
/* state: turn, m_<id>, choice_<t>, hist_<t>, nhist, done                  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.turnSim = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var T = cfg.turns, MT = cfg.meters || [], vals = {}, t = 0, chosen = null, hist = {};
  var texts = []; T.forEach(function (x) { texts.push(x.text || ''); if (x.source) texts.push(x.source.text); x.options.forEach(function (o) { texts.push(o.result || ''); }); });
  M.def.passageText = texts.join(' ');
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.ts-m{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}.ts-bar{height:12px;border-radius:6px;background:#e9ecef;overflow:hidden;margin-top:3px}.ts-bar i{display:block;height:100%;border-radius:6px;transition:width .6s}.ts-card{background:linear-gradient(#fffaf0,#f6ead0);border:2px solid #b08968;border-radius:14px;padding:14px 16px;margin-top:10px}.ts-yr{display:inline-block;background:#8b5e34;color:#fff;border-radius:999px;padding:2px 10px;font-weight:800;font-size:.8em}.ts-opt{display:block;width:100%;text-align:left;border:2px solid #1d2433;background:#fff;border-radius:10px;padding:9px 12px;margin-top:7px;cursor:pointer;font:inherit}.ts-opt:hover{background:#fff3bf}.ts-opt.on{background:#ffe066}.ts-res{margin-top:10px;padding:10px 12px;border-radius:10px;background:#fff;border-left:5px solid #1c7ed6}.ts-hist{margin-top:8px;padding:10px 12px;border-radius:10px;background:#f3e3bf;border-left:5px solid #8b5e34}.ts-dots{display:flex;gap:5px;margin-top:8px}.ts-dots i{width:22px;height:6px;border-radius:3px;background:#dee2e6}.ts-dots i.on{background:#8b5e34}</style>'));
  var mBox = K.el('<div class="sn-panel"></div>'), card = K.el('<div></div>');
  M.el.appendChild(mBox); M.el.appendChild(card);
  function reset() { vals = {}; MT.forEach(function (m) { vals[m[0]] = m[3]; }); t = 0; chosen = null; hist = {}; report(); draw(); }
  function report() { var st = { turn: t, nhist: Object.keys(hist).filter(function (k) { return hist[k]; }).length, done: t >= T.length }; MT.forEach(function (m) { st['m_' + m[0]] = vals[m[0]]; }); M.set(st); }
  function choose(i) {
    if (chosen != null) return; chosen = i; var o = T[t].options[i];
    for (var k in (o.fx || {})) vals[k] = K.clamp((vals[k] || 0) + o.fx[k], 0, 100);
    hist[t] = !!o.hist; var st = {}; st['choice_' + t] = i; st['hist_' + t] = !!o.hist; M.set(st); report(); draw();
  }
  function next() { t++; chosen = null; report(); draw(); }
  function draw() {
    mBox.innerHTML = '<div class="sn-row" style="justify-content:space-between"><b>' + K.esc(cfg.role || 'Your role') + '</b><span class="sn-note">Decision ' + Math.min(t + 1, T.length) + ' of ' + T.length + '</span></div><div class="ts-m">' + MT.map(function (m) { var v = vals[m[0]], col = m[4] || (v >= 60 ? '#2b8a3e' : v >= 35 ? '#f59f00' : '#c92a2a'); return '<div><b style="font-size:.85em">' + m[2] + ' ' + K.esc(m[1]) + '</b> <span class="sn-note">' + Math.round(v) + '</span><div class="ts-bar"><i style="width:' + v + '%;background:' + col + '"></i></div></div>'; }).join('') + '</div><div class="ts-dots">' + T.map(function (x, i) { return '<i class="' + (i < t || (i === t && chosen != null) ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    card.innerHTML = '';
    if (t >= T.length) {
      var n = Object.keys(hist).filter(function (k) { return hist[k]; }).length;
      var end = K.el('<div class="ts-card"><h3 style="margin:0">🏁 ' + K.esc(cfg.endTitle || 'Your story is complete') + '</h3><p>You made the same choice as history in <b>' + n + ' of ' + T.length + '</b> decisions.</p>' + (cfg.ending ? '<p>' + K.esc(cfg.ending) + '</p>' : '') + '</div>');
      end.appendChild(K.btn('↺ Replay with different choices', reset, 'sm')); card.appendChild(end); return;
    }
    var x = T[t];
    var c = K.el('<div class="ts-card"><span class="ts-yr">' + K.esc(String(x.year || '')) + '</span><h3 style="margin:.3em 0">' + K.esc(x.title) + '</h3><p style="margin:.3em 0">' + K.esc(x.text) + '</p>' + (x.source ? '<div class="ex-src" style="background:#f3e3bf;border-left:6px solid #8b5e34;border-radius:6px;padding:8px 12px;font-family:Georgia,serif;font-style:italic"><small style="display:block;font-style:normal;font-weight:700">📜 ' + K.esc(x.source.by) + '</small>' + K.esc(x.source.text) + '</div>' : '') + '<b style="display:block;margin-top:8px">' + K.esc(x.ask || 'What do you do?') + '</b></div>');
    x.options.forEach(function (o, i) { var b = K.el('<button type="button" class="ts-opt' + (chosen === i ? ' on' : '') + '">' + K.esc(o.label) + '</button>'); if (chosen != null) b.disabled = true; b.addEventListener('click', function () { choose(i); }); c.appendChild(b); });
    if (chosen != null) {
      var o = x.options[chosen], h = x.options.filter(function (q) { return q.hist; })[0];
      c.appendChild(K.el('<div class="ts-res"><b>Result:</b> ' + K.esc(o.result) + ' <span class="sn-note">(' + Object.keys(o.fx || {}).map(function (k) { var m = MT.filter(function (q) { return q[0] === k; })[0]; return (m ? m[2] + ' ' + m[1] : k) + ' ' + (o.fx[k] > 0 ? '+' : '') + o.fx[k]; }).join(', ') + ')</span></div>'));
      if (h) c.appendChild(K.el('<div class="ts-hist"><b>📜 What really happened:</b> ' + K.esc(x.real || h.result) + (o.hist ? ' <b>You matched history!</b>' : '') + '</div>'));
      c.appendChild(K.btn(t + 1 < T.length ? 'Next decision ▶' : 'See the ending ▶', next, 'primary'));
    }
    card.appendChild(c);
  }
  reset();
  return { auto: function (st) { var c = st.goal.check || {}; var want = c.done ? T.length : (c.turn && (c.turn.gte || c.turn)) || T.length; while (t < want && t < T.length) { var hi = 0; T[t].options.forEach(function (o, i) { if (o.hist) hi = i; }); choose(hi); next(); } } };
};

/* ------------------------------------------------------------------ */
/* Colony Builder: assign 10 settlers to jobs and run a year            */
/* cfg: { settlers, regions:[{id,name,icon,climate,soil,season,color,note,yields:{job:[food,money]}}], jobs:[[id,label,icon]] } */
/* state: region, runs, money_<r>, food_<r>, fed_<r>, top_<r>, best_<r>     */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.colonySim = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var R = cfg.regions, J = cfg.jobs, N = cfg.settlers || 10, reg = R[0].id, crew = {}, runs = 0, hist = {};
  J.forEach(function (j) { crew[j[0]] = 0; }); crew[J[0][0]] = N;
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.cs-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:10px}.cs-job{display:grid;grid-template-columns:1fr auto auto auto;gap:6px;align-items:center;padding:5px 0;border-bottom:1px dashed var(--sn-line)}.cs-job b{font-size:1.2em;min-width:1.5em;text-align:center}.cs-ppl{font-size:1.05em;letter-spacing:-2px;min-height:1.3em}.cs-res{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.cs-log{font-size:.88em;max-height:170px;overflow:auto}@media(max-width:760px){.cs-grid{grid-template-columns:1fr}}</style>'));
  var tabs = K.seg(R.map(function (r) { return [r.id, r.icon + ' ' + r.name]; }), reg, function (v) { reg = v; draw(); });
  var bar = K.el('<div class="sn-ctrls"><b class="sn-note">Region:</b></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var grid = K.el('<div class="cs-grid"></div>'), left = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>'), right = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  grid.appendChild(left); grid.appendChild(right); M.el.appendChild(grid);
  var svg = K.svgEl('svg', { viewBox: '0 0 400 190', class: 'sn-svg', 'aria-hidden': 'true' });
  var info = K.el('<div class="sn-panel"></div>'), jobs = K.el('<div class="sn-panel"></div>'), res = K.el('<div class="sn-panel"></div>');
  left.appendChild(svg); left.appendChild(info); right.appendChild(jobs); right.appendChild(res);
  var runB = K.btn('▶ Run one year', run, 'primary');
  function R_() { return R.filter(function (r) { return r.id === reg; })[0]; }
  function used() { var n = 0; for (var k in crew) n += crew[k]; return n; }
  function scene() {
    var r = R_(), h = '<defs><linearGradient id="csk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + (r.sky || '#a5d8ff') + '"/><stop offset="1" stop-color="#e7f5ff"/></linearGradient></defs><rect width="400" height="190" fill="url(#csk)"/>';
    h += '<rect y="120" width="400" height="70" fill="' + r.color + '"/><path d="M280 120 Q330 110 400 118 L400 190 L300 190Z" fill="#4dabf7"/>';
    if (r.id === 'ne') h += '<path d="M0 120 L60 70 L110 120Z M70 120 L140 60 L200 120Z" fill="#868e96"/><path d="M60 70 l-10 12 h20Z M140 60 l-11 13 h22Z" fill="#fff"/>' + '<g font-size="16">' + '<text x="20" y="150">🪨</text><text x="120" y="160">🪨</text><text x="210" y="145">🌲</text><text x="240" y="160">🌲</text></g>';
    if (r.id === 'mid') h += '<path d="M0 120 Q100 100 200 118 Q260 108 300 120Z" fill="#94d82d"/><g font-size="16"><text x="20" y="150">🌾</text><text x="60" y="160">🌾</text><text x="100" y="148">🌾</text><text x="150" y="162">🌾</text><text x="200" y="150">🌾</text></g>';
    if (r.id === 'south') h += '<circle cx="60" cy="40" r="22" fill="#ffd43b"/><g font-size="16"><text x="20" y="150">🌿</text><text x="70" y="162">🌿</text><text x="120" y="150">🌿</text><text x="180" y="160">🌿</text><text x="230" y="146">🌳</text></g>';
    var jx = 20; J.forEach(function (j) { for (var i = 0; i < crew[j[0]]; i++) { h += '<text x="' + (jx) + '" y="112" font-size="15">' + j[2] + '</text>'; jx += 26; } });
    svg.innerHTML = h;
  }
  function draw() {
    var r = R_(); scene();
    info.innerHTML = '<h3 style="margin:0 0 4px">' + r.icon + ' ' + K.esc(r.name) + ' colonies</h3><div><b>🌡 Climate:</b> ' + K.esc(r.climate) + '</div><div><b>🟫 Soil & land:</b> ' + K.esc(r.soil) + '</div><div><b>📅 Growing season:</b> ' + K.esc(r.season) + '</div>' + (r.note ? '<p class="sn-note" style="margin:.4em 0 0">' + K.esc(r.note) + '</p>' : '');
    jobs.innerHTML = '<div class="sn-row" style="justify-content:space-between"><h3 style="margin:0">👥 Assign ' + N + ' settlers</h3><span class="sn-note">' + used() + ' / ' + N + ' assigned</span></div>';
    J.forEach(function (j) {
      var row = K.el('<div class="cs-job"><span>' + j[2] + ' ' + K.esc(j[1]) + '<div class="cs-ppl">' + new Array(crew[j[0]] + 1).join('🧑') + '</div></span></div>');
      var m = K.btn('−', function () { if (crew[j[0]] > 0) { crew[j[0]]--; draw(); } }, 'sm'), p = K.btn('+', function () { if (used() < N) { crew[j[0]]++; draw(); } else M.toast('All settlers are busy. Take one from another job first.', true); }, 'sm');
      row.appendChild(m); row.appendChild(K.el('<b>' + crew[j[0]] + '</b>')); row.appendChild(p); jobs.appendChild(row);
    });
    jobs.appendChild(runB);
    var hh = hist[reg] || [];
    res.innerHTML = '<h3 style="margin:0 0 4px">📒 Colony ledger: ' + K.esc(r.name) + '</h3>' + (hh.length ? '<div class="cs-log">' + hh.map(function (x, i) { return '<div>Year ' + (i + 1) + ': ' + x.mix + ' → 🍞 ' + x.food + ' food, 💰 £' + x.money + (x.fed ? '' : ' <b style="color:#c92a2a">(hungry winter!)</b>') + '</div>'; }).join('') + '</div>' : '<p class="sn-note">Assign settlers, then run a year to see what this land produces.</p>');
  }
  function run() {
    if (used() < N) { M.toast('Assign all ' + N + ' settlers first.', true); return; }
    var r = R_(), food = 0, money = 0;
    J.forEach(function (j) { var y = r.yields[j[0]] || [0, 0]; food += y[0] * crew[j[0]]; money += y[1] * crew[j[0]]; });
    var fed = food >= N; if (fed) money += Math.floor(food - N); else money -= Math.ceil((N - food) * 2);
    food = Math.round(food * 10) / 10; money = Math.round(money);
    var top = J.slice().sort(function (a, b) { return crew[b[0]] - crew[a[0]]; })[0][0];
    var mix = J.filter(function (j) { return crew[j[0]]; }).map(function (j) { return crew[j[0]] + ' ' + j[2]; }).join(' ');
    (hist[reg] = hist[reg] || []).push({ food: food, money: money, fed: fed, mix: mix }); runs++;
    var best = Math.max.apply(null, hist[reg].map(function (x) { return x.money; }));
    var st = { region: reg, runs: runs }; st['money_' + reg] = money; st['food_' + reg] = food; st['fed_' + reg] = fed; st['top_' + reg] = top; st['best_' + reg] = best; st['ran_' + reg] = true; M.set(st);
    M.toast(fed ? 'Harvest in! Extra food sold at market.' : 'Not enough food! Settlers had to buy food.', !fed);
    if (reg === 'south' && crew.cash && r.warn) M.toast(r.warn);
    draw();
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; R.forEach(function (r) { var need = false; for (var k in c) if (k.indexOf('_' + r.id) > 0) need = true; if (!need) return; reg = r.id; tabs.set(reg); var bestJ = null, bestV = -1e9; J.forEach(function (j) { var y = r.yields[j[0]] || [0, 0], v = y[0] + y[1]; if (v > bestV) { bestV = v; bestJ = j[0]; } }); var ans = (cfg.auto || {})[r.id]; J.forEach(function (j) { crew[j[0]] = 0; }); if (ans) for (var k2 in ans) crew[k2] = ans[k2]; else crew[bestJ] = N; run(); }); } };
};

/* ------------------------------------------------------------------ */
/* How a Bill Becomes a Law (with checks and balances)                  */
/* cfg: { bills:[{title, text, ok (constitutional), why}] }               */
/* state: bill, stage, law, vetoed, overridden, struck, died, path_<name> */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.lawMachine = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var BL = cfg.bills, bi = 0, stage, log, votes = {};
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.lm-row{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.lm-b{border:3px solid #adb5bd;border-radius:12px;padding:6px;text-align:center;background:#fff;font-size:.8em;position:relative}.lm-b .i{font-size:2em;display:block}.lm-b.on{border-color:#1c7ed6;box-shadow:0 0 0 4px #a5d8ff}.lm-b.done{border-color:#2b8a3e;background:#ebfbee}.lm-b.no{border-color:#c92a2a;background:#fff5f5}.lm-bill{background:#fffdf5;border:2px solid #1d2433;border-radius:6px;padding:10px 12px;font-family:Georgia,serif;box-shadow:4px 4px 0 #1d243322}.lm-log{font-size:.88em}.lm-log div{padding:3px 0;border-bottom:1px dashed var(--sn-line)}@media(max-width:600px){.lm-row{grid-template-columns:1fr 1fr}}</style>'));
  var top = K.el('<div class="sn-ctrls"></div>');
  var pick = K.seg(BL.map(function (b, i) { return [String(i), '📜 Bill ' + (i + 1)]; }), '0', function (v) { bi = +v; reset(); });
  top.appendChild(pick.el); M.el.appendChild(top);
  var billBox = K.el('<div class="lm-bill"></div>'), row = K.el('<div class="lm-row" style="margin:10px 0"></div>'), ctl = K.el('<div class="sn-panel"></div>'), logB = K.el('<div class="sn-panel"><h3 style="margin:0">🗞 What happened</h3><div class="lm-log"></div></div>');
  [billBox, row, ctl, logB].forEach(function (e) { M.el.appendChild(e); });
  var ST = [['house', '🏛', 'House of Representatives', '435 members'], ['senate', '🏛', 'Senate', '100 members'], ['pres', '🏠', 'President', 'sign or veto'], ['court', '⚖️', 'Supreme Court', 'if challenged']];
  function reset() { stage = 'house'; log = []; votes = { house: 230, senate: 55, oh: 300, os: 70 }; M.set({ bill: bi, stage: stage, law: false, vetoed: false, overridden: false, struck: false, died: false }); draw(); }
  function say(t) { log.push(t); }
  function end(path) { var st = { stage: 'end' }; st['path_' + path] = true; st['bill_' + bi + '_' + path] = true; M.set(st); stage = 'end'; draw(); }
  function slider(label, key, max, need) {
    var s = K.slider({ label: label, min: 0, max: max, value: votes[key], unit: 'yes votes', onInput: function (v) { votes[key] = v; lab.textContent = v >= need ? '✓ enough to pass (' + need + ' needed)' : '✗ not enough (' + need + ' needed)'; } });
    var lab = K.el('<div class="sn-note"></div>'); lab.textContent = votes[key] >= need ? '✓ enough to pass (' + need + ' needed)' : '✗ not enough (' + need + ' needed)';
    ctl.appendChild(s.el); ctl.appendChild(lab);
  }
  function draw() {
    var b = BL[bi];
    billBox.innerHTML = '<b>📜 ' + K.esc(b.title) + '</b><div style="margin-top:4px">' + K.esc(b.text) + '</div>';
    var reached = { house: 0, senate: 1, pres: 2, court: 3, end: 4 };
    var S = M.state;
    row.innerHTML = ST.map(function (s) {
      var cls = stage === s[0] || (stage === 'override' && (s[0] === 'house' || s[0] === 'senate')) ? 'on' : '';
      if (s[0] === 'house' && (S.passHouse)) cls = cls || 'done'; if (s[0] === 'senate' && S.passSenate) cls = cls || 'done';
      if (s[0] === 'pres' && (S.signed || S.overridden)) cls = 'done'; if (s[0] === 'pres' && S.vetoed && !S.overridden && stage !== 'override') cls = 'no';
      if (s[0] === 'court' && S.upheld) cls = 'done'; if (s[0] === 'court' && S.struck) cls = 'no';
      return '<div class="lm-b ' + cls + '"><span class="i">' + s[1] + '</span><b>' + s[2] + '</b><div class="sn-note">' + s[3] + '</div></div>';
    }).join('');
    logB.querySelector('.lm-log').innerHTML = log.length ? log.map(function (x) { return '<div>' + x + '</div>'; }).join('') : '<div class="sn-note">The bill is waiting in the House.</div>';
    ctl.innerHTML = '';
    if (stage === 'house') { ctl.appendChild(K.el('<h3 style="margin:0">🏛 House vote (Legislative branch)</h3><p class="sn-note">A bill needs a simple majority: more than half of 435 = <b>218</b> votes.</p>')); slider('House', 'house', 435, 218); ctl.appendChild(K.btn('🗳 Hold the vote', function () { if (votes.house >= 218) { say('🏛 The House passed the bill ' + votes.house + '–' + (435 - votes.house) + '.'); M.set('passHouse', true); stage = 'senate'; draw(); } else { say('🏛 The House voted it down ' + votes.house + '–' + (435 - votes.house) + '. The bill dies.'); M.set({ died: true }); end('diedHouse'); } }, 'primary')); }
    else if (stage === 'senate') { ctl.appendChild(K.el('<h3 style="margin:0">🏛 Senate vote (Legislative branch)</h3><p class="sn-note">More than half of 100 = <b>51</b> votes.</p>')); slider('Senate', 'senate', 100, 51); ctl.appendChild(K.btn('🗳 Hold the vote', function () { if (votes.senate >= 51) { say('🏛 The Senate passed the bill ' + votes.senate + '–' + (100 - votes.senate) + '. It goes to the President.'); M.set('passSenate', true); stage = 'pres'; draw(); } else { say('🏛 The Senate voted it down. The bill dies.'); M.set({ died: true }); end('diedSenate'); } }, 'primary')); }
    else if (stage === 'pres') { ctl.appendChild(K.el('<h3 style="margin:0">🏠 The President decides (Executive branch)</h3><p class="sn-note">Sign it into law, or VETO it (reject it). A veto is a check on Congress.</p>')); var r2 = K.el('<div class="sn-row"></div>'); r2.appendChild(K.btn('✍️ Sign it', function () { say('✍️ The President signed the bill. It is now a LAW.'); M.set({ signed: true, law: true }); stage = 'court'; draw(); }, 'primary')); r2.appendChild(K.btn('🚫 Veto it', function () { say('🚫 The President vetoed the bill. Congress can try to override with a 2/3 vote in BOTH houses.'); M.set({ vetoed: true }); stage = 'override'; draw(); })); ctl.appendChild(r2); }
    else if (stage === 'override') { ctl.appendChild(K.el('<h3 style="margin:0">🔁 Override vote (Congress checks the President)</h3><p class="sn-note">Two-thirds are needed: <b>290</b> of 435 in the House AND <b>67</b> of 100 in the Senate.</p>')); slider('House override', 'oh', 435, 290); slider('Senate override', 'os', 100, 67); ctl.appendChild(K.btn('🗳 Hold the override votes', function () { if (votes.oh >= 290 && votes.os >= 67) { say('🔁 Congress overrode the veto (' + votes.oh + ' House, ' + votes.os + ' Senate). The bill becomes LAW without the President\'s signature.'); M.set({ overridden: true, law: true }); stage = 'court'; draw(); } else { say('🔁 The override failed (' + votes.oh + ' House, ' + votes.os + ' Senate). The veto stands and the bill dies.'); M.set({ died: true }); end('vetoStands'); } }, 'primary')); }
    else if (stage === 'court') { ctl.appendChild(K.el('<h3 style="margin:0">⚖️ Is the law challenged? (Judicial branch)</h3><p class="sn-note">If someone sues, the Supreme Court can decide whether the law follows the Constitution.</p>')); var r3 = K.el('<div class="sn-row"></div>'); r3.appendChild(K.btn('⚖️ Challenge it in court', function () { var b2 = BL[bi]; if (b2.ok) { say('⚖️ The Supreme Court UPHELD the law: ' + b2.why); M.set({ upheld: true }); end(M.state.overridden ? 'override' : 'signed'); } else { say('⚖️ The Supreme Court STRUCK DOWN the law as unconstitutional: ' + b2.why); M.set({ struck: true, law: false }); end('struck'); } }, 'primary')); r3.appendChild(K.btn('No challenge', function () { say('📘 No one challenged the law. It stays in effect.'); end(M.state.overridden ? 'override' : 'signed'); })); ctl.appendChild(r3); }
    else { ctl.appendChild(K.el('<h3 style="margin:0">🏁 Final result: ' + (M.state.law ? '✅ LAW' : '❌ NOT a law') + '</h3>')); ctl.appendChild(K.btn('↺ Try this bill again', reset, 'sm')); }
  }
  reset();
  return { auto: function (st) { var c = st.goal.check || {}, s = {}; for (var k in c) s[k] = typeof c[k] === 'object' ? (c[k].gte != null ? c[k].gte : true) : c[k]; M.set(s); } };
};

/* ------------------------------------------------------------------ */
/* Maya Number Lab: base-20 dots, bars, and shells                      */
/* cfg: { targets:[n...] }  state: value, built_<n>, nBuilt, usedZero, decoded */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.mayaCount = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var TG = cfg.targets || [7, 20, 45, 100, 400], lv = [{ d: 0, b: 0 }, { d: 0, b: 0 }, { d: 0, b: 0 }], ti = 0, built = {};
  M.el.innerHTML = '';
  var grid = K.el('<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px"></div>'), stele = K.el('<div></div>'), side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  grid.appendChild(stele); grid.appendChild(side); M.el.appendChild(grid);
  var reads = K.el('<div class="sn-reads"></div>'), rV = K.readout('Your number', '', true), rT = K.readout('Target', ''); reads.appendChild(rV.el); reads.appendChild(rT.el); side.appendChild(reads);
  var mis = K.el('<div class="sn-panel"></div>'); side.appendChild(mis);
  var key = K.el('<div class="sn-panel"><b>Maya number key</b><div>● dot = 1 · ▬ bar = 5 · 🐚 shell = 0</div><div class="sn-note">Each level up is worth 20 times more: 1s, 20s, 400s. A level can hold at most 4 dots and 3 bars (up to 19).</div></div>'); side.appendChild(key);
  function val(l) { return l.b * 5 + l.d; }
  function total() { return val(lv[0]) + val(lv[1]) * 20 + val(lv[2]) * 400; }
  function report() { var v = total(), st = { value: v, nBuilt: Object.keys(built).length }; if (v === TG[ti] && !built[v]) { built[v] = true; st['built_' + v] = true; st.nBuilt = Object.keys(built).length; M.toast('🎉 You built ' + v + ' the Maya way!'); } if (lv[1].d + lv[1].b === 0 && (lv[2].d + lv[2].b) > 0 || (v >= 20 && val(lv[0]) === 0)) st.usedZero = true; M.set(st); }
  function glyph(l, x, y) { var h = ''; if (l.d + l.b === 0) return '<text x="' + x + '" y="' + (y + 12) + '" font-size="34" text-anchor="middle">🐚</text>'; var dx = x - (l.d - 1) * 14; for (var i = 0; i < l.d; i++) h += '<circle cx="' + (dx + i * 28) + '" cy="' + (y - 14) + '" r="9" fill="#5c3d1e"/>'; for (var j = 0; j < l.b; j++) h += '<rect x="' + (x - 55) + '" y="' + (y + 2 + j * 18) + '" width="110" height="12" rx="6" fill="#5c3d1e"/>'; return h; }
  function draw() {
    stele.innerHTML = '';
    var svg = K.svgEl('svg', { viewBox: '0 0 300 360', class: 'sn-svg', role: 'img', 'aria-label': 'Maya number stele' });
    var h = '<rect width="300" height="360" rx="18" fill="#d8c3a5"/><rect x="12" y="12" width="276" height="336" rx="12" fill="#e6d5b8" stroke="#8b5e34" stroke-width="3"/>';
    ['400s', '20s', '1s'].forEach(function (n, i) { var y = 30 + i * 108; h += '<rect x="24" y="' + y + '" width="252" height="96" rx="10" fill="#f1e4cc" stroke="#b08968"/><text x="32" y="' + (y + 16) + '" font-size="11" font-weight="800" fill="#8b5e34">' + n + ' level = ' + val(lv[2 - i]) + ' × ' + [400, 20, 1][i] + '</text>' + glyph(lv[2 - i], 150, y + 48); });
    svg.innerHTML = h; stele.appendChild(svg);
    var ctr = K.el('<div class="sn-ctrls" style="flex-wrap:wrap"></div>');
    [2, 1, 0].forEach(function (i) {
      var nm = ['1s', '20s', '400s'][i], box = K.el('<div class="sn-row" style="gap:4px"><b style="min-width:3.5em">' + nm + ':</b></div>');
      box.appendChild(K.btn('+ ●', function () { var l = lv[i]; if (l.d < 4) l.d++; else if (l.b < 3) { l.d = 0; l.b++; M.toast('Five dots become one bar!'); } else M.toast('A level holds 19 at most. Carry to the next level up!', true); report(); draw(); }, 'sm'));
      box.appendChild(K.btn('+ ▬', function () { var l = lv[i]; if (l.b < 3) l.b++; else M.toast('Three bars (15) is the most a level holds.', true); report(); draw(); }, 'sm'));
      box.appendChild(K.btn('↺', function () { lv[i] = { d: 0, b: 0 }; report(); draw(); }, 'sm ghost'));
      ctr.appendChild(box);
    });
    stele.appendChild(ctr);
    rV.set(total()); rT.set(TG[ti]);
    mis.innerHTML = '<b>🎯 Mission ' + (ti + 1) + ' of ' + TG.length + ':</b> Carve the number <b>' + TG[ti] + '</b> on the stele.' + (built[TG[ti]] ? ' ✓ Done!' : '') + '<div class="sn-note">Built: ' + (Object.keys(built).join(', ') || 'none yet') + '</div>';
    var nx = K.btn('Next mission ▶', function () { ti = (ti + 1) % TG.length; draw(); }, 'sm'); mis.appendChild(nx);
  }
  report(); draw();
  return { auto: function () { TG.forEach(function (n, i) { ti = i; var a = Math.floor(n / 400), b = Math.floor((n % 400) / 20), c = n % 20; lv = [{ b: Math.floor(c / 5), d: c % 5 }, { b: Math.floor(b / 5), d: b % 5 }, { b: Math.floor(a / 5), d: a % 5 }]; report(); }); M.set('usedZero', true); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Printing Press Race: scribes vs. Gutenberg's press                   */
/* cfg: { pages }  state: days, books_s, books_p, ratio, cost_s, cost_p, ran */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.pressRace = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var PAGES = cfg.pages || 200, SPD = 4, PPD = 3600, WAGE = 1, SETUP = 300, CREW = 5, day = 0, running = false, bs = 0, bp = 0, acc = 0;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>');
  var shopS = K.el('<div class="sn-panel" style="background:#fff9db"><h3 style="margin:0">✒️ Scriptorium (hand copying)</h3><div data-v style="font-size:1.6em;letter-spacing:-3px;min-height:2em"></div><div class="sn-note" data-t></div></div>');
  var shopP = K.el('<div class="sn-panel" style="background:#e7f5ff"><h3 style="margin:0">🖨 Print shop (movable type)</h3><div data-v style="font-size:1.6em;letter-spacing:-3px;min-height:2em"></div><div class="sn-note" data-t></div></div>');
  row.appendChild(shopS); row.appendChild(shopP); M.el.appendChild(row);
  var ctr = K.el('<div class="sn-ctrls"></div>');
  var sS = K.slider({ label: 'Scribes', min: 1, max: 20, value: 5, onInput: function () { reset(); } });
  var sP = K.slider({ label: 'Printing presses', min: 0, max: 3, value: 1, onInput: function () { reset(); } });
  var sD = K.slider({ label: 'Race length', min: 10, max: 365, step: 5, value: 100, unit: 'days', onInput: function () { reset(); } });
  var go = K.btn('▶ Start the race', function () { if (day >= sD.get()) reset(); running = true; M.set('ran', true); }, 'primary');
  [sS, sP, sD].forEach(function (s) { ctr.appendChild(s.el); }); ctr.appendChild(go); ctr.appendChild(K.btn('↺', function () { reset(); }, 'ghost'));
  M.el.appendChild(ctr);
  var gr = K.graph({ title: 'Books finished over time', xLabel: 'days', yLabel: 'books', xMax: 100, yMax: 50, series: [{ name: 'Scribes', color: '#e67700' }, { name: 'Press', color: '#1c7ed6' }] });
  var reads = K.el('<div class="sn-reads"></div>'), rD = K.readout('Day', ''), rS = K.readout('Scribe books', ''), rP = K.readout('Press books', ''), rC = K.readout('Cost per book (scribes / press)', 'florins');
  [rD, rS, rP, rC].forEach(function (r) { reads.appendChild(r.el); });
  var g2 = K.el('<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:10px;margin-top:8px"></div>'); g2.appendChild(gr.el); g2.appendChild(reads); M.el.appendChild(g2);
  M.el.appendChild(K.el('<p class="sn-note">Model: one scribe copies about ' + SPD + ' pages a day. One press (with a crew of ' + CREW + ') prints about ' + PPD.toLocaleString() + ' pages a day. Each book has ' + PAGES + ' pages. A press costs ' + SETUP + ' florins to build; workers earn ' + WAGE + ' florin a day.</p>'));
  function costs() { var d = Math.max(day, 1), cs = bs > 0 ? (sS.get() * WAGE * d) / bs : 0, cp = bp > 0 ? (sP.get() * (SETUP + CREW * WAGE * d)) / bp : 0; return [cs, cp]; }
  function paint() {
    var n = sD.get(); rD.set(Math.floor(day) + ' / ' + n); rS.set(Math.floor(bs)); rP.set(Math.floor(bp).toLocaleString());
    var c = costs(); rC.set((bs >= 1 ? Math.round(c[0]) : '—') + ' / ' + (bp >= 1 ? K.fmt(c[1], 1) : '—'));
    shopS.querySelector('[data-v]').textContent = new Array(Math.min(40, Math.floor(bs)) + 1).join('📕') || '…';
    shopS.querySelector('[data-t]').textContent = sS.get() + ' scribe(s) × ' + SPD + ' pages/day = ' + sS.get() * SPD + ' pages/day';
    shopP.querySelector('[data-v]').textContent = new Array(Math.min(40, Math.ceil(bp / Math.max(1, Math.ceil(bp / 40)))) + 1).join('📘') || '…';
    shopP.querySelector('[data-t]').textContent = sP.get() + ' press(es) × ' + PPD.toLocaleString() + ' pages/day = ' + (sP.get() * PPD).toLocaleString() + ' pages/day' + (bp > 40 ? ' (each 📘 = ' + Math.ceil(bp / 40) + ' books)' : '');
  }
  function report() { var c = costs(); M.set({ days: Math.floor(day), books_s: Math.floor(bs), books_p: Math.floor(bp), ratio: bs >= 1 ? Math.round(bp / bs) : 0, cost_s: Math.round(c[0]), cost_p: Math.round(c[1] * 10) / 10, scribes: sS.get(), presses: sP.get(), raceDays: sD.get() }); }
  function reset() { running = false; day = 0; bs = 0; bp = 0; acc = 0; gr.clear(); gr.range(sD.get(), Math.max(5, Math.ceil(sP.get() * PPD / PAGES * sD.get() * 1.05))); paint(); report(); }
  M.loop(function (dt) {
    if (!running) return; var n = sD.get(), step = dt * n / 5; day = Math.min(n, day + step);
    bs = sS.get() * SPD * day / PAGES; bp = sP.get() * PPD * day / PAGES; acc += step;
    if (acc > n / 40 || day >= n) { acc = 0; gr.add(0, day, bs); gr.add(1, day, bp); report(); }
    paint(); if (day >= n) { running = false; report(); M.toast('Race over! The press finished ' + Math.round(bp).toLocaleString() + ' books; the scribes finished ' + Math.floor(bs) + '.'); }
  });
  reset();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.presses === 0 || (c.presses && c.presses.eq === 0)) sP.set(0, true); if (c.scribes) sS.set(c.scribes.gte || c.scribes, true); if (c.raceDays) sD.set(c.raceDays.gte || c.raceDays, true); var n = sD.get(); day = n; bs = sS.get() * SPD * n / PAGES; bp = sP.get() * PPD * n / PAGES; M.set('ran', true); report(); paint(); } };
};

/* ------------------------------------------------------------------ */
/* Globe Navigator: fly by latitude and longitude                        */
/* cfg: { view:{lon0,lon1,lat0,lat1}, places:[[id,name,lat,lon,icon,fact,hidden]], missions:[[text,id]] } */
/* state: lat, lon, hemNS, hemEW, at_<id>, n_at, flights, tapLat, tapLon, taps */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.globeNav = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var LAND = [
    [[-165,68],[-156,71],[-140,70],[-125,70],[-110,68],[-95,72],[-85,70],[-80,63],[-94,58],[-92,57],[-82,55],[-79,52],[-78,58],[-70,60],[-64,60],[-60,55],[-56,52],[-60,48],[-66,45],[-70,43],[-70,41.5],[-74,40.5],[-76,38],[-76,35],[-78,34],[-81,32],[-80,28],[-80,25.5],[-81.5,25.5],[-83,29],[-85,30],[-89,30],[-94,29.5],[-97,27],[-97.5,22],[-95,19],[-91,19],[-90.5,21],[-87,21.5],[-88,16],[-84,15.5],[-83.5,11],[-81.5,9],[-79,9.5],[-77.5,8.5],[-78,7],[-80,7.5],[-82,8.5],[-86,11],[-88,13.5],[-92,14.5],[-95,16],[-100,17],[-105,20],[-106,23],[-109,26],[-112,29],[-115,31],[-117,32.5],[-120,34.5],[-122,37],[-124,40],[-124,46],[-124.5,48.5],[-128,51],[-131,54],[-135,57],[-140,59.5],[-147,61],[-152,59],[-158,57],[-164,55],[-162,58],[-165,62],[-168,65.5]],
    [[-85,22],[-81,23],[-77,21.5],[-74,20],[-77.5,20],[-80,21.5],[-84,21.8]],
    [[-73,78],[-60,82],[-30,83],[-20,80],[-20,72],[-25,69],[-40,65],[-44,60],[-50,62],[-54,67],[-56,72],[-66,76]],
    [[-77,8],[-75,11],[-71.5,12.5],[-68,10.5],[-62,10.5],[-60,8],[-55,6],[-51,4],[-50,0],[-44,-2.5],[-38,-4],[-35,-7],[-35,-9],[-39,-13],[-39,-17],[-41,-22],[-45,-23.5],[-48.5,-26],[-48.5,-28.5],[-53,-33.5],[-58,-34.5],[-57,-37.5],[-62,-39],[-65,-41],[-64,-43],[-67.5,-46],[-66,-48],[-69,-51],[-68.5,-53],[-71,-54],[-74.5,-52],[-75.5,-46],[-73.5,-41],[-73.5,-37],[-71.5,-30],[-70.5,-23],[-70.3,-18.5],[-75,-15.5],[-77,-12],[-79.5,-7],[-81,-5],[-80,-2],[-80,1],[-79,1.5],[-77.5,4],[-77.5,7]],
    [[-9.5,43],[-8.9,37],[-6,36.2],[-5,36.2],[-2,36.7],[0,38.7],[0.5,40.5],[3.2,42],[3,43.3],[5,43.3],[7.5,43.8],[9.5,44.3],[10.5,43],[12.5,41.5],[15.6,40],[16,38],[17,39],[18.5,40.2],[16,41.5],[14,42.5],[12.3,44.5],[12.5,45.5],[13.7,45.6],[14.5,45.2],[17,43],[19.5,41.8],[19.5,40],[21,38],[23,36.5],[24,38],[23,39.5],[24,40.8],[26,40.8],[29,41.2],[28,42],[28,43.5],[29.7,45.3],[31.5,46.6],[33.5,46],[34.8,44.4],[36.6,45.2],[38,47],[39.7,47.1],[38.3,46.4],[40,43.5],[41.5,41.6],[45,42],[50,42],[50,68],[45,68],[40,66.5],[37,66.5],[34.5,65],[33,66.8],[36,69.1],[33,69.4],[30,70],[28,71],[24,71],[19.5,70],[16,69],[13,67.5],[12.5,65.5],[10.5,64],[8,63],[5,62],[5,60],[5.5,58.9],[7.5,58],[10.5,59.3],[11.2,58.9],[12,57.5],[12.9,55.5],[14.3,55.5],[16.5,56.3],[16.6,57.8],[18.9,59.8],[17.3,60.7],[17.5,62.5],[21,64.5],[22.3,65.8],[25.3,65.3],[25,64.3],[21.5,62.5],[21.5,61],[22.9,59.9],[25,60.3],[28,60.5],[30,60],[28,59.5],[24,59.3],[23.5,58.5],[24.2,57.5],[21.2,57.2],[21,56],[21.2,55.2],[19.8,54.5],[18.5,54.7],[16,54.3],[14.3,53.9],[12,54.2],[10.3,54.5],[10.5,56.2],[10.6,57.7],[8.2,57],[8.1,55.5],[8.6,54],[7,53.5],[5,53.3],[4.6,52.5],[3.5,51.4],[1.8,51],[1.3,50],[0,49.7],[-1.3,49.6],[-1.9,48.7],[-4.7,48.4],[-4.3,47.8],[-2.2,47.2],[-1.2,46],[-1.5,44],[-1.8,43.4],[-4,43.4],[-8,43.7]],
    [[-5.7,50],[-3,50.5],[1.4,51.2],[1.7,52.7],[0.2,53.5],[-0.2,54.5],[-1.6,55.6],[-2.1,57.1],[-1.8,57.6],[-3.3,58.6],[-5,58.6],[-5.7,57],[-5.5,56],[-4.9,55],[-3.1,54.9],[-3.4,54.2],[-3,53.4],[-4.5,53.3],[-4.3,52.3],[-5.3,51.8],[-3.2,51.4],[-4.4,51.1]],
    [[-6,52],[-6.2,53.7],[-5.5,54.6],[-7.5,55.3],[-8.5,54.4],[-10,53.5],[-10.3,51.8],[-8,51.6]],
    [[-22.5,64],[-24,65.5],[-22,66.4],[-16,66.5],[-13.5,65],[-18,63.4]],
    [[12.4,38],[15.6,38.2],[15.1,36.7]], [[8.4,41],[9.8,41],[9.6,39.1],[8.4,39]], [[8.6,41.5],[9.5,41.4],[9.4,43],[8.7,42.6]],
    [[-17,21],[-16,24],[-13,27.5],[-9.8,29.5],[-9.5,32],[-6.8,34],[-5.9,35.8],[-2,35.1],[3,36.8],[10,37.3],[11,35.5],[10,34],[11.5,33],[15.5,32],[20,31],[20,32.6],[23,32.6],[29,31],[32.5,31.3],[34.5,29.5],[37,24.5],[39,21],[43,13],[50,11.5],[50,-5],[10,-5],[9,4],[5,5.5],[-2,5],[-8,4.5],[-13,8],[-15,11.5],[-17,14.7]],
    [[26,40.3],[26.2,38],[27.5,36.8],[30.5,36.3],[36,36.6],[35.5,33],[34.3,31.3],[35,29.5],[35,28],[37,26],[39,22],[42.5,16],[43.5,12.7],[50,13],[50,41],[41.5,41.5],[36,41.7],[33,42],[29,41.2]]
  ];
  var V = cfg.view || { lon0: -130, lon1: 50, lat0: 75, lat1: -60 }, W = 720, H = Math.round(W * (V.lat0 - V.lat1) / (V.lon1 - V.lon0));
  function X(lon) { return (lon - V.lon0) / (V.lon1 - V.lon0) * W; } function Y(lat) { return (V.lat0 - lat) / (V.lat0 - V.lat1) * H; }
  var PL = cfg.places || [], lat = cfg.startLat != null ? cfg.startLat : 40, lon = cfg.startLon != null ? cfg.startLon : -86, tgt = null, tap = null, seen = {}, flights = 0;
  M.el.innerHTML = '';
  var svg = K.svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'sn-svg', role: 'img', 'aria-label': 'Map with latitude and longitude grid' });
  M.el.appendChild(svg);
  var ctr = K.el('<div class="sn-ctrls" style="flex-wrap:wrap"></div>');
  var fin = K.el('<span class="sn-row" style="gap:4px"><b>✈️ Fly to</b><input type="text" inputmode="decimal" aria-label="latitude degrees" style="width:3.4em;font:inherit;padding:3px 5px;border:2px solid var(--sn-line);border-radius:6px">°</span>');
  var ns = 'N', ew = 'W';
  var nsS = K.seg([['N', 'N'], ['S', 'S']], ns, function (v) { ns = v; });
  var lonIn = K.el('<span class="sn-row" style="gap:4px"><input type="text" inputmode="decimal" aria-label="longitude degrees" style="width:3.4em;font:inherit;padding:3px 5px;border:2px solid var(--sn-line);border-radius:6px">°</span>');
  var ewS = K.seg([['E', 'E'], ['W', 'W']], ew, function (v) { ew = v; });
  var goB = K.btn('🛫 Take off', function () {
    var a = K.parseNum(fin.querySelector('input').value), b = K.parseNum(lonIn.querySelector('input').value);
    if (isNaN(a) || isNaN(b) || a < 0 || a > 90 || b < 0 || b > 180) { M.toast('Type latitude (0–90) and longitude (0–180), then pick N/S and E/W.', true); return; }
    fly(ns === 'S' ? -a : a, ew === 'W' ? -b : b);
  }, 'primary');
  [fin, nsS.el, lonIn, ewS.el, goB].forEach(function (e) { ctr.appendChild(e); });
  M.el.appendChild(ctr);
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:10px"></div>');
  var reads = K.el('<div class="sn-reads"></div>'), rPos = K.readout('Plane position', '', true), rTap = K.readout('You tapped', ''), rHere = K.readout('Nearby', '');
  [rPos, rTap, rHere].forEach(function (r) { reads.appendChild(r.el); });
  var mis = K.el('<div class="sn-panel"></div>'); row.appendChild(reads); row.appendChild(mis); M.el.appendChild(row);
  function fmtC(a, b) { return Math.abs(Math.round(a)) + '°' + (a >= 0 ? 'N' : 'S') + ', ' + Math.abs(Math.round(b)) + '°' + (b >= 0 ? 'E' : 'W'); }
  function near(a, b) { var best = null, bd = 1e9; PL.forEach(function (p) { var d = Math.hypot(p[2] - a, (p[3] - b) * Math.cos(a * Math.PI / 180)); if (d < bd) { bd = d; best = p; } }); return bd <= (cfg.tol || 3.5) ? best : null; }
  function fly(a, b) { tgt = [a, b]; flights++; M.set('flights', flights); }
  function land() {
    var p = near(lat, lon), st = { lat: Math.round(lat), lon: Math.round(lon), hemNS: lat >= 0 ? 'N' : 'S', hemEW: lon >= 0 ? 'E' : 'W' };
    if (p) { seen[p[0]] = true; st['at_' + p[0]] = true; st.n_at = Object.keys(seen).length; M.toast((p[4] || '📍') + ' You landed at ' + p[1] + '! ' + (p[5] || '')); } else M.toast('Landed at ' + fmtC(lat, lon) + '. Nothing to see here: check your coordinates.', true);
    M.set(st); draw();
  }
  M.loop(function (dt) {
    if (!tgt) return; var dx = tgt[1] - lon, dy = tgt[0] - lat, d = Math.hypot(dx, dy), sp = 90 * dt;
    if (d <= sp) { lat = tgt[0]; lon = tgt[1]; tgt = null; land(); return; }
    lat += dy / d * sp; lon += dx / d * sp; var pl = svg.querySelector('.gn-pl'); if (pl) { pl.setAttribute('x', X(lon)); pl.setAttribute('y', Y(lat) + 9); } rPos.set(fmtC(lat, lon));
  });
  function draw() {
    var h = '<rect width="' + W + '" height="' + H + '" fill="#a5d8ff"/>';
    LAND.forEach(function (poly) { h += '<path d="M' + poly.map(function (p) { return X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' L') + 'Z" fill="#c3e6a9" stroke="#5c940d" stroke-width="1"/>'; });
    var step = cfg.grid || 10;
    for (var g = Math.ceil(V.lon0 / step) * step; g <= V.lon1; g += step) h += '<line x1="' + X(g) + '" x2="' + X(g) + '" y1="0" y2="' + H + '" stroke="' + (g === 0 ? '#1c7ed6' : '#1d2433') + '" stroke-opacity="' + (g === 0 ? 1 : .22) + '" stroke-width="' + (g === 0 ? 2.5 : 1) + '"/><text x="' + (X(g) + 2) + '" y="' + (H - 4) + '" font-size="10" fill="#1d2433">' + Math.abs(g) + '°' + (g > 0 ? 'E' : g < 0 ? 'W' : '') + '</text>';
    for (var t = Math.ceil(V.lat1 / step) * step; t <= V.lat0; t += step) h += '<line y1="' + Y(t) + '" y2="' + Y(t) + '" x1="0" x2="' + W + '" stroke="' + (t === 0 ? '#e03131' : '#1d2433') + '" stroke-opacity="' + (t === 0 ? 1 : .22) + '" stroke-width="' + (t === 0 ? 2.5 : 1) + '"/><text x="3" y="' + (Y(t) - 3) + '" font-size="10" fill="#1d2433">' + Math.abs(t) + '°' + (t > 0 ? 'N' : t < 0 ? 'S' : '') + '</text>';
    if (V.lat1 < 0 && V.lat0 > 0) h += '<text x="' + (W - 6) + '" y="' + (Y(0) - 4) + '" font-size="11" font-weight="800" fill="#e03131" text-anchor="end">Equator (0°)</text>';
    if (V.lon0 < 0 && V.lon1 > 0) h += '<text x="' + (X(0) + 4) + '" y="14" font-size="11" font-weight="800" fill="#1c7ed6">Prime Meridian (0°)</text>';
    PL.forEach(function (p) { if (p[6] && !seen[p[0]]) return; h += '<circle cx="' + X(p[3]) + '" cy="' + Y(p[2]) + '" r="4" fill="#1d2433"/><text x="' + (X(p[3]) + 6) + '" y="' + (Y(p[2]) - 5) + '" font-size="11" font-weight="700" fill="#1d2433" stroke="#fff" stroke-width="3" paint-order="stroke">' + (p[4] || '') + ' ' + K.esc(p[1]) + '</text>'; });
    if (tap) h += '<g stroke="#e8590c" stroke-width="2"><line x1="' + (X(tap[1]) - 8) + '" x2="' + (X(tap[1]) + 8) + '" y1="' + Y(tap[0]) + '" y2="' + Y(tap[0]) + '"/><line y1="' + (Y(tap[0]) - 8) + '" y2="' + (Y(tap[0]) + 8) + '" x1="' + X(tap[1]) + '" x2="' + X(tap[1]) + '"/></g>';
    h += '<text class="gn-pl" x="' + X(lon) + '" y="' + (Y(lat) + 9) + '" font-size="24" text-anchor="middle">✈️</text><rect class="gn-hit" width="' + W + '" height="' + H + '" fill="transparent"/>';
    svg.innerHTML = h;
    svg.querySelector('.gn-hit').addEventListener('click', function (ev) { var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; var q = pt.matrixTransform(svg.getScreenCTM().inverse()); var la = V.lat0 - q.y / H * (V.lat0 - V.lat1), lo = V.lon0 + q.x / W * (V.lon1 - V.lon0); tap = [la, lo]; rTap.set(fmtC(la, lo)); M.bump('taps'); M.set({ tapLat: Math.round(la), tapLon: Math.round(lo) }); draw(); });
    rPos.set(fmtC(lat, lon)); var p = near(lat, lon); rHere.set(p ? (p[4] || '') + ' ' + p[1] : 'open ' + (Math.abs(lat) < 5 ? 'Equator area' : 'map'));
    mis.innerHTML = '<b>🗺 Flight missions</b>' + (cfg.missions || []).map(function (m) { return '<div style="margin-top:4px">' + (seen[m[1]] ? '✅' : '⬜') + ' ' + K.esc(m[0]) + '</div>'; }).join('');
  }
  M.set({ lat: lat, lon: lon, n_at: 0, flights: 0 }); draw();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var m = k.match(/^at_(\w+)$/); if (m) { var p = PL.filter(function (q) { return q[0] === m[1]; })[0]; lat = p[2]; lon = p[3]; land(); } } if (c.n_at) PL.forEach(function (p) { if (Object.keys(seen).length < (c.n_at.gte || c.n_at)) { lat = p[2]; lon = p[3]; land(); } }); if (c.taps) M.set('taps', 5); if (c.flights) M.set('flights', 5); } };
};

/* ------------------------------------------------------------------ */
/* Climate Lab: how latitude, elevation, oceans, and currents shape climate */
/* cfg: { presets:[[id,name,lat,elev,coast,current,real]] }                */
/* state: lat, elev, coast, current, tavg, range, zone, zone_<z>, preset_<id>, runs */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.climateLab = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var P = cfg.presets || [];
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 300 300', class: 'sn-svg', role: 'img', 'aria-label': 'Landscape showing your place' });
  var right = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  row.appendChild(svg); row.appendChild(right); M.el.appendChild(row);
  var gr = K.graph({ title: 'Average temperature each month (°F)', xLabel: 'month (1 = Jan)', yLabel: '°F', xMax: 12, yMax: 100, yMin: -20, dots: true, series: [{ name: 'Model', color: '#e8590c' }] });
  var reads = K.el('<div class="sn-reads"></div>'), rT = K.readout('Yearly average', '°F', true), rR = K.readout('Summer vs. winter gap', '°F'), rZ = K.readout('Climate zone', '');
  [rT, rR, rZ].forEach(function (r) { reads.appendChild(r.el); }); right.appendChild(reads); right.appendChild(gr.el);
  var ctr = K.el('<div class="sn-ctrls" style="flex-wrap:wrap"></div>');
  var sLat = K.slider({ label: 'Latitude', min: 0, max: 75, value: 40, unit: '° N', onInput: calc });
  var sEl = K.slider({ label: 'Elevation', min: 0, max: 13000, step: 250, value: 750, unit: 'ft', fmt: function (v) { return v.toLocaleString(); }, onInput: calc });
  var coast = 'inland', cur = 'none';
  var cS = K.seg([['coast', '🌊 On the coast'], ['inland', '🏞 Far inland']], coast, function (v) { coast = v; calc(); });
  var uS = K.seg([['warm', '🔴 Warm current'], ['none', 'No current'], ['cold', '🔵 Cold current']], cur, function (v) { cur = v; calc(); });
  [sLat, sEl].forEach(function (s) { ctr.appendChild(s.el); }); ctr.appendChild(cS.el); ctr.appendChild(uS.el);
  M.el.appendChild(ctr);
  if (P.length) { var pr = K.el('<div class="sn-ctrls"><b class="sn-note">Test a real place:</b></div>'); P.forEach(function (p) { pr.appendChild(K.btn(p[1], function () { sLat.set(p[2], true); sEl.set(p[3], true); coast = p[4]; cS.set(coast); cur = p[5]; uS.set(cur); var st = {}; st['preset_' + p[0]] = true; M.set(st); calc(); if (p[6]) M.toast('Real ' + p[1] + ': ' + p[6]); }, 'sm ghost')); }); M.el.appendChild(pr); }
  var runs = 0;
  function calc() {
    var la = sLat.get(), el = sEl.get() / 3281, cst = coast === 'coast';
    var c = 27 - 0.5 * Math.max(0, la - 10) - 4.5 * el + (cur === 'warm' ? (cst ? 5 : 1.5) : cur === 'cold' ? (cst ? -3 : -1) : 0);
    var rg = Math.max(1, la * 0.45 * (cst ? 0.5 : 1.2));
    var months = []; for (var m = 1; m <= 12; m++) months.push([m, (c + rg / 2 * Math.cos(2 * Math.PI * (m - 7) / 12)) * 9 / 5 + 32]);
    var tf = c * 9 / 5 + 32, hi = c + rg / 2, lo = c - rg / 2, zone;
    if (el >= 2.4) zone = 'Highland'; else if (lo >= 18) zone = 'Tropical'; else if (hi < 10) zone = 'Polar'; else if (lo < 0) zone = 'Continental (cold winters)'; else zone = 'Temperate (mild)';
    gr.set(0, months); rT.set(Math.round(tf)); rR.set(Math.round(rg * 9 / 5)); rZ.set(zone);
    runs++; var st = { lat: la, elev: sEl.get(), coast: coast, current: cur, tavg: Math.round(tf), range: Math.round(rg * 9 / 5), zone: zone.split(' ')[0], runs: runs }; st['zone_' + zone.split(' ')[0]] = true; M.set(st);
    scene(la, el, cst, zone);
  }
  function scene(la, el, cst, zone) {
    var snow = zone === 'Polar' || zone === 'Highland' || la > 55, trop = zone === 'Tropical';
    var mh = Math.min(200, 20 + el * 55), h = '<rect width="300" height="300" fill="' + (trop ? '#99e9f2' : snow ? '#e7f5ff' : '#a5d8ff') + '"/><circle cx="' + (60 + la * 2) + '" cy="' + (40 + la * 1.4) + '" r="22" fill="#ffd43b"/>';
    if (cst) h += '<rect x="0" y="230" width="110" height="70" fill="' + (cur === 'warm' ? '#4dabf7' : cur === 'cold' ? '#1864ab' : '#339af0') + '"/>' + (cur !== 'none' ? '<text x="10" y="275" font-size="13" fill="#fff" font-weight="800">' + (cur === 'warm' ? '→ warm water' : '→ cold water') + '</text>' : '');
    h += '<path d="M' + (cst ? 110 : 0) + ' 300 L' + (cst ? 110 : 0) + ' 240 L150 ' + (240 - mh) + ' L230 240 L300 240 L300 300Z" fill="' + (trop ? '#2f9e44' : snow ? '#adb5bd' : '#69db7c') + '"/>';
    if (mh > 90) h += '<path d="M150 ' + (240 - mh) + ' L' + (150 - mh * .18) + ' ' + (240 - mh * .75) + ' L' + (150 + mh * .18) + ' ' + (240 - mh * .75) + 'Z" fill="#fff"/>';
    h += '<text x="200" y="232" font-size="30">' + (trop ? '🌴' : snow ? '🌲' : '🌳') + '</text><text x="240" y="232" font-size="24">🏠</text><text x="150" y="290" font-size="12" font-weight="800" text-anchor="middle">' + K.esc(zone) + '</text>';
    svg.innerHTML = h;
  }
  calc();
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var m = k.match(/^preset_(\w+)$/); if (m) { var p = P.filter(function (q) { return q[0] === m[1]; })[0]; sLat.set(p[2], true); sEl.set(p[3], true); coast = p[4]; cur = p[5]; var s = {}; s[k] = true; M.set(s); calc(); } var z = k.match(/^zone_(\w+)$/); if (z) { var set = { Tropical: [5, 0, 'inland', 'none'], Polar: [75, 0, 'coast', 'none'], Highland: [0, 9500, 'inland', 'none'], Continental: [50, 750, 'inland', 'none'], Temperate: [50, 0, 'coast', 'warm'] }[z[1]]; sLat.set(set[0], true); sEl.set(set[1], true); coast = set[2]; cur = set[3]; calc(); } } if (c.runs) { for (var i = 0; i < 6; i++) calc(); } } };
};

/* ------------------------------------------------------------------ */
/* Adaptation Lab: match a technology to an environment and farm 4 seasons */
/* cfg: { envs:[{id,name,icon,kind,problem}], techs:[[id,name,icon,desc]], results:{'env|tech':[score0-3,msg]} } */
/* state: env, tech, harvest, tries, best_<env>, n_best, try_<env>_<tech>  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.adaptLab = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var EN = cfg.envs, TE = cfg.techs, env = EN[0].id, tech = null, best = {}, tries = 0, season = -1, harvest = 0, score = 0, msg = '';
  M.el.innerHTML = '';
  var tabs = K.seg(EN.map(function (e) { return [e.id, e.icon + ' ' + e.name]; }), env, function (v) { env = v; tech = null; season = -1; draw(); });
  var bar = K.el('<div class="sn-ctrls" style="flex-wrap:wrap"><b class="sn-note">Place:</b></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var row = K.el('<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:10px"></div>');
  var svg = K.svgEl('svg', { viewBox: '0 0 400 260', class: 'sn-svg', role: 'img', 'aria-label': 'Environment scene' });
  var side = K.el('<div style="display:flex;flex-direction:column;gap:8px"></div>');
  row.appendChild(svg); row.appendChild(side); M.el.appendChild(row);
  var prob = K.el('<div class="sn-panel"></div>'), tbox = K.el('<div class="sn-panel"><b>🛠 Choose a technology</b><div class="sn-row" style="flex-wrap:wrap;gap:5px;margin-top:5px"></div></div>'), out = K.el('<div class="sn-panel"></div>');
  side.appendChild(prob); side.appendChild(tbox); side.appendChild(out);
  var runB = K.btn('▶ Farm for 4 seasons', function () { if (!tech) { M.toast('Choose a technology first.', true); return; } season = 0; harvest = 0; var r = (cfg.results || {})[env + '|' + tech] || [0, cfg.fallback || 'This technology doesn\'t solve this place\'s main problem.']; score = r[0]; msg = r[1]; tick(); }, 'primary');
  function tick() {
    if (season >= 4) { tries++; var st = { env: env, tech: tech, harvest: harvest, tries: tries, lastScore: score }; st['try_' + env + '_' + tech] = true; if (score >= 3) { best[env] = tech; st['best_' + env] = true; } st.n_best = Object.keys(best).length; M.set(st); draw(); M.toast(score >= 3 ? '🌽 Excellent harvest! This adaptation fits the environment.' : score >= 2 ? 'Okay harvest, but there is a better fit.' : 'Poor harvest. Rethink the problem this place has.', score < 2); return; }
    harvest += [0, 1, 3, 5][score] + (season === 2 ? score : 0); season++; draw(); M.after(450, tick);
  }
  function scene() {
    var e = EN.filter(function (x) { return x.id === env; })[0], k = e.kind, h = '<rect width="400" height="260" fill="#d0ebff"/>', t = tech;
    if (k === 'mountain') { h += '<path d="M0 260 L0 200 L150 40 L260 120 L400 60 L400 260Z" fill="#8d6e4a"/>'; if (t === 'terrace') for (var i = 0; i < 6; i++) h += '<rect x="' + (40 + i * 18) + '" y="' + (190 - i * 24) + '" width="' + (150 - i * 18) + '" height="8" fill="#51cf66" stroke="#5c3d1e"/>'; else if (season >= 0 && score < 2) h += '<path d="M150 60 L120 200 L180 200Z" fill="#a0522d" opacity=".6"/><text x="120" y="240" font-size="13" font-weight="800" fill="#fff">soil washing away</text>'; }
    if (k === 'lake') { h += '<rect y="140" width="400" height="120" fill="#4dabf7"/><path d="M0 140 L60 100 L120 140Z M300 140 L360 90 L400 120 L400 140Z" fill="#868e96"/>'; if (t === 'chinampa') for (var j = 0; j < 8; j++) h += '<rect x="' + (40 + (j % 4) * 80) + '" y="' + (160 + Math.floor(j / 4) * 45) + '" width="60" height="28" fill="#69db7c" stroke="#2b8a3e"/><text x="' + (55 + (j % 4) * 80) + '" y="' + (182 + Math.floor(j / 4) * 45) + '" font-size="16">🌽</text>'; }
    if (k === 'lowland') { h += '<rect x="0" y="120" width="160" height="140" fill="#1971c2"/><rect x="160" y="170" width="240" height="90" fill="#8ce99a"/>'; if (t === 'dike') h += '<rect x="150" y="110" width="22" height="150" fill="#6b4f2c"/><text x="260" y="160" font-size="26">🌷🐄</text><text x="270" y="110" font-size="30">⚙️</text>'; else if (season >= 1 && score < 2) h += '<rect x="160" y="150" width="240" height="110" fill="#339af0" opacity=".6"/><text x="200" y="210" font-size="14" font-weight="800" fill="#fff">sea floods the fields</text>'; }
    if (k === 'forest') { h += '<rect y="150" width="400" height="110" fill="#2b8a3e"/>'; for (var f = 0; f < 10; f++) h += '<text x="' + (f * 40) + '" y="' + (150 + (f % 3) * 20) + '" font-size="34">🌳</text>'; if (t === 'raised') h += '<rect x="120" y="200" width="160" height="30" fill="#94d82d" stroke="#5c3d1e"/><rect x="120" y="232" width="160" height="10" fill="#4dabf7"/>'; if (t === 'milpa') h += '<rect x="130" y="180" width="140" height="70" fill="#d8f5a2"/><text x="150" y="225" font-size="22">🌽🫘🎃</text>'; }
    if (k === 'plains') { h += '<rect y="150" width="400" height="110" fill="#e9c46a"/>'; if (t === 'irrigate') h += '<circle cx="200" cy="205" r="50" fill="#69db7c"/><line x1="200" y1="205" x2="250" y2="205" stroke="#495057" stroke-width="4"/>'; }
    if (k === 'coast') { h += '<rect y="140" width="400" height="120" fill="#1c7ed6"/><path d="M0 140 L0 60 L60 140Z M340 140 L400 50 L400 140Z" fill="#495057"/>'; if (t === 'fish') h += '<text x="170" y="170" font-size="30">⛵</text><text x="130" y="220" font-size="22">🐟🐟🐟</text>'; }
    if (season >= 0) h += '<g>' + ['🌱 Spring', '☀️ Summer', '🍂 Harvest', '❄️ Winter'].map(function (s, i) { return '<text x="' + (10 + i * 98) + '" y="22" font-size="13" font-weight="' + (i === season - 1 ? 900 : 400) + '" fill="' + (i < season ? '#1d2433' : '#868e96') + '">' + s + '</text>'; }).join('') + '</g>';
    var tt = TE.filter(function (x) { return x[0] === t; })[0]; if (tt) h += '<text x="390" y="250" font-size="32" text-anchor="end">' + tt[2] + '</text>';
    svg.innerHTML = h;
  }
  function draw() {
    var e = EN.filter(function (x) { return x.id === env; })[0];
    prob.innerHTML = '<h3 style="margin:0">' + e.icon + ' ' + K.esc(e.name) + '</h3><div><b>⚠️ The challenge:</b> ' + K.esc(e.problem) + '</div>' + (best[env] ? '<div style="color:#2b8a3e;font-weight:800">✓ Solved</div>' : '');
    var tb = tbox.querySelector('.sn-row'); tb.innerHTML = '';
    TE.forEach(function (t) { var b = K.btn(t[2] + ' ' + K.esc(t[1]), function () { tech = t[0]; season = -1; draw(); }, 'sm' + (tech === t[0] ? ' primary' : ' ghost')); b.title = t[3]; tb.appendChild(b); });
    var tt = TE.filter(function (x) { return x[0] === tech; })[0];
    if (tt) tb.appendChild(K.el('<div class="sn-note" style="flex-basis:100%">' + K.esc(tt[3]) + '</div>'));
    tb.appendChild(runB);
    out.innerHTML = '<b>🧺 Harvest: ' + harvest + ' baskets</b><div style="font-size:1.3em;letter-spacing:-2px">' + new Array(Math.min(30, harvest) + 1).join('🧺') + '</div>' + (season >= 4 ? '<div>' + K.esc(msg) + '</div>' : '') + '<div class="sn-note">Places solved: ' + Object.keys(best).length + ' of ' + EN.length + '</div>';
    scene();
  }
  draw();
  return { auto: function (st) { var c = st.goal.check || {}; EN.forEach(function (e) { var hit = null; for (var k in (cfg.results || {})) if (k.indexOf(e.id + '|') === 0 && cfg.results[k][0] >= 3) hit = k.split('|')[1]; if (hit) { best[e.id] = hit; var s = {}; s['best_' + e.id] = true; s['try_' + e.id + '_' + hit] = true; M.set(s); } }); for (var k2 in c) if (/^try_/.test(k2)) { var s2 = {}; s2[k2] = true; M.set(s2); } tries = Math.max(tries, 5); M.set({ n_best: Object.keys(best).length, tries: tries }); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Plague Map: how the Black Death traveled along trade routes (1347–1353) */
/* state: month, reached_<id>, n_reached, arrive_<id>, sea, quarantine, all, workers, wage */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.plagueMap = function (M) {
  var K = M.kit, cfg = M.cfg || {};
  var LAND = [
    [[-9.5,43],[-8.9,37],[-6,36.2],[-5,36.2],[-2,36.7],[0,38.7],[0.5,40.5],[3.2,42],[3,43.3],[5,43.3],[7.5,43.8],[9.5,44.3],[10.5,43],[12.5,41.5],[15.6,40],[16,38],[17,39],[18.5,40.2],[16,41.5],[14,42.5],[12.3,44.5],[12.5,45.5],[13.7,45.6],[14.5,45.2],[17,43],[19.5,41.8],[19.5,40],[21,38],[23,36.5],[24,38],[23,39.5],[24,40.8],[26,40.8],[29,41.2],[28,42],[28,43.5],[29.7,45.3],[31.5,46.6],[33.5,46],[34.8,44.4],[36.6,45.2],[38,47],[39.7,47.1],[38.3,46.4],[40,43.5],[41.5,41.6],[45,42],[50,42],[50,68],[45,68],[40,66.5],[37,66.5],[34.5,65],[33,66.8],[36,69.1],[33,69.4],[30,70],[28,71],[24,71],[19.5,70],[16,69],[13,67.5],[12.5,65.5],[10.5,64],[8,63],[5,62],[5,60],[5.5,58.9],[7.5,58],[10.5,59.3],[11.2,58.9],[12,57.5],[12.9,55.5],[14.3,55.5],[16.5,56.3],[16.6,57.8],[18.9,59.8],[17.3,60.7],[17.5,62.5],[21,64.5],[22.3,65.8],[25.3,65.3],[25,64.3],[21.5,62.5],[21.5,61],[22.9,59.9],[25,60.3],[28,60.5],[30,60],[28,59.5],[24,59.3],[23.5,58.5],[24.2,57.5],[21.2,57.2],[21,56],[21.2,55.2],[19.8,54.5],[18.5,54.7],[16,54.3],[14.3,53.9],[12,54.2],[10.3,54.5],[10.5,56.2],[10.6,57.7],[8.2,57],[8.1,55.5],[8.6,54],[7,53.5],[5,53.3],[4.6,52.5],[3.5,51.4],[1.8,51],[1.3,50],[0,49.7],[-1.3,49.6],[-1.9,48.7],[-4.7,48.4],[-4.3,47.8],[-2.2,47.2],[-1.2,46],[-1.5,44],[-1.8,43.4],[-4,43.4],[-8,43.7]],
    [[-5.7,50],[-3,50.5],[1.4,51.2],[1.7,52.7],[0.2,53.5],[-0.2,54.5],[-1.6,55.6],[-2.1,57.1],[-1.8,57.6],[-3.3,58.6],[-5,58.6],[-5.7,57],[-5.5,56],[-4.9,55],[-3.1,54.9],[-3.4,54.2],[-3,53.4],[-4.5,53.3],[-4.3,52.3],[-5.3,51.8],[-3.2,51.4],[-4.4,51.1]],
    [[-6,52],[-6.2,53.7],[-5.5,54.6],[-7.5,55.3],[-8.5,54.4],[-10,53.5],[-10.3,51.8],[-8,51.6]],
    [[12.4,38],[15.6,38.2],[15.1,36.7]], [[8.4,41],[9.8,41],[9.6,39.1],[8.4,39]], [[8.6,41.5],[9.5,41.4],[9.4,43],[8.7,42.6]],
    [[-17,21],[-16,24],[-13,27.5],[-9.8,29.5],[-9.5,32],[-6.8,34],[-5.9,35.8],[-2,35.1],[3,36.8],[10,37.3],[11,35.5],[10,34],[11.5,33],[15.5,32],[20,31],[20,32.6],[23,32.6],[29,31],[32.5,31.3],[34.5,29.5],[37,24.5],[39,21],[50,20],[50,10],[-17,10]],
    [[26,40.3],[26.2,38],[27.5,36.8],[30.5,36.3],[36,36.6],[35.5,33],[34.3,31.3],[35,29.5],[35,28],[37,26],[39,22],[50,20],[50,41],[41.5,41.5],[36,41.7],[33,42],[29,41.2]]
  ];
  var C = [['caffa', 'Caffa', 35.4, 45.0], ['const', 'Constantinople', 29, 41], ['messina', 'Messina', 15.6, 38.2], ['genoa', 'Genoa', 8.9, 44.4], ['venice', 'Venice', 12.3, 45.4], ['marseille', 'Marseille', 5.4, 43.3], ['florence', 'Florence', 11.25, 43.8], ['paris', 'Paris', 2.35, 48.85], ['bordeaux', 'Bordeaux', -0.6, 44.8], ['london', 'London', -0.1, 51.5], ['vienna', 'Vienna', 16.4, 48.2], ['cologne', 'Cologne', 6.96, 50.9], ['bergen', 'Bergen', 5.3, 60.4], ['lubeck', 'Lübeck', 10.7, 53.9], ['stockholm', 'Stockholm', 18.1, 59.3], ['novgorod', 'Novgorod', 31.3, 58.5], ['moscow', 'Moscow', 37.6, 55.75]];
  var E = [['caffa', 'const', 's'], ['const', 'messina', 's'], ['messina', 'genoa', 's'], ['messina', 'marseille', 's'], ['messina', 'venice', 's'], ['genoa', 'florence', 'l'], ['venice', 'florence', 'l'], ['marseille', 'paris', 'l'], ['marseille', 'bordeaux', 'l'], ['bordeaux', 'london', 's'], ['paris', 'cologne', 'l'], ['venice', 'vienna', 'l'], ['london', 'bergen', 's'], ['cologne', 'lubeck', 'l'], ['bergen', 'lubeck', 's'], ['lubeck', 'stockholm', 's'], ['stockholm', 'novgorod', 's'], ['novgorod', 'moscow', 'l'], ['vienna', 'cologne', 'l'], ['const', 'vienna', 'l'], ['caffa', 'moscow', 'l'], ['paris', 'london', 'l']];
  var HIST = { caffa: '1346', const: '1347', messina: 'Oct 1347', genoa: 'late 1347', venice: 'Jan 1348', marseille: 'Nov 1347', florence: 'Mar 1348', paris: 'Jun 1348', bordeaux: 'Aug 1348', london: 'Sep 1348', vienna: '1349', cologne: '1349', bergen: '1349', lubeck: '1350', stockholm: '1350', novgorod: '1352', moscow: '1353' };
  var V = { lon0: -12, lon1: 45, lat0: 64, lat1: 33 }, W = 600, H = Math.round(W * (V.lat0 - V.lat1) / (V.lon1 - V.lon0) / 0.75);
  function X(lon) { return (lon - V.lon0) / (V.lon1 - V.lon0) * W; } function Y(lat) { return (V.lat0 - lat) / (V.lat0 - V.lat1) * H; }
  var by = {}; C.forEach(function (c) { by[c[0]] = c; });
  var sea = true, quar = false, month = 0, playing = false, arr = {}, view = 'map', workers = 100;
  function km(a, b) { var A = by[a], B = by[b], dx = (A[2] - B[2]) * 111 * Math.cos((A[3] + B[3]) / 2 * Math.PI / 180), dy = (A[3] - B[3]) * 111; return Math.hypot(dx, dy); }
  function compute() {
    arr = {}; arr.caffa = 0; var done = {};
    for (;;) { var best = null; for (var k in arr) if (!done[k] && (best == null || arr[k] < arr[best])) best = k; if (best == null) break; done[best] = 1;
      E.forEach(function (e) { var o = e[0] === best ? e[1] : e[1] === best ? e[0] : null; if (!o) return; var isSea = e[2] === 's', t = arr[best] + 3 + (isSea && sea ? km(best, o) / 700 + (quar ? 1.3 : 0) : km(best, o) * (isSea ? 1.4 : 1) / 250); if (arr[o] == null || t < arr[o]) arr[o] = t; }); }
  }
  M.el.innerHTML = '';
  var tabs = K.seg([['map', '🗺 Plague map'], ['manor', '🌾 The manor after the plague']], view, function (v) { view = v; draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var area = K.el('<div></div>'); M.el.appendChild(area);
  var svg = K.svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'sn-svg', role: 'img', 'aria-label': 'Map of Europe showing the spread of the plague' });
  var ctr = K.el('<div class="sn-ctrls" style="flex-wrap:wrap"></div>');
  var sM = K.slider({ label: 'Time', min: 0, max: 84, value: 0, fmt: function (v) { var y = 1346 + Math.floor((v + 9) / 12), m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][(v + 9) % 12]; return m + ' ' + y; }, onInput: function (v) { month = v; report(); paint(); } });
  var play = K.btn('▶ Play', function () { if (month >= 84) month = 0; playing = !playing; play.textContent = playing ? '⏸ Pause' : '▶ Play'; }, 'primary');
  var tSea = K.toggle('⛵ Ships can sail trade routes', true, function (b) { sea = b; compute(); report(); paint(); });
  var tQ = K.toggle('⚓ Ports quarantine ships for 40 days', false, function (b) { quar = b; compute(); report(); paint(); });
  [sM.el, play, tSea.el, tQ.el].forEach(function (e) { ctr.appendChild(e); });
  var reads = K.el('<div class="sn-reads"></div>'), rN = K.readout('Cities reached', ''), rD = K.readout('Estimated deaths in Europe', 'million'), rL = K.readout('Last city reached', '');
  [rN, rD, rL].forEach(function (r) { reads.appendChild(r.el); });
  var acc = 0;
  M.loop(function (dt) { if (!playing || view !== 'map') return; acc += dt; if (acc > 0.18) { acc = 0; month = Math.min(84, month + 1); sM.set(month, true); report(); paint(); if (month >= 84) { playing = false; play.textContent = '▶ Play'; } } });
  function reached() { return C.filter(function (c) { return arr[c[0]] != null && arr[c[0]] <= month; }); }
  function report() { var r = reached(), st = { month: month, n_reached: r.length, sea: sea, quarantine: quar, all: r.length === C.length }; C.forEach(function (c) { if (arr[c[0]] != null) st['arrive_' + c[0]] = Math.round(arr[c[0]]); if (arr[c[0]] != null && arr[c[0]] <= month) st['reached_' + c[0]] = true; }); if (!sea && r.length === C.length) st.allNoSea = true; if (quar && r.length === C.length) st.allQuar = true; st.endMonth = Math.round(Math.max.apply(null, C.map(function (c) { return arr[c[0]] || 0; }))); if (sea && !quar) st.baseEnd = st.endMonth; if (!sea) st.noSeaEnd = st.endMonth; M.set(st); }
  function paint() {
    if (view !== 'map') return;
    var h = '<rect width="' + W + '" height="' + H + '" fill="#a5d8ff"/>';
    LAND.forEach(function (poly) { h += '<path d="M' + poly.map(function (p) { return X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' L') + 'Z" fill="#eadbb8" stroke="#8b5e34" stroke-width="1"/>'; });
    E.forEach(function (e) { var a = by[e[0]], b = by[e[1]], on = arr[e[0]] != null && arr[e[1]] != null && Math.max(arr[e[0]], arr[e[1]]) <= month; h += '<line x1="' + X(a[2]) + '" y1="' + Y(a[3]) + '" x2="' + X(b[2]) + '" y2="' + Y(b[3]) + '" stroke="' + (e[2] === 's' ? '#1864ab' : '#8b5e34') + '" stroke-width="' + (on ? 3 : 1.5) + '" stroke-dasharray="' + (e[2] === 's' ? '6 4' : '0') + '" opacity="' + (e[2] === 's' && !sea ? .2 : .8) + '"/>'; });
    C.forEach(function (c) { var t = arr[c[0]], s = t == null || t > month ? 0 : month - t < 6 ? 1 : 2; h += '<circle cx="' + X(c[2]) + '" cy="' + Y(c[3]) + '" r="' + (s === 1 ? 9 : 6) + '" fill="' + ['#fff', '#e03131', '#495057'][s] + '" stroke="#1d2433" stroke-width="1.5"/><text x="' + (X(c[2]) + 8) + '" y="' + (Y(c[3]) - 6) + '" font-size="11" font-weight="700" stroke="#fff" stroke-width="3" paint-order="stroke">' + c[1] + '</text>'; });
    h += '<g font-size="11"><rect x="6" y="' + (H - 58) + '" width="178" height="52" rx="6" fill="#fff" opacity=".9"/><circle cx="18" cy="' + (H - 45) + '" r="5" fill="#fff" stroke="#1d2433"/><text x="28" y="' + (H - 41) + '">not reached yet</text><circle cx="18" cy="' + (H - 30) + '" r="6" fill="#e03131"/><text x="28" y="' + (H - 26) + '">plague raging now</text><circle cx="18" cy="' + (H - 15) + '" r="5" fill="#495057"/><text x="28" y="' + (H - 11) + '">plague has passed</text><line x1="110" x2="130" y1="' + (H - 45) + '" y2="' + (H - 45) + '" stroke="#1864ab" stroke-dasharray="4 3" stroke-width="2"/><text x="134" y="' + (H - 41) + '">sea</text><line x1="110" x2="130" y1="' + (H - 30) + '" y2="' + (H - 30) + '" stroke="#8b5e34" stroke-width="2"/><text x="134" y="' + (H - 26) + '">land</text></g>';
    svg.innerHTML = h;
    var r = reached(); rN.set(r.length + ' / ' + C.length); rD.set(Math.round(25 * r.length / C.length)); var last = r.slice().sort(function (a, b) { return arr[b[0]] - arr[a[0]]; })[0]; rL.set(last ? last[1] + ' (real: ' + HIST[last[0]] + ')' : '—');
  }
  function manor() {
    var need = 60, wage = Math.max(1, Math.round(need / workers * 10) / 10), farmed = Math.min(100, Math.round(workers / need * 100));
    var box = K.el('<div class="sn-panel"><h3 style="margin:0">🌾 Lord Edmund\'s manor</h3><p class="sn-note">The lord needs about 60 workers to farm all his fields. Before the plague, 100 peasants lived here, so workers were easy to find and earned 1 penny a day.</p><div data-f style="font-size:1.4em;letter-spacing:-2px"></div></div>');
    var s = K.slider({ label: 'Peasants who survived', min: 20, max: 100, value: workers, onInput: function (v) { workers = v; M.set({ workers: v, wage: Math.max(1, Math.round(60 / v * 10) / 10) }); area.innerHTML = ''; manor(); } });
    box.appendChild(s.el);
    var rr = K.el('<div class="sn-reads"></div>'), a = K.readout('Daily wage workers can demand', 'pennies', true), b = K.readout('Fields that get farmed', '%'), c = K.readout('Workers each lord competes for', '');
    a.set(wage); b.set(farmed); c.set(workers < need ? 'Lords compete: workers win!' : 'Plenty of workers: lords win'); [a, b, c].forEach(function (x) { rr.appendChild(x.el); }); box.appendChild(rr);
    box.querySelector('[data-f]').textContent = new Array(Math.round(workers / 5) + 1).join('🧑‍🌾') + new Array(Math.round((100 - workers) / 5) + 1).join('⚰️');
    box.appendChild(K.el('<p>' + (workers < need ? 'With so few workers, peasants can <b>demand higher wages</b> or <b>leave for another manor or town</b> that pays more. The old feudal rule that serfs must stay on the land is breaking down.' : 'With plenty of workers, the lord sets the rules and wages stay low.') + '</p>'));
    area.appendChild(box);
  }
  function draw() { area.innerHTML = ''; if (view === 'map') { area.appendChild(svg); area.appendChild(ctr); area.appendChild(reads); paint(); } else manor(); }
  compute(); report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.sea === false || c.allNoSea || c.noSeaEnd) { sea = false; tSea.set(false); compute(); month = 84; report(); } if (c.quarantine || c.allQuar) { sea = true; tSea.set(true); quar = true; tQ.set(true); compute(); month = 84; report(); } if (c.baseEnd || c.all || c.n_reached || Object.keys(c).some(function (k) { return /^reached_/.test(k); })) { var s0 = sea, q0 = quar; sea = true; quar = false; compute(); month = 84; report(); if (!c.all && !c.baseEnd) { sea = s0; quar = q0; compute(); report(); } } if (c.workers || c.wage) M.set({ workers: 40, wage: 1.5 }); sM.set(month, true); paint(); } };
};
