import { GroupModel } from '../../../../domain/models/group';
import { AddGroupParams } from '../../../../domain/usecases/group/add-group';

export interface AddGroupRepository {
  add(groupData: AddGroupParams): Promise<GroupModel>;
}
