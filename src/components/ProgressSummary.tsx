import { CheckCircle2, Sparkles } from "lucide-react";

interface ProgressSummaryProps {
  overallProgress: number;
  completedStepCount: number;
  totalStepCount: number;
}

export const ProgressSummary = ({
  overallProgress,
  completedStepCount,
  totalStepCount,
}: ProgressSummaryProps) => {
  const progressNormalized = Math.min(Math.max(overallProgress, 0), 100);
  const progressArc = {
    background: `conic-gradient(from 90deg, rgba(174, 187, 249, 0.92) ${progressNormalized}%, rgba(223, 227, 249, 0.35) ${progressNormalized}% 100%)`,
  };

  return (
    <div className="relative overflow-hidden glass-panel px-6 py-6 sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute -top-24 right-12 h-48 w-48 rounded-full bg-white/45 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-52 w-52 rounded-full bg-lavender/35 blur-3xl opacity-50" />

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <span className="zen-chip text-xs uppercase tracking-[0.45em] text-midnight/60">
            总体进度
          </span>
          <h2 className="text-3xl font-semibold text-midnight sm:text-4xl">
            {progressNormalized}% 学习进度
          </h2>
          <p className="text-sm text-midnight/70">
            {completedStepCount} / {totalStepCount} 个学习步骤已完成。
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32">
            <div
              className="absolute inset-0 rounded-full shadow-glow"
              style={progressArc}
            />
            <div className="absolute inset-[12%] flex items-center justify-center rounded-full bg-white/85 text-midnight backdrop-blur-md">
              <span className="text-xl font-semibold sm:text-2xl">
                {progressNormalized}%
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-midnight/70">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-glow" />
              <span>成绩变化会实时记录在进度面板。</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-moss" />
              <span>勾选任意学习步骤即可更新统计。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
