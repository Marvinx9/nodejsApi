import { AddGroupController } from '../../../../../presentation/controllers/group/add-group/add-group-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';
import { makeDbAddGroup } from '../../../usecases/group/add-group/db-add-group-factory';
import { makeAddGroupValidation } from './add-group-validation-factory';

export const makeAddGroupController = (): Controller => {
  const controller = new AddGroupController(
    makeAddGroupValidation(),
    makeDbAddGroup(),
  );
  return makeLogControllerDecorator(controller);
};
