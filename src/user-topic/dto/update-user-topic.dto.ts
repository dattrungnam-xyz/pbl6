import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTopicDto } from './create-user-topic.dto';

export class UpdateUserTopicDto extends PartialType(CreateUserTopicDto) {}
