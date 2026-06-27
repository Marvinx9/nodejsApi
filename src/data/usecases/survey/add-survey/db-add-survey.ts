import {
  AddSurvey,
  AddSurveyParams,
  AddSurveyRepository,
  LoadGroupByIdRepository,
} from './db-add-survey-protocols';

export class DbAddSurvey implements AddSurvey {
  constructor(
    private readonly addSurveyRepository: AddSurveyRepository,
    private readonly loadGroupByIdRepository: LoadGroupByIdRepository,
  ) {}

  async add(data: AddSurveyParams): Promise<boolean> {
    const group = await this.loadGroupByIdRepository.loadById(data.groupId);
    if (!group) return false;
    await this.addSurveyRepository.add(data);
    return true;
  }
}
