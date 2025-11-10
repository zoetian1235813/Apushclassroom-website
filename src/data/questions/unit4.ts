import { TopicQuestionBank } from "../../types/questions";

/* =========================
   Existing Stimuli (from your file)
   ========================= */

const harrietJacobsExcerpt = `
<p><em>Harriet Ann Jacobs, <cite>Incidents in the Life of a Slave Girl</cite>, 1861</em></p>
<blockquote>
  &ldquo;Not far from this time Nat Turner's insurrection broke out; and the news threw our town into great commotion. &hellip; It was always the custom to have a muster every year. On that occasion every White man shouldered his musket. The citizens and the so-called country gentlemen wore military uniforms. &hellip; It was a grand opportunity for the low Whites, who had no Negroes of their own to scourge. They exulted in such a chance to exercise a little brief authority, and show their subserviency to the slaveholders; not reflecting that the power which trampled on the colored people also kept themselves in poverty, ignorance, and moral degradation.&rdquo;
</blockquote>
`;

const websterExcerpt = `
<p><em>Noah Webster, Preface to <cite>An American Dictionary of the English Language</cite>, 1828</em></p>
<blockquote>
  &ldquo;It is not only important, but, in a degree necessary, that the people of this country, should have an American Dictionary of the English language; for, although the body of the language is the same as in England, &hellip; yet some differences must exist. Language is the expression of ideas; and if the people of one country cannot preserve an identity of ideas, they cannot retain an identity of language.&rdquo;
</blockquote>
`;

const calhounExcerpt = `
<p><em>John C. Calhoun, speech in the United States Senate, 1837</em></p>
<blockquote>
  &ldquo;Abolition and the Union cannot coexist. As the friend of the Union, I openly proclaim it. &hellip; We of the South will not, cannot, surrender our institutions. To maintain the existing relations between the two races, inhabiting that section of the Union, is indispensable to the peace and happiness of both.&rdquo;
</blockquote>
`;

const clayExcerpt = `
<p><em>Henry Clay, speech in the House of Representatives, 1824</em></p>
<blockquote>
  &ldquo;The creation of a home market is not only necessary to procure for our agriculture a just reward of its labors, but it is indispensable to obtain a supply of our necessary wants. &hellip; Let our arts breathe under the shade of protection; let them be perfected as they are in England, and then we shall be ready to put aside protection, and enter upon the freest exchanges.&rdquo;
</blockquote>
`;

const jeffersonTripoliExcerpt = `
<p><em>Thomas Jefferson, orders to United States naval commanders, 1802</em></p>
<blockquote>
  &ldquo;You are hereby authorized and directed to subdue, seize, and make prize, of all vessels, goods, and effects, belonging to the Bey of Tripoli, or to his subjects, and to bring or send the same into port, to be proceeded against and distributed according to law.&rdquo;
</blockquote>
`;

const madisonAmendmentExcerpt = `
<p><em>James Madison, proposed constitutional amendment, 1803</em></p>
<blockquote>
  &ldquo;Louisiana as ceded by France is made part of the United States. Congress may make part of the United States other adjacent territories which shall be justly acquired.&rdquo;
</blockquote>
`;

const jacksonVetoExcerpt = `
<p><em>Andrew Jackson, Veto Message Regarding the Bank of the United States, 1832</em></p>
<blockquote>
  &ldquo;Many of our rich men have not been content with equal protection and equal benefits, but have besought us to make them richer by act of Congress. By attempting to gratify their desires we have in the results of our legislation arrayed section against section, interest against interest, and man against man.&rdquo;
</blockquote>
`;

const temperanceExcerpt = `
<p><em>American Temperance Society, introductory report, 1835</em></p>
<blockquote>
  &ldquo;The great increase of drunkenness &hellip; led a number of philanthropic individuals to consult together upon the duty of making more united, systematic, and extended efforts for the prevention of this evil. Its cause was at once seen to be, the use of intoxicating liquor; and its appropriate remedy, abstinence.&rdquo;
</blockquote>
`;

const lowellExcerpt = `
<p><em>Harriet Hanson Robinson, reminiscence of the Lowell strike, 1836</em></p>
<blockquote>
  &ldquo;When it was announced that the wages were to be cut down, great indignation was felt, and it was decided to strike, en masse. The mills were shut down, and the girls went in procession &hellip; and listened to 'incendiary' speeches from early labor reformers.&rdquo;
</blockquote>
`;

const erieCanalExcerpt = `
<p><em>Carol Sheriff, <cite>The Artificial River</cite>, 1996</em></p>
<blockquote>
  &ldquo;Part of the larger transportation revolution, the Erie Canal played a major role in the transformation of the young Republic's geography and economy and helped set off the industrial and marketing revolutions that swept across the northern United States early in the nineteenth century.&rdquo;
</blockquote>
`;

/* =========================
   New Progress Check Stimuli for 4.12
   ========================= */

const jeffersonInauguralExcerpt = `
<p><em>Thomas Jefferson, first inaugural address, 1801</em></p>
<blockquote>
  &ldquo;Let us, then, with courage and confidence, pursue our own Federal and [Democratic-] Republican principles, our attachment to union and representative government. Kindly separated by nature and a wide ocean from the exterminating havoc of one quarter of the globe; too high-minded to endure the degradations of the others; possessing a chosen country, with room enough for our descendants . . . ; entertaining a due sense of our equal right to the use of our own faculties, to the acquisitions of our own industry, to honor and confidence from our fellow citizens, resulting not from birth, but from our actions and their sense of them; enlightened by a benign religion . . . -with all these blessings, what more is necessary to make us a happy and a prosperous people? Still one thing more, fellow citizens-a wise and frugal Government, which shall restrain men from injuring one another, shall leave them otherwise free to regulate their own pursuits of industry and improvement, and shall not take from the mouth of labor the bread it has earned. This is the sum of good government; and this is necessary to close the circle of our felicities.&rdquo;
</blockquote>
`;

const canalPetitionExcerpt = `
<p><em>The Chesapeake and Delaware Canal Company, petition to the United States Congress, 1809</em></p>
<blockquote>
  &ldquo;The island of Great Britain furnishes proof of the advantages of canals, beyond any other country. That nation has now become the maritime rival, and almost controller of every commercial people; her superiority has arisen from her unbounded commerce, and the vast wealth it has introduced, the basis of which wealth is her immense manufactures . . . : the foundation of these manufactures has again been formed by her internal improvements. . . . The United States, both from their present political and natural situation, demand from their government every aid it can furnish. . . . [We must] improve internal strength, supply wants by our own products and manufactures, and extend agriculture so as to gain from its surplus the wealth of other nations.&rdquo;
</blockquote>
`;

const redJacketExcerpt = `
<p><em>Red Jacket (Seneca, Iroquois), speech to a missionary and a U.S. diplomat, 1805</em></p>
<blockquote>
  &ldquo;There was a time when our forefathers owned this great land . . . Your forefathers crossed the great water and landed upon this land. . . . We gave them corn and meat; they gave us poison in return. . . . You have got our country, but are not satisfied; you want to force your religion upon us. . . . The Great Spirit has made us all, but he has made a great difference between his white and red children. . . . Why may we not conclude that he has given us a different religion according to our understanding?&rdquo;
</blockquote>
`;

const wilentzJacksonExcerpt = `
<p><em>Sean Wilentz, historian, <cite>The Rise of American Democracy: Jefferson to Lincoln</cite>, 2005</em></p>
<blockquote>
  &ldquo;Jackson truly believed that, compared to his predecessors’ combination of high-minded rhetoric, treachery, and abandonment, his Indian policy was ‘just and humane.’ . . . Jackson’s paternalism was predicated on his assumption . . . that all Indians were inferior to all whites. . . . Removal invited speculators, who wound up buying between 80 and 90 percent of the land owned by Indians who wished to stay at a fraction of its actual worth. . . . Bereft of long-term planning and a full-scale federal commitment, the realities of Indian removal belied Jackson’s rhetoric. Although the worst suffering was inflicted after he left office, Jackson cannot escape responsibility for setting in motion an insidious policy that uprooted tens of thousands.&rdquo;
</blockquote>
`;

const bryantLiteratureExcerpt = `
<p><em>William Cullen Bryant, book review in the <cite>North American Review</cite>, 1818</em></p>
<blockquote>
  &ldquo;National gratitude&mdash;national pride&mdash;every high and generous feeling that attaches us to the land of our birth . . . ask[s] of us that we should foster the literature of our country. . . . The poetry of the United States . . . is yet even better than it could have been expected . . . considering that our nation has scarcely seen two centuries since its founders erected their cabins on its soil. . . . The fondness for literature is fast increasing in our country . . . Popular English works are often reprinted . . . What should hinder our native works, if equal in merit, from meeting an equally favorable reception?&rdquo;
</blockquote>
`;

const howeEvangelicalExcerpt = `
<p><em>Daniel Walker Howe, historian, <cite>What Hath God Wrought: The Transformation of America, 1815–1848</cite>, 2007</em></p>
<blockquote>
  &ldquo;The laity saw to it that the Second Great Awakening exerted much of its influence through purposeful voluntary associations . . . the ‘Evangelical United Front’ or ‘Benevolent Empire.’ . . . Reformers reconceived the prison as corrective function, as a ‘penitentiary’ or ‘reformatory.’ . . . Christians who had achieved self-liberation and self-control through conversion often turned to a concern with the liberation and discipline of others. . . . The Evangelical United Front organized its voluntary associations on a national level . . . employing more people and raising more money than the Post Office.&rdquo;
</blockquote>
`;

const campPleasureExcerpt = `
<p><em>Stephanie M. H. Camp, historian, <cite>Closer to Freedom: Enslaved Women and Everyday Resistance in the Plantation South</cite>, 2004</em></p>
<blockquote>
  &ldquo;Planters . . . were very interested in the control of black movement . . . and to master their slaves’ senses of pleasure. . . . Some planters used plantation parties as a paternalist mechanism of social control . . . intended to seem benevolent and to inspire obedience. . . . Yet again and again, slaves sought out illicit, secular gatherings of their own creation . . . Such exhilarating pleasure . . . must be understood as important and meaningful enjoyment, as personal expression, and as oppositional.&rdquo;
</blockquote>
`;

const johnsonCottonExcerpt = `
<p><em>Walter Johnson, historian, <cite>River of Dark Dreams: Slavery and Empire in the Cotton Kingdom</cite>, 2013</em></p>
<blockquote>
  &ldquo;M. W. Phillips condemned planters before whom ‘everything has to bend [and] give way to large crops of cotton.’ . . . He imagined the cotton economy in terms of flows of energy, nutrients, and fertility . . . being expended at an unsustainable rate . . . an onrushing ecological catastrophe. . . . Phillips was arguing that the slaveholding South needed to slow the rate at which it was converting human beings into cotton plants.&rdquo;
</blockquote>
`;

/* =========================
   Topic Question Bank (existing topics preserved)
   ========================= */

export const unit4TopicQuestions: TopicQuestionBank = {
  "4.1": [
    {
      id: "4-1-q6",
      prompt:
        "The national identity described in the excerpt most strongly reflects the influence of which development?",
      stimulus: websterExcerpt,
      options: [
        { id: "A", text: "European precedents combined with a distinct American culture" },
        { id: "B", text: "The English feudal system in which lords dominated vassals" },
        { id: "C", text: "Independence movements in Europe and Latin America" },
        { id: "D", text: "Antislavery activism in the Atlantic world" }
      ],
      correctOptionId: "A",
      explanation:
        "Webster blended English linguistic roots with uniquely American institutions to argue for a distinct national identity.",
      source:
        "Noah Webster, Preface to An American Dictionary of the English Language, 1828"
    },
    {
      id: "4-1-q7",
      prompt:
        "According to the excerpt, which factor most distinguished the American identity from that of other nations?",
      stimulus: websterExcerpt,
      options: [
        { id: "A", text: "Enthusiasm for imitating English practices" },
        { id: "B", text: "Movement toward establishing a capitalist economy" },
        { id: "C", text: "Expanded civic roles for women" },
        { id: "D", text: "Importance of liberal ideas about natural rights and liberties" }
      ],
      correctOptionId: "D",
      explanation:
        "Webster insisted that American political terms reflected republican commitments to liberty and natural rights.",
      source:
        "Noah Webster, Preface to An American Dictionary of the English Language, 1828"
    },
    {
      id: "4-1-q8",
      prompt: "The excerpt best reflects which historical situation in the early 1800s?",
      stimulus: websterExcerpt,
      options: [
        { id: "A", text: "Innovations of the market revolution creating new wealth" },
        { id: "B", text: "Emergence of a distinctive American culture" },
        { id: "C", text: "Transition to a more participatory democracy" },
        { id: "D", text: "Growth of reading literacy among Americans" }
      ],
      correctOptionId: "B",
      explanation:
        "Calls for an American dictionary reflected cultural nationalism and the desire to define a separate identity from Britain.",
      source:
        "Noah Webster, Preface to An American Dictionary of the English Language, 1828"
    },
    {
      id: "4-1-q16",
      prompt:
        "The purpose expressed in the excerpt most likely promoted which policy goal?",
      stimulus: jeffersonTripoliExcerpt,
      options: [
        { id: "A", text: "Expanding suffrage rights to all White men" },
        { id: "B", text: "Challenging Great Britain's control of Canada" },
        { id: "C", text: "Using overseas commerce to extend United States influence" },
        { id: "D", text: "Investing in technology to speed ocean voyages" }
      ],
      correctOptionId: "C",
      explanation:
        "Jefferson sought to protect American trade in the Mediterranean, linking naval action to commercial power.",
      source: "Thomas Jefferson, naval orders, 1802"
    },
    {
      id: "4-1-q17",
      prompt:
        "Historians could best use the excerpt to study the origins of which later development?",
      stimulus: jeffersonTripoliExcerpt,
      options: [
        { id: "A", text: "Creation of the Monroe Doctrine" },
        { id: "B", text: "Approval of the Louisiana Purchase" },
        { id: "C", text: "Abolition of the international slave trade" },
        { id: "D", text: "Passage of the Missouri Compromise" }
      ],
      correctOptionId: "A",
      explanation:
        "Jefferson's assertion of American rights overseas foreshadowed later doctrines defending U.S. interests in defined spheres.",
      source: "Thomas Jefferson, naval orders, 1802"
    },
    {
      id: "4-1-q18",
      prompt:
        "President Jefferson most likely pursued the actions described in the excerpt for which reason?",
      stimulus: jeffersonTripoliExcerpt,
      options: [
        { id: "A", text: "Establishing new trade routes" },
        { id: "B", text: "Expanding the size of the navy" },
        { id: "C", text: "Supporting alliances with European nations" },
        { id: "D", text: "Creating United States colonies overseas" }
      ],
      correctOptionId: "A",
      explanation:
        "The orders targeted Barbary corsairs threatening U.S. merchants, underscoring the goal of securing trade routes.",
      source: "Thomas Jefferson, naval orders, 1802"
    }
  ],
  "4.2": [
    {
      id: "4-2-q1",
      prompt:
        "The rise in manufacturing beginning in the early 1800s eventually resulted in which of the following by 1848?",
      options: [
        { id: "A", text: "The emergence of a larger middle class in the North" },
        { id: "B", text: "A decline in economic inequality in urban areas" },
        { id: "C", text: "An increased demand for agricultural workers in the Midwest" },
        { id: "D", text: "The improvement of working conditions in factories" }
      ],
      correctOptionId: "A",
      explanation:
        "The growth in manufacturing in the northern and western portions of the United States in the early nineteenth century contributed to the emergence of a growing middle class, which made a living from trade and industry."
    }
  ],
  "4.3": [
    {
      id: "4-3-q1",
      prompt:
        "The rise in manufacturing beginning in the early 1800s most directly resulted in which development by 1848?",
      options: [
        { id: "A", text: "Emergence of a larger northern middle class" },
        { id: "B", text: "Decline in economic inequality in cities" },
        { id: "C", text: "Increased demand for agricultural workers in the Midwest" },
        { id: "D", text: "Improved factory working conditions" }
      ],
      correctOptionId: "A",
      explanation:
        "Industrial growth created new managerial and commercial roles that supported an expanding middle class in northern cities."
    },
    {
      id: "4-3-q12",
      prompt:
        "The excerpt could best be used by historians studying which topic in the early 1800s?",
      stimulus: clayExcerpt,
      options: [
        { id: "A", text: "Political debates over economic development" },
        { id: "B", text: "Lives of women working in new factories" },
        { id: "C", text: "Effects of new technologies on commerce" },
        { id: "D", text: "Value of British manufactured imports" }
      ],
      correctOptionId: "A",
      explanation:
        "Clay’s speech defended tariffs and industrial policy, capturing the era’s political disputes over economic development.",
      source: "Henry Clay, speech in Congress, 1824"
    },
    {
      id: "4-3-q13",
      prompt:
        "Opponents of Clay’s argument in the excerpt most likely claimed that his plan would",
      stimulus: clayExcerpt,
      options: [
        { id: "A", text: "Discourage factory production to protect artisans" },
        { id: "B", text: "Require expanding slavery to supply factory labor" },
        { id: "C", text: "Benefit one section of the country more than others" },
        { id: "D", text: "Encourage an increase in imports of British manufactured goods" }
      ],
      correctOptionId: "C",
      explanation:
        "Southern agriculturalists feared protective tariffs would raise prices on goods they needed, privileging northern industry.",
      source: "Henry Clay, speech in Congress, 1824"
    },
    {
      id: "4-3-q14",
      prompt:
        "Contemporaries interpreted Clay’s economic principles in the excerpt as supporting which idea?",
      stimulus: clayExcerpt,
      options: [
        {
          id: "A",
          text: "The sections of the United States should retain separate regional economies."
        },
        {
          id: "B",
          text: "Farmers across the United States should switch to manufacturing jobs."
        },
        {
          id: "C",
          text: "The United States should increase domestic manufacturing to promote prosperity."
        },
        {
          id: "D",
          text: "The United States should never engage in foreign commerce."
        }
      ],
      correctOptionId: "C",
      explanation:
        "Clay promoted the American System: protective tariffs and improvements to nurture domestic manufacturing.",
      source: "Henry Clay, speech in Congress, 1824"
    },
    {
      id: "4-3-q22",
      prompt:
        "Which factor best explains the migration trend that accompanied the rise of manufacturing in the North?",
      options: [
        { id: "A", text: "American Indian land claims prevented settlers from moving westward." },
        { id: "B", text: "Indentured servitude allowed impoverished Europeans to migrate." },
        { id: "C", text: "Southern cotton growth triggered large immigration to that region." },
        { id: "D", text: "Northern industrialization drew increased immigration to urban areas." }
      ],
      correctOptionId: "D",
      explanation:
        "Factories in northern cities demanded labor, encouraging immigrants to settle in industrial centers."
    },
    {
      id: "4-3-q24a",
      prompt:
        "Which thesis best evaluates how the market revolution affected the national economy between 1800 and 1848?",
      options: [
        {
          id: "A",
          text:
            "Manufacturing and transportation networks linked regional markets, expanding national commerce."
        },
        {
          id: "B",
          text:
            "The market revolution left regional economies isolated from one another."
        },
        {
          id: "C",
          text:
            "Economic development halted because the South rejected cash-crop agriculture."
        },
        {
          id: "D",
          text:
            "Technological innovation was confined to the Trans-Appalachian West."
        }
      ],
      correctOptionId: "A",
      explanation:
        "Improved production and transportation fostered interregional trade, creating a national market economy.",
      source: "AP U.S. History LEQ prompt on the market revolution"
    },
    {
      id: "4-3-q24b",
      prompt:
        "Which broader historical context best supports a response to the market revolution prompt?",
      options: [
        { id: "A", text: "Expansion of cotton production after the invention of the cotton gin" },
        { id: "B", text: "Decline of Atlantic trade in the mid-eighteenth century" },
        { id: "C", text: "Emergence of the Populist movement in the 1890s" },
        { id: "D", text: "Rise of American imperialism in the 1890s" }
      ],
      correctOptionId: "A",
      explanation:
        "Southern cotton supplied raw material for northern factories, illustrating interconnected regional economies.",
      source: "AP U.S. History LEQ prompt on the market revolution"
    },
    {
      id: "4-3-q24c",
      prompt:
        "Which evidence best supports an argument that the market revolution fostered an interconnected economy?",
      options: [
        {
          id: "A",
          text:
            "Construction of the Erie Canal linking Great Lakes trade to Atlantic ports"
        },
        { id: "B", text: "Creation of the Interstate Highway System in the 1950s" },
        { id: "C", text: "Use of joint-stock companies to colonize North America" },
        { id: "D", text: "Establishment of Spanish missions in California" }
      ],
      correctOptionId: "A",
      explanation:
        "The Erie Canal slashed transportation costs and tied western farmers to eastern markets.",
      source: "AP U.S. History LEQ prompt on the market revolution"
    },
    {
      id: "4-3-q34",
      prompt:
        "How did the growth of a market-based economy most directly influence gender roles in the early 1800s?",
      options: [
        { id: "A", text: "Paid employment for both sexes erased social inequalities." },
        { id: "B", text: "Commercialization encouraged society to abandon families." },
        { id: "C", text: "Separate spheres developed, with women confined to home and childcare." },
        { id: "D", text: "Families ceased to view the household as a refuge from economic pressures." }
      ],
      correctOptionId: "C",
      explanation:
        "Industrialization separated home and workplace, reinforcing the ideology of domesticity for women."
    },
    {
      id: "4-3-q39a",
      prompt: "Which claim is made in the excerpt about the Erie Canal?",
      stimulus: erieCanalExcerpt,
      options: [
        { id: "A", text: "The canal helped launch the northern market revolution." },
        { id: "B", text: "The canal halted industrialization by diverting investments." },
        { id: "C", text: "The canal convinced southerners to abandon slavery." },
        { id: "D", text: "The canal ended migration to the Old Northwest." }
      ],
      correctOptionId: "A",
      explanation:
        "Sheriff argued that the Erie Canal played a major role in sparking industrial and marketing revolutions in the North.",
      source: "Carol Sheriff, The Artificial River, 1996"
    },
    {
      id: "4-3-q39b",
      prompt:
        "How do the developments described in the excerpt relate to earlier trends?",
      stimulus: erieCanalExcerpt,
      options: [
        {
          id: "A",
          text:
            "They continued investments in internal improvements such as the National Road."
        },
        { id: "B", text: "They revived colonial dependence on indentured labor." },
        { id: "C", text: "They reversed Alexander Hamilton's economic policies." },
        { id: "D", text: "They ended the need for additional infrastructure projects." }
      ],
      correctOptionId: "A",
      explanation:
        "Canal construction built upon earlier infrastructure efforts aimed at expanding national commerce.",
      source: "Carol Sheriff, The Artificial River, 1996"
    },
    {
      id: "4-3-q39c",
      prompt:
        "Which evidence from 1800 to 1848 could support or modify the argument made in the excerpt?",
      stimulus: erieCanalExcerpt,
      options: [
        {
          id: "A",
          text:
            "Debates over federal funding for internal improvements such as the Bonus Bill"
        },
        { id: "B", text: "Passage of the Homestead Act in 1862" },
        {
          id: "C",
          text: "Creation of the Interstate Commerce Commission in 1887"
        },
        { id: "D", text: "Rise of corporate trusts in the Gilded Age" }
      ],
      correctOptionId: "A",
      explanation:
        "Political battles over funding canals and roads underscore the transformative role of transportation projects.",
      source: "Carol Sheriff, The Artificial River, 1996"
    }
  ],
  "4.4": [
    {
      id: "4-4-q23",
      prompt:
        "Which factor best explains the increase in White male suffrage in the early nineteenth century?",
      options: [
        { id: "A", text: "Reaction to widespread political protest" },
        { id: "B", text: "Resistance to increased federal taxation" },
        { id: "C", text: "Amendments to the United States Constitution" },
        { id: "D", text: "Relaxation of property ownership requirements" }
      ],
      correctOptionId: "D",
      explanation:
        "Most states removed property qualifications for voting, dramatically expanding suffrage for White men."
    },
    {
      id: "4-4-q25",
      prompt: "People who agreed with the excerpt most likely opposed which policy?",
      stimulus: jacksonVetoExcerpt,
      options: [
        { id: "A", text: "Expanding suffrage rights to most White men" },
        { id: "B", text: "Maintaining low tariffs to encourage exports" },
        { id: "C", text: "Expanding United States territory through war" },
        { id: "D", text: "Funding internal improvements with federal money" }
      ],
      correctOptionId: "D",
      explanation:
        "Jacksonian Democrats viewed federally funded infrastructure projects as unconstitutional favors to elites.",
      source: "Andrew Jackson, Bank Veto Message, 1832"
    },
    {
      id: "4-4-q26",
      prompt:
        "The excerpt best reflects which development during the first half of the nineteenth century?",
      stimulus: jacksonVetoExcerpt,
      options: [
        { id: "A", text: "Formation of new political parties" },
        { id: "B", text: "Establishment of abolitionist groups" },
        { id: "C", text: "Increase of immigration from Europe" },
        { id: "D", text: "Emergence of regional cultures" }
      ],
      correctOptionId: "A",
      explanation:
        "Conflicts over the Bank and federal power helped define the Democratic and Whig parties.",
      source: "Andrew Jackson, Bank Veto Message, 1832"
    },
    {
      id: "4-4-q27",
      prompt: "Which factor best supports Jackson's argument in the excerpt?",
      stimulus: jacksonVetoExcerpt,
      options: [
        { id: "A", text: "Urbanization driven by industrial labor demand" },
        {
          id: "B",
          text: "Intensifying debates over the proper role of the federal government"
        },
        { id: "C", text: "Rising public roles for women reformers" },
        { id: "D", text: "Southern reliance on cotton exports" }
      ],
      correctOptionId: "B",
      explanation:
        "Early nineteenth-century politics revolved around disputes about federal authority in economic matters.",
      source: "Andrew Jackson, Bank Veto Message, 1832"
    },
    {
      id: "4-4-q28",
      prompt: "Which Jackson policy most undermined his position in the excerpt?",
      stimulus: jacksonVetoExcerpt,
      options: [
        { id: "A", text: "Allowing territories to determine slavery's legality" },
        { id: "B", text: "Rejecting the power of judicial review" },
        {
          id: "C",
          text: "Using federal authority to relocate American Indian nations"
        },
        { id: "D", text: "Encouraging settlement west of the Mississippi River" }
      ],
      correctOptionId: "C",
      explanation:
        "Jackson claimed to limit federal power but forcefully used it to remove Native peoples, revealing contradictions in his stance.",
      source: "Andrew Jackson, Bank Veto Message, 1832"
    },
    {
      id: "4-4-q35",
      prompt:
        "Which factor best explains the emergence of new political parties in the early nineteenth century?",
      options: [
        { id: "A", text: "Continued debates over the federal government's role" },
        { id: "B", text: "Growing agreement regarding slavery" },
        { id: "C", text: "Declining support for westward expansion" },
        { id: "D", text: "Persistent concern over foreign influence" }
      ],
      correctOptionId: "A",
      explanation:
        "Disagreements over banks, tariffs, and internal improvements fueled the rise of Democrats and Whigs."
    },
    {
      id: "4-4-q36",
      prompt:
        "Which development best explains the expansion of participatory democracy in the early nineteenth century?",
      options: [
        { id: "A", text: "Abolition of slavery in most northern states" },
        { id: "B", text: "Growth of manufacturing along rivers and canals" },
        { id: "C", text: "Extension of suffrage rights to most adult White men" },
        { id: "D", text: "Influence of the early women's rights movement" }
      ],
      correctOptionId: "C",
      explanation:
        "As property requirements disappeared, voter participation and party mobilization surged."
    }
  ],
  "4.5": [
    {
      id: "4-5-q19",
      prompt: "The amendment was proposed in which historical situation?",
      stimulus: madisonAmendmentExcerpt,
      options: [
        {
          id: "A",
          text: "Anti-Federalists pushed to add a bill of rights to the Constitution."
        },
        {
          id: "B",
          text: "The federal government negotiated to acquire western territory."
        },
        {
          id: "C",
          text: "The United States planned to forcibly remove American Indians."
        },
        {
          id: "D",
          text: "The Constitutional Convention worked to separate governmental powers."
        }
      ],
      correctOptionId: "B",
      explanation:
        "Madison drafted the amendment while Jefferson's administration negotiated the Louisiana Purchase with France.",
      source: "James Madison, proposed amendment, 1803"
    },
    {
      id: "4-5-q20",
      prompt: "What was a major purpose of the proposed amendment?",
      stimulus: madisonAmendmentExcerpt,
      options: [
        { id: "A", text: "To strengthen the U.S. alliance with France" },
        { id: "B", text: "To give individual states the legal right to secede" },
        { id: "C", text: "To give Congress explicit constitutional authority" },
        { id: "D", text: "To grant the president more power over treaties" }
      ],
      correctOptionId: "C",
      explanation:
        "Strict constructionists wanted clear constitutional language empowering Congress to acquire and incorporate territory.",
      source: "James Madison, proposed amendment, 1803"
    },
    {
      id: "4-5-q21",
      prompt: "Which group would most likely have supported the proposed amendment?",
      stimulus: madisonAmendmentExcerpt,
      options: [
        { id: "A", text: "Supporters of federal supremacy over the states" },
        { id: "B", text: "Advocates of expanding executive power" },
        { id: "C", text: "Champions of judicial review by the Supreme Court" },
        {
          id: "D",
          text: "Strict constructionists who limited government to enumerated powers"
        }
      ],
      correctOptionId: "D",
      explanation:
        "Jeffersonians feared overstepping constitutional bounds and therefore wanted explicit authorization before purchasing Louisiana.",
      source: "James Madison, proposed amendment, 1803"
    }
  ],
  "4.6": [
    {
      id: "4-6-q15",
      prompt:
        "Which factor most likely contributed to the emergence of the Second Great Awakening?",
      options: [
        { id: "A", text: "Rise of the Whig Party" },
        { id: "B", text: "Election of President Andrew Jackson" },
        { id: "C", text: "Cultural responses to Enlightenment rationalism" },
        { id: "D", text: "Emergence of a women's rights movement" }
      ],
      correctOptionId: "C",
      explanation:
        "Revivalists emphasized emotion and personal salvation, partly as a response to Enlightenment rationalism."
    },
    {
      id: "4-6-q31",
      prompt: "The sentiments in the excerpt best reflect which development?",
      stimulus: temperanceExcerpt,
      options: [
        { id: "A", text: "Use of public protest to effect social change" },
        {
          id: "B",
          text: "Emergence of reform movements during the Second Great Awakening"
        },
        { id: "C", text: "Expansion of trade with East Asia" },
        { id: "D", text: "Growth of U.S. control over American Indian territory" }
      ],
      correctOptionId: "B",
      explanation:
        "Temperance reformers shared the moral reform impulse stimulated by the Second Great Awakening.",
      source: "American Temperance Society report, 1835"
    },
    {
      id: "4-6-q37",
      prompt:
        "Which political change most influenced the Second Great Awakening?",
      options: [
        { id: "A", text: "Executive calls for American Indian removal" },
        { id: "B", text: "Southern threats to nullify federal authority" },
        {
          id: "C",
          text: "Expansion of participatory democracy and belief in personal agency"
        },
        { id: "D", text: "Judicial support for infrastructure projects" }
      ],
      correctOptionId: "C",
      explanation:
        "Broader political participation encouraged evangelical messages that stressed individual responsibility for salvation."
    },
    {
      id: "4-6-q38",
      prompt:
        "Which historical situation best explains the development of the Second Great Awakening?",
      options: [
        { id: "A", text: "Market revolution reduced wage labor opportunities" },
        {
          id: "B",
          text: "Improved transportation allowed revivalists to spread ideas widely"
        },
        { id: "C", text: "Romanticism encouraged rejection of the founders' ideas" },
        { id: "D", text: "Abolitionism dominated northern religious life" }
      ],
      correctOptionId: "B",
      explanation:
        "Canals, steamboats, and roads allowed itinerant preachers to travel and share revivalist messages across regions."
    }
  ],
  "4.7": [
    {
      id: "4-7-q29",
      prompt:
        "Which evidence did the American Temperance Society highlight to persuade people to join the movement?",
      stimulus: temperanceExcerpt,
      options: [
        { id: "A", text: "Abstinence would extend life expectancy" },
        {
          id: "B",
          text: "Treatments for alcoholism would change behavior"
        },
        {
          id: "C",
          text: "Collecting and spreading factual studies would change habits"
        },
        {
          id: "D",
          text: "A national movement would immediately end alcohol use"
        }
      ],
      correctOptionId: "C",
      explanation:
        "Temperance leaders believed disseminating evidence about alcohol's harms would shift public opinion.",
      source: "American Temperance Society report, 1835"
    },
    {
      id: "4-7-q30",
      prompt:
        "Which evidence did the society use to justify the need for the temperance movement?",
      stimulus: temperanceExcerpt,
      options: [
        { id: "A", text: "Federal excise taxes on alcohol were too high" },
        {
          id: "B",
          text: "Restrictions on alcohol could discourage immigrants"
        },
        {
          id: "C",
          text: "Alcohol damaged people's physical and moral well-being"
        },
        {
          id: "D",
          text: "Men wasted money on drink, impoverishing their families"
        }
      ],
      correctOptionId: "C",
      explanation:
        "The society emphasized that intoxicants harmed health, virtue, and happiness, motivating reform.",
      source: "American Temperance Society report, 1835"
    },
    {
      id: "4-7-q32",
      prompt: "Why did temperance supporters believe their movement would succeed?",
      stimulus: temperanceExcerpt,
      options: [
        { id: "A", text: "They claimed moral and religious authority" },
        { id: "B", text: "They were willing to use violence" },
        { id: "C", text: "They would dominate future elections" },
        { id: "D", text: "They controlled new transportation routes" }
      ],
      correctOptionId: "A",
      explanation:
        "Temperance advocates invoked divine blessing and moral reform, asserting the righteousness of their cause.",
      source: "American Temperance Society report, 1835"
    }
  ],
  "4.8": [
    {
      id: "4-8-q33a",
      prompt: "Which point of view is expressed in the excerpt?",
      stimulus: lowellExcerpt,
      options: [
        { id: "A", text: "Support for enslaved women's resistance in the South" },
        {
          id: "B",
          text:
            "Sympathy for wage-earning women asserting independence through collective action"
        },
        {
          id: "C",
          text: "Criticism of labor reformers for disrupting industrial growth"
        },
        {
          id: "D",
          text: "Defense of employers who cut wages during the 1830s"
        }
      ],
      correctOptionId: "B",
      explanation:
        "Robinson praised the young women who protested wage cuts, highlighting their newfound independence.",
      source: "Harriet Hanson Robinson, Loom and Spindle, 1898"
    },
    {
      id: "4-8-q33b",
      prompt:
        "Which historical situation best explains the events described in the excerpt?",
      stimulus: lowellExcerpt,
      options: [
        { id: "A", text: "Continued reliance on household textile production" },
        {
          id: "B",
          text: "Rise of market revolution factories employing young women"
        },
        { id: "C", text: "Decline of industrial work after the War of 1812" },
        { id: "D", text: "Implementation of national child labor laws" }
      ],
      correctOptionId: "B",
      explanation:
        "Lowell mills exemplified industrialization that drew young women into wage labor during the market revolution.",
      source: "Harriet Hanson Robinson, Loom and Spindle, 1898"
    },
    {
      id: "4-8-q33c",
      prompt: "Which historical development is illustrated by the excerpt?",
      stimulus: lowellExcerpt,
      options: [
        {
          id: "A",
          text: "Decline of factory work due to agricultural expansion"
        },
        {
          id: "B",
          text:
            "Rise of a women-led labor movement connected to broader reform efforts"
        },
        {
          id: "C",
          text: "Creation of national minimum wage laws"
        },
        {
          id: "D",
          text: "Success of proslavery arguments in northern states"
        }
      ],
      correctOptionId: "B",
      explanation:
        "Women workers organized strikes and reform associations, laying groundwork for later labor and women's rights activism.",
      source: "Harriet Hanson Robinson, Loom and Spindle, 1898"
    }
  ],
  "4.9": [
    {
      id: "4-9-q2",
      prompt:
        "Which statement would an abolitionist use to support the ideas in the excerpt?",
      stimulus: harrietJacobsExcerpt,
      options: [
        {
          id: "A",
          text:
            "Southern states could restrict free African Americans from owning firearms."
        },
        {
          id: "B",
          text: "Slavery's immorality corrupted southern society at large."
        },
        {
          id: "C",
          text: "The Constitution defined enslaved people strictly as property."
        },
        {
          id: "D",
          text:
            "Poor White citizens contributed little compared with enslaved laborers."
        }
      ],
      correctOptionId: "B",
      explanation:
        "Jacobs described how slavery brutalized both enslaved people and poor Whites, echoing abolitionist critiques of the institution.",
      source: "Harriet Jacobs, Incidents in the Life of a Slave Girl, 1861"
    },
    {
      id: "4-9-q3",
      prompt:
        "Which claim best aligns with the excerpt's evidence about relations between White southerners and African Americans?",
      stimulus: harrietJacobsExcerpt,
      options: [
        {
          id: "A",
          text: "Most White citizens owned slaves and therefore defended slavery."
        },
        {
          id: "B",
          text:
            "Attitudes toward slave rebellions varied significantly across the South."
        },
        {
          id: "C",
          text:
            "Poor White citizens gained major economic benefits from slavery."
        },
        {
          id: "D",
          text:
            "The slave system gave poor White citizens the feeling of social superiority over Black people."
        }
      ],
      correctOptionId: "D",
      explanation:
        "Jacobs emphasized how even poor Whites relished power over African Americans despite limited material gains.",
      source: "Harriet Jacobs, Incidents in the Life of a Slave Girl, 1861"
    },
    {
      id: "4-9-q4",
      prompt:
        "Which evidence best supports the excerpt's depiction of reactions to slave rebellions?",
      stimulus: harrietJacobsExcerpt,
      options: [
        { id: "A", text: "Southern states banned importation of enslaved Africans." },
        {
          id: "B",
          text: "Northerners agreed slavery was a positive institution."
        },
        {
          id: "C",
          text:
            "Authorities imposed new restrictions on enslaved and free African Americans."
        },
        { id: "D", text: "Slaveholders replaced enslaved labor with wage labor." }
      ],
      correctOptionId: "C",
      explanation:
        "In the wake of Nat Turner's Rebellion, many southern legislatures tightened controls on Black people, matching Jacobs's narrative.",
      source: "Harriet Jacobs, Incidents in the Life of a Slave Girl, 1861"
    },
    {
      id: "4-9-q5",
      prompt:
        "The excerpt best reflects which development in the nineteenth-century South?",
      stimulus: harrietJacobsExcerpt,
      options: [
        { id: "A", text: "Protectionist tariffs on textiles" },
        {
          id: "B",
          text:
            "Emergence of an abolitionist movement during the Second Great Awakening"
        },
        { id: "C", text: "Prosperity produced by manufacturing" },
        { id: "D", text: "Regional cultures increasingly defined by slavery" }
      ],
      correctOptionId: "D",
      explanation:
        "Jacobs depicted a society organized around defending slavery and policing racial hierarchies.",
      source: "Harriet Jacobs, Incidents in the Life of a Slave Girl, 1861"
    },
    {
      id: "4-9-q9",
      prompt:
        "Which result followed arguments like Calhoun's in the years before the Civil War?",
      stimulus: calhounExcerpt,
      options: [
        { id: "A", text: "Slaveholders insisted slavery was essential to their way of life." },
        { id: "B", text: "Southerners admitted that slavery was sinful." },
        { id: "C", text: "Abolitionists toured the South to counter proslavery ideas." },
        { id: "D", text: "Congress guaranteed slavery's permanence." }
      ],
      correctOptionId: "A",
      explanation:
        "Calhoun's rhetoric exemplified southern leaders portraying slavery as a positive good and vital to the South.",
      source: "John C. Calhoun, Senate speech, 1837"
    },
    {
      id: "4-9-q10",
      prompt:
        "How did arguments like Calhoun's affect emerging abolitionist movements?",
      stimulus: calhounExcerpt,
      options: [
        { id: "A", text: "Northern abolitionists doubted the accounts of escaped slaves." },
        { id: "B", text: "Proslavery claims weakened abolitionist appeals to northerners." },
        {
          id: "C",
          text:
            "Positions hardened on both sides, making compromise difficult."
        },
        {
          id: "D",
          text:
            "Members of Congress increasingly supported laws limiting slavery."
        }
      ],
      correctOptionId: "C",
      explanation:
        "Pro- and antislavery advocates entrenched their positions, reducing willingness to compromise politically.",
      source: "John C. Calhoun, Senate speech, 1837"
    },
    {
      id: "4-9-q11",
      prompt:
        "What most prompted Calhoun and similar leaders to defend slavery as part of the southern way of life?",
      stimulus: calhounExcerpt,
      options: [
        {
          id: "A",
          text:
            "Slave rebellions in Haiti and the United States alarmed southern elites."
        },
        {
          id: "B",
          text:
            "Abolitionists dominated Congress and threatened emancipation."
        },
        {
          id: "C",
          text:
            "Southern states widely taught enslaved people to read and write."
        },
        {
          id: "D",
          text:
            "Sudden growth of southern manufacturing increased demand for cotton."
        }
      ],
      correctOptionId: "A",
      explanation:
        "Rebellions, including Nat Turner's, heightened southern fears and encouraged leaders to defend slavery as essential for safety.",
      source: "John C. Calhoun, Senate speech, 1837"
    }
  ],

  /* =========================
     4.12 — Progress Check (36 questions) — OVERRIDES previous 4.12
     ========================= */

  "4.12": [
    // Jefferson inaugural address (Q1–Q4)
    {
      id: "4-12-q1",
      prompt:
        "Which of the following best describes Jefferson’s point of view in the excerpt?",
      stimulus: jeffersonInauguralExcerpt,
      options: [
        {
          id: "A",
          text:
            "As a resident of Virginia, Jefferson felt the federal government should financially support internal improvements."
        },
        {
          id: "B",
          text:
            "As the newly elected president, Jefferson believes government should limit interference in the lives of its citizens."
        },
        {
          id: "C",
          text:
            "As a leader in the early years of the republic, Jefferson feels governments should provide economic assistance to all citizens."
        },
        {
          id: "D",
          text:
            "As the author of the Declaration of Independence, Jefferson believes state governments should have more authority than the federal government."
        }
      ],
      correctOptionId: "B",
      explanation:
        "Jefferson calls for a 'wise and frugal Government' that restrains harm but otherwise leaves people free to pursue industry and improvement.",
      source: "Thomas Jefferson, first inaugural address, 1801"
    },
    {
      id: "4-12-q2",
      prompt:
        "Which of the following was most likely a main purpose of Jefferson’s inaugural address?",
      stimulus: jeffersonInauguralExcerpt,
      options: [
        { id: "A", text: "To advocate and explain the constitutionality of certain laws" },
        { id: "B", text: "To summarize his beliefs about the ideal political system" },
        { id: "C", text: "To warn European countries against renewing conflicts with the United States" },
        { id: "D", text: "To justify the cost of the Louisiana Purchase" }
      ],
      correctOptionId: "B",
      explanation:
        "Jefferson outlines republican principles and limited government, presenting his view of good governance.",
      source: "Thomas Jefferson, first inaugural address, 1801"
    },
    {
      id: "4-12-q3",
      prompt:
        "Which of the following best describes the political situation in which Jefferson gave the address in the excerpt?",
      stimulus: jeffersonInauguralExcerpt,
      options: [
        { id: "A", text: "Federalists sought compromise with Democratic-Republican politicians." },
        { id: "B", text: "The Federalist Party remained more powerful than the Democratic-Republicans." },
        { id: "C", text: "The Democratic-Republican Party had won the presidency for the first time." },
        { id: "D", text: "Democratic-Republicans had gained increased support from wealthy merchants." }
      ],
      correctOptionId: "C",
      explanation:
        "The election of 1800 brought Jefferson to office as the first Democratic-Republican president.",
      source: "Thomas Jefferson, first inaugural address, 1801"
    },
    {
      id: "4-12-q4",
      prompt:
        "Which of the following best describes the context from which the ideas expressed in the excerpt emerged?",
      stimulus: jeffersonInauguralExcerpt,
      options: [
        { id: "A", text: "Popular opinion supported intervention in Europe against France." },
        { id: "B", text: "Political leaders sought to encourage domestic economic development." },
        { id: "C", text: "Voters pressured state governments to drop property restrictions on voting." },
        { id: "D", text: "Religious revivals encouraged the widespread development of reform movements." }
      ],
      correctOptionId: "B",
      explanation:
        "Jefferson references national potential and prosperity amid conversations about expanding agriculture and commerce.",
      source: "Thomas Jefferson, first inaugural address, 1801"
    },

    // Canal petition (Q5–Q8)
    {
      id: "4-12-q5",
      prompt:
        "At the time the petition was produced, Congress most likely interpreted the petition's purpose as",
      stimulus: canalPetitionExcerpt,
      options: [
        { id: "A", text: "requesting federal funding for transportation construction projects" },
        { id: "B", text: "rallying support to end commercial relations with Great Britain" },
        { id: "C", text: "encouraging White settlers to use canals to migrate to new states" },
        { id: "D", text: "promoting the development of agriculture at the expense of industry" }
      ],
      correctOptionId: "A",
      explanation:
        "The petition highlights internal improvements and asks for governmental aid, implying federal funding for canals.",
      source: "Chesapeake and Delaware Canal Company, petition to Congress, 1809"
    },
    {
      id: "4-12-q6",
      prompt:
        "The claims in the excerpt were most likely interpreted as opposing which of the following existing federal government policies at the time?",
      stimulus: canalPetitionExcerpt,
      options: [
        { id: "A", text: "Financing a national banking system" },
        { id: "B", text: "Promoting economic development through foreign trade" },
        { id: "C", text: "Acquiring western Native American land" },
        { id: "D", text: "Levying tariffs on imported manufactured goods" }
      ],
      correctOptionId: "B",
      explanation:
        "The petition emphasizes domestic manufacturing and infrastructure rather than reliance on foreign trade.",
      source: "Chesapeake and Delaware Canal Company, petition to Congress, 1809"
    },
    {
      id: "4-12-q7",
      prompt:
        "Which of the following best describes a historian’s likely interpretation of the situation in which the excerpt was produced in the early 1800s?",
      stimulus: canalPetitionExcerpt,
      options: [
        { id: "A", text: "Political leaders agreed on policies for developing the economy." },
        { id: "B", text: "Most Americans sought to turn away from European influences." },
        { id: "C", text: "Some Americans promoted international strength through a unified national economy." },
        { id: "D", text: "Business leaders argued that the Constitution limited federal spending." }
      ],
      correctOptionId: "C",
      explanation:
        "Advocates linked internal improvements and manufacturing to national prosperity and strength.",
      source: "Chesapeake and Delaware Canal Company, petition to Congress, 1809"
    },
    {
      id: "4-12-q8",
      prompt:
        "The petition could best be used as evidence by historians studying which of the following?",
      stimulus: canalPetitionExcerpt,
      options: [
        { id: "A", text: "The effects of new transportation links on industry in the Northeast" },
        { id: "B", text: "The lives of immigrant laborers constructing new infrastructure" },
        { id: "C", text: "The ideas that led some Americans to advocate for improved transportation" },
        { id: "D", text: "The reasons that regional interests opposed internal improvements" }
      ],
      correctOptionId: "C",
      explanation:
        "The petition lays out the rationale for canals, useful for studying pro–internal improvements thought.",
      source: "Chesapeake and Delaware Canal Company, petition to Congress, 1809"
    },

    // Red Jacket (Q9–Q10)
    {
      id: "4-12-q9",
      prompt:
        "Which of the following best explains how the purpose of the speech in the excerpt was interpreted by federal officials?",
      stimulus: redJacketExcerpt,
      options: [
        { id: "A", text: "Red Jacket wanted to increase Iroquois commerce with the United States." },
        { id: "B", text: "Red Jacket sought to protect Iroquois independence from the United States." },
        { id: "C", text: "Red Jacket desired to abandon traditional Iroquois religious practices for Christianity." },
        { id: "D", text: "Red Jacket wished to help United States migrants form new settlements on Iroquois land." }
      ],
      correctOptionId: "B",
      explanation:
        "He rejects religious imposition and laments land loss, signaling a defense of Iroquois autonomy.",
      source: "Red Jacket speech, 1805"
    },
    {
      id: "4-12-q10",
      prompt:
        "The excerpt could best be used by historians studying the",
      stimulus: redJacketExcerpt,
      options: [
        { id: "A", text: "origins of the Second Great Awakening" },
        { id: "B", text: "effects of the market revolution on family roles" },
        { id: "C", text: "colonization of eastern North America by English settlers" },
        { id: "D", text: "resistance against the expansion of United States influence" }
      ],
      correctOptionId: "D",
      explanation:
        "The speech critiques religious and territorial encroachment, reflecting Indigenous resistance.",
      source: "Red Jacket speech, 1805"
    },

    // Wilentz on Jackson (Q11–Q14)
    {
      id: "4-12-q11",
      prompt:
        "Which of the following describes a context that most influenced the implementation of the government policy discussed in the excerpt?",
      stimulus: wilentzJacksonExcerpt,
      options: [
        { id: "A", text: "Many Americans desired the United States to expand its western land claims." },
        { id: "B", text: "Many Americans asserted the separation of public and private spheres." },
        { id: "C", text: "Some Americans were influenced by European literary and cultural models." },
        { id: "D", text: "Some Americans began to oppose the spread of slavery." }
      ],
      correctOptionId: "A",
      explanation:
        "Popular pressure for westward expansion underpinned removal policy implementation.",
      source: "Sean Wilentz, The Rise of American Democracy, 2005"
    },
    {
      id: "4-12-q12",
      prompt:
        "Which of the following claims is supported by the author’s main argument in the excerpt?",
      stimulus: wilentzJacksonExcerpt,
      options: [
        { id: "A", text: "White settler demand for land was the principal cause of Indian removal policies." },
        { id: "B", text: "Partnerships between White settlers and American Indians prevented most removals." },
        { id: "C", text: "Andrew Jackson planned Indian removal to punish American Indians after conflicts." },
        { id: "D", text: "Andrew Jackson can be blamed for the unintended effects of Indian removal." }
      ],
      correctOptionId: "D",
      explanation:
        "Wilentz argues that Jackson bears responsibility for setting in motion harmful removal policies.",
      source: "Sean Wilentz, The Rise of American Democracy, 2005"
    },
    {
      id: "4-12-q13",
      prompt:
        "Which of the following pieces of evidence would best refute Jackson’s claim about his predecessors’ policies toward American Indians, as described in the first paragraph of the excerpt?",
      stimulus: wilentzJacksonExcerpt,
      options: [
        { id: "A", text: "Madison used the federal army to defeat a confederacy in the Northwest." },
        { id: "B", text: "Washington enforced treaties guaranteeing American Indians in New York rights to their land." },
        { id: "C", text: "Monroe forced American Indians in Florida to move to a reservation." },
        { id: "D", text: "Jefferson suggested purchasing territory from indebted American Indian groups." }
      ],
      correctOptionId: "B",
      explanation:
        "Washington’s enforcement of land-rights treaties contradicts the claim that predecessors only betrayed Native peoples.",
      source: "Sean Wilentz, The Rise of American Democracy, 2005"
    },
    {
      id: "4-12-q14",
      prompt:
        "Which of the following pieces of evidence would help modify an argument in the excerpt about President Jackson’s intentions toward American Indians?",
      stimulus: wilentzJacksonExcerpt,
      options: [
        { id: "A", text: "Some representatives of Jackson profited by purchasing land from American Indians who were forcibly relocated." },
        { id: "B", text: "Some of Jackson’s agents encouraged American Indians from Ohio and Florida to leave their homelands as well." },
        { id: "C", text: "Jackson had led U.S. armies that conquered American Indian peoples in the Southeast and forced land cessions." },
        { id: "D", text: "Jackson believed that relocating American Indians was the only action that would enable them to preserve their way of life." }
      ],
      correctOptionId: "C",
      explanation:
        "Jackson’s earlier military actions suggest coercive approaches that complicate paternalistic justifications.",
      source: "Sean Wilentz, The Rise of American Democracy, 2005"
    },

    // Bryant (Q15–Q17)
    {
      id: "4-12-q15",
      prompt:
        "The excerpt best serves as evidence of which of the following developments?",
      stimulus: bryantLiteratureExcerpt,
      options: [
        { id: "A", text: "The termination of cultural connections with Great Britain" },
        { id: "B", text: "The popularization of the belief in human perfectibility" },
        { id: "C", text: "The creation of a unique American culture" },
        { id: "D", text: "The foundation of a trans-Atlantic print culture" }
      ],
      correctOptionId: "C",
      explanation:
        "Bryant urges fostering American literature and recognizes national cultural growth.",
      source: "William Cullen Bryant, North American Review, 1818"
    },
    {
      id: "4-12-q16",
      prompt:
        "Which of the following can be concluded about the relationship between the United States and Europe based on the situation described in the excerpt?",
      stimulus: bryantLiteratureExcerpt,
      options: [
        { id: "A", text: "American writing was considered more refined than European writing." },
        { id: "B", text: "European artists traveled to the United States for inspiration." },
        { id: "C", text: "Most American literature was written for European consumption." },
        { id: "D", text: "European styles continued to influence American society." }
      ],
      correctOptionId: "D",
      explanation:
        "Reprinting popular English works shows continuing European cultural influence.",
      source: "William Cullen Bryant, North American Review, 1818"
    },
    {
      id: "4-12-q17",
      prompt:
        "Which of the following can be concluded about the United States based on the author’s descriptions in the excerpt?",
      stimulus: bryantLiteratureExcerpt,
      options: [
        { id: "A", text: "Regional political interests dominated political debates." },
        { id: "B", text: "A common national culture was developing." },
        { id: "C", text: "Educational reforms contributed to increased literacy." },
        { id: "D", text: "New transportation routes made shipping books easier." }
      ],
      correctOptionId: "B",
      explanation:
        "Bryant notes growing literary interest across the nation, indicating cultural consolidation.",
      source: "William Cullen Bryant, North American Review, 1818"
    },

    // Howe (Q18–Q20)
    {
      id: "4-12-q18",
      prompt:
        "A piece of evidence used by Howe in the second paragraph of the excerpt to support his argument about the goals of prison reform was that prison reformers",
      stimulus: howeEvangelicalExcerpt,
      options: [
        { id: "A", text: "saw prisons primarily as a form of punishment" },
        { id: "B", text: "intended to use prisons to rehabilitate criminals" },
        { id: "C", text: "sought to expand prisons to force debt repayments" },
        { id: "D", text: "thought prisons were only to hold people before trial" }
      ],
      correctOptionId: "B",
      explanation:
        "Howe stresses the reconception of prisons as ‘penitentiaries’ aimed at reform.",
      source: "Daniel Walker Howe, What Hath God Wrought, 2007"
    },
    {
      id: "4-12-q19",
      prompt:
        "Which of the following is a piece of evidence used by Howe to support his claim in the third paragraph of the excerpt about religious organizations in the early nineteenth century?",
      stimulus: howeEvangelicalExcerpt,
      options: [
        { id: "A", text: "Religious voluntary associations were limited to focusing on local efforts." },
        { id: "B", text: "Many religious reformers also worked for large nationwide corporations." },
        { id: "C", text: "The Second Bank of the United States was one of many national federal organizations." },
        { id: "D", text: "Members of the Evangelical United Front employed more people than the Post Office did." }
      ],
      correctOptionId: "D",
      explanation:
        "Howe compares evangelical association scale to that of the Post Office.",
      source: "Daniel Walker Howe, What Hath God Wrought, 2007"
    },
    {
      id: "4-12-q20",
      prompt:
        "Which of the following describes a piece of evidence used by Howe to support his overall argument about the motivations of religious reformers?",
      stimulus: howeEvangelicalExcerpt,
      options: [
        { id: "A", text: "They believed that they should focus their efforts only on the United States." },
        { id: "B", text: "They sought to compete with other churches for religious converts." },
        { id: "C", text: "They viewed reform mainly as a means of social control." },
        { id: "D", text: "They desired to teach people personal autonomy." }
      ],
      correctOptionId: "D",
      explanation:
        "He emphasizes redemptive aims centered on self-discipline and personal autonomy.",
      source: "Daniel Walker Howe, What Hath God Wrought, 2007"
    },

    // Camp (Q21–Q24)
    {
      id: "4-12-q21",
      prompt:
        "Which of the following does the author use as evidence to support her argument that slaveholders were “keen to master their slaves’ senses of pleasure”?",
      stimulus: campPleasureExcerpt,
      options: [
        { id: "A", text: "Slaveholders held parties to encourage the loyalty of the enslaved." },
        { id: "B", text: "Slaveholders regularly listened to and sang spirituals with enslaved people." },
        { id: "C", text: "Enslaved African Americans held their own illicit parties." },
        { id: "D", text: "Enslaved African Americans regularly broke curfews and violated pass laws." }
      ],
      correctOptionId: "A",
      explanation:
        "Camp cites plantation parties as paternalist tools of control over pleasure.",
      source: "Stephanie M. H. Camp, Closer to Freedom, 2004"
    },
    {
      id: "4-12-q22",
      prompt:
        "Which of the following could best be used as evidence to support the argument in the third paragraph of the excerpt that enslaved people engaged in oppositional activities?",
      stimulus: campPleasureExcerpt,
      options: [
        { id: "A", text: "Slaveholders allowed some enslaved African Americans to work unsupervised." },
        { id: "B", text: "Enslaved African Americans routinely caused tools to break or worked more slowly as means of resistance." },
        { id: "C", text: "Abolitionists criticized slaveholders for separating enslaved children from their parents." },
        { id: "D", text: "Enslaved African Americans assigned to plantation homes had easier working conditions than those who worked in the fields." }
      ],
      correctOptionId: "B",
      explanation:
        "Everyday resistance included sabotaging tools and slowdowns, paralleling illicit gatherings.",
      source: "Stephanie M. H. Camp, Closer to Freedom, 2004"
    },
    {
      id: "4-12-q23",
      prompt:
        "Which of the following pieces of evidence could best be used to modify the argument in the excerpt that many enslaved people engaged in oppositional activities?",
      stimulus: campPleasureExcerpt,
      options: [
        { id: "A", text: "When possible, enslaved African Americans sought to escape to the North." },
        { id: "B", text: "Some enslaved African Americans learned to read in spite of laws banning it." },
        { id: "C", text: "Large-scale rebellions by enslaved African Americans in the first half of the 1800s were largely unsuccessful." },
        { id: "D", text: "Many enslaved African Americans maintained family units across plantations." }
      ],
      correctOptionId: "C",
      explanation:
        "The failures of large rebellions show limits to resistance even as everyday opposition persisted.",
      source: "Stephanie M. H. Camp, Closer to Freedom, 2004"
    },
    {
      id: "4-12-q24",
      prompt:
        "Which of the following best describes a context in the first half of the 1800s that influenced the development of slavery as described in the excerpt?",
      stimulus: campPleasureExcerpt,
      options: [
        { id: "A", text: "The United States expanded its participation in the international slave trade." },
        { id: "B", text: "Northern business leaders sought enslaved people as laborers for transportation projects." },
        { id: "C", text: "Southern planters used enslaved people to produce cotton for international markets." },
        { id: "D", text: "Protestant religious revivalists encouraged the growth of antislavery movements." }
      ],
      correctOptionId: "C",
      explanation:
        "Cotton expansion and global markets drove strict control over enslaved labor and culture.",
      source: "Stephanie M. H. Camp, Closer to Freedom, 2004"
    },

    // Johnson (Q25–Q27)
    {
      id: "4-12-q25",
      prompt:
        "In the first half of the 1800s, which of the following resulted from the debates about the cotton economy described in the excerpt?",
      stimulus: johnsonCottonExcerpt,
      options: [
        { id: "A", text: "Northerners began to frame antislavery arguments in ecological terms." },
        { id: "B", text: "A distinct Southern economic and cultural identity emerged." },
        { id: "C", text: "Large numbers of immigrants moved to Southern cities to pursue economic opportunities." },
        { id: "D", text: "The federal government built extensive canals and railroads to support cotton agriculture." }
      ],
      correctOptionId: "B",
      explanation:
        "The cotton regime reinforced a separate southern identity centered on plantation slavery.",
      source: "Walter Johnson, River of Dark Dreams, 2013"
    },
    {
      id: "4-12-q26",
      prompt:
        "Which of the following most directly contributed to the development described in the excerpt?",
      stimulus: johnsonCottonExcerpt,
      options: [
        { id: "A", text: "The introduction of enslaved Africans in the 1600s into what is now the United States" },
        { id: "B", text: "The election of Andrew Jackson and his decision to enforce tariff collections" },
        { id: "C", text: "A series of insurrections and rebellions by enslaved people in the first half of the 1800s" },
        { id: "D", text: "A belief by southern businessmen that the economy should focus on exporting select agricultural products" }
      ],
      correctOptionId: "D",
      explanation:
        "Export-oriented ideology prioritized cotton output, despite ecological and human costs.",
      source: "Walter Johnson, River of Dark Dreams, 2013"
    },
    {
      id: "4-12-q27",
      prompt:
        "Which of the following resulted from the mass production of cotton described in the excerpt?",
      stimulus: johnsonCottonExcerpt,
      options: [
        { id: "A", text: "Southern planters eventually sought to diversify the crops they grew." },
        { id: "B", text: "Some southerners relocated their plantations to the west of the Appalachian Mountains." },
        { id: "C", text: "A cotton gin was developed that processed raw cotton more quickly." },
        { id: "D", text: "Southerners supported protective tariffs to stimulate the U.S. economy." }
      ],
      correctOptionId: "B",
      explanation:
        "Soil exhaustion in the East spurred westward movement of plantations and slavery.",
      source: "Walter Johnson, River of Dark Dreams, 2013"
    },

    // Non-stimulus market revolution / democracy (Q28–Q36)
    {
      id: "4-12-q28",
      prompt:
        "Innovations in shipping and the growth of commercial networks were most directly related to which of the following other developments of the first half of the nineteenth century?",
      options: [
        { id: "A", text: "A decrease in the availability of jobs for recent immigrants" },
        { id: "B", text: "An increase in the number of Americans moving west of the Appalachian Mountains" },
        { id: "C", text: "The spread of industrialization to most cities in the South" },
        { id: "D", text: "An increase in the production in the home of goods used by families" }
      ],
      correctOptionId: "B",
      explanation:
        "Lower transport costs and new routes facilitated western migration and settlement."
    },
    {
      id: "4-12-q29",
      prompt:
        "Changes in ideas about men’s and women’s gender roles in the family, resulting from the market revolution, most directly contributed to which of the following shifts in American social practices during the same period?",
      options: [
        { id: "A", text: "The rise of widespread support for women’s right to vote in national elections" },
        { id: "B", text: "A new emphasis on the separation between the public and private spheres" },
        { id: "C", text: "Calls for mothers to guide their children’s education in republican values and citizenship" },
        { id: "D", text: "The growth of a political culture blending European and uniquely American elements" }
      ],
      correctOptionId: "B",
      explanation:
        "Industrial capitalism heightened the ideology of separate spheres for men and women."
    },
    {
      id: "4-12-q30",
      prompt:
        "The growth of manufacturing in the United States from 1800 to 1850 was most directly connected to which of the following broader historical processes?",
      options: [
        { id: "A", text: "Abolitionists advancing moral arguments to bring an end to slavery" },
        { id: "B", text: "Political parties debating about the need for a national bank" },
        { id: "C", text: "Supreme Court decisions confirming the primacy of federal laws over state laws" },
        { id: "D", text: "Large numbers of international migrants moving to northern cities" }
      ],
      correctOptionId: "D",
      explanation:
        "Immigration provided a growing urban labor force that supported industrial expansion."
    },
    {
      id: "4-12-q31",
      prompt:
        "The expansion of suffrage to most adult White men in the early nineteenth century most directly resulted in which of the following?",
      options: [
        { id: "A", text: "The growth of new political parties" },
        { id: "B", text: "The abolition of slavery in the northern states" },
        { id: "C", text: "The signing of peace treaties with Native Americans" },
        { id: "D", text: "The employment of women in textile manufacturing" }
      ],
      correctOptionId: "A",
      explanation:
        "An expanded electorate encouraged new parties and mass political mobilization."
    },
    {
      id: "4-12-q32",
      prompt:
        "Which of the following most directly led to the expansion of participatory democracy in the first half of the nineteenth century?",
      options: [
        { id: "A", text: "Development of a canal system connecting different parts of the country" },
        { id: "B", text: "Encouragement of citizens to settle the western territories" },
        { id: "C", text: "Reduction of property ownership requirements for voting" },
        { id: "D", text: "Threats by South Carolina to nullify federal laws it deemed unconstitutional" }
      ],
      correctOptionId: "C",
      explanation:
        "States dropped property qualifications, expanding the franchise for White men."
    },
    {
      id: "4-12-q33",
      prompt:
        "The expansion of suffrage to most adult White men by the 1820s and 1830s most directly contributed to the",
      options: [
        {
          id: "A",
          text:
            "emergence of political rallies and events to encourage people to vote for particular parties"
        },
        { id: "B", text: "increase in the autonomy of state legislatures" },
        {
          id: "C",
          text:
            "expansion of labor union activism that demanded better conditions for workers"
        },
        {
          id: "D",
          text:
            "establishment of representative democracy through the United States Constitution"
        }
      ],
      correctOptionId: "A",
      explanation:
        "Parties innovated with mass rallies, parades, and campaigning to mobilize new voters."
    },
    {
      id: "4-12-q34",
      prompt:
        "Which of the following best explains a major reason for the emergence of the Second Great Awakening in the United States?",
      options: [
        {
          id: "A",
          text:
            "The expansion of participatory democracy fostered popular engagement in religion as well."
        },
        {
          id: "B",
          text:
            "The arrival of large numbers of immigrants from Europe brought new religious ideas."
        },
        {
          id: "C",
          text:
            "The rise of individualistic and evangelical spiritual beliefs inspired religious conversion."
        },
        {
          id: "D",
          text:
            "The proclamation of the Monroe Doctrine created a sense of spiritual independence."
        }
      ],
      correctOptionId: "C",
      explanation:
        "Individualism and evangelical fervor encouraged revivals and conversion."
    },
    {
      id: "4-12-q35",
      prompt:
        "The Second Great Awakening was most directly related to which of the following other historical developments of the early nineteenth century?",
      options: [
        {
          id: "A",
          text:
            "Innovations in manufacturing technology and agricultural equipment"
        },
        {
          id: "B",
          text:
            "Opposing political views on the powers of the federal government"
        },
        { id: "C", text: "Celebrations of American patriotism and national culture" },
        { id: "D", text: "Challenges to Enlightenment views of rationalism" }
      ],
      correctOptionId: "D",
      explanation:
        "Evangelical religion challenged strict rationalism with emotional, experiential faith."
    },
    {
      id: "4-12-q36",
      prompt:
        "The expansion of participatory democracy in the Jacksonian era most likely influenced the Second Great Awakening by",
      options: [
        { id: "A", text: "giving rise to individualistic beliefs" },
        { id: "B", text: "transforming gender roles in the family" },
        { id: "C", text: "increasing membership in the national political parties" },
        { id: "D", text: "generating opposition to the abolitionist movement" }
      ],
      correctOptionId: "A",
      explanation:
        "Popular politics fostered an ethos of individual agency that paralleled evangelical emphases on personal salvation."
    }
  ]
};
