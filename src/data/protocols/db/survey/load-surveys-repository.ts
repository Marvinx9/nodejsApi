import { SurveyListItem } from '../../../../domain/usecases/survey/load-surveys';

export interface LoadSurveysRepository {
  loadAll(accountId: string, groupId?: string): Promise<SurveyListItem[]>;
}
