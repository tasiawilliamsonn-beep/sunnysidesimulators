/*
 * Sunnyside Simulators: Grade 5 ELA simulations (Reading Room).
 * Every sim requires reading (highlighting evidence in the text) and checked writing.
 */
var SUNNY_SIMS = window.SUNNY_SIMS = window.SUNNY_SIMS || [];

var SUNNY_TEXTS = window.SUNNY_TEXTS = window.SUNNY_TEXTS || {};
SUNNY_TEXTS.lighthouse = {
  title: 'The Lighthouse Steps', genre: 'Realistic fiction', by: 'A Sunnyside original story',
  paragraphs: [
    "Nora had lived beside the Gull Point Lighthouse her whole life, but {f1|she had never climbed past the fortieth step.} Every time she tried, her knees shook and the round walls seemed to spin. \"It's all right,\" Grandpa Eli would say. \"The steps will wait for you.\"",
    "Grandpa Eli was the lighthouse keeper. Each evening he climbed all 132 steps to light the great lamp that warned ships away from the rocks. Nora usually watched from the bottom, counting his footsteps until they faded.",
    "One October night, a storm rolled in from the sea. Rain slapped the windows, and the wind howled like a hungry animal. That same afternoon, Grandpa had twisted his ankle on the dock. {g1|He sat in his chair with his foot on a pillow, his face pale.} \"The lamp,\" he whispered. \"The Mary Rose is coming in tonight.\"",
    "Nora looked at the dark doorway to the stairs. {f3|Her heart pounded so hard she could hear it in her ears.} She thought about the fishing boat and the families waiting for it on shore. {c1|She grabbed the lantern and stepped onto the first stair.}",
    "At step forty, her legs began to tremble. {c2|She gripped the cold railing, took a deep breath, and kept climbing, one step at a time.} She counted out loud to drown out the wind. Fifty. Eighty. One hundred. At last she reached the top and lit the lamp. A bright beam swept across the black water.",
    "Far below, a horn sounded. The Mary Rose turned safely away from the rocks. When Nora came back down, Grandpa Eli was smiling. {g2|\"You were scared,\" he said, \"and you climbed anyway.\"} {t1|Nora grinned. \"I guess being brave doesn't mean you're not afraid,\" she said. \"It means you don't let the fear decide for you.\"}"
  ]
};
SUNNY_TEXTS.volcano = {
  title: 'Jayden\'s Volcano', genre: 'Realistic fiction', by: 'A Sunnyside original story',
  paragraphs: [
    "Jayden had planned his science fair project for weeks. His volcano would be the biggest, messiest, most amazing volcano Sunnyside Elementary had ever seen. He built the mountain out of clay and painted it with bright orange lava streaks.",
    "On the day of the fair, a crowd gathered around his table. {j1|Jayden poured in the vinegar, and nothing happened.} A few bubbles fizzed and popped. Someone giggled. {j2|Jayden's face turned hot, and he wanted to hide under the table.}",
    "Then he remembered what Ms. Park always said: \"Scientists learn the most when things go wrong.\" {j3|Instead of giving up, Jayden took out his notebook and started asking questions.} Was the baking soda old? Did he use enough? He tested a spoonful of baking soda in a cup of vinegar. Barely a fizz. The box had gotten wet in his garage.",
    "When the judges arrived, Jayden did not talk about a volcano erupting. {j4|He explained what went wrong, how he figured it out, and what he would change next time.} The judges wrote notes and nodded.",
    "At the end of the day, Jayden did not win first place. But the judges gave him a blue ribbon that said Best Scientific Thinking. {j5|\"I thought my project failed,\" Jayden told his mom, \"but I actually learned more than if it had worked.\"}"
  ]
};
SUNNY_TEXTS.kite = {
  title: 'The Kite Contest', genre: 'Realistic fiction', by: 'A Sunnyside original story',
  paragraphs: [
    "Every spring, the town of Sunnyside held a kite contest at Miller Park. Priya wanted to win more than anything. Her little brother, Dev, wanted to help, but Priya told him he would only get in the way.",
    "Priya built a huge dragon kite with shiny red paper. She spent hours gluing scales onto its tail. The paper smelled like glue for days.",
    "On contest day, the wind was strong. Priya's dragon kite rose, spun, and then crashed into an oak tree. Its tail ripped in half, and Priya sat down in the grass with her head in her hands.",
    "Dev ran over with a roll of tape and his small blue kite. \"We can fix it together,\" he said. They taped the tail and used the string from Dev's kite to make it stronger.",
    "The patched dragon flew higher than any other kite. Priya and Dev held the string together. They won second place, and Priya gave Dev half of the ribbon. \"I couldn't have done it without you,\" she said."
  ]
};

/* ======================= Theme & summary ======================= */
SUNNY_SIMS.push({
  id: 'g5-ela-lighthouse-theme', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RL.2.2',
  title: 'Theme Detective: The Lighthouse', model: 'reader', minutes: 25, icon: '🗼',
  setup: { title: SUNNY_TEXTS.lighthouse.title, genre: SUNNY_TEXTS.lighthouse.genre, by: SUNNY_TEXTS.lighthouse.by, paragraphs: SUNNY_TEXTS.lighthouse.paragraphs, img: '🗼🌊', tools: [['fear', '🟨 Nora is afraid'], ['brave', '🟦 Nora acts bravely'], ['lesson', '🟩 Lesson clue']] },
  place: 'Sunnyside Reading Room · Mystery Shelf',
  mission: 'A theme is hidden in this story, and your job is to track it down. Follow how Nora responds to her biggest challenge, mark the clues, and write a theme statement that could teach anyone a lesson.',
  question: 'What is the theme of "The Lighthouse Steps," and how do Nora\'s choices reveal it?',
  takeaway: 'A theme is a lesson about life that the story teaches, written as a complete sentence that could apply to anyone. You find it by tracking how the main character responds to a challenge and what they learn. "Courage" is a topic; "Being brave means acting even when you are afraid" is a theme.',
  vocab: [['Theme', 'The lesson or message about life a story teaches.'], ['Topic', 'A one- or two-word subject, like "courage."'], ['Challenge', 'A problem a character must face.'], ['Evidence', 'Words from the text that support your idea.']],
  warmup: { style: 'Topic or theme?', prompt: 'Label each T (topic) or Th (theme). Fix the topics into themes.', items: [['Friendship', 'Topic → "True friends help each other in hard times."'], ['Hard work pays off.', 'Theme.'], ['Being honest', 'Topic → "Being honest is the right choice even when it is hard."']] },
  steps: [
    { tag: 'read', title: 'Read the story', goal: { text: 'Read the whole story, then press **✓ I finished reading**.', check: { read: true } },
      q: { type: 'mc', q: 'Why does Nora climb the lighthouse steps?', choices: ['Grandpa is hurt, and a ship needs the lamp to stay off the rocks', 'She wants to win a contest', 'Grandpa tells her she has to', 'She wants to see the storm'], answer: 0 } },
    { tag: 'explore', title: 'Mark Nora\'s fear', sheet: 1, goal: { text: 'Use 🟨 **Nora is afraid** to highlight TWO sentences that show Nora\'s fear.', button: 'Check my highlights', check: function (s) { var h = s.hl_fear || []; return h.indexOf('f1') >= 0 && h.indexOf('f3') >= 0 && h.length <= 3; }, why: function (s) { var h = s.hl_fear || []; return h.indexOf('g1') >= 0 ? 'That sentence is about Grandpa, not Nora.' : 'Look for what Nora\'s body does when she thinks about the stairs (paragraphs 1 and 4).'; }, yes: 'Yes! Those details show how scared Nora is.', hint: 'Paragraph 1 and paragraph 4.' } },
    { tag: 'explore', title: 'Mark Nora\'s brave actions', sheet: 1, goal: { text: 'Use 🟦 **Nora acts bravely** to highlight TWO sentences where Nora acts in spite of her fear.', button: 'Check my highlights', check: function (s) { var h = s.hl_brave || []; return h.indexOf('c1') >= 0 && h.indexOf('c2') >= 0; }, no: 'Find the moments Nora takes action (paragraphs 4 and 5).' },
      q: { type: 'mc', q: 'How does Nora RESPOND to her challenge?', choices: ['She is still afraid, but she climbs anyway', 'She stops being afraid, then climbs', 'She waits for someone else to light the lamp', 'She refuses to climb'], answer: 0 } },
    { tag: 'reason', title: 'Topic or theme?', sheet: 2, q: { type: 'sort', q: 'Sort each idea.', bins: ['Topic (a word or two)', 'Theme (a lesson in a sentence)'], items: [['Courage', 0], ['Fear', 0], ['Being brave means acting even when you are afraid.', 1], ['Family', 0], ['Helping others can give us strength to face our fears.', 1]] } },
    { tag: 'explore', title: 'Find the lesson', sheet: 3, goal: { text: 'Use 🟩 **Lesson clue** to highlight the sentence where Nora says what she learned.', button: 'Check', check: function (s) { return (s.hl_lesson || []).indexOf('t1') >= 0; }, no: 'Look at the very end, where Nora talks about being brave.' },
      q: { type: 'mc', q: 'Which theme statement fits the story BEST?', choices: ['Being brave doesn\'t mean you aren\'t scared; it means you act anyway.', 'Lighthouses are dangerous.', 'Never go out in a storm.', 'Grandparents are wise.'], answer: 0 } },
    { tag: 'write', title: 'Write a theme statement', sheet: 4, q: { type: 'text', q: 'Write the theme as a sentence that could teach ANYONE (not just Nora). Do not use character names.', rows: 2, starter: 'This story teaches that', min: 8,
      need: [{ words: ['brave', 'courage', 'fear', 'afraid', 'scared'], label: 'Is about courage or fear' }, { words: ['even', 'anyway', 'still', 'despite', 'when'], label: 'Shows the lesson (acting even when afraid)' }],
      avoid: [['Nora', 'Leaves out character names so it applies to anyone']], model: 'This story teaches that being brave means doing what is right even when you are afraid.' } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: another theme', sheet: 5, q: { type: 'text', q: 'Stories can have more than one theme. Write a SECOND theme about helping others, and name one detail that supports it.', min: 14, need: [{ words: ['help', 'others', 'people', 'family', 'families'], label: 'Is about helping others' }, { words: ['ship', 'boat', 'families', 'grandpa', 'mary rose'], label: 'Uses a story detail' }] } },
    { tag: 'write', title: 'Prove it (CER)', sheet: 6, q: { type: 'write', q: 'What is the theme of "The Lighthouse Steps"? Prove it with a quote.', parts: [
      { label: 'Claim', help: 'State the theme.', starter: 'The theme of the story is', min: 8, need: [{ words: ['brave', 'courage', 'fear', 'afraid'], label: 'States a theme about courage' }] },
      { label: 'Evidence', help: 'Quote the text exactly, in quotation marks.', starter: 'The text says, "', min: 8, quote: true, frames: ['The text says, "', 'For example, Nora "'] },
      { label: 'Reasoning', help: 'Explain how the quote shows the theme.', starter: 'This shows', min: 12, need: [{ words: ['shows', 'proves', 'means', 'because'], label: 'Explains the evidence' }, { words: ['afraid', 'scared', 'fear', 'brave'], label: 'Connects to the theme' }] }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-race-studio', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RL.2.2 · 5.W.3.1',
  title: 'RACE Writing Studio', model: 'raceStudio', minutes: 30, icon: '✍️',
  setup: {
    passages: [SUNNY_TEXTS.lighthouse, SUNNY_TEXTS.volcano],
    example: { prompt: 'What is Nora afraid of at the beginning of the story? Use evidence from the text.', parts: [['R', 'At the beginning of "The Lighthouse Steps," Nora is afraid of', 'Restate: turn the question into the start of your answer, so the reader knows what you are writing about.'], ['A', 'climbing the tall lighthouse stairs.', 'Answer: give your answer clearly and directly.'], ['C', 'The text states that "she had never climbed past the fortieth step."', 'Cite: prove it with words from the text in quotation marks, with an introduction like "The text states."'], ['E', 'This shows that the stairs scared her so much that she always stopped partway up.', 'Explain: tell HOW the quote proves your answer. Start with "This shows."']] },
    prompts: [
      { q: 'How does Nora change from the beginning to the end of the story? Use evidence from the text.', keys: ['How', 'Nora', 'change', 'beginning', 'end', 'evidence'], slots: { R: 'r1', A: 'a1', C: 'c1', E: 'e1' }, goodEvidence: ['c1', 'c2', 't1', 'g2'] },
      { q: 'What lesson does Jayden learn from his science fair project? Use evidence from the text.', keys: ['lesson', 'Jayden', 'learn', 'evidence'], slots: { R: 'r2', A: 'r2', C: 'r2', E: 'r2' }, goodEvidence: ['j3', 'j4', 'j5'] }
    ]
  },
  place: 'Sunnyside Reading Room · Writing Studio',
  mission: 'In the Writing Studio, you will learn to write a strong answer to any reading question using RACE: Restate, Answer, Cite, Explain. First watch a model, then build one paragraph together step by step, and finally write one on your own.',
  question: 'How do I write a complete, text-based answer using RACE?',
  takeaway: 'RACE is a recipe for strong answers. Restate the question in your first sentence. Answer it clearly. Cite evidence with a quote from the text and an introduction ("The text states…"). Explain how the evidence proves your answer ("This shows…").',
  vocab: [['Restate', 'Put the question\'s words into your answer\'s first sentence.'], ['Cite', 'Quote the text, word for word, in quotation marks.'], ['Explain', 'Tell how the evidence proves your answer.'], ['Prompt', 'The question you are answering.']],
  warmup: { style: 'Spot the part', prompt: 'Label each sentence R, A, C, or E.', items: [['"This shows that Nora was very nervous."', 'E.'], ['"The text states, \'Her heart pounded so hard.\'"', 'C.'], ['"At the beginning of the story, Nora feels scared."', 'R + A.']] },
  steps: [
    { tag: 'model', title: 'Watch a model RACE answer', setup: { mode: 'example' }, text: 'Look at the model paragraph. Each color is one part of RACE.', goal: { text: 'Tap all FOUR colored parts to learn what each one does.', check: { exampleSeen: 4 } },
      q: { type: 'order', q: 'Put the four parts of RACE in order.', items: ['Restate the question', 'Answer the question', 'Cite evidence from the text', 'Explain how the evidence proves your answer'] } },
    { tag: 'read', title: 'Read closely', setup: { mode: 'write', prompt: 0 }, sheet: 1, goal: { text: 'Read "The Lighthouse Steps" and press **✓ I finished reading**.', check: { read_0: true } },
      q: { type: 'mc', q: 'At the END of the story, how does Nora feel about being brave?', choices: ['She knows being brave means acting even when scared', 'She is still too scared to climb', 'She thinks bravery is only for grown-ups'], answer: 0 } },
    { tag: 'explore', title: 'Dissect the prompt', sheet: 1, text: 'Before writing, find the key words in the prompt. They tell you WHAT to write about.', goal: { text: 'Tap the key words in the prompt (who, what to explain, and what you must use).', button: 'Check my key words', check: { keysAll: true }, why: function (s) { return 'You have ' + (s.keysRight || 0) + ' key words. Look for the character, the word "change," WHEN (beginning, end), and what you must use.'; } } },
    { id: 'r1', tag: 'write', title: 'R: Restate', sheet: 2, strategy: 'Use the prompt\'s key words. Don\'t start with "Because" or "She."', q: { type: 'text', q: 'Write the Restate: turn the question into the start of your answer.', rows: 2, starter: 'From the beginning to the end of "The Lighthouse Steps," Nora changes', min: 8,
      need: [{ words: ['nora'], label: 'Names the character' }, { words: ['change', 'changes', 'changed'], label: 'Uses the word "change"' }, { words: ['beginning', 'end', 'from'], label: 'Mentions beginning and end' }], avoid: [['because', 'Saves "because" for later (the restate just sets up your answer)']] } },
    { id: 'a1', tag: 'write', title: 'A: Answer', sheet: 2, q: { type: 'text', q: 'Write the Answer: HOW does Nora change? (From ___ to ___.)', rows: 2, starter: 'from being', min: 6, need: [{ words: ['afraid', 'scared', 'fear', 'nervous', 'frightened'], label: 'Describes the beginning (afraid)' }, { words: ['brave', 'courage', 'confident', 'climbs'], label: 'Describes the end (brave)' }] } },
    { tag: 'explore', title: 'C: Find the best evidence', sheet: 3, goal: { text: 'Highlight a sentence that PROVES Nora became brave.', button: 'Check my evidence', check: function (s) { return (s.goodEvidence || 0) >= 1; }, no: 'That sentence doesn\'t prove she changed. Look at paragraphs 4 to 6.', hint: 'Look for a sentence where she acts, or where she says what she learned.' } },
    { id: 'c1', tag: 'write', title: 'C: Cite', sheet: 3, strategy: 'Introduce the quote, then copy it exactly inside quotation marks.', q: { type: 'text', q: 'Write the Cite sentence: introduce and quote your evidence.', rows: 2, starter: 'The text states, "', min: 8, quote: true, need: [{ words: ['the text states', 'the text says', 'according to', 'the author writes', 'in the story', 'for example'], label: 'Introduces the quote' }], bank: ['The text states,', 'According to the story,', 'The author writes,'] } },
    { id: 'e1', tag: 'write', title: 'E: Explain', sheet: 4, strategy: 'Say what the quote SHOWS about Nora and connect it to "change."', q: { type: 'text', q: 'Write the Explain: how does your quote prove that Nora changed?', rows: 3, starter: 'This shows that', min: 12, need: [{ words: ['this shows', 'this proves', 'this means', 'this tells'], label: 'Starts the explanation' }, { words: ['brave', 'afraid', 'scared', 'fear', 'change', 'changed'], label: 'Connects the evidence to the change' }] } },
    { tag: 'write', title: 'Put it together', sheet: 5, text: 'Your parts are on the paragraph board. Read them in order and revise so they flow as one paragraph.', q: { type: 'write', q: 'Revise and combine your RACE paragraph.', parts: [
      { label: 'R + A', prefill: ['r1', 'a1'], min: 12, need: [{ words: ['nora'], label: 'Names Nora' }, { words: ['afraid', 'scared', 'fear'], label: 'Beginning' }, { words: ['brave', 'courage'], label: 'End' }] },
      { label: 'C', prefill: 'c1', min: 8, quote: true },
      { label: 'E', prefill: 'e1', min: 10, need: [{ words: ['this shows', 'this proves', 'this means'], label: 'Explains' }] }], yes: 'Your RACE paragraph is complete! Copy it onto your lab sheet.' } },
    { tag: 'read', title: 'You do: new text', setup: { mode: 'write', prompt: 1 }, sheet: 6, goal: { text: 'Read "Jayden\'s Volcano" (it is now in the reading panel) and finish reading.', check: { read_1: true } },
      q: { type: 'mc', q: 'What went wrong with Jayden\'s volcano?', choices: ['The baking soda got wet and didn\'t fizz', 'He forgot the vinegar', 'The judges knocked it over'], answer: 0 } },
    { id: 'r2', tag: 'write', title: 'You do: a full RACE answer', sheet: 7, text: 'Prompt: What lesson does Jayden learn from his science fair project? Use evidence from the text.', q: { type: 'write', q: 'Write all four parts on your own.', parts: [
      { label: 'Restate', starter: 'In "Jayden\'s Volcano," Jayden learns', min: 6, need: [{ words: ['jayden'], label: 'Names Jayden' }, { words: ['learn', 'lesson'], label: 'Uses "learn" or "lesson"' }] },
      { label: 'Answer', min: 6, need: [{ words: ['mistake', 'wrong', 'fail', 'failed', 'learn', 'give up', 'giving up'], label: 'States the lesson' }] },
      { label: 'Cite', starter: 'The text states, "', min: 8, quote: true, legendQuotes: 2, need: [{ words: ['the text states', 'the text says', 'according to', 'the author writes', 'for example', 'jayden says', 'he says'], label: 'Introduces the quote' }] },
      { label: 'Explain', starter: 'This shows that', min: 12, need: [{ words: ['this shows', 'this proves', 'this means'], label: 'Explains' }, { words: ['learn', 'lesson', 'mistake', 'wrong'], label: 'Connects to the lesson' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: grade a RACE', sheet: 8, text: 'Kai wrote: "Jayden learns a lesson. The volcano didn\'t work. It was sad."', q: { type: 'multi', q: 'What is Kai\'s paragraph missing? Choose all.', choices: ['A restate with the key words of the prompt', 'A clear answer naming the lesson', 'A quote from the text', 'An explanation starting with "This shows"'], answer: [0, 1, 2, 3] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-summary-builder', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RL.2.2',
  title: 'Summary Builder', model: 'summaryBuilder', minutes: 20, icon: '🗂️',
  setup: { passage: SUNNY_TEXTS.kite, events: [['Priya wants to win the kite contest and won\'t let Dev help.', 0], ['Priya builds a huge dragon kite.', 0], ['The paper smelled like glue for days.', 3], ['The kite crashes into a tree, and its tail rips.', 1], ['Dev helps Priya fix the kite with tape and string.', 1], ['Dev\'s kite is small and blue.', 3], ['The fixed kite flies high, and they win second place.', 2], ['Priya shares the ribbon and thanks Dev.', 2], ['The contest is held at Miller Park.', 3]] },
  place: 'Sunnyside Reading Room · Book Talk Table',
  mission: 'The school newsletter wants short summaries of student-favorite stories. A good summary tells only the most important events in order, with no opinions. Sort the events, cut the minor details, and write a summary under 60 words.',
  question: 'How do I write a summary that includes only the most important events?',
  takeaway: 'A summary retells the most important events from the beginning, middle, and end in your own words. It leaves out minor details and opinions. Asking "Would the story change without this?" helps you decide what is important.',
  vocab: [['Summary', 'A short retelling of the most important events.'], ['Minor detail', 'A detail that doesn\'t change the story if removed.'], ['Sequence', 'The order events happen.'], ['Objective', 'Without opinions.']],
  warmup: { style: 'Keep it or cut it?', prompt: 'For the story of "Goldilocks," keep or cut each detail. Why?', items: [['Goldilocks eats the porridge.', 'Keep: it is a key event.'], ['The bowls are blue.', 'Cut: minor detail.'], ['The bears find her asleep.', 'Keep.']] },
  steps: [
    { tag: 'read', title: 'Read the story', goal: { text: 'Read "The Kite Contest" and press ✓ I finished reading.', check: { read: true } }, q: { type: 'mc', q: 'What is the main problem in the story?', choices: ['Priya\'s kite crashes and rips', 'Dev loses his kite', 'It rains on contest day'], answer: 0 } },
    { tag: 'test', title: 'Sort the events', sheet: 1, strategy: 'Ask: would the story change without this? If not, it is a minor detail.', goal: { text: 'Sort every event card into Beginning, Middle, End, or Minor detail. Press Check.', check: { allRight: true } },
      q: { type: 'mc', q: 'Why is "The paper smelled like glue for days" a minor detail?', choices: ['The story would not change without it', 'It is at the beginning', 'It is not true'], answer: 0 } },
    { tag: 'reason', title: 'Opinion or fact?', sheet: 2, q: { type: 'sort', q: 'Which sentences belong in a summary?', bins: ['Belongs in a summary', 'Leave it out'], items: [['Dev helps fix the broken kite.', 0], ['I think Priya was mean.', 1], ['This is the best story ever!', 1], ['They win second place together.', 0], ['The kite had red paper scales.', 1]] } },
    { tag: 'write', title: 'Write the summary', sheet: 3, q: { type: 'text', q: 'Write a summary of "The Kite Contest" in 60 words or fewer. Include the beginning, middle, and end.', rows: 4, min: 25, max: 60, starter: 'In "The Kite Contest," Priya',
      need: [{ words: ['kite'], label: 'Names the kite' }, { words: ['crash', 'crashes', 'crashed', 'rip', 'rips', 'ripped', 'broke', 'tree'], label: 'Includes the problem' }, { words: ['dev', 'brother'], label: 'Includes Dev' }, { words: ['fix', 'fixed', 'help', 'helps', 'helped', 'tape'], label: 'Includes how it was solved' }, { words: ['win', 'won', 'second', 'ribbon'], label: 'Includes the ending' }],
      avoid: [['I think', 'No opinions ("I think")'], ['I liked', 'No opinions ("I liked")'], ['glue', 'Leaves out minor details (the glue smell)']] } },
    { tag: 'reason', title: 'Summary → theme', sheet: 4, q: { type: 'mc', q: 'Your summary shows how Priya changes. What theme does that suggest?', choices: ['Working together can help you do more than you could alone.', 'Kites are hard to fly.', 'Little brothers are annoying.'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: 25-word summary', sheet: 5, q: { type: 'text', q: 'Write a summary in 25 words or fewer that still has a beginning, middle, and end.', min: 12, max: 25, need: [{ words: ['kite'], label: 'Names the kite' }, { words: ['dev', 'brother'], label: 'Includes Dev' }, { words: ['win', 'won', 'second'], label: 'Includes the ending' }] } },
    { tag: 'explain', title: 'Explain your choices', sheet: 6, q: { type: 'text', q: 'Choose one detail you LEFT OUT of your summary. Explain why it didn\'t belong.', rows: 2, need: [{ words: ['change', 'important', 'minor', 'need'], label: 'Uses the "would it change the story" test' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-found-wallet', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RL.2.2',
  title: 'The Found Wallet: Choose the Path', model: 'choiceMap', minutes: 25, icon: '👛',
  setup: { title: 'The Found Wallet', start: 'start', decision: 'decision', nodes: {
    start: { img: '🚏', text: 'Mateo was waiting for the bus after school when he spotted a brown wallet under the bench. Inside were two twenty-dollar bills and a library card that said ROSA DELGADO.\nForty dollars! Mateo had been saving for months to buy the new Galaxy Racers game, and it cost exactly forty dollars. Nobody else was at the bus stop. Nobody had seen him pick it up.', choices: [['Keep reading', 'decision']] },
    decision: { img: '🤔', text: 'Mateo\'s heart thumped. He turned the wallet over in his hands. The bus was coming around the corner. He had to decide, and fast.', choices: [['Keep the money and throw the wallet away', 'keep'], ['Give the wallet to the bus driver', 'driver'], ['Take it to Rosa Delgado himself', 'find']] },
    keep: { img: '🎮', text: 'Mateo stuffed the bills in his pocket and dropped the wallet in the trash. That weekend, he bought Galaxy Racers. He expected to feel thrilled. Instead, his stomach felt tight every time he played.\nOn Monday, he saw his neighbor Mrs. Delgado on her porch, looking worried. "I lost the money for my medicine," she told his mom. "I don\'t know what I\'ll do." Mateo could not look at her. That night the game sat in its box, unplayed. It felt too heavy to hold.', ending: 'The Heavy Game' },
    driver: { img: '🚌', text: 'Mateo handed the wallet to the bus driver. "Someone lost this," he said. The driver nodded and put it in the lost-and-found box.\nA week later, a card arrived at school with Mateo\'s name on it. "Thank you for being honest," it said. "That money was for my medicine. — Rosa Delgado." Mateo still didn\'t have the game, but he read the card three times and smiled every time.', ending: 'The Thank-You Card' },
    find: { img: '🏡', text: 'Mateo recognized the name. Mrs. Delgado lived three houses down! After the bus dropped him off, he walked straight to her door and knocked.\nWhen she saw the wallet, she pressed her hand to her heart. "That money was for my medicine," she said. She tried to give him ten dollars as a reward, but Mateo shook his head. "It\'s yours," he said. Walking home, Mateo realized that doing the right thing felt better than any game could.', ending: 'Doing the Right Thing' }
  } },
  place: 'Sunnyside Reading Room · Choose-Your-Path Corner',
  mission: 'In this story, YOU choose what the main character does. Explore every path, collect evidence of how each choice makes Mateo feel, and figure out the lesson the story teaches.',
  question: 'How do a character\'s choices and their results reveal a story\'s theme?',
  takeaway: 'Authors reveal themes through the choices characters make and what happens because of them. Comparing Mateo\'s different endings shows that honest choices bring peace and respect, while dishonest ones bring guilt, even when no one is watching.',
  vocab: [['Consequence', 'What happens because of a choice.'], ['Conflict', 'The problem a character faces, including inner struggles.'], ['Character trait', 'A word describing what a character is like (honest, selfish).'], ['Theme', 'The lesson the story teaches about life.']],
  warmup: { style: 'Would you rather?', prompt: 'Choose and explain your reason.', items: [['Find $5 on the playground: keep it or turn it in?', 'Any reasoned answer.'], ['What does "doing the right thing when no one is watching" mean?', 'Being honest even if you wouldn\'t get caught.'], ['Can one choice change how you feel for days?', 'Yes, for example guilt or pride.']] },
  steps: [
    { tag: 'read', title: 'The problem', goal: { text: 'Read the beginning and go to the big decision.', check: { v_decision: true } }, q: { type: 'mc', q: 'What is Mateo\'s inner conflict?', choices: ['He wants the game, but the money isn\'t his', 'He missed the bus', 'He can\'t read the library card'], answer: 0 } },
    { tag: 'predict', title: 'Predict', sheet: 1, q: { type: 'predict', q: 'Which choice do you predict will make Mateo feel the best in the end?', choices: ['Keeping the money', 'Giving it to the bus driver', 'Returning it himself'] } },
    { tag: 'explore', title: 'Explore every path', sheet: 1, goal: { text: 'Explore all THREE endings (use "Go back to the big decision").', check: { allEndings: true } } },
    { tag: 'record', title: 'Consequence chart', sheet: 2, q: { type: 'sort', q: 'How does Mateo feel at the end of each path? Sort the choices.', bins: ['Guilty and uneasy', 'Proud and at peace'], items: [['Keeps the money', 0], ['Gives it to the bus driver', 1], ['Returns it himself', 1]] } },
    { tag: 'reason', title: 'Clues about feelings', sheet: 3, q: { type: 'mc', q: 'In "The Heavy Game" ending, what does "It felt too heavy to hold" suggest?', choices: ['Mateo feels guilty, not that the game weighs a lot', 'The game box is very large', 'Mateo is tired'], answer: 0 } },
    { tag: 'reason', title: 'Find the theme', sheet: 4, q: { type: 'mc', q: 'You predicted: {{pred:s1}}. Across all three endings, what lesson does the author teach?', choices: ['Being honest brings peace, even when no one is watching.', 'Always ride the bus.', 'Video games are fun.', 'Never pick things up off the ground.'], answer: 0 } },
    { tag: 'write', title: 'Theme with evidence (CER)', sheet: 5, q: { type: 'write', q: 'What is the theme of "The Found Wallet"? Support it with a quote.', parts: [
      { label: 'Claim', starter: 'The theme of the story is', min: 8, need: [{ words: ['honest', 'right thing', 'truth', 'honesty'], label: 'States a theme about honesty' }], avoid: [['Mateo', 'Write the theme so it applies to anyone (no names)']] },
      { label: 'Evidence', starter: 'The text says, "', min: 8, quote: true },
      { label: 'Reasoning', starter: 'This shows', min: 12, need: [{ words: ['shows', 'proves', 'means'], label: 'Explains' }, { words: ['feel', 'felt', 'guilty', 'heavy', 'better', 'smiled'], label: 'Connects to how the choice made him feel' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: author\'s choice', sheet: 6, q: { type: 'text', q: 'Why do you think the author made Mrs. Delgado\'s money be for her medicine? How does that detail strengthen the theme?', min: 15, need: [{ words: ['need', 'important', 'medicine', 'health'], label: 'Explains the money was important' }, { words: ['theme', 'honest', 'right'], label: 'Connects to the theme' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-theme-match', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RL.2.2 · 5.RL.3.2',
  title: 'Fable & Poem Theme Match', model: 'themeMatch', minutes: 20, icon: '🦁',
  setup: {
    texts: [
      { title: 'The Ant and the Grasshopper', genre: 'Fable (retold)', theme: 1, paragraphs: ['All summer long, the ant carried seeds to her nest while the grasshopper sang in the sun. "Why work so hard?" the grasshopper laughed. "There is food everywhere!"', 'When winter came, snow covered the fields. The ant was warm and well fed. {m1|The hungry grasshopper knocked at her door, wishing he had spent at least some of the summer getting ready.}'] },
      { title: 'Two Seeds', genre: 'Poem', theme: 3, paragraphs: ['Two seeds lay in the springtime ground. / The first said, "I will grow! / I\'ll push my roots through dark and stone / to reach the sun I know."', 'The second seed said, "I\'ll stay small. / It\'s safe beneath the ground." / {m2|The first became a tall green tree; / the second made no sound.}'] },
      { title: 'The Lion and the Mouse', genre: 'Fable (retold)', theme: 5, paragraphs: ['A lion caught a tiny mouse under his paw. "Please let me go," squeaked the mouse. "Someday I may help you." The lion laughed at the idea, but he let the mouse go.', 'Days later, the lion was trapped in a hunter\'s net. The mouse heard his roars and chewed through the ropes until the lion was free. {m3|"You laughed at me," said the mouse, "but even a small friend can make a big difference."}'] }
    ],
    cards: ['Friendship', 'Getting ready for the future is better than only playing today.', 'Animals can talk.', 'You have to take a risk to grow.', 'Never trust a lion.', 'Even a small friend can make a big difference.']
  },
  place: 'Sunnyside Reading Room · Fable Shelf',
  mission: 'The library is making theme labels for its fable and poetry shelf. Read three short texts, match each to its true theme card (watch out for topics and silly traps!), and mark the line that proves it.',
  question: 'How do details in different texts reveal their themes?',
  takeaway: 'Short fables and poems teach themes through what characters do and what happens to them. A theme is a full-sentence life lesson, not a single word like "friendship." Different texts can share similar themes about growth, preparation, and kindness.',
  vocab: [['Fable', 'A short story, often with animals, that teaches a lesson.'], ['Moral', 'The lesson of a fable.'], ['Stanza', 'A group of lines in a poem.'], ['Theme', 'The message about life in a text.']],
  warmup: { style: 'Finish the moral', prompt: 'Complete each lesson in your own words.', items: [['In "The Tortoise and the Hare," slow and steady...', '...wins the race.'], ['A theme must be written as a...', 'Complete sentence.'], ['Is "animals" a theme?', 'No, it is a topic.']] },
  steps: [
    { tag: 'read', title: 'Read all three', goal: { text: 'Read each text by tapping its tab. Place a theme card on at least one.', check: { matched: { gte: 1 } } } },
    { tag: 'test', title: 'Match the themes', sheet: 1, goal: { text: 'Place the correct theme card on all THREE texts.', button: 'Check my matches', check: { allRight: true }, why: function (s) { return (s.right || 0) + ' of 3 are right. Watch for topics (one word) and cards that aren\'t really lessons.'; } },
      q: { type: 'mc', q: 'Why is "Friendship" NOT a good theme card?', choices: ['It is a topic, not a lesson written as a sentence', 'None of the texts are about friends', 'It is too long'], answer: 0 } },
    { tag: 'test', title: 'Prove each one', sheet: 2, goal: { text: 'In EACH text, highlight the line that best shows its theme.', button: 'Check', check: function (s) { return (s.ev_0 || []).indexOf('m1') >= 0 && (s.ev_1 || []).indexOf('m2') >= 0 && (s.ev_2 || []).indexOf('m3') >= 0; }, no: 'Look at the ending of each text, where the lesson shows up.' } },
    { tag: 'reason', title: 'Poem clues', sheet: 3, q: { type: 'mc', q: 'In "Two Seeds," what does the second seed "making no sound" suggest?', choices: ['It never grew because it wouldn\'t take a risk', 'It was sleeping', 'It became a tree too'], answer: 0 } },
    { tag: 'reason', title: 'Compare', sheet: 4, q: { type: 'mc', q: 'How are "The Ant and the Grasshopper" and "Two Seeds" alike?', choices: ['Both show that what you choose to do now affects your future', 'Both are poems', 'Both have lions'], answer: 0 } },
    { tag: 'write', title: 'Explain one theme', sheet: 5, q: { type: 'write', q: 'Choose one text. What is its theme, and how does the ending show it?', parts: [
      { label: 'Claim', starter: 'The theme of', min: 8, need: [{ words: ['ant', 'seed', 'lion', 'mouse', 'grasshopper'], label: 'Names the text' }] },
      { label: 'Evidence', starter: 'The text says, "', min: 6, quote: true },
      { label: 'Reasoning', starter: 'This shows', min: 10, need: [{ words: ['shows', 'proves', 'teaches', 'means'], label: 'Explains' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: write a fable', sheet: 6, q: { type: 'text', q: 'Write a 3-sentence fable with animals that teaches: "Being kind to others comes back to you." Do not state the lesson directly.', min: 25, need: [{ words: ['kind', 'help', 'helped', 'share', 'shared'], label: 'Shows kindness' }, { words: ['later', 'then', 'next', 'when'], label: 'Shows it coming back later' }] } }
  ]
});
