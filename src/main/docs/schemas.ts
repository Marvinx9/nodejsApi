import {
  accountSchema,
  addSurveyParamsSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveyResultSchema,
  surveyResultAnswerSchema,
  errorSchema,
  addGroupParamsSchema,
} from './schemas/';

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signupParamsSchema,
  addGroupParams: addGroupParamsSchema,
  surveys: surveySchema,
  survey: surveyAnswerSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
  error: errorSchema,
};
