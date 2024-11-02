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
import { TopicQuestionService } from './topic-question.service';
import { CreateTopicQuestionDTO } from './input/createTopicQuestion.dto';
import { UpdateTopicQuestionDTO } from './input/updateTopicQuestion.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('topic-question')
export class TopicQuestionController {
  constructor(
    private readonly topicQuestionService: TopicQuestionService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createTopicQuestionDTO: CreateTopicQuestionDTO) {}

  @Get()
  findAll() {
    return this.topicQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicQuestionService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateTopicQuestionDTO: UpdateTopicQuestionDTO,
    @UploadedFiles()
    files: {
      thumbnail: Express.Multer.File[];
      audio: Express.Multer.File[];
    },
  ) {
    if (files.thumbnail.length) {
      const thumbnail = await this.cloudinaryService.uploadImage(
        files.thumbnail[0],
      );
      updateTopicQuestionDTO.thumbnail = thumbnail.url;
    }
    if (files.audio.length) {
      const audio = await this.cloudinaryService.uploadAudioStream(
        files.audio[0],
      );
      updateTopicQuestionDTO.audio = audio.url;
    }
    return this.topicQuestionService.update(+id, updateTopicQuestionDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicQuestionService.remove(+id);
  }
}
