import { TopicQuestionBank } from "../../types/questions";

const levittownAd = `
<p><em>Levitt and Sons housing advertisement, <cite>Philadelphia Inquirer</cite>, 1951</em></p>
<blockquote>
  <p>"Question: When is a dollar more than a dollar?</p>
  <p>Answer: When it's used in Levittown, the most perfectly planned community in America!</p>
  <p>Anybody can build a house and charge a lot of money for it. But it's news&mdash;big news&mdash;when you can find a house to buy for only $8,990. It's a beauty with 3 and a half delightful rooms.</p>
  <p>PLUS professionally landscaped grounds&hellip;</p>
  <p>PLUS a complete bath with a tub, toilet, shower, basin&hellip;</p>
  <p>PLUS&hellip; all-steel kitchen cabinets, a stainless steel sink&hellip;</p>
  <p>PLUS free use of Levittown's championship swimming pools, PLUS free use of all playgrounds, baseball fields, play areas&hellip;</p>
  <p>So if you don't want to be disappointed, come out as soon as you can&mdash;today if possible."</p>
</blockquote>
`;

const tooleExcerpt = `
<p><em>K. Ross Toole, "An Angry Man Talks Up to Youth," 1970</em></p>
<blockquote>
  <p>"I am forty-nine years old. It took me years of considerable anguish to get where I am. I was nurtured in the Depression; I lost four years to war; I have had one coronary; I am a 'liberal,' a square and a professor of history.</p>
  <p>As such, I am supposed to have 'liaison' with the young. But the fact is that I am fed up with hippies, Yippies, militants and nonsense.</p>
  <p>Every generation makes mistakes, always has and always will. We have made our share. But my generation has made America the most affluent country on earth; it has tackled, head-on, a racial problem which no nation on earth in the history of mankind had dared to do. It has publicly declared war on poverty and it has gone to the moon; it has desegregated schools and abolished polio.</p>
  <p>I assert that we are in trouble with this younger generation not because we have failed our country, not because of affluence or stupidity, not because we are middle-class materialists, but simply because we have failed to keep that generation in its place.</p>
  <p>What we need is a reappraisal of our own middle-class selves, our worth and our hard-won progress. We need to use disdain, not mace; we need to reassess a weapon we came by the hard way&mdash;firm authority as parents, teachers, businessmen, workers and politicians."</p>
</blockquote>
`;

const blackPantherProgram = `
<p><em>Black Panther Party, Ten-Point Program, 1966</em></p>
<blockquote>
  <p>"What We Want Now! What We Believe.</p>
  <p>1. We want freedom. We want power to determine the destiny of our Black community. We believe that Black people will not be free until we are able to determine our destiny.</p>
  <p>2. We want full employment for our people. We believe that the federal government is responsible and obligated to give every man employment or a guaranteed income. We believe that if the White American businessmen will not give full employment, then the means of production should be taken from the businessmen and placed in the community so that the people of the community can organize and employ all of its people and give a high standard of living.</p>
  <p>6. We want all Black men to be exempt from military service. We believe that Black people should not be forced to fight in the military service to defend a racist government that does not protect us.</p>
  <p>8. We want freedom for all Black men held in federal, state, county and city prisons and jails. We believe that all Black people should be released from the many jails and prisons because they have not received a fair and impartial trial."</p>
</blockquote>
`;

const hernandezDecision = `
<p><em>United States Supreme Court, <cite>Hernandez v. Texas</cite>, 1954</em></p>
<blockquote>
  <p>"The systematic exclusion of persons of Mexican descent from service as jury commissioners, grand jurors, and petit jurors in the Texas county in which petitioner was indicted and tried for murder, although there were a substantial number of such persons in the county fully qualified to serve, deprived petitioner, a person of Mexican descent, of the equal protection of the laws guaranteed by the Fourteenth Amendment, and his conviction in a state court is reversed."</p>
</blockquote>
`;

const senateCensureResolution = `
<p><em>United States Senate Resolution 301 censuring Senator Joseph McCarthy, 1954</em></p>
<blockquote>
  <p>"Resolved, That the Senator from Wisconsin, Mr. McCarthy, repeatedly abused the subcommittee and its members who were trying to carry out assigned duties, thereby obstructing the constitutional processes of the Senate, and that this conduct of the Senator from Wisconsin, Mr. McCarthy, is contrary to senatorial traditions and is hereby condemned.</p>
  <p>Sec. 2. The Senator from Wisconsin, Mr. McCarthy, in stating to the public press on November 13, 1954, that the chairman of the Select Committee (Mr. Watkins) was guilty of 'the most unusual, most cowardly things I've ever heard of' and in characterizing the said committee as the 'unwitting handmaiden,' 'involuntary agent' and 'attorneys-in-fact' of the Communist Party, acted contrary to senatorial ethics and tended to bring the Senate into dishonor and disrepute, to obstruct the constitutional processes of the Senate, and to impair its dignity; and such conduct is hereby condemned."</p>
</blockquote>
`;

const coldWarLeadershipExcerpts = `
<p><em>Dwight D. Eisenhower, Farewell Address, 1961</em></p>
<blockquote>
  <p>"We face a hostile ideology&mdash;global in scope, atheistic in character, ruthless in purpose, and insidious in method.&hellip; Until the latest of our world conflicts, the United States had no armaments industry.&hellip; This conjunction of an immense military establishment and a large arms industry is new in the American experience.&hellip; In the councils of government, we must guard against the acquisition of unwarranted influence&hellip; by the military-industrial complex."</p>
</blockquote>
<p><em>John F. Kennedy, presidential campaign speech, 1960</em></p>
<blockquote>
  <p>"The development in 1953 of a relatively small hydrogen warhead made missiles the key to future military power. The Soviet Union decided then to go all out in missile development. But here in the United States we cut back our funds for missile development.&hellip; Our relative military strength has not increased as fast as the Russians.&hellip; We must step up crash programs on the Polaris submarine and the Minuteman missile."</p>
</blockquote>
`;
const warPowersActExcerpt = `
<p><em>War Powers Act, 1973</em></p>
<blockquote>
  <p>"It is the purpose of this joint resolution to fulfill the intent of the framers of the Constitution of the United States and insure that the collective judgment of both the Congress and the President will apply to the introduction of United States Armed Forces into hostilities.&hellip; The President in every possible instance shall consult with Congress before introducing United States Armed Forces into hostilities and after every such introduction shall consult regularly with the Congress."</p>
</blockquote>
`;

const churchillIronCurtainExcerpt = `
<p><em>Winston Churchill, "Sinews of Peace" (Iron Curtain Speech), 1946</em></p>
<blockquote>
  <p>"From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent. Behind that line lie all the capitals of the ancient states of Central and Eastern Europe.&hellip; The Communist parties, which were very small in all these Eastern States of Europe, have been raised to preeminence and power far beyond their numbers and are seeking everywhere to obtain totalitarian control."</p>
</blockquote>
`;

// Remove unused variable
const oilImportsGraphDescription = `
<p><em>U.S. Imports of Crude Oil, 1950-1980</em></p>
<p>The line graph shows crude oil imports rising gradually from near zero in 1950 to roughly half a billion barrels by 1970, climbing sharply above two and a half billion barrels in the early 1970s, and then declining to about two billion barrels by 1980.</p>
`;

const schoolSegregationMapDescription = `
<p><em>School Segregation in the South, 1958</em></p>
<p>The map highlights that most counties across the Deep South still operated segregated public schools four years after <cite>Brown v. Board of Education</cite>, with only scattered districts implementing desegregation.</p>
`;

const whyteOrganizationExcerpt = `
<p><em>William H. Whyte, <cite>The Organization Man</cite>, 1956</em></p>
<blockquote>
  <p>"Precisely because it is the age of organization, it is the other side of the coin that needs emphasis. We do need to know how to cooperate with The Organization but, more than ever, so do we need to know how to resist it.&hellip; The pressures of the group, the frustrations of individual creativity, the anonymity of achievement: are these defects to struggle against?"</p>
</blockquote>
`;
export const unit8TopicQuestions: TopicQuestionBank = {
  "8.1": [
    {
      id: "8-1-q1",
      prompt:
        "Political conservatives in the 1960s and 1970s generally reacted to developments in United States foreign policy by",
      options: [
        { id: "A", text: "demanding a return to United States diplomatic isolationism" },
        { id: "B", text: "encouraging the United States to leave all military alliances" },
        { id: "C", text: "calling for a more assertive economic and military presence abroad by the United States" },
        { id: "D", text: "supporting United States involvement in international peacekeeping missions" },
      ],
      correctOptionId: "C",
      explanation:
        "Cold War conservatives argued that setbacks in Vietnam and Soviet expansion required robust U.S. power projection, stronger alliances, and increased defense spending.",
    },
    {
      id: "8-1-q2",
      prompt: "Trust in the effectiveness of the United States government declined in the 1970s most directly in response to the",
      options: [
        { id: "A", text: "increased power of the women's rights movement" },
        { id: "B", text: "revelation of political scandals in the executive branch" },
        { id: "C", text: "expansion of nuclear weapon arsenals" },
        { id: "D", text: "passage of civil rights reforms" },
      ],
      correctOptionId: "B",
      explanation:
        "Disclosures about the Vietnam War and the Watergate scandal led many Americans to question presidential integrity and the federal government's accountability.",
    },
  ],
  "8.2": [
    {
      id: "8-2-q1",
      stimulus: levittownAd,
      prompt: "The advertisement best provides evidence for which of the following developments in the 1950s?",
      options: [
        { id: "A", text: "The increase in homogeneity in postwar society" },
        { id: "B", text: "The efforts by civil rights activists to oppose segregation" },
        { id: "C", text: "The rejection by some artists and intellectuals of mass culture" },
        { id: "D", text: "The spread of fear of communist infiltration of the federal government" },
      ],
      correctOptionId: "A",
      explanation:
        "Levittown's standardized homes and amenities epitomized suburban conformity and the homogenizing consumer culture of the 1950s.",
    },
    {
      id: "8-2-q2",
      stimulus: levittownAd,
      prompt: "The ideas in the advertisement most likely had limited appeal for which of the following groups?",
      options: [
        { id: "A", text: "Marketers and salespeople" },
        { id: "B", text: "Married homemakers and parents" },
        { id: "C", text: "Managers and professionals employed by corporations" },
        { id: "D", text: "Rebellious young people uncomfortable with conformity" },
      ],
      correctOptionId: "D",
      explanation:
        "Youth who embraced the emerging counterculture criticized suburban sameness and sought alternatives to middle-class domestic life.",
    },
    {
      id: "8-2-q3",
      stimulus: levittownAd,
      prompt: "Which of the following best explains a limitation of the incentives expressed in the advertisement?",
      options: [
        { id: "A", text: "Many new suburban housing developments of the 1950s practiced racial segregation." },
        { id: "B", text: "Many middle-class families could not afford homes in new suburbs." },
        { id: "C", text: "Most subdivisions restricted access on the basis of age." },
        { id: "D", text: "Most middle-class families preferred to remain in cities." },
      ],
      correctOptionId: "A",
      explanation:
        "Developers routinely used restrictive covenants and sales practices that excluded African Americans and other minorities from purchasing homes.",
    },
    {
      id: "8-2-q4",
      stimulus: levittownAd,
      prompt: "The ideas expressed in the advertisement overlook which context that allowed for the expansion of suburbs in the 1950s?",
      options: [
        { id: "A", text: "The sharp increase in birth rates after the war" },
        { id: "B", text: "The reliance on new roads and highways" },
        { id: "C", text: "The growth of income for middle-class families" },
        { id: "D", text: "The appeal of modern amenities to consumers" },
      ],
      correctOptionId: "B",
      explanation:
        "Mass suburbanization depended on federally funded highways and automobile access, which the advertisement assumes without acknowledging.",
    },
    {
      id: "8-2-q5",
      stimulus: whyteOrganizationExcerpt,
      prompt:
        "Whyte's concern in the excerpt for the pressures of the group, the frustrations of individual creativity best provides evidence for which of the following developments in the 1950s?",
      options: [
        { id: "A", text: "The emphasis on conformity in suburban communities" },
        { id: "B", text: "The expansion of higher education opportunities for veterans" },
        { id: "C", text: "The creation of international alliances to oppose Soviet expansion" },
        { id: "D", text: "The investigations of supposed communists in the federal government" },
      ],
      correctOptionId: "A",
      explanation:
        "Whyte critiqued the corporate and suburban pressures to conform that characterized postwar middle-class life.",
    },
    {
      id: "8-2-q6",
      stimulus: whyteOrganizationExcerpt,
      prompt:
        "Whyte's discussion about the \"issue of individualism\" best serves as evidence for responses to which situation in the 1950s?",
      options: [
        { id: "A", text: "The protests of civil rights activists against segregation" },
        { id: "B", text: "The rejection of mass culture by some artists and intellectuals" },
        { id: "C", text: "The refusal of some military draftees to serve in the Vietnam War" },
        { id: "D", text: "The opposition of a new conservative movement to postwar liberalism" },
      ],
      correctOptionId: "B",
      explanation:
        "Writers, artists, and beats rejected corporate conformity and sought authentic self-expression, echoing Whyte's warning.",
    },
  ],
  "8.3": [
    {
      id: "8-3-q1",
      stimulus: tooleExcerpt,
      prompt: "Which of the following was a long-term reaction to the actions of the youth addressed in the excerpt?",
      options: [
        { id: "A", text: "The establishment of organizations to address environmental concerns" },
        { id: "B", text: "The expansion of United States involvement in Southeast Asia" },
        { id: "C", text: "The rejection of nonviolent tactics by most civil rights groups" },
        { id: "D", text: "The emergence of a conservative backlash against perceived cultural decline" },
      ],
      correctOptionId: "D",
      explanation:
        "Criticism of student protests, counterculture mores, and social change energized a conservative reaction that gained momentum in the 1970s and 1980s.",
    },
    {
      id: "8-3-q2",
      stimulus: tooleExcerpt,
      prompt:
        "The historical development described in the excerpt can best be explained by which of the following related developments?",
      options: [
        { id: "A", text: "Declining college enrollment" },
        { id: "B", text: "The creation of a movement to stop federal desegregation efforts" },
        { id: "C", text: "Persistent economic and racial disparity in the United States" },
        { id: "D", text: "Reduced concern about Soviet influence" },
      ],
      correctOptionId: "C",
      explanation:
        "Young activists challenged ongoing inequality, poverty, and racism, arguing that the older generation had not resolved those problems.",
    },
    {
      id: "8-3-q3",
      stimulus: tooleExcerpt,
      prompt:
        "The sentiments expressed in the excerpt are best explained in connection to which broader development during the period?",
      options: [
        { id: "A", text: "Rising influence of evangelical Christian political organizations" },
        { id: "B", text: "A widening political and cultural gap between young people and earlier generations" },
        { id: "C", text: "Growing support for suburbanization and large nuclear families" },
        { id: "D", text: "Increasing calls for restrictions on immigration" },
      ],
      correctOptionId: "B",
      explanation:
        "Generational divides over war, culture, and social norms fueled clashes between students and older Americans like Toole.",
    },
    {
      id: "8-3-q4",
      prompt:
        "The growth of activism by religious conservatives in the second half of the twentieth century occurred most directly in response to the",
      options: [
        { id: "A", text: "challenging of social norms by youth movements" },
        { id: "B", text: "enactment of New Deal policies meant to address poverty" },
        { id: "C", text: "discovery of environmental damage caused by industrial production" },
        { id: "D", text: "expansion of the military budget as a result of intervention in Vietnam" },
      ],
      correctOptionId: "A",
      explanation:
        "Many religious conservatives mobilized to defend traditional values after witnessing counterculture lifestyles, the sexual revolution, and perceived moral decline.",
    },
  ],
  "8.4": [
    {
      id: "8-4-q1",
      stimulus: blackPantherProgram,
      prompt:
        "The opinions expressed in the excerpt are most similar to those of the American Indian Movement in that both groups",
      options: [
        { id: "A", text: "opposed U.S. involvement in foreign wars" },
        { id: "B", text: "asserted that states should hold more power than the federal government" },
        { id: "C", text: "argued that the United States had a responsibility to provide compensation for past injustices" },
        { id: "D", text: "demanded laws to limit environmental pollution" },
      ],
      correctOptionId: "C",
      explanation:
        "Both movements insisted that the federal government address historical oppression through material support and self-determination.",
    },
    {
      id: "8-4-q2",
      stimulus: blackPantherProgram,
      prompt:
        "Which of the following best describes the historic situation in the 1960s that prompted the emergence of reform movements such as the Black Panther Party?",
      options: [
        { id: "A", text: "U.S. efforts to limit communism at home and abroad" },
        { id: "B", text: "U.S. alliances to combat fascism and militarism" },
        { id: "C", text: "Attempts to reinvigorate the economy after the Great Depression" },
        { id: "D", text: "Intensifying divisions within and between liberal and conservative movements" },
      ],
      correctOptionId: "D",
      explanation:
        "The turbulent 1960s saw deepening splits over civil rights, the war, and social change, encouraging more militant activism.",
    },
    {
      id: "8-4-q3",
      stimulus: blackPantherProgram,
      prompt:
        "How did public attitudes toward the Civil Rights movement change as a result of sentiments such as those expressed in the excerpt?",
      options: [
        { id: "A", text: "White approval declined because many associated militant rhetoric with urban unrest." },
        { id: "B", text: "Liberal feminists widely adopted Black Panther tactics." },
        { id: "C", text: "Youth rejected the Panthers in favor of nonviolence." },
        { id: "D", text: "The federal government enacted the social welfare agenda favored by the Panthers." },
      ],
      correctOptionId: "A",
      explanation:
        "Media coverage of Black Power groups contributed to white backlash and accusations that civil rights activism promoted disorder.",
    },
    {
      id: "8-4-q4",
      stimulus: blackPantherProgram,
      prompt:
        "The sentiments expressed in the excerpt best reflect which division within the Civil Rights movement?",
      options: [
        { id: "A", text: "Optimism among white Americans that discrimination was ending" },
        { id: "B", text: "Growing support among young activists for nonviolent protest" },
        { id: "C", text: "Frustrations that social and political change was not occurring fast enough" },
        { id: "D", text: "Tensions within the federal government over combating communism" },
      ],
      correctOptionId: "C",
      explanation:
        "Impatience with the slow pace of reform pushed activists toward Black Power philosophies emphasizing community control and self-defense.",
    },
  ],
  "8.5": [
    {
      id: "8-5-q1",
      stimulus: hernandezDecision,
      prompt:
        "The decision guaranteeing the rights of Mexican Americans to serve on juries most directly resulted from which historical process during this period?",
      options: [
        { id: "A", text: "The utilization of strikes to demand increased compensation" },
        { id: "B", text: "The effort to identify suspected communists in the federal government" },
        { id: "C", text: "The expansion of social welfare programs by the federal government" },
        { id: "D", text: "The use of court challenges to obtain legal reforms" },
      ],
      correctOptionId: "D",
      explanation:
        "Civil rights organizations frequently turned to the courts, winning rulings like <cite>Hernandez</cite> that expanded constitutional protections.",
    },
    {
      id: "8-5-q2",
      stimulus: hernandezDecision,
      prompt:
        "Mexican American activism in the 1950s and 1960s was most directly inspired by which of the following?",
      options: [
        { id: "A", text: "The tactics and goals of the African American Civil Rights movement" },
        { id: "B", text: "The emergence of evangelical Christian political activism" },
        { id: "C", text: "Conservative critiques of federal power" },
        { id: "D", text: "Public reaction against antiwar protesters" },
      ],
      correctOptionId: "A",
      explanation:
        "Drawing lessons from the NAACP and other Black-led groups, Mexican American activists pursued litigation, protest, and voter mobilization.",
    },
    {
      id: "8-5-q3",
      stimulus: hernandezDecision,
      prompt:
        "Which development most directly contributed to the emergence of Mexican American activism in the 1950s and 1960s?",
      options: [
        { id: "A", text: "Decreased demand for agricultural labor in the Southwest" },
        { id: "B", text: "Changing immigration policies and patterns" },
        { id: "C", text: "Passage of the Voting Rights Act of 1965" },
        { id: "D", text: "Enactment of Great Society social programs" },
      ],
      correctOptionId: "B",
      explanation:
        "Programs such as the Bracero agreement and the 1965 immigration law increased Latino migration, strengthening community organizing.",
    },
  ],
  "8.6": [
    {
      id: "8-6-q1",
      stimulus: senateCensureResolution,
      prompt:
        "The excerpt could best be used as evidence by historians studying which of the following developments?",
      options: [
        { id: "A", text: "The expansion of suburbs" },
        { id: "B", text: "The decline of the Red Scare" },
        { id: "C", text: "The emergence of the Soviet Union" },
        { id: "D", text: "The development of the counterculture" },
      ],
      correctOptionId: "B",
      explanation:
        "The Senate's censure of McCarthy marked elite repudiation of his anti-communist tactics and signaled waning support for the Red Scare.",
    },
    {
      id: "8-6-q2",
      stimulus: senateCensureResolution,
      prompt:
        "Senator Joseph McCarthy's actions, as described in the excerpt, were most likely interpreted as a reaction to which historical situation?",
      options: [
        { id: "A", text: "Challenges to New Deal economic policies" },
        { id: "B", text: "Creation of the interstate highway system" },
        { id: "C", text: "Expansion of the size of the military" },
        { id: "D", text: "Perceptions of expanding foreign influence" },
      ],
      correctOptionId: "D",
      explanation:
        "Fears that Soviet espionage threatened U.S. institutions motivated McCarthy's accusations of communist subversion.",
    },
    {
      id: "8-6-q3",
      stimulus: senateCensureResolution,
      prompt:
        "Rhetoric in the excerpt would most likely have been interpreted as promoting which policy?",
      options: [
        { id: "A", text: "Preventing Communists from running for office" },
        { id: "B", text: "Supporting regimes in Korea and Vietnam against communism" },
        { id: "C", text: "Rejecting the tactics used to expose alleged communists in the government" },
        { id: "D", text: "Establishing détente with communist nations" },
      ],
      correctOptionId: "C",
      explanation:
        "By condemning McCarthy's conduct, the Senate urged a return to constitutional processes rather than sensational investigations.",
    },
  ],
  "8.7": [
    {
      id: "8-7-q1",
      prompt:
        "One way in which immigration policy in the 1960s differed from immigration policy enacted in the 1920s was that legislation in the 1960s",
      options: [
        { id: "A", text: "imposed a ban on immigration from Asia" },
        { id: "B", text: "loosened restrictions on immigration on the basis of national origin" },
        { id: "C", text: "established limits on the number of immigrants allowed in the country" },
        { id: "D", text: "barred immigration from Eastern European countries" },
      ],
      correctOptionId: "B",
      explanation:
        "The Hart-Celler Act of 1965 abolished national-origins quotas that had favored northern and western Europeans since the 1920s.",
    },
    {
      id: "8-7-q2",
      prompt:
        "The Immigration Act of 1965 shared a common goal with which other federal policy of the era?",
      options: [
        { id: "A", text: "Recruiting new factory laborers to encourage industrialization" },
        { id: "B", text: "Expanding protections for African Americans" },
        { id: "C", text: "Preventing communist infiltration of the United States" },
        { id: "D", text: "Supporting the suburbanization of America" },
      ],
      correctOptionId: "B",
      explanation:
        "Civil rights reforms and the 1965 immigration law both sought to dismantle legal discrimination tied to identity.",
    },
    {
      id: "8-7-q3",
      prompt:
        "Which long-term development most influenced the passage of new immigration laws in 1965?",
      options: [
        { id: "A", text: "Pressure to remove discriminatory barriers at home and abroad" },
        { id: "B", text: "Rising nativism toward migrants from Europe" },
        { id: "C", text: "Opposition to hiring foreign workers during recession" },
        { id: "D", text: "Growth of isolationism in response to global tensions" },
      ],
      correctOptionId: "A",
      explanation:
        "During the Cold War and the civil rights era, U.S. leaders faced global and domestic demands to align immigration policy with egalitarian ideals.",
    },
  ],
  "8.8": [
    {
      id: "8-8-q1",
      stimulus: coldWarLeadershipExcerpts,
      prompt: "The excerpts best support which argument about postwar United States foreign policy?",
      options: [
        { id: "A", text: "Some Americans called for reduced tensions with the Soviet Union." },
        { id: "B", text: "Fear of Soviet expansion led to greater U.S. international involvement." },
        { id: "C", text: "The United States sought to recolonize newly independent nations." },
        { id: "D", text: "Many Americans opposed forming new alliances in Europe." },
      ],
      correctOptionId: "B",
      explanation:
        "Both Eisenhower and Kennedy acknowledged the communist threat and advocated continued vigilance through U.S. global engagement.",
    },
    {
      id: "8-8-q2",
      stimulus: coldWarLeadershipExcerpts,
      prompt: "Which statement best describes a difference between Eisenhower's and Kennedy's arguments?",
      options: [
        { id: "A", text: "Eisenhower urged invading communist countries, whereas Kennedy sought peaceful relations." },
        { id: "B", text: "Eisenhower dismissed the communist threat, whereas Kennedy acknowledged it." },
        { id: "C", text: "Kennedy pressed for higher defense spending, whereas Eisenhower warned of its domestic risks." },
        { id: "D", text: "Kennedy discounted the value of allies, whereas Eisenhower praised alliances." },
      ],
      correctOptionId: "C",
      explanation:
        "Kennedy criticized perceived U.S. lag in missile deployment, while Eisenhower cautioned against excessive influence of the military-industrial complex.",
    },
    {
      id: "8-8-q3",
      stimulus: coldWarLeadershipExcerpts,
      prompt: "What was a similarity between Eisenhower's and Kennedy's arguments in the excerpts?",
      options: [
        { id: "A", text: "Both claimed defense policy threatened liberty at home." },
        { id: "B", text: "Both stated that the United States had lost international influence." },
        { id: "C", text: "Both called for larger budgets for weapons and supplies." },
        { id: "D", text: "Both asserted that communism endangered U.S. national security." },
      ],
      correctOptionId: "D",
      explanation:
        "Each leader underscored the danger posed by Soviet communism and the need for active measures to counter it.",
    },
  ],
  "8.9": [
    {
      id: "8-9-q1",
      stimulus: warPowersActExcerpt,
      prompt:
        "Which best explains the reason for the deployment of U.S. troops overseas at the time when this act was passed?",
      options: [
        { id: "A", text: "Concern over German aggression in Europe" },
        { id: "B", text: "Desire to gain political control over new colonies" },
        { id: "C", text: "Attempts to overthrow Soviet domination in Eastern Europe" },
        { id: "D", text: "Fear of the expansion of communism to foreign nations" },
      ],
      correctOptionId: "D",
      explanation:
        "The War Powers Act responded to Vietnam-era interventions motivated by containment of communism in Southeast Asia.",
    },
    {
      id: "8-9-q2",
      stimulus: warPowersActExcerpt,
      prompt: "Which development best explains the passage of the law excerpted?",
      options: [
        { id: "A", text: "Presidents escalated the Vietnam War without a declaration of war." },
        { id: "B", text: "Congress opposed executive actions enforcing school desegregation." },
        { id: "C", text: "Counterculture leaders wanted to expand presidential power." },
        { id: "D", text: "Civil rights leaders condemned violence against protestors." },
      ],
      correctOptionId: "A",
      explanation:
        "Congress sought to reassert its constitutional authority after the Gulf of Tonkin Resolution allowed presidents broad latitude in Vietnam.",
    },
    {
      id: "8-9-q3",
      stimulus: warPowersActExcerpt,
      prompt:
        "Which twentieth-century political debate best explains the act's goal of 'fulfilling the intent of the framers of the Constitution'?",
      options: [
        { id: "A", text: "Debates over restricting civil liberties in wartime" },
        { id: "B", text: "Debates over the expansion of executive authority" },
        { id: "C", text: "Debates over extending individual rights to new groups" },
        { id: "D", text: "Debates over the federal government's role in the economy" },
      ],
      correctOptionId: "B",
      explanation:
        "Lawmakers argued that unchecked presidential war-making violated the constitutional balance between Congress and the executive.",
    },
  ],
  "8.10": [
    {
      id: "8-10-q1",
      stimulus: churchillIronCurtainExcerpt,
      prompt:
        "The fact that a former British prime minister expressed the ideas in the excerpt to a U.S. audience helped promote which of the following?",
      options: [
        { id: "A", text: "U.S. support for Britain's colonial empire" },
        { id: "B", text: "A greater U.S. willingness to share nuclear weapons with Britain" },
        { id: "C", text: "A U.S. decision to withdraw troops from Japan" },
        { id: "D", text: "Participation of Britain and the United States in collective security systems" },
      ],
      correctOptionId: "D",
      explanation:
        "Churchill's warning encouraged closer Anglo-American cooperation that evolved into NATO and other collective defense arrangements.",
    },
    {
      id: "8-10-q2",
      stimulus: churchillIronCurtainExcerpt,
      prompt:
        "A key significance of Churchill's purpose in the excerpt was that it helped prompt the United States to",
      options: [
        { id: "A", text: "promise financial aid to returning veterans" },
        { id: "B", text: "eliminate barriers to immigration" },
        { id: "C", text: "provide financial support to democratic nations in Western Europe" },
        { id: "D", text: "restrict the power of labor unions" },
      ],
      correctOptionId: "C",
      explanation:
        "Concerns about Soviet domination contributed to initiatives like the Marshall Plan, which aided Western European recovery.",
    },
    {
      id: "8-10-q3",
      stimulus: churchillIronCurtainExcerpt,
      prompt:
        "An important way in which the situation described in the excerpt was significant was that it",
      options: [
        { id: "A", text: "highlighted a view of communism as an authoritarian threat" },
        { id: "B", text: "celebrated Allied victory in the Second World War" },
        { id: "C", text: "suggested concerns about communist subversion in the United States" },
        { id: "D", text: "encouraged direct military confrontation between the superpowers" },
      ],
      correctOptionId: "A",
      explanation:
        "Churchill depicted Soviet control as totalitarian, shaping U.S. perceptions of communism as incompatible with freedom.",
    },
    {
      id: "8-10-q4",
      stimulus: churchillIronCurtainExcerpt,
      prompt: "Churchill's 'Iron Curtain' speech helped mark the beginning of which development?",
      options: [
        { id: "A", text: "The Cold War between the United States and the Soviet Union" },
        { id: "B", text: "U.S. campaigns to occupy Eastern Europe" },
        { id: "C", text: "U.S. support for democratic movements in Latin America" },
        { id: "D", text: "Soviet efforts to dominate Western Europe" },
      ],
      correctOptionId: "A",
      explanation:
        "The speech publicly acknowledged the deepening division with Moscow and helped usher in the Cold War era.",
    },
  ],
  
  "8.12": [
    {
      id: "8-12-q1",
      stimulus: oilImportsGraphDescription,
      prompt:
        "Which statement describes the trend in crude oil imports to the United States from 1950 to 1970 as depicted in the graph?",
      options: [
        { id: "A", text: "Imports rapidly increased to 2 billion barrels in 1960 and then stayed level." },
        { id: "B", text: "Imports declined rapidly until 1960 before returning to previous levels." },
        { id: "C", text: "Imports peaked just before 1970 and then rapidly declined." },
        { id: "D", text: "Imports rose gradually until reaching about half a billion barrels in 1970." },
      ],
      correctOptionId: "D",
      explanation:
        "Growing postwar consumption steadily raised U.S. reliance on imported oil through 1970.",
    },
    {
      id: "8-12-q2",
      stimulus: oilImportsGraphDescription,
      prompt:
        "Which statement describes the trend in crude oil imports between 1970 and 1980 as depicted in the graph?",
      options: [
        { id: "A", text: "Imports declined to over three billion barrels in 1980." },
        { id: "B", text: "Imports rose steadily to half a billion barrels in 1980." },
        { id: "C", text: "Imports rose rapidly and then declined to about two billion barrels in 1980." },
        { id: "D", text: "Imports fell to zero before recovering to 2.5 billion barrels in 1980." },
      ],
      correctOptionId: "C",
      explanation:
        "After surging early in the decade, imports dropped in response to the oil shocks and conservation efforts, settling near two billion barrels by 1980.",
    },
    {
      id: "8-12-q3",
      stimulus: oilImportsGraphDescription,
      prompt:
        "Which interpretation best fits the overall trend in U.S. crude oil imports between 1950 and 1980?",
      options: [
        { id: "A", text: "Domestic production increased during the period." },
        { id: "B", text: "The United States became more dependent on foreign oil." },
        { id: "C", text: "Oil usage became more efficient." },
        { id: "D", text: "Imports increased at a constant rate." },
      ],
      correctOptionId: "B",
      explanation:
        "Despite late-1970s declines, the long-term rise in imports shows deepening dependence on foreign energy supplies.",
    },
    {
      id: "8-12-q4",
      prompt:
        "Which statement explains the context for United States economic development between 1950 and the early 1970s?",
      options: [
        { id: "A", text: "Credit and stock markets became unstable because of overspeculation." },
        { id: "B", text: "Low unemployment encouraged American optimism about economic growth." },
        { id: "C", text: "A powerful conservative movement halted federal economic intervention." },
        { id: "D", text: "Companies relied on commodities from new colonial territories." },
      ],
      correctOptionId: "B",
      explanation:
        "High employment and rising wages characterized the postwar boom, fostering confidence in continued prosperity.",
    },
  ],
  "8.13": [
    {
      id: "8-13-q1",
      stimulus: schoolSegregationMapDescription,
      prompt:
        "In response to the situation depicted in the map, most civil rights leaders in the 1960s did which of the following?",
      options: [
        { id: "A", text: "Focused activism in the North and Upper South" },
        { id: "B", text: "Abandoned legal strategies as ineffective" },
        { id: "C", text: "Urged stronger federal action to enforce civil rights protections" },
        { id: "D", text: "Adopted militant separatism and Black Power" },
      ],
      correctOptionId: "C",
      explanation:
        "Continued southern defiance of desegregation led civil rights groups to demand direct federal enforcement, culminating in the Civil Rights Act of 1964 and Voting Rights Act of 1965.",
    },
    {
      id: "8-13-q2",
      stimulus: schoolSegregationMapDescription,
      prompt:
        "The situation depicted in the map had the most in common with which earlier process?",
      options: [
        { id: "A", text: "Antebellum residential segregation" },
        { id: "B", text: "Sectional conflict between North and South in the mid-1800s" },
        { id: "C", text: "Federal attempts to guarantee rights for formerly enslaved people during Reconstruction" },
        { id: "D", text: "Great Migration patterns during and after World War I" },
      ],
      correctOptionId: "C",
      explanation:
        "Like during Reconstruction, federal mandates for Black equality met fierce resistance from southern state and local officials.",
    },
    {
      id: "8-13-q3",
      stimulus: schoolSegregationMapDescription,
      prompt: "Which reason best explains the patterns depicted on the map?",
      options: [
        { id: "A", text: "Deep South states responded more favorably to <cite>Brown v. Board</cite> than other regions." },
        { id: "B", text: "Many counties and states actively resisted implementing the Supreme Court's ruling." },
        { id: "C", text: "Economic differences unintentionally created racial segregation in schools." },
        { id: "D", text: "Civil rights leaders prioritized transportation over school desegregation." },
      ],
      correctOptionId: "B",
      explanation:
        "Southern officials used 'massive resistance' tactics to evade desegregation orders, maintaining racially separate schools into the late 1950s.",
    },
  ],
};


