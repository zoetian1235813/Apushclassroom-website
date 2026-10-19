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
  const dialog = useRef<HTMLDialogElement>(null);
  const activeRef = useRef<VideoKnowledgeCheck | null>(null);
  const handled = useRef(new Set<string>());
  const previousTime = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<VideoKnowledgeCheck | null>(null);
  const [choice, setChoice] = useState('');
  const [feedback, setFeedback] = useState(false);
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});
  const [skipped, setSkipped] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [ended, setEnded] = useState(false);
  const [draft, setDraft] = useState('');
  const [firstDraft, setFirstDraft] = useState<string | null>(null);
  const [selfChecks, setSelfChecks] = useState<number[]>([]);
  const sorted = useMemo(() => [...checks].sort((a,b) => a.timestamp-b.timestamp), [checks]);
  const ticket = unit1ExitTickets[topicId];
  useEffect(() => { if (active) dialog.current?.showModal(); else dialog.current?.close(); }, [active]);

  function open(check: VideoKnowledgeCheck) {
    if (!manual) player.current?.pause();
    setPlaying(false); activeRef.current = check; setActive(check); setChoice(''); setFeedback(false);
  }
  function close(resume: boolean) {
    if (active) {
      handled.current.add(active.id);
      if (!attempts[active.id]) setSkipped(old => old.includes(active.id) ? old : [...old, active.id]);
    }
    activeRef.current = null; setActive(null); setPlaying(resume && !manual && !ended);
  }
  function submit() {
    if (!active || !choice || feedback) return;
    setAttempts(old => ({ ...old, [active.id]: { first: old[active.id]?.first ?? choice, latest: choice, count: (old[active.id]?.count ?? 0) + 1 } }));
    setSkipped(old => old.filter(id => id !== active.id)); setFeedback(true);
  }
  const firstCorrect = sorted.filter(check => attempts[check.id]?.first === check.correctChoiceId).length;
  return <section className="space-y-4 rounded-2xl border border-stone-300 bg-[#fffdf7] p-3 sm:p-5" aria-label="Unit 1 视频互动学习">
    <div><p className="editorial-label">UNIT 1 / WATCH · THINK · WRITE</p><h3 className="mt-2 text-xl">边看边练 · {topicId}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{manual ? 'B站模式：请先手动暂停视频，再点击检测点作答。页面不能自动控制 B站播放。' : '播放到检测点将暂停并弹题；也可点击下方检测点主动练习。请保持页面内播放，以便看到弹题。'}</p>
    </div>
    <div className="aspect-video overflow-hidden rounded-xl bg-black">
      {manual ? <iframe src={src} title={title} className="h-full w-full" allowFullScreen /> : <ReactPlayer ref={player} src={src} title={title} controls playsInline playing={playing} width="100%" height="100%"
        onPlay={() => { if (activeRef.current) { player.current?.pause(); return; } setPlaying(true); setEnded(false); }}
        onPause={() => setPlaying(false)} onError={() => { setError(true); setPlaying(false); }}
        onTimeUpdate={event => {
          const now = event.currentTarget.currentTime;
          const check = nextCheckpoint(sorted, handled.current, previousTime.current, now);
          previousTime.current = now;
          if (!activeRef.current && check) open(check);
        }} onEnded={() => { setPlaying(false); setEnded(true); }} />}
    </div>
    {error && <p role="status" className="text-sm text-amber-800">视频暂未加载成功。可使用课程下方的原站链接；检测题与 SAQ 仍可手动作答。</p>}
    <div className="flex flex-wrap gap-2">{sorted.map(check => <button type="button" key={check.id} onClick={() => open(check)} className="study-secondary text-left">
      {timeLabel(check.timestamp)} · {attempts[check.id] ? (attempts[check.id].latest === check.correctChoiceId ? '已答对 · 可重做' : '待复习') : skipped.includes(check.id) ? '已跳过 · 待完成' : '开始检测'}
    </button>)}</div>
    <p className="text-xs leading-6 text-slate-600" aria-live="polite">本次学习：首次答对 {firstCorrect}/{sorted.length}；已作答 {Object.keys(attempts).length}/{sorted.length}。重试不改写首次结果。离开课程后本次记录不保留。</p>
    <dialog ref={dialog} onCancel={event => { event.preventDefault(); close(false); }} className="m-auto w-[min(94vw,640px)] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#fffdf7] p-5 text-slate-800 shadow-xl backdrop:bg-black/60" aria-labelledby="unit1-question">
      {active && <><div className="flex items-center justify-between gap-3"><p className="editorial-label">PAUSE & THINK · {timeLabel(active.timestamp)}</p><button type="button" onClick={() => close(false)} className="rounded border border-stone-300 px-3 py-1">关闭</button></div>
        <h4 id="unit1-question" className="my-5 text-xl">{active.question}</h4>
        <fieldset disabled={feedback} className="space-y-3"><legend className="sr-only">选择一个答案</legend>{active.choices.map(option => <label key={option.id} className="flex cursor-pointer gap-3 rounded-lg border border-stone-300 p-3 text-sm leading-6"><input type="radio" name="unit1-choice" value={option.id} checked={choice===option.id} onChange={() => setChoice(option.id)} />{option.text}</label>)}</fieldset>
        {feedback && <div role="status" className="my-4 rounded-lg bg-stone-100 p-4 text-sm leading-7"><strong>{choice===active.correctChoiceId ? '回答正确。' : '还需要调整。'}</strong><p>{active.explanation}</p><p>正确选项：{active.choices.find(option => option.id===active.correctChoiceId)?.text}</p></div>}
        <div className="mt-5 flex flex-wrap gap-2">{!feedback ? <button type="button" disabled={!choice} onClick={submit} className="study-primary disabled:opacity-40">提交答案</button> : <button type="button" onClick={() => {setChoice('');setFeedback(false);}} className="study-secondary">再试一次</button>}
          <button type="button" onClick={() => close(true)} className="study-secondary">{feedback ? '完成检测，继续观看' : '稍后作答，继续观看'}</button>
          {!manual && <button type="button" onClick={() => { if(player.current) { const target=Math.max(0,active.timestamp-20);player.current.currentTime=target;previousTime.current=target; } close(true); }} className="study-secondary">回看前 20 秒</button>}
        </div>
        {manual && <p className="mt-3 text-xs text-slate-600">关闭题目后，请手动继续 B站视频。</p>}
      </>}
    </dialog>
    {ticket && <div className="border-t border-stone-300 pt-5">
      <p className="editorial-label">EXIT TICKET / 原创 SAQ 微练习</p><h4 className="mt-2 text-xl">{ended ? '视频结束：用证据完成解释' : '观看后：写出你的解释'}</h4>
      <p className="my-4 text-sm leading-7">{ticket.prompt}</p><label htmlFor="unit1-saq" className="text-sm font-semibold">你的答案（建议 2–3 句英文）</label>
      <textarea id="unit1-saq" value={draft} onChange={event => setDraft(event.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 text-sm leading-7" />
      {firstDraft === null ? <button type="button" disabled={!draft.trim()} onClick={() => setFirstDraft(draft)} className="study-primary mt-3 disabled:opacity-40">提交初稿，查看支架</button> : <div className="mt-4 space-y-3 rounded-lg bg-stone-100 p-4 text-sm leading-7">
        <p><strong>写作支架：</strong>{ticket.hint}</p><details><summary className="cursor-pointer font-semibold">查看参考分析</summary><p>{ticket.sample}</p></details>
        <details><summary className="cursor-pointer">对照首次答案</summary><p className="whitespace-pre-wrap">{firstDraft}</p></details>
        <p>在上方修改答案，然后自查（自评不等于正式评分）：</p>{['直接回答了题目要求','使用了具体、准确的历史证据','解释了证据与结论的因果联系'].map((label,index) => <label key={label} className="flex gap-2"><input type="checkbox" checked={selfChecks.includes(index)} onChange={() => setSelfChecks(old => old.includes(index) ? old.filter(i => i!==index) : [...old,index])}/>{label}</label>)}
        <p aria-live="polite">自查完成 {selfChecks.length}/3。答案仅保留在当前课程页面，离开前请复制保存。</p>
      </div>}
    </div>}
  </section>;
}
