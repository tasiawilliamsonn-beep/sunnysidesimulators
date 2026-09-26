// Checks every room's data for structural problems. Run: node tests/validate.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} }; vm.createContext(ctx);
const dir = path.join(__dirname, '..', 'data');
const files = ['standards.js', ...fs.readdirSync(dir).filter(f => f !== 'standards.js' && f.endsWith('.js')).sort()];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const STD = {}; ctx.window.CX_STANDARDS.forEach(s => STD[s.id] = s);
const rooms = ctx.window.CX_ROOMS;
const errs = [], ids = new Set();
const FORMATS = ['escape', 'gallery', 'fieldtrip', 'mystery', 'quest'];
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
      else err(r, at + ' unknown type ' + p.type);
    });
  });
  if (n < 10) err(r, `only ${n} puzzles (need 10+ for 25-30 min)`);
  if (!r.exit || r.exit.length < 3) err(r, 'exit ticket needs 3+ questions');
  (r.exit || []).forEach((q, k) => { if (q.choices && !(q.answer >= 0 && q.answer < q.choices.length)) err(r, 'exit ' + k + ' bad answer'); if (!q.choices && typeof q.answer !== 'string') err(r, 'exit ' + k + ' needs answer text'); });
}
const perStd = {};
rooms.forEach(r => perStd[r.std] = (perStd[r.std] || 0) + 1);
for (const s of ctx.window.CX_STANDARDS) if ((perStd[s.id] || 0) < 3) errs.push(`standard ${s.id} has only ${perStd[s.id] || 0} rooms`);
console.log(`${rooms.length} rooms, ${ctx.window.CX_STANDARDS.length} standards, ${rooms.reduce((a, r) => a + r.stages.reduce((b, s) => b + s.puzzles.length, 0), 0)} puzzles`);
if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
console.log('OK');
