import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './input/createQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  async createQuestion(
    createQuestionDTO: CreateQuestionDTO,
  ): Promise<Question> {
    return await this.questionRepository.save(
      new Question({ ...createQuestionDTO }),
    );
  }
}
