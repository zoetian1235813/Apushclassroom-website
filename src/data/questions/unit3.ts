import { TopicQuestionBank } from "../../types/questions";

const andersonExcerpt = `
<p><em>Fred Anderson, <cite>The War That Made America: A Short History of the French and Indian War</cite>, 2005</em></p>
<blockquote>
  <p>"Today, two hundred and fifty years after the French and Indian War, most Americans are no more familiar with its events and significance than they are with those of the Peloponnesian War. Few know that George Washington struck the first spark of a war that set the British North American frontier ablaze from the Carolinas to Nova Scotia, then spread to Europe, Canada, the Caribbean, West Africa, India, and, finally, the Philippines."</p>
  <p>"Historians call this immense conflict the Seven Years' War; Winston Churchill described it as 'the first world war.'"</p>
</blockquote>
`;

const otisExcerpt = `
<p><em>James Otis, <cite>The Rights of the British Colonies Asserted and Proved</cite>, 1764</em></p>
<blockquote>
  <p>"Every British Subject born on the continent of America is by the law of God and nature, by the common law, and by act of parliament, entitled to all the natural, essential, inherent and inseparable rights of our fellow subjects in Great Britain."</p>
  <p>"Taxes are not to be laid on the people, but by their consent in person, or by representatives."</p>
  <p>"The power of parliament is uncontrollable, and we must obey. Therefore let the parliament lay what burthens they please on us, we must, it is our duty to submit and patiently bear them till they afford us relief by repealing such acts, as through mistake, or other human infirmities, have been suffered to pass, if they can be convinced that their proceedings are not constitutional."</p>
</blockquote>
`;

const lockeExcerpt = `
<p><em>John Locke, <cite>Two Treatises of Government</cite>, 1689</em></p>
<blockquote>
  <p>"To understand political power right, and derive it from its original, we must consider what state all men are naturally in, and that is, a state of perfect freedom to order their actions, and dispose of their possessions and persons, as they think fit, within the bounds of the law of nature, without asking leave, or depending upon the will of any other man."</p>
  <p>"A state also of equality, wherein all the power and jurisdiction is reciprocal, no one having more than another."</p>
  <p>"The state of nature has a law of nature to govern it which obliges every one; being all equal and independent, no one ought to harm another in his life, health, liberty, or possessions."</p>
</blockquote>
`;

const massPetitionExcerpt = `
<p><em>Petition to the Massachusetts state legislature, 1777</em></p>
<blockquote>
  <p>"The petition of a great number of Blacks detained in a state of slavery in the bowels of a free and Christian country humbly showeth that your petitioners apprehend that they have in common with all other men a natural and inalienable right to that freedom which the Great Parent of the Universe hath bestowed equally on all mankind."</p>
  <p>"Your petitioners cannot but express their astonishment that it has never been considered that every principle from which America has acted in the course of their unhappy difficulties with Great Britain pleads stronger than a thousand arguments in favor of your petitioners."</p>
</blockquote>
`;

const woodExcerpt = `
<p><em>Gordon S. Wood, <cite>The Creation of the American Republic, 1776-1787</cite>, 1969</em></p>
<blockquote>
  <p>"The Declaration of Independence, drawn up by the Continental Congress, was actually a declaration by 'thirteen united States of America' proclaiming that as 'Free and Independent States they have full power to levy war, conclude peace, contract alliances, establish commerce, and to do all other acts and things which independent States may of right do.'"</p>
  <p>"The Articles of Confederation, for all the powers it theoretically gave to the Congress, did not in fact alter this independence. Congressional resolutions continued to be mere recommendations which the states were left to enforce."</p>
</blockquote>
`;

const hamiltonFederalist15Excerpt = `
<p><em>Alexander Hamilton, <cite>The Federalist</cite> number 15, 1787</em></p>
<blockquote>
  <p>"The United States [under the Articles of Confederation] has an indefinite discretion to make requisitions for men and money; but they have no authority to raise either, by regulations extending to the individual citizens of America. The consequence of this is, that though in theory their resolutions concerning those objects are laws, constitutionally binding on the members of the Union, yet in practice they are mere recommendations which the States observe or disregard at their option."</p>
  <p>"There is nothing absurd or impracticable in the idea of a league or alliance between independent nations for certain defined purposes. They were scarcely formed before they were broken, giving an instructive but afflicting lesson to mankind, how little dependence is to be placed on treaties which have no other sanction than the obligations of good faith."</p>
</blockquote>
`;

const dickinsonConventionExcerpt = `
<p><em>John Dickinson, remarks at the Constitutional Convention, summarized by James Madison, 1787</em></p>
<blockquote>
  <p>"The preservation of the states in a certain degree of agency is indispensable. It will produce that collision between the different authorities which should be wished for in order to check each other."</p>
  <p>"If the state governments were excluded from all agency in the national one, and all power drawn from the people at large, the consequence would be, that the national government would move in the same direction as the state governments now do, and would run into all the same mischiefs."</p>
</blockquote>
`;

const washingtonFarewellExcerpt = `
<p><em>George Washington, Farewell Address, 1796</em></p>
<blockquote>
  <p>"I have already intimated to you the danger of parties in the State, with particular reference to the founding of them on geographical discriminations. Let me now take a more comprehensive view, and warn you in the most solemn manner against the baneful effects of the spirit of party generally."</p>
  <p>"The great rule of conduct for us in regard to foreign nations is in extending our commercial relations, to have with them as little political connection as possible."</p>
</blockquote>
`;

const washingtonPrincetonPainting = `
<p><em>Charles Willson Peale, <cite>George Washington at the Battle of Princeton</cite>, 1779</em></p>
<p>Courtesy of the Yale University Art Gallery.</p>
`;

const southernStatePopulationTable = {
  caption:
    "<em>Southern State Populations, 1790 and 1800</em> &mdash; Source: United States Bureau of the Census, <cite>Historical Statistics of the United States, Colonial Times to 1970</cite> (1975)",
  headers: [
    "State",
    "Approximate Population in 1790",
    "Approximate Population in 1800",
    "Population Percent Increase, 1790 to 1800",
    "Percent White in 1800",
    "Percent African American in 1800",
  ],
  rows: [
    ["Georgia", "83,000", "163,000", "96%", "63%", "37%"],
    ["Kentucky", "74,000", "221,000", "199%", "81%", "19%"],
    ["Maryland", "320,000", "342,000", "7%", "63%", "37%"],
    ["North Carolina", "394,000", "478,000", "21%", "71%", "29%"],
    ["South Carolina", "249,000", "346,000", "39%", "57%", "43%"],
    ["Tennessee", "36,000", "106,000", "194%", "87%", "13%"],
    ["Virginia", "748,000", "885,000", "17%", "59%", "41%"],
  ],
};

const paineExcerpt = `
<p><em>Thomas Paine, <cite>Common Sense</cite>, 1776</em></p>
<blockquote>
  &ldquo;I have heard it asserted by some, that as America hath flourished under her former connection with Great Britain, that the same connection is necessary towards her future happiness, and will always have the same effect. Nothing can be more fallacious than this kind of argument. We may as well assert that because a child has thrived upon milk, that it is never to have meat, or that the first twenty years of our lives is to become a precedent for the next twenty. But even this is admitting more than is true, for I answer roundly, that America would have flourished as much, and probably much more, had no European power had any thing to do with her.<br /><br />
  &ldquo;But Britain is the parent country, say some. Then the more shame upon her conduct. Even brutes do not devour their young, nor savages make war upon their families. Europe, and not England, is the parent country of America. This new world hath been the asylum for the persecuted lovers of civil and religious liberty from every part of Europe. Hither have they fled, not from the tender embraces of the mother, but from the cruelty of the monster; and it is so far true of England, that the same tyranny which drove the first emigrants from home, pursues their descendants still.&rdquo;
</blockquote>
`;

const slaveTradeCaption = `
<p><em>Number of Enslaved Africans Brought to British North America and the United States, 1751&ndash;1800</em></p>
<p>Source: <a href="http://www.slavevoyages.org" target="_blank" rel="noreferrer">Voyages: The Trans-Atlantic Slave Trade Database</a></p>
`;

const greenwichPetitionExcerpt = `
<p><em>Petition from the town of Greenwich to the Massachusetts state legislature, 1786</em></p>
<blockquote>
  &ldquo;In the time of the late war &hellip; we spared no pains but freely granted all the aid and assistance of every kind that our civil fathers required of us. &hellip; But with the greatest submission we beg leave to inform your Honors that unless something takes place more favorable to the people, in a little time at least one half of our inhabitants in our opinion will become bankrupt. &hellip; Surely your Honors are no strangers to the distresses of the people but do know that many of our good inhabitants are now confined in jail for debt and for taxes.&rdquo;
</blockquote>
`;

const dickinsonExcerpt = `
<p><em>John Dickinson, <cite>Letters from a Farmer in Pennsylvania</cite>, 1768</em></p>
<blockquote>
  &ldquo;From infancy I was taught to love humanity and liberty. &hellip; If the British Parliament has a legal authority to order, that we shall furnish a single article for the troops here, and to compel obedience to that order; they have the same right to order us to supply those troops with arms, clothes &hellip;. What is this but taxing us at a certain sum, and leaving to us only the manner of raising it? How is this mode more tolerable than the Stamp Act?&rdquo;
</blockquote>
`;

const melishExcerpt = `
<p><em>Joanne Pope Melish, <cite>Disowning Slavery: Gradual Emancipation and &ldquo;Race&rdquo; in New England, 1780&ndash;1860</cite>, 1998</em></p>
<blockquote>
  &ldquo;The emancipation of slaves in New England, beginning around 1780, was a gradual process, whether by post nati statute, as in Rhode Island and Connecticut, or by effect, as in Massachusetts and New Hampshire. &hellip; The gradual nature of the process encouraged Whites to transfer a language and set of practices shaped in the context of slavery to their relations with a slowly emerging population of free people of color. &hellip; Whites anticipated that free people of color would, by some undefined moment, have disappeared.&rdquo;
</blockquote>
`;

const boutonExcerpt = `
<p><em>Terry Bouton, <cite>Taming Democracy</cite>, 2007</em></p>
<blockquote>
  &ldquo;Threatened by popular political victories and widespread resistance, many elite Pennsylvanians launched an effort to remake the state and national governments so that they were less democratic. &hellip; Popular calls for a revaluation of war debt certificates, bans on for-profit corporations, progressive taxation, limits on land speculation, and every other measure designed to make property more equal promised to take wealth away from the elite. &hellip; The push for the Constitution was based in part on the belief that state governments across the new nation had been too democratic and, as a result, had produced policies that threatened elite interests.&rdquo;
</blockquote>
`;

const johnsonExcerpt = `
<p><em>Paul Johnson, <cite>A History of the American People</cite>, 1997</em></p>
<blockquote>
  &ldquo;&lsquo;I ordered my company to fire,&rsquo; Washington reported. &hellip; The volley fired by a young Virginian in the backwoods of America set the world on fire.&rdquo;
</blockquote>
`;

const declarationExcerpt = `
<p><em>United States Declaration of Independence, 1776</em></p>
<blockquote>
  &ldquo;When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another &hellip; The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. &hellip; He has refused to pass Laws for the accommodation of large districts of people, unless those people would relinquish the right of Representation in the Legislature. &hellip; He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people. &hellip; He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures.&rdquo;
</blockquote>
`;

const franklinExcerpt = `
<p><em>Benjamin Franklin, letter to the count of Vergennes, 1777</em></p>
<blockquote>
  &ldquo;If the English make a conquest of the American States, they will not take the first opportunity of showing their resentment, by beginning themselves the war that would otherwise be avoided. &hellip; We therefore would submit it to the wisdom of his Majesty and his Ministers, whether if the independency of the United States of America &hellip; be an object of importance to all Europe, and to France in particular, this is not the proper time for acting in their favor.&rdquo;
</blockquote>
`;

const gerryExcerpt = `
<p><em>Elbridge Gerry, letter to the Massachusetts state legislature, 1787</em></p>
<blockquote>
  &ldquo;It was painful for me, on a subject of such national importance, to differ from the respectable members who signed the Constitution; but conceiving, as I did, that the liberties of America were not secured by the system, it was my duty to oppose it. &hellip; My principal objections to the plan are, that there is no adequate provision for a representation of the people; &hellip; and that the system is without the security of a bill of rights.&rdquo;
</blockquote>
`;

const hailColumbiaExcerpt = `
<p><em>&ldquo;Hail Columbia,&rdquo; popular song, 1798</em></p>
<blockquote>
  Hail Columbia! Happy Land! Hail ye heroes, heaven-born band, Who fought and bled in freedom's cause. &hellip; Let Independence be our boast, Ever mindful what it cost.
</blockquote>
`;

const pinckneyExcerpt = `
<p><em>Treaty of Friendship, Limits, and Navigation Between Spain and the United States (Pinckney's Treaty), 1795</em></p>
<blockquote>
  &ldquo;It is agreed that the western boundary of the United States which separates them from the Spanish Colony of Louisiana, is in the middle of the channel or bed of the River Mississippi; and his Catholic Majesty has likewise agreed that the navigation of the said River in its whole breadth from its source to the Ocean shall be free only to his Subjects, and the Citizens of the United States.&rdquo;
</blockquote>
`;

export const unit3TopicQuestions: TopicQuestionBank = {
  "3.1": [
    {
      id: "3-1-q6",
      prompt: "Which statement describes a trend shown in the graph about the regional distribution of the slave trade before the American Revolution?",
      stimulus: slaveTradeCaption,
      options: [
        { id: "A", text: "The northern colonies did not participate in the slave trade." },
        { id: "B", text: "The slave trade to Virginia and Maryland increased overall." },
        { id: "C", text: "Fewer enslaved Africans were brought to the southern colonies than to the North." },
        { id: "D", text: "More enslaved Africans were brought to the Carolinas and Georgia than to Virginia and Maryland." },
      ],
      correctOptionId: "D",
      explanation:
        "The data show the Carolinas and Georgia importing the largest numbers of enslaved Africans before the Revolution.",
      source: "Trans-Atlantic Slave Trade Database, 1751-1800",
    },
    {
      id: "3-1-q7",
      prompt: "Which option best describes the trend in the number of enslaved Africans brought to the Carolinas and Georgia depicted in the graph?",
      stimulus: slaveTradeCaption,
      options: [
        { id: "A", text: "It sharply decreased before the 1770s and then rebounded to earlier levels." },
        { id: "B", text: "It increased before the 1770s and then declined between 1771 and 1790." },
        { id: "C", text: "It remained steady before 1770 and reached zero imports by 1771." },
        { id: "D", text: "It consistently decreased until reaching zero imports by 1781." },
      ],
      correctOptionId: "B",
      explanation:
        "Imports peaked in the 1760s, dropped during the Revolution, and stabilized at lower levels afterward.",
      source: "Trans-Atlantic Slave Trade Database, 1751-1800",
    },
    {
      id: "3-1-q8",
      prompt: "Which statement best describes the overall trend depicted in the graph between 1751 and 1800?",
      stimulus: slaveTradeCaption,
      options: [
        { id: "A", text: "The slave trade to the northern colonies increased." },
        { id: "B", text: "The slave trade was halted entirely by the American Revolution." },
        { id: "C", text: "The number of enslaved Africans brought to British North America and the United States decreased." },
        { id: "D", text: "The number of enslaved Africans brought to the Carolinas and Georgia steadily increased." },
      ],
      correctOptionId: "C",
      explanation:
        "Despite regional fluctuations, the overall volume of enslaved arrivals declined over the second half of the eighteenth century.",
      source: "Trans-Atlantic Slave Trade Database, 1751-1800",
    },
    {
      id: "3-1-q22",
      prompt: "Britain attempted to pay for the debt resulting from the Seven Years' War by pursuing which policy?",
      stimulus: johnsonExcerpt,
      options: [
        { id: "A", text: "Charging immigrants a fee to relocate to North America" },
        { id: "B", text: "Selling Royal Navy ships to colonial merchants" },
        { id: "C", text: "Increasing taxes on goods bought and sold in the colonies" },
        { id: "D", text: "Sponsoring expeditions to locate valuable resources" },
      ],
      correctOptionId: "C",
      explanation:
        "New imperial taxes such as the Stamp Act and Townshend duties aimed to make colonists help pay Britain's massive war debt.",
      source: "Paul Johnson, A History of the American People, 1997",
    },
    {
      id: "3-1-q23",
      prompt: "Which factor contributed most to the outbreak of the Seven Years' War in North America?",
      stimulus: johnsonExcerpt,
      options: [
        { id: "A", text: "British efforts to monopolize tobacco sales in Europe" },
        { id: "B", text: "Intensified competition between France and Britain over colonies" },
        { id: "C", text: "Spanish attempts to end British control of the slave trade" },
        { id: "D", text: "British desire to impose new taxes on Native nations" },
      ],
      correctOptionId: "B",
      explanation:
        "Conflicting imperial claims in the Ohio River Valley drove France and Britain into war beginning in 1754.",
      source: "Paul Johnson, A History of the American People, 1997",
    },
    {
      id: "3-1-q24",
      prompt: "The British government attempted to restrict westward settlement after the Seven Years' War in order to accomplish which goal?",
      stimulus: johnsonExcerpt,
      options: [
        { id: "A", text: "Support the fur trade east of the Appalachian Mountains" },
        { id: "B", text: "Discourage immigration to the North American colonies" },
        { id: "C", text: "Give French settlers time to leave Canada" },
        { id: "D", text: "Minimize conflicts with Native Americans" },
      ],
      correctOptionId: "D",
      explanation:
        "The Proclamation of 1763 drew a line along the Appalachians to reduce costly frontier wars with Native nations.",
      source: "Paul Johnson, A History of the American People, 1997",
    },
  ],
  "3.2": [
    {
      id: "3-2-q13",
      prompt: "Which group would have been most likely to agree with Dickinson's sentiments?",
      stimulus: dickinsonExcerpt,
      options: [
        { id: "A", text: "Native Americans west of the Appalachian Mountains" },
        { id: "B", text: "Enslaved people in the southern colonies" },
        { id: "C", text: "Anglican ministers in the middle colonies" },
        { id: "D", text: "Merchants in New England" },
      ],
      correctOptionId: "D",
      explanation:
        "New England merchants resented imperial taxation and were outspoken defenders of colonial rights, echoing Dickinson.",
      source: "John Dickinson, Letters from a Farmer in Pennsylvania, 1768",
    },
    {
      id: "3-2-q14",
      prompt: "Based on the excerpt, what was Dickinson's primary purpose in writing his letters?",
      stimulus: dickinsonExcerpt,
      options: [
        { id: "A", text: "To support efforts to claim the French territory of Louisiana" },
        { id: "B", text: "To advocate for increased industrial production in the colonies" },
        { id: "C", text: "To use Enlightenment rhetoric to encourage American autonomy" },
        { id: "D", text: "To call for the immediate end of the international slave trade" },
      ],
      correctOptionId: "C",
      explanation:
        "Dickinson appealed to natural rights and liberty, urging colonists to oppose parliamentary taxation and assert autonomy.",
      source: "John Dickinson, Letters from a Farmer in Pennsylvania, 1768",
    },
    {
      id: "3-2-q15",
      prompt: "To which imperial policy was Dickinson responding in his letters?",
      stimulus: dickinsonExcerpt,
      options: [
        { id: "A", text: "Native challenges to European control of the fur trade" },
        { id: "B", text: "Increased taxation and oversight after the Seven Years' War" },
        { id: "C", text: "Spanish efforts to reclaim territory in North America" },
        { id: "D", text: "Arguments about creating a new national constitution" },
      ],
      correctOptionId: "B",
      explanation:
        "Dickinson objected to the Townshend duties and quartering requirements Parliament imposed on the colonies after 1763.",
      source: "John Dickinson, Letters from a Farmer in Pennsylvania, 1768",
    },
  ],
  "3.3": [
    {
      id: "3-3-q1",
      prompt: "The ideas expressed in the excerpt best reflect which of the following historical processes?",
      stimulus: paineExcerpt,
      options: [
        { id: "A", text: "The desire to fund transportation improvements to settle the interior of North America" },
        { id: "B", text: "The persistence of aspects of African culture among enslaved people" },
        { id: "C", text: "The creation of alliances between Europeans and Native Americans" },
        { id: "D", text: "The transmission of Enlightenment ideals across the Atlantic" },
      ],
      correctOptionId: "D",
      explanation:
        "Paine drew on trans-Atlantic Enlightenment rhetoric to challenge monarchy and advocate republican self-rule.",
      source: "Thomas Paine, Common Sense, 1776",
    },
    {
      id: "3-3-q2",
      prompt: "Paine's rhetoric in the excerpt would have most likely been interpreted at the time as promoting which development?",
      stimulus: paineExcerpt,
      options: [
        { id: "A", text: "Independence of the American colonies" },
        { id: "B", text: "Sale of British colonies to France" },
        { id: "C", text: "Elimination of the trans-Atlantic slave trade" },
        { id: "D", text: "Election of colonial representatives to Parliament" },
      ],
      correctOptionId: "A",
      explanation:
        "Common Sense made the case for complete separation from Britain, energizing the independence movement.",
      source: "Thomas Paine, Common Sense, 1776",
    },
    {
      id: "3-3-q3",
      prompt: "Which historical situation most directly shaped Paine's argument that Britain's policies were economically harming its colonies?",
      stimulus: paineExcerpt,
      options: [
        { id: "A", text: "Increased immigration to the Americas" },
        { id: "B", text: "Continued enforcement of mercantilism" },
        { id: "C", text: "Limitations on indentured servitude" },
        { id: "D", text: "Demand for raw materials" },
      ],
      correctOptionId: "B",
      explanation:
        "Paine criticized mercantilist restrictions that treated colonies like dependent children, limiting their prosperity.",
      source: "Thomas Paine, Common Sense, 1776",
    },
    {
      id: "3-3-q4",
      prompt: "Paine's argument best provides evidence for which development resulting from the American Revolution?",
      stimulus: paineExcerpt,
      options: [
        { id: "A", text: "Creation of an industrialized United States economy" },
        { id: "B", text: "Increase in immigration from continental Europe" },
        { id: "C", text: "Emergence of a distinct American national identity" },
        { id: "D", text: "Spanish and French abandonment of their colonies" },
      ],
      correctOptionId: "C",
      explanation:
        "By framing Britain as a tyrant and America as unique, Paine contributed to a new American identity separate from Europe.",
      source: "Thomas Paine, Common Sense, 1776",
    },
    {
      id: "3-3-q5",
      prompt:
        "Paine's argument that \"the same tyranny which drove the first emigrants from home, pursues their descendants still\" was most likely in reference to which situation?",
      stimulus: paineExcerpt,
      options: [
        { id: "A", text: "Hope that religious dissenters would join the Church of England" },
        { id: "B", text: "Challenges faced by settlers west of the Appalachian Mountains" },
        { id: "C", text: "Belief among colonists that they had earned greater liberty from Britain" },
        { id: "D", text: "Concern that war debt would decrease the value of American goods" },
      ],
      correctOptionId: "C",
      explanation:
        "Colonists claimed long-standing rights and resented imperial efforts to curtail them, which Paine cast as ongoing tyranny.",
      source: "Thomas Paine, Common Sense, 1776",
    },
  ],
  "3.4": [
    {
      id: "3-4-q25a",
      prompt: "Which situation best describes the historical context in which the Declaration of Independence was written?",
      stimulus: declarationExcerpt,
      options: [
        { id: "A", text: "Delegates met after repeated British rejections of colonial petitions at the Second Continental Congress." },
        { id: "B", text: "The United States government organized under the Articles of Confederation." },
        { id: "C", text: "Leaders gathered in Philadelphia to draft a new federal Constitution." },
        { id: "D", text: "American negotiators met in Europe to end the War of 1812." },
      ],
      correctOptionId: "A",
      explanation:
        "By summer 1776, the Second Continental Congress sought independence after Britain ignored attempts at reconciliation.",
      source: "Declaration of Independence, 1776",
    },
    {
      id: "3-4-q25b",
      prompt: "Which statement identifies a primary purpose of the Declaration of Independence?",
      stimulus: declarationExcerpt,
      options: [
        { id: "A", text: "To announce a permanent military alliance with France" },
        { id: "B", text: "To justify dissolving political ties with Britain and rally support" },
        { id: "C", text: "To outline the structure of the new national government" },
        { id: "D", text: "To abolish slavery in all British colonies" },
      ],
      correctOptionId: "B",
      explanation:
        "The Declaration catalogued grievances to legitimize independence and persuade colonists and foreign audiences to support it.",
      source: "Declaration of Independence, 1776",
    },
    {
      id: "3-4-q25c",
      prompt: "Which evidence from the Declaration supports its argument for independence?",
      stimulus: declarationExcerpt,
      options: [
        { id: "A", text: "The king's refusal to allow colonial churches to appoint clergy" },
        { id: "B", text: "The king's dissolution of colonial legislatures that defended colonial rights" },
        { id: "C", text: "Efforts by Parliament to compensate colonists for wartime losses" },
        { id: "D", text: "Creation of new colonial courts staffed by local judges" },
      ],
      correctOptionId: "B",
      explanation:
        "Jefferson listed the crown's dissolution of representative assemblies as proof of British tyranny over the colonies.",
      source: "Declaration of Independence, 1776",
    },
  ],
  "3.5": [
    {
      id: "3-5-q26a",
      prompt: "Which historical development is depicted in Franklin's letter?",
      stimulus: franklinExcerpt,
      options: [
        { id: "A", text: "British colonists negotiating the sale of western lands to Spain" },
        { id: "B", text: "United States diplomats seeking French support during the Revolutionary War" },
        { id: "C", text: "American negotiators signing the Treaty of Paris that ended the war" },
        { id: "D", text: "Confederation officials planning to purchase Louisiana from France" },
      ],
      correctOptionId: "B",
      explanation:
        "Franklin urged French officials to ally with the United States, reflecting American diplomacy in 1777.",
      source: "Benjamin Franklin to the count of Vergennes, 1777",
    },
    {
      id: "3-5-q26b",
      prompt: "Which option best explains how the development in the letter reflected change or continuity from earlier colonial history?",
      stimulus: franklinExcerpt,
      options: [
        { id: "A", text: "It represented a change because Britain had long restricted colonial trade with France." },
        { id: "B", text: "It represented a continuity because Britain and France had cooperated closely in North America." },
        { id: "C", text: "It represented a change because colonists now sought alliances with a former imperial rival." },
        { id: "D", text: "It represented a continuity because colonists always relied on French military protection." },
      ],
      correctOptionId: "C",
      explanation:
        "After decades of fighting France, American leaders now pursued a wartime alliance with their former enemy.",
      source: "Benjamin Franklin to the count of Vergennes, 1777",
    },
    {
      id: "3-5-q26c",
      prompt: "What was a primary purpose of Franklin's letter?",
      stimulus: franklinExcerpt,
      options: [
        { id: "A", text: "To request French military and diplomatic support for the American cause" },
        { id: "B", text: "To convince Britain to reopen colonial trade with continental Europe" },
        { id: "C", text: "To secure Spanish navigation rights on the Mississippi River" },
        { id: "D", text: "To outline plans for a new national constitution" },
      ],
      correctOptionId: "A",
      explanation:
        "Franklin highlighted shared interests to persuade France to recognize and aid the struggling United States.",
      source: "Benjamin Franklin to the count of Vergennes, 1777",
    },
  ],
  "3.6": [
    {
      id: "3-6-q9",
      prompt: "Concerns about domestic political unrest in the early United States were lessened by which development?",
      stimulus: greenwichPetitionExcerpt,
      options: [
        { id: "A", text: "Outbreak of the Haitian Revolution" },
        { id: "B", text: "Creation of a stronger central government" },
        { id: "C", text: "Attempts by Native peoples to limit White settlement" },
        { id: "D", text: "Conflict between Great Britain and France after the French Revolution" },
      ],
      correctOptionId: "B",
      explanation:
        "Shays' Rebellion and similar unrest convinced many leaders that a more powerful national government was needed to preserve order.",
      source: "Greenwich, Massachusetts, petition to the state legislature, 1786",
    },
    {
      id: "3-6-q10",
      prompt: "Which claim did the residents of Greenwich make to argue that they should be \"relieved\" by the Massachusetts legislature?",
      stimulus: greenwichPetitionExcerpt,
      options: [
        { id: "A", text: "Massachusetts should pay off all of its war debts immediately." },
        { id: "B", text: "They earned enough money to pay their state taxes." },
        { id: "C", text: "They were eager to gain the benefits of independence." },
        { id: "D", text: "They had aided the government during the Revolutionary War." },
      ],
      correctOptionId: "D",
      explanation:
        "Petitioners reminded legislators that they had supported the war effort and thus deserved relief from crushing taxes and debts.",
      source: "Greenwich, Massachusetts, petition to the state legislature, 1786",
    },
    {
      id: "3-6-q11",
      prompt: "Which evidence in the petition supports the claim that the Massachusetts government \"devours their inhabitants\"?",
      stimulus: greenwichPetitionExcerpt,
      options: [
        { id: "A", text: "Many Massachusetts residents fought in the Revolutionary War." },
        { id: "B", text: "Farmers were being held in debtor's prison." },
        { id: "C", text: "Property owners typically rented land to tenants." },
        { id: "D", text: "Massachusetts incurred a large debt during the war." },
      ],
      correctOptionId: "B",
      explanation:
        "The petition lamented that neighbors were jailed for debt and taxes, illustrating the perceived cruelty of state policies.",
      source: "Greenwich, Massachusetts, petition to the state legislature, 1786",
    },
    {
      id: "3-6-q12",
      prompt: "The concern in the petition about the effect of taxation is best understood in continuity with which earlier development?",
      stimulus: greenwichPetitionExcerpt,
      options: [
        { id: "A", text: "Increased competition between Britain and France in North America" },
        { id: "B", text: "Passage of gradual emancipation laws in northern states" },
        { id: "C", text: "Revolt against British imperial control of the colonies" },
        { id: "D", text: "Development of opposition to the United States Constitution" },
      ],
      correctOptionId: "C",
      explanation:
        "Massachusetts farmers drew on Revolutionary grievances about taxation without adequate representation.",
      source: "Greenwich, Massachusetts, petition to the state legislature, 1786",
    },
  ],
  "3.7": [
    {
      id: "3-7-q19",
      prompt: "Which evidence does Bouton use to explain why some leaders wanted to replace the Articles of Confederation?",
      stimulus: boutonExcerpt,
      options: [
        { id: "A", text: "They thought strong central power threatened liberty." },
        { id: "B", text: "They opposed economic policies pursued by state legislatures." },
        { id: "C", text: "They believed the national government should be more democratic." },
        { id: "D", text: "They wanted to discourage European investment in the United States." },
      ],
      correctOptionId: "B",
      explanation:
        "Bouton highlights elite frustration with state laws that redistributed wealth, motivating calls for a stronger central government.",
      source: "Terry Bouton, Taming Democracy, 2007",
    },
    {
      id: "3-7-q20",
      prompt: "Ratification of the Constitution despite the \"resistance\" described is best understood in which context?",
      stimulus: boutonExcerpt,
      options: [
        { id: "A", text: "Threats to the neutral trading rights of the United States" },
        { id: "B", text: "Persistence of regional cultures in the new nation" },
        { id: "C", text: "Agreements to pursue a Bill of Rights after ratification" },
        { id: "D", text: "Mistrust of centralized authority among Anti-Federalists" },
      ],
      correctOptionId: "C",
      explanation:
        "Support for adding a Bill of Rights helped secure enough votes in state conventions to ratify the Constitution.",
      source: "Terry Bouton, Taming Democracy, 2007",
    },
    {
      id: "3-7-q21",
      prompt: "The federal system created by the Constitution was a long-term response to which earlier development?",
      stimulus: boutonExcerpt,
      options: [
        { id: "A", text: "Parliamentary claims of authority over colonial legislatures" },
        { id: "B", text: "George Washington's warning against permanent alliances" },
        { id: "C", text: "Frontier conflicts between Native Americans and colonists" },
        { id: "D", text: "Democratic-Republican opposition to Hamilton's financial plan" },
      ],
      correctOptionId: "A",
      explanation:
        "The founders sought to balance national and state power to avoid British-style parliamentary supremacy over local governments.",
      source: "Terry Bouton, Taming Democracy, 2007",
    },
    {
      id: "3-7-q27",
      prompt: "What argument does Gerry make regarding amendments to the Constitution?",
      stimulus: gerryExcerpt,
      options: [
        { id: "A", text: "A Bill of Rights should be added before ratification." },
        { id: "B", text: "Enslaved people should not be counted for representation." },
        { id: "C", text: "The executive and legislative branches should share more power." },
        { id: "D", text: "More populous states should have greater representation in Congress." },
      ],
      correctOptionId: "A",
      explanation:
        "Gerry insisted that necessary protections, including a bill of rights, be added prior to accepting the new government.",
      source: "Elbridge Gerry to the Massachusetts legislature, 1787",
    },
    {
      id: "3-7-q28",
      prompt: "What claim does Gerry make about the Articles of Confederation?",
      stimulus: gerryExcerpt,
      options: [
        { id: "A", text: "They needed amendments to abolish slavery." },
        { id: "B", text: "They were mostly effective at funding the central government." },
        { id: "C", text: "Their problems could not be fixed by state delegates." },
        { id: "D", text: "State governments should receive more power under the Articles." },
      ],
      correctOptionId: "C",
      explanation:
        "Gerry conceded that revising the Articles would not create an efficient government, so a new frame was ultimately necessary.",
      source: "Elbridge Gerry to the Massachusetts legislature, 1787",
    },
    {
      id: "3-7-q29",
      prompt: "Why did Gerry refuse to sign the Constitution according to the excerpt?",
      stimulus: gerryExcerpt,
      options: [
        { id: "A", text: "He required formal approval from the Massachusetts legislature." },
        { id: "B", text: "He demanded appointment to the new national government." },
        { id: "C", text: "He believed the United States should return to British rule." },
        { id: "D", text: "He felt the system failed to safeguard individual liberties." },
      ],
      correctOptionId: "D",
      explanation:
        "Gerry feared the proposed Constitution lacked sufficient protections for Americans' freedoms.",
      source: "Elbridge Gerry to the Massachusetts legislature, 1787",
    },
    {
      id: "3-7-q30",
      prompt: "Arguments for creating a stronger federal government primarily arose from which long-term concern?",
      stimulus: gerryExcerpt,
      options: [
        { id: "A", text: "British attempts to regain their former colonies" },
        { id: "B", text: "Use of congressional funds to build national road networks" },
        { id: "C", text: "Challenges of admitting western territories as new states" },
        { id: "D", text: "Inability of the national government to maintain order under the Articles" },
      ],
      correctOptionId: "D",
      explanation:
        "Disorder under the Articles, exemplified by uprisings like Shays' Rebellion, spurred calls for a stronger federal structure.",
      source: "Elbridge Gerry to the Massachusetts legislature, 1787",
    },
  ],
  "3.8": [
    {
      id: "3-8-q16",
      prompt: "According to the author, antislavery rhetoric in the late eighteenth century was based on which assumption?",
      stimulus: melishExcerpt,
      options: [
        { id: "A", text: "Religious ideals formed during the First Great Awakening" },
        { id: "B", text: "Belief that emancipated people would not remain in society" },
        { id: "C", text: "Legal precedent established during the colonial period" },
        { id: "D", text: "Concern that revolutionary conflict would spread from France" },
      ],
      correctOptionId: "B",
      explanation:
        "Melish argues Whites expected that ending slavery would also lead to the disappearance of free people of color.",
      source: "Joanne Pope Melish, Disowning Slavery, 1998",
    },
    {
      id: "3-8-q17",
      prompt: "What argument does the author make about emancipation in northern states?",
      stimulus: melishExcerpt,
      options: [
        { id: "A", text: "It occurred as a result of Supreme Court rulings." },
        { id: "B", text: "It was achieved through state constitutional amendments." },
        { id: "C", text: "It unfolded gradually over an extended period." },
        { id: "D", text: "It emerged in response to widespread street protests." },
      ],
      correctOptionId: "C",
      explanation:
        "Melish emphasizes that emancipation happened slowly and unevenly across New England states.",
      source: "Joanne Pope Melish, Disowning Slavery, 1998",
    },
    {
      id: "3-8-q18",
      prompt: "Which perception of emancipated people in the North does the author describe?",
      stimulus: melishExcerpt,
      options: [
        { id: "A", text: "They would quickly assimilate into society." },
        { id: "B", text: "They were likely to be dependent and disorderly." },
        { id: "C", text: "They would provide an inexpensive labor source." },
        { id: "D", text: "They would advocate for abolition in the South." },
      ],
      correctOptionId: "B",
      explanation:
        "Melish notes that Whites expected free people of color to need control and management after emancipation.",
      source: "Joanne Pope Melish, Disowning Slavery, 1998",
    },
    {
      id: "3-8-q31",
      prompt: "Which development best explains the sentiment expressed in the first verse of the song?",
      stimulus: hailColumbiaExcerpt,
      options: [
        { id: "A", text: "Conflicts between the federal army and Native Americans on the frontier" },
        { id: "B", text: "Resumption of commerce with Great Britain after the Revolution" },
        { id: "C", text: "Growth of a shared national identity in the United States" },
        { id: "D", text: "Partisan clashes between Democratic-Republicans and Federalists" },
      ],
      correctOptionId: "C",
      explanation:
        "The lyrics celebrate independence and heroes of the Revolution, reflecting rising nationalist pride in the 1790s.",
      source: "\"Hail Columbia,\" popular song, 1798",
    },
    {
      id: "3-8-q32",
      prompt: "Which factor best explains the depiction of George Washington in the song's third verse?",
      stimulus: hailColumbiaExcerpt,
      options: [
        { id: "A", text: "Washington's outspoken public advocacy for abolition" },
        { id: "B", text: "A movement to elect Washington president for life" },
        { id: "C", text: "Washington's policy of intervening in European conflicts" },
        { id: "D", text: "The popular image of Washington as a virtuous national leader" },
      ],
      correctOptionId: "D",
      explanation:
        "Americans widely revered Washington as the embodiment of republican virtue in both war and peace.",
      source: "\"Hail Columbia,\" popular song, 1798",
    },
    {
      id: "3-8-q34",
      prompt: "What was a primary reason the United States and Spain agreed to the terms described in the excerpt?",
      stimulus: pinckneyExcerpt,
      options: [
        { id: "A", text: "To force Britain to surrender its colonies in Canada" },
        { id: "B", text: "To provide land for new Catholic missions" },
        { id: "C", text: "To minimize tensions over United States expansion into the West" },
        { id: "D", text: "To prevent France from reclaiming territory lost in the Seven Years' War" },
      ],
      correctOptionId: "C",
      explanation:
        "Both nations sought to defuse conflict over Mississippi River navigation and western boundaries as U.S. settlers moved west.",
      source: "Pinckney's Treaty, 1795",
    },
    {
      id: "3-8-q35",
      prompt: "The agreements outlined in the excerpt best reflect which concern in the United States at the time?",
      stimulus: pinckneyExcerpt,
      options: [
        { id: "A", text: "How to support settlers living west of the Appalachian Mountains" },
        { id: "B", text: "How to avoid the establishment of political parties" },
        { id: "C", text: "Whether to aid France in its war against Britain" },
        { id: "D", text: "Whether to allow slavery to expand into new territories" },
      ],
      correctOptionId: "A",
      explanation:
        "Western farmers needed access to the Mississippi River and New Orleans to market their crops, pressing the issue in diplomacy.",
      source: "Pinckney's Treaty, 1795",
    },
    {
      id: "3-8-q36",
      prompt: "Which group would have most strongly supported the agreements described in the excerpt?",
      stimulus: pinckneyExcerpt,
      options: [
        { id: "A", text: "Fur trappers on the Pacific coast" },
        { id: "B", text: "White farmers in Kentucky" },
        { id: "C", text: "Merchants in New England" },
        { id: "D", text: "Native American leaders in Louisiana" },
      ],
      correctOptionId: "B",
      explanation:
        "Kentucky planters depended on river transport and welcomed guaranteed navigation rights and a port of deposit in New Orleans.",
      source: "Pinckney's Treaty, 1795",
    },
  ],
  "3.9": [
    {
      id: "3-9-q33a",
      prompt: "Which thesis best evaluates how United States independence changed relations between American Indians and settlers from 1763 to 1800?",
      options: [
        { id: "A", text: "Independence dramatically weakened Native influence because settlers lost the ability to trade with Europe." },
        { id: "B", text: "Independence did little to alter Native-settler relations because Britain continued to supervise western lands." },
        { id: "C", text: "Independence encouraged greater Native autonomy because the United States immediately honored all treaty boundaries." },
        { id: "D", text: "Independence emboldened settlers to seize Native lands as imperial restraints disappeared, escalating conflict." },
      ],
      correctOptionId: "D",
      explanation:
        "After independence, U.S. expansion accelerated as British restrictions vanished, heightening pressure on Native territory.",
      source: "AP U.S. History LEQ practice prompt",
    },
    {
      id: "3-9-q33b",
      prompt: "Which broader historical context is most relevant when addressing the changes described in the prompt?",
      options: [
        { id: "A", text: "Long-standing Native alliances with European powers to balance colonial expansion" },
        { id: "B", text: "Spanish missions established in California during the 1760s" },
        { id: "C", text: "Early nineteenth-century debates over the Missouri Compromise" },
        { id: "D", text: "Creation of Henry Clay's American System in the 1820s" },
      ],
      correctOptionId: "A",
      explanation:
        "For decades Native nations leveraged rivalries among European empires; independence removed a key counterweight to U.S. expansion.",
      source: "AP U.S. History LEQ practice prompt",
    },
    {
      id: "3-9-q33c",
      prompt: "Which specific evidence most effectively supports an argument about post-independence changes in Native-settler relations?",
      options: [
        { id: "A", text: "The 1795 Treaty of Greenville that ceded much of the Northwest Territory to the United States" },
        { id: "B", text: "The 1808 Embargo Act restricting foreign trade" },
        { id: "C", text: "The 1789 Judiciary Act establishing federal courts" },
        { id: "D", text: "The 1791 creation of the First Bank of the United States" },
      ],
      correctOptionId: "A",
      explanation:
        "The Treaty of Greenville followed U.S. victory at Fallen Timbers and forced Native land cessions, exemplifying new realities after independence.",
      source: "AP U.S. History LEQ practice prompt",
    },
    {
      id: "3-9-q34",
      prompt: "Which of the following best explains a result of the Seven Years' War (French and Indian War)?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "France sold the Louisiana Territory to Great Britain." },
        { id: "B", text: "Great Britain gained a claim to land extending to the Mississippi River." },
        { id: "C", text: "Great Britain and Spain established an alliance." },
        { id: "D", text: "British influence over its North American colonies decreased." },
      ],
      correctOptionId: "B",
      explanation:
        "The Treaty of Paris in 1763 transferred France's claims east of the Mississippi River to Britain, vastly expanding British North America.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-9-q35",
      prompt: "Britain's victory in the Seven Years' War had which of the following economic consequences for its American colonies?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "The British government granted certain colonists a fur-trade monopoly." },
        { id: "B", text: "The British government funded canals linking the Great Lakes with the East Coast." },
        { id: "C", text: "The British government increased taxation of colonial goods to pay war debts." },
        { id: "D", text: "The British government forced American merchants to supply the Royal Navy without payment." },
      ],
      correctOptionId: "C",
      explanation:
        "War debts prompted Parliament to impose new revenue measures--such as the Sugar and Stamp Acts--on colonial commerce.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-9-q36",
      prompt: "The conclusion of the Seven Years' War had which of the following effects on Native American societies?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "Native allies of Britain were granted citizenship, angering colonists." },
        { id: "B", text: "British and French officials agreed to confine Native peoples west of the Mississippi River." },
        { id: "C", text: "Native nations gained full control of the western fur trade." },
        { id: "D", text: "Britain attempted to restrict western settlement to reduce conflicts with Native nations." },
      ],
      correctOptionId: "D",
      explanation:
        "Pontiac's Rebellion and frontier unrest led Britain to issue the Proclamation of 1763, limiting settler expansion beyond the Appalachians.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-9-q37",
      prompt: "In the excerpt, Otis was responding to which of the following developments?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "The publication of Thomas Paine's Common Sense" },
        { id: "B", text: "The threat of a French invasion of British North America" },
        { id: "C", text: "The introduction of widespread boycotts against British imports" },
        { id: "D", text: "British efforts to pay for the costs of the Seven Years' War" },
      ],
      correctOptionId: "D",
      explanation:
        "Parliament's postwar revenue measures spurred Otis to assert colonists' rights as British subjects and denounce taxation without representation.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-9-q38",
      prompt: "Which of the following was a major purpose of Otis' pamphlet?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "To recruit foreign allies against Britain" },
        { id: "B", text: "To encourage opposition to Parliament's regulation of colonial trade" },
        { id: "C", text: "To propose that colonial delegates take seats in Parliament" },
        { id: "D", text: "To advocate immediate independence from Britain" },
      ],
      correctOptionId: "B",
      explanation:
        "Otis condemned parliamentary taxation of colonial commerce, rallying colonists to resist enforcement of trade laws like the Sugar Act.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-9-q39",
      prompt: "By the 1770s, to which group would Otis' argument that the colonies 'must obey' Parliament most appeal?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "Farmers in New England" },
        { id: "B", text: "Loyalists in New York" },
        { id: "C", text: "Enslaved people in the southern colonies" },
        { id: "D", text: "Artisans in port cities" },
      ],
      correctOptionId: "B",
      explanation:
        "Loyalists, many concentrated in New York, maintained that colonists owed obedience to Parliament despite disagreements over taxation.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-9-q40",
      prompt: "The ideas in Locke's excerpt were most likely interpreted by American colonists in the 1770s as a call to reject which of the following?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "The holding of private property" },
        { id: "B", text: "The establishment of representative democracy" },
        { id: "C", text: "The acceptance of the divine right of kings" },
        { id: "D", text: "The creation of political parties" },
      ],
      correctOptionId: "C",
      explanation:
        "Locke's emphasis on natural freedom and equality challenged monarchical claims of divine authority and inspired revolutionary critiques of kingship.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-9-q41",
      prompt: "During the American Revolution, Locke's purpose in the excerpt would most likely have been interpreted as promoting a government based on which principle?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "Natural rights" },
        { id: "B", text: "Military rule" },
        { id: "C", text: "Hereditary privilege" },
        { id: "D", text: "Religious conformity" },
      ],
      correctOptionId: "A",
      explanation:
        "Patriots invoked Locke's natural rights philosophy to argue that legitimate governments exist to secure life, liberty, and property.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-9-q42",
      prompt: "Interpretations of Locke's assertions regarding a 'state of freedom' and a 'state also of equality' most directly influenced which of the following?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "Colonial grievances during the Seven Years' War" },
        { id: "B", text: "Patriot political rhetoric during the American Revolution" },
        { id: "C", text: "The abolition of the international slave trade" },
        { id: "D", text: "Demands to settle beyond current frontier boundaries" },
      ],
      correctOptionId: "B",
      explanation:
        "Revolutionary leaders echoed Locke's language about liberty and equality in petitions, pamphlets, and the Declaration of Independence.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-9-q43",
      prompt: "The excerpt from Locke's <cite>Two Treatises of Government</cite> could best be used as evidence by historians studying which topic?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "The impact of the Enlightenment on Revolutionary political thought" },
        { id: "B", text: "The role of pamphlets in mobilizing colonial resistance" },
        { id: "C", text: "African American efforts to claim freedom during the Revolution" },
        { id: "D", text: "The influence of the Revolution on republicanism overseas" },
      ],
      correctOptionId: "A",
      explanation:
        "Locke's treatise exemplifies Enlightenment ideas about natural law and consent that informed American revolutionary ideology.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-9-q44",
      prompt: "The first paragraph of the petition most clearly makes which claim?",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Slavery should encourage religious conversion to Christianity." },
        { id: "B", text: "Concepts of independence should apply only to White men." },
        { id: "C", text: "All people share the same inherent liberties." },
        { id: "D", text: "American revolutionary ideals should guide other nations." },
      ],
      correctOptionId: "C",
      explanation:
        "Petitioners asserted that the Creator bestowed natural and inalienable freedom on all humankind, including enslaved people.",
      source: "Petition to the Massachusetts legislature, 1777",
    },
    {
      id: "3-9-q45",
      prompt: "What action do the petitioners urge the Massachusetts legislature to take?",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Permit enslaved Africans to enlist in the militia" },
        { id: "B", text: "Seek a negotiated peace with Great Britain" },
        { id: "C", text: "Draft a constitution explaining natural rights for enslaved people" },
        { id: "D", text: "Pass a law abolishing slavery and freeing enslaved children at age twenty-one" },
      ],
      correctOptionId: "D",
      explanation:
        "They requested legislation restoring their liberty and guaranteeing that children born in Massachusetts would be freed upon reaching adulthood.",
      source: "Petition to the Massachusetts legislature, 1777",
    },
    {
      id: "3-9-q46",
      prompt: "Which statement best describes the overall argument of the petition?",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Slavery is not economically important in New England." },
        { id: "B", text: "Slavery violates the ideals of the American Revolution." },
        { id: "C", text: "Enslaved Africans should be rewarded for loyalty to Britain." },
        { id: "D", text: "Enslaved Africans should return to Africa." },
      ],
      correctOptionId: "B",
      explanation:
        "The petition parallels Black claims to liberty with Patriots' struggle against British oppression, arguing the Revolution's principles demand emancipation.",
      source: "Petition to the Massachusetts legislature, 1777",
    },
    {
      id: "3-9-q47",
      prompt: "Which evidence does the author use to support his argument about state power under the Confederation?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "Foundational political documents from the Revolutionary era" },
        { id: "B", text: "Diaries kept by Continental Army officers" },
        { id: "C", text: "Arguments later published in <cite>The Federalist</cite>" },
        { id: "D", text: "Diplomatic treaties with Britain and France" },
      ],
      correctOptionId: "A",
      explanation:
        "Wood quotes the Declaration of Independence and Articles of Confederation to show that sovereignty remained with the individual states.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-9-q48",
      prompt: "Which situation best illustrates Wood's claim that the states remained independent under the Articles?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "States could nullify the laws of other states." },
        { id: "B", text: "The central government could declare war." },
        { id: "C", text: "State governments could not collect taxes." },
        { id: "D", text: "Congress struggled to enforce its resolutions on the states." },
      ],
      correctOptionId: "D",
      explanation:
        "Because congressional acts were advisory, the Confederation Congress depended on voluntary state compliance to carry out policy.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-9-q49",
      prompt: "The weaknesses of the Articles of Confederation led to which development in United States government?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "The immediate end of property qualifications for voting" },
        { id: "B", text: "The exclusion of women from civic participation" },
        { id: "C", text: "Ratification of a constitution creating a stronger central authority" },
        { id: "D", text: "The passage of the Northwest Ordinance" },
      ],
      correctOptionId: "C",
      explanation:
        "Perceived weaknesses in national power motivated reformers to draft the U.S. Constitution, which curtailed absolute state sovereignty.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-9-q50",
      prompt: "Which claim does Hamilton make in the excerpt regarding national power under the Articles of Confederation?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "The United States could not negotiate with foreign nations." },
        { id: "B", text: "The United States lacked authority to raise sufficient revenue." },
        { id: "C", text: "The United States could act without unanimous state approval." },
        { id: "D", text: "The United States fielded an adequate military for defense." },
      ],
      correctOptionId: "B",
      explanation:
        "Hamilton argued that Congress could only request funds from states, leaving the national treasury chronically underfunded.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-9-q51",
      prompt: "According to Hamilton, what was the effect of state sovereignty under the Articles?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "It intensified national unity." },
        { id: "B", text: "It safeguarded individual liberties." },
        { id: "C", text: "It inspired a shared pursuit of the common good." },
        { id: "D", text: "It allowed states to ignore congressional requests." },
      ],
      correctOptionId: "D",
      explanation:
        "Hamilton lamented that each state followed its own interests, treating federal requisitions as optional recommendations.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-9-q52",
      prompt: "Which overall argument does Hamilton advance about the Articles of Confederation?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "The United States should invite foreign powers into the Confederation." },
        { id: "B", text: "Americans should retain the Articles as the national constitution." },
        { id: "C", text: "Citizens should donate money to Congress to compensate for flaws in the Articles." },
        { id: "D", text: "The nation should abandon the Articles and adopt a stronger central government." },
      ],
      correctOptionId: "D",
      explanation:
        "He contended that only a restructured federal system with direct authority over citizens could remedy the Confederation's failures.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-9-q53",
      prompt: "Which evidence does Hamilton cite to bolster his critique of the Articles?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "Past European confederacies quickly collapsed without stronger enforcement powers." },
        { id: "B", text: "The Articles granted Congress mandatory taxing authority." },
        { id: "C", text: "Most people believed states would willingly obey Congress." },
        { id: "D", text: "States needed alliances to achieve shared goals." },
      ],
      correctOptionId: "A",
      explanation:
        "Hamilton referenced failed European leagues to show that voluntary cooperation among sovereign states was unreliable.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-9-q54",
      prompt: "Dickinson's concerns about 'mischiefs' in the states are best understood in connection with which development?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "Plans to crown George Washington king" },
        { id: "B", text: "Powerful executives dominating state governments" },
        { id: "C", text: "Ongoing warfare between certain states and Britain" },
        { id: "D", text: "Popular uprisings that threatened state authority" },
      ],
      correctOptionId: "D",
      explanation:
        "Events like Shays' Rebellion fueled fears that inexperienced state governments could not contain unrest or protect property.",
      source: "John Dickinson, Constitutional Convention notes, 1787",
    },
    {
      id: "3-9-q55",
      prompt: "The federal structure established by the Constitution most closely resembled which earlier aspect of British colonial government?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "Autonomous colonial legislatures operating with limited imperial oversight" },
        { id: "B", text: "Lack of colonial representation in Parliament" },
        { id: "C", text: "Royal enforcement of trade regulations" },
        { id: "D", text: "The king's authority over appointed governors" },
      ],
      correctOptionId: "A",
      explanation:
        "During salutary neglect, colonial assemblies exercised significant self-government--an arrangement echoed in constitutional federalism.",
      source: "John Dickinson, Constitutional Convention notes, 1787",
    },
    {
      id: "3-9-q56",
      prompt: "How did the framers initially respond to abuses of executive authority by the British monarchy?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "They empowered the Supreme Court to veto treaties." },
        { id: "B", text: "They established separation of powers between Congress and the president." },
        { id: "C", text: "They required the direct popular election of the president." },
        { id: "D", text: "They prevented presidents from limiting basic rights." },
      ],
      correctOptionId: "B",
      explanation:
        "By dividing authority among branches, the Constitution enabled legislative checks on executive power reminiscent of colonial grievances.",
      source: "John Dickinson, Constitutional Convention notes, 1787",
    },
    {
      id: "3-9-q57",
      prompt: "Dickinson's desire to preserve state 'agency' reflects which trend in the early United States?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "The popularity of George Washington nationwide" },
        { id: "B", text: "The persistence of regional cultural identities alongside national unity" },
        { id: "C", text: "Hamilton's proposals for reorganizing the financial system" },
        { id: "D", text: "Difficulties funding major infrastructure projects" },
      ],
      correctOptionId: "B",
      explanation:
        "Americans still identified strongly with their states, so Dickinson advocated a system balancing local autonomy with national cohesion.",
      source: "John Dickinson, Constitutional Convention notes, 1787",
    },
    {
      id: "3-9-q58",
      prompt: "Why did Washington warn against the 'baneful effects of the spirit of party'?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "He believed political parties would fracture national unity." },
        { id: "B", text: "He thought parties were essential for economic growth." },
        { id: "C", text: "He argued parties functioned only in republics." },
        { id: "D", text: "He feared parties would encourage foreign intervention." },
      ],
      correctOptionId: "A",
      explanation:
        "Washington cautioned that partisan rivalry could devolve into revengeful factional domination, jeopardizing the republic.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-9-q59",
      prompt: "Which situation best explains Washington's warning against foreign political alliances?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "No nations were interested in commercial agreements with the United States." },
        { id: "B", text: "Britain and France were at war, and both threatened U.S. interests." },
        { id: "C", text: "Domestic parties forced Washington to adopt neutrality." },
        { id: "D", text: "European empires had already abandoned the Americas." },
      ],
      correctOptionId: "B",
      explanation:
        "Ongoing Anglo-French conflict pressured the United States to choose sides; Washington urged neutrality to avoid entanglement in European wars.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-9-q60",
      prompt: "Supporters of Washington's foreign policy advice would most likely have endorsed which approach?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "Building a massive standing army" },
        { id: "B", text: "Rapid territorial expansion" },
        { id: "C", text: "Entering mutual defense alliances" },
        { id: "D", text: "Maintaining broad economic relationships" },
      ],
      correctOptionId: "D",
      explanation:
        "Washington favored open commerce with many nations while avoiding binding political alliances, a position shared by his supporters.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-9-q61",
      prompt: "Washington's suggestions about foreign relations reflect which reality facing the United States in the 1790s?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "A need to develop manufacturing to expand exports" },
        { id: "B", text: "An effort to promote European immigration" },
        { id: "C", text: "European colonial powers still bordering the young republic" },
        { id: "D", text: "The challenge of spreading republican ideals abroad" },
      ],
      correctOptionId: "C",
      explanation:
        "Britain in Canada and Spain in Florida and the Southwest remained immediate neighbors, making cautious diplomacy essential.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-9-q62",
      prompt: "What does the painting of George Washington at Princeton best illustrate about the Revolutionary era?",
      stimulus: washingtonPrincetonPainting,
      options: [
        { id: "A", text: "The growth of a shared American identity among Patriots" },
        { id: "B", text: "Efforts to win support for declaring independence" },
        { id: "C", text: "Celebrations of conquests over Native nations" },
        { id: "D", text: "Heightened tensions between northern and southern colonies" },
      ],
      correctOptionId: "A",
      explanation:
        "Images glorifying Washington's leadership helped unify Americans around revolutionary ideals and symbols of national pride.",
      source: "Charles Willson Peale, George Washington at the Battle of Princeton, 1779",
    },
    {
      id: "3-9-q63",
      prompt: "Which development best explains the proliferation of images of Washington after the Revolution?",
      stimulus: washingtonPrincetonPainting,
      options: [
        { id: "A", text: "Belief that political power should be inherited" },
        { id: "B", text: "Campaign tactics that embraced partisan imagery" },
        { id: "C", text: "Americans' desire to cultivate a distinct national culture" },
        { id: "D", text: "Refusal by former Loyalists to accept the war's outcome" },
      ],
      correctOptionId: "C",
      explanation:
        "Americans used portraits of Washington to craft a unique civic culture separate from Britain and to celebrate republican values.",
      source: "Charles Willson Peale, George Washington at the Battle of Princeton, 1779",
    },
    {
      id: "3-9-q64",
      prompt: "Which trend best explains the dramatic population increase in states such as Kentucky and Tennessee between 1790 and 1800?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "Rapid migration of settlers into newly opened western lands" },
        { id: "B", text: "A surge of indentured servants into Virginia and Maryland" },
        { id: "C", text: "Legal limitations on the international slave trade to the Carolinas" },
        { id: "D", text: "The rise of large industrial cities in Georgia" },
      ],
      correctOptionId: "A",
      explanation:
        "High growth rates in interior states reveal heavy migration by White settlers seeking fresh land beyond the Appalachians.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
    {
      id: "3-9-q65",
      prompt: "What does the racial composition of Kentucky and Tennessee in 1800 suggest about their economies?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "African Americans were relocating from the Deep South to the North." },
        { id: "B", text: "Older states like Virginia relied mainly on subsistence farming." },
        { id: "C", text: "Newly settled western states depended less on enslaved labor than coastal plantation regions." },
        { id: "D", text: "Enslavement was rapidly disappearing across the South." },
      ],
      correctOptionId: "C",
      explanation:
        "Lower percentages of African Americans in frontier states indicate a smaller plantation presence and greater reliance on small farms.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
    {
      id: "3-9-q66",
      prompt: "South Carolina's racial percentages in 1800 most directly reflect which development?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "Abundant land available for subsistence settlement" },
        { id: "B", text: "Expansion of plantation slavery in the Deep South" },
        { id: "C", text: "Growth of textile manufacturing in the region" },
        { id: "D", text: "Reliance on immigrant wage labor" },
      ],
      correctOptionId: "B",
      explanation:
        "A large enslaved population supported South Carolina's plantation economy, especially rice and indigo cultivation along the coast.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
  ],
  "3.11": [
    {
      id: "3-11-q1",
      prompt: "Which of the following best explains a result of the Seven Years' War (French and Indian War)?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "France sold the Louisiana Territory to Great Britain." },
        { id: "B", text: "Great Britain gained a claim to land extending to the Mississippi River." },
        { id: "C", text: "Great Britain and Spain established an alliance." },
        { id: "D", text: "British influence over its North American colonies decreased." },
      ],
      correctOptionId: "B",
      explanation:
        "The Treaty of Paris (1763) forced France to cede its mainland possessions east of the Mississippi, giving Britain sweeping claims in the trans-Appalachian West.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-11-q2",
      prompt: "Britain's victory in the Seven Years' War (French and Indian War) had which economic consequence for its American colonies?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "Granting select colonists a monopoly over the fur trade" },
        { id: "B", text: "Funding canals that linked the Great Lakes to the East Coast" },
        { id: "C", text: "Increasing taxes on colonial goods to retire war debt" },
        { id: "D", text: "Forcing merchants to supply the Royal Navy without pay" },
      ],
      correctOptionId: "C",
      explanation:
        "With war debts soaring, Parliament turned to colonial revenue measures like the Sugar Act and Stamp Act, intensifying taxation of trade and printed goods.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-11-q3",
      prompt: "The conclusion of the Seven Years' War (French and Indian War) had which effect on Native American societies?",
      stimulus: andersonExcerpt,
      options: [
        { id: "A", text: "Native allies of Britain became eligible for citizenship rights." },
        { id: "B", text: "Britain and France forced Native peoples west of the Mississippi." },
        { id: "C", text: "Native nations gained control of the western fur trade." },
        { id: "D", text: "Britain tried to restrict westward settlement to limit conflict." },
      ],
      correctOptionId: "D",
      explanation:
        "The British government issued the Proclamation of 1763 to halt colonial expansion past the Appalachians in hopes of containing violence with Native nations.",
      source: "Fred Anderson, The War That Made America, 2005",
    },
    {
      id: "3-11-q4",
      prompt: "In the excerpt, Otis was responding to which development?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "Publication of Thomas Paine's Common Sense" },
        { id: "B", text: "Threats of a French invasion of British North America" },
        { id: "C", text: "Widespread boycotts of imported British goods" },
        { id: "D", text: "British efforts to pay Seven Years' War debts through new taxes" },
      ],
      correctOptionId: "D",
      explanation:
        "Otis protested Parliament's postwar taxation program, arguing that levies like the Sugar and Stamp Acts violated colonists' constitutional rights.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-11-q5",
      prompt: "Which of the following was a major purpose of Otis's pamphlet?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "Recruit foreign allies for the colonial cause" },
        { id: "B", text: "Encourage resistance to Parliament's regulation of colonial commerce" },
        { id: "C", text: "Propose sending colonial delegates to sit in Parliament" },
        { id: "D", text: "Advocate immediate colonial independence from Great Britain" },
      ],
      correctOptionId: "B",
      explanation:
        "Otis insisted that only colonial representatives could consent to taxes or trade duties, inviting opposition to Parliament's mercantilist controls.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-11-q6",
      prompt: "By the 1770s, Otis's argument that the colonies 'must obey' Parliament would most appeal to which group?",
      stimulus: otisExcerpt,
      options: [
        { id: "A", text: "New England farmers" },
        { id: "B", text: "Loyalists in New York" },
        { id: "C", text: "Enslaved people in the southern colonies" },
        { id: "D", text: "Urban artisans in port cities" },
      ],
      correctOptionId: "B",
      explanation:
        "Loyalists prioritized imperial stability and were willing to accept Parliament's authority even as they questioned specific policies.",
      source: "James Otis, The Rights of the British Colonies Asserted and Proved, 1764",
    },
    {
      id: "3-11-q7",
      prompt: "Colonists in the 1770s most likely read Locke's excerpt as a call to reject which idea?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "Holding private property" },
        { id: "B", text: "Establishing representative democracy" },
        { id: "C", text: "Accepting the divine right of kings" },
        { id: "D", text: "Creating organized political parties" },
      ],
      correctOptionId: "C",
      explanation:
        "Locke's natural-rights philosophy directly challenged monarchy justified by divine authority, bolstering revolutionary critiques of King George III.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-11-q8",
      prompt: "During the American Revolution, Locke's purpose in the excerpt would most likely be interpreted as promoting a government based on",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "Natural rights" },
        { id: "B", text: "Military rule" },
        { id: "C", text: "Hereditary privilege" },
        { id: "D", text: "Religious authority" },
      ],
      correctOptionId: "A",
      explanation:
        "Locke argued that legitimate government rests on protecting life, liberty, and property, the very ideals American revolutionaries cited.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-11-q9",
      prompt: "Interpretations of Locke's assertions about freedom and equality most directly influenced which development?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "Colonial grievances during the Seven Years' War" },
        { id: "B", text: "Patriot political rhetoric during the Revolution" },
        { id: "C", text: "Ending American participation in the slave trade" },
        { id: "D", text: "Demands to settle beyond the frontier boundaries" },
      ],
      correctOptionId: "B",
      explanation:
        "Patriot leaders drew on Locke's emphasis on equality and consent to justify resistance to British rule and to frame independence as a natural right.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-11-q10",
      prompt: "Historians could best use Locke's excerpt as evidence for which topic?",
      stimulus: lockeExcerpt,
      options: [
        { id: "A", text: "The impact of Enlightenment thought on Revolutionary politics" },
        { id: "B", text: "Use of pamphlets to mobilize colonial boycotts" },
        { id: "C", text: "African American petitions for freedom during the war" },
        { id: "D", text: "Influence of the American Revolution on overseas republicanism" },
      ],
      correctOptionId: "A",
      explanation:
        "Locke was a foundational Enlightenment thinker, and his writings illustrate the intellectual roots of Patriot arguments about rights and sovereignty.",
      source: "John Locke, Two Treatises of Government, 1689",
    },
    {
      id: "3-11-q11",
      prompt: "The first paragraph of the petition makes which claim?",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Slavery should encourage conversion to Christianity." },
        { id: "B", text: "Independence should be limited to White men." },
        { id: "C", text: "All people possess the same inherent liberties." },
        { id: "D", text: "Revolutionary ideals should apply to foreign nations." },
      ],
      correctOptionId: "C",
      explanation:
        "The petitioners assert that God granted natural, inalienable rights equally to all humanity, undermining arguments that justify enslavement.",
      source: "Petition to the Massachusetts state legislature, 1777",
    },
    {
      id: "3-11-q12",
      prompt: "The second paragraph of the petition urges the Massachusetts legislature to",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Allow enslaved Africans to enlist in the militia" },
        { id: "B", text: "Negotiate a peaceful settlement with Britain" },
        { id: "C", text: "Draft a constitution defining natural rights for enslaved people" },
        { id: "D", text: "Abolish slavery and free people once they reach adulthood" },
      ],
      correctOptionId: "D",
      explanation:
        "The petition seeks legislation that restores natural freedom, including freeing children born in Massachusetts when they turn twenty-one.",
      source: "Petition to the Massachusetts state legislature, 1777",
    },
    {
      id: "3-11-q13",
      prompt: "Which statement best describes the overall argument of the petition?",
      stimulus: massPetitionExcerpt,
      options: [
        { id: "A", text: "Slavery was not economically important in New England." },
        { id: "B", text: "Slavery contradicts the ideals of the American Revolution." },
        { id: "C", text: "Enslaved Africans should be rewarded for loyalty to Britain." },
        { id: "D", text: "Enslaved Africans should be colonized back to Africa." },
      ],
      correctOptionId: "B",
      explanation:
        "Petitioners highlight the hypocrisy of fighting for liberty while denying freedom to African Americans, urging legislators to align policy with Revolutionary rhetoric.",
      source: "Petition to the Massachusetts state legislature, 1777",
    },
    {
      id: "3-11-q14",
      prompt: "According to Wood, which evidence supports his argument about state power under the Confederation?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "Foundational political documents written during the Revolution" },
        { id: "B", text: "Journals kept by Continental Army officers" },
        { id: "C", text: "Arguments from The Federalist papers" },
        { id: "D", text: "Treaties signed with Britain and France" },
      ],
      correctOptionId: "A",
      explanation:
        "Wood cites the Declaration of Independence and the Articles themselves as proof that the states retained full sovereignty despite creating a Confederation Congress.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-11-q15",
      prompt: "Which evidence does Wood use to emphasize state independence?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "States could nullify the laws of their neighbors." },
        { id: "B", text: "The central government alone could declare war." },
        { id: "C", text: "States lacked the capacity to collect taxes." },
        { id: "D", text: "Congress could only recommend, not enforce, its resolutions." },
      ],
      correctOptionId: "D",
      explanation:
        "Wood notes that congressional measures were merely recommendations, leaving enforcement entirely to the states and demonstrating national weakness.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-11-q16",
      prompt: "The failure of the Articles of Confederation led to which development?",
      stimulus: woodExcerpt,
      options: [
        { id: "A", text: "Immediate removal of property qualifications for White male voters" },
        { id: "B", text: "Bans on women's political participation under republican motherhood" },
        { id: "C", text: "Ratification of a constitution with a stronger central government" },
        { id: "D", text: "Passage of the Northwest Ordinance admitting new states" },
      ],
      correctOptionId: "C",
      explanation:
        "Recognizing the Confederation's weaknesses, delegates designed and ratified the U.S. Constitution to create a national government with real enforcement power.",
      source: "Gordon S. Wood, The Creation of the American Republic, 1969",
    },
    {
      id: "3-11-q17",
      prompt: "Which claim does Hamilton make about the United States under the Articles of Confederation?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "The nation could not conduct diplomacy with foreign powers." },
        { id: "B", text: "The government lacked authority to raise sufficient revenue." },
        { id: "C", text: "The United States could act without unanimous state consent." },
        { id: "D", text: "The nation could easily raise enough troops to defend itself." },
      ],
      correctOptionId: "B",
      explanation:
        "Hamilton argues that Congress could only request money from the states and had no direct power to tax citizens, leaving the treasury empty.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-11-q18",
      prompt: "Hamilton claims that state sovereignty under the Articles resulted in which outcome?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "Greater unity throughout the United States" },
        { id: "B", text: "Guaranteed protections for American liberties" },
        { id: "C", text: "An emphasis on serving the common good" },
        { id: "D", text: "States ignoring the requests of the central government" },
      ],
      correctOptionId: "D",
      explanation:
        "Because Congress could not compel compliance, each state followed its immediate interests and disregarded national resolutions whenever inconvenient.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-11-q19",
      prompt: "What overall argument does Hamilton advance about the Articles of Confederation?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "Invite other nations to ally under the Articles." },
        { id: "B", text: "Adopt the Articles as the permanent U.S. constitution." },
        { id: "C", text: "Raise voluntary donations to fix the Articles' flaws." },
        { id: "D", text: "Abandon the Articles and create a stronger central government." },
      ],
      correctOptionId: "D",
      explanation:
        "Hamilton insists that only a new constitution with direct authority over citizens can solve the Confederation's enforcement and revenue problems.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-11-q20",
      prompt: "Which piece of evidence does Hamilton use to support his argument?",
      stimulus: hamiltonFederalist15Excerpt,
      options: [
        { id: "A", text: "European leagues of independent states quickly collapsed." },
        { id: "B", text: "The United States could already mandate taxes under the Articles." },
        { id: "C", text: "People believed states would obey every congressional directive." },
        { id: "D", text: "States regularly formed alliances to reach shared goals." },
      ],
      correctOptionId: "A",
      explanation:
        "Hamilton cites the failures of earlier European confederations to show that agreements based only on good faith inevitably fall apart.",
      source: "Alexander Hamilton, The Federalist No. 15, 1787",
    },
    {
      id: "3-11-q21",
      prompt: "Dickinson's concern for 'mischiefs' in the states is best understood in which context?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "Popular support for crowning George Washington" },
        { id: "B", text: "Overly powerful executives in the states" },
        { id: "C", text: "Renewed warfare between states and Great Britain" },
        { id: "D", text: "Threats posed by popular uprisings such as Shays' Rebellion" },
      ],
      correctOptionId: "D",
      explanation:
        "Recent unrest, most notably Shays' Rebellion, convinced many delegates that unchecked state governments could not control internal disorder.",
      source: "John Dickinson speech summarized in James Madison's notes, Constitutional Convention, 1787",
    },
    {
      id: "3-11-q22",
      prompt: "The principle of federalism in the U.S. Constitution most closely resembled which aspect of earlier British colonial government?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "Autonomy of colonial legislatures from British interference" },
        { id: "B", text: "Lack of colonial representation in Parliament" },
        { id: "C", text: "Imperial enforcement of trade regulations" },
        { id: "D", text: "Royal authority over colonial governors" },
      ],
      correctOptionId: "A",
      explanation:
        "Before 1763 many colonies enjoyed de facto self-government, a balance that the framers echoed by preserving significant powers for the states.",
      source: "John Dickinson speech summarized in James Madison's notes, Constitutional Convention, 1787",
    },
    {
      id: "3-11-q23",
      prompt: "How did the framers initially respond to abuses of executive authority by the British monarch?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "Empowering the Supreme Court to veto treaties" },
        { id: "B", text: "Establishing separation of powers between Congress and the president" },
        { id: "C", text: "Mandating direct popular election of the president" },
        { id: "D", text: "Prohibiting the president from limiting basic rights" },
      ],
      correctOptionId: "B",
      explanation:
        "Fearful of executive tyranny, the framers divided authority among branches so Congress could check presidential power, unlike Britain under George III.",
      source: "John Dickinson speech summarized in James Madison's notes, Constitutional Convention, 1787",
    },
    {
      id: "3-11-q24",
      prompt: "Dickinson's desire to preserve 'a certain degree of agency' for states is best explained by which development?",
      stimulus: dickinsonConventionExcerpt,
      options: [
        { id: "A", text: "George Washington's personal popularity" },
        { id: "B", text: "Retention of regional cultural identities alongside national unity" },
        { id: "C", text: "Hamilton's financial reform proposals" },
        { id: "D", text: "Difficulty funding infrastructure projects" },
      ],
      correctOptionId: "B",
      explanation:
        "Citizens still identified strongly with their state or region, so Dickinson argued for a system that allowed local self-government within a broader union.",
      source: "John Dickinson speech summarized in James Madison's notes, Constitutional Convention, 1787",
    },
    {
      id: "3-11-q25",
      prompt: "Why did Washington warn the public about political parties?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "He feared parties would create national divisions." },
        { id: "B", text: "He believed parties improved economic performance." },
        { id: "C", text: "He thought parties could only exist in republics." },
        { id: "D", text: "He argued parties encouraged foreign interference." },
      ],
      correctOptionId: "A",
      explanation:
        "Washington cautioned that alternating factional dominance would foster revenge and despotism, undermining the fragile young republic.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-11-q26",
      prompt: "Which situation best explains why Washington warned against foreign alliances?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "Nations refused to sign commercial agreements with the United States." },
        { id: "B", text: "Britain and France were at war, threatening U.S. interests." },
        { id: "C", text: "Parties at home forced him to adopt neutrality." },
        { id: "D", text: "European empires had already withdrawn from the Americas." },
      ],
      correctOptionId: "B",
      explanation:
        "With Britain and France fighting the Napoleonic Wars, aligning with either power risked entangling the United States in European conflicts.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-11-q27",
      prompt: "Supporters of Washington's comments would most likely endorse which foreign policy?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "Building a large standing army" },
        { id: "B", text: "Aggressively expanding U.S. territory" },
        { id: "C", text: "Forming permanent mutual-defense alliances" },
        { id: "D", text: "Maintaining broad economic relationships without entangling alliances" },
      ],
      correctOptionId: "D",
      explanation:
        "Washington favored commercial ties with many nations while avoiding political commitments that could drag the republic into wars.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-11-q28",
      prompt: "Washington's guidance on foreign relations reflects which reality facing the United States?",
      stimulus: washingtonFarewellExcerpt,
      options: [
        { id: "A", text: "Need to build export industries" },
        { id: "B", text: "Desire to encourage European immigration" },
        { id: "C", text: "Continued European colonial presence along U.S. borders" },
        { id: "D", text: "Challenge of spreading revolutionary ideals abroad" },
      ],
      correctOptionId: "C",
      explanation:
        "Britain in Canada and Spain in Florida and the Southwest still bordered the republic, so avoiding entanglements helped prevent border conflicts.",
      source: "George Washington, Farewell Address, 1796",
    },
    {
      id: "3-11-q29",
      prompt: "Which development best explains Peale's depiction of George Washington in the painting?",
      stimulus: washingtonPrincetonPainting,
      options: [
        { id: "A", text: "Growth of a shared American identity among Patriots" },
        { id: "B", text: "Efforts to win support for declaring independence" },
        { id: "C", text: "Desire to commemorate conquests over Native Americans" },
        { id: "D", text: "Rising tensions between northern and southern colonies" },
      ],
      correctOptionId: "A",
      explanation:
        "Heroic portraits of Washington fostered unity and pride, helping Patriots craft a common national identity around Revolutionary leaders.",
      source: "Charles Willson Peale, George Washington at the Battle of Princeton, 1779",
    },
    {
      id: "3-11-q30",
      prompt: "Which development best explains the spread of Washington's image after the Revolution?",
      stimulus: washingtonPrincetonPainting,
      options: [
        { id: "A", text: "Republican belief that political power should be inherited" },
        { id: "B", text: "Rise of partisan campaign imagery" },
        { id: "C", text: "Desire to create a new national culture distinct from Britain" },
        { id: "D", text: "Former Loyalists' refusal to accept the war's outcome" },
      ],
      correctOptionId: "C",
      explanation:
        "Americans circulated Washington portraits to build civic myths and symbols that differentiated the new nation from its colonial past.",
      source: "Charles Willson Peale, George Washington at the Battle of Princeton, 1779",
    },
    {
      id: "3-11-q31",
      prompt: "What does the population percent increase from 1790 to 1800 most likely indicate?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "Rapid migration into newly settled states such as Kentucky and Tennessee" },
        { id: "B", text: "Rising indentured servitude in Virginia and Maryland" },
        { id: "C", text: "Restriction of the international slave trade to the Carolinas" },
        { id: "D", text: "Creation of new industrial cities in Georgia" },
      ],
      correctOptionId: "A",
      explanation:
        "Explosive growth in Kentucky and Tennessee reflects settlers pouring into western lands opened after the Revolution.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
    {
      id: "3-11-q32",
      prompt: "The racial composition of the states listed most strongly suggests which development?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "African Americans were moving from the South to the North." },
        { id: "B", text: "Subsistence farms dominated in Virginia and Maryland." },
        { id: "C", text: "Newly settled states such as Kentucky and Tennessee relied less on enslaved labor." },
        { id: "D", text: "Enslaved labor was disappearing throughout the South." },
      ],
      correctOptionId: "C",
      explanation:
        "Lower African American percentages in Kentucky and Tennessee show that small farms and mixed agriculture prevailed on the frontier, unlike coastal plantation zones.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
    {
      id: "3-11-q33",
      prompt: "South Carolina's racial percentages most directly suggest which trend?",
      stimulusTable: southernStatePopulationTable,
      options: [
        { id: "A", text: "Abundant land for small freehold settlement in the Deep South" },
        { id: "B", text: "Expansion of plantation slavery in the Deep South" },
        { id: "C", text: "Growth of textile manufacturing in southern cities" },
        { id: "D", text: "Heavy reliance on immigrant wage labor" },
      ],
      correctOptionId: "B",
      explanation:
        "Nearly equal White and African American populations in South Carolina highlight how rice and indigo plantations required large enslaved workforces.",
      source: "U.S. Census, Historical Statistics of the United States, 1975",
    },
  ],
};


