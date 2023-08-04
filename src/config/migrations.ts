import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

import { config as dbConfig } from './db';

dotenvConfig({ path: '.env' });

const migrationsConfig = {
  ...dbConfig,
  host: process.env.LOCAL_POSTGRES_HOST,
  port: parseInt(process.env.LOCAL_POSTGRES_PORT, 10),
};

export const connectionSource = new DataSource(
  migrationsConfig as DataSourceOptions,
);

export default connectionSource;
