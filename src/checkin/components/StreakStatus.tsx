import { motion } from "framer-motion";
import { Flame, Trophy, Zap } from "lucide-react";

interface StreakStatusProps {
  streak: number;
  totalXp: number;
  todayCompleted: boolean;
}

export function StreakStatus({ streak, totalXp, todayCompleted }: StreakStatusProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <motion.div
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl px-4 py-2 shadow-sm"
        animate={streak > 0 ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <motion.div
          animate={streak > 0 ? { rotate: [0, -10, 10, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
        >
          <Flame className={"w-5 h-5 sm:w-6 sm:h-6 " + (streak > 0 ? "text-orange-500" : "text-gray-300")} fill={streak > 0 ? "#f97316" : "none"} />
        </motion.div>
        <span className="font-black text-lg sm:text-xl text-midnight">{streak}</span>
        <span className="text-xs sm:text-sm font-semibold text-gray-500">天</span>
      </motion.div>
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl px-4 py-2 shadow-sm">
        <Zap className="w-5 h-5 text-purple-500" fill="#a855f7" />
        <span className="font-black text-lg sm:text-xl text-midnight">{totalXp}</span>
        <span className="text-xs sm:text-sm font-semibold text-gray-500">XP</span>
      </div>
      {todayCompleted && (
        <motion.div initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-2xl px-3 sm:px-4 py-2">
          <Trophy className="w-5 h-5 text-emerald-500" />
          <span className="text-xs sm:text-sm font-bold text-emerald-700">今日已完成</span>
        </motion.div>
      )}
    </div>
  );
}
