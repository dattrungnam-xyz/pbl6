import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDTO } from './input/createTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { Topic } from './entities/topic.entity';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicQuestionService } from '../topic-question/topic-question.service';

@Injectable()
export class TopicService {
  constructor(
    private readonly tagService: TagService,
    private readonly topicQuestionService: TopicQuestionService,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async createEntireTopic(
    createTopicDTO: CreateTopicDTO,
    listFile?: CloudinaryOutput[],
  ) {
    let newTopic = new Topic({
      name: createTopicDTO.name,
      thumbnail:
        listFile.find((file) => file.name === createTopicDTO.thumbnail).url ||
        '',
    });
    const tags = await this.tagService.findOrCreateTags(createTopicDTO.tags);
    newTopic.tags = Promise.resolve(tags);
    const listTopicQuestions =
      await this.topicQuestionService.createListTopicQuestion(
        createTopicDTO.listTopicQuestion,
        listFile,
      );
    newTopic.listTopicQuestion = Promise.resolve(listTopicQuestions);
    return await this.topicRepository.save(newTopic);
  }

  findAll() {
    return `This action returns all topic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDTO: UpdateTopicDTO) {
    return `This action updates a #${id} topic`;
  }

  async delete(id: string) {
    const doc = await this.topicRepository.findOneBy({ id });
    if (!doc) {
      throw new NotFoundException('Topic not found');
    }
    return await this.topicRepository.softDelete(id);
  }
}
