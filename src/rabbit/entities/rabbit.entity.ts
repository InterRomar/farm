import { Mating } from 'src/mating/entities/mating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum RabbitGender {
  male = 'male',
  female = 'female',
}

@Entity('rabbits')
export class Rabbit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: RabbitGender,
    nullable: false,
  })
  gender: RabbitGender;

  @OneToMany(() => Mating, (mating) => mating.mother)
  matings: Mating[];
}
