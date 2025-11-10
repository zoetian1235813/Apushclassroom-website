import type { Dispatch, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "../utils/apiClient";

export interface AuthenticatedUser {
  id: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  lastLoginAt?: string | null;
  wechatOpenId?: string | null;
}

export interface ProgressEntry {
  topicId: string;
  stepId: string;
}

interface AuthContextValue {
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  remoteProgress: ProgressEntry[];
  sendEmailCode: (email: string) => Promise<void>;
  verifyEmailCode: (email: string, code: string) => Promise<void>;
  startWeChatLogin: () => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  setRemoteProgress: Dispatch<SetStateAction<ProgressEntry[]>>;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_TOKEN_KEY = "apush-auth-token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [remoteProgress, setRemoteProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false);

  const applyToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setRemoteProgress([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await apiRequest<{
        user: AuthenticatedUser;
        progress: ProgressEntry[];
      }>("/auth/me", { token });
      setUser(data.user);
      setRemoteProgress(data.progress ?? []);
    } catch (error) {
      console.error("[Auth] Failed to refresh profile:", error);
      applyToken(null);
      setUser(null);
      setRemoteProgress([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, applyToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pendingToken = params.get("authToken");
    if (pendingToken) {
      applyToken(pendingToken);
      params.delete("authToken");
      params.delete("provider");
      const newQuery = params.toString();
      const nextUrl = `${window.location.pathname}${
        newQuery ? `?${newQuery}` : ""
      }${window.location.hash}`;
      window.history.replaceState({}, "", nextUrl);
    } else {
      const existingToken = localStorage.getItem(AUTH_TOKEN_KEY);
      if (existingToken) {
        setTokenState(existingToken);
      }
    }
    setBootstrapped(true);
  }, [applyToken]);

  useEffect(() => {
    if (!bootstrapped) {
      return;
    }
    if (!token) {
      setUser(null);
      setRemoteProgress([]);
      setIsLoading(false);
      return;
    }
    refreshProfile();
  }, [bootstrapped, token, refreshProfile]);

  const sendEmailCode = useCallback(async (email: string) => {
    await apiRequest("/auth/email/request-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }, []);

  const verifyEmailCode = useCallback(
    async (email: string, code: string) => {
      const data = await apiRequest<{ token: string; user: AuthenticatedUser }>(
        "/auth/email/verify",
        {
          method: "POST",
          body: JSON.stringify({ email, code }),
        }
      );
      applyToken(data.token);
      setUser(data.user);
      setRemoteProgress([]);
    },
    [applyToken]
  );

  const startWeChatLogin = useCallback(async () => {
    const redirectTarget = `${window.location.origin}${window.location.pathname}`;
    const search = window.location.search ? window.location.search : "";
    const hash = window.location.hash ? window.location.hash : "";
    const finalRedirect = `${redirectTarget}${search}${hash}`;

    const data = await apiRequest<{
      url: string;
    }>(
      `/auth/wechat/url?redirectUri=${encodeURIComponent(finalRedirect)}`
    );

    if (!data?.url) {
      throw new Error("WeChat login is not available at the moment.");
    }

    window.location.href = data.url;
  }, []);

  const logout = useCallback(() => {
    applyToken(null);
    setUser(null);
    setRemoteProgress([]);
  }, [applyToken]);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      remoteProgress,
      sendEmailCode,
      verifyEmailCode,
      startWeChatLogin,
      logout,
      refreshProfile,
      setRemoteProgress,
      setToken: applyToken,
    }),
    [
      user,
      token,
      isLoading,
      remoteProgress,
      sendEmailCode,
      verifyEmailCode,
      startWeChatLogin,
      logout,
      refreshProfile,
      applyToken,
      setRemoteProgress,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
