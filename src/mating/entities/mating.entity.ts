import { ApiProperty } from '@nestjs/swagger';
import { Rabbit } from 'src/rabbit/entities/rabbit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('matings')
export class Mating {
  @ApiProperty({
    description: 'Уникальный идентификатор записи',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Дата случки' })
  @Column({ type: 'date', nullable: false })
  matingDate: Date;

  @ApiProperty({ description: 'Дата и время создания записи' })
  @Column({ nullable: false, type: 'timestamp', default: new Date() })
  createdAt: Date;

  @ApiProperty({ description: 'Дата родов' })
  @Column({ type: 'date', nullable: true })
  childbirthDate: Date;

  @ApiProperty({ description: 'Номер окрола', minimum: 1, maximum: 6 })
  @Column({ nullable: false })
  litterNumber: number;

  @ApiProperty({
    description: 'Количество крольчат в помете',
    example: 5,
  })
  @Column({ nullable: true })
  childrenAmount: number;

  @ApiProperty({
    description: 'Количество погибших крольчат в помете',
    example: 1,
  })
  @Column({ nullable: false, default: 0 })
  deadChildrenAmont: number;

  @ApiProperty({
    description: 'ID ссылка на запись кролика-маму',
    example: 12,
  })
  @Column({ type: 'int', nullable: false })
  motherId: number;

  @ApiProperty({
    description: 'ID ссылка на запись кролика-папу',
    example: 13,
  })
  @Column({ type: 'int', nullable: false })
  fatherId: number;

  @ManyToOne(() => Rabbit, (rabbit) => rabbit.matings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'mother_id' })
  mother: Rabbit;

  @ManyToOne(() => Rabbit, (rabbit) => rabbit.matings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'father_id' })
  father: Rabbit;
}
