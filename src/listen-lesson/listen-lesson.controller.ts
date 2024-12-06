import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ListenLessonService } from './listen-lesson.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';
import { CreateListenLessonDTO } from './input/createListenLesson.dto';

@Controller('listen-lesson')
export class ListenLessonController {
  constructor(private readonly listenLessonService: ListenLessonService) {}

  @Post('listen-group/:id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createListenLesson(
    @Param('id') id: string,
    @Body() createListenLessonDTO: CreateListenLessonDTO,
  ) {
    return await this.listenLessonService.createListenLessonWithSentence(
      id,
      createListenLessonDTO,
    );
  }

  @Get(':id')
  async getListenLesson(@Param('id') id: string) {
    return await this.listenLessonService.getListenLesson(id);
  }
  @Get()
  async getListListenLesson() {
    return await this.listenLessonService.getListListenLesson();
  }
  @Patch(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateListenLesson(
    @Param('id') id: string,
    @Body() createListenLessonDTO: CreateListenLessonDTO,
  ) {
    return await this.listenLessonService.updateListenLesson(
      id,
      createListenLessonDTO,
    );
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteListenLesson(@Param('id') id: string) {
    return await this.listenLessonService.deleteListenLesson(id);
  }
}
