import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeSurveyData = () => ({
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
    accountCollection = await MongoHelper.getCollection('accounts');
    await surveyCollection.deleteMany({});
  });

  describe('Post /surveys', () => {
    it('Should return 403 on add survey without accessToken', async () => {
      const surveyData = makeSurveyData();
      await request(app).post('/api/surveys').send(surveyData).expect(403);
    });

    it('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Afranio',
        email: 'afraniodantas@gmail.com',
        password: '123',
        role: 'admin',
      });
      const id = res.ops[0]._id;
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            accessToken,
          },
        },
      );
      const surveyData = makeSurveyData();

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(surveyData)
        .expect(204);
    });
  });
});
