import { ArrowRight, BookOpen, PenLine, RotateCcw } from "lucide-react";
import type { Unit } from "../../types/lesson";
import type { View } from "../../types/navigation";
import { UnitCard } from "../UnitCard";
import { APVaultEmbed } from "../APVaultEmbed";

interface HomeViewProps {
  units: Unit[];
  onNavigate: (view: View) => void;
  onUnitClick: (unit: Unit) => void;
  canAccessUnit?: (unit: Unit) => boolean;
}

export const HomeView = ({ units, onNavigate, onUnitClick, canAccessUnit = () => true }: HomeViewProps) => (
  <div className="space-y-8">
    <section className="study-hero">
      <p className="editorial-label">THE APUSH CLASSROOM / 全程学习</p>
      <h2>读懂美国历史，<br /><span>写出有证据的答案。</span></h2>
      <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">从单元知识到材料分析，再到 SAQ、DBQ 与 LEQ 写作。跟着课堂进度，一步步把“看懂了”变成“会作答”。</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button className="study-primary" type="button" onClick={() => units[0] && onUnitClick(units[0])}>免费开始 Unit 1 <ArrowRight size={17} /></button>
        <a className="study-secondary" href="#ap-vault-practice">进入 AP Vault 练习</a>
      </div>
      <div className="hero-facts"><span>9 个单元</span><span>{units.reduce((sum, unit) => sum + unit.topics.length, 0)} 个主题</span><span>1491–至今</span><span>中英双语学习</span></div>
    </section>

    <section aria-label="学习路径" className="grid gap-4 md:grid-cols-3">
      {[{ icon: BookOpen, n: "01", title: "理解知识", text: "观看微课，阅读笔记，整理事件与因果关系。", action: () => onNavigate("study"), label: "进入学习" },
        { icon: PenLine, n: "02", title: "应用证据", text: "在下方题库选择对应单元，先独立作答，再查看解析。", action: () => document.getElementById("ap-vault-practice")?.scrollIntoView({ behavior: "smooth" }), label: "开始练习" },
        { icon: RotateCcw, n: "03", title: "针对性复习", text: "回看课堂练习的错题，定位薄弱主题，再次尝试。", action: () => onNavigate("wrongNotebook"), label: "打开课堂错题本" }].map(item => <button type="button" key={item.n} onClick={item.action} className="path-card">
          <div className="flex justify-between"><item.icon size={22} strokeWidth={1.5} /><span className="font-serif text-stone-400">{item.n}</span></div>
          <h3 className="mt-5 text-xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">{item.label}<ArrowRight size={15}/></span>
        </button>)}
    </section>

    <section id="course-units" className="scroll-mt-28">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="editorial-label">YOUR COURSE MAP</p><h2 className="mt-2 text-2xl">跟着校内进度，选择你的单元</h2></div><p className="text-xs text-slate-600">Unit 1 免费学习 · 其余单元按现有权限开放</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{units.map(unit => <UnitCard key={unit.id} unit={unit} onClick={onUnitClick} locked={!canAccessUnit(unit)} />)}</div>
    </section>
    <APVaultEmbed />
    <section className="rounded-2xl border border-stone-300 bg-white/60 p-6">
      <h2 className="text-xl">第一次来？先完成一个小循环。</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">选择 Unit 1 的一个主题 → 阅读笔记 → 在 AP Vault 完成一道练习 → 回到笔记补充缺失的证据。无需一次刷完整个单元。</p>
      <button className="study-secondary mt-4" type="button" onClick={() => onNavigate("userGuide")}>查看使用与账号说明</button>
    </section>
  </div>
);
