import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTopic } from './entity/groupTopic.entity';
import { Repository } from 'typeorm';
import { CreateGroupTopicDTO } from './input/createGroupTopic.dto';
import { TagService } from '../tag/tag.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
      createGroupTopicDTO.tags,
    );
    newGroupTopic.tags = Promise.resolve(listTag);
    newGroupTopic.name = createGroupTopicDTO.name;
    if (createGroupTopicDTO.thumbnail) {
      newGroupTopic.thumbnail = (
        await this.cloudinaryService.uploadImageBase64(
          createGroupTopicDTO.thumbnail,
        )
      ).url;
    }
    return this.groupTopicRepository.save(newGroupTopic);
  }
}
