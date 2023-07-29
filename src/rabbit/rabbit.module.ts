import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

import { RabbitController } from './rabbit.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Rabbit } from './entities/rabbit.entity';

@Module({
  controllers: [RabbitController],
  providers: [RabbitService],
  imports: [TypeOrmModule.forFeature([Rabbit])],
})
export class RabbitModule {}
