import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDTO } from './input/createTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { Topic } from './entities/topic.entity';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicQuestionService } from '../topic-question/topic-question.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';

@Injectable()
export class TopicService {
  constructor(
    private readonly tagService: TagService,
    private readonly topicQuestionService: TopicQuestionService,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
  ) {}
  async createEntireTopic(id: string, createTopicDTO: CreateTopicDTO) {
    const groupTopic = await this.groupTopicRepository.findOneBy({ id });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found.');
    }
    let thumbnailUrl;
    if (createTopicDTO.thumbnail) {
      const topicThumbnail = await this.cloudinaryService.uploadImageBase64(
        createTopicDTO.thumbnail,
      );
      thumbnailUrl = topicThumbnail.url;
    }
    let newTopic = new Topic({
      name: createTopicDTO.name,
      thumbnail: thumbnailUrl,
    });
    newTopic.groupTopic = Promise.resolve(groupTopic);

    const tags = await this.tagService.findOrCreateTags(createTopicDTO.tags);
    newTopic.tags = Promise.resolve(tags);
    const listTopicQuestions =
      await this.topicQuestionService.createListTopicQuestion(
        createTopicDTO.listTopicQuestion,
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
