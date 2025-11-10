export interface TopicQuestionOption {
  id: string;
  text: string;
}

export interface TopicQuestion {
  id: string;
  prompt: string;
  stimulus?: string;
  stimulusTable?: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
  options: TopicQuestionOption[];
  correctOptionId: string;
  explanation: string;
  source?: string;
}

export type TopicQuestionBank = Record<string, TopicQuestion[]>;
