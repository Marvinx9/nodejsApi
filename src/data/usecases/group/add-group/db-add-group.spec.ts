import MockDate from 'mockdate';
import { AddGroupParams, AddGroupRepository } from './db-add-group-protocols';
import { DbAddGroup } from './db-add-group';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeGroupData = (): AddGroupParams => ({
  name: 'any_group',
  image: 'https://any_image_url',
  date: new Date(),
});

const makeAddGroupRepository = (): AddGroupRepository => {
  class AddGroupRepositoryStub implements AddGroupRepository {
    async add(surveyData: AddGroupParams): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddGroupRepositoryStub();
};

type SutType = {
  addGroupRepositoryStub: AddGroupRepository;
  sut: DbAddGroup;
};

const makeSut = (): SutType => {
  const addGroupRepositoryStub = makeAddGroupRepository();
  const sut = new DbAddGroup(addGroupRepositoryStub);
  return { sut, addGroupRepositoryStub };
};

describe('DBAddGroup Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call AddGroupRepository with correct values', async () => {
    const { sut, addGroupRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addGroupRepositoryStub, 'add');
    const groupData = makeFakeGroupData();
    await sut.add(groupData);
    expect(addSpy).toHaveBeenCalledWith(groupData);
  });

  it('Should thow if AddGroupRepository throws', async () => {
    const { sut, addGroupRepositoryStub } = makeSut();
    jest
      .spyOn(addGroupRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.add(makeFakeGroupData());
    await expect(promise).rejects.toThrow();
  });
});
