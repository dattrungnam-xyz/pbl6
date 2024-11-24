import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TopicHistoryService } from './topic-history.service';
import { CreateTopicHistoryDTO } from './input/createTopicHistory.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';

@Controller('topic-history')
export class TopicHistoryController {
  constructor(private readonly topicHistoryService: TopicHistoryService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTopicHistory(
    @CurrentUser() user: User,
    @Body() createTopicHistoryDTO: CreateTopicHistoryDTO,
  ) {
    let numCorrect = 0;
    let numIncorrect = 0;
    if (createTopicHistoryDTO.listCorrectWord) {
      numCorrect = createTopicHistoryDTO.listCorrectWord.length;
    }
    if (createTopicHistoryDTO.listIncorrectWord) {
      numIncorrect = createTopicHistoryDTO.listIncorrectWord.length;
    }

    createTopicHistoryDTO.idUser = user.id;
    createTopicHistoryDTO.numCorrect = numCorrect;
    createTopicHistoryDTO.totalWord = numCorrect + numIncorrect;

    return await this.topicHistoryService.createTopicHistory(
      user,
      createTopicHistoryDTO,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getTopicHistoryByUserId(@CurrentUser() user: User) {
    return await this.topicHistoryService.getTopicHistoryByUserId(user.id);
  }

  @Get('topic/:id')
  @UseGuards(JwtAuthGuard)
  async getTopicHistoryByUserIdTopicId(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.topicHistoryService.getTopicHistoryByUserIdTopicId(
      user.id,
      id,
    );
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getHistoryDetail(@CurrentUser() user: User, @Param('id') id: string) {
    return await this.topicHistoryService.getTopicHistoryDetail(id);
  }

  @Get('statistic/topic/:id')
  @UseGuards(JwtAuthGuard)
  async getHistoryStatisticDetail(@CurrentUser() user: User, @Param('id') id: string) {
    return await this.topicHistoryService.getTopicHistoryStatisticDetail(user.id, id);
  }
}
