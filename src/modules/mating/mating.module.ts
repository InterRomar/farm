import { Module } from '@nestjs/common';
import { MatingService } from './mating.service';
import { MatingController } from './mating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mating } from './entities/mating.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MatingController],
  providers: [MatingService],
  imports: [TypeOrmModule.forFeature([Mating])],
})
export class MatingModule {}
