import type { FC } from "react";
import { X } from "lucide-react";
import { LoginPanel } from "./LoginPanel";
import { useAuth } from "../../state/authContext";

interface RegistrationModalProps {
  open: boolean;
  onClose: (remember?: boolean) => void;
}

export const RegistrationModal: FC<RegistrationModalProps> = ({ open, onClose }) => {
  const { isAuthenticated } = useAuth();

  if (!open) return null;

  const focusLoginPanel = () => {
    if (typeof document === "undefined") {
      return;
    }
    const input = document.getElementById("auth-email-input") as HTMLInputElement | null;
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40">
      <div
        className="relative w-full max-w-5xl h-screen bg-sky-50 shadow-2xl border border-sky-100 
                   rounded-none md:rounded-3xl flex flex-col justify-center"
      >
        {/* ✅ 右上角关闭按钮 */}
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center 
                     rounded-full bg-slate-900 text-white shadow-md hover:bg-slate-800 
                     transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 z-20"
          aria-label="关闭注册弹窗"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ✅ 主体内容：左右两栏宣传 + 登录 */}
        <div className="grid md:grid-cols-[1.1fr_0.9fr] h-full">
          {/* 左侧宣传内容 */}
          <div className="p-10 md:p-12 flex flex-col justify-center space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={focusLoginPanel}
                className="inline-flex items-center gap-1 rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100 hover:text-sky-900"
              >
                已有账号？直接登录
              </button>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-sky-600 shadow-sm">
              解锁所有 APUSH 学习资源于一处
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              使用学习笔记、题型训练与 AI Study Support，保持学习节奏
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              创建一个免费账号，同步学习进度，访问双语学习指南（Study Guides），
              并获得个性化提醒与复习建议。
            </p>

            {/* 三个功能说明卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-3xl bg-white p-4 shadow-md border border-slate-100">
                <p className="text-xs font-semibold text-sky-600 uppercase">Study Guides</p>
                <p className="mt-2 text-sm text-slate-600">
                  精简双语笔记，包含考试核心词汇与历史示例，帮助你快速复习每个单元。
                </p>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-md border border-slate-100">
                <p className="text-xs font-semibold text-sky-600 uppercase">Practice Sets</p>
                <p className="mt-2 text-sm text-slate-600">
                  提供 MCQ、SAQ、LEQ 题型训练与讲解，强化每个知识点。
                </p>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-md border border-slate-100 sm:col-span-2">
                <p className="text-xs font-semibold text-sky-600 uppercase">Smart Tracking</p>
                <p className="mt-2 text-sm text-slate-600">
                  自动同步学习进度，生成提醒与个性化推荐，助你高效备考。
                </p>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2">
                <span>✓ 免费注册</span>
                <span>✓ 支持邮箱或 WeChat 登录</span>
                <span>✓ 随时退出，不影响查看笔记</span>
              </div>
            )}
          </div>

          {/* 右侧登录区 */}
          <div className="relative bg-white/90 backdrop-blur-sm border-l border-sky-100 flex flex-col justify-center p-10 md:p-12">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/40 to-white" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                创建你的免费账户以继续使用
              </h3>

              <LoginPanel />

              <p className="text-xs text-slate-400 leading-relaxed">
                继续操作即表示你同意我们的
                <a
                  className="text-sky-500 hover:text-sky-600 underline ml-1"
                  href="/terms"
                >
                  使用条款 (Terms of Use)
                </a>
                和
                <a
                  className="text-sky-500 hover:text-sky-600 underline ml-1"
                  href="/privacy"
                >
                  隐私政策 (Privacy Policy)
                </a>
                。我们尊重你的邮箱隐私——可随时取消订阅。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
