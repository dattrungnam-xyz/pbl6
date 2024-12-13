import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Topic } from '../topic/entity/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, Topic]), CloudinaryModule],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
