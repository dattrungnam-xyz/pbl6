import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupTopicService } from './group-topic.service';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';
import { UpdateGroupTopicDTO } from './input/updateGroupTopic.dto';

@Controller('group-topic')
export class GroupTopicController {
  constructor(private readonly groupTopicService: GroupTopicService) {}

  @Post()
  async createGroupTopic(@Body() createGroupTopicDTO: CreateGroupTopicDTO) {
    return await this.groupTopicService.createGroupTopic(createGroupTopicDTO);
  }
  @Get()
  async findGroupTopic() {
    return await this.groupTopicService.findGroupTopic();
  }
  @Get(':id')
  async findGroupTopicById(@Param('id') id: string) {
    return await this.groupTopicService.findGroupTopicById(id);
  }
  @Patch(':id')
  async updateGroupTopic(
    @Param('id') id: string,
    @Body() updateGroupTopicDTO: UpdateGroupTopicDTO,
  ) {
    return await this.groupTopicService.updateGroupTopic(
      id,
      updateGroupTopicDTO,
    );
  }
}