import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import type { VideoKnowledgeCheck } from '../types/lesson';
import { nextCheckpoint } from '../utils/checkpointScheduler';
import { unit1ExitTickets } from '../data/unit1ExitTickets';

interface Props { topicId: string; title: string; src: string; checks: VideoKnowledgeCheck[]; manual?: boolean }
interface Attempt { first: string; latest: string; count: number }
const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export function Unit1InteractiveLesson({ topicId, title, src, checks, manual = false }: Props) {
  const player = useRef<HTMLVideoElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const activeRef = useRef<VideoKnowledgeCheck | null>(null);
  const handled = useRef(new Set<string>());
  const previousTime = useRef(0);
  const pausedAt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<VideoKnowledgeCheck | null>(null);
  const [choice, setChoice] = useState('');
  const [feedback, setFeedback] = useState(false);
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});
  const [error, setError] = useState(false);
  const [ended, setEnded] = useState(false);
  const [draft, setDraft] = useState('');
  const [firstDraft, setFirstDraft] = useState<string | null>(null);
  const [selfChecks, setSelfChecks] = useState<number[]>([]);
  const sorted = useMemo(() => [...checks].sort((a,b) => a.timestamp-b.timestamp), [checks]);
  const ticket = unit1ExitTickets[topicId];
  useEffect(() => { if (active) banner.current?.focus(); }, [active]);

  function open(check: VideoKnowledgeCheck) {
    if (!manual) {
      if (!activeRef.current) pausedAt.current = player.current?.currentTime ?? previousTime.current;
      player.current?.pause();
    }
    setPlaying(false); activeRef.current = check; setActive(check); setChoice(''); setFeedback(false);
  }
  function continueVideo() {
    if (!active || !feedback) return;
    handled.current.add(active.id);
    // Keep provider configuration stable: toggling YouTube controls reloads the iframe.
    const resumeAt = pausedAt.current;
    const pending = !manual ? nextCheckpoint(sorted, handled.current, 0, resumeAt) : undefined;
    if (pending) { open(pending); return; }
    if (!manual && player.current && Math.abs(player.current.currentTime - resumeAt) > 0.75) {
      player.current.currentTime = resumeAt;
    }
    previousTime.current = resumeAt;
    activeRef.current = null; setActive(null); setPlaying(!manual && !ended);
  }
  function submit() {
    if (!active || !choice || feedback) return;
    setAttempts(old => ({ ...old, [active.id]: { first: old[active.id]?.first ?? choice, latest: choice, count: (old[active.id]?.count ?? 0) + 1 } }));
    setFeedback(true);
  }
  const firstCorrect = sorted.filter(check => attempts[check.id]?.first === check.correctChoiceId).length;
  return <section className="space-y-4 rounded-2xl border border-slate-200 bg-[#ffffff] p-3 sm:p-5" aria-label="Unit 1 视频互动学习">
    <div><p className="editorial-label">UNIT 1 / WATCH · THINK · WRITE</p><h3 className="mt-2 text-xl">边看边练 · {topicId}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{manual ? 'B站兼容模式：请手动暂停后打开题目。B站嵌入播放器不支持强制暂停；完整必答体验请使用可控视频源。' : '视频到点自动暂停。请在视频内的题目 banner 选择并提交答案，查看反馈后继续观看。'}</p>
    </div>
    <div className="relative aspect-video min-h-[380px] overflow-hidden rounded-xl bg-black sm:min-h-[460px]">
      {manual ? <iframe src={src} title={title} className="h-full w-full" allowFullScreen /> : <ReactPlayer ref={player} src={src} title={title} controls disablePictureInPicture playsInline playing={playing} width="100%" height="100%"
        onPlay={() => {
          const pending = nextCheckpoint(sorted, handled.current, 0, player.current?.currentTime ?? 0);
          if (activeRef.current) { player.current?.pause(); return; }
          if (pending) { open(pending); return; }
          setPlaying(true); setEnded(false);
        }}
        onPause={() => setPlaying(false)} onError={() => { setError(true); setPlaying(false); }}
        onTimeUpdate={event => {
          const now = event.currentTarget.currentTime;
          const check = nextCheckpoint(sorted, handled.current, previousTime.current, now);
          if (activeRef.current) { player.current?.pause(); return; }
          previousTime.current = now;
          if (check) open(check);
        }} onEnded={() => { setPlaying(false); setEnded(true); }} />}
    {active && <div ref={banner} role="dialog" aria-modal="true" tabIndex={-1} aria-labelledby="unit1-question" onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); }
        if (event.key === 'Tab') {
          const controls = Array.from(banner.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)') ?? []);
          const first = controls[0]; const last = controls[controls.length - 1];
          if (event.shiftKey && (document.activeElement === first || document.activeElement === banner.current)) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && (document.activeElement === last || document.activeElement === banner.current)) { event.preventDefault(); first?.focus(); }
        }
      }} className="absolute inset-0 z-20 overflow-y-auto bg-[#f8fafc] p-4 text-slate-800 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <p className="editorial-label">REQUIRED CHECKPOINT · {timeLabel(active.timestamp)}</p>
          <p className="mt-2 text-xs text-slate-600">Video paused · Submit one answer to continue · Original AP-style practice</p>
          <h4 id="unit1-question" className="my-4 text-lg leading-7 sm:text-xl">{active.question}</h4>
          <fieldset disabled={feedback} className="grid gap-2"><legend className="sr-only">Select one answer</legend>{active.choices.map((option,index) => <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 ${choice===option.id ? 'border-[#007ebb] bg-sky-50 ring-1 ring-[#007ebb]' : 'border-slate-200 bg-white/70'}`}><input className="mt-1" type="radio" name="unit1-choice" value={option.id} checked={choice===option.id} onChange={() => setChoice(option.id)} /><span><strong className="mr-2">{String.fromCharCode(65+index)}.</strong>{option.text}</span></label>)}</fieldset>
          {feedback && <div role="status" className="my-3 rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6"><strong>{choice===active.correctChoiceId ? 'Correct.' : 'Review the explanation.'}</strong><p>{active.explanation}</p><p>Correct answer: {active.correctChoiceId.toUpperCase()}</p></div>}
          <div className="sticky -bottom-4 -mx-4 mt-4 flex flex-wrap gap-2 border-t border-slate-200 bg-[#f8fafc] px-4 py-3 sm:-bottom-6">
            {!feedback ? <button type="button" disabled={!choice} onClick={submit} className="study-primary disabled:opacity-40">Submit answer</button> : <button type="button" onClick={() => {setChoice('');setFeedback(false);}} className="study-secondary">Try again</button>}
            <button type="button" disabled={!feedback} onClick={continueVideo} className="study-primary disabled:opacity-40">Continue video</button>
          </div>
          {manual && <p className="mt-3 text-xs text-slate-600">After submitting, close this banner with Continue video and resume Bilibili manually.</p>}
        </div>
      </div>}

    </div>
    {error && <p role="status" className="text-sm text-amber-800">视频暂未加载成功。可使用课程下方的原站链接；检测题与 SAQ 仍可手动作答。</p>}
    <div className="flex flex-wrap gap-2">{sorted.map(check => <button type="button" key={check.id} onClick={() => open(check)} className="study-secondary text-left">
      {timeLabel(check.timestamp)} · {attempts[check.id] ? (attempts[check.id].latest === check.correctChoiceId ? '已答对 · 可重做' : '待复习') : '开始检测'}
    </button>)}</div>
    <p className="text-xs leading-6 text-slate-600" aria-live="polite">本次学习：首次答对 {firstCorrect}/{sorted.length}；已作答 {Object.keys(attempts).length}/{sorted.length}。重试不改写首次结果。离开课程后本次记录不保留。</p>
    {ticket && <div className="border-t border-slate-200 pt-5">
      <p className="editorial-label">EXIT TICKET / 原创 SAQ 微练习</p><h4 className="mt-2 text-xl">{ended ? '视频结束：用证据完成解释' : '观看后：写出你的解释'}</h4>
      <p className="my-4 text-sm leading-7">{ticket.prompt}</p><label htmlFor="unit1-saq" className="text-sm font-semibold">你的答案（建议 2–3 句英文）</label>
      <textarea id="unit1-saq" value={draft} onChange={event => setDraft(event.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm leading-7" />
      {firstDraft === null ? <button type="button" disabled={!draft.trim()} onClick={() => setFirstDraft(draft)} className="study-primary mt-3 disabled:opacity-40">提交初稿，查看支架</button> : <div className="mt-4 space-y-3 rounded-lg bg-slate-100 p-4 text-sm leading-7">
        <p><strong>写作支架：</strong>{ticket.hint}</p><details><summary className="cursor-pointer font-semibold">查看参考分析</summary><p>{ticket.sample}</p></details>
        <details><summary className="cursor-pointer">对照首次答案</summary><p className="whitespace-pre-wrap">{firstDraft}</p></details>
        <p>在上方修改答案，然后自查（自评不等于正式评分）：</p>{['直接回答了题目要求','使用了具体、准确的历史证据','解释了证据与结论的因果联系'].map((label,index) => <label key={label} className="flex gap-2"><input type="checkbox" checked={selfChecks.includes(index)} onChange={() => setSelfChecks(old => old.includes(index) ? old.filter(i => i!==index) : [...old,index])}/>{label}</label>)}
        <p aria-live="polite">自查完成 {selfChecks.length}/3。答案仅保留在当前课程页面，离开前请复制保存。</p>
      </div>}
    </div>}
  </section>;
}
