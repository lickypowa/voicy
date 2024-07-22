import { RefreshTokenDao } from 'src/database/entity';
import {
  TOKEN_REPOSITORY,
  PG_DATA_SOURCE,
} from 'src/database/shared/constants/database';
import { DataSource, Repository } from 'typeorm';

export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export const tokenProviders = [
  {
    provide: TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource): Repository<RefreshTokenDao> =>
      dataSource.getRepository(RefreshTokenDao),
    inject: [PG_DATA_SOURCE],
  },
];
