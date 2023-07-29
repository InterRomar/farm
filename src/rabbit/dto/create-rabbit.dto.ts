import { ApiProperty } from '@nestjs/swagger';
import { RabbitGender } from '../entities/rabbit.entity';

export class CreateRabbitDto {
  @ApiProperty({ description: 'Уникальное имя кролика', example: 'Ночка' })
  name: string;

  @ApiProperty({ description: 'Дата рождения кролика' })
  dob: Date;

  @ApiProperty({
    description: 'Необязательная заметка по кролику',
    example: 'Черная красавица',
  })
  note: string;

  @ApiProperty({
    description: 'Признак активности кролика (может ли учавствовать в случках)',
    example: 'true',
  })
  isActive: string;

  @ApiProperty({ description: 'Пол кролика', enum: ['female', 'male'] })
  gender: RabbitGender;
}
