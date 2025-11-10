import { BookOpen, Target, FileText, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionTypesViewProps {
  onPractice: (type: "SAQ" | "LEQ") => void;
}

const QUESTION_TYPES = [
  {
    name: "MCQ" as const,
    full: "Multiple Choice Questions",
    desc: "55题，55分钟",
    weight: "40%",
    color: "from-blue-500 to-blue-600",
    icon: Target,
    practiceType: null
  },
  {
    name: "SAQ" as const,
    full: "Short Answer Questions",
    desc: "3题，40分钟",
    weight: "20%",
    color: "from-green-500 to-green-600",
    icon: FileText,
    practiceType: "SAQ" as const
  },
  {
    name: "LEQ" as const,
    full: "Long Essay Question",
    desc: "1题（3段），40分钟",
    weight: "15%",
    color: "from-purple-500 to-purple-600",
    icon: BookOpen,
    practiceType: "LEQ" as const
  },
  {
    name: "DBQ" as const,
    full: "Document-Based Question",
    desc: "1题含7个文献，60分钟",
    weight: "25%",
    color: "from-orange-500 to-orange-600",
    icon: Award,
    practiceType: null
  }
] as const;

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
                  </div>
                  <p className="text-gray-600 mb-2 text-lg">{type.desc}</p>
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
                    {isPracticeAvailable ? "开始练习" : "暂无练习"}
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
