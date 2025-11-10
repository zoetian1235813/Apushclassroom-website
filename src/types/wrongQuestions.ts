import { TopicQuestion } from "./questions";

export interface WrongQuestionRecord {
  id: number;
  questionId: string;
  topicId: string;
  topicName?: string | null;
  unitId?: number | null;
  unitName?: string | null;
  incorrectCount: number;
  lastIncorrectAt?: string | null;
  questionData: TopicQuestion | null;
}

export interface WrongQuestionTopicStat {
  topicId: string;
  topicName?: string | null;
  unitName?: string | null;
  count: number;
  latestIncorrectAt?: string | null;
}

export interface WrongQuestionListResponse {
  items: WrongQuestionRecord[];
  topicStats: WrongQuestionTopicStat[];
  total: number;
}
