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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  matingDate: Date;

  @Column({ type: 'date', nullable: true })
  childbirthDate: Date;

  @Column({ nullable: false })
  litterNumber: number;

  @Column({ nullable: true })
  childrenAmount: number;

  @Column({ type: 'int', nullable: false })
  motherId: number;

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
