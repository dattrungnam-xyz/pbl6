import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ListenSentenceService } from './listen-sentence.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateListenSentenceDTO } from './input/updateListenSentence.dto';

@Controller('listen-sentence')
export class ListenSentenceController {
  constructor(private readonly listenSentenceService: ListenSentenceService) {}

  @Patch(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateListenSentence(
    @Param('id') id: string,
    @Body() updateListenSentenceDTO: UpdateListenSentenceDTO,
  ) {
    return await this.listenSentenceService.updateListenSentence(
      id,
      updateListenSentenceDTO,
    );
  }
  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteListenSentence(@Param('id') id: string) {
    return await this.listenSentenceService.deleteListenSentence(id);
  }

  @Get(':idLesson')
  async getListenSentenceByLesson(@Param('idLesson') idLesson: string) {
    return await this.listenSentenceService.getListenSentenceByLesson(idLesson);
  }
}
