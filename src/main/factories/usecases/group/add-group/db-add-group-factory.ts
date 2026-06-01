import { DbAddGroup } from '../../../../../data/usecases/group/add-group/db-add-group';
import { AddGroup } from '../../../../../domain/usecases/group/add-group';
import { GroupMongoRepository } from '../../../../../infra/db/mongodb/group/group-mongo-repository';

export const makeDbAddGroup = (): AddGroup => {
  const groupMongoRepository = new GroupMongoRepository();
  return new DbAddGroup(groupMongoRepository);
};
