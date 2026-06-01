import { useMemo, useState } from "react";
import ReactPlayer from "react-player";

const Player = ReactPlayer as any;
import { CheckCircle, ChevronRight, RotateCcw } from "lucide-react";
import type { VideoKnowledgeCheck } from "../types/lesson";

interface InteractiveVideoPlayerProps {
  title: string;
  src: string;
  checks?: VideoKnowledgeCheck[];
}

export const InteractiveVideoPlayer = ({
  title,
  src,
  checks = [],
}: InteractiveVideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [activeCheck, setActiveCheck] = useState<VideoKnowledgeCheck | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const sortedChecks = useMemo(
    () => [...checks].sort((a, b) => a.timestamp - b.timestamp),
    [checks]
  );

  const handleProgress = (state: { playedSeconds: number }) => {
    if (activeCheck) {
      return;
    }

    const currentTime = state.playedSeconds;
    const nextCheck = sortedChecks.find(
      (check) => !answeredIds.has(check.id) && currentTime >= check.timestamp
    );

    if (nextCheck) {
      setPlaying(false);
      setActiveCheck(nextCheck);
      setSelectedChoiceId(null);
      setShowFeedback(false);
    }
  };

  const handleContinue = () => {
    if (!activeCheck) {
      return;
    }

    setAnsweredIds((previous) => {
      const next = new Set(previous);
      next.add(activeCheck.id);
      return next;
    });
    setActiveCheck(null);
    setSelectedChoiceId(null);
    setShowFeedback(false);
    setPlaying(true);
  };

  const selectedIsCorrect = selectedChoiceId === activeCheck?.correctChoiceId;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/25 bg-black shadow-glass">
      <Player
        url={src}
        title={title}
        controls
        playing={playing}
        width="100%"
        height="100%"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onProgress={handleProgress}
        progressInterval={500}
        className="h-full w-full"
      />

      {activeCheck && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-midnight/88 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-white p-5 shadow-glass md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">
                  Knowledge Check
                </p>
                <h4 className="mt-1 text-xl font-semibold leading-tight text-midnight">
                  {activeCheck.question}
                </h4>
              </div>
              <span className="shrink-0 rounded-full bg-midnight/10 px-3 py-1 text-xs font-semibold text-midnight">
                {Math.floor(activeCheck.timestamp / 60)}:
                {String(activeCheck.timestamp % 60).padStart(2, "0")}
              </span>
            </div>

            <div className="grid gap-2">
              {activeCheck.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const isCorrect = choice.id === activeCheck.correctChoiceId;
                const revealCorrect = showFeedback && isCorrect;
                const revealWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => {
                      setSelectedChoiceId(choice.id);
                      setShowFeedback(true);
                    }}
                    className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      revealCorrect
                        ? "border-moss bg-moss/12 text-moss"
                        : revealWrong
                          ? "border-red-300 bg-red-50 text-red-700"
                          : isSelected
                            ? "border-midnight bg-midnight/8 text-midnight"
                            : "border-midnight/10 bg-white text-midnight hover:border-midnight/30 hover:bg-midnight/5"
                    }`}
                  >
                    <span>{choice.text}</span>
                    {revealCorrect && <CheckCircle className="h-5 w-5 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  selectedIsCorrect
                    ? "bg-moss/10 text-moss"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {activeCheck.explanation}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              {!selectedIsCorrect && showFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedChoiceId(null);
                    setShowFeedback(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-midnight/15 px-4 py-2 text-sm font-semibold text-midnight transition hover:bg-midnight hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try again
                </button>
              )}
              <button
                type="button"
                disabled={!selectedIsCorrect}
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-midnight px-4 py-2 text-sm font-semibold text-white shadow-glow transition enabled:hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:bg-midnight/35"
              >
                Resume video
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
