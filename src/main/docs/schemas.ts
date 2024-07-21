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
  surveyResultAnswer: surveyResultAnswerSchema,
  error: errorSchema,
};
