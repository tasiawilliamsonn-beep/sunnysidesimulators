// Checks every room's data for structural problems. Run: node tests/validate.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
const dir = path.join(__dirname, '..', 'data');
// Same order as index.html: standards, base rooms, fx upgrades, then apply-fx merges them.
const all = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
const files = ['standards.js', ...all.filter(f => /^g\d-/.test(f)), ...all.filter(f => /^fx-/.test(f)), 'lessons.js', 'lessons-plus.js', 'lessons-cues.js', 'gallery-art.js', 'tasks.js', 'apply-fx.js'];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
for (const f of ['themes.js', 'kit.js', 'player.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'), ctx, { filename: f });
const STD = {}; ctx.window.CX_STANDARDS.forEach(s => STD[s.id] = s);
const rooms = ctx.window.CX_ROOMS;
const errs = [], ids = new Set();
const FORMATS = ['escape', 'gallery', 'fieldtrip', 'mystery', 'quest'];
const INTERACTIVE = ['frac', 'numberline', 'plot', 'highlight', 'shade', 'build', 'coins', 'assemble', 'maya', 'balance', 'tap', 'write'];
function err(r, m) { errs.push(`${r.id || '?'}: ${m}`); }
for (const r of rooms) {
  if (ids.has(r.id)) err(r, 'duplicate id'); ids.add(r.id);
  if (!STD[r.std]) err(r, 'unknown std ' + r.std);
  if (!FORMATS.includes(r.format)) err(r, 'bad format');
  for (const k of ['title', 'tagline', 'story', 'finale']) if (!r[k]) err(r, 'missing ' + k);
  if (!r.stages || r.stages.length < 4) err(r, 'needs 4+ stages');
  if (r.code && r.code.length !== r.stages.length) err(r, `code ${r.code} length != ${r.stages.length} stages`);
  let n = 0;
  r.stages.forEach((s, i) => {
    if (!s.title || !s.content) err(r, `stage ${i} missing title/content`);
    if (!s.puzzles || !s.puzzles.length) err(r, `stage ${i} no puzzles`);
    s.puzzles.forEach((p, j) => {
      n++;
      const at = `stage ${i} puzzle ${j}`;
      if (!p.q) err(r, at + ' no q');
      if (p.type === 'mc') { if (!Array.isArray(p.choices) || p.choices.length < 2 || !(p.answer >= 0 && p.answer < p.choices.length)) err(r, at + ' bad mc'); if (new Set(p.choices).size !== p.choices.length) err(r, at + ' duplicate choices'); }
      else if (p.type === 'tf') { if (typeof p.answer !== 'boolean') err(r, at + ' tf answer must be boolean'); }
      else if (p.type === 'input') { if (p.answer == null || [].concat(p.answer).length === 0) err(r, at + ' no answer'); }
      else if (p.type === 'sort') { if (!p.buckets || !p.items || p.items.some(it => !(it[1] >= 0 && it[1] < p.buckets.length))) err(r, at + ' bad sort'); }
      else if (p.type === 'order') { if (!p.items || p.items.length < 3) err(r, at + ' bad order'); if (new Set(p.items).size !== p.items.length) err(r, at + ' duplicate order items'); }
      else if (p.type === 'match') { if (!p.pairs || p.pairs.length < 2) err(r, at + ' bad match'); if (new Set(p.pairs.map(x => x[1])).size !== p.pairs.length) err(r, at + ' duplicate match answers'); }
      else if (!INTERACTIVE.includes(p.type)) err(r, at + ' unknown type ' + p.type);
    });
  });
  if (n < 10) err(r, `only ${n} puzzles (need 10+ for 25-30 min)`);
  // Runs every answer key through the player's own checker (catches keys that can never be marked right).
  const problems = vm.runInContext('EscapePlayer', ctx)(null, r, { selfTest: true });
  problems.forEach(m => err(r, 'self-test ' + m));
  if (!r.theme) err(r, 'no theme');
  if (r.format === 'gallery') r.stages.forEach((s, i) => {
    if (!s.art) { err(r, `gallery stage ${i} has no artwork`); return; }
    if (!s.art.spots || s.art.spots.length < 3) err(r, `gallery stage ${i} needs 3+ look-closely spots`);
    (s.art.spots || []).forEach((sp, k) => { if (!(sp.x > 0 && sp.x < 600 && sp.y > 0 && sp.y < 380) || !sp.t || !sp.d) err(r, `stage ${i} spot ${k} is off the picture or empty`); });
  });
  if (!r.exit || r.exit.length < 3) err(r, 'exit ticket needs 3+ questions');
  (r.exit || []).forEach((q, k) => { if (q.choices && !(q.answer >= 0 && q.answer < q.choices.length)) err(r, 'exit ' + k + ' bad answer'); if (!q.choices && typeof q.answer !== 'string') err(r, 'exit ' + k + ' needs answer text'); });
}
// 60-minute lesson content: every standard needs a warm-up, 4+ presenter steps with working quick checks, and an evidence-based exit item
const LESSONS = ctx.window.CX_LESSONS || {};
for (const s of ctx.window.CX_STANDARDS) {
  const X = LESSONS[s.id], r = { id: 'lesson-' + s.id };
  if (!X) { err(r, 'missing lesson'); continue; }
  if (!X.warmup || X.warmup.length < 3) err(r, 'warm-up needs 3 questions');
  if (!X.steps || X.steps.length < 4) err(r, 'mini-lesson needs 4 steps');
  (X.steps || []).forEach((st, i) => { for (const k of ['t', 'say', 'note', 'do', 'check']) if (!st[k]) err(r, `step ${i} missing ${k}`); if (st.note && !/\[/.test(st.note)) err(r, `step ${i} note has no [blank]`); });
  if (!X.talk || X.talk.length < (X.steps || []).length) err(r, 'needs a turn-and-talk for every step');
  if (!X.wedo || !X.wedo.steps || !X.wedo.a) err(r, 'needs we-do practice');
  if (!X.youdo) err(r, 'needs a you-do check');
  if (!X.hook || !X.hook.q || (X.hook.options || []).length !== 3) err(r, 'hook needs a question and 3 vote options');
  if (!X.model || X.model.length < 3) err(r, 'needs a worked example (3+ lines)');
  if (!X.dos || X.dos.length !== (X.steps || []).length) err(r, 'needs a worksheet task for every step');
  // slides show only student cues: no teacher directions or outside materials
  const shown = [X.hook && X.hook.q].concat(X.model || [], X.dos || [], X.talk || [], (X.steps || []).map(st => st.say), (X.warmup || []).map(w => w[0]), X.wedo ? [X.wedo.q].concat(X.wedo.steps) : []);
  shown.forEach(t => { if (/\b(say|ask|tell the class|think aloud)\s*:|\bthe board\b|whiteboard|\blamp\b|volunteers?\b/i.test(t || '')) err(r, 'teacher language or outside material on a slide: ' + String(t).slice(0, 60)); });
  if (!X.exit || !['CER', 'RACE', 'SOURCE', 'MATH'].includes(X.exit.frame) || !X.exit.stim || !X.exit.model || !(X.exit.look || []).length) err(r, 'exit item incomplete');
  const room = { id: r.id, title: s.title, subject: s.subject, grade: s.grade, format: 'escape', stages: (X.steps || []).map(st => ({ title: st.t, content: '', visual: st.tool && !st.tool.sim ? st.tool : null, puzzles: [st.check] })).concat(X.youdo ? [{ title: 'You do', content: '', puzzles: [X.youdo] }] : []) };
  vm.runInContext('EscapePlayer', ctx)(null, room, { selfTest: true }).forEach(m => err(r, 'self-test ' + m));
}
const perStd = {};
rooms.forEach(r => perStd[r.std] = (perStd[r.std] || 0) + 1);
for (const s of ctx.window.CX_STANDARDS) if ((perStd[s.id] || 0) < 3) errs.push(`standard ${s.id} has only ${perStd[s.id] || 0} rooms`);
console.log(`${rooms.length} rooms, ${ctx.window.CX_STANDARDS.length} standards, ${rooms.reduce((a, r) => a + r.stages.reduce((b, s) => b + s.puzzles.length, 0), 0)} puzzles`);
if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
console.log('OK');
