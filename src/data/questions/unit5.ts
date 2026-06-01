import { TopicQuestionBank } from "../../types/questions";

const pacificImmigrationDocs = `
<p><em>Document 1: Elizabeth Sinn, <cite>Pacific Crossing: California Gold, Chinese Migration, and the Making of Hong Kong</cite>, 2013</em></p>
<blockquote>
  &ldquo;The cargo trade with San Francisco grew briskly, but more dramatic changes came when Chinese, also succumbing to gold fever, raced for California. In 1849, a total of 300 people went, followed by 450 in 1850 and 2,700 in 1851. Many returned with gold, showing that it really existed. Foreign and Chinese shipping merchants whipped up business by circulating placards, maps, and pamphlets greatly exaggerating the availability of gold. The numbers peaked in 1852. [British] Governor Bonham announced that 30,000 Chinese had embarked from Hong Kong that year. Despite the fact that the number of passengers to California leveled off after 1852, the stream of people traveling to and fro across the Pacific never ceased. Even after the gold rush, Chinese continued sailing to the US West Coast to work on the railroads, as well as in lumbering, fisheries and agriculture, and a host of other occupations.&rdquo;
</blockquote>
<p><em>Document 2: Jean Pfaelzer, <cite>Driven Out</cite>, 2007</em></p>
<blockquote>
  &ldquo;The California legislature passed the Foreign Miners&rsquo; Tax, a simple code that would compel thousands of miners from Latin America and China to leave the United States. The tax required all miners who were not US citizens to buy a license for the monthly fee of twenty dollars; the tax collector would receive three dollars, and the rest would be split between the county and the state. Irish, English, Canadian, and German miners immediately protested, and the law was quickly rewritten to exempt any free white person or any miner who could become an American citizen. At the beginning of 1850, fifteen thousand Mexicans were mining in the southern Sierra Nevada. After the Foreign Miners&rsquo; Tax was enacted, ten thousand left the gold fields, most to return to Mexico. The town of Columbia shrank from a lively center of ten thousand miners and shopkeepers to an abandoned camp of nine or ten men. By 1860, four-fifths of the Latino population had been driven from the gold country.&rdquo;
</blockquote>
`;
const americanRepublicanPoster = `
<p><em>American Republican Party Meeting Notice, Philadelphia, 1844</em></p>
<blockquote>
  &ldquo;The American Republicans of the city and county of Philadelphia, who are determined to support the native Americans in their constitutional rights of peaceably assembling to express their opinions on any question of public policy, and to sustain them against the assaults of aliens and foreigners are requested to assemble on Monday afternoon, May 6th, 1844, at 4 o'clock, at the corner of Master and Second Street, Kensington, to express their indignation at the outrage on Friday evening last, which was perpetrated by the Irish Catholics.&rdquo;
</blockquote>
`;
const asaWhitneyProposal = `
<p><em>Asa Whitney, &ldquo;National Railroad, Connecting the Atlantic and Pacific Ocean,&rdquo; memorial to Congress, 1845</em></p>
<blockquote>
  <p>&ldquo;Your Memorialist represents to your honorable body that he has devoted much time and attention to the subject of a railroad from Lake Michigan through the Rocky Mountains to the Pacific Ocean, and that he finds such a route practicable, the results from which would be incalculable.&rdquo;</p>
  <p>&ldquo;It would enable us, in the short space of eight days (and perhaps less) to concentrate all the forces of our vast country at any point from Maine to Oregon. Such easy and rapid communication with such facilities for exchanging the different products of the different parts would bring all our immensely widespread population together.&rdquo;</p>
  <p>&ldquo;With a railroad to the Pacific, and thence to China by steamers, the trip can be performed in thirty days, being now a distance of nearly seventeen thousand miles. Then the drills and sheetings of Connecticut, Rhode Island, and Massachusetts, and other manufactures of the United States, may be transported to China in thirty days; and the teas and rich silks of China, in exchange, come back to New Orleans, to Charleston, to Washington, to Baltimore, to Philadelphia, New York, and to Boston, in thirty days more.&rdquo;</p>
</blockquote>
`;
const whitmanGiddingsExcerpts = `
<p><em>Walt Whitman, editorial in the <cite>Brooklyn Eagle</cite>, 1846</em></p>
<blockquote>
  <p>&ldquo;Yes: Mexico must be thoroughly chastised! ... We have sought peace through every avenue, and shut our eyes to many things, which, had they come from England or France, the President would not have dared to pass over without stern and speedy resentment. ... Let our arms now be carried with a spirit which shall teach the world that, while we are not forward for a quarrel, America knows how to crush, as well as how to expand!&rdquo;</p>
</blockquote>
<p><em>Joshua Giddings, speech in the United States House of Representatives, 1846</em></p>
<blockquote>
  <p>&ldquo;President Polk in his message, as a pretext for sending our army to invade and conquer the country upon the Rio Grande, says: 'Texas by its act of December 19, 1836, had declared the [Rio Grande] to be the boundary of that republic.' ... The truth is that Texas had agreed upon the Nueces as her boundary.&rdquo;</p>
  <p>&ldquo;When the Executive and Congress openly and avowedly took upon themselves the responsibility of extending and perpetuating slavery by the annexation of Texas ... my confidence in the stability of our institutions was shaken, destroyed.&rdquo;</p>
  <p>&ldquo;No man regards this war as just. We know, the country knows, and the civilized world are conscious, that it has resulted from a desire to extend and sustain an institution on which the curse of the Almighty most visibly rests.&rdquo;</p>
</blockquote>
`;
const civilWarMilitaryTables = `
<figure style="text-align:center;">
  <img src="/images/civil_war_soldiers_profession.png" alt="Union and Confederate soldiers by profession and military membership" style="max-width:100%; border-radius:12px; box-shadow:0 12px 30px rgba(0,0,0,0.12);" />
  <figcaption style="margin-top:8px; font-size:12px; color:#6b7280;">
    Source: Adapted from James M. McPherson, <cite>Battle Cry of Freedom: The Civil War Era</cite> (1988).
  </figcaption>
</figure>
`;
const henryClayCompromiseExcerpt = `
<p><em>Henry Clay, speech in the United States Senate, 1850</em></p>
<blockquote>
  <p>&ldquo;With regard to the northwestern States, to which the ordinance of 1787 was applied &mdash; Ohio, Indiana, Illinois, and Michigan &mdash; no one now believes that any one of those States, if they thought proper to do it, has not just as much a right to introduce slavery within her borders as Virginia has a right to maintain the existence of slavery within hers.&rdquo;</p>
  <p>&ldquo;Then, if in this struggle of power and empire between the two classes of states a decision of California has taken place adverse to the wishes of the southern States, it is a decision not made by the General Government; it is a decision respecting which they cannot complain to the General Government. It is a decision made by California herself, and which California had incontestably a right to make under the Constitution of the United States.&rdquo;</p>
</blockquote>
`;
const lincolnIndependenceHallExcerpt = `
<p><em>Abraham Lincoln, remarks at Independence Hall, Philadelphia, February 22, 1861</em></p>
<blockquote>
  <p>&ldquo;I am filled with deep emotion at finding myself standing here in the place ... from which sprang the institutions under which we live. I have never had a feeling politically that did not spring from the sentiments embodied in the Declaration of Independence.&rdquo;</p>
  <p>&ldquo;Now, my friends, can this country be saved upon that basis? If it can, I will consider myself one of the happiest men in the world if I can help to save it. If it can't be saved upon that principle, it will be truly awful.&rdquo;</p>
  <p>&ldquo;Now, in my view of the present aspect of affairs, there need be no bloodshed and war. And I may say in advance, there will be no blood shed unless it be forced upon the Government.&rdquo;</p>
</blockquote>
`;
const frederickDouglassEditorial = `
<p><em>Frederick Douglass, editorial, April 1863</em></p>
<blockquote>
  <p>&ldquo;Whether you are or are not, entitled to all the rights of citizenship in this country has long been a matter of dispute to your prejudice. By enlisting in the service of your country at this trial hour, and upholding the National Flag, you stop the mouths of cynics and win applause even from the iron lips of ingratitude. Enlist and you make this your country in common with all other men born in the country or out of it.&rdquo;</p>
  <p>&ldquo;He who fights the battles of America may claim America as his country &mdash; and have that claim respected. Thus in defending your country now against rebels and traitors you are defending your own liberty, honor, manhood and self-respect.&rdquo;</p>
  <p>&ldquo;History shall record the names of heroes and martyrs who bravely answered the call of patriotism and Liberty ... let it not be said that in the long list of glory, composed of men of all nations, there appears the name of no colored man.&rdquo;</p>
</blockquote>
`;
const emancipationDocumentSet = `
<p><strong>Document 1</strong>: New-York Daily Tribune, &ldquo;The Contraband Chattels Question,&rdquo; May 31, 1861</p>
<blockquote>
  <p>&ldquo;When eight runaway slaves arrived in the Union Army camp at Fort Monroe, Virginia, General Ashley was detailed to interview them and report. 'What are you going to do with us?' the negroes asked. General Ashley replied, 'We shall not harm you.' ... The next day ... 40 or 50 more came into camp.&rdquo;</p>
</blockquote>
<p><strong>Document 2</strong>: Brigadier General Joseph K. F. Mansfield to the contraband commission, February 9, 1862</p>
<blockquote>
  <p>&ldquo;All ... have been claimed as property by the very rebels who have taken up arms against the United States. ... Now, what are these negroes? Are they not free men, by this state of rebellion? ... They are entitled as laborers to all the wages they can earn, and to go where they please.&rdquo;</p>
</blockquote>
<p><strong>Document 3</strong>: Abraham Lincoln, proclamation regarding General David Hunter, May 19, 1862</p>
<blockquote>
  <p>&ldquo;Neither General Hunter, nor any other commander or person, has been authorized by the Government of the United States to make proclamations declaring the slaves of any State free; and the supposed proclamation is altogether void. ... I recommended to Congress ... that the United States ought to cooperate with any State which may adopt a gradual abolishment of slavery, giving to such State pecuniary aid.&rdquo;</p>
</blockquote>
<p><strong>Document 4</strong>: Frederick Douglass, &ldquo;What the People Expect of Mr. Lincoln,&rdquo; August 1862</p>
<blockquote>
  <p>&ldquo;Mr. Lincoln should be informed that the people are becoming impatient for the execution of the important laws just passed by Congress ... Not one man in twenty throughout the free States disapproves ... Mr. Lincoln must hasten the publication of his proclamation and the framing of his rules for the employment of the blacks, or he will find himself ... behind the public sentiment.&rdquo;</p>
</blockquote>
<p><strong>Document 5</strong>: Private Samuel Cabble to his wife, June 1863</p>
<blockquote>
  <p>&ldquo;Dear Wife, I have enlisted in the army. ... Though great is the present national difficulties, yet I look forward to a brighter day when I shall have the opportunity of seeing you in the full enjoyment of freedom. ... I am a soldier now, and I shall use my utmost endeavor to strike at the rebellion and the heart of this system that so long has kept us in chains.&rdquo;</p>
</blockquote>
<p><strong>Document 6</strong>: Abraham Lincoln to James Conkling, August 26, 1863</p>
<blockquote>
  <p>&ldquo;You dislike the Emancipation Proclamation; and, perhaps, would have it retracted. You say it is unconstitutional&mdash;I think differently. I think the Constitution invests its commander-in-chief, with the law of war, in time of war. ... You say you will not fight to free negroes. Some of them seem willing to fight for you; but, no matter. Fight you, then, exclusively to save the Union. I issued the proclamation on purpose to aid you in saving the Union.&rdquo;</p>
</blockquote>
`;
const reconstructionViolenceExcerpts = `
<p><em>George C. Rable, <cite>But There Was No Peace: The Role of Violence in the Politics of Reconstruction</cite>, 1984</em></p>
<blockquote>
  <p>&ldquo;After Appomattox the South&rsquo;s political leaders saw themselves entering an era of revolutionary changes imposed by the national government, which many viewed as an outside power. ... Some southerners turned to the Ku Klux Klan and other white supremacist organizations, using terrorism to eliminate opposition leaders. ... Terrorism in the Reconstruction era was instrumental in achieving the ends desired by its perpetrators.&rdquo;</p>
</blockquote>
<p><em>Eric Foner, <cite>Reconstruction: America&rsquo;s Unfinished Revolution, 1863&ndash;1877</cite>, 1988</em></p>
<blockquote>
  <p>&ldquo;In its pervasive impact and multiplicity of purposes, the wave of counterrevolutionary terror that swept over large parts of the South between 1868 and 1871 lacks a counterpart in the American experience. ... Adopted in 1870 and 1871, a series of Enforcement Acts embodied the Congressional response to violence. ... In terms of its larger purposes&mdash;restoring order, reinvigorating the morale of Southern Republicans, and enabling blacks to exercise their rights as citizens&mdash;the policy proved a success.&rdquo;</p>
</blockquote>
`;
const thaddeusStevensReconstructionSpeech = `
<p><em>Thaddeus Stevens, speech to the United States House of Representatives, 1867</em></p>
<blockquote>
  <p>&ldquo;Since the surrender of the armies of the confederate States of America a little has been done toward establishing the Government upon true principles of liberty and justice; and but a little if we stop here. We have broken the material shackles of four million slaves. ... But in what have we enlarged their liberty of thought?&rdquo;</p>
  <p>&ldquo;Unless the rebel states, before admission, should be made republican in spirit, and placed under the guardianship of loyal men, all our blood and treasure will have been spent in vain. ... Without it all are sure to be ruled by traitors; and loyal men, black and white, will be oppressed, exiled, or murdered.&rdquo;</p>
  <p>&ldquo;I am for Negro suffrage in every rebel state. ... Every man, no matter what his race or color ... has an equal right to justice, honesty, and fair play with every other man; and the law should secure him those rights.&rdquo;</p>
</blockquote>
`;
const carsonGoldRushExcerpt = `
<p><em>James H. Carson, memoir describing the California gold fields, 1848</em></p>
<blockquote>
  <p>&ldquo;No roads marked the way to the traveler in California then: but, guided by the sun and well-known mountain peaks, we proceeded on our journey. ... Some forty or fifty men were at work with the cradle machines, and were averaging about eight ounces per day to the man. ... After washing some fifty pans of dirt, I found I had realized about four bits' worth of gold.&rdquo;</p>
  <p>&ldquo;The Indians who were working for Capts. Sutter and Weber gave them leading information, so that they were enabled to know the direction in which new discoveries were to be made. ... The morals of the miners of '48 should here be noticed. No person worked on Sunday at digging for gold. ... We had ministers of the gospel amongst us, but they never preached. Religion had been forgotten, even by its ministers, and instead of their pointing out the narrow way which leads to eternal happiness ... they might have been seen, with pickaxe and pan, traveling untrodden ways in search of treasure or drinking good health and prosperity with friends.&rdquo;</p>
</blockquote>
`;
const greenbergHietalaExcerpts = `
<p><strong>Document 1</strong>: Amy Greenberg, <cite>Manifest Manhood and the Antebellum American Empire</cite>, 2005</p>
<blockquote>
  <p>&ldquo;It was not automatically apparent how any of the filibustering targets of the post-1848 period could 'fit' into an American republic. ... While it seemed only logical to some to simply take all of Mexico as booty of the war ... most Americans rejected this idea. They did so because central Mexico was densely populated. ... Many Americans feared the result of the integration of Mexico's people into the United States.&rdquo;</p>
</blockquote>
<p><strong>Document 2</strong>: Thomas Hietala, <cite>Manifest Design: American Exceptionalism and Empire</cite>, 2003</p>
<blockquote>
  <p>&ldquo;American settlers had eclipsed the Mexicans in Texas and ... had rebelled and won their independence. ... Pioneers played a role in expansion, but the historical record points to politicians and propagandists as the primary agents of empire. Racial, economic, social, and political factors combined to make territorial and commercial expansion enticing to American leaders.&rdquo;</p>
  <p>&ldquo;Expansionists insisted that democracy and dominion were complementary, not contradictory. Since leaders intended to transform cessions into states and their inhabitants (at least whites) into citizens, they scoffed at misgivings about governing a vast domain.&rdquo;</p>
</blockquote>
`;
const calhounSlaverySpeech = `
<p><em>John C. Calhoun, Senate speech, 1847</em></p>
<blockquote>
  <p>&ldquo;It was solemnly asserted on this floor ... that there should be no further admission of any States ... which permitted ... slavery; and ... that slavery shall not hereafter exist in any of the territories of the United States. ... The subject has been agitated in the other House, and they have sent up a bill 'prohibiting the extension of slavery ... to any territory which may be acquired by the United States hereafter.' ... Sir, there is no mistaking the signs of the times; and it is high time that the Southern States ... should inquire what is now their relative strength in this Union.&rdquo;</p>
</blockquote>
`;
const douglassGreeleyLetter = `
<p><em>Frederick Douglass to Horace Greeley, 1846</em></p>
<blockquote>
  <p>&ldquo;I know not how to thank you for the deep and lively interest you have been pleased to take in the cause of ... the emancipation of a people who ... have endured ... bondage. ... It is such indications on the part of the press ... that kindle up within me an ardent hope that the curse of slavery will not much longer be permitted to make its iron footprints in the lacerated hearts of my brethren.&rdquo;</p>
  <p>&ldquo;I am called, by way of reproach, a runaway slave. As if it were a crime ... for a man to take his inalienable rights! ... The object ... is simply to give such an exposition of the degrading influence of slavery upon the master and his supporters as well as upon the slave ... to excite such an intelligent interest ... as may react upon that country, and tend to shame her out of her adhesion to a system which all must confess to disagree with justice.&rdquo;</p>
</blockquote>
`;
const waitmanWilleySpeech = `
<p><em>Waitman T. Willey, address to the Virginia Secession Convention, March 4, 1861</em></p>
<blockquote>
  <p>&ldquo;What fault has there been on the part of the General Government of the United States? Why break up this Union? ... I am not here to defend the election of Abraham Lincoln. ... He was nominated and elected according to the forms of law.&rdquo;</p>
  <p>&ldquo;Let us look at the evils that must result from secession. ... Our country would not only be divided into a Northern Confederacy and a Southern Confederacy, but ... into sundry petty Confederacies. ... It is easy perhaps to break down this Government; but, sir, when we break it down it will not be so easy a matter to build it up.&rdquo;</p>
</blockquote>
`;
const nastThanksgivingCartoon = `
<p><em>Thomas Nast, &ldquo;Uncle Sam's Thanksgiving Dinner,&rdquo; 1869</em></p>
<p>The engraving depicts Uncle Sam carving a turkey at a bountiful table while racially diverse guests, including African American, Chinese, and European families, dine together beneath a banner that reads &ldquo;Universal Suffrage&rdquo; in celebration of the Fifteenth Amendment.</p>
`;
const levineLangguthExcerpts = `
<p><strong>Document 1</strong>: Bruce Levine, <cite>The Fall of the House of Dixie</cite>, 2013</p>
<blockquote>
  <p>&ldquo;Forces committed to restoring white supremacy launched a ruthless, bloody campaign of terror and intimidation against freedpeople and their white allies in the South. ... As young southern units of the Republican Party broke under those blows and the Republicans of the North retreated and grew more conservative, Reconstruction collapsed.&rdquo;</p>
</blockquote>
<p><strong>Document 2</strong>: A. J. Langguth, <cite>After Lincoln</cite>, 2014</p>
<blockquote>
  <p>&ldquo;For many poor whites throughout the South, Jim Crow laws alone could not ease their most persistent fear. ... With control of the South passing again to the Democrats, powerless whites were joining plantation owners to ensure that Black workers remained without their basic rights.&rdquo;</p>
</blockquote>
`;
const lincolnConklingLetter = `
<p><em>Abraham Lincoln to James Conkling, August 26, 1863</em></p>
<blockquote>
  <p>&ldquo;You desire peace; and you blame me that we do not have it. ... You dislike the Emancipation Proclamation; and, perhaps, would have it retracted. You say it is unconstitutional&mdash;I think differently. I think the Constitution invests its commander-in-chief, with the law of war, in time of war.&rdquo;</p>
  <p>&ldquo;You say you will not fight to free negroes. Some of them seem willing to fight for you. ... I issued the proclamation on purpose to aid you in saving the Union. ... If they stake their lives for us, they must be prompted by the strongest motive&mdash;even the promise of freedom. And the promise being made, must be kept.&rdquo;</p>
</blockquote>
`;
const regionalComparisonTable = {
  caption: "Regional Comparison of the North and South, 1860",
  headers: ["Indicator", "North", "South"],
  rows: [
    ["Population (millions)", "22", "9"],
    ["Enslaved population (millions)", "0", "4"],
    ["Railroad mileage", "22,000", "9,000"],
    ["Steel and iron output (tons)", "850,000", "35,000"],
    ["Exports (millions of dollars)", "150", "191"],
    ["Factories", "110,000", "18,000"],
    ["Large farms over 500 acres (% of national total)", "16%", "84%"],
  ],
};

export const unit5TopicQuestions: TopicQuestionBank = {
  "5.1": [
    {
      id: "5-1-q1",
      prompt:
        "Based on the excerpts, which statement best describes a major difference between Sinn's and Pfaelzer's interpretations of Gold Rush-era immigration?",
      stimulus: pacificImmigrationDocs,
      options: [
        {
          id: "A",
          text:
            "Sinn highlights the continued arrival of Chinese migrants for varied jobs, while Pfaelzer emphasizes how discriminatory taxes forced many Chinese and Latino miners to leave.",
        },
        {
          id: "B",
          text:
            "Sinn argues Chinese migration collapsed after 1852, while Pfaelzer claims immigration accelerated because of generous state subsidies.",
        },
        {
          id: "C",
          text:
            "Sinn insists white miners resisted taxes, while Pfaelzer contends they eagerly paid extra fees to protect Chinese workers.",
        },
        {
          id: "D",
          text:
            "Sinn portrays California officials as welcoming Chinese settlement, whereas Pfaelzer states that Mexican merchants blocked Chinese ships from departing Hong Kong.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Sinn underscores persistent Chinese migration and employment opportunities, whereas Pfaelzer focuses on the Foreign Miners' Tax driving Chinese and Latino miners away.",
      source: "Elizabeth Sinn and Jean Pfaelzer on Pacific Coast immigration",
    },
    {
      id: "5-1-q2",
      prompt:
        "Which comparison best explains how immigration to the Pacific coast in the 1850s and 1860s related to immigration elsewhere in the United States?",
      stimulus: pacificImmigrationDocs,
      options: [
        {
          id: "A",
          text:
            "Western migration included many arrivals from Asia and Latin America, while immigrants to eastern cities came primarily from Europe.",
        },
        {
          id: "B",
          text:
            "Western territories relied on European immigrants, while eastern states welcomed mostly Asian migrants fleeing famine.",
        },
        {
          id: "C",
          text:
            "Immigrants in the West avoided nativist hostility, whereas immigrants in the East rarely encountered discrimination.",
        },
        {
          id: "D",
          text:
            "Immigration to the West stagnated during the Gold Rush, while immigration to the South surpassed northern arrivals.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "The excerpts show western communities drawing immigrants from Asia and Latin America, contrasting with the predominantly European immigration shaping eastern cities.",
      source: "Elizabeth Sinn and Jean Pfaelzer on Pacific Coast immigration",
    },
    {
      id: "5-1-q3",
      prompt:
        "Which historical effect of Pacific Coast immigration in the 1850s and 1860s is best illustrated by the excerpts?",
      stimulus: pacificImmigrationDocs,
      options: [
        {
          id: "A",
          text:
            "Gold Rush migration prevented California from reaching the population threshold for statehood.",
        },
        {
          id: "B",
          text:
            "Chinese immigration intensified nativist backlash that inspired restrictive state and local laws.",
        },
        {
          id: "C",
          text:
            "The rapid inflow of migrants convinced Congress to halt debates over Manifest Destiny.",
        },
        {
          id: "D",
          text:
            "Large numbers of miners persuaded the federal government to abandon railroad construction in the West.",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Pfaelzer describes how taxes and hostility targeted Chinese and Latino miners, reflecting the rise of nativist efforts to curtail their presence.",
      source: "Elizabeth Sinn and Jean Pfaelzer on Pacific Coast immigration",
    },
    {
      id: "5-1-q4",
      prompt:
        "Anti-immigrant nativism of the 1840s and 1850s had the most in common with which of the following earlier developments?",
      options: [
        {
          id: "A",
          text:
            "The passage of the Alien and Sedition Acts (1798), which limited rights for foreign-born residents",
        },
        {
          id: "B",
          text:
            "The conflict between Patriots and Loyalists during the American Revolution",
        },
        {
          id: "C",
          text:
            "The persecution of religious dissenters in the Massachusetts Bay Colony",
        },
        {
          id: "D",
          text:
            "The signing of the Treaty of Greenville (1794) that ended wars between the United States and Native Americans in the Northwest Territory",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Both the Alien and Sedition Acts and nineteenth-century nativism sought to restrict the rights of perceived troublesome immigrants, highlighting a pattern of suspicion toward newcomers.",
    },
    {
      id: "5-1-q5",
      prompt:
        "Which factor best explains the territorial expansion of slavery in the middle of the nineteenth century?",
      options: [
        { id: "A", text: "Belief in Manifest Destiny encouraged settlers to move west." },
        {
          id: "B",
          text: "The Mexican-American War incorporated extensive new lands into the United States.",
        },
        {
          id: "C",
          text: "The rise of industry in the North created greater demand for cotton.",
        },
        {
          id: "D",
          text: "The growing nativist movement sought to place restrictions on new immigrants.",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Victory over Mexico added the vast Mexican Cession, raising urgent debates about whether slavery would expand into the new territories.",
    },


    {
      id: "5-1-q6",
      prompt:
        "Sentiments expressed by business leaders and politicians like Whitney most directly contributed to which development?",
      stimulus: asaWhitneyProposal,
      options: [
        {
          id: "A",
          text: "Widespread acceptance of moral reform movements",
        },
        {
          id: "B",
          text: "The creation of diplomatic ties with foreign nations",
        },
        {
          id: "C",
          text: "A sharp decline in immigration from European countries",
        },
        {
          id: "D",
          text: "A fostering of new religious understanding",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Whitney linked the railroad to expanding trade with Asia, mirroring midcentury efforts to build diplomatic and commercial ties abroad.",
      source: "Asa Whitney memorial to Congress, 1845",
    },
    {
      id: "5-1-q7",
      prompt: "The excerpt best reflects which of the following developments?",
      stimulus: asaWhitneyProposal,
      options: [
        { id: "A", text: "Popular support for the idea of Manifest Destiny" },
        { id: "B", text: "The emergence of nativist political parties" },
        { id: "C", text: "The collapse of the Second Party System" },
        { id: "D", text: "An increase in sectional tensions before the Civil War" },
      ],
      correctOptionId: "A",
      explanation:
        "Whitney's dream of a coast-to-coast railroad embodied the popular belief that the United States was destined to span the continent.",
      source: "Asa Whitney memorial to Congress, 1845",
    },
    {
      id: "5-1-q8",
      prompt:
        "Which factor most directly contributed to Whitney's request in the excerpt?",
      stimulus: asaWhitneyProposal,
      options: [
        { id: "A", text: "The removal of Native Americans east of the Mississippi" },
        {
          id: "B",
          text: "Passage of legislation ending the international slave trade",
        },
        {
          id: "C",
          text: "A desire for international trade and access to global markets",
        },
        {
          id: "D",
          text: "Expansion of westward settlement following the Civil War",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Whitney argued that a transcontinental railroad would speed commerce with Asia, revealing the era's push for global markets.",
      source: "Asa Whitney memorial to Congress, 1845",
    },
    {
      id: "5-1-q9",
      prompt: "Which statement best describes the concept of Manifest Destiny?",
      options: [
        {
          id: "A",
          text:
            "The belief that the United States had a providential mission to expand its influence from the Atlantic to the Pacific.",
        },
        {
          id: "B",
          text: "A plan to restrict US settlement to territories east of the Mississippi River.",
        },
        { id: "C", text: "A program to grant immediate voting rights to all immigrants." },
        {
          id: "D",
          text: "A strategy to industrialize the South through protective tariffs.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Manifest Destiny framed continental expansion as a mission sanctioned by God and history, justifying westward settlement and conquest.",
    },
    {
      id: "5-1-q10",
      prompt:
        "Which development best explains why Manifest Destiny rhetoric surged in popularity during the 1840s?",
      options: [
        {
          id: "A",
          text:
            "Advocates sought to justify war with Mexico and the annexation of western territories.",
        },
        {
          id: "B",
          text:
            "The federal government aimed to end the transatlantic slave trade after 1808.",
        },
        {
          id: "C",
          text:
            "Southern planters began abandoning cotton cultivation in favor of manufacturing.",
        },
        {
          id: "D",
          text:
            "Supreme Court rulings prohibited settlers from migrating beyond the Appalachians.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Leaders used Manifest Destiny to rally support for annexing Texas and seizing Mexican lands for American settlement.",
    },
    {
      id: "5-1-q11",
      prompt:
        "Which statement identifies a historical similarity between Manifest Destiny in the 1840s and European colonization of North America in the 1600s?",
      options: [
        {
          id: "A",
          text:
            "Both invoked religious or providential justifications to legitimize settling new lands.",
        },
        {
          id: "B",
          text:
            "Manifest Destiny encouraged religious diversity, whereas seventeenth-century colonists rejected religious motives.",
        },
        {
          id: "C",
          text:
            "Only expansionists in the 1840s sought economic opportunity; early colonists focused exclusively on diplomacy.",
        },
        {
          id: "D",
          text:
            "Seventeenth-century colonists embraced racial equality, whereas nineteenth-century settlers opposed it.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Both movements blended spiritual mission and opportunity, echoing Puritan ideas that God favored their expansion.",
    },


  ],
  "5.2": [
    {
      id: "5-2-q1",
      prompt: "The excerpt best reflects which historical situation?",
      stimulus: henryClayCompromiseExcerpt,
      options: [
        {
          id: "A",
          text:
            "Congressional leaders sought political compromise to resolve discord between the North and the South.",
        },
        {
          id: "B",
          text:
            "States in the Great Lakes region advocated to legalize slavery within their borders.",
        },
        {
          id: "C",
          text:
            "Senators appealed to the idea of American exceptionalism to encourage national unity.",
        },
        {
          id: "D",
          text:
            "The Supreme Court decision in the Dred Scott case reduced sectional conflict within the United States.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Clay urged compromise to calm sectional tensions, a hallmark of the debates that produced the Compromise of 1850.",
      source: "Henry Clay, Senate speech, 1850",
    },
    {
      id: "5-2-q2",
      prompt:
        "The position expressed by Clay best serves as evidence of which broader development?",
      stimulus: henryClayCompromiseExcerpt,
      options: [
        {
          id: "A",
          text: "Northern politicians showed less interest in California than Southern politicians.",
        },
        {
          id: "B",
          text: "The United States Senate could not agree on treaty terms with Mexico.",
        },
        {
          id: "C",
          text: "The acquisition of new territories created disputes over the expansion of slavery.",
        },
        {
          id: "D",
          text: "Nativist groups opposed incorporating new states into the Union.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Clay's comments addressed debate over California's status, illustrating how new territories reignited conflict over slavery's expansion.",
      source: "Henry Clay, Senate speech, 1850",
    },
    {
      id: "5-2-q3",
      prompt:
        "The excerpt best corroborates which broader historical context?",
      stimulus: henryClayCompromiseExcerpt,
      options: [
        {
          id: "A",
          text:
            "Expanded trade between the East and West Coasts and with Asia divided the country in new ways.",
        },
        {
          id: "B",
          text:
            "Abolitionist activity undermined the ability of new territories to achieve statehood.",
        },
        {
          id: "C",
          text:
            "Southern states sought more proslavery seats in the United States Congress.",
        },
        {
          id: "D",
          text:
            "New political parties such as the Know-Nothings threatened the system of slavery.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Clay referenced sectional rivalry over the political power of free and slave states, reflecting southern efforts to maintain proslavery influence in Congress.",
      source: "Henry Clay, Senate speech, 1850",
    },
  ],
  "5.3": [
    {
      id: "5-3-q1",
      prompt:
        "The Kansas-Nebraska Act of 1854 was most similar in intent to which earlier legislative initiative?",
      options: [
        { id: "A", text: "The Missouri Compromise in 1820" },
        { id: "B", text: "The forced removal of American Indians" },
        { id: "C", text: "Funding of internal improvements under the American System" },
        { id: "D", text: "The annexation of Texas in 1836" },
      ],
      correctOptionId: "A",
      explanation:
        "Both laws attempted to settle sectional disputes over the spread of slavery by drawing political compromises around territorial expansion.",
    },
  ],
  "5.4": [
    {
      id: "5-4-q1",
      prompt:
        "The United States Supreme Court's decision in Dred Scott v. Sandford (1857) departed from earlier practices in which way?",
      options: [
        {
          id: "A",
          text:
            "It established the principle of judicial review, allowing the Court to strike down unconstitutional laws.",
        },
        {
          id: "B",
          text:
            "It introduced popular sovereignty, letting residents of a territory vote on slavery.",
        },
        {
          id: "C",
          text:
            "It expanded fugitive slave laws that permitted slaveholders to recover escaped enslaved people in free states.",
        },
        {
          id: "D",
          text:
            "It held that the federal government had no power to regulate slavery in federal territories acquired after the creation of the United States.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "By declaring Congress lacked authority to bar slavery from the territories, the Court overturned compromises like the Missouri Compromise.",
    },
    {
      id: "5-4-q2",
      prompt:
        "The excerpt best serves as evidence for which development in early 1861?",
      stimulus: lincolnIndependenceHallExcerpt,
      options: [
        {
          id: "A",
          text: "Lincoln attempted to increase the size of the army to regain Southern states.",
        },
        {
          id: "B",
          text: "Lincoln rejected allowing any additional states to join the United States.",
        },
        {
          id: "C",
          text: "Lincoln sought to avoid violence over the issues that divided the country.",
        },
        {
          id: "D",
          text: "Lincoln intended to enforce the Kansas-Nebraska Act.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Lincoln promised force only if war were forced on the government, revealing his effort to avert conflict while standing by Union principles.",
      source: "Abraham Lincoln, Independence Hall remarks, 1861",
    },
    {
      id: "5-4-q3",
      prompt:
        "The excerpt most likely reflects which historical situation?",
      stimulus: lincolnIndependenceHallExcerpt,
      options: [
        { id: "A", text: "Abraham Lincoln won all of the electoral college votes in the presidential election." },
        { id: "B", text: "Formerly enslaved people were given the right to vote in presidential elections." },
        { id: "C", text: "Southern states refused to participate in the presidential election." },
        { id: "D", text: "States in the South had begun seceding after the presidential election." },
      ],
      correctOptionId: "D",
      explanation:
        "Lincoln addressed a nation in crisis after seven Southern states declared secession in the wake of his election.",
      source: "Abraham Lincoln, Independence Hall remarks, 1861",
    },
    {
      id: "5-4-q4",
      prompt:
        "Evidence in the excerpt best corroborates which of the following?",
      stimulus: lincolnIndependenceHallExcerpt,
      options: [
        {
          id: "A",
          text:
            "Southern politicians would not abandon slavery and viewed Lincoln as a threat to the system.",
        },
        {
          id: "B",
          text:
            "Sectional divisions were not as deep as many thought, and there was agreement about gradual abolition.",
        },
        {
          id: "C",
          text:
            "Political leadership in previous administrations successfully limited sectional conflict.",
        },
        {
          id: "D",
          text:
            "Lincoln viewed foreign influences as serious threats to the stability of the United States.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Lincoln's remarks responded to southern secessionists determined to protect slavery, underscoring how the slavery issue drove the crisis.",
      source: "Abraham Lincoln, Independence Hall remarks, 1861",
    },
  ],
  "5.5": [
    {
      id: "5-5-q1",
      prompt:
        "The data in the tables indicate which of the following?",
      stimulus: civilWarMilitaryTables,
      options: [
        {
          id: "A",
          text: "Confederate forces suffered more casualties than Union forces.",
        },
        {
          id: "B",
          text: "The Confederacy lost more of its skilled workers than did the Union.",
        },
        {
          id: "C",
          text: "The Union lost a greater percentage of its population than did the Confederacy.",
        },
        {
          id: "D",
          text: "Confederate armies lost a greater proportion of their soldiers than did the Union.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "Despite fewer absolute casualties, Confederate losses represented nearly 40 percent of their forces, compared with roughly a quarter for the Union.",
      source: "Civil War enlistment and occupation data compiled by James M. McPherson",
    },
    {
      id: "5-5-q2",
      prompt:
        "The data in the first table most directly indicate which of the following about the professions of Civil War soldiers?",
      stimulus: civilWarMilitaryTables,
      options: [
        {
          id: "A",
          text: "The Confederacy enlisted more factory workers to fill its armies than did the Union.",
        },
        {
          id: "B",
          text: "The Confederacy relied more heavily on agricultural workers to fill its armies than did the Union.",
        },
        {
          id: "C",
          text: "The majority of soldiers in both Confederate and Union forces were sharecroppers.",
        },
        {
          id: "D",
          text: "The Confederacy enlisted more skilled workers than did the Union.",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Over 60 percent of Confederate soldiers were farmers or farm laborers, compared with under half of Union soldiers, showing southern dependence on agricultural recruits.",
      source: "Civil War enlistment and occupation data compiled by James M. McPherson",
    },
    {
      id: "5-5-q3",
      prompt:
        "The data in the tables most likely indicate which of the following?",
      stimulus: civilWarMilitaryTables,
      options: [
        {
          id: "A",
          text: "The Union had more educated leadership in its army than did the Confederacy.",
        },
        {
          id: "B",
          text: "The Confederacy more typically enlisted enslaved African Americans to fill its army.",
        },
        {
          id: "C",
          text: "The Union had a larger and more diverse population of workers to enlist from than did the Confederacy.",
        },
        {
          id: "D",
          text: "The Confederacy had more wealthy people in its armed forces than did the Union.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "The Union's larger enlistment totals and more varied occupational mix reflected its broader population base and diversified economy.",
      source: "Civil War enlistment and occupation data compiled by James M. McPherson",
    },
    {
      id: "5-5-q4",
      prompt:
        "Which factor can best be used to explain the Union victory in the Civil War?",
      options: [
        {
          id: "A",
          text: "Superior military leadership, particularly early in the war",
        },
        {
          id: "B",
          text: "Greater population and industrial development",
        },
        {
          id: "C",
          text: "Stronger resilience and ideological commitment to a cause",
        },
        {
          id: "D",
          text: "Better understanding of contested territory and shorter supply lines",
        },
      ],
      correctOptionId: "B",
      explanation:
        "The Union leveraged its larger population and industrial capacity to field bigger armies and supply them, critical advantages in a prolonged war.",
    },
  ],
  "5.6": [
    {
      id: "5-6-q1",
      prompt:
        "Historians could best use the poster excerpt as evidence for which development?",
      stimulus: americanRepublicanPoster,
      options: [
        {
          id: "A",
          text: "Expansion of voting rights during the Jackson administration",
        },
        {
          id: "B",
          text: "Debates over the separation of church and state in the United States",
        },
        {
          id: "C",
          text: "Advocacy for policies promoting Manifest Destiny",
        },
        {
          id: "D",
          text: "Political responses to changing demographics in the United States",
        },
      ],
      correctOptionId: "D",
      explanation:
        "The broadside denounces Irish Catholic immigrants, revealing how nativist politics reacted to demographic change and stirred unrest within northern communities.",
      source: "American Republican Party broadside, 1844",
    },
    {
      id: "5-6-q2",
      prompt:
        "Which historical situation best explains how contemporaries would have interpreted the poster?",
      stimulus: americanRepublicanPoster,
      options: [
        { id: "A", text: "The rise in immigration to the United States" },
        { id: "B", text: "The decline of the international slave trade" },
        { id: "C", text: "The expansion of manufacturing in the South" },
        { id: "D", text: "The start of the women's rights movement" },
      ],
      correctOptionId: "A",
      explanation:
        "Large-scale immigration from Ireland and Germany in the 1840s prompted nativist mobilization like the American Republican Party, highlighting domestic tensions that affected life on the home front.",
      source: "American Republican Party broadside, 1844",
    },
    {
      id: "5-6-q3",
      prompt:
        "The language in the poster most directly promotes which of the following?",
      stimulus: americanRepublicanPoster,
      options: [
        { id: "A", text: "States' rights" },
        { id: "B", text: "Nativist sentiment" },
        { id: "C", text: "Religious pluralism" },
        { id: "D", text: "Abolitionist activism" },
      ],
      correctOptionId: "B",
      explanation:
        "The American Republican appeal urged native-born Protestants to defend themselves against immigrants, a nativist impulse that fueled social conflict on the home front.",
      source: "American Republican Party broadside, 1844",
    },
    {
      id: "5-6-q4",
      prompt:
        "Which comparison best describes Whitman's and Giddings's arguments about the Mexican-American War?",
      stimulus: whitmanGiddingsExcerpts,
      options: [
        {
          id: "A",
          text:
            "Whitman believed the United States should show patience before war, while Giddings argued the country had tolerated abuses for too long without war.",
        },
        {
          id: "B",
          text:
            "Whitman argued that the war was intended to deter bad behavior, while Giddings argued that the war represented aggression by the United States.",
        },
        {
          id: "C",
          text:
            "Giddings asserted that the nation entered the war as a last resort, while Whitman asserted that the war was unnecessary to achieve the goals of the United States.",
        },
        {
          id: "D",
          text:
            "Giddings claimed that the war had popular support in the United States, while Whitman claimed that most Americans opposed the war.",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Whitman viewed the war as necessary punishment for Mexico, whereas Giddings denounced it as unjust aggression, illustrating competing home-front perspectives on conflict.",
      source: "Walt Whitman and Joshua Giddings on the Mexican-American War",
    },
    {
      id: "5-6-q5",
      prompt:
        "Based on the excerpts, Giddings would likely agree with and Whitman would likely disagree with which claim about the causes of the Mexican-American War?",
      stimulus: whitmanGiddingsExcerpts,
      options: [
        { id: "A", text: "The United States sought repayment of Mexican debts." },
        { id: "B", text: "Mexico had killed Americans during a previous conflict in Texas." },
        {
          id: "C",
          text:
            "The United States desired to expand slavery into Mexican territory.",
        },
        {
          id: "D",
          text: "Mexico had sent soldiers across the southern border of the United States.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Giddings condemned the war as an effort to extend slavery, a motive Whitman never cited in his call for military action, highlighting domestic disagreements over war aims.",
      source: "Walt Whitman and Joshua Giddings on the Mexican-American War",
    },
    {
      id: "5-6-q6",
      prompt:
        "Which statement best describes a similarity in how Whitman and Giddings made their arguments?",
      stimulus: whitmanGiddingsExcerpts,
      options: [
        {
          id: "A",
          text: "Both used examples of Mexico's behavior to support their points.",
        },
        {
          id: "B",
          text:
            "Both sought to justify their positions to international observers.",
        },
        {
          id: "C",
          text:
            "Both drew on principles from the Constitution to make their claims.",
        },
        {
          id: "D",
          text: "Both made religious appeals to prove their assertions.",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Each writer referenced global opinion, with Whitman citing American patience before the world and Giddings appealing to the judgment of the civilized world, revealing the importance of public persuasion on the home front.",
      source: "Walt Whitman and Joshua Giddings on the Mexican-American War",
    },
  ],  "5.7": [
    {
      id: "5-7-q1",
      prompt:
        "Ideas expressed by Douglass in the excerpt were most likely interpreted as supporting which argument about the Civil War?",
      stimulus: frederickDouglassEditorial,
      options: [
        { id: "A", text: "The war would make African Americans feel free." },
        { id: "B", text: "The war was the product of years of injustice against African Americans." },
        { id: "C", text: "The war would take enormous sacrifice of military combat to achieve victory." },
        { id: "D", text: "The war was no longer just about preserving the union of the states." },
      ],
      correctOptionId: "D",
      explanation:
        "Douglass framed the conflict as a struggle for liberty and citizenship, signaling a shift from mere Union preservation to ending slavery.",
      source: "Frederick Douglass, April 1863 editorial",
    },
    {
      id: "5-7-q2",
      prompt:
        "Which statement best explains Douglass's point of view in the excerpt?",
      stimulus: frederickDouglassEditorial,
      options: [
        {
          id: "A",
          text:
            "African American enlistment would enable the Union Army to prevail in the Civil War.",
        },
        {
          id: "B",
          text:
            "Once African American men enlisted, Northern White soldiers would accept them as equals.",
        },
        {
          id: "C",
          text:
            "Shared sacrifice would help advance African American men's claims to United States citizenship.",
        },
        {
          id: "D",
          text:
            "Northern politicians overwhelmingly favored enlistment of African Americans in the Union Army.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Douglass urged Black men to fight to prove their loyalty and secure recognition of their rights as citizens.",
      source: "Frederick Douglass, April 1863 editorial",
    },
    {
      id: "5-7-q3",
      prompt:
        "Douglass's rhetoric in the excerpt was most likely interpreted as promoting which of the following?",
      stimulus: frederickDouglassEditorial,
      options: [
        { id: "A", text: "The need for more soldiers in the Union Army" },
        { id: "B", text: "His advocacy for African American equal rights" },
        { id: "C", text: "His support for Abraham Lincoln's reelection in 1864" },
        { id: "D", text: "Criticism of the limits of the Emancipation Proclamation" },
      ],
      correctOptionId: "B",
      explanation:
        "Douglass linked enlistment to winning recognition of Black citizenship, continuing his lifelong campaign for equal rights.",
      source: "Frederick Douglass, April 1863 editorial",
    },
    {
      id: "5-7-q4",
      prompt:
        "Which factor contributed most directly to the end of slavery in the United States?",
      options: [
        {
          id: "A",
          text: "The movement of settlers to the West created new economic opportunities.",
        },
        {
          id: "B",
          text: "The arrival of immigrants from Europe and Asia provided an expanded labor force.",
        },
        {
          id: "C",
          text: "The advocacy of slavery as central to the South's economy fostered a unique regional culture.",
        },
        {
          id: "D",
          text:
            "The Union victory in the Civil War led to the ratification of the Thirteenth Amendment.",
        },
      ],
      correctOptionId: "D",
      explanation:
        "Union battlefield success made it possible to pass the Thirteenth Amendment, which abolished slavery nationwide.",
    },
    {
      id: "5-7-q5",
      prompt:
        "Which document from the set best illustrates the agency of enslaved people taking initiative to secure freedom early in the Civil War?",
      stimulus: emancipationDocumentSet,
      options: [
        {
          id: "A",
          text:
            "Document 1, describing enslaved people who fled to Fort Monroe to seek protection from Union forces",
        },
        {
          id: "B",
          text:
            "Document 2, in which General Mansfield argued that contrabands should be paid wages",
        },
        {
          id: "C",
          text:
            "Document 3, in which President Lincoln annulled General Hunter's emancipation order",
        },
        {
          id: "D",
          text:
            "Document 6, where Lincoln justified the Emancipation Proclamation as a war measure",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Document 1 recounts how enslaved people crossed Union lines at Fort Monroe, demonstrating their proactive role in pursuing freedom.",
      source: "Civil War emancipation document set, 1861-1863",
    },
    {
      id: "5-7-q6",
      prompt:
        "Which document most directly supports the argument that the rebellion freed the Union from returning contrabands to enslavers?",
      stimulus: emancipationDocumentSet,
      options: [
        {
          id: "A",
          text:
            "Document 2, where General Mansfield contended that enslaved people escaping to Union lines should be treated as free laborers",
        },
        {
          id: "B",
          text:
            "Document 3, in which President Lincoln proposed compensated emancipation to loyal states",
        },
        {
          id: "C",
          text:
            "Document 4, where Frederick Douglass urged faster enforcement of confiscation laws",
        },
        {
          id: "D",
          text:
            "Document 5, in which Private Samuel Cabble promised to fight for his family's freedom",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Mansfield declared that the Confederates' rebellion released the Union from enforcing fugitive slave laws and warranted paying contrabands for their work.",
      source: "Civil War emancipation document set, 1861-1863",
    },
    {
      id: "5-7-q7",
      prompt:
        "Which document best reflects rising pressure on Lincoln from abolitionists and allies to accelerate emancipation policies?",
      stimulus: emancipationDocumentSet,
      options: [
        {
          id: "A",
          text:
            "Document 1, which reported the arrival of contrabands at Fort Monroe",
        },
        {
          id: "B",
          text:
            "Document 3, which voided General Hunter's immediate emancipation order",
        },
        {
          id: "C",
          text:
            "Document 4, in which Frederick Douglass warned that the president risked lagging behind public sentiment",
        },
        {
          id: "D",
          text:
            "Document 6, which defended the Emancipation Proclamation as constitutional",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Douglass demanded that Lincoln act quickly to enforce confiscation laws and arm Black troops, illustrating abolitionist impatience.",
      source: "Civil War emancipation document set, 1861-1863",
    },
    {
      id: "5-7-q8",
      prompt:
        "Which document most clearly demonstrates President Lincoln's rationale for issuing the Emancipation Proclamation as a wartime necessity?",
      stimulus: emancipationDocumentSet,
      options: [
        {
          id: "A",
          text:
            "Document 2, which insisted contrabands deserved wages for their labor",
        },
        {
          id: "B",
          text:
            "Document 3, which promoted gradual, compensated emancipation in loyal states",
        },
        {
          id: "C",
          text:
            "Document 5, in which a Union soldier pledged to fight for his family's freedom",
        },
        {
          id: "D",
          text:
            "Document 6, where Lincoln argued that wartime powers justified the Emancipation Proclamation to help save the Union",
        },
      ],
      correctOptionId: "D",
      explanation:
        "In Document 6 Lincoln defended the proclamation as a lawful war measure intended to weaken the Confederacy and preserve the Union.",
      source: "Civil War emancipation document set, 1861-1863",
    },
    {
      id: "5-7-q9",
      prompt:
        "Taken together, the documents best illustrate which broader change in Union policy during the Civil War?",
      stimulus: emancipationDocumentSet,
      options: [
        {
          id: "A",
          text:
            "A shift from cautiously treating freedom seekers as contraband to embracing emancipation as part of Union war aims",
        },
        {
          id: "B",
          text:
            "A decision to return all escaped enslaved people to loyal border-state owners throughout the war",
        },
        {
          id: "C",
          text:
            "An immediate postwar focus on compensating slaveholders for property losses in the Confederacy",
        },
        {
          id: "D",
          text:
            "An abandonment of plans to recruit African American soldiers after 1863",
        },
      ],
      correctOptionId: "A",
      explanation:
        "The documents trace developments from contraband policies to arming Black troops and issuing the Emancipation Proclamation, signaling an evolving commitment to freeing enslaved people as a strategy to win the war.",
      source: "Civil War emancipation document set, 1861-1863",
    },
  ],
  "5.8": [
    {
      id: "5-8-q1",
      prompt:
        "Which evidence could best be used to refute Stevens's claim that the Union had done little for formerly enslaved people by 1867?",
      stimulus: thaddeusStevensReconstructionSpeech,
      options: [
        {
          id: "A",
          text:
            "Assistance granted to formerly enslaved people to seek work in Northern factories",
        },
        {
          id: "B",
          text:
            "The creation of schools by the Freedmen's Bureau for formerly enslaved people",
        },
        {
          id: "C",
          text:
            "The widespread redistribution of land from former Confederates to formerly enslaved people",
        },
        {
          id: "D",
          text:
            "The adoption of work as sharecroppers by many formerly enslaved people",
        },
      ],
      correctOptionId: "B",
      explanation:
        "Freedmen's Bureau schools and aid illustrated concrete federal efforts to assist formerly enslaved people, countering Stevens's warning that little had been done.",
      source: "Thaddeus Stevens, Reconstruction speech, 1867",
    },
    {
      id: "5-8-q2",
      prompt:
        "Which development best supports Stevens's claim about the importance of African American suffrage in the excerpt?",
      stimulus: thaddeusStevensReconstructionSpeech,
      options: [
        {
          id: "A",
          text:
            "Republican candidates won most presidential electoral votes in the North in the late 1860s and 1870s.",
        },
        {
          id: "B",
          text:
            "Many Northern business leaders supported the Republican Party during Reconstruction.",
        },
        {
          id: "C",
          text:
            "Democrats dominated Southern states after suppressing African American voting rights.",
        },
        {
          id: "D",
          text:
            "President Ulysses S. Grant used federal authority to counter voter intimidation in the South.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "The rise of Redeemer governments that disfranchised Black voters confirmed Stevens's warning that Republican power would collapse without African American suffrage.",
      source: "Thaddeus Stevens, Reconstruction speech, 1867",
    },
  ],  "5.9": [
    {
      id: "5-9-q1",
      prompt:
        "Which piece of evidence could best be used to modify Foner's main argument in the second excerpt?",
      stimulus: reconstructionViolenceExcerpts,
      options: [
        {
          id: "A",
          text:
            "Many African Americans were elected to the United States Congress for the first time during Reconstruction.",
        },
        {
          id: "B",
          text:
            "Southern states were not permitted to rejoin the Union until they ratified the Fourteenth Amendment.",
        },
        {
          id: "C",
          text:
            "After 1877 Democrats in the South legislated restrictions on the ability of African Americans to vote.",
        },
        {
          id: "D",
          text:
            "Radical Republicans passed the Civil Rights Act of 1875 to protect African Americans against abuses.",
        },
      ],
      correctOptionId: "C",
      explanation:
        "Post-1877 disfranchisement suggests that federal enforcement did not permanently end white supremacist violence, complicating Foner's claim of success.",
      source: "George C. Rable and Eric Foner on Reconstruction violence",
    },
    {
      id: "5-9-q2",
      prompt:
        "Based on their arguments, both Rable and Foner would most likely agree with which claim?",
      stimulus: reconstructionViolenceExcerpts,
      options: [
        { id: "A", text: "The North achieved its aims for Reconstruction." },
        { id: "B", text: "Federal policy during Reconstruction was consistent." },
        { id: "C", text: "Southern resistance hindered Reconstruction." },
        { id: "D", text: "Republicans dominated the South after Reconstruction." },
      ],
      correctOptionId: "C",
      explanation:
        "Each historian noted how white supremacist violence undermined Reconstruction governments, proving that southern resistance was a major obstacle.",
      source: "George C. Rable and Eric Foner on Reconstruction violence",
    },
    {
      id: "5-9-q3",
      prompt:
        "Which statement describes a difference between Rable's and Foner's interpretations in the excerpts?",
      stimulus: reconstructionViolenceExcerpts,
      options: [
        {
          id: "A",
          text:
            "Rable asserts that violence achieved its political goals during Reconstruction, whereas Foner asserts that the violence was suppressed at the time.",
        },
        {
          id: "B",
          text:
            "Rable claims the violence during Reconstruction was unprecedented, whereas Foner claims it followed earlier American patterns.",
        },
        {
          id: "C",
          text:
            "Foner argues that the North lost the will to enforce Reconstruction, whereas Rable argues that the North passed laws carrying out Reconstruction.",
        },
        {
          id: "D",
          text:
            "Foner contends that the South accepted Reconstruction, whereas Rable contends that the South revolted against Reconstruction.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Rable emphasized the ultimate success of terror in toppling Reconstruction governments, while Foner stressed how federal enforcement temporarily defeated groups like the Klan.",
      source: "George C. Rable and Eric Foner on Reconstruction violence",
    },
    {
      id: "5-9-q4",
      prompt:
        "Which similarity between Rable's and Foner's arguments is best supported by the excerpts?",
      stimulus: reconstructionViolenceExcerpts,
      options: [
        { id: "A", text: "Both highlight the use of federal force to uphold the Constitution." },
        { id: "B", text: "Both focus on many Southerners' opposition to racial equality." },
        { id: "C", text: "Both discuss congressional legislation to protect African American suffrage." },
        { id: "D", text: "Both assert that Northerners cared little about the outcome of Reconstruction." },
      ],
      correctOptionId: "B",
      explanation:
        "Each historian described white supremacist violence aimed at limiting Black political power, underscoring resistance to racial equality.",
      source: "George C. Rable and Eric Foner on Reconstruction violence",
    },


  ],
  "5.10": [
    {
      id: "5-10-q1",
      prompt:
        "Which statement best summarizes a key difference in regional identity between many Northerners and many white Southerners during Reconstruction (1865-1877)?",
      options: [
        {
          id: "A",
          text:
            "Many in the North, especially Radical Republicans, linked their identity to expanding civil and political rights, while many white Southerners sought to preserve prewar racial hierarchies.",
        },
        {
          id: "B",
          text:
            "Both regions defined themselves primarily through large-scale industrialization and railroad expansion.",
        },
        {
          id: "C",
          text:
            "Most Northerners rejected federal authority, whereas most Southerners welcomed strong central government oversight.",
        },
        {
          id: "D",
          text:
            "Southern communities rallied around universal male suffrage, while Northern reformers insisted on property qualifications for voting.",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Radical Republicans promoted equal rights and federal enforcement, while many white Southerners defended white supremacy and sought to limit Black citizenship.",
    },
  {
    id: "5-10-q2",
    prompt:
      "Which development provides the strongest evidence for Southern attempts to restore antebellum social relations during Reconstruction?",
    options: [
        {
          id: "A",
          text:
            "The spread of sharecropping contracts and Black Codes that restricted the freedom of formerly enslaved people",
        },
        {
          id: "B",
          text:
            "The Homestead Act's distribution of western lands to settlers willing to farm them",
        },
        {
          id: "C",
          text:
            "Northern investment in transcontinental railroads that connected eastern markets to the Pacific",
        },
        {
          id: "D",
          text:
            "Congressional debates over protective tariffs for emerging industries in New England",
        },
      ],
      correctOptionId: "A",
      explanation:
        "Sharecropping arrangements and Black Codes curtailed Black autonomy, demonstrating southern efforts to recreate dependent labor systems.",
    },
  ],
  "5.11": [
    {
      id: "5-11-q1",
      prompt: "Which development most directly led to the gold-mining activities described in the excerpt?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "A ban on extending slavery north of the Missouri Compromise line" },
        { id: "B", text: "Territorial acquisitions made at the end of the Mexican-American War" },
        { id: "C", text: "President Jackson's veto of the Second Bank of the United States" },
        { id: "D", text: "Completion of the first transcontinental railroad" },
      ],
      correctOptionId: "B",
      explanation:
        "The Treaty of Guadalupe Hidalgo transferred California to the United States, clearing the way for American migrants like Carson to join the 1849 gold rush.",
      source: "James H. Carson, memoir of the California gold fields, 1848",
    },
    {
      id: "5-11-q2",
      prompt: "Which development resulted most directly from the gold rush described in the excerpt?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "Anti-Catholic movements dominated western mining districts." },
        { id: "B", text: "Southern planters transplanted large-scale cotton plantations to the Pacific coast." },
        { id: "C", text: "Migrants from the United States, Europe, and Asia poured into California." },
        { id: "D", text: "The West Coast became the nation's leading manufacturing hub." },
      ],
      correctOptionId: "C",
      explanation:
        "Gold discoveries fueled one of the largest voluntary migrations in U.S. history, drawing fortune seekers from the eastern states as well as Europe, Latin America, and China.",
      source: "James H. Carson, memoir of the California gold fields, 1848",
    },
    {
      id: "5-11-q3",
      prompt: "The excerpt best reflects which broader historical development?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "Emergence of an abolitionist movement in the Far West" },
        { id: "B", text: "Belief in Manifest Destiny and the right to expand across the continent" },
        { id: "C", text: "Dependence of the U.S. economy on cotton exports" },
        { id: "D", text: "Debates about the land rights of displaced Californios and Native nations" },
      ],
      correctOptionId: "B",
      explanation:
        "Carson's eagerness to seek fortune in the Pacific territories illustrates the era's confidence that Americans were destined to control the continent from coast to coast.",
      source: "James H. Carson, memoir of the California gold fields, 1848",
    },
    {
      id: "5-11-q4",
      prompt: "Which argument about the Mexican-American War do the excerpts best support?",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "It marked the first time the United States attempted western expansion." },
        { id: "B", text: "It sparked debates about citizenship and the status of new peoples." },
        { id: "C", text: "It ended sectional disputes between the North and the South." },
        { id: "D", text: "It eliminated the domestic slave trade within the United States." },
      ],
      correctOptionId: "B",
      explanation:
        "Both historians describe U.S. leaders worrying about how to integrate Mexican residents into an expanding republic, highlighting contested ideas about citizenship.",
      source: "Amy Greenberg and Thomas Hietala on the Mexican-American War",
    },
    {
      id: "5-11-q5",
      prompt: "Greenberg's interpretation differs from Hietala's primarily because Greenberg argues that",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "Race was the only factor that caused the Mexican-American War." },
        { id: "B", text: "Pioneers, rather than politicians, engineered U.S. expansion." },
        { id: "C", text: "Most Americans doubted that Mexicans could assimilate into the United States." },
        { id: "D", text: "Americans widely welcomed granting citizenship to conquered peoples." },
      ],
      correctOptionId: "C",
      explanation:
        "Greenberg emphasizes widespread fears that incorporating central Mexico would flood the republic with nonwhite citizens, a theme absent from Hietala's emphasis on political leadership.",
      source: "Amy Greenberg, Manifest Manhood and the Antebellum American Empire",
    },
    {
      id: "5-11-q6",
      prompt: "According to the excerpts, the historical situation described most directly contributed to which development?",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "Continued disruption of Native American cultures across the West" },
        { id: "B", text: "Failure of Reconstruction measures to protect new amendments" },
        { id: "C", text: "Renewed debate over states' rights to nullify federal laws" },
        { id: "D", text: "Supreme Court rulings such as Dred Scott v. Sandford" },
      ],
      correctOptionId: "A",
      explanation:
        "U.S. territorial gains following the war accelerated settler colonialism, intensifying conflicts that displaced Native communities throughout the Southwest and West.",
      source: "Amy Greenberg and Thomas Hietala on the Mexican-American War",
    },
    {
      id: "5-11-q7",
      prompt: "The excerpt from Calhoun best provides evidence of which historical situation in the late 1840s?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "Clashes between immigrants and nativists in eastern cities" },
        { id: "B", text: "Compromises between the Supreme Court and Congress" },
        { id: "C", text: "Rapid growth of the Northern abolitionist movement" },
        { id: "D", text: "Increasing sectional tensions caused by the Mexican-American War" },
      ],
      correctOptionId: "D",
      explanation:
        "Calhoun points to congressional debates over banning slavery in the territories gained from Mexico, highlighting the intensifying sectional conflict those lands provoked.",
      source: "John C. Calhoun, Senate speech, 1847",
    },
    {
      id: "5-11-q8",
      prompt: "Calhoun's speech most directly illustrates which larger development?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "Regional attitudes strongly influenced federal policymaking." },
        { id: "B", text: "Immigration reshaped American culture in coastal cities." },
        { id: "C", text: "National leaders prioritized opening Pacific trade." },
        { id: "D", text: "Most Americans demanded the immediate end of slavery." },
      ],
      correctOptionId: "A",
      explanation:
        "Southern lawmakers threatened disunion if Congress limited slavery's expansion, showing how regional priorities increasingly dictated national politics.",
      source: "John C. Calhoun, Senate speech, 1847",
    },
    {
      id: "5-11-q9",
      prompt: "What conclusion can best be drawn from the circumstances of Calhoun's speech?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "The United States attempted to establish new trade ties with western tribes." },
        { id: "B", text: "Americans debated how newly conquered territories should be integrated." },
        { id: "C", text: "Americans focused primarily on exploiting natural resources in Canada." },
        { id: "D", text: "The United States prioritized obtaining East Asian markets for manufactured goods." },
      ],
      correctOptionId: "B",
      explanation:
        "Calhoun references congressional fights over governing newly acquired Mexican lands, underscoring the uncertainty about how to incorporate them into the Union.",
      source: "John C. Calhoun, Senate speech, 1847",
    },
    {
      id: "5-11-q10",
      prompt: "The excerpt could best assist historians studying which topic?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "Development of antebellum transportation networks" },
        { id: "B", text: "Rise of nativist political parties" },
        { id: "C", text: "Removal of Native Americans from the South" },
        { id: "D", text: "Growth of the abolition movement in the United States" },
      ],
      correctOptionId: "D",
      explanation:
        "Douglass's heartfelt thanks to abolitionist editor Horace Greeley demonstrates cooperation between Black activists and sympathetic northern reformers, a key feature of the movement.",
      source: "Frederick Douglass to Horace Greeley, 1846",
    },
    {
      id: "5-11-q11",
      prompt: "Contemporaries most likely interpreted Douglass's rhetoric as promoting which goal?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "Colonization societies that sent freed people to Africa" },
        { id: "B", text: "Immediate legal abolition of slavery" },
        { id: "C", text: "Expansion of slavery through popular sovereignty" },
        { id: "D", text: "Armed revolt by enslaved people across the South" },
      ],
      correctOptionId: "B",
      explanation:
        "Douglass appeals to justice and human rights, urging allies to push for the legal destruction of slavery rather than gradual or colonization schemes.",
      source: "Frederick Douglass to Horace Greeley, 1846",
    },
    {
      id: "5-11-q12",
      prompt: "Ideas expressed in the excerpt most likely inspired which development?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "States' rights defenses of slavery" },
        { id: "B", text: "Calls to annex all of Mexico" },
        { id: "C", text: "Efforts to convince plantation owners to abandon cash crops" },
        { id: "D", text: "Support networks that helped enslaved people escape bondage" },
      ],
      correctOptionId: "D",
      explanation:
        "Douglass's insistence on inalienable freedom helped motivate abolitionists to aid runaways via the Underground Railroad and similar networks.",
      source: "Frederick Douglass to Horace Greeley, 1846",
    },
    {
      id: "5-11-q13",
      prompt: "The excerpt best serves as evidence that, in 1861,",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Northern voters no longer supported Abraham Lincoln" },
        { id: "B", text: "Southern communities were divided over secession" },
        { id: "C", text: "Northerners were willing to compromise over slavery's expansion" },
        { id: "D", text: "Northerners refused to fight against a Confederate government" },
      ],
      correctOptionId: "B",
      explanation:
        "Willey, a delegate from western Virginia, denounced secession even as fellow Southerners demanded it, revealing sharp internal disputes within the South.",
      source: "Waitman T. Willey, Virginia Secession Convention speech, 1861",
    },
    {
      id: "5-11-q14",
      prompt: "Which conclusion is best supported by the sentiments expressed in Willey's speech?",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Sectional tensions erupted because most Southerners opposed Lincoln." },
        { id: "B", text: "Sectional divisions showed signs of diminishing after the election of 1860." },
        { id: "C", text: "The Compromise of 1850 prevented any long-term conflict." },
        { id: "D", text: "Popular sovereignty settled debates over slavery in the territories." },
      ],
      correctOptionId: "A",
      explanation:
        "Willey describes Lincoln's victory as the product of a sectional party with no southern voice, underscoring how southern hostility toward Lincoln drove the crisis.",
      source: "Waitman T. Willey, Virginia Secession Convention speech, 1861",
    },
    {
      id: "5-11-q15",
      prompt: "Evidence from the excerpt most strongly suggests which of the following?",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Southern attitudes toward slavery were rapidly changing." },
        { id: "B", text: "Southern merchants rejected paying federal tariffs." },
        { id: "C", text: "Many white Southerners viewed the 1860 election with contempt." },
        { id: "D", text: "Southern leaders sought alliances with European empires." },
      ],
      correctOptionId: "C",
      explanation:
        "By labeling Lincoln's election a fraud and warning of dictatorship, Willey reveals the depth of southern mistrust toward the 1860 results.",
      source: "Waitman T. Willey, Virginia Secession Convention speech, 1861",
    },
    {
      id: "5-11-q16",
      prompt: "Which difference between the North and South in 1860 is illustrated in the data?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "Southerners dominated overseas trade while Northerners turned inward." },
        { id: "B", text: "Southern agriculture relied heavily on large plantations compared to the North." },
        { id: "C", text: "The North possessed less transportation infrastructure than the South." },
        { id: "D", text: "The North had fewer people available for labor and the military." },
      ],
      correctOptionId: "B",
      explanation:
        "The table shows that 84% of large farms were in the South, underscoring the region's dependence on plantation agriculture relative to the North.",
      source: "Regional Comparison of the North and South, 1860",
    },
    {
      id: "5-11-q17",
      prompt: "Which trend in sectional development by 1860 is reflected in the data?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "Southern exports were diminishing relative to the North." },
        { id: "B", text: "Railroads were erasing economic differences between the regions." },
        { id: "C", text: "The Northern economy was more diverse than the Southern economy." },
        { id: "D", text: "Both regions were abandoning agricultural production." },
      ],
      correctOptionId: "C",
      explanation:
        "Northern dominance in factories, steel, and transportation indicates a multifaceted industrial economy, while the South remained tied to plantation exports.",
      source: "Regional Comparison of the North and South, 1860",
    },
    {
      id: "5-11-q18",
      prompt: "Which labor development prior to the Civil War is consistent with the data in the table?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "Indentured servants replaced wage laborers in the North." },
        { id: "B", text: "Women were largely excluded from Northern industry." },
        { id: "C", text: "Immigrants flocked to Southern cities in greater numbers than to Northern ones." },
        { id: "D", text: "An internal slave trade expanded to supply labor for Southern plantations." },
      ],
      correctOptionId: "D",
      explanation:
        "The South's large enslaved population and concentration of big plantations reveal why traders moved enslaved people internally to meet cotton and rice labor demands.",
      source: "Regional Comparison of the North and South, 1860",
    },
    {
      id: "5-11-q19",
      prompt: "In the excerpt, the phrase “Some of them seem willing to fight for you” serves primarily to",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "Authorize total-war tactics in the Confederacy" },
        { id: "B", text: "Address logistical problems feeding contraband camps" },
        { id: "C", text: "Explain the frequent turnover among Union generals" },
        { id: "D", text: "Highlight the enlistment of formerly enslaved people into the Union army" },
      ],
      correctOptionId: "D",
      explanation:
        "Lincoln points to African Americans joining Union regiments as evidence that emancipation strengthened the war effort and deserved white support.",
      source: "Abraham Lincoln to James Conkling, 1863",
    },
    {
      id: "5-11-q20",
      prompt: "Lincoln's rhetoric in the excerpt would most likely be interpreted as promoting which argument?",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "Allowing slavery to continue was still an option." },
        { id: "B", text: "Maintaining the naval blockade required relaxing emancipation policies." },
        { id: "C", text: "Redefining the war to include emancipation would strengthen the Union cause." },
        { id: "D", text: "Unconditional Confederate surrender was no longer necessary." },
      ],
      correctOptionId: "C",
      explanation:
        "Lincoln insists the Emancipation Proclamation was a wartime necessity that bolstered the Union by undermining the Confederacy and encouraging Black enlistment.",
      source: "Abraham Lincoln to James Conkling, 1863",
    },
    {
      id: "5-11-q21",
      prompt: "Historians could best use the excerpt to study which topic?",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "European hesitation to assist the Confederacy" },
        { id: "B", text: "Motivations of African American soldiers" },
        { id: "C", text: "Lincoln's use of executive power to craft wartime policy" },
        { id: "D", text: "Confederate battlefield strategy" },
      ],
      correctOptionId: "C",
      explanation:
        "Lincoln defends the proclamation as a constitutional wartime measure, offering direct insight into how he interpreted and used executive authority.",
      source: "Abraham Lincoln to James Conkling, 1863",
    },
    {
      id: "5-11-q22",
      prompt: "Which development could best refute the optimistic argument expressed in the image?",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "U.S. victory in the Mexican-American War expanded national territory." },
        { id: "B", text: "Continued western settlement boosted agricultural output." },
        { id: "C", text: "Postwar debates raged over who qualified for citizenship and suffrage." },
        { id: "D", text: "Improvements in sailing technology expanded international trade." },
      ],
      correctOptionId: "C",
      explanation:
        "Despite Nast's hopeful portrayal of interracial equality, fierce Reconstruction-era disputes over citizenship and voting rights revealed ongoing resistance to universal suffrage.",
      source: "Thomas Nast, \"Uncle Sam's Thanksgiving Dinner,\" 1869",
    },
    {
      id: "5-11-q23",
      prompt: "Individuals who shared the views expressed in the image most likely supported which policy?",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "Extending political opportunities to formerly enslaved people" },
        { id: "B", text: "Denying suffrage rights to women" },
        { id: "C", text: "Expanding the power of Southern Democrats" },
        { id: "D", text: "Enforcing temperance laws in Northern states" },
      ],
      correctOptionId: "A",
      explanation:
        "The cartoon's celebration of universal suffrage aligns with Radical Republican efforts to secure Black voting rights through the Fifteenth Amendment.",
      source: "Thomas Nast, \"Uncle Sam's Thanksgiving Dinner,\" 1869",
    },
    {
      id: "5-11-q24",
      prompt: "The social changes advocated in the image were most challenged by which development?",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "Creation of the Republican Party in the 1850s" },
        { id: "B", text: "Construction of canals and railroads" },
        { id: "C", text: "End of Reconstruction and rise of Jim Crow laws" },
        { id: "D", text: "Federal subsidies for western economic development" },
      ],
      correctOptionId: "C",
      explanation:
        "Once federal troops withdrew in 1877, southern Democrats imposed segregation and voter suppression, reversing the inclusive vision depicted by Nast.",
      source: "Thomas Nast, \"Uncle Sam's Thanksgiving Dinner,\" 1869",
    },
    {
      id: "5-11-q25",
      prompt: "Which claim is supported by both Levine's and Langguth's arguments?",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "Local political tactics denied African Americans their rights." },
        { id: "B", text: "White southerners accepted racial and political equality." },
        { id: "C", text: "Republicans permanently reshaped southern politics." },
        { id: "D", text: "Freedpeople rapidly acquired land and self-sufficiency." },
      ],
      correctOptionId: "A",
      explanation:
        "Both historians describe white supremacists using terror, lawmaking, and party organization to strip Black citizens of political power during and after Reconstruction.",
      source: "Bruce Levine and A. J. Langguth on Reconstruction",
    },
    {
      id: "5-11-q26",
      prompt: "How does Levine's interpretation differ from Langguth's?",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "Levine argues African Americans remained enslaved, while Langguth disagrees." },
        { id: "B", text: "Levine claims white southerners gladly cooperated with freedpeople." },
        { id: "C", text: "Levine emphasizes that Northern Republicans retreated from Reconstruction, unlike Langguth." },
        { id: "D", text: "Levine asserts planters accepted Republican rule, whereas Langguth does not." },
      ],
      correctOptionId: "C",
      explanation:
        "Levine highlights waning Northern commitment as a key reason for Reconstruction's collapse, while Langguth focuses on intraregional class resentments in the postwar South.",
      source: "Bruce Levine and A. J. Langguth on Reconstruction",
    },
    {
      id: "5-11-q27",
      prompt: "Which argument about Reconstruction policies would both authors most likely reject?",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "White southerners across economic classes opposed Reconstruction." },
        { id: "B", text: "Southern Democrats became more supportive of Reconstruction as Republicans retreated." },
        { id: "C", text: "Reconstruction failed to stop violence against Black southerners." },
        { id: "D", text: "Exploitative labor conditions persisted in the South despite Reconstruction." },
      ],
      correctOptionId: "B",
      explanation:
        "Both authors portray Democratic Redeemers joining planters to curtail Black rights, making it unlikely they would argue that southern Democrats embraced Reconstruction reforms.",
      source: "Bruce Levine and A. J. Langguth on Reconstruction",
    },
    {
      id: "5-11-q28",
      prompt: "Northern industrial resources during the Civil War most directly explain which outcome?",
      options: [
        { id: "A", text: "The South's continued focus on cotton exports and enslaved labor" },
        { id: "B", text: "Confederate emphasis on western theater operations" },
        { id: "C", text: "Willingness of African Americans to enlist in Union ranks" },
        { id: "D", text: "The Confederacy's chronic shortages of arms, munitions, and supplies" },
      ],
      correctOptionId: "D",
      explanation:
        "The Union's manufacturing capacity far outpaced the South's, giving Northern armies access to plentiful weaponry while the Confederacy struggled to equip its troops.",
    },
    {
      id: "5-11-q29",
      prompt: "Which group most likely supported secession after the 1860 presidential election?",
      options: [
        { id: "A", text: "Northern abolitionists" },
        { id: "B", text: "Members of the Free Soil Party" },
        { id: "C", text: "Southern Democrats" },
        { id: "D", text: "Northern Democrats" },
      ],
      correctOptionId: "C",
      explanation:
        "Southern Democrats, alarmed by Lincoln's restrictionist platform, championed disunion to protect slavery following the Republican victory.",
    },
    {
      id: "5-11-q30",
      prompt: "The Fourteenth Amendment emerged primarily from which concern?",
      options: [
        { id: "A", text: "Abolitionists feared African Americans would be barred from voting." },
        { id: "B", text: "Observers expected formerly enslaved people to win high office." },
        { id: "C", text: "Republicans worried southern states would deny African Americans citizenship rights." },
        { id: "D", text: "Former Confederate leaders demanded additional constitutional amendments." },
      ],
      correctOptionId: "C",
      explanation:
        "Congressional Republicans wanted constitutional guarantees that the newly freed population would enjoy equal citizenship despite southern resistance.",
    },
    {
      id: "5-11-q31",
      prompt: "Which development most directly heightened sectional strife in the years just before the election of 1860?",
      options: [
        { id: "A", text: "Annexation of California" },
        { id: "B", text: "Rise of nativist political parties" },
        { id: "C", text: "Debates over protective tariffs" },
        { id: "D", text: "The Supreme Court ruling in Dred Scott v. Sandford" },
      ],
      correctOptionId: "D",
      explanation:
        "Dred Scott declared that African Americans could not be citizens and that Congress lacked authority to ban slavery in the territories, inflaming sectional animosity.",
    },
    {
      id: "5-11-q32",
      prompt: "The Kansas-Nebraska Act aimed to resolve debates over which issue?",
      options: [
        { id: "A", text: "Growing immigration to the United States" },
        { id: "B", text: "Expansion of slavery into new territories" },
        { id: "C", text: "Preservation of the Second Party system" },
        { id: "D", text: "Low-wage factory labor in northeastern cities" },
      ],
      correctOptionId: "B",
      explanation:
        "By endorsing popular sovereignty for Kansas and Nebraska, Congress attempted to settle—though ultimately inflamed—the dispute over whether slavery would extend westward.",
    },
    {
      id: "5-11-q33",
      prompt: "Which development was most directly connected to the collapse of the Whig Party in the 1850s?",
      options: [
        { id: "A", text: "Escalating tensions between proslavery and antislavery factions" },
        { id: "B", text: "Lincoln's debates with Stephen Douglas over popular sovereignty" },
        { id: "C", text: "Public rejection of Manifest Destiny" },
        { id: "D", text: "Disputes over federal funding for internal improvements" },
      ],
      correctOptionId: "A",
      explanation:
        "Northern and Southern Whigs split irreparably over the expansion of slavery, causing the party to disintegrate as members defected to Democrats or the emerging Republicans.",
    },
  ],
  unit5progresscheck: [
    {
      id: "unit5progresscheck-q1",
      prompt:
        "Which of the following developments most directly led to the activities described in the excerpt?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "A prohibition on the northern extent of slavery in territories west of the Mississippi River" },
        { id: "B", text: "The acquisition of significant territory following the Mexican-American War" },
        { id: "C", text: "The vetoing of the rechartering of the Second Bank of the United States" },
        { id: "D", text: "The completion of the first transcontinental railroad to the Pacific Ocean" },
      ],
      correctOptionId: "B",
      explanation:
        "1848 年瓜达卢佩-希达尔戈条约让美国获得加州，为淘金者自由进入、掘金创造前提；铁路与银行事件时间、关联性都不足以直接触发淘金潮。",
    },
    {
      id: "unit5progresscheck-q2",
      prompt: "Which of the following developments resulted most directly from the gold rush described in the excerpt?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "An anti-Catholic movement arose in western mining communities." },
        { id: "B", text: "Plantation agriculture spread from the South to the Pacific coast." },
        { id: "C", text: "People from America, Europe, and Asia migrated to the region." },
        { id: "D", text: "The West Coast became a major industrial center for the United States." },
      ],
      correctOptionId: "C",
      explanation:
        "“金山”诱惑吸引美国东部、欧洲和亚洲移民涌入加州，人口与文化迅速多元化；反天主教、种植园和工业中心化都不符合淘金热的直接后果或时间线。",
    },
    {
      id: "unit5progresscheck-q3",
      prompt: "The excerpt best reflects the development of which of the following?",
      stimulus: carsonGoldRushExcerpt,
      options: [
        { id: "A", text: "The emergence of an abolitionist movement in the western territories" },
        { id: "B", text: "The widely held belief that the United States had a right to expand westward" },
        { id: "C", text: "The increasing importance of cotton exports to the United States economy" },
        { id: "D", text: "The debates about Native Americans and Mexican nationals dispossessed of land in California" },
      ],
      correctOptionId: "B",
      explanation:
        "仅凭太阳和山峰指引去淘金，体现了“天定命运”式的西进正当性信念；题干未呈现废奴、棉花经济或土地争议的重点。",
    },
    {
      id: "unit5progresscheck-q4",
      prompt: "Which of the following arguments about the Mexican-American War do the excerpts best support?",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "It resulted in the first efforts at western expansion." },
        { id: "B", text: "It generated debates over citizenship." },
        { id: "C", text: "It ended sectional tensions between the North and South." },
        { id: "D", text: "It contributed to the elimination of the domestic slave trade." },
      ],
      correctOptionId: "B",
      explanation:
        "两位学者都强调新领土居民能否同化、获得公民权的争论；西进早已有之，南北矛盾加剧而非缓和，国内奴隶贸易也未因战争结束。",
    },
    {
      id: "unit5progresscheck-q5",
      prompt: "Greenberg’s argument most differs from Hietala’s in that Greenberg claims that",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "Race was a defining factor in the tensions leading up to the Mexican-American War" },
        { id: "B", text: "Pioneers, not politicians, were a major factor in building the American empire" },
        { id: "C", text: "Most Americans believed that Mexicans in the new territories could not assimilate" },
        { id: "D", text: "The granting of citizenship to people in the territories was welcomed by many Americans after the war" },
      ],
      correctOptionId: "C",
      explanation:
        "Greenberg突出“墨西哥人难以同化”的普遍担忧，而Hietala强调政客主导扩张并未突出同化恐惧；两人都承认种族因素重要且并未认为授予公民权广受欢迎。",
    },
    {
      id: "unit5progresscheck-q6",
      prompt: "Both authors would most likely suggest that the historical situation described in the excerpts contributed to which of the following?",
      stimulus: greenbergHietalaExcerpts,
      options: [
        { id: "A", text: "The continued alteration of Native American culture and society" },
        { id: "B", text: "The failure of Reconstruction policies to enforce constitutional amendments" },
        { id: "C", text: "The debate over the rights of states to nullify federal laws" },
        { id: "D", text: "The controversy over the Supreme Court decision in Dred Scott v. Sandford" },
      ],
      correctOptionId: "A",
      explanation:
        "无论限制还是推进扩张，都意味着侵占西部原住民土地、破坏其社会文化；其余选项时间或主题与美墨战争直接关联度不足。",
    },
    {
      id: "unit5progresscheck-q7",
      prompt:
        "The excerpt best provides evidence about which of the following historical situations in the late 1840s?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "Increased conflict between urban immigrants and nativists" },
        { id: "B", text: "Compromises between the Supreme Court and national leaders" },
        { id: "C", text: "The expanding influence of the Northern abolitionist movement" },
        { id: "D", text: "Growing sectional tensions caused by the Mexican-American War" },
      ],
      correctOptionId: "D",
      explanation:
        "卡尔霍恩批评北方要限制新领土奴隶制，正反映美墨战争后奴隶制扩张引发的南北矛盾升温；其余选项与该演讲情境不符。",
    },
    {
      id: "unit5progresscheck-q8",
      prompt: "The speech given by Calhoun relates to which of the following?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "The effect of regional attitudes on federal policy making" },
        { id: "B", text: "The ways in which immigration changed American culture" },
        { id: "C", text: "The efforts by national leaders to expand the Pacific trade" },
        { id: "D", text: "The widespread support for the immediate end of slavery" },
      ],
      correctOptionId: "A",
      explanation:
        "南方为维护奴隶制向联邦施压，体现区域态度直接影响联邦政策；演讲无涉移民、太平洋贸易或立即废奴的全民共识。",
    },
    {
      id: "unit5progresscheck-q9",
      prompt: "Which of the following can be concluded based on the situation in which Calhoun gave this speech?",
      stimulus: calhounSlaverySpeech,
      options: [
        { id: "A", text: "The United States attempted to establish trade with western American Indian nations" },
        { id: "B", text: "Americans debated how to integrate conquered territories into the United States" },
        { id: "C", text: "Americans wanted to access natural resources in the western North America" },
        { id: "D", text: "The United States sought to gain markets for its manufactured goods in East Asia" },
      ],
      correctOptionId: "B",
      explanation:
        "演讲背景是如何把美墨战争所得领土并入联邦、是否允许奴隶制；其余选项与当下国会争论焦点不符。",
    },
    {
      id: "unit5progresscheck-q10",
      prompt:
        "The excerpt could best be used by historians studying which of the following?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "The development of new transportation technologies" },
        { id: "B", text: "The emergence of nativist political parties" },
        { id: "C", text: "The relocation of Native Americans from the South" },
        { id: "D", text: "The growth of the abolition movement in the United States" },
      ],
      correctOptionId: "D",
      explanation:
        "道格拉斯致格里利信展现黑人民权领袖与北方媒体合作推动废奴，是研究废奴运动壮大的典型材料。",
    },
    {
      id: "unit5progresscheck-q11",
      prompt: "Rhetoric in the excerpt would most likely have been interpreted as promoting which of the following?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "The creation of societies to send formerly enslaved people to Africa" },
        { id: "B", text: "The immediate end to the practice of slavery through legal reform" },
        { id: "C", text: "The expansion of slavery in new territories through popular sovereignty" },
        { id: "D", text: "The encouragement of enslaved people to take up arms and revolt" },
      ],
      correctOptionId: "B",
      explanation:
        "道格拉斯主张以法律、舆论促成“立即废奴”，反对殖民非洲、奴隶制扩张或武装起义。",
    },
    {
      id: "unit5progresscheck-q12",
      prompt: "Ideas in the excerpt would most likely have influenced which of the following?",
      stimulus: douglassGreeleyLetter,
      options: [
        { id: "A", text: "Arguments supporting defining slavery on the grounds of states’ rights" },
        { id: "B", text: "Claims that the United States should occupy all Mexican territory" },
        { id: "C", text: "Attempts to convince plantation owners to stop farming cash crops" },
        { id: "D", text: "Efforts at assisting enslaved people in escaping from the South" },
      ],
      correctOptionId: "D",
      explanation:
        "强调奴隶自由权与道德正义的言论，直接激励地下铁路等援助逃奴的行动；其余选项与废奴理念方向相反或关联弱。",
    },
    {
      id: "unit5progresscheck-q13",
      prompt: "The excerpt best serves as evidence that, in 1861,",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Citizens in the Northern states did not want Abraham Lincoln as president" },
        { id: "B", text: "Citizens in the Southern states were deeply divided over secession" },
        { id: "C", text: "Citizens in the Northern states were prepared to accommodate slavery" },
        { id: "D", text: "Citizens in the Northern states would not accept a Confederate government" },
      ],
      correctOptionId: "B",
      explanation:
        "威利在弗吉尼亚分裂大会反对脱离，说明南方内部对分裂并非铁板一块；北方支持林肯且不主张容纳奴隶制。",
    },
    {
      id: "unit5progresscheck-q14",
      prompt: "Which of the following conclusions can best be reached based on the sentiments expressed in the excerpt?",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Sectional tensions erupted because most Southerners did not support Abraham Lincoln." },
        { id: "B", text: "Sectional divisions were showing signs of diminishing." },
        { id: "C", text: "The Compromise of 1850 prevented the outbreak of long-term conflict." },
        { id: "D", text: "The election of 1860 was a success for the idea that territories should vote whether or not to have slavery." },
      ],
      correctOptionId: "A",
      explanation:
        "他称林肯由“区域党”推举且无南方选票，反映南方普遍敌视林肯导致矛盾爆发；其余选项与1861年的紧张局势不符。",
    },
    {
      id: "unit5progresscheck-q15",
      prompt: "Evidence in the excerpt most strongly suggests which of the following?",
      stimulus: waitmanWilleySpeech,
      options: [
        { id: "A", text: "Southern opinions regarding slavery were changing." },
        { id: "B", text: "Southern businesses rejected paying federal taxes." },
        { id: "C", text: "Southern voters viewed the presidential election with contempt." },
        { id: "D", text: "Southern politicians were anxious to form alliances with European countries." },
      ],
      correctOptionId: "C",
      explanation:
        "他称选举是“欺诈”，揭示南方选民蔑视1860年大选结果；演讲未涉及税收、奴隶制立场转变或外交联盟。",
    },
    {
      id: "unit5progresscheck-q16",
      prompt: "Which of the following differences between the North and the South during the Civil War is depicted in the graph?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "The South engaged in more international trade than the North." },
        { id: "B", text: "The South relied more on plantation agriculture than the North." },
        { id: "C", text: "The North had less developed transportation infrastructure than the South." },
        { id: "D", text: "The North had fewer people available for labor and the military than the South." },
      ],
      correctOptionId: "B",
      explanation:
        "表中大农场占比南方 84%，凸显南方以种植园奴隶制为核心；北方人口、铁路、出口均更高。",
    },
    {
      id: "unit5progresscheck-q17",
      prompt:
        "Which of the following describes a trend in sectional development by 1860 reflected in the data in the graph?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "The South was becoming less dependent on exports to foreign markets than the North." },
        { id: "B", text: "The North and the South were becoming more connected through railroads." },
        { id: "C", text: "The North was becoming more diverse in its economic activities than the South." },
        { id: "D", text: "The North and the South were becoming less reliant on agricultural products." },
      ],
      correctOptionId: "C",
      explanation:
        "北方在铁路、工厂、钢铁上全面领先，显示经济多元化；南方高度集中于农业出口，且铁路连接仍落后。",
    },
    {
      id: "unit5progresscheck-q18",
      prompt:
        "Which of the following developments in labor systems in the United States before the Civil War is reflected by the data in the graph?",
      stimulusTable: regionalComparisonTable,
      options: [
        { id: "A", text: "Indentured servants replaced wage laborers in the North." },
        { id: "B", text: "Women laborers performed less industrial work in the North." },
        { id: "C", text: "Large numbers of immigrants moved to urban areas in the South." },
        { id: "D", text: "An internal trade in enslaved people spread throughout the South." },
      ],
      correctOptionId: "D",
      explanation:
        "南方大农场比重大且依赖奴隶，国际奴隶贸易禁绝后，内部奴隶贩运满足种植园需求；其余选项与数据或历史事实不符。",
    },
    {
      id: "unit5progresscheck-q19",
      prompt:
        "The phrase in the excerpt “Some of them seem willing to fight for you” could most likely be interpreted as having which of the following purposes?",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "Authorizing the policy of total war by Union generals in fighting in the South" },
        { id: "B", text: "Addressing the difficulties of feeding runaway enslaved people at military encampments" },
        { id: "C", text: "Acknowledging the shuffling of commanding officers in the Union army" },
        { id: "D", text: "Highlighting the enlistment of formerly enslaved people into the Union army" },
      ],
      correctOptionId: "D",
      explanation:
        "林肯强调被解放者愿为联邦作战，用以为《解放宣言》和黑人参军辩护；与全面战争、供给困难或军官调整无关。",
    },
    {
      id: "unit5progresscheck-q20",
      prompt: "Lincoln’s rhetoric in the excerpt would most likely have been interpreted as promoting which of the following arguments?",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "Allowing slavery to exist was still a political option." },
        { id: "B", text: "Maintaining the blockade of Southern states was difficult." },
        { id: "C", text: "Changing the purpose of the war would strengthen the Union cause." },
        { id: "D", text: "Achieving the Confederacy’s unconditional surrender was the Union’s main objective." },
      ],
      correctOptionId: "C",
      explanation:
        "他把“保联邦”与“废奴”绑定，认为调整战争目标能提升士气、阻止英法承认邦联；其余选项与信件主旨不符。",
    },
    {
      id: "unit5progresscheck-q21",
      prompt: "The excerpt could best be used by historians studying which of the following?",
      stimulus: lincolnConklingLetter,
      options: [
        { id: "A", text: "What prevented European powers from supporting the South" },
        { id: "B", text: "What motivated African Americans during the war" },
        { id: "C", text: "How Lincoln used executive powers to initiate wartime policy" },
        { id: "D", text: "How Confederate strategy prevented a rapid Union victory" },
      ],
      correctOptionId: "C",
      explanation:
        "林肯以总司令战时权力为《解放宣言》正名，是研究总统行政权扩张的关键材料；其余选项并非信件核心。",
    },
    {
      id: "unit5progresscheck-q22",
      prompt: "Which of the following developments could best refute the argument expressed in the image?",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "The Mexican-American War resulted in the expansion of United States territories." },
        { id: "B", text: "The continued westward movement of settlers increased agricultural production." },
        { id: "C", text: "The conclusion of the Civil War stirred debates over citizenship." },
        { id: "D", text: "The invention of new sailing technologies made international trade easier." },
      ],
      correctOptionId: "C",
      explanation:
        "漫画赞颂普选与种族共席，但重建后围绕公民权的激烈争论（黑法典、吉姆·克劳）直接反驳这一乐观愿景。",
    },
    {
      id: "unit5progresscheck-q23",
      prompt:
        "People who shared the views expressed in the image most likely supported which of the following?",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "The extension of political opportunities to formerly enslaved people" },
        { id: "B", text: "The rejection of suffrage rights for women" },
        { id: "C", text: "The expansion of the power of Southern Democrats" },
        { id: "D", text: "The enforcement of temperance laws in the North" },
      ],
      correctOptionId: "A",
      explanation:
        "漫画以“普选”横幅庆祝第15修正案，支持者自然拥护向前奴隶扩展选举权与参政机会；其余选项与主题无关或相反。",
    },
    {
      id: "unit5progresscheck-q24",
      prompt: "The change in society claimed by the artist in the image was most challenged by",
      stimulus: nastThanksgivingCartoon,
      options: [
        { id: "A", text: "The creation of the Republican Party." },
        { id: "B", text: "The construction of canals and railroads." },
        { id: "C", text: "The ending of Reconstruction." },
        { id: "D", text: "The passage of laws promoting economic development in the West." },
      ],
      correctOptionId: "C",
      explanation:
        "1877 年重建结束、联邦军撤出后，南方推行吉姆·克劳法和剥夺黑人选举权，最直接冲击了漫画宣示的种族平等社会。",
    },
    {
      id: "unit5progresscheck-q25",
      prompt:
        "Which of the following claims is supported by the arguments made by both Levine and Langguth?",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "Local political tactics served to deny African Americans their rights." },
        { id: "B", text: "White southerners accepted racial and political equality." },
        { id: "C", text: "Republicans permanently changed the balance of political power in the South." },
        { id: "D", text: "African Americans gained property rights while becoming self-sufficient." },
      ],
      correctOptionId: "A",
      explanation:
        "两位作者都指出恐怖、操纵选举和地方法规等政治手段剥夺黑人权利；其余说法与他们的论点相反或缺乏依据。",
    },
    {
      id: "unit5progresscheck-q26",
      prompt: "Levine’s argument about Reconstruction in the excerpt differs from that of Langguth in that Levine argues",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "African Americans were held in a perpetual state of slavery" },
        { id: "B", text: "White Southerners willingly worked alongside the emancipated population" },
        { id: "C", text: "Northern Republicans gradually withdrew their support for Reconstruction policies" },
        { id: "D", text: "White plantation owners conceded to Republican policies in the South" },
      ],
      correctOptionId: "C",
      explanation:
        "Levine独特强调北方共和党后期后退、保守化削弱了重建；Langguth侧重南方贫穷白人与种植园主的联合。",
    },
    {
      id: "unit5progresscheck-q27",
      prompt: "Which of the following arguments about Reconstruction policies would both authors most likely disagree with?",
      stimulus: levineLangguthExcerpts,
      options: [
        { id: "A", text: "White Southerners across all economic classes rejected Reconstruction policies." },
        { id: "B", text: "With Republicans in retreat, Southern Democrats grew more supportive of Reconstruction policies." },
        { id: "C", text: "Reconstruction policies failed to prevent the spread of violence against formerly enslaved people." },
        { id: "D", text: "Unfair labor conditions in the South persisted despite Reconstruction policies." },
      ],
      correctOptionId: "B",
      explanation:
        "两位作者都描绘民主党“再建派”复辟并压制黑人，不会认为南方民主党转而支持重建；其余观点与两人论述一致或可兼容。",
    },
    {
      id: "unit5progresscheck-q28",
      prompt: "Which of the following groups would most likely have supported secession from the United States after the 1860 presidential election?",
      options: [
        { id: "A", text: "Northern abolitionists" },
        { id: "B", text: "Members of the Free Soil Party" },
        { id: "C", text: "Southern Democrats" },
        { id: "D", text: "Northern Democrats" },
      ],
      correctOptionId: "C",
      explanation:
        "南方民主党以奴隶制扩张为核心利益，林肯当选后率先推动分裂；北方废奴派、自由土壤党与北方民主党均不主张脱离联邦。",
    },
    {
      id: "unit5progresscheck-q29",
      prompt: "The Fourteenth Amendment emerged from which of the following contexts?",
      options: [
        { id: "A", text: "Abolitionists’ fears that African Americans would be barred from voting" },
        { id: "B", text: "Expectations that formerly enslaved people would run for political office" },
        { id: "C", text: "Republican concerns that African Americans would be denied citizenship rights" },
        { id: "D", text: "Former Confederate leaders’ support for multiple new amendments to the Constitution" },
      ],
      correctOptionId: "C",
      explanation:
        "南方《黑人法典》引发共和党担忧黑人虽自由却无公民权，促成第十四修正案；投票权、竞选或南方精英支持多项修宪都不是直接背景。",
    },
    {
      id: "unit5progresscheck-q30",
      prompt:
        "Which of the following developments most directly related to the increased sectional strife immediately prior to the election of 1860?",
      options: [
        { id: "A", text: "The addition of territory to the United States through the annexation of California" },
        { id: "B", text: "The rise of nativist political groups in Northern urban areas" },
        { id: "C", text: "The differing viewpoints over the use of the tariff to protect domestic industry" },
        { id: "D", text: "The legal ruling that denied African Americans rights of citizenship" },
      ],
      correctOptionId: "D",
      explanation:
        "1857 年德雷德斯科特案否认黑人公民权并开放奴隶制扩张，直接激化1860年前的区域对立；加州并入、排外政党与关税争议关联度较低。",
    },
    {
      id: "unit5progresscheck-q31",
      prompt: "The passage of the Kansas-Nebraska Act was intended to resolve debates about which of the following issues in the 1850s?",
      options: [
        { id: "A", text: "The increase in immigration" },
        { id: "B", text: "The expansion of slavery" },
        { id: "C", text: "The fate of the Second Party system" },
        { id: "D", text: "The growth of low-wage factory labor" },
      ],
      correctOptionId: "B",
      explanation:
        "法案用“人民主权”处理堪萨斯、内布拉斯加是否允许奴隶制，试图解决（却加剧）奴隶制扩张争议。",
    },
    {
      id: "unit5progresscheck-q32",
      prompt:
        "Which of the following developments was most directly connected to the collapse of the Whig Party in United States politics during the 1850s?",
      options: [
        { id: "A", text: "The escalation of tensions between proslavery and antislavery factions" },
        { id: "B", text: "Abraham Lincoln’s debates with Stephen Douglas over popular sovereignty" },
        { id: "C", text: "The rejection of Manifest Destiny by a growing percentage of American people" },
        { id: "D", text: "Disagreement over the constitutionality of federal internal improvements funding" },
      ],
      correctOptionId: "A",
      explanation:
        "堪萨斯-内布拉斯加后，亲奴与反奴的辉格派系分裂，成员倒向民主党或新生共和党，导致辉格党崩溃；其余因素关联度有限或时间稍晚。",
    },
    {
      id: "unit5progresscheck-q33",
      prompt: "The industrial resources of the North during the Civil War most likely accounted for which of the following?",
      options: [
        { id: "A", text: "The Southern reliance on cotton production and export, along with the system of enslaved labor" },
        { id: "B", text: "The Confederate strategy that focused on the western theater of operations during the war" },
        { id: "C", text: "The willingness of African Americans to fight for the Union cause in the conflict" },
        { id: "D", text: "The disadvantage of the Confederacy in access to arms, munitions, and other supplies" },
      ],
      correctOptionId: "D",
      explanation:
        "北方工厂、钢铁和铁路优势让其装备充足，南方工业薄弱、被封锁后军需长期短缺，形成决定性的物资劣势。",
    },
  ],
};






