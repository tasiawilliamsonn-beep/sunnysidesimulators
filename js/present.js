/*
 * Sunnyside Simulators: presenter (present.html#<sim-id>).
 * Slides: title, warm-up, vocabulary, mini-lesson, mission, live demo, work time, debrief.
 * Next: → ↓ Space PageDown (clickers send PageDown). Back: ← ↑ PageUp. N = notes, F = full screen.
 * "Next" first reveals hidden answers on a slide, then moves on.
 */
(function () {
  'use strict';
  var SIMS = window.SUNNY_SIMS || [], STD = window.CX_STANDARDS || [];
  var id = decodeURIComponent(location.hash.slice(1)), s = SIMS.filter(function (x) { return x.id === id; })[0] || SIMS[0];
  var std = STD.filter(function (x) { return x.id === s.std; })[0] || {}, L = std.lesson || {};
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  document.title = 'Present: ' + s.title;
  document.querySelector('[data-t]').textContent = s.title;
  var box = document.querySelector('[data-slide]'), notesBox = document.querySelector('[data-notesbox]'), dots = document.querySelector('[data-dots]');
  var i = 0, shown = 0, demoRun = null, timer = { left: (s.minutes || 25) * 60, run: false, h: null };
  var sheetN = Math.max.apply(null, [0].concat((s.steps || []).map(function (x) { return x.sheet || 0; })));

  var SL = [
    { k: 'Today\'s simulator', light: false, reveal: 0, html: function () { return '<div class="icon">' + s.icon + '</div><div class="kick">' + esc(s.place) + ' · Grade ' + s.grade + ' · ' + esc(s.code) + '</div><h1>' + esc(s.title) + '</h1><p class="big">' + esc(s.question) + '</p>'; }, notes: 'Hook: ' + (L.hook || 'Ask students what they already know about the big question.') },
    { k: 'Warm-up', light: true, reveal: (s.warmup && s.warmup.items || []).length, html: function () { var w = s.warmup || { items: [] }; return '<div class="kick">Warm-up · ' + esc(w.style || '') + '</div><h2>' + esc(w.prompt || '') + '</h2><p class="hint" style="color:#555">Students answer in the warm-up box on their lab sheet. Press ▶ to reveal each answer.</p><div class="cards">' + w.items.map(function (it, n) { return '<div class="card"><b>' + esc(it[0]) + '</b><div class="reveal' + (n < shown ? '' : ' hide') + '">✔ ' + esc(it[1]) + '</div></div>'; }).join('') + '</div>'; }, notes: 'Give 2–3 minutes. Cold-call, then reveal each answer. Warm-up answers are also on the 🔑 key.' },
    { k: 'Vocabulary', light: true, reveal: 0, html: function () { return '<div class="kick">Key vocabulary</div><h2>Words you will use today</h2><div class="cards">' + (s.vocab || []).map(function (v) { return '<div class="card"><b>' + esc(v[0]) + '</b><div>' + esc(v[1]) + '</div></div>'; }).join('') + '</div>'; }, notes: 'Have students read each word aloud together. These are printed on the lab sheet.' },
    { k: 'Mini-lesson', light: true, reveal: 0, html: function () { return '<div class="kick">Mini-lesson · ' + esc(std.code || '') + '</div><h2>🎯 ' + esc(L.target || s.question) + '</h2><ul class="pts big">' + (L.teach || []).slice(0, 5).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' + (L.check ? '<div class="card"><b>Quick check</b><div>' + esc(L.check) + '</div></div>' : ''); }, notes: (L.model ? 'Model it: ' + L.model + '\n\n' : '') + ((L.misconceptions || []).length ? 'Watch for: ' + L.misconceptions.join(' ') : '') },
    { k: 'Mission', light: false, reveal: 0, html: function () { return '<div class="kick">Your mission</div><h1>' + esc(s.title) + '</h1><p class="big">' + esc(s.mission) + '</p><div class="cards"><div class="card"><b>🧭 Explorer</b><div>Hints right away, sentence starters, and a word bank.</div></div><div class="card"><b>🔎 Investigator</b><div>The standard mission. A hint unlocks after one try.</div></div><div class="card"><b>🏆 Legend</b><div>Extra challenge steps and tougher writing checks.</div></div></div>'; }, notes: 'Assign or let students choose a level. Everyone completes the same lab sheet; Legend boxes are marked 🏆.' },
    { k: 'Live demo', light: false, reveal: 0, demo: true, html: function () { return '<div class="kick">Live demo · I do, we do</div><div class="demo" data-demo></div>'; }, notes: 'Model the first step or two out loud: make a prediction, change ONE thing, and describe what you observe. Stop before giving away the answers.' },
    { k: 'Work time', light: false, reveal: 0, html: function () { return '<div class="kick">Work time</div><h2>Play the simulator and fill in your lab sheet</h2><div class="timer" data-timer></div><div class="tbtns"><button type="button" data-ts>▶ Start</button><button type="button" class="alt" data-tm>− 1 min</button><button type="button" class="alt" data-tp>+ 1 min</button><button type="button" class="alt" data-tr>↺ Reset</button></div><div class="cards"><div class="card"><b>📄 Lab sheet</b><div>Boxes 1–' + sheetN + ' match the "Sheet" badges in the simulator.</div></div><div class="card"><b>🔢 Completion code</b><div>When you finish, copy the code from the last screen onto your sheet.</div></div><div class="card"><b>🙋 Stuck?</b><div>Use ♿ Supports: read aloud, word bank, calculator, and hints.</div></div></div>'; }, notes: 'Circulate. Look at lab sheets, not just screens: ask students to explain what they changed and what happened.' },
    { k: 'Debrief', light: true, reveal: 1, html: function () { return '<div class="kick">Debrief</div><h2>' + esc(s.question) + '</h2><ul class="pts big">' + (L.debrief || []).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul><div class="card"><b>The big idea</b><div class="reveal' + (shown ? '' : ' hide') + '">' + esc(s.takeaway) + '</div></div><p style="color:#555">Finish the exit ticket on your lab sheet and turn it in with your completion code.</p>'; }, notes: 'Have students answer the exit ticket first, then press ▶ to reveal the big idea and compare.' }
  ];

  function fmtT(t) { var m = Math.floor(Math.max(0, t) / 60), sec = Math.max(0, t) % 60; return m + ':' + (sec < 10 ? '0' : '') + sec; }
  function paintTimer() { var t = box.querySelector('[data-timer]'); if (!t) return; t.textContent = fmtT(timer.left); t.classList.toggle('done', timer.left <= 0); var b = box.querySelector('[data-ts]'); if (b) b.textContent = timer.run ? '⏸ Pause' : '▶ Start'; }
  function tick() { if (!timer.run) return; timer.left--; if (timer.left <= 0) { timer.left = 0; timer.run = false; } paintTimer(); }
  setInterval(tick, 1000);

  function render() {
    var sl = SL[i];
    box.className = 'slide' + (sl.light ? ' light' : '');
    box.innerHTML = sl.html();
    dots.innerHTML = SL.map(function (x, n) { return '<i class="' + (n === i ? 'on' : '') + '" title="' + esc(x.k) + '" data-go="' + n + '"></i>'; }).join('');
    dots.querySelectorAll('[data-go]').forEach(function (d) { d.addEventListener('click', function () { go(+d.getAttribute('data-go')); }); });
    notesBox.innerHTML = '<h3>📝 ' + esc(sl.k) + '</h3>' + esc(sl.notes || '').replace(/\n/g, '<br>') + '<p class="hint">Keys: → or Space = next · ← = back · N = notes · F = full screen. Clickers work too.</p>';
    if (sl.demo) { try { demoRun = window.SunnySim().run(box.querySelector('[data-demo]'), s, { demo: true, fresh: true, level: 'scientist' }); } catch (e) { box.querySelector('[data-demo]').textContent = 'The demo could not load. Open the simulator with ▶ Play instead.'; } }
    if (box.querySelector('[data-timer]')) {
      box.querySelector('[data-ts]').addEventListener('click', function () { timer.run = !timer.run && timer.left > 0; paintTimer(); });
      box.querySelector('[data-tm]').addEventListener('click', function () { timer.left = Math.max(0, timer.left - 60); paintTimer(); });
      box.querySelector('[data-tp]').addEventListener('click', function () { timer.left += 60; paintTimer(); });
      box.querySelector('[data-tr]').addEventListener('click', function () { timer.left = (s.minutes || 25) * 60; timer.run = false; paintTimer(); });
      paintTimer();
    }
  }
  function go(n) { n = Math.max(0, Math.min(SL.length - 1, n)); if (n === i) return; i = n; shown = 0; render(); }
  function next() { if (shown < SL[i].reveal) { shown++; render(); return; } go(i + 1); }
  function prev() { go(i - 1); }
  document.querySelector('[data-next]').addEventListener('click', next);
  document.querySelector('[data-prev]').addEventListener('click', prev);
  var nb = document.querySelector('[data-notes]');
  function toggleNotes() { notesBox.hidden = !notesBox.hidden; nb.classList.toggle('on', !notesBox.hidden); }
  nb.addEventListener('click', toggleNotes);
  function full() { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) { /* not allowed */ } }
  document.querySelector('[data-full]').addEventListener('click', full);
  document.addEventListener('keydown', function (e) {
    var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if (typing || (SL[i].demo && box.contains(t) && t !== document.body)) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].indexOf(e.key) >= 0) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) >= 0) { e.preventDefault(); prev(); }
    else if (e.key === 'n' || e.key === 'N') toggleNotes();
    else if (e.key === 'f' || e.key === 'F') full();
  });
  render();
})();
