import { Module } from '@nestjs/common';
import { UserTopicService } from './user-topic.service';
import { UserTopicController } from './user-topic.controller';

@Module({
  controllers: [UserTopicController],
  providers: [UserTopicService],
})
export class UserTopicModule {}
