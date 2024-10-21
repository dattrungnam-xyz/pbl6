import { Injectable } from '@nestjs/common';
import { CreateTopicQuestionDTO } from './input/createTopicQuestion.dto';
import { UpdateTopicQuestionDTO } from './input/updateTopicQuestion.dto';

@Injectable()
export class TopicQuestionService {
  create(createTopicQuestionDTO: CreateTopicQuestionDTO) {
    return 'This action adds a new topicQuestion';
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
