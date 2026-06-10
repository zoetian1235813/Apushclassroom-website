export interface SAQBlank {
  id: number;
  prompt: string;
  options: string[];
  answer: string;
  helper?: string;
  matchSentenceParts?: string[];
  matchAnswers?: string[];
}

export interface SAQGuidedExercise {
  id: string;
  releaseId: SAQAvailableReleaseId;
  unit: string;
  era: string;
  difficulty: "intro" | "intermediate" | "advanced";
  sourceLabel: string;
  sourceMeta: string;
  sourceHtml: string;
  question: string;
  blanks: SAQBlank[];
}

export type SAQAvailableReleaseId =
  | "2024-set2-saq1"
  | "2024-set2-saq2"
  | "2024-set2-saq3"
  | "2024-set2-saq4"
  | "2025-set2-saq1";
export type SAQReleaseId =
  | SAQAvailableReleaseId
  | `${number}-set${1 | 2}-saq${1 | 2 | 3 | 4}`;

export const saqGuidedExercises: Record<
  SAQAvailableReleaseId,
  SAQGuidedExercise
> = {
  "2024-set2-saq1": {
    id: "2024-set2-saq1",
    releaseId: "2024-set2-saq1",
    unit: "Unit 8 / 9",
    era: "1945–1980",
    difficulty: "intermediate",
    sourceLabel: "2024 APUSH Set 2 · SAQ 1",
    sourceMeta: "Secondary Source Comparison",
    sourceHtml:
      '<p><strong>Terry H. Anderson, <em>The Movement and the Sixties</em>, 1995</strong></p><p>“Why did millions of citizens become activists, take to the streets, and participate in the movement [of social activism in the 1960s]? . . . Activists felt that problems existing in the nation were inconsistent with the American ideal, with ideas expressed in the Declaration of Independence and U.S. Constitution. . . . Social activism developed as a response to numerous problems that had been festering in the nation for many years, and protesters revolted in their own way to reform what they considered was a corrupt system.”</p><p>“. . . When most people contemplate [the 1960s] they recall demonstrations and protests. . . . It would be difficult to find more significant issues than those the activists raised and confronted: equality or inequality, war or peace, . . . personal behavior versus community standards. Indeed, the protesters questioned the very nature and meaning of America.”</p><p><strong>Mary C. Brennan, <em>Turning Right in the Sixties</em>, 1995</strong></p><p>“During the 1960s, . . . conservatives methodically . . . became a dominant force in national politics by gaining control of the Republican Party. . . . The [New] Right evolved into a complex, organized, and effective political force that dominated the [Republican Party] by 1968 and eventually secured the election of a staunch conservative as president in 1980.</p><p>“Beginning in the 1960s . . . , a one-dimensional view of the 1960s as a decade of radical movements drew the focus away from other important developments during that time. . . . Feeling isolated from mainstream society and ignored by the press and politicians, conservative Americans from different economic, educational, and social backgrounds resolved to make their voices heard by their party, their elected officials, and their country.”</p>',
    question: "Answer parts (a)-(c) using the excerpts above.",
    blanks: [
      {
        id: 1,
        prompt:
          "a) Identify ONE major difference between Anderson’s and Brennan’s interpretations.",
        helper:
          "用 T-E-A 三句：T 陈述差异，E 取自材料，A 点出“变化来源”分歧。",
        answer:
          "Anderson emphasizes left-leaning protest activism, while Brennan emphasizes conservative activism.",
        options: [
          "liberal protest activism",
          "conservative activism",
          "economic policy shifts",
          "foreign policy debates",
          "debates over change sources",
        ],
        matchSentenceParts: [
          "Topic: Anderson focuses on ",
          "; Brennan emphasizes ",
          ". Analysis: This contrast shows ",
          ".",
        ],
        matchAnswers: [
          "liberal protest activism",
          "conservative activism",
          "debates over change sources",
        ],
      },
      {
        id: 2,
        prompt: "b) Provide ONE development (1945–1980) supporting Anderson’s argument.",
        helper:
          "用 T-E-A：T 概括哪类抗议，E 举例具体事件，A 解释如何推动变革。",
        answer:
          "Martin Luther King Jr. led nonviolent protests that reshaped national attitudes toward civil rights.",
        options: [
          "Civil Rights Movement protests",
          "March on Washington",
          "showed activism reshaping policy",
          "Vietnam War draft resistance",
          "Black Power activism",
          "Women’s liberation marches",
        ],
        matchSentenceParts: [
          "Topic: ",
          " Evidence: ",
          ". Analysis: ",
          ".",
        ],
        matchAnswers: [
          "Civil Rights Movement protests",
          "March on Washington",
          "showed activism reshaping policy",
        ],
      },
      {
        id: 3,
        prompt:
          "c) Provide ONE development (1945–1980) supporting Brennan’s argument.",
        helper:
          "用 T-E-A：T 指出保守动员，E 举例事件/人物，A 说明如何改变政治。",
        answer:
          "The rise of the New Right reflected conservative activism challenging liberal reforms.",
        options: [
          "New Right grassroots mobilization",
          "Goldwater 1964 campaign",
          "conservative activism reshaped GOP",
          "Religious Right mobilization",
          "Tax revolt / anti–federal power",
        ],
        matchSentenceParts: [
          "Topic: ",
          " Evidence: ",
          ". Analysis: ",
          ".",
        ],
        matchAnswers: [
          "New Right grassroots mobilization",
          "Goldwater 1964 campaign",
          "conservative activism reshaped GOP",
        ],
      },
    ],
  },
  "2024-set2-saq2": {
    id: "2024-set2-saq2",
    releaseId: "2024-set2-saq2",
    unit: "Unit 4",
    era: "1800–1877",
    difficulty: "intermediate",
    sourceLabel: "2024 APUSH Set 2 · SAQ 2",
    sourceMeta: "Primary Source · Temperance (1874)",
    sourceHtml:
      '<figure style="text-align:center;"><img src="/images/temperance_1874.png" alt="Temperance illustration, 1874" style="max-width:100%; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.12);" /><figcaption style="margin-top:8px; font-size:12px; color:#6b7280;">Source: “Woman’s Holy War: Grand Charge on the Enemy’s Works,” illustration, 1874. Courtesy of the Library of Congress.</figcaption></figure><p>This 1874 temperance image depicts a woman urging moral reform, reflecting religious and social reform values.</p>',
    question: "Answer parts (a)-(c).",
    blanks: [
      {
        id: 1,
        prompt: "a) Identify ONE historical context explaining the creation of the image.",
        helper: "T-E-A：T 点历史背景，E 指向运动/浪潮，A 说明如何促成图像。",
        answer:
          "The Second Great Awakening promoted moral reform and inspired temperance activism.",
        options: [
          "Second Great Awakening",
          "Age of Reform",
          "Rising urban alcohol concerns",
          "Women-led moral reform",
          "religious fervor drove reform",
        ],
        matchSentenceParts: [
          "Topic: The image arose during the ",
          ", when temperance gained steam. Evidence: ",
          ". Analysis: ",
          ".",
        ],
        matchAnswers: [
          "Second Great Awakening",
          "Women-led moral reform",
          "religious fervor drove reform",
        ],
      },
      {
        id: 2,
        prompt:
          "b) Explain ONE continuity in reform ideas from 1800 to 1874 reflected in the image.",
        helper: "T-E-A：T 讲延续的观念，E 给出图像元素或运动，A 点出延续性。",
        answer:
          "Religious-based moral reform continued from the Second Great Awakening through the 1870s.",
        options: [
          "Religious-based moral reform",
          "Women as moral guardians",
          "Community sobriety campaigns",
          "Anti-alcohol preaching",
          "continuity from early 1800s to 1870s",
        ],
        matchSentenceParts: [
          "Topic: The image reflects continued reliance on ",
          " to drive reform. Evidence: ",
          ". Analysis: ",
          ".",
        ],
        matchAnswers: [
          "Religious-based moral reform",
          "Women as moral guardians",
          "continuity from early 1800s to 1870s",
        ],
      },
      {
        id: 3,
        prompt: "c) Explain ONE belief about reform that continued from 1875 to 1940.",
        helper: "T-E-A：T 陈述持续信念，E 举例后续发展，A 说明影响。",
        answer:
          "The temperance movement eventually culminated in Prohibition with the 18th Amendment.",
        options: [
          "Temperance leading to Prohibition",
          "Progressive Era women reformers",
          "Belief alcohol harmed society",
          "Moral uplift via law",
          "persistence into 20th century",
        ],
        matchSentenceParts: [
          "Topic: The belief that ",
          " continued. Evidence: ",
          ". Analysis: ",
          ".",
        ],
        matchAnswers: [
          "Belief alcohol harmed society",
          "Temperance leading to Prohibition",
          "persistence into 20th century",
        ],
      },
    ],
  },
  "2024-set2-saq3": {
    id: "2024-set2-saq3",
    releaseId: "2024-set2-saq3",
    unit: "Unit 3 / 4",
    era: "1783–1860",
    difficulty: "intermediate",
    sourceLabel: "2024 APUSH Set 2 · SAQ 3",
    sourceMeta: "No Stimulus · Early Republic",
    sourceHtml: "",
    question: "Answer parts (a)-(c).",
    blanks: [
      {
        id: 1,
        prompt: "a) Describe ONE U.S. government policy from 1783 to 1840.",
        answer:
          "The Northwest Ordinance of 1787 created a system for admitting new states.",
        options: [
          "Northwest Ordinance",
          "Hamilton’s financial plan",
          "Louisiana Purchase",
          "Indian Removal policy",
          "orderly state admission",
          "set precedent for expansion",
        ],
        matchSentenceParts: [
          "Topic: One policy was the ",
          ". Evidence: It provided ",
          ". Analysis: This ",
          ".",
        ],
        matchAnswers: [
          "Northwest Ordinance",
          "orderly state admission",
          "set precedent for expansion",
        ],
      },
      {
        id: 2,
        prompt:
          "b) Explain ONE similarity or difference in how two groups responded to political change.",
        answer:
          "The Democratic-Republicans and Democrats both resisted a strong centralized federal government.",
        options: [
          "resisted strong federal power",
          "favored centralized power",
          "backed protective tariffs",
          "expanded voting rights",
          "shared skepticism of centralization",
        ],
        matchSentenceParts: [
          "Topic: Both groups ",
          ". Evidence: They shared ",
          ". Analysis: This shows ",
          ".",
        ],
        matchAnswers: [
          "resisted strong federal power",
          "shared skepticism of centralization",
          "political change responses aligned",
        ],
      },
      {
        id: 3,
        prompt:
          "c) Explain ONE development (1840–1860) that contributed to sectional divisions.",
        answer: "The Compromise of 1850 increased sectional tensions over slavery.",
        options: [
          "Compromise of 1850",
          "Kansas-Nebraska Act",
          "Fugitive Slave Act enforcement",
          "Dred Scott decision",
          "deepened sectional tensions",
        ],
        matchSentenceParts: [
          "Topic: Sectional tensions deepened after the ",
          ". Evidence: Measures like ",
          ". Analysis: These ",
          ".",
        ],
        matchAnswers: [
          "Compromise of 1850",
          "Fugitive Slave Act enforcement",
          "deepened sectional tensions",
        ],
      },
    ],
  },
  "2024-set2-saq4": {
    id: "2024-set2-saq4",
    releaseId: "2024-set2-saq4",
    unit: "Unit 6 / 7",
    era: "1865–1940",
    difficulty: "intermediate",
    sourceLabel: "2024 APUSH Set 2 · SAQ 4",
    sourceMeta: "No Stimulus · Gilded Age & Progressive Era",
    sourceHtml: "",
    question: "Answer parts (a)-(c).",
    blanks: [
      {
        id: 1,
        prompt: "a) Describe ONE economic development from 1865 to 1900.",
        answer:
          "The rise of corporate trusts centralized economic power in major industries.",
        options: [
          "rise of corporate trusts",
          "railroad expansion",
          "vertical integration",
          "national capital markets",
          "concentrated industrial power",
        ],
        matchSentenceParts: [
          "Topic: One development was the ",
          ". Evidence: It created ",
          ". Analysis: This ",
          ".",
        ],
        matchAnswers: [
          "rise of corporate trusts",
          "concentrated industrial power",
          "centralized economic power",
        ],
      },
      {
        id: 2,
        prompt:
          "b) Explain ONE similarity or difference in how two groups responded to economic change.",
        answer:
          "Labor unions sought better working conditions while industrial capitalists defended laissez-faire policies.",
        options: [
          "labor unions sought protections",
          "capitalists defended laissez-faire",
          "farmers pushed regulation",
          "Progressives demanded reform",
          "competing responses to industrialization",
        ],
        matchSentenceParts: [
          "Topic: Labor unions ",
          ". Evidence: Capitalists ",
          ". Analysis: These ",
          ".",
        ],
        matchAnswers: [
          "labor unions sought protections",
          "capitalists defended laissez-faire",
          "competing responses to industrialization",
        ],
      },
      {
        id: 3,
        prompt:
          "c) Explain ONE way 1900–1940 developments increased government involvement in the economy.",
        answer: "The Great Depression led to New Deal programs expanding federal regulation.",
        options: [
          "New Deal federal programs",
          "banking regulation expansion",
          "public works spending",
          "social welfare safety net",
          "expanded government role",
        ],
        matchSentenceParts: [
          "Topic: Government involvement grew through ",
          ". Evidence: Measures like ",
          ". Analysis: These steps ",
          ".",
        ],
        matchAnswers: [
          "New Deal federal programs",
          "banking regulation expansion",
          "expanded government role",
        ],
      },
    ],
  },
  "2025-set2-saq1": {
    id: "mlk-1963",
    releaseId: "2025-set2-saq1",
    unit: "Unit 8 · Cold War & Civil Rights",
    era: "1940s-1960s",
    difficulty: "intro",
    sourceLabel: "Source · March on Washington Address",
    sourceMeta: "Martin Luther King Jr., “I Have a Dream,” August 1963",
    sourceHtml:
      "<p>Now is the time to make justice a reality for all of God's children. It would be fatal for the nation to overlook the urgency of the moment. The whirlwinds of revolt will continue to shake the foundations of our nation until the bright day of justice emerges.</p>",
    question:
      "Use the three-sentence SAQ frame (Development → Evidence → Analysis) to explain what the excerpt reveals about the civil rights movement.",
    blanks: [
      {
        id: 1,
        prompt: "T · One development mentioned is",
        helper: "Identify what King is urging the nation to recognize.",
        options: [
          "growing",
          "movement",
          "declining",
          "compromise",
          "federal",
          "Congress",
        ],
        answer: "the growing urgency of the civil rights struggle",
        matchSentenceParts: [
          "One development mentioned is the ",
          " urgency of the civil rights ",
          ".",
        ],
        matchAnswers: ["growing", "movement"],
      },
      {
        id: 2,
        prompt: "E · For example",
        helper: "Cite a specific tactic or campaign from the movement.",
        options: [
          "nonviolent protests",
          "March on Washington",
          "Free Speech League",
          "sit-ins",
          "Harlem Renaissance",
        ],
        answer: "mass nonviolent protests such as the March on Washington",
        matchSentenceParts: [
          "For example, mass ",
          " such as the ",
          " pressured national leaders to respond.",
        ],
        matchAnswers: ["nonviolent protests", "March on Washington"],
      },
      {
        id: 3,
        prompt: "A · This reflects",
        helper: "Explain the broader trend shown by the excerpt.",
        options: [
          "federal inaction",
          "immediate change",
          "grassroots decline",
          "formal segregation",
          "media silence",
        ],
        answer:
          "how federal inaction pushed activists to demand immediate change",
        matchSentenceParts: [
          "This reflects how continued ",
          " pushed activists to demand ",
          ".",
        ],
        matchAnswers: ["federal inaction", "immediate change"],
      },
    ],
  },
};

export type SAQReleaseStatus = "available" | "upcoming";

export interface SAQReleaseCatalogItem {
  id: SAQReleaseId;
  title: string;
  description: string;
  status: SAQReleaseStatus;
}

export interface SAQReleaseCatalogSet {
  id: `set${1 | 2}`;
  title: string;
  subtitle: string;
  statusTag: string;
  saqs: SAQReleaseCatalogItem[];
}

export interface SAQReleaseCatalogYear {
  year: number;
  label: string;
  highlight: string;
  sets: SAQReleaseCatalogSet[];
}

const createComingSoonSAQs = (
  year: number,
  set: 1 | 2
): SAQReleaseCatalogItem[] =>
  [1, 2, 3].map((index) => ({
    id: `${year}-set${set}-saq${index}` as SAQReleaseId,
    title: `SAQ ${index}`,
    description: "敬请期待 · 逐题更新历年真题结构化模版",
    status: "upcoming" as SAQReleaseStatus,
  }));

export const saqReleaseCatalog: SAQReleaseCatalogYear[] = [
  {
    year: 2025,
    label: "2025 真题",
    highlight: "官方 Rubric + Set 2 逐题上线中",
    sets: [
      {
        id: "set1",
        title: "Set 1 · Warm-up",
        subtitle: "专题：政治转型 & 经济结构",
        statusTag: "待上线",
        saqs: createComingSoonSAQs(2025, 1),
      },
      {
        id: "set2",
        title: "Set 2 · Official Practice",
        subtitle: "专题：Civil Rights & Policy",
        statusTag: "部分上线",
        saqs: [
          {
            id: "2025-set2-saq1",
            title: "SAQ 1 · Civil Rights Source Analysis",
            description: "Martin Luther King Jr. 演讲 + 三句式作答模板",
            status: "available",
          },
          {
            id: "2025-set2-saq2",
            title: "SAQ 2 · Reconstruction Labor Politics",
            description: "Freedmen's Bureau 原始材料 · 待上线",
            status: "upcoming",
          },
          {
            id: "2025-set2-saq3",
            title: "SAQ 3 · Cold War Turning Points",
            description: "Truman Doctrine 外交定位 · 待上线",
            status: "upcoming",
          },
        ],
      },
    ],
  },
  {
    year: 2024,
    label: "2024 真题",
    highlight: "Set 1 - Reconstruction, Set 2 - Industrialization",
    sets: [
      {
        id: "set1",
        title: "Set 1 · Reconstruction Focus",
        subtitle: "专题：宪法修正案 & 公民权",
        statusTag: "待上线",
        saqs: createComingSoonSAQs(2024, 1),
      },
      {
        id: "set2",
        title: "Set 2 · Gilded Age / Progressivism",
        subtitle: "专题：劳工 & 城市化",
        statusTag: "待上线",
        saqs: [
          {
            id: "2024-set2-saq1",
            title: "SAQ 1 Â· Secondary Source Comparison",
            description: "1960s activism interpretive contrast",
            status: "available",
          },
          {
            id: "2024-set2-saq2",
            title: "SAQ 2 Â· Temperance Image",
            description: "1874 reform continuity stimulus",
            status: "available",
          },
          {
            id: "2024-set2-saq3",
            title: "SAQ 3 Â· Early Republic Politics",
            description: "1783–1860 political change",
            status: "available",
          },
          {
            id: "2024-set2-saq4",
            title: "SAQ 4 Â· Economy & Government",
            description: "1865–1940 economic interventions",
            status: "available",
          },
        ],
      },
    ],
  },
  {
    year: 2023,
    label: "2023 真题",
    highlight: "Set 1 - Early Republic, Set 2 - Cold War",
    sets: [
      {
        id: "set1",
        title: "Set 1 · Early Republic",
        subtitle: "专题：建国宪政 & 政党演变",
        statusTag: "待上线",
        saqs: createComingSoonSAQs(2023, 1),
      },
      {
        id: "set2",
        title: "Set 2 · Cold War Origins",
        subtitle: "专题：遏制战略 & 国内政治",
        statusTag: "待上线",
        saqs: createComingSoonSAQs(2023, 2),
      },
    ],
  },
];
