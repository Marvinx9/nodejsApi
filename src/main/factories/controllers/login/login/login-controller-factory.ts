import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLoginValidation } from './login-validation-factory';
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeLoginValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
