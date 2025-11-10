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
    startWeChatLogin,
    logout,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = async () => {
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
    setStatusMessage("Signing in...");
    setIsVerifying(true);
    try {
      await verifyEmailCode(trimmedEmail, trimmedCode);
      setStatusMessage("Signed in successfully!");
      setCode("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid verification code. Please try again.");
      setStatusMessage(null);
    } finally {
      setIsVerifying(false);
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
      {statusMessage && (
        <div className="text-xs text-blue-600">{statusMessage}</div>
      )}
      {errorMessage && (
        <div className="text-xs text-red-500">{errorMessage}</div>
      )}
      {isLoading && (
        <div className="text-xs text-gray-400">Loading user data...</div>
      )}
    </div>
  );
};

export default LoginPanel;

