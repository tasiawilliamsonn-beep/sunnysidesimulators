/*
 * Sunnyside Simulators: the catalog (home page).
 * Teachers pick a grade and subject, then open a simulator, print its paper lab sheet and key,
 * present it, or download a standalone HTML file to upload to Canvas.
 */
(function () {
  'use strict';
  var SIMS = window.SUNNY_SIMS || [], STD = window.CX_STANDARDS || [];
  var SUBJ = { science: ['🔬', 'Science Lab'], math: ['📐', 'Math World'], ela: ['📖', 'Reading Room'], social: ['🧭', 'Expedition'] };
  var ORDER = ['science', 'math', 'ela', 'social'];
  var PAGES = { sheet: false, present: false }; // turned on as each page ships
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function get(k, d) { try { var v = localStorage.getItem('sunnycat:' + k); return v == null ? d : v; } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem('sunnycat:' + k, v); } catch (e) { /* storage off */ } }

  var st = { grade: get('grade', '5'), subject: get('subject', 'all'), q: '' };
  var app = document.getElementById('app');

  app.innerHTML =
    '<header class="cat-top"><div class="cat-wrap cat-brand"><span class="cat-sun" aria-hidden="true">☀</span><div><h1>Sunnyside Simulators</h1><p>Hands-on labs, games, and expeditions for grades 5 and 6. Students explore, observe, and explain, then turn in a paper lab sheet.</p></div></div></header>' +
    '<section class="cat-wrap cat-how" aria-label="How it works"><div><b>1</b><span><strong>Warm up together.</strong> Start with the warm-up and a live demo of the simulator on the board.</span></div><div><b>2</b><span><strong>Students explore.</strong> Each student plays the simulator at their level (Explorer, Investigator, or Legend) and fills in the 📄 lab sheet.</span></div><div><b>3</b><span><strong>Turn in paper.</strong> Students write their completion code on the sheet. Check it against the 🔑 key.</span></div></section>' +
    '<nav class="cat-wrap cat-bar" aria-label="Filters"><div class="cat-seg" role="group" aria-label="Grade" data-grade></div><div class="cat-chips" role="group" aria-label="Subject" data-subj></div><label class="cat-search"><span class="sr">Search</span><input type="search" placeholder="Search simulators…" data-q></label></nav>' +
    '<main class="cat-wrap" data-list></main>' +
    '<footer class="cat-wrap cat-foot"><span>Sunnyside Simulators · Indiana Academic Standards, grades 5–6</span><a href="escapes.html">Classic escape rooms →</a></footer>';

  var gradeBox = app.querySelector('[data-grade]'), subjBox = app.querySelector('[data-subj]'), list = app.querySelector('[data-list]');
  app.querySelector('[data-q]').addEventListener('input', function (e) { st.q = e.target.value.trim().toLowerCase(); render(); });

  function matches(s) {
    if (String(s.grade) !== st.grade) return false;
    if (st.subject !== 'all' && s.subject !== st.subject) return false;
    if (st.q) { var hay = (s.title + ' ' + s.place + ' ' + s.mission + ' ' + s.code).toLowerCase(); if (hay.indexOf(st.q) < 0) return false; }
    return true;
  }
  function controls() {
    gradeBox.innerHTML = ['5', '6'].map(function (g) { return '<button type="button" data-g="' + g + '" aria-pressed="' + (st.grade === g) + '">Grade ' + g + '</button>'; }).join('');
    gradeBox.querySelectorAll('[data-g]').forEach(function (b) { b.addEventListener('click', function () { st.grade = b.getAttribute('data-g'); put('grade', st.grade); render(); }); });
    var inGrade = SIMS.filter(function (s) { return String(s.grade) === st.grade; });
    subjBox.innerHTML = [['all', '✨', 'All']].concat(ORDER.map(function (k) { return [k, SUBJ[k][0], SUBJ[k][1]]; })).map(function (c) {
      var n = inGrade.filter(function (s) { return c[0] === 'all' || s.subject === c[0]; }).length;
      return '<button type="button" class="cat-chip c-' + c[0] + '" data-s="' + c[0] + '" aria-pressed="' + (st.subject === c[0]) + '">' + c[1] + ' ' + c[2] + ' <small>' + n + '</small></button>';
    }).join('');
    subjBox.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () { st.subject = b.getAttribute('data-s'); put('subject', st.subject); render(); }); });
  }
  function card(s) {
    var steps = (s.steps || []).length, sheetN = Math.max.apply(null, [0].concat((s.steps || []).map(function (x) { return x.sheet || 0; })));
    return '<article class="cat-card c-' + s.subject + '">' +
      '<div class="cat-cardtop"><span class="cat-icon" aria-hidden="true">' + s.icon + '</span><span class="cat-place">' + esc(s.place) + '</span></div>' +
      '<h3>' + esc(s.title) + '</h3>' +
      '<p class="cat-mission">' + esc(s.mission) + '</p>' +
      '<div class="cat-meta"><span>⏱ ' + s.minutes + ' min</span><span>🪜 ' + steps + ' steps</span><span>📄 ' + sheetN + ' boxes</span><span class="cat-code">' + esc(s.code) + '</span></div>' +
      '<div class="cat-actions"><a class="cat-play" href="sim.html#' + s.id + '">▶ Play</a>' +
      (PAGES.sheet ? '<a href="sheet.html#' + s.id + '" title="Printable student lab sheet">📄 Lab sheet</a><a href="sheet.html#key-' + s.id + '" title="Teacher answer key and completion codes">🔑 Key</a>' : '') +
      (PAGES.present ? '<a href="present.html#' + s.id + '" title="Slides: warm-up, mini-lesson, live demo, work time, debrief">🎬 Present</a>' : '') +
      '<button type="button" data-dl="' + s.id + '" title="One HTML file to upload to Canvas">⬇ Canvas file</button></div></article>';
  }
  function render() {
    controls();
    var shown = SIMS.filter(matches), html = '';
    var stds = STD.filter(function (x) { return String(x.grade) === st.grade && (st.subject === 'all' || x.subject === st.subject); });
    stds.sort(function (a, b) { return ORDER.indexOf(a.subject) - ORDER.indexOf(b.subject); });
    stds.forEach(function (sd) {
      var here = shown.filter(function (s) { return s.std === sd.id; });
      if (!here.length) return;
      html += '<section class="cat-std c-' + sd.subject + '"><div class="cat-stdhead"><span class="cat-tag">' + SUBJ[sd.subject][0] + ' ' + SUBJ[sd.subject][1] + '</span><h2>' + esc(sd.title) + '</h2><span class="cat-stdcode">' + esc(sd.code) + ' · ' + here.length + ' simulator' + (here.length > 1 ? 's' : '') + '</span></div>' +
        (sd.lesson && sd.lesson.target ? '<p class="cat-target">🎯 ' + esc(sd.lesson.target) + '</p>' : '') +
        '<div class="cat-grid">' + here.map(card).join('') + '</div></section>';
    });
    var orphans = shown.filter(function (s) { return !stds.some(function (sd) { return sd.id === s.std; }); });
    if (orphans.length) html += '<section class="cat-std"><div class="cat-grid">' + orphans.map(card).join('') + '</div></section>';
    list.innerHTML = html || '<p class="cat-empty">No simulators match. Try another subject or clear the search.</p>';
    list.querySelectorAll('[data-dl]').forEach(function (b) { b.addEventListener('click', function () { download(b.getAttribute('data-dl')); }); });
  }

  /* ---------- Standalone Canvas file ---------- */
  function ser(v) {
    if (v === null || v === undefined) return 'null';
    if (typeof v === 'function') return '(' + v.toString() + ')';
    if (typeof v === 'string') return JSON.stringify(v);
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) return '[' + v.map(ser).join(',') + ']';
    return '{' + Object.keys(v).map(function (k) { return JSON.stringify(k) + ':' + ser(v[k]); }).join(',') + '}';
  }
  function buildHTML(s) {
    var model = (window.SUNNY_MODELS || {})[s.model];
    var js = 'var SUNNY_MODELS = {};\nSUNNY_MODELS[' + JSON.stringify(s.model) + '] = ' + (model ? model.toString() : 'null') + ';\n' + window.SunnySim.toString() + '\nvar SIM = ' + ser(s) + ';\nSunnySim().run(document.getElementById("app"), SIM, {});';
    js = js.replace(/<\/(script)/gi, '<\\/$1');
    return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(s.title) + ' · Sunnyside Simulators</title>\n<style>html,body{height:100%;margin:0;background:#1c2230}#app{height:100%}</style>\n</head>\n<body>\n<div id="app"></div>\n<script>\n' + js + '\n</script>\n</body>\n</html>\n';
  }
  function download(id) {
    var s = SIMS.filter(function (x) { return x.id === id; })[0]; if (!s) return;
    var blob = new Blob([buildHTML(s)], { type: 'text/html' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'sunnyside-' + s.id + '.html';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  window.SunnyCatalog = { buildHTML: buildHTML };
  render();
})();
