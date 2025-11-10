import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { saqInteractiveBank } from "../../data/saqInteractiveBank";

type StepKey = "A" | "B" | "C";

const STEP_SEQUENCE: StepKey[] = ["A", "B", "C"];
const STEP_LABELS: Record<StepKey, string> = {
  A: "Thesis",
  B: "Evidence",
  C: "Analysis"
};

export default function SAQPractice() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<StepKey>("A");
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const questions = saqInteractiveBank;
  const current = questions[currentIndex];

  const { currentPrompt, currentOptions, currentAnswer } = useMemo(() => {
    if (!current) {
      return {
        currentPrompt: "",
        currentOptions: [] as string[],
        currentAnswer: ""
      };
    }
    if (step === "A") {
      return {
        currentPrompt: current.promptA,
        currentOptions: current.optionsA,
        currentAnswer: current.correctA
      };
    }
    if (step === "B") {
      return {
        currentPrompt: current.promptB,
        currentOptions: current.optionsB,
        currentAnswer: current.correctB
      };
    }
    return {
      currentPrompt: current.promptC,
      currentOptions: current.optionsC,
      currentAnswer: current.correctC
    };
  }, [current, step]);

  const answerCount =
    step === "A"
      ? 0
      : step === "B"
      ? 1
      : 2;

  const handleAnswer = (option: string) => {
    if (!current) {
      return;
    }
    setSelected(option);
    const correct = option === currentAnswer;
    setIsCorrect(correct);

    const audioPath = correct ? "/sounds/correct.mp3" : "/sounds/wrong.mp3";
    try {
      const sound = new Audio(audioPath);
      void sound.play().catch(() => {});
    } catch {
      // ignore audio errors so the flow continues
    }

    if (!correct) {
      return;
    }

    setTimeout(() => {
      const nextStepIndex = STEP_SEQUENCE.indexOf(step) + 1;
      const hasNextStep = nextStepIndex < STEP_SEQUENCE.length;
      if (hasNextStep) {
        setStep(STEP_SEQUENCE[nextStepIndex]);
      } else if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setStep("A");
      } else {
        setFinished(true);
      }
      setSelected(null);
      setIsCorrect(null);
    }, 600);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStep("A");
    setSelected(null);
    setIsCorrect(null);
    setFinished(false);
  };

  const handleBackHome = () => {
    navigate("/", { state: { view: "questionTypes" } });
  };

  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f7f3e9] text-[#2b3a4d]">
        <h1 className="text-2xl font-bold mb-4">No SAQ sets available</h1>
        <p className="text-base">Add questions to begin interactive practice.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f7f3e9] text-center px-6">
        <h1 className="text-3xl font-bold text-[#2b3a4d] mb-4">Great work!</h1>
        <p className="text-lg text-gray-700 mb-6">
          You have completed all SAQ practice sets. Keep up the momentum.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-lg bg-[#2b3a4d] text-white font-semibold hover:bg-[#1f2a3b] transition-colors"
          >
            Practice again
          </button>
          <button
            onClick={handleBackHome}
            className="px-6 py-3 rounded-lg bg-white border border-[#2b3a4d] text-[#2b3a4d] font-semibold hover:bg-[#f0ece1] transition-colors"
          >
            Back to question training
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = questions.length;
  const currentProgress = currentIndex * STEP_SEQUENCE.length + answerCount;
  const totalSteps = totalQuestions * STEP_SEQUENCE.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f3e9]">
      <header className="w-full bg-[#2b3a4d] text-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="uppercase text-xs tracking-[0.3em] text-green-200">
              Question Type Training
            </p>
            <h1 className="text-3xl font-bold">Short Answer Question Lab</h1>
          </div>
          <div className="text-sm text-green-100">
            {`Progress: ${currentIndex + 1}/${totalQuestions} | Step ${step} (${STEP_LABELS[step]})`}
          </div>
        </div>
      </header>

      {current?.type === "stimulus" && (
        <section className="sticky top-0 z-10 w-full bg-[#f0ece1] border-b border-[#d4cbb3] shadow-sm">
            <div className="max-w-5xl mx-auto px-6 py-5 space-y-2">
              {current.stimulus && (
                <div className="text-lg font-semibold text-[#2b3a4d] whitespace-pre-line">
                  {current.stimulus}
                </div>
              )}
              <div
                className="text-gray-700 text-sm leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: current.stimulusText ?? "" }}
              />
            </div>
        </section>
      )}

      <main className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-[#2b3a4d]">
                {current?.title}
              </h2>
              <p className="text-sm text-gray-600">
                Era focus: {current?.era}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e1d9c7] text-[#2b3a4d] font-semibold">
                Step {step}: {STEP_LABELS[step]}
              </span>
            </div>
          </div>

          <div className="w-full bg-[#e7dec6] rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="h-full bg-[#2b3a4d] transition-all duration-500"
              style={{
                width: `${((currentProgress + (isCorrect ? 1 : 0)) / totalSteps) * 100}%`
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${current?.id ?? "none"}-${step}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-[#ded3ba] rounded-3xl shadow-lg p-8"
            >
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                {currentPrompt}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOptions.map((option) => {
                  const isSelected = selected === option;
                  const stateClass = isSelected
                    ? isCorrect
                      ? "bg-green-200 border-green-600 text-green-900"
                      : "bg-red-200 border-red-600 text-red-900"
                    : "bg-white hover:bg-[#f4efe2]";
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`p-4 text-left border rounded-2xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2b3a4d] ${stateClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
