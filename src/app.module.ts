import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rabbit } from './rabbit/entities/rabbit.entity';
import { MatingModule } from './mating/mating.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Mating } from './mating/entities/mating.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RabbitModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Rabbit, Mating],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    MatingModule,
  ],
})
export class AppModule {}
