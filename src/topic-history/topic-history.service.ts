import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicHistoryDTO } from './input/createTopicHistory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicHistory } from './entity/topicHistory.entity';
import { Repository } from 'typeorm';
import { Word } from '../word/entity/word.entity';
import { User } from '../users/entity/user.entity';
import { Topic } from '../topic/entity/topic.entity';

@Injectable()
export class TopicHistoryService {
  constructor(
    @InjectRepository(TopicHistory)
    private readonly topicHistoryRepository: Repository<TopicHistory>,
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async createTopicHistory(
    user: User,
    createTopicHistoryDTO: CreateTopicHistoryDTO,
  ) {
    const topic = await this.topicRepository.findOneBy({
      id: createTopicHistoryDTO.idTopic,
    });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    const topicHistory = new TopicHistory();
    Object.assign(topicHistory, createTopicHistoryDTO);
    const listWord = await this.wordRepository.find({
      where: { topic: { id: createTopicHistoryDTO.idTopic } },
    });
    let correctWord = [];
    let incorrectWord = [];
    for (let word of listWord) {
      if (createTopicHistoryDTO.listCorrectWord.includes(word.id)) {
        correctWord.push(word);
      } else {
        incorrectWord.push(word);
      }
    }
    topicHistory.correctWord = Promise.resolve(correctWord);
    topicHistory.incorrectWord = Promise.resolve(incorrectWord);
    topicHistory.user = Promise.resolve(user);
    topicHistory.topic = Promise.resolve(topic);
    return await this.topicHistoryRepository.save(topicHistory);
  }
  async getTopicHistoryByUserId(userId: string) {
    return await this.topicHistoryRepository.find({
      where: { user: { id: userId } },
      relations: ['topic'],
    });
  }
  async getTopicHistoryByUserIdTopicId(userId: string, topicId: string) {
    return await this.topicHistoryRepository.find({
      where: { user: { id: userId }, topic: { id: topicId } },
      relations: ['topic'],
    });
  }
  async getTopicHistoryDetail(id: string) {
    return await this.topicHistoryRepository.findOne({
      where: { id },
      relations: ['topic', 'correctWord', 'incorrectWord'],
    });
  }
  async getAllTopicHistory() {
    return await this.topicHistoryRepository.find({
      relations: ['topic', 'correctWord', 'incorrectWord'],
    });
  }
}
