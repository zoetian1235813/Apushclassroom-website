import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "../utils/apiClient";
import { useAuth } from "./authContext";

interface LessonProgressContextValue {
  isStepCompleted: (stepId: string) => boolean;
  toggleStep: (stepId: string) => void;
  markStep: (stepId: string, completed: boolean) => void;
  completedSteps: Record<string, boolean>;
}

const storageKey = "apush-lesson-progress";

const LessonProgressContext = createContext<LessonProgressContextValue | null>(
  null
);

export const LessonProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    token,
    remoteProgress,
    setRemoteProgress,
    refreshProfile,
  } = useAuth();

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    () => {
      // 在初始化时读取 localStorage，确保刷新后进度仍然存在
      if (typeof window === "undefined") {
        return {};
      }
      try {
        const saved = window.localStorage.getItem(storageKey);
        return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
      } catch (error) {
        console.warn("[LessonProgress] Failed to parse saved progress", error);
        return {};
      }
    }
  );

  const remoteCompletedMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    remoteProgress.forEach((entry) => {
      if (entry.stepId) {
        map[entry.stepId] = true;
      }
    });
    return map;
  }, [remoteProgress]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    } catch (error) {
      console.warn("[LessonProgress] Failed to persist progress", error);
    }
  }, [completedSteps]);

  const isStepCompleted = useCallback(
    (stepId: string) =>
      Boolean(remoteCompletedMap[stepId] || completedSteps[stepId]),
    [completedSteps, remoteCompletedMap]
  );

  const syncRemoteStep = useCallback(
    async (stepId: string, completed: boolean) => {
      if (!token) {
        return;
      }
      const topicId = stepId.split("-step")[0];
      try {
        const data = await apiRequest<{ progress: { topicId: string; stepId: string }[] }>(
          "/progress",
          {
            method: "POST",
            token,
            body: JSON.stringify({ topicId, stepId, completed }),
          }
        );
        setRemoteProgress(data.progress ?? []);
      } catch (error) {
        console.error("[LessonProgress] Failed to sync progress", error);
        refreshProfile().catch(() => {
          // ignore further errors
        });
      }
    },
    [token, setRemoteProgress, refreshProfile]
  );

  const markStep = useCallback(
    (stepId: string, completed: boolean) => {
      if (isAuthenticated && token) {
        setRemoteProgress((prev) => {
          if (completed) {
            if (prev.some((entry) => entry.stepId === stepId)) {
              return prev;
            }
            const topicId = stepId.split("-step")[0];
            return [...prev, { topicId, stepId }];
          }
          return prev.filter((entry) => entry.stepId !== stepId);
        });
        void syncRemoteStep(stepId, completed);
        return;
      }

      setCompletedSteps((prev) => {
        const next = { ...prev };
        if (completed) {
          next[stepId] = true;
        } else {
          delete next[stepId];
        }
        return next;
      });
    },
    [isAuthenticated, token, setRemoteProgress, syncRemoteStep]
  );

  const toggleStep = useCallback(
    (stepId: string) => {
      const shouldComplete = !isStepCompleted(stepId);
      markStep(stepId, shouldComplete);
    },
    [isStepCompleted, markStep]
  );

  const combinedSteps = useMemo(
    () => ({
      ...completedSteps,
      ...remoteCompletedMap,
    }),
    [completedSteps, remoteCompletedMap]
  );

  const value = useMemo(
    () => ({
      isStepCompleted,
      toggleStep,
      markStep,
      completedSteps: combinedSteps,
    }),
    [combinedSteps, isStepCompleted, toggleStep, markStep]
  );

  return (
    <LessonProgressContext.Provider value={value}>
      {children}
    </LessonProgressContext.Provider>
  );
};

export const useLessonProgress = (): LessonProgressContextValue => {
  const context = useContext(LessonProgressContext);
  if (!context) {
    throw new Error(
      "useLessonProgress must be used within a LessonProgressProvider"
    );
  }
  return context;
};
