import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicQuestionDTO } from './createTopicQuestion.dto';

export class UpdateTopicQuestionDTO extends PartialType(CreateTopicQuestionDTO) {}
