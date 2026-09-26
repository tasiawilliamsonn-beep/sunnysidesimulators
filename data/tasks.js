/*
 * Written evidence tasks and quest bosses.
 * Each task is added as the last challenge of the room's final stage (see apply-fx.js).
 * Frames: RACE (ELA), CER (science), SOURCE (social studies), MATH (solve, show, explain).
 */
window.CX_TASKS = {
  /* ---------- bosses for quest rooms ---------- */
  'g5-sci-moon-quest': { boss: 'The Eclipse Gremlin' },
  'g5-sci-decomposer-dash': { boss: 'King Rot' },
  'g5-ss-branches-quest': { boss: 'The Power Grabber' },
  'g5-ela-summary-showdown': { boss: 'The Detail Dragon' },
  'g5-math-fraction-trail': { boss: 'The Fraction Fiend' },
  'g5-math-aquarium-quest': { boss: 'The Leaky Kraken' },
  'g6-sci-vapor-quest': { boss: 'The Drought Demon' },
  'g6-sci-tides-quest': { boss: 'The Moon Muddler' },
  'g6-ss-castle-quest': { boss: 'The Black Knight' },
  'g6-ela-word-quest': { boss: 'The Vocabulary Vampire' },
  'g6-math-balance-quest': { boss: 'Tipsy the Troll' },
  'g6-math-sonar-quest': { boss: 'The Deep-Sea Glitch' },

  /* ---------- science: CER ---------- */
  'g5-sci-missing-mass': { task: {
    frame: 'CER',
    q: 'Final report for the judge: Did Lily\'s fizzing experiment really make 2 grams of matter disappear forever? Write a claim, evidence, and reasoning.',
    keys: ['lily', 'matter', 'mass', 'disappear', 'grams'],
    vocab: ['gas', 'closed system', 'conservation', 'chemical change', 'escaped'],
    evidence: ['Lily put an antacid tablet (5 g) into a cup of water (100 g)', 'The open cup then weighed 103 g', 'Fizzing and bubbles are evidence that a new gas'],
    hint: 'Add the starting masses. Compare them to the ending mass. Where could the "missing" matter have gone?',
    exemplar: {
      C: 'I claim that Lily\'s matter did not disappear. The missing 2 grams escaped into the air as a gas.',
      E: 'The tablet and water started at 5 g + 100 g = 105 g, but "The open cup then weighed 103 g" after it fizzed.',
      R: 'This happens because fizzing is a chemical change that makes a new gas. The cup was open, so the gas escaped. In a closed system, conservation of mass means it would still weigh 105 g.'
    } } },
  'g6-sci-cold-cocoa': { task: {
    frame: 'CER',
    q: 'Case report: Why does cocoa get cold fastest in a metal mug with no lid by the window? Recommend the best fix for the lodge.',
    keys: ['cocoa', 'cold', 'mug', 'lid', 'window', 'metal'],
    vocab: ['conduction', 'convection', 'radiation', 'heat transfer', 'particles', 'insulator'],
    evidence: [{ d: 'Data: metal mug, no lid, by the window: 70 °C → 38 °C in 10 minutes' }, { d: 'Data: ceramic mug with a lid, by the window: 70 °C → 58 °C in 10 minutes' }, { d: 'Data: metal mug, no lid, by the fireplace: 70 °C → 49 °C in 10 minutes' }, 'the mugs are too hot to hold at first, then the cocoa gets cold fast'],
    hint: 'Compare how many degrees each mug lost. Which kinds of heat transfer does a lid block? What does a ceramic mug block?',
    exemplar: {
      C: 'I claim that metal mugs with no lid lose heat fastest, so the lodge should switch back to ceramic mugs with lids.',
      E: 'Every mug started at 70 °C. The metal mug with no lid by the window dropped to 38 °C, a loss of 32 degrees, but the ceramic mug with a lid only dropped to 58 °C.',
      R: 'This happens because metal is a conductor, so heat moves by conduction from the cocoa into the mug and the cold air. With no lid, warm air and steam rise away by convection. Ceramic is an insulator and the lid traps the heat, so the particles stay faster and the cocoa stays warm.'
    } } },

  /* ---------- social studies: historian's claim with source check ---------- */
  'g5-ss-midnight-messenger': { task: {
    frame: 'SOURCE',
    q: 'Case summary for the Patriot leaders: Can historians prove who fired the first shot at Lexington? Use the town record and the two primary sources.',
    keys: ['lexington', 'fired', 'first shot', 'shot'],
    vocab: ['primary source', 'bias', 'point of view', 'minutemen', 'perspective'],
    evidence: ['Someone fired a shot; no one knows who.', 'British troops fired on innocent farmers at Lexington in a cruel attack!', 'Our men were fired upon by rebels hiding behind walls. We acted to defend ourselves.', 'about 77 minutemen gathered on Lexington Green. About 700 British soldiers arrived.'],
    hint: 'Each side blames the other. Why might each source tell the story its own way?',
    exemplar: {
      C: 'I claim that historians cannot prove who fired the first shot at Lexington.',
      E: 'The town record says, "Someone fired a shot; no one knows who." The Patriot newspaper says the British "fired on innocent farmers," but the British officer says his men "were fired upon by rebels."',
      S: 'Both are primary sources written by people on opposite sides, so each has bias. The Patriot newspaper wanted colonists angry at Britain, and the officer wanted to defend his soldiers.',
      X: 'This matters because the two sources disagree and each has a reason to blame the other, so we should only trust the facts they share: about 77 minutemen faced about 700 soldiers and fighting began.'
    } } },
  'g6-ss-plague-detective': { task: {
    frame: 'SOURCE',
    q: 'Case report: How did the Black Death change life for peasants who survived? Use the town census and the lord\'s letter.',
    keys: ['black death', 'plague', 'peasants', 'survived', 'changed'],
    vocab: ['labor', 'wages', 'shortage', 'feudal', 'primary source', 'manor'],
    evidence: [{ d: 'Census: 12,000 people in 1347 and 7,800 people in 1350' }, 'There are not enough workers to harvest my fields.', 'The peasants demand wages, and when I refuse, they leave for another lord who will pay them!'],
    hint: 'Fewer people means fewer workers. What can workers do when lords need them badly?',
    exemplar: {
      C: 'I claim that the Black Death gave surviving peasants more power because workers became scarce.',
      E: 'The census shows the town fell from 12,000 people in 1347 to 7,800 in 1350, a loss of 4,200. The lord wrote, "There are not enough workers to harvest my fields."',
      S: 'The letter is a primary source written by a lord in 1352. He was angry, so he complains, but his complaint shows the problem was real for lords.',
      X: 'This matters because with so few workers, peasants could demand wages and leave for a better lord, which weakened the feudal system of serfs bound to the land.'
    } } },

  /* ---------- ELA: RACE ---------- */
  'g5-ela-context-caper': { task: {
    frame: 'RACE',
    q: 'What does the word "immaculate" mean in Mr. Hale\'s confession, and what context clue helps you figure it out?',
    keys: ['immaculate', 'mean', 'clue', 'mr. hale', 'confession'],
    vocab: ['context clue', 'definition', 'restatement', 'meaning'],
    evidence: ['I wanted to polish it until it was immaculate, perfectly clean without a single spot, before the ceremony.', 'I only borrowed the trophy.', 'I didn\'t mean to cause such turmoil.'],
    hint: 'Look at the words right after "immaculate," after the comma.',
    exemplar: {
      R: 'In Mr. Hale\'s confession, the word immaculate has a clue right next to it.',
      A: 'Immaculate means perfectly clean and spotless.',
      C: 'According to the text, he wanted to polish the trophy "until it was immaculate, perfectly clean without a single spot."',
      E: 'This shows the author used a definition context clue. The words after the comma restate the meaning of immaculate, so I know it means perfectly clean.'
    } } },
  'g6-ela-evidence-vault': { task: {
    frame: 'RACE',
    q: 'How does Darius change from the beginning to the end of "The Last Game"? Support your answer with evidence from the story.',
    keys: ['darius', 'change', 'changes', 'beginning', 'end'],
    vocab: ['confidence', 'ashamed', 'theme', 'mistake', 'character'],
    evidence: ['Since then, he had stopped wearing his team cap to school.', 'Darius said, "Maybe later," and closed his bedroom door.', 'Keep your elbow up,', 'That night, Darius dug his cap out from under his bed and hung it back on its hook by the door.'],
    hint: 'Compare what Darius does with his cap at the beginning and at the end.',
    exemplar: {
      R: 'In "The Last Game," Darius changes from the beginning to the end of the story.',
      A: 'He changes from ashamed and avoiding baseball to confident and ready to play again.',
      C: 'At first, "he had stopped wearing his team cap to school," but at the end he "dug his cap out from under his bed and hung it back on its hook."',
      E: 'This shows that teaching Kofi reminded Darius that mistakes are part of getting better, so his confidence returned and he is ready to be part of the team again.'
    } } },
  'g6-ela-theme-quest': { task: {
    frame: 'RACE',
    q: 'What theme does the story develop through the way Elena changes? Cite evidence from two different parts of the story.',
    keys: ['theme', 'elena', 'change', 'story'],
    vocab: ['theme', 'teamwork', 'accept help', 'character', 'turning point'],
    evidence: ['"Partners just slow you down," she told her mom', '"I\'ve got it," Elena snapped.', '"Is your uncle\'s offer still open?"', 'on next year\'s calendar, wrote two names instead of one.'],
    hint: 'What did Elena believe about partners at the start? What does she write at the end?',
    exemplar: {
      R: 'The story develops a theme through the way Elena changes.',
      A: 'The theme is that accepting help from others can make us stronger than working alone.',
      C: 'At the start Elena says, "Partners just slow you down," but at the end she "wrote two names instead of one."',
      E: 'This shows Elena learned that teamwork helped her succeed, because Sam\'s help fixed her filter. Her change from refusing help to planning with a partner is how the author builds the theme.'
    } } },

  /* ---------- math: solve, show, explain ---------- */
  'g5-math-bakery-mystery': { task: {
    frame: 'MATH',
    q: 'Catch the saboteur: Ms. Bell started with a 5-cup bag of flour. She used 2 1/4 cups on Monday and 1 1/2 cups on Wednesday. How much flour should be left?',
    unit: 'cups',
    answer: ['1 1/4', '1.25', '5/4'],
    vocab: ['subtract', 'add', 'mixed number', 'common denominator', 'fourths', 'regroup'],
    hint: 'Add what she used first: 2 1/4 + 1 1/2. Rename 1/2 as 2/4. Then subtract from 5.',
    exemplar: {
      S: '2 1/4 + 1 2/4 = 3 3/4 cups used. 5 − 3 3/4 = 4 4/4 − 3 3/4 = 1 1/4 cups left.',
      E: 'First I added the flour she used, so I renamed 1/2 as 2/4 to get a common denominator. Then I subtracted from 5 cups by regrouping 5 as 4 4/4, because you need fourths to subtract 3/4.'
    } } },
  'g6-math-sale-scam': { task: {
    frame: 'MATH',
    q: 'Final report: The sign says the $50 sneakers are "30% off, then an EXTRA 20% off. That\'s 50% off, only $25!" What is the real final price?',
    unit: 'dollars',
    answer: ['28', '28.00', '$28'],
    vocab: ['percent', 'discount', 'original price', 'sale price', 'of'],
    hint: 'Take 30% off $50 first. Then take 20% off the NEW price, not the original price.',
    exemplar: {
      S: '30% of 50 = 0.30 × 50 = 15, and 50 − 15 = 35. Then 20% of 35 = 0.20 × 35 = 7, and 35 − 7 = 28.',
      E: 'First I found the 30% discount of the original price and subtracted it. The second discount is a percent of the new $35 price, so it only saves $7. That means the real price is $28, which is only 44% off, not 50% off.'
    } } }
};
