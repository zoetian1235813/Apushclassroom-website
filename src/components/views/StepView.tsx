import {
  ChevronRight,
  CheckCircle,
  Square,
  Clock,
  PlayCircle,
  BookOpen,
} from "lucide-react";
import { LessonStep, Topic, Unit } from "../../types/lesson";
import { View } from "../../types/navigation";

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
  const stepCompleted = isStepCompleted(selectedStep.id);
  const topicKey = selectedStep.contentId ?? selectedTopic.id;
  const [unitPrefix] = selectedTopic.id.split(".");
  const unitIndex = Number.parseInt(unitPrefix ?? "1", 10) - 1;
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
              <video
                controls
                preload="metadata"
                className="w-full rounded-3xl border border-white/25 bg-black shadow-glass"
                src={selectedStep.videoSrc ?? ""}
              >
                Your browser does not support the video tag. Please use a modern browser.
              </video>
              <p className="text-xs text-midnight/50">
                Place the corresponding video file at {selectedStep.videoSrc ?? "the expected path"}.
              </p>
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
