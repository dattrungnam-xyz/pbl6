import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupTopicService } from './group-topic.service';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';
import { UpdateGroupTopicDTO } from './input/updateGroupTopic.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('group-topic')
export class GroupTopicController {
  constructor(private readonly groupTopicService: GroupTopicService) {}

  @Post()
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createGroupTopic(@Body() createGroupTopicDTO: CreateGroupTopicDTO) {
    return await this.groupTopicService.createGroupTopic(createGroupTopicDTO);
  }

  @Get()
  async findGroupTopic() {
    return await this.groupTopicService.findGroupTopic();
  }

  @Get('top8')
  async findTop8GroupTopic() {
    return await this.groupTopicService.findTop8GroupTopic();
  }

  @Get(':id')
  async findGroupTopicById(@Param('id') id: string) {
    return await this.groupTopicService.findGroupTopicById(id);
  }

  @Get(':id/user')
  @UseGuards(JwtAuthGuard)
  async findGroupTopicByIdAndUser(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.groupTopicService.findGroupTopicByIdAndUser(id, user.id);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateGroupTopic(
    @Param('id') id: string,
    @Body() updateGroupTopicDTO: UpdateGroupTopicDTO,
  ) {
    return await this.groupTopicService.updateGroupTopic(
      id,
      updateGroupTopicDTO,
    );
  }

  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteGroupTopic(@Param('id') id: string) {
    return await this.groupTopicService.deleteGroupTopic(id);
  }
}
