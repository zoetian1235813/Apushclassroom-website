import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Lock, Sparkles, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  saqGuidedExercises,
  saqReleaseCatalog,
  type SAQAvailableReleaseId,
} from "../../data/saqGuidedExercises";
import { SAQExercise } from "../saq/SAQExercise";

const DEFAULT_RELEASE: SAQAvailableReleaseId = "2025-set2-saq1";

export default function SAQPractice() {
  const navigate = useNavigate();
  const { year: routeYear } = useParams<{ year?: string }>();

  const selectedYear = useMemo(
    () => saqReleaseCatalog.find((entry) => `${entry.year}` === routeYear),
    [routeYear]
  );

  const firstAvailableRelease = useMemo(() => {
    if (!selectedYear) return null;
    for (const set of selectedYear.sets) {
      const found = set.saqs.find((item) => item.status === "available");
      if (found) return found.id as SAQAvailableReleaseId;
    }
    return null;
  }, [selectedYear]);

  const [activeReleaseId, setActiveReleaseId] = useState<
    SAQAvailableReleaseId | null
  >(routeYear ? firstAvailableRelease : DEFAULT_RELEASE);

  useEffect(() => {
    if (routeYear) {
      setActiveReleaseId(firstAvailableRelease);
    }
  }, [firstAvailableRelease, routeYear]);

  const activeExercise = activeReleaseId
    ? saqGuidedExercises[activeReleaseId]
    : undefined;
  const activeMeta = useMemo(() => {
    if (!activeReleaseId) return null;
    for (const year of saqReleaseCatalog) {
      for (const set of year.sets) {
        const hit = set.saqs.find((saq) => saq.id === activeReleaseId);
        if (hit) {
          return { year, set, saq: hit };
        }
      }
    }
    return null;
  }, [activeReleaseId]);

  const handleSelectRelease = (
    releaseId: string,
    status: "available" | "upcoming"
  ) => {
    if (status !== "available") return;
    setActiveReleaseId(releaseId as SAQAvailableReleaseId);
  };

  if (!routeYear) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            返回题型特训
          </button>

          <header className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-100">
                  SAQ Learning Lab
                </p>
                <h1 className="mt-3 text-3xl font-black">
                  历年真题 · 按年份进入专页
                </h1>
                <p className="text-sm text-emerald-100/90">
                  点击年份进入独立页面查看对应 Set/SAQ，避免在一页内折叠拥挤。
                </p>
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2">
            {saqReleaseCatalog.map((year) => (
              <button
                key={year.year}
                onClick={() => navigate(`/saq/${year.year}`)}
                className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                  {year.label}
                </span>
                <span className="text-xl font-bold text-slate-900">
                  {year.year} · {year.highlight}
                </span>
                <span className="text-sm text-slate-500">
                  点击查看该年份的所有 Set / SAQ
                </span>
              </button>
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" />
          返回年份选择
        </button>

        <header className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-100">
                SAQ Learning Lab
              </p>
              <h1 className="mt-3 text-3xl font-black">
                历年真题 · {selectedYear?.label ?? routeYear}
              </h1>
              <p className="text-sm text-emerald-100/90">
                按年份展示 Set 和 SAQ，点击“进入练习”直接加载互动组件。
              </p>
            </div>
            {activeMeta && (
              <div className="flex flex-col gap-2 rounded-2xl bg-white/10 px-5 py-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-200" />
                  <span>当前练习</span>
                </div>
                <p className="text-lg">
                  {activeMeta.year.year} · {activeMeta.set.title}
                </p>
                <p className="text-emerald-100/80">{activeMeta.saq.title}</p>
              </div>
            )}
          </div>
        </header>

        {!selectedYear && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            未找到年份 {routeYear}，请返回选择列表。
          </div>
        )}

        {selectedYear && (
          <section className="space-y-4 rounded-3xl border border-white/60 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                  Release Timeline · {selectedYear.year}
                </p>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedYear.label} · {selectedYear.highlight}
                </h2>
                <p className="text-sm text-slate-500">
                  按 Set 展示对应 SAQ；点击进入即可练习。
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                <Clock className="h-4 w-4" />
                本页收录 {selectedYear.sets.length} 个 Set
              </div>
            </div>

            <div className="space-y-3">
              {selectedYear.sets.map((set) => (
                <div
                  key={set.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70"
                >
                  <div className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {set.title}
                      </p>
                      <p className="text-base font-bold text-slate-900">
                        {set.subtitle}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {set.statusTag}
                    </span>
                  </div>

                  <div className="space-y-3 border-t border-slate-200 px-4 py-4">
                    {set.saqs.map((saq) => {
                      const isAvailable = saq.status === "available";
                      const isActive =
                        isAvailable && activeExercise?.releaseId === saq.id;
                      return (
                        <div
                          key={saq.id}
                          className={`rounded-2xl border p-4 ${
                            isActive
                              ? "border-emerald-400 bg-emerald-50/60"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {saq.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {saq.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  isAvailable
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {isAvailable ? "可练习" : "待上线"}
                              </span>
                              {isAvailable ? (
                                <button
                                  onClick={() =>
                                    handleSelectRelease(saq.id, saq.status)
                                  }
                                  className={`rounded-full px-4 py-1 text-sm font-semibold transition ${
                                    isActive
                                      ? "bg-emerald-500 text-white shadow"
                                      : "bg-white text-emerald-600 shadow hover:bg-emerald-50"
                                  }`}
                                >
                                  {isActive ? "当前练习" : "进入练习"}
                                </button>
                              ) : (
                                <Lock className="h-4 w-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {isAvailable && isActive && activeExercise && (
                            <div className="mt-4">
                              <SAQExercise exercise={activeExercise} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
