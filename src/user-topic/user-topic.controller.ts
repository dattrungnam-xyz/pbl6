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
import { UserTopicService } from './user-topic.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CreateUserTopicDTO } from './input/createUserTopic.dto';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { UpdateUserTopicDTO } from './input/updateUserTopic.dto';

@Controller('user-topic')
export class UserTopicController {
  constructor(private readonly userTopicService: UserTopicService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createUserTopic(
    @Body() createUserTopicDTO: CreateUserTopicDTO,
    @CurrentUser() user: User,
  ) {
    return await this.userTopicService.createNewUserTopic(
      user.id,
      createUserTopicDTO,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserTopic(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateUserTopic: UpdateUserTopicDTO,
  ) {
    return await this.userTopicService.updateUserTopic(
      id,
      updateUserTopic,
      user.id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUserTopic(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.userTopicService.deleteUserTopic(id, user.id);
  }

  @Post(':idTopic/word/:idWord')
  @UseGuards(JwtAuthGuard)
  async addWordToUserTopic(
    @Param('idTopic') idTopic: string,
    @Param('idWord') idWord: string,
    @CurrentUser() user: User,
  ) {
    return await this.userTopicService.addWordToUserTopic(
      idTopic,
      idWord,
      user.id,
    );
  }

  @Delete(':idTopic/word/:idWord')
  @UseGuards(JwtAuthGuard)
  async deleteWordInUserTopic(
    @Param('idTopic') idTopic: string,
    @Param('idWord') idWord: string,
    @CurrentUser() user: User,
  ) {
    return await this.userTopicService.deleteWordUserTopic(
      idTopic,
      idWord,
      user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTopicByUserId(@CurrentUser() user: User) {
    return await this.userTopicService.getTopicByUserId(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTopicDetailByUserId(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.userTopicService.getTopicDetailByUserId(id, user.id);
  }
}
