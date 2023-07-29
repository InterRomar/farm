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
import { RabbitService } from './rabbit.service';
import { CreateRabbitDto } from './dto/create-rabbit.dto';
import { UpdateRabbitDto } from './dto/update-rabbit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rabbit } from './entities/rabbit.entity';

@ApiTags('Rabbits')
@Controller('rabbit')
export class RabbitController {
  constructor(private readonly rabbitService: RabbitService) {}

  @ApiOperation({ summary: 'Создание нового кролика' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Кролик был успешно добавлен',
    type: Rabbit,
  })
  @Post()
  create(@Body() createRabbitDto: CreateRabbitDto) {
    return this.rabbitService.create(createRabbitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка всех кроликов' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [Rabbit],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.rabbitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного кролика по ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Rabbit })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.rabbitService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение записи кролика' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Кролик был успешно изменен',
    type: Rabbit,
  })
  update(@Param('id') id: string, @Body() updateRabbitDto: UpdateRabbitDto) {
    return this.rabbitService.update(+id, updateRabbitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи кролика' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Кролик был успешно удален',
  })
  remove(@Param('id') id: string) {
    return this.rabbitService.remove(+id);
  }
}
