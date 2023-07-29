import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatingService } from './mating.service';
import { CreateMatingDto } from './dto/create-mating.dto';
import { UpdateMatingDto } from './dto/update-mating.dto';

@Controller('mating')
export class MatingController {
  constructor(private readonly matingService: MatingService) {}

  @Post()
  create(@Body() createMatingDto: CreateMatingDto) {
    return this.matingService.create(createMatingDto);
  }

  @Get()
  findAll() {
    return this.matingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatingDto: UpdateMatingDto) {
    return this.matingService.update(+id, updateMatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matingService.remove(+id);
  }
}
