/* Grade 6 ELA: themes, evidence highlighting, plot maps, and word building */
window.CX_FX = window.CX_FX || {};
(function (FX) {
  function HL(q, segments, answer, extra) { return Object.assign({ type: 'highlight', q: q, segments: segments, answer: answer }, extra || {}); }

  var PLOT = { kind: 'scene', w: 600, h: 300, bg: '#FFF8E7', label: 'A plot diagram', shapes: [
    { t: 'path', d: 'M30,250 H150 L340,60 L480,200 H580', fill: 'none', stroke: '#2E4A7A', sw: 5 },
    { t: 'circle', id: 'exp', label: 'Exposition', cx: 90, cy: 250, r: 16, fill: '#FFD166', sw: 2.5, lx: 90, ly: 286 },
    { t: 'circle', id: 'rise', label: 'Rising action', cx: 245, cy: 155, r: 16, fill: '#FFD166', sw: 2.5, lx: 182, ly: 150 },
    { t: 'circle', id: 'climax', label: 'Climax (turning point)', cx: 340, cy: 60, r: 16, fill: '#FFD166', sw: 2.5, lx: 340, ly: 32 },
    { t: 'circle', id: 'fall', label: 'Falling action', cx: 410, cy: 130, r: 16, fill: '#FFD166', sw: 2.5, lx: 482, ly: 126 },
    { t: 'circle', id: 'res', label: 'Resolution', cx: 530, cy: 200, r: 16, fill: '#FFD166', sw: 2.5, lx: 530, ly: 236 }
  ] };

  var POST = { kind: 'scene', w: 320, h: 460, max: 330, label: 'A viral social media post', shapes: [
    { t: 'rect', x: 0, y: 0, w: 320, h: 460, rx: 36, fill: '#1d2433', sw: 0 },
    { t: 'rect', x: 14, y: 40, w: 292, h: 404, rx: 18, fill: '#FFFFFF', sw: 0 },
    { t: 'rect', x: 120, y: 14, w: 80, h: 14, rx: 7, fill: '#000000', sw: 0 },
    { t: 'text', x: 160, y: 66, s: 'Feed', size: 15 },
    { t: 'line', x1: 14, y1: 80, x2: 306, y2: 80, stroke: '#e3e7ee', sw: 1.5 },
    { t: 'circle', cx: 46, cy: 108, r: 16, fill: '#C8272D', sw: 0 }, { t: 'text', x: 46, y: 114, s: '?', size: 16, fill: '#FFFFFF' },
    { t: 'text', x: 72, y: 104, s: '@realnews_4u', size: 14, anchor: 'start' },
    { t: 'text', x: 72, y: 122, s: '2 hours ago', size: 12, bold: false, anchor: 'start', fill: '#6b7280' },
    { t: 'text', x: 30, y: 156, s: 'BREAKING: School is canceling', size: 15, anchor: 'start' },
    { t: 'text', x: 30, y: 178, s: 'ALL field trips forever because', size: 15, anchor: 'start' },
    { t: 'text', x: 30, y: 200, s: 'of a new state law!!!', size: 15, anchor: 'start' },
    { t: 'text', x: 30, y: 228, s: 'My cousin\'s friend heard it from', size: 14, bold: false, anchor: 'start' },
    { t: 'text', x: 30, y: 248, s: 'a teacher. Everyone is talking', size: 14, bold: false, anchor: 'start' },
    { t: 'text', x: 30, y: 268, s: 'about it. SHARE before they', size: 14, bold: false, anchor: 'start' },
    { t: 'text', x: 30, y: 288, s: 'delete this!!!', size: 14, bold: false, anchor: 'start' },
    { t: 'rect', x: 30, y: 304, w: 260, h: 80, rx: 10, fill: '#FFE08A', sw: 0 },
    { t: 'text', x: 160, y: 352, s: 'ALL TRIPS CANCELED?!', size: 19, fill: '#C8272D' },
    { t: 'text', x: 160, y: 414, s: '2.4K likes · 918 shares · 311 comments', size: 12, bold: false, fill: '#6b7280' }
  ] };

  var SHOOT = { kind: 'scene', w: 520, h: 260, bg: '#EEF4E8', label: 'A green shoot growing through a crack in stone', shapes: [
    { t: 'rect', x: 20, y: 170, w: 236, h: 70, rx: 6, fill: '#A7A195', sw: 2 },
    { t: 'rect', x: 264, y: 170, w: 236, h: 70, rx: 6, fill: '#B8B2A6', sw: 2 },
    { t: 'rect', x: 60, y: 110, w: 190, h: 56, rx: 6, fill: '#B8B2A6', sw: 2 },
    { t: 'rect', x: 270, y: 110, w: 190, h: 56, rx: 6, fill: '#A7A195', sw: 2 },
    { t: 'path', d: 'M260,240 L256,210 L262,190 L258,170', fill: 'none', stroke: '#5b544a', sw: 3 },
    { t: 'path', d: 'M260,170 C258,130 262,90 260,50', fill: 'none', stroke: '#3F8F3A', sw: 5 },
    { t: 'ellipse', cx: 238, cy: 92, rx: 22, ry: 9, fill: '#5DB24F', stroke: '#2E6B2A', sw: 2 },
    { t: 'ellipse', cx: 282, cy: 70, rx: 22, ry: 9, fill: '#5DB24F', stroke: '#2E6B2A', sw: 2 },
    { t: 'ellipse', cx: 260, cy: 44, rx: 9, ry: 14, fill: '#7CCB5F', stroke: '#2E6B2A', sw: 2 }
  ] };

  /* ---------- rooms ---------- */
  FX['g6-ela-inference-files'] = {
    theme: 'detective',
    stages: {
      0: { set: { cards: [['Text clues', 'What the author tells you: actions, words, and details.'], ['+ What I know', 'Your own experience with how people act and feel.'], ['= Inference', 'A smart conclusion the author did not state directly.']] },
        append: [HL('Tap the THREE details that show Jada is nervous.', ['Jada checked the gym clock for the fifth time.', '3:58.', 'The list would go up at 4:00.', 'She tugged at the sleeve of her hoodie, then smoothed it flat, then tugged it again.', 'When Coach Rivera walked out of the office holding a single sheet of paper,', 'Jada\'s stomach dropped to her sneakers.'], [0, 3, 5], { block: true, hint: 'Look for what Jada DOES and FEELS, not facts about the time.', explain: 'Checking the clock again and again, fidgeting with her sleeve, and her stomach "dropping" all show nerves.' })] },
      1: { append: [HL('Tap the TWO actions that show how Mom feels about Grandpa being gone.', ['Every Sunday, Grandpa had sat in the green recliner by the window, doing the crossword in pen.', 'This Sunday, the recliner was empty.', 'Mom set the newspaper on the seat, folded to the puzzle page, the way she always did.', 'Then she stood there a long time.', 'Finally she picked it back up, pressed it against her chest, and walked into the kitchen without a word.'], [3, 4], { block: true, hint: 'Which actions show strong feelings without saying the word "sad"?', explain: 'Standing still for a long time and holding the paper to her chest in silence show Mom\'s grief.' })] },
      2: { append: [HL('Tap the sentence that shows Ava\'s feelings have changed.', ['Ava sat alone at the end of the lunch table, her tray untouched.', 'When Leo said, "Hey, you\'re in my science class, right?" she nodded without looking up.', 'He sat down across from her anyway and slid his bag of pretzels to the middle of the table.', '"I always bring too many," he said.', 'For the first time all day, Ava smiled.'], [4], { block: true, hint: 'Find the moment she reacts differently than before.', explain: '"For the first time all day, Ava smiled" shows that Leo\'s kindness changed how she feels.' })] },
      3: { append: [HL('Tap the sentence that shows Mrs. Kowalski chose kindness instead of anger.', ['Mrs. Kowalski\'s garden was the pride of Maple Street.', 'So when the Tran twins\' soccer ball flattened her prize tomato plants, the whole street held its breath.', 'The twins stood at her fence, pale.', 'Mrs. Kowalski looked at the broken stems for a long moment.', 'Then she handed each of them a trowel.'], [4], { block: true, hint: 'What does she DO after looking at the damage?', explain: 'Handing them trowels invites them to help instead of punishing them.' })] },
      4: { append: [{ type: 'assemble', q: 'Build a strong evidence sentence. Put the pieces in order, starting with the sentence starter.', tiles: ['which shows she is nervous.', 'According to the text,', '"for the fifth time,"', 'Jada checks the clock'], answer: ['According to the text,', 'Jada checks the clock', '"for the fifth time,"', 'which shows she is nervous.'], joiner: ' ', hint: 'Starter → what the character does → the quote → what it shows.', explain: 'A strong evidence sentence names the source, quotes the text, and explains what it shows.' }] }
    }
  };

  FX['g6-ela-evidence-vault'] = {
    theme: 'vault',
    stages: {
      0: { append: [HL('Tap the TWO actions that show Darius is avoiding baseball since the semifinal.', ['Darius had been the Eagles\' star pitcher since fourth grade.', 'His fastball was so quick that the other teams\' coaches whispered about it.', 'But in the semifinal last week, he had thrown a wild pitch that let in the winning run.', 'Since then, he had stopped wearing his team cap to school.', 'When his little brother, Kofi, asked him to play catch, Darius said, "Maybe later," and closed his bedroom door.'], [3, 4], { block: true, hint: 'Look for what Darius does AFTER the wild pitch.', explain: 'Hiding his cap and turning down catch show he is avoiding reminders of his mistake.' })] },
      1: { set: { cards: [['Claim', 'What you think is true about the text.'], ['Evidence', 'The exact words from the text that prove it.'], ['Reasoning', 'Your explanation of HOW the evidence proves the claim.']] } },
      2: { append: [HL('Tap the THREE actions that show Darius is moving past his mistake.', ['Darius stood on the sidewalk for a long time.', 'Then he walked over, picked up a stray tennis ball from the gutter, and handed it to his brother.', '"Keep your elbow up," he said. "Like this."', 'Kofi\'s next throw smacked the center of the wall.', 'That night, Darius dug his cap out from under his bed and hung it back on its hook by the door.'], [1, 2, 4], { block: true, hint: 'Focus on what DARIUS does, not Kofi.', explain: 'Joining in, coaching Kofi, and hanging his cap back up all show Darius returning to the game he loves.' })] },
      3: { append: [{ type: 'assemble', q: 'Build the theme statement for "The Last Game."', tiles: ['keep trying.', 'Mistakes', 'if you', 'define you', 'do not have to'], answer: ['Mistakes', 'do not have to', 'define you', 'if you', 'keep trying.'], joiner: ' ', hint: 'Start with "Mistakes."', explain: 'A theme is a full-sentence message about life, not just a topic like "baseball."' }] },
      4: { append: [{ type: 'order', q: 'Rank the evidence for the claim "Teaching Kofi helps Darius regain his confidence," from STRONGEST to WEAKEST.', items: ['After coaching Kofi, Darius hangs his cap back on its hook.', 'Darius shows Kofi how to keep his elbow up.', 'Darius picks up a stray tennis ball.', 'Darius had been the star pitcher since fourth grade.'], hint: 'The strongest evidence connects teaching Kofi to a sign of Darius\'s confidence returning.', explain: 'The cap shows confidence returning right after teaching. The pitcher detail is from before the problem, so it proves nothing about this claim.' }] }
    }
  };

  FX['g6-ela-theme-quest'] = {
    theme: 'notebook',
    stages: {
      0: { append: [{ type: 'tap', q: 'Where on the plot diagram does this part of the story belong?', visual: PLOT, answer: 'exp', hint: 'This part introduces the character, her goal, and the setting.', why: { rise: 'Nothing has gone wrong yet.', climax: 'The turning point has not happened yet.', fall: 'This comes after the turning point.', res: 'This is the very end of a story.' }, explain: 'The exposition introduces Elena, her plan, and her belief that partners slow her down.' }] },
      1: { append: [{ type: 'tap', q: 'Where does this part of the story belong on the plot diagram?', visual: PLOT, answer: 'rise', hint: 'The problems are piling up and tension is growing.', why: { exp: 'The characters and goal were already introduced.', climax: 'Elena has not made her big decision yet.', fall: 'The story has not turned yet.', res: 'The problem is not solved yet.' }, explain: 'Failed tests and turning down Sam\'s help build the conflict: rising action.' }] },
      2: { append: [{ type: 'tap', q: 'Elena asks Sam for help. Tap where this belongs on the plot diagram.', visual: PLOT, answer: 'climax', hint: 'This is the moment the character makes the choice that changes everything.', why: { rise: 'This is more than another problem. It is the big change.', fall: 'Falling action comes after this choice.', exp: 'The story began long before this.', res: 'The story is not over yet.' }, explain: 'Asking for help is the turning point: Elena acts differently than she did before.' }] },
      3: { append: [{ type: 'tap', q: 'Elena writes two names on next year\'s calendar. Tap where this belongs on the plot diagram.', visual: PLOT, answer: 'res', hint: 'This is the very end, showing how the character has changed.', why: { fall: 'Close. The fair results are falling action, but the calendar is the final wrap-up.', climax: 'The turning point already happened.', rise: 'The conflict is over.', exp: 'This is the end, not the beginning.' }, explain: 'The resolution shows Elena\'s change: she now values working with a partner.' }] },
      4: { set: { cards: [['Topic', 'One or two words: "teamwork."'], ['Theme', 'A full-sentence message: "Accepting help can make us stronger."'], ['How to find it', 'Ask: What did the character learn? What should the reader learn?']] } }
    }
  };

  FX['g6-ela-debate-lockdown'] = {
    theme: 'civic',
    stages: {
      1: { append: [HL('Tap the FOUR words or phrases that signal an opinion.', ['I think', 'the new lunch menu', 'is the', 'best', 'ever, and', 'everyone knows', 'the old one was', 'terrible.', 'It has', '12 items.'], [0, 3, 5, 7], { hint: 'Look for the opinion words from the list above.', explain: '"I think," "best," "everyone knows," and "terrible" are judgments. "It has 12 items" can be proven.' })] },
      2: { patch: { 0: { replace: HL('Tap the ONE sentence that is supported with specific evidence.', ['(1) A later start is a bad idea.', '(2) Everyone knows kids would just stay up later.', '(3) Also, after-school sports would end after dark.', '(4) In our district, practices already end at 5:30 p.m.; a 55-minute later start would push them to about 6:25 p.m., after sunset in winter.', '(5) Later start times are obviously a silly fad.'], [3], { block: true, hint: 'Look for specific numbers and facts that can be checked.', explain: 'Sentence 4 gives real times that can be checked. The others are opinions or generalizations.' }) } } },
      3: { patch: { 0: { replace: HL('Tap the counterclaim: the sentence that states the OTHER side.', ['Some people argue that a later start will make sports practices end too late.', 'However, schools that changed their schedules found solutions, like using indoor lights on the field or shortening practice by 15 minutes.', 'The health benefits of sleep outweigh this scheduling challenge.'], [0], { block: true, hint: 'Look for the phrase "Some people argue."', explain: '"Some people argue..." introduces the opposing view, which the author then answers.' }) } },
        append: [HL('Tap the word that signals the author is about to respond to the counterclaim.', ['Some people argue', 'that a later start', 'will make sports practices end too late.', 'However,', 'schools that changed their schedules', 'found solutions.'], [3], { hint: 'Find the transition word that means "on the other hand."', explain: '"However" turns from the other side back to the author\'s argument.' })] },
      4: { append: [{ type: 'order', q: 'Put the parts of a strong argument in the order they usually appear.', items: ['Claim', 'Reasons', 'Evidence', 'Counterclaim', 'Response to the counterclaim', 'Conclusion'], hint: 'Start with your position. End by restating it.', explain: 'Claim, reasons, evidence, then the other side and your answer to it, and a conclusion.' }] }
    }
  };

  FX['g6-ela-newsroom-trip'] = {
    theme: 'newsroom',
    stages: {
      0: { patch: { 0: { replace: HL('Tap the sentence that states the central idea of the article.', ['Bees, butterflies, and other pollinators are responsible for one out of every three bites of food we eat.', 'Yet populations of many pollinators have declined in recent decades.', 'In Carmel, the city has converted 12 acres of mowed grass into native wildflower meadows.', 'Students at a Fort Wayne middle school planted a 900-square-foot pollinator garden.', 'These efforts show that small local actions can add up to big help for pollinators.'], [4], { block: true, hint: 'The central idea sums up the whole article. The examples support it.', explain: 'The last sentence ties every example together: small local actions add up to big help.' }) } } },
      1: { set: { cards: [['Who wrote it?', 'An expert or trusted organization, or someone anonymous?'], ['What is their purpose?', 'To inform, or to sell or persuade?'], ['Is it current?', 'Check the date. Science changes.'], ['Can I confirm it?', 'Find the same fact in a second reliable source.']] } },
      2: { append: [HL('Tap the TWO sentences that give opinions with NO evidence at all.', ['Gas leaf blowers are loud, dirty, and unnecessary.', 'They can reach 100 decibels, as loud as a motorcycle, according to the Centers for Disease Control.', 'Many models also pollute more than a car in the same amount of time, according to a test by a car magazine.', 'Worst of all, they are simply annoying.', 'Rakes worked fine for our grandparents.'], [3, 4], { block: true, hint: 'Which sentences have no source, number, or fact?', explain: '"Simply annoying" and "rakes worked fine" are opinions with no support. The first sentence is the claim, which the next two support.' })] },
      3: { append: [{ type: 'assemble', q: 'You are the headline writer! Build an accurate headline for the reading study.', tiles: ['Score Higher', 'Study:', 'on Vocabulary', 'Daily Readers', 'Become Geniuses'], answer: ['Study:', 'Daily Readers', 'Score Higher', 'on Vocabulary'], joiner: ' ', hint: 'An accurate headline does not exaggerate. One tile does not belong.', why: {}, explain: '"Study: Daily Readers Score Higher on Vocabulary" is accurate. "Become Geniuses" exaggerates.' }] },
      4: { append: [HL('Tap the sentence that shows the reporter included the OTHER side of the story.', ['Indianapolis added 25 miles of new bike lanes last year.', 'Supporters say the lanes make cycling safer; city data shows bike crashes on those streets dropped 18%.', 'Some business owners argue the lanes took away parking.', 'The city responded by adding 60 parking spaces in nearby lots.'], [2], { block: true, hint: 'Look for people who disagree with the bike lanes.', explain: 'Including business owners\' concerns makes the article balanced and fair.' })] }
    }
  };

  FX['g6-ela-viral-post'] = {
    theme: 'phone',
    stages: {
      0: { set: { visual: POST },
        append: [HL('Tap the part of the post that names its only "source."', ['BREAKING:', 'School is canceling ALL field trips forever', 'because of a new state law!!!', 'My cousin\'s friend heard it from a teacher.', 'Everyone is talking about it.', 'SHARE before they delete this!!!'], [3], { hint: 'Who supposedly said this? Is that person named?', explain: 'A "cousin\'s friend" who heard from an unnamed teacher is secondhand gossip, not a reliable source.' })] },
      1: { append: [HL('Tap the sentence in the official update that directly proves the post wrong.', ['Beginning in January, all field trips will require a signed permission form', 'submitted two weeks in advance,', 'following new state safety guidelines.', 'Field trips will continue as scheduled.'], [3], { block: true, hint: 'The post said trips were canceled forever.', explain: '"Field trips will continue as scheduled" directly contradicts the viral post.' })] },
      2: { set: { cards: [['1. Staff meeting', '"There are new state rules for field trips."'], ['2. Overheard', '"Something is changing with field trips..."'], ['3. The viral post', '"ALL field trips canceled FOREVER!!!"']] } }
    }
  };

  FX['g6-ela-shades-gallery'] = {
    theme: 'studio',
    stages: {
      0: { append: [{ type: 'order', q: 'Arrange these words from MOST NEGATIVE to MOST POSITIVE connotation.', items: ['scrawny', 'skinny', 'thin', 'slender'], hint: 'All four mean "not heavy." Which sounds like an insult? Which sounds like a compliment?', explain: 'Scrawny (negative) → skinny → thin (neutral) → slender (positive).' }] },
      1: { append: [HL('Tap the THREE words in Writer A\'s description that create a warm, positive tone.', ['The', 'cozy', 'cottage', 'nestled', 'among the trees, its', 'weathered', 'shutters hinting at a hundred years of', 'family stories.'], [1, 3, 7], { hint: 'Which words make you feel comfortable and safe?', explain: '"Cozy," "nestled," and "family stories" feel warm. "Weathered" is closer to neutral.' })] },
      2: { append: [HL('The author uses positive words to say the OPPOSITE. Tap the TWO sarcastic phrases.', ['Oh, wonderful.', 'Another Monday.', 'My alarm clock has once again chosen violence,', 'and the cereal box contains exactly four flakes and a cloud of dust.', 'Truly, a glorious beginning.'], [0, 4], { block: true, hint: 'Find the praise words that do not match the bad events.', explain: '"Wonderful" and "glorious" say the opposite of what the author means: that is sarcasm.' })] },
      3: { append: [HL('Tap the TWO loaded words in Report 2.', ['The city council', 'rammed through', 'a', 'greedy', 'new parking fee.'], [1, 3], { hint: 'Which words carry strong negative feelings?', explain: '"Rammed through" and "greedy" push readers to feel angry. A neutral report would say "voted to approve."' })] }
    }
  };

  FX['g6-ela-poets-notebook'] = {
    theme: 'notebook',
    stages: {
      0: { append: [HL('Tap the line that contains a SIMILE.', ['The city is a sleeping giant,', 'its streetlights blinking like drowsy eyes.', 'The traffic hums a lullaby', 'beneath the patchwork skies.'], [1], { block: true, hint: 'A simile uses "like" or "as."', explain: '"Blinking like drowsy eyes" compares streetlights to eyes using "like."' })] },
      1: { patch: { 1: { replace: HL('Tap the line that uses HYPERBOLE.', ['Her hands are maps of every year,', 'the rivers of her veins run blue.', 'They\'ve kneaded bread ten thousand times', 'and braided my hair when it was new.'], [2], { block: true, hint: 'Hyperbole is an exaggeration for effect.', explain: '"Ten thousand times" is an exaggeration that shows how often she has baked for her family.' }) } } },
      2: { set: { cards: [['King Midas', 'In a Greek myth, he wished that everything he touched would turn to gold.'], ['The problem', 'His food, and even his daughter, turned to gold.'], ['Today', '"The Midas touch" means everything you try succeeds.']] } },
      3: { append: [HL('Tap the TWO lines that use alliteration.', ['Crack! goes the sky. The rain rattles the roof,', 'the wild wind wails at the door.', 'The thunder booms, the gutters gush,', 'and the old oak groans once more.'], [0, 1], { block: true, tip: 'Tap every line that answers the question.', why: {}, hint: 'Look for three or more words in a row that start with the same sound.', explain: '"Rain rattles the roof" (r, r, r) and "wild wind wails" (w, w, w). The third line has "gutters gush," but only two words.' })] },
      4: { set: { visual: Object.assign({ caption: 'Hope is a small green shoot / that pushes through a crack in stone.' }, SHOOT) } }
    }
  };

  FX['g6-ela-word-quest'] = {
    theme: 'wizard',
    stages: {
      0: { append: [HL('Tap the TWO clue phrases that reveal what "meticulous" means.', ['The detective\'s', 'meticulous', 'notes recorded', 'every tiny detail,', 'down to the color of each button.'], [3, 4], { hint: 'Which words show HOW careful the notes were?', explain: '"Every tiny detail" and "down to the color of each button" show that meticulous means extremely careful.' })] },
      1: { append: [{ type: 'assemble', q: 'Cast a word spell! Build the word that means "an instrument for looking at very small things."', tiles: ['scope', 'therm', 'micro', 'phon'], answer: ['micro', 'scope'], joiner: '', hint: 'small + look', explain: 'micro (small) + scope (look) = microscope.' },
        { type: 'assemble', q: 'Build the word that means "to throw forward," like a movie onto a screen.', tiles: ['ject', 'chron', 'pro', 'hydr'], answer: ['pro', 'ject'], joiner: '', hint: '"pro" means forward. Which root means throw?', explain: 'pro (forward) + ject (throw) = project.' }] },
      2: { append: [{ type: 'assemble', q: 'Build the word that means "to break in between" someone\'s words.', tiles: ['rupt', 'voc', 'inter', 'photo'], answer: ['inter', 'rupt'], joiner: '', hint: '"inter" means between.', explain: 'inter (between) + rupt (break) = interrupt.' }] },
      4: { append: [HL('Tap the TWO actions that prove the queen is benevolent.', ['The benevolent queen', 'was loved by her people;', 'she opened the palace gardens to the public', 'and fed the hungry each winter.', 'Her brother, a malevolent prince,', 'schemed in the shadows', 'to steal the throne.'], [2, 3], { hint: 'Look for things the queen DOES.', explain: 'Opening her gardens and feeding the hungry show she wishes others well: bene (good) + vol (wish).' })] }
    }
  };
})(window.CX_FX);
