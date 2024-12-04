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
import { ListenGroupService } from './listen-group.service';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';
import { CreateListenGroupDTO } from './input/createListenGroup.dto';

@Controller('listen-group')
export class ListenGroupController {
  constructor(private readonly listenGroupService: ListenGroupService) {}

  @Post()
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createListenGroup(@Body() createListenGroupDTO: CreateListenGroupDTO) {
    return await this.listenGroupService.createListenGroup(
      createListenGroupDTO,
    );
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateListenGroup(
    @Param('id') id: string,
    @Body() createListenGroupDTO: CreateListenGroupDTO,
  ) {
    return await this.listenGroupService.updateListenGroup(
      id,
      createListenGroupDTO,
    );
  }

  @Get()
  async getAllListenGroup() {
    return await this.listenGroupService.getAllListenGroup();
  }

  @Get(':id')
  async getListenGroup(@Param('id') id: string) {
    return await this.listenGroupService.getListenGroup(id);
  }

  @Delete(':id')
  async deleteListenGroup(@Param('id') id: string) {
    return await this.listenGroupService.deleteListenGroup(id);
  }
}
