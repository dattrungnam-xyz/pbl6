import { Module } from '@nestjs/common';
import { QuestionMediaService } from './question-media.service';
import { QuestionMediaController } from './question-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionMedia } from './entity/questionMedia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionMedia])],
  controllers: [QuestionMediaController],
  providers: [QuestionMediaService],
  exports: [QuestionMediaService],
})
export class QuestionMediaModule {}
