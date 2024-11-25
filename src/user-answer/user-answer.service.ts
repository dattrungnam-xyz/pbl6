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
  async createListUserAnswer(testPractice: TestPractice,listUserAnswer: CreateUserAnswerDTO[]) {
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
      newUserAnswer.question = Promise.resolve(question);
      newUserAnswer.testPractice = Promise.resolve(testPractice);
      newUserAnswer.userAnswer = userAnswer.answer;
      return this.userAnswerRepository.save(newUserAnswer);
    });
    return await Promise.all(listUserAnswerPromise);
  }
}
