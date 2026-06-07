export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
  didAnswer?: boolean;
  groupId: string;
};

type SurveyAnswerModel = {
  answer: string;
  isCorrectAnswer?: boolean;
};
