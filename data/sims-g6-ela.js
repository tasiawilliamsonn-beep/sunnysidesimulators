/*
 * Sunnyside Simulators: Grade 6 ELA simulations (Reading Room).
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];
var SUNNY_TEXTS = window.SUNNY_TEXTS = window.SUNNY_TEXTS || {};

SUNNY_TEXTS.moving = {
  title: 'Moving Day', genre: 'Realistic fiction', by: 'A Sunnyside original story',
  paragraphs: [
    "Tessa sat on a cardboard box in her new bedroom in Sunnyside, Indiana, and refused to open it. {m1|\"I'm not unpacking,\" she told her mom. \"This isn't home.\"} Back in Chicago, she had a best friend, a favorite pizza place, and a view of the lake. Here, there was a cornfield and a lot of quiet.",
    "For three days, Tessa kept her sketchbook buried in the box. {m2|She ate dinner in silence and answered every question with a shrug.}",
    "On the fourth day, a girl with a gap-toothed grin knocked on the door holding a plate of cookies. \"I'm Ines,\" she said. \"I live next door. Want to help at the community garden? We need someone to plant sunflowers.\" Tessa almost said no, but the cookies smelled like cinnamon.",
    "{m3|At the garden, Ines showed her how to press the seeds into the soil with one knuckle.} Old Mr. Patel told a story about the year the tomatoes grew as big as softballs, and {m4|Tessa laughed for the first time since the moving truck had pulled away.}",
    "That night, Tessa opened the box. {m5|She took out her sketchbook and drew the garden: the crooked fence, Mr. Patel's straw hat, and a row of tiny sunflower sprouts.} {m6|At the top of the page, she wrote one word: Home?} Then, after a moment, she erased the question mark."
  ]
};
SUNNY_TEXTS.violin = {
  title: 'The Broken Violin', genre: 'Realistic fiction', by: 'A Sunnyside original story',
  paragraphs: [
    "The spring concert was in one hour when Malik heard the crack. He had set the school's violin on a chair for just a second, and someone had bumped it onto the floor. {v1|The neck had split, and one string curled like a question mark.}",
    "{v2|Malik's first thought was to slide the violin back into its case and say nothing.} Nobody had seen it happen. He could blame the old case, or say it came that way.",
    "But he thought about Ms. Rivera, who had stayed after school every Tuesday to help him learn the hardest part of the song. {v3|His hands shook as he carried the case down the hallway to her room.} \"I broke it,\" he said. \"It was an accident, but it was my fault. I'm sorry.\"",
    "Ms. Rivera was quiet for a long moment. Then she opened her closet and took out her own violin. {v4|\"Thank you for telling me the truth,\" she said. \"That took more courage than playing a solo.\"}",
    "That night, Malik played the hardest part of the song without a single mistake. {v5|When the audience clapped, he realized he felt lighter than he had in weeks, as if he had set down something heavy.}"
  ]
};

/* ======================= Textual evidence, inference & theme ======================= */
SUNNY_SIMS.push({
  id: 'g6-ela-race-studio', std: 'g6-ela-evidence', subject: 'ela', grade: 6, code: '6.RL.2.1 · 6.W.3.1',
  title: 'RACE Writing Studio 6: Two Pieces of Evidence', model: 'raceStudio', minutes: 30, icon: '✍️',
  setup: {
    passages: [SUNNY_TEXTS.moving, SUNNY_TEXTS.violin],
    example: { prompt: 'How does Malik feel right after the violin breaks? Cite evidence.', parts: [['R', 'Right after the violin breaks in "The Broken Violin," Malik feels', 'Restate using the key words of the prompt (who, when, what).'], ['A', 'tempted to hide what happened because he is scared.', 'Answer precisely: name the feeling AND the reason.'], ['C', 'The text states, "Malik\'s first thought was to slide the violin back into its case and say nothing." Later, "His hands shook as he carried the case."', 'Cite: in 6th grade, strong answers usually use TWO pieces of evidence, each introduced and quoted exactly.'], ['E', 'These details show that Malik was frightened of getting in trouble, since hiding the violin and shaking hands both reveal fear.', 'Explain: connect EACH quote to your answer. Explain the inference, not just repeat the quote.']] },
    prompts: [
      { q: 'How do Tessa\'s feelings about her new town change over the story? Cite two pieces of evidence.', keys: ['How', 'Tessa\'s', 'feelings', 'change', 'two', 'evidence'], slots: { R: 'r1', A: 'a1', C: 'c1', E: 'e1' }, goodEvidence: ['m1', 'm2', 'm4', 'm5', 'm6'] },
      { q: 'What theme does the author develop through Malik\'s choice? Cite two pieces of evidence.', keys: ['theme', 'Malik\'s', 'choice', 'two', 'evidence'], slots: { R: 'r2', A: 'r2', C: 'r2', E: 'r2' }, goodEvidence: ['v2', 'v3', 'v4', 'v5'] }
    ]
  },
  place: 'Sunnyside Reading Room · Writing Studio',
  mission: 'Middle school answers need more than one quote. In this studio, you\'ll level up your RACE writing: dissect the prompt, choose TWO strong pieces of evidence, and explain how each one proves your answer.',
  question: 'How do I write a text-based answer that cites and explains multiple pieces of evidence?',
  takeaway: 'Strong RACE answers restate the prompt, answer precisely, cite TWO pieces of evidence (each introduced and quoted exactly), and explain how each piece proves the answer. For change-over-time questions, pick one quote from the beginning and one from the end.',
  vocab: [['Cite', 'Quote or refer to the text as evidence.'], ['Explicit', 'Stated directly in the text.'], ['Inference', 'A conclusion from clues plus what you know.'], ['Transition', 'A word that connects ideas (later, however, in contrast).']],
  warmup: { style: 'Evidence pick', prompt: 'Which quote better proves the claim "Tessa changed"? Why?', items: [['"I\'m not unpacking" OR "She took out her sketchbook"?', 'Both together: one shows the beginning, one the end.'], ['Why use two pieces of evidence?', 'To show a pattern or change and make the answer stronger.'], ['Name a transition for the second quote.', '"Later," "By the end," "In contrast."']] },
  steps: [
    { tag: 'model', title: 'Study the model', setup: { mode: 'example' }, goal: { text: 'Tap all four colored parts of the model.', check: { exampleSeen: 4 } }, q: { type: 'mc', q: 'What makes the model\'s Cite section stronger than a single quote?', choices: ['It uses two quotes that together show a pattern', 'It is longer', 'It uses the word "text"'], answer: 0 } },
    { tag: 'read', title: 'Read "Moving Day"', setup: { mode: 'write', prompt: 0 }, sheet: 1, goal: { text: 'Read the story and press ✓ I finished reading.', check: { read_0: true } }, q: { type: 'mc', q: 'What is the turning point for Tessa?', choices: ['Working in the garden with Ines and Mr. Patel', 'Eating dinner in silence', 'Moving from Chicago'], answer: 0 } },
    { tag: 'explore', title: 'Dissect the prompt', sheet: 1, goal: { text: 'Tap the key words in the prompt.', button: 'Check my key words', check: { keysAll: true }, why: function (s) { return (s.keysRight || 0) + ' key words found. Find who, what changes, and how much evidence.'; } } },
    { id: 'r1', tag: 'write', title: 'R + A: Restate and answer', sheet: 2, q: { type: 'text', q: 'Write your first sentence: restate the prompt AND answer it (from ___ to ___).', rows: 2, starter: 'Over the course of "Moving Day," Tessa\'s feelings about Sunnyside change from', min: 14, need: [{ words: ['tessa'], label: 'Names Tessa' }, { words: ['change', 'changes', 'from'], label: 'Shows change' }, { words: ['upset', 'unhappy', 'angry', 'sad', 'resent', 'refus', 'lonely', 'not home'], label: 'Beginning feeling' }, { words: ['home', 'happy', 'belong', 'welcome', 'accept', 'comfortable'], label: 'Ending feeling' }] } },
    { id: 'a1', tag: 'write', title: 'A: Sharpen the answer', sheet: 2, q: { type: 'text', q: 'In one sentence, name WHAT causes the change.', rows: 2, min: 8, need: [{ words: ['ines', 'garden', 'patel', 'neighbor', 'friend'], label: 'Names the cause' }] } },
    { tag: 'explore', title: 'Choose two pieces of evidence', sheet: 3, strategy: 'For a change question, choose one quote from the BEGINNING and one from the END.', goal: { text: 'Highlight TWO sentences: one showing how Tessa feels at first, one showing how she feels at the end.', button: 'Check my evidence', check: function (s) { var e = s.evidence || []; return (e.indexOf('m1') >= 0 || e.indexOf('m2') >= 0) && (e.indexOf('m5') >= 0 || e.indexOf('m6') >= 0 || e.indexOf('m4') >= 0); }, no: 'You need one "before" quote (paragraphs 1–2) and one "after" quote (paragraphs 4–5).' } },
    { id: 'c1', tag: 'write', title: 'C: Cite both', sheet: 3, q: { type: 'text', q: 'Write the Cite: introduce and quote BOTH pieces of evidence, with a transition between them.', rows: 3, starter: 'At first, Tessa says, "', min: 16, quote: true, quotes: 2, need: [{ words: ['later', 'by the end', 'in contrast', 'however', 'then', 'at the end', 'finally'], label: 'Uses a transition' }] } },
    { id: 'e1', tag: 'write', title: 'E: Explain each', sheet: 4, q: { type: 'text', q: 'Explain how the two quotes TOGETHER prove the change.', rows: 3, starter: 'The first quote shows', min: 20, need: [{ words: ['first quote', 'first', 'at first', 'beginning'], label: 'Explains the first quote' }, { words: ['second', 'end', 'later', 'finally'], label: 'Explains the second quote' }, { words: ['home', 'belong', 'change', 'changed', 'accept'], label: 'Connects to the change' }] } },
    { tag: 'write', title: 'Revise the paragraph', sheet: 5, q: { type: 'write', q: 'Revise your full RACE paragraph.', parts: [
      { label: 'R + A', prefill: ['r1', 'a1'], min: 18, need: [{ words: ['tessa'], label: 'Names Tessa' }] },
      { label: 'C (two quotes)', prefill: 'c1', min: 14, quote: true, quotes: 2 },
      { label: 'E', prefill: 'e1', min: 18, need: [{ words: ['shows', 'proves', 'reveals', 'suggests'], label: 'Explains' }] }] } },
    { tag: 'read', title: 'You do: new story', setup: { mode: 'write', prompt: 1 }, sheet: 6, goal: { text: 'Read "The Broken Violin" and finish reading.', check: { read_1: true } } },
    { id: 'r2', tag: 'write', title: 'You do: full RACE', sheet: 7, text: 'Prompt: What theme does the author develop through Malik\'s choice? Cite two pieces of evidence.', q: { type: 'write', q: 'Write all four parts on your own.', parts: [
      { label: 'Restate', min: 8, need: [{ words: ['malik'], label: 'Names Malik' }, { words: ['theme', 'lesson', 'message'], label: 'Uses "theme"' }] },
      { label: 'Answer', min: 8, need: [{ words: ['honest', 'truth', 'responsib', 'courage'], label: 'States a theme about honesty or courage' }] },
      { label: 'Cite (two quotes)', min: 16, quote: true, quotes: 2, need: [{ words: ['the text states', 'the author writes', 'according to', 'for example', 'later', 'she says', 'says'], label: 'Introduces the quotes' }] },
      { label: 'Explain', min: 18, need: [{ words: ['shows', 'proves', 'reveals', 'suggests'], label: 'Explains' }, { words: ['honest', 'truth', 'lighter', 'courage'], label: 'Connects to the theme' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: counter-evidence', sheet: 8, q: { type: 'text', q: 'Is there any detail that seems to go AGAINST your theme at first? Quote it and explain why it actually supports the theme.', min: 20, quote: true, need: [{ words: ['at first', 'seems', 'but', 'however', 'actually'], label: 'Addresses the counter-detail' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-inference-board', std: 'g6-ela-evidence', subject: 'ela', grade: 6, code: '6.RL.2.1',
  title: 'Inference Detective Board', model: 'inferenceCase', minutes: 20, icon: '🕵️',
  setup: {
    passage: { title: 'The Fifth Plate', genre: 'Short story', paragraphs: [
      "Mom set five plates on the table even though there were only four of us. She had baked a chocolate cake with blue frosting, Dad's favorite color. My little sister kept pressing her nose to the front window.",
      "All afternoon, Mom checked her phone every few minutes. She had ironed the flag that usually stays folded in the closet and hung it by the door. Grandpa wore his old Army cap, which he only puts on for Veterans Day.",
      "When a car door slammed outside, Mom dropped the spoon she was holding. My sister screamed and ran for the door. I didn't even remember standing up. I just remember the tan uniform, the duffel bag hitting the porch, and Mom crying and laughing at the same time."
    ] },
    clues: ['Five plates for four people', 'A cake in Dad\'s favorite color', 'The flag and Grandpa\'s Army cap', 'Mom crying and laughing at the same time'],
    know: ['People set a place for someone they expect to come home.', 'Families bake a favorite cake to celebrate a special person.', 'Flags and uniforms are connected to the military.', 'People can cry from happiness, not just sadness.'],
    infs: ['Someone special is expected for dinner.', 'The celebration is for Dad.', 'Dad has been away serving in the military.', 'Mom is overjoyed that Dad is home.', 'Mom is angry at Dad.', 'The family is moving away.'],
    links: [[0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]]
  },
  place: 'Sunnyside Reading Room · Detective Agency',
  mission: 'The author of "The Fifth Plate" never states what is happening, but the clues are everywhere. Pin each text clue to what you already know and the inference it leads to, then prove your big inference in writing.',
  question: 'How do readers make inferences from text clues and background knowledge?',
  takeaway: 'An inference = text clue + what I already know. Authors "show, don\'t tell," leaving details for readers to connect. A strong inference is supported by several clues, not a guess.',
  vocab: [['Inference', 'A conclusion based on clues and what you already know.'], ['Explicit', 'Stated directly.'], ['Implicit', 'Suggested but not stated.'], ['Background knowledge', 'What you already know from life and learning.']],
  warmup: { style: 'What\'s happening?', prompt: 'Make an inference and name your clue.', items: [['A boy walks in with wet hair and a dripping umbrella.', 'It is raining. Clue: wet hair and umbrella.'], ['A girl keeps checking the clock and tapping her foot.', 'She is impatient or late.'], ['What is the formula for an inference?', 'Text clue + what I know.']] },
  steps: [
    { tag: 'read', title: 'Read the case file', goal: { text: 'Read "The Fifth Plate."', check: { read: true } }, q: { type: 'mc', q: 'Is the reason for the celebration stated directly in the text?', choices: ['No, the reader has to infer it', 'Yes, in the first sentence', 'Yes, in the title'], answer: 0 } },
    { tag: 'test', title: 'Pin the first link', sheet: 1, goal: { text: 'Pin one correct clue → knowledge → inference link.', check: { right: { gte: 1 } } } },
    { tag: 'test', title: 'Solve the board', sheet: 2, goal: { text: 'Pin all four correct links.', check: { allRight: true } }, q: { type: 'mc', q: 'Which two inference cards were traps (not supported by the clues)?', choices: ['"Mom is angry at Dad" and "The family is moving away"', '"Someone special is expected" and "The celebration is for Dad"', 'None of them'], answer: 0 } },
    { tag: 'reason', title: 'Explicit or implicit?', sheet: 3, q: { type: 'sort', q: 'Sort each statement.', bins: ['Stated explicitly', 'Inferred (implicit)'], items: [['Mom set five plates.', 0], ['Dad is coming home from the military.', 1], ['Grandpa wore his Army cap.', 0], ['The family missed Dad.', 1], ['A car door slammed.', 0]] } },
    { tag: 'write', title: 'Prove the big inference (CER)', sheet: 4, q: { type: 'write', q: 'Why is the family celebrating? Support your inference with TWO clues.', parts: [
      { label: 'Claim (inference)', starter: 'The family is celebrating because', min: 10, need: [{ words: ['dad', 'father'], label: 'Names Dad' }, { words: ['home', 'return', 'back', 'military', 'army'], label: 'States he is returning home' }] },
      { label: 'Evidence (two quotes)', starter: 'The text says, "', min: 14, quote: true, quotes: 2 },
      { label: 'Reasoning', starter: 'These clues show', min: 16, need: [{ words: ['know', 'because', 'usually', 'means'], label: 'Uses background knowledge' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: author\'s craft', sheet: 5, q: { type: 'text', q: 'Why might the author choose NOT to tell readers directly that Dad is coming home? How does that affect the ending?', min: 18, need: [{ words: ['surprise', 'suspense', 'wonder', 'guess', 'emotion', 'feel'], label: 'Explains the effect on readers' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-evidence-meter', std: 'g6-ela-evidence', subject: 'ela', grade: 6, code: '6.RL.2.1',
  title: 'Evidence Strength Meter', model: 'evidenceMeter', minutes: 20, icon: '📏',
  setup: {
    claim: 'In "Moving Day," Tessa begins to feel at home in Sunnyside.',
    passage: SUNNY_TEXTS.moving,
    cards: [
      ['She took out her sketchbook and drew the garden.', 0, 'Drawing the garden shows she is connecting to the new place, so it is strong.'],
      ['At the top of the page, she wrote one word: Home? Then she erased the question mark.', 0, 'Erasing the question mark shows she now believes it is home, which is strong evidence.'],
      ['Tessa laughed for the first time since the moving truck had pulled away.', 1, 'Laughing shows she is happier, but not directly that she feels at HOME. That makes it weak.'],
      ['The cookies smelled like cinnamon.', 2, 'The smell of cookies doesn\'t say anything about feeling at home.'],
      ['"I\'m not unpacking," she told her mom. "This isn\'t home."', 2, 'This shows the opposite of the claim, so it doesn\'t support it.'],
      ['Ines showed her how to press the seeds into the soil with one knuckle.', 1, 'It shows she is taking part, but not how she feels about the town. That makes it weak.']
    ]
  },
  place: 'Sunnyside Reading Room · Evidence Lab',
  mission: 'Not all evidence is created equal. Test each quote from "Moving Day" on the evidence meter: does it strongly prove the claim, weakly relate to it, or not support it at all?',
  question: 'What makes textual evidence strong, weak, or irrelevant?',
  takeaway: 'Strong evidence directly proves the claim. Weak evidence is related to the topic but needs a big leap to prove the claim. Some quotes don\'t support the claim at all or even contradict it. Always choose the strongest evidence.',
  vocab: [['Relevant', 'Connected to the claim.'], ['Sufficient', 'Enough to prove the claim.'], ['Contradict', 'Go against.'], ['Claim', 'A statement you are trying to prove.']],
  warmup: { style: 'Strong or weak?', prompt: 'Claim: "Our dog is smart." Rate each piece of evidence.', items: [['"He can open the back door by himself."', 'Strong.'], ['"He has brown fur."', 'Doesn\'t support.'], ['"He likes treats."', 'Weak or not relevant.']] },
  steps: [
    { tag: 'read', title: 'Know the text', goal: { text: 'Open the text and read it.', check: { read: true } } },
    { tag: 'test', title: 'Test the evidence', sheet: 1, goal: { text: 'Place every evidence card on the meter correctly.', check: { allRight: true } } },
    { tag: 'reason', title: 'Why weak?', sheet: 2, q: { type: 'mc', q: 'Why is "Tessa laughed for the first time" only WEAK evidence for the claim?', choices: ['It shows she is happier, but not directly that she feels at home', 'It isn\'t in the story', 'It proves the opposite'], answer: 0 } },
    { tag: 'reason', title: 'Contradicting evidence', sheet: 3, q: { type: 'mc', q: '"This isn\'t home" is from the story. Why doesn\'t it support the claim?', choices: ['It shows how she felt BEFORE she changed, so it goes against the claim', 'It is too short', 'It is a question'], answer: 0 } },
    { tag: 'write', title: 'Use the strongest', sheet: 4, q: { type: 'write', q: 'Prove the claim using the STRONGEST evidence.', parts: [
      { label: 'Claim', starter: 'By the end of the story, Tessa', min: 8, need: [{ words: ['home', 'belong'], label: 'Restates the claim' }] },
      { label: 'Evidence', min: 10, quote: true, need: [{ words: ['sketchbook', 'erased', 'question mark', 'home'], label: 'Uses a strong quote' }] },
      { label: 'Reasoning', starter: 'This is strong evidence because', min: 14, need: [{ words: ['shows', 'proves', 'because'], label: 'Explains why it proves the claim' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: make weak strong', sheet: 5, q: { type: 'text', q: 'Take a WEAK piece of evidence and explain what you would need to add (another quote or explanation) to make it support the claim.', min: 18, need: [{ words: ['add', 'another', 'also', 'combine', 'together'], label: 'Explains what to add' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-theme-tracker', std: 'g6-ela-evidence', subject: 'ela', grade: 6, code: '6.RL.2.2',
  title: 'Theme Tracker: The Broken Violin', model: 'reader', minutes: 25, icon: '🎻',
  setup: { title: SUNNY_TEXTS.violin.title, genre: SUNNY_TEXTS.violin.genre, by: SUNNY_TEXTS.violin.by, paragraphs: SUNNY_TEXTS.violin.paragraphs, img: '🎻', tools: [['begin', '🟨 Conflict / temptation'], ['turn', '🟦 Turning point'], ['end', '🟩 Result / lesson']] },
  place: 'Sunnyside Reading Room · Theme Lab',
  mission: 'A theme develops across a whole story, not in one line. Track how the author builds the theme of "The Broken Violin" from the conflict, through the turning point, to the result.',
  question: 'How is a theme conveyed through particular details across a story?',
  takeaway: 'Authors develop themes through details: the conflict a character faces, the choice they make at the turning point, and the results of that choice. Tracking these details across the story reveals the theme and gives you evidence to support it.',
  vocab: [['Theme', 'The central message about life.'], ['Turning point', 'The moment a character makes a key decision or changes.'], ['Develop', 'Build up over the course of a text.'], ['Conflict', 'The struggle or problem.']],
  warmup: { style: 'Story mountain', prompt: 'For any story you know, name each part.', items: [['Conflict', 'The problem.'], ['Turning point', 'The big decision or change.'], ['Resolution', 'How it ends.']] },
  steps: [
    { tag: 'read', title: 'Read the story', goal: { text: 'Read and press ✓ I finished reading.', check: { read: true } } },
    { tag: 'explore', title: 'Track the details', sheet: 1, goal: { text: 'Mark the temptation (🟨), the turning point (🟦), and the result (🟩).', button: 'Check my tracking', check: function (s) { return (s.hl_begin || []).indexOf('v2') >= 0 && ((s.hl_turn || []).indexOf('v3') >= 0) && ((s.hl_end || []).indexOf('v5') >= 0 || (s.hl_end || []).indexOf('v4') >= 0); }, why: function () { return 'Temptation: what did Malik want to do at first? Turning point: when did he choose honesty? Result: how did he feel after?'; } } },
    { tag: 'reason', title: 'The symbol', sheet: 2, q: { type: 'mc', q: 'At the end, Malik feels "as if he had set down something heavy." What was the heavy thing?', choices: ['The guilt of keeping a secret', 'The violin case', 'His backpack'], answer: 0 } },
    { tag: 'reason', title: 'Theme statement', sheet: 3, q: { type: 'mc', q: 'Which theme statement is best supported by ALL the tracked details?', choices: ['Telling the truth takes courage, but it brings peace.', 'Violins break easily.', 'Teachers always forgive students.', 'Never touch school instruments.'], answer: 0 } },
    { tag: 'write', title: 'Develop the theme (two quotes)', sheet: 4, q: { type: 'write', q: 'Explain how the author develops the theme through Malik\'s choice.', parts: [
      { label: 'Theme', starter: 'The author develops the theme that', min: 10, need: [{ words: ['honest', 'truth', 'courage'], label: 'States the theme' }], avoid: [['Malik', 'Theme statement applies to anyone (no names in this sentence)']] },
      { label: 'Evidence from the conflict and the result', min: 16, quote: true, quotes: 2 },
      { label: 'Explanation', starter: 'These details show', min: 18, need: [{ words: ['first', 'at first', 'tempt', 'hide'], label: 'Explains the conflict' }, { words: ['lighter', 'peace', 'relief', 'better', 'end'], label: 'Explains the result' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: Ms. Rivera', sheet: 5, q: { type: 'text', q: 'How does Ms. Rivera\'s response help develop the theme? Quote her words.', min: 16, quote: true, need: [{ words: ['courage', 'truth', 'honest'], label: 'Connects to the theme' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-explicit-implicit', std: 'g6-ela-evidence', subject: 'ela', grade: 6, code: '6.RL.2.1',
  title: 'Says vs. Suggests', model: 'reader', minutes: 20, icon: '👀',
  setup: { title: 'The Lunch Table', genre: 'Short story', img: '🍎🥪', tools: [['says', '🟨 Text SAYS directly'], ['clue', '🟦 Clue for an inference']], paragraphs: [
    "Jordan carried her tray to the corner table, the one by the trash cans where nobody ever sat. {x1|She was the new girl, and it was her third day at Sunnyside Middle School.}",
    "{i1|She took out a book and held it up close to her face, even though she didn't turn a single page.} Across the cafeteria, a group of girls laughed at something, and {i2|Jordan sank a little lower in her chair.}",
    "{x2|Then a boy named Kai sat down across from her with a tray of fish sticks.} \"Is that a good book?\" he asked. {i3|Jordan lowered it just enough for Kai to see her eyes, and she almost smiled.}"
  ] },
  place: 'Sunnyside Reading Room · Close Reading Table',
  mission: 'Readers must know the difference between what a text SAYS and what it SUGGESTS. Mark explicit facts and inference clues in "The Lunch Table," then write inferences that are backed by evidence.',
  question: 'How do we distinguish what a text says explicitly from what we infer?',
  takeaway: 'Explicit information is stated directly ("She was the new girl"). Implicit information must be inferred from clues ("She held the book up close but didn\'t turn a page," so she is hiding or feeling lonely). Strong readers cite evidence for both.',
  vocab: [['Explicit', 'Stated directly in the text.'], ['Implicit', 'Suggested by clues.'], ['Infer', 'Figure out using clues and knowledge.'], ['Body language', 'What actions show about feelings.']],
  warmup: { style: 'Says or suggests?', prompt: 'Label each: S (says) or I (infer).', items: [['"Sam is ten years old."', 'S.'], ['"Sam slammed the door and stomped upstairs."', 'I: he is angry.'], ['Why do authors let readers infer?', 'It makes readers think and feel involved.']] },
  steps: [
    { tag: 'read', title: 'Read closely', goal: { text: 'Read and press ✓ I finished reading.', check: { read: true } } },
    { tag: 'explore', title: 'Mark both kinds', sheet: 1, goal: { text: 'Mark two explicit facts (🟨) and three inference clues (🟦).', button: 'Check', check: function (s) { var a = s.hl_says || [], b = s.hl_clue || []; return a.indexOf('x1') >= 0 && a.indexOf('x2') >= 0 && b.indexOf('i1') >= 0 && b.indexOf('i2') >= 0 && b.indexOf('i3') >= 0; }, why: function () { return 'Explicit facts state information plainly. Inference clues describe ACTIONS that hint at feelings.'; } } },
    { tag: 'reason', title: 'Infer the feeling', sheet: 2, q: { type: 'mc', q: 'What can you infer from "She took out a book... even though she didn\'t turn a single page"?', choices: ['She is using the book to hide because she feels lonely or nervous', 'She is a slow reader', 'The book is boring'], answer: 0 } },
    { tag: 'reason', title: 'Sort the statements', sheet: 2, q: { type: 'sort', q: 'Is each statement stated or inferred?', bins: ['Stated explicitly', 'Inferred'], items: [['Jordan is new at the school.', 0], ['Jordan feels left out.', 1], ['Kai sits across from Jordan.', 0], ['Kai is kind and friendly.', 1], ['Jordan begins to feel hopeful.', 1]] } },
    { tag: 'write', title: 'Write an inference with evidence', sheet: 3, q: { type: 'write', q: 'How does Jordan feel at the end, and how do you know?', parts: [
      { label: 'Inference', starter: 'At the end, Jordan feels', min: 6, need: [{ words: ['hopeful', 'happier', 'less lonely', 'welcome', 'better', 'relieved', 'comfortable'], label: 'Names a feeling' }] },
      { label: 'Evidence', min: 8, quote: true },
      { label: 'Explain', starter: 'This clue suggests', min: 12, need: [{ words: ['smile', 'lower', 'eyes', 'kai'], label: 'Explains the clue' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: predict', sheet: 4, q: { type: 'text', q: 'Predict what happens next and support your prediction with an inference from the text.', min: 18, quote: true } }
  ]
});

/* ======================= Central idea & argument ======================= */
SUNNY_SIMS.push({
  id: 'g6-ela-argument-tree', std: 'g6-ela-central', subject: 'ela', grade: 6, code: '6.RN.4.1',
  title: 'Argument Tree: School Start Times', model: 'argumentTree', minutes: 25, icon: '🌳',
  setup: {
    passage: { title: 'Let Us Sleep: Why Middle School Should Start Later', genre: 'Opinion article', paragraphs: [
      "Every morning, thousands of Indiana middle schoolers drag themselves out of bed before the sun rises. {a0|Our school should push back the start time to 8:30 a.m.}",
      "{a1|First, later start times help students get the sleep their growing bodies need.} {a2|The American Academy of Pediatrics recommends that middle schoolers get 9 to 12 hours of sleep, but most get fewer than 8 on school nights.}",
      "{a3|Second, well-rested students learn better.} {a4|When a district in Minnesota moved its start time later, researchers found that attendance and grades improved.}",
      "{a5|Everyone knows that teenagers are lazy anyway.} {a6|Some parents worry about after-school sports ending later, but schools can adjust practice times.} Starting later is a simple change that could help every student."
    ] },
    cards: [['Our school should push back the start time to 8:30 a.m.', 'claim'], ['Later start times help students get the sleep they need.', 'r1'], ['Well-rested students learn better.', 'r2'], ['Doctors recommend 9–12 hours, but most students get fewer than 8.', 'e1'], ['A Minnesota district saw attendance and grades improve.', 'e2'], ['Everyone knows teenagers are lazy anyway.', 'x']]
  },
  place: 'Sunnyside Reading Room · Debate Club',
  mission: 'The student council is voting on a later school start. Map the author\'s argument, from claim to reasons to evidence, and find the claim that is NOT supported. Then evaluate whether the argument is convincing.',
  question: 'How do we trace an argument and tell supported claims from unsupported ones?',
  takeaway: 'An argument has a claim (the main position), reasons (why), and evidence (facts, data, examples that prove each reason). A claim without evidence, like "everyone knows teenagers are lazy," is unsupported and weakens the argument.',
  vocab: [['Claim', 'The author\'s main argument or position.'], ['Reason', 'A point that explains why the claim is true.'], ['Evidence', 'Facts, data, or examples that support a reason.'], ['Unsupported claim', 'A statement with no evidence.'], ['Counterclaim', 'An opposing view the author addresses.']],
  warmup: { style: 'Claim, reason, or evidence?', prompt: 'Label each: C, R, or E.', items: [['"Our town needs a skate park."', 'C.'], ['"It gives kids a safe place to play."', 'R.'], ['"Injuries dropped 40% in towns that built one."', 'E.']] },
  steps: [
    { tag: 'read', title: 'Read the op-ed', goal: { text: 'Read the article.', check: { read: true } }, q: { type: 'mc', q: 'What is the author\'s CLAIM?', choices: ['The school should start at 8:30 a.m.', 'Teenagers are lazy', 'Sports should end earlier', 'Minnesota has good schools'], answer: 0 } },
    { tag: 'test', title: 'Build the tree', sheet: 1, goal: { text: 'Place every card in the argument tree.', check: { allRight: true } } },
    { tag: 'reason', title: 'Spot the unsupported claim', sheet: 2, q: { type: 'mc', q: 'Why is "Everyone knows teenagers are lazy anyway" an unsupported claim?', choices: ['It gives no evidence and is an overgeneralization', 'It is a fact', 'It is the main claim'], answer: 0 } },
    { tag: 'reason', title: 'Counterclaim', sheet: 3, q: { type: 'mc', q: 'Which sentence addresses a COUNTERCLAIM (an opposing view)?', choices: ['Some parents worry about sports ending later, but schools can adjust practice times.', 'Well-rested students learn better.', 'Our school should push back the start time.'], answer: 0 } },
    { tag: 'write', title: 'Evaluate the argument', sheet: 4, q: { type: 'write', q: 'Is the argument convincing? Evaluate it.', parts: [
      { label: 'Judgment', starter: 'The argument is', min: 8, need: [{ words: ['convincing', 'strong', 'weak', 'mostly', 'partly'], label: 'Gives a judgment' }] },
      { label: 'Strength', starter: 'Its strongest support is', min: 12, need: [{ words: ['pediatrics', 'minnesota', 'hours', 'grades', 'attendance', 'evidence', 'data'], label: 'Names specific evidence' }] },
      { label: 'Weakness', starter: 'However, the author weakens the argument by', min: 12, need: [{ words: ['lazy', 'unsupported', 'no evidence', 'everyone knows'], label: 'Identifies the unsupported claim' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: improve it', sheet: 5, q: { type: 'text', q: 'Rewrite the unsupported sentence as a reason WITH evidence (you may invent a realistic statistic and cite it as a study).', min: 18, number: true, need: [{ words: ['study', 'research', 'survey', 'data', 'percent', '%'], label: 'Includes evidence' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-central-idea', std: 'g6-ela-central', subject: 'ela', grade: 6, code: '6.RN.2.2',
  title: 'Central Idea Builder: City Trees', model: 'organizer', minutes: 25, icon: '🌳',
  setup: {
    passage: { title: 'Why Cities Are Planting Trees', genre: 'Informational article', paragraphs: [
      "In cities across the country, crews are digging holes in sidewalks and parking lots. They are not fixing pipes; they are planting trees. Cities from Indianapolis to Los Angeles have promised to plant thousands of new trees in the next ten years.",
      "One reason is heat. {k1|On a summer afternoon, a street with no trees can be more than 10 degrees hotter than a shady street nearby.} {k2|Trees cool the air by giving off water vapor and blocking sunlight from hitting pavement.}",
      "Trees also clean the air. {k3|Their leaves trap dust and absorb pollution from cars and factories.} Some neighborhoods near highways have high rates of asthma, and city planners hope trees can help.",
      "Finally, trees are good for people's minds. {k4|Studies show that people who live near green spaces report feeling less stressed.} {k5|Tree-lined streets also encourage neighbors to walk, talk, and spend time outside together.} Some people complain about leaves in their gutters in the fall.",
      "Planting a tree takes only an afternoon, but its benefits can last for a hundred years."
    ] },
    ideas: ['Trees make cities cooler and cleaner.', 'Trees make people healthier and happier.'],
    details: [['Tree-less streets can be 10 degrees hotter.', 0], ['Leaves trap dust and absorb pollution.', 0], ['Trees give off water vapor and block sun.', 0], ['People near green spaces feel less stressed.', 1], ['Tree-lined streets bring neighbors together.', 1], ['Some people complain about leaves in gutters.', -1], ['Crews dig holes in parking lots.', -1]]
  },
  place: 'Sunnyside Reading Room · City Desk',
  mission: 'The city council needs a one-sentence central idea for its tree-planting brochure, plus an objective summary. Sort the key details, find how they build the central idea, and write both.',
  question: 'How is a central idea conveyed through details, and how do we summarize objectively?',
  takeaway: 'The central idea is the most important point of the whole text. Authors build it through supporting ideas and details. An objective summary states the central idea and key supporting points without opinions or minor details.',
  vocab: [['Central idea', 'The main point of the whole text.'], ['Objective', 'Without personal opinions.'], ['Supporting idea', 'A big point that helps prove the central idea.'], ['Convey', 'Communicate or express.']],
  warmup: { style: 'Objective or not?', prompt: 'Is each sentence objective?', items: [['"The article explains that trees cool cities."', 'Objective.'], ['"This awesome article made me love trees."', 'Not objective (opinion).'], ['What should a summary leave out?', 'Opinions and minor details.']] },
  steps: [
    { tag: 'read', title: 'Read the article', goal: { text: 'Read "Why Cities Are Planting Trees."', check: { read: true } } },
    { tag: 'explore', title: 'Mark key details', sheet: 1, goal: { text: 'Mark at least 4 key detail sentences.', check: { nKeys: { gte: 4 } } } },
    { tag: 'test', title: 'Sort the details', sheet: 2, goal: { text: 'Sort each detail under its supporting idea (or the trash).', check: { allRight: true } } },
    { tag: 'reason', title: 'Central idea', sheet: 3, q: { type: 'mc', q: 'Which sentence best states the CENTRAL idea of the whole article?', choices: ['Cities are planting trees because trees cool and clean cities and improve people\'s well-being.', 'Streets without trees are hot.', 'Leaves clog gutters.', 'Los Angeles is planting trees.'], answer: 0 } },
    { tag: 'write', title: 'Write the central idea', sheet: 4, q: { type: 'text', q: 'Write the central idea in your own words (one sentence) that includes both supporting ideas.', rows: 2, min: 14, need: [{ words: ['tree'], label: 'Names trees' }, { words: ['cool', 'clean', 'air', 'heat'], label: 'Environmental benefit' }, { words: ['people', 'health', 'stress', 'happier', 'neighbors'], label: 'People benefit' }] } },
    { tag: 'write', title: 'Objective summary', sheet: 5, q: { type: 'text', q: 'Write an objective summary (40–70 words).', rows: 4, min: 40, max: 70, need: [{ words: ['tree'], label: 'Central idea' }, { words: ['cool', 'heat', 'degrees'], label: 'Cooling' }, { words: ['pollution', 'air', 'clean'], label: 'Clean air' }, { words: ['stress', 'neighbors', 'people'], label: 'People' }], avoid: [['I think', 'No opinions'], ['awesome', 'No opinion words'], ['gutter', 'No minor details']] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: last sentence', sheet: 6, q: { type: 'mc', q: 'How does the final sentence help convey the central idea?', choices: ['It sums up that the benefits of trees are long-lasting', 'It introduces a new topic', 'It gives a statistic'], answer: 0 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-debate-judge', std: 'g6-ela-central', subject: 'ela', grade: 6, code: '6.RN.4.1',
  title: 'Debate Judge', model: 'debateJudge', minutes: 25, icon: '🎤',
  setup: {
    topic: 'Should Sunnyside Middle School ban cell phones during the school day?',
    criteria: ['Clear claim', 'Reasons that explain the claim', 'Evidence (facts, data, examples)', 'Responds to the other side'],
    speeches: [
      { name: 'Speaker A: Ban phones', paragraphs: ['I believe our school should ban cell phones during the school day. First, phones distract students from learning. A 2023 survey of teachers found that 72 percent said phones were a major distraction in class.', 'Second, a ban could improve how students treat each other. Schools in England that banned phones saw a drop in cyberbullying reports. Some students say they need phones for emergencies, but the front office has a phone, and parents can always call the school.'] },
      { name: 'Speaker B: Keep phones', paragraphs: ['Banning phones is the worst idea ever. Phones are awesome and everybody loves them. Kids have had phones forever, so why stop now?', 'Also, if teachers are boring, that\'s not our fault. My cousin\'s school has phones and it\'s totally fine. We should keep our phones because we want to.'] }
    ],
    key: [[2, 2, 2, 2], [1, 0, 0, 0]], winner: 0
  },
  place: 'Sunnyside Reading Room · Debate Hall',
  mission: 'You are the judge at the Sunnyside debate. Read both speeches, score each one on claims, reasons, evidence, and counterclaims, and declare the winner based on which argument is better SUPPORTED, not which side you agree with.',
  question: 'How do we evaluate whether an argument is supported by reasons and evidence?',
  takeaway: 'A strong argument has a clear claim, reasons that explain it, specific evidence (data, studies, examples), and a response to the other side. Opinions, exaggerations ("worst idea ever"), and single personal stories are weak support. Judge the support, not your own opinion.',
  vocab: [['Evaluate', 'Judge how strong or good something is.'], ['Evidence', 'Facts, statistics, expert findings, examples.'], ['Anecdote', 'A short personal story; weak on its own as evidence.'], ['Counterclaim', 'The opposing side\'s argument.']],
  warmup: { style: 'Rate the reason', prompt: 'Rate each reason strong or weak.', items: [['"Recess should be longer because studies show exercise improves focus."', 'Strong (evidence).'], ['"Recess should be longer because it\'s fun."', 'Weak (opinion).'], ['Can you agree with a side but admit its argument is weak?', 'Yes!']] },
  steps: [
    { tag: 'read', title: 'Read both speeches', goal: { text: 'Read both speeches (use the tabs).', check: { readAll: true } } },
    { tag: 'test', title: 'Score the speeches', sheet: 1, goal: { text: 'Score both speeches on all four criteria and pick a winner.', check: { scored: true } } },
    { tag: 'test', title: 'Fair judging', sheet: 2, goal: { text: 'Make sure your scores are fair: each score within 1 point of an expert judge\'s.', button: 'Compare with the expert', check: { fair: true }, why: function () { return 'Look again: does Speaker B give ANY data or facts? Does Speaker A answer the other side?'; } },
      q: { type: 'mc', q: 'Who wins, based on SUPPORT?', choices: ['Speaker A', 'Speaker B'], answer: 0 } },
    { tag: 'reason', title: 'Name the weakness', sheet: 3, q: { type: 'multi', q: 'What weakens Speaker B\'s argument? Choose all.', choices: ['Exaggeration ("worst idea ever")', 'Relying on one anecdote (a cousin\'s school)', 'No statistics or research', 'Too many statistics'], answer: [0, 1, 2] } },
    { tag: 'write', title: 'Judge\'s decision', sheet: 4, q: { type: 'write', q: 'Write your judge\'s decision.', parts: [
      { label: 'Decision', starter: 'The winner is', min: 6, need: [{ words: ['speaker a', 'a'], label: 'Names the winner' }] },
      { label: 'Evidence from the speech', min: 12, quote: true, need: [{ words: ['72', 'percent', 'survey', 'england', 'cyberbullying'], label: 'Cites specific evidence' }] },
      { label: 'Why the other lost', starter: 'Speaker B\'s argument was weaker because', min: 12, need: [{ words: ['opinion', 'evidence', 'exaggerat', 'cousin', 'anecdote', 'facts'], label: 'Explains the weakness' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: coach Speaker B', sheet: 5, q: { type: 'text', q: 'Write one strong reason WITH evidence that Speaker B could have used to argue for keeping phones.', min: 18, need: [{ words: ['because', 'reason'], label: 'Gives a reason' }, { words: ['study', 'survey', 'research', 'percent', 'example', 'data'], label: 'Includes evidence' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-claim-checker', std: 'g6-ela-central', subject: 'ela', grade: 6, code: '6.RN.4.1',
  title: 'Claim Checker: Video Games & Learning', model: 'evidenceMeter', minutes: 20, icon: '🎮',
  setup: {
    claim: 'Some video games can help students learn.',
    cards: [
      ['A 2020 study found students who played a math puzzle game for 20 minutes a day improved their test scores by 12%.', 0, 'A study with data directly supports the claim.'],
      ['Teachers at Sunnyside used a history simulation game and students\' quiz scores rose.', 0, 'A specific example with results is strong support.'],
      ['My brother plays video games and he is smart.', 1, 'A single personal story is weak evidence.'],
      ['Video games are really popular.', 2, 'Popularity says nothing about learning.'],
      ['Video games have colorful graphics.', 2, 'Graphics aren\'t evidence of learning.'],
      ['Many gamers say games make them think fast.', 1, 'Opinions from players are weaker than measured results.']
    ]
  },
  place: 'Sunnyside Reading Room · Fact-Check Desk',
  mission: 'Online, people make claims all the time. As a fact-checker, test six pieces of "evidence" for the claim that some video games help students learn. Which would convince a skeptical principal?',
  question: 'How do we tell well-supported claims from weakly supported ones?',
  takeaway: 'The strongest support uses research, data, and specific examples with results. Personal stories (anecdotes) and opinions are weak. Popularity or unrelated facts do not support a claim at all.',
  vocab: [['Data', 'Numbers and measurements collected in research.'], ['Anecdote', 'A personal story.'], ['Skeptical', 'Doubtful; needs proof.'], ['Credible', 'Believable and trustworthy.']],
  warmup: { style: 'Convince the principal', prompt: 'Which would convince a principal more? Why?', items: [['"Everyone says it works" or "A study found a 12% increase"?', 'The study.'], ['Is "My friend said so" strong evidence?', 'No.'], ['What makes a source credible?', 'Experts, research, clear data.']] },
  steps: [
    { tag: 'test', title: 'Check the evidence', sheet: 1, goal: { text: 'Place every card on the meter correctly.', check: { allRight: true } } },
    { tag: 'reason', title: 'Anecdotes', sheet: 2, q: { type: 'mc', q: 'Why is "My brother plays video games and he is smart" weak?', choices: ['It is one person\'s story and doesn\'t prove games caused it', 'It is a lie', 'It is too long'], answer: 0 } },
    { tag: 'write', title: 'Fact-check report', sheet: 3, q: { type: 'write', q: 'Write a fact-check report on the claim.', parts: [
      { label: 'Verdict', starter: 'The claim is', min: 6, need: [{ words: ['supported', 'true', 'well supported', 'partly'], label: 'Gives a verdict' }] },
      { label: 'Best evidence', min: 12, number: true, need: [{ words: ['study', 'test', 'scores', 'quiz', '%', 'percent'], label: 'Uses strong evidence' }] },
      { label: 'What to ignore', starter: 'Readers should ignore evidence like', min: 10, need: [{ words: ['popular', 'graphics', 'brother', 'anecdote', 'opinion'], label: 'Names weak or irrelevant evidence' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: limits', sheet: 4, q: { type: 'text', q: 'Even strong evidence has limits. What question would you ask about the 2020 study before trusting it completely?', min: 12, need: [{ words: ['how many', 'who', 'which', 'long', 'sample', 'paid', 'repeated'], label: 'Asks a good research question' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-tiny-houses', std: 'g6-ela-central', subject: 'ela', grade: 6, code: '6.RN.2.2 · 6.RN.4.1',
  title: 'Two Sides: Tiny Houses', model: 'twoTexts', minutes: 25, icon: '🏠',
  setup: {
    a: { title: 'The Case for Tiny Homes', genre: 'Opinion article', paragraphs: ['A tiny house is usually under 400 square feet, about the size of a big classroom. Supporters say tiny homes cost far less to build and heat. The average tiny house costs around $50,000, compared to more than $300,000 for a typical home.', 'Tiny homes also use less energy and fewer materials, which is better for the environment. Many owners say that living with less stuff helps them focus on experiences instead of things.'] },
    b: { title: 'Tiny Homes, Big Problems', genre: 'Opinion article', paragraphs: ['Tiny houses look charming online, but they aren\'t right for everyone. A tiny house is usually under 400 square feet, and families with kids often run out of room quickly.', 'Many towns have rules that don\'t allow tiny houses on regular lots, so owners struggle to find a legal place to park them. Tiny homes can also be hard to sell later, since fewer buyers are looking for them.'] },
    facts: [['Tiny houses are usually under 400 square feet.', 1], ['They cost much less than a typical home.', 0], ['They use less energy.', 0], ['Families can run out of room.', 2], ['Towns may have rules against them.', 2], ['They can be hard to sell.', 2], ['Owners focus on experiences, not things.', 0]]
  },
  place: 'Sunnyside Reading Room · Opinion Page',
  mission: 'The school newspaper printed two opinion articles about tiny houses. Compare the claims and evidence in each, sort their points, and decide which argument is better supported.',
  question: 'How do authors on different sides use evidence to support their central ideas?',
  takeaway: 'Two authors can share facts but reach different central ideas. Comparing their evidence side by side shows which claims are supported with specifics (costs, data) and which rely on general statements.',
  vocab: [['Perspective', 'A point of view on a topic.'], ['Central idea', 'The main point of a text.'], ['Supported', 'Backed by evidence.'], ['Bias', 'Leaning toward one side.']],
  warmup: { style: 'Pros and cons', prompt: 'List one pro and one con.', items: [['Having a big backyard', 'Pro: space to play; con: more mowing.'], ['Can two people use the same fact for opposite arguments?', 'Yes.'], ['What makes an opinion article convincing?', 'Clear claims supported by evidence.']] },
  steps: [
    { tag: 'read', title: 'Read both sides', goal: { text: 'Read both articles.', check: { read_a: true, read_b: true } }, q: { type: 'mc', q: 'What fact do BOTH articles include?', choices: ['Tiny houses are usually under 400 square feet', 'Tiny houses cost $50,000', 'Towns ban tiny houses'], answer: 0 } },
    { tag: 'test', title: 'Sort the points', sheet: 1, goal: { text: 'Sort every fact into the Venn diagram.', check: { allRight: true } } },
    { tag: 'reason', title: 'Central ideas', sheet: 2, q: { type: 'mc', q: 'What are the two central ideas?', choices: ['A: tiny homes save money and resources. B: tiny homes have practical problems.', 'Both say tiny homes are perfect.', 'A: families need big homes. B: tiny homes are cheap.'], answer: 0 } },
    { tag: 'write', title: 'Which is better supported?', sheet: 3, q: { type: 'write', q: 'Which article better supports its central idea? Compare their evidence.', parts: [
      { label: 'Claim', starter: 'The article that is better supported is', min: 8, need: [{ words: ['case for', 'big problems', 'first', 'second', 'a', 'b'], label: 'Names an article' }] },
      { label: 'Evidence', min: 12, quote: true },
      { label: 'Comparison', starter: 'In contrast, the other article', min: 14, need: [{ words: ['evidence', 'data', 'numbers', 'specific', 'examples', 'general'], label: 'Compares the quality of evidence' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: your own view', sheet: 4, q: { type: 'text', q: 'Would a tiny house work for YOUR family? Use one point from each article.', min: 25, need: [{ words: ['cost', 'energy', 'money', 'experiences'], label: 'Uses a point from A' }, { words: ['room', 'space', 'rules', 'sell'], label: 'Uses a point from B' }] } }
  ]
});

/* ======================= Word meaning, connotation & figurative language ======================= */
SUNNY_SIMS.push({
  id: 'g6-ela-connotation', std: 'g6-ela-vocab', subject: 'ela', grade: 6, code: '6.RV.3.3',
  title: 'Connotation Spectrum', model: 'connotation', minutes: 20, icon: '🌈',
  setup: { sets: [
    { context: 'Describing someone who saves money', words: [['thrifty', 1], ['frugal', 0], ['cheap', -1], ['stingy', -1], ['economical', 1]] },
    { context: 'Describing someone who is very confident', words: [['self-assured', 1], ['confident', 1], ['bold', 0], ['arrogant', -1], ['cocky', -1]] },
    { context: 'Describing a small house', words: [['cozy', 1], ['compact', 0], ['small', 0], ['cramped', -1], ['tiny', 0]] }
  ] },
  place: 'Sunnyside Reading Room · Word Choice Studio',
  mission: 'Writers choose words carefully because words carry feelings. These words have similar dictionary meanings but different emotional charges. Place each one on the spectrum and discover how word choice shapes meaning.',
  question: 'How does connotation affect the meaning and tone of words?',
  takeaway: 'Denotation is a word\'s dictionary meaning; connotation is the feeling it carries. "Thrifty" and "stingy" both describe saving money, but "thrifty" sounds positive and "stingy" sounds negative. Choosing words by connotation lets writers shape how readers feel.',
  vocab: [['Denotation', 'The dictionary definition of a word.'], ['Connotation', 'The feeling or idea a word suggests.'], ['Tone', 'The author\'s attitude toward the subject.'], ['Word choice', 'The specific words an author picks (diction).']],
  warmup: { style: 'Which would you rather be called?', prompt: 'Choose and explain.', items: [['"Curious" or "nosy"?', 'Curious (positive connotation).'], ['"Relaxed" or "lazy"?', 'Relaxed.'], ['Do these pairs mean nearly the same thing?', 'Yes, but they feel different.']] },
  steps: [
    { tag: 'explore', title: 'Set 1: saving money', sheet: 1, goal: { text: 'Place all words in Set 1 correctly.', check: { set_0: true } }, q: { type: 'mc', q: 'Why is "stingy" negative while "thrifty" is positive?', choices: ['Stingy suggests being unfairly unwilling to share; thrifty suggests being smart with money', 'Stingy means spending more', 'They mean opposite things'], answer: 0 } },
    { tag: 'test', title: 'All sets', sheet: 2, goal: { text: 'Place the words in all three sets.', check: { allRight: true } } },
    { tag: 'reason', title: 'Author\'s choice', sheet: 3, q: { type: 'mc', q: 'A real estate ad calls a tiny apartment "cozy." Why?', choices: ['"Cozy" has a positive connotation that makes small sound appealing', 'Cozy means large', 'It is a mistake'], answer: 0 } },
    { tag: 'write', title: 'Change the tone', sheet: 4, q: { type: 'write', q: 'Rewrite the sentence two ways: "My neighbor is careful with money and has a small house."', parts: [
      { label: 'Positive version', min: 8, need: [{ words: ['thrifty', 'economical', 'cozy', 'wise', 'smart'], label: 'Uses positive words' }] },
      { label: 'Negative version', min: 8, need: [{ words: ['stingy', 'cheap', 'cramped', 'tight'], label: 'Uses negative words' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: explain the effect', sheet: 5, q: { type: 'text', q: 'Explain how changing ONE word can change a reader\'s opinion of a character. Use an example.', min: 18, need: [{ words: ['connotation', 'feel', 'feeling', 'positive', 'negative'], label: 'Uses connotation' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-tone-mixer', std: 'g6-ela-vocab', subject: 'ela', grade: 6, code: '6.RV.3.3',
  title: 'Tone Mixer', model: 'toneMixer', minutes: 15, icon: '🎛️',
  setup: {
    text: 'The new cafeteria menu arrived on Monday. The pizza was {0}, the salad bar looked {1}, and the line moved {2}. Students {3} about the changes all afternoon.',
    slots: [['greasy and soggy', 'warm', 'golden and delicious'], ['wilted', 'ready', 'fresh and colorful'], ['at a painful crawl', 'steadily', 'quickly and smoothly'], ['grumbled', 'talked', 'raved']],
    missions: [['positive', 1], ['negative', -1], ['neutral', 0]]
  },
  place: 'Sunnyside Reading Room · Tone Studio',
  mission: 'The same event can sound wonderful or awful depending on word choice. Use the Tone Mixer to rewrite a news paragraph for three different tones, and watch the tone meter respond.',
  question: 'How does an author\'s word choice create tone?',
  takeaway: 'Tone is the author\'s attitude, created mostly through word choice. Positive words ("golden," "raved") create an enthusiastic tone; negative words ("soggy," "grumbled") create a critical tone; neutral words ("warm," "talked") create an objective tone.',
  vocab: [['Tone', 'The author\'s attitude toward a subject.'], ['Objective', 'Neutral; not showing feelings.'], ['Critical', 'Showing disapproval.'], ['Enthusiastic', 'Showing excitement.']],
  warmup: { style: 'Name the tone', prompt: 'What is the tone of each sentence?', items: [['"The game was a thrilling victory!"', 'Enthusiastic.'], ['"The game ended 3–2."', 'Neutral.'], ['"The game was a painful disaster."', 'Critical / negative.']] },
  steps: [
    { tag: 'explore', title: 'Mission 1: positive', sheet: 1, goal: { text: 'Mix the paragraph to sound fully POSITIVE.', check: { m_0: true } }, q: { type: 'mc', q: 'Which word choice did the most to make it positive?', choices: ['"raved"', '"arrived"', '"Monday"'], answer: 0 } },
    { tag: 'test', title: 'Mission 2: negative', sheet: 2, goal: { text: 'Mix it to sound fully NEGATIVE (use Next mission).', check: { m_1: true } } },
    { tag: 'test', title: 'Mission 3: neutral', sheet: 3, goal: { text: 'Mix it to sound NEUTRAL (objective).', check: { m_2: true } }, q: { type: 'mc', q: 'When would a writer want a neutral tone?', choices: ['In a news report that just gives facts', 'In a birthday card', 'In an angry complaint'], answer: 0 } },
    { tag: 'write', title: 'Write with tone', sheet: 4, q: { type: 'text', q: 'Write 2–3 sentences about a rainy day with a clearly POSITIVE tone. Then name two words that create the tone.', rows: 4, min: 20, need: [{ words: ['cozy', 'fresh', 'sparkl', 'happy', 'peaceful', 'love', 'wonderful', 'splash', 'bright', 'gentle'], label: 'Uses positive word choice' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: mixed tone', sheet: 5, q: { type: 'text', q: 'Write a sentence with a MIXED tone (both positive and negative) about a school field trip. Explain which words create each feeling.', min: 20, need: [{ words: ['but', 'although', 'however', 'yet'], label: 'Shows a contrast' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-word-forge', std: 'g6-ela-vocab', subject: 'ela', grade: 6, code: '6.RV.2.1',
  title: 'Greek & Latin Word Forge 6', model: 'wordLab', minutes: 20, icon: '🔨',
  setup: {
    prefixes: [['auto', 'self'], ['micro', 'small'], ['tele', 'far'], ['photo', 'light']],
    roots: [['bio', 'life'], ['geo', 'earth'], ['thermo', 'heat'], ['chrono', 'time'], ['phono', 'sound']],
    suffixes: [['logy', 'study of'], ['meter', 'measuring tool'], ['scope', 'tool for seeing'], ['graph', 'something written or drawn'], ['graphy', 'writing about']],
    words: { 'bio+logy': 'the study of life', 'geo+logy': 'the study of the earth and rocks', 'thermo+meter': 'a tool that measures heat', 'chrono+logy': 'the order of events in time', 'chrono+meter': 'a very accurate clock', 'micro+scope': 'a tool for seeing tiny things', 'tele+scope': 'a tool for seeing far away', 'auto+bio+graphy': 'writing about your own life', 'bio+graphy': 'writing about someone\'s life', 'geo+graphy': 'writing about or studying the earth\'s places', 'phono+graph': 'a machine that records sound', 'photo+graph': 'a picture made with light', 'auto+graph': 'your own signature' },
    targets: [['the study of life', 'bio+logy'], ['a tool that measures heat', 'thermo+meter'], ['writing about your own life', 'auto+bio+graphy'], ['a tool for seeing tiny things', 'micro+scope'], ['the order of events in time', 'chrono+logy']]
  },
  place: 'Sunnyside Reading Room · Word Forge',
  mission: 'Science and social studies are full of Greek word parts. Forge the words scientists use every day, then use word parts to decode words you have never seen before.',
  question: 'How can Greek and Latin word parts help us determine the meanings of academic words?',
  takeaway: 'Many academic words combine Greek parts: bio (life) + logy (study of) = biology. Once you know a part, it unlocks a whole family of words (biology, biography, autobiography). This is one of the fastest ways to grow your vocabulary.',
  vocab: [['Affix', 'A prefix or suffix.'], ['Root', 'The core meaning part of a word.'], ['Academic vocabulary', 'Words used in school subjects.'], ['Word family', 'Words that share a root.']],
  warmup: { style: 'Decode it', prompt: 'Use the parts to guess the meaning.', items: [['geology (geo = earth, logy = study of)', 'Study of the earth.'], ['telephone (tele = far, phone = sound)', 'Sound from far away.'], ['autograph (auto = self, graph = written)', 'Your own signature.']] },
  steps: [
    { tag: 'explore', title: 'First order', goal: { text: 'Forge the word for "the study of life."', check: { target_0: true } } },
    { tag: 'test', title: 'All orders', sheet: 1, goal: { text: 'Forge all five target words.', check: { target_1: true, target_2: true, target_3: true, target_4: true } },
      q: { type: 'table', q: 'Record each word.', rowHead: 'Meaning', cols: [{ label: 'Word', value: function (s, r) { return r.w; } }], rows: [{ label: 'a tool that measures heat', w: 'thermometer' }, { label: 'writing about your own life', w: 'autobiography' }, { label: 'the order of events in time', w: 'chronology' }] } },
    { tag: 'explore', title: 'Word families', sheet: 2, goal: { text: 'Forge at least 9 real words.', check: { forged: { gte: 9 } } } },
    { tag: 'reason', title: 'Decode new words', sheet: 3, q: { type: 'mc', q: 'Using word parts, what is a "hydrometer" (hydro = water)?', choices: ['A tool that measures water', 'The study of water', 'A picture of water'], answer: 0 } },
    { tag: 'reason', title: 'Across subjects', sheet: 3, q: { type: 'sort', q: 'Which subject would you most likely read each word in?', bins: ['Science', 'Social studies / ELA'], items: [['thermometer', 0], ['biography', 1], ['microscope', 0], ['chronology', 1], ['geology', 0]] } },
    { tag: 'write', title: 'Teach a word family', sheet: 4, q: { type: 'text', q: 'Choose a root (bio, geo, chrono, or thermo). List three words with it and explain how the root connects their meanings.', rows: 3, min: 20, need: [{ words: ['bio', 'geo', 'chrono', 'thermo'], label: 'Names the root' }, { words: ['means', 'mean', 'meaning', 'all'], label: 'Explains the connection' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: invent a word', sheet: 5, q: { type: 'text', q: 'Invent a word from these parts for something new (like "phonoscope") and define it. Explain your reasoning.', min: 14, need: [{ words: ['means', 'because'], label: 'Defines and explains' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-city-poem', std: 'g6-ela-vocab', subject: 'ela', grade: 6, code: '6.RV.3.3',
  title: 'Figurative Language: City at Night', model: 'figTranslator', minutes: 20, icon: '🌃',
  setup: { title: 'City at Night', by: 'A Sunnyside original poem', lines: [
    { id: 'g1', t: 'The city is a restless giant', type: 'metaphor' }, 'that never shuts its eyes.',
    { id: 'g2', t: 'Its traffic lights blink like sleepy fireflies', type: 'simile' }, 'beneath the purple skies.', '',
    { id: 'g3', t: 'The skyscrapers shoulder their way to the clouds,', type: 'personification' }, 'proud of every floor,',
    { id: 'g4', t: 'and the subway roars ten thousand times louder', type: 'hyperbole' }, 'than thunder ever could before.', '',
    { id: 'g5', t: 'I\'m on cloud nine when the bakery opens', type: 'idiom' }, 'and warm bread fills the air;', 'the giant sighs, the night grows soft,', 'and I stop to breathe it there.'
  ] },
  place: 'Sunnyside Reading Room · Poetry Slam Stage',
  mission: 'The poetry slam judges want to know how "City at Night" creates its mood. Identify each type of figurative language, explain what it means, and analyze how it affects tone.',
  question: 'How does figurative language shape meaning and tone in a poem?',
  takeaway: 'Figurative language creates images and feelings. Calling the city "a restless giant" (metaphor) and saying skyscrapers "shoulder their way" (personification) make the city seem alive and powerful; the soft ending shifts the tone to calm and peaceful.',
  vocab: [['Mood', 'The feeling a reader gets from a text.'], ['Tone', 'The author\'s attitude.'], ['Imagery', 'Language that appeals to the senses.'], ['Extended metaphor', 'A comparison carried through several lines.']],
  warmup: { style: 'Picture it', prompt: 'Describe what you picture.', items: [['"The wind howled."', 'A loud, wild wind (personification).'], ['"My room is a disaster zone."', 'A very messy room (metaphor).'], ['"I\'m so hungry I could eat a horse."', 'Extremely hungry (hyperbole).']] },
  steps: [
    { tag: 'read', title: 'Tag the poem', sheet: 1, goal: { text: 'Tag all five figurative lines correctly.', check: { allRight: true } } },
    { tag: 'reason', title: 'Extended metaphor', sheet: 2, q: { type: 'mc', q: 'The "giant" appears at the beginning and end of the poem. What is this?', choices: ['An extended metaphor comparing the city to a living giant', 'A simile', 'A character in a story'], answer: 0 } },
    { tag: 'write', title: 'Interpret', sheet: 3, q: { type: 'write', q: 'Interpret two lines.', parts: [
      { label: '"The skyscrapers shoulder their way to the clouds"', min: 10, need: [{ words: ['tall', 'push', 'crowd', 'reach', 'high'], label: 'Explains the image' }] },
      { label: '"I\'m on cloud nine"', min: 6, need: [{ words: ['happy', 'joy', 'excited', 'glad'], label: 'Explains the idiom' }] }] } },
    { tag: 'reason', title: 'Tone shift', sheet: 4, q: { type: 'mc', q: 'How does the tone shift at the end of the poem?', choices: ['From loud and busy to calm and peaceful', 'From happy to angry', 'It doesn\'t change'], answer: 0 } },
    { tag: 'write', title: 'Analyze the effect (CER)', sheet: 5, q: { type: 'write', q: 'How does figurative language create the tone of "City at Night"?', parts: [
      { label: 'Claim', starter: 'The poet uses figurative language to create a tone that', min: 10, need: [{ words: ['alive', 'busy', 'powerful', 'calm', 'peaceful', 'energetic', 'shift'], label: 'Describes the tone' }] },
      { label: 'Evidence', min: 8, quote: true, quotes: 2 },
      { label: 'Reasoning', starter: 'These comparisons make the city seem', min: 14, need: [{ words: ['alive', 'living', 'giant', 'human', 'feel'], label: 'Explains the effect' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: your stanza', sheet: 6, q: { type: 'text', q: 'Write a 4-line stanza about Sunnyside at sunrise that continues the giant metaphor.', min: 20, need: [{ words: ['giant'], label: 'Continues the metaphor' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g6-ela-two-reviews', std: 'g6-ela-vocab', subject: 'ela', grade: 6, code: '6.RV.3.3',
  title: 'Word Choice Detective: Two Reviews', model: 'reader', minutes: 20, icon: '🍕',
  setup: { title: 'Two Reviews of Pizza Palace', genre: 'Reviews', img: '🍕⭐', tools: [['pos', '🟩 Positive word choice'], ['neg', '🟨 Negative word choice']], paragraphs: [
    "Review 1 (★★★★★): {r1|Pizza Palace is a hidden gem!} The crust is {r2|golden and crispy}, and the cheese stretches for miles. {r3|The cozy dining room buzzes with friendly chatter.} We waited 20 minutes for our table, and it was absolutely worth it.",
    "Review 2 (★☆☆☆☆): {r4|Pizza Palace is a cramped, noisy disappointment.} The crust was {r5|burnt and brittle}, and the cheese was greasy. {r6|We were forced to wait 20 endless minutes} while the staff ignored us."
  ] },
  place: 'Sunnyside Reading Room · Review Desk',
  mission: 'Two customers reviewed the same pizza restaurant on the same night, but you\'d never know it! Highlight the loaded words in each review and explain how word choice creates each writer\'s tone.',
  question: 'How does word choice reveal an author\'s tone and point of view?',
  takeaway: 'Writers reveal their attitude through connotation. The same 20-minute wait is "absolutely worth it" in one review and "20 endless minutes" in the other. Paying attention to loaded words helps readers notice point of view and bias.',
  vocab: [['Loaded words', 'Words with strong positive or negative connotations.'], ['Point of view', 'The writer\'s perspective or opinion.'], ['Bias', 'A one-sided attitude.'], ['Tone', 'The writer\'s attitude toward the subject.']],
  warmup: { style: 'Same fact, different feel', prompt: 'Describe the same thing two ways.', items: [['A loud party', 'Lively vs. chaotic.'], ['An old car', 'Classic vs. rusty.'], ['A small room', 'Cozy vs. cramped.']] },
  steps: [
    { tag: 'read', title: 'Read both reviews', goal: { text: 'Read and press ✓ I finished reading.', check: { read: true } } },
    { tag: 'explore', title: 'Highlight loaded words', sheet: 1, goal: { text: 'Highlight 3 positive sentences in Review 1 (🟩) and 3 negative sentences in Review 2 (🟨).', button: 'Check', check: function (s) { var p = s.hl_pos || [], n = s.hl_neg || []; return ['r1', 'r2', 'r3'].every(function (x) { return p.indexOf(x) >= 0; }) && ['r4', 'r5', 'r6'].every(function (x) { return n.indexOf(x) >= 0; }); }, why: function () { return 'Look for words that carry strong feelings (gem, cozy, cramped, endless).'; } } },
    { tag: 'reason', title: 'Same fact', sheet: 2, q: { type: 'mc', q: 'Both reviewers waited 20 minutes. How does word choice change that fact?', choices: ['"Worth it" makes the wait sound positive; "endless" makes it sound terrible', 'One waited longer', 'The fact is different in each'], answer: 0 } },
    { tag: 'write', title: 'Analyze the tone', sheet: 3, q: { type: 'write', q: 'Compare the tone of the two reviews.', parts: [
      { label: 'Review 1 tone', starter: 'Review 1 has a', min: 10, need: [{ words: ['positive', 'enthusiastic', 'excited', 'admiring'], label: 'Names the tone' }], quote: true },
      { label: 'Review 2 tone', starter: 'In contrast, Review 2 has a', min: 10, need: [{ words: ['negative', 'critical', 'disappointed', 'angry', 'annoyed'], label: 'Names the tone' }], quote: true },
      { label: 'So what?', starter: 'This shows that readers should', min: 12, need: [{ words: ['word', 'choice', 'opinion', 'careful', 'bias', 'point of view'], label: 'Draws a conclusion' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: neutral review', sheet: 4, q: { type: 'text', q: 'Write a NEUTRAL, objective review of Pizza Palace using facts only.', min: 25, need: [{ words: ['20', 'minutes', 'crust', 'cheese'], label: 'Uses facts' }], avoid: [['gem', 'Avoids positive loaded words'], ['disappointment', 'Avoids negative loaded words'], ['endless', 'Avoids "endless"']] } }
  ]
});
