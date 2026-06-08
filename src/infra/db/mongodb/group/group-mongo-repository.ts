import { AddGroupRepository } from '../../../../data/protocols/db/group/add-group-repository';
import { LoadGroupByIdRepository } from '../../../../data/protocols/db/group/load-group-by-id-repository';
import { LoadGroupByNameRepository } from '../../../../data/protocols/db/group/load-group-by-name-repository';
import { LoadGroupsRepository } from '../../../../data/protocols/db/group/load-groups-repository';
import { GroupModel } from '../../../../domain/models/group';
import { AddGroupParams } from '../../../../domain/usecases/group/add-group';
import { GroupListItem } from '../../../../domain/usecases/group/load-groups';
import { MongoHelper } from '../helpers';
import { ObjectId } from 'mongodb';

export class GroupMongoRepository
  implements
    AddGroupRepository,
    LoadGroupByNameRepository,
    LoadGroupByIdRepository,
    LoadGroupsRepository
{
  async add(groupData: AddGroupParams): Promise<GroupModel> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const result = await groupCollection.insertOne(groupData);
    return MongoHelper.map(result.ops[0]);
  }

  async loadByName(name: string): Promise<GroupModel | null> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const group = await groupCollection.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });
    return group && MongoHelper.map(group);
  }

  async loadById(id: string): Promise<GroupModel | null> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const group = await groupCollection.findOne({ _id: new ObjectId(id) });
    return group && MongoHelper.map(group);
  }

  async loadAll(name?: string): Promise<GroupListItem[]> {
    const groupCollection = await MongoHelper.getCollection('groups');
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const groups: (Omit<GroupModel, 'id'> & { _id: string })[] =
      await groupCollection.find(filter).toArray();
    if (!groups.length) return [];

    const groupIds = groups.map((g) => g._id.toString());
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveyCounts = await surveyCollection
      .aggregate([
        { $match: { groupId: { $in: groupIds } } },
        { $group: { _id: '$groupId', count: { $sum: 1 } } },
      ])
      .toArray();

    const countMap = new Map<string, number>(
      surveyCounts.map((s: { _id: number; count: number }) => [s._id, s.count]),
    );

    return groups.map((group) => ({
      id: group._id.toString(),
      name: group.name,
      countSurveys: countMap.get(group._id.toString()) ?? 0,
    }));
  }
}
