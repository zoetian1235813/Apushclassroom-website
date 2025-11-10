import { apiRequest } from "./apiClient";
import {
  WrongQuestionListResponse,
  WrongQuestionRecord,
} from "../types/wrongQuestions";
import { TopicQuestion } from "../types/questions";

interface LogWrongQuestionPayload {
  questionId: string;
  topicId: string;
  topicName?: string;
  unitId?: number;
  unitName?: string;
  question: TopicQuestion;
}

export async function fetchWrongQuestions(token: string) {
  return apiRequest<WrongQuestionListResponse>("/wrong-questions", { token });
}

export async function logWrongQuestion(payload: LogWrongQuestionPayload, token: string) {
  return apiRequest<{ record: WrongQuestionRecord }>("/wrong-questions", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export async function resolveWrongQuestion(questionId: string, token: string) {
  return apiRequest<{ success: boolean }>("/wrong-questions/resolve", {
    method: "POST",
    token,
    body: JSON.stringify({ questionId }),
  });
}
