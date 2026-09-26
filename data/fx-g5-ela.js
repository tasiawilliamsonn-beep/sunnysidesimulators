/* Grade 5 ELA: themes and interactive text puzzles */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  var MOUNTAIN = { kind: 'scene', w: 640, h: 300, bg: '#F6EFD9', shapes: [
    { t: 'path', d: 'M30,250 L120,250 L330,60 L470,190 L610,190', fill: 'none', stroke: '#6B2233', sw: 6 },
    { t: 'circle', id: 'exposition', label: 'Beginning', cx: 75, cy: 250, r: 16, fill: '#D4AF37', lx: 75, ly: 285 },
    { t: 'circle', id: 'rising', label: 'Rising action', cx: 225, cy: 155, r: 16, fill: '#D4AF37', lx: 160, ly: 150 },
    { t: 'circle', id: 'climax', label: 'Climax', cx: 330, cy: 60, r: 16, fill: '#D4AF37', lx: 330, ly: 36 },
    { t: 'circle', id: 'falling', label: 'Falling action', cx: 400, cy: 125, r: 16, fill: '#D4AF37', lx: 480, ly: 120 },
    { t: 'circle', id: 'resolution', label: 'Resolution', cx: 560, cy: 190, r: 16, fill: '#D4AF37', lx: 560, ly: 225 }
  ] };
  var MAGAZINE = { kind: 'scene', w: 600, h: 400, bg: '#FFFFFF', shapes: [
    { t: 'rect', x: 10, y: 10, w: 580, h: 380, rx: 6, fill: '#FFFDF5', sw: 2 },
    { t: 'rect', id: 'heading', label: 'How Flowers Make Seeds', x: 30, y: 26, w: 540, h: 44, rx: 4, fill: '#1D5FD1', lc: '#fff', lsize: 20 },
    { t: 'rect', x: 30, y: 90, w: 250, h: 160, rx: 4, fill: '#FFE14D', sw: 2 },
    { t: 'circle', cx: 155, cy: 160, r: 36, fill: '#E4252D', sw: 2 }, { t: 'circle', cx: 155, cy: 160, r: 12, fill: '#FFD166', sw: 2 },
    { t: 'rect', id: 'caption', label: 'A bee visits a poppy flower.', x: 30, y: 256, w: 250, h: 30, rx: 4, fill: '#F3F3F3', sw: 1.5, lsize: 12 },
    { t: 'text', x: 300, y: 108, s: 'When a bee visits a flower,', size: 14, bold: false, anchor: 'start' },
    { t: 'text', x: 300, y: 130, s: 'it carries', size: 14, bold: false, anchor: 'start' },
    { t: 'rect', id: 'bold', label: 'pollen', x: 364, y: 116, w: 58, h: 20, rx: 3, fill: '#FFE58A', sw: 1, lsize: 14 },
    { t: 'text', x: 426, y: 130, s: 'from plant', size: 14, bold: false, anchor: 'start' },
    { t: 'text', x: 300, y: 152, s: 'to plant.', size: 14, bold: false, anchor: 'start' },
    { t: 'rect', id: 'diagram', label: 'Parts of a flower (diagram)', x: 300, y: 172, w: 270, h: 110, rx: 4, fill: '#E7F3E2', sw: 2, lsize: 13 },
    { t: 'rect', id: 'glossary', label: 'Glossary: pollen = fine yellow powder...', x: 30, y: 306, w: 540, h: 60, rx: 4, fill: '#EDE7F6', sw: 2, lsize: 13 }
  ] };

  FX['g5-ela-story-gallery'] = {
    theme: 'library',
    stages: {
      0: { set: { cards: [['Topic', 'One or two words telling what a story is about. Example: hard work.'], ['Theme', 'A full sentence telling the life lesson. Example: Planning ahead helps you through hard times.']] } },
      1: { patch: { 1: { replace: { type: 'highlight', q: 'Tap the sentence that BEST supports the theme "Honesty builds trust."', segments: ['Priya was tossing a ball in the living room when it knocked Grandma\'s blue vase off the shelf.', 'It shattered.', 'Her little brother, Dev, was the only other person home.', 'When Grandma came in, she looked from the pieces to Dev.', 'Instead, she stepped forward. "It was me. I\'m sorry."', 'Grandma knelt and picked up a blue piece. "The vase I can glue," she said. "Trust is harder to fix. Thank you for keeping mine."'], answer: [5], block: true, hint: 'Find the sentence that talks directly about trust.', why: { 4: 'This shows Priya being honest, but not what her honesty earned.' }, explain: 'Grandma says trust is hard to fix and thanks Priya for keeping hers: honesty built trust.' } } } },
      2: { patch: { 1: { replace: { type: 'highlight', q: 'Tap the sentence that shows Marcus\'s persistence (not giving up).', segments: ['Every spring, the students of Room 12 planted sunflower seeds in paper cups.', 'Marcus\'s seed never sprouted.', 'Every day he watered it, moved it to the sunniest spot, and checked it before anyone else arrived.', '"Give up," said Jonah. "It\'s dead."', 'On the twenty-fourth day, a tiny green loop pushed through the soil.'], answer: [2], block: true, hint: 'Look for what Marcus DID, day after day.', explain: 'He kept caring for the seed every single day, even when nothing happened.' } } } },
      3: { patch: { 2: { replace: { type: 'highlight', q: 'Tap the sentence that shows Lena learned a lesson.', segments: ['Lena\'s kite was bright red with a long gold tail.', 'At the park, Lena laughed. "Yours won\'t even fly."', 'Lena\'s kite spun, dove, and tangled in a tree.', 'Sam walked over and held out the string. "Want to fly it together?"', 'As they ran across the field, Lena said, "I shouldn\'t have judged your kite by how it looked."'], answer: [4], block: true, hint: 'Which sentence shows Lena thinking differently than she did at the start?', explain: 'Lena admits she was wrong to judge the kite by its looks: that is the theme.' } } } }
    }
  };

  FX['g5-ela-lost-library'] = {
    theme: 'library',
    stages: {
      0: { set: { cards: [['Conflict', 'The problem the main character faces.'], ['Climax', 'The turning point: the most exciting moment.'], ['Resolution', 'How the problem is solved and the story ends.']] } },
      1: { append: [{ type: 'highlight', q: 'Tap the sentence that shows Nora making a brave choice.', segments: ['As the sky darkened, Nora gripped the rail and started up.', 'At step 40 her legs froze.', 'Wind howled through the cracks.', 'She looked down and her stomach flipped.', 'Nora thought of the fishermen\'s families waiting on shore.', 'She took a breath, looked up instead of down, and climbed step 41.'], answer: [5], block: true, hint: 'Find the moment she ACTS even though she is afraid.', explain: 'Climbing step 41 is the first time she goes past her fear.' }] },
      2: { patch: { 1: { replace: { type: 'tap', q: 'Nora lights the lamp and the fishing boat turns toward safety. Tap where this event belongs on the plot mountain.', visual: MOUNTAIN, answer: 'climax', hint: 'This is the most exciting turning point of the story.', why: { rising: 'Rising action builds toward this moment, like Nora climbing the stairs.', resolution: 'The resolution comes after, when Mr. Reyes thanks her.' }, explain: 'Lighting the lamp is the climax: the turning point where the problem is solved.' } } } }
    }
  };

  FX['g5-ela-summary-showdown'] = {
    theme: 'gameshow',
    stages: {
      2: { patch: { 2: { replace: { type: 'highlight', q: 'Tap the TWO lines that state the theme of the poem most directly.', segments: ['The storm came howling, fierce and wild,', 'And bent the grass and flowers mild.', 'The tall oak groaned but held its ground,', 'Its roots stretched deep beneath the mound.', 'When morning came, the sky was clear,', 'The oak still stood, as year by year,', 'It learned that strength is not in height,', 'But in the roots that grip down tight.'], answer: [6, 7], block: true, hint: 'Look for the lines that say what the oak LEARNED.', explain: 'The last two lines tell the lesson: true strength comes from a strong foundation.' } } } },
      3: { patch: { 2: { replace: { type: 'highlight', q: 'Tap ALL of the stage directions in this part of the play.', segments: ['MAYA:', '(frustrated)', 'Our volcano won\'t erupt!', 'ELI: Let\'s just quit.', 'MAYA:', '(pausing)', 'Wait. We didn\'t add enough baking soda.', 'ELI:', '(grinning)', 'It worked!'], answer: [1, 5, 8], hint: 'Stage directions are in parentheses and tell how characters act.', explain: 'The words in parentheses (frustrated), (pausing), and (grinning) tell the actors how to act.' } } } }
    }
  };

  FX['g5-ela-monarch-trip'] = {
    theme: 'garden',
    stages: {
      0: { patch: { 0: { replace: { type: 'highlight', q: 'Tap the sentence that states the main idea of the article.', segments: ['Monarch butterflies depend on milkweed plants to survive.', 'Female monarchs lay their eggs only on milkweed leaves.', 'When the caterpillars hatch, milkweed is the only food they eat.', 'The plant contains a chemical that makes caterpillars taste bitter to birds.', 'Without milkweed, monarchs could not complete their life cycle.'], answer: [0], block: true, hint: 'The main idea is the big point that all the other sentences support.', why: { 4: 'This is close! But it is more of a conclusion. Which sentence states the idea first?' }, explain: 'Every other sentence gives a reason monarchs depend on milkweed.' } } } },
      1: { append: [{ type: 'highlight', q: 'Tap ALL the signal words that show the sequence structure.', segments: ['First,', 'a tiny egg is laid on a milkweed leaf.', 'After', 'three to five days, a caterpillar hatches.', 'Over the next two weeks,', 'it grows about 2,000 times bigger.', 'Then', 'it forms a green chrysalis.', 'Finally,', 'an adult butterfly breaks out.'], answer: [0, 2, 4, 6, 8], hint: 'Signal words tell WHEN something happens.', explain: 'First, After, Over the next two weeks, Then, and Finally all show time order.' }] },
      3: { patch: { 2: { replace: { type: 'highlight', q: 'Tap the TWO phrases that signal cause and effect.', segments: ['The number of monarchs reaching Mexico has fallen sharply since the 1990s.', 'One cause', 'is the loss of milkweed.', 'Pesticides and weed killers also destroy milkweed.', 'In addition,', 'extreme weather can kill monarchs during their journey.', 'As a result,', 'fewer butterflies survive to lay eggs each spring.'], answer: [1, 6], hint: 'Look for words about causes and results.', why: {}, explain: '"One cause" names a cause, and "As a result" introduces the effect. "In addition" just adds another point.' } } } },
      4: { set: { visual: { kind: 'scene', w: 600, h: 320, bg: '#EAF6FF', caption: 'Monarch #IN-2047\'s route, about 2,000 miles', shapes: [
        { t: 'path', d: 'M470,50 Q380,120 330,170 Q280,230 250,280', fill: 'none', stroke: '#E0701B', sw: 5, dash: '12 8' },
        { t: 'circle', cx: 470, cy: 50, r: 12, fill: '#3F7D3A', stroke: '#fff', sw: 3 }, { t: 'text', x: 490, y: 55, s: 'Indiana (start)', anchor: 'start' },
        { t: 'circle', cx: 330, cy: 170, r: 10, fill: '#E0701B', stroke: '#fff', sw: 3 }, { t: 'text', x: 350, y: 175, s: 'Texas rest stop', anchor: 'start' },
        { t: 'circle', cx: 250, cy: 280, r: 14, fill: '#D0601A', stroke: '#fff', sw: 3 }, { t: 'text', x: 272, y: 286, s: 'Michoacán, Mexico', anchor: 'start' },
        { t: 'text', x: 60, y: 40, s: 'N ↑', size: 16 }
      ] } } }
    }
  };

  FX['g5-ela-scrambled-articles'] = {
    theme: 'newsroom',
    stages: {
      1: { append: [{ type: 'highlight', q: 'Tap ALL the signal words that show cause and effect in the article.', segments: ['Heavy snow can shut down a whole city.', 'When more than six inches falls quickly, plows cannot keep up.', 'Because', 'roads become slippery, buses cannot drive safely,', 'so', 'schools close.', 'Power lines can snap under the weight of ice,', 'which causes', 'power outages.', 'As a result,', 'many people stay home.'], answer: [2, 4, 7, 9], hint: 'Look for words that connect a cause to what happens next.', explain: 'Because, so, which causes, and as a result are all cause-and-effect signals.' }] },
      3: { patch: { 1: { replace: { type: 'highlight', q: 'Tap the sentence that states the PROBLEM.', segments: ['At Westfield Elementary, the lunchroom was throwing away more than 40 pounds of food every day.', 'The student council came up with a plan.', 'They set up a "share table" where students could leave unopened food for others.', 'After two months, food waste dropped by more than half.'], answer: [0], block: true, hint: 'The problem comes before the plan.', explain: 'Throwing away 40 pounds of food a day was the problem the plan solved.' } } } },
      4: { append: [{ type: 'numberline', q: 'Place the year Indiana became a state (1816) on the timeline.', min: 1780, max: 1830, ticks: 5, minor: 5, snap: 1, tol: 0.5, answer: 1816, fmt: 'int', points: [{ v: 1800, label: 'Indiana Territory' }, { v: 1825, label: 'Capital to Indy' }], hint: 'Each small tick is 2 years. 1816 is 3 small ticks past 1810.', explain: 'December 11, 1816: Indiana became the 19th state.' }] }
    }
  };

  FX['g5-ela-magazine-escape'] = {
    theme: 'comic',
    stages: {
      0: { patch: { 0: { replace: { type: 'highlight', q: 'Tap the sentence that states the main idea of the article.', segments: ['A honeybee hive is like a well-organized city where every bee has a job.', 'The queen lays up to 2,000 eggs a day.', 'Worker bees, all female, gather nectar and pollen, make honey, build wax comb, and guard the hive.', 'Drones, the male bees, have one job: to mate with a queen.'], answer: [0], block: true, hint: 'The other sentences are details about each kind of bee.', explain: 'The first sentence states the big idea; the rest give supporting details.' } } } },
      2: { append: [{ type: 'tap', q: 'You want to know what a photo shows. Tap the text feature that tells you.', visual: MAGAZINE, answer: 'caption', hint: 'This short text sits right under a picture.', why: { heading: 'The heading tells what the whole section is about.', glossary: 'The glossary defines words.' }, explain: 'A caption explains a photo or picture.' },
        { type: 'tap', q: 'Now tap the text feature that shows an important vocabulary word.', visual: MAGAZINE, answer: 'bold', hint: 'Look for a word printed differently in the paragraph.', explain: 'Bold words are important vocabulary. They often appear in the glossary too.' }] },
      3: { append: [{ type: 'highlight', q: 'Tap ALL of the sequence signal words in the recycling article.', segments: ['First,', 'you toss your bottle into a recycling bin.', 'Next,', 'a truck carries it to a sorting center.', 'After that,', 'the plastic is washed, chopped, and melted.', 'Then', 'the melted plastic is formed into pellets.', 'Finally,', 'factories make new products.'], answer: [0, 2, 4, 6, 8], explain: 'First, Next, After that, Then, and Finally all show time order.' }] }
    }
  };

  FX['g5-ela-word-wizard'] = {
    theme: 'wizard',
    stages: {
      0: { set: { cards: [['port', 'carry'], ['graph', 'write'], ['spect', 'look'], ['aud', 'hear'], ['struct', 'build'], ['tele', 'far']] } },
      1: { patch: { 1: { replace: { type: 'assemble', q: 'Cast the spell: build a word that means "not agree."', tiles: ['dis', 'agree', 're', 'pre', 'able'], answer: ['dis', 'agree'], joiner: '+', hint: 'Which prefix means "not"?', explain: 'dis- means not, so disagree means not agree.' } } } },
      2: { append: [{ type: 'assemble', q: 'Build a word that means "without fear."', tiles: ['fear', 'less', 'ful', 'un', 'ness'], answer: ['fear', 'less'], joiner: '+', hint: 'Which suffix means "without"?', explain: 'fear + -less = fearless: without fear.' }] },
      3: { patch: { 2: { replace: { type: 'assemble', q: 'Build the name of a tool for seeing things far away.', tiles: ['tele', 'scope', 'graph', 'micro', 'phone'], answer: ['tele', 'scope'], joiner: '+', hint: 'tele = far, scope = see.', explain: 'tele (far) + scope (see) = telescope.' } } } },
      4: { append: [{ type: 'assemble', q: 'Final spell: build the word that means "the study of life."', tiles: ['bio', 'geo', 'ology', 'graph', 'tele'], answer: ['bio', 'ology'], joiner: '+', hint: 'bio = life, -ology = study of.', explain: 'bio + ology = biology, the study of living things.' }] }
    }
  };

  FX['g5-ela-figurative-gallery'] = {
    theme: 'studio',
    stages: {
      0: { patch: { 1: { replace: { type: 'highlight', q: 'Tap ALL the similes in "Morning Rush."', segments: ['My brother zooms through the kitchen', 'like a rocket,', 'His shoes untied, a waffle in his pocket.', 'Mom says the bus is', 'as slow as a snail,', 'But today it came early, so he flew', 'like a gale.'], answer: [1, 4, 6], block: true, hint: 'Similes use "like" or "as."', explain: 'Like a rocket, as slow as a snail, and like a gale all compare using like or as.' } } } },
      1: { append: [{ type: 'highlight', q: 'Tap ALL the metaphors in "The Classroom Zoo."', segments: ['Our classroom is a zoo on Friday afternoon.', 'Maria is a parrot, chattering out a tune.', 'The clock is a turtle crawling toward three.', 'And the bell, at last,', 'is the key that sets us free.'], answer: [0, 1, 2, 4], block: true, hint: 'A metaphor says one thing IS another.', explain: 'Each line says something IS something else, without like or as.' }] },
      3: { set: { cards: [['Break a leg', 'Good luck!'], ['Hit the hay', 'Go to bed.'], ['Piece of cake', 'Something very easy.'], ['Under the weather', 'Feeling sick.']] } }
    }
  };

  FX['g5-ela-context-caper'] = {
    theme: 'detective',
    stages: {
      0: { append: [{ type: 'highlight', q: 'Tap the context clue that tells you what "cacophony" means.', segments: ['The janitor\'s cart made a', 'cacophony,', 'a loud and harsh mix of sounds,', 'so no one heard my footsteps.'], answer: [2], hint: 'A definition clue often comes right after a comma.', explain: 'The words right after the comma define cacophony.' }] },
      1: { patch: { 2: { replace: { type: 'highlight', q: 'Tap the word that signals an antonym (opposite) clue.', segments: ['Unlike', 'his usual', 'punctual', 'self, he', 'arrived late', 'to the office.'], answer: [0], hint: 'Which word shows a contrast?', why: { 4: '"Arrived late" is the clue itself. Which word tells you it is the OPPOSITE?' }, explain: '"Unlike" tells you punctual is the opposite of arriving late.' } } } },
      2: { append: [{ type: 'highlight', q: 'Tap the words that signal EXAMPLE clues in the note.', segments: ['Containers', 'like', 'buckets, bins, and boxes are all receptacles.', 'I chose one full of debris,', 'such as', 'broken pencils and eraser crumbs.'], answer: [1, 4], hint: 'Example clues often use "like," "such as," or "for example."', explain: '"Like" and "such as" introduce examples that explain each hard word.' }] },
      3: { set: { cards: [['Mr. Hale, janitor', '"I was diligent all afternoon." Pushed a noisy cart through the halls.'], ['Ms. Perez, art teacher', '"I was elated!" Her class won the mural contest.'], ['Coach Ben', '"I was famished." Went to the cafeteria for a snack.']] } }
    }
  };
})(window.CX_FX);
