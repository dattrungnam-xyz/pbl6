import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { TagModule } from '../tag/tag.module';
import { TopicQuestionModule } from '../topic-question/topic-question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), CloudinaryModule, TagModule, TopicQuestionModule],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
