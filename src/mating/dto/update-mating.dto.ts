import { PartialType } from '@nestjs/swagger';
import { CreateMatingDto } from './create-mating.dto';

export class UpdateMatingDto extends PartialType(CreateMatingDto) {}
