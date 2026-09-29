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
  id: 'g5-ela-lighthouse-theme', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RC.2',
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
  id: 'g5-ela-race-studio', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RC.1 · 5.RC.2',
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
  id: 'g5-ela-summary-builder', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RC.2',
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
  id: 'g5-ela-found-wallet', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RC.2',
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
  id: 'g5-ela-theme-match', std: 'g5-ela-theme', subject: 'ela', grade: 5, code: '5.RC.2 · 5.RC.5',
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

/* ======================= Main ideas & text structure ======================= */
SUNNY_SIMS.push({
  id: 'g5-ela-structure-lab', std: 'g5-ela-info', subject: 'ela', grade: 5, code: '5.RC.8',
  title: 'Text Structure Lab', model: 'structureLab', minutes: 25, icon: '🦋',
  setup: { items: [
    { title: 'A Monarch\'s Life', structure: 'chronology', text: 'A monarch\'s life begins as an egg no bigger than a pinhead. [[First]], a tiny caterpillar hatches and eats its own eggshell. [[Next]], it munches milkweed leaves for about two weeks. [[After]] that, it hangs upside down and forms a green case called a chrysalis. [[Finally]], about ten days [[later]], an adult butterfly climbs out.' },
    { title: 'Monarch or Viceroy?', structure: 'compare', text: 'Monarchs and viceroys look [[alike]] at first glance. [[Both]] have orange wings with black veins and white spots. [[However]], a viceroy has an extra black line across its back wings. Viceroys are also smaller. [[Unlike]] monarchs, viceroys do not migrate thousands of miles.' },
    { title: 'Why Monarchs Are Disappearing', structure: 'cause', text: 'Many fields where milkweed once grew have been turned into roads and farms. [[Because]] monarch caterpillars can eat only milkweed, they have less food. [[As a result]], fewer caterpillars survive to become butterflies, [[so]] monarch numbers have dropped in many places.' },
    { title: 'Helping the Monarchs', structure: 'problem', text: 'The biggest [[problem]] for monarchs is a shortage of milkweed. One [[solution]] is simple: plant it! Schools across Indiana are building butterfly gardens to [[solve]] this problem. When students plant milkweed, monarchs have places to lay eggs again.' },
    { title: 'The Amazing Monarch', structure: 'description', text: 'Monarchs are [[known for]] their bright orange wings, which warn birds that they taste bad. They have several amazing traits. [[For example]], they can fly up to 100 miles in a day. They also have special body parts, [[such as]] taste sensors on their feet.' }
  ] },
  place: 'Sunnyside Reading Room · Nonfiction Lab',
  mission: 'Authors organize information in different ways, and signal words are the clues. Read five paragraphs about monarch butterflies, tap the signal words, and match each paragraph to the graphic organizer that fits its structure.',
  question: 'How do signal words reveal how an informational text is organized?',
  takeaway: 'Informational texts use structures: chronology (first, next, finally), compare and contrast (both, however, unlike), cause and effect (because, as a result, so), problem and solution (problem, solution, solve), and description (for example, such as). Knowing the structure helps you find and remember the main ideas.',
  vocab: [['Text structure', 'How an author organizes information.'], ['Signal words', 'Words that give clues about the structure.'], ['Chronology', 'Time order.'], ['Graphic organizer', 'A drawing that shows how ideas connect.']],
  warmup: { style: 'Signal word sort', prompt: 'Which structure does each signal word suggest?', items: [['"As a result"', 'Cause and effect.'], ['"Similarly"', 'Compare and contrast.'], ['"Then" and "finally"', 'Chronology.']] },
  steps: [
    { tag: 'explore', title: 'First paragraph', text: 'Paragraph 1 is open. Tap the words that signal how it is organized.', goal: { text: 'Find all the signal words in ¶ 1 without tapping more than 2 extra words.', button: 'Check my signal words', check: function (s) { return s.sigAll_0 && (s.wrong_0 || 0) <= 2; }, why: function (s) { return (s.wrong_0 || 0) > 2 ? 'You tapped words that are not signal words. Tap them again to remove them.' : 'Look for time-order words.'; } },
      q: { type: 'mc', q: 'Which structure do "first, next, after, finally, later" signal?', choices: ['Chronology (sequence)', 'Compare and contrast', 'Problem and solution'], answer: 0 } },
    { tag: 'test', title: 'All five paragraphs', sheet: 1, goal: { text: 'Find the signal words in EVERY paragraph.', check: { allSignals: true } } },
    { tag: 'test', title: 'Match the organizers', sheet: 2, goal: { text: 'Choose the organizer that fits each paragraph.', button: 'Check', check: { allOrganizers: true }, why: function (s) { return (s.orgCount || 0) + ' of 5 are right. Use the signal words as clues.'; } },
      q: { type: 'sort', q: 'Record each paragraph\'s structure.', bins: ['Chronology', 'Compare/contrast', 'Cause/effect', 'Problem/solution', 'Description'], items: [['¶1 A Monarch\'s Life', 0], ['¶2 Monarch or Viceroy?', 1], ['¶3 Why Monarchs Are Disappearing', 2], ['¶4 Helping the Monarchs', 3], ['¶5 The Amazing Monarch', 4]] } },
    { tag: 'reason', title: 'Tricky one', sheet: 3, q: { type: 'mc', q: '¶ 4 has the word "when." Why is it problem and solution, not chronology?', choices: ['The paragraph is mostly about a problem and how people fix it', '"When" always means chronology', 'It has no signal words'], answer: 0 } },
    { tag: 'reason', title: 'Structure → main idea', sheet: 4, q: { type: 'mc', q: 'What is the main idea of ¶ 3?', choices: ['Losing milkweed has caused monarch numbers to drop', 'Roads are important', 'Caterpillars are picky eaters', 'Farms grow food'], answer: 0 } },
    { tag: 'write', title: 'Write with a structure', sheet: 5, q: { type: 'text', q: 'Write 3 sentences about your morning routine using CHRONOLOGY. Use at least three signal words.', rows: 3, min: 20, need: [{ words: ['first'], label: 'Uses "first"' }, { words: ['next', 'then', 'after'], label: 'Uses "next/then/after"' }, { words: ['finally', 'last', 'lastly'], label: 'Uses "finally/last"' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: rewrite a structure', sheet: 6, q: { type: 'text', q: 'Rewrite the idea of ¶ 3 as a PROBLEM AND SOLUTION paragraph (2 to 3 sentences).', min: 20, need: [{ words: ['problem'], label: 'Names the problem' }, { words: ['solution', 'solve', 'fix', 'help', 'plant'], label: 'Gives a solution' }] } },
    { tag: 'explain', title: 'Why it matters', sheet: 7, q: { type: 'text', q: 'Explain how knowing a text\'s structure helps a reader.', rows: 2, need: [{ words: ['signal', 'organized', 'structure'], label: 'Mentions structure or signal words' }, { words: ['understand', 'find', 'remember', 'main idea', 'follow'], label: 'Explains how it helps' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-wetlands-main-ideas', std: 'g5-ela-info', subject: 'ela', grade: 5, code: '5.RC.6',
  title: 'Main Idea Organizer: Wetlands', model: 'organizer', minutes: 25, icon: '🦆',
  setup: {
    passage: { title: 'Wetlands: Nature\'s Sponges', genre: 'Informational article', paragraphs: [
      "Wetlands are areas where water covers the soil for all or part of the year. Marshes, swamps, and bogs are all kinds of wetlands. Indiana once had millions of acres of wetlands, but most have been drained for farms and cities.",
      "Wetlands work like giant sponges. {k1|During heavy rains, they soak up extra water and release it slowly, which helps prevent floods.} {k2|Wetland plants also trap mud and pollution, so the water that flows out is cleaner than the water that flowed in.}",
      "Wetlands are also some of the busiest homes on Earth. {k3|Frogs, turtles, and dragonflies spend their whole lives there.} {k4|Many ducks and geese stop at wetlands to rest and eat during their long migrations.} Some people think wetlands smell bad, but that smell comes from plants breaking down and feeding the soil.",
      "Protecting wetlands protects people and animals alike. When we save a wetland, we keep our water clean, our towns safer from floods, and our wildlife healthy."
    ] },
    ideas: ['Wetlands help control floods and clean water.', 'Wetlands are important homes for animals.'],
    details: [['They soak up rain and release it slowly.', 0], ['Plants trap mud and pollution.', 0], ['Frogs and turtles live there their whole lives.', 1], ['Migrating ducks and geese rest and eat there.', 1], ['Some people think wetlands smell bad.', -1], ['Marshes, swamps, and bogs are wetlands.', -1]]
  },
  place: 'Sunnyside Reading Room · Nature Desk',
  mission: 'The Sunnyside Nature Center is making a poster about wetlands and needs the two biggest ideas from this article, each supported by key details. Read, mark the key details, and build the organizer.',
  question: 'How do key details support two or more main ideas in an informational text?',
  takeaway: 'A text can have more than one main idea. Each main idea is supported by key details: facts, examples, and descriptions that prove it. Details that are interesting but don\'t support a main idea can be left out of a summary.',
  vocab: [['Main idea', 'The most important point the author makes about a topic.'], ['Key detail', 'A fact or example that supports a main idea.'], ['Wetland', 'Land covered by water for all or part of the year.'], ['Migration', 'A long seasonal trip that animals make.']],
  warmup: { style: 'Topic vs. main idea', prompt: 'Label T for topic or MI for main idea.', items: [['Wetlands', 'Topic.'], ['Wetlands protect towns from flooding.', 'Main idea.'], ['Frogs', 'Topic (a detail).']] },
  steps: [
    { tag: 'read', title: 'Read the article', goal: { text: 'Read "Wetlands: Nature\'s Sponges" and press ✓ I finished reading.', check: { read: true } }, q: { type: 'mc', q: 'What is the TOPIC of the article?', choices: ['Wetlands', 'Ducks', 'Floods', 'Farms'], answer: 0 } },
    { tag: 'explore', title: 'Mark key details', sheet: 1, goal: { text: 'Tap at least 4 sentences that are key details.', check: { nKeys: { gte: 4 } } } },
    { tag: 'test', title: 'Build the organizer', sheet: 2, goal: { text: 'Sort every detail card under the right main idea (or the trash).', check: { allRight: true } },
      q: { type: 'mc', q: 'Why does "Some people think wetlands smell bad" go in the trash?', choices: ['It doesn\'t support either main idea', 'It is false', 'It is the main idea'], answer: 0 } },
    { tag: 'reason', title: 'Two main ideas', sheet: 3, q: { type: 'multi', q: 'Which TWO sentences state the article\'s main ideas?', choices: ['Wetlands help control floods and keep water clean.', 'Wetlands are homes for many animals.', 'Indiana once had millions of acres of wetlands.', 'Dragonflies live in wetlands.'], answer: [0, 1] } },
    { tag: 'write', title: 'Explain a main idea (CER)', sheet: 4, q: { type: 'write', q: 'Choose one main idea and prove it with a key detail from the text.', parts: [
      { label: 'Main idea', starter: 'One main idea of the article is that wetlands', min: 8, need: [{ words: ['flood', 'clean', 'water', 'home', 'animals', 'wildlife'], label: 'States a main idea' }] },
      { label: 'Key detail', starter: 'The text states, "', min: 8, quote: true },
      { label: 'Explain', starter: 'This detail supports the main idea because', min: 10, need: [{ words: ['because', 'shows', 'proves'], label: 'Explains the connection' }] }] } },
    { tag: 'write', title: 'Summarize', sheet: 5, q: { type: 'text', q: 'Write a 2-sentence summary of the article that includes BOTH main ideas.', rows: 3, min: 18, max: 50, need: [{ words: ['flood', 'clean', 'sponge', 'water'], label: 'Main idea 1' }, { words: ['animal', 'home', 'wildlife', 'frog', 'duck', 'bird'], label: 'Main idea 2' }], avoid: [['smell', 'Leaves out the minor "smell" detail']] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: author\'s purpose', sheet: 6, q: { type: 'mc', q: 'Why does the author include the last paragraph?', choices: ['To connect both main ideas and persuade readers to protect wetlands', 'To describe frogs', 'To tell a story'], answer: 0 } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-news-desk', std: 'g5-ela-info', subject: 'ela', grade: 5, code: '5.RC.6',
  title: 'Sunnyside News Desk', model: 'newsDesk', minutes: 20, icon: '📰',
  setup: { articles: [
    { headlines: ['Students Plant Carrots', 'School Garden Feeds 40 Families', 'It Rained in June', 'Mr. Lee Likes Gardens'], best: 1, paragraphs: ['Sunnyside Elementary\'s fifth graders harvested more than 300 pounds of vegetables from their school garden this summer. Instead of taking the food home, the students donated all of it to the Sunnyside Food Pantry.', '"We wanted to help families who need fresh food," said student Ava Martin. Thanks to the donation, about 40 families received tomatoes, carrots, and green beans each week. Next year, the class plans to double the size of the garden.'] },
    { headlines: ['A New Crosswalk on Maple Street', 'Students\' Letters Bring Safer Crosswalk', 'Cars Are Loud', 'The Mayor Has a Dog'], best: 1, paragraphs: ['For years, students crossing Maple Street to get to school had to dodge fast cars. So Ms. Ortiz\'s class wrote letters to the city council explaining the danger and suggesting a crosswalk with flashing lights.', 'Last month, the council agreed. The new crosswalk opened on Monday, and the students cut the ribbon. "We learned that our voices matter," said Liam Chen.'] },
    { headlines: ['Library Gets a Robot', 'Robot Helper Makes Library Books Easier to Find', 'Robots Are Scary', 'Library Is Open Tuesdays'], best: 1, paragraphs: ['The Sunnyside Public Library has a new helper named Page. The small robot rolls through the aisles and uses a scanner to find books that are on the wrong shelf.', 'Librarians say Page has found more than 500 misplaced books in its first month, so visitors can find what they need faster. Kids can also ask Page for book suggestions on its touch screen.'] }
  ] },
  place: 'Sunnyside Reading Room · The Sunnyside Sun Newsroom',
  mission: 'You are the editor of The Sunnyside Sun. Three stories are ready to print, but they need headlines. A great headline captures the MAIN idea, not just a detail. Pick the best headlines, then write your own.',
  question: 'How can we identify and state the main idea of an informational text?',
  takeaway: 'The main idea is what the whole text is mostly about. A strong headline (or main idea statement) covers the whole article, not just one detail, and doesn\'t add opinions or off-topic facts.',
  vocab: [['Headline', 'The title of a news article that tells the main idea.'], ['Main idea', 'What a text is mostly about.'], ['Detail', 'A smaller piece of information that supports the main idea.'], ['Editor', 'The person who checks and improves writing.']],
  warmup: { style: 'Headline makeover', prompt: 'Improve each weak headline.', items: [['"Dogs" (article about a dog shelter finding homes for 100 pets)', '"Shelter Finds Homes for 100 Dogs."'], ['Is "It was sunny" a good headline for a story about a charity race?', 'No, it is a detail, not the main idea.'], ['What makes a headline strong?', 'It tells what the whole article is about.']] },
  steps: [
    { tag: 'explore', title: 'Story 1', goal: { text: 'Read Story 1 and pick the headline that tells its main idea.', check: { h_0: true } }, q: { type: 'mc', q: 'Why is "Students Plant Carrots" a weak headline?', choices: ['It is only a detail; the story is about donating food', 'It is false', 'It is too long'], answer: 0 } },
    { tag: 'test', title: 'All the stories', sheet: 1, goal: { text: 'Pick the best headline for all three stories.', check: { allRight: true } } },
    { tag: 'reason', title: 'Editor\'s rule', sheet: 2, q: { type: 'sort', q: 'Sort the headlines for Story 3.', bins: ['Main idea', 'Just a detail', 'Opinion or off-topic'], items: [['Robot Helper Makes Library Books Easier to Find', 0], ['Library Is Open Tuesdays', 1], ['Robots Are Scary', 2], ['Page Has a Touch Screen', 1]] } },
    { tag: 'write', title: 'Write a headline', sheet: 3, q: { type: 'text', q: 'Write your OWN headline for Story 2 (5–10 words) that captures the main idea.', min: 5, max: 10, need: [{ words: ['student', 'students', 'kids', 'class', 'letter', 'letters'], label: 'Includes who' }, { words: ['crosswalk', 'safe', 'safer', 'street'], label: 'Includes what changed' }] } },
    { tag: 'write', title: 'Main idea statement', sheet: 4, q: { type: 'text', q: 'Write one sentence that states the main idea of Story 1 and include ONE key detail.', rows: 2, min: 12, number: true, need: [{ words: ['garden', 'vegetables', 'food'], label: 'Names the garden or food' }, { words: ['donate', 'donated', 'gave', 'families', 'pantry'], label: 'Includes the donation' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: lead sentence', sheet: 5, q: { type: 'text', q: 'Reporters start with a "lead" that answers who, what, when, and where. Write a lead sentence for Story 3.', min: 15, need: [{ words: ['library'], label: 'Where' }, { words: ['robot', 'page'], label: 'What' }, { words: ['month', 'new', 'now', 'first'], label: 'When' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-bee-texts', std: 'g5-ela-info', subject: 'ela', grade: 5, code: '5.RC.6 · 5.RC.10',
  title: 'Two Texts, One Topic: Bees', model: 'twoTexts', minutes: 25, icon: '🐝',
  setup: {
    a: { title: 'Busy Bees', genre: 'Science article', paragraphs: ['A honeybee hive can hold 50,000 bees, and every bee has a job. Worker bees collect nectar and pollen, build wax honeycomb, and guard the entrance. The queen bee lays up to 2,000 eggs a day.', 'Bees are important pollinators. As a bee moves from flower to flower, pollen sticks to its fuzzy body and spreads to other flowers. This helps plants make fruits and seeds. About one out of every three bites of food we eat depends on pollinators like bees.'] },
    b: { title: 'A Beekeeper\'s Diary', genre: 'Personal narrative', paragraphs: ['June 3: I opened the hive this morning wearing my white suit and veil. The bees buzzed around me like a gentle storm. I watched worker bees carry yellow pollen on their back legs, packed like tiny saddlebags.', 'June 20: Today I harvested my first honey! My grandfather taught me to smoke the hive so the bees stay calm. I only take extra honey so the bees have enough for winter. Tasting it, I thought about the thousands of flowers they visited to make each spoonful.'] },
    facts: [['Worker bees collect pollen.', 1], ['A hive can hold 50,000 bees.', 0], ['The beekeeper wears a white suit and veil.', 2], ['Bees help plants make fruits and seeds.', 0], ['Honey is made from many flower visits.', 1], ['The writer\'s grandfather taught beekeeping.', 2], ['A third of our food depends on pollinators.', 0], ['Beekeepers leave honey for the bees in winter.', 2]]
  },
  place: 'Sunnyside Reading Room · Research Table',
  mission: 'You\'re researching honeybees for a class report. You found a science article and a beekeeper\'s diary. Compare what each text tells you, sort the facts into a Venn diagram, and explain what you learn from reading both.',
  question: 'How can two texts on the same topic give different information and points of view?',
  takeaway: 'Different texts on one topic can share some facts but also give unique information. A science article gives facts and data; a personal narrative gives experiences and feelings. Reading both gives a fuller understanding.',
  vocab: [['Point of view', 'Whose eyes a text is told through.'], ['Firsthand account', 'Written by someone who was there (the diary).'], ['Secondhand account', 'Written by someone reporting facts (the article).'], ['Venn diagram', 'Overlapping circles for comparing.']],
  warmup: { style: 'Firsthand or secondhand?', prompt: 'Label F or S.', items: [['A diary of a trip to the zoo', 'F.'], ['An encyclopedia entry about zoos', 'S.'], ['Why might a diary include feelings?', 'The writer experienced it.']] },
  steps: [
    { tag: 'read', title: 'Read both texts', goal: { text: 'Open and read both texts (use the tabs).', check: { read_a: true, read_b: true } }, q: { type: 'mc', q: 'How are the two texts different?', choices: ['One gives science facts; the other tells a beekeeper\'s experience', 'They are the same', 'Both are poems'], answer: 0 } },
    { tag: 'test', title: 'Fill the Venn diagram', sheet: 1, goal: { text: 'Sort every fact into the correct part of the Venn diagram.', check: { allRight: true } } },
    { tag: 'reason', title: 'Point of view', sheet: 2, q: { type: 'mc', q: 'Which sentence shows the diary is a FIRSTHAND account?', choices: ['"I opened the hive this morning wearing my white suit."', '"A hive can hold 50,000 bees."', '"Bees are important pollinators."'], answer: 0 } },
    { tag: 'reason', title: 'What each adds', sheet: 3, q: { type: 'multi', q: 'What does the diary add that the article does not? Choose all.', choices: ['How it feels to be near a hive', 'How a beekeeper harvests honey', 'How many eggs the queen lays', 'Why beekeepers leave some honey'], answer: [0, 1, 3] } },
    { tag: 'write', title: 'Compare in writing', sheet: 4, q: { type: 'write', q: 'Compare the two texts. What do you learn from reading BOTH?', parts: [
      { label: 'Both texts', starter: 'Both texts explain that', min: 8, need: [{ words: ['bee', 'bees', 'pollen', 'honey', 'flower'], label: 'Names a shared idea' }] },
      { label: 'Only the article', starter: 'Only the article tells', min: 8, need: [{ words: ['50,000', '2,000', 'third', 'pollinat', 'fruit', 'seeds', 'jobs'], label: 'Names an article-only fact' }] },
      { label: 'Only the diary', starter: 'Only the diary shows', min: 8, need: [{ words: ['suit', 'feel', 'grandfather', 'harvest', 'winter', 'smoke', 'experience'], label: 'Names a diary-only detail' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: which is better?', sheet: 5, q: { type: 'text', q: 'For a science report, which text is more useful, and why? Give one reason and one quote.', min: 18, quote: true, need: [{ words: ['article', 'diary'], label: 'Chooses a text' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-creek-report', std: 'g5-ela-info', subject: 'ela', grade: 5, code: '5.RC.6 · 5.RC.8',
  title: 'Creek Clean-Up Brief', model: 'reader', minutes: 20, icon: '🏞️',
  setup: { title: 'Saving Sunnyside Creek', genre: 'Informational article', img: '🏞️', tools: [['problem', '🟨 Problem'], ['cause', '🟦 Cause'], ['solution', '🟩 Solution']], paragraphs: [
    "Last spring, fifth graders at Sunnyside Elementary noticed something wrong with Sunnyside Creek. {p1|The water looked cloudy, and there were far fewer minnows than the year before.}",
    "The students tested the water and walked the banks with a local scientist. {c1|They discovered that rain was washing litter and fertilizer from nearby lawns into the creek.} {c2|The fertilizer made green algae grow so fast that it used up oxygen the fish needed.}",
    "The class decided to take action. {s1|They organized a Saturday clean-up that removed more than 200 pounds of trash.} {s2|They also asked neighbors to plant native flowers along the banks, because the roots soak up rainwater before it reaches the creek.}",
    "By fall, the water was clearer, and the minnows were coming back. The students plan to test the creek every season to make sure it stays healthy."
  ] },
  place: 'Sunnyside Reading Room · Environmental Desk',
  mission: 'The city council wants a short brief about how students saved Sunnyside Creek. Read the article, color-code the problem, its causes, and the solutions, then write the brief.',
  question: 'How do problem-solution and cause-effect structures organize an informational text?',
  takeaway: 'Many informational texts explain a problem, its causes, and the solutions. Marking each part helps you understand how ideas connect and makes it easier to summarize.',
  vocab: [['Problem', 'Something that needs fixing.'], ['Cause', 'Why something happens.'], ['Effect', 'What happens as a result.'], ['Solution', 'A way to fix a problem.'], ['Native plants', 'Plants that grow naturally in an area.']],
  warmup: { style: 'Cause → effect', prompt: 'Finish each cause-effect chain.', items: [['It rained all night, so...', 'the playground was muddy.'], ['Because the store ran out of milk,...', 'we bought juice.'], ['Name one problem at school and a possible solution.', 'Any reasoned pair.']] },
  steps: [
    { tag: 'read', title: 'Read the article', goal: { text: 'Read and press ✓ I finished reading.', check: { read: true } } },
    { tag: 'explore', title: 'Color-code it', sheet: 1, goal: { text: 'Highlight the problem (🟨), two causes (🟦), and two solutions (🟩).', button: 'Check my colors', check: function (s) { var P = s.hl_problem || [], C = s.hl_cause || [], So = s.hl_solution || []; return P.indexOf('p1') >= 0 && C.indexOf('c1') >= 0 && C.indexOf('c2') >= 0 && So.indexOf('s1') >= 0 && So.indexOf('s2') >= 0; }, why: function (s) { return 'Check each color. Problem: what was wrong? Causes: WHY was it happening? Solutions: what did students DO?'; } } },
    { tag: 'reason', title: 'Cause and effect chain', sheet: 2, q: { type: 'order', q: 'Put the cause-effect chain in order.', items: ['Rain washes fertilizer into the creek', 'Algae grows very fast', 'Algae uses up oxygen', 'Fewer fish can survive'] } },
    { tag: 'reason', title: 'Why flowers?', sheet: 2, q: { type: 'mc', q: 'How do native flowers help the creek?', choices: ['Their roots soak up rainwater before it carries pollution to the creek', 'They make the creek smell nice', 'Fish eat them'], answer: 0 } },
    { tag: 'write', title: 'Write the brief', sheet: 3, q: { type: 'write', q: 'Write a brief for the city council.', parts: [
      { label: 'Problem', starter: 'The problem was that', min: 8, need: [{ words: ['cloudy', 'fish', 'minnows', 'polluted', 'dirty'], label: 'Names the problem' }] },
      { label: 'Causes', starter: 'This happened because', min: 10, need: [{ words: ['fertilizer', 'litter', 'trash'], label: 'Names a cause' }, { words: ['algae', 'oxygen', 'rain'], label: 'Explains how it hurt the creek' }] },
      { label: 'Solutions', starter: 'To solve it, students', min: 10, need: [{ words: ['clean', 'trash', 'litter'], label: 'Names the clean-up' }, { words: ['flowers', 'plants', 'native'], label: 'Names the planting' }] }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: evidence it worked', sheet: 4, q: { type: 'text', q: 'What evidence shows the solutions worked? Quote the text.', min: 10, quote: true, need: [{ words: ['clearer', 'coming back', 'minnows'], label: 'Uses the results' }] } }
  ]
});

/* ======================= Vocabulary & figurative language ======================= */
SUNNY_SIMS.push({
  id: 'g5-ela-clue-decoder', std: 'g5-ela-vocab', subject: 'ela', grade: 5, code: '5.RC.11',
  title: 'Context Clue Decoder', model: 'clueDecoder', minutes: 20, icon: '🔍',
  setup: { items: [
    { s: 'The [[arid]] desert had not seen rain in months, so the ground was cracked and dry.', clue: ['dry', 'rain', 'cracked'], type: 'synonym', choices: ['very dry', 'very cold', 'crowded'], answer: 0 },
    { s: 'A [[botanist]], a scientist who studies plants, visited our class to talk about seeds.', clue: ['scientist', 'studies', 'plants'], type: 'definition', choices: ['a plant scientist', 'a bus driver', 'a painter'], answer: 0 },
    { s: 'Unlike her timid brother, who hid behind the couch, Rosa was bold and marched right up to the stage.', clue: ['unlike', 'hid'], type: 'antonym', choices: ['shy and fearful', 'loud and brave', 'tall'], answer: 0, target: 'timid' },
    { s: 'The market sold many kinds of [[produce]], such as apples, spinach, carrots, and pears.', clue: ['apples', 'spinach', 'carrots', 'pears', 'such'], type: 'example', choices: ['fruits and vegetables', 'toys', 'machines'], answer: 0 },
    { s: 'After running the whole race, Marcus was so [[famished]] that he ate three sandwiches in five minutes.', clue: ['ate', 'three', 'sandwiches', 'running'], type: 'inference', choices: ['extremely hungry', 'very happy', 'sleepy'], answer: 0 }
  ] },
  place: 'Sunnyside Reading Room · Word Detective Agency',
  mission: 'Five mystery words have shown up in library books. Crack each case by finding the context clues, naming the type of clue, and testing the meaning in the sentence.',
  question: 'How can context clues help us figure out unknown words?',
  takeaway: 'Context clues are the words around an unknown word. They can give a definition, a synonym (same meaning), an antonym (opposite, with words like "unlike"), examples ("such as"), or a general sense of the situation. Test a meaning by substituting it into the sentence.',
  vocab: [['Context clue', 'Hints in the nearby words that help you figure out a word.'], ['Synonym', 'A word with the same meaning.'], ['Antonym', 'A word with the opposite meaning.'], ['Substitute', 'Put one word in place of another to test it.']],
  warmup: { style: 'Guess the word', prompt: 'Use the clue to guess the meaning.', items: [['The puppy was so exhausted, so tired, that it fell asleep in its bowl.', 'Very tired (synonym clue).'], ['Unlike the noisy cafeteria, the library was serene.', 'Calm and quiet (antonym clue).'], ['What words often signal an example clue?', '"Such as," "for example," "like."']] },
  steps: [
    { tag: 'explore', title: 'Case 1', goal: { text: 'Solve Case 1: find a clue word, name the clue type, and choose the meaning.', check: { solved_0: true } }, q: { type: 'mc', q: 'Which clue helped the most with "arid"?', choices: ['"had not seen rain" and "dry"', '"desert" only', '"months"'], answer: 0 } },
    { tag: 'test', title: 'Crack all five cases', sheet: 1, goal: { text: 'Solve all 5 cases.', check: { allSolved: true } },
      q: { type: 'table', q: 'Record each case.', rowHead: 'Word', cols: [{ label: 'Clue type', value: function (s, r) { return r.t; } }], rows: [{ label: 'botanist', t: 'definition' }, { label: 'timid', t: 'antonym' }, { label: 'produce', t: 'example' }], tip: 'Type the clue type: definition, synonym, antonym, example, or inference.' } },
    { tag: 'reason', title: 'Signal words', sheet: 2, q: { type: 'sort', q: 'Which clue type does each signal word or phrase suggest?', bins: ['Definition', 'Antonym', 'Example'], items: [['which means', 0], ['unlike', 1], ['such as', 2], ['but', 1], ['for example', 2], [', a (noun) that…,', 0]] } },
    { tag: 'write', title: 'Use the words', sheet: 3, q: { type: 'text', q: 'Write one sentence using "famished" and one using "arid." Include a context clue in each!', rows: 3, min: 16, need: [{ words: ['famished'], label: 'Uses famished' }, { words: ['arid'], label: 'Uses arid' }, { words: ['hungry', 'ate', 'eat', 'food', 'dry', 'rain', 'desert', 'water'], label: 'Includes context clues' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: write a clue', sheet: 4, q: { type: 'text', q: 'Write a sentence for the word "gregarious" (friendly, likes being with others) that uses an ANTONYM clue.', min: 12, need: [{ words: ['gregarious'], label: 'Uses the word' }, { words: ['unlike', 'but', 'however', 'instead', 'while'], label: 'Uses an antonym signal' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-word-forge', std: 'g5-ela-vocab', subject: 'ela', grade: 5, code: '5.RC.13',
  title: 'Greek & Latin Word Forge', model: 'wordLab', minutes: 20, icon: '🔨',
  setup: {
    prefixes: [['re', 'again, back'], ['pre', 'before'], ['in', 'not'], ['trans', 'across'], ['tele', 'far']],
    roots: [['port', 'carry'], ['vis', 'see'], ['dict', 'say'], ['aud', 'hear'], ['graph', 'write'], ['spect', 'look']],
    suffixes: [['able', 'able to be'], ['ible', 'able to be'], ['ion', 'act of'], ['ator', 'one who'], ['er', 'one who']],
    words: { 'port+able': 'able to be carried', 'trans+port': 'to carry across', 're+port': 'to carry back news', 'port+er': 'one who carries bags', 'vis+ible': 'able to be seen', 'in+vis+ible': 'not able to be seen', 'vis+ion': 'the act of seeing', 'pre+dict': 'to say something before it happens', 'dict+ion': 'the way someone says words', 'aud+ible': 'able to be heard', 'in+aud+ible': 'not able to be heard', 'tele+graph': 'a machine that writes messages far away', 'spect+ator': 'one who watches', 're+vis+ion': 'the act of seeing again (to improve writing)' },
    targets: [['able to be carried', 'port+able'], ['not able to be seen', 'in+vis+ible'], ['to say something before it happens', 'pre+dict'], ['one who watches', 'spect+ator'], ['able to be heard', 'aud+ible']]
  },
  place: 'Sunnyside Reading Room · Word Forge',
  mission: 'The Word Forge builds English words from Greek and Latin parts. Fill word orders by combining prefixes, roots, and suffixes, and discover how knowing word parts unlocks thousands of words.',
  question: 'How do Greek and Latin roots and affixes help us figure out word meanings?',
  takeaway: 'Many English words are built from parts. The root carries the core meaning (port = carry), a prefix changes it (trans = across), and a suffix changes how it\'s used (able = able to be). Knowing a few parts helps you figure out many new words.',
  vocab: [['Root', 'The main part of a word that carries its meaning.'], ['Prefix', 'A part added to the front of a word.'], ['Suffix', 'A part added to the end of a word.'], ['Affix', 'A prefix or a suffix.']],
  warmup: { style: 'Break it apart', prompt: 'Split each word into parts and guess the meaning.', items: [['rewrite', 're + write = write again.'], ['unhappy', 'un + happy = not happy.'], ['teacher', 'teach + er = one who teaches.']] },
  steps: [
    { tag: 'explore', title: 'First order', goal: { text: 'Forge a word that means "able to be carried."', check: { target_0: true } }, q: { type: 'mc', q: 'Which part means "carry"?', choices: ['port', 'able', 'trans'], answer: 0 } },
    { tag: 'test', title: 'Fill the orders', sheet: 1, goal: { text: 'Forge the words for orders 2 through 5 (use Next order).', check: { target_1: true, target_2: true, target_3: true, target_4: true } },
      q: { type: 'table', q: 'Record each word and its parts.', rowHead: 'Meaning', cols: [{ label: 'Word', value: function (s, r) { return r.w; } }], rows: [{ label: 'not able to be seen', w: 'invisible' }, { label: 'to say before it happens', w: 'predict' }, { label: 'one who watches', w: 'spectator' }] } },
    { tag: 'explore', title: 'Free forge', sheet: 2, goal: { text: 'Forge at least 8 real words in total.', check: { forged: { gte: 8 } } } },
    { tag: 'reason', title: 'Use the parts', sheet: 3, q: { type: 'mc', q: 'Using word parts, what does "inaudible" most likely mean?', choices: ['not able to be heard', 'able to be seen', 'one who hears'], answer: 0 } },
    { tag: 'reason', title: 'New word', sheet: 3, q: { type: 'mc', q: 'You\'ve never seen "import." Using "im = into" and "port = carry," what does it mean?', choices: ['to carry goods into a country', 'to be very important', 'to leave a port'], answer: 0 } },
    { tag: 'write', title: 'Explain a word', sheet: 4, q: { type: 'text', q: 'Choose a word you forged. Explain how its parts give its meaning, and use it in a sentence.', rows: 3, min: 16, need: [{ words: ['means', 'mean', 'meaning'], label: 'Explains what the parts mean' }, { words: ['port', 'vis', 'dict', 'aud', 'graph', 'spect'], label: 'Names a root' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: word family', sheet: 5, q: { type: 'text', q: 'List four words that share the root "port" and explain how each connects to "carry."', min: 20, need: [{ words: ['transport', 'portable', 'report', 'porter', 'import', 'export', 'support'], label: 'Lists port words' }, { words: ['carry', 'carries', 'carried'], label: 'Connects to "carry"' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-figurative-poem', std: 'g5-ela-vocab', subject: 'ela', grade: 5, code: '5.RC.14',
  title: 'Figurative Language Translator', model: 'figTranslator', minutes: 20, icon: '🎨',
  setup: { title: 'Saturday at Sunnyside Park', by: 'A Sunnyside original poem', lines: [
    { id: 'f1', t: 'The morning sun was a golden coin', type: 'metaphor' }, 'tossed high above the trees.',
    { id: 'f2', t: 'The wind whispered secrets to the leaves', type: 'personification' }, 'and tickled the grass with its breeze.', '',
    { id: 'f3', t: 'My little brother ran as fast as a rocket', type: 'simile' }, 'to reach the swings before me.',
    { id: 'f4', t: '"I\'ve waited a million years!" he cried,', type: 'hyperbole' }, 'as happy as could be.', '',
    { id: 'f5', t: 'When storm clouds rolled in, Dad said, "Let\'s hit the road,"', type: 'idiom' }, 'and we raced home, soaked but free.'
  ] },
  place: 'Sunnyside Reading Room · Poetry Corner',
  mission: 'This poem is packed with figurative language: words that mean more than they say. Identify each type, then translate the lines into plain, literal language so a younger reader can understand.',
  question: 'How do similes, metaphors, personification, idioms, and hyperbole create meaning?',
  takeaway: 'Figurative language compares or exaggerates to create pictures in the reader\'s mind. Similes compare with "like" or "as"; metaphors say one thing IS another; personification gives human actions to things; hyperbole exaggerates; idioms are sayings whose meaning differs from the literal words.',
  vocab: [['Simile', 'A comparison using like or as.'], ['Metaphor', 'A comparison that says one thing IS another.'], ['Personification', 'Giving human qualities to non-human things.'], ['Hyperbole', 'A huge exaggeration.'], ['Idiom', 'A saying with a meaning different from its words.']],
  warmup: { style: 'Name that figure', prompt: 'Identify each type.', items: [['"My backpack weighs a ton."', 'Hyperbole.'], ['"The classroom was a zoo."', 'Metaphor.'], ['"The alarm clock screamed."', 'Personification.']] },
  steps: [
    { tag: 'read', title: 'Tag the poem', sheet: 1, goal: { text: 'Tag all five highlighted-able lines with the correct type.', check: { allRight: true } } },
    { tag: 'reason', title: 'Simile vs. metaphor', sheet: 2, q: { type: 'mc', q: 'How is "The morning sun was a golden coin" different from "ran as fast as a rocket"?', choices: ['The first says the sun IS a coin (metaphor); the second uses "as" (simile)', 'They are both similes', 'Neither compares anything'], answer: 0 } },
    { tag: 'write', title: 'Translate: personification', sheet: 3, q: { type: 'text', q: 'Translate "The wind whispered secrets to the leaves" into literal language.', rows: 2, min: 6, need: [{ words: ['wind'], label: 'Mentions the wind' }, { words: ['soft', 'quiet', 'gentle', 'lightly', 'rustl', 'blew', 'moved'], label: 'Says what really happened' }], avoid: [['whisper', 'Doesn\'t just repeat "whispered"']] } },
    { tag: 'write', title: 'Translate: hyperbole & idiom', sheet: 4, q: { type: 'write', q: 'Translate each line literally.', parts: [
      { label: '"I\'ve waited a million years!"', min: 5, need: [{ words: ['long', 'forever', 'wait', 'waited'], label: 'Explains he waited a long time' }], avoid: [['million', 'Removes the exaggeration']] },
      { label: '"Let\'s hit the road."', min: 4, need: [{ words: ['leave', 'go', 'home', 'going'], label: 'Explains the real meaning (leave)' }] }] } },
    { tag: 'reason', title: 'Why use it?', sheet: 5, q: { type: 'mc', q: 'Why might the poet say the sun was "a golden coin" instead of "the sun was bright"?', choices: ['It creates a vivid picture of how shiny and round the sun looked', 'Coins are worth money', 'It is easier to understand'], answer: 0 } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: write your own', sheet: 6, q: { type: 'text', q: 'Write two lines about lunchtime: one simile and one personification.', min: 14, need: [{ words: ['like', 'as'], label: 'Includes a simile' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-idiom-street', std: 'g5-ela-vocab', subject: 'ela', grade: 5, code: '5.RC.14',
  title: 'Idiom Street', model: 'idiomStreet', minutes: 15, icon: '🏘️',
  setup: { people: [
    { who: 'The mail carrier', emoji: '👮', says: 'It\'s raining cats and dogs out here!', literal: '🌧🐱🐶', choices: ['Animals are falling from the sky', 'It is raining very hard', 'The pets are wet'], answer: 1 },
    { who: 'The baker', emoji: '👨‍🍳', says: 'This cake recipe is a piece of cake.', literal: '🍰🧩', choices: ['The recipe is made of cake', 'The recipe is very easy', 'The recipe is delicious'], answer: 1 },
    { who: 'The coach', emoji: '🧢', says: 'Break a leg at the game tonight!', literal: '🦵💥', choices: ['Good luck!', 'Be careful not to fall', 'Run very fast'], answer: 0 },
    { who: 'Grandma', emoji: '👵', says: 'I\'m feeling under the weather today.', literal: '☁️🧍', choices: ['She is standing under clouds', 'She feels a little sick', 'She loves rainy days'], answer: 1 },
    { who: 'The librarian', emoji: '📚', says: 'Don\'t spill the beans about the surprise party!', literal: '🫘🫗', choices: ['Don\'t drop the snacks', 'Don\'t tell the secret', 'Don\'t cook beans'], answer: 1 }
  ] },
  place: 'Sunnyside Reading Room · Idiom Street',
  mission: 'The people of Idiom Street keep saying strange things! Visit each neighbor, compare the silly literal picture with what they really mean, and build an idiom dictionary.',
  question: 'How do we figure out what an idiom really means?',
  takeaway: 'An idiom is a saying whose meaning is different from the literal meaning of its words. Use the situation (context) to figure it out: "It\'s raining cats and dogs" means it is raining very hard.',
  vocab: [['Idiom', 'A saying whose meaning differs from its words.'], ['Literal', 'Exactly what the words say.'], ['Figurative', 'Not meant word for word.'], ['Context', 'The situation around the words.']],
  warmup: { style: 'Draw it literally', prompt: 'Sketch the literal meaning, then write the real meaning.', items: [['"Hold your horses."', 'Wait / be patient.'], ['"Cold feet."', 'Being nervous about doing something.'], ['"Once in a blue moon."', 'Very rarely.']] },
  steps: [
    { tag: 'explore', title: 'Visit the neighbors', sheet: 1, goal: { text: 'Visit every neighbor and choose what each one REALLY means.', check: { allSolved: true } } },
    { tag: 'record', title: 'Idiom dictionary', sheet: 2, q: { type: 'sort', q: 'Match each idiom to its meaning.', bins: ['Easy', 'Good luck', 'A little sick', 'Keep a secret'], items: [['a piece of cake', 0], ['break a leg', 1], ['under the weather', 2], ['don\'t spill the beans', 3]] } },
    { tag: 'reason', title: 'Use context', sheet: 3, q: { type: 'mc', q: '"My brother has cold feet about the diving board." Using context, what does "cold feet" mean?', choices: ['He is nervous about jumping', 'His feet are freezing', 'He forgot his shoes'], answer: 0 } },
    { tag: 'write', title: 'Idiom in a story', sheet: 4, q: { type: 'text', q: 'Write 2 sentences that use one idiom from Idiom Street correctly. Make the context show its meaning.', rows: 3, min: 14, need: [{ words: ['piece of cake', 'break a leg', 'under the weather', 'spill the beans', 'raining cats and dogs'], label: 'Uses an idiom from the street' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: explain an idiom', sheet: 5, q: { type: 'text', q: 'Explain why an English learner might be confused by "spill the beans," and how context helps.', min: 14, need: [{ words: ['literal', 'words', 'beans'], label: 'Explains the literal confusion' }, { words: ['context', 'situation', 'clue'], label: 'Explains how context helps' }] } }
  ]
});

SUNNY_SIMS.push({
  id: 'g5-ela-pumpkin-words', std: 'g5-ela-vocab', subject: 'ela', grade: 5, code: '5.RC.11',
  title: 'Vocabulary in Action: The Pumpkin Regatta', model: 'reader', minutes: 20, icon: '🎃',
  setup: { title: 'The Great Pumpkin Regatta', genre: 'Informational article', img: '🎃🚣', tools: [['word', '🟪 Tricky word'], ['clue', '🟩 Context clue']], paragraphs: [
    "Every October, a small town holds a {w1|regatta}, a boat race, with a very unusual kind of boat. The racers paddle giant hollowed-out pumpkins across a lake!",
    "The pumpkins are {w2|colossal}. {c2|Some weigh more than 1,000 pounds, heavier than a grand piano.} Farmers spend all summer caring for them, watering them every day and protecting them from frost.",
    "Paddling a pumpkin is not easy. The round boats {w3|wobble} and spin, and racers often tip over. {c3|They must keep their balance and paddle with slow, steady strokes, or they will topple into the chilly water.}",
    "The crowd cheers for every racer, even the ones who end up soaking wet. {c4|For the town, the regatta is a jubilant celebration, full of laughter, music, and joy.}"
  ] },
  place: 'Sunnyside Reading Room · Word Wall',
  mission: 'The Pumpkin Regatta article has four tricky words. Mark each word and its context clue, figure out the meanings, and prove you can use the words in your own writing.',
  question: 'How do context clues in a real text help us understand new vocabulary?',
  takeaway: 'Authors often place clues near tricky words: a definition after a comma (regatta, a boat race), a comparison (heavier than a grand piano), or a description of what happens. Reading around the word helps you figure it out.',
  vocab: [['Regatta', 'A boat race.'], ['Colossal', 'Extremely large.'], ['Topple', 'To fall over.'], ['Jubilant', 'Full of great joy.']],
  warmup: { style: 'Guess and check', prompt: 'Guess each meaning, then check after reading.', items: [['colossal', 'Very large.'], ['jubilant', 'Very happy.'], ['wobble', 'Move unsteadily side to side.']] },
  steps: [
    { tag: 'read', title: 'Read the article', goal: { text: 'Read and press ✓ I finished reading.', check: { read: true } } },
    { tag: 'explore', title: 'Mark the clues', sheet: 1, goal: { text: 'Use 🟩 Context clue to highlight the clue sentences for "colossal," "wobble," and "jubilant."', button: 'Check', check: function (s) { var c = s.hl_clue || []; return c.indexOf('c2') >= 0 && c.indexOf('c3') >= 0 && c.indexOf('c4') >= 0; }, no: 'Each clue is right next to the tricky word.' } },
    { tag: 'record', title: 'Word meanings', sheet: 2, q: { type: 'sort', q: 'Match each word to its meaning.', bins: ['a boat race', 'extremely large', 'move unsteadily', 'full of joy'], items: [['regatta', 0], ['colossal', 1], ['wobble', 2], ['jubilant', 3]] } },
    { tag: 'reason', title: 'Which clue?', sheet: 3, q: { type: 'mc', q: 'What kind of clue helps with "regatta"?', choices: ['A definition right after the word ("a boat race")', 'An antonym', 'An example list'], answer: 0 } },
    { tag: 'write', title: 'Use them', sheet: 4, q: { type: 'text', q: 'Write a short paragraph (3 sentences) about a fun event, using "colossal" and "jubilant" correctly.', rows: 4, min: 25, need: [{ words: ['colossal'], label: 'Uses colossal' }, { words: ['jubilant'], label: 'Uses jubilant' }] } },
    { tag: 'challenge', levels: ['legend'], title: 'Legend: explain with a quote', sheet: 5, q: { type: 'text', q: 'Explain how the author helps you understand "colossal." Quote the clue.', min: 14, quote: true, need: [{ words: ['heavy', 'big', 'large', 'weigh', 'piano'], label: 'Connects the clue to the meaning' }] } }
  ]
});
