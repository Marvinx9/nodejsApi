import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()));
};
