/*
 * Crossroads Escapes: student game engine (v2).
 *
 * EscapePlayer(mount, room, options) plays one room. Its source, together with
 * EscapeThemes() and EscapeKit(), is copied into each exported room file, so it
 * must not depend on anything outside those three functions.
 *
 *   options.preview      teacher preview: no saved progress, "Teacher: show answer" buttons
 *   options.onExit       callback for the Exit preview button
 *   options.computeCode  a student name: returns that student's completion code
 *   options.themeInfo    true: returns the room's theme (for the teacher site)
 *   options.selfTest     true: runs every puzzle's answer key through its checker, returns problems
 */
function EscapePlayer(mount, room, opts) {
  opts = opts || {};

  /* ---------- helpers ---------- */
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function completionCode(name) {
    var clean = String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    var n = hash(clean + '|' + room.id).toString(36).toUpperCase();
    while (n.length < 6) n = '0' + n;
    return room.id.split('-').slice(0, 2).join('').toUpperCase() + '-' + n.slice(0, 6);
  }
  if (opts.computeCode != null) return completionCode(opts.computeCode);

  var THEMES = EscapeThemes(), KIT = EscapeKit(), V = KIT.V, SIMS = KIT.SIMS;
  var DEFAULT_THEME = { science: 'lab', social: 'parchment', ela: 'library', math: 'vault' };
  var themeId = THEMES[room.theme] ? room.theme : (DEFAULT_THEME[room.subject] || 'pizzeria');
  var TH = THEMES[themeId];
  if (opts.themeInfo) return { id: themeId, name: TH.name, font: TH.font, gf: TH.gf, v: TH.v, emblem: TH.emblem };

  function rng(seed) { var a = hash(String(seed)); return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffled(list, seed) {
    var r = rng(seed), out = list.slice();
    for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
    if (out.length > 1 && out.every(function (v, i) { return v === list[i]; })) out.push(out.shift());
    return out;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function strip(s) { return String(s).replace(/<[^>]+>/g, ''); }
  function norm(s) { return String(s).toLowerCase().replace(/[−–]/g, '-').replace(/[\s,$%°]/g, '').replace(/[’‘]/g, "'").replace(/\.$/, ''); }
  function toNum(s) {
    s = String(s).replace(/[−–]/g, '-').replace(/[,$%°]/g, '').trim();
    var m = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/); if (m) return (Number(m[1]) < 0 ? -1 : 1) * (Math.abs(Number(m[1])) + Number(m[2]) / Number(m[3]));
    m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/); if (m) return Number(m[1]) / Number(m[2]);
    s = s.replace(/\s/g, '');
    return s !== '' && !isNaN(Number(s)) ? Number(s) : null;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function parseFrac(s) {
    s = String(s).trim(); var m = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
    if (m) return [Number(m[1]) * Number(m[3]) + Number(m[2]), Number(m[3])];
    m = s.match(/^(-?\d+)\/(\d+)$/); if (m) return [Number(m[1]), Number(m[2])];
    var v = toNum(s); if (v == null) return null;
    var d = 1; while (Math.abs(v * d - Math.round(v * d)) > 1e-9 && d < 10000) d *= 10;
    return [Math.round(v * d), d];
  }
  function fmtTime(sec) { sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  var isMath = room.subject === 'math';
  function fx(html) {
    if (!isMath || html == null) return html;
    return String(html).split(/(<[^>]+>)/).map(function (part) {
      if (part.charAt(0) === '<') return part;
      return part.replace(/(^|[^\d.\/])(\d{1,3})\/(\d{1,3})(?![\d\/])/g, function (_, pre, n, d) { return pre + '<span class="ep-fx"><span>' + n + '</span><span>' + d + '</span></span>'; });
    }).join('');
  }

  var FORMATS = {
    escape: { label: 'Escape Room', node: 'Lock', verb: 'Unlock', map: 'The locked rooms', intro: 'Crack every lock to collect the pieces of the final code.', ordered: true, done: 'Unlocked!' },
    gallery: { label: 'Gallery Walk', node: 'Exhibit', verb: 'Visit', map: 'The gallery', intro: 'Visit the exhibits in any order. Each one hides a piece of the final code.', ordered: false, done: 'Exhibit complete!' },
    fieldtrip: { label: 'Virtual Field Trip', node: 'Stop', verb: 'Explore', map: 'Your route', intro: 'Complete each stop on the route to earn a passport stamp and a code piece.', ordered: true, done: 'Stamp earned!' },
    mystery: { label: 'Mystery Case', node: 'Evidence File', verb: 'Examine', map: 'The case board', intro: 'Examine the evidence files in any order. Each solved file reveals part of the final code.', ordered: false, done: 'File solved!' },
    quest: { label: 'Quest', node: 'Level', verb: 'Play', map: 'The quest map', intro: 'Clear each level to power up and collect a code piece.', ordered: true, done: 'Level cleared!' }
  };
  var fmt = FORMATS[room.format] || FORMATS.escape;
  var LETTERS = 'ABCDEFGHIJKLMNOP';
  function nodeName(i) { return fmt.node + ' ' + (room.format === 'gallery' ? LETTERS[i] : room.format === 'mystery' ? '#' + (i + 1) : i + 1); }
  var stages = room.stages;
  function stageTitle(i) { return stages[i].title.replace(/^(Stop|Lock|Level|Evidence File|Door|Container|Panel|Chapter)\s*#?\d+:\s*/i, ''); }
  var code = (room.code && room.code.length === stages.length) ? room.code.toUpperCase().split('') : stages.map(function (_, i) { return String(hash(room.id + ':' + i) % 10); });

  /* ---------- mission levels, game styles, icons ---------- */
  var LEVELS = {
    explorer: { id: 'explorer', name: 'Explorer', tag: 'Extra support', desc: 'Sentence starters are filled in, hints are free, you get unlimited "remove 2" power-ups, and writing tasks are shorter.', removes: 99, hintCost: 0, writeMul: 0.6, prefill: true, hearts: 5, xpMul: 1, calc: true },
    agent: { id: 'agent', name: 'Agent', tag: 'On level', desc: 'The standard mission. You get 3 "remove 2" power-ups, and each hint costs a little XP.', removes: 3, hintCost: 30, writeMul: 1, prefill: false, hearts: 3, xpMul: 1, calc: false },
    legend: { id: 'legend', name: 'Legend', tag: 'Extra challenge', desc: 'No power-ups, hints cost more, and writing tasks need longer answers with TWO pieces of evidence. You earn 1.5× XP.', removes: 0, hintCost: 60, writeMul: 1.4, prefill: false, hearts: 3, xpMul: 1.5, twoEvidence: true, calc: false }
  };
  function curLevel() { return LEVELS[(typeof S !== 'undefined' && S && S.level) || 'agent'] || LEVELS.agent; }
  var GAME = room.game || { quest: 'boss', fieldtrip: 'board', mystery: 'case', gallery: 'museum', escape: 'locks' }[room.format] || 'locks';
  function svgI(d, extra) { return '<svg class="ep-i" viewBox="0 0 24 24" aria-hidden="true"' + (extra || '') + '>' + d + '</svg>'; }
  var ICON = {
    xp: svgI('<path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor"/>'),
    flame: svgI('<path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-5 0-9z" fill="currentColor"/>'),
    heart: svgI('<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" fill="currentColor"/>'),
    star: svgI('<path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z" fill="currentColor"/>'),
    speaker: svgI('<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
    tools: svgI('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="6" r="2.4" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="10" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="18" cy="18" r="2.4" fill="none" stroke="currentColor" stroke-width="2.2"/>'),
    scissors: svgI('<circle cx="6" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 8.5 20 18M8.5 15.5 20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>')
  };
  var canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  function speak(t) {
    if (!canSpeak) return;
    try { window.speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(String(t).replace(/\s+/g, ' ').trim().slice(0, 4000)); u.rate = 0.92; window.speechSynthesis.speak(u); } catch (e) { }
  }
  function hush() { try { if (canSpeak) window.speechSynthesis.cancel(); } catch (e) { } }
  function presetLevel() {
    if (opts.level && LEVELS[opts.level]) return opts.level;
    try { var m = String(location.search + location.hash).match(/level=(explorer|agent|legend)/); return m ? m[1] : null; } catch (e) { return null; }
  }

  /* ---------- puzzle types ---------- */
  var T = {};
  var PAIR_COLORS = ['#1F6FD1', '#E4572E', '#2A9D8F', '#9B6BFF', '#D6A93A', '#C2185B', '#6D4C41'];
  function answerIndex(p) { return p.type === 'tf' ? (p.answer ? 0 : 1) : p.answer; }
  function visualHTML(spec, o) {
    if (!spec) return '';
    var list = Array.isArray(spec) ? spec : [spec];
    if (list.length > 1) return '<div class="ep-visrow">' + list.map(function (s) { return visualHTML(s, o); }).join('') + '</div>';
    return list.map(function (s) {
      if (typeof s === 'string') return '<div class="ep-vis">' + s + '</div>';
      var r = V[s.kind] ? V[s.kind](s, o) : '';
      return '<figure class="ep-vis' + (s.dark ? ' dark' : '') + '">' + r + (s.caption ? '<figcaption>' + fx(esc(s.caption)) + '</figcaption>' : '') + '</figure>';
    }).join('');
  }

  T.mc = {
    html: function (p, w, key) {
      var choices = p.type === 'tf' ? ['True', 'False'] : p.choices;
      var order = p.type === 'tf' ? [0, 1] : (p.keepOrder ? choices.map(function (_, k) { return k; }) : shuffled(choices.map(function (_, k) { return k; }), room.id + key));
      w.crossed = w.crossed || {};
      return '<div class="ep-opts' + (p.type === 'tf' ? ' tf' : '') + (choices.every(function (c) { return strip(c).length < 26; }) && choices.length === 4 ? ' two' : '') + '">' + order.map(function (k) {
        var st = w.solved && k === answerIndex(p) ? ' right' : w.crossed[k] ? ' wrong' : '';
        return '<button type="button" class="ep-opt' + st + '" data-k="' + k + '"' + (w.crossed[k] || w.solved ? ' disabled' : '') + '>' + fx(choices[k]) + '</button>';
      }).join('') + '</div>';
    },
    bind: function (box, p, w, api) {
      box.querySelectorAll('.ep-opt').forEach(function (b) {
        b.onclick = function () {
          if (w.solved || b.disabled) return;
          var k = +b.getAttribute('data-k');
          if (k === answerIndex(p)) { b.classList.add('right'); api.win(); }
          else { w.crossed[k] = true; b.classList.add('wrong'); b.disabled = true; api.miss((p.why && p.why[k]) || null); }
        };
      });
    },
    fill: function (p, w) { w.pick = answerIndex(p); },
    check: function (p, w) { return w.pick === answerIndex(p) ? { ok: true } : { ok: false }; },
    instant: true
  };
  T.tf = T.mc;

  T.input = {
    html: function (p, w, key) {
      return '<div class="ep-answer"><input type="text" class="ep-box wide" id="ep-in-' + key + '" value="' + esc(w.solved ? [].concat(p.answer)[0] : (w.val || '')) + '" placeholder="' + esc(p.placeholder || 'Your answer') + '" autocomplete="off" aria-label="Your answer"' + (w.solved ? ' disabled' : '') + '>' + (p.unit ? '<span class="ep-unit">' + esc(p.unit) + '</span>' : '') + '</div>';
    },
    bind: function (box, p, w, api) { var i = box.querySelector('input'); i.addEventListener('input', function () { w.val = i.value; }); i.addEventListener('keydown', function (e) { if (e.key === 'Enter') api.check(); }); },
    check: function (p, w) {
      var v = w.val || '';
      if (!String(v).trim()) return { warn: 'Type your answer in the box first.' };
      var ok = [].concat(p.answer).some(function (a) { var na = toNum(a), nv = toNum(v); if (na != null && nv != null) return Math.abs(na - nv) < (p.tolerance || 1e-6); return norm(a) === norm(v); });
      if (ok) return { ok: true };
      var key = String(toNum(v) != null ? toNum(v) : norm(v));
      return { ok: false, msg: p.why && p.why[key] };
    },
    fill: function (p, w) { w.val = String([].concat(p.answer)[0]); }
  };

  T.frac = {
    html: function (p, w) {
      var d = w.solved && w.solvedParts ? w.solvedParts : w;
      function box(id, v, cls, lbl) { return '<input class="ep-box ' + cls + '" data-f="' + id + '" inputmode="numeric" maxlength="3" value="' + esc(v == null ? '' : v) + '" aria-label="' + lbl + '"' + (w.solved ? ' disabled' : '') + '>'; }
      return '<div class="ep-answer"><div class="ep-fracin"><div>' + box('w', d.w, 'whole', 'Whole number (leave blank if none)') + '<div class="ep-lbl">whole #</div></div><div class="ep-stack">' + box('n', d.n, '', 'Numerator') + '<div class="ep-fbar"></div>' + box('d', d.d, '', 'Denominator') + '</div></div>' +
        '<div class="ep-lbl" style="flex-basis:100%">Leave the whole-number box empty if you don\'t need it.' + (p.simplest !== false ? ' Write fractions in simplest form.' : '') + '</div></div>';
    },
    bind: function (box, p, w, api) {
      box.querySelectorAll('[data-f]').forEach(function (i) {
        i.addEventListener('input', function () { i.value = i.value.replace(/\D/g, ''); w[i.getAttribute('data-f')] = i.value; });
        i.addEventListener('keydown', function (e) { if (e.key === 'Enter') api.check(); });
      });
    },
    check: function (p, w) {
      var wv = String(w.w || '').trim(), nv = String(w.n || '').trim(), dv = String(w.d || '').trim();
      if (wv === '' && nv === '') return { warn: 'Type your answer in the boxes first.' };
      if (nv !== '' && (dv === '' || +dv === 0)) return { warn: 'Your fraction needs a bottom number (denominator).' };
      var W = wv === '' ? 0 : +wv, N = nv === '' ? 0 : +nv, D = dv === '' ? 1 : +dv;
      var top = W * D + N, bot = D, g = gcd(top, bot), ans = parseFrac(p.answer);
      if (top * ans[1] === ans[0] * bot) {
        if (p.simplest !== false && nv !== '' && N > 0 && gcd(N, D) > 1) return { warn: 'That\'s the right amount! Now simplify it. What number divides evenly into both ' + N + ' and ' + D + '?' };
        if (p.simplest !== false && p.mixed !== false && W > 0 && N >= D && nv !== '') return { warn: 'Right amount, but the fraction part is a whole or more. Move the extra wholes into the whole-number box.' };
        w.solvedParts = { w: wv, n: nv, d: dv };
        return { ok: true };
      }
      var k = (top / g) + '/' + (bot / g);
      return { ok: false, msg: p.why && p.why[k] };
    },
    fill: function (p, w) {
      var a = parseFrac(p.answer), g = gcd(a[0], a[1]), n = a[0] / g, d = a[1] / g;
      if (d === 1) { w.w = String(n); w.n = ''; w.d = ''; return; }
      if (p.mixed === false) { w.w = ''; w.n = String(n); w.d = String(d); return; }
      var W = Math.floor(n / d), r = n % d;
      w.w = W ? String(W) : ''; w.n = String(r); w.d = String(d);
    }
  };

  var dragging = false;
  function dragKit(box, sel, onDrop, onTap) {
    box.querySelectorAll(sel).forEach(function (it) {
      it.addEventListener('pointerdown', function (e) {
        if (e.button > 0 || it.disabled) return;
        var sx = e.clientX, sy = e.clientY, ghost = null, moved = false;
        function mv(ev) {
          var dx = ev.clientX - sx, dy = ev.clientY - sy;
          if (!moved && Math.abs(dx) + Math.abs(dy) > 8) { moved = true; dragging = true; ghost = it.cloneNode(true); ghost.classList.add('ep-ghost'); ghost.style.width = it.offsetWidth + 'px'; root.appendChild(ghost); it.classList.add('ep-dragging'); }
          if (moved) { ev.preventDefault(); ghost.style.left = (ev.clientX - it.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - 22) + 'px'; }
        }
        function up(ev) {
          document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
          if (moved) { ghost.remove(); it.classList.remove('ep-dragging'); setTimeout(function () { dragging = false; }, 0); onDrop(it, document.elementFromPoint(ev.clientX, ev.clientY)); }
          else onTap(it);
        }
        document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
      });
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(it); } });
    });
  }

  T.sort = {
    html: function (p, w, key) {
      w.place = w.place || {}; if (w.sel === undefined) w.sel = null;
      var items = shuffled(p.items.map(function (_, k) { return k; }), room.id + key);
      if (w.solved) p.items.forEach(function (it, k) { w.place[k] = it[1]; });
      function chip(k) { return '<span class="ep-chip' + (w.sel === k ? ' sel' : '') + '" data-k="' + k + '" tabindex="0" role="button">' + fx(p.items[k][0]) + '</span>'; }
      var pool = items.filter(function (k) { return w.place[k] == null; });
      return '<div class="ep-tip">Drag each card into a group, or tap a card and then tap a group.</div>' +
        '<div class="ep-pool" data-b="-1">' + (pool.length ? pool.map(chip).join('') : '<span class="ep-tip">All cards placed. Press Check!</span>') + '</div>' +
        '<div class="ep-buckets">' + p.buckets.map(function (b, bi) {
          return '<div class="ep-bucket" data-b="' + bi + '" tabindex="0" role="button" aria-label="Group: ' + esc(strip(b)) + '"><div class="ep-bucket-h">' + fx(b) + '</div><div class="ep-bucket-body">' + items.filter(function (k) { return w.place[k] === bi; }).map(chip).join('') + '</div></div>';
        }).join('') + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      function put(k, b) { if (b < 0) delete w.place[k]; else w.place[k] = b; w.sel = null; api.rerender(); }
      dragKit(box, '.ep-chip', function (it, t) { var b = t && t.closest('[data-b]'); if (b) put(+it.getAttribute('data-k'), +b.getAttribute('data-b')); else api.rerender(); },
        function (it) { var k = +it.getAttribute('data-k'); if (w.place[k] != null && w.sel !== k) { put(k, -1); return; } w.sel = w.sel === k ? null : k; api.rerender(); });
      box.querySelectorAll('.ep-bucket,.ep-pool').forEach(function (b) {
        function go(e) { if (dragging || e.target.closest('.ep-chip')) return; if (w.sel != null) put(w.sel, +b.getAttribute('data-b')); }
        b.addEventListener('click', go); b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
      });
    },
    check: function (p, w) {
      var placed = p.items.filter(function (_, k) { return w.place[k] != null; }).length;
      if (placed < p.items.length) return { warn: 'Place every card first (' + placed + ' of ' + p.items.length + ' placed).' };
      var right = p.items.filter(function (it, k) { return w.place[k] === it[1]; }).length;
      if (right === p.items.length) return { ok: true };
      p.items.forEach(function (it, k) { if (w.place[k] !== it[1]) delete w.place[k]; });
      return { ok: false, msg: right + ' of ' + p.items.length + ' were in the right group. The others went back to the top. Try again!', rerender: true };
    },
    fill: function (p, w) { w.place = {}; p.items.forEach(function (it, k) { w.place[k] = it[1]; }); }
  };

  T.order = {
    html: function (p, w, key) {
      if (!w.ord) w.ord = shuffled(p.items.map(function (_, k) { return k; }), room.id + key);
      var ord = w.solved ? p.items.map(function (_, k) { return k; }) : w.ord;
      return '<div class="ep-tip">' + esc(p.tip || 'Drag the cards into order, first to last, or use the arrows.') + '</div><ol class="ep-order">' + ord.map(function (k, pos) {
        return '<li class="ep-ord" data-pos="' + pos + '"><span class="ep-grip" aria-hidden="true">⋮⋮</span><span class="ep-ordtxt">' + fx(p.items[k]) + '</span>' + (w.solved ? '' :
          '<button type="button" class="ep-arrow" data-mv="-1" data-pos="' + pos + '" aria-label="Move up"' + (pos === 0 ? ' disabled' : '') + '>▲</button><button type="button" class="ep-arrow" data-mv="1" data-pos="' + pos + '" aria-label="Move down"' + (pos === ord.length - 1 ? ' disabled' : '') + '>▼</button>') + '</li>';
      }).join('') + '</ol>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      box.querySelectorAll('[data-mv]').forEach(function (b) { b.onclick = function () { var pos = +b.getAttribute('data-pos'), to = pos + +b.getAttribute('data-mv'); var t = w.ord[pos]; w.ord[pos] = w.ord[to]; w.ord[to] = t; api.rerender(); }; });
      dragKit(box, '.ep-grip', function (it, t) {
        var from = +it.closest('.ep-ord').getAttribute('data-pos'), li = t && t.closest('.ep-ord');
        if (li) { var to = +li.getAttribute('data-pos'); var v = w.ord.splice(from, 1)[0]; w.ord.splice(to, 0, v); }
        api.rerender();
      }, function () { });
    },
    check: function (p, w) {
      var inPlace = w.ord.filter(function (k, pos) { return k === pos; }).length;
      return inPlace === w.ord.length ? { ok: true } : { ok: false, msg: inPlace + ' of ' + w.ord.length + ' are in the right spot. Keep adjusting!' };
    },
    fill: function (p, w) { w.ord = p.items.map(function (_, k) { return k; }); }
  };

  T.match = {
    html: function (p, w, key) {
      w.pairs = w.pairs || {}; if (w.selL === undefined) w.selL = null;
      var rights = shuffled(p.pairs.map(function (_, k) { return k; }), room.id + key + 'r');
      if (w.solved) p.pairs.forEach(function (_, k) { w.pairs[k] = k; });
      var rOwner = {}; Object.keys(w.pairs).forEach(function (l) { rOwner[w.pairs[l]] = +l; });
      var ci = {}; Object.keys(w.pairs).map(Number).sort(function (a, b) { return a - b; }).forEach(function (l, i) { ci[l] = i; });
      return '<div class="ep-tip">Tap an item on the left, then tap its match on the right.</div><div class="ep-matchgrid"><div class="ep-mcol">' + p.pairs.map(function (pr, k) {
        var paired = w.pairs[k] != null, c = paired ? PAIR_COLORS[ci[k] % PAIR_COLORS.length] : '';
        return '<button type="button" class="ep-mitem' + (w.selL === k ? ' sel' : '') + (paired ? ' paired' : '') + '" data-l="' + k + '"' + (paired ? ' style="--pc:' + c + '"' : '') + (w.solved ? ' disabled' : '') + '>' + (paired ? '<span class="ep-mbadge">' + (ci[k] + 1) + '</span>' : '') + fx(pr[0]) + '</button>';
      }).join('') + '</div><div class="ep-mcol">' + rights.map(function (r) {
        var owner = rOwner[r], c = owner != null ? PAIR_COLORS[ci[owner] % PAIR_COLORS.length] : '';
        return '<button type="button" class="ep-mitem right' + (owner != null ? ' paired' : '') + '" data-r="' + r + '"' + (owner != null ? ' style="--pc:' + c + '"' : '') + (w.solved ? ' disabled' : '') + '>' + (owner != null ? '<span class="ep-mbadge">' + (ci[owner] + 1) + '</span>' : '') + fx(p.pairs[r][1]) + '</button>';
      }).join('') + '</div></div>';
    },
    bind: function (box, p, w, api) {
      box.querySelectorAll('[data-l]').forEach(function (b) { b.onclick = function () { var k = +b.getAttribute('data-l'); if (w.pairs[k] != null && w.selL !== k) { delete w.pairs[k]; w.selL = k; } else w.selL = w.selL === k ? null : k; api.rerender(); }; });
      box.querySelectorAll('[data-r]').forEach(function (b) {
        b.onclick = function () {
          var r = +b.getAttribute('data-r');
          if (w.selL == null) { var owner = Object.keys(w.pairs).filter(function (l) { return w.pairs[l] === r; })[0]; if (owner != null) { delete w.pairs[owner]; api.rerender(); } else api.warn('Tap an item on the left first.'); return; }
          Object.keys(w.pairs).forEach(function (l) { if (w.pairs[l] === r) delete w.pairs[l]; });
          w.pairs[w.selL] = r; w.selL = null;
          var next = p.pairs.map(function (_, k) { return k; }).filter(function (k) { return w.pairs[k] == null; })[0];
          if (next != null) w.selL = next;
          api.rerender();
        };
      });
    },
    check: function (p, w) {
      var n = Object.keys(w.pairs).length;
      if (n < p.pairs.length) return { warn: 'Connect every item first (' + n + ' of ' + p.pairs.length + ' connected).' };
      var good = p.pairs.filter(function (_, k) { return w.pairs[k] === k; }).length;
      if (good === p.pairs.length) return { ok: true };
      p.pairs.forEach(function (_, k) { if (w.pairs[k] !== k) delete w.pairs[k]; });
      return { ok: false, msg: good + ' of ' + p.pairs.length + ' matches were correct. The wrong ones came apart. Try again!', rerender: true };
    },
    fill: function (p, w) { w.pairs = {}; p.pairs.forEach(function (_, k) { w.pairs[k] = k; }); }
  };

  T.numberline = {
    step: function (p) { return p.snap || (p.max - p.min) / ((p.ticks || 10) * (p.minor || 1)); },
    html: function (p, w) {
      var v = w.solved ? p.answer : w.v;
      return '<div class="ep-tip">' + (p.tip || 'Tap or drag on the number line to place your point.') + '</div><div class="ep-vis ep-nlbox" data-nl>' + V._numberLine(p, { interactive: !w.solved, marker: v }).html + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      var holder = box.querySelector('[data-nl]'), nl = V._numberLine(p, {}), st = T.numberline.step(p), down = false;
      function set(ev) {
        var el = holder.querySelector('svg'), r = el.getBoundingClientRect(), vb = el.viewBox.baseVal, sx = vb.width / r.width, sy = vb.height / r.height;
        var pos = nl.vert ? (ev.clientY - r.top) * sy : (ev.clientX - r.left) * sx;
        var t = nl.vert ? (nl.R - pos) / (nl.R - nl.L) : (pos - nl.L) / (nl.R - nl.L);
        var v = p.min + Math.max(0, Math.min(1, t)) * (p.max - p.min);
        v = Math.round((v - p.min) / st) * st + p.min; v = Math.round(v * 1e6) / 1e6;
        if (v !== w.v) { w.v = v; holder.innerHTML = V._numberLine(p, { interactive: true, marker: v }).html; holder.querySelector('svg').style.touchAction = 'none'; }
      }
      holder.querySelector('svg').style.touchAction = 'none';
      holder.addEventListener('pointerdown', function (e) { down = true; set(e); });
      holder.addEventListener('pointermove', function (e) { if (down) { e.preventDefault(); set(e); } });
      holder.addEventListener('pointerup', function () { down = false; });
      holder.addEventListener('pointerleave', function () { down = false; });
      holder.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault(); var d = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? st : -st;
        var v = w.v == null ? p.min : Math.max(p.min, Math.min(p.max, Math.round((w.v + d) * 1e6) / 1e6)); w.v = v;
        holder.innerHTML = V._numberLine(p, { interactive: true, marker: v }).html;
      });
      holder.tabIndex = 0; holder.setAttribute('aria-label', 'Number line. Use the arrow keys to move your point.');
    },
    check: function (p, w) {
      if (w.v == null) return { warn: 'Place a point on the number line first.' };
      var tol = p.tol != null ? p.tol : T.numberline.step(p) / 2;
      return Math.abs(w.v - p.answer) <= tol + 1e-9 ? { ok: true } : { ok: false };
    },
    fill: function (p, w) { w.v = p.answer; }
  };

  T.plot = {
    html: function (p, w) {
      var m = w.solved ? p.answer : w.m;
      return '<div class="ep-tip">' + (p.tip || 'Tap the grid to place your point. Tap again to move it.') + '</div><div class="ep-vis ep-plotbox" data-pl>' + V._coordPlane(p, { interactive: !w.solved, marker: m }).html + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      var el = box.querySelector('[data-pl] svg'), cp = V._coordPlane(p, {}), step = p.step || 1;
      el.addEventListener('click', function (ev) {
        var r = el.getBoundingClientRect(), vb = el.viewBox.baseVal, x = (ev.clientX - r.left) * vb.width / r.width, y = (ev.clientY - r.top) * vb.height / r.height;
        var gx = p.xmin + Math.round((x - cp.pad) / cp.cw / step) * step, gy = p.ymin + Math.round((cp.H - cp.pad - y) / cp.ch / step) * step;
        gx = Math.max(p.xmin, Math.min(p.xmax, gx)); gy = Math.max(p.ymin, Math.min(p.ymax, gy));
        w.m = [gx, gy]; api.rerender(true);
      });
    },
    check: function (p, w) {
      if (!w.m) return { warn: 'Tap the grid to place your point first.' };
      if (w.m[0] === p.answer[0] && w.m[1] === p.answer[1]) return { ok: true };
      if (w.m[0] === p.answer[1] && w.m[1] === p.answer[0]) return { ok: false, msg: 'Close! It looks like you switched the two numbers. Move along the horizontal axis first, then the vertical axis.' };
      return { ok: false, msg: p.why && p.why[w.m.join(',')] };
    },
    fill: function (p, w) { w.m = p.answer.slice(); }
  };

  T.highlight = {
    html: function (p, w) {
      w.sel = w.sel || {};
      var multi = p.answer.length > 1;
      return '<div class="ep-tip">' + (p.tip || (multi ? 'Tap every part of the text that answers the question. Tap again to unselect.' : 'Tap the part of the text that answers the question.')) + '</div><div class="ep-passage' + (p.block ? ' block' : '') + '">' + p.segments.map(function (s, i) {
        var on = w.solved ? p.answer.indexOf(i) >= 0 : !!w.sel[i];
        return '<span class="ep-seg' + (on ? ' on' : '') + (w.bad && w.bad[i] ? ' bad' : '') + '" data-i="' + i + '" tabindex="0" role="button" aria-pressed="' + on + '">' + fx(s) + '</span>';
      }).join(p.block ? '' : ' ') + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      box.querySelectorAll('.ep-seg').forEach(function (s) {
        function go() { var i = +s.getAttribute('data-i'); w.bad = null; if (p.answer.length === 1) { var was = w.sel[i]; w.sel = {}; if (!was) w.sel[i] = true; } else w.sel[i] = !w.sel[i]; api.rerender(true); }
        s.onclick = go; s.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } };
      });
    },
    check: function (p, w) {
      var sel = Object.keys(w.sel).filter(function (k) { return w.sel[k]; }).map(Number);
      if (!sel.length) return { warn: 'Tap part of the text first.' };
      var right = sel.filter(function (i) { return p.answer.indexOf(i) >= 0; }).length, wrong = sel.length - right;
      if (right === p.answer.length && !wrong) return { ok: true };
      w.bad = {}; sel.forEach(function (i) { if (p.answer.indexOf(i) < 0) { w.bad[i] = true; delete w.sel[i]; } });
      var msg = p.answer.length === 1 ? (p.why && p.why[sel[0]]) || 'That part doesn\'t prove it best. Look for the words that answer the question most directly.' :
        'You found ' + right + ' of ' + p.answer.length + '.' + (wrong ? ' ' + wrong + ' pick' + (wrong > 1 ? 's were' : ' was') + ' not right and got unselected.' : ' Keep looking!');
      return { ok: false, msg: msg, rerender: true };
    },
    fill: function (p, w) { w.sel = {}; p.answer.forEach(function (i) { w.sel[i] = true; }); }
  };

  T.shade = {
    total: function (p) { return p.model === 'grid100' ? 100 : p.model === 'grid10' ? 10 : p.parts; },
    value: function (p) { var s = String(p.answer), a = parseFrac(s.replace('%', '')); return s.indexOf('%') > 0 ? a[0] / a[1] / 100 : a[0] / a[1]; },
    html: function (p, w) {
      var n = T.shade.total(p); w.sel = w.sel || [];
      var spec = { kind: p.model === 'grid100' || p.model === 'grid10' ? 'grid100' : p.model, n: n, cells: n, style: p.style };
      var vis = V[spec.kind](spec, { interactive: !w.solved, sel: w.sel });
      return '<div class="ep-tip">' + (p.tip || 'Tap the parts to shade them. Tap again to unshade.' + (p.model === 'grid100' ? ' You can drag across squares.' : '')) + '</div><div class="ep-vis ep-shadebox">' + vis + '</div>' + (p.count !== false ? '<div class="ep-lbl" data-cnt style="text-align:center">Shaded: ' + w.sel.filter(Boolean).length + ' of ' + n + '</div>' : '');
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      var paint = null, n = T.shade.total(p);
      box.querySelectorAll('[data-part]').forEach(function (el) {
        el.addEventListener('pointerdown', function (e) { e.preventDefault(); var i = +el.getAttribute('data-part'); paint = !w.sel[i]; w.sel[i] = paint; el.classList.toggle('ep-fa1', paint); if (p.style === 'pizza') { api.rerender(true); } upd(); });
        el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); var i = +el.getAttribute('data-part'); w.sel[i] = !w.sel[i]; api.rerender(true); } });
      });
      function upd() { var lb = box.querySelector('[data-cnt]'); if (lb) lb.textContent = 'Shaded: ' + w.sel.filter(Boolean).length + ' of ' + n; }
      var sv = box.querySelector('.ep-shadebox svg');
      if (p.model === 'grid100' && sv) {
        sv.style.touchAction = 'none';
        sv.addEventListener('pointermove', function (e) { if (paint == null) return; var t = document.elementFromPoint(e.clientX, e.clientY); var i = t && t.getAttribute && t.getAttribute('data-part'); if (i != null && !!w.sel[+i] !== paint) { w.sel[+i] = paint; t.classList.toggle('ep-fa1', paint); upd(); } });
      }
      document.addEventListener('pointerup', function () { paint = null; }, { once: true });
    },
    check: function (p, w) {
      var n = T.shade.total(p), k = w.sel.filter(Boolean).length;
      if (!k) return { warn: 'Shade some parts first.' };
      return Math.abs(k / n - T.shade.value(p)) < 1e-9 ? { ok: true } : { ok: false, msg: (p.why && p.why[k]) || 'You shaded ' + k + ' of ' + n + '. That\'s not quite it.' };
    },
    fill: function (p, w) { var n = T.shade.total(p), k = Math.round(T.shade.value(p) * n); w.sel = []; for (var i = 0; i < k; i++) w.sel[i] = true; }
  };

  T.build = {
    html: function (p, w) {
      var mx = p.max || 6; if (!w.d) w.d = (p.start || [1, 1, 1]).slice();
      var d = w.solved && w.solvedD ? w.solvedD : w.d, names = ['Length', 'Width', 'Height'];
      return '<div class="ep-tip">' + (p.tip || 'Use the + and − buttons to build a rectangular prism.') + '</div><div class="ep-buildrow"><div class="ep-steppers">' + names.map(function (nm, i) {
        return '<div class="ep-stepper"><span>' + nm + '</span><button type="button" data-s="' + i + '" data-d="-1" aria-label="Less ' + nm + '"' + (w.solved || d[i] <= 1 ? ' disabled' : '') + '>−</button><b>' + d[i] + '</b><button type="button" data-s="' + i + '" data-d="1" aria-label="More ' + nm + '"' + (w.solved || d[i] >= mx ? ' disabled' : '') + '>+</button></div>';
      }).join('') + '</div><div class="ep-vis">' + V.prism({ l: d[0], w: d[1], h: d[2], u: p.u || '' }) + '</div></div>';
    },
    bind: function (box, p, w, api) { box.querySelectorAll('[data-s]').forEach(function (b) { b.onclick = function () { w.d[+b.getAttribute('data-s')] += +b.getAttribute('data-d'); api.rerender(true); }; }); },
    check: function (p, w) {
      var l = w.d[0], wd = w.d[1], h = w.d[2], v = l * wd * h, t = p.target;
      if (t.dims) { if (t.dims[0] === l && t.dims[1] === wd && t.dims[2] === h) { w.solvedD = w.d.slice(); return { ok: true }; } return { ok: false, msg: 'Your prism is ' + l + ' × ' + wd + ' × ' + h + '. Check the measurements again.' }; }
      if (t.base && l * wd !== t.base) return { ok: false, msg: 'The base must have an area of ' + t.base + ' square units. Yours is ' + l + ' × ' + wd + ' = ' + (l * wd) + '.' };
      if (v === t.volume) { if (t.not && t.not.join() === w.d.join()) return { warn: 'That works, but build a DIFFERENT prism than the one in the picture.' }; w.solvedD = w.d.slice(); return { ok: true }; }
      return { ok: false, msg: 'Your prism has ' + l + ' × ' + wd + ' × ' + h + ' cubes. That\'s not the volume you need.' };
    },
    fill: function (p, w) {
      var t = p.target, mx = p.max || 6;
      if (t.dims) { w.d = t.dims.slice(); return; }
      for (var l = 1; l <= mx; l++) for (var a = 1; a <= mx; a++) for (var h = 1; h <= mx; h++) if (l * a * h === t.volume && (!t.base || l * a === t.base) && !(t.not && t.not.join() === [l, a, h].join())) { w.d = [l, a, h]; return; }
      w.d = [1, 1, 1];
    }
  };

  T.coins = {
    html: function (p, w) {
      w.tray = w.tray || []; var kinds = p.coins || ['b1', 'q', 'd', 'n', 'p'];
      return '<div class="ep-tip">' + (p.tip || 'Tap money to put it in the tray. Tap money in the tray to take it out.') + '</div><div class="ep-coinbank">' + kinds.map(function (c) { return '<button type="button" class="ep-coinbtn" data-c="' + c + '"' + (w.solved ? ' disabled' : '') + ' aria-label="Add ' + V._COINS[c].label + '">' + V._coinHTML(c) + '</button>'; }).join('') + '</div>' +
        '<div class="ep-tray" aria-label="Your tray">' + (w.tray.length ? w.tray.map(function (c, i) { return '<button type="button" class="ep-coinbtn" data-t="' + i + '"' + (w.solved ? ' disabled' : '') + ' aria-label="Remove ' + V._COINS[c].label + '">' + V._coinHTML(c) + '</button>'; }).join('') : '<span class="ep-tip">Your tray is empty.</span>') + '</div>' +
        '<div class="ep-lbl" style="text-align:center">' + w.tray.length + ' item' + (w.tray.length === 1 ? '' : 's') + ' in the tray</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      box.querySelectorAll('[data-c]').forEach(function (b) { b.onclick = function () { if (w.tray.length < 40) { w.tray.push(b.getAttribute('data-c')); w.tray.sort(function (a, c) { return V._COINS[c].v - V._COINS[a].v; }); api.rerender(true); } }; });
      box.querySelectorAll('.ep-tray [data-t]').forEach(function (b) { b.onclick = function () { w.tray.splice(+b.getAttribute('data-t'), 1); api.rerender(true); }; });
    },
    check: function (p, w) {
      var c = w.tray.reduce(function (a, k) { return a + V._COINS[k].v; }, 0), target = Math.round(p.answer * 100);
      if (!w.tray.length) return { warn: 'Put some money in the tray first.' };
      if (c !== target) return { ok: false, msg: 'Count again: your tray doesn\'t make $' + p.answer.toFixed(2) + ' yet.' };
      if (p.fewest) { var need = 0, r = target; (p.coins || ['b1', 'q', 'd', 'n', 'p']).map(function (k) { return V._COINS[k].v; }).sort(function (a, b) { return b - a; }).forEach(function (v) { need += Math.floor(r / v); r %= v; }); if (w.tray.length > need) return { warn: 'That makes the right amount! Can you do it with fewer pieces of money?' }; }
      return { ok: true };
    },
    fill: function (p, w) { var r = Math.round(p.answer * 100); w.tray = []; (p.coins || ['b1', 'q', 'd', 'n', 'p']).slice().sort(function (a, b) { return V._COINS[b].v - V._COINS[a].v; }).forEach(function (k) { while (r >= V._COINS[k].v) { w.tray.push(k); r -= V._COINS[k].v; } }); }
  };

  T.assemble = {
    html: function (p, w, key) {
      w.seq = w.seq || []; var bank = p.keepOrder ? p.tiles.map(function (_, k) { return k; }) : shuffled(p.tiles.map(function (_, k) { return k; }), room.id + key);
      var seq = w.solved && w.solvedSeq ? w.solvedSeq : w.seq, used = {}; seq.forEach(function (k) { used[k] = true; });
      return '<div class="ep-tip">' + (p.tip || 'Tap the tiles in order to build your answer. Tap a tile in your answer to remove it.') + '</div>' +
        '<div class="ep-slots-row" aria-label="Your answer">' + (seq.length ? seq.map(function (k, i) { return '<button type="button" class="ep-tile placed" data-rm="' + i + '"' + (w.solved ? ' disabled' : '') + '>' + fx(p.tiles[k]) + '</button>'; }).join(p.joiner != null ? '<span class="ep-joiner">' + esc(p.joiner) + '</span>' : '') : '<span class="ep-tip">Your answer will appear here.</span>') + '</div>' +
        '<div class="ep-tilebank">' + bank.map(function (k) { return '<button type="button" class="ep-tile" data-add="' + k + '"' + (used[k] || w.solved ? ' disabled' : '') + '>' + fx(p.tiles[k]) + '</button>'; }).join('') + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      box.querySelectorAll('[data-add]').forEach(function (b) { b.onclick = function () { w.seq.push(+b.getAttribute('data-add')); api.rerender(true); }; });
      box.querySelectorAll('[data-rm]').forEach(function (b) { b.onclick = function () { w.seq.splice(+b.getAttribute('data-rm'), 1); api.rerender(true); }; });
    },
    check: function (p, w) {
      if (!w.seq.length) return { warn: 'Tap some tiles to build your answer first.' };
      var got = w.seq.map(function (k) { return norm(p.tiles[k]); }).join('|');
      var ok = (p.answers || [p.answer]).some(function (a) { return a.map(norm).join('|') === got; });
      if (ok) { w.solvedSeq = w.seq.slice(); return { ok: true }; }
      return { ok: false, msg: p.why && p.why[got] };
    },
    fill: function (p, w) { var used = {}; w.seq = p.answer.map(function (a) { for (var k = 0; k < p.tiles.length; k++) if (!used[k] && norm(p.tiles[k]) === norm(a)) { used[k] = true; return k; } return 0; }); }
  };

  T.maya = {
    html: function (p, w) {
      w.b = w.b || 0; w.d = w.d || 0; var b = w.solved ? Math.floor(p.answer / 5) : w.b, d = w.solved ? p.answer % 5 : w.d;
      return '<div class="ep-tip">Build the number with Maya symbols: a dot is 1, a bar is 5, and a shell is 0.</div><div class="ep-buildrow"><div class="ep-steppers">' +
        '<div class="ep-stepper"><span>Bars (5)</span><button type="button" data-m="b" data-d="-1"' + (w.solved || !b ? ' disabled' : '') + ' aria-label="Remove a bar">−</button><b>' + b + '</b><button type="button" data-m="b" data-d="1"' + (w.solved || b >= 3 ? ' disabled' : '') + ' aria-label="Add a bar">+</button></div>' +
        '<div class="ep-stepper"><span>Dots (1)</span><button type="button" data-m="d" data-d="-1"' + (w.solved || !d ? ' disabled' : '') + ' aria-label="Remove a dot">−</button><b>' + d + '</b><button type="button" data-m="d" data-d="1"' + (w.solved || d >= 4 ? ' disabled' : '') + ' aria-label="Add a dot">+</button></div></div>' +
        '<div class="ep-vis">' + V.maya({ n: b * 5 + d }) + '</div></div>';
    },
    bind: function (box, p, w, api) { if (w.solved) return; box.querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { w[b.getAttribute('data-m')] += +b.getAttribute('data-d'); api.rerender(true); }; }); },
    check: function (p, w) { return w.b * 5 + w.d === p.answer ? { ok: true } : { ok: false, msg: 'Your symbols show ' + (w.b * 5 + w.d) + '. Count each bar as 5 and each dot as 1.' }; },
    fill: function (p, w) { w.b = Math.floor(p.answer / 5); w.d = p.answer % 5; }
  };

  T.balance = {
    html: function (p, w) {
      if (!w.s) w.s = { lx: p.left.x || 1, lu: p.left.units || 0, ru: p.right.units, grouped: false };
      var s = w.solved ? { lx: 1, lu: 0, ru: p.answer, grouped: false } : w.s, alone = s.lu === 0 && (s.lx === 1 || s.grouped);
      var xs = s.grouped ? 1 : s.lx, ru = s.grouped ? s.ru / s.lx : s.ru, left = [], right = [];
      for (var i = 0; i < xs; i++) left.push('x'); for (var j = 0; j < Math.min(s.lu, 12); j++) left.push(1);
      if (ru > 12) right = [ru]; else for (var k = 0; k < ru; k++) right.push(1);
      if (s.lu > 12) left = left.slice(0, xs).concat([s.lu]);
      var eq = (xs > 1 ? xs : '') + 'x' + (s.lu ? ' + ' + s.lu : '') + ' = ' + ru, btns = '';
      if (!w.solved && !alone) {
        if (s.lu > 0) btns += '<button type="button" class="ep-btn small" data-op="sub1">Take 1 off each side</button>' + (s.lu >= 5 ? '<button type="button" class="ep-btn small" data-op="sub5">Take 5 off each side</button>' : '') + (s.lu >= 2 ? '<button type="button" class="ep-btn small plain" data-op="suball">Take ' + s.lu + ' off each side</button>' : '');
        else if (s.lx > 1 && !s.grouped) btns += '<button type="button" class="ep-btn small" data-op="div">Split each side into ' + s.lx + ' equal groups</button>';
      }
      return '<div class="ep-tip">' + (p.tip || 'Keep the scale balanced: whatever you do to one side, do to the other. Get x alone.') + '</div><div class="ep-vis">' + V.balance({ left: left, right: right }) + '</div><div class="ep-eqline">' + eq + '</div>' +
        '<div class="ep-row" style="justify-content:center">' + btns + '</div>' +
        (alone || w.solved ? '<div class="ep-answer" style="justify-content:center;margin-top:10px"><span class="ep-unit">x =</span><input type="text" class="ep-box" data-bx inputmode="numeric" value="' + esc(w.solved ? p.answer : (w.val || '')) + '" aria-label="x equals"' + (w.solved ? ' disabled' : '') + '></div>' : '');
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      box.querySelectorAll('[data-op]').forEach(function (b) {
        b.onclick = function () {
          var s = w.s, op = b.getAttribute('data-op');
          if (op === 'sub1') { s.lu -= 1; s.ru -= 1; } else if (op === 'sub5') { s.lu -= 5; s.ru -= 5; } else if (op === 'suball') { s.ru -= s.lu; s.lu = 0; } else if (op === 'div') { s.grouped = true; }
          api.rerender(true);
        };
      });
      var i = box.querySelector('[data-bx]'); if (i) { i.addEventListener('input', function () { w.val = i.value; }); i.addEventListener('keydown', function (e) { if (e.key === 'Enter') api.check(); }); i.focus(); }
    },
    check: function (p, w) {
      var s = w.s, alone = s.lu === 0 && (s.lx === 1 || s.grouped);
      if (!alone) return { warn: 'Use the buttons to get x alone on one side first.' };
      if (!String(w.val || '').trim()) return { warn: 'Now type what x equals.' };
      return toNum(w.val) === p.answer ? { ok: true } : { ok: false, msg: 'Look at the right side of the scale: that is what x equals.' };
    },
    fill: function (p, w) { var lx = p.left.x || 1; w.s = { lx: lx, lu: 0, ru: p.answer * lx, grouped: lx > 1 }; w.val = String(p.answer); }
  };

  T.tap = {
    html: function (p, w) {
      w.bad = w.bad || {};
      return '<div class="ep-tip">' + (p.tip || 'Tap your answer in the picture.') + '</div><div class="ep-tapwrap">' + visualHTML(p.visual, { interactive: true }) + '</div>';
    },
    bind: function (box, p, w, api) {
      var ans = [].concat(p.answer);
      box.querySelectorAll('.ep-t').forEach(function (t) {
        var id = t.getAttribute('data-t');
        if (w.bad[id]) t.classList.add('bad');
        if (w.solved && ans.indexOf(id) >= 0) t.classList.add('good');
        function go() { if (w.solved || w.bad[id]) return; if (ans.indexOf(id) >= 0) { w.pick = id; t.classList.add('good'); api.win(); } else { w.bad[id] = true; t.classList.add('bad'); api.miss((p.why && p.why[id]) || null); } }
        t.addEventListener('click', go); t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
    },
    check: function (p, w) { return [].concat(p.answer).indexOf(w.pick) >= 0 ? { ok: true } : { ok: false }; },
    fill: function (p, w) { w.pick = [].concat(p.answer)[0]; },
    instant: true
  };

  /* ---------- written evidence tasks (RACE, CER, historian, math) ---------- */
  var FRAMES = {
    RACE: { name: 'RACE response', parts: [
      { k: 'R', name: 'Restate', tip: 'Turn the question into the start of your answer.', starter: 'In the text,', min: 6, keys: 1 },
      { k: 'A', name: 'Answer', tip: 'Answer every part of the question in your own words.', starter: 'I think', min: 6 },
      { k: 'C', name: 'Cite evidence', tip: 'Copy exact words from the text inside quotation marks. Tap an evidence card to add one.', starter: 'According to the text,', min: 6, quote: 1 },
      { k: 'E', name: 'Explain', tip: 'Explain HOW your evidence proves your answer.', starter: 'This shows that', min: 12, link: 1, vocab: 1 }] },
    CER: { name: 'Claim, Evidence, Reasoning', parts: [
      { k: 'C', name: 'Claim', tip: 'One sentence that answers the question.', starter: 'I claim that', min: 6, keys: 1 },
      { k: 'E', name: 'Evidence', tip: 'Give data or observations. Use numbers or quote the text. Tap an evidence card to add one.', starter: 'The evidence is', min: 8, evid: 1 },
      { k: 'R', name: 'Reasoning', tip: 'Connect the evidence to the claim with a science idea.', starter: 'This happens because', min: 12, link: 1, vocab: 1 }] },
    SOURCE: { name: 'Historian\'s claim', parts: [
      { k: 'C', name: 'Claim', tip: 'One sentence that answers the question.', starter: 'I claim that', min: 6, keys: 1 },
      { k: 'E', name: 'Evidence', tip: 'Quote the sources or give facts and dates. Tap an evidence card to add one.', starter: 'The evidence shows', min: 8, evid: 1 },
      { k: 'S', name: 'Source check', tip: 'Who made the source, when, and why? Is it primary or secondary? Can we trust it?', starter: 'This source is', min: 8, source: 1 },
      { k: 'X', name: 'Explain', tip: 'Explain why your evidence proves your claim.', starter: 'This matters because', min: 10, link: 1, vocab: 1 }] },
    MATH: { name: 'Solve, Show, Explain', parts: [
      { k: 'A', name: 'Solve', tip: 'Type your final answer (number only).', answer: 1 },
      { k: 'S', name: 'Show your work', tip: 'Write the equation or steps you used, with numbers and operation signs.', starter: '', min: 3, work: 1 },
      { k: 'E', name: 'Explain', tip: 'Explain your strategy using math words.', starter: 'First I', min: 12, link: 1, vocab: 1 }] }
  };
  var LINK_WORDS = ['because', 'this shows', 'this means', 'therefore', 'so ', 'which', 'since', 'as a result', 'proves', 'shows that', 'this is why', 'that is why', 'caused', 'means that'];
  var SOURCE_WORDS = ['primary', 'secondary', 'source', 'written', 'wrote', 'made', 'created', 'author', 'eyewitness', 'reliable', 'trust', 'bias', 'record', 'artifact', 'document', 'map', 'letter', 'census', 'museum', 'official', 'historian'];
  function wordCount(t) { return String(t || '').trim().split(/\s+/).filter(function (x) { return /[a-z0-9]/i.test(x); }).length; }
  function hasAny(t, list) { t = ' ' + String(t || '').toLowerCase() + ' '; return (list || []).some(function (w) { return t.indexOf(String(w).toLowerCase()) >= 0; }); }
  function quoteCount(t) { return (String(t || '').match(/["“][^"”]{3,}["”]/g) || []).length; }
  function numCount(t) { return (String(t || '').match(/\d[\d,.]*/g) || []).length; }
  function partRules(part, p, text) {
    var L = curLevel(), out = [];
    if (part.answer) return out;
    var min = Math.max(3, Math.round(part.min * L.writeMul)), n = wordCount(text);
    out.push({ ok: n >= min, label: 'At least ' + min + ' words (' + n + ')' });
    if (part.keys && p.keys) out.push({ ok: hasAny(text, p.keys), label: 'Uses words from the question' });
    if (part.quote) out.push(L.twoEvidence ? { ok: quoteCount(text) >= 2, label: 'Two quotes in "quotation marks"' } : { ok: quoteCount(text) >= 1, label: 'A quote in "quotation marks"' });
    if (part.evid) { var ev = quoteCount(text) + numCount(text); out.push(L.twoEvidence ? { ok: ev >= 2, label: 'Two pieces of evidence (quotes or numbers)' } : { ok: ev >= 1, label: 'A quote or a number from the text' }); }
    if (part.source) out.push({ ok: hasAny(text, SOURCE_WORDS), label: 'Says who made the source or if it can be trusted' });
    if (part.work) out.push({ ok: /\d/.test(text) && /[+\-−×x*÷\/=]/.test(text), label: 'Numbers and operation signs' });
    if (part.link) out.push({ ok: hasAny(text, LINK_WORDS), label: 'A linking phrase (because, this shows, so...)' });
    if (part.vocab && p.vocab && p.vocab.length) out.push({ ok: hasAny(text, p.vocab), label: 'A key word: ' + p.vocab.slice(0, 4).join(', ') });
    return out;
  }
  function ckHTML(rules) { return rules.map(function (r) { return '<li class="' + (r.ok ? 'ok' : '') + '">' + esc(r.label) + '</li>'; }).join(''); }
  T.write = {
    parts: function (p) { return (FRAMES[p.frame] || FRAMES.RACE).parts; },
    html: function (p, w, key) {
      var fr = FRAMES[p.frame] || FRAMES.RACE, L = curLevel();
      if (!w.v) {
        var d = (typeof S !== 'undefined' && S && S.drafts && S.drafts[key]) || null;
        w.v = d ? Object.assign({}, d) : {};
        if (!d && L.prefill) fr.parts.forEach(function (pt) { if (pt.starter) w.v[pt.k] = pt.starter + ' '; });
      }
      if (w.solved) {
        var mine = (typeof S !== 'undefined' && S && S.writing && S.writing[key]) || w.v;
        return '<div class="ep-wdone">' + fr.parts.map(function (pt) { return '<p><b class="ep-wk">' + pt.k + '</b><b>' + esc(pt.name) + ':</b> ' + esc(mine[pt.k] || '') + '</p>'; }).join('') + '</div>' +
          (p.exemplar ? '<details class="ep-model"><summary>Compare with a model answer</summary>' + fr.parts.map(function (pt) { return '<p><b>' + esc(pt.name) + ':</b> ' + esc(p.exemplar[pt.k] || '') + '</p>'; }).join('') + '<p class="ep-small">How does yours compare? Did you cite evidence and explain it?</p></details>' : '');
      }
      var chips = (p.evidence || []).length ? '<div class="ep-evbank"><div class="ep-evh">Evidence cards: tap one to add it to your ' + (fr.parts.filter(function (pt) { return pt.quote || pt.evid; })[0] || { name: 'answer' }).name.toLowerCase() + '</div><div class="ep-chips">' + p.evidence.map(function (e, k) { return '<button type="button" class="ep-chip' + (e.d ? ' data' : '') + '" data-ev="' + k + '">' + esc(e.d || e) + '</button>'; }).join('') + '</div></div>' : '';
      return '<div class="ep-tip"><b>' + esc(fr.name) + '.</b> Write each part. The checklist turns green as you meet each requirement.' + (L.twoEvidence ? ' <b>Legend:</b> use two pieces of evidence.' : '') + '</div>' + chips +
        '<div class="ep-write">' + fr.parts.map(function (pt) {
          var head = '<div class="ep-wlab"><b class="ep-wk">' + pt.k + '</b><span><b>' + esc(pt.name) + '</b><br><span class="ep-wtip">' + esc(pt.tip) + '</span></span></div>';
          if (pt.answer) return '<div class="ep-wpart">' + head + '<div class="ep-answer"><input type="text" class="ep-box wide" data-w="' + pt.k + '" value="' + esc(w.v[pt.k] || '') + '" aria-label="' + esc(pt.name) + '" inputmode="decimal">' + (p.unit ? '<span class="ep-unit">' + esc(p.unit) + '</span>' : '') + '</div></div>';
          return '<div class="ep-wpart">' + head + '<textarea data-w="' + pt.k + '" rows="3" aria-label="' + esc(pt.name) + '" placeholder="' + esc(pt.starter ? pt.starter + '…' : 'Type here…') + '">' + esc(w.v[pt.k] || '') + '</textarea>' +
            (pt.starter && !L.prefill ? '<button type="button" class="ep-starter" data-st="' + pt.k + '">Use a sentence starter: "' + esc(pt.starter) + '…"</button>' : '') +
            '<ul class="ep-ck" data-ck="' + pt.k + '">' + ckHTML(partRules(pt, p, w.v[pt.k])) + '</ul></div>';
        }).join('') + '</div>';
    },
    bind: function (box, p, w, api) {
      if (w.solved) return;
      var fr = FRAMES[p.frame] || FRAMES.RACE, key = box.getAttribute('data-key');
      function upd(k) {
        var pt = fr.parts.filter(function (x) { return x.k === k; })[0], ul = box.querySelector('[data-ck="' + k + '"]');
        if (ul) ul.innerHTML = ckHTML(partRules(pt, p, w.v[k]));
        if (typeof S !== 'undefined' && S) { S.drafts = S.drafts || {}; S.drafts[key] = Object.assign({}, w.v); saveSoon(); }
      }
      box.querySelectorAll('[data-w]').forEach(function (el) { el.addEventListener('input', function () { w.v[el.getAttribute('data-w')] = el.value; upd(el.getAttribute('data-w')); }); });
      box.querySelectorAll('[data-st]').forEach(function (b) {
        b.onclick = function () { var k = b.getAttribute('data-st'), pt = fr.parts.filter(function (x) { return x.k === k; })[0], ta = box.querySelector('[data-w="' + k + '"]'); ta.value = (pt.starter + ' ' + ta.value).replace(/\s+$/, '') + ' '; w.v[k] = ta.value; upd(k); ta.focus(); };
      });
      var target = (fr.parts.filter(function (pt) { return pt.quote || pt.evid; })[0] || {}).k;
      box.querySelectorAll('[data-ev]').forEach(function (b) {
        b.onclick = function () { if (!target) return; var ta = box.querySelector('[data-w="' + target + '"]'), q = p.evidence[+b.getAttribute('data-ev')]; var add = q.d ? q.d : /^["“]/.test(q) ? q : '"' + q + '"'; ta.value = (ta.value.replace(/\s+$/, '') + ' ' + add).trim() + ' '; w.v[target] = ta.value; upd(target); ta.focus(); };
      });
    },
    check: function (p, w) {
      var fr = FRAMES[p.frame] || FRAMES.RACE, left = 0;
      fr.parts.forEach(function (pt) {
        if (pt.answer) { if (!String(w.v[pt.k] || '').trim()) left++; return; }
        partRules(pt, p, w.v[pt.k]).forEach(function (r) { if (!r.ok) left++; });
      });
      if (left) return { warn: 'Almost there! ' + left + ' checklist item' + (left === 1 ? ' is' : 's are') + ' still unchecked. Look for the gray circles.' };
      var ap = fr.parts.filter(function (pt) { return pt.answer; })[0];
      if (ap) {
        var got = w.v[ap.k], ok = [].concat(p.answer).some(function (a) { var n1 = toNum(got), n2 = toNum(a); return n1 != null && n2 != null ? Math.abs(n1 - n2) < 1e-9 : norm(got) === norm(a); });
        if (!ok) return { ok: false, msg: 'Your writing looks great, but check your final answer. Redo the math in your "Show your work" box.' };
      }
      return { ok: true };
    },
    fill: function (p, w) { w.v = Object.assign({}, p.exemplar || {}); var ap = T.write.parts(p).filter(function (pt) { return pt.answer; })[0]; if (ap) w.v[ap.k] = String([].concat(p.answer)[0]); }
  };

  /* ---------- self test ---------- */
  if (opts.selfTest) {
    var problems = [];
    stages.forEach(function (s, i) {
      (s.puzzles || []).forEach(function (p, j) {
        var t = T[p.type]; if (!t) { problems.push(i + '-' + j + ': unknown type ' + p.type); return; }
        try {
          var w = {}; t.fill(p, w); var r = t.check(p, w);
          if (!r || !r.ok) problems.push(i + '-' + j + ' (' + p.type + '): answer key does not pass its own check' + (r && (r.warn || r.msg) ? ': ' + (r.warn || r.msg) : ''));
          if (p.type === 'tap') { var html = visualHTML(p.visual, { interactive: true }); [].concat(p.answer).forEach(function (a) { if (html.indexOf('data-t="' + a + '"') < 0) problems.push(i + '-' + j + ': tap target ' + a + ' is not in the picture'); }); }
          t.html(p, {}, i + '-' + j);
        } catch (e) { problems.push(i + '-' + j + ' (' + p.type + '): ' + e.message); }
      });
    });
    return problems;
  }

  /* ---------- styles ---------- */
  var CSS = `
.ep{--bg:#f4f1ea;--bg-img:none;--bg-size:auto;--ink:#1d1d1d;--muted:#5d5d5d;--card:#fffdf7;--card-ink:#1d1d1d;--card-head:#1d1d1d;--line:#1d1d1d;--panel:#1f2a37;--panel-ink:#f5f5f5;--panel-dim:#c9d2dc;--panel-frame:8px solid #54402a;--accent:#c8272d;--accent-dark:#8e1a1f;--accent-ink:#fff;--accent2:#f7d774;--sign:#c8272d;--sign-shadow:#e9b45c;--band:#c8272d;--band-edge:#8e1a1f;--r:14px;
  --good:#1f6b2a;--good-bg:#d4ebd2;--bad:#a3201a;--bad-bg:#f8d6d3;--warn-bg:#fff1c2;
  font-family:"Atkinson Hyperlegible","Segoe UI",Verdana,system-ui,sans-serif;font-size:19px;line-height:1.5;color:var(--ink);background-color:var(--bg);background-image:var(--bg-img);background-size:var(--bg-size);min-height:100vh;box-sizing:border-box;-webkit-text-size-adjust:100%}
.ep *,.ep *::before,.ep *::after{box-sizing:border-box}
:where(.ep) button{font:inherit;color:inherit}
.ep :focus-visible{outline:3px solid var(--accent2);outline-offset:3px}
.ep-band{height:46px;background:var(--band);border-bottom:4px solid var(--band-edge)}
.ep-band.thin{height:22px;position:sticky;top:0;z-index:20}
.ep-band.bottom{border-bottom:0;border-top:4px solid var(--band-edge);margin-top:24px}
.ep-wrap{max-width:800px;margin:0 auto;padding:18px 18px 56px}
.ep-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.ep-spacer{flex:1}
.ep-hero{display:flex;gap:18px;align-items:center;margin:22px 0 6px}
.ep-emblem{width:92px;height:92px;flex:none;filter:drop-shadow(0 4px 0 rgba(0,0,0,.18))}
.ep-emblem.sm{width:54px;height:54px}
.ep-sign{font-family:var(--display);font-weight:400;font-size:clamp(36px,8.5vw,68px);line-height:1;color:var(--sign);margin:0;text-shadow:3px 3px 0 var(--sign-shadow);text-wrap:balance}
.ep-sign.md{font-size:clamp(28px,6vw,44px)}
.ep-tag{color:var(--muted);margin:6px 0 18px;font-size:15px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.ep-card{background:var(--card);color:var(--card-ink);border:3px solid var(--line);border-radius:var(--r);box-shadow:0 3px 0 rgba(0,0,0,.2),0 10px 20px rgba(0,0,0,.14);padding:22px}
.ep-card+.ep-card{margin-top:18px}
.ep-card h2,.ep-panel h2{font-family:var(--display);font-weight:400;font-size:clamp(24px,4.5vw,32px);margin:0 0 10px;line-height:1.08;color:var(--card-head)}
.ep-card p{margin:0 0 12px;max-width:68ch}.ep-card p:last-child{margin-bottom:0}
.ep-card h3{font-family:var(--display);font-weight:400;font-size:22px;margin:14px 0 4px;color:var(--card-head)}
.ep-card table{border-collapse:collapse;margin:10px 0;font-variant-numeric:tabular-nums;background:#fff;color:#1d2433}
.ep-card th,.ep-card td{border:2px solid #1d2433;padding:6px 10px;text-align:left}
.ep-card th{background:#eef1f6}
.ep-card .tablewrap{overflow-x:auto}
.ep-card ul,.ep-card ol{padding-left:1.3em;margin:.4em 0}
.ep-card li{margin:.2em 0}
.ep-card blockquote{margin:10px 0;padding:12px 16px;border-left:6px solid var(--accent);background:rgba(0,0,0,.06);border-radius:0 10px 10px 0}
.ep-card .note{font-size:.88em;opacity:.8}
.ep-panel{background:var(--panel);color:var(--panel-ink);border:var(--panel-frame);border-radius:calc(var(--r) - 4px);padding:22px;box-shadow:0 3px 0 rgba(0,0,0,.2),0 10px 20px rgba(0,0,0,.18)}
.ep-panel h2{color:var(--accent2)}
.ep label{font-weight:700}
.ep input[type=text]{font:inherit;font-size:20px;padding:12px 14px;border-radius:10px;border:3px solid #1d2433;background:#fff;color:#111;width:100%}
.ep-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:56px;padding:12px 26px;border-radius:999px;cursor:pointer;border:3px solid var(--accent-dark);background:var(--accent);color:var(--accent-ink);font-family:var(--display);font-size:22px;letter-spacing:.02em;box-shadow:0 4px 0 var(--accent-dark);transition:transform .08s,box-shadow .08s;text-decoration:none;line-height:1.1}
.ep-btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--accent-dark)}
.ep-btn[disabled]{opacity:.45;cursor:not-allowed}
.ep-btn.small{min-height:44px;font-size:17px;padding:8px 18px}
.ep-btn.plain{background:transparent;color:inherit;border-color:currentColor;box-shadow:none;font-family:inherit;font-weight:700;font-size:16px;min-height:44px;padding:8px 16px}
.ep-btn.full{width:100%}
.ep-status{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:4px 0 18px;font-size:15px;color:var(--muted)}
.ep-status strong{color:var(--ink);font-variant-numeric:tabular-nums}
.ep-pill{border:2px solid currentColor;border-radius:999px;padding:2px 12px;white-space:nowrap}
.ep-howto{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0}
.ep-howto div{background:rgba(0,0,0,.06);border-radius:10px;padding:10px 12px;font-size:15px}
.ep-howto b{display:block;font-family:var(--display);font-weight:400;font-size:19px;color:var(--card-head)}
.ep-rooms{display:grid;gap:14px}
.ep-room{display:flex;align-items:center;gap:16px;width:100%;text-align:left;cursor:pointer;background:var(--card);color:var(--card-ink);border:3px solid var(--line);border-radius:var(--r);padding:14px 18px;box-shadow:0 3px 0 rgba(0,0,0,.2),0 10px 20px rgba(0,0,0,.12);min-height:84px;transition:transform .12s}
.ep-room:hover:not([disabled]){transform:translateY(-2px)}
.ep-room .num{font-family:var(--display);font-size:28px;width:52px;height:52px;border-radius:50%;background:var(--accent2);color:#1d1d1d;display:grid;place-items:center;flex:none;border:3px solid var(--line)}
.ep-room .lbl{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.75}
.ep-room .name{font-weight:700;font-size:20px;line-height:1.2}
.ep-room .state{margin-left:auto;font-family:var(--display);font-size:18px;flex:none;text-align:right}
.ep-room.locked{opacity:.5;cursor:not-allowed;filter:grayscale(.7)}
.ep-room.solved .num{background:var(--good);color:#fff}
.ep-room.solved .state{color:var(--good)}
.ep-room.open{outline:4px solid var(--accent2);outline-offset:2px}
.ep-f-gallery .ep-rooms,.ep-f-mystery .ep-rooms{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.ep-f-gallery .ep-room{flex-direction:column;align-items:flex-start;border:10px solid #7a5a2b;box-shadow:inset 0 0 0 3px #d9bf7a,0 8px 18px rgba(0,0,0,.3);border-radius:4px;min-height:160px}
.ep-f-gallery .ep-room .state,.ep-f-mystery .ep-room .state{margin-left:0;margin-top:auto;text-align:left}
.ep-f-mystery .ep-room{flex-direction:column;align-items:flex-start;border-radius:4px 16px 4px 4px;position:relative;margin-top:14px;min-height:160px}
.ep-f-mystery .ep-room::before{content:"";position:absolute;top:-17px;left:-3px;width:45%;height:17px;background:var(--card);border:3px solid var(--line);border-bottom:0;border-radius:10px 10px 0 0}
.ep-f-fieldtrip .ep-room,.ep-f-quest .ep-room{position:relative;margin-left:30px;width:calc(100% - 30px)}
.ep-f-fieldtrip .ep-room::before,.ep-f-quest .ep-room::before{content:"";position:absolute;left:-29px;top:-18px;bottom:-18px;border-left:4px dashed currentColor;opacity:.35}
.ep-f-fieldtrip .ep-room::after,.ep-f-quest .ep-room::after{content:"";position:absolute;left:-37px;top:calc(50% - 10px);width:20px;height:20px;border-radius:50%;background:var(--accent);border:3px solid var(--line)}
.ep-f-fieldtrip .ep-room.solved::after,.ep-f-quest .ep-room.solved::after{background:var(--good)}
.ep-f-fieldtrip .ep-rooms>.ep-room:first-child::before,.ep-f-quest .ep-rooms>.ep-room:first-child::before{top:50%}
.ep-f-fieldtrip .ep-rooms>.ep-room:last-child::before,.ep-f-quest .ep-rooms>.ep-room:last-child::before{bottom:50%}
.ep-digits{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap}
.ep-digit{width:54px;height:66px;display:grid;place-items:center;border-radius:10px;background:#fff;color:#111;border:3px solid #1d2433;font-family:var(--display);font-size:34px}
.ep-digit.empty{color:#aaa;border-style:dashed}
.ep-stagecard .ep-kicker{font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--card-head);opacity:.85}
.ep-vis{background:#fff;border-radius:12px;padding:10px;margin:12px 0;display:flex;flex-direction:column;align-items:center;gap:6px;border:2px solid rgba(0,0,0,.14);color:#1d2433;overflow-x:auto}
.ep-vis.dark{background:#0B1026;border-color:#0B1026}
.ep-vis figcaption{font-size:15px;color:#4b5563;text-align:center}
.ep-svg{width:100%;height:auto;display:block}
.ep-fa1{fill:var(--accent)}.ep-fa2{fill:var(--accent2)}
.ep-part{cursor:pointer}.ep-part:hover{opacity:.85}
.ep-t{cursor:pointer;transition:opacity .15s}.ep-t:hover{opacity:.78}.ep-t:focus-visible{outline:3px solid #F4A300}
.ep-t.bad{opacity:.3;filter:grayscale(1);cursor:default}.ep-t.good{filter:drop-shadow(0 0 6px #2fbf4a) drop-shadow(0 0 2px #2fbf4a)}
.ep-flips{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:14px 0}
.ep-flip{perspective:900px;background:none;border:0;padding:0;min-height:140px;cursor:pointer;text-align:center}
.ep-flip-in{position:relative;display:block;width:100%;height:100%;min-height:140px;transition:transform .5s;transform-style:preserve-3d}
.ep-flip.on .ep-flip-in{transform:rotateY(180deg)}
.ep-flip-f,.ep-flip-b{position:absolute;inset:0;display:grid;place-items:center;padding:12px 12px 22px;border-radius:12px;border:3px solid var(--line);backface-visibility:hidden;-webkit-backface-visibility:hidden}
.ep-flip-f{background:var(--accent);color:var(--accent-ink);font-family:var(--display);font-size:21px;box-shadow:0 4px 0 var(--accent-dark)}
.ep-flip-f::after{content:"Tap to flip";position:absolute;bottom:6px;left:0;right:0;font-family:"Atkinson Hyperlegible",sans-serif;font-size:12px;opacity:.85}
.ep-flip-b{background:#fff;color:#1d2433;transform:rotateY(180deg);font-size:16px;padding:12px}
.ep-sim{margin:14px 0 4px;background:rgba(0,0,0,.05);border:3px dashed var(--line);border-radius:12px;padding:12px}
.ep-sim-h{font-family:var(--display);font-size:21px;color:var(--card-head);margin-bottom:6px}
.ep-canvas{width:100%;height:auto;display:block;border-radius:10px;background:#fff}
.ep-simctl{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;margin:10px 0}
.ep-simctl input[type=range]{flex:1 1 220px;accent-color:var(--accent);height:30px;min-width:0}
.ep-chipbtn{border:3px solid #1d2433;background:#fff;color:#1d2433;border-radius:999px;padding:6px 14px;cursor:pointer;font-weight:700;font-size:15px}
.ep-chipbtn.on{background:var(--accent);color:var(--accent-ink);border-color:var(--accent-dark)}
.ep-check{display:flex;gap:8px;align-items:center;font-weight:700;font-size:16px}
.ep-check input{width:22px;height:22px;accent-color:var(--accent)}
.ep-simread{font-size:16px}
.ep-simview{display:flex;justify-content:center}
.ep-simpair{gap:10px;flex-wrap:wrap}.ep-simpair .ep-svg{flex:1 1 220px;width:auto;min-width:0}
.ep-hl{color:#b3261e}
.ep-bars{display:grid;gap:6px;margin:8px 0}
.ep-bars div{display:grid;grid-template-columns:150px 1fr 52px;gap:8px;align-items:center;font-size:15px;font-weight:700}
.ep-bars i{display:block;height:20px;border-radius:6px;background:var(--accent);border:2px solid #1d2433;transition:width .15s;min-width:2px}
.ep-bars div:nth-child(2) i{background:var(--accent2)}.ep-bars div:nth-child(3) i{background:#E4572E}
.ep-rise{animation:ep-rise 2s ease-in infinite}
@keyframes ep-rise{to{transform:translateY(-70px);opacity:0}}
.ep-chain{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;padding:6px}
.ep-chain-item{background:#fff;border:3px solid #1d2433;border-radius:10px;padding:6px 12px;font-weight:700;color:#1d2433}
.ep-chain-arrow{font-size:24px;font-weight:700;color:#1d2433}
.ep-qcard{margin-top:18px}
.ep-qhead{display:flex;align-items:center;gap:10px;justify-content:space-between;flex-wrap:wrap}
.ep-qcount{font-size:15px;color:var(--panel-dim);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.ep-dots{display:flex;gap:6px}
.ep-dots i{width:14px;height:14px;border-radius:50%;border:2px solid var(--panel-ink);opacity:.45}
.ep-dots i.done{background:var(--accent2);opacity:1}.ep-dots i.cur{opacity:1;background:var(--panel-ink)}
.ep-qtext{font-size:clamp(20px,3.6vw,23px);font-weight:700;margin:8px 0 14px;line-height:1.35}
.ep-tip{font-size:15px;color:var(--panel-dim);margin:0 0 8px}
.ep-fx{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.02;margin:0 2px;font-size:.92em}
.ep-fx span:first-child{border-bottom:2.5px solid currentColor;padding:0 3px}
.ep-opts{display:grid;gap:10px}
.ep-opts.two{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.ep-opts.tf{grid-template-columns:1fr 1fr}
.ep-opt{text-align:left;background:#fff;color:#111;border:3px solid #1d2433;border-radius:12px;padding:14px 16px;min-height:58px;cursor:pointer;font-size:19px;box-shadow:0 3px 0 rgba(0,0,0,.25)}
.ep-opts.tf .ep-opt{text-align:center;font-family:var(--display);font-size:24px}
.ep-opt.wrong{background:var(--bad-bg);border-color:var(--bad);text-decoration:line-through;color:#666;cursor:default;box-shadow:none}
.ep-opt.right{background:var(--good-bg);border-color:var(--good);font-weight:700}
.ep-answer{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:#fff;color:#111;border-radius:12px;padding:14px 16px}
.ep-unit{font-weight:700;font-size:20px}
.ep-box{width:78px;height:58px;text-align:center;font-family:var(--display);font-size:30px;border:3px solid #1d2433;border-radius:10px;background:#fff;color:#111}
.ep-box.whole{width:70px;height:70px}.ep-box.wide{width:min(280px,100%);font-size:24px;text-align:left;padding:0 12px;font-family:"Atkinson Hyperlegible",sans-serif;font-weight:700}
.ep-fracin{display:flex;align-items:center;gap:10px}.ep-fracin>div:first-child{display:flex;flex-direction:column;align-items:center;gap:4px}
.ep-visrow{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}.ep-visrow>.ep-vis{flex:1 1 180px;margin:12px 0}
.ep-stack{display:flex;flex-direction:column;align-items:center;gap:6px}
.ep-fbar{width:78px;height:4px;background:#111;border-radius:2px}
.ep-lbl{font-size:14px;text-align:center;opacity:.85}
.ep-answer .ep-lbl{color:#555;text-align:left;opacity:1}
.ep-fb{margin-top:12px;padding:12px 14px;border-radius:10px;font-size:17px;display:none}
.ep-fb.show{display:block}
.ep-fb.bad{background:var(--bad-bg);color:#5c0f11;border:2px solid var(--bad)}
.ep-fb.good{background:var(--good-bg);color:#153d14;border:2px solid var(--good)}
.ep-fb.warn{background:var(--warn-bg);color:#5a4200;border:2px solid #C99A00}
.ep-hintbox{margin-top:12px;font-size:17px;background:#FFE58A;color:#1d1d1d;padding:10px 14px;border-radius:10px;display:none;border:2px solid #C99A00}
.ep-hintbox.show{display:block}
.ep-teacher{background:#3b2a5c!important;color:#fff!important;border:2px dashed #b89cf0!important;box-shadow:none!important}
.ep-pool{display:flex;flex-wrap:wrap;gap:8px;min-height:58px;padding:10px;border-radius:12px;background:rgba(255,255,255,.12);border:2px dashed currentColor}
.ep-chip{display:inline-block;padding:9px 14px;border-radius:12px;border:3px solid #1d2433;background:#fff;color:#111;font-size:17px;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;box-shadow:0 3px 0 rgba(0,0,0,.25)}
.ep-chip.sel{outline:4px solid var(--accent2);outline-offset:2px}
.ep-buckets{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:12px}
.ep-bucket{border-radius:12px;border:3px solid #1d2433;background:#f7f7f2;color:#111;padding:10px;min-height:120px;cursor:pointer}
.ep-bucket-h{font-family:var(--display);font-size:19px;border-bottom:2px solid #1d2433;padding-bottom:6px;margin-bottom:8px;color:#111}
.ep-bucket-body{display:flex;flex-wrap:wrap;gap:6px}
.ep-ghost{position:fixed;z-index:200;pointer-events:none;opacity:.92;transform:rotate(-2deg);box-shadow:0 12px 24px rgba(0,0,0,.35);margin:0}
.ep-dragging{opacity:.35}
.ep-order{list-style:none;padding:0;margin:0;display:grid;gap:8px;counter-reset:ord}
.ep-ord{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;border:3px solid #1d2433;background:#fff;color:#111}
.ep-ord::before{counter-increment:ord;content:counter(ord);font-family:var(--display);font-size:21px;width:36px;height:36px;border-radius:50%;background:var(--accent2);display:grid;place-items:center;flex:none;color:#1d1d1d;border:2px solid #1d2433}
.ep-grip{cursor:grab;touch-action:none;font-weight:700;color:#8a8a8a;padding:6px 2px;user-select:none;-webkit-user-select:none;letter-spacing:-3px}
.ep-ordtxt{flex:1}
.ep-arrow{width:42px;height:42px;border-radius:10px;border:2px solid #1d2433;background:#f3f3f3;cursor:pointer;color:#111;flex:none}
.ep-arrow[disabled]{opacity:.3}
.ep-matchgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ep-mcol{display:grid;gap:8px;align-content:start}
.ep-mitem{position:relative;text-align:left;background:#fff;color:#111;border:3px solid #1d2433;border-radius:12px;padding:10px 12px;min-height:54px;cursor:pointer;font-size:16px}
.ep-mitem.sel{outline:4px solid var(--accent2);outline-offset:2px}
.ep-mitem.paired{border-color:var(--pc);box-shadow:inset 0 0 0 3px var(--pc);padding-left:44px}
.ep-mbadge{position:absolute;left:8px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;background:var(--pc);color:#fff;font-weight:700;display:grid;place-items:center;font-size:14px}
.ep-passage{background:#fffdf5;color:#1d2433;border-radius:12px;padding:16px 18px;line-height:1.9;font-size:18px}
.ep-passage.block .ep-seg{display:block;margin:4px 0}
.ep-seg{border-radius:6px;padding:2px 3px;cursor:pointer;border-bottom:2px dotted #9aa3b5;transition:background .12s}
.ep-seg:hover{background:#fff3b0}
.ep-seg.on{background:#ffe066;border-bottom:3px solid #d49b00;box-shadow:0 0 0 2px #ffe066}
.ep-seg.bad{background:#f8d6d3;text-decoration:line-through}
.ep-coinbank,.ep-tray,.ep-tilebank,.ep-slots-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;padding:10px;border-radius:12px}
.ep-tray,.ep-slots-row{background:rgba(255,255,255,.12);border:2px dashed currentColor;min-height:66px;margin:10px 0}
.ep-coinbtn{background:none;border:0;padding:0;cursor:pointer}
.ep-coinbtn[disabled]{cursor:default}
.ep-coin{display:grid;place-items:center;border-radius:50%;font-weight:700;color:#1d2433;border:3px solid #1d2433;box-shadow:0 3px 0 rgba(0,0,0,.3);font-size:14px}
.ep-coin-quarter{width:58px;height:58px;background:radial-gradient(circle at 35% 30%,#fff,#c9ced6 60%,#9aa2ad)}
.ep-coin-dime{width:44px;height:44px;background:radial-gradient(circle at 35% 30%,#fff,#c9ced6 60%,#9aa2ad)}
.ep-coin-nickel{width:52px;height:52px;background:radial-gradient(circle at 35% 30%,#f4f4f4,#b8bec8 60%,#8b93a0)}
.ep-coin-penny{width:48px;height:48px;background:radial-gradient(circle at 35% 30%,#f7c49a,#c47a45 60%,#8f4f25)}
.ep-coin-bill{width:84px;height:44px;border-radius:6px;background:linear-gradient(135deg,#dff0d0,#9fca86);font-size:17px}
.ep-tile{background:#fff;color:#111;border:3px solid #1d2433;border-radius:10px;padding:10px 14px;font-size:19px;font-weight:700;cursor:pointer;min-width:48px;box-shadow:0 3px 0 rgba(0,0,0,.25)}
.ep-tile[disabled]{opacity:.3;cursor:default}
.ep-tile.placed{background:#FFE58A;color:#1d1d1d}
.ep-tile.placed[disabled]{opacity:1}
.ep-joiner{font-weight:700;font-size:20px}
.ep-buildrow{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center}
.ep-buildrow .ep-vis{flex:1 1 260px;margin:0}
.ep-steppers{display:grid;gap:8px}
.ep-stepper{display:grid;grid-template-columns:96px 44px 44px 44px;align-items:center;gap:6px;font-weight:700}
.ep-stepper b{font-size:26px;text-align:center;font-variant-numeric:tabular-nums}
.ep-stepper button{width:44px;height:44px;border-radius:10px;border:3px solid #1d2433;background:#fff;color:#111;font-size:24px;font-weight:700;cursor:pointer;line-height:1}
.ep-stepper button[disabled]{opacity:.35}
.ep-eqline{text-align:center;font-family:var(--display);font-size:30px;margin:6px 0}
.ep-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:150;padding:20px}
.ep-overlay .ep-card{max-width:520px;width:100%;text-align:center}
.ep-bigdigit{font-family:var(--display);font-size:100px;line-height:1;margin:10px auto;color:var(--accent);width:150px;height:150px;border-radius:24px;border:5px solid #1d2433;display:grid;place-items:center;background:#fff}
.ep-pop{font-family:var(--display);font-size:36px;color:var(--good)}
.ep-panel .ep-pop{color:var(--accent2)}
@media (prefers-reduced-motion:no-preference){.ep-pop,.ep-overlay .ep-bigdigit{animation:ep-pop .45s cubic-bezier(.3,1.6,.5,1)}.ep-shake{animation:ep-shake .4s}}
@keyframes ep-pop{from{transform:scale(2);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes ep-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
.ep-keypad{display:flex;gap:10px;justify-content:center;margin:16px 0;flex-wrap:wrap}
.ep-keypad input{width:58px!important;height:74px;text-align:center;font-family:var(--display);font-size:40px!important;border:3px solid #1d2433;border-radius:10px;background:#fff;color:#111;text-transform:uppercase;padding:0!important}
.ep-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:16px 0}
.ep-stat{background:#fff;color:#1d2433;border:3px solid #1d2433;border-radius:10px;padding:10px;text-align:center;font-size:15px}
.ep-stat b{display:block;font-family:var(--display);font-size:30px;font-weight:400}
.ep-code{font-family:var(--display);font-size:32px;letter-spacing:.08em;background:#1d2433;color:#FFD166;padding:8px 18px;border-radius:12px;display:inline-block}
.ep-qr{display:grid;place-items:center;background:#fff;padding:16px;border-radius:10px;margin:12px auto;width:fit-content}
.ep-qr[hidden]{display:none}
.ep-qr img,.ep-qr canvas{max-width:100%;height:auto}
.ep-small{font-size:15px;color:var(--muted)}
.ep-card .ep-small{color:inherit;opacity:.75}
.ep-confetti{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:160}
.ep-confetti i{position:absolute;top:-20px;width:10px;height:16px;border-radius:2px;animation:ep-fall linear forwards}
@keyframes ep-fall{to{transform:translateY(110vh) rotate(720deg)}}
.ep-teachmode .ep-wrap{max-width:1000px}.ep-teachmode .ep-stagecard{font-size:22px}.ep-teachmode .ep-stagecard h2{font-size:clamp(30px,5vw,44px)}
.ep-say{background:rgba(255,209,102,.25);border-left:6px solid var(--accent2);padding:10px 14px;border-radius:0 10px 10px 0}
.ep-notebox{border:3px dashed var(--line);border-radius:12px;padding:10px 14px}
.ep-stepdots{display:flex;gap:6px}.ep-stepdots i{width:14px;height:14px;border-radius:50%;border:2px solid currentColor;opacity:.5}.ep-stepdots i.cur{background:var(--accent2);opacity:1}.ep-stepdots i.done{background:currentColor;opacity:.8}
.ep-exhibit{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:18px;align-items:start;margin-bottom:18px}
.ep-gframe{display:block;padding:14px;background:linear-gradient(135deg,#b8862b,#f3d27a 40%,#a8741c 70%,#e6c066);border-radius:6px;box-shadow:0 12px 26px rgba(0,0,0,.35),inset 0 0 0 2px rgba(0,0,0,.25)}
.ep-gframe.sm{padding:8px}
.ep-mat{display:block;background:#f7f2e6;padding:12px;box-shadow:inset 0 0 8px rgba(0,0,0,.25)}
.ep-gframe.sm .ep-mat{padding:6px}
.ep-art{position:relative;display:block;line-height:0}.ep-art svg{width:100%;height:auto;display:block}
.ep-spot{position:absolute;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;border:3px solid #fff;background:#C8272D;color:#fff;font:700 17px/1 "Atkinson Hyperlegible",sans-serif;cursor:pointer;box-shadow:0 0 0 3px rgba(200,39,45,.35),0 3px 8px rgba(0,0,0,.35);animation:ep-pulse 1.8s infinite}
.ep-spot.found{background:#1f7a3a;animation:none;box-shadow:0 2px 6px rgba(0,0,0,.3)}
@keyframes ep-pulse{50%{box-shadow:0 0 0 10px rgba(200,39,45,0),0 3px 8px rgba(0,0,0,.35)}}
.ep-plaque{background:#fffdf6;color:#2a2418;border:1px solid #d9cfb8;border-radius:4px;padding:16px 18px;box-shadow:0 6px 16px rgba(0,0,0,.2);font-size:17px}
.ep-plaque h2{font-family:var(--display);font-weight:400;font-size:28px;margin:4px 0 2px;color:#2a2418;line-height:1.1}
.ep-plaque .ep-kicker{color:#7a6a45;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.ep-medium{font-style:italic;color:#6b5d40;margin:0 0 10px;font-size:15px}
.ep-look{background:#fff3cf;border-radius:8px;padding:8px 10px;font-size:15px}.ep-found{display:inline-block;margin-left:6px;font-weight:700;color:#1f7a3a}
.ep-facts{margin:10px 0 0;padding-left:0;list-style:none;display:grid;gap:8px;font-size:15px;line-height:1.4}
.ep-facts li.hid{color:#b3a78c}.ep-facts li.new{animation:ep-glow 1.2s}
@keyframes ep-glow{0%{background:#fff3cf}100%{background:transparent}}
.ep-placardcard{margin-bottom:18px}
.ep-gnotes{margin-bottom:18px}.ep-gnrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.ep-gnote{display:flex;flex-direction:column;gap:2px}.ep-gnote b{font-size:18px}.ep-gnote span{font-size:13px;opacity:.75}
.ep-gnote textarea{font:inherit;font-size:16px;border:2px solid #9aa3b5;border-radius:10px;padding:8px;background:#fff;color:#1d2433;resize:vertical}
.ep-lockedq{text-align:center;opacity:.85}
.ep-hall{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:26px 20px;padding:22px 18px 26px;background:linear-gradient(#0000 88%,rgba(0,0,0,.18) 88%),var(--card);border:3px solid var(--line);border-radius:var(--r);margin-bottom:6px}
.ep-hallframe{display:flex;flex-direction:column;align-items:center;gap:10px;background:none;border:0;cursor:pointer;padding:0;color:var(--card-ink);font:inherit}
.ep-hallframe:hover .ep-gframe{transform:translateY(-3px)}.ep-hallframe .ep-gframe{transition:transform .15s;width:100%}
.ep-hplaque{background:#fffdf6;color:#2a2418;border:1px solid #d9cfb8;border-radius:3px;padding:6px 10px;font-size:14px;text-align:center;display:flex;flex-direction:column;box-shadow:0 2px 6px rgba(0,0,0,.15)}
.ep-hallframe.done .ep-hplaque span{color:#1f7a3a;font-weight:700}
.ep-hallnote{text-align:center;margin:0 0 16px}
@media (max-width:760px){.ep-exhibit{grid-template-columns:1fr}.ep-gnrow{grid-template-columns:1fr}.ep-spot{width:32px;height:32px;font-size:15px}}
.ep-i{width:1.1em;height:1.1em;flex:none;vertical-align:-.18em}
.ep-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.ep-pill{display:inline-flex;align-items:center;gap:5px}
.ep-xp{background:var(--accent2);color:#1d1d1d;border-color:#1d1d1d}.ep-xp strong{color:#1d1d1d}
.ep-streak.hot{background:#E4572E;color:#fff;border-color:#8e1a1f}.ep-streak.hot strong{color:#fff}
.ep-lvl{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:6px;padding:2px 8px;background:#1d2433;color:#fff;margin-left:4px}
.ep-lvl.lv-explorer,.ep-level.lv-explorer .ep-lvtag{background:#23A26A;color:#fff}.ep-lvl.lv-legend,.ep-level.lv-legend .ep-lvtag{background:#6C3FC9;color:#fff}.ep-level.lv-agent .ep-lvtag{background:#1F6FD1;color:#fff}
.ep-supbtn{min-height:40px;font-size:16px;padding:6px 14px}
.ep-levels{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px}
.ep-level{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;cursor:pointer;border:3px solid var(--line);background:rgba(255,255,255,.6);color:var(--card-ink);border-radius:14px;padding:12px 14px;font-size:15px;line-height:1.35}
.ep-level b{font-family:var(--display);font-weight:400;font-size:22px}
.ep-lvtag{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-radius:6px;padding:2px 8px}
.ep-level[aria-checked=true]{outline:5px solid var(--accent);outline-offset:2px;background:#fff}
.ep-level[disabled]{opacity:.4;cursor:not-allowed}
.ep-listen{float:right;display:inline-flex;align-items:center;gap:6px;border:2px solid currentColor;background:transparent;border-radius:999px;padding:4px 12px;font-size:14px;font-weight:700;cursor:pointer;margin:0 0 6px 10px}
.ep-qhead .ep-listen{float:none;margin:0 0 0 auto}
.ep-toast{position:fixed;left:50%;top:16%;background:var(--accent2);color:#1d1d1d;font-family:var(--display);font-size:32px;padding:10px 24px;border-radius:999px;border:3px solid #1d1d1d;z-index:158;pointer-events:none;animation:ep-toast 1.7s forwards;white-space:nowrap;box-shadow:0 6px 0 rgba(0,0,0,.25)}
.ep-toast small{font-family:"Atkinson Hyperlegible",sans-serif;font-size:16px;font-weight:700;margin-left:6px}
@keyframes ep-toast{0%{opacity:0;transform:translate(-50%,24px) scale(.7)}14%{opacity:1;transform:translate(-50%,0) scale(1.06)}24%{transform:translate(-50%,0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-34px)}}
.ep-gain{display:inline-block;background:var(--accent2);color:#1d1d1d;border-radius:999px;padding:0 10px;font-weight:700}
.ep-drawer-wrap{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:155}
.ep-drawer{position:absolute;top:0;right:0;bottom:0;width:min(430px,100%);overflow:auto;background:#fff;color:#1d2433;padding:20px 20px 40px;border-left:4px solid #1d2433;box-shadow:-10px 0 30px rgba(0,0,0,.3);font-size:17px}
.ep-drawer h2{font-family:var(--display);font-weight:400;font-size:30px}
.ep-drawer h3{font-size:14px;letter-spacing:.1em;text-transform:uppercase;margin:20px 0 8px;color:#5d6475}
.ep-drawer .ep-small{color:#5d6475}
.ep-drawer .ep-btn.plain{color:#1d2433}
.ep-tog{display:flex;width:100%;justify-content:space-between;align-items:center;gap:12px;text-align:left;border:2px solid #d5dae4;background:#f7f8fb;color:#1d2433;border-radius:12px;padding:10px 12px;margin:6px 0;cursor:pointer}
.ep-tog i{flex:none;width:46px;height:26px;border-radius:999px;background:#c5cbd8;position:relative;transition:background .15s}
.ep-tog i::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .15s}
.ep-tog[aria-pressed=true]{border-color:#1F6FD1;background:#EAF2FF}.ep-tog[aria-pressed=true] i{background:#1F6FD1}.ep-tog[aria-pressed=true] i::after{left:23px}
.ep-vocab{margin:0;display:grid;gap:6px}.ep-vocab dt{font-weight:700}.ep-vocab dd{margin:0 0 6px;color:#3d4556}
.ep-notes,.ep-write textarea,.ep-worktext{width:100%;font:inherit;font-size:17px;line-height:1.45;border:2px solid #9aa3b5;border-radius:10px;padding:10px 12px;background:#fff;color:#1d2433;resize:vertical}
.ep-calc{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.ep-calc input{flex:1;min-width:140px}.ep-calc output{font-weight:700;font-size:20px;min-width:80px}
.ep-s-big .ep-wrap{zoom:1.16}
.ep-s-easy{letter-spacing:.035em;word-spacing:.18em}.ep-s-easy p,.ep-s-easy li,.ep-s-easy .ep-qtext{line-height:1.85}
.ep-s-contrast{--card:#fff;--card-ink:#000;--card-head:#000;--ink:#000;--muted:#1d1d1d;--panel:#000;--panel-ink:#fff;--panel-dim:#fff;--bg:#fff;--bg-img:none;--line:#000}
.ep-ruler{position:fixed;left:0;right:0;height:44px;pointer-events:none;z-index:140;box-shadow:0 0 0 100vmax rgba(0,0,0,.38);border-top:3px solid #FFD166;border-bottom:3px solid #FFD166}
.ep-hubvis{margin:0 0 20px}.ep-hubvis>svg{width:100%;height:auto;display:block;overflow:visible}
.ep-hn{cursor:pointer;outline:none}.ep-hn.locked{opacity:.4;cursor:not-allowed}
.ep-hn:hover:not(.locked)>*:first-child,.ep-hn:focus-visible>*:first-child{filter:brightness(1.08)}
.ep-hn:focus-visible{outline:3px solid var(--accent2)}
.hv-ink{fill:var(--ink);font-weight:700}.hv-ink.b,.hv-cardink.b{font-weight:800;letter-spacing:.08em}
.hv-cardink{fill:#1d2433;font-weight:700}
.hv-trail{fill:none;stroke:var(--ink);stroke-width:5;stroke-dasharray:4 10;stroke-linecap:round;opacity:.45}
.hv-node{fill:var(--card);stroke:var(--line);stroke-width:3.5}.hv-node.done{fill:var(--good)}.hv-node.cur{fill:var(--accent2);stroke-width:5}
.hv-num{fill:var(--card-ink);font-weight:800}.done>.hv-num,.ep-hn.done .hv-num{fill:#fff}
.hv-mat{fill:#FFFDF4;opacity:.8;stroke:var(--line);stroke-width:2}
.hv-pawn circle,.hv-pawn path{fill:var(--accent);stroke:#1d1d1d;stroke-width:3}
.hv-shackle{fill:none;stroke:#9aa0a8;stroke-width:12;stroke-linecap:round}
.hv-body{fill:var(--accent);stroke:#1d1d1d;stroke-width:3.5}.hv-body.done{fill:var(--good)}.hv-body.cur{fill:var(--accent2)}
.hv-hole{fill:#1d1d1d}.hv-digit{fill:#fff;font-weight:800}
.hv-cork{fill:#B98A55;stroke:#6b4a26;stroke-width:6}
.hv-card{fill:#FFFDF4;stroke:#6b5a3a;stroke-width:1.5;filter:drop-shadow(0 3px 2px rgba(0,0,0,.3))}.hv-card.verdict{fill:#FFF1B8}
.hv-pin{fill:#C8272D;stroke:#6b1111;stroke-width:2}
.hv-string{stroke:#C8272D;stroke-width:3;fill:none}
.hv-solved{fill:none;stroke:#C8272D;stroke-width:3}.hv-solvedt{fill:#C8272D;font-weight:800;letter-spacing:.12em}
.hv-floor{fill:#EDE3CF;stroke:#6b5646;stroke-width:5}.hv-lobby{fill:#D8C9A8;stroke:#6b5646;stroke-width:2;stroke-dasharray:6 5}
.hv-room{fill:#FFFDF4;stroke:#6b5646;stroke-width:4}.hv-room.done{fill:#FFE9A8}
.hv-door{fill:#EDE3CF}.hv-letter{fill:#6b5646;font-weight:800}
.hv-stampc{fill:none;stroke:#C8272D;stroke-width:3}.hv-stamps{fill:#C8272D}
.ep-stamps{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:10px}
.ep-stamp{width:86px;height:86px;border-radius:50%;border:3px dashed var(--muted);display:grid;place-items:center;align-content:center;text-align:center;font-size:12px;color:var(--muted);transform:rotate(var(--rot,0deg))}
.ep-stamp .ep-i{width:26px;height:26px}
.ep-stamp.on{border:4px double #C8272D;color:#C8272D;background:rgba(255,255,255,.7)}
.ep-stamp.big{width:120px;height:120px;margin:6px auto 10px;font-size:14px}.ep-stamp.big .ep-i{width:40px;height:40px}
.ep-boss{display:grid;grid-template-columns:130px 1fr;gap:16px;align-items:center;background:var(--card);color:var(--card-ink);border:3px solid var(--line);border-radius:var(--r);padding:14px 18px;margin-bottom:10px}
.ep-bosspic{width:130px;height:130px;animation:ep-bob 2.4s ease-in-out infinite}.ep-bosspic.dead{animation:none;transform:rotate(-12deg);opacity:.75}
.ep-card>.ep-bosspic{display:block;margin:0 auto}
@keyframes ep-bob{50%{transform:translateY(-6px)}}
.hv-boss{fill:var(--accent);stroke:#1d1d1d;stroke-width:4}.hv-horn{fill:var(--accent2);stroke:#1d1d1d;stroke-width:3;stroke-linejoin:round}
.ep-bossname{font-family:var(--display);font-size:28px;line-height:1.05;margin-bottom:6px}
.ep-hp{height:22px;border:3px solid #1d1d1d;border-radius:999px;background:#fff;overflow:hidden;margin:4px 0}.ep-hp i{display:block;height:100%;background:linear-gradient(90deg,#E4572E,#F2B84B);transition:width .4s}
.ep-hp.sm{height:14px;width:120px;border-width:2px;display:inline-block;vertical-align:middle;margin:0}
.ep-taunt{font-style:italic;margin:6px 0 0}
.ep-hearts{display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin:-4px 0 12px;color:#E4572E}.ep-hearts .ep-i{width:28px;height:28px}.ep-hearts .lost{opacity:.22;filter:grayscale(1)}
.ep-bossmini{margin-left:auto;display:inline-flex;gap:8px;align-items:center;font-size:14px;font-weight:700;color:var(--ink)}
.ep-wcard .ep-qtext{font-size:clamp(19px,3.2vw,21px)}
.ep-evbank{background:rgba(255,255,255,.1);border:2px dashed var(--panel-dim);border-radius:12px;padding:10px 12px;margin:0 0 12px}
.ep-evh{font-size:14px;font-weight:700;margin-bottom:6px;color:var(--panel-dim)}
.ep-chips{display:flex;flex-wrap:wrap;gap:8px}
.ep-chip.data{background:#E3F0FF;border-color:#1F6FD1}
.ep-chip{background:#FFF4C2;border:2px solid #C99A00;color:#1d2433;border-radius:10px;padding:6px 10px;font-size:15px;text-align:left;cursor:pointer;line-height:1.3}
.ep-write{display:grid;gap:12px}
.ep-wpart{background:#fff;color:#1d2433;border-radius:12px;padding:12px 14px;border:3px solid #1d2433}
.ep-wlab{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;line-height:1.3}
.ep-wk{display:inline-grid;place-items:center;min-width:36px;height:36px;border-radius:9px;background:var(--accent);color:var(--accent-ink);font-family:var(--display);font-size:22px;font-weight:400;margin-right:8px;flex:none}
.ep-wtip{font-size:14px;color:#5d6475}
.ep-starter{margin-top:6px;font-size:14px;border:2px solid #9aa3b5;background:#f2f4f8;color:#1d2433;border-radius:999px;padding:4px 12px;cursor:pointer}
.ep-ck{list-style:none;padding:0;margin:8px 0 0;font-size:14px;display:flex;flex-wrap:wrap;gap:4px 14px;color:#6b7280}
.ep-ck li::before{content:"○ ";font-weight:700}.ep-ck li.ok{color:#1f6b2a;font-weight:700}.ep-ck li.ok::before{content:"✓ "}
.ep-wdone{background:#fff;color:#1d2433;border-radius:12px;padding:12px 14px}.ep-wdone p{margin:0 0 8px;display:flex;gap:6px;align-items:flex-start}
.ep-model{margin-top:12px;background:rgba(255,255,255,.12);border-radius:12px;padding:10px 14px}.ep-model summary{cursor:pointer;font-weight:700}.ep-model p{margin:8px 0}
.ep-rank{font-size:20px;margin:10px 0}
.ep-badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;margin:8px 0 6px}
.ep-badge{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:13px;line-height:1.25}.ep-badge svg{width:62px;height:62px}.ep-badge b{font-size:14px}.ep-badge span{opacity:.8}
.ep-badge.off{opacity:.32;filter:grayscale(1)}
.ep-turnin{margin-top:18px}.ep-worktext{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;min-height:220px}
@media (max-width:640px){.ep-levels{grid-template-columns:1fr}.ep-boss{grid-template-columns:90px 1fr}.ep-bosspic{width:90px;height:90px}.ep-toast{font-size:24px}}
@media print{.ep-turnin textarea{border:0;height:auto;min-height:0;overflow:visible}.ep-supbtn,.ep-listen{display:none!important}}
@media (prefers-reduced-motion:reduce){.ep *{animation:none!important;transition:none!important}.ep-confetti{display:none}}
@media (max-width:560px){.ep{font-size:18px}.ep-wrap{padding:14px 16px 48px}.ep-panel,.ep-card{padding:16px}.ep-hero{gap:12px}.ep-emblem{width:62px;height:62px}.ep-bars div{grid-template-columns:104px 1fr 46px}.ep-matchgrid{gap:8px}.ep-mitem{font-size:15px;padding:8px}.ep-mitem.paired{padding-left:38px}.ep-stepper{grid-template-columns:84px 42px 40px 42px}}
@media print{.ep{background:#fff!important}.ep-band,.ep-noprint,.ep-status{display:none!important}}
`;
  function themeCSS(id, t) { return '.ep.th-' + id + '{' + Object.keys(t.v).map(function (k) { return '--' + k + ':' + t.v[k]; }).join(';') + ';--display:"' + t.font + '","Atkinson Hyperlegible",system-ui,sans-serif}' + (t.css || '').replace(/\.th-/g, '.ep.th-'); }
  if (!document.getElementById('ep-style')) { var st = document.createElement('style'); st.id = 'ep-style'; st.textContent = CSS; document.head.appendChild(st); }
  if (!document.getElementById('ep-theme-' + themeId)) { var ts = document.createElement('style'); ts.id = 'ep-theme-' + themeId; ts.textContent = themeCSS(themeId, TH); document.head.appendChild(ts); }
  if (!document.getElementById('ep-font-' + themeId)) {
    var lk = document.createElement('link'); lk.id = 'ep-font-' + themeId; lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=' + TH.gf + '&family=Atkinson+Hyperlegible:wght@400;700&display=swap';
    document.head.appendChild(lk);
  }
  if (opts.stylesOnly) return themeId;

  /* ---------- state ---------- */
  var KEY = 'crossroads-escape-v2:' + room.id;
  function blank() { return { name: '', started: false, elapsed: 0, solved: {}, firstTry: {}, tries: {}, hinted: {}, done: [], pi: {}, wrong: 0, finished: false, screen: 'start', current: 0, level: presetLevel() || 'agent', xp: 0, streak: 0, best: 0, hearts: {}, removed: {}, removesUsed: 0, drafts: {}, writing: {}, notes: '', sup: {}, gains: {}, spots: {}, gnotes: {}, studied: {} }; }
  var S = blank();
  if (!opts.preview) { try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.solved) S = Object.assign(blank(), saved); } catch (e) { } }
  if (presetLevel()) S.level = presetLevel();
  if (!LEVELS[S.level]) S.level = 'agent';
  function save() { if (opts.preview) return; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  var saveTimer = null;
  function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 600); }
  if (S.finished) S.screen = 'done'; else if (!S.started) S.screen = 'start'; else if (S.screen !== 'stage' && S.screen !== 'final') S.screen = 'hub';
  if (opts.teach) { S.started = true; S.name = 'Class'; S.screen = 'stage'; S.current = 0; }
  var work = {}, tick = null, hintShown = {};

  var root = document.createElement('div');
  root.className = 'ep th-' + themeId + ' ep-f-' + (room.format || 'escape') + ' ep-g-' + GAME + (opts.teach ? ' ep-teachmode' : '');
  mount.innerHTML = ''; mount.appendChild(root);

  function totalPuzzles() { return stages.reduce(function (n, s) { return n + s.puzzles.length; }, 0); }
  function stageOpen(i) { return !fmt.ordered || i === 0 || S.done[i - 1] || opts.preview; }
  function allDone() { return stages.every(function (_, i) { return S.done[i]; }); }
  function emblem(cls) { return '<svg class="ep-emblem ' + (cls || '') + '" viewBox="0 0 64 64" aria-hidden="true">' + TH.emblem + '</svg>'; }
  function writeTasks() { var out = []; stages.forEach(function (s, i) { s.puzzles.forEach(function (p, j) { if (p.type === 'write') out.push({ p: p, key: i + '-' + j }); }); }); return out; }

  /* supports: display toggles, reading ruler, read-aloud */
  function applySup() {
    ['big', 'easy', 'contrast'].forEach(function (k) { root.classList.toggle('ep-s-' + k, !!S.sup[k]); });
    var r = root.querySelector('.ep-ruler');
    if (S.sup.ruler && !r) { r = document.createElement('div'); r.className = 'ep-ruler'; r.style.top = '40%'; root.appendChild(r); }
    if (!S.sup.ruler && r) r.remove();
  }
  document.addEventListener('pointermove', function (e) { var r = root.querySelector('.ep-ruler'); if (r) r.style.top = (e.clientY - 22) + 'px'; });
  function readable(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll('.ep-listen,svg,.ep-hintbox:not(.show),.ep-fb:not(.show),textarea,input,.ep-status,[data-hint],[data-check],[data-solve],[data-next],[data-rm2],.ep-starter').forEach(function (x) { x.remove(); });
    return c.textContent;
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-say]');
    if (b) { var t = b.getAttribute('data-say'), el = t === 'stage' ? root.querySelector('.ep-stagecard') : root.querySelector('.ep-qcard'); if (el) speak(readable(el)); return; }
    if (S.sup.tap && e.target.closest && !e.target.closest('button,input,textarea,a,select,summary,.ep-seg,.ep-t,.ep-drawer')) {
      var p = e.target.closest('p,li,h1,h2,h3,.ep-qtext,figcaption,blockquote,td,th,dd,dt'); if (p) speak(readable(p));
    }
  });
  function listenBtn(what) { return canSpeak ? '<button type="button" class="ep-listen" data-say="' + what + '" aria-label="Listen: read this aloud">' + ICON.speaker + '<span>Listen</span></button>' : ''; }

  function startTimer() {
    if (tick) return;
    var last = Date.now();
    tick = setInterval(function () {
      if (!root.isConnected) { clearInterval(tick); return; }
      var now = Date.now();
      if (!S.finished && S.started && document.visibilityState !== 'hidden') S.elapsed += (now - last) / 1000;
      last = now;
      var c = root.querySelector('#ep-clock'); if (c) c.textContent = fmtTime(S.elapsed);
      if (Math.floor(S.elapsed) % 5 === 0) save();
    }, 1000);
  }
  function pieceWord() { return { board: 'Stamps', museum: 'Stamps', 'case': 'Files', boss: 'Levels', locks: 'Code pieces' }[GAME] || 'Pieces'; }
  function statusBar() {
    var L = curLevel();
    if (opts.teach) return '<div class="ep-status" id="ep-status"><span class="ep-lvl">Mini-lesson presenter</span><span class="ep-spacer"></span><span class="ep-pill">Step <strong>' + (S.current + 1) + ' of ' + stages.length + '</strong></span><button type="button" class="ep-btn small ep-supbtn" data-sup>' + ICON.tools + 'Supports</button>' + (opts.onExit ? '<button type="button" class="ep-btn plain small" data-exit>Close presenter</button>' : '') + '</div>';
    return '<div class="ep-status" id="ep-status"><span>' + (S.name ? 'Player: <strong>' + esc(S.name) + '</strong> ' : '') + '<span class="ep-lvl lv-' + L.id + '">' + esc(L.name) + '</span></span><span class="ep-spacer"></span>' +
      '<span class="ep-pill ep-xp" title="Experience points">' + ICON.xp + '<strong>' + S.xp + '</strong> XP</span>' +
      '<span class="ep-pill ep-streak' + (S.streak >= 3 ? ' hot' : '') + '" title="First-try streak">' + ICON.flame + '<strong>' + S.streak + '</strong><span class="ep-sr"> in a row</span></span>' +
      '<span class="ep-pill">Time <strong id="ep-clock">' + fmtTime(S.elapsed) + '</strong></span>' +
      '<span class="ep-pill">' + esc(pieceWord()) + ' <strong>' + S.done.filter(Boolean).length + '/' + stages.length + '</strong></span>' +
      '<button type="button" class="ep-btn small ep-supbtn" data-sup>' + ICON.tools + 'Supports</button>' +
      (opts.onExit ? '<button type="button" class="ep-btn plain small" data-exit>Exit preview</button>' : '') + '</div>';
  }
  function scrollTop() { try { (root.closest('.cx-play-scroll') || window).scrollTo(0, 0); } catch (e) { window.scrollTo(0, 0); } }
  function go(screen, i) { hush(); S.screen = screen; if (i != null) S.current = i; save(); render(); scrollTop(); }
  function bindCommon() {
    root.querySelectorAll('[data-exit]').forEach(function (b) { b.onclick = function () { hush(); if (tick) clearInterval(tick); if (opts.onExit) opts.onExit(); }; });
    root.querySelectorAll('[data-sup]').forEach(function (b) { b.onclick = openSupports; });
  }
  function refreshStatus() { var st = root.querySelector('#ep-status'); if (st) { st.outerHTML = statusBar(); bindCommon(); } }
  function toast(html) {
    var t = document.createElement('div'); t.className = 'ep-toast'; t.setAttribute('role', 'status'); t.innerHTML = html;
    root.appendChild(t); setTimeout(function () { t.remove(); }, 1700);
  }

  function openSupports() {
    var L = curLevel(), ov = document.createElement('div'); ov.className = 'ep-drawer-wrap';
    var vocab = room.vocab || [], calcOK = !isMath || L.calc;
    function tog(k, name, sub) { return '<button type="button" class="ep-tog" data-tog="' + k + '" aria-pressed="' + !!S.sup[k] + '"><span><b>' + name + '</b><br><span class="ep-small">' + sub + '</span></span><i aria-hidden="true"></i></button>'; }
    ov.innerHTML = '<div class="ep-drawer" role="dialog" aria-label="Student supports"><div class="ep-row"><h2 style="margin:0">Supports</h2><span class="ep-spacer"></span><button type="button" class="ep-btn plain small" data-close>Close</button></div>' +
      '<p class="ep-small">Use any of these tools, any time. They never lower your score.</p>' +
      (canSpeak ? '<h3>Listen</h3><div class="ep-row"><button type="button" class="ep-btn small" data-read>' + ICON.speaker + 'Read this page</button><button type="button" class="ep-btn plain small" data-hush>Stop</button></div>' + tog('tap', 'Tap to hear', 'Tap any sentence to hear it read aloud.') : '') +
      '<h3>See</h3>' + tog('big', 'Bigger text', 'Makes everything larger.') + tog('easy', 'Easy-read spacing', 'More space between letters, words, and lines.') + tog('contrast', 'High contrast', 'Black text on white cards.') + tog('ruler', 'Reading ruler', 'A bright strip follows your pointer so you can track each line.') +
      (vocab.length ? '<h3>Word bank</h3><dl class="ep-vocab">' + vocab.map(function (v) { return '<dt>' + esc(v[0]) + '</dt><dd>' + esc(v[1]) + '</dd>'; }).join('') + '</dl>' : '') +
      '<h3>Scratch pad</h3><textarea class="ep-notes" data-notes rows="5" placeholder="Jot notes, list clues, or plan your writing.">' + esc(S.notes || '') + '</textarea>' +
      (calcOK ? '<h3>Calculator</h3><div class="ep-calc"><input type="text" data-cin aria-label="Calculator" placeholder="e.g. 18 ÷ 4" inputmode="decimal"><button type="button" class="ep-btn small" data-calc>=</button><output data-cout></output></div>' : '<p class="ep-small"><b>Calculator:</b> available at the Explorer level. At this level, show your thinking on the scratch pad.</p>') +
      '<h3>Mission level: ' + esc(L.name) + '</h3><p class="ep-small">' + esc(L.desc) + '</p>' +
      '<p class="ep-small">"Remove 2" power-ups left: <b>' + (L.removes > 20 ? 'unlimited' : Math.max(0, L.removes - (S.removesUsed || 0))) + '</b> · Hint cost: <b>' + (L.hintCost ? L.hintCost + ' XP' : 'free') + '</b></p></div>';
    root.appendChild(ov);
    function close() { ov.remove(); }
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    ov.querySelector('[data-close]').onclick = close; ov.querySelector('[data-close]').focus();
    ov.querySelectorAll('[data-tog]').forEach(function (b) { b.onclick = function () { var k = b.getAttribute('data-tog'); S.sup[k] = !S.sup[k]; b.setAttribute('aria-pressed', !!S.sup[k]); applySup(); save(); }; });
    var rd = ov.querySelector('[data-read]'); if (rd) rd.onclick = function () { close(); speak(readable(root.querySelector('.ep-wrap'))); };
    var hs = ov.querySelector('[data-hush]'); if (hs) hs.onclick = hush;
    var nt = ov.querySelector('[data-notes]'); nt.addEventListener('input', function () { S.notes = nt.value; saveSoon(); });
    var cb = ov.querySelector('[data-calc]');
    if (cb) {
      var ci = ov.querySelector('[data-cin]'), co = ov.querySelector('[data-cout]');
      var calc = function () {
        var ex = ci.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-').replace(/[x]/gi, '*').replace(/,/g, '');
        if (!/^[\d+\-*/().\s]+$/.test(ex)) { co.textContent = 'Use numbers and + − × ÷ only'; return; }
        try { var v = Function('"use strict";return (' + ex + ')')(); co.textContent = isFinite(v) ? '= ' + (Math.round(v * 1e6) / 1e6) : 'Error'; } catch (er) { co.textContent = 'Error'; }
      };
      cb.onclick = calc; ci.addEventListener('keydown', function (e) { if (e.key === 'Enter') calc(); });
    }
  }

  /* ---------- hub pictures: a different game board for each format ---------- */
  function wrapLines(s, n, max) {
    var words = String(s).split(/\s+/), lines = [], cur = '';
    words.forEach(function (x) { if ((cur + ' ' + x).trim().length > n && cur) { lines.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); });
    if (cur) lines.push(cur);
    if (lines.length > max) { lines = lines.slice(0, max); lines[max - 1] = lines[max - 1].replace(/\s*\S*$/, '') + '…'; }
    return lines;
  }
  function tx(x, y, lines, size, cls, lh) { return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" class="' + (cls || 'hv-ink') + '">' + lines.map(function (l, k) { return '<tspan x="' + x + '" dy="' + (k ? (lh || size * 1.2) : 0) + '">' + esc(l) + '</tspan>'; }).join('') + '</text>'; }
  function nodeState(i) { return S.done[i] ? 'done' : !stageOpen(i) ? 'locked' : 'open'; }
  function curStage() { for (var i = 0; i < stages.length; i++) if (!S.done[i] && stageOpen(i)) return i; return -1; }
  function hn(i, inner) { var st = nodeState(i); return '<g class="ep-hn ' + st + '" data-i="' + i + '" tabindex="' + (st === 'locked' ? -1 : 0) + '" role="button" aria-label="' + esc(nodeName(i) + ': ' + stageTitle(i) + (st === 'done' ? ' (done)' : st === 'locked' ? ' (locked)' : '')) + '">' + inner + '</g>'; }
  function hsvg(w, h, body, label) { return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="group" aria-label="' + esc(label) + '">' + body + '</svg>'; }
  function bossHP() { var t = totalPuzzles(), left = 0; stages.forEach(function (s, i) { s.puzzles.forEach(function (_, j) { if (!S.solved[i + '-' + j]) left++; }); }); return t ? left / t : 0; }
  function bossSVG(f) {
    var dead = f <= 0, eye = dead ? '<path d="M44,50 l12,12 M56,50 l-12,12 M84,50 l12,12 M96,50 l-12,12" stroke="#1d1d1d" stroke-width="5" stroke-linecap="round"/>' : '<circle cx="50" cy="56" r="11" fill="#fff" stroke="#1d1d1d" stroke-width="3"/><circle cx="90" cy="56" r="11" fill="#fff" stroke="#1d1d1d" stroke-width="3"/><circle cx="' + (f < .4 ? 47 : 53) + '" cy="58" r="5" fill="#1d1d1d"/><circle cx="' + (f < .4 ? 87 : 93) + '" cy="58" r="5" fill="#1d1d1d"/><path d="M38,40 l20,8 M102,40 l-20,8" stroke="#1d1d1d" stroke-width="5" stroke-linecap="round"/>';
    return '<svg class="ep-bosspic' + (dead ? ' dead' : '') + '" viewBox="0 0 140 140" aria-hidden="true"><path d="M30,40 L22,8 L50,28 Z M110,40 L118,8 L90,28 Z" class="hv-horn"/><path d="M20,70 C20,30 120,30 120,70 C120,100 110,128 70,128 C30,128 20,100 20,70 Z" class="hv-boss"/>' + eye +
      (dead ? '<path d="M50,100 Q70,88 90,100" fill="none" stroke="#1d1d1d" stroke-width="5" stroke-linecap="round"/>' : '<path d="M44,92 L54,104 L62,94 L70,106 L78,94 L86,104 L96,92 Z" fill="#fff" stroke="#1d1d1d" stroke-width="3" stroke-linejoin="round"/>') + '</svg>';
  }
  function pathNodes(n, W, top, bot) { var pts = []; for (var i = 0; i < n; i++) pts.push([Math.round(50 + i * (W - 100) / Math.max(1, n - 1)), i % 2 ? top : bot]); return pts; }
  function trail(pts) { var d = 'M' + pts[0][0] + ',' + pts[0][1]; for (var i = 1; i < pts.length; i++) { var mx = (pts[i - 1][0] + pts[i][0]) / 2; d += ' C' + mx + ',' + pts[i - 1][1] + ' ' + mx + ',' + pts[i][1] + ' ' + pts[i][0] + ',' + pts[i][1]; } return '<path d="' + d + '" class="hv-trail"/>'; }
  function hubVisual() {
    var n = stages.length, cur = curStage(), b = '';
    if (GAME === 'locks') {
      var W = n * 120 + 20;
      stages.forEach(function (_, i) {
        var x = 20 + i * 120, d = S.done[i];
        b += hn(i, '<path d="' + (d ? 'M' + (x + 28) + ',60 v-24 a22 22 0 0 1 44 0 v6' : 'M' + (x + 28) + ',74 v-28 a22 22 0 0 1 44 0 v28') + '" class="hv-shackle"/>' +
          '<rect x="' + (x + 12) + '" y="72" width="76" height="64" rx="12" class="hv-body' + (d ? ' done' : i === cur ? ' cur' : '') + '"/>' +
          (d ? tx(x + 50, 116, [code[i]], 32, 'hv-digit') : '<circle cx="' + (x + 50) + '" cy="98" r="8" class="hv-hole"/><rect x="' + (x + 46) + '" y="100" width="8" height="18" rx="3" class="hv-hole"/>') +
          tx(x + 50, 160, [nodeName(i)], 14));
      });
      return hsvg(W, 172, b, 'Locks');
    }
    if (GAME === 'board') {
      var pts = pathNodes(n, 640, 86, 170);
      b = '<rect x="4" y="4" width="632" height="246" rx="18" class="hv-mat"/>' + trail(pts);
      pts.forEach(function (pt, i) {
        var d = S.done[i], up = i % 2;
        b += hn(i, '<circle cx="' + pt[0] + '" cy="' + pt[1] + '" r="27" class="hv-node' + (d ? ' done' : i === cur ? ' cur' : '') + '"/>' + tx(pt[0], pt[1] + 8, [d ? '✓' : String(i + 1)], 24, 'hv-num') +
          tx(pt[0], up ? pt[1] - 52 : pt[1] + 46, wrapLines(stageTitle(i), 15, 2), 13, 'hv-cardink', 15));
      });
      if (cur >= 0) { var p0 = pts[cur]; b += '<g class="hv-pawn" transform="translate(' + (p0[0] - 36) + ',' + (p0[1] - 4) + ')"><circle cx="0" cy="-16" r="9"/><path d="M-13,12 Q0,-14 13,12 Z"/></g>'; }
      return hsvg(640, 254, b, 'Game board route') + '<div class="ep-stamps">' + stages.map(function (_, i) { return '<span class="ep-stamp' + (S.done[i] ? ' on' : '') + '" style="--rot:' + ((i * 37) % 17 - 8) + 'deg">' + (S.done[i] ? ICON.star : '') + '<b>' + esc(nodeName(i)) + '</b></span>'; }).join('') + '</div>';
    }
    if (GAME === 'boss') {
      var f = bossHP(), pct = Math.round(f * 100), taunt = f <= 0 ? 'Defeated! Head to the final lock to finish the quest.' : f > .75 ? '"You will never clear all ' + n + ' of my levels!"' : f > .4 ? '"Lucky guesses! Let\'s see you do that again."' : '"No... my power is fading!"';
      var pts2 = pathNodes(n, 640, 40, 96), b2 = trail(pts2);
      pts2.forEach(function (pt, i) { var d = S.done[i]; b2 += hn(i, '<rect x="' + (pt[0] - 26) + '" y="' + (pt[1] - 22) + '" width="52" height="44" rx="10" class="hv-node' + (d ? ' done' : i === cur ? ' cur' : '') + '"/>' + tx(pt[0], pt[1] + 8, [d ? '✓' : 'L' + (i + 1)], 20, 'hv-num')); });
      return '<div class="ep-boss">' + bossSVG(f) + '<div><div class="ep-bossname">' + esc(room.boss || 'The Quest Boss') + '</div><div class="ep-hp" role="img" aria-label="Boss health ' + pct + ' percent"><i style="width:' + pct + '%"></i></div><div class="ep-small">Boss health: ' + pct + '%. Every correct answer is a hit!</div><p class="ep-taunt">' + esc(taunt) + '</p></div></div>' + hsvg(640, 130, b2, 'Quest levels');
    }
    if (GAME === 'case') {
      var P = [[25, 25], [465, 25], [25, 215], [465, 215], [245, 8], [245, 250]], cx = 320, cy = 180;
      b = '<rect x="0" y="0" width="640" height="360" rx="14" class="hv-cork"/>';
      stages.forEach(function (_, i) { var q = P[i % 6]; if (S.done[i]) b += '<path d="M' + (q[0] + 75) + ',' + (q[1] + 12) + ' L' + cx + ',' + (cy - 50) + '" class="hv-string"/>'; });
      b += '<g><rect x="245" y="128" width="150" height="104" rx="4" class="hv-card verdict"/>' + tx(cx, 158, ['THE VERDICT'], 14, 'hv-cardink b') + tx(cx, 186, allDone() ? ['Ready to', 'close the case!'] : [S.done.filter(Boolean).length + ' of ' + n + ' files', 'solved'], 14, 'hv-cardink', 18) + '<circle cx="' + cx + '" cy="' + (cy - 50) + '" r="7" class="hv-pin"/></g>';
      stages.forEach(function (_, i) {
        var q = P[i % 6], d = S.done[i], rot = (i % 2 ? 2.5 : -2.5);
        b += hn(i, '<g transform="rotate(' + rot + ' ' + (q[0] + 75) + ' ' + (q[1] + 50) + ')"><rect x="' + q[0] + '" y="' + q[1] + '" width="150" height="100" rx="4" class="hv-card' + (i === cur && !fmt.ordered ? '' : '') + '"/>' +
          tx(q[0] + 75, q[1] + 36, ['FILE #' + (i + 1)], 13, 'hv-cardink b') + tx(q[0] + 75, q[1] + 56, wrapLines(stageTitle(i), 18, 2), 13, 'hv-cardink', 16) +
          (d ? '<g transform="rotate(-10 ' + (q[0] + 110) + ' ' + (q[1] + 84) + ')"><rect x="' + (q[0] + 66) + '" y="' + (q[1] + 70) + '" width="80" height="24" rx="4" class="hv-solved"/>' + tx(q[0] + 106, q[1] + 88, ['SOLVED'], 15, 'hv-solvedt') + '</g>' : '') +
          '<circle cx="' + (q[0] + 75) + '" cy="' + (q[1] + 12) + '" r="7" class="hv-pin"/></g>');
      });
      return hsvg(640, 360, b, 'Case board');
    }
    // gallery wall of framed pictures (gallery walks with art)
    if (stages.every(function (s) { return s.art; })) {
      return '<div class="ep-hall">' + stages.map(function (s, i) {
        var d = S.done[i], st = S.studied[i];
        return '<button type="button" class="ep-hallframe' + (d ? ' done' : '') + '" data-hall="' + i + '"><span class="ep-gframe sm"><span class="ep-mat"><span class="ep-art">' + artSVG(s.art) + '</span></span></span><span class="ep-hplaque"><b>' + LETTERS[i] + '. ' + esc(s.art.title || stageTitle(i)) + '</b><span>' + (d ? '✓ Stamped · ' + esc(code[i]) : st ? 'Challenge open →' : 'Visit →') + '</span></span></button>';
      }).join('') + '</div><p class="ep-small ep-hallnote">Walk the gallery in any order. At each exhibit: look closely, take notes, then solve the challenge.</p>';
    }
    // museum floor plan
    var R = [[20, 20, 140, 120], [175, 20, 140, 120], [330, 20, 140, 120], [485, 20, 140, 120], [20, 170, 140, 120], [485, 170, 140, 120]];
    b = '<rect x="4" y="4" width="632" height="302" rx="10" class="hv-floor"/><rect x="200" y="190" width="240" height="100" rx="8" class="hv-lobby"/>' + tx(320, 236, ['LOBBY'], 16, 'hv-cardink b') + tx(320, 258, ['You are here'], 12, 'hv-cardink');
    stages.forEach(function (_, i) {
      var r = R[i % 6], d = S.done[i];
      b += hn(i, '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="6" class="hv-room' + (d ? ' done' : '') + '"/><rect x="' + (r[0] + r[2] / 2 - 18) + '" y="' + (r[1] + r[3] - 5) + '" width="36" height="10" class="hv-door"/>' +
        tx(r[0] + 22, r[1] + 30, [LETTERS[i]], 24, 'hv-letter') + tx(r[0] + r[2] / 2, r[1] + 62, wrapLines(stageTitle(i), 16, 3), 13, 'hv-cardink', 16) +
        (d ? '<g transform="translate(' + (r[0] + r[2] - 26) + ',' + (r[1] + 24) + ')"><circle r="17" class="hv-stampc"/><path d="M0,-10 l3,7 7,.5 -5.5,4.5 2,7 -6.5,-4 -6.5,4 2,-7 -5.5,-4.5 7,-.5z" class="hv-stamps"/></g>' : ''));
    });
    return hsvg(640, 310, b, 'Museum floor plan');
  }

  /* ---------- screens ---------- */
  var HOWTO = {
    locks: [['Solve', 'Read each clue card, then solve its puzzles.'], ['Unlock', 'Every lock you open gives one piece of the final code.']],
    boss: [['Battle', 'Every correct answer hits the boss. Knock its health to zero!'], ['Hearts', 'Wrong answers cost a heart. Lose them all and you regroup with a hint.']],
    board: [['Travel', 'Move your game piece stop by stop along the route.'], ['Stamp', 'Each stop earns a passport stamp and a code piece.']],
    'case': [['Investigate', 'Open the evidence files in any order.'], ['Connect', 'Solved files get pinned to the case board for the verdict.']],
    museum: [['Explore', 'Visit the exhibits in any order on the floor plan.'], ['Stamp', 'Each exhibit you finish earns a stamp and a code piece.']]
  };
  function renderStart() {
    var locked = presetLevel();
    var how = (HOWTO[GAME] || HOWTO.locks).concat([['Earn XP', 'First-try answers and streaks earn bonus XP and badges.'], writeTasks().length ? ['Prove it', 'Finish with a written evidence task that you turn in.'] : ['Stuck?', 'Tap Show a hint or open Supports. Mistakes are part of learning.']]);
    root.innerHTML = '<div class="ep-band"></div><div class="ep-wrap">' +
      (opts.onExit ? '<div class="ep-row"><span class="ep-spacer"></span><button type="button" class="ep-btn plain small" data-exit>Exit preview</button></div>' : '') +
      '<div class="ep-hero">' + emblem() + '<div><h1 class="ep-sign">' + esc(room.title) + '</h1></div></div>' +
      '<p class="ep-tag">' + esc(fmt.label) + ' · Grade ' + esc(room.grade) + ' · ' + esc(room.standard) + '</p>' +
      '<div class="ep-card"><h2>' + esc(room.startHead || 'Your mission') + '</h2>' + room.story + '<p><b>' + esc(fmt.intro) + '</b></p>' +
      '<div class="ep-howto">' + how.map(function (h) { return '<div><b>' + h[0] + '</b>' + h[1] + '</div>'; }).join('') + '</div>' +
      '<h3>Choose your mission level</h3>' + (locked ? '<p class="ep-small">Your teacher chose your level for this mission.</p>' : '<p class="ep-small">Pick the level that fits you today. You can play again at a different level later.</p>') +
      '<div class="ep-levels" role="radiogroup" aria-label="Mission level">' + Object.keys(LEVELS).map(function (k) { var L = LEVELS[k]; return '<button type="button" role="radio" class="ep-level lv-' + k + '" data-lv="' + k + '" aria-checked="' + (S.level === k) + '"' + (locked && locked !== k ? ' disabled' : '') + '><b>' + L.name + '</b><span class="ep-lvtag">' + L.tag + '</span><span class="ep-lvdesc">' + L.desc + '</span></button>'; }).join('') + '</div>' +
      '<label for="ep-name" style="display:block;margin-top:18px">Your name or team name</label><input id="ep-name" type="text" maxlength="40" autocomplete="off" placeholder="e.g. Team Lightning" value="' + esc(S.name) + '" style="margin-top:6px">' +
      '<div style="margin-top:18px"><button type="button" class="ep-btn full" id="ep-start">Start the ' + esc(fmt.label.toLowerCase()) + '</button></div>' +
      '<p class="ep-small" style="margin-top:12px">About ' + esc(room.minutes || '25–30') + ' minutes · ' + stages.length + ' ' + esc(fmt.node.toLowerCase()) + 's · ' + totalPuzzles() + ' challenges' + (writeTasks().length ? ', including a written evidence task' : '') + '. Tap <b>Supports</b> any time for read-aloud, bigger text, a word bank, and a scratch pad.</p>' +
      '<div class="ep-row" style="margin-top:6px"><button type="button" class="ep-btn plain small" data-sup>' + ICON.tools + 'Supports</button></div></div>' +
      '<div class="ep-row" style="margin-top:22px"><button type="button" class="ep-btn plain small" id="ep-qrbtn">Teacher: make a QR code</button><button type="button" class="ep-btn plain small" id="ep-reset">Teacher: reset this device</button></div></div><div class="ep-band bottom"></div>';
    var start = root.querySelector('#ep-start'), inp = root.querySelector('#ep-name');
    root.querySelectorAll('[data-lv]').forEach(function (b) { b.onclick = function () { S.level = b.getAttribute('data-lv'); root.querySelectorAll('[data-lv]').forEach(function (x) { x.setAttribute('aria-checked', x === b); }); save(); }; });
    start.onclick = function () {
      var t = inp.value.trim();
      if (!t) { inp.focus(); inp.placeholder = 'Type a name first'; inp.classList.remove('ep-shake'); void inp.offsetWidth; inp.classList.add('ep-shake'); return; }
      S.name = t; S.started = true; go('hub');
    };
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') start.click(); });
    root.querySelector('#ep-qrbtn').onclick = showQR;
    var armed = false, rb = root.querySelector('#ep-reset');
    rb.onclick = function () { if (!armed) { armed = true; rb.textContent = 'Tap again to erase progress'; setTimeout(function () { armed = false; if (rb.isConnected) rb.textContent = 'Teacher: reset this device'; }, 4000); return; } S = blank(); work = {}; save(); render(); };
    bindCommon();
  }

  function renderHub() {
    var ready = allDone();
    root.innerHTML = '<div class="ep-band thin"></div><div class="ep-wrap">' + statusBar() +
      '<div class="ep-hero" style="margin-top:0">' + emblem('sm') + '<div><h1 class="ep-sign md">' + esc(room.hubTitle || fmt.map) + '</h1></div></div>' +
      '<p class="ep-tag">' + esc(fmt.intro) + '</p><div class="ep-hubvis">' + hubVisual() + '</div><div class="ep-rooms"' + (stages.every(function (x) { return x.art; }) ? ' hidden' : '') + '>' + stages.map(function (s, i) {
        var solved = !!S.done[i], open = stageOpen(i), cur = open && !solved && fmt.ordered && (i === 0 || S.done[i - 1]);
        var inProg = s.puzzles.filter(function (_, j) { return S.solved[i + '-' + j]; }).length;
        var state = solved ? '✓ ' + esc(code[i]) : !open ? 'Locked' : inProg ? inProg + '/' + s.puzzles.length + ' →' : fmt.verb + ' →';
        return '<button type="button" class="ep-room' + (solved ? ' solved' : '') + (!open ? ' locked' : '') + (cur ? ' open' : '') + '" data-i="' + i + '"' + (open ? '' : ' disabled') + '>' +
          '<span class="num">' + (solved ? '✓' : (room.format === 'gallery' ? LETTERS[i] : i + 1)) + '</span><span><span class="lbl">' + esc(nodeName(i)) + '</span><br><span class="name">' + esc(stageTitle(i)) + '</span></span><span class="state">' + state + '</span></button>';
      }).join('') + '</div>' +
      '<div class="ep-card" style="margin-top:22px"><h2>' + esc(room.finalTitle || (GAME === 'boss' ? 'The final strike' : 'The final lock')) + '</h2><p>Your code pieces, in order:</p><div class="ep-digits">' + code.map(function (c, i) { return '<div class="ep-digit' + (S.done[i] ? '' : ' empty') + '">' + (S.done[i] ? esc(c) : '?') + '</div>'; }).join('') + '</div>' +
      '<div style="margin-top:18px"><button type="button" class="ep-btn full" id="ep-door"' + (ready ? '' : ' disabled') + '>' + (ready ? 'Go to the final lock' : 'Collect all ' + stages.length + ' pieces first') + '</button></div></div></div>';
    root.querySelectorAll('.ep-room:not([disabled])').forEach(function (b) { b.onclick = function () { go('stage', +b.getAttribute('data-i')); }; });
    root.querySelectorAll('[data-hall]').forEach(function (b) { b.onclick = function () { go('stage', +b.getAttribute('data-hall')); }; });
    root.querySelectorAll('.ep-hn:not(.locked)').forEach(function (g) {
      g.addEventListener('click', function () { go('stage', +g.getAttribute('data-i')); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go('stage', +g.getAttribute('data-i')); } });
    });
    root.querySelector('#ep-door').onclick = function () { if (allDone()) go('final'); };
    bindCommon();
  }

  function heartsHTML(i) {
    if (GAME !== 'boss') return '';
    var max = curLevel().hearts, h = S.hearts[i] == null ? max : S.hearts[i], s = '';
    for (var k = 0; k < max; k++) s += '<span class="' + (k < h ? '' : 'lost') + '">' + ICON.heart + '</span>';
    return '<div class="ep-hearts" id="ep-hearts" role="img" aria-label="' + h + ' of ' + max + ' hearts">' + s + '<span class="ep-bossmini"><span>' + esc(room.boss || 'Boss') + '</span><span class="ep-hp sm"><i style="width:' + Math.round(bossHP() * 100) + '%"></i></span></span></div>';
  }
  /* ---------- gallery walk: framed picture with look-closely spots, then See-Think-Wonder ---------- */
  function artSVG(a, small) { var pic = a.pic; return V[pic.kind] ? V[pic.kind](pic, {}) : ''; }
  function exhibitHTML(i) {
    var s = stages[i], a = s.art, found = S.spots[i] || {}, n = a.spots.length, got = a.spots.filter(function (_, k) { return found[k]; }).length, W = a.pic.w || 600, H = a.pic.h || 380;
    var marks = a.spots.map(function (sp, k) { return '<button type="button" class="ep-spot' + (found[k] ? ' found' : '') + '" data-spot="' + k + '" style="left:' + (sp.x / W * 100).toFixed(2) + '%;top:' + (sp.y / H * 100).toFixed(2) + '%" aria-label="Look closely: detail ' + (k + 1) + (found[k] ? ', ' + esc(sp.t) : '') + '">' + (k + 1) + '</button>'; }).join('');
    var facts = a.spots.map(function (sp, k) { return found[k] ? '<li><b>' + (k + 1) + '. ' + esc(sp.t) + '</b> ' + esc(sp.d) + '</li>' : '<li class="hid">' + (k + 1) + '. ?</li>'; }).join('');
    return '<div class="ep-exhibit"><div class="ep-gframe"><div class="ep-mat"><div class="ep-art">' + artSVG(a) + marks + '</div></div></div>' +
      '<div class="ep-plaque"><div class="ep-kicker">' + esc(nodeName(i)) + '</div><h2>' + esc(a.title || stageTitle(i)) + '</h2><p class="ep-medium">' + esc(a.medium || '') + '</p>' +
      '<div class="ep-look"><b>Look closely.</b> Tap each numbered spot on the picture. <span class="ep-found">' + got + ' of ' + n + ' found</span></div><ol class="ep-facts">' + facts + '</ol></div></div>';
  }
  function notesHTML(i) {
    var g = S.gnotes[i] || {}, done = S.studied[i];
    function box(k, label, tip) { return '<label class="ep-gnote"><b>' + label + '</b><span>' + tip + '</span><textarea data-gn="' + k + '" rows="2"' + (done ? ' readonly' : '') + '>' + esc(g[k] || '') + '</textarea></label>'; }
    return '<div class="ep-card ep-gnotes"><h2>Gallery notes</h2><p class="ep-small">Write like a museum visitor. Your notes go on your turn-in page.</p><div class="ep-gnrow">' +
      box('see', 'I see…', 'Name 2 details in the picture.') + box('think', 'I think…', 'What does the exhibit teach? Use a key word.') + box('wonder', 'I wonder…', 'A question you still have (optional).') + '</div>' +
      (done ? '' : '<div class="ep-fb" id="ep-gfb" role="status"></div><div class="ep-row"><button type="button" class="ep-btn" id="ep-study">Start the exhibit challenge</button>' + (opts.preview ? '<button type="button" class="ep-btn small ep-teacher" id="ep-skipstudy">Teacher: skip</button>' : '') + '</div>') + '</div>';
  }
  function bindExhibit(i) {
    var s = stages[i], a = s.art;
    root.querySelectorAll('[data-spot]').forEach(function (b) {
      b.onclick = function () {
        var k = +b.getAttribute('data-spot'); S.spots[i] = S.spots[i] || {}; S.spots[i][k] = true; save();
        var ex = root.querySelector('.ep-exhibit'); ex.outerHTML = exhibitHTML(i); bindExhibit(i); var gf = root.querySelector('#ep-gfb'); if (gf) { gf.className = 'ep-fb'; gf.textContent = ''; }
        var li = root.querySelectorAll('.ep-facts li')[k]; if (li) { li.classList.add('new'); if (li.scrollIntoView) li.scrollIntoView({ block: 'nearest' }); }
        var sp = a.spots[k]; if (S.sup.tap) speak(sp.t + '. ' + sp.d);
      };
    });
  }
  function bindNotes(i) {
    root.querySelectorAll('[data-gn]').forEach(function (t) { t.addEventListener('input', function () { S.gnotes[i] = S.gnotes[i] || {}; S.gnotes[i][t.getAttribute('data-gn')] = t.value; saveSoon(); }); });
    var st = root.querySelector('#ep-study'), fb = root.querySelector('#ep-gfb');
    function open() { S.studied[i] = true; save(); renderStage(); var q = root.querySelector('#ep-qa'); if (q && q.scrollIntoView) q.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    if (st) st.onclick = function () {
      var a = stages[i].art, found = S.spots[i] || {}, left = a.spots.filter(function (_, k) { return !found[k]; }).length, g = S.gnotes[i] || {};
      if (left) { fb.className = 'ep-fb show warn'; fb.textContent = 'Look closely first: ' + left + ' numbered spot' + (left === 1 ? ' is' : 's are') + ' still hidden on the picture.'; return; }
      if (wordCount(g.see) < 3 || wordCount(g.think) < 3) { fb.className = 'ep-fb show warn'; fb.textContent = 'Write at least a few words for "I see" and "I think" before the challenge.'; return; }
      open();
    };
    var sk = root.querySelector('#ep-skipstudy'); if (sk) sk.onclick = function () { S.spots[i] = {}; stages[i].art.spots.forEach(function (_, k) { S.spots[i][k] = true; }); S.gnotes[i] = S.gnotes[i] || { see: 'Teacher preview', think: 'Teacher preview' }; open(); };
  }

  function renderStage() {
    var i = S.current, s = stages[i];
    if (S.pi[i] == null) S.pi[i] = 0;
    var flips = s.cards ? '<div class="ep-flips">' + s.cards.map(function (c, k) { return '<button type="button" class="ep-flip" data-flip="' + k + '" aria-label="Flip card: ' + esc(strip(c[0])) + '"><span class="ep-flip-in"><span class="ep-flip-f">' + fx(c[0]) + '</span><span class="ep-flip-b">' + fx(c[1]) + '</span></span></button>'; }).join('') + '</div>' : '';
    var back = { escape: '← Back to the locks', gallery: '← Back to the gallery', fieldtrip: '← Back to the game board', mystery: '← Back to the case board', quest: '← Back to the quest map' }[room.format] || '← Back';
    root.innerHTML = '<div class="ep-band thin"></div><div class="ep-wrap">' + statusBar() +
      (opts.teach ? '<div class="ep-row" style="margin-bottom:14px"><button type="button" class="ep-btn plain small" id="ep-back"' + (i ? '' : ' disabled') + '>← Previous step</button><span class="ep-spacer"></span><div class="ep-stepdots">' + stages.map(function (_, k) { return '<i class="' + (k === i ? 'cur' : k < i ? 'done' : '') + '"></i>'; }).join('') + '</div><span class="ep-spacer"></span><button type="button" class="ep-btn plain small" id="ep-fwd">' + (i < stages.length - 1 ? 'Next step →' : 'Finish →') + '</button></div>' :
      '<div class="ep-row" style="margin-bottom:14px"><button type="button" class="ep-btn plain small" id="ep-back">' + back + '</button><span class="ep-spacer"></span><span class="ep-small">' + esc(nodeName(i)) + ' of ' + stages.length + '</span></div>') + heartsHTML(i) +
      (s.art && !opts.teach ? exhibitHTML(i) + '<div class="ep-card ep-stagecard ep-placardcard">' + listenBtn('stage') + (/placard/i.test(String(s.content).slice(0, 40)) ? '' : '<div class="ep-kicker">Placard</div>') + fx(s.content) + visualHTML(s.visual) + flips :
      '<div class="ep-card ep-stagecard">' + listenBtn('stage') + '<div class="ep-kicker">' + esc(opts.teach ? 'Step ' + (i + 1) + ' of ' + stages.length : nodeName(i)) + '</div><h2>' + esc(stageTitle(i)) + '</h2>' + fx(s.content) + visualHTML(s.visual) + flips) +
      (s.sim ? '<div class="ep-sim"><div class="ep-sim-h">' + esc(s.sim.title || 'Try it yourself') + '</div><div data-sim></div></div>' : '') + '</div>' +
      (s.art && !opts.teach ? notesHTML(i) : '') +
      '<div id="ep-qa"></div></div>';
    if (opts.teach) {
      root.querySelector('#ep-back').onclick = function () { if (i) go('stage', i - 1); };
      root.querySelector('#ep-fwd').onclick = function () { if (i < stages.length - 1) go('stage', i + 1); else go('done'); };
    } else root.querySelector('#ep-back').onclick = function () { go('hub'); };
    root.querySelectorAll('[data-flip]').forEach(function (b) { b.onclick = function () { b.classList.toggle('on'); }; });
    if (s.sim && SIMS[s.sim.kind]) { try { SIMS[s.sim.kind](root.querySelector('[data-sim]'), s.sim); } catch (e) { root.querySelector('[data-sim]').textContent = 'This simulation could not load.'; } }
    bindCommon();
    if (s.art && !opts.teach) { bindExhibit(i); bindNotes(i); }
    if (S.done[i]) renderStageDone(i);
    else if (s.art && !opts.teach && !S.studied[i]) root.querySelector('#ep-qa').innerHTML = '<div class="ep-panel ep-qcard ep-lockedq"><h2>Exhibit challenge</h2><p>Study the picture and write your gallery notes. The challenge opens when every spot is found.</p></div>';
    else renderPuzzle(i);
  }

  function renderStageDone(i) {
    var qa = root.querySelector('#ep-qa');
    qa.innerHTML = '<div class="ep-panel ep-qcard" style="text-align:center"><h2>' + esc(fmt.done) + '</h2><p>Your code piece for ' + esc(nodeName(i)) + ' is</p><div class="ep-bigdigit">' + esc(code[i]) + '</div>' +
      '<div class="ep-row" style="justify-content:center;margin-top:14px"><button type="button" class="ep-btn" id="ep-tomap">' + (allDone() ? 'Go to the final lock' : 'Back to the map') + '</button></div></div>';
    root.querySelector('#ep-tomap').onclick = function () { go(allDone() ? 'final' : 'hub'); };
  }

  function renderPuzzle(i, keepFb) {
    var s = stages[i], j = S.pi[i], p = s.puzzles[j], key = i + '-' + j, t = T[p.type], L = curLevel();
    var w = work[key] || (work[key] = {}); w.solved = !!S.solved[key];
    var qa = root.querySelector('#ep-qa');
    var prev = keepFb ? qa.querySelector('.ep-fb') : null, prevCls = prev ? prev.className : '', prevHtml = prev ? prev.innerHTML : '';
    var dots = s.puzzles.map(function (_, k) { return '<i class="' + (S.solved[i + '-' + k] ? 'done' : k === j ? 'cur' : '') + '"></i>'; }).join('');
    var needsCheck = !t.instant && !w.solved, stageDoneNow = s.puzzles.every(function (_, k) { return S.solved[i + '-' + k]; });
    var left = Math.max(0, L.removes - (S.removesUsed || 0));
    var canRemove = !opts.teach && p.type === 'mc' && p.choices.length >= 4 && !w.solved && !S.removed[key] && left > 0;
    var isWrite = p.type === 'write';
    qa.innerHTML = '<div class="ep-panel ep-qcard' + (isWrite ? ' ep-wcard' : '') + '" data-key="' + key + '"><div class="ep-qhead"><span class="ep-qcount">' + (opts.teach ? 'Quick check · answer together' : (isWrite ? 'Evidence task · ' : '') + 'Challenge ' + (j + 1) + ' of ' + s.puzzles.length) + '</span>' + listenBtn('q') + '<span class="ep-dots" aria-hidden="true">' + dots + '</span></div>' +
      '<div class="ep-qtext">' + fx(p.q) + '</div>' + (p.type !== 'tap' ? visualHTML(p.visual) : '') + '<div class="ep-ans">' + t.html(p, w, key) + '</div>' +
      '<div class="ep-fb" role="status" aria-live="polite"></div>' +
      (!w.solved ? '<div class="ep-row" style="margin-top:12px">' + (needsCheck ? '<button type="button" class="ep-btn" data-check>' + (isWrite ? 'Submit my response' : 'Check') + '</button>' : '') +
        (p.hint ? '<button type="button" class="ep-btn plain small" data-hint>Show a hint' + (L.hintCost && !S.hinted[key] ? ' (−' + L.hintCost + ' XP)' : '') + '</button>' : '') +
        (canRemove ? '<button type="button" class="ep-btn plain small" data-rm2>' + ICON.scissors + 'Remove 2 wrong' + (left < 20 ? ' (' + left + ' left)' : '') + '</button>' : '') +
        (opts.preview ? '<button type="button" class="ep-btn small ep-teacher" data-solve>Teacher: ' + (isWrite ? 'fill model answer' : 'show answer') + '</button>' : '') + '</div>' +
        '<div class="ep-hintbox' + (hintShown[key] ? ' show' : '') + '">' + (p.hint ? '<b>Hint:</b> ' + fx(p.hint) : '') + '</div>' : '') +
      (w.solved ? '<div class="ep-fb good show"><b>' + (isWrite ? 'Response saved!' : 'Correct!') + '</b> ' + (S.gains[key] ? '<span class="ep-gain">+' + S.gains[key] + ' XP</span> ' : '') + (p.explain ? fx(p.explain) : isWrite ? 'It will appear on your turn-in page at the end.' : '') + '</div><div class="ep-row" style="margin-top:12px"><button type="button" class="ep-btn" data-next>' + (opts.teach ? (i < stages.length - 1 ? 'Next step →' : 'Finish the mini-lesson') : stageDoneNow ? 'Get your code piece' : 'Next challenge →') + '</button></div>' : '') + '</div>';
    var box = qa.querySelector('.ep-qcard'), fb = box.querySelector('.ep-fb');
    if (prev && !w.solved) { fb.className = prevCls; fb.innerHTML = prevHtml; }
    function say(cls, html) { fb.className = 'ep-fb show ' + cls; fb.innerHTML = html; }
    var api = {
      rerender: function (keep) { renderPuzzle(i, !!keep); },
      warn: function (m) { say('warn', m); },
      win: function () { solve(i, j); },
      miss: function (msg) {
        S.tries[key] = (S.tries[key] || 0) + 1; S.wrong++; S.streak = 0;
        var extra = S.tries[key] >= 2 && p.hint && !hintShown[key] ? ' Tap <b>Show a hint</b> if you\'re stuck.' : '';
        say('bad', (msg ? fx(msg) : 'Not quite. Reread the clue card and try again.') + extra);
        var tgt = box.querySelector('.ep-ans'); tgt.classList.remove('ep-shake'); void tgt.offsetWidth; tgt.classList.add('ep-shake');
        if (GAME === 'boss') loseHeart(i, key, p);
        save(); refreshStatus();
      },
      check: function () {
        var r = t.check(p, w);
        if (r.warn) { say('warn', r.warn); return; }
        if (r.ok) { solve(i, j); return; }
        if (r.rerender) { renderPuzzle(i); box = qa.querySelector('.ep-qcard'); fb = box.querySelector('.ep-fb'); }
        api.miss(r.msg);
      }
    };
    t.bind(box, p, w, api);
    var cb = box.querySelector('[data-check]'); if (cb) cb.onclick = function () { api.check(); };
    var hb = box.querySelector('[data-hint]'); if (hb) hb.onclick = function () { showHint(key); };
    var rb = box.querySelector('[data-rm2]'); if (rb) rb.onclick = function () {
      var wrong = p.choices.map(function (_, k) { return k; }).filter(function (k) { return k !== p.answer && !(w.crossed && w.crossed[k]); });
      shuffled(wrong, room.id + key + 'rm').slice(0, 2).forEach(function (k) { w.crossed = w.crossed || {}; w.crossed[k] = true; });
      S.removed[key] = true; S.removesUsed = (S.removesUsed || 0) + 1; save(); renderPuzzle(i, true);
    };
    var sb = box.querySelector('[data-solve]'); if (sb) sb.onclick = function () { t.fill(p, w); if (isWrite) { renderPuzzle(i); return; } var r = t.check(p, w); if (r && r.ok) solve(i, j); else say('warn', 'Answer key problem: ' + ((r && (r.warn || r.msg)) || 'check failed')); };
    var nb = box.querySelector('[data-next]'); if (nb) nb.onclick = function () {
      if (stageDoneNow) { stageComplete(i); return; }
      S.pi[i] = s.puzzles.map(function (_, k) { return k; }).filter(function (k) { return !S.solved[i + '-' + k]; })[0]; save();
      renderPuzzle(i); var q = root.querySelector('#ep-qa'); if (q.scrollIntoView) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }
  function showHint(key) {
    if (!S.hinted[key]) { S.hinted[key] = true; save(); refreshStatus(); }
    hintShown[key] = true;
    var hb = root.querySelector('.ep-hintbox'); if (hb) hb.classList.add('show');
    var btn = root.querySelector('[data-hint]'); if (btn) btn.textContent = 'Hint shown below';
  }
  function loseHeart(i, key, p) {
    var max = curLevel().hearts;
    if (S.hearts[i] == null) S.hearts[i] = max;
    S.hearts[i]--;
    if (S.hearts[i] <= 0) {
      S.hearts[i] = max; S.xp = Math.max(0, S.xp - 30);
      var ov = document.createElement('div'); ov.className = 'ep-overlay';
      ov.innerHTML = '<div class="ep-card" role="dialog" aria-label="Regroup"><div class="ep-pop">Regroup!</div><p>' + esc(room.boss || 'The boss') + ' knocked you back, but heroes learn from every hit. Your hearts are refilled.</p>' + (p.hint ? '<p class="ep-hintbox show" style="text-align:left"><b>Hint:</b> ' + fx(p.hint) + '</p>' : '<p>Reread the clue card slowly. Use the Supports button if it helps.</p>') + '<button type="button" class="ep-btn full" id="ep-ok">Back into battle</button></div>';
      root.appendChild(ov);
      if (p.hint) { S.hinted[key] = true; hintShown[key] = true; }
      var ok = ov.querySelector('#ep-ok'); ok.focus(); ok.onclick = function () { ov.remove(); renderPuzzle(i, true); var hb = root.querySelector('.ep-hintbox'); if (hb && p.hint) hb.classList.add('show'); };
    }
    var hh = root.querySelector('#ep-hearts'); if (hh) hh.outerHTML = heartsHTML(i);
  }

  function solve(i, j) {
    var key = i + '-' + j, p = stages[i].puzzles[j], L = curLevel();
    if (S.solved[key]) return;
    S.solved[key] = true;
    var tries = S.tries[key] || 0, first = !tries && !S.hinted[key] && !S.removed[key];
    if (S.firstTry[key] == null) S.firstTry[key] = first;
    var gain = p.type === 'write' ? 200 : Math.max(40, 100 - 20 * tries);
    if (S.hinted[key] && L.hintCost) gain = Math.max(20, gain - L.hintCost);
    if (S.removed[key]) gain = Math.max(20, gain - 20);
    if (p.type !== 'write') { if (first) { S.streak++; if (S.streak >= 3) gain += 25 * Math.min(S.streak - 2, 3); } else S.streak = 0; }
    gain = Math.round(gain * L.xpMul); S.xp += gain; S.gains[key] = gain; S.best = Math.max(S.best || 0, S.streak);
    if (p.type === 'write' && work[key]) S.writing[key] = Object.assign({}, work[key].v);
    save(); renderPuzzle(i); refreshStatus();
    var hh = root.querySelector('#ep-hearts'); if (hh) hh.outerHTML = heartsHTML(i);
    if (!opts.teach) toast('+' + gain + ' XP' + (S.streak >= 3 && first ? ' <small>' + S.streak + ' in a row!</small>' : '') + (GAME === 'boss' ? ' <small>Boss hit!</small>' : ''));
  }

  function stageComplete(i) {
    S.done[i] = true; save();
    if (opts.teach) { go(i < stages.length - 1 ? 'stage' : 'done', i < stages.length - 1 ? i + 1 : null); return; }
    var extra = { boss: '<p>Level cleared! ' + esc(room.boss || 'The boss') + ' is down to <b>' + Math.round(bossHP() * 100) + '%</b> health.</p>', board: '<div class="ep-stamp on big">' + ICON.star + '<b>' + esc(nodeName(i)) + '</b></div><p>Passport stamped! Your game piece moves ahead.</p>', 'case': '<p>This file is pinned to the case board with a red string.</p>', museum: '<p>Exhibit stamped on your floor plan.</p>', locks: '' }[GAME] || '';
    var ov = document.createElement('div'); ov.className = 'ep-overlay';
    ov.innerHTML = '<div class="ep-card" role="dialog" aria-label="Code piece found"><div class="ep-pop">' + esc(fmt.done) + '</div>' + extra + '<p>Write this code piece on your paper. It goes in slot ' + (i + 1) + ':</p><div class="ep-bigdigit">' + esc(code[i]) + '</div>' +
      '<button type="button" class="ep-btn full" id="ep-ok">' + (allDone() ? 'Go to the final lock' : { board: 'Back to the game board', 'case': 'Back to the case board', museum: 'Back to the floor plan', boss: 'Back to the quest map' }[GAME] || 'Back to the map') + '</button></div>';
    root.appendChild(ov); confetti(30);
    var ok = ov.querySelector('#ep-ok'); ok.focus();
    ok.onclick = function () { ov.remove(); go(allDone() ? 'final' : 'hub'); };
  }

  function renderFinal() {
    root.innerHTML = '<div class="ep-band thin"></div><div class="ep-wrap">' + statusBar() +
      '<div class="ep-row" style="margin-bottom:14px"><button type="button" class="ep-btn plain small" id="ep-back">← Back</button></div>' +
      '<div class="ep-card" id="ep-doorcard" style="text-align:center">' + (GAME === 'boss' ? bossSVG(0) : emblem()) + '<h2>' + esc(room.finalTitle || (GAME === 'boss' ? 'The final strike' : 'The final lock')) + '</h2>' + (room.finalPrompt || '<p>Type your code pieces in order, slot 1 to slot ' + code.length + '.</p>') +
      '<div class="ep-keypad">' + code.map(function (_, k) { return '<input type="text" maxlength="1" data-k="' + k + '" aria-label="Code character ' + (k + 1) + '" autocomplete="off">'; }).join('') + '</div>' +
      '<div class="ep-fb" id="ep-doorfb" role="status" aria-live="polite"></div><div style="margin-top:14px"><button type="button" class="ep-btn full" id="ep-try">Unlock</button></div></div></div>';
    root.querySelector('#ep-back').onclick = function () { go('hub'); };
    var ins = Array.prototype.slice.call(root.querySelectorAll('.ep-keypad input'));
    function tryCode() {
      var v = ins.map(function (x) { return x.value.toUpperCase(); }).join(''), fb = root.querySelector('#ep-doorfb');
      if (v === code.join('')) { S.finished = true; S.finishTime = S.elapsed; S.xp += Math.round(150 * curLevel().xpMul); go('done'); confetti(90); return; }
      S.wrong++; save(); fb.className = 'ep-fb show bad';
      fb.textContent = v.length < code.length ? 'The lock needs all ' + code.length + ' pieces.' : 'The lock won\'t budge. Check the order: slot 1 through slot ' + code.length + '.';
      var c = root.querySelector('#ep-doorcard'); c.classList.remove('ep-shake'); void c.offsetWidth; c.classList.add('ep-shake');
    }
    ins.forEach(function (inp, k) {
      inp.oninput = function () { inp.value = inp.value.replace(/[^a-z0-9]/gi, '').slice(-1).toUpperCase(); if (inp.value && ins[k + 1]) ins[k + 1].focus(); };
      inp.onkeydown = function (e) { if (e.key === 'Backspace' && !inp.value && ins[k - 1]) ins[k - 1].focus(); if (e.key === 'Enter') tryCode(); };
    });
    ins[0].focus();
    root.querySelector('#ep-try').onclick = tryCode;
    bindCommon();
  }

  /* ---------- results: XP, rank, badges, and the Canvas turn-in ---------- */
  function accuracy() { var total = totalPuzzles(), first = Object.keys(S.firstTry).filter(function (k) { return S.firstTry[k]; }).length; return total ? Math.round(first / total * 100) : 100; }
  function badges() {
    var hints = Object.keys(S.hinted).length, grit = Object.keys(S.tries).some(function (k) { return S.tries[k] >= 3 && S.solved[k]; });
    var used = Object.keys(S.sup || {}).some(function (k) { return S.sup[k]; }) || !!String(S.notes || '').trim();
    return [
      { n: 'Sharpshooter', d: '80% or more right on the first try', on: accuracy() >= 80, c: '#E4572E' },
      { n: 'On Fire', d: 'A streak of 5 first-try answers', on: (S.best || 0) >= 5, c: '#F2B84B' },
      { n: 'Independent', d: 'Used 1 hint or fewer', on: hints <= 1, c: '#3A7BE0' },
      { n: 'Evidence Expert', d: 'Completed the written evidence task', on: writeTasks().every(function (t) { return S.solved[t.key]; }) && writeTasks().length > 0, c: '#23A26A' },
      { n: 'Never Give Up', d: 'Solved a challenge after 3 or more tries', on: grit, c: '#9B6BFF' },
      { n: 'Speed Runner', d: 'Finished in under 20 minutes', on: (S.finishTime || S.elapsed) < 1200, c: '#C2185B' },
      { n: 'Smart Tools', d: 'Used a support tool or the scratch pad', on: used, c: '#2A9D8F' },
      { n: 'Legend', d: 'Finished at the Legend level', on: S.level === 'legend', c: '#6D4C41' }
    ];
  }
  function medal(c) { return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M20,2 h10 l6,22 h-10z M44,2 h-10 l-6,22 h10z" fill="' + c + '" opacity=".75"/><circle cx="32" cy="40" r="20" fill="' + c + '" stroke="#1d1d1d" stroke-width="3"/><path d="M32,28 l3.6,7.6 8.4,.9 -6.3,5.7 1.8,8.3 -7.5,-4.3 -7.5,4.3 1.8,-8.3 -6.3,-5.7 8.4,-.9z" fill="#fff"/></svg>'; }
  function rankName() {
    var max = 0; stages.forEach(function (s) { s.puzzles.forEach(function (p) { max += p.type === 'write' ? 200 : 100; }); });
    var f = S.xp / Math.max(1, max * curLevel().xpMul + 150 * curLevel().xpMul);
    var role = { locks: 'Escape Artist', boss: 'Hero', board: 'Traveler', 'case': 'Detective', museum: 'Curator' }[GAME] || 'Explorer';
    return (f >= .95 ? 'Legendary ' : f >= .8 ? 'Master ' : f >= .6 ? 'Expert ' : 'Rising ') + role;
  }
  function workText() {
    var L = curLevel(), lines = ['Crossroads Escapes: ' + room.title, 'Standard: ' + (room.standard || ''), 'Name: ' + (S.name || ''), 'Mission level: ' + L.name, 'Completion code: ' + completionCode(S.name), 'Time: ' + fmtTime(S.finishTime || S.elapsed) + ' | XP: ' + S.xp + ' | First-try accuracy: ' + accuracy() + '% | Hints: ' + Object.keys(S.hinted).length, 'Badges: ' + (badges().filter(function (b) { return b.on; }).map(function (b) { return b.n; }).join(', ') || 'none yet'), ''];
    if (stages.some(function (s) { return s.art; })) {
      lines.push('--- Gallery walk notes ---');
      stages.forEach(function (s, i) { if (!s.art) return; var g = S.gnotes[i] || {}; lines.push(LETTERS[i] + '. ' + (s.art.title || stageTitle(i)), '  I see: ' + String(g.see || '').trim(), '  I think: ' + String(g.think || '').trim(), '  I wonder: ' + String(g.wonder || '').trim()); });
      lines.push('');
    }
    writeTasks().forEach(function (t) {
      var fr = FRAMES[t.p.frame] || FRAMES.RACE, v = S.writing[t.key] || (work[t.key] && work[t.key].v) || {};
      lines.push('--- ' + fr.name + ' ---', 'Task: ' + strip(t.p.q));
      fr.parts.forEach(function (pt) { lines.push(pt.name + ': ' + String(v[pt.k] || '').trim()); });
      lines.push('');
    });
    return lines.join('\n');
  }
  function renderDone() {
    if (opts.teach) {
      root.innerHTML = '<div class="ep-band"></div><div class="ep-wrap">' + statusBar() + '<div class="ep-card" style="text-align:center">' + emblem() + '<h2>Mini-lesson complete!</h2><p>' + (room.wrapUp || 'Students should now have worksheet Parts 1–11 filled in. Launch the activity next.') + '</p><div class="ep-row" style="justify-content:center;margin-top:12px"><button type="button" class="ep-btn plain" id="ep-restart">Back to step 1</button></div></div></div>';
      root.querySelector('#ep-restart').onclick = function () { go('stage', 0); };
      bindCommon(); return;
    }
    var bs = badges(), title = { boss: 'Boss defeated!', board: 'Trip complete!', 'case': 'Case closed!', museum: 'Gallery complete!', locks: 'You escaped!' }[GAME] || 'You escaped!';
    root.innerHTML = '<div class="ep-band"></div><div class="ep-wrap">' + (opts.onExit ? '<div class="ep-row ep-noprint"><span class="ep-spacer"></span><button type="button" class="ep-btn plain small" data-exit>Exit preview</button></div>' : '') +
      '<div class="ep-card ep-cert" style="text-align:center;margin-top:18px"><div class="ep-pop" style="font-size:52px">' + title + '</div>' + (GAME === 'boss' ? bossSVG(0) : emblem()) + '<h2>Nice work, ' + esc(S.name || 'explorer') + '!</h2>' + (room.finale || '') +
      '<p class="ep-rank">Rank: <b>' + esc(rankName()) + '</b> · ' + esc(curLevel().name) + ' level</p>' +
      '<div class="ep-stats"><div class="ep-stat"><b>' + S.xp + '</b>XP</div><div class="ep-stat"><b>' + fmtTime(S.finishTime || S.elapsed) + '</b>Time</div><div class="ep-stat"><b>' + accuracy() + '%</b>First-try accuracy</div><div class="ep-stat"><b>' + (S.best || 0) + '</b>Best streak</div></div>' +
      '<h3>Badges</h3><div class="ep-badges">' + bs.map(function (b) { return '<div class="ep-badge' + (b.on ? '' : ' off') + '" title="' + esc(b.d) + '">' + medal(b.c) + '<b>' + esc(b.n) + '</b><span>' + esc(b.d) + '</span></div>'; }).join('') + '</div>' +
      '<p style="margin-top:14px"><b>Completion code</b></p><div class="ep-code">' + esc(completionCode(S.name)) + '</div>' +
      '<p class="ep-small" style="margin-top:12px">' + esc(room.title) + ' · Grade ' + esc(room.grade) + ' · ' + esc(room.standard) + ' · ' + new Date().toLocaleDateString() + '</p></div>' +
      '<div class="ep-card ep-turnin"><h2>Turn in your work</h2><p><b>Step 1.</b> Tap <b>Copy my work</b>. <b>Step 2.</b> Paste it into the Canvas assignment and submit. Your teacher will read your written evidence and check your completion code.</p>' +
      '<textarea class="ep-worktext" readonly rows="12" aria-label="Your work to turn in">' + esc(workText()) + '</textarea><div class="ep-row ep-noprint" style="margin-top:12px"><button type="button" class="ep-btn" id="ep-copy">Copy my work</button><button type="button" class="ep-btn plain" id="ep-dl">Download as a file</button><span class="ep-small" id="ep-copymsg" role="status"></span></div></div>' +
      '<div class="ep-row ep-noprint" style="justify-content:center;margin-top:16px"><button type="button" class="ep-btn" id="ep-print">Print certificate and work</button><button type="button" class="ep-btn plain" id="ep-again">Play again</button></div></div><div class="ep-band bottom"></div>';
    root.querySelector('#ep-print').onclick = function () { window.print(); };
    var ta = root.querySelector('.ep-worktext'), msg = root.querySelector('#ep-copymsg');
    root.querySelector('#ep-copy').onclick = function () {
      function fallback() { ta.focus(); ta.select(); try { document.execCommand('copy'); msg.textContent = 'Copied! Now paste it into Canvas.'; } catch (e) { msg.textContent = 'Press Ctrl+C (or ⌘+C) to copy the selected text.'; } }
      try { navigator.clipboard.writeText(ta.value).then(function () { msg.textContent = 'Copied! Now paste it into Canvas.'; }, fallback); } catch (e) { fallback(); }
    };
    root.querySelector('#ep-dl').onclick = function () {
      try { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ta.value], { type: 'text/plain' })); a.download = (room.title + ' - ' + (S.name || 'my work')).replace(/[^\w\- ]+/g, '') + '.txt'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { msg.textContent = 'Download is blocked here. Use Copy my work instead.'; }
    };
    var armed = false, ag = root.querySelector('#ep-again');
    ag.onclick = function () { if (!armed) { armed = true; ag.textContent = 'Tap again to erase progress'; return; } S = blank(); work = {}; save(); render(); };
    bindCommon();
  }

  function showQR() {
    var ov = document.createElement('div'); ov.className = 'ep-overlay';
    var guess = /^https?:/.test(location.href) && !/claude\.ai|claudeusercontent|about:/.test(location.href) ? location.href : '';
    ov.innerHTML = '<div class="ep-card" style="text-align:left"><h2>QR code for student devices</h2><p>Paste the web link for this room, then tap Make QR code. Students scan it to open the room.</p><label for="ep-qrlink">Web link</label><input type="text" id="ep-qrlink" placeholder="https://…" value="' + esc(guess) + '" style="margin-top:6px">' +
      '<div class="ep-row" style="margin-top:12px"><button type="button" class="ep-btn small" id="ep-mk">Make QR code</button><span class="ep-spacer"></span><button type="button" class="ep-btn plain small" id="ep-cl">Close</button></div><div class="ep-qr" id="ep-qr" hidden></div><p class="ep-small" id="ep-qrmsg"></p></div>';
    root.appendChild(ov);
    ov.querySelector('#ep-cl').onclick = function () { ov.remove(); };
    ov.querySelector('#ep-mk').onclick = function () {
      var link = ov.querySelector('#ep-qrlink').value.trim(), box = ov.querySelector('#ep-qr'), msg = ov.querySelector('#ep-qrmsg');
      if (!/^https?:\/\//.test(link)) { msg.textContent = 'Paste a full link that starts with https://'; return; }
      function make() { box.innerHTML = ''; box.hidden = false; new QRCode(box, { text: link, width: 300, height: 300, correctLevel: QRCode.CorrectLevel.M }); msg.textContent = 'Scan it once with a student device to make sure it opens.'; }
      if (typeof QRCode !== 'undefined') return make();
      msg.textContent = 'Loading the QR maker...';
      var sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      sc.onload = make; sc.onerror = function () { msg.textContent = 'The QR maker could not load. Check the internet connection and try again.'; };
      document.head.appendChild(sc);
    };
  }

  function confetti(n) {
    var box = document.createElement('div'); box.className = 'ep-confetti';
    var colors = [TH.v.accent, TH.v.accent2, '#23a26a', '#3A7BE0', '#F2B84B', '#E4572E'];
    for (var k = 0; k < n; k++) {
      var c = document.createElement('i');
      c.style.left = Math.random() * 100 + '%'; c.style.background = colors[k % colors.length];
      c.style.animationDuration = (2 + Math.random() * 2.5) + 's'; c.style.animationDelay = (Math.random() * .6) + 's';
      box.appendChild(c);
    }
    root.appendChild(box); setTimeout(function () { box.remove(); }, 5500);
  }

  function render() {
    ({ start: renderStart, hub: renderHub, stage: renderStage, final: renderFinal, done: renderDone }[S.screen] || renderStart)();
    applySup();
    startTimer();
  }
  render();
  return { completionCode: completionCode };
}
if (typeof module !== 'undefined') module.exports = EscapePlayer;
