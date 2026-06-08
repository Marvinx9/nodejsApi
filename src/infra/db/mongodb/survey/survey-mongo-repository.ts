import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository';
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/survey/load-survey-by-id-repository';
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository';
import { SurveyModel } from '../../../../domain/models/survey';
import { AddSurveyParams } from '../../../../domain/usecases/survey/add-survey';
import { SurveyListItem } from '../../../../domain/usecases/survey/load-surveys';
import { MongoHelper, QueryBuilder } from '../helpers';
import { ObjectId } from 'mongodb';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(
    accountId: string,
    groupId?: string,
  ): Promise<SurveyListItem[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const builder = new QueryBuilder();
    if (groupId) {
      builder.match({ groupId });
    }
    const query = builder
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        groupId: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<
    | (Omit<SurveyModel, 'answers'> & {
        answers: Array<Omit<SurveyModel['answers'][0], 'isCorrectAnswer'>>;
      })
    | null
  > {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return survey && MongoHelper.map(survey);
  }
}
