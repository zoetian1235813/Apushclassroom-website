import { FileText, ChevronRight } from "lucide-react";

export const PastExamsView = () => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-10 rounded-3xl shadow-2xl">
      <h1 className="text-5xl font-black mb-3">Past Exams</h1>
      <p className="text-xl opacity-95">Official AP US History practice exams</p>
    </div>

    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-8 rounded-2xl shadow-lg">
      <div className="flex items-start gap-6">
        <div className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
          <FileText className="w-12 h-12 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-3 text-gray-800">
            AP US History 2019 Practice Exam
          </h3>
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="bg-purple-600 text-white px-4 py-2 text-sm rounded-full">
              55 MCQ
            </span>
            <span className="border-2 px-4 py-2 text-sm rounded-full">55 minutes</span>
            <span className="border-2 px-4 py-2 text-sm rounded-full">Official Exam</span>
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            Complete practice exam with authentic AP questions covering all units.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold px-8 py-3 rounded-xl">
              View Exam PDF
            </button>
            <button className="border-2 font-bold px-8 py-3 rounded-xl">Download PDF</button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg border-2 border-blue-200">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">使用建议</h3>
      <ul className="space-y-4">
        {[
          "在规定时间内完成练习，模拟真实考试环境",
          "完成后仔细查看解析，理解每道题的考点",
          "记录错题并复习相关知识点",
          "多次练习以熟悉题型和提高答题速度",
        ].map((tip) => (
          <li
            key={tip}
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm"
          >
            <ChevronRight className="w-6 h-6 mt-0.5 text-blue-600 flex-shrink-0" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
