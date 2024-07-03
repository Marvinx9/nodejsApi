import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';

let surveyCollection: Collection;

const makeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
    {
      answer: 'other_answer',
    },
  ],
});

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository();
  };

  it('Should add a survey on success', async () => {
    const sut = makeSut();
    const surveyData = makeSurveyData();
    await sut.add(surveyData);
    const survey = await surveyCollection.findOne({ question: 'any_question' });
    expect(survey).toBeTruthy();
  });
});
