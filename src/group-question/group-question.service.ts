import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupQuestion } from './entity/groupQuestion.entity';
import { Repository } from 'typeorm';
import { CreateGroupQuestionDTO } from './input/createGroupQuestion.dto';

@Injectable()
export class GroupQuestionService {
  constructor(
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
  ) {}

  async createGroupQuestion(
    createGroupQuestionDTO: CreateGroupQuestionDTO,
  ): Promise<GroupQuestion> {
    return await this.groupQuestionRepository.save(
      new GroupQuestion({ ...createGroupQuestionDTO }),
    );
  }
}
