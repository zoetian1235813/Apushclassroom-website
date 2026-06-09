import type { LessonStep, Topic, Unit, VideoKnowledgeCheck } from "../types/lesson";

export type ContentRegion = "china" | "overseas";

interface TopicVideo {
  overseas: {
    embed?: string;
    link: string;
    durationLabel?: string;
    sourceLabel: string;
    videoChecks?: VideoKnowledgeCheck[];
  };
  china: {
    embed?: string;
    link: string;
    durationLabel?: string;
    sourceLabel: string;
    videoChecks?: VideoKnowledgeCheck[];
  };
}

const unit1PlaylistId = "PLEHRHjICEfDUkwlhx0SFi4-dgPI82_Wn3";

const chinaPlaylistUrl =
  "https://www.bilibili.com/video/BV1bNhVzLETH?spm_id_from=333.788.videopod.episodes&vd_source=2d2efd55ae3d917ffbcf11fc3bab60c5";

const defaultChinaVideo = {
  link: chinaPlaylistUrl,
  embed: "https://player.bilibili.com/player.html?bvid=BV1bNhVzLETH&as_wide=1&high_quality=1&danmaku=0",
  durationLabel: "Bilibili playlist - choose the matching topic",
  sourceLabel: "Open Bilibili playlist",
};

const bilibiliVideo = (page: number) =>
  `https://player.bilibili.com/player.html?bvid=BV1bNhVzLETH&page=${page}&as_wide=1&high_quality=1&danmaku=0`;

const bilibiliCrashCourse = (page: number) =>
  `https://player.bilibili.com/player.html?bvid=BV1ix411h7kC&page=${page}&as_wide=1&high_quality=1&danmaku=0`;

const youtubeVideo = (videoId: string) =>
  `https://www.youtube.com/watch?v=${videoId}&list=${unit1PlaylistId}`;

const unit1Checks: Record<string, VideoKnowledgeCheck[]> = {
  "1.1": [
    {
      id: "1.1-big-picture",
      timestamp: 55,
      question: "Unit 1 的核心背景最适合概括为哪一项？",
      choices: [
        { id: "a", text: "1491-1607 年间，美洲原住民社会、欧洲扩张和跨大西洋交流开始相互碰撞" },
        { id: "b", text: "英属北美殖民地已经形成稳定的代议制政府" },
        { id: "c", text: "美国开始建立联邦宪法秩序" },
      ],
      correctChoiceId: "a",
      explanation: "Unit 1 关注 1491-1607：接触前的美洲社会、欧洲探索、哥伦布大交换和早期殖民互动。",
    },
    {
      id: "1.1-causation",
      timestamp: 188,
      question: "分析 Unit 1 时，最常见的因果链是哪一条？",
      choices: [
        { id: "a", text: "工业化推动城市化，进而引发进步主义改革" },
        { id: "b", text: "欧洲贸易和宗教动机推动探索，探索又触发疾病、作物、人口和劳役体系的变化" },
        { id: "c", text: "冷战竞争推动美国国内民权运动" },
      ],
      correctChoiceId: "b",
      explanation: "这一单元的核心是欧洲扩张与美洲接触造成的跨大西洋社会、经济和环境变化。",
    },
  ],
  "1.2": [
    {
      id: "1.2-diversity",
      timestamp: 58,
      question: "接触前的美洲原住民社会为什么不能被当成单一群体理解？",
      choices: [
        { id: "a", text: "不同地区根据环境形成了渔猎、农业、游牧和城市文明等多种生活方式" },
        { id: "b", text: "所有群体都使用同一种语言和政治制度" },
        { id: "c", text: "所有群体都在欧洲到来后才形成复杂社会" },
      ],
      correctChoiceId: "a",
      explanation: "地理和资源差异塑造了多样的政治、经济和社会组织，这是 APUSH 1.2 的重点。",
    },
    {
      id: "1.2-maize",
      timestamp: 205,
      question: "玉米农业传播的重要影响是什么？",
      choices: [
        { id: "a", text: "削弱定居生活，使所有群体转向游牧" },
        { id: "b", text: "支持人口增长、定居农业和更复杂的社会结构" },
        { id: "c", text: "直接导致英国在北美建立十三殖民地" },
      ],
      correctChoiceId: "b",
      explanation: "玉米种植扩散后，许多地区能维持更大人口和更复杂的社会分工。",
    },
  ],
  "1.3": [
    {
      id: "1.3-motives",
      timestamp: 42,
      question: "欧洲国家开始远洋探索的主要动因组合是什么？",
      choices: [
        { id: "a", text: "人口恢复、中央集权加强、亚洲奢侈品需求和寻找海上贸易路线" },
        { id: "b", text: "废奴主义、工业资本主义和铁路扩张" },
        { id: "c", text: "美国独立、政党竞争和宪法修正案" },
      ],
      correctChoiceId: "a",
      explanation: "黑死病后人口与经济恢复、强君主国家和亚洲贸易需求共同推动了探索。",
    },
    {
      id: "1.3-portugal-spain",
      timestamp: 108,
      question: "葡萄牙和西班牙探索路线的关键差异是什么？",
      choices: [
        { id: "a", text: "葡萄牙沿非洲海岸建立贸易据点，西班牙资助哥伦布向西航行" },
        { id: "b", text: "葡萄牙主要殖民新英格兰，西班牙主要殖民加拿大" },
        { id: "c", text: "两国都拒绝使用航海技术" },
      ],
      correctChoiceId: "a",
      explanation: "葡萄牙绕非洲进入印度洋贸易，西班牙则试图向西寻找通往亚洲的路线。",
    },
  ],
  "1.4": [
    {
      id: "1.4-exchange",
      timestamp: 75,
      question: "哥伦布大交换不仅是商品交换，还包括什么？",
      choices: [
        { id: "a", text: "食物、动物、矿产、人口和疾病在美洲、欧洲、非洲之间流动" },
        { id: "b", text: "只包括欧洲向美洲输入小麦" },
        { id: "c", text: "只包括北美殖民地内部的税收变化" },
      ],
      correctChoiceId: "a",
      explanation: "Columbian Exchange 是跨大西洋的生态、人口和经济重组，不只是贸易清单。",
    },
    {
      id: "1.4-disease",
      timestamp: 116,
      question: "欧洲疾病对美洲原住民人口造成巨大破坏的主要原因是什么？",
      choices: [
        { id: "a", text: "原住民对天花等旧大陆疾病缺乏免疫力" },
        { id: "b", text: "原住民拒绝种植任何粮食作物" },
        { id: "c", text: "欧洲人完全没有进入人口密集地区" },
      ],
      correctChoiceId: "a",
      explanation: "缺乏免疫力使天花等疾病成为征服和殖民扩张中的关键破坏因素。",
    },
  ],
  "1.5": [
    {
      id: "1.5-labor",
      timestamp: 82,
      question: "欧洲介入非洲奴隶贸易后，奴役制度发生了什么变化？",
      choices: [
        { id: "a", text: "更趋向永久化、可继承化，并被种族化观念正当化" },
        { id: "b", text: "立即在整个大西洋世界消失" },
        { id: "c", text: "只用于短期学徒训练" },
      ],
      correctChoiceId: "a",
      explanation: "欧洲殖民扩张把奴役制度推向更严酷的永久性、世袭性和种族化形式。",
    },
    {
      id: "1.5-encomienda",
      timestamp: 250,
      question: "encomienda system 的本质是什么？",
      choices: [
        { id: "a", text: "以保护和传教为名，对原住民实施强迫劳动" },
        { id: "b", text: "让原住民完全自治、免除殖民控制" },
        { id: "c", text: "美国宪法中的分权制度" },
      ],
      correctChoiceId: "a",
      explanation: "encomienda 以宗教和保护话语包装殖民剥削，是西班牙殖民经济的重要劳役体系。",
    },
  ],
  "1.6": [
    {
      id: "1.6-missions",
      timestamp: 70,
      question: "1573 年后西班牙北扩的一个重要方式是什么？",
      choices: [
        { id: "a", text: "更多依靠 mission system，通过传教和定居点推进控制" },
        { id: "b", text: "完全停止殖民活动" },
        { id: "c", text: "把所有殖民地交给英国管理" },
      ],
      correctChoiceId: "a",
      explanation: "西班牙扩张不只是军事征服，也通过传教体系重塑宗教、劳动和定居格局。",
    },
    {
      id: "1.6-resistance",
      timestamp: 236,
      question: "Pueblo Revolt 说明了什么历史现象？",
      choices: [
        { id: "a", text: "原住民对宗教强制、劳役和殖民控制存在组织化反抗" },
        { id: "b", text: "原住民社会没有回应欧洲殖民扩张" },
        { id: "c", text: "西班牙从未尝试改变原住民文化" },
      ],
      correctChoiceId: "a",
      explanation: "Pueblo Revolt 是 Unit 1 中理解文化冲突、殖民压力和原住民抵抗的关键案例。",
    },
  ],
};

const unit2Checks: Record<string, VideoKnowledgeCheck[]> = {
  "2.1": [
    {
      id: "2.2-fur-trade",
      timestamp: 125,
      question: "在西班牙、法国和英国的北美殖民扩张中，最依赖与原住民建立皮毛贸易伙伴关系的是哪一个国家？",
      choices: [
        { id: "a", text: "西班牙 (Spain)" },
        { id: "b", text: "法国 (France)" },
        { id: "c", text: "英国 (Great Britain)" }
      ],
      correctChoiceId: "b",
      explanation: "法国的殖民活动主要依赖于与北美原住民（如休伦族）建立皮毛贸易网（Fur Trade），而非大规模农业定居或征服。"
    }
  ],
  "2.2": [
    {
      id: "2.2-transatlantic-trade",
      timestamp: 140,
      question: "大西洋三角贸易和航海条例（Navigation Acts）的核心目的是什么？",
      choices: [
        { id: "a", text: "通过重商主义限制殖民地与其他国家贸易，确保英国母国的财富与贸易出超" },
        { id: "b", text: "鼓励十三殖民地与西班牙、法国建立自由贸易同盟" },
        { id: "c", text: "彻底废除奴隶贸易并转向自由资本主义" }
      ],
      correctChoiceId: "a",
      explanation: "《航海条例》是典型的重商主义政策，旨在通过控制贸易航线和垄断殖民地高价值原材料来最大化英国的经济利益。"
    }
  ],
  "2.3": [
    {
      id: "2.3-jamestown",
      timestamp: 180,
      question: "英国在切萨皮克（Chesapeake）地区建立的第一个永久定居点是哪个？它最初的主要经济支柱是什么？",
      choices: [
        { id: "a", text: "普利茅斯 (Plymouth)，主要依靠捕鱼业" },
        { id: "b", text: "詹姆斯敦 (Jamestown)，主要依靠烟草种植 (Tobacco)" },
        { id: "c", text: "费城 (Philadelphia)，主要依靠小麦贸易" }
      ],
      correctChoiceId: "b",
      explanation: "1607 年建立的詹姆斯敦是首个永久定居点，在引进烟草种植后，其经济获得了爆发式增长，推动了种植园经济和劳动力需求。"
    }
  ],
  "2.4": [
    {
      id: "2.4-society-dev",
      timestamp: 150,
      question: "中部殖民地（Middle Colonies）在社会和人口构成上的最显著特征是什么？",
      choices: [
        { id: "a", text: "人口极其单一，绝大多数人是极其严厉的清教徒" },
        { id: "b", text: "高度依赖单一烟草种植，缺乏城市和商业活动" },
        { id: "c", text: "具有高度的族裔多样性（如德裔、荷裔、英裔等）和宗教包容性" }
      ],
      correctChoiceId: "c",
      explanation: "中部殖民地被称为“大熔炉”（Breadbasket & Melting Pot），其多元的土地分拨政策和宗教宽容态度吸引了多样的人口与宗教群体（如贵格会）。"
    }
  ],
  "2.5": [
    {
      id: "2.5-culture",
      timestamp: 165,
      question: "第一次大觉醒（First Great Awakening）对北美殖民地产生了什么长远影响？",
      choices: [
        { id: "a", text: "强化了英国国教在北美的绝对神权统治" },
        { id: "b", text: "打破了传统教会对救赎论的垄断，培养了反抗既有权威的民主精神，间接为革命做了思想铺垫" },
        { id: "c", text: "导致绝大多数殖民者彻底放弃基督教信仰" }
      ],
      correctChoiceId: "b",
      explanation: "大觉醒是一次跨殖民地的宗教复兴运动，挑战了既有的神职人员权威，增强了大众的民主与自治意识。"
    }
  ],
  "2.6": [
    {
      id: "2.6-native-interactions",
      timestamp: 155,
      question: "梅塔科姆战争（Metacom's War / King Philip's War）爆发的最根本原因是什么？",
      choices: [
        { id: "a", text: "新英格兰清教徒不断向西扩张，土地侵占严重威胁到原住民的生存和自治空间" },
        { id: "b", text: "原住民主动联手法国军官发起无端进攻" },
        { id: "c", text: "双方对跨大西洋皮毛贸易的定价产生纠纷" }
      ],
      correctChoiceId: "a",
      explanation: "随着英国移民数量的激增，对土地的极度渴望使他们不断蚕食印第安部落的生存空间，最终酿成残酷的武力冲突。"
    }
  ],
  "2.7": [
    {
      id: "2.7-slavery",
      timestamp: 135,
      question: "1676年贝肯起义（Bacon's Rebellion）对切萨皮克地区劳动力结构的最深远影响是什么？",
      choices: [
        { id: "a", text: "殖民地废除了所有形式的强迫劳动" },
        { id: "b", text: "促使南方种植园主开始大规模、系统性地依靠永久且种族化的黑人奴隶劳动，逐步替代白人契约奴" },
        { id: "c", text: "促使种植园主改用高薪雇佣白人自由农" }
      ],
      correctChoiceId: "b",
      explanation: "贝肯起义暴露出白人贫民和契约奴（Indentured Servants）联手反抗的政治隐患，促使南方种植园精英彻底转向更易控制的终身黑奴制度。"
    }
  ],
  "2.8": [
    {
      id: "2.8-government",
      timestamp: 120,
      question: "弗吉尼亚的哈斯议会（House of Burgesses）和新英格兰的镇民大会（Town Meetings）体现了北美什么政治传统？",
      choices: [
        { id: "a", text: "由英王直接派出的总督实施绝对军事管辖" },
        { id: "b", text: "代议制与直接民主等早期地方自治（Self-Government）传统" },
        { id: "c", text: "只有神职人员可以掌控的政教合一政权" }
      ],
      correctChoiceId: "b",
      explanation: "这些早期的政治 and 代议机构在殖民地生根发芽，构成了北美自治与民主传统的重要制度根基。"
    }
  ],
  "2.9": [
    {
      id: "2.9-review",
      timestamp: 190,
      question: "概括北美殖民地从 1607 到 1754 年的发展特征，最准确的是哪一项？",
      choices: [
        { id: "a", text: "各殖民地彼此高度孤立，没有发展出任何共同的纽带" },
        { id: "b", text: "在“有益的忽视”下逐步形成高度地方自治，同时在经济和文化上与大英帝国日益同化（Anglicization）" },
        { id: "c", text: "彻底摆脱了大英帝国重商主义网络的控制" }
      ],
      correctChoiceId: "b",
      explanation: "殖民地一方面在内部探索政治自治，另一方面通过跨大西洋商品消费与文化传播，经历着“英国化”（Anglicization）的洗礼。"
    }
  ]
};

const unit3Checks: Record<string, VideoKnowledgeCheck[]> = {
  "3.1": [
    {
      id: "3.1-salutary-neglect",
      timestamp: 95,
      question: "七年战争（法国与印第安人战争）结束后，英国对北美十三殖民地政策发生的最大转变是什么？",
      choices: [
        { id: "a", text: "结束重商主义，给予殖民地完全自由贸易权" },
        { id: "b", text: "结束“有益的忽视”（Salutary Neglect），开始直接征税并加强帝国集权" },
        { id: "c", text: "鼓励殖民地越过阿巴拉契亚山脉向西扩张" }
      ],
      correctChoiceId: "b",
      explanation: "七年战争给英国留下了巨额债务，促使其结束了长期的“有益的忽视”，开始直接通过一系列税法（如《印花税法》）对殖民地课税并加强控制，直接引发了“无代表不纳税”的激烈抗议。"
    }
  ],
  "3.2": [
    {
      id: "3.2-taxation",
      timestamp: 150,
      question: "1765 年《印花税法》（Stamp Act）之所以在北美引发前所未有的抵制，其核心分歧是什么？",
      choices: [
        { id: "a", text: "殖民地不愿支付任何抵御外部威胁的防务费用" },
        { id: "b", text: "该法是由英国议会直接课税（Direct/Internal Tax），而殖民地在议会中并无代议士（Virtual Representation）" },
        { id: "c", text: "印花税迫使殖民地纸张和印刷业完全收归国有" }
      ],
      correctChoiceId: "b",
      explanation: "殖民地并非完全不愿交税，而是坚信“无代表不纳税”，即只有他们自己选出的地方议会才有权对他们直接征税。"
    }
  ],
  "3.3": [
    {
      id: "3.3-philosophy",
      timestamp: 140,
      question: "托马斯·潘恩（Thomas Paine）在 1776 年发表的《常识》（Common Sense）为什么能产生巨大的社会动员力量？",
      choices: [
        { id: "a", text: "它使用平实易懂的语言，融合圣经典故，痛斥君主制的荒谬，并呼吁北美彻底独立" },
        { id: "b", text: "它呼吁殖民地与英王乔治三世妥协，接受更温和的关税政策" },
        { id: "c", text: "它系统阐述了绝对君主制度的哲学合理性" }
      ],
      correctChoiceId: "a",
      explanation: "《常识》将深奥的启蒙思想转为通俗语言，极大地推动了中下层民众对美国革命和独立的心理支持。"
    }
  ],
  "3.4": [
    {
      id: "3.4-victory",
      timestamp: 210,
      question: "在独立战争中，萨拉托加战役（Battle of Saratoga）被视为战争转折点的主要原因是什么？",
      choices: [
        { id: "a", text: "它直接导致了乔治·华盛顿被任命为大陆军总司令" },
        { id: "b", text: "此战大捷促成了法国与美国结成正式军事同盟，获得了关键的海军和财政支持" },
        { id: "c", text: "英国在萨拉托加战败后立即签署了《巴黎和约》承认美国独立" }
      ],
      correctChoiceId: "b",
      explanation: "萨拉托加战役的胜利向欧洲大陆证明了美国人有赢得战争的潜力，直接推动了法美军事同盟的缔结，为美方带来了极为关键的海军支援和战争资金援助。"
    }
  ],
  "3.5": [
    {
      id: "3.5-ideals",
      timestamp: 120,
      question: "美国革命提出的平等与人权概念，在建国初期对妇女地位产生的主要观念影响是什么？",
      choices: [
        { id: "a", text: "妇女立即获得了完全的投票权 and 财产继承权" },
        { id: "b", text: "产生了“共和母亲”（Republican Motherhood）观念，强调女性在家庭中培育具有美德的下一代公民的责任" },
        { id: "c", text: "女性被完全排斥在家庭教育和任何道德活动之外" }
      ],
      correctChoiceId: "b",
      explanation: "“共和母亲”概念虽然没有赋予女性选举权，但极大地提高了女性在家庭公民教育层面的道德和社会价值。"
    }
  ],
  "3.6": [
    {
      id: "3.6-articles",
      timestamp: 160,
      question: "邦联条例（Articles of Confederation）所建立的中央政府之所以被公认为软弱无力，其核心表现是哪一项？",
      choices: [
        { id: "a", text: "缺乏征税权（Power to Tax）和规管跨州及跨国贸易的权力，且没有设立行政和司法分支" },
        { id: "b", text: "总统权力过大，导致州议会形同虚设" },
        { id: "c", text: "邦联条例强制在所有州推行统一的货币和高额联邦关税" }
      ],
      correctChoiceId: "a",
      explanation: "处于对英国强权政府的恐惧，邦联条例故意建立了一个极弱的中央政府，无权征税和征兵，最终导致财政危机。"
    }
  ],
  "3.7": [
    {
      id: "3.7-debates",
      timestamp: 185,
      question: "宪法制定过程中的“大妥协”（Great Compromise / Connecticut Compromise）是如何解决国会代议制争议的？",
      choices: [
        { id: "a", text: "废除了参议院，建立单一的一院制国会" },
        { id: "b", text: "设立两院制，众议院席位按各州人口分配（满足大州），参议院每州固定拥有两席（满足小州）" },
        { id: "c", text: "规定只有拥有土地的男性才可以担任国会议员" }
      ],
      correctChoiceId: "b",
      explanation: "该妥协平衡了弗吉尼亚方案（大州利益）和新泽西方案（小州利益），创建了美国现代两院制立法机构。"
    }
  ],
  "3.8": [
    {
      id: "3.8-constitution",
      timestamp: 170,
      question: "美国宪法为防止任何单一权力部门出现独裁，采用了哪些经典设计？",
      choices: [
        { id: "a", text: "联邦制、三权分立与制衡（Checks and Balances）" },
        { id: "b", text: "规定总统可以无限期连任且拥有终身免于起诉特权" },
        { id: "c", text: "将所有立法和司法权力收归总统内阁" }
      ],
      correctChoiceId: "a",
      explanation: "宪法在联邦与州之间分配权力，并在立法、行政、司法三权之间设置了精妙的交叉制衡机制。"
    }
  ],
  "3.9": [
    {
      id: "3.9-republic",
      timestamp: 150,
      question: "亚历山大·汉密尔顿（Federalist）与托马斯·杰斐逊（Democratic-Republican）在建国初期的核心宪法路线分歧是什么？",
      choices: [
        { id: "a", text: "汉密尔顿主张严格解释宪法（Strict Construction），杰斐逊主张宽泛解释宪法（Loose Construction）" },
        { id: "b", text: "汉密尔顿主张利用“必要且妥当条款”（Elastic Clause）宽泛解释宪法以建立国家银行，杰斐逊则坚守严格的宪法条文，强调州权" },
        { id: "c", text: "两人在废除奴隶制的时间表上意见针锋相对" }
      ],
      correctChoiceId: "b",
      explanation: "这一分歧奠定了美国最早的两党制（First Party System）分野：亲工商业与集权的联邦党 vs 亲农业与州权的民主共和党。"
    }
  ],
  "3.10": [
    {
      id: "3.10-identity",
      timestamp: 110,
      question: "乔治·华盛顿在《告别演说》（Farewell Address）中，对新生的美国做出了哪两个核心警告？",
      choices: [
        { id: "a", text: "警告不要建立常备陆军，也不要发展海外领土" },
        { id: "b", text: "警告要警惕国内政党派系政治（Factions）的分裂，并避免卷入欧洲的永久性军事同盟（Alliances）" },
        { id: "c", text: "呼吁美国立即干涉法国大革命以输出民主" }
      ],
      correctChoiceId: "b",
      explanation: "华盛顿担心党争会撕裂国家，而欧洲复杂的帝制冲突会耗尽美国的国力，因而倡导中立主义。"
    }
  ],
  "3.11": [
    {
      id: "3.11-movement",
      timestamp: 130,
      question: "1787 年《西北土地法令》（Northwest Ordinance）在处理美国领土扩张上最突出的历史意义是什么？",
      choices: [
        { id: "a", text: "明确规定了新领土在达到人口标准后可以作为平等的新州加入联邦，且在该区域内完全禁止了奴隶制" },
        { id: "b", text: "规定新并入的西北领土永远不能享有投票权" },
        { id: "c", text: "强制将该地区所有法国和英国居民驱逐出境" }
      ],
      correctChoiceId: "a",
      explanation: "《西北法令》奠定了美利坚版图扩张的公平秩序，且首次从地理上限制了奴隶制的扩张范围。"
    }
  ]
};

export const unit4Checks: Record<string, VideoKnowledgeCheck[]> = {
  "4.1": [
    {
      id: "4.1-parties",
      timestamp: 160,
      question: "1803 年杰斐逊顶住对宪法权限的自我质疑，毅然完成“路易斯安那购地案”（Louisiana Purchase），其最大的战略动机是？",
      choices: [
        { id: "a", text: "获得落基山脉的黄金储备以支持金本位制" },
        { id: "b", text: "为其理想中的“自耕农共和国”（Agrarian Republic）获取辽阔的耕地，并夺取密西西比河出海口新奥尔良" },
        { id: "c", text: "帮助法国拿破仑在加勒比海对抗英国军队" }
      ],
      correctChoiceId: "b",
      explanation: "杰斐逊坚信民主建立在独立自主的农场主基础上，这宗购地直接使美国国土面积翻倍，打通了中西部贸易命脉。"
    }
  ],
  "4.2": [
    {
      id: "4.2-worldstage",
      timestamp: 140,
      question: "1823 年宣布的《门罗宣言》（Monroe Doctrine）树立了美国外交史上的什么核心原则？",
      choices: [
        { id: "a", text: "美国承诺出兵协助拉美各国推翻所有殖民政府" },
        { id: "b", text: "宣布西半球不再接受欧洲列强的新殖民扩张，作为交换，美国亦不干涉欧洲内部事务" },
        { id: "c", text: "宣布美国对整个南北美洲拥有领土主权" }
      ],
      correctChoiceId: "b",
      explanation: "该宣言标志着美国开始确立在美洲的势力范围主导权，警示欧洲不要在美洲搞复辟与扩张。"
    }
  ],
  "4.3": [
    {
      id: "4.3-regional",
      timestamp: 155,
      question: "1820年《密苏里妥协案》（Missouri Compromise）是如何暂时平息关于奴隶制扩张的激烈争论的？",
      choices: [
        { id: "a", text: "宣布废除南方所有已有的奴隶制，逐步过渡到自由劳动力" },
        { id: "b", text: "接纳密苏里为蓄奴州、缅因为自由州，并以北纬 36°30′ 划线，此线以北的新领土禁止蓄奴" },
        { id: "c", text: "宣布由各州居民通过全民公投决定是否允许奴隶制（Popular Sovereignty）" }
      ],
      correctChoiceId: "b",
      explanation: "这一妥协暂时维系了参议院中自由州与蓄奴州的数量平衡，但也将地理分裂线深深刻在了美国版图上。"
    }
  ],
  "4.4": [
    {
      id: "4.4-market-ind",
      timestamp: 165,
      question: "19世纪上半叶市场革命（Market Revolution）得以爆发的技术和交通基础是什么？",
      choices: [
        { id: "a", text: "跨大陆铁路的全面通车与汽车的普及" },
        { id: "b", text: "运河系统、汽船、公路，以及棉花去籽机和互换零件技术的发明" },
        { id: "c", text: "彻底实现全国电力网的覆盖" }
      ],
      correctChoiceId: "b",
      explanation: "运河、汽船与电报的普及拉近了地理距离，形成了东部制造业与西部农业的大规模商品交换网络。"
    }
  ],
  "4.5": [
    {
      id: "4.5-market-soc",
      timestamp: 130,
      question: "随着市场革命的深入，中产阶级家庭内部的性别角色发生了什么变化？",
      choices: [
        { id: "a", text: "女性开始与男性一样大规模进入工厂担任高级管理职务" },
        { id: "b", text: "产生了“家庭天使/家庭崇拜”（Cult of Domesticity）观念，将女性定位在家庭私域扮演道德守护者，而男性在公共领域赚钱" },
        { id: "c", text: "彻底消除了男女之间的社会分工差异" }
      ],
      correctChoiceId: "b",
      explanation: "工作场所从家庭作坊迁往工厂后，中产阶级女性被赋予了特殊的道德教化期待，进一步强化了“公私分域”的观念。"
    }
  ],
  "4.6": [
    {
      id: "4.6-democracy",
      timestamp: 110,
      question: "1820-1830 年代，美国民主范围扩张最显著的体制变化是什么？",
      choices: [
        { id: "a", text: "多数州废除了选民的财产资格限制（Property Requirements），实现了几乎所有成年白人男性的普选权" },
        { id: "b", text: "女性和自由黑人首次在全美获得了投票权" },
        { id: "c", text: "废除了总统选举人团制度，改由选民直接计票决定总统" }
      ],
      correctChoiceId: "a",
      explanation: "这一时期的“杰克逊民主”以平民政治崛起为特征，投票率暴增，但投票权依然局限于白人男性。"
    }
  ],
  "4.7": [
    {
      id: "4.7-jackson",
      timestamp: 180,
      question: "1832年“废税危机”（Nullification Crisis）的本质是什么？它暴露了什么宪法深层隐患？",
      choices: [
        { id: "a", text: "南卡罗来纳州因反对关税而宣布州权至上，试图废除联邦法律，引发了关于联邦主权与州权（States' Rights）的分裂辩论" },
        { id: "b", text: "北方各州因拒绝为印第安人迁移支付费用而宣布破产" },
        { id: "c", text: "杰克逊试图废除最高法院的司法审查权" }
      ],
      correctChoiceId: "a",
      explanation: "南卡罗来纳在约翰·卡尔霍恩的思想主导下试图废除高额关税，甚至威胁退联，预示了后来的南北战争危机。"
    }
  ],
  "4.8": [
    {
      id: "4.8-culture-dev",
      timestamp: 120,
      question: "这一时期以爱默生和梭罗为代表的美国本土文学与哲学流派是什么？其核心主张是？",
      choices: [
        { id: "a", text: "超验主义（Transcendentalism），强调个人直觉、自立精神以及人与自然的融合，反思工业化带来的物欲" },
        { id: "b", text: "理性主义，主张用严密逻辑完全取代情感与自然" },
        { id: "c", text: "唯美主义，主张文学创作不应带有任何政治与社会目的" }
      ],
      correctChoiceId: "a",
      explanation: "超验主义是美国第一批具有独特本土印记的哲学思想，主张通过探寻自然以提升个人的道德自我觉醒。"
    }
  ],
  "4.9": [
    {
      id: "4.9-awakening",
      timestamp: 140,
      question: "第二次大觉醒（Second Great Awakening）的教义如何直接助推了 1830 年代的社会改革风潮？",
      choices: [
        { id: "a", text: "它宣扬预定论，认为人类无论如何努力都无法改变世俗的罪恶" },
        { id: "b", text: "它主张“完美主义”（Perfectionism），宣扬人人皆可获得救赎，并鼓励信徒通过改造社会来迎接千禧年的到来" },
        { id: "c", text: "它呼吁信徒放弃一切社会改良，完全隐居山林" }
      ],
      correctChoiceId: "b",
      explanation: "第二次大觉醒激发了极强的道德狂热，信徒将消灭社会罪恶（如酗酒、奴隶制、文盲）视为自身的宗教使命。"
    }
  ],
  "4.10": [
    {
      id: "4.10-reform",
      timestamp: 160,
      question: "1848 年塞内卡瀑布会议（Seneca Falls Convention）发表的《感伤宣言》（Declaration of Sentiments）借鉴了什么历史文献？其核心诉求是？",
      choices: [
        { id: "a", text: "借鉴了《独立宣言》，宣布“人人生而平等，男女平等”，并首次正式提出争取女性选举权" },
        { id: "b", text: "借鉴了《大宪章》，要求削减总统的关税征收权" },
        { id: "c", text: "借鉴了《邦联条例》，主张保障各州在家庭事务上的绝对自治权" }
      ],
      correctChoiceId: "a",
      explanation: "该宣言由伊丽莎白·卡迪·斯坦顿起草，是美国妇女权利运动史上的里程碑事件，全面吹响了女性争取平权的号角。"
    }
  ],
  "4.11": [
    {
      id: "4.11-african",
      timestamp: 145,
      question: "在这一时期，随着蓄奴制的恶劣扩张，废奴运动内部发生了什么深刻的分化？",
      choices: [
        { id: "a", text: "所有人一致同意支持将黑人全部送回西非建立定居点（殖民运动）" },
        { id: "b", text: "以威廉·劳埃德·加里森（William Lloyd Garrison）为代表的“立即无偿废奴派”崛起，挑战了早期温和渐进的废奴主张" },
        { id: "c", text: "废奴运动彻底解散，转为纯粹的劳工权益斗争" }
      ],
      correctChoiceId: "b",
      explanation: "加里森发行了《解放者》报纸，将奴隶制定义为无法妥协的“道德原罪”，推动了更为激进的即时废奴热潮。"
    }
  ],
  "4.12": [
    {
      id: "4.12-south-soc",
      timestamp: 135,
      question: "面对日益高涨的废奴呼声，南方奴隶主对奴隶制正当性的辩护说辞发生了什么性质转变？",
      choices: [
        { id: "a", text: "从早期的“无可奈何的恶”（Necessary Evil）转向极力美化其为道德和科学上的“积极的善”（Positive Good）" },
        { id: "b", text: "承认奴隶制有违道德，承诺在五十年内自动废除" },
        { id: "c", text: "坚称奴隶制只是一项纯粹的地方税收制度，与社会和种族秩序无关" }
      ],
      correctChoiceId: "a",
      explanation: "南方精英（如卡尔霍恩）声称奴隶制照顾了黑人的生老病死，且创造了高雅的白人精英文化，以此来应对废奴派的道德谴责。"
    }
  ]
};

const unit5Checks: Record<string, VideoKnowledgeCheck[]> = {
  "5.1": [
    {
      id: "5.1-destiny",
      timestamp: 130,
      question: "1840年代风靡全美的“昭昭天命”（Manifest Destiny）的核心信念是什么？",
      choices: [
        { id: "a", text: "美国人有上帝赋予的权利和义务，去征服并传播民主于整个北美大陆" },
        { id: "b", text: "维持与英国的和平是美国外交最神圣的使命" },
        { id: "c", text: "坚信美国应当偏安一隅，绝不插手任何西部领土领地" }
      ],
      correctChoiceId: "a",
      explanation: "该思潮将领土扩张罩上了宗教与意识形态上的必然性光环，直接推动了西拓和美墨战争。"
    }
  ],
  "5.2": [
    {
      id: "5.2-mexican",
      timestamp: 150,
      question: "1848年《瓜达卢佩-希达尔戈条约》（Treaty of Guadalupe Hidalgo）结束美墨战争后，并入美国的“墨西哥割让地”（Mexican Cession）为什么立即引爆了南北危机？",
      choices: [
        { id: "a", text: "墨西哥的债务危机导致美国联邦财政破产" },
        { id: "b", text: "围绕这些新并入的庞大土地是否允许奴隶制，南北各州爆发了不可调和的分裂危机" },
        { id: "c", text: "墨西哥难民的大规模涌入导致南方农业崩溃" }
      ],
      correctChoiceId: "b",
      explanation: "新领土的到来打破了原有的政治均衡，使得奴隶制扩张与否再次成为国会生死对决的焦点。"
    }
  ],
  "5.3": [
    {
      id: "5.3-fugitive-slave-law",
      timestamp: 160,
      question: "《1850 年妥协案》（Compromise of 1850）中，哪一项条款在北方各州引起了最强烈的抵制 and 道德愤怒？",
      choices: [
        { id: "a", text: "加利福尼亚作为自由州加入联邦" },
        { id: "b", text: "废除华盛顿特区的奴隶贸易" },
        { id: "c", text: "制定了更严厉的《逃奴追缉法》（Fugitive Slave Act）" }
      ],
      correctChoiceId: "c",
      explanation: "《逃奴追缉法》强迫北方州和普通市民协助追捕逃奴，甚至剥夺了被指控奴隶的陪审团审判权，这直接践踏了北方人的联邦自治与道德底线，极大地加剧了废奴运动和南北分裂。"
    }
  ],
  "5.4": [
    {
      id: "5.4-differences",
      timestamp: 140,
      question: "导致 1850 年代南北社会形态彻底决裂的经济和技术根源是什么？",
      choices: [
        { id: "a", text: "南方在大规模铺设运河，而北方依然完全依靠人工挑担" },
        { id: "b", text: "北方工业化狂飙、铁路网密布，劳动力完全基于自由劳动（Free Labor）；南方则高度依赖棉花单一种植与种族化奴隶制（Slave Labor）" },
        { id: "c", text: "南方的制造业产值已经远远超越了北方" }
      ],
      correctChoiceId: "b",
      explanation: "两种截然不同的经济模式和劳动力价值观（Free Soil vs Slavery），使得双方在意识形态上将彼此视为威胁。"
    }
  ],
  "5.5": [
    {
      id: "5.5-compromise-fail",
      timestamp: 175,
      question: "1854 年史蒂芬·道格拉斯主导的《堪萨斯-内布拉斯加法案》（Kansas-Nebraska Act）为什么彻底埋葬了此前的政治妥协？",
      choices: [
        { id: "a", text: "It单方面废除了 1820 年《密苏里妥协案》的地理限制线，宣布通过“人民主权”（Popular Sovereignty）决定奴隶制，导致堪萨斯爆发血腥内战" },
        { id: "b", text: "它宣布加利福尼亚分割为南北两部分" },
        { id: "c", text: "它强行取缔了最高法院，将司法权归于地方议会" }
      ],
      correctChoiceId: "a",
      explanation: "这一法案允许原本禁止蓄奴的北方领土引入奴隶制，导致温和派彻底绝望，直接触发了辉格党的崩溃和共和党的诞生。"
    }
  ],
  "5.6": [
    {
      id: "5.6-election1860",
      timestamp: 160,
      question: "1860 年亚伯拉罕·林肯（Abraham Lincoln）当选总统，为什么直接导致南方各州启动脱离联邦（Secession）？",
      choices: [
        { id: "a", text: "林肯在竞选中发誓要立即用联邦军队彻底消灭南方的奴隶制" },
        { id: "b", text: "林肯作为共和党人，代表了坚决反对奴隶制向任何新领土扩张的政治力量，南方精英认为这等同于宣判了奴隶制的慢性死亡" },
        { id: "c", text: "林肯在南方赢得了绝对多数选票，南方精英质疑选举舞弊" }
      ],
      correctChoiceId: "b",
      explanation: "林肯没有在南方赢得一张选举人票却依然当选，让南方意识到他们已经彻底失去了对联邦政府的影响力。"
    }
  ],
  "5.7": [
    {
      id: "5.7-military",
      timestamp: 185,
      question: "林肯在 1863 年发表的《解放黑奴宣言》（Emancipation Proclamation）具有什么划时代的外交和军事作用？",
      choices: [
        { id: "a", text: "它立即宣布解放了全美所有州（包括边界州）的全部奴隶" },
        { id: "b", text: "它将内战的性质升华为消灭奴隶制的道德十字军，从而阻止了英法等欧洲列强介入支持南方联盟，并允许自由黑人参军" },
        { id: "c", text: "它使得南方各州主动放下武器回归联邦" }
      ],
      correctChoiceId: "b",
      explanation: "该宣言释放了巨大的道德力量，将战争目的与废奴彻底绑定，并在军事上为联邦军引入了近二十万勇敢的黑人士兵。"
    }
  ],
  "5.8": [
    {
      id: "5.8-policies",
      timestamp: 130,
      question: "内战期间，由于南方议员退出国会，北方共和党人顺利通过了哪些重塑美国版图的法案？",
      choices: [
        { id: "a", text: "《宅地法》（Homestead Act）、《莫里尔赠地法案》（Morrill Land Grant Act） and 资助跨美大陆铁路建设法案" },
        { id: "b", text: "废除关税法案和限制西部大农场法案" },
        { id: "c", text: "宣布将所有的印第安大同化法令直接废除" }
      ],
      correctChoiceId: "a",
      explanation: "这些战时立法极大地促进了中西部的自由移民开发、高等农业大学建设以及全国交通网的互联。"
    }
  ],
  "5.9": [
    {
      id: "5.9-reconstruct",
      timestamp: 170,
      question: "内战结束后通过的宪法第十三、十四、十五条修正案（Reconstruction Amendments）的核心历史意义是？",
      choices: [
        { id: "a", text: "分别是：废除奴隶制；确立出生公民权与法律平等保护；保障所有男性公民不因种族而受选举权歧视" },
        { id: "b", text: "分别是：建立联邦储备局；允许女性选举权；确立联邦所得税" },
        { id: "c", text: "分别是：确认南方的脱联合法性；赦免杰斐逊·戴维斯；规定棉花免税" }
      ],
      correctChoiceId: "a",
      explanation: "这些修正案在宪法层面上彻底重构了美利坚的权利版图，被史学家称为美国的“第二次建国”。"
    }
  ],
  "5.10": [
    {
      id: "5.10-reconstruct-fail",
      timestamp: 160,
      question: "导致 1877 年重建期（Reconstruction）彻底失败和终结的核心历史事件是什么？",
      choices: [
        { id: "a", text: "南方爆发了第二次大规模军事叛乱" },
        { id: "b", text: "《1877 年妥协案》（Compromise of 1877）：共和党海斯为获得总统席位，向民主党妥协撤出了所有驻扎在南方的联邦军队" },
        { id: "c", text: "最高法院宣布第十三条修正案违宪" }
      ],
      correctChoiceId: "b",
      explanation: "联邦军队的撤出标志着南方彻底回到了三K党和“吉姆·克劳法”（Jim Crow Laws）的种族隔离与白人至上统治下，重建未竟全功。"
    }
  ]
};

const unit6Checks: Record<string, VideoKnowledgeCheck[]> = {
  "6.1": [
    {
      id: "6.1-gilded-context",
      timestamp: 150,
      question: "马克·吐温所称的“镀金时代”（Gilded Age）的核心社会矛盾体现为？",
      choices: [
        { id: "a", text: "科技完全停滞，社会经济倒退到农业社会" },
        { id: "b", text: "工业化与垄断资本疯狂崛起创造了巨额财富，但在金碧辉煌的表面下，掩盖了严重的贫富分化、政治腐败与劳工剥削" },
        { id: "c", text: "联邦政府推行绝对的公有制计划经济" }
      ],
      correctChoiceId: "b",
      explanation: "“镀金”一词极具讽刺性，指的是表面镀金、内部腐烂的社会现实。"
    }
  ],
  "6.2": [
    {
      id: "6.2-west-econ",
      timestamp: 140,
      question: "战后西部经济大开发的三个核心支柱行业是什么？",
      choices: [
        { id: "a", text: "金银采矿业（Mining）、大型牧场畜牧业（Ranching）以及家庭小麦耕种（Farming）" },
        { id: "b", text: "纺织印染业、汽车制造与石油化工" },
        { id: "c", text: "皮毛贸易、烟草种植与捕鱼业" }
      ],
      correctChoiceId: "a",
      explanation: "铁路通车与宅地法的激励，将采矿、放牧与农业迅速推向西部，带来了快速的市场化，但也造成了生态破坏。"
    }
  ],
  "6.3": [
    {
      id: "6.3-mexican-americans",
      timestamp: 95,
      question: "Which of the following describes the impact of westward migration on Mexican-Americans after the Mexican-American War?",
      choices: [
        { id: "a", text: "They successfully retained all their land through the Homestead Act." },
        { id: "b", text: "Many lost their land to white settlers through court rulings, leading to resistance groups like Las Gorras Blancas." },
        { id: "c", text: "They voluntarily relocated to eastern cities to work in industrial factories." }
      ],
      correctChoiceId: "b",
      explanation: "Despite treaty promises, US courts often stripped Mexican-Americans of their land, prompting resistance like Las Gorras Blancas who rebelled against property seizures."
    },
    {
      id: "6.3-dawes-act",
      timestamp: 215,
      question: "What was the primary goal of the Dawes Act of 1887?",
      choices: [
        { id: "a", text: "To establish self-governing sovereign nations for Plains Indian tribes." },
        { id: "b", text: "To divide tribal lands into individual plots to encourage farming and force Native American assimilation." },
        { id: "c", text: "To provide financial reparations to Native Americans." }
      ],
      correctChoiceId: "b",
      explanation: "The Dawes Act sought to assimilate Native Americans by dividing communal tribal lands into individual private plots, stripping them of sovereignty and culture."
    },
    {
      id: "6.3-ghost-dance",
      timestamp: 295,
      question: "Which movement represented a spiritual effort by American Indians to restore their traditional way of life and resist US expansion, culminating in the Wounded Knee Massacre?",
      choices: [
        { id: "a", text: "The Ghost Dance Movement" },
        { id: "b", text: "The Social Gospel Movement" },
        { id: "c", text: "The Temperance Movement" }
      ],
      correctChoiceId: "a",
      explanation: "The Ghost Dance was a religious revitalization movement promising the return of the buffalo and removal of white settlers, tragically suppressed at Wounded Knee in 1890."
    }
  ],
  "6.4": [
    {
      id: "6.4-newsouth",
      timestamp: 130,
      question: "亨利·格雷迪倡导的“新南方”（New South）运动虽然口号是实现工业化，但实际的南方农业现实是？",
      choices: [
        { id: "a", text: "南方黑人全部拥有了土地，实现了绝对经济独立" },
        { id: "b", text: "分成制（Sharecropping）和佃农制盛行，导致无数无地黑人和贫困白人被终身束缚在债务泥潭中，依然沦为廉价劳动力" },
        { id: "c", text: "棉花种植完全被高科技的自动收割机所替代" }
      ],
      correctChoiceId: "b",
      explanation: "尽管南方建造了一些纺织厂，但分成制的债务锁链使得南方的阶级与种族剥削体制在实质上以变形的方式延续了下来。"
    }
  ],
  "6.5": [
    {
      id: "6.5-tech",
      timestamp: 120,
      question: "这一时期爱迪生（Edison）的电力系统、贝尔的电话以及泰勒的“科学管理”（Taylorism）对生产模式的最大贡献是？",
      choices: [
        { id: "a", text: "彻底淘汰了所有的流水线装配工作" },
        { id: "b", text: "极大提高了工厂生产效率，延长了工作时间，并将管理和执行岗位彻底细化和标准化" },
        { id: "c", text: "鼓励工人在工厂内部实行民主自我决策" }
      ],
      correctChoiceId: "b",
      explanation: "技术的革新和泰勒制的推广使得资本主义流水线生产效率达到史无前例的高度，但也增加了工人的枯燥感。"
    }
  ],
  "6.6": [
    {
      id: "6.6-capitalism",
      timestamp: 175,
      question: "卡内基（钢王）、洛克菲勒（油王）等“托拉斯”垄断寡头合理化其垄断地位的意识形态支柱是？",
      choices: [
        { id: "a", text: "基督教社会主义和凯恩斯主义" },
        { id: "b", text: "社会达尔文主义（Social Darwinism）与自由放任主义（Laissez-Faire）" },
        { id: "c", text: "绝对平等的民粹主义精神" }
      ],
      correctChoiceId: "b",
      explanation: "达尔文适者生存的生物学理论被扭曲应用于人类社会，垄断精英以此论证富人是物竞天择的结果，政府不应插手经济。"
    }
  ],
  "6.7": [
    {
      id: "6.7-labor",
      timestamp: 160,
      question: "“骑士团”（Knights of Labor）与“美劳联”（AFL）在招收会员策略上的最大分野是什么？",
      choices: [
        { id: "a", text: "骑士团只招收熟练工；美劳联招收所有不分种族性别的工人" },
        { id: "b", text: "骑士团采取包容性策略（招收熟练、非熟练工、女工与黑人）；美劳联（由撒母耳·龚帕斯领导）则只专注于招收技术性白人熟练工" },
        { id: "c", text: "美劳联主张通过暴力起义推翻政府，骑士团则倡导和平游说" }
      ],
      correctChoiceId: "b",
      explanation: "骑士团在遭遇干草市场暴乱（Haymarket Riot）打击后崩溃，美劳联因聚焦于具体、切实的面包与黄油议题（工资、工时）而存活并壮大。"
    }
  ],
  "6.8": [
    {
      id: "6.8-immigration",
      timestamp: 140,
      question: "1880年代开始涌入北美的“新移民”（New Immigrants）在来源地和定居点上有什么特征？",
      choices: [
        { id: "a", text: "主要来自北欧和西欧地区，多数定居在西部农场" },
        { id: "b", text: "主要来自南欧和东欧（如意大利、波兰、俄罗斯）以及亚洲，大多定居在东北部和中西部的大城市工业区" },
        { id: "c", text: "大批定居在南方的棉花种植园中" }
      ],
      correctChoiceId: "b",
      explanation: "新移民的语言和宗教（天主教、东正教、犹太教）与老移民大不相同，他们在城市聚居区形成了唐人街、小意大利等特色社区。"
    }
  ],
  "6.9": [
    {
      id: "6.9-nativism",
      timestamp: 150,
      question: "1882 年美国国会通过的《排华法案》（Chinese Exclusion Act）在美国立法史上具有什么第一？",
      choices: [
        { id: "a", text: "这是美国历史上第一部完全因为特定种族和国籍而禁止其劳工入境的联邦法律" },
        { id: "b", text: "它是第一部规定非法移民需要承担死刑的法律" },
        { id: "c", text: "它是第一部废除了欧洲移民出生公民权的法律" }
      ],
      correctChoiceId: "a",
      explanation: "在加州本土排外主义和劳工竞争排挤的压力下通过的《排华法案》，标志着美国从“自由开放的移民国”转向“选择性限制”国家的开始。"
    }
  ],
  "6.10": [
    {
      id: "6.10-middleclass",
      timestamp: 110,
      question: "镀金时代中产阶级的崛起，如何直接重塑了美国的都市休闲消费文化？",
      choices: [
        { id: "a", text: "所有人重回清教徒式的克制与隐忍，杜绝任何娱乐" },
        { id: "b", text: "百货商店、大众报纸、职业体育（棒球）以及游乐园（如康尼岛）等现代消费主义和休闲活动的勃兴" },
        { id: "c", text: "都市中产阶级彻底放弃了工作，完全依靠购买国债过活" }
      ],
      correctChoiceId: "b",
      explanation: "可支配收入和闲暇时间的增加，促成了美国大众都市消费主义文化的诞生。"
    }
  ],
  "6.11": [
    {
      id: "6.11-reform",
      timestamp: 160,
      question: "简·亚当斯（Jane Addams）创立的“赫尔会所”（Hull House）代表了什么社会改革运动？其功能是？",
      choices: [
        { id: "a", text: "睦邻之家运动（Settlement House Movement），主要在贫民窟为新移民家庭提供语言、育儿、教育和融入社会的社区援助" },
        { id: "b", text: "支持彻底取缔工会的资本家联盟" },
        { id: "c", text: "旨在选举女性担任联邦最高法院法官的竞选班子" }
      ],
      correctChoiceId: "a",
      explanation: "睦邻之家是这一时期由接受过高等教育的女性主导的社会改良实验，是进步主义运动的先声。"
    }
  ],
  "6.12": [
    {
      id: "6.12-politics",
      timestamp: 180,
      question: "1890 年代民粹主义党（People's Party / Populists）之所以像野火般崛起，主要是因为他们代表了谁的诉求？其核心纲领是什么？",
      choices: [
        { id: "a", text: "代表了华尔街银行家，要求实施高关税 and 金本位制" },
        { id: "b", text: "代表了广大西部和南部的挣扎农场主，主张银币自由铸造（Bimetallism）以引发通胀缓解债务、政府监管铁路并开征累进所得税" },
        { id: "c", text: "代表了东部的工会，要求取缔全美所有的私人耕地" }
      ],
      correctChoiceId: "b",
      explanation: "民粹党代表了平民阶层对托拉斯和铁路垄断巨头的绝地反击，其纲领后来大多被进步主义运动吸收。"
    }
  ],
  "6.13": [
    {
      id: "6.13-continuity",
      timestamp: 190,
      question: "1896 年普莱西诉弗格森案（Plessy v. Ferguson）的判决，对美国社会制度造成了什么极其恶劣的影响？",
      choices: [
        { id: "a", text: "宣布奴隶制在整个南方地区全面复辟" },
        { id: "b", text: "确立了“隔离但平等”（Separate but Equal）的宪法合理性，使南方的“吉姆·克劳”种族隔离制度完全合法化" },
        { id: "c", text: "废除了第十四条修正案的公民权定义" }
      ],
      correctChoiceId: "b",
      explanation: "这一历史性的司法倒退让种族隔离获得了联邦宪法层面的尚方宝剑，南方的黑人权利跌落谷底。"
    }
  ]
};

export const unit7Checks: Record<string, VideoKnowledgeCheck[]> = {
  "7.1": [
    {
      id: "7.1-imperialism",
      timestamp: 140,
      question: "19 世纪末，推动美国走向海外帝国主义扩张的核心战略思想和经济动机是什么？",
      choices: [
        { id: "a", text: "阿尔弗雷德·马汉的“海权论”主张强大海军与海外基地，以及工业产能过剩急需寻找海外新原料和倾销市场" },
        { id: "b", text: "兑现帮助亚非拉国家彻底实现主权完全独立的承诺" },
        { id: "c", text: "彻底关闭与所有拉美和亚洲国家的任何商业贸易往来" }
      ],
      correctChoiceId: "a",
      explanation: "马汉的论著说服了老罗斯福等政客，而国内产能过剩的压力使得寻找海外中国等“大市场”成为共识。"
    }
  ],
  "7.2": [
    {
      id: "7.2-spanish-war",
      timestamp: 170,
      question: "1898 年美西战争被老罗斯福称为“一场精彩的小战争”，美国通过该战役攫取了哪些海外领土？",
      choices: [
        { id: "a", text: "夏威夷群岛、阿拉斯加与德克萨斯" },
        { id: "b", text: "菲律宾、波多黎各与关岛，并确立了对古巴的变相控制" },
        { id: "c", text: "彻底占领了墨西哥北部的大片农业耕地" }
      ],
      correctChoiceId: "b",
      explanation: "这场战争标志着美国打碎了西班牙的落日残梦，正式跨入拥有海外殖民地帝国的世界强国行列。"
    }
  ],
  "7.3": [
    {
      id: "7.3-progressives",
      timestamp: 155,
      question: "进步主义运动（Progressive Movement）与镀金时代自由放任主义的最根本哲学分野是什么？",
      choices: [
        { id: "a", text: "进步主义者主张政府应当积极介入、监管经济，通过立法消灭社会不公并扩大民主参与" },
        { id: "b", text: "进步主义者认为市场有强大的自我修复能力，政府应当绝对零干预" },
        { id: "c", text: "进步主义者主张完全消灭代议制政府，走向军事独裁" }
      ],
      correctChoiceId: "a",
      explanation: "进步主义者坚信政府应当担任改革社会、规管垄断的工具，出台了如食品药品安全、反托拉斯法等关键政策。"
    }
  ],
  "7.4": [
    {
      id: "7.4-wwi",
      timestamp: 150,
      question: "1917 年伍德罗·威尔逊（Woodrow Wilson）放弃中立宣布参加一战，其最具理想主义色彩的口号是？",
      choices: [
        { id: "a", text: "“美国要为民主安全而战（To make the world safe for democracy）”并主张基于“十四点和平原则”建立国联" },
        { id: "b", text: "“彻底消灭所有欧洲国家，使美国成为唯一的全球君主”" },
        { id: "c", text: "“捍卫英法两国的全球殖民扩张果实”" }
      ],
      correctChoiceId: "a",
      explanation: "威尔逊将参战赋予了神圣的理想色彩，其“十四点原则”和“民族自决”对二十世纪国际关系产生了深远影响。"
    }
  ],
  "7.5": [
    {
      id: "7.5-domestic",
      timestamp: 160,
      question: "一战期间，美国国内针对反战人士出台的严酷法令及其对宪法权利的影响是？",
      choices: [
        { id: "a", text: "出台《间谍法》和《煽动叛乱法》，最高法院在“申克诉合众国案”中确立了如果言论构成“明显且即刻的危险”则可被限制的原则" },
        { id: "b", text: "彻底宣布取缔所有的私人商业活动并实行全面配给制" },
        { id: "c", text: "废除了征兵制，全部改用高薪招募志愿兵" }
      ],
      correctChoiceId: "a",
      explanation: "战时集体主义使得国家权力极度膨胀，以国家安全为由严重压制了公民的言论自由表达权。"
    }
  ],
  "7.6": [
    {
      id: "7.6-innovations",
      timestamp: 120,
      question: "1920年代，亨利·福特的流水线技术与消费信贷的普及，如何重塑了美国的大众文化？",
      choices: [
        { id: "a", text: "使得汽车成为中产家庭标配，极大地促进了地理流动和全国同质化的广播及广告消费文化" },
        { id: "b", text: "导致绝大多数美国人陷入了前所未有的经济倒退" },
        { id: "c", text: "彻底消下了城乡之间的经济发展鸿沟" }
      ],
      correctChoiceId: "a",
      explanation: "流水线使T型车价格暴跌，汽车和收音机的普及使得美国历史上首次拥有了跨地域的统一大众消费体验。"
    }
  ],
  "7.7": [
    {
      id: "7.7-conservatism",
      timestamp: 165,
      question: "1925年的“猴子审判”（Scopes Monkey Trial）体现了 1920 年代美国社会哪些力量的激烈交锋？",
      choices: [
        { id: "a", text: "劳资双方对最低工资保障的斗争" },
        { id: "b", text: "都市现代主义与世俗科学文化 vs 农村传统基督教原教旨主义（Fundamentalism）在进化论教学上的文化对决" },
        { id: "c", text: "共和党与民主党关于是否应当重回金本位的辩论" }
      ],
      correctChoiceId: "b",
      explanation: "这一审判通过广播直播轰动全美，生动展现了当时现代科学思想与圣经字面主义之间无法调和的张力。"
    }
  ],
  "7.8": [
    {
      id: "7.8-depression",
      timestamp: 140,
      question: "1929年大萧条爆发的核心深层经济根源是？",
      choices: [
        { id: "a", text: "联邦政府征收了几乎 100% 的个人所得税" },
        { id: "b", text: "工农业产能过剩与贫富不均导致消费不足、信用投机泛滥以及胡佛政府在初期采取了不作为的自由放任态度" },
        { id: "c", text: "美国遭到了外部列强长达十年的联合经济封锁" }
      ],
      correctChoiceId: "b",
      explanation: "表面繁荣的20年代掩盖了购买力不足和信贷过度扩张的恶疾，最终导致了系统性的金融大崩溃。"
    }
  ],
  "7.9": [
    {
      id: "7.9-newdeal",
      timestamp: 185,
      question: "富兰克林·罗斯福（FDR）“新政”（New Deal）的三大核心支柱目标（3R）分别指什么？",
      choices: [
        { id: "a", text: "复兴（Recovery）、救济（Relief）与改革（Reform）" },
        { id: "b", text: "革命（Revolution）、扩张（Reconquest）与重建（Reconstruction）" },
        { id: "c", text: "回归（Return）、撤退（Retreat）与休整（Rest）" }
      ],
      correctChoiceId: "a",
      explanation: "3R 政策涵盖了对急需生存的失业平民实施直接救济、通过产业法案促进经济复兴以及通过建立社保（Social Security）和金融监管进行长远改革。"
    }
  ],
  "7.10": [
    {
      id: "7.10-interwar",
      timestamp: 135,
      question: "两次世界大战之间，面对法西斯势力的抬头，美国公众和国会的主流态度以及立法动作是？",
      choices: [
        { id: "a", text: "积极主张派出远征军干涉欧洲局势，全面介入海外防务" },
        { id: "b", text: "盛行孤立主义（Isolationism），国会通过一系列《中立法案》（Neutrality Acts）禁止向交战国运送武器或贷款" },
        { id: "c", text: "宣布与纳粹德国建立长久的军事同盟" }
      ],
      correctChoiceId: "b",
      explanation: "对一战伤亡的反思使美国社会弥漫着强烈的反战孤立情绪，试图彻底锁国以避免再次卷入泥潭。"
    }
  ],
  "7.11": [
    {
      id: "7.11-wwii-mobilization",
      timestamp: 150,
      question: "二战期间，由于大批青壮年男性走向战场，美国国内后方劳动力构成的重大变化是？",
      choices: [
        { id: "a", text: "彻底淘汰了所有的手工制造，完全依靠机械人生产" },
        { id: "b", text: "数百万妇女走上工厂生产线（以“铆工罗西”为象征），且非裔美国人大量向北方大都市迁移以参与战争工业生产" },
        { id: "c", text: "工厂全面陷入停摆，完全依赖向欧洲盟友购买军火" }
      ],
      correctChoiceId: "b",
      explanation: "战争动员彻底打破了原有的职场性别 and 种族界限，极大地重塑了战后平权运动的社会心理根基。"
    }
  ],
  "7.12": [
    {
      id: "7.12-wwii-military",
      timestamp: 160,
      question: "1944 年 6 月 6 日爆发的诺曼底登陆（D-Day）在欧洲战场的核心军事意义是？",
      choices: [
        { id: "a", text: "成功迫使意大利率先宣布无条件投降" },
        { id: "b", text: "盟军成功开辟了西线第二战场，使纳粹德国陷入了两线作战的绝境，加速了其灭亡" },
        { id: "c", text: "盟军首次动用了原子弹彻底摧毁了德军防御" }
      ],
      correctChoiceId: "b",
      explanation: "诺曼底登陆是战争史上最大规模的渡海登陆战，为解放西欧、直取柏林奠定了决定性基石。"
    }
  ],
  "7.13": [
    {
      id: "7.13-diplomacy",
      timestamp: 145,
      question: "1945 年雅尔塔会议（Yalta Conference）上，同盟国三巨头达成的战后秩序核心安排是？",
      choices: [
        { id: "a", text: "彻底废除联合国宪章草案" },
        { id: "b", text: "安排战后对德国实行分区占领、苏联承诺参加对日宣战，并讨论了波兰及东欧的战后政治安排" },
        { id: "c", text: "宣布由大英帝国全面接管欧洲大陆的全部主权" }
      ],
      correctChoiceId: "b",
      explanation: "雅尔塔会议是二战后期最重要的首脑会议，其妥协和领土划分实际上构成了冷战爆发前的基本势力格局。"
    }
  ],
  "7.14": [
    {
      id: "7.14-review",
      timestamp: 190,
      question: "总结二战对美国在世界格局中地位的影响，最准确的是？",
      choices: [
        { id: "a", text: "美国彻底破产，退出了所有国际多边舞台" },
        { id: "b", text: "美国成功走出了大萧条，本土未受战火摧残，工业产值爆表，成为拥有核垄断地位的无可争议的全球超级大国（Superpower）" },
        { id: "c", text: "美国沦为了苏联的附属属国" }
      ],
      correctChoiceId: "b",
      explanation: "战后美国凭借无与伦比的军事、金融和工业霸权，与苏联共同开启了两极称霸的冷战大幕。"
    }
  ]
};

export const unit8Checks: Record<string, VideoKnowledgeCheck[]> = {
  "8.1": [
    {
      id: "8.1-containment",
      timestamp: 160,
      question: "乔治·凯南提出的“遏制政策”（Containment）和“杜鲁门主义”（Truman Doctrine）的核心内涵是？",
      choices: [
        { id: "a", text: "誓言要用核武器彻底消灭苏联本土的共产主义政权" },
        { id: "b", text: "宣布在全球范围内通过提供军事与经济援助来阻止共产主义势力的向外扩张" },
        { id: "c", text: "放弃对欧洲的任何干涉，重回华盛顿的孤立主义路线" }
      ],
      correctChoiceId: "b",
      explanation: "“遏制”主张不主动与苏联开战以避免第三次世界大战，但坚决封锁其势力向自由世界的每一寸扩张，这也奠定了马歇尔计划和北约的建立。"
    }
  ],
  "8.2": [
    {
      id: "8.2-redscare",
      timestamp: 140,
      question: "1950年代初横扫美国的“麦卡锡主义”（McCarthyism）在实质上是指什么？",
      choices: [
        { id: "a", text: "一种对科学与现代文明的极端赞美" },
        { id: "b", text: "麦卡锡参议员利用公众对共产主义渗透的恐惧，在毫无确凿证据的情况下进行疯狂指控和政治清洗，造成了严重的国内白色恐怖" },
        { id: "c", text: "彻底废除了美国的两党制度" }
      ],
      correctChoiceId: "b",
      explanation: "麦卡锡主义是冷战初期的极端表现，对言论自由和无数进步学者造成了毁灭性打击。"
    }
  ],
  "8.3": [
    {
      id: "8.3-economy",
      timestamp: 130,
      question: "战后五十年代美国经济和居住版图最突出的结构性变化是？",
      choices: [
        { id: "a", text: "出现“婴儿潮”（Baby Boom）、中产阶级激增，大批家庭借助《退伍军人法案》迁往郊区排屋（以 Levittown 为代表）" },
        { id: "b", text: "都市化进程彻底崩溃，全国人口倒退回自耕农庄园" },
        { id: "c", text: "汽车和房屋的私人所有权遭到禁止，推行集体公寓" }
      ],
      correctChoiceId: "a",
      explanation: "战后婴儿潮、州际高速公路的铺设和郊区化，彻底塑造了二战后典型的中产阶级“美国梦”生活方式。"
    }
  ],
  "8.4": [
    {
      id: "8.4-culture",
      timestamp: 120,
      question: "在 1950 年代一片中产阶级“合流与顺从”（Conformity）的文化主旋律中，以哪些力量为代表对这种生活提出了挑战？",
      choices: [
        { id: "a", text: "极力鼓吹回到清教徒时代的禁欲文学" },
        { id: "b", text: "“垮掉的一代”作家（Beat Generation，如杰克·凯鲁亚克）的叛逆文学和早期摇滚乐（Rock and Roll，如猫王）的爆发" },
        { id: "c", text: "彻底退回到默片的无声电影艺术" }
      ],
      correctChoiceId: "b",
      explanation: "叛逆文学和黑人布鲁斯演化来的摇滚乐，为六十年代更大规模的青年反文化运动（Counterculture）埋下了火种。"
    }
  ],
  "8.5": [
    {
      id: "8.5-civilrights-early",
      timestamp: 155,
      question: "1954 年最高法院在“布朗诉托皮卡教育委员会案”（Brown v. Board of Education）中做出的历史性判决是？",
      choices: [
        { id: "a", text: "宣布重申“隔离但平等”的原则在学校教育中依然完全适用" },
        { id: "b", text: "宣布公立学校中的种族隔离法违宪，推翻了普莱西案的隔离合法性，要求以“最快速度”实现学校的去隔离化" },
        { id: "c", text: "强制取消了白人的选举权以补偿黑人" }
      ],
      correctChoiceId: "b",
      explanation: "这一历史性胜利拉开了现代黑人民权运动（Civil Rights Movement）的大幕，遭到了南方白人种族主义者的疯狂抵制。"
    }
  ],
  "8.6": [
    {
      id: "8.6-vietnam",
      timestamp: 170,
      question: "随着越战的不断升级，1968 年新出现的什么现象彻底撕裂了美国国内的舆论和政治？",
      choices: [
        { id: "a", text: "电视新闻直接展现前线惨烈的战斗，导致政府说辞与战场真相之间出现巨大的“公信力鸿沟”（Credibility Gap），引爆了轰轰烈烈的反战抗议" },
        { id: "b", text: "美国陆军几乎全部加入了北越军队倒戈相向" },
        { id: "c", text: "废除了所有的征兵制，导致战场兵员极度匮乏" }
      ],
      correctChoiceId: "a",
      explanation: "越战是第一场通过电视画面直呈全美客厅的战争，“春节攻势”的惨烈画面让公众意识到政府关于“胜利在望”的说辞完全是谎言。"
    }
  ],
  "8.7": [
    {
      id: "8.7-greatsociety",
      timestamp: 160,
      question: "林登·约翰逊总统推出的“伟大社会”（Great Society）改革，在哪些领域实现了新政以来最大规模的联邦社会保障扩张？",
      choices: [
        { id: "a", text: "建立了联邦医疗保险（Medicare/Medicaid）、出台民权法案、发起“向贫困宣战”（War on Poverty）和废除排华法案的移民法改革" },
        { id: "b", text: "宣布全国范围内实现完全的公有制医疗和免费住房分配" },
        { id: "c", text: "废除了所有的联邦税收，将权力完全交还地方" }
      ],
      correctChoiceId: "a",
      explanation: "伟大社会极大健全了美国的社会安全福利网，但由于越战巨额军费的掣肘，改革资金最终被迫缩减。"
    }
  ],
  "8.8": [
    {
      id: "8.8-civilrights-peak",
      timestamp: 150,
      question: "马丁·路德·金（MLK）倡导的“非暴力不合作”（Nonviolent Civil Disobedience）理念在 1964 和 1965 年催生了哪两部具有奠基意义的联邦立法？",
      choices: [
        { id: "a", text: "《1964 年民权法案》废除一切公共设施的种族隔离；《1965 年选举权法案》废除南方的识字测试，切实保障黑人投票权" },
        { id: "b", text: "废除十四修正案的法案和允许南卡罗来纳退联的法案" },
        { id: "c", text: "宣布在全美公立学校全面复辟白人单一种族的法案" }
      ],
      correctChoiceId: "a",
      explanation: "这些法案切断了南方制度化种族隔离的法律根基，是民权斗争史上的里程碑巅峰。"
    }
  ],
  "8.9": [
    {
      id: "8.9-civilrights-expands",
      timestamp: 140,
      question: "受到黑人民权运动的鼓舞，这一时期还崛起了哪些平权斗争？其领袖与标志性事件是？",
      choices: [
        { id: "a", text: "凯萨·查维斯领导的墨西哥裔农工联合罢工，以及女性争取平等权利宪法修正案（ERA）和以“石墙暴动”为起点的同性恋平权运动" },
        { id: "b", text: "主张重新奴役黑人的激进白人保守运动" },
        { id: "c", text: "旨在消除所有女性在工作岗位之外受教育权的运动" }
      ],
      correctChoiceId: "a",
      explanation: "六七十年代是人权思潮风起云涌的时代，红权（印第安）、黄权（亚裔）、棕权（墨裔）、女权和LGBTQ运动交相呼应。"
    }
  ],
  "8.10": [
    {
      id: "8.10-youth",
      timestamp: 135,
      question: "1960年代后期的“反文化”（Counterculture）运动中，嬉皮士（Hippies）青年所倡导的叛逆生活方式体现了对什么价值观的挑战？",
      choices: [
        { id: "a", text: "极端尊崇传统宗教和冷战军国主义" },
        { id: "b", text: "反对中产阶级的消费主义、反思冷战越战、追求性解放、摇滚乐并尝试公社式生活" },
        { id: "c", text: "主张退回中世纪封建领主社会" }
      ],
      correctChoiceId: "b",
      explanation: "反文化运动是美国战后“婴儿潮”一代传统意识觉醒对父母保守中产生活方式的全面挑战。"
    }
  ],
  "8.11": [
    {
      id: "8.11-environment",
      timestamp: 120,
      question: "1962年蕾切尔·卡森（Rachel Carson）发表的著作《寂静的春天》（Silent Spring），如何直接推动了现代环保运动的发展？",
      choices: [
        { id: "a", text: "它揭露了化学农药对生态和人类健康的巨大破坏，直接催生了 1970 年的首个“地球日”和联邦环保署（EPA）的建立" },
        { id: "b", text: "它论证了工业废气有利于作物的光合作用" },
        { id: "c", text: "它主张禁止人类在西部进行任何形式的居住与耕种" }
      ],
      correctChoiceId: "a",
      explanation: "《寂静的春天》被视为现代环境科学与环保运动 of 启蒙之作，极大地唤醒了公众对化学污染的反思。"
    }
  ],
  "8.12": [
    {
      id: "8.12-transition",
      timestamp: 160,
      question: "1970年代，美国经济陷入了前所未有的“滞胀”（Stagflation）危机，其表现和导火索是？",
      choices: [
        { id: "a", text: "100% 的完全通货紧缩，工人工资暴涨" },
        { id: "b", text: "高失业率与高通货膨胀并存，由中东战争爆发引起的石油危机导致能源价格暴涨" },
        { id: "c", text: "联邦储备局彻底停摆" }
      ],
      correctChoiceId: "b",
      explanation: "石油危机直接刺破了战后经济繁荣的泡沫，使得依赖廉价能源的美国工业和生活方式遭遇了重创。"
    }
  ],
  "8.13": [
    {
      id: "8.13-review",
      timestamp: 180,
      question: "经历越战的失败、水门事件（Watergate）以及经济滞胀，1970 年代末美国社会心理跌入谷底，这一时期最具象征性的危机事件是？",
      choices: [
        { id: "a", text: "珍珠港事件的爆发" },
        { id: "b", text: "持续长达 444 天的伊朗人质危机（Iran Hostage Crisis）以及卡特总统发表坦承国家失去信心和陷入迷茫的“ malaise ”演说" },
        { id: "c", text: "华盛顿遭到苏联核潜艇的围攻" }
      ],
      correctChoiceId: "b",
      explanation: "伊朗人质危机使美国感到在中东面前束手无策，卡特的危机演说虽然坦诚，但进一步加剧了民众对民主党政府软弱的失望，为里根保守主义崛起铺平了道路。"
    }
  ]
};

export const unit9Checks: Record<string, VideoKnowledgeCheck[]> = {
  "9.1": [
    {
      id: "9.1-context",
      timestamp: 140,
      question: "20世纪80年代以来，重塑美国政治形态和社会思潮的最核心事件是？",
      choices: [
        { id: "a", text: "新保守主义（New Conservatism）和新右翼运动的狂飙崛起，以及信息技术革命和经济全球化的深化" },
        { id: "b", text: "宣布重回绝对的中立锁国状态" },
        { id: "c", text: "废除了资本主义，转向全面国有化的社会主义经济" }
      ],
      correctChoiceId: "a",
      explanation: "保守主义重新界定了政府与市场的关系，而硅谷的信息化革命将美国拉入了跨国全球供应链网。"
    }
  ],
  "9.2": [
    {
      id: "9.2-reagan",
      timestamp: 160,
      question: "“里根经济学”（Reaganomics / Supply-Side Economics）的核心三板斧政策是？",
      choices: [
        { id: "a", text: "大幅加税、大规模扩大政府对公营企业的投资以及加强对华尔街的规管" },
        { id: "b", text: "大幅削减个人和企业所得税（减税）、放宽对商业的政府规管（Deregulation）、削减社会福利开支，并大幅增加国防预算" },
        { id: "c", text: "强制推行金本位制并宣布将所有工会收归国有" }
      ],
      correctChoiceId: "b",
      explanation: "供给学派认为降低富人和企业税率能刺激投资（即“滴漏理论”），该政策极大地改变了战后自由主义的经济路线。"
    }
  ],
  "9.3": [
    {
      id: "9.3-coldwar-end",
      timestamp: 170,
      question: "1989 年东欧剧变、柏林墙倒塌以及 1991 年苏联解体，冷战的终结在外交战略上给美国带来了什么转变？",
      choices: [
        { id: "a", text: "美国彻底失去了任何海外盟友，陷入大破产" },
        { id: "b", text: "宣告美国成为全球唯一的超级大国（Unipolar Moment），美国开始探索在一极格局中如何担当“世界警察”和应对多极化挑战" },
        { id: "c", text: "宣告苏联吞并了整个西欧" }
      ],
      correctChoiceId: "b",
      explanation: "苏联解体意味着冷战对峙体制的结束，美国在海湾战争中确立了无可置疑的常规军事和科技主导地位。"
    }
  ],
  "9.4": [
    {
      id: "9.4-economy-change",
      timestamp: 150,
      question: "20 世纪 90 年代以来，随着制造业的大规模外包 and 互联网技术的爆发，美国劳动力结构最大的转变是？",
      choices: [
        { id: "a", text: "传统蓝领制造业岗位锐减，以互联网、高科技、金融和医疗等为代表的“服务与信息业”岗位成为绝对主导" },
        { id: "b", text: "农业人口重新占据了全国 90% 以上的比例" },
        { id: "c", text: "彻底消除了所有的白领岗位" }
      ],
      correctChoiceId: "a",
      explanation: "这一转型极大地富裕了硅谷和东部金融中心，但也导致了中西部传统“铁锈带”（Rust Belt）蓝领工人的相对贫困与社会失落。"
    }
  ],
  "9.5": [
    {
      id: "9.5-migration",
      timestamp: 140,
      question: "1965 年移民法实施几十年后，到 21 世纪初，美国新增移民的主要来源地发生了什么重大结构性转变？",
      choices: [
        { id: "a", text: "依然有 90% 以上来自北欧和西欧地区" },
        { id: "b", text: "拉丁美洲（特别是墨西哥）和亚洲裔移民成为增长最快的主体，极大地丰富了美国的人口多元度并引发了关于边境管控的激烈辩论" },
        { id: "c", text: "非洲黑人移民彻底取代了所有其他族裔的增长" }
      ],
      correctChoiceId: "b",
      explanation: "新移民的涌入彻底改变了美国的族裔政治和选民结构，使得拉丁裔成为美国人数最多的少数族裔。"
    }
  ],
  "9.6": [
    {
      id: "9.6-challenges",
      timestamp: 160,
      question: "2001 年“9·11事件”爆发后，美国在国家安全与外交领域实施了哪些重塑全球政治的重大动作？",
      choices: [
        { id: "a", text: "发起“反恐战争”（War on Terror），出兵阿富汗和伊拉克，在国内出台《爱国者法案》加强对公民的通信和安全审查" },
        { id: "b", text: "宣布彻底裁撤中情局和五角大楼" },
        { id: "c", text: "宣布加入反美同盟以自保" }
      ],
      correctChoiceId: "a",
      explanation: "反恐战争使得国家安全机构权力空前膨胀，也让美国陷入了中东长达二十年的“治安战泥潭”，并在国内引发了国家安全 vs 个人隐私的宪法争论。"
    }
  ],
  "9.7": [
    {
      id: "9.7-causation",
      timestamp: 180,
      question: "回顾冷战结束以来的美国现代历史，导致当今美国社会内部极化（Polarization）日益加剧的主要因素是？",
      choices: [
        { id: "a", text: "各州在宪法解释上重新主张完全分裂独立" },
        { id: "b", text: "全球化与科技转型导致的贫富差距拉大、跨国移民引发的文化认同焦虑，以及多媒体和社交媒体时代的“信息茧房”及两党阵营对立" },
        { id: "c", text: "宣布彻底废除两党竞争，实行一党专政" }
      ],
      correctChoiceId: "b",
      explanation: "经济转型带来的不平等、社交媒体放大的对立情绪以及人口结构的急剧变化，使得当代美国政治在医疗、枪支、堕胎、边境等议题上呈现前所未有的撕裂。"
    }
  ]
};

const videoByTopic: Record<string, TopicVideo> = {
  "1.1": {
    overseas: {
      embed: youtubeVideo("jqf_c9Pw8gs"),
      link: youtubeVideo("jqf_c9Pw8gs"),
      durationLabel: "Heimler APUSH Unit 1 playlist - review video",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.1"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(1),
      durationLabel: "Bilibili Heimler APUSH Topic 1.1",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.1"],
    },
  },
  "1.2": {
    overseas: {
      embed: youtubeVideo("X_3bH6FJsLA"),
      link: youtubeVideo("X_3bH6FJsLA"),
      durationLabel: "Heimler Unit 1 Topic 1.2 - 6:06",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.2"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(2),
      durationLabel: "Bilibili Heimler APUSH Topic 1.2",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.2"],
    },
  },
  "1.3": {
    overseas: {
      embed: youtubeVideo("TRrnYm_SwHc"),
      link: youtubeVideo("TRrnYm_SwHc"),
      durationLabel: "Heimler Unit 1 Topic 1.3 - 3:44",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.3"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(3),
      durationLabel: "Bilibili Heimler APUSH Topic 1.3",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.3"],
    },
  },
  "1.4": {
    overseas: {
      embed: youtubeVideo("eLGxEcr-chw"),
      link: youtubeVideo("eLGxEcr-chw"),
      durationLabel: "Heimler Unit 1 Topic 1.4 - 5:38",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.4"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(4),
      durationLabel: "Bilibili Heimler APUSH Topic 1.4",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.4"],
    },
  },
  "1.5": {
    overseas: {
      embed: youtubeVideo("f1h-9W2Snik"),
      link: youtubeVideo("f1h-9W2Snik"),
      durationLabel: "Heimler Unit 1 Topic 1.5 - 6:25",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.5"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(5),
      durationLabel: "Bilibili Heimler APUSH Topic 1.5",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.5"],
    },
  },
  "1.6": {
    overseas: {
      embed: youtubeVideo("s6hfwcgHvRY"),
      link: youtubeVideo("s6hfwcgHvRY"),
      durationLabel: "Heimler Unit 1 Topic 1.6 - 5:43",
      sourceLabel: "Open Unit 1 playlist",
      videoChecks: unit1Checks["1.6"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(6),
      durationLabel: "Bilibili Heimler APUSH Topic 1.6",
      sourceLabel: "Open Bilibili",
      videoChecks: unit1Checks["1.6"],
    },
  },
  "2.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Bq1o54lH190",
      link: "https://www.youtube.com/watch?v=Bq1o54lH190",
      durationLabel: "Heimler APUSH Topic 2.2 - European Colonization",
      sourceLabel: "Open Heimler's History",
      videoChecks: unit2Checks["2.1"],
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=2",
      embed: bilibiliCrashCourse(2),
      durationLabel: "Crash Course US History Ep 2: Colonizing America",
      sourceLabel: "Open Bilibili Crash Course",
      videoChecks: unit2Checks["2.1"],
    },
  },
  "2.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=9_j32V2c5v0",
      link: "https://www.youtube.com/watch?v=9_j32V2c5v0",
      durationLabel: "Heimler APUSH Topic 2.4 - Transatlantic Trade",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=4",
      embed: bilibiliCrashCourse(4),
      durationLabel: "Crash Course US History Ep 4: Quakers, Dutch, and Ladies",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Fq_z-U3D9m0",
      link: "https://www.youtube.com/watch?v=Fq_z-U3D9m0",
      durationLabel: "Heimler APUSH Topic 2.3 - Regions of British Colonies",
      sourceLabel: "Open Heimler's History",
      videoChecks: unit2Checks["2.3"],
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=4",
      embed: bilibiliCrashCourse(4),
      durationLabel: "Crash Course US History Ep 4: Quakers, Dutch, and Ladies",
      sourceLabel: "Open Bilibili Crash Course",
      videoChecks: unit2Checks["2.3"],
    },
  },
  "2.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Z6pT-0S279o",
      link: "https://www.youtube.com/watch?v=Z6pT-0S279o",
      durationLabel: "Heimler APUSH Topic 2.7 - Colonial Society and Culture",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=4",
      embed: bilibiliCrashCourse(4),
      durationLabel: "Crash Course US History Ep 4: Quakers, Dutch, and Ladies",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Z6pT-0S279o",
      link: "https://www.youtube.com/watch?v=Z6pT-0S279o",
      durationLabel: "Heimler APUSH Topic 2.7 - Colonial Society and Culture",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=5",
      embed: bilibiliCrashCourse(5),
      durationLabel: "Crash Course US History Ep 5: Seven Years War & Great Awakening",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=uH5N8j0Z1_w",
      link: "https://www.youtube.com/watch?v=uH5N8j0Z1_w",
      durationLabel: "Heimler APUSH Topic 2.5 - European & Native Interactions",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=3",
      embed: bilibiliCrashCourse(3),
      durationLabel: "Crash Course US History Ep 3: The Natives and the English",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=V3l_610kU_U",
      link: "https://www.youtube.com/watch?v=V3l_610kU_U",
      durationLabel: "Heimler APUSH Topic 2.6 - Slavery in the Colonies",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=4",
      embed: bilibiliCrashCourse(4),
      durationLabel: "Crash Course US History Ep 4: Quakers, Dutch, and Ladies",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kU1j4jU6l-U",
      link: "https://www.youtube.com/watch?v=kU1j4jU6l-U",
      durationLabel: "Heimler APUSH Topic 2.8 - Comparison in Period 2",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=4",
      embed: bilibiliCrashCourse(4),
      durationLabel: "Crash Course US History Ep 4: Quakers, Dutch, and Ladies",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "2.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kU1j4jU6l-U",
      link: "https://www.youtube.com/watch?v=kU1j4jU6l-U",
      durationLabel: "Heimler APUSH Unit 2 Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: "https://www.bilibili.com/video/BV1ix411h7kC?p=5",
      embed: bilibiliCrashCourse(5),
      durationLabel: "Crash Course US History Ep 5: Seven Years War & Great Awakening",
      sourceLabel: "Open Bilibili Crash Course",
    },
  },
  "3.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s5F4j_Yy-f8",
      link: "https://www.youtube.com/watch?v=s5F4j_Yy-f8",
      durationLabel: "Heimler APUSH Topic 3.1 - Seven Years' War Context",
      sourceLabel: "Open Heimler's History",
      videoChecks: unit3Checks["3.1"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(26),
      durationLabel: "Bilibili AP Daily Topic 3.1",
      sourceLabel: "Open Bilibili",
      videoChecks: unit3Checks["3.1"],
    },
  },
  "3.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=840C_iLwWic",
      link: "https://www.youtube.com/watch?v=840C_iLwWic",
      durationLabel: "Heimler APUSH Topic 3.2 - Taxation Without Representation",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(28),
      durationLabel: "Bilibili AP Daily Topic 3.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=3-EwLleE90s",
      link: "https://www.youtube.com/watch?v=3-EwLleE90s",
      durationLabel: "Heimler APUSH Topic 3.3 - Philosophical Foundations",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(31),
      durationLabel: "Bilibili AP Daily Topic 3.3",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=pD4J9gM-m_w",
      link: "https://www.youtube.com/watch?v=pD4J9gM-m_w",
      durationLabel: "Heimler APUSH Topic 3.4 - The American Revolution",
      sourceLabel: "Open Heimler's History",
      videoChecks: unit3Checks["3.4"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(34),
      durationLabel: "Bilibili AP Daily Topic 3.4",
      sourceLabel: "Open Bilibili",
      videoChecks: unit3Checks["3.4"],
    },
  },
  "3.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=f-B5f7E4Euo",
      link: "https://www.youtube.com/watch?v=f-B5f7E4Euo",
      durationLabel: "Heimler APUSH Topic 3.5 - Influence of Revolutionary Ideals",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(36),
      durationLabel: "Bilibili AP Daily Topic 3.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=wP6Msw4K624",
      link: "https://www.youtube.com/watch?v=wP6Msw4K624",
      durationLabel: "Heimler APUSH Topic 3.6 - Articles of Confederation",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(39),
      durationLabel: "Bilibili AP Daily Topic 3.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=D-w-wQ6-sM4",
      link: "https://www.youtube.com/watch?v=D-w-wQ6-sM4",
      durationLabel: "Heimler APUSH Topic 3.7 - Constitutional Convention & Ratification",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(41),
      durationLabel: "Bilibili AP Daily Topic 3.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=k4uD6Z5V3H0",
      link: "https://www.youtube.com/watch?v=k4uD6Z5V3H0",
      durationLabel: "Heimler APUSH Topic 3.8 - The Constitution Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(44),
      durationLabel: "Bilibili AP Daily Topic 3.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=1-3K46d3y2Y",
      link: "https://www.youtube.com/watch?v=1-3K46d3y2Y",
      durationLabel: "Heimler APUSH Topic 3.9 - Shaping a New Republic",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(47),
      durationLabel: "Bilibili AP Daily Topic 3.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=FqK0e-ZpQ_s",
      link: "https://www.youtube.com/watch?v=FqK0e-ZpQ_s",
      durationLabel: "Heimler APUSH Topic 3.10 - Developing American Identity",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(50),
      durationLabel: "Bilibili AP Daily Topic 3.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "3.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=VzZk34Z6G7w",
      link: "https://www.youtube.com/watch?v=VzZk34Z6G7w",
      durationLabel: "Heimler APUSH Topic 3.11 - Movement in the Early Republic",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(52),
      durationLabel: "Bilibili AP Daily Topic 3.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=13-qXm9X31w",
      link: "https://www.youtube.com/watch?v=13-qXm9X31w",
      durationLabel: "Heimler APUSH Topic 4.1 - Era of Jefferson Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(59),
      durationLabel: "Bilibili AP Daily Topic 4.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=F522P9l6_1o",
      link: "https://www.youtube.com/watch?v=F522P9l6_1o",
      durationLabel: "Heimler APUSH Topic 4.2 - America on World Stage",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(64),
      durationLabel: "Bilibili AP Daily Topic 4.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=F522P9l6_1o",
      link: "https://www.youtube.com/watch?v=F522P9l6_1o",
      durationLabel: "Heimler APUSH Topic 4.3 - Regional Interests",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(62),
      durationLabel: "Bilibili AP Daily Topic 4.3",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=e_sP0gD2Ff4",
      link: "https://www.youtube.com/watch?v=e_sP0gD2Ff4",
      durationLabel: "Heimler APUSH Topic 4.4 - Market Revolution",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(66),
      durationLabel: "Bilibili AP Daily Topic 4.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=e_sP0gD2Ff4",
      link: "https://www.youtube.com/watch?v=e_sP0gD2Ff4",
      durationLabel: "Heimler APUSH Topic 4.5 - Market Revolution Impact",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(69),
      durationLabel: "Bilibili AP Daily Topic 4.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=f-B5f7E4Euo",
      link: "https://www.youtube.com/watch?v=f-B5f7E4Euo",
      durationLabel: "Heimler APUSH Topic 4.6 - Expanding Democracy",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(71),
      durationLabel: "Bilibili AP Daily Topic 4.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=13-qXm9X31w",
      link: "https://www.youtube.com/watch?v=13-qXm9X31w",
      durationLabel: "Heimler APUSH Topic 4.7 - Jackson & Federal Power",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(73),
      durationLabel: "Bilibili AP Daily Topic 4.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      link: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      durationLabel: "Heimler APUSH Topic 4.8 - Development of American Culture",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(75),
      durationLabel: "Bilibili AP Daily Topic 4.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      link: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      durationLabel: "Heimler APUSH Topic 4.9 - Second Great Awakening",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(76),
      durationLabel: "Bilibili AP Daily Topic 4.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      link: "https://www.youtube.com/watch?v=p4dFhH2-1D0",
      durationLabel: "Heimler APUSH Topic 4.10 - An Age of Reform",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(77),
      durationLabel: "Bilibili AP Daily Topic 4.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=7uK5K0v1mOQ",
      link: "https://www.youtube.com/watch?v=7uK5K0v1mOQ",
      durationLabel: "Heimler APUSH Topic 4.11 - African Americans in Early Republic",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(79),
      durationLabel: "Bilibili AP Daily Topic 4.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "4.12": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=7uK5K0v1mOQ",
      link: "https://www.youtube.com/watch?v=7uK5K0v1mOQ",
      durationLabel: "Heimler APUSH Topic 4.12 - Southern Society Context",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(81),
      durationLabel: "Bilibili AP Daily Topic 4.12",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=YfPz-jQeE3o",
      link: "https://www.youtube.com/watch?v=YfPz-jQeE3o",
      durationLabel: "Heimler APUSH Topic 5.1 - Manifest Destiny Context",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(87),
      durationLabel: "Bilibili AP Daily Topic 5.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=YfPz-jQeE3o",
      link: "https://www.youtube.com/watch?v=YfPz-jQeE3o",
      durationLabel: "Heimler APUSH Topic 5.2 - Mexican-American War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(89),
      durationLabel: "Bilibili AP Daily Topic 5.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=uK4O_nQ5D6s",
      link: "https://www.youtube.com/watch?v=uK4O_nQ5D6s",
      durationLabel: "Heimler APUSH Topic 5.3 - Compromise of 1850",
      sourceLabel: "Open Heimler's History",
      videoChecks: unit5Checks["5.3"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(90),
      durationLabel: "Bilibili AP Daily Topic 5.3",
      sourceLabel: "Open Bilibili",
      videoChecks: unit5Checks["5.3"],
    },
  },
  "5.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=uK4O_nQ5D6s",
      link: "https://www.youtube.com/watch?v=uK4O_nQ5D6s",
      durationLabel: "Heimler APUSH Topic 5.4 - Sectional Conflict Regional",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(91),
      durationLabel: "Bilibili AP Daily Topic 5.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Topic 5.5 - Failure of Compromise Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(93),
      durationLabel: "Bilibili AP Daily Topic 5.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Topic 5.6 - Election of 1860 & Secession",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(94),
      durationLabel: "Bilibili AP Daily Topic 5.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=YpLg51a1j34",
      link: "https://www.youtube.com/watch?v=YpLg51a1j34",
      durationLabel: "Heimler APUSH Topic 5.7 - Military Conflict Civil War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(95),
      durationLabel: "Bilibili AP Daily Topic 5.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=YpLg51a1j34",
      link: "https://www.youtube.com/watch?v=YpLg51a1j34",
      durationLabel: "Heimler APUSH Topic 5.8 - Government Policies during War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(96),
      durationLabel: "Bilibili AP Daily Topic 5.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Topic 5.9 - Reconstruction Policies",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(97),
      durationLabel: "Bilibili AP Daily Topic 5.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Topic 5.10 - Failure of Reconstruction",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(98),
      durationLabel: "Bilibili AP Daily Topic 5.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "5.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Topic 5.11 - Period 5 Review Summary",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(99),
      durationLabel: "Bilibili AP Daily Topic 5.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "unit5progresscheck": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      link: "https://www.youtube.com/watch?v=kR0u88Q79_4",
      durationLabel: "Heimler APUSH Unit 5 Complete Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(99),
      durationLabel: "Bilibili AP Daily Unit 5 Review",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 6.1 - Gilded Age Contextualization",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(101),
      durationLabel: "Bilibili AP Daily Topic 6.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=X_3bH6FJsLA",
      link: "https://www.youtube.com/watch?v=X_3bH6FJsLA",
      durationLabel: "Heimler APUSH Topic 6.2 - Economic Development in the West",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(102),
      durationLabel: "Bilibili AP Daily Topic 6.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=OAva-iSREpA",
      link: "https://www.youtube.com/watch?v=OAva-iSREpA",
      durationLabel: "Heimler APUSH Unit 6 Topic 6.3 - 5:24",
      sourceLabel: "Open Topic 6.3 video",
      videoChecks: unit6Checks["6.3"],
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(103),
      durationLabel: "Bilibili AP Daily Topic 6.3",
      sourceLabel: "Open Bilibili",
      videoChecks: unit6Checks["6.3"],
    },
  },
  "6.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 6.4 - The 'New South'",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(104),
      durationLabel: "Bilibili AP Daily Topic 6.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=2SgYvNmsJns",
      link: "https://www.youtube.com/watch?v=2SgYvNmsJns",
      durationLabel: "Heimler APUSH Topic 6.5 - Technological Innovation",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(105),
      durationLabel: "Bilibili AP Daily Topic 6.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s6hfwcgHvRY",
      link: "https://www.youtube.com/watch?v=s6hfwcgHvRY",
      durationLabel: "Heimler APUSH Topic 6.6 - Rise of Industrial Capitalism",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(106),
      durationLabel: "Bilibili AP Daily Topic 6.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=f1h-9W2Snik",
      link: "https://www.youtube.com/watch?v=f1h-9W2Snik",
      durationLabel: "Heimler APUSH Topic 6.7 - Labor in the Gilded Age",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(107),
      durationLabel: "Bilibili AP Daily Topic 6.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=eLGxEcr-chw",
      link: "https://www.youtube.com/watch?v=eLGxEcr-chw",
      durationLabel: "Heimler APUSH Topic 6.8 - Gilded Age Immigration",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(109),
      durationLabel: "Bilibili AP Daily Topic 6.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=jqf_c9Pw8gs",
      link: "https://www.youtube.com/watch?v=jqf_c9Pw8gs",
      durationLabel: "Heimler APUSH Topic 6.9 - Nativism & Immigration Responses",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(112),
      durationLabel: "Bilibili AP Daily Topic 6.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=TRrnYm_SwHc",
      link: "https://www.youtube.com/watch?v=TRrnYm_SwHc",
      durationLabel: "Heimler APUSH Topic 6.10 - Gilded Age Middle Class",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(114),
      durationLabel: "Bilibili AP Daily Topic 6.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Xn7jL4oQc2Y",
      link: "https://www.youtube.com/watch?v=Xn7jL4oQc2Y",
      durationLabel: "Heimler APUSH Topic 6.11 - Gilded Age Reform",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(116),
      durationLabel: "Bilibili AP Daily Topic 6.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.12": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 6.12 - Role of Government Controversies",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(118),
      durationLabel: "Bilibili AP Daily Topic 6.12",
      sourceLabel: "Open Bilibili",
    },
  },
  "6.13": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=OAva-iSREpA",
      link: "https://www.youtube.com/watch?v=OAva-iSREpA",
      durationLabel: "Heimler APUSH Topic 6.13 - Period 6 Review",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(122),
      durationLabel: "Bilibili AP Daily Topic 6.13",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.1 - Imperialism Contextualization",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(124),
      durationLabel: "Bilibili AP Daily Topic 7.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.2 - Spanish-American War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(125),
      durationLabel: "Bilibili AP Daily Topic 7.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Xn7jL4oQc2Y",
      link: "https://www.youtube.com/watch?v=Xn7jL4oQc2Y",
      durationLabel: "Heimler APUSH Topic 7.3 - Progressive Reformers",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(126),
      durationLabel: "Bilibili AP Daily Topic 7.3",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.4 - WWI Military & Diplomatic",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(128),
      durationLabel: "Bilibili AP Daily Topic 7.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.5 - WWI Domestic Front",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(130),
      durationLabel: "Bilibili AP Daily Topic 7.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.6 - 1920s Technology & Communication",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(132),
      durationLabel: "Bilibili AP Daily Topic 7.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.7 - 1920s Conservatism & Controversies",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(133),
      durationLabel: "Bilibili AP Daily Topic 7.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.8 - Great Depression Causes",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(135),
      durationLabel: "Bilibili AP Daily Topic 7.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.9 - The New Deal Response",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(137),
      durationLabel: "Bilibili AP Daily Topic 7.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.10 - Interwar Foreign Policy",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(140),
      durationLabel: "Bilibili AP Daily Topic 7.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.11 - WWII Domestic Mobilization",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(141),
      durationLabel: "Bilibili AP Daily Topic 7.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.12": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.12 - WWII Military Campaigns",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(143),
      durationLabel: "Bilibili AP Daily Topic 7.12",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.13": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.13 - Postwar Diplomacy & Order",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(145),
      durationLabel: "Bilibili AP Daily Topic 7.13",
      sourceLabel: "Open Bilibili",
    },
  },
  "7.14": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      link: "https://www.youtube.com/watch?v=Jt_q8bJqVes",
      durationLabel: "Heimler APUSH Topic 7.14 - Comparison in Period 7",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(146),
      durationLabel: "Bilibili AP Daily Topic 7.14",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.1 - Cold War Contextualization",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(148),
      durationLabel: "Bilibili AP Daily Topic 8.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=x7-94t6c8g4",
      link: "https://www.youtube.com/watch?v=x7-94t6c8g4",
      durationLabel: "Heimler APUSH Topic 8.2 - The Red Scare Impact",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(148),
      durationLabel: "Bilibili AP Daily Topic 8.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.3 - Economy after 1945 Boom",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(149),
      durationLabel: "Bilibili AP Daily Topic 8.3",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.4 - Postwar Culture & Society",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(151),
      durationLabel: "Bilibili AP Daily Topic 8.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.5 - Early Civil Rights Movement",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(152),
      durationLabel: "Bilibili AP Daily Topic 8.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.6 - The Vietnam War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(154),
      durationLabel: "Bilibili AP Daily Topic 8.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.7 - The Great Society Reforms",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(157),
      durationLabel: "Bilibili AP Daily Topic 8.7",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.8": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.8 - Civil Rights Movement Peak",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(159),
      durationLabel: "Bilibili AP Daily Topic 8.8",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.9": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.9 - Expansion of Civil Rights",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(161),
      durationLabel: "Bilibili AP Daily Topic 8.9",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.10": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.10 - Youth Culture & Protest",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(163),
      durationLabel: "Bilibili AP Daily Topic 8.10",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.11": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.11 - Environment & Resources",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(164),
      durationLabel: "Bilibili AP Daily Topic 8.11",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.12": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.12 - Society in Transition & Watergate",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(165),
      durationLabel: "Bilibili AP Daily Topic 8.12",
      sourceLabel: "Open Bilibili",
    },
  },
  "8.13": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      link: "https://www.youtube.com/watch?v=s_JvW2Tz25w",
      durationLabel: "Heimler APUSH Topic 8.13 - Period 8 Summary & Comparison",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(166),
      durationLabel: "Bilibili AP Daily Topic 8.13",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.1": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.1 - Contemporary Period Context",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(167),
      durationLabel: "Bilibili AP Daily Topic 9.1",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.2": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.2 - Reagan & Conservatism",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(168),
      durationLabel: "Bilibili AP Daily Topic 9.2",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.3": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.3 - End of the Cold War",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(169),
      durationLabel: "Bilibili AP Daily Topic 9.3",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.4": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.4 - Globalization & Changing Economy",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(170),
      durationLabel: "Bilibili AP Daily Topic 9.4",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.5": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.5 - Migration & Immigration 1990-2000s",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(171),
      durationLabel: "Bilibili AP Daily Topic 9.5",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.6": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.6 - Challenges of 21st Century",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(172),
      durationLabel: "Bilibili AP Daily Topic 9.6",
      sourceLabel: "Open Bilibili",
    },
  },
  "9.7": {
    overseas: {
      embed: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      link: "https://www.youtube.com/watch?v=J6z0l-45Qys",
      durationLabel: "Heimler APUSH Topic 9.7 - Period 9 Causation Summary",
      sourceLabel: "Open Heimler's History",
    },
    china: {
      link: chinaPlaylistUrl,
      embed: bilibiliVideo(174),
      durationLabel: "Bilibili AP Daily Topic 9.7",
      sourceLabel: "Open Bilibili",
    },
  },
};

export const buildStepsForTopic = (
  unit: Unit,
  topic: Topic,
  contentRegion: ContentRegion = "overseas"
): LessonStep[] => {
  const baseId = topic.id.replace(".", "-");
  const video =
    contentRegion === "china"
      ? videoByTopic[topic.id]?.china ?? defaultChinaVideo
      : videoByTopic[topic.id]?.overseas;

  return [
    {
      id: `${topic.id}-step1`,
      label: "观看导学视频",
      type: "video",
      description: "短片讲解重点脉络；视频会在关键时间点暂停，通过互动题检查理解质量。",
      videoSrc: `/videos/unit${unit.id}/${baseId}-intro.mp4`,
      videoEmbedUrl: video?.embed,
      videoLinkUrl: video?.link,
      videoSourceLabel: video?.sourceLabel,
      videoChecks: video?.videoChecks,
      durationLabel: video?.durationLabel ?? "约 5-10 分钟",
    },
    {
      id: `${topic.id}-step2`,
      label: "阅读笔记",
      type: "notes",
      description: "完整图文笔记，覆盖考试关键词与案例。",
      contentId: topic.id,
    },
  ];
};
