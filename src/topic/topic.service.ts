import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntireTopicDTO } from './input/createEntireTopic.dto';
import { UpdateEntireTopicDTO } from './input/updateEntireTopic.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { Topic } from './entity/topic.entity';
import { TagService } from '../tag/tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { WordService } from '../word/word.service';
import { CreateTopicDTO } from './input/createTopic.dto';
import { CreateListWordTopicDTO } from './input/createListWordTopic.dto';
import { UpdateTopicDTO } from './input/updateTopic.dto';
import { UpdateListWordTopicDTO } from './input/updateListWordTopic.dto';

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

  async createTopic(idGroupTopic: string, createTopicDTO: CreateTopicDTO) {
    const groupTopic = await this.groupTopicRepository.findOneBy({
      id: idGroupTopic,
    });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found.');
    }
    let thumbnailUrl: string;
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
    return await this.topicRepository.save(newTopic);
  }
  async createEntireTopic(
    id: string,
    createEntireTopicDTO: CreateEntireTopicDTO,
  ) {
    const groupTopic = await this.groupTopicRepository.findOneBy({ id });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found.');
    }
    let thumbnailUrl: string;
    if (createEntireTopicDTO.thumbnail) {
      const topicThumbnail = await this.cloudinaryService.uploadImageBase64(
        createEntireTopicDTO.thumbnail,
      );
      thumbnailUrl = topicThumbnail.url;
    }
    let newTopic = new Topic({
      name: createEntireTopicDTO.name,
      thumbnail: thumbnailUrl,
    });
    newTopic.groupTopic = Promise.resolve(groupTopic);

    const tags = await this.tagService.findOrCreateTags(
      createEntireTopicDTO.tags || [],
    );
    newTopic.tags = Promise.resolve(tags);
    const listWord = await this.wordService.createListWord(
      createEntireTopicDTO.listWord,
    );
    newTopic.listWord = Promise.resolve(listWord);
    return await this.topicRepository.save(newTopic);
  }

  async updateEntireTopic(
    id: string,
    updateEntireTopicDTO: UpdateEntireTopicDTO,
  ) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    updateEntireTopicDTO.listWord = undefined;
    if (updateEntireTopicDTO.tags) {
      const listTag = await this.tagService.findOrCreateTags(
        updateEntireTopicDTO.tags,
      );
      updateEntireTopicDTO.tags = listTag;
    }
    Object.assign(topic, updateEntireTopicDTO);
    return await this.topicRepository.save(topic);
  }
  async updateTopic(id: string, updateTopicDTO: UpdateTopicDTO) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    if (updateTopicDTO.thumbnail) {
      const topicThumbnail = await this.cloudinaryService.uploadImageBase64(
        updateTopicDTO.thumbnail,
      );
      updateTopicDTO.thumbnail = topicThumbnail.url;
    }
    if (topic.tags) {
      topic.tags = Promise.resolve(
        await this.tagService.findOrCreateTags(updateTopicDTO.tags),
      );
    }
    Object.assign(topic, updateTopicDTO);
    return await this.topicRepository.save(topic);
  }
  async createListWordTopic(
    id: string,
    createListWordTopicDTO: CreateListWordTopicDTO,
  ) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    const listWord = await this.wordService.createListWord(
      createListWordTopicDTO.listWord,
    );
    topic.listWord = Promise.resolve(listWord);
    return await this.topicRepository.save(topic);
  }

  async findAll() {
    return await this.topicRepository.find({ relations: ['listWord'] });
  }

  async findOne(id: string) {
    return await this.topicRepository.findOne({
      where: { id },
      relations: ['listWord', 'tags'],
    });
  }

  async delete(id: string) {
    const doc = await this.topicRepository.findOneBy({ id });
    if (!doc) {
      throw new NotFoundException('Topic not found');
    }
    return await this.topicRepository.softDelete(id);
  }
}
