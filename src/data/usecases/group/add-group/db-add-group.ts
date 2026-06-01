import {
  AddGroup,
  AddGroupParams,
  AddGroupRepository,
} from './db-add-group-protocols';

export class DbAddGroup implements AddGroup {
  constructor(private readonly addGroupRepository: AddGroupRepository) {}

  async add(data: AddGroupParams): Promise<void> {
    await this.addGroupRepository.add(data);
  }
}
