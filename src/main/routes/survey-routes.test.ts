import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { AddSurveyModel } from '../../domain/usecases/add-survey';

let surveyCollection: Collection;

const makeSurveyData = (): AddSurveyModel => ({
  question: 'question',
  answers: [
    {
      image: 'http://image-name.com',
      answer: 'answer 1',
    },
    {
      answer: 'answer 2',
    },
  ],
});

describe('Survey Routes', () => {
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

  describe('Post /surveys', () => {
    it('Should return 204 on add survey success', async () => {
      const surveyData = makeSurveyData();
      await request(app).post('/api/surveys').send(surveyData).expect(204);
    });
  });
});
