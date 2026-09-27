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
