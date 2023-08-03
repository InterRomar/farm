import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dbConfig } from './db';

interface MainConfig {
  env: string;
  port: number;
  database: PostgresConnectionOptions;
}

export default (): Partial<MainConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: dbConfig(),
});
