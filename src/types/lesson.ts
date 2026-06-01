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
  durationLabel?: string;
  videoSrc?: string;
  /** 可选：B站等外链 iframe 地址，优先渲染 */
  videoEmbedUrl?: string;
  /** 可选：跳转到平台观看的外链按钮 */
  videoLinkUrl?: string;
  videoSourceLabel?: string;
  videoChecks?: VideoKnowledgeCheck[];
  contentId?: string;
}

export interface VideoCheckChoice {
  id: string;
  text: string;
}

export interface VideoKnowledgeCheck {
  id: string;
  timestamp: number;
  question: string;
  choices: VideoCheckChoice[];
  correctChoiceId: string;
  explanation: string;
}
