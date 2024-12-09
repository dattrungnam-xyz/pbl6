import { OmitType, PickType } from '@nestjs/mapped-types';
import { CreateListenLessonDTO } from './createListenLesson.dto';
import { UpdateListenSentenceDTO } from '../../listen-sentence/input/updateListenSentence.dto';
import { IsOptional } from 'class-validator';

export class UpdateListenLessonDTO extends OmitType(CreateListenLessonDTO, [
  'listenSentences',
]) {
  @IsOptional()
  listenSentences: UpdateListenSentenceDTO[];
}
