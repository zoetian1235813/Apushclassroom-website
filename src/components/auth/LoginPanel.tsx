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
    setStatusMessage(isLoginAsAdmin ? "管理员身份校验中..." : "Signing in...");
    setIsVerifying(true);
    try {
      await verifyEmailCode(trimmedEmail, trimmedCode);
      setStatusMessage(isLoginAsAdmin ? "管理员登录成功！" : "Signed in successfully!");
      setCode("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        isLoginAsAdmin
          ? "管理员账号或密码错误，请检查输入。"
          : "Invalid verification code. Please try again."
      );
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
    <div className="flex flex-col gap-2 w-full md:w-80">
      <div className="text-sm text-gray-600 font-semibold">
        Sign in to sync your progress
      </div>
      <input
        id="auth-email-input"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSendCode}
          disabled={isSendingCode || !email}
          className="flex-1 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSendingCode ? "Sending..." : "Send code"}
        </button>
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Code"
          className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={handleVerifyCode}
          disabled={isVerifying || !code}
          className="rounded-lg bg-emerald-500 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-600 disabled:bg-emerald-300 transition-colors"
        >
          {isVerifying ? "Verifying..." : "Sign in"}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex-1 border-t border-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <span className="flex-1 border-t border-gray-200" />
      </div>
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
        className="w-full rounded-lg border border-[#1AAD19] text-[#1AAD19] px-3 py-2 text-sm font-semibold hover:bg-[#1AAD19] hover:text-white transition-colors"
      >
        Sign in with WeChat
      </button>
      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={isGuestLoading}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:text-gray-400"
      >
        {isGuestLoading ? "Starting guest mode..." : "Continue as guest"}
      </button>
      {statusMessage && (
        <div className="text-xs text-blue-600 mt-1">{statusMessage}</div>
      )}
      {errorMessage && (
        <div className="text-xs text-red-500 mt-1">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="text-xs text-gray-400 mt-1">Loading user data...</div>
      )}
    </div>
  );
};

export default LoginPanel;
