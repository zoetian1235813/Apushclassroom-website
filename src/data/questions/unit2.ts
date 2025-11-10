import { TopicQuestionBank } from "../../types/questions";

const whitefieldExcerpt = `Nathan Cole, a Connecticut farmer, recalled racing to hear itinerant preacher George Whitefield in 1740. He described thousands gathered to listen and admitted that hearing Whitefield convinced him his own righteousness could not save him.`;

const ateawantoSpeech = `Ateawanto, an Abenaki leader, told an English representative in 1752 that his people desired peace but would not cede any more land. He stressed their alliance with the French king, who had offered them faith and assistance.`;

const baconDeclaration = `In 1676 Nathaniel Bacon issued a “Declaration in the Name of the People,” accusing Governor William Berkeley of unjust taxation, monopolizing the beaver trade, and protecting hostile Native groups instead of frontier settlers.`;

const landsmanExcerpt = `Historian Ned C. Landsman argues that although the Middle Colonies contained subregions anchored by New York and Philadelphia, shared geography and a common history of managing ethnic and religious diversity bound the region together.`;

const hughJonesExcerpt = `In 1724 Anglican minister Hugh Jones observed that most laborers in Virginia were enslaved Africans whose status passed from mothers to children, while relatively few English servants worked alongside them.`;

const coldensReport = `In 1724 Cadwallader Colden warned that French missionaries and traders were winning Native American allies and threatening to surround British settlements, urging stronger British involvement in the fur trade.`;

const exportsTable = {
  caption: "Value of Selected Goods Exported to British North America from England (in £)",
  headers: ["Good", "1699", "1749"],
  rows: [
    ["Wool textiles", "95,200", "359,700"],
    ["Linen textiles", "11,300", "115,600"],
    ["Leather", "14,200", "12,100"],
    ["Iron", "25,300", "110,000"],
    ["Other manufactures", "79,500", "125,400"],
    ["Cheese and foodstuffs", "2,300", "5,400"],
  ],
};

export const unit2TopicQuestions: TopicQuestionBank = {
  "2.1": [
    {
      id: "2-1-q1",
      prompt: "Which of the following explains the most likely reason why English colonists wanted to come to North America?",
      options: [
        { id: "A", text: "To put distance between themselves and the English monarchy" },
        { id: "B", text: "To exercise their strong belief in natural rights and liberty for all" },
        { id: "C", text: "To seek economic opportunity and improved living conditions" },
        { id: "D", text: "To form alliances with French and Dutch settlers already present" },
      ],
      correctOptionId: "C",
      explanation:
        "Social mobility, land ownership, and other economic opportunities were the primary motivations for most English migrants.",
    },
  ],
  "2.2": [
    {
      id: "2-2-q1",
      stimulusTable: exportsTable,
      prompt: "The table most directly suggests which of the following developments by 1749?",
      options: [
        { id: "A", text: "Native Americans refused to purchase British goods in order to achieve self-sufficiency." },
        { id: "B", text: "Plantation owners began to rely on indentured servants to produce valuable cash crops." },
        { id: "C", text: "Colonists became increasingly vulnerable to the transmission of epidemic diseases such as smallpox." },
        { id: "D", text: "The British established increasingly extensive trade networks to provide goods to its colonies." },
      ],
      correctOptionId: "D",
      explanation:
        "The rapid growth in exported manufactured goods shows Britain expanding its Atlantic trade network to meet colonial demand.",
    },
    {
      id: "2-2-q2",
      stimulusTable: exportsTable,
      prompt: "The trend depicted in the table most directly contributed to which of the following developments in British North America?",
      options: [
        { id: "A", text: "Disagreement over the enforcement of mercantilist restrictions" },
        { id: "B", text: "Debates regarding the enactment of religious toleration in some colonies" },
        { id: "C", text: "Discussions about whether colonists believed themselves to be British subjects" },
        { id: "D", text: "Conflict over whether to allow slavery in the northern colonies" },
      ],
      correctOptionId: "A",
      explanation:
        "Reliance on British imports encouraged many colonists to resist strict mercantilist rules, prompting smuggling and disputes over enforcement.",
    },
    {
      id: "2-2-q3",
      stimulusTable: exportsTable,
      prompt: "Which of the following describes a trend in exports from England to British North America between 1699 and 1749 indicated in the table?",
      options: [
        { id: "A", text: "British colonists began to export manufactured goods to compete with England." },
        { id: "B", text: "England exported more leather to British North America in 1749 than in 1699." },
        { id: "C", text: "Demand in the colonies for manufactured goods from England greatly increased." },
        { id: "D", text: "France increased its imports from the colonies in order to undermine English influence." },
      ],
      correctOptionId: "C",
      explanation:
        "Manufactured exports such as textiles and iron rose sharply, demonstrating the colonies’ growing appetite for English goods.",
    },
  ],
  "2.3": [
    {
      id: "2-3-q1",
      stimulus: landsmanExcerpt,
      prompt: "Which of the following best describes Landsman’s argument in the last paragraph of the excerpt?",
      options: [
        { id: "A", text: "English conquests in the Middle Colonies were harsher than the conquests of other European empires in the Americas." },
        { id: "B", text: "Toleration of religious diversity in the Middle Colonies was made a necessity because of patterns of migration." },
        { id: "C", text: "The spread of Enlightenment values was the main reason that pluralism developed in the Middle Colonies." },
        { id: "D", text: "The French colonies in North America and the Middle Colonies had very similar settler populations." },
      ],
      correctOptionId: "B",
      explanation:
        "Landsman argues that because diverse European Protestants settled in the region, toleration became a practical necessity rather than pure benevolence.",
    },
    {
      id: "2-3-q2",
      stimulus: landsmanExcerpt,
      prompt: "Which of the following describes Landsman’s overall argument in the excerpt?",
      options: [
        { id: "A", text: "The Middle Colonies differed from French colonies because they depended on Native American commerce." },
        { id: "B", text: "The Middle Colonies were similar to each other because they developed plantation agriculture." },
        { id: "C", text: "The Middle Colonies were more different from each other than the English colonies in other regions." },
        { id: "D", text: "The Middle Colonies faced similar challenges in governing diverse colonists after they became English." },
      ],
      correctOptionId: "D",
      explanation:
        "He emphasizes that despite distinct economies centered on New York and Philadelphia, each colony contended with governing a diverse population.",
    },
    {
      id: "2-3-q3",
      stimulus: landsmanExcerpt,
      prompt: "Landsman claims that some historians might not consider the Middle Colonies a single British colonial region because the Middle Colonies",
      options: [
        { id: "A", text: "contained multiple inland waterways for commerce" },
        { id: "B", text: "were settled by ethnically diverse groups of Europeans" },
        { id: "C", text: "received European immigrants who practiced a variety of religions" },
        { id: "D", text: "had different local economies focused on Philadelphia and New York City" },
      ],
      correctOptionId: "D",
      explanation:
        "Distinct economic subregions tied to separate urban hubs cause some historians to question treating the Middle Colonies as one unit.",
    },
  ],
  "2.4": [
    {
      id: "2-4-q1",
      prompt: "The expansion of European settlement in the Americas most directly led to which of the following developments?",
      options: [
        { id: "A", text: "The spread of religious tolerance throughout most of the European colonies in the Americas" },
        { id: "B", text: "The growing separation between the colonial economies and the economies of their mother countries" },
        { id: "C", text: "The use of enslaved Native Americans and Africans to meet the labor demands of colonial agricultural production" },
        { id: "D", text: "The declining competition among the major European powers over their colonial holdings" },
      ],
      correctOptionId: "C",
      explanation:
        "Colonial agriculture created enormous labor demands, prompting colonists to enslave Native peoples and import Africans on a large scale.",
    },
  ],
  "2.5": [
    {
      id: "2-5-q1",
      stimulus: whitefieldExcerpt,
      prompt: "The events described in the excerpt resulted in which of the following developments in the British North American colonies?",
      options: [
        { id: "A", text: "Protestant evangelicalism furthered the Anglicization of the colonies." },
        { id: "B", text: "Colonial assemblies attempted to assert more independence from Britain." },
        { id: "C", text: "Religious leaders in New England expanded support for the abolitionist movement." },
        { id: "D", text: "Britain enacted mercantilist policies to protect its economy from competition." },
      ],
      correctOptionId: "A",
      explanation:
        "The First Great Awakening spread Protestant evangelicalism from Britain to the colonies, reinforcing cultural and religious ties to the mother country.",
    },
    {
      id: "2-5-q2",
      stimulus: whitefieldExcerpt,
      prompt: "The events described in the excerpt most directly reflected which of the following developments?",
      options: [
        { id: "A", text: "The exchange of Enlightenment ideas between Europe and the Americas" },
        { id: "B", text: "Concerns about political corruption among colonial officials" },
        { id: "C", text: "The spread of the First Great Awakening from Britain to North America" },
        { id: "D", text: "Efforts across New England to convert Native Americans" },
      ],
      correctOptionId: "C",
      explanation:
        "George Whitefield’s itinerant preaching was central to the First Great Awakening, a transatlantic religious revival.",
    },
    {
      id: "2-5-q3",
      stimulus: whitefieldExcerpt,
      prompt: "Which of the following most directly contributed to the ideas described in the excerpt?",
      options: [
        { id: "A", text: "The increasing social mobility of colonists encouraged the promotion of religious revivals emphasizing hierarchy and authority." },
        { id: "B", text: "The widespread production of cash crops contributed to increasing prosperity throughout the colonies." },
        { id: "C", text: "The large number of enslaved people in the colonies expanded the influence of non-European cultural traditions." },
        { id: "D", text: "The British colonies became part of a trans-Atlantic print culture that facilitated the spread of European ideas." },
      ],
      correctOptionId: "D",
      explanation:
        "Print networks—sermons, pamphlets, and newspapers—carried news of Whitefield’s preaching across the Atlantic world.",
    },
  ],
  "2.6": [
    {
      id: "2-6-q1",
      stimulus: ateawantoSpeech,
      prompt: "Which of the following groups would have most opposed the goals of the speech?",
      options: [
        { id: "A", text: "British settlers" },
        { id: "B", text: "French fur traders" },
        { id: "C", text: "The king of France" },
        { id: "D", text: "Religious missionaries" },
      ],
      correctOptionId: "A",
      explanation:
        "British settlers desired additional land, directly conflicting with the Abenaki refusal to cede territory.",
    },
    {
      id: "2-6-q2",
      stimulus: ateawantoSpeech,
      prompt: "Which of the following was a main purpose of Ateawanto in his speech?",
      options: [
        { id: "A", text: "To establish commerce between his people and the English" },
        { id: "B", text: "To form an alliance between his people and the French" },
        { id: "C", text: "To seek his people’s freedom from French oppression" },
        { id: "D", text: "To protect his people’s land from English colonizers" },
      ],
      correctOptionId: "D",
      explanation:
        "He insisted the Abenaki would defend their land and not sell additional territory to English colonists.",
    },
    {
      id: "2-6-q3",
      stimulus: ateawantoSpeech,
      prompt: "The speech in the excerpt was delivered in which of the following historical situations during the mid-1700s?",
      options: [
        { id: "A", text: "The use of Native American laborers in plantation agriculture" },
        { id: "B", text: "The attempts by French settlers to acquire Native American land" },
        { id: "C", text: "Competition between European empires for Native American allies" },
        { id: "D", text: "The founding of the first British colonies in Native American territory" },
      ],
      correctOptionId: "C",
      explanation:
        "Ateawanto highlighted the Abenaki alliance with France to counter English expansion, reflecting imperial rivalry for Native allies.",
    },
    {
      id: "2-6-q4",
      prompt: "Which of the following best explains why some European colonists intermarried with Native Americans?",
      options: [
        { id: "A", text: "To create economic and diplomatic relationships between Europeans and Native Americans" },
        { id: "B", text: "To ensure that specific European countries could establish claims to land in North America" },
        { id: "C", text: "To prevent the enslavement of certain groups of Native Americans considered allies" },
        { id: "D", text: "To establish a new culture that synthesized European and Native American elements" },
      ],
      correctOptionId: "A",
      explanation:
        "French and Dutch traders often married into Native communities to strengthen trade and diplomatic alliances.",
    },
    {
      id: "2-6-saq",
      stimulus: coldensReport,
      prompt:
        "Using the excerpt, answer (a) identify one historical situation in which it was produced, (b) describe one cause of the development described, and (c) describe one argument Colden makes.",
      options: [{ id: "FRQ", text: "自由作答" }],
      correctOptionId: "FRQ",
      explanation:
        "示例要点： (a) 英国与法国为争夺北美西部的贸易与领土而激烈竞争；(b) 欧洲殖民者希望通过毛皮贸易获得经济收益；(c) Colden 主张英国必须加大与印第安人的贸易与外交，防止被法国包围。",
      source: "Cadwallader Colden, 1724",
    },
  ],
  "2.7": [
    {
      id: "2-7-q1",
      stimulus: hughJonesExcerpt,
      prompt: "The labor system described in the first paragraph of the excerpt was most similar to the labor system used for",
      options: [
        { id: "A", text: "Mining in New Spain" },
        { id: "B", text: "Whaling in New England" },
        { id: "C", text: "Acquiring furs in New France" },
        { id: "D", text: "Producing sugar in the Caribbean" },
      ],
      correctOptionId: "D",
      explanation:
        "Both Virginia plantations and Caribbean sugar estates relied on hereditary chattel slavery to sustain profitable cash crops.",
    },
    {
      id: "2-7-q2",
      stimulus: hughJonesExcerpt,
      prompt: "The development described in the excerpt represented which of the following long-term trends in Virginia?",
      options: [
        { id: "A", text: "The hardening of racial divisions" },
        { id: "B", text: "The oversupply of indentured laborers" },
        { id: "C", text: "The dominance of subsistence farming" },
        { id: "D", text: "The Anglicization of colonial culture" },
      ],
      correctOptionId: "A",
      explanation:
        "Jones emphasized that enslaved status was hereditary and race-based, entrenching racial divisions within Virginia society.",
    },
    {
      id: "2-7-q3",
      stimulus: hughJonesExcerpt,
      prompt: "The economy of the Middle Colonies differed from the economy of Virginia described in the excerpt in that the Middle Colonies more often",
      options: [
        { id: "A", text: "Relied on enslaved labor in cities" },
        { id: "B", text: "Imported enslaved Africans" },
        { id: "C", text: "Engaged in trans-Atlantic commerce" },
        { id: "D", text: "Purchased land from Native Americans" },
      ],
      correctOptionId: "A",
      explanation:
        "Urban slavery in ports such as New York and Philadelphia was more common than in the largely rural Chesapeake plantation economy.",
    },
  ],
  "2.8": [
    {
      id: "2-8-saq",
      stimulus: baconDeclaration,
      prompt:
        "Using the excerpt, answer (a) briefly identify one cause of the development in the excerpt, (b) briefly describe one argument Bacon makes, and (c) briefly describe one similarity between the Native American actions mentioned here and Native actions in another colonial region.",
      options: [{ id: "FRQ", text: "自由作答" }],
      correctOptionId: "FRQ",
      explanation:
        "示例要点： (a) 西弗吉尼亚边疆殖民者在土地和防御方面与伯克利政府矛盾重重；(b) Bacon 指责伯克利滥税并庇护对边疆有威胁的印第安人与贸易；(c) 可类比梅塔科姆战争或普韦布洛起义等印第安人对殖民扩张的抵抗。",
      source: "Nathaniel Bacon, 1676",
    },
  ],
  "2.9": [],
};
