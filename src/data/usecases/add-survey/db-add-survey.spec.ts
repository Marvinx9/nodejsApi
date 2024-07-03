import { DbAddSurvey } from './db-add-survey';

describe('DbAddSurvey Usecase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    const sut = new DbAddSurvey();
    await sut.add({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
    });
  });
});
