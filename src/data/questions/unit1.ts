import { TopicQuestionBank } from "../../types/questions";

const benderAtlanticExcerpt = `
Thomas Bender, <cite>A Nation Among Nations: America's Place in World History</cite>, 2006</em></p>
<blockquote>
  &ldquo;The development of a plantation economy, beginning in the sixteenth century, transformed Africa, America, Europe, and Asia, too. It displaced the old silk trade and shifted the increasingly dynamic center of the world economy westward to the Atlantic. The Atlantic economy supplied eager European consumers with mildly addictive crops like tobacco and coffee, along with sugar. Investors prospered, and capital for further economic development accumulated in the home country. The governments found funding and motive to develop sea power. The Americas had lucrative export crops and developed a society based on a system of labor exploitation of Africans, and Africa suffered the transport of eleven million of its people to the New World.&rdquo;
</blockquote>
`;

const kuppermanExcerpt = `
Karen Ordahl Kupperman, <cite>The Atlantic in World History</cite>, 2012</em></p>
<blockquote>
  &ldquo;On the western side of the ocean, movements of people and ideas preceded the Atlantic connection. Great empires&mdash;in the Valley of Mexico, on the Mississippi River&mdash;had collapsed or declined in the centuries before 1492. As Columbus embarked on his first transatlantic voyage, the Mexica, or Aztecs, were consolidating their position; their city was a center of both trade and military might. Tenochtitl&aacute;n held 200,000 people, a population greater than in the largest city in contemporary Europe. The Mississippian culture spread east and west from its center, the city of Cahokia, on the Mississippi River near the site of modern St. Louis. It was a successor to earlier cultures, evidence of which can be seen in the great ceremonial mounds they built.&rdquo;
</blockquote>
`;

const crosbyExcerpt = `
Alfred W. Crosby, <cite>Ecological Imperialism: The Biological Expansion of Europe, 900&ndash;1900</cite>, 1986</em></p>
<blockquote>
  &ldquo;The isolation of the native peoples of the Americas from Old World germs prior to the last few hundred years was nearly absolute. Indications of the susceptibility of Native Americans to Old World infections appear almost immediately after the intrusion of the whites. In 1492, Columbus kidnapped a number of Arawak Indians to train as interpreters and to show to King Ferdinand and Queen Isabella. Several of them seem to have died on the stormy voyage to Europe. In 1495, Columbus sent 550 Arawak slaves across the Atlantic to be put to work in Spain. The majority of these soon were also dead. The most likely candidates for the role of exterminator of the first Native Americans in Europe were those that killed so many other Arawaks in the decades immediately following: Old World pathogens.&rdquo;
</blockquote>
`;

const caribbeanSugarEngraving = `
<p><em>Theodor de Bry, engraving of sugar production on a plantation in the Spanish Caribbean, 1595</em></p>
<p>Image courtesy of The Library Company of Philadelphia.</p>
`;

const richterNativeExcerpt = `
Daniel K. Richter, <cite>Facing East from Indian Country</cite>, 2001</em></p>
<blockquote>
  &ldquo;Cahokia and other major centers such as Coosa and Etowah in Georgia, Moundville in Alabama, and Natchez in Mississippi were home to highly stratified societies, organized as chiefdoms and characterized by a sharp divide between elites and commoners. Surrounding networks of agricultural hamlets provided food to support the urban centers. From the Ohio River through most of present-day Canada and down the coast to the Chesapeake were speakers of Algonquian languages. Nearly everywhere there, villages composed of 500 to 2,000 people were the norm. This Indian country was decentralized and diverse, but not disconnected. Routes of trade and communication, most of them millennia old and following the great river systems, crisscrossed the continent.&rdquo;
</blockquote>
`;

const kongoLetterExcerpt = `
<p><em>King Nzinga Mbemba (Afonso I) of Kongo, letter to King John III of Portugal, 1526</em></p>
<blockquote>
  &ldquo;Your Highness should know how our kingdom is being lost in so many ways. This is caused by the excessive freedom given by your agents and officials to the men and merchants who are allowed to come to this kingdom to set up shops with goods and many things which have been prohibited by us. The mentioned merchants are taking every day our natives, sons of the land and the sons of our noblemen and vassals and our relatives, because the thieves and men of bad conscience grab them wishing to have the things and wares of this kingdom which they are ambitious of. They grab them and get them to be sold; and so great, Sir, is the corruption and licentiousness that our country is being completely depopulated.&rdquo;
</blockquote>
`;

const lasCasasExcerpt = `
Bartolom&eacute; de Las Casas, <cite>In Defense of the Indians</cite>, c. 1550</em></p>
<blockquote>
  &ldquo;Some barbarians have a lawful, just, and natural government. Even though they lack the art and use of writing, they are not wanting in the capacity and skill to rule and govern themselves. They cultivated friendship and lived together in populous cities in which they wisely administered the affairs of both peace and war justly and equitably, truly governed by laws that at very many points surpass ours. Is this the way to impose the yoke of Christ on Christian men?&rdquo;
</blockquote>
`;

const veraCruzLetterExcerpt = `
<p><em>Officials of Villa Rica de la Vera Cruz, letter to King Charles V of Spain, 1519</em></p>
<blockquote>
  &ldquo;This land was good and, judging by the sample of gold which an Indian leader had brought, it was reasonable to believe that it must be very rich. It seemed better to all of us that a town should be founded and peopled there in the name of Your Royal Highnesses rather than merely trade for gold and return to Cuba.&rdquo;
</blockquote>
`;

const guevaraExcerpt = `
Isabel de Guevara, petition to the Spanish crown, 1556</em></p>
<blockquote>
  &ldquo;On reaching Buenos Aires, our expedition contained 1,500 men, but food was scarce, and the hunger was such that within three months 1,000 of them died. The men became so weak that all of the tasks fell on the poor women...standing guard, patrolling the fires, loading the crossbows when the Indians came, even firing the cannon. I wanted to let you know how ungratefully I have been treated because recently most of the land was distributed among the Spaniards here, and I was left out without being given the service of a single Indian.&rdquo;
</blockquote>
`;

const acueraExcerpt = `
<p><em>Account of the Acuera chief's response to Hernando de Soto, 1539</em></p>
<blockquote>
  &ldquo;I already know very well what your customs and behavior are like. To me you are professional vagabonds who wander from place to place, gaining your livelihood by robbing, sacking, and murdering people who have given you no offense. I want no friendship with people such as you, but instead prefer mortal and perpetual hostility. I am king in my land, and it is unnecessary for me to become the subject of a person who has no more subjects than I. All of you should go away as quickly as you can if you do not want to perish at my hands.&rdquo;
</blockquote>
`;

export const unit1TopicQuestions: TopicQuestionBank = {
  "1.1": [
    {
      id: "1-1-q1",
      prompt:
        "According to the excerpt, how did new crops from the Americas affect European economies in the sixteenth century?",
      stimulus: benderAtlanticExcerpt,
      options: [
        { id: "A", text: "They remained luxury goods with limited consumption." },
        { id: "B", text: "They required minimal labor to produce." },
        { id: "C", text: "They stimulated economic growth throughout Europe." },
        { id: "D", text: "They immediately replaced all traditional European crops." },
      ],
      correctOptionId: "C",
      explanation:
        "Bender describes how Atlantic plantation crops such as sugar, tobacco, and coffee enriched investors and states, fueling broader European development.",
      source: "Thomas Bender, A Nation Among Nations (2006)",
    },
    {
      id: "1-1-q2",
      prompt: "What overall argument does the excerpt make about the Atlantic economy?",
      stimulus: benderAtlanticExcerpt,
      options: [
        { id: "A", text: "It eliminated imperial rivalries in Europe." },
        {
          id: "B",
          text: "It produced long-term economic shifts across Europe, Africa, and the Americas.",
        },
        { id: "C", text: "It ensured the survival of feudal systems in Europe." },
        { id: "D", text: "It led to the collapse of European empires by 1700." },
      ],
      correctOptionId: "B",
      explanation:
        "Bender highlights the profound consequences of Atlantic trade for European wealth, African population loss, and American plantation societies.",
      source: "Thomas Bender, A Nation Among Nations (2006)",
    },
    {
      id: "1-1-q3",
      prompt:
        "Which development in the excerpt best illustrates how Europeans adapted to new Atlantic interactions?",
      stimulus: benderAtlanticExcerpt,
      options: [
        { id: "A", text: "The continued dominance of Asian merchants in Atlantic trade" },
        { id: "B", text: "European investors devising new methods of trade and profit-making" },
        { id: "C", text: "African kingdoms importing most plantation products" },
        { id: "D", text: "Native Americans amassing wealth from European demand" },
      ],
      correctOptionId: "B",
      explanation:
        "By emphasizing capital accumulation and naval expansion, the excerpt shows Europeans reshaping trade and finance to profit from the Atlantic system.",
      source: "Thomas Bender, A Nation Among Nations (2006)",
    },
  ],
  "1.2": [
    {
      id: "1-2-q1",
      prompt:
        "Which factor most directly supported the commercial networks described in the third paragraph of the excerpt?",
      stimulus: richterNativeExcerpt,
      options: [
        { id: "A", text: "The spread of maize cultivation northward" },
        { id: "B", text: "Native construction of paved road systems" },
        { id: "C", text: "The emergence of Native American empires modeled on Europe" },
        { id: "D", text: "The introduction of metal tools into Native religions" },
      ],
      correctOptionId: "A",
      explanation:
        "Maize agriculture sustained population growth and surplus production, reinforcing longstanding trade networks across the continent.",
      source: "Daniel K. Richter, Facing East from Indian Country (2001)",
    },
    {
      id: "1-2-q2",
      prompt:
        "The first paragraph of the excerpt best illustrates which characteristic of pre-contact Native American societies?",
      stimulus: richterNativeExcerpt,
      options: [
        {
          id: "A",
          text: "Agricultural surpluses encouraged socially stratified urban centers.",
        },
        { id: "B", text: "Arid climates forced reliance on irrigation in the Mississippi valley." },
        { id: "C", text: "North American climates discouraged the growth of large settlements." },
        { id: "D", text: "Nomadic hunters used military power to conquer urban populations." },
      ],
      correctOptionId: "A",
      explanation:
        "Richter describes mound-building chiefdoms supported by agricultural hamlets, showing how intensive farming underpinned complex societies.",
      source: "Daniel K. Richter, Facing East from Indian Country (2001)",
    },
    {
      id: "1-2-q3",
      prompt:
        "Which statement best describes the economic system that sustained the villages discussed in the second paragraph?",
      stimulus: richterNativeExcerpt,
      options: [
        { id: "A", text: "Mobility based on seasonal hunting" },
        { id: "B", text: "Settled subsistence agriculture" },
        { id: "C", text: "Export-oriented manufacturing" },
        { id: "D", text: "Colonization of distant territories" },
      ],
      correctOptionId: "B",
      explanation:
        "Villages of 500 to 2,000 people typically relied on local food production, reflecting widespread subsistence farming and trade for select goods.",
      source: "Daniel K. Richter, Facing East from Indian Country (2001)",
    },
  ],
  "1.3": [
    {
      id: "1-3-q1",
      prompt:
        "According to the letter from officials in Vera Cruz, why did Cort&eacute;s and his followers choose to found a town in Mexico rather than return to Cuba?",
      stimulus: veraCruzLetterExcerpt,
      options: [
        {
          id: "A",
          text: "They believed establishing a settlement would better secure wealth and territory for the Spanish crown.",
        },
        { id: "B", text: "They hoped to avoid conflict with local Native communities." },
        { id: "C", text: "They were ordered by Governor Vel&aacute;zquez to ignore potential gold." },
        { id: "D", text: "They sought to establish an independent republic separate from Spain." },
      ],
      correctOptionId: "A",
      explanation:
        "The authors argue that founding Vera Cruz served royal interests more effectively than limited trading, highlighting conquistador ambitions for land and riches.",
      source: "Letter from Villa Rica de la Vera Cruz, 1519",
    },
    {
      id: "1-3-q2",
      prompt:
        "Which broader historical development is best illustrated by the actions described in the excerpt?",
      stimulus: veraCruzLetterExcerpt,
      options: [
        { id: "A", text: "Spanish colonizers sought new American sources of wealth and power." },
        { id: "B", text: "Spanish officials prioritized peaceful trade over colonization." },
        { id: "C", text: "Spanish explorers focused on spreading representative democracy." },
        { id: "D", text: "Spanish expeditions rejected alliance-building with Native groups." },
      ],
      correctOptionId: "A",
      explanation:
        "Cort&eacute;s's companions emphasize gold, settlement, and royal expansion, reflecting the drive for conquest and extraction throughout Spanish America.",
      source: "Letter from Villa Rica de la Vera Cruz, 1519",
    },
  ],
  "1.4": [
    {
      id: "1-4-q1",
      prompt:
        "What development most directly resulted from the plantation work depicted in the engraving?",
      stimulus: caribbeanSugarEngraving,
      options: [
        { id: "A", text: "The large-scale importation of enslaved Africans to Caribbean colonies" },
        { id: "B", text: "Expanded use of indentured European servants in Spanish America" },
        { id: "C", text: "Spanish settlement of the North American seaboard" },
        { id: "D", text: "Rapid missionary expansion into mainland North America" },
      ],
      correctOptionId: "A",
      explanation:
        "Sugar cultivation created intense labor demands that Spaniards met by transporting enslaved Africans to Caribbean plantations.",
      source: "Theodor de Bry, sugar production engraving (1595)",
    },
    {
      id: "1-4-q2",
      prompt: "Which factor most directly contributed to the economic activity shown in the image?",
      stimulus: caribbeanSugarEngraving,
      options: [
        { id: "A", text: "Rising European naval supremacy in the Caribbean" },
        { id: "B", text: "The search for new sources of wealth in the Americas" },
        { id: "C", text: "Reliance on North American food imports" },
        { id: "D", text: "The spread of Native American diseases to enslaved laborers" },
      ],
      correctOptionId: "B",
      explanation:
        "The promise of cash crops such as sugar drove Iberian powers to establish plantations across the Caribbean basin.",
      source: "Theodor de Bry, sugar production engraving (1595)",
    },
    {
      id: "1-4-q3",
      prompt: "Economic changes like those depicted in the engraving most directly advanced which outcome?",
      stimulus: caribbeanSugarEngraving,
      options: [
        { id: "A", text: "Spain's conquest of the European continent" },
        { id: "B", text: "The expansion of Spanish influence throughout the Western Hemisphere" },
        { id: "C", text: "The replacement of capitalism by feudalism in Europe" },
        { id: "D", text: "Funding for Columbus's initial voyages" },
      ],
      correctOptionId: "B",
      explanation:
        "Profits from sugar and other colonial exports financed Spanish exploration, settlement, and military ventures across the Americas.",
      source: "Theodor de Bry, sugar production engraving (1595)",
    },
  ],
  "1.5": [
    {
      id: "1-5-q1",
      prompt:
        "What was a shared result of both the encomienda system and African slavery in the Spanish colonies?",
      options: [
        {
          id: "A",
          text: "Creation of a race-based caste hierarchy distinguishing Europeans, Africans, Natives, and people of mixed ancestry",
        },
        { id: "B", text: "Elimination of racial distinctions in colonial society" },
        { id: "C", text: "Equal legal status for all colonial laborers" },
        { id: "D", text: "Replacement of colonial governments with Native leadership" },
      ],
      correctOptionId: "A",
      explanation:
        "Forced-labor systems encouraged Spaniards to define status by ancestry, producing the casta hierarchy that ranked colonial subjects.",
    },
    {
      id: "1-5-q2",
      prompt:
        "Which key difference distinguished the encomienda system from African slavery in the Spanish colonies?",
      options: [
        { id: "A", text: "Encomiendas were restricted to plantation agriculture." },
        { id: "B", text: "Encomiendas relied primarily on imported European laborers." },
        {
          id: "C",
          text: "Encomiendas exploited Native American labor, whereas slavery increasingly relied on enslaved Africans.",
        },
        { id: "D", text: "Encomienda laborers received wages while enslaved laborers did not." },
      ],
      correctOptionId: "C",
      explanation:
        "Encomiendas extracted tribute and labor from Native communities, while transatlantic slavery supplied African labor to mines and plantations.",
    },
    {
      id: "1-5-q3",
      prompt: "Which similarity existed between the encomienda system and African slavery?",
      options: [
        {
          id: "A",
          text: "Both were used to supply labor in Spanish American plantations as well as in mining operations.",
        },
        { id: "B", text: "Both relied on Spanish partnerships with West African states." },
        { id: "C", text: "Both guaranteed spiritual and material protection for laborers." },
        { id: "D", text: "Both prohibited the use of Native American labor." },
      ],
      correctOptionId: "A",
      explanation:
        "Spanish colonizers deployed each system across multiple economic sectors, from silver mines in Mexico and Peru to sugar estates in the Caribbean.",
    },
    {
      id: "1-5-q4",
      prompt: "Which claim does King Afonso make in his letter to the Portuguese monarch?",
      stimulus: kongoLetterExcerpt,
      options: [
        {
          id: "A",
          text: "Portuguese merchants were undermining Kongo's stability by illegally seizing people to sell into slavery.",
        },
        { id: "B", text: "Portuguese officials were abolishing the transatlantic slave trade." },
        { id: "C", text: "European goods had little appeal within the Kongo kingdom." },
        { id: "D", text: "Portuguese traders refused to cooperate with African elites." },
      ],
      correctOptionId: "A",
      explanation:
        "Afonso complains that Portuguese merchants ignore royal restrictions, kidnap Kongo subjects, and depopulate his realm.",
      source: "Letter from King Nzinga Mbemba of Kongo, 1526",
    },
    {
      id: "1-5-q5",
      prompt:
        "Which broader historical development is best illustrated by the concerns expressed in the Kongo letter?",
      stimulus: kongoLetterExcerpt,
      options: [
        {
          id: "A",
          text: "European merchants collaborated with African intermediaries to acquire captive labor for Atlantic plantations.",
        },
        { id: "B", text: "European powers completely rejected African involvement in trade." },
        { id: "C", text: "African states successfully halted all European commerce." },
        { id: "D", text: "The Portuguese outlawed the sale of enslaved people." },
      ],
      correctOptionId: "A",
      explanation:
        "Afonso's protest highlights how Atlantic commerce depended on African leaders and merchants who supplied captives to European traders.",
      source: "Letter from King Nzinga Mbemba of Kongo, 1526",
    },
    {
      id: "1-5-q6",
      prompt: "Which evidence from Las Casas's treatise supports his claim that Native societies were civilized?",
      stimulus: lasCasasExcerpt,
      options: [
        {
          id: "A",
          text: "Native peoples lacked laws and written language, proving their inferiority to Europeans.",
        },
        {
          id: "B",
          text: "Native peoples eagerly sought Spanish rule to end constant warfare between their nations.",
        },
        {
          id: "C",
          text: "Native peoples rejected any form of urban settlement and remained nomadic hunters.",
        },
        {
          id: "D",
          text: "Native peoples had established laws, cities, and political institutions that rivaled those of Europe.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "Las Casas argues that Native Americans maintained organized governments and populous cities, demonstrating their capacity for self-rule.",
      source: "Bartolom&eacute; de Las Casas, In Defense of the Indians (c. 1550)",
    },
    {
      id: "1-5-q7",
      prompt: "Which statement best captures Las Casas's evidence in the third paragraph of the excerpt?",
      stimulus: lasCasasExcerpt,
      options: [
        { id: "A", text: "Native peoples rejected Christianity outright." },
        { id: "B", text: "Native peoples developed large urban centers with sophisticated governance." },
        { id: "C", text: "Native peoples refused to engage in trade with Europeans." },
        { id: "D", text: "Native peoples knew little of European societies before conquest." },
      ],
      correctOptionId: "B",
      explanation:
        "He emphasizes their populous cities, laws, and customs to argue they were fully capable of governing themselves.",
      source: "Bartolom&eacute; de Las Casas, In Defense of the Indians (c. 1550)",
    },
    {
      id: "1-5-q8",
      prompt:
        "How does Las Casas use the concept of 'barbarian' in the first two paragraphs to support his argument?",
      stimulus: lasCasasExcerpt,
      options: [
        { id: "A", text: "He argues that Spaniards, not Native Americans, were the true barbarians." },
        { id: "B", text: "He contends that Native Americans did not fit the definition of barbarian and thus deserved self-rule." },
        { id: "C", text: "He insists that other European powers were more barbaric than Spain." },
        { id: "D", text: "He quotes Native Americans calling the Spanish barbarians." },
      ],
      correctOptionId: "B",
      explanation:
        "Las Casas redefines 'barbarian' to show that Native peoples possessed orderly governments, undermining justifications for their enslavement.",
      source: "Bartolom&eacute; de Las Casas, In Defense of the Indians (c. 1550)",
    },
  ],
  "1.6": [
    {
      id: "1-6-q1",
      prompt:
        "Which effect of early European colonization between 1492 and 1607 most immediately transformed Native American societies?",
      options: [
        { id: "A", text: "The rapid spread of Eurasian diseases such as smallpox" },
        { id: "B", text: "The introduction of the horse to the Great Plains" },
        { id: "C", text: "Widespread adoption of Christianity by Native peoples" },
        { id: "D", text: "The formation of English joint-stock companies" },
      ],
      correctOptionId: "A",
      explanation:
        "Epidemic disease decimated Native populations and destabilized societies more quickly than other consequences of European settlement.",
    },
    {
      id: "1-6-q2",
      prompt:
        "Which factor most significantly contributed to the large populations described in pre-Columbian Mexico?",
      stimulus: kuppermanExcerpt,
      options: [
        { id: "A", text: "Seasonal migration in pursuit of fertile lands" },
        { id: "B", text: "Trade and settlement patterns sustained by maize cultivation" },
        { id: "C", text: "Exposure to European diseases that lowered mortality" },
        { id: "D", text: "Internal political conflicts that created instability" },
      ],
      correctOptionId: "B",
      explanation:
        "Maize-based agriculture supported dense urban populations such as Tenochtitl&aacute;n by providing dependable food surpluses and trade goods.",
      source: "Karen Ordahl Kupperman, The Atlantic in World History (2012)",
    },
    {
      id: "1-6-q3",
      prompt: "Which statement best characterizes the Mississippian societies in the excerpt?",
      stimulus: kuppermanExcerpt,
      options: [
        {
          id: "A",
          text: "They relied on mixed agriculture and hunting that enabled permanent villages and ceremonial centers.",
        },
        { id: "B", text: "They were nomadic groups who only used rivers to travel seasonally." },
        { id: "C", text: "They lived in isolated camps that left little evidence after abandonment." },
        { id: "D", text: "They depended on large-scale irrigation systems to sustain growth." },
      ],
      correctOptionId: "A",
      explanation:
        "Mississippian peoples built mound centers like Cahokia that were supported by surrounding agricultural villages and riverine trade.",
      source: "Karen Ordahl Kupperman, The Atlantic in World History (2012)",
    },
    {
      id: "1-6-q4",
      prompt:
        "Which factor most directly contributed to the advanced development of both societies described by Kupperman?",
      stimulus: kuppermanExcerpt,
      options: [
        { id: "A", text: "Superior military forces compared to all neighboring societies" },
        { id: "B", text: "Exclusive access to oceanic trade routes" },
        {
          id: "C",
          text: "Successful adaptation to their environments to secure food, resources, and trade",
        },
        { id: "D", text: "Inheritance systems that tied political power to spirituality" },
      ],
      correctOptionId: "C",
      explanation:
        "Both the Aztecs and Mississippians capitalized on fertile lands and waterways, allowing them to support large populations and elaborate trade networks.",
      source: "Karen Ordahl Kupperman, The Atlantic in World History (2012)",
    },
    {
      id: "1-6-q5",
      prompt:
        "Which development of the late 1400s and early 1500s is highlighted in Crosby's discussion?",
      stimulus: crosbyExcerpt,
      options: [
        { id: "A", text: "Native Americans adapted to diverse environments to form complex societies." },
        { id: "B", text: "Native alliances with Europeans enabled the conquest of rival powers." },
        { id: "C", text: "Religious dissenters from Europe established separatist colonies." },
        { id: "D", text: "Europeans sailed across the Atlantic seeking new sources of wealth." },
      ],
      correctOptionId: "D",
      explanation:
        "Crosby frames disease transmission in the context of early voyages like those of Columbus, part of Europe's quest for riches and empire.",
      source: "Alfred W. Crosby, Ecological Imperialism (1986)",
    },
    {
      id: "1-6-q6",
      prompt:
        "What claim does Crosby make about the spread of Old World diseases to the Americas?",
      stimulus: crosbyExcerpt,
      options: [
        { id: "A", text: "It had minimal consequences for Native Americans." },
        { id: "B", text: "It was an unintended outcome of transatlantic contact." },
        { id: "C", text: "It was widespread long before Columbus's arrival." },
        { id: "D", text: "It represented a deliberate strategy by Columbus." },
      ],
      correctOptionId: "B",
      explanation:
        "He notes that Europeans did not intentionally kill the Arawaks; rather, pathogens traveled with explorers and enslavers, devastating Native peoples.",
      source: "Alfred W. Crosby, Ecological Imperialism (1986)",
    },
    {
      id: "1-6-q7",
      prompt:
        "Which statement best summarizes Crosby's overall explanation for the population decline after 1492?",
      stimulus: crosbyExcerpt,
      options: [
        { id: "A", text: "Colonists overworked Native Americans to death in mineral extraction." },
        { id: "B", text: "Spanish monarchs forced mass migration of Native Americans to Spain." },
        { id: "C", text: "Native Americans lacked immunity to new pathogens introduced by Europeans." },
        { id: "D", text: "Columbus pursued a deliberate campaign of genocide." },
      ],
      correctOptionId: "C",
      explanation:
        "Crosby stresses susceptibility to Old World diseases as the principal driver of early catastrophic mortality among Native Americans.",
      source: "Alfred W. Crosby, Ecological Imperialism (1986)",
    },
    {
      id: "1-6-q8",
      prompt:
        "Which evidence does Crosby use to support his argument about demographic changes after contact?",
      stimulus: crosbyExcerpt,
      options: [
        { id: "A", text: "Spanish colonists deployed Native labor on encomiendas." },
        { id: "B", text: "Columbus trained Native interpreters for his voyages." },
        {
          id: "C",
          text: "Arawak captives transported to Europe experienced exceedingly high mortality rates.",
        },
        { id: "D", text: "Native American diseases spread widely in Europe." },
      ],
      correctOptionId: "C",
      explanation:
        "Crosby emphasizes how Native captives taken to Spain died quickly, illustrating their vulnerability to unfamiliar germs.",
      source: "Alfred W. Crosby, Ecological Imperialism (1986)",
    },
    {
      id: "1-6-q9",
      prompt:
        "How did the Spanish impose racial hierarchies in their American colonies during the 1500s and 1600s?",
      options: [
        { id: "A", text: "They elevated supportive Native allies to the same status as Spaniards." },
        {
          id: "B",
          text: "They developed a casta system that categorized Europeans, Natives, Africans, and people of mixed ancestry.",
        },
        { id: "C", text: "They excluded enslaved Africans from their colonies." },
        { id: "D", text: "They banned interracial marriage to preserve a racially pure elite." },
      ],
      correctOptionId: "B",
      explanation:
        "Spanish colonial society formalized racial distinctions through the casta system, which ranked individuals based on heritage.",
    },
    {
      id: "1-6-q10",
      prompt:
        "What key difference separated the encomienda system from the Spanish caste system?",
      options: [
        {
          id: "A",
          text: "The encomienda system privileged Spaniards, whereas the caste system empowered Indigenous leaders.",
        },
        {
          id: "B",
          text: "The encomienda system derived authority from the Catholic Church, while the caste system opposed it.",
        },
        {
          id: "C",
          text: "The encomienda system assumed social equality, whereas the caste system enforced inequality.",
        },
        {
          id: "D",
          text: "The encomienda system focused on extracting Native labor, whereas the caste system categorized a racially mixed population.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "Encomiendas compelled Indigenous labor and tribute, while the caste system was a social classification structure reflecting racial mixing.",
    },
    {
      id: "1-6-q11",
      prompt:
        "How did Spanish colonial economies in the 1500s and 1600s differ from domestic European economies?",
      options: [
        { id: "A", text: "Most colonies relied solely on subsistence agriculture." },
        { id: "B", text: "French colonists avoided commerce such as the fur trade." },
        { id: "C", text: "Spanish colonists rejected enslaved African labor on plantations." },
        {
          id: "D",
          text: "Colonial economic activity operated within strict mercantilist regulations imposed by imperial authorities.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "In contrast to more mixed European economies, colonial production was shaped by mercantilist policies designed to benefit the metropole.",
    },
    {
      id: "1-6-q12",
      prompt:
        "Short Answer Practice: Using the excerpt from Isabel de Guevara, respond to parts (a) and (b).\n(a) Briefly describe one claim Guevara makes about the role of women in the colony.\n(b) Briefly describe one historical development illustrated by the excerpt.",
      stimulus: guevaraExcerpt,
      options: [{ id: "A", text: "Write your response in your notes or practice journal." }],
      correctOptionId: "A",
      explanation:
        "Possible claims include women performing critical military and domestic labor during crises. Relevant developments involve encomienda grants, gendered labor expectations, and hardships in early Spanish colonies.",
    },
    {
      id: "1-6-q13",
      prompt:
        "Short Answer Practice: Using the excerpt from the Acuera chief, respond to parts (a) and (b).\n(a) Briefly describe one claim the Acuera leader makes about the Spanish.\n(b) Briefly describe one historical development illustrated by the excerpt.",
      stimulus: acueraExcerpt,
      options: [{ id: "A", text: "Write your response in your notes or practice journal." }],
      correctOptionId: "A",
      explanation:
        "The chief depicts Spaniards as violent invaders and asserts Indigenous sovereignty. The excerpt reflects Native resistance to Spanish conquest in Florida and broader patterns of Indigenous opposition.",
    },
  ],
};
