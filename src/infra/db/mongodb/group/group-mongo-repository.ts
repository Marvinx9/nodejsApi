import { AddGroupRepository } from '../../../../data/protocols/db/group/add-group-repository';
import { LoadGroupByNameRepository } from '../../../../data/protocols/db/group/load-group-by-name-repository';
import { GroupModel } from '../../../../domain/models/group';
import { AddGroupParams } from '../../../../domain/usecases/group/add-group';
import { MongoHelper } from '../helpers';

export class GroupMongoRepository
  implements AddGroupRepository, LoadGroupByNameRepository
{
  async add(groupData: AddGroupParams): Promise<GroupModel> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const result = await groupCollection.insertOne(groupData);
    return MongoHelper.map(result.ops[0]);
  }

  async loadByName(name: string): Promise<GroupModel | null> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const group = await groupCollection.findOne({ name });
    return group && MongoHelper.map(group);
  }
}
