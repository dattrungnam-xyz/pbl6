import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDTO } from './createTest.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTestDTO extends PartialType(CreateTestDTO) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
