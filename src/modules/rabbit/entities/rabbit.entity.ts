import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Mating } from 'src/modules/mating/entities/mating.entity';
import RabbitGender from '../enums/RabbitGender';

@Entity('rabbits')
export class Rabbit {
  @ApiProperty({
    description: 'Уникальный идентификатор записи',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Уникальное имя кролика', example: 'Ночка' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'Дата и время создания записи' })
  @Column({ nullable: false, type: 'timestamp', default: new Date() })
  createdAt: Date;

  @ApiProperty({ description: 'Дата рождения кролика' })
  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @ApiProperty({
    description: 'Необязательная заметка по кролику',
    example: 'Черная красавица',
  })
  @Column({ nullable: true })
  note: string;

  @ApiProperty({
    description: 'Признак активности кролика (может ли учавствовать в случках)',
    example: 'true',
  })
  @Column({ nullable: false, default: false })
  isActive: string;

  @ApiProperty({ description: 'Пол кролика', enum: ['female', 'male'] })
  @Column({
    type: 'enum',
    enum: RabbitGender,
    nullable: false,
  })
  gender: RabbitGender;

  @OneToMany(() => Mating, (mating) => mating.mother)
  matings: Mating[];
}
