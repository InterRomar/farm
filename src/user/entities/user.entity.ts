import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserRole from '../enums/UserRole';
import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: true })
  name: string;

  @Exclude({ toClassOnly: true })
  @Column({ nullable: false, select: false })
  password?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.user,
  })
  role: UserRole;
}

export class UserWithoutPassword extends OmitType(User, [
  'password',
] as const) {}
