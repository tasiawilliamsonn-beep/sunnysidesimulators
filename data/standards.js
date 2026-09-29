/* Power standards, mini-lessons, and teacher resources. Rooms reference these by id. */
window.CX_STANDARDS = [
/* ======================= GRADE 5 SCIENCE ======================= */
{
  id: 'g5-sci-matter', grade: 5, subject: 'science', code: '5-PS1-1–5-PS1-4',
  title: 'Properties of Matter & Conservation of Mass',
  text: 'Develop a model showing that matter is made of particles too small to be seen; measure and graph to show that the total weight of matter is conserved when substances are heated, cooled, or mixed; identify materials by their properties; and investigate whether mixing substances forms new substances.',
  lesson: {
    target: 'I can measure and describe properties of matter and explain why mass stays the same when matter changes.',
    vocab: [['Matter', 'Anything that has mass and takes up space.'], ['Mass', 'The amount of matter in an object, measured in grams (g).'], ['Volume', 'The amount of space something takes up, measured in mL or cm³.'], ['Physical change', 'A change in size, shape, or state that makes no new substance.'], ['Chemical change', 'A change that makes a new substance (clues: gas, color change, heat, light).'], ['Conservation of mass', 'In a closed system, mass before a change equals mass after.']],
    hook: 'Ask: "If I melt a 50-gram ice cube in a sealed bag, what will the water weigh?" Take a quick thumbs up (more), sideways (same), down (less) vote. Leave it unanswered until the end.',
    teach: ['Matter has properties we can observe and measure: color, hardness, magnetism, conductivity, solubility, mass, and volume.', 'Mass is measured with a balance or scale in grams. Volume of a liquid is measured with a graduated cylinder in mL; a solid box shape is length × width × height in cm³.', 'Physical changes (melting, freezing, dissolving, cutting) do not make new substances. Chemical changes (rusting, burning, baking soda + vinegar) do.', 'In every change, particles are rearranged, not created or destroyed. If nothing escapes, the total mass stays the same. If gas escapes into the air, the scale reading drops, but the matter still exists.'],
    model: 'Think aloud: "30 g of water + 5 g of salt. After stirring, the salt seems to disappear. The salt particles are still there, spread through the water, so the total must be 35 g." Write 30 + 5 = 35 on the board.',
    check: 'Students hold up fingers: How many grams? 200 g of juice is frozen in a sealed container. (200.) Then: Is dissolving sugar a physical or chemical change? (Physical.)',
    misconceptions: ['"Dissolved things disappear and have no mass." The particles are still there and still have mass.', '"Gas has no mass." Gas is matter. When it escapes an open container, the scale drops because matter left.', '"Ice weighs more than water because it is solid." Freezing changes volume a little, but mass stays the same.'],
    debrief: ['Go back to the hook question. What will the melted ice cube weigh, and how do you know?', 'Which puzzle made you rethink an idea you had about matter?', 'Why do scientists seal a container when they test conservation of mass?']
  },
  resources: [
    { type: 'Simulation', name: 'PhET: Density and States of Matter', url: 'https://phet.colorado.edu/', note: 'Free browser simulations for mass, volume, and states of matter.' },
    { type: 'Lessons', name: 'Mystery Science: Chemical Magic', url: 'https://mysteryscience.com/', note: 'Short video-led lessons on mixtures and reactions (free tier available).' },
    { type: 'Video', name: 'Crash Course Kids', url: 'https://www.youtube.com/@crashcoursekids', note: 'Five-minute videos on matter and conservation of mass.' },
    { type: 'Media library', name: 'PBS LearningMedia', url: 'https://www.pbslearningmedia.org/', note: 'Search "conservation of mass grade 5" for clips and interactives.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-sci-space', grade: 5, subject: 'science', code: '5-ESS1-1 · 5-ESS1-2',
  title: 'Earth, Sun, Moon & the Solar System',
  text: 'Support an argument that the apparent brightness of the sun and stars is due to their distance from Earth; represent data to reveal patterns in shadows, day and night, and the seasonal appearance of stars.',
  lesson: {
    target: 'I can use a model to explain patterns caused by Earth\'s rotation and orbit and describe the scale of the solar system.',
    vocab: [['Rotation', 'Spinning on an axis. Earth rotates once about every 24 hours.'], ['Revolution / orbit', 'Traveling around another object. Earth orbits the Sun in about 365 days.'], ['Axis', 'An imaginary line through Earth from pole to pole; it is tilted about 23.5°.'], ['Moon phase', 'The shape of the lit part of the Moon we see from Earth.'], ['Star', 'A ball of hot gas that makes its own light. The Sun is our closest star.']],
    hook: 'Ask students to point to where the Sun was when they walked in this morning, and where it will be at dismissal. "Did the Sun move, or did we?"',
    teach: ['Earth rotates from west to east, so the Sun appears to rise in the east and set in the west. Half of Earth faces the Sun (day) while half faces away (night).', 'Shadows are longest in the morning and evening when the Sun is low, and shortest near midday when it is highest.', 'Earth\'s tilted axis causes seasons. When our hemisphere tilts toward the Sun, we get more direct light and longer days: summer.', 'The Moon makes no light; it reflects sunlight. As it orbits Earth (about 29.5 days), we see different amounts of its lit half: phases.', 'The Sun looks bigger and brighter than other stars only because it is much closer.'],
    model: 'Use a student as the Sun and your fist as Earth. Spin your fist slowly: "My thumbnail is Indiana. Now it faces the Sun: noon. Now it faces away: midnight." Then walk your fist around the "Sun" while keeping the tilt pointed at the same wall to show seasons.',
    check: 'Quick draw on scrap paper or a whiteboard: Draw where the Sun is when your shadow is longest in the afternoon. (Low in the west; shadow points east.)',
    misconceptions: ['"Seasons happen because Earth is closer to the Sun in summer." It is the tilt, not the distance.', '"Earth\'s shadow causes Moon phases." Phases come from our viewing angle of the lit half. Earth\'s shadow causes lunar eclipses.', '"The Sun moves across the sky." The Sun only appears to move because Earth rotates.'],
    debrief: ['Explain to a partner why we have day and night using the words rotate and axis.', 'Why does the Sun look so much brighter than other stars?', 'What would happen to seasons if Earth had no tilt?']
  },
  resources: [
    { type: 'Interactive', name: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/', note: 'Kid-friendly articles and games on seasons, moon phases, and planets.' },
    { type: 'Interactive', name: 'NASA Science: Solar System', url: 'https://science.nasa.gov/solar-system/', note: 'Planet facts, images, and scale information.' },
    { type: 'Simulation', name: 'PhET: My Solar System', url: 'https://phet.colorado.edu/', note: 'Model orbits and gravity in the browser.' },
    { type: 'Scale model', name: 'If the Moon Were Only One Pixel', url: 'https://www.joshworth.com/dev/pixelspace/pixelspace_solarsystem.html', note: 'A scrolling scale model of the solar system. Great hook.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-sci-eco', grade: 5, subject: 'science', code: '5-PS3-1 · 5-LS1-1 · 5-LS2-1',
  title: 'Ecosystems & Food Webs',
  text: 'Use models to describe that the energy in animals\' food was once energy from the sun, support an argument that plants get the materials they need for growth chiefly from air and water, and model the movement of matter among plants, animals, decomposers, and the environment.',
  lesson: {
    target: 'I can model how energy and matter move through an ecosystem and predict what happens when part of it changes.',
    vocab: [['Producer', 'An organism that makes its own food from sunlight (plants, algae).'], ['Consumer', 'An organism that eats other organisms (herbivore, carnivore, omnivore).'], ['Decomposer', 'An organism that breaks down dead matter and returns nutrients to soil (fungi, bacteria, worms).'], ['Food web', 'Many connected food chains in one ecosystem.'], ['Ecosystem', 'All the living and nonliving things interacting in an area.']],
    hook: 'Show (or describe) a Brown County State Park forest. "Name one living thing there. What does it eat? What eats it?" Build a chain on the board from student answers.',
    teach: ['Almost all energy in an ecosystem starts with the Sun. Producers capture it through photosynthesis.', 'In a food chain, arrows point in the direction energy flows: from the eaten to the eater (grass → rabbit → fox).', 'Consumers can be herbivores (plants only), carnivores (animals only), or omnivores (both). Predators hunt prey.', 'Decomposers recycle matter from dead organisms back into the soil so producers can use it again.', 'If one population changes, others connected to it in the web change too.'],
    model: 'Draw: acorn → squirrel → red-tailed hawk. Ask: "If a disease wiped out the squirrels, what happens to hawks? To acorns?" Think aloud: hawks lose food and may decline; more acorns survive and more oak seedlings grow.',
    check: 'Point to a word on the board, students call out its role: oak tree (producer), mushroom (decomposer), coyote (consumer/carnivore), raccoon (omnivore).',
    misconceptions: ['"Arrows point to what an animal eats." Arrows show energy flow, pointing toward the eater.', '"Decomposers are not important." Without them, nutrients would stay locked in dead matter.', '"Plants get their food from the soil." Plants make food from sunlight, air (carbon dioxide), and water; soil gives nutrients.'],
    debrief: ['Why does every food chain start with a producer?', 'Pick one organism from the activity. What would happen to the web if it disappeared?', 'Where does the energy in your lunch originally come from?']
  },
  resources: [
    { type: 'Indiana', name: 'Indiana DNR: Fish & Wildlife', url: 'https://www.in.gov/dnr/fish-and-wildlife/', note: 'Profiles of Indiana native species for local food web examples.' },
    { type: 'Media library', name: 'National Geographic Education', url: 'https://education.nationalgeographic.org/', note: 'Encyclopedia entries and activities on food webs and ecosystems.' },
    { type: 'Simulation', name: 'PBS LearningMedia', url: 'https://www.pbslearningmedia.org/', note: 'Search "food web interactive" for free ecosystem games.' },
    { type: 'Lessons', name: 'Mystery Science: Web of Life', url: 'https://mysteryscience.com/', note: 'Video-led lessons on ecosystems and decomposers.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 6 SCIENCE ======================= */
{
  id: 'g6-sci-particles', grade: 6, subject: 'science', code: 'Enrichment · not in IN 2023 Gr 6',
  title: 'Particle Model of Matter & States of Matter',
  text: 'Develop a model that predicts and describes changes in particle motion, temperature, and state of a pure substance when thermal energy is added or removed. (Enrichment: this topic is not in the 2023 Indiana Grade 6 science standards.)',
  lesson: {
    target: 'I can use the particle model to explain the states of matter and changes of state.',
    vocab: [['Particle', 'A tiny piece of matter (atom or molecule) too small to see.'], ['Thermal energy', 'The total energy of moving particles in a substance.'], ['Temperature', 'A measure of the average motion (kinetic energy) of particles.'], ['Melting / freezing', 'Solid to liquid / liquid to solid.'], ['Evaporation / condensation', 'Liquid to gas / gas to liquid.'], ['Sublimation', 'Solid directly to gas (dry ice).']],
    hook: 'Ask three volunteers to act as particles: a solid (shoulder to shoulder, vibrating), a liquid (close but sliding past each other), a gas (spread out, moving fast). Ask the class to name each state.',
    teach: ['All matter is made of particles that are always moving.', 'Solids: particles packed tightly in fixed positions, vibrating. Definite shape and volume.', 'Liquids: particles close together but able to slide past one another. Definite volume, takes the shape of its container.', 'Gases: particles far apart, moving quickly in all directions. Fills its container.', 'Adding thermal energy speeds particles up (temperature rises) until they break free into a new state. Removing energy slows them down.'],
    model: 'Draw three boxes on the board and sketch particles in each. Think aloud as you draw arrows: "When I heat this ice, the particles vibrate faster... faster... at 0 °C they break out of fixed positions and slide: now it is liquid water."',
    check: 'Hands on head if energy is added, hands on desk if energy is removed: melting (head), condensation (desk), boiling (head), freezing (desk).',
    misconceptions: ['"Particles in a solid do not move." They vibrate in place.', '"The bubbles in boiling water are air." They are water vapor (gas).', '"Particles expand when heated." Particles themselves do not grow; the spaces between them get larger.'],
    debrief: ['Use the word particles to explain why a balloon shrinks in the freezer.', 'Why does the temperature stay the same while ice is melting?', 'Which state of matter was hardest to model? Why?']
  },
  resources: [
    { type: 'Simulation', name: 'PhET: States of Matter', url: 'https://phet.colorado.edu/', note: 'Watch particles change as you heat and cool them. The single best tool for this standard.' },
    { type: 'Media library', name: 'PBS LearningMedia', url: 'https://www.pbslearningmedia.org/', note: 'Search "particle model states of matter" for videos and interactives.' },
    { type: 'Curriculum', name: 'OpenSciEd', url: 'https://www.openscied.org/', note: 'Free middle school units built on particle models.' },
    { type: 'Practice', name: 'Khan Academy: Physics', url: 'https://www.khanacademy.org/science', note: 'Videos on states of matter and thermal energy.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-sci-energy', grade: 6, subject: 'science', code: 'Enrichment · not in IN 2023 Gr 6',
  title: 'Kinetic & Potential Energy and Heat Transfer',
  text: 'Describe kinetic and potential energy, and investigate how thermal energy is transferred and how the amount of energy transferred depends on the type and mass of matter. (Enrichment: this topic is not in the 2023 Indiana Grade 6 science standards.)',
  lesson: {
    target: 'I can explain how energy changes between kinetic and potential forms and identify conduction, convection, and radiation.',
    vocab: [['Kinetic energy', 'Energy of motion. More mass or more speed means more kinetic energy.'], ['Potential energy', 'Stored energy. Gravitational potential energy increases with height and mass.'], ['Conduction', 'Heat transfer through direct contact.'], ['Convection', 'Heat transfer by the movement of fluids (liquids and gases) in currents.'], ['Radiation', 'Heat transfer by waves, even through empty space.'], ['Law of conservation of energy', 'Energy is not created or destroyed; it changes form.']],
    hook: 'Hold a pencil high and ask, "Does this pencil have energy right now? It is not moving." Drop it. "Where did the motion come from?"',
    teach: ['Potential energy is stored. A roller coaster at the top of a hill, a stretched rubber band, and food all have potential energy.', 'Kinetic energy is motion. A heavier or faster object has more kinetic energy.', 'As an object falls, potential energy changes into kinetic energy. Total energy stays the same (ignoring friction).', 'Heat always moves from warmer to cooler. Conduction: touching (hand on a hot pan). Convection: currents in air or water (warm air rising). Radiation: waves (sunlight warming your face).'],
    model: 'Sketch a roller coaster. Label the top of the first hill "most PE," the bottom "most KE." Think aloud: "Halfway down, it has some of each. Energy is changing form, not disappearing."',
    check: 'Students show 1, 2, or 3 fingers for conduction, convection, or radiation: a campfire warming your face (3), a spoon getting hot in soup (1), a heater warming a whole room (2).',
    misconceptions: ['"Cold moves into things." Heat moves; objects feel cold because heat leaves your hand.', '"Only moving things have energy." Stored (potential) energy counts too.', '"Radiation needs air to travel." Radiation crosses empty space, which is how sunlight reaches Earth.'],
    debrief: ['Trace the energy changes in a swing as it moves back and forth.', 'Which type of heat transfer keeps a room warm, and how?', 'Where did the energy "go" when the roller coaster stopped? (Friction → thermal energy.)']
  },
  resources: [
    { type: 'Simulation', name: 'PhET: Energy Skate Park', url: 'https://phet.colorado.edu/', note: 'Students see potential and kinetic energy bar graphs change as a skater moves.' },
    { type: 'Media library', name: 'PBS LearningMedia', url: 'https://www.pbslearningmedia.org/', note: 'Search "conduction convection radiation" for demos.' },
    { type: 'Curriculum', name: 'OpenSciEd', url: 'https://www.openscied.org/', note: 'Free units on thermal energy transfer.' },
    { type: 'Practice', name: 'Khan Academy: Physics', url: 'https://www.khanacademy.org/science', note: 'Short lessons on kinetic and potential energy.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-sci-space', grade: 6, subject: 'science', code: 'MS-ESS1-1–MS-ESS1-3',
  title: 'Gravity & the Earth–Sun–Moon System',
  text: 'Develop and use a model of the Earth-sun-moon system to describe the cyclic patterns of lunar phases, eclipses, and seasons; describe the role of gravity in the motions within galaxies and the solar system; and analyze data to determine scale properties of objects in the solar system.',
  lesson: {
    target: 'I can use a model of the Earth–Sun–Moon system to explain phases, eclipses, tides, and seasons, and explain how gravity keeps objects in orbit.',
    vocab: [['Gravity', 'A force of attraction between all objects with mass. More mass and less distance means stronger gravity.'], ['Orbit', 'The curved path of one object around another, caused by gravity and forward motion.'], ['Solar eclipse', 'The Moon passes between the Sun and Earth, blocking sunlight.'], ['Lunar eclipse', 'Earth passes between the Sun and the Moon; Earth\'s shadow falls on the Moon.'], ['Tide', 'The daily rise and fall of sea level, caused mostly by the Moon\'s gravity.'], ['Waxing / waning', 'The lit part of the Moon growing / shrinking.']],
    hook: 'Remind students that on April 8, 2024, a total solar eclipse passed over Indiana. "What had to line up in space for that to happen?"',
    teach: ['Gravity pulls objects toward one another. The Sun\'s gravity keeps planets in orbit; Earth\'s gravity keeps the Moon in orbit.', 'Objects orbit because they are moving forward while gravity pulls them inward, so they keep "falling around" the larger object.', 'Phases: the Moon is always half lit by the Sun. We see more or less of that lit half as it orbits us. New → waxing crescent → first quarter → waxing gibbous → full → waning gibbous → third quarter → waning crescent.', 'Solar eclipse: Sun–Moon–Earth in a line (only at new moon). Lunar eclipse: Sun–Earth–Moon in a line (only at full moon).', 'Tides: the Moon\'s gravity pulls on Earth\'s oceans, making two bulges. Most coasts get two high and two low tides each day.'],
    model: 'Make a Sun–Earth–Moon line with three volunteers. Move the "Moon" between Sun and Earth: "This is a new moon. If the line is perfect, the Moon\'s shadow hits Earth: solar eclipse." Then move the Moon behind Earth for a lunar eclipse.',
    check: 'Quick write: Which phase must the Moon be in for a lunar eclipse? (Full.) Why don\'t we get an eclipse every month? (The Moon\'s orbit is tilted about 5°.)',
    misconceptions: ['"There is no gravity in space." Gravity reaches across space; astronauts float because they are falling around Earth.', '"Moon phases are caused by Earth\'s shadow." Only lunar eclipses involve Earth\'s shadow.', '"Summer happens when Earth is closest to the Sun." Earth is closest in January. Tilt causes seasons.'],
    debrief: ['Explain why the April 2024 eclipse could only happen during a new moon.', 'What would happen to the Moon if Earth\'s gravity suddenly disappeared?', 'Which model from today would you use to teach a 4th grader about phases?']
  },
  resources: [
    { type: 'Interactive', name: 'NASA Science: Eclipses', url: 'https://science.nasa.gov/eclipses/', note: 'Eclipse diagrams, videos, and the 2024 Indiana eclipse path.' },
    { type: 'Interactive', name: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/', note: 'Explainers on tides, gravity, and phases.' },
    { type: 'Simulation', name: 'PhET: Gravity and Orbits', url: 'https://phet.colorado.edu/', note: 'Turn gravity off and watch the Moon fly away.' },
    { type: 'Data', name: 'NOAA Tides & Currents', url: 'https://tidesandcurrents.noaa.gov/', note: 'Real tide charts for any U.S. coast.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 5 SOCIAL STUDIES ======================= */
{
  id: 'g5-ss-colonial', grade: 5, subject: 'social', code: '5.H.1–5.H.6 · 5.G.5–5.G.10 · 5.E.1',
  title: 'Native Americans, Exploration & the Thirteen Colonies',
  text: 'Describe early Native American cultures and European exploration, compare the reasons for colonization, and explain the political, social, and economic organization of the New England, Middle, and Southern colonies.',
  lesson: {
    target: 'I can compare Native American cultures and the three colonial regions and explain how geography shaped how people lived.',
    vocab: [['Colony', 'A settlement ruled by a faraway country.'], ['Cash crop', 'A crop grown to sell, like tobacco or rice.'], ['Indentured servant', 'A person who worked for several years to pay for passage to America.'], ['Culture region', 'An area where groups share similar ways of life shaped by environment.'], ['Columbian Exchange', 'The movement of plants, animals, people, and diseases between the Americas and Europe/Africa after 1492.']],
    hook: 'Ask: "If you had to start a town with no stores, what would you need first? How would the land around you decide your job?"',
    teach: ['Native American groups adapted to their environments: Eastern Woodlands peoples (like the Miami and Haudenosaunee) farmed the Three Sisters and hunted in forests; Plains peoples followed the bison.', 'Europeans explored for gold, glory, and God: new trade routes, riches, and spreading religion. The Columbian Exchange changed life on both sides of the ocean.', 'New England colonies: rocky soil and cold winters, so people fished, built ships, and traded. Town meetings. Founded largely for religious freedom (Pilgrims, Puritans).', 'Middle colonies: fertile soil, "breadbasket" grain farms, diverse people and religions (Pennsylvania, New York).', 'Southern colonies: warm climate and long growing season, large plantations growing tobacco, rice, and indigo, relying on the forced labor of enslaved Africans.'],
    model: 'Draw a three-column chart (New England, Middle, Southern) with rows for climate, economy, and daily life. Fill in New England while thinking aloud, then have students help with the Middle column.',
    check: 'Call out a clue; students point to a column on the chart: "wheat and grain" (Middle), "whaling" (New England), "tobacco plantation" (Southern).',
    misconceptions: ['"All Native Americans lived the same way." Hundreds of nations had different languages, homes, and economies.', '"The land was empty when colonists arrived." Native nations had lived there for thousands of years.', '"All colonists came for religious freedom." Many came for land, money, or were forced (enslaved Africans).'],
    debrief: ['Which colonial region would you have chosen to live in, and why?', 'How did geography affect the jobs people had?', 'Whose perspective is often missing from stories about the colonies?']
  },
  resources: [
    { type: 'Primary sources', name: 'Library of Congress: Classroom Materials', url: 'https://www.loc.gov/programs/teachers/classroom-materials/', note: 'Primary source sets on colonial settlement and Native American life.' },
    { type: 'Native perspectives', name: 'Smithsonian NMAI: Native Knowledge 360°', url: 'https://americanindian.si.edu/nk360/', note: 'Free lessons written with Native communities.' },
    { type: 'Virtual tour', name: 'Colonial Williamsburg: Learn', url: 'https://www.colonialwilliamsburg.org/learn/', note: 'Videos and virtual tours of colonial daily life.' },
    { type: 'Indiana', name: 'Indiana Historical Society', url: 'https://indianahistory.org/', note: 'Resources on Indiana\'s Native nations, including the Miami and Potawatomi.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-ss-revolution', grade: 5, subject: 'social', code: '5.H.7–5.H.13',
  title: 'The American Revolution',
  text: 'Explain how political, religious, and economic ideas brought about the American Revolution, analyze its causes as outlined in the Declaration of Independence, and describe key leaders, events, contributions, and consequences of the war.',
  lesson: {
    target: 'I can explain the causes, key events, and results of the American Revolution in the order they happened.',
    vocab: [['Tax', 'Money people must pay to a government.'], ['Boycott', 'Refusing to buy goods as a protest.'], ['Patriot / Loyalist', 'A colonist who supported independence / a colonist loyal to the king.'], ['Declaration of Independence', 'The 1776 document explaining why the colonies were breaking from Britain.'], ['Treaty of Paris (1783)', 'The agreement that ended the war and recognized U.S. independence.']],
    hook: 'Announce (as a joke): "Starting today, there is a 10-cent tax on every pencil, and you don\'t get a vote about it." Let students react, then ask how the colonists might have felt.',
    teach: ['After the French and Indian War (1754–1763), Britain was in debt and taxed the colonies: Sugar Act, Stamp Act (1765), Townshend Acts, Tea Act.', 'Colonists protested "no taxation without representation": they had no vote in Parliament. They boycotted goods and formed groups like the Sons of Liberty.', 'Tensions grew: Boston Massacre (1770), Boston Tea Party (1773), Intolerable Acts (1774), Lexington and Concord (1775), the first battles.', 'July 4, 1776: the Continental Congress adopted the Declaration of Independence, written mainly by Thomas Jefferson.', 'Turning points: Saratoga (1777) brought French help; Yorktown (1781) ended major fighting; Treaty of Paris (1783) made independence official.'],
    model: 'Build a cause-and-effect chain on the board: Debt → Taxes → Protests → Punishment → Battles → Declaration. Think aloud about how each event caused the next.',
    check: 'Read three events out of order; students hold up fingers for which came first (1), second (2), third (3): Declaration, Stamp Act, Boston Tea Party. (Stamp Act, Tea Party, Declaration.)',
    misconceptions: ['"The war started with the Declaration of Independence." Fighting began at Lexington and Concord more than a year earlier.', '"All colonists wanted independence." Many were Loyalists or neutral.', '"The colonists won alone." French money, troops, and navy were essential.'],
    debrief: ['Which cause of the Revolution do you think mattered most? Why?', 'How was the Declaration of Independence both a list of complaints and a statement of ideas?', 'Was the Revolution "revolutionary" for everyone? Who was left out?']
  },
  resources: [
    { type: 'Primary sources', name: 'National Archives: DocsTeach', url: 'https://www.docsteach.org/', note: 'Revolution-era documents with ready-made activities.' },
    { type: 'Virtual tour', name: 'George Washington\'s Mount Vernon: Education', url: 'https://www.mountvernon.org/education', note: 'Videos, virtual tours, and primary sources.' },
    { type: 'Primary sources', name: 'Library of Congress: Classroom Materials', url: 'https://www.loc.gov/programs/teachers/classroom-materials/', note: 'Primary source sets on the Revolution.' },
    { type: 'Games', name: 'iCivics', url: 'https://www.icivics.org/', note: 'Free civics games and lesson plans.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-ss-civics', grade: 5, subject: 'social', code: '5.H.14–5.H.15 · 5.C.1 · 5.C.3 · 5.C.5',
  title: 'Founding Documents & Our Government',
  text: 'Explain why the Constitution was created and how the Bill of Rights was drafted, the purposes in the Preamble, key ideas in the founding documents, and the functions of the three branches of government.',
  lesson: {
    target: 'I can explain how the Constitution divides power among three branches and which rights the Bill of Rights protects.',
    vocab: [['Constitution', 'The supreme law of the United States, written in 1787.'], ['Legislative branch', 'Congress (Senate and House). Makes laws.'], ['Executive branch', 'The President. Carries out and enforces laws.'], ['Judicial branch', 'The Supreme Court and federal courts. Interpret laws.'], ['Checks and balances', 'Each branch can limit the power of the others.'], ['Amendment', 'A change or addition to the Constitution. The first ten are the Bill of Rights.']],
    hook: 'Ask: "Should one student get to make all the rules for our class, enforce them, AND decide if someone broke them?" Discuss why that is risky.',
    teach: ['The Articles of Confederation made a weak national government, so leaders wrote the Constitution in 1787 in Philadelphia.', 'The Preamble begins "We the People," showing that power comes from the people (popular sovereignty).', 'Separation of powers: Congress makes laws, the President carries them out, and courts decide what laws mean.', 'Checks and balances: the President can veto a bill; Congress can override a veto with a 2/3 vote; courts can rule a law unconstitutional; the Senate approves judges.', 'The Bill of Rights (1791) protects freedoms like speech, religion, press, assembly, and fair trials.'],
    model: 'Draw three boxes labeled Legislative, Executive, Judicial with arrows between them. Walk through one check aloud: "Congress passes a law. The President vetoes it. Congress votes 2/3 to override. Now it becomes a law anyway."',
    check: 'Students point to the correct branch on your diagram: signs a bill (Executive), declares war (Legislative), decides a case (Judicial).',
    misconceptions: ['"The President is the boss of the whole government." The three branches are equal and check each other.', '"The Bill of Rights gives people rights." It protects rights people already have from government interference.', '"Freedom of speech means you can say anything anywhere with no consequences." It limits government, not every consequence.'],
    debrief: ['Why did the Founders divide power into three branches?', 'Which right in the Bill of Rights matters most to you, and why?', 'Describe one check and balance in your own words.']
  },
  resources: [
    { type: 'Games', name: 'iCivics', url: 'https://www.icivics.org/', note: 'Games like "Branches of Power" and "Do I Have a Right?"' },
    { type: 'Reference', name: 'Ben\'s Guide to the U.S. Government', url: 'https://bensguide.gpo.gov/', note: 'Kid-friendly explanations from the Government Publishing Office.' },
    { type: 'Interactive', name: 'National Constitution Center: Interactive Constitution', url: 'https://constitutioncenter.org/the-constitution', note: 'The full text with plain-language explanations.' },
    { type: 'Primary sources', name: 'National Archives: DocsTeach', url: 'https://www.docsteach.org/', note: 'Founding documents and activities.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 6 SOCIAL STUDIES ======================= */
{
  id: 'g6-ss-americas', grade: 6, subject: 'social', code: '2026 code pending',
  title: 'Early Civilizations of the Americas',
  text: 'Compare the Maya, Aztec, and Inca civilizations, including their geography, government, economy, religion, and achievements, and explain the effects of their encounters with Europeans.',
  lesson: {
    target: 'I can compare the Maya, Aztec, and Inca and explain how geography shaped their achievements.',
    vocab: [['Civilization', 'A complex society with cities, government, specialized jobs, and a system of writing or records.'], ['Chinampa', 'An Aztec floating garden built in a shallow lake.'], ['Terrace farming', 'Cutting flat steps into mountainsides to farm (Inca).'], ['Quipu', 'Knotted strings the Inca used to keep records.'], ['Conquistador', 'A Spanish conqueror of the Americas, such as Cortés or Pizarro.']],
    hook: 'Ask: "How would you grow food if you lived on a steep mountain? In a swampy lake? In a thick rainforest?" Tell students three real civilizations solved these problems.',
    teach: ['Maya (about 250–900 CE at their height): Yucatán Peninsula rainforests of Mexico and Central America. City-states ruled by kings, stone pyramids, a 365-day calendar, a writing system of glyphs, and the concept of zero.', 'Aztec (1300s–1521): built Tenochtitlan on an island in Lake Texcoco (today Mexico City). Chinampas, causeways, a powerful empire that collected tribute.', 'Inca (1400s–1532): Andes Mountains of South America. Terrace farming, 14,000+ miles of roads, suspension bridges, quipus, Machu Picchu.', 'Spanish conquistadors (Cortés vs. the Aztec, 1519–1521; Pizarro vs. the Inca, 1532) used horses, steel weapons, and alliances, while diseases like smallpox killed millions.'],
    model: 'Draw a three-circle comparison on the board. Think aloud as you place "pyramids" (Maya and Aztec), "roads and quipus" (Inca), "farming adapted to geography" (all three, in the center).',
    check: 'Say a clue; students hold up M, A, or I with hand signs: floating gardens (A), Andes Mountains (I), glyph writing and calendar (M).',
    misconceptions: ['"The Maya, Aztec, and Inca lived at the same time and place." They were centuries and thousands of miles apart.', '"The Maya disappeared." Millions of Maya people live in Mexico and Central America today.', '"The Spanish won only because of weapons." Disease and alliances with other Native groups mattered most.'],
    debrief: ['Which civilization\'s achievement impressed you most, and why?', 'How did each civilization adapt to its geography?', 'Why were diseases so devastating to these civilizations?']
  },
  resources: [
    { type: 'Virtual tour', name: 'Google Arts & Culture', url: 'https://artsandculture.google.com/', note: 'Search "Machu Picchu" or "Chichén Itzá" for 360° tours and artifact collections.' },
    { type: 'Reference', name: 'World History Encyclopedia', url: 'https://www.worldhistory.org/', note: 'Reliable articles and images on the Maya, Aztec, and Inca.' },
    { type: 'Native perspectives', name: 'Smithsonian NMAI: Native Knowledge 360°', url: 'https://americanindian.si.edu/nk360/', note: 'Inka Road lessons and more.' },
    { type: 'Media library', name: 'National Geographic Education', url: 'https://education.nationalgeographic.org/', note: 'Encyclopedia entries and maps.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ss-europe', grade: 6, subject: 'social', code: '2026 code pending',
  title: 'Medieval Europe to the Renaissance',
  text: 'Explain feudalism, the role of the Church, the Magna Carta, the Crusades, and the Black Death, and describe how the Renaissance and Reformation changed European society.',
  lesson: {
    target: 'I can explain how feudalism worked and how events like the Black Death and the Renaissance changed Europe.',
    vocab: [['Feudalism', 'A system where land was traded for loyalty and military service.'], ['Manor', 'A lord\'s estate, including a village, farmland, and castle or manor house.'], ['Magna Carta (1215)', 'A document that limited the English king\'s power; even the king had to follow the law.'], ['Black Death', 'A plague (1347–1351) that killed about one-third of Europe\'s people.'], ['Renaissance', 'A "rebirth" of art, learning, and interest in ancient Greece and Rome (about 1350–1600).'], ['Humanism', 'A Renaissance idea focused on human potential and achievement.']],
    hook: 'Draw a pyramid on the board with the label "Who gets the land?" Ask students to guess who was at the top and bottom in medieval Europe.',
    teach: ['Feudalism: the king granted land (fiefs) to nobles; nobles gave land to knights for military service; peasants and serfs farmed the land for protection.', 'The Catholic Church was the most powerful institution: it united Europeans, ran schools, and owned large amounts of land.', 'Magna Carta (1215): English nobles forced King John to sign it. It planted the idea that rulers must obey the law, an idea later used in the U.S. Constitution.', 'The Black Death killed about 1 in 3 Europeans. Labor shortages gave surviving peasants more power and weakened feudalism.', 'The Renaissance began in Italian city-states like Florence. Artists and thinkers (Leonardo da Vinci, Michelangelo) studied ancient ideas. Gutenberg\'s printing press (about 1450) spread ideas quickly.'],
    model: 'Complete the feudal pyramid while thinking aloud about what each level gave and received. Then add an arrow: "Black Death → fewer workers → peasants can demand pay → feudalism weakens."',
    check: 'Thumbs up/down: "Serfs could leave the manor whenever they wanted." (Down.) "The printing press made books cheaper." (Up.)',
    misconceptions: ['"The Middle Ages were a time when nothing happened." Universities, cathedrals, and legal ideas like the Magna Carta developed.', '"The Magna Carta gave rights to everyone." At first it mostly protected nobles.', '"The Renaissance happened everywhere at once." It started in Italy and spread over centuries.'],
    debrief: ['How did the Black Death help end feudalism?', 'Why is the Magna Carta important to Americans today?', 'Which Renaissance invention or idea changed the world the most?']
  },
  resources: [
    { type: 'Primary sources', name: 'British Library: Magna Carta', url: 'https://www.bl.uk/magna-carta', note: 'The original document with student-friendly explanations.' },
    { type: 'Virtual tour', name: 'Google Arts & Culture', url: 'https://artsandculture.google.com/', note: 'Explore the Sistine Chapel, Uffizi Gallery, and medieval castles.' },
    { type: 'Reference', name: 'World History Encyclopedia', url: 'https://www.worldhistory.org/', note: 'Articles on feudalism, the Black Death, and the Renaissance.' },
    { type: 'Practice', name: 'Khan Academy: World History', url: 'https://www.khanacademy.org/humanities/world-history', note: 'Videos on medieval Europe and the Renaissance.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ss-geo', grade: 6, subject: 'social', code: '2026 code pending',
  title: 'Geography of Europe & the Americas',
  text: 'Use latitude, longitude, and other map tools to locate places, identify major physical features and climate regions of Europe and the Americas, and explain how people adapt to and change their environments.',
  lesson: {
    target: 'I can use latitude and longitude and explain how physical features and climate affect how people live.',
    vocab: [['Latitude', 'Imaginary lines running east–west that measure distance north or south of the Equator.'], ['Longitude', 'Imaginary lines running north–south that measure distance east or west of the Prime Meridian.'], ['Physical feature', 'A natural feature of Earth\'s surface: mountains, rivers, plains, peninsulas.'], ['Climate', 'The usual weather of a place over a long time.'], ['Human–environment interaction', 'How people adapt to, depend on, and change their environment.']],
    hook: 'Ask: "Indianapolis is at about 40° N, 86° W. Madrid, Spain is also about 40° N. Why might their weather still be different?"',
    teach: ['Latitude lines are parallel to the Equator (0°) and go up to 90° N and 90° S. Longitude lines meet at the poles; the Prime Meridian (0°) runs through Greenwich, England.', 'Always write latitude first, then longitude: 40° N, 86° W.', 'Major features: Andes and Rocky Mountains, Amazon and Mississippi rivers, Alps, Great European Plain, Scandinavian and Iberian peninsulas.', 'Climate depends on latitude, elevation, distance from oceans, and ocean currents (the Gulf Stream keeps western Europe mild).', 'People adapt (terrace farming in the Andes), depend (fishing in Norway), and modify (dikes in the Netherlands) their environments.'],
    model: 'Draw a simple grid on the board. Think aloud as you locate "20° S, 60° W": "Start at the Equator, go down to 20 south. Start at the Prime Meridian, go left to 60 west. That\'s in South America."',
    check: 'Students trace with a finger in the air: "Show me a line of latitude" (side to side). "Show me a line of longitude" (up and down).',
    misconceptions: ['"Latitude and longitude are the same thing." Latitude = north/south position, longitude = east/west position.', '"Places at the same latitude have the same climate." Elevation, oceans, and currents matter too.', '"South America is directly south of North America." Most of South America is east of Florida.'],
    debrief: ['Why do we always write latitude first?', 'Give an example of people changing their environment. Was it helpful or harmful?', 'How does the Gulf Stream affect people in Europe?']
  },
  resources: [
    { type: 'Mapping', name: 'National Geographic MapMaker', url: 'https://mapmaker.nationalgeographic.org/', note: 'Free interactive maps with climate, population, and physical layers.' },
    { type: 'Mapping', name: 'Google Earth', url: 'https://earth.google.com/web/', note: 'Fly to any coordinates and take a virtual trip.' },
    { type: 'Games', name: 'Seterra Geography', url: 'https://www.seterra.com/', note: 'Free map quiz games for Europe and the Americas.' },
    { type: 'Media library', name: 'National Geographic Education', url: 'https://education.nationalgeographic.org/', note: 'Lessons on latitude, longitude, and climate regions.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ss-ancient', grade: 6, subject: 'social', code: '6.H.1 · 6.H.3 · 6.C.2 · 6.C.3 · 6.G.1 · 6.G.4 · 6.E.1 · 6.E.2 · 6.E.4', sims: false,
  title: 'Ancient Greece vs. Ancient Rome (G.R.A.P.E.S.)',
  text: 'Compare ancient Greece and ancient Rome using G.R.A.P.E.S.: how geography shaped each civilization, their religions, achievements, political systems (Athenian democracy and the Roman Republic), economies and trade, and social structures, and explain how both influenced the United States today.',
  lesson: {
    target: 'I can use G.R.A.P.E.S. to compare ancient Greece and ancient Rome and explain how each one influenced the United States.',
    vocab: [['G.R.A.P.E.S.', 'Geography, Religion, Achievements, Politics, Economics, Social structure: six categories for studying a civilization.'], ['City-state (polis)', 'An independent city and the land around it, with its own government, like Athens or Sparta.'], ['Direct democracy', 'Citizens vote on laws themselves (Athens).'], ['Republic', 'Citizens elect representatives to make laws (Rome, and the U.S. today).'], ['Polytheism', 'Belief in many gods.'], ['Patricians / plebeians', 'Wealthy Roman nobles / ordinary Roman citizens.']],
    hook: 'Ask: "Your class needs to make a rule. Should EVERY student vote on it, or should you ELECT a few leaders to decide?" Tell students one choice is Greek and one is Roman.',
    teach: ['Geography: Greece is a rocky, mountainous peninsula with many islands. Mountains separated people into independent city-states, and the sea led Greeks to fish, trade, and start colonies. Rome began on seven hills by the Tiber River in the middle of the Italian peninsula, with fertile plains that were easier to unite.', 'Religion: Both were polytheistic. Greek gods lived on Mount Olympus (Zeus, Athena, Poseidon). Romans adopted many Greek gods with new names (Jupiter, Minerva, Neptune). Later, Christianity spread in the Roman Empire and became its official religion in 380 CE.', 'Achievements: Greece gave us democracy, philosophy (Socrates, Plato, Aristotle), the Olympic Games, drama, and columns like the Parthenon\'s. Rome gave us arches, concrete, aqueducts, 50,000+ miles of paved roads, the Colosseum, written law (the Twelve Tables), and Latin.', 'Politics: Athens created direct democracy (about 508 BCE), where adult male citizens voted on laws. Sparta was ruled by two kings and a council. Rome became a republic in 509 BCE, with elected consuls and a Senate, then an empire under Augustus in 27 BCE.', 'Economics and social structure: Greeks traded olive oil, wine, and pottery by sea and used coins like the drachma. Rome traded across its empire using roads and the denarius. Both relied on enslaved labor. Athens had citizens, women, metics (foreigners), and enslaved people; Rome had patricians, plebeians, and enslaved people.'],
    model: 'Draw a two-column G.R.A.P.E.S. chart (Greece | Rome) with six rows. Fill in Geography while thinking aloud: "Mountains split Greece into city-states, but Rome\'s plains were easier to unite. So geography helps explain why Rome became one big empire."',
    check: 'Call out a clue; students hold up G for Greece or R for Rome: "Parthenon" (G), "aqueducts" (R), "direct democracy" (G), "Senate and consuls" (R), "Olympics" (G), "Twelve Tables" (R).',
    misconceptions: ['"Greece and Rome were the same civilization." They were different peoples, languages, and governments, though Rome borrowed heavily from Greek culture.', '"Everyone in Athens could vote." Only free adult men who were citizens could vote. Women, foreigners, and enslaved people could not.', '"Rome was always an empire." Rome was a kingdom, then a republic for almost 500 years, and only then an empire.', '"The Romans copied everything from Greece." Rome added its own achievements, like concrete, arches, roads, and written law.'],
    debrief: ['Which G.R.A.P.E.S. category shows the biggest difference between Greece and Rome? Why?', 'How did geography help Rome build a larger empire than Greece?', 'Which idea from Greece or Rome can you see in the United States today?']
  },
  resources: [
    { type: 'Reference', name: 'World History Encyclopedia', url: 'https://www.worldhistory.org/', note: 'Reliable articles and images on ancient Greece and Rome.' },
    { type: 'Media library', name: 'National Geographic Education', url: 'https://education.nationalgeographic.org/', note: 'Encyclopedia entries and maps of the ancient Mediterranean.' },
    { type: 'Practice', name: 'Khan Academy: World History', url: 'https://www.khanacademy.org/humanities/world-history', note: 'Videos on ancient Greece and Rome.' },
    { type: 'Virtual tour', name: 'Google Arts & Culture', url: 'https://artsandculture.google.com/', note: 'Search "Acropolis" or "Colosseum" for 360° tours.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 5 ELA ======================= */
{
  id: 'g5-ela-theme', grade: 5, subject: 'ela', code: '5.RC.1 & 5.RC.2',
  title: 'Theme & Summary',
  text: 'Quote accurately from a text when explaining what it says explicitly and when drawing inferences; determine the theme of a story, play, or poem from details in the text, including how characters respond to challenges; summarize the text.',
  lesson: {
    target: 'I can determine a theme from how characters respond to challenges and write an objective summary.',
    vocab: [['Theme', 'The message or life lesson the author wants readers to understand. It is written as a full sentence.'], ['Topic', 'What the story is about in one or two words (friendship, courage). A topic is not a theme.'], ['Summary', 'A short retelling of the most important events in order, without opinions.'], ['Conflict', 'The problem or challenge the main character faces.'], ['Resolution', 'How the conflict is solved.']],
    hook: 'Tell the fable of the tortoise and the hare in 30 seconds. Ask: "What is this story about in one word?" (a race). "What is it trying to teach?" Contrast the two answers.',
    teach: ['A topic is one or two words. A theme is a complete sentence about life: "Slow and steady effort can beat talent without effort."', 'To find a theme, ask: What challenge did the character face? How did they respond? What changed? What lesson does that teach anyone?', 'A theme applies to everyone, not only the character. Avoid names in a theme statement.', 'A summary includes who, the problem, key events in order, and the resolution. It leaves out small details and your opinion.'],
    model: 'Use the formula on the board: "Character + challenge + response + change → lesson." Fill it in for the tortoise and hare, then cross out "the tortoise" to make the lesson universal.',
    check: 'Show two statements. Students vote: topic or theme? "Honesty." (Topic.) "Telling the truth builds trust even when it is hard." (Theme.)',
    misconceptions: ['"The theme is one word, like friendship." That is a topic.', '"A summary includes everything that happened." It includes only the most important events.', '"There is only one correct theme." Stories can have several themes if the text supports them.'],
    debrief: ['What is the difference between a topic and a theme?', 'Which story in the activity had the clearest theme? What details showed it?', 'Name a book or movie you love. What is one theme?']
  },
  resources: [
    { type: 'Texts', name: 'CommonLit', url: 'https://www.commonlit.org/', note: 'Free leveled short stories and poems with theme questions.' },
    { type: 'Texts', name: 'ReadWorks', url: 'https://www.readworks.org/', note: 'Free fiction passages with question sets.' },
    { type: 'Lessons', name: 'ReadWriteThink', url: 'https://www.readwritethink.org/', note: 'Lesson plans and graphic organizers for theme and summary.' },
    { type: 'Practice', name: 'Khan Academy: Reading & Vocabulary', url: 'https://www.khanacademy.org/ela', note: 'Grade 5 reading practice with theme questions.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-ela-info', grade: 5, subject: 'ela', code: '5.RC.6 & 5.RC.8',
  title: 'Main Ideas & Text Structure',
  text: 'Determine two or more main ideas of a text and explain how they are supported by key details; summarize the text; compare and contrast the organizational structure of events, ideas, concepts, or information in two or more texts.',
  lesson: {
    target: 'I can find the main ideas of an informational text, choose the details that support them, and name the text structure.',
    vocab: [['Main idea', 'The most important point the author makes about the topic.'], ['Key detail', 'A fact, example, or reason that supports the main idea.'], ['Text structure', 'How an author organizes information.'], ['Signal words', 'Words that hint at structure: first/then (sequence), because/as a result (cause-effect), however/both (compare), problem/solution.'], ['Chronological', 'In time order.']],
    hook: 'Show a "table" drawing: the tabletop is the main idea, the legs are details. "What happens if the table has no legs?"',
    teach: ['The main idea is often in the first or last sentence of a paragraph, but not always. Ask: What does every sentence have in common?', 'Details support the main idea. An interesting detail that does not support the point is not a key detail.', 'Longer texts have two or more main ideas, usually one per section.', 'Five structures: description, sequence/chronology, compare/contrast, cause/effect, problem/solution. Signal words are clues.'],
    model: 'Read a short paragraph aloud about monarch butterflies migrating to Mexico. Think aloud: "Every sentence tells about their long trip, so the main idea is: Monarchs travel thousands of miles each fall. The detail about their orange color is interesting but doesn\'t support that."',
    check: 'Say signal words; students name the structure: "as a result" (cause/effect), "similarly" (compare/contrast), "in 1804... later..." (chronology).',
    misconceptions: ['"The main idea is always the first sentence." It can be anywhere or not stated at all.', '"The most interesting detail is the main idea." The main idea is the point the details support.', '"Texts only have one structure." Authors often mix structures; look for the main one.'],
    debrief: ['How did you decide which details were key?', 'What signal words helped you the most?', 'Why might an author choose problem/solution instead of description?']
  },
  resources: [
    { type: 'Texts', name: 'ReadWorks', url: 'https://www.readworks.org/', note: 'Free nonfiction article sets with main idea questions.' },
    { type: 'Texts', name: 'Newsela', url: 'https://newsela.com/', note: 'Current events at multiple reading levels.' },
    { type: 'Texts', name: 'CommonLit', url: 'https://www.commonlit.org/', note: 'Informational texts with text structure questions.' },
    { type: 'Practice', name: 'Khan Academy: Reading & Vocabulary', url: 'https://www.khanacademy.org/ela', note: 'Grade 5 informational reading practice.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-ela-vocab', grade: 5, subject: 'ela', code: '5.RC.11–5.RC.14',
  title: 'Context Clues, Roots & Figurative Language',
  text: 'Use context clues, word relationships, Greek and Latin affixes and roots, and knowledge of figurative language (similes, metaphors, hyperbole, idioms) to determine the meanings of words and phrases.',
  lesson: {
    target: 'I can use context clues and word parts to figure out new words and explain what figurative language means.',
    vocab: [['Context clues', 'Hints in nearby words or sentences that help you figure out a word.'], ['Root', 'The main part of a word that carries meaning (port = carry).'], ['Prefix / suffix', 'A word part added to the beginning / end of a root (re- = again; -less = without).'], ['Simile', 'A comparison using like or as.'], ['Metaphor', 'A comparison that says one thing IS another.'], ['Idiom', 'A saying whose meaning is different from its literal words ("break a leg").'], ['Personification', 'Giving human qualities to non-human things.']],
    hook: 'Write: "My backpack weighs a ton." Ask: "Is that true? What does it really mean?" Then write "The wind whispered." "Can wind whisper?"',
    teach: ['Context clue types: definition ("a biologist, or scientist who studies life"), synonym, antonym ("unlike his timid sister, Jake was bold"), and example.', 'Common roots: bio (life), graph (write), port (carry), dict (say), spect (look), tele (far), aud (hear), struct (build).', 'Common affixes: un-/dis- (not), re- (again), pre- (before), -ful (full of), -less (without), -ologist (one who studies).', 'Figurative language means something beyond the literal words. Simile uses like/as; metaphor says it IS; personification gives human actions; idioms are sayings; hyperbole is extreme exaggeration.'],
    model: 'Break apart "transportable" on the board: trans (across) + port (carry) + able (can be). "So it means able to be carried across. A transportable stage can be moved."',
    check: 'Students hold up S for simile, M for metaphor, or P for personification: "The classroom was a zoo." (M) "The stars danced." (P) "Quiet as a mouse." (S)',
    misconceptions: ['"Any comparison is a simile." It is a simile only if it uses like or as.', '"Context clues are always in the same sentence." Sometimes they are in the next sentence.', '"Idioms mean what they say." Their meaning is not literal.'],
    debrief: ['Which strategy helped you most: context clues or word parts?', 'Invent a simile and a metaphor for how you feel right now.', 'Why do authors use figurative language instead of saying things plainly?']
  },
  resources: [
    { type: 'Practice', name: 'Vocabulary.com', url: 'https://www.vocabulary.com/', note: 'Adaptive vocabulary practice and word lists.' },
    { type: 'Reference', name: 'Merriam-Webster', url: 'https://www.merriam-webster.com/', note: 'Word origins show Greek and Latin roots.' },
    { type: 'Lessons', name: 'ReadWriteThink', url: 'https://www.readwritethink.org/', note: 'Figurative language lessons and interactives.' },
    { type: 'Poems', name: 'Poetry Foundation: Children', url: 'https://www.poetryfoundation.org/learn/children', note: 'Poems full of similes and personification.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 6 ELA ======================= */
{
  id: 'g6-ela-evidence', grade: 6, subject: 'ela', code: '6.RC.1–6.RC.3',
  title: 'Textual Evidence, Inference & Theme',
  text: 'Analyze what a text says explicitly and draw inferences by citing textual evidence; determine how a theme is conveyed through particular details and provide an objective summary; analyze how a sentence, chapter, or scene fits into the overall structure and develops the theme, characterization, setting, or plot.',
  lesson: {
    target: 'I can make inferences about a literary text and support them with the strongest evidence, and explain how details develop a theme.',
    vocab: [['Inference', 'A logical conclusion based on text clues plus what you already know.'], ['Explicit', 'Stated directly in the text.'], ['Textual evidence', 'Words or sentences from the text that support an idea.'], ['Theme', 'A universal message about life developed through the story.'], ['Characterization', 'How an author reveals what a character is like: speech, thoughts, actions, and effects on others.']],
    hook: 'Say: "A girl walks in, drops her backpack, slams her binder down, and doesn\'t say hi." Ask: "How is she feeling? How do you know? Did I say she was upset?"',
    teach: ['Explicit = the text says it. Inference = the text shows it, and you figure it out: Text clue + What I know = Inference.', 'The strongest evidence directly supports the claim. Weak evidence is related to the topic but does not prove the point.', 'Introduce evidence with phrases: "The text states...", "For example...", "According to paragraph 3..."', 'Theme develops over a story. Track what the character learns, how they change, and what the title or ending suggests.'],
    model: 'Put two pieces of evidence next to the inference "Marcus is nervous about the game." Evidence A: "The game started at 7:00." Evidence B: "Marcus retied his shoes for the fourth time." Think aloud about why B is stronger.',
    check: 'Show a claim and three quotes. Students hold up 1, 2, or 3 for the strongest evidence.',
    misconceptions: ['"An inference is a guess." It is a conclusion based on evidence.', '"Any quote about the topic works as evidence." Evidence must support the specific claim.', '"The theme is stated in the last sentence." Themes are usually developed across the whole text.'],
    debrief: ['What made a piece of evidence "strongest" today?', 'How is an inference different from a guess?', 'Which detail in the activity best revealed a theme?']
  },
  resources: [
    { type: 'Texts', name: 'CommonLit', url: 'https://www.commonlit.org/', note: 'Grade 6 short stories with evidence-based questions.' },
    { type: 'Texts', name: 'ReadWorks', url: 'https://www.readworks.org/', note: 'Fiction passages and paired texts.' },
    { type: 'Lessons', name: 'ReadWriteThink', url: 'https://www.readwritethink.org/', note: 'Inference and citing evidence lessons.' },
    { type: 'Practice', name: 'Khan Academy: Reading & Vocabulary', url: 'https://www.khanacademy.org/ela', note: 'Grade 6 reading practice.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ela-central', grade: 6, subject: 'ela', code: '6.RC.5 & 6.RC.8',
  title: 'Central Idea & Author\'s Argument',
  text: 'Determine how a central idea of a text is conveyed through particular details and provide an objective summary; trace and evaluate the argument and specific claims in a text, distinguishing supported claims from unsupported ones.',
  lesson: {
    target: 'I can determine the central idea of a text and evaluate whether an author\'s claims are supported by evidence.',
    vocab: [['Central idea', 'The most important idea of the whole text.'], ['Claim', 'A statement the author wants you to believe.'], ['Reason', 'Why the author believes the claim.'], ['Evidence', 'Facts, statistics, examples, or expert quotes that prove a reason.'], ['Counterclaim', 'An opposing view the author addresses.'], ['Fact vs. opinion', 'A fact can be proven; an opinion is a belief or feeling.']],
    hook: 'Show two "ads": "Our cereal is the BEST, everyone loves it!" vs. "Our cereal has 8 grams of protein, twice as much as the leading brand." Ask which is more convincing and why.',
    teach: ['The central idea is what the whole text is mostly about. It is usually developed in several sections.', 'An argument has a claim, reasons, and evidence. Strong evidence is specific, relevant, and from a reliable source.', 'Unsupported claims use exaggeration ("everyone knows"), opinion words, or no evidence at all.', 'Good arguments address counterclaims and then respond with evidence.'],
    model: 'Diagram an argument on the board: Claim: "Our school should start later." Reason: teens need more sleep. Evidence: "The American Academy of Pediatrics recommends 8:30 a.m. or later." Circle the evidence and label it "expert source."',
    check: 'Read statements; students show F (fact) or O (opinion): "Indiana became a state in 1816." (F) "Winter is the best season." (O)',
    misconceptions: ['"A strong argument just needs strong feelings." Arguments need evidence.', '"Statistics always prove a claim." Evidence must be relevant and from a reliable source.', '"The central idea is the topic." The central idea is a full statement about the topic.'],
    debrief: ['Which claim in the activity was best supported? Why?', 'What makes a source reliable?', 'How do authors make an argument stronger by including counterclaims?']
  },
  resources: [
    { type: 'Texts', name: 'Newsela', url: 'https://newsela.com/', note: 'Pro/con articles at multiple reading levels.' },
    { type: 'Texts', name: 'CommonLit', url: 'https://www.commonlit.org/', note: 'Argumentative and informational texts with questions.' },
    { type: 'Media literacy', name: 'News Literacy Project: Checkology', url: 'https://newslit.org/', note: 'Free lessons on evaluating sources and claims.' },
    { type: 'Texts', name: 'ReadWorks', url: 'https://www.readworks.org/', note: 'Nonfiction article sets.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ela-vocab', grade: 6, subject: 'ela', code: '6.RC.10, 6.RC.12 & 6.RC.13',
  title: 'Word Meaning, Connotation & Figurative Language',
  text: 'Use context to determine the meaning of words and phrases, distinguish among the connotations of words with similar denotations, and use Greek and Latin affixes and roots as clues to word meaning.',
  lesson: {
    target: 'I can figure out word meanings from context and explain how connotation and figurative language shape tone.',
    vocab: [['Denotation', 'The dictionary definition of a word.'], ['Connotation', 'The feeling a word suggests: positive, negative, or neutral.'], ['Tone', 'The author\'s attitude toward the subject (hopeful, bitter, playful).'], ['Hyperbole', 'Extreme exaggeration for effect.'], ['Allusion', 'A reference to a well-known story, person, or event.'], ['Imagery', 'Language that appeals to the five senses.']],
    hook: 'Ask: "Would you rather be called thrifty or cheap? Curious or nosy?" Discuss: they mean nearly the same thing, so why does one feel better?',
    teach: ['Denotation is the dictionary meaning. Connotation is the emotional meaning. Authors choose words for both.', 'Word choice builds tone: "The puppy scampered" (playful) vs. "The creature skulked" (sinister).', 'Figurative language: simile, metaphor, personification, hyperbole, idiom, allusion. Ask: What is being compared, and what does it suggest?', 'Use context and word parts together: the sentence gives the clue, and the roots confirm it.'],
    model: 'Write "The old house stood on the hill." Rewrite it twice on the board: "The ancient mansion loomed over the hill" and "The cozy cottage perched on the hill." Think aloud about how two word changes flip the tone.',
    check: 'Students give a thumbs up for positive connotation, thumbs down for negative: "confident" vs. "arrogant"; "slender" vs. "scrawny".',
    misconceptions: ['"Synonyms can always be swapped." Connotation changes the meaning and tone.', '"Tone and mood are the same." Tone is the author\'s attitude; mood is how the reader feels.', '"Figurative language is only in poems." It appears in all kinds of writing, even news.'],
    debrief: ['Pick a word from the activity. How would the sentence change with a synonym?', 'How can you tell an author\'s tone?', 'Why would a writer use hyperbole?']
  },
  resources: [
    { type: 'Practice', name: 'Vocabulary.com', url: 'https://www.vocabulary.com/', note: 'Adaptive practice, including shades of meaning.' },
    { type: 'Poems', name: 'Poetry Foundation', url: 'https://www.poetryfoundation.org/', note: 'Poems for studying imagery, tone, and figurative language.' },
    { type: 'Texts', name: 'CommonLit', url: 'https://www.commonlit.org/', note: 'Grade 6 texts with word choice questions.' },
    { type: 'Lessons', name: 'ReadWriteThink', url: 'https://www.readwritethink.org/', note: 'Connotation and tone lessons.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-ela-writing', grade: 6, subject: 'ela', code: '6.W.2 · 6.W.6 · 6.W.7', sims: false,
  title: 'Grammar, Sentence Structure & Paragraph Structure',
  text: 'Organize informative writing with a clear topic, relevant details, transitions, and a concluding statement; use subject, object, and possessive pronouns correctly; write simple, compound, complex, and compound-complex sentences and correct fragments and run-ons; and use commas, semicolons, and colons correctly.',
  lesson: {
    target: 'I can write complete, correct sentences and organize them into a well-structured paragraph.',
    vocab: [['Fragment', 'An incomplete sentence missing a subject, a verb, or a complete thought.'], ['Run-on', 'Two complete sentences joined with no punctuation or with only a comma.'], ['Compound sentence', 'Two independent clauses joined by a comma and a conjunction (FANBOYS) or a semicolon.'], ['Complex sentence', 'An independent clause plus a dependent clause that begins with a word like because, when, or although.'], ['Topic sentence', 'The sentence that states the main idea of a paragraph.'], ['Transition', 'A word or phrase that connects ideas, like for example, however, or in addition.']],
    hook: 'Show: "Went to the store. Bought apples we ate them." Ask: "What\'s wrong here? How would you fix it?" Take ideas, then tell students today they become sentence and paragraph mechanics.',
    teach: ['Grammar: a singular subject takes a singular verb, and a plural subject takes a plural verb. Use subject pronouns (I, she, they) for the doer and object pronouns (me, her, them) for the receiver. Keep verb tense consistent.', 'A complete sentence has a subject, a predicate, and a complete thought. A fragment is missing one of these. A run-on or comma splice jams two sentences together.', 'Sentence variety: simple (one independent clause), compound (two independent clauses joined by a comma + FANBOYS or a semicolon), and complex (an independent clause + a dependent clause starting with because, when, although, if).', 'Paragraph structure: a topic sentence states the main idea; supporting details prove it; transitions connect ideas; a concluding sentence wraps it up.'],
    model: 'Fix "Went to the store. Bought apples we ate them." aloud: add a subject to the fragment ("My family went to the store"), then fix the run-on ("We bought apples, and we ate them"). Then combine into a complex sentence: "When my family went to the store, we bought apples."',
    check: 'Students show thumbs up (complete sentence), sideways (fragment), or down (run-on): "Because the bell rang." (sideways) "The bell rang we left." (down) "The bell rang, so we left." (up)',
    misconceptions: ['"A long sentence is a run-on." Length doesn\'t matter; a run-on joins complete sentences incorrectly.', '"A comma can join any two sentences." A comma alone creates a comma splice; add a conjunction.', '"Me and my friend" is correct as a subject. Use "My friend and I" when the pronoun is the subject.', '"A paragraph is just five sentences." A paragraph is organized around one main idea, with details that support it.'],
    debrief: ['What are three ways to fix a run-on sentence?', 'Why do writers use a mix of simple, compound, and complex sentences?', 'How does a topic sentence help the reader?']
  },
  resources: [
    { type: 'Practice', name: 'NoRedInk', url: 'https://www.noredink.com/', note: 'Adaptive grammar and sentence practice (free version available).' },
    { type: 'Reference', name: 'Purdue OWL: Grammar', url: 'https://owl.purdue.edu/owl/general_writing/grammar/index.html', note: 'Clear explanations of sentence structure and usage.' },
    { type: 'Practice', name: 'Khan Academy: Grammar', url: 'https://www.khanacademy.org/humanities/grammar', note: 'Videos and practice on parts of speech and sentences.' },
    { type: 'Lessons', name: 'ReadWriteThink', url: 'https://www.readwritethink.org/', note: 'Lessons on paragraph structure and writing organization.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 5 MATH ======================= */
{
  id: 'g5-math-fractions', grade: 5, subject: 'math', code: '5.CA.3–5.CA.5 · 5.CA.7',
  title: 'Adding, Subtracting & Multiplying Fractions',
  text: 'Add and subtract fractions and mixed numbers with unlike denominators, use visual fraction models to multiply a fraction by a fraction or a whole number, and solve real-world problems involving adding, subtracting, and multiplying fractions and mixed numbers.',
  lesson: {
    target: 'I can add, subtract, and multiply fractions with unlike denominators and use them to solve real-world problems.',
    vocab: [['Denominator', 'The bottom number: how many equal parts make a whole.'], ['Numerator', 'The top number: how many parts we have.'], ['Common denominator', 'A shared multiple of the denominators, used to add or subtract.'], ['Equivalent fractions', 'Fractions that name the same amount (1/2 = 3/6).'], ['Mixed number', 'A whole number and a fraction (2 1/4).'], ['Simplest form', 'A fraction whose numerator and denominator share no common factor except 1.']],
    hook: 'Ask: "You ate 1/2 of a pizza and your friend ate 1/3. Did you eat 2/5 of the pizza together?" Draw it and let students argue.',
    teach: ['To add or subtract, the pieces must be the same size. Find a common denominator (often the least common multiple).', 'Rewrite each fraction as an equivalent fraction, then add or subtract the numerators. The denominator stays the same.', 'Mixed numbers: add or subtract the wholes and the fractions, regrouping if needed (1 whole = 4/4).', 'To multiply, multiply numerators and multiply denominators: 2/3 × 3/4 = 6/12 = 1/2. "Of" often means multiply: 1/2 of 8 = 4.', 'Estimate first with benchmarks (0, 1/2, 1) to check if an answer makes sense.'],
    model: 'Solve 1/2 + 1/3 aloud: "Halves and thirds are different sizes. Both fit into sixths. 1/2 = 3/6, 1/3 = 2/6. 3/6 + 2/6 = 5/6. So 2/5 was wrong; 5/6 is close to 1, which makes sense."',
    check: 'On whiteboards or fingers: 1/4 + 1/2 = ? (3/4). 2/3 of 9 = ? (6).',
    misconceptions: ['"Add the tops and add the bottoms." 1/2 + 1/3 is not 2/5.', '"Multiplying always makes a number bigger." Multiplying by a fraction less than 1 makes it smaller.', '"You need a common denominator to multiply." Only for adding and subtracting.'],
    debrief: ['Why do we need a common denominator to add but not to multiply?', 'When is multiplying by a fraction like finding part of a group?', 'How did estimating help you catch a mistake today?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 5 units on fraction operations.' },
    { type: 'Practice', name: 'Khan Academy: 5th Grade Math', url: 'https://www.khanacademy.org/math/cc-fifth-grade-math', note: 'Videos and practice on adding and multiplying fractions.' },
    { type: 'Manipulatives', name: 'Math Learning Center: Fractions App', url: 'https://www.mathlearningcenter.org/apps', note: 'Free virtual fraction bars.' },
    { type: 'Tasks', name: 'Open Middle', url: 'https://www.openmiddle.com/', note: 'Challenging fraction puzzles for early finishers.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-math-decimals', grade: 5, subject: 'math', code: '5.NS.1 · 5.NS.3 · 5.CA.9–5.CA.10',
  title: 'Decimal Place Value & Operations',
  text: 'Compare and order decimals to thousandths, explain place-value patterns when multiplying or dividing by powers of 10, and add, subtract, multiply, and divide decimals to hundredths to solve real-world problems, including money.',
  lesson: {
    target: 'I can compare and round decimals and add, subtract, multiply, and divide decimals using place value.',
    vocab: [['Tenths / hundredths / thousandths', 'The first, second, and third places to the right of the decimal point.'], ['Expanded form', 'A number written as a sum of each digit\'s value (3.45 = 3 + 0.4 + 0.05).'], ['Round', 'Change a number to a nearby, simpler value.'], ['Power of ten', '10, 100, 1,000... Multiplying by 10 moves each digit one place left.']],
    hook: 'Write 0.5 and 0.45 on the board. "Which is bigger? 45 is more than 5, so 0.45 must be bigger... right?" Let students debate.',
    teach: ['Each place is 10 times the place to its right. 0.4 = 4 tenths = 40 hundredths.', 'To compare decimals, line up the decimal points and compare place by place from the left. Add zeros if it helps: 0.50 vs. 0.45.', 'To round, look at the digit to the right of the place you are rounding to. 5 or more rounds up.', 'Add and subtract by lining up decimal points. Multiply as whole numbers, then count total decimal places. When dividing by a whole number, the decimal point goes straight up into the quotient.'],
    model: 'Solve 3.6 × 0.4 aloud: "36 × 4 = 144. There is one decimal place in 3.6 and one in 0.4, so two in all: 1.44. Estimate: about 4 × 0.4 = 1.6. Close, makes sense."',
    check: 'Students show the answer on fingers or whiteboards: Round 4.67 to the nearest tenth (4.7). Which is greater, 0.3 or 0.29? (0.3.)',
    misconceptions: ['"Longer decimals are bigger." 0.45 is less than 0.5.', '"Line up the digits on the right when adding." Line up the decimal points.', '"Multiplying always gives a bigger answer." Multiplying by a decimal less than 1 gives a smaller answer.'],
    debrief: ['Why do we line up decimal points to add and subtract?', 'How can estimating help you place the decimal point?', 'Where do you see decimals outside of school?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 5 units on decimal place value and operations.' },
    { type: 'Practice', name: 'Khan Academy: 5th Grade Math', url: 'https://www.khanacademy.org/math/cc-fifth-grade-math', note: 'Decimal practice with instant feedback.' },
    { type: 'Manipulatives', name: 'Math Learning Center: Number Pieces', url: 'https://www.mathlearningcenter.org/apps', note: 'Virtual base-ten pieces for decimal models.' },
    { type: 'Warm-ups', name: 'Estimation 180', url: 'https://estimation180.com/', note: 'Daily estimation challenges that build number sense.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g5-math-volume', grade: 5, subject: 'math', code: '5.M.4–5.M.5',
  title: 'Volume of Rectangular Prisms',
  text: 'Find the volume of right rectangular prisms by packing them with unit cubes, and apply V = l × w × h and V = B × h to solve real-world problems.',
  lesson: {
    target: 'I can find the volume of rectangular prisms and composite figures and explain what volume means.',
    vocab: [['Volume', 'The amount of space inside a 3-D figure, measured in cubic units.'], ['Cubic unit', 'A cube 1 unit on each side (cm³, in³, ft³).'], ['Rectangular prism', 'A 3-D figure with 6 rectangular faces, like a box.'], ['Base (B)', 'The area of the bottom face: length × width.'], ['Composite figure', 'A solid made of two or more prisms joined together.']],
    hook: 'Hold up (or describe) a tissue box. "How many sugar cubes would fill it? How could we find out without actually filling it?"',
    teach: ['Volume counts cubes that fill a space. Area counts squares that cover a flat surface.', 'Build one layer: length × width cubes. Stack layers: multiply by height. V = l × w × h.', 'V = B × h means the same thing: B (area of the base) times the number of layers.', 'For composite figures, split into prisms, find each volume, and add. Units are always cubed (cm³).'],
    model: 'Draw a 4 × 3 × 5 prism. Think aloud: "The bottom layer is 4 by 3, so 12 cubes. There are 5 layers. 12 × 5 = 60 cubic units."',
    check: 'Fingers or whiteboards: A box is 2 × 3 × 4. Volume? (24 cubic units.) If the base area is 10 and the height is 6? (60.)',
    misconceptions: ['"Volume and area are the same." Area is 2-D square units; volume is 3-D cubic units.', '"Add the dimensions." Volume multiplies them.', '"Composite figures: multiply all the numbers you see." Split into separate prisms first.'],
    debrief: ['Explain why V = l × w × h works using the idea of layers.', 'How did you split a composite figure?', 'When would someone in real life need to know volume?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 5 volume unit.' },
    { type: 'Practice', name: 'Khan Academy: 5th Grade Math', url: 'https://www.khanacademy.org/math/cc-fifth-grade-math', note: 'Volume videos and practice.' },
    { type: 'Manipulatives', name: 'Toy Theater: 3-D Shapes', url: 'https://toytheater.com/', note: 'Free virtual manipulatives.' },
    { type: 'Tasks', name: 'Open Middle', url: 'https://www.openmiddle.com/', note: 'Volume puzzles with many solution paths.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
/* ======================= GRADE 6 MATH ======================= */
{
  id: 'g6-math-ratios', grade: 6, subject: 'math', code: '6.RP.1–6.RP.5',
  title: 'Ratios, Rates & Percents',
  text: 'Convert between fractions, decimals, and percents; understand unit rates; make tables of equivalent ratios; and solve real-world rate and ratio problems using tables, tape diagrams, double number lines, and equations.',
  lesson: {
    target: 'I can use ratios, unit rates, and percents to solve real-world problems.',
    vocab: [['Ratio', 'A comparison of two quantities (3 to 2, 3:2, 3/2).'], ['Rate', 'A ratio comparing quantities with different units (miles per hour).'], ['Unit rate', 'A rate per 1 unit ($2 per pound).'], ['Equivalent ratios', 'Ratios that make the same comparison (2:3 = 4:6).'], ['Percent', 'A ratio out of 100 (45% = 45/100).']],
    hook: 'Ask: "A 12-pack of juice costs $6. A 20-pack costs $9. Which is the better deal?" Have students vote before any math.',
    teach: ['Ratios compare. Order matters: 3 dogs to 2 cats is 3:2, not 2:3.', 'Equivalent ratios: multiply or divide both parts by the same number. Tables and double number lines help.', 'Unit rate: divide to find the amount for 1. $6 ÷ 12 = $0.50 per juice.', 'Percent means per hundred. To find 20% of 60: 20/100 × 60 = 12, or 10% of 60 is 6, so 20% is 12.'],
    model: 'Solve the juice problem aloud: "12-pack: $6 ÷ 12 = $0.50 each. 20-pack: $9 ÷ 20 = $0.45 each. The 20-pack is the better deal, by 5 cents a juice."',
    check: 'Whiteboards: 3:4 = 9:? (12). What is 25% of 80? (20). 150 miles in 3 hours is how many miles per hour? (50.)',
    misconceptions: ['"Ratio order doesn\'t matter." 3:2 and 2:3 are different comparisons.', '"Add the same number to both parts to make equivalent ratios." You must multiply or divide.', '"Percents can never be more than 100." 150% of something is more than the whole.'],
    debrief: ['When is a unit rate more useful than a total price?', 'What strategy did you use most for percents?', 'Where do you see ratios in sports or cooking?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 6 units on ratios, rates, and percents.' },
    { type: 'Practice', name: 'Khan Academy: 6th Grade Math', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math', note: 'Ratio and percent practice.' },
    { type: 'Interactive', name: 'Desmos Classroom', url: 'https://teacher.desmos.com/', note: 'Free activities on ratio tables and unit rates.' },
    { type: 'Tasks', name: 'Open Middle', url: 'https://www.openmiddle.com/', note: 'Ratio and percent puzzles.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-math-expressions', grade: 6, subject: 'math', code: '6.AF.1–6.AF.4 · 6.NS.7',
  title: 'Expressions & One-Step Equations',
  text: 'Write and evaluate expressions with variables, create equivalent expressions using properties of operations, use substitution to test solutions, solve one-step equations, and write inequalities to represent real-world constraints.',
  lesson: {
    target: 'I can write and evaluate expressions and solve one-step equations using inverse operations.',
    vocab: [['Variable', 'A letter that stands for an unknown number.'], ['Expression', 'Numbers, variables, and operations with no equal sign (3x + 2).'], ['Equation', 'A statement that two expressions are equal (3x + 2 = 11).'], ['Coefficient', 'The number multiplied by a variable (the 3 in 3x).'], ['Like terms', 'Terms with the same variable part (4x and 2x).'], ['Inverse operations', 'Operations that undo each other (+ and −, × and ÷).']],
    hook: 'Say: "I\'m thinking of a number. I multiplied it by 4 and got 36. What was my number?" Ask how students figured it out. That is solving an equation!',
    teach: ['Translate words to expressions: "5 more than n" = n + 5; "3 times a number" = 3n; "a number divided by 4" = n/4.', 'Evaluate by substituting the value and following the order of operations.', 'Combine like terms: 4x + 2x = 6x. Distributive property: 3(x + 2) = 3x + 6.', 'Solve one-step equations with inverse operations. Do the same thing to both sides to keep them balanced. Check by substituting.'],
    model: 'Solve x + 7 = 15 aloud with a balance drawing: "To get x alone, I undo +7 by subtracting 7 from both sides. x = 8. Check: 8 + 7 = 15. ✓"',
    check: 'Whiteboards: Evaluate 2n + 3 when n = 5 (13). Solve 6y = 42 (7).',
    misconceptions: ['"3x means 3 + x." It means 3 times x.', '"Do the operation you see." Use the inverse operation to undo it.', '"Only change one side of the equation." Whatever you do to one side, do to the other.'],
    debrief: ['What is the difference between an expression and an equation?', 'How do you know which inverse operation to use?', 'Why should you check your solution?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 6 expressions and equations unit.' },
    { type: 'Practice', name: 'Khan Academy: 6th Grade Math', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math', note: 'Practice writing and solving equations.' },
    { type: 'Interactive', name: 'Desmos Classroom', url: 'https://teacher.desmos.com/', note: 'Free "Solving Equations" activities.' },
    { type: 'Puzzles', name: 'Solve Me Mobiles', url: 'https://solveme.edc.org/', note: 'Balance puzzles that build equation sense.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
},
{
  id: 'g6-math-integers', grade: 6, subject: 'math', code: '6.NS.1–6.NS.3 · 6.AF.5',
  title: 'Integers, Absolute Value & the Coordinate Plane',
  text: 'Use positive and negative numbers to represent real-world quantities, explain opposites on the number line, compare and order rational numbers, and graph points on the coordinate plane to solve problems.',
  lesson: {
    target: 'I can use integers to describe real-world situations, compare them, find absolute value, and graph points in all four quadrants.',
    vocab: [['Integer', 'Whole numbers and their opposites (…−2, −1, 0, 1, 2…).'], ['Opposite', 'A number the same distance from 0 on the other side (5 and −5).'], ['Absolute value', 'A number\'s distance from 0, always positive or zero. |−7| = 7.'], ['Quadrant', 'One of four regions of the coordinate plane, numbered I–IV counterclockwise.'], ['Ordered pair', '(x, y): move along the x-axis first, then the y-axis.']],
    hook: 'Ask: "It was −8 °F in Fort Wayne and −3 °F in Evansville. Which city was colder? By how much?"',
    teach: ['Positive and negative numbers describe opposites: above/below sea level, gain/loss, deposit/withdrawal, above/below zero.', 'On a number line, numbers increase to the right. −3 > −8 because −3 is farther right.', 'Absolute value is distance from zero, so it is never negative. |−12| = 12.', 'Coordinate plane: (x, y). x tells left/right, y tells up/down. Quadrant I (+,+), II (−,+), III (−,−), IV (+,−).', 'Distance between points with the same x or same y: if same sign, subtract absolute values; if opposite signs, add them.'],
    model: 'Plot (−3, 4) aloud: "Start at the origin. x is −3, so move 3 left. y is 4, so move 4 up. That is Quadrant II." Then find the distance to (5, 4): "3 left to 0, then 5 right: 3 + 5 = 8 units."',
    check: 'Fingers: Which quadrant is (2, −6)? (4.) What is |−15|? (15.) Which is greater, −1 or −10? (−1.)',
    misconceptions: ['"−8 is greater than −3 because 8 > 3." On the number line, −8 is farther left.', '"Absolute value makes a number the opposite." It is distance, so |5| is still 5.', '"(3, 2) and (2, 3) are the same point." Order matters: x first, then y.'],
    debrief: ['Give a real-world example of a negative number.', 'How is absolute value useful when finding distance?', 'What trick helps you remember which quadrant is which?']
  },
  resources: [
    { type: 'Curriculum', name: 'Illustrative Mathematics', url: 'https://im.kendallhunt.com/', note: 'Free Grade 6 rational numbers unit.' },
    { type: 'Practice', name: 'Khan Academy: 6th Grade Math', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math', note: 'Integer and coordinate plane practice.' },
    { type: 'Interactive', name: 'Desmos Classroom', url: 'https://teacher.desmos.com/', note: 'Coordinate plane activities like "Polygraph: Points."' },
    { type: 'Warm-ups', name: 'Which One Doesn\'t Belong?', url: 'https://wodb.ca/', note: 'Number and graph warm-ups that spark discussion.' },
    { type: 'Standards', name: 'Indiana Academic Standards (IDOE)', url: 'https://www.in.gov/doe/students/indiana-academic-standards/', note: 'Official standards documents and frameworks.' }
  ]
}
];
window.CX_ROOMS = window.CX_ROOMS || [];
