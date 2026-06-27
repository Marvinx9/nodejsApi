import { GroupModel } from '../../../../domain/models/group';

export interface LoadGroupByIdRepository {
  loadById(id: string): Promise<GroupModel | null>;
}
