import MockDate from 'mockdate';
import { AddGroupParams, AddGroupRepository } from './db-add-group-protocols';
import { DbAddGroup } from './db-add-group';
import { GroupModel } from '../../../../domain/models/group';
import { LoadGroupByNameRepository } from '../../../protocols/db/group/load-group-by-name-repository';

/* eslint-disable @typescript-eslint/no-unused-vars */

const makeFakeGroupData = (): AddGroupParams => ({
  name: 'any_group',
  image: 'https://any_image_url',
  date: new Date(),
});

const makeFakeGroup = (): GroupModel => ({
  id: 'valid_id',
  name: 'valid_name',
  image: 'valid_url',
  date: new Date(),
});

const makeAddGroupRepository = (): AddGroupRepository => {
  class AddGroupRepositoryStub implements AddGroupRepository {
    async add(surveyData: AddGroupParams): Promise<GroupModel> {
      return new Promise((resolve) => resolve(makeFakeGroup()));
    }
  }
  return new AddGroupRepositoryStub();
};

const makeLoadGroupByNameRepository = (): LoadGroupByNameRepository => {
  class LoadGroupByNameRepositoryStub implements LoadGroupByNameRepository {
    async loadByName(name: string): Promise<GroupModel | null> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new LoadGroupByNameRepositoryStub();
};

type SutType = {
  loadGroupByNameRepositoryStub: LoadGroupByNameRepository;
  addGroupRepositoryStub: AddGroupRepository;
  sut: DbAddGroup;
};

const makeSut = (): SutType => {
  const loadGroupByNameRepositoryStub = makeLoadGroupByNameRepository();
  const addGroupRepositoryStub = makeAddGroupRepository();
  const sut = new DbAddGroup(
    loadGroupByNameRepositoryStub,
    addGroupRepositoryStub,
  );
  return { sut, loadGroupByNameRepositoryStub, addGroupRepositoryStub };
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
