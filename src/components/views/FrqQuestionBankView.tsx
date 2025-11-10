import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  Filter,
  Loader2,
  NotebookText,
  Sparkles,
} from "lucide-react";
import { FrqGradeResponse, FrqQuestion, FrqQuestionType } from "../../types/frq";
import { gradeFrqAnswer } from "../../utils/frqGrader";

interface FrqQuestionBankViewProps {
  questions: FrqQuestion[];
  onBack: () => void;
}

const filterLabel = (value: string | number) => value.toString();

export const FrqQuestionBankView = ({ questions, onBack }: FrqQuestionBankViewProps) => {
  const [typeFilter, setTypeFilter] = useState<FrqQuestionType | "all">("all");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(questions[0]?.id ?? "");
  const [responseText, setResponseText] = useState("");
  const [gradingState, setGradingState] = useState<{
    loading: boolean;
    error: string | null;
    result: FrqGradeResponse | null;
  }>({ loading: false, error: null, result: null });

  const typeOptions = useMemo(() => {
    const set = new Set<FrqQuestionType>();
    questions.forEach((q) => set.add(q.type));
    return Array.from(set);
  }, [questions]);

  const yearOptions = useMemo(() => {
    const set = new Set<number>();
    questions.forEach((q) => set.add(q.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [questions]);

  const filteredQuestions = useMemo(
    () =>
      questions.filter((question) => {
        if (typeFilter !== "all" && question.type !== typeFilter) {
          return false;
        }
        if (yearFilter !== "all" && question.year !== yearFilter) {
          return false;
        }
        return true;
      }),
    [questions, typeFilter, yearFilter]
  );

  const selectedQuestion =
    filteredQuestions.find((question) => question.id === selectedQuestionId) ??
    filteredQuestions[0] ??
    null;

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    setGradingState({ loading: false, error: null, result: null });
    setResponseText("");
  };

  const handleGrade = async () => {
    if (!selectedQuestion || !responseText.trim()) {
      setGradingState((prev) => ({
        ...prev,
        error: "请输入答案后再请求 AI 评分。",
      }));
      return;
    }

    setGradingState({ loading: true, error: null, result: null });
    try {
      const result = await gradeFrqAnswer({
        questionId: selectedQuestion.id,
        response: responseText,
      });
      setGradingState({ loading: false, error: null, result });
    } catch (error) {
      const message =
        (error as Error)?.message ||
        "AI 评分失败，请稍后重试或检查网络连接。";
      setGradingState({ loading: false, error: message, result: null });
    }
  };

  const handleClear = () => {
    setResponseText("");
    setGradingState({ loading: false, error: null, result: null });
  };

  if (!selectedQuestion) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </button>
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white/60 p-10 text-center text-gray-600">
          暂无符合筛选条件的 FRQ 题目。
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-white/60">
            <NotebookText className="h-4 w-4" />
            FRQ Questionbank
          </div>
          <h1 className="mt-3 text-3xl font-black">
            APUSH 长作文题库 + AI 评分
          </h1>
          <p className="mt-2 text-base text-white/80">
            官方 2025 Set 2 LEQ 题目，依据 College Board Score Guide 逐项拆分。
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
          返回学习主页
        </button>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white/80 p-5 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-sm font-semibold text-slate-900">
            <Filter className="h-4 w-4" />
            精准筛选
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              className="rounded-2xl border border-gray-300 px-4 py-2 font-semibold text-gray-700"
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as FrqQuestionType | "all")
              }
            >
              <option value="all">全部题型</option>
              {typeOptions.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-gray-300 px-4 py-2 font-semibold text-gray-700"
              value={yearFilter}
              onChange={(event) =>
                setYearFilter(
                  event.target.value === "all" ? "all" : Number(event.target.value)
                )
              }
            >
              <option value="all">全部年份</option>
              {yearOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {filterLabel(yearOption)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <button
              type="button"
              key={question.id}
              onClick={() => handleSelectQuestion(question.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                selectedQuestion.id === question.id
                  ? "border-slate-900 bg-slate-900 text-white shadow-glow"
                  : "border-gray-200 bg-white hover:border-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em]">
                <span>{question.type}</span>
                <span>{question.questionLabel}</span>
              </div>
              <p
                className={`mt-3 text-lg font-bold ${
                  selectedQuestion.id === question.id ? "text-white" : "text-slate-900"
                }`}
              >
                {question.year} • {question.examSet}
              </p>
              <p
                className={`mt-2 text-sm ${
                  selectedQuestion.id === question.id ? "text-white/80" : "text-slate-600"
                }`}
              >
                {question.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <section className="space-y-6">
          <article className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="rounded-full bg-slate-900/5 px-3 py-1 text-slate-900">
                {selectedQuestion.type}
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                {selectedQuestion.pointsPossible} 分满分
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                {selectedQuestion.timeFrame}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {selectedQuestion.prompt}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              来源：{selectedQuestion.source ?? "College Board"}
            </p>
          </article>

          <article className="space-y-4 rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">写下你的答案</h3>
              <button
                type="button"
                onClick={handleClear}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900"
              >
                清空
              </button>
            </div>
            <textarea
              value={responseText}
              onChange={(event) => setResponseText(event.target.value)}
              placeholder="建议 3-4 段结构：开篇 Thesis、两段证据论证 + 复杂性结尾。"
              className="min-h-[240px] w-full rounded-2xl border border-gray-200 bg-white/80 p-4 font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGrade}
                disabled={gradingState.loading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {gradingState.loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI 判分中…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    让 AI 按官方 Rubric 评分
                  </>
                )}
              </button>
              <div className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-600">
                字数：{responseText.trim().length}+
              </div>
            </div>
            {gradingState.error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {gradingState.error}
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              <BookOpenCheck className="h-4 w-4" />
              Rubric
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">College Board Score Guide</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600">
              {selectedQuestion.rubric.generalNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              {selectedQuestion.rubric.criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="rounded-2xl border border-gray-200 bg-slate-50/50 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
                    <span className="rounded-full bg-slate-900 text-white px-3 py-1 text-xs">
                      {criterion.row}
                    </span>
                    <span>{criterion.title}</span>
                    <span className="text-slate-500">（{criterion.maxPoints} 分）</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{criterion.description}</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Earn the point
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                        {criterion.earningNotes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                    {criterion.sampleMisses && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                          Pitfalls
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                          {criterion.sampleMisses.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
              <Award className="h-4 w-4" />
              AI Score
            </div>
            {gradingState.result ? (
              <>
                <p className="mt-3 text-sm text-white/70">总分</p>
                <div className="text-5xl font-black tracking-tight text-white">
                  {gradingState.result.totalScore}
                  <span className="text-white/60 text-3xl"> / {gradingState.result.maxScore}</span>
                </div>
                <p className="mt-3 text-base text-white/80">
                  {gradingState.result.summary}
                </p>
                <div className="mt-5 space-y-3">
                  {gradingState.result.breakdown.map((item) => (
                    <div
                      key={item.criterionId}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{item.title}</span>
                        <span>
                          {item.awardedPoints}/{item.maxPoints}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/80">{item.feedback}</p>
                    </div>
                  ))}
                </div>
                {gradingState.result.suggestions.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold text-white">下一步建议</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                      {gradingState.result.suggestions.map((suggestion) => (
                        <li key={suggestion}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6 text-sm text-white/80">
                <p>粘贴或写下完整作文，点击“让 AI 按官方 Rubric 评分”即可得到逐项得分与改进建议。</p>
                <p className="mt-4 text-xs text-white/50">
                  评分结果基于 College Board rubric，仅供练习参考。
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FrqQuestionBankView;
