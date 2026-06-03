import { GroupModel } from '../../../../domain/models/group';

export interface LoadGroupByNameRepository {
  loadByName(name: string): Promise<GroupModel | null>;
}
