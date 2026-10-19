import { useState } from "react";
import { ExternalLink, Maximize2, BookOpen, RotateCcw } from "lucide-react";

const configuredUrl = import.meta.env.VITE_AP_VAULT_URL?.trim();
const AP_VAULT_URL = configuredUrl?.startsWith("https://")
  ? configuredUrl : "https://ap-us-30-days-counting-down.vercel.app";

export function APVaultEmbed({ unitId, topicTitle }: { unitId?: number; topicTitle?: string }) {
  const [started, setStarted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return (
    <section id="ap-vault-practice" className="vault-section scroll-mt-28" aria-labelledby="vault-heading">
      <div className="vault-heading">
        <div>
          <p className="editorial-label">PRACTICE / AP VAULT</p>
          <h2 id="vault-heading">学完这一节，马上练习</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{unitId ? `当前学习：Unit ${unitId}${topicTitle ? ` · ${topicTitle}` : ""}。` : "把知识变成证据，把证据写成答案。"}在下方 AP Vault 中选择 APUSH，再按单元与题型筛选。</p>
        </div>
        <a href={AP_VAULT_URL} target="_blank" rel="noopener noreferrer" className="study-secondary"><ExternalLink size={16} />独立打开题库</a>
      </div>
      <div className="flex flex-wrap gap-3 px-6 pb-5 text-xs text-slate-600">
        <span>01 选单元</span><span aria-hidden="true">→</span><span>02 独立作答</span><span aria-hidden="true">→</span><span>03 对照解析并修改</span>
      </div>
      {started ? <>
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-stone-200 bg-stone-50 px-5 py-3">
          <span className="text-xs text-slate-600">AP Vault · 登录与学习记录由题库独立管理</span>
          <div className="flex gap-4">
            <button type="button" className="inline-flex items-center gap-2 text-sm" onClick={() => setAttempt(n => n + 1)}><RotateCcw size={15} />重新加载</button>
            <button type="button" className="inline-flex items-center gap-2 text-sm" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}><Maximize2 size={15} />{expanded ? "标准高度" : "展开练习区"}</button>
          </div>
        </div>
        <iframe key={attempt} src={AP_VAULT_URL} title="AP Vault APUSH 互动练习题库" className={`vault-frame ${expanded ? "vault-frame-expanded" : ""}`} allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        <p className="border-t border-stone-200 px-6 py-4 text-xs leading-6 text-slate-600">页面空白、加载缓慢或登录受限时，请使用上方“独立打开题库”。两站账号及会员权益分别管理。</p>
      </> : <div className="vault-start">
        <BookOpen size={32} strokeWidth={1.25} />
        <div><h3 className="text-xl">从一道题开始</h3><p className="mt-2 text-sm leading-6 text-slate-600">点击后在本页加载题库。可使用 AP Vault 的 Unit 1 免费试用入口。</p></div>
        <button type="button" onClick={() => setStarted(true)} className="study-primary">在本页开始练习</button>
      </div>}
    </section>
  );
}
