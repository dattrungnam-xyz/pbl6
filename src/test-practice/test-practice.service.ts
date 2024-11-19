import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestPractice } from './entity/testPractice.entity';
import { Repository } from 'typeorm';
import { CreateTestPracticeDTO } from './input/createTestPratice.dto';
import { TestService } from '../test/test.service';
import { UsersService } from '../users/users.service';
import { UserAnswerService } from '../user-answer/user-answer.service';
import { getLCScore, getRCScore } from '../utils/getScore';

@Injectable()
export class TestPracticeService {
  constructor(
    @InjectRepository(TestPractice)
    private readonly testPracticeRepository: Repository<TestPractice>,
    private readonly testService: TestService,
    private readonly usersService: UsersService,
    private readonly userAnswerService: UserAnswerService,
  ) {}
  async createTestPractice(createTestPractice: CreateTestPracticeDTO) {
    const test = await this.testService.findOneById(createTestPractice.testId);
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    const user = await this.usersService.findOneById(createTestPractice.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const testPractice = new TestPractice();
    testPractice.user = Promise.resolve(user);
    testPractice.test = Promise.resolve(test);
    Object.assign(testPractice, createTestPractice);
    const listUserAnswer = await this.userAnswerService.createListUserAnswer(
      createTestPractice.userAnswer,
    );
    let totalQuestion = listUserAnswer.length;
    let numCorrect = listUserAnswer.filter((answer) => answer.isCorrect).length;
    let LCCount = 0;
    let RCCount = 0;
    for (const answer of listUserAnswer) {
      if (answer.isCorrect) {
        const question = await answer.question;
        if (+question.questionNumber <= 100) {
          LCCount++;
        } else {
          RCCount++;
        }
      }
    }
    testPractice.LCScore = getLCScore(LCCount);
    testPractice.RCScore = getRCScore(RCCount);
    testPractice.totalQuestion = totalQuestion;
    testPractice.numCorrect = numCorrect;
    testPractice.userAnswers = Promise.resolve(listUserAnswer);
    return await this.testPracticeRepository.save(testPractice);
  }
  async getListTestPracticeByUserIdAndTestId(idUser: string, idTest: string) {
    return await this.testPracticeRepository.find({
      where: { user: { id: idUser }, test: { id: idTest } },
    });
  }
}
