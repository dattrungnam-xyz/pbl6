import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateTagDTO } from '../../tag/input/createTag.dto';
import { Type } from 'class-transformer';

export class UpdateTagsTestDTO {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDTO)
  push: CreateTagDTO[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  pull: string[];
}
