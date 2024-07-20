import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveyResultSchema,
} from './schemas/';

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signupParamsSchema,
  surveys: surveySchema,
  survey: surveyAnswerSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParam: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  error: errorSchema,
};
