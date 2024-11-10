import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupTopicDTO } from './createGroupTopic.dto';

export class UpdateGroupTopicDTO extends PartialType(CreateGroupTopicDTO) {}
