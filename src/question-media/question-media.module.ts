import { Module } from '@nestjs/common';
import { QuestionMediaService } from './question-media.service';
import { QuestionMediaController } from './question-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionMedia } from './entity/questionMedia.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionMedia,GroupQuestion]), CloudinaryModule],
  controllers: [QuestionMediaController],
  providers: [QuestionMediaService],
  exports: [QuestionMediaService],
})
export class QuestionMediaModule {}
