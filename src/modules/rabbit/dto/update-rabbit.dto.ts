import { PickType } from '@nestjs/swagger';
import { CreateRabbitDto } from './create-rabbit.dto';

export class UpdateRabbitDto extends PickType(CreateRabbitDto, [
  'note' as const,
  'isActive' as const,
]) {}
