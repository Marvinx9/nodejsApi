import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddGroupController } from '../factories/controllers/group/add-group/add-group-controller-factory';
import { makeLoadGroupsController } from '../factories/controllers/group/load-groups/load-groups-controller-factory';
import { adminAuth } from '../middlewares/admin-auth';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.post('/group', adminAuth, adaptRoute(makeAddGroupController()));
  router.get('/group', auth, adaptRoute(makeLoadGroupsController()));
};
