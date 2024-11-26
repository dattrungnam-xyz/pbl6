import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionMedia } from './entity/questionMedia.entity';
import { Repository } from 'typeorm';
import { CreateQuestionMediaDTO } from './input/createQuestionMedia.dto';
import { CloudinaryResponse } from '../cloudinary/cloudinary-response';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { MediaType } from '../type/media.type';

@Injectable()
export class QuestionMediaService {
  constructor(
    @InjectRepository(QuestionMedia)
    private readonly questionMediaRepository: Repository<QuestionMedia>,
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
  ) {}
  async createQuestionMedia(
    createQuestionMediaDTO: CreateQuestionMediaDTO,
  ): Promise<QuestionMedia> {
    return await this.questionMediaRepository.save(
      new QuestionMedia({ ...createQuestionMediaDTO }),
    );
  }
  async deleteQuestionMedia(id: string) {
    const questionMedia = await this.questionMediaRepository.findOneBy({ id });
    if (!questionMedia) {
      throw new NotFoundException('Question media not found');
    }
    return await this.questionMediaRepository.softDelete(id);
  }
  async updateQuestionMediaGroupQuestion(
    file: CloudinaryOutput,
    createQuestionMediaDTO: CreateQuestionMediaDTO,
  ) {
    const groupQuestion = await this.groupQuestionRepository.findOneBy({
      id: createQuestionMediaDTO.idGroupQuestion,
    });
    if (!groupQuestion) {
      throw new NotFoundException('Group question not found');
    }
    const questionMedia = new QuestionMedia({
      url: file.url,
      type: file.type as MediaType,
      index: createQuestionMediaDTO.index,
    });
    questionMedia.groupQuestion = groupQuestion;
    return await this.questionMediaRepository.save(questionMedia);
  }
}
