import { GroupListItem } from '../../../../domain/usecases/group/load-groups';

export interface LoadGroupsRepository {
  loadAll(name?: string): Promise<GroupListItem[]>;
}
