import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Afranio',
    email: 'afraniodantas@gmail.com',
    password: '123',
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
  return accessToken;
};

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

  describe('Put /surveys/:surveyId/results', () => {
    it('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({ answer: 'any_answer' })
        .expect(403);
    });

    it('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken();

      const res = await surveyCollection.insertOne({
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
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'answer 1' })
        .expect(200);
    });
  });

  describe('Get /surveys/:surveyId/results', () => {
    it('Should return 403 on load survey result without accessToken', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });

    it('Should return 200 on load survey result with accessToken', async () => {
      const accessToken = await makeAccessToken();

      const res = await surveyCollection.insertOne({
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
        date: new Date(),
      });
      await request(app)
        .get(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
