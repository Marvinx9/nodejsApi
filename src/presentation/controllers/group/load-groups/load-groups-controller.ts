import { noContent, ok, serverError } from '../../../helpers/http/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadGroups,
} from './load-groups-controller-protocols';

export class LoadGroupsController implements Controller {
  constructor(private readonly loadGroups: LoadGroups) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const name: string | undefined = httpRequest.query?.name;
      const groups = await this.loadGroups.load(name);
      return groups.length ? ok(groups) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
