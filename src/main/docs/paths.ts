import { loginPath, signupPath, surveyPath, surveyResultPath } from './paths/';

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath,
};
