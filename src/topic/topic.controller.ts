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
import { CreateTopicDTO } from './input/createTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post(':idGroupTopic')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'thumbnail' }, { name: 'audio' }]),
  )
  async createEntireTopic(
    @Body() createTopicDTO: CreateTopicDTO,
    @Param('idGroupTopic') id: string,
  ) {
    return await this.topicService.createEntireTopic(id,createTopicDTO);
  }

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDTO: UpdateTopicDTO) {
    return this.topicService.update(+id, updateTopicDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.topicService.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
