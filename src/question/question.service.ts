import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './input/createQuestion.dto';
import { UpdateQuestionDTO } from './input/updateQuestion.dto';

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
  async updateQuestion(id: string, updateQuestionDTO: UpdateQuestionDTO) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Question not found');
    return await this.questionRepository.save(
      new Question({ ...question, ...updateQuestionDTO }),
    );
  }
  async deleteQuestion(id: string) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Question not found.');
    return await this.questionRepository.softDelete(id);
  }
  async findOneById(id: string) {
    return await this.questionRepository.findOneBy({ id });
  }
}
