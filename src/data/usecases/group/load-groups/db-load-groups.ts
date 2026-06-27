import {
  GroupListItem,
  LoadGroups,
  LoadGroupsRepository,
} from './db-load-groups-protocols';

export class DbLoadGroups implements LoadGroups {
  constructor(private readonly loadGroupsRepository: LoadGroupsRepository) {}

  async load(name?: string): Promise<GroupListItem[]> {
    return this.loadGroupsRepository.loadAll(name);
  }
}
