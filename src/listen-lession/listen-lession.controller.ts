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
import { ListenLessionService } from './listen-lession.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';
import { CreateListenLessionDTO } from './input/createListenLession.dto';

@Controller('listen-lession')
export class ListenLessionController {
  constructor(private readonly listenLessionService: ListenLessionService) {}

  @Post('listen-group/:id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createListenLession(
    @Param('id') id: string,
    @Body() createListenLessionDTO: CreateListenLessionDTO,
  ) {
    return await this.listenLessionService.createListenLessionWithSentence(
      id,
      createListenLessionDTO,
    );
  }

  @Get(':id')
  async getListenLession(@Param('id') id: string) {
    return await this.listenLessionService.getListenLession(id);
  }
  @Get()
  async getListListenLession() {
    return await this.listenLessionService.getListListenLession();
  }
  @Patch(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateListenLession(
    @Param('id') id: string,
    @Body() createListenLessionDTO: CreateListenLessionDTO,
  ) {
    return await this.listenLessionService.updateListenLession(
      id,
      createListenLessionDTO,
    );
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteListenLession(@Param('id') id: string) {
    return await this.listenLessionService.deleteListenLession(id);
  }
}
