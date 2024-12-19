import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestPractice } from './entity/testPractice.entity';
import { MoreThan, Repository } from 'typeorm';
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
  async createTestPractice(
    id: string,
    createTestPractice: CreateTestPracticeDTO,
  ) {
    const test = await this.testRepository.findOne({
      where: { id: createTestPractice.testId },
      relations: ['testPractices'],
    });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    const user = await this.userRepository.findOne({
      where: { id: id },
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
          RCCount++;
        }
      }
    }
    testPractice.LCScore = getLCScore(LCCount);
    testPractice.RCScore = getRCScore(RCCount);
    testPractice.totalQuestion = totalQuestion;
    testPractice.numCorrect = numCorrect;
    testPractice.isFullTest = createTestPractice.isFullTest;
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
  async getTestPracticeDetail(id: string) {
    const testPractice = await this.testPracticeRepository.findOne({
      where: { id },
      relations: ['user', 'test', 'userAnswers', 'userAnswers.question'],
    });
    if (!testPractice) {
      throw new NotFoundException('Test practice not found');
    }
    let test = await this.testRepository.findOne({
      where: {
        id: testPractice.test.id,
      },
      relations: [
        'tags',
        'groupQuestions',
        'groupQuestions.questions',
        'groupQuestions.part',
        'groupQuestions.questionMedia',
      ],
    });
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (test && test.groupQuestions) {
      for (const group of test.groupQuestions) {
        group.audio = [];
        group.image = [];
        for (const media of group.questionMedia) {
          if (media.type === 'audio') {
            group.audio.push(media);
          } else if (media.type === 'image') {
            group.image.push(media);
          }
        }
        if (group.questions) {
          group.questions.sort((a, b) => a.questionNumber - b.questionNumber);
          // group.questions.forEach((question) => {

          //   for (let i = 0; i < testPractice.userAnswers.length; i++) {
          //     if (testPractice.userAnswers[i].id === question.id) {
          //       question.userAnswer = [testPractice.userAnswers[i]];
          //     }
          //   }
          // });
          for (let question of group.questions) {
            for (let i = 0; i < testPractice.userAnswers.length; i++) {
              if (testPractice.userAnswers[i].question.id === question.id) {
                question.userAnswer = [testPractice.userAnswers[i]];
              }
            }
          }
        }
      }
    }
    test.groupQuestions = test.groupQuestions.sort((a, b) => {
      return +a.questions[0].questionNumber - +b.questions[0].questionNumber;
    });
    return { test, testPractice };
  }
  async getTestPracticeByIdUserLastSpecificDay(
    userId: string,
    day: number = 30,
  ) {
    const listTestLastSpecificDay = await this.testPracticeRepository.find({
      where: {
        user: { id: userId },
        createdAt: MoreThan(new Date(Date.now() - day * 24 * 60 * 60 * 1000)),
      },
      order: { createdAt: 'DESC' },
      relations: ['user', 'test', 'userAnswers', 'userAnswers.question'],
    });
    const testRCSet = new Set();
    const testLCSet = new Set();

    let testRCQuestionCount = 0;
    let testRCCorrectQuestionCount = 0;

    let testLCQuestionCount = 0;
    let testLCCorrectQuestionCount = 0;

    let maxRC = 0;
    let maxLC = 0;

    let RCScore = 0;
    let LCScore = 0;

    let countRC = 0;
    let countLC = 0;

    listTestLastSpecificDay.forEach((test) => {
      let hasRC = false;
      let hasLC = false;
      test.userAnswers.forEach((ans) => {
        if (ans.question.questionNumber <= 100) {
          testLCSet.add(test.test?.id);
          testLCQuestionCount++;
          if (ans.isCorrect) {
            testLCCorrectQuestionCount++;
          }
          hasLC = true;
        } else {
          testRCSet.add(test.test?.id);
          testRCQuestionCount++;
          if (ans.isCorrect) {
            testRCCorrectQuestionCount++;
          }
          hasRC = true;
        }
      });
      if (hasLC) {
        countLC++;
        LCScore += test.LCScore;
      }
      if (hasRC) {
        countRC++;
        RCScore += test.RCScore;
      }
      maxLC = Math.max(maxLC, test.LCScore);
      maxRC = Math.max(maxRC, test.RCScore);
    });
    return {
      testPracticeCount: listTestLastSpecificDay.length,
      totalTest: new Set(listTestLastSpecificDay.map((test) => test.test?.id))
        .size,
      totalTime: listTestLastSpecificDay.reduce(
        (acc, curr) => acc + curr.time,
        0,
      ),
      totalQuestion: listTestLastSpecificDay.reduce(
        (acc, curr) => acc + curr.totalQuestion,
        0,
      ),
      totalAnswerCorrect: listTestLastSpecificDay.reduce(
        (acc, curr) => acc + curr.numCorrect,
        0,
      ),
      maxScore: listTestLastSpecificDay.reduce((acc, curr) => {
        return Math.max(acc, curr.LCScore + curr.RCScore);
      }, 0),
      listen: {
        totalTest: testLCSet.size,
        totalQuestion: testLCQuestionCount,
        totalAnswerCorrect: testLCCorrectQuestionCount,
        maxScore: maxLC,
        avgScore: countLC ? LCScore / countLC : 0,
      },
      read: {
        totalTest: testRCSet.size,
        totalQuestion: testRCQuestionCount,
        totalAnswerCorrect: testRCCorrectQuestionCount,
        maxScore: maxRC,
        avgScore: countRC ? RCScore / countRC : 0,
      },
      // listPractice: listTestLastSpecificDay,
    };
  }

  async getTestPracticeLast(id: string) {
    const testPractice = await this.testPracticeRepository.find({
      where: { user: { id } },
      order: { createdAt: 'DESC' },
      relations: ['test'],
    });
    if (!testPractice) {
      return {
        lastPractice: [],
      };
    }
    const lastPractice = [];
    for (let i = 0; i < testPractice.length; i++) {
      if (i < 4) {
        let practiceDetail: any = testPractice[i];
        practiceDetail.listPart =
          await this.userAnswerService.getListPartOfUserAnswer(
            practiceDetail.id,
          );
        lastPractice.push(practiceDetail);
      }
    }
    return {
      lastPractice: lastPractice,
    };
  }
}
