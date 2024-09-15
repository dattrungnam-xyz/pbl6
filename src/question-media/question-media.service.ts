import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionMedia } from './entity/questionMedia.entity';
import { Repository } from 'typeorm';
import { CreateQuestionMediaDTO } from './input/createQuestionMedia.dto';

@Injectable()
export class QuestionMediaService {
  constructor(
    @InjectRepository(QuestionMedia)
    private readonly questionMediaRepository: Repository<QuestionMedia>,
  ) {}
  async createQuestionMedia(
    createQuestionMediaDTO: CreateQuestionMediaDTO,
  ): Promise<QuestionMedia> {
    return await this.questionMediaRepository.save(
      new QuestionMedia({ ...createQuestionMediaDTO }),
    );
  }
}
