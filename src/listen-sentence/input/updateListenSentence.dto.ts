import { PartialType } from '@nestjs/mapped-types';
import { CreateListenSentenceDTO } from './createListenSentence.dto';
import { IsOptional } from 'class-validator';

export class UpdateListenSentenceDTO extends PartialType(
  CreateListenSentenceDTO,
) {
  @IsOptional()
  id?: string;
}
