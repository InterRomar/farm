import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './rabbit/rabbit.module';
import { MatingModule } from './mating/mating.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RabbitModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    MatingModule,
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
