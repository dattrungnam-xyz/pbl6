import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDTO } from './input/createTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { Topic } from './entity/topic.entity';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { WordService } from '../word/word.service';

@Injectable()
export class TopicService {
  constructor(
    private readonly tagService: TagService,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
    private readonly wordService: WordService,
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

    const tags = await this.tagService.findOrCreateTags(
      createTopicDTO.tags || [],
    );
    newTopic.tags = Promise.resolve(tags);
    const listWord = await this.wordService.createListWord(
      createTopicDTO.listWord,
    );
    newTopic.listWord = Promise.resolve(listWord);
    return await this.topicRepository.save(newTopic);
  }

  async updateTopic(id: string, updateTopicDTO: UpdateTopicDTO) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    updateTopicDTO.listWord = undefined;
    if (updateTopicDTO.tags) {
      const listTag = await this.tagService.findOrCreateTags(
        updateTopicDTO.tags,
      );
      updateTopicDTO.tags = listTag;
    }
    Object.assign(topic, updateTopicDTO);
    return await this.topicRepository.save(topic);
  }

  async findAll() {
    return await this.topicRepository.find({relations: ["listWord"]});
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  async delete(id: string) {
    const doc = await this.topicRepository.findOneBy({ id });
    if (!doc) {
      throw new NotFoundException('Topic not found');
    }
    return await this.topicRepository.softDelete(id);
  }
}
