import { Module } from '@nestjs/common';
import { TestPracticeService } from './test-practice.service';
import { TestPracticeController } from './test-practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPractice } from './entity/testPractice.entity';
import { UserAnswerModule } from '../user-answer/user-answer.module';
import { TestModule } from '../test/test.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestPractice]),
    UserAnswerModule,
    TestModule,
    UsersModule,
    UserAnswerModule,
  ],
  controllers: [TestPracticeController],
  providers: [TestPracticeService],
})
export class TestPracticeModule {}
