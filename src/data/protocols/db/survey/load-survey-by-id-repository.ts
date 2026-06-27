import { SurveyModel } from '../../../../domain/models/survey';

export interface LoadSurveyByIdRepository {
  loadById(id: string): Promise<
    | (Omit<SurveyModel, 'answers'> & {
        answers: Array<Omit<SurveyModel['answers'][0], 'isCorrectAnswer'>>;
      })
    | null
  >;
}
