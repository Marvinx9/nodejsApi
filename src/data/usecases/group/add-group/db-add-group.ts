import { GroupModel } from '../../../../domain/models/group';
import { LoadGroupByNameRepository } from '../../../protocols/db/group/load-group-by-name-repository';
import {
  AddGroup,
  AddGroupParams,
  AddGroupRepository,
} from './db-add-group-protocols';

export class DbAddGroup implements AddGroup {
  constructor(
    private readonly loadGroupRepository: LoadGroupByNameRepository,
    private readonly addGroupRepository: AddGroupRepository,
  ) {}

  async add(data: AddGroupParams): Promise<GroupModel | null> {
    const exists = await this.loadGroupRepository.loadByName(data.name);
    if (!exists) {
      const newGroup = await this.addGroupRepository.add(data);
      return newGroup;
    }
    return null;
  }
}
