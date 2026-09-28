# Sunnyside Simulators: what's left

Done and pushed on branch `claude/inspiring-feynman-jhy2jk`:
- Home page `index.html`: the Sunnyside Simulators catalog, in red and black. Filter by grade and
  subject, or search. Each sim has ▶ Play, 📄 Lab sheet, 🔑 Key, and ⬇ Canvas file (a one-file HTML).
- Big toggle at the top of both pages switches between Sunnyside Simulators and
  **The Broncho Escape** (the original escape rooms, now at `escapes.html`).
- `sheet.html#<id>` (student lab sheet) and `sheet.html#key-<id>` (teacher key with completion codes).
- 112 simulators: science (36), math (31), ELA (30), Grade 5 social studies (15).

Still to do:
1. Presenter `present.html#<id>`: warm-up, mini-lesson, live demo (`opts.demo`), work time with a timer,
   and debrief. Add a phone remote (PeerJS room code, `remote.html`) and clicker/arrow keys. Then set
   `PAGES.present = true` in `js/catalog.js` so the 🎬 Present button shows up.
2. `data/sims-g6-social.js`: 15 Grade 6 sims (g6-ss-americas, g6-ss-europe, g6-ss-geo) built on the
   models in `js/models-social.js`. Add the file to index.html, sim.html, and sheet.html.
3. Rebuild the download zip in `downloads/` and extend `tests/validate.js` to cover the simulators.
