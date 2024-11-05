import { Body, Controller, Post } from '@nestjs/common';
import { GroupTopicService } from './group-topic.service';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';

@Controller('group-topic')
export class GroupTopicController {
  constructor(private readonly groupTopicService: GroupTopicService) {}

  @Post()
  async createGroupTopic(@Body() createGroupTopicDTO: CreateGroupTopicDTO) {
    return await this.groupTopicService.createGroupTopic(createGroupTopicDTO);
  }
}
