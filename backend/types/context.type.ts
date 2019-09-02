import { DataSources } from '~/backend/services';
import { UserEntity } from '~/backend/schema/user/user.entity';

export interface Context {
  user: UserEntity;
  dataSources: DataSources;
}
