import { Injectable } from '@nestjs/common';
import { CreateTopicQuestionDTO } from './input/createTopicQuestion.dto';
import { UpdateTopicQuestionDTO } from './input/updateTopicQuestion.dto';
import { ListTopicQuestionDTO } from './input/listTopicQuestion.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { TopicQuestion } from './entities/topic-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class TopicQuestionService {
  constructor(
    @InjectRepository(TopicQuestion)
    private readonly topicQuestionRepository: Repository<TopicQuestion>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createListTopicQuestion(listTopicQuestionDTO: ListTopicQuestionDTO[]) {
    const topicQuestionPromise = listTopicQuestionDTO.map(
      async (topicQuestion) => {
        let newTopicQuestion = new TopicQuestion();
        newTopicQuestion.describeQuestion = topicQuestion.describeQuestion;
        newTopicQuestion.answer = topicQuestion.answer;
        newTopicQuestion.questionContent = topicQuestion.questionContent;
        newTopicQuestion.correctAnswer = topicQuestion.correctAnswer;
        newTopicQuestion.type = topicQuestion.type;
        newTopicQuestion.wordClass = topicQuestion.wordClass;
        newTopicQuestion.translate = topicQuestion.translate;
        newTopicQuestion.pronunciation = topicQuestion.pronunciation;
        if (topicQuestion.thumbnail) {
          newTopicQuestion.thumbnail = (
            await this.cloudinaryService.uploadImageBase64(
              topicQuestion.thumbnail,
            )
          ).url;
        }
        if (topicQuestion.audio) {
          newTopicQuestion.audio = await this.cloudinaryService.uploadBase64(
            topicQuestion.audio,
          );
        }
        return this.topicQuestionRepository.save(newTopicQuestion);
      },
    );
    return await Promise.all(topicQuestionPromise);
  }

  findAll() {
    return `This action returns all topicQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicQuestion`;
  }

  update(id: number, updateTopicQuestionDTO: UpdateTopicQuestionDTO) {
    return `This action updates a #${id} topicQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicQuestion`;
  }
}
