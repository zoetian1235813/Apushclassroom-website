import { useMemo } from "react";
import { Check } from "lucide-react";
import { DayPlan } from "../types";
import { MONTHS } from "../data/plan";

interface CalendarGridProps {
  monthIndex: number; // 0 for July 2026, 1 for August 2026
  plan: DayPlan[];
  completedDates: Record<string, boolean>;
  completedTasks: Record<string, boolean>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onStartFlow: (date: string, stepIndex: number) => void;
  today: string;
}

const taskTypeStyles: Record<string, { bg: string; border: string; text: string; icon: string; dot: string }> = {
  video: { bg: "bg-blue-50/80 hover:bg-blue-100/90 border-blue-200/50", border: "border-blue-200/40", text: "text-blue-700", icon: "📺", dot: "bg-blue-500" },
  exercise: { bg: "bg-emerald-50/80 hover:bg-emerald-100/90 border-emerald-200/50", border: "border-emerald-200/40", text: "text-emerald-700", icon: "✏️", dot: "bg-emerald-500" },
  quiz: { bg: "bg-amber-50/80 hover:bg-amber-100/90 border-amber-200/50", border: "border-amber-200/40", text: "text-amber-700", icon: "📝", dot: "bg-amber-500" },
  writing: { bg: "bg-purple-50/80 hover:bg-purple-100/90 border-purple-200/50", border: "border-purple-200/40", text: "text-purple-700", icon: "✍️", dot: "bg-purple-500" },
  test: { bg: "bg-rose-50/80 hover:bg-rose-100/90 border-rose-200/50", border: "border-rose-200/40", text: "text-rose-700", icon: "🏆", dot: "bg-rose-500" },
  review: { bg: "bg-indigo-50/80 hover:bg-indigo-100/90 border-indigo-200/50", border: "border-indigo-200/40", text: "text-indigo-700", icon: "📚", dot: "bg-indigo-500" },
  "fun-fact": { bg: "bg-teal-50/80 hover:bg-teal-100/90 border-teal-200/50", border: "border-teal-200/40", text: "text-teal-700", icon: "💡", dot: "bg-teal-500" },
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function CalendarGrid({
  monthIndex,
  plan,
  completedDates,
  completedTasks,
  selectedDate,
  onSelectDate,
  onStartFlow,
  today,
}: CalendarGridProps) {
  const planByDate = useMemo(() => {
    const map: Record<string, DayPlan> = {};
    plan.forEach((d) => {
      map[d.date] = d;
    });
    return map;
  }, [plan]);

  const year = 2026;
  const month = monthIndex === 0 ? 6 : 7; // July or August
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

    // Prev month padding
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const mm = String(month).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      days.push({ day: d, isCurrentMonth: false, dateStr: `${mm}-${dd}` });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      days.push({ day: d, isCurrentMonth: true, dateStr: `${mm}-${dd}` });
    }

    // Next month padding
    let nextD = 1;
    while (days.length % 7 !== 0) {
      const mm = String(month + 2).padStart(2, "0");
      const dd = String(nextD).padStart(2, "0");
      days.push({ day: nextD, isCurrentMonth: false, dateStr: `${mm}-${dd}` });
      nextD++;
    }

    return days;
  }, [month, daysInMonth, firstDayOfWeek, prevMonthDays]);

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Month Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
        <h2 className="text-2xl font-black tracking-tight text-midnight">
          {MONTHS[monthIndex]}
        </h2>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {year} Calendar
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center text-[10px] font-black text-gray-400 py-2.5 tracking-wider border-r border-gray-100 last:border-r-0"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 flex-1 bg-gray-100/30">
        {calendarDays.map((cell, idx) => {
          const { day, isCurrentMonth, dateStr } = cell;
          const dayPlan = planByDate[dateStr];
          const isCompleted = !!completedDates[dateStr];
          const isSelected = selectedDate === dateStr;
          const isToday = today === dateStr;

          return (
            <div
              key={dateStr + "-" + idx}
              onClick={() => dayPlan && isCurrentMonth && onSelectDate(dateStr)}
              className={`relative flex flex-col justify-between p-1.5 min-h-[90px] sm:min-h-[110px] border-r border-b border-gray-100/80 transition-all cursor-pointer group bg-white ${
                !isCurrentMonth ? "bg-gray-50/50 opacity-40 cursor-default" : ""
              } ${
                isSelected && isCurrentMonth
                  ? "ring-[2.5px] ring-blue-500 ring-inset z-10 shadow-sm"
                  : "hover:bg-gray-50/40"
              }`}
            >
              {/* Day Cell Header */}
              <div className="flex items-center justify-between w-full">
                {isToday && isCurrentMonth ? (
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm shadow-blue-200">
                    {day}
                  </span>
                ) : (
                  <span
                    className={`text-xs font-bold leading-none ${
                      isCurrentMonth
                        ? "text-midnight group-hover:text-blue-600 transition-colors"
                        : "text-gray-300 font-semibold"
                    }`}
                  >
                    {day}
                  </span>
                )}

                {isCompleted && isCurrentMonth && (
                  <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                  </div>
                )}
              </div>

              {/* Day Cell Content */}
              <div className="flex-1 flex flex-col justify-end mt-1">
                {dayPlan && isCurrentMonth ? (
                  <>
                    {/* Desktop View: Separate Sub-task pills */}
                    <div className="hidden md:flex flex-col gap-1 w-full mt-1.5">
                      {dayPlan.tasks.map((task, taskIdx) => {
                        const isTaskDone = !!completedTasks[task.id];
                        const tStyle = taskTypeStyles[task.type] || taskTypeStyles.video;

                        return (
                          <button
                            key={task.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartFlow(dateStr, taskIdx);
                            }}
                            className={`flex items-center justify-between px-1.5 py-0.5 rounded-md border text-[9px] font-bold transition-all text-left w-full hover:scale-[1.02] active:scale-[0.98] ${
                              isTaskDone
                                ? "bg-emerald-50/30 text-emerald-600 border-emerald-100/50 line-through"
                                : tStyle.bg + " " + tStyle.text + " " + tStyle.border
                            }`}
                          >
                            <span className="truncate flex-1 flex items-center gap-1">
                              <span>{tStyle.icon}</span>
                              <span className="truncate leading-none">{task.title}</span>
                            </span>
                            {isTaskDone && (
                              <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0 ml-1" strokeWidth={4} />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Mobile View: Small colored dots representing sub-tasks */}
                    <div className="md:hidden flex gap-1 justify-center w-full mt-1">
                      {dayPlan.tasks.map((task) => {
                        const isTaskDone = !!completedTasks[task.id];
                        const tStyle = taskTypeStyles[task.type] || taskTypeStyles.video;
                        return (
                          <div
                            key={task.id}
                            className={`w-1.5 h-1.5 rounded-full shadow-xs ${
                              isTaskDone ? "bg-emerald-500" : tStyle.dot
                            }`}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
