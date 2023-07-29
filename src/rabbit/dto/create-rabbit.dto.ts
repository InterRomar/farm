import { ApiProperty } from '@nestjs/swagger';
import { RabbitGender } from '../entities/rabbit.entity';

export class CreateRabbitDto {
  @ApiProperty({ description: 'Уникальное имя кролика', example: 'Ночка' })
  name: string;

  @ApiProperty({ description: 'Возраст кролика в месяцах' })
  age: number;

  @ApiProperty({ description: 'Пол кролика', enum: ['female', 'male'] })
  gender: RabbitGender;
}
