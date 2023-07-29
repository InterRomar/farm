export class CreateMatingDto {
  matingDate: Date;
  childbirthDate?: Date;
  litterNumber: number;
  childrenAmount?: number;
  deadChildrenAmont?: number;
  motherId: number;
  fatherId: number;
}
