import { GroupModel } from '../../models/group';

export type AddGroupParams = Omit<GroupModel, 'id'>;

export interface AddGroup {
  add(data: AddGroupParams): Promise<GroupModel | null>;
}
