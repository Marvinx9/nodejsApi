import { Router } from 'express';
import { makeSignupController } from '../factories/signup';
import { adaptRoute } from '../adapters/express-route-adapter';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
};
