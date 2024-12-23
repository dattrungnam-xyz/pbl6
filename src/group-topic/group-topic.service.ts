import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTopic, PaginatedGroupTopic } from './entity/groupTopic.entity';
import { Repository } from 'typeorm';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';
import { TagService } from '../tag/tag.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateGroupTopicDTO } from './input/updateGroupTopic.dto';
import { NotFoundError } from 'rxjs';
import { TopicHistory } from '../topic-history/entity/topicHistory.entity';
import { Topic } from '../topic/entity/topic.entity';
import { paginate } from '../pagination/paginator';

@Injectable()
export class GroupTopicService {
  constructor(
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
    @InjectRepository(TopicHistory)
    private readonly topicHistoryRepository: Repository<TopicHistory>,
    private readonly tagService: TagService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createGroupTopic(
    createGroupTopicDTO: CreateGroupTopicDTO,
  ): Promise<GroupTopic> {
    let newGroupTopic = new GroupTopic();
    const listTag = await this.tagService.findOrCreateTags(
      createGroupTopicDTO.tags || [],
    );
    newGroupTopic.tags = listTag;
    newGroupTopic.name = createGroupTopicDTO.name;
    newGroupTopic.level = createGroupTopicDTO.level;
    newGroupTopic.target = createGroupTopicDTO.target;
    newGroupTopic.description = createGroupTopicDTO.description;
    if (createGroupTopicDTO.thumbnail) {
      newGroupTopic.thumbnail = (
        await this.cloudinaryService.uploadImageBase64(
          createGroupTopicDTO.thumbnail,
        )
      ).url;
    }
    return this.groupTopicRepository.save(newGroupTopic);
  }
  async updateGroupTopic(id: string, updateGroupTopicDTO: UpdateGroupTopicDTO) {
    const groupTopic = await this.groupTopicRepository.findOneBy({ id });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found');
    }
    if (updateGroupTopicDTO.thumbnail) {
      updateGroupTopicDTO.thumbnail = await this.cloudinaryService.uploadBase64(
        updateGroupTopicDTO.thumbnail,
      );
    }
    if (updateGroupTopicDTO.tags) {
      const listTag = await this.tagService.findOrCreateTags(
        updateGroupTopicDTO.tags,
      );
      groupTopic.tags = listTag;
      updateGroupTopicDTO.tags = undefined;
    }
    Object.assign(groupTopic, updateGroupTopicDTO);
    return await this.groupTopicRepository.save(groupTopic);
  }

  async findGroupTopic(limit = 15, page = 0, search?: string, level?: string) {
    // return await this.groupTopicRepository
    //   .createQueryBuilder('groupTopic')
    //   .leftJoinAndSelect('groupTopic.topics', 'topic')
    //   .loadRelationCountAndMap('groupTopic.topicsCount', 'groupTopic.topics')
    //   .orderBy('groupTopic.createdAt', 'DESC')
    //   .getMany();
    // const res = await this.groupTopicRepository.find({
    //   relations: [
    //     'topics',
    //     'topics.topicHistories',
    //     'topics.topicHistories.user',
    //   ],
    //   order: { createdAt: 'DESC' },
    // });
    const offset = page * limit;
    let qb = this.groupTopicRepository
      .createQueryBuilder('groupTopic')
      .leftJoinAndSelect('groupTopic.topics', 'topic')
      .leftJoinAndSelect('topic.topicHistories', 'topicHistory')
      .leftJoinAndSelect('topicHistory.user', 'user')
      .loadRelationCountAndMap('groupTopic.topicsCount', 'groupTopic.topics');
    if (search) {
      qb = qb.where('groupTopic.name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (level && level !== 'all') {
      qb = qb.andWhere('groupTopic.level LIKE :level', {
        level: `%${level}%`,
      });
    }
    qb = qb.orderBy('groupTopic.createdAt', 'ASC');
    const res = paginate<GroupTopic, PaginatedGroupTopic>(
      qb,
      PaginatedGroupTopic,
      {
        limit,
        page,
        total: true,
      },
    );

    const result = await res;
    result.data = result.data.map((grTopic) => {
      const setUser = new Set();
      grTopic.topics.forEach((topic) => {
        topic.topicHistories.forEach((topicHistory) => {
          setUser.add(topicHistory.user.id);
        });
      });

      return {
        ...grTopic,
        userCount: setUser.size,
        topics: undefined,
      };
    });
    return result;
  }

  async findGroupTopicById(id: string) {
    return this.groupTopicRepository.findOne({
      where: { id },
      relations: ['tags', 'topics', 'topics.listWord'],
    });
  }

  async findTop8GroupTopic() {
    return await this.groupTopicRepository
      .createQueryBuilder('groupTopic')
      .leftJoin('groupTopic.topics', 'topic')
      .leftJoin('topic.topicHistories', 'topicHistory')
      .leftJoin('topicHistory.user', 'user')
      .select(['groupTopic', 'COUNT(DISTINCT user.id) AS userCount'])
      .groupBy('groupTopic.id')
      .orderBy('userCount', 'DESC')
      .limit(8)
      .getRawMany();
  }
  async findGroupTopicByIdAndUser(id: string, idUser: string) {
    let result = await this.groupTopicRepository.findOne({
      where: { id },
      relations: ['tags', 'topics', 'topics.listWord'],
      order: { createdAt: 'DESC' },
    });
    for (let i = 0; i < result.topics.length; i++) {
      let topic: any = result.topics[i];
      const topicHistory = await this.topicHistoryRepository.findOne({
        where: { user: { id: idUser }, topic: { id: topic.id } },
        order: { numCorrect: 'DESC' },
      });
      topic.isLearned = topicHistory ? true : false;
      topic.retainedWord = topicHistory ? topicHistory.numCorrect : 0;
    }
    return result;
  }
  async deleteGroupTopic(id: string) {
    const groupTopic = await this.groupTopicRepository.findOneBy({ id });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found');
    }
    return await this.groupTopicRepository.softDelete(id);
  }
}
