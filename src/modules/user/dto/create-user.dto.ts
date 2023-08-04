import {
  IsNotEmpty,
  Length,
  MinLength,
  IsEnum,
  IsString,
} from 'class-validator';

import UserRole from '../enums/UserRole';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6)
  login: string;

  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  password?: string;

  @IsEnum(UserRole)
  role: UserRole;
}
