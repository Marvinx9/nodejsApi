import { DbAddSurvey } from './db-add-survey';
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};
interface SutType {
  addSurveyRepositoryStub: AddSurveyRepository;
  sut: DbAddSurvey;
}
const makeSut = (): SutType => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return { sut, addSurveyRepositoryStub };
};

describe('DbAddSurvey Usecase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  it('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(makeFakeSurveyData());
    await expect(promise).rejects.toThrow();
  });
});