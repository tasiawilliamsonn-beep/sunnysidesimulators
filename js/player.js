/*
 * Crossroads Escapes — student game engine.
 *
 * Everything the player needs lives inside this one function so the site can
 * export a room as a single self-contained HTML file (EscapePlayer.toString()
 * is written straight into the exported file). Do not reference anything
 * outside this function from inside it.
 *
 * EscapePlayer(mountElement, roomData, options)
 *   options.preview   true = teacher preview (no saved progress, shows "Solve" buttons)
 *   options.onExit    callback for the "Exit preview" button
 *   options.computeCode  a student name: returns that student's completion code and renders nothing
 */
function EscapePlayer(mount, room, opts) {
  opts = opts || {};

  /* ---------- helpers ---------- */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function completionCode(name) {
    var clean = String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    var n = hash(clean + '|' + room.id).toString(36).toUpperCase();
    while (n.length < 6) n = '0' + n;
    return room.id.split('-').slice(0, 2).join('').toUpperCase() + '-' + n.slice(0, 6);
  }
  if (opts.computeCode != null) return completionCode(opts.computeCode);

  function rng(seed) {
    var a = hash(String(seed));
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffled(list, seed) {
    var r = rng(seed), out = list.slice();
    for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
    // never show an order puzzle already solved
    if (out.length > 1 && out.every(function (v, i) { return v === list[i]; })) out.push(out.shift());
    return out;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function norm(s) {
    return String(s).toLowerCase().replace(/[\s,$%°]/g, '').replace(/[’‘]/g, "'").replace(/\.$/, '');
  }
  function toNum(s) {
    s = String(s).replace(/[\s,$%°]/g, '');
    var m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if (m) return Number(m[1]) / Number(m[2]);
    m = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
    if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
    return s !== '' && !isNaN(Number(s)) ? Number(s) : null;
  }
  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  var ACCENTS = { science: '#1E9E8A', social: '#D2642F', ela: '#8C5BD0', math: '#3A7BE0' };
  var FORMATS = {
    escape:    { label: 'Escape Room',        node: 'Lock',          verb: 'Unlock',  intro: 'Crack every lock to find the pieces of the final code.', ordered: true },
    gallery:   { label: 'Gallery Walk',       node: 'Exhibit',       verb: 'Visit',   intro: 'Walk the gallery in any order. Each exhibit hides one piece of the final code.', ordered: false },
    fieldtrip: { label: 'Virtual Field Trip', node: 'Stop',          verb: 'Explore', intro: 'Board the bus! Complete each stop on the route to earn a passport stamp and a code piece.', ordered: true },
    mystery:   { label: 'Mystery Case',       node: 'Evidence File', verb: 'Examine', intro: 'Examine the evidence files in any order. Each solved file reveals part of the final code.', ordered: false },
    quest:     { label: 'Quest',              node: 'Level',         verb: 'Enter',   intro: 'Clear each level of the quest to power up and collect a code piece.', ordered: true }
  };
  var fmt = FORMATS[room.format] || FORMATS.escape;
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nodeName(i) { return fmt.node + ' ' + (room.format === 'gallery' ? LETTERS[i] : (room.format === 'mystery' ? '#' + (i + 1) : i + 1)); }

  var stages = room.stages;
  function stageTitle(i) { return stages[i].title.replace(/^(Stop|Lock|Level|Evidence File|Door|Container|Panel|Chapter)\s*#?\d+:\s*/i, ''); }
  var code = (room.code && room.code.length === stages.length) ? room.code.toUpperCase().split('') :
    stages.map(function (_, i) { return String(hash(room.id + ':' + i) % 10); });

  /* ---------- CSS (injected once) ---------- */
  var CSS = `
.ep{--ac:#3A7BE0;--ink:#101a30;--ink2:#1a2744;--ink3:#26375c;--paper:#f5f7fa;--card:#ffffff;--text:#15213b;--muted:#5b6782;--line:#d9dfe9;--gold:#f2b84b;--ok:#23a26a;--bad:#d8434e;
  font-family:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:17px;line-height:1.55;color:#e9eefb;background:var(--ink);
  background-image:radial-gradient(circle at 15% -10%,color-mix(in srgb,var(--ac) 28%,transparent),transparent 45%),radial-gradient(circle at 110% 110%,rgba(242,184,75,.12),transparent 40%);
  min-height:100vh;box-sizing:border-box;padding:0 16px 48px;color-scheme:dark}
.ep *,.ep *::before,.ep *::after{box-sizing:border-box}
.ep h1,.ep h2,.ep h3{font-family:"Bricolage Grotesque","Atkinson Hyperlegible",system-ui,sans-serif;line-height:1.15;text-wrap:balance;margin:0}
.ep button{font:inherit;cursor:pointer}
.ep button:focus-visible,.ep input:focus-visible,.ep select:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.ep-wrap{max-width:980px;margin:0 auto}
.ep-bar{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:12px 0;margin-bottom:8px;background:color-mix(in srgb,var(--ink) 88%,transparent);backdrop-filter:blur(6px);border-bottom:1px solid var(--ink3)}
.ep-bar-title{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-weight:700;font-size:1rem;flex:1 1 200px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ep-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;background:var(--ink2);border:1px solid var(--ink3);font-size:.85rem;font-variant-numeric:tabular-nums;white-space:nowrap}
.ep-slots{display:flex;gap:4px}
.ep-slot{width:26px;height:30px;border-radius:6px;display:grid;place-items:center;font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-weight:700;background:var(--ink2);border:1px dashed var(--ink3);color:var(--muted)}
.ep-slot.on{background:var(--gold);border:1px solid var(--gold);color:#241a02}
.ep-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 18px;border-radius:10px;border:0;background:var(--ac);color:#fff;font-weight:700;text-decoration:none}
.ep-btn:hover{filter:brightness(1.08)}
.ep-btn.ghost{background:transparent;color:inherit;border:1px solid currentColor}
.ep-btn.small{padding:6px 12px;font-size:.9rem}
.ep-btn.gold{background:var(--gold);color:#241a02}
.ep-btn[disabled]{opacity:.45;cursor:not-allowed}
.ep-hero{padding:40px 0 16px;display:grid;gap:18px}
.ep-kicker{font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:700}
.ep-hero h1{font-size:clamp(2rem,5vw,3.2rem)}
.ep-story{background:var(--ink2);border:1px solid var(--ink3);border-radius:16px;padding:20px 22px;max-width:70ch}
.ep-story p{margin:.4em 0}
.ep-startrow{display:flex;flex-wrap:wrap;gap:12px;align-items:end}
.ep-field{display:grid;gap:6px;flex:1 1 240px;max-width:360px}
.ep-field label{font-size:.85rem;color:#b9c3dc}
.ep input[type=text],.ep select{font:inherit;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--text);width:100%}
.ep-meta{display:flex;flex-wrap:wrap;gap:8px}
.ep-howto{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:6px}
.ep-howto div{background:var(--ink2);border:1px solid var(--ink3);border-radius:12px;padding:12px 14px;font-size:.92rem;color:#c9d2e8}
.ep-howto b{display:block;color:#fff;margin-bottom:2px}
.ep-hubhead{display:grid;gap:6px;padding:20px 0 8px}
.ep-hubhead p{margin:0;color:#b9c3dc;max-width:70ch}
.ep-map{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px;padding:16px 0}
.ep-node{position:relative;text-align:left;border-radius:16px;padding:18px;min-height:150px;display:flex;flex-direction:column;gap:8px;border:1px solid var(--ink3);background:var(--ink2);color:inherit;transition:transform .15s ease,border-color .15s ease}
.ep-node:hover:not([disabled]){transform:translateY(-3px);border-color:var(--ac)}
.ep-node .n-label{font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:700}
.ep-node .n-title{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:1.15rem;font-weight:700;line-height:1.2}
.ep-node .n-status{margin-top:auto;font-size:.85rem;color:#b9c3dc;display:flex;align-items:center;gap:8px}
.ep-node .n-icon{position:absolute;right:14px;top:14px;width:34px;height:34px;opacity:.9}
.ep-node[disabled]{opacity:.5;cursor:not-allowed}
.ep-node.done{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,var(--ink2))}
.ep-node.done .n-status{color:#9fe3c2}
.ep-f-gallery .ep-node{background:#f3efe6;color:#2a2217;border:10px solid #6b4f2f;box-shadow:inset 0 0 0 2px #c9a86a,0 8px 18px rgba(0,0,0,.35);border-radius:4px}
.ep-f-gallery .ep-node .n-label{color:#8a5a1c}.ep-f-gallery .ep-node .n-status{color:#5c4a33}
.ep-f-gallery .ep-node.done{background:#e5f3ea;border-color:#6b4f2f}
.ep-f-mystery .ep-node{background:#e9dcbf;color:#2d2412;border:0;border-radius:4px 14px 4px 4px;box-shadow:0 8px 18px rgba(0,0,0,.35)}
.ep-f-mystery .ep-node::before{content:"";position:absolute;top:-12px;left:0;width:45%;height:14px;background:#e9dcbf;border-radius:8px 8px 0 0}
.ep-f-mystery .ep-node .n-label{color:#8b2d1d}.ep-f-mystery .ep-node .n-status{color:#5a4a2c}
.ep-f-mystery .ep-node.done{background:#dfe9cf}
.ep-f-mystery .ep-map{padding-top:28px;row-gap:34px}
.ep-f-fieldtrip .ep-map,.ep-f-quest .ep-map{grid-template-columns:1fr;gap:0;max-width:640px}
.ep-f-fieldtrip .ep-node,.ep-f-quest .ep-node{min-height:0;margin-left:34px;margin-bottom:18px}
.ep-f-fieldtrip .ep-node::before,.ep-f-quest .ep-node::before{content:"";position:absolute;left:-24px;top:22px;width:16px;height:16px;border-radius:50%;background:var(--ink);border:3px solid var(--ac)}
.ep-f-fieldtrip .ep-node::after,.ep-f-quest .ep-node::after{content:"";position:absolute;left:-17px;top:40px;bottom:-20px;border-left:3px dashed var(--ink3)}
.ep-f-fieldtrip .ep-node:last-child::after,.ep-f-quest .ep-node:last-child::after{display:none}
.ep-f-fieldtrip .ep-node.done::before,.ep-f-quest .ep-node.done::before{background:var(--ok);border-color:var(--ok)}
.ep-f-quest .ep-node{border-width:2px}
.ep-final-node{border-style:dashed}
.ep-stage{padding:12px 0;display:grid;gap:18px}
.ep-stagehead{display:flex;flex-wrap:wrap;align-items:center;gap:12px;justify-content:space-between}
.ep-stagehead h2{font-size:clamp(1.5rem,3.5vw,2.1rem)}
.ep-content{background:var(--paper);color:var(--text);border-radius:16px;padding:22px 24px;box-shadow:0 10px 28px rgba(0,0,0,.25)}
.ep-content p{margin:.5em 0;max-width:72ch}
.ep-content h3{font-size:1.15rem;margin:.6em 0 .2em}
.ep-content table{border-collapse:collapse;margin:10px 0;font-variant-numeric:tabular-nums;background:#fff}
.ep-content th,.ep-content td{border:1px solid var(--line);padding:6px 10px;text-align:left}
.ep-content th{background:#eef1f7}
.ep-content .tablewrap{overflow-x:auto}
.ep-content ul,.ep-content ol{padding-left:1.3em;margin:.4em 0}
.ep-content blockquote{margin:10px 0;padding:10px 16px;border-left:4px solid var(--ac);background:#fff;border-radius:0 10px 10px 0}
.ep-content .note{font-size:.9rem;color:var(--muted)}
.ep-f-gallery .ep-content{border:12px solid #6b4f2f;box-shadow:inset 0 0 0 2px #c9a86a,0 10px 28px rgba(0,0,0,.35);border-radius:4px;background:#f7f3ea}
.ep-f-mystery .ep-content{background:#f1e7cf;font-family:"Courier Prime","Courier New",ui-monospace,monospace;font-size:.98rem}
.ep-f-fieldtrip .ep-content{border-top:8px solid var(--ac)}
.ep-puzzle{background:var(--card);color:var(--text);border-radius:16px;padding:18px 20px;display:grid;gap:12px;border:2px solid transparent}
.ep-puzzle.solved{border-color:var(--ok)}
.ep .shake{animation:ep-shake .35s}
@keyframes ep-shake{25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
.ep-q{font-weight:700;font-size:1.05rem}
.ep-qnum{font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:700}
.ep-choices{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}
.ep-choice{text-align:left;padding:12px 14px;border-radius:10px;border:2px solid var(--line);background:#fff;color:var(--text)}
.ep-choice:hover{border-color:var(--ac)}
.ep-choice.sel{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,#fff)}
.ep-choice.right{border-color:var(--ok);background:#e6f6ee}
.ep-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.ep-row input[type=text]{max-width:280px}
.ep-fb{font-size:.95rem;font-weight:700;min-height:1.2em}
.ep-fb.bad{color:var(--bad)}.ep-fb.good{color:var(--ok)}
.ep-hint{background:#fff7e3;border:1px solid #f0d596;color:#5c4308;border-radius:10px;padding:10px 12px;font-size:.95rem}
.ep-explain{background:#e9f7f0;border:1px solid #b5e2cb;color:#10492f;border-radius:10px;padding:10px 12px;font-size:.95rem}
.ep-pool{display:flex;flex-wrap:wrap;gap:8px;min-height:48px;padding:10px;border-radius:12px;background:#eef1f7;border:1px dashed #b8c2d6}
.ep-chip{padding:8px 12px;border-radius:999px;border:2px solid #c6cfe0;background:#fff;color:var(--text);font-size:.95rem;text-align:left}
.ep-chip.sel{border-color:var(--ac);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac) 30%,transparent)}
.ep-buckets{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.ep-bucket{border-radius:12px;border:2px solid var(--line);background:#fafbfd;padding:10px;display:grid;align-content:start;gap:8px;min-height:110px;text-align:left;color:var(--text)}
.ep-bucket:hover{border-color:var(--ac)}
.ep-bucket-h{font-weight:700;font-size:.95rem;border-bottom:1px solid var(--line);padding-bottom:6px}
.ep-bucket .ep-chip{justify-self:start}
.ep-tip{font-size:.85rem;color:var(--muted)}
.ep-order{display:grid;gap:6px;counter-reset:ord}
.ep-ord{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:#fafbfd}
.ep-ord::before{counter-increment:ord;content:counter(ord);font-family:"JetBrains Mono",ui-monospace,monospace;font-weight:700;color:var(--ac);width:1.4em}
.ep-ord span{flex:1}
.ep-ord button{width:34px;height:34px;border-radius:8px;border:1px solid var(--line);background:#fff;color:var(--text)}
.ep-match{display:grid;gap:8px}
.ep-mrow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:10px;align-items:center;padding:8px 10px;border-radius:10px;background:#fafbfd;border:1px solid var(--line)}
@media (max-width:560px){.ep-mrow{grid-template-columns:1fr}}
.ep-reward{background:linear-gradient(135deg,#2b2006,#4a3608);border:1px solid var(--gold);border-radius:16px;padding:22px;display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:space-between}
.ep-reward .big{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:2.6rem;font-weight:800;width:74px;height:84px;border-radius:12px;display:grid;place-items:center;background:var(--gold);color:#241a02;animation:ep-pop .5s ease}
@keyframes ep-pop{0%{transform:scale(.3) rotate(-20deg)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
.ep-final{padding:30px 0;display:grid;gap:18px;justify-items:start}
.ep-lock{display:flex;gap:8px;flex-wrap:wrap}
.ep-lock input{width:54px!important;height:64px;text-align:center;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:1.8rem;font-weight:800;text-transform:uppercase;padding:0!important}
.ep-cert{background:#fbfaf5;color:#1d2433;border-radius:18px;padding:30px;border:3px double #b98a2c;max-width:680px;width:100%;display:grid;gap:10px;text-align:center;justify-items:center}
.ep-cert h2{font-size:2rem}
.ep-cert .code{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:1.5rem;font-weight:800;letter-spacing:.08em;background:#1d2433;color:var(--gold);padding:8px 16px;border-radius:10px}
.ep-stats{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.ep-stats div{background:#eef1f7;border-radius:10px;padding:8px 14px;font-variant-numeric:tabular-nums}
.ep-teacher{background:#3b2a5c;color:#fff;border:1px dashed #b89cf0}
.ep-confetti{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:50}
.ep-confetti i{position:absolute;top:-20px;width:10px;height:16px;border-radius:2px;animation:ep-fall linear forwards}
@keyframes ep-fall{to{transform:translateY(110vh) rotate(720deg)}}
@media (prefers-reduced-motion:reduce){.ep *{animation:none!important;transition:none!important}.ep-confetti{display:none}}
@media print{.ep{background:#fff;color:#000}.ep-bar,.ep-noprint{display:none!important}.ep-cert{border-color:#999}}
`;
  if (!document.getElementById('ep-style')) {
    var st = document.createElement('style'); st.id = 'ep-style'; st.textContent = CSS; document.head.appendChild(st);
  }

  /* ---------- state ---------- */
  var KEY = 'crossroads-escape:' + room.id;
  function blank() { return { name: '', started: false, elapsed: 0, solved: {}, firstTry: {}, tries: {}, hinted: {}, done: [], finished: false }; }
  var S = blank();
  if (!opts.preview) {
    try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.solved) S = Object.assign(blank(), saved); } catch (e) {}
  }
  function save() { if (opts.preview) return; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  var view = S.finished ? 'done' : (S.started ? 'hub' : 'start');
  var current = 0;
  var work = {};     // in-progress answers, not saved
  var feedback = {}; // key -> {cls, text}
  var tick = null;

  var root = document.createElement('div');
  root.className = 'ep ep-f-' + (room.format || 'escape');
  root.style.setProperty('--ac', ACCENTS[room.subject] || '#3A7BE0');
  mount.innerHTML = '';
  mount.appendChild(root);

  function startTimer() {
    if (tick) return;
    var last = Date.now();
    tick = setInterval(function () {
      if (!document.body.contains(root)) { clearInterval(tick); return; }
      var now = Date.now();
      if (!S.finished && document.visibilityState !== 'hidden') { S.elapsed += (now - last) / 1000; }
      last = now;
      var t = root.querySelector('[data-timer]');
      if (t) t.textContent = fmtTime(S.elapsed);
      if (Math.floor(S.elapsed) % 5 === 0) save();
    }, 1000);
  }

  function totalPuzzles() { return stages.reduce(function (n, s) { return n + s.puzzles.length; }, 0); }
  function solvedCount() { return Object.keys(S.solved).length; }
  function stageOpen(i) { return !fmt.ordered || i === 0 || S.done[i - 1] || opts.preview; }
  function allDone() { return stages.every(function (_, i) { return S.done[i]; }); }

  /* ---------- icons (inline SVG) ---------- */
  function icon(kind, done) {
    var c = done ? '#23a26a' : 'currentColor';
    var paths = {
      escape: done ? '<path d="M8 11V8a4 4 0 0 1 7.5-2" fill="none" stroke="' + c + '" stroke-width="2"/><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="' + c + '" stroke-width="2"/>'
                   : '<path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="' + c + '" stroke-width="2"/><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="' + c + '" stroke-width="2"/><circle cx="12" cy="16" r="1.5" fill="' + c + '"/>',
      gallery: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M6 17l4-5 3 3 2-2 3 4" fill="none" stroke="' + c + '" stroke-width="2"/><circle cx="15" cy="8.5" r="1.5" fill="' + c + '"/>',
      fieldtrip: '<path d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z" fill="none" stroke="' + c + '" stroke-width="2"/><circle cx="12" cy="10" r="2.2" fill="' + c + '"/>',
      mystery: '<circle cx="10" cy="10" r="5.5" fill="none" stroke="' + c + '" stroke-width="2"/><path d="M14 14l6 6" stroke="' + c + '" stroke-width="2.5" stroke-linecap="round"/>',
      quest: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="none" stroke="' + c + '" stroke-width="2" stroke-linejoin="round"/>'
    };
    return '<svg class="n-icon" viewBox="0 0 24 24" aria-hidden="true">' + (paths[kind] || paths.escape) + '</svg>';
  }

  /* ---------- rendering ---------- */
  function bar() {
    var slots = code.map(function (ch, i) { return '<span class="ep-slot' + (S.done[i] ? ' on' : '') + '" title="' + esc(nodeName(i)) + '">' + (S.done[i] ? esc(ch) : '?') + '</span>'; }).join('');
    return '<div class="ep-bar"><div class="ep-bar-title">' + esc(room.title) + '</div>' +
      '<span class="ep-pill" title="Time spent">Time <b data-timer>' + fmtTime(S.elapsed) + '</b></span>' +
      '<span class="ep-pill">' + solvedCount() + '/' + totalPuzzles() + ' solved</span>' +
      '<span class="ep-slots" aria-label="Code pieces found">' + slots + '</span>' +
      (opts.onExit ? '<button class="ep-btn small ghost" data-act="exit">Exit preview</button>' : '') + '</div>';
  }

  function renderStart() {
    return '<div class="ep-wrap"><div class="ep-hero">' +
      (opts.onExit ? '<div><button class="ep-btn small ghost" data-act="exit">Exit preview</button></div>' : '') +
      '<div class="ep-kicker">' + esc(fmt.label) + ' · Grade ' + esc(room.grade) + ' · ' + esc(room.standard) + '</div>' +
      '<h1>' + esc(room.title) + '</h1>' +
      '<div class="ep-story">' + room.story + '<p><b>' + esc(fmt.intro) + '</b></p></div>' +
      '<div class="ep-meta"><span class="ep-pill">About ' + esc(room.minutes || '25–30') + ' minutes</span><span class="ep-pill">' + stages.length + ' ' + esc(fmt.node.toLowerCase()) + 's</span><span class="ep-pill">' + totalPuzzles() + ' puzzles</span></div>' +
      '<div class="ep-howto"><div><b>Solve</b>Read each card carefully, then answer every puzzle.</div><div><b>Collect</b>Each finished ' + esc(fmt.node.toLowerCase()) + ' gives you one piece of the final code.</div><div><b>Escape</b>Type the full code into the final lock to finish.</div><div><b>Stuck?</b>Use a hint, or reread the card. Wrong answers are okay. Keep trying!</div></div>' +
      '<div class="ep-startrow"><div class="ep-field"><label for="ep-name">Your name (for your certificate)</label><input type="text" id="ep-name" maxlength="40" autocomplete="off" value="' + esc(S.name) + '"></div>' +
      '<button class="ep-btn gold" data-act="begin">Begin</button></div>' +
      '<div class="ep-fb bad" data-startfb></div></div></div>';
  }

  function renderHub() {
    var nodes = stages.map(function (s, i) {
      var open = stageOpen(i), done = !!S.done[i];
      var solvedHere = s.puzzles.filter(function (_, p) { return S.solved[i + '-' + p]; }).length;
      var status = done ? 'Complete · code piece ' + esc(code[i]) : (open ? (solvedHere ? solvedHere + ' of ' + s.puzzles.length + ' solved' : fmt.verb + ' →') : 'Locked · finish ' + esc(nodeName(i - 1)) + ' first');
      return '<button class="ep-node' + (done ? ' done' : '') + '" data-act="open" data-i="' + i + '"' + (open ? '' : ' disabled') + '>' +
        icon(room.format, done) + '<span class="n-label">' + esc(nodeName(i)) + '</span><span class="n-title">' + esc(stageTitle(i)) + '</span><span class="n-status">' + status + '</span></button>';
    }).join('');
    var ready = allDone();
    nodes += '<button class="ep-node ep-final-node" data-act="final"' + (ready ? '' : ' disabled') + '>' + icon('escape', false) +
      '<span class="n-label">Final Lock</span><span class="n-title">' + esc(room.finalTitle || 'Enter the final code') + '</span><span class="n-status">' + (ready ? 'All pieces found. Open the lock →' : 'Collect all ' + stages.length + ' code pieces') + '</span></button>';
    return bar() + '<div class="ep-wrap"><div class="ep-hubhead"><div class="ep-kicker">' + esc(fmt.label) + '</div><h2>' + esc(room.hubTitle || 'Choose your next move') + '</h2><p>' + esc(fmt.intro) + '</p></div><div class="ep-map">' + nodes + '</div></div>';
  }

  function renderPuzzle(p, i, j) {
    var key = i + '-' + j, solved = !!S.solved[key], fb = feedback[key];
    var h = '<div class="ep-puzzle' + (solved ? ' solved' : '') + '" data-key="' + key + '">' +
      '<div class="ep-qnum">Puzzle ' + (j + 1) + ' of ' + stages[i].puzzles.length + (solved ? ' · Solved ✓' : '') + '</div>' +
      '<div class="ep-q">' + p.q + '</div>';
    var dis = solved ? ' disabled' : '';
    if (p.type === 'mc' || p.type === 'tf') {
      var choices = p.type === 'tf' ? ['True', 'False'] : p.choices;
      var order = p.type === 'tf' ? [0, 1] : shuffled(choices.map(function (_, k) { return k; }), room.id + key);
      h += '<div class="ep-choices">' + order.map(function (k) {
        var cls = solved && k === answerIndex(p) ? ' right' : (work[key] === k ? ' sel' : '');
        return '<button class="ep-choice' + cls + '" data-act="pick" data-key="' + key + '" data-k="' + k + '"' + dis + '>' + choices[k] + '</button>';
      }).join('') + '</div>';
    } else if (p.type === 'input') {
      var val = solved ? [].concat(p.answer)[0] : (work[key] || '');
      h += '<div class="ep-row"><input type="text" id="ep-in-' + key + '" data-input="' + key + '" value="' + esc(val) + '" placeholder="' + esc(p.placeholder || 'Type your answer') + '" autocomplete="off"' + dis + '>' + (p.unit ? '<span>' + esc(p.unit) + '</span>' : '') + '</div>';
    } else if (p.type === 'sort') {
      var w = work[key] || (work[key] = { place: {}, sel: null });
      var items = shuffled(p.items.map(function (_, k) { return k; }), room.id + key);
      if (solved) p.items.forEach(function (it, k) { w.place[k] = it[1]; });
      var chip = function (k) { return '<button class="ep-chip' + (w.sel === k ? ' sel' : '') + '" data-act="chip" data-key="' + key + '" data-k="' + k + '"' + dis + '>' + p.items[k][0] + '</button>'; };
      var pool = items.filter(function (k) { return w.place[k] == null; });
      h += '<div class="ep-tip">Tap an item, then tap the group where it belongs. Tap a placed item to move it back.</div>' +
        '<div class="ep-pool" aria-label="Items to sort">' + (pool.length ? pool.map(chip).join('') : '<span class="ep-tip">All items placed.</span>') + '</div>' +
        '<div class="ep-buckets">' + p.buckets.map(function (b, bi) {
          return '<div class="ep-bucket" role="button" tabindex="0" data-act="bucket" data-key="' + key + '" data-b="' + bi + '"><div class="ep-bucket-h">' + b + '</div>' +
            items.filter(function (k) { return w.place[k] === bi; }).map(chip).join('') + '</div>';
        }).join('') + '</div>';
    } else if (p.type === 'order') {
      if (!work[key]) work[key] = shuffled(p.items.map(function (_, k) { return k; }), room.id + key);
      var ord = solved ? p.items.map(function (_, k) { return k; }) : work[key];
      h += '<div class="ep-tip">' + esc(p.tip || 'Use the arrows to put the items in order, first to last.') + '</div><div class="ep-order">' + ord.map(function (k, pos) {
        return '<div class="ep-ord"><span>' + p.items[k] + '</span>' + (solved ? '' :
          '<button data-act="up" data-key="' + key + '" data-pos="' + pos + '" aria-label="Move up"' + (pos === 0 ? ' disabled' : '') + '>▲</button><button data-act="down" data-key="' + key + '" data-pos="' + pos + '" aria-label="Move down"' + (pos === ord.length - 1 ? ' disabled' : '') + '>▼</button>') + '</div>';
      }).join('') + '</div>';
    } else if (p.type === 'match') {
      var mw = work[key] || (work[key] = {});
      var rights = shuffled(p.pairs.map(function (_, k) { return k; }), room.id + key + 'r');
      h += '<div class="ep-match">' + p.pairs.map(function (pr, k) {
        var chosen = solved ? k : mw[k];
        return '<div class="ep-mrow"><div>' + pr[0] + '</div><select id="ep-m-' + key + '-' + k + '" data-match="' + key + '" data-k="' + k + '"' + dis + '><option value="">Choose a match…</option>' +
          rights.map(function (r) { return '<option value="' + r + '"' + (chosen === r ? ' selected' : '') + '>' + esc(p.pairs[r][1].replace(/<[^>]+>/g, '')) + '</option>'; }).join('') + '</select></div>';
      }).join('') + '</div>';
    }
    if (!solved) {
      h += '<div class="ep-row"><button class="ep-btn" data-act="check" data-key="' + key + '">Check</button>' +
        (p.hint ? '<button class="ep-btn small ghost" style="color:var(--muted)" data-act="hint" data-key="' + key + '">' + (S.hinted[key] ? 'Hint shown' : 'Hint') + '</button>' : '') +
        (opts.preview ? '<button class="ep-btn small ep-teacher" data-act="solve" data-key="' + key + '">Teacher: show answer</button>' : '') +
        '<span class="ep-fb ' + (fb ? fb.cls : '') + '" aria-live="polite">' + (fb ? esc(fb.text) : '') + '</span></div>';
      if (S.hinted[key] && p.hint) h += '<div class="ep-hint"><b>Hint:</b> ' + p.hint + '</div>';
    } else if (p.explain) {
      h += '<div class="ep-explain"><b>Why:</b> ' + p.explain + '</div>';
    }
    return h + '</div>';
  }

  function answerIndex(p) { return p.type === 'tf' ? (p.answer ? 0 : 1) : p.answer; }

  function renderStage() {
    var s = stages[current], i = current;
    var h = bar() + '<div class="ep-wrap"><div class="ep-stage"><div class="ep-stagehead"><div><div class="ep-kicker">' + esc(nodeName(i)) + '</div><h2>' + esc(stageTitle(i)) + '</h2></div>' +
      '<button class="ep-btn small ghost" data-act="hub">← Back to ' + (room.format === 'gallery' ? 'gallery' : room.format === 'mystery' ? 'case board' : 'map') + '</button></div>' +
      '<div class="ep-content">' + s.content + '</div>' +
      s.puzzles.map(function (p, j) { return renderPuzzle(p, i, j); }).join('');
    if (S.done[i]) {
      h += '<div class="ep-reward"><div><div class="ep-kicker">' + esc(nodeName(i)) + ' complete</div><h3 style="font-size:1.4rem;margin-top:4px">You found a code piece!</h3><p style="margin:.3em 0 0;color:#f3e2b8">It goes in slot ' + (i + 1) + ' of the final code.</p></div><div class="big">' + esc(code[i]) + '</div>' +
        '<button class="ep-btn gold" data-act="' + (allDone() ? 'final' : 'hub') + '">' + (allDone() ? 'Go to the final lock →' : 'Back to the map →') + '</button></div>';
    }
    return h + '</div></div>';
  }

  function renderFinal() {
    var inputs = code.map(function (_, k) { return '<input type="text" maxlength="1" id="ep-lock-' + k + '" data-lock="' + k + '" aria-label="Code character ' + (k + 1) + '" autocomplete="off">'; }).join('');
    return bar() + '<div class="ep-wrap"><div class="ep-final"><button class="ep-btn small ghost" data-act="hub">← Back</button><div class="ep-kicker">Final Lock</div><h2 style="font-size:clamp(1.8rem,4vw,2.6rem)">' + esc(room.finalTitle || 'Enter the final code') + '</h2>' +
      '<div class="ep-story">' + (room.finalPrompt || '<p>Look at the code pieces you collected at the top of the screen. Type them in order, slot 1 to slot ' + code.length + '.</p>') + '</div>' +
      '<div class="ep-lock">' + inputs + '</div><div class="ep-row"><button class="ep-btn gold" data-act="unlock">Unlock</button><span class="ep-fb bad" data-lockfb aria-live="polite"></span></div></div></div>';
  }

  function renderDone() {
    var total = totalPuzzles();
    var first = Object.keys(S.firstTry).filter(function (k) { return S.firstTry[k]; }).length;
    var acc = total ? Math.round(first / total * 100) : 100;
    return '<div class="ep-wrap"><div class="ep-final" style="justify-items:center;text-align:center">' +
      (opts.onExit ? '<button class="ep-btn small ghost ep-noprint" data-act="exit">Exit preview</button>' : '') +
      '<div class="ep-kicker">You escaped!</div><h1 style="font-size:clamp(2rem,5vw,3rem)">' + esc(room.title) + '</h1>' +
      '<div class="ep-story" style="text-align:left">' + (room.finale || '<p>Great work. You finished every challenge.</p>') + '</div>' +
      '<div class="ep-cert"><div class="ep-kicker" style="color:#8a6317">Certificate of Completion</div><h2>' + esc(S.name || 'Student') + '</h2>' +
      '<div>completed <b>' + esc(room.title) + '</b><br>Grade ' + esc(room.grade) + ' · ' + esc(room.standard) + '</div>' +
      '<div class="ep-stats"><div>Time <b>' + fmtTime(S.finishTime || S.elapsed) + '</b></div><div>First-try accuracy <b>' + acc + '%</b></div><div>Hints <b>' + Object.keys(S.hinted).length + '</b></div></div>' +
      '<div style="font-size:.9rem;color:#5b6782">Completion code (turn this in to your teacher)</div><div class="code">' + esc(completionCode(S.name)) + '</div>' +
      '<div style="font-size:.85rem;color:#5b6782">' + new Date().toLocaleDateString() + '</div></div>' +
      '<div class="ep-row ep-noprint" style="justify-content:center"><button class="ep-btn gold" data-act="print">Print certificate</button><button class="ep-btn ghost" data-act="restart">Play again</button></div></div></div>';
  }

  function render() {
    var views = { start: renderStart, hub: renderHub, stage: renderStage, final: renderFinal, done: renderDone };
    root.innerHTML = views[view]();
    if (view !== 'start' && view !== 'done') startTimer();
  }

  function goto(v, i) {
    view = v; if (i != null) current = i;
    render();
    try { (root.closest('.cx-play-scroll') || window).scrollTo(0, 0); } catch (e) { window.scrollTo(0, 0); }
  }

  /* ---------- checking ---------- */
  function check(key) {
    var ij = key.split('-'), i = +ij[0], j = +ij[1], p = stages[i].puzzles[j];
    var ok = false, msg = 'Not quite. Try again!';
    if (p.type === 'mc' || p.type === 'tf') {
      if (work[key] == null) { feedback[key] = { cls: 'bad', text: 'Choose an answer first.' }; return render(); }
      ok = work[key] === answerIndex(p);
    } else if (p.type === 'input') {
      var v = work[key] || '';
      if (!String(v).trim()) { feedback[key] = { cls: 'bad', text: 'Type an answer first.' }; return render(); }
      ok = [].concat(p.answer).some(function (a) {
        var na = toNum(a), nv = toNum(v);
        if (na != null && nv != null) return Math.abs(na - nv) < (p.tolerance || 1e-6);
        return norm(a) === norm(v);
      });
    } else if (p.type === 'sort') {
      var w = work[key] || { place: {} };
      var placed = p.items.filter(function (_, k) { return w.place[k] != null; }).length;
      if (placed < p.items.length) { feedback[key] = { cls: 'bad', text: 'Place every item first (' + placed + ' of ' + p.items.length + ' placed).' }; return render(); }
      var right = p.items.filter(function (it, k) { return w.place[k] === it[1]; }).length;
      ok = right === p.items.length;
      msg = right + ' of ' + p.items.length + ' are in the right group. Move the others!';
    } else if (p.type === 'order') {
      var ord = work[key], inPlace = ord.filter(function (k, pos) { return k === pos; }).length;
      ok = inPlace === ord.length;
      msg = inPlace + ' of ' + ord.length + ' are in the right spot. Keep adjusting!';
    } else if (p.type === 'match') {
      var mw = work[key] || {};
      var chosen = p.pairs.filter(function (_, k) { return mw[k] != null; }).length;
      if (chosen < p.pairs.length) { feedback[key] = { cls: 'bad', text: 'Choose a match for every row first.' }; return render(); }
      var good = p.pairs.filter(function (_, k) { return mw[k] === k; }).length;
      ok = good === p.pairs.length;
      msg = good + ' of ' + p.pairs.length + ' matches are correct.';
    }
    S.tries[key] = (S.tries[key] || 0) + 1;
    if (ok) {
      markSolved(key);
    } else {
      feedback[key] = { cls: 'bad', text: msg + (S.tries[key] >= 2 && p.hint && !S.hinted[key] ? ' A hint is available.' : '') };
      save(); render();
      var el = root.querySelector('.ep-puzzle[data-key="' + key + '"]');
      if (el) { el.classList.add('shake'); }
    }
  }

  function markSolved(key) {
    var i = +key.split('-')[0];
    S.solved[key] = true;
    if (S.firstTry[key] == null) S.firstTry[key] = (S.tries[key] || 1) === 1 && !S.hinted[key];
    feedback[key] = null;
    if (stages[i].puzzles.every(function (_, j) { return S.solved[i + '-' + j]; })) S.done[i] = true;
    save(); render();
    var el = root.querySelector('.ep-puzzle[data-key="' + key + '"]');
    if (S.done[i]) el = root.querySelector('.ep-reward') || el;
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function confetti() {
    var box = document.createElement('div'); box.className = 'ep-confetti';
    var colors = ['#f2b84b', '#23a26a', '#3A7BE0', '#d8434e', '#8C5BD0', '#1E9E8A'];
    for (var k = 0; k < 90; k++) {
      var c = document.createElement('i');
      c.style.left = Math.random() * 100 + '%';
      c.style.background = colors[k % colors.length];
      c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
      c.style.animationDelay = (Math.random() * .8) + 's';
      box.appendChild(c);
    }
    root.appendChild(box);
    setTimeout(function () { box.remove(); }, 5500);
  }

  /* ---------- events ---------- */
  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t || t.disabled) return;
    var act = t.getAttribute('data-act'), key = t.getAttribute('data-key');
    if (act === 'begin') {
      var nm = root.querySelector('#ep-name').value.trim();
      if (!nm) { root.querySelector('[data-startfb]').textContent = 'Type your name to begin.'; return; }
      S.name = nm; S.started = true; save(); goto('hub');
    } else if (act === 'exit') { if (tick) clearInterval(tick); opts.onExit && opts.onExit(); }
    else if (act === 'open') goto('stage', +t.getAttribute('data-i'));
    else if (act === 'hub') goto('hub');
    else if (act === 'final') { if (allDone()) goto('final'); }
    else if (act === 'pick') { work[key] = +t.getAttribute('data-k'); feedback[key] = null; render(); }
    else if (act === 'check') check(key);
    else if (act === 'hint') { S.hinted[key] = true; save(); render(); }
    else if (act === 'solve') { markSolved(key); }
    else if (act === 'chip') {
      var w = work[key], k = +t.getAttribute('data-k');
      if (w.place[k] != null) { delete w.place[k]; w.sel = null; }
      else w.sel = w.sel === k ? null : k;
      feedback[key] = null; render();
    } else if (act === 'bucket') {
      var wb = work[key];
      if (wb && wb.sel != null) { wb.place[wb.sel] = +t.getAttribute('data-b'); wb.sel = null; feedback[key] = null; render(); }
    } else if (act === 'up' || act === 'down') {
      var o = work[key], pos = +t.getAttribute('data-pos'), to = act === 'up' ? pos - 1 : pos + 1;
      var tmp = o[pos]; o[pos] = o[to]; o[to] = tmp; feedback[key] = null; render();
    } else if (act === 'unlock') {
      var typed = code.map(function (_, k) { return (root.querySelector('#ep-lock-' + k).value || '').toUpperCase(); }).join('');
      if (typed === code.join('')) {
        S.finished = true; S.finishTime = S.elapsed; save(); goto('done'); confetti();
      } else {
        root.querySelector('[data-lockfb]').textContent = 'The lock will not budge. Check the order of your code pieces.';
        var lk = root.querySelector('.ep-lock'); lk.classList.remove('shake'); void lk.offsetWidth; lk.classList.add('shake');
      }
    } else if (act === 'print') { window.print(); }
    else if (act === 'restart') {
      if (t.getAttribute('data-sure') !== '1') { t.setAttribute('data-sure', '1'); t.textContent = 'Tap again to erase progress'; return; }
      S = blank(); work = {}; feedback = {}; save(); goto('start');
    }
  });
  root.addEventListener('keydown', function (e) {
    var t = e.target;
    if ((e.key === 'Enter' || e.key === ' ') && t.classList && t.classList.contains('ep-bucket')) { e.preventDefault(); t.click(); }
    if (e.key === 'Enter' && t.getAttribute && t.getAttribute('data-input')) { e.preventDefault(); check(t.getAttribute('data-input')); }
    if (e.key === 'Enter' && t.id === 'ep-name') root.querySelector('[data-act=begin]').click();
    if (t.getAttribute && t.getAttribute('data-lock') != null && e.key === 'Enter') root.querySelector('[data-act=unlock]').click();
    if (t.getAttribute && t.getAttribute('data-lock') != null && e.key === 'Backspace' && !t.value) {
      var prev = root.querySelector('#ep-lock-' + (+t.getAttribute('data-lock') - 1)); if (prev) prev.focus();
    }
  });
  root.addEventListener('input', function (e) {
    var t = e.target;
    if (t.getAttribute('data-input')) work[t.getAttribute('data-input')] = t.value;
    if (t.getAttribute('data-lock') != null && t.value) {
      var nx = root.querySelector('#ep-lock-' + (+t.getAttribute('data-lock') + 1)); if (nx) nx.focus();
    }
  });
  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t.getAttribute('data-match')) {
      var key = t.getAttribute('data-match');
      work[key] = work[key] || {};
      work[key][+t.getAttribute('data-k')] = t.value === '' ? null : +t.value;
      feedback[key] = null;
    }
  });
  root.addEventListener('animationend', function (e) { if (e.target.classList) e.target.classList.remove('shake'); });

  render();
  return { completionCode: completionCode };
}
if (typeof module !== 'undefined') module.exports = EscapePlayer;
