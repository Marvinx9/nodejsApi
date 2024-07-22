import {
  SurveyModel,
  LoadSurveys,
  LoadSurveysRepository,
} from './db-load-surveys-protocols';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(accountId: string): Promise<SurveyModel[] | null> {
    const surveys = this.loadSurveysRepository.loadAll(accountId);
    return surveys;
  }
}
