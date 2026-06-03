import {
  loginPath,
  signupPath,
  groupPath,
  surveyPath,
  surveyResultPath,
} from './paths/';

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/group': groupPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath,
};
