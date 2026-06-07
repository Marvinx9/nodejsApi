import { DbAddSurvey } from './db-add-survey';
import {
  AddSurveyParams,
  AddSurveyRepository,
  LoadGroupByIdRepository,
} from './db-add-survey-protocols';
import { GroupModel } from '../../../../domain/models/group';
import MockDate from 'mockdate';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  groupId: 'any_group_id',
  answers: [
    {
      answer: 'any_answer',
      isCorrectAnswer: true,
    },
    {
      answer: 'other_answer',
      isCorrectAnswer: false,
    },
  ],
  date: new Date(),
});

const makeFakeGroup = (): GroupModel => ({
  id: 'any_group_id',
  name: 'any_name',
  image: 'any_image',
  date: new Date(),
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

const makeLoadGroupByIdRepository = (): LoadGroupByIdRepository => {
  class LoadGroupByIdRepositoryStub implements LoadGroupByIdRepository {
    async loadById(_id: string): Promise<GroupModel | null> {
      return new Promise((resolve) => resolve(makeFakeGroup()));
    }
  }
  return new LoadGroupByIdRepositoryStub();
};

type SutType = {
  addSurveyRepositoryStub: AddSurveyRepository;
  loadGroupByIdRepositoryStub: LoadGroupByIdRepository;
  sut: DbAddSurvey;
};

const makeSut = (): SutType => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const loadGroupByIdRepositoryStub = makeLoadGroupByIdRepository();
  const sut = new DbAddSurvey(
    addSurveyRepositoryStub,
    loadGroupByIdRepositoryStub,
  );
  return { sut, addSurveyRepositoryStub, loadGroupByIdRepositoryStub };
};

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadGroupByIdRepository with correct groupId', async () => {
    const { sut, loadGroupByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadGroupByIdRepositoryStub, 'loadById');
    await sut.add(makeFakeSurveyData());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_group_id');
  });

  it('Should return false if group does not exist', async () => {
    const { sut, loadGroupByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadGroupByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const result = await sut.add(makeFakeSurveyData());
    expect(result).toBe(false);
  });

  it('Should not call AddSurveyRepository if group does not exist', async () => {
    const { sut, addSurveyRepositoryStub, loadGroupByIdRepositoryStub } =
      makeSut();
    jest
      .spyOn(loadGroupByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(makeFakeSurveyData());
    expect(addSpy).not.toHaveBeenCalled();
  });

  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.add(makeFakeSurveyData());
    expect(result).toBe(true);
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
