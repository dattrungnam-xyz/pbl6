import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateWordDTO } from '../../word/input/createWord.dto';

export class CreateListWordTopicDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordDTO)
  listWord: CreateWordDTO[];
}
