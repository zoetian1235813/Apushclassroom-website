import { Unit } from "../types/lesson";

interface UnitCardProps {
  unit: Unit;
  onClick: (unit: Unit) => void;
  locked?: boolean;
}

export const UnitCard = ({ unit, onClick, locked = false }: UnitCardProps) => (
  <button
    type="button"
    className={`group flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-[#fffdf7] border border-stone-300 px-5 py-6 text-left transition-colors hover:border-[#806347] ${
      locked ? "" : "ring-1 ring-[#806347]/30"
    }`}
    onClick={() => onClick(unit)}
  >
    <div className={`h-1.5 w-full bg-gradient-to-r ${unit.color} rounded-full`} />
    <div className="flex items-center justify-between text-sm text-midnight/65">
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${unit.color} px-3 py-1 text-xs font-semibold text-white shadow-glow`}
      >
        Unit {unit.id}
      </span>
      <span className="text-xs uppercase tracking-[0.3em]">
        {locked ? unit.period : unit.period}
      </span>
    </div>
    <h4 className="text-lg font-semibold text-midnight transition-colors group-hover:text-[#806347]">
      {unit.title}
    </h4>
    <p className="text-sm text-midnight/60">
      {locked ? "完整课程 · 查看开通说明" : `${unit.topics.length} 主题`}
    </p>
  </button>
);
