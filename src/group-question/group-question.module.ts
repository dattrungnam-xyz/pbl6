import { Module } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { GroupQuestionController } from './group-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupQuestion } from './entity/groupQuestion.entity';
import { QuestionMediaModule } from '../question-media/question-media.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupQuestion]), QuestionMediaModule, CloudinaryModule],
  controllers: [GroupQuestionController],
  providers: [GroupQuestionService],
  exports: [GroupQuestionService],
})
export class GroupQuestionModule {}
