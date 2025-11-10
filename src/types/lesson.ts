export interface Topic {
  id: string;
  title: string;
  isProgressCheck: boolean;
}

export interface Unit {
  id: number;
  title: string;
  period: string;
  color: string;
  topics: Topic[];
}

export interface LessonStep {
  id: string;
  label: string;
  type: "video" | "notes";
  description?: string;
  videoSrc?: string;
  durationLabel?: string;
  contentId?: string;
}
