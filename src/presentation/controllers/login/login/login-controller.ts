import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication,
  Validation,
} from './login-controller-protocols';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../../../helpers/http/http-helper';

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      if (!authenticationModel) {
        return unauthorized();
      }
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
