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
  UseGuards,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateEntireTopicDTO } from './input/createEntireTopic.dto';
import { UpdateEntireTopicDTO } from './input/updateEntireTopic.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateTopicDTO } from './input/createTopic.dto';
import { CreateListWordTopicDTO } from './input/createListWordTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('entire/:idGroupTopic')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createEntireTopic(
    @Body() createEntireTopicDTO: CreateEntireTopicDTO,
    @Param('idGroupTopic') id: string,
  ) {
    return await this.topicService.createEntireTopic(id, createEntireTopicDTO);
  }

  @Post(':idGroupTopic')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTopic(
    @Body() createTopicDTO: CreateTopicDTO,
    @Param('idGroupTopic') idGroupTopic: string,
  ) {
    return await this.topicService.createTopic(idGroupTopic, createTopicDTO);
  }
  @Post('word/:idTopic')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createListWordTopic(
    @Body() createListWordTopicDTO: CreateListWordTopicDTO,
    @Param('idTopic') idTopic: string,
  ) {
    return await this.topicService.createListWordTopic(
      idTopic,
      createListWordTopicDTO,
    );
  }
  @Get()
  async findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.topicService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTopicDTO: UpdateTopicDTO,
  ) {
    return await this.topicService.updateTopic(id, updateTopicDTO);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    await this.topicService.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
