# Sunnyside Simulators: what's left

Done and pushed on branch `claude/inspiring-feynman-jhy2jk`:
- Home page `index.html`: the Sunnyside Simulators catalog, in red and black. Filter by grade and
  subject, or search. Each sim has ▶ Play, 📄 Lab sheet, 🔑 Key, 🎬 Present, and ⬇ Canvas file (a one-file HTML).
- Big toggle at the top of both pages switches between Sunnyside Simulators and
  **The Broncho Escape** (the original escape rooms, now at `escapes.html`).
- `sheet.html#<id>` (student lab sheet) and `sheet.html#key-<id>` (teacher key with completion codes).

- `present.html#<id>`: presenter with title, warm-up (reveals answers), vocabulary, mini-lesson,
  mission and levels, a live demo of the real simulator, work time with a timer, and a debrief.
  Arrow keys, Space, or a clicker move the slides; N shows teacher notes; F is full screen.
  (No phone remote, by request.)

- 127 simulators in all: science (36), math (31), ELA (30), social studies (30). Every standard has 5+.
- `node tests/validate-sims.js` checks every simulator; `node tests/validate.js` checks The Broncho Escape.
- `downloads/sunnyside-simulators.zip`: the whole site, plus a Canvas file, lab sheet PDF, and key PDF
  for every simulator, plus every Broncho Escape file. Rebuild it after big changes.

Nothing required is left. Possible next ideas: more simulators per standard, or fine-tuning any sim
teachers find too hard or too easy.
