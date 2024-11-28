import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTopic } from './entity/userTopic.entity';
import { AddWordDTO } from './input/addWord.dto';
import { WordService } from '../word/word.service';
import { CreateUserTopicDTO } from './input/createUserTopic.dto';
import { DeleteWordDTO } from './input/deleteWord.dto';
import { UpdateUserTopicDTO } from './input/updateUserTopic.dto';
import { TopicService } from '../topic/topic.service';

@Injectable()
export class UserTopicService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTopic)
    private readonly userTopicRepository: Repository<UserTopic>,
    private readonly wordService: WordService,
    private readonly topicService: TopicService,
  ) {}
  async createNewUserTopic(
    idUser: string,
    createUserTopicDTO: CreateUserTopicDTO,
  ) {
    let currentUser = await this.userRepository.findOneBy({ id: idUser });
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    let newUserTopic = new UserTopic();
    newUserTopic.user = currentUser;
    Object.assign(newUserTopic, createUserTopicDTO);
    return await this.userTopicRepository.save(newUserTopic);
  }
  async deleteUserTopic(idUserTopic: string, idUser: string) {
    const userTopic = await this.userTopicRepository.findOne({
      where: { id: idUserTopic },
      relations: ['words', 'user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    if (userTopic.user.id !== idUser) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return await this.userTopicRepository.softDelete(idUserTopic);
  }
  async addListWordToUserTopic(id: string, addWordDTO: AddWordDTO) {
    let userTopic = await this.userTopicRepository.findOne({
      where: { id },
      relations: ['words', 'user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    const listWordPromise = addWordDTO.listWordId.map((id) => {
      return this.wordService.findWordById(id);
    });
    const listWord = await Promise.all(listWordPromise);
    userTopic.words = [...userTopic.words, ...listWord];
    return await this.userTopicRepository.save(userTopic);
  }
  async addWordToUserTopic(id: string, idWord: string, idUser: string) {
    const userTopic = await this.userTopicRepository.findOne({
      where: { id: id },
      relations: ['words', 'topic', 'user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    if (userTopic.user.id !== idUser) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    const word = await this.wordService.findWordById(idWord);
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    if (userTopic.words.some((word) => word.id === idWord)) {
      throw new ConflictException('Word already exists');
    }
    userTopic.words = [...userTopic.words, word];
    return await this.userTopicRepository.save(userTopic);
  }
  async deleteListWordUserTopic(id: string, deleteWordDTO: DeleteWordDTO) {
    let userTopic = await this.userTopicRepository.findOne({
      where: { id },
      relations: ['words', 'user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    userTopic.words = userTopic.words.filter((word) => {
      return !deleteWordDTO.listWordId.includes(word.id);
    });

    return await this.userTopicRepository.save(userTopic);
  }
  async deleteWordUserTopic(id: string, idWord: string, idUser: string) {
    const userTopic = await this.userTopicRepository.findOne({
      where: { id: id },
      relations: ['words', 'topic', 'user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    if (userTopic.user.id !== idUser) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    const word = await this.wordService.findWordById(idWord);
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    userTopic.words = userTopic.words.filter((word) => word.id !== idWord);

    return await this.userTopicRepository.save(userTopic);
  }
  async updateUserTopic(
    id: string,
    updateUserTopicDTO: UpdateUserTopicDTO,
    idUser: string,
  ) {
    let userTopic = await this.userTopicRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    if (userTopic.user.id !== idUser) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    Object.assign(userTopic, updateUserTopicDTO);
    return await this.userTopicRepository.save(userTopic);
  }
  async addTopicUserTopic(idTopic: string) {
    const topic = await this.topicService.findOne(idTopic);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    const newUserTopic = new UserTopic();
    newUserTopic.topic = topic;
    newUserTopic.name = topic.name;
    return this.userRepository.save(newUserTopic);
  }

  async getTopicByUserId(id: string) {
    return await this.userTopicRepository.find({
      where: { user: { id } },
      relations: ['words', 'topic', 'user'],
    });
  }
}
