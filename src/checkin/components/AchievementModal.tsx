import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface AchievementModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  emoji?: string;
}

export function AchievementModal({ open, onClose, title, description, emoji }: AchievementModalProps) {
  useEffect(() => {
    if (open) {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#58CC02", "#FF9600", "#FFD700", "#4D9DE0"] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#58CC02", "#FF9600", "#FFD700", "#4D9DE0"] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-sm w-full text-center"
            initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }} transition={{ type: "spring", damping: 15, stiffness: 200 }}>
            <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <motion.div initial={{ y: -20, scale: 0 }} animate={{ y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }} className="text-6xl mb-4">
              {emoji || "🏆"}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" fill="#eab308" />
                <h3 className="text-xl font-black text-midnight">成就解锁!</h3>
              </div>
              <p className="text-lg font-bold text-midnight mb-1">{title}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
