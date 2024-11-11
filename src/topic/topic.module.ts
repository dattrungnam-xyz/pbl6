import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entity/topic.entity';
import { TagModule } from '../tag/tag.module';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { WordModule } from '../word/word.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, GroupTopic]), CloudinaryModule, TagModule, WordModule],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
