import { ApiProperty } from '@nestjs/swagger';

export class CreateMatingDto {
  @ApiProperty({ description: 'Дата случки' })
  matingDate: Date;

  @ApiProperty({ description: 'Дата родов' })
  childbirthDate?: Date;

  @ApiProperty({ description: 'Номер окрола', minimum: 1, maximum: 6 })
  litterNumber: number;

  @ApiProperty({
    description: 'Количество крольчат в помете',
    example: 5,
  })
  childrenAmount?: number;

  @ApiProperty({
    description: 'Количество погибших крольчат в помете',
    example: 1,
  })
  deadChildrenAmont?: number;

  @ApiProperty({
    description: 'ID ссылка на запись кролика-маму',
    example: 12,
  })
  motherId: number;

  @ApiProperty({
    description: 'ID ссылка на запись кролика-папу',
    example: 13,
  })
  fatherId: number;
}
