/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DataSource, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import { CreateRabbitDto } from './dto/create-rabbit.dto';
import { UpdateRabbitDto } from './dto/update-rabbit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rabbit } from './entities/rabbit.entity';

@Injectable()
export class RabbitService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Rabbit)
    private rabbitRepository: Repository<Rabbit>,
    private dataSource: DataSource,
  ) {}

  create(createRabbitDto: CreateRabbitDto): Promise<Rabbit> {
    return this.rabbitRepository.save(createRabbitDto);
  }

  findAll(): Promise<Rabbit[]> {
    console.log(new Date().toISOString());
    return this.rabbitRepository.find();
  }

  findOne(id: number): Promise<Rabbit> {
    return this.rabbitRepository
      .createQueryBuilder('rabbit')
      .leftJoinAndSelect('rabbit.matings', 'matings')
      .leftJoinAndSelect('matings.father', 'father')
      .where('rabbit.id = :id', { id })
      .getOne();
  }

  update(id: number, updateRabbitDto: UpdateRabbitDto) {
    return this.dataSource
      .createQueryBuilder()
      .update(Rabbit)
      .set({ ...updateRabbitDto })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
  }

  async remove(id: number): Promise<void> {
    await this.rabbitRepository.delete(id);
  }
}
