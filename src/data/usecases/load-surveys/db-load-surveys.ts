import {
  SurveyModel,
  LoadSurveys,
  LoadSurveysRepository,
} from './db-load-surveys-protocols';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(): Promise<SurveyModel[] | null> {
    const surveys = this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
