import { Injectable } from '@nestjs/common';
import { CreateUserTopicDto } from './dto/create-user-topic.dto';
import { UpdateUserTopicDto } from './dto/update-user-topic.dto';

@Injectable()
export class UserTopicService {
  create(createUserTopicDto: CreateUserTopicDto) {
    return 'This action adds a new userTopic';
  }

  findAll() {
    return `This action returns all userTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTopic`;
  }

  update(id: number, updateUserTopicDto: UpdateUserTopicDto) {
    return `This action updates a #${id} userTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTopic`;
  }
}
