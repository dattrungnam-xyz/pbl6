import { Injectable } from '@nestjs/common';
import { CreateTopicDTO } from './input/createTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { Topic } from './entities/topic.entity';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {
  constructor(
    private readonly tagService: TagService,
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

    // handle create list topic question
    return 'This action adds a new topic';
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

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
