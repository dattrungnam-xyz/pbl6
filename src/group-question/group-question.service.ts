import { Injectable } from '@nestjs/common';
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

@Injectable()
export class GroupQuestionService {
  constructor(
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
    private readonly questionMediaService: QuestionMediaService,
  ) {}

  async createGroupQuestion() {}
  async createListGroupQuestion(
    listGroupQuestionDTO: GroupQuestionDataDTO[],
    part: Part,
    test: Test,
    listFile?: CloudinaryResponse[],
  ): Promise<GroupQuestion[]> {
    let listGroupQuestionPromise = listGroupQuestionDTO.map((groupQuestion) => {
      const newGroupQuestion = new GroupQuestion({
        part: Promise.resolve(part),
      });
      if (groupQuestion.describeAnswer) {
        newGroupQuestion.describeAnswer = groupQuestion.describeAnswer;
      }
      if (groupQuestion.detail) {
        newGroupQuestion.detail = groupQuestion.detail;
      }
      if (listFile) {
        let listQuestionMedia = [];
        for (let file of listFile) {
          console.log(file)
          if (file.name === groupQuestion.audio) {
            const newQuestionMedia = new QuestionMedia({
              type: file.type,
              url: file.url,
            });
            listQuestionMedia.push(newQuestionMedia);
          } else if (
            groupQuestion.image.some(
              (img) => img.filename === file.filename,
            )
          ) {
            const newQuestionMedia = new QuestionMedia({
              type: file.type,
              url: file.url,
            });
            listQuestionMedia.push(newQuestionMedia);
          }
        }
        newGroupQuestion.questionMedia = Promise.resolve(listQuestionMedia);
      }
      const listQuestion = groupQuestion.questionData.map((question) => {
        const newQuestion = new Question({
          answer: question.answer,
          explain: question.explain,
          question: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          questionNumber: question.questionNumber,
        });
        if (question.optionD) {
          newQuestion.optionD = question.optionD;
        }
        return newQuestion;
      });

      newGroupQuestion.questions = Promise.resolve(listQuestion);
      newGroupQuestion.test = Promise.resolve(test);
      return this.groupQuestionRepository.save(newGroupQuestion);
    });
    const listGroupQuestion = await Promise.all(listGroupQuestionPromise);
    return listGroupQuestion;
  }
}
