import { apiRequest } from "./apiClient";
import { FrqGradeResponse } from "../types/frq";

interface GradeFrqAnswerParams {
  questionId: string;
  response: string;
}

export async function gradeFrqAnswer(params: GradeFrqAnswerParams) {
  return apiRequest<FrqGradeResponse>("/frq/grade", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
