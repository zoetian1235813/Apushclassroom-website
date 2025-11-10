export type SAQInteractiveQuestionType = "stimulus" | "noStimulus";

export interface SAQInteractiveQuestion {
  id: string;
  title: string;
  era: string;
  type: SAQInteractiveQuestionType;
  stimulus?: string;
  stimulusText?: string;
  promptA: string;
  optionsA: string[];
  correctA: string;
  promptB: string;
  optionsB: string[];
  correctB: string;
  promptC: string;
  optionsC: string[];
  correctC: string;
}

export const saqInteractiveBank: SAQInteractiveQuestion[] = [
  {
    id: "set1-q1",
    title: "Colonial Self-Government and Imperial Wars",
    era: "1607-1765",
    type: "stimulus",
    stimulus: "Excerpt from the Albany Plan of Union, 1754",
    stimulusText:
      "<p>It is proposed that humble application be made for an Act of Parliament of Great Britain, by virtue of which one general government may be formed in America...</p>",
    promptA:
      "Thesis - Explain one colonial motivation behind considering a union in 1754.",
    optionsA: [
      "Colonists wanted coordinated defense against Native and French threats.",
      "New England merchants sought to abolish all British customs duties.",
      "Patriots attempted to declare full independence from Britain in 1754."
    ],
    correctA:
      "Colonists wanted coordinated defense against Native and French threats.",
    promptB:
      "Evidence - Identify one imperial event that heightened the need for intercolonial cooperation.",
    optionsB: [
      "Ongoing clashes of the French and Indian War on the frontier.",
      "The Embargo Act restricting Atlantic trade in 1807.",
      "The annexation of Texas following the Mexican-American War."
    ],
    correctB:
      "Ongoing clashes of the French and Indian War on the frontier.",
    promptC:
      "Analysis - Explain how British reactions to colonial cooperation after 1763 affected imperial relations.",
    optionsC: [
      "Britain tightened control through new taxes, aggravating colonial resistance.",
      "Parliament granted the colonies complete autonomy in taxation matters.",
      "The Crown encouraged colonial militias to seize western lands from Spain."
    ],
    correctC:
      "Britain tightened control through new taxes, aggravating colonial resistance."
  },
  {
    id: "set1-q3",
    title: "Colonial and Revolutionary Politics",
    era: "1607-1783",
    type: "noStimulus",
    promptA:
      "Thesis - Briefly describe one political development in British North America from 1607-1753.",
    optionsA: [
      "Colonial assemblies developed self-governing institutions.",
      "The Monroe Doctrine limited British influence in the Americas.",
      "The Great Awakening unified Native American tribes."
    ],
    correctA: "Colonial assemblies developed self-governing institutions.",
    promptB:
      "Evidence - Briefly describe one effect of the Seven Years' War from 1754-1765.",
    optionsB: [
      "Britain taxed the colonies to pay for war debts.",
      "The Stamp Act expanded colonial representation.",
      "France gained control of the Mississippi Valley."
    ],
    correctB: "Britain taxed the colonies to pay for war debts.",
    promptC:
      "Analysis - Explain how one group responded to debates about colonists' rights from 1765-1783.",
    optionsC: [
      "Patriots organized protests rejecting British taxation policies.",
      "Loyalists supported the colonial rebellion against Parliament.",
      "The British Parliament granted immediate independence."
    ],
    correctC: "Patriots organized protests rejecting British taxation policies."
  },
  {
    id: "set2-q1",
    title: "Reconstruction and Civil War Transformations",
    era: "1861-1877",
    type: "stimulus",
    stimulus: "Freedmen's Bureau Circular, 1866",
    stimulusText:
      "<p>Every person of color who is industrious and respects the law shall receive the equal protection of the Bureau in securing labor contracts and education.</p>",
    promptA:
      "Thesis - Identify one federal goal during Reconstruction highlighted in the excerpt.",
    optionsA: [
      "Protect formerly enslaved people through labor oversight and schools.",
      "Restore slavery in compliant Southern states to restart production.",
      "Promote western railroad subsidies as the sole national priority."
    ],
    correctA:
      "Protect formerly enslaved people through labor oversight and schools.",
    promptB:
      "Evidence - Cite one policy or amendment that aligned with this federal goal.",
    optionsB: [
      "The Civil Rights Act of 1866 affirming citizenship.",
      "The Kansas-Nebraska Act allowing popular sovereignty.",
      "The Indian Removal Act relocating eastern tribes."
    ],
    correctB: "The Civil Rights Act of 1866 affirming citizenship.",
    promptC:
      "Analysis - Explain one reaction within the South that challenged these Reconstruction efforts.",
    optionsC: [
      "The rise of Black Codes and later Jim Crow statutes limiting freedom.",
      "Southern acceptance of integrated state governments without resistance.",
      "Immediate enforcement of universal male suffrage by ex-Confederates."
    ],
    correctC:
      "The rise of Black Codes and later Jim Crow statutes limiting freedom."
  },
  {
    id: "set3-q2",
    title: "Cold War Turning Points",
    era: "1945-1991",
    type: "noStimulus",
    promptA:
      "Thesis - State one guiding objective of United States foreign policy in the early Cold War.",
    optionsA: [
      "Contain the spread of Soviet-style communism in strategic regions.",
      "Rebuild isolationism by withdrawing from NATO alliances.",
      "Support European colonial empires in retaking Southeast Asia."
    ],
    correctA:
      "Contain the spread of Soviet-style communism in strategic regions.",
    promptB:
      "Evidence - Identify one event between 1947 and 1962 that demonstrates this objective.",
    optionsB: [
      "Implementing the Marshall Plan to stabilize European economies.",
      "Accepting the Soviet blockade of Berlin without response.",
      "Abandoning South Korea during the Korean War."
    ],
    correctB:
      "Implementing the Marshall Plan to stabilize European economies.",
    promptC:
      "Analysis - Explain how Cold War containment influenced domestic debates in the United States.",
    optionsC: [
      "McCarthy-era investigations fueled anxieties about loyalty at home.",
      "Federal courts dismantled all anti-communist loyalty oaths immediately.",
      "Congress ended military spending in favor of social welfare only."
    ],
    correctC:
      "McCarthy-era investigations fueled anxieties about loyalty at home."
  }
];
