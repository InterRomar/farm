import { PartialType } from '@nestjs/mapped-types';
import { CreateMatingDto } from './create-mating.dto';

export class UpdateMatingDto extends PartialType(CreateMatingDto) {}
