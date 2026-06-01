import { BookOpen, Target, FileText, Award, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionTypesViewProps {
  onPractice: (type: "SAQ" | "LEQ") => void;
}

type QuestionTypeDefinition = {
  name: "MCQ" | "SAQ" | "LEQ" | "DBQ";
  full: string;
  desc: string;
  helper?: string;
  weight: string;
  color: string;
  icon: typeof BookOpen;
  practiceType: "SAQ" | "LEQ" | null;
  badge?: { text: string; className?: string; icon?: typeof Sparkles };
  buttonLabel?: string;
};

const QUESTION_TYPES: QuestionTypeDefinition[] = [
  {
    name: "MCQ",
    full: "Multiple Choice Questions",
    desc: "55题，55分钟",
    weight: "40%",
    color: "from-blue-500 to-blue-600",
    icon: Target,
    practiceType: null,
  },
  {
    name: "SAQ",
    full: "Short Answer Questions",
    desc: "3题，40分钟",
    weight: "20%",
    color: "from-green-500 to-green-600",
    icon: FileText,
    practiceType: "SAQ",
    buttonLabel: "开始练习",
  },
  {
    name: "LEQ",
    full: "Long Essay Question",
    desc: "2025 真题 + 官方 Rubric",
    helper: "Grade with AI · 逐项得分与改进建议",
    weight: "15%",
    color: "from-purple-500 to-purple-600",
    icon: BookOpen,
    practiceType: "LEQ",
    badge: { text: "AI 升级", className: "bg-white/20 text-white", icon: Sparkles },
    buttonLabel: "开启 AI 批改",
  },
  {
    name: "DBQ",
    full: "Document-Based Question",
    desc: "1题含7个文献，60分钟",
    weight: "25%",
    color: "from-orange-500 to-orange-600",
    icon: Award,
    practiceType: null,
  },
];

export const QuestionTypesView = ({ onPractice }: QuestionTypesViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-black mb-3">题型特训</h1>
        <p className="text-xl opacity-95">Master all AP US History question types</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {QUESTION_TYPES.map((type) => {
          const Icon = type.icon;
          const isPracticeAvailable = Boolean(type.practiceType);

          const handleStart = () => {
            if (!type.practiceType) {
              return;
            }
            if (type.practiceType === "SAQ") {
              navigate("/saq");
              return;
            }
            onPractice(type.practiceType);
          };

          return (
            <div
              key={type.name}
              className="bg-white border-2 border-gray-200 hover:border-blue-400 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-5">
                <div className={`p-4 bg-gradient-to-br ${type.color} rounded-2xl shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">{type.full}</h3>
                    <span className="bg-gray-800 text-white px-3 py-1 text-sm rounded-full">
                      {type.name}
                    </span>
                    {type.badge && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                          type.badge.className ?? "bg-white/20 text-white"
                        }`}
                      >
                        {type.badge.icon ? <type.badge.icon className="h-3 w-3" /> : null}
                        {type.badge.text}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2 text-lg">{type.desc}</p>
                  {type.helper && <p className="text-sm text-gray-500 mb-3">{type.helper}</p>}
                  <p className="text-gray-500 mb-5">
                    考试占比: <strong className="text-gray-800">{type.weight}</strong>
                  </p>
                  <button
                    onClick={handleStart}
                    disabled={!isPracticeAvailable}
                    className={`w-full bg-gradient-to-r ${type.color} text-white font-bold py-3 rounded-xl transition-opacity ${
                      isPracticeAvailable ? "" : "opacity-60 cursor-not-allowed"
                    }`}
                  >
                    {isPracticeAvailable ? type.buttonLabel ?? "开始练习" : "暂无练习"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
