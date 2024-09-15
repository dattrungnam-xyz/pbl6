import { Module } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { GroupQuestionController } from './group-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupQuestion } from './entity/groupQuestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupQuestion])],
  controllers: [GroupQuestionController],
  providers: [GroupQuestionService],
  exports: [GroupQuestionService],
})
export class GroupQuestionModule {}
