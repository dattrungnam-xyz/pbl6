import { PartialType } from '@nestjs/mapped-types';
import { CreateEntireTopicDTO } from './createEntireTopic.dto';

export class UpdateEntireTopicDTO extends PartialType(CreateEntireTopicDTO) {}
