import { PartialType } from '@nestjs/mapped-types';
import { CreateWordDTO } from './createWord.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateWordDTO extends PartialType(CreateWordDTO) {
  @IsOptional()
  @IsUUID()
  idTopic: string;
}
