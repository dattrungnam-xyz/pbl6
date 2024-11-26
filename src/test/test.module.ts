import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TagModule } from '../tag/tag.module';
import { PartModule } from '../part/part.module';
import { GroupQuestionModule } from '../group-question/group-question.module';
import { QuestionMediaModule } from '../question-media/question-media.module';
import { UserAnswerModule } from '../user-answer/user-answer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, GroupQuestion]),
    CloudinaryModule,
    TagModule,
    PartModule,
    GroupQuestionModule,
    QuestionMediaModule,
    UserAnswerModule
  ],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
 
})
export class TestModule {}
