import {
  badRequest,
  unauthorized,
  serverError,
  notFound,
  forbidden,
} from './components';
import { loginPath, signupPath, surveyPath, surveyResultPath } from './paths';
import {
  accountSchema,
  addSurveyParamsSchema,
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signupParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveyResultSchema,
} from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API de enquetes',
    version: '1.0.0',
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
    {
      name: 'Enquete',
    },
  ],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath,
  },
  schemas: {
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
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    unauthorized,
    notFound,
    serverError,
    forbidden,
  },
};
