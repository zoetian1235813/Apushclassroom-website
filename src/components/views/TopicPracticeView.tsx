import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  RefreshCw,
  StickyNote,
  Trash2,
  Underline,
  Undo2,
  XCircle,
} from "lucide-react";
import { Unit, Topic } from "../../types/lesson";
import { TopicQuestion } from "../../types/questions";
import { useAuth } from "../../state/authContext";
import {
  logWrongQuestion,
  resolveWrongQuestion as resolveWrongQuestionApi,
} from "../../utils/wrongQuestions";

const EXAM_DURATION_MINUTES = 45;

const HIGHLIGHT_PALETTE = [
  { id: "sunrise", color: "#FFE8A3", label: "Sunny yellow" },
  { id: "blush", color: "#FFDDE5", label: "Soft pink" },
  { id: "sky", color: "#D6F5FF", label: "Sky blue" },
  { id: "mint", color: "#E3F7D9", label: "Mint" },
  { id: "violet", color: "#EAE0FF", label: "Lavender" },
];

type StimulusNote = {
  id: string;
  quote: string;
  text: string;
};

interface TopicPracticeViewProps {
  selectedUnit: Unit;
  selectedTopic: Topic;
  questions: TopicQuestion[];
  onBack: () => void;
  onOpenNotes: () => void;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const convertPlaintextToHtml = (text: string) => escapeHtml(text).replace(/\n/g, "<br />");

const convertTableToHtml = (table: NonNullable<TopicQuestion["stimulusTable"]>) => {
  const caption = table.caption
    ? `<p style="margin-bottom:12px;font-size:14px;font-weight:600;color:#0f172a;">${escapeHtml(table.caption)}</p>`
    : "";

  const headerRow = table.headers
    .map(
      (header) =>
        `<th style="text-align:left;padding:10px 12px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#475467;background:#f4f6fb;border-bottom:1px solid #e4e7ec;">${escapeHtml(
          header
        )}</th>`
    )
    .join("");

  const rows = table.rows
    .map(
      (row, rowIndex) =>
        `<tr${rowIndex % 2 === 0 ? ' style="background:#fbfbfc;"' : ""}>${row
          .map(
            (cell) =>
              `<td style="padding:10px 12px;border-bottom:1px solid #e4e7ec;font-size:14px;color:#101828;line-height:1.5;">${escapeHtml(
                cell
              )}</td>`
          )
          .join("")}</tr>`
    )
    .join("");

  const tableHtml = table.headers.length
    ? `<thead><tr>${headerRow}</tr></thead><tbody>${rows}</tbody>`
    : `<tbody>${rows}</tbody>`;

  return `${caption}<table style="width:100%;border-collapse:collapse;">${tableHtml}</table>`;
};

export const TopicPracticeView = ({
  selectedUnit,
  selectedTopic,
  questions,
  onBack,
  onOpenNotes,
}: TopicPracticeViewProps) => {
  const { token } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState<boolean | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, boolean>>({});

  const [editableStimulus, setEditableStimulus] = useState<string>("");
  const [notes, setNotes] = useState<StimulusNote[]>([]);
  const noteCounterRef = useRef(0);
  const stimulusContainerRef = useRef<HTMLDivElement | null>(null);
  const initialStimulusRef = useRef<string>("");

  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_MINUTES * 60);
  const [timerRunning, setTimerRunning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeQuestion = questions[activeIndex] ?? null;
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions ? ((activeIndex + 1) / totalQuestions) * 100 : 0;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [remainingSeconds]);

  const progressLabel = useMemo(
    () => `Question ${Math.min(activeIndex + 1, totalQuestions)} of ${totalQuestions}`,
    [activeIndex, totalQuestions]
  );

  const primeAnnotationContent = () => {
    if (!activeQuestion) {
      initialStimulusRef.current = "";
      setEditableStimulus("");
      return;
    }

    if (activeQuestion.stimulusTable) {
      const html = convertTableToHtml(activeQuestion.stimulusTable);
      initialStimulusRef.current = html;
      setEditableStimulus(html);
      return;
    }

    if (activeQuestion.stimulus) {
      const raw = activeQuestion.stimulus;
      const hasHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
      const prepared = hasHtml ? raw : convertPlaintextToHtml(raw);
      initialStimulusRef.current = prepared;
      setEditableStimulus(prepared);
      return;
    }

    const fallback = convertPlaintextToHtml(activeQuestion.prompt);
    initialStimulusRef.current = fallback;
    setEditableStimulus(fallback);
  };

  useEffect(() => {
    primeAnnotationContent();
  }, [activeQuestion]);

  useEffect(() => {
    if (stimulusContainerRef.current && stimulusContainerRef.current.innerHTML !== editableStimulus) {
      stimulusContainerRef.current.innerHTML = editableStimulus;
    }
  }, [editableStimulus]);

  useEffect(() => {
    setSelectedOptionId(null);
    setShowFeedback(false);
    setAnsweredCorrect(null);
    setMarkedForReview(false);
    setEliminatedOptions({});
    setNotes([]);
    noteCounterRef.current = 0;
  }, [activeIndex]);

  useEffect(() => {
    if (!timerRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning]);

  const handleSelectOption = (optionId: string) => {
    if (showFeedback || eliminatedOptions[optionId]) {
      return;
    }
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!activeQuestion || !selectedOptionId) {
      return;
    }
    const isCorrect = selectedOptionId === activeQuestion.correctOptionId;
    setAnsweredCorrect(isCorrect);
    setShowFeedback(true);
    setStreakCount((prev) => (isCorrect ? prev + 1 : 0));

    if (!token) {
      return;
    }

    if (isCorrect) {
      resolveWrongQuestionApi(activeQuestion.id, token).catch((error) => {
        console.error("[WrongQuestions] Failed to resolve question", error);
      });
    } else {
      logWrongQuestion(
        {
          questionId: activeQuestion.id,
          topicId: selectedTopic.id,
          topicName: selectedTopic.title,
          unitId: selectedUnit.id,
          unitName: selectedUnit.title,
          question: activeQuestion,
        },
        token
      ).catch((error) => {
        console.error("[WrongQuestions] Failed to log incorrect question", error);
      });
    }
  };

  const handleNextQuestion = () => {
    if (activeIndex < questions.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setShowFeedback(false);
    setAnsweredCorrect(null);
  };

  const handleResetFormatting = () => {
    setEditableStimulus(initialStimulusRef.current);
    if (stimulusContainerRef.current) {
      stimulusContainerRef.current.innerHTML = initialStimulusRef.current;
    }
  };

  const getStimulusSelection = () => {
    if (typeof window === "undefined") {
      return null;
    }
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !stimulusContainerRef.current) {
      return null;
    }
    if (
      !stimulusContainerRef.current.contains(selection.anchorNode) ||
      !stimulusContainerRef.current.contains(selection.focusNode)
    ) {
      return null;
    }
    return selection;
  };

  const applyFormatting = (command: string, value?: string) => {
    const selection = getStimulusSelection();
    if (!selection || !stimulusContainerRef.current) {
      return;
    }
    stimulusContainerRef.current.focus();
    if (command === "hiliteColor" && !document.queryCommandSupported("hiliteColor")) {
      document.execCommand("backColor", false, value);
    } else {
      document.execCommand(command, false, value);
    }
    setEditableStimulus(stimulusContainerRef.current.innerHTML);
  };

  const handleApplyHighlight = (color: string) => {
    applyFormatting("hiliteColor", color);
  };

  const handleUnderlineSelection = () => {
    applyFormatting("underline");
  };

  const handleAddNote = () => {
    const selection = getStimulusSelection();
    if (!selection) {
      return;
    }
    const quote = selection.toString().trim();
    if (!quote) {
      return;
    }
    const text = window.prompt("Add a quick note to remember why this matters");
    if (!text || !text.trim()) {
      return;
    }
    const id = `note-${noteCounterRef.current++}`;
    setNotes((prev) => [...prev, { id, quote, text: text.trim() }]);
  };

  const handleRemoveNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const toggleEliminateOption = (optionId: string) => {
    setEliminatedOptions((prev) => {
      const next = { ...prev };
      if (next[optionId]) {
        delete next[optionId];
      } else {
        next[optionId] = true;
      }
      return next;
    });
    if (selectedOptionId === optionId) {
      setSelectedOptionId(null);
    }
  };

  const handleResetTimer = () => {
    setRemainingSeconds(EXAM_DURATION_MINUTES * 60);
    setTimerRunning(true);
  };

  const handleToggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  if (!activeQuestion) {
    return (
      <div className="space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-midnight px-4 py-2 font-semibold text-white shadow-glow transition-all hover:-translate-y-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to topics
        </button>

        <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-midnight">Practice content is still loading</h2>
          <p className="mt-2 text-sm text-midnight/70">Check back soon or open your notes for a quick review.</p>
          <div className="mt-6">
            <button onClick={onOpenNotes} className="zen-pill hover:bg-midnight/90">
              Open notes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ec] py-6">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl">
        <header className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Section I</p>
              <p className="text-sm font-semibold text-gray-900">
                {selectedUnit.title} - {selectedTopic.title}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-800">
              <Clock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex gap-3 text-xs text-gray-500">
              <button className="underline-offset-2 hover:underline" onClick={handleToggleTimer}>
                {timerRunning ? "Pause timer" : "Resume timer"}
              </button>
              <button className="underline-offset-2 hover:underline" onClick={handleResetTimer}>
                Reset timer
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Streak</p>
            <p className="text-2xl font-semibold text-gray-900">{streakCount}</p>
            <p className="text-xs text-gray-500">Current correct streak</p>
          </div>
        </header>

        <div className="flex flex-col divide-y divide-gray-200 lg:flex-row lg:divide-x lg:divide-y-0">
          <section className="bg-[#faf9f6] px-6 py-6 lg:w-1/2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Directions</p>
                <p className="text-sm text-gray-700">
                  Read the passage carefully. Use the toolbar to highlight, underline, and add notes just like the CB mock
                  screenshot.
                </p>
              </div>
              <button
                onClick={onOpenNotes}
                className="text-xs font-semibold text-midnight underline-offset-4 hover:underline"
              >
                Open notes
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Highlight</span>
                  <div className="flex items-center gap-2">
                    {HIGHLIGHT_PALETTE.map((swatch) => (
                      <button
                        key={swatch.id}
                        type="button"
                        title={swatch.label}
                        onClick={() => handleApplyHighlight(swatch.color)}
                        className="h-6 w-6 rounded-full border border-gray-200 transition hover:scale-110"
                        style={{ backgroundColor: swatch.color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleUnderlineSelection}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Underline className="h-3.5 w-3.5" />
                    Underline
                  </button>
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <StickyNote className="h-3.5 w-3.5" />
                    Add note
                  </button>
                  <button
                    type="button"
                    onClick={handleResetFormatting}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-inner">
                <div
                  ref={stimulusContainerRef}
                  className="prose prose-sm max-w-none text-[15px] leading-relaxed text-gray-900 focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{ __html: editableStimulus }}
                  onInput={(event) => setEditableStimulus(event.currentTarget.innerHTML)}
                />
              </div>

              {notes.length > 0 && (
                <div className="space-y-2 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Notes</p>
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3 text-sm">
                        <p className="text-xs font-semibold uppercase text-gray-500">&ldquo;{note.quote}&rdquo;</p>
                        <p className="mt-1 text-gray-800">{note.text}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveNote(note.id)}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 underline-offset-2 hover:underline"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove note
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col gap-6 px-6 py-6 lg:w-1/2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
                  {activeIndex + 1}
                </span>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">{progressLabel}</p>
                  <p>
                    Unit {selectedUnit.id} - Period {selectedUnit.period}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMarkedForReview((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  markedForReview ? "border-midnight bg-midnight text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Flag className="h-4 w-4" />
                {markedForReview ? "Marked for review" : "Mark for review"}
              </button>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Question prompt</p>
              <p className="mt-3 text-lg font-medium leading-relaxed text-gray-900">{activeQuestion.prompt}</p>
              {activeQuestion.source && (
                <p className="mt-2 text-xs text-gray-500">Source: {activeQuestion.source}</p>
              )}
            </div>

            <div className="space-y-3">
              {activeQuestion.options.map((option) => {
                const selected = selectedOptionId === option.id;
                const eliminated = eliminatedOptions[option.id];
                const isCorrect = showFeedback && option.id === activeQuestion.correctOptionId;
                const isIncorrect = showFeedback && selected && !isCorrect;

                return (
                  <div key={option.id} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectOption(option.id)}
                      disabled={eliminated && !showFeedback}
                      className={`flex flex-1 items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all ${
                        isCorrect
                          ? "border-emerald-400 bg-emerald-50"
                          : isIncorrect
                          ? "border-red-300 bg-red-50"
                          : selected
                          ? "border-midnight bg-midnight/5"
                          : eliminated
                          ? "border-dashed border-gray-300 bg-gray-50 opacity-60"
                          : "border-gray-200 bg-white hover:border-midnight/20"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-base font-semibold ${
                          isCorrect
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : isIncorrect
                            ? "border-red-500 text-red-500"
                            : selected
                            ? "border-midnight text-midnight"
                            : "border-gray-300 text-gray-500"
                        }`}
                      >
                        {option.id}
                      </span>
                      <span
                        className={`text-base leading-relaxed ${
                          eliminated ? "text-gray-400 line-through" : "text-midnight/80"
                        }`}
                      >
                        {option.text}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleEliminateOption(option.id)}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-xs font-semibold transition ${
                        eliminated
                          ? "border-red-300 bg-red-50 text-red-600"
                          : "border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                      title={eliminated ? "Restore this choice" : "Exclude this choice"}
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {!selectedOptionId && !showFeedback && (
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <AlertCircle className="h-4 w-4" />
                <span>Select an option before submitting.</span>
              </div>
            )}

            {showFeedback && answeredCorrect !== null && (
              <div
                className={`rounded-2xl border px-5 py-4 ${
                  answeredCorrect
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-red-300 bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  {answeredCorrect ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <p className="text-base font-semibold">
                    {answeredCorrect ? "Great work!" : "Not quite - review the reasoning and try again."}
                  </p>
                </div>
                {/<\/?[a-z][\s\S]*>/i.test(activeQuestion.explanation ?? "") ? (
                  <div
                    className="mt-2 text-sm leading-relaxed text-midnight/80"
                    dangerouslySetInnerHTML={{ __html: activeQuestion.explanation ?? "" }}
                  />
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-midnight/80 whitespace-pre-line">
                    {activeQuestion.explanation}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              {!showFeedback ? (
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={!selectedOptionId}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold transition-all ${
                    selectedOptionId
                      ? "bg-midnight text-white shadow-glow hover:-translate-y-0.5"
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
                  }`}
                >
                  Submit answer
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-midnight px-5 py-3 text-base font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {activeIndex < questions.length - 1 ? "Next question" : "Restart practice"}
                  </button>
                  {!answeredCorrect && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-base font-semibold text-midnight transition-colors hover:bg-midnight/5"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try again
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </div>

        <footer className="flex flex-col gap-4 border-t border-gray-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Progress</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 w-48 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-gray-900 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700">{progressLabel}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePreviousQuestion}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous question
            </button>
            <div className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">
              Current question: {activeIndex + 1}/{totalQuestions}
            </div>
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Next question
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
