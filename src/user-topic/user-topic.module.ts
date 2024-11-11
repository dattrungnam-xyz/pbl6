import { Module } from '@nestjs/common';
import { UserTopicService } from './user-topic.service';
import { UserTopicController } from './user-topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTopic } from './entity/userTopic.entity';
import { User } from '../users/entity/user.entity';
import { WordModule } from '../word/word.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTopic, User]), WordModule],
  controllers: [UserTopicController],
  providers: [UserTopicService],
})
export class UserTopicModule {}
