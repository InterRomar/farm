import { ApiProperty } from '@nestjs/swagger';
import { Mating } from 'src/mating/entities/mating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum RabbitGender {
  male = 'male',
  female = 'female',
}

@Entity('rabbits')
export class Rabbit {
  @ApiProperty({
    description: 'Уникальный идентификатор кролика',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Уникальное имя кролика', example: 'Ночка' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'Возраст кролика в месяцах' })
  @Column()
  age: number;

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
