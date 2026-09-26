/*
 * Applies the visual and interactive upgrades in data/fx-*.js to the rooms.
 * Each entry: { theme, stages: { index: { set:{...}, patch:{ puzzleIndex:{...} }, insert:[[index, puzzle], ...], append:[puzzle, ...] } } }
 */
(function () {
  var FX = window.CX_FX || {};
  (window.CX_ROOMS || []).forEach(function (r) {
    var f = FX[r.id];
    if (!f) return;
    if (f.theme) r.theme = f.theme;
    if (f.set) Object.keys(f.set).forEach(function (k) { r[k] = f.set[k]; });
    Object.keys(f.stages || {}).forEach(function (si) {
      var s = r.stages[+si], d = f.stages[si];
      if (!s) { console.warn('fx: missing stage', r.id, si); return; }
      if (d.set) Object.keys(d.set).forEach(function (k) { s[k] = d.set[k]; });
      Object.keys(d.patch || {}).forEach(function (pj) {
        var p = s.puzzles[+pj];
        if (!p) { console.warn('fx: missing puzzle', r.id, si, pj); return; }
        var patch = d.patch[pj];
        if (patch.replace) { s.puzzles[+pj] = patch.replace; return; }
        Object.keys(patch).forEach(function (k) { if (patch[k] === null) delete p[k]; else p[k] = patch[k]; });
      });
      (d.insert || []).slice().sort(function (a, b) { return b[0] - a[0]; }).forEach(function (ins) { s.puzzles.splice(ins[0], 0, ins[1]); });
      (d.append || []).forEach(function (p) { s.puzzles.push(p); });
      if (d.remove) d.remove.slice().sort(function (a, b) { return b - a; }).forEach(function (k) { s.puzzles.splice(k, 1); });
    });
  });
  // written evidence tasks and quest bosses (data/tasks.js)
  var TASKS = window.CX_TASKS || {};
  (window.CX_ROOMS || []).forEach(function (r) {
    var t = TASKS[r.id];
    if (!t) return;
    if (t.boss) r.boss = t.boss;
    if (t.task) r.stages[r.stages.length - 1].puzzles.push(Object.assign({ type: 'write' }, t.task));
  });
})();
