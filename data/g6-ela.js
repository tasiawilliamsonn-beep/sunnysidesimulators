/* Grade 6 ELA rooms. All passages are original. */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 6.RL Evidence, Inference & Theme ---------- */
{
  id: 'g6-ela-inference-files', std: 'g6-ela-evidence', format: 'mystery',
  title: 'The Inference Files',
  tagline: 'The author never says it directly. Read between the lines to solve five character mysteries.',
  story: '<p>Welcome to the <b>Inference Bureau</b>. Authors often <b>show</b> rather than <b>tell</b>. They don\'t say a character is nervous; they describe her tapping her pencil and checking the clock. Your job is to read the clues and draw logical conclusions.</p><p><b>Inference formula:</b> Text clues + What I already know = Inference.</p>',
  code: 'INFER',
  stages: [
    { title: 'Evidence File #1: The Tryout', content: '<blockquote>Jada checked the gym clock for the fifth time. 3:58. The list would go up at 4:00. She tugged at the sleeve of her hoodie, then smoothed it flat, then tugged it again. When Coach Rivera walked out of the office holding a single sheet of paper, Jada\'s stomach dropped to her sneakers. She couldn\'t make her feet move toward the bulletin board.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about how Jada feels?', choices: ['Nervous and anxious', 'Bored', 'Angry at Coach Rivera', 'Excited and confident'], answer: 0 },
        { type: 'mc', q: 'Which piece of evidence BEST supports your inference?', choices: ['"Jada\'s stomach dropped to her sneakers. She couldn\'t make her feet move"', '"The list would go up at 4:00."', '"Coach Rivera walked out of the office"', '"holding a single sheet of paper"'], answer: 0 },
        { type: 'mc', q: 'What can you infer the "list" is?', choices: ['A list of students who made the team', 'A grocery list', 'A list of homework', 'The lunch menu'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Empty Chair', content: '<blockquote>Every Sunday for as long as Marco could remember, Grandpa had sat in the green recliner by the window, doing the crossword in pen. This Sunday, the recliner was empty. Mom set the newspaper on the seat, folded to the puzzle page, the way she always did. Then she stood there a long time. Finally she picked it back up, pressed it against her chest, and walked into the kitchen without a word.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer has happened to Grandpa?', choices: ['He has passed away or is gone', 'He went to the store', 'He is sitting in the kitchen', 'He finished the crossword early'], answer: 0 },
        { type: 'sort', q: 'Which details are clues for your inference?', buckets: ['Strong clue', 'Not a strong clue'], items: [['The recliner was empty', 0], ['Mom stood there a long time', 0], ['She pressed the paper against her chest without a word', 0], ['The recliner was green', 1], ['Grandpa used a pen', 1]] }
      ] },
    { title: 'Evidence File #3: The New Kid', content: '<blockquote>Ava sat alone at the end of the lunch table, her tray untouched. When Leo said, "Hey, you\'re in my science class, right?" she nodded without looking up. He sat down across from her anyway and slid his bag of pretzels to the middle of the table. "I always bring too many," he said. For the first time all day, Ava smiled.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about Ava at the start of the passage?', choices: ['She is new and feels lonely or shy', 'She is angry at Leo', 'She is not hungry because she ate earlier', 'She is the most popular student'], answer: 0 },
        { type: 'mc', q: 'What can you infer about Leo\'s line "I always bring too many"?', choices: ['He is finding a kind way to share without making Ava feel awkward', 'He does not like pretzels', 'He is bragging', 'He wants Ava to leave'], answer: 0 },
        { type: 'mc', q: 'Which theme does this passage suggest?', choices: ['Small acts of kindness can make a big difference', 'Lunch is the best part of school', 'Never talk to new people', 'Pretzels are a healthy snack'], answer: 0 }
      ] },
    { title: 'Evidence File #4: The Garden', content: '<blockquote>Mrs. Kowalski\'s garden was the pride of Maple Street. So when the Tran twins\' soccer ball flattened her prize tomato plants, the whole street held its breath. The twins stood at her fence, pale. Mrs. Kowalski looked at the broken stems for a long moment. Then she handed each of them a trowel. "Well," she said, "I suppose I\'ve got two new gardeners." By August, the twins could name every plant in the garden.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Why did "the whole street hold its breath"?', choices: ['Everyone expected Mrs. Kowalski to be very upset', 'The street was quiet', 'People were underwater', 'Everyone was sick'], answer: 0 },
        { type: 'mc', q: 'What can you infer about Mrs. Kowalski\'s character?', choices: ['She is forgiving and turns a problem into an opportunity', 'She is cruel', 'She does not care about her garden', 'She wants to punish the twins'], answer: 0 },
        { type: 'mc', q: 'What does "By August, the twins could name every plant" suggest?', choices: ['They spent the summer working with and learning from her', 'They moved away', 'They stopped playing soccer forever', 'Mrs. Kowalski quizzed them once'], answer: 0 }
      ] },
    { title: 'Evidence File #5: Explicit or Inferred?', content: '<p>The Bureau needs you to sort your findings. Some ideas are <b>explicit</b>: the text states them directly. Others are <b>inferred</b>: you figured them out from clues.</p>',
      puzzles: [
        { type: 'sort', q: 'Is each idea stated explicitly or inferred?', buckets: ['Explicitly stated', 'Inferred'], items: [['The list would go up at 4:00.', 0], ['Jada is nervous.', 1], ['Grandpa did the crossword in pen.', 0], ['Mom is grieving.', 1], ['Leo slid his pretzels to the middle of the table.', 0], ['Leo is trying to make Ava feel welcome.', 1]] },
        { type: 'mc', q: 'Which sentence starter is best for introducing text evidence?', choices: ['"The text states..."', '"I just think..."', '"Everyone knows..."', '"It doesn\'t matter..."'], answer: 0 }
      ] }
  ],
  finale: '<p>The Inference Bureau chief closes the last file. "You never needed the author to spell it out. You read the clues, used what you know, and backed up every conclusion with evidence." Case closed, Agent!</p>',
  exit: [
    { q: '"Tom slammed his locker, kicked his backpack, and stormed down the hall." What can you infer?', choices: ['Tom is happy', 'Tom is upset or angry', 'Tom is tired', 'Tom is late for lunch'], answer: 1 },
    { q: 'What is an inference?', choices: ['A wild guess', 'A fact stated in the text', 'A logical conclusion from text clues and what you know', 'The title of a story'], answer: 2 },
    { q: 'Choose one evidence file. Make an inference about a character and support it with a quote from the passage.', answer: 'Example: Mrs. Kowalski is forgiving. The text states, "she handed each of them a trowel" and said she had "two new gardeners."', lines: 4 }
  ]
},
{
  id: 'g6-ela-evidence-vault', std: 'g6-ela-evidence', format: 'escape',
  title: 'The Evidence Vault',
  tagline: 'Only the STRONGEST evidence opens each lock. Read a short story and prove every claim.',
  story: '<p>You\'ve been locked inside the Evidence Vault, where the doors only open for readers who can back up their ideas. Each lock presents a claim about the story below. Choose the evidence that proves it best.</p><h3>The Last Game</h3><p>(Read each section at its lock.)</p>',
  code: 'PROOF',
  stages: [
    { title: 'Lock 1: Meet Darius', content: '<blockquote>Darius had been the Eagles\' star pitcher since fourth grade. His fastball was so quick that the other teams\' coaches whispered about it. But in the semifinal last week, he had thrown a wild pitch that let in the winning run. Since then, he had stopped wearing his team cap to school. When his little brother, Kofi, asked him to play catch, Darius said, "Maybe later," and closed his bedroom door.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Claim: Darius feels ashamed about the semifinal. Which evidence BEST supports this claim?', choices: ['"Since then, he had stopped wearing his team cap to school."', '"Darius had been the Eagles\' star pitcher since fourth grade."', '"His fastball was so quick"', '"the other teams\' coaches whispered about it"'], answer: 0 },
        { type: 'mc', q: 'What can you infer from "Darius said, \'Maybe later,\' and closed his bedroom door"?', choices: ['He is avoiding baseball and pulling away from others', 'He is busy with homework', 'He does not like his brother', 'He is excited to play'], answer: 0 }
      ] },
    { title: 'Lock 2: The Practice', content: '<blockquote>The next Saturday, Darius walked past the park and heard a thunk, thunk, thunk. Kofi was throwing a tennis ball against the brick wall of the library, over and over. Half the throws went wild and rolled into the street. Kofi chased each one, came back, and threw again.<br><br>"Why do you keep doing that?" Darius called. "You\'re missing."<br><br>Kofi shrugged. "You told me the only way to get better is to keep throwing. Remember?"</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Claim: Kofi looks up to Darius. Which evidence BEST supports this?', choices: ['"You told me the only way to get better is to keep throwing. Remember?"', '"Half the throws went wild"', '"Kofi was throwing a tennis ball against the brick wall"', '"thunk, thunk, thunk"'], answer: 0 },
        { type: 'mc', q: 'Why is it important that Kofi keeps chasing the missed throws?', choices: ['It shows persistence, the lesson Darius has forgotten', 'It shows Kofi is bad at baseball', 'It shows the library is closed', 'It has no importance'], answer: 0 }
      ] },
    { title: 'Lock 3: The Turn', content: '<blockquote>Darius stood on the sidewalk for a long time. Then he walked over, picked up a stray tennis ball from the gutter, and handed it to his brother.<br><br>"Keep your elbow up," he said. "Like this." He showed him. Kofi\'s next throw smacked the center of the wall.<br><br>That night, Darius dug his cap out from under his bed and hung it back on its hook by the door.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Claim: Darius has begun to move past his mistake. Which evidence BEST supports this?', choices: ['"Darius dug his cap out from under his bed and hung it back on its hook"', '"Darius stood on the sidewalk for a long time."', '"picked up a stray tennis ball from the gutter"', '"Kofi\'s next throw smacked the center of the wall."'], answer: 0 },
        { type: 'mc', q: 'What does the cap symbolize in the story?', choices: ['Darius\'s pride and identity as a player', 'His favorite color', 'The weather', 'His brother\'s team'], answer: 0 }
      ] },
    { title: 'Lock 4: Building the Theme', content: '<p>A theme develops through the <b>character\'s challenge, response, and change</b>. Trace how the story builds its message.</p>',
      puzzles: [
        { type: 'order', q: 'Put the details that develop the theme in order.', items: ['Darius throws a wild pitch and loses the semifinal', 'He stops wearing his cap and avoids his brother', 'He sees Kofi practicing and failing without giving up', 'He teaches Kofi and remembers his own lesson', 'He hangs his cap back up'] },
        { type: 'mc', q: 'Which is the BEST theme statement for "The Last Game"?', choices: ['Mistakes don\'t define us; we grow by getting back up and trying again', 'Baseball is a hard sport', 'Little brothers are annoying', 'Always wear a baseball cap'], answer: 0 },
        { type: 'mc', q: 'Which is a TOPIC, not a theme?', choices: ['Failure', 'Failing is part of getting better', 'Helping others can help us heal', 'We learn from those we teach'], answer: 0 }
      ] },
    { title: 'Lock 5: Strongest vs. Weakest', content: '<p>The last lock tests how well you can <b>rank</b> evidence. Strong evidence directly proves the claim. Weak evidence is about the same topic but doesn\'t prove the specific point.</p><p><b>Claim:</b> Teaching Kofi helps Darius regain his confidence.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the evidence for this claim.', buckets: ['Strong evidence', 'Weak evidence'], items: [['"Keep your elbow up," he said. "Like this."', 0], ['That night, Darius dug his cap out... and hung it back on its hook', 0], ['Darius walked past the park and heard a thunk', 1], ['His fastball was so quick that the other teams\' coaches whispered about it', 1], ['The next Saturday...', 1]] }
      ] }
  ],
  finale: '<p>The vault\'s heavy doors swing open. A voice announces: <b>"Claim proven."</b> You didn\'t just pick evidence that was about the story. You picked the evidence that proved the point. That\'s the skill every great reader and writer needs.</p>',
  exit: [
    { q: 'What makes textual evidence "strong"?', choices: ['It is the longest quote', 'It directly supports the specific claim', 'It is from the first paragraph', 'It mentions the main character\'s name'], answer: 1 },
    { q: 'How does an author usually develop a theme?', choices: ['By stating it in the title', 'Through a character\'s challenge, response, and change', 'By using big words', 'Through the setting only'], answer: 1 },
    { q: 'State the theme of "The Last Game" and cite one piece of evidence that shows how it develops.', answer: 'Theme: Mistakes don\'t define us; we grow by trying again. Evidence: "Darius dug his cap out from under his bed and hung it back on its hook."', lines: 4 }
  ]
},
{
  id: 'g6-ela-theme-quest', std: 'g6-ela-evidence', format: 'quest',
  title: 'Character Quest: How Themes Grow',
  tagline: 'Follow a character across five scenes and track the details that grow into a theme.',
  story: '<p>Themes don\'t appear all at once. They <b>grow</b> through a story, detail by detail. In this quest you\'ll follow <b>Elena</b>, a sixth grader who enters the regional science fair. At each level, collect the details that reveal who she is and what the story is teaching.</p>',
  code: 'GROWS',
  stages: [
    { title: 'Level 1: The Plan', content: '<blockquote>Elena had a plan, and it was perfect. She would build a water filter out of sand, charcoal, and gravel. She would test it with muddy water from the creek. She would win first place. She wouldn\'t need a partner. "Partners just slow you down," she told her mom, taping her schedule to the fridge. Every hour of every weekend until the fair was blocked out in purple marker.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about Elena from the purple-marker schedule?', choices: ['She is organized and determined', 'She is lazy', 'She doesn\'t care about the fair', 'She loves the color purple more than science'], answer: 0 },
        { type: 'mc', q: 'Which detail reveals a possible weakness that the story may develop?', choices: ['"Partners just slow you down"', '"She would test it with muddy water"', '"sand, charcoal, and gravel"', '"taping her schedule to the fridge"'], answer: 0 }
      ] },
    { title: 'Level 2: The Problem', content: '<blockquote>The first test was a disaster. The water came out of her filter grayer than it went in. The second test was worse; the whole bottle collapsed. Elena stayed up past midnight rebuilding it, but on Monday it leaked all over the kitchen table.<br><br>Her classmate Sam, who had been assigned the seat next to hers, glanced at the soggy notebook in her backpack. "My uncle works at the water treatment plant," he said. "Want me to ask him why it\'s not working?"<br><br>"I\'ve got it," Elena snapped.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'How does Elena respond to her challenge at this point?', choices: ['She refuses help and tries to do it all alone', 'She gives up', 'She asks Sam for help', 'She changes her project to something easier'], answer: 0 },
        { type: 'mc', q: 'What does the word "snapped" suggest about Elena\'s feelings?', choices: ['She is frustrated and defensive', 'She is calm and grateful', 'She is sleepy', 'She is joking'], answer: 0 }
      ] },
    { title: 'Level 3: The Turning Point', content: '<blockquote>Three days before the fair, Elena sat on the creek bank staring at her fourth failed filter. She thought about Sam\'s offer. She thought about how many hours were left on the purple schedule: not enough.<br><br>The next morning, she found Sam at his locker. Her face burned. "Is your uncle\'s offer still open?"<br><br>Sam grinned. "He said you\'ve got your layers upside down. The fine sand goes on top."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Why is this the turning point of the story?', choices: ['Elena finally chooses to accept help', 'The fair is canceled', 'Sam moves away', 'The filter works on its own'], answer: 0 },
        { type: 'mc', q: 'What does "Her face burned" show?', choices: ['Asking for help is embarrassing and hard for her', 'She has a sunburn', 'She is angry at Sam', 'She has a fever'], answer: 0 },
        { type: 'mc', q: 'What does Sam\'s grin suggest about him?', choices: ['He is happy to help and not holding a grudge', 'He is mocking her', 'He is nervous', 'He wants to win the fair himself'], answer: 0 }
      ] },
    { title: 'Level 4: The Fair', content: '<blockquote>At the regional fair, Elena\'s filter turned brown creek water nearly clear. The judges asked a question about charcoal she couldn\'t answer. "My partner\'s uncle explained that part," she said, and Sam, standing beside her, stepped forward to finish the explanation.<br><br>They won second place. On the ride home, Elena took out her purple marker and, on next year\'s calendar, wrote two names instead of one.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'How has Elena changed?', choices: ['She now values teamwork and accepting help', 'She still wants to work alone', 'She quit science', 'She is angry about second place'], answer: 0 },
        { type: 'mc', q: 'What does "wrote two names instead of one" symbolize?', choices: ['She plans to work with a partner next year', 'She made a spelling mistake', 'She is writing Sam\'s birthday', 'She lost her marker'], answer: 0 }
      ] },
    { title: 'Level 5: The Theme Tree', content: '<p>You\'ve collected details from every level. Now connect them to the theme.</p>',
      puzzles: [
        { type: 'mc', q: 'Which theme is best supported by the whole story?', choices: ['Accepting help from others is a strength, not a weakness', 'Science fairs are unfair', 'Always use a purple marker', 'Water filters are easy to build'], answer: 0 },
        { type: 'order', q: 'Put these theme-building details in the order they appear.', items: ['"Partners just slow you down"', '"I\'ve got it," Elena snapped.', '"Is your uncle\'s offer still open?"', 'Sam stepped forward to finish the explanation', 'She wrote two names instead of one'] },
        { type: 'sort', q: 'Which quotes directly support the theme?', buckets: ['Supports the theme', 'Does not support the theme'], items: [['"Is your uncle\'s offer still open?"', 0], ['wrote two names instead of one', 0], ['"My partner\'s uncle explained that part"', 0], ['The first test was a disaster.', 1], ['They won second place.', 1]] }
      ] }
  ],
  finale: '<p>The Theme Tree blooms! Every detail you collected, from the purple schedule to the two names on the calendar, grew into one message. Quest complete, Theme Tracker!</p>',
  exit: [
    { q: 'What is usually the best evidence for a theme?', choices: ['Details showing how a character changes', 'The setting description', 'The number of pages', 'The author\'s name'], answer: 0 },
    { q: 'In the story, what was Elena\'s main internal conflict?', choices: ['Her filter kept leaking', 'Her pride kept her from accepting help', 'She lost her schedule', 'She disliked science'], answer: 1 },
    { q: 'Explain how the author develops the theme across the story. Use at least two details.', answer: 'At first Elena refuses help ("Partners just slow you down"). After failing, she asks Sam for help, succeeds, and writes two names on her calendar, showing that accepting help is a strength.', lines: 4 }
  ]
},

/* ---------- 6.RN Central Idea & Argument ---------- */
{
  id: 'g6-ela-debate-lockdown', std: 'g6-ela-central', format: 'escape',
  title: 'Debate Club Lockdown',
  tagline: 'The debate room is locked until you can separate strong claims from weak ones.',
  story: '<p>The Westview Middle School debate club is about to compete in the state finals, but the practice room door is jammed shut. Coach Adeyemi slides a note under the door: <b>"Prove you can evaluate an argument, and I\'ll get you out."</b></p><p>The debate topic: <b>Should our school have a later start time?</b></p>',
  code: 'CLAIM',
  stages: [
    { title: 'Lock 1: Parts of an Argument', content: '<p>An argument has three main parts:</p><ul><li><b>Claim</b>: the position the author wants you to accept.</li><li><b>Reasons</b>: why the author believes the claim.</li><li><b>Evidence</b>: facts, statistics, examples, or expert quotes that support the reasons.</li></ul><blockquote>"Our school should start at 8:45 instead of 7:50. Students need more sleep to learn well. The American Academy of Pediatrics recommends that middle and high schools start at 8:30 a.m. or later."</blockquote>',
      puzzles: [
        { type: 'match', q: 'Match each sentence to its part of the argument.', pairs: [['Our school should start at 8:45 instead of 7:50.', 'Claim'], ['Students need more sleep to learn well.', 'Reason'], ['The American Academy of Pediatrics recommends 8:30 a.m. or later.', 'Evidence']] },
        { type: 'mc', q: 'What type of evidence is the American Academy of Pediatrics recommendation?', choices: ['Expert opinion', 'Personal story', 'Opinion with no support', 'A made-up statistic'], answer: 0 }
      ] },
    { title: 'Lock 2: Fact or Opinion?', content: '<p>A <b>fact</b> can be proven true or false. An <b>opinion</b> is a belief or judgment. Opinions are fine in an argument, but they need <b>facts</b> to support them.</p><p>Watch for opinion words: <i>best, worst, should, amazing, terrible, I think, everyone knows.</i></p>',
      puzzles: [
        { type: 'sort', q: 'Sort each statement.', buckets: ['Fact', 'Opinion'], items: [['Our school currently starts at 7:50 a.m.', 0], ['Teenagers need 8 to 10 hours of sleep per night, according to the CDC.', 0], ['Early mornings are the worst.', 1], ['A later start would be amazing.', 1], ['Many districts have moved their start times later.', 0], ['Everyone hates waking up early.', 1]] }
      ] },
    { title: 'Lock 3: Supported or Unsupported?', content: '<p>Now evaluate the other team\'s speech:</p><blockquote>(1) "A later start is a bad idea. (2) Everyone knows kids would just stay up later. (3) Also, after-school sports would end after dark. (4) In our district, practices already end at 5:30 p.m.; a 55-minute later start would push them to about 6:25 p.m., after sunset in winter. (5) Later start times are obviously a silly fad."</blockquote><p>A claim is <b>supported</b> when it is backed by evidence. It is <b>unsupported</b> when it relies on exaggeration, generalizations, or opinion alone.</p>',
      puzzles: [
        { type: 'mc', q: 'Which sentence is supported with specific evidence?', choices: ['Sentence 4', 'Sentence 2', 'Sentence 5', 'Sentence 1'], answer: 0 },
        { type: 'mc', q: 'Why is sentence 2 ("Everyone knows kids would just stay up later") weak?', choices: ['It is a generalization with no evidence', 'It includes a statistic', 'It quotes an expert', 'It is a fact'], answer: 0 },
        { type: 'mc', q: 'Which phrase in sentence 5 signals an unsupported opinion?', choices: ['"obviously a silly fad"', '"Later start times"', '"are"', 'None of it'], answer: 0 }
      ] },
    { title: 'Lock 4: The Counterclaim', content: '<p>Strong arguments address the <b>counterclaim</b> (the other side) and respond to it.</p><blockquote>"Some people argue that a later start will make sports practices end too late. However, schools that changed their schedules found solutions, like using indoor lights on the field or shortening practice by 15 minutes. The health benefits of sleep outweigh this scheduling challenge."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is the counterclaim in this paragraph?', choices: ['A later start will make sports practices end too late', 'Sleep has health benefits', 'Schools can use indoor lights', 'Practices should be shorter'], answer: 0 },
        { type: 'mc', q: 'How does the author respond to the counterclaim?', choices: ['By offering solutions other schools used', 'By ignoring it', 'By agreeing and giving up', 'By insulting the other side'], answer: 0 },
        { type: 'mc', q: 'Why does addressing a counterclaim make an argument stronger?', choices: ['It shows the author has considered other views and can answer them', 'It makes the argument longer', 'It confuses the reader', 'It proves the other side is right'], answer: 0 }
      ] },
    { title: 'Lock 5: The Central Idea', content: '<p>Coach Adeyemi\'s final question: What is the <b>central idea</b> of your team\'s whole argument? The central idea is a complete statement of the most important point of the entire text, not just one paragraph.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the best central idea statement for your team\'s argument?', choices: ['A later school start would improve students\' health and learning, and its challenges can be solved', 'Sleep', 'Sports practices end at 5:30', 'Some people disagree about start times'], answer: 0 },
        { type: 'mc', q: 'Why is "Sleep" NOT a central idea?', choices: ['It is only a topic, not a complete statement', 'It is too long', 'It is an opinion', 'It is a counterclaim'], answer: 0 }
      ] }
  ],
  finale: '<p>The door clicks open, and Coach Adeyemi high-fives the whole team. At the state finals, your team wins by using facts, expert evidence, and a strong response to the counterclaim. The judges\' comment: "Every claim was supported."</p>',
  exit: [
    { q: 'Which statement is an unsupported claim?', choices: ['The school day is 7 hours long.', 'Everyone knows homework is useless.', 'A 2019 survey of 500 students found 60% felt tired in first period.', 'The CDC recommends 9 to 12 hours of sleep for children ages 6 to 12.'], answer: 1 },
    { q: 'What is a counterclaim?', choices: ['The main claim', 'An opposing view the author responds to', 'A fact', 'The conclusion'], answer: 1 },
    { q: 'Write one claim about a school topic, then give one reason and one piece of evidence that would support it.', answer: 'Example: Claim: Our school should have recess for 6th graders. Reason: Breaks improve focus. Evidence: Research from the CDC links physical activity to better attention in class.', lines: 4 }
  ]
},
{
  id: 'g6-ela-newsroom-trip', std: 'g6-ela-central', format: 'fieldtrip',
  title: 'Newsroom Field Trip',
  tagline: 'Tour the Indy Daily Ledger, from the reporter\'s desk to the editor\'s office, finding central ideas along the way.',
  story: '<p>Your class is visiting the newsroom of <b>The Indy Daily Ledger</b> (a pretend newspaper). Editor-in-chief Ms. Harlan will walk you through how an article goes from idea to front page. At each stop, you\'ll read a real-style article and practice finding central ideas and judging evidence.</p>',
  code: 'PRESS',
  stages: [
    { title: 'Stop 1: The Reporter\'s Desk', content: '<h3>Indiana\'s Pollinators Get a Helping Hand</h3><p>Bees, butterflies, and other pollinators are responsible for one out of every three bites of food we eat. Yet populations of many pollinators have declined in recent decades. Across Indiana, communities are responding. In Carmel, the city has converted 12 acres of mowed grass into native wildflower meadows. Students at a Fort Wayne middle school planted a 900-square-foot pollinator garden. Farmers in several counties are leaving flowering strips along the edges of their fields. These efforts show that small local actions can add up to big help for pollinators.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the central idea of the article?', choices: ['Indiana communities are taking local actions to help declining pollinators', 'Carmel has 12 acres of meadow', 'Bees make honey', 'Farmers grow crops in Indiana'], answer: 0 },
        { type: 'sort', q: 'Which details support the central idea?', buckets: ['Supports the central idea', 'Does not support it'], items: [['Carmel converted 12 acres into wildflower meadows', 0], ['A Fort Wayne school planted a pollinator garden', 0], ['Farmers leave flowering strips along fields', 0], ['Fort Wayne is Indiana\'s second-largest city', 1]] }
      ] },
    { title: 'Stop 2: The Fact-Checker', content: '<p>The fact-checker, Mr. Osei, explains his job: "Before anything is printed, I check that every claim has <b>reliable evidence</b>."</p><p>A <b>reliable source</b> is accurate, up to date, and comes from an expert or trustworthy organization. Ask: <i>Who wrote it? What do they know? What is their purpose? Can I find the same facts elsewhere?</i></p>',
      puzzles: [
        { type: 'sort', q: 'Which sources are most reliable for an article about pollinators?', buckets: ['More reliable', 'Less reliable'], items: [['A report from Purdue University entomologists', 0], ['The U.S. Department of Agriculture website', 0], ['A published study in a science journal', 0], ['An anonymous comment on social media', 1], ['An ad for a bug spray company', 1], ['A blog with no author or date', 1]] },
        { type: 'mc', q: 'Why might an ad from a bug spray company be a biased source about insects?', choices: ['The company wants to sell its product', 'It has too many facts', 'It was written by scientists', 'It is too old'], answer: 0 }
      ] },
    { title: 'Stop 3: The Opinion Page', content: '<h3>Opinion: Ban Leaf Blowers in Our Neighborhoods</h3><p>Gas leaf blowers are loud, dirty, and unnecessary. They can reach 100 decibels, as loud as a motorcycle, according to the Centers for Disease Control. Many models also pollute more than a car in the same amount of time, according to a test by a car magazine. Worst of all, they are simply annoying. Rakes worked fine for our grandparents. It\'s time for our town to ban gas leaf blowers.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the author\'s claim?', choices: ['The town should ban gas leaf blowers', 'Leaf blowers are as loud as motorcycles', 'Rakes are old', 'Cars pollute'], answer: 0 },
        { type: 'mc', q: 'Which sentence is the strongest piece of evidence?', choices: ['"They can reach 100 decibels... according to the Centers for Disease Control."', '"Worst of all, they are simply annoying."', '"Rakes worked fine for our grandparents."', '"Gas leaf blowers are loud, dirty, and unnecessary."'], answer: 0 },
        { type: 'mc', q: 'Which part of the argument is unsupported?', choices: ['"Rakes worked fine for our grandparents."', 'The CDC decibel fact', 'The pollution test', 'The claim is fully supported'], answer: 0 }
      ] },
    { title: 'Stop 4: The Headline Room', content: '<p>Headline writers must capture the central idea in just a few words. A headline should be <b>accurate</b> and not <b>misleading</b>.</p><h3>Article summary</h3><p>A new study of 400 Indiana students found that those who read for at least 20 minutes a day scored higher on vocabulary tests on average. The researchers said more studies are needed to know whether reading caused the higher scores.</p>',
      puzzles: [
        { type: 'mc', q: 'Which headline is MOST accurate?', choices: ['Study Links Daily Reading to Higher Vocabulary Scores', 'Reading 20 Minutes Makes You a Genius!', 'Scientists Prove Reading Is Useless', 'All Students Must Read 5 Hours a Day'], answer: 0 },
        { type: 'mc', q: 'Why is "Reading 20 Minutes Makes You a Genius!" misleading?', choices: ['It exaggerates and claims more than the study found', 'It is too short', 'It mentions reading', 'It is in all capital letters'], answer: 0 }
      ] },
    { title: 'Stop 5: The Editor\'s Office', content: '<p>Ms. Harlan gives you one last task: review an article draft and decide what the reporter did well.</p><blockquote>"Indianapolis added 25 miles of new bike lanes last year. Supporters say the lanes make cycling safer; city data shows bike crashes on those streets dropped 18%. Some business owners argue the lanes took away parking. The city responded by adding 60 parking spaces in nearby lots."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is the central idea of the draft?', choices: ['New bike lanes improved safety, and the city addressed parking concerns', 'Indianapolis has parking lots', 'Business owners dislike bikes', 'Bikes are faster than cars'], answer: 0 },
        { type: 'mc', q: 'What does the reporter do well?', choices: ['Includes evidence and presents more than one side', 'Only shares opinions', 'Ignores the business owners', 'Uses no numbers'], answer: 0 },
        { type: 'input', q: 'By what percent did bike crashes drop on those streets?', answer: ['18', '18%'], unit: '%' }
      ] }
  ],
  finale: '<p>Ms. Harlan hands you an official-looking press pass. "A good reader thinks like a good editor: What is the central idea? Is every claim backed up? Is the headline honest?" Field trip complete!</p>',
  exit: [
    { q: 'Which is the most reliable source for a science report?', choices: ['A social media post', 'A university research study', 'An ad', 'A random blog'], answer: 1 },
    { q: 'A central idea should be...', choices: ['One word', 'A complete statement of the text\'s most important point', 'The first sentence', 'A question'], answer: 1 },
    { q: 'Read this claim: "Our town needs a new park because kids have nowhere to play." Explain what evidence would make this claim stronger.', answer: 'Specific facts, such as how many parks exist, how far kids must travel, survey results from families, or data on how many children live in town.', lines: 3 }
  ]
},
{
  id: 'g6-ela-viral-post', std: 'g6-ela-central', format: 'mystery',
  title: 'The Viral Post Investigation',
  tagline: 'A shocking post is spreading at school. Trace its claims, check the evidence, and find the truth.',
  story: '<p>A post is spreading through Riverside Middle School: <b>"BREAKING: School is canceling ALL field trips forever because of a new state law!!!"</b> Students are upset. The principal has asked the student newspaper, meaning you, to investigate. Is it true?</p>',
  code: 'TRUTH',
  stages: [
    { title: 'Evidence File #1: The Original Post', content: '<blockquote>"BREAKING: School is canceling ALL field trips forever because of a new state law!!! My cousin\'s friend heard it from a teacher. Everyone is talking about it. SHARE before they delete this!!!"<br>— posted by @realnews_4u, 2 hours ago</blockquote><p><b>Detective note:</b> Look at <b>who</b> posted it, <b>what evidence</b> they give, and <b>how</b> it is written.</p>',
      puzzles: [
        { type: 'sort', q: 'Which features of the post are red flags?', buckets: ['Red flag', 'Not a red flag'], items: [['Evidence is secondhand: "my cousin\'s friend heard it"', 0], ['Lots of capital letters and exclamation points', 0], ['"SHARE before they delete this"', 0], ['No link to the actual law', 0], ['It mentions field trips', 1]] },
        { type: 'mc', q: 'Why is "Everyone is talking about it" NOT evidence?', choices: ['Popularity doesn\'t prove something is true', 'It is a statistic', 'It comes from an expert', 'It is a primary source'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The School Website', content: '<p>You check the district\'s official website. The latest update says:</p><blockquote>"Beginning in January, all field trips will require a signed permission form submitted <b>two weeks</b> in advance, following new state safety guidelines. Field trips will continue as scheduled."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What does the official source actually say?', choices: ['Field trips continue, but forms are due two weeks early', 'All field trips are canceled forever', 'There is no new rule', 'Field trips are now required every week'], answer: 0 },
        { type: 'mc', q: 'Why is the district website more reliable than the post?', choices: ['It is the official source responsible for school policy', 'It uses more exclamation points', 'It is shorter', 'More people shared it'], answer: 0 }
      ] },
    { title: 'Evidence File #3: The Interview', content: '<p>You interview Mr. Delgado, the school\'s field trip coordinator:</p><blockquote>"The rumor probably started because the new guidelines were announced at a staff meeting last week. Someone must have heard \'new state rules for field trips\' and assumed the worst. Our seventh-grade trip to Conner Prairie is still happening in March."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'According to Mr. Delgado, how did the rumor likely start?', choices: ['Someone misunderstood an announcement about new rules', 'A teacher lied on purpose', 'The state really canceled trips', 'A newspaper printed it'], answer: 0 },
        { type: 'mc', q: 'Which detail from the interview most directly disproves the viral post?', choices: ['"Our seventh-grade trip to Conner Prairie is still happening in March."', '"announced at a staff meeting last week"', '"assumed the worst"', '"new state rules"'], answer: 0 }
      ] },
    { title: 'Evidence File #4: Two Articles', content: '<p>Two students wrote articles about the rumor for the school paper.</p><p><b>Article A:</b> "Field trips are NOT canceled. The district website says forms are due two weeks in advance starting in January. Mr. Delgado confirmed the March trip to Conner Prairie is still on."</p><p><b>Article B:</b> "The rumor was totally ridiculous and whoever started it is dumb. Field trips are awesome and nobody would ever cancel them."</p>',
      puzzles: [
        { type: 'mc', q: 'Which article is better supported?', choices: ['Article A', 'Article B', 'Both are equally supported', 'Neither'], answer: 0 },
        { type: 'mc', q: 'What is the main weakness of Article B?', choices: ['It uses opinions and insults instead of evidence', 'It is too long', 'It quotes too many sources', 'It uses the district website'], answer: 0 },
        { type: 'sort', q: 'Sort the statements from both articles.', buckets: ['Supported by evidence', 'Unsupported'], items: [['Forms are due two weeks in advance starting in January.', 0], ['The March trip to Conner Prairie is still on.', 0], ['Whoever started it is dumb.', 1], ['Nobody would ever cancel field trips.', 1]] }
      ] },
    { title: 'Evidence File #5: The Final Report', content: '<p>Time to publish your investigation. Your article should clearly state the <b>central idea</b> and back it up.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the best central idea for your report?', choices: ['The viral post was false; field trips will continue with a new two-week permission form rule', 'Field trips', 'Social media is bad', 'Mr. Delgado is the coordinator'], answer: 0 },
        { type: 'order', q: 'Put the steps of checking a claim in order.', items: ['Notice the claim and question it', 'Check who made the claim and what evidence they give', 'Look for an official or reliable source', 'Compare what several sources say', 'Decide whether the claim is supported'] }
      ] }
  ],
  finale: '<p>Your article, <b>"Field Trips Are Still On: How a Rumor Went Viral,"</b> runs on the front page of the school paper. The principal shares it with every family. Students stop sharing the post and start asking a new question: "What\'s your source?" Case closed!</p>',
  exit: [
    { q: 'Which is the strongest evidence that a claim is true?', choices: ['Many people shared it', 'An official, reliable source confirms it', 'It uses capital letters', 'A friend told you'], answer: 1 },
    { q: 'Which is a red flag in an online post?', choices: ['A link to an official source', 'A named author with expertise', '"Share before they delete this!"', 'A recent date'], answer: 2 },
    { q: 'Describe how you would check whether a surprising claim you saw online is true.', answer: 'Check who posted it and what evidence they give, look for an official or reliable source, compare several sources, and decide if the evidence supports the claim.', lines: 4 }
  ]
},

/* ---------- 6.RV Connotation, Tone & Figurative Language ---------- */
{
  id: 'g6-ela-shades-gallery', std: 'g6-ela-vocab', format: 'gallery',
  title: 'The Shades of Meaning Gallery',
  tagline: 'Five exhibits where one word changes everything. Explore connotation, tone, and word choice.',
  story: '<p>Welcome to the <b>Shades of Meaning Gallery</b>. Words are like paint colors: some are bright, some are dark, and some are nearly the same but give a different feeling. In each exhibit, study how word choice changes meaning and tone.</p><p><b>Denotation</b> = dictionary meaning. <b>Connotation</b> = the feeling a word carries.</p>',
  code: 'TONES',
  stages: [
    { title: 'Exhibit: Same Meaning, Different Feeling', content: '<h3>Placard</h3><p>These word pairs have similar denotations but different connotations:</p><div class="tablewrap"><table><tr><th>Positive</th><th>Negative</th></tr><tr><td>confident</td><td>arrogant</td></tr><tr><td>thrifty</td><td>stingy</td></tr><tr><td>curious</td><td>nosy</td></tr><tr><td>determined</td><td>stubborn</td></tr><tr><td>slender</td><td>scrawny</td></tr></table></div>',
      puzzles: [
        { type: 'sort', q: 'Sort each word by its connotation.', buckets: ['Positive connotation', 'Negative connotation'], items: [['Relaxed', 0], ['Lazy', 1], ['Unique', 0], ['Weird', 1], ['Youthful', 0], ['Childish', 1]] },
        { type: 'mc', q: 'A company wants to describe its cheap product in an ad. Which word would it choose?', choices: ['Affordable', 'Cheap', 'Flimsy', 'Bargain-bin'], answer: 0 }
      ] },
    { title: 'Exhibit: Two Descriptions', content: '<h3>Placard</h3><p>Two writers described the same old house:</p><p><b>Writer A:</b> "The <b>cozy</b> cottage <b>nestled</b> among the trees, its <b>weathered</b> shutters hinting at a hundred years of family stories."</p><p><b>Writer B:</b> "The <b>shabby</b> shack <b>crouched</b> among the trees, its <b>rotting</b> shutters hanging like broken teeth."</p>',
      puzzles: [
        { type: 'match', q: 'Match each writer to the tone of their description.', pairs: [['Writer A', 'Warm and nostalgic'], ['Writer B', 'Eerie and unpleasant']] },
        { type: 'sort', q: 'Which words create each tone?', buckets: ['Writer A (warm)', 'Writer B (eerie)'], items: [['cozy', 0], ['nestled', 0], ['weathered', 0], ['shabby', 1], ['crouched', 1], ['rotting', 1]] }
      ] },
    { title: 'Exhibit: Tone vs. Mood', content: '<h3>Placard</h3><p><b>Tone</b> is the <b>author\'s</b> attitude toward the subject. <b>Mood</b> is the feeling the <b>reader</b> gets.</p><blockquote>"Oh, wonderful. Another Monday. My alarm clock has once again chosen violence, and the cereal box contains exactly four flakes and a cloud of dust. Truly, a glorious beginning."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is the author\'s tone?', choices: ['Sarcastic', 'Sincere and cheerful', 'Frightened', 'Sad and serious'], answer: 0 },
        { type: 'mc', q: 'Which phrase is the clearest clue to the tone?', choices: ['"Truly, a glorious beginning."', '"Another Monday."', '"the cereal box"', '"My alarm clock"'], answer: 0, hint: 'The author says the opposite of what they mean.' },
        { type: 'mc', q: 'What is the difference between tone and mood?', choices: ['Tone is the author\'s attitude; mood is how the reader feels', 'They are the same', 'Tone is the setting; mood is the plot', 'Mood is the author\'s attitude; tone is the reader\'s feeling'], answer: 0 }
      ] },
    { title: 'Exhibit: News or Opinion?', content: '<h3>Placard</h3><p>Journalists try to use <b>neutral</b> words in news reports. Opinion writers often use <b>loaded</b> words with strong connotations to persuade readers.</p><p><b>Report 1:</b> "The city council <b>voted</b> 5–2 to <b>approve</b> the new parking fee."</p><p><b>Report 2:</b> "The city council <b>rammed through</b> a <b>greedy</b> new parking fee."</p>',
      puzzles: [
        { type: 'mc', q: 'Which report uses loaded language?', choices: ['Report 2', 'Report 1', 'Both equally', 'Neither'], answer: 0 },
        { type: 'mc', q: 'What does "rammed through" suggest that "voted to approve" does not?', choices: ['That the decision was forced and unfair', 'That the vote was close', 'That the council was fair', 'Nothing different'], answer: 0 }
      ] },
    { title: 'Exhibit: Your Word Choice', content: '<h3>Placard</h3><p>The final exhibit asks you to be the author. Choose words to create a specific tone.</p><p>Sentence: "The dog ___ across the yard."</p>',
      puzzles: [
        { type: 'sort', q: 'Which verbs create a playful tone and which create a threatening tone?', buckets: ['Playful', 'Threatening'], items: [['bounded', 0], ['frolicked', 0], ['scampered', 0], ['prowled', 1], ['stalked', 1], ['lunged', 1]] },
        { type: 'mc', q: 'Why do authors carefully choose words with certain connotations?', choices: ['To create a specific tone and shape how readers feel', 'To use as many syllables as possible', 'To confuse readers', 'Connotation doesn\'t matter'], answer: 0 }
      ] }
  ],
  finale: '<p>At the exit, the gallery displays a single sentence in two versions: "She <b>chuckled</b>." and "She <b>smirked</b>." One word, two totally different characters. You now see the shades behind every word you read.</p>',
  exit: [
    { q: 'Which word has the most negative connotation?', choices: ['Thin', 'Slender', 'Scrawny', 'Slim'], answer: 2 },
    { q: 'What is tone?', choices: ['The reader\'s feelings', 'The author\'s attitude toward the subject', 'The setting', 'The main idea'], answer: 1 },
    { q: 'Rewrite this sentence twice, once with a positive tone and once with a negative tone: "The man walked into the room."', answer: 'Example: Positive: "The gentleman strolled cheerfully into the room." Negative: "The stranger lurked into the room."', lines: 4 }
  ]
},
{
  id: 'g6-ela-poets-notebook', std: 'g6-ela-vocab', format: 'escape',
  title: 'The Poet\'s Locked Notebook',
  tagline: 'A famous poet left a notebook sealed with five locks. Decode her figurative language to open it.',
  story: '<p>The beloved Indiana poet <b>Rosalind Vance</b> (a fictional poet) left her final notebook to the town library, locked with five combination locks. Each lock is labeled with one of her poems. The librarian believes each lock opens only for someone who truly understands the figurative language inside.</p>',
  code: 'VERSE',
  stages: [
    { title: 'Lock 1: "The City at Night"', content: '<blockquote>The city is a sleeping giant,<br>its streetlights blinking like drowsy eyes.<br>The traffic hums a lullaby<br>beneath the patchwork skies.</blockquote>',
      puzzles: [
        { type: 'sort', q: 'Identify the figurative language.', buckets: ['Metaphor', 'Simile', 'Personification'], items: [['The city is a sleeping giant', 0], ['streetlights blinking like drowsy eyes', 1], ['The traffic hums a lullaby', 2]] },
        { type: 'mc', q: 'What overall feeling do these comparisons create?', choices: ['A calm, peaceful city settling down for the night', 'A dangerous, chaotic city', 'A busy morning rush', 'A frightening storm'], answer: 0 }
      ] },
    { title: 'Lock 2: "Grandmother\'s Hands"', content: '<blockquote>Her hands are maps of every year,<br>the rivers of her veins run blue.<br>They\'ve kneaded bread ten thousand times<br>and braided my hair when it was new.</blockquote><p class="note"><b>Hyperbole</b> is exaggeration for effect. <b>Imagery</b> is language that appeals to the senses.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "Her hands are maps of every year" suggest?', choices: ['Her wrinkled hands show the story of her long life', 'She is a mapmaker', 'Her hands are made of paper', 'She travels often'], answer: 0 },
        { type: 'mc', q: '"They\'ve kneaded bread ten thousand times" is an example of...', choices: ['Hyperbole', 'Simile', 'Onomatopoeia', 'Alliteration'], answer: 0 },
        { type: 'mc', q: 'What is the speaker\'s tone toward her grandmother?', choices: ['Loving and admiring', 'Angry', 'Bored', 'Fearful'], answer: 0 }
      ] },
    { title: 'Lock 3: "The Midas Test"', content: '<blockquote>My brother\'s grades turned gold this year,<br>he has the <b>Midas touch</b>, they say.<br>But I have seen him up past twelve,<br>it wasn\'t magic, just work every day.</blockquote><p class="note">An <b>allusion</b> is a reference to a well-known story, person, or event. In a Greek myth, King Midas turned everything he touched into gold.</p>',
      puzzles: [
        { type: 'mc', q: 'What does the allusion "the Midas touch" mean in this poem?', choices: ['Everything he does turns out successful', 'He is a king', 'He likes jewelry', 'He is greedy'], answer: 0 },
        { type: 'mc', q: 'What point does the speaker make in the last two lines?', choices: ['His success comes from hard work, not magic', 'He really does have magic powers', 'He never studies', 'Grades don\'t matter'], answer: 0 }
      ] },
    { title: 'Lock 4: "Thunderstorm"', content: '<blockquote><b>Crack!</b> goes the sky. The <b>rain rattles</b> the roof,<br>the <b>wild wind wails</b> at the door.<br>The thunder <b>booms</b>, the gutters <b>gush</b>,<br>and the old oak groans once more.</blockquote><p class="note"><b>Onomatopoeia</b>: words that imitate sounds. <b>Alliteration</b>: repeating the same beginning sound.</p>',
      puzzles: [
        { type: 'sort', q: 'Identify each sound device.', buckets: ['Onomatopoeia', 'Alliteration'], items: [['Crack!', 0], ['booms', 0], ['gush', 0], ['rain rattles the roof', 1], ['wild wind wails', 1]] },
        { type: 'mc', q: 'Why might the poet use so many sound devices in a storm poem?', choices: ['To help readers hear and feel the storm', 'To make the poem shorter', 'To show it is quiet', 'To confuse readers'], answer: 0 }
      ] },
    { title: 'Lock 5: The Final Page', content: '<blockquote>Hope is a small green shoot<br>that pushes through a crack in stone.<br>No one planted it, no one watered it,<br>and still it has grown.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is hope compared to?', choices: ['A small plant growing through stone', 'A stone wall', 'A garden', 'Rain'], answer: 0 },
        { type: 'mc', q: 'What is the message of this final poem?', choices: ['Hope can survive and grow even in the hardest conditions', 'Plants need water', 'Stone is stronger than plants', 'No one cares about gardens'], answer: 0 },
        { type: 'mc', q: 'What type of figurative language is "Hope is a small green shoot"?', choices: ['Metaphor', 'Simile', 'Onomatopoeia', 'Hyperbole'], answer: 0 }
      ] }
  ],
  finale: '<p>The final lock clicks, and the notebook falls open. On the first page, Rosalind Vance wrote: <b>"A poem says one thing and means ten more. Thank you for reading between the lines."</b></p>',
  exit: [
    { q: '"The alarm clock screamed at me." This is an example of...', choices: ['Simile', 'Personification', 'Alliteration', 'Allusion'], answer: 1 },
    { q: '"He\'s such a Romeo" is an example of...', choices: ['Allusion', 'Onomatopoeia', 'Hyperbole', 'Imagery'], answer: 0 },
    { q: 'Choose one line from the notebook. Name the figurative language and explain what it means and how it adds to the poem.', answer: 'Example: "The city is a sleeping giant" is a metaphor. It shows the huge city growing quiet at night, creating a calm, peaceful feeling.', lines: 4 }
  ]
},
{
  id: 'g6-ela-word-quest', std: 'g6-ela-vocab', format: 'quest',
  title: 'Word Detective Quest',
  tagline: 'Level up your vocabulary with context clues, Greek and Latin roots, and multiple-meaning words.',
  story: '<p>You\'ve been recruited to the <b>Lexicon League</b>, a team of word detectives. Your mission: decode unfamiliar words using every tool available: context, word parts, and reference skills. Each level brings a tougher challenge.</p>',
  code: 'WORDS',
  stages: [
    { title: 'Level 1: Context Clues', content: '<p>Authors often leave clues to the meaning of difficult words:</p><ul><li><b>Definition/restatement</b>: "an <i>archipelago</i>, or chain of islands"</li><li><b>Synonym</b>: "the <i>arduous</i>, difficult climb"</li><li><b>Antonym/contrast</b>: "unlike his <i>verbose</i> brother, Sam spoke few words"</li><li><b>Example</b>: "<i>precipitation</i> such as rain, sleet, and snow"</li><li><b>Inference</b>: using the overall meaning of the passage</li></ul>',
      puzzles: [
        { type: 'mc', q: '"Unlike his verbose brother, Sam spoke few words." What does "verbose" mean?', choices: ['Using many words', 'Quiet', 'Angry', 'Tall'], answer: 0 },
        { type: 'mc', q: '"After the long, arduous hike up the mountain, we collapsed in exhaustion." What does "arduous" mean?', choices: ['Very difficult and tiring', 'Easy and quick', 'Fun', 'Short'], answer: 0 },
        { type: 'mc', q: '"The detective\'s meticulous notes recorded every tiny detail, down to the color of each button." What does "meticulous" mean?', choices: ['Extremely careful and precise', 'Messy', 'Brief', 'Colorful'], answer: 0 }
      ] },
    { title: 'Level 2: Greek and Latin Roots', content: '<div class="tablewrap"><table><tr><th>Root</th><th>Meaning</th></tr><tr><td>chron</td><td>time</td></tr><tr><td>photo</td><td>light</td></tr><tr><td>therm</td><td>heat</td></tr><tr><td>micro</td><td>small</td></tr><tr><td>scope</td><td>look, see</td></tr><tr><td>phon</td><td>sound</td></tr><tr><td>hydr</td><td>water</td></tr><tr><td>rupt</td><td>break</td></tr><tr><td>ject</td><td>throw</td></tr><tr><td>voc / vok</td><td>voice, call</td></tr></table></div>',
      puzzles: [
        { type: 'match', q: 'Use the roots to match each word with its meaning.', pairs: [['chronological', 'In time order'], ['thermometer', 'Measures heat'], ['microscope', 'Tool to see small things'], ['hydrate', 'Give water to'], ['erupt', 'Break out']] },
        { type: 'mc', q: 'A "projectile" is most likely something that...', choices: ['Is thrown forward', 'Makes sound', 'Measures time', 'Holds water'], answer: 0 }
      ] },
    { title: 'Level 3: Word Families', content: '<p>Words built on the same root form a <b>family</b>. If you know one, you can figure out the others.</p><blockquote>Root: <b>voc / vok</b> (voice, call)<br>vocal · vocabulary · advocate · evoke · provoke</blockquote><blockquote>Root: <b>rupt</b> (break)<br>erupt · interrupt · rupture · disrupt · bankrupt</blockquote>',
      puzzles: [
        { type: 'mc', q: 'To "interrupt" someone is to...', choices: ['Break into what they are saying', 'Call them loudly', 'Agree with them', 'Write to them'], answer: 0 },
        { type: 'mc', q: 'An "advocate" is someone who...', choices: ['Speaks up in support of a cause', 'Breaks rules', 'Measures heat', 'Stays silent'], answer: 0 },
        { type: 'sort', q: 'Sort each word into its root family.', buckets: ['voc/vok (voice, call)', 'rupt (break)'], items: [['vocal', 0], ['evoke', 0], ['provoke', 0], ['disrupt', 1], ['rupture', 1], ['bankrupt', 1]] }
      ] },
    { title: 'Level 4: Multiple-Meaning Words', content: '<p>Some words have more than one meaning. Use context to choose the right one.</p><blockquote>1. The scientist recorded the <b>current</b> temperature.<br>2. The river\'s <b>current</b> pulled the canoe downstream.<br>3. The <b>current</b> flowed through the copper wire.</blockquote>',
      puzzles: [
        { type: 'match', q: 'Match each sentence number to the meaning of "current."', pairs: [['Sentence 1', 'Happening now'], ['Sentence 2', 'Flow of water'], ['Sentence 3', 'Flow of electricity']] },
        { type: 'mc', q: '"The students will <b>present</b> their projects." Here, "present" means...', choices: ['To show or give a talk about', 'A gift', 'Right now', 'To be in attendance'], answer: 0 }
      ] },
    { title: 'Level 5: Boss Level', content: '<p>The Lexicon League\'s final test combines every skill. Read carefully.</p><blockquote>"The <b>benevolent</b> queen was loved by her people; she opened the palace gardens to the public and fed the hungry each winter. Her brother, a <b>malevolent</b> prince, schemed in the shadows to steal the throne."</blockquote><p class="note">Latin: <b>bene</b> = good, well. <b>male</b> = bad. <b>vol</b> = wish.</p>',
      puzzles: [
        { type: 'mc', q: 'What does "benevolent" mean?', choices: ['Kind and wishing good for others', 'Evil', 'Wealthy', 'Sleepy'], answer: 0 },
        { type: 'mc', q: 'What does "malevolent" mean?', choices: ['Wishing harm on others', 'Generous', 'Brave', 'Royal'], answer: 0 },
        { type: 'sort', q: 'Which clues helped you?', buckets: ['Context clue', 'Word-part clue'], items: [['"loved by her people"', 0], ['"fed the hungry each winter"', 0], ['"schemed in the shadows"', 0], ['bene = good', 1], ['male = bad', 1]] }
      ] }
  ],
  finale: '<p>The Lexicon League awards you the rank of <b>Master Word Detective</b>. With context clues, roots, and careful reading, no word can hide its meaning from you. Quest complete!</p>',
  exit: [
    { q: 'The root "chron" means time. What is a "chronometer"?', choices: ['A tool that measures time', 'A tool that measures heat', 'A tool that measures sound', 'A tool that sees far'], answer: 0 },
    { q: '"The ancient ruins were dilapidated: crumbling walls, broken windows, and a collapsing roof." What does "dilapidated" mean?', choices: ['New and shiny', 'In ruins or falling apart', 'Very large', 'Brightly colored'], answer: 1 },
    { q: 'Choose a word from the quest. Explain how you figured out its meaning using context clues, word parts, or both.', answer: 'Example: "benevolent" — bene means good and the queen fed the hungry, so it means kind and wishing good for others.', lines: 3 }
  ]
},

/* ---------- Summarizing ---------- */
{
  id: 'g6-ela-summary-vault', std: 'g6-ela-central', format: 'escape',
  title: 'The Summary Vault',
  tagline: 'The library\'s vault only opens for readers who can shrink a whole article into a few powerful sentences.',
  story: '<p>The Sunnyside Library keeps its rarest books in an underground vault. Tonight the vault door slammed shut with you inside! A screen lights up: <b>"This vault opens only for expert summarizers. Prove you can find what matters and leave out what doesn\'t."</b></p><p>Five locks stand between you and the exit.</p>',
  code: 'BRIEF',
  stages: [
    { title: 'Lock 1: The Summary Rules', content: '<p>A plaque on the wall lists the rules of a strong <b>summary</b>:</p><ul><li>It is <b>short</b>: much shorter than the original text.</li><li>It states the <b>central idea</b> and only the most important <b>key details</b>.</li><li>It is written in <b>your own words</b>.</li><li>It is <b>objective</b>: no opinions, no "I think," no "I liked."</li><li>It keeps events or ideas in a <b>logical order</b>.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'What is a summary?', choices: ['A short, objective restatement of the central idea and key details in your own words', 'A retelling of every detail in the text', 'Your opinion about the text', 'A list of quotes from the text'], answer: 0 },
        { type: 'sort', q: 'Does each item belong in a summary?', buckets: ['Belongs', 'Does not belong'], items: [['The central idea', 0], ['The most important key details', 0], ['"I think this article is boring."', 1], ['A minor detail, like the color of a car', 1], ['Ideas restated in your own words', 0]] },
        { type: 'tf', q: 'True or false: A good summary should include your opinion about the text.', answer: false, explain: 'Summaries are objective. Save opinions for a response or review.' }
      ] },
    { title: 'Lock 2: Find the Central Idea', content: '<p>A glowing book opens to this article:</p><blockquote><b>The Disappearing Dark</b><br>For most of history, people could look up at night and see thousands of stars. Today, about 80 percent of people in North America cannot see the Milky Way from where they live. The cause is light pollution: too much artificial light from streetlights, signs, and buildings that shines up into the sky.<br><br>Light pollution does more than hide the stars. Baby sea turtles, which hatch at night, crawl toward bright city lights instead of the ocean. Migrating birds become confused by lit-up buildings and crash into windows. Scientists have also found that bright light at night can disrupt people\'s sleep.<br><br>The good news is that light pollution is easy to fix. Cities can use shielded lights that point down, switch to dimmer bulbs, and turn off lights that are not needed. Some towns have even become official "Dark Sky Places."</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What is the central idea of the whole article?', choices: ['Light pollution hides the stars and harms animals and people, but it can be fixed', 'Baby sea turtles hatch at night', 'Some towns are Dark Sky Places', 'Stars are beautiful to look at'], answer: 0 },
        { type: 'mc', q: 'Why is "Baby sea turtles hatch at night" NOT the central idea?', choices: ['It is only one detail that supports a bigger idea', 'It is false', 'It is an opinion', 'It is not in the article'], answer: 0 }
      ] },
    { title: 'Lock 3: Key Details vs. Minor Details', content: '<p>The vault\'s scanner beeps: <b>"Keep only the details that support the central idea."</b></p><p>A <b>key detail</b> is necessary to understand the central idea. A <b>minor detail</b> is interesting but could be left out without losing the main point.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the details from "The Disappearing Dark."', buckets: ['Key detail', 'Minor detail'], items: [['About 80% of North Americans cannot see the Milky Way', 0], ['Light pollution confuses birds and sea turtles', 0], ['Cities can use shielded lights that point down', 0], ['Lights come from streetlights, signs, and buildings', 1], ['Some towns are called "Dark Sky Places"', 1]] },
        { type: 'mc', q: 'Which detail is MOST important to include in a summary?', choices: ['Light pollution harms animals and disrupts people\'s sleep', 'Signs are one source of light', 'The article was about stars', 'Birds crash into windows'], answer: 0 }
      ] },
    { title: 'Lock 4: Stay Objective', content: '<p>The fourth lock rejects any sentence with an opinion. An <b>objective</b> sentence states what the text says. A <b>subjective</b> sentence shows how the writer feels.</p>',
      puzzles: [
        { type: 'sort', q: 'Is each sentence objective or subjective?', buckets: ['Objective (belongs in a summary)', 'Subjective (opinion)'], items: [['The article explains that light pollution affects animals.', 0], ['I think this was the best article ever.', 1], ['According to the author, cities can reduce light pollution.', 0], ['Sea turtles are the cutest animals.', 1]] },
        { type: 'mc', q: 'Which sentence is the most objective way to start a summary?', choices: ['In "The Disappearing Dark," the author explains how light pollution affects the night sky, animals, and people.', 'This amazing article made me love stars.', 'I didn\'t like this article because it was long.', 'Everybody should read this article right now!'], answer: 0 }
      ] },
    { title: 'Lock 5: Build the Summary', content: '<p>The final lock asks you to assemble the summary in a logical order.</p>',
      puzzles: [
        { type: 'order', q: 'Put these summary sentences in a logical order.', items: ['In "The Disappearing Dark," the author explains that light pollution is hiding the night sky.', 'Too much artificial light keeps most North Americans from seeing the Milky Way.', 'It also confuses animals like sea turtles and birds and can disrupt people\'s sleep.', 'However, cities can fix the problem with shielded, dimmer lights.'] },
        { type: 'mc', q: 'Which is the BEST summary of the article?', choices: ['Light pollution from artificial lights hides the stars, confuses animals, and disrupts sleep, but cities can reduce it by using shielded, dimmer lights.', 'The article talks about lights and stars and turtles and birds and signs and towns.', 'I learned that stars are pretty and turtles are cute.', 'Some towns are Dark Sky Places.'], answer: 0 },
        { type: 'tf', q: 'True or false: The best summary is about as long as the original article.', answer: false, explain: 'A summary is much shorter than the original, usually just a few sentences.' }
      ] }
  ],
  finale: '<p>The vault door hisses open. The librarian smiles. "Most people try to remember everything. You learned to keep only what matters. That\'s the secret of a great summary."</p>',
  exit: [
    { q: 'Which sentence does NOT belong in a summary?', choices: ['The article explains how bees pollinate crops.', 'I loved this article so much!', 'The author describes three causes of bee loss.', 'According to the text, farmers depend on bees.'], answer: 1 },
    { q: 'A summary should include...', choices: ['every detail', 'the central idea and key details', 'the reader\'s opinion', 'only the title'], answer: 1 },
    { q: 'Write a 2–3 sentence objective summary of a story or article you know well.', answer: 'Example: In "The Tortoise and the Hare," a fast hare challenges a slow tortoise to a race. The hare is so sure he will win that he stops to nap, while the tortoise keeps going steadily. The tortoise wins the race.', lines: 4 }
  ]
},

/* ---------- Inferencing ---------- */
{
  id: 'g6-ela-clue-express', std: 'g6-ela-evidence', format: 'escape',
  title: 'Escape the Clue Express',
  tagline: 'Locked on a night train, you must read between the lines in every car to reach the engine.',
  story: '<p>You board the <b>Clue Express</b> for an overnight trip, but the doors between the cars are locked! The conductor\'s voice crackles over the speaker: <b>"Each door opens when you make a smart inference. Remember: text clues + what you already know = inference."</b></p><p>Five train cars stand between you and the engine.</p>',
  code: 'CLUES',
  stages: [
    { title: 'Car 1: The Dining Car', content: '<blockquote>Mr. Alvarez pushed his plate away, still full of spaghetti. He checked his watch, then his phone, then his watch again. When the train slowed, he grabbed his briefcase and was standing at the door before it even stopped.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about Mr. Alvarez?', choices: ['He is in a hurry and worried about being late', 'He loves spaghetti', 'He is sleepy', 'He works on the train'], answer: 0 },
        { type: 'mc', q: 'Which clue BEST supports your inference?', choices: ['"He checked his watch, then his phone, then his watch again."', '"pushed his plate away"', '"grabbed his briefcase"', '"the train slowed"'], answer: 0 }
      ] },
    { title: 'Car 2: The Sleeping Car', content: '<blockquote>Nine-year-old Ruby lay in the top bunk with her eyes wide open. Every time the train rattled, she pulled the blanket up to her chin. She had left the little reading light on, even though her grandmother said it was time to sleep.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about how Ruby feels?', choices: ['Nervous or scared', 'Bored', 'Angry at her grandmother', 'Very tired and relaxed'], answer: 0 },
        { type: 'mc', q: 'What background knowledge helps you make this inference?', choices: ['People who are scared often want a light on and hide under blankets', 'Trains always have bunk beds', 'Grandmothers like to read', 'Nine-year-olds are always sleepy'], answer: 0 },
        { type: 'tf', q: 'True or false: The text directly says, "Ruby was scared."', answer: false, explain: 'The author never says it. You infer it from her actions.' }
      ] },
    { title: 'Car 3: The Luggage Car', content: '<blockquote>The suitcase tag read "Oslo, Norway." Inside, the detective found a thick wool sweater, a fur-lined hat, two pairs of gloves, and a guidebook with the chapter "Seeing the Northern Lights" bookmarked.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about the suitcase owner\'s trip?', choices: ['They are traveling somewhere cold, hoping to see the northern lights', 'They are going to a tropical beach', 'They are moving to Oslo forever', 'They are a professional photographer'], answer: 0 },
        { type: 'match', q: 'Match each clue to the inference it supports.', pairs: [['Wool sweater and fur-lined hat', 'The weather will be cold'], ['Bookmarked "Northern Lights" chapter', 'They want to see the aurora'], ['Tag reading "Oslo, Norway"', 'The destination is in Scandinavia']] }
      ] },
    { title: 'Car 4: The Observation Car', content: '<blockquote>Jamal pressed his forehead against the window as the train passed his old neighborhood. He pointed at a small brick house with a basketball hoop. "That\'s where I learned to shoot," he said quietly. He didn\'t say anything else until the house was out of sight.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'What can you infer about Jamal?', choices: ['He misses his old home and has fond memories of it', 'He dislikes basketball', 'He has never seen the house before', 'He is angry at the train'], answer: 0 },
        { type: 'sort', q: 'Is each statement stated directly or inferred?', buckets: ['Stated in the text', 'Inferred'], items: [['Jamal pointed at a brick house.', 0], ['Jamal used to live in that house.', 1], ['Jamal feels nostalgic.', 1], ['The house has a basketball hoop.', 0]] }
      ] },
    { title: 'Car 5: The Engine', content: '<p>The last door checks your understanding of inference itself.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the best definition of an inference?', choices: ['A logical conclusion based on text clues and what you already know', 'A wild guess', 'A fact the author states directly', 'The title of a story'], answer: 0 },
        { type: 'mc', q: '"Sam\'s umbrella dripped on the floor, and his sneakers squeaked." What can you infer?', choices: ['It is raining outside', 'Sam is at the beach', 'Sam spilled a drink', 'Sam bought new shoes'], answer: 0 },
        { type: 'mc', q: 'Which sentence starter is best for sharing an inference?', choices: ['"Based on the clue ___ and what I know about ___, I can infer ___."', '"I just think ___."', '"Everybody knows ___."', '"The story says exactly ___."'], answer: 0 }
      ] }
  ],
  finale: '<p>The engine door slides open, and the conductor hands you a golden ticket. "You read every car like a detective. Authors hide the truth between the lines, and you found it every time."</p>',
  exit: [
    { q: '"Lena slammed her locker and stomped to class." What can you infer?', choices: ['Lena is happy', 'Lena is upset', 'Lena is sleepy', 'Lena is late for lunch'], answer: 1 },
    { q: 'An inference is based on...', choices: ['only your opinion', 'text clues plus what you already know', 'a random guess', 'the title only'], answer: 1 },
    { q: 'Write your own 2-sentence "show, don\'t tell" clue about a character, then state the inference a reader should make.', answer: 'Example: Maya kept glancing at the clock and tapping her foot during the test. Inference: Maya is nervous or anxious to finish.', lines: 4 }
  ]
},

/* ---------- Story elements and plot ---------- */
{
  id: 'g6-ela-plot-mountain', std: 'g6-ela-evidence', format: 'escape',
  title: 'Escape Plot Mountain',
  tagline: 'Climb the plot diagram, from exposition to resolution, to reach the summit before the storm.',
  story: '<p>You\'re on a class hiking trip up <b>Plot Mountain</b>, and a storm is rolling in. The only way to the safe cabin at the top is through five trail gates. Each gate asks about <b>story elements</b> and <b>plot</b>.</p><p>Read the trail story at each gate, and climb!</p>',
  code: 'CLIMB',
  stages: [
    { title: 'Gate 1: Story Elements', content: '<p>Every story is built from the same parts:</p><ul><li><b>Characters</b>: the people or animals in the story. The <b>protagonist</b> is the main character; the <b>antagonist</b> works against the protagonist.</li><li><b>Setting</b>: when and where the story happens.</li><li><b>Conflict</b>: the main problem.</li><li><b>Plot</b>: the sequence of events.</li><li><b>Theme</b>: the message or lesson about life.</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each story element to its definition.', pairs: [['Setting', 'When and where the story happens'], ['Conflict', 'The main problem'], ['Theme', 'The message or lesson about life'], ['Protagonist', 'The main character']] },
        { type: 'mc', q: 'In "Cinderella," who is the antagonist?', choices: ['The stepmother', 'Cinderella', 'The fairy godmother', 'The prince'], answer: 0 }
      ] },
    { title: 'Gate 2: Types of Conflict', content: '<p>A trail sign lists the four main types of conflict:</p><ul><li><b>Character vs. character</b>: two characters oppose each other.</li><li><b>Character vs. self</b>: a character struggles with a fear, choice, or feeling inside.</li><li><b>Character vs. nature</b>: a character faces a storm, animal, or wilderness.</li><li><b>Character vs. society</b>: a character stands against rules, laws, or a group.</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Sort each conflict by type.', buckets: ['vs. character', 'vs. self', 'vs. nature', 'vs. society'], items: [['Two rivals compete for team captain', 0], ['A boy must decide whether to tell the truth', 1], ['Hikers are caught in a blizzard', 2], ['A girl protests an unfair school rule', 3]] },
        { type: 'mc', q: 'You\'re racing a storm up a mountain. What type of conflict is that?', choices: ['Character vs. nature', 'Character vs. self', 'Character vs. character', 'Character vs. society'], answer: 0 }
      ] },
    { title: 'Gate 3: The Plot Diagram', content: '<p>A carved map shows the shape of most plots:</p><ul><li><b>Exposition</b>: introduces characters, setting, and background.</li><li><b>Rising action</b>: events that build tension as the conflict grows.</li><li><b>Climax</b>: the turning point, the moment of greatest tension.</li><li><b>Falling action</b>: events after the climax that begin to wrap things up.</li><li><b>Resolution</b>: how the conflict ends.</li></ul>',
      puzzles: [
        { type: 'order', q: 'Put the parts of the plot diagram in order.', items: ['Exposition', 'Rising action', 'Climax', 'Falling action', 'Resolution'] },
        { type: 'mc', q: 'What is the climax of a story?', choices: ['The turning point with the greatest tension', 'The first page', 'The introduction of the setting', 'The title'], answer: 0 }
      ] },
    { title: 'Gate 4: The Trail Story', content: '<blockquote><b>The Last Canoe</b><br>(1) Every summer, Priya and her older brother Dev paddled across Silver Lake to Grandpa\'s cabin. (2) This year Dev had broken his arm, so Priya would have to paddle alone for the first time. (3) Halfway across, the wind picked up and waves slapped the sides of the canoe. (4) Her arms burned, and she thought about turning back. (5) Then a huge wave tipped the canoe sideways, and Priya had to choose: jump out, or lean hard and paddle. She leaned and paddled with everything she had. (6) The canoe steadied, and the wind slowly died down. (7) When she reached the dock, Grandpa was waiting with a towel and a grin. "I knew you could do it," he said.</blockquote>',
      puzzles: [
        { type: 'mc', q: 'Which sentence is part of the EXPOSITION?', choices: ['Sentence 1: Every summer, Priya and Dev paddled to Grandpa\'s cabin.', 'Sentence 5: A huge wave tipped the canoe.', 'Sentence 6: The wind died down.', 'Sentence 7: Grandpa was waiting.'], answer: 0 },
        { type: 'mc', q: 'Which sentence is the CLIMAX?', choices: ['Sentence 5: A huge wave tips the canoe, and Priya must choose.', 'Sentence 2: Dev broke his arm.', 'Sentence 3: The wind picks up.', 'Sentence 7: Grandpa says, "I knew you could do it."'], answer: 0 },
        { type: 'sort', q: 'Which part of the plot is each event?', buckets: ['Rising action', 'Falling action / resolution'], items: [['The wind picks up and waves slap the canoe', 0], ['Priya\'s arms burn and she thinks about turning back', 0], ['The canoe steadies and the wind dies down', 1], ['Grandpa greets her at the dock', 1]] }
      ] },
    { title: 'Gate 5: The Summit', content: '<p>At the summit cabin, one last lock asks you to think about the whole story.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main conflict in "The Last Canoe"?', choices: ['Priya vs. nature (wind and waves) and Priya vs. self (wanting to give up)', 'Priya vs. Dev', 'Priya vs. Grandpa', 'Priya vs. society'], answer: 0 },
        { type: 'mc', q: 'Which theme does the story suggest?', choices: ['Facing a challenge on your own can show you how strong you are', 'Canoes are dangerous', 'Brothers should not break their arms', 'Always stay home when it is windy'], answer: 0 },
        { type: 'mc', q: 'What is the setting?', choices: ['Silver Lake, on a windy summer day', 'A school gym in winter', 'A city street at night', 'A mountain cabin in a blizzard'], answer: 0 }
      ] }
  ],
  finale: '<p>You burst through the cabin door just as the rain begins. From the window, you can see the whole trail below: the exposition at the trailhead, the rising action up the slope, the climax at the peak, and the falling action down the other side. You didn\'t just climb a mountain; you climbed a plot.</p>',
  exit: [
    { q: 'Which part of the plot is the turning point?', choices: ['Exposition', 'Rising action', 'Climax', 'Resolution'], answer: 2 },
    { q: 'A character trapped in a snowstorm faces which type of conflict?', choices: ['vs. self', 'vs. nature', 'vs. society', 'vs. character'], answer: 1 },
    { q: 'Think of a book or movie you know. Name its climax and explain why it is the turning point.', answer: 'Example: In "The Three Little Pigs," the climax is when the wolf tries to blow down the brick house and can\'t. It is the turning point because the pigs are finally safe and the wolf is defeated.', lines: 4 }
  ]
},

/* ---------- Grammar ---------- */
{
  id: 'g6-ela-grammar-garage', std: 'g6-ela-writing', format: 'escape',
  title: 'The Grammar Garage',
  tagline: 'Five broken-down sentence machines. Tune up the grammar to drive out of the garage.',
  story: '<p>You\'re an apprentice mechanic at the <b>Grammar Garage</b>, where sentences come in for repairs. The garage door is jammed, and the only way to open it is to fix five broken machines. Each one needs a different grammar tune-up.</p>',
  code: 'NOUNS',
  stages: [
    { title: 'Machine 1: Parts of Speech', content: '<p>Every sentence is built from parts:</p><ul><li><b>Noun</b>: a person, place, thing, or idea (<i>garage, courage</i>).</li><li><b>Verb</b>: an action or state of being (<i>repair, is</i>).</li><li><b>Adjective</b>: describes a noun (<i>shiny, broken</i>).</li><li><b>Adverb</b>: describes a verb, adjective, or other adverb; often ends in -ly (<i>quickly, very</i>).</li><li><b>Pronoun</b>: takes the place of a noun (<i>she, they, it</i>).</li></ul>',
      puzzles: [
        { type: 'sort', q: 'Sort each word from this sentence: "The tired mechanic quickly fixed the old engine."', buckets: ['Noun', 'Verb', 'Adjective', 'Adverb'], items: [['mechanic', 0], ['engine', 0], ['fixed', 1], ['tired', 2], ['old', 2], ['quickly', 3]] },
        { type: 'mc', q: 'In "Honesty is important," what part of speech is "honesty"?', choices: ['Noun (an idea)', 'Verb', 'Adjective', 'Adverb'], answer: 0 }
      ] },
    { title: 'Machine 2: Subject-Verb Agreement', content: '<p>A singular subject needs a singular verb; a plural subject needs a plural verb.</p><ul><li>The <b>car runs</b>. The <b>cars run</b>.</li><li>Watch out for phrases in between: The <b>box</b> of tools <b>is</b> heavy. (The subject is <i>box</i>, not <i>tools</i>.)</li><li>Subjects joined by <i>and</i> are plural: <b>Maria and Leo are</b> mechanics.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'Choose the correct verb: "The box of wrenches ___ on the shelf."', choices: ['is', 'are'], answer: 0 },
        { type: 'mc', q: 'Choose the correct verb: "Maria and her cousin ___ to fix the truck."', choices: ['want', 'wants'], answer: 0 },
        { type: 'mc', q: 'Which sentence is correct?', choices: ['Each of the students has a toolbox.', 'Each of the students have a toolbox.'], answer: 0, hint: 'The subject is "each," which is singular.' }
      ] },
    { title: 'Machine 3: Pronouns', content: '<p>Use a <b>subject pronoun</b> (I, he, she, we, they) when the pronoun does the action, and an <b>object pronoun</b> (me, him, her, us, them) when it receives the action.</p><p>Tip: cover up the other person. "Leo and (I / me) fixed the bike." → "I fixed the bike." So: <b>Leo and I</b>.</p><p>A pronoun must also agree with the noun it replaces: <i>The mechanics finished <b>their</b> work.</i></p>',
      puzzles: [
        { type: 'mc', q: 'Choose the correct pronoun: "Leo and ___ fixed the tire."', choices: ['I', 'me'], answer: 0 },
        { type: 'mc', q: 'Choose the correct pronoun: "The boss gave the keys to Maria and ___."', choices: ['me', 'I'], answer: 0 },
        { type: 'mc', q: 'Choose the correct pronoun: "The mechanics cleaned ___ tools."', choices: ['their', 'his', 'its', 'our'], answer: 0 }
      ] },
    { title: 'Machine 4: Verb Tense', content: '<p>Verb tense shows <b>when</b> something happens: past (<i>fixed</i>), present (<i>fixes</i>), future (<i>will fix</i>). In a paragraph, stay in the same tense unless the time actually changes.</p><p>❌ Yesterday I <b>open</b> the hood and <b>checked</b> the oil.<br>✅ Yesterday I <b>opened</b> the hood and <b>checked</b> the oil.</p>',
      puzzles: [
        { type: 'mc', q: 'Which sentence keeps a consistent tense?', choices: ['Last week, Jada washed the car and waxed it.', 'Last week, Jada washes the car and waxed it.', 'Last week, Jada will wash the car and waxed it.'], answer: 0 },
        { type: 'mc', q: 'Choose the correct verb: "Tomorrow, the garage ___ at 8:00."', choices: ['will open', 'opened', 'opening'], answer: 0 }
      ] },
    { title: 'Machine 5: Capitals and Commas', content: '<p>The last machine checks <b>capitalization</b> and <b>commas</b>:</p><ul><li>Capitalize the first word of a sentence, proper nouns (<i>Indiana, Monday, Dr. Patel</i>), and <b>I</b>.</li><li>Use commas in a list: <i>oil, tires, and brakes</i>.</li><li>Use a comma after an introductory word or phrase: <i>After lunch, we fixed the van.</i></li></ul>',
      puzzles: [
        { type: 'mc', q: 'Which sentence is capitalized correctly?', choices: ['On Monday, Dr. Patel drove to Indianapolis.', 'On monday, dr. Patel drove to indianapolis.', 'on Monday, Dr. patel drove to Indianapolis.'], answer: 0 },
        { type: 'mc', q: 'Which sentence uses commas correctly?', choices: ['We checked the oil, tires, and brakes.', 'We checked, the oil tires and brakes.', 'We checked the oil tires, and, brakes.'], answer: 0 },
        { type: 'tf', q: 'True or false: "After the storm, we cleaned the garage." needs a comma after "storm."', answer: true, explain: 'A comma follows an introductory phrase.' }
      ] }
  ],
  finale: '<p>The last machine roars to life, and the garage door rolls up. The head mechanic tosses you the keys. "Clean parts of speech, matching subjects and verbs, the right pronouns, steady tense, and sharp punctuation. You\'re officially a grammar mechanic."</p>',
  exit: [
    { q: 'Choose the correct verb: "The pack of dogs ___ barking."', choices: ['is', 'are'], answer: 0 },
    { q: 'Choose the correct sentence.', choices: ['Me and Sam went to the store.', 'Sam and I went to the store.', 'Sam and me went to the store.', 'I and Sam goes to the store.'], answer: 1 },
    { q: 'Rewrite this sentence correctly and explain ONE fix you made: "yesterday me and ana goes to the park and play soccer"', answer: 'Yesterday, Ana and I went to the park and played soccer. (Fixes: capitalize Yesterday and Ana; use "Ana and I"; keep past tense: went, played; comma after Yesterday.)', lines: 4 }
  ]
},

/* ---------- Sentence structure ---------- */
{
  id: 'g6-ela-sentence-case', std: 'g6-ela-writing', format: 'mystery',
  title: 'The Case of the Runaway Run-Ons',
  tagline: 'Fragments and run-ons have escaped from the Sentence Factory. Track them down and rebuild them.',
  story: '<p>Alarm bells are ringing at the <b>Sentence Factory</b>! Overnight, someone broke the machines, and now broken sentences are everywhere: <b>fragments</b> missing parts, and <b>run-ons</b> crashing into each other.</p><p>As the factory\'s detective, you\'ll examine five evidence files and put every sentence back together.</p>',
  code: 'JOINS',
  stages: [
    { title: 'Evidence File #1: What Makes a Sentence?', content: '<p>A complete sentence needs three things:</p><ol><li>A <b>subject</b> (who or what the sentence is about)</li><li>A <b>predicate</b> (what the subject does or is; it contains the verb)</li><li>A <b>complete thought</b></li></ol><p>A <b>fragment</b> is missing one of these. <i>"Ran across the field."</i> (No subject.) <i>"Because it was raining."</i> (Not a complete thought.)</p>',
      puzzles: [
        { type: 'sort', q: 'Is each one a complete sentence or a fragment?', buckets: ['Complete sentence', 'Fragment'], items: [['The factory closed at midnight.', 0], ['Because the machines broke.', 1], ['Ran down the hallway.', 1], ['The detective found a clue.', 0], ['After the alarm went off.', 1]] },
        { type: 'mc', q: 'In "The tired workers left early," what is the subject?', choices: ['The tired workers', 'left early', 'early', 'left'], answer: 0 }
      ] },
    { title: 'Evidence File #2: Fix the Fragments', content: '<p>You can fix a fragment by adding the missing part or attaching it to a nearby sentence.</p><p>Fragment: <i>Because the belt snapped.</i><br>Fixed: <i>The machine stopped <b>because the belt snapped</b>.</i></p>',
      puzzles: [
        { type: 'mc', q: 'Which option fixes the fragment "When the whistle blew."?', choices: ['When the whistle blew, the workers took a break.', 'When the whistle blew loudly.', 'The whistle. When it blew.', 'When blew the whistle.'], answer: 0 },
        { type: 'mc', q: 'What is missing from the fragment "Fixed the conveyor belt."?', choices: ['A subject (who fixed it?)', 'A verb', 'A period', 'Nothing; it is complete'], answer: 0 }
      ] },
    { title: 'Evidence File #3: Stop the Run-Ons', content: '<p>A <b>run-on</b> joins two complete sentences with no punctuation. A <b>comma splice</b> joins them with only a comma.</p><p>❌ <i>The alarm rang the workers ran outside.</i> (run-on)<br>❌ <i>The alarm rang, the workers ran outside.</i> (comma splice)</p><p>✅ Fix it with a period, a comma + conjunction, or a semicolon:<br><i>The alarm rang. The workers ran outside.</i><br><i>The alarm rang, <b>so</b> the workers ran outside.</i><br><i>The alarm rang<b>;</b> the workers ran outside.</i></p>',
      puzzles: [
        { type: 'mc', q: 'Which is a run-on sentence?', choices: ['The lights flickered the machines stopped.', 'The lights flickered, and the machines stopped.', 'The lights flickered. The machines stopped.', 'When the lights flickered, the machines stopped.'], answer: 0 },
        { type: 'mc', q: 'Which correctly fixes "I found a gear, it was broken."?', choices: ['I found a gear, but it was broken.', 'I found a gear it was broken.', 'I found, a gear it was broken.', 'I found a gear, it, was broken.'], answer: 0 },
        { type: 'tf', q: 'True or false: A comma alone is enough to join two complete sentences.', answer: false, explain: 'That is a comma splice. Add a conjunction (and, but, so), use a semicolon, or make two sentences.' }
      ] },
    { title: 'Evidence File #4: Sentence Types', content: '<p>The factory builds three types of sentences:</p><ul><li><b>Simple</b>: one independent clause. <i>The belt moved.</i></li><li><b>Compound</b>: two independent clauses joined by a comma and a coordinating conjunction (<b>FANBOYS</b>: for, and, nor, but, or, yet, so) or a semicolon. <i>The belt moved, and the boxes rolled.</i></li><li><b>Complex</b>: an independent clause plus a dependent clause that starts with a word like <i>because, when, although, if, since, after</i>. <i>When the belt moved, the boxes rolled.</i></li></ul>',
      puzzles: [
        { type: 'sort', q: 'Sort each sentence by type.', buckets: ['Simple', 'Compound', 'Complex'], items: [['The detective smiled.', 0], ['The door was locked, so she used the window.', 1], ['Because the lights were out, no one saw the thief.', 2], ['The workers searched, but they found nothing.', 1], ['Although it was late, the detective kept working.', 2]] },
        { type: 'mc', q: 'Which word is a coordinating conjunction (FANBOYS)?', choices: ['but', 'because', 'although', 'when'], answer: 0 }
      ] },
    { title: 'Evidence File #5: Rebuild the Factory Report', content: '<p>Writers combine short, choppy sentences to make writing flow. Use the evidence to rebuild the report.</p>',
      puzzles: [
        { type: 'mc', q: 'Which BEST combines "The alarm rang. It was midnight." into a complex sentence?', choices: ['When the alarm rang, it was midnight.', 'The alarm rang it was midnight.', 'The alarm rang, it was midnight.', 'The alarm. Rang at midnight.'], answer: 0 },
        { type: 'mc', q: 'Which BEST combines "The thief was fast. The detective was faster." into a compound sentence?', choices: ['The thief was fast, but the detective was faster.', 'The thief was fast the detective was faster.', 'Because the thief was fast.', 'The thief was fast, the detective was faster.'], answer: 0 },
        { type: 'match', q: 'Match each problem to its fix.', pairs: [['Fragment', 'Add the missing subject, verb, or thought'], ['Run-on', 'Separate the two sentences with punctuation'], ['Comma splice', 'Add a conjunction after the comma'], ['Choppy sentences', 'Combine them into a compound or complex sentence']] }
      ] }
  ],
  finale: '<p>The last sentence clicks into place, and the factory hums back to life. The foreman reads your report and whistles. "No fragments, no run-ons, and a mix of simple, compound, and complex sentences. Case closed!"</p>',
  exit: [
    { q: 'Which is a fragment?', choices: ['The dog barked.', 'Since the bus was late.', 'We ran home.', 'She smiled.'], answer: 1 },
    { q: 'Which is a compound sentence?', choices: ['I was hungry, so I made a sandwich.', 'Because I was hungry.', 'I made a sandwich.', 'When I was hungry, I ate.'], answer: 0 },
    { q: 'Fix this run-on in TWO different ways: "The game ended we cheered loudly."', answer: '1) The game ended. We cheered loudly. 2) The game ended, and we cheered loudly. (Also correct: When the game ended, we cheered loudly. / The game ended; we cheered loudly.)', lines: 4 }
  ]
},

/* ---------- Paragraph structure ---------- */
{
  id: 'g6-ela-paragraph-bakery', std: 'g6-ela-writing', format: 'escape',
  title: 'The Paragraph Bakery',
  tagline: 'Stack the perfect paragraph like a layered sandwich to escape the bakery before closing time.',
  story: '<p>You\'re helping out at the <b>Paragraph Bakery</b>, famous for its perfectly stacked sandwiches. At closing time the doors lock, and the baker leaves a note: <b>"Build me the perfect paragraph, and I\'ll let you out."</b></p><p>A great paragraph is stacked like a sandwich: the <b>top bun</b> is the topic sentence, the <b>fillings</b> are supporting details, and the <b>bottom bun</b> is the concluding sentence.</p>',
  code: 'TOPIC',
  stages: [
    { title: 'Station 1: The Top Bun (Topic Sentence)', content: '<p>The <b>topic sentence</b> tells the reader the main idea of the paragraph. It is usually the first sentence. A strong topic sentence is clear and focused, not too broad and not too narrow.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the strongest topic sentence for a paragraph about why students should have recess?', choices: ['Recess helps students stay healthy, focused, and connected with friends.', 'There are many things in the world.', 'I ate a sandwich at recess yesterday.', 'Recess is at 12:15.'], answer: 0 },
        { type: 'mc', q: 'What is the job of a topic sentence?', choices: ['To state the main idea of the paragraph', 'To end the paragraph', 'To give one small example', 'To list all the sources'], answer: 0 }
      ] },
    { title: 'Station 2: The Fillings (Supporting Details)', content: '<p><b>Supporting details</b> prove or explain the topic sentence. They can be facts, examples, reasons, or quotes, followed by an explanation. Every detail must connect to the main idea.</p><p>Topic sentence: <i>Dogs make great pets for families.</i></p>',
      puzzles: [
        { type: 'sort', q: 'Which details support the topic sentence "Dogs make great pets for families"?', buckets: ['Supports the topic', 'Off topic'], items: [['Dogs are loyal and protective of their families.', 0], ['Walking a dog helps everyone get exercise.', 0], ['Cats can be trained to use a litter box.', 1], ['Many dogs are gentle and patient with children.', 0], ['My uncle drives a blue truck.', 1]] },
        { type: 'mc', q: 'Why should an off-topic sentence be removed?', choices: ['It does not support the main idea and confuses the reader', 'It is too short', 'All paragraphs need exactly three sentences', 'It uses a capital letter'], answer: 0 }
      ] },
    { title: 'Station 3: The Sauce (Transitions)', content: '<p><b>Transition words</b> connect ideas and help the reader follow along.</p><ul><li>To add: <i>first, also, in addition, furthermore</i></li><li>To give an example: <i>for example, for instance</i></li><li>To show contrast: <i>however, on the other hand</i></li><li>To conclude: <i>in conclusion, overall, as a result</i></li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each transition to its purpose.', pairs: [['For example', 'Gives an example'], ['However', 'Shows a contrast'], ['In addition', 'Adds another idea'], ['In conclusion', 'Wraps up the paragraph']] },
        { type: 'mc', q: 'Choose the best transition: "Dogs need daily walks. ___, they need fresh water and healthy food."', choices: ['In addition', 'However', 'In conclusion', 'For instance'], answer: 0 }
      ] },
    { title: 'Station 4: The Bottom Bun (Concluding Sentence)', content: '<p>The <b>concluding sentence</b> wraps up the paragraph. It restates the main idea in new words or leaves the reader with a final thought. It should not introduce a brand-new topic.</p>',
      puzzles: [
        { type: 'mc', q: 'Which is the best concluding sentence for a paragraph about why dogs make great pets?', choices: ['For all these reasons, a dog can be a loving and helpful member of any family.', 'Cats are also popular pets.', 'Dogs make great pets.', 'My favorite color is green.'], answer: 0 },
        { type: 'tf', q: 'True or false: A concluding sentence should introduce a brand-new topic.', answer: false, explain: 'It wraps up the main idea; it doesn\'t start a new one.' }
      ] },
    { title: 'Station 5: Stack the Sandwich', content: '<p>The baker\'s final order: stack a complete paragraph in the right order.</p>',
      puzzles: [
        { type: 'order', q: 'Put the sentences in order to build the paragraph.', items: ['School gardens teach students valuable lessons.', 'First, students learn science by watching plants grow from seeds.', 'In addition, they practice responsibility by watering and weeding every week.', 'For example, at Sunnyside, sixth graders grow tomatoes for the cafeteria.', 'Overall, a school garden helps students learn, grow, and give back.'] },
        { type: 'mc', q: 'In the paragraph above, which sentence is the topic sentence?', choices: ['School gardens teach students valuable lessons.', 'First, students learn science by watching plants grow from seeds.', 'For example, at Sunnyside, sixth graders grow tomatoes.', 'Overall, a school garden helps students learn, grow, and give back.'], answer: 0 },
        { type: 'mc', q: 'Which sentence would be OFF topic if added to the garden paragraph?', choices: ['The school bus is yellow.', 'Gardening also teaches patience.', 'Students share the vegetables with families.', 'Plants need sunlight and water to grow.'], answer: 0 }
      ] }
  ],
  finale: '<p>The baker takes one look at your paragraph sandwich and grins. "Top bun, tasty fillings, smooth sauce, and a solid bottom bun. That\'s a paragraph worth serving!" The bakery doors swing open.</p>',
  exit: [
    { q: 'Which sentence usually states the main idea of a paragraph?', choices: ['The topic sentence', 'The concluding sentence', 'A transition', 'An example'], answer: 0 },
    { q: 'Which transition shows contrast?', choices: ['For example', 'In addition', 'However', 'First'], answer: 2 },
    { q: 'Write a 5-sentence paragraph about your favorite season: a topic sentence, three supporting details with transitions, and a concluding sentence.', answer: 'Example: Fall is the best season of the year. First, the leaves turn bright red, orange, and yellow. In addition, the cool air is perfect for football games and hikes. For example, my family hikes at Turkey Run every October. Overall, fall is full of color, fun, and time together.', lines: 6 }
  ]
}

);
