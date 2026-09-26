/* Grade 5 ELA rooms. All passages are original. */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 5.RL.2.2 Theme & Summary ---------- */
{
  id: 'g5-ela-story-gallery', std: 'g5-ela-theme', format: 'gallery',
  title: 'The Story Gallery',
  tagline: 'Five short fables hang on the gallery walls. Discover the life lesson hidden in each.',
  story: '<p>The Riverbend Library has opened a gallery where every frame holds a short story instead of a painting. The librarian, Mr. Okafor, says each story hides a <b>theme</b>, a lesson about life.</p><p>Remember: a <b>topic</b> is one or two words (like "friendship"). A <b>theme</b> is a full sentence about life (like "True friends help each other even when it is hard").</p>',
  code: 'LEARN',
  stages: [
    { title: 'The Ant and the Cricket', content: '<p>All summer, Cricket played his fiddle in the sunny meadow while Ant hauled seeds into her tunnel. "Come dance!" Cricket called. "There is plenty of time."</p><p>"Winter always comes," Ant answered, and kept working.</p><p>When the first snow fell, Cricket shivered outside Ant\'s door with an empty stomach. Ant let him in and shared her seeds. "Next summer," Cricket said quietly, "I will play my fiddle in the evening, after the work is done."</p>',
      puzzles: [
        { type: 'mc', q: 'What is the TOPIC of this story?', choices: ['Preparing for the future', 'Ant and Cricket should dance more', 'Cricket plays the fiddle in the evening', 'Snow is cold'], answer: 0 },
        { type: 'mc', q: 'Which is the best THEME statement?', choices: ['Planning ahead helps you get through hard times', 'Crickets play fiddles', 'Winter is a season', 'Ants live in tunnels'], answer: 0 },
        { type: 'mc', q: 'How does Cricket change by the end of the story?', choices: ['He decides to work first and play later', 'He stops playing music forever', 'He becomes angry at Ant', 'He moves to a warmer place'], answer: 0 }
      ] },
    { title: 'The Broken Vase', content: '<p>Priya was tossing a ball in the living room when it knocked Grandma\'s blue vase off the shelf. It shattered. Her little brother, Dev, was the only other person home.</p><p>When Grandma came in, she looked from the pieces to Dev. Dev\'s eyes filled with tears. Priya\'s heart pounded. She could stay quiet. Instead, she stepped forward. "It was me. I\'m sorry."</p><p>Grandma knelt and picked up a blue piece. "The vase I can glue," she said. "Trust is harder to fix. Thank you for keeping mine."</p>',
      puzzles: [
        { type: 'mc', q: 'What challenge does Priya face?', choices: ['Deciding whether to tell the truth or let Dev be blamed', 'Finding her ball', 'Buying a new vase', 'Cleaning her room'], answer: 0 },
        { type: 'mc', q: 'Which detail BEST supports the theme that honesty builds trust?', choices: ['"Trust is harder to fix. Thank you for keeping mine."', '"It shattered."', 'Priya was tossing a ball in the living room.', 'Dev was the only other person home.'], answer: 0 },
        { type: 'sort', q: 'Sort each statement.', buckets: ['Theme', 'Topic'], items: [['Honesty', 1], ['Telling the truth is worth the risk', 0], ['Family', 1], ['Owning your mistakes earns respect', 0]] }
      ] },
    { title: 'The Smallest Seed', content: '<p>Every spring, the students of Room 12 planted sunflower seeds in paper cups. Marcus\'s seed never sprouted. Every day he watered it, moved it to the sunniest spot, and checked it before anyone else arrived.</p><p>After three weeks, the other sunflowers stood tall, and his cup was still just dirt. "Give up," said Jonah. "It\'s dead."</p><p>On the twenty-fourth day, a tiny green loop pushed through the soil. By June, Marcus\'s sunflower was the tallest in the room, taller than Marcus himself.</p>',
      puzzles: [
        { type: 'mc', q: 'Which theme is BEST supported by the story?', choices: ['Patience and effort can pay off even when progress is slow', 'Sunflowers grow in June', 'Jonah is a bad friend', 'Never plant seeds in paper cups'], answer: 0 },
        { type: 'mc', q: 'Which detail shows Marcus\'s persistence?', choices: ['He watered it, moved it to the sunniest spot, and checked it every day', 'Jonah told him to give up', 'The other sunflowers stood tall', 'He was in Room 12'], answer: 0 }
      ] },
    { title: 'The Two Kites', content: '<p>Lena\'s kite was bright red with a long gold tail. Sam\'s was a plain brown paper kite he had made himself. At the park, Lena laughed. "Yours won\'t even fly."</p><p>The wind was gusty. Lena\'s kite spun, dove, and tangled in a tree. Sam\'s plain kite rose steady and high. Lena sat on the grass, cheeks hot.</p><p>Sam walked over and held out the string. "Want to fly it together?" As they ran across the field, Lena said, "I shouldn\'t have judged your kite by how it looked."</p>',
      puzzles: [
        { type: 'mc', q: 'What is a theme of "The Two Kites"?', choices: ['Don\'t judge something by its appearance', 'Red kites are the best', 'Kites get stuck in trees', 'Always fly kites on windy days'], answer: 0 },
        { type: 'mc', q: 'How does Sam respond to Lena\'s challenge?', choices: ['With kindness, by sharing his kite', 'By laughing at her', 'By going home', 'By breaking her kite'], answer: 0 },
        { type: 'mc', q: 'Which sentence shows that Lena learned a lesson?', choices: ['"I shouldn\'t have judged your kite by how it looked."', '"Yours won\'t even fly."', 'The wind was gusty.', 'Sam\'s plain kite rose steady and high.'], answer: 0 }
      ] },
    { title: 'Write a Summary', content: '<p>The last frame is empty with a note: <b>"Summarize one story."</b></p><p>A good summary tells the <b>main character, the problem, the most important events in order, and the resolution</b>. It is short, and it does <b>not</b> include opinions or small details.</p><p>Look back at "The Smallest Seed."</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the BEST summary of "The Smallest Seed"?', choices: ['Marcus\'s seed does not sprout for weeks, but he keeps caring for it. Finally it grows into the tallest sunflower in the room.', 'I loved this story. Marcus is my favorite character and Jonah was mean.', 'Room 12 plants seeds in paper cups every spring. The cups are on the windowsill.', 'Jonah says "Give up." On day twenty-four there is a green loop.'], answer: 0, hint: 'A summary includes the problem and the resolution, without opinions.' },
        { type: 'sort', q: 'Should each detail be in a summary of "The Smallest Seed"?', buckets: ['Include', 'Leave out'], items: [['Marcus\'s seed does not sprout', 0], ['He keeps caring for it', 0], ['It becomes the tallest sunflower', 0], ['The cups are made of paper', 1], ['I think Jonah is rude', 1]] }
      ] }
  ],
  finale: '<p>Mr. Okafor hangs a new frame by the exit with your name on it: <b>Theme Detective.</b> "Every story is trying to teach us something," he says. "Now you know how to find it."</p>',
  exit: [
    { q: 'Which is a THEME, not a topic?', choices: ['Courage', 'Friendship', 'Being brave means doing the right thing even when you are scared', 'Family'], answer: 2 },
    { q: 'What should a summary include?', choices: ['Your opinion of the story', 'Every detail', 'The main character, problem, key events, and resolution', 'Only the ending'], answer: 2 },
    { q: 'Choose one story from the gallery. State its theme in a full sentence and give one detail that supports it.', answer: 'Example: "The Two Kites": Don\'t judge things by how they look. Detail: Sam\'s plain kite flew while Lena\'s fancy kite crashed.', lines: 4 }
  ]
},
{
  id: 'g5-ela-lost-library', std: 'g5-ela-theme', format: 'escape',
  title: 'Escape the Lost Library',
  tagline: 'The library doors lock at midnight. Follow one story, chapter by chapter, to find the way out.',
  story: '<p>You stayed late to finish a book, and now the Lost Library has locked its doors. A glowing book floats down from the shelf: <b>The Lighthouse Keeper\'s Daughter</b>. Its chapters are locked. To escape, you must read each chapter and understand how the main character changes.</p>',
  code: 'BOOKS',
  stages: [
    { title: 'Chapter 1: The Storm Warning', content: '<p>Nora had lived at Gull Point Lighthouse her whole life. Her father kept the light burning so ships could find their way past the rocks. Nora was afraid of the tall spiral staircase. Its 112 steps creaked, and the top swayed in the wind. She had never climbed past step 40.</p><p>One October afternoon, the radio crackled: <i>"Storm approaching Gull Point. Winds 60 miles per hour."</i> Her father coughed and shivered in his chair. He had a high fever. "The lamp must be lit by dark," he whispered.</p>',
      puzzles: [
        { type: 'mc', q: 'What is Nora\'s problem at the start of the story?', choices: ['She is afraid of climbing the lighthouse stairs', 'She wants to leave the lighthouse', 'She lost her radio', 'She does not like her father'], answer: 0 },
        { type: 'mc', q: 'Why is the storm a big problem?', choices: ['Her father is sick and the lamp must be lit so ships stay safe', 'The lighthouse has no roof', 'Nora wants to go outside to play', 'The radio stopped working'], answer: 0 }
      ] },
    { title: 'Chapter 2: Step 40', content: '<p>As the sky darkened, Nora gripped the rail and started up. At step 40 her legs froze. Wind howled through the cracks. She looked down and her stomach flipped.</p><p>Through the small window she saw a light far out on the water: a fishing boat, rocking in the waves, heading straight for the rocks.</p><p>Nora thought of the fishermen\'s families waiting on shore. She took a breath, looked up instead of down, and climbed step 41.</p>',
      puzzles: [
        { type: 'mc', q: 'What makes Nora keep climbing?', choices: ['She sees a boat in danger and thinks of the people on it', 'Her father calls her', 'The stairs stop creaking', 'She hears music at the top'], answer: 0 },
        { type: 'mc', q: 'What does "looked up instead of down" suggest about Nora?', choices: ['She is choosing to focus on her goal instead of her fear', 'She is looking for birds', 'She is tired', 'She wants to go back down'], answer: 0 }
      ] },
    { title: 'Chapter 3: The Light', content: '<p>At the top, the glass room shook in the storm. Nora\'s hands trembled as she struck the match. The first one blew out. The second one blew out. She cupped the third match against her chest, turned her back to the wind, and touched it to the wick.</p><p>The great lamp flared. Its beam swept across the black water. Out on the waves, the fishing boat turned slowly away from the rocks and toward the safe harbor.</p>',
      puzzles: [
        { type: 'mc', q: 'Which word best describes Nora in this chapter?', choices: ['Determined', 'Lazy', 'Careless', 'Angry'], answer: 0 },
        { type: 'mc', q: 'What is the climax (turning point) of the story?', choices: ['Nora lights the lamp and the boat turns to safety', 'The radio announces a storm', 'Nora freezes on step 40', 'Her father gets sick'], answer: 0 }
      ] },
    { title: 'Chapter 4: Morning', content: '<p>The next morning, the storm had passed. A fisherman named Mr. Reyes knocked on the lighthouse door holding a basket of fresh fish. "Somebody lit that lamp just in time," he said. "My son and I would have hit the rocks."</p><p>Nora\'s father, still pale, squeezed her hand. "Were you scared?"</p><p>"The whole way," Nora said. "But I went anyway."</p><p>That evening, Nora climbed all 112 steps to light the lamp again, just to watch the sunset from the top.</p>',
      puzzles: [
        { type: 'mc', q: 'How has Nora changed from the beginning of the story?', choices: ['She has faced her fear and now climbs the stairs', 'She is still afraid and never climbs again', 'She decides to become a fisherman', 'She moves away from the lighthouse'], answer: 0 },
        { type: 'mc', q: 'What does Nora\'s line "Were you scared?" "The whole way. But I went anyway." reveal?', choices: ['Courage means acting even when you are afraid', 'Nora was never really afraid', 'Nora wants to leave', 'Her father is angry'], answer: 0 },
        { type: 'mc', q: 'Which is the BEST theme of the story?', choices: ['Being brave means doing what is needed even when you are afraid', 'Lighthouses have 112 steps', 'Storms are dangerous', 'Fishermen give good gifts'], answer: 0 }
      ] },
    { title: 'The Final Page: Summary', content: '<p>The last page of the book is blank except for one line: <b>"Tell my story in order, and the doors will open."</b></p>',
      puzzles: [
        { type: 'order', q: 'Put the key events of the story in order.', items: ['Nora\'s father gets sick as a storm approaches', 'Nora freezes on step 40', 'She sees a boat heading for the rocks and keeps climbing', 'She lights the lamp and the boat turns to safety', 'Mr. Reyes thanks her, and Nora climbs the stairs again'] },
        { type: 'mc', q: 'Which is the BEST one-sentence summary?', choices: ['When her father is sick during a storm, Nora overcomes her fear of the lighthouse stairs to light the lamp and save a fishing boat.', 'Nora lives in a lighthouse with 112 steps.', 'I think Nora is brave and I liked the story.', 'A fisherman brings a basket of fish.'], answer: 0 }
      ] }
  ],
  finale: '<p>The glowing book snaps shut and the library doors swing open. On the cover, a small drawing of a lighthouse beam sweeps across the page. You walk out into the night knowing that even stories about lighthouses can light the way.</p>',
  exit: [
    { q: 'In a story, how can you figure out the theme?', choices: ['Look at how the main character responds to a challenge and changes', 'Count the pages', 'Look only at the title', 'Find the longest word'], answer: 0 },
    { q: 'Which sentence would NOT belong in a summary?', choices: ['Nora lights the lamp.', 'The boat turns away from the rocks.', 'I think the story was too short.', 'Nora\'s father is sick.'], answer: 2 },
    { q: 'Write a theme for "The Lighthouse Keeper\'s Daughter" and explain how Nora\'s actions support it.', answer: 'Example: Courage means acting even when you are afraid. Nora is scared of the stairs but climbs them to light the lamp and save the boat.', lines: 4 }
  ]
},
{
  id: 'g5-ela-summary-showdown', std: 'g5-ela-theme', format: 'quest',
  title: 'Summary Showdown',
  tagline: 'Five levels of stories, poems, and drama. Can you sum them up and find their message?',
  story: '<p>Welcome to the <b>Summary Showdown</b>, a reading game show! Each level brings a new text: a story, a poem, and even a short play. Earn a letter at each level. Clear all five and you win the grand prize.</p>',
  code: 'STORY',
  stages: [
    { title: 'Level 1: Summary Rules', content: '<p>The host explains the rules. A strong summary is:</p><ul><li><b>Short</b>: just the most important ideas.</li><li><b>In order</b>: beginning, middle, end.</li><li><b>Objective</b>: no opinions like "I liked..." or "the best part..."</li><li><b>In your own words</b>: not copied sentences.</li></ul><p>A useful frame: <b>Somebody… Wanted… But… So… Then…</b></p>',
      puzzles: [
        { type: 'sort', q: 'Which belong in a summary?', buckets: ['Belongs in a summary', 'Does not belong'], items: [['The main character', 0], ['The main problem', 0], ['How the problem is solved', 0], ['"This was the best book ever!"', 1], ['The color of every character\'s shirt', 1], ['Key events in order', 0]] },
        { type: 'match', q: 'Match each part of the summary frame with its job.', pairs: [['Somebody', 'The main character'], ['Wanted', 'The goal'], ['But', 'The problem'], ['So', 'What the character did'], ['Then', 'How it ended']] }
      ] },
    { title: 'Level 2: A Story', content: '<p><b>The Lemonade Stand</b></p><p>Tomas wanted to earn money for a new bike, so he set up a lemonade stand. On the first day, nobody stopped; it was cold and rainy. Instead of quitting, Tomas asked his neighbor, Mrs. Liu, for advice. "Sell what people need today," she said. The next rainy morning, Tomas sold hot cocoa instead. By the end of the month, he had enough for the bike, and he bought Mrs. Liu a mug to say thanks.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the BEST summary?', choices: ['Tomas wants a bike, but no one buys lemonade on rainy days. After advice from Mrs. Liu, he sells hot cocoa and earns enough for the bike.', 'Tomas has a lemonade stand. It is rainy. Mrs. Liu is his neighbor.', 'Tomas is smart and I would buy his cocoa.', 'It rained. Tomas bought a mug.'], answer: 0 },
        { type: 'mc', q: 'Which theme fits the story?', choices: ['Being flexible and asking for help can lead to success', 'Lemonade tastes better than cocoa', 'Rain ruins everything', 'Bikes are expensive'], answer: 0 }
      ] },
    { title: 'Level 3: A Poem', content: '<p><b>The Oak</b></p><blockquote>The storm came howling, fierce and wild,<br>And bent the grass and flowers mild.<br>The tall oak groaned but held its ground,<br>Its roots stretched deep beneath the mound.<br>When morning came, the sky was clear,<br>The oak still stood, as year by year,<br>It learned that strength is not in height,<br>But in the roots that grip down tight.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What happens in the poem?', choices: ['A storm hits, but the oak survives because of its deep roots', 'The oak falls in the storm', 'Flowers grow taller than the oak', 'The poem is about a sunny day'], answer: 0 },
        { type: 'mc', q: 'What is the theme of the poem?', choices: ['True strength comes from a strong foundation, not from how you look', 'Storms happen in the morning', 'Oaks are taller than flowers', 'Grass is weak'], answer: 0 },
        { type: 'mc', q: 'Which lines state the theme most directly?', choices: ['"It learned that strength is not in height, / But in the roots that grip down tight."', '"The storm came howling, fierce and wild"', '"When morning came, the sky was clear"', '"And bent the grass and flowers mild."'], answer: 0 }
      ] },
    { title: 'Level 4: A Drama', content: '<p><b>The Science Fair</b> (a short play)</p><p>MAYA: (frustrated) Our volcano won\'t erupt! The fair starts in an hour.<br>ELI: Let\'s just quit. Everyone else\'s project is better.<br>MAYA: (pausing) Wait. We didn\'t add enough baking soda. Let\'s test it again.<br>ELI: (sighs) Fine. One more try.<br>(They add more baking soda. Red foam bubbles over the top.)<br>ELI: (grinning) It worked! I\'m glad you didn\'t let us give up.</p><p class="note">In a drama, the words in parentheses are <b>stage directions</b>. They tell how characters act.</p>',
      puzzles: [
        { type: 'mc', q: 'How do Maya and Eli respond differently to the problem?', choices: ['Maya looks for a solution; Eli wants to quit at first', 'Both want to quit', 'Eli finds the solution', 'Neither of them cares'], answer: 0 },
        { type: 'mc', q: 'What is the theme of the drama?', choices: ['Don\'t give up; problems can often be solved by trying again', 'Volcanoes are dangerous', 'Science fairs are too hard', 'Always work alone'], answer: 0 },
        { type: 'mc', q: 'What does the stage direction "(grinning)" tell the reader?', choices: ['Eli is happy', 'Eli is angry', 'Eli is sad', 'Eli is sleepy'], answer: 0 }
      ] },
    { title: 'Level 5: Grand Prize Round', content: '<p>The final round compares all three texts. Stories, poems, and dramas can share similar themes even though they look different.</p>',
      puzzles: [
        { type: 'match', q: 'Match each text to its theme.', pairs: [['The Lemonade Stand', 'Be flexible and ask for help'], ['The Oak', 'Strength comes from a strong foundation'], ['The Science Fair', 'Keep trying when things go wrong']] },
        { type: 'mc', q: 'What do "The Lemonade Stand" and "The Science Fair" have in common?', choices: ['Characters face a problem and succeed by not giving up', 'Both are poems', 'Both take place in a storm', 'Both are about volcanoes'], answer: 0 }
      ] }
  ],
  finale: '<p>Confetti falls from the ceiling! The host hands you the golden book trophy. "You summarized a story, a poem, AND a play, and found the message in each. That\'s a Summary Showdown champion!"</p>',
  exit: [
    { q: 'Which word should NEVER appear in an objective summary?', choices: ['First', 'Then', 'I loved', 'Finally'], answer: 2 },
    { q: 'In a drama, what are stage directions?', choices: ['Lines spoken by the narrator', 'Notes that tell how characters move or act', 'The title of the play', 'The theme'], answer: 1 },
    { q: 'Summarize "The Lemonade Stand" in 1–2 sentences using the Somebody-Wanted-But-So-Then frame.', answer: 'Tomas wanted money for a bike, but nobody bought lemonade on rainy days, so he took Mrs. Liu\'s advice and sold hot cocoa. Then he earned enough to buy the bike.', lines: 3 }
  ]
},

/* ---------- 5.RN Main Ideas & Text Structure ---------- */
{
  id: 'g5-ela-monarch-trip', std: 'g5-ela-info', format: 'fieldtrip',
  title: 'Flight of the Monarchs',
  tagline: 'Follow monarch butterflies from Indiana to Mexico, reading a new article at every stop.',
  story: '<p>Every fall, millions of monarch butterflies fly from the United States and Canada to the mountains of central Mexico. Today, you are following one monarch, tagged <b>#IN-2047</b>, on its trip from an Indiana milkweed field.</p><p>At every stop, read the article and find its <b>main idea</b>, <b>key details</b>, and <b>text structure</b>.</p>',
  code: 'WINGS',
  hook: 'Ask: "How far do you think a butterfly weighing less than a paper clip can fly?" (Up to about 3,000 miles.) Then preview the idea that informational texts are organized in different ways.',
  stages: [
    { title: 'Stop 1: The Milkweed Field', content: '<h3>Why Monarchs Need Milkweed</h3><p>Monarch butterflies depend on milkweed plants to survive. Female monarchs lay their eggs only on milkweed leaves. When the caterpillars hatch, milkweed is the only food they eat. The plant contains a chemical that makes caterpillars and adult butterflies taste bitter to birds, which protects them from predators. Without milkweed, monarchs could not complete their life cycle.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main idea of this article?', choices: ['Monarchs depend on milkweed to survive', 'Birds eat many insects', 'Milkweed grows in Indiana', 'Caterpillars hatch from eggs'], answer: 0 },
        { type: 'sort', q: 'Which details support the main idea?', buckets: ['Key detail', 'Not a key detail'], items: [['Females lay eggs only on milkweed', 0], ['Caterpillars eat only milkweed', 0], ['Milkweed makes monarchs taste bitter to birds', 0], ['Indiana has many state parks', 1], ['Some butterflies are blue', 1]] }
      ] },
    { title: 'Stop 2: The Life Cycle', content: '<h3>From Egg to Butterfly</h3><p>A monarch goes through four stages in about a month. <b>First</b>, a tiny egg is laid on a milkweed leaf. <b>After</b> three to five days, a caterpillar (larva) hatches and begins eating. <b>Over the next two weeks</b>, it grows about 2,000 times bigger. <b>Then</b> it forms a green chrysalis (pupa). <b>Finally</b>, after about ten days, an adult butterfly breaks out, dries its wings, and flies away.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure of this article?', choices: ['Sequence (chronological order)', 'Compare and contrast', 'Problem and solution', 'Cause and effect'], answer: 0, hint: 'Look at the bold signal words: First, After, Then, Finally.' },
        { type: 'order', q: 'Put the stages of the life cycle in order.', items: ['Egg', 'Caterpillar (larva)', 'Chrysalis (pupa)', 'Adult butterfly'] }
      ] },
    { title: 'Stop 3: Crossing the Plains', content: '<h3>Two Kinds of Monarchs</h3><p>Summer monarchs and migrating monarchs look the same, but they are very different. Summer monarchs live only about <b>two to six weeks</b>. In contrast, the last generation born in late summer can live up to <b>eight or nine months</b>. Summer monarchs mate and lay eggs right away; however, migrating monarchs wait until spring. Both kinds drink nectar from flowers, but only the migrating monarchs fly thousands of miles.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Compare and contrast', 'Sequence', 'Problem and solution', 'Description only'], answer: 0 },
        { type: 'sort', q: 'Sort the signal words by structure.', buckets: ['Compare/contrast signal words', 'Sequence signal words'], items: [['In contrast', 0], ['However', 0], ['Both', 0], ['First', 1], ['Finally', 1], ['After that', 1]] },
        { type: 'mc', q: 'How long can a migrating monarch live?', choices: ['Up to eight or nine months', 'Two to six weeks', 'Ten days', 'Five years'], answer: 0 }
      ] },
    { title: 'Stop 4: Texas Rest Stop', content: '<h3>Why Monarch Numbers Are Dropping</h3><p>The number of monarchs reaching Mexico has fallen sharply since the 1990s. One cause is the loss of milkweed. As farms and cities spread, many fields where milkweed once grew have been plowed or paved. Pesticides and weed killers also destroy milkweed and harm butterflies. In addition, extreme weather, such as droughts and freezing storms, can kill monarchs during their journey. As a result, fewer butterflies survive to lay eggs each spring.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure of this article?', choices: ['Cause and effect', 'Sequence', 'Compare and contrast', 'Description'], answer: 0, hint: 'The article explains WHY something is happening.' },
        { type: 'sort', q: 'Sort into causes and the effect.', buckets: ['Cause', 'Effect'], items: [['Loss of milkweed fields', 0], ['Pesticides', 0], ['Extreme weather', 0], ['Fewer monarchs survive', 1]] },
        { type: 'mc', q: 'Which phrase is a cause/effect signal?', choices: ['As a result', 'In contrast', 'First', 'For example'], answer: 0 }
      ] },
    { title: 'Stop 5: The Mountains of Mexico', content: '<h3>Saving the Monarchs</h3><p>Monarchs face a serious problem, but people are finding solutions. Students, families, and farmers across the Midwest are planting milkweed in gardens, schoolyards, and roadsides, creating "Monarch Waystations." Scientists and volunteers tag butterflies with tiny stickers to track their journey. In Mexico, the government protects the forests where the monarchs spend the winter. Together, these efforts give the monarchs a better chance.</p><p class="note">Monarch #IN-2047 has made it to the oyamel fir forest in Michoacán, Mexico, about 2,000 miles from Indiana!</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Problem and solution', 'Sequence', 'Compare and contrast', 'Chronological'], answer: 0 },
        { type: 'mc', q: 'The first four articles each have their own main idea. Which statement combines them into one main idea for the whole trip?', choices: ['Monarchs have an amazing life cycle and migration, but they need people\'s help to survive', 'Monarchs are orange', 'Mexico has mountains', 'Tagging uses stickers'], answer: 0 },
        { type: 'mc', q: 'Which is a solution named in the article?', choices: ['Planting milkweed', 'Using more pesticides', 'Paving fields', 'Cutting forests'], answer: 0 }
      ] }
  ],
  finale: '<p>Monarch #IN-2047 settles onto a fir branch with millions of other butterflies, turning the whole forest orange. Next spring, its great-grandchildren will make the trip back to Indiana. Trip complete! You read five articles and five text structures along the way.</p>',
  exit: [
    { q: 'Which signal words show a compare-and-contrast structure?', choices: ['First, next, finally', 'Because, as a result', 'However, both, in contrast', 'The problem is, one solution'], answer: 2 },
    { q: 'Which detail supports the main idea "Monarchs need milkweed to survive"?', choices: ['Monarch caterpillars eat only milkweed', 'Monarchs are orange and black', 'Mexico is south of Texas', 'Butterflies can fly'], answer: 0 },
    { q: 'Explain why an author might choose a problem-and-solution structure for an article about saving monarchs.', answer: 'Because the article explains a problem (monarch numbers dropping) and what people can do to fix it, so readers understand both the issue and how to help.', lines: 3 }
  ]
},
{
  id: 'g5-ela-scrambled-articles', std: 'g5-ela-info', format: 'mystery',
  title: 'The Case of the Scrambled Articles',
  tagline: 'A newspaper\'s printing press went haywire. Identify each article\'s structure and main idea to rebuild the front page.',
  story: '<p>Disaster at <b>The Hoosier Herald</b>! The printing press jammed and scrambled five articles. The editor needs a detective who can figure out what each article is about and how it is organized.</p><p>Examine each evidence file. Look for the <b>main idea</b> and the <b>signal words</b> that reveal its structure.</p>',
  code: 'FACTS',
  stages: [
    { title: 'Evidence File #1: The Indy 500', content: '<p>The Indianapolis 500 is one of the most famous car races in the world. Held every Memorial Day weekend since 1911, the race covers <b>500 miles</b>: 200 laps around a 2.5-mile oval track. Drivers reach speeds of more than 220 miles per hour. More than 300,000 fans fill the Indianapolis Motor Speedway, making it the largest single-day sporting event on Earth. The winner celebrates by drinking a bottle of milk, a tradition that began in 1936.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main idea?', choices: ['The Indianapolis 500 is a famous race with special features and traditions', 'Race cars are fast', 'Milk is healthy', 'Memorial Day is in May'], answer: 0 },
        { type: 'mc', q: 'What is the text structure?', choices: ['Description', 'Problem and solution', 'Compare and contrast', 'Cause and effect'], answer: 0, hint: 'The article lists facts and details about one topic.' },
        { type: 'input', q: 'How many laps are in the Indianapolis 500?', answer: ['200'], unit: 'laps' }
      ] },
    { title: 'Evidence File #2: Snow Days', content: '<p>Heavy snow can shut down a whole city. When more than six inches of snow falls quickly, plows cannot clear roads fast enough. Because roads become slippery, buses cannot drive safely, so schools close. Power lines can snap under the weight of ice, which causes power outages. As a result, many people stay home, and businesses may lose a day of work.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Cause and effect', 'Sequence', 'Compare and contrast', 'Description'], answer: 0 },
        { type: 'match', q: 'Match each cause to its effect.', pairs: [['Roads become slippery', 'Schools close'], ['Ice weighs down power lines', 'Power outages'], ['Snow falls too quickly', 'Plows cannot keep up']] }
      ] },
    { title: 'Evidence File #3: Frogs and Toads', content: '<p>Frogs and toads are both amphibians, but they have important differences. Frogs have smooth, moist skin, while toads have dry, bumpy skin. Frogs usually live in or near water; toads can live in drier places like gardens. Frogs have long back legs for leaping. On the other hand, toads have shorter legs and tend to hop or crawl. Both lay eggs in water, and both eat insects.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Compare and contrast', 'Problem and solution', 'Sequence', 'Cause and effect'], answer: 0 },
        { type: 'sort', q: 'Sort the facts.', buckets: ['Frogs', 'Toads', 'Both'], items: [['Smooth, moist skin', 0], ['Long legs for leaping', 0], ['Dry, bumpy skin', 1], ['Can live in drier places', 1], ['Lay eggs in water', 2], ['Eat insects', 2]] }
      ] },
    { title: 'Evidence File #4: The Lunchroom Problem', content: '<p>At Westfield Elementary, the lunchroom was throwing away more than 40 pounds of food every day. Students were taking food they did not eat, and there was no way to save extra items. The student council came up with a plan. They set up a "share table" where students could leave unopened food for others. They also started a compost bin for fruit and vegetable scraps. After two months, food waste dropped by more than half.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Problem and solution', 'Description', 'Compare and contrast', 'Chronological'], answer: 0 },
        { type: 'mc', q: 'What was the problem?', choices: ['The lunchroom was wasting a lot of food', 'Students were hungry', 'The school had no lunchroom', 'The compost bin was full'], answer: 0 },
        { type: 'mc', q: 'Which detail shows the solution worked?', choices: ['Food waste dropped by more than half', 'The student council met', 'Students took food', 'There were 40 pounds of food'], answer: 0 }
      ] },
    { title: 'Evidence File #5: Indiana Becomes a State', content: '<p>Indiana\'s path to statehood took many years. In <b>1787</b>, Congress created the Northwest Territory, which included present-day Indiana. In <b>1800</b>, the Indiana Territory was formed, with Vincennes as its capital. In <b>1813</b>, the capital moved to Corydon. Then, on <b>December 11, 1816</b>, Indiana became the 19th state. Finally, in <b>1825</b>, the state capital moved to Indianapolis, where it remains today.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Chronological (sequence)', 'Compare and contrast', 'Problem and solution', 'Cause and effect'], answer: 0 },
        { type: 'order', q: 'Put the events in order.', items: ['Northwest Territory created', 'Indiana Territory formed with Vincennes as capital', 'Capital moves to Corydon', 'Indiana becomes the 19th state', 'Capital moves to Indianapolis'] },
        { type: 'input', q: 'Indiana became which number state?', answer: ['19', '19th', 'nineteenth'] }
      ] }
  ],
  finale: '<p>The editor holds up tomorrow\'s front page: five articles, perfectly organized. "You didn\'t just read these articles," she says. "You figured out how they were built. That\'s real detective work." <b>The Hoosier Herald</b> goes to press on time.</p>',
  exit: [
    { q: 'An article explains why a river flooded and what happened because of it. What is its structure?', choices: ['Compare and contrast', 'Cause and effect', 'Description', 'Sequence'], answer: 1 },
    { q: 'Which signal words usually show a sequence structure?', choices: ['However, similarly', 'Because, therefore', 'First, next, then, finally', 'One solution is'], answer: 2 },
    { q: 'Choose one evidence file. State its main idea and list two key details that support it.', answer: 'Example: Indy 500: It is a famous race with special traditions. Details: it is 500 miles long; the winner drinks milk.', lines: 4 }
  ]
},
{
  id: 'g5-ela-magazine-escape', std: 'g5-ela-info', format: 'escape',
  title: 'Escape the Science Magazine',
  tagline: 'You\'ve been sucked into the pages of Young Scientist Monthly. Find the main ideas to climb back out.',
  story: '<p>You were reading <b>Young Scientist Monthly</b> when a flash of light pulled you into its pages! The only way out is to solve the locked sections of the magazine. Each lock opens when you find the main idea and understand how the section is organized.</p>',
  code: 'IDEAS',
  stages: [
    { title: 'Lock 1: Honeybees at Work', content: '<h3>The Busy Life of a Honeybee Hive</h3><p>A honeybee hive is like a well-organized city where every bee has a job. The <b>queen</b> lays up to 2,000 eggs a day. <b>Worker bees</b>, all female, gather nectar and pollen, make honey, build wax comb, and guard the hive. <b>Drones</b>, the male bees, have one job: to mate with a queen. Together, as many as 60,000 bees work as a team to keep the hive alive.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main idea?', choices: ['Every bee in a hive has a job, and they work together as a team', 'Queens lay eggs', 'Honey is sweet', 'Drones are male'], answer: 0 },
        { type: 'match', q: 'Match each bee to its job.', pairs: [['Queen', 'Lays eggs'], ['Worker', 'Gathers nectar and guards the hive'], ['Drone', 'Mates with a queen']] }
      ] },
    { title: 'Lock 2: Two Main Ideas', content: '<h3>Volcanoes: Destroyers and Creators</h3><p><b>Section 1.</b> Volcanoes can be extremely destructive. Lava flows burn everything in their path. Clouds of hot ash can bury whole towns, as happened to the Roman city of Pompeii in 79 CE.</p><p><b>Section 2.</b> Volcanoes also create new land. The Hawaiian Islands were built by volcanoes erupting from the ocean floor over millions of years. Volcanic ash breaks down into some of the most fertile soil on Earth.</p><p class="note">Longer texts can have <b>two or more main ideas</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main idea of Section 1?', choices: ['Volcanoes can be very destructive', 'Volcanoes create islands', 'Pompeii was Roman', 'Soil is fertile'], answer: 0 },
        { type: 'mc', q: 'What is the main idea of Section 2?', choices: ['Volcanoes also create new land and fertile soil', 'Lava is hot', 'Hawaii is in the ocean', 'Ash buries towns'], answer: 0 },
        { type: 'mc', q: 'How does the author organize the whole article?', choices: ['Comparing the destructive and creative effects of volcanoes', 'Telling events in time order', 'Giving directions', 'Listing steps to build a volcano'], answer: 0 }
      ] },
    { title: 'Lock 3: How to Read a Text Feature', content: '<p>Magazine articles use <b>text features</b> to help readers find information.</p><div class="tablewrap"><table><tr><th>Text feature</th><th>Purpose</th></tr><tr><td>Heading</td><td>Tells what a section is about</td></tr><tr><td>Caption</td><td>Explains a photo or diagram</td></tr><tr><td>Bold word</td><td>Shows an important vocabulary word</td></tr><tr><td>Diagram</td><td>Shows the parts of something</td></tr><tr><td>Glossary</td><td>Gives definitions of key words</td></tr></table></div>',
      puzzles: [
        { type: 'match', q: 'Match each question to the text feature that would help you most.', pairs: [['What does "pollination" mean?', 'Glossary'], ['What is this photo showing?', 'Caption'], ['What is this section about?', 'Heading'], ['What are the parts of a flower?', 'Diagram']] },
        { type: 'mc', q: 'Why might an author put a word in bold?', choices: ['It is an important vocabulary word', 'It is misspelled', 'It is the title', 'It is an opinion'], answer: 0 }
      ] },
    { title: 'Lock 4: The Recycling Story', content: '<h3>Where Does Your Plastic Bottle Go?</h3><p>First, you toss your bottle into a recycling bin. Next, a truck carries it to a sorting center, where machines and workers separate plastic from paper and metal. After that, the plastic is washed, chopped into small flakes, and melted. Then the melted plastic is formed into tiny pellets. Finally, factories use the pellets to make new products, such as fleece jackets, carpet, and even new bottles.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the text structure?', choices: ['Sequence', 'Compare and contrast', 'Problem and solution', 'Description'], answer: 0 },
        { type: 'order', q: 'Put the recycling steps in order.', items: ['Bottle goes in a recycling bin', 'Truck takes it to a sorting center', 'Plastic is washed, chopped, and melted', 'Plastic is formed into pellets', 'Pellets are made into new products'] }
      ] },
    { title: 'Lock 5: The Editor\'s Page', content: '<p>The last page is the editor\'s note. Decide which structure fits each description of an article.</p>',
      puzzles: [
        { type: 'match', q: 'Match each article description with its most likely text structure.', pairs: [['How pollution harms rivers and how towns clean them up', 'Problem and solution'], ['The history of flight from 1903 to today', 'Chronological'], ['Alligators vs. crocodiles', 'Compare and contrast'], ['Why earthquakes happen and what they cause', 'Cause and effect'], ['All about the giant squid', 'Description']] }
      ] }
  ],
  finale: '<p>With a whoosh, the magazine\'s pages flutter and you tumble back into your chair. The magazine is closed on your desk. On the cover, a new headline reads: <b>Reader Escapes by Finding Every Main Idea!</b></p>',
  exit: [
    { q: 'An article tells the history of the Wright brothers\' first flight in order. What is its structure?', choices: ['Chronological', 'Compare and contrast', 'Problem and solution', 'Cause and effect'], answer: 0 },
    { q: 'Which text feature explains a photograph?', choices: ['Glossary', 'Heading', 'Caption', 'Index'], answer: 2 },
    { q: 'The volcano article had two main ideas. State both and explain how they are connected.', answer: 'Volcanoes can be destructive (lava, ash buried Pompeii), and volcanoes also create new land and fertile soil. Both describe effects of volcanoes, showing they can harm and help.', lines: 4 }
  ]
},

/* ---------- 5.RV Vocabulary & Figurative Language ---------- */
{
  id: 'g5-ela-word-wizard', std: 'g5-ela-vocab', format: 'escape',
  title: 'The Word Wizard\'s Tower',
  tagline: 'Break the spells on five tower doors using Greek and Latin roots, prefixes, and suffixes.',
  story: '<p>The Word Wizard has locked you in her tower, but she left a clue: <b>"Words are built from parts, like bricks in a wall. Know the parts, and you will know the words."</b></p><p>Each door is sealed by a spell made of word parts. Break all five to escape.</p>',
  code: 'ROOTS',
  stages: [
    { title: 'Door 1: The Root Room', content: '<p>Carved into the wall is the Wizard\'s Root Chart:</p><div class="tablewrap"><table><tr><th>Root</th><th>Meaning</th><th>Example</th></tr><tr><td>port</td><td>carry</td><td>transport</td></tr><tr><td>graph</td><td>write</td><td>autograph</td></tr><tr><td>bio</td><td>life</td><td>biology</td></tr><tr><td>tele</td><td>far</td><td>telescope</td></tr><tr><td>spect</td><td>look</td><td>inspect</td></tr><tr><td>aud</td><td>hear</td><td>audience</td></tr><tr><td>struct</td><td>build</td><td>construct</td></tr></table></div>',
      puzzles: [
        { type: 'match', q: 'Match each root to its meaning.', pairs: [['port', 'carry'], ['graph', 'write'], ['bio', 'life'], ['aud', 'hear']] },
        { type: 'mc', q: 'Using the root chart, what does "portable" most likely mean?', choices: ['Able to be carried', 'Able to be written', 'Able to be heard', 'Far away'], answer: 0 },
        { type: 'mc', q: 'A "spectator" is someone who...', choices: ['watches', 'builds', 'writes', 'carries'], answer: 0 }
      ] },
    { title: 'Door 2: The Prefix Portal', content: '<p>A <b>prefix</b> goes at the <b>beginning</b> of a word and changes its meaning.</p><ul><li><b>un-, dis-, in-, im-</b> = not</li><li><b>re-</b> = again</li><li><b>pre-</b> = before</li><li><b>mis-</b> = wrongly</li><li><b>sub-</b> = under</li><li><b>tri-</b> = three</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each word to its meaning.', pairs: [['preview', 'See before'], ['misunderstand', 'Understand wrongly'], ['rebuild', 'Build again'], ['impossible', 'Not possible'], ['submarine', 'Under the sea']] },
        { type: 'input', q: 'Add a prefix to "agree" to make a word meaning "not agree."', answer: ['disagree'], hint: 'Which prefix meaning "not" fits before "agree"?' }
      ] },
    { title: 'Door 3: The Suffix Stairs', content: '<p>A <b>suffix</b> goes at the <b>end</b> of a word and can change its meaning or part of speech.</p><ul><li><b>-ful</b> = full of (hopeful)</li><li><b>-less</b> = without (fearless)</li><li><b>-able / -ible</b> = can be (readable)</li><li><b>-er / -or</b> = one who (teacher, actor)</li><li><b>-ology</b> = study of (geology)</li><li><b>-ness</b> = state of being (kindness)</li></ul>',
      puzzles: [
        { type: 'mc', q: 'What does "careless" mean?', choices: ['Without care', 'Full of care', 'One who cares', 'Able to care'], answer: 0 },
        { type: 'mc', q: '"Bio" means life and "-ology" means study of. What is "biology"?', choices: ['The study of life', 'Writing about life', 'A long life', 'A life without study'], answer: 0 },
        { type: 'sort', q: 'Sort the words by what their suffix means.', buckets: ['Full of', 'Without', 'One who'], items: [['joyful', 0], ['powerful', 0], ['helpless', 1], ['endless', 1], ['inventor', 2], ['builder', 2]] }
      ] },
    { title: 'Door 4: Build-a-Word Workshop', content: '<p>The Wizard\'s workshop has piles of word parts. Put them together and figure out what the new words mean. Remember to use <b>context clues</b> in the sentence to check your answer.</p><blockquote>The <b>telegraph</b> let people send messages across the country in minutes instead of weeks.</blockquote><blockquote>The builders had to <b>reconstruct</b> the bridge after the flood washed it away.</blockquote>',
      puzzles: [
        { type: 'mc', q: '"Tele" means far and "graph" means write. What was a telegraph?', choices: ['A machine for sending written messages far away', 'A tool for seeing far', 'A kind of camera', 'A telephone game'], answer: 0 },
        { type: 'mc', q: 'What does "reconstruct" mean in the sentence?', choices: ['Build again', 'Tear down', 'Look at', 'Carry across'], answer: 0 },
        { type: 'input', q: 'Combine "tele" (far) + "scope" (look/see) to name a tool for seeing far away.', answer: ['telescope'] }
      ] },
    { title: 'Door 5: The Wizard\'s Riddle', content: '<p>The final door has a riddle. Break each word into parts to answer.</p>',
      puzzles: [
        { type: 'mc', q: '"I am a person who studies Earth\'s rocks." (geo = earth, -ologist = one who studies) What am I?', choices: ['Geologist', 'Biologist', 'Geographer', 'Astronaut'], answer: 0 },
        { type: 'mc', q: 'An "inaudible" sound is one that...', choices: ['cannot be heard', 'is very loud', 'is written down', 'can be carried'], answer: 0, hint: 'in- = not, aud = hear, -ible = can be' },
        { type: 'mc', q: 'A "tripod" has how many legs? (tri = three, pod = foot)', choices: ['Three', 'Two', 'Four', 'One'], answer: 0 }
      ] }
  ],
  finale: '<p>The last door dissolves into a swirl of letters. The Word Wizard appears, smiling. "You didn\'t need magic," she says. "You broke every spell by breaking words into parts." You walk out of the tower with a new power: figuring out words you have never seen before.</p>',
  exit: [
    { q: 'What does the prefix "pre-" mean?', choices: ['Again', 'Not', 'Before', 'Under'], answer: 2 },
    { q: 'Using word parts, what does "unbreakable" mean?', choices: ['Easy to break', 'Not able to be broken', 'Broken again', 'One who breaks'], answer: 1 },
    { q: 'Choose a word with a prefix or suffix (for example: "hopeless," "rewrite," or "biography"). Break it into parts and explain its meaning.', answer: 'Example: hope + less = without hope. Or: bio (life) + graph (write) + y = writing about someone\'s life.', lines: 3 }
  ]
},
{
  id: 'g5-ela-figurative-gallery', std: 'g5-ela-vocab', format: 'gallery',
  title: 'The Figurative Language Art Show',
  tagline: 'Each painting in this show is described by a poem. Decode the similes, metaphors, and idioms.',
  story: '<p>Welcome to the Hoosier Young Poets Art Show! Local students painted pictures and wrote short poems to go with them. The judges want visitors to explain the <b>figurative language</b> in each poem: words that mean more than their literal (exact) meaning.</p>',
  code: 'POEMS',
  stages: [
    { title: 'Painting: "Morning Rush"', content: '<blockquote>My brother zooms through the kitchen <b>like a rocket</b>,<br>His shoes untied, a waffle in his pocket.<br>Mom says the bus is <b>as slow as a snail</b>,<br>But today it came early, so he flew <b>like a gale</b>.</blockquote><p class="note">A <b>simile</b> compares two different things using <b>like</b> or <b>as</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "zooms through the kitchen like a rocket" mean?', choices: ['He moves very fast', 'He is flying', 'He is on fire', 'He is loud'], answer: 0 },
        { type: 'sort', q: 'Which phrases are similes?', buckets: ['Simile', 'Not a simile'], items: [['like a rocket', 0], ['as slow as a snail', 0], ['a waffle in his pocket', 1], ['his shoes untied', 1]] }
      ] },
    { title: 'Painting: "The Classroom Zoo"', content: '<blockquote>Our classroom <b>is a zoo</b> on Friday afternoon.<br>Maria <b>is a parrot</b>, chattering out a tune.<br>The clock <b>is a turtle</b> crawling toward three.<br>And the bell, at last, <b>is the key that sets us free</b>.</blockquote><p class="note">A <b>metaphor</b> compares two things by saying one thing <b>is</b> another, without using like or as.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "Our classroom is a zoo" mean?', choices: ['The classroom is wild and noisy', 'There are animals in the classroom', 'The class is visiting a zoo', 'The classroom is clean'], answer: 0 },
        { type: 'mc', q: 'What does "The clock is a turtle" suggest?', choices: ['Time seems to pass very slowly', 'The clock is green', 'The clock is broken', 'Time is going fast'], answer: 0 },
        { type: 'mc', q: 'How is a metaphor different from a simile?', choices: ['A metaphor does not use "like" or "as"', 'A metaphor always rhymes', 'A metaphor uses "like"', 'They are exactly the same'], answer: 0 }
      ] },
    { title: 'Painting: "The Old House"', content: '<blockquote>The old house <b>groans</b> when the winter wind blows,<br>Its windows <b>stare</b> at the drifting snows.<br>The stairs <b>complain</b> with every step,<br>And the attic <b>keeps secrets</b> it has always kept.</blockquote><p class="note"><b>Personification</b> gives human actions or feelings to something that is not human.</p>',
      puzzles: [
        { type: 'sort', q: 'Which human actions are given to the house?', buckets: ['Personification', 'Literal description'], items: [['The house groans', 0], ['The windows stare', 0], ['The stairs complain', 0], ['The attic keeps secrets', 0], ['The winter wind blows', 1], ['The snow drifts', 1]] },
        { type: 'mc', q: 'What does "the stairs complain with every step" most likely mean?', choices: ['The stairs creak', 'The stairs are talking', 'The stairs are broken', 'The stairs are new'], answer: 0 }
      ] },
    { title: 'Painting: "Grandpa\'s Sayings"', content: '<blockquote>When I worry, Grandpa says, "Don\'t <b>cry over spilled milk</b>."<br>When I\'m nervous before a game, "<b>Break a leg</b>, kid."<br>When he\'s tired, he says, "Time to <b>hit the hay</b>."<br>And when I finally understand, "Now you\'re <b>on the ball</b>!"</blockquote><p class="note">An <b>idiom</b> is a saying whose meaning is different from the literal meaning of its words.</p>',
      puzzles: [
        { type: 'match', q: 'Match each idiom to its real meaning.', pairs: [['Cry over spilled milk', 'Worry about something that already happened'], ['Break a leg', 'Good luck'], ['Hit the hay', 'Go to bed'], ['On the ball', 'Alert and quick to understand']] },
        { type: 'mc', q: 'Why can\'t you understand an idiom by reading each word literally?', choices: ['Its meaning is different from the exact meaning of its words', 'Idioms are always in another language', 'Idioms are spelled wrong', 'Idioms have no meaning'], answer: 0 }
      ] },
    { title: 'Painting: "The Judges\' Table"', content: '<p>The judges have one last challenge. Identify the type of figurative language in each line. Remember <b>hyperbole</b>: an extreme exaggeration, like "I\'ve told you a million times!"</p>',
      puzzles: [
        { type: 'sort', q: 'Identify each type of figurative language.', buckets: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], items: [['Her smile was as bright as the sun.', 0], ['He runs like a cheetah.', 0], ['The snow was a white blanket.', 1], ['My dog is a vacuum cleaner at dinner.', 1], ['The leaves danced in the wind.', 2], ['The thunder shouted.', 2], ['This backpack weighs a thousand pounds!', 3], ['I\'m so hungry I could eat a horse.', 3]] },
        { type: 'mc', q: 'Why do poets use figurative language?', choices: ['To create vivid pictures and feelings in the reader\'s mind', 'To make poems shorter', 'To avoid using nouns', 'To confuse readers on purpose'], answer: 0 }
      ] }
  ],
  finale: '<p>The judges award you a blue ribbon for "Best Art Critic." "Figurative language paints pictures with words," says the head judge. "And you just read every picture in the show."</p>',
  exit: [
    { q: '"The wind whispered through the trees" is an example of...', choices: ['Simile', 'Personification', 'Idiom', 'Hyperbole'], answer: 1 },
    { q: 'Which sentence contains a simile?', choices: ['The baby is an angel.', 'The baby slept like a log.', 'The baby cried a river.', 'The baby is sleeping.'], answer: 1 },
    { q: 'Write your own metaphor about school. Then explain what it means.', answer: 'Example: "The hallway is a river of students." It means students flow through the hallway in a steady, moving crowd.', lines: 3 }
  ]
},
{
  id: 'g5-ela-context-caper', std: 'g5-ela-vocab', format: 'mystery',
  title: 'The Context Clue Caper',
  tagline: 'A thief left notes full of hard words. Use context clues to decode them and catch the culprit.',
  story: '<p>The golden pencil trophy has been stolen from Maplewood Elementary! The thief left behind a trail of notes full of difficult words. Detective, you will need <b>context clues</b>, the hints hidden in nearby words and sentences, to crack the case.</p><p>Types of context clues: <b>definition</b> (the meaning is given), <b>synonym</b> (a word that means the same), <b>antonym</b> (a word that means the opposite), and <b>example</b>.</p>',
  code: 'CLUES',
  stages: [
    { title: 'Evidence File #1: The First Note', content: '<blockquote>"I was <b>cautious</b>, or very careful, as I crept down the hallway. The janitor\'s cart made a <b>cacophony</b>, a loud and harsh mix of sounds, so no one heard my footsteps."</blockquote><p><b>Detective note:</b> This note uses <b>definition</b> clues. Look for commas or the word "or" right after a hard word.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "cautious" mean?', choices: ['Very careful', 'Very loud', 'Very fast', 'Very sleepy'], answer: 0 },
        { type: 'mc', q: 'What does "cacophony" mean?', choices: ['A loud, harsh mix of sounds', 'A quiet whisper', 'A type of cart', 'A song'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Second Note', content: '<blockquote>"The principal is usually <b>vigilant</b> about watching the trophy case, but that afternoon he was <b>distracted</b>, not paying attention at all. Unlike his usual <b>punctual</b> self, he arrived late to the office."</blockquote><p><b>Detective note:</b> Look for <b>antonym</b> clues: words like "but," "unlike," and "instead" signal an opposite.</p>',
      puzzles: [
        { type: 'mc', q: '"Vigilant" is the opposite of "distracted." What does vigilant mean?', choices: ['Watchful and alert', 'Sleepy', 'Late', 'Angry'], answer: 0 },
        { type: 'mc', q: '"Unlike his usual punctual self, he arrived late." What does "punctual" mean?', choices: ['On time', 'Late', 'Tired', 'Tall'], answer: 0 },
        { type: 'mc', q: 'Which word signaled an antonym clue?', choices: ['Unlike', 'Arrived', 'Office', 'Afternoon'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Hiding Place', content: '<blockquote>"I hid the trophy in a <b>receptacle</b>. Containers like buckets, bins, and boxes are all receptacles. I chose one full of <b>debris</b>, such as broken pencils, crumpled paper, and eraser crumbs."</blockquote><p><b>Detective note:</b> This note uses <b>example</b> clues. Look for "such as," "like," and "for example."</p>',
      puzzles: [
        { type: 'mc', q: 'What is a receptacle?', choices: ['A container', 'A hallway', 'A trophy', 'A pencil'], answer: 0 },
        { type: 'mc', q: 'What is "debris"?', choices: ['Scattered pieces of trash or waste', 'Shiny gold', 'Books', 'Fresh flowers'], answer: 0 },
        { type: 'mc', q: 'Where is the trophy most likely hidden?', choices: ['In a trash bin', 'In the principal\'s desk', 'On the roof', 'In the library'], answer: 0 }
      ] },
    { title: 'Evidence File #4: The Suspects', content: '<p>Three suspects were near the trophy case:</p><ul><li><b>Mr. Hale, the janitor</b>: "I was <b>diligent</b> all afternoon, working hard and never taking a break."</li><li><b>Ms. Perez, the art teacher</b>: "I was <b>elated</b>, extremely happy, because my class won the mural contest."</li><li><b>Coach Ben</b>: "I was <b>famished</b>. I was so hungry I went to the cafeteria to find a snack."</li></ul><p>The thief\'s notes said the janitor\'s cart covered the sound of footsteps, and the trophy was hidden in a bin of debris.</p>',
      puzzles: [
        { type: 'match', q: 'Match each word to its meaning using context clues.', pairs: [['diligent', 'Hard-working'], ['elated', 'Extremely happy'], ['famished', 'Very hungry']] },
        { type: 'mc', q: 'Which suspect\'s cart would have made the cacophony the thief described?', choices: ['Mr. Hale, the janitor', 'Ms. Perez', 'Coach Ben', 'The principal'], answer: 0 }
      ] },
    { title: 'Evidence File #5: The Confession', content: '<blockquote>"Okay, I <b>confess</b>, I admit it. I only <b>borrowed</b> the trophy. I wanted to polish it until it was <b>immaculate</b>, perfectly clean without a single spot, before the ceremony. I didn\'t mean to cause such <b>turmoil</b>. Everyone was upset and confused!"<br>— Mr. Hale</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What does "immaculate" mean?', choices: ['Perfectly clean', 'Very dirty', 'Stolen', 'Broken'], answer: 0 },
        { type: 'mc', q: 'Based on the context, what is "turmoil"?', choices: ['A state of confusion and upset', 'A calm afternoon', 'A shiny trophy', 'A cleaning tool'], answer: 0 },
        { type: 'sort', q: 'What type of context clue helped with each word?', buckets: ['Definition', 'Antonym', 'Example'], items: [['cautious, or very careful', 0], ['immaculate, perfectly clean', 0], ['vigilant... but distracted', 1], ['unlike his punctual self... late', 1], ['receptacles like buckets and bins', 2], ['debris, such as broken pencils', 2]] }
      ] }
  ],
  finale: '<p>Case closed! The golden pencil trophy is back in its case, shinier than ever. Mr. Hale apologizes, and the principal thanks you. "You cracked this case with nothing but context clues," she says. "That\'s a skill that will solve mysteries in every book you read."</p>',
  exit: [
    { q: '"The desert was arid, very dry, with almost no rain." What does "arid" mean?', choices: ['Wet', 'Very dry', 'Cold', 'Crowded'], answer: 1 },
    { q: '"Unlike his gregarious sister, Leo was shy." What does "gregarious" mean?', choices: ['Shy', 'Friendly and outgoing', 'Tall', 'Angry'], answer: 1 },
    { q: 'Explain how you could figure out a word you don\'t know using context clues. Give an example.', answer: 'Look at nearby words for a definition, synonym, antonym, or example. Example: "The feline, or cat, purred." The words "or cat" tell me feline means cat.', lines: 4 }
  ]
}
);
