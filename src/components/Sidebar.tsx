import {
  BookOpen,
  BookMarked,
  Target,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  CheckSquare,
  Square,
  CheckCircle,
} from "lucide-react";
import { LessonStep, Topic, Unit } from "../types/lesson";
import { View } from "../types/navigation";

interface SidebarProps {
  units: Unit[];
  selectedUnit: Unit | null;
  selectedTopic: Topic | null;
  selectedStep: LessonStep | null;
  expandedUnits: Record<number, boolean>;
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleMobile: (open: boolean) => void;
  onToggleCollapse: (collapsed: boolean) => void;
  onToggleUnitExpand: (unitId: number) => void;
  onSelectTopic: (unit: Unit, topic: Topic) => void;
  onOpenStep: (unit: Unit, topic: Topic, step: LessonStep) => void;
  onToggleStepCompleted: (stepId: string) => void;
  isStepCompleted: (stepId: string) => boolean;
  buildSteps: (unit: Unit, topic: Topic) => LessonStep[];
  onNavigate: (view: View) => void;
}

const NAV_BUTTON_CLASS =
  "group flex w-full items-center gap-3 rounded-2xl bg-midnight px-4 py-3 text-left text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-midnight/90";

const CollapsedPanel = ({ onExpand }: { onExpand: () => void }) => (
  <div className="hidden h-full flex-col items-center justify-center gap-6 rounded-[26px] border border-white/35 bg-white/80 p-4 text-midnight shadow-glass backdrop-blur-glass lg:flex">
    <button
      type="button"
      onClick={onExpand}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight text-white shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-midnight/90"
      aria-label="展开学习导览"
    >
      <ChevronRight className="h-4 w-4" />
    </button>
    <span className="origin-center -rotate-90 whitespace-nowrap text-xs font-medium uppercase tracking-[0.4em] text-midnight/60">
      Expand
    </span>
  </div>
);

export const Sidebar = ({
  units,
  selectedUnit,
  selectedTopic,
  selectedStep,
  expandedUnits,
  isOpen,
  isCollapsed,
  onToggleMobile,
  onToggleCollapse,
  onToggleUnitExpand,
  onSelectTopic,
  onOpenStep,
  onToggleStepCompleted,
  isStepCompleted,
  buildSteps,
  onNavigate,
}: SidebarProps) => {
  const handleNavClick = (view: View) => {
    onNavigate(view);
    onToggleMobile(false);
  };

  const renderUnit = (unit: Unit) => {
    const isUnitSelected = selectedUnit?.id === unit.id;
    const unitExpanded = !!expandedUnits[unit.id];

    return (
      <div key={unit.id} className="space-y-3">
        <button
          type="button"
          onClick={() => onToggleUnitExpand(unit.id)}
          className={`flex w-full items-center justify-between rounded-2xl border border-white/25 px-4 py-3 text-left text-sm font-semibold text-midnight shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glass ${
            isUnitSelected ? "bg-white" : "bg-white/80"
          }`}
        >
          <span className="flex items-center gap-3">
            <span className="text-lg">📘</span>
            <span>
              Unit {unit.id}: {unit.title}
            </span>
          </span>
          {unitExpanded ? (
            <ChevronDown className="h-5 w-5 text-midnight/60" />
          ) : (
            <ChevronRight className="h-5 w-5 text-midnight/60" />
          )}
        </button>

        {unitExpanded && (
          <div className="space-y-2 rounded-2xl border border-white/20 bg-white p-3 shadow-glow">
            {unit.topics.map((topic) => {
              const steps = buildSteps(unit, topic);
              const isTopicSelected =
                selectedTopic?.id === topic.id && selectedUnit?.id === unit.id;
              const topicCompleted = steps.every((step) =>
                isStepCompleted(step.id)
              );

              return (
                <div
                  key={topic.id}
                  className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-sm transition-all hover:border-midnight/15"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopic(unit, topic);
                      handleNavClick("study");
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-all ${
                      isTopicSelected
                        ? "bg-midnight text-white"
                        : "text-midnight/75 hover:bg-midnight/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">✨</span>
                      <span>
                        {topic.id} {topic.title}
                      </span>
                    </span>
                    {topicCompleted && (
                      <CheckCircle className="h-4 w-4 text-moss" />
                    )}
                  </button>

                  <div className="space-y-1 border-t border-white/30 bg-white px-3 py-2 text-xs">
                    {steps.map((step) => {
                      const completed = isStepCompleted(step.id);
                      const isActive =
                        isTopicSelected &&
                        selectedStep?.id === step.id &&
                        selectedStep.type === step.type;

                      return (
                        <div
                          key={step.id}
                          className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 transition-all ${
                            isActive
                              ? "bg-midnight text-white shadow-glass"
                              : "text-midnight/65 hover:bg-midnight/5"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onOpenStep(unit, topic, step);
                              onToggleMobile(false);
                            }}
                            className="flex flex-1 items-center gap-2 text-left"
                          >
                            {step.type === "video" ? (
                              <PlayCircle className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span>{step.label}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleStepCompleted(step.id);
                            }}
                            className="text-midnight/40 transition-colors hover:text-moss"
                            aria-label={completed ? "取消完成" : "标记完成"}
                          >
                            {completed ? (
                              <CheckSquare className="h-4 w-4" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const expandedPanel = (
    <div className="glass-panel space-y-5 p-5 text-midnight lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
      <div className="hidden justify-end lg:flex">
        <button
          type="button"
          onClick={() => onToggleCollapse(true)}
          className="inline-flex items-center gap-1 rounded-full border border-midnight/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-midnight/70 transition-colors hover:border-midnight/40"
        >
          <ChevronLeft className="h-4 w-4" />
          收起
        </button>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          className={NAV_BUTTON_CLASS}
          onClick={() => handleNavClick("home")}
        >
          <BookOpen className="h-5 w-5 text-white" />
          <span className="flex-1">主页导航</span>
        </button>

        <button
          type="button"
          className={NAV_BUTTON_CLASS}
          onClick={() => handleNavClick("questionTypes")}
        >
          <Target className="h-5 w-5 text-white" />
          <span className="flex-1">题型特训</span>
        </button>

        <button
          type="button"
          className={NAV_BUTTON_CLASS}
          onClick={() => handleNavClick("wrongNotebook")}
        >
          <BookMarked className="h-5 w-5 text-white" />
          <span className="flex-1">错题本</span>
        </button>

        <button
          type="button"
          className={NAV_BUTTON_CLASS}
          onClick={() => handleNavClick("pastExams")}
        >
          <FileText className="h-5 w-5 text-white" />
          <span className="flex-1">历年真题</span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-midnight/60">
            Study by Unit
          </h3>
          <span className="text-sm text-midnight/55">Notion × Duolingo 🤝</span>
        </div>

        <div className="space-y-3">{units.map((unit) => renderUnit(unit))}</div>
      </div>
    </div>
  );

  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } flex-shrink-0 w-full ${isCollapsed ? "lg:w-20" : "lg:w-80"} lg:block`}
    >
      <div className="lg:sticky lg:top-36">
        {isCollapsed ? (
          <CollapsedPanel onExpand={() => onToggleCollapse(false)} />
        ) : (
          expandedPanel
        )}
      </div>
    </aside>
  );
};
