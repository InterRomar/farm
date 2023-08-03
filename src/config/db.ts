import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenvConfig({ path: '.env' });

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: false,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
};

export const dbConfig = (): PostgresConnectionOptions => config;

if (process.env.NODE_ENV === 'development') {
  Logger.debug(dbConfig());

  Logger.log(join(__dirname, './**/*.entity{.ts,.js}'));
  // Logger.log(__dirname);
}

export const connectionSource = new DataSource(dbConfig() as DataSourceOptions);
