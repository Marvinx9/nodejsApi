import { InvalidParamError } from '../../../errors';
import { forbidden, ok, serverError } from '../../../helpers/http/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult,
} from './load-survey-result-controller-protocols';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyByIdStub: LoadSurveyById,
    private readonly loadSurveyResultStub: LoadSurveyResult,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyByIdStub.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      const surveyResult = await this.loadSurveyResultStub.load(
        surveyId,
        httpRequest.accountId,
      );
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
