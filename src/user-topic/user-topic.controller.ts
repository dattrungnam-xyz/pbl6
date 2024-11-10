import { Controller } from '@nestjs/common';
import { UserTopicService } from './user-topic.service';

@Controller('user-topic')
export class UserTopicController {
  constructor(private readonly userTopicService: UserTopicService) {}
}
