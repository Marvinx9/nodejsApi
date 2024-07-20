import {
  SurveyResultModel,
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SaveSurveyResult,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const result = await this.saveSurveyResultRepository.save(data);
    return result;
  }
}