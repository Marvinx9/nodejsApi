import {
  SurveyListItem,
  LoadSurveys,
  LoadSurveysRepository,
} from './db-load-surveys-protocols';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(
    accountId: string,
    groupId?: string,
  ): Promise<SurveyListItem[] | null> {
    const surveys = this.loadSurveysRepository.loadAll(accountId, groupId);
    return surveys;
  }
}
