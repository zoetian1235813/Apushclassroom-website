import { TopicQuestionBank } from "../../types/questions";
import { unit1TopicQuestions } from "./unit1";
import { unit2TopicQuestions } from "./unit2";
import { unit3TopicQuestions } from "./unit3";
import { unit4TopicQuestions } from "./unit4";
import { unit5TopicQuestions } from "./unit5";
import { unit6TopicQuestions } from "./unit6";
import { unit7TopicQuestions } from "./unit7";
import { unit8TopicQuestions } from "./unit8";
import { unit9TopicQuestions } from "./unit9";

export const topicQuestionBank: TopicQuestionBank = {
  ...unit1TopicQuestions,
  ...unit2TopicQuestions,
  ...unit3TopicQuestions,
  ...unit4TopicQuestions,
  ...unit5TopicQuestions,
  ...unit6TopicQuestions,
  ...unit7TopicQuestions,
  ...unit8TopicQuestions,
  ...unit9TopicQuestions,
};
