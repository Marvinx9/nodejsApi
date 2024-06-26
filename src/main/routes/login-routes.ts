import { Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeSignupController } from '../factories/signup/signup';
import { makeLoginController } from '../factories/login/login-factory';

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
