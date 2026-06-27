import { GroupModel } from '../../models/group';

export interface LoadGroupById {
  loadById(id: string): Promise<GroupModel | null>;
}
