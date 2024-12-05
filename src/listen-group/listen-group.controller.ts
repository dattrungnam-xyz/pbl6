import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListenGroupService } from './listen-group.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { RolesGuard } from '../auth/roles.guard';
import { CreateListenGroupDTO } from './input/createListenGroup.dto';
import { UpdateListenGroupDTO } from './input/updateListenGroup.dto';

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
    @Body() updateListenGroupDTO: UpdateListenGroupDTO,
  ) {
    return await this.listenGroupService.updateListenGroup(
      id,
      updateListenGroupDTO,
    );
  }

  @Get()
  async getAllListenGroup(
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('search') search?: string,
    @Query('level') level?: string,
  ) {
    return await this.listenGroupService.findPagination(
      limit,
      page,
      search,
      level,
    );
  }

  @Get(':id')
  async getListenGroup(@Param('id') id: string) {
    return await this.listenGroupService.getListenGroup(id);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteListenGroup(@Param('id') id: string) {
    return await this.listenGroupService.deleteListenGroup(id);
  }
}
