/*
 * Crossroads Escapes: 60-minute lesson presenter.
 *
 * LessonPresenter(mount, P, opts) shows a projectable slide deck for one lesson:
 * target and agenda, warm-up, hook, four teaching steps (interactive tool, turn and talk,
 * check for understanding), I do / we do / you do, a work-time screen to leave up while
 * students play, debrief, and the exit ticket. Teacher tools: a timer, a name picker,
 * teacher notes, fullscreen, and keyboard navigation.
 *
 * P is built by app.js from the standard, its lesson (data/lessons.js), and the room.
 * Visuals and simulations come from EscapeKit() (js/kit.js).
 */
function LessonPresenter(mount, P, opts) {
  opts = opts || {};
  var KIT = EscapeKit(), V = KIT.V, SIMS = KIT.SIMS, LET = 'ABCDEFGH';
  // borrow the game engine's styles and theme so simulations look the same as in the rooms
  var TH = 'lab';
  try { if (typeof EscapePlayer === 'function') TH = EscapePlayer(null, { id: 'lesson', subject: P.subject, theme: P.theme, stages: [] }, { stylesOnly: true }) || TH; } catch (e) { }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
  function blanks(note, show) { return esc(note).replace(/\[([^\]]+)\]/g, function (_, w) { return show ? '<u class="lp-fill">' + w + '</u>' : '<span class="lp-blank"></span>'; }); }
  function norm(s) { return String(s).toLowerCase().replace(/[−–]/g, '-').replace(/[\s$,%°]/g, '').replace(/^x=|^y=|^m=/, ''); }
  function vis(spec) {
    if (!spec) return '';
    if (Array.isArray(spec)) return '<div class="lp-visrow">' + spec.map(vis).join('') + '</div>';
    if (spec.sim) return '<div class="lp-sim ep th-' + TH + '"><div class="lp-simh">' + esc(spec.sim.title || 'Try it') + '</div><div data-sim></div></div>';
    return '<figure class="lp-vis">' + (V[spec.kind] ? V[spec.kind](spec, {}) : '') + (spec.caption ? '<figcaption>' + esc(spec.caption) + '</figcaption>' : '') + '</figure>';
  }
  function cards(list) { return '<div class="lp-cards">' + list.map(function (c) { return '<button type="button" class="lp-card" data-flip><span class="f">' + esc(c[0]) + '<small>tap to flip</small></span><span class="b">' + esc(c[1]) + '</span></button>'; }).join('') + '</div>'; }

  /* ---------- the agenda ---------- */
  var AG = [['Warm-up', '0:00', 8], ['Mini-lesson', '0:08', 12], [P.room.formatLabel, '0:20', 28], ['Debrief', '0:48', 4], ['Exit ticket', '0:52', 8]];

  /* ---------- a check for understanding ---------- */
  var cfuN = 0;
  function cfu(ck, label, mode) {
    var id = 'c' + (cfuN++), body = '';
    if (ck.type === 'mc') body = '<div class="lp-choices">' + ck.choices.map(function (c, k) { return '<button type="button" class="lp-choice" data-cfu="' + id + '" data-k="' + k + '"><b>' + LET[k] + '</b>' + esc(c) + '</button>'; }).join('') + '</div>';
    else if (ck.type === 'input') body = '<div class="lp-inrow"><input type="text" data-in="' + id + '" placeholder="Class answer" aria-label="Class answer">' + (ck.unit ? '<span>' + esc(ck.unit) + '</span>' : '') + '<button type="button" class="lp-btn" data-incheck="' + id + '">Check</button></div>';
    else if (ck.type === 'order') body = '<ol class="lp-order">' + ck.items.slice().sort(function (a, b) { return a.length - b.length; }).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol><p class="lp-small">Students number these in order on their whiteboards.</p>';
    else if (ck.type === 'highlight') body = '<p class="lp-segs">' + ck.segments.map(function (sg, k) { return '<button type="button" class="lp-seg" data-seg="' + id + '" data-k="' + k + '">' + esc(sg) + '</button>'; }).join(' ') + '</p>';
    var ans = ck.type === 'mc' ? LET[ck.answer] + '. ' + ck.choices[ck.answer] : ck.type === 'order' ? ck.items.join(' → ') : ck.type === 'highlight' ? ck.answer.map(function (k) { return '"' + ck.segments[k] + '"'; }).join(' + ') : ck.answer[0] + (ck.unit ? ' ' + ck.unit : '');
    cfuData[id] = ck;
    return '<div class="lp-cfu" id="' + id + '"><div class="lp-cfuh"><span class="lp-tag">' + esc(label || 'Check for understanding') + '</span><span class="lp-mode">' + esc(mode || 'Show me on whiteboards: 3, 2, 1!') + '</span></div>' +
      '<p class="lp-q">' + esc(ck.q) + '</p>' + body + '<div class="lp-fb" data-fb="' + id + '"></div>' +
      '<div class="lp-row"><button type="button" class="lp-btn ghost" data-reveal="' + id + '">Reveal answer</button><button type="button" class="lp-btn ghost" data-pick>Pick a student to explain</button></div>' +
      '<div class="lp-ans" data-ans="' + id + '" hidden><b>Answer:</b> ' + esc(ans) + (ck.explain ? '<br><span>' + esc(ck.explain) + '</span>' : '') + '</div></div>';
  }
  var cfuData = {};

  /* ---------- slides ---------- */
  var S = [];
  function slide(o) { S.push(o); }
  var L = P.lesson, X = P.X, steps = X.steps || [];

  slide({ part: 0, title: 'Today\'s target', html: function () {
    return '<div class="lp-hero"><div class="lp-kick">' + esc(P.code) + ' · Grade ' + esc(P.grade) + '</div><h1>' + esc(P.title) + '</h1></div>' +
      '<div class="lp-grid2"><div class="lp-box accent"><h3>Learning target</h3><p class="lp-big">' + esc(L.target) + '</p>' +
      '<h3>Success criteria</h3><ul class="lp-checks"><li>I can explain and use the key words: ' + esc(L.vocab.map(function (v) { return v[0]; }).join(', ')) + '.</li>' +
      steps.slice(0, 2).map(function (st) { return '<li>I can explain: ' + esc(st.t.toLowerCase()) + '.</li>'; }).join('') +
      '<li>I can support my answers with evidence on the exit ticket.</li></ul></div>' +
      '<div class="lp-box"><h3>Agenda</h3><ol class="lp-agenda">' + AG.map(function (a) { return '<li><span>' + a[1] + '</span>' + esc(a[0]) + '<em>' + a[2] + ' min</em></li>'; }).join('') + '</ol>' +
      '<h3>Key vocabulary</h3><div class="lp-chips">' + L.vocab.map(function (v) { return '<span title="' + esc(v[1]) + '">' + esc(v[0]) + '</span>'; }).join('') + '</div></div></div>';
  }, notes: ['Read the learning target aloud; have students repeat it chorally or write it at the top of their notes.', 'Point to the agenda so students know the plan and how they will show learning (exit ticket).', 'Materials: notebooks or printed warm-up and guided notes; devices closed until work time.'] });

  slide({ part: 0, title: 'Warm-up', timer: 8 * 60, html: function () {
    return '<div class="lp-head"><span class="lp-tag">Warm-up · 8 minutes</span><h2>Do now</h2></div><div class="lp-grid2 wide"><div class="lp-box"><ol class="lp-wq">' + X.warmup.map(function (w, i) { return '<li><p>' + esc(w[0]) + '</p><div class="lp-look" data-look hidden><b>Look for:</b> ' + esc(w[1]) + '</div></li>'; }).join('') + '</ol>' +
      '<div class="lp-row"><button type="button" class="lp-btn" data-starttimer="480">Start 8:00 timer</button><button type="button" class="lp-btn ghost" data-showlook>Reveal answers 1–2</button><button type="button" class="lp-btn ghost" data-pick>Pick a student</button></div></div>' +
      '<div class="lp-box accent"><h3>Expectations</h3><ul class="lp-exp"><li><b>Where:</b> notebook (date + "Warm-Up") or worksheet</li><li><b>How:</b> number each answer; complete sentences; show math work</li><li><b>Voice:</b> 0 (silent) for 5 minutes</li><li><b>Then:</b> 2 minutes to share with a partner</li><li><b>Be ready:</b> anyone may be called on to share</li></ul></div></div>';
  }, notes: ['Start the timer as students enter. Circulate and note who is unsure of question 1 or 2 (prior knowledge).', 'At 5 minutes, say "Partner share" and reset to 2:00 if you want.', 'Reveal answers to questions 1–2 only. Question 3 is a prediction: collect ideas without correcting; you will return to it in the debrief.'] });

  slide({ part: 1, title: 'Hook', html: function () {
    return '<div class="lp-head"><span class="lp-tag">Hook · 1 minute</span><h2>Make a prediction</h2></div><div class="lp-box accent lp-hook"><p class="lp-big">' + esc(P.hook) + '</p></div>' +
      '<div class="lp-box"><h3>Class vote</h3><div class="lp-votes">' + ['Yes / agree', 'Not sure', 'No / disagree'].map(function (v, k) { return '<div class="lp-vote"><span>' + v + '</span><b data-vote="' + k + '">0</b><div><button type="button" class="lp-btn ghost sm" data-vadd="' + k + '" data-d="1">+1</button><button type="button" class="lp-btn ghost sm" data-vadd="' + k + '" data-d="-1">−1</button></div></div>'; }).join('') + '</div><p class="lp-small">Write your prediction in your notes first. We will come back to it at the end.</p></div>';
  }, notes: ['Pose the question and have students commit to a prediction in writing before voting. This creates a reason to listen.', 'Do not reveal the answer. Tell students the lesson will help them decide.'] });

  steps.forEach(function (st, i) {
    slide({ part: 1, title: 'Learn ' + (i + 1) + ': ' + st.t, tool: st.tool, html: function () {
      return '<div class="lp-head"><span class="lp-tag">Learn · step ' + (i + 1) + ' of ' + steps.length + '</span><h2>' + esc(st.t) + '</h2></div>' +
        '<div class="lp-grid2"><div><div class="lp-box accent"><h3>Key idea</h3><p class="lp-big">' + esc(st.say) + '</p></div>' +
        '<div class="lp-box"><h3>Guided notes</h3><p class="lp-notes" data-notes>' + blanks(st.note, false) + '</p><button type="button" class="lp-btn ghost sm" data-fill>Show the missing words</button></div>' +
        '<div class="lp-box talk"><h3>Turn and talk <span class="lp-small">(1 minute)</span></h3><p class="lp-big2">' + esc((X.talk || [])[i] || 'Explain this idea to your partner in your own words.') + '</p><div class="lp-row"><button type="button" class="lp-btn ghost sm" data-starttimer="60">Start 1:00</button><button type="button" class="lp-btn ghost sm" data-pick>Pick a pair to share</button></div></div></div>' +
        '<div><div class="lp-box tool"><h3>Explore it <span class="lp-small">' + esc(st.do) + '</span></h3>' + (st.tool ? vis(st.tool) : '') + (st.cards ? cards(st.cards) : '') + (!st.tool && !st.cards ? '<p class="lp-big2">' + esc(st.do) + '</p><p class="lp-small">Model this on the board while students copy it into their notes.</p>' : '') + '</div>' +
        cfu(st.check, 'Check for understanding', ['Show me on whiteboards: 3, 2, 1!', 'Hold up fingers for your answer (1 = A, 2 = B...).', 'Think silently for 10 seconds, then show me.', 'Tell your partner, then we vote.'][i % 4]) + '</div></div>';
    }, notes: ['Teach (about 3 minutes): ' + st.say, 'Use the tool: ' + (st.tool ? (st.tool.sim ? 'run the simulation and ask students to predict before each change.' : 'point to the model and ask "What do you notice?"') : st.cards ? 'flip each card only after students guess.' : 'sketch it on the board.'), 'Check: if fewer than 80% are correct, reteach with a new example before moving on.'].concat(i === 0 ? (L.misconceptions || []).slice(0, 1).map(function (m) { return 'Watch for: ' + m; }) : i === 1 ? (L.misconceptions || []).slice(1, 2).map(function (m) { return 'Watch for: ' + m; }) : i === 2 ? (L.misconceptions || []).slice(2, 3).map(function (m) { return 'Watch for: ' + m; }) : []) });
  });

  slide({ part: 1, title: 'I do: watch me think', html: function () {
    return '<div class="lp-head"><span class="lp-tag">I do · model</span><h2>Watch me think it through</h2></div><div class="lp-box accent"><p class="lp-big">' + esc(L.model) + '</p></div>' +
      '<div class="lp-box"><h3>As you watch, notice:</h3><ul class="lp-exp"><li>What do I look at first?</li><li>Which key word or rule do I use?</li><li>How do I check that my answer makes sense?</li></ul></div>';
  }, notes: ['Think aloud slowly. Name each decision ("First I notice... so I...").', 'Ask one student to restate your first step.'] });

  if (X.wedo) slide({ part: 1, title: 'We do: solve it together', html: function () {
    return '<div class="lp-head"><span class="lp-tag">We do · guided practice</span><h2>Solve it together</h2></div><div class="lp-box accent"><p class="lp-big">' + esc(X.wedo.q) + '</p></div>' +
      '<div class="lp-box"><ol class="lp-steps">' + X.wedo.steps.map(function (t, k) { return '<li data-wstep hidden>' + esc(t) + '</li>'; }).join('') + '</ol><div class="lp-row"><button type="button" class="lp-btn" data-nextstep>Show next step</button><button type="button" class="lp-btn ghost" data-pick>Pick a student for the next step</button></div>' +
      '<div class="lp-ans" data-wans hidden><b>Answer:</b> ' + esc(X.wedo.a) + '</div></div>';
  }, notes: ['Before revealing each step, ask the class "What should we do next?" and take an answer.', 'Students copy the worked steps into their notes.'] });

  if (X.youdo) slide({ part: 1, title: 'You do: try it on your own', timer: 120, html: function () {
    return '<div class="lp-head"><span class="lp-tag">You do · independent</span><h2>Your turn: on your own</h2></div><div class="lp-grid2 wide"><div>' + cfu(X.youdo, 'Independent check', 'Solve on your whiteboard or in your notes. No talking for 2 minutes.') + '</div>' +
      '<div class="lp-box accent"><h3>Then</h3><ul class="lp-exp"><li><b>Got it?</b> Get ready to launch ' + esc(P.room.title) + '.</li><li><b>Not sure?</b> Stay at the teacher table for a 3-minute reteach, then start at the Explorer level.</li></ul><button type="button" class="lp-btn" data-starttimer="120">Start 2:00 timer</button></div></div>';
  }, notes: ['Scan answers. Pull students who miss this item to a quick reteach group before they start the room.', 'Assign mission levels now: Explorer for students who need support, Legend for students ready for more.'] });

  slide({ part: 2, title: 'Work time: ' + P.room.title, timer: 28 * 60, work: true, html: function () {
    return '<div class="lp-head"><span class="lp-tag">Work time · 28 minutes</span><h2>' + esc(P.room.title) + '</h2><p class="lp-sub">' + esc(P.room.formatLabel) + ' · open it on your device</p></div>' +
      '<div class="lp-work"><div class="lp-box lp-bigtimer"><div class="lp-bt" data-bigtime="1680">28:00</div><div class="lp-row center"><button type="button" class="lp-btn" data-starttimer="1680">Start 28:00</button><button type="button" class="lp-btn ghost" data-toggletimer>Pause / resume</button></div>' +
      '<div class="lp-checkpts"><b>Checkpoints</b><span>10 min: ' + esc(P.room.node) + ' 2 done</span><span>20 min: ' + esc(P.room.node) + ' 4 done</span><span>28 min: final code + turn-in</span></div></div>' +
      '<div class="lp-box accent"><h3>Expectations</h3><ul class="lp-exp"><li><b>Voice:</b> level 1 (whisper) with your partner only</li><li><b>Work:</b> solo or with your assigned partner</li><li><b>Stuck?</b> 1) reread the clue card 2) Show a hint 3) Supports button 4) ask your partner 5) ask the teacher</li><li><b>Level:</b> Explorer, Agent, or Legend as assigned</li><li><b>Write it down:</b> code pieces go in your guided notes</li></ul></div>' +
      '<div class="lp-box"><h3>Must do</h3><ul class="lp-checks"><li>Finish every ' + esc(P.room.node.toLowerCase()) + ' and open the final lock</li>' + (P.room.task ? '<li>Complete the written evidence task (' + esc(P.room.task) + ')</li>' : '') + '<li>Tap "Copy my work" and paste it into Canvas</li></ul><h3>May do (finished early?)</h3><ul class="lp-exp"><li>Replay at the Legend level</li><li>Help a classmate without giving answers</li><li>Write one new challenge question for the class</li></ul></div></div>';
  }, notes: ['Leave this slide up the whole work time. The big timer and checkpoints keep students on pace.', 'Circulate with the answer key. Prioritize students from the "Not sure" group.', 'At 20 minutes, give a 5-minute warning for the written task and turn-in.'] });

  slide({ part: 3, title: 'Debrief', timer: 4 * 60, html: function () {
    return '<div class="lp-head"><span class="lp-tag">Debrief · 4 minutes</span><h2>What did we learn?</h2></div><div class="lp-grid2 wide"><div class="lp-box"><ol class="lp-wq">' + L.debrief.map(function (q) { return '<li><p>' + esc(q) + '</p></li>'; }).join('') + '</ol><button type="button" class="lp-btn ghost" data-pick>Pick a student</button></div>' +
      '<div class="lp-box accent"><h3>Back to the warm-up</h3><p class="lp-big2">' + esc(X.warmup[2][0]) + '</p><button type="button" class="lp-btn ghost sm" data-showlast>Reveal</button><div class="lp-ans" data-last hidden>' + esc(X.warmup[2][1]) + '</div><h3>And the hook</h3><p>Were our predictions right? What evidence changed your mind?</p></div></div>';
  }, notes: ['Ask for evidence: "How do you know?" after every answer.', 'Close the loop on warm-up question 3 and the hook vote.'] });

  slide({ part: 4, title: 'Exit ticket', timer: 8 * 60, html: function () {
    return '<div class="lp-head"><span class="lp-tag">Exit ticket · 8 minutes</span><h2>Show what you know</h2></div><div class="lp-grid2 wide"><div class="lp-box lp-bigtimer"><div class="lp-bt" data-bigtime="480">8:00</div><button type="button" class="lp-btn" data-starttimer="480">Start 8:00</button></div>' +
      '<div class="lp-box accent"><h3>Expectations</h3><ul class="lp-exp"><li><b>Voice:</b> 0, silent and independent</li><li><b>Part A:</b> choose, then write "I know because..."</li><li><b>Part B:</b> explain with evidence</li><li><b>Part C:</b> apply it to something new using ' + esc(P.frame) + '</li><li><b>Finished?</b> Reread your evidence, then turn it in face down</li></ul><h3>Reflect on the target</h3><p>' + esc(L.target) + '</p></div></div>';
  }, notes: ['Collect and sort into Mastered / Approaching / Beginning with page 3 of the exit ticket PDF.', 'Plan tomorrow\'s small groups from the results.'] });

  /* ---------- shell ---------- */
  var cur = 0, notesOn = false, T = { left: 0, total: 0, running: false, iv: null }, names = null;
  try { names = JSON.parse(localStorage.getItem('cx-names') || 'null'); } catch (e) { }
  var root = document.createElement('div'); root.className = 'lp lp-' + (P.subject || 'x');
  mount.innerHTML = ''; mount.appendChild(root);
  var PARTS = ['Warm-up', 'Mini-lesson', 'Work time', 'Debrief', 'Exit ticket'];

  function render() {
    cfuN = 0; cfuData = {};
    var s = S[cur];
    root.innerHTML = '<header class="lp-top"><div class="lp-title"><b>' + esc(P.title) + '</b><span>' + esc(P.code) + '</span></div>' +
      '<nav class="lp-parts">' + PARTS.map(function (p, k) { return '<span class="' + (k === s.part ? 'on' : k < s.part ? 'past' : '') + '">' + p + '</span>'; }).join('') + '</nav>' +
      '<div class="lp-tools"><button type="button" class="lp-timer' + (T.left <= 0 && T.total ? ' done' : '') + '" data-timerbtn title="Timer (T)">' + (T.total ? fmt(T.left) : 'Timer') + '</button><button type="button" class="lp-ico" data-pick title="Name picker (P)">Pick</button><button type="button" class="lp-ico' + (notesOn ? ' on' : '') + '" data-notesbtn title="Teacher notes (N)">Notes</button><button type="button" class="lp-ico" data-fs title="Fullscreen (F)">Full</button>' + (opts.onExit ? '<button type="button" class="lp-ico" data-close title="Close (Esc)">Close</button>' : '') + '</div></header>' +
      '<main class="lp-main">' + s.html() + '</main>' +
      (notesOn ? '<aside class="lp-notesp"><h3>Teacher notes: ' + esc(s.title) + '</h3><ul>' + (s.notes || []).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></aside>' : '') +
      '<footer class="lp-foot"><button type="button" class="lp-btn ghost" data-prev' + (cur ? '' : ' disabled') + '>← Back</button><div class="lp-dots">' + S.map(function (x, k) { return '<button type="button" class="' + (k === cur ? 'on' : '') + '" data-go="' + k + '" title="' + esc(x.title) + '" aria-label="Slide ' + (k + 1) + ': ' + esc(x.title) + '"></button>'; }).join('') + '</div><span class="lp-count">' + (cur + 1) + ' / ' + S.length + '</span><button type="button" class="lp-btn" data-next' + (cur < S.length - 1 ? '' : ' disabled') + '>Next →</button></footer>';
    bind();
    var simEl = root.querySelector('[data-sim]');
    if (simEl && s.tool && s.tool.sim && SIMS[s.tool.sim.kind]) { try { SIMS[s.tool.sim.kind](simEl, s.tool.sim); } catch (e) { simEl.textContent = 'This simulation could not load.'; } }
    syncTimer();
  }
  function go(k) { if (k < 0 || k >= S.length) return; cur = k; render(); var m = root.querySelector('.lp-main'); if (m) m.scrollTop = 0; }

  function bind() {
    function on(sel, fn) { root.querySelectorAll(sel).forEach(function (el) { el.addEventListener('click', function (e) { fn(el, e); }); }); }
    on('[data-prev]', function () { go(cur - 1); });
    on('[data-next]', function () { go(cur + 1); });
    on('[data-go]', function (el) { go(+el.getAttribute('data-go')); });
    on('[data-close]', function () { stopTimer(); if (opts.onExit) opts.onExit(); });
    on('[data-notesbtn]', function () { notesOn = !notesOn; render(); });
    on('[data-fs]', function () { try { if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen(); } catch (e) { } });
    on('[data-timerbtn]', timerMenu);
    on('[data-starttimer]', function (el) { startTimer(+el.getAttribute('data-starttimer')); });
    on('[data-toggletimer]', function () { toggleTimer(); });
    on('[data-pick]', pickName);
    on('[data-flip]', function (el) { el.classList.toggle('on'); });
    on('[data-showlook]', function () { root.querySelectorAll('[data-look]').forEach(function (x, k) { if (k < 2) x.hidden = false; }); });
    on('[data-showlast]', function () { root.querySelector('[data-last]').hidden = false; });
    on('[data-fill]', function (el) { var n = root.querySelector('[data-notes]'); n.innerHTML = blanks(S[cur].note || findNote(), true); el.hidden = true; });
    on('[data-vadd]', function (el) { var k = el.getAttribute('data-vadd'), b = root.querySelector('[data-vote="' + k + '"]'); b.textContent = Math.max(0, +b.textContent + +el.getAttribute('data-d')); });
    on('[data-nextstep]', function (el) { var h = root.querySelector('[data-wstep][hidden]'); if (h) h.hidden = false; if (!root.querySelector('[data-wstep][hidden]')) { root.querySelector('[data-wans]').hidden = false; el.disabled = true; } });
    on('[data-reveal]', function (el) { var id = el.getAttribute('data-reveal'); root.querySelector('[data-ans="' + id + '"]').hidden = false; var ck = cfuData[id]; if (ck.type === 'mc') root.querySelectorAll('[data-cfu="' + id + '"]').forEach(function (b) { if (+b.getAttribute('data-k') === ck.answer) b.classList.add('right'); }); if (ck.type === 'highlight') root.querySelectorAll('[data-seg="' + id + '"]').forEach(function (b) { if (ck.answer.indexOf(+b.getAttribute('data-k')) >= 0) b.classList.add('right'); }); });
    on('[data-cfu]', function (el) {
      var id = el.getAttribute('data-cfu'), ck = cfuData[id], k = +el.getAttribute('data-k'), fb = root.querySelector('[data-fb="' + id + '"]');
      if (k === ck.answer) { el.classList.add('right'); fb.className = 'lp-fb good'; fb.textContent = 'Correct! ' + (ck.explain || ''); }
      else { el.classList.add('wrong'); fb.className = 'lp-fb bad'; fb.textContent = 'Not quite. Ask: why might someone pick "' + ck.choices[k] + '"? What does the key idea say?'; }
    });
    on('[data-seg]', function (el) { var id = el.getAttribute('data-seg'), ck = cfuData[id], k = +el.getAttribute('data-k'), fb = root.querySelector('[data-fb="' + id + '"]'); if (ck.answer.indexOf(k) >= 0) { el.classList.add('right'); fb.className = 'lp-fb good'; fb.textContent = 'Yes, that part answers the question.'; } else { el.classList.add('wrong'); fb.className = 'lp-fb bad'; fb.textContent = 'Not that part. Reread the question.'; } });
    on('[data-incheck]', function (el) {
      var id = el.getAttribute('data-incheck'), ck = cfuData[id], v = root.querySelector('[data-in="' + id + '"]').value, fb = root.querySelector('[data-fb="' + id + '"]');
      if (!v.trim()) { fb.className = 'lp-fb bad'; fb.textContent = 'Type the class answer first.'; return; }
      var ok = ck.answer.some(function (a) { return norm(a) === norm(v); });
      fb.className = 'lp-fb ' + (ok ? 'good' : 'bad'); fb.textContent = ok ? 'Correct! ' + (ck.explain || '') : 'Not yet. Who can find the mistake?';
    });
  }
  function findNote() { var st = steps[S[cur].title.match(/^Learn (\d+)/) ? +S[cur].title.match(/^Learn (\d+)/)[1] - 1 : 0]; return st ? st.note : ''; }

  /* ---------- timer ---------- */
  function beep() { try { var A = window.AudioContext || window.webkitAudioContext, c = new A(), o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(0.15, c.currentTime); o.start(); o.stop(c.currentTime + 0.6); } catch (e) { } }
  function syncTimer() {
    var b = root.querySelector('[data-timerbtn]'); if (b) { b.textContent = T.total ? fmt(T.left) : 'Timer'; b.classList.toggle('done', !!T.total && T.left <= 0); b.classList.toggle('run', T.running); }
    root.querySelectorAll('[data-bigtime]').forEach(function (el) { var pre = +el.getAttribute('data-bigtime') || 0, mine = !pre || T.total === pre; el.textContent = mine && T.total ? fmt(T.left) : fmt(pre); el.classList.toggle('done', mine && !!T.total && T.left <= 0); el.classList.toggle('warn', mine && T.running && T.left > 0 && T.left <= 60); });
  }
  function startTimer(sec) { stopTimer(); T.total = sec; T.left = sec; T.running = true; T.iv = setInterval(tick, 1000); syncTimer(); }
  function tick() { if (!root.isConnected) { stopTimer(); return; } T.left--; if (T.left <= 0) { T.left = 0; stopTimer(); beep(); } syncTimer(); }
  function stopTimer() { if (T.iv) clearInterval(T.iv); T.iv = null; T.running = false; }
  function toggleTimer() { if (!T.total) return; if (T.running) stopTimer(); else if (T.left > 0) { T.running = true; T.iv = setInterval(tick, 1000); } syncTimer(); }
  function timerMenu() {
    var ov = modal('<h3>Timer</h3><div class="lp-bt small" data-bigtime>' + (T.total ? fmt(T.left) : '0:00') + '</div><div class="lp-row center">' + [1, 2, 3, 5, 8, 10, 12, 28].map(function (m) { return '<button type="button" class="lp-btn ghost sm" data-m="' + m + '">' + m + ' min</button>'; }).join('') + '</div><div class="lp-row center"><button type="button" class="lp-btn" data-tp>Pause / resume</button><button type="button" class="lp-btn ghost" data-tr>Reset</button></div>');
    ov.querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { startTimer(+b.getAttribute('data-m') * 60); ov.remove(); }; });
    ov.querySelector('[data-tp]').onclick = function () { toggleTimer(); ov.remove(); };
    ov.querySelector('[data-tr]').onclick = function () { stopTimer(); T.total = 0; T.left = 0; syncTimer(); ov.remove(); };
  }

  /* ---------- name picker ---------- */
  var used = [];
  function pickName() {
    var list = names && names.length ? names : null;
    var ov = modal('<h3>Pick a student</h3><div class="lp-picked" data-picked>?</div><div class="lp-row center"><button type="button" class="lp-btn" data-again>Pick</button></div>' +
      '<details><summary>Class list (' + (list ? list.length + ' names' : 'using numbers 1–30') + ')</summary><textarea data-names rows="6" placeholder="One name per line">' + esc((list || []).join('\n')) + '</textarea><button type="button" class="lp-btn ghost sm" data-savenames>Save list</button><p class="lp-small">Saved only in this browser.</p></details>');
    function pick() {
      var pool = (names && names.length ? names : Array.apply(null, Array(30)).map(function (_, i) { return 'Student ' + (i + 1); })).filter(function (n) { return used.indexOf(n) < 0; });
      if (!pool.length) { used = []; return pick(); }
      var n = pool[Math.floor(Math.random() * pool.length)]; used.push(n); ov.querySelector('[data-picked]').textContent = n;
    }
    ov.querySelector('[data-again]').onclick = pick;
    ov.querySelector('[data-savenames]').onclick = function () { names = ov.querySelector('[data-names]').value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean); used = []; try { localStorage.setItem('cx-names', JSON.stringify(names)); } catch (e) { } pick(); };
    pick();
  }
  function modal(html) {
    var ov = document.createElement('div'); ov.className = 'lp-modal';
    ov.innerHTML = '<div class="lp-mbox" role="dialog">' + html + '<button type="button" class="lp-x" aria-label="Close">×</button></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
    ov.querySelector('.lp-x').onclick = function () { ov.remove(); };
    root.appendChild(ov); syncTimer(); return ov;
  }

  /* ---------- keyboard ---------- */
  function key(e) {
    if (!root.isConnected) { document.removeEventListener('keydown', key); return; }
    if (/INPUT|TEXTAREA/.test((e.target || {}).tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') go(cur + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(cur - 1);
    else if (e.key === 'n' || e.key === 'N') { notesOn = !notesOn; render(); }
    else if (e.key === 't' || e.key === 'T') toggleTimer();
    else if (e.key === 'p' || e.key === 'P') pickName();
    else if (e.key === 'f' || e.key === 'F') { try { if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen(); } catch (er) { } }
  }
  document.addEventListener('keydown', key);

  // each learn slide keeps its note for "show the missing words"
  S.forEach(function (s) { var m = s.title.match(/^Learn (\d+)/); if (m) s.note = steps[+m[1] - 1].note; });
  render();
  return { slides: S.length, go: go };
}
if (typeof module !== 'undefined') module.exports = LessonPresenter;
