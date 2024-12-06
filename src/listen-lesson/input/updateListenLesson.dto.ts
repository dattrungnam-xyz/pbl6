import { OmitType, PickType } from '@nestjs/mapped-types';
import { CreateListenLessonDTO } from './createListenLesson.dto';

export class UpdateListenLessonDTO extends OmitType(CreateListenLessonDTO, [
  'listenSentences',
]) {}
