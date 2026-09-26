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
    return '';
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
      finalTitle: r.finalTitle, finalPrompt: r.finalPrompt, hubTitle: r.hubTitle, theme: r.theme, startHead: r.startHead
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
  var TYPE_NAMES = { sort: 'drag-and-drop sort', order: 'drag-to-order', match: 'tap-to-connect matching', numberline: 'number line', plot: 'coordinate plotting', highlight: 'tap-the-evidence passage', shade: 'shade-the-model', build: 'prism builder', coins: 'money tray', assemble: 'tile builder', maya: 'Maya numeral builder', balance: 'balance-scale equation', tap: 'tap-the-diagram', frac: 'fraction entry' };
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
      '<button class="btn" data-do="exit">' + ICONS.down + 'Exit ticket PDF</button>' +
      '<button class="btn" data-do="guide">' + ICONS.down + 'Facilitation guide PDF</button>' +
      '<button class="btn star' + (on ? ' on' : '') + '" data-pick="' + r.id + '" aria-pressed="' + on + '">' + (on ? ICONS.star : ICONS.starOff) + (on ? 'In My Picks' : 'Add to My Picks') + '</button></div>' +
      '<textarea class="code" id="copybox" hidden readonly aria-label="Room HTML"></textarea>' +
      '<div class="layout"><nav class="toc" aria-label="On this page"><a href="#s-glance" data-jump>At a glance</a><a href="#s-lesson" data-jump>Mini-lesson</a><a href="#s-run" data-jump>Running the activity</a><a href="#s-key" data-jump>Answer key</a><a href="#s-exit" data-jump>Exit ticket</a><a href="#s-res" data-jump>Teacher resources</a><a href="#s-canvas" data-jump>Add to Canvas</a></nav><div>';

    // At a glance
    html += '<section class="sec" id="s-glance"><h2>At a glance</h2><dl class="glance">' +
      '<div><dt>Format</dt><dd>' + esc(r.formatLabel) + '</dd></div><div><dt>Student time</dt><dd>' + esc(r.minutes) + ' minutes</dd></div>' +
      '<div><dt>Structure</dt><dd>' + r.stages.length + ' ' + FORMATS[r.format].node.toLowerCase() + 's · ' + puzzleCount(r) + ' puzzles</dd></div><div><dt>Prep</dt><dd>None. Devices only.</dd></div>' +
      '<div><dt>Final code</dt><dd class="codebig">' + esc(code) + '</dd></div><div><dt>Theme</dt><dd>' + esc(themeOf(r).name) + '</dd></div><div><dt>Hands-on pieces</dt><dd>' + interactiveCount(r) + ' interactive items</dd></div><div><dt>Grouping</dt><dd>Solo or pairs</dd></div><div><dt>Standard</dt><dd>' + esc(s.code) + '</dd></div></dl>' + handsOnList(r) +
      '<p><b>Learning target:</b> ' + esc(L.target) + '</p>' +
      '<div class="timeline">' +
      '<div><span class="when">0:00–0:12</span><h3>Mini-lesson</h3><p>Hook, teach, model, and a quick check (below).</p></div>' +
      '<div><span class="when">0:12–0:42</span><h3>' + esc(r.formatLabel) + '</h3><p>Students play ' + esc(r.title) + ' and earn a completion code.</p></div>' +
      '<div><span class="when">0:42–0:50</span><h3>Debrief and exit ticket</h3><p>Discuss 2 debrief questions, then students complete the exit ticket.</p></div></div></section>';

    // Lesson
    html += '<section class="sec" id="s-lesson"><h2>Mini-lesson: teach this first</h2><p class="lede">About 10–12 minutes. Project this page or the guide PDF. No materials needed beyond your board.</p>' +
      '<h3>Key vocabulary</h3><div class="vocab">' + L.vocab.map(function (v) { return '<div><b>' + esc(v[0]) + '</b>' + esc(v[1]) + '</div>'; }).join('') + '</div>' +
      '<div class="timeline">' +
      '<div><span class="when">2 min</span><h3>Hook</h3><p>' + esc(r.hook || L.hook) + '</p></div>' +
      '<div><span class="when">5 min</span><h3>Teach</h3><ul>' + L.teach.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
      '<div><span class="when">3 min</span><h3>Model it</h3><p>' + esc(L.model) + '</p></div>' +
      '<div><span class="when">2 min</span><h3>Check for understanding</h3><p>' + esc(L.check) + '</p></div></div>' +
      '<div class="callout warn"><h3 style="margin:0">Watch for these misconceptions</h3><ul>' + L.misconceptions.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></section>';

    // Running
    html += '<section class="sec" id="s-run"><h2>Running the activity</h2><h3>Launch</h3><p>' +
      'Project the start screen and read the story aloud. Students type their name, which appears on their completion certificate. Progress saves automatically in the browser, so a student who closes the tab can pick up where they left off on the same device.</p>' +
      '<h3>Tips for this ' + esc(r.formatLabel.toLowerCase()) + '</h3><ul>' + runTips(r).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<h3>Differentiation</h3><ul>' + DIFFERENTIATION.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<h3>Debrief questions</h3><ol>' + L.debrief.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></section>';

    // Key
    html += '<section class="sec" id="s-key"><h2>Answer key</h2><p class="lede">Open a ' + FORMATS[r.format].node.toLowerCase() + ' to see its answers. The final code is <span class="codebig">' + esc(code) + '</span>.</p>' +
      r.stages.map(function (st, i) {
        return '<details class="key"><summary>' + esc(nodeLabel(r, i)) + ': ' + esc(cleanTitle(st.title)) + '<span class="pc">code piece ' + esc(code[i]) + '</span></summary><ol>' +
          st.puzzles.map(function (p) { return '<li>' + p.q + '<br><span class="ans">' + esc(answerText(p)) + '</span></li>'; }).join('') + '</ol></details>';
      }).join('') + '</section>';

    // Exit ticket
    html += '<section class="sec" id="s-exit"><h2>Exit ticket</h2><p class="lede">A one-page PDF with name and date lines, ' + r.exit.length + ' questions, and a confidence scale. Page 2 is your answer key.</p>' +
      '<div class="ticket"><ol>' + r.exit.map(function (q) {
        return '<li><b>' + esc(q.q) + '</b>' + (q.choices ? '<ol class="ch">' + q.choices.map(function (c, k) { return '<li' + (k === q.answer ? ' class="ans"' : '') + '>' + esc(c) + '</li>'; }).join('') + '</ol>' : '<br><span class="ans">Look for: ' + esc(q.answer) + '</span>') + '</li>';
      }).join('') + '</ol></div><div><button class="btn primary" data-do="exit">' + ICONS.down + 'Download exit ticket PDF</button></div></section>';

    // Resources
    html += '<section class="sec" id="s-res"><h2>Teacher resources</h2><p class="lede">Free resources for reteaching or extending ' + esc(s.code) + '. Links open in a new tab.</p><div class="res">' +
      s.resources.concat(r.resources || []).map(function (x) {
        return '<a href="' + esc(x.url) + '" target="_blank" rel="noopener"><small>' + esc(x.type || 'Resource') + '</small><b>' + esc(x.name) + '</b><span>' + esc(x.note) + '</span></a>';
      }).join('') + '</div></section>';

    // Canvas
    html += '<section class="sec" id="s-canvas"><h2>Add to Canvas</h2>' +
      '<div class="method"><h3>Option 1: Upload the file <span class="badge rec">Recommended</span></h3><ol>' +
      '<li>Click <b>Download for Canvas (.html)</b>. You get one file with everything inside it.</li>' +
      '<li>In your Canvas course, go to <b>Files</b> and upload it.</li>' +
      '<li>Create an <b>Assignment</b> (or a Page or Module item). In the editor, choose <b>Insert → Document → Course Documents</b> and pick the file. Students click the link to open the room in a new tab.</li>' +
      '<li>Set the submission type to <b>Text Entry</b> and ask students to paste their completion code, or <b>File Upload</b> for a screenshot of their certificate.</li></ol>' +
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
      else if (act === 'exit') { download(slug(r) + '-exit-ticket.pdf', CrossroadsPDF.exitTicket(r, STD[r.std]), 'application/pdf'); toast('Exit ticket PDF downloaded.'); }
      else if (act === 'guide') {
        var gr = Object.assign({}, r, { runTips: runTips(r), finalCode: finalCode(r) });
        download(slug(r) + '-facilitation-guide.pdf', CrossroadsPDF.guide(gr, STD[r.std], answerLines(r)), 'application/pdf'); toast('Facilitation guide PDF downloaded.');
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
    if (e.key === 'Escape' && overlay) { var m = location.hash.match(/^#play-(.+)$/); if (m) location.hash = 'room-' + m[1]; }
  });

  function measureTop() { var t = document.querySelector('.top'); if (t) document.documentElement.style.setProperty('--toph', t.offsetHeight + 'px'); }
  window.addEventListener('resize', measureTop); measureTop();

  window.CX = { ROOMS: ROOMS, STD: STD, standaloneHTML: standaloneHTML, answerLines: answerLines, finalCode: finalCode, runTips: runTips };
  route();
})();
