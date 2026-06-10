import { motion } from "framer-motion";
import { Play, Pencil, FileQuestion, ExternalLink, Sparkles, Check, BookOpen } from "lucide-react";
import { DayPlan } from "../types";

interface DayDetailPanelProps {
  dayPlan: DayPlan | null;
  completedTasks: Record<string, boolean>;
  onCompleteTask: (taskId: string) => void;
  onMarkDayComplete: (date: string) => void;
  onStartFlow: (stepIndex: number) => void;
}

const taskIcons: Record<string, React.ElementType> = {
  video: Play,
  exercise: Pencil,
  quiz: FileQuestion,
  writing: BookOpen,
  test: ExternalLink,
  review: BookOpen,
  "fun-fact": Sparkles,
};

const taskColors: Record<string, string> = {
  video: "border-blue-200 bg-blue-50/50 text-blue-700",
  exercise: "bg-emerald-50/50 border-emerald-200 text-emerald-700",
  quiz: "bg-amber-50/50 border-amber-200 text-amber-700",
  writing: "bg-purple-50/50 border-purple-200 text-purple-700",
  test: "bg-rose-50/50 border-rose-200 text-rose-700",
  review: "bg-indigo-50/50 border-indigo-200 text-indigo-700",
  "fun-fact": "bg-teal-50/50 border-teal-200 text-teal-700",
};

export function DayDetailPanel({
  dayPlan,
  completedTasks,
  onCompleteTask,
  onMarkDayComplete,
  onStartFlow,
}: DayDetailPanelProps) {
  if (!dayPlan) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">📅</div>
        <h3 className="text-lg font-bold text-gray-400 mb-2">选择一天查看任务</h3>
        <p className="text-sm text-gray-400">点击日历中的日期查看对应的学习计划</p>
      </div>
    );
  }

  const allTasksCompleted = dayPlan.tasks.every((t) => !!completedTasks[t.id]);

  const handleStartFlow = () => {
    if (dayPlan.dayType === "unit-test" || dayPlan.dayType === "mock-exam") {
      const testTask = dayPlan.tasks.find((t) => t.type === "test");
      if (testTask?.externalUrl) {
        window.open(testTask.externalUrl, "_blank");
        onCompleteTask(testTask.id);
        onMarkDayComplete(dayPlan.date);
      }
      return;
    }
    // Open flow at the first uncompleted task, or 0 if all completed
    const firstUncompletedIdx = dayPlan.tasks.findIndex((t) => !completedTasks[t.id]);
    onStartFlow(firstUncompletedIdx !== -1 ? firstUncompletedIdx : 0);
  };

  const handleTaskClick = (idx: number, task: any) => {
    if (task.isExternal && task.externalUrl) {
      window.open(task.externalUrl, "_blank");
      onCompleteTask(task.id);
      onMarkDayComplete(dayPlan.date);
      return;
    }
    onStartFlow(idx);
  };

  return (
    <motion.div
      key={dayPlan.date}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg overflow-hidden flex flex-col"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-5 text-white shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold opacity-80">{dayPlan.unitTitle || "Unit " + dayPlan.unitId}</span>
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">第 {parseInt(dayPlan.date.split("-")[1])} 天</span>
        </div>
        <h3 className="text-xl font-black">{dayPlan.topicTitle}</h3>
        {dayPlan.topicSubtitle && <p className="text-sm font-semibold opacity-80 mt-0.5">{dayPlan.topicSubtitle}</p>}
        <p className="text-xs opacity-90 mt-1.5 font-medium leading-relaxed">{dayPlan.description}</p>
      </div>

      {/* Task List */}
      <div className="p-5 space-y-3 overflow-y-auto max-h-[360px] lg:max-h-[none]">
        {dayPlan.tasks.map((task, idx) => {
          const Icon = taskIcons[task.type] || FileQuestion;
          const colorClass = taskColors[task.type] || "border-gray-200 bg-gray-50 text-gray-700";
          const isDone = !!completedTasks[task.id];

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleTaskClick(idx, task)}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-md hover:scale-[1.01] active:scale-[0.99] select-none ${
                isDone ? "border-emerald-200 bg-emerald-50/30" : colorClass + " border-[1.5px]"
              }`}
            >
              {/* Task Icon */}
              <div className={`p-2 rounded-xl shrink-0 ${isDone ? "bg-emerald-100 text-emerald-600" : "bg-white/90 shadow-sm"}`}>
                {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>

              {/* Task Title & Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-bold truncate ${isDone ? "text-emerald-700 line-through opacity-70" : "text-midnight"}`}>
                    {task.title}
                  </span>
                  {task.isExternal && <ExternalLink className="w-3 h-3 text-rose-400 shrink-0" />}
                </div>
                <p className={`text-xs mt-0.5 truncate ${isDone ? "text-emerald-600/70" : "text-gray-500"}`}>
                  {task.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-semibold text-gray-400">⏱ {task.estimatedMinutes} min</span>
                  <span className="text-[10px] font-bold text-amber-600">+{task.xpReward} XP</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskClick(idx, task);
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? "bg-emerald-500 text-white shadow-emerald-100"
                    : "bg-midnight text-white hover:bg-midnight/80 active:scale-95 shadow-midnight/10"
                }`}
              >
                {isDone ? "已完成 ✓" : "开始"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Play Actions Footer */}
      <div className="px-5 pb-5 pt-1 space-y-2 shrink-0 border-t border-gray-50 mt-auto">
        <button
          onClick={handleStartFlow}
          className="w-full py-3 rounded-2xl bg-midnight text-white font-black text-sm hover:bg-midnight/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          {dayPlan.dayType === "unit-test" || dayPlan.dayType === "mock-exam"
            ? "前往测试 →"
            : allTasksCompleted
            ? "已完成全部任务 ✨"
            : "开始今日学习 ▶"}
        </button>

        {allTasksCompleted && !completedTasks[dayPlan.date] && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onMarkDayComplete(dayPlan.date)}
            className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-black text-sm hover:bg-emerald-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            打卡今日任务 ✓
          </motion.button>
        )}

        {!!completedTasks[dayPlan.date] && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center py-3 rounded-2xl bg-emerald-50 border border-emerald-200"
          >
            <p className="text-emerald-700 font-bold">✨ 今日打卡完成！+50 XP</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
