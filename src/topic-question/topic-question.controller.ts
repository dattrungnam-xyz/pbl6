import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicQuestionService } from './topic-question.service';
import { CreateTopicQuestionDTO } from './input/createTopicQuestion.dto';
import { UpdateTopicQuestionDTO } from './input/updateTopicQuestion.dto';

@Controller('topic-question')
export class TopicQuestionController {
  constructor(private readonly topicQuestionService: TopicQuestionService) {}

  @Post()
  create(@Body() createTopicQuestionDTO: CreateTopicQuestionDTO) {
    return this.topicQuestionService.create(createTopicQuestionDTO);
  }

  @Get()
  findAll() {
    return this.topicQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicQuestionDTO: UpdateTopicQuestionDTO) {
    return this.topicQuestionService.update(+id, updateTopicQuestionDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicQuestionService.remove(+id);
  }
}
