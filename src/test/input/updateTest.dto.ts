import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDTO } from './createTest.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateTestDTO {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  time: number;
}
