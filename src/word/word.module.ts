import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Topic } from '../topic/entity/topic.entity';
import { UserTopic } from '../user-topic/entity/userTopic.entity';
import { TranslateModule } from '../translate/translate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Word, Topic, UserTopic]), CloudinaryModule, TranslateModule],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
