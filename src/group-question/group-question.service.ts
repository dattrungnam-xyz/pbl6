import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupQuestion } from './entity/groupQuestion.entity';
import { Repository } from 'typeorm';
import { GroupQuestionDataDTO } from './input/createGroupQuestion.dto';
import { Part } from '../part/entity/part.entity';
import { Test } from '../test/entity/test.entity';
import { Question } from '../question/entity/question.entity';
import { CloudinaryResponse } from '../cloudinary/cloudinary-response';
import { QuestionMedia } from '../question-media/entity/questionMedia.entity';
import { QuestionMediaService } from '../question-media/question-media.service';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { MediaType } from '../common/type/media.type';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class GroupQuestionService {
  constructor(
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
    private readonly questionMediaService: QuestionMediaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createGroupQuestion() {}
  async createListGroupQuestion(
    listGroupQuestionDTO: GroupQuestionDataDTO[],
    part: Part,
    test: Test,
  ): Promise<GroupQuestion[]> {
    let listGroupQuestionPromise = listGroupQuestionDTO.map(
      async (groupQuestion) => {
        const newGroupQuestion = new GroupQuestion({
          part: part,
        });
        if (groupQuestion.describeAnswer) {
          newGroupQuestion.describeAnswer = groupQuestion.describeAnswer;
        }
        if (groupQuestion.detail) {
          newGroupQuestion.detail = groupQuestion.detail;
        }
        if (groupQuestion.transcript) {
          newGroupQuestion.transcript = groupQuestion.transcript;
        }
        let listQuestionMedia = [];
        if (groupQuestion.audio || groupQuestion.audioUrl) {
          let audioUrl: string;
          if (groupQuestion.audio) {
            audioUrl = await this.cloudinaryService.uploadBase64(
              groupQuestion.audio,
            );
          } else {
            audioUrl = groupQuestion.audioUrl;
          }
          const newQuestionMedia = new QuestionMedia({
            type: MediaType.AUDIO,
            url: audioUrl,
          });
          listQuestionMedia.push(newQuestionMedia);
        }
        if (groupQuestion.image && groupQuestion.image.length > 0) {
          const listImagePromise = groupQuestion.image
            .sort((a, b) => a.index - b.index)
            .map((file) => {
              if (file.fileUrl) return file.fileUrl;
              return this.cloudinaryService.uploadBase64(file.file);
            });
          const listFileUrl = await Promise.all(listImagePromise);
          for (let i = 0; i < listFileUrl.length; i++) {
            const newQuestionMedia = new QuestionMedia({
              type: MediaType.IMAGE,
              url: listFileUrl[i],
              index: groupQuestion.image[i].index,
            });
            listQuestionMedia.push(newQuestionMedia);
          }
        }
        newGroupQuestion.questionMedia = listQuestionMedia;
        const listQuestion = groupQuestion.questionData.map((question) => {
          const newQuestion = new Question({
            answer: question.answer,
            explain: question.explain,
            question: question.question,
            correctAnswer: question.correctAnswer,
            questionNumber: question.questionNumber,
          });
          return newQuestion;
        });

        newGroupQuestion.questions = listQuestion;
        newGroupQuestion.test = test;
        return this.groupQuestionRepository.save(newGroupQuestion);
      },
    );
    const listGroupQuestion = await Promise.all(listGroupQuestionPromise);
    return listGroupQuestion;
  }
  async deleteGroupQuestion(id: string) {
    const groupQuestion = await this.groupQuestionRepository.findOneBy({ id });
    if (!groupQuestion) {
      throw new NotFoundException('Group question not found');
    }
    return await this.groupQuestionRepository.softDelete(id);
  }
}
