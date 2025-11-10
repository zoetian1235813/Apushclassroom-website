import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import InteractivePractice from "./components/InteractivePractice";
import { ProgressSummary } from "./components/ProgressSummary";
import { Sidebar } from "./components/Sidebar";
import { HomeView } from "./components/views/HomeView";
import { StepView } from "./components/views/StepView";
import { StudyView } from "./components/views/StudyView";
import { QuestionTypesView } from "./components/views/QuestionTypesView";
import { PastExamsView } from "./components/views/PastExamsView";
import { TopicPracticeView } from "./components/views/TopicPracticeView";
import { unitContents } from "./data/units/units";
import { apushUnits } from "./data/apushUnits";
import { topicQuestionBank } from "./data/questions";
import { useLessonProgress } from "./state/lessonProgress";
import { buildStepsForTopic } from "./utils/lessonUtils";
import { LessonStep, Topic, Unit } from "./types/lesson";
import { View } from "./types/navigation";

function App() {
  const { isStepCompleted, toggleStep, markStep, completedSteps } =
    useLessonProgress();

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>(
    {}
  );
  const [practiceType, setPracticeType] = useState<"SAQ" | "LEQ" | null>(null);

  const allLessonSteps = useMemo(
    () =>
      apushUnits.flatMap((unit) =>
        unit.topics.flatMap((topic) => buildStepsForTopic(unit, topic))
      ),
    []
  );

  const totalStepCount = allLessonSteps.length;

  const completedStepCount = useMemo(
    () => allLessonSteps.filter((step) => completedSteps[step.id]).length,
    [allLessonSteps, completedSteps]
  );

  const overallProgress = totalStepCount
    ? Math.round((completedStepCount / totalStepCount) * 100)
    : 0;

  const selectedTopicSteps = useMemo(() => {
    if (!selectedUnit || !selectedTopic) {
      return [] as LessonStep[];
    }
    return buildStepsForTopic(selectedUnit, selectedTopic);
  }, [selectedUnit, selectedTopic]);

  const selectedStep = useMemo(() => {
    if (!selectedTopicSteps.length) {
      return null;
    }
    const fallback = selectedTopicSteps[0];
    if (!selectedStepId) {
      return fallback;
    }
    return (
      selectedTopicSteps.find((step) => step.id === selectedStepId) ?? fallback
    );
  }, [selectedTopicSteps, selectedStepId]);

  const notesStep = useMemo(
    () => selectedTopicSteps.find((step) => step.type === "notes") ?? null,
    [selectedTopicSteps]
  );

  useEffect(() => {
    if (!selectedTopicSteps.length) {
      setSelectedStepId(null);
      return;
    }
    if (
      !selectedStepId ||
      !selectedTopicSteps.some((step) => step.id === selectedStepId)
    ) {
      setSelectedStepId(selectedTopicSteps[0].id);
    }
  }, [selectedTopicSteps, selectedStepId]);

  const toggleMobileSidebar = (open: boolean) => {
    setIsSidebarOpen(open);
    if (open) {
      setIsSidebarCollapsed(false);
    }
  };

  const expandUnit = (unitId: number) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: true }));
  };

  const ensureTopicSelection = (unit: Unit, topic: Topic) => {
    setSelectedUnit(unit);
    setSelectedTopic(topic);
    const steps = buildStepsForTopic(unit, topic);
    if (steps.length) {
      setSelectedStepId(steps[0].id);
    } else {
      setSelectedStepId(null);
    }
    expandUnit(unit.id);
  };

  const handleNavigate = (view: View) => {
    if (view === "study" && (!selectedUnit || !selectedTopic)) {
      const fallbackUnit = apushUnits[0];
      const fallbackTopic = fallbackUnit.topics[0];
      if (fallbackUnit && fallbackTopic) {
        ensureTopicSelection(fallbackUnit, fallbackTopic);
      }
    }
    setCurrentView(view);
  };

  const handleUnitCardClick = (unit: Unit) => {
    if (!unit.topics.length) {
      return;
    }
    const firstTopic = unit.topics[0];
    ensureTopicSelection(unit, firstTopic);
    setCurrentView("step");
    toggleMobileSidebar(false);
  };

  const handleSelectTopic = (unit: Unit, topic: Topic) => {
    ensureTopicSelection(unit, topic);
    setCurrentView("study");
  };

  const handleOpenStep = (unit: Unit, topic: Topic, step: LessonStep) => {
    ensureTopicSelection(unit, topic);
    setSelectedStepId(step.id);
    setCurrentView("step");
  };

  const handleOpenTopicQuestions = (unit: Unit, topic: Topic) => {
    ensureTopicSelection(unit, topic);
    setCurrentView("topicPractice");
  };

  const handleSelectStep = (stepId: string) => {
    setSelectedStepId(stepId);
    setCurrentView("step");
  };

  const handlePracticeStart = (type: "SAQ" | "LEQ") => {
    setPracticeType(type);
    setCurrentView("practice");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white border-b-4 border-blue-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-blue-50 rounded-xl transition-colors"
                onClick={() => toggleMobileSidebar(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <X className="w-7 h-7 text-gray-700" />
                ) : (
                  <Menu className="w-7 h-7 text-gray-700" />
                )}
              </button>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  APUSH Learning Site
                </h1>
                <p className="text-xs font-medium text-gray-500">
                  AP US History Study Guide
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <ProgressSummary
            overallProgress={overallProgress}
            completedStepCount={completedStepCount}
            totalStepCount={totalStepCount}
          />
        </div>

        <div className="flex gap-8">
          <Sidebar
            units={apushUnits}
            selectedUnit={selectedUnit}
            selectedTopic={selectedTopic}
            selectedStep={selectedStep}
            expandedUnits={expandedUnits}
            isOpen={isSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onToggleMobile={toggleMobileSidebar}
            onToggleCollapse={setIsSidebarCollapsed}
            onToggleUnitExpand={(unitId) =>
              setExpandedUnits((prev) => ({
                ...prev,
                [unitId]: !prev[unitId],
              }))
            }
            onSelectTopic={handleSelectTopic}
            onOpenStep={handleOpenStep}
            onToggleStepCompleted={toggleStep}
            isStepCompleted={isStepCompleted}
            buildSteps={buildStepsForTopic}
            onNavigate={handleNavigate}
          />

          <main className="flex-1 min-w-0">
            {currentView === "home" && (
              <HomeView
                units={apushUnits}
                onNavigate={handleNavigate}
                onUnitClick={handleUnitCardClick}
              />
            )}

            {currentView === "study" && selectedUnit && selectedTopic && (
              <StudyView
                selectedUnit={selectedUnit}
                selectedTopic={selectedTopic}
                onOpenNotes={(unit, topic) => {
                  const [firstStep] = buildStepsForTopic(unit, topic);
                  if (firstStep) {
                    handleOpenStep(unit, topic, firstStep);
                  }
                }}
                onOpenTopicQuestions={handleOpenTopicQuestions}
                hasTopicQuestions={
                  topicQuestionBank[selectedTopic.id]?.length > 0
                }
              />
            )}

            {currentView === "step" &&
              selectedUnit &&
              selectedTopic &&
              selectedStep && (
                <StepView
                  selectedUnit={selectedUnit}
                  selectedTopic={selectedTopic}
                  selectedStep={selectedStep}
                  notesStep={notesStep}
                  isStepCompleted={isStepCompleted}
                  markStep={markStep}
                  onNavigate={handleNavigate}
                  onSelectStep={handleSelectStep}
                  unitContents={unitContents}
                  allStepsCompleted={
                    selectedTopicSteps.length > 0 &&
                    selectedTopicSteps.every((s) => completedSteps[s.id])
                  }
                  nextTopic={(() => {
                    const idx = selectedUnit.topics.findIndex(
                      (t) => t.id === selectedTopic.id
                    );
                    return selectedUnit.topics[idx + 1] ?? null;
                  })()}
                  onNavigateToTopic={(unit, topic) => {
                    ensureTopicSelection(unit, topic);
                    setCurrentView("step");
                  }}
                />
              )}

            {currentView === "topicPractice" &&
              selectedUnit &&
              selectedTopic && (
                <TopicPracticeView
                  selectedUnit={selectedUnit}
                  selectedTopic={selectedTopic}
                  questions={topicQuestionBank[selectedTopic.id] ?? []}
                  onBack={() => setCurrentView("study")}
                  onOpenNotes={() => {
                    const steps = buildStepsForTopic(
                      selectedUnit,
                      selectedTopic
                    );
                    const notesStepTarget =
                      steps.find((step) => step.type === "notes") ?? steps[0];
                    if (notesStepTarget) {
                      handleOpenStep(selectedUnit, selectedTopic, notesStepTarget);
                    } else {
                      setCurrentView("study");
                    }
                  }}
                />
              )}

            {currentView === "questionTypes" && (
              <QuestionTypesView onPractice={handlePracticeStart} />
            )}

            {currentView === "practice" && practiceType && (
              <InteractivePractice type={practiceType} />
            )}

            {currentView === "pastExams" && <PastExamsView />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
