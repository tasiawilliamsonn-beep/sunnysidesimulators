/*
 * Sunnyside Simulators: ELA models (the Reading Room).
 * Every ELA simulation requires reading (students highlight and tag evidence in the text) AND writing
 * that the engine checks (quotes must match the text exactly; key ideas must be present).
 * Models are self-contained (M and M.kit only) so their source can go into standalone Canvas files.
 */
var SUNNY_MODELS = window.SUNNY_MODELS = window.SUNNY_MODELS || {};

/* ------------------------------------------------------------------ */
/* Reader: a passage with highlighter tools                             */
/* cfg: { title, by, genre, paragraphs, tools: [['evidence','Evidence'],...], img } */
/* state: read, hl_<tool>: [ids], n_<tool>, tagged: {id: tool}              */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.reader = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var P = K.passage(cfg.paragraphs || ['No passage.']);
  M.def.passageText = P.text;
  var TOOLS = cfg.tools || [['evidence', '🟨 Evidence'], ['key', '🟦 Key detail']];
  var tool = TOOLS[0][0], tags = {};
  M.el.innerHTML = '';
  var bar = K.el('<div class="sn-ctrls" style="position:sticky;top:0;z-index:2"></div>');
  var tS = K.seg(TOOLS.map(function (t) { return [t[0], t[1]]; }).concat([['erase', '🧽 Erase']]), tool, function (v) { tool = v; });
  var hear = K.btn('🔊 Read aloud', function () { try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(P.text); u.rate = 0.92; speechSynthesis.speak(u); } catch (e) { M.toast('Read-aloud isn\'t available on this device.'); } }, 'sm ghost');
  var clr = K.btn('Clear all', function () { tags = {}; paint(); report(); }, 'sm ghost');
  bar.appendChild(K.el('<b class="sn-note">Highlighter:</b>')); bar.appendChild(tS.el); bar.appendChild(hear); bar.appendChild(clr);
  M.el.appendChild(bar);
  var box = K.el('<article class="sn-read-pass" aria-label="Reading passage"><h3>' + K.esc(cfg.title || '') + '</h3><div class="sn-by">' + K.esc([cfg.genre, cfg.by].filter(Boolean).join(' · ')) + '</div>' + (cfg.img ? '<div style="text-align:center;font-size:2.4em">' + cfg.img + '</div>' : '') + P.html + '<div style="text-align:center;margin-top:10px"><button type="button" class="sn-b primary" data-read>✓ I finished reading</button></div></article>');
  M.el.appendChild(box);
  box.querySelectorAll('.sn-s').forEach(function (sp) {
    sp.setAttribute('tabindex', '0'); sp.setAttribute('role', 'button');
    function hit() { var id = sp.getAttribute('data-sid'); if (tool === 'erase' || tags[id] === tool) delete tags[id]; else tags[id] = tool; paint(); report(); }
    sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hit(); } });
  });
  box.querySelector('[data-read]').addEventListener('click', function () { M.set('read', true); M.toast('Great. Now use the guide to dig into the text.'); });
  function paint() { box.querySelectorAll('.sn-s').forEach(function (sp) { var t = tags[sp.getAttribute('data-sid')]; sp.className = 'sn-s' + (t ? ' h-' + (TOOLS.map(function (x) { return x[0]; }).indexOf(t) === 0 ? 'evidence' : TOOLS.map(function (x) { return x[0]; }).indexOf(t) === 1 ? 'key' : TOOLS.map(function (x) { return x[0]; }).indexOf(t) === 2 ? 'clue' : 'other') : ''); }); }
  function report() { var st = { tagged: Object.assign({}, tags) }; TOOLS.forEach(function (t) { var ids = Object.keys(tags).filter(function (k) { return tags[k] === t[0]; }); st['hl_' + t[0]] = ids; st['n_' + t[0]] = ids.length; }); M.set(st); }
  report();
  return {
    sentences: P.sentences,
    auto: function (st) { var c = st.goal.check || {}; if (c.read) M.set('read', true); var want = st.goal.auto; if (st.goal.ids) { st.goal.ids.forEach(function (x) { tags[x[0]] = x[1]; }); paint(); report(); } M.set('read', true); }
  };
};

/* ------------------------------------------------------------------ */
/* RACE Writing Studio: dissect the prompt, cite, and build a paragraph  */
/* cfg: { passage:{title,by,genre,paragraphs}, prompts:[{q, keys:[..], slots:{R,A,C,E}}], example:{prompt, parts:[[R,text,why]...]} } */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.raceStudio = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var PS = cfg.passages || [cfg.passage];
  var mode = 'example', pi = 0, keys = {}, tags = {}, seenParts = {};
  var COL = { R: ['#1971c2', '#d0ebff', 'Restate'], A: ['#2b8a3e', '#d3f9d8', 'Answer'], C: ['#e67700', '#fff3bf', 'Cite'], E: ['#7048e8', '#e5dbff', 'Explain'] };
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.rs-prompt{background:#fff;border:2px solid var(--sn-acc);border-radius:12px;padding:10px 14px;font-weight:700}.rs-w{cursor:pointer;border-radius:4px;padding:0 2px}.rs-w:hover{background:#f3f0ff}.rs-w.on{background:#7048e8;color:#fff}.rs-board{display:grid;gap:6px}.rs-part{border-left:6px solid;border-radius:8px;padding:6px 10px;font-size:.95em}.rs-part b{display:block;font-size:.72em;letter-spacing:.08em;text-transform:uppercase}.rs-part.empty{opacity:.55;font-style:italic}.rs-ex{cursor:pointer}.rs-ex.seen{outline:2px solid #2b8a3e}</style>'));
  var promptBox = K.el('<div class="rs-prompt" aria-live="polite"></div>'); M.el.appendChild(promptBox);
  var row = K.el('<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:10px;align-items:start"></div>');
  var pass = K.el('<article class="sn-read-pass" aria-label="Reading passage"></article>'), board = K.el('<div class="sn-panel"></div>');
  row.appendChild(pass); row.appendChild(board); M.el.appendChild(row);
  function loadPassage() {
    var src = PS[Math.min(pi, PS.length - 1)], P = K.passage(src.paragraphs);
    M.def.passageText = PS.map(function (x) { return K.passage(x.paragraphs).text; }).join(' ');
    pass.innerHTML = '<h3>' + K.esc(src.title) + '</h3><div class="sn-by">' + K.esc([src.genre, src.by].filter(Boolean).join(' · ')) + ' · <span class="sn-note">Tap a sentence to highlight evidence.</span></div>' + P.html + '<div style="text-align:center"><button type="button" class="sn-b primary sm" data-read>✓ I finished reading</button></div>';
    pass.querySelectorAll('.sn-s').forEach(function (sp) { sp.setAttribute('tabindex', '0'); function hit() { var id = sp.getAttribute('data-sid'); if (tags[id]) delete tags[id]; else tags[id] = 1; sp.classList.toggle('h-evidence', !!tags[id]); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
    pass.querySelector('[data-read]').addEventListener('click', function () { var o = {}; o['read_' + pi] = true; o.read = true; M.set(o); M.toast('Nice reading. Back to the steps!'); });
  }
  function prompt() { return cfg.prompts[pi]; }
  function drawPrompt() {
    if (mode === 'example') { promptBox.innerHTML = '<span class="sn-note">WORKED EXAMPLE · prompt:</span><br>' + K.esc(cfg.example.prompt); return; }
    var p = prompt(), words = p.q.split(/(\s+)/);
    promptBox.innerHTML = '<span class="sn-note">PROMPT ' + (pi + 1) + ' · tap the key words that tell you what to write about:</span><br>' + words.map(function (w, i) { if (/^\s+$/.test(w)) return w; var clean = w.replace(/[^\w'’-]/g, ''); return '<span class="rs-w' + (keys[i] ? ' on' : '') + '" data-i="' + i + '" data-w="' + K.esc(clean) + '" role="button" tabindex="0">' + K.esc(w) + '</span>'; }).join('');
    promptBox.querySelectorAll('.rs-w').forEach(function (sp) { function hit() { var i = sp.getAttribute('data-i'); if (keys[i]) delete keys[i]; else keys[i] = sp.getAttribute('data-w'); sp.classList.toggle('on'); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
  }
  function drawBoard() {
    if (mode === 'example') {
      board.innerHTML = '<h3>Model RACE paragraph</h3><p class="sn-note">Tap each colored part to see what it does.</p><div class="rs-board">' + cfg.example.parts.map(function (pt) { var c = COL[pt[0]]; return '<div class="rs-part rs-ex' + (seenParts[pt[0]] ? ' seen' : '') + '" data-p="' + pt[0] + '" role="button" tabindex="0" style="border-color:' + c[0] + ';background:' + c[1] + '"><b style="color:' + c[0] + '">' + pt[0] + ' · ' + c[2] + '</b>' + K.esc(pt[1]) + (seenParts[pt[0]] ? '<div class="sn-note" style="margin-top:4px">💡 ' + K.esc(pt[2]) + '</div>' : '') + '</div>'; }).join('') + '</div>';
      board.querySelectorAll('.rs-ex').forEach(function (d) { function hit() { seenParts[d.getAttribute('data-p')] = true; M.set('exampleSeen', Object.keys(seenParts).length); drawBoard(); } d.addEventListener('click', hit); d.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
      return;
    }
    var A = M.answers ? M.answers() : {}, sl = prompt().slots || {};
    board.innerHTML = '<h3>Your RACE paragraph</h3><p class="sn-note">Each part appears here as you finish it in the guide.</p><div class="rs-board">' + ['R', 'A', 'C', 'E'].map(function (k) { var c = COL[k], t = sl[k] && typeof A[sl[k]] === 'string' ? A[sl[k]] : ''; return '<div class="rs-part' + (t ? '' : ' empty') + '" style="border-color:' + c[0] + ';background:' + c[1] + '"><b style="color:' + c[0] + '">' + k + ' · ' + c[2] + '</b>' + (t ? K.esc(t) : 'not written yet') + '</div>'; }).join('') + '</div>';
  }
  function report() {
    var st = { mode: mode, prompt: pi, evidence: Object.keys(tags), nEvidence: Object.keys(tags).length };
    if (mode !== 'example') { var p = prompt(), picked = Object.keys(keys).map(function (i) { return String(keys[i]).toLowerCase(); }); var right = p.keys.filter(function (k) { return picked.indexOf(k.toLowerCase()) >= 0; }).length; st.keysRight = right; st.keysAll = right === p.keys.length; st.keysExtra = picked.filter(function (w) { return p.keys.map(function (k) { return k.toLowerCase(); }).indexOf(w) < 0; }).length; }
    (prompt() && prompt().goodEvidence || []).forEach(function (id) { if (tags[id]) st['ev_' + id] = true; });
    st.goodEvidence = (prompt() && prompt().goodEvidence || []).filter(function (id) { return tags[id]; }).length;
    M.set(st);
  }
  function setMode(m, p) { mode = m; if (p != null && p !== pi) { pi = p; keys = {}; tags = {}; loadPassage(); } drawPrompt(); drawBoard(); report(); }
  loadPassage(); setMode('example');
  M.set('exampleSeen', 0);
  return {
    setup: function (o) { setMode(o.mode || 'write', o.prompt != null ? o.prompt : pi); },
    step: function () { drawBoard(); },
    auto: function (st) { var c = st.goal.check || {}; if (c.exampleSeen) { cfg.example.parts.forEach(function (p) { seenParts[p[0]] = true; }); M.set('exampleSeen', 4); drawBoard(); } if (c.keysAll) { var p = prompt(); p.q.split(/(\s+)/).forEach(function (w, i) { var cl = w.replace(/[^\w'’-]/g, ''); if (p.keys.map(function (k) { return k.toLowerCase(); }).indexOf(cl.toLowerCase()) >= 0) keys[i] = cl; }); drawPrompt(); } if (c.goodEvidence || typeof st.goal.check === 'function') (prompt().goodEvidence || []).forEach(function (id) { tags[id] = 1; }); var o = { read: true }; o['read_' + pi] = true; M.set(o); report(); }
  };
};

/* ------------------------------------------------------------------ */
/* Summary Builder: sort story events, cut minor details               */
/* cfg: { passage:{title,by,genre,paragraphs}, events:[[text, part]] } part: 0 beginning, 1 middle, 2 end, 3 minor */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.summaryBuilder = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var EV = cfg.events, place = EV.map(function () { return -1; }), sel = -1, view = 'read';
  var P = K.passage(cfg.passage.paragraphs); M.def.passageText = P.text;
  var order = EV.map(function (_, i) { return i; }); var r = K.rng('sum'); for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.sb-pool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:2px dashed var(--sn-line);border-radius:10px;min-height:50px}.sb-card{border:2px solid var(--sn-ink);background:#fff;border-radius:8px;padding:6px 9px;cursor:pointer;font-size:.9em;max-width:260px;text-align:left}.sb-card.sel{background:#ffe066;transform:translateY(-2px)}.sb-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.sb-col{border:2px solid var(--sn-line);border-radius:10px;padding:6px;min-height:120px;background:var(--sn-bg);display:flex;flex-direction:column;gap:5px;cursor:pointer}.sb-col h4{margin:0;font-size:.8em;text-transform:uppercase;letter-spacing:.06em}.sb-col.trash{background:#fff5f5;border-style:dashed}@media(max-width:700px){.sb-cols{grid-template-columns:1fr 1fr}}</style>'));
  var tabs = K.seg([['read', '📖 Read the story'], ['sort', '🗂 Sort the events']], view, function (v) { view = v; draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var area = K.el('<div></div>'); M.el.appendChild(area);
  var COLS = ['Beginning', 'Middle', 'End', '🗑 Minor detail (leave out)'];
  function report() { var st = { placed: place.filter(function (p) { return p >= 0; }).length, right: EV.filter(function (e, i) { return place[i] === e[1]; }).length, total: EV.length }; st.allRight = st.right === EV.length; st.minorCut = EV.filter(function (e, i) { return e[1] === 3 && place[i] === 3; }).length; M.set(st); }
  function draw() {
    if (view === 'read') { area.innerHTML = '<article class="sn-read-pass"><h3>' + K.esc(cfg.passage.title) + '</h3><div class="sn-by">' + K.esc(cfg.passage.genre || '') + '</div>' + P.html + '<div style="text-align:center"><button type="button" class="sn-b primary sm" data-read>✓ I finished reading</button></div></article>'; area.querySelector('[data-read]').addEventListener('click', function () { M.set('read', true); view = 'sort'; tabs.set('sort'); draw(); }); return; }
    area.innerHTML = '<p class="sn-note">Tap an event card, then tap where it belongs. Only the most important events go in a summary.</p><div class="sb-pool">' + order.filter(function (i) { return place[i] < 0; }).map(function (i) { return '<button type="button" class="sb-card' + (sel === i ? ' sel' : '') + '" data-c="' + i + '">' + K.esc(EV[i][0]) + '</button>'; }).join('') + '</div><div class="sb-cols" style="margin-top:8px">' + COLS.map(function (c, ci) { return '<div class="sb-col' + (ci === 3 ? ' trash' : '') + '" data-col="' + ci + '" role="button" tabindex="0"><h4>' + c + '</h4>' + order.filter(function (i) { return place[i] === ci; }).map(function (i) { return '<button type="button" class="sb-card" data-c="' + i + '" style="font-size:.8em">' + K.esc(EV[i][0]) + '</button>'; }).join('') + '</div>'; }).join('') + '</div><div class="sn-row" style="margin-top:8px"><button type="button" class="sn-b" data-chk>Check my sort</button><span class="sn-note" data-msg></span></div>';
    area.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var i = +b.getAttribute('data-c'); if (place[i] >= 0) { place[i] = -1; sel = i; } else sel = sel === i ? -1 : i; report(); draw(); }); });
    area.querySelectorAll('[data-col]').forEach(function (c) { function drop() { if (sel < 0) return; place[sel] = +c.getAttribute('data-col'); sel = -1; report(); draw(); } c.addEventListener('click', drop); c.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
    area.querySelector('[data-chk]').addEventListener('click', function () { var wrong = EV.filter(function (e, i) { return place[i] >= 0 && place[i] !== e[1]; }).length, left = place.filter(function (p) { return p < 0; }).length; var msg = area.querySelector('[data-msg]'); msg.textContent = wrong ? wrong + ' card(s) are in the wrong place. They went back to the pile.' : left ? 'So far so good! ' + left + ' card(s) left.' : '✓ Every event is sorted correctly!'; if (wrong) { EV.forEach(function (e, i) { if (place[i] >= 0 && place[i] !== e[1]) place[i] = -1; }); report(); setTimeout(draw, 900); } M.set('checked', true); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.read) M.set('read', true); if (c.allRight || typeof st.goal.check === 'function') { EV.forEach(function (e, i) { place[i] = e[1]; }); } report(); view = 'sort'; draw(); } };
};

/* ------------------------------------------------------------------ */
/* Choose-Your-Path Story: explore how choices shape characters        */
/* cfg: { title, nodes: {id: {text, img, choices:[[label, to]] , ending:'name'}}, start } */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.choiceMap = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var N = cfg.nodes, cur = cfg.start, path = [cur], endings = {};
  M.def.passageText = Object.keys(N).map(function (k) { return N[k].text; }).join(' ');
  M.el.innerHTML = '';
  var map = K.el('<div class="sn-panel" style="font-size:.85em"></div>');
  var page = K.el('<article class="sn-read-pass" aria-live="polite"></article>');
  M.el.appendChild(map); M.el.appendChild(page);
  function draw() {
    var n = N[cur];
    page.innerHTML = '<h3>' + K.esc(cfg.title) + '</h3>' + (n.img ? '<div style="font-size:2.6em;text-align:center">' + n.img + '</div>' : '') + n.text.split('\n').map(function (t) { return '<p>' + K.esc(t) + '</p>'; }).join('') + (n.ending ? '<p style="text-align:center"><b>— ENDING: ' + K.esc(n.ending) + ' —</b></p><div style="text-align:center"><button type="button" class="sn-b primary" data-restart>↺ Go back to the big decision</button></div>' : '<div style="display:grid;gap:6px;margin-top:8px">' + n.choices.map(function (c, i) { return '<button type="button" class="sn-ch" data-to="' + c[1] + '"><span class="sn-chl">' + 'ABC'[i] + '</span><span>' + K.esc(c[0]) + '</span></button>'; }).join('') + '</div>');
    page.querySelectorAll('[data-to]').forEach(function (b) { b.addEventListener('click', function () { cur = b.getAttribute('data-to'); path.push(cur); visit(); }); });
    var rb = page.querySelector('[data-restart]'); if (rb) rb.addEventListener('click', function () { cur = cfg.decision || cfg.start; path.push(cur); visit(); });
    var all = Object.keys(N).filter(function (k) { return N[k].ending; });
    map.innerHTML = '<b>🗺 Story map:</b> endings found ' + Object.keys(endings).length + ' of ' + all.length + ' · ' + all.map(function (k) { return endings[k] ? '✅ ' + K.esc(N[k].ending) : '❔ ???'; }).join(' · ');
  }
  function visit() { var n = N[cur], st = { node: cur }; st['v_' + cur] = true; if (n.ending) { endings[cur] = true; st['end_' + cur] = true; } st.endings = Object.keys(endings).length; st.allEndings = st.endings === Object.keys(N).filter(function (k) { return N[k].ending; }).length; M.set(st); draw(); }
  visit();
  return { auto: function (st) { var c = st.goal.check || {}; Object.keys(N).forEach(function (k) { if (c['v_' + k] || c['end_' + k] || c.allEndings || c.endings) { cur = k; visit(); } }); } };
};

/* ------------------------------------------------------------------ */
/* Theme Matcher: short texts, theme cards, and evidence lines          */
/* cfg: { texts:[{title, genre, paragraphs, theme}], cards:[...] }        */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.themeMatch = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var T = cfg.texts, cur = 0, match = {}, tags = {}, selCard = null;
  var Ps = T.map(function (t) { return K.passage(t.paragraphs); });
  M.def.passageText = Ps.map(function (p) { return p.text; }).join(' ');
  M.el.innerHTML = '';
  var tabs = K.seg(T.map(function (t, i) { return [String(i), '📄 ' + t.title]; }), '0', function (v) { cur = +v; draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var row = K.el('<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:10px;align-items:start"></div>');
  var pass = K.el('<article class="sn-read-pass"></article>'), cards = K.el('<div class="sn-panel"></div>');
  row.appendChild(pass); row.appendChild(cards); M.el.appendChild(row);
  function report() { var st = { matched: Object.keys(match).length, right: T.filter(function (t, i) { return match[i] === t.theme; }).length }; st.allRight = st.right === T.length; T.forEach(function (t, i) { st['ev_' + i] = Object.keys(tags).filter(function (k) { return k.indexOf(i + ':') === 0; }).map(function (k) { return k.split(':')[1]; }); st['nev_' + i] = st['ev_' + i].length; }); st.evAll = T.every(function (t, i) { return st['nev_' + i] > 0; }); M.set(st); }
  function draw() {
    var t = T[cur];
    pass.innerHTML = '<h3>' + K.esc(t.title) + '</h3><div class="sn-by">' + K.esc(t.genre) + ' · <span class="sn-note">Tap the line that best shows the theme.</span></div>' + Ps[cur].html + (match[cur] != null ? '<p style="border-top:1px dashed var(--sn-line);padding-top:6px"><b>Theme card:</b> ' + K.esc(cfg.cards[match[cur]]) + '</p>' : '');
    pass.querySelectorAll('.sn-s').forEach(function (sp) { var key = cur + ':' + sp.getAttribute('data-sid'); if (tags[key]) sp.classList.add('h-evidence'); sp.setAttribute('tabindex', '0'); function hit() { if (tags[key]) delete tags[key]; else tags[key] = 1; sp.classList.toggle('h-evidence'); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
    cards.innerHTML = '<h3>🃏 Theme cards</h3><p class="sn-note">A theme is a lesson about life, written as a sentence. Tap a card to place it on the text you are reading.</p>' + cfg.cards.map(function (c, i) { var used = Object.keys(match).filter(function (k) { return match[k] === i; }).map(function (k) { return +k + 1; }); return '<button type="button" class="sn-ch" data-card="' + i + '" style="width:100%;margin:3px 0"><span style="flex:1">' + K.esc(c) + '</span>' + (used.length ? '<span class="sn-note">on text ' + used.join(', ') + '</span>' : '') + '</button>'; }).join('');
    cards.querySelectorAll('[data-card]').forEach(function (b) { b.addEventListener('click', function () { match[cur] = +b.getAttribute('data-card'); report(); draw(); }); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.allRight || c.right) T.forEach(function (t, i) { match[i] = t.theme; }); if (c.evAll) T.forEach(function (t, i) { tags[i + ':' + Ps[i].sentences[0].id] = 1; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Text Structure Lab: find signal words, match the organizer shape    */
/* cfg: { items:[{title, text (with [[signal]] words), structure}] }     */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.structureLab = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var IT = cfg.items, cur = 0, taps = {}, org = {};
  var SH = [['chronology', '⏳ Timeline', 'Sequence / chronology'], ['compare', '⚖️ Venn diagram', 'Compare and contrast'], ['cause', '➡️ Cause → effect', 'Cause and effect'], ['problem', '🔧 Problem → solution', 'Problem and solution'], ['description', '🕸 Web', 'Description']];
  M.def.passageText = IT.map(function (x) { return x.text.replace(/\[\[|\]\]/g, ''); }).join(' ');
  M.el.innerHTML = '';
  var tabs = K.seg(IT.map(function (x, i) { return [String(i), '¶ ' + (i + 1)]; }), '0', function (v) { cur = +v; draw(); });
  var bar = K.el('<div class="sn-ctrls"><b class="sn-note">Paragraph:</b></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var pass = K.el('<article class="sn-read-pass"></article>'); M.el.appendChild(pass);
  var shapes = K.el('<div class="sn-panel"></div>'); M.el.appendChild(shapes);
  function signals(i) { var out = []; IT[i].text.replace(/\[\[([^\]]+)\]\]/g, function (_, w) { out.push(w.toLowerCase()); }); return out; }
  function report() { var st = {}; var allSig = true, allOrg = true; IT.forEach(function (x, i) { var sig = signals(i), t = taps[i] || {}, got = Object.keys(t).filter(function (k) { return t[k] && t[k].sig; }).length, wrong = Object.keys(t).filter(function (k) { return t[k] && !t[k].sig; }).length; st['sig_' + i] = got; st['wrong_' + i] = wrong; st['sigAll_' + i] = got >= sig.length; if (got < sig.length) allSig = false; st['org_' + i] = org[i] === x.structure; if (org[i] !== x.structure) allOrg = false; }); st.allSignals = allSig; st.allOrganizers = allOrg; st.orgCount = IT.filter(function (x, i) { return org[i] === x.structure; }).length; M.set(st); }
  function draw() {
    var x = IT[cur], t = taps[cur] = taps[cur] || {}, n = 0;
    var html = x.text.replace(/\[\[([^\]]+)\]\]|([A-Za-z’']+)/g, function (m, sig, w) { var word = sig || w, id = n++, on = t[id]; return '<span class="sn-w' + (on ? ' on' : '') + '" data-w="' + id + '" data-sig="' + (sig ? 1 : 0) + '" role="button" tabindex="0">' + K.esc(word) + '</span>'; });
    pass.innerHTML = '<h3>' + K.esc(x.title) + '</h3><div class="sn-by">Tap the SIGNAL WORDS: the words that show how the ideas are organized.</div><p style="line-height:2">' + html + '</p>';
    pass.querySelectorAll('.sn-w').forEach(function (sp) { sp.style.borderBottom = 'none'; function hit() { var id = sp.getAttribute('data-w'); if (t[id]) delete t[id]; else t[id] = { sig: sp.getAttribute('data-sig') === '1' }; sp.classList.toggle('on'); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
    shapes.innerHTML = '<h3>Which organizer fits ¶ ' + (cur + 1) + '?</h3><div class="sn-row">' + SH.map(function (s) { return '<button type="button" class="sn-b sm' + (org[cur] === s[0] ? ' on' : '') + '" data-o="' + s[0] + '">' + s[1] + '<br><small>' + s[2] + '</small></button>'; }).join('') + '</div>';
    shapes.querySelectorAll('[data-o]').forEach(function (b) { b.addEventListener('click', function () { org[cur] = b.getAttribute('data-o'); report(); draw(); }); });
  }
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; IT.forEach(function (x, i) { taps[i] = {}; var n = 0; x.text.replace(/\[\[([^\]]+)\]\]|([A-Za-z’']+)/g, function (m, sig) { if (sig) taps[i][n] = { sig: true }; n++; }); org[i] = x.structure; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Main Idea Organizer: sort details under two main ideas              */
/* cfg: { passage, ideas:[..], details:[[text, ideaIdx or -1]] }         */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.organizer = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var P = K.passage(cfg.passage.paragraphs), D = cfg.details, place = D.map(function () { return -2; }), sel = -1, tags = {};
  M.def.passageText = P.text;
  M.el.innerHTML = '';
  var row = K.el('<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start"></div>');
  var pass = K.el('<article class="sn-read-pass"><h3>' + K.esc(cfg.passage.title) + '</h3><div class="sn-by">' + K.esc(cfg.passage.genre || '') + ' · <span class="sn-note">Tap sentences to mark key details.</span></div>' + P.html + '<div style="text-align:center"><button type="button" class="sn-b primary sm" data-read>✓ I finished reading</button></div></article>');
  var web = K.el('<div class="sn-panel"></div>');
  row.appendChild(pass); row.appendChild(web); M.el.appendChild(row);
  pass.querySelectorAll('.sn-s').forEach(function (sp) { sp.setAttribute('tabindex', '0'); function hit() { var id = sp.getAttribute('data-sid'); if (tags[id]) delete tags[id]; else tags[id] = 1; sp.classList.toggle('h-key'); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
  pass.querySelector('[data-read]').addEventListener('click', function () { M.set('read', true); });
  function report() { var st = { placed: place.filter(function (p) { return p > -2; }).length, right: D.filter(function (d, i) { return place[i] === d[1]; }).length, keys: Object.keys(tags) }; st.allRight = st.right === D.length; st.nKeys = st.keys.length; M.set(st); }
  function draw() {
    var cols = cfg.ideas.map(function (idea, ii) { return '<div class="sb-col" data-col="' + ii + '" role="button" tabindex="0" style="border-color:' + ['#1971c2', '#e8590c'][ii] + '"><h4 style="color:' + ['#1971c2', '#e8590c'][ii] + '">Main idea ' + (ii + 1) + '</h4><b style="font-size:.9em">' + K.esc(idea) + '</b>' + D.map(function (d, i) { return place[i] === ii ? '<button type="button" class="sb-card" data-c="' + i + '" style="font-size:.8em">' + K.esc(d[0]) + '</button>' : ''; }).join('') + '</div>'; }).join('') + '<div class="sb-col trash" data-col="-1" role="button" tabindex="0"><h4>🗑 Not a key detail</h4>' + D.map(function (d, i) { return place[i] === -1 ? '<button type="button" class="sb-card" data-c="' + i + '" style="font-size:.8em">' + K.esc(d[0]) + '</button>' : ''; }).join('') + '</div>';
    web.innerHTML = '<h3>🕸 Main idea organizer</h3><p class="sn-note">Tap a detail card, then tap the main idea it supports.</p><div class="sb-pool">' + D.map(function (d, i) { return place[i] === -2 ? '<button type="button" class="sb-card' + (sel === i ? ' sel' : '') + '" data-c="' + i + '">' + K.esc(d[0]) + '</button>' : ''; }).join('') + '</div><div style="display:grid;gap:8px;margin-top:8px">' + cols + '</div><div class="sn-row"><button type="button" class="sn-b sm" data-chk>Check</button><span class="sn-note" data-msg></span></div>';
    web.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var i = +b.getAttribute('data-c'); if (place[i] > -2) { place[i] = -2; sel = i; } else sel = sel === i ? -1 : i; report(); draw(); }); });
    web.querySelectorAll('[data-col]').forEach(function (c) { function drop() { if (sel < 0) return; place[sel] = +c.getAttribute('data-col'); sel = -1; report(); draw(); } c.addEventListener('click', drop); c.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
    web.querySelector('[data-chk]').addEventListener('click', function () { var wrong = D.filter(function (d, i) { return place[i] > -2 && place[i] !== d[1]; }).length; web.querySelector('[data-msg]').textContent = wrong ? wrong + ' card(s) don\'t belong there. They went back to the pile.' : '✓ So far so good!'; if (wrong) { D.forEach(function (d, i) { if (place[i] > -2 && place[i] !== d[1]) place[i] = -2; }); report(); setTimeout(draw, 900); } });
  }
  M.el.appendChild(K.el('<style>.sb-pool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:2px dashed var(--sn-line);border-radius:10px;min-height:44px}.sb-card{border:2px solid var(--sn-ink);background:#fff;border-radius:8px;padding:5px 8px;cursor:pointer;font-size:.88em;text-align:left}.sb-card.sel{background:#ffe066}.sb-col{border:2px solid var(--sn-line);border-radius:10px;padding:6px;min-height:70px;background:var(--sn-bg);display:flex;flex-direction:column;gap:5px;cursor:pointer}.sb-col h4{margin:0;font-size:.75em;text-transform:uppercase;letter-spacing:.06em}.sb-col.trash{background:#fff5f5;border-style:dashed}</style>'));
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; if (c.read) M.set('read', true); if (c.allRight || c.right) D.forEach(function (d, i) { place[i] = d[1]; }); if (c.nKeys) P.sentences.slice(0, (c.nKeys.gte || 3)).forEach(function (s2) { tags[s2.id] = 1; }); M.set('read', true); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* News Desk: choose the headline that captures the main idea          */
/* cfg: { articles:[{title?, paragraphs, headlines:[..], best}] }        */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.newsDesk = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var A = cfg.articles, cur = 0, pick = {};
  M.def.passageText = A.map(function (a) { return K.passage(a.paragraphs).text; }).join(' ');
  M.el.innerHTML = '';
  var tabs = K.seg(A.map(function (a, i) { return [String(i), '📰 Story ' + (i + 1)]; }), '0', function (v) { cur = +v; draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var paper = K.el('<article class="sn-read-pass" style="background:#fbfaf6;border:3px double #495057"></article>'); M.el.appendChild(paper);
  function report() { var st = { picked: Object.keys(pick).length, right: A.filter(function (a, i) { return pick[i] === a.best; }).length }; st.allRight = st.right === A.length; A.forEach(function (a, i) { st['h_' + i] = pick[i] === a.best; }); M.set(st); }
  function draw() {
    var a = A[cur], P = K.passage(a.paragraphs);
    paper.innerHTML = '<div style="text-align:center;font-family:Georgia,serif;font-weight:800;letter-spacing:.1em;border-bottom:2px solid #1d2433;margin-bottom:6px">THE SUNNYSIDE SUN · ' + (cur + 1) + '</div><h2 style="font-family:Georgia,serif;margin:.2em 0">' + (pick[cur] != null ? K.esc(a.headlines[pick[cur]]) : '<span class="sn-note">[ headline goes here ]</span>') + '</h2>' + P.html + '<div class="sn-panel" style="font-family:var(--sn-font)"><b>Pick the headline that tells the MAIN idea:</b>' + a.headlines.map(function (h, i) { return '<button type="button" class="sn-ch" data-h="' + i + '" style="width:100%;margin:4px 0;' + (pick[cur] === i ? 'border-color:var(--sn-acc);background:#f3f0ff' : '') + '"><span>' + K.esc(h) + '</span></button>'; }).join('') + '</div>';
    paper.querySelectorAll('[data-h]').forEach(function (b) { b.addEventListener('click', function () { pick[cur] = +b.getAttribute('data-h'); var ok = pick[cur] === a.best; M.toast(ok ? '✓ The editor approves: that headline covers the main idea.' : '✗ The editor says: that headline is too narrow, off topic, or just a detail.', !ok); report(); draw(); }); });
  }
  report(); draw();
  return { auto: function (st) { A.forEach(function (a, i) { pick[i] = a.best; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Two Texts, One Topic: sort facts into a Venn diagram                 */
/* cfg: { a:{title, paragraphs}, b:{...}, facts:[[text, 0 a-only | 1 both | 2 b-only]] } */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.twoTexts = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var F = cfg.facts, place = F.map(function () { return -1; }), sel = -1, tab = 'a';
  var PA = K.passage(cfg.a.paragraphs), PB = K.passage(cfg.b.paragraphs); M.def.passageText = PA.text + ' ' + PB.text;
  M.el.innerHTML = '';
  var tabs = K.seg([['a', '📄 ' + cfg.a.title], ['b', '📄 ' + cfg.b.title], ['venn', '⭕ Venn diagram']], tab, function (v) { tab = v; if (v !== 'venn') M.set('read_' + v, true); draw(); });
  var bar = K.el('<div class="sn-ctrls"></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var area = K.el('<div></div>'); M.el.appendChild(area);
  function report() { var st = { placed: place.filter(function (p) { return p >= 0; }).length, right: F.filter(function (f, i) { return place[i] === f[1]; }).length }; st.allRight = st.right === F.length; M.set(st); }
  function draw() {
    if (tab !== 'venn') { var src = tab === 'a' ? cfg.a : cfg.b, P = tab === 'a' ? PA : PB; area.innerHTML = '<article class="sn-read-pass"><h3>' + K.esc(src.title) + '</h3><div class="sn-by">' + K.esc(src.genre || '') + '</div>' + P.html + '</article>'; return; }
    var zones = [['Only in ' + cfg.a.title, 0, '#d0ebff'], ['In BOTH', 1, '#d3f9d8'], ['Only in ' + cfg.b.title, 2, '#ffe8cc']];
    area.innerHTML = '<p class="sn-note">Tap a fact card, then tap where it goes.</p><div class="sb-pool">' + F.map(function (f, i) { return place[i] < 0 ? '<button type="button" class="sb-card' + (sel === i ? ' sel' : '') + '" data-c="' + i + '">' + K.esc(f[0]) + '</button>' : ''; }).join('') + '</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-top:10px">' + zones.map(function (z, zi) { return '<div data-col="' + z[1] + '" role="button" tabindex="0" style="background:' + z[2] + ';border:3px solid #495057;border-radius:' + (zi === 0 ? '999px 0 0 999px' : zi === 2 ? '0 999px 999px 0' : '0') + ';min-height:200px;padding:12px ' + (zi === 1 ? '8' : '28') + 'px;display:flex;flex-direction:column;gap:5px;cursor:pointer"><b style="font-size:.8em;text-align:center">' + K.esc(z[0]) + '</b>' + F.map(function (f, i) { return place[i] === z[1] ? '<button type="button" class="sb-card" data-c="' + i + '" style="font-size:.78em">' + K.esc(f[0]) + '</button>' : ''; }).join('') + '</div>'; }).join('') + '</div><div class="sn-row"><button type="button" class="sn-b sm" data-chk>Check</button><span class="sn-note" data-msg></span></div>';
    area.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var i = +b.getAttribute('data-c'); if (place[i] >= 0) { place[i] = -1; sel = i; } else sel = sel === i ? -1 : i; report(); draw(); }); });
    area.querySelectorAll('[data-col]').forEach(function (c) { function drop() { if (sel < 0) return; place[sel] = +c.getAttribute('data-col'); sel = -1; report(); draw(); } c.addEventListener('click', drop); c.addEventListener('keydown', function (e) { if (e.key === 'Enter') drop(); }); });
    area.querySelector('[data-chk]').addEventListener('click', function () { var wrong = F.filter(function (f, i) { return place[i] >= 0 && place[i] !== f[1]; }).length; area.querySelector('[data-msg]').textContent = wrong ? wrong + ' fact(s) are in the wrong place. Check both texts again.' : '✓ Looking good!'; if (wrong) { F.forEach(function (f, i) { if (place[i] >= 0 && place[i] !== f[1]) place[i] = -1; }); report(); setTimeout(draw, 900); } });
  }
  M.el.appendChild(K.el('<style>.sb-pool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;border:2px dashed var(--sn-line);border-radius:10px;min-height:44px}.sb-card{border:2px solid var(--sn-ink);background:#fff;border-radius:8px;padding:5px 8px;cursor:pointer;font-size:.88em;text-align:left}.sb-card.sel{background:#ffe066}</style>'));
  report(); draw();
  return { auto: function (st) { var c = st.goal.check || {}; M.set({ read_a: true, read_b: true }); if (c.allRight || c.right) F.forEach(function (f, i) { place[i] = f[1]; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Context Clue Decoder: find the clue, name its type, test the meaning */
/* cfg: { items:[{s: 'sentence with [[word]]', clue:[words], type, choices:[..], answer}] } */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.clueDecoder = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var IT = cfg.items, cur = 0, st = IT.map(function () { return { taps: {}, type: null, mean: null }; });
  var TYPES = [['definition', 'Definition'], ['synonym', 'Synonym'], ['antonym', 'Antonym'], ['example', 'Example'], ['inference', 'General sense']];
  M.def.passageText = IT.map(function (x) { return x.s.replace(/\[\[|\]\]/g, ''); }).join(' ');
  M.el.innerHTML = '';
  var tabs = K.seg(IT.map(function (x, i) { return [String(i), 'Case ' + (i + 1)]; }), '0', function (v) { cur = +v; draw(); });
  var bar = K.el('<div class="sn-ctrls"><b class="sn-note">🔍 Word cases:</b></div>'); bar.appendChild(tabs.el); M.el.appendChild(bar);
  var card = K.el('<div class="sn-panel" style="font-size:1.05em"></div>'); M.el.appendChild(card);
  function word(i) { return (IT[i].s.match(/\[\[([^\]]+)\]\]/) || [])[1]; }
  function report() { var o = {}; var solved = 0; IT.forEach(function (x, i) { var s = st[i], clueHit = Object.keys(s.taps).some(function (k) { return x.clue.map(function (c) { return c.toLowerCase(); }).indexOf(s.taps[k]) >= 0; }); o['clue_' + i] = clueHit; o['type_' + i] = s.type === x.type; o['mean_' + i] = s.mean === x.answer; o['solved_' + i] = clueHit && s.type === x.type && s.mean === x.answer; if (o['solved_' + i]) solved++; }); o.solved = solved; o.allSolved = solved === IT.length; M.set(o); }
  function draw() {
    var x = IT[cur], s = st[cur], w = word(cur), n = 0;
    var sent = x.s.replace(/\[\[([^\]]+)\]\]|([A-Za-z’'-]+)/g, function (m, target, wd) { if (target) return '<mark style="background:#d0bfff;border-radius:4px;padding:0 3px;font-weight:800">' + K.esc(target) + '</mark>'; var id = n++; return '<span class="sn-w' + (s.taps[id] ? ' on' : '') + '" data-w="' + id + '" data-t="' + K.esc(wd.toLowerCase()) + '" role="button" tabindex="0" style="border-bottom:none">' + K.esc(wd) + '</span>'; });
    var test = s.mean != null ? x.s.replace(/\[\[[^\]]+\]\]/, '<u><b>' + K.esc(x.choices[s.mean]) + '</b></u>') : '';
    card.innerHTML = '<h3>Case ' + (cur + 1) + ': What does <mark style="background:#d0bfff">' + K.esc(w) + '</mark> mean?</h3><p style="font-family:Georgia,serif;font-size:1.15em;line-height:2">' + sent + '</p><p class="sn-note">1) Tap the words that give you a CLUE. 2) Name the clue type. 3) Pick the meaning and test it in the sentence.</p>' +
      '<div class="sn-row"><b class="sn-note">Clue type:</b>' + TYPES.map(function (t) { return '<button type="button" class="sn-b sm' + (s.type === t[0] ? ' on' : '') + '" data-ty="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' +
      '<div class="sn-row"><b class="sn-note">Meaning:</b>' + x.choices.map(function (c, i) { return '<button type="button" class="sn-b sm' + (s.mean === i ? ' on' : '') + '" data-m="' + i + '">' + K.esc(c) + '</button>'; }).join('') + '</div>' + (test ? '<div class="sn-idea"><span>Substitution test: does it still make sense?</span>' + test + '</div>' : '');
    card.querySelectorAll('.sn-w').forEach(function (sp) { function hit() { var id = sp.getAttribute('data-w'); if (s.taps[id]) delete s.taps[id]; else s.taps[id] = sp.getAttribute('data-t'); sp.classList.toggle('on'); report(); } sp.addEventListener('click', hit); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
    card.querySelectorAll('[data-ty]').forEach(function (b) { b.addEventListener('click', function () { s.type = b.getAttribute('data-ty'); report(); draw(); }); });
    card.querySelectorAll('[data-m]').forEach(function (b) { b.addEventListener('click', function () { s.mean = +b.getAttribute('data-m'); report(); draw(); }); });
  }
  report(); draw();
  return { auto: function (stp) { IT.forEach(function (x, i) { var n = 0; x.s.replace(/\[\[([^\]]+)\]\]|([A-Za-z’'-]+)/g, function (m, t, wd) { if (t) return; if (x.clue.map(function (c) { return c.toLowerCase(); }).indexOf(wd.toLowerCase()) >= 0) st[i].taps[n] = wd.toLowerCase(); n++; }); st[i].type = x.type; st[i].mean = x.answer; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Word Forge: build words from prefixes, roots, and suffixes          */
/* cfg: { prefixes:[[p, meaning]], roots:[[r, meaning]], suffixes:[[s, meaning]], words:{'in+vis+ible': 'meaning'}, targets:[[clue, key]] } */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.wordLab = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var slot = { p: '', r: '', s: '' }, forged = {}, ti = 0;
  M.el.innerHTML = '';
  M.el.appendChild(K.el('<style>.wf-tiles{display:flex;flex-wrap:wrap;gap:6px}.wf-t{border:2px solid;border-radius:8px;padding:5px 9px;cursor:pointer;font-weight:800;background:#fff;text-align:center;line-height:1.1}.wf-t small{display:block;font-weight:600;font-size:.72em;color:var(--sn-soft)}.wf-t.p{border-color:#1971c2}.wf-t.r{border-color:#e8590c}.wf-t.s{border-color:#2b8a3e}.wf-t.on{background:#ffe066}.wf-anvil{display:flex;gap:6px;align-items:center;justify-content:center;background:#343a40;border-radius:12px;padding:14px;color:#fff;font-size:1.6em;font-weight:800;flex-wrap:wrap}.wf-slot{min-width:80px;border:3px dashed #adb5bd;border-radius:8px;padding:4px 10px;text-align:center}</style>'));
  var goal = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(goal);
  var anvil = K.el('<div class="wf-anvil"></div>'); M.el.appendChild(anvil);
  var tiles = K.el('<div class="sn-panel"></div>'); M.el.appendChild(tiles);
  var logB = K.el('<div class="sn-panel"></div>'); M.el.appendChild(logB);
  function key() { return [slot.p, slot.r, slot.s].filter(Boolean).join('+'); }
  function forge() { var k = key(); if (!slot.r) { M.toast('Every word needs a ROOT.', true); return; } if (cfg.words[k]) { forged[k] = true; var o = { forged: Object.keys(forged).length }; o['w_' + k.replace(/\+/g, '_')] = true; var tk = cfg.targets[ti]; if (tk && tk[1] === k) { o['target_' + ti] = true; M.toast('🎯 Target word forged!'); } M.set(o); } else M.toast('"' + k.replace(/\+/g, '') + '" isn\'t a real English word. Try a different combination.', true); draw(); }
  function draw() {
    var tk = cfg.targets[ti];
    goal.innerHTML = '<b>🎯 Word order ' + (ti + 1) + ' of ' + cfg.targets.length + ':</b> Forge a word that means <b>"' + K.esc(tk[0]) + '"</b>. <button type="button" class="sn-b sm ghost" data-next>Next order ▶</button>';
    goal.querySelector('[data-next]').addEventListener('click', function () { ti = (ti + 1) % cfg.targets.length; draw(); });
    anvil.innerHTML = ['p', 'r', 's'].map(function (k) { return '<span class="wf-slot">' + (slot[k] || '<small style="font-size:.5em;color:#adb5bd">' + { p: 'prefix', r: 'root', s: 'suffix' }[k] + '</small>') + '</span>'; }).join('<span>+</span>') + '<button type="button" class="sn-b primary" data-forge>🔨 Forge</button><button type="button" class="sn-b sm" data-clear style="background:transparent;color:#fff;border-color:#adb5bd">Clear</button>';
    anvil.querySelector('[data-forge]').addEventListener('click', forge); anvil.querySelector('[data-clear]').addEventListener('click', function () { slot = { p: '', r: '', s: '' }; draw(); });
    function row(list, k, cls, title) { return '<h4 style="margin:.4em 0">' + title + '</h4><div class="wf-tiles">' + list.map(function (x) { return '<button type="button" class="wf-t ' + cls + (slot[k] === x[0] ? ' on' : '') + '" data-k="' + k + '" data-v="' + K.esc(x[0]) + '">' + K.esc(x[0]) + '<small>' + K.esc(x[1]) + '</small></button>'; }).join('') + '</div>'; }
    tiles.innerHTML = row(cfg.prefixes, 'p', 'p', 'Prefixes (front)') + row(cfg.roots, 'r', 'r', 'Roots (the core meaning)') + row(cfg.suffixes, 's', 's', 'Suffixes (end)');
    tiles.querySelectorAll('[data-k]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-k'), v = b.getAttribute('data-v'); slot[k] = slot[k] === v ? '' : v; draw(); }); });
    logB.innerHTML = '<h3>📒 Word log (' + Object.keys(forged).length + ')</h3>' + (Object.keys(forged).length ? Object.keys(forged).map(function (k) { return '<div><b>' + k.replace(/\+/g, '') + '</b> (' + k.replace(/\+/g, ' + ') + '): ' + K.esc(cfg.words[k]) + '</div>'; }).join('') : '<p class="sn-note">Real words you forge appear here with their meanings.</p>');
  }
  draw(); M.set({ forged: 0 });
  return { auto: function (st) { var c = st.goal.check || {}; for (var k in c) { var mm = k.match(/^target_(\d+)$/); if (mm) { ti = +mm[1]; var kk = cfg.targets[ti][1].split('+'); var r = cfg.roots.map(function (x) { return x[0]; }); slot = { p: '', r: '', s: '' }; kk.forEach(function (part) { if (r.indexOf(part) >= 0) slot.r = part; else if (cfg.prefixes.map(function (x) { return x[0]; }).indexOf(part) >= 0) slot.p = part; else slot.s = part; }); forge(); } } if (c.forged) Object.keys(cfg.words).slice(0, c.forged.gte || c.forged).forEach(function (k2) { forged[k2] = true; }); M.set('forged', Object.keys(forged).length); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Figurative Language Translator: tag lines in a poem, then translate */
/* cfg: { title, lines:[text or {t, type, id}], types }                  */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.figTranslator = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var TYPES = cfg.types || [['simile', 'Simile'], ['metaphor', 'Metaphor'], ['personification', 'Personification'], ['idiom', 'Idiom'], ['hyperbole', 'Hyperbole']];
  var sel = null, tag = {};
  M.def.passageText = cfg.lines.map(function (l) { return typeof l === 'string' ? l : l.t; }).join(' ');
  M.el.innerHTML = '';
  var poem = K.el('<article class="sn-read-pass"></article>'); M.el.appendChild(poem);
  var tb = K.el('<div class="sn-ctrls"></div>'); M.el.appendChild(tb);
  function report() { var o = { tagged: Object.keys(tag).length }; var right = 0, figs = cfg.lines.filter(function (l) { return typeof l !== 'string'; }); figs.forEach(function (l) { o['t_' + l.id] = tag[l.id] === l.type; if (tag[l.id] === l.type) right++; }); o.right = right; o.allRight = right === figs.length; M.set(o); }
  function draw() {
    poem.innerHTML = '<h3>' + K.esc(cfg.title) + '</h3><div class="sn-by">' + K.esc(cfg.by || '') + ' · <span class="sn-note">Tap a line with figurative language, then choose its type below.</span></div>' + cfg.lines.map(function (l) { if (typeof l === 'string') return '<div>' + (l ? K.esc(l) : '&nbsp;') + '</div>'; var t = tag[l.id]; return '<div class="sn-s' + (sel === l.id ? ' h-evidence' : t ? ' h-key' : '') + '" data-l="' + l.id + '" role="button" tabindex="0">' + K.esc(l.t) + (t ? ' <small style="font-family:var(--sn-font);color:#1971c2;font-weight:800">[' + t + ']</small>' : '') + '</div>'; }).join('');
    poem.querySelectorAll('[data-l]').forEach(function (d) { function hit() { sel = d.getAttribute('data-l'); draw(); } d.addEventListener('click', hit); d.addEventListener('keydown', function (e) { if (e.key === 'Enter') hit(); }); });
    tb.innerHTML = '<b class="sn-note">' + (sel ? 'This line is a:' : 'Select a line first.') + '</b>';
    TYPES.forEach(function (t) { var b = K.btn(t[1], function () { if (!sel) return; tag[sel] = t[0]; var l = cfg.lines.filter(function (x) { return x.id === sel; })[0]; M.toast(l.type === t[0] ? '✓ Yes, that is ' + t[1].toLowerCase() + '.' : '✗ Not quite. Check the clues: does it use like/as? Does a thing act human?', l.type !== t[0]); report(); draw(); }, 'sm'); if (!sel) b.disabled = true; tb.appendChild(b); });
  }
  report(); draw();
  return { auto: function (st) { cfg.lines.forEach(function (l) { if (typeof l !== 'string') tag[l.id] = l.type; }); report(); draw(); } };
};

/* ------------------------------------------------------------------ */
/* Idiom Street: literal picture vs. real meaning                       */
/* cfg: { people:[{who, emoji, says, literal, choices:[..], answer}] }    */
/* ------------------------------------------------------------------ */
SUNNY_MODELS.idiomStreet = function (M) {
  var K = M.kit, S = M.state, cfg = M.cfg || {};
  var PP = cfg.people, cur = 0, got = {};
  M.def.passageText = PP.map(function (p) { return p.says; }).join(' ');
  M.el.innerHTML = '';
  var street = K.svgEl('svg', { viewBox: '0 0 700 200', class: 'sn-svg', role: 'img', 'aria-label': 'A town street with people talking' }); M.el.appendChild(street);
  var card = K.el('<div class="sn-panel" aria-live="polite"></div>'); M.el.appendChild(card);
  function report() { var o = { solved: Object.keys(got).length }; PP.forEach(function (p, i) { o['i_' + i] = !!got[i]; }); o.allSolved = o.solved === PP.length; M.set(o); }
  function draw() {
    var h = '<rect width="700" height="200" fill="#e7f5ff"/><rect y="150" width="700" height="50" fill="#adb5bd"/>';
    ['#ffc9c9', '#b2f2bb', '#ffec99', '#d0bfff', '#a5d8ff'].forEach(function (c, i) { h += '<rect x="' + (i * 140 + 10) + '" y="40" width="120" height="110" fill="' + c + '" stroke="#495057"/><rect x="' + (i * 140 + 55) + '" y="105" width="30" height="45" fill="#8d6e63"/>'; });
    PP.forEach(function (p, i) { var x = 70 + i * (560 / Math.max(1, PP.length - 1)); h += '<g class="is-p" data-i="' + i + '" role="button" tabindex="0" aria-label="' + p.who + '"><text x="' + x + '" y="178" font-size="34" text-anchor="middle">' + p.emoji + '</text>' + (got[i] ? '<text x="' + x + '" y="196" font-size="11" text-anchor="middle">✅</text>' : '<text x="' + (x + 16) + '" y="150" font-size="18">💬</text>') + (i === cur ? '<circle cx="' + x + '" cy="166" r="24" fill="none" stroke="#e8590c" stroke-width="3"/>' : '') + '</g>'; });
    street.innerHTML = h;
    street.querySelectorAll('.is-p').forEach(function (g) { g.addEventListener('click', function () { cur = +g.getAttribute('data-i'); draw(); }); });
    var p = PP[cur];
    card.innerHTML = '<h3>' + p.emoji + ' ' + K.esc(p.who) + ' says: "' + K.esc(p.says) + '"</h3><div style="display:grid;grid-template-columns:1fr 2fr;gap:10px"><div class="sn-idea"><span>If you took it literally…</span><div style="font-size:2.2em">' + p.literal + '</div></div><div><b>What does ' + K.esc(p.who) + ' REALLY mean?</b>' + p.choices.map(function (c, i) { return '<button type="button" class="sn-ch" data-c="' + i + '" style="width:100%;margin:4px 0"><span>' + K.esc(c) + '</span></button>'; }).join('') + '</div></div>';
    card.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { var ok = +b.getAttribute('data-c') === p.answer; if (ok) { got[cur] = true; M.toast('✓ Right! That\'s the real meaning.'); } else M.toast('✗ That\'s the literal (word-for-word) idea. Think about the situation.', true); report(); draw(); }); });
  }
  report(); draw();
  return { auto: function () { PP.forEach(function (p, i) { got[i] = true; }); report(); draw(); } };
};
