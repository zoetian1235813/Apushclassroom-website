import { DayPlan, CheckInTask } from "../types";
export type DayType = "study" | "writing" | "unit-test" | "rest" | "mock-exam";

interface RawDay { date: string; t: DayType; u: number; top: string; sub?: string; desc: string; col: string; }

function genTasks(d: RawDay): CheckInTask[] {
  const id = d.date.replace("-","");
  switch(d.t) {
    case "study": return [
                { id: id+"-v", type: "video", title: d.sub ? d.sub+" AP Daily" : "AP Daily: "+d.top, description: d.desc, estimatedMinutes: 15, xpReward: 20, videoUrl: topicVideoUrls[d.date] },
      { id: id+"-e", type: "exercise", title: "极简练习："+d.top, description: "Duolingo 式填空/匹配练习", estimatedMinutes: 5, xpReward: 15 },
      { id: id+"-q", type: "quiz", title: "每日测验", description: "3-5 道选择题", estimatedMinutes: 8, xpReward: 25 },
    ];
    case "writing": return [
      { id: id+"-w1", type: "writing", title: "写作技巧讲解", description: "学习写作技巧", estimatedMinutes: 12, xpReward: 20 },
      { id: id+"-w2", type: "writing", title: "写作实战练习", description: "完成真实 AP 写作题目", estimatedMinutes: 15, xpReward: 30 },
    ];
    case "unit-test": case "mock-exam": return [
      { id: id+"-t", type: "test", title: "单元测试", description: "测试学习成果", estimatedMinutes: 30, xpReward: 50, isExternal: true, externalUrl: "/" },
    ];
    case "rest": return [
      { id: id+"-f", type: "fun-fact", title: "趣味历史", description: "轻松了解历史趣闻", estimatedMinutes: 3, xpReward: 5 },
    ];
  }
}

function genDay(r: RawDay): DayPlan {
  return { date: r.date, dayType: r.t, unitId: r.u, unitTitle: "", topicTitle: r.top, topicSubtitle: r.sub, description: r.desc, color: r.col, tasks: genTasks(r) };
}

const topicVideoUrls: Record<string, string> = {
  "07-01": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=1",
  "07-02": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=4",
  "07-03": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=7",
  "07-04": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=1",
  "07-07": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=13",
  "07-08": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=16",
  "07-09": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=19",
  "07-10": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=21",
  "07-11": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=24",
  "07-15": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=25",
  "07-16": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=28",
  "07-17": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=34",
  "07-18": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=39",
  "07-20": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=44",
  "07-21": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=50",
  "07-22": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=25",
  "07-24": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=25",
  "07-27": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=58",
  "07-28": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=62",
  "07-29": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=64",
  "07-30": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=64",
  "08-01": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=66",
  "08-02": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=71",
  "08-03": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=75",
  "08-04": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=77",
  "08-05": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=58",
  "08-08": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=58",
  "08-10": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=86",
  "08-11": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=89",
  "08-12": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=91",
  "08-13": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=93",
  "08-15": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=94",
  "08-17": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=95",
  "08-18": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=96",
  "08-19": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=95",
  "08-20": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=97",
  "08-22": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=99",
  "08-23": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=86",
  "08-25": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=86",
  "08-27": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=86",
  "08-30": "https://www.bilibili.com/video/BV1bNhVzLETH/?p=86",
};
const raw: RawDay[] = [  { date: "07-01", t: "study", u: 1, top: "Native Americans & European Exploration", sub: "Topic 1.1-1.2", desc: "学习美洲原住民社会结构及欧洲早期探险的 3G 动机", col: "from-red-400 to-orange-400" },
  { date: "07-02", t: "study", u: 1, top: "Columbian Exchange", sub: "Topic 1.3", desc: "理解哥伦布大交换对欧、美、非三洲的双向冲击", col: "from-red-400 to-orange-400" },
  { date: "07-03", t: "study", u: 1, top: "Labor Systems & Cultural Interactions", sub: "Topic 1.4-1.5", desc: "学习 Encomienda 制度、劳动力转型及文化冲突", col: "from-red-400 to-orange-400" },
  { date: "07-04", t: "study", u: 1, top: "Unit 1 阶段复习", sub: "Progress Check", desc: "全面回顾 Unit 1 核心概念，建立知识网络", col: "from-red-400 to-orange-400" },
  { date: "07-05", t: "writing", u: 1, top: "写作特训：SAQ 入门", desc: "学习 SAQ 答题公式 (ACE 策略)，完成真实 SAQ 题目", col: "from-red-400 to-orange-400" },
  { date: "07-06", t: "unit-test", u: 1, top: "Unit 1 单元测试", desc: "前往主站完成 Unit 1 完整测试，检验学习成果", col: "from-red-400 to-orange-400" },
  { date: "07-07", t: "study", u: 2, top: "13 Colonies & European Colonization", sub: "Topic 2.1-2.2", desc: "对比北美三大殖民区域的地理与经济差异", col: "from-blue-400 to-cyan-400" },
  { date: "07-08", t: "study", u: 2, top: "Plymouth vs Chesapeake & Great Awakening", sub: "Topic 2.3-2.4", desc: "对比清教徒社会与烟草庄园经济", col: "from-blue-400 to-cyan-400" },
  { date: "07-09", t: "study", u: 2, top: "Mercantilism & Transatlantic Trade", sub: "Topic 2.5", desc: "理解重商主义运作机制与航海条例的影响", col: "from-blue-400 to-cyan-400" },
  { date: "07-10", t: "study", u: 2, top: "Slavery & Indentured Servitude", sub: "Topic 2.6-2.7", desc: "学习契约奴役衰落与奴隶制在殖民地的确立", col: "from-blue-400 to-cyan-400" },
  { date: "07-11", t: "study", u: 2, top: "Colonial Government & Unit 2 Review", sub: "Topic 2.8-2.9", desc: "殖民政府结构与 Unit 2 知识体系回顾", col: "from-blue-400 to-cyan-400" },
  { date: "07-12", t: "writing", u: 2, top: "写作特训：DBQ 分析入门", desc: "学习 HAPPY 文档分析法", col: "from-blue-400 to-cyan-400" },
  { date: "07-13", t: "rest", u: 2, top: "休息日", desc: "放松一下，了解殖民时期的有趣冷知识", col: "from-blue-400 to-cyan-400" },
  { date: "07-14", t: "unit-test", u: 2, top: "Unit 2 单元测试", desc: "前往主站完成 Unit 2 完整测试", col: "from-blue-400 to-cyan-400" },
  { date: "07-15", t: "study", u: 3, top: "Seven Years' War & Taxation", sub: "Topic 3.1-3.2", desc: "七年战争如何改变英美关系以及新的税收政策引发的殖民地反抗", col: "from-purple-400 to-pink-400" },
  { date: "07-16", t: "study", u: 3, top: "Philosophical Foundations & The Revolution", sub: "Topic 3.3-3.4", desc: "启蒙思想影响、Common Sense 与独立宣言", col: "from-purple-400 to-pink-400" },
  { date: "07-17", t: "study", u: 3, top: "Revolutionary War & Articles of Confederation", sub: "Topic 3.5-3.6", desc: "独立战争关键战役与邦联条例的缺陷", col: "from-purple-400 to-pink-400" },
  { date: "07-18", t: "study", u: 3, top: "Constitutional Convention & The Constitution", sub: "Topic 3.7-3.8", desc: "制宪会议的关键妥协与宪法框架", col: "from-purple-400 to-pink-400" },
  { date: "07-19", t: "writing", u: 3, top: "写作特训：LEQ 论证策略", desc: "学习 LEQ 论证框架 (Causation/Comparison/CCOT)", col: "from-purple-400 to-pink-400" },
  { date: "07-20", t: "study", u: 3, top: "Shaping a New Republic", sub: "Topic 3.9-3.10", desc: "新共和国建设与联邦党/反联邦党大辩论", col: "from-purple-400 to-pink-400" },
  { date: "07-21", t: "study", u: 3, top: "Farewell Address & Early Politics", sub: "Topic 3.10-3.11", desc: "告别演说的核心原则与 Alien & Sedition Acts 冲突", col: "from-purple-400 to-pink-400" },
  { date: "07-22", t: "study", u: 3, top: "Unit 3 阶段复习", desc: "全面回顾 Unit 3 核心概念", col: "from-purple-400 to-pink-400" },
  { date: "07-23", t: "rest", u: 3, top: "休息日", desc: "休息一下，回顾建国初期的有趣故事", col: "from-purple-400 to-pink-400" },
  { date: "07-24", t: "study", u: 3, top: "难点扫雷：Unit 3 高频错题", desc: "针对 Unit 3 常见错误点进行专项突破", col: "from-purple-400 to-pink-400" },
  { date: "07-25", t: "writing", u: 3, top: "写作特训：SAQ 进阶", desc: "SAQ 第二部分 (B/C) 的深入练习", col: "from-purple-400 to-pink-400" },
  { date: "07-26", t: "unit-test", u: 3, top: "Unit 3 单元测试", desc: "前往主站完成 Unit 3 完整测试", col: "from-purple-400 to-pink-400" },
  { date: "07-27", t: "study", u: 4, top: "Jefferson & Marbury v. Madison", sub: "Topic 4.1-4.2", desc: "杰斐逊民主理念与马伯里诉麦迪逊案司法审查", col: "from-green-400 to-emerald-400" },
  { date: "07-28", t: "study", u: 4, top: "War of 1812 & Era of Good Feelings", sub: "Topic 4.3", desc: "1812 年战争原因、过程与战后民族主义高涨", col: "from-green-400 to-emerald-400" },
  { date: "07-29", t: "study", u: 4, top: "Missouri Compromise & Territorial Expansion", sub: "Topic 4.4", desc: "密苏里妥协与早期奴隶制界线划分", col: "from-green-400 to-emerald-400" },
  { date: "07-30", t: "study", u: 4, top: "Monroe Doctrine & Early Foreign Policy", desc: "门罗主义的外交核心理念及其对拉美影响", col: "from-green-400 to-emerald-400" },
  { date: "07-31", t: "writing", u: 4, top: "写作特训：DBQ 文档分析", desc: "针对早期共和国时期的 DBQ 文档分析训练", col: "from-green-400 to-emerald-400" },
  { date: "08-01", t: "study", u: 4, top: "Market Revolution: Transportation & Industry", sub: "Topic 4.5-4.6", desc: "市场革命：运河、铁路与交通网络的快速发展", col: "from-green-400 to-emerald-400" },
  { date: "08-02", t: "study", u: 4, top: "Jacksonian Democracy & Trail of Tears", sub: "Topic 4.7-4.8", desc: "杰克逊民主的扩张与原住民强制西迁", col: "from-green-400 to-emerald-400" },
  { date: "08-03", t: "study", u: 4, top: "2nd Great Awakening & Reform Movements", sub: "Topic 4.9-4.10", desc: "第二次大觉醒运动与各类社会改革运动", col: "from-green-400 to-emerald-400" },
  { date: "08-04", t: "study", u: 4, top: "Abolition & Seneca Falls", sub: "Topic 4.11-4.12", desc: "废奴运动崛起与塞内卡福尔斯女权宣言", col: "from-green-400 to-emerald-400" },
  { date: "08-05", t: "study", u: 4, top: "Unit 4 阶段复习", desc: "全面回顾 Unit 4 核心概念", col: "from-green-400 to-emerald-400" },
  { date: "08-06", t: "rest", u: 4, top: "休息日", desc: "放松一下，看看 19 世纪上半叶的有趣故事", col: "from-green-400 to-emerald-400" },
  { date: "08-07", t: "writing", u: 4, top: "写作特训：CCOT 论文", desc: "学习 Continuity and Change Over Time 论文写作", col: "from-green-400 to-emerald-400" },
  { date: "08-08", t: "study", u: 4, top: "难点扫雷：Unit 4 高频错题", desc: "针对 Unit 4 常见混淆点进行突破", col: "from-green-400 to-emerald-400" },
  { date: "08-09", t: "unit-test", u: 4, top: "Unit 4 单元测试", desc: "前往主站完成 Unit 4 完整测试", col: "from-green-400 to-emerald-400" },
  { date: "08-10", t: "study", u: 5, top: "Manifest Destiny & Mexican-American War", sub: "Topic 5.1-5.2", desc: "昭昭天命思想狂热与美墨战争的起因和结果", col: "from-amber-400 to-yellow-400" },
  { date: "08-11", t: "study", u: 5, top: "Compromise of 1850 & Fugitive Slave Act", sub: "Topic 5.3-5.4", desc: "1850 年妥协细则与逃奴法对北方舆论的冲击", col: "from-amber-400 to-yellow-400" },
  { date: "08-12", t: "study", u: 5, top: "Kansas-Nebraska Act & Bleeding Kansas", sub: "Topic 5.5", desc: "堪萨斯-内布拉斯加法案与流血的堪萨斯", col: "from-amber-400 to-yellow-400" },
  { date: "08-13", t: "study", u: 5, top: "Dred Scott & Lincoln-Douglas Debates", sub: "Topic 5.6", desc: "Dred Scott 判决与林肯-道格拉斯辩论", col: "from-amber-400 to-yellow-400" },
  { date: "08-14", t: "writing", u: 5, top: "写作特训：Causation LEQ", desc: "学习因果分析 LEQ，分析内战爆发原因", col: "from-amber-400 to-yellow-400" },
  { date: "08-15", t: "study", u: 5, top: "John Brown, Election of 1860 & Secession", sub: "Topic 5.7", desc: "约翰布朗袭击、1860 年大选与南方各州退出联邦", col: "from-amber-400 to-yellow-400" },
  { date: "08-16", t: "rest", u: 5, top: "休息日", desc: "休息一下，为内战学习充充电", col: "from-amber-400 to-yellow-400" },
  { date: "08-17", t: "study", u: 5, top: "Civil War: Military Conflict", sub: "Topic 5.8", desc: "南北战争军事冲突：战略、战役与关键转折", col: "from-amber-400 to-yellow-400" },
  { date: "08-18", t: "study", u: 5, top: "Emancipation Proclamation & Gov Policies", sub: "Topic 5.9", desc: "解放宣言与内战期间的政府政策", col: "from-amber-400 to-yellow-400" },
  { date: "08-19", t: "study", u: 5, top: "Sherman's March & End of War", desc: "谢尔曼向大海进军与内战结束", col: "from-amber-400 to-yellow-400" },
  { date: "08-20", t: "study", u: 5, top: "Reconstruction: Plans & Amendments", sub: "Topic 5.10", desc: "战后重建三大修正案 (13/14/15) 及其特征", col: "from-amber-400 to-yellow-400" },
  { date: "08-21", t: "writing", u: 5, top: "写作特训：Comparison LEQ", desc: "对比重建时期的不同重建方案", col: "from-amber-400 to-yellow-400" },
  { date: "08-22", t: "study", u: 5, top: "Sharecropping, Jim Crow & Compromise 1877", sub: "Topic 5.11", desc: "分成佃农制、吉姆克劳法与 1877 年妥协", col: "from-amber-400 to-yellow-400" },
  { date: "08-23", t: "study", u: 5, top: "Unit 5 阶段复习", desc: "全面回顾 Unit 5 核心概念", col: "from-amber-400 to-yellow-400" },
  { date: "08-24", t: "rest", u: 5, top: "休息日", desc: "为最后冲刺做准备", col: "from-amber-400 to-yellow-400" },
  { date: "08-25", t: "study", u: 5, top: "难点扫雷：Unit 5 高频错题", desc: "针对 Unit 5 常见错误点进行专项突破", col: "from-amber-400 to-yellow-400" },
  { date: "08-26", t: "writing", u: 5, top: "写作特训：SAQ 综合实战", desc: "模拟真实考试 SAQ 部分", col: "from-amber-400 to-yellow-400" },
  { date: "08-27", t: "study", u: 5, top: "Unit 5 最终复习", desc: "最后一轮总复习，查漏补缺", col: "from-amber-400 to-yellow-400" },
  { date: "08-28", t: "unit-test", u: 5, top: "Unit 5 单元测试", desc: "前往主站完成 Unit 5 完整测试", col: "from-amber-400 to-yellow-400" },
  { date: "08-29", t: "mock-exam", u: 0, top: "暑期巅峰结营大模考", desc: "模拟完整 Unit 1-5 闭卷真题联测", col: "from-indigo-400 to-purple-400" },
  { date: "08-30", t: "study", u: 0, top: "模考分析与错题回顾", desc: "分析模考结果，打包暑期全部错题", col: "from-indigo-400 to-purple-400" },
  { date: "08-31", t: "rest", u: 0, top: "暑期通关！完美衔接秋季学期", desc: "恭喜完成暑期全部学习任务！", col: "from-indigo-400 to-purple-400" },
];

export const checkinPlan: DayPlan[] = raw.map(genDay);

export const unitColors: Record<number, string> = {
  1: "from-red-400 to-orange-400",
  2: "from-blue-400 to-cyan-400",
  3: "from-purple-400 to-pink-400",
  4: "from-green-400 to-emerald-400",
  5: "from-amber-400 to-yellow-400",
  0: "from-indigo-400 to-purple-400",
};

export const unitTitles: Record<number, string> = {
  1: "Unit 1: A New World Begins (1491-1607)",
  2: "Unit 2: Colonial Society (1607-1754)",
  3: "Unit 3: Revolution & Constitution (1754-1800)",
  4: "Unit 4: The Early Republic (1800-1848)",
  5: "Unit 5: Sectional Conflict (1844-1877)",
  0: "暑期总复习",
};

export const MONTHS = ["July 2026", "August 2026"];

export interface ExerciseData {
  question: string;
  answer: string;
  hint: string;
}
export interface QuizData {
  stimulus?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const sampleExercises: Record<string, ExerciseData[]> = {
  "0701-e": [
    { question: "Native Americans in the Southwest developed complex societies supported by the cultivation of ____.", answer: "maize", hint: "The primary crop of pre-Columbian agriculture (also known as corn)" },
    { question: "The ____ and Great Plains tribes developed mobile lifestyles due to the lack of natural resources.", answer: "Great Basin", hint: "The arid region between the Rocky Mountains and Sierra Nevada" },
    { question: "Pre-Columbian societies in the ____ developed mixed agricultural and hunter-gatherer economies, and formed alliances like the Iroquois Confederacy.", answer: "Northeast", hint: "Home to the League of Five Nations" }
  ],
  "0702-e": [
    { question: "The Columbian Exchange introduced ____ from Europe, which revolutionized Native American mobility and hunting on the Great Plains.", answer: "horses", hint: "European animal that changed Plains Indian warfare and hunting" },
    { question: "The most devastating disease brought by Europeans to the Americas was ____, which wiped out up to 90% of the native population.", answer: "smallpox", hint: "Highly infectious virus causing skin pustules and massive demographic collapse" },
    { question: "The influx of Spanish silver from the Americas helped fuel the transition from feudalism to ____ in Europe.", answer: "capitalism", hint: "An economic system based on private ownership, wage labor, and free markets" }
  ],
  "0703-e": [
    { question: "The ____ system allowed Spanish conquistadors to demand forced labor from Native Americans in exchange for Christianization.", answer: "encomienda", hint: "Spanish colonial labor grant system" },
    { question: "As the native population declined, Spanish colonists increasingly relied on enslaved ____ for plantation and mining labor.", answer: "Africans", hint: "Group targeted for forced labor via the Middle Passage" },
    { question: "The ____ system was a strict racial hierarchy established by the Spanish to maintain social and political control in the colonies.", answer: "casta", hint: "Hierarchy based on racial purity (e.g., Mestizos, Peninsulares)" }
  ],
  "0704-e": [
    { question: "European exploration of the Americas was driven by three primary motives: ____, glory, and God.", answer: "gold", hint: "The economic motive representing wealth and resources" },
    { question: "In 1680, the ____ temporarily expelled Spanish colonizers from present-day New Mexico.", answer: "Pueblo Revolt", hint: "Native rebellion led by Popé that forced Spanish accommodation" },
    { question: "Spanish colonization was characterized by a high degree of ____ between Europeans, Natives, and Africans, creating a diverse mixed society.", answer: "intermarriage", hint: "Union or mixing between different ethnic groups" }
  ],
  "0707-e": [
    { question: "The ____ colonies were established primarily by Puritans seeking religious freedom, and their economy was based on small farms, logging, and fishing.", answer: "New England", hint: "Northern colonial region centered around Massachusetts Bay" },
    { question: "The ____ colonies were known for their religious tolerance and diverse populations, earning them the nickname 'breadbasket colonies.'", answer: "Middle", hint: "Regional group including Pennsylvania and New York" },
    { question: "The Southern colonies grew cash crops like tobacco and rice on large plantations, which relied heavily on ____ labor.", answer: "slave", hint: "Unfree labor system that replaced indentured servitude" }
  ],
  "0708-e": [
    { question: "The first permanent English settlement in North America was ____, founded in Virginia in 1607.", answer: "Jamestown", hint: "Named after King James I and funded by the Virginia Company" },
    { question: "In Plymouth, the Pilgrims signed the ____ in 1620, establishing a self-governing agreement based on majority rule.", answer: "Mayflower Compact", hint: "Document signed aboard a ship before landing" },
    { question: "The ____ was a series of religious revivals in the 1730s and 1740s that challenged traditional church authority and promoted spiritual equality.", answer: "Great Awakening", hint: "Spiritual revival featuring preachers like Jonathan Edwards" }
  ]
};

export const sampleQuizzes: Record<string, QuizData[]> = {
  "0701-q": [
    {
      stimulus: "“They should be good servants and intelligent, for I see that they very quickly say all that is said to them, and I believe that they would easily be made Christians, for it appeared to me that they had no creed.”\n— Christopher Columbus, Journal of the First Voyage, 1492",
      question: "The passage above best reflects which of the following European motives for colonization?",
      options: [
        "The desire to establish democratic institutions in the Americas",
        "The belief in racial and cultural equality with Native populations",
        "The combination of economic exploitation and religious conversion",
        "The hope to learn native agricultural techniques and land management"
      ],
      correctIndex: 2,
      explanation: "Columbus's journal highlights two core Spanish motives: acquiring labor and resources ('good servants') and spreading Catholicism ('made Christians')."
    },
    {
      question: "Which of the following crops was most influential in transitioning Native American tribes in the Southwest from nomadic to settled lifestyles?",
      options: [
        "Wheat",
        "Maize",
        "Tobacco",
        "Sugarcane"
      ],
      correctIndex: 1,
      explanation: "Maize (corn) cultivation spread from Mexico into the American Southwest, supporting economic development, settlement, advanced irrigation, and social diversification."
    },
    {
      question: "Before the arrival of Europeans, Great Plains and Great Basin tribes were characterized by:",
      options: [
        "Permanent large cities built of stone and plaster",
        "Mobile lifestyles focused on hunting and gathering",
        "Advanced maritime trade networks across the Atlantic",
        "Constitutional representative governments"
      ],
      correctIndex: 1,
      explanation: "Due to the aridity of the Great Basin and the grasslands of the Great Plains, tribes in these regions developed nomadic lifestyles following bison herds."
    }
  ],
  "0702-q": [
    {
      stimulus: "“The introduction of new food crops from the Americas, such as potatoes and maize, significantly improved the caloric intake and diet of the Old World population, leading to rapid demographic growth.”\n— Alfred Crosby, historian, The Columbian Exchange",
      question: "According to the passage, what was a major effect of the Columbian Exchange on Europe?",
      options: [
        "A decline in European urbanization and trade",
        "Population growth due to improved nutrition and crop yields",
        "A decrease in European agricultural productivity",
        "The complete collapse of the commercial sector due to inflation"
      ],
      correctIndex: 1,
      explanation: "The transfer of high-yield crops like potatoes and corn from the Americas to Europe led to better diets, supporting a massive population increase in the Old World."
    },
    {
      question: "What was the most significant demographic impact of the Columbian Exchange on the Americas?",
      options: [
        "The introduction of horses transformed Native economies",
        "European diseases caused massive population decline among Native populations",
        "New food crops improved nutrition and doubled the Native population",
        "Enslaved Africans replaced Native populations as the dominant group"
      ],
      correctIndex: 1,
      explanation: "The introduction of Old World pathogens (smallpox, measles) led to a massive demographic collapse of the Native population, estimated between 50% and 90%."
    },
    {
      question: "The shift in European commerce from localized feudal systems to global trade networks stimulated by American gold and silver is known as:",
      options: [
        "The Industrial Revolution",
        "The Price Revolution",
        "The Market Revolution",
        "The Agricultural Revolution"
      ],
      correctIndex: 1,
      explanation: "The massive influx of gold and silver from the Americas created high inflation (the Price Revolution) and helped lay the foundations for modern commercial capitalism."
    }
  ],
  "0703-q": [
    {
      stimulus: "“The Spaniards have no more consideration for the Indians than beasts... they have murdered and destroyed them, and harassed them with labor.”\n— Bartolomé de Las Casas, A Short Account of the Destruction of the Indies, 1552",
      question: "Las Casas's writings were primarily intended to:",
      options: [
        "Encourage the importation and enslavement of Africans",
        "Defend the encomienda system as a necessary civilizing measure",
        "Protest Spanish cruelty and advocate for Native American rights",
        "Promote Spanish conquest in Asia and the Pacific"
      ],
      correctIndex: 2,
      explanation: "Las Casas was a Spanish priest who passionately defended the humanity of Native Americans and lobbied the Spanish crown to end the abusive encomienda system."
    },
    {
      question: "The Spanish debate over the treatment of Native Americans, featuring Bartolomé de Las Casas and Juan Ginés de Sepúlveda, took place during the:",
      options: [
        "Pueblo Revolt",
        "Valladolid Debate",
        "Stono Rebellion",
        "First Great Awakening"
      ],
      correctIndex: 1,
      explanation: "The Valladolid Debate (1550-1551) discussed the rights of Native Americans, with Sepúlveda arguing they were 'natural slaves' and Las Casas arguing they were rational human beings."
    },
    {
      question: "Which of the following best describes the Casta system in Spanish America?",
      options: [
        "A system of democratic representation for all colonists",
        "A strict racial hierarchy based on parentage and place of birth",
        "A trade agreement between Spain and Portugal",
        "A religious tolerance policy for Protestants"
      ],
      correctIndex: 1,
      explanation: "The Casta system classified colonial populations based on race (e.g., Peninsulares, Creoles, Mestizos, Mulattoes) to enforce social hierarchy and power."
    }
  ],
  "0704-q": [
    {
      stimulus: "“The Pueblo people successfully coordinated an uprising under the leader Popé in 1680, driving the Spanish out of New Mexico for over a decade and restoring their traditional religious practices.”\n— Historical Account of Pueblo Resistance",
      question: "Which of the following was a long-term outcome of the Pueblo Revolt?",
      options: [
        "The complete abandonment of New Mexico by the Spanish Empire",
        "The Spanish became more accommodating of Pueblo cultural and religious practices upon returning",
        "The Pueblo people adopted English laws and customs to resist Spain",
        "The immediate enslavement of all Pueblo people in European silver mines"
      ],
      correctIndex: 1,
      explanation: "When the Spanish reconquered New Mexico in 1692, they realized they could not completely suppress Native culture, leading to greater tolerance of Pueblo traditions."
    },
    {
      question: "Which of the following is a major cultural legacy of Spanish colonization in North America?",
      options: [
        "The establishment of representative democracy",
        "The widespread adoption of Protestantism",
        "The introduction of the Catholic faith and Spanish language",
        "The complete isolation of European settlers from Native cultures"
      ],
      correctIndex: 2,
      explanation: "Spanish colonization left a lasting cultural, linguistic, and religious impact, particularly the spread of Roman Catholicism and the Spanish language across the Southwest."
    },
    {
      question: "Unlike Spanish colonists, French and Dutch colonizers in North America generally:",
      options: [
        "Forced large numbers of Native Americans into plantation labor",
        "Established small, trade-based settlements and formed alliances with local tribes",
        "Avoided trade with Native Americans entirely",
        "Fled the continent after major military defeats by Native forces"
      ],
      correctIndex: 1,
      explanation: "French and Dutch colonization focused on the fur trade, leading them to build alliances and intermarry with local Native American tribes rather than conquer and enslave them."
    }
  ],
  "0707-q": [
    {
      stimulus: "“We must consider that we shall be as a city upon a hill. The eyes of all people are upon us.”\n— John Winthrop, A Model of Christian Charity, 1630",
      question: "The quote above best reflects the goals of which group of English colonists?",
      options: [
        "Jamestown tobacco planters seeking immediate profit",
        "Puritans seeking to build a model Christian society in New England",
        "Quakers promoting religious tolerance in Pennsylvania",
        "Catholics establishing a refuge in Maryland"
      ],
      correctIndex: 1,
      explanation: "John Winthrop's 'City upon a Hill' sermon outlined the Puritan goal of establishing a pure, holy community in Massachusetts Bay to serve as an example to England and the world."
    },
    {
      question: "Pennsylvania was founded by William Penn as a refuge for which group?",
      options: [
        "Puritans",
        "Catholics",
        "Quakers",
        "Anglicans"
      ],
      correctIndex: 2,
      explanation: "William Penn established Pennsylvania in 1681 as a haven for Quakers, emphasizing religious tolerance, representative government, and peaceful relations with Native Americans."
    },
    {
      question: "Which colonial region had the longest growing season and a plantation-based economy focused on tobacco, indigo, and rice?",
      options: [
        "New England Colonies",
        "Middle Colonies",
        "Southern Colonies",
        "Chesapeake Colonies only"
      ],
      correctIndex: 2,
      explanation: "The Southern colonies (Maryland, Virginia, the Carolinas, and Georgia) possessed warm climates and fertile soil, enabling long growing seasons for lucrative cash crops."
    }
  ],
  "0708-q": [
    {
      stimulus: "“The wrath of God is like great waters that are dammed for the present; they increase more and more... and if God should only withdraw his hand, the flood would immediately rush in.”\n— Jonathan Edwards, Sinners in the Hands of an Angry God, 1741",
      question: "The excerpt above is a famous example of the style of preaching from:",
      options: [
        "The Enlightenment",
        "The First Great Awakening",
        "The Temperance Movement",
        "The Transcendentalist Movement"
      ],
      correctIndex: 1,
      explanation: "Jonathan Edwards was a key leader of the First Great Awakening, known for his powerful, emotional sermons warning listeners of damnation and urging them to seek salvation."
    },
    {
      question: "How did the demographic makeup of the New England colonies differ from the Chesapeake colonies?",
      options: [
        "New England attracted mostly young, single male indentured servants",
        "Chesapeake colonies were settled primarily by families",
        "New England was settled mostly by families, leading to more stable communities",
        "Chesapeake colonies had no African slaves"
      ],
      correctIndex: 2,
      explanation: "New England attracted Puritans who arrived in family units, leading to natural population growth and close-knit towns. The Chesapeake attracted mostly young, single male indentured servants working in tobacco fields."
    },
    {
      question: "The First Great Awakening led to which of the following social effects in the colonies?",
      options: [
        "The unification of all colonists under a single state church",
        "An increase in questioning traditional authority and the rise of new Protestant denominations",
        "A decline in the overall religious interest in the colonies",
        "The immediate abolition of slavery in all Southern colonies"
      ],
      correctIndex: 1,
      explanation: "The Great Awakening introduced emotional preaching, leading to divisions in churches ('Old Lights' vs 'New Lights'), the growth of Baptist and Methodist churches, and a democratic spirit of questioning authority."
    }
  ]
};
