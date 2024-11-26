import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestPractice } from './entity/testPractice.entity';
import { Repository } from 'typeorm';
import { CreateTestPracticeDTO } from './input/createTestPratice.dto';
import { TestService } from '../test/test.service';
import { UsersService } from '../users/users.service';
import { UserAnswerService } from '../user-answer/user-answer.service';
import { getLCScore, getRCScore } from '../utils/getScore';
import { UserAnswer } from '../user-answer/entity/userAnswer.entity';
import { Test } from '../test/entity/test.entity';
import { User } from '../users/entity/user.entity';
import { DataSource } from 'typeorm';
@Injectable()
export class TestPracticeService {
  constructor(
    @InjectRepository(TestPractice)
    private readonly testPracticeRepository: Repository<TestPractice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    private readonly userAnswerService: UserAnswerService,
    private dataSource: DataSource,
  ) {}
  async createTestPractice(createTestPractice: CreateTestPracticeDTO) {
    const test = await this.testRepository.findOne({
      where: { id: createTestPractice.testId },
      relations: ['testPractices'],
    });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    const user = await this.userRepository.findOne({
      where: { id: createTestPractice.userId },
      relations: ['testPractices'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const testPractice = new TestPractice();
    Object.assign(testPractice, createTestPractice);
    await this.testPracticeRepository.save(testPractice);
    const userTestPractices = user.testPractices;
    await this.userRepository.save(
      new User({
        ...user,
        testPractices: [...userTestPractices, testPractice],
      }),
    );
    const testTestPractices = test.testPractices;
    await this.testRepository.save(
      new Test({
        ...test,
        testPractices: [...testTestPractices, testPractice],
      }),
    );
    const listUserAnswer = await this.userAnswerService.createListUserAnswer(
      testPractice,
      createTestPractice.userAnswer,
    );
    let totalQuestion = listUserAnswer.length;
    let numCorrect = listUserAnswer.filter((answer) => answer.isCorrect).length;
    let LCCount = 0;
    let RCCount = 0;
    for (const answer of listUserAnswer) {
      if (answer.isCorrect) {
        const question = answer.question;
        if (+question.questionNumber <= 100) {
          LCCount++;
        } else {
          let RCCount = 0;
          for (const answer of listUserAnswer) {
            if (answer.isCorrect) {
              const question = answer.question;
              if (+question.questionNumber <= 100) {
                LCCount++;
              } else {
                RCCount++;
              }
            }
          }
          testPractice.LCScore = getLCScore(LCCount);
          testPractice.RCScore = getRCScore(RCCount);
          RCCount++;
        }
      }
    }
    testPractice.LCScore = getLCScore(LCCount);
    testPractice.RCScore = getRCScore(RCCount);
    testPractice.totalQuestion = totalQuestion;
    testPractice.numCorrect = numCorrect;
    return await this.testPracticeRepository.save(testPractice);
  }
  async getListTestPracticeByUser(idUser: string) {
    // const query = `SELECT testPractice.id AS testPractice_id,
    // testPractice.createdAt AS testPractice_createdAt,
    // testPractice.deletedAt AS testPractice_deletedAt,
    // testPractice.time AS testPractice_time,
    // testPractice.LCScore AS testPractice_LCScore,
    // testPractice.RCScore AS testPractice_RCScore,
    // testPractice.totalQuestion AS testPractice_totalQuestion,
    // testPractice.numCorrect AS testPractice_numCorrect,
    // testPractice.userId AS testPractice_userId,
    // testPractice.testId AS testPractice_testId,
    // user.id AS user_id,
    // user.name AS user_name,
    // test.id AS test_id,
    // test.name AS test_name
    // FROM test_practice testPractice
    // LEFT JOIN user user
    // ON user.id=testPractice.userId
    // AND (user.deletedAt IS NULL)
    // LEFT JOIN test test
    // ON test.id=testPractice.testId
    // AND (test.deletedAt IS NULL)
    // WHERE ( user.id = "${idUser}" )
    // AND ( testPractice.deletedAt IS NULL )`;
    // const result = await this.dataSource.query(query);
    // return result;
    return await this.testPracticeRepository.find({
      where: { user: { id: idUser } },
      relations: ['user', 'test'],
    });
  }
  async getListTestPracticeByUserTest(idUser: string, idTest: string) {
    // const query = `SELECT testPractice.id AS testPractice_id,
    // testPractice.createdAt AS testPractice_createdAt,
    // testPractice.deletedAt AS testPractice_deletedAt,
    // testPractice.time AS testPractice_time,
    // testPractice.LCScore AS testPractice_LCScore,
    // testPractice.RCScore AS testPractice_RCScore,
    // testPractice.totalQuestion AS testPractice_totalQuestion,
    // testPractice.numCorrect AS testPractice_numCorrect,
    // testPractice.userId AS testPractice_userId,
    // testPractice.testId AS testPractice_testId,
    // user.id AS user_id,
    // user.name AS user_name,
    // test.id AS test_id,
    // test.name AS test_name
    // FROM test_practice testPractice
    // LEFT JOIN user user
    // ON user.id=testPractice.userId
    // AND (user.deletedAt IS NULL)
    // LEFT JOIN test test
    // ON test.id=testPractice.testId
    // AND (test.deletedAt IS NULL)
    // WHERE ( user.id = "${idUser}" AND test.id = "${idTest}" )
    // AND ( testPractice.deletedAt IS NULL )`;
    // const result = await this.dataSource.query(query);
    // return result;
    return await this.testPracticeRepository.find({
      where: { user: { id: idUser }, test: { id: idTest } },
      relations: ['user', 'test'],
    });
  }
}
