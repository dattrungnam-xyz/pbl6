import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTopic } from './entity/groupTopic.entity';
import { Repository } from 'typeorm';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';
import { TagService } from '../tag/tag.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateGroupTopicDTO } from './input/updateGroupTopic.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class GroupTopicService {
  constructor(
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
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
    newGroupTopic.tags = Promise.resolve(listTag);
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
      groupTopic.tags = Promise.resolve(listTag);
      updateGroupTopicDTO.tags = undefined;
    }
    Object.assign(groupTopic, updateGroupTopicDTO);
    return await this.groupTopicRepository.save(groupTopic);
  }

  async findGroupTopic() {
    return await this.groupTopicRepository
    .createQueryBuilder("groupTopic")
    .leftJoinAndSelect("groupTopic.topics", "topic")
    .loadRelationCountAndMap("groupTopic.topicsCount", "groupTopic.topics")
    .getMany();
  }

  async findGroupTopicById(id:string)
  {
    return this.groupTopicRepository.findOne({
      where: { id },
      relations: ["tags", "topics", "topics.listWord"]
    })
  }
}
