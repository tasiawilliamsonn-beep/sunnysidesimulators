/*
 * Sunnyside Simulators: printable paper lab sheet (sheet.html#<sim-id>) and teacher key (sheet.html#key-<sim-id>).
 * Numbered boxes match the "Sheet ①" badges students see on each step of the simulator.
 */
(function () {
  'use strict';
  var SIMS = window.SUNNY_SIMS || [], STD = window.CX_STANDARDS || [];
  var raw = decodeURIComponent(location.hash.slice(1)), key = raw.indexOf('key-') === 0, id = key ? raw.slice(4) : raw;
  var s = SIMS.filter(function (x) { return x.id === id; })[0];
  var app = document.getElementById('app');
  var COL = { science: '#c1121f', math: '#c1121f', ela: '#c1121f', social: '#c1121f' };
  var SUBJ = { science: 'Science Lab', math: 'Math World', ela: 'Reading Room', social: 'Expedition' };
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function md(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\{\{[^}]+\}\}/g, '____'); }
  function lines(n) { var h = '<div class="lines">'; for (var i = 0; i < n; i++) h += '<div></div>'; return h + '</div>'; }
  function ans(t) { return key ? ' <span class="ans">✔ ' + esc(t) + '</span>' : ''; }
  if (!s) { app.innerHTML = '<div class="page"><h1>Simulator not found</h1><p><a href="index.html">Back to Sunnyside Simulators</a></p></div>'; return; }
  document.title = (key ? 'Key: ' : 'Lab Sheet: ') + s.title;
  document.documentElement.style.setProperty('--acc', COL[s.subject] || '#1d2433');
  var code = window.SunnySim ? window.SunnySim().code : function () { return ''; };

  function looksFor(o) { var n = (o.need || []).map(function (g) { return g.label; }); if (o.quote) n.push('an exact quote from the text' + (o.quotes > 1 ? ' (' + o.quotes + ' quotes)' : '')); if (o.number) n.push('a number from the simulator'); if (o.min) n.push('at least ' + o.min + ' words'); return n.join('; '); }
  function question(st) {
    var q = st.q, h = '<div class="item">' + (q.type === 'predict' ? '<span class="tag">Prediction</span> ' : '') + md(q.q || '') + '</div>';
    if (q.type === 'mc' || q.type === 'predict') { h += '<div class="choices">' + q.choices.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>'; if (q.type === 'mc') h += ans(q.choices[q.answer]); if (q.type === 'predict') h += lines(1); }
    else if (q.type === 'multi') { h += '<div class="note">Choose all that apply.</div><div class="choices">' + q.choices.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' + ans(q.answer.map(function (i) { return q.choices[i]; }).join('; ')); }
    else if (q.type === 'num') { h += '<div class="item">Answer: ________________ ' + esc(q.unit || '') + ans(typeof q.answer === 'function' ? 'varies: check the student\'s simulator readout' : [].concat(q.answer).join(' or ')) + '</div>' + (q.work ? '<div class="note">Show your thinking:</div>' + lines(2) : ''); }
    else if (q.type === 'text') { h += lines(q.rows || 3) + (key ? '<div class="ans">Look for: ' + esc(looksFor(q)) + (q.model ? '<br>Model: ' + esc(q.model) : '') + '</div>' : ''); }
    else if (q.type === 'write') { q.parts.forEach(function (p) { h += '<div class="item"><b>' + esc(p.label) + '</b>' + (p.starter && !key ? ' <span class="note">Start: "' + esc(p.starter) + '…"</span>' : '') + '</div>' + lines(2) + (key ? '<div class="ans">Look for: ' + esc(looksFor(p)) + '</div>' : ''); }); }
    else if (q.type === 'order') { var items = q.items.slice().sort(); h += '<div class="note">Put in order: ' + items.map(esc).join(' · ') + '</div>'; q.items.forEach(function (it, i) { h += '<div class="item">' + (i + 1) + '. ' + (key ? '<span class="ans">' + esc(it) + '</span>' : '______________________________') + '</div>'; }); }
    else if (q.type === 'sort') { h += '<div class="note">Sort: ' + q.items.map(function (it) { return esc(it[0]); }).join(' · ') + '</div><table><tr>' + q.bins.map(function (b) { return '<th>' + esc(b) + '</th>'; }).join('') + '</tr><tr>' + q.bins.map(function (b, bi) { return '<td class="blank">' + (key ? '<span class="ans">' + q.items.filter(function (it) { return it[1] === bi; }).map(function (it) { return esc(it[0]); }).join('<br>') + '</span>' : '<br><br><br>') + '</td>'; }).join('') + '</tr></table>'; }
    else if (q.type === 'table') { h += '<table><tr><th>' + esc(q.rowHead || '') + '</th>' + q.cols.map(function (c) { return '<th>' + esc(c.label) + (c.unit ? ' (' + esc(c.unit) + ')' : '') + '</th>'; }).join('') + '</tr>' + q.rows.map(function (r) { return '<tr><td><b>' + esc(r.label) + '</b></td>' + q.cols.map(function (c, ci) { var v = c.given ? (r.values ? r.values[ci] : '') : key && r.values ? r.values[ci] : key && typeof c.value === 'function' ? (function () { try { var x = c.value({}, r); return x == null || (typeof x === 'number' && isNaN(x)) ? 'from simulator' : x; } catch (e) { return 'from simulator'; } })() : ''; return '<td class="blank">' + (v !== '' && v != null ? (c.given ? esc(v) : '<span class="ans">' + esc(v) + '</span>') : '') + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>'; }
    return h;
  }
  function stepHTML(st) {
    var h = '<div style="margin-top:6px"><b>' + esc(st.title) + '</b>' + (st.levels && st.levels.indexOf('legend') >= 0 ? '<span class="leg">🏆 Legend only</span>' : '') + '</div>';
    if (st.goal && st.goal.text) h += '<div class="note">In the simulator: ' + md(st.goal.text) + '</div>';
    if (st.q) h += question(st); else h += '<div class="item">What did you notice?</div>' + lines(2);
    return h;
  }

  var boxes = {}, maxN = 0;
  (s.steps || []).forEach(function (st) { if (!st.sheet) return; (boxes[st.sheet] = boxes[st.sheet] || []).push(st); maxN = Math.max(maxN, st.sheet); });
  var std = STD.filter(function (x) { return x.id === s.std; })[0];
  var h = '<div class="bar"><button type="button" onclick="window.print()">🖨 Print' + (key ? ' key' : ' lab sheet') + '</button><a class="alt" href="sheet.html#' + (key ? '' : 'key-') + s.id + '" onclick="setTimeout(function(){location.reload()},0)">' + (key ? '📄 Student sheet' : '🔑 Teacher key') + '</a><a class="alt" href="sim.html#' + s.id + '">▶ Open simulator</a><a class="alt" href="index.html">← All simulators</a></div>';
  h += '<div class="page' + (key ? ' key' : '') + '">';
  h += '<div class="kicker">' + (key ? '🔑 Teacher key · ' : '') + 'Sunnyside Simulators · ' + esc(SUBJ[s.subject] || '') + ' · Grade ' + s.grade + ' · ' + esc(s.code) + '</div>';
  h += '<h1>' + esc(s.icon) + ' ' + esc(s.title) + '</h1>';
  if (!key) h += '<div class="who"><span>Name:</span><span>Date:</span><span>Class:</span></div><div class="lvl"><b>My level:</b><span><i></i>🧭 Explorer</span><span><i></i>🔎 Investigator</span><span><i></i>🏆 Legend</span></div>';
  h += '<div class="mission"><b>Mission:</b> ' + esc(s.mission) + '<br><b>Big question:</b> ' + esc(s.question) + '</div>';
  if (s.warmup) h += '<div class="box"><h2><span class="num">★</span>Warm-up: ' + esc(s.warmup.style || '') + '</h2><div class="note">' + esc(s.warmup.prompt || '') + '</div>' + (s.warmup.items || []).map(function (it) { return '<div class="item">' + esc(it[0]) + (key ? ' <span class="ans">✔ ' + esc(it[1]) + '</span>' : '') + '</div>' + (key ? '' : lines(1)); }).join('') + '</div>';
  if (s.vocab && s.vocab.length) h += '<table class="vocab"><tr><th colspan="2">Key vocabulary</th></tr>' + s.vocab.map(function (v) { return '<tr><td>' + esc(v[0]) + '</td><td>' + esc(v[1]) + '</td></tr>'; }).join('') + '</table>';
  for (var n = 1; n <= maxN; n++) { if (!boxes[n]) continue; h += '<div class="box"><h2><span class="num">' + n + '</span>Box ' + n + '</h2>' + boxes[n].map(stepHTML).join('') + '</div>'; }
  h += '<div class="box"><h2><span class="num">✎</span>Exit ticket: answer the big question in your own words</h2><div class="note">' + esc(s.question) + '</div>' + (key ? '<div class="ans">Look for: ' + esc(s.takeaway) + '</div>' : lines(3)) + '</div>';
  if (key) {
    h += '<div class="box"><h2><span class="num">#</span>Completion codes</h2><p class="note">Students see a code like <b>ABC-I3</b> when they finish. The first part must match below. The letter is the level (E = Explorer, I = Investigator, L = Legend), and the number at the end is how many stars they earned.</p><table><tr><th>Level</th><th>Code starts with</th></tr>' + [['explorer', '🧭 Explorer'], ['scientist', '🔎 Investigator'], ['legend', '🏆 Legend']].map(function (l) { return '<tr><td>' + l[1] + '</td><td><b>' + esc(code(s.id, l[0])) + '</b></td></tr>'; }).join('') + '</table></div>';
    if (std && std.lesson && std.lesson.misconceptions) h += '<div class="box"><h2><span class="num">!</span>Watch for these misconceptions</h2>' + std.lesson.misconceptions.map(function (m) { return '<div class="item">• ' + esc(m) + '</div>'; }).join('') + '</div>';
  } else h += '<div class="code"><b>Completion code:</b><div class="cbox"></div><span class="note">Shown on the last screen of the simulator.</span></div>';
  h += '</div>';
  app.innerHTML = h;
  window.addEventListener('hashchange', function () { location.reload(); });
})();
