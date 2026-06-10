const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface RequestOptions extends RequestInit {
  token?: string | null;
}

// Local storage keys for mock database
const MOCK_USERS_KEY = "apush-mock-users";
const MOCK_PROGRESS_KEY = "apush-mock-progress";
const MOCK_WRONG_QUESTIONS_KEY = "apush-mock-wrong-questions";
const MOCK_CODES_KEY = "apush-mock-codes";

// Helper to initialize mock database
function initMockDb() {
  if (!localStorage.getItem(MOCK_CODES_KEY)) {
    localStorage.setItem(MOCK_CODES_KEY, JSON.stringify([
      { code: "APUSH8888", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH6666", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-2026-ACTIVE", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-VX-19855352384", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-ZOE-TIAN", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-9999", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-520", consumed: 0, consumed_by: null, consumed_at: null },
      { code: "APUSH-1314", consumed: 0, consumed_by: null, consumed_at: null },
    ]));
  }
  if (!localStorage.getItem(MOCK_USERS_KEY)) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([
      {
        id: "offline-admin-id",
        email: "admin@apush.com",
        displayName: "Admin (Offline Mode)",
        accountType: "admin",
        subscriptionStatus: "active",
        contentRegion: "overseas",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        progressCount: 0,
        mistakeCount: 0
      }
    ]));
  }
}

function handleMockRequest(path: string, options: RequestOptions = {}): any {
  initMockDb();
  const normalizedPath = path.split("?")[0];
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body as string) : {};

  // Get data from localStorage
  const getUsers = () => JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  const saveUsers = (users: any) => localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  
  const getProgress = () => JSON.parse(localStorage.getItem(MOCK_PROGRESS_KEY) || "[]");
  const saveProgress = (progress: any) => localStorage.setItem(MOCK_PROGRESS_KEY, JSON.stringify(progress));

  const getWrongQuestions = () => JSON.parse(localStorage.getItem(MOCK_WRONG_QUESTIONS_KEY) || "[]");
  const saveWrongQuestions = (questions: any) => localStorage.setItem(MOCK_WRONG_QUESTIONS_KEY, JSON.stringify(questions));

  const getCodes = () => JSON.parse(localStorage.getItem(MOCK_CODES_KEY) || "[]");
  const saveCodes = (codes: any) => localStorage.setItem(MOCK_CODES_KEY, JSON.stringify(codes));

  console.warn(`[API Client] Running in Local Offline Fallback Mode for path: ${normalizedPath} (${method})`);

  // 1. /auth/me
  if (normalizedPath === "/auth/me") {
    const token = options.token || localStorage.getItem("apush-auth-token");
    if (token === "offline-admin-token") {
      const admin = getUsers().find((u: any) => u.accountType === "admin") || {
        id: "offline-admin-id",
        email: "admin@apush.com",
        displayName: "Admin (Offline Mode)",
        accountType: "admin",
        subscriptionStatus: "active",
        contentRegion: "overseas",
      };
      return { user: admin, progress: getProgress() };
    }
    if (token && token.startsWith("offline-token-")) {
      const email = token.replace("offline-token-", "");
      const user = getUsers().find((u: any) => u.email === email) || {
        id: `offline-user-${email.split("@")[0]}`,
        email,
        displayName: email.split("@")[0],
        accountType: "registered",
        subscriptionStatus: "free",
        contentRegion: "overseas",
      };
      return { user, progress: getProgress() };
    }
    if (token === "offline-promo-token") {
      const user = getUsers().find((u: any) => u.subscriptionStatus === "active") || {
        id: "offline-promo-id",
        email: "apush101",
        displayName: "APUSH101",
        accountType: "registered",
        subscriptionStatus: "active",
        contentRegion: "overseas",
      };
      return { user, progress: getProgress() };
    }
    // Default fallback to guest
    return {
      user: {
        id: "offline-guest-id",
        email: null,
        displayName: "Guest User (Offline Mode)",
        accountType: "guest",
        subscriptionStatus: "free",
        contentRegion: "overseas",
      },
      progress: getProgress(),
    };
  }

  // 2. /auth/email/verify
  if (normalizedPath === "/auth/email/verify") {
    const { email, code } = body;
    const normalizedEmail = (email || "").trim().toLowerCase();
    const isOfflineAdmin = (normalizedEmail === "admin" || normalizedEmail === "admin@apush.com") && code === "111111";
    const isPromo = /^apush\d+$/.test(normalizedEmail) && code === "123456";

    if (isOfflineAdmin) {
      let users = getUsers();
      let admin = users.find((u: any) => u.email === "admin@apush.com");
      if (!admin) {
        admin = {
          id: "offline-admin-id",
          email: "admin@apush.com",
          displayName: "Admin (Offline Mode)",
          accountType: "admin",
          subscriptionStatus: "active",
          contentRegion: "overseas",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progressCount: 0,
          mistakeCount: 0,
        };
        users.push(admin);
        saveUsers(users);
      } else {
        admin.lastLoginAt = new Date().toISOString();
        saveUsers(users);
      }
      return { token: "offline-admin-token", user: admin };
    } else if (isPromo) {
      let users = getUsers();
      let promoUser = users.find((u: any) => u.email === normalizedEmail);
      if (!promoUser) {
        promoUser = {
          id: `offline-promo-${normalizedEmail}`,
          email: normalizedEmail,
          displayName: normalizedEmail.toUpperCase(),
          accountType: "registered",
          subscriptionStatus: "active",
          contentRegion: "overseas",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progressCount: 0,
          mistakeCount: 0,
        };
        users.push(promoUser);
        saveUsers(users);
      }
      return { token: "offline-promo-token", user: promoUser };
    } else {
      // Normal email login fallback in mock mode
      let users = getUsers();
      let normalUser = users.find((u: any) => u.email === normalizedEmail);
      if (!normalUser) {
        normalUser = {
          id: `offline-user-${normalizedEmail.split("@")[0]}`,
          email: normalizedEmail,
          displayName: normalizedEmail.split("@")[0],
          accountType: "registered",
          subscriptionStatus: "free",
          contentRegion: "overseas",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          progressCount: 0,
          mistakeCount: 0,
        };
        users.push(normalUser);
        saveUsers(users);
      }
      return { token: `offline-token-${normalizedEmail}`, user: normalUser };
    }
  }

  // 3. /auth/email/request-code
  if (normalizedPath === "/auth/email/request-code") {
    return { success: true, expiresAt: new Date(Date.now() + 600000).toISOString() };
  }

  // 4. /auth/guest
  if (normalizedPath === "/auth/guest") {
    return {
      token: "offline-guest-token",
      user: {
        id: "offline-guest-id",
        email: null,
        displayName: "Guest User (Offline)",
        accountType: "guest",
        subscriptionStatus: "free",
        contentRegion: "overseas",
      },
    };
  }

  // 5. /progress
  if (normalizedPath === "/progress") {
    if (method === "GET") {
      return { progress: getProgress() };
    }
    if (method === "POST") {
      const { topicId, stepId, completed } = body;
      let progress = getProgress();
      if (completed) {
        if (!progress.some((p: any) => p.topicId === topicId && p.stepId === stepId)) {
          progress.push({ topicId, stepId, updated_at: new Date().toISOString() });
        }
      } else {
        progress = progress.filter((p: any) => !(p.topicId === topicId && p.stepId === stepId));
      }
      saveProgress(progress);
      
      // Update progressCount for current user
      const token = options.token || localStorage.getItem("apush-auth-token");
      let users = getUsers();
      let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
      if (currentUser) {
        currentUser.progressCount = progress.length;
        saveUsers(users);
      }

      return { success: true, progress };
    }
  }

  // 6. /wrong-questions
  if (normalizedPath === "/wrong-questions") {
    if (method === "GET") {
      const items = getWrongQuestions();
      // Calculate topicStats
      const topicMap = new Map();
      items.forEach((item: any) => {
        const existing = topicMap.get(item.topicId) || {
          topicId: item.topicId,
          topicName: item.topicName,
          unitName: item.unitName,
          count: 0,
          latestIncorrectAt: item.lastIncorrectAt,
        };
        existing.count += 1;
        if (item.lastIncorrectAt && item.lastIncorrectAt > (existing.latestIncorrectAt || "")) {
          existing.latestIncorrectAt = item.lastIncorrectAt;
        }
        topicMap.set(item.topicId, existing);
      });
      const topicStats = Array.from(topicMap.values());
      return { items, topicStats, total: items.length };
    }
    if (method === "POST") {
      const { questionId, topicId, topicName, unitId, unitName, question } = body;
      let questions = getWrongQuestions();
      const existingIdx = questions.findIndex((q: any) => q.questionId === questionId);
      const now = new Date().toISOString();
      if (existingIdx > -1) {
        questions[existingIdx].incorrectCount += 1;
        questions[existingIdx].lastIncorrectAt = now;
      } else {
        questions.push({
          id: Date.now(),
          questionId,
          topicId,
          topicName,
          unitId,
          unitName,
          questionData: question,
          incorrectCount: 1,
          lastIncorrectAt: now,
          resolved: 0,
        });
      }
      saveWrongQuestions(questions);
      
      // Update mistakeCount for current user
      const token = options.token || localStorage.getItem("apush-auth-token");
      let users = getUsers();
      let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
      if (currentUser) {
        currentUser.mistakeCount = questions.length;
        saveUsers(users);
      }

      return { record: questions.find((q: any) => q.questionId === questionId) };
    }
  }

  // 7. /wrong-questions/resolve
  if (normalizedPath === "/wrong-questions/resolve") {
    const { questionId } = body;
    let questions = getWrongQuestions();
    questions = questions.filter((q: any) => q.questionId !== questionId);
    saveWrongQuestions(questions);
    
    // Update mistakeCount
    const token = options.token || localStorage.getItem("apush-auth-token");
    let users = getUsers();
    let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
    if (currentUser) {
      currentUser.mistakeCount = questions.length;
      saveUsers(users);
    }
    return { success: true };
  }

  // 8. /account/preferences
  if (normalizedPath === "/account/preferences") {
    const { contentRegion } = body;
    const token = options.token || localStorage.getItem("apush-auth-token");
    let users = getUsers();
    let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
    if (currentUser) {
      currentUser.contentRegion = contentRegion;
      saveUsers(users);
      return { user: currentUser };
    }
    return {
      user: {
        id: "offline-guest-id",
        email: null,
        displayName: "Guest User",
        accountType: "guest",
        subscriptionStatus: "free",
        contentRegion: contentRegion,
      }
    };
  }

  // 9. /billing/upgrade-request
  if (normalizedPath === "/billing/upgrade-request") {
    const token = options.token || localStorage.getItem("apush-auth-token");
    let users = getUsers();
    let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
    if (currentUser) {
      currentUser.subscriptionStatus = "pending";
      saveUsers(users);
      return { user: currentUser, message: "Upgrade request recorded." };
    }
    return { user: {}, message: "Upgrade request recorded." };
  }

  // 10. /billing/activate
  if (normalizedPath === "/billing/activate") {
    const { code } = body;
    let codes = getCodes();
    const targetCode = codes.find((c: any) => c.code === code.trim().toUpperCase());
    if (!targetCode) {
      throw new Error("无效的激活码，请检查拼写");
    }
    if (targetCode.consumed === 1) {
      throw new Error("该激活码已被使用");
    }
    targetCode.consumed = 1;
    targetCode.consumed_by = "offline-user";
    targetCode.consumed_at = new Date().toISOString();
    saveCodes(codes);

    const token = options.token || localStorage.getItem("apush-auth-token");
    let users = getUsers();
    let currentUser = users.find((u: any) => token && (token === "offline-admin-token" ? u.accountType === "admin" : token.includes(u.email)));
    if (currentUser) {
      currentUser.subscriptionStatus = "active";
      saveUsers(users);
      return { success: true, user: currentUser, message: "账号激活成功！" };
    }
    return { success: true, user: {}, message: "账号激活成功！" };
  }

  // 11. /api/admin/stats
  if (normalizedPath === "/api/admin/stats") {
    const users = getUsers();
    const codes = getCodes();
    return {
      totalUsers: users.length,
      activePremium: users.filter((u: any) => u.subscriptionStatus === "active").length,
      pendingRequests: users.filter((u: any) => u.subscriptionStatus === "pending").length,
      totalCodes: codes.length,
      unusedCodes: codes.filter((c: any) => c.consumed === 0).length,
    };
  }

  // 12. /api/admin/users
  if (normalizedPath === "/api/admin/users") {
    return { users: getUsers() };
  }

  // 13. /api/admin/codes
  if (normalizedPath === "/api/admin/codes") {
    if (method === "GET") {
      return { codes: getCodes() };
    }
    if (method === "POST") {
      const { code, count, prefix } = body;
      let codes = getCodes();
      if (code) {
        codes.push({ code: code.toUpperCase(), consumed: 0, consumed_by: null, consumed_at: null });
      } else {
        const c = count || 5;
        const p = prefix || "APUSH-";
        for (let i = 0; i < c; i++) {
          const randomCode = p + Math.random().toString(36).substring(2, 8).toUpperCase();
          codes.push({ code: randomCode, consumed: 0, consumed_by: null, consumed_at: null });
        }
      }
      saveCodes(codes);
      return { success: true };
    }
  }

  // 14. /api/admin/users/:userId/subscription (PATCH)
  if (normalizedPath.startsWith("/api/admin/users/") && normalizedPath.endsWith("/subscription")) {
    const parts = normalizedPath.split("/");
    const userId = parts[parts.length - 2];
    const { subscriptionStatus, accountType } = body;
    let users = getUsers();
    const user = users.find((u: any) => u.id === userId);
    if (user) {
      user.subscriptionStatus = subscriptionStatus;
      if (accountType) user.accountType = accountType;
      saveUsers(users);
      return { user };
    }
    throw new Error("User not found");
  }

  // 15. /api/admin/users/:userId (DELETE)
  if (normalizedPath.startsWith("/api/admin/users/") && method === "DELETE") {
    const parts = normalizedPath.split("/");
    const userId = parts[parts.length - 1];
    let users = getUsers();
    users = users.filter((u: any) => u.id !== userId);
    saveUsers(users);
    return { success: true };
  }

  // 16. /api/admin/codes/:code (DELETE)
  if (normalizedPath.startsWith("/api/admin/codes/") && method === "DELETE") {
    const parts = normalizedPath.split("/");
    const code = parts[parts.length - 1];
    let codes = getCodes();
    codes = codes.filter((c: any) => c.code !== code);
    saveCodes(codes);
    return { success: true };
  }

  // 17. /api/admin/generate-promo-accounts (POST)
  if (normalizedPath === "/api/admin/generate-promo-accounts") {
    const { count, prefix } = body;
    const c = count || 5;
    const p = prefix || "apush";
    let users = getUsers();
    const newAccounts: string[] = [];
    for (let i = 0; i < c; i++) {
      const accName = p + Math.floor(100 + Math.random() * 900);
      newAccounts.push(accName);
      users.push({
        id: `offline-promo-${accName}`,
        email: accName,
        displayName: accName.toUpperCase(),
        accountType: "registered",
        subscriptionStatus: "active",
        contentRegion: "overseas",
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
        progressCount: 0,
        mistakeCount: 0,
      });
    }
    saveUsers(users);
    return { success: true, accounts: newAccounts };
  }

  throw new Error(`Mock not implemented for path: ${normalizedPath}`);
}

export async function apiRequest<T>(
  path: string,
  { token, headers, ...rest }: RequestOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const finalHeaders = new Headers(headers || {});

  if (!finalHeaders.has("Content-Type") && rest.body) {
    finalHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const error = new Error(data?.error || "Request failed");
      (error as Error & { status?: number; details?: unknown }).status =
        response.status;
      (error as Error & { status?: number; details?: unknown }).details = data;
      throw error;
    }

    return data as T;
  } catch (err: any) {
    // Check if it's a network connection failure to our backend
    const isNetworkError = err instanceof TypeError || err.message === "Failed to fetch" || err.message.includes("NetworkError");
    const isBackendUrl = url.startsWith(API_BASE_URL);

    if (isNetworkError && isBackendUrl) {
      try {
        const mockResult = handleMockRequest(path, { token, headers, ...rest });
        return mockResult as T;
      } catch (mockErr: any) {
        throw mockErr;
      }
    }
    throw err;
  }
}

export { API_BASE_URL };
