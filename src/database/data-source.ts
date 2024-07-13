import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
export const postgresDatasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port:
    process.env.POSTGRES_PORT !== undefined ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USERNAME ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'gigapassword',
  database: process.env.POSTGRES_DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
  logging: true,
});
