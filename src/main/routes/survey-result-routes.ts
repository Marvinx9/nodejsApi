import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory';
import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { auth } from '../middlewares/auth';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController()),
  );
};
