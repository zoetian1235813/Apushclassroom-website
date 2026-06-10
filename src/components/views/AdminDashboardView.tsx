import { useState, useEffect } from "react";
import {
  Users,
  Check,
  X,
  Ticket,
  BarChart3,
  Search,
  Trash2,
  RefreshCw,
  Award,
  BookOpen,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../state/authContext";
import { apiRequest } from "../../utils/apiClient";

interface AdminStats {
  totalUsers: number;
  activePremium: number;
  pendingRequests: number;
  totalCodes: number;
  unusedCodes: number;
}

interface AdminUser {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  accountType: "registered" | "guest" | "admin";
  subscriptionStatus: "free" | "pending" | "active";
  contentRegion: "china" | "overseas";
  createdAt: string;
  lastLoginAt: string | null;
  progressCount: number;
  mistakeCount: number;
  subscriptionExpiresAt?: string | null;
}

interface ActivationCode {
  code: string;
  consumed: number;
  consumed_by: string | null;
  consumed_at: string | null;
  consumed_by_email?: string | null;
}

interface StudentDetail {
  progress: Array<{ topic_id: string; step_id: string; updated_at: string }>;
  mistakes: Array<{
    id: number;
    question_id: string;
    topic_id: string;
    topic_name: string;
    unit_id: number;
    incorrect_count: number;
    last_incorrect_at: string;
  }>;
}

export const AdminDashboardView = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"stats" | "users" | "codes">("stats");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [codes, setCodes] = useState<ActivationCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search & Filters state
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState<string>("all");

  // Code Generation state
  const [customCode, setCustomCode] = useState("");
  const [batchCount, setBatchCount] = useState(5);
  const [batchPrefix, setBatchPrefix] = useState("APUSH-");

  // Promo Account Generation state
  const [promoPrefix, setPromoPrefix] = useState("apush");
  const [promoCount, setPromoCount] = useState(5);
  const [generatedPromoAccounts, setGeneratedPromoAccounts] = useState<string[]>([]);
  const [isGeneratingPromo, setIsGeneratingPromo] = useState(false);

  // Student Detail Modal state
  const [selectedStudent, setSelectedStudent] = useState<AdminUser | null>(null);
  const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const fetchStats = async () => {
    if (!token) return;
    try {
      const data = await apiRequest<AdminStats>("/api/admin/stats", { token });
      setStats(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to load dashboard statistics");
    }
  };

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const data = await apiRequest<{ users: AdminUser[] }>("/api/admin/users", { token });
      setUsers(data.users);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to load user list");
    }
  };

  const fetchCodes = async () => {
    if (!token) return;
    try {
      const data = await apiRequest<{ codes: ActivationCode[] }>("/api/admin/codes", { token });
      setCodes(data.codes);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to load activation codes registry");
    }
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    await Promise.all([fetchStats(), fetchUsers(), fetchCodes()]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  const handleUpdateSubscription = async (userId: string, subscriptionStatus: "free" | "active", accountType?: string) => {
    if (!token) return;
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      await apiRequest(`/api/admin/users/${userId}/subscription`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ subscriptionStatus, accountType }),
      });
      setStatusMessage("用户订阅状态更新成功！");
      await loadDashboardData();
      if (selectedStudent && selectedStudent.id === userId) {
        setSelectedStudent(null);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to update subscription status");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    if (!window.confirm("确定要永久删除该用户吗？此操作将清空其所有的学习进度和错题本！")) return;
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      await apiRequest(`/api/admin/users/${userId}`, {
        method: "DELETE",
        token,
      });
      setStatusMessage("用户删除成功。");
      await loadDashboardData();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to delete user profile");
    }
  };

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      if (customCode.trim()) {
        await apiRequest("/api/admin/codes", {
          method: "POST",
          token,
          body: JSON.stringify({ code: customCode }),
        });
        setStatusMessage(`自定义激活码 ${customCode.toUpperCase()} 创建成功！`);
        setCustomCode("");
      } else {
        await apiRequest("/api/admin/codes", {
          method: "POST",
          token,
          body: JSON.stringify({ count: batchCount, prefix: batchPrefix }),
        });
        setStatusMessage(`成功批量生成 ${batchCount} 个专属激活码！`);
      }
      await loadDashboardData();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to create activation codes");
    }
  };

  const handleDeleteCode = async (code: string) => {
    if (!token) return;
    if (!window.confirm(`确定要永久注销激活码 ${code} 吗？`)) return;
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      await apiRequest(`/api/admin/codes/${code}`, {
        method: "DELETE",
        token,
      });
      setStatusMessage("激活码注销成功。");
      await loadDashboardData();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to revoke activation code");
    }
  };

  const handleGeneratePromoAccounts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setErrorMessage(null);
    setStatusMessage(null);
    setIsGeneratingPromo(true);
    try {
      const data = await apiRequest<{ success: boolean; accounts: string[] }>("/api/admin/generate-promo-accounts", {
        method: "POST",
        token,
        body: JSON.stringify({ count: promoCount, prefix: promoPrefix }),
      });
      setGeneratedPromoAccounts(data.accounts);
      setStatusMessage(`成功生成 ${data.accounts.length} 个推广账号！`);
      await loadDashboardData();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to generate promo accounts");
    } finally {
      setIsGeneratingPromo(false);
    }
  };

  const handleViewStudentDetails = async (student: AdminUser) => {
    if (!token) return;
    setSelectedStudent(student);
    setIsDetailLoading(true);
    setStudentDetail(null);
    try {
      const data = await apiRequest<StudentDetail>(`/api/admin/users/${student.id}/progress`, { token });
      setStudentDetail(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("无法加载该学生的学习画像");
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Filter users based on search query and status filter
  const filteredUsers = users.filter((user) => {
    const searchString = (user.email || user.displayName || user.id).toLowerCase();
    const matchesSearch = searchString.includes(userSearch.toLowerCase());
    
    if (userFilter === "all") return matchesSearch;
    if (userFilter === "active") return matchesSearch && user.subscriptionStatus === "active";
    if (userFilter === "pending") return matchesSearch && user.subscriptionStatus === "pending";
    if (userFilter === "free") return matchesSearch && user.subscriptionStatus === "free";
    if (userFilter === "guest") return matchesSearch && user.accountType === "guest";
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Dashboard Top Shell */}
      <section className="glass-panel space-y-4 border border-white/25 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="zen-chip text-xs">Admin Control Center</span>
            <h2 className="mt-3 text-3xl font-black bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent">
              APUSH 网站配套管理后台
            </h2>
            <p className="mt-1 text-sm text-midnight/65">
              实时监测学生进度，一键自助审批付费，快速生成并注销专属激活码。
            </p>
          </div>
          <button
            type="button"
            onClick={loadDashboardData}
            className="flex items-center gap-2 rounded-full border border-midnight/15 bg-white px-4 py-2 text-xs font-semibold text-midnight hover:bg-midnight/5 shadow-sm transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            刷新后台数据
          </button>
        </div>
      </section>

      {/* Navigation tabs */}
      <div className="flex border-b border-midnight/10 pb-1 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border transition ${
            activeTab === "stats"
              ? "bg-midnight text-white border-midnight shadow-glow"
              : "border-transparent text-midnight/65 hover:text-midnight hover:bg-midnight/5"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          数据大盘与快速审批
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border transition ${
            activeTab === "users"
              ? "bg-midnight text-white border-midnight shadow-glow"
              : "border-transparent text-midnight/65 hover:text-midnight hover:bg-midnight/5"
          }`}
        >
          <Users className="h-4 w-4" />
          学生名册与学习画像 ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("codes")}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border transition ${
            activeTab === "codes"
              ? "bg-midnight text-white border-midnight shadow-glow"
              : "border-transparent text-midnight/65 hover:text-midnight hover:bg-midnight/5"
          }`}
        >
          <Ticket className="h-4 w-4" />
          激活码仓库与生成器 ({codes.length})
        </button>
      </div>

      {/* Dynamic Tab Body */}
      {isLoading ? (
        <div className="glass-panel py-16 flex flex-col items-center justify-center gap-3 border border-white/20">
          <RefreshCw className="h-8 w-8 text-midnight/40 animate-spin" />
          <span className="text-sm font-semibold text-midnight/50">正在获取本地安全 SQLite 数据...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tab 1: Stats */}
          {activeTab === "stats" && stats && (
            <div className="space-y-6">
              {/* Stats cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="glass-card p-5 border border-white/20 bg-gradient-to-br from-blue-50/50 to-white/70">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="mt-3 text-2xl font-black text-midnight">{stats.totalUsers}</div>
                  <div className="text-xs font-semibold text-midnight/50 uppercase tracking-wider">全站总学生数</div>
                </div>
                <div className="glass-card p-5 border border-white/20 bg-gradient-to-br from-emerald-50/50 to-white/70">
                  <Award className="h-8 w-8 text-emerald-600" />
                  <div className="mt-3 text-2xl font-black text-midnight">{stats.activePremium}</div>
                  <div className="text-xs font-semibold text-midnight/50 uppercase tracking-wider">Premium 会员数</div>
                </div>
                <div className="glass-card p-5 border border-white/20 bg-gradient-to-br from-amber-50/50 to-white/70 relative overflow-hidden">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                  <div className="mt-3 text-2xl font-black text-midnight">{stats.pendingRequests}</div>
                  <div className="text-xs font-semibold text-midnight/50 uppercase tracking-wider">付费待审批申请</div>
                  {stats.pendingRequests > 0 && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  )}
                </div>
                <div className="glass-card p-5 border border-white/20 bg-gradient-to-br from-purple-50/50 to-white/70">
                  <Ticket className="h-8 w-8 text-purple-600" />
                  <div className="mt-3 text-2xl font-black text-midnight">
                    {stats.unusedCodes} <span className="text-sm font-semibold text-midnight/40">/ {stats.totalCodes}</span>
                  </div>
                  <div className="text-xs font-semibold text-midnight/50 uppercase tracking-wider">未使用的激活码</div>
                </div>
              </div>

              {/* Pending Approvals quick-list */}
              <div className="glass-panel p-6 border border-white/25">
                <h3 className="text-lg font-bold text-midnight flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  待审批付费开通申请 ({users.filter(u => u.subscriptionStatus === "pending").length})
                </h3>
                {users.filter(u => u.subscriptionStatus === "pending").length === 0 ? (
                  <p className="text-sm text-midnight/50 py-4 text-center">暂无待开通的 pending 付费用户，工作已全部清空！</p>
                ) : (
                  <div className="grid gap-3">
                    {users.filter(u => u.subscriptionStatus === "pending").map((pendingUser) => (
                      <div key={pendingUser.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-amber-200/50 bg-amber-50/20">
                        <div>
                          <div className="font-bold text-midnight">{pendingUser.email || `游客 ID: ${pendingUser.id.substring(0, 8)}...`}</div>
                          <div className="text-xs text-midnight/60">申请提交于: {pendingUser.createdAt ? new Date(pendingUser.createdAt).toLocaleString() : "未知"}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateSubscription(pendingUser.id, "active")}
                            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition"
                          >
                            <Check className="h-3.5 w-3.5" />
                            ✓ 审核通过并开通 (Approve)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateSubscription(pendingUser.id, "free")}
                            className="inline-flex items-center gap-1.5 rounded-full border border-midnight/15 bg-white px-3.5 py-2 text-xs font-semibold text-midnight hover:bg-midnight/5 transition"
                          >
                            <X className="h-3.5 w-3.5" />
                            拒绝申请 (Reject)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: User Directory & Learner Profiler */}
          {activeTab === "users" && (
            <div className="space-y-4">
              {/* Directory Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl border border-white/20 bg-white/40 backdrop-blur-md">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-midnight/40" />
                  <input
                    type="text"
                    placeholder="输入账号、Email 或 ID 进行精确筛选"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full rounded-full border border-midnight/10 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10"
                  />
                </div>
                <div className="flex gap-1.5">
                  {[
                    { id: "all", label: "全名册" },
                    { id: "active", label: "Premium" },
                    { id: "pending", label: "Pending" },
                    { id: "free", label: "免费用户" },
                    { id: "guest", label: "匿名游客" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setUserFilter(filter.id)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition border ${
                        userFilter === filter.id
                          ? "bg-midnight border-midnight text-white"
                          : "bg-white border-midnight/10 text-midnight/70 hover:border-midnight/35"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Users Directory Table */}
              <div className="glass-panel overflow-hidden border border-white/25">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-midnight/80">
                    <thead className="bg-midnight/5 text-midnight/60 border-b border-midnight/10 uppercase tracking-wider text-xs font-bold">
                      <tr>
                        <th className="px-6 py-4">学生账号 (Email)</th>
                        <th className="px-6 py-4">订阅级别</th>
                        <th className="px-6 py-4">版本首选</th>
                        <th className="px-6 py-4">学习进度数</th>
                        <th className="px-6 py-4">错题数量</th>
                        <th className="px-6 py-4">最近登录时间</th>
                        <th className="px-6 py-4 text-right">后台管控操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-midnight/5 font-semibold">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-midnight/40 font-normal">
                            没有查找到符合过滤条件的注册学生。
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((item) => (
                          <tr key={item.id} className="hover:bg-white/30 transition">
                            <td className="px-6 py-4">
                              <div>
                                <span className="font-bold text-midnight block">
                                  {item.email || "匿名游客 (Anonymous)"}
                                </span>
                                <span className="text-[10px] text-midnight/40 font-mono block mt-0.5">
                                  ID: {item.id}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-0.5">
                                <span
                                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                    item.subscriptionStatus === "active"
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      : item.subscriptionStatus === "pending"
                                        ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                                        : "bg-midnight/5 text-midnight/65 border border-midnight/10"
                                  }`}
                                >
                                  {item.accountType === "admin" ? "ADMIN" : item.subscriptionStatus.toUpperCase()}
                                </span>
                                {item.subscriptionExpiresAt && (
                                  <span className="text-[9px] text-gray-500 font-medium font-mono">
                                    至: {new Date(item.subscriptionExpiresAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs uppercase bg-white border border-midnight/10 rounded-full px-2.5 py-0.5 text-midnight/70">
                                {item.contentRegion === "china" ? "🇨🇳 国内" : "🌐 海外"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center gap-1.5 justify-center">
                                <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                                <span className="font-black text-midnight">{item.progressCount}</span>
                                <span className="text-[10px] text-midnight/40 font-normal">steps</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`font-black ${
                                  item.mistakeCount > 0 ? "text-red-600" : "text-midnight/40"
                                }`}
                              >
                                {item.mistakeCount}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-midnight/60">
                              {item.lastLoginAt ? new Date(item.lastLoginAt).toLocaleString() : "暂未登录记录"}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleViewStudentDetails(item)}
                                  className="rounded-full bg-midnight/5 px-3 py-1.5 text-xs hover:bg-midnight hover:text-white transition"
                                >
                                  查看画像 (Profiler)
                                </button>
                                {item.accountType !== "admin" && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(item.id)}
                                    className="rounded-full p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                                    title="删除此学生账号"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Activation Codes Control Registry */}
          {activeTab === "codes" && (
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Box 1: Code Generator */}
              <div className="glass-panel p-5 border border-white/25 h-fit space-y-5">
                <div className="flex items-center gap-2 border-b border-midnight/5 pb-3">
                  <Ticket className="h-5 w-5 text-indigo-500" />
                  <h4 className="text-lg font-bold text-midnight">激活码自动生成器</h4>
                </div>
                <form onSubmit={handleCreateCode} className="space-y-4">
                  {/* Single Code Option */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-midnight/65 block">
                      选项 A：创建自定义独立激活码
                    </label>
                    <input
                      type="text"
                      placeholder="如: APUSH-SUPER-ZOE"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      className="w-full rounded-full border border-midnight/10 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10 uppercase"
                    />
                    <p className="text-[10px] text-midnight/40 leading-relaxed">
                      不输入此项，则默认通过下方“选项 B”进行系统随机批量生成。
                    </p>
                  </div>

                  <hr className="border-midnight/5" />

                  {/* Batch generator Options */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-midnight/65 block">
                        选项 B：批量生成前缀
                      </label>
                      <input
                        type="text"
                        value={batchPrefix}
                        onChange={(e) => setBatchPrefix(e.target.value)}
                        className="w-full rounded-full border border-midnight/10 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10 uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-midnight/65 block">
                        生成个数 (Count)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={batchCount}
                        onChange={(e) => setBatchCount(Number.parseInt(e.target.value, 10))}
                        className="w-full rounded-full border border-midnight/10 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-midnight py-2.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
                  >
                    🚀 立即将激活码存储到 SQLite 中
                  </button>
                </form>
              </div>

              {/* Box 1.5: Promo Account Generator */}
              <div className="glass-panel p-5 border border-white/25 h-fit space-y-5 mt-6">
                <div className="flex items-center gap-2 border-b border-midnight/5 pb-3">
                  <Users className="h-5 w-5 text-emerald-500" />
                  <h4 className="text-lg font-bold text-midnight">推广账号一键生成器</h4>
                </div>
                <form onSubmit={handleGeneratePromoAccounts} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-midnight/65 block">
                        账号前缀
                      </label>
                      <input
                        type="text"
                        value={promoPrefix}
                        onChange={(e) => setPromoPrefix(e.target.value)}
                        className="w-full rounded-full border border-midnight/10 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10 font-bold"
                        placeholder="如: apush"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-midnight/65 block">
                        生成个数
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={promoCount}
                        onChange={(e) => setPromoCount(Number.parseInt(e.target.value, 10))}
                        className="w-full rounded-full border border-midnight/10 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-midnight/10 font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 py-2.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
                    disabled={isGeneratingPromo}
                  >
                    {isGeneratingPromo ? "生成中..." : "👥 立即批量生成推广账号"}
                  </button>
                </form>

                {generatedPromoAccounts.length > 0 && (
                  <div className="space-y-2 rounded-2xl bg-emerald-50/50 p-4 border border-emerald-100 text-xs">
                    <div className="font-bold text-emerald-800">成功生成以下账号 (密码: 123456)：</div>
                    <div className="max-h-28 overflow-y-auto font-mono bg-white p-2 rounded-lg border border-emerald-150 space-y-1">
                      {generatedPromoAccounts.map((acc, idx) => (
                        <div key={idx} className="flex justify-between items-center text-midnight font-bold">
                          <span>{acc}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(acc);
                              setStatusMessage(`已复制账号: ${acc}`);
                            }}
                            className="text-[10px] text-emerald-600 hover:underline"
                          >
                            复制
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Box 2: Codes List */}
              <div className="glass-panel overflow-hidden border border-white/25">
                <h4 className="px-6 py-4 bg-midnight/5 text-sm font-bold text-midnight border-b border-midnight/10 flex items-center justify-between">
                  <span>SQLite 激活码数据库存 ({codes.length})</span>
                  <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    剩余可兑换: {codes.filter(c => c.consumed === 0).length}
                  </span>
                </h4>
                <div className="overflow-y-auto max-h-[480px]">
                  <table className="w-full border-collapse text-left text-sm text-midnight/80">
                    <thead className="bg-midnight/5 text-midnight/50 uppercase tracking-wider text-[10px] font-bold border-b border-midnight/10 sticky top-0 bg-white/90">
                      <tr>
                        <th className="px-6 py-3">激活码 (CODE)</th>
                        <th className="px-6 py-3">状态</th>
                        <th className="px-6 py-3">兑换人</th>
                        <th className="px-6 py-3">兑换时间</th>
                        <th className="px-6 py-3 text-right">撤回</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-midnight/5 font-semibold">
                      {codes.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-midnight/40 font-normal">
                            当前没有任何可用激活码，请在左侧生成！
                          </td>
                        </tr>
                      ) : (
                        codes.map((item) => (
                          <tr key={item.code} className="hover:bg-white/20 transition">
                            <td className="px-6 py-3.5">
                              <span className="font-mono font-bold text-midnight bg-midnight/5 rounded px-2 py-0.5">
                                {item.code}
                              </span>
                            </td>
                            <td className="px-6 py-3.5">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold ${
                                  item.consumed === 1
                                    ? "text-red-600"
                                    : "text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5"
                                }`}
                              >
                                {item.consumed === 1 ? "● 已被兑换" : "● 未使用"}
                              </span>
                            </td>
                            <td className="px-6 py-3.5 text-xs max-w-[140px] truncate text-midnight">
                              {item.consumed_by_email || item.consumed_by || "—"}
                            </td>
                            <td className="px-6 py-3.5 text-[10px] text-midnight/60">
                              {item.consumed_at ? new Date(item.consumed_at).toLocaleString() : "—"}
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              {item.consumed === 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCode(item.code)}
                                  className="text-red-500 hover:text-red-700 p-1.5 transition"
                                  title="撤销删除此码"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              ) : (
                                <span className="text-[10px] text-midnight/30 font-normal">锁定</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Global Status/Error Banner */}
      {(statusMessage || errorMessage) && (
        <div
          className={`fixed bottom-6 left-6 z-50 rounded-2xl px-5 py-3 text-xs font-bold border shadow-lg flex items-center gap-2 max-w-sm ${
            errorMessage
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <div className="flex-1">{errorMessage ?? statusMessage}</div>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setStatusMessage(null);
            }}
            className="text-midnight/40 hover:text-midnight ml-2 font-black text-sm"
          >
            ×
          </button>
        </div>
      )}

      {/* Student Profiler Modal Overlay */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-4xl rounded-3xl border border-white/20 bg-white p-6 shadow-glass relative flex flex-col max-h-[85vh]">
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 text-midnight/40 hover:text-midnight font-black text-xl p-2 rounded-full hover:bg-midnight/5 transition"
            >
              ×
            </button>

            {/* Profile Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-midnight/5 pb-4 mb-5">
              <div>
                <span className="zen-chip text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-150">
                  Student Profile Analyzer
                </span>
                <h3 className="mt-2 text-2xl font-bold text-midnight">
                  {selectedStudent.email || "匿名游客账号 (Anonymous)"}
                </h3>
                <p className="text-xs text-midnight/45 font-mono mt-0.5">ID: {selectedStudent.id}</p>
              </div>

              {/* Sub status upgrade controls inside modal */}
              <div className="flex items-center gap-2 rounded-2xl border border-midnight/5 bg-midnight/5 p-3 text-xs font-semibold">
                <div>
                  <span className="text-midnight/55 block">当前订阅权限</span>
                  <span className="font-bold text-midnight block uppercase">
                    {selectedStudent.subscriptionStatus}
                  </span>
                  {selectedStudent.subscriptionExpiresAt && (
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                      有效期至: {new Date(selectedStudent.subscriptionExpiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="border-l border-midnight/10 pl-3 ml-2 flex gap-1">
                  {selectedStudent.subscriptionStatus !== "active" ? (
                    <button
                      type="button"
                      onClick={() => handleUpdateSubscription(selectedStudent.id, "active")}
                      className="rounded-full bg-emerald-600 px-3 py-1.5 font-bold text-white hover:bg-emerald-700 transition"
                    >
                      ✓ 一键审批开通
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUpdateSubscription(selectedStudent.id, "free")}
                      className="rounded-full border border-midnight/15 bg-white px-3 py-1.5 font-bold text-midnight hover:bg-midnight/5 transition"
                    >
                      🔒 降级降权
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            {isDetailLoading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3 flex-grow">
                <RefreshCw className="h-8 w-8 text-midnight/40 animate-spin" />
                <span className="text-xs text-midnight/45">正在全量抓取数据库学习记录...</span>
              </div>
            ) : studentDetail ? (
              <div className="grid gap-6 md:grid-cols-2 overflow-y-auto pr-1 flex-grow">
                {/* Panel 1: Lesson Progress Grid */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-midnight flex items-center gap-1.5 border-b border-midnight/5 pb-2">
                    <BookOpen className="h-4 w-4 text-indigo-500" />
                    课程进度检测点 ({studentDetail.progress.length})
                  </h4>
                  {studentDetail.progress.length === 0 ? (
                    <p className="text-xs text-midnight/40 py-6 text-center">该学生尚未进行任何小节步骤的学习打卡。</p>
                  ) : (
                    <div className="grid gap-2 text-xs">
                      {studentDetail.progress.map((prog, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-white bg-gradient-to-r from-indigo-50/20 to-white/90 shadow-sm">
                          <div>
                            <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 mr-2">
                              Topic {prog.topic_id}
                            </span>
                            <span className="font-medium text-midnight/70">
                              {prog.step_id.includes("step1") ? "视频学习" : "精读打卡"}
                            </span>
                          </div>
                          <span className="text-[10px] text-midnight/40">
                            {prog.updated_at ? new Date(prog.updated_at).toLocaleString() : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Panel 2: Mistakes Book Analyzer */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-midnight flex items-center gap-1.5 border-b border-midnight/5 pb-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    错题本错漏点统计 ({studentDetail.mistakes.length})
                  </h4>
                  {studentDetail.mistakes.length === 0 ? (
                    <p className="text-xs text-moss py-6 text-center font-bold">🎉 太棒了！该学生错题本中目前 0 错题！</p>
                  ) : (
                    <div className="grid gap-2 text-xs">
                      {studentDetail.mistakes.map((mistake) => (
                        <div key={mistake.id} className="p-3 rounded-xl border border-red-150 bg-red-50/10 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-red-700 bg-red-50 border border-red-100 rounded px-1.5 py-0.5">
                              Unit {mistake.unit_id} · Topic {mistake.topic_id}
                            </span>
                            <span className="font-black text-red-600">做错 {mistake.incorrect_count} 次</span>
                          </div>
                          <div className="text-midnight/70 font-semibold truncate mt-1">
                            考点: {mistake.topic_name || `Topic ${mistake.topic_id}`}
                          </div>
                          <div className="text-[10px] text-midnight/40 flex items-center gap-1 justify-end mt-1.5">
                            <Calendar className="h-3 w-3" />
                            最后一次出错于: {new Date(mistake.last_incorrect_at).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
