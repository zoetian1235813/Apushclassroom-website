export type DayType = "study" | "writing" | "unit-test" | "rest" | "mock-exam";
export type TaskType = "video" | "exercise" | "quiz" | "writing" | "test" | "review" | "fun-fact";
export interface CheckInTask {
  id: string; type: TaskType; title: string; description: string;
  estimatedMinutes: number; xpReward: number;
  isExternal?: boolean; externalUrl?: string; videoUrl?: string;
}
export interface DayPlan {
  date: string; dayType: DayType; unitId: number;
  unitTitle: string; topicTitle: string; topicSubtitle?: string;
  description: string; color: string; tasks: CheckInTask[];
}
export interface CheckInProgress {
  completedDates: Record<string, boolean>;
  completedTasks: Record<string, boolean>;
  streak: number; totalXp: number; lastCheckInDate: string | null;
}
export interface Achievement {
  id: string; title: string; description: string; icon: string; unlockedAt?: string;
}