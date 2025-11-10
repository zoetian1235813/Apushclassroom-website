import { BookOpen, Target, CheckCircle } from "lucide-react";
import { Topic, Unit } from "../../types/lesson";

interface StudyViewProps {
  selectedUnit: Unit;
  selectedTopic: Topic;
  onOpenNotes: (unit: Unit, topic: Topic) => void;
  onOpenTopicQuestions: (unit: Unit, topic: Topic) => void;
  hasTopicQuestions: boolean;
}

export const StudyView = ({
  selectedUnit,
  selectedTopic,
  onOpenNotes,
  onOpenTopicQuestions,
  hasTopicQuestions,
}: StudyViewProps) => (
  <div className="space-y-8">
    <section className="glass-panel space-y-4 px-6 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${selectedUnit.color} px-4 py-2 text-sm font-semibold text-white shadow-glow`}
        >
          Unit {selectedUnit.id}
        </span>
        <span className="zen-chip text-xs">{selectedUnit.period}</span>
      </div>
      <h1 className="text-3xl font-semibold text-midnight sm:text-4xl">{selectedUnit.title}</h1>
      <h2 className="text-xl font-medium text-midnight/70 sm:text-2xl">
        {selectedTopic.id} · {selectedTopic.title}
      </h2>
      <p className="text-sm text-midnight/60">
        拖拽、标记、记录。学习助手会根据完成情况推送下一步建议，陪你完成整个单元。
      </p>
    </section>

    <div className="grid gap-6 md:grid-cols-2">
      <div className="glass-card h-full space-y-5 border border-white/25 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-glass">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="zen-chip text-xs">Notes 📓</span>
            <h3 className="text-2xl font-semibold text-midnight">Study Notes</h3>
            <p className="text-sm text-midnight/70">
              关键概念、历史语境与图片速记，帮助梳理 {selectedTopic.title} 的每个知识点。
            </p>
          </div>
          <div className="rounded-2xl bg-midnight/90 p-4 text-3xl text-white shadow-glow">
            <BookOpen className="h-7 w-7" />
          </div>
        </div>
        <button
          className="zen-pill w-full justify-center hover:bg-midnight/90"
          onClick={() => onOpenNotes(selectedUnit, selectedTopic)}
        >
          打开学习材料
        </button>
      </div>

      <div className="glass-card h-full space-y-5 border border-white/25 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-glass">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="zen-chip text-xs">Practice 🎯</span>
            <h3 className="text-2xl font-semibold text-midnight">
              {selectedTopic.isProgressCheck ? "Progress Check" : "Topic Questions"}
            </h3>
            <p className="text-sm text-midnight/70">
              {selectedTopic.isProgressCheck
                ? "混合题型节奏校准，完成后会更新学习进度。"
                : "拖拽匹配 + 提示功能，集中巩固本主题核心考点。"}
            </p>
          </div>
          <div className="rounded-2xl bg-midnight/90 p-4 text-3xl text-white shadow-glow">
            {selectedTopic.isProgressCheck ? (
              <CheckCircle className="h-7 w-7" />
            ) : (
              <Target className="h-7 w-7" />
            )}
          </div>
        </div>
        <button
          className={`zen-pill w-full justify-center ${
            !hasTopicQuestions
              ? "cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-300"
              : "hover:bg-midnight/90"
          }`}
          onClick={() => {
            if (!hasTopicQuestions) {
              return;
            }
            onOpenTopicQuestions(selectedUnit, selectedTopic);
          }}
          disabled={!hasTopicQuestions}
        >
          {selectedTopic.isProgressCheck
            ? "开始进度校准"
            : hasTopicQuestions
            ? "开始练习"
            : "题目即将上线"}
        </button>
      </div>
    </div>
  </div>
);
