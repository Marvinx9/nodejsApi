import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddGroupController } from '../factories/controllers/group/add-group/add-group-controller-factory';
import { adminAuth } from '../middlewares/admin-auth';

export default (router: Router): void => {
  router.post('/group', adminAuth, adaptRoute(makeAddGroupController()));
};
