/* Crossroads Escapes — teacher site */
(function () {
  var STANDARDS = window.CX_STANDARDS || [];
  var STD = {};
  STANDARDS.forEach(function (s) { STD[s.id] = s; });

  var SUBJECTS = { science: 'Science', social: 'Social Studies', ela: 'ELA', math: 'Math' };
  var FORMATS = {
    escape: { label: 'Escape Room', node: 'Lock' },
    gallery: { label: 'Gallery Walk', node: 'Exhibit' },
    fieldtrip: { label: 'Virtual Field Trip', node: 'Stop' },
    mystery: { label: 'Mystery Case', node: 'Evidence File' },
    quest: { label: 'Quest', node: 'Level' }
  };
  var FORMAT_TIPS = {
    escape: [
      'Locks open in order, so every student moves through the same sequence. Circulate and listen for which lock is causing a traffic jam.',
      'Pairs work well: one student reads the clue card aloud, the other controls the device. Switch roles at every lock.',
      'If a group is stuck for more than 3 minutes, ask "What does the clue card say about this?" before giving the hint.'
    ],
    gallery: [
      'Exhibits can be visited in any order, which spreads students out naturally. Encourage them to start at a different exhibit than their neighbor.',
      'Treat it like a real gallery walk: ask students to jot one "I notice / I wonder" in their notebook at each exhibit (optional, no printing).',
      'Pause the class once midway and have two students share their favorite exhibit so far.'
    ],
    fieldtrip: [
      'Frame it as a real trip: "Buses leave in 1 minute!" Project the start screen and read the story together.',
      'Stops go in order along the route. Remind students that each stop\'s info card is their "tour guide," so they should read it first.',
      'Ask early finishers to write a postcard (3 sentences) home describing the most interesting stop.'
    ],
    mystery: [
      'Evidence files can be opened in any order. Tell students detectives always read the whole file before answering.',
      'Pairs can be "lead detective" and "note taker." The note taker records the code pieces as they are found.',
      'For the debrief, ask students which piece of evidence was most convincing and why.'
    ],
    quest: [
      'Levels unlock in order, like a video game. Celebrate "level-ups" out loud to keep energy high.',
      'Students who finish early can replay and aim for 100% first-try accuracy, which is shown on their certificate.',
      'If a student is stuck on a level, pair them with someone who has already cleared it to explain without giving the answer.'
    ]
  };
  var DIFFERENTIATION = [
    'Support: pair students, read clue cards aloud, and let students use the built-in hints freely. Screen readers and browser read-aloud tools work on every card.',
    'Support: pre-teach the vocabulary cards from the mini-lesson and leave them projected during the activity.',
    'Extension: early finishers replay for 100% first-try accuracy, or write one new puzzle for a classmate using the same standard.',
    'ELL: preview the key vocabulary with visuals or gestures, and allow students to discuss in their home language before answering.'
  ];

  var ROOMS = (window.CX_ROOMS || []).map(function (r) {
    var s = STD[r.std] || {};
    r.grade = s.grade; r.subject = s.subject; r.standard = s.code; r.stdTitle = s.title;
    r.formatLabel = (FORMATS[r.format] || FORMATS.escape).label;
    r.minutes = r.minutes || '25–30';
    return r;
  });
  var BY_ID = {};
  ROOMS.forEach(function (r) { BY_ID[r.id] = r; });

  /* ---------- storage ---------- */
  function load(k, d) { try { var v = localStorage.getItem('cx:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function store(k, v) { try { localStorage.setItem('cx:' + k, JSON.stringify(v)); } catch (e) {} }
  var picks = load('picks', []);
  var filters = load('filters', { grade: 'all', subject: 'all', format: 'all', q: '', picksOnly: false });

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function strip(s) { return String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); }
  function $(sel) { return document.querySelector(sel); }
  function puzzleCount(r) { return r.stages.reduce(function (n, s) { return n + s.puzzles.length; }, 0); }
  function finalCode(r) {
    if (r.code && r.code.length === r.stages.length) return r.code.toUpperCase();
    // must mirror EscapePlayer's fallback code
    return r.stages.map(function (_, i) { return String(fnv(r.id + ':' + i) % 10); }).join('');
  }
  function fnv(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }
  function nodeLabel(r, i) {
    var f = FORMATS[r.format] || FORMATS.escape;
    return f.node + ' ' + (r.format === 'gallery' ? 'ABCDEFGH'[i] : r.format === 'mystery' ? '#' + (i + 1) : i + 1);
  }
  function cleanTitle(t) { return t.replace(/^(Stop|Lock|Level|Evidence File|Door|Container|Panel|Chapter)\s*#?\d+:\s*/i, ''); }
  function fmtNum(v) { return String(Math.round(v * 1e6) / 1e6).replace('-', '−'); }
  function tapLabel(p) {
    var ans = [].concat(p.answer)[0], vis = [].concat(p.visual)[0] || {};
    if (vis.kind === 'scene') { var sh = (vis.shapes || []).filter(function (h) { return h.id === ans; })[0]; if (sh) return sh.label || ans; }
    if (vis.kind === 'chart') { var bi = +String(ans).slice(1); if (vis.type === 'line') return (vis.segLabels && vis.segLabels[bi]) || ('segment ' + (bi + 1)); return vis.data[bi] ? vis.data[bi][0] : ans; }
    if (vis.kind === 'pyramid') return vis.levels[+String(ans).slice(1)] || ans;
    if (vis.kind === 'orbit8') return 'position ' + String.fromCharCode(65 + +String(ans).slice(1));
    return ans;
  }
  function answerText(p) {
    if (p.type === 'mc') return strip(p.choices[p.answer]);
    if (p.type === 'tf') return p.answer ? 'True' : 'False';
    if (p.type === 'input') return strip([].concat(p.answer)[0]) + (p.unit ? ' ' + p.unit : '');
    if (p.type === 'frac') return String(p.answer);
    if (p.type === 'order') return p.items.map(strip).join(' → ');
    if (p.type === 'match') return p.pairs.map(function (pr) { return strip(pr[0]) + ' = ' + strip(pr[1]); }).join('; ');
    if (p.type === 'sort') return p.buckets.map(function (b, bi) {
      return strip(b) + ': ' + p.items.filter(function (it) { return it[1] === bi; }).map(function (it) { return strip(it[0]); }).join(', ');
    }).join(' | ');
    if (p.type === 'numberline') return 'Point at ' + fmtNum(p.answer);
    if (p.type === 'plot') return 'Point at (' + fmtNum(p.answer[0]) + ', ' + fmtNum(p.answer[1]) + ')';
    if (p.type === 'highlight') return p.answer.map(function (i) { return '“' + strip(p.segments[i]) + '”'; }).join(' + ');
    if (p.type === 'shade') return 'Shade ' + p.answer + (p.model === 'grid100' ? ' of the 100-square grid' : ' of the model');
    if (p.type === 'build') return p.target.dims ? 'Prism ' + p.target.dims.join(' × ') : 'Any prism with volume ' + p.target.volume + (p.target.base ? ' and base ' + p.target.base : '');
    if (p.type === 'coins') return '$' + p.answer.toFixed(2);
    if (p.type === 'assemble') return p.answer.map(strip).join(' ');
    if (p.type === 'maya') return p.answer + ' (' + Math.floor(p.answer / 5) + ' bar' + (Math.floor(p.answer / 5) === 1 ? '' : 's') + ', ' + (p.answer % 5) + ' dot' + (p.answer % 5 === 1 ? '' : 's') + ')';
    if (p.type === 'balance') return 'x = ' + p.answer;
    if (p.type === 'tap') return 'Tap ' + tapLabel(p);
    if (p.type === 'write') return 'Written response (' + ({ RACE: 'RACE', CER: 'CER', SOURCE: 'claim, evidence, source check, explain', MATH: 'solve, show, explain' }[p.frame] || p.frame) + ')' + (p.answer ? '. Answer: ' + [].concat(p.answer)[0] + (p.unit ? ' ' + p.unit : '') : '') + '. Model: ' + Object.keys(p.exemplar || {}).map(function (k) { return p.exemplar[k]; }).join(' ');
    return '';
  }
  var GAME_INFO = {
    locks: ['Padlock escape', 'Each lock on the board opens and shows its code digit when students clear it.'],
    boss: ['Boss battle', 'Every correct answer damages the boss\'s health bar. Wrong answers cost a heart; losing all hearts triggers a "Regroup" with an automatic hint, so there is no dead end.'],
    board: ['Board-game route', 'Students move a game piece along a winding route and collect passport stamps at each stop.'],
    'case': ['Cork-board case file', 'Solved evidence files are stamped SOLVED and pinned with red string to the verdict card.'],
    museum: ['Museum floor plan', 'Students tour exhibit rooms on a floor plan in any order and collect a stamp in each room.']
  };
  function gameOf(r) { return r.game || { quest: 'boss', fieldtrip: 'board', mystery: 'case', gallery: 'museum', escape: 'locks' }[r.format] || 'locks'; }
  function writeTask(r) { var t = null; r.stages.forEach(function (s) { s.puzzles.forEach(function (p) { if (p.type === 'write') t = p; }); }); return t; }
  var FRAME_INFO = {
    RACE: ['RACE response', [['R', 'Restate the question'], ['A', 'Answer it'], ['C', 'Cite evidence in quotation marks'], ['E', 'Explain how the evidence proves the answer']]],
    CER: ['Claim, Evidence, Reasoning', [['C', 'Claim that answers the question'], ['E', 'Evidence: data or a quote'], ['R', 'Reasoning that uses a science idea']]],
    SOURCE: ['Historian\'s claim', [['C', 'Claim'], ['E', 'Evidence from the sources'], ['S', 'Source check: who made it, when, why, and can we trust it?'], ['X', 'Explain why the evidence proves the claim']]],
    MATH: ['Solve, Show, Explain', [['A', 'Correct final answer'], ['S', 'Work with numbers and operations'], ['E', 'Explanation of the strategy with math words']]]
  };
  function gameSection(r) {
    var g = GAME_INFO[gameOf(r)], t = writeTask(r), f = t && FRAME_INFO[t.frame];
    var h = '<section class="sec" id="s-game"><h2>Game, levels &amp; supports</h2>' +
      '<p><b>Game style: ' + esc(g[0]) + (r.boss ? ' vs. ' + esc(r.boss) : '') + '.</b> ' + esc(g[1]) + ' In every room, students earn XP (a bonus for first-try streaks), a rank, and up to 8 badges.</p>' +
      '<h3>Differentiated mission levels</h3><table class="tbl"><thead><tr><th>Level</th><th>What changes</th></tr></thead><tbody>' +
      '<tr><td><b>Explorer</b> (extra support)</td><td>Sentence starters are pre-filled, hints are free, unlimited "remove 2 wrong answers" power-ups, a calculator (including in math), 5 hearts in boss battles, and writing minimums are about 40% shorter.</td></tr>' +
      '<tr><td><b>Agent</b> (on level)</td><td>3 power-ups, hints cost 30 XP, standard writing requirements.</td></tr>' +
      '<tr><td><b>Legend</b> (extra challenge)</td><td>No power-ups, hints cost 60 XP, and writing needs about 40% more words and <b>two</b> pieces of evidence. Earns 1.5× XP.</td></tr></tbody></table>' +
      '<p>Students choose a level on the start screen. To assign a level (for IEPs, 504 plans, or ELL students), add <code>?level=explorer</code>, <code>?level=agent</code>, or <code>?level=legend</code> to the room link. The level appears on the student\'s turn-in.</p>' +
      '<h3>Supports toolbar (every student, every level)</h3><ul><li><b>Read aloud:</b> a Listen button on every clue card and challenge, plus "tap any sentence to hear it" (uses the device\'s built-in voice).</li><li><b>Bigger text, easy-read spacing, high contrast,</b> and a <b>reading ruler</b> that follows the pointer.</li><li><b>Word bank</b> with this standard\'s vocabulary.</li><li><b>Scratch pad</b> that saves notes, and a <b>calculator</b> (math rooms: Explorer level only).</li></ul>';
    if (t) {
      h += '<h3>Written evidence task: ' + esc(f[0]) + '</h3><p>' + esc(t.q) + '</p><p>Students cannot unlock the final code until every checklist item is met. The game checks word count, words from the question, quotation marks or data, linking words (because, this shows...), and key vocabulary' + (t.frame === 'MATH' ? ', plus a correct final answer' : '') + '. After submitting, students compare their answer with a model answer.</p>' +
        '<table class="tbl"><thead><tr><th>Part</th><th>4: Exceeds</th><th>3: Meets</th><th>2: Approaching</th><th>1: Beginning</th></tr></thead><tbody>' +
        f[1].map(function (pt) { return '<tr><td><b>' + pt[0] + '</b>: ' + esc(pt[1]) + '</td><td>Precise and complete, goes beyond</td><td>Clear and accurate</td><td>Partly accurate or vague</td><td>Missing or inaccurate</td></tr>'; }).join('') + '</tbody></table>' +
        '<details><summary>Model answer</summary>' + Object.keys(t.exemplar).map(function (k) { return '<p><b>' + esc(k) + ':</b> ' + esc(t.exemplar[k]) + '</p>'; }).join('') + (t.answer ? '<p><b>Answer:</b> ' + esc([].concat(t.answer)[0]) + ' ' + esc(t.unit || '') + '</p>' : '') + '</details>';
    }
    h += '<h3>What students turn in</h3><p>The final screen builds a turn-in block with: name, mission level, completion code, time, XP, first-try accuracy, hints used, badges' + (t ? ', and their full written ' + esc(f[0]) : '') + '. Students tap <b>Copy my work</b> and paste it into a Canvas <b>Text Entry</b> submission. Grade the writing with the rubric above' + (t ? '' : ' (this room has no written task, so the code and stats show completion)') + '.</p></section>';
    return h;
  }
  var NOTEBOOK = ['Write the date and "Warm-Up" at the top of a new notebook page (or use the worksheet).', 'Number each answer to match the question.', 'Answer in complete sentences. For math, show your work.', 'Work silently for 5 minutes, then share with a partner for 2 minutes.', 'Be ready to share one answer with the class.'];
  var LETTERS = 'ABCDEFGH';
  function planTable(r) {
    return '<table class="tbl plan"><thead><tr><th>Time</th><th>Part</th><th>Teacher does</th><th>Students do</th><th>Resource</th></tr></thead><tbody>' +
      [['0:00–0:08', '1. Warm-up', 'Project the warm-up, circulate, call on 2–3 students.', 'Answer 3 questions in notebooks or on the worksheet.', '<a href="#s-warm" data-jump>Warm-up</a>'],
       ['0:08–0:20', '2. Mini-lesson', 'Teach 4 steps with the presenter; run each quick check.', 'Fill in guided notes; answer quick checks.', '<a href="#teach-' + r.id + '">Presenter</a>'],
       ['0:20–0:48', '3. ' + esc(r.formatLabel), 'Launch the room, assign levels, circulate with the key.', 'Play solo or in pairs; finish any written task.', '<a href="#play-' + r.id + '">Student view</a>'],
       ['0:48–0:52', '4. Debrief', 'Ask debrief questions; revisit warm-up question 3.', 'Discuss and correct notes.', '<a href="#s-debrief" data-jump>Questions</a>'],
       ['0:52–1:00', '5. Exit ticket', 'Hand out the ticket; sort results with the mastery guide.', 'Answer with evidence independently.', '<a href="#s-exit" data-jump>Exit ticket</a>']].map(function (x) { return '<tr>' + x.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function warmSection(r) {
    var X = lessonOf(r); if (!X) return '';
    return '<section class="sec" id="s-warm"><h2><span class="step">1</span>Warm-up <span class="when">0:00–0:08 · 8 min</span></h2>' +
      '<div class="two"><div class="callout"><h3 style="margin-top:0">Notebook expectations</h3><ol>' + NOTEBOOK.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></div>' +
      '<div><table class="tbl"><thead><tr><th>#</th><th>Question</th><th>Look for</th></tr></thead><tbody>' + X.warmup.map(function (w, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(w[0]) + '</td><td>' + esc(w[1]) + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<p><button class="btn" data-do="warm">' + ICONS.down + 'Warm-up worksheet PDF</button></p></div></div></section>';
  }
  function lessonSection(r, L) {
    var X = lessonOf(r);
    var html = '<section class="sec" id="s-lesson"><h2><span class="step">2</span>Mini-lesson <span class="when">0:08–0:20 · 12 min</span></h2>' +
      '<p class="lede">Project the <a href="#teach-' + r.id + '">lesson presenter</a> (it runs the whole hour, including the warm-up and a work-time timer). Students fill in the <button class="linkbtn" data-do="notes">guided notes</button> as you go (<button class="linkbtn" data-do="noteskey">key</button>).</p>' +
      '<div class="callout"><b>Hook (1 min):</b> ' + esc(r.hook || L.hook) + '</div>' +
      '<h3>Key vocabulary</h3><div class="vocab">' + L.vocab.map(function (v) { return '<div><b>' + esc(v[0]) + '</b>' + esc(v[1]) + '</div>'; }).join('') + '</div>';
    if (X) html += '<div class="steps">' + X.steps.map(function (st, i) {
      var ck = st.check, ans = ck.type === 'mc' ? '(' + LETTERS[ck.answer] + ') ' + ck.choices[ck.answer] : ck.type === 'order' ? ck.items.join(' → ') : ck.type === 'highlight' ? ck.answer.map(function (k) { return ck.segments[k]; }).join(' + ') : ck.answer[0];
      var tool = st.tool ? (st.tool.sim ? 'Simulation: ' + st.tool.sim.title : Array.isArray(st.tool) ? 'Visual models' : (st.tool.caption || 'Visual model')) : st.cards ? 'Flip cards' : 'Board and notes';
      return '<div class="stepcard"><div class="stephead"><span class="step">' + (i + 1) + '</span><h3>' + esc(st.t) + '</h3><span class="when">3 min</span></div>' +
        '<dl><div><dt>Teach</dt><dd>' + esc(st.say) + '</dd></div><div><dt>Interactive tool</dt><dd>' + esc(tool) + '</dd></div><div><dt>Students do</dt><dd>' + esc((X.dos || [])[i] || st.do) + '</dd></div>' +
        '<div><dt>Turn and talk</dt><dd>' + esc((X.talk || [])[i] || '') + '</dd></div><div><dt>Guided notes</dt><dd>' + esc(st.note).replace(/\[([^\]]+)\]/g, '<u>$1</u>') + '</dd></div><div><dt>Quick check</dt><dd>' + esc(ck.q) + ' <span class="ans">' + esc(ans) + '</span></dd></div></dl></div>';
    }).join('') + '</div>';
    else html += '<ul>' + L.teach.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
    html += '<h3>I do: model it</h3><p>' + esc(L.model) + '</p>' +
      (X && X.wedo ? '<h3>We do: guided practice</h3><p><b>' + esc(X.wedo.q) + '</b></p><ol>' + X.wedo.steps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol><p><span class="ans">Answer: ' + esc(X.wedo.a) + '</span></p>' : '') +
      (X && X.youdo ? '<h3>You do: independent check</h3><p>' + esc(X.youdo.q) + ' <span class="ans">' + esc(X.youdo.choices ? LETTERS[X.youdo.answer] + ') ' + X.youdo.choices[X.youdo.answer] : X.youdo.answer[0]) + '</span></p><p class="lede">Students who miss it get a 3-minute reteach, then start the room at the Explorer level.</p>' : '') +
      '<div class="callout warn"><h3 style="margin:0">Watch for these misconceptions</h3><ul>' + L.misconceptions.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></section>';
    return html;
  }
  var FRAME_LABEL = { CER: 'Claim-Evidence-Reasoning', RACE: 'RACE', SOURCE: 'Historian\'s claim (Claim, Evidence, Source check, Explain)', MATH: 'Solve-Show-Explain' };
  function exitSection(r) {
    var X = lessonOf(r), ex = X && X.exit, mcs = r.exit.filter(function (q) { return q.choices; }), crs = r.exit.filter(function (q) { return !q.choices; });
    var total = mcs.length * 2 + crs.length * 2 + (ex ? 4 : 0), m = Math.ceil(total * 0.8), a = Math.ceil(total * 0.5), n = 0;
    return '<section class="sec" id="s-exit"><h2><span class="step">5</span>Exit ticket <span class="when">0:52–1:00 · 8 min</span></h2><p class="lede">Every answer needs evidence. Part A asks students to justify each choice, Part B asks for an explanation, and Part C applies the standard to a brand-new situation. Total: ' + total + ' points.</p>' +
      '<div class="ticket"><h3>Part A: Choose and justify (2 pts each)</h3><ol>' + mcs.map(function (q) { n++; return '<li value="' + n + '"><b>' + esc(q.q) + '</b><ol class="ch">' + q.choices.map(function (c, k) { return '<li' + (k === q.answer ? ' class="ans"' : '') + '>' + esc(c) + '</li>'; }).join('') + '</ol><i>I know because...</i></li>'; }).join('') + '</ol>' +
      (crs.length ? '<h3>Part B: Explain with evidence (2 pts each)</h3><ol>' + crs.map(function (q) { n++; return '<li value="' + n + '"><b>' + esc(q.q) + '</b><br><span class="ans">Look for: ' + esc(q.answer) + '</span></li>'; }).join('') + '</ol>' : '') +
      (ex ? '<h3>Part C: Apply it (' + esc(FRAME_LABEL[ex.frame]) + ', 4 pts)</h3><p class="stim">' + esc(ex.stim) + '</p><p><b>' + (n + 1) + '. ' + esc(ex.q) + '</b></p><details><summary>Model answer and rubric</summary><p>' + esc(ex.model) + '</p><p><b>4 = mastered:</b> ' + esc(ex.look.join('; ')) + '. <b>3</b> = correct with thin reasoning. <b>2</b> = partly correct or general evidence. <b>1</b> = inaccurate or unsupported.</p></details>' : '') + '</div>' +
      '<h3>Sort students for tomorrow</h3><table class="tbl"><thead><tr><th>Score</th><th>Level</th><th>Next step</th></tr></thead><tbody>' +
      '<tr><td>' + m + '–' + total + '</td><td>Mastered</td><td>Extension: replay at the Legend level or write a second evidence response; peer helper.</td></tr>' +
      '<tr><td>' + a + '–' + (m - 1) + '</td><td>Approaching</td><td>5–10 minute reteach with the presenter steps tied to missed items, then 2 practice questions.</td></tr>' +
      '<tr><td>0–' + (a - 1) + '</td><td>Beginning</td><td>Small group: review guided notes, replay the room at the Explorer level with you, then a new exit ticket.</td></tr></tbody></table>' +
      '<div><button class="btn primary" data-do="exit">' + ICONS.down + 'Download exit ticket PDF (with key and mastery guide)</button></div></section>';
  }
  function isGallery(r) { return r.format === 'gallery' && r.stages.every(function (s) { return s.art; }); }
  function posterHTML(r) {
    var V = EscapeKit().V, sd = STD[r.std];
    var pages = r.stages.map(function (s, i) {
      var a = s.art;
      return '<section class="poster"><div class="ph"><span>Exhibit ' + 'ABCDEFGH'[i] + '</span><span>' + esc(r.title) + ' · ' + esc(sd.code) + '</span></div><h1>' + esc(a.title) + '</h1><p class="med">' + esc(a.medium || '') + '</p>' +
        '<div class="frame"><div class="art">' + V.scene(a.pic, {}) + a.spots.map(function (sp, k) { return '<b class="spot" style="left:' + (sp.x / 6).toFixed(2) + '%;top:' + (sp.y / 3.8).toFixed(2) + '%">' + (k + 1) + '</b>'; }).join('') + '</div></div>' +
        '<div class="cols"><div><h2>Look closely</h2><ol>' + a.spots.map(function (sp) { return '<li><b>' + esc(sp.t) + ':</b> ' + esc(sp.d) + '</li>'; }).join('') + '</ol></div><div class="placard"><h2>Placard</h2>' + s.content.replace(/<h3>\s*Placard\s*<\/h3>/i, '') + '</div></div></section>';
    }).join('');
    var guide = '<section class="poster setup"><h1>Setting up the gallery walk</h1><ol><li>Print one poster per exhibit (letter or tabloid size, color if possible) and tape them around the room at eye level, spread out.</li><li>Print the Gallery Walk Viewing Guide PDF for each student.</li><li>Make groups of 3–4. Start each group at a different poster.</li><li>Set the lesson presenter timer for 4 minutes per poster. At the signal, groups rotate clockwise.</li><li>At each poster, students find every numbered detail, read the placard, and write I see / I think / I wonder.</li><li>After the walk (about 20 minutes), students open ' + esc(r.title) + ' on devices to solve each exhibit\'s challenge, or discuss the "After the walk" question as a class.</li></ol></section>';
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(r.title) + ' · Gallery posters</title>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700&display=swap">' +
      '<style>body{margin:0;background:#e9e4d8;font-family:"Atkinson Hyperlegible",sans-serif;color:#2a2418}.bar{position:sticky;top:0;background:#2a2418;color:#fff;padding:10px 16px;display:flex;gap:12px;align-items:center}.bar button{font:inherit;font-weight:700;padding:8px 16px;border-radius:999px;border:0;background:#f2b84b;cursor:pointer}' +
      '.poster{background:#fffdf6;max-width:980px;margin:24px auto;padding:32px 40px;box-shadow:0 6px 20px rgba(0,0,0,.2);page-break-after:always;break-after:page}.ph{display:flex;justify-content:space-between;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:13px;color:#7a6a45}' +
      'h1{font-family:"Bricolage Grotesque",sans-serif;font-size:48px;margin:6px 0 0}.med{font-style:italic;margin:2px 0 14px;color:#6b5d40}.frame{padding:16px;background:linear-gradient(135deg,#b8862b,#f3d27a 40%,#a8741c 70%,#e6c066)}.art{position:relative;background:#f7f2e6;padding:0;line-height:0}.art svg{width:100%;height:auto}' +
      '.spot{position:absolute;transform:translate(-50%,-50%);width:34px;height:34px;border-radius:50%;background:#C8272D;color:#fff;display:grid;place-items:center;font-size:17px;border:3px solid #fff;line-height:1}' +
      '.cols{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;margin-top:18px;font-size:16px;line-height:1.45}.cols h2{font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:#7a6a45;margin:0 0 6px}.cols ol{margin:0;padding-left:1.2em;display:grid;gap:6px}.placard h3{font-size:16px}.placard table{border-collapse:collapse}.placard td,.placard th{border:1px solid #999;padding:3px 6px}' +
      '.setup ol{font-size:18px;line-height:1.6}@media print{body{background:#fff}.bar{display:none}.poster{box-shadow:none;margin:0;max-width:none;padding:18px 24px}}@media (max-width:700px){.cols{grid-template-columns:1fr}h1{font-size:34px}}</style></head><body>' +
      '<div class="bar"><b>' + esc(r.title) + ': gallery walk posters</b><span style="flex:1"></span><button onclick="window.print()">Print posters</button></div>' + guide + pages + '</body></html>';
  }
  function answerLines(r) {
    var out = [], code = finalCode(r);
    r.stages.forEach(function (s, i) {
      out.push(nodeLabel(r, i) + ': ' + cleanTitle(s.title) + '  (code piece: ' + code[i] + ')');
      s.puzzles.forEach(function (p, j) { out.push('   ' + (j + 1) + '. ' + strip(p.q) + '  →  ' + answerText(p)); });
    });
    return out;
  }
  function runTips(r) { return (r.tips || []).concat(FORMAT_TIPS[r.format] || []); }

  var ICONS = {
    escape: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    gallery: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 17l4-5 3 3 2-2 3 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    fieldtrip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.2" fill="currentColor"/></svg>',
    mystery: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 14l6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    quest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    starOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
  };

  /* ---------- export ---------- */
  function studentRoom(r) {
    // only what the player needs
    return {
      id: r.id, title: r.title, grade: r.grade, subject: r.subject, standard: r.standard, format: r.format,
      minutes: r.minutes, story: r.story, code: r.code, stages: r.stages, finale: r.finale,
      finalTitle: r.finalTitle, finalPrompt: r.finalPrompt, hubTitle: r.hubTitle, theme: r.theme, startHead: r.startHead, boss: r.boss, game: r.game,
      vocab: ((STD[r.std] || {}).lesson || {}).vocab
    };
  }
  function standaloneHTML(r) {
    var data = JSON.stringify(studentRoom(r)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(r.title) + ' | ' + esc(r.formatLabel) + '</title>\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap">\n' +
      '<style>html,body{margin:0;min-height:100%}</style>\n</head>\n<body>\n<div id="app"></div>\n<script>\n' +
      EscapeThemes.toString() + '\n' + EscapeKit.toString() + '\n' + EscapePlayer.toString() + '\nEscapePlayer(document.getElementById("app"), ' + data + ');\n</' + 'script>\n</body>\n</html>\n';
  }
  function slug(r) { return 'grade' + r.grade + '-' + r.subject + '-' + r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function download(name, data, type) {
    var blob = new Blob([data], { type: type });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function copyText(text, okMsg, fallbackEl) {
    function fallback() {
      if (fallbackEl) { fallbackEl.hidden = false; fallbackEl.value = text; fallbackEl.focus(); fallbackEl.select(); toast('Press Ctrl+C (or ⌘C) to copy the selected code.'); }
      else toast('Copy did not work in this browser. Use Download instead.');
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }
  function playURL(r) {
    if (!/^https?:/.test(location.protocol)) return null;
    return location.origin + location.pathname.replace(/[^/]*$/, '') + 'play.html#' + r.id;
  }

  /* ---------- views ---------- */
  function setNav(which) {
    document.querySelectorAll('.nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-nav') === which); });
    $('#pickcount').textContent = picks.length;
  }

  function matches(r) {
    if (filters.grade !== 'all' && String(r.grade) !== filters.grade) return false;
    if (filters.subject !== 'all' && r.subject !== filters.subject) return false;
    if (filters.format !== 'all' && r.format !== filters.format) return false;
    if (filters.picksOnly && picks.indexOf(r.id) < 0) return false;
    if (filters.q) {
      var hay = (r.title + ' ' + r.tagline + ' ' + r.standard + ' ' + r.stdTitle + ' ' + (STD[r.std] || {}).text + ' ' + r.formatLabel).toLowerCase();
      if (filters.q.toLowerCase().split(/\s+/).some(function (w) { return w && hay.indexOf(w) < 0; })) return false;
    }
    return true;
  }

  var themeCache = {};
  function themeOf(r) { return themeCache[r.id] || (themeCache[r.id] = EscapePlayer(null, r, { themeInfo: true })); }
  function coverHTML(r, big) {
    var t = themeOf(r), v = t.v;
    var fonts = document.getElementById('cx-font-' + t.id);
    if (!fonts) { var lk = document.createElement('link'); lk.id = 'cx-font-' + t.id; lk.rel = 'stylesheet'; lk.href = 'https://fonts.googleapis.com/css2?family=' + t.gf + '&display=swap'; document.head.appendChild(lk); }
    return '<div class="cover' + (big ? ' big' : '') + '" style="background-color:' + v.bg + ';background-image:' + (v['bg-img'] || 'none') + ';background-size:' + (v['bg-size'] || 'auto') + '">' +
      '<div class="cover-band" style="background:' + v.band + ';border-bottom:3px solid ' + v['band-edge'] + '"></div>' +
      '<div class="cover-body"><svg class="cover-emblem" viewBox="0 0 64 64" aria-hidden="true">' + t.emblem + '</svg>' +
      '<span class="cover-title" style="font-family:\'' + t.font + '\',system-ui,sans-serif;color:' + v.sign + ';text-shadow:2px 2px 0 ' + v['sign-shadow'] + '">' + esc(big ? t.name + ' theme' : r.title) + '</span>' + (big ? '<span style="color:' + v.muted + ';font-weight:700;font-size:.9rem">What students see</span>' : '') + '</div></div>';
  }
  function card(r) {
    var on = picks.indexOf(r.id) >= 0;
    return '<article class="card subj-' + r.subject + '">' + coverHTML(r) + '<div class="card-top"><span class="fmt">' + ICONS[r.format] + esc(r.formatLabel) + '</span>' +
      '<button class="star' + (on ? ' on' : '') + '" data-pick="' + r.id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove from' : 'Add to') + ' My Picks">' + (on ? ICONS.star : ICONS.starOff) + '</button></div>' +
      '<div class="card-body"><h3><a href="#room-' + r.id + '">' + esc(r.title) + '</a></h3><p>' + esc(r.tagline) + '</p>' +
      '<div class="meta"><span>' + esc(r.minutes) + ' min</span><span>' + r.stages.length + ' ' + (FORMATS[r.format].node.toLowerCase()) + 's</span><span>' + puzzleCount(r) + ' puzzles</span><span>' + interactiveCount(r) + ' hands-on</span></div></div>' +
      '<div class="card-actions"><a class="btn grow" href="#room-' + r.id + '">Teacher guide</a><a class="btn primary grow" href="#play-' + r.id + '">' + ICONS.play + 'Play as student</a></div></article>';
  }
  var HANDS_ON = { sort: 1, order: 1, match: 1, numberline: 1, plot: 1, highlight: 1, shade: 1, build: 1, coins: 1, assemble: 1, maya: 1, balance: 1, tap: 1, frac: 1 };
  var TYPE_NAMES = { sort: 'drag-and-drop sort', order: 'drag-to-order', match: 'tap-to-connect matching', numberline: 'number line', plot: 'coordinate plotting', highlight: 'tap-the-evidence passage', shade: 'shade-the-model', build: 'prism builder', coins: 'money tray', assemble: 'tile builder', maya: 'Maya numeral builder', balance: 'balance-scale equation', tap: 'tap-the-diagram', frac: 'fraction entry', write: 'written evidence task' };
  var SIM_NAMES = { particles: 'particle temperature simulation', mix: 'sealed vs. open mass scale', moonphase: 'Moon phase orbit simulator', shadow: 'sundial shadow simulator', orbit: 'Newton\'s cannon orbit simulator', coaster: 'roller coaster energy simulator', populations: 'food web population simulator', diffusion: 'hot vs. cold diffusion simulator' };
  function handsOnList(r) {
    var seen = {}, out = [];
    r.stages.forEach(function (s) {
      if (s.sim && !seen['s' + s.sim.kind]) { seen['s' + s.sim.kind] = 1; out.push(SIM_NAMES[s.sim.kind] || s.sim.kind); }
      if (s.cards && !seen.cards) { seen.cards = 1; out.push('flip cards'); }
      s.puzzles.forEach(function (p) { if (TYPE_NAMES[p.type] && !seen[p.type]) { seen[p.type] = 1; out.push(TYPE_NAMES[p.type]); } });
    });
    return out.length ? '<p><b>Interactive elements:</b> ' + esc(out.join(', ')) + '.</p>' : '';
  }
  function interactiveCount(r) {
    return r.stages.reduce(function (n, s) { return n + (s.sim ? 1 : 0) + (s.cards ? 1 : 0) + s.puzzles.filter(function (p) { return HANDS_ON[p.type]; }).length; }, 0);
  }

  function chips(name, opts, cur) {
    return opts.map(function (o) {
      return '<button class="chip' + (cur === o[0] ? ' on' : '') + '" data-filter="' + name + '" data-val="' + o[0] + '" aria-pressed="' + (cur === o[0]) + '">' + (o[2] ? '<span class="dot" style="background:var(--' + o[2] + ')"></span>' : '') + esc(o[1]) + '</button>';
    }).join('');
  }

  function renderCatalog() {
    setNav(filters.picksOnly ? 'picks' : 'catalog');
    var list = ROOMS.filter(matches);
    var groups = [];
    STANDARDS.forEach(function (s) {
      var rs = list.filter(function (r) { return r.std === s.id; });
      if (rs.length) groups.push({ s: s, rooms: rs });
    });
    var formatsUsed = Object.keys(FORMATS).length;
    var html = '<div class="wrap">' +
      '<section class="intro"><div style="display:grid;gap:12px"><h1>Pick a room. Teach the mini-lesson. <em>Assign it in Canvas.</em></h1>' +
      '<p>Interactive escape rooms, gallery walks, virtual field trips, mystery cases and quests built on Indiana power standards for grades 5 and 6. Every activity runs 25–30 minutes on a student device with nothing to print or prep.</p>' +
      '<div class="facts"><span><b>' + ROOMS.length + '</b> activities</span><span><b>' + STANDARDS.length + '</b> power standards</span><span><b>' + formatsUsed + '</b> formats</span><span><b>4</b> subjects</span></div></div>' +
      '<ol class="steps"><li>Filter by grade and subject, then open a room\'s teacher guide.</li><li>Teach the 10-minute mini-lesson and preview it as a student.</li><li>Download the room for Canvas and the exit ticket PDF.</li></ol></section>' +
      '<div class="filters" role="search">' +
      '<div class="fgroup"><span class="flabel">Grade</span>' + chips('grade', [['all', 'All'], ['5', 'Grade 5'], ['6', 'Grade 6']], filters.grade) + '</div>' +
      '<div class="fgroup"><span class="flabel">Subject</span>' + chips('subject', [['all', 'All'], ['science', 'Science', 'science'], ['social', 'Social Studies', 'social'], ['ela', 'ELA', 'ela'], ['math', 'Math', 'math']], filters.subject) + '</div>' +
      '<div class="fgroup"><span class="flabel">Format</span>' + chips('format', [['all', 'All']].concat(Object.keys(FORMATS).map(function (k) { return [k, FORMATS[k].label]; })), filters.format) + '</div>' +
      '<div class="search"><input type="search" id="q" placeholder="Search rooms or standards (e.g. 5.C.4, theme)" value="' + esc(filters.q) + '" aria-label="Search rooms"></div>' +
      '</div><div class="results" id="results">';
    if (!groups.length) {
      html += '<div class="empty">' + (filters.picksOnly && !picks.length ? 'You have no picks yet. Tap the star on any room to save it here.' : 'No rooms match these filters. Try clearing the search or choosing "All".') + '</div>';
    }
    groups.forEach(function (g) {
      html += '<section class="subj-' + g.s.subject + '"><div class="std-head"><span class="std-code" style="background:var(--' + g.s.subject + ')">' + esc(g.s.code) + '</span><h2>Grade ' + g.s.grade + ' ' + esc(SUBJECTS[g.s.subject]) + ': ' + esc(g.s.title) + '</h2><p>' + esc(g.s.text) + '</p></div>' +
        '<div class="cards">' + g.rooms.map(card).join('') + '</div></section>';
    });
    html += '</div></div>';
    $('#main').innerHTML = html;
    document.title = 'Crossroads Escapes';
  }

  function renderRoom(r) {
    setNav('');
    var s = STD[r.std], L = s.lesson, code = finalCode(r), on = picks.indexOf(r.id) >= 0;
    var embed = playURL(r);
    var html = '<div class="subj-' + r.subject + '"><div class="wrap">' +
      '<div class="crumbs"><a href="#">← All rooms</a></div>' +
      '<header class="room-head"><div class="room-head-grid"><div class="room-head-text"><div class="kick"><span>Grade ' + r.grade + '</span><span>' + esc(SUBJECTS[r.subject]) + '</span><span>' + esc(r.formatLabel) + '</span></div>' +
      '<h1>' + esc(r.title) + '</h1><p class="tag">' + esc(r.tagline) + '</p>' +
      '<div class="std-box"><span class="std-code" style="background:var(--' + r.subject + ')">' + esc(s.code) + '</span><p><b>' + esc(s.title) + '.</b> ' + esc(s.text) + '</p></div></div>' + coverHTML(r, true) + '</div></header>' +
      '<div class="actions"><a class="btn primary" href="#play-' + r.id + '">' + ICONS.play + 'View as student</a>' +
      '<button class="btn" data-do="html">' + ICONS.down + 'Download for Canvas (.html)</button>' +
      '<button class="btn" data-do="copy">' + ICONS.copy + 'Copy HTML</button>' +
      '<a class="btn" href="#teach-' + r.id + '">' + ICONS.play + 'Lesson presenter</a>' +
      '<button class="btn" data-do="script">' + ICONS.down + 'Presenter script PDF</button>' +
      '<button class="btn" data-do="guide">' + ICONS.down + '60-min facilitation guide PDF</button>' +
      '<button class="btn" data-do="exit">' + ICONS.down + 'Exit ticket PDF</button>' +
      (isGallery(r) ? '<button class="btn" data-do="posters">' + ICONS.play + 'Gallery walk posters</button>' : '') +
      '<button class="btn star' + (on ? ' on' : '') + '" data-pick="' + r.id + '" aria-pressed="' + on + '">' + (on ? ICONS.star : ICONS.starOff) + (on ? 'In My Picks' : 'Add to My Picks') + '</button></div>' +
      '<textarea class="code" id="copybox" hidden readonly aria-label="Room HTML"></textarea>' +
      '<div class="layout"><nav class="toc" aria-label="On this page"><a href="#s-glance" data-jump>60-minute plan</a><a href="#s-warm" data-jump>1. Warm-up</a><a href="#s-lesson" data-jump>2. Mini-lesson</a><a href="#s-run" data-jump>3. Activity</a><a href="#s-game" data-jump>Levels &amp; supports</a><a href="#s-debrief" data-jump>4. Debrief</a><a href="#s-key" data-jump>Answer key</a><a href="#s-exit" data-jump>5. Exit ticket</a><a href="#s-res" data-jump>Teacher resources</a><a href="#s-canvas" data-jump>Add to Canvas</a></nav><div>';

    // At a glance
    html += '<section class="sec" id="s-glance"><h2>At a glance</h2><dl class="glance">' +
      '<div><dt>Format</dt><dd>' + esc(r.formatLabel) + '</dd></div><div><dt>Student time</dt><dd>' + esc(r.minutes) + ' minutes</dd></div>' +
      '<div><dt>Structure</dt><dd>' + r.stages.length + ' ' + FORMATS[r.format].node.toLowerCase() + 's · ' + puzzleCount(r) + ' puzzles</dd></div><div><dt>Prep</dt><dd>None. Devices only.</dd></div>' +
      '<div><dt>Final code</dt><dd class="codebig">' + esc(code) + '</dd></div><div><dt>Theme</dt><dd>' + esc(themeOf(r).name) + '</dd></div><div><dt>Hands-on pieces</dt><dd>' + interactiveCount(r) + ' interactive items</dd></div><div><dt>Grouping</dt><dd>Solo or pairs</dd></div><div><dt>Standard</dt><dd>' + esc(s.code) + '</dd></div></dl>' + handsOnList(r) +
      '<p><b>Learning target:</b> ' + esc(L.target) + '</p>' +
      planTable(r) + '</section>';

    // Warm-up and mini-lesson
    html += warmSection(r) + lessonSection(r, L);

    // Running
    html += '<section class="sec" id="s-run"><h2><span class="step">3</span>' + esc(r.formatLabel) + ' <span class="when">0:20–0:48 · 28 min</span></h2><h3>Launch</h3><p>' +
      'Project the start screen and read the story aloud. Students type their name, which appears on their completion certificate. Progress saves automatically in the browser, so a student who closes the tab can pick up where they left off on the same device.</p>' +
      '<h3>Tips for this ' + esc(r.formatLabel.toLowerCase()) + '</h3><ul>' + runTips(r).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<h3>Differentiation</h3><ul>' + DIFFERENTIATION.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></section>';
    html += gameSection(r);
    html += '<section class="sec" id="s-debrief"><h2><span class="step">4</span>Debrief <span class="when">0:48–0:52 · 4 min</span></h2><ol>' + L.debrief.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol>' +
      (lessonOf(r) ? '<div class="callout"><b>Close the loop:</b> return to warm-up question 3. ' + esc(lessonOf(r).warmup[2][1]) + '</div>' : '') + '</section>';

    // Key
    html += '<section class="sec" id="s-key"><h2>Answer key</h2><p class="lede">Open a ' + FORMATS[r.format].node.toLowerCase() + ' to see its answers. The final code is <span class="codebig">' + esc(code) + '</span>.</p>' +
      r.stages.map(function (st, i) {
        return '<details class="key"><summary>' + esc(nodeLabel(r, i)) + ': ' + esc(cleanTitle(st.title)) + '<span class="pc">code piece ' + esc(code[i]) + '</span></summary><ol>' +
          st.puzzles.map(function (p) { return '<li>' + p.q + '<br><span class="ans">' + esc(answerText(p)) + '</span></li>'; }).join('') + '</ol></details>';
      }).join('') + '</section>';

    // Exit ticket
    html += exitSection(r);

    // Resources
    html += '<section class="sec" id="s-res"><h2>Teacher resources</h2><h3>Made for this lesson</h3><p class="lede">Each resource matches a part of the 60-minute plan, in order.</p><div class="made">' +
      [['1', 'Warm-up worksheet', 'Printable warm-up with notebook expectations. Page 2 is the key.', '<button class="btn" data-do="warm">' + ICONS.down + 'PDF</button>'],
       ['1–5', 'Lesson presenter', 'Project the whole hour: target and agenda, warm-up with timer, 4 teaching steps with tools, turn and talk, and checks for understanding, I do / we do / you do, a work-time screen, debrief, and exit ticket.', '<a class="btn primary" href="#teach-' + r.id + '">' + ICONS.play + 'Open</a>'],
       ['1–5', 'Presenter script', 'What to say on every slide: directions, questions, answers, and what to do if students struggle. Slides show only student cues.', '<button class="btn" data-do="script">' + ICONS.down + 'PDF</button>'],
       ['2', 'Guided notes', 'Fill-in notes, vocabulary, and "try it" problems that follow the presenter step by step.', '<button class="btn" data-do="notes">' + ICONS.down + 'Student</button><button class="btn" data-do="noteskey">' + ICONS.down + 'Key</button>'],
       ['3', esc(r.title), 'The ' + esc(r.formatLabel.toLowerCase()) + ' for Canvas, with levels, supports, and a turn-in.', '<button class="btn" data-do="html">' + ICONS.down + '.html</button>'],
].concat(isGallery(r) ? [['3', 'Gallery walk posters', 'One printable poster per exhibit (picture, numbered details, placard) plus setup directions for a classroom gallery walk.', '<button class="btn" data-do="posters">' + ICONS.play + 'Open posters</button>'], ['3', 'Gallery walk viewing guide', 'Student recording sheet: I see / I think / I wonder for every exhibit.', '<button class="btn" data-do="gguide">' + ICONS.down + 'PDF</button>']] : []).concat([
       ['5', 'Exit ticket', 'Evidence-based exit ticket with rubric and mastery sorting guide.', '<button class="btn" data-do="exit">' + ICONS.down + 'PDF</button>'],
       ['All', '60-minute facilitation guide', 'Everything above in one printable teacher guide.', '<button class="btn" data-do="guide">' + ICONS.down + 'PDF</button>']]).map(function (x) {
        return '<div class="made-row"><span class="step">' + x[0] + '</span><div><b>' + x[1] + '</b><span>' + x[2] + '</span></div><div class="made-act">' + x[3] + '</div></div>';
      }).join('') + '</div>' +
      '<h3>Extra resources for reteaching or extending</h3><div class="res">' +
      s.resources.concat(r.resources || []).map(function (x) {
        return '<a href="' + esc(x.url) + '" target="_blank" rel="noopener"><small>' + esc(x.type || 'Resource') + '</small><b>' + esc(x.name) + '</b><span>' + esc(x.note) + '</span></a>';
      }).join('') + '</div></section>';

    // Canvas
    html += '<section class="sec" id="s-canvas"><h2>Add to Canvas</h2>' +
      '<div class="method"><h3>Option 1: Upload the file <span class="badge rec">Recommended</span></h3><ol>' +
      '<li>Click <b>Download for Canvas (.html)</b>. You get one file with everything inside it.</li>' +
      '<li>In your Canvas course, go to <b>Files</b> and upload it.</li>' +
      '<li>Create an <b>Assignment</b> (or a Page or Module item). In the editor, choose <b>Insert → Document → Course Documents</b> and pick the file. Students click the link to open the room in a new tab.</li>' +
      '<li>Set the submission type to <b>Text Entry</b>. Students tap <b>Copy my work</b> on the final screen and paste the block (name, level, completion code, stats, and any written evidence).</li></ol>' +
      '<p class="lede">Canvas\'s page editor removes scripts, so pasting the HTML code into a Canvas page will not work. Uploading the file does.</p></div>' +
      '<div class="method"><h3>Option 2: Embed it in a page <span class="badge">Needs a hosted site</span></h3>' +
      (embed ? '<p>This site is online, so you can embed the room right inside a Canvas Page. In the Rich Content Editor, click the <b>&lt;/&gt;</b> HTML view and paste:</p><textarea class="code" readonly id="embedcode">&lt;iframe src="' + esc(embed) + '" width="100%" height="820" style="border:0" title="' + esc(r.title) + '" allowfullscreen&gt;&lt;/iframe&gt;</textarea><div><button class="btn" data-do="embed">' + ICONS.copy + 'Copy embed code</button></div>'
        : '<p>Once this site is published online (for example with GitHub Pages), an embed code for a Canvas Page appears here. Opened from a file on your computer, use Option 1.</p>') + '</div>' +
      '<div class="method"><h3>Option 3: Copy the HTML <span class="badge">Other platforms</span></h3><p><b>Copy HTML</b> puts the complete room on your clipboard. Paste it into a new file saved as <code>.html</code>, or into any platform that accepts full HTML (Google Sites embed code, a school website, and similar).</p></div>' +
      '<div class="method"><h3>Check a completion code</h3><p>Each student\'s code depends on the name they typed, so a code cannot be copied from a classmate with a different name. Type a student\'s name to see the code they should have.</p>' +
      '<div class="verify"><input type="text" id="vname" placeholder="Student name as typed" aria-label="Student name"><output id="vout" aria-live="polite"></output></div></div></section>';

    html += '</div></div></div></div>';
    $('#main').innerHTML = html;
    document.title = r.title + ' · Crossroads Escapes';
    window.scrollTo(0, 0);

    var vn = $('#vname');
    vn.addEventListener('input', function () { $('#vout').textContent = vn.value.trim() ? EscapePlayer(null, r, { computeCode: vn.value }) : ''; });
  }

  var overlay = null;
  function lessonOf(r) { return (window.CX_LESSONS || {})[r.std]; }
  function lessonRoom(r) {
    var X = lessonOf(r), s = STD[r.std];
    return {
      id: 'lesson-' + r.std, title: s.title, grade: r.grade, subject: r.subject, standard: s.code, format: 'escape', game: 'locks',
      theme: r.theme, vocab: s.lesson.vocab, story: '', finale: '', wrapUp: 'Students should have their guided notes filled in. Launch ' + r.title + ' next.',
      stages: X.steps.map(function (st, i) {
        var tool = st.tool && !st.tool.sim ? st.tool : null;
        return {
          title: st.t,
          content: '<p class="ep-say"><b>Teach:</b> ' + esc(st.say) + '</p><p class="ep-notebox"><b>Students:</b> ' + esc(st.do) + '<br><b>Guided notes:</b> ' + esc(st.note.replace(/\[([^\]]+)\]/g, '____')) + '</p>',
          visual: tool, sim: st.tool && st.tool.sim ? st.tool.sim : null, cards: st.cards, puzzles: [st.check]
        };
      })
    };
  }
  var FRAME_SHORT = { CER: 'claim-evidence-reasoning', RACE: 'RACE', SOURCE: 'claim, evidence, and a source check', MATH: 'solve-show-explain' };
  function presenterData(r) {
    var X = lessonOf(r), s = STD[r.std], wt = writeTask(r);
    return {
      title: s.title, code: s.code, grade: r.grade, subject: r.subject, theme: r.theme, lesson: s.lesson, X: X, hook: r.hook || s.lesson.hook,
      frame: X.exit ? FRAME_SHORT[X.exit.frame] : 'evidence',
      room: { title: r.title, formatLabel: r.formatLabel, node: FORMATS[r.format].node, task: wt ? (FRAME_INFO[wt.frame] || [wt.frame])[0] : '' }
    };
  }
  function openPresenter(r) {
    closePlayer();
    overlay = document.createElement('div');
    overlay.className = 'cx-play cx-present';
    overlay.innerHTML = '<div id="cx-mount"></div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    LessonPresenter(overlay.querySelector('#cx-mount'), presenterData(r), { onExit: function () { location.hash = 'room-' + r.id; } });
  }
  function openPlayer(r) {
    closePlayer();
    overlay = document.createElement('div');
    overlay.className = 'cx-play';
    overlay.innerHTML = '<div class="cx-play-scroll"><div id="cx-mount"></div></div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    EscapePlayer(overlay.querySelector('#cx-mount'), studentRoom(r), {
      preview: true,
      onExit: function () { location.hash = 'room-' + r.id; }
    });
  }
  function closePlayer() {
    if (overlay) { overlay.remove(); overlay = null; document.body.style.overflow = ''; }
  }

  function renderHelp() {
    setNav('help');
    $('#main').innerHTML = '<div class="wrap"><div class="help">' +
      '<h1>Using Crossroads Escapes with Canvas</h1>' +
      '<p class="lede">Each room is a single web page. Students need a Chromebook, laptop, or tablet and a browser. Nothing to print.</p>' +
      '<div class="method"><h3>Before class</h3><ol><li>Open a room\'s teacher guide and read the mini-lesson.</li><li>Click <b>View as student</b> to try it. Teacher preview adds a "show answer" button on each puzzle so you can move quickly.</li><li>Download the exit ticket PDF (page 2 is the answer key).</li></ol></div>' +
      '<div class="method"><h3>Put it in Canvas</h3><ol><li>Click <b>Download for Canvas (.html)</b> on the room page.</li><li>Canvas → Files → Upload.</li><li>New Assignment → in the editor, Insert → Document → Course Documents → choose the file.</li><li>Submission type: Text Entry (students paste their completion code).</li></ol><p class="lede">If your district blocks HTML files in Canvas Files, host this site with GitHub Pages and use the embed code on each room page instead.</p></div>' +
      '<div class="method"><h3>Grading</h3><p>Students finish with a certificate showing time, first-try accuracy, hints used, and a completion code. Codes are tied to the student\'s name. Use "Check a completion code" at the bottom of any room page to confirm a code.</p></div>' +
      '<div class="method"><h3>About the standards</h3><p>Rooms are grouped by Indiana Academic Standards for grades 5 and 6 that are commonly treated as power (priority) standards: the ones that carry the most weight on ILEARN and in the next grade. Codes follow the Indiana Academic Standards documents. Your district\'s priority list may differ slightly, so confirm against the current IDOE framework.</p></div>' +
      '<div class="method"><h3>Privacy</h3><p>Nothing is sent anywhere. Progress and names stay in the student\'s own browser.</p></div>' +
      '</div></div>';
    document.title = 'Canvas help · Crossroads Escapes';
  }

  /* ---------- routing ---------- */
  var lastRoute = null;
  function route() {
    var h = location.hash.replace(/^#/, '');
    var m;
    if ((m = h.match(/^teach-(.+)$/)) && BY_ID[m[1]] && lessonOf(BY_ID[m[1]])) {
      if (!lastRoute || !/^room-|^$/.test(lastRoute)) renderRoom(BY_ID[m[1]]);
      openPresenter(BY_ID[m[1]]);
      lastRoute = h; return;
    }
    if ((m = h.match(/^play-(.+)$/)) && BY_ID[m[1]]) {
      if (!lastRoute || !/^room-|^$/.test(lastRoute)) renderRoom(BY_ID[m[1]]);
      openPlayer(BY_ID[m[1]]);
      lastRoute = h; return;
    }
    closePlayer();
    if ((m = h.match(/^room-(.+)$/)) && BY_ID[m[1]]) renderRoom(BY_ID[m[1]]);
    else if (h === 'help') renderHelp();
    else if (h === 'picks') { filters.picksOnly = true; renderCatalog(); }
    else { if (h === '' || h === 'catalog') filters.picksOnly = false; renderCatalog(); }
    lastRoute = h;
  }
  window.addEventListener('hashchange', route);

  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-filter]'))) {
      filters[t.getAttribute('data-filter')] = t.getAttribute('data-val');
      store('filters', filters); renderCatalog(); return;
    }
    if ((t = e.target.closest('[data-pick]'))) {
      var id = t.getAttribute('data-pick'), i = picks.indexOf(id);
      if (i >= 0) picks.splice(i, 1); else picks.push(id);
      store('picks', picks);
      toast(i >= 0 ? 'Removed from My Picks' : 'Saved to My Picks');
      if (location.hash.indexOf('#room-') === 0) renderRoomKeepScroll(BY_ID[id]); else renderCatalog();
      return;
    }
    if ((t = e.target.closest('[data-jump]'))) {
      e.preventDefault();
      var target = document.querySelector(t.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if ((t = e.target.closest('[data-do]'))) {
      var m = location.hash.match(/^#room-(.+)$/), r = m && BY_ID[m[1]];
      if (!r) return;
      var act = t.getAttribute('data-do');
      if (act === 'html') { download(slug(r) + '.html', standaloneHTML(r), 'text/html'); toast('Downloaded. Upload this file to Canvas Files.'); }
      else if (act === 'copy') copyText(standaloneHTML(r), 'HTML copied. Paste it into a new .html file.', $('#copybox'));
      else if (act === 'exit') { download(slug(r) + '-exit-ticket.pdf', CrossroadsPDF.exitTicket(r, STD[r.std], lessonOf(r)), 'application/pdf'); toast('Exit ticket PDF downloaded.'); }
      else if (act === 'posters') { var html = posterHTML(r), w = null; try { w = window.open(URL.createObjectURL(new Blob([html], { type: 'text/html' })), '_blank'); } catch (e) { } if (!w) download(slug(r) + '-gallery-posters.html', html, 'text/html'); toast(w ? 'Posters opened in a new tab. Use Print posters.' : 'Posters downloaded. Open the file and print.'); }
      else if (act === 'script') { var wt = writeTask(r); download(slug(r) + '-presenter-script.pdf', CrossroadsPDF.script(r, STD[r.std], lessonOf(r), wt ? (FRAME_INFO[wt.frame] || [wt.frame])[0] : ''), 'application/pdf'); toast('Presenter script downloaded.'); }
      else if (act === 'gguide') { download(slug(r) + '-gallery-viewing-guide.pdf', CrossroadsPDF.galleryGuide(r, STD[r.std]), 'application/pdf'); toast('Viewing guide downloaded.'); }
      else if (act === 'warm') { download(slug(r) + '-warm-up.pdf', CrossroadsPDF.warmup(r, STD[r.std], lessonOf(r)), 'application/pdf'); toast('Warm-up worksheet downloaded.'); }
      else if (act === 'notes') { download(slug(r) + '-guided-notes.pdf', CrossroadsPDF.notes(r, STD[r.std], lessonOf(r), false), 'application/pdf'); toast('Guided notes downloaded.'); }
      else if (act === 'noteskey') { download(slug(r) + '-guided-notes-key.pdf', CrossroadsPDF.notes(r, STD[r.std], lessonOf(r), true), 'application/pdf'); toast('Guided notes key downloaded.'); }
      else if (act === 'guide') {
        var gr = Object.assign({}, r, { runTips: runTips(r), finalCode: finalCode(r) });
        download(slug(r) + '-facilitation-guide.pdf', CrossroadsPDF.guide(gr, STD[r.std], answerLines(r), lessonOf(r)), 'application/pdf'); toast('Facilitation guide PDF downloaded.');
      }
      else if (act === 'embed') copyText($('#embedcode').value, 'Embed code copied.', $('#embedcode'));
    }
  });
  function renderRoomKeepScroll(r) { var y = window.scrollY; renderRoom(r); window.scrollTo(0, y); }
  document.addEventListener('input', function (e) {
    if (e.target.id === 'q') {
      filters.q = e.target.value; store('filters', filters);
      var pos = e.target.selectionStart;
      renderCatalog();
      var q = $('#q'); q.focus(); try { q.setSelectionRange(pos, pos); } catch (er) {}
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay) { var m = location.hash.match(/^#(?:play|teach)-(.+)$/); if (m) location.hash = 'room-' + m[1]; }
  });

  function measureTop() { var t = document.querySelector('.top'); if (t) document.documentElement.style.setProperty('--toph', t.offsetHeight + 'px'); }
  window.addEventListener('resize', measureTop); measureTop();

  window.CX = { posterHTML: posterHTML, presenterData: presenterData, ROOMS: ROOMS, STD: STD, standaloneHTML: standaloneHTML, answerLines: answerLines, finalCode: finalCode, runTips: runTips };
  route();
})();
