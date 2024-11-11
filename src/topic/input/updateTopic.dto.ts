import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDTO } from './createTopic.dto';

export class UpdateTopicDTO extends PartialType(CreateTopicDTO) {}
