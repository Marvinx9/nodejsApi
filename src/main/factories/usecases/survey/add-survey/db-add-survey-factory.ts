import { AddSurvey } from '../../../../../domain/usecases/survey/add-survey';
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository';
import { GroupMongoRepository } from '../../../../../infra/db/mongodb/group/group-mongo-repository';
import { DbAddSurvey } from '../../../../../data/usecases/survey/add-survey/db-add-survey';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  const groupMongoRepository = new GroupMongoRepository();
  return new DbAddSurvey(surveyMongoRepository, groupMongoRepository);
};
