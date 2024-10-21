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

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'thumbnail' }, { name: 'audio' }]),
  )
  async createEntireTopic(
    @UploadedFiles()
    files: {
      thumbnail: Express.Multer.File[];
      audio: Express.Multer.File[];
    },
    @Body() createTopicDTO: CreateTopicDTO,
  ) {
    let filePromise = [];
    let listFile = [];
    if (files) {
      if (files.thumbnail && files.thumbnail.length) {
        filePromise.push(
          this.cloudinaryService.uploadListImage(files.thumbnail),
        );
      }
      if (files.audio && files.audio.length) {
        filePromise.push(this.cloudinaryService.uploadListAudio(files.audio));
      }
      listFile = await Promise.all(filePromise);
      listFile = listFile.flat(1);
    }
    return await this.topicService.createEntireTopic(createTopicDTO, listFile);
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
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
