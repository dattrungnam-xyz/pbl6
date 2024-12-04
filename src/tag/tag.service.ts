import { Injectable } from '@nestjs/common';
import { CreateTagDTO } from './input/createTag.dto';
import { UpdateTagDTO } from './input/updateTag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entity/tag.entity';
import { Repository } from 'typeorm';
import { TagType } from '../common/type/tag.type';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findOrCreateTags(listCreateTagDTO: CreateTagDTO[]): Promise<Tag[]> {
    let tagPromise = listCreateTagDTO.map(async (tag) => {
      if (tag.id) {
        return this.tagRepository.findOneBy({ id: tag.id });
      }
      const tagSearch = await this.tagRepository.findOneBy({
        name: tag.name,
      });
      if (tagSearch) {
        return tagSearch;
      }
      return this.tagRepository.save(
        new Tag({ name: tag.name, type: tag.type }),
      );
    });
    const tags = await Promise.all(tagPromise);
    return tags;
  }

  async create(createTagDto: CreateTagDTO) {
    return await this.tagRepository.save(new Tag({ ...createTagDto }));
  }

  async findAllByType(type: string) {
    return await this.tagRepository.find({
      where: { type: type as TagType },
      order: { name: 'ASC' },
    });
  }
  async findAll() {
    return await this.tagRepository.find({
      order: { name: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDTO) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
