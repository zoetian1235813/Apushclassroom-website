import type { FC } from "react";
import { useState } from "react";
import { useAuth } from "../../state/authContext";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const CHEAT_ACCOUNT = "鎴戞案杩滃枩娆push";
const CHEAT_PASSWORD = "20260508";
const CHEAT_STORAGE_KEY = "apush-cheat-unlock";
const CHEAT_EVENT_NAME = "apush-cheat-unlocked";

export const LoginPanel: FC = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    sendEmailCode,
    verifyEmailCode,
    startGuestLogin,
    startWeChatLogin,
    logout,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const handleSendCode = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail === "admin" || trimmedEmail === "admin@apush.com") {
      setStatusMessage(
        "检测到管理员账号。请在 Code 输入框内输入管理员密码（默认为 111111），然后点击 Sign in。 (Admin account detected. Enter admin password in Code field and click Sign in.)"
      );
      setErrorMessage(null);
      return;
    }
    if (/^apush\d+$/.test(trimmedEmail)) {
      setStatusMessage(
        "检测到推广账号。请在 Code 输入框内输入推广密码（默认为 123456），然后点击 Sign in。"
      );
      setErrorMessage(null);
      return;
    }
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(null);
    setStatusMessage("Sending verification code...");
    setIsSendingCode(true);
    try {
      await sendEmailCode(email.trim());
      setStatusMessage("Code sent! Check your inbox (valid for 10 minutes).");
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not send the code. Please try again.");
      setStatusMessage(null);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();

    if (trimmedEmail === CHEAT_ACCOUNT && trimmedCode === CHEAT_PASSWORD) {
      try {
        window.localStorage.setItem(CHEAT_STORAGE_KEY, "1");
      } catch (error) {
        console.warn("[LoginPanel] Unable to persist cheat flag", error);
      }
      window.dispatchEvent(new Event(CHEAT_EVENT_NAME));
      setStatusMessage("已解锁所有练习内容，尽情学习吧！");
      setErrorMessage(null);
      setCode("");
      setEmail("");
      return;
    }

    if (!trimmedEmail || !trimmedCode) {
      setErrorMessage("Enter both email and verification code.");
      return;
    }
    setErrorMessage(null);
    const isLoginAsAdmin =
      trimmedEmail.toLowerCase() === "admin" ||
      trimmedEmail.toLowerCase() === "admin@apush.com";
    const isLoginAsPromo = /^apush\d+$/.test(trimmedEmail.toLowerCase());
    
    let statusText = "Signing in...";
    if (isLoginAsAdmin) statusText = "管理员身份校验中...";
    else if (isLoginAsPromo) statusText = "推广账号验证中...";
    
    setStatusMessage(statusText);
    setIsVerifying(true);
    try {
      await verifyEmailCode(trimmedEmail, trimmedCode);
      let successText = "Signed in successfully!";
      if (isLoginAsAdmin) successText = "管理员登录成功！";
      else if (isLoginAsPromo) successText = "推广账号登录成功！";
      
      setStatusMessage(successText);
      setCode("");
    } catch (error: any) {
      console.error(error);
      let errorText = "Invalid verification code. Please try again.";
      if (error && typeof error.status === "undefined") {
        errorText = "无法连接到服务器，请检查服务是否已正常启动 (Cannot connect to server. Please check if the service is running).";
      } else {
        if (isLoginAsAdmin) errorText = "管理员账号或密码错误，请检查输入。";
        else if (isLoginAsPromo) errorText = "推广账号或密码错误，请检查输入。";
      }
      
      setErrorMessage(errorText);
      setStatusMessage(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGuestLogin = async () => {
    setErrorMessage(null);
    setStatusMessage("Entering guest mode...");
    setIsGuestLoading(true);
    try {
      await startGuestLogin();
      setStatusMessage("Guest mode enabled. Unit 1 is unlocked.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not start guest mode. Please try again.");
      setStatusMessage(null);
    } finally {
      setIsGuestLoading(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-700">
          <div className="font-semibold">
            {user.displayName || user.email || "Signed-in user"}
          </div>
          {user.email && (
            <div className="text-xs text-gray-500">{user.email}</div>
          )}
        </div>
        <button
          type="button"
          onClick={logout}
          className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full md:w-96 p-5 rounded-2xl border border-blue-100 bg-white shadow-lg text-left">
      {/* Promotional Pricing Banner */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            Premium Unlock
          </span>
          <span className="text-[10px] text-gray-500 font-semibold font-mono">Notion × Duolingo 🤝</span>
        </div>
        <h4 className="text-base font-bold text-gray-800">
          解锁 APUSH 完整学习版
        </h4>
        <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 font-semibold">
          <li><strong>免费版（游客）</strong>：解锁 Unit 1 导学视频与双语笔记。</li>
          <li><strong>高级版（Premium）</strong>：解锁全部 Unit、题型特训（MCQ/SAQ/LEQ/DBQ）、错题本及历年真题。</li>
        </ul>
        <div className="pt-2 border-t border-blue-200/50 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            联系客服微信：<span className="font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">19855352384</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
            添加微信客服即可自助开通或获取专属激活码，开启您的高分冲刺之旅！
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          登录 / 注册账号以同步进度
        </div>
        <div className="flex flex-col gap-2">
          <input
            id="auth-email-input"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address / 推广账号 (如 apush101)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Code / 推广密码"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold"
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={isVerifying || !code || !email}
              className="rounded-lg bg-emerald-500 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-600 disabled:bg-emerald-300 transition-colors shrink-0"
            >
              {isVerifying ? "Verifying..." : "Sign in"}
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSendingCode || !email || email.trim().toLowerCase().startsWith("apush")}
            className="w-full rounded-lg bg-blue-600 text-white px-3 py-2 text-xs font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isSendingCode ? "Sending..." : "获取邮箱验证码 (Send email code)"}
          </button>
        </div>

        <div className="flex items-center gap-2 py-1">
          <span className="flex-1 border-t border-gray-200" />
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">or</span>
          <span className="flex-1 border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setStatusMessage("Opening WeChat authorization...");
              startWeChatLogin().catch((error) => {
                console.error(error);
                setErrorMessage("WeChat login is unavailable right now.");
                setStatusMessage(null);
              });
            }}
            className="rounded-lg border border-[#1AAD19] text-[#1AAD19] px-2 py-2 text-xs font-bold hover:bg-[#1AAD19] hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            微信登录
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="rounded-lg border border-gray-300 px-2 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-100 disabled:text-gray-400 flex items-center justify-center"
          >
            {isGuestLoading ? "Entering..." : "游客体验"}
          </button>
        </div>
      </div>

      {(statusMessage || errorMessage || isLoading) && (
        <div className="border-t border-gray-150 pt-2 space-y-1">
          {statusMessage && (
            <div className="text-[11px] text-blue-600 font-bold">{statusMessage}</div>
          )}
          {errorMessage && (
            <div className="text-[11px] text-red-500 font-bold">{errorMessage}</div>
          )}
          {isLoading && (
            <div className="text-[11px] text-gray-400 font-semibold">Loading user data...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPanel;
