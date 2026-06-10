import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ArrowRight, Sparkles, ExternalLink, 
  Flag, Clock, EyeOff, Eye, Check, AlertCircle, HelpCircle
} from "lucide-react";
import { DayPlan } from "../types";
import { sampleExercises, sampleQuizzes } from "../data/plan";
import confetti from "canvas-confetti";

interface TaskFlowDialogProps {
  dayPlan: DayPlan;
  completedTasks: Record<string, boolean>;
  onCompleteTask: (taskId: string) => void;
  onComplete: (date: string) => void;
  onClose: () => void;
  initialStep?: number;
}

const typeEmoji: Record<string, string> = { video: "📺", exercise: "✏️", quiz: "📝", writing: "📄", test: "🏆", review: "📚", "fun-fact": "💡" };
const typeLabel: Record<string, string> = { video: "网课学习", exercise: "极简练习", quiz: "每日测验", writing: "写作特训", test: "单元测试", review: "阶段复习", "fun-fact": "趣味知识" };

export function TaskFlowDialog({ dayPlan, completedTasks, onCompleteTask, onComplete, onClose, initialStep = 0 }: TaskFlowDialogProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [showCompletion, setShowCompletion] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  // Sub-question navigation
  const [subQuestionIndex, setSubQuestionIndex] = useState(0);

  // Exercise states
  const [exerciseInput, setExerciseInput] = useState("");
  const [exerciseResult, setExerciseResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [exerciseAnswersHistory, setExerciseAnswersHistory] = useState<Record<number, string>>({});
  const [exerciseResultsHistory, setExerciseResultsHistory] = useState<Record<number, "idle" | "correct" | "wrong">>({});
  const [showHint, setShowHint] = useState(false);

  // Quiz states
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [quizAnswersHistory, setQuizAnswersHistory] = useState<Record<number, number>>({});
  const [quizResultsHistory, setQuizResultsHistory] = useState<Record<number, "idle" | "correct" | "wrong">>({});

  // College Board features
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 countdown timer
  const [timerHidden, setTimerHidden] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, boolean>>({});
  const [showNavigator, setShowNavigator] = useState(false);

  const sortedTasks = dayPlan.tasks.filter((t) => t.type !== "fun-fact");
  const currentTask = sortedTasks[currentStep];
  const isLastStep = currentStep >= sortedTasks.length - 1;
  const currentId = currentTask ? currentTask.id : "";

  // Get question sets
  const exercises = sampleExercises[currentId] ?? [];
  const quizzes = sampleQuizzes[currentId] ?? [];
  const currentExercise = exercises[subQuestionIndex];
  const currentQuiz = quizzes[subQuestionIndex];

  const hasExercises = currentTask?.type === "exercise" && exercises.length > 0;
  const hasQuizzes = currentTask?.type === "quiz" && quizzes.length > 0;
  const isCollegeBoardStyle = hasExercises || hasQuizzes;

  // Ticking Timer
  useEffect(() => {
    if (showCompletion) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showCompletion]);

  // Reset hint when switching sub-questions
  useEffect(() => {
    setShowHint(false);
  }, [subQuestionIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleNextStep = useCallback(() => {
    if (!currentTask) return;
    onCompleteTask(currentTask.id);
    confetti({ particleCount: 8, spread: 40, origin: { y: 0.6 }, colors: ["#58CC02", "#FF9600"] });
    if (isLastStep) { 
      setShowCompletion(true); 
    } else { 
      setCurrentStep((s) => s + 1); 
      setVideoWatched(false); 
      setSubQuestionIndex(0); 
      setExerciseInput(""); 
      setExerciseResult("idle"); 
      setExerciseAnswersHistory({});
      setExerciseResultsHistory({});
      setQuizSelected(null); 
      setQuizResult("idle"); 
      setQuizAnswersHistory({});
      setQuizResultsHistory({});
      setEliminatedOptions({});
      setShowNavigator(false);
    }
  }, [currentTask, isLastStep, onCompleteTask]);

  const handleNextSubQuestion = () => {
    if (currentTask?.type === "exercise") {
      if (subQuestionIndex < exercises.length - 1) {
        jumpToSubQuestion(subQuestionIndex + 1);
      } else {
        handleNextStep();
      }
    } else if (currentTask?.type === "quiz") {
      if (subQuestionIndex < quizzes.length - 1) {
        jumpToSubQuestion(subQuestionIndex + 1);
      } else {
        handleNextStep();
      }
    }
  };

  const handlePrevSubQuestion = () => {
    if (subQuestionIndex > 0) {
      jumpToSubQuestion(subQuestionIndex - 1);
    }
  };

  const jumpToSubQuestion = (idx: number) => {
    setSubQuestionIndex(idx);
    if (currentTask?.type === "exercise") {
      setExerciseInput(exerciseAnswersHistory[idx] ?? "");
      setExerciseResult(exerciseResultsHistory[idx] ?? "idle");
    } else if (currentTask?.type === "quiz") {
      setQuizSelected(quizAnswersHistory[idx] ?? null);
      setQuizResult(quizResultsHistory[idx] ?? "idle");
      setEliminatedOptions({});
    }
  };

  const handleFinish = () => {
    const end = Date.now() + 1500;
    const f = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#58CC02", "#FFD700", "#FF9600"] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#58CC02", "#FFD700", "#FF9600"] });
      if (Date.now() < end) requestAnimationFrame(f);
    };
    f();
    onComplete(dayPlan.date);
  };

  const handleOpenVideo = () => {
    if (currentTask?.videoUrl) {
      window.open(currentTask.videoUrl, "_blank");
      setVideoWatched(true);
    }
  };

  const handleCheckExercise = () => {
    if (!currentExercise) return;
    const isCorrect = exerciseInput.trim().toLowerCase().includes(currentExercise.answer.toLowerCase()) || 
                      currentExercise.answer.toLowerCase().includes(exerciseInput.trim().toLowerCase());
    const result = isCorrect ? "correct" : "wrong";
    setExerciseResult(result);
    setExerciseAnswersHistory((prev) => ({ ...prev, [subQuestionIndex]: exerciseInput }));
    setExerciseResultsHistory((prev) => ({ ...prev, [subQuestionIndex]: result }));
    if (isCorrect) confetti({ particleCount: 12, spread: 50, origin: { y: 0.5 }, colors: ["#58CC02"] });
  };

  const handleCheckQuiz = () => {
    if (quizSelected === null || !currentQuiz) return;
    const result = quizSelected === currentQuiz.correctIndex ? "correct" : "wrong";
    setQuizResult(result);
    setQuizAnswersHistory((prev) => ({ ...prev, [subQuestionIndex]: quizSelected }));
    setQuizResultsHistory((prev) => ({ ...prev, [subQuestionIndex]: result }));
    if (quizSelected === currentQuiz.correctIndex) confetti({ particleCount: 12, spread: 50, origin: { y: 0.5 }, colors: ["#58CC02"] });
  };

  const renderVideoContent = () => (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">📺</div>
      <h3 className="text-xl font-black text-midnight mb-2">{currentTask?.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{currentTask?.description}</p>
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-4 max-w-sm mx-auto">
        <div className="text-4xl mb-3">▶️</div>
        <p className="text-sm font-bold text-midnight mb-1">Heimler's History APUSH</p>
        <p className="text-xs text-gray-400 mb-4">在 Bilibili 搜索观看 APUSH 课程视频（Heimler / AP Daily）</p>
        <button onClick={handleOpenVideo}
          className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 active:scale-95 transition-all shadow-lg cursor-pointer">
          <ExternalLink className="w-4 h-4" /> Bilibili 搜索观看
        </button>
      </div>
      {videoWatched && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-emerald-600 font-bold mb-4">
          ✅ 视频已观看，可以继续
        </motion.p>
      )}
      <div className="flex gap-3 max-w-sm mx-auto">
        <button onClick={() => { if (videoWatched) handleNextStep(); }}
          disabled={!videoWatched}
          className={"flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer " +
            (videoWatched ? "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95" : "bg-gray-200 text-gray-400 cursor-not-allowed")}>
          标记已看完 {isLastStep ? "✓" : "→"}
        </button>
      </div>
    </div>
  );

  const renderInlineBlankQuestion = (question: string) => {
    const parts = question.split("____");
    if (parts.length < 2) return <p className="text-base font-serif text-slate-800 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">{question}</p>;
    
    return (
      <div className="flex flex-wrap items-center gap-y-2 text-base leading-loose font-serif text-slate-850 bg-[#fbfaf8] border border-amber-250/40 p-6 rounded-2xl shadow-sm">
        {parts[0]}
        <span className="relative inline-block mx-1">
          <input
            type="text"
            value={exerciseInput}
            onChange={(e) => setExerciseInput(e.target.value)}
            disabled={exerciseResult !== "idle"}
            placeholder="type answer..."
            className={`px-3 py-1 font-sans font-bold text-center border-b-2 bg-slate-50/50 focus:bg-white focus:outline-none transition-all rounded ${
              exerciseResult === "correct"
                ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                : exerciseResult === "wrong"
                ? "bg-rose-50 border-rose-500 text-rose-800"
                : "border-amber-400 focus:border-blue-500"
            }`}
            style={{ width: `${Math.max(130, exerciseInput.length * 9 + 30)}px` }}
          />
        </span>
        {parts[1]}
      </div>
    );
  };

  const renderExerciseContent = () => {
    if (!currentExercise) return renderDefaultContent();
    return (
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question {subQuestionIndex + 1} of {exercises.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const key = `${currentId}-${subQuestionIndex}`;
                  setFlaggedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  flaggedQuestions[`${currentId}-${subQuestionIndex}`]
                    ? "bg-amber-400 text-white border-amber-400"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                {flaggedQuestions[`${currentId}-${subQuestionIndex}`] ? "Flagged" : "Flag"}
              </button>
            </div>
          </div>
          
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Fill in the blank:
          </h3>
          
          {renderInlineBlankQuestion(currentExercise.question)}
          
          {currentExercise.hint && exerciseResult === "idle" && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 transition cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showHint ? "Hide Hint" : "Request Hint"}
            </button>
          )}
          
          <AnimatePresence>
            {showHint && exerciseResult === "idle" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 bg-amber-50/70 border border-amber-100 text-amber-800 rounded-xl p-4 text-xs font-semibold leading-relaxed"
              >
                💡 Hint: {currentExercise.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {exerciseResult !== "idle" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 mt-6 border flex gap-3 ${
              exerciseResult === "correct" 
                ? "bg-emerald-55/10 border-emerald-200 text-emerald-900" 
                : "bg-rose-55/10 border-rose-200 text-rose-900"
            }`}
          >
            <div className="mt-0.5">
              {exerciseResult === "correct" 
                ? <Check className="w-5 h-5 text-emerald-600" />
                : <AlertCircle className="w-5 h-5 text-rose-600" />
              }
            </div>
            <div>
              <p className="font-bold text-sm mb-1">
                {exerciseResult === "correct" ? "Correct Answer!" : "Incorrect"}
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                {exerciseResult === "correct" 
                  ? `Your answer "${exerciseInput}" is correct.` 
                  : `The correct answer is "${currentExercise.answer}". You entered "${exerciseInput}".`
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const renderQuizContent = () => {
    if (!currentQuiz) return renderDefaultContent();
    return (
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question {subQuestionIndex + 1} of {quizzes.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const key = `${currentId}-${subQuestionIndex}`;
                  setFlaggedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  flaggedQuestions[`${currentId}-${subQuestionIndex}`]
                    ? "bg-amber-400 text-white border-amber-400"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                {flaggedQuestions[`${currentId}-${subQuestionIndex}`] ? "Flagged" : "Flag"}
              </button>
            </div>
          </div>
          
          <h3 className="text-base font-bold text-slate-800 mb-6 leading-snug">
            {currentQuiz.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = quizSelected === idx;
              const isEliminated = eliminatedOptions[idx];
              
              let borderColor = "border-slate-200 hover:border-slate-300";
              let bgColor = "bg-white";
              let textColor = "text-slate-800";
              
              if (isEliminated) {
                borderColor = "border-slate-100 opacity-40";
                bgColor = "bg-slate-50";
                textColor = "text-slate-400 line-through select-none";
              } else if (quizResult !== "idle") {
                if (idx === currentQuiz.correctIndex) {
                  borderColor = "border-emerald-500";
                  bgColor = "bg-emerald-50/50";
                  textColor = "text-emerald-900";
                } else if (isSelected && quizResult === "wrong") {
                  borderColor = "border-rose-500";
                  bgColor = "bg-rose-50/50";
                  textColor = "text-rose-900";
                }
              } else if (isSelected) {
                borderColor = "border-[#005691]";
                bgColor = "bg-blue-50/30";
                textColor = "text-[#005691]";
              }
              
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-2 group transition-all"
                >
                  <button
                    onClick={() => {
                      if (quizResult !== "idle" || isEliminated) return;
                      setQuizSelected(idx);
                    }}
                    disabled={quizResult !== "idle" || isEliminated}
                    className={`flex-1 text-left p-4 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-between ${borderColor} ${bgColor} ${textColor} ${
                      quizResult === "idle" && !isEliminated ? "cursor-pointer hover:shadow-sm" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border transition-all ${
                        quizResult !== "idle" && idx === currentQuiz.correctIndex 
                          ? "bg-emerald-500 border-emerald-500 text-white" 
                          : quizResult !== "idle" && isSelected && quizResult === "wrong" 
                          ? "bg-rose-500 border-rose-500 text-white" 
                          : isSelected 
                          ? "bg-[#005691] border-[#005691] text-white" 
                          : isEliminated
                          ? "bg-slate-200 border-slate-200 text-slate-400"
                          : "bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-slate-100"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  </button>
                  
                  {/* Eliminate Button */}
                  {quizResult === "idle" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEliminatedOptions(prev => ({ ...prev, [idx]: !prev[idx] }));
                        if (isSelected) setQuizSelected(null);
                      }}
                      title={isEliminated ? "Restore option" : "Eliminate option"}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        isEliminated 
                          ? "bg-amber-50 border-amber-200 text-amber-600"
                          : "border-slate-200 text-slate-400 hover:border-slate-350 hover:text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {isEliminated ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {quizResult !== "idle" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 mt-6 border flex gap-3 ${
              quizResult === "correct" 
                ? "bg-emerald-55/10 border-emerald-200 text-emerald-900" 
                : "bg-rose-55/10 border-rose-200 text-rose-900"
            }`}
          >
            <div className="mt-0.5">
              {quizResult === "correct" 
                ? <Check className="w-5 h-5 text-emerald-600" />
                : <AlertCircle className="w-5 h-5 text-rose-600" />
              }
            </div>
            <div>
              <p className="font-bold text-sm mb-1">
                {quizResult === "correct" ? "Correct Answer" : "Incorrect Answer"}
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                {currentQuiz.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const renderDefaultContent = () => (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">{typeEmoji[currentTask?.type || ""] || "📚"}</div>
      <h3 className="text-xl font-black text-midnight mb-2">{currentTask?.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{currentTask?.description}</p>
      <div className="flex items-center justify-center gap-4 mb-6 text-sm">
        <span className="text-gray-400 font-medium">⏱ {currentTask?.estimatedMinutes} 分钟</span>
        <span className="text-amber-600 font-bold">+{currentTask?.xpReward} XP</span>
      </div>
      <button onClick={handleNextStep}
        className="flex-1 max-w-sm py-3 rounded-2xl bg-midnight text-white font-black text-sm hover:bg-midnight/90 active:scale-95 transition-all shadow-lg cursor-pointer">
        {isLastStep ? "完成全部 ✓" : "完成并继续 →"}
      </button>
    </div>
  );

  const renderCurrentContent = () => {
    if (!currentTask) return null;
    switch (currentTask.type) {
      case "video": return renderVideoContent();
      case "exercise": return renderExerciseContent();
      case "quiz": return renderQuizContent();
      default: return renderDefaultContent();
    }
  };

  const totalQuestions = currentTask?.type === "exercise" ? exercises.length : quizzes.length;
  const isQuestionActiveChecked = currentTask?.type === "exercise" ? exerciseResult !== "idle" : quizResult !== "idle";
  const isCheckDisabled = currentTask?.type === "exercise" ? !exerciseInput.trim() : quizSelected === null;

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        className={`relative bg-white rounded-3xl shadow-2xl border border-slate-250 w-full overflow-hidden transition-all duration-300 flex flex-col ${
          isCollegeBoardStyle 
            ? "max-w-5xl h-[85vh] md:h-[80vh]" 
            : "max-w-lg"
        }`}
        initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
      >
        {/* Header Section */}
        {isCollegeBoardStyle ? (
          <div className="bg-[#0f2c59] text-white px-6 py-4 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="text-[#ffc72c] font-black tracking-wider text-sm">AP® CLASSROOM</span>
              <span className="text-blue-200/50">|</span>
              <span className="text-xs font-bold text-slate-300">Topic {dayPlan.topicSubtitle || dayPlan.topicTitle}</span>
            </div>
            
            {/* Timer component */}
            <div className="flex items-center gap-2 bg-blue-950/60 border border-blue-900 rounded-lg px-3 py-1 text-sm font-mono text-white">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {!timerHidden ? (
                <span>{formatTime(timeLeft)}</span>
              ) : (
                <span className="text-xs text-slate-400">Timer Active</span>
              )}
              <button 
                onClick={() => setTimerHidden(!timerHidden)}
                className="text-[10px] text-amber-400 font-bold uppercase tracking-wider ml-1.5 hover:text-amber-300 cursor-pointer"
              >
                {timerHidden ? "Show" : "Hide"}
              </button>
            </div>
            
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
              <X className="w-5 h-5 text-slate-300 hover:text-white" />
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 text-white flex items-center justify-between shrink-0">
            <div>
              <p className="text-xs font-bold opacity-80">{dayPlan.topicTitle}</p>
              <p className="text-sm font-black mt-0.5">{dayPlan.date} 学习任务流</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
          </div>
        )}

        {/* Task Progress Bar (only for video/default step or small task layout) */}
        {!isCollegeBoardStyle && (
          <div className="h-1.5 bg-gray-100 shrink-0">
            <motion.div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
              animate={{ width: ((Object.values(completedTasks).filter(Boolean).length / sortedTasks.length) * 100 || 0) + "%" }} />
          </div>
        )}

        {/* Content Body */}
        {showCompletion ? (
          <div className="p-6 flex-1 flex flex-col justify-center items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
              <motion.div animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-7xl mb-4">🎉</motion.div>
              <h3 className="text-2xl font-black text-midnight mb-2">全部完成!</h3>
              <p className="text-gray-500 mb-2">恭喜完成今日所有学习任务</p>
              <p className="text-3xl font-black text-emerald-500 mb-6">+{sortedTasks.reduce((sum, t) => sum + t.xpReward, 0)} XP</p>
              <button onClick={handleFinish}
                className="px-8 py-3 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 active:scale-95 transition-all flex items-center gap-2 mx-auto shadow-lg cursor-pointer">
                <Sparkles className="w-5 h-5" /> 打卡获取奖励 <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        ) : isCollegeBoardStyle ? (
          <div className="flex-1 flex overflow-hidden bg-slate-50/20">
            {/* Left Column: Stimulus or Study Directions */}
            <div className="w-1/2 border-r border-slate-200 bg-[#f8fafc]/30 p-6 overflow-y-auto select-text">
              {currentTask.type === "quiz" && currentQuiz?.stimulus ? (
                <div className="space-y-4">
                  <div className="bg-[#0f2c59]/5 border border-blue-200/50 rounded-xl px-4 py-2.5 text-[#0f2c59] text-xs font-bold uppercase tracking-wider">
                    📜 Stimulus Material
                  </div>
                  <div className="bg-[#fcfbf9] border border-amber-250/30 rounded-2xl p-6 shadow-inner">
                    <p className="text-sm font-serif italic text-slate-800 leading-relaxed whitespace-pre-line">
                      {currentQuiz.stimulus}
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold italic text-center">
                    Directions: Read the source above and select the best response.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-250/30 rounded-xl px-4 py-3 text-blue-800 text-[11px] leading-relaxed">
                    <span className="font-black uppercase tracking-wider block mb-1">Practice Instructions</span>
                    Complete the fill-in-the-blank practice below. Type your response directly in the inline box and click <strong>Check Answer</strong> to proceed.
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Topic Details</span>
                    <h4 className="font-extrabold text-slate-700 text-sm mb-2">{dayPlan.topicTitle}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">{dayPlan.description}</p>
                    
                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <span className="text-[9px] font-black text-[#0f2c59] uppercase tracking-widest block mb-2">Study Focus Areas</span>
                      <ul className="list-disc pl-4 text-slate-500 text-xs space-y-1.5 leading-relaxed">
                        <li>Focus on historical contextualization and chronology.</li>
                        <li>Identify major political, social, and cultural changes over time.</li>
                        <li>Understand the historical significance of pre-Columbian and colonial interactions.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Question Content */}
            <div className="w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
              <motion.div 
                key={`${currentStep}-${subQuestionIndex}`} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col"
              >
                {renderCurrentContent()}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "65vh" }}>
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-gray-400">步骤 {currentStep + 1} / {sortedTasks.length}</span>
                <span className="text-xs font-bold bg-midnight/10 text-midnight px-2 py-0.5 rounded-full">{typeLabel[currentTask?.type || ""] || ""}</span>
              </div>
              {renderCurrentContent()}
            </motion.div>
          </div>
        )}

        {/* Footer Section */}
        {isCollegeBoardStyle ? (
          <div className="bg-slate-100/90 border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 relative select-none">
            
            {/* Question Navigator */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNavigator(!showNavigator)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition cursor-pointer"
              >
                Question Navigator
              </button>
              
              <AnimatePresence>
                {showNavigator && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNavigator(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute left-6 bottom-16 bg-white border border-slate-250 rounded-2xl shadow-xl p-4 z-50 w-64"
                    >
                      <h4 className="font-black text-[10px] uppercase tracking-wider text-slate-400 mb-3">Questions list</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: totalQuestions }).map((_, idx) => {
                          const isAnswered = currentTask.type === "exercise" 
                            ? exerciseResultsHistory[idx] !== undefined 
                            : quizResultsHistory[idx] !== undefined;
                          const isQFlagged = flaggedQuestions[`${currentId}-${idx}`];
                          const isActive = subQuestionIndex === idx;
                          
                          let btnClass = "border-slate-200 hover:bg-slate-50 text-slate-600";
                          if (isActive) {
                            btnClass = "border-[#0f2c59] bg-blue-50 text-[#0f2c59] font-extrabold ring-2 ring-[#0f2c59]/20";
                          } else if (isAnswered) {
                            btnClass = "border-emerald-500 bg-emerald-50/50 text-emerald-700";
                          }
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                jumpToSubQuestion(idx);
                                setShowNavigator(false);
                              }}
                              className={`relative w-9 h-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                            >
                              {idx + 1}
                              {isQFlagged && (
                                <span className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-0.5">
                                  <Flag className="w-2.5 h-2.5 fill-current" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Middle navigation buttons (Prev / Next question jumps) */}
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevSubQuestion}
                disabled={subQuestionIndex === 0}
                className={`px-3 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                  subQuestionIndex === 0
                    ? "border-slate-200 text-slate-350 cursor-not-allowed bg-slate-50/30"
                    : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                }`}
              >
                Back
              </button>
              
              <button 
                onClick={handleNextSubQuestion}
                disabled={subQuestionIndex === totalQuestions - 1}
                className={`px-3 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                  subQuestionIndex === totalQuestions - 1
                    ? "border-slate-200 text-slate-350 cursor-not-allowed bg-slate-50/30"
                    : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>

            {/* Right side Action submit button */}
            <div>
              {!isQuestionActiveChecked ? (
                <button
                  onClick={currentTask.type === "exercise" ? handleCheckExercise : handleCheckQuiz}
                  disabled={isCheckDisabled}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow shadow-slate-200 ${
                    !isCheckDisabled
                      ? "bg-[#0f2c59] text-white hover:bg-[#1b437c] cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {currentTask.type === "exercise" ? "Check Answer" : "Submit Answer"}
                </button>
              ) : (
                <button
                  onClick={handleNextSubQuestion}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-1.5 shadow shadow-emerald-100 cursor-pointer"
                >
                  {subQuestionIndex === totalQuestions - 1 ? "Complete Section" : "Continue"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

