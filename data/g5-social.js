/* Grade 5 Social Studies rooms */
window.CX_ROOMS = window.CX_ROOMS || [];
window.CX_ROOMS.push(

/* ---------- 5.1 Native Americans, Exploration, Colonies ---------- */
{
  id: 'g5-ss-colonial-roadtrip', std: 'g5-ss-colonial', format: 'fieldtrip',
  title: 'Colonial Road Trip, 1750',
  tagline: 'Travel by horse and ship through the New England, Middle, and Southern colonies.',
  story: '<p>The year is 1750. You are a young mapmaker hired by a London printing shop to report on life in Britain\'s thirteen North American colonies. Your route starts in Boston and ends in Charleston.</p><p>At each stop, take careful notes. The printer needs to know how geography shapes the way colonists live and work.</p>',
  code: 'TRADE',
  stages: [
    { title: 'Stop 1: Boston, Massachusetts', content: '<p>Welcome to <b>New England</b>! The soil here is thin and rocky, and winters are long and cold. Farms are small. Instead, people turn to the sea: <b>fishing, whaling, shipbuilding, and trade</b>. The forests provide lumber for ships.</p><p>Many New England colonies were founded by Puritans and Pilgrims seeking to practice their religion. Towns hold <b>town meetings</b> where free men vote on local issues.</p>',
      puzzles: [
        { type: 'mc', q: 'Why did most New Englanders NOT run large farms?', choices: ['Rocky soil and a short growing season', 'There was no rain', 'Farming was against the law', 'The land was too flat'], answer: 0 },
        { type: 'sort', q: 'Which jobs were common in New England?', buckets: ['Common in New England', 'Not common in New England'], items: [['Fishing', 0], ['Shipbuilding', 0], ['Whaling', 0], ['Large rice plantations', 1], ['Growing tobacco', 1]] },
        { type: 'mc', q: 'What was a town meeting?', choices: ['A gathering where free men voted on local issues', 'A church service', 'A market day', 'A meeting with the king'], answer: 0 }
      ] },
    { title: 'Stop 2: Philadelphia, Pennsylvania', content: '<p>The <b>Middle colonies</b> (New York, New Jersey, Pennsylvania, Delaware) have fertile soil and a milder climate. Farmers grow so much wheat, corn, and oats that the region is called the <b>"breadbasket" colonies</b>.</p><p>Philadelphia is a busy port. People from many countries and religions live here: English, Dutch, German, Swedish, Quakers, Catholics, and Jews. Pennsylvania\'s founder, <b>William Penn</b>, a Quaker, promised religious freedom.</p>',
      puzzles: [
        { type: 'mc', q: 'Why were the Middle colonies called the "breadbasket" colonies?', choices: ['They grew large amounts of grain like wheat', 'They made baskets', 'They had many bakeries', 'They traded bread with Britain only'], answer: 0 },
        { type: 'mc', q: 'Which word best describes the people of the Middle colonies?', choices: ['Diverse', 'All Puritan', 'All from Spain', 'All farmers from England'], answer: 0 },
        { type: 'tf', q: 'True or false: William Penn founded Pennsylvania as a place of religious freedom.', answer: true }
      ] },
    { title: 'Stop 3: Williamsburg, Virginia', content: '<p>You sail south to the <b>Southern colonies</b> (Maryland, Virginia, North Carolina, South Carolina, Georgia). The climate is warm, and the growing season is long.</p><p>Wealthy planters own huge farms called <b>plantations</b> that grow <b>cash crops</b> to sell in Europe: tobacco in Virginia and Maryland, rice and indigo (a blue dye) in South Carolina.</p><p>Plantations depend on the forced labor of <b>enslaved Africans</b>, who were kidnapped, brought across the Atlantic, and denied their freedom. By 1750, enslaved people made up about 40% of Virginia\'s population.</p>',
      puzzles: [
        { type: 'mc', q: 'What is a cash crop?', choices: ['A crop grown to sell for money', 'A crop used as money', 'A crop only for the family to eat', 'A crop that grows in winter'], answer: 0 },
        { type: 'match', q: 'Match each colony to its main cash crop.', pairs: [['Virginia', 'Tobacco'], ['South Carolina', 'Rice and indigo'], ['Pennsylvania (Middle)', 'Wheat']] },
        { type: 'mc', q: 'Whose labor did Southern plantations depend on?', choices: ['Enslaved Africans', 'Only the plantation owners', 'Machines', 'Soldiers from Britain'], answer: 0 }
      ] },
    { title: 'Stop 4: The Trade Routes', content: '<p>At the docks in Charleston, a sea captain explains how goods move around the Atlantic Ocean:</p><ul><li>Colonies send raw materials (lumber, furs, tobacco, rice) to Britain.</li><li>Britain sends manufactured goods (cloth, tools, tea) to the colonies.</li><li>Ships carry enslaved Africans across the Atlantic in a brutal journey called the <b>Middle Passage</b>.</li></ul><p>These routes are often called the <b>triangular trade</b>.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort the goods by where they usually came from.', buckets: ['Raw materials from the colonies', 'Manufactured goods from Britain'], items: [['Lumber', 0], ['Tobacco', 0], ['Furs', 0], ['Cloth', 1], ['Iron tools', 1], ['Glass windows', 1]] },
        { type: 'mc', q: 'What was the Middle Passage?', choices: ['The forced voyage of enslaved Africans across the Atlantic', 'A road between the colonies', 'A river in Pennsylvania', 'A trade route to Asia'], answer: 0 }
      ] },
    { title: 'Stop 5: Writing Your Report', content: '<p>Your trip is over. Before you mail your report to London, organize your notes into a chart. Remember: <b>geography</b> (land and climate) shaped the <b>economy</b> (how people made a living) in each region.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each fact into the correct colonial region.', buckets: ['New England', 'Middle', 'Southern'], items: [['Rocky soil, cold winters', 0], ['Whaling and shipbuilding', 0], ['"Breadbasket" of wheat', 1], ['William Penn and the Quakers', 1], ['Tobacco and rice plantations', 2], ['Long, warm growing season', 2]] },
        { type: 'mc', q: 'Which statement best sums up your report?', choices: ['Each region\'s geography shaped how colonists earned a living', 'All colonies had the same economy', 'Only the Southern colonies traded with Britain', 'Geography did not matter in the colonies'], answer: 0 }
      ] }
  ],
  finale: '<p>Your report is printed in London and sells out in a week. Readers are fascinated by how different the colonies are: fishermen in Boston, wheat farmers near Philadelphia, and plantations in the South, all shaped by the land around them.</p>',
  exit: [
    { q: 'Which region was known as the "breadbasket" colonies?', choices: ['New England', 'Middle colonies', 'Southern colonies', 'None of them'], answer: 1 },
    { q: 'Why did plantations develop in the Southern colonies?', choices: ['Rocky soil', 'A warm climate and long growing season for cash crops', 'Cold winters', 'Lots of fishing'], answer: 1 },
    { q: 'Choose one colonial region. Explain how its geography affected the way people made a living.', answer: 'Example: New England\'s rocky soil and cold climate made farming hard, so people fished, built ships, and traded.', lines: 4 }
  ]
},
{
  id: 'g5-ss-native-gallery', std: 'g5-ss-colonial', format: 'gallery',
  title: 'Nations Before Us',
  tagline: 'A virtual gallery walk through five Native American culture regions of North America.',
  story: '<p>Welcome to the <b>Nations Before Us</b> gallery. Long before Europeans arrived, hundreds of Native nations lived across North America, each adapted to its environment. Their descendants live here today.</p><p>Visit each exhibit in any order. Read the placard, study the details, and answer the curator\'s questions.</p>',
  code: 'MAIZE',
  hook: 'Ask: "What Native American nations lived where our school is now?" (In most of Indiana: the Miami, Potawatomi, Shawnee, Delaware/Lenape, and others.) Point out that Indiana means "land of the Indians."',
  stages: [
    { title: 'Eastern Woodlands', content: '<h3>Placard</h3><p>The Eastern Woodlands stretched from the Atlantic Ocean to the Mississippi River, including present-day <b>Indiana</b>. Forests provided wood, deer, and turkey. Nations included the <b>Miami, Potawatomi, Shawnee</b>, and the <b>Haudenosaunee (Iroquois) Confederacy</b>.</p><p>Many Woodlands people farmed the <b>"Three Sisters": corn (maize), beans, and squash</b>, planted together. They lived in villages of wigwams or longhouses covered in bark.</p><p>The Haudenosaunee Confederacy united five (later six) nations under the <b>Great Law of Peace</b>, which some historians believe influenced American ideas about government.</p>',
      puzzles: [
        { type: 'mc', q: 'What were the "Three Sisters"?', choices: ['Corn, beans, and squash', 'Three nations of the Great Plains', 'Three rivers in Indiana', 'Three kinds of homes'], answer: 0 },
        { type: 'mc', q: 'Which Native nation lived in the area that is now Indiana?', choices: ['Miami', 'Hopi', 'Tlingit', 'Navajo'], answer: 0 },
        { type: 'mc', q: 'What was the Great Law of Peace?', choices: ['The constitution that united the Haudenosaunee nations', 'A treaty with England', 'A farming method', 'A type of longhouse'], answer: 0 }
      ] },
    { title: 'Great Plains', content: '<h3>Placard</h3><p>The Great Plains are wide grasslands in the middle of North America. Nations like the <b>Lakota, Cheyenne, and Comanche</b> depended on the <b>bison (buffalo)</b>. They used nearly every part: meat for food, hides for clothing and tipis, bones for tools, and sinew for thread.</p><p>After the Spanish brought horses in the 1500s, many Plains nations became expert riders and followed the herds. <b>Tipis</b> could be taken down and moved quickly.</p>',
      puzzles: [
        { type: 'match', q: 'Match each part of the bison to how it was used.', pairs: [['Hide', 'Tipi covers and clothing'], ['Meat', 'Food'], ['Bones', 'Tools'], ['Sinew', 'Thread and bowstrings']] },
        { type: 'mc', q: 'Why were tipis a good kind of home for many Plains people?', choices: ['They could be moved quickly to follow the bison', 'They were made of stone', 'They were very tall', 'They kept out snow best'], answer: 0 }
      ] },
    { title: 'Southwest', content: '<h3>Placard</h3><p>The Southwest is hot and dry, with deserts, mesas, and canyons. The <b>Pueblo peoples</b> (such as the Hopi and Zuni) built multi-story homes of <b>adobe</b>, sun-dried bricks made from clay, sand, and straw. Thick adobe walls stay cool during hot days.</p><p>With little rain, farmers used <b>irrigation</b> to bring water to fields of corn, beans, and squash. The <b>Navajo (Diné)</b> became known for sheep herding and weaving.</p>',
      puzzles: [
        { type: 'mc', q: 'Why was adobe a good building material in the Southwest?', choices: ['Clay was available and thick walls stayed cool', 'It floated', 'Trees were everywhere', 'It was the only material that did not burn'], answer: 0 },
        { type: 'mc', q: 'How did Southwest farmers grow crops with little rain?', choices: ['Irrigation', 'Fishing', 'Trading with Europe', 'Growing crops only in winter'], answer: 0 }
      ] },
    { title: 'Pacific Northwest', content: '<h3>Placard</h3><p>Along the rainy, forested Pacific coast, nations like the <b>Tlingit, Haida, and Kwakwaka\'wakw</b> found plenty of food: salmon, whales, seals, berries, and shellfish. With so much food, many villages did not need to farm.</p><p>Huge cedar trees were carved into <b>plank houses, canoes, and totem poles</b> that told family and clan histories. At a <b>potlatch</b>, a host gave away gifts to show wealth and honor.</p>',
      puzzles: [
        { type: 'mc', q: 'What natural resource did Pacific Northwest nations use for houses, canoes, and totem poles?', choices: ['Cedar trees', 'Adobe clay', 'Bison hides', 'Ice'], answer: 0 },
        { type: 'mc', q: 'Why did many Pacific Northwest villages not need to farm?', choices: ['They had plenty of fish and wild food', 'The soil was too sandy', 'Farming was not allowed', 'It never rained'], answer: 0 }
      ] },
    { title: 'Arctic', content: '<h3>Placard</h3><p>In the far north, the <b>Inuit</b> and <b>Yupik</b> peoples live in one of the coldest places on Earth. Few plants grow, so they hunted seals, whales, walruses, and caribou.</p><p>Hunters traveled by <b>kayak</b> and <b>dog sled</b>. Some groups built temporary snow houses (<b>igloos</b>) while traveling on hunting trips. Warm clothing was made from animal furs and skins.</p>',
      puzzles: [
        { type: 'sort', q: 'Match each item to the region it comes from.', buckets: ['Arctic', 'Southwest', 'Great Plains'], items: [['Kayak', 0], ['Dog sled', 0], ['Adobe pueblo', 1], ['Irrigated cornfield', 1], ['Tipi', 2], ['Bison hunt', 2]] },
        { type: 'mc', q: 'What big idea connects every exhibit in this gallery?', choices: ['Native nations adapted their homes, food, and tools to their environment', 'All Native nations lived the same way', 'Native nations only lived in the Southwest', 'Native nations did not farm'], answer: 0 }
      ] }
  ],
  finale: '<p>You reach the end of the gallery, where a sign reads: <b>"We are still here."</b> Today, there are 574 federally recognized tribal nations in the United States. Each has its own language, government, and traditions shaped by the land its ancestors knew.</p>',
  exit: [
    { q: 'Which culture region depended most on the bison?', choices: ['Arctic', 'Great Plains', 'Pacific Northwest', 'Eastern Woodlands'], answer: 1 },
    { q: 'Adobe homes were built in which region?', choices: ['Southwest', 'Arctic', 'Eastern Woodlands', 'Pacific Northwest'], answer: 0 },
    { q: 'Choose one Native American culture region. Explain how the people there adapted to their environment.', answer: 'Example: Eastern Woodlands peoples used forest trees to build longhouses and wigwams, hunted deer, and farmed corn, beans, and squash.', lines: 4 }
  ]
},
{
  id: 'g5-ss-explorer-escape', std: 'g5-ss-colonial', format: 'escape',
  title: 'Lost at Sea: The Explorer\'s Escape',
  tagline: 'You\'re locked in the captain\'s cabin of a 1600s ship. Only knowledge of exploration can get you out.',
  story: '<p>A storm has blown your ship off course, and the captain locked his cabin door before disappearing below deck. Inside you find his journals, maps, and five locked chests. The first mate calls through the door: "The captain always said: only someone who knows why we explore can open his chests!"</p>',
  code: 'SHIPS',
  stages: [
    { title: 'The Captain\'s Journal', content: '<p>The first page of the journal reads:</p><blockquote>Kings and queens send us across the ocean for three reasons, which sailors call the <b>Three G\'s</b>: <b>Gold</b> (riches and new trade routes to Asia\'s spices and silk), <b>Glory</b> (fame and power for our country), and <b>God</b> (spreading Christianity).</blockquote><p>European nations wanted a faster sea route to Asia. Instead, they ran into two continents they did not know existed: the Americas.</p>',
      puzzles: [
        { type: 'match', q: 'Match each of the Three G\'s to its meaning.', pairs: [['Gold', 'Riches and trade'], ['Glory', 'Fame and power for a nation'], ['God', 'Spreading Christianity']] },
        { type: 'mc', q: 'What were many European explorers originally looking for?', choices: ['A faster sea route to Asia', 'A route to Antarctica', 'New places to farm wheat', 'The North Pole'], answer: 0 }
      ] },
    { title: 'The Map Chest', content: '<p>Inside the chest is a map labeled with famous voyages:</p><ul><li><b>1492, Christopher Columbus</b> (sailing for Spain): reached islands in the Caribbean.</li><li><b>1497, John Cabot</b> (for England): reached Newfoundland, Canada.</li><li><b>1513, Juan Ponce de León</b> (Spain): explored Florida.</li><li><b>1534, Jacques Cartier</b> (France): explored the St. Lawrence River.</li><li><b>1609, Henry Hudson</b> (for the Dutch): explored the Hudson River in New York.</li></ul>',
      puzzles: [
        { type: 'order', q: 'Put these voyages in order from earliest to latest.', items: ['Columbus reaches the Caribbean', 'Cabot reaches Newfoundland', 'Ponce de León explores Florida', 'Cartier explores the St. Lawrence', 'Hudson explores the Hudson River'] },
        { type: 'match', q: 'Match each explorer to the country that sponsored the voyage.', pairs: [['Columbus', 'Spain'], ['Cartier', 'France'], ['Cabot', 'England'], ['Hudson (1609)', 'The Netherlands (Dutch)']] }
      ] },
    { title: 'The Trade Chest', content: '<p>This chest is full of seeds and a note:</p><blockquote>After 1492, plants, animals, people, and diseases began crossing the Atlantic in both directions. We call it the <b>Columbian Exchange</b>.</blockquote><p><b>From the Americas to Europe, Africa, and Asia:</b> corn (maize), potatoes, tomatoes, cacao (chocolate), turkeys.<br><b>From Europe, Africa, and Asia to the Americas:</b> horses, cattle, pigs, wheat, sugar cane, and diseases like smallpox.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each item by the direction it traveled in the Columbian Exchange.', buckets: ['From the Americas', 'To the Americas'], items: [['Potatoes', 0], ['Tomatoes', 0], ['Corn (maize)', 0], ['Horses', 1], ['Wheat', 1], ['Smallpox', 1], ['Cattle', 1], ['Cacao', 0]] },
        { type: 'mc', q: 'Which part of the Columbian Exchange was most devastating for Native Americans?', choices: ['Diseases like smallpox, which killed millions', 'Wheat', 'Tomatoes', 'Horses'], answer: 0, explain: 'Native Americans had no immunity to European diseases. Historians estimate that disease killed a very large share of Native people in the century after 1492.' }
      ] },
    { title: 'The Navigation Chest', content: '<p>This chest holds the tools that made ocean voyages possible:</p><ul><li><b>Compass</b>: shows which direction is north.</li><li><b>Astrolabe</b>: measures the angle of the Sun or stars to find latitude.</li><li><b>Caravel</b>: a small, fast ship with triangle-shaped sails that could sail into the wind.</li></ul><p>Journeys were dangerous: storms, running out of food and fresh water, and a disease called <b>scurvy</b>, caused by a lack of vitamin C.</p>',
      puzzles: [
        { type: 'match', q: 'Match each tool to its use.', pairs: [['Compass', 'Finding direction'], ['Astrolabe', 'Finding latitude from the stars'], ['Caravel', 'A fast ship that could sail into the wind']] },
        { type: 'mc', q: 'What caused scurvy among sailors?', choices: ['Not enough vitamin C', 'Too much sunlight', 'Cold water', 'Seasickness'], answer: 0 }
      ] },
    { title: 'The Final Chest', content: '<p>The last chest has the captain\'s reflection:</p><blockquote>Our voyages changed the world. Europe gained new foods, land, and riches. But for the Native peoples who already lived here, the arrival of Europeans brought disease, war, and the loss of their homelands.</blockquote>',
      puzzles: [
        { type: 'sort', q: 'Sort the effects of European exploration.', buckets: ['Effect on Europeans', 'Effect on Native Americans'], items: [['Gained new foods like potatoes', 0], ['Claimed new land and riches', 0], ['Millions died from new diseases', 1], ['Lost homelands to colonists', 1], ['Gained horses, which changed Plains life', 1]] },
        { type: 'mc', q: 'Why is it important to study exploration from more than one point of view?', choices: ['The same events affected different groups in very different ways', 'Only explorers wrote history', 'Native Americans were not affected', 'It is not important'], answer: 0 }
      ] }
  ],
  finale: '<p>The last lock clicks open and the cabin door swings wide. The storm has cleared, and land is on the horizon. The first mate grins: "You understand exploration better than the captain himself!"</p>',
  exit: [
    { q: 'Which of these came FROM the Americas in the Columbian Exchange?', choices: ['Horses', 'Wheat', 'Potatoes', 'Smallpox'], answer: 2 },
    { q: 'What were the "Three G\'s" of exploration?', choices: ['Gold, Glory, God', 'Grain, Guns, Gold', 'Gifts, Games, Glory', 'God, Grain, Gardens'], answer: 0 },
    { q: 'Describe one positive and one negative effect of the Columbian Exchange.', answer: 'Positive: new foods like potatoes and corn fed more people in Europe. Negative: diseases like smallpox killed millions of Native Americans.', lines: 4 }
  ]
},

/* ---------- 5.1 American Revolution ---------- */
{
  id: 'g5-ss-escape-1776', std: 'g5-ss-revolution', format: 'escape',
  title: 'Escape from 1776',
  tagline: 'A time machine malfunction strands you in Philadelphia. Fix history to get home.',
  story: '<p>Your class time machine has glitched and dropped you in Philadelphia on <b>July 3, 1776</b>. The machine\'s screen flashes: <b>HISTORY CORRUPTED. RESTORE TIMELINE TO RETURN.</b></p><p>Five locks guard the machine\'s controls. Each one tests your knowledge of how the colonies got here.</p>',
  code: 'RIGHT',
  stages: [
    { title: 'Lock 1: The War That Started It All', content: '<p>The machine replays a scene from 1763. Britain and its colonists have just won the <b>French and Indian War</b> (1754–1763) against France and its Native allies. Britain now controls land all the way to the Mississippi River.</p><p>But the war was expensive. King George III and Parliament decide the colonists should help pay the debt. They also issue the <b>Proclamation of 1763</b>, forbidding colonists from settling west of the Appalachian Mountains, which angers many colonists who want that land.</p>',
      puzzles: [
        { type: 'mc', q: 'Why did Britain begin taxing the colonies after 1763?', choices: ['To pay debts from the French and Indian War', 'To build new colonies in Asia', 'To punish Spain', 'To fund the Revolution'], answer: 0 },
        { type: 'mc', q: 'What did the Proclamation of 1763 do?', choices: ['Banned colonists from settling west of the Appalachian Mountains', 'Declared independence', 'Ended slavery', 'Created the Stamp Act'], answer: 0 }
      ] },
    { title: 'Lock 2: Taxes and Protests', content: '<p>The screen shows newspaper headlines:</p><ul><li><b>1765 Stamp Act</b>: a tax on newspapers, legal papers, and playing cards.</li><li><b>1767 Townshend Acts</b>: taxes on glass, paint, paper, and tea.</li><li><b>1773 Tea Act</b>: gave one British company control of tea sales.</li></ul><p>Colonists had no representatives in Parliament. Their slogan: <b>"No taxation without representation!"</b> They protested with <b>boycotts</b> (refusing to buy British goods) and groups like the <b>Sons of Liberty</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'What did "No taxation without representation" mean?', choices: ['Colonists should not be taxed by a Parliament they could not vote for', 'Colonists wanted to pay more taxes', 'Taxes should be paid only by representatives', 'Britain should stop trading'], answer: 0 },
        { type: 'mc', q: 'What is a boycott?', choices: ['Refusing to buy certain goods as a protest', 'A type of ship', 'A tax on tea', 'A British soldier'], answer: 0 },
        { type: 'match', q: 'Match each act to what it taxed or controlled.', pairs: [['Stamp Act', 'Newspapers and legal papers'], ['Townshend Acts', 'Glass, paint, paper, and tea'], ['Tea Act', 'Control of tea sales']] }
      ] },
    { title: 'Lock 3: Rising Tensions', content: '<p>The machine flickers through key moments:</p><ul><li><b>1770 Boston Massacre</b>: British soldiers fire into a crowd, killing five colonists, including Crispus Attucks, a man of African and Native descent.</li><li><b>1773 Boston Tea Party</b>: Sons of Liberty dump 342 chests of tea into Boston Harbor.</li><li><b>1774 Intolerable Acts</b>: Britain closes Boston Harbor as punishment.</li><li><b>1775 Lexington and Concord</b>: the first battles of the Revolution. "The shot heard round the world."</li></ul>',
      puzzles: [
        { type: 'order', q: 'Restore the timeline. Put these events in order.', items: ['Stamp Act', 'Boston Massacre', 'Boston Tea Party', 'Intolerable Acts', 'Battles of Lexington and Concord'] },
        { type: 'mc', q: 'Why did Britain pass the Intolerable Acts?', choices: ['To punish Boston for the Boston Tea Party', 'To reward the colonies', 'To end the war', 'To lower taxes'], answer: 0 }
      ] },
    { title: 'Lock 4: The Declaration', content: '<p>You reach the Pennsylvania State House (Independence Hall). Inside, the <b>Second Continental Congress</b> is debating. <b>Thomas Jefferson</b> has written a document explaining why the colonies should be free. It says:</p><blockquote>"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."</blockquote><p>The Declaration also lists complaints against King George III and states that government gets its power from the <b>consent of the governed</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'On what date was the Declaration of Independence adopted?', choices: ['July 4, 1776', 'July 4, 1787', 'April 19, 1775', 'December 16, 1773'], answer: 0 },
        { type: 'mc', q: 'Who was the main author of the Declaration of Independence?', choices: ['Thomas Jefferson', 'George Washington', 'King George III', 'Paul Revere'], answer: 0 },
        { type: 'sort', q: 'Which of these are "unalienable rights" named in the Declaration?', buckets: ['Named in the Declaration', 'Not named'], items: [['Life', 0], ['Liberty', 0], ['The pursuit of Happiness', 0], ['Owning a car', 1], ['Free education', 1]] }
      ] },
    { title: 'Lock 5: Winning the War', content: '<p>The last lock shows the war\'s turning points:</p><ul><li><b>1776–77, Trenton and Princeton</b>: Washington crosses the icy Delaware River for surprise victories.</li><li><b>1777, Saratoga</b>: a major American victory convinces <b>France</b> to join the war as an ally.</li><li><b>1779, Vincennes</b>: George Rogers Clark captures Fort Sackville in what is now <b>Indiana</b>, strengthening American claims to the western lands.</li><li><b>1781, Yorktown</b>: with French help, Americans trap the British army. General Cornwallis surrenders.</li><li><b>1783, Treaty of Paris</b>: Britain recognizes the independence of the United States.</li></ul>',
      puzzles: [
        { type: 'mc', q: 'Why was the Battle of Saratoga a turning point?', choices: ['It convinced France to join the Americans', 'It ended the war', 'The British won', 'It happened in Indiana'], answer: 0 },
        { type: 'mc', q: 'What happened at Vincennes, Indiana, in 1779?', choices: ['George Rogers Clark captured a British fort', 'The Declaration was signed', 'The war ended', 'Washington crossed the Delaware'], answer: 0 },
        { type: 'mc', q: 'Which document officially ended the war in 1783?', choices: ['Treaty of Paris', 'Declaration of Independence', 'Stamp Act', 'Constitution'], answer: 0 }
      ] }
  ],
  finale: '<p>The time machine\'s screen turns green: <b>TIMELINE RESTORED.</b> With a flash, you are back in your classroom. On the board someone has written, "No taxation without representation!" You smile. You know exactly what it means.</p>',
  exit: [
    { q: 'Which event happened FIRST?', choices: ['Boston Tea Party', 'Stamp Act', 'Declaration of Independence', 'Battle of Yorktown'], answer: 1 },
    { q: 'Why was France\'s help important to the Americans?', choices: ['France provided soldiers, money, and a navy', 'France wrote the Declaration', 'France was Britain\'s ally', 'France started the war'], answer: 0 },
    { q: 'Explain one cause of the American Revolution and how it led to conflict.', answer: 'Example: Britain taxed the colonists without giving them representation in Parliament. Colonists protested and boycotted, Britain punished them, and tensions led to fighting.', lines: 4 }
  ]
},
{
  id: 'g5-ss-midnight-messenger', std: 'g5-ss-revolution', format: 'mystery',
  title: 'The Midnight Messenger Mystery',
  tagline: 'April 18, 1775: a secret warning must reach Lexington. Read the evidence and solve the case.',
  story: '<p>You are a young member of the Patriot spy network in Boston. British soldiers, called Redcoats or regulars, are preparing to march out of the city tonight. Rumors say they will seize Patriot weapons in Concord and arrest leaders Samuel Adams and John Hancock in Lexington.</p><p>Examine each evidence file to figure out what happened on the most famous night of the Revolution.</p>',
  code: 'SPIES',
  stages: [
    { title: 'Evidence File #1: The Lantern Signal', content: '<p><b>Intercepted note:</b> "Hang lanterns in the steeple of the Old North Church. <b>One if by land, two if by sea.</b>"</p><p><b>Detective note:</b> The British could march out over the land (Boston Neck) or row across the Charles River ("by sea"). On the night of April 18, two lanterns were hung.</p>',
      puzzles: [
        { type: 'mc', q: 'Two lanterns were hung. What did that tell the Patriots?', choices: ['The British were coming across the water (by sea)', 'The British were coming by land', 'The British were not coming', 'The war was over'], answer: 0 },
        { type: 'mc', q: 'Why did Patriots use a lantern signal instead of a letter?', choices: ['It could be seen far away quickly and secretly', 'They could not write', 'Letters were illegal', 'Lanterns were cheaper'], answer: 0 }
      ] },
    { title: 'Evidence File #2: The Riders', content: '<p><b>Witness statements:</b></p><ul><li><b>Paul Revere</b>, a silversmith, rowed across the river and rode to Lexington to warn Adams and Hancock.</li><li><b>William Dawes</b> took a different road, in case one rider was caught.</li><li><b>Dr. Samuel Prescott</b> joined them. When British patrols stopped the riders, only Prescott escaped to reach <b>Concord</b>.</li></ul><p>Riders shouted "The regulars are coming out!" Most colonists still thought of themselves as British, so "The British are coming" would have been confusing.</p>',
      puzzles: [
        { type: 'mc', q: 'Why did Revere and Dawes take two different routes?', choices: ['So the message would get through if one was caught', 'They were lost', 'They did not like each other', 'To deliver mail'], answer: 0 },
        { type: 'mc', q: 'Which rider actually reached Concord that night?', choices: ['Samuel Prescott', 'Paul Revere', 'William Dawes', 'John Hancock'], answer: 0 },
        { type: 'tf', q: 'True or false: Paul Revere rode alone and was the only messenger that night.', answer: false, explain: 'Dawes, Prescott, and dozens of other riders spread the alarm through the countryside.' }
      ] },
    { title: 'Evidence File #3: Minutemen', content: '<p><b>Town record, Lexington:</b> Local militia members, called <b>minutemen</b>, trained to be ready to fight "at a minute\'s notice." At dawn on <b>April 19, 1775</b>, about 77 minutemen gathered on Lexington Green. About 700 British soldiers arrived. Someone fired a shot; no one knows who. Eight colonists were killed.</p><p>The British marched on to Concord, where more militia fought them at the <b>North Bridge</b>. As the British retreated to Boston, thousands of militiamen fired at them from behind trees and stone walls.</p>',
      puzzles: [
        { type: 'mc', q: 'Why were they called minutemen?', choices: ['They could be ready to fight at a minute\'s notice', 'They were very short', 'They only fought for one minute', 'They carried clocks'], answer: 0 },
        { type: 'mc', q: 'Who fired the first shot at Lexington?', choices: ['No one knows for sure', 'Paul Revere', 'King George', 'George Washington'], answer: 0 },
        { type: 'order', q: 'Put the events of April 18–19, 1775 in order.', items: ['Two lanterns hang in the Old North Church', 'Revere and Dawes ride to warn Lexington', 'Minutemen and British clash at Lexington Green', 'Fighting at Concord\'s North Bridge', 'British retreat to Boston under fire'] }
      ] },
    { title: 'Evidence File #4: Two Sides', content: '<p><b>Patriot newspaper:</b> "British troops fired on innocent farmers at Lexington in a cruel attack!"</p><p><b>British officer\'s report:</b> "Our men were fired upon by rebels hiding behind walls. We acted to defend ourselves."</p><p><b>Detective note:</b> A <b>primary source</b> is created by someone who was there. Primary sources can still be <b>biased</b>, showing only one side of the story.</p>',
      puzzles: [
        { type: 'mc', q: 'Why do the two sources describe the same event differently?', choices: ['Each side wanted to show itself as the victim', 'One source is about a different battle', 'They were written 200 years later', 'Both are exactly the same'], answer: 0 },
        { type: 'sort', q: 'Sort each item.', buckets: ['Primary source', 'Secondary source'], items: [['A British officer\'s 1775 report', 0], ['A minuteman\'s diary', 0], ['A 2020 textbook chapter', 1], ['A documentary made today', 1], ['A 1775 Patriot newspaper', 0]] }
      ] },
    { title: 'Evidence File #5: Case Summary', content: '<p>Your final job: summarize the case for the Patriot leaders. What was the result of April 19, 1775?</p><p>The battles of Lexington and Concord showed that colonists would fight. Within weeks, the Second Continental Congress met and made <b>George Washington</b> commander of a new <b>Continental Army</b>.</p>',
      puzzles: [
        { type: 'mc', q: 'Why are Lexington and Concord important?', choices: ['They were the first battles of the American Revolution', 'They ended the Revolution', 'The Declaration was signed there', 'They were in the Southern colonies'], answer: 0 },
        { type: 'mc', q: 'Who became commander of the Continental Army after these battles?', choices: ['George Washington', 'Paul Revere', 'Samuel Prescott', 'Thomas Jefferson'], answer: 0 }
      ] }
  ],
  finale: '<p>Case closed! The message got through, the weapons in Concord were hidden, and Adams and Hancock escaped. The shot fired at Lexington became known as "the shot heard round the world." The American Revolution had begun.</p>',
  exit: [
    { q: 'What did "two if by sea" mean?', choices: ['The British were crossing the water', 'Two riders would go', 'The war would last two years', 'Two ships would attack'], answer: 0 },
    { q: 'Where were the first battles of the American Revolution fought?', choices: ['Yorktown', 'Lexington and Concord', 'Philadelphia', 'Vincennes'], answer: 1 },
    { q: 'Why might a Patriot source and a British source describe the Battle of Lexington differently?', answer: 'Each side had a bias and wanted to blame the other for starting the fight, so each described the event from its own point of view.', lines: 3 }
  ]
},
{
  id: 'g5-ss-voices-revolution', std: 'g5-ss-revolution', format: 'gallery',
  title: 'Voices of the Revolution',
  tagline: 'A portrait gallery of the people, famous and forgotten, who shaped the fight for independence.',
  story: '<p>Welcome to the <b>Voices of the Revolution</b> portrait gallery. Each portrait tells the story of someone whose choices mattered in the fight for independence. Some are famous. Some are often left out of the story.</p><p>Visit each portrait in any order and read its placard.</p>',
  code: 'BRAVE',
  stages: [
    { title: 'George Washington', content: '<h3>Placard</h3><p>A Virginia planter and veteran of the French and Indian War, <b>George Washington</b> was chosen to lead the <b>Continental Army</b> in 1775. His army was often short on food, clothing, and pay. During the brutal winter of 1777–78 at <b>Valley Forge</b>, about 2,000 soldiers died from disease and cold, but Washington kept the army together.</p><p>After victory, he chose to give up power and return home. He later became the <b>first President</b> of the United States (1789–1797).</p>',
      puzzles: [
        { type: 'mc', q: 'What role did Washington have during the Revolution?', choices: ['Commander of the Continental Army', 'King of the colonies', 'Author of the Declaration', 'A British general'], answer: 0 },
        { type: 'mc', q: 'What happened at Valley Forge?', choices: ['The army survived a harsh winter with little food or supplies', 'The final battle of the war', 'The Declaration was signed', 'The British surrendered'], answer: 0 }
      ] },
    { title: 'Abigail Adams', content: '<h3>Placard</h3><p><b>Abigail Adams</b> ran her family\'s farm in Massachusetts while her husband, John Adams, served in Congress. In a famous 1776 letter, she wrote to him:</p><blockquote>"...in the new Code of Laws which I suppose it will be necessary for you to make I desire you would Remember the Ladies, and be more generous and favourable to them than your ancestors."</blockquote><p>Women kept farms and businesses running, made supplies for soldiers, and led boycotts of British goods.</p>',
      puzzles: [
        { type: 'mc', q: 'What was Abigail Adams asking for when she wrote "Remember the Ladies"?', choices: ['Rights and fair treatment for women in the new laws', 'More tea', 'A new house', 'To join the British'], answer: 0 },
        { type: 'mc', q: 'How did many women support the Revolution?', choices: ['Running farms and businesses and boycotting British goods', 'Voting in Congress', 'Commanding the army', 'Signing the Declaration'], answer: 0 }
      ] },
    { title: 'James Armistead Lafayette', content: '<h3>Placard</h3><p><b>James Armistead</b> was an enslaved man in Virginia who volunteered to serve as a spy. Pretending to be a runaway, he worked in the camp of British General Cornwallis and passed secret information to the Americans. His reports helped set the trap at <b>Yorktown</b> in 1781.</p><p>After the war, he was not freed automatically. He had to petition the Virginia legislature, and with a letter of support from the Marquis de Lafayette, he won his freedom in 1787. He added "Lafayette" to his name in thanks.</p><p>About <b>5,000 Black soldiers</b> fought for the Patriots. Many others joined the British, who promised freedom to those who escaped Patriot enslavers.</p>',
      puzzles: [
        { type: 'mc', q: 'How did James Armistead help win the war?', choices: ['He spied on the British and passed information to the Americans', 'He wrote the Declaration', 'He was a British general', 'He built ships'], answer: 0 },
        { type: 'mc', q: 'What does his story show about the Revolution?', choices: ['People fighting for liberty did not always receive it themselves', 'Everyone became free after the war', 'Only generals mattered', 'Spies were not important'], answer: 0 }
      ] },
    { title: 'George Rogers Clark', content: '<h3>Placard</h3><p>In February 1779, <b>George Rogers Clark</b> led about 170 men on an 18-day march through flooded, icy prairie from Kaskaskia (Illinois) to <b>Vincennes, Indiana</b>. At times they waded through freezing water up to their shoulders.</p><p>They surprised the British at <b>Fort Sackville</b>, and British commander Henry Hamilton surrendered. Clark\'s victory helped the United States claim the lands northwest of the Ohio River, including future Indiana, in the peace treaty.</p><p class="note">Today you can visit the George Rogers Clark National Historical Park in Vincennes.</p>',
      puzzles: [
        { type: 'mc', q: 'What did George Rogers Clark capture in 1779?', choices: ['Fort Sackville at Vincennes', 'Boston', 'Yorktown', 'Philadelphia'], answer: 0 },
        { type: 'mc', q: 'Why is Clark\'s victory important to Indiana?', choices: ['It helped the U.S. claim the land that became Indiana', 'It made Indiana a British colony', 'It ended slavery in Indiana', 'It started the French and Indian War'], answer: 0 },
        { type: 'input', q: 'About how many days did Clark\'s march to Vincennes take?', answer: ['18'], unit: 'days' }
      ] },
    { title: 'Loyalists & Allies', content: '<h3>Placard</h3><p>Not everyone supported independence. About one-fifth of colonists were <b>Loyalists</b> who stayed loyal to King George III. Many lost their homes and moved to Canada or Britain after the war.</p><p>Most Native nations tried to stay out of the war or sided with Britain, hoping to stop colonists from taking their land. <b>France</b>, and later Spain, helped the Patriots with money, soldiers, and ships. The <b>Marquis de Lafayette</b>, a young French noble, became one of Washington\'s trusted generals.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each person or group.', buckets: ['Supported the Patriots', 'Supported Britain'], items: [['Marquis de Lafayette', 0], ['France', 0], ['Loyalists', 1], ['King George III', 1], ['James Armistead', 0], ['General Cornwallis', 1]] },
        { type: 'mc', q: 'Why did many Native nations side with Britain?', choices: ['They hoped Britain would stop colonists from taking their land', 'They wanted to pay taxes', 'They lived in Britain', 'They were forced to by France'], answer: 0 }
      ] }
  ],
  finale: '<p>You reach the gallery exit, where a quote is painted on the wall: <b>"The Revolution was effected before the war commenced. The Revolution was in the minds and hearts of the people."</b> (John Adams). The Revolution was fought by many different people with different reasons, and it did not bring liberty to everyone equally.</p>',
  exit: [
    { q: 'Which person captured Fort Sackville in Vincennes, Indiana?', choices: ['George Washington', 'George Rogers Clark', 'Paul Revere', 'Lafayette'], answer: 1 },
    { q: 'What was a Loyalist?', choices: ['A colonist who stayed loyal to the king', 'A French soldier', 'A Patriot spy', 'A member of Congress'], answer: 0 },
    { q: 'Choose one person from the gallery. Explain how that person helped shape the Revolution.', answer: 'Example: James Armistead spied on the British, and his information helped the Americans win at Yorktown.', lines: 4 }
  ]
},

/* ---------- 5.2 Founding Documents & Government ---------- */
{
  id: 'g5-ss-branches-quest', std: 'g5-ss-civics', format: 'quest',
  title: 'Branches of Power Quest',
  tagline: 'Climb the three branches of the Freedom Tree and master checks and balances.',
  story: '<p>The ancient Freedom Tree has three mighty branches, and only a true citizen can climb to the top. Each level teaches you something about how the U.S. Constitution divides and balances power. Collect a letter at each level to unlock the treetop.</p>',
  code: 'CHECK',
  stages: [
    { title: 'Level 1: Why a Constitution?', content: '<p>After the Revolution, the first plan of government was the <b>Articles of Confederation</b>. It made the national government very weak: it could not collect taxes, had no president, and had no national courts.</p><p>In <b>1787</b>, delegates met in Philadelphia at the <b>Constitutional Convention</b> and wrote a new plan: the <b>U.S. Constitution</b>. It begins with the <b>Preamble</b>: "We the People of the United States, in Order to form a more perfect Union..."</p>',
      puzzles: [
        { type: 'mc', q: 'Why did leaders replace the Articles of Confederation?', choices: ['The national government was too weak', 'The government was too powerful', 'The king demanded it', 'It had too many presidents'], answer: 0 },
        { type: 'mc', q: 'What do the words "We the People" tell us?', choices: ['The government\'s power comes from the people', 'Only rich people can vote', 'The king rules the people', 'The states are in charge'], answer: 0 }
      ] },
    { title: 'Level 2: The Legislative Branch', content: '<p><b>Article I</b> of the Constitution creates <b>Congress</b>, which <b>makes laws</b>. Congress has two parts (it is <b>bicameral</b>):</p><ul><li><b>Senate</b>: 2 senators from every state (100 total).</li><li><b>House of Representatives</b>: based on each state\'s population (435 total). Indiana has 9 representatives.</li></ul><p>Congress also collects taxes, prints money, and declares war.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main job of the legislative branch?', choices: ['Make laws', 'Enforce laws', 'Interpret laws', 'Command the army'], answer: 0 },
        { type: 'input', q: 'How many senators does Indiana have?', answer: ['2', 'two'], hint: 'Every state gets the same number of senators.' },
        { type: 'mc', q: 'Why does California have more representatives than Indiana?', choices: ['It has a larger population', 'It is older', 'It has more senators', 'It is closer to Washington, D.C.'], answer: 0 }
      ] },
    { title: 'Level 3: The Executive Branch', content: '<p><b>Article II</b> creates the <b>executive branch</b>, led by the <b>President</b>, who <b>carries out and enforces laws</b>. The President is also Commander in Chief of the military, meets with world leaders, and can sign or <b>veto</b> (reject) bills from Congress.</p><p>The Vice President and the Cabinet (advisors who lead departments like Education and Defense) are also part of this branch. A President serves a 4-year term and can be elected twice.</p>',
      puzzles: [
        { type: 'mc', q: 'What is a veto?', choices: ['When the President rejects a bill passed by Congress', 'When Congress declares war', 'When the Supreme Court decides a case', 'When citizens vote'], answer: 0 },
        { type: 'input', q: 'How many years is one presidential term?', answer: ['4', 'four'], unit: 'years' }
      ] },
    { title: 'Level 4: The Judicial Branch', content: '<p><b>Article III</b> creates the <b>judicial branch</b>: the <b>Supreme Court</b> and other federal courts. The courts <b>interpret laws</b>, deciding what laws mean and whether they follow the Constitution.</p><p>The Supreme Court has <b>9 justices</b>. They are nominated by the President, approved by the Senate, and serve for life. If the Court decides a law goes against the Constitution, it rules the law <b>unconstitutional</b>, and the law no longer applies.</p>',
      puzzles: [
        { type: 'mc', q: 'What is the main job of the judicial branch?', choices: ['Interpret laws', 'Make laws', 'Enforce laws', 'Collect taxes'], answer: 0 },
        { type: 'input', q: 'How many justices serve on the Supreme Court?', answer: ['9', 'nine'] },
        { type: 'sort', q: 'Sort each job to the correct branch.', buckets: ['Legislative', 'Executive', 'Judicial'], items: [['Writes and passes bills', 0], ['Declares war', 0], ['Signs bills into law', 1], ['Commands the military', 1], ['Decides if a law is constitutional', 2], ['Hears cases about the Constitution', 2]] }
      ] },
    { title: 'Level 5: Checks and Balances', content: '<p>The treetop! The Founders worried that one person or group could become too powerful, like a king. So each branch can <b>check</b> (limit) the others:</p><ul><li>The President can <b>veto</b> a bill from Congress.</li><li>Congress can <b>override</b> a veto with a <b>2/3 vote</b> of both houses.</li><li>The Senate must <b>approve</b> the President\'s choices for judges and Cabinet members.</li><li>The Supreme Court can rule a law or presidential action <b>unconstitutional</b>.</li><li>Congress can <b>impeach</b> and remove a President or judge.</li></ul>',
      puzzles: [
        { type: 'match', q: 'Match each check to the branch that uses it.', pairs: [['Veto a bill', 'Executive'], ['Override a veto', 'Legislative'], ['Declare a law unconstitutional', 'Judicial']] },
        { type: 'mc', q: 'The President vetoes a bill. What can Congress do?', choices: ['Override the veto with a 2/3 vote', 'Nothing at all', 'Ask the Supreme Court to sign it', 'Fire the President immediately'], answer: 0 },
        { type: 'mc', q: 'Why did the Founders create checks and balances?', choices: ['So no branch becomes too powerful', 'To make laws faster', 'To give the President all power', 'To avoid elections'], answer: 0 }
      ] }
  ],
  finale: '<p>You reach the top of the Freedom Tree and see all three branches spreading out below you, each one balancing the others. Quest complete! You now understand the system that has guided the United States since 1787.</p>',
  exit: [
    { q: 'Which branch interprets laws?', choices: ['Legislative', 'Executive', 'Judicial', 'Military'], answer: 2 },
    { q: 'Which is an example of checks and balances?', choices: ['The President vetoes a bill', 'A senator gives a speech', 'Citizens pay taxes', 'A state holds a fair'], answer: 0 },
    { q: 'Why did the writers of the Constitution divide power into three branches?', answer: 'To prevent any one person or group from having too much power, like a king. Each branch checks the others.', lines: 3 }
  ]
},
{
  id: 'g5-ss-bill-of-rights', std: 'g5-ss-civics', format: 'escape',
  title: 'Bill of Rights Breakout',
  tagline: 'Rights are being ignored in the town of Liberty Falls. Use the Bill of Rights to set things right.',
  story: '<p>The new mayor of Liberty Falls has passed some very strange rules. The citizens have locked the rulebook in the town hall vault and asked you, a young constitutional expert, to break it open.</p><p>Each lock asks whether a rule breaks the <b>Bill of Rights</b>, the first ten amendments to the Constitution, added in <b>1791</b>.</p>',
  code: 'SPEAK',
  stages: [
    { title: 'Lock 1: What Is the Bill of Rights?', content: '<p>When the Constitution was written in 1787, many people worried it did not protect individual freedoms. <b>James Madison</b> wrote a list of <b>amendments</b> (changes or additions). The first ten were ratified in <b>1791</b> and became the <b>Bill of Rights</b>.</p><p>The Bill of Rights limits what the <b>government</b> can do to people.</p>',
      puzzles: [
        { type: 'mc', q: 'What is an amendment?', choices: ['A change or addition to the Constitution', 'A type of tax', 'A court case', 'A branch of government'], answer: 0 },
        { type: 'input', q: 'How many amendments make up the Bill of Rights?', answer: ['10', 'ten'] },
        { type: 'mc', q: 'Who wrote the amendments that became the Bill of Rights?', choices: ['James Madison', 'King George III', 'Paul Revere', 'Abigail Adams'], answer: 0 }
      ] },
    { title: 'Lock 2: The First Amendment', content: '<p>The <b>First Amendment</b> protects five freedoms:</p><ol><li><b>Religion</b>: practice any religion or none.</li><li><b>Speech</b>: say what you think.</li><li><b>Press</b>: newspapers and media can publish without government censorship.</li><li><b>Assembly</b>: gather peacefully in groups.</li><li><b>Petition</b>: ask the government to fix problems.</li></ol><p>Mayor\'s Rule #1: <i>"The town newspaper may not print anything that criticizes the mayor."</i></p>',
      puzzles: [
        { type: 'mc', q: 'Which freedom does Rule #1 break?', choices: ['Freedom of the press', 'Freedom of religion', 'Right to a jury trial', 'Right to bear arms'], answer: 0 },
        { type: 'match', q: 'Match each situation to the First Amendment freedom it shows.', pairs: [['Citizens sign a letter asking the city to fix a park', 'Petition'], ['A group holds a peaceful march', 'Assembly'], ['A family attends a mosque', 'Religion'], ['A student writes an opinion blog', 'Speech']] }
      ] },
    { title: 'Lock 3: Rights of the Accused', content: '<p>Several amendments protect people accused of crimes:</p><ul><li><b>4th</b>: no unreasonable searches of your home without a warrant.</li><li><b>5th</b>: you cannot be forced to testify against yourself.</li><li><b>6th</b>: the right to a speedy, public trial, a jury, and a lawyer.</li><li><b>8th</b>: no cruel and unusual punishment or excessive bail.</li></ul><p>Mayor\'s Rule #2: <i>"Police may search any house at any time, for any reason."</i><br>Mayor\'s Rule #3: <i>"People accused of crimes will be judged in secret by the mayor alone."</i></p>',
      puzzles: [
        { type: 'mc', q: 'Rule #2 breaks which amendment?', choices: ['4th Amendment', '1st Amendment', '2nd Amendment', '10th Amendment'], answer: 0 },
        { type: 'mc', q: 'Rule #3 breaks which amendment?', choices: ['6th Amendment', '3rd Amendment', '4th Amendment', '1st Amendment'], answer: 0 },
        { type: 'mc', q: 'Which right does the 5th Amendment protect?', choices: ['You cannot be forced to testify against yourself', 'Freedom of the press', 'The right to vote', 'No soldiers in your home'], answer: 0 }
      ] },
    { title: 'Lock 4: The Other Amendments', content: '<ul><li><b>2nd</b>: the right to keep and bear arms.</li><li><b>3rd</b>: the government cannot force you to house soldiers in peacetime. (Colonists remembered the British Quartering Act!)</li><li><b>7th</b>: the right to a jury in many civil (non-criminal) cases.</li><li><b>9th</b>: people have other rights not listed here.</li><li><b>10th</b>: powers not given to the national government belong to the states or the people.</li></ul><p>Mayor\'s Rule #4: <i>"Every family must let town soldiers live in their home."</i></p>',
      puzzles: [
        { type: 'mc', q: 'Rule #4 breaks which amendment?', choices: ['3rd Amendment', '5th Amendment', '8th Amendment', '1st Amendment'], answer: 0 },
        { type: 'mc', q: 'Why did the Founders include the 3rd Amendment?', choices: ['British soldiers had been housed in colonists\' homes', 'Soldiers wanted better homes', 'The states asked for more soldiers', 'It was a French idea'], answer: 0 }
      ] },
    { title: 'Lock 5: The Vault', content: '<p>The vault door has a panel of mayor\'s rules. Decide which rules are allowed and which break the Bill of Rights. Remember: rights have some limits. For example, freedom of speech does not protect making real threats against someone.</p>',
      puzzles: [
        { type: 'sort', q: 'Does each rule follow or break the Bill of Rights?', buckets: ['Breaks the Bill of Rights', 'Allowed'], items: [['Only one religion is allowed in town', 0], ['Protesters may not gather peacefully in the park', 0], ['A person gets a fair trial with a jury', 1], ['Police need a warrant to search a home', 1], ['Anyone who is late paying a fine goes to jail for 10 years', 0], ['Newspapers may criticize the mayor', 1]], hint: 'The 8th Amendment bans cruel and unusual punishment.' }
      ] }
  ],
  finale: '<p>The vault swings open. The citizens of Liberty Falls cheer as you read the Bill of Rights aloud on the town hall steps. The mayor\'s unfair rules are thrown out. Rights restored!</p>',
  exit: [
    { q: 'Which freedom is NOT part of the First Amendment?', choices: ['Speech', 'Religion', 'A jury trial', 'Press'], answer: 2 },
    { q: 'A police officer wants to search a home without a warrant or good reason. Which amendment protects the homeowner?', choices: ['1st', '4th', '10th', '2nd'], answer: 1 },
    { q: 'Choose one right from the Bill of Rights. Explain why it is important for people living in a free country.', answer: 'Example: Freedom of speech lets people share ideas and criticize the government without being punished, which keeps leaders accountable.', lines: 4 }
  ]
},
{
  id: 'g5-ss-dc-fieldtrip', std: 'g5-ss-civics', format: 'fieldtrip',
  title: 'Field Trip to Washington, D.C.',
  tagline: 'Tour the National Archives, Capitol, White House, and Supreme Court in one virtual day.',
  story: '<p>Your class has won a virtual trip to Washington, D.C., the capital of the United States! Your guide, Ms. Park, will take you to five famous places where the Constitution comes to life. Grab your map and let\'s go.</p>',
  code: 'VOTER',
  stages: [
    { title: 'Stop 1: The National Archives', content: '<p>Inside the dim Rotunda for the Charters of Freedom, three documents rest in glass cases filled with argon gas to protect them: the <b>Declaration of Independence</b> (1776), the <b>Constitution</b> (1787), and the <b>Bill of Rights</b> (1791).</p><p>Ms. Park explains: "The Declaration explained <b>why</b> we broke away from Britain. The Constitution explains <b>how</b> our government works. The Bill of Rights protects <b>individual freedoms</b>."</p>',
      puzzles: [
        { type: 'match', q: 'Match each document to its purpose.', pairs: [['Declaration of Independence', 'Explained why the colonies broke from Britain'], ['Constitution', 'Set up how the government works'], ['Bill of Rights', 'Protects individual freedoms']] },
        { type: 'order', q: 'Put the documents in the order they were written.', items: ['Declaration of Independence (1776)', 'Constitution (1787)', 'Bill of Rights (1791)'] }
      ] },
    { title: 'Stop 2: The U.S. Capitol', content: '<p>The white dome of the <b>Capitol</b> is where <b>Congress</b> meets. The Senate meets in the north wing, and the House of Representatives in the south wing.</p><p>Ms. Park shows how a <b>bill becomes a law</b>: a member of Congress introduces a bill, it is studied in a committee, both the House and Senate vote to pass it, and then it goes to the President to sign or veto.</p>',
      puzzles: [
        { type: 'order', q: 'Put the steps of how a bill becomes a law in order.', items: ['A member of Congress introduces a bill', 'A committee studies the bill', 'The House and Senate both vote to pass it', 'The President signs it into law'] },
        { type: 'mc', q: 'Which branch of government meets in the Capitol?', choices: ['Legislative', 'Executive', 'Judicial', 'None'], answer: 0 }
      ] },
    { title: 'Stop 3: The White House', content: '<p>At 1600 Pennsylvania Avenue stands the <b>White House</b>, home and office of the <b>President</b>, head of the <b>executive branch</b>. Every President since John Adams (1800) has lived here.</p><p>The President enforces laws, leads the military, and chooses a <b>Cabinet</b> of advisors. To be President, a person must be at least <b>35 years old</b>, a natural-born citizen, and have lived in the U.S. for 14 years.</p>',
      puzzles: [
        { type: 'input', q: 'What is the minimum age to be President?', answer: ['35', 'thirty-five'], unit: 'years old' },
        { type: 'mc', q: 'Which is a job of the President?', choices: ['Commander in Chief of the military', 'Declaring laws unconstitutional', 'Writing bills', 'Choosing senators'], answer: 0 }
      ] },
    { title: 'Stop 4: The Supreme Court', content: '<p>Across from the Capitol is the <b>Supreme Court</b>, with the words <b>"Equal Justice Under Law"</b> carved above its columns. Nine justices hear cases about the Constitution.</p><p>Ms. Park describes a famous case: in <b>Tinker v. Des Moines (1969)</b>, students were suspended for wearing black armbands to protest a war. The Court ruled that students do not "shed their constitutional rights... at the schoolhouse gate." Their armbands were protected speech.</p>',
      puzzles: [
        { type: 'mc', q: 'What did the Supreme Court decide in Tinker v. Des Moines?', choices: ['Students keep their freedom of speech at school', 'Schools can ban all student speech', 'Armbands are illegal', 'Students cannot protest'], answer: 0 },
        { type: 'mc', q: 'What does "Equal Justice Under Law" mean?', choices: ['Everyone should be treated the same by the law', 'Judges get special rights', 'Only citizens have rights', 'Laws are optional'], answer: 0 },
        { type: 'mc', q: 'Which amendment protected the students in the Tinker case?', choices: ['1st Amendment', '3rd Amendment', '8th Amendment', '10th Amendment'], answer: 0 }
      ] },
    { title: 'Stop 5: Your Role as a Citizen', content: '<p>The trip ends at the National Mall. Ms. Park asks: "Where do YOU fit in this government?" Citizens have <b>rights</b> (like free speech and voting) and <b>responsibilities</b> (like obeying laws, paying taxes, serving on juries, and staying informed).</p><p>Citizens aged 18 and older can <b>vote</b> to choose leaders. The 19th Amendment (1920) gave women the right to vote, and the 26th Amendment (1971) lowered the voting age to 18.</p>',
      puzzles: [
        { type: 'sort', q: 'Sort each item.', buckets: ['Right', 'Responsibility'], items: [['Freedom of speech', 0], ['Practicing your religion', 0], ['Serving on a jury', 1], ['Obeying laws', 1], ['Paying taxes', 1], ['A fair trial', 0]] },
        { type: 'input', q: 'At what age can U.S. citizens vote?', answer: ['18', 'eighteen'] }
      ] }
  ],
  finale: '<p>As the sun sets over the Washington Monument, Ms. Park hands out "Future Voter" buttons. "The Constitution starts with We the People," she says. "That means you."</p>',
  exit: [
    { q: 'Which document explains HOW the U.S. government works?', choices: ['Declaration of Independence', 'Constitution', 'Treaty of Paris', 'Magna Carta'], answer: 1 },
    { q: 'Where does Congress meet?', choices: ['The White House', 'The Supreme Court', 'The U.S. Capitol', 'The National Archives'], answer: 2 },
    { q: 'Name one right and one responsibility of a U.S. citizen, and explain why each matters.', answer: 'Example: Right: freedom of speech, so people can share ideas. Responsibility: voting or serving on a jury, so government and courts work fairly.', lines: 4 }
  ]
}
);
