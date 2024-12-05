import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionMediaService } from './question-media.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CreateQuestionMediaDTO } from './input/createQuestionMedia.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';

@Controller('question-media')
export class QuestionMediaController {
  constructor(
    private readonly questionMediaService: QuestionMediaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteQuestionMedia(@Param('id') id: string) {
    await this.questionMediaService.deleteQuestionMedia(id);
    return { message: 'Question media deleted successfully' };
  }

  @Post()
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createQuestionMedia(
    @Body() createQuestionMediaDTO: CreateQuestionMediaDTO,
  ) {
    return await this.questionMediaService.createQuestionMedia(
      createQuestionMediaDTO,
    );
  }
}
