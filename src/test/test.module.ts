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

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, GroupQuestion]),
    CloudinaryModule,
    TagModule,
    PartModule,
    GroupQuestionModule,
    QuestionMediaModule
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
