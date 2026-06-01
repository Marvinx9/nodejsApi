import { AddGroupRepository } from '../../../../data/protocols/db/group/add-group-repository';
import { AddGroupParams } from '../../../../domain/usecases/group/add-group';
import { MongoHelper } from '../helpers';

export class GroupMongoRepository implements AddGroupRepository {
  async add(groupData: AddGroupParams): Promise<void> {
    const groupCollection = await MongoHelper.getCollection('group');
    await groupCollection.insertOne(groupData);
  }
}
