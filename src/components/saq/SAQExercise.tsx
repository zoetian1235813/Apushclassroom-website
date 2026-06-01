import { FC, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import type { SAQGuidedExercise } from "../../data/saqGuidedExercises";

type Mode = "match" | "fill" | "free";

const MODE_LABELS: Record<Mode, string> = {
  match: "🧩 匹配模式",
  fill: "✏️ 填空模式",
  free: "💬 自由模式",
};

const normalize = (value: string) => value.trim().toLowerCase();

const initializeMatchSelections = (exercise: SAQGuidedExercise) =>
  exercise.blanks.reduce<Record<number, string[]>>((map, blank) => {
    if (blank.matchAnswers?.length) {
      map[blank.id] = blank.matchAnswers.map(() => "");
    }
    return map;
  }, {});

const composeMatchSentence = (
  parts: string[] | undefined,
  tokens: string[]
) => {
  if (!parts?.length) {
    return tokens.filter(Boolean).join(" ").trim();
  }
  return parts.reduce((sentence, part, idx) => {
    const filled = tokens[idx] ?? "";
    return idx < tokens.length ? `${sentence}${part}${filled}` : `${sentence}${part}`;
  }, "");
};

export const SAQExercise: FC<{ exercise: SAQGuidedExercise }> = ({
  exercise,
}) => {
  const blankCount = exercise.blanks.length;
  const [mode, setMode] = useState<Mode>("match");
  const [showSource, setShowSource] = useState(true);
  const [extendedModesUnlocked, setExtendedModesUnlocked] = useState(false);
  const [answers, setAnswers] = useState<string[]>(
    () => Array(blankCount).fill("")
  );
  const [feedback, setFeedback] = useState<(boolean | null)[]>(
    () => Array(blankCount).fill(null)
  );
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [matchSelections, setMatchSelections] = useState<
    Record<number, string[]>
  >(() => initializeMatchSelections(exercise));
  const [activeSlots, setActiveSlots] = useState<Record<number, number | null>>(
    {}
  );

  useEffect(() => {
    setMode("match");
    setAnswers(Array(blankCount).fill(""));
    setFeedback(Array(blankCount).fill(null));
    setHasCelebrated(false);
    setMatchSelections(initializeMatchSelections(exercise));
    setActiveSlots({});
    setShowSource(true);
    setExtendedModesUnlocked(false);
  }, [exercise, blankCount]);

  const completedCount = useMemo(
    () => feedback.filter((state) => state).length,
    [feedback]
  );

  useEffect(() => {
    const isComplete = completedCount === blankCount && blankCount > 0;
    if (isComplete && !hasCelebrated) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        scalar: 0.9,
      });
      setHasCelebrated(true);
    }
    if (!isComplete && hasCelebrated) {
      setHasCelebrated(false);
    }
  }, [blankCount, completedCount, hasCelebrated]);

  const handleAnswer = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setFeedback((prev) => {
      const next = [...prev];
      if (!value.trim()) {
        next[index] = null;
        return next;
      }
      next[index] =
        normalize(value) === normalize(exercise.blanks[index].answer);
      if (mode === "match" && next.every((state) => state === true)) {
        setExtendedModesUnlocked(true);
      }
      return next;
    });
  };

  const updateMatchState = (
    blankIndex: number,
    blankId: number,
    selections: string[]
  ) => {
    const blank = exercise.blanks[blankIndex];
    setMatchSelections((prev) => ({ ...prev, [blankId]: selections }));
    const composed = composeMatchSentence(
      blank.matchSentenceParts,
      selections
    );
    setAnswers((prev) => {
      const next = [...prev];
      next[blankIndex] = composed;
      return next;
    });
    setFeedback((prev) => {
      const next = [...prev];
      if (!blank.matchAnswers?.length || selections.some((token) => !token)) {
        next[blankIndex] = null;
      } else {
        const isCorrect = blank.matchAnswers.every(
          (token, idx) =>
            normalize(token) === normalize(selections[idx] ?? "")
        );
        next[blankIndex] = isCorrect;
        if (mode === "match" && next.every((state) => state === true)) {
          setExtendedModesUnlocked(true);
        }
      }
      return next;
    });
  };

  const handleMatchTokenSelect = (
    blankIndex: number,
    token: string
  ) => {
    const blank = exercise.blanks[blankIndex];
    const selections = matchSelections[blank.id];
    if (!selections?.length) {
      handleAnswer(blankIndex, token);
      return;
    }
    if (selections.includes(token)) {
      return;
    }
    const activeSlot = activeSlots[blank.id];
    const firstEmpty = selections.findIndex((value) => !value);
    const slotIndex =
      typeof activeSlot === "number"
        ? activeSlot
        : firstEmpty !== -1
        ? firstEmpty
        : 0;
    const updated = [...selections];
    updated[slotIndex] = token;
    updateMatchState(blankIndex, blank.id, updated);
    const nextEmpty = updated.findIndex((value) => !value);
    setActiveSlots((prev) => ({
      ...prev,
      [blank.id]: nextEmpty === -1 ? null : nextEmpty,
    }));
  };

  const handleMatchSlotClick = (blankIndex: number, slotIndex: number) => {
    const blank = exercise.blanks[blankIndex];
    const selections = matchSelections[blank.id];
    if (!selections?.length) {
      return;
    }
    const isActive = activeSlots[blank.id] === slotIndex;
    if (isActive && selections[slotIndex]) {
      const updated = [...selections];
      updated[slotIndex] = "";
      updateMatchState(blankIndex, blank.id, updated);
      setActiveSlots((prev) => ({ ...prev, [blank.id]: slotIndex }));
      return;
    }
    setActiveSlots((prev) => ({ ...prev, [blank.id]: slotIndex }));
  };

  const handleModeChange = (nextMode: Mode) => {
    if (nextMode === mode) return;
    if (nextMode !== "match" && !extendedModesUnlocked) {
      return;
    }
    setMode(nextMode);
    setAnswers(Array(blankCount).fill(""));
    setFeedback(Array(blankCount).fill(null));
    setHasCelebrated(false);
    setActiveSlots({});
    if (nextMode !== "match") {
      setMatchSelections(initializeMatchSelections(exercise));
    }
  };

  const progressPercent = blankCount
    ? Math.round((completedCount / blankCount) * 100)
    : 0;

  return (
    <div className="relative space-y-6 rounded-3xl border border-slate-100 bg-white p-6 text-slate-900 shadow-2xl">
      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              {exercise.sourceLabel}
            </p>
            <p className="text-sm italic text-slate-500">{exercise.sourceMeta}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowSource((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600"
          >
            {showSource ? "收起材料" : "展开材料"}
          </button>
        </div>
        {showSource && (
          <div className="relative md:sticky md:top-4">
            <blockquote
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 shadow-sm"
              dangerouslySetInnerHTML={{ __html: exercise.sourceHtml }}
            />
          </div>
        )}
        <p className="text-base font-semibold">{exercise.question}</p>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
            {exercise.unit}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Era: {exercise.era}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
            Level: {exercise.difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {(Object.keys(MODE_LABELS) as Mode[]).map((modeKey) => (
          <button
            type="button"
            key={modeKey}
            onClick={() => handleModeChange(modeKey)}
            disabled={modeKey !== "match" && !extendedModesUnlocked}
            className={`rounded-full px-4 py-1 font-medium transition ${
              mode === modeKey
                ? "bg-emerald-500 text-white shadow"
                : modeKey !== "match" && !extendedModesUnlocked
                ? "bg-slate-100 text-slate-400"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {MODE_LABELS[modeKey]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {exercise.blanks.map((blank, index) => {
          const selections = matchSelections[blank.id] ?? [];
          return (
            <div
              key={blank.id}
              className={`rounded-2xl border bg-white p-4 transition ${
                feedback[index] === true
                  ? "border-emerald-300 shadow-sm"
                  : feedback[index] === false
                  ? "border-rose-300"
                  : "border-slate-200"
              }`}
            >
              <div className="text-sm font-semibold">{blank.prompt}</div>
              {blank.helper && (
                <p className="text-xs text-slate-500">{blank.helper}</p>
              )}

              {mode === "match" &&
              blank.matchSentenceParts &&
              blank.matchAnswers ? (
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 text-sm leading-relaxed text-slate-800">
                    {blank.matchSentenceParts.map((part, partIndex) => (
                      <span key={`${blank.id}-part-${partIndex}`}>
                        {part}
                        {partIndex < blank.matchAnswers!.length && (
                          <button
                            type="button"
                            className={`mx-1 inline-flex min-w-[80px] items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold transition ${
                              activeSlots[blank.id] === partIndex
                                ? "border-emerald-500 bg-white text-emerald-600"
                                : "border-dashed border-emerald-300 bg-white/70 text-emerald-700"
                            }`}
                            onClick={() => handleMatchSlotClick(index, partIndex)}
                          >
                            {selections[partIndex] || "_____"}
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Answer Bank
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {blank.options.map((option) => {
                        const isUsed = selections.includes(option);
                        return (
                          <button
                            type="button"
                            key={option}
                            disabled={isUsed}
                            onClick={() => handleMatchTokenSelect(index, option)}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                              isUsed
                                ? "border-slate-200 bg-slate-100 text-slate-400"
                                : "border-slate-300 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-600"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      点击空格选中，再点词填入；再次点击已选空格可清空。
                    </p>
                  </div>
                </div>
              ) : mode === "match" ? (
                <select
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  value={answers[index]}
                  onChange={(event) => handleAnswer(index, event.target.value)}
                >
                  <option value="">Select...</option>
                  {blank.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}

              {mode === "fill" && (
                <input
                  type="text"
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="输入你的句子..."
                  value={answers[index]}
                  onChange={(event) => handleAnswer(index, event.target.value)}
                />
              )}

              {mode === "free" && (
                <textarea
                  rows={3}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="自由模式：结合三个提示写出完整的一段分析。"
                  value={answers[index]}
                  onChange={(event) => handleAnswer(index, event.target.value)}
                />
              )}

              {feedback[index] === true && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm animate-pulse">
                  🎯 Correct! Keep going.
                </div>
              )}
              {feedback[index] === false && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
                  ⚠️ Not quite—try another choice or rephrase.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {completedCount === blankCount && blankCount > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 py-3 text-center text-emerald-700 font-semibold">
          🎉 Excellent! You’ve mastered this SAQ!
        </div>
      )}

      <div className="space-y-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">Answer Key · You said</p>
        {exercise.blanks.map((blank, index) => (
          <div
            key={blank.id}
            className="space-y-1 border-b border-slate-200 pb-2 last:border-b-0"
          >
            <p className="text-xs font-semibold text-slate-500">
              {blank.prompt}
            </p>
            <p className="text-xs text-slate-600">
              Answer Key:{" "}
              <span className="font-medium text-slate-900">
                {blank.answer}
              </span>
            </p>
            <p className="text-xs text-slate-500">
              You said:{" "}
              <span className="font-medium text-slate-900">
                {answers[index] || "—"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
