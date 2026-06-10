import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkinPlan } from "../data/plan";
import { CheckInProgress, Achievement } from "../types";
import { CalendarGrid } from "./CalendarGrid";
import { DayDetailPanel } from "./DayDetailPanel";
import { StreakStatus } from "./StreakStatus";
import { AchievementModal } from "./AchievementModal";
import { TaskFlowDialog } from "./TaskFlowDialog";

const STORAGE_KEY = "apush-checkin-progress";
const ACHIEVEMENTS_KEY = "apush-checkin-achievements";

const MILESTONE_ACHIEVEMENTS: { days: number; title: string; description: string; icon: string }[] = [
  { days: 1, title: "开始旅程", description: "完成第一天学习打卡", icon: "🌱" },
  { days: 3, title: "初露锋芒", description: "连续打卡 3 天", icon: "🔥" },
  { days: 7, title: "周冠军", description: "连续打卡 7 天，一周全勤", icon: "🏅" },
  { days: 14, title: "坚持达人", description: "连续打卡 14 天", icon: "💪" },
  { days: 21, title: "三周不息", description: "连续打卡 21 天", icon: "⚡" },
  { days: 30, title: "月度之星", description: "连续打卡 30 天", icon: "🌟" },
  { days: 45, title: "冲刺王者", description: "连续打卡 45 天", icon: "👑" },
  { days: 59, title: "暑假通关", description: "完成暑期全部学习任务", icon: "🎓" },
];

export function CheckInPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CheckInProgress>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) return JSON.parse(s); } catch {}
    return { completedDates: {}, completedTasks: {}, streak: 0, totalXp: 0, lastCheckInDate: null };
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try { const s = localStorage.getItem(ACHIEVEMENTS_KEY); if (s) return JSON.parse(s); } catch {}
    return [];
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [activeMonth, setActiveMonth] = useState(0); // 0 for July, 1 for August
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // mobile bottom drawer
  const [flowOpen, setFlowOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const now = new Date();
    const campStart = new Date(2026, 6, 1);
    const campEnd = new Date(2026, 7, 31);
    if (now < campStart) return "07-01";
    if (now > campEnd) return "08-31";
    return String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
  }, []);

  useEffect(() => { if (!selectedDate) setSelectedDate(today); }, [today, selectedDate]);

  const selectedDayPlan = useMemo(() => checkinPlan.find((d) => d.date === selectedDate) || null, [selectedDate]);

  const saveProgress = useCallback((p: CheckInProgress) => { setProgress(p); localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }, []);

  const handleCompleteTask = useCallback((taskId: string) => {
    setProgress((prev) => {
      if (prev.completedTasks[taskId]) return prev;
      let xp = 0;
      for (const day of checkinPlan) { const t = day.tasks.find((x) => x.id === taskId); if (t) { xp = t.xpReward; break; } }
      const updated = { ...prev, completedTasks: { ...prev.completedTasks, [taskId]: true }, totalXp: prev.totalXp + xp };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const handleMarkDayComplete = useCallback((date: string) => {
    setProgress((prev) => {
      if (prev.completedDates[date]) return prev;
      let newStreak = 1;
      if (prev.lastCheckInDate) {
        const [pm, pd] = prev.lastCheckInDate.split("-").map(Number);
        const [cm, cd] = date.split("-").map(Number);
        const lastD = new Date(2026, pm - 1, pd);
        const curD = new Date(2026, cm - 1, cd);
        const diff = Math.round((curD.getTime() - lastD.getTime()) / 86400000);
        newStreak = diff === 1 ? prev.streak + 1 : 1;
      }
      const updated = { ...prev, completedDates: { ...prev.completedDates, [date]: true }, streak: newStreak, totalXp: prev.totalXp + 50, lastCheckInDate: date };
      saveProgress(updated);

      // Check achievements
      const newAch = [...achievements];
      for (const m of MILESTONE_ACHIEVEMENTS) {
        if (newStreak >= m.days && !newAch.find((a) => a.id === "m-" + m.days)) {
          const a: Achievement = { id: "m-" + m.days, title: m.title, description: m.description, icon: m.icon, unlockedAt: date };
          newAch.push(a);
          setAchievements(newAch);
          localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(newAch));
          setTimeout(() => setShowAchievement(a), 500);
        }
      }
      return updated;
    });
  }, [achievements, saveProgress]);

  const completedCount = Object.keys(progress.completedDates).length;
  const totalDays = checkinPlan.length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalDays) * 100));

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newActiveMonth = scrollTop >= containerHeight / 2 ? 1 : 0;
    if (newActiveMonth !== activeMonth) {
      setActiveMonth(newActiveMonth);
    }
  };

  const scrollToMonth = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const el = document.getElementById(`month-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50/50">
      {/* Header - Compact Single Line */}
      <header className="h-[64px] border-b border-gray-100 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-midnight" />
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-black text-midnight flex items-center gap-1.5 leading-none">
              <BookOpen className="w-4 h-4 text-blue-500" /> APUSH 暑期打卡自学营
            </h1>
            <p className="text-[10px] font-bold text-gray-400 mt-0.5">Unit 1-5 Double-Month Camp | 2026</p>
          </div>
        </div>

        {/* Center Progress Bar - Compact */}
        <div className="hidden md:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full max-w-xs lg:max-w-sm w-full">
          <span className="text-[10px] font-black text-midnight whitespace-nowrap">{completedCount}/{totalDays} 天</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${overallPercent}%` }} />
          </div>
          <span className="text-[10px] font-black text-midnight">{overallPercent}%</span>
        </div>

        <div className="flex items-center gap-3">
          <StreakStatus streak={progress.streak} totalXp={progress.totalXp} todayCompleted={!!progress.completedDates[today]} />
        </div>
      </header>

      {/* Main Container - Split Screen */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] relative">
        {/* Left Side: Calendar (scroll snappable) */}
        <div className="flex-1 flex flex-col relative h-full bg-white">
          
          {/* Floating Monthly Navigation Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 bg-white/90 backdrop-blur-sm px-2 py-3.5 rounded-2xl border border-gray-100 shadow-md">
            <button 
              onClick={() => scrollToMonth(0)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                activeMonth === 0 
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200 scale-105" 
                  : "text-midnight hover:bg-gray-100"
              }`}
            >
              7月
            </button>
            <button 
              onClick={() => scrollToMonth(1)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                activeMonth === 1 
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200 scale-105" 
                  : "text-midnight hover:bg-gray-100"
              }`}
            >
              8月
            </button>
          </div>

          {/* Scroll snap calendar container */}
          <div 
            className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="h-full snap-start" id="month-0">
              <CalendarGrid 
                monthIndex={0}
                plan={planByMonth(6)}
                completedDates={progress.completedDates}
                completedTasks={progress.completedTasks}
                selectedDate={selectedDate}
                onSelectDate={(d) => {
                  setSelectedDate(d);
                  setIsDrawerOpen(true);
                }}
                onStartFlow={(d, stepIdx) => {
                  setSelectedDate(d);
                  setInitialStep(stepIdx);
                  setFlowOpen(true);
                }}
                today={today}
              />
            </div>
            <div className="h-full snap-start" id="month-1">
              <CalendarGrid 
                monthIndex={1}
                plan={planByMonth(7)}
                completedDates={progress.completedDates}
                completedTasks={progress.completedTasks}
                selectedDate={selectedDate}
                onSelectDate={(d) => {
                  setSelectedDate(d);
                  setIsDrawerOpen(true);
                }}
                onStartFlow={(d, stepIdx) => {
                  setSelectedDate(d);
                  setInitialStep(stepIdx);
                  setFlowOpen(true);
                }}
                today={today}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar details for selected day (Desktop only) */}
        <div className="hidden lg:block w-[380px] shrink-0 border-l border-gray-100 h-full overflow-y-auto bg-gray-50/20 p-4">
          <DayDetailPanel 
            dayPlan={selectedDayPlan}
            completedTasks={progress.completedTasks}
            onCompleteTask={handleCompleteTask}
            onMarkDayComplete={handleMarkDayComplete}
            onStartFlow={(stepIdx) => {
              setInitialStep(stepIdx);
              setFlowOpen(true);
            }}
          />
        </div>
      </div>

      {/* Responsive Mobile Drawer for day details */}
      {isDrawerOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300" 
          onClick={() => setIsDrawerOpen(false)} 
        />
      )}
      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] border-t border-gray-100 shadow-2xl transition-all duration-300 ease-out max-h-[80vh] overflow-y-auto ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-3" />
        <div className="px-4 pb-10">
          <DayDetailPanel 
            dayPlan={selectedDayPlan}
            completedTasks={progress.completedTasks}
            onCompleteTask={handleCompleteTask}
            onMarkDayComplete={handleMarkDayComplete}
            onStartFlow={(stepIdx) => {
              setInitialStep(stepIdx);
              setFlowOpen(true);
            }}
          />
        </div>
      </div>

      {/* Task Flow Dialog */}
      <AnimatePresence>
        {flowOpen && selectedDayPlan && (
          <TaskFlowDialog
            dayPlan={selectedDayPlan}
            completedTasks={progress.completedTasks}
            onCompleteTask={handleCompleteTask}
            onComplete={(date) => {
              handleMarkDayComplete(date);
              setFlowOpen(false);
            }}
            onClose={() => setFlowOpen(false)}
            initialStep={initialStep}
          />
        )}
      </AnimatePresence>

      {showAchievement && (
        <AchievementModal open={true} onClose={() => setShowAchievement(null)}
          title={showAchievement.title} description={showAchievement.description} emoji={showAchievement.icon} />
      )}
    </div>
  );
}

// Helper function to extract plans for a specific month (index 6 = July, 7 = August)
function planByMonth(mIndex: number) {
  const mm = String(mIndex + 1).padStart(2, "0");
  return checkinPlan.filter((d) => d.date.startsWith(mm));
}
