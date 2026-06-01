import { CheckCircle, Crown, Globe2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { LoginPanel } from "../auth/LoginPanel";
import { useAuth } from "../../state/authContext";
import { apiRequest } from "../../utils/apiClient";

const guideSteps = [
  {
    title: "1. Pick a unit",
    body: "从左侧 Unit 目录进入小章节。每个 topic 先看导学视频，再读双语笔记。",
  },
  {
    title: "2. Practice by skill",
    body: "完成章节后进入题型特训，按 MCQ、SAQ、LEQ/DBQ 的考试能力训练。",
  },
  {
    title: "3. Review mistakes",
    body: "登录后错题和学习进度会同步到后端，方便跨设备继续学习。",
  },
];

export const UserGuideView = () => {
  const {
    user,
    isAuthenticated,
    token,
    updateContentRegion,
    requestUpgrade,
    refreshProfile,
  } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activationCode, setActivationCode] = useState("");

  const contentRegion = user?.contentRegion ?? "overseas";
  const subscriptionStatus = user?.subscriptionStatus ?? "free";

  const handleActivate = async () => {
    if (!activationCode.trim()) {
      setError("请输入激活码。");
      return;
    }
    if (!token) {
      setError("请先登录，然后再进行激活。");
      return;
    }
    setError(null);
    setStatus(null);
    setIsSaving(true);
    try {
      const data = await apiRequest<{ success: boolean; message: string }>(
        "/billing/activate",
        {
          method: "POST",
          token,
          body: JSON.stringify({ code: activationCode.trim() }),
        }
      );
      await refreshProfile();
      setStatus(data.message || "账号激活成功！");
      setActivationCode("");
    } catch (activationError: any) {
      console.error(activationError);
      setError(activationError.message || "激活失败，请检查您的激活码。");
    } finally {
      setIsSaving(false);
    }
  };

  const saveRegion = async (nextRegion: "china" | "overseas") => {
    setError(null);
    setStatus(null);
    setIsSaving(true);
    try {
      await updateContentRegion(nextRegion);
      setStatus(nextRegion === "china" ? "已切换为国内版视频源。" : "已切换为海外版 Heimler 视频源。");
    } catch (saveError) {
      console.error(saveError);
      setError("请先登录，然后再保存版本选择。");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpgrade = async () => {
    setError(null);
    setStatus(null);
    setIsSaving(true);
    try {
      await requestUpgrade();
      await refreshProfile();
      setStatus("升级申请已提交，后端管理员现在可以看到 pending 状态。");
    } catch (upgradeError) {
      console.error(upgradeError);
      setError("请先登录，然后再提交付费开通申请。");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <section className="glass-panel space-y-5 border border-white/25 px-6 py-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="zen-chip text-xs">User Guide</span>
            <h2 className="mt-3 text-3xl font-semibold text-midnight">
              使用指南与账号设置
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-midnight/65">
              免费版和游客账号可浏览 Unit 1。付费版开通后解锁全部 Unit、题型特训、错题本和历年真题。
            </p>
          </div>
          <div className="rounded-2xl border border-midnight/10 bg-white px-4 py-3 text-sm text-midnight shadow-glow">
            <div className="font-semibold">当前状态</div>
            <div className="mt-1 text-midnight/65">
              {isAuthenticated ? user?.email || user?.displayName || "Signed in" : "未登录"}
            </div>
            <div className="mt-2 inline-flex rounded-full bg-midnight/10 px-3 py-1 text-xs font-semibold">
              {subscriptionStatus.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {guideSteps.map((step) => (
          <div key={step.title} className="glass-card border border-white/25 px-5 py-5">
            <CheckCircle className="h-6 w-6 text-moss" />
            <h3 className="mt-4 text-lg font-semibold text-midnight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-midnight/65">{step.body}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel space-y-5 border border-white/25 px-6 py-6">
          <div className="flex items-center gap-3">
            <Globe2 className="h-6 w-6 text-midnight" />
            <h3 className="text-2xl font-semibold text-midnight">版本选择</h3>
          </div>
          <p className="text-sm leading-relaxed text-midnight/65">
            国内版和海外版只改变视频跳转源。海外版优先内嵌 Heimler；国内版跳转到你提供的 B 站播放列表。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => saveRegion("overseas")}
              disabled={isSaving}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                contentRegion === "overseas"
                  ? "border-midnight bg-midnight text-white"
                  : "border-midnight/15 bg-white text-midnight hover:border-midnight/35"
              }`}
            >
              <div className="font-semibold">海外版</div>
              <div className="mt-1 text-sm opacity-75">Heimler / YouTube</div>
            </button>
            <button
              type="button"
              onClick={() => saveRegion("china")}
              disabled={isSaving}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                contentRegion === "china"
                  ? "border-midnight bg-midnight text-white"
                  : "border-midnight/15 bg-white text-midnight hover:border-midnight/35"
              }`}
            >
              <div className="font-semibold">国内版</div>
              <div className="mt-1 text-sm opacity-75">Bilibili playlist</div>
            </button>
          </div>
        </div>

        <div className="glass-panel space-y-5 border border-white/25 px-6 py-6">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-midnight" />
            <h3 className="text-2xl font-semibold text-midnight">高级权限（Premium）</h3>
          </div>
          <p className="text-sm leading-relaxed text-midnight/65">
            免费版只可浏览 Unit 1。付费开通高级版后即可解锁全部 Unit、题型特训、错题本和历年真题，并且支持进度本地保存。
          </p>
          <div className="rounded-2xl bg-white/50 p-4 border border-midnight/5 text-sm leading-relaxed text-midnight/75 space-y-2">
            <div className="font-semibold text-midnight flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              开通方式：添加微信客服
            </div>
            <p className="text-xs">
              请添加微信客服 **19855352384**。付款通过后，客服会发送给您专属激活码，在此输入即可立即自助激活账号；或者提供您的注册邮箱，由我们为您在后台手动开通。
            </p>
          </div>

          {subscriptionStatus === "active" ? (
            <div className="flex items-center gap-2 rounded-2xl bg-moss/10 border border-moss/20 px-4 py-3 text-moss text-sm font-semibold">
              <ShieldCheck className="h-5 w-5" />
              已成功开通 Premium 高级会员权限
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="请输入专属激活码"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                  disabled={isSaving}
                  className="flex-1 rounded-full border border-midnight/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10 disabled:bg-midnight/5"
                />
                <button
                  type="button"
                  onClick={handleActivate}
                  disabled={isSaving || !activationCode}
                  className="rounded-full bg-midnight px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-midnight/40"
                >
                  激活
                </button>
              </div>
              <button
                type="button"
                onClick={handleUpgrade}
                disabled={isSaving}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-midnight/15 bg-white px-5 py-2.5 text-sm font-semibold text-midnight hover:bg-midnight/5 transition"
              >
                {subscriptionStatus === "pending" ? "已提交后台申请，等待客服处理" : "在后台提交开通申请 (Pending)"}
              </button>
            </div>
          )}
        </div>
      </section>

      {!isAuthenticated && (
        <section className="glass-panel border border-white/25 px-6 py-6">
          <h3 className="text-xl font-semibold text-midnight">登录后保存设置</h3>
          <div className="mt-4">
            <LoginPanel />
          </div>
        </section>
      )}

      {(status || error) && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            error ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {error ?? status}
        </div>
      )}
    </div>
  );
};
