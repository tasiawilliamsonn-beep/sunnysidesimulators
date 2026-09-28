# Sunnyside Simulators: what's left

Done and pushed on branch `claude/inspiring-feynman-jhy2jk`:
- Home page `index.html`: the Sunnyside Simulators catalog, in red and black. Filter by grade and
  subject, or search. Each sim has ▶ Play, 📄 Lab sheet, 🔑 Key, 🎬 Present, and ⬇ Canvas file (a one-file HTML).
- Big toggle at the top of both pages switches between Sunnyside Simulators and
  **The Broncho Escape** (the original escape rooms, now at `escapes.html`).
- `sheet.html#<id>` (student lab sheet) and `sheet.html#key-<id>` (teacher key with completion codes).
- 112 simulators: science (36), math (31), ELA (30), Grade 5 social studies (15).

- `present.html#<id>`: presenter with title, warm-up (reveals answers), vocabulary, mini-lesson,
  mission and levels, a live demo of the real simulator, work time with a timer, and a debrief.
  Arrow keys, Space, or a clicker move the slides; N shows teacher notes; F is full screen.
  (No phone remote, by request.)

Still to do:
1. `data/sims-g6-social.js`: 15 Grade 6 sims (g6-ss-americas, g6-ss-europe, g6-ss-geo) built on the
   models in `js/models-social.js`. Add the file to index.html, sim.html, sheet.html, and present.html.
2. Rebuild the download zip in `downloads/` and extend `tests/validate.js` to cover the simulators.
