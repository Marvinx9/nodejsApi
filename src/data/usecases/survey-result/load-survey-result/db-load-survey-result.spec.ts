import { DbLoadSurveyResult } from './db-load-survey-result';
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols';
import { SurveyModel } from '../../survey/load-survey-by-id/db-load-survey-by-id-protocols';
import MockDate from 'mockdate';

import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
} from './db-load-survey-result-protocols';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
    },
  ],
  date: new Date(),
});

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
        image: 'any_image',
      },
    ],
    date: new Date(),
  };
};

const makeLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new LoadSurveyResultRepositoryStub();
};

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  );
  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  describe('DbLoadSurveyResult UseCase', () => {
    it('Should call LoadSurveyResultRepository', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut();
      const loadSurveyByIdSpy = jest.spyOn(
        loadSurveyResultRepositoryStub,
        'loadBySurveyId',
      );
      await sut.load('any_survey_id');
      expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id');
    });

    it('Should throw if SaveSurveyResultRepository throws', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut();
      jest
        .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error())),
        );
      const promise = sut.load('any_survey_id');
      await expect(promise).rejects.toThrow();
    });

    it('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
      const {
        sut,
        loadSurveyResultRepositoryStub,
        loadSurveyByIdRepositoryStub,
      } = makeSut();
      const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
      jest
        .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
      await sut.load('any_survey_id');
      expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
    });

    it('Should return SurveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut();
      jest
        .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
      const surveyResult = await sut.load('any_survey_id');
      expect(surveyResult).toEqual(makeFakeSurveyResult());
    });

    it('Should return SurveyResultModel on success', async () => {
      const { sut } = makeSut();
      const surveyResult = await sut.load('any_survey_id');
      expect(surveyResult).toEqual(makeFakeSurveyResult());
    });
  });
});
