export type FrqQuestionType = "SAQ" | "LEQ" | "DBQ";

export interface FrqRubricCriterion {
  id: string;
  row: string;
  title: string;
  maxPoints: number;
  description: string;
  earningNotes: string[];
  sampleEarns?: string[];
  sampleMisses?: string[];
}

export interface FrqRubric {
  generalNotes: string[];
  criteria: FrqRubricCriterion[];
}

export interface FrqGradeBreakdownItem {
  criterionId: string;
  title: string;
  awardedPoints: number;
  maxPoints: number;
  feedback: string;
}

export interface FrqGradeResponse {
  questionId: string;
  totalScore: number;
  maxScore: number;
  summary: string;
  suggestions: string[];
  breakdown: FrqGradeBreakdownItem[];
  rawModelResponse?: string;
}

export interface FrqQuestion {
  id: string;
  year: number;
  examSet: string;
  questionLabel: string;
  type: FrqQuestionType;
  prompt: string;
  pointsPossible: number;
  timeFrame?: string;
  themes?: string[];
  tags?: string[];
  rubric: FrqRubric;
  source?: string;
}

export type FrqQuestionBank = FrqQuestion[];
