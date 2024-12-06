import { Module } from '@nestjs/common';
import { ListenLessonService } from './listen-lesson.service';
import { ListenLessonController } from './listen-lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { ListenLesson } from './entity/listenLesson.entity';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenSentenceModule } from '../listen-sentence/listen-sentence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListenGroup, ListenLesson, ListenSentence]),
    ListenSentenceModule,
    CloudinaryModule,
  ],
  controllers: [ListenLessonController],
  providers: [ListenLessonService],
})
export class ListenLessonModule {}
