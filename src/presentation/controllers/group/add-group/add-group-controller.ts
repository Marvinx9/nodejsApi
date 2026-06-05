import { NameInUseError } from '../../../errors';
import {
  badRequest,
  forbidden,
  noContent,
  serverError,
} from '../../../helpers/http/http-helper';
import {
  AddGroup,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-group-controller-protocols';

export class AddGroupController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addGroup: AddGroup,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);

      const { name, image } = httpRequest.body;
      const group = await this.addGroup.add({ name, image, date: new Date() });
      if (!group) {
        return forbidden(new NameInUseError());
      }
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
