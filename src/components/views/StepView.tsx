import { useState } from "react";
import {
  ChevronRight,
  CheckCircle,
  Square,
  Clock,
  PlayCircle,
  BookOpen,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { InteractiveVideoPlayer } from "../InteractiveVideoPlayer";
import type { LessonStep, Topic, Unit } from "../../types/lesson";
import type { View } from "../../types/navigation";

interface StepViewProps {
  selectedUnit: Unit;
  selectedTopic: Topic;
  selectedStep: LessonStep;
  notesStep: LessonStep | null;
  isStepCompleted: (stepId: string) => boolean;
  markStep: (stepId: string, completed: boolean) => void;
  onNavigate: (view: View) => void;
  onSelectStep: (stepId: string) => void;
  unitContents: Array<Record<string, string>>;
  allStepsCompleted: boolean;
  nextTopic: { unit: Unit; topic: Topic } | null;
  onNavigateToTopic: (unit: Unit, topic: Topic) => void;
}

export const StepView = ({
  selectedUnit,
  selectedTopic,
  selectedStep,
  notesStep,
  isStepCompleted,
  markStep,
  onNavigate,
  onSelectStep,
  unitContents,
  allStepsCompleted,
  nextTopic,
  onNavigateToTopic,
}: StepViewProps) => {
  const [activeCheckIndex, setActiveCheckIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const stepCompleted = isStepCompleted(selectedStep.id);
  const topicKey = selectedStep.contentId ?? selectedTopic.id;
  const [unitPrefix] = selectedTopic.id.split(".");
  const parsedUnit = Number.parseInt(unitPrefix ?? "", 10);
  const unitIndex = Number.isNaN(parsedUnit) ? selectedUnit.id - 1 : parsedUnit - 1;
  const topicContent =
    unitContents[unitIndex]?.[topicKey] ??
    "<div class='text-midnight/50 text-sm'>Notes are not available for this topic yet.</div>";

  const handleNextClick = () => {
    if (nextTopic) {
      onNavigateToTopic(nextTopic.unit, nextTopic.topic);
    } else {
      onNavigate("home");
    }
  };

  const nextLabel = (() => {
    if (!nextTopic) {
      return "返回首页";
    }
    if (nextTopic.unit.id === selectedUnit.id) {
      return `下一主题 → ${nextTopic.topic.id} ${nextTopic.topic.title}`;
    }
    return `下一单元 → Unit ${nextTopic.unit.id} ${nextTopic.unit.title}`;
  })();

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => onNavigate("study")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-midnight px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-1 md:w-auto"
        >
          <ChevronRight className="h-4 w-4 -rotate-180" />
          返回学习概览
        </button>
        <button
          type="button"
          onClick={() => markStep(selectedStep.id, !stepCompleted)}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all md:w-auto ${
            stepCompleted
              ? "border border-moss/45 bg-moss/20 text-moss shadow-glow"
              : "bg-midnight text-white shadow-glow hover:-translate-y-1"
          }`}
        >
          {stepCompleted ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          {stepCompleted ? "已标记完成" : "标记为完成"}
        </button>
        {selectedStep.type === "video" && notesStep && (
          <button
            type="button"
            onClick={() => onSelectStep(notesStep.id)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-midnight/15 px-5 py-2 text-sm font-semibold text-midnight transition-all hover:-translate-y-1 hover:bg-midnight hover:text-white md:w-auto"
          >
            下一步：阅读笔记
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="glass-panel overflow-hidden border border-white/25">
        <div className="space-y-3 border-b border-white/20 px-6 py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-midnight/55">
            Unit {selectedUnit.id} · {selectedUnit.period}
          </p>
          <h2 className="text-3xl font-semibold text-midnight">
            {selectedTopic.id} {selectedTopic.title}
          </h2>
          <h3 className="flex items-center gap-2 text-lg font-medium text-midnight/75">
            {selectedStep.type === "video" ? (
              <>
                <PlayCircle className="h-5 w-5" />
                视频微课 · {selectedStep.label}
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5" />
                精读笔记 · {selectedStep.label}
              </>
            )}
          </h3>
          {selectedStep.description && (
            <p className="text-sm text-midnight/60">{selectedStep.description}</p>
          )}
        </div>

        <div className="space-y-4 px-6 py-6">
          {selectedStep.type === "video" ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-midnight/60">
                <Clock className="h-4 w-4" />
                <span>{selectedStep.durationLabel ?? "~5-10 minutes"}</span>
              </div>
              {selectedStep.videoEmbedUrl && (selectedStep.videoEmbedUrl.includes("bilibili.com") || selectedStep.videoEmbedUrl.includes("player.bilibili.com")) ? (
                <div className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/25 bg-black shadow-glass">
                    <iframe
                      src={selectedStep.videoEmbedUrl}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  
                  {/* Bilibili Interactive Question Checkpoints */}
                  {selectedStep.videoChecks && selectedStep.videoChecks.length > 0 && (
                    <div className="rounded-3xl border border-midnight/15 bg-white/60 p-6 backdrop-blur-md shadow-glow">
                      <div className="flex items-center gap-2 border-b border-midnight/5 pb-4 mb-4">
                        <HelpCircle className="h-5 w-5 text-midnight" />
                        <h4 className="text-lg font-bold text-midnight">视频同步互动问答 (Video Sync Q&A)</h4>
                        <span className="ml-auto rounded-full bg-midnight/10 px-3 py-1 text-xs font-semibold text-midnight">
                          共 {selectedStep.videoChecks.length} 道检测题
                        </span>
                      </div>
                      <p className="text-xs text-midnight/55 mb-4">
                        本视频包含以下互动检测点。请在播放到相应时间点时，点击下方按钮参与测试，检测您的学习成果！
                      </p>
                      
                      {/* 检测点导航按钮 */}
                      <div className="flex flex-wrap gap-2.5 mb-5">
                        {selectedStep.videoChecks.map((check, idx) => {
                          const isSelected = activeCheckIndex === idx;
                          const hasAnswered = answers[check.id] !== undefined;
                          const isCorrect = answers[check.id] === check.correctChoiceId;
                          
                          return (
                            <button
                              key={check.id}
                              type="button"
                              onClick={() => {
                                setActiveCheckIndex(idx);
                              }}
                              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold border transition ${
                                isSelected
                                  ? "bg-midnight text-white border-midnight shadow-glow"
                                  : hasAnswered
                                    ? isCorrect
                                      ? "bg-moss/10 text-moss border-moss/30 hover:bg-moss/20"
                                      : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                    : "bg-white text-midnight border-midnight/10 hover:border-midnight/30 hover:bg-midnight/5"
                              }`}
                            >
                              <PlayCircle className="h-3.5 w-3.5" />
                              检测点 {idx + 1} ({Math.floor(check.timestamp / 60)}:
                              {String(check.timestamp % 60).padStart(2, "0")})
                              {hasAnswered && (
                                <span className="ml-1 text-[10px] uppercase font-bold">
                                  {isCorrect ? "✓ 对" : "✗ 错"}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* 当前选择的题目卡片 */}
                      {activeCheckIndex !== null && selectedStep.videoChecks[activeCheckIndex] && (() => {
                        const check = selectedStep.videoChecks[activeCheckIndex];
                        const selectedChoiceId = answers[check.id];
                        const showFeedback = revealed[check.id];
                        const selectedIsCorrect = selectedChoiceId === check.correctChoiceId;
                        
                        return (
                          <div className="rounded-2xl border border-midnight/5 bg-white/80 p-5 shadow-sm space-y-4">
                            <div className="flex items-start justify-between gap-3">
                              <h5 className="text-base font-bold text-midnight leading-snug">
                                {activeCheckIndex + 1}. {check.question}
                              </h5>
                              <span className="shrink-0 rounded-full bg-midnight/5 px-2.5 py-0.5 text-xs text-midnight/65">
                                时间点 {Math.floor(check.timestamp / 60)}:
                                {String(check.timestamp % 60).padStart(2, "0")}
                              </span>
                            </div>
                            
                            <div className="grid gap-2">
                              {check.choices.map((choice) => {
                                const isSelected = selectedChoiceId === choice.id;
                                const isCorrect = choice.id === check.correctChoiceId;
                                const revealCorrect = showFeedback && isCorrect;
                                const revealWrong = showFeedback && isSelected && !isCorrect;
                                
                                return (
                                  <button
                                    key={choice.id}
                                    type="button"
                                    onClick={() => {
                                      setAnswers(prev => ({ ...prev, [check.id]: choice.id }));
                                      setRevealed(prev => ({ ...prev, [check.id]: true }));
                                    }}
                                    className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition w-full ${
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
                                    {revealCorrect && <CheckCircle className="h-5 w-5 shrink-0 text-moss" />}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {showFeedback && (
                              <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                  selectedIsCorrect
                                    ? "bg-moss/10 text-moss border border-moss/20"
                                    : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                              >
                                <p className="font-semibold mb-1">{selectedIsCorrect ? "回答正确！" : "回答错误，再想想看？"}</p>
                                <p className="text-xs opacity-90">{check.explanation}</p>
                              </div>
                            )}
                            
                            {!selectedIsCorrect && showFeedback && (
                              <button
                                key="retry-btn"
                                type="button"
                                onClick={() => {
                                  setAnswers(prev => {
                                    const next = { ...prev };
                                    delete next[check.id];
                                    return next;
                                  });
                                  setRevealed(prev => ({ ...prev, [check.id]: false }));
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full border border-midnight/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-midnight hover:bg-midnight hover:text-white transition"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                重试此题 (Try Again)
                              </button>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : selectedStep.videoEmbedUrl || selectedStep.videoChecks?.length ? (
                <InteractiveVideoPlayer
                  key={selectedStep.id}
                  title={selectedStep.label}
                  src={selectedStep.videoLinkUrl ?? selectedStep.videoEmbedUrl ?? ""}
                  checks={selectedStep.videoChecks}
                />
              ) : selectedStep.videoLinkUrl ? (
                <div className="rounded-3xl border border-midnight/10 bg-white px-6 py-8 shadow-glass">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-midnight/10 px-3 py-1 text-xs font-semibold text-midnight">
                      <PlayCircle className="h-4 w-4" />
                      External video source
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-midnight/65">
                      当前版本使用外部播放列表。点击下方按钮打开对应小节视频。
                    </p>
                    <a
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-midnight px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-[1px]"
                      href={selectedStep.videoLinkUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedStep.videoSourceLabel ?? "Open video source"}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-3xl border border-white/25 bg-black shadow-glass"
                  src={selectedStep.videoSrc ?? ""}
                >
                  Your browser does not support the video tag. Please use a modern browser.
                </video>
              )}
              <div className="flex flex-col gap-2 text-xs text-midnight/50">
                {selectedStep.videoLinkUrl && selectedStep.videoEmbedUrl && (
                  <a
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-midnight/15 bg-white px-3 py-1 font-semibold text-midnight shadow-glow transition hover:-translate-y-[1px]"
                    href={selectedStep.videoLinkUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedStep.videoSourceLabel ?? "Watch source"}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {selectedStep.videoSrc && !selectedStep.videoEmbedUrl && (
                  <span>Place the corresponding video file at {selectedStep.videoSrc}.</span>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`unit${selectedTopic.id}`}
              dangerouslySetInnerHTML={{
                __html: topicContent,
              }}
            />
          )}
        </div>
      </div>

      {allStepsCompleted && (
        <button
          type="button"
          onClick={handleNextClick}
          className="fixed bottom-6 right-6 inline-flex items-center gap-3 rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:translate-y-[-2px]"
        >
          <span>{nextLabel}</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
