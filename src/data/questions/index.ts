import { TopicQuestionBank } from "../../types/questions";
import { unit2TopicQuestions } from "./unit2";
import { unit3TopicQuestions } from "./unit3";
import { unit4TopicQuestions } from "./unit4";

export const topicQuestionBank: TopicQuestionBank = {
  ...unit2TopicQuestions,
  ...unit3TopicQuestions,
  ...unit4TopicQuestions,
};
