import { Unit } from "../types/lesson";

interface UnitCardProps {
  unit: Unit;
  onClick: (unit: Unit) => void;
}

export const UnitCard = ({ unit, onClick }: UnitCardProps) => (
  <button
    type="button"
    className="glass-card group flex h-full flex-col gap-4 overflow-hidden border border-white/25 px-5 py-6 text-left transition-transform hover:-translate-y-1 hover:shadow-glass"
    onClick={() => onClick(unit)}
  >
    <div className={`h-1.5 w-full bg-gradient-to-r ${unit.color} rounded-full`} />
    <div className="flex items-center justify-between text-sm text-midnight/65">
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${unit.color} px-3 py-1 text-xs font-semibold text-white shadow-glow`}
      >
        Unit {unit.id}
      </span>
      <span className="text-xs uppercase tracking-[0.3em]">{unit.period}</span>
    </div>
    <h4 className="text-lg font-semibold text-midnight transition-colors group-hover:text-glow">
      {unit.title}
    </h4>
    <p className="text-sm text-midnight/60">{unit.topics.length} 主题</p>
  </button>
);
