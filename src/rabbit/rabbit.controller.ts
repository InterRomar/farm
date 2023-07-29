import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { CreateRabbitDto } from './dto/create-rabbit.dto';
import { UpdateRabbitDto } from './dto/update-rabbit.dto';

@Controller('rabbit')
export class RabbitController {
  constructor(private readonly rabbitService: RabbitService) {}

  @Post()
  create(@Body() createRabbitDto: CreateRabbitDto) {
    console.log(createRabbitDto);
    return this.rabbitService.create(createRabbitDto);
  }

  @Get()
  findAll(@Headers('user-agent') userAgent: string) {
    console.log(userAgent);

    return this.rabbitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rabbitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRabbitDto: UpdateRabbitDto) {
    return this.rabbitService.update(+id, updateRabbitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rabbitService.remove(+id);
  }
}
