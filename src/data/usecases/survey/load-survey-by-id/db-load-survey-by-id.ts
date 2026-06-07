import {
  SurveyModel,
  LoadSurveyById,
  LoadSurveyByIdRepository,
} from './db-load-survey-by-id-protocols';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async loadById(id: string): Promise<
    | (Omit<SurveyModel, 'answers'> & {
        answers: Array<Omit<SurveyModel['answers'][0], 'isCorrectAnswer'>>;
      })
    | null
  > {
    const survey = this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
