import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswer } from './entity/userAnswer.entity';
import { Repository } from 'typeorm';
import { CreateUserAnswerDTO } from './input/createUserAnswer.dto';
import { QuestionService } from '../question/question.service';
import { TestPractice } from '../test-practice/entity/testPractice.entity';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
    private readonly questionService: QuestionService,
  ) {}
  async createListUserAnswer(
    testPractice: TestPractice,
    listUserAnswer: CreateUserAnswerDTO[],
  ) {
    const listUserAnswerPromise = listUserAnswer.map(async (userAnswer) => {
      const newUserAnswer = new UserAnswer();
      const question = await this.questionService.findOneById(
        userAnswer.idQuestion,
      );
      if (!question) {
        throw new NotFoundException(
          `Question ${userAnswer.idQuestion} not found`,
        );
      }
      if (userAnswer.answer === question.correctAnswer) {
        newUserAnswer.isCorrect = true;
      } else {
        newUserAnswer.isCorrect = false;
      }
      newUserAnswer.question = question;
      newUserAnswer.testPractice = testPractice;
      newUserAnswer.userAnswer = userAnswer.answer;
      return this.userAnswerRepository.save(newUserAnswer);
    });
    return await Promise.all(listUserAnswerPromise);
  }

  async getListPartOfUserAnswer(idTestPractice: string) {
    let listPartInUserAnswer = await this.userAnswerRepository
      .createQueryBuilder('ua')
      .innerJoin('ua.question', 'q')
      .innerJoin('q.group', 'g')
      .innerJoin('g.part', 'p')
      .where('ua.testPracticeId = :idTestPractice', { idTestPractice })
      .andWhere('ua.deletedAt IS NULL')
      .andWhere('q.deletedAt IS NULL')
      .andWhere('g.deletedAt IS NULL')
      .andWhere('p.deletedAt IS NULL')
      .select('DISTINCT p.name')
      .getRawMany();
    return listPartInUserAnswer.map((item) => item.name).sort();
  }
}
