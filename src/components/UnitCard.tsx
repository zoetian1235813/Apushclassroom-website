import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { Unit } from "../types/lesson";

interface UnitCardProps {
  unit: Unit;
  onClick: (unit: Unit) => void;
  locked?: boolean;
}

export const UnitCard = ({ unit, onClick, locked = false }: UnitCardProps) => (
  <button type="button" onClick={() => onClick(unit)}
    className="group flex h-full flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 text-left transition-colors hover:border-primary">
    <div className="flex items-center justify-between gap-3">
      <span className="rounded bg-sky-50 px-2.5 py-1 text-xs font-semibold text-primary">UNIT {String(unit.id).padStart(2, "0")}</span>
      <span className="text-xs tabular-nums text-slate-500">{unit.period}</span>
    </div>
    <h4 className="text-lg font-semibold transition-colors group-hover:text-primary">{unit.title}</h4>
    <div className="mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
      <span>{unit.topics.length} 个主题 · {locked ? "完整课程" : unit.id === 1 ? "免费学习" : "已开放"}</span>
      {locked ? <LockKeyhole aria-label="需开通权限" size={15} /> : <ArrowUpRight aria-hidden="true" size={17} className="text-primary" />}
    </div>
  </button>
);
