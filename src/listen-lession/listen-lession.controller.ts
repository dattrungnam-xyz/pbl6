import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ListenLessionService } from './listen-lession.service';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../type/role.type';
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
}
