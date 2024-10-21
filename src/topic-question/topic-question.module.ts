import { Module } from '@nestjs/common';
import { TopicQuestionService } from './topic-question.service';
import { TopicQuestionController } from './topic-question.controller';

@Module({
  controllers: [TopicQuestionController],
  providers: [TopicQuestionService],
})
export class TopicQuestionModule {}
