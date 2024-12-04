import { OmitType, PickType } from '@nestjs/mapped-types';
import { CreateListenLessionDTO } from './createListenLession.dto';

export class UpdateListenLessionDTO extends OmitType(CreateListenLessionDTO, [
  'listenSentences',
]) {}
