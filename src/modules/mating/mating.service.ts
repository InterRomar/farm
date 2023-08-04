import { Injectable } from '@nestjs/common';
import { CreateMatingDto } from './dto/create-mating.dto';
import { UpdateMatingDto } from './dto/update-mating.dto';
import { DataSource, Repository } from 'typeorm';
import { Mating } from './entities/mating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatingService {
  constructor(
    @InjectRepository(Mating)
    private matingRepository: Repository<Mating>,
    private dataSource: DataSource,
  ) {}

  create(createMatingDto: CreateMatingDto): Promise<Mating> {
    return this.matingRepository.save(createMatingDto);
  }

  findAll(): Promise<Mating[]> {
    return this.matingRepository.find();
  }

  findOne(id: number): Promise<Mating | null> {
    return this.matingRepository.findOneBy({ id });
  }

  update(id: number, updateMatingDto: UpdateMatingDto) {
    return this.dataSource
      .createQueryBuilder()
      .update(Mating)
      .set({ ...updateMatingDto })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
  }

  async remove(id: number) {
    await this.matingRepository.delete({ id });
  }
}
