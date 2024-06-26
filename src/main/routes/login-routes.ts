import { Router } from 'express';
import { makeSignupController } from '../factories/signup/signup';
import { adaptRoute } from '../adapters/express/express-route-adapter';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
};