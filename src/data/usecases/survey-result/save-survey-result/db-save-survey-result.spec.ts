import { DbSaveSurveyResult } from './db-save-survey-result';
import {
  SaveSurveyResultParams,
  SurveyResultModel,
  SaveSurveyResultRepository,
} from './db-save-survey-result-protocols';
import MockDate from 'mockdate';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeSurveyResultData = (): SaveSurveyResultParams => ({
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
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
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
    const surveyResultData = makeFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  it('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.save(makeFakeSurveyResult());
    await expect(promise).rejects.toThrow();
  });

  it('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(makeFakeSurveyResultData());
    expect(surveyResult).toEqual(makeFakeSurveyResult());
  });
});
