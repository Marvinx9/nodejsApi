import { SurveyResultModel } from '../../models/survey-result';

export interface LoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<SurveyResultModel>;
}
