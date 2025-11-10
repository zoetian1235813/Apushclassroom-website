import { BookOpen, Target, Sparkles } from "lucide-react";
import { Unit } from "../../types/lesson";
import { View } from "../../types/navigation";
import { UnitCard } from "../UnitCard";

interface HomeViewProps {
  units: Unit[];
  onNavigate: (view: View) => void;
  onUnitClick: (unit: Unit) => void;
}

export const HomeView = ({ units, onNavigate, onUnitClick }: HomeViewProps) => (
  <div className="space-y-10">
    <section className="relative overflow-hidden glass-panel px-6 py-8 sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full bg-white/40 blur-3xl" />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-5">
          <span className="zen-chip text-xs uppercase tracking-[0.45em] text-midnight/60">
            Study Assistant
          </span>
          <h2 className="text-4xl font-semibold text-midnight sm:text-5xl">
            AP US History 学习总览
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-midnight/70 sm:text-base">
            1491–1980 全九单元、86 个主题。集中查看任务、笔记与练习安排，清晰推进备考。
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="zen-chip text-sm">86 Topics 📚</span>
            <span className="zen-chip text-sm">9 Units 🗂️</span>
            <span className="zen-chip text-sm">时间线 1491–1980 ⏳</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/25 bg-white px-6 py-6 text-midnight shadow-glass sm:w-64">
          <div className="text-xs uppercase tracking-[0.4em] text-midnight/55">
            今日建议
          </div>
          <div className="mt-4 text-5xl">📘</div>
          <p className="mt-4 text-sm leading-relaxed text-midnight/70">
            查看今日安排，完成关键步骤后即可更新进度统计。
          </p>
        </div>
      </div>
    </section>

    <section className="grid gap-5 md:grid-cols-2">
      <div
        className="glass-card group cursor-pointer overflow-hidden border border-white/25 px-6 py-7 transition-all hover:-translate-y-1 hover:shadow-glass"
        onClick={() => onNavigate("study")}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <span className="zen-chip text-xs">Study Flow 📒</span>
            <h3 className="text-2xl font-semibold text-midnight">Complete Study Guide</h3>
            <p className="text-sm text-midnight/70">
              覆盖 9 个单元的笔记与学习步骤，按顺序完成即可掌握核心知识点。
            </p>
            <span className="zen-chip text-sm">86 Topics 📚</span>
          </div>
          <div className="rounded-2xl bg-midnight/90 p-4 text-3xl text-white shadow-glow">
            <BookOpen className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div
        className="glass-card group cursor-pointer overflow-hidden border border-white/25 px-6 py-7 transition-all hover:-translate-y-1 hover:shadow-glass"
        onClick={() => onNavigate("questionTypes")}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <span className="zen-chip text-xs">Practice Studio 🎯</span>
            <h3 className="text-2xl font-semibold text-midnight">题型特训模式</h3>
            <p className="text-sm text-midnight/70">
              针对 MCQ、SAQ、LEQ、DBQ 的专项练习，支持拖拽匹配与即时提示。
            </p>
            <span className="zen-chip text-sm">4 core question types</span>
          </div>
          <div className="rounded-2xl bg-midnight/90 p-4 text-3xl text-white shadow-glow">
            <Target className="h-8 w-8" />
          </div>
        </div>
      </div>
    </section>

    <section className="glass-panel space-y-6 px-6 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-midnight">
          <Sparkles className="h-6 w-6 text-glow" />
          <h3 className="text-2xl font-semibold">All 9 Units — 点击进入学习视图</h3>
        </div>
        <span className="zen-chip text-sm">Focus Mode ready 🔒</span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} onClick={onUnitClick} />
        ))}
      </div>
    </section>
  </div>
);
