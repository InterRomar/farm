import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MatingService } from './mating.service';
import { CreateMatingDto } from './dto/create-mating.dto';
import { UpdateMatingDto } from './dto/update-mating.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rabbit } from 'src/rabbit/entities/rabbit.entity';
import { Mating } from './entities/mating.entity';

@ApiTags('Matings')
@Controller('mating')
export class MatingController {
  constructor(private readonly matingService: MatingService) {}

  @ApiOperation({ summary: 'Создание новой случки' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Случка был успешно добавлена',
    type: Mating,
  })
  @Post()
  create(@Body() createMatingDto: CreateMatingDto) {
    return this.matingService.create(createMatingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка всех случек' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [Mating],
  })
  findAll() {
    return this.matingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одной случки по ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Mating })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.matingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение записи случки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Случка был успешно изменен',
    type: Rabbit,
  })
  update(@Param('id') id: string, @Body() updateMatingDto: UpdateMatingDto) {
    return this.matingService.update(+id, updateMatingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи случки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Случка был успешно удален',
  })
  remove(@Param('id') id: string) {
    return this.matingService.remove(+id);
  }
}
