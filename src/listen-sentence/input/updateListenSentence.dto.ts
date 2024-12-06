import { PartialType } from '@nestjs/mapped-types';
import { CreateListenSentenceDTO } from './createListenSentence.dto';

export class UpdateListenSentenceDTO extends PartialType(
  CreateListenSentenceDTO,
) {}
