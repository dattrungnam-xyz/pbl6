import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateEntireTopicDTO } from './input/createEntireTopic.dto';
import { UpdateEntireTopicDTO } from './input/updateEntireTopic.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateTopicDTO } from './input/createTopic.dto';
import { CreateListWordTopicDTO } from './input/createListWordTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('entire/:idGroupTopic')
  async createEntireTopic(
    @Body() createEntireTopicDTO: CreateEntireTopicDTO,
    @Param('idGroupTopic') id: string,
  ) {
    return await this.topicService.createEntireTopic(id, createEntireTopicDTO);
  }

  @Post(':idGroupTopic')
  async createTopic(
    @Body() createTopicDTO: CreateTopicDTO,
    @Param('idGroupTopic') idGroupTopic: string,
  ) {
    return await this.topicService.createTopic(idGroupTopic, createTopicDTO);
  }
  @Post('word/:idTopic')
  async createListWordTopic(
    @Body() createListWordTopicDTO: CreateListWordTopicDTO,
    @Param('idTopic') idTopic: string,
  ) {
    return await this.topicService.createListWordTopic(
      idTopic,
      createListWordTopicDTO,
    );
  }
  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDTO: UpdateTopicDTO) {
    return this.topicService.updateTopic(id, updateTopicDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.topicService.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
