import { SurveyModel } from '../../models/survey';

export type SurveyListItem = Omit<SurveyModel, 'answers'> & {
  answers: Array<Omit<SurveyModel['answers'][0], 'isCorrectAnswer'>>;
};

export interface LoadSurveys {
  load(accountId: string, groupId?: string): Promise<SurveyListItem[] | null>;
}
