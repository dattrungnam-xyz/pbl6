import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Comment } from './entity/comment.entity';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { Question } from '../question/entity/question.entity';
import { Test } from '../test/entity/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, GroupTopic, Question, Test])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
