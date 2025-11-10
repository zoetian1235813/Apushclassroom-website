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
<p><strong>Union and Confederate Soldiers by Profession</strong></p>
<table>
  <thead>
    <tr>
      <th>Profession</th>
      <th>Union</th>
      <th>Confederacy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Farmers and farm laborers (including planters)</td>
      <td>47.5%</td>
      <td>61.2%</td>
    </tr>
    <tr>
      <td>Skilled laborers</td>
      <td>23.4%</td>
      <td>14.4%</td>
    </tr>
    <tr>
      <td>Unskilled laborers</td>
      <td>15.7%</td>
      <td>10.3%</td>
    </tr>
    <tr>
      <td>White-collar workers</td>
      <td>8.5%</td>
      <td>9.2%</td>
    </tr>
    <tr>
      <td>Professionals</td>
      <td>4.9%</td>
      <td>4.9%</td>
    </tr>
    <tr>
      <td>Miscellaneous</td>
      <td>0.0%</td>
      <td>0.0%</td>
    </tr>
  </tbody>
</table>
<p><strong>Union and Confederate Militaries</strong></p>
<table>
  <thead>
    <tr>
      <th>Military Membership</th>
      <th>Union</th>
      <th>Confederacy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Total enlistment</td>
      <td>2,672,341</td>
      <td>1,227,890</td>
    </tr>
    <tr>
      <td>Casualties (wounded and killed)</td>
      <td>642,427</td>
      <td>483,026</td>
    </tr>
  </tbody>
</table>
<p><em>Source: Adapted from James M. McPherson, <cite>Battle Cry of Freedom: The Civil War Era</cite>, 1988.</em></p>
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
const promontorySummitReport = `
<p><em>The New York Times, report on the completion of the Pacific Railroad, May 10, 1869</em></p>
<blockquote>
  <p>&ldquo;The long-looked for moment has arrived. ... The inhabitants of the Atlantic seaboard and dwellers of the Pacific slopes are henceforth emphatically one people. ... Laying of the two rails, one opposite the other&mdash;one for the Union Pacific Railroad, and one for the Central Pacific Railroad. ... Driving of the last spikes by the two Companies; telegraph to be attached to the spike ... and the last blow to announce to the world by telegraph the completion of the Pacific Railroad.&rdquo;</p>
</blockquote>
`;
const parkerJosephExcerpts = `
<p><strong>Document 1</strong>: Ely S. Parker, commissioner of Indian affairs, annual report, 1869</p>
<blockquote>
  <p>&ldquo;The measures to which we are indebted for an improved condition of Indian affairs are, the concentration of the Indians upon suitable reservations, and the supplying them with means for engaging in agricultural and mechanical pursuits, and for their education and moral training. ... It has become a matter of serious import whether the treaty system ought longer to be continued. In my judgment it should not. ... The Indian tribes of the United States are not sovereign nations.&rdquo;</p>
</blockquote>
<p><strong>Document 2</strong>: Chief Joseph of the Nez Perce, &ldquo;An Indian's View of Indian Affairs,&rdquo; <em>North American Review</em>, 1879</p>
<blockquote>
  <p>&ldquo;[Chief] Lawyer ... sold nearly all the Nez Percés country. ... He had no right to sell our country. That had always belonged to my father's own people. ... My father planted poles around it and said: 'Inside is the home of my people&mdash;the white man may take the land outside.' ... You might as well expect the rivers to run backward as that any man who was born a free man should be contented when penned up and denied liberty to go where he pleases.&rdquo;</p>
</blockquote>
`;
const harlanPlessyDissent = `
<p><em>Justice John Marshall Harlan, dissenting opinion in <cite>Plessy v. Ferguson</cite>, 1896</em></p>
<blockquote>
  <p>&ldquo;The Thirteenth Amendment does not permit the withholding or the deprivation of any right necessarily inhering in freedom. ... The Fourteenth Amendment ... added greatly to the dignity and glory of American citizenship. ... These notable additions to the fundamental law ... removed the race line from our governmental systems. ... They secured to a race recently emancipated ... all the civil rights that the white race enjoy.&rdquo;</p>
</blockquote>
`;
const jayGouldTestimony = `
<p><em>Jay Gould, testimony before the United States Senate Committee on Education and Labor, 1883</em></p>
<blockquote>
  <p>&ldquo;Control by the Government in such things is contrary to our institutions. A telegraph system ... wants to be managed by skilled experts. ... If the Government controlled the telegraph ... you would not have any such efficient service as you have now.&rdquo;</p>
  <p>&ldquo;I think the freer you allow things to be the better. They regulate themselves. The laws of supply and demand ... settle those matters. ... These societies ... magnify these things and create evils which do not exist.&rdquo;</p>
</blockquote>
`;
const bodnarEwenExcerpts = `
<p><strong>Document 1</strong>: John Bodnar, <cite>The Transplanted</cite>, 1985</p>
<blockquote>
  <p>&ldquo;Immigrants were able to remain within the confines of small groups and networks ... mostly held together by ties of blood. ... Family goals came to supersede individual goals, and parents and children both worked vigorously to contribute to familial welfare.&rdquo;</p>
</blockquote>
<p><strong>Document 2</strong>: Elizabeth Ewen, <cite>Immigrant Women in the Land of Dollars</cite>, 1985</p>
<blockquote>
  <p>&ldquo;Family celebrations were the main form of recreation for immigrant women. ... For poor communities with scant resources, these celebrations ... redistributed what little wealth there was throughout the community. ... But there was a conflict between the old ways and the new ... Old-world conventions concerning love and marriage were challenged by the young.&rdquo;</p>
</blockquote>
`;
const lazarusNewColossus = `
<p><em>Emma Lazarus, &ldquo;The New Colossus,&rdquo; 1883</em></p>
<blockquote>
  <p>Not like the brazen giant of Greek fame,<br />
  With conquering limbs astride from land to land;<br />
  Here at our sea-washed, sunset gates shall stand<br />
  A mighty woman with a torch, whose flame<br />
  Is the imprisoned lightning, and her name<br />
  Mother of Exiles. From her beacon-hand<br />
  Glows world-wide welcome; her mild eyes command<br />
  The air-bridged harbor that twin cities frame.</p>
  <p>&ldquo;Keep, ancient lands, your storied pomp!&rdquo; cries she<br />
  With silent lips. &ldquo;Give me your tired, your poor,<br />
  Your huddled masses yearning to breathe free,<br />
  The wretched refuse of your teeming shore.<br />
  Send these, the homeless, tempest-tossed to me,<br />
  I lift my lamp beside the golden door!&rdquo;</p>
</blockquote>
`;
const georgeAdeExcerpt = `
<p><em>George Ade, &ldquo;The Advantage of Being 'Middle Class,'&rdquo; <cite>Chicago Record</cite>, 1890</em></p>
<blockquote>
  <p>&ldquo;It is quite a privilege to belong to the middle class. ... A middle-class family may sit on the front stoop all evening and watch the society people go to the weddings in their closed carriages. ... In Lincoln Park ... the young man who drives the delivery wagon sits of an evening and holds the hand of the young woman who addresses letters. ... No Chicago millionaire has such a magnificent front yard, with such a large lake and so many stately trees around it.&rdquo;</p>
</blockquote>
`;
const janeAddamsCorruptionEssay = `
<p><em>Jane Addams, &ldquo;Ethical Survivals in Municipal Corruption,&rdquo; <cite>International Journal of Ethics</cite>, 1898</em></p>
<blockquote>
  <p>&ldquo;Living together as we do ... fifty thousand people of a score of different tongues ... our social ethics have been determined much more by example than by precept. ... In a neighborhood where political standards are plastic ... the office-holder himself sets the standard. ... Because of simple friendliness, the alderman is expected to pay rent for the hard-pressed tenant ... and to find jobs when work is hard to get.&rdquo;</p>
</blockquote>
`;
const burlingameChinaSpeech = `
<p><em>Anson Burlingame, address in New York City on trade with China, 1868</em></p>
<blockquote>
  <p>&ldquo;When science has narrowed the ocean, we find that China ... has her eyes wide open. ... She tells you she is willing to trade with you, to buy of you, to sell to you. ... Holding the great staples of the earth&mdash;tea and silk&mdash;she charges you scarcely any tariff on the exports you send out in exchange for them. ... Show her fair play.&rdquo;</p>
</blockquote>
`;
const postelPopulistExcerpt = `
<p><em>Charles Postel, <cite>The Populist Vision</cite>, 2007</em></p>
<blockquote>
  <p>&ldquo;Most Populists sought economic and political reform, not the overthrow of existing systems. ... Because they believed in the transforming power of science and technology, they sought to attain expertise and knowledge for their own improvement. ... The capitalist elite pursued a corporate power that left little room for the organized power of men and women of the fields, mines, or factories. Their corporate vision clashed with the Populist vision of an alternative capitalism.&rdquo;</p>
</blockquote>
`;

export const unit6TopicQuestions: TopicQuestionBank = {
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
  "6.13": [
    {
      id: "6-13-q1",
      prompt:
        "Which development most directly resulted from the railroad achievement described in the excerpt?",
      stimulus: promontorySummitReport,
      options: [
        { id: "A", text: "Merchants organized to block transportation expansion." },
        { id: "B", text: "New commercial hubs and settlements grew along rail corridors." },
        { id: "C", text: "Federal regulators placed strict controls on rail companies." },
        { id: "D", text: "Most new immigrants settled on farms directly along the tracks." },
      ],
      correctOptionId: "B",
      explanation:
        "By binding the coasts together, the transcontinental line spurred towns, depots, and markets wherever trains stopped, reshaping western settlement.",
      source: "The New York Times, completion of the Pacific Railroad, 1869",
    },
    {
      id: "6-13-q2",
      prompt:
        "How did the transportation development described in the excerpt affect American agriculture?",
      stimulus: promontorySummitReport,
      options: [
        { id: "A", text: "Railroad employment soon surpassed farm labor across the nation." },
        { id: "B", text: "Food prices rose sharply because eastern demand exceeded supply." },
        { id: "C", text: "Farmers formed cooperative movements to resist railroad monopolies." },
        { id: "D", text: "Immigrant laborers overwhelmingly chose rural farming over city work." },
      ],
      correctOptionId: "C",
      explanation:
        "Dependent on rail shipment yet frustrated by discriminatory rates, farmers created groups such as the Grange to pressure railroads and regulators.",
      source: "The New York Times, completion of the Pacific Railroad, 1869",
    },
    {
      id: "6-13-q3",
      prompt: "Which factor best explains the rapid construction achievements described in the excerpt?",
      stimulus: promontorySummitReport,
      options: [
        { id: "A", text: "Nativist opposition to immigrant labor on infrastructure projects" },
        { id: "B", text: "Southern planters' desire to expand the sharecropping system westward" },
        { id: "C", text: "Grassroots labor unions demanding better working conditions" },
        { id: "D", text: "Federal subsidies that promoted rail and telegraph networks" },
      ],
      correctOptionId: "D",
      explanation:
        "Congressional land grants, loans, and favorable charters gave the Union Pacific and Central Pacific the capital needed to span the continent.",
      source: "The New York Times, completion of the Pacific Railroad, 1869",
    },
    {
      id: "6-13-q4",
      prompt:
        "Which statement best captures a difference between Chief Joseph's and Commissioner Parker's arguments?",
      stimulus: parkerJosephExcerpts,
      options: [
        { id: "A", text: "Joseph endorsed the reservation system, whereas Parker condemned it." },
        { id: "B", text: "Joseph insisted Indigenous nations were sovereign; Parker denied their sovereignty." },
        { id: "C", text: "Joseph wanted industrialization on reservations; Parker preferred agriculture." },
        { id: "D", text: "Joseph opposed meetings with U.S. officials; Parker demanded more diplomacy." },
      ],
      correctOptionId: "B",
      explanation:
        "Joseph defended Nez Perce autonomy and land rights, while Parker argued tribes were not sovereign and should be treated as federal wards.",
      source: "Ely S. Parker report and Chief Joseph essay, 1869 & 1879",
    },
    {
      id: "6-13-q5",
      prompt: "Unlike Commissioner Parker, Chief Joseph argues that American Indians primarily sought to",
      stimulus: parkerJosephExcerpts,
      options: [
        { id: "A", text: "Preserve their culture and homeland" },
        { id: "B", text: "Receive higher annuity payments for their land" },
        { id: "C", text: "Gain federal boarding-school access for children" },
        { id: "D", text: "Invite railroad construction across their territory" },
      ],
      correctOptionId: "A",
      explanation:
        "Joseph emphasized ancestral graves, boundaries, and independence, focusing on cultural survival rather than Parker's assimilationist program.",
      source: "Ely S. Parker report and Chief Joseph essay, 1869 & 1879",
    },
    {
      id: "6-13-q6",
      prompt:
        "Which similarity between the two excerpts is most accurate?",
      stimulus: parkerJosephExcerpts,
      options: [
        { id: "A", text: "Both praised missionary work as purely positive." },
        { id: "B", text: "Both agreed that the federal government wielded ultimate legal authority." },
        { id: "C", text: "Both opposed treaties that transferred Indigenous lands." },
        { id: "D", text: "Both insisted Native Americans required moral training." },
      ],
      correctOptionId: "C",
      explanation:
        "Parker condemned treaties for falsely implying sovereignty, while Joseph denounced unauthorized treaties that took Nez Perce land—different logic, same opposition.",
      source: "Ely S. Parker report and Chief Joseph essay, 1869 & 1879",
    },
    {
      id: "6-13-q7",
      prompt:
        "The dissent best supports which interpretation of the Fourteenth Amendment?",
      stimulus: harlanPlessyDissent,
      options: [
        { id: "A", text: "It represented judicial overreach into state matters." },
        { id: "B", text: "It became redundant once the Fifteenth Amendment passed." },
        { id: "C", text: "It was essential to defending African Americans' civil rights." },
        { id: "D", text: "It addressed economic unrest among Populists." },
      ],
      correctOptionId: "C",
      explanation:
        "Harlan argued that the Fourteenth Amendment guaranteed equal civil rights and should shield Black Americans from segregation.",
      source: "Justice John Marshall Harlan, Plessy v. Ferguson dissent, 1896",
    },
    {
      id: "6-13-q8",
      prompt:
        "The broader context of the case most directly supports which explanation of Gilded Age society?",
      stimulus: harlanPlessyDissent,
      options: [
        { id: "A", text: "New racial theories were used to justify segregation laws." },
        { id: "B", text: "Government allied with labor to expand workers' rights." },
        { id: "C", text: "Immigration restrictions fully reflected nativist goals." },
        { id: "D", text: "Railroads eliminated regional inequalities in wealth." },
      ],
      correctOptionId: "A",
      explanation:
        "Scientific racism and 'separate but equal' doctrines underpinned the majority opinion that Harlan opposed, revealing how segregation was rationalized.",
      source: "Justice John Marshall Harlan, Plessy v. Ferguson dissent, 1896",
    },
    {
      id: "6-13-q9",
      prompt:
        "The historical situation of the ruling best supports which claim about African Americans in the late 1800s?",
      stimulus: harlanPlessyDissent,
      options: [
        { id: "A", text: "They abandoned the sharecropping system." },
        { id: "B", text: "They organized movements to demand political equality." },
        { id: "C", text: "They migrated west in overwhelming numbers to escape Jim Crow." },
        { id: "D", text: "They comprised the largest share of the industrial workforce." },
      ],
      correctOptionId: "B",
      explanation:
        "Plessy itself was a test case orchestrated by civil rights activists, illustrating continued Black political organizing despite setbacks.",
      source: "Justice John Marshall Harlan, Plessy v. Ferguson dissent, 1896",
    },
    {
      id: "6-13-q10",
      prompt:
        "What broader economic condition is implied by Gould's testimony?",
      stimulus: jayGouldTestimony,
      options: [
        { id: "A", text: "Businesses built new management hierarchies to boost output." },
        { id: "B", text: "Southern agriculture surpassed all other economic sectors." },
        { id: "C", text: "Social classes converged as living standards equalized." },
        { id: "D", text: "Large-scale industry faced anticapitalist federal policies." },
      ],
      correctOptionId: "A",
      explanation:
        "Gould's defense of expert-run corporations reflects the era's shift toward professionally managed, high-output enterprises.",
      source: "Jay Gould, Senate testimony, 1883",
    },
    {
      id: "6-13-q11",
      prompt:
        "What popular business practice of the late 1800s is reflected in Gould's remarks?",
      stimulus: jayGouldTestimony,
      options: [
        { id: "A", text: "Rail and telegraph systems relied solely on private funds." },
        { id: "B", text: "Labor and management resolved disputes without conflict." },
        { id: "C", text: "Industrial leaders consolidated firms into trusts and holding companies." },
        { id: "D", text: "Producers focused mainly on overseas colonies for resources." },
      ],
      correctOptionId: "C",
      explanation:
        "Gould—himself a financier of vast rail and telegraph networks—embodied the consolidation trend that concentrated wealth and corporate power.",
      source: "Jay Gould, Senate testimony, 1883",
    },
    {
      id: "6-13-q12",
      prompt:
        "Gould's testimony best illustrates which widespread belief among business leaders?",
      stimulus: jayGouldTestimony,
      options: [
        { id: "A", text: "Federal officials should frequently mediate class conflict." },
        { id: "B", text: "Economic growth required limited government interference." },
        { id: "C", text: "Most industrialists had inherited their fortunes." },
        { id: "D", text: "Telecommunications needed strict public regulation." },
      ],
      correctOptionId: "B",
      explanation:
        "By insisting markets 'regulate themselves,' Gould articulated laissez-faire views common among Gilded Age moguls.",
      source: "Jay Gould, Senate testimony, 1883",
    },
    {
      id: "6-13-q13",
      prompt:
        "What is one similarity in Bodnar's and Ewen's interpretations of immigrant families?",
      stimulus: bodnarEwenExcerpts,
      options: [
        { id: "A", text: "Immigrant families weakened economically after migration." },
        { id: "B", text: "Families provided crucial economic support networks." },
        { id: "C", text: "Families rushed to abandon Old World customs." },
        { id: "D", text: "Families prioritized individual advancement over kinship." },
      ],
      correctOptionId: "B",
      explanation:
        "Both historians highlight kin networks, shared labor, and celebrations that redistributed limited resources to sustain immigrant households.",
      source: "John Bodnar and Elizabeth Ewen on immigrant families, 1985",
    },
    {
      id: "6-13-q14",
      prompt:
        "Which statement best captures a difference between Bodnar's and Ewen's arguments?",
      stimulus: bodnarEwenExcerpts,
      options: [
        { id: "A", text: "Bodnar emphasizes modern values; Ewen emphasizes tradition." },
        { id: "B", text: "Bodnar stresses kin support; Ewen says immigrants relied on individualism." },
        { id: "C", text: "Ewen highlights youth seeking personal fulfillment; Bodnar stresses family-first priorities." },
        { id: "D", text: "Ewen praises American acceptance; Bodnar describes hostility." },
      ],
      correctOptionId: "C",
      explanation:
        "Ewen notes generational tensions over romance and autonomy, whereas Bodnar underscores collective sacrifice for family goals.",
      source: "John Bodnar and Elizabeth Ewen on immigrant families, 1985",
    },
    {
      id: "6-13-q15",
      prompt:
        "Taken together, the two excerpts best support which conclusion?",
      stimulus: bodnarEwenExcerpts,
      options: [
        { id: "A", text: "Native-born Americans eagerly embraced new immigrants." },
        { id: "B", text: "War in Europe drove most late-nineteenth-century immigration." },
        { id: "C", text: "Economic needs and social ambitions often clashed for immigrant youth." },
        { id: "D", text: "Industrialists demanded increased immigration to cut wages." },
      ],
      correctOptionId: "C",
      explanation:
        "Families relied on collective labor, yet younger members pushed for modern romantic freedoms, revealing competing priorities within immigrant communities.",
      source: "John Bodnar and Elizabeth Ewen on immigrant families, 1985",
    },
    {
      id: "6-13-q16",
      prompt:
        "Those who disagreed with the poem's message most likely supported which policy?",
      stimulus: lazarusNewColossus,
      options: [
        { id: "A", text: "Court rulings outlawing labor strikes" },
        { id: "B", text: "Civil-service reforms expanding local hiring control" },
        { id: "C", text: "Legislation restricting immigration from East Asia" },
        { id: "D", text: "Federal enforcement of African American voting rights" },
      ],
      correctOptionId: "C",
      explanation:
        "Nativists opposed Lazarus's welcome to the 'huddled masses' and championed exclusionary laws such as the Chinese Exclusion Act.",
      source: "Emma Lazarus, \"The New Colossus,\" 1883",
    },
    {
      id: "6-13-q17",
      prompt:
        "What similarity connects immigration described in the poem with earlier immigration to the United States?",
      stimulus: lazarusNewColossus,
      options: [
        { id: "A", text: "Immigrants were routinely enslaved in northern factories." },
        { id: "B", text: "Most immigrants immediately became subsistence farmers." },
        { id: "C", text: "Immigrants relied primarily on settlement houses for adjustment." },
        { id: "D", text: "Immigrants blended old traditions with American culture." },
      ],
      correctOptionId: "D",
      explanation:
        "Across eras, newcomers negotiated identities by preserving familiar customs while adopting aspects of U.S. society.",
      source: "Emma Lazarus, \"The New Colossus,\" 1883",
    },
    {
      id: "6-13-q18",
      prompt:
        "Which continuity best describes reactions to immigration in the late 1800s compared with earlier periods?",
      stimulus: lazarusNewColossus,
      options: [
        { id: "A", text: "Social Darwinists celebrated immigrant labor competition." },
        { id: "B", text: "Reformers insisted immigrants retain original cultures." },
        { id: "C", text: "Religious leaders encouraged acceptance of Catholic diversity." },
        { id: "D", text: "Nativists sought to curb the political influence of immigrant voters." },
      ],
      correctOptionId: "D",
      explanation:
        "From the 1840s through the 1890s, nativist movements tried to limit immigrant political power, fearing machine politics and cultural change.",
      source: "Emma Lazarus, \"The New Colossus,\" 1883",
    },
    {
      id: "6-13-q19",
      prompt:
        "What can be inferred about middle-class Americans from the excerpt?",
      stimulus: georgeAdeExcerpt,
      options: [
        { id: "A", text: "They surpassed elites in financial stability." },
        { id: "B", text: "They enjoyed growing access to leisure time." },
        { id: "C", text: "Their working conditions deteriorated sharply." },
        { id: "D", text: "They rejected consumer culture altogether." },
      ],
      correctOptionId: "B",
      explanation:
        "Ade describes clerks lingering on stoops and strolling in parks, suggesting new leisure opportunities for urban middle-class families.",
      source: "George Ade, Chicago Record, 1890",
    },
    {
      id: "6-13-q20",
      prompt:
        "The excerpt best illustrates which urban trend of the late 1800s?",
      stimulus: georgeAdeExcerpt,
      options: [
        { id: "A", text: "Working people demanded broader access to universities." },
        { id: "B", text: "Elites commonly used public parks for recreation." },
        { id: "C", text: "Traditional urban planning remained unchanged." },
        { id: "D", text: "New public spaces enhanced city life for ordinary residents." },
      ],
      correctOptionId: "D",
      explanation:
        "Ade highlights Lincoln Park as a democratic space where everyday Chicagoans enjoyed fresh air and scenery, reflecting turn-of-the-century park design.",
      source: "George Ade, Chicago Record, 1890",
    },
    {
      id: "6-13-q21",
      prompt:
        "The excerpt provides evidence of which development among the wealthy during the era?",
      stimulus: georgeAdeExcerpt,
      options: [
        { id: "A", text: "A belief that wealth carried a moral duty to improve society" },
        { id: "B", text: "Rejection of the social conventions governing elites" },
        { id: "C", text: "Mass relocation of millionaires to rural homesteads" },
        { id: "D", text: "Commitment to expanding working-class political power" },
      ],
      correctOptionId: "A",
      explanation:
        "Public parks and civic improvements often depended on philanthropic donations, reflecting the era's emerging gospel of wealth ideals.",
      source: "George Ade, Chicago Record, 1890",
    },
    {
      id: "6-13-q22",
      prompt:
        "Addams's perspective supports which broader argument about political machines?",
      stimulus: janeAddamsCorruptionEssay,
      options: [
        { id: "A", text: "Machines prevented immigrants from adopting U.S. political norms." },
        { id: "B", text: "Women reformers focused largely on suffrage for themselves." },
        { id: "C", text: "Democrats feared that immigrants weakened their party." },
        { id: "D", text: "Chicago uniquely faced more corruption than other cities." },
      ],
      correctOptionId: "A",
      explanation:
        "Addams argued that patronage and personal favors distorted civic standards in immigrant wards, hindering genuine self-government.",
      source: "Jane Addams, \"Ethical Survivals in Municipal Corruption,\" 1898",
    },
    {
      id: "6-13-q23",
      prompt:
        "What does Addams's point of view reveal about social reformers?",
      stimulus: janeAddamsCorruptionEssay,
      options: [
        { id: "A", text: "They operated almost exclusively in the Midwest." },
        { id: "B", text: "They swiftly achieved sweeping legislative successes." },
        { id: "C", text: "They opposed continued immigration to the United States." },
        { id: "D", text: "They linked multiple social problems, such as corruption and poverty." },
      ],
      correctOptionId: "D",
      explanation:
        "Settlement-house activists like Addams connected machine politics, immigrant integration, and ethics, advocating holistic reform.",
      source: "Jane Addams, \"Ethical Survivals in Municipal Corruption,\" 1898",
    },
    {
      id: "6-13-q24",
      prompt:
        "The historical situation of the excerpt supports which claim about reform during the Gilded Age?",
      stimulus: janeAddamsCorruptionEssay,
      options: [
        { id: "A", text: "The Social Gospel sparked many new reform movements." },
        { id: "B", text: "Women reformers' leadership expanded their public roles." },
        { id: "C", text: "Urban residents were urged to join utopian communities." },
        { id: "D", text: "Reformers prioritized sending immigrants to college." },
      ],
      correctOptionId: "B",
      explanation:
        "Addams's prominence exemplifies how women leveraged reform work to claim authority beyond domestic spheres.",
      source: "Jane Addams, \"Ethical Survivals in Municipal Corruption,\" 1898",
    },
    {
      id: "6-13-q25",
      prompt:
        "Which evidence would best support Addams's argument about politics in immigrant neighborhoods?",
      stimulus: janeAddamsCorruptionEssay,
      options: [
        { id: "A", text: "Civil-service reform reduced patronage jobs." },
        { id: "B", text: "Immigrant voter loyalty enabled the growth of urban machines." },
        { id: "C", text: "Muckraking journalists exposed corruption nationwide." },
        { id: "D", text: "African Americans overwhelmingly backed Republicans." },
      ],
      correctOptionId: "B",
      explanation:
        "Machine bosses relied on immigrant blocs by trading jobs and assistance for votes, the very dynamic Addams critiques.",
      source: "Jane Addams, \"Ethical Survivals in Municipal Corruption,\" 1898",
    },
    {
      id: "6-13-q26",
      prompt:
        "Which context most directly explains the interest in Chinese trade described in the excerpt?",
      stimulus: burlingameChinaSpeech,
      options: [
        { id: "A", text: "Demand for railroad laborers" },
        { id: "B", text: "Desire for new resources and markets for U.S. goods" },
        { id: "C", text: "Declining competition from European empires" },
        { id: "D", text: "Collapse of Atlantic commercial networks" },
      ],
      correctOptionId: "B",
      explanation:
        "Post-Civil War industrial growth required raw materials and customers; Burlingame touted China as a vast market and supplier.",
      source: "Anson Burlingame, address on China trade, 1868",
    },
    {
      id: "6-13-q27",
      prompt:
        "Which policy outlook best matches Burlingame's recommendations?",
      stimulus: burlingameChinaSpeech,
      options: [
        { id: "A", text: "Populist regulation of money supply" },
        { id: "B", text: "Restrictions on labor organizing" },
        { id: "C", text: "Laissez-faire support for free trade" },
        { id: "D", text: "Sharecropping on southern plantations" },
      ],
      correctOptionId: "C",
      explanation:
        "He urged low tariffs and 'fair play' in commerce, reflecting laissez-faire enthusiasm for open markets.",
      source: "Anson Burlingame, address on China trade, 1868",
    },
    {
      id: "6-13-q28",
      prompt:
        "The ideas expressed in the excerpt align most directly with which U.S. goal after the Civil War?",
      stimulus: burlingameChinaSpeech,
      options: [
        { id: "A", text: "Building formal colonial empires" },
        { id: "B", text: "Ending Reconstruction policies" },
        { id: "C", text: "Encouraging trans-Mississippi settlement" },
        { id: "D", text: "Extending international influence through commerce" },
      ],
      correctOptionId: "D",
      explanation:
        "Business and diplomatic leaders sought to expand U.S. influence by boosting exports and trade agreements across the Pacific.",
      source: "Anson Burlingame, address on China trade, 1868",
    },
    {
      id: "6-13-q29",
      prompt:
        "Which evidence would challenge Postel's claim that Populists embraced an 'ethos of modernity'?",
      stimulus: postelPopulistExcerpt,
      options: [
        { id: "A", text: "Populists used telegraphs and newspapers to monitor national affairs." },
        { id: "B", text: "Speakers invoked Revolutionary-era rhetoric to justify their cause." },
        { id: "C", text: "Populists promoted expanded rail networks to reach markets." },
        { id: "D", text: "Populists formed a national party out of local alliances." },
      ],
      correctOptionId: "B",
      explanation:
        "Reliance on founding-era language suggests attachment to traditional ideals rather than wholehearted embrace of modernist thinking.",
      source: "Charles Postel, The Populist Vision, 2007",
    },
    {
      id: "6-13-q30",
      prompt:
        "Which evidence would refute Postel's claim that corporate and Populist visions clashed completely?",
      stimulus: postelPopulistExcerpt,
      options: [
        { id: "A", text: "Populists demanded caps on railroad freight rates." },
        { id: "B", text: "Corporations lobbied against labor unions." },
        { id: "C", text: "Populists sought foreign markets for U.S. farm exports." },
        { id: "D", text: "Corporations opposed federal economic regulation." },
      ],
      correctOptionId: "C",
      explanation:
        "Populists' pursuit of overseas markets mirrored corporate desires for expanded trade, showing some shared aspirations.",
      source: "Charles Postel, The Populist Vision, 2007",
    },
    {
      id: "6-13-q31",
      prompt:
        "Which context best explains increased violent conflict in the West during the late 1800s?",
      options: [
        { id: "A", text: "Rising numbers of white settlers moving west" },
        { id: "B", text: "Federal regulation of industrial production" },
        { id: "C", text: "Court recognition of labor union bargaining rights" },
        { id: "D", text: "Bans on immigration from eastern Asia" },
      ],
      correctOptionId: "A",
      explanation:
        "Continued settler migration intensified competition over land and resources, provoking wars and coercive reservation policies.",
    },
    {
      id: "6-13-q32",
      prompt:
        "How did many farmers respond to industrialization in the late nineteenth century?",
      options: [
        { id: "A", text: "They rejected mechanization to protect farm labor jobs." },
        { id: "B", text: "They demanded restrictions on immigration to protect land access." },
        { id: "C", text: "They supported movements to curb corporate power and public ownership of railroads." },
        { id: "D", text: "They protested the creation of western Indian reservations." },
      ],
      correctOptionId: "C",
      explanation:
        "Organizations such as the Farmers' Alliance and Populist Party advocated railroad regulation and government-owned infrastructure.",
    },
    {
      id: "6-13-q33",
      prompt:
        "Which factor best explains rapid economic development during the Gilded Age?",
      options: [
        { id: "A", text: "Social Darwinism legitimized wealth concentration." },
        { id: "B", text: "Sharecropping boosted agricultural output." },
        { id: "C", text: "Industrial consolidation enabled mass production." },
        { id: "D", text: "Populist reforms reinvigorated the economy." },
      ],
      correctOptionId: "C",
      explanation:
        "Trusts and integrated corporations increased efficiency and output, propelling industrial growth despite social consequences.",
    },
    {
      id: "6-13-q34",
      prompt:
        "Which statement describes a continuity in the impact of technological innovation on manufacturing?",
      options: [
        { id: "A", text: "Advances reduced reliance on immigrant labor." },
        { id: "B", text: "Higher quality goods decreased consumer demand." },
        { id: "C", text: "Transportation advances shifted industry to the South." },
        { id: "D", text: "New machines expanded factory output." },
      ],
      correctOptionId: "D",
      explanation:
        "From early industrialization through the Gilded Age, mechanization allowed factories to produce ever larger quantities of goods.",
    },
    {
      id: "6-13-q35",
      prompt:
        "What continuity linked Americans' access to natural resources in the early and late 1800s?",
      options: [
        { id: "A", text: "Expansion of U.S. control across western North America provided new resources." },
        { id: "B", text: "Overseas colonies acquired via the Monroe Doctrine furnished imports." },
        { id: "C", text: "Peaceful trade with Native nations yielded most new resources." },
        { id: "D", text: "Forced migration of enslaved people powered mining operations." },
      ],
      correctOptionId: "A",
      explanation:
        "Territorial acquisitions and enforcement of U.S. authority—from the Louisiana Purchase to reservation policies—opened vast mineral, timber, and grazing lands.",
    },
    {
      id: "6-13-q36",
      prompt:
        "Technological change in the late 1800s most closely paralleled which earlier development?",
      options: [
        { id: "A", text: "Seventeenth-century fur-trade diplomacy" },
        { id: "B", text: "Colonial-era navigation improvements boosting Atlantic trade" },
        { id: "C", text: "Early-nineteenth-century expansion of manufacturing" },
        { id: "D", text: "Reconstruction-era rise of sharecropping" },
      ],
      correctOptionId: "C",
      explanation:
        "Like the early Industrial Revolution, the Gilded Age relied on new power sources and machinery to increase productivity and lower costs.",
    },
  ],
};






