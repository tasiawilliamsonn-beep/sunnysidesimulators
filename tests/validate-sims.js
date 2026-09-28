// Checks every Sunnyside simulator's data for structural problems. Run: node tests/validate-sims.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
function load(rel) { vm.runInContext('with (window) {' + fs.readFileSync(path.join(root, rel), 'utf8') + '\n}', ctx, { filename: rel }); }
load('data/standards.js');
fs.readdirSync(path.join(root, 'js')).filter(f => /^models-.*\.js$/.test(f)).sort().forEach(f => load('js/' + f));
const simFiles = fs.readdirSync(path.join(root, 'data')).filter(f => /^sims-.*\.js$/.test(f)).sort();
simFiles.forEach(f => load('data/' + f));

const W = ctx.window, SIMS = W.SUNNY_SIMS, MODELS = W.SUNNY_MODELS, STD = {};
W.CX_STANDARDS.forEach(s => STD[s.id] = s);
const errs = [], ids = new Set(), perStd = {};
const SUBJECTS = ['science', 'math', 'ela', 'social'];
const TAGS = ['read', 'explore', 'predict', 'test', 'observe', 'record', 'explain', 'apply', 'write', 'reason', 'check', 'challenge', 'model', 'practice', 'sort'];
function err(s, m) { errs.push(`${s.id || '?'}: ${m}`); }

// Every page that plays simulators must load every sims-*.js file.
for (const page of ['index.html', 'sim.html', 'sheet.html', 'present.html']) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  simFiles.forEach(f => { if (!html.includes('data/' + f)) errs.push(`${page}: does not load data/${f}`); });
}

for (const s of SIMS) {
  if (ids.has(s.id)) err(s, 'duplicate id'); ids.add(s.id);
  if (!STD[s.std]) err(s, 'unknown std ' + s.std); else if (STD[s.std].subject !== s.subject || STD[s.std].grade !== s.grade) err(s, 'subject/grade does not match its standard');
  if (!SUBJECTS.includes(s.subject)) err(s, 'bad subject ' + s.subject);
  if (typeof MODELS[s.model] !== 'function') err(s, 'missing model ' + s.model);
  for (const k of ['title', 'code', 'icon', 'place', 'mission', 'question', 'takeaway']) if (!s[k]) err(s, 'missing ' + k);
  if (!(s.minutes > 0)) err(s, 'missing minutes');
  if (!s.vocab || s.vocab.length < 3) err(s, 'needs 3+ vocab words');
  if (!s.warmup || !s.warmup.style || !s.warmup.items || s.warmup.items.length < 2) err(s, 'needs a warm-up with a style and 2+ items');
  if (!s.steps || s.steps.length < 4) err(s, 'needs 4+ steps');
  const stepIds = new Set();
  let sheets = 0, writes = 0, legend = 0;
  (s.steps || []).forEach((st, i) => {
    const at = `step ${i}`;
    if (st.id) { if (stepIds.has(st.id)) err(s, at + ' duplicate step id'); stepIds.add(st.id); }
    if (!TAGS.includes(st.tag)) err(s, at + ' bad tag ' + st.tag);
    if (!st.title) err(s, at + ' missing title');
    if (!st.goal && !st.q) err(s, at + ' has no goal and no question');
    if (st.goal && !st.goal.check && !st.goal.auto) err(s, at + ' goal has no check');
    if (st.sheet) sheets++;
    if (st.levels && st.levels.includes('legend')) legend++;
    const q = st.q; if (!q) return;
    if (!q.q) err(s, at + ' question has no text');
    if (['mc', 'predict'].includes(q.type)) { if (!Array.isArray(q.choices) || q.choices.length < 2) err(s, at + ' needs 2+ choices'); if (q.type === 'mc' && !(q.answer >= 0 && q.answer < q.choices.length)) err(s, at + ' bad mc answer'); if (new Set(q.choices).size !== q.choices.length) err(s, at + ' duplicate choices'); }
    else if (q.type === 'multi') { if (!Array.isArray(q.answer) || q.answer.some(a => !(a >= 0 && a < q.choices.length))) err(s, at + ' bad multi answer'); }
    else if (q.type === 'num') { if (q.answer == null) err(s, at + ' num has no answer'); }
    else if (q.type === 'order') { if (!q.items || q.items.length < 3 || new Set(q.items).size !== q.items.length) err(s, at + ' bad order items'); }
    else if (q.type === 'sort') { if (!q.bins || !q.items || q.items.some(it => !(it[1] >= 0 && it[1] < q.bins.length))) err(s, at + ' bad sort'); }
    else if (q.type === 'table') { if (!q.cols || !q.rows || !q.rows.length) err(s, at + ' bad table'); }
    else if (q.type === 'text') writes++;
    else if (q.type === 'write') { writes++; if (!q.parts || !q.parts.length || q.parts.some(p => !p.label)) err(s, at + ' write parts need labels'); }
    else err(s, at + ' unknown question type ' + q.type);
    if (q.why && /\{\{pred:(\w+)\}\}/.test(q.why)) { const k = q.why.match(/\{\{pred:(\w+)\}\}/)[1]; const idx = +k.replace(/^s/, ''); const src = s.steps[idx] || s.steps.find(x => x.id === k); if (!src || !src.q || src.q.type !== 'predict') err(s, at + ' {{pred:' + k + '}} does not point at a prediction'); }
  });
  if (sheets < 3) err(s, `only ${sheets} steps go on the lab sheet (need 3+)`);
  if (!writes) err(s, 'needs at least one written response');
  if (!legend) err(s, 'needs at least one Legend challenge step');
  perStd[s.std] = (perStd[s.std] || 0) + 1;
}
W.CX_STANDARDS.forEach(sd => { if ((perStd[sd.id] || 0) < 5) errs.push(`${sd.id}: only ${perStd[sd.id] || 0} simulators (need 5+)`); });

console.log(`${SIMS.length} simulators, ${Object.keys(perStd).length} standards, ${Object.keys(MODELS).length} models`);
if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
console.log('OK');
