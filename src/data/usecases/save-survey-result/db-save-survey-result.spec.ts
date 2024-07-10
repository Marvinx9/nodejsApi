import { DbSaveSurveyResult } from './db-save-survey-result';
import {
  SaveSurveyResultModel,
  SurveyResultModel,
  SaveSurveyResultRepository,
} from './db-save-survey-result-protocols';
import MockDate from 'mockdate';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel =>
  Object.assign({}, makeFakeSurveyResultData(), {
    id: 'any_id',
  });

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
type SutType = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
};

const makeSut = (): SutType => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return { sut, saveSurveyResultRepositoryStub };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResult = makeFakeSurveyResult();
    await sut.save(surveyResult);
    expect(saveSpy).toHaveBeenCalledWith(surveyResult);
  });

  // it('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositoryStub } = makeSut();
  //   jest
  //     .spyOn(addSurveyRepositoryStub, 'add')
  //     .mockReturnValueOnce(
  //       new Promise((resolve, reject) => reject(new Error())),
  //     );
  //   const promise = sut.add(makeFakeSurveyData());
  //   await expect(promise).rejects.toThrow();
  // });
});
