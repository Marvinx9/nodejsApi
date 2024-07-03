import { AddSurvey, AddSurveyModel } from '../../../domain/usecases/add-survey';

export class DbAddSurvey implements AddSurvey {
  async add(data: AddSurveyModel): Promise<void> {
    return null;
  }
}
