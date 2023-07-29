import { RabbitGender } from '../entities/rabbit.entity';

export class CreateRabbitDto {
  name: string;
  age: number;
  gender: RabbitGender;
}
