import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  MinLength,
  IsBoolean,
  IsEnum,
  IsString,
} from 'class-validator';

import RabbitGender from '../enums/RabbitGender';

export class CreateRabbitDto {
  @ApiProperty({ description: 'Уникальное имя кролика', example: 'Ночка' })
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Дата рождения кролика' })
  @IsDateString()
  dob: Date;

  @ApiProperty({
    description: 'Необязательная заметка по кролику',
    example: 'Черная красавица',
  })
  @IsString()
  note: string;

  @ApiProperty({
    description: 'Признак активности кролика (может ли учавствовать в случках)',
    example: 'true',
  })
  @IsBoolean()
  isActive: string;

  @ApiProperty({ description: 'Пол кролика', enum: ['female', 'male'] })
  @IsEnum(RabbitGender)
  @IsNotEmpty()
  gender: RabbitGender;
}
