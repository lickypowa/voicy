import { DataSource } from 'typeorm';
import { PG_DATA_SOURCE } from './shared/constants/database';
import { postgresDatasource } from './data-source';

export const databaseProviders = [
  {
    provide: PG_DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      return postgresDatasource.initialize();
    },
  },
];
