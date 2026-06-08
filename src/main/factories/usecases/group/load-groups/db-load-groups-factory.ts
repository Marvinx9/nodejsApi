import { DbLoadGroups } from '../../../../../data/usecases/group/load-groups/db-load-groups';
import { LoadGroups } from '../../../../../domain/usecases/group/load-groups';
import { GroupMongoRepository } from '../../../../../infra/db/mongodb/group/group-mongo-repository';

export const makeDbLoadGroups = (): LoadGroups => {
  const groupMongoRepository = new GroupMongoRepository();
  return new DbLoadGroups(groupMongoRepository);
};
