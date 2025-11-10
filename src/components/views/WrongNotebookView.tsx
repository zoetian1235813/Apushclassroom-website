import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  Clock4,
  Loader2,
  Target,
} from "lucide-react";
import { useAuth } from "../../state/authContext";
import {
  fetchWrongQuestions,
  resolveWrongQuestion,
} from "../../utils/wrongQuestions";
import { WrongQuestionRecord } from "../../types/wrongQuestions";

interface WrongNotebookViewProps {
  onBack: () => void;
  onReviewTopic?: (topicId: string) => void;
}

const formatTimestamp = (value?: string | null) => {
  if (!value) {
    return "未知时间";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const WrongNotebookView = ({ onBack, onReviewTopic }: WrongNotebookViewProps) => {
  const { token } = useAuth();
  const [records, setRecords] = useState<WrongQuestionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvingMap, setResolvingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!token) {
        setRecords([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWrongQuestions(token);
        if (!cancelled) {
          setRecords(data.items ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error)?.message || "无法加载错题数据，请稍后重试。");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const topicStats = useMemo(() => {
    const map = new Map<
      string,
      { topicId: string; topicName?: string | null; unitName?: string | null; count: number; latest?: string | null }
    >();
    records.forEach((record) => {
      const existing = map.get(record.topicId) || {
        topicId: record.topicId,
        topicName: record.topicName,
        unitName: record.unitName,
        count: 0,
        latest: record.lastIncorrectAt,
      };
      existing.count += 1;
      if (
        record.lastIncorrectAt &&
        record.lastIncorrectAt > (existing.latest || "")
      ) {
        existing.latest = record.lastIncorrectAt;
      }
      map.set(record.topicId, existing);
    });
    return Array.from(map.values()).sort((a, b) => {
      if (a.count === b.count) {
        return (b.latest || "").localeCompare(a.latest || "");
      }
      return b.count - a.count;
    });
  }, [records]);

  const totalWrong = records.length;
  const totalTopics = topicStats.length;
  const toughestTopic = topicStats[0];

  const handleResolve = async (questionId: string) => {
    if (!token) {
      return;
    }
    setResolvingMap((prev) => ({ ...prev, [questionId]: true }));
    try {
      await resolveWrongQuestion(questionId, token);
      setRecords((prev) => prev.filter((record) => record.questionId !== questionId));
    } catch (err) {
      setError((err as Error)?.message || "取消错题失败，请稍后再试。");
    } finally {
      setResolvingMap((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  if (!token) {
    return (
      <div className="space-y-6 rounded-3xl border border-dashed border-gray-300 bg-white/70 p-8 text-center">
        <BookMarked className="mx-auto h-12 w-12 text-gray-400" />
        <p className="text-lg font-semibold text-gray-700">请先登录后使用错题本功能。</p>
        <button
          type="button"
          onClick={onBack}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-gray-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/60">
              <BookMarked className="h-4 w-4" />
              Wrong Notebook
            </div>
            <h1 className="mt-3 text-3xl font-black">错题本 · 考点回顾</h1>
            <p className="mt-2 text-white/80">
              自动记录你答错的题目，按考点聚合，优先复习高频失分主题。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              <ArrowLeft className="h-4 w-4" />
              返回
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-5 shadow">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">积累错题</p>
          <p className="mt-3 text-3xl font-black text-gray-900">{totalWrong}</p>
          <p className="text-sm text-gray-600">仍待攻克的题目</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-5 shadow">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">涉及考点</p>
          <p className="mt-3 text-3xl font-black text-gray-900">{totalTopics}</p>
          <p className="text-sm text-gray-600">需要重点复习的 Topic</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-5 shadow">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">最弱考点</p>
          {toughestTopic ? (
            <>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {toughestTopic.topicName || toughestTopic.topicId}
              </p>
              <p className="text-sm text-gray-600">
                {toughestTopic.count} 题错误 · {toughestTopic.unitName || "Unit 未知"}
              </p>
            </>
          ) : (
            <p className="mt-3 text-lg text-gray-600">暂无</p>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white/85 p-5 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">错题考点热度</h2>
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
            Focus First
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            加载中...
          </div>
        ) : topicStats.length ? (
          <div className="mt-4 space-y-3">
            {topicStats.map((stat) => (
              <div
                key={stat.topicId}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {stat.topicName || stat.topicId}
                  </p>
                  <p className="text-xs text-gray-500">{stat.unitName || "Unit 未知"}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    最近出错：{formatTimestamp(stat.latest)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                    {stat.count} 题
                  </span>
                  {onReviewTopic && (
                    <button
                      type="button"
                      onClick={() => onReviewTopic(stat.topicId)}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Target className="h-4 w-4" />
                      去复习
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-10 text-gray-500">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <p>恭喜！目前没有未解决的错题。</p>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white/90 p-5 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">错题清单</h2>
          <p className="text-sm text-gray-500">记录答错次数与最近时间</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            加载中...
          </div>
        ) : records.length ? (
          <div className="mt-4 space-y-4">
            {records.map((record) => {
              const question = record.questionData;
              const correctOption =
                question?.options?.find((option) => option.id === question.correctOptionId) ?? null;
              const isResolving = resolvingMap[record.questionId];
              return (
                <article
                  key={record.questionId}
                  className="space-y-3 rounded-2xl border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                      {record.topicName || record.topicId}
                    </span>
                    <span>错题次数：{record.incorrectCount}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock4 className="h-4 w-4" />
                      {formatTimestamp(record.lastIncorrectAt)}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {question?.prompt || "题目内容暂不可用"}
                  </h3>
                  {question?.options && (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                      {question.options.map((option) => (
                        <li
                          key={option.id}
                          className={`${
                            option.id === question.correctOptionId ? "font-semibold text-emerald-700" : ""
                          }`}
                        >
                          {option.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {correctOption && (
                    <p className="text-sm text-emerald-700">
                      正确答案：{correctOption.text}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={isResolving}
                      onClick={() => handleResolve(record.questionId)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isResolving
                          ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {isResolving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      标记已掌握
                    </button>
                    {onReviewTopic && (
                      <button
                        type="button"
                        onClick={() => onReviewTopic(record.topicId)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                      >
                        <Target className="h-4 w-4" />
                        前往考点练习
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-12 text-gray-500">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <p>全部题目都掌握啦！</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default WrongNotebookView;
