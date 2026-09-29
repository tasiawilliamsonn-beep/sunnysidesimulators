# Sunnyside Simulators & The Broncho Escape

72 interactive, no-prep escape rooms, gallery walks, virtual field trips, mystery cases, and quests for **Indiana grades 5 and 6**, built on power standards in **Science, Social Studies, ELA, and Math**. Each activity takes 25–30 minutes on a student device, and nothing needs to be printed.

Each room includes:

- **A student activity** with its own visual theme (35 themes, from a pizzeria to a castle or a submarine) and 5 stages of hands-on puzzles. Puzzle types include tap-the-map and tap-the-diagram, highlight-the-evidence, drag-to-sort, ordering, matching, number lines, coordinate grids, fraction and percent shading, balance-scale equations, volume builders, coins, word and expression tiles, and Maya numerals. Some stages also have flip cards or live simulations (particles, Moon phases, shadows, orbits, roller coasters, food-web populations, and diffusion). Every room also has hints, a timer, saved progress, a final keypad lock, and a completion certificate.
- **A facilitation guide** with a 10–12 minute mini-lesson to teach beforehand (vocabulary, hook, teach, model, check for understanding), common misconceptions, running tips, differentiation, and debrief questions. You can view it on the page or download it as a PDF.
- **A full answer key**, including the final code.
- **A downloadable exit ticket PDF**. Page 1 is for students and page 2 is the teacher key.
- **Teacher resources**: free, reputable sites for reteaching and extension.
- **Canvas export**: one self-contained `.html` file per room.

## Game styles, levels, supports, and turn-in

- **Five game styles.** Escape rooms use padlocks, quests are boss battles (a health bar and hearts, plus a "Regroup" hint), field trips use a board-game route with passport stamps, mysteries use a cork-board case file, and gallery walks use a museum floor plan. Every room awards XP, first-try streak bonuses, a rank, and 8 badges.
- **Mission levels for differentiation.** *Explorer* (pre-filled sentence starters, free hints, unlimited "remove 2 wrong answers," a calculator, shorter writing), *Agent* (on level), and *Legend* (no power-ups, longer writing that needs two pieces of evidence). To assign a level, add `?level=explorer`, `?level=agent`, or `?level=legend` to a room link.
- **Supports toolbar.** Read-aloud (Listen buttons and tap-to-hear), bigger text, easy-read spacing, high contrast, a reading ruler, a word bank, a scratch pad, and a calculator.
- **Written evidence tasks** (`data/tasks.js`). RACE (ELA), CER (science), a historian's claim with a source check (social studies), and solve–show–explain (math). A live checklist has to be complete before the final code unlocks. Rooms with a task: g5-sci-missing-mass, g6-sci-cold-cocoa, g5-ss-midnight-messenger, g6-ss-plague-detective, g5-ela-context-caper, g6-ela-evidence-vault, g6-ela-theme-quest, g5-math-bakery-mystery, and g6-math-sale-scam. To add more, add entries to `data/tasks.js`.
- **Turn-in.** The final screen builds a block of text with the student's name, level, completion code, stats, badges, and full written response. Students copy it into a Canvas Text Entry submission.

## Live site and downloads

The site is published with GitHub Pages at **https://tasiawilliamsonn-beep.github.io/sunnysidesimulators/** from this branch. Every push updates it. The **Download everything (.zip)** links serve `downloads/sunnyside-simulators.zip`: the full site; a Canvas file, lab sheet PDF, and key PDF for every simulator (`simulators/`); and every Broncho Escape Canvas room file, exit ticket, warm-up, lesson worksheet (with key), presenter script, facilitation guide, and set of gallery walk posters (`broncho-escape/`). `downloads/broncho-escape-website.html` is The Broncho Escape site as one file.

## Gallery walks

The 10 gallery rooms (`data/gallery-art.js`) teach through pictures. Students walk a hallway of framed exhibits. Each exhibit is an illustrated picture with 3–5 numbered "look closely" spots that reveal a fact when tapped. Students must find every spot and write I see / I think / I wonder notes before the exhibit's challenge opens, and the notes go on their turn-in. For a classroom gallery walk, the room page has printable posters (one per exhibit, plus setup directions) and a viewing guide PDF.

## Presenter and script

Presenter slides show only student-facing cues (`data/lessons-cues.js`): a hook vote, a worked example revealed step by step, worksheet tasks, turn-and-talks, and checks. Students need only the printed lesson worksheet and a pencil; each slide shows which worksheet part to fill in. Everything the teacher says is in the separate **Presenter script PDF**: slide by slide, with directions, questions, answers, and reteach moves.

## 60-minute lessons

Every room page and facilitation guide follows the same 60-minute plan: warm-up (0:00–0:08), mini-lesson (0:08–0:20), activity (0:20–0:48), debrief (0:48–0:52), and exit ticket (0:52–1:00). Lesson content for all 24 standards is in `data/lessons.js`:

- **Warm-up:** 3 questions (Part 2 of the lesson worksheet; a standalone warm-up sheet with a key is also available).
- **Lesson presenter** (`js/presenter.js`, opened with `#teach-<room-id>`): a projectable deck that runs the whole hour. It covers the target, success criteria, and agenda; the warm-up with a timer and expectations; a hook vote; 4 teaching steps, each with a key idea, an interactive tool, a turn-and-talk, guided notes, and a check for understanding with feedback; I do / we do / you do; a work-time screen with a big timer, checkpoints, expectations, and must-do / may-do lists; the debrief; and the exit ticket. Teacher tools: a timer, a random name picker, teacher notes (N), fullscreen (F), and arrow-key navigation. Turn-and-talks and practice are in `data/lessons-plus.js`.
- **Lesson worksheet:** one printable packet students complete during the whole lesson, plus a key. Its 13 parts match the "Worksheet Part" badge on each presenter slide: target in their own words, warm-up, hook prediction, vocabulary, then for each teaching step fill-in notes, a task, turn-and-talk notes, and a check with "I know because"; the worked example, we do, you do, a work-time tracker (code piece + key fact per stage), and a 3-2-1 wrap-up. It replaces the old guided notes.
- **Evidence-based exit ticket:** Part A has students choose and justify, Part B explain with evidence, and Part C apply the standard to a new text, data set, or problem using CER, RACE, a historian's claim, or solve-show-explain. Page 3 onward is the key, with a rubric and a table that sorts scores into Mastered, Approaching, and Beginning, with next steps for each.

## Using it

Open `index.html` in any browser. You can also publish the repo with GitHub Pages (Settings → Pages → deploy from the branch root) so the site has a web address.

1. Filter by grade, subject, or format, or search by standard code (for example `5.C.4`).
2. Open a room's **Teacher guide** and teach the mini-lesson.
3. Click **View as student** to try it. The teacher preview adds a "show answer" button to every puzzle.
4. Click **Download for Canvas (.html)** and **Exit ticket PDF**.

## Adding a room to Canvas

1. Download the room's `.html` file from its page.
2. In Canvas, go to **Files** and upload the file.
3. Create an **Assignment**, Page, or Module item. In the editor, choose **Insert → Document → Course Documents** and pick the file. Students click the link to open the room.
4. Set the submission type to **Text Entry**. Students paste the completion code from their certificate.
5. To confirm a code, open the room page, scroll to **Check a completion code**, and type the student's name.

The Canvas page editor removes `<script>` tags, so pasting the HTML code into a Canvas page will not work. Upload the file instead. If the site is hosted (for example on GitHub Pages), each room page also gives an `<iframe>` embed code for a Canvas Page.

## Rooms by standard

**Grade 5 Science · 5-PS1-1–5-PS1-4 Properties of Matter & Conservation of Mass**

- The Melting Lab Lockdown (Escape Room)
- Museum of Marvelous Matter (Gallery Walk)
- The Case of the Missing Mass (Mystery Case)

**Grade 5 Science · 5-ESS1-1 · 5-ESS1-2 Earth, Sun, Moon & the Solar System**

- Grand Tour of the Solar System (Virtual Field Trip)
- Shadow Clock Escape (Escape Room)
- Moonlight Quest (Quest)

**Grade 5 Science · 5-PS3-1 · 5-LS1-1 · 5-LS2-1 Ecosystems & Food Webs**

- Hoosier Habitat Hike (Virtual Field Trip)
- Who Crashed the Food Web? (Mystery Case)
- Decomposer Dash (Quest)

**Grade 6 Science · Enrichment · not in IN 2023 Gr 6 Particle Model of Matter & States of Matter**

- Particle Panic at Polar Station (Escape Room)
- The Water Molecule's Quest (Quest)
- The Museum of Moving Particles (Gallery Walk)

**Grade 6 Science · Enrichment · not in IN 2023 Gr 6 Kinetic & Potential Energy and Heat Transfer**

- Roller Coaster Lockdown (Escape Room)
- The Case of the Cold Cocoa (Mystery Case)
- Power Up Indiana Field Trip (Virtual Field Trip)

**Grade 6 Science · MS-ESS1-1–MS-ESS1-3 Gravity & the Earth–Sun–Moon System**

- Eclipse Chasers: April 8, 2024 (Virtual Field Trip)
- Gravity Station Escape (Escape Room)
- The Tides & Seasons Quest (Quest)

**Grade 5 Social Studies · 5.H.1–5.H.6 · 5.G.5–5.G.10 · 5.E.1 Native Americans, Exploration & the Thirteen Colonies**

- Colonial Road Trip, 1750 (Virtual Field Trip)
- Nations Before Us (Gallery Walk)
- Lost at Sea: The Explorer's Escape (Escape Room)

**Grade 5 Social Studies · 5.H.7–5.H.13 The American Revolution**

- Escape from 1776 (Escape Room)
- The Midnight Messenger Mystery (Mystery Case)
- Voices of the Revolution (Gallery Walk)

**Grade 5 Social Studies · 5.H.14–5.H.15 · 5.C.1 · 5.C.3 · 5.C.5 Founding Documents & Our Government**

- Branches of Power Quest (Quest)
- Bill of Rights Breakout (Escape Room)
- Field Trip to Washington, D.C. (Virtual Field Trip)

**Grade 6 Social Studies · 2026 code pending Early Civilizations of the Americas**

- Journey to Three Empires (Virtual Field Trip)
- Escape the Temple of the Sun (Escape Room)
- Artifacts of the Americas (Gallery Walk)

**Grade 6 Social Studies · 2026 code pending Medieval Europe to the Renaissance**

- Castle Quest: Life on the Manor (Quest)
- The Plague Detective (Mystery Case)
- The Renaissance Gallery (Gallery Walk)

**Grade 6 Social Studies · 2026 code pending Geography of Europe & the Americas**

- Lost Coordinates Escape (Escape Room)
- Grand Tour of Two Continents (Virtual Field Trip)
- The Case of the Changing Landscape (Mystery Case)

**Grade 5 ELA · 5.RC.1 & 5.RC.2 Theme & Summary**

- The Story Gallery (Gallery Walk)
- Escape the Lost Library (Escape Room)
- Summary Showdown (Quest)

**Grade 5 ELA · 5.RC.6 & 5.RC.8 Main Ideas & Text Structure**

- Flight of the Monarchs (Virtual Field Trip)
- The Case of the Scrambled Articles (Mystery Case)
- Escape the Science Magazine (Escape Room)

**Grade 5 ELA · 5.RC.11–5.RC.14 Context Clues, Roots & Figurative Language**

- The Word Wizard's Tower (Escape Room)
- The Figurative Language Art Show (Gallery Walk)
- The Context Clue Caper (Mystery Case)

**Grade 6 ELA · 6.RC.1–6.RC.3 Textual Evidence, Inference & Theme**

- The Inference Files (Mystery Case)
- The Evidence Vault (Escape Room)
- Character Quest: How Themes Grow (Quest)

**Grade 6 ELA · 6.RC.5 & 6.RC.8 Central Idea & Author's Argument**

- Debate Club Lockdown (Escape Room)
- Newsroom Field Trip (Virtual Field Trip)
- The Viral Post Investigation (Mystery Case)

**Grade 6 ELA · 6.RC.10, 6.RC.12 & 6.RC.13 Word Meaning, Connotation & Figurative Language**

- The Shades of Meaning Gallery (Gallery Walk)
- The Poet's Locked Notebook (Escape Room)
- Word Detective Quest (Quest)

**Grade 5 Math · 5.CA.3–5.CA.5 · 5.CA.7 Adding, Subtracting & Multiplying Fractions**

- The Pizza Parlor Lockdown (Escape Room)
- Fraction Trail Quest (Quest)
- The Bakery Recipe Mystery (Mystery Case)

**Grade 5 Math · 5.NS.1 · 5.NS.3 · 5.CA.9–5.CA.10 Decimal Place Value & Operations**

- Speedway Decimal Field Trip (Virtual Field Trip)
- Bank Vault Breakout (Escape Room)
- The Place Value Museum (Gallery Walk)

**Grade 5 Math · 5.M.4–5.M.5 Volume of Rectangular Prisms**

- The Shipping Container Escape (Escape Room)
- The Aquarium Builder Quest (Quest)
- The Case of the Stolen Sand (Mystery Case)

**Grade 6 Math · 6.RP.1–6.RP.5 Ratios, Rates & Percents**

- The Smoothie Shop Lockdown (Escape Room)
- Hoosier Road Trip (Virtual Field Trip)
- The Sale Price Scam (Mystery Case)

**Grade 6 Math · 6.AF.1–6.AF.4 · 6.NS.7 Expressions & One-Step Equations**

- The Algebra Vault (Escape Room)
- The Balance Scale Quest (Quest)
- The Variable Villain (Mystery Case)

**Grade 6 Math · 6.NS.1–6.NS.3 · 6.AF.5 Integers, Absolute Value & the Coordinate Plane**

- Extreme Earth Field Trip (Virtual Field Trip)
- Treasure Map Escape (Escape Room)
- The Sonar Submarine Quest (Quest)

## About the standards

The standards shown are the Indiana Academic Standards for grades 5 and 6 that are commonly treated as power (priority) standards. Your district's priority list may differ, so confirm codes against the current IDOE framework.

## Project layout

```
index.html        Sunnyside Simulators catalog (home page)
escapes.html      The Broncho Escape (classic escape rooms)
sheet.html        Printable lab sheet and teacher key (#<sim-id> or #key-<sim-id>)
sim.html          Plays one simulator (#<sim-id>)
present.html      Teacher presenter for one simulator (#<sim-id>); arrow keys or a clicker
play.html         Student-only player (play.html#room-id), used for iframe embeds
js/themes.js      35 visual themes (colors, fonts, patterns, emblems)
js/kit.js         Drawings, diagrams, and simulations used by the puzzles
js/player.js      Game engine (themes.js, kit.js, and player.js are copied into every exported room)
js/app.js         Teacher site: catalog, guides, Canvas export
js/pdf.js         Dependency-free PDF writer for exit tickets and guides
css/site.css      Teacher site styles
data/standards.js Standards, mini-lessons, resources
data/g5-*.js, data/g6-*.js   Room content (9 rooms per file)
data/fx-*.js      Per-room themes and interactive puzzles layered onto the base rooms
data/apply-fx.js  Merges the fx files into the rooms at load time
tests/validate.js Data checks plus an answer-key self-test: node tests/validate.js
```

To add a room, add an object to one of the `data/*.js` files and run `node tests/validate.js`. Every room needs at least 4 stages, at least 10 puzzles, and at least 3 exit ticket questions. The validator also runs every answer key through the game's own checker.

Privacy: nothing is sent anywhere. Student names and progress stay in the student's own browser.
