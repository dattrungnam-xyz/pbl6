import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionMedia } from './entity/questionMedia.entity';
import { Repository } from 'typeorm';
import { CreateQuestionMediaDTO } from './input/createQuestionMedia.dto';
import { CloudinaryResponse } from '../cloudinary/cloudinary-response';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { MediaType } from '../common/type/media.type';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class QuestionMediaService {
  constructor(
    @InjectRepository(QuestionMedia)
    private readonly questionMediaRepository: Repository<QuestionMedia>,
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createQuestionMedia(
    createQuestionMediaDTO: CreateQuestionMediaDTO,
  ): Promise<QuestionMedia> {
    let newQuestionMedia: QuestionMedia = new QuestionMedia();
    if (createQuestionMediaDTO.idGroupQuestion) {
      const groupQuestion = await this.groupQuestionRepository.findOneBy({
        id: createQuestionMediaDTO.idGroupQuestion,
      });
      if (!groupQuestion) {
        throw new NotFoundException('Group question not found');
      }
      newQuestionMedia.groupQuestion = groupQuestion;
    }
    if (createQuestionMediaDTO.file) {
      const url = await this.cloudinaryService.uploadBase64(
        createQuestionMediaDTO.file,
      );
      newQuestionMedia.url = url;
    } else if (createQuestionMediaDTO.fileUrl) {
      newQuestionMedia.url = createQuestionMediaDTO.fileUrl;
    }

    Object.assign(newQuestionMedia, createQuestionMediaDTO);
    return await this.questionMediaRepository.save(newQuestionMedia);
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
