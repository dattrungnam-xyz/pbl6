import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { QuestionModule } from '../question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entity/userAnswer.entity';

@Module({
  imports: [QuestionModule, TypeOrmModule.forFeature([UserAnswer])],
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
  exports: [UserAnswerService],
})
export class UserAnswerModule {}
