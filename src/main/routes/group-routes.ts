import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddGroupController } from '../factories/controllers/group/add-group/add-group-controller-factory';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/group', auth, adaptRoute(makeAddGroupController()));
};
