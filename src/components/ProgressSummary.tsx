interface ProgressSummaryProps {
  overallProgress: number;
  completedStepCount: number;
  totalStepCount: number;
}
export const ProgressSummary = ({ overallProgress, completedStepCount, totalStepCount }: ProgressSummaryProps) => {
  const value = Math.min(Math.max(overallProgress, 0), 100);
  return <section className="rounded-xl border border-slate-200 bg-white px-5 py-4" aria-label="课程学习进度">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm"><span className="font-semibold text-slate-800">课程学习进度</span><span className="text-slate-500">{completedStepCount} / {totalStepCount} 步骤 · {value}%</span></div>
    <div role="progressbar" aria-label="已完成课程步骤" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div style={{width: `${value}%`}} className="h-full rounded-full bg-[#2b3a4d]" /></div>
  </section>;
};
