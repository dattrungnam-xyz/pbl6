import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionMediaService } from './question-media.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CreateQuestionMediaDTO } from './input/createQuestionMedia.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('question-media')
export class QuestionMediaController {
  constructor(
    private readonly questionMediaService: QuestionMediaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Delete(':id')
  async deleteQuestionMedia(@Param('id') id: string) {
    await this.questionMediaService.deleteQuestionMedia(id);
    return { message: 'Question media deleted successfully' };
  }

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async createQuestionMedia(
    @UploadedFile() media: Express.Multer.File,
    @Body() createQuestionMediaDTO: CreateQuestionMediaDTO,
  ) {
    if (!media) {
      throw new BadRequestException('Media cannot be empty');
    }
    if (media.mimetype.startsWith('image')) {
      const file = await this.cloudinaryService.uploadImage(media);
      return await this.questionMediaService.updateQuestionMediaGroupQuestion(
        file,
        createQuestionMediaDTO,
      );
    } else if (
      media.mimetype.startsWith('video') ||
      media.mimetype.startsWith('audio')
    ) {
      const file = await this.cloudinaryService.uploadAudioStream(media);
      return await this.questionMediaService.updateQuestionMediaGroupQuestion(
        file,
        createQuestionMediaDTO,
      );
    } else {
      throw new BadRequestException('Invalid media type');
    }
  }
}
