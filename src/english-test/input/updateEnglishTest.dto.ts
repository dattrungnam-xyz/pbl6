import { PartialType } from '@nestjs/mapped-types';
import { CreateEnglishTestDTO } from './createEnglishTest.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateEnglishTestDTO extends PartialType(CreateEnglishTestDTO) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
