import { Module } from '@nestjs/common';
import { TestPracticeService } from './test-practice.service';
import { TestPracticeController } from './test-practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPractice } from './entity/testPractice.entity';
import { UserAnswerModule } from '../user-answer/user-answer.module';
import { TestModule } from '../test/test.module';
import { UsersModule } from '../users/users.module';
import { UserAnswer } from '../user-answer/entity/userAnswer.entity';
import { Test } from '../test/entity/test.entity';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestPractice, UserAnswer, Test, User]),
    UserAnswerModule,
  ],
  controllers: [TestPracticeController],
  providers: [TestPracticeService],
})
export class TestPracticeModule {}
