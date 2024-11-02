import { Module } from '@nestjs/common';
import { TopicQuestionService } from './topic-question.service';
import { TopicQuestionController } from './topic-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicQuestion } from './entities/topic-question.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([TopicQuestion]), CloudinaryModule],
  controllers: [TopicQuestionController],
  providers: [TopicQuestionService],
  exports:[TopicQuestionService]
})
export class TopicQuestionModule {}
