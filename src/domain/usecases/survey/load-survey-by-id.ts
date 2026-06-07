import { SurveyModel } from '../../models/survey';

export interface LoadSurveyById {
  loadById(id: string): Promise<
    | (Omit<SurveyModel, 'answers'> & {
        answers: Array<Omit<SurveyModel['answers'][0], 'isCorrectAnswer'>>;
      })
    | null
  >;
}
