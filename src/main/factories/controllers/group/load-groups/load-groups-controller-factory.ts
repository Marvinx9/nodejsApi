import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';
import { LoadGroupsController } from '../../../../../presentation/controllers/group/load-groups/load-groups-controller';
import { makeDbLoadGroups } from '../../../usecases/group/load-groups/db-load-groups-factory';

export const makeLoadGroupsController = (): Controller => {
  const controller = new LoadGroupsController(makeDbLoadGroups());
  return makeLogControllerDecorator(controller);
};
