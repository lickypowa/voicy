import { User } from 'src/database/entity/user.entity';
import {
  PG_DATA_SOURCE,
  USER_REPOSITORY,
} from 'src/database/shared/constants/database';
import { DataSource, Repository } from 'typeorm';

export const USER_FACADE_KEY = 'IUserFacade';
export const USER_SERVICE_KEY = 'IUserService';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<User> =>
      dataSource.getRepository(User),
    inject: [PG_DATA_SOURCE],
  },
];
