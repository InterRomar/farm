import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RabbitService } from './rabbit.service';
import { CreateRabbitDto } from './dto/create-rabbit.dto';
import { UpdateRabbitDto } from './dto/update-rabbit.dto';
import { Rabbit } from './entities/rabbit.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ValidationPipe } from '@nestjs/common';

@ApiTags('Rabbits')
@Controller('rabbit')
@UseGuards(AuthGuard, RolesGuard)
export class RabbitController {
  constructor(private readonly rabbitService: RabbitService) {}

  @ApiOperation({ summary: 'Создание нового кролика' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Кролик был успешно добавлен',
    type: Rabbit,
  })
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createRabbitDto: CreateRabbitDto) {
    return this.rabbitService.create(createRabbitDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rabbitService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение записи кролика' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Кролик был успешно изменен',
    type: Rabbit,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRabbitDto: UpdateRabbitDto,
  ) {
    return this.rabbitService.update(id, updateRabbitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи кролика' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Кролик был успешно удален',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rabbitService.remove(id);
  }
}
