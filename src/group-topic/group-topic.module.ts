import { Module } from '@nestjs/common';
import { GroupTopicService } from './group-topic.service';
import { GroupTopicController } from './group-topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupTopic } from './entity/groupTopic.entity';
import { TagModule } from '../tag/tag.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TopicHistory } from '../topic-history/entity/topicHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupTopic, TopicHistory]),
    TagModule,
    CloudinaryModule,
  ],
  controllers: [GroupTopicController],
  providers: [GroupTopicService],
})
export class GroupTopicModule {}
