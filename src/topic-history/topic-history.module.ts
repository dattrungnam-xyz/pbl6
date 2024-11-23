import { Module } from '@nestjs/common';
import { TopicHistoryService } from './topic-history.service';
import { TopicHistoryController } from './topic-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../word/entity/word.entity';
import { TopicHistory } from './entity/topicHistory.entity';
import { Topic } from '../topic/entity/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicHistory, Word, Topic])],
  controllers: [TopicHistoryController],
  providers: [TopicHistoryService],
})
export class TopicHistoryModule {}
