# Sunnyside Simulators: what's left

Done and pushed on branch `claude/inspiring-feynman-jhy2jk`:
- Engine `js/sim.js`, test page `sim.html#<sim-id>`
- Science (36), math (31), ELA (30), and Grade 5 social studies (15) sims
- All 12 social models are in `js/models-social.js`

Still to do:
1. `data/sims-g6-social.js`: 15 Grade 6 sims (5 each for g6-ss-americas, g6-ss-europe, g6-ss-geo).
   Models to use: expedition, adaptLab, sortLab, mayaCount, timeline, plagueMap, turnSim, pressRace,
   globeNav, climateLab. Follow the shape of `data/sims-g5-social.js`. Add the file to `sim.html`.
2. Site: rename it to "Sunnyside Simulators" and turn the home page into a simple catalog of sims by
   grade, subject, and standard. Each sim has "Open", "Lab sheet" (a printable PDF with numbered boxes
   matching each step's `sheet`, the warm-up, vocab, and a completion-code box; no QR code, no Canvas
   submit), "Presenter", and "Canvas file" (standalone HTML).
3. Presenter: warm-up, mini-lesson, live demo (`opts.demo`), work time with a timer, and debrief.
   Add a phone remote (PeerJS room code) and support for clicker/arrow keys.
4. Update `tests/validate.js`, the build zip in `downloads/`, and the README.
