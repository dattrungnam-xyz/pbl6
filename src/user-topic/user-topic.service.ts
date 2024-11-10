import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTopic } from './entity/userTopic.entity';
import { AddWordDTO } from './input/addWord.dto';
import { WordService } from '../word/word.service';
import { CreateUserTopicDTO } from './input/createUserTopic.dto';
import { DeleteWordDTO } from './input/deleteWord.dto';
import { updateUserTopic } from './input/updateUserTopic.dto';

@Injectable()
export class UserTopicService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTopic)
    private readonly userTopicRepository: Repository<UserTopic>,
    private readonly wordService: WordService,
  ) {}
  async createNewUserTopic(user: User, createUserTopicDTO: CreateUserTopicDTO) {
    let currentUser = await this.userRepository.findOneBy({ id: user.id });
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    let newUserTopic = new UserTopic();
    newUserTopic.user = Promise.resolve(currentUser);
    newUserTopic.name = createUserTopicDTO.name;
    return await this.userTopicRepository.save(newUserTopic);
  }
  async addWordToUserTopic(id: string, addWordDTO: AddWordDTO) {
    let userTopic = await this.userTopicRepository.findOne({
      where: { id },
      relations: ['words'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    const listWordPromise = addWordDTO.listWordId.map((id) => {
      return this.wordService.findWordById(id);
    });
    const listWord = await Promise.all(listWordPromise);
    userTopic.words = Promise.resolve([
      ...(await userTopic.words),
      ...listWord,
    ]);
    return await this.userTopicRepository.save(userTopic);
  }
  async deleteWordUserTopic(id: string, deleteWordDTO: DeleteWordDTO) {
    let userTopic = await this.userTopicRepository.findOne({
      where: { id },
      relations: ['words'],
    });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    userTopic.words = Promise.resolve(
      (await userTopic.words).filter((word) => {
        return !deleteWordDTO.listWordId.includes(word.id);
      }),
    );
    return await this.userTopicRepository.save(userTopic);
  }
  async updateUserTopic(id: string, updateUserTopic: updateUserTopic) {
    let userTopic = await this.userTopicRepository.findOneBy({ id });
    if (!userTopic) {
      throw new NotFoundException('User Topic not found');
    }
    userTopic.name = updateUserTopic.name;
    return await this.userTopicRepository.save(userTopic);
  }
}
