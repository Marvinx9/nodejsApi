import { AddGroupParams } from '../../../../domain/usecases/group/add-group';

export interface AddGroupRepository {
  add(groupData: AddGroupParams): Promise<void>;
}
